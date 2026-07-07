"""
ingestion/manifest.py
======================
ADR-0016 — shared helper for the ingested-data drift-detection manifest.

Every ingestion script calls `write_manifest_entry(...)` on success to record what
it produced: which files, how many rows, what schema, and at what git/code vintage.
The resulting JSON files live in the committed `ingestion/manifest/` directory (one
file per `source_id`) and are read back by `ingestion/verify_data.py` (`poe
verify-data`) to answer "does *this* machine's ingested data match what the *current*
code expects, and is it the same vintage other instances built from?" — without a
full `dbt build` and without syncing raw bytes (ADR-0016 Decision).

Design notes for reviewers
---------------------------
- **Pure stdlib + the existing `duckdb` dependency.** No new tool/library (per
  CLAUDE.md golden rule #1/#2 — this ADR introduces none).
- **Portable relative paths.** `outputs[].path` is always stored relative to the
  repo root, POSIX-separated (`.as_posix()`), so the manifest diffs identically on
  macOS / Linux / Windows-WSL2 regardless of the OS path separator.
- **`git_sha`** is the repo-wide `git rev-parse HEAD` at write time (best-effort;
  `"unknown"` when git is unavailable, e.g. a tarball checkout with no `.git/`).
  `verify_data.py` does NOT compare this against a live upstream — it checks
  whether the *ingest script's own source file* has any commits between the
  recorded SHA and `HEAD` (`git log <sha>..HEAD -- <path>`), which is the concrete,
  fully-local signal for "your ingestion code moved on since this artefact was
  produced" (ADR-0016 Decision §1).
- **`content_hash`** is a streamed SHA-256 of the output file's bytes. All current
  outputs are small (<10 MB each, ~100 MB total across every source) so this is a
  sub-second operation — safe for `verify-data`'s "seconds, not a build" budget.
  Deterministic across instances *given the same pinned dependency versions* (this
  repo pins `duckdb`/`pyarrow` via `uv.lock`, so instances that ran `uv sync` share
  writer versions).
- **The OSM `.osh.pbf` is never an `outputs[]` entry and is never hashed** (maintainer
  decision, ADR-0016 Status/Resolved decisions) — only its `upstream.vintage` /
  `retrieved_at` are recorded, informationally, on the OSM `source_id`'s entry.
  Drift for OSM is assessed via the extracted yearly *snapshot parquets*, which ARE
  `outputs[]` entries like any other rolling source.
"""

from __future__ import annotations

import hashlib
import json
import logging
import subprocess
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable, Optional, Sequence, Union

import duckdb

log = logging.getLogger("ingestion.manifest")

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

MANIFEST_SCHEMA_VERSION = 1

# Repo root: this file lives at <repo_root>/ingestion/manifest.py.
REPO_ROOT = Path(__file__).resolve().parent.parent
MANIFEST_DIR = REPO_ROOT / "ingestion" / "manifest"

SOURCE_CLASSES = ("pinned", "rolling")

# ADR-0016 Resolved decisions: rolling-historical (non-partial-year) row-count
# tolerance. A delta beyond this is `warn`, never a hard failure, and can never
# move `poe verify-data --strict` to non-zero (rolling sources never gate strict).
# Global default; per-source override may be added to the manifest schema later
# only if a specific source proves noisy (not needed yet).
ROLLING_HIST_TOLERANCE = 0.005  # 0.5%


# ---------------------------------------------------------------------------
# Small helpers
# ---------------------------------------------------------------------------


def _utc_now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def git_sha(repo_root: Path = REPO_ROOT) -> str:
    """Best-effort current repo-wide git SHA. Returns 'unknown' if git/.git is unavailable."""
    try:
        result = subprocess.run(
            ["git", "rev-parse", "HEAD"],
            cwd=repo_root,
            capture_output=True,
            text=True,
            timeout=5,
            check=True,
        )
        return result.stdout.strip()
    except Exception:  # noqa: BLE001 — best-effort; never block ingestion on this
        return "unknown"


def module_to_relpath(module: str) -> str:
    """Convert a dotted module path (as stored in ingest_script.module) to the
    repo-relative .py file path it names, e.g.
    'ingestion.berlin.lor.ingest_lor_geometries' -> 'ingestion/berlin/lor/ingest_lor_geometries.py'.
    """
    return module.replace(".", "/") + ".py"


def content_hash(path: Path, chunk_size: int = 1 << 20) -> str:
    """Streamed SHA-256 of a file's bytes (never called on the OSM .osh.pbf — see module docstring)."""
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(chunk_size), b""):
            h.update(chunk)
    return "sha256:" + h.hexdigest()


