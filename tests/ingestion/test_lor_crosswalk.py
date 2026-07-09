"""
tests/ingestion/test_lor_crosswalk.py
======================================
QA-1 (#176): unit tests for `compute_crosswalk` (areal-weighted PLR crosswalk,
methodology-bearing per C3-crosswalk sign-off, `docs/epic-c/C3-crosswalk-geo-
signoff.md`, but never covered by a unit test before this ticket).

Uses synthetic `shapely` boxes (no real Berlin geometry, no file I/O) so the tests
are fast, deterministic, and independent of `data/raw/` being populated.
"""

from __future__ import annotations

import pytest
from shapely.geometry import box

from berlin.lor.ingest_lor_crosswalk import compute_crosswalk


def test_one_to_one_identical_geometry_gives_weight_one():
    """A pre-2021 PLR that maps to exactly one, identical-geometry 2021 PLR should
    get weight = reverse_weight = 1.0 (the boundary is unchanged)."""
    pre2021 = [("PRE1", box(0, 0, 10, 10))]
    lor2021 = [("NEW1", box(0, 0, 10, 10))]

    rows, weight_sums, reverse_weight_sums = compute_crosswalk(pre2021, lor2021)

    assert len(rows) == 1
    row = rows[0]
    assert row["plr_id_pre2021"] == "PRE1"
    assert row["plr_id_2021"] == "NEW1"
    assert row["weight"] == pytest.approx(1.0)
    assert row["reverse_weight"] == pytest.approx(1.0)
    assert row["mapping_type"] == "areal_weighted"
    assert weight_sums["PRE1"] == pytest.approx(1.0)
    assert reverse_weight_sums["NEW1"] == pytest.approx(1.0)


def test_one_pre2021_plr_split_evenly_across_two_2021_plrs():
    """A pre-2021 PLR split exactly in half by a 2021 boundary reform should produce
    two rows with weight = 0.5 each, forward weights summing to 1.0."""
    pre2021 = [("PRE1", box(0, 0, 10, 10))]  # 100 area units
    lor2021 = [
        ("NEW_LEFT", box(0, 0, 5, 10)),  # left half, 50 area units
        ("NEW_RIGHT", box(5, 0, 10, 10)),  # right half, 50 area units
    ]

    rows, weight_sums, reverse_weight_sums = compute_crosswalk(pre2021, lor2021)

    assert len(rows) == 2
    weights = {r["plr_id_2021"]: r["weight"] for r in rows}
    assert weights["NEW_LEFT"] == pytest.approx(0.5)
    assert weights["NEW_RIGHT"] == pytest.approx(0.5)
    # Forward weight sum for the single pre-2021 PLR should be ~1.0 (full area accounted for).
    assert weight_sums["PRE1"] == pytest.approx(1.0)
    # Each 2021 PLR is entirely covered by this one pre-2021 PLR (no other source
    # intersects it), so its reverse weight is exactly 1.0.
    reverse_weights = {r["plr_id_2021"]: r["reverse_weight"] for r in rows}
    assert reverse_weights["NEW_LEFT"] == pytest.approx(1.0)
    assert reverse_weights["NEW_RIGHT"] == pytest.approx(1.0)


def test_two_pre2021_plrs_merged_into_one_2021_plr():
    """Two adjacent pre-2021 PLRs merged into a single 2021 PLR (boundary
    simplification): each pre-2021 PLR fully maps to the merged 2021 PLR (forward
    weight 1.0 each), and the 2021 PLR's reverse weights from both sum to 1.0."""
    pre2021 = [
        ("PRE_LEFT", box(0, 0, 5, 10)),  # 50 area units
        ("PRE_RIGHT", box(5, 0, 10, 10)),  # 50 area units
    ]
    lor2021 = [("NEW_MERGED", box(0, 0, 10, 10))]  # 100 area units, covers both

    rows, weight_sums, reverse_weight_sums = compute_crosswalk(pre2021, lor2021)

    assert len(rows) == 2
    assert weight_sums["PRE_LEFT"] == pytest.approx(1.0)
    assert weight_sums["PRE_RIGHT"] == pytest.approx(1.0)
    # Reverse weight sum accumulates across BOTH source PLRs for the merged target.
    assert reverse_weight_sums["NEW_MERGED"] == pytest.approx(1.0)
    reverse_weights = {r["plr_id_pre2021"]: r["reverse_weight"] for r in rows}
    assert reverse_weights["PRE_LEFT"] == pytest.approx(0.5)
    assert reverse_weights["PRE_RIGHT"] == pytest.approx(0.5)


def test_non_intersecting_geometries_produce_no_rows_and_warn(caplog):
    """A pre-2021 PLR with no intersecting 2021 PLR contributes no rows and no
    weight-sum entry (not a crash, not a silently-zero row)."""
    pre2021 = [("PRE1", box(0, 0, 10, 10))]
    lor2021 = [("NEW1", box(100, 100, 110, 110))]  # far away, no overlap

    rows, weight_sums, reverse_weight_sums = compute_crosswalk(pre2021, lor2021)

    assert rows == []
    assert weight_sums == {}
    assert reverse_weight_sums == {}


def test_zero_area_pre2021_geometry_is_skipped():
    """A degenerate (zero-area) pre-2021 geometry is skipped, not divided-by-zero."""
    from shapely.geometry import LineString

    pre2021 = [("DEGENERATE", LineString([(0, 0), (10, 0)]))]  # zero-area line
    lor2021 = [("NEW1", box(0, 0, 10, 10))]

    rows, weight_sums, reverse_weight_sums = compute_crosswalk(pre2021, lor2021)

    assert rows == []
    assert "DEGENERATE" not in weight_sums


def test_partial_overlap_weight_and_reverse_weight_are_independent_ratios():
    """A partial overlap: weight is intersection/pre2021_area, reverse_weight is
    intersection/lor2021_area — these differ when the two source areas differ."""
    pre2021 = [("PRE1", box(0, 0, 10, 10))]  # 100 area units
    # Overlaps only the right quarter of PRE1 (25 area units), but NEW1 itself is
    # bigger (50 area units), so weight != reverse_weight.
    lor2021 = [("NEW1", box(5, 0, 15, 5))]  # spans x=[5,15], y=[0,5] -> 50 area units

    rows, weight_sums, reverse_weight_sums = compute_crosswalk(pre2021, lor2021)

    assert len(rows) == 1
    row = rows[0]
    # Intersection is x=[5,10], y=[0,5] -> 5*5 = 25 area units.
    assert row["weight"] == pytest.approx(25 / 100)
    assert row["reverse_weight"] == pytest.approx(25 / 50)
    assert row["weight"] != pytest.approx(row["reverse_weight"])
