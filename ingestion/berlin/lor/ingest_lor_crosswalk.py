"""
ingestion/berlin/lor/ingest_lor_crosswalk.py
=============================================
C3-crosswalk — areal-weighted PLR pre-2021 to LOR 2021 crosswalk (+ reverse direction).

Reads the two LOR geometry parquets (pre2021_plr.parquet and lor_2021_plr.parquet)
from data/raw/berlin/lor/, computes the geometric intersection of all
(pre-2021 PLR, 2021 PLR) pairs, and writes a crosswalk parquet with
areal-weighting coefficients in BOTH directions.

## Methodology (geo-DS approved 2026-06-19, C3-crosswalk-geo-signoff.md;
## reverse direction approved 2026-07-04, docs/epic-d/D1d-followup-geo-signoff.md, #136)

Forward direction (pre2021 -> 2021), used by int_berlin_ewr_plr2021:
  weight = Area(intersection(pre2021_plr, lor2021_plr_i)) / Area(pre2021_plr)

Reverse direction (2021 -> pre2021), used by #136 to re-key mart_price_rent_dimension
(published on lor_2021) back onto the governed index's lor_pre2021 area codes:
  reverse_weight = Area(intersection(pre2021_plr_i, lor2021_plr)) / Area(lor2021_plr)

Both weights are derived from the SAME intersection geometry — only the normalizing
denominator (source-side vs target-side polygon area) differs. Weights sum to 1.0 per
pre-2021 PLR for `weight`, and to 1.0 per 2021 PLR for `reverse_weight` (both validated
at runtime; see WEIGHT_SUM_TOLERANCE).

EWR indicator values can be reapportioned pre2021 -> 2021 as:
  indicator_2021_plr = SUM(indicator_pre2021_plr * weight_i)

And intensive price/rent covariates can be reapportioned 2021 -> pre2021 as:
  indicator_pre2021_plr = SUM(indicator_2021_plr * reverse_weight_i)

For extensive indicators (counts): this is exact apportionment.
For intensive indicators (rates/shares): this approximates a population-weighted
average under the uniform-population-within-PLR assumption (standard practice at
this spatial scale; documented limitation in int_berlin_ewr_plr2021.sql /
mart_price_rent_dimension_pre2021.sql).

## Source geometries

Both vintages are in EPSG:25833 (ETRS89 / UTM zone 33N), native from the
GDI Berlin WFS. Intersection is computed in EPSG:25833; areas are in m2.
Geometry is stored as WKB in the parquet files (large_binary column).

## Output (data/raw/berlin/lor/lor_crosswalk.parquet)

  plr_id_pre2021  (string)  -- pre-2021 PLR area_code (8-digit)
  plr_id_2021     (string)  -- 2021 PLR area_code (8-digit)
  weight          (float64) -- intersection_area / pre2021_plr_area
  reverse_weight  (float64) -- intersection_area / lor2021_plr_area
  mapping_type    (string)  -- always 'areal_weighted' for geometric crosswalks
  note            (string)  -- diagnostics (weight deviation, etc.)

Rows with zero-area intersection are omitted.
Weight-sum tolerance: each pre-2021 PLR's `weight` values must sum to 1.0 +/- 0.01;
each 2021 PLR's `reverse_weight` values must sum to 1.0 +/- 0.01.

## Usage

  uv run python ingestion/berlin/lor/ingest_lor_crosswalk.py \\
      --lor-dir data/raw/berlin/lor

  # Dry run (read geometries, compute stats, no output):
  uv run python ingestion/berlin/lor/ingest_lor_crosswalk.py \\
      --lor-dir data/raw/berlin/lor --dry-run

Source attribution: Geoportal Berlin / GDI Berlin, CC BY 3.0 DE
  https://gdi.berlin.de/
"""

from __future__ import annotations

import argparse
import logging
import sys
from pathlib import Path
from typing import Optional

try:
    import pyarrow as pa
    import pyarrow.parquet as pq
except ImportError as exc:
    raise ImportError("pyarrow is required: uv sync") from exc

try:
    from shapely.wkb import loads as wkb_loads
except ImportError as exc:
    raise ImportError("shapely is required: uv sync") from exc

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

