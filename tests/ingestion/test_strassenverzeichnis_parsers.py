"""
tests/ingestion/test_strassenverzeichnis_parsers.py
=====================================================
QA-1 (#176): unit tests for the pure-Python text-line parsers in
ingest_strassenverzeichnis.py -- the two-column-line splitter and the
per-entry tokenizer that turns a Strassenverzeichnis text line into a
structured street/house-number/wohnlage record. No PDF file I/O; these
operate on plain token lists that mirror pdfplumber's `extract_text()` output
(see the module docstring's "Text-line parsing" section).

Skipped (not failed) when pdfplumber isn't installed, same rationale as
tests/ingestion/test_mietspiegel_parsers.py. Run with pdfplumber present:
    uv run --with pdfplumber pytest tests/ingestion/test_strassenverzeichnis_parsers.py -v
"""

from __future__ import annotations

import pytest

pytest.importorskip(
    "pdfplumber", reason="ingest_strassenverzeichnis.py requires pdfplumber (opt-in dependency)"
)

from berlin.mietspiegel.ingest_strassenverzeichnis import (  # noqa: E402
    _parse_entry,
    _should_skip_line,
    _split_two_column_line,
)

# ---------------------------------------------------------------------------
# _should_skip_line
# ---------------------------------------------------------------------------


def test_should_skip_line_blank():
    assert _should_skip_line("") is True
    assert _should_skip_line("   ") is True


@pytest.mark.parametrize(
    "line",
    [
        "Straßenverzeichnis zum Mietspiegel 2024",
        "Straßenname Bezirk",
        "Berliner Mietspiegel 2024",
        "www.berlin.de/mietspiegel",
        "Hausnr. von - bis",
        "Bezirk Ortsteil",
        "Seite 12",
    ],
)
def test_should_skip_line_header_footer_markers(line):
    assert _should_skip_line(line) is True


def test_should_skip_line_data_line_not_skipped():
    assert _should_skip_line("Alexanderplatz Mitte W 1 - 10 F mittel") is False


# ---------------------------------------------------------------------------
# _split_two_column_line
# ---------------------------------------------------------------------------


def test_split_two_column_line_single_entry():
    line = "Alexanderplatz Mitte W 1 - 10 F mittel"
    segments = _split_two_column_line(line)
    assert segments == [line]


def test_split_two_column_line_no_wohnlage_returns_empty():
    assert _split_two_column_line("just some random text") == []


def test_split_two_column_line_two_entries_2019_format():
    line = "Alexanderplatz Mitte W 1 - 10 F mittel Bergstraße Pankow O 5 - 20 U gut"
    segments = _split_two_column_line(line)
    assert len(segments) == 2
    assert segments[0] == "Alexanderplatz Mitte W 1 - 10 F mittel"
    assert segments[1] == "Bergstraße Pankow O 5 - 20 U gut"


def test_split_two_column_line_two_entries_2017_format_skips_wl7():
    # 2017 has an extra trailing WL7 single-letter code (Z or D) after WL6.
    line = "Alexanderplatz Mitte W 1 - 10 F mittel Z Bergstraße Pankow O 5 - 20 U gut D"
    segments = _split_two_column_line(line)
    assert len(segments) == 2
    assert segments[0] == "Alexanderplatz Mitte W 1 - 10 F mittel"
    # Second entry excludes the leading 'Z' (WL7 of the first entry).
    assert segments[1] == "Bergstraße Pankow O 5 - 20 U gut D"


# ---------------------------------------------------------------------------
# _parse_entry
# ---------------------------------------------------------------------------


def test_parse_entry_normal_range():
    tokens = "Alexanderplatz Mitte W 1 - 10 F mittel".split()
    entry = _parse_entry(tokens)
    assert entry is not None
    assert entry["street_name"] == "Alexanderplatz"
    assert entry["house_no_from"] == "1"
    assert entry["house_no_to"] == "10"
    assert entry["house_no_parity"] == "F"
    assert entry["house_no_all"] is False
    assert entry["wohnlage"] == "mittel"


def test_parse_entry_multi_word_street_name():
    tokens = "Alt Friedrichsfelde Lich O 26 - 40 F mittel".split()
    entry = _parse_entry(tokens)
    assert entry is not None
    assert entry["street_name"] == "Alt Friedrichsfelde"
    assert entry["wohnlage"] == "mittel"


def test_parse_entry_all_house_numbers_k():
    tokens = "Teststraße Mitte W K F gut".split()
    entry = _parse_entry(tokens)
    assert entry is not None
    assert entry["house_no_all"] is True
    assert entry["house_no_from"] == ""
    assert entry["house_no_to"] == ""


def test_parse_entry_ignores_trailing_wl7_token():
    # 2017 layout: trailing single-letter old-wohnlage code after WL6.
    tokens = "Teststraße Mitte W 1 - 10 F einfach Z".split()
    entry = _parse_entry(tokens)
    assert entry is not None
    assert entry["wohnlage"] == "einfach"


def test_parse_entry_strips_alphabet_section_prefix():
    # A lone uppercase-letter token at the start is a section-divider artefact.
    tokens = "A Abcstraße Mitte W 1 - 10 F mittel".split()
    entry = _parse_entry(tokens)
    assert entry is not None
    assert entry["street_name"] == "Abcstraße"


def test_parse_entry_too_few_tokens_returns_none():
    assert _parse_entry(["Mitte", "W", "gut"]) is None


def test_parse_entry_no_wohnlage_token_returns_none():
    assert _parse_entry("Teststraße Mitte W 1 - 10 F".split()) is None


def test_parse_entry_bad_orientation_returns_none():
    tokens = "Teststraße Mitte X 1 - 10 F gut".split()
    assert _parse_entry(tokens) is None
