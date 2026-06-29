"""
ingestion/berlin/price_rent/ingest_kauffaelle.py
================================================
D1b — Berliner Kauffälle (Verkaufte Grundstücke) WFS ingestion.

Source: GDI Berlin OGC WFS, dl-de-zero-2.0
  Base URL: https://gdi.berlin.de/services/wfs/kauffaelle_{year}
  Publisher: Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin
             (Gutachterausschuss für Grundstückswerte in Berlin)
  Licence: Datenlizenz Deutschland — Zero — Version 2.0 (DL-Zero-2.0)
  CRS: EPSG:25833 (native, not reprojected)

Available years: 2024, 2025 (confirmed 2026-06-29; earlier years not published
via this WFS pattern — no endpoint exists for <2024).

Sub-market layers (same 9 FeatureTypes per year):
  a_teileigen   Teileigentum Gewerbe
  b_sonstteil   Sonstiges Teileigentum
  c_eigentwhg   Eigentumswohnungen  ← primary for gentrification (condo sales)
  d_rohbauland  Bauerwartungsland bzw. Rohbauland
  e_nichtbauland Nichtbauland
  f_bauland     Bauland
  g_gewerbe     Dienstleistung, Gewerbegrundstücke
  h_einfamhaus  Ein- und Zweifamilienhäuser
  i_mehrfamhaus Mehrfamilienwohnhäuser  ← primary for gentrification (MFH sales)

Output: one parquet per year:
  data/raw/berlin/price_rent/kauffaelle_{year}.parquet

Output schema:
  reference_date     (date32)       -- YYYY-01-01 for the given year
  city_code          (string)       -- 'berlin' (ADR-0005)
  teilmarkt          (string)       -- sub-market layer name (e.g. 'c_eigentwhg')
  geometry_wkb       (large_binary) -- Point/geometry WKB, EPSG:25833
  transaction_id     (string)       -- WFS feature ID
  kaufpreis_eur      (float64)      -- purchase price in EUR (null if not exposed)
  flaeche_m2         (float64)      -- plot/floor area in m2 (null if not exposed)
  kauftyp            (string)       -- sub-market type string from WFS
  raw_properties_json (string)      -- full JSON of all WFS properties for audit
  source_attribution (string)       -- DL-Zero-2.0 attribution

Usage:
  # Ingest 2024 and 2025 (default):
  uv run python ingestion/berlin/price_rent/ingest_kauffaelle.py \\
      --out-dir data/raw/berlin/price_rent

  # Specific year only:
  uv run python ingestion/berlin/price_rent/ingest_kauffaelle.py \\
      --out-dir data/raw/berlin/price_rent --years 2024

  # Dry run (no HTTP calls):
  uv run python ingestion/berlin/price_rent/ingest_kauffaelle.py \\
      --out-dir data/raw/berlin/price_rent --dry-run
"""

from __future__ import annotations

import argparse
import datetime
import json
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

import pyarrow as pa
import pyarrow.parquet as pq

try:
    from shapely import to_wkb as shapely_to_wkb
    from shapely.geometry import shape as shapely_shape
except ImportError as exc:
    raise ImportError(
        "shapely is required for Kauffälle ingestion. "
        "It is in pyproject.toml — run `uv sync`."
    ) from exc

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

WFS_BASE_URL_TEMPLATE = "https://gdi.berlin.de/services/wfs/kauffaelle_{year}"

# Sub-market layer codes (without the namespace prefix).
TEILMARKT_CODES = [
    "a_teileigen",
    "b_sonstteil",
    "c_eigentwhg",
    "d_rohbauland",
    "e_nichtbauland",
    "f_bauland",
    "g_gewerbe",
    "h_einfamhaus",
    "i_mehrfamhaus",
]

# Available years confirmed by live WFS probe (2026-06-29).
# No endpoint exists for years < 2024 under this URL pattern.
AVAILABLE_YEARS = [2024, 2025]

WFS_PAGE_SIZE = 500

SOURCE_ATTRIBUTION_TEMPLATE = (
    "Senatsverwaltung fuer Stadtentwicklung, Bauen und Wohnen Berlin / "
    "Gutachterausschuss fuer Grundstueckswerte in Berlin, "
    "Kauffaelle Berlin {year}, dl-de-zero-2.0 -- "
    "https://gdi.berlin.de/services/wfs/kauffaelle_{year}"
)

