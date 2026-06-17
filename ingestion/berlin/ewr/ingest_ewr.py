"""
ingestion/berlin/ewr/ingest_ewr.py
===================================
C3b — EWR (Einwohnerregister) multi-year socio-economic time series for Berlin.

Source (ADR-0003, section "Socio-economic (EWR)"):
  Amt fuer Statistik Berlin-Brandenburg — "Einwohnerinnen und Einwohner in Berlin
  in LOR-Planungsraeumen am 31.12.YYYY" (per-PLR CSVs on daten.berlin.de).
  Licence: CC BY 3.0 DE
  Attribution: "Amt fuer Statistik Berlin-Brandenburg / Einwohnerregister
  Berlin-Brandenburg (EWR), CC BY 3.0 DE —
  https://www.statistik-berlin-brandenburg.de/"

Processing:
  For each target year a CSV is downloaded from the known URL (VINTAGE_URLS dict).
  The script computes 13 socio-economic indicators at PLR grain and outputs one
  Parquet file per year to data/raw/berlin/ewr/<year>.parquet (gitignored).

Indicator set (geo-data-scientist approved):
  1  residents_total              — E_E                          (count)
  2  residents_male_share         — E_EM / E_E                   (share)
  3  residents_female_share       — E_EW / E_E                   (share)
  4  age_under18_share            — (E_U1+E_1U6+E_6U15+E_15U18)/E_E
  5  age_18_27_share              — (E_E18_21+E_E21_25+E_E25_27)/E_E
  6  age_27_45_share              — (E_E27_30+E_E30_35+E_E35_40+E_E40_45)/E_E
  7  age_45_65_share              — (E_E45_50+E_E50_55+E_E55U65)/E_E
  8  age_65plus_share             — (E_65U80+E_80U110)/E_E
  9  mean_age_years               — midpoint-weighted over age cohorts (years)
  10 foreigners_share             — E_A / E_E                    (share)
  11 migration_background_share   — MH_E / E_E (dropped if column absent)
  12 residence_duration_5y_share  — DAU5                         (share)
  13 residence_duration_10y_share — DAU10                        (share)

Schema (long format, one row per PLR x year x indicator):
  city_code, area_code, area_vintage, reference_year, reference_date,
  indicator, indicator_value, source_attribution

LOR vintage assignment:
  reference_year <= 2020 -> area_vintage = 'lor_pre2021'
  reference_year >= 2021 -> area_vintage = 'lor_2021'

Usage:
  uv run python ingestion/berlin/ewr/ingest_ewr.py \\
      --out-dir data/raw/berlin/ewr \\
      --years 2008-2024

  # Dry run (print what would be downloaded, no HTTP calls):
  uv run python ingestion/berlin/ewr/ingest_ewr.py \\
      --out-dir data/raw/berlin/ewr --years 2020-2024 --dry-run

  # Override a URL for a specific year:
  uv run python ingestion/berlin/ewr/ingest_ewr.py \\
      --out-dir data/raw/berlin/ewr --years 2024 \\
      --url-override 2024=https://example.com/ewr2024.csv

Attribution (mandatory — CC BY 3.0 DE):
  Each output parquet row carries source_attribution. The dbt staging model
  (stg_berlin_ewr) and the website attribution page (Epic G3) must surface this.
"""

from __future__ import annotations

import argparse
import datetime
import io
import logging
import sys
import urllib.request
from pathlib import Path
from typing import Optional

import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

CITY_CODE = "berlin"

SOURCE_ATTRIBUTION = (
    "Amt fuer Statistik Berlin-Brandenburg / Einwohnerregister Berlin-Brandenburg (EWR),"
    " CC BY 3.0 DE — https://www.statistik-berlin-brandenburg.de/"
)

# Known download URLs for the 31-Dec snapshot per year.
# Source: daten.berlin.de dataset pages (ADR-0003).
# URL pattern: direct CSV download from statistik-berlin-brandenburg.de or
# daten.berlin.de (the portal page for each year links to the CSV).
# Maintainer: when a new year is published, add the direct CSV download URL here.
# Years without a known URL are skipped with a warning.
VINTAGE_URLS: dict[int, str] = {
    # 2008-2014: older series — URLs to be confirmed by maintainer.
    # 2015-2019: URLs to be confirmed by maintainer.
    # 2020: last year on pre-2021 LOR scheme.
    # 2021-2024: LOR 2021 scheme.
    # Example entry (replace with real URLs when available):
    # 2024: (
    #     "https://www.statistik-berlin-brandenburg.de/opendata/"
    #     "EWR_Dez2024_PLR_Matrix.csv"
    # ),
}

