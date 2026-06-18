"""
ingestion/berlin/mietspiegel/ingest_mietspiegel.py
===================================================
D1 — Berliner Mietspiegeltabelle multi-vintage PDF ingestion.

Downloads the official rent table PDF for each known vintage, extracts the
tabular data with pdfplumber, aggregates granular size ranges into the four
standard seed buckets, and writes one Parquet per vintage to --out-dir.

This script is an independent raw-data artefact.  The dbt seed
(transform/seeds/berlin_mietspiegel.csv) is the committed reference; the
Parquet files are gitignored outputs suitable for larger downstream pipelines.

PDF sources (all confirmed live, 2026-06-18):
  2017: https://mietspiegel.berlin.de/wp-content/uploads/2026/01/mietspiegeltabelle2017.pdf
  2019: https://mietspiegel.berlin.de/wp-content/uploads/2026/01/mietspiegeltabelle2019.pdf
  2021: https://mietspiegel.berlin.de/wp-content/uploads/2026/01/mietspiegeltabelle2021.pdf
  2023: https://mietspiegel.berlin.de/wp-content/uploads/2026/01/mietspiegeltabelle2023.pdf
  2024: https://mietspiegel.berlin.de/wp-content/uploads/2024/11/mietspiegeltabelle2024.pdf
  2026: https://mietspiegel.berlin.de/wp-content/uploads/2026/05/mietspiegeltabelle2026.pdf

Source: Senatsverwaltung fuer Stadtentwicklung und Wohnen Berlin
  License: © Land Berlin — not freely redistributable in automated form (ADR-0003
  item 11).  Only extracted numeric values are committed; raw PDFs are gitignored.

Table layouts:
  2017–2023: 8 year-built columns × (4 size × 3 wohnlage) row layout.
             One unified table per page, cells contain untere Spanne/Mittelwert/
             obere Spanne values.  Size buckets align directly with the seed
             standard (under_40, 40_to_60, 60_to_90, 90_plus).
  2024–2026: 3 per-wohnlage tables (einfache/mittlere/gute Wohnlage), each with
             more year-built columns and finer-grained size sub-ranges per cell.
             Aggregated to the 4 standard size buckets via overlap-weighted average
             (weighting by the width of each granular range's overlap with each
             standard bucket).

Output Parquet schema (data/raw/berlin/mietspiegel/mietspiegel_{year}.parquet):
  vintage              (int32):   Edition year (2017, 2019, 2021, 2023, 2024, 2026)
  year_built_bucket    (string):  Construction period key (snake_case English)
  size_bucket          (string):  Floor-area bucket (under_40/40_to_60/60_to_90/90_plus)
  wohnlage             (string):  Location quality (einfach/mittel/gut)
  rent_low             (float64): untere Spanne (EUR/m2/month, net cold rent)
  rent_mid             (float64): Mittelwert / Median (EUR/m2/month)
  rent_high            (float64): obere Spanne (EUR/m2/month)
  source_attribution   (string):  Full source citation including edition, publisher,
                                   reference date (Stichtag), and equipment standard.

Usage:
  # All vintages:
  uv run --with pdfplumber python ingestion/berlin/mietspiegel/ingest_mietspiegel.py \\
      --out-dir data/raw/berlin/mietspiegel

  # Specific vintages:
  uv run --with pdfplumber python ingestion/berlin/mietspiegel/ingest_mietspiegel.py \\
      --out-dir data/raw/berlin/mietspiegel --years 2024,2026

  # Dry run (no network calls, no output):
  uv run --with pdfplumber python ingestion/berlin/mietspiegel/ingest_mietspiegel.py \\
      --out-dir data/raw/berlin/mietspiegel --dry-run

  # Verbose logging:
  uv run --with pdfplumber python ingestion/berlin/mietspiegel/ingest_mietspiegel.py \\
      --out-dir data/raw/berlin/mietspiegel --years 2026 --verbose

Note: pdfplumber is intentionally NOT added to pyproject.toml — use
  `uv run --with pdfplumber` to avoid adding a heavy PDF dependency to the
  core environment that does not otherwise require it.
"""

from __future__ import annotations

import argparse
import logging
import re
import ssl
import sys
import urllib.request
from pathlib import Path
from typing import Optional

# macOS Python does not ship CA certs; use certifi's bundle when available.
try:
    import certifi as _certifi

    _SSL_CONTEXT = ssl.create_default_context(cafile=_certifi.where())
