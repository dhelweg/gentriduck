"""
ingestion/hamburg/rent/ingest_hamburg_rent.py
================================================
H1 (#40) — Hamburg rent-equivalent data ingestion (ADR-0014 Pillar 5: the
last unstaged raw-data pillar). Direct conceptual analogue of Berlin's D1
Mietspiegel + Wohnlagenverzeichnis treatment (ingestion/berlin/mietspiegel/
ingest_mietspiegel.py, ingestion/berlin/price_rent/ingest_wohnlage.py).

**Scope discipline (R-C1 — this slice is PLUMBING, not methodology):**
Straight raw ingestion + staging of two related but independent datasets:
  1. Wohnlagenverzeichnis — address/street -> Wohnlage (location-quality
     tier) crosswalk, analogous to Berlin's Wohnlagen WFS.
  2. Hamburger Mietenspiegel — the rent-table matrix itself (year-built x
     size x Wohnlage -> rent range), analogous to Berlin's Mietspiegeltabelle.
This script does NOT compute any rent index, weighting, or normalization,
does NOT join Wohnlage to statistische Gebiete/Stadtteile, and does NOT
touch int_gentrification_ts.sql / gentrification_index.sql or any shared
weighting logic — not methodology-bearing under CLAUDE.md's R-C1 (mirrors
the displacement-zone and EWR-stadtteil pillars' own scoping calls). Any
future use of Hamburg rent data as an index input is an explicitly
separate, gated slice.

Source (ADR-0014, Pillar 5): Hamburg Transparenzportal —
  "Hamburger Mietenspiegel" (biennial since 1976; current 2025/2027 cycle)
  Portal listing: https://suche.transparenz.hamburg.de/dataset/hamburger-mietenspiegel31
  Licence: dl-de/by-2.0 — attribution: "Freie und Hansestadt Hamburg,
  Behoerde fuer Stadtentwicklung und Wohnen" (same BSW authority as the
  Sozialmonitoring and displacement-zone pillars).
  Formats offered per ADR-0014: GML, CSV, GeoJSON, OGC API-Features, XML
  for the Mietenspiegel dataset; PDF brochure for the human-readable table
  (kept as a fallback re-tabulation path, mirroring Berlin's D1 Mietspiegel
  PDF treatment, only if the machine-readable formats do not carry the
  full rent matrix -- NOT attempted in this slice; the WFS/GeoJSON path is
  tried first since ADR-0014 explicitly lists it as available, unlike
  Berlin's Mietspiegeltabelle which required a PDF-only approach).

  Wohnlagenverzeichnis (address -> Wohnlage crosswalk) is expected to be
  published as a companion dataset via the same Transparenzportal /
  geodienste.hamburg.de WFS family, following the geometry and
  displacement-zone pillars' confirmed HH_WFS_* naming convention.

NOTE on endpoint/schema verification (ADR-0014 open question #1 applies
independently per pillar; this environment has no outbound network
access, mirroring the caveat already flagged for the displacement-zone
and EWR-stadtteil pillars' ingestors). Both WFS base URLs and attribute
names below are UNCONFIRMED best-known guesses following the
HH_WFS_* / app:<lowercase_noun> convention confirmed live for the
geometry pillar (ingest_hamburg_geo.py) — a real ingestion run must
re-probe GetCapabilities (Mietenspiegel) and the CKAN package_show API
(Wohnlagenverzeichnis, if it turns out to be CKAN-hosted rather than WFS)
before trusting typeNames/attribute mappings blindly, exactly as every
prior Hamburg-pillar ingestor's docstring requires.

Output parquet schemas:

  data/raw/hamburg/rent/wohnlage.parquet (address/street -> Wohnlage tier):
    city_code           (string): 'HH' (ADR-0005)
    address_id           (string): natural key / feature id for the address
                                    or street segment (schema TBC at live probe)
    street_name           (string, nullable): street name, if published at
                                    street rather than address grain
    wohnlage              (string): location-quality tier (Hamburg's own
                                    label scheme -- NOT assumed identical to
                                    Berlin's einfach/mittel/gut; preserved
                                    as-published, mirrors the
                                    Sozialmonitoring pillar's decision not
                                    to invent a cross-city numeric mapping
                                    in the staging layer)
    geometry_wkb          (bytes, nullable): address/street geometry WKB,
                                    native CRS EPSG:25832, if published
    source_attribution     (string): dl-de/by-2.0 attribution

  data/raw/hamburg/rent/mietenspiegel.parquet (rent-table matrix):
    edition_year          (int32): Mietenspiegel edition year (biennial;
                                    e.g. 2025)
    year_built_bucket      (string): construction-period bucket, preserved
                                    as-published (NOT remapped onto
                                    Berlin's year_built_bucket keys in this
                                    staging layer -- any cross-city
                                    harmonisation is a downstream,
                                    methodology-bearing decision)
    size_bucket            (string): apartment-size bucket, preserved
                                    as-published
    wohnlage               (string): location tier, matching wohnlage.parquet's
                                    label scheme
    rent_low               (double, nullable): lower rent-range bound
                                    (EUR/sqm/month)
    rent_mid               (double, nullable): Mittelwert (EUR/sqm/month)
    rent_high               (double, nullable): upper rent-range bound
                                    (EUR/sqm/month)
    source_attribution      (string): dl-de/by-2.0 attribution

Usage:
  uv run python ingestion/hamburg/rent/ingest_hamburg_rent.py \\
      --out-dir data/raw/hamburg/rent

  # Dry run (no HTTP calls):
  uv run python ingestion/hamburg/rent/ingest_hamburg_rent.py \\
      --out-dir data/raw/hamburg/rent --dry-run

  # Only one dataset:
  uv run python ingestion/hamburg/rent/ingest_hamburg_rent.py \\
      --out-dir data/raw/hamburg/rent --only wohnlage
  uv run python ingestion/hamburg/rent/ingest_hamburg_rent.py \\
      --out-dir data/raw/hamburg/rent --only mietenspiegel

Attribution (mandatory -- dl-de/by-2.0, ADR-0014 Pillar 5):
  "Freie und Hansestadt Hamburg, Behoerde fuer Stadtentwicklung und Wohnen"
  Each output parquet row carries source_attribution; the dbt staging
  models (stg_hamburg_wohnlage, stg_hamburg_mietenspiegel) and the website
  attribution page (Epic G3) must surface this.

Runtime: expected seconds to low-minutes depending on Wohnlage grain
(address-level would mirror Berlin's ~397k-row-per-vintage WFS pull;
street-level, if that is the actual published grain, would be far
smaller -- confirm grain at live probe before assuming runtime).
"""

