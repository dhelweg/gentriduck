"""
tests/ingestion/test_mss_parsers.py
====================================
QA-2 (#177) slice 4 — unit tests for the pure parsing/mapping functions in
`ingest_mss.py`, `ingest_mss_indicators.py`, and `ingest_mss_2013_excel.py`,
migrated onto `ingestion/common/http.py` + `common/io.py` in this slice.

Synthetic GeoJSON fixtures only (no file I/O, no network) so these are fast
and deterministic, matching the style of `test_lor_crosswalk.py`.
"""

from __future__ import annotations

from berlin.mss.ingest_mss import (
    UNINHABITED_SENTINEL,
    _map_dynamik,
    _map_gesamtindex,
    _map_status,
    parse_features,
)
from berlin.mss.ingest_mss_2013_excel import DI_N_TO_DYNAMIK_INDEX, DYNAMIK_SYMBOL_TO_DI_N
from berlin.mss.ingest_mss_indicators import (
    _coerce_value,
    canonical_indicator,
    parse_features_long,
)


def _feature(props: dict) -> dict:
    return {"type": "Feature", "properties": props, "geometry": None}


# ---------------------------------------------------------------------------
# ingest_mss.py — indizes layer
# ---------------------------------------------------------------------------


def test_map_status_valid_and_sentinel():
    assert _map_status(3) == 3
    assert _map_status(UNINHABITED_SENTINEL) is None
    assert _map_status(None) is None


def test_map_dynamik_translates_odd_step_codes():
    assert _map_dynamik(1) == 1  # positiv
    assert _map_dynamik(3) == 2  # stabil
    assert _map_dynamik(5) == 3  # negativ
    assert _map_dynamik(UNINHABITED_SENTINEL) is None


def test_map_gesamtindex_passthrough_and_sentinel():
    assert _map_gesamtindex(23) == 23
    assert _map_gesamtindex(UNINHABITED_SENTINEL) is None


def test_parse_features_maps_inhabited_and_uninhabited_rows():
    geojson = {
        "type": "FeatureCollection",
        "features": [
            _feature(
                {
                    "plr_id": "1010101",
                    "plr_name": "Alt-Hohenschönhausen Nord",
                    "si_n": 2,
                    "di_n": 3,
                    "sdi_n": 23,
                }
            ),
            _feature(
                {
                    "plr_id": "2020202",
                    "plr_name": "Uninhabited PLR",
                    "si_n": UNINHABITED_SENTINEL,
                    "di_n": UNINHABITED_SENTINEL,
                    "sdi_n": UNINHABITED_SENTINEL,
                }
            ),
        ],
    }

    rows = parse_features(geojson, edition=2021)

    assert len(rows) == 2
    inhabited, uninhabited = rows
    assert inhabited["plr_id"] == "01010101"  # zero-padded to 8 chars
    assert inhabited["status_index"] == 2
    assert inhabited["dynamik_index"] == 2
    assert inhabited["gesamtindex"] == 23
    assert inhabited["lor_vintage"] == "lor_2021"
    assert uninhabited["status_index"] is None
    assert uninhabited["dynamik_index"] is None
    assert uninhabited["gesamtindex"] is None


def test_parse_features_skips_feature_missing_plr_id():
    geojson = {
        "type": "FeatureCollection",
        "features": [_feature({"plr_name": "No ID"})],
    }
    rows = parse_features(geojson, edition=2019)
    assert rows == []


# ---------------------------------------------------------------------------
# ingest_mss_indicators.py — indexind layer (long format)
# ---------------------------------------------------------------------------


def test_coerce_value_handles_sentinel_and_none():
    assert _coerce_value("0.42") == 0.42
    assert _coerce_value(UNINHABITED_SENTINEL) is None
    assert _coerce_value(None) is None
    assert _coerce_value("not-a-number") is None


