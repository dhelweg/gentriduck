"""
ingestion/hamburg/ewr/ingest_hamburg_ewr_stadtteil.py
========================================================
H1 (#40) — Hamburg EWR-equivalent socio-economic predictor ingestion
(ADR-0014 Pillar 3, PRIMARY source only: "Regionalstatistische Daten der
Stadtteile Hamburgs", Transparenzportal). Direct conceptual analogue of
Berlin's EWR (ingestion/berlin/ewr/ingest_ewr.py, ADR-0003) — but at
Stadtteil grain (~104-105 areas), not statistisches-Gebiet grain.

**Scope discipline (R-C1 — this slice is PLUMBING, not methodology):**
This ingestor and its paired staging model (stg_hamburg_ewr_stadtteil)
perform raw ingestion + long-format staging ONLY, at the Stadtteil grain
the source itself publishes at. They do NOT:
  - join or reconcile Stadtteil-grain data down to statistisches-Gebiete
    (the two-grain reconciliation ADR-0014 open question #5 flags as
    methodology-bearing, requiring geo-DS + domain-expert sign-off);
  - compute any weighted index, normalization, or composite score;
  - wire these predictors into int_gentrification_ts.sql,
    int_ewr_socioeco.sql, or gentrification_index.sql (all still
    Berlin-only / city-agnostic-core files gated separately).
A later, dedicated methodology-gated slice will do the two-grain join
and any index-weighting integration once this raw layer exists to build
on — tracked as the next H1 increment on #40 once all plumbing pillars
land.

Source (ADR-0014, Pillar 3, primary): Hamburg Transparenzportal —
  "Regionalstatistische Daten der Stadtteile Hamburgs"
  Portal listing: https://suche.transparenz.hamburg.de/dataset/regionalstatistische-daten-der-stadtteile-hamburgs20
  Licence: dl-de/by-2.0 — attribution: "Statistisches Amt fuer Hamburg
  und Schleswig-Holstein" (ADR-0014 Pillar 3).
  Formats offered: CSV (zip), GeoJSON (zip), GML, OGC API-Features, WFS.
  Time coverage: 2013 onward.

NOTE on endpoint/schema verification (ADR-0014 open question #1 applies
independently per pillar — this environment has no outbound network
access, mirroring the caveat already flagged for the displacement-zone
pillar's ingestor). The CKAN dataset slug/CSV download URL below is the
*likeliest* shape given the Transparenzportal CKAN API pattern already
confirmed live for the Sozialmonitoring pillar (package_show by dataset
slug), but is UNCONFIRMED for this specific dataset and flagged as such.
A real ingestion run must probe the CKAN API
(https://suche.transparenz.hamburg.de/api/3/action/package_show?id=regionalstatistische-daten-der-stadtteile-hamburgs20)
to resolve the exact resource URL(s) and inspect a sample CSV's column
headers before trusting COLUMN_MAP below, exactly as every prior
Hamburg-pillar ingestor's docstring requires.

Indicator set (this slice — deliberately narrower than Berlin's 13-item
EWR set; ADR-0014 Pillar 3 notes the Stadtteil release's exact column
set was not hands-on inspected at H0/ADR ratification time). Columns
below are the commonly-published "Regionalstatistische Daten" fields per
the H0 research deliverable (docs/epic-h/H1-hamburg-data-landscape.md);
COLUMN_MAP must be re-verified against the real CSV header at first live
run and this list amended if names differ:
  residents_total              -- Einwohner insgesamt (count)
  residents_male_share         -- maennlich / insgesamt (share)
  residents_female_share       -- weiblich / insgesamt (share)
  age_under18_share            -- unter 18 Jahre / insgesamt (share)
  age_65plus_share             -- 65 Jahre und aelter / insgesamt (share)
  foreigners_share             -- Auslaenderanteil (share)
  unemployment_share           -- Arbeitslosenquote (share) -- NOTE: this
                                   is also one of the Sozialmonitoring's
                                   seven attention-indicators; carried
                                   here too because the Stadtteil release
                                   publishes it independently at its own
                                   grain -- no methodology judgement about
                                   which source "wins" is made in this
                                   staging layer (deferred to the gated
                                   integration slice).

No cross-grain, no weighting, no index math: this script only reshapes
one wide CSV (one row per Stadtteil x year) into long format
(one row per Stadtteil x year x indicator) and writes Parquet, mirroring
stg_berlin_ewr's UNPIVOT shape at the dbt layer.

Output parquet schema (wide format, one row per Stadtteil x year, later
UNPIVOTed to long format by stg_hamburg_ewr_stadtteil):
  city_code            (string): 'HH' (ADR-0005)
  area_code            (string): Stadtteil Schluessel (matches
                                  stg_hamburg_geo's subarea_l1 area_code)
  area_vintage          (string): 'current' (single Stadtteil boundary
                                  edition; Stadtteil boundaries are far
                                  more stable than statistische-Gebiete,
                                  no vintage split needed for this slice)
  reference_year        (int): calendar year of the annual release
  residents_total        (double, nullable)
  residents_male_share   (double, nullable)
  residents_female_share (double, nullable)
  age_under18_share      (double, nullable)
  age_65plus_share       (double, nullable)
  foreigners_share       (double, nullable)
  unemployment_share     (double, nullable)
  is_suppressed_any      (bool): True if any indicator cell was
                                  privacy-suppressed in the source CSV
  source_attribution     (string): dl-de/by-2.0 attribution

Usage:
  uv run python ingestion/hamburg/ewr/ingest_hamburg_ewr_stadtteil.py \\
      --out-dir data/raw/hamburg/ewr_stadtteil \\
      --years 2013-2025

  # Dry run (no HTTP calls):
  uv run python ingestion/hamburg/ewr/ingest_hamburg_ewr_stadtteil.py \\
      --out-dir data/raw/hamburg/ewr_stadtteil --years 2013-2025 --dry-run

  # Override the CSV URL (e.g. once the real CKAN resource URL is known):
  uv run python ingestion/hamburg/ewr/ingest_hamburg_ewr_stadtteil.py \\
      --out-dir data/raw/hamburg/ewr_stadtteil --years 2024 \\
      --url-override https://example.com/regionalstatistik_stadtteile.csv

Attribution (mandatory -- dl-de/by-2.0, ADR-0014 Pillar 3):
  "Statistisches Amt fuer Hamburg und Schleswig-Holstein"
  Each output parquet row carries source_attribution; the dbt staging
  model (stg_hamburg_ewr_stadtteil) and the website attribution page
  (Epic G3) must surface this.

Runtime: expected <30s for the full 2013-2025 back series on normal
broadband (single CSV/zip download, no per-year requests like Berlin's
EWR CKAN discovery pattern -- the Transparenzportal release appears to
bundle all years in one file per H0's research; VERIFY at first live run
and switch to a per-year loop if the source turns out to be split).
"""