# Candidate attribute names for price and area — WFS DescribeFeatureType only
# exposes id/kauftyp/geom, but actual features contain richer attributes.
# We try these names in order and take the first non-null match.
PRICE_CANDIDATES = ["kaufpreis", "KAUFPREIS", "preis", "PREIS", "price"]
AREA_CANDIDATES = [
    "flaeche",
    "FLAECHE",
    "grundstuecksflaeche",
    "GRUNDSTUECKSFLAECHE",
    "area",
    "AREA",
    "wohnflaeche",
    "WOHNFLAECHE",
]

KAUFFAELLE_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("reference_date", pa.date32()),
        pa.field("city_code", pa.string()),
        pa.field("teilmarkt", pa.string()),
        pa.field("geometry_wkb", pa.large_binary()),
        pa.field("transaction_id", pa.string()),
        pa.field("kaufpreis_eur", pa.float64()),
        pa.field("flaeche_m2", pa.float64()),
        pa.field("kauftyp", pa.string()),
        pa.field("raw_properties_json", pa.string()),
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
log = logging.getLogger("kauffaelle_ingest")


# ---------------------------------------------------------------------------
# WFS fetch helpers
# ---------------------------------------------------------------------------


def build_wfs_url(base_url: str, type_name: str, offset: int) -> str:
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
    url = build_wfs_url(base_url, type_name, offset)
    log.info("GET %s (offset=%d)", url, offset)
    try:
        with urllib.request.urlopen(url, timeout=timeout, context=_SSL_CONTEXT) as resp:  # noqa: S310
            raw = resp.read()
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Network error for {type_name} offset={offset}: {exc}") from exc

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise RuntimeError(
            f"Invalid JSON for {type_name} offset={offset}: {exc}"
        ) from exc

    if data.get("type") != "FeatureCollection":
        raise RuntimeError(
            f"Expected FeatureCollection for {type_name} offset={offset}, "
            f"got type={data.get('type')!r}. Excerpt: {str(raw[:300])}"
        )
    return data


def fetch_all_features(base_url: str, type_name: str) -> list[dict]:
    """Paginate through one WFS layer and return all raw GeoJSON features."""
    all_features: list[dict] = []
    offset = 0
    while True:
        page = fetch_page(base_url, type_name, offset)
        page_features = page.get("features", [])
        n = len(page_features)
        all_features.extend(page_features)
        log.info(
            "%s offset=%d: %d features (running total %d)",
            type_name,
            offset,
            n,
            len(all_features),
        )
        if n == 0 or n < WFS_PAGE_SIZE:
            break
        offset += WFS_PAGE_SIZE
    return all_features


# ---------------------------------------------------------------------------
# Feature parsing
# ---------------------------------------------------------------------------


def _first_match(props: dict, candidates: list[str]) -> Optional[float]:
    """Return the first non-null numeric value found among candidate keys."""
    for key in candidates:
        val = props.get(key)
        if val is not None:
            try:
                return float(val)
            except (TypeError, ValueError):
                continue
    return None


def parse_feature(
    feat: dict,
    teilmarkt: str,
    reference_date: datetime.date,
    source_attribution: str,
    idx: int,
) -> Optional[dict]:
    props = feat.get("properties") or {}
    # Year-prefix makes transaction_id globally unique across the UNION ALL of multiple
    # year parquets — WFS 2.0.0 GeoJSON feature IDs restart per service (e.g. "layer.1").
    raw_id = str(feat.get("id") or idx)
    feature_id = f"{reference_date.year}_{raw_id}"

    geom_raw = feat.get("geometry")
    if geom_raw is None:
        log.debug("Feature %s (idx=%d) has null geometry; skipping.", feature_id, idx)
        return None
    try:
        geom = shapely_shape(geom_raw)
        wkb_bytes = bytes(shapely_to_wkb(geom))
    except Exception as exc:
        log.warning(
            "Feature %s (idx=%d) geometry error: %s; skipping.", feature_id, idx, exc
        )
        return None

    kaufpreis = _first_match(props, PRICE_CANDIDATES)
    flaeche = _first_match(props, AREA_CANDIDATES)
    kauftyp = str(props.get("kauftyp") or props.get("KAUFTYP") or "").strip()

    return {
        "reference_date": reference_date,
        "city_code": "berlin",
        "teilmarkt": teilmarkt,
        "geometry_wkb": wkb_bytes,
        "transaction_id": feature_id,
        "kaufpreis_eur": kaufpreis,
        "flaeche_m2": flaeche,
        "kauftyp": kauftyp,
        "raw_properties_json": json.dumps(props, ensure_ascii=False),
        "source_attribution": source_attribution,
    }