WEIGHT_SUM_TOLERANCE = 0.01  # maximum allowed deviation from 1.0 per PLR (either direction)
WEIGHT_SUM_WARN_FRACTION = 0.01  # warn if > 1% of PLRs exceed tolerance

CROSSWALK_SCHEMA = pa.schema(
    [
        pa.field("plr_id_pre2021", pa.string()),
        pa.field("plr_id_2021", pa.string()),
        pa.field("weight", pa.float64()),
        pa.field("reverse_weight", pa.float64()),
        pa.field("mapping_type", pa.string()),
        pa.field("note", pa.string()),
    ]
)

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s -- %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)
log = logging.getLogger("lor_crosswalk")


# ---------------------------------------------------------------------------
# Geometry loading
# ---------------------------------------------------------------------------


def load_geometries(parquet_path: Path) -> list[tuple[str, object]]:
    """
    Load (area_code, shapely_geometry) pairs from a LOR parquet file.
    Geometry is stored as WKB (large_binary). CRS is EPSG:25833; areas in m2.
    """
    table = pq.read_table(str(parquet_path), columns=["area_code", "geometry_wkb"])
    results = []
    errors = 0
    for i in range(len(table)):
        area_code = table["area_code"][i].as_py()
        wkb_bytes = table["geometry_wkb"][i].as_py()
        if not wkb_bytes:
            log.warning("Empty WKB for area_code=%s — skipped", area_code)
            errors += 1
            continue
        try:
            geom = wkb_loads(wkb_bytes)
        except Exception as exc:
            log.warning("WKB parse error for area_code=%s: %s — skipped", area_code, exc)
            errors += 1
            continue
        if geom is None or geom.is_empty:
            log.warning("Empty geometry for area_code=%s — skipped", area_code)
            errors += 1
            continue
        results.append((area_code, geom))
    if errors:
        log.warning("Skipped %d features due to geometry errors (of %d total)", errors, len(table))
    log.info("Loaded %d geometries from %s", len(results), parquet_path.name)
    return results


# ---------------------------------------------------------------------------
# Crosswalk computation
# ---------------------------------------------------------------------------


def compute_crosswalk(
    pre2021: list[tuple[str, object]],
    lor2021: list[tuple[str, object]],
) -> tuple[list[dict], dict[str, float], dict[str, float]]:
    """
    Compute areal-weighted crosswalk between pre-2021 PLRs and 2021 PLRs, in BOTH
    directions, from the same intersection geometry.

    For each pre-2021 PLR, finds all 2021 PLRs whose geometry intersects it,
    computes intersection area, and derives:
      weight         = intersection_area / pre2021_area   (forward: pre2021 -> 2021)
      reverse_weight = intersection_area / lor2021_area    (reverse: 2021 -> pre2021)

    Returns (rows, weight_sums, reverse_weight_sums) where:
      rows: list of dicts with keys plr_id_pre2021, plr_id_2021, weight,
            reverse_weight, mapping_type, note
      weight_sums: {plr_id_pre2021: sum(weight)} — should be ~1.0 each
      reverse_weight_sums: {plr_id_2021: sum(reverse_weight)} — should be ~1.0 each
    """
    # 2021 PLR areas, computed once and reused as the reverse-weight denominator.
    lor2021_areas: dict[str, float] = {code: geom.area for code, geom in lor2021}

    rows: list[dict] = []
    weight_sums: dict[str, float] = {}
    reverse_weight_sums: dict[str, float] = {}
    total = len(pre2021)

    for i, (pre_code, pre_geom) in enumerate(pre2021):
        if (i + 1) % 50 == 0 or i == total - 1:
            log.info("Processing pre-2021 PLR %d/%d", i + 1, total)

        pre_area = pre_geom.area
        if pre_area <= 0:
            log.warning("pre-2021 PLR %s has zero area — skipped", pre_code)
            continue

        plr_rows: list[dict] = []
        for new_code, new_geom in lor2021:
            # Quick bounding-box pre-filter before full intersection
            if not pre_geom.intersects(new_geom):
                continue

            try:
                intersection = pre_geom.intersection(new_geom)
            except Exception as exc:
                log.debug(
                    "Intersection error for pre=%s new=%s: %s — skipped pair",
                    pre_code,
                    new_code,
                    exc,
                )
                continue

            if intersection is None or intersection.is_empty:
                continue

            inter_area = intersection.area
            if inter_area <= 0:
                continue

            new_area = lor2021_areas.get(new_code, 0.0)
            weight = inter_area / pre_area
            reverse_weight = inter_area / new_area if new_area > 0 else 0.0
            plr_rows.append(
                {
                    "plr_id_pre2021": pre_code,
                    "plr_id_2021": new_code,
                    "weight": weight,
                    "reverse_weight": reverse_weight,
                    "mapping_type": "areal_weighted",
                    "note": "",
                }
            )

        if not plr_rows:
            log.warning("pre-2021 PLR %s: no intersecting 2021 PLRs found", pre_code)
            continue

        # Compute forward weight sum for this pre-2021 PLR
        ws = sum(r["weight"] for r in plr_rows)
        weight_sums[pre_code] = ws

        # Log deviation if significant
        deviation = abs(ws - 1.0)
        if deviation > WEIGHT_SUM_TOLERANCE:
            log.warning(
                "pre-2021 PLR %s: weight sum = %.4f (deviation %.4f > tolerance %.4f)",
                pre_code,
                ws,
                deviation,
                WEIGHT_SUM_TOLERANCE,
            )
            for r in plr_rows:
                r["note"] = f"weight_sum={ws:.4f}"

        rows.extend(plr_rows)

    # Reverse weight sums are accumulated per 2021 PLR across ALL pre-2021 PLRs that
    # intersect it (unlike the forward sum, which is scoped per pre-2021 PLR loop
    # iteration above), so aggregate over the full row set.
    for r in rows:
        code = r["plr_id_2021"]
        reverse_weight_sums[code] = reverse_weight_sums.get(code, 0.0) + r["reverse_weight"]

    return rows, weight_sums, reverse_weight_sums


