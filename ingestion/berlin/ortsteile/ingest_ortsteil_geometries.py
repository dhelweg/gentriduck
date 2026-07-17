"""
ingestion/berlin/ortsteile/ingest_ortsteil_geometries.py
==========================================================
#269 (I-ortsteile) — Berlin Ortsteil (Stadtteil) boundary geometry ingestion.

Source: ALKIS Berlin Ortsteile WFS, GDI Berlin (gdi.berlin.de), CC BY / dl-de-zero-2.0.
  Endpoint: https://gdi.berlin.de/services/wfs/alkis_ortsteile
  typeNames=alkis_ortsteile:ortsteile
  Confirmed live 2026-07-17 via GetCapabilities + DescribeFeatureType + a full
  GetFeature pull. This is the same `gdi.berlin.de` WFS family (ADR-0003 Option
  G-A) already used for LOR geometry (ingestion/berlin/lor/ingest_lor_geometries.py);
  the system-architect source-gate for #269 confirmed no new maintainer approval
  is needed to add this additional layer of the same infrastructure. An ADR-0003
  amendment documenting the Ortsteil layer specifically is being drafted in
  parallel by the architect (see #269 ticket).

Licence: the WFS GetCapabilities `ows:Fees` element states "Fuer die Nutzung der
Daten ist die Datenlizenz Deutschland - Zero - Version 2.0 anzuwenden"
(dl-de-zero-2.0 — no attribution legally required), matching most other
`gdi.berlin.de` layers (ADR-0003). We still credit the source for G3 transparency.

Feature schema (confirmed via DescribeFeatureType, 2026-07-17):
  uuid    (string): ALKIS object identifier — not used downstream.
  sch     (string): "Schluessel" — a 12-character composite key. Empirically
                     (checked against all 97 live features): the LAST 4
                     characters are [2-digit Bezirk][2-digit Ortsteil-within-
                     Bezirk], e.g. sch='110000010101' -> last 4 = '0101' ->
                     Bezirk '01' (Mitte), Ortsteil '01' (the Ortsteil "Mitte"
                     itself). This 4-digit tail is numerically identical to
                     the "Ortsteilnummer" the Amt fuer Statistik Berlin-
                     Brandenburg publishes elsewhere (e.g. Mitte's Ortsteile
                     are conventionally 0101 Mitte, 0102 Moabit, 0103
                     Hansaviertel, ... — the live WFS data matches this
                     exactly). This is a DIFFERENT numbering scheme from the
                     LOR Bezirk/PGR/BZR/PLR codes (dim_area_hierarchy.sql) —
                     Ortsteil is a non-LOR administrative geography (Berlin
                     Bezirksverwaltungsgesetz Sec.2) and the two schemes must
                     not be conflated even though both happen to encode the
                     same 2-digit Bezirk prefix.
  nam     (string): Human-readable Ortsteil name (e.g. "Mitte", "Moabit").
  gdf     (double): Area in m^2 (ALKIS-computed) — not persisted (recomputed
                     from geometry downstream via ST_Area for consistency with
                     the BRW/Milieuschutz spatial-join precedent, rather than
                     trusting a source-provided area figure alongside our own
                     ST_Area(geom) elsewhere).
  bezeich (string): AAA feature-class description ("AX_KommunalesGebiet" for
                     every row) — not used downstream.
  geom    (MultiSurface): boundary geometry, native CRS EPSG:25833 (same as
                     the LOR WFS family — NOT reprojected here).

Row count note: the WFS currently returns 97 features, not "96" (the figure
in the #269 ticket title/body, itself citing the commonly-quoted historical
count of Berlin's Ortsteile). Live source is authoritative over the ticket's
prose estimate; this script does not hard-code an expected count beyond the
dbt staging assert_min_rows sanity floor (see stg_berlin_ortsteil schema.yml).
No duplicate `sch` values were found among the 97 (verified 2026-07-17), so
each row is a genuine, distinct Ortsteil.

Output parquet schema:
  area_code           (string): 4-digit zero-padded Ortsteil code (last 4
                                 chars of `sch`; see above).
  area_name           (string): `nam` attribute.
  bezirk_code         (string): 2-digit zero-padded Bezirk code (first 2
                                 chars of area_code) — the Ortsteil's ADMIN
                                 parent. Ortsteile nest into Bezirke EXACTLY
                                 (Ortsteil is legally defined as a Bezirk
                                 subdivision), unlike the Ortsteil<->PLR
                                 relationship, which does NOT nest (that
                                 relationship is resolved separately, via an
                                 area-overlap spatial join in
                                 int_berlin_plr_ortsteil_overlap.sql, not at
                                 ingestion time).
  geometry_wkb        (bytes):  geometry in WKB, CRS EPSG:25833 (native).
  source_attribution  (string): mandatory-by-convention attribution string
                                 (dl-de-zero-2.0 does not legally require one,
                                 but we still record/publish it, ADR-0003).

Usage:
  uv run python ingestion/berlin/ortsteile/ingest_ortsteil_geometries.py \\
      --out-dir data/raw/berlin/ortsteile

  # Dry run (no HTTP calls):
  uv run python ingestion/berlin/ortsteile/ingest_ortsteil_geometries.py \\
      --out-dir data/raw/berlin/ortsteile --dry-run

Runtime: a few seconds (single WFS request, 97 features, small polygons).
"""

