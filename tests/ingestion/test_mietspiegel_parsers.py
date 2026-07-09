"""
tests/ingestion/test_mietspiegel_parsers.py
=============================================
QA-1 (#176): unit tests for the pure-Python cell/value parsers in
ingest_mietspiegel.py -- German-locale EUR/m2 string parsing, the 2017-2023
multiline-cell parser, overlap-weighted bucket aggregation, and year-built
label normalisation. No PDF file I/O; these operate on plain strings/lists that
mirror what pdfplumber's `extract_tables()` returns for each layout (see the
module docstring's "Table layouts" section).

`ingest_mietspiegel.py` requires pdfplumber at import time (it is deliberately
NOT a core dependency -- see pyproject.toml / the module's own docstring), so
these tests are skipped (not failed) when pdfplumber isn't installed in the
active environment. Run with pdfplumber present to actually exercise them:
    uv run --with pdfplumber pytest tests/ingestion/test_mietspiegel_parsers.py -v
"""

from __future__ import annotations

import pytest

pytest.importorskip(
    "pdfplumber", reason="ingest_mietspiegel.py requires pdfplumber (opt-in dependency)"
)

from berlin.mietspiegel.ingest_mietspiegel import (  # noqa: E402
    _aggregate_to_bucket,
    _normalise_year_label,
    _parse_cell_midlowhigh,
    _parse_eur,
    _parse_m2,
)

# ---------------------------------------------------------------------------
# _parse_eur
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    "raw,expected",
    [
        ("6,53 €", 6.53),
        ("6,53", 6.53),
        ("10,00", 10.0),
        ("0,50€", 0.5),
    ],
)
def test_parse_eur_german_locale(raw, expected):
    assert _parse_eur(raw) == pytest.approx(expected)


@pytest.mark.parametrize("raw", [None, "", "-", "–", "*", "**"])
def test_parse_eur_suppressed_markers_return_none(raw):
    assert _parse_eur(raw) is None


def test_parse_eur_strips_trailing_footnote_marker():
    assert _parse_eur("7,45*") == pytest.approx(7.45)


def test_parse_eur_unparseable_string_returns_none():
    assert _parse_eur("not a number") is None


# ---------------------------------------------------------------------------
# _parse_m2
# ---------------------------------------------------------------------------


def test_parse_m2_extracts_leading_integer():
    assert _parse_m2("40 m²") == 40
    assert _parse_m2("35 m²") == 35


def test_parse_m2_none_input_returns_none():
    assert _parse_m2(None) is None


def test_parse_m2_no_digits_returns_none():
    assert _parse_m2("alle Wohnflächen") is None


# ---------------------------------------------------------------------------
# _parse_cell_midlowhigh (2017-2023 single-table multiline cell)
# ---------------------------------------------------------------------------


def test_parse_cell_midlowhigh_two_line_cell():
    low, mid, high = _parse_cell_midlowhigh("7,45\n5,44 – 10,00")
    assert mid == pytest.approx(7.45)
    assert low == pytest.approx(5.44)
    assert high == pytest.approx(10.00)


def test_parse_cell_midlowhigh_hyphen_variant():
    low, mid, high = _parse_cell_midlowhigh("7,45\n5,44 - 10,00")
    assert low == pytest.approx(5.44)
    assert high == pytest.approx(10.00)


def test_parse_cell_midlowhigh_suppressed_cell_returns_all_none():
    assert _parse_cell_midlowhigh("-") == (None, None, None)
    assert _parse_cell_midlowhigh(None) == (None, None, None)
    assert _parse_cell_midlowhigh("**") == (None, None, None)


def test_parse_cell_midlowhigh_single_line_only_mid():
    low, mid, high = _parse_cell_midlowhigh("7,45")
    assert mid == pytest.approx(7.45)
    assert low is None
    assert high is None


def test_parse_cell_midlowhigh_unparseable_mid_returns_all_none():
    assert _parse_cell_midlowhigh("not a number\n1,00 - 2,00") == (None, None, None)


# ---------------------------------------------------------------------------
# _aggregate_to_bucket (overlap-weighted average across granular size ranges)
# ---------------------------------------------------------------------------


def test_aggregate_to_bucket_single_range_matches_exactly():
    granular = [{"size_lo": 0, "size_hi": 40, "low": 4.0, "mid": 5.0, "high": 6.0}]
    result = _aggregate_to_bucket(granular, 0, 40)
    assert result == (4.0, 5.0, 6.0)


def test_aggregate_to_bucket_weighted_average_across_two_overlapping_ranges():
    # Bucket [0, 40): range A covers [0, 20) (20 units) at mid=4.0,
    # range B covers [20, 60) but only [20, 40) (20 units) overlaps, at mid=8.0.
    # Equal overlap widths -> simple average of mids = 6.0.
    granular = [
        {"size_lo": 0, "size_hi": 20, "low": 3.0, "mid": 4.0, "high": 5.0},
        {"size_lo": 20, "size_hi": 60, "low": 7.0, "mid": 8.0, "high": 9.0},
    ]
    result = _aggregate_to_bucket(granular, 0, 40)
    assert result == pytest.approx((5.0, 6.0, 7.0))


def test_aggregate_to_bucket_no_overlap_returns_none():
    granular = [{"size_lo": 100, "size_hi": 200, "low": 1.0, "mid": 2.0, "high": 3.0}]
    assert _aggregate_to_bucket(granular, 0, 40) is None


def test_aggregate_to_bucket_open_ended_range_is_capped_for_weighting():
    """An open-ended granular row (size_hi=9999, e.g. '90 m² und mehr') is capped
    at bhi+20 for weighting purposes rather than contributing near-infinite weight."""
    granular = [{"size_lo": 90, "size_hi": 9999, "low": 8.0, "mid": 9.0, "high": 10.0}]
    result = _aggregate_to_bucket(granular, 90, 9999)
    assert result == (8.0, 9.0, 10.0)


def test_aggregate_to_bucket_missing_low_high_falls_back_to_mid():
    granular = [{"size_lo": 0, "size_hi": 40, "low": None, "mid": 5.0, "high": None}]
    result = _aggregate_to_bucket(granular, 0, 40)
    assert result == (5.0, 5.0, 5.0)


# ---------------------------------------------------------------------------
# _normalise_year_label
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    "raw,expected",
    [
        ("bis 1918", "pre_1918"),
        ("1919 bis 1949", "1919_1949"),
        ("1991 bis 2001**", "1991_2001"),
        ("1991 bis 2001*", "1991_2001"),
        ("1973 bis 1990 Ost*", "1973_1990_ost"),
        ("2016 bis 2019", "2016_2019"),
    ],
)
def test_normalise_year_label_known_variants(raw, expected):
    assert _normalise_year_label(raw) == expected


def test_normalise_year_label_unknown_returns_none():
    assert _normalise_year_label("totally unknown label") is None


def test_normalise_year_label_strips_footnote_marker_before_retry():
    # "1991 bis 2001***" isn't in the map verbatim, but stripping trailing '*'s
    # should still resolve it via the cleaned lookup.
    assert _normalise_year_label("1991 bis 2001***") == "1991_2001"