from __future__ import annotations

import argparse
import io
import logging
import ssl
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Optional

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

CITY_CODE = "HH"
SOURCE_ATTRIBUTION = (
    "Statistisches Amt fuer Hamburg und Schleswig-Holstein, "
    "dl-de/by-2.0 — https://transparenz.hamburg.de/"
)

# UNCONFIRMED — best-known-guess CKAN resource URL, following the same
# suche.transparenz.hamburg.de CKAN API pattern already confirmed live for
# the Sozialmonitoring pillar's dataset discovery. Re-probe package_show
# for slug "regionalstatistische-daten-der-stadtteile-hamburgs20" before
# trusting this at first live run (see module docstring).
DEFAULT_CSV_URL = (
    "https://suche.transparenz.hamburg.de/dataset/"
    "regionalstatistische-daten-der-stadtteile-hamburgs20/download/"
    "regionalstatistik_stadtteile.csv"
)

# Source column -> canonical indicator name. UNCONFIRMED against a real
# header row (see module docstring) -- re-verify at first live ingestion.
COLUMN_MAP = {
    "einwohner_insgesamt": "residents_total",
    "maennlich_anteil": "residents_male_share",
    "weiblich_anteil": "residents_female_share",
    "unter_18_anteil": "age_under18_share",
    "ab_65_anteil": "age_65plus_share",
    "auslaenderanteil": "foreigners_share",
    "arbeitslosenquote": "unemployment_share",
}
INDICATOR_COLUMNS = list(COLUMN_MAP.values())

