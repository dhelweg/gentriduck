"""
ingestion/berlin/mss/ingest_mss.py
====================================
R-A3 — Berlin MSS (Monitoring Soziale Stadtentwicklung) ingestion.

Source: GDI Berlin OGC WFS, dl-de-zero-2.0 licence
  Per-edition URL pattern: https://gdi.berlin.de/services/wfs/mss_<YEAR>
  Feature type pattern:    mss_<YEAR>:mss<YEAR>_indizes_<N>
    where N = 447 for pre-2021 LOR editions (<=2019),
              542 for LOR 2021 editions (>=2021).

Each WFS edition is probed via GetCapabilities to discover the exact feature
type name before fetching. This guards against minor N-count variations in
older editions.

Firm editions (must succeed):   2019, 2021, 2023, 2025
Best-effort editions (skip on failure): 2013, 2015, 2017

Attribute mapping (consistent across all confirmed editions 2015–2025):
  plr_id   -> plr_id   (zero-padded to 8 chars)
  plr_name -> plr_name
  si_n     -> status_index  (1=hoch, 2=mittel, 3=niedrig, 4=sehr niedrig;
                              -9999 = uninhabited, stored as null)
  di_n     -> dynamik_index mapped: {1->1 positiv, 3->2 stabil, 5->3 negativ}
                              (-9999 = uninhabited, stored as null)
  sdi_n    -> gesamtindex   (MSS 2-digit composite: tens=status, units=dynamik
                              e.g. 23 = Status mittel + Dynamik stabil;
                              -9999 = uninhabited, stored as null)

Note on gesamtindex: The WFS publishes the official MSS 2-digit group code
(11..45, exactly 12 distinct values) rather than a simple 1-12 ordinal.
The SPEC's "1-12" description is a simplification; we preserve the source
coding (11, 13, 15, 21, 23, 25, 31, 33, 35, 41, 43, 45) for faithfulness
to the official MSS report. Uninhabited PLR rows (sdi_n = -9999) are stored
with null indices and excluded from row-count validation.

Output parquet schema (per edition file):
  edition             int32
  plr_id              string   (zero-padded to 8 chars)
  plr_name            string
  lor_vintage         string   ('lor_pre2021' for <=2019, 'lor_2021' for >=2021)
  status_index        int32    (1–4; null for uninhabited)
  dynamik_index       int32    (1–3; null for uninhabited; mapped from di_n {1,3,5})
  gesamtindex         int32    (MSS 2-digit code 11–45; null for uninhabited)
  source_attribution  string

Usage:
  uv run python ingestion/berlin/mss/ingest_mss.py --out-dir data/raw/berlin/mss

  # Dry run (no HTTP calls):
  uv run python ingestion/berlin/mss/ingest_mss.py --out-dir data/raw/berlin/mss --dry-run

  # Select specific editions:
  uv run python ingestion/berlin/mss/ingest_mss.py \\
      --out-dir data/raw/berlin/mss --editions 2019 2021 2023 2025

ADR-0006: Berlin MSS WFS ingestion (dl-de-zero-2.0 licence)
Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin
"""

from __future__ import annotations

import argparse
import logging
import re
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Optional

# macOS Python does not ship CA certs; use certifi's bundle when available.
try:
    import certifi as _certifi

    _SSL_CONTEXT = ssl.create_default_context(cafile=_certifi.where())
except ImportError:
    _SSL_CONTEXT = ssl.create_default_context()

import json

import pyarrow as pa
import pyarrow.parquet as pq

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

# Firm editions: ingestion failures are fatal.
FIRM_EDITIONS = [2019, 2021, 2023, 2025]

# Best-effort editions: ingestion failures are logged and skipped.
BEST_EFFORT_EDITIONS = [2013, 2015, 2017]

ALL_EDITIONS = sorted(BEST_EFFORT_EDITIONS + FIRM_EDITIONS)

# LOR vintage per edition (boundary changes at 2021).
LOR_VINTAGE_MAP = {
    2013: "lor_pre2021",
    2015: "lor_pre2021",
    2017: "lor_pre2021",
    2019: "lor_pre2021",
    2021: "lor_2021",
    2023: "lor_2021",
    2025: "lor_2021",
}

