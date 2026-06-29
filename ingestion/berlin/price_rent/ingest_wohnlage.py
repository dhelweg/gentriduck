"""
ingestion/berlin/price_rent/ingest_wohnlage.py
===============================================
D1 — Wohnlagen nach Adressen (Mietspiegel) ingestion for Berlin.

Supports historical vintages via the --years flag (multiple years at once):
  wohnlagenadr2017  (Stichtag 01.09.2016, confirmed available 2026-06-18)
  wohnlagenadr2019  (Stichtag 01.09.2018, confirmed available 2026-06-18)
  wohnlagenadr2021  (Stichtag 01.09.2020, confirmed available 2026-06-18)
  wohnlagenadr2023  (Stichtag 01.09.2022, confirmed available 2026-06-18)
  wohnlagenadr2026  (Stichtag 01.09.2025, confirmed available 2026-06-18)

Source: GDI Berlin OGC WFS, dl-de-zero-2.0
  URL pattern: https://gdi.berlin.de/services/wfs/wohnlagenadr{year}
  Feature type: wohnlagenadr{year}:wohnlagenadr{year}
  Native CRS: EPSG:25833 (ETRS89 / UTM zone 33N). NOT reprojected.
  Total features: ~397k (varies by vintage, 5-15 minutes per run).

Confirmed attribute names (from live WFS probe, 2026-06-18):
  schluessel   -- address/block identifier (string, e.g. '00001001')
  bezname      -- district name
  plz          -- postal code
  strasse      -- street name
  hnr          -- house number
  wol          -- Wohnlage classification (string: 'einfach', 'mittel', 'gut')
  laerm        -- noise classification ('Ja'/'Nein')
  stadtteil    -- city district
  plr_name     -- PLR (Planungsraum) name
  Feature ID format: wohnlagenadr{year}.<schluessel>
  Geometry type: MultiPoint (EPSG:25833)

Paginated WFS GeoJSON: count=500 + startIndex.
  ~397k rows / 500 = ~796 pages. Estimated runtime: 5-15 minutes.

Partial-data safety: if the download takes > 15 minutes or is interrupted,
  the script writes whatever pages were fetched and logs a warning.
  The output file is written once at the end (not per-page) to avoid
  partial Parquet corruption.

Output parquet schema (data/raw/berlin/price_rent/wohnlage_{year}.parquet):
  vintage            (int32):  {year}
  city_code          (string): 'berlin' (ADR-0005)
  geometry_wkb       (bytes):  MultiPoint WKB, EPSG:25833
  wohnlage           (string): Wohnlage classification (wol attribute)
  address_id         (string, nullable): schluessel attribute
  source_attribution (string): dl-de-zero-2.0 attribution

Usage:
  # Ingest all available years (default):
  uv run python ingestion/berlin/price_rent/ingest_wohnlage.py \\
      --out-dir data/raw/berlin/price_rent

  # Specific vintages:
  uv run python ingestion/berlin/price_rent/ingest_wohnlage.py \\
      --out-dir data/raw/berlin/price_rent --years 2017 2021

  # Dry run (no HTTP calls):
  uv run python ingestion/berlin/price_rent/ingest_wohnlage.py \\
      --out-dir data/raw/berlin/price_rent --dry-run

  # Limit pages (useful for smoke-testing):
  uv run python ingestion/berlin/price_rent/ingest_wohnlage.py \\
      --out-dir data/raw/berlin/price_rent --max-pages 5
"""

from __future__ import annotations

import argparse
import datetime
import logging
import ssl
import sys
import time
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
        "shapely is required for Wohnlage ingestion. It is in pyproject.toml -- run `uv sync`."
    ) from exc

# ---------------------------------------------------------------------------
# Per-year configuration
# ---------------------------------------------------------------------------

# Only these specific Mietspiegel edition years are available via WFS.
# Confirmed live on GDI Berlin (2026-06-18).
AVAILABLE_YEARS = [2017, 2019, 2021, 2023, 2026]

# Stichtag (reference date) per vintage year. NOT Jan 1; each Mietspiegel uses
# the survey cutoff date from the prior September.
_REFERENCE_DATES = {
    2017: datetime.date(2016, 9, 1),  # Stichtag 01.09.2016
    2019: datetime.date(2018, 9, 1),  # Stichtag 01.09.2018
    2021: datetime.date(2020, 9, 1),  # Stichtag 01.09.2020
    2023: datetime.date(2022, 9, 1),  # Stichtag 01.09.2022
    2026: datetime.date(2025, 9, 1),  # Stichtag 01.09.2025
}

