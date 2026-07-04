"""
ingestion/berlin/price_rent/ingest_bodenrichtwerte.py
=====================================================
D1a — Bodenrichtwerte (land reference values) back-series 2017–2024 ingestion for Berlin.

Source: GDI Berlin OGC WFS, dl-de-zero-2.0
  Base URL: https://gdi.berlin.de/services/wfs/brw{year}
  Feature type: brw{year}:brw_{year}_vector
  Native CRS: EPSG:25833 (ETRS89 / UTM zone 33N). NOT reprojected.

Available years: 2017–2024 (all confirmed live 2026-06-29 via HTTP 200 probe).

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
  Feature ID format: brw_{year}_vector.<brwid>

Paginated WFS GeoJSON: count=1000 + startIndex until empty page.

Output: one parquet per year:
  data/raw/berlin/price_rent/bodenrichtwert_{year}.parquet

Output parquet schema:
  reference_date     (date32): YYYY-01-01
  geometry_wkb       (bytes):  MultiPolygon WKB, EPSG:25833
  brw_id             (string): zone identifier (brwid attribute)
  value_eur_per_m2   (float64): Bodenrichtwert in EUR/m2 (brw attribute)
  nutzung            (string): land use code (nutzung attribute)
  source_attribution (string): dl-de-zero-2.0 attribution

Usage:
  # Ingest all years 2017–2024 (default):
  uv run python ingestion/berlin/price_rent/ingest_bodenrichtwerte.py \\
      --out-dir data/raw/berlin/price_rent

  # Specific year only:
  uv run python ingestion/berlin/price_rent/ingest_bodenrichtwerte.py \\
      --out-dir data/raw/berlin/price_rent --years 2024

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

# All years confirmed live at https://gdi.berlin.de/services/wfs/brw{year}
# via HTTP 200 probe on 2026-06-29.
AVAILABLE_YEARS = list(range(2017, 2025))

WFS_BASE_URL_TEMPLATE = "https://gdi.berlin.de/services/wfs/brw{year}"
WFS_PAGE_SIZE = 1000

SOURCE_ATTRIBUTION_TEMPLATE = (
    "Senatsverwaltung fuer Stadtentwicklung, Bauen und Wohnen Berlin / "
    "Gutachterausschuss fuer Grundstueckswerte in Berlin, "
    "Bodenrichtwerte Berlin {year}, dl-de-zero-2.0 -- "
    "https://www.stadtentwicklung.berlin.de/geoinformation/fachthemen/boris/"
)

# Confirmed attribute names from live WFS probe on 2026-06-18.
# Primary: brwid (feature ID), brw (BRW value EUR/m2), nutzung (land use).
ATTR_BRW_ID = "brwid"
ATTR_BRW_VALUE = "brw"
ATTR_NUTZUNG = "nutzung"

# Parquet schema
BRW_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("reference_date", pa.date32()),
        pa.field("city_code", pa.string()),
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


def build_wfs_url(base_url: str, type_name: str, offset: int) -> str:
    """Build the WFS 2.0.0 GetFeature URL for a given startIndex."""
    params = {
        "service": "WFS",
        "version": "2.0.0",
        "request": "GetFeature",
        "typeNames": type_name,
        "outputFormat": "application/json",
        "count": str(WFS_PAGE_SIZE),
        "startIndex": str(offset),
    }
    return base_url + "?" + urllib.parse.urlencode(params)


def fetch_page(base_url: str, type_name: str, offset: int, timeout: int = 120) -> dict:
    """Fetch one WFS page as a parsed GeoJSON dict."""
    url = build_wfs_url(base_url, type_name, offset)
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


def fetch_all_features(base_url: str, type_name: str) -> list[dict]:
    """Paginate through the WFS endpoint and return all raw GeoJSON features."""
    all_features: list[dict] = []
    offset = 0
    while True:
        page = fetch_page(base_url, type_name, offset)
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


def parse_feature(
    feat: dict,
    idx: int,
    reference_date: datetime.date,
    source_attribution: str,
) -> Optional[dict]:
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
    raw_val = props.get(ATTR_BRW_VALUE)
    if raw_val is None:
        raw_val = props.get(ATTR_BRW_VALUE.upper())
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
        "reference_date": reference_date,
        "city_code": "berlin",
        "geometry_wkb": wkb_bytes,
        "brw_id": brw_id,
        "value_eur_per_m2": value_eur_per_m2,
        "nutzung": nutzung,
        "source_attribution": source_attribution,
    }


def parse_features(
    features: list[dict],
    reference_date: datetime.date,
    source_attribution: str,
) -> list[dict]:
    """Parse all raw GeoJSON features, skipping invalid ones."""
    rows: list[dict] = []
    skipped = 0
    for idx, feat in enumerate(features):
        row = parse_feature(feat, idx, reference_date, source_attribution)
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
            "city_code": pa.array([r["city_code"] for r in rows], type=pa.string()),
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
    tmp_path = out_path.with_suffix(".tmp.parquet")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        pq.write_table(table, tmp_path, compression="snappy")
        tmp_path.rename(out_path)
    except Exception:
        tmp_path.unlink(missing_ok=True)
        raise
    log.info("Wrote %d rows to %s", len(rows), out_path)


# ---------------------------------------------------------------------------
# Per-year ingestion
# ---------------------------------------------------------------------------


def ingest_year(year: int, out_dir: Path) -> int:
    """Ingest Bodenrichtwerte for one year. Returns row count written."""
    base_url = WFS_BASE_URL_TEMPLATE.format(year=year)
    type_name = f"brw{year}:brw_{year}_vector"
    source_attribution = SOURCE_ATTRIBUTION_TEMPLATE.format(year=year)
    reference_date = datetime.date(year, 1, 1)
    out_path = out_dir / f"bodenrichtwert_{year}.parquet"

    log.info("=== Bodenrichtwerte %d ingestion started ===", year)
    log.info("WFS base URL: %s", base_url)
    log.info("Feature type: %s", type_name)
    log.info("Output: %s", out_path)
    log.info(
        "WFS attribute mapping confirmed (2026-06-18): "
        "brw_id=brwid, value=brw, nutzung=nutzung, "
        "geometry=MultiPolygon EPSG:25833"
    )

    try:
        features = fetch_all_features(base_url, type_name)
    except RuntimeError as exc:
        log.error("Failed to fetch BRW WFS for year=%d: %s", year, exc)
        return 0

    if not features:
        log.error("No features returned from WFS for year=%d -- not writing parquet.", year)
        return 0

    rows = parse_features(features, reference_date, source_attribution)

    if not rows:
        log.error("No valid rows parsed for year=%d -- not writing parquet.", year)
        return 0

    try:
        write_parquet(rows, out_path)
    except Exception as exc:
        log.error("Failed to write parquet for year=%d: %s", year, exc)
        return 0

    log.info("=== Bodenrichtwerte %d complete: %d rows -> %s ===", year, len(rows), out_path)
    return len(rows)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Berlin Bodenrichtwerte (2017–2024) from GDI Berlin WFS "
            "and write Parquet to data/raw/berlin/price_rent/bodenrichtwert_{year}.parquet."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/berlin/price_rent",
        type=Path,
        help="Output directory for the parquet files (default: data/raw/berlin/price_rent).",
    )
    p.add_argument(
        "--years",
        nargs="+",
        type=int,
        default=AVAILABLE_YEARS,
        choices=AVAILABLE_YEARS,
        help=f"Years to ingest (default: all {AVAILABLE_YEARS}). "
        "All years 2017–2024 confirmed live via HTTP 200 probe on 2026-06-29.",
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
        for year in args.years:
            base_url = WFS_BASE_URL_TEMPLATE.format(year=year)
            type_name = f"brw{year}:brw_{year}_vector"
            out_path = out_dir / f"bodenrichtwert_{year}.parquet"
            log.info(
                "[dry-run] Would paginate %s (type=%s) -> %s",
                base_url,
                type_name,
                out_path,
            )
        log.info("[dry-run] Page size: %d features per request", WFS_PAGE_SIZE)
        log.info("[dry-run] Available years: %s", AVAILABLE_YEARS)
        return 0

    total = 0
    for year in args.years:
        total += ingest_year(year, out_dir)

    log.info("All years complete. Grand total: %d rows.", total)
    return 0 if total > 0 else 1


if __name__ == "__main__":
    sys.exit(main())