from __future__ import annotations

import argparse
import logging
import ssl
import sys
import urllib.error
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
        "shapely is required for Hamburg rent ingestion. "
        "Add it to pyproject.toml and run `uv sync`."
    ) from exc

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

CITY_CODE = "HH"
SOURCE_ATTRIBUTION = (
    "Freie und Hansestadt Hamburg, Behoerde fuer Stadtentwicklung und Wohnen, "
    "Hamburger Mietenspiegel / Wohnlagenverzeichnis, dl-de/by-2.0 — "
    "https://transparenz.hamburg.de/"
)

# UNCONFIRMED live (no outbound network access in this environment) —
# best guess following ingest_hamburg_geo.py's confirmed HH_WFS_*
# convention for another LGV/BSW-published layer. Re-probe GetCapabilities
# against these base URLs before trusting typeNames blindly; see module
# docstring "NOTE on endpoint/schema verification" above.
WOHNLAGE_WFS_BASE_URL = "https://geodienste.hamburg.de/HH_WFS_Wohnlagenverzeichnis"
WOHNLAGE_WFS_TYPE_NAMES = "app:wohnlagenverzeichnis"

MIETENSPIEGEL_WFS_BASE_URL = "https://geodienste.hamburg.de/HH_WFS_Mietenspiegel"
MIETENSPIEGEL_WFS_TYPE_NAMES = "app:mietenspiegel"

