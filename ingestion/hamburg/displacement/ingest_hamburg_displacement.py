"""
ingestion/hamburg/displacement/ingest_hamburg_displacement.py
================================================================
H1 (#40) — Hamburg displacement-protection zone ingestion (ADR-0014
Pillar 4: "Soziale Erhaltungsverordnungen — Gebiete in Hamburg"). Direct
conceptual/legal analogue of Berlin's Milieuschutz areas (§172 BauGB
soziale Erhaltungssatzung, the same statute underlying both cities'
designations) — tracked for Berlin under the still-`blocked` #70 [B1]
(architect ADR + maintainer approval pending for the FIS-Broker source).
Hamburg's equivalent source is a *different*, already-ADR-0014-approved
data source (Transparenzportal, dl-de/by-2.0) — this ingestion does not
depend on #70's resolution and is not gated by it.

This is PLUMBING, not methodology: a straight polygon-attribute staging
pull (area boundary + designation name + in-force date), analogous in
shape to stg_hamburg_geo. It introduces no weighting, scoring, or
index-construction logic, so it is not methodology-bearing under
CLAUDE.md's R-C1 (no geo-DS/domain-expert gate triggered). Any future
use of these zones as an input to a displacement/affordability
sub-index (mirroring #70's eventual scope) is an explicitly separate,
gated slice.

Source: Hamburg Transparenzportal / LGV WFS (deegree instance), dataset
"Soziale Erhaltungsverordnungen — Gebiete in Hamburg".
  Portal listing: https://suche.transparenz.hamburg.de/dataset/soziale-erhaltungsverordnungen-gebiete-in-hamburg14
  Also mirrored on data.europa.eu / INSPIRE per ADR-0014.

NOTE on endpoint verification (ADR-0014 open question #1 applies to
every Hamburg pillar independently — geometry and Sozialmonitoring each
needed their own live GetCapabilities probe with differing URL/casing
conventions; this pillar has NOT yet had that live probe performed in
this environment, which has no outbound network access). The WFS base
URL below follows the same geodienste.hamburg.de HH_WFS_* naming
convention ingest_hamburg_geo.py confirmed live for the geometry
pillar's "Statistische Gebiete"/"Verwaltungsgrenzen" datasets — the
*likeliest* convention for another LGV-published administrative-area
layer, but UNCONFIRMED for this specific dataset. If this typeNames
value 404s or resolves to a different feature type, re-probe
GetCapabilities against the base URL before assuming the source has
moved (mirrors ADR-0014 Pillar-2's ingest script precedent, where the
sozialmonitoring endpoint turned out to use a distinct naming pattern
discovered via the Transparenzportal CKAN API rather than the geometry
pillar's convention). This is flagged, not silently guessed as fact.

Licence: dl-de/by-2.0 (attribution required) — confirm the exact
attribution string for this specific dataset at first live ingestion;
ADR-0014 notes only the licence *family* is pre-confirmed, not the
per-dataset string (mirrors its own "Open item" note for this pillar).

Output parquet schema (data/raw/hamburg/displacement/erhaltungsverordnung.parquet):
  city_code           (string): 'HH' (ADR-0005)
  area_code           (string): natural key / feature id for the designated area
  area_name           (string): human-readable designation name (e.g. "Sternschanze")
  bezirk_name         (string, nullable): informational Bezirk the area sits in
  in_force_date        (string, nullable ISO date): date the Erhaltungsverordnung took
                                  effect, if published (ADR-0014 open question #4 —
                                  Medium confidence this attribute exists; if absent
                                  from the source, left null rather than fabricated)
  geometry_wkb         (bytes): designated-area polygon, WKB, native CRS EPSG:25832
  source_attribution   (string): dl-de/by-2.0 attribution

Usage:
  uv run python ingestion/hamburg/displacement/ingest_hamburg_displacement.py \\
      --out-dir data/raw/hamburg/displacement

  # Dry run (no HTTP calls):
  uv run python ingestion/hamburg/displacement/ingest_hamburg_displacement.py \\
      --out-dir data/raw/hamburg/displacement --dry-run

Attribution (mandatory — dl-de/by-2.0, ADR-0014 Pillar 4):
  "Freie und Hansestadt Hamburg, Behörde für Stadtentwicklung und Wohnen"
  (Erhaltungsverordnungen are a BSW instrument, same authority as the
  Sozialmonitoring pillar — see ingest_hamburg_sozialmonitoring.py;
  confirm this exact string against the dataset's own metadata at first
  live ingestion, per the licence note above.)

Runtime: expected seconds (small dataset, ~17 designated areas per ADR-0014).
"""

