#!/usr/bin/env python3
"""ops/dbt_build.py -- #361: `poe build` / `poe build-full-refresh` with warehouse provenance.

Runs `dbt build --project-dir transform --profiles-dir transform <args>` exactly as the old
plain-cmd poe tasks did (extra args such as `--select x+` still pass through), then writes
`data/.warehouse-source` (gitignored): the git tree the warehouse was built from, the commit, a
clean flag (no uncommitted changes under transform/) and whether the build was complete.

`poe release-deploy` (ops/release_deploy.py) reads that file. Before a rebuild it refuses unless
the warehouse was completely and cleanly built from origin/main's tree, so a release can't
export marts built from different model code. See
`ops.build_provenance.next_warehouse_record()` for when a partial (`--select`) or failed build
keeps or voids the record. dbt's own exit code is returned unchanged. Recording is best-effort:
a provenance failure is reported but never masks the dbt result.

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
    ProvenanceError,
    dirty_lines,
    git,
    next_warehouse_record,
    read_json,
    utc_now,
)

STANDARD_ARGS = frozenset({"--full-refresh"})


def record(repo: Path, returncode: int, args: list[str]) -> None:
    path = repo / WAREHOUSE_SOURCE_REL
    try:
        tree = git(repo, "rev-parse", "HEAD^{tree}")
        commit = git(repo, "rev-parse", "HEAD")
        clean = not dirty_lines(repo, WAREHOUSE_DIRTY_RULE)
    except ProvenanceError as exc:
        print(f"dbt_build.py: could not read git state ({exc}); voiding {WAREHOUSE_SOURCE_REL}")
        path.unlink(missing_ok=True)
        return
    new = next_warehouse_record(
        read_json(path),
        tree=tree,
        commit=commit,
        clean=clean,
        returncode=returncode,
        standard=set(args) <= STANDARD_ARGS,
        now=utc_now(),
    )
    if new is None:
        print(f"dbt_build.py: {WAREHOUSE_SOURCE_REL} unchanged (partial build of the same tree)")
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(new, indent=2) + "\n", encoding="utf-8")
    print(
        f"dbt_build.py: {WAREHOUSE_SOURCE_REL}: tree {tree[:12]} clean={clean} "
        f"complete={new['complete']}"
    )


def main(argv: list[str] | None = None) -> int:
    args = list(sys.argv[1:] if argv is None else argv)
    dbt = shutil.which("dbt") or "dbt"
    cmd = [dbt, "build", "--project-dir", "transform", "--profiles-dir", "transform", *args]
    result = subprocess.run(cmd, cwd=REPO_ROOT)  # noqa: S603 -- fixed argv + operator's dbt args
    try:
        record(REPO_ROOT, result.returncode, args)
    except OSError as exc:  # best-effort: never mask dbt's result
        print(f"dbt_build.py: could not write {WAREHOUSE_SOURCE_REL}: {exc}", file=sys.stderr)
    return result.returncode


if __name__ == "__main__":
    raise SystemExit(main())
