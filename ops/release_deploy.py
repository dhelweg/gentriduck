#!/usr/bin/env python3
"""ops/release_deploy.py -- #361: one-step release close-out (`uv run poe release-deploy`).

After the maintainer merges the weekly `develop -> main` PR, the public site (GitHub Pages,
ADR-0012 Amendment A) must be rebuilt from `main` and republished. Nothing deploys automatically
(no CI: data is local and gitignored, see #283). This driver runs that close-out as one command:

  (a) Preconditions. Fetch `origin/main` (unless `--no-fetch`) and require the local checkout to
      be at `origin/main`, or at a commit whose tree equals it (e.g. the `develop` tip a GitHub
      merge commit was made from). Also require a clean working tree, so the build can't bake in
      local edits (see `relevant_dirty()` for which paths count).
  (b) Skip or rebuild. If `web/build/.build-source` (written at build time by
      `web/scripts/postbuild-build-source.mjs`) records a clean build from a tree equal to
      `origin/main^{tree}`, skip the rebuild: `web/build` already holds exactly what `main` would
      produce. Otherwise run `poe export-serving`, `poe export-area-geojson`, `npm ci` (only if
      `web/node_modules` is missing), `npm run sources` and `npm run build`.
  (c) Smoke check (`smoke_check()`): non-empty build, at least `--min-pages` HTML pages, no
      `cartocdn` string in any text asset (#351 removed the CARTO basemap; its reappearance means
      a regression to Evidence's tile-based `<AreaMap>`), and `.build-source` matches `origin/main`.
  (d) Deploy: `ops/deploy-gh-pages.sh`, unchanged. Its SEC-2 (#191) hard-asserted
      gh-pages-only force-push stays the only push this task performs.

`--dry-run` runs (a) and (b) read-only (it still fetches `origin/main`, unless `--no-fetch`,
because the decision depends on it), runs the read-only smoke check if the skip path applies,
and prints the steps it would run without running them.

The tree-hash check covers the committed code only. The serving data (`data/`) is gitignored, so
a re-ingest or `poe build` since the last web build is invisible to it. Pass `--force-rebuild`
after a data refresh. The task also does not run `poe build`/`poe refresh`: like the documented
manual sequence it exports from the warehouse as it stands.

Stdlib only, cross-platform (same discipline as ops/time_web_build.py and
ingestion/run_ingest.py). The decision/smoke helpers are pure or path-only functions so
tests/ops/test_release_deploy.py can exercise them without data, Node or a network.
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
BUILD_SOURCE_NAME = ".build-source"
DEFAULT_MIN_PAGES = 500  # 559 pages for Berlin alone in 2026-07; ~1,900 with Hamburg (2026-11).
FORBIDDEN_STRINGS = ("cartocdn",)
TEXT_SUFFIXES = {".html", ".js", ".mjs", ".css", ".json", ".svg", ".txt", ".webmanifest", ".xml"}

# Paths that change during a normal build/release without affecting the built site. Keep in sync
# with IGNORED_DIRTY_PATHS in web/scripts/postbuild-build-source.mjs.
#   ops/web-build-timings.log -- appended by ops/time_web_build.py after each `poe web-build`.
IGNORED_DIRTY_PATHS = frozenset({"ops/web-build-timings.log"})


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


def relevant_dirty(porcelain_lines: list[str]) -> list[str]:
    """Filter `git status --porcelain --untracked-files=all` output to lines that could change the
    built site: any tracked modification, plus untracked files under `web/` (Evidence picks up every
    page there). Untracked files elsewhere (scratch notes) and IGNORED_DIRTY_PATHS don't count.
    Gitignored paths (`data/`, `web/build/`, `web/node_modules/`) never appear in the input.
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
        if status == "??" and not path.startswith("web/"):
            continue
        out.append(line)
    return out


def parse_build_source(text: str | None) -> dict | None:
    """Parse `.build-source` JSON. Returns None if missing or malformed (forces a rebuild)."""
    if not text:
        return None
    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        return None
    return data if isinstance(data, dict) else None


