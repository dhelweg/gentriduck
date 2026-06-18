"""
ingestion/berlin/lor/ingest_lor_geometries.py
=============================================
C3-geo — LOR (Lebensweltlich Orientierte Raeume) geometry ingestion for Berlin.

Source: GDI Berlin OGC WFS, CC BY 3.0 DE
  Pre-2021: https://gdi.berlin.de/services/wfs/lor_2019
    typeNames=lor_2019:a_lor_plr_2019  (~448 PLR areas)
  LOR 2021: https://gdi.berlin.de/services/wfs/lor_2021
    typeNames=lor_2021:a_lor_plr_2021  (~542 PLR areas)

Both endpoints return GeoJSON with outputFormat=application/json.
Native CRS: EPSG:25833 (ETRS89 / UTM zone 33N). NOT reprojected.

Output parquet schema (per file):
  vintage            (string): 'lor_pre2021' or 'lor_2021'
  area_code          (string): plr_id attribute, zero-padded to 8 chars
  area_name          (string): human-readable PLR name (planungsraum / plr_name attribute)
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

Runtime: ~5-15 s for both vintages on normal broadband.
"""

from __future__ import annotations

import argparse
import logging
import ssl
import sys
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Optional

# macOS Python does not ship CA certs; use certifi's bundle when available.
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
        "shapely is required for LOR geometry ingestion. "
        "Add it to pyproject.toml and run `uv sync`."
    ) from exc

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

SOURCE_ATTRIBUTION = "Geoportal Berlin / GDI Berlin, CC BY 3.0 DE — https://gdi.berlin.de/"

# WFS endpoint configurations per vintage.
# Both endpoints return GeoJSON; the plr_id attribute is the area_code.
WFS_CONFIGS = {
    "lor_pre2021": {
        "base_url": "https://gdi.berlin.de/services/wfs/lor_2019",
        "type_names": "lor_2019:a_lor_plr_2019",
        "out_file": "pre2021.parquet",
    },
    "lor_2021": {
        "base_url": "https://gdi.berlin.de/services/wfs/lor_2021",
        "type_names": "lor_2021:a_lor_plr_2021",
        "out_file": "lor_2021.parquet",
    },
}

# Candidate attribute names for the PLR name field across vintages.
# The WFS responses vary slightly in attribute naming between vintage years.
PLR_NAME_CANDIDATES = ["planungsraum", "plr_name", "plr_nam", "bez_name", "name"]

# Parquet schema for the output files.
LOR_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("vintage", pa.string()),
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


