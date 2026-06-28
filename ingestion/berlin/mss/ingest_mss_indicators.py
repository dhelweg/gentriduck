"""
ingestion/berlin/mss/ingest_mss_indicators.py
==============================================
R-A4 — Berlin MSS indexind (SES indicator) layer ingestion.

Source: GDI Berlin OGC WFS, dl-de-zero-2.0 licence
  Per-edition URL pattern: https://gdi.berlin.de/services/wfs/mss_<YEAR>
  Feature type pattern:    mss_<YEAR>:mss<YEAR>_indexind_<N>
    where N = 447 for pre-2021 LOR editions (<=2019),
              542 for LOR 2021 editions (>=2021).

Each WFS edition is probed via GetCapabilities to discover the exact feature
type name before fetching (same pattern as ingest_mss.py for the indizes layer).

Firm editions (must succeed):   2019, 2021, 2023, 2025
Best-effort editions (skip on failure): 2013, 2015, 2017

Attribute vocabulary (per-edition WFS column -> canonical indicator name):
  s1  -> arbeitslose_anteil      (Arbeitslosigkeit SGB II; status level; all editions)
  s2  -> transferbezug_anteil    (Transferbezug SGB II/XII nicht-Erwerbstätige;
                                   column name 's2' in 2023+; 's2_x' (always null) pre-2023)
  s3  -> kinderarmut_anteil      (Kinderarmut, SGB II transfer u15; status level; all editions)
  s4  -> alleinerziehende_anteil (Kinder in alleinerziehenden Haushalten; all editions
                                   2015+. Note: ADR-0006 stated 2023+ only, but WFS
                                   probing confirms the column is populated in all editions.)
  d1  -> arbeitslose_dynamik     (Dynamik version of s1; all editions)
  d2  -> transferbezug_dynamik   (Dynamik version of s2; column 'd2'/'d2_x' per edition)
  d3  -> kinderarmut_dynamik     (Dynamik version of s3; all editions)
  d4  -> alleinerziehende_dynamik(Dynamik version of s4; all editions 2015+)

Column-name quirk (confirmed by WFS probing):
  Editions 2015–2021 publish 's2_x' and 'd2_x' instead of 's2'/'d2', and those
  columns are always null (the indicator was suspended/reformatted in that span).
  Editions 2023+ publish 's2'/'d2' with valid float values.
  The adapter looks for 's2' first, then falls back to 's2_x'; same for 'd2'.

Uninhabited PLR sentinel: -9999 (stored as null value, PLR row is kept).

Output: long format — one row per (edition, plr_id, indicator).
  edition              int32
  plr_id               string   (zero-padded to 8 chars)
  plr_name             string
  lor_vintage          string   ('lor_pre2021' for <=2019, 'lor_2021' for >=2021)
  indicator            string   (canonical snake_case name; see above)
  raw_attr             string   (original WFS attribute name, e.g. 's1', 'd2_x')
  value                float64  (null for uninhabited PLRs or where column is absent)
  source_attribution   string

Output file: data/raw/berlin/mss/mss_<YEAR>_indicators.parquet

Usage:
  uv run python ingestion/berlin/mss/ingest_mss_indicators.py --out-dir data/raw/berlin/mss

  # Dry run (no HTTP calls):
  uv run python ingestion/berlin/mss/ingest_mss_indicators.py --out-dir data/raw/berlin/mss --dry-run

  # Select specific editions:
  uv run python ingestion/berlin/mss/ingest_mss_indicators.py \\
      --out-dir data/raw/berlin/mss --editions 2019 2021 2023 2025

ADR-0007: Berlin MSS indexind WFS — SES indicators per PLR (dl-de-zero-2.0)
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
# 2013 returns HTTP 404 (no WFS); 2015/2017 exist but are best-effort.
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

# Sentinel value used in the WFS for uninhabited Planungsräume.
UNINHABITED_SENTINEL = -9999

# ---------------------------------------------------------------------------
# Indicator vocabulary
#
# Each entry: (canonical_name, primary_attr, fallback_attr)
# primary_attr  — the column name to look up in props first
# fallback_attr — alternative column name to try if primary is absent (may be None)
#
# WFS quirk: editions 2015–2021 publish 's2_x'/'d2_x' (always null) instead of
# 's2'/'d2'. Editions 2023+ publish 's2'/'d2' with real values.
# The adapter always looks for primary first, then fallback.
# ---------------------------------------------------------------------------

INDICATOR_VOCAB: list[tuple[str, str, Optional[str]]] = [
    # Status-level indicators
    ("arbeitslose_anteil", "s1", None),
    ("transferbezug_anteil", "s2", "s2_x"),
    ("kinderarmut_anteil", "s3", None),
    ("alleinerziehende_anteil", "s4", None),
    # Dynamik (change) indicators
    ("arbeitslose_dynamik", "d1", None),
    ("transferbezug_dynamik", "d2", "d2_x"),
    ("kinderarmut_dynamik", "d3", None),
    ("alleinerziehende_dynamik", "d4", None),
]

# Parquet schema for the output files.
INDICATORS_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("edition", pa.int32()),
        pa.field("plr_id", pa.string()),
        pa.field("plr_name", pa.string()),
        pa.field("lor_vintage", pa.string()),
        pa.field("indicator", pa.string()),
        pa.field("raw_attr", pa.string()),
        pa.field("value", pa.float64()),
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
log = logging.getLogger("mss_indicators_ingest")


# ---------------------------------------------------------------------------
# WFS helpers  (reuse same pattern as ingest_mss.py)
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


def discover_indexind_type_name(edition: int) -> str:
    """
    Call GetCapabilities and return the exact ``indexind`` feature type name.

    Searches for a type name matching ``mss<YEAR>_indexind_<N>`` in the
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

    names = re.findall(r"<Name>([^<]+)</Name>", xml_text)
    pattern = re.compile(rf"mss_{edition}:mss{edition}_indexind_\d+")
    matched = [n for n in names if pattern.match(n)]

    if not matched:
        raise RuntimeError(
            f"[{edition}] No 'indexind' feature type found in GetCapabilities. "
            f"Available names: {names[:20]}"
        )

    type_name = matched[0]
    log.info("[%d] Discovered feature type: %s", edition, type_name)
    return type_name


