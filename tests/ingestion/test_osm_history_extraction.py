"""
tests/ingestion/test_osm_history_extraction.py
================================================
OSM history extraction (C1 Berlin / H1 Hamburg) against a tiny synthetic
full-history .osh.pbf written with pyosmium -- no 12 GB download needed.

Covers the 2026-10-26 changes and the history semantics they depend on:
  * the CLI's default single-pass path (one read of the file for all years);
  * point-in-time snapshots at YYYY-01-01 (creations and deletions honoured);
  * FIRST-matching-tag classification (regression: #252 silently flipped it to
    last-match-wins when it removed the tag loop's `break`);
  * `cuisine` capture;
  * Hamburg's bbox/city_code monkeypatch reaching the shared handler;
  * the deprecated --partial-years flag still working (renames only) but warning.

`_write_manifest` is stubbed in every test so the committed ADR-0016 manifests
are never touched.
"""

from __future__ import annotations

import datetime as dt
import logging
import sys
from pathlib import Path

import pandas as pd
import pytest

osmium = pytest.importorskip("osmium")

_REPO = Path(__file__).resolve().parents[2]
for _sub in ("berlin/osm", "hamburg/osm"):
    _p = str(_REPO / "ingestion" / _sub)
    if _p not in sys.path:
        sys.path.insert(0, _p)

import ingest_hamburg_osm as hosm  # noqa: E402  (path-dependent import)
import ingest_osm_history as bosm  # noqa: E402  (same module object hosm patches)

_UTC = dt.timezone.utc
_BERLIN = (13.40, 52.50)  # inside Berlin's bbox
_HAMBURG = (10.00, 53.55)  # inside Hamburg's bbox, outside Berlin's
_PATCHED_GLOBALS = (
    "BERLIN_MIN_LON",
    "BERLIN_MAX_LON",
    "BERLIN_MIN_LAT",
    "BERLIN_MAX_LAT",
    "CITY_CODE",
)


def _node(node_id, version, when, loc, tags, visible=True):
    return osmium.osm.mutable.Node(
        id=node_id,
        version=version,
        visible=visible,
        changeset=version,
        uid=1,
        user="fixture",
        timestamp=dt.datetime(*when, tzinfo=_UTC),
        location=loc,
        tags=tags,
    )


@pytest.fixture()
def history_pbf(tmp_path: Path) -> Path:
    path = tmp_path / "fixture.osh.pbf"
    header = osmium.io.Header()
    header.has_multiple_object_versions = True
    writer = osmium.SimpleWriter(str(path), 4096, header)
    # node 1: Berlin cafe, created mid-2009, deleted mid-2011 -> in 2010 only.
    writer.add_node(_node(1, 1, (2009, 6, 1), _BERLIN, {"amenity": "cafe"}))
    writer.add_node(_node(1, 2, (2011, 6, 1), _BERLIN, {}, visible=False))
    # node 2: Berlin cafe AND bakery (+cuisine), created 2011 -> in 2012 only.
    # Tag order is fixed so "first matching tag" is unambiguous: amenity=cafe first.
    writer.add_node(
        _node(
            2,
            1,
            (2011, 3, 1),
            _BERLIN,
            [("amenity", "cafe"), ("shop", "bakery"), ("cuisine", "coffee_shop")],
        )
    )
    # node 3: Hamburg cafe, created 2009 -> never in Berlin; in Hamburg 2010 + 2012.
    writer.add_node(_node(3, 1, (2009, 1, 1), _HAMBURG, {"amenity": "cafe"}))
    writer.close()
    return path


def _years(out_dir: Path) -> dict[str, pd.DataFrame]:
    return {p.stem: pd.read_parquet(p) for p in sorted(out_dir.glob("*.parquet"))}


def test_berlin_single_pass_snapshot_semantics(history_pbf, tmp_path, monkeypatch) -> None:
    monkeypatch.setattr(bosm, "_write_manifest", lambda *a, **k: None)
    out = tmp_path / "berlin"
    argv = ["--osh-pbf", str(history_pbf), "--out-dir", str(out), "--years", "2010,2012"]
    assert bosm.main(argv) == 0

    years = _years(out)
    assert sorted(years) == ["2010", "2012"]
    assert list(years["2010"].osm_id) == ["node/1"]  # created 2009, still visible at 2010-01-01
    assert list(years["2012"].osm_id) == ["node/2"]  # node/1 deleted 2011; node/2 created 2011
    assert set(years["2010"].city_code) == {"berlin"}

    row = years["2012"].iloc[0]
    cafe_type = bosm.load_poi_mapping(None)[("amenity", "cafe")][2]
    bakery_type = bosm.load_poi_mapping(None)[("shop", "bakery")][2]
    assert row.poi_type == cafe_type, (
        f"first matching tag must win: expected {cafe_type!r}, got {row.poi_type!r} "
        f"({bakery_type!r} means last-match-wins -- the #252 regression)"
    )
    assert row.cuisine == "coffee_shop"