# Candidate attribute names — unconfirmed, following the geometry/
# displacement pillars' lowercase-German-noun convention. parse functions
# degrade gracefully (warn + keep None) if these don't match the live
# schema; a real ingestion run must confirm via a sample GetFeature call.
ATTR_ADDRESS_ID = "adresse_id"
ATTR_STREET_NAME = "strasse"
ATTR_WOHNLAGE = "wohnlage"

ATTR_EDITION_YEAR = "erhebungsjahr"
ATTR_YEAR_BUILT_BUCKET = "baujahr_gruppe"
ATTR_SIZE_BUCKET = "groessenklasse"
ATTR_MS_WOHNLAGE = "wohnlage"
ATTR_RENT_LOW = "miete_unten"
ATTR_RENT_MID = "miete_mittel"
ATTR_RENT_HIGH = "miete_oben"

WOHNLAGE_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("city_code", pa.string()),
        pa.field("address_id", pa.string()),
        pa.field("street_name", pa.string()),
        pa.field("wohnlage", pa.string()),
        pa.field("geometry_wkb", pa.large_binary()),
        pa.field("source_attribution", pa.string()),
    ]
)

MIETENSPIEGEL_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("edition_year", pa.int32()),
        pa.field("year_built_bucket", pa.string()),
        pa.field("size_bucket", pa.string()),
        pa.field("wohnlage", pa.string()),
        pa.field("rent_low", pa.float64()),
        pa.field("rent_mid", pa.float64()),
        pa.field("rent_high", pa.float64()),
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
log = logging.getLogger("hamburg_rent_ingest")


# ---------------------------------------------------------------------------
# WFS fetch (shared)
# ---------------------------------------------------------------------------