def fetch_indexind_geojson(edition: int, type_name: str, timeout: int = 180) -> dict:
    """
    Fetch the full ``indexind`` layer as GeoJSON FeatureCollection.

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
        raise RuntimeError(f"[{edition}] Invalid JSON response. Excerpt: {raw[:200]!r}") from exc

    if data.get("type") != "FeatureCollection":
        raise RuntimeError(
            f"[{edition}] Expected FeatureCollection, got type={data.get('type')!r}. "
            f"Excerpt: {str(raw[:200])}"
        )

    n_features = len(data.get("features", []))
    log.info("[%d] Received %d features", edition, n_features)
    return data


# ---------------------------------------------------------------------------
# Feature parsing — long format
# ---------------------------------------------------------------------------


def _coerce_value(raw: object) -> Optional[float]:
    """
    Coerce a WFS property value to float.

    Returns None for the uninhabited sentinel (-9999), JSON null, or
    values that cannot be parsed as float.
    """
    if raw is None:
        return None
    try:
        v = float(raw)
    except (ValueError, TypeError):
        return None
    if v == UNINHABITED_SENTINEL:
        return None
    return v


def parse_features_long(geojson: dict, edition: int) -> list[dict]:
    """
    Parse GeoJSON features into long-format row dicts.

    Each WFS feature produces one row per indicator in INDICATOR_VOCAB.
    Uninhabited PLR rows (sentinel -9999) are included with null values.
    Features missing a plr_id are skipped with a warning.

    The adapter probes for the primary attribute name first; if absent it
    falls back to the alternate name (handles the s2_x/d2_x quirk in pre-2023
    editions). The actual attribute name used is recorded in ``raw_attr``.
    """
    features = geojson.get("features", [])
    if edition not in LOR_VINTAGE_MAP:
        raise RuntimeError(
            f"Edition {edition} is not in LOR_VINTAGE_MAP. "
            "Add it to LOR_VINTAGE_MAP before ingesting."
        )
    vintage = LOR_VINTAGE_MAP[edition]
    attribution = _source_attribution(edition)
    log.info("[%d] Parsing %d features (vintage=%s)", edition, len(features), vintage)

    rows: list[dict] = []
    skipped = 0

    for feat in features:
        props = feat.get("properties") or {}

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

        for canonical_name, primary_attr, fallback_attr in INDICATOR_VOCAB:
            # Determine which raw attribute name the WFS actually published.
            if primary_attr in props:
                used_attr = primary_attr
                raw_val = props[primary_attr]
            elif fallback_attr is not None and fallback_attr in props:
                used_attr = fallback_attr
                raw_val = props[fallback_attr]
            else:
                # Column entirely absent from this edition — skip indicator.
                log.debug(
                    "[%d] Indicator %r not present (tried %r / %r) — skipping for plr %s",
                    edition,
                    canonical_name,
                    primary_attr,
                    fallback_attr,
                    plr_id,
                )
                continue

            value = _coerce_value(raw_val)

            rows.append(
                {
                    "edition": edition,
                    "plr_id": plr_id,
                    "plr_name": plr_name,
                    "lor_vintage": vintage,
                    "indicator": canonical_name,
                    "raw_attr": used_attr,
                    "value": value,
                    "source_attribution": attribution,
                }
            )

    if skipped:
        log.warning("[%d] Skipped %d features (missing plr_id)", edition, skipped)

    n_plrs = len({r["plr_id"] for r in rows})
    n_null = sum(1 for r in rows if r["value"] is None)
    log.info(
        "[%d] Parsed %d rows (%d PLRs, %d indicators with null value)",
        edition,
        len(rows),
        n_plrs,
        n_null,
    )
    return rows


# ---------------------------------------------------------------------------
# Write parquet
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path) -> None:
    """Write long-format rows to a Parquet file using the indicators schema."""
    table = pa.table(
        {
            "edition": pa.array([r["edition"] for r in rows], type=pa.int32()),
            "plr_id": pa.array([r["plr_id"] for r in rows], type=pa.string()),
            "plr_name": pa.array([r["plr_name"] for r in rows], type=pa.string()),
            "lor_vintage": pa.array([r["lor_vintage"] for r in rows], type=pa.string()),
            "indicator": pa.array([r["indicator"] for r in rows], type=pa.string()),
            "raw_attr": pa.array([r["raw_attr"] for r in rows], type=pa.string()),
            "value": pa.array([r["value"] for r in rows], type=pa.float64()),
            "source_attribution": pa.array(
                [r["source_attribution"] for r in rows], type=pa.string()
            ),
        },
        schema=INDICATORS_PARQUET_SCHEMA,
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    pq.write_table(table, out_path, compression="snappy")
    log.info(
        "[%d] Wrote %d rows to %s",
        rows[0]["edition"] if rows else 0,
        len(rows),
        out_path,
    )


# ---------------------------------------------------------------------------
# Per-edition pipeline
# ---------------------------------------------------------------------------


def process_edition(edition: int, out_dir: Path, dry_run: bool = False) -> bool:
    """
    Discover WFS feature type, fetch, parse to long format, and write parquet.

    Returns True on success, False on failure.
    """
    out_path = out_dir / f"mss_{edition}_indicators.parquet"

    if dry_run:
        expected_n = 447 if edition <= 2019 else 542
        log.info(
            "[dry-run][%d] Would fetch mss_%d:mss%d_indexind_%d -> %s",
            edition,
            edition,
            edition,
            expected_n,
            out_path,
        )
        return True

    try:
        type_name = discover_indexind_type_name(edition)
    except RuntimeError as exc:
        log.error("[%d] GetCapabilities failed: %s", edition, exc)
        return False

    try:
        geojson = fetch_indexind_geojson(edition, type_name)
    except RuntimeError as exc:
        log.error("[%d] GetFeature failed: %s", edition, exc)
        return False

    rows = parse_features_long(geojson, edition)

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
            "Download Berlin MSS indexind (SES indicator) layer "
            "from GDI Berlin WFS and write Parquet — ADR-0007."
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