# Dynamik index mapping: WFS di_n -> normalised 1–3.
# WFS publishes odd-step integers: 1=positiv, 3=stabil, 5=negativ.
DYNAMIK_MAP: dict[int, int] = {1: 1, 3: 2, 5: 3}

# Sentinel value used in the WFS for uninhabited Planungsräume.
UNINHABITED_SENTINEL = -9999

# Parquet schema for the output files.
MSS_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("edition", pa.int32()),
        pa.field("plr_id", pa.string()),
        pa.field("plr_name", pa.string()),
        pa.field("lor_vintage", pa.string()),
        pa.field("status_index", pa.int32()),
        pa.field("dynamik_index", pa.int32()),
        pa.field("gesamtindex", pa.int32()),
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
log = logging.getLogger("mss_ingest")


# ---------------------------------------------------------------------------
# WFS helpers
# ---------------------------------------------------------------------------


def _source_attribution(edition: int) -> str:
    return (
        f"Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin "
        f"— Monitoring Soziale Stadtentwicklung {edition}"
    )


def _wfs_base_url(edition: int) -> str:
    return f"https://gdi.berlin.de/services/wfs/mss_{edition}"


def _fetch_raw(url: str, timeout: int = 120) -> bytes:
    """Fetch raw bytes from a URL. Raises RuntimeError on network/HTTP errors."""
    log.debug("GET %s", url)
    try:
        with urllib.request.urlopen(url, timeout=timeout, context=_SSL_CONTEXT) as resp:  # noqa: S310
            return resp.read()
    except urllib.error.HTTPError as exc:
        raise RuntimeError(f"HTTP {exc.code} from {url}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Network error fetching {url}: {exc}") from exc
    except Exception as exc:
        raise RuntimeError(f"Unexpected error fetching {url}: {exc}") from exc


def discover_indizes_type_name(edition: int) -> str:
    """
    Call GetCapabilities and return the exact `indizes` feature type name.

    Searches for a type name matching ``mss<YEAR>_indizes_<N>`` in the
    capabilities XML. Raises RuntimeError if none is found or the endpoint
    is unreachable.
    """
    base_url = _wfs_base_url(edition)
    caps_url = (
        base_url
        + "?"
        + urllib.parse.urlencode(
            {"service": "WFS", "version": "2.0.0", "request": "GetCapabilities"}
        )
    )
    log.info("[%d] Probing GetCapabilities: %s", edition, caps_url)
    raw = _fetch_raw(caps_url, timeout=30)
    xml_text = raw.decode("utf-8", errors="replace")

    # Extract all <Name> elements — the namespace prefix is ``mss_<YEAR>:<name>``
    names = re.findall(r"<Name>([^<]+)</Name>", xml_text)
    pattern = re.compile(rf"mss_{edition}:mss{edition}_indizes_\d+")
    matched = [n for n in names if pattern.match(n)]

    if not matched:
        raise RuntimeError(
            f"[{edition}] No 'indizes' feature type found in GetCapabilities. "
            f"Available names: {names[:20]}"
        )

    type_name = matched[0]
    log.info("[%d] Discovered feature type: %s", edition, type_name)
    return type_name


def fetch_indizes_geojson(edition: int, type_name: str, timeout: int = 180) -> dict:
    """
    Fetch the full `indizes` layer as GeoJSON FeatureCollection.

    Raises RuntimeError on network or format errors.
    """
    base_url = _wfs_base_url(edition)
    params = urllib.parse.urlencode(
        {
            "service": "WFS",
            "version": "2.0.0",
            "request": "GetFeature",
            "typeNames": type_name,
            "outputFormat": "application/json",
        }
    )
    url = base_url + "?" + params
    log.info("[%d] Fetching GeoJSON: %s", edition, url)
    raw = _fetch_raw(url, timeout=timeout)

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise RuntimeError(
            f"[{edition}] Invalid JSON response. Excerpt: {raw[:200]!r}"
        ) from exc

    if data.get("type") != "FeatureCollection":
        raise RuntimeError(
            f"[{edition}] Expected FeatureCollection, got type={data.get('type')!r}. "
            f"Excerpt: {str(raw[:200])}"
        )

    n_features = len(data.get("features", []))
    log.info("[%d] Received %d features", edition, n_features)
    return data


