"""
tests/ops/test_release_deploy.py
=================================
#361: unit tests for `ops/release_deploy.py` (`uv run poe release-deploy`).

No data, Node, network or real deploy: the pure helpers (`relevant_dirty`, `parse_build_source`,
`decide`, `smoke_check`) are tested on plain inputs, and `main(--dry-run --no-fetch)` runs against
a throwaway git repo whose `origin/main` is a local ref (`git update-ref`), covering:
  - the tree-equal SKIP path (incl. a merge commit with a new SHA but an identical tree),
  - the REBUILD path (tree mismatch / no .build-source),
  - the precondition refusals (HEAD not at origin/main, dirty tree, origin/main missing).
Dry-run never executes a step, so neither `poe export-*`, `npm` nor `deploy-gh-pages.sh` runs.
"""

from __future__ import annotations

import json
import subprocess
from pathlib import Path

import pytest

from ops.release_deploy import (
    BUILD_SOURCE_NAME,
    decide,
    main,
    parse_build_source,
    relevant_dirty,
    smoke_check,
)

TREE = "a" * 40
OTHER = "b" * 40


def _src(tree=TREE, dirty=False, commit="c" * 40):
    return {"tree": tree, "commit": commit, "built_at": "2026-11-01T00:00:00Z", "dirty": dirty}


# --------------------------------------------------------------------------- relevant_dirty


def test_relevant_dirty_keeps_tracked_changes_anywhere():
    lines = [" M transform/models/x.sql", "M  web/pages/index.md", " D README.md"]
    assert relevant_dirty(lines) == lines


def test_relevant_dirty_untracked_only_counts_under_web():
    lines = ["?? scratch.txt", "?? docs/notes.md", "?? web/pages/new.md"]
    assert relevant_dirty(lines) == ["?? web/pages/new.md"]


def test_relevant_dirty_ignores_timings_log_and_handles_renames():
    lines = [" M ops/web-build-timings.log", "R  web/a.md -> web/b.md", ""]
    assert relevant_dirty(lines) == ["R  web/a.md -> web/b.md"]


# --------------------------------------------------------------------------- parse / decide


@pytest.mark.parametrize("text", [None, "", "not json", "[1, 2]"])
def test_parse_build_source_rejects_missing_or_malformed(text):
    assert parse_build_source(text) is None


def test_parse_build_source_reads_json():
    assert parse_build_source(json.dumps(_src()))["tree"] == TREE


def test_decide_skips_only_for_clean_build_from_main_tree():
    d = decide(_src(), TREE, build_present=True, force=False)
    assert not d.rebuild
    assert "== origin/main tree" in d.reason


@pytest.mark.parametrize(
    ("src", "present", "force", "why"),
    [
        (_src(), True, True, "--force-rebuild"),
        (_src(), False, False, "missing or empty"),
        (None, True, False, "missing or unreadable"),
        (_src(tree=None), True, False, "no source tree"),
        (_src(dirty=True), True, False, "dirty"),
        ({"tree": TREE, "commit": "x"}, True, False, "dirty"),  # absent `dirty` = unsafe
        (_src(tree=OTHER), True, False, "!= origin/main tree"),
    ],
)
def test_decide_rebuilds_otherwise(src, present, force, why):
    d = decide(src, TREE, build_present=present, force=force)
    assert d.rebuild
    assert why in d.reason


# --------------------------------------------------------------------------- smoke_check


def _fake_build(root: Path, pages: int = 3, tree: str = TREE, extra: dict | None = None) -> Path:
    build = root / "build"
    for i in range(pages):
        page = build / f"p{i}" / "index.html"
        page.parent.mkdir(parents=True, exist_ok=True)
        page.write_text("<html><head></head><body>ok</body></html>", encoding="utf-8")
    (build / "_app").mkdir(parents=True, exist_ok=True)
    (build / "_app" / "app.js").write_text("console.log('hi')", encoding="utf-8")
    (build / BUILD_SOURCE_NAME).write_text(json.dumps(_src(tree=tree)), encoding="utf-8")
    for rel, text in (extra or {}).items():
        (build / rel).parent.mkdir(parents=True, exist_ok=True)
        (build / rel).write_text(text, encoding="utf-8")
    return build


def test_smoke_check_passes_on_good_build(tmp_path):
    assert smoke_check(_fake_build(tmp_path), main_tree=TREE, min_pages=3) == []


def test_smoke_check_fails_on_missing_build(tmp_path):
    assert smoke_check(tmp_path / "nope", main_tree=TREE, min_pages=1)


def test_smoke_check_fails_on_too_few_pages(tmp_path):
    problems = smoke_check(_fake_build(tmp_path, pages=2), main_tree=TREE, min_pages=3)
    assert any("only 2 HTML page" in p for p in problems)


def test_smoke_check_fails_on_cartocdn(tmp_path):
    build = _fake_build(
        tmp_path, extra={"_app/chunk.js": "fetch('https://a.basemaps.cartocdn.com')"}
    )
    problems = smoke_check(build, main_tree=TREE, min_pages=1)
    assert problems == ["_app/chunk.js contains 'cartocdn'"]


def test_smoke_check_ignores_binary_assets(tmp_path):
    build = _fake_build(tmp_path, extra={"data/x.parquet": "cartocdn"})
    assert smoke_check(build, main_tree=TREE, min_pages=1) == []