except ImportError:
    _SSL_CONTEXT = ssl.create_default_context()

try:
    import pdfplumber  # noqa: F401 — checked at import time; used in parse functions
except ImportError as exc:
    raise ImportError(
        "pdfplumber is required for Mietspiegel ingestion.  "
        "Run with: uv run --with pdfplumber python ingestion/berlin/mietspiegel/ingest_mietspiegel.py"
    ) from exc

import pyarrow as pa
import pyarrow.parquet as pq

# ---------------------------------------------------------------------------
# Known vintages and PDF URLs
# ---------------------------------------------------------------------------

VINTAGE_URLS: dict[int, str] = {
    2017: "https://mietspiegel.berlin.de/wp-content/uploads/2026/01/mietspiegeltabelle2017.pdf",
    2019: "https://mietspiegel.berlin.de/wp-content/uploads/2026/01/mietspiegeltabelle2019.pdf",
    2021: "https://mietspiegel.berlin.de/wp-content/uploads/2026/01/mietspiegeltabelle2021.pdf",
    2023: "https://mietspiegel.berlin.de/wp-content/uploads/2026/01/mietspiegeltabelle2023.pdf",
    2024: "https://mietspiegel.berlin.de/wp-content/uploads/2024/11/mietspiegeltabelle2024.pdf",
    2026: "https://mietspiegel.berlin.de/wp-content/uploads/2026/05/mietspiegeltabelle2026.pdf",
}

# Source attribution per vintage (Stichtag = reference date of the survey).
_STICHTAG: dict[int, str] = {
    2017: "01.09.2016",
    2019: "01.09.2018",
    2021: "01.09.2020",
    2023: "01.09.2022",
    2024: "01.09.2023",
    2026: "01.09.2025",
}

_ATTRIBUTION_TEMPLATE = (
    "Berliner Mietspiegeltabelle {year}; "
    "Senatsverwaltung fuer Stadtentwicklung und Wohnen Berlin; "
    "Stichtag {stichtag}; mit SH/Bad/IWC"
)


def _attribution(year: int) -> str:
    stichtag = _STICHTAG.get(year, "unknown")
    return _ATTRIBUTION_TEMPLATE.format(year=year, stichtag=stichtag)


# ---------------------------------------------------------------------------
# Standard size buckets
# ---------------------------------------------------------------------------

# (bucket_name, lo_inclusive, hi_exclusive)
SIZE_BUCKETS: list[tuple[str, int, int]] = [
    ("under_40", 0, 40),
    ("40_to_60", 40, 60),
    ("60_to_90", 60, 90),
    ("90_plus", 90, 9999),
]

# ---------------------------------------------------------------------------
# Parquet schema
# ---------------------------------------------------------------------------

MIETSPIEGEL_SCHEMA = pa.schema(
    [
        pa.field("vintage", pa.int32()),
        pa.field("year_built_bucket", pa.string()),
        pa.field("size_bucket", pa.string()),
        pa.field("wohnlage", pa.string()),
        pa.field("rent_low", pa.float64()),
        pa.field("rent_mid", pa.float64()),
        pa.field("rent_high", pa.float64()),
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
log = logging.getLogger("mietspiegel_ingest")

# ---------------------------------------------------------------------------
# PDF download
# ---------------------------------------------------------------------------


def download_pdf(url: str, dest: Path, timeout: int = 60) -> None:
    """Download a PDF to dest (atomic write via temp file)."""
    tmp = dest.with_suffix(".tmp.pdf")
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "gentriduck-ingest/1.0"})
    log.info("Downloading %s -> %s", url, dest)
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=_SSL_CONTEXT) as resp:  # noqa: S310
            data = resp.read()
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Network error downloading {url}: {exc}") from exc
    tmp.write_bytes(data)
    tmp.rename(dest)
    log.info("Saved %d bytes -> %s", len(data), dest)


# ---------------------------------------------------------------------------
# Helpers: value parsing
# ---------------------------------------------------------------------------


def _parse_eur(s: Optional[str]) -> Optional[float]:
    """Parse a German-locale EUR string like '6,53 €' to float 6.53."""
    if not s:
        return None
    s = s.strip()
    if not s or s in ("-", "–", "*", "**"):
        return None
    # Strip marker suffixes (*/**) and EUR symbol
    s = re.sub(r"\*+$", "", s).strip()
    s = re.sub(r"[€\s]", "", s).replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return None


