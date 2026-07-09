"""
ingestion/common/http.py
=========================
QA-2 (#177) — shared HTTP fetch helpers with bounded retry+backoff.

Factors out the pattern that was duplicated across ~15 ingest scripts:
  1. SSL context construction (certifi bundle when available — macOS'
     system Python has no CA bundle of its own).
  2. A single `urllib.request.urlopen` call with no retry, so one
     transient WFS/CKAN hiccup aborted the whole `poe ingest`/`poe
     refresh` sequence mid-way (the QA-2 issue's core complaint).
  3. PDF downloads (`download_pdf`, duplicated in the Mietspiegel/
     Strassenverzeichnis scripts) — same retry semantics as `fetch_bytes`,
     plus the `User-Agent` header those scripts send and an atomic write
     to disk (QA-2's "non-atomic writes" finding covers PDF artefacts too,
     not just Parquet).

Deliberately stdlib + `certifi` only (already a pyproject.toml dependency)
— no new tool/library per CLAUDE.md golden rule #1/#2.
"""

from __future__ import annotations

import json
import logging
import ssl
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any, Optional

log = logging.getLogger(__name__)

# Retryable network conditions: timeouts, connection resets, 5xx / 429.
# 4xx other than 429 (e.g. 404 "not found") are NOT retried — retrying a
# permanent client error just wastes the backoff budget.
_RETRYABLE_HTTP_STATUSES = {429, 500, 502, 503, 504}

DEFAULT_TIMEOUT = 120
DEFAULT_MAX_RETRIES = 3
DEFAULT_BACKOFF_BASE = 1.0  # seconds; attempt N sleeps backoff_base * 2**(N-1)
DEFAULT_USER_AGENT = "gentriduck-ingest/1.0"


class FetchError(RuntimeError):
    """Raised when a fetch fails after exhausting all retries."""


def build_ssl_context() -> ssl.SSLContext:
    """Build an SSL context, preferring certifi's CA bundle when available.

    macOS' bundled Python does not ship CA certs, so `urlopen` over HTTPS
    fails there without an explicit `cafile`. `certifi` is already a
    pyproject.toml dependency (transitively required by `requests`-using
    libs), so this has no new-dependency cost.
    """
    try:
        import certifi

        return ssl.create_default_context(cafile=certifi.where())
    except ImportError:  # pragma: no cover - certifi is a hard dependency in this repo
        return ssl.create_default_context()


# Built once at import time, matching every script's former module-level
# `_SSL_CONTEXT` constant (ssl.SSLContext is safe to reuse across requests).
_SSL_CONTEXT = build_ssl_context()


def fetch_bytes(
    url: str,
    *,
    timeout: int = DEFAULT_TIMEOUT,
    max_retries: int = DEFAULT_MAX_RETRIES,
    backoff_base: float = DEFAULT_BACKOFF_BASE,
    sleep_fn=time.sleep,
    headers: Optional[dict[str, str]] = None,
) -> bytes:
    """Fetch raw bytes from `url` with bounded retry+backoff.

    Retries on network errors (`URLError`, socket timeouts) and on 429 /
    5xx HTTP status codes, up to `max_retries` attempts total. Sleeps
    `backoff_base * 2**(attempt-1)` seconds between attempts (attempt 1
    has no prior sleep). Does NOT retry on other HTTP errors (e.g. 404) —
    those are permanent for a given URL within a run.

    `headers` (optional) are sent on every attempt via `urllib.request.Request`
    — e.g. a `User-Agent` some upstream hosts require (see `download_pdf`).

    Raises `FetchError` if all attempts are exhausted.
    """
    last_exc: Optional[BaseException] = None
    for attempt in range(1, max_retries + 1):
        if attempt > 1:
            delay = backoff_base * (2 ** (attempt - 2))
            log.warning(
                "Retry %d/%d for %s after %.1fs backoff (previous error: %s)",
                attempt,
                max_retries,
                url,
                delay,
                last_exc,
            )
            sleep_fn(delay)
        try:
            req = urllib.request.Request(url, headers=headers or {})  # noqa: S310
            with urllib.request.urlopen(req, timeout=timeout, context=_SSL_CONTEXT) as resp:  # noqa: S310
                return resp.read()
        except urllib.error.HTTPError as exc:
            last_exc = exc
            if exc.code not in _RETRYABLE_HTTP_STATUSES:
                raise FetchError(f"HTTP {exc.code} fetching {url}: {exc}") from exc
            # Retryable status: fall through to the loop (or raise below on last attempt).
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            last_exc = exc
            # Retryable network condition: fall through to the loop.
        except Exception as exc:  # noqa: BLE001 - surface unexpected errors, don't retry them
            raise FetchError(f"Unexpected error fetching {url}: {exc}") from exc

    raise FetchError(f"Exhausted {max_retries} attempts fetching {url}: {last_exc}") from last_exc


