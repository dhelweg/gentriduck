"""
ingestion/hamburg/displacement/ingest_hamburg_displacement.py
================================================================
H1 (#40) / H2 (#125) — Hamburg displacement-protection zone ingestion
(ADR-0014 Pillar 4: "Soziale Erhaltungsverordnungen — Gebiete in
Hamburg"). Direct conceptual/legal analogue of Berlin's Milieuschutz
areas (§172 BauGB soziale Erhaltungssatzung, the same statute underlying
both cities' designations) — tracked for Berlin under the still-`blocked`
#70 [B1] (architect ADR + maintainer approval pending for the FIS-Broker
source). Hamburg's equivalent source is a *different*,
already-ADR-0014-approved data source (Transparenzportal, dl-de/by-2.0)
— this ingestion does not depend on #70's resolution and is not gated by
it.

This is PLUMBING, not methodology: a straight polygon-attribute staging
pull (area boundary + designation name + in-force date), analogous in
shape to stg_hamburg_geo. It introduces no weighting, scoring, or
index-construction logic, so it is not methodology-bearing under
CLAUDE.md's R-C1 (no geo-DS/domain-expert gate triggered). Any future
use of these zones as an input to a displacement/affordability
sub-index (mirroring #70's eventual scope) is an explicitly separate,
gated slice.

Source: Hamburg Transparenzportal / LGV WFS (deegree instance), dataset
"Soziale Erhaltungsverordnungen — Gebiete in Hamburg".
  Portal listing: https://suche.transparenz.hamburg.de/dataset/soziale-erhaltungsverordnungen-gebiete-in-hamburg14
  Also mirrored on data.europa.eu / INSPIRE per ADR-0014.

Endpoint (CONFIRMED live via GetCapabilities probe, 2026-07-01; #125):
  https://geodienste.hamburg.de/HH_WFS_SozErhVO
  Feature types (WFS 2.0.0 GetCapabilities):
    de.hh.up:sozerhvo_inkraft         — currently in-force designations
                                          (16 features confirmed live)
    de.hh.up:sozerhvo_inaufstellung   — designations in preparation
                                          (0 features live 2026-07-01;
                                          fetched but expected often-empty)
  This differs from the geometry pillar's `HH_WFS_<Layer>` / `app:<noun>`
  convention this ingestor originally guessed (`HH_WFS_Soziale_
  Erhaltungsverordnung` / `app:soziale_erhaltungsverordnung`, both 404) —
  the real service uses an abbreviated `SozErhVO` slug and a
  `de.hh.up:`-namespaced, lifecycle-suffixed (`_inkraft` /
  `_inaufstellung`) typeName, mirroring the Sozialmonitoring pillar's
  precedent that each Hamburg dataset can use its own naming convention
  and must be independently GetCapabilities-probed (ADR-0014 open
  question #1).

Feature attributes (CONFIRMED via live GetFeature sample, 2026-07-01):
  gebietsname  — designation name (e.g. "St.Georg"; note the source's own
                 punctuation is inconsistent across areas, e.g. "St.Georg"
                 vs "St.Pauli" with no space — preserved as-published, no
                 normalization applied here)
  bezirk       — Bezirk **code** (integer 1-7, NOT a name; e.g. 1 =
                 Hamburg-Mitte). No name field is published on this
                 feature type; the numeric code is carried as-is rather
                 than joined to a name in this staging-only ingestor
                 (that join belongs in the dbt staging model, which can
                 ref stg_hamburg_geo's bezirk layer).
  datum        — ISO-8601 timestamp the Erhaltungsverordnung took effect
                 (in_force_date; renders as e.g. "2012-02-15T00:00:00")
  (feature `id`, not `properties` — e.g. "DE.HH.UP_SOZERHVO_INKRAFT_99" —
   used as area_code; no natural business key is published in properties)
  Additional unused source properties: `fundstelle` (Gazette PDF link),
  `internet` (info page link) — not carried into the output schema.

Licence: dl-de/by-2.0 (attribution required). ADR-0014 pre-confirmed the
licence *family*; the per-dataset attribution string below follows the
same "Freie und Hansestadt Hamburg, Behörde für Stadtentwicklung und
Wohnen" pattern as the Sozialmonitoring pillar (same authority publishes
both datasets per the Transparenzportal listing).

Output parquet schema (data/raw/hamburg/displacement/erhaltungsverordnung.parquet):
  city_code           (string): 'HH' (ADR-0005)
  area_code           (string): WFS feature id (natural key; no separate
                                  business key is published)
  area_name           (string): designation name (gebietsname, as-published)
  status              (string): 'in_force' | 'in_preparation' (which WFS
                                  feature type the row came from)
  bezirk_name         (string, nullable): Bezirk **code** as published
                                  (numeric string, e.g. "1") — NOT a name;
                                  field kept as bezirk_name for output-
                                  schema continuity with the original
                                  design, but documented here as
                                  code-only. A downstream dbt model may
                                  join to stg_hamburg_geo's bezirk layer
                                  for the human-readable name.
  in_force_date        (string, nullable ISO date): date the Erhaltungsverordnung
                                  took effect (datum), if published
  geometry_wkb         (bytes): designated-area polygon, WKB, native CRS EPSG:25832
  source_attribution   (string): dl-de/by-2.0 attribution

Usage:
  uv run python ingestion/hamburg/displacement/ingest_hamburg_displacement.py \\
      --out-dir data/raw/hamburg/displacement

  # Dry run (no HTTP calls):
  uv run python ingestion/hamburg/displacement/ingest_hamburg_displacement.py \\
      --out-dir data/raw/hamburg/displacement --dry-run

Attribution (mandatory — dl-de/by-2.0, ADR-0014 Pillar 4):
  "Freie und Hansestadt Hamburg, Behörde für Stadtentwicklung und Wohnen,
  Soziale Erhaltungsverordnungen — Gebiete in Hamburg, dl-de/by-2.0"

Runtime: seconds (small dataset, 16 in-force + 0 in-preparation areas
confirmed live 2026-07-01).
"""

