"""
tests/ops/test_release_deploy.py
=================================
#361: unit tests for `poe release-deploy` (ops/release_deploy.py), its shared provenance helpers
(ops/build_provenance.py) and the `poe build` warehouse-provenance wrapper (ops/dbt_build.py).

No real data, dbt, network or deploy. Pure helpers are tested on plain inputs.
`main(--dry-run --no-fetch)` runs against a throwaway git repo whose `origin/main` is a local ref
(`git update-ref`), with fake `data/serving` parquet, map GeoJSON and a `data/.warehouse-source`.
Covered:
  - SKIP when tree + inputs + warehouse all match, incl. a tree-equal merge commit;
  - REBUILD when the tree, the serving data, the GoatCounter code or the warehouse record changed,
    or the build has no inputs fingerprint;
  - refusal to rebuild when the warehouse wasn't built from origin/main's tree;
  - the precondition refusals (HEAD not at origin/main, dirty tree, origin/main missing);
  - Python/Node parity of the inputs fingerprint, via the real postbuild-build-source.mjs (skipped
    if `node` isn't on PATH).
Dry-run never executes a step, so neither `poe export-*`, `npm` nor `deploy-gh-pages.sh` runs.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
from pathlib import Path

import pytest

from ops import dbt_build
from ops.build_provenance import (
    BUILD_SOURCE_NAME,
    WAREHOUSE_SOURCE_REL,
    inputs_fingerprint,
    next_warehouse_record,
    relevant_dirty,
    warehouse_problem,
)
from ops.release_deploy import decide, main, smoke_check

REPO_ROOT = Path(__file__).resolve().parents[2]
TREE = "a" * 40
OTHER = "b" * 40
INPUTS = "f" * 64
WAREHOUSE = {"tree": TREE, "commit": "c" * 40, "clean": True, "complete": True, "recorded_at": "t"}


def _src(tree=TREE, dirty=False, inputs=INPUTS, warehouse=WAREHOUSE):
    return {
        "tree": tree,
        "commit": "c" * 40,
        "built_at": "2026-11-01T00:00:00Z",
        "dirty": dirty,
        "dirty_count": int(dirty),
        "inputs": inputs,
        "warehouse": warehouse,
    }


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


def test_relevant_dirty_warehouse_rule_only_counts_transform():
    lines = [
        " M docs/x.md",
        " M transform/models/a.sql",
        "?? transform/models/new.sql",
        "?? web/p.md",
    ]
    got = relevant_dirty(
        lines, tracked_prefixes=("transform/",), untracked_prefixes=("transform/",)
    )
    assert got == [" M transform/models/a.sql", "?? transform/models/new.sql"]


# --------------------------------------------------------------------------- decide


def _decide(src, *, present=True, force=False, inputs=INPUTS, warehouse=WAREHOUSE):
    return decide(
        src,
        TREE,
        build_present=present,
        force=force,
        current_inputs=inputs,
        current_warehouse=warehouse,
    )


def test_decide_skips_only_when_tree_inputs_and_warehouse_match():
    d = _decide(_src())
    assert not d.rebuild
    assert "== origin/main tree" in d.reason and "unchanged" in d.reason


@pytest.mark.parametrize(
    ("kwargs", "why"),
    [
        ({"force": True}, "--force-rebuild"),
        ({"present": False}, "missing or empty"),
        ({"inputs": "e" * 64}, "build inputs changed"),  # data changed since the build
        ({"warehouse": {**WAREHOUSE, "recorded_at": "later"}}, "warehouse record changed"),
    ],
)
def test_decide_rebuilds_on_changed_environment(kwargs, why):
    d = _decide(_src(), **kwargs)
    assert d.rebuild
    assert why in d.reason


@pytest.mark.parametrize(
    ("src", "why"),
    [
        (None, "missing or unreadable"),
        (_src(tree=None), "no source tree"),
        (_src(dirty=True), "dirty"),
        ({k: v for k, v in _src().items() if k != "dirty"}, "dirty"),  # absent `dirty` = unsafe
        (_src(tree=OTHER), "!= origin/main tree"),
        (_src(inputs=None), "no inputs fingerprint"),  # built before the fingerprint existed
        (_src(warehouse=None), "warehouse record changed"),
    ],
)
def test_decide_rebuilds_on_unproven_build(src, why):
    d = _decide(src)
    assert d.rebuild
    assert why in d.reason


def test_decide_rebuilds_when_warehouse_not_from_main():
    stale = {**WAREHOUSE, "tree": OTHER}
    d = _decide(_src(warehouse=stale), warehouse=stale)
    assert d.rebuild
    assert "warehouse built from tree bbbbbbbbbbbb" in d.reason


# --------------------------------------------------------------------------- warehouse record


def test_warehouse_problem():
    assert warehouse_problem(WAREHOUSE, TREE) is None
    assert "no data/.warehouse-source" in warehouse_problem(None, TREE)
    assert "not a complete one" in warehouse_problem({**WAREHOUSE, "complete": False}, TREE)
    assert "uncommitted" in warehouse_problem({**WAREHOUSE, "clean": False}, TREE)
    assert "warehouse built from tree" in warehouse_problem(WAREHOUSE, OTHER)


def _next(existing, rc=0, standard=True, tree=TREE, clean=True):
    return next_warehouse_record(
        existing, tree=tree, commit="c", clean=clean, returncode=rc, standard=standard, now="n"
    )


def test_next_warehouse_record_full_build_certifies():
    assert _next(None) == {
        "tree": TREE,
        "commit": "c",
        "clean": True,
        "recorded_at": "n",
        "complete": True,
    }
    assert _next(None, clean=False)["clean"] is False


def test_next_warehouse_record_partial_build_same_tree_keeps_certificate():
    assert _next(WAREHOUSE, standard=False) is None


@pytest.mark.parametrize(
    ("kwargs", "reason"),
    [
        ({"standard": False, "tree": OTHER}, "partial"),  # --select on another tree
        ({"standard": False, "clean": False}, "partial"),
        ({"rc": 1}, "exited 1"),  # failed full build
        ({"rc": 1, "standard": False}, "exited 1"),
    ],
)
def test_next_warehouse_record_voids_otherwise(kwargs, reason):
    rec = _next(WAREHOUSE, **kwargs)
    assert rec["complete"] is False
    assert reason in rec["reason"]


# --------------------------------------------------------------------------- smoke_check


def _fake_build(web: Path, pages: int = 3, extra: dict | None = None, **src) -> Path:
    build = web / "build"
    for i in range(pages):
        page = build / f"p{i}" / "index.html"
        page.parent.mkdir(parents=True, exist_ok=True)
        page.write_text("<html><head></head><body>ok</body></html>", encoding="utf-8")
    (build / "_app").mkdir(parents=True, exist_ok=True)
    (build / "_app" / "app.js").write_text("console.log('hi')", encoding="utf-8")
    (build / BUILD_SOURCE_NAME).write_text(json.dumps(_src(**src)), encoding="utf-8")
    for rel, text in (extra or {}).items():
        (build / rel).parent.mkdir(parents=True, exist_ok=True)
        (build / rel).write_text(text, encoding="utf-8")
    return build


def _smoke(build, min_pages=1, inputs=INPUTS, warehouse=WAREHOUSE):
    return smoke_check(
        build, main_tree=TREE, min_pages=min_pages, expected_inputs=inputs, warehouse=warehouse
    )


def test_smoke_check_passes_on_good_build(tmp_path):
    assert _smoke(_fake_build(tmp_path), min_pages=3) == []


def test_smoke_check_fails_on_missing_build(tmp_path):
    assert _smoke(tmp_path / "nope")


def test_smoke_check_fails_on_too_few_pages(tmp_path):
    problems = _smoke(_fake_build(tmp_path, pages=2), min_pages=3)
    assert any("only 2 HTML page" in p for p in problems)


def test_smoke_check_fails_on_cartocdn(tmp_path):
    build = _fake_build(
        tmp_path, extra={"_app/chunk.js": "fetch('https://a.basemaps.cartocdn.com')"}
    )
    assert _smoke(build) == ["_app/chunk.js contains 'cartocdn'"]


def test_smoke_check_ignores_binary_assets(tmp_path):
    assert _smoke(_fake_build(tmp_path, extra={"data/x.parquet": "cartocdn"})) == []


def test_smoke_check_fails_on_tree_mismatch(tmp_path):
    problems = _smoke(_fake_build(tmp_path, tree=OTHER))
    assert any("does not match origin/main" in p for p in problems)


def test_smoke_check_fails_on_inputs_mismatch(tmp_path):
    problems = _smoke(_fake_build(tmp_path), inputs="e" * 64)
    assert any("!= current inputs" in p for p in problems)


def test_smoke_check_fails_on_warehouse_mismatch(tmp_path):
    stale = {**WAREHOUSE, "tree": OTHER}
    problems = _smoke(_fake_build(tmp_path, warehouse=stale), warehouse=stale)
    assert any("warehouse built from tree" in p for p in problems)


# --------------------------------------------------------------------------- inputs fingerprint


def _write_inputs(repo: Path, parquet: bytes = b"PAR1-v1") -> None:
    serving = repo / "data" / "serving"
    serving.mkdir(parents=True, exist_ok=True)
    (serving / "gentrification_index.parquet").write_bytes(parquet)
    (serving / "notes.txt").write_text("not an input", encoding="utf-8")
    geo = repo / "web" / "static" / "geo" / "berlin"
    geo.mkdir(parents=True, exist_ok=True)
    (geo / "plr.geojson").write_text('{"type":"FeatureCollection","features":[]}', encoding="utf-8")


def test_fingerprint_tracks_parquet_geo_and_goatcounter(tmp_path):
    _write_inputs(tmp_path)
    base = inputs_fingerprint(tmp_path, env={})
    assert inputs_fingerprint(tmp_path, env={}) == base  # deterministic
    (tmp_path / "data" / "serving" / "notes.txt").write_text("changed", encoding="utf-8")
    assert inputs_fingerprint(tmp_path, env={}) == base  # non-parquet in serving ignored
    assert inputs_fingerprint(tmp_path, env={"GOATCOUNTER_CODE": "x"}) != base
    _write_inputs(tmp_path, parquet=b"PAR1-v2")
    assert inputs_fingerprint(tmp_path, env={}) != base
    _write_inputs(tmp_path)
    (tmp_path / "web" / "static" / "geo" / "hamburg.geojson").write_text("{}", encoding="utf-8")
    assert inputs_fingerprint(tmp_path, env={}) != base


def test_fingerprint_goatcounter_file_vs_env(tmp_path):
    (tmp_path / "web").mkdir()
    (tmp_path / "web" / "goatcounter-code.txt").write_text("abc\n", encoding="utf-8")
    from_file = inputs_fingerprint(tmp_path, env={})
    assert inputs_fingerprint(tmp_path, env={"GOATCOUNTER_CODE": "abc"}) == from_file
    assert inputs_fingerprint(tmp_path, env={"GOATCOUNTER_CODE": ""}) == from_file  # empty = unset


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


def _tree(repo: Path, rev: str = "HEAD") -> str:
    return _git(repo, "rev-parse", f"{rev}^{{tree}}")


@pytest.fixture
def repo(tmp_path, monkeypatch):
    """A repo at a commit `origin/main` points to, with gitignored data/ and web/build/ as in the
    real one, fake serving inputs, and a warehouse record certifying origin/main's tree."""
    monkeypatch.delenv("GOATCOUNTER_CODE", raising=False)
    r = tmp_path / "repo"
    (r / "web" / "pages").mkdir(parents=True)
    (r / "web" / "pages" / "index.md").write_text("# hi\n", encoding="utf-8")
    (r / "web" / "goatcounter-code.txt").write_text("gentriduck\n", encoding="utf-8")
    (r / ".gitignore").write_text(
        "data/\nweb/build/\nweb/node_modules/\nweb/static/geo/\n", encoding="utf-8"
    )
    _git(r, "init", "-q")
    _git(r, "add", "-A")
    _git(r, "commit", "-q", "-m", "init")
    _git(r, "update-ref", "refs/remotes/origin/main", "HEAD")
    _write_inputs(r)
    _write_warehouse(r, tree=_tree(r))
    return r


