"""
ingestion/common/
=================
QA-2 (#177) — shared, stdlib-only ingestion utilities.

This package factors out the pieces of the 18 ingest scripts that were
independently duplicated (SSL context construction, retrying HTTP GET,
GeoJSON fetch/validate, atomic Parquet writes) so new/edited scripts have
one place to get retry+backoff and atomic-write correctness for free.

Scope note (QA-2 first slice): this initial cut ships `http.py` (SSL
context, bounded retry+backoff, `fetch_bytes`/`fetch_json`/`fetch_geojson`)
and `io.py` (`atomic_write_parquet`), and migrates two representative
scripts (`ingest_lor_geometries.py`, `ingest_hamburg_geo.py`) as a proof
of concept. Migrating the remaining ~12 scripts, unifying the source
registry, and hardening `verify_data.py`'s manifest-load validation are
tracked as a follow-up (see the QA-2 issue thread) rather than attempted
in one pass, per CLAUDE.md's "prefer right-sized, safely-verifiable work"
guidance — live-network fetch behaviour across 18 scripts can't be safely
regression-tested without live upstream access in one sitting.

Pure stdlib + the existing `certifi`/`pyarrow` deps already in
pyproject.toml. No new tool/library (golden rule #1/#2 — untouched).

Import convention: scripts under ingestion/<city>/<domain>/ insert the
`ingestion/` root onto sys.path (matching the existing `manifest.py`
convention) and then do `from common.http import fetch_geojson` /
`from common.io import atomic_write_parquet` (this package uses relative
imports internally so it works the same whether imported as top-level
`common` or as `ingestion.common`).
"""

from __future__ import annotations

from .http import (
    FetchError,
    build_ssl_context,
    fetch_bytes,
    fetch_geojson,
    fetch_json,
)
from .io import atomic_write_parquet

__all__ = [
    "FetchError",
    "build_ssl_context",
    "fetch_bytes",
    "fetch_geojson",
    "fetch_json",
    "atomic_write_parquet",
]
