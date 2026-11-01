"""ops/build_provenance.py -- #361: shared provenance helpers for the release close-out.

Used by ops/release_deploy.py (`poe release-deploy`) and ops/dbt_build.py (`poe build`). Stdlib
only. Two kinds of provenance decide whether an existing `web/build` can be deployed for a release
without a rebuild:

1. **Committed code**: the git tree hash (`HEAD^{tree}`) plus a clean-working-tree flag.
2. **Gitignored inputs** that the tree hash can't see:
   - `inputs_fingerprint()`: sha256 over the bundled serving data (`data/serving/*.parquet`), the
     map GeoJSON (`web/static/geo/**`) and the effective GoatCounter code. The build records it
     in `web/build/.build-source`; the skip path recomputes it.
   - `data/.warehouse-source`: written by `poe build` (ops/dbt_build.py). It records the tree the
     local warehouse was built from, so a rebuild can't export marts built from other code.
   - export stamps (`data/serving/.export-source`, `data/.geo-export-source`): written by the
     export scripts, recording which warehouse their output came from. The build embeds them;
     the skip path checks them.

`inputs_fingerprint()` and `relevant_dirty()` are mirrored in
web/scripts/postbuild-build-source.mjs. Keep the two in sync;
tests/ops/test_release_deploy.py checks that both produce the same fingerprint.
"""

from __future__ import annotations

import hashlib
import json
import os
import subprocess
from datetime import datetime, timezone
from pathlib import Path

BUILD_SOURCE_NAME = ".build-source"
WAREHOUSE_SOURCE_REL = "data/.warehouse-source"

# Paths that change during a normal build/release without affecting any output.
#   ops/web-build-timings.log -- appended by ops/time_web_build.py after each `poe web-build`.
IGNORED_DIRTY_PATHS = frozenset({"ops/web-build-timings.log"})

# Web build: any tracked edit counts; untracked files count only under web/ (Evidence picks up
# every page there). Warehouse (dbt) build: only transform/ (models, seeds, macros) counts.
WEB_DIRTY_RULE = {"tracked_prefixes": None, "untracked_prefixes": ("web/",)}
WAREHOUSE_DIRTY_RULE = {"tracked_prefixes": ("transform/",), "untracked_prefixes": ("transform/",)}


class ProvenanceError(Exception):
    """A git call or provenance precondition failed."""


def git(repo: Path, *args: str, strip: bool = True) -> str:
    result = subprocess.run(  # noqa: S603 -- fixed git argv, no untrusted input
        ["git", *args],  # noqa: S607 -- git resolved from PATH, as everywhere in ops/
        cwd=repo,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",  # non-UTF-8 paths or messages must not crash provenance
    )
    if result.returncode != 0:
        raise ProvenanceError(f"git {' '.join(args)} failed: {result.stderr.strip()}")
    # Porcelain status lines start with a significant space (" M path"); don't strip those.
    return result.stdout.strip() if strip else result.stdout


def relevant_dirty(
    porcelain_lines: list[str],
    *,
    tracked_prefixes: tuple[str, ...] | None = None,
    untracked_prefixes: tuple[str, ...] = ("web/",),
) -> list[str]:
    """Filter `git status --porcelain --untracked-files=all` lines to those that can change an
    output. Tracked changes count if `tracked_prefixes` is None or the path starts with one of
    them; untracked (`??`) files count only under `untracked_prefixes`. IGNORED_DIRTY_PATHS never
    count. Gitignored paths (`data/`, `web/build/`, ...) never appear in porcelain output.
    """
    out = []
    for line in porcelain_lines:
        if len(line) < 4:
            continue
        status, path = line[:2], line[3:].strip().strip('"')
        if " -> " in path:  # rename: "old -> new"; the new path is what's in the tree
            path = path.split(" -> ", 1)[1].strip('"')
        if path in IGNORED_DIRTY_PATHS:
            continue
        if status == "??":
            if not path.startswith(untracked_prefixes):
                continue
        elif tracked_prefixes is not None and not path.startswith(tracked_prefixes):
            continue
        out.append(line)
    return out