def _write_warehouse(repo: Path, **overrides) -> dict:
    rec = {**WAREHOUSE, **overrides}
    (repo / WAREHOUSE_SOURCE_REL).write_text(json.dumps(rec), encoding="utf-8")
    return rec


def _good_build(repo: Path, **src) -> Path:
    """A build whose .build-source matches the repo's current tree, inputs and warehouse."""
    warehouse = json.loads((repo / WAREHOUSE_SOURCE_REL).read_text(encoding="utf-8"))
    fields = {"tree": _tree(repo), "inputs": inputs_fingerprint(repo), "warehouse": warehouse}
    return _fake_build(repo / "web", **{**fields, **src})


def _run(repo: Path, *extra: str) -> int:
    return main(["--dry-run", "--no-fetch", "--min-pages", "3", *extra], repo=repo)


def test_dry_run_skip_path_when_tree_inputs_and_warehouse_match(repo, capsys):
    _good_build(repo)
    assert _run(repo) == 0
    out = capsys.readouterr().out
    assert "SKIP rebuild" in out
    assert "export-serving" not in out and "run build" not in out
    assert "smoke check passed (3 HTML pages" in out
    assert "would run" in out and "deploy-gh-pages.sh" in out
    assert "nothing built or deployed" in out


def test_leading_double_dash_is_accepted(repo, capsys):
    _good_build(repo)
    assert main(["--", "--dry-run", "--no-fetch", "--min-pages", "3"], repo=repo) == 0
    assert "SKIP rebuild" in capsys.readouterr().out