# Attribution text template per year.
_ATTRIBUTION_TEMPLATE = (
    "Senatsverwaltung fuer Stadtentwicklung, Bauen und Wohnen Berlin, "
    "Wohnlagen Mietspiegel {year}, dl-de-zero-2.0 -- "
    "https://daten.berlin.de/datensaetze/"
    "wohnlagen-nach-adressen-zum-berliner-mietspiegel-{year}-wfs"
)

# Years with known stable dataset URL slugs on daten.berlin.de.
_ATTRIBUTION_OVERRIDES = {
    2023: (
        "Senatsverwaltung fuer Stadtentwicklung, Bauen und Wohnen Berlin, "
        "Wohnlagen Mietspiegel 2023, dl-de-zero-2.0 -- "
        "https://daten.berlin.de/datensaetze/"
        "wohnlagen-nach-adressen-zum-berliner-mietspiegel-2023-wfs-b9979169"
    ),
    2026: (
        "Senatsverwaltung fuer Stadtentwicklung, Bauen und Wohnen Berlin, "
        "Wohnlagen Mietspiegel 2026, dl-de-zero-2.0 -- "
        "https://daten.berlin.de/datensaetze/"
        "wohnlagen-nach-adressen-zum-berliner-mietspiegel-2026-wfs-809faebe"
    ),
}

WFS_BASE_URL_TEMPLATE = "https://gdi.berlin.de/services/wfs/wohnlagenadr{year}"

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

WFS_PAGE_SIZE = 500

# Maximum time budget in seconds (15 minutes).
MAX_RUNTIME_SECONDS = 15 * 60

# Confirmed attribute names from live WFS probe on 2026-06-18.
# wol = Wohnlage classification (einfach/mittel/gut)
# schluessel = address/block identifier
ATTR_WOHNLAGE = "wol"
ATTR_ADDRESS_ID = "schluessel"

# Parquet schema — includes city_code (ADR-0005)
WOHNLAGE_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("vintage", pa.int32()),
        pa.field("city_code", pa.string()),
        pa.field("geometry_wkb", pa.large_binary()),
        pa.field("wohnlage", pa.string()),
        pa.field("address_id", pa.string()),
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
log = logging.getLogger("wohnlage_ingest")


# ---------------------------------------------------------------------------
# WFS paginated fetch
# ---------------------------------------------------------------------------


def build_wfs_url(wfs_base_url: str, wfs_type_names: str, offset: int) -> str:
    """Build the WFS 2.0.0 GetFeature URL for a given startIndex."""
    params = {
        "service": "WFS",
        "version": "2.0.0",
        "request": "GetFeature",
        "typeNames": wfs_type_names,
        "outputFormat": "application/json",
        "count": str(WFS_PAGE_SIZE),
        "startIndex": str(offset),
    }
    return wfs_base_url + "?" + urllib.parse.urlencode(params)


def fetch_page(wfs_base_url: str, wfs_type_names: str, offset: int, timeout: int = 120) -> dict:
    """Fetch one WFS page as a parsed GeoJSON dict."""
    url = build_wfs_url(wfs_base_url, wfs_type_names, offset)
    log.debug("Fetching Wohnlage WFS page: startIndex=%d", offset)
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


def fetch_all_features(
    wfs_base_url: str,
    wfs_type_names: str,
    max_pages: Optional[int] = None,
) -> tuple[list[dict], bool]:
    """
    Paginate through the WFS endpoint and return all raw GeoJSON features.

    Returns (features, is_complete) where is_complete=False when the download
    was cut short by the time budget or max_pages limit.
    """
    all_features: list[dict] = []
    offset = 0
    page_num = 0
    start_time = time.monotonic()
    is_complete = True

    while True:
        elapsed = time.monotonic() - start_time
        if elapsed >= MAX_RUNTIME_SECONDS:
            log.warning(
                "Time budget exceeded (%.0fs >= %ds) after %d pages / %d features. "
                "Writing partial data.",
                elapsed,
                MAX_RUNTIME_SECONDS,
                page_num,
                len(all_features),
            )
            is_complete = False
            break

        if max_pages is not None and page_num >= max_pages:
            log.info("--max-pages=%d reached; stopping early.", max_pages)
            is_complete = False
            break

        page = fetch_page(wfs_base_url, wfs_type_names, offset)
        page_features = page.get("features", [])
        n = len(page_features)

        if page_num % 50 == 0 or n < WFS_PAGE_SIZE:
            log.info(
                "Page %d (offset=%d): %d features | running total: %d | elapsed: %.0fs",
                page_num,
                offset,
                n,
                len(all_features) + n,
                time.monotonic() - start_time,
            )

        if n == 0:
            log.info("Empty page at offset=%d -- pagination complete.", offset)
            break

        all_features.extend(page_features)
        page_num += 1
        offset += WFS_PAGE_SIZE

        if n < WFS_PAGE_SIZE:
            log.info("Partial page (%d < %d) -- pagination complete.", n, WFS_PAGE_SIZE)
            break

    elapsed = time.monotonic() - start_time
    log.info(
        "Fetch complete: %d features in %d pages (%.0fs). Complete=%s",
        len(all_features),
        page_num,
        elapsed,
        is_complete,
    )
    return all_features, is_complete


