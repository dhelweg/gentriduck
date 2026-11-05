"""
tests/ops/test_release_deploy.py
=================================
#361: unit tests for `poe release-deploy` (ops/release_deploy.py), its shared provenance helpers
(ops/build_provenance.py) and the `poe build` warehouse-provenance wrapper (ops/dbt_build.py).

No real data, dbt, network or deploy. Pure helpers are tested on plain inputs.
`main(--dry-run --no-fetch)` runs against a throwaway git repo whose `origin/main` is a local ref
(`git update-ref`), with fake `data/serving` parquet, map GeoJSON, a `data/.warehouse-source` and
export stamps. Covered:
  - SKIP when tree + inputs match and the build's data was exported from a warehouse certified
    for origin/main, incl. a tree-equal merge commit and a later unrelated `poe build`;
  - REBUILD when the tree, the serving data or the GoatCounter code changed, the build has no
    inputs fingerprint or export stamps, or its data was exported from another tree's warehouse;
  - refusal to rebuild when the CURRENT warehouse wasn't built from origin/main's tree;
  - the precondition refusals (HEAD not at origin/main, dirty tree, origin/main missing);
  - `poe build` provenance: in-progress voiding (incl. an interrupted build), args classification;
  - Python/Node parity of the inputs fingerprint and the embedded export stamps, via the real
    postbuild-build-source.mjs (skipped if `node` isn't on PATH);
  - #369, via the real web/scripts/sources-stamp.mjs (npm `presources`/`postsources`) and
    postbuild-build-source.mjs: the issue's scenario (sources on F, export + build on T) and a
    sources-time serving fingerprint that differs from the live one both REBUILD, as do partial
    sources runs, a non-strict run with a failed query (dropped from the manifest), a
    failed/killed run, extracted data changed afterwards, a dirty-tree run, EVIDENCE_DATA_DIR in
    web/.env* and a build without a sources record; the embedded serving export stamp is the
    sources-time one; the release rebuild runs `sources:strict`; `poe build --help`/`--version`
    leave the warehouse record.
Dry-run never executes a step, so neither `poe export-*`, `npm` nor `deploy-gh-pages.sh` runs.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import time
from pathlib import Path

import pytest

from ops import dbt_build
from ops.build_provenance import (
    BUILD_SOURCE_NAME,
    GEO_STAMP_REL,
    SERVING_STAMP_REL,
    WAREHOUSE_SOURCE_REL,
    classify_dbt_args,
    clear_export_stamp,
    export_problem,
    inputs_fingerprint,
    next_warehouse_record,
    read_json,
    relevant_dirty,
    warehouse_problem,
    write_export_stamp,
)
from ops.release_deploy import decide, exports_problem, main, smoke_check

REPO_ROOT = Path(__file__).resolve().parents[2]
TREE = "a" * 40
OTHER = "b" * 40
INPUTS = "f" * 64
WAREHOUSE = {"tree": TREE, "commit": "c" * 40, "clean": True, "complete": True, "recorded_at": "t"}


def _stamp(warehouse=WAREHOUSE):
    return {"warehouse": warehouse, "source": WAREHOUSE_SOURCE_REL, "exported_at": "t"}


def _exports(warehouse=WAREHOUSE):
    return {"serving": _stamp(warehouse), "geo": _stamp(warehouse)}


SOURCES = {
    "complete": True,
    "tree": TREE,
    "dirty": False,
    "serving": "s" * 64,
    "extracted": "x" * 64,
}


def _src(
    tree=TREE, dirty=False, inputs=INPUTS, exports=None, sources=SOURCES, sources_problem=None
):
    return {
        "tree": tree,
        "commit": "c" * 40,
        "built_at": "2026-11-01T00:00:00Z",
        "dirty": dirty,
        "dirty_count": int(dirty),
        "inputs": inputs,
        "exports": _exports() if exports is None else exports,
        "sources": sources,
        "sources_problem": sources_problem,
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


def _decide(src, *, present=True, force=False, inputs=INPUTS):
    return decide(src, TREE, build_present=present, force=force, current_inputs=inputs)


def test_decide_skips_when_tree_inputs_and_export_stamps_match():
    d = _decide(_src())
    assert not d.rebuild
    assert "== origin/main tree" in d.reason and "unchanged" in d.reason


@pytest.mark.parametrize(
    ("kwargs", "why"),
    [
        ({"force": True}, "--force-rebuild"),
        ({"present": False}, "missing or empty"),
        ({"inputs": "e" * 64}, "build inputs changed"),  # data changed since the build
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
        ({k: v for k, v in _src().items() if k != "exports"}, "no export stamps"),
        (_src(exports={"serving": _stamp()}), "no geo export stamp"),
        (_src(exports={"serving": _stamp(None), "geo": _stamp()}), "serving export: no data/"),
        # #369: the build can't vouch for the mart data `npm run sources` extracted
        ({k: v for k, v in _src().items() if k != "sources"}, "no complete `npm run sources`"),
        (_src(sources=None), "no complete `npm run sources` record (built before #369?)"),
        (_src(sources={**SOURCES, "complete": False}), "no complete `npm run sources`"),
        (
            _src(inputs=None, sources_problem="data/serving changed since npm run sources"),
            "the bundled mart data is unproven: data/serving changed since npm run sources",
        ),
    ],
)
def test_decide_rebuilds_on_unproven_build(src, why):
    d = _decide(src)
    assert d.rebuild
    assert why in d.reason


def test_decide_rebuilds_when_exported_from_other_tree_even_if_warehouse_recertified():
    """Re-review MED 2: data exported from warehouse F; the warehouse was later re-certified for
    T (= origin/main). The build still holds F's data, so it must rebuild."""
    from_f = {**WAREHOUSE, "tree": OTHER}
    d = _decide(_src(exports=_exports(from_f)))
    assert d.rebuild
    assert "serving export: warehouse built from tree bbbbbbbbbbbb" in d.reason


