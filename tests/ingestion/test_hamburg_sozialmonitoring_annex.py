"""
tests/ingestion/test_hamburg_sozialmonitoring_annex.py
=======================================================
#371 (ADR-0014 Amendment 2026-11-02): unit tests for the explicit per-edition
column map of the Sozialmonitoring annex reader. Synthetic workbooks are built
with openpyxl in a tmp dir (no network, no real annex files).

Covers the amendment's "fail loudly" rules and pre-registration §3.3 check 4
(map by header text, not by position; the #360 lesson):
- a well-formed sheet parses to one row per Gebiet x indicator, values as published;
- an edition without a map entry raises;
- swapped S3/S4 columns (codes in the wrong place) raise;
- a changed core label (S5 not "Mindestsicherung") raises;
- a Gebiet count different from the published count raises;
- a missing sheet raises.
"""

from __future__ import annotations

from dataclasses import replace
from pathlib import Path

import openpyxl
import pytest

from hamburg.sozialmonitoring.ingest_hamburg_sozialmonitoring_annex import (
    EDITION_SPECS,
    INDICATOR_CODES,
    AnnexLayoutError,
    parse_workbook,
    spec_for,
)

_LONG_LABELS = {
    "S1": "S1 Kinder mit Migrationshintergrund",
    "S2": "S2 Kinder von Alleinerziehenden",
    "S3": "S3 SGB-II- und AsylbLG-Empfänger/-innen",
    "S4": "S4 Arbeitslose",
    "S5": "S5 Kinder (unter 15 Jahren) in Mindestsicherung",
    "S6": "S6 Mindestsicherung im Alter",
    "S7": "S7 Schulabschlüsse (Anteil RS, HS und oHS; bes. Gebietsausschluss)",
    "D1": "D1 Kinder mit Migrationshintergrund 2021-2024",
    "D2": "D2 Kinder von Alleinerziehenden 2021-2024",
    "D3": "D3 SGB-II- und AsylbLG Empfänger/-innen 2021-2024",
    "D4": "D4 Arbeitslose 2021-2024",
    "D5": "D5 Kinder in Mindestsicherung 2021-2024",
    "D6": "D6 Mindestsicherung im Alter 2021-2024",
}

# Column letters of the real 2016-2025 layout (A Stadtteil, B Gebiet, C Bev.,
# D-J S1-S7, K Status-summe, L-Q D1-D6, R Dynamik-summe).
_COLS = {c: chr(ord("D") + i) for i, c in enumerate(INDICATOR_CODES[:7])}
_COLS.update({c: chr(ord("L") + i) for i, c in enumerate(INDICATOR_CODES[7:])})


def _write_sheet(
    path: Path,
    *,
    sheet: str = "II_Indikatoren",
    n_gebiete: int = 3,
    swap: tuple[str, str] | None = None,
    labels: dict[str, str] | None = None,
) -> None:
    """Write a minimal sheet-II workbook in the 2025 layout (header row 8)."""
    labels = dict(_LONG_LABELS, **(labels or {}))
    cols = dict(_COLS)
    if swap:
        a, b = swap
        cols[a], cols[b] = cols[b], cols[a]
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = sheet
    ws["C1"] = "Bev."
    for i, code in enumerate(INDICATOR_CODES[:7]):
        ws[f"D{i + 1}"] = labels[code]
    for i, code in enumerate(INDICATOR_CODES[7:]):
        ws[f"L{i + 1}"] = labels[code]
    ws["A8"], ws["B8"], ws["C8"] = "Stadtteil*", "Stat. \nGebiet*", "Indikator"
    for code in INDICATOR_CODES:
        ws[f"{cols[code]}8"] = code
    ws["R8"] = "Dynamik-summe"
    ws["K9"] = "Status-"
    ws["C10"], ws["C11"] = "Mittelwert", "SD"
    for k, code in enumerate(INDICATOR_CODES):
        ws[f"{cols[code]}10"] = 0.1 + k / 100  # mean (fraction)
        ws[f"{cols[code]}11"] = 0.05  # SD (fraction)
    for r in range(n_gebiete):
        row = 12 + r
        ws[f"A{row}"] = "Hamburg-Altstadt"
        ws[f"B{row}"] = 1000 + r
        ws[f"C{row}"] = 500 + r
        for k, code in enumerate(INDICATOR_CODES):
            ws[f"{cols[code]}{row}"] = round((r - 1) * 0.5 + k / 100, 2)
        ws[f"K{row}"] = 0.0
        ws[f"R{row}"] = 0.0
    wb.save(path)


