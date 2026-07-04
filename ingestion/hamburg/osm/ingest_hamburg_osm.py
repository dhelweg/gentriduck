"""
ingestion/hamburg/osm/ingest_hamburg_osm.py
============================================
H1 (#40) — Hamburg OSM POI ingestion (ADR-0014 Pillar 6 / ADR-0002 Option B).

Source (unchanged mechanics from ADR-0002 / Berlin's C1 ingestor,
ingestion/berlin/osm/ingest_osm_history.py):
  Geofabrik internal server — regional Germany .osh.pbf
  URL: https://osm-internal.download.geofabrik.de/europe/germany-internal.osh.pbf
  Requires: OSM contributor account login (browser download with session cookie).
  Licence: ODbL — https://www.openstreetmap.org/copyright

ADR-0014 explicitly approves this as a source-reuse, not a new source: "Hamburg
requires no new adapter mechanics, only passing Hamburg's statistische-Gebiete/
Stadtteil polygons instead of Berlin's PLR polygons" (ADR-0014 Pillar 6). This
ingestor reuses the identical osmium history-scan + tag-mapping logic as
ingestion/berlin/osm/ingest_osm_history.py, parameterized for:
  - Hamburg's bounding box (WGS-84) instead of Berlin's,
  - city_code = 'HH' (ADR-0005 canonical code — NOT the legacy lowercase
    'berlin' convention stg_osm_poi's Berlin rows use; Hamburg is a fresh
    adapter so it follows the canonical dim_city.city_code from the start,
    matching stg_hamburg_geo / stg_hamburg_sozialmonitoring).

The same physical .osh.pbf file used for Berlin (data/raw/osm/germany-internal.osh.pbf,
gitignored, one-off per-machine download) covers Hamburg too — no second download.

Processing: identical single-pass, multi-year osmium SimpleHandler design as
ingest_osm_history.py: for each target year, extract a point-in-time snapshot
(features visible at YYYY-01-01T00:00:00Z), filtered to the Hamburg bounding box
and the poi_mapping tag set (imported unchanged from the Berlin ingestor — the
OSM tag taxonomy is global, not city-specific; the seed_poi_mapping.csv labels
this projects onto are shared across cities by design, ADR-0005). Output: one
GeoParquet per year under data/raw/osm/hamburg/<year>.parquet.

Not methodology-bearing (pure ingestion/staging plumbing, same class as C1) —
does not touch weighting, normalization, or spatial-join methodology. The C5
OSM-completeness-bias re-fit for Hamburg (ADR-0014 Pillar 6 note) is a separate,
explicitly methodology-bearing follow-up when it lands.

Usage:
  uv run python ingestion/hamburg/osm/ingest_hamburg_osm.py \\
      --osh-pbf data/raw/osm/germany-internal.osh.pbf \\
      --out-dir data/raw/osm/hamburg --years 2008-2024

Bounding box source: OpenStreetMap Nominatim — Hamburg, Germany (administrative
boundary bbox), same convention as Berlin's ingest_osm_history.py.

Attribution (mandatory — ODbL):
  All output parquet files carry source_attribution = "OSM via Geofabrik full-
  history .osh.pbf / ODbL — https://www.openstreetmap.org/copyright" — identical
  string to Berlin's, since it is the same underlying OSM/ODbL source.
  The dbt staging model (stg_osm_poi, extended in this change to union both
  cities) and the website attribution page (Epic G3) must surface this.
"""

from __future__ import annotations

import sys
from pathlib import Path

# Reuse the Berlin C1 ingestor's core extraction machinery unchanged (osmium
# handler, POI tag mapping, parquet writer, CLI parsing) — only the bbox,
# city_code, and default output directory differ for Hamburg. Importing
# rather than copy-pasting keeps the two adapters from drifting on the shared
# OSM tag taxonomy (ADR-0005: the mapping is global, not per-city).
_BERLIN_OSM_DIR = Path(__file__).resolve().parents[2] / "berlin" / "osm"
sys.path.insert(0, str(_BERLIN_OSM_DIR))

import ingest_osm_history as _berlin_osm  # noqa: E402  (path-dependent import)

# ---------------------------------------------------------------------------
# Hamburg-specific constants
# ---------------------------------------------------------------------------

# Hamburg administrative bounding box (WGS-84, degrees).
# Source: OpenStreetMap Nominatim — Hamburg, Germany.
HAMBURG_MIN_LON = 9.730
HAMBURG_MAX_LON = 10.325
HAMBURG_MIN_LAT = 53.395
HAMBURG_MAX_LAT = 53.750

# ADR-0005 canonical city code — matches dim_city.city_code / stg_hamburg_geo /
# stg_hamburg_sozialmonitoring. NOT the legacy lowercase 'berlin' convention
# stg_osm_poi carries for Berlin rows (documented mismatch, see stg_osm_poi.sql
# and schema.yml — Hamburg starts clean on the canonical code).
CITY_CODE = "HH"

DEFAULT_OUT_DIR = Path("data/raw/osm/hamburg")

# Same ODbL attribution string as Berlin — identical underlying source.
SOURCE_ATTRIBUTION = _berlin_osm.SOURCE_ATTRIBUTION