from __future__ import annotations

import argparse
import logging
import sys
import urllib.parse
from pathlib import Path
from typing import Optional

import pyarrow as pa

try:
    from shapely.geometry import shape as shapely_shape
    from shapely import to_wkb as shapely_to_wkb
except ImportError as exc:
    raise ImportError(
        "shapely is required for Ortsteil geometry ingestion (already approved for "
        "ingestion/berlin/lor/ingest_lor_geometries.py, ADR-0003 implementation note). "
        "Add it to pyproject.toml and run `uv sync`."
    ) from exc

# ADR-0016: shared drift-detection manifest helper. Run directly (not `-m`), so
# ingestion/ isn't on sys.path by default -- insert it explicitly, same pattern
# as ingest_lor_geometries.py.
_INGESTION_ROOT = Path(__file__).resolve().parents[2]
if str(_INGESTION_ROOT) not in sys.path:
    sys.path.insert(0, str(_INGESTION_ROOT))
from manifest import existing_outputs, write_manifest_entry  # noqa: E402

# QA-2 (#177): shared retry+backoff fetch and atomic-write helpers.
from common.http import fetch_geojson  # noqa: E402
from common.io import atomic_write_parquet  # noqa: E402

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

WFS_BASE_URL = "https://gdi.berlin.de/services/wfs/alkis_ortsteile"
TYPE_NAMES = "alkis_ortsteile:ortsteile"

SOURCE_ATTRIBUTION = (
    "Geoportal Berlin / GDI Berlin (ALKIS Berlin Ortsteile), "
    "Datenlizenz Deutschland - Zero - 2.0 -- https://gdi.berlin.de/"
)

OUTPUT_FILENAME = "ortsteile.parquet"

ORTSTEIL_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("area_code", pa.string()),
        pa.field("area_name", pa.string()),
        pa.field("bezirk_code", pa.string()),
        pa.field("geometry_wkb", pa.large_binary()),
        pa.field("source_attribution", pa.string()),
    ]
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)
log = logging.getLogger("ortsteil_ingest")


# ---------------------------------------------------------------------------
# WFS fetch
# ---------------------------------------------------------------------------


def build_wfs_url(base_url: str, type_names: str) -> str:
    """Build the WFS 2.0.0 GetFeature URL (same params as the LOR ingestion)."""
    params = {
        "service": "WFS",
        "version": "2.0.0",
        "request": "GetFeature",
        "typeNames": type_names,
        "outputFormat": "application/json",
    }
    return base_url + "?" + urllib.parse.urlencode(params)


# ---------------------------------------------------------------------------
# Feature parsing
# ---------------------------------------------------------------------------


def parse_features(geojson: dict) -> list[dict]:
    """Parse GeoJSON features into row dicts for the output parquet.

    area_code / bezirk_code derivation: see module docstring's "sch" note.
    Skips features with a missing/malformed `sch`, missing `nam`, or null
    geometry (logs a warning per skip; these should not occur against the
    live WFS but the guard keeps this ingestion consistent with the LOR
    ingestion's defensive parsing).
    """
    features = geojson.get("features", [])
    log.info("Parsing %d Ortsteil features", len(features))

    rows: list[dict] = []
    skipped = 0

    for feat in features:
        props = feat.get("properties") or {}

        sch = props.get("sch")
        if not sch or len(str(sch).strip()) < 4:
            log.warning("Feature missing/malformed 'sch' attribute; skipping. Props: %s", props)
            skipped += 1
            continue
        sch = str(sch).strip()
        area_code = sch[-4:].zfill(4)
        bezirk_code = area_code[:2]

        area_name = str(props.get("nam") or "").strip()
        if not area_name:
            log.warning("Feature %s (sch=%s) has no 'nam' attribute; area_name=''", area_code, sch)

        geom_raw = feat.get("geometry")
        if geom_raw is None:
            log.warning("Feature %s (sch=%s) has null geometry; skipping.", area_code, sch)
            skipped += 1
            continue

        try:
            geom = shapely_shape(geom_raw)
            wkb_bytes = bytes(shapely_to_wkb(geom))
        except Exception as exc:
            log.warning(
                "Failed to convert geometry for feature %s (sch=%s): %s; skipping.",
                area_code,
                sch,
                exc,
            )
            skipped += 1
            continue

        rows.append(
            {
                "area_code": area_code,
                "area_name": area_name,
                "bezirk_code": bezirk_code,
                "geometry_wkb": wkb_bytes,
                "source_attribution": SOURCE_ATTRIBUTION,
            }
        )

    if skipped:
        log.warning("Skipped %d Ortsteil features (missing/malformed attributes)", skipped)

    log.info("Parsed %d valid Ortsteil rows", len(rows))

    # Defensive uniqueness guard (documented as verified live 2026-07-17, but a
    # future WFS edition could in principle introduce a duplicate area_code --
    # fail loudly rather than silently writing a parquet with a broken natural key).
    seen: dict[str, str] = {}
    for row in rows:
        code = row["area_code"]
        if code in seen and seen[code] != row["area_name"]:
            raise RuntimeError(
                f"Duplicate area_code {code!r} with differing names "
                f"({seen[code]!r} vs {row['area_name']!r}) -- WFS schema/data changed "
                "since this ingestion script was written; needs review."
            )
        seen[code] = row["area_name"]

    return rows