def test_parse_features_long_uses_primary_then_fallback_attr():
    # MSS 2019: 's2' absent, 's2_x' present and always null (vacant S2 slot, #360).
    geojson = {
        "type": "FeatureCollection",
        "features": [
            _feature(
                {
                    "plr_id": "1010101",
                    "plr_name": "Test PLR",
                    "s1": 0.12,
                    "s2_x": None,
                    "s3": 0.05,
                    "s4": 0.20,
                    "d1": 0.01,
                    "d2_x": None,
                    "d3": 0.0,
                    "d4": -0.01,
                }
            )
        ],
    }

    rows = parse_features_long(geojson, edition=2019)

    by_attr = {r["raw_attr"]: r for r in rows}
    assert by_attr["s1"]["indicator"] == "arbeitslose_anteil"
    assert by_attr["s1"]["value"] == 0.12
    # #360: slot 3 is Transferbezug and slot 4 is Kinderarmut in every edition.
    assert by_attr["s3"]["indicator"] == "transferbezug_anteil"
    assert by_attr["s4"]["indicator"] == "kinderarmut_anteil"
    assert by_attr["d3"]["indicator"] == "transferbezug_dynamik"
    # Fallback attribute used and recorded; the vacant S2 slot keeps a row with a
    # null indicator label so the raw layer mirrors what the WFS published.
    assert by_attr["s2_x"]["indicator"] is None
    assert by_attr["s2_x"]["value"] is None
    assert len(rows) == 8


def test_parse_features_long_skips_indicator_when_column_entirely_absent():
    geojson = {
        "type": "FeatureCollection",
        "features": [_feature({"plr_id": "1010101", "s1": 0.1})],
    }
    rows = parse_features_long(geojson, edition=2021)
    attrs = {r["raw_attr"] for r in rows}
    assert attrs == {"s1"}
    assert rows[0]["indicator"] == "arbeitslose_anteil"


def test_canonical_indicator_per_edition_matches_indikatorenhefte():
    # #360 verified mapping (docs/epic-c/360-mss-indicator-mapping-evidence.md).
    for edition in (2015, 2017, 2019, 2021, 2023, 2025):
        assert canonical_indicator(edition, "s1") == "arbeitslose_anteil"
        assert canonical_indicator(edition, "s3") == "transferbezug_anteil"
        assert canonical_indicator(edition, "s4") == "kinderarmut_anteil"
        assert canonical_indicator(edition, "d4") == "kinderarmut_dynamik"
    # Slot 2: Langzeitarbeitslosigkeit until MSS 2017, vacant 2019/2021,
    # Kinder/Jugendliche in alleinerziehenden Haushalten from MSS 2023.
    assert canonical_indicator(2015, "s2") == "langzeitarbeitslose_anteil"
    assert canonical_indicator(2017, "d2") == "langzeitarbeitslose_dynamik"
    assert canonical_indicator(2019, "s2") is None
    assert canonical_indicator(2021, "d2") is None
    assert canonical_indicator(2023, "s2") == "alleinerziehende_anteil"
    assert canonical_indicator(2025, "d2") == "alleinerziehende_dynamik"


def test_parse_features_long_labels_s2_x_as_long_term_unemployment_pre2019():
    geojson = {
        "type": "FeatureCollection",
        "features": [_feature({"plr_id": "1010101", "s1": 7.0, "s2_x": 2.3})],
    }
    rows = parse_features_long(geojson, edition=2015)
    by_attr = {r["raw_attr"]: r for r in rows}
    assert by_attr["s2_x"]["indicator"] == "langzeitarbeitslose_anteil"
    assert by_attr["s2_x"]["value"] == 2.3


# ---------------------------------------------------------------------------
# ingest_mss_2013_excel.py — dynamik symbol mapping
# ---------------------------------------------------------------------------


def test_dynamik_symbol_maps_consistently_with_wfs_di_n_codes():
    # Excel symbols map to the same di_n codes the WFS-based editions publish,
    # and from there to the same normalised 1-3 dynamik_index.
    for symbol, di_n in DYNAMIK_SYMBOL_TO_DI_N.items():
        assert DI_N_TO_DYNAMIK_INDEX[di_n] in (1, 2, 3)
    assert DYNAMIK_SYMBOL_TO_DI_N["+"] == 1
    assert DYNAMIK_SYMBOL_TO_DI_N["+/-"] == 3
    assert DYNAMIK_SYMBOL_TO_DI_N["-"] == 5
