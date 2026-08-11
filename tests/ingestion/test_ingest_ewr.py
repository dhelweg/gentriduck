"""
tests/ingestion/test_ingest_ewr.py
====================================
#335: unit tests for `discover_url_via_ckan()` in `ingestion/berlin/ewr/ingest_ewr.py`
(hardened in #197) -- the positive/exclude title-marker filtering and the fail-closed
behaviour when no exact year match is found in the CKAN `package_search` response.

`urllib.request.urlopen` is monkeypatched with a deterministic fake CKAN response --
no live network, no dependency on datenregister.berlin.de's current catalog contents
(which is exactly what #197 showed is unstable over time).
"""

from __future__ import annotations

import json

from berlin.ewr import ingest_ewr as ewr


class _FakeResponse:
    def __init__(self, body: bytes):
        self._body = body

    def read(self) -> bytes:
        return self._body

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return False


def _dataset(title: str, resources: list[dict]) -> dict:
    return {"title": title, "resources": resources}


def _csv_resource(url: str) -> dict:
    return {"url": url, "format": "CSV"}


def _ckan_payload(datasets: list[dict]) -> bytes:
    return json.dumps({"result": {"results": datasets}}).encode()


def test_discover_url_via_ckan_selects_real_matrix_over_decoys(monkeypatch):
    """A response containing one decoy title from EACH excluded companion category
    (12A foreigners, Wohnlage, Migrationshintergrund, Wohndauer) plus the real 12E
    matrix title for the target year must resolve to the real match, never a decoy --
    even though the decoys are listed FIRST (i.e. would win under the old "first CSV
    resource in first search result" fallback logic)."""
    year = 2025
    real_url = f"https://www.statistik-berlin-brandenburg.de/opendata/EWR_L21_{year}12E_Matrix.csv"

    datasets = [
        _dataset(
            f"Ausländische Einwohnerinnen und Einwohner in Berlin in "
            f"LOR-Planungsräumen am 31.12.{year}",
            [_csv_resource(f"https://example.test/EWR{year}12A_Matrix.csv")],
        ),
        _dataset(
            f"Einwohnerinnen und Einwohner in Berlin in LOR-Planungsräumen nach "
            f"Wohnlage am 31.12.{year}",
            [_csv_resource(f"https://example.test/WOHNLAGE{year}_Matrix.csv")],
        ),
        _dataset(
            f"Einwohnerinnen und Einwohner mit Migrationshintergrund in Berlin in "
            f"LOR-Planungsräumen am 31.12.{year}",
            [_csv_resource(f"https://example.test/EWRMIGRA{year}12E_Matrix.csv")],
        ),
        _dataset(
            f"Einwohnerinnen und Einwohner in Berlin in LOR-Planungsräumen nach "
            f"Wohndauer am 31.12.{year}",
            [_csv_resource(f"https://example.test/WHNDAUER{year}_Matrix.csv")],
        ),
        # An unrelated dataset that happens to mention the year (drift-guard target
        # of #197 -- must NOT be selected even though it contains the year string).
        _dataset(
            f"Monitoring Soziale Stadtentwicklung {year} - [WFS]",
            [_csv_resource(f"https://example.test/mss_{year}.csv")],
        ),
        # The real main-matrix series -- listed LAST, so a naive "first CSV in first
        # result" fallback would never reach it.
        _dataset(
            f"Einwohnerinnen und Einwohner in Berlin in LOR-Planungsräumen am "
            f"31.12.{year}",
            [_csv_resource(real_url)],
        ),
    ]

    def fake_urlopen(url, timeout=None, context=None):  # noqa: ARG001
        return _FakeResponse(_ckan_payload(datasets))

    monkeypatch.setattr(ewr.urllib.request, "urlopen", fake_urlopen)

    result = ewr.discover_url_via_ckan(year)

    assert result == real_url


