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
  For each target year a CSV URL is discovered via the daten.berlin.de CKAN API
  (fallback: VINTAGE_URLS dict). The script computes 13 socio-economic indicators
  at PLR grain and outputs one Parquet file per year in WIDE format (one row per
  PLR) to data/raw/berlin/ewr/<year>.parquet (gitignored).

Output schema (wide format, one row per PLR):
  city_code, reference_year, reference_date, area_code, area_vintage,
  residents_total, residents_male_share, residents_female_share,
  age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share,
  age_65plus_share, mean_age_years, foreigners_share,
  migration_background_share, residence_duration_5y_share,
  residence_duration_10y_share, is_suppressed_any, source_attribution

Indicator set (geo-data-scientist approved):
  1  residents_total              — E_E                          (count)
  2  residents_male_share         — E_EM / E_E                   (share)
  3  residents_female_share       — E_EW / E_E                   (share)
  4  age_under18_share            — (E_U1+E_1U6+E_6U15+E_15U18)/E_E
  5  age_18_27_share              — (E_E18_21+E_E21_25+E_E25_27)/E_E
  6  age_27_45_share              — (E_E27_30+E_E30_35+E_E35_40+E_E40_45)/E_E
  7  age_45_65_share              — (E_E45_50+E_E50_55+E_55U65)/E_E  (canonical; 2014+ E_E55U65 aliased)
  8  age_65plus_share             — (E_65U80+E_80U110)/E_E  (canonical; 2014+ E_E65U80/E_E80U110 aliased)
  9  mean_age_years               — midpoint-weighted over age cohorts (years)
  10 foreigners_share             — E_A / E_E                    (share)
  11 migration_background_share   — MH_E / E_E (NULL when column absent)
  12 residence_duration_5y_share  — DAU5                         (share)
  13 residence_duration_10y_share — DAU10                        (share)

LOR vintage assignment:
  reference_year <= 2020 -> area_vintage = 'lor_pre2021'
  reference_year >= 2021 -> area_vintage = 'lor_2021'

Known breaks (documented per geo-data-scientist requirements):
  - LOR 2021 reform: pre-2021 data uses the old 447-PLR scheme; 2021+ uses the
    new 542-PLR scheme. The crosswalk seed (seed_lor_crosswalk_2006_to_2021)
    in the dbt layer handles alignment (int_berlin_ewr_plr2021).
  - Migrationshintergrund ~2017: MH_E definition changed around 2017. Use
    definition_vintage_from=2017 in seed_ewr_indicator_meta. Values pre-2017 are
    NOT silently concatenated; the break is explicitly documented.

Start-year decision (2015):
  2015 is the default start year because MH_E is consistently present from 2015
  and the schema is stable from 2015. Earlier years have increased schema variation.

Suppressed cells:
  is_suppressed_any=True when any indicator cell for a PLR is privacy-suppressed
  (value '-', '.', blank). Suppressed cells are NaN, never coerced to 0.

Usage:
  uv run python ingestion/berlin/ewr/ingest_ewr.py \\
      --out-dir data/raw/berlin/ewr \\
      --years 2015-2024

  # Dry run (no HTTP calls):
  uv run python ingestion/berlin/ewr/ingest_ewr.py \\
      --out-dir data/raw/berlin/ewr --years 2015-2024 --dry-run

  # Override a URL for a specific year:
  uv run python ingestion/berlin/ewr/ingest_ewr.py \\
      --out-dir data/raw/berlin/ewr --years 2024 \\
      --url-override 2024=https://example.com/ewr2024.csv

  # Verbose mode (DEBUG logging):
  uv run python ingestion/berlin/ewr/ingest_ewr.py \\
      --out-dir data/raw/berlin/ewr --years 2015-2024 --verbose

Attribution (mandatory — CC BY 3.0 DE):
  Each output parquet row carries source_attribution. The dbt staging model
  (stg_berlin_ewr) and the website attribution page (Epic G3) must surface this.

Runtime expectations:
  One year: ~2-5 s. Full 2015-2024 run: <60 s on normal broadband.
  CKAN API discovery adds ~0.5 s/year; VINTAGE_URLS dict fast-path skips the call.
