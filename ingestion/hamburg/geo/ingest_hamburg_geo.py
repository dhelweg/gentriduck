"""
ingestion/hamburg/geo/ingest_hamburg_geo.py
============================================
H1 (#40) — Hamburg geometry ingestion: statistische Gebiete, Stadtteile,
Bezirke. First slice of the Hamburg second-city onboarding (ADR-0014
Pillar 4 "geometry first"), mirroring ingestion/berlin/lor/ingest_lor_geometries.py.

Source: Hamburg LGV (Landesbetrieb Geoinformation und Vermessung) WFS, via
the Transparenzportal / geodienste.hamburg.de. Licence dl-de/by-2.0
(attribution required) — see ADR-0014.

Endpoints (verified live, 2026-07-01):
  Statistische Gebiete:
    https://geodienste.hamburg.de/HH_WFS_Statistische_Gebiete
    typeNames=app:statistische_gebiete   (945 features; ADR-0014 documents
    the 943-vs-941 vintage caveat as an open crosswalk question — this
    ingestor pulls the current live edition only, tagged vintage='current'.
    A historical-vintage crosswalk is deferred, mirroring ADR-0003 Berlin
    LOR pre2021->2021 open question #3.)
  Stadtteile + Bezirke:
    https://geodienste.hamburg.de/HH_WFS_Verwaltungsgrenzen
    typeNames=app:stadtteile  (104 features)
    typeNames=app:bezirke     (7 features)

All three endpoints return GeoJSON with outputFormat=application/geo+json
(NOTE: not 'application/json' — this WFS instance (deegree) rejects that
value with InvalidParameterValue; confirmed live 2026-07-01).

Native CRS: EPSG:25832 (ETRS89 / UTM zone 32N) — differs from Berlin's
EPSG:25833 (UTM 33N). NOT reprojected here; downstream models must consult
dim_city.native_crs_epsg per ADR-0014's per-city CRS parameter.

Output parquet schema (one file per layer):
  city_code           (string): 'HH' (ADR-0005 canonical Hamburg code)
  area_level           (string): 'subarea_l2' (statgebiet) | 'subarea_l1' (stadtteil)
                                  | 'district' (bezirk) -- generic dim_area levels,
                                  see ADR-0014 Pillar-1 mapping table.
  area_vintage         (string): 'current' (live WFS edition at ingestion time)
  area_code            (string): natural key per layer (statgebiet / stadtteil_schluessel
                                  / bezirk code)
  area_name            (string): human-readable name ('' for statgebiet, which the
                                  source does not name)
  parent_area_code     (string): bezirk code for stadtteile; null otherwise
  geometry_wkb          (bytes): geometry in WKB, CRS EPSG:25832 (native, not reprojected)
  source_attribution   (string): mandatory dl-de/by-2.0 attribution

Usage:
  uv run python ingestion/hamburg/geo/ingest_hamburg_geo.py \\
      --out-dir data/raw/hamburg/geo

  # Dry run (no HTTP calls):
  uv run python ingestion/hamburg/geo/ingest_hamburg_geo.py \\
      --out-dir data/raw/hamburg/geo --dry-run

Attribution (mandatory — dl-de/by-2.0, ADR-0014):
  "Freie und Hansestadt Hamburg, Landesbetrieb Geoinformation und Vermessung"
  Every output row carries source_attribution; the stg_hamburg_geo staging
  model and the website attribution page (Epic G3) must surface this.

Runtime: ~5-20 s for all three layers on normal broadband.
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
        "shapely is required for Hamburg geometry ingestion. "
        "Add it to pyproject.toml and run `uv sync`."
    ) from exc

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

SOURCE_ATTRIBUTION = (
    "Freie und Hansestadt Hamburg, Landesbetrieb Geoinformation und Vermessung, "
    "dl-de/by-2.0 — https://transparenz.hamburg.de/"
)
CITY_CODE = "HH"

# WFS layer configurations. All three confirmed live 2026-07-01.
WFS_LAYERS = {
    "statgebiet": {
        "base_url": "https://geodienste.hamburg.de/HH_WFS_Statistische_Gebiete",
        "type_names": "app:statistische_gebiete",
        "area_level": "subarea_l2",
        "id_prop": "statgebiet",
        "name_prop": None,  # source has no name field for statistische Gebiete
        "parent_prop": None,
        "out_file": "statgebiet.parquet",
    },
    "stadtteil": {
        "base_url": "https://geodienste.hamburg.de/HH_WFS_Verwaltungsgrenzen",
        "type_names": "app:stadtteile",
        "area_level": "subarea_l1",
        "id_prop": "stadtteil_schluessel",
        "name_prop": "stadtteil_name",
        "parent_prop": "bezirk",
        "out_file": "stadtteil.parquet",
    },
    "bezirk": {
        "base_url": "https://geodienste.hamburg.de/HH_WFS_Verwaltungsgrenzen",
        "type_names": "app:bezirke",
        "area_level": "district",
        "id_prop": "bezirk",
        "name_prop": "bezirk_name",
        "parent_prop": None,
        "out_file": "bezirk.parquet",
    },
}

GEO_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("city_code", pa.string()),
        pa.field("area_level", pa.string()),
        pa.field("area_vintage", pa.string()),
        pa.field("area_code", pa.string()),
        pa.field("area_name", pa.string()),
        pa.field("parent_area_code", pa.string()),
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
log = logging.getLogger("hamburg_geo_ingest")


# ---------------------------------------------------------------------------
# WFS fetch
# ---------------------------------------------------------------------------


def build_wfs_url(base_url: str, type_names: str) -> str:
    """Build the WFS 2.0.0 GetFeature URL for a given base URL and typeNames.

    NOTE: outputFormat must be 'application/geo+json' for Hamburg's deegree
    WFS instances — 'application/json' (used by Berlin's GDI WFS) raises
    InvalidParameterValue here. Confirmed live 2026-07-01.
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
    """Fetch GeoJSON from a WFS URL. Returns parsed JSON dict; raises on error."""
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


def parse_features(geojson: dict, layer: str, config: dict) -> list[dict]:
    """Parse GeoJSON features into row dicts for the output parquet."""
    features = geojson.get("features", [])
    log.info("Parsing %d features for layer=%r", len(features), layer)

    rows: list[dict] = []
    skipped = 0

    for feat in features:
        props = feat.get("properties") or {}

        raw_id = props.get(config["id_prop"])
        if raw_id is None or str(raw_id).strip() == "":
            log.warning(
                "Feature missing %s attribute (layer=%s); skipping. Props: %s",
                config["id_prop"],
                layer,
                list(props.keys())[:10],
            )
            skipped += 1
            continue
        area_code = str(raw_id).strip()

        area_name = ""
        if config["name_prop"]:
            area_name = str(props.get(config["name_prop"]) or "").strip()

        parent_area_code = None
        if config["parent_prop"]:
            raw_parent = props.get(config["parent_prop"])
            if raw_parent is not None and str(raw_parent).strip() != "":
                parent_area_code = str(raw_parent).strip()

        geom_raw = feat.get("geometry")
        if geom_raw is None:
            log.warning("Feature %s has null geometry (layer=%s); skipping.", area_code, layer)
            skipped += 1
            continue

        try:
            geom = shapely_shape(geom_raw)
            wkb_bytes = bytes(shapely_to_wkb(geom))
        except Exception as exc:
            log.warning(
                "Failed to convert geometry for feature %s (layer=%s): %s; skipping.",
                area_code,
                layer,
                exc,
            )
            skipped += 1
            continue

        rows.append(
            {
                "city_code": CITY_CODE,
                "area_level": config["area_level"],
                "area_vintage": "current",
                "area_code": area_code,
                "area_name": area_name,
                "parent_area_code": parent_area_code,
                "geometry_wkb": wkb_bytes,
                "source_attribution": SOURCE_ATTRIBUTION,
            }
        )

    if skipped:
        log.warning("Skipped %d features for layer=%r (missing id/geometry)", skipped, layer)

    log.info("Parsed %d valid rows for layer=%r", len(rows), layer)
    return rows


# ---------------------------------------------------------------------------
# Write parquet
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path) -> None:
    """Write parsed rows to a Parquet file using the Hamburg geo schema."""
    table = pa.table(
        {
            "city_code": pa.array([r["city_code"] for r in rows], type=pa.string()),
            "area_level": pa.array([r["area_level"] for r in rows], type=pa.string()),
            "area_vintage": pa.array([r["area_vintage"] for r in rows], type=pa.string()),
            "area_code": pa.array([r["area_code"] for r in rows], type=pa.string()),
            "area_name": pa.array([r["area_name"] for r in rows], type=pa.string()),
            "parent_area_code": pa.array([r["parent_area_code"] for r in rows], type=pa.string()),
            "geometry_wkb": pa.array([r["geometry_wkb"] for r in rows], type=pa.large_binary()),
            "source_attribution": pa.array(
                [r["source_attribution"] for r in rows], type=pa.string()
            ),
        },
        schema=GEO_PARQUET_SCHEMA,
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    pq.write_table(table, out_path, compression="snappy")
    log.info("Wrote %d rows to %s", len(rows), out_path)


# ---------------------------------------------------------------------------
# Per-layer pipeline
# ---------------------------------------------------------------------------


def process_layer(layer: str, config: dict, out_dir: Path, dry_run: bool = False) -> bool:
    """Fetch WFS, parse features, write parquet. Returns True on success."""
    out_path = out_dir / config["out_file"]
    wfs_url = build_wfs_url(config["base_url"], config["type_names"])

    log.info("[%s] Attribution: %s", layer, SOURCE_ATTRIBUTION)

    if dry_run:
        log.info("[dry-run] Would fetch %s -> %s", wfs_url, out_path)
        return True

    try:
        geojson = fetch_geojson(wfs_url)
    except RuntimeError as exc:
        log.error("Failed to fetch WFS for layer=%r: %s", layer, exc)
        return False

    rows = parse_features(geojson, layer, config)

    if not rows:
        log.error("No valid rows produced for layer=%r — not writing parquet.", layer)
        return False

    try:
        write_parquet(rows, out_path)
    except Exception as exc:
        log.error("Failed to write parquet for layer=%r: %s", layer, exc)
        return False

    return True


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Hamburg statistische Gebiete / Stadtteile / Bezirke "
            "geometries from the LGV Hamburg WFS and write Parquet."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/hamburg/geo",
        type=Path,
        help="Output directory for parquet files (default: data/raw/hamburg/geo).",
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

    for layer, config in WFS_LAYERS.items():
        ok = process_layer(layer, config, out_dir, dry_run=args.dry_run)
        if ok:
            success_count += 1
        else:
            error_count += 1

    log.info("Summary: %d layers processed, %d errors.", success_count, error_count)

    if error_count > 0:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
