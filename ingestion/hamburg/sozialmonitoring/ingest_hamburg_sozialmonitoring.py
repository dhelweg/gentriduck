"""
ingestion/hamburg/sozialmonitoring/ingest_hamburg_sozialmonitoring.py
========================================================================
H1 (#40) — Hamburg Sozialmonitoring outcome-variable ingestion (ADR-0014
Pillar 2). Direct conceptual analogue of Berlin's MSS
(ingestion/berlin/mss/ingest_mss.py, ADR-0006): Status-Index x
Dynamik-Index -> Gesamtindex, the **outcome / ground-truth** variable for
the gentrification-index re-grounding (R-A1 discipline — never a
predictor, mirrors ADR-0006 decision 6 and ADR-0014 Pillar-2 "role
discipline").

Source: LGV Hamburg WFS (deegree instance), via the Transparenzportal.
  GetCapabilities (verified live 2026-07-01):
    https://geodienste.hamburg.de/wfs_sozialmonitoring?service=WFS&version=2.0.0&request=GetCapabilities
  Feature type (resolves ADR-0014 open question #1 for this pillar):
    de.hh.up:sozialmonitoring
  NOTE: this is a *different* WFS base URL/casing convention than the
  geometry pillar's HH_WFS_* endpoints (ingest_hamburg_geo.py) — Hamburg's
  Transparenzportal does not use one uniform WFS naming scheme across
  datasets; each pillar's endpoint must be independently confirmed
  (ADR-0014 open question #1). Discovered via the Transparenzportal CKAN
  API (package_show for the "sozialmonitoring...karte-gesamtindex19"
  dataset) rather than guessing the HH_WFS_* pattern used by geometry.

Same deegree quirk as ingest_hamburg_geo.py: outputFormat must be
'application/geo+json', not 'application/json'.

Licence: dl-de/by-2.0 — attribution: "Freie und Hansestadt Hamburg,
Behörde für Stadtentwicklung und Wohnen" (ADR-0014 Pillar 2).

Source attribute mapping (confirmed live via a sample GetFeature call,
2026-07-01 — resolves ADR-0014 open question #1 for this pillar):
  jahr          -> edition            (int; 2013..2025 confirmed, annual —
                                        NOT biennial like Berlin's MSS,
                                        ADR-0014 Pillar-2 cadence note)
  statgeb       -> area_code          (statistisches-Gebiet id, matches
                                        stg_hamburg_geo's subarea_l2
                                        area_code from the same source
                                        family)
  stadtteil     -> stadtteil_name     (string, informational only —
                                        NOT joined; area_code is the join
                                        key against stg_hamburg_geo)
  bevoelkerung  -> population         (residents; the source's own
                                        >300-residents scoring threshold
                                        is already applied upstream —
                                        gebiete below it are simply
                                        absent from the WFS output, not
                                        present-with-nulls; ~840-857 of
                                        945 statistische Gebiete scored
                                        per year, consistent with
                                        ADR-0014's "currently 857" note)
  statusindex   -> status_index       ('hoch'|'mittel'|'niedrig'|
                                        'sehr niedrig' — text-coded,
                                        unlike Berlin MSS's 1-4 integer
                                        si_n; preserved as the source's
                                        own ordinal labels rather than
                                        inventing a numeric mapping here,
                                        so no methodology judgement is
                                        smuggled into the ingestion layer)
  dynamikindex  -> dynamik_index      ('positiv'|'stabil'|'negativ' —
                                        text-coded, analogous meaning to
                                        Berlin's mapped 1/2/3 but a
                                        **3-year** change window vs
                                        Berlin's 2-year (ADR-0014
                                        Pillar-2 non-equivalence note))
  gesamtindex   -> gesamtindex_label  (source's own composite label,
                                        e.g. "Status mittel - Dynamik 0";
                                        kept as free text — Hamburg does
                                        not publish Berlin's compact
                                        2-digit numeric code, so no
                                        equivalent gesamtindex integer is
                                        fabricated here)

This ingestor deliberately does NOT invent a numeric status_index /
dynamik_index mapping (unlike Berlin's ingest_mss.py, which maps WFS
si_n/di_n integers to a 1-4/1-3 scale) because Hamburg's source already
publishes human-readable ordinal labels with no numeric code to
preserve faithfully. Any ordinal-to-numeric encoding for cross-city
comparison is a methodology decision (R-C1) for int_mss_*-equivalent
Hamburg models, not this staging-adjacent ingestion script.

Output parquet schema (single file, all years/gebiete):
  city_code           (string): 'HH'
  edition              (int32): WFS 'jahr' (2013-2025 confirmed annual)
  area_code            (string): statistisches-Gebiet id ('statgeb')
  stadtteil_name       (string): informational Stadtteil name (not a join key)
  population            (int32): 'bevoelkerung' (nullable)
  status_index         (string): 'hoch'|'mittel'|'niedrig'|'sehr niedrig'
  dynamik_index        (string): 'positiv'|'stabil'|'negativ'
  gesamtindex_label    (string): source's free-text composite label
  source_attribution   (string): mandatory dl-de/by-2.0 attribution

Usage:
  uv run python ingestion/hamburg/sozialmonitoring/ingest_hamburg_sozialmonitoring.py \\
      --out-dir data/raw/hamburg/sozialmonitoring

  # Dry run (no HTTP calls):
  uv run python ingestion/hamburg/sozialmonitoring/ingest_hamburg_sozialmonitoring.py \\
      --out-dir data/raw/hamburg/sozialmonitoring --dry-run

Runtime: ~10-30 s for the full ~11,000-row single WFS response on normal
broadband (no per-edition pagination needed — the WFS returns all years
in one GetFeature call, unlike Berlin's per-edition MSS WFS instances).

ADR-0014 Pillar 2: Sozialmonitoring Integrierte Stadtteilentwicklung
Hamburg (dl-de/by-2.0), Behörde für Stadtentwicklung und Wohnen (BSW).
"""