# Columns expected to identify the Stadtteil + year in the source CSV.
# UNCONFIRMED naming -- re-verify at first live ingestion.
STADTTEIL_ID_COL = "stadtteil_schluessel"
YEAR_COL = "jahr"

OUTPUT_SCHEMA = pa.schema(
    [
        pa.field("city_code", pa.string()),
        pa.field("area_code", pa.string()),
        pa.field("area_vintage", pa.string()),
        pa.field("reference_year", pa.int32()),
        *[pa.field(col, pa.float64()) for col in INDICATOR_COLUMNS],
        pa.field("is_suppressed_any", pa.bool_()),
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
log = logging.getLogger("hamburg_ewr_stadtteil_ingest")


# ---------------------------------------------------------------------------
# Fetch + parse
# ---------------------------------------------------------------------------


def fetch_csv_bytes(url: str, timeout: int = 120) -> bytes:
    """Fetch raw CSV bytes from a URL. Raises RuntimeError on failure."""
    log.info("Fetching CSV from: %s", url)
    try:
        with urllib.request.urlopen(url, timeout=timeout, context=_SSL_CONTEXT) as resp:  # noqa: S310
            return resp.read()
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Network error fetching {url}: {exc}") from exc
    except Exception as exc:
        raise RuntimeError(f"Unexpected error fetching {url}: {exc}") from exc


def _parse_german_decimal(series: pd.Series) -> pd.Series:
    """Parse a column that may use German decimal commas and suppression
    markers ('-', '.', blank) into a float Series, preserving NaN for
    suppressed cells (never coerced to 0), mirroring stg_berlin_ewr's
    suppressed-cell discipline.
    """
    cleaned = (
        series.astype(str)
        .str.strip()
        .replace({"-": None, ".": None, "": None, "nan": None, "None": None})
        .str.replace(".", "", regex=False)  # thousands separator
        .str.replace(",", ".", regex=False)  # decimal comma -> dot
    )
    return pd.to_numeric(cleaned, errors="coerce")


def parse_stadtteil_csv(raw: bytes, years: Optional[set[int]] = None) -> pd.DataFrame:
    """Parse the raw Regionalstatistische-Daten CSV into the wide output
    schema (one row per Stadtteil x year). Raises RuntimeError if expected
    identifier columns are absent (column-name drift is a known Berlin-EWR
    class of trap per ADR-0014 Pillar 3, cf. #50/#57/#58).
    """
    # German CKAN CSV exports commonly use ';' delimiters and latin-1/utf-8
    # encoding; try utf-8-sig first (handles BOM), then latin-1.
    for encoding in ("utf-8-sig", "latin-1"):
        try:
            df = pd.read_csv(io.BytesIO(raw), sep=";", encoding=encoding, dtype=str)
            break
        except (UnicodeDecodeError, pd.errors.ParserError):
            continue
    else:
        raise RuntimeError("Could not parse Regionalstatistische-Daten CSV with ';' delimiter.")

    df.columns = [c.strip().lower() for c in df.columns]

    if STADTTEIL_ID_COL not in df.columns:
        raise RuntimeError(
            f"Expected identifier column {STADTTEIL_ID_COL!r} not found in CSV "
            f"(columns present: {list(df.columns)[:20]}). The Transparenzportal "
            "schema may have drifted from this ingestor's UNCONFIRMED COLUMN_MAP "
            "-- re-probe the CKAN resource and update COLUMN_MAP/STADTTEIL_ID_COL."
        )
    if YEAR_COL not in df.columns:
        raise RuntimeError(
            f"Expected year column {YEAR_COL!r} not found in CSV "
            f"(columns present: {list(df.columns)[:20]})."
        )

    out = pd.DataFrame()
    out["area_code"] = df[STADTTEIL_ID_COL].astype(str).str.strip()
    out["reference_year"] = pd.to_numeric(df[YEAR_COL], errors="coerce").astype("Int64")

    present_indicators = []
    for src_col, canon_col in COLUMN_MAP.items():
        if src_col in df.columns:
            out[canon_col] = _parse_german_decimal(df[src_col])
            present_indicators.append(canon_col)
        else:
            log.warning(
                "Source column %r (-> %r) not present in CSV; filling NULL. "
                "COLUMN_MAP may need updating against the real schema.",
                src_col,
                canon_col,
            )
            out[canon_col] = pd.NA

    out["is_suppressed_any"] = (
        out[present_indicators].isna().any(axis=1) if present_indicators else False
    )
    out["city_code"] = CITY_CODE
    out["area_vintage"] = "current"
    out["source_attribution"] = SOURCE_ATTRIBUTION

    out = out.dropna(subset=["area_code", "reference_year"])
    out["reference_year"] = out["reference_year"].astype(int)

    if years:
        out = out[out["reference_year"].isin(years)]

    return out[
        [
            "city_code",
            "area_code",
            "area_vintage",
            "reference_year",
            *INDICATOR_COLUMNS,
            "is_suppressed_any",
            "source_attribution",
        ]
    ].reset_index(drop=True)


# ---------------------------------------------------------------------------
# Write parquet
# ---------------------------------------------------------------------------


def write_parquet(df: pd.DataFrame, out_path: Path) -> None:
    table = pa.Table.from_pandas(df, schema=OUTPUT_SCHEMA, preserve_index=False)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    pq.write_table(table, out_path, compression="snappy")
    log.info("Wrote %d rows to %s", len(df), out_path)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def parse_years_arg(years_arg: str) -> set[int]:
    """Parse '2013-2025' or '2013,2015,2020' into a set of ints."""
    years: set[int] = set()
    for part in years_arg.split(","):
        part = part.strip()
        if "-" in part:
            start, end = part.split("-")
            years.update(range(int(start), int(end) + 1))
        elif part:
            years.add(int(part))
    return years


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Hamburg 'Regionalstatistische Daten der Stadtteile' "
            "(ADR-0014 Pillar 3, primary source) and write long-format-ready "
            "Parquet. Staging-only slice: no cross-grain join to statistische "
            "Gebiete, no index/weighting logic (R-C1 plumbing scope)."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/hamburg/ewr_stadtteil",
        type=Path,
        help="Output directory for parquet files (default: data/raw/hamburg/ewr_stadtteil).",
    )
    p.add_argument(
        "--years",
        default="2013-2025",
        help="Year range/list to keep after parsing, e.g. '2013-2025' or '2020,2022,2024'.",
    )
    p.add_argument(
        "--url-override",
        default=None,
        help="Override the CSV download URL (default: best-known UNCONFIRMED CKAN URL).",
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
    url = args.url_override or DEFAULT_CSV_URL
    years = parse_years_arg(args.years)

    log.info("Attribution: %s", SOURCE_ATTRIBUTION)

    if args.dry_run:
        log.info("[dry-run] Would fetch %s -> %s", url, out_dir / "stadtteile.parquet")
        log.info("[dry-run] Years requested: %s", sorted(years))
        return 0

    try:
        raw = fetch_csv_bytes(url)
    except RuntimeError as exc:
        log.error("Failed to fetch Regionalstatistische-Daten CSV: %s", exc)
        return 1

    try:
        df = parse_stadtteil_csv(raw, years=years)
    except RuntimeError as exc:
        log.error("Failed to parse CSV: %s", exc)
        return 1

    if df.empty:
        log.error("No rows parsed for the requested years — not writing parquet.")
        return 1

    out_path = out_dir / "stadtteile.parquet"
    write_parquet(df, out_path)

    log.info(
        "Summary: %d rows, %d Stadtteile, years %d-%d.",
        len(df),
        df["area_code"].nunique(),
        df["reference_year"].min(),
        df["reference_year"].max(),
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
