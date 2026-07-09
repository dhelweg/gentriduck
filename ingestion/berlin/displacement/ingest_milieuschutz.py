"""
ingestion/berlin/displacement/ingest_milieuschutz.py
=====================================================
R-B1 (#70 [B1]) — Berlin Milieuschutz (soziale Erhaltungsverordnung, §172 Abs.
1 Nr. 2 BauGB) area ingestion. Source discovery + decision: ADR-0019.

Direct legal analogue of Hamburg's "Soziale Erhaltungsverordnungen"
(ADR-0014 Pillar 4, `ingest_hamburg_displacement.py`) — same statute, same
adapter shape, so the two cities' staging models line up 1:1 for the
ADR-0005 city-agnostic seam.

This is PLUMBING, not methodology: a straight polygon-attribute staging
pull (area boundary + designation name + Bezirk + effective date). No
weighting, scoring, or index-construction logic, so it does not touch the
CLAUDE.md R-C1 methodology-bearing file list and does not trigger the
geo-DS/domain-expert gate. Any future use of these areas as an input to a
displacement/affordability sub-index (#70's eventual scope) is an
explicitly separate, gated slice (ADR-0019 Decision 2).

Source: GDI Berlin OGC WFS, dl-de-zero-2.0 (CONFIRMED live 2026-07-09).
  Endpoint: https://gdi.berlin.de/services/wfs/erhaltungsverordnungsgebiete
  Feature type: erhaltungsverordnungsgebiete:erhaltgeb_em
    ("Erhaltung der Zusammensetzung der Wohnbevoelkerung" -- the social/
    Milieuschutz designation; the sibling `erhaltgeb_es` feature type is the
    *townscape*-preservation designation, Abs. 1 Nr. 1, and is NOT ingested
    here -- it is not a displacement/social marker).
  CRS: EPSG:25833 (native, not reprojected), matching every other Berlin
    GDI WFS layer already ingested in this repo.
  82 areas citywide as of 2026-07-09 -- small, single-request dataset (no
    pagination needed, unlike Wohnlage's ~397k-feature layers).

Confirmed attributes (live GetFeature sample, 2026-07-09):
  schluessel   -- area code, e.g. "EM0105" (natural key)
  bezirk       -- Bezirk name, e.g. "Mitte"
  gebietsname  -- designation name, e.g. "Sparrplatz"
  f_gvbl_dat   -- Gesetz-/Verordnungsblatt publication date (string)
  f_in_kraft   -- date the designation took effect (string; in_force_date)
  ae_gvbldat   -- amendment publication date, nullable
  ae_inkraft   -- amendment effective date, nullable
  fl_ha        -- area in hectares (string; not cast to numeric here --
                  no consumer yet, deferred to the follow-up sub-index slice
                  per ADR-0019 Open Q1)

Output parquet schema (data/raw/berlin/displacement/milieuschutz.parquet):
  city_code           (string): 'berlin' (ADR-0005)
  area_code           (string): schluessel attribute (natural key)
  area_name           (string): gebietsname attribute
  bezirk_name         (string): bezirk attribute (informational; NOT a join key)
  in_force_date       (string, nullable ISO-ish date): f_in_kraft attribute
  area_ha             (string, nullable): fl_ha attribute, as-published
  geometry_wkb        (bytes): designated-area polygon, WKB, EPSG:25833
  source_attribution  (string): dl-de-zero-2.0 attribution

Usage:
  uv run python ingestion/berlin/displacement/ingest_milieuschutz.py \\
      --out-dir data/raw/berlin/displacement

  # Dry run (no HTTP calls):
  uv run python ingestion/berlin/displacement/ingest_milieuschutz.py \\
      --out-dir data/raw/berlin/displacement --dry-run

Attribution (dl-de-zero-2.0 -- no attribution legally required, credited
anyway per this repo's convention, ADR-0003/ADR-0006/ADR-0007):
  "Senatsverwaltung fuer Stadtentwicklung, Bauen und Wohnen Berlin,
  Erhaltungsverordnungsgebiete (Milieuschutz, Sec. 172 Abs. 1 Nr. 2 BauGB),
  dl-de-zero-2.0"

Runtime: seconds (small dataset, 82 areas confirmed live 2026-07-09).
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
        "shapely is required for Milieuschutz ingestion. "
        "Add it to pyproject.toml and run `uv sync`."
    ) from exc

# ADR-0016: shared drift-detection manifest helper. This script is run
# directly (not as a `-m` package module), so ingestion/ isn't on sys.path
# by default -- insert it explicitly, matching ingest_lor_geometries.py.
_INGESTION_ROOT = Path(__file__).resolve().parents[2]
if str(_INGESTION_ROOT) not in sys.path:
    sys.path.insert(0, str(_INGESTION_ROOT))
from manifest import existing_outputs, write_manifest_entry  # noqa: E402

# QA-2 (#177): shared retry+backoff fetch and atomic-write helpers. New
# script, so it adopts the shared layer from day one rather than adding
# another one-off urllib copy to migrate later.
from common.http import fetch_geojson  # noqa: E402
from common.io import atomic_write_parquet  # noqa: E402

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

CITY_CODE = "berlin"

SOURCE_ATTRIBUTION = (
    "Senatsverwaltung fuer Stadtentwicklung, Bauen und Wohnen Berlin, "
    "Erhaltungsverordnungsgebiete (Milieuschutz, Sec. 172 Abs. 1 Nr. 2 BauGB), "
    "dl-de-zero-2.0 -- https://gdi.berlin.de/data/erhaltungsverordnungsgebiete/"
)

# CONFIRMED live 2026-07-09 (ADR-0019) via WFS GetCapabilities + GetFeature probe.
WFS_BASE_URL = "https://gdi.berlin.de/services/wfs/erhaltungsverordnungsgebiete"

# erhaltgeb_em = social/Milieuschutz designation (Abs. 1 Nr. 2). The sibling
# erhaltgeb_es (Abs. 1 Nr. 1, townscape preservation) is deliberately NOT
# ingested -- it is not a displacement/social marker (ADR-0019 Decision 1).
WFS_TYPE_NAMES = "erhaltungsverordnungsgebiete:erhaltgeb_em"

# CONFIRMED attribute names via live GetFeature sample, 2026-07-09.
ATTR_AREA_CODE = "schluessel"
ATTR_BEZIRK = "bezirk"
ATTR_AREA_NAME = "gebietsname"
ATTR_IN_FORCE_DATE = "f_in_kraft"
ATTR_AREA_HA = "fl_ha"

MILIEUSCHUTZ_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("city_code", pa.string()),
        pa.field("area_code", pa.string()),
        pa.field("area_name", pa.string()),
        pa.field("bezirk_name", pa.string()),
        pa.field("in_force_date", pa.string()),
        pa.field("area_ha", pa.string()),
        pa.field("geometry_wkb", pa.large_binary()),
        pa.field("source_attribution", pa.string()),
    ]
)

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s -- %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)
log = logging.getLogger("milieuschutz_ingest")


# ---------------------------------------------------------------------------
# WFS fetch
# ---------------------------------------------------------------------------


def build_wfs_url(base_url: str, type_names: str) -> str:
    """Build the WFS 2.0.0 GetFeature URL."""
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
    """Parse GeoJSON features into row dicts for the output parquet."""
    features = geojson.get("features", [])
    log.info("Parsing %d Milieuschutz features", len(features))

    rows: list[dict] = []
    skipped = 0

    for feat in features:
        props = feat.get("properties") or {}

        raw_code = props.get(ATTR_AREA_CODE)
        if raw_code is None or str(raw_code).strip() == "":
            log.warning(
                "Feature missing %s; skipping. Props keys: %s",
                ATTR_AREA_CODE,
                list(props.keys())[:10],
            )
            skipped += 1
            continue
        area_code = str(raw_code).strip()

        area_name = str(props.get(ATTR_AREA_NAME) or "").strip()

        raw_bezirk = props.get(ATTR_BEZIRK)
        bezirk_name = str(raw_bezirk).strip() if raw_bezirk is not None else None

        raw_date = props.get(ATTR_IN_FORCE_DATE)
        in_force_date = str(raw_date).strip() if raw_date is not None else None

        raw_ha = props.get(ATTR_AREA_HA)
        area_ha = str(raw_ha).strip() if raw_ha is not None else None

        geom_raw = feat.get("geometry")
        if geom_raw is None:
            log.warning("Feature %s has null geometry; skipping.", area_code)
            skipped += 1
            continue

        try:
            geom = shapely_shape(geom_raw)
            wkb_bytes = bytes(shapely_to_wkb(geom))
        except Exception as exc:
            log.warning("Failed to convert geometry for feature %s: %s; skipping.", area_code, exc)
            skipped += 1
            continue

        rows.append(
            {
                "city_code": CITY_CODE,
                "area_code": area_code,
                "area_name": area_name,
                "bezirk_name": bezirk_name,
                "in_force_date": in_force_date,
                "area_ha": area_ha,
                "geometry_wkb": wkb_bytes,
                "source_attribution": SOURCE_ATTRIBUTION,
            }
        )

    if skipped:
        log.warning("Skipped %d features (missing area_code/geometry)", skipped)

    log.info("Parsed %d valid Milieuschutz rows", len(rows))
    return rows


# ---------------------------------------------------------------------------
# Write parquet
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path) -> None:
    """Write parsed rows to a Parquet file using the Milieuschutz schema (atomic write)."""
    table = pa.table(
        {
            "city_code": pa.array([r["city_code"] for r in rows], type=pa.string()),
            "area_code": pa.array([r["area_code"] for r in rows], type=pa.string()),
            "area_name": pa.array([r["area_name"] for r in rows], type=pa.string()),
            "bezirk_name": pa.array([r["bezirk_name"] for r in rows], type=pa.string()),
            "in_force_date": pa.array([r["in_force_date"] for r in rows], type=pa.string()),
            "area_ha": pa.array([r["area_ha"] for r in rows], type=pa.string()),
            "geometry_wkb": pa.array([r["geometry_wkb"] for r in rows], type=pa.large_binary()),
            "source_attribution": pa.array(
                [r["source_attribution"] for r in rows], type=pa.string()
            ),
        },
        schema=MILIEUSCHUTZ_PARQUET_SCHEMA,
    )
    # QA-2 (#177): atomic write -- a crash mid-write must never leave a
    # partial/corrupt file where dbt or verify_data.py expects a complete one.
    atomic_write_parquet(table, out_path)


# ---------------------------------------------------------------------------
# Pipeline
# ---------------------------------------------------------------------------


def run(out_dir: Path, dry_run: bool = False) -> bool:
    """Fetch the WFS layer, parse features, write parquet. Returns True on success."""
    out_path = out_dir / "milieuschutz.parquet"
    wfs_url = build_wfs_url(WFS_BASE_URL, WFS_TYPE_NAMES)

    log.info("Attribution: %s", SOURCE_ATTRIBUTION)

    if dry_run:
        log.info("[dry-run] Would fetch %s -> %s", wfs_url, out_path)
        return True

    try:
        geojson = fetch_geojson(wfs_url)
    except RuntimeError as exc:
        log.error("Failed to fetch WFS: %s", exc)
        return False

    rows = parse_features(geojson)

    if not rows:
        log.error("No valid rows produced -- not writing parquet.")
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
            "Download Berlin Milieuschutz (soziale Erhaltungsverordnung) area "
            "polygons from the GDI Berlin WFS and write Parquet."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/berlin/displacement",
        type=Path,
        help="Output directory for the parquet file (default: data/raw/berlin/displacement).",
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
        log.info("[dry-run] mode -- no HTTP calls will be made.")

    ok = run(out_dir, dry_run=args.dry_run)

    if not args.dry_run and ok:
        _write_manifest(out_dir)

    if not ok:
        return 1
    return 0


def _write_manifest(out_dir: Path) -> None:
    """ADR-0016: record this source's current on-disk output in the committed manifest."""
    found = existing_outputs(out_dir, ["milieuschutz.parquet"])
    if not found:
        return
    write_manifest_entry(
        source_id="berlin__milieuschutz",
        source_class="pinned",
        city="berlin",
        upstream_url="https://gdi.berlin.de/services/wfs/erhaltungsverordnungsgebiete",
        upstream_vintage="current (live WFS edition; confirmed 2026-07-09)",
        output_paths=found,
        ingest_script_module="ingestion.berlin.displacement.ingest_milieuschutz",
    )


if __name__ == "__main__":
    sys.exit(main())