from __future__ import annotations

import argparse
import logging
import ssl
import sys
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Optional

try:
    import certifi as _certifi

    _SSL_CONTEXT = ssl.create_default_context(cafile=_certifi.where())
except ImportError:
    _SSL_CONTEXT = ssl.create_default_context()

import json

import pyarrow as pa
import pyarrow.parquet as pq

try:
    from shapely.geometry import shape as shapely_shape
    from shapely import to_wkb as shapely_to_wkb
except ImportError as exc:
    raise ImportError(
        "shapely is required for Hamburg displacement-zone ingestion. "
        "Add it to pyproject.toml and run `uv sync`."
    ) from exc

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

SOURCE_ATTRIBUTION = (
    "Freie und Hansestadt Hamburg, Behörde für Stadtentwicklung und Wohnen, "
    "Soziale Erhaltungsverordnungen — Gebiete in Hamburg, dl-de/by-2.0 — "
    "https://transparenz.hamburg.de/"
)
CITY_CODE = "HH"

# UNCONFIRMED live (no outbound network access in this environment) — best
# guess following ingest_hamburg_geo.py's confirmed HH_WFS_* convention for
# another LGV administrative-boundary layer. Re-probe GetCapabilities
# against this base URL before trusting typeNames blindly; see module
# docstring "NOTE on endpoint verification" above.
WFS_BASE_URL = "https://geodienste.hamburg.de/HH_WFS_Soziale_Erhaltungsverordnung"
WFS_TYPE_NAMES = "app:soziale_erhaltungsverordnung"

# Candidate attribute names — unconfirmed, following the geometry pillar's
# lowercase-German-noun convention (statgebiet, stadtteil_schluessel, ...).
# parse_features() degrades gracefully (warns + keeps None) if these don't
# match the live schema; a real ingestion run must confirm via a sample
# GetFeature call, exactly as the sozialmonitoring pillar did.
ATTR_AREA_ID = "gebiet"
ATTR_AREA_NAME = "bezeichnung"
ATTR_BEZIRK_NAME = "bezirk_name"
ATTR_IN_FORCE_DATE = "datum_inkrafttreten"

DISPLACEMENT_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("city_code", pa.string()),
        pa.field("area_code", pa.string()),
        pa.field("area_name", pa.string()),
        pa.field("bezirk_name", pa.string()),
        pa.field("in_force_date", pa.string()),
        pa.field("geometry_wkb", pa.large_binary()),
        pa.field("source_attribution", pa.string()),
    ]
)

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)
log = logging.getLogger("hamburg_displacement_ingest")


# ---------------------------------------------------------------------------
# WFS fetch
# ---------------------------------------------------------------------------


def build_wfs_url(base_url: str, type_names: str) -> str:
    """Build the WFS 2.0.0 GetFeature URL.

    NOTE: outputFormat 'application/geo+json' matches the deegree quirk
    confirmed live for the other two Hamburg WFS pillars (geometry,
    Sozialmonitoring) — 'application/json' raised InvalidParameterValue on
    those instances. Assumed (not yet independently confirmed for this
    dataset) to hold here too, since Hamburg's Transparenzportal WFS
    instances share the same deegree software stack.
    """
    params = {
        "service": "WFS",
        "version": "2.0.0",
        "request": "GetFeature",
        "typeNames": type_names,
        "outputFormat": "application/geo+json",
    }
    return base_url + "?" + urllib.parse.urlencode(params)


def fetch_geojson(url: str, timeout: int = 120) -> dict:
    """Fetch GeoJSON from a WFS URL. Returns parsed JSON dict; raises on error."""
    log.info("Fetching WFS GeoJSON from: %s", url)
    try:
        with urllib.request.urlopen(url, timeout=timeout, context=_SSL_CONTEXT) as resp:  # noqa: S310
            raw = resp.read()
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Network error fetching {url}: {exc}") from exc
    except Exception as exc:
        raise RuntimeError(f"Unexpected error fetching {url}: {exc}") from exc

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Invalid JSON response from {url}: {exc}") from exc

    if data.get("type") != "FeatureCollection":
        raise RuntimeError(
            f"Expected GeoJSON FeatureCollection from {url}, "
            f"got type={data.get('type')!r}. Response excerpt: {str(raw[:200])}"
        )

    return data


# ---------------------------------------------------------------------------
# Feature parsing
# ---------------------------------------------------------------------------


