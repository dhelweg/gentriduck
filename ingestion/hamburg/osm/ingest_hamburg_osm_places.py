"""
ingestion/hamburg/osm/ingest_hamburg_osm_places.py
====================================================
#307 — Hamburg OSM `place=*` name extraction, for the statistisches-Gebiet
(subarea_l2) name-enrichment crosswalk (I21-g follow-up).

Problem this feeds: `ingest_hamburg_geo.py`'s statistische-Gebiete WFS layer
has no name property at the source (`name_prop: None`, see that module's
WFS_LAYERS["statgebiet"]). This ingestor extracts OSM `place=neighbourhood`
/ `place=suburb` / `place=quarter` point features so a downstream dbt model
can derive a display-only name for each Gebiet via polygon match (see
transform/models/intermediate/int_hamburg_gebiet_osm_names.sql).

Source (reuse, not a new source — same class of reuse ADR-0014 Pillar 6
already approved for ingest_hamburg_osm.py's POI extraction):
  The same Hamburg-covering Geofabrik .osh.pbf already ingested for H1 POI
  history (data/raw/osm/germany-internal.osh.pbf, gitignored, one-off
  per-machine download, ODbL). This script reuses ingest_osm_history.py's
  bbox-filter + osmium SimpleHandler machinery (imported the same way
  ingest_hamburg_osm.py does), but targets a different OSM tag set
  (`place=*` instead of the POI `poi_mapping` tag set) and a different
  extraction shape: a single **current** snapshot (latest visible version
  of each node), not a multi-year history series — this is a name lookup,
  not a time series, so no per-year snapshot logic is needed.

Scope decision (documented, not a methodology choice — display/plumbing
only): only OSM **nodes** are extracted. In practice, informal
neighbourhood/suburb/quarter names in OSM Germany are overwhelmingly
tagged on nodes (a single representative point), not closed ways/relations
with a full polygon boundary. Extracting way/relation `place=*` polygons
would require osmium's multipolygon area-assembly machinery (a
substantially heavier processing path than the POI extractor's node-only
SimpleHandler), which is not justified for a best-effort, "partial match
quality expected" name crosswalk (#307's own scope note). If OSM place
*polygons* turn out to matter for match coverage, that is a documented
follow-up, not silently done here. The downstream matching model therefore
always treats the OSM place feature as a point (its node coordinate) and
does a point-in-polygon test against the Gebiet geometry, never a
largest-overlap polygon test.

Output parquet schema (data/raw/osm/hamburg_places/place_names.parquet -- a
sibling directory to data/raw/osm/hamburg/, NOT inside it: that directory's
glob is stg_osm_poi's raw_osm.hamburg source, and this file's schema is not
POI-shaped, so it must not land in the same glob):
  city_code           (string): 'HH'
  osm_id              (string): 'node/<id>'
  place_type          (string): 'neighbourhood' | 'suburb' | 'quarter'
  place_name          (string): OSM `name` tag value
  lon, lat            (float64): WGS-84 node coordinate
  source_attribution  (string): mandatory ODbL attribution

Usage:
  uv run python ingestion/hamburg/osm/ingest_hamburg_osm_places.py \\
      --osh-pbf data/raw/osm/germany-internal.osh.pbf \\
      --out-dir data/raw/osm/hamburg_places

Runtime: one full sequential pass through the .osh.pbf (~60-90 min on the
same hardware ingest_osm_history.py's header documents for a single year —
this script also does exactly one pass, since it only needs the latest
visible state, not a per-year cutoff).

Attribution (mandatory — ODbL): identical string to the existing Hamburg/
Berlin OSM POI ingestors, since it is the same underlying OSM source.
"""

from __future__ import annotations

import argparse
import logging
import sys
from pathlib import Path
from typing import Optional

import osmium
import osmium.osm
import pyarrow as pa

# Reuse the Berlin C1 ingestor's bbox/attribution constants + CLI conventions
# the same way ingest_hamburg_osm.py does (path-dependent import, see that
# module's own comment for the full rationale) -- avoids re-deriving the
# Hamburg bounding box or the ODbL attribution string a third time.
_BERLIN_OSM_DIR = Path(__file__).resolve().parents[2] / "berlin" / "osm"
sys.path.insert(0, str(_BERLIN_OSM_DIR))

import ingest_osm_history as _berlin_osm  # noqa: E402  (path-dependent import)

# ADR-0016: shared drift-detection manifest helper.
_INGESTION_ROOT = _BERLIN_OSM_DIR.parent.parent
if str(_INGESTION_ROOT) not in sys.path:
    sys.path.insert(0, str(_INGESTION_ROOT))
