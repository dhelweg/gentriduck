"""
tests/ingestion/test_verify_data.py
====================================
QA-1 (#176): unit tests for `classify_pinned` / `classify_rolling`
(ingestion/verify_data.py), ADR-0016's per-source drift classification.

These build tiny manifest entries + real on-disk parquet files via
`manifest.describe_file`/`content_hash` helpers (so schema_fingerprint/content_hash
values are genuine, not hand-faked), rather than depending on any committed
data/ artefact -- fast, deterministic, no network, no real ingestion output needed.
"""

from __future__ import annotations

from pathlib import Path

import pyarrow as pa
import pyarrow.parquet as pq
import pytest

from manifest import content_hash, describe_file
from verify_data import classify, classify_pinned, classify_rolling


def _write_parquet(path: Path, rows: list[int]) -> None:
    table = pa.table({"a": pa.array(rows, type=pa.int64())})
    pq.write_table(table, path)


def _manifest_entry_for(
    path: Path,
    *,
    rel_path: str,
    source_id: str,
    source_class: str,
    git_sha: str = "unknown",
    module: str = "berlin.lor.ingest_lor_geometries",
) -> dict:
    """Build a manifest entry dict whose outputs[0] genuinely describes `path`
    (real row_count/schema_fingerprint/content_hash via manifest.py's own helpers),
    but records it under `rel_path` -- the path classify_pinned/classify_rolling
    will resolve as `repo_root / rel_path` (repo_root is the tmp_path fixture, and
    `path` already lives under it)."""
    row_count, schema_fp = describe_file(path)
    return {
        "source_id": source_id,
        "source_class": source_class,
        "outputs": [
            {
                "path": rel_path,
                "row_count": row_count,
                "schema_fingerprint": schema_fp,
                "content_hash": content_hash(path),
            }
        ],
        "ingest_script": {"module": module, "git_sha": git_sha},
    }


@pytest.fixture
def repo_root(tmp_path: Path) -> Path:
    return tmp_path


def test_classify_pinned_ok_when_output_matches_manifest(repo_root: Path):
    out = repo_root / "out.parquet"
    _write_parquet(out, [1, 2, 3])
    entry = _manifest_entry_for(out, rel_path="out.parquet", source_id="s1", source_class="pinned")
    # git_sha "unknown" -> _script_changed_since returns None, never flags stale.

    result = classify_pinned(entry, repo_root)

    assert result.status == "ok"
    assert result.source_class == "pinned"
    assert result.details == []


def test_classify_pinned_missing_when_output_file_absent(repo_root: Path):
    entry = {
        "source_id": "s1",
        "source_class": "pinned",
        "outputs": [
            {
                "path": "does_not_exist.parquet",
                "row_count": 1,
                "schema_fingerprint": "sha256:x",
                "content_hash": "sha256:y",
            }
        ],
        "ingest_script": {"module": "berlin.lor.ingest_lor_geometries", "git_sha": "unknown"},
    }

    result = classify_pinned(entry, repo_root)

    assert result.status == "missing"
    assert "file not found" in result.detail


def test_classify_pinned_wrong_shape_on_row_count_mismatch(repo_root: Path):
    out = repo_root / "out.parquet"
    _write_parquet(out, [1, 2, 3])
    entry = _manifest_entry_for(out, rel_path="out.parquet", source_id="s1", source_class="pinned")
    entry["outputs"][0]["row_count"] = 999  # manifest disagrees with actual file

    result = classify_pinned(entry, repo_root)

    assert result.status == "wrong-shape"
    assert "row_count" in result.detail


def test_classify_pinned_stale_on_content_hash_mismatch(repo_root: Path):
    out = repo_root / "out.parquet"
    _write_parquet(out, [1, 2, 3])
    entry = _manifest_entry_for(out, rel_path="out.parquet", source_id="s1", source_class="pinned")
    # Same row_count/schema (so it passes the wrong-shape check) but a bogus
    # content_hash -- simulates "re-published upstream, same shape, different bytes".
    entry["outputs"][0]["content_hash"] = "sha256:0000000000000000"

    result = classify_pinned(entry, repo_root)

    assert result.status == "stale"
    assert "content_hash differs" in result.detail


