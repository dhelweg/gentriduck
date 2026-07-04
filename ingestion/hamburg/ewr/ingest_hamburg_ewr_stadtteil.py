"""
ingestion/hamburg/ewr/ingest_hamburg_ewr_stadtteil.py
========================================================
H1 (#40) / H2 (#125) — Hamburg EWR-equivalent socio-economic predictor
ingestion (ADR-0014 Pillar 3, PRIMARY source only: "Regionalstatistische
Daten der Stadtteile Hamburgs", Transparenzportal). Direct conceptual
analogue of Berlin's EWR (ingestion/berlin/ewr/ingest_ewr.py, ADR-0003)
— but at Stadtteil grain (~104-105 areas), not statistisches-Gebiet grain.

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
on.

Source (ADR-0014, Pillar 3, primary): Hamburg Transparenzportal —
  "Regionalstatistische Daten der Stadtteile Hamburgs"
  Portal listing: https://suche.transparenz.hamburg.de/dataset/regionalstatistische-daten-der-stadtteile-hamburgs20
  Licence: dl-de/by-2.0 — attribution: "Statistisches Amt fuer Hamburg
  und Schleswig-Holstein" (ADR-0014 Pillar 3).

Endpoint (CONFIRMED live, 2026-07-01; #125): the original CKAN
dataset-slug download URL 404'd; the live, most-recently-updated CKAN
package is a *different* slug/id
("regionalstatistische-daten-der-stadtteile-hamburgs23",
metadata_modified 2026-04-29) whose `package_show` resources list a
`geodienste.hamburg.de/download?...` redirector URL (not a direct
Transparenzportal-hosted file):
  https://geodienste.hamburg.de/download?url=https://geodienste.hamburg.de/wfs_regionalstatistische_daten_stadtteile&f=csv
This returns a ZIP containing two CSVs (one per CRS: EPSG:4326,
EPSG:25832 — geometry-less, so CRS choice is immaterial; either file's
attribute columns are used) plus a `dialect.json`. This ingestor always
uses the EPSG:4326-suffixed member for determinism.

CSV schema (CONFIRMED via live sample, 2026-07-01; #125): `;`-delimited,
UTF-8 with BOM, **plain `.` decimal points (NOT German-comma decimals,
unlike Berlin's EWR CSVs — do not apply Berlin's comma-parsing logic
here)**. 170 columns; the ones relevant to this slice's indicator set:
  jahr                              -- reference_year
  stadtteil_nr                      -- 3-digit Stadtteil number (e.g.
                                        "101"), NOT the 5-digit Stadtteil-
                                        Schluessel stg_hamburg_geo's
                                        stadtteil layer uses as area_code
                                        (e.g. "02101"). CONFIRMED
                                        crosswalk (#125 item 2's crosswalk
                                        concern, corroborated here for a
                                        second Hamburg pillar): Hamburg's
                                        Land code is "02" and
                                        area_code = "02" + stadtteil_nr
                                        (zero-padding already present in
                                        stadtteil_nr, e.g. "101" not "1").
                                        This ingestor applies that
                                        transform so downstream joins to
                                        stg_hamburg_geo need no further
                                        translation.
  bev_insgesamt                     -- residents_total
  bev_maennlich, bev_weiblich       -- residents_male/female (raw counts;
                                        shares computed here, matching
                                        Berlin EWR's share convention)
  bev_u18_proz                      -- age_under18_share (already a
                                        percentage 0-100 in source; this
                                        ingestor divides by 100 for a
                                        0-1 share, matching Berlin EWR's
                                        share convention)
  bev_ab65_proz                     -- age_65plus_share (same /100 note)
  bev_auslaender_proz               -- foreigners_share (same /100 note)
  arb_arbeitslose_ingesamt_proz     -- unemployment_share (same /100
                                        note; NOTE the source's own
                                        column-name typo "ingesamt" for
                                        "insgesamt", preserved verbatim
                                        as the real header)

This supersedes the original UNCONFIRMED COLUMN_MAP (which guessed
German-comma decimals and different column names entirely, e.g.
"einwohner_insgesamt", "auslaenderanteil" — none of which exist in the
live schema).

Suppression handling: this CSV does not use Berlin-style sentinel/blank
suppression markers for the indicators in this slice's scope (spot-
checked: all sampled rows populate all seven indicator columns) — but
the parser still coerces unparseable/blank cells to NaN (never 0),
mirroring Berlin EWR's suppressed-cell discipline (#57/#58) as a
defensive default in case suppression appears in unsampled rows/years.

No cross-grain, no weighting, no index math: this script only reshapes
one wide CSV (one row per Stadtteil x year) into the wide output schema,
later UNPIVOTed to long format by stg_hamburg_ewr_stadtteil.

Output parquet schema (wide format, one row per Stadtteil x year):
  city_code            (string): 'HH' (ADR-0005)
  area_code            (string): Stadtteil-Schluessel, "02" + stadtteil_nr
                                  (matches stg_hamburg_geo's subarea_l1
                                  area_code, e.g. "02101")
  area_vintage          (string): 'current' (single Stadtteil boundary
                                  edition; Stadtteil boundaries are far
                                  more stable than statistische-Gebiete)
  reference_year        (int): calendar year of the annual release
                                  (jahr; 2013-2024 confirmed live)
  residents_total        (double, nullable)
  residents_male_share   (double, nullable)
  residents_female_share (double, nullable)
  age_under18_share      (double, nullable)
  age_65plus_share       (double, nullable)
  foreigners_share       (double, nullable)
  unemployment_share     (double, nullable)
  is_suppressed_any      (bool): True if any indicator cell was null
                                  after parsing
  source_attribution     (string): dl-de/by-2.0 attribution

Usage:
  uv run python ingestion/hamburg/ewr/ingest_hamburg_ewr_stadtteil.py \\
      --out-dir data/raw/hamburg/ewr_stadtteil \\
      --years 2013-2025

  # Dry run (no HTTP calls):
  uv run python ingestion/hamburg/ewr/ingest_hamburg_ewr_stadtteil.py \\
      --out-dir data/raw/hamburg/ewr_stadtteil --years 2013-2025 --dry-run

  # Override the CSV/ZIP URL:
  uv run python ingestion/hamburg/ewr/ingest_hamburg_ewr_stadtteil.py \\
      --out-dir data/raw/hamburg/ewr_stadtteil --years 2024 \\
      --url-override https://example.com/regionalstatistik_stadtteile.zip

Attribution (mandatory -- dl-de/by-2.0, ADR-0014 Pillar 3):
  "Statistisches Amt fuer Hamburg und Schleswig-Holstein"
  Each output parquet row carries source_attribution; the dbt staging
  model (stg_hamburg_ewr_stadtteil) and the website attribution page
  (Epic G3) must surface this.

Runtime: ~5-10s (single ~11MB ZIP download + in-memory CSV parse,
confirmed live 2026-07-01).
"""