from manifest import existing_outputs, write_manifest_entry  # noqa: E402

# QA-2 (#177): shared atomic-write helper.
from common.io import atomic_write_parquet  # noqa: E402

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

# Hamburg administrative bounding box (WGS-84, degrees) -- identical to
# ingest_hamburg_osm.py's HAMBURG_MIN/MAX_LON/LAT (kept as a literal copy
# rather than importing that module too, since it self-patches Berlin's
# module-level globals on import and we don't want that side effect here).
HAMBURG_MIN_LON = 9.730
HAMBURG_MAX_LON = 10.325
HAMBURG_MIN_LAT = 53.395
HAMBURG_MAX_LAT = 53.750

CITY_CODE = "HH"

# The OSM place values we treat as informal-neighbourhood name candidates.
# See https://wiki.openstreetmap.org/wiki/Key:place -- neighbourhood/suburb/
# quarter are the sub-city informal-area tags; town/city/village etc. are
# deliberately excluded (wrong grain for a statistisches-Gebiet match).
PLACE_TYPES = ("neighbourhood", "suburb", "quarter")

SOURCE_ATTRIBUTION = _berlin_osm.SOURCE_ATTRIBUTION


# NOTE: deliberately NOT data/raw/osm/hamburg/ -- that directory's *.parquet
# glob is stg_osm_poi's raw_osm.hamburg source (union_by_name=true across
# every file in it); dropping a differently-shaped place-names parquet in
# there would silently pollute that POI union with extra columns/rows. A
# sibling directory keeps this a fully independent source/staging model.
DEFAULT_OUT_DIR = Path("data/raw/osm/hamburg_places")
DEFAULT_OUT_FILE = "place_names.parquet"

OUTPUT_SCHEMA = pa.schema(
    [
        pa.field("city_code", pa.string()),
        pa.field("osm_id", pa.string()),
        pa.field("place_type", pa.string()),
        pa.field("place_name", pa.string()),
        pa.field("lon", pa.float64()),
        pa.field("lat", pa.float64()),
        pa.field("source_attribution", pa.string()),
    ]
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    stream=sys.stdout,
)
log = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# osmium handler -- current-snapshot only (latest visible version per node)
# ---------------------------------------------------------------------------


class _CurrentPlaceHandler(osmium.SimpleHandler):
    """Extracts the latest visible `place=neighbourhood|suburb|quarter` node
    for each OSM node id within the Hamburg bbox.

    Unlike ingest_osm_history.py's _MultiYearSnapshotHandler, this does not
    need a per-year cutoff timestamp -- node() is called for every version of
    every node in chronological order, so simply keeping (and overwriting)
    the row for each node id as we go, and dropping it when a later version
    is deleted or no longer a place=* match, naturally leaves the *current*
    (latest-visible) state after a single pass.
    """

    def __init__(self) -> None:
        super().__init__()
        self._candidates: dict[int, dict] = {}

    def node(self, n: osmium.osm.Node) -> None:
        try:
            lon = n.lon
            lat = n.lat
        except Exception:
            return

        in_bbox = (
            HAMBURG_MIN_LON <= lon <= HAMBURG_MAX_LON and HAMBURG_MIN_LAT <= lat <= HAMBURG_MAX_LAT
        )
        if not in_bbox or not n.visible:
            self._candidates.pop(n.id, None)
            return

        place_type = None
        name = None
        for tag in n.tags:
            if tag.k == "place" and tag.v in PLACE_TYPES:
                place_type = tag.v
            if tag.k == "name":
                name = tag.v

        if place_type is None or not name:
            self._candidates.pop(n.id, None)
            return

        self._candidates[n.id] = {
            "city_code": CITY_CODE,
            "osm_id": f"node/{n.id}",
            "place_type": place_type,
            "place_name": name,
            "lon": lon,
            "lat": lat,
            "source_attribution": SOURCE_ATTRIBUTION,
        }


def extract_current_places(osh_pbf_path: Path) -> list[dict]:
    """Single pass through the .osh.pbf, returning the current place=* rows."""
    log.info("Extracting current OSM place=%s snapshot from %s ...", PLACE_TYPES, osh_pbf_path)
    handler = _CurrentPlaceHandler()
    handler.apply_file(str(osh_pbf_path))
    rows = list(handler._candidates.values())
    log.info("  -> %d place candidates after bbox + tag match", len(rows))
    return rows


