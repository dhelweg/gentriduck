"""
ingestion/hamburg/rent/ingest_hamburg_rent.py
================================================
H1 (#40) / H2 (#125) — Hamburg rent-equivalent data ingestion (ADR-0014
Pillar 5). Direct conceptual analogue of Berlin's D1 Mietspiegel +
Wohnlagenverzeichnis treatment (ingestion/berlin/mietspiegel/
ingest_mietspiegel.py, ingestion/berlin/price_rent/ingest_wohnlage.py).

**Scope discipline (R-C1 — this slice is PLUMBING, not methodology):**
Straight raw ingestion + staging of two related but independent datasets:
  1. Wohnlagenverzeichnis — address -> Wohnlage (location-quality tier)
     crosswalk, analogous to Berlin's Wohnlagen WFS.
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
  "Hamburger Mietenspiegel" (biennial since 1976; current edition erhebungsstand
  2025-04-01 confirmed live 2026-07-01)
  Portal listing: https://suche.transparenz.hamburg.de/dataset/hamburger-mietenspiegel31
  Licence: dl-de/by-2.0 — attribution: "Freie und Hansestadt Hamburg,
  Behoerde fuer Stadtentwicklung und Wohnen" (same BSW authority as the
  Sozialmonitoring and displacement-zone pillars).

Endpoints (CONFIRMED live via GetCapabilities + GetFeature probe, 2026-07-01; #125):
  Wohnlagenverzeichnis:
    Service:    https://geodienste.hamburg.de/HH_WFS_Wohnlagen
                (NOT "HH_WFS_Wohnlagenverzeichnis" — this ingestor's
                original guess 404'd; the live service uses the shorter
                "Wohnlagen" slug)
    typeNames:  app:wohnlagen
    Grain:      address-point level (283,801 features confirmed live —
                far larger than the original street-level assumption)
    Attributes actually published (sample GetFeature probe):
      strassenschluessel, strasse, hausnummer, hausnummer_zusatz, ort,
      plz, stadtteil, bezeichnung (= the Wohnlage tier label, e.g. "Gute
      Wohnlage" — NOT an attribute literally named "wohnlage")
    Native CRS: EPSG:25832 (point geometry)

  Mietenspiegel:
    Service:    https://geodienste.hamburg.de/HH_WFS_Mietenspiegel
                (this base URL was correctly guessed; the typeNames value
                was wrong)
    typeNames:  app:mietenspiegel_daten  (NOT "app:mietenspiegel" — the
                real service also separately publishes
                app:mietenspiegel_metadaten, a single-row edition/citation
                record, fetched here only to derive edition_year)
    Grain:      88 rent-matrix cells (no per-row edition_year — see below)
    Attributes actually published (sample GetFeature probe):
      mittelwert (rent_mid), spanne_min (rent_low), spanne_max (rent_high),
      merkmale (a SINGLE pipe-delimited string encoding all three matrix
      dimensions, e.g. "bis 31.12.1918|mit Bad und Sammelheizung|Normale
      Wohnlage|bis unter 41m²" = year_built_bucket | ausstattung |
      wohnlage | size_bucket). There is NO discrete edition_year,
      year_built_bucket, size_bucket, or wohnlage column — this ingestor
      splits `merkmale` on "|" (confirmed 4-part structure matching
      mietenspiegel_metadaten's own `merkmaletext` field:
      "Baualtersklasse/Bezugsfertigkeit|Ausstattung|Wohnlage|Wohnfläche").
      edition_year is derived from the single `mietenspiegel_metadaten`
      feature's `erhebungsstand` date (e.g. "2025-04-01" -> 2025), since
      the live service publishes only the current edition (no historical
      editions via this WFS).

NOTE on prior UNCONFIRMED assumptions (superseded by this live probe,
#125): the original ATTR_* names below this docstring (`adresse_id`,
`wohnlage`, `erhebungsjahr`, `baujahr_gruppe`, `groessenklasse`,
`miete_unten/mittel/oben`) did not match any live attribute and have been
replaced. This corroborates the general lesson already noted by the
displacement and EWR-stadtteil pillars: each Hamburg dataset requires an
independent live GetCapabilities/GetFeature probe — no cross-pillar
naming convention can be assumed a priori (ADR-0014 open question #1).

Output parquet schemas:

  data/raw/hamburg/rent/wohnlage.parquet (address -> Wohnlage tier):
    city_code           (string): 'HH' (ADR-0005)
    address_id           (string): WFS feature id (natural key)
    street_name           (string, nullable): strasse + hausnummer
                                    (concatenated, as-published)
    stadtteil             (string, nullable): Stadtteil name, as published
                                    on the address record (useful for a
                                    coarse cross-check against
                                    stg_hamburg_geo, not a substitute for
                                    a spatial join)
    wohnlage              (string): location-quality tier label
                                    (bezeichnung, as-published, e.g. "Gute
                                    Wohnlage" — Hamburg's own label scheme,
                                    NOT assumed identical to Berlin's
                                    einfach/mittel/gut)
    geometry_wkb          (bytes, nullable): address point geometry WKB,
                                    native CRS EPSG:25832
    source_attribution     (string): dl-de/by-2.0 attribution

  data/raw/hamburg/rent/mietenspiegel.parquet (rent-table matrix):
    edition_year          (int32): Mietenspiegel edition year, derived
                                    from mietenspiegel_metadaten's
                                    erhebungsstand (single current edition
                                    only — this WFS does not publish
                                    historical editions)
    year_built_bucket      (string): construction-period bucket, split
                                    from `merkmale` part 1, preserved
                                    as-published
    ausstattung            (string): fitting/equipment level, split from
                                    `merkmale` part 2 (e.g. "mit Bad und
                                    Sammelheizung") — an extra matrix
                                    dimension not anticipated by the
                                    original 3-D (year x size x Wohnlage)
                                    schema design; carried through rather
                                    than dropped
    wohnlage               (string): location tier, split from `merkmale`
                                    part 3, matching wohnlage.parquet's
                                    label scheme
    size_bucket            (string): apartment-size bucket, split from
                                    `merkmale` part 4, preserved as-published
    rent_low               (double, nullable): lower rent-range bound
                                    (EUR/sqm/month, spanne_min)
    rent_mid               (double, nullable): Mittelwert (EUR/sqm/month,
                                    mittelwert)
    rent_high               (double, nullable): upper rent-range bound
                                    (EUR/sqm/month, spanne_max)
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

Runtime: ~20s for Wohnlagenverzeichnis (283,801 address points, confirmed
live 2026-07-01); <5s for Mietenspiegel (88 matrix cells + 1 metadata row).
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

# CONFIRMED live 2026-07-01 (#125) via WFS GetCapabilities probe.
WOHNLAGE_WFS_BASE_URL = "https://geodienste.hamburg.de/HH_WFS_Wohnlagen"
WOHNLAGE_WFS_TYPE_NAMES = "app:wohnlagen"

MIETENSPIEGEL_WFS_BASE_URL = "https://geodienste.hamburg.de/HH_WFS_Mietenspiegel"
MIETENSPIEGEL_WFS_TYPE_NAMES = "app:mietenspiegel_daten"
MIETENSPIEGEL_METADATA_TYPE_NAMES = "app:mietenspiegel_metadaten"

# CONFIRMED attribute names via live GetFeature sample, 2026-07-01 (#125).
ATTR_STRASSE = "strasse"
ATTR_HAUSNUMMER = "hausnummer"
ATTR_STADTTEIL = "stadtteil"
ATTR_WOHNLAGE_LABEL = "bezeichnung"

ATTR_MERKMALE = "merkmale"
ATTR_RENT_LOW = "spanne_min"
ATTR_RENT_MID = "mittelwert"
ATTR_RENT_HIGH = "spanne_max"
ATTR_ERHEBUNGSSTAND = "erhebungsstand"

# Wohnlagenverzeichnis raw fetch page size — 283,801 features fits in one
# WFS response (confirmed live, ~20s) but a defensive cap avoids an
# unbounded single request if the source grows substantially.
WOHNLAGE_MAX_FEATURES = 500_000

WOHNLAGE_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("city_code", pa.string()),
        pa.field("address_id", pa.string()),
        pa.field("street_name", pa.string()),
        pa.field("stadtteil", pa.string()),
        pa.field("wohnlage", pa.string()),
        pa.field("geometry_wkb", pa.large_binary()),
        pa.field("source_attribution", pa.string()),
    ]
)

MIETENSPIEGEL_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("edition_year", pa.int32()),
        pa.field("year_built_bucket", pa.string()),
        pa.field("ausstattung", pa.string()),
        pa.field("wohnlage", pa.string()),
        pa.field("size_bucket", pa.string()),
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


def build_wfs_url(base_url: str, type_names: str, count: Optional[int] = None) -> str:
    """Build the WFS 2.0.0 GetFeature URL.

    NOTE: outputFormat 'application/geo+json' matches the deegree quirk
    confirmed live for all Hamburg WFS pillars — 'application/json' raises
    InvalidParameterValue on these instances.
    """
    params = {
        "service": "WFS",
        "version": "2.0.0",
        "request": "GetFeature",
        "typeNames": type_names,
        "outputFormat": "application/geo+json",
    }
    if count is not None:
        params["count"] = str(count)
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

    data.setdefault("features", [])
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

    for feat in features:
        props = feat.get("properties") or {}

        raw_wohnlage = props.get(ATTR_WOHNLAGE_LABEL)
        if raw_wohnlage is None:
            log.warning(
                "Feature id=%s missing %s attribute; skipping. Props: %s",
                feat.get("id"),
                ATTR_WOHNLAGE_LABEL,
                list(props.keys())[:10],
            )
            skipped += 1
            continue
        wohnlage = str(raw_wohnlage).strip()

        address_id = str(feat.get("id") or "").strip() or None

        strasse = props.get(ATTR_STRASSE)
        hausnummer = props.get(ATTR_HAUSNUMMER)
        if strasse is not None:
            street_name = str(strasse).strip()
            if hausnummer is not None and str(hausnummer).strip() != "":
                street_name = f"{street_name} {hausnummer}".strip()
        else:
            street_name = None

        raw_stadtteil = props.get(ATTR_STADTTEIL)
        stadtteil = str(raw_stadtteil).strip() if raw_stadtteil is not None else None

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
                "stadtteil": stadtteil,
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
            "stadtteil": pa.array([r["stadtteil"] for r in rows], type=pa.string()),
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


def fetch_edition_year(timeout: int = 60) -> Optional[int]:
    """Fetch the single mietenspiegel_metadaten feature and derive
    edition_year from its `erhebungsstand` date (e.g. "2025-04-01" -> 2025).
    Returns None (with a warning logged) if unavailable, rather than
    fabricating a year.
    """
    url = build_wfs_url(MIETENSPIEGEL_WFS_BASE_URL, MIETENSPIEGEL_METADATA_TYPE_NAMES)
    try:
        geojson = fetch_geojson(url, timeout=timeout)
    except RuntimeError as exc:
        log.warning("Failed to fetch Mietenspiegel metadata (edition year): %s", exc)
        return None

    features = geojson.get("features", [])
    if not features:
        log.warning("mietenspiegel_metadaten returned no features; edition_year will be null.")
        return None

    raw_stand = (features[0].get("properties") or {}).get(ATTR_ERHEBUNGSSTAND)
    if not raw_stand:
        log.warning(
            "mietenspiegel_metadaten feature missing %s; edition_year will be null.",
            ATTR_ERHEBUNGSSTAND,
        )
        return None

    try:
        return int(str(raw_stand).strip()[:4])
    except (ValueError, IndexError):
        log.warning(
            "Could not parse year from erhebungsstand=%r; edition_year will be null.", raw_stand
        )
        return None


def parse_mietenspiegel_features(geojson: dict, edition_year: Optional[int]) -> list[dict]:
    """Parse Mietenspiegel GeoJSON rows, splitting the pipe-delimited
    `merkmale` field into its four matrix dimensions (confirmed structure,
    2026-07-01: year_built_bucket|ausstattung|wohnlage|size_bucket,
    matching mietenspiegel_metadaten's own merkmaletext field order).

    Rows without a geometry component are expected (Mietenspiegel is a
    tabular matrix, not per-address like Wohnlagenverzeichnis) — geometry
    is intentionally not carried in the output schema.
    """
    features = geojson.get("features", [])
    log.info("Parsing %d Mietenspiegel features", len(features))

    rows: list[dict] = []
    skipped = 0

    for idx, feat in enumerate(features):
        props = feat.get("properties") or {}

        raw_merkmale = props.get(ATTR_MERKMALE)
        parts = [p.strip() for p in str(raw_merkmale or "").split("|")]
        if len(parts) != 4:
            log.warning(
                "Feature idx=%d has unexpected merkmale structure (%d parts, "
                "expected 4): %r; skipping.",
                idx,
                len(parts),
                raw_merkmale,
            )
            skipped += 1
            continue
        year_built_bucket, ausstattung, wohnlage, size_bucket = parts

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
                "ausstattung": ausstattung,
                "wohnlage": wohnlage,
                "size_bucket": size_bucket,
                "rent_low": rent_low,
                "rent_mid": rent_mid,
                "rent_high": rent_high,
                "source_attribution": SOURCE_ATTRIBUTION,
            }
        )

    if skipped:
        log.warning("Skipped %d Mietenspiegel features (unparseable merkmale)", skipped)

    log.info("Parsed %d valid Mietenspiegel rows", len(rows))
    return rows


def write_mietenspiegel_parquet(rows: list[dict], out_path: Path) -> None:
    table = pa.table(
        {
            "edition_year": pa.array([r["edition_year"] for r in rows], type=pa.int32()),
            "year_built_bucket": pa.array([r["year_built_bucket"] for r in rows], type=pa.string()),
            "ausstattung": pa.array([r["ausstattung"] for r in rows], type=pa.string()),
            "wohnlage": pa.array([r["wohnlage"] for r in rows], type=pa.string()),
            "size_bucket": pa.array([r["size_bucket"] for r in rows], type=pa.string()),
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
    wfs_url = build_wfs_url(
        WOHNLAGE_WFS_BASE_URL, WOHNLAGE_WFS_TYPE_NAMES, count=WOHNLAGE_MAX_FEATURES
    )

    log.info("[Wohnlagenverzeichnis] Attribution: %s", SOURCE_ATTRIBUTION)

    if dry_run:
        log.info("[dry-run] Would fetch %s -> %s", wfs_url, out_path)
        return True

    try:
        geojson = fetch_geojson(wfs_url, timeout=180)
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

    edition_year = fetch_edition_year()

    try:
        geojson = fetch_geojson(wfs_url)
    except RuntimeError as exc:
        log.error("Failed to fetch Mietenspiegel WFS: %s", exc)
        return False

    rows = parse_mietenspiegel_features(geojson, edition_year)
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