# ---------------------------------------------------------------------------
# Feature parsing
# ---------------------------------------------------------------------------


def parse_feature(feat: dict, idx: int, vintage: int, source_attribution: str) -> Optional[dict]:
    """Parse one GeoJSON feature into a row dict. Returns None on failure."""
    props = feat.get("properties") or {}
    feature_id = feat.get("id", "")

    # --- address_id ---
    raw_id = (
        props.get(ATTR_ADDRESS_ID) or props.get(ATTR_ADDRESS_ID.upper()) or props.get("SCHLUESSEL")
    )
    if raw_id is None and feature_id:
        # Fall back to the feature-level ID suffix
        raw_id = str(feature_id).rsplit(".", 1)[-1] if "." in str(feature_id) else str(feature_id)
    address_id = str(raw_id).strip() if raw_id is not None else None

    # --- wohnlage ---
    wohnlage = (
        props.get(ATTR_WOHNLAGE)
        or props.get(ATTR_WOHNLAGE.upper())
        or props.get("WOHNLAGE")
        or props.get("wohnlage")
        or props.get("Wohnlage")
    )
    if wohnlage is None:
        log.warning(
            "Feature %s (idx=%d) missing wohnlage attribute '%s'; skipping.",
            address_id,
            idx,
            ATTR_WOHNLAGE,
        )
        return None
    wohnlage = str(wohnlage).strip()

    # --- geometry ---
    geom_raw = feat.get("geometry")
    if geom_raw is None:
        log.warning("Feature %s (idx=%d) has null geometry; skipping.", address_id, idx)
        return None
    try:
        geom = shapely_shape(geom_raw)
        wkb_bytes = bytes(shapely_to_wkb(geom))
    except Exception as exc:
        log.warning(
            "Feature %s (idx=%d) geometry conversion failed: %s; skipping.", address_id, idx, exc
        )
        return None

    return {
        "vintage": vintage,
        "city_code": "berlin",
        "geometry_wkb": wkb_bytes,
        "wohnlage": wohnlage,
        "address_id": address_id,
        "source_attribution": source_attribution,
    }


def parse_features(features: list[dict], vintage: int, source_attribution: str) -> list[dict]:
    """Parse all raw GeoJSON features, skipping invalid ones."""
    rows: list[dict] = []
    skipped = 0
    for idx, feat in enumerate(features):
        row = parse_feature(feat, idx, vintage, source_attribution)
        if row is not None:
            rows.append(row)
        else:
            skipped += 1
        if (idx + 1) % 50000 == 0:
            log.info("Parsed %d / %d features so far...", idx + 1, len(features))
    if skipped:
        log.warning("Skipped %d features due to missing/invalid data.", skipped)
    log.info("Parsed %d valid Wohnlage rows.", len(rows))
    return rows