def _patch_for_hamburg() -> None:
    """Monkeypatch the imported Berlin module's module-level bbox/city constants
    so its extraction functions (extract_snapshot, extract_all_snapshots,
    _MultiYearSnapshotHandler) operate on Hamburg's bbox and city_code without
    duplicating the osmium handler logic.

    This is a deliberate reuse-by-parameterization pattern: the handler class
    reads BERLIN_MIN_LON/MAX_LON/MIN_LAT/MAX_LAT and CITY_CODE as *module
    globals* rather than constructor args, so patching those globals before
    calling the shared extraction functions is the minimal-diff way to retarget
    the same code at a second city, matching ADR-0014 Pillar 6's "no new
    adapter mechanics" framing.
    """
    _berlin_osm.BERLIN_MIN_LON = HAMBURG_MIN_LON
    _berlin_osm.BERLIN_MAX_LON = HAMBURG_MAX_LON
    _berlin_osm.BERLIN_MIN_LAT = HAMBURG_MIN_LAT
    _berlin_osm.BERLIN_MAX_LAT = HAMBURG_MAX_LAT
    _berlin_osm.CITY_CODE = CITY_CODE


def main(argv: list[str] | None = None) -> int:
    _patch_for_hamburg()

    # Delegate to the shared CLI/main — identical argument surface, only the
    # default --out-dir differs (Hamburg's own parquet directory).
    import argparse

    parser = argparse.ArgumentParser(
        description="H1 — Extract annual OSM POI snapshots for Hamburg from a .osh.pbf history file."
    )
    parser.add_argument(
        "--osh-pbf",
        required=True,
        type=Path,
        help=(
            "Path to the Geofabrik Germany full-history file "
            "(e.g. data/raw/osm/germany-internal.osh.pbf) — the SAME file used for "
            "Berlin's C1 ingestion; no second download needed. "
            "Download from https://osm-internal.download.geofabrik.de/europe/ "
            "with the maintainer's OSM contributor account (ADR-0002)."
        ),
    )
    parser.add_argument(
        "--out-dir",
        default=DEFAULT_OUT_DIR,
        type=Path,
        help=f"Output directory for per-year .parquet files (default: {DEFAULT_OUT_DIR}).",
    )
    parser.add_argument(
        "--years",
        default="2008-2024",
        help="Year range to process, e.g. '2008-2024' or '2018,2019,2020' (default: 2008-2024).",
    )
    parser.add_argument(
        "--skip-existing",
        action="store_true",
        default=True,
        help="Skip years where the output parquet already exists (default: True).",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        default=False,
        help="Overwrite existing output parquet files.",
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=1,
        help="Number of parallel worker processes (default: 1).",
    )
    args = parser.parse_args(argv)

    osh_pbf: Path = args.osh_pbf
    if not osh_pbf.exists():
        _berlin_osm.log.error(
            "OSH PBF file not found: %s\n"
            "Download the Germany full-history file from:\n"
            "  https://osm-internal.download.geofabrik.de/europe/\n"
            "Requires an OSM contributor account (https://www.openstreetmap.org).\n"
            "Save to: data/raw/osm/germany-internal.osh.pbf  (gitignored). "
            "This is the SAME file Berlin's C1 ingestion uses — no second download.",
            osh_pbf,
        )
        return 1

    years = _berlin_osm.parse_years(args.years)
    out_dir: Path = args.out_dir
    skip_existing = args.skip_existing and not args.force

    repo_root = Path(__file__).resolve().parents[3]
    seeds_dir = repo_root / "transform" / "seeds"
    poi_mapping = _berlin_osm.load_poi_mapping(seeds_dir)

    _berlin_osm.log.info(
        "Starting H1 Hamburg OSM history ingestion: %d years (%d-%d), output -> %s",
        len(years),
        min(years),
        max(years),
        out_dir,
    )
    _berlin_osm.log.info(
        "POI mapping: %d tag pairs loaded (shared with Berlin C1)", len(poi_mapping)
    )
    _berlin_osm.log.info(
        "Hamburg bbox: lon [%.3f, %.3f], lat [%.3f, %.3f]",
        HAMBURG_MIN_LON,
        HAMBURG_MAX_LON,
        HAMBURG_MIN_LAT,
        HAMBURG_MAX_LAT,
    )

    years_to_run = [
        y
        for y in sorted(years, reverse=True)
        if not (skip_existing and (out_dir / f"{y}.parquet").exists())
    ]
    for y in sorted(years):
        if y not in years_to_run:
            _berlin_osm.log.info("Skipping year=%d (output exists: %s.parquet)", y, y)

    if not years_to_run:
        _berlin_osm.log.info("All years already exist. Done.")
        return 0

    workers = min(args.workers, len(years_to_run))
    _berlin_osm.log.info(
        "Processing %d years with %d worker(s): %s", len(years_to_run), workers, years_to_run
    )

    def _run_year(year: int) -> None:
        df = _berlin_osm.extract_snapshot(osh_pbf, year, poi_mapping)
        _berlin_osm.write_parquet(df, out_dir / f"{year}.parquet")

    if workers == 1:
        for year in years_to_run:
            _run_year(year)
    else:
        import multiprocessing

        with multiprocessing.Pool(processes=workers) as pool:
            pool.starmap(
                _run_year_worker,
                [(osh_pbf, y, poi_mapping, out_dir) for y in years_to_run],
            )

    _berlin_osm.log.info("Done. Output directory: %s", out_dir)
    return 0


def _run_year_worker(osh_pbf: Path, year: int, poi_mapping: dict, out_dir: Path) -> None:
    """Top-level worker function for multiprocessing (must be picklable)."""
    _patch_for_hamburg()
    df = _berlin_osm.extract_snapshot(osh_pbf, year, poi_mapping)
    _berlin_osm.write_parquet(df, out_dir / f"{year}.parquet")


if __name__ == "__main__":
    sys.exit(main())
