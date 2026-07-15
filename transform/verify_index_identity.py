"""
transform/verify_index_identity.py
===================================
Leakage-guard-style identity check for display-only changes touching a model
upstream of the R-C1 gated index chain (ADR-0011 / CLAUDE.md "Methodology
gate"). First written for I20 slice 1 (#252): threading a new, nullable
`cuisine` secondary tag through stg_osm_poi -> int_osm_poi_harmonized ->
int_osm_poi_plr, which sits upstream of gentrification_index /
int_poi_status_dynamism via fct_poi_development -> int_poi_features_pivot ->
int_poi_share_base(_2021) -> int_poi_status_dynamism -> int_gentrification_ts
-> gentrification_index. Reusable for any future ticket that needs to prove
"I only added a column / a display-only model, the gated index math didn't
move."

WHY a script, not a dbt test:
There is no single dbt run in which a "before" and "after" build both exist
at once, so this comparison is inherently a two-build, human/reviewer-invoked
check -- not something `uv run poe build` can assert on its own. This script
is the reusable tool; the actual before/after comparison is a manual step
(see below), whose result belongs in the PR/commit message, not in a
permanently pinned hash (the gated tables are rebuilt from rolling sources
and legitimately change over time -- a hardcoded golden hash would go stale
for reasons unrelated to methodology and create false-positive drift alarms).

Usage:
    # After building "before" state (e.g. a git worktree at the pre-change
    # commit, pointed at the same data/raw/ so no re-ingestion is needed):
    uv run python transform/verify_index_identity.py --db <before.duckdb> --label before

    # After building "after" state (this branch, `uv run poe build`):
    uv run python transform/verify_index_identity.py --db data/gentriduck.duckdb --label after

    # Compare the two JSON outputs (e.g. `diff before.json after.json`, or
    # just eyeball the printed content_hash / row_count per table -- identical
    # values for both = proof of zero drift).

Method: for each gated table, pull every row (ordered by every column, so row
order never affects the hash), render it as a CSV byte string via DuckDB's own
`to_csv`-equivalent (pandas.DataFrame.to_csv, deterministic formatting), and
md5 the result. Row count is reported alongside as a cheap sanity cross-check
(a hash collision with a different row count would be a red flag, not a pass).
"""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path

import duckdb

# The two R-C1 gated models this check exists to protect (CLAUDE.md
# "Methodology gate" file list). Both are read here as materialized DuckDB
# tables/views already built by `uv run poe build` into the target .duckdb.
GATED_TABLES = [
    "int_poi_status_dynamism",
    "gentrification_index",
]


def content_hash(con: duckdb.DuckDBPyConnection, table: str) -> tuple[int, str]:
    """Return (row_count, md5 content hash) for `table`, order-independent.

    Ordering by every column (not just a primary key) means two tables with
    the same multiset of rows hash identically regardless of physical/scan
    order -- exactly the invariant a "did anything actually change" check
    needs.
    """
    columns = [
        r[0]
        for r in con.execute(
            "select column_name from information_schema.columns "
            "where table_name = ? order by ordinal_position",
            [table],
        ).fetchall()
    ]
    if not columns:
        raise SystemExit(f"Table '{table}' not found (or has no columns) in this database.")
    order_by = ", ".join(f'"{c}"' for c in columns)
    df = con.execute(f'select * from "{table}" order by {order_by}').fetchdf()
    # Deterministic byte representation: fixed CSV formatting, NaN/None as a
    # literal sentinel (pandas' default "" would make NULL and empty-string
    # collide, which matters for the varchar columns in these two tables).
    csv_bytes = df.to_csv(index=False, na_rep="<<NULL>>").encode("utf-8")
    return len(df), hashlib.md5(csv_bytes).hexdigest()  # noqa: S324 -- non-crypto content fingerprint


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--db", required=True, type=Path, help="Path to the built .duckdb file.")
    parser.add_argument(
        "--label", default="build", help="Free-text label for this run (e.g. 'before'/'after')."
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=None,
        help="Optional path to write the result as JSON (default: print only).",
    )
    args = parser.parse_args(argv)

    if not args.db.exists():
        print(f"ERROR: database not found: {args.db}", file=sys.stderr)
        return 1

    # Neither gated table has spatial/geometry columns, so no extension load
    # is needed here (unlike the profiles.yml dev target used by dbt itself).
    con = duckdb.connect(str(args.db), read_only=True)

    result: dict[str, dict] = {"label": args.label, "db": str(args.db), "tables": {}}
    for table in GATED_TABLES:
        n, h = content_hash(con, table)
        result["tables"][table] = {"row_count": n, "content_hash": h}
        print(f"[{args.label}] {table}: row_count={n} content_hash={h}")

    if args.out:
        args.out.write_text(json.dumps(result, indent=2) + "\n")
        print(f"Wrote {args.out}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
