"""
ingestion/berlin/price_rent/ingest_bodenrichtwerte.py
=====================================================
D1 — Bodenrichtwerte (land reference values) 2024 ingestion for Berlin.

Source: GDI Berlin OGC WFS, dl-de-zero-2.0
  https://gdi.berlin.de/services/wfs/brw2024
  Feature type: brw2024:brw_2024_vector
  Native CRS: EPSG:25833 (ETRS89 / UTM zone 33N). NOT reprojected.

Confirmed attribute names (from live WFS probe, 2026-06-18):
  brwid        -- BRW zone identifier (string, e.g. '1002')
  brw          -- Bodenrichtwert value in EUR/m2 (integer/float)
  nutzung      -- Land use code (string, e.g. 'W - Wohngebiet')
  bezirk       -- District name
  stichtag     -- Reference date (string 'YYYY-MM-DD')
  anwert       -- Anpassungswert (nullable)
  verfahrensart -- Procedure type (nullable)
  gfz          -- Floor area ratio (float, nullable)
  beitragszustand -- Contribution status
  lumnum       -- LUM number (nullable)
  Feature ID format: brw_2024_vector.<brwid>

Paginated WFS GeoJSON: count=1000 + startIndex until empty page.

Output parquet schema (data/raw/berlin/price_rent/bodenrichtwert_2024.parquet):
  reference_date     (date32): 2024-01-01
  geometry_wkb       (bytes):  MultiPolygon WKB, EPSG:25833
  brw_id             (string): zone identifier (brwid attribute)
  value_eur_per_m2   (float64): Bodenrichtwert in EUR/m2 (brw attribute)
  nutzung            (string): land use code (nutzung attribute)
  source_attribution (string): dl-de-zero-2.0 attribution

Usage:
  uv run python ingestion/berlin/price_rent/ingest_bodenrichtwerte.py \\
      --out-dir data/raw/berlin/price_rent

  # Dry run (no HTTP calls):
  uv run python ingestion/berlin/price_rent/ingest_bodenrichtwerte.py \\
      --out-dir data/raw/berlin/price_rent --dry-run
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

import datetime
import json

import pyarrow as pa
import pyarrow.parquet as pq

try:
    from shapely.geometry import shape as shapely_shape
    from shapely import to_wkb as shapely_to_wkb
except ImportError as exc:
    raise ImportError(
        "shapely is required for Bodenrichtwerte ingestion. "
        "It is in pyproject.toml — run `uv sync`."
    ) from exc

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

SOURCE_ATTRIBUTION = (
    "Senatsverwaltung fuer Stadtentwicklung, Bauen und Wohnen Berlin / "
    "Gutachterausschuss fuer Grundstueckswerte in Berlin, "
    "Bodenrichtwerte Berlin 2024, dl-de-zero-2.0 -- "
    "https://daten.berlin.de/datensaetze/bodenrichtwerte-01-01-2024-wfs-c2092cb3"
)

WFS_BASE_URL = "https://gdi.berlin.de/services/wfs/brw2024"
WFS_TYPE_NAMES = "brw2024:brw_2024_vector"
WFS_PAGE_SIZE = 1000
REFERENCE_DATE = datetime.date(2024, 1, 1)
OUTPUT_FILENAME = "bodenrichtwert_2024.parquet"

# Confirmed attribute names from live WFS probe on 2026-06-18.
# Primary: brwid (feature ID), brw (BRW value EUR/m2), nutzung (land use).
ATTR_BRW_ID = "brwid"
ATTR_BRW_VALUE = "brw"
ATTR_NUTZUNG = "nutzung"

# Parquet schema
BRW_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("reference_date", pa.date32()),
        pa.field("geometry_wkb", pa.large_binary()),
        pa.field("brw_id", pa.string()),
        pa.field("value_eur_per_m2", pa.float64()),
        pa.field("nutzung", pa.string()),
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
log = logging.getLogger("brw_ingest")


# ---------------------------------------------------------------------------
# WFS paginated fetch
# ---------------------------------------------------------------------------


def build_wfs_url(offset: int) -> str:
    """Build the WFS 2.0.0 GetFeature URL for a given startIndex."""
    params = {
        "service": "WFS",
        "version": "2.0.0",
        "request": "GetFeature",
        "typeNames": WFS_TYPE_NAMES,
        "outputFormat": "application/json",
        "count": str(WFS_PAGE_SIZE),
        "startIndex": str(offset),
    }
    return WFS_BASE_URL + "?" + urllib.parse.urlencode(params)


def fetch_page(offset: int, timeout: int = 120) -> dict:
    """Fetch one WFS page as a parsed GeoJSON dict."""
    url = build_wfs_url(offset)
    log.info("Fetching BRW WFS page: startIndex=%d  url=%s", offset, url)
    try:
        with urllib.request.urlopen(url, timeout=timeout, context=_SSL_CONTEXT) as resp:  # noqa: S310
            raw = resp.read()
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Network error fetching offset={offset}: {exc}") from exc
    except Exception as exc:
        raise RuntimeError(f"Unexpected error fetching offset={offset}: {exc}") from exc

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Invalid JSON at offset={offset}: {exc}") from exc

    if data.get("type") != "FeatureCollection":
        raise RuntimeError(
            f"Expected GeoJSON FeatureCollection at offset={offset}, "
            f"got type={data.get('type')!r}. Excerpt: {str(raw[:200])}"
        )
    return data


def fetch_all_features() -> list[dict]:
    """Paginate through the WFS endpoint and return all raw GeoJSON features."""
    all_features: list[dict] = []
    offset = 0
    while True:
        page = fetch_page(offset)
        page_features = page.get("features", [])
        n = len(page_features)
        log.info(
            "Page offset=%d returned %d features (running total: %d)",
            offset,
            n,
            len(all_features) + n,
        )
        if n == 0:
            log.info("Empty page at offset=%d — pagination complete.", offset)
            break
        all_features.extend(page_features)
        offset += WFS_PAGE_SIZE
        if n < WFS_PAGE_SIZE:
            # Last partial page
            log.info("Partial page (%d < %d) — pagination complete.", n, WFS_PAGE_SIZE)
            break
    log.info("Total BRW features fetched: %d", len(all_features))
    return all_features


# ---------------------------------------------------------------------------
# Feature parsing
# ---------------------------------------------------------------------------


def parse_feature(feat: dict, idx: int) -> Optional[dict]:
    """Parse one GeoJSON feature into a row dict. Returns None on failure."""
    props = feat.get("properties") or {}
    feature_id = feat.get("id", "")

    # --- brw_id ---
    raw_id = (
        props.get(ATTR_BRW_ID)
        or props.get(ATTR_BRW_ID.upper())
        or props.get("OBJECTID")
        or props.get("objectid")
    )
    if raw_id is None:
        # Fall back to the feature-level ID suffix
        if "." in str(feature_id):
            raw_id = str(feature_id).rsplit(".", 1)[-1]
        else:
            raw_id = str(feature_id) if feature_id else str(idx)
    brw_id = str(raw_id).strip()

    # --- value_eur_per_m2 ---
    raw_val = props.get(ATTR_BRW_VALUE) or props.get(ATTR_BRW_VALUE.upper())
    if raw_val is None:
        log.warning(
            "Feature %s (idx=%d) missing BRW value attribute '%s'; skipping.",
            brw_id,
            idx,
            ATTR_BRW_VALUE,
        )
        return None
    try:
        value_eur_per_m2 = float(raw_val)
    except (TypeError, ValueError):
        log.warning(
            "Feature %s (idx=%d) has non-numeric BRW value %r; skipping.", brw_id, idx, raw_val
        )
        return None

    # --- nutzung ---
    nutzung = str(props.get(ATTR_NUTZUNG) or props.get(ATTR_NUTZUNG.upper()) or "").strip()

    # --- geometry ---
    geom_raw = feat.get("geometry")
    if geom_raw is None:
        log.warning("Feature %s (idx=%d) has null geometry; skipping.", brw_id, idx)
        return None
    try:
        geom = shapely_shape(geom_raw)
        wkb_bytes = bytes(shapely_to_wkb(geom))
    except Exception as exc:
        log.warning(
            "Feature %s (idx=%d) geometry conversion failed: %s; skipping.", brw_id, idx, exc
        )
        return None

    return {
        "reference_date": REFERENCE_DATE,
        "geometry_wkb": wkb_bytes,
        "brw_id": brw_id,
        "value_eur_per_m2": value_eur_per_m2,
        "nutzung": nutzung,
        "source_attribution": SOURCE_ATTRIBUTION,
    }


def parse_features(features: list[dict]) -> list[dict]:
    """Parse all raw GeoJSON features, skipping invalid ones."""
    rows: list[dict] = []
    skipped = 0
    for idx, feat in enumerate(features):
        row = parse_feature(feat, idx)
        if row is not None:
            rows.append(row)
        else:
            skipped += 1
    if skipped:
        log.warning("Skipped %d features due to missing/invalid data.", skipped)
    log.info("Parsed %d valid BRW rows.", len(rows))
    return rows


# ---------------------------------------------------------------------------
# Write parquet
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path) -> None:
    """Write parsed rows to Parquet using the BRW schema."""
    table = pa.table(
        {
            "reference_date": pa.array([r["reference_date"] for r in rows], type=pa.date32()),
            "geometry_wkb": pa.array([r["geometry_wkb"] for r in rows], type=pa.large_binary()),
            "brw_id": pa.array([r["brw_id"] for r in rows], type=pa.string()),
            "value_eur_per_m2": pa.array([r["value_eur_per_m2"] for r in rows], type=pa.float64()),
            "nutzung": pa.array([r["nutzung"] for r in rows], type=pa.string()),
            "source_attribution": pa.array(
                [r["source_attribution"] for r in rows], type=pa.string()
            ),
        },
        schema=BRW_PARQUET_SCHEMA,
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    pq.write_table(table, out_path, compression="snappy")
    log.info("Wrote %d rows to %s", len(rows), out_path)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Berlin Bodenrichtwerte 2024 from GDI Berlin WFS "
            "and write Parquet (data/raw/berlin/price_rent/bodenrichtwert_2024.parquet)."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/berlin/price_rent",
        type=Path,
        help="Output directory for the parquet file (default: data/raw/berlin/price_rent).",
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
    out_path = out_dir / OUTPUT_FILENAME

    log.info("Bodenrichtwerte 2024 ingestion started.")
    log.info("Attribution: %s", SOURCE_ATTRIBUTION)
    log.info(
        "WFS attribute mapping confirmed (2026-06-18): "
        "brw_id=brwid, value=brw, nutzung=nutzung, "
        "geometry=MultiPolygon EPSG:25833"
    )

    if args.dry_run:
        log.info("[dry-run] Would paginate %s -> %s", WFS_BASE_URL, out_path)
        log.info("[dry-run] Page size: %d features per request", WFS_PAGE_SIZE)
        return 0

    try:
        features = fetch_all_features()
    except RuntimeError as exc:
        log.error("Failed to fetch BRW WFS: %s", exc)
        return 1

    if not features:
        log.error("No features returned from WFS -- not writing parquet.")
        return 1

    rows = parse_features(features)

    if not rows:
        log.error("No valid rows parsed -- not writing parquet.")
        return 1

    try:
        write_parquet(rows, out_path)
    except Exception as exc:
        log.error("Failed to write parquet: %s", exc)
        return 1

    log.info("Bodenrichtwerte 2024 ingestion complete: %d rows -> %s", len(rows), out_path)
    return 0


if __name__ == "__main__":
    sys.exit(main())
