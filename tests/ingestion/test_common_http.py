"""
tests/ingestion/test_common_http.py
=====================================
QA-2 (#177): unit tests for `ingestion/common/http.py`'s retry+backoff fetch
helpers.

All `urllib.request.urlopen` calls are monkeypatched -- no live network
access, deterministic, fast (per QA-2's own re-scoping note: 18 scripts'
real network-fetch behaviour can't be safely regression-tested without live
upstream access, so this slice tests the shared retry/validation logic in
isolation instead).
"""

from __future__ import annotations

import json
import urllib.error

import pytest

from common.http import FetchError, fetch_bytes, fetch_geojson, fetch_json


class _FakeResponse:
    def __init__(self, body: bytes):
        self._body = body

    def read(self) -> bytes:
        return self._body

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return False


def _no_sleep(_seconds: float) -> None:
    """Fast, deterministic stand-in for time.sleep in tests."""


def test_fetch_bytes_succeeds_first_try(monkeypatch):
    calls = []

    def fake_urlopen(url, timeout=None, context=None):  # noqa: ARG001
        calls.append(url)
        return _FakeResponse(b"hello")

    monkeypatch.setattr("urllib.request.urlopen", fake_urlopen)

    result = fetch_bytes("https://example.test/x", max_retries=3, sleep_fn=_no_sleep)

    assert result == b"hello"
    assert len(calls) == 1


def test_fetch_bytes_retries_on_transient_network_error_then_succeeds(monkeypatch):
    attempts = {"n": 0}

    def fake_urlopen(url, timeout=None, context=None):  # noqa: ARG001
        attempts["n"] += 1
        if attempts["n"] < 3:
            raise urllib.error.URLError("temporary DNS hiccup")
        return _FakeResponse(b"ok")

    monkeypatch.setattr("urllib.request.urlopen", fake_urlopen)

    result = fetch_bytes("https://example.test/x", max_retries=5, sleep_fn=_no_sleep)

    assert result == b"ok"
    assert attempts["n"] == 3


def test_fetch_bytes_retries_on_retryable_http_status(monkeypatch):
    attempts = {"n": 0}

    def fake_urlopen(url, timeout=None, context=None):  # noqa: ARG001
        attempts["n"] += 1
        if attempts["n"] < 2:
            raise urllib.error.HTTPError(url, 503, "Service Unavailable", {}, None)
        return _FakeResponse(b"ok")

    monkeypatch.setattr("urllib.request.urlopen", fake_urlopen)

    result = fetch_bytes("https://example.test/x", max_retries=3, sleep_fn=_no_sleep)

    assert result == b"ok"
    assert attempts["n"] == 2


def test_fetch_bytes_does_not_retry_permanent_404(monkeypatch):
    attempts = {"n": 0}

    def fake_urlopen(url, timeout=None, context=None):  # noqa: ARG001
        attempts["n"] += 1
        raise urllib.error.HTTPError(url, 404, "Not Found", {}, None)

    monkeypatch.setattr("urllib.request.urlopen", fake_urlopen)

    with pytest.raises(FetchError, match="HTTP 404"):
        fetch_bytes("https://example.test/x", max_retries=3, sleep_fn=_no_sleep)

    assert attempts["n"] == 1


def test_fetch_bytes_raises_fetch_error_after_exhausting_retries(monkeypatch):
    def fake_urlopen(url, timeout=None, context=None):  # noqa: ARG001
        raise urllib.error.URLError("still down")

    monkeypatch.setattr("urllib.request.urlopen", fake_urlopen)

    with pytest.raises(FetchError, match="Exhausted 3 attempts"):
        fetch_bytes("https://example.test/x", max_retries=3, sleep_fn=_no_sleep)


def test_fetch_json_parses_body(monkeypatch):
    def fake_urlopen(url, timeout=None, context=None):  # noqa: ARG001
        return _FakeResponse(json.dumps({"a": 1}).encode())

    monkeypatch.setattr("urllib.request.urlopen", fake_urlopen)

    assert fetch_json("https://example.test/x", sleep_fn=_no_sleep) == {"a": 1}


def test_fetch_json_raises_on_invalid_json(monkeypatch):
    def fake_urlopen(url, timeout=None, context=None):  # noqa: ARG001
        return _FakeResponse(b"not json{")

    monkeypatch.setattr("urllib.request.urlopen", fake_urlopen)

    with pytest.raises(FetchError, match="Invalid JSON"):
        fetch_json("https://example.test/x", sleep_fn=_no_sleep)


def test_fetch_geojson_accepts_feature_collection(monkeypatch):
    body = json.dumps({"type": "FeatureCollection", "features": []}).encode()

    def fake_urlopen(url, timeout=None, context=None):  # noqa: ARG001
        return _FakeResponse(body)

    monkeypatch.setattr("urllib.request.urlopen", fake_urlopen)

    data = fetch_geojson("https://example.test/wfs", sleep_fn=_no_sleep)
    assert data["type"] == "FeatureCollection"


def test_fetch_geojson_rejects_non_feature_collection(monkeypatch):
    body = json.dumps({"type": "ExceptionReport"}).encode()

    def fake_urlopen(url, timeout=None, context=None):  # noqa: ARG001
        return _FakeResponse(body)

    monkeypatch.setattr("urllib.request.urlopen", fake_urlopen)

    with pytest.raises(FetchError, match="Expected GeoJSON FeatureCollection"):
        fetch_geojson("https://example.test/wfs", sleep_fn=_no_sleep)