def _parse_m2(s: Optional[str]) -> Optional[int]:
    """Extract integer m² value from strings like '40 m²', '35 m²'."""
    if not s:
        return None
    m = re.search(r"(\d+)", s)
    return int(m.group(1)) if m else None


# ---------------------------------------------------------------------------
# PDF table parsing
# ---------------------------------------------------------------------------

# Row structure from pdfplumber extract_tables():
#   col0: Zeile (row number)
#   col1: Bezugsfertigkeit (year-built label; only on first row of each group)
#   col2: size_from (lower size bound m², or 'bis unter', or 'alle Wohnflächen')
#   col3: connector (None, 'bis unter', 'ab')
#   col4: size_to (upper size bound m², or threshold)
#   col5: untere Spanne (rent_low)
#   col6: Mittelwert (rent_mid)
#   col7: obere Spanne (rent_high)
#
# Edge case (seen in 2026 row 103): col2='bis unter', col3=None, col4='40 m²'
# means the connector landed in col2 (a one-column shift in pdfplumber's parse).


def _parse_granular_rows(table: list[list], wohnlage: str) -> list[dict]:
    """
    Parse one pdfplumber table (one per wohnlage in 2024/2026 layout,
    or the wohnlage sub-section in earlier layouts) into a flat list of
    granular size-range dicts:
      {year, size_lo, size_hi, low, mid, high, wohnlage}
    """
    rows: list[dict] = []
    current_year: Optional[str] = None

    for raw in table[1:]:  # skip header row
        if len(raw) < 8:
            continue
        bez: str = (raw[1] or "").strip()
        size_from: str = (raw[2] or "").strip()
        connector = raw[3]
        size_to: str = (raw[4] or "").strip()
        rent_low_s: str = (raw[5] or "").strip()
        rent_mid_s: str = (raw[6] or "").strip()
        rent_high_s: str = (raw[7] or "").strip()

        if bez:
            current_year = bez
        if not current_year:
            continue

        low_v = _parse_eur(rent_low_s)
        if low_v is None:
            continue
        mid_v = _parse_eur(rent_mid_s)
        high_v = _parse_eur(rent_high_s)

        # Case 1: 'alle Wohnflächen' — applies to all sizes
        if "alle" in size_from.lower():
            rows.append(
                {
                    "year": current_year,
                    "size_lo": 0,
                    "size_hi": 9999,
                    "low": low_v,
                    "mid": mid_v,
                    "high": high_v,
                    "wohnlage": wohnlage,
                }
            )
            continue

        # Case 2: connector shifted into col2 (pdfplumber merge artefact)
        # e.g. col2='bis unter', col3=None, col4='40 m²'
        connector_str = (connector or "").strip() if connector is not None else ""
        if size_from in ("bis unter", "ab") and not connector_str:
            if size_from == "bis unter":
                lo: int = 0
                hi_v = _parse_m2(size_to)
                hi: float = (hi_v - 0.001) if hi_v else 9999
            else:  # 'ab'
                lo = _parse_m2(size_to) or 0
                hi = 9999.0
            rows.append(
                {
                    "year": current_year,
                    "size_lo": lo,
                    "size_hi": hi,
                    "low": low_v,
                    "mid": mid_v,
                    "high": high_v,
                    "wohnlage": wohnlage,
                }
            )
            continue

        # Case 3: normal layout
        if connector_str == "bis unter":
            lo = _parse_m2(size_from) if size_from else 0
            hi_v = _parse_m2(size_to)
            hi = (hi_v - 0.001) if hi_v else 9999
        elif connector_str == "ab":
            lo = _parse_m2(size_to) if size_to else (_parse_m2(size_from) or 0)
            hi = 9999.0
        else:
            log.debug("Skipping row with unknown connector %r: %s", connector_str, raw)
            continue

        rows.append(
            {
                "year": current_year,
                "size_lo": lo,
                "size_hi": hi,
                "low": low_v,
                "mid": mid_v,
                "high": high_v,
                "wohnlage": wohnlage,
            }
        )

    return rows


# ---------------------------------------------------------------------------
# Bucket aggregation
# ---------------------------------------------------------------------------


def _overlap(lo1: float, hi1: float, lo2: float, hi2: float) -> float:
    """Length of overlap between two intervals [lo1, hi1) and [lo2, hi2)."""
    return max(0.0, min(hi1, hi2) - max(lo1, lo2))