def validate_weight_sums(
    weight_sums: dict[str, float],
    n_expected: int,
    direction_label: str,
) -> bool:
    """
    Validate that weights sum to 1.0 +/- WEIGHT_SUM_TOLERANCE per source PLR.
    Returns True if validation passes (warning-only), logs details.

    direction_label: human-readable label for log messages (e.g. "forward (pre2021)"
    or "reverse (2021)").
    """
    if not weight_sums:
        log.error("[%s] No weight sums computed — crosswalk is empty", direction_label)
        return False

    violations = {
        code: ws for code, ws in weight_sums.items() if abs(ws - 1.0) > WEIGHT_SUM_TOLERANCE
    }
    missing = n_expected - len(weight_sums)

    log.info(
        "[%s] Weight sum validation: %d PLRs processed, %d missing (no intersections), "
        "%d exceed +/-%.3f tolerance",
        direction_label,
        len(weight_sums),
        missing,
        len(violations),
        WEIGHT_SUM_TOLERANCE,
    )

    if violations:
        violation_rate = len(violations) / len(weight_sums)
        for code, ws in sorted(violations.items())[:10]:
            log.warning(
                "  [%s] PLR %s: weight_sum=%.4f (deviation %.4f)",
                direction_label,
                code,
                ws,
                abs(ws - 1.0),
            )
        if len(violations) > 10:
            log.warning("  ... and %d more violations", len(violations) - 10)
        log.warning(
            "[%s] Weight sum violation rate: %d/%d = %.1f%% (tolerance <= %.1f%%)",
            direction_label,
            len(violations),
            len(weight_sums),
            violation_rate * 100,
            WEIGHT_SUM_WARN_FRACTION * 100,
        )
        if violation_rate > WEIGHT_SUM_WARN_FRACTION:
            log.error(
                "[%s] Weight sum violation rate %.1f%% exceeds threshold %.1f%% — "
                "check LOR geometry topology",
                direction_label,
                violation_rate * 100,
                WEIGHT_SUM_WARN_FRACTION * 100,
            )
            return False
    else:
        log.info(
            "[%s] All processed PLRs: weight sums within +/-%.3f tolerance",
            direction_label,
            WEIGHT_SUM_TOLERANCE,
        )

    # Summarise weight sum distribution
    all_sums = list(weight_sums.values())
    mean_ws = sum(all_sums) / len(all_sums)
    min_ws = min(all_sums)
    max_ws = max(all_sums)
    log.info(
        "[%s] Weight sum distribution: mean=%.4f min=%.4f max=%.4f",
        direction_label,
        mean_ws,
        min_ws,
        max_ws,
    )

    return True