def build_wfs_url(base_url: str, type_names: str) -> str:
    """Build the WFS 2.0.0 GetFeature URL.

    NOTE: outputFormat 'application/geo+json' matches the deegree quirk
    confirmed live for the other Hamburg WFS pillars (geometry,
    Sozialmonitoring, displacement-zones) — 'application/json' raised
    InvalidParameterValue on those instances. Assumed (not yet
    independently confirmed for these two datasets) to hold here too,
    since Hamburg's Transparenzportal WFS instances share the same
    deegree software stack.
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
# Wohnlagenverzeichnis parsing
# ---------------------------------------------------------------------------


def parse_wohnlage_features(geojson: dict) -> list[dict]:
    """Parse Wohnlagenverzeichnis GeoJSON features into row dicts."""
    features = geojson.get("features", [])
    log.info("Parsing %d Wohnlagenverzeichnis features", len(features))

    rows: list[dict] = []
    skipped = 0

    for idx, feat in enumerate(features):
        props = feat.get("properties") or {}

        raw_wohnlage = props.get(ATTR_WOHNLAGE)
        if raw_wohnlage is None:
            log.warning(
                "Feature idx=%d missing %s attribute; skipping. Props: %s",
                idx,
                ATTR_WOHNLAGE,
                list(props.keys())[:10],
            )
            skipped += 1
            continue
        wohnlage = str(raw_wohnlage).strip()

        raw_id = props.get(ATTR_ADDRESS_ID)
        address_id = str(raw_id).strip() if raw_id is not None else None
        if address_id is None:
            feature_id = feat.get("id", "")
            address_id = (
                str(feature_id).rsplit(".", 1)[-1] if "." in str(feature_id) else str(feature_id)
            ) or None

        raw_street = props.get(ATTR_STREET_NAME)
        street_name = str(raw_street).strip() if raw_street is not None else None

        geom_raw = feat.get("geometry")
        wkb_bytes = None
        if geom_raw is not None:
            try:
                geom = shapely_shape(geom_raw)
                wkb_bytes = bytes(shapely_to_wkb(geom))
            except Exception as exc:
                log.warning(
                    "Feature %s geometry conversion failed: %s; keeping null geometry.",
                    address_id,
                    exc,
                )

        rows.append(
            {
                "city_code": CITY_CODE,
                "address_id": address_id,
                "street_name": street_name,
                "wohnlage": wohnlage,
                "geometry_wkb": wkb_bytes,
                "source_attribution": SOURCE_ATTRIBUTION,
            }
        )

    if skipped:
        log.warning("Skipped %d Wohnlagenverzeichnis features (missing wohnlage)", skipped)

    log.info("Parsed %d valid Wohnlagenverzeichnis rows", len(rows))
    return rows


def write_wohnlage_parquet(rows: list[dict], out_path: Path) -> None:
    table = pa.table(
        {
            "city_code": pa.array([r["city_code"] for r in rows], type=pa.string()),
            "address_id": pa.array([r["address_id"] for r in rows], type=pa.string()),
            "street_name": pa.array([r["street_name"] for r in rows], type=pa.string()),
            "wohnlage": pa.array([r["wohnlage"] for r in rows], type=pa.string()),
            "geometry_wkb": pa.array([r["geometry_wkb"] for r in rows], type=pa.large_binary()),
            "source_attribution": pa.array(
                [r["source_attribution"] for r in rows], type=pa.string()
            ),
        },
        schema=WOHNLAGE_PARQUET_SCHEMA,
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    pq.write_table(table, out_path, compression="snappy")
    log.info("Wrote %d rows to %s", len(rows), out_path)


# ---------------------------------------------------------------------------
# Mietenspiegel parsing
# ---------------------------------------------------------------------------


def _parse_float(v) -> Optional[float]:
    """Parse a numeric-ish value (possibly German-decimal string) to float."""
    if v is None:
        return None
    if isinstance(v, (int, float)):
        return float(v)
    s = str(v).strip()
    if not s or s in ("-", "–", "*", "**"):
        return None
    s = s.replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return None


def parse_mietenspiegel_features(geojson: dict) -> list[dict]:
    """Parse Mietenspiegel GeoJSON/feature-collection rows into row dicts.

    Rows without a geometry component are expected here (Mietenspiegel is a
    tabular matrix, not per-address like Wohnlagenverzeichnis) — geometry
    is intentionally not carried in the output schema.
    """
    features = geojson.get("features", [])
    log.info("Parsing %d Mietenspiegel features", len(features))

    rows: list[dict] = []
    skipped = 0

    for idx, feat in enumerate(features):
        props = feat.get("properties") or {}

        raw_year = props.get(ATTR_EDITION_YEAR)
        edition_year = None
        if raw_year is not None:
            try:
                edition_year = int(raw_year)
            except (TypeError, ValueError):
                edition_year = None
        if edition_year is None:
            log.warning(
                "Feature idx=%d missing/invalid %s attribute; skipping. Props: %s",
                idx,
                ATTR_EDITION_YEAR,
                list(props.keys())[:10],
            )
            skipped += 1
            continue

        year_built_bucket = str(props.get(ATTR_YEAR_BUILT_BUCKET) or "").strip()
        size_bucket = str(props.get(ATTR_SIZE_BUCKET) or "").strip()
        wohnlage = str(props.get(ATTR_MS_WOHNLAGE) or "").strip()

        rent_low = _parse_float(props.get(ATTR_RENT_LOW))
        rent_mid = _parse_float(props.get(ATTR_RENT_MID))
        rent_high = _parse_float(props.get(ATTR_RENT_HIGH))

        if rent_mid is None:
            log.debug(
                "Feature idx=%d has no parseable %s value; keeping row with null rent_mid.",
                idx,
                ATTR_RENT_MID,
            )

        rows.append(
            {
                "edition_year": edition_year,
                "year_built_bucket": year_built_bucket,
                "size_bucket": size_bucket,
                "wohnlage": wohnlage,
                "rent_low": rent_low,
                "rent_mid": rent_mid,
                "rent_high": rent_high,
                "source_attribution": SOURCE_ATTRIBUTION,
            }
        )

    if skipped:
        log.warning("Skipped %d Mietenspiegel features (missing edition year)", skipped)

    log.info("Parsed %d valid Mietenspiegel rows", len(rows))
    return rows


def write_mietenspiegel_parquet(rows: list[dict], out_path: Path) -> None:
    table = pa.table(
        {
            "edition_year": pa.array([r["edition_year"] for r in rows], type=pa.int32()),
            "year_built_bucket": pa.array([r["year_built_bucket"] for r in rows], type=pa.string()),
            "size_bucket": pa.array([r["size_bucket"] for r in rows], type=pa.string()),
            "wohnlage": pa.array([r["wohnlage"] for r in rows], type=pa.string()),
            "rent_low": pa.array([r["rent_low"] for r in rows], type=pa.float64()),
            "rent_mid": pa.array([r["rent_mid"] for r in rows], type=pa.float64()),
            "rent_high": pa.array([r["rent_high"] for r in rows], type=pa.float64()),
            "source_attribution": pa.array(
                [r["source_attribution"] for r in rows], type=pa.string()
            ),
        },
        schema=MIETENSPIEGEL_PARQUET_SCHEMA,
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    pq.write_table(table, out_path, compression="snappy")
    log.info("Wrote %d rows to %s", len(rows), out_path)


# ---------------------------------------------------------------------------
# Pipeline
# ---------------------------------------------------------------------------


def run_wohnlage(out_dir: Path, dry_run: bool = False) -> bool:
    out_path = out_dir / "wohnlage.parquet"
    wfs_url = build_wfs_url(WOHNLAGE_WFS_BASE_URL, WOHNLAGE_WFS_TYPE_NAMES)

    log.info("[Wohnlagenverzeichnis] Attribution: %s", SOURCE_ATTRIBUTION)

    if dry_run:
        log.info("[dry-run] Would fetch %s -> %s", wfs_url, out_path)
        return True

    try:
        geojson = fetch_geojson(wfs_url)
    except RuntimeError as exc:
        log.error("Failed to fetch Wohnlagenverzeichnis WFS: %s", exc)
        return False

    rows = parse_wohnlage_features(geojson)
    if not rows:
        log.error("No valid Wohnlagenverzeichnis rows produced — not writing parquet.")
        return False

    try:
        write_wohnlage_parquet(rows, out_path)
    except Exception as exc:
        log.error("Failed to write Wohnlagenverzeichnis parquet: %s", exc)
        return False

    return True


def run_mietenspiegel(out_dir: Path, dry_run: bool = False) -> bool:
    out_path = out_dir / "mietenspiegel.parquet"
    wfs_url = build_wfs_url(MIETENSPIEGEL_WFS_BASE_URL, MIETENSPIEGEL_WFS_TYPE_NAMES)

    log.info("[Mietenspiegel] Attribution: %s", SOURCE_ATTRIBUTION)

    if dry_run:
        log.info("[dry-run] Would fetch %s -> %s", wfs_url, out_path)
        return True

    try:
        geojson = fetch_geojson(wfs_url)
    except RuntimeError as exc:
        log.error("Failed to fetch Mietenspiegel WFS: %s", exc)
        return False

    rows = parse_mietenspiegel_features(geojson)
    if not rows:
        log.error("No valid Mietenspiegel rows produced — not writing parquet.")
        return False

    try:
        write_mietenspiegel_parquet(rows, out_path)
    except Exception as exc:
        log.error("Failed to write Mietenspiegel parquet: %s", exc)
        return False

    return True


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Hamburg Wohnlagenverzeichnis + Mietenspiegel (ADR-0014 "
            "Pillar 5) and write Parquet. Staging-only slice: no rent-index, "
            "weighting, or cross-grain-join logic (R-C1 plumbing scope)."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/hamburg/rent",
        type=Path,
        help="Output directory for the parquet files (default: data/raw/hamburg/rent).",
    )
    p.add_argument(
        "--only",
        choices=["wohnlage", "mietenspiegel"],
        default=None,
        help="Only ingest one of the two datasets (default: both).",
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

    targets = [args.only] if args.only else ["wohnlage", "mietenspiegel"]
    ok = True

    if "wohnlage" in targets:
        ok = run_wohnlage(out_dir, dry_run=args.dry_run) and ok
    if "mietenspiegel" in targets:
        ok = run_mietenspiegel(out_dir, dry_run=args.dry_run) and ok

    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