def test_dry_run_skip_path_accepts_tree_equal_merge_commit(repo, capsys):
    """GitHub's develop->main merge commit has a new SHA but the develop tip's tree."""
    _good_build(repo)
    merge = _git(repo, "commit-tree", _tree(repo), "-p", "HEAD", "-m", "Merge develop")
    _git(repo, "update-ref", "refs/remotes/origin/main", merge)
    assert _run(repo) == 0
    out = capsys.readouterr().out
    assert "is tree-equal to origin/main" in out
    assert "SKIP rebuild" in out


def test_dry_run_rebuilds_when_serving_data_changed(repo, capsys):
    """The reviewer's repro: a new parquet vintage after the build must not deploy the old build."""
    build = _good_build(repo)
    _write_inputs(repo, parquet=b"PAR1-new-vintage")
    before = sorted(p.relative_to(build) for p in build.rglob("*"))
    assert _run(repo) == 0
    out = capsys.readouterr().out
    assert "REBUILD: build inputs changed since the build" in out
    for step in ("export-serving", "export-area-geojson", " ci`", "run sources", "run build"):
        assert step in out, step
    assert "would run the smoke check" in out
    assert sorted(p.relative_to(build) for p in build.rglob("*")) == before  # nothing ran


def test_dry_run_rebuilds_when_goatcounter_override_set(repo, capsys, monkeypatch):
    _good_build(repo)
    monkeypatch.setenv("GOATCOUNTER_CODE", "other-site")
    assert _run(repo) == 0
    assert "REBUILD: build inputs changed" in capsys.readouterr().out