# ---------------------------------------------------------------------------
# Write parquet
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path, is_complete: bool) -> None:
    """Write parsed rows to Parquet using the Wohnlage schema.

    Safety: always writes to a .tmp path first.  If is_complete=True the tmp
    file is atomically renamed to out_path so dbt never sees a partial file.
    If is_complete=False the .tmp file is kept for manual inspection but the
    canonical out_path is not updated.
    """
    tmp_path = out_path.with_suffix(".tmp.parquet")
    table = pa.table(
        {
            "vintage": pa.array([r["vintage"] for r in rows], type=pa.int32()),
            "city_code": pa.array([r["city_code"] for r in rows], type=pa.string()),
            "geometry_wkb": pa.array([r["geometry_wkb"] for r in rows], type=pa.large_binary()),
            "wohnlage": pa.array([r["wohnlage"] for r in rows], type=pa.string()),
            "address_id": pa.array([r["address_id"] for r in rows], type=pa.string()),
            "source_attribution": pa.array(
                [r["source_attribution"] for r in rows], type=pa.string()
            ),
        },
        schema=WOHNLAGE_PARQUET_SCHEMA,
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        pq.write_table(table, tmp_path, compression="snappy")
        if is_complete:
            tmp_path.rename(out_path)
            log.info("Wrote %d rows to %s", len(rows), out_path)
        else:
            log.warning(
                "PARTIAL DATA: only %d features downloaded. "
                "Kept as %s — will NOT be picked up by dbt. "
                "Re-run without --max-pages (or within the 15-min budget) to get full data.",
                len(rows),
                tmp_path,
            )
    except Exception:
        tmp_path.unlink(missing_ok=True)
        raise


# ---------------------------------------------------------------------------
# Per-year ingestion
# ---------------------------------------------------------------------------


def ingest_year(year: int, out_dir: Path, max_pages: Optional[int] = None) -> int:
    """Ingest Wohnlage for one vintage year. Returns row count written (0 on failure)."""
    if year not in AVAILABLE_YEARS:
        raise ValueError(f"Year {year} not in AVAILABLE_YEARS={AVAILABLE_YEARS}")

    wfs_base_url = WFS_BASE_URL_TEMPLATE.format(year=year)
    wfs_type_names = f"wohnlagenadr{year}:wohnlagenadr{year}"
    source_attribution = _ATTRIBUTION_OVERRIDES.get(
        year, _ATTRIBUTION_TEMPLATE.format(year=year)
    )
    out_path = out_dir / f"wohnlage_{year}.parquet"

    log.info("=== Wohnlagen Mietspiegel %d ingestion started ===", year)
    log.info("WFS endpoint: %s", wfs_base_url)
    log.info("Feature type: %s", wfs_type_names)
    log.info("Reference date (Stichtag): %s", _REFERENCE_DATES[year])
    log.info("Output: %s", out_path)
    log.info(
        "WFS attribute mapping confirmed (2026-06-18): "
        "wohnlage=wol, address_id=schluessel, "
        "geometry=MultiPoint EPSG:25833"
    )
    log.info("Total features: ~397k. Expected pages: ~796. ETA: 5-15 min.")

    try:
        features, is_complete = fetch_all_features(
            wfs_base_url, wfs_type_names, max_pages=max_pages
        )
    except RuntimeError as exc:
        log.error("Failed to fetch Wohnlage WFS for year=%d: %s", year, exc)
        return 0

    if not features:
        log.error("No features returned from WFS for year=%d -- not writing parquet.", year)
        return 0

    rows = parse_features(features, year, source_attribution)

    if not rows:
        log.error("No valid rows parsed for year=%d -- not writing parquet.", year)
        return 0

    if not is_complete:
        log.warning(
            "PARTIAL DATA WARNING: Only %d features were downloaded for year=%d. "
            "Re-run without --max-pages (or within the 15-min budget) for full data.",
            len(rows),
            year,
        )

    try:
        write_parquet(rows, out_path, is_complete=is_complete)
    except Exception as exc:
        log.error("Failed to write parquet for year=%d: %s", year, exc)
        return 0

    log.info(
        "=== Wohnlagen %d complete: %d rows -> %s (complete=%s) ===",
        year,
        len(rows),
        out_path,
        is_complete,
    )
    return len(rows)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Berlin Wohnlagen Mietspiegel from GDI Berlin WFS "
            "and write Parquet (data/raw/berlin/price_rent/wohnlage_{year}.parquet). "
            "WARNING: ~397k features per vintage -- expect 5-15 minutes download time per year."
        )
    )
    p.add_argument(
        "--years",
        nargs="+",
        type=int,
        default=AVAILABLE_YEARS,
        choices=AVAILABLE_YEARS,
        help=(
            f"Mietspiegel vintage years to ingest (default: all {AVAILABLE_YEARS}). "
            "Supported: 2017, 2019, 2021, 2023, 2026."
        ),
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/berlin/price_rent",
        type=Path,
        help="Output directory for the parquet files (default: data/raw/berlin/price_rent).",
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be fetched without making HTTP calls.",
    )
    p.add_argument(
        "--max-pages",
        type=int,
        default=None,
        help="Limit download to N pages per year (for smoke-testing; e.g. --max-pages 5).",
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
            wfs_base_url = WFS_BASE_URL_TEMPLATE.format(year=year)
            wfs_type_names = f"wohnlagenadr{year}:wohnlagenadr{year}"
            out_path = out_dir / f"wohnlage_{year}.parquet"
            log.info(
                "[dry-run] Would paginate %s (type=%s) -> %s",
                wfs_base_url,
                wfs_type_names,
                out_path,
            )
        log.info("[dry-run] Page size: %d features per request", WFS_PAGE_SIZE)
        log.info("[dry-run] Available years: %s", AVAILABLE_YEARS)
        return 0

    total = 0
    for year in args.years:
        total += ingest_year(year, out_dir, max_pages=args.max_pages)

    log.info("All years complete. Grand total: %d rows.", total)
    return 0 if total > 0 else 1


if __name__ == "__main__":
    sys.exit(main())
