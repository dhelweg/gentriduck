"""
tests/ingestion/test_run_ingest.py
====================================
#251: unit tests for `ingestion/run_ingest.py`'s per-source failure isolation,
release-blocking allowlist, and skip-if-fresh logic.

Subprocess execution is exercised via tiny real `python -c` argv (fast,
deterministic, no network) rather than mocked -- this keeps the test honest
about the actual subprocess isolation contract (a failing step really must
not raise/propagate into the driver).
"""

from __future__ import annotations

import sys
from pathlib import Path

from run_ingest import (
    BLOCKING_SOURCE_IDS,
    IngestStep,
    StepResult,
    is_fresh,
    main,
    render_summary,
    run_step,
)


def _ok_step(label: str = "ok-step", source_id=None, blocking=False) -> IngestStep:
    return IngestStep(label, [sys.executable, "-c", "pass"], source_id=source_id, blocking=blocking)


def _failing_step(label: str = "fail-step", source_id=None, blocking=False) -> IngestStep:
    return IngestStep(
        label,
        [sys.executable, "-c", "import sys; sys.exit(1)"],
        source_id=source_id,
        blocking=blocking,
    )


def test_run_step_ok(tmp_path: Path) -> None:
    result = run_step(_ok_step(), tmp_path, force=True)
    assert result.outcome == "ok"


def test_run_step_failure_is_isolated_not_raised(tmp_path: Path) -> None:
    result = run_step(_failing_step(), tmp_path, force=True)
    assert result.outcome == "failed"
    assert "exit code 1" in result.detail


def test_run_step_skips_when_fresh(tmp_path: Path, monkeypatch) -> None:
    monkeypatch.setattr(
        "run_ingest.is_fresh", lambda source_id, repo_root: (True, "matches manifest")
    )
    step = _failing_step(source_id="berlin__wohnlage")  # would fail if actually run
    result = run_step(step, tmp_path, force=False)
    assert result.outcome == "skipped"


def test_run_step_force_disables_skip(tmp_path: Path, monkeypatch) -> None:
    monkeypatch.setattr("run_ingest.is_fresh", lambda source_id, repo_root: (True, "fresh"))
    step = _ok_step(source_id="berlin__wohnlage")
    result = run_step(step, tmp_path, force=True)
    assert result.outcome == "ok"  # actually ran, not skipped, despite is_fresh=True


def test_is_fresh_no_manifest_entry_means_not_fresh(tmp_path: Path) -> None:
    (tmp_path / "ingestion" / "manifest").mkdir(parents=True)
    fresh, reason = is_fresh("does_not_exist__source", tmp_path)
    assert fresh is False
    assert "no manifest entry" in reason


def test_blocking_allowlist_is_small_and_documented() -> None:
    # Guard against silent scope creep of the release-blocking set (#251's
    # "keep the allowlist tiny and documented" architect recommendation).
    assert BLOCKING_SOURCE_IDS == {
        "berlin__lor_geometries",
        "berlin__lor_crosswalk",
        "berlin__ewr",
        "berlin__mss",
        "berlin__mss_indicators",
    }


def test_render_summary_lists_every_step() -> None:
    results = [
        StepResult(_ok_step("a"), "ok"),
        StepResult(_failing_step("b", blocking=True), "failed", detail="exit code 1"),
        StepResult(_ok_step("c", source_id="berlin__mss"), "skipped", detail="fresh"),
    ]
    out = render_summary(results)
    assert "a" in out and "b" in out and "c" in out
    assert "exit code 1" in out


def test_main_non_blocking_failure_does_not_abort_or_fail_exit(tmp_path: Path, monkeypatch) -> None:
    """A non-blocking source's failure must not stop later sources from running,
    and must not fail the driver's own exit code."""

    def fake_build_steps(repo_root):
        return [
            IngestStep(
                "leaf-a",
                [sys.executable, "-c", "import sys; sys.exit(1)"],
                source_id="berlin__wohnlage",
                blocking=False,
            ),
            IngestStep(
                "leaf-b",
                [sys.executable, "-c", "pass"],
                source_id="berlin__kauffaelle",
                blocking=False,
            ),
        ]

    monkeypatch.setattr("run_ingest.build_steps", fake_build_steps)
    monkeypatch.setattr("run_ingest.is_fresh", lambda source_id, repo_root: (False, "no entry"))
    exit_code = main(["--repo-root", str(tmp_path)])
    assert exit_code == 0  # non-blocking failure does not fail the run


def test_main_blocking_failure_fails_exit_code(tmp_path: Path, monkeypatch) -> None:
    def fake_build_steps(repo_root):
        return [
            IngestStep(
                "core",
                [sys.executable, "-c", "import sys; sys.exit(1)"],
                source_id="berlin__lor_geometries",
                blocking=True,
            ),
        ]

    monkeypatch.setattr("run_ingest.build_steps", fake_build_steps)
    monkeypatch.setattr("run_ingest.is_fresh", lambda source_id, repo_root: (False, "no entry"))
    exit_code = main(["--repo-root", str(tmp_path)])
    assert exit_code == 1


def test_main_only_filters_to_named_sources(tmp_path: Path, monkeypatch) -> None:
    ran: list[str] = []

    def fake_build_steps(repo_root):
        return [
            IngestStep("a", [sys.executable, "-c", "pass"], source_id="berlin__ewr", blocking=True),
            IngestStep(
                "b", [sys.executable, "-c", "pass"], source_id="berlin__wohnlage", blocking=False
            ),
        ]

    def fake_run_step(step, repo_root, force):
        ran.append(step.source_id)
        return StepResult(step, "ok")

    monkeypatch.setattr("run_ingest.build_steps", fake_build_steps)
    monkeypatch.setattr("run_ingest.run_step", fake_run_step)
    exit_code = main(["--repo-root", str(tmp_path), "--only", "berlin__ewr"])
    assert exit_code == 0
    assert ran == ["berlin__ewr"]