def _spec(n: int = 3, **kw):
    return replace(EDITION_SPECS[2025], expected_n_gebiete=n, **kw)


def test_parses_one_row_per_gebiet_and_indicator(tmp_path: Path) -> None:
    p = tmp_path / "a.xlsx"
    _write_sheet(p)
    rows = parse_workbook(p, _spec())
    assert len(rows) == 3 * len(INDICATOR_CODES)
    s3 = [r for r in rows if r["indicator"] == "S3"]
    assert [r["gebiet_id"] for r in s3] == ["1000", "1001", "1002"]
    # values as published: mean / SD rows and z read from the S3 column
    assert s3[0]["edition_mean"] == pytest.approx(0.12)
    assert s3[0]["edition_sd"] == pytest.approx(0.05)
    assert s3[2]["z_published"] == pytest.approx(0.52)
    assert s3[0]["indicator_label_de"] == "S3 SGB-II- und AsylbLG-Empfänger/-innen"
    assert {r["population"] for r in s3} == {500, 501, 502}


def test_unmapped_edition_raises() -> None:
    with pytest.raises(AnnexLayoutError, match="No column map"):
        spec_for(2026)
    assert sorted(EDITION_SPECS) == list(range(2016, 2026))


def test_swapped_core_columns_raise(tmp_path: Path) -> None:
    p = tmp_path / "a.xlsx"
    _write_sheet(p, swap=("S3", "S4"))
    with pytest.raises(AnnexLayoutError, match="expected 'S3'"):
        parse_workbook(p, _spec())


def test_changed_core_label_raises(tmp_path: Path) -> None:
    p = tmp_path / "a.xlsx"
    _write_sheet(p, labels={"S5": "S5 Kinder (unter 15 Jahren) in Bedarfsgemeinschaften"})
    with pytest.raises(AnnexLayoutError, match="S5"):
        parse_workbook(p, _spec())


def test_gebiet_count_mismatch_raises(tmp_path: Path) -> None:
    p = tmp_path / "a.xlsx"
    _write_sheet(p, n_gebiete=2)
    with pytest.raises(AnnexLayoutError, match="2 Gebiete parsed, expected 3"):
        parse_workbook(p, _spec())


def test_missing_sheet_raises(tmp_path: Path) -> None:
    p = tmp_path / "a.xlsx"
    _write_sheet(p, sheet="Tabelle1")
    with pytest.raises(AnnexLayoutError, match="sheet 'II_Indikatoren' not found"):
        parse_workbook(p, _spec())


def test_pinned_urls_match_seed_description() -> None:
    # ADR-0014 amendment: the pinned URLs are the ones recorded in the
    # seed_hh_sozialmonitoring_published_class_counts description.
    schema = (Path(__file__).resolve().parents[2] / "transform" / "seeds" / "schema.yml").read_text(
        encoding="utf-8"
    )
    for edition, spec in EDITION_SPECS.items():
        assert f"- {edition}: {spec.filename} -- {spec.url}" in schema, edition


def test_every_edition_pins_daten_transparenz_host() -> None:
    # SEC-3 egress list: the annex host is daten.transparenz.hamburg.de only.
    for spec in EDITION_SPECS.values():
        assert spec.url.startswith("https://daten.transparenz.hamburg.de/")
        assert spec.url.endswith(spec.filename)