def parse_features(geojson: dict) -> list[dict]:
    """Parse GeoJSON features into row dicts for the output parquet."""
    features = geojson.get("features", [])
    log.info("Parsing %d features", len(features))

    rows: list[dict] = []
    skipped = 0

    for feat in features:
        props = feat.get("properties") or {}

        raw_id = props.get(ATTR_AREA_ID)
        if raw_id is None or str(raw_id).strip() == "":
            log.warning(
                "Feature missing %s attribute; skipping. Props: %s",
                ATTR_AREA_ID,
                list(props.keys())[:10],
            )
            skipped += 1
            continue
        area_code = str(raw_id).strip()

        area_name = str(props.get(ATTR_AREA_NAME) or "").strip()

        raw_bezirk = props.get(ATTR_BEZIRK_NAME)
        bezirk_name = str(raw_bezirk).strip() if raw_bezirk is not None else None

        raw_date = props.get(ATTR_IN_FORCE_DATE)
        in_force_date = str(raw_date).strip() if raw_date is not None else None

        geom_raw = feat.get("geometry")
        if geom_raw is None:
            log.warning("Feature %s has null geometry; skipping.", area_code)
            skipped += 1
            continue

        try:
            geom = shapely_shape(geom_raw)
            wkb_bytes = bytes(shapely_to_wkb(geom))
        except Exception as exc:
            log.warning("Failed to convert geometry for feature %s: %s; skipping.", area_code, exc)
            skipped += 1
            continue

        rows.append(
            {
                "city_code": CITY_CODE,
                "area_code": area_code,
                "area_name": area_name,
                "bezirk_name": bezirk_name,
                "in_force_date": in_force_date,
                "geometry_wkb": wkb_bytes,
                "source_attribution": SOURCE_ATTRIBUTION,
            }
        )

    if skipped:
        log.warning("Skipped %d features (missing id/geometry)", skipped)

    log.info("Parsed %d valid rows", len(rows))
    return rows


# ---------------------------------------------------------------------------
# Write parquet
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path) -> None:
    """Write parsed rows to a Parquet file using the displacement-zone schema."""
    table = pa.table(
        {
            "city_code": pa.array([r["city_code"] for r in rows], type=pa.string()),
            "area_code": pa.array([r["area_code"] for r in rows], type=pa.string()),
            "area_name": pa.array([r["area_name"] for r in rows], type=pa.string()),
            "bezirk_name": pa.array([r["bezirk_name"] for r in rows], type=pa.string()),
            "in_force_date": pa.array([r["in_force_date"] for r in rows], type=pa.string()),
            "geometry_wkb": pa.array([r["geometry_wkb"] for r in rows], type=pa.large_binary()),
            "source_attribution": pa.array(
                [r["source_attribution"] for r in rows], type=pa.string()
            ),
        },
        schema=DISPLACEMENT_PARQUET_SCHEMA,
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    pq.write_table(table, out_path, compression="snappy")
    log.info("Wrote %d rows to %s", len(rows), out_path)


# ---------------------------------------------------------------------------
# Pipeline
# ---------------------------------------------------------------------------


def run(out_dir: Path, dry_run: bool = False) -> bool:
    """Fetch WFS, parse features, write parquet. Returns True on success."""
    out_path = out_dir / "erhaltungsverordnung.parquet"
    wfs_url = build_wfs_url(WFS_BASE_URL, WFS_TYPE_NAMES)

    log.info("Attribution: %s", SOURCE_ATTRIBUTION)

    if dry_run:
        log.info("[dry-run] Would fetch %s -> %s", wfs_url, out_path)
        return True

    try:
        geojson = fetch_geojson(wfs_url)
    except RuntimeError as exc:
        log.error("Failed to fetch WFS: %s", exc)
        return False

    rows = parse_features(geojson)

    if not rows:
        log.error("No valid rows produced — not writing parquet.")
        return False

    try:
        write_parquet(rows, out_path)
    except Exception as exc:
        log.error("Failed to write parquet: %s", exc)
        return False

    return True


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Hamburg 'Soziale Erhaltungsverordnungen' displacement-"
            "protection-zone polygons from the LGV Hamburg WFS and write Parquet."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/hamburg/displacement",
        type=Path,
        help="Output directory for the parquet file (default: data/raw/hamburg/displacement).",
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be fetched without making HTTP calls.",
    )
    p.add_argument(
        "--verbose",
        action="store_true",
        help="Enable DEBUG logging.",
    )
    return p


def main(argv: Optional[list[str]] = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    out_dir = args.out_dir.resolve()

    if args.dry_run:
        log.info("[dry-run] mode — no HTTP calls will be made.")

    ok = run(out_dir, dry_run=args.dry_run)

    if not ok:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