from __future__ import annotations

import argparse
import logging
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Optional

try:
    import certifi as _certifi

    _SSL_CONTEXT = ssl.create_default_context(cafile=_certifi.where())
except ImportError:
    _SSL_CONTEXT = ssl.create_default_context()

import json

import pyarrow as pa
import pyarrow.parquet as pq

try:
    from shapely.geometry import shape as shapely_shape
    from shapely import to_wkb as shapely_to_wkb
except ImportError as exc:
    raise ImportError(
        "shapely is required for Hamburg displacement-zone ingestion. "
        "Add it to pyproject.toml and run `uv sync`."
    ) from exc

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

SOURCE_ATTRIBUTION = (
    "Freie und Hansestadt Hamburg, Behörde für Stadtentwicklung und Wohnen, "
    "Soziale Erhaltungsverordnungen — Gebiete in Hamburg, dl-de/by-2.0 — "
    "https://transparenz.hamburg.de/"
)
CITY_CODE = "HH"

# CONFIRMED live 2026-07-01 (#125) via WFS GetCapabilities probe.
WFS_BASE_URL = "https://geodienste.hamburg.de/HH_WFS_SozErhVO"

# Two lifecycle feature types; both fetched and unioned (status column
# distinguishes them). "_inaufstellung" is often empty (0 features live
# 2026-07-01) but is fetched anyway in case designations are in prep at
# ingestion time.
WFS_LAYERS = {
    "in_force": "de.hh.up:sozerhvo_inkraft",
    "in_preparation": "de.hh.up:sozerhvo_inaufstellung",
}

# CONFIRMED attribute names via live GetFeature sample, 2026-07-01 (#125).
ATTR_AREA_NAME = "gebietsname"
ATTR_BEZIRK_CODE = "bezirk"
ATTR_IN_FORCE_DATE = "datum"

DISPLACEMENT_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("city_code", pa.string()),
        pa.field("area_code", pa.string()),
        pa.field("area_name", pa.string()),
        pa.field("status", pa.string()),
        pa.field("bezirk_name", pa.string()),
        pa.field("in_force_date", pa.string()),
        pa.field("geometry_wkb", pa.large_binary()),
        pa.field("source_attribution", pa.string()),
    ]
)

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)
log = logging.getLogger("hamburg_displacement_ingest")


# ---------------------------------------------------------------------------
# WFS fetch
# ---------------------------------------------------------------------------


def build_wfs_url(base_url: str, type_names: str) -> str:
    """Build the WFS 2.0.0 GetFeature URL.

    NOTE: outputFormat 'application/geo+json' matches the deegree quirk
    confirmed live for all Hamburg WFS pillars — 'application/json' raises
    InvalidParameterValue on these instances.
    """
    params = {
        "service": "WFS",
        "version": "2.0.0",
        "request": "GetFeature",
        "typeNames": type_names,
        "outputFormat": "application/geo+json",
    }
    return base_url + "?" + urllib.parse.urlencode(params)


