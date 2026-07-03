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
from pathlib import Path

import duckdb

logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)

REPO_ROOT = Path(__file__).resolve().parent.parent
DUCKDB_PATH = REPO_ROOT / "data" / "gentriduck.duckdb"
MARTS_DIR = REPO_ROOT / "transform" / "models" / "marts"
OUT_DIR = REPO_ROOT / "data" / "serving"

MART_MODELS = sorted(p.stem for p in MARTS_DIR.glob("*.sql"))


def main() -> None:
    if not DUCKDB_PATH.exists():
        raise SystemExit(f"{DUCKDB_PATH} not found — run `uv run poe build` first.")
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    con = duckdb.connect(str(DUCKDB_PATH), read_only=True)
    for model in MART_MODELS:
        out_path = OUT_DIR / f"{model}.parquet"
        con.execute(f"COPY (SELECT * FROM main.{model}) TO '{out_path}' (FORMAT PARQUET)")
        logger.info("exported %s -> %s", model, out_path.relative_to(REPO_ROOT))
    con.close()


if __name__ == "__main__":
    main()