def _aggregate_to_bucket(
    granular: list[dict], blo: int, bhi: int
) -> Optional[tuple[float, float, float]]:
    """
    Overlap-weighted average of granular rows falling within [blo, bhi).
    Open-ended ranges (size_hi=9999) are capped at bhi+20 for weighting.
    Returns None if no granular row overlaps this bucket (data not available).
    """
    total_w = 0.0
    w_low = 0.0
    w_mid = 0.0
    w_high = 0.0
    for r in granular:
        lo = r["size_lo"]
        hi = r["size_hi"]
        if hi >= 9999:
            hi = max(float(bhi) + 20.0, float(lo) + 20.0)
        ov = _overlap(lo, hi, blo, bhi)
        if ov > 0:
            total_w += ov
            w_low += ov * r["low"]
            w_mid += ov * r["mid"]
            w_high += ov * (
                r["high"] if r["high"] is not None else r["mid"]
            )  # fallback if high missing
    if total_w == 0:
        return None
    return (
        round(w_low / total_w, 2),
        round(w_mid / total_w, 2),
        round(w_high / total_w, 2),
    )


# ---------------------------------------------------------------------------
# Year-built label normalisation
# ---------------------------------------------------------------------------

# Maps German Bezugsfertigkeit labels (as extracted by pdfplumber) to the
# snake_case English keys used in the dbt seed and Parquet output.
# 2017–2023 used a different (merged west/ost) scheme; 2024+ splits them.
_YEAR_LABEL_MAP: dict[str, str] = {
    # pre-1918
    "bis 1918": "pre_1918",
    "Bis 1918": "pre_1918",
    "bis 1919": "pre_1918",  # variant seen in some vintages
    # 1919–1949
    "1919 bis 1949": "1919_1949",
    "1919 - 1949": "1919_1949",
    # 1950–1964
    "1950 bis 1964": "1950_1964",
    "1950 - 1964": "1950_1964",
    # 1965–1972
    "1965 bis 1972": "1965_1972",
    "1965 - 1972": "1965_1972",
    # 1973–1990 merged (2017–2023)
    "1973 bis 1990": "1973_1990",
    "1973 - 1990": "1973_1990",
    # 1973–1985 West (2024+)
    "1973 bis 1985 West": "1973_1985_west",
    "1973 - 1985 West": "1973_1985_west",
    # 1986–1990 West (2024+)
    "1986 bis 1990 West": "1986_1990_west",
    "1986 - 1990 West": "1986_1990_west",
    # 1973–1990 Ost (2024+, with footnote markers)
    "1973 bis 1990 Ost*": "1973_1990_ost",
    "1973 bis 1990 Ost": "1973_1990_ost",
    # 1991–2001 (with footnote markers)
    "1991 bis 2001**": "1991_2001",
    "1991 bis 2001*": "1991_2001",
    "1991 bis 2001": "1991_2001",
    "1991 - 2001": "1991_2001",
    # 2002–2009
    "2002 bis 2009": "2002_2009",
    "2002 - 2009": "2002_2009",
    # 2010–2015
    "2010 bis 2015": "2010_2015",
    "2010 - 2015": "2010_2015",
    # 2016–2022 (2024 edition used 2016–2022)
    "2016 bis 2022": "2016_2022",
    "2016 - 2022": "2016_2022",
    # 2016–2019 and 2020–2024 (2026 edition splits the newest bucket)
    "2016 bis 2019": "2016_2019",
    "2016 - 2019": "2016_2019",
    "2020 bis 2024": "2020_2024",
    "2020 - 2024": "2020_2024",
    # Older vintages (2017 uses 1991–2002 / 2003–2015)
    "1991 bis 2002": "1991_2002",
    "1991 - 2002": "1991_2002",
    "2003 bis 2015": "2003_2015",
    "2003 - 2015": "2003_2015",
    # ab 2003 variant
    "ab 2003": "ab_2003",
}


def _normalise_year_label(raw: str) -> Optional[str]:
    """Return the canonical year_built_bucket key for a German label."""
    # Exact match first
    if raw in _YEAR_LABEL_MAP:
        return _YEAR_LABEL_MAP[raw]
    # Strip trailing footnote markers and retry
    cleaned = re.sub(r"\*+$", "", raw).strip()
    return _YEAR_LABEL_MAP.get(cleaned)


# ---------------------------------------------------------------------------
# Per-vintage extraction dispatch
# ---------------------------------------------------------------------------