def dirty_lines(repo: Path, rule: dict) -> list[str]:
    status = git(repo, "status", "--porcelain", "--untracked-files=all", strip=False)
    return relevant_dirty(status.splitlines(), **rule)


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


# --------------------------------------------------------------------------- inputs fingerprint


def goatcounter_code(repo: Path, env: dict | None = None) -> str:
    """The code postbuild-analytics.mjs injects: GOATCOUNTER_CODE if set and non-empty, else the
    committed web/goatcounter-code.txt, else ""."""
    env = os.environ if env is None else env
    if env.get("GOATCOUNTER_CODE"):
        return env["GOATCOUNTER_CODE"].strip()
    try:
        return (repo / "web" / "goatcounter-code.txt").read_text(encoding="utf-8").strip()
    except OSError:
        return ""


def input_files(repo: Path) -> list[tuple[str, Path]]:
    """(repo-relative posix path, path) for every gitignored build input, sorted by path."""
    files = []
    serving = repo / "data" / "serving"
    if serving.is_dir():
        files += [p for p in serving.glob("*.parquet") if p.is_file()]
    geo = repo / "web" / "static" / "geo"
    if geo.is_dir():
        files += [p for p in geo.rglob("*") if p.is_file()]
    pairs = [(p.relative_to(repo).as_posix(), p) for p in files]
    return sorted(pairs, key=lambda t: t[0])


def inputs_fingerprint(repo: Path, env: dict | None = None) -> str:
    """sha256 over the sorted (path, size, bytes) of every input file, then the GoatCounter code.

    Byte stream (mirrored exactly in postbuild-build-source.mjs):
        for each file:  b"file\\0" + path + b"\\0" + str(size) + b"\\0" + <file bytes>
        then:           b"goatcounter\\0" + code + b"\\0"
    """
    h = hashlib.sha256()
    for rel, path in input_files(repo):
        size = path.stat().st_size
        h.update(b"file\0" + rel.encode("utf-8") + b"\0" + str(size).encode() + b"\0")
        with open(path, "rb") as f:
            for chunk in iter(lambda: f.read(1 << 20), b""):
                h.update(chunk)
    h.update(b"goatcounter\0" + goatcounter_code(repo, env).encode("utf-8") + b"\0")
    return h.hexdigest()


# --------------------------------------------------------------------------- warehouse sidecar


def read_json(path: Path) -> dict | None:
    """Parse a JSON-object sidecar. Missing or malformed -> None (never trusted)."""
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None
    return data if isinstance(data, dict) else None


def warehouse_problem(record: dict | None, main_tree: str) -> str | None:
    """None if the warehouse record proves a complete, clean `poe build` from `main_tree`."""
    if not record:
        return f"no {WAREHOUSE_SOURCE_REL} (the warehouse predates #361 or was never built here)"
    tree = record.get("tree")
    if not record.get("complete"):
        reason = record.get("reason") or "incomplete build"
        return f"{WAREHOUSE_SOURCE_REL} says the last build was not a complete one ({reason})"
    if not record.get("clean"):
        return (
            f"{WAREHOUSE_SOURCE_REL} says the warehouse was built with uncommitted transform/ edits"
        )
    if tree != main_tree:
        return f"warehouse built from tree {str(tree)[:12]}, but origin/main's tree is {main_tree[:12]}"
    return None


# dbt build args that keep the run a build of the warehouse as the default target, from this tree:
#   FULL_ARGS change only speed/strictness; SELECTION_ARGS build a subset (a "partial" build).
# Anything else (--vars, --target, --defer, --state, ...) changes what gets built or where, so it
# voids the certificate. Value-taking flags may be given as `--flag value...` or `--flag=value`.
FULL_FLAGS = frozenset({"--full-refresh", "--fail-fast"})
FULL_VALUE_FLAGS = frozenset({"--threads"})
SELECTION_VALUE_FLAGS = frozenset({"--select", "-s", "--models", "-m", "--exclude"})