def test_export_problem():
    assert export_problem(_stamp(), TREE, "serving") is None
    assert "no geo export stamp" in export_problem(None, TREE, "geo")
    assert "not a complete one" in export_problem(
        _stamp({**WAREHOUSE, "complete": False}), TREE, "geo"
    )


# --------------------------------------------------------------------------- warehouse record


def test_warehouse_problem():
    assert warehouse_problem(WAREHOUSE, TREE) is None
    assert "no data/.warehouse-source" in warehouse_problem(None, TREE)
    assert "not a complete one" in warehouse_problem({**WAREHOUSE, "complete": False}, TREE)
    assert "uncommitted" in warehouse_problem({**WAREHOUSE, "clean": False}, TREE)
    assert "warehouse built from tree" in warehouse_problem(WAREHOUSE, OTHER)


@pytest.mark.parametrize(
    ("args", "kind"),
    [
        ([], "full"),
        (["--full-refresh"], "full"),
        (["--fail-fast", "--threads", "4"], "full"),
        (["--threads=8", "--full-refresh"], "full"),
        (["--select", "int_gentrification_ts+", "mart_x"], "partial"),
        (["-s", "a", "--full-refresh"], "partial"),
        (["--select=a+", "--exclude", "b"], "partial"),
        (["-m", "a"], "partial"),
        (["--vars", "{bw: 500}"], "void"),
        (["--target", "prod"], "void"),
        (["--select", "a", "--defer", "--state", "target/"], "void"),
        (["--full-refresh", "stray"], "void"),
        (["--help"], "void"),
    ],
)
def test_classify_dbt_args(args, kind):
    assert classify_dbt_args(args) == kind