# ---------------------------------------------------------------------------
# Feature parsing
# ---------------------------------------------------------------------------


def _map_status(si_n: object) -> Optional[int]:
    """Map WFS si_n to status_index (1–4). Returns None for uninhabited sentinel."""
    if si_n is None:
        return None
    try:
        v = int(si_n)
    except (ValueError, TypeError):
        return None
    if v == UNINHABITED_SENTINEL:
        return None
    if 1 <= v <= 4:
        return v
    log.warning("Unexpected si_n value: %r — storing as null", si_n)
    return None


def _map_dynamik(di_n: object) -> Optional[int]:
    """
    Map WFS di_n {1,3,5} to normalised dynamik_index {1,2,3}.
    Returns None for uninhabited sentinel (-9999) or unexpected values.
    """
    if di_n is None:
        return None
    try:
        v = int(di_n)
    except (ValueError, TypeError):
        return None
    if v == UNINHABITED_SENTINEL:
        return None
    mapped = DYNAMIK_MAP.get(v)
    if mapped is None:
        log.warning("Unexpected di_n value: %r — storing as null", di_n)
    return mapped


def _map_gesamtindex(sdi_n: object) -> Optional[int]:
    """
    Map WFS sdi_n (2-digit MSS code, e.g. 23) to gesamtindex.
    Returns None for uninhabited sentinel (-9999).
    The 12 valid codes are: 11,13,15,21,23,25,31,33,35,41,43,45.
    """
    if sdi_n is None:
        return None
    try:
        v = int(sdi_n)
    except (ValueError, TypeError):
        return None
    if v == UNINHABITED_SENTINEL:
        return None
    return v


def parse_features(geojson: dict, edition: int) -> list[dict]:
    """
    Parse GeoJSON features into row dicts for the output parquet.

    Each feature produces one row. Uninhabited PLR rows (sentinel -9999) are
    included with null index values so the PLR key is preserved. Features
    missing a plr_id are skipped with a warning.
    """
    features = geojson.get("features", [])
    vintage = LOR_VINTAGE_MAP[edition]
    attribution = _source_attribution(edition)
    log.info("[%d] Parsing %d features (vintage=%s)", edition, len(features), vintage)

    rows: list[dict] = []
    skipped = 0

    for feat in features:
        props = feat.get("properties") or {}

        # Extract PLR identifier — consistent name across all confirmed editions.
        raw_id = props.get("plr_id") or props.get("PLR_ID")
        if raw_id is None:
            log.warning(
                "[%d] Feature missing plr_id; skipping. Keys: %s",
                edition,
                list(props.keys())[:10],
            )
            skipped += 1
            continue

        plr_id = str(raw_id).strip().zfill(8)
        plr_name = str(props.get("plr_name") or props.get("PLR_NAME") or "").strip()

        status_index = _map_status(props.get("si_n"))
        dynamik_index = _map_dynamik(props.get("di_n"))
        gesamtindex = _map_gesamtindex(props.get("sdi_n"))

        rows.append(
            {
                "edition": edition,
                "plr_id": plr_id,
                "plr_name": plr_name,
                "lor_vintage": vintage,
                "status_index": status_index,
                "dynamik_index": dynamik_index,
                "gesamtindex": gesamtindex,
                "source_attribution": attribution,
            }
        )

    if skipped:
        log.warning("[%d] Skipped %d features (missing plr_id)", edition, skipped)

    n_uninhabited = sum(1 for r in rows if r["status_index"] is None)
    n_valid = len(rows) - n_uninhabited
    log.info(
        "[%d] Parsed %d rows (%d inhabited PLRs, %d uninhabited/null)",
        edition,
        len(rows),
        n_valid,
        n_uninhabited,
    )
    return rows


