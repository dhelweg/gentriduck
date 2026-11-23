#!/usr/bin/env python3
"""ops/release_deploy.py -- #361: one-step release close-out (`uv run poe release-deploy`).

After the maintainer merges the weekly `develop -> main` PR, the public site (GitHub Pages,
ADR-0012 Amendment A) must be rebuilt from `main` and republished. Nothing deploys automatically
(no CI: data is local and gitignored, see #283). This driver runs that close-out as one command:

  (a) Preconditions. Fetch `origin/main` (unless `--no-fetch`) and require the local checkout to
      be at `origin/main`, or at a commit whose tree equals it (e.g. the `develop` tip a GitHub
      merge commit was made from). Also require a clean working tree, so the build can't bake in
      local edits (see `ops.build_provenance.relevant_dirty()` for which paths count).
  (b) Skip or rebuild. `web/build/.build-source` (written at build time by
      `web/scripts/postbuild-build-source.mjs`) records the build's provenance. The rebuild is
      skipped only if ALL of these hold:
        - the build ran on a clean tree equal to `origin/main^{tree}`;
        - #369: it embeds a complete `npm run sources` record and no `sources_problem`
          (`sources_problem()`). `evidence build` doesn't run sources; it bundles what the last
          sources run extracted. So the build accepts `web/.sources-source` (written around
          `npm run sources` by `web/scripts/sources-stamp.mjs`) only if that run was complete,
          ran on the same clean tree, read the same `data/serving`, and its extracted data is
          unchanged. Otherwise it records why, and `inputs: null`;
        - its `inputs` fingerprint (serving parquet + map GeoJSON + effective GoatCounter code,
          `ops.build_provenance.inputs_fingerprint()`) equals the current one;
        - its embedded export stamps (`data/serving/.export-source` as of sources time,
          `data/.geo-export-source`) prove the bundled data was exported from a warehouse with a
          complete, clean `poe build` of `origin/main`'s tree. The CURRENT warehouse record
          doesn't matter here: an unrelated later `poe build` (e.g. the pre-push hook) doesn't
          change what `web/build` contains.
      Otherwise it rebuilds: `poe export-serving`, `poe export-area-geojson`, `npm ci` (only if
      `web/node_modules` is missing), `npm run sources:strict` (fails on a failed query, #369),
      `npm run build`. Before rebuilding it refuses unless `data/.warehouse-source` proves the warehouse was built from
      `origin/main`'s tree, so it never exports marts built from other model code.
  (c) Smoke check (`smoke_check()`): non-empty build, at least `--min-pages` HTML pages, no
      `cartocdn` string in any text asset (#351 removed the CARTO basemap; its reappearance means
      a regression to Evidence's tile-based `<AreaMap>`), and `.build-source` matches
      `origin/main`'s tree, the current inputs fingerprint and export stamps that are valid for
      `origin/main`.
  (d) Deploy: `ops/deploy-gh-pages.sh`, unchanged. Its SEC-2 (#191) hard-asserted
      gh-pages-only force-push stays the only push this task performs.

`--dry-run` runs (a) and (b) read-only (it still fetches `origin/main`, unless `--no-fetch`,
because the decision depends on it), runs the read-only smoke check if the skip path applies,
and prints the steps it would run without running them. `--force-rebuild` rebuilds regardless.
The task never runs `poe build`/`poe refresh` itself: it exports from the warehouse as it stands,
once the warehouse record says that warehouse matches `main`.

Stdlib only, cross-platform (same discipline as ops/time_web_build.py and
ingestion/run_ingest.py). The decision/smoke helpers are pure or path-only functions so
tests/ops/test_release_deploy.py can exercise them without data, Node or a network.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from ops.build_provenance import (  # noqa: E402 -- after the sys.path insert above
    BUILD_SOURCE_NAME,
    EXPORT_STAMPS,
    WAREHOUSE_SOURCE_REL,
    WEB_DIRTY_RULE,
    ProvenanceError,
    dirty_lines,
    export_problem,
    git,
    inputs_fingerprint,
    read_json,
    warehouse_problem,
)

DEFAULT_MIN_PAGES = 500  # 559 pages for Berlin alone in 2026-07; ~1,900 with Hamburg (2026-11).
FORBIDDEN_STRINGS = ("cartocdn",)
TEXT_SUFFIXES = {".html", ".js", ".mjs", ".css", ".json", ".svg", ".txt", ".webmanifest", ".xml"}


def say(*args: object, **kwargs: object) -> None:
    """print() with flush, so our lines stay in order with stderr and with child-process output."""
    print(*args, **kwargs, flush=True)  # type: ignore[call-overload]


class ReleaseDeployError(Exception):
    """A precondition or step failed; the message is printed and the task exits non-zero."""


@dataclass(frozen=True)
class Decision:
    rebuild: bool
    reason: str


# --------------------------------------------------------------------------- pure helpers


def parse_build_source(path: Path) -> dict | None:
    """Read `.build-source`. Missing or malformed -> None (forces a rebuild)."""
    return read_json(path) if path.is_file() else None


def decide(
    build_source: dict | None,
    main_tree: str,
    *,
    build_present: bool,
    force: bool,
    current_inputs: str | None,
) -> Decision:
    """Skip the rebuild only if the existing build provably matches origin/main's tree and today's
    gitignored inputs, and its data was exported from a warehouse built from origin/main."""
    if force:
        return Decision(True, "--force-rebuild given")
    if not build_present:
        return Decision(True, "web/build is missing or empty")
    if build_source is None:
        return Decision(True, f"web/build/{BUILD_SOURCE_NAME} is missing or unreadable")
    tree = build_source.get("tree")
    if not tree:
        return Decision(
            True, f"{BUILD_SOURCE_NAME} records no source tree (git unavailable at build)"
        )
    if build_source.get("dirty", True):
        return Decision(True, f"{BUILD_SOURCE_NAME} says the build ran on a dirty working tree")
    if tree != main_tree:
        return Decision(True, f"build tree {tree[:12]} != origin/main tree {main_tree[:12]}")
    problem = sources_problem(build_source)
    if problem:
        return Decision(True, problem)
    inputs = build_source.get("inputs")
    if not inputs:
        return Decision(True, f"{BUILD_SOURCE_NAME} has no inputs fingerprint")
    if inputs != current_inputs:
        return Decision(
            True,
            "build inputs changed since the build (data/serving, web/static/geo or the "
            f"GoatCounter code): {inputs[:12]} != {str(current_inputs)[:12]}",
        )
    problem = exports_problem(build_source, main_tree)
    if problem:
        return Decision(True, problem)
    commit = str(build_source.get("commit") or "?")[:12]
    built_at = build_source.get("built_at", "?")
    return Decision(
        False,
        f"web/build was built from tree {tree[:12]} (commit {commit}, {built_at}) == origin/main "
        f"tree; inputs {inputs[:12]} unchanged; data exported from a warehouse built from origin/main",
    )


def sources_problem(build_source: dict) -> str | None:
    """#369: None if the build vouches for the mart data it bundled, i.e. postbuild-build-source.mjs
    embedded a complete `npm run sources` record that matched the build (no `sources_problem`).
    A build without one (made before #369) may hold data from any earlier sources run."""
    problem = build_source.get("sources_problem")
    if problem:
        return f"{BUILD_SOURCE_NAME}: the bundled mart data is unproven: {problem}"
    sources = build_source.get("sources")
    if not isinstance(sources, dict) or sources.get("complete") is not True:
        return f"{BUILD_SOURCE_NAME} has no complete `npm run sources` record (built before #369?)"
    return None


def exports_problem(build_source: dict, main_tree: str) -> str | None:
    """None if every export stamp embedded in .build-source is valid for main_tree."""
    exports = build_source.get("exports")
    if not isinstance(exports, dict):
        return f"{BUILD_SOURCE_NAME} has no export stamps"
    for label in EXPORT_STAMPS:
        problem = export_problem(exports.get(label), main_tree, label)
        if problem:
            return problem
    return None


def build_present(build_dir: Path) -> bool:
    return build_dir.is_dir() and any(build_dir.iterdir())


def smoke_check(
    build_dir: Path,
    *,
    main_tree: str,
    min_pages: int,
    expected_inputs: str,
) -> list[str]:
    """Return a list of problems (empty = pass). Read-only."""
    if not build_present(build_dir):
        return [f"{build_dir} is missing or empty"]
    problems = []
    pages = 0
    hits: list[str] = []
    for path in build_dir.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix == ".html":
            pages += 1
        if path.suffix in TEXT_SUFFIXES:
            text = path.read_text(encoding="utf-8", errors="ignore")
            for needle in FORBIDDEN_STRINGS:
                if needle in text:
                    hits.append(f"{path.relative_to(build_dir).as_posix()} contains '{needle}'")
    if pages < min_pages:
        problems.append(f"only {pages} HTML page(s), expected at least {min_pages}")
    problems.extend(hits[:20])
    if len(hits) > 20:
        problems.append(f"... and {len(hits) - 20} more forbidden-string hit(s)")
    src = parse_build_source(build_dir / BUILD_SOURCE_NAME)
    if src is None:
        problems.append(f"{BUILD_SOURCE_NAME} is missing or unreadable")
    else:
        if src.get("tree") != main_tree or src.get("dirty", True):
            problems.append(
                f"{BUILD_SOURCE_NAME} (tree {str(src.get('tree'))[:12]}, "
                f"dirty={src.get('dirty')}) does not match origin/main tree {main_tree[:12]}"
            )
        if src.get("inputs") != expected_inputs:
            problems.append(
                f"{BUILD_SOURCE_NAME} inputs {str(src.get('inputs'))[:12]} != current inputs "
                f"{expected_inputs[:12]} (data/serving, web/static/geo, GoatCounter code)"
            )
        for problem in (sources_problem(src), exports_problem(src, main_tree)):
            if problem:
                problems.append(problem)
    if not problems:
        say(
            f"release-deploy: smoke check passed ({pages} HTML pages, "
            f"no {', '.join(FORBIDDEN_STRINGS)}, provenance matches origin/main)."
        )
    return problems


# --------------------------------------------------------------------------- git / steps


def check_preconditions(repo: Path, *, fetch: bool) -> str:
    """Return origin/main's tree hash, or raise if the checkout isn't at origin/main."""
    if fetch:
        say("release-deploy: fetching origin/main ...")
        git(repo, "fetch", "--quiet", "origin", "main")
    try:
        main_tree = git(repo, "rev-parse", "--verify", "--quiet", "origin/main^{tree}")
    except ProvenanceError:
        raise ReleaseDeployError(
            "origin/main is not available locally. Run `git fetch origin main` first."
        ) from None
    main_commit = git(repo, "rev-parse", "--short", "origin/main")
    head_tree = git(repo, "rev-parse", "HEAD^{tree}")
    head_commit = git(repo, "rev-parse", "--short", "HEAD")
    if head_tree != main_tree:
        raise ReleaseDeployError(
            f"local HEAD {head_commit} (tree {head_tree[:12]}) is not at origin/main {main_commit} "
            f"(tree {main_tree[:12]}). Check out the release first, e.g. "
            "`git switch main && git pull --ff-only` (or `git switch --detach origin/main`)."
        )
    dirty = dirty_lines(repo, WEB_DIRTY_RULE)
    if dirty:
        listing = "\n  ".join(dirty[:20])
        raise ReleaseDeployError(
            "working tree has changes that would leak into the build:\n  "
            f"{listing}\nCommit, stash or remove them, then re-run."
        )
    same_commit = git(repo, "rev-parse", "HEAD") == git(repo, "rev-parse", "origin/main")
    same = "at" if same_commit else "tree-equal to"
    say(
        f"release-deploy: HEAD {head_commit} is {same} origin/main {main_commit} "
        f"(tree {main_tree[:12]}); working tree clean."
    )
    return main_tree


def rebuild_steps(repo: Path) -> list[tuple[list[str], Path]]:
    web = repo / "web"
    npm = shutil.which("npm") or "npm"
    poe = [sys.executable, "-m", "poethepoet"]
    steps: list[tuple[list[str], Path]] = [
        ([*poe, "export-serving"], repo),
        ([*poe, "export-area-geojson"], repo),
    ]
    if not (web / "node_modules").is_dir():
        steps.append(([npm, "ci"], web))
    steps += [([npm, "run", "sources:strict"], web), ([npm, "run", "build"], web)]
    return steps


def find_bash() -> str:
    """Locate bash for ops/deploy-gh-pages.sh. On Windows, prefer Git for Windows' bash (next to
    git.exe): a bare `bash` on PATH can be System32's WSL launcher, which would run the deploy
    inside a different environment (other git config, maybe no credentials)."""
    if sys.platform == "win32":
        git_exe = shutil.which("git")
        if git_exe:
            # git.exe lives in <Git>/cmd, <Git>/bin, <Git>/mingw64/bin or <Git>/usr/bin.
            for root in Path(git_exe).resolve().parents[:3]:
                for candidate in (root / "bin" / "bash.exe", root / "usr" / "bin" / "bash.exe"):
                    if candidate.is_file():
                        return str(candidate)
        found = shutil.which("bash")
        if found and "system32" not in found.lower():
            return found
        raise ReleaseDeployError("bash not found; install Git for Windows (it ships Git Bash).")
    return shutil.which("bash") or "bash"


def deploy_step(repo: Path) -> tuple[list[str], Path]:
    return [find_bash(), "ops/deploy-gh-pages.sh"], repo


def run_step(argv: list[str], cwd: Path, *, dry_run: bool) -> None:
    shown = " ".join(Path(argv[0]).name if i == 0 else a for i, a in enumerate(argv))
    where = cwd.relative_to(REPO_ROOT).as_posix() if cwd.is_relative_to(REPO_ROOT) else str(cwd)
    if dry_run:
        say(f"release-deploy: (dry-run) would run `{shown}` in {where or '.'}")
        return
    say(f"release-deploy: running `{shown}` in {where or '.'}")
    result = subprocess.run(argv, cwd=cwd)  # noqa: S603 -- fixed argv built above
    if result.returncode != 0:
        raise ReleaseDeployError(f"`{shown}` failed with exit code {result.returncode}")


# --------------------------------------------------------------------------- main


def main(argv: list[str] | None = None, repo: Path = REPO_ROOT) -> int:
    parser = argparse.ArgumentParser(
        prog="poe release-deploy", description=__doc__.split("\n\n")[0]
    )
    parser.add_argument(
        "--dry-run", action="store_true", help="check and print the plan; build and deploy nothing"
    )
    parser.add_argument(
        "--no-fetch",
        action="store_true",
        help="use the local origin/main ref as-is (no `git fetch`)",
    )
    parser.add_argument(
        "--force-rebuild",
        action="store_true",
        help="rebuild even if web/build matches origin/main and today's inputs",
    )
    parser.add_argument(
        "--min-pages",
        type=int,
        default=DEFAULT_MIN_PAGES,
        help=f"smoke-check minimum HTML page count (default {DEFAULT_MIN_PAGES})",
    )
    argv = list(sys.argv[1:] if argv is None else argv)
    if argv[:1] == ["--"]:  # `poe release-deploy -- --dry-run` passes the `--` through
        argv = argv[1:]
    args = parser.parse_args(argv)

    build_dir = repo / "web" / "build"
    try:
        main_tree = check_preconditions(repo, fetch=not args.no_fetch)
        warehouse = read_json(repo / WAREHOUSE_SOURCE_REL)
        src = parse_build_source(build_dir / BUILD_SOURCE_NAME)
        present = build_present(build_dir)
        current_inputs = inputs_fingerprint(repo) if present and not args.force_rebuild else None
        decision = decide(
            src,
            main_tree,
            build_present=present,
            force=args.force_rebuild,
            current_inputs=current_inputs,
        )
        verb = "REBUILD" if decision.rebuild else "SKIP rebuild"
        say(f"release-deploy: {verb}: {decision.reason}")

        if decision.rebuild:
            problem = warehouse_problem(warehouse, main_tree)
            if problem:
                raise ReleaseDeployError(
                    f"refusing to rebuild: {problem}. Run `uv run poe build` on main first "
                    "(a clean checkout at origin/main), then re-run `uv run poe release-deploy`."
                )
            for step, cwd in rebuild_steps(repo):
                run_step(step, cwd, dry_run=args.dry_run)

        if args.dry_run and decision.rebuild:
            say("release-deploy: (dry-run) would run the smoke check on the fresh build")
        else:
            # After a rebuild the exports rewrote the inputs, so fingerprint them again.
            expected = inputs_fingerprint(repo) if decision.rebuild else current_inputs
            problems = smoke_check(
                build_dir,
                main_tree=main_tree,
                min_pages=args.min_pages,
                expected_inputs=str(expected),
            )
            if problems:
                raise ReleaseDeployError("smoke check failed:\n  " + "\n  ".join(problems))

        run_step(*deploy_step(repo), dry_run=args.dry_run)
    except (ReleaseDeployError, ProvenanceError) as exc:
        say(f"release-deploy: error: {exc}", file=sys.stderr)
        return 1
    say(
        "release-deploy: dry run complete; nothing built or deployed."
        if args.dry_run
        else "release-deploy: done."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