# ---------------------------------------------------------------------------
# Write parquet
# ---------------------------------------------------------------------------


def rows_to_table(rows: list[dict]) -> pa.Table:
    return pa.table(
        {
            "reference_date": pa.array(
                [r["reference_date"] for r in rows], type=pa.date32()
            ),
            "city_code": pa.array([r["city_code"] for r in rows], type=pa.string()),
            "teilmarkt": pa.array([r["teilmarkt"] for r in rows], type=pa.string()),
            "geometry_wkb": pa.array(
                [r["geometry_wkb"] for r in rows], type=pa.large_binary()
            ),
            "transaction_id": pa.array(
                [r["transaction_id"] for r in rows], type=pa.string()
            ),
            "kaufpreis_eur": pa.array(
                [r["kaufpreis_eur"] for r in rows], type=pa.float64()
            ),
            "flaeche_m2": pa.array([r["flaeche_m2"] for r in rows], type=pa.float64()),
            "kauftyp": pa.array([r["kauftyp"] for r in rows], type=pa.string()),
            "raw_properties_json": pa.array(
                [r["raw_properties_json"] for r in rows], type=pa.string()
            ),
            "source_attribution": pa.array(
                [r["source_attribution"] for r in rows], type=pa.string()
            ),
        },
        schema=KAUFFAELLE_PARQUET_SCHEMA,
    )


def write_parquet(rows: list[dict], out_path: Path) -> None:
    table = rows_to_table(rows)
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
    """Ingest all sub-market layers for one year. Returns total row count."""
    base_url = WFS_BASE_URL_TEMPLATE.format(year=year)
    source_attribution = SOURCE_ATTRIBUTION_TEMPLATE.format(year=year)
    reference_date = datetime.date(year, 1, 1)
    out_path = out_dir / f"kauffaelle_{year}.parquet"

    log.info("=== Kauffälle %d ingestion started ===", year)
    log.info("WFS base URL: %s", base_url)
    log.info("Output: %s", out_path)

    all_rows: list[dict] = []

    for teilmarkt in TEILMARKT_CODES:
        type_name = f"kauffaelle_{year}:{teilmarkt}"
        log.info("Fetching %s...", type_name)
        try:
            features = fetch_all_features(base_url, type_name)
        except RuntimeError as exc:
            log.warning("Failed to fetch %s: %s — skipping layer.", type_name, exc)
            continue

        if not features:
            log.info("No features for %s.", type_name)
            continue

        # Log available property keys from first feature (for audit).
        first_props = features[0].get("properties") or {}
        log.info(
            "%s property keys: %s",
            teilmarkt,
            list(first_props.keys())[:20],
        )

        layer_rows: list[dict] = []
        skipped = 0
        for idx, feat in enumerate(features):
            row = parse_feature(feat, teilmarkt, reference_date, source_attribution, idx)
            if row is not None:
                layer_rows.append(row)
            else:
                skipped += 1

        log.info(
            "%s: %d valid rows, %d skipped.", teilmarkt, len(layer_rows), skipped
        )
        all_rows.extend(layer_rows)

    if not all_rows:
        log.error("No valid rows for year=%d — not writing parquet.", year)
        return 0

    write_parquet(all_rows, out_path)
    log.info("=== Kauffälle %d complete: %d total rows ===", year, len(all_rows))
    return len(all_rows)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Berlin Kauffälle (Verkaufte Grundstücke) from GDI Berlin WFS "
            "and write Parquet to data/raw/berlin/price_rent/kauffaelle_{year}.parquet."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/berlin/price_rent",
        type=Path,
        help="Output directory for parquet files (default: data/raw/berlin/price_rent).",
    )
    p.add_argument(
        "--years",
        nargs="+",
        type=int,
        default=AVAILABLE_YEARS,
        choices=AVAILABLE_YEARS,
        help=f"Years to ingest (default: {AVAILABLE_YEARS}). Only 2024 and 2025 "
        "are available — no WFS endpoint exists for earlier years.",
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
            out_path = out_dir / f"kauffaelle_{year}.parquet"
            log.info(
                "[dry-run] Would fetch %d sub-market layers from %s -> %s",
                len(TEILMARKT_CODES),
                base_url,
                out_path,
            )
        log.info("[dry-run] Note: only years %s have live WFS endpoints.", AVAILABLE_YEARS)
        return 0

    total = 0
    for year in args.years:
        total += ingest_year(year, out_dir)

    log.info("All years complete. Grand total: %d rows.", total)
    return 0 if total > 0 else 1


if __name__ == "__main__":
    sys.exit(main())