def test_smoke_check_fails_on_provenance_mismatch(tmp_path):
    problems = smoke_check(_fake_build(tmp_path, tree=OTHER), main_tree=TREE, min_pages=1)
    assert any("does not match origin/main" in p for p in problems)


# --------------------------------------------------------------------------- main() dry-run


def _git(repo: Path, *args: str) -> str:
    out = subprocess.run(  # noqa: S603 -- fixed git argv in a temp repo
        ["git", "-c", "user.name=t", "-c", "user.email=t@example.invalid", *args],  # noqa: S607
        cwd=repo,
        check=True,
        capture_output=True,
        text=True,
    )
    return out.stdout.strip()


@pytest.fixture
def repo(tmp_path):
    """A repo at a commit that `origin/main` points to; web/build is gitignored as in the real one."""
    r = tmp_path / "repo"
    (r / "web" / "pages").mkdir(parents=True)
    (r / "web" / "pages" / "index.md").write_text("# hi\n", encoding="utf-8")
    (r / ".gitignore").write_text("web/build/\nweb/node_modules/\n", encoding="utf-8")
    _git(r, "init", "-q")
    _git(r, "add", "-A")
    _git(r, "commit", "-q", "-m", "init")
    _git(r, "update-ref", "refs/remotes/origin/main", "HEAD")
    return r


def _tree(repo: Path, rev: str = "HEAD") -> str:
    return _git(repo, "rev-parse", f"{rev}^{{tree}}")


def _run(repo: Path, *extra: str) -> int:
    return main(["--dry-run", "--no-fetch", "--min-pages", "3", *extra], repo=repo)


def test_dry_run_skip_path_when_build_tree_equals_main(repo, capsys):
    _fake_build(repo / "web", tree=_tree(repo))
    assert _run(repo) == 0
    out = capsys.readouterr().out
    assert "SKIP rebuild" in out
    assert "export-serving" not in out
    assert "run build" not in out
    assert "smoke check passed (3 HTML pages" in out
    assert "would run" in out and "deploy-gh-pages.sh" in out
    assert "nothing built or deployed" in out


def test_dry_run_skip_path_accepts_tree_equal_merge_commit(repo, capsys):
    """GitHub's develop->main merge commit has a new SHA but the develop tip's tree."""
    _fake_build(repo / "web", tree=_tree(repo))
    merge = _git(repo, "commit-tree", _tree(repo), "-p", "HEAD", "-m", "Merge develop")
    _git(repo, "update-ref", "refs/remotes/origin/main", merge)
    assert _run(repo) == 0
    out = capsys.readouterr().out
    assert "is tree-equal to origin/main" in out
    assert "SKIP rebuild" in out


def test_dry_run_rebuild_path_when_tree_differs(repo, capsys):
    build = _fake_build(repo / "web", tree=OTHER)
    before = sorted(p.relative_to(build) for p in build.rglob("*"))
    assert _run(repo) == 0
    out = capsys.readouterr().out
    assert "REBUILD: build tree bbbbbbbbbbbb != origin/main tree" in out
    for step in (
        "export-serving",
        "export-area-geojson",
        " ci`",
        "run sources",
        "run build",
        "deploy-gh-pages.sh",
    ):
        assert step in out, step
    assert "would run the smoke check" in out
    assert sorted(p.relative_to(build) for p in build.rglob("*")) == before  # nothing ran


def test_dry_run_rebuild_path_without_build_and_no_npm_ci_if_node_modules(repo, capsys):
    (repo / "web" / "node_modules").mkdir()
    assert _run(repo) == 0
    out = capsys.readouterr().out
    assert "REBUILD: web/build is missing or empty" in out
    assert " ci`" not in out
    assert "run build" in out


def test_force_rebuild_overrides_skip(repo, capsys):
    _fake_build(repo / "web", tree=_tree(repo))
    assert _run(repo, "--force-rebuild") == 0
    assert "REBUILD: --force-rebuild given" in capsys.readouterr().out


def test_refuses_when_head_not_at_main(repo, capsys):
    (repo / "web" / "pages" / "index.md").write_text("# changed\n", encoding="utf-8")
    _git(repo, "commit", "-q", "-am", "local only")
    assert _run(repo) == 1
    assert "is not at origin/main" in capsys.readouterr().err


def test_refuses_on_dirty_working_tree(repo, capsys):
    (repo / "web" / "pages" / "draft.md").write_text("# draft\n", encoding="utf-8")
    assert _run(repo) == 1
    err = capsys.readouterr().err
    assert "would leak into the build" in err and "web/pages/draft.md" in err


def test_refuses_without_origin_main(repo, capsys):
    _git(repo, "update-ref", "-d", "refs/remotes/origin/main")
    assert _run(repo) == 1
    assert "origin/main is not available locally" in capsys.readouterr().err


def test_smoke_failure_blocks_deploy_on_skip_path(repo, capsys):
    _fake_build(repo / "web", tree=_tree(repo), extra={"x/index.html": "cartocdn"})
    assert _run(repo) == 1
    captured = capsys.readouterr()
    assert "smoke check failed" in captured.err
    assert "deploy-gh-pages.sh" not in captured.out