def _extract_2017_to_2023(pdf_path: Path, vintage: int) -> list[dict]:
    """
    Extract rows from 2017–2023 PDFs.
    Layout: typically one or more pages with the wohnlage sections stacked.
    pdfplumber usually returns one table per wohnlage section.
    Falls back to treating the first table as containing all three wohnlage blocks
    if only one table is detected.
    """
    import pdfplumber  # noqa: PLC0415

    wohnlage_order = ["einfach", "mittel", "gut"]
    granular: list[dict] = []

    with pdfplumber.open(str(pdf_path)) as pdf:
        all_tables: list[list] = []
        for page in pdf.pages:
            all_tables.extend(page.extract_tables())

    log.debug("vintage=%d: found %d raw tables in PDF", vintage, len(all_tables))

    if len(all_tables) >= 3:
        # One table per wohnlage (same as 2024/2026 layout)
        for i, wohnlage in enumerate(wohnlage_order):
            if i < len(all_tables):
                granular.extend(_parse_granular_rows(all_tables[i], wohnlage))
    elif len(all_tables) == 1:
        # Unified table — split by wohnlage based on row content
        # (fallback: treat all rows as unknown wohnlage and log a warning)
        log.warning(
            "vintage=%d: only 1 table detected; layout may differ from expected. "
            "Parsing as single wohnlage block 'unknown'. "
            "Manual review recommended.",
            vintage,
        )
        granular.extend(_parse_granular_rows(all_tables[0], "unknown"))
    else:
        # 2 tables or other counts — iterate and assign in order
        for i, table in enumerate(all_tables):
            w = wohnlage_order[i] if i < len(wohnlage_order) else "unknown"
            granular.extend(_parse_granular_rows(table, w))

    return granular


def _extract_2024_to_present(pdf_path: Path, vintage: int) -> list[dict]:
    """
    Extract rows from 2024 and later PDFs.
    Layout: exactly 3 tables per page (einfache / mittlere / gute Wohnlage).
    """
    import pdfplumber  # noqa: PLC0415

    wohnlage_order = ["einfach", "mittel", "gut"]
    granular: list[dict] = []

    with pdfplumber.open(str(pdf_path)) as pdf:
        for page in pdf.pages:
            tables = page.extract_tables()
            log.debug("vintage=%d: page has %d tables", vintage, len(tables))
            for i, wohnlage in enumerate(wohnlage_order):
                if i < len(tables):
                    granular.extend(_parse_granular_rows(tables[i], wohnlage))

    return granular


def _extract_granular(pdf_path: Path, vintage: int) -> list[dict]:
    """Dispatch to the correct layout extractor for the given vintage."""
    if vintage <= 2023:
        return _extract_2017_to_2023(pdf_path, vintage)
    return _extract_2024_to_present(pdf_path, vintage)


# ---------------------------------------------------------------------------
# Aggregation: granular -> standard buckets
# ---------------------------------------------------------------------------


def _aggregate_rows(granular: list[dict], vintage: int) -> list[dict]:
    """
    Aggregate granular size-range rows into the 4 standard size buckets.
    Returns a flat list of row dicts matching the Parquet schema (minus vintage
    and source_attribution, which are added by the caller).
    """
    rows: list[dict] = []
    combos = sorted({(r["year"], r["wohnlage"]) for r in granular})

    for year_raw, wohnlage in combos:
        year_bucket = _normalise_year_label(year_raw)
        if year_bucket is None:
            log.warning("vintage=%d: unmapped year label %r — skipping.", vintage, year_raw)
            continue

        sub = [r for r in granular if r["year"] == year_raw and r["wohnlage"] == wohnlage]

        for bucket_name, blo, bhi in SIZE_BUCKETS:
            result = _aggregate_to_bucket(sub, blo, bhi)
            if result is None:
                log.debug(
                    "vintage=%d: no data for %s/%s/%s — omitted.",
                    vintage,
                    year_bucket,
                    bucket_name,
                    wohnlage,
                )
                continue
            low_v, mid_v, high_v = result
            rows.append(
                {
                    "year_built_bucket": year_bucket,
                    "size_bucket": bucket_name,
                    "wohnlage": wohnlage,
                    "rent_low": low_v,
                    "rent_mid": mid_v,
                    "rent_high": high_v,
                }
            )

    return rows