# ---------------------------------------------------------------------------
# Writer
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path) -> None:
    table = pa.table(
        {
            "city_code": pa.array([r["city_code"] for r in rows], type=pa.string()),
            "osm_id": pa.array([r["osm_id"] for r in rows], type=pa.string()),
            "place_type": pa.array([r["place_type"] for r in rows], type=pa.string()),
            "place_name": pa.array([r["place_name"] for r in rows], type=pa.string()),
            "lon": pa.array([r["lon"] for r in rows], type=pa.float64()),
            "lat": pa.array([r["lat"] for r in rows], type=pa.float64()),
            "source_attribution": pa.array(
                [r["source_attribution"] for r in rows], type=pa.string()
            ),
        },
        schema=OUTPUT_SCHEMA,
    )
    atomic_write_parquet(table, out_path, compression="zstd", compression_level=3)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "#307 -- Extract the current OSM place=neighbourhood/suburb/quarter "
            "nodes for Hamburg from a .osh.pbf history file, for the statistisches "
            "-Gebiet name-match crosswalk."
        )
    )
    p.add_argument(
        "--osh-pbf",
        required=True,
        type=Path,
        help=(
            "Path to the Geofabrik Germany full-history file "
            "(e.g. data/raw/osm/germany-internal.osh.pbf) -- the SAME file used for "
            "Berlin/Hamburg POI ingestion; no second download needed."
        ),
    )
    p.add_argument(
        "--out-dir",
        default=DEFAULT_OUT_DIR,
        type=Path,
        help=f"Output directory for the place-names parquet (default: {DEFAULT_OUT_DIR}).",
    )
    p.add_argument(
        "--out-file",
        default=DEFAULT_OUT_FILE,
        help=f"Output filename (default: {DEFAULT_OUT_FILE}).",
    )
    p.add_argument(
        "--force",
        action="store_true",
        default=False,
        help="Overwrite the existing output parquet if present (default: skip if present).",
    )
    return p


def main(argv: Optional[list[str]] = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    osh_pbf: Path = args.osh_pbf
    if not osh_pbf.exists():
        log.error(
            "OSH PBF file not found: %s\n"
            "Download the Germany full-history file from:\n"
            "  https://osm-internal.download.geofabrik.de/europe/\n"
            "Requires an OSM contributor account (https://www.openstreetmap.org).\n"
            "Save to: data/raw/osm/germany-internal.osh.pbf  (gitignored). "
            "This is the SAME file Berlin/Hamburg POI ingestion uses -- no second download.",
            osh_pbf,
        )
        return 1

    out_dir: Path = args.out_dir
    out_path = out_dir / args.out_file

    if out_path.exists() and not args.force:
        log.info("Output already exists (%s); skipping (use --force to overwrite).", out_path)
        _write_manifest(out_dir, args.out_file, osh_pbf)
        return 0

    rows = extract_current_places(osh_pbf)
    if not rows:
        log.error(
            "No place=%s candidates found in Hamburg bbox -- not writing parquet.", PLACE_TYPES
        )
        return 1

    out_dir.mkdir(parents=True, exist_ok=True)
    write_parquet(rows, out_path)
    log.info("Done. Wrote %d rows -> %s", len(rows), out_path)

    _write_manifest(out_dir, args.out_file, osh_pbf)
    return 0


def _write_manifest(out_dir: Path, out_file: str, osh_pbf: Path) -> None:
    """ADR-0016: record this source's current on-disk output in the committed
    manifest. Same non-hashing treatment of the .osh.pbf itself as the other
    OSM ingestors (maintainer decision) -- only its file mtime is recorded,
    informationally, as a best-effort proxy for the Geofabrik publish date."""
    import datetime

    found = existing_outputs(out_dir, [out_file])
    if not found:
        return
    try:
        pbf_mtime = datetime.datetime.fromtimestamp(
            osh_pbf.stat().st_mtime, tz=datetime.timezone.utc
        )
        vintage = (
            f"PBF file mtime {pbf_mtime.strftime('%Y-%m-%d')} "
            "(best-effort proxy for Geofabrik publish date, not a true fetch record); "
            "extraction represents the latest visible OSM state as of ingestion time "
            "(current snapshot, not a dated cutoff)."
        )
    except OSError:
        vintage = "unknown (PBF publish-date not captured by the ingestor)"
    write_manifest_entry(
        source_id="hamburg__osm_places",
        source_class="rolling",
        city="hamburg",
        upstream_url="https://osm-internal.download.geofabrik.de/europe/germany-internal.osh.pbf (login-gated, ADR-0002)",
        upstream_vintage=vintage,
        output_paths=found,
        ingest_script_module="ingestion.hamburg.osm.ingest_hamburg_osm_places",
    )


if __name__ == "__main__":
    sys.exit(main())
