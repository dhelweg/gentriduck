"""
ingestion/berlin/price_rent/ingest_wohnlage.py
===============================================
D1 — Wohnlagen nach Adressen (Mietspiegel 2023) ingestion for Berlin.

Source: GDI Berlin OGC WFS, dl-de-zero-2.0
  https://gdi.berlin.de/services/wfs/wohnlagenadr2023
  Feature type: wohnlagenadr2023:wohnlagenadr2023
  Native CRS: EPSG:25833 (ETRS89 / UTM zone 33N). NOT reprojected.
  Total features: ~397,542 (confirmed 2026-06-18).

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
  Feature ID format: wohnlagenadr2023.<schluessel>
  Geometry type: MultiPoint (EPSG:25833)

Paginated WFS GeoJSON: count=500 + startIndex.
  ~397k rows / 500 = ~796 pages. Estimated runtime: 5-15 minutes.

Partial-data safety: if the download takes > 15 minutes or is interrupted,
  the script writes whatever pages were fetched and logs a warning.
  The output file is written once at the end (not per-page) to avoid
  partial Parquet corruption.

Output parquet schema (data/raw/berlin/price_rent/wohnlage_2023.parquet):
  vintage            (int32):  2023
  geometry_wkb       (bytes):  MultiPoint WKB, EPSG:25833
  wohnlage           (string): Wohnlage classification (wol attribute)
  address_id         (string, nullable): schluessel attribute
  source_attribution (string): dl-de-zero-2.0 attribution

Usage:
  uv run python ingestion/berlin/price_rent/ingest_wohnlage.py \\
      --out-dir data/raw/berlin/price_rent

  # Dry run (no HTTP calls):
  uv run python ingestion/berlin/price_rent/ingest_wohnlage.py \\
      --out-dir data/raw/berlin/price_rent --dry-run

  # Limit pages (useful for smoke-testing):
  uv run python ingestion/berlin/price_rent/ingest_wohnlage.py \\
      --out-dir data/raw/berlin/price_rent --max-pages 5
"""

from __future__ import annotations

import argparse
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
# Constants
# ---------------------------------------------------------------------------

SOURCE_ATTRIBUTION = (
    "Senatsverwaltung fuer Stadtentwicklung, Bauen und Wohnen Berlin, "
    "Wohnlagen Mietspiegel 2023, dl-de-zero-2.0 -- "
    "https://daten.berlin.de/datensaetze/wohnlagen-nach-adressen-zum-berliner-mietspiegel-2023-wfs-b9979169"
)

WFS_BASE_URL = "https://gdi.berlin.de/services/wfs/wohnlagenadr2023"
WFS_TYPE_NAMES = "wohnlagenadr2023:wohnlagenadr2023"
WFS_PAGE_SIZE = 500
VINTAGE = 2023
OUTPUT_FILENAME = "wohnlage_2023.parquet"

# Maximum time budget in seconds (15 minutes).
MAX_RUNTIME_SECONDS = 15 * 60

# Confirmed attribute names from live WFS probe on 2026-06-18.
# wol = Wohnlage classification (einfach/mittel/gut)
# schluessel = address/block identifier
ATTR_WOHNLAGE = "wol"
ATTR_ADDRESS_ID = "schluessel"

# Parquet schema
WOHNLAGE_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("vintage", pa.int32()),
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


def fetch_all_features(max_pages: Optional[int] = None) -> tuple[list[dict], bool]:
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

        page = fetch_page(offset)
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


def parse_feature(feat: dict, idx: int) -> Optional[dict]:
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
        "vintage": VINTAGE,
        "geometry_wkb": wkb_bytes,
        "wohnlage": wohnlage,
        "address_id": address_id,
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
    """Write parsed rows to Parquet using the Wohnlage schema."""
    if not is_complete:
        log.warning(
            "Writing PARTIAL data (%d rows). Full dataset is ~397,542. "
            "Re-run ingestion to complete.",
            len(rows),
        )
    table = pa.table(
        {
            "vintage": pa.array([r["vintage"] for r in rows], type=pa.int32()),
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
    pq.write_table(table, out_path, compression="snappy")
    log.info("Wrote %d rows to %s", len(rows), out_path)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Berlin Wohnlagen Mietspiegel 2023 from GDI Berlin WFS "
            "and write Parquet (data/raw/berlin/price_rent/wohnlage_2023.parquet). "
            "WARNING: ~397k features -- expect 5-15 minutes download time."
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
        "--max-pages",
        type=int,
        default=None,
        help="Limit download to N pages (for smoke-testing; e.g. --max-pages 5).",
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

    log.info("Wohnlagen Mietspiegel 2023 ingestion started.")
    log.info("Attribution: %s", SOURCE_ATTRIBUTION)
    log.info(
        "WFS attribute mapping confirmed (2026-06-18): "
        "wohnlage=wol, address_id=schluessel, "
        "geometry=MultiPoint EPSG:25833"
    )
    log.info("Total features: ~397,542. Expected pages: ~796. ETA: 5-15 min.")

    if args.dry_run:
        log.info("[dry-run] Would paginate %s -> %s", WFS_BASE_URL, out_path)
        log.info("[dry-run] Page size: %d features per request", WFS_PAGE_SIZE)
        return 0

    try:
        features, is_complete = fetch_all_features(max_pages=args.max_pages)
    except RuntimeError as exc:
        log.error("Failed to fetch Wohnlage WFS: %s", exc)
        return 1

    if not features:
        log.error("No features returned from WFS -- not writing parquet.")
        return 1

    rows = parse_features(features)

    if not rows:
        log.error("No valid rows parsed -- not writing parquet.")
        return 1

    if not is_complete:
        log.warning(
            "PARTIAL DATA WARNING: Only %d of ~397,542 features were downloaded. "
            "Re-run without --max-pages (or within the 15-min budget) for full data.",
            len(rows),
        )

    try:
        write_parquet(rows, out_path, is_complete=is_complete)
    except Exception as exc:
        log.error("Failed to write parquet: %s", exc)
        return 1

    log.info(
        "Wohnlagen 2023 ingestion complete: %d rows -> %s (complete=%s)",
        len(rows),
        out_path,
        is_complete,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