def fetch_json(
    url: str,
    *,
    timeout: int = DEFAULT_TIMEOUT,
    max_retries: int = DEFAULT_MAX_RETRIES,
    backoff_base: float = DEFAULT_BACKOFF_BASE,
    sleep_fn=time.sleep,
) -> Any:
    """Fetch `url` and parse the response body as JSON. See `fetch_bytes`."""
    raw = fetch_bytes(
        url, timeout=timeout, max_retries=max_retries, backoff_base=backoff_base, sleep_fn=sleep_fn
    )
    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        raise FetchError(f"Invalid JSON response from {url}: {exc}") from exc


def fetch_geojson(
    url: str,
    *,
    timeout: int = DEFAULT_TIMEOUT,
    max_retries: int = DEFAULT_MAX_RETRIES,
    backoff_base: float = DEFAULT_BACKOFF_BASE,
    sleep_fn=time.sleep,
) -> dict:
    """Fetch `url` and parse+validate a GeoJSON FeatureCollection.

    Same retry semantics as `fetch_bytes`; additionally raises `FetchError`
    if the parsed JSON isn't a `type: FeatureCollection` document (matches
    every ingest script's prior local `fetch_geojson` validation).
    """
    raw = fetch_bytes(
        url, timeout=timeout, max_retries=max_retries, backoff_base=backoff_base, sleep_fn=sleep_fn
    )
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise FetchError(f"Invalid JSON response from {url}: {exc}") from exc

    if data.get("type") != "FeatureCollection":
        raise FetchError(
            f"Expected GeoJSON FeatureCollection from {url}, "
            f"got type={data.get('type')!r}. Response excerpt: {str(raw[:200])}"
        )
    return data


def download_pdf(
    url: str,
    dest: Path,
    *,
    timeout: int = 60,
    max_retries: int = DEFAULT_MAX_RETRIES,
    backoff_base: float = DEFAULT_BACKOFF_BASE,
    sleep_fn=time.sleep,
    user_agent: str = DEFAULT_USER_AGENT,
) -> int:
    """Download a PDF (or any binary) from `url` to `dest`, atomically.

    Replaces the identical `download_pdf` duplicated in
    `ingest_mietspiegel.py` and `ingest_strassenverzeichnis.py`: same
    `User-Agent` header and tmp-file-then-rename atomic write, but now with
    `fetch_bytes`' bounded retry+backoff instead of a single unretried
    `urlopen` call.

    Returns the number of bytes written. Raises `FetchError` on failure
    (network error after exhausting retries, or a non-retryable HTTP error);
    `dest` is left untouched on failure.
    """
    data = fetch_bytes(
        url,
        timeout=timeout,
        max_retries=max_retries,
        backoff_base=backoff_base,
        sleep_fn=sleep_fn,
        headers={"User-Agent": user_agent},
    )
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(dest.suffix + ".tmp")
    tmp.write_bytes(data)
    tmp.replace(dest)
    log.info("Saved %d bytes -> %s", len(data), dest)
    return len(data)