def describe_file(path: Path) -> tuple[int, str]:
    """Return (row_count, schema_fingerprint) for a parquet/CSV file via DuckDB.

    schema_fingerprint is sha256 of the ordered (column_name, column_type) pairs
    as reported by DuckDB's DESCRIBE — catches added/renamed/retyped columns
    (the #134-adjacent 'seed-shape drift' incident ADR-0016 documents).
    """
    reader = "read_csv_auto" if path.suffix.lower() == ".csv" else "read_parquet"
    con = duckdb.connect(":memory:")
    try:
        rows = con.execute(f"DESCRIBE SELECT * FROM {reader}(?)", [str(path)]).fetchall()
        schema_pairs = [[r[0], r[1]] for r in rows]
        schema_fingerprint = (
            "sha256:"
            + hashlib.sha256(
                json.dumps(schema_pairs, ensure_ascii=True).encode("utf-8")
            ).hexdigest()
        )
        (row_count,) = con.execute(f"SELECT COUNT(*) FROM {reader}(?)", [str(path)]).fetchone()
    finally:
        con.close()
    return int(row_count), schema_fingerprint


def existing_outputs(out_dir: Union[str, Path], patterns: Sequence[str]) -> list[Path]:
    """Return the subset of out_dir/<pattern> paths that currently exist on disk.

    Convenience for ingest scripts: pass the filenames/globs the script is known to
    produce (e.g. ["pre2021_plr.parquet", "lor_2021_plr.parquet"]) and get back
    only the ones actually present — so a manifest write reflects *current* local
    reality even when a run only refreshed a subset (e.g. one EWR year).
    """
    out_dir = Path(out_dir)
    found: list[Path] = []
    for pattern in patterns:
        if any(ch in pattern for ch in "*?["):
            found.extend(sorted(out_dir.glob(pattern)))
        else:
            candidate = out_dir / pattern
            if candidate.exists():
                found.append(candidate)
    return found


# ---------------------------------------------------------------------------
# write_manifest_entry / load_manifest
# ---------------------------------------------------------------------------


def write_manifest_entry(
    *,
    source_id: str,
    source_class: str,
    city: str,
    upstream_url: str,
    upstream_vintage: str,
    output_paths: Iterable[Union[str, Path]],
    ingest_script_module: str,
    retrieved_at: Optional[str] = None,
    repo_root: Path = REPO_ROOT,
    manifest_dir: Path = MANIFEST_DIR,
) -> Path:
    """Write/overwrite the committed manifest entry for one source_id.

    Called by each `ingestion/**/ingest_*.py` on success (ADR-0016 phased plan
    step 2). `output_paths` should be every artefact this source currently has on
    disk (see `existing_outputs`) — not just the ones touched by this particular
    run — so the manifest always reflects current local reality.

    Paths that do not exist are skipped with a warning (never raises) so a
    partially-successful run can still record what it did produce.
    """
    if source_class not in SOURCE_CLASSES:
        raise ValueError(f"source_class must be one of {SOURCE_CLASSES}, got {source_class!r}")

    manifest_dir.mkdir(parents=True, exist_ok=True)
    retrieved_at = retrieved_at or _utc_now_iso()

    outputs: list[dict] = []
    for raw_path in output_paths:
        path = Path(raw_path).resolve()
        if not path.exists():
            log.warning("write_manifest_entry(%s): skipping missing output %s", source_id, path)
            continue
        row_count, schema_fingerprint = describe_file(path)
        outputs.append(
            {
                "path": path.relative_to(repo_root).as_posix(),
                "row_count": row_count,
                "schema_fingerprint": schema_fingerprint,
                "content_hash": content_hash(path),
            }
        )

    entry = {
        "source_id": source_id,
        "source_class": source_class,
        "city": city,
        "upstream": {
            "url": upstream_url,
            "vintage": upstream_vintage,
            "retrieved_at": retrieved_at,
        },
        "outputs": outputs,
        "ingest_script": {
            "module": ingest_script_module,
            "git_sha": git_sha(repo_root),
        },
        "manifest_schema_version": MANIFEST_SCHEMA_VERSION,
    }

    out_path = manifest_dir / f"{source_id}.json"
    with out_path.open("w", encoding="utf-8") as f:
        json.dump(entry, f, indent=2, sort_keys=False)
        f.write("\n")

    log.info(
        "Wrote manifest entry %s (%s, %d output(s)) -> %s",
        source_id,
        source_class,
        len(outputs),
        out_path,
    )
    return out_path


def load_manifest(manifest_dir: Path = MANIFEST_DIR) -> dict[str, dict]:
    """Load every committed manifest entry, keyed by source_id."""
    entries: dict[str, dict] = {}
    if not manifest_dir.exists():
        return entries
    for path in sorted(manifest_dir.glob("*.json")):
        with path.open("r", encoding="utf-8") as f:
            entry = json.load(f)
        entries[entry.get("source_id", path.stem)] = entry
    return entries


@dataclass(frozen=True)
class ManifestEntry:
    """Typed convenience view over a raw manifest dict (optional; load_manifest()
    returns plain dicts, which is all write_manifest_entry/verify_data need)."""

    source_id: str
    source_class: str
    city: str
    upstream: dict
    outputs: list
    ingest_script: dict
    manifest_schema_version: int

    @classmethod
    def from_dict(cls, d: dict) -> "ManifestEntry":
        return cls(
            source_id=d["source_id"],
            source_class=d["source_class"],
            city=d["city"],
            upstream=d["upstream"],
            outputs=d["outputs"],
            ingest_script=d["ingest_script"],
            manifest_schema_version=d["manifest_schema_version"],
        )
