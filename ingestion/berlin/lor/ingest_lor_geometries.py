"""
ingestion/berlin/lor/ingest_lor_geometries.py
=============================================
C3-geo — LOR (Lebensweltlich Orientierte Raeume) geometry ingestion for Berlin.

Source: GDI Berlin OGC WFS, CC BY 3.0 DE
  Pre-2021 PLR: https://gdi.berlin.de/services/wfs/lor_2019
    typeNames=lor_2019:a_lor_plr_2019  (~448 PLR areas)
  Pre-2021 BZR: https://gdi.berlin.de/services/wfs/lor_2019
    typeNames=lor_2019:b_lor_bzr_2019  (~137 Bezirksregionen)
  2021 PLR:     https://gdi.berlin.de/services/wfs/lor_2021
    typeNames=lor_2021:a_lor_plr_2021  (~542 PLR areas)
  2021 BZR:     https://gdi.berlin.de/services/wfs/lor_2021
    typeNames=lor_2021:b_lor_bzr_2021  (~139 Bezirksregionen)

BZR layer added for #134 (bug): the 2018-thesis-golden `area_name` for BZR-level
rows is latin-1-mojibake-corrupted at the source CSV (literal '?' bytes on disk,
not a DuckDB read_csv encoding bug — confirmed by inspecting the raw bytes). The
WFS GeoJSON gives correctly-encoded (UTF-8) BZR names, mirroring how `dim_area`
already prefers WFS PLR names over thesis-golden PLR names (see dim_area.sql's
dedup comment). This ingestion script now fetches BZR alongside PLR so the same
WFS-preferred dedup pattern can extend to the 'bzr' area_level.

All endpoints return GeoJSON with outputFormat=application/json.
Native CRS: EPSG:25833 (ETRS89 / UTM zone 33N). NOT reprojected.

Output parquet schema (per file):
  vintage            (string): 'lor_pre2021' or 'lor_2021'
  area_level         (string): 'plr' or 'bzr'
  area_code          (string): plr_id/bzr_id attribute, zero-padded (8 chars for
                                plr, 6 chars for bzr)
  area_name          (string): human-readable name (planungsraum/plr_name or
                                bzr_name attribute, per level)
  geometry_wkb       (bytes):  geometry in WKB, CRS EPSG:25833 (native, not reprojected)
  source_attribution (string): mandatory CC BY 3.0 DE attribution

Usage:
  uv run python ingestion/berlin/lor/ingest_lor_geometries.py \\
      --out-dir data/raw/berlin/lor

  # Dry run (no HTTP calls):
  uv run python ingestion/berlin/lor/ingest_lor_geometries.py \\
      --out-dir data/raw/berlin/lor --dry-run

Attribution (mandatory — CC BY 3.0 DE):
  Each output parquet row carries source_attribution. The dbt staging model
  (stg_berlin_lor) and the website attribution page (Epic G3) must surface this.

Runtime: ~10-25 s for both vintages x both levels on normal broadband.
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
        "shapely is required for LOR geometry ingestion. "
        "Add it to pyproject.toml and run `uv sync`."
    ) from exc

# ADR-0016: shared drift-detection manifest helper. This script is run directly
# (`python ingestion/berlin/lor/ingest_lor_geometries.py`), not as a `-m` package
# module, so ingestion/ isn't on sys.path by default — insert it explicitly (same
# pattern ingest_hamburg_osm.py already uses for its own sibling import).
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

SOURCE_ATTRIBUTION = "Geoportal Berlin / GDI Berlin, CC BY 3.0 DE — https://gdi.berlin.de/"

# Per-level config: WFS type name suffix, id/name attribute candidates, area_code
# zero-pad width. Looked up per vintage below.
LEVEL_CONFIGS = {
    "plr": {
        "type_name_prefix": "a_lor_plr",
        "id_candidates": ["plr_id", "PLR_ID", "RAUMID"],
        "name_candidates": ["planungsraum", "plr_name", "plr_nam", "bez_name", "name"],
        "code_width": 8,
    },
    "bzr": {
        "type_name_prefix": "b_lor_bzr",
        "id_candidates": ["bzr_id", "BZR_ID"],
        "name_candidates": ["bzr_name", "bzr_nam", "name"],
        "code_width": 6,
    },
}

# WFS endpoint configurations per vintage. Both endpoints return GeoJSON.
VINTAGE_CONFIGS = {
    "lor_pre2021": {
        "base_url": "https://gdi.berlin.de/services/wfs/lor_2019",
        "type_name_suffix": "lor_2019",
        "layer_year": "2019",
        "out_prefix": "pre2021",
    },
    "lor_2021": {
        "base_url": "https://gdi.berlin.de/services/wfs/lor_2021",
        "type_name_suffix": "lor_2021",
        "layer_year": "2021",
        "out_prefix": "lor_2021",
    },
}

# Parquet schema for the output files.
LOR_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("vintage", pa.string()),
        pa.field("area_level", pa.string()),
        pa.field("area_code", pa.string()),
        pa.field("area_name", pa.string()),
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
log = logging.getLogger("lor_ingest")


# ---------------------------------------------------------------------------
# WFS fetch
# ---------------------------------------------------------------------------


def build_wfs_url(base_url: str, type_names: str) -> str:
    """Build the WFS 2.0.0 GetFeature URL for a given base URL and typeNames."""
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


def _extract_name(props: dict, name_candidates: list[str]) -> str:
    """Extract the area name from feature properties, trying candidate keys."""
    for key in name_candidates:
        val = props.get(key) or props.get(key.upper())
        if val and str(val).strip():
            return str(val).strip()
    # Last resort: look for any key that contains 'name' or 'raum'
    for key, val in props.items():
        if val and any(kw in key.lower() for kw in ("name", "raum", "planungsraum")):
            return str(val).strip()
    return ""


def parse_features(
    geojson: dict,
    vintage: str,
    area_level: str,
    id_candidates: list[str],
    name_candidates: list[str],
    code_width: int,
) -> list[dict]:
    """
    Parse GeoJSON features into row dicts for the output parquet.

    Each feature produces one row:
      vintage, area_level, area_code, area_name, geometry_wkb, source_attribution

    Skips features with missing id or null geometry (logs a warning per skip).
    """
    features = geojson.get("features", [])
    log.info("Parsing %d features for vintage=%r area_level=%r", len(features), vintage, area_level)

    rows: list[dict] = []
    skipped = 0

    for feat in features:
        props = feat.get("properties") or {}

        raw_id = None
        for key in id_candidates:
            if props.get(key) is not None:
                raw_id = props.get(key)
                break
        if raw_id is None:
            log.warning(
                "Feature missing id attribute (vintage=%s, level=%s); skipping. Props keys: %s",
                vintage,
                area_level,
                list(props.keys())[:10],
            )
            skipped += 1
            continue

        area_code = str(raw_id).strip().zfill(code_width)

        area_name = _extract_name(props, name_candidates)
        if not area_name:
            log.debug("Feature %s has no recognisable name attribute; area_name=''", area_code)

        # Parse geometry using shapely, convert to WKB bytes.
        geom_raw = feat.get("geometry")
        if geom_raw is None:
            log.warning(
                "Feature %s has null geometry (vintage=%s, level=%s); skipping.",
                area_code,
                vintage,
                area_level,
            )
            skipped += 1
            continue

        try:
            geom = shapely_shape(geom_raw)
            wkb_bytes = bytes(shapely_to_wkb(geom))
        except Exception as exc:
            log.warning(
                "Failed to convert geometry for feature %s (vintage=%s, level=%s): %s; skipping.",
                area_code,
                vintage,
                area_level,
                exc,
            )
            skipped += 1
            continue

        rows.append(
            {
                "vintage": vintage,
                "area_level": area_level,
                "area_code": area_code,
                "area_name": area_name,
                "geometry_wkb": wkb_bytes,
                "source_attribution": SOURCE_ATTRIBUTION,
            }
        )

    if skipped:
        log.warning(
            "Skipped %d features for vintage=%r area_level=%r (missing id/geometry)",
            skipped,
            vintage,
            area_level,
        )

    log.info("Parsed %d valid rows for vintage=%r area_level=%r", len(rows), vintage, area_level)
    return rows


# ---------------------------------------------------------------------------
# Write parquet
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path) -> None:
    """Write parsed rows to a Parquet file using the LOR schema (atomic write)."""
    vintages = [r["vintage"] for r in rows]
    area_levels = [r["area_level"] for r in rows]
    area_codes = [r["area_code"] for r in rows]
    area_names = [r["area_name"] for r in rows]
    geometry_wkbs = [r["geometry_wkb"] for r in rows]
    attributions = [r["source_attribution"] for r in rows]

    table = pa.table(
        {
            "vintage": pa.array(vintages, type=pa.string()),
            "area_level": pa.array(area_levels, type=pa.string()),
            "area_code": pa.array(area_codes, type=pa.string()),
            "area_name": pa.array(area_names, type=pa.string()),
            "geometry_wkb": pa.array(geometry_wkbs, type=pa.large_binary()),
            "source_attribution": pa.array(attributions, type=pa.string()),
        },
        schema=LOR_PARQUET_SCHEMA,
    )

    # QA-2 (#177): atomic write -- a crash mid-write must never leave a
    # partial/corrupt file where dbt or verify_data.py expects a complete one.
    atomic_write_parquet(table, out_path)


# ---------------------------------------------------------------------------
# Per-vintage/per-level pipeline
# ---------------------------------------------------------------------------


def process_vintage_level(
    vintage: str,
    vintage_config: dict,
    area_level: str,
    level_config: dict,
    out_dir: Path,
    dry_run: bool = False,
) -> bool:
    """Fetch WFS, parse features, write parquet. Returns True on success."""
    type_names = f"{vintage_config['type_name_suffix']}:{level_config['type_name_prefix']}_{vintage_config['layer_year']}"
    out_path = out_dir / f"{vintage_config['out_prefix']}_{area_level}.parquet"
    wfs_url = build_wfs_url(vintage_config["base_url"], type_names)

    log.info("[%s/%s] Attribution: %s", vintage, area_level, SOURCE_ATTRIBUTION)

    if dry_run:
        log.info("[dry-run] Would fetch %s -> %s", wfs_url, out_path)
        return True

    try:
        geojson = fetch_geojson(wfs_url)
    except RuntimeError as exc:
        log.error("Failed to fetch WFS for vintage=%r area_level=%r: %s", vintage, area_level, exc)
        return False

    rows = parse_features(
        geojson,
        vintage,
        area_level,
        level_config["id_candidates"],
        level_config["name_candidates"],
        level_config["code_width"],
    )

    if not rows:
        log.error(
            "No valid rows produced for vintage=%r area_level=%r — not writing parquet.",
            vintage,
            area_level,
        )
        return False

    try:
        write_parquet(rows, out_path)
    except Exception as exc:
        log.error(
            "Failed to write parquet for vintage=%r area_level=%r: %s", vintage, area_level, exc
        )
        return False

    return True


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Berlin LOR PLR + BZR geometries from GDI Berlin WFS and write Parquet."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/berlin/lor",
        type=Path,
        help="Output directory for parquet files (default: data/raw/berlin/lor).",
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

    success_count = 0
    error_count = 0

    for vintage, vintage_config in VINTAGE_CONFIGS.items():
        for area_level, level_config in LEVEL_CONFIGS.items():
            ok = process_vintage_level(
                vintage, vintage_config, area_level, level_config, out_dir, dry_run=args.dry_run
            )
            if ok:
                success_count += 1
            else:
                error_count += 1

    log.info(
        "Summary: %d vintage/level combinations processed, %d errors.",
        success_count,
        error_count,
    )

    if not args.dry_run and success_count > 0:
        _write_manifest(out_dir)

    if error_count > 0:
        return 1
    return 0


def _write_manifest(out_dir: Path) -> None:
    """ADR-0016: record this source's current on-disk outputs in the committed manifest."""
    found = existing_outputs(
        out_dir,
        [
            "pre2021_plr.parquet",
            "pre2021_bzr.parquet",
            "lor_2021_plr.parquet",
            "lor_2021_bzr.parquet",
        ],
    )
    if not found:
        return
    write_manifest_entry(
        source_id="berlin__lor_geometries",
        source_class="pinned",
        city="berlin",
        upstream_url=(
            "https://gdi.berlin.de/services/wfs/lor_2019 (pre2021) ; "
            "https://gdi.berlin.de/services/wfs/lor_2021"
        ),
        upstream_vintage="lor_pre2021 (2019 WFS edition) + lor_2021 (2021 WFS edition)",
        output_paths=found,
        ingest_script_module="ingestion.berlin.lor.ingest_lor_geometries",
    )


if __name__ == "__main__":
    sys.exit(main())