# ---------------------------------------------------------------------------
# Write parquet
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path) -> None:
    """Write parsed rows to a Parquet file using the Ortsteil schema (atomic write)."""
    table = pa.table(
        {
            "area_code": pa.array([r["area_code"] for r in rows], type=pa.string()),
            "area_name": pa.array([r["area_name"] for r in rows], type=pa.string()),
            "bezirk_code": pa.array([r["bezirk_code"] for r in rows], type=pa.string()),
            "geometry_wkb": pa.array([r["geometry_wkb"] for r in rows], type=pa.large_binary()),
            "source_attribution": pa.array(
                [r["source_attribution"] for r in rows], type=pa.string()
            ),
        },
        schema=ORTSTEIL_PARQUET_SCHEMA,
    )
    # QA-2 (#177): atomic write.
    atomic_write_parquet(table, out_path)


# ---------------------------------------------------------------------------
# Pipeline
# ---------------------------------------------------------------------------


def process(out_dir: Path, dry_run: bool = False) -> bool:
    """Fetch WFS, parse features, write parquet. Returns True on success."""
    out_path = out_dir / OUTPUT_FILENAME
    wfs_url = build_wfs_url(WFS_BASE_URL, TYPE_NAMES)

    log.info("Attribution: %s", SOURCE_ATTRIBUTION)

    if dry_run:
        log.info("[dry-run] Would fetch %s -> %s", wfs_url, out_path)
        return True

    try:
        geojson = fetch_geojson(wfs_url)
    except RuntimeError as exc:
        log.error("Failed to fetch Ortsteil WFS: %s", exc)
        return False

    rows = parse_features(geojson)

    if not rows:
        log.error("No valid Ortsteil rows produced -- not writing parquet.")
        return False

    try:
        write_parquet(rows, out_path)
    except Exception as exc:
        log.error("Failed to write parquet: %s", exc)
        return False

    return True


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Berlin Ortsteil (Stadtteil) boundary geometries from the ALKIS "
            "Ortsteile GDI Berlin WFS and write Parquet."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/berlin/ortsteile",
        type=Path,
        help="Output directory for the parquet file (default: data/raw/berlin/ortsteile).",
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be fetched without making HTTP calls.",
    )
    p.add_argument(
        "--verbose",
        action="store_true",
        help="Enable DEBUG logging.",
    )
    return p


def main(argv: Optional[list[str]] = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    out_dir = args.out_dir.resolve()

    if args.dry_run:
        log.info("[dry-run] mode — no HTTP calls will be made.")

    ok = process(out_dir, dry_run=args.dry_run)

    if not args.dry_run and ok:
        _write_manifest(out_dir)

    return 0 if ok else 1


def _write_manifest(out_dir: Path) -> None:
    """ADR-0016: record this source's current on-disk outputs in the committed manifest."""
    found = existing_outputs(out_dir, [OUTPUT_FILENAME])
    if not found:
        return
    write_manifest_entry(
        source_id="berlin__ortsteile",
        source_class="pinned",
        city="berlin",
        upstream_url=f"{WFS_BASE_URL} (typeNames={TYPE_NAMES})",
        upstream_vintage="ALKIS Berlin Ortsteile, current edition (no vintage discriminator published)",
        output_paths=found,
        ingest_script_module="ingestion.berlin.ortsteile.ingest_ortsteil_geometries",
    )


if __name__ == "__main__":
    sys.exit(main())