# ---------------------------------------------------------------------------
# Write Parquet
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path, vintage: int, attribution: str) -> None:
    """Write extracted rows to Parquet using the Mietspiegel schema."""
    n = len(rows)
    tmp_path = out_path.with_suffix(".tmp.parquet")
    table = pa.table(
        {
            "vintage": pa.array([vintage] * n, type=pa.int32()),
            "year_built_bucket": pa.array([r["year_built_bucket"] for r in rows], type=pa.string()),
            "size_bucket": pa.array([r["size_bucket"] for r in rows], type=pa.string()),
            "wohnlage": pa.array([r["wohnlage"] for r in rows], type=pa.string()),
            "rent_low": pa.array([r["rent_low"] for r in rows], type=pa.float64()),
            "rent_mid": pa.array([r["rent_mid"] for r in rows], type=pa.float64()),
            "rent_high": pa.array([r["rent_high"] for r in rows], type=pa.float64()),
            "source_attribution": pa.array([attribution] * n, type=pa.string()),
        },
        schema=MIETSPIEGEL_SCHEMA,
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    pq.write_table(table, tmp_path, compression="snappy")
    tmp_path.rename(out_path)
    log.info("Wrote %d rows -> %s", n, out_path)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Berliner Mietspiegeltabelle PDFs and extract rent tables "
            "to Parquet (data/raw/berlin/mietspiegel/mietspiegel_{year}.parquet). "
            "Requires pdfplumber: run with 'uv run --with pdfplumber python ...'."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/berlin/mietspiegel",
        type=Path,
        help="Output directory for PDFs and Parquet files (default: data/raw/berlin/mietspiegel).",
    )
    p.add_argument(
        "--years",
        default=None,
        type=str,
        help=(
            "Comma-separated list of vintage years to process "
            f"(default: all known = {sorted(VINTAGE_URLS.keys())}). "
            "Example: --years 2024,2026"
        ),
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be done without making HTTP calls or writing files.",
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

    # Resolve years
    if args.years:
        try:
            years = [int(y.strip()) for y in args.years.split(",")]
        except ValueError as exc:
            log.error("Invalid --years value: %s", exc)
            return 1
        unknown = [y for y in years if y not in VINTAGE_URLS]
        if unknown:
            log.error("Unknown vintage years: %s. Known: %s", unknown, sorted(VINTAGE_URLS.keys()))
            return 1
    else:
        years = sorted(VINTAGE_URLS.keys())

    out_dir = args.out_dir.resolve()
    log.info("Mietspiegel ingestion: vintages=%s, out_dir=%s", years, out_dir)

    if args.dry_run:
        for year in years:
            url = VINTAGE_URLS[year]
            pdf_path = out_dir / f"mietspiegeltabelle{year}.pdf"
            pq_path = out_dir / f"mietspiegel_{year}.parquet"
            log.info("[dry-run] Would download %s -> %s", url, pdf_path)
            log.info("[dry-run] Would extract -> %s", pq_path)
        return 0

    errors = 0
    for year in years:
        url = VINTAGE_URLS[year]
        pdf_path = out_dir / f"mietspiegeltabelle{year}.pdf"
        pq_path = out_dir / f"mietspiegel_{year}.parquet"
        attribution = _attribution(year)

        # Download if not already present
        if pdf_path.exists():
            log.info("PDF already present: %s (skipping download)", pdf_path)
        else:
            try:
                download_pdf(url, pdf_path)
            except RuntimeError as exc:
                log.error("Failed to download vintage %d: %s", year, exc)
                errors += 1
                continue

        # Extract
        log.info("Extracting vintage %d from %s", year, pdf_path)
        try:
            granular = _extract_granular(pdf_path, year)
        except Exception as exc:
            log.error("Extraction failed for vintage %d: %s", year, exc)
            errors += 1
            continue

        if not granular:
            log.error("No rows extracted from vintage %d PDF; skipping.", year)
            errors += 1
            continue

        log.info("vintage=%d: extracted %d granular rows", year, len(granular))

        # Aggregate to standard buckets
        rows = _aggregate_rows(granular, year)
        if not rows:
            log.error("No rows after aggregation for vintage %d; skipping.", year)
            errors += 1
            continue

        log.info("vintage=%d: aggregated to %d bucket rows", year, len(rows))

        # Write Parquet
        try:
            write_parquet(rows, pq_path, year, attribution)
        except Exception as exc:
            log.error("Failed to write Parquet for vintage %d: %s", year, exc)
            errors += 1
            continue

    if errors:
        log.warning("Ingestion completed with %d error(s).", errors)
        return 1

    log.info("Mietspiegel ingestion complete: %d vintage(s) processed.", len(years))
    return 0


if __name__ == "__main__":
    sys.exit(main())