# Age cohort midpoints (years) for mean_age computation.
# Bins: [lower, upper) with midpoint = (lower + upper) / 2.
# Source columns -> (midpoint, source_column_name).
AGE_COHORTS: list[tuple[float, str]] = [
    (0.5, "E_U1"),  # under 1
    (3.5, "E_1U6"),  # 1-5
    (10.5, "E_6U15"),  # 6-14
    (16.5, "E_15U18"),  # 15-17
    (19.5, "E_E18_21"),  # 18-20
    (23.0, "E_E21_25"),  # 21-24
    (26.0, "E_E25_27"),  # 25-26
    (28.5, "E_E27_30"),  # 27-29
    (32.5, "E_E30_35"),  # 30-34
    (37.5, "E_E35_40"),  # 35-39
    (42.5, "E_E40_45"),  # 40-44
    (47.5, "E_E45_50"),  # 45-49
    (52.5, "E_E50_55"),  # 50-54
    (60.0, "E_E55U65"),  # 55-64
    (72.5, "E_65U80"),  # 65-79
    (90.0, "E_80U110"),  # 80-109
]

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)
log = logging.getLogger("ewr_ingest")


# ---------------------------------------------------------------------------
# Year parsing
# ---------------------------------------------------------------------------


def parse_years(spec: str) -> list[int]:
    """Parse a year specification like '2008-2024' or '2020,2021,2024'."""
    years: list[int] = []
    for part in spec.split(","):
        part = part.strip()
        range_parts = part.split("-")
        if len(range_parts) == 2 and all(p.isdigit() and len(p) == 4 for p in range_parts):
            start, end = int(range_parts[0]), int(range_parts[1])
            years.extend(range(start, end + 1))
        else:
            years.append(int(part))
    return sorted(set(years))


# ---------------------------------------------------------------------------
# Indicator computation
# ---------------------------------------------------------------------------


def _safe_div(numerator: pd.Series, denominator: pd.Series) -> pd.Series:
    """Element-wise division; returns NaN where denominator is 0 or NaN."""
    return numerator / denominator.replace(0, float("nan"))


def _col_sum(df: pd.DataFrame, cols: list[str]) -> pd.Series:
    """Sum columns that exist in the dataframe; missing columns contribute 0."""
    present = [c for c in cols if c in df.columns]
    if not present:
        return pd.Series(0.0, index=df.index)
    return df[present].fillna(0).sum(axis=1)


def compute_indicators(df: pd.DataFrame, year: int) -> pd.DataFrame:
    """
    Compute the 13 approved indicators from a raw EWR CSV dataframe.

    Returns a long-format dataframe with columns:
      city_code, area_code, area_vintage, reference_year, reference_date,
      indicator, indicator_value, source_attribution
    """
    # Normalise column names (strip whitespace, uppercase).
    df.columns = df.columns.str.strip().str.upper()

    # PLR identifier column — EWR CSVs use 'PLR' or 'RAUMID' depending on vintage.
    plr_col = next((c for c in ("PLR", "RAUMID", "RAUMID_PLR") if c in df.columns), None)
    if plr_col is None:
        raise ValueError(
            f"Cannot find PLR identifier column in CSV for {year}. "
            f"Available columns: {list(df.columns[:20])}"
        )
    df = df.rename(columns={plr_col: "area_code"})
    df["area_code"] = df["area_code"].astype(str).str.zfill(8)

    total = df["E_E"].fillna(0)

    indicators: dict[str, pd.Series] = {
        "residents_total": total,
        "residents_male_share": _safe_div(_col_sum(df, ["E_EM"]), total),
        "residents_female_share": _safe_div(_col_sum(df, ["E_EW"]), total),
        "age_under18_share": _safe_div(_col_sum(df, ["E_U1", "E_1U6", "E_6U15", "E_15U18"]), total),
        "age_18_27_share": _safe_div(_col_sum(df, ["E_E18_21", "E_E21_25", "E_E25_27"]), total),
        "age_27_45_share": _safe_div(
            _col_sum(df, ["E_E27_30", "E_E30_35", "E_E35_40", "E_E40_45"]), total
        ),
        "age_45_65_share": _safe_div(_col_sum(df, ["E_E45_50", "E_E50_55", "E_E55U65"]), total),
        "age_65plus_share": _safe_div(_col_sum(df, ["E_65U80", "E_80U110"]), total),
        "foreigners_share": _safe_div(_col_sum(df, ["E_A"]), total),
        "residence_duration_5y_share": df["DAU5"].fillna(float("nan"))
        if "DAU5" in df.columns
        else pd.Series(float("nan"), index=df.index),
        "residence_duration_10y_share": df["DAU10"].fillna(float("nan"))
        if "DAU10" in df.columns
        else pd.Series(float("nan"), index=df.index),
    }

    # mean_age: midpoint-weighted sum over cohorts / total residents.
    weighted_age = pd.Series(0.0, index=df.index)
    for midpoint, col in AGE_COHORTS:
        if col in df.columns:
            weighted_age += midpoint * df[col].fillna(0)
    indicators["mean_age_years"] = _safe_div(weighted_age, total)

    # migration_background_share — drop silently if column absent.
    if "MH_E" in df.columns:
        indicators["migration_background_share"] = _safe_div(df["MH_E"].fillna(0), total)

    # LOR vintage assignment.
    area_vintage = "lor_pre2021" if year <= 2020 else "lor_2021"
    reference_date = datetime.date(year, 12, 31)

    rows = []
    for indicator_key, values in indicators.items():
        tmp = pd.DataFrame(
            {
                "city_code": CITY_CODE,
                "area_code": df["area_code"],
                "area_vintage": area_vintage,
                "reference_year": year,
                "reference_date": reference_date,
                "indicator": indicator_key,
                "indicator_value": values.values,
                "source_attribution": SOURCE_ATTRIBUTION,
            }
        )
        rows.append(tmp)

    return pd.concat(rows, ignore_index=True)


