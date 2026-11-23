"""
transform/export_serving_parquet.py
====================================
F2 (#34) — export the published dbt marts to parquet for later web consumption.

ADR-0012 decision 1: the public site is a static export — dbt marts -> parquet, bundled
into the web build and queried client-side via DuckDB-WASM. No live database on the
serving path. This script produces that parquet snapshot from the local warehouse
(`data/gentriduck.duckdb`, built by `uv run poe build`); G0/G1 (not yet built) will be
the first consumers.

Exports every table in the dbt `marts` layer (transform/models/marts/*.sql, materialized
as tables per transform/dbt_project.yml) to data/serving/<model>.parquet. data/serving/
is gitignored — rebuilt from the warehouse, not committed.

Usage:
  uv run poe build            # populate data/gentriduck.duckdb first
  uv run python transform/export_serving_parquet.py
"""

from __future__ import annotations

import logging
import sys
from pathlib import Path

import duckdb

REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from ops.build_provenance import (  # noqa: E402 -- after the sys.path insert above
    SERVING_STAMP_REL,
    WAREHOUSE_SOURCE_REL,
    clear_export_stamp,
    read_json,
    write_export_stamp,
)

logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)

DUCKDB_PATH = REPO_ROOT / "data" / "gentriduck.duckdb"
MARTS_DIR = REPO_ROOT / "transform" / "models" / "marts"
OUT_DIR = REPO_ROOT / "data" / "serving"

MART_MODELS = sorted(p.stem for p in MARTS_DIR.glob("*.sql"))


def main() -> None:
    if not DUCKDB_PATH.exists():
        raise SystemExit(f"{DUCKDB_PATH} not found — run `uv run poe build` first.")
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    # #361: export stamp. Remove it first (an interrupted export leaves none), then record which
    # warehouse (data/.warehouse-source, written by `poe build`) the parquet came from.
    clear_export_stamp(REPO_ROOT, SERVING_STAMP_REL)
    warehouse = read_json(REPO_ROOT / WAREHOUSE_SOURCE_REL)

    con = duckdb.connect(str(DUCKDB_PATH), read_only=True)
    for model in MART_MODELS:
        out_path = OUT_DIR / f"{model}.parquet"
        con.execute(f"COPY (SELECT * FROM main.{model}) TO '{out_path}' (FORMAT PARQUET)")
        logger.info("exported %s -> %s", model, out_path.relative_to(REPO_ROOT))
    con.close()

    write_export_stamp(REPO_ROOT, SERVING_STAMP_REL, warehouse, source=WAREHOUSE_SOURCE_REL)
    logger.info(
        "export stamp -> %s (warehouse tree %s)",
        SERVING_STAMP_REL,
        str((warehouse or {}).get("tree"))[:12],
    )


if __name__ == "__main__":
    main()