def test_discover_url_via_ckan_excludes_each_category_individually(monkeypatch):
    """Belt-and-braces: each excluded marker on its own (no other decoys present)
    must not be matched, confirming _EWR_TITLE_EXCLUDE_MARKERS actually drives the
    exclusion rather than some other coincidental filter."""
    year = 2019
    for marker_title in (
        f"Ausländische Einwohnerinnen und Einwohner in Berlin in LOR-Planungsräumen am 31.12.{year}",
        f"Einwohnerinnen und Einwohner in Berlin in LOR-Planungsräumen nach Wohnlage am 31.12.{year}",
        f"Einwohnerinnen und Einwohner mit Migrationshintergrund in Berlin in "
        f"LOR-Planungsräumen am 31.12.{year}",
        f"Einwohnerinnen und Einwohner in Berlin in LOR-Planungsräumen nach Wohndauer am 31.12.{year}",
    ):
        datasets = [_dataset(marker_title, [_csv_resource(f"https://example.test/decoy_{year}.csv")])]

        def fake_urlopen(url, timeout=None, context=None, _datasets=datasets):  # noqa: ARG001
            return _FakeResponse(_ckan_payload(_datasets))

        monkeypatch.setattr(ewr.urllib.request, "urlopen", fake_urlopen)

        result = ewr.discover_url_via_ckan(year)

        assert result is None, f"decoy title incorrectly matched: {marker_title!r}"


def test_discover_url_via_ckan_fails_closed_when_no_exact_year_match(monkeypatch, caplog):
    """When the CKAN response has no dataset/resource carrying the target year (but
    does have EWR-titled datasets for other years, plus unrelated hits), the function
    must return None -- never silently fall back to an unrelated resource -- and log
    a warning."""
    year = 2022  # genuinely unpublished per VINTAGE_URLS' 2021-2023 note

    datasets = [
        # EWR-titled dataset, but for a different year -- must not be matched for 2022.
        _dataset(
            "Einwohnerinnen und Einwohner in Berlin in LOR-Planungsräumen am 31.12.2020",
            [_csv_resource("https://example.test/EWR202012E_Matrix.csv")],
        ),
        # Unrelated dataset that happens to mention 2022 in the title but not the
        # EWR positive markers.
        _dataset(
            "Gesundheits- und Sozialstrukturatlas 2022",
            [_csv_resource("https://example.test/atlas_2022.csv")],
        ),
    ]

    def fake_urlopen(url, timeout=None, context=None):  # noqa: ARG001
        return _FakeResponse(_ckan_payload(datasets))

    monkeypatch.setattr(ewr.urllib.request, "urlopen", fake_urlopen)

    with caplog.at_level("WARNING", logger="ewr_ingest"):
        result = ewr.discover_url_via_ckan(year)

    assert result is None
    assert any(
        "no matching EWR dataset/CSV resource found" in record.message for record in caplog.records
    )


def test_discover_url_via_ckan_fails_closed_on_empty_results(monkeypatch, caplog):
    """No results at all (e.g. a genuinely unpublished year) -- fail closed with a
    warning, not an exception or a wrong-resource fallback."""
    year = 2023

    def fake_urlopen(url, timeout=None, context=None):  # noqa: ARG001
        return _FakeResponse(_ckan_payload([]))

    monkeypatch.setattr(ewr.urllib.request, "urlopen", fake_urlopen)

    with caplog.at_level("WARNING", logger="ewr_ingest"):
        result = ewr.discover_url_via_ckan(year)

    assert result is None
    assert any("no datasets for year" in record.message for record in caplog.records)


def test_discover_url_via_ckan_returns_none_on_network_error(monkeypatch, caplog):
    """A network/transport failure must not propagate as an exception -- the caller
    relies on a graceful None + warning so it can fall through to the vendored tier."""
    year = 2024

    def fake_urlopen(url, timeout=None, context=None):  # noqa: ARG001
        raise OSError("simulated connection failure")

    monkeypatch.setattr(ewr.urllib.request, "urlopen", fake_urlopen)

    with caplog.at_level("WARNING", logger="ewr_ingest"):
        result = ewr.discover_url_via_ckan(year)

    assert result is None
    assert any("CKAN API request failed" in record.message for record in caplog.records)