"""

from __future__ import annotations

import argparse
import datetime
import io
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

CKAN_API_BASE = "https://daten.berlin.de/api/3/action/package_search"

# Companion CSV URLs (12A suffix = Ausländische Einwohner) — contain E_A (foreigners
# total) which is absent from the main 12E Matrix CSV.
# Published as a separate dataset series on daten.berlin.de:
#   "Ausländische Einwohnerinnen und Einwohner in Berlin in LOR-Planungsräumen"
# Available: 2014–2020, 2025 (not 2008–2013 or 2024 — those years have no 12A publication).
# NOTE: statistik-berlin-brandenburg.de blocks programmatic HTTP access (returns
# text/html for CSV requests). Download manually and place as EWR{YYYY}12A_Matrix.csv
# (or {year}A.csv) in the --local-csv-dir directory.
VINTAGE_A_URLS: dict[int, str] = {
    2014: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201412A_Matrix.csv",
    2015: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201512A_Matrix.csv",
    2016: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201612A_Matrix.csv",
    2017: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201712A_Matrix.csv",
    2018: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201812A_Matrix.csv",
    2019: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201912A_Matrix.csv",
    2020: "https://www.statistik-berlin-brandenburg.de/opendata/EWR202012A_Matrix.csv",
    2025: "https://www.statistik-berlin-brandenburg.de/opendata/EWR_L21_202512A_Matrix.csv",
}

# Columns to pull from the 12A companion CSV (Ausländische Einwohner series).
# MH_E is handled separately via load_migra_local_csv() (EWRMIGRA series).
# DAU5/DAU10 (residence duration) are not published in any known open CSV series.
COMPANION_COLS = ["E_A"]

# Known direct download URLs for the 31-Dec snapshot per year (fast path).
# Source: daten.berlin.de dataset pages (ADR-0003).
# When a URL is present here, the CKAN API discovery call is skipped for that year.
# Maintainer: when a new year is published, add the direct CSV download URL here,
# or rely on the CKAN API fallback.
VINTAGE_URLS: dict[int, str] = {
    # Direct CSV download URLs from statistik-berlin-brandenburg.de (CC BY 3.0 DE).
    # Source: daten.berlin.de CKAN API + manual verification.
    2008: "https://www.statistik-berlin-brandenburg.de/opendata/EWR200812E_Matrix.csv",
    2009: "https://www.statistik-berlin-brandenburg.de/opendata/EWR200912E_Matrix.csv",
    2010: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201012E_Matrix.csv",
    2011: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201112E_Matrix.csv",
    2012: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201212E_Matrix.csv",
    2013: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201312E_Matrix.csv",
    # 2014: not published on the open-data portal.
    2015: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201512E_Matrix.csv",
    2016: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201612E_Matrix.csv",
    2017: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201712E_Matrix.csv",
    2018: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201812E_Matrix.csv",
    2019: "https://www.statistik-berlin-brandenburg.de/opendata/EWR201912E_Matrix.csv",
    2020: "https://www.statistik-berlin-brandenburg.de/opendata/EWR202012E_Matrix.csv",
    # 2021-2023: not yet published on the open-data portal (CKAN API miss confirmed).
    2024: "https://www.statistik-berlin-brandenburg.de/opendata/EWR_L21_202412E_Matrix.csv",
    2025: "https://www.statistik-berlin-brandenburg.de/opendata/EWR_L21_202512E_Matrix.csv",
}

# Values that represent privacy suppression in the EWR CSV cells.
SUPPRESSION_SENTINELS = frozenset({"-", ".", "", "X", "x"})

# 2014+ EWR CSVs renamed the grouped age-bin columns (added "E_" prefix).
# Map new names -> canonical old names so compute_indicators always sees one name set.
# Note: E_E18U25/E_E25U55 aliases omitted — compute_indicators uses fine-grained sub-bins
# (E_E18_21, E_E21_25, etc.) which are present in all vintages, not the grouped mid-range bins.
_GROUPED_BIN_ALIASES: dict[str, str] = {
    "E_EU1": "E_U1",
    "E_E1U6": "E_1U6",
    "E_E6U15": "E_6U15",
    "E_E15U18": "E_15U18",
    "E_E55U65": "E_55U65",
    "E_E65U80": "E_65U80",
    "E_E80U110": "E_80U110",
}

# Age cohort midpoints (years) for mean_age computation.
# Bins: [lower, upper) with midpoint = (lower + upper) / 2.
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
    (60.0, "E_55U65"),  # 55-64
    (72.5, "E_65U80"),  # 65-79
    (90.0, "E_80U110"),  # 80-109
]

# All indicator columns in the output parquet schema (wide format).
INDICATOR_COLUMNS = [
    "residents_total",
    "residents_male_share",
    "residents_female_share",
    "age_under18_share",
    "age_18_27_share",
    "age_27_45_share",
    "age_45_65_share",
    "age_65plus_share",
    "mean_age_years",
    "foreigners_share",
    "migration_background_share",
    "residence_duration_5y_share",
    "residence_duration_10y_share",
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
    """Parse a year specification like '2015-2024' or '2020,2021,2024'."""
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
# CKAN API URL discovery
# ---------------------------------------------------------------------------


def discover_url_via_ckan(year: int, timeout: int = 30) -> Optional[str]:
    """
    Search daten.berlin.de CKAN API for the EWR CSV download URL for a given year.

    Queries the package_search endpoint with the year-specific title fragment.
    Returns the first CSV resource URL found, or None if no match.

    On any network / parse error, logs a warning and returns None so the caller
    can fall back gracefully (log warning + skip year).
    """
    query = f"einwohner planungsraum 31-12-{year}"
    params = urllib.parse.urlencode({"q": query, "rows": 10})
    api_url = f"{CKAN_API_BASE}?{params}"

    log.debug("CKAN API discovery for year %d: %s", year, api_url)

    try:
        with urllib.request.urlopen(api_url, timeout=timeout, context=_SSL_CONTEXT) as resp:  # noqa: S310
            payload = json.loads(resp.read())
    except Exception as exc:
        log.warning("CKAN API request failed for year %d: %s", year, exc)
        return None

    results = payload.get("result", {}).get("results", [])
    if not results:
        log.warning("CKAN API returned no datasets for year %d (query: %r)", year, query)
        return None

    # Search all datasets for a CSV resource whose URL or title contains the target year.
    for dataset in results:
        title = dataset.get("title", "")
        log.debug("  Checking dataset: %s", title)
        for resource in dataset.get("resources", []):
            resource_url = resource.get("url", "")
            fmt = resource.get("format", "").upper()
            if fmt == "CSV" or resource_url.lower().endswith(".csv"):
                if str(year) in resource_url or str(year) in title:
                    log.debug("  Found CSV resource: %s", resource_url)
                    return resource_url

    # Fallback: return first CSV resource in first dataset.
    for dataset in results:
        for resource in dataset.get("resources", []):
            resource_url = resource.get("url", "")
            fmt = resource.get("format", "").upper()
            if fmt == "CSV" or resource_url.lower().endswith(".csv"):
                log.debug("  Fallback CSV resource (year match not found): %s", resource_url)
                return resource_url

    log.warning("CKAN API: no CSV resource found for year %d", year)
    return None


# ---------------------------------------------------------------------------
# Suppression detection helpers
# ---------------------------------------------------------------------------


def _to_numeric_with_suppression(series: pd.Series) -> tuple[pd.Series, pd.Series]:
    """
    Convert a string series to numeric, tracking suppression.

    Returns (numeric_series, suppression_mask).
    Suppressed sentinels ('-', '.', etc.) become NaN in numeric_series and
    True in suppression_mask.

    German decimal separator: some vintage CSVs (e.g. 2012, 2013, 2015) quote
    all values and use ',' as the decimal separator ("2930,00"). We normalise
    by replacing ',' with '.' in the stripped string before parsing. This is
    safe because EWR PLR-level counts never use German thousands separators.
    """
    stripped = series.astype(str).str.strip()
    suppression_mask = stripped.isin(SUPPRESSION_SENTINELS)
    # Normalise German decimal separator before numeric conversion.
    normalised = stripped.str.replace(",", ".", regex=False)
    numeric = pd.to_numeric(normalised, errors="coerce")
    return numeric, suppression_mask


# ---------------------------------------------------------------------------
# Indicator computation
# ---------------------------------------------------------------------------


def _safe_div(numerator: pd.Series, denominator: pd.Series) -> pd.Series:
    """Element-wise division; returns NaN where denominator is 0 or NaN."""
    return numerator / denominator.replace(0, float("nan"))


def _col_sum_numeric(df: pd.DataFrame, cols: list[str]) -> tuple[pd.Series, pd.Series]:
    """
    Sum numeric versions of columns that exist in the dataframe.

    Returns (sum_series, suppression_mask) where suppression_mask is True
    if ANY of the constituent columns had a suppressed value.
    """
    present = [c for c in cols if c in df.columns]
    if not present:
        zero = pd.Series(0.0, index=df.index)
        false_mask = pd.Series(False, index=df.index)
        return zero, false_mask

    numerics = []
    masks = []
    for col in present:
        num, mask = _to_numeric_with_suppression(df[col])
        # Bug #57: do not fillna(0) here -- let NaN propagate so suppressed
        # cells are not silently zeroed before the share numerator is computed.
        numerics.append(num)
        masks.append(mask)

    combined_num = sum(numerics)  # type: ignore[arg-type]
    combined_mask = masks[0]
    for m in masks[1:]:
        combined_mask = combined_mask | m

    return combined_num, combined_mask


def compute_indicators(df: pd.DataFrame, year: int) -> pd.DataFrame:
    """
    Compute the 13 approved indicators from a raw EWR CSV dataframe.

    Returns a wide-format dataframe with one row per PLR:
      city_code, reference_year, reference_date, area_code, area_vintage,
      <13 indicator columns>, is_suppressed_any, source_attribution

    Suppression handling:
      - Cells with '-', '.', 'X', or blank are treated as suppressed.
      - Suppressed numeric values become NaN (not 0).
      - is_suppressed_any = True if ANY numeric column for that PLR is suppressed.

    Migration background break:
      - migration_background_share is computed from MH_E / E_E when MH_E is present.
      - When MH_E is absent (typically pre-2015), the column is set to NaN for all rows.
      - The methodological break around 2017 (Mikrozensus reform) means the pre-2017
        series is not directly comparable to post-2017, though the column may be present.
        This is documented in seed_ewr_indicator_meta (stable_from_year=2017).
    """
    # Normalise column names (strip whitespace, uppercase).
    df.columns = df.columns.str.strip().str.upper()

    # Normalise 2014+ grouped age-bin column names to the canonical pre-2014 names
    # so the rest of compute_indicators can use a single name set.
    df = df.rename(
        columns={
            k: v for k, v in _GROUPED_BIN_ALIASES.items() if k in df.columns and v not in df.columns
        }
    )

    # PLR identifier column — EWR CSVs use 'PLR', 'RAUMID', or 'RAUMID_PLR'.
    plr_col = next((c for c in ("RAUMID", "RAUMID_PLR", "PLR_ID", "PLR") if c in df.columns), None)
    if plr_col is None:
        raise ValueError(
            f"Cannot find PLR identifier column in CSV for {year}. "
            f"Available columns: {list(df.columns[:20])}"
        )
    df = df.rename(columns={plr_col: "area_code"})
    df["area_code"] = df["area_code"].astype(str).str.strip().str.zfill(8)

    # Filter out aggregate/header rows — PLR codes must be exactly 8 digits.
    df = df[df["area_code"].str.match(r"^\d{8}$")].copy()
    if df.empty:
        raise ValueError(f"No valid PLR rows found in EWR CSV for {year}")

    # Mandatory denominator: E_E = total residents.
    if "E_E" not in df.columns:
        raise ValueError(
            f"Required column E_E (total residents) not found in EWR CSV for {year}. "
            f"Available columns: {list(df.columns[:20])}"
        )

    total_raw, total_supp = _to_numeric_with_suppression(df["E_E"])
    total = total_raw.fillna(0)

    # Track suppression: accumulate OR across all relevant columns.
    suppressed_any = total_supp.copy()

    def _share(cols: list[str]) -> pd.Series:
        """Compute (sum of cols) / total, NaN where total=0 or suppressed."""
        nonlocal suppressed_any
        num, mask = _col_sum_numeric(df, cols)
        suppressed_any = suppressed_any | mask
        return _safe_div(num, total)

    indicators: dict[str, pd.Series] = {}

    # Bug #58: residents_total must be NaN for suppressed PLRs, not 0.0.
    # total_raw retains NaN; total (fillna(0)) is kept only as a denominator
    # for _safe_div, which already maps 0 -> NaN before dividing.
    indicators["residents_total"] = total_raw
    indicators["residents_male_share"] = _share(["E_EM"])
    indicators["residents_female_share"] = _share(["E_EW"])
    indicators["age_under18_share"] = _share(["E_U1", "E_1U6", "E_6U15", "E_15U18"])
    indicators["age_18_27_share"] = _share(["E_E18_21", "E_E21_25", "E_E25_27"])
    indicators["age_27_45_share"] = _share(["E_E27_30", "E_E30_35", "E_E35_40", "E_E40_45"])
    indicators["age_45_65_share"] = _share(["E_E45_50", "E_E50_55", "E_55U65"])
    indicators["age_65plus_share"] = _share(["E_65U80", "E_80U110"])

    # foreigners_share — E_A is only in the companion 12H CSV (not the main 12E Matrix).
    # When the companion has not been loaded, log a debug note and emit NaN (not 0.0).
    if "E_A" in df.columns:
        indicators["foreigners_share"] = _share(["E_A"])
    else:
        log.debug(
            "E_A column absent for year %d (companion 12H CSV not loaded) — "
            "foreigners_share will be NULL",
            year,
        )
        indicators["foreigners_share"] = pd.Series(float("nan"), index=df.index)
        suppressed_any = suppressed_any | pd.Series(True, index=df.index)

    # mean_age: midpoint-weighted sum over cohorts / total residents.
    weighted_age = pd.Series(0.0, index=df.index)
    for midpoint, col in AGE_COHORTS:
        if col in df.columns:
            num, mask = _to_numeric_with_suppression(df[col])
            suppressed_any = suppressed_any | mask
            weighted_age += midpoint * num.fillna(0)
    indicators["mean_age_years"] = _safe_div(weighted_age, total)

    # migration_background_share — only when MH_E column is present.
    # When absent (typically pre-2015), NaN for all rows.
    # Geo-DS caveat: methodological break ~2017 (Mikrozensus reform);
    # stable_from_year=2017 in seed_ewr_indicator_meta.
    if "MH_E" in df.columns:
        mh_num, mh_supp = _to_numeric_with_suppression(df["MH_E"])
        suppressed_any = suppressed_any | mh_supp
        indicators["migration_background_share"] = _safe_div(mh_num.fillna(0), total)
    else:
        log.debug(
            "MH_E column absent for year %d — migration_background_share will be NULL",
            year,
        )
        indicators["migration_background_share"] = pd.Series(float("nan"), index=df.index)

    # residence duration shares — DAU5 / DAU10 are already proportions (0-1) in
    # some vintages; in others they are counts. Detect by checking max value.
    def _duration_share(col: str) -> pd.Series:
        nonlocal suppressed_any
        if col not in df.columns:
            return pd.Series(float("nan"), index=df.index)
        num, mask = _to_numeric_with_suppression(df[col])
        suppressed_any = suppressed_any | mask
        num = num.fillna(float("nan"))
        # If max value > 1.5, assume it is a count; divide by total.
        if num.max(skipna=True) > 1.5:
            return _safe_div(num, total)
        return num

    indicators["residence_duration_5y_share"] = _duration_share("DAU5")
    indicators["residence_duration_10y_share"] = _duration_share("DAU10")

    # LOR vintage assignment.
    area_vintage = "lor_pre2021" if year <= 2020 else "lor_2021"
    reference_date = datetime.date(year, 12, 31)

    # Build wide-format output dataframe.
    out = pd.DataFrame(
        {
            "city_code": CITY_CODE,
            "reference_year": year,
            "reference_date": reference_date,
            "area_code": df["area_code"].values,
            "area_vintage": area_vintage,
        }
    )
    for col_name in INDICATOR_COLUMNS:
        out[col_name] = indicators[col_name].values

    out["is_suppressed_any"] = suppressed_any.values
    out["source_attribution"] = SOURCE_ATTRIBUTION

    return out


# ---------------------------------------------------------------------------
# Download helpers
# ---------------------------------------------------------------------------


def _parse_csv_bytes(raw_bytes: bytes, year: int) -> pd.DataFrame:
    """Decode and parse raw CSV bytes; tries latin-1/utf-8 and ;/,/tab separators."""
    for encoding in ("latin-1", "utf-8-sig", "utf-8", "cp1252"):
        try:
            text = raw_bytes.decode(encoding)
            break
        except UnicodeDecodeError:
            continue
    else:
        raise ValueError(f"Cannot decode EWR CSV for {year}")

    for sep in (";", ",", "\t"):
        try:
            df = pd.read_csv(io.StringIO(text), sep=sep, dtype=str, low_memory=False, encoding=None)
            if df.shape[1] > 5:
                log.debug(
                    "Parsed EWR %d CSV with sep=%r: %d rows x %d cols",
                    year,
                    sep,
                    len(df),
                    df.shape[1],
                )
                return df
        except Exception:  # noqa: BLE001
            continue

    raise ValueError(f"Cannot parse EWR CSV for {year} — check separator/encoding")


def load_local_csv(local_dir: Path, year: int) -> Optional[pd.DataFrame]:
    """Load a pre-downloaded CSV from local_dir/<year>.csv if it exists."""
    for name in (f"{year}.csv", f"EWR{year}12E_Matrix.csv", f"EWR_L21_{year}12E_Matrix.csv"):
        path = local_dir / name
        if path.exists():
            log.info("Using local CSV for EWR %d: %s", year, path)
            return _parse_csv_bytes(path.read_bytes(), year)
    return None


def load_companion_local_csv(local_dir: Path, year: int) -> Optional[pd.DataFrame]:
    """
    Load the companion 12A CSV (Ausländische Einwohner) from local_dir if it exists.

    The 12A Matrix contains E_A (total foreigners) which is absent from the main
    12E Matrix. Published as a separate dataset series on daten.berlin.de:
    "Ausländische Einwohnerinnen und Einwohner in Berlin in LOR-Planungsräumen"
    Available years: 2014-2020, 2025 (not 2008-2013 or 2024).
    Licence: CC BY 3.0 DE — Amt für Statistik Berlin-Brandenburg.

    Direct download URLs (browser required — server blocks programmatic access):
      2014-2020: https://www.statistik-berlin-brandenburg.de/opendata/EWR{YYYY}12A_Matrix.csv
      2025:      https://www.statistik-berlin-brandenburg.de/opendata/EWR_L21_202512A_Matrix.csv
    """
    for name in (
        f"EWR{year}12A_Matrix.csv",
        f"EWR_L21_{year}12A_Matrix.csv",
        f"{year}A.csv",
    ):
        path = local_dir / name
        if path.exists():
            log.info("Using local companion 12A CSV for EWR %d: %s", year, path)
            return _parse_csv_bytes(path.read_bytes(), year)
    log.debug(
        "No companion 12A CSV found for year %d in %s — foreigners_share will be NULL. "
        "Download EWR%d12A_Matrix.csv from daten.berlin.de and place in --local-csv-dir.",
        year,
        local_dir,
        year,
    )
    return None


def load_whndauer_local_csv(local_dir: Path, year: int) -> Optional[pd.DataFrame]:
    """
    Load the Wohndauer companion CSV from local_dir if it exists.

    WHNDAUER{YYYY}_Matrix.csv contains PDAU5 and PDAU10 — the share of PLR
    residents who have lived at their current address for ≥5 and ≥10 years
    respectively, expressed as percentages (0–100). Divided by 100 on load
    to produce DAU5/DAU10 shares (0–1) matching the thesis convention.

    Published as a separate dataset series on daten.berlin.de:
    "Einwohnerinnen und Einwohner in Berlin in LOR-Planungsräumen nach Wohndauer"
    Available years: 2007-2020.
    Licence: CC BY 3.0 DE — Amt für Statistik Berlin-Brandenburg.

    Direct download URLs (browser required — server blocks programmatic access):
      2007-2020: https://www.statistik-berlin-brandenburg.de/opendata/WHNDAUER{YYYY}_Matrix.csv
    """
    for name in (f"WHNDAUER{year}_Matrix.csv", f"{year}WHNDAUER.csv"):
        path = local_dir / name
        if path.exists():
            log.info("Using local Wohndauer CSV for EWR %d: %s", year, path)
            df = _parse_csv_bytes(path.read_bytes(), year)
            df.columns = df.columns.str.strip().str.upper()
            # Convert PDAU5/PDAU10 from percentage to 0-1 share and rename to
            # DAU5/DAU10 so compute_indicators can use them directly.
            for pct_col, share_col in (("PDAU5", "DAU5"), ("PDAU10", "DAU10")):
                if pct_col in df.columns:
                    stripped = df[pct_col].astype(str).str.strip()
                    df[share_col] = (
                        pd.to_numeric(stripped.str.replace(",", ".", regex=False), errors="coerce")
                        / 100.0
                    )
            return df
    log.debug(
        "No Wohndauer CSV found for year %d in %s — residence_duration_*_share will be NULL. "
        "Download WHNDAUER%d_Matrix.csv from daten.berlin.de and place in --local-csv-dir.",
        year,
        local_dir,
        year,
    )
    return None


def load_migra_local_csv(local_dir: Path, year: int) -> Optional[pd.DataFrame]:
    """
    Load the EWRMIGRA companion CSV from local_dir if it exists.

    The EWRMIGRA 12E Matrix contains MH_E (total residents with migration
    background) which is absent from the main 12E and 12A matrices.
    Published as a separate dataset series on daten.berlin.de:
    "Einwohnerinnen und Einwohner mit Migrationshintergrund in Berlin in
    LOR-Planungsräumen"
    Available years: 2014-2020.
    Licence: CC BY 3.0 DE — Amt für Statistik Berlin-Brandenburg.

    Direct download URLs (browser required — server blocks programmatic access):
      2014-2020: https://www.statistik-berlin-brandenburg.de/opendata/EWRMIGRA{YYYY}12E_Matrix.csv
    """
    for name in (
        f"EWRMIGRA{year}12E_Matrix.csv",
        f"EWRMIGRA_L21_{year}12E_Matrix.csv",
        f"{year}MIGRA.csv",
    ):
        path = local_dir / name
        if path.exists():
            log.info("Using local EWRMIGRA CSV for EWR %d: %s", year, path)
            return _parse_csv_bytes(path.read_bytes(), year)
    log.debug(
        "No EWRMIGRA CSV found for year %d in %s — migration_background_share will be NULL. "
        "Download EWRMIGRA%d12E_Matrix.csv from daten.berlin.de and place in --local-csv-dir.",
        year,
        local_dir,
        year,
    )
    return None


def download_csv(url: str, year: int) -> pd.DataFrame:
    """Download a CSV from url and parse it; tries ';', ',', and tab separators."""
    log.info("Downloading EWR %d from %s", year, url)
    with urllib.request.urlopen(url, timeout=120, context=_SSL_CONTEXT) as resp:  # noqa: S310
        raw_bytes = resp.read()

    return _parse_csv_bytes(raw_bytes, year)


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------


def process_year(
    year: int,
    url: Optional[str],
    out_dir: Path,
    dry_run: bool = False,
    local_dir: Optional[Path] = None,
) -> bool:
    """Load (local first, then HTTP), compute indicators, write parquet. Returns True on success."""
    out_path = out_dir / f"{year}.parquet"

    if dry_run:
        src = f"local:{local_dir}" if local_dir else url or "CKAN-discovery"
        log.info("[dry-run] Would process %d from %s -> %s", year, src, out_path)
        return True

    # Local pre-downloaded CSV takes priority over HTTP.
    raw_df = None
    if local_dir:
        raw_df = load_local_csv(local_dir, year)

    if raw_df is None:
        if url is None:
            log.warning("No URL and no local CSV for EWR %d — skipping.", year)
            return False
        try:
            raw_df = download_csv(url, year)
        except Exception as exc:
            log.error("Failed to download EWR %d: %s", year, exc)
            return False

    # Attempt to load and merge companion 12H CSV (contains E_A, MH_E, DAU5, DAU10).
    if local_dir:
        companion_df = load_companion_local_csv(local_dir, year)
        if companion_df is not None:
            # Normalise companion column names to match main CSV treatment.
            companion_df.columns = companion_df.columns.str.strip().str.upper()
            # Identify the join key (RAUMID / PLR identifier) in the companion.
            companion_plr_col = next(
                (c for c in ("RAUMID", "RAUMID_PLR", "PLR_ID", "PLR") if c in companion_df.columns),
                None,
            )
            if companion_plr_col is not None:
                companion_df = companion_df.rename(columns={companion_plr_col: "_JOIN_KEY"})
                companion_df["_JOIN_KEY"] = (
                    companion_df["_JOIN_KEY"].astype(str).str.strip().str.zfill(8)
                )
                # Identify the join key in the main CSV (normalised same way later in
                # compute_indicators; normalise here so the merge key matches).
                main_df = raw_df.copy()
                main_df.columns = main_df.columns.str.strip().str.upper()
                main_plr_col = next(
                    (c for c in ("RAUMID", "RAUMID_PLR", "PLR_ID", "PLR") if c in main_df.columns),
                    None,
                )
                if main_plr_col is not None:
                    main_df["_JOIN_KEY"] = (
                        main_df[main_plr_col].astype(str).str.strip().str.zfill(8)
                    )
                    # Columns to pull from companion (only those absent from main).
                    # Apply alias normalisation so downstream code uses canonical names.
                    companion_df = companion_df.rename(
                        columns={
                            k: v
                            for k, v in _GROUPED_BIN_ALIASES.items()
                            if k in companion_df.columns and v not in companion_df.columns
                        }
                    )
                    cols_to_merge = [
                        c
                        for c in COMPANION_COLS
                        if c in companion_df.columns and c not in main_df.columns
                    ]
                    if cols_to_merge:
                        companion_subset = companion_df[["_JOIN_KEY"] + cols_to_merge]
                        merged = main_df.merge(companion_subset, on="_JOIN_KEY", how="left")
                        # Restore original column order + add companion cols; drop temp key.
                        raw_df = merged.drop(columns=["_JOIN_KEY"])
                        # Restore original column names for main CSV columns
                        # (compute_indicators will normalise again).
                        log.info(
                            "Merged companion 12A cols %s for EWR %d (%d rows matched)",
                            cols_to_merge,
                            year,
                            main_df["_JOIN_KEY"].isin(companion_subset["_JOIN_KEY"]).sum(),
                        )

    # Attempt to load and merge EWRMIGRA companion CSV (contains MH_E).
    if local_dir:
        migra_df = load_migra_local_csv(local_dir, year)
        if migra_df is not None:
            migra_df.columns = migra_df.columns.str.strip().str.upper()
            migra_plr_col = next(
                (c for c in ("RAUMID", "RAUMID_PLR", "PLR_ID", "PLR") if c in migra_df.columns),
                None,
            )
            if migra_plr_col is not None:
                migra_df = migra_df.rename(columns={migra_plr_col: "_JOIN_KEY"})
                migra_df["_JOIN_KEY"] = migra_df["_JOIN_KEY"].astype(str).str.strip().str.zfill(8)
                work_df = raw_df.copy()
                work_df.columns = work_df.columns.str.strip().str.upper()
                main_plr_col = next(
                    (c for c in ("RAUMID", "RAUMID_PLR", "PLR_ID", "PLR") if c in work_df.columns),
                    None,
                )
                if main_plr_col is not None:
                    work_df["_JOIN_KEY"] = (
                        work_df[main_plr_col].astype(str).str.strip().str.zfill(8)
                    )
                    migra_cols = [
                        c for c in ("MH_E",) if c in migra_df.columns and c not in work_df.columns
                    ]
                    if migra_cols:
                        migra_subset = migra_df[["_JOIN_KEY"] + migra_cols]
                        merged = work_df.merge(migra_subset, on="_JOIN_KEY", how="left")
                        raw_df = merged.drop(columns=["_JOIN_KEY"])
                        log.info(
                            "Merged EWRMIGRA cols %s for EWR %d (%d rows matched)",
                            migra_cols,
                            year,
                            work_df["_JOIN_KEY"].isin(migra_subset["_JOIN_KEY"]).sum(),
                        )

    # Attempt to load and merge Wohndauer companion CSV (contains DAU5/DAU10).
    if local_dir:
        whndauer_df = load_whndauer_local_csv(local_dir, year)
        if whndauer_df is not None:
            # Column names already normalised to upper-case by load_whndauer_local_csv.
            whndauer_plr_col = next(
                (c for c in ("RAUMID", "RAUMID_PLR", "PLR_ID", "PLR") if c in whndauer_df.columns),
                None,
            )
            if whndauer_plr_col is not None:
                whndauer_df = whndauer_df.rename(columns={whndauer_plr_col: "_JOIN_KEY"})
                whndauer_df["_JOIN_KEY"] = (
                    whndauer_df["_JOIN_KEY"].astype(str).str.strip().str.zfill(8)
                )
                work_df = raw_df.copy()
                work_df.columns = work_df.columns.str.strip().str.upper()
                main_plr_col = next(
                    (c for c in ("RAUMID", "RAUMID_PLR", "PLR_ID", "PLR") if c in work_df.columns),
                    None,
                )
                if main_plr_col is not None:
                    work_df["_JOIN_KEY"] = (
                        work_df[main_plr_col].astype(str).str.strip().str.zfill(8)
                    )
                    dau_cols = [
                        c
                        for c in ("DAU5", "DAU10")
                        if c in whndauer_df.columns and c not in work_df.columns
                    ]
                    if dau_cols:
                        dau_subset = whndauer_df[["_JOIN_KEY"] + dau_cols]
                        merged = work_df.merge(dau_subset, on="_JOIN_KEY", how="left")
                        raw_df = merged.drop(columns=["_JOIN_KEY"])
                        log.info(
                            "Merged Wohndauer cols %s for EWR %d (%d rows matched)",
                            dau_cols,
                            year,
                            work_df["_JOIN_KEY"].isin(dau_subset["_JOIN_KEY"]).sum(),
                        )

    try:
        wide_df = compute_indicators(raw_df, year)
    except Exception as exc:
        log.error("Failed to compute indicators for EWR %d: %s", year, exc)
        return False

    out_dir.mkdir(parents=True, exist_ok=True)

    parquet_schema = pa.schema(
        [
            pa.field("city_code", pa.string()),
            pa.field("reference_year", pa.int32()),
            pa.field("reference_date", pa.date32()),
            pa.field("area_code", pa.string()),
            pa.field("area_vintage", pa.string()),
            pa.field("residents_total", pa.float64()),
            pa.field("residents_male_share", pa.float64()),
            pa.field("residents_female_share", pa.float64()),
            pa.field("age_under18_share", pa.float64()),
            pa.field("age_18_27_share", pa.float64()),
            pa.field("age_27_45_share", pa.float64()),
            pa.field("age_45_65_share", pa.float64()),
            pa.field("age_65plus_share", pa.float64()),
            pa.field("mean_age_years", pa.float64()),
            pa.field("foreigners_share", pa.float64()),
            pa.field("migration_background_share", pa.float64()),
            pa.field("residence_duration_5y_share", pa.float64()),
            pa.field("residence_duration_10y_share", pa.float64()),
            pa.field("is_suppressed_any", pa.bool_()),
            pa.field("source_attribution", pa.string()),
        ]
    )

    try:
        table = pa.Table.from_pandas(wide_df, schema=parquet_schema, preserve_index=False)
        pq.write_table(table, out_path, compression="snappy")
        plr_count = len(wide_df)
        suppressed_count = int(wide_df["is_suppressed_any"].sum())
        log.info(
            "Wrote %d PLR rows to %s (%d suppressed)",
            plr_count,
            out_path,
            suppressed_count,
        )
    except Exception as exc:
        log.error("Failed to write parquet for EWR %d: %s", year, exc)
        return False

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
        default="2015-2024",
        help=(
            "Year range or comma-separated list "
            "(e.g. '2015-2024' or '2020,2021'). Default: 2015-2024."
        ),
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
        "--local-csv-dir",
        type=Path,
        default=None,
        metavar="DIR",
        help=(
            "Directory of pre-downloaded CSVs (e.g. data/raw/berlin/ewr/csv). "
            "Files named <year>.csv, EWR<year>12E_Matrix.csv, or "
            "EWR_L21_<year>12E_Matrix.csv are used instead of HTTP download. "
            "Use this when statistik-berlin-brandenburg.de blocks programmatic access."
        ),
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be processed without making HTTP calls.",
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
    local_dir = args.local_csv_dir.resolve() if args.local_csv_dir else None
    dry_run = args.dry_run

    if dry_run:
        log.info("[dry-run] mode — no HTTP calls will be made.")
    if local_dir:
        log.info("Local CSV directory: %s", local_dir)

    success_count = 0
    skip_count = 0
    error_count = 0
    plr_counts: dict[int, int] = {}

    for year in years:
        url = url_map.get(year)

        # Skip URL discovery if a local file will cover this year.
        has_local = (
            local_dir and load_local_csv(local_dir, year) is not None if not dry_run else False
        )

        if url is None and not has_local:
            # Attempt CKAN API discovery.
            if not dry_run:
                log.info("Attempting CKAN API discovery for year %d ...", year)
                url = discover_url_via_ckan(year)
            else:
                log.info("[dry-run] Would attempt CKAN API discovery for year %d", year)

        if url is None and not has_local:
            log.warning(
                "No URL and no local CSV for EWR %d — skipping. "
                "Add to VINTAGE_URLS, use --url-override %d=<url>, "
                "or place a CSV in --local-csv-dir.",
                year,
                year,
            )
            skip_count += 1
            continue

        ok = process_year(year, url, out_dir, dry_run=dry_run, local_dir=local_dir)
        if ok:
            success_count += 1
            out_path = out_dir / f"{year}.parquet"
            if not dry_run and out_path.exists():
                try:
                    t = pq.read_table(str(out_path), columns=["area_code"])
                    plr_counts[year] = len(t)
                except Exception:  # noqa: BLE001
                    pass
        else:
            error_count += 1

    log.info(
        "Summary: %d processed, %d skipped (no URL / API miss), %d errors.",
        success_count,
        skip_count,
        error_count,
    )
    if plr_counts:
        for yr, cnt in sorted(plr_counts.items()):
            log.info("  %d: %d PLR rows", yr, cnt)

    if error_count > 0:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
