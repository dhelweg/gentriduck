"""
ingestion/common/io.py
========================
QA-2 (#177) — shared atomic-Parquet-write helper.

Factors out the tmp-path + rename pattern that only `ingest_kauffaelle.py`
and `ingest_wohnlage.py` used previously (the QA-2 issue's "non-atomic
parquet writes in ~40 call sites" finding) — a crash mid-write must never
leave a corrupt/partial artefact where dbt (or `verify_data.py`) expects
a complete one.
"""

from __future__ import annotations

import logging
from pathlib import Path

import pyarrow as pa
import pyarrow.parquet as pq

log = logging.getLogger(__name__)


def atomic_write_parquet(
    table: pa.Table,
    out_path: Path,
    *,
    compression: str = "snappy",
) -> None:
    """Write `table` to `out_path` atomically.

    Writes to a sibling `<out_path>.tmp.parquet` first, then renames it
    onto `out_path` only after the write succeeds — dbt/`verify_data.py`
    never observe a partial file. On any write failure the tmp file is
    removed and the exception re-raised; `out_path` is left untouched.
    """
    out_path.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = out_path.with_suffix(".tmp.parquet")
    try:
        pq.write_table(table, tmp_path, compression=compression)
    except Exception:
        tmp_path.unlink(missing_ok=True)
        raise
    tmp_path.replace(out_path)
    log.info("Wrote %d rows to %s", table.num_rows, out_path)