def test_dry_run_rebuilds_build_without_fingerprint(repo, capsys):
    _good_build(repo, inputs=None)
    assert _run(repo) == 0
    assert "REBUILD: .build-source has no inputs fingerprint" in capsys.readouterr().out


def test_dry_run_rebuilds_when_tree_differs(repo, capsys):
    _good_build(repo, tree=OTHER)
    assert _run(repo) == 0
    out = capsys.readouterr().out
    assert "REBUILD: build tree bbbbbbbbbbbb != origin/main tree" in out
    assert "deploy-gh-pages.sh" in out


def test_dry_run_rebuilds_when_warehouse_rebuilt_since(repo, capsys):
    _good_build(repo)
    _write_warehouse(repo, tree=_tree(repo), recorded_at="later")
    assert _run(repo) == 0
    assert "REBUILD: the warehouse record changed" in capsys.readouterr().out


def test_no_npm_ci_if_node_modules_present(repo, capsys):
    (repo / "web" / "node_modules").mkdir()
    assert _run(repo) == 0
    out = capsys.readouterr().out
    assert "REBUILD: web/build is missing or empty" in out
    assert " ci`" not in out
    assert "run build" in out


def test_force_rebuild_overrides_skip(repo, capsys):
    _good_build(repo)
    assert _run(repo, "--force-rebuild") == 0
    assert "REBUILD: --force-rebuild given" in capsys.readouterr().out