# ---------------------------------------------------------------------------
# Write Parquet
# ---------------------------------------------------------------------------


def write_crosswalk(rows: list[dict], out_path: Path) -> None:
    """Write the crosswalk rows to Parquet using CROSSWALK_SCHEMA."""
    n = len(rows)
    tmp_path = out_path.with_suffix(".tmp.parquet")
    table = pa.table(
        {
            "plr_id_pre2021": pa.array([r["plr_id_pre2021"] for r in rows], type=pa.string()),
            "plr_id_2021": pa.array([r["plr_id_2021"] for r in rows], type=pa.string()),
            "weight": pa.array([r["weight"] for r in rows], type=pa.float64()),
            "reverse_weight": pa.array([r["reverse_weight"] for r in rows], type=pa.float64()),
            "mapping_type": pa.array([r["mapping_type"] for r in rows], type=pa.string()),
            "note": pa.array([r["note"] for r in rows], type=pa.string()),
        },
        schema=CROSSWALK_SCHEMA,
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    pq.write_table(table, tmp_path, compression="snappy")
    tmp_path.rename(out_path)
    log.info("Wrote %d crosswalk rows -> %s", n, out_path)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Compute areal-weighted PLR pre-2021 <-> LOR 2021 crosswalk (both directions). "
            "Reads pre2021_plr.parquet and lor_2021_plr.parquet from --lor-dir; "
            "writes lor_crosswalk.parquet to the same directory."
        )
    )
    p.add_argument(
        "--lor-dir",
        default="data/raw/berlin/lor",
        type=Path,
        help="Directory containing pre2021_plr.parquet and lor_2021_plr.parquet (default: data/raw/berlin/lor).",
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Load geometries and compute crosswalk stats but do not write output.",
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

    lor_dir = args.lor_dir.resolve()
    pre2021_path = lor_dir / "pre2021_plr.parquet"
    lor2021_path = lor_dir / "lor_2021_plr.parquet"
    out_path = lor_dir / "lor_crosswalk.parquet"

    # Validate inputs
    for p in (pre2021_path, lor2021_path):
        if not p.exists():
            log.error("Required input not found: %s", p)
            log.error("Run ingest_lor_geometries.py first to populate %s", lor_dir)
            return 1

    log.info("LOR crosswalk computation (forward + reverse)")
    log.info("  pre-2021 PLRs: %s", pre2021_path)
    log.info("  LOR 2021 PLRs: %s", lor2021_path)
    log.info("  output:        %s", out_path)

    # Load geometries
    pre2021 = load_geometries(pre2021_path)
    lor2021 = load_geometries(lor2021_path)

    if not pre2021 or not lor2021:
        log.error("Failed to load geometries — cannot compute crosswalk")
        return 1

    log.info(
        "Computing intersections: %d pre-2021 PLRs x %d 2021 PLRs (%.0f pairs max)",
        len(pre2021),
        len(lor2021),
        len(pre2021) * len(lor2021),
    )

    # Compute crosswalk (both directions, from the same intersection geometry)
    rows, weight_sums, reverse_weight_sums = compute_crosswalk(pre2021, lor2021)

    if not rows:
        log.error("No crosswalk rows computed — check geometry overlap")
        return 1

    log.info("Computed %d crosswalk rows", len(rows))

    # Validate weight sums, both directions
    valid_fwd = validate_weight_sums(
        weight_sums, n_expected=len(pre2021), direction_label="forward (pre2021)"
    )
    valid_rev = validate_weight_sums(
        reverse_weight_sums, n_expected=len(lor2021), direction_label="reverse (2021)"
    )
    if not (valid_fwd and valid_rev):
        log.error("Weight sum validation failed — check geometry topology")
        return 1

    if args.dry_run:
        log.info("[dry-run] Would write %d rows to %s", len(rows), out_path)
        return 0

    # Write output
    write_crosswalk(rows, out_path)

    log.info("LOR crosswalk computation complete.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