def test_hamburg_single_pass_uses_hamburg_bbox(history_pbf, tmp_path, monkeypatch) -> None:
    # hosm.main() monkeypatches the shared Berlin module's globals; register them so
    # pytest restores Berlin's bbox afterwards and test order cannot matter.
    for name in _PATCHED_GLOBALS:
        monkeypatch.setattr(bosm, name, getattr(bosm, name))
    monkeypatch.setattr(hosm, "_write_manifest", lambda *a, **k: None)
    out = tmp_path / "hamburg"
    argv = ["--osh-pbf", str(history_pbf), "--out-dir", str(out), "--years", "2010,2012"]
    assert hosm.main(argv) == 0

    years = _years(out)
    assert list(years["2010"].osm_id) == ["node/3"]
    assert list(years["2012"].osm_id) == ["node/3"]
    assert set(years["2012"].city_code) == {"HH"}


def test_partial_years_still_renames_but_warns(history_pbf, tmp_path, monkeypatch, caplog) -> None:
    monkeypatch.setattr(bosm, "_write_manifest", lambda *a, **k: None)
    out = tmp_path / "berlin"
    argv = [
        "--osh-pbf",
        str(history_pbf),
        "--out-dir",
        str(out),
        "--years",
        "2012",
        "--partial-years",
        "2012",
    ]
    with caplog.at_level(logging.WARNING):
        assert bosm.main(argv) == 0
    assert (out / "2012-partial.parquet").exists()
    assert "deprecated" in caplog.text


def _write_pbf(path: Path, nodes: list) -> Path:
    header = osmium.io.Header()
    header.has_multiple_object_versions = True
    writer = osmium.SimpleWriter(str(path), 4096, header)
    for n in nodes:
        writer.add_node(n)
    writer.close()
    return path


@pytest.fixture()
def lifecycle_pbf(tmp_path: Path) -> Path:
    """Deletion edge cases (review of 13fb28ef, 2026-10-26), in both cities.

    node 1 (Berlin):  created 2009, deleted mid-2011, re-created mid-2013
    node 2 (Berlin):  created 2009, deleted at EXACTLY 2012-01-01T00:00Z (the snapshot instant)
    node 3 (Hamburg): created 2009, deleted mid-2011
    """
    cafe = {"amenity": "cafe"}
    return _write_pbf(
        tmp_path / "lifecycle.osh.pbf",
        [
            _node(1, 1, (2009, 6, 1), _BERLIN, cafe),
            _node(1, 2, (2011, 6, 1), _BERLIN, {}, visible=False),
            _node(1, 3, (2013, 6, 1), _BERLIN, cafe),
            _node(2, 1, (2009, 6, 1), _BERLIN, cafe),
            _node(2, 2, (2012, 1, 1), _BERLIN, {}, visible=False),
            _node(3, 1, (2009, 6, 1), _HAMBURG, cafe),
            _node(3, 2, (2011, 6, 1), _HAMBURG, {}, visible=False),
        ],
    )


def test_deletion_recreation_and_snapshot_instant(lifecycle_pbf, tmp_path, monkeypatch) -> None:
    """A deletion removes the node from every snapshot at/after its timestamp (inclusive of
    a deletion exactly at the snapshot instant), never from earlier ones, and a later
    visible version restores it."""
    monkeypatch.setattr(bosm, "_write_manifest", lambda *a, **k: None)
    out = tmp_path / "berlin"
    argv = ["--osh-pbf", str(lifecycle_pbf), "--out-dir", str(out), "--years", "2010,2012,2014"]
    assert bosm.main(argv) == 0
    years = _years(out)
    assert sorted(years["2010"].osm_id) == ["node/1", "node/2"]
    assert list(years["2012"].osm_id) == []  # node/1 deleted 2011; node/2 deleted AT 2012-01-01
    assert list(years["2014"].osm_id) == ["node/1"]  # node/1 re-created 2013


def test_hamburg_applies_deletions(lifecycle_pbf, tmp_path, monkeypatch) -> None:
    for name in _PATCHED_GLOBALS:
        monkeypatch.setattr(bosm, name, getattr(bosm, name))
    monkeypatch.setattr(hosm, "_write_manifest", lambda *a, **k: None)
    out = tmp_path / "hamburg"
    argv = ["--osh-pbf", str(lifecycle_pbf), "--out-dir", str(out), "--years", "2010,2012"]
    assert hosm.main(argv) == 0
    years = _years(out)
    assert list(years["2010"].osm_id) == ["node/3"]
    assert list(years["2012"].osm_id) == []


def test_workers_path_matches_single_pass(lifecycle_pbf, tmp_path, monkeypatch) -> None:
    """--workers > 1 (one full read per year, multiprocessing) must produce exactly what the
    default single-pass path produces -- same handler, different driver."""
    monkeypatch.setattr(bosm, "_write_manifest", lambda *a, **k: None)
    single, multi = tmp_path / "single", tmp_path / "multi"
    base = ["--osh-pbf", str(lifecycle_pbf), "--years", "2010,2012,2014"]
    assert bosm.main([*base, "--out-dir", str(single)]) == 0
    assert bosm.main([*base, "--out-dir", str(multi), "--workers", "2"]) == 0
    a, b = _years(single), _years(multi)
    assert sorted(a) == sorted(b)
    for year in a:
        pd.testing.assert_frame_equal(
            a[year].sort_values("osm_id").reset_index(drop=True),
            b[year].sort_values("osm_id").reset_index(drop=True),
        )
