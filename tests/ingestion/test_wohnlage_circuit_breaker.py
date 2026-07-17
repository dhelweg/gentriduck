"""
tests/ingestion/test_wohnlage_circuit_breaker.py
==================================================
#251: unit tests for the `fetch_all_features` circuit breaker added to
`ingest_wohnlage.py` (ADR-0015 amendment 2026-07-12) -- bail out of a vintage
fast when the WFS endpoint is down, instead of grinding the full 15-min
MAX_RUNTIME_SECONDS budget (see #248's incident).

`fetch_page` is monkeypatched with a deterministic fake so these run in
milliseconds, no network, no time.sleep.
"""

from __future__ import annotations

from berlin.price_rent import ingest_wohnlage as wl


def _page(features: list[dict]) -> dict:
    return {"type": "FeatureCollection", "features": features}


def _feature(i: int) -> dict:
    return {"type": "Feature", "id": f"f.{i}", "properties": {}}


def test_first_page_failure_trips_breaker_immediately(monkeypatch) -> None:
    def fake_fetch_page(base_url, type_names, offset, timeout=120):
        raise RuntimeError("simulated endpoint down")

    monkeypatch.setattr(wl, "fetch_page", fake_fetch_page)
    features, is_complete, host_down = wl.fetch_all_features("http://example", "type")
    assert features == []
    assert is_complete is False
    assert host_down is True


def test_consecutive_failures_trip_breaker_before_time_budget(monkeypatch) -> None:
    calls = {"n": 0}

    def fake_fetch_page(base_url, type_names, offset, timeout=120):
        calls["n"] += 1
        if offset == 0:
            return _page([_feature(1)] * wl.WFS_PAGE_SIZE)
        raise RuntimeError("simulated endpoint down")

    monkeypatch.setattr(wl, "fetch_page", fake_fetch_page)
    features, is_complete, host_down = wl.fetch_all_features("http://example", "type")
    assert is_complete is False
    assert host_down is True
    # First page succeeded (500 features), then it should trip after
    # CIRCUIT_BREAKER_CONSECUTIVE_FAILURES consecutive failures, not run
    # anywhere near the full time budget.
    assert len(features) == wl.WFS_PAGE_SIZE
    assert calls["n"] == 1 + wl.CIRCUIT_BREAKER_CONSECUTIVE_FAILURES


def test_transient_single_failure_does_not_trip_breaker(monkeypatch) -> None:
    """A single mid-pagination failure (below the consecutive threshold) should
    not be treated as 'endpoint down' -- pagination should recover and finish
    normally on a subsequent successful page."""
    state = {"n": 0}

    def fake_fetch_page(base_url, type_names, offset, timeout=120):
        state["n"] += 1
        if offset == wl.WFS_PAGE_SIZE:
            # Single transient failure on the second page only.
            raise RuntimeError("transient blip")
        if offset == 0:
            return _page([_feature(1)] * wl.WFS_PAGE_SIZE)
        # Final (partial) page -- pagination completes normally.
        return _page([_feature(2)] * 10)

    monkeypatch.setattr(wl, "fetch_page", fake_fetch_page)
    features, is_complete, host_down = wl.fetch_all_features("http://example", "type")
    assert host_down is False
    assert is_complete is True
    assert len(features) == wl.WFS_PAGE_SIZE + 10


def test_ingest_year_propagates_host_down(monkeypatch, tmp_path) -> None:
    def fake_fetch_all_features(base_url, type_names, max_pages=None):
        return [], False, True

    monkeypatch.setattr(wl, "fetch_all_features", fake_fetch_all_features)
    rows, host_down = wl.ingest_year(2017, tmp_path)
    assert rows == 0
    assert host_down is True


def test_main_skips_remaining_vintages_after_host_down(monkeypatch, tmp_path, caplog) -> None:
    calls: list[int] = []

    def fake_ingest_year(year, out_dir, max_pages=None):
        calls.append(year)
        if year == wl.AVAILABLE_YEARS[0]:
            return 0, True  # host down on the first vintage
        return 100, False  # would succeed -- should never be reached

    monkeypatch.setattr(wl, "ingest_year", fake_ingest_year)
    exit_code = wl.main(["--out-dir", str(tmp_path)])
    assert calls == [wl.AVAILABLE_YEARS[0]]  # remaining vintages skipped
    assert exit_code == 1  # total rows == 0
