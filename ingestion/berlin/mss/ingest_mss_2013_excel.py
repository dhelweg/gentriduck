"""ingest_mss_2013_excel.py — fallback ingestion for MSS 2013.

The MSS 2013 WFS endpoint (https://gdi.berlin.de/services/wfs/mss_2013)
returns HTTP 404.  This script downloads the official Senate Excel table
and produces data/raw/berlin/mss/mss_2013.parquet with the same schema
as the WFS-based editions (ingest_mss.py).

Source: Senatsverwaltung für Stadtentwicklung und Umwelt Berlin
  — Monitoring Soziale Stadtentwicklung 2013
  — Tabelle 1: Gesamtindex Soziale Ungleichheit, Planungsräume
  URL: https://www.berlin.de/sen/stadt/_assets/stadtdaten/stadtwissen/
       monitoring-soziale-stadtentwicklung/bericht-2013/1-sdi_mss2013.xlsx
  Licence: dl-de-zero-2.0 (same as WFS editions, ADR-0006)

Schema produced (matches mss_<YEAR>.parquet from ingest_mss.py):
  edition            int32       2013
  plr_id             string      8-digit LOR PLR code
  plr_name           string      PLR name
  lor_vintage        string      'lor_pre2021'
  status_index       int32       1=hoch … 4=sehr_niedrig; null if uninhabited
  dynamik_index      int32       1=positiv 2=stabil 3=negativ; null if uninhabited
  gesamtindex        int32       status*10 + di_n (di_n: 1/3/5); null if uninhabited
  source_attribution string

Run:
  uv run python ingestion/berlin/mss/ingest_mss_2013_excel.py \\
      --out-dir data/raw/berlin/mss
"""

from __future__ import annotations

import argparse
import logging
import ssl
import sys
import urllib.error
import urllib.request
from io import BytesIO
from pathlib import Path

import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq

log = logging.getLogger("mss_2013_excel")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)

EXCEL_URL = (
    "https://www.berlin.de/sen/stadt/_assets/stadtdaten/stadtwissen/"
    "monitoring-soziale-stadtentwicklung/bericht-2013/1-sdi_mss2013.xlsx"
)
SHEET_NAME = "1.SDI_MSS2013"
EDITION = 2013
LOR_VINTAGE = "lor_pre2021"
SOURCE = (
    "Senatsverwaltung für Stadtentwicklung und Umwelt Berlin"
    " — Monitoring Soziale Stadtentwicklung 2013"
    " — Tabelle 1 (Excel, dl-de-zero-2.0)"
    f" — {EXCEL_URL}"
)

# Row index (0-based) where PLR data starts in the sheet (rows 0-4 are headers).
DATA_START_ROW = 5

# Column positions in the raw sheet.
COL_PLR_ID = 0
COL_PLR_NAME = 1
COL_STATUS = 3    # numeric: 1-4; 0 = uninhabited
COL_DYNAMIK_RAW = 5  # symbol: '+', '+/-', '-'; 0 = uninhabited

# Map raw dynamik symbols → WFS di_n codes (to keep gesamtindex formula consistent).
DYNAMIK_SYMBOL_TO_DI_N: dict[str, int] = {
    "+": 1,
    "+/-": 3,
    "-": 5,
}
# Map di_n → normalised dynamik_index (matches ingest_mss.py).
DI_N_TO_DYNAMIK_INDEX: dict[int, int] = {1: 1, 3: 2, 5: 3}

PARQUET_SCHEMA = pa.schema(
    [
        pa.field("edition", pa.int32()),
        pa.field("plr_id", pa.string()),
        pa.field("plr_name", pa.string()),
        pa.field("lor_vintage", pa.string()),
        pa.field("status_index", pa.int32()),
        pa.field("dynamik_index", pa.int32()),
        pa.field("gesamtindex", pa.int32()),
        pa.field("source_attribution", pa.string()),
    ]
)