def decide(
    build_source: dict | None, main_tree: str, *, build_present: bool, force: bool
) -> Decision:
    """Skip the rebuild only if the existing build provably came from origin/main's tree."""
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
    commit = str(build_source.get("commit") or "?")[:12]
    built_at = build_source.get("built_at", "?")
    return Decision(
        False,
        f"web/build was built from tree {tree[:12]} (commit {commit}, {built_at}) == origin/main tree",
    )


def build_present(build_dir: Path) -> bool:
    return build_dir.is_dir() and any(build_dir.iterdir())


def smoke_check(build_dir: Path, *, main_tree: str, min_pages: int) -> list[str]:
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
    src_path = build_dir / BUILD_SOURCE_NAME
    src = parse_build_source(src_path.read_text(encoding="utf-8") if src_path.is_file() else None)
    if src is None:
        problems.append(f"{BUILD_SOURCE_NAME} is missing or unreadable")
    elif src.get("tree") != main_tree or src.get("dirty", True):
        problems.append(
            f"{BUILD_SOURCE_NAME} (tree {str(src.get('tree'))[:12]}, dirty={src.get('dirty')}) "
            f"does not match origin/main tree {main_tree[:12]}"
        )
    if not problems:
        say(
            f"release-deploy: smoke check passed ({pages} HTML pages, no {', '.join(FORBIDDEN_STRINGS)})."
        )
    return problems


# --------------------------------------------------------------------------- git / steps


def git(repo: Path, *args: str, strip: bool = True) -> str:
    result = subprocess.run(  # noqa: S603 -- fixed git argv, no untrusted input
        ["git", *args],  # noqa: S607 -- git resolved from PATH, as everywhere in ops/
        cwd=repo,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise ReleaseDeployError(f"git {' '.join(args)} failed: {result.stderr.strip()}")
    # Porcelain status lines start with a significant space (" M path"); don't strip those.
    return result.stdout.strip() if strip else result.stdout


def check_preconditions(repo: Path, *, fetch: bool) -> str:
    """Return origin/main's tree hash, or raise if the checkout isn't at origin/main."""
    if fetch:
        say("release-deploy: fetching origin/main ...")
        git(repo, "fetch", "--quiet", "origin", "main")
    try:
        main_tree = git(repo, "rev-parse", "--verify", "--quiet", "origin/main^{tree}")
    except ReleaseDeployError:
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
    dirty = relevant_dirty(
        git(repo, "status", "--porcelain", "--untracked-files=all", strip=False).splitlines()
    )
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
    steps += [([npm, "run", "sources"], web), ([npm, "run", "build"], web)]
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
        help="rebuild even if web/build matches origin/main (e.g. after a data refresh)",
    )
    parser.add_argument(
        "--min-pages",
        type=int,
        default=DEFAULT_MIN_PAGES,
        help=f"smoke-check minimum HTML page count (default {DEFAULT_MIN_PAGES})",
    )
    args = parser.parse_args(argv)

    build_dir = repo / "web" / "build"
    try:
        main_tree = check_preconditions(repo, fetch=not args.no_fetch)

        src_path = build_dir / BUILD_SOURCE_NAME
        src = parse_build_source(
            src_path.read_text(encoding="utf-8") if src_path.is_file() else None
        )
        decision = decide(
            src, main_tree, build_present=build_present(build_dir), force=args.force_rebuild
        )
        verb = "REBUILD" if decision.rebuild else "SKIP rebuild"
        say(f"release-deploy: {verb}: {decision.reason}")

        if decision.rebuild:
            for step, cwd in rebuild_steps(repo):
                run_step(step, cwd, dry_run=args.dry_run)

        if args.dry_run and decision.rebuild:
            say("release-deploy: (dry-run) would run the smoke check on the fresh build")
        else:
            problems = smoke_check(build_dir, main_tree=main_tree, min_pages=args.min_pages)
            if problems:
                raise ReleaseDeployError("smoke check failed:\n  " + "\n  ".join(problems))

        run_step(*deploy_step(repo), dry_run=args.dry_run)
    except ReleaseDeployError as exc:
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