def classify_dbt_args(args: list[str]) -> str:
    """'full', 'partial' or 'void' for the extra args passed to `poe build`."""
    kind = "full"
    takes_values = False  # the previous flag accepts the following non-flag tokens
    for arg in args:
        if not arg.startswith("-"):
            if not takes_values:
                return "void"  # a stray positional we don't understand
            continue
        flag, has_inline_value, _ = arg.partition("=")
        if flag in SELECTION_VALUE_FLAGS:
            kind = "partial"
            takes_values = not has_inline_value
        elif flag in FULL_VALUE_FLAGS:
            takes_values = not has_inline_value
        elif flag in FULL_FLAGS and not has_inline_value:
            takes_values = False
        else:
            return "void"
    return kind


def in_progress_record(*, tree: str, commit: str, clean: bool, now: str) -> dict:
    """Written BEFORE dbt starts, so an interrupted/killed build never leaves a valid certificate."""
    return {
        "tree": tree,
        "commit": commit,
        "clean": clean,
        "recorded_at": now,
        "complete": False,
        "reason": "dbt build in progress",
    }


def next_warehouse_record(
    existing: dict | None,
    *,
    tree: str,
    commit: str,
    clean: bool,
    returncode: int,
    kind: str,
    now: str,
) -> dict:
    """What `poe build` writes to data/.warehouse-source once dbt has finished.

    `existing` is the record as it was BEFORE this run (not the in-progress marker).
    - A successful 'full' build (see classify_dbt_args) certifies the warehouse.
    - A successful 'partial' build (--select/--exclude) of the same clean tree that the existing
      certificate is for keeps that certificate (it is returned unchanged).
    - Anything else (failed, 'void' args, partial build of another or unclean tree) writes
      `complete: false`, so a release rebuild refuses until a full `poe build`.
    """
    base = {"tree": tree, "commit": commit, "clean": clean, "recorded_at": now}
    if returncode == 0 and kind == "full":
        return {**base, "complete": True}
    if (
        returncode == 0
        and kind == "partial"
        and clean
        and existing
        and existing.get("complete")
        and existing.get("clean")
        and existing.get("tree") == tree
    ):
        return existing
    if returncode:
        reason = f"dbt build exited {returncode}"
    elif kind == "void":
        reason = "dbt build with args that change what or where it builds"
    else:
        reason = "partial dbt build"
    return {**base, "complete": False, "reason": reason}


# --------------------------------------------------------------------------- export stamps
#
# The serving parquet and the map GeoJSON are exported from the warehouse (GeoJSON via the
# parquet). Each export writes a stamp recording the warehouse record its output came from, so the
# skip path can check what `web/build` was really built from, independent of whatever the
# warehouse record says now (an unrelated later `poe build`, e.g. the pre-push hook, must not
# matter if the exported data didn't change).
#   data/serving/.export-source  <- copy of data/.warehouse-source at export-serving time
#   data/.geo-export-source      <- the serving stamp's warehouse at export-area-geojson time.
#     It sits outside web/static/geo/ so it isn't bundled into (and published with) the site and
#     doesn't enter the inputs fingerprint.
# Each export deletes its stamp first, so an interrupted export leaves no stamp (-> rebuild).

SERVING_STAMP_REL = "data/serving/.export-source"
GEO_STAMP_REL = "data/.geo-export-source"
EXPORT_STAMPS = {"serving": SERVING_STAMP_REL, "geo": GEO_STAMP_REL}


def clear_export_stamp(repo: Path, rel: str) -> None:
    (repo / rel).unlink(missing_ok=True)


def write_export_stamp(repo: Path, rel: str, warehouse: dict | None, source: str) -> None:
    path = repo / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    stamp = {"warehouse": warehouse, "source": source, "exported_at": utc_now()}
    path.write_text(json.dumps(stamp, indent=2) + "\n", encoding="utf-8")


def export_problem(stamp: dict | None, main_tree: str, label: str) -> str | None:
    """None if an export stamp proves its output came from a warehouse built from main_tree."""
    if not stamp:
        return f"no {label} export stamp (exported before #361 or interrupted)"
    problem = warehouse_problem(stamp.get("warehouse"), main_tree)
    return f"{label} export: {problem}" if problem else None