from __future__ import annotations

import argparse
import json
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

import pyarrow as pa
import pyarrow.parquet as pq

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

CITY_CODE = "HH"

WFS_BASE_URL = "https://geodienste.hamburg.de/wfs_sozialmonitoring"
WFS_TYPE_NAME = "de.hh.up:sozialmonitoring"

SOURCE_ATTRIBUTION = (
    "Freie und Hansestadt Hamburg, Behörde für Stadtentwicklung und Wohnen "
    "— Sozialmonitoring Integrierte Stadtteilentwicklung, dl-de/by-2.0 "
    "— https://transparenz.hamburg.de/"
)

# Expected value domains — used only for a data-quality warning, never to
# filter or coerce (faithfulness to the source, per the module docstring).
EXPECTED_STATUS_VALUES = {"hoch", "mittel", "niedrig", "sehr niedrig"}
EXPECTED_DYNAMIK_VALUES = {"positiv", "stabil", "negativ"}

# Firm year range: confirmed live 2026-07-01 (2013-2025). A response
# covering materially fewer editions than this is treated as a fetch
# problem, not silently accepted.
EXPECTED_MIN_EDITIONS = 10

SOZIALMONITORING_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("city_code", pa.string()),
        pa.field("edition", pa.int32()),
        pa.field("area_code", pa.string()),
        pa.field("stadtteil_name", pa.string()),
        pa.field("population", pa.int32()),
        pa.field("status_index", pa.string()),
        pa.field("dynamik_index", pa.string()),
        pa.field("gesamtindex_label", pa.string()),
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
log = logging.getLogger("hamburg_sozialmonitoring_ingest")


# ---------------------------------------------------------------------------
# WFS fetch
# ---------------------------------------------------------------------------


def build_wfs_url() -> str:
    """Build the WFS 2.0.0 GetFeature URL for the Sozialmonitoring layer.

    NOTE: outputFormat must be 'application/geo+json' — this deegree WFS
    instance rejects 'application/json' (same quirk documented in
    ingest_hamburg_geo.py; confirmed independently for this endpoint
    2026-07-01).
    """
    params = {
        "service": "WFS",
        "version": "2.0.0",
        "request": "GetFeature",
        "typeNames": WFS_TYPE_NAME,
        "outputFormat": "application/geo+json",
    }
    return WFS_BASE_URL + "?" + urllib.parse.urlencode(params)


def fetch_geojson(url: str, timeout: int = 180) -> dict:
    """Fetch GeoJSON from the WFS URL. Returns parsed JSON dict; raises on error."""
    log.info("Fetching WFS GeoJSON: %s", url)
    try:
        with urllib.request.urlopen(url, timeout=timeout, context=_SSL_CONTEXT) as resp:  # noqa: S310
            raw = resp.read()
    except urllib.error.HTTPError as exc:
        raise RuntimeError(f"HTTP {exc.code} from {url}") from exc
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
            f"Expected GeoJSON FeatureCollection, got type={data.get('type')!r}. "
            f"Excerpt: {str(raw[:200])}"
        )

    n_features = len(data.get("features", []))
    log.info("Received %d features", n_features)
    return data


# ---------------------------------------------------------------------------
# Feature parsing
# ---------------------------------------------------------------------------


def _to_int_or_none(value: object) -> Optional[int]:
    if value is None:
        return None
    try:
        return int(value)
    except (ValueError, TypeError):
        return None