# ---------------------------------------------------------------------------
# Write parquet
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path) -> None:
    """Write parsed rows to a Parquet file using the MSS schema."""
    table = pa.table(
        {
            "edition": pa.array([r["edition"] for r in rows], type=pa.int32()),
            "plr_id": pa.array([r["plr_id"] for r in rows], type=pa.string()),
            "plr_name": pa.array([r["plr_name"] for r in rows], type=pa.string()),
            "lor_vintage": pa.array([r["lor_vintage"] for r in rows], type=pa.string()),
            "status_index": pa.array([r["status_index"] for r in rows], type=pa.int32()),
            "dynamik_index": pa.array([r["dynamik_index"] for r in rows], type=pa.int32()),
            "gesamtindex": pa.array([r["gesamtindex"] for r in rows], type=pa.int32()),
            "source_attribution": pa.array(
                [r["source_attribution"] for r in rows], type=pa.string()
            ),
        },
        schema=MSS_PARQUET_SCHEMA,
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    pq.write_table(table, out_path, compression="snappy")
    log.info("[%d] Wrote %d rows to %s", rows[0]["edition"] if rows else 0, len(rows), out_path)


# ---------------------------------------------------------------------------
# Per-edition pipeline
# ---------------------------------------------------------------------------


def process_edition(edition: int, out_dir: Path, dry_run: bool = False) -> bool:
    """
    Discover WFS feature type, fetch, parse, and write parquet for one edition.

    Returns True on success, False on failure.
    """
    out_path = out_dir / f"mss_{edition}.parquet"

    if dry_run:
        expected_n = 447 if edition <= 2019 else 542
        log.info(
            "[dry-run][%d] Would fetch mss_%d:mss%d_indizes_%d -> %s",
            edition,
            edition,
            edition,
            expected_n,
            out_path,
        )
        return True

    try:
        type_name = discover_indizes_type_name(edition)
    except RuntimeError as exc:
        log.error("[%d] GetCapabilities failed: %s", edition, exc)
        return False

    try:
        geojson = fetch_indizes_geojson(edition, type_name)
    except RuntimeError as exc:
        log.error("[%d] GetFeature failed: %s", edition, exc)
        return False

    rows = parse_features(geojson, edition)

    if not rows:
        log.error("[%d] No valid rows produced — not writing parquet.", edition)
        return False

    try:
        write_parquet(rows, out_path)
    except Exception as exc:
        log.error("[%d] Failed to write parquet: %s", edition, exc)
        return False

    return True


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Berlin MSS (Monitoring Soziale Stadtentwicklung) indices "
            "from GDI Berlin WFS and write Parquet — ADR-0006."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/berlin/mss",
        type=Path,
        help="Output directory for parquet files (default: data/raw/berlin/mss).",
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be fetched without making HTTP calls.",
    )
    p.add_argument(
        "--editions",
        nargs="+",
        type=int,
        default=ALL_EDITIONS,
        metavar="YEAR",
        help=(
            f"Editions to ingest (default: all {ALL_EDITIONS}). "
            "Firm editions (2019 2021 2023 2025) cause a non-zero exit on failure; "
            "best-effort editions (2013 2015 2017) are skipped silently on failure."
        ),
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

    requested_editions: list[int] = sorted(args.editions)
    firm_requested = [e for e in requested_editions if e in FIRM_EDITIONS]
    best_effort_requested = [e for e in requested_editions if e in BEST_EFFORT_EDITIONS]

    log.info(
        "Editions to ingest — firm: %s, best-effort: %s",
        firm_requested,
        best_effort_requested,
    )

    firm_errors: list[int] = []
    success_count = 0

    for edition in requested_editions:
        is_firm = edition in FIRM_EDITIONS
        ok = process_edition(edition, out_dir, dry_run=args.dry_run)
        if ok:
            success_count += 1
        elif is_firm:
            log.error("[%d] Firm edition failed — will exit non-zero.", edition)
            firm_errors.append(edition)
        else:
            log.warning(
                "[%d] Best-effort edition failed — skipping (expected for older editions).",
                edition,
            )

    log.info(
        "Summary: %d/%d editions succeeded. Firm failures: %s",
        success_count,
        len(requested_editions),
        firm_errors or "none",
    )

    return 1 if firm_errors else 0


if __name__ == "__main__":
    sys.exit(main())