def fetch_geojson(url: str, timeout: int = 120) -> dict:
    """Fetch GeoJSON from a WFS URL. Returns parsed JSON dict; raises on error.

    Tolerates a bare `{"type": "FeatureCollection"}` response with no
    `features` key (deegree's empty-result shape, confirmed live for the
    "_inaufstellung" layer 2026-07-01) by treating it as zero features
    rather than an error.
    """
    log.info("Fetching WFS GeoJSON from: %s", url)
    try:
        with urllib.request.urlopen(url, timeout=timeout, context=_SSL_CONTEXT) as resp:  # noqa: S310
            raw = resp.read()
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Network error fetching {url}: {exc}") from exc
    except Exception as exc:
        raise RuntimeError(f"Unexpected error fetching {url}: {exc}") from exc

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Invalid JSON response from {url}: {exc}") from exc

    if data.get("type") != "FeatureCollection":
        raise RuntimeError(
            f"Expected GeoJSON FeatureCollection from {url}, "
            f"got type={data.get('type')!r}. Response excerpt: {str(raw[:200])}"
        )

    data.setdefault("features", [])
    return data


# ---------------------------------------------------------------------------
# Feature parsing
# ---------------------------------------------------------------------------


def parse_features(geojson: dict, status: str) -> list[dict]:
    """Parse GeoJSON features into row dicts for the output parquet."""
    features = geojson.get("features", [])
    log.info("Parsing %d %s features", len(features), status)

    rows: list[dict] = []
    skipped = 0

    for feat in features:
        props = feat.get("properties") or {}

        raw_id = feat.get("id")
        if raw_id is None or str(raw_id).strip() == "":
            log.warning(
                "Feature missing id; skipping. Props: %s",
                list(props.keys())[:10],
            )
            skipped += 1
            continue
        area_code = str(raw_id).strip()

        area_name = str(props.get(ATTR_AREA_NAME) or "").strip()

        raw_bezirk = props.get(ATTR_BEZIRK_CODE)
        bezirk_name = str(raw_bezirk).strip() if raw_bezirk is not None else None

        raw_date = props.get(ATTR_IN_FORCE_DATE)
        in_force_date = str(raw_date).strip() if raw_date is not None else None

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
                "status": status,
                "bezirk_name": bezirk_name,
                "in_force_date": in_force_date,
                "geometry_wkb": wkb_bytes,
                "source_attribution": SOURCE_ATTRIBUTION,
            }
        )

    if skipped:
        log.warning("Skipped %d %s features (missing id/geometry)", skipped, status)

    log.info("Parsed %d valid %s rows", len(rows), status)
    return rows


# ---------------------------------------------------------------------------
# Write parquet
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path) -> None:
    """Write parsed rows to a Parquet file using the displacement-zone schema."""
    table = pa.table(
        {
            "city_code": pa.array([r["city_code"] for r in rows], type=pa.string()),
            "area_code": pa.array([r["area_code"] for r in rows], type=pa.string()),
            "area_name": pa.array([r["area_name"] for r in rows], type=pa.string()),
            "status": pa.array([r["status"] for r in rows], type=pa.string()),
            "bezirk_name": pa.array([r["bezirk_name"] for r in rows], type=pa.string()),
            "in_force_date": pa.array([r["in_force_date"] for r in rows], type=pa.string()),
            "geometry_wkb": pa.array([r["geometry_wkb"] for r in rows], type=pa.large_binary()),
            "source_attribution": pa.array(
                [r["source_attribution"] for r in rows], type=pa.string()
            ),
        },
        schema=DISPLACEMENT_PARQUET_SCHEMA,
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    pq.write_table(table, out_path, compression="snappy")
    log.info("Wrote %d rows to %s", len(rows), out_path)


# ---------------------------------------------------------------------------
# Pipeline
# ---------------------------------------------------------------------------


def run(out_dir: Path, dry_run: bool = False) -> bool:
    """Fetch both WFS lifecycle layers, parse features, write parquet. Returns True on success."""
    out_path = out_dir / "erhaltungsverordnung.parquet"

    log.info("Attribution: %s", SOURCE_ATTRIBUTION)

    if dry_run:
        for status, type_names in WFS_LAYERS.items():
            wfs_url = build_wfs_url(WFS_BASE_URL, type_names)
            log.info("[dry-run] Would fetch (%s) %s -> %s", status, wfs_url, out_path)
        return True

    all_rows: list[dict] = []
    for status, type_names in WFS_LAYERS.items():
        wfs_url = build_wfs_url(WFS_BASE_URL, type_names)
        try:
            geojson = fetch_geojson(wfs_url)
        except RuntimeError as exc:
            log.error("Failed to fetch WFS (%s): %s", status, exc)
            return False
        all_rows.extend(parse_features(geojson, status))

    if not all_rows:
        log.error("No valid rows produced — not writing parquet.")
        return False

    try:
        write_parquet(all_rows, out_path)
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
            "Download Hamburg 'Soziale Erhaltungsverordnungen' displacement-"
            "protection-zone polygons from the LGV Hamburg WFS and write Parquet."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/hamburg/displacement",
        type=Path,
        help="Output directory for the parquet file (default: data/raw/hamburg/displacement).",
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

    ok = run(out_dir, dry_run=args.dry_run)

    if not ok:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
