#!/usr/bin/env python3
"""ops/dbt_build.py -- #361: `poe build` / `poe build-full-refresh` with warehouse provenance.

Runs `dbt build --project-dir transform --profiles-dir transform <args>` exactly as the old
plain-cmd poe tasks did (extra args such as `--select x+` still pass through) and maintains
`data/.warehouse-source` (gitignored): the git tree the warehouse was built from, the commit, a
clean flag (no uncommitted changes under transform/) and whether the build was complete.

Order matters (#361 re-review, interrupted-build case):
  1. read the existing record;
  2. BEFORE dbt starts, overwrite it with `complete: false, reason: "dbt build in progress"`,
     so a killed/interrupted build (Ctrl-C, taskkill, crash) can never leave a valid certificate
     for a half-rebuilt warehouse;
  3. after dbt exits, write `next_warehouse_record(existing, ...)`: a full successful build
     certifies; a successful `--select`/`--exclude` build of the same clean tree restores the
     existing certificate; anything else (failure, `--vars`/`--target`/`--defer`/`--state`/...)
     voids it. See `ops.build_provenance.classify_dbt_args()`.

`poe release-deploy` (ops/release_deploy.py) reads that file. Before a rebuild it refuses unless
the warehouse was completely and cleanly built from origin/main's tree, so a release can't
export marts built from different model code. Only `poe build` / `poe build-full-refresh` go
through this wrapper: `poe materialize-oa-getis-ord` and direct `dbt` calls bypass it.

`poe build --help` / `--version` (INFO_ONLY_ARGS) build nothing, so they run dbt without
touching the record (#369).

dbt's own exit code is returned unchanged. Recording is best-effort: any provenance failure is
reported but never masks the dbt result.

Stdlib only, cross-platform (same wrapper discipline as ops/time_web_build.py).
"""

from __future__ import annotations

import json
import shutil
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from ops.build_provenance import (  # noqa: E402 -- after the sys.path insert above
    WAREHOUSE_DIRTY_RULE,
    WAREHOUSE_SOURCE_REL,
    classify_dbt_args,
    dirty_lines,
    git,
    in_progress_record,
    next_warehouse_record,
    read_json,
    utc_now,
)

# #369: args that make dbt print help or its version and exit without building anything.
INFO_ONLY_ARGS = frozenset({"--help", "-h", "--version"})


def git_state(repo: Path) -> tuple[str, str, bool]:
    """(tree, commit, clean) of the checkout. Raises ProvenanceError if git fails."""
    tree = git(repo, "rev-parse", "HEAD^{tree}")
    commit = git(repo, "rev-parse", "HEAD")
    clean = not dirty_lines(repo, WAREHOUSE_DIRTY_RULE)
    return tree, commit, clean


def write_record(repo: Path, record: dict) -> None:
    path = repo / WAREHOUSE_SOURCE_REL
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")


def mark_in_progress(repo: Path) -> tuple[dict | None, tuple[str, str, bool] | None]:
    """Step 1+2: return (existing record, git state) and void the record on disk.

    If git state can't be read, the record is deleted instead (no certificate either way)."""
    existing = read_json(repo / WAREHOUSE_SOURCE_REL)
    try:
        state = git_state(repo)
    except Exception as exc:  # noqa: BLE001 -- best-effort; fall back to "no certificate"
        print(f"dbt_build.py: could not read git state ({exc}); removing {WAREHOUSE_SOURCE_REL}")
        (repo / WAREHOUSE_SOURCE_REL).unlink(missing_ok=True)
        return existing, None
    tree, commit, clean = state
    write_record(repo, in_progress_record(tree=tree, commit=commit, clean=clean, now=utc_now()))
    return existing, state


def finish(
    repo: Path,
    returncode: int,
    args: list[str],
    existing: dict | None,
    state: tuple[str, str, bool] | None,
) -> None:
    """Step 3: write the final record for this run."""
    if state is None:
        return  # git state unknown: leave no certificate (mark_in_progress removed it)
    tree, commit, clean = state
    new = next_warehouse_record(
        existing,
        tree=tree,
        commit=commit,
        clean=clean,
        returncode=returncode,
        kind=classify_dbt_args(args),
        now=utc_now(),
    )
    write_record(repo, new)
    kept = " (kept the existing certificate)" if new is existing else ""
    print(
        f"dbt_build.py: {WAREHOUSE_SOURCE_REL}: tree {tree[:12]} clean={clean} "
        f"complete={new.get('complete')}{kept}"
    )


def main(argv: list[str] | None = None) -> int:
    args = list(sys.argv[1:] if argv is None else argv)
    repo = REPO_ROOT
    dbt = shutil.which("dbt") or "dbt"
    cmd = [dbt, "build", "--project-dir", "transform", "--profiles-dir", "transform", *args]
    if INFO_ONLY_ARGS.intersection(args):
        # #369: `poe build --help` / `--version` builds nothing, so it leaves the record alone.
        return subprocess.run(cmd, cwd=repo).returncode  # noqa: S603 -- as below
    existing, state = None, None
    try:
        existing, state = mark_in_progress(repo)
    except Exception as exc:  # noqa: BLE001 -- provenance must never block or mask the build
        print(
            f"dbt_build.py: could not mark {WAREHOUSE_SOURCE_REL} in progress: {exc}",
            file=sys.stderr,
        )
        try:  # an old certificate must not outlive a build we couldn't mark
            (repo / WAREHOUSE_SOURCE_REL).unlink(missing_ok=True)
        except OSError:
            pass
    result = subprocess.run(cmd, cwd=repo)  # noqa: S603 -- fixed argv + operator's dbt args
    try:
        finish(repo, result.returncode, args, existing, state)
    except Exception as exc:  # noqa: BLE001 -- best-effort: never mask dbt's result
        print(f"dbt_build.py: could not write {WAREHOUSE_SOURCE_REL}: {exc}", file=sys.stderr)
    return result.returncode


if __name__ == "__main__":
    raise SystemExit(main())