# ---------------------------------------------------------------------------
# Download helpers
# ---------------------------------------------------------------------------


def download_csv(url: str, year: int) -> pd.DataFrame:
    """Download a CSV from url and parse it; tries both ';' and ',' separators."""
    log.info("Downloading EWR %d from %s", year, url)
    with urllib.request.urlopen(url, timeout=120) as resp:  # noqa: S310
        raw_bytes = resp.read()

    # Try latin-1 first (older StatBB files), fall back to utf-8.
    for encoding in ("latin-1", "utf-8", "utf-8-sig"):
        try:
            text = raw_bytes.decode(encoding)
            break
        except UnicodeDecodeError:
            continue
    else:
        raise ValueError(f"Cannot decode EWR CSV for {year}")

    # Try semicolon separator (common for German government CSVs) then comma.
    for sep in (";", ","):
        try:
            df = pd.read_csv(io.StringIO(text), sep=sep, dtype=str, low_memory=False)
            if df.shape[1] > 5:  # sanity check: at least 5 columns
                return df
        except Exception:  # noqa: BLE001
            continue

    raise ValueError(f"Cannot parse EWR CSV for {year} — check separator/encoding")


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------


def process_year(
    year: int,
    url: str,
    out_dir: Path,
    dry_run: bool = False,
) -> bool:
    """Download, compute indicators, write parquet. Returns True on success."""
    out_path = out_dir / f"{year}.parquet"

    if dry_run:
        log.info("[dry-run] Would download %d from %s -> %s", year, url, out_path)
        return True

    try:
        raw_df = download_csv(url, year)
    except Exception as exc:
        log.error("Failed to download EWR %d: %s", year, exc)
        return False

    try:
        long_df = compute_indicators(raw_df, year)
    except Exception as exc:
        log.error("Failed to compute indicators for EWR %d: %s", year, exc)
        return False

    out_dir.mkdir(parents=True, exist_ok=True)

    schema = pa.schema(
        [
            pa.field("city_code", pa.string()),
            pa.field("area_code", pa.string()),
            pa.field("area_vintage", pa.string()),
            pa.field("reference_year", pa.int32()),
            pa.field("reference_date", pa.date32()),
            pa.field("indicator", pa.string()),
            pa.field("indicator_value", pa.float64()),
            pa.field("source_attribution", pa.string()),
        ]
    )

    table = pa.Table.from_pandas(long_df, schema=schema, preserve_index=False)
    pq.write_table(table, out_path, compression="snappy")
    log.info("Wrote %d rows to %s", len(long_df), out_path)
    return True


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Download and process Berlin EWR per-PLR CSVs into Parquet."
    )
    p.add_argument(
        "--out-dir",
        required=True,
        type=Path,
        help="Output directory for parquet files (e.g. data/raw/berlin/ewr).",
    )
    p.add_argument(
        "--years",
        default="2008-2024",
        help="Year range or comma-separated list (e.g. '2008-2024' or '2020,2021').",
    )
    p.add_argument(
        "--url-override",
        action="append",
        metavar="YEAR=URL",
        default=[],
        help=(
            "Override download URL for a specific year. "
            "Repeat for multiple years: --url-override 2023=... --url-override 2024=..."
        ),
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be downloaded without making HTTP calls.",
    )
    return p


def main(argv: Optional[list[str]] = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    years = parse_years(args.years)

    # Build URL map: start from VINTAGE_URLS, then apply overrides.
    url_map: dict[int, str] = dict(VINTAGE_URLS)
    for override in args.url_override:
        if "=" not in override:
            log.error("Invalid --url-override format (expected YEAR=URL): %s", override)
            return 1
        yr_str, url = override.split("=", 1)
        url_map[int(yr_str)] = url.strip()

    out_dir = args.out_dir.resolve()
    dry_run = args.dry_run

    if dry_run:
        log.info("[dry-run] mode — no HTTP calls will be made.")

    success_count = 0
    skip_count = 0
    error_count = 0

    for year in years:
        url = url_map.get(year)
        if url is None:
            log.warning(
                "No URL known for EWR %d — skipping. "
                "Add an entry to VINTAGE_URLS or use --url-override %d=<url>.",
                year,
                year,
            )
            skip_count += 1
            continue

        ok = process_year(year, url, out_dir, dry_run=dry_run)
        if ok:
            success_count += 1
        else:
            error_count += 1

    log.info(
        "Summary: %d processed, %d skipped (no URL), %d errors. Requested years: %s.",
        success_count,
        skip_count,
        error_count,
        years,
    )

    if error_count > 0:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