def _fetch_excel(url: str) -> bytes:
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 Gentriduck/1.0"})
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=60) as resp:
            return resp.read()
    except urllib.error.HTTPError as exc:
        raise RuntimeError(f"HTTP {exc.code} fetching {url}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Network error fetching {url}: {exc}") from exc


def _parse_excel(raw: bytes) -> pd.DataFrame:
    df_raw = pd.read_excel(BytesIO(raw), sheet_name=SHEET_NAME, header=None)
    data = df_raw.iloc[DATA_START_ROW:].reset_index(drop=True)

    rows: list[dict] = []
    for _, row in data.iterrows():
        plr_id = str(row.iloc[COL_PLR_ID]).strip().zfill(8)
        plr_name = str(row.iloc[COL_PLR_NAME]).strip()

        raw_status = row.iloc[COL_STATUS]
        raw_dynamik = str(row.iloc[COL_DYNAMIK_RAW]).strip()

        # Uninhabited PLR: status=0 or NaN.
        try:
            status_val = int(raw_status)
        except (ValueError, TypeError):
            status_val = 0

        if status_val == 0 or raw_dynamik in ("0", "nan", ""):
            rows.append(
                {
                    "edition": EDITION,
                    "plr_id": plr_id,
                    "plr_name": plr_name,
                    "lor_vintage": LOR_VINTAGE,
                    "status_index": None,
                    "dynamik_index": None,
                    "gesamtindex": None,
                    "source_attribution": SOURCE,
                }
            )
            continue

        di_n = DYNAMIK_SYMBOL_TO_DI_N.get(raw_dynamik)
        if di_n is None:
            log.warning("Unknown dynamik symbol %r for PLR %s — treating as uninhabited", raw_dynamik, plr_id)
            rows.append(
                {
                    "edition": EDITION,
                    "plr_id": plr_id,
                    "plr_name": plr_name,
                    "lor_vintage": LOR_VINTAGE,
                    "status_index": None,
                    "dynamik_index": None,
                    "gesamtindex": None,
                    "source_attribution": SOURCE,
                }
            )
            continue

        dynamik_index = DI_N_TO_DYNAMIK_INDEX[di_n]
        gesamtindex = status_val * 10 + di_n

        rows.append(
            {
                "edition": EDITION,
                "plr_id": plr_id,
                "plr_name": plr_name,
                "lor_vintage": LOR_VINTAGE,
                "status_index": status_val,
                "dynamik_index": dynamik_index,
                "gesamtindex": gesamtindex,
                "source_attribution": SOURCE,
            }
        )

    return pd.DataFrame(rows)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--out-dir", default="data/raw/berlin/mss", help="Output directory for parquet file")
    ap.add_argument("--local-file", help="Use a local Excel file instead of fetching from URL")
    args = ap.parse_args()

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "mss_2013.parquet"

    if args.local_file:
        log.info("Reading local Excel file: %s", args.local_file)
        raw = Path(args.local_file).read_bytes()
    else:
        log.info("Fetching MSS 2013 Excel from %s", EXCEL_URL)
        raw = _fetch_excel(EXCEL_URL)
        log.info("Downloaded %d bytes", len(raw))

    df = _parse_excel(raw)
    log.info("Parsed %d PLR rows (%d inhabited)", len(df), df["status_index"].notna().sum())

    inhabited = df["status_index"].notna().sum()
    uninhabited = df["status_index"].isna().sum()
    if not (440 <= len(df) <= 455):
        log.error("Unexpected PLR count: %d (expected ~447)", len(df))
        return 1
    log.info("PLR count OK: %d total, %d inhabited, %d uninhabited", len(df), inhabited, uninhabited)

    table = pa.Table.from_pandas(df, schema=PARQUET_SCHEMA, preserve_index=False)
    pq.write_table(table, out_path, compression="snappy")
    log.info("Written: %s (%d rows)", out_path, len(df))
    return 0


if __name__ == "__main__":
    sys.exit(main())