def parse_features(geojson: dict) -> list[dict]:
    """Parse GeoJSON features into row dicts for the output parquet.

    Every feature already represents a scored (population > 300)
    statistisches Gebiet x Jahr combination — the source applies its own
    population threshold upstream (ADR-0014 Pillar 2), so there is no
    sentinel/uninhabited value to filter here (unlike Berlin MSS's -9999).
    """
    features = geojson.get("features", [])
    log.info("Parsing %d features", len(features))

    rows: list[dict] = []
    skipped = 0
    unexpected_status = 0
    unexpected_dynamik = 0

    for feat in features:
        props = feat.get("properties") or {}

        edition = _to_int_or_none(props.get("jahr"))
        raw_area_code = props.get("statgeb")
        if edition is None or raw_area_code is None or str(raw_area_code).strip() == "":
            log.warning(
                "Feature missing jahr/statgeb; skipping. Keys: %s",
                list(props.keys())[:10],
            )
            skipped += 1
            continue

        area_code = str(raw_area_code).strip()
        stadtteil_name = str(props.get("stadtteil") or "").strip()
        population = _to_int_or_none(props.get("bevoelkerung"))

        status_index = props.get("statusindex")
        status_index = str(status_index).strip() if status_index is not None else None
        if status_index is not None and status_index not in EXPECTED_STATUS_VALUES:
            unexpected_status += 1

        dynamik_index = props.get("dynamikindex")
        dynamik_index = str(dynamik_index).strip() if dynamik_index is not None else None
        if dynamik_index is not None and dynamik_index not in EXPECTED_DYNAMIK_VALUES:
            unexpected_dynamik += 1

        gesamtindex_label = props.get("gesamtindex")
        gesamtindex_label = (
            str(gesamtindex_label).strip() if gesamtindex_label is not None else None
        )

        rows.append(
            {
                "city_code": CITY_CODE,
                "edition": edition,
                "area_code": area_code,
                "stadtteil_name": stadtteil_name,
                "population": population,
                "status_index": status_index,
                "dynamik_index": dynamik_index,
                "gesamtindex_label": gesamtindex_label,
                "source_attribution": SOURCE_ATTRIBUTION,
            }
        )

    if skipped:
        log.warning("Skipped %d features (missing jahr/statgeb)", skipped)
    if unexpected_status:
        log.warning(
            "%d rows had a status_index value outside the expected domain %s",
            unexpected_status,
            EXPECTED_STATUS_VALUES,
        )
    if unexpected_dynamik:
        log.warning(
            "%d rows had a dynamik_index value outside the expected domain %s",
            unexpected_dynamik,
            EXPECTED_DYNAMIK_VALUES,
        )

    editions_seen = sorted({r["edition"] for r in rows})
    log.info(
        "Parsed %d rows across %d editions: %s",
        len(rows),
        len(editions_seen),
        editions_seen,
    )
    return rows


# ---------------------------------------------------------------------------
# Write parquet
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path) -> None:
    """Write parsed rows to a Parquet file using the Sozialmonitoring schema."""
    table = pa.table(
        {
            "city_code": pa.array([r["city_code"] for r in rows], type=pa.string()),
            "edition": pa.array([r["edition"] for r in rows], type=pa.int32()),
            "area_code": pa.array([r["area_code"] for r in rows], type=pa.string()),
            "stadtteil_name": pa.array([r["stadtteil_name"] for r in rows], type=pa.string()),
            "population": pa.array([r["population"] for r in rows], type=pa.int32()),
            "status_index": pa.array([r["status_index"] for r in rows], type=pa.string()),
            "dynamik_index": pa.array([r["dynamik_index"] for r in rows], type=pa.string()),
            "gesamtindex_label": pa.array([r["gesamtindex_label"] for r in rows], type=pa.string()),
            "source_attribution": pa.array(
                [r["source_attribution"] for r in rows], type=pa.string()
            ),
        },
        schema=SOZIALMONITORING_PARQUET_SCHEMA,
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    pq.write_table(table, out_path, compression="snappy")
    log.info("Wrote %d rows to %s", len(rows), out_path)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Hamburg Sozialmonitoring (Status/Dynamik/Gesamtindex) "
            "from the LGV Hamburg WFS and write Parquet — ADR-0014 Pillar 2."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/hamburg/sozialmonitoring",
        type=Path,
        help="Output directory for the parquet file (default: data/raw/hamburg/sozialmonitoring).",
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
    out_path = out_dir / "sozialmonitoring.parquet"

    if args.dry_run:
        log.info(
            "[dry-run] Would fetch %s:%s -> %s",
            WFS_BASE_URL,
            WFS_TYPE_NAME,
            out_path,
        )
        return 0

    url = build_wfs_url()
    try:
        geojson = fetch_geojson(url)
    except RuntimeError as exc:
        log.error("GetFeature failed: %s", exc)
        return 1

    rows = parse_features(geojson)

    if not rows:
        log.error("No valid rows produced — not writing parquet.")
        return 1

    editions_seen = sorted({r["edition"] for r in rows})
    if len(editions_seen) < EXPECTED_MIN_EDITIONS:
        log.error(
            "Only %d editions found (expected >= %d) — possible partial "
            "fetch or upstream schema drift. Not writing parquet. Editions: %s",
            len(editions_seen),
            EXPECTED_MIN_EDITIONS,
            editions_seen,
        )
        return 1

    try:
        write_parquet(rows, out_path)
    except Exception as exc:
        log.error("Failed to write parquet: %s", exc)
        return 1

    log.info("Done. %d rows, %d editions.", len(rows), len(editions_seen))
    return 0


if __name__ == "__main__":
    sys.exit(main())