from __future__ import annotations

import argparse
import io
import logging
import ssl
import sys
import urllib.error
import urllib.request
import zipfile
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

# CONFIRMED live 2026-07-01 (#125) via the CKAN package_show API
# (regionalstatistische-daten-der-stadtteile-hamburgs23, the most
# recently modified of the several dataset-id variants).
DEFAULT_ZIP_URL = (
    "https://geodienste.hamburg.de/download?"
    "url=https://geodienste.hamburg.de/wfs_regionalstatistische_daten_stadtteile&f=csv"
)
ZIP_MEMBER_NAME = "de_hh_up_regionalstatistische_daten_stadtteile_EPSG_4326.csv"

# Hamburg's Land code, used to translate the CSV's 3-digit stadtteil_nr
# into stg_hamburg_geo's 5-digit Stadtteil-Schluessel area_code (see
# module docstring crosswalk note).
HAMBURG_LAND_CODE = "02"

# CONFIRMED source column -> canonical indicator name, 2026-07-01 (#125).
# Percent-valued source columns (suffix _proz) are stored 0-100 in the
# source; PERCENT_COLUMNS lists which canonical columns need /100 to
# become a 0-1 share (matching Berlin EWR's share convention).
COLUMN_MAP = {
    "bev_insgesamt": "residents_total",
    "bev_maennlich": "residents_male_count",
    "bev_weiblich": "residents_female_count",
    "bev_u18_proz": "age_under18_share",
    "bev_ab65_proz": "age_65plus_share",
    "bev_auslaender_proz": "foreigners_share",
    "arb_arbeitslose_ingesamt_proz": "unemployment_share",
}
PERCENT_COLUMNS = {
    "age_under18_share",
    "age_65plus_share",
    "foreigners_share",
    "unemployment_share",
}
# residents_male_share / residents_female_share are derived (count / total),
# not read directly from a _proz column (the source has no such column).
INDICATOR_COLUMNS = [
    "residents_total",
    "residents_male_share",
    "residents_female_share",
    "age_under18_share",
    "age_65plus_share",
    "foreigners_share",
    "unemployment_share",
]

STADTTEIL_NR_COL = "stadtteil_nr"
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


def fetch_zip_bytes(url: str, timeout: int = 120) -> bytes:
    """Fetch raw ZIP bytes from a URL. Raises RuntimeError on failure."""
    log.info("Fetching ZIP from: %s", url)
    try:
        with urllib.request.urlopen(url, timeout=timeout, context=_SSL_CONTEXT) as resp:  # noqa: S310
            return resp.read()
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Network error fetching {url}: {exc}") from exc
    except Exception as exc:
        raise RuntimeError(f"Unexpected error fetching {url}: {exc}") from exc