def _next(existing, rc=0, kind="full", tree=TREE, clean=True):
    return next_warehouse_record(
        existing, tree=tree, commit="c", clean=clean, returncode=rc, kind=kind, now="n"
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
    assert _next(WAREHOUSE, kind="partial") is WAREHOUSE


@pytest.mark.parametrize(
    ("kwargs", "reason"),
    [
        ({"kind": "partial", "tree": OTHER}, "partial"),  # --select on another tree
        ({"kind": "partial", "clean": False}, "partial"),
        ({"kind": "void"}, "change what or where"),  # --vars/--target/... on the same tree
        ({"rc": 1}, "exited 1"),  # failed full build
        ({"rc": 1, "kind": "partial"}, "exited 1"),
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


def _smoke(build, min_pages=1, inputs=INPUTS):
    return smoke_check(build, main_tree=TREE, min_pages=min_pages, expected_inputs=inputs)


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


def test_smoke_check_fails_without_sources_record(tmp_path):
    """#369: a fresh build must carry a complete sources record, or nothing is deployed."""
    problems = _smoke(_fake_build(tmp_path, sources=None))
    assert any("no complete `npm run sources` record" in p for p in problems)
    problems = _smoke(_fake_build(tmp_path, sources_problem="no web/.sources-source"))
    assert any("unproven: no web/.sources-source" in p for p in problems)


def test_smoke_check_fails_on_export_stamp_from_other_tree(tmp_path):
    build = _fake_build(tmp_path, exports=_exports({**WAREHOUSE, "tree": OTHER}))
    problems = _smoke(build)
    assert any("export: warehouse built from tree" in p for p in problems)


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
    write_export_stamp(tmp_path, SERVING_STAMP_REL, WAREHOUSE, source="x")
    assert inputs_fingerprint(tmp_path, env={}) == base  # non-parquet in serving (incl. stamp)
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


def test_export_stamp_write_and_clear(tmp_path):
    write_export_stamp(tmp_path, GEO_STAMP_REL, WAREHOUSE, source=SERVING_STAMP_REL)
    stamp = read_json(tmp_path / GEO_STAMP_REL)
    assert stamp["warehouse"] == WAREHOUSE and stamp["source"] == SERVING_STAMP_REL
    clear_export_stamp(tmp_path, GEO_STAMP_REL)
    clear_export_stamp(tmp_path, GEO_STAMP_REL)  # idempotent
    assert not (tmp_path / GEO_STAMP_REL).exists()


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


def _write_warehouse(repo: Path, **overrides) -> dict:
    rec = {**WAREHOUSE, **overrides}
    (repo / WAREHOUSE_SOURCE_REL).write_text(json.dumps(rec), encoding="utf-8")
    return rec


def _export(repo: Path) -> None:
    """What export-serving + export-area-geojson do to the stamps."""
    warehouse = read_json(repo / WAREHOUSE_SOURCE_REL)
    write_export_stamp(repo, SERVING_STAMP_REL, warehouse, source=WAREHOUSE_SOURCE_REL)
    write_export_stamp(repo, GEO_STAMP_REL, warehouse, source=SERVING_STAMP_REL)


@pytest.fixture
def repo(tmp_path, monkeypatch):
    """A repo at a commit `origin/main` points to, with gitignored data/ and web/build/ as in the
    real one, fake serving inputs exported from a warehouse certified for origin/main's tree."""
    monkeypatch.delenv("GOATCOUNTER_CODE", raising=False)
    r = tmp_path / "repo"
    (r / "web" / "pages").mkdir(parents=True)
    (r / "web" / "pages" / "index.md").write_text("# hi\n", encoding="utf-8")
    (r / "web" / "goatcounter-code.txt").write_text("gentriduck\n", encoding="utf-8")
    (r / ".gitignore").write_text(
        "data/\nweb/build/\nweb/node_modules/\nweb/static/geo/\n"
        "web/.evidence/\nweb/.sources-source\nweb/.env\nweb/.env.local\n",
        encoding="utf-8",
    )
    _git(r, "init", "-q")
    _git(r, "add", "-A")
    _git(r, "commit", "-q", "-m", "init")
    _git(r, "update-ref", "refs/remotes/origin/main", "HEAD")
    _write_inputs(r)
    _write_warehouse(r, tree=_tree(r))
    _export(r)
    return r


def _good_build(repo: Path, **src) -> Path:
    """A build whose .build-source matches the repo's tree, inputs and export stamps."""
    exports = {
        "serving": read_json(repo / SERVING_STAMP_REL),
        "geo": read_json(repo / GEO_STAMP_REL),
    }
    fields = {"tree": _tree(repo), "inputs": inputs_fingerprint(repo), "exports": exports}
    return _fake_build(repo / "web", **{**fields, **src})


def _run(repo: Path, *extra: str) -> int:
    return main(["--dry-run", "--no-fetch", "--min-pages", "3", *extra], repo=repo)


def test_dry_run_skip_path_when_tree_inputs_and_exports_match(repo, capsys):
    _good_build(repo)
    assert _run(repo) == 0
    out = capsys.readouterr().out
    assert "SKIP rebuild" in out
    assert "export-serving" not in out and "run build" not in out
    assert "smoke check passed (3 HTML pages" in out
    assert "would run" in out and "deploy-gh-pages.sh" in out
    assert "nothing built or deployed" in out


def test_skip_survives_unrelated_later_poe_build(repo, capsys):
    """Re-review MED 2: e.g. the pre-push hook re-runs `poe build` on the same tree after the web
    build. The warehouse record's recorded_at changes, but the exported data didn't, so SKIP."""
    _good_build(repo)
    _write_warehouse(repo, tree=_tree(repo), recorded_at="much later")
    assert _run(repo) == 0
    assert "SKIP rebuild" in capsys.readouterr().out


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
    """The first review's repro: a new parquet vintage after the build must not deploy the old one."""
    build = _good_build(repo)
    _write_inputs(repo, parquet=b"PAR1-new-vintage")
    before = sorted(p.relative_to(build) for p in build.rglob("*"))
    assert _run(repo) == 0
    out = capsys.readouterr().out
    assert "REBUILD: build inputs changed since the build" in out
    steps = ("export-serving", "export-area-geojson", " ci`", "run sources:strict", "run build")
    for step in steps:
        assert step in out, step
    assert "would run the smoke check" in out
    assert sorted(p.relative_to(build) for p in build.rglob("*")) == before  # nothing ran


def test_dry_run_rebuilds_when_exported_from_f_and_warehouse_recertified_t(repo, capsys):
    """Re-review MED 2: the build's data came from warehouse F; the warehouse is now certified for
    T = origin/main. REBUILD (re-export from T); the current-warehouse check then passes."""
    _write_warehouse(repo, tree=OTHER)  # warehouse F
    _export(repo)  # data exported from F
    _good_build(repo)  # build embeds F's stamps
    _write_warehouse(repo, tree=_tree(repo), recorded_at="later")  # re-certified for T
    assert _run(repo) == 0
    out = capsys.readouterr().out
    assert "REBUILD: serving export: warehouse built from tree bbbbbbbbbbbb" in out
    assert "export-serving" in out and "deploy-gh-pages.sh" in out


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
        ({"complete": False, "reason": "dbt build in progress"}, "not a complete one"),
        ({"clean": False}, "uncommitted transform/ edits"),
        (None, "no data/.warehouse-source"),
    ],
)
def test_refuses_rebuild_when_current_warehouse_not_from_main(repo, capsys, warehouse, why):
    if warehouse is None:
        (repo / WAREHOUSE_SOURCE_REL).unlink()
    else:
        _write_warehouse(repo, **{"tree": _tree(repo), **warehouse})
    assert _run(repo) == 1  # no web/build -> REBUILD -> current-warehouse check refuses
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


# --------------------------------------------------------------------------- dbt_build


def _warehouse_file(repo: Path) -> dict:
    return json.loads((repo / WAREHOUSE_SOURCE_REL).read_text(encoding="utf-8"))


def _fake_dbt(monkeypatch, behaviour):
    """Patch subprocess.run so only the dbt call is faked; git calls still run for real."""
    real_run = subprocess.run

    def fake(cmd, *args, **kwargs):
        if cmd and cmd[0] == "git":
            return real_run(cmd, *args, **kwargs)
        return behaviour(cmd)

    monkeypatch.setattr(subprocess, "run", fake)


def test_dbt_build_marks_in_progress_before_dbt_runs(repo, monkeypatch):
    monkeypatch.setattr(dbt_build, "REPO_ROOT", repo)
    seen = {}

    def dbt(cmd):
        seen["during"] = _warehouse_file(repo)
        seen["cmd"] = cmd
        return subprocess.CompletedProcess(cmd, 0)

    _fake_dbt(monkeypatch, dbt)
    assert dbt_build.main(["--full-refresh"]) == 0
    assert seen["during"]["complete"] is False
    assert seen["during"]["reason"] == "dbt build in progress"
    assert seen["cmd"][1:] == [
        "build", "--project-dir", "transform", "--profiles-dir", "transform", "--full-refresh"
    ]  # fmt: skip
    final = _warehouse_file(repo)
    assert final["complete"] is True and final["tree"] == _tree(repo)


def test_dbt_build_interrupted_leaves_void_record(repo, monkeypatch):
    """Re-review HIGH 1: a killed/interrupted build must not leave `complete: true` behind."""
    monkeypatch.setattr(dbt_build, "REPO_ROOT", repo)
    assert _warehouse_file(repo)["complete"] is True  # a valid certificate before the run

    def dbt(cmd):
        raise KeyboardInterrupt

    _fake_dbt(monkeypatch, dbt)
    with pytest.raises(KeyboardInterrupt):
        dbt_build.main([])
    rec = _warehouse_file(repo)
    assert rec["complete"] is False
    assert rec["reason"] == "dbt build in progress"


def test_dbt_build_partial_same_tree_restores_certificate(repo, monkeypatch):
    monkeypatch.setattr(dbt_build, "REPO_ROOT", repo)
    before = _warehouse_file(repo)
    _fake_dbt(monkeypatch, lambda cmd: subprocess.CompletedProcess(cmd, 0))
    assert dbt_build.main(["--select", "x+"]) == 0
    assert _warehouse_file(repo) == before


@pytest.mark.parametrize(
    ("args", "rc", "reason"),
    [
        ([], 1, "exited 1"),
        (["--vars", "{a: 1}"], 0, "change what or where"),
        (["--target", "prod"], 0, "change what or where"),
    ],
)
def test_dbt_build_voids_on_failure_or_void_args(repo, monkeypatch, args, rc, reason):
    monkeypatch.setattr(dbt_build, "REPO_ROOT", repo)
    _fake_dbt(monkeypatch, lambda cmd: subprocess.CompletedProcess(cmd, rc))
    assert dbt_build.main(args) == rc  # dbt's exit code is passed through
    rec = _warehouse_file(repo)
    assert rec["complete"] is False and reason in rec["reason"]


def test_dbt_build_record_failure_never_masks_dbt_rc(repo, monkeypatch):
    monkeypatch.setattr(dbt_build, "REPO_ROOT", repo)
    _fake_dbt(monkeypatch, lambda cmd: subprocess.CompletedProcess(cmd, 3))

    def boom(*a, **k):
        raise RuntimeError("disk on fire")

    monkeypatch.setattr(dbt_build, "finish", boom)
    assert dbt_build.main([]) == 3


@pytest.mark.parametrize("args", [["--help"], ["-h"], ["--version"], ["--select", "x", "--help"]])
def test_dbt_build_help_and_version_leave_record_alone(repo, monkeypatch, args):
    """#369 (low): `poe build --help` builds nothing, so it must not void the certificate."""
    monkeypatch.setattr(dbt_build, "REPO_ROOT", repo)
    before = (repo / WAREHOUSE_SOURCE_REL).read_bytes()
    seen = []
    _fake_dbt(monkeypatch, lambda cmd: seen.append(cmd) or subprocess.CompletedProcess(cmd, 0))
    assert dbt_build.main(args) == 0
    assert seen and seen[0][-len(args) :] == args  # dbt still ran with the args
    assert (repo / WAREHOUSE_SOURCE_REL).read_bytes() == before


def test_dbt_build_marks_uncommitted_transform_edits(repo, monkeypatch):
    monkeypatch.setattr(dbt_build, "REPO_ROOT", repo)
    (repo / "transform").mkdir()
    (repo / "transform" / "new_model.sql").write_text("select 1\n", encoding="utf-8")
    _fake_dbt(monkeypatch, lambda cmd: subprocess.CompletedProcess(cmd, 0))
    assert dbt_build.main([]) == 0
    rec = _warehouse_file(repo)
    assert rec["complete"] and rec["clean"] is False


# --------------------------------------------------------------------------- Node (e2e)
#
# The real web/scripts/*.mjs run in the temp repo. `_npm_sources()` stands in for
# `npm run sources`: the presources hook, what `evidence sources` writes into
# web/.evidence/template/static/data (one parquet per query, derived from data/serving, plus
# manifest.json), then the postsources hook. `_npm_build()` stands in for `npm run build`: pages,
# then postbuild-build-source.mjs. Neither runs Evidence.

NODE = shutil.which("node")
needs_node = pytest.mark.skipif(NODE is None, reason="node not on PATH")
WEB_SCRIPTS = ("build-provenance.mjs", "sources-stamp.mjs", "postbuild-build-source.mjs")
QUERIES = ("gentrification_index", "mart_area_demographics")
SOURCES_REC = "web/.sources-source"
UNPROVEN = "REBUILD: .build-source: the bundled mart data is unproven: "


def _node(repo: Path, script: str, *args: str) -> subprocess.CompletedProcess:
    drop = ("GOATCOUNTER_CODE", "EVIDENCE_DATA_DIR")
    env = {k: v for k, v in os.environ.items() if k not in drop}
    return subprocess.run(  # noqa: S603 -- fixed argv
        [NODE, str(repo / "web" / "scripts" / script), *args],
        cwd=repo / "web",
        check=True,
        env=env,
        capture_output=True,
        text=True,
    )


def _data_dir(repo: Path) -> Path:
    return repo / "web" / ".evidence" / "template" / "static" / "data"


def _extracted(repo: Path, query: str) -> Path:
    return _data_dir(repo) / "gentriduck_marts" / query / f"{query}.parquet"


def _age_extracted(repo: Path) -> None:
    """Make every extracted file an hour old: the previous sources run happened earlier."""
    old = time.time() - 3600
    for path in _data_dir(repo).rglob("*"):
        if path.is_file():
            os.utime(path, (old, old))


def _npm_sources(
    repo: Path,
    *,
    only: tuple[str, ...] | None = None,
    fail: tuple[str, ...] = (),
    finish: bool = True,
) -> None:
    """`npm run sources` (all queries), a partial run such as `-- --changed` (only `only`), or a
    non-strict run in which the `fail` queries fail. Like real Evidence, a skipped query keeps its
    old file and manifest entry, while a failed one is dropped from manifest.json."""
    _age_extracted(repo)
    _node(repo, "sources-stamp.mjs", "start")
    serving = (repo / "data" / "serving" / "gentrification_index.parquet").read_bytes()
    for q in QUERIES:
        if (only is None or q in only) and q not in fail:
            _extracted(repo, q).parent.mkdir(parents=True, exist_ok=True)
            _extracted(repo, q).write_bytes(serving + q.encode())
    urls = [f"static/data/gentriduck_marts/{q}/{q}.parquet" for q in QUERIES if q not in fail]
    manifest = {"renderedFiles": {"gentriduck_marts": urls}}
    (_data_dir(repo) / "manifest.json").write_text(json.dumps(manifest), encoding="utf-8")
    # copied in from web/static/data at build time: not extracted data
    (_data_dir(repo) / "repo-stats.json").write_text("{}", encoding="utf-8")
    if finish:
        _node(repo, "sources-stamp.mjs", "finish")


def _npm_build(repo: Path) -> dict:
    _fake_build(repo / "web")  # pages; .build-source gets overwritten by the script below
    _node(repo, "postbuild-build-source.mjs")
    return json.loads((repo / "web" / "build" / BUILD_SOURCE_NAME).read_text(encoding="utf-8"))


def _set_serving(repo: Path, parquet: bytes, tree: str) -> None:
    """`poe build` on `tree`, then `poe export-serving` and `poe export-area-geojson`."""
    _write_inputs(repo, parquet=parquet)
    _write_warehouse(repo, tree=tree)
    _export(repo)


@pytest.fixture
def node_repo(repo):
    """`repo` with the real web scripts and a web/sources tree committed; origin/main = HEAD (= T).

    web/sources follows Evidence's naming rules: the source name comes from connection.yaml (not
    the directory), queries may be nested, a query is named after its file name up to the first
    '.', and initialize.sql, non-.sql files and directories without connection.yaml are no
    queries. So QUERIES are exactly the queries a complete run must extract."""
    marts = repo / "web" / "sources" / "marts"
    (marts / "nested").mkdir(parents=True)
    (marts / "connection.yaml").write_text(
        "# comment\nname: gentriduck_marts\ntype: duckdb\n", encoding="utf-8"
    )
    (marts / f"{QUERIES[0]}.sql").write_text("select 1\n", encoding="utf-8")
    (marts / "nested" / f"{QUERIES[1]}.v2.sql").write_text("select 2\n", encoding="utf-8")
    (marts / "initialize.sql").write_text("install spatial;\n", encoding="utf-8")
    (marts / "README.md").write_text("not a query\n", encoding="utf-8")
    (repo / "web" / "sources" / "no_connection").mkdir()
    (repo / "web" / "sources" / "no_connection" / "orphan.sql").write_text("select 3\n")
    scripts = repo / "web" / "scripts"
    scripts.mkdir()
    for name in WEB_SCRIPTS:
        shutil.copy(REPO_ROOT / "web" / "scripts" / name, scripts)
    _git(repo, "add", "-A")
    _git(repo, "commit", "-q", "-m", "add web scripts")
    _git(repo, "update-ref", "refs/remotes/origin/main", "HEAD")
    _set_serving(repo, b"PAR1-T", _tree(repo))
    return repo


@needs_node
def test_postbuild_mjs_matches_python_and_enables_skip(node_repo, capsys):
    """Fingerprint parity with Python, the embedded stamps and sources record, SKIP on the result,
    then REBUILD after the serving data changes."""
    repo = node_repo
    _npm_sources(repo)
    src = _npm_build(repo)
    assert src["inputs"] == inputs_fingerprint(repo, env={})
    assert src["tree"] == _tree(repo) and src["dirty"] is False and src["dirty_count"] == 0
    assert "dirty_paths" not in src  # not published
    assert src["exports"] == {
        "serving": read_json(repo / SERVING_STAMP_REL),
        "geo": read_json(repo / GEO_STAMP_REL),
    }
    assert src["sources_problem"] is None
    assert src["sources"] == read_json(repo / SOURCES_REC)
    assert src["sources"]["complete"] is True and src["sources"]["tree"] == _tree(repo)

    assert _run(repo) == 0
    assert "SKIP rebuild" in capsys.readouterr().out
    _write_inputs(repo, parquet=b"PAR1-new-vintage")
    assert _run(repo) == 0
    assert "REBUILD: build inputs changed" in capsys.readouterr().out


@needs_node
def test_issue_369_scenario_sources_on_f_build_on_t_rebuilds(node_repo, capsys):
    """The #369 scenario. 1: on feature F, export-serving + `npm run sources` (Evidence caches F's
    data). 2: on T (= origin/main), `poe build` + export-serving. 3: `npm run build` without
    sources. The bundle holds F's numbers. Before #369 the marker said T and release-deploy
    SKIPped. Now the build records the problem and `inputs: null`, so it REBUILDs."""
    repo = node_repo
    t_tree = _tree(repo)
    _git(repo, "switch", "-q", "-c", "feature-f")
    (repo / "web" / "pages" / "f.md").write_text("# F\n", encoding="utf-8")
    _git(repo, "add", "-A")
    _git(repo, "commit", "-q", "-m", "feature F")
    _set_serving(repo, b"PAR1-F", _tree(repo))  # 1. F's warehouse, exported
    _npm_sources(repo)  # 1. Evidence now caches F's data
    _git(repo, "switch", "-q", "-")  # back to T
    _set_serving(repo, b"PAR1-T", t_tree)  # 2. poe build + export-serving on T
    src = _npm_build(repo)  # 3. npm run build, no sources

    assert _extracted(repo, QUERIES[0]).read_bytes().startswith(b"PAR1-F")  # the bundle: F
    # Everything the pre-#369 marker recorded says T; only the sources record tells the truth.
    assert src["tree"] == t_tree and src["dirty"] is False
    pre_369 = {
        "inputs": inputs_fingerprint(repo, env={}),
        "exports": {
            "serving": read_json(repo / SERVING_STAMP_REL),
            "geo": read_json(repo / GEO_STAMP_REL),
        },
    }
    assert exports_problem(pre_369, t_tree) is None
    assert src["inputs"] is None
    assert src["sources_problem"].startswith("npm run sources ran on tree")
    assert src["sources"]["tree"] != t_tree

    assert _run(repo) == 0
    out = capsys.readouterr().out
    assert UNPROVEN + "npm run sources ran on tree" in out
    assert "export-serving" in out and "run sources" in out and "run build" in out


@needs_node
def test_sources_time_serving_fingerprint_mismatch_forces_rebuild(node_repo, capsys):
    """#369 test: same tree, but data/serving was re-exported after `npm run sources`, and the
    build ran without sources. The sources-time serving fingerprint differs from the live one,
    so release-deploy REBUILDs."""
    repo = node_repo
    _npm_sources(repo)
    sources_serving = read_json(repo / SOURCES_REC)["serving"]
    _set_serving(repo, b"PAR1-T-reexported", _tree(repo))
    src = _npm_build(repo)
    assert src["inputs"] is None
    assert src["sources"]["serving"] == sources_serving
    assert src["sources_problem"].startswith("data/serving changed since npm run sources")
    assert _run(repo) == 0
    assert UNPROVEN + "data/serving changed" in capsys.readouterr().out


@needs_node
def test_partial_sources_run_is_unusable(node_repo, capsys):
    """`npm run sources -- --changed` (or --queries/--sources) after new data re-extracts only
    some queries, and Evidence keeps the others' old files. npm doesn't pass the args to the
    hooks, so postsources detects the run by its effect: a bundled file this run didn't write."""
    repo = node_repo
    _npm_sources(repo)  # a full run on the old data
    _set_serving(repo, b"PAR1-T-v2", _tree(repo))
    _npm_sources(repo, only=(QUERIES[0],))  # partial run on the new data
    rec = read_json(repo / SOURCES_REC)
    assert rec["complete"] is False
    assert f"gentriduck_marts/{QUERIES[1]}/{QUERIES[1]}.parquet was not rewritten" in rec["reason"]
    assert QUERIES[0] not in rec["reason"]
    src = _npm_build(repo)
    assert src["inputs"] is None
    assert _run(repo) == 0
    out = capsys.readouterr().out
    assert (
        UNPROVEN
        + "web/.sources-source: the last npm run sources is unusable (1 query result(s) not extracted"
        in out
    )


@needs_node
def test_serving_export_stamp_is_the_sources_time_one(node_repo):
    """#369 review: byte-identical serving data re-stamped from another warehouse record after
    sources. The bundle still holds the sources-time extraction, so `exports.serving` must be the
    sources-time stamp, not the live one."""
    repo = node_repo
    _npm_sources(repo)
    _write_warehouse(repo, tree=_tree(repo), recorded_at="re-certified later")
    _export(repo)  # same parquet bytes, new stamp
    live = read_json(repo / SERVING_STAMP_REL)
    src = _npm_build(repo)
    assert src["sources_problem"] is None and src["inputs"]  # same bytes: still vouched for
    assert src["exports"]["serving"] == src["sources"]["serving_export"]
    assert src["exports"]["serving"] != live
    assert live["warehouse"]["recorded_at"] == "re-certified later"


@pytest.mark.parametrize("previous_run", [True, False])
@needs_node
def test_failed_query_in_non_strict_run_is_unusable(node_repo, capsys, previous_run):
    """#369 review (medium): in a non-strict run a failed query is dropped from manifest.json
    (no stale entry is left behind; with a previous run its old file stays on disk). Every query
    in web/sources must have a manifest entry written by this run."""
    repo = node_repo
    if previous_run:
        _npm_sources(repo)
    _npm_sources(repo, fail=(QUERIES[1],))
    assert _extracted(repo, QUERIES[1]).exists() is previous_run
    rec = read_json(repo / SOURCES_REC)
    assert rec["complete"] is False
    assert f"gentriduck_marts/{QUERIES[1]} has no extracted result" in rec["reason"]
    assert "orphan" not in rec["reason"] and "initialize" not in rec["reason"]
    src = _npm_build(repo)
    assert src["inputs"] is None
    assert _run(repo) == 0
    assert UNPROVEN + "web/.sources-source: the last npm run sources is unusable" in (
        capsys.readouterr().out
    )


@pytest.mark.parametrize("env_file", [".env", ".env.local"])
@needs_node
def test_evidence_data_dir_in_env_file_is_unusable(node_repo, env_file):
    """#369 review: Evidence's loadEnvFile() also reads EVIDENCE_DATA_DIR from web/.env*."""
    repo = node_repo
    (repo / "web" / env_file).write_text(
        "EVIDENCE_X=1\nEVIDENCE_DATA_DIR=./elsewhere\n", encoding="utf-8"
    )
    _npm_sources(repo)
    rec = read_json(repo / SOURCES_REC)
    assert rec["complete"] is False
    assert f"EVIDENCE_DATA_DIR is set in web/{env_file}" in rec["reason"]
    src = _npm_build(repo)
    assert src["inputs"] is None
    assert src["sources_problem"].startswith(f"EVIDENCE_DATA_DIR is set in web/{env_file}")


@needs_node
def test_full_sources_run_after_partial_is_usable_again(node_repo, capsys):
    repo = node_repo
    _npm_sources(repo, only=(QUERIES[0],))
    assert read_json(repo / SOURCES_REC)["complete"] is False
    _npm_sources(repo)
    assert read_json(repo / SOURCES_REC)["complete"] is True
    _npm_build(repo)
    assert _run(repo) == 0
    assert "SKIP rebuild" in capsys.readouterr().out


def _overwrite_extracted(repo: Path) -> None:
    """A direct `npx evidence sources` (no npm hooks) that changed the extracted data."""
    _npm_sources(repo)
    _extracted(repo, QUERIES[1]).write_bytes(b"other data")


def _delete_manifest(repo: Path) -> None:
    _npm_sources(repo)
    (_data_dir(repo) / "manifest.json").unlink()


@pytest.mark.parametrize(
    ("setup", "why"),
    [
        (lambda r: None, "no web/.sources-source"),  # no sources run recorded (pre-#369)
        # sources failed or was killed, so npm skipped postsources
        (lambda r: _npm_sources(r, finish=False), "unusable (npm run sources in progress)"),
        (_overwrite_extracted, "extracted data in web/.evidence/template/static/data changed"),
        (_delete_manifest, "extracted data in web/.evidence/template/static/data changed"),
    ],
)
@needs_node
def test_unusable_sources_record_forces_rebuild(node_repo, capsys, setup, why):
    repo = node_repo
    setup(repo)
    src = _npm_build(repo)
    assert src["inputs"] is None and why in src["sources_problem"]
    assert _run(repo) == 0
    assert UNPROVEN in capsys.readouterr().out


@needs_node
def test_sources_on_dirty_tree_is_unusable(node_repo, capsys):
    repo = node_repo
    draft = repo / "web" / "pages" / "draft.md"
    draft.write_text("# draft\n", encoding="utf-8")
    _npm_sources(repo)
    draft.unlink()  # clean again for the build
    rec = read_json(repo / SOURCES_REC)
    assert rec["dirty"] is True and rec["complete"] is True  # recorded; rejected at build time
    src = _npm_build(repo)
    assert "ran on a dirty or unknown working tree" in src["sources_problem"]
    assert _run(repo) == 0
    assert UNPROVEN in capsys.readouterr().out


@needs_node
def test_bare_postsources_without_presources_is_unusable(node_repo):
    repo = node_repo
    _npm_sources(repo, finish=False)
    (repo / SOURCES_REC).unlink()
    _node(repo, "sources-stamp.mjs", "finish")
    rec = read_json(repo / SOURCES_REC)
    assert rec["complete"] is False and "without presources" in rec["reason"]


# --------------------------------------------------------------------------- export stamps (real)


def test_export_serving_writes_stamp_and_interrupted_export_leaves_none(tmp_path, monkeypatch):
    duckdb = pytest.importorskip("duckdb")
    from transform import export_serving_parquet as es

    db = tmp_path / "data" / "gentriduck.duckdb"
    db.parent.mkdir(parents=True)
    con = duckdb.connect(str(db))
    con.execute("create table main.m as select 1 as x")
    con.close()
    monkeypatch.setattr(es, "REPO_ROOT", tmp_path)
    monkeypatch.setattr(es, "DUCKDB_PATH", db)
    monkeypatch.setattr(es, "OUT_DIR", tmp_path / "data" / "serving")
    monkeypatch.setattr(es, "MART_MODELS", ["m"])
    _write_warehouse(tmp_path)

    es.main()
    assert (tmp_path / "data" / "serving" / "m.parquet").is_file()
    stamp = read_json(tmp_path / SERVING_STAMP_REL)
    assert stamp["warehouse"] == WAREHOUSE and stamp["source"] == WAREHOUSE_SOURCE_REL

    monkeypatch.setattr(es, "MART_MODELS", ["m", "missing_table"])
    with pytest.raises(duckdb.Error):
        es.main()  # fails mid-export
    assert not (tmp_path / SERVING_STAMP_REL).exists()  # no stamp -> release-deploy rebuilds