@pytest.mark.parametrize(
    ("warehouse", "why"),
    [
        ({"tree": OTHER}, "warehouse built from tree bbbbbbbbbbbb"),
        ({"complete": False, "reason": "partial/non-standard dbt build"}, "not a complete one"),
        ({"clean": False}, "uncommitted transform/ edits"),
        (None, "no data/.warehouse-source"),
    ],
)
def test_refuses_rebuild_when_warehouse_not_built_from_main(repo, capsys, warehouse, why):
    if warehouse is None:
        (repo / WAREHOUSE_SOURCE_REL).unlink()
    else:
        _write_warehouse(repo, **{"tree": _tree(repo), **warehouse})
    assert _run(repo) == 1
    captured = capsys.readouterr()
    assert "REBUILD" in captured.out
    assert "refusing to rebuild" in captured.err and why in captured.err
    assert "Run `uv run poe build` on main first" in captured.err
    assert "would run" not in captured.out  # no step, no deploy


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
    _good_build(repo, extra={"x/index.html": "cartocdn"})
    assert _run(repo) == 1
    captured = capsys.readouterr()
    assert "smoke check failed" in captured.err
    assert "deploy-gh-pages.sh" not in captured.out


# --------------------------------------------------------------------------- dbt_build.record


def test_dbt_build_record_writes_keeps_and_voids(repo):
    path = repo / WAREHOUSE_SOURCE_REL
    path.unlink()
    dbt_build.record(repo, 0, ["--full-refresh"])
    rec = json.loads(path.read_text(encoding="utf-8"))
    assert rec["tree"] == _tree(repo) and rec["complete"] and rec["clean"]
    dbt_build.record(repo, 0, ["--select", "x+"])  # partial build of the same clean tree
    assert json.loads(path.read_text(encoding="utf-8")) == rec
    dbt_build.record(repo, 1, [])  # failed build
    assert json.loads(path.read_text(encoding="utf-8"))["complete"] is False


def test_dbt_build_record_marks_uncommitted_transform_edits(repo):
    (repo / "transform").mkdir()
    (repo / "transform" / "new_model.sql").write_text("select 1\n", encoding="utf-8")
    dbt_build.record(repo, 0, [])
    rec = json.loads((repo / WAREHOUSE_SOURCE_REL).read_text(encoding="utf-8"))
    assert rec["complete"] and rec["clean"] is False


# --------------------------------------------------------------------------- Node parity (e2e)


@pytest.mark.skipif(shutil.which("node") is None, reason="node not on PATH")
def test_postbuild_mjs_matches_python_and_enables_skip(repo, capsys):
    """Run the real web/scripts/postbuild-build-source.mjs in the temp repo, then check that its
    fingerprint equals Python's and that release-deploy SKIPs on the result, then REBUILDs after
    the serving data changes."""
    scripts = repo / "web" / "scripts"
    scripts.mkdir()
    shutil.copy(REPO_ROOT / "web" / "scripts" / "postbuild-build-source.mjs", scripts)
    _git(repo, "add", "-A")
    _git(repo, "commit", "-q", "-m", "add postbuild")
    _git(repo, "update-ref", "refs/remotes/origin/main", "HEAD")
    _write_warehouse(repo, tree=_tree(repo))
    _fake_build(repo / "web")  # pages; .build-source gets overwritten by the script below
    env = {k: v for k, v in os.environ.items() if k != "GOATCOUNTER_CODE"}
    subprocess.run(  # noqa: S603 -- fixed argv
        [shutil.which("node"), str(scripts / "postbuild-build-source.mjs")],
        cwd=repo / "web",
        check=True,
        env=env,
        capture_output=True,
    )
    src = json.loads((repo / "web" / "build" / BUILD_SOURCE_NAME).read_text(encoding="utf-8"))
    assert src["inputs"] == inputs_fingerprint(repo, env={})
    assert src["tree"] == _tree(repo) and src["dirty"] is False and src["dirty_count"] == 0
    assert "dirty_paths" not in src  # not published
    assert src["warehouse"] == json.loads((repo / WAREHOUSE_SOURCE_REL).read_text(encoding="utf-8"))

    assert _run(repo) == 0
    assert "SKIP rebuild" in capsys.readouterr().out
    _write_inputs(repo, parquet=b"PAR1-new-vintage")
    assert _run(repo) == 0
    assert "REBUILD: build inputs changed" in capsys.readouterr().out