def extract_csv_from_zip(raw_zip: bytes, member_name: str = ZIP_MEMBER_NAME) -> bytes:
    """Extract the target CSV member from the downloaded ZIP.

    Falls back to the first .csv member if the expected name is absent
    (defensive against a filename change upstream), logging a warning.
    """
    zf = zipfile.ZipFile(io.BytesIO(raw_zip))
    names = zf.namelist()
    if member_name in names:
        target = member_name
    else:
        csv_names = [n for n in names if n.lower().endswith(".csv")]
        if not csv_names:
            raise RuntimeError(
                f"No CSV member found in ZIP (members: {names}); expected {member_name!r}."
            )
        target = csv_names[0]
        log.warning(
            "Expected ZIP member %r not found; falling back to %r (members: %s).",
            member_name,
            target,
            names,
        )
    with zf.open(target) as f:
        return f.read()


def parse_stadtteil_csv(raw: bytes, years: Optional[set[int]] = None) -> pd.DataFrame:
    """Parse the raw Regionalstatistische-Daten CSV into the wide output
    schema (one row per Stadtteil x year). Raises RuntimeError if expected
    identifier columns are absent (column-name drift is a known Berlin-EWR
    class of trap per ADR-0014 Pillar 3, cf. #50/#57/#58).
    """
    for encoding in ("utf-8-sig", "latin-1"):
        try:
            df = pd.read_csv(io.BytesIO(raw), sep=";", encoding=encoding, dtype=str)
            break
        except (UnicodeDecodeError, pd.errors.ParserError):
            continue
    else:
        raise RuntimeError("Could not parse Regionalstatistische-Daten CSV with ';' delimiter.")

    df.columns = [c.strip().lower() for c in df.columns]

    if STADTTEIL_NR_COL not in df.columns:
        raise RuntimeError(
            f"Expected identifier column {STADTTEIL_NR_COL!r} not found in CSV "
            f"(columns present: {list(df.columns)[:20]}). The Transparenzportal "
            "schema may have drifted from this ingestor's confirmed COLUMN_MAP "
            "-- re-probe the CKAN resource and update COLUMN_MAP/STADTTEIL_NR_COL."
        )
    if YEAR_COL not in df.columns:
        raise RuntimeError(
            f"Expected year column {YEAR_COL!r} not found in CSV "
            f"(columns present: {list(df.columns)[:20]})."
        )

    out = pd.DataFrame()
    # Crosswalk: 3-digit stadtteil_nr -> 5-digit Stadtteil-Schluessel
    # area_code, matching stg_hamburg_geo (see module docstring).
    out["area_code"] = HAMBURG_LAND_CODE + df[STADTTEIL_NR_COL].astype(str).str.strip()
    out["reference_year"] = pd.to_numeric(df[YEAR_COL], errors="coerce").astype("Int64")

    male = pd.to_numeric(df.get("bev_maennlich"), errors="coerce")
    female = pd.to_numeric(df.get("bev_weiblich"), errors="coerce")
    total = pd.to_numeric(df.get("bev_insgesamt"), errors="coerce")

    present_indicators = []
    out["residents_total"] = total
    present_indicators.append("residents_total")
    out["residents_male_share"] = male / total
    out["residents_female_share"] = female / total
    present_indicators += ["residents_male_share", "residents_female_share"]

    for src_col, canon_col in COLUMN_MAP.items():
        if canon_col in ("residents_total",):
            continue  # already handled above
        if src_col in df.columns:
            vals = pd.to_numeric(df[src_col], errors="coerce")
            if canon_col in PERCENT_COLUMNS:
                vals = vals / 100.0
            out[canon_col] = vals
            present_indicators.append(canon_col)
        else:
            log.warning(
                "Source column %r (-> %r) not present in CSV; filling NULL. "
                "COLUMN_MAP may need updating against the real schema.",
                src_col,
                canon_col,
            )
            out[canon_col] = pd.NA
            present_indicators.append(canon_col)

    out["is_suppressed_any"] = out[present_indicators].isna().any(axis=1)
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
        help="Override the ZIP download URL (default: confirmed live geodienste.hamburg.de redirector).",
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
    url = args.url_override or DEFAULT_ZIP_URL
    years = parse_years_arg(args.years)

    log.info("Attribution: %s", SOURCE_ATTRIBUTION)

    if args.dry_run:
        log.info("[dry-run] Would fetch %s -> %s", url, out_dir / "stadtteile.parquet")
        log.info("[dry-run] Years requested: %s", sorted(years))
        return 0

    try:
        raw_zip = fetch_zip_bytes(url)
        raw_csv = extract_csv_from_zip(raw_zip)
    except RuntimeError as exc:
        log.error("Failed to fetch/extract Regionalstatistische-Daten CSV: %s", exc)
        return 1

    try:
        df = parse_stadtteil_csv(raw_csv, years=years)
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