def test_script_changed_since_detects_real_commits_after_empty_tree_sha():
    """`_script_changed_since` is the git-staleness half of classify_pinned's status
    (the file-shape checks are covered by the tests above). Exercised directly
    against the REAL repo (not tmp_path) so `git log <sha>..HEAD -- <path>` resolves
    against actual history: git's well-known empty-tree SHA is never a real commit,
    so ingestion/manifest.py necessarily has commits "since" it."""
    from verify_data import _script_changed_since

    real_repo_root = Path(__file__).resolve().parents[2]
    changed = _script_changed_since(
        "4b825dc642cb6eb9a060e54bf8d69288fbee4904",  # git empty-tree hash
        "ingestion/manifest.py",
        real_repo_root,
    )

    assert changed is True


def test_script_changed_since_returns_none_for_unknown_sha():
    from verify_data import _script_changed_since

    real_repo_root = Path(__file__).resolve().parents[2]
    assert _script_changed_since("unknown", "ingestion/manifest.py", real_repo_root) is None


def test_classify_pinned_unknown_git_sha_never_flags_stale(repo_root: Path):
    out = repo_root / "out.parquet"
    _write_parquet(out, [1, 2, 3])
    entry = _manifest_entry_for(
        out, rel_path="out.parquet", source_id="s1", source_class="pinned", git_sha="unknown"
    )

    result = classify_pinned(entry, repo_root)

    assert result.status == "ok"


def test_classify_rolling_ok_within_tolerance(repo_root: Path):
    out = repo_root / "rolling.parquet"
    _write_parquet(out, list(range(1000)))
    entry = _manifest_entry_for(
        out, rel_path="rolling.parquet", source_id="s2", source_class="rolling"
    )
    entry["outputs"][0]["row_count"] = 1000

    result = classify_rolling(entry, repo_root)

    assert result.status == "ok"
    assert result.display_status == "ok (rolling)"


def test_classify_rolling_warns_beyond_tolerance(repo_root: Path):
    out = repo_root / "rolling.parquet"
    _write_parquet(out, list(range(1000)))
    entry = _manifest_entry_for(
        out, rel_path="rolling.parquet", source_id="s2", source_class="rolling"
    )
    # Manifest recorded 900 rows; actual file has 1000 -> >0.5% delta -> warn.
    entry["outputs"][0]["row_count"] = 900

    result = classify_rolling(entry, repo_root)

    assert result.status == "warn"
    assert "row_count delta" in result.detail


def test_classify_rolling_never_reaches_stale_or_wrong_shape(repo_root: Path):
    """Rolling sources can only be ok/warn/missing -- never stale/wrong-shape,
    per ADR-0016 Decision §2 (checked here via the reachable status set, not by
    inspecting unreachable code paths)."""
    out = repo_root / "rolling.parquet"
    _write_parquet(out, list(range(1000)))
    entry = _manifest_entry_for(
        out, rel_path="rolling.parquet", source_id="s2", source_class="rolling"
    )
    entry["outputs"][0]["row_count"] = 1  # huge delta

    result = classify_rolling(entry, repo_root)

    assert result.status in {"ok", "warn", "missing"}


def test_classify_rolling_partial_file_never_compared(repo_root: Path):
    """A rolling output whose filename contains 'partial' is always ok, regardless
    of row_count/schema drift (current partial-year snapshot, ADR-0016 Decision §2)."""
    out = repo_root / "rolling_partial.parquet"
    _write_parquet(out, list(range(5)))  # tiny, would otherwise warn hugely
    entry = _manifest_entry_for(
        out, rel_path="rolling_partial.parquet", source_id="s2", source_class="rolling"
    )
    entry["outputs"][0]["row_count"] = 100000

    result = classify_rolling(entry, repo_root)

    assert result.status == "ok"
    assert result.details == []


def test_classify_rolling_missing_output_reported_but_never_gates(repo_root: Path):
    entry = {
        "source_id": "s2",
        "source_class": "rolling",
        "outputs": [
            {
                "path": "absent.parquet",
                "row_count": 10,
                "schema_fingerprint": "sha256:x",
                "content_hash": "sha256:y",
            }
        ],
        "ingest_script": {"module": "berlin.lor.ingest_lor_geometries", "git_sha": "unknown"},
    }

    result = classify_rolling(entry, repo_root)

    assert result.status == "missing"


def test_classify_dispatches_by_source_class(repo_root: Path):
    out = repo_root / "out.parquet"
    _write_parquet(out, [1, 2, 3])
    pinned_entry = _manifest_entry_for(
        out, rel_path="out.parquet", source_id="s1", source_class="pinned"
    )
    rolling_entry = _manifest_entry_for(
        out, rel_path="out.parquet", source_id="s2", source_class="rolling"
    )

    assert classify(pinned_entry, repo_root).source_class == "pinned"
    assert classify(rolling_entry, repo_root).source_class == "rolling"
