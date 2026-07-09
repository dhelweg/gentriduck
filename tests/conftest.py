"""
tests/conftest.py
==================
QA-1 (#176): pytest harness for ingestion/analysis pure functions.

`ingestion/` and `analysis/` are plain scripts (not an installed package -- see
ADR-0001/#177 QA-2 "not a proper package"), so their modules import sibling modules
via a `sys.path` insert pattern at the top of each file (e.g.
`ingestion/berlin/lor/ingest_lor_crosswalk.py` inserts `ingestion/` itself so
`from manifest import ...` resolves). To import these modules directly in tests
without duplicating that per-file sys.path dance, this conftest adds the repo's
`ingestion/` directory to `sys.path` once, at collection time, for the whole test
session.
"""

from __future__ import annotations

import sys
from pathlib import Path

_REPO_ROOT = Path(__file__).resolve().parent.parent
_INGESTION_ROOT = _REPO_ROOT / "ingestion"

for _p in (_REPO_ROOT, _INGESTION_ROOT):
    if str(_p) not in sys.path:
        sys.path.insert(0, str(_p))
