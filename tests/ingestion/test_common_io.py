"""
tests/ingestion/test_common_io.py
====================================
QA-2 (#177): unit tests for `ingestion/common/io.py`'s `atomic_write_parquet`.

Uses `tmp_path` (pytest fixture) -- real filesystem, no live network, fast
and deterministic.
"""

from __future__ import annotations

from pathlib import Path

import pyarrow as pa
import pyarrow.parquet as pq
import pytest

from common.io import atomic_write_parquet


def test_atomic_write_parquet_writes_expected_rows(tmp_path: Path):
    table = pa.table({"x": pa.array([1, 2, 3], type=pa.int32())})
    out_path = tmp_path / "sub" / "out.parquet"

    atomic_write_parquet(table, out_path)

    assert out_path.exists()
    read_back = pq.read_table(out_path)
    assert read_back.column("x").to_pylist() == [1, 2, 3]


def test_atomic_write_parquet_no_tmp_file_left_on_success(tmp_path: Path):
    table = pa.table({"x": pa.array([1], type=pa.int32())})
    out_path = tmp_path / "out.parquet"

    atomic_write_parquet(table, out_path)

    tmp_path_candidate = out_path.with_suffix(".tmp.parquet")
    assert not tmp_path_candidate.exists()


def test_atomic_write_parquet_does_not_clobber_existing_file_on_failure(
    tmp_path: Path, monkeypatch
):
    out_path = tmp_path / "out.parquet"
    good_table = pa.table({"x": pa.array([1], type=pa.int32())})
    atomic_write_parquet(good_table, out_path)
    original_bytes = out_path.read_bytes()

    def boom(*_args, **_kwargs):
        raise RuntimeError("simulated write failure")

    monkeypatch.setattr("pyarrow.parquet.write_table", boom)

    bad_table = pa.table({"x": pa.array([2], type=pa.int32())})
    with pytest.raises(RuntimeError, match="simulated write failure"):
        atomic_write_parquet(bad_table, out_path)

    # out_path must be untouched -- still the original, complete file.
    assert out_path.read_bytes() == original_bytes
    assert not out_path.with_suffix(".tmp.parquet").exists()