def fetch_geojson(url: str, timeout: int = 120) -> dict:
    """
    Fetch GeoJSON from a WFS URL.

    Returns the parsed JSON dict. Raises on network / HTTP errors.
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

    return data


# ---------------------------------------------------------------------------
# Feature parsing
# ---------------------------------------------------------------------------


def _extract_area_name(props: dict) -> str:
    """Extract PLR name from feature properties, trying multiple candidate keys."""
    for key in PLR_NAME_CANDIDATES:
        val = props.get(key) or props.get(key.upper())
        if val and str(val).strip():
            return str(val).strip()
    # Last resort: look for any key that contains 'name' or 'raum'
    for key, val in props.items():
        if val and any(kw in key.lower() for kw in ("name", "raum", "planungsraum")):
            return str(val).strip()
    return ""


def parse_features(geojson: dict, vintage: str) -> list[dict]:
    """
    Parse GeoJSON features into row dicts for the output parquet.

    Each feature produces one row:
      vintage, area_code, area_name, geometry_wkb, source_attribution

    Skips features with missing plr_id or null geometry (logs a warning per skip).
    """
    features = geojson.get("features", [])
    log.info("Parsing %d features for vintage=%r", len(features), vintage)

    rows: list[dict] = []
    skipped = 0

    for feat in features:
        props = feat.get("properties") or {}

        # Extract area_code from plr_id attribute (zero-padded to 8 chars).
        raw_id = props.get("plr_id") or props.get("PLR_ID") or props.get("RAUMID")
        if raw_id is None:
            log.warning(
                "Feature missing plr_id attribute (vintage=%s); skipping. Props keys: %s",
                vintage,
                list(props.keys())[:10],
            )
            skipped += 1
            continue

        area_code = str(raw_id).strip().zfill(8)

        area_name = _extract_area_name(props)
        if not area_name:
            log.debug("Feature %s has no recognisable name attribute; area_name=''", area_code)

        # Parse geometry using shapely, convert to WKB bytes.
        geom_raw = feat.get("geometry")
        if geom_raw is None:
            log.warning("Feature %s has null geometry (vintage=%s); skipping.", area_code, vintage)
            skipped += 1
            continue

        try:
            geom = shapely_shape(geom_raw)
            wkb_bytes = bytes(shapely_to_wkb(geom))
        except Exception as exc:
            log.warning(
                "Failed to convert geometry for feature %s (vintage=%s): %s; skipping.",
                area_code,
                vintage,
                exc,
            )
            skipped += 1
            continue

        rows.append(
            {
                "vintage": vintage,
                "area_code": area_code,
                "area_name": area_name,
                "geometry_wkb": wkb_bytes,
                "source_attribution": SOURCE_ATTRIBUTION,
            }
        )

    if skipped:
        log.warning("Skipped %d features for vintage=%r (missing id/geometry)", skipped, vintage)

    log.info("Parsed %d valid rows for vintage=%r", len(rows), vintage)
    return rows


# ---------------------------------------------------------------------------
# Write parquet
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path) -> None:
    """Write parsed rows to a Parquet file using the LOR schema."""
    vintages = [r["vintage"] for r in rows]
    area_codes = [r["area_code"] for r in rows]
    area_names = [r["area_name"] for r in rows]
    geometry_wkbs = [r["geometry_wkb"] for r in rows]
    attributions = [r["source_attribution"] for r in rows]

    table = pa.table(
        {
            "vintage": pa.array(vintages, type=pa.string()),
            "area_code": pa.array(area_codes, type=pa.string()),
            "area_name": pa.array(area_names, type=pa.string()),
            "geometry_wkb": pa.array(geometry_wkbs, type=pa.large_binary()),
            "source_attribution": pa.array(attributions, type=pa.string()),
        },
        schema=LOR_PARQUET_SCHEMA,
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    pq.write_table(table, out_path, compression="snappy")
    log.info("Wrote %d rows to %s", len(rows), out_path)


# ---------------------------------------------------------------------------
# Per-vintage pipeline
# ---------------------------------------------------------------------------


def process_vintage(
    vintage: str,
    config: dict,
    out_dir: Path,
    dry_run: bool = False,
) -> bool:
    """Fetch WFS, parse features, write parquet. Returns True on success."""
    out_path = out_dir / config["out_file"]
    wfs_url = build_wfs_url(config["base_url"], config["type_names"])

    log.info(
        "[%s] Attribution: %s",
        vintage,
        SOURCE_ATTRIBUTION,
    )

    if dry_run:
        log.info("[dry-run] Would fetch %s -> %s", wfs_url, out_path)
        return True

    try:
        geojson = fetch_geojson(wfs_url)
    except RuntimeError as exc:
        log.error("Failed to fetch WFS for vintage=%r: %s", vintage, exc)
        return False

    rows = parse_features(geojson, vintage)

    if not rows:
        log.error("No valid rows produced for vintage=%r — not writing parquet.", vintage)
        return False

    try:
        write_parquet(rows, out_path)
    except Exception as exc:
        log.error("Failed to write parquet for vintage=%r: %s", vintage, exc)
        return False

    return True


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Download Berlin LOR PLR geometries from GDI Berlin WFS and write Parquet."
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

    for vintage, config in WFS_CONFIGS.items():
        ok = process_vintage(vintage, config, out_dir, dry_run=args.dry_run)
        if ok:
            success_count += 1
        else:
            error_count += 1

    log.info("Summary: %d vintages processed, %d errors.", success_count, error_count)

    if error_count > 0:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
