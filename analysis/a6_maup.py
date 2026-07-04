"""
analysis/a6_maup.py
===================
A6 (#69): MAUP (Modifiable Areal Unit Problem) sensitivity analysis.

Two dimensions of sensitivity (spatial-methods.md §7; ADR-0008 §4 mandatory sensitivity):

1. SCALE SENSITIVITY — PLR vs BZR:
   Recompute the dynamism index ranking at PLR (primary grain) and BZR (Bezirksregion,
   next coarser LOR tier). Report Pearson rank correlation.
   spatial-methods.md §7: acceptance threshold r > 0.7. Below 0.7 the index is MAUP-fragile
   and the G2 methodology page must say so prominently (publish gate, not advisory).

2. BANDWIDTH SWEEP — 250 m / 500 m / 750 m (±50% of default):
   Recompute the distance-weighted POI share for each bandwidth by querying the
   int_osm_poi_plr_weighted model with different poi_kernel_bandwidth_m values.
   In practice (no ingestion data in CI), this compares the available weighted_count
   output at each bandwidth vs the standard hard count, reporting Pearson r between
   bandwidth variants of the PLR-level total.
   spatial-methods.md §4: sweep brackets 250 m (intra-Kiez) to 750 m (adjacent Kieze).

Output: data/analysis/a6_maup_sensitivity.csv
  Columns: analysis_type, description, snapshot_year, bandwidth_m, pearson_r, n_units, warning.

DB: $GENTRIDUCK_DB env var or data/gentriduck.duckdb (ADR-0010 Amendment 7).

Usage:
  uv run python analysis/a6_maup.py

Citations:
  Openshaw (1984), The Modifiable Areal Unit Problem, CATMOG 38 — MAUP framing.
  spatial-methods.md §7 (PLR-vs-BZR + bandwidth sweep specification).
  ADR-0008 §4 — mandatory sensitivity sweep.
  spatial-methods.md §4 — bandwidth ±50% rationale (Dangschat 1988/2000 spillover scale).
"""

from __future__ import annotations

import logging
import os
import sys
from pathlib import Path

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
log = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Configuration (ADR-0010 Amendment 7: configurable connection)
# ---------------------------------------------------------------------------
_env_db = os.environ.get("GENTRIDUCK_DB")
DUCKDB_PATH = _env_db if _env_db else "data/gentriduck.duckdb"

OUT_DIR = Path("data/analysis")

# spatial-methods.md §7: PLR-vs-BZR rank correlation threshold.
MAUP_THRESHOLD = 0.7

# spatial-methods.md §4: bandwidth sweep — ±50% of 500 m default.
BANDWIDTH_SWEEP_M = [250, 500, 750]


def _import_deps() -> tuple:
    try:
        import duckdb
    except ImportError:
        log.error("duckdb not installed. Run: uv sync")
        sys.exit(1)
    try:
        import numpy as np
    except ImportError:
        log.error("numpy not installed. Run: uv sync")
        sys.exit(1)
    try:
        import pandas as pd
    except ImportError:
        log.error("pandas not installed. Run: uv sync")
        sys.exit(1)
    try:
        from scipy.stats import pearsonr, rankdata
    except ImportError:
        log.error("scipy not installed. Run: uv sync")
        sys.exit(1)
    return duckdb, np, pd, pearsonr, rankdata


def plr_to_bzr_code(area_code: str) -> str:
    """Derive BZR code from PLR code.

    Berlin LOR hierarchy: PLR 8 digits → BZR 6 digits (first 6 chars).
    Reference: GDI Berlin LOR documentation (ingestion/berlin/lor/).
    """
    return area_code[:6] if area_code and len(area_code) >= 6 else area_code


def run_scale_sensitivity(con, pd, np, pearsonr, rankdata) -> list[dict]:
    """PLR vs BZR rank correlation (spatial-methods.md §7).

    Aggregates PLR dynamism_score to BZR by averaging (equal-weight, no population
    weighting — acceptable approximation for ranking comparison). Reports Pearson r
    between PLR rankings and the BZR-derived rankings mapped back to PLR level.
    """
    sql = """
        SELECT
            area_code,
            snapshot_year,
            dynamism_score
        FROM int_poi_status_dynamism
        WHERE area_code IS NOT NULL
          AND dynamism_score IS NOT NULL
          AND area_vintage = 'lor_2021'
        ORDER BY snapshot_year, area_code
    """
    try:
        df = con.execute(sql).df()
    except Exception as e:
        log.warning("Could not load int_poi_status_dynamism: %s", e)
        return []

    if df.empty:
        log.warning("int_poi_status_dynamism is empty; skipping scale sensitivity.")
        return []

    results = []
    years = sorted(df["snapshot_year"].unique())

    for year in years:
        year_df = df[df["snapshot_year"] == year].copy()
        if len(year_df) < 10:
            log.warning("Year=%d: too few PLRs (%d) for MAUP comparison.", year, len(year_df))
            continue

        # Derive BZR code from PLR code (spatial-methods.md §7: aggregate PLR → BZR).
        year_df["bzr_code"] = year_df["area_code"].apply(plr_to_bzr_code)

        # BZR-level dynamism: mean over constituent PLRs (ranking comparison).
        bzr_mean = (
            year_df.groupby("bzr_code")["dynamism_score"]
            .mean()
            .reset_index()
            .rename(columns={"dynamism_score": "bzr_dynamism_score"})
        )

        # Map BZR score back to PLR rows.
        merged = year_df.merge(bzr_mean, on="bzr_code", how="left")
        valid = merged.dropna(subset=["dynamism_score", "bzr_dynamism_score"])

        if len(valid) < 3:
            log.warning("Year=%d: insufficient valid pairs after BZR mapping.", year)
            continue

        # spatial-methods.md §7: Pearson correlation of the *rankings* (= Spearman's rho).
        # The r > 0.7 gate is calibrated against rank correlation; use rankdata() to rank
        # both series before passing to pearsonr() — this is Spearman's rho by construction.
        # Bandwidth-sweep comparisons (weighted counts vs standard) remain as raw Pearson
        # (comparing magnitudes of the same quantity across bandwidth variants, not
        # cross-scale orderings — spec §7 applies only to PLR-vs-BZR scale comparison).
        r, pval = pearsonr(
            rankdata(valid["dynamism_score"].values),
            rankdata(valid["bzr_dynamism_score"].values),
        )

        warning = ""
        if r < MAUP_THRESHOLD:
            warning = (
                f"MAUP WARNING: PLR-vs-BZR Pearson r={r:.3f} < {MAUP_THRESHOLD}. "
                f"Index is MAUP-fragile at year={year}. "
                "G2 methodology page MUST state MAUP instability prominently before publication "
                "(spatial-methods.md §7 publish gate — not advisory)."
            )
            log.warning(warning)
        else:
            log.info(
                "Year=%d: PLR-vs-BZR r=%.3f (>%.1f threshold — MAUP-stable).",
                year,
                r,
                MAUP_THRESHOLD,
            )

        results.append(
            {
                "analysis_type": "scale_sensitivity_plr_vs_bzr",
                "description": f"PLR vs BZR dynamism ranking — year={year}",
                "snapshot_year": year,
                "bandwidth_m": None,
                "pearson_r": round(float(r), 4),
                "n_units": int(len(valid)),
                "warning": warning,
            }
        )

    return results


def run_bandwidth_sweep(con, pd, np, pearsonr) -> list[dict]:
    """Bandwidth sweep: 250 m / 500 m / 750 m (spatial-methods.md §4, §7).

    Compares weighted_count totals per PLR across the three bandwidth variants stored
    in int_osm_poi_plr_weighted (weight_variant column). When only the default 500 m
    is present (single run without bandwidth override), reports what is available and
    logs a note about the sweep.

    spatial-methods.md §4: ±50% sweep brackets intra-Kiez (250 m) to adjacent-Kiez (750 m)
    scale — the range Dangschat (1988/2000) invasion-succession theory expects the kernel
    to operate over (Döring & Ulbricht 2016; R-C2 grounding).
    """
    # Check which weight_variants are present in the model.
    check_sql = """
        SELECT DISTINCT weight_variant
        FROM int_osm_poi_plr_weighted
        WHERE area_code IS NOT NULL
    """
    try:
        variants_df = con.execute(check_sql).df()
    except Exception as e:
        log.warning("Could not load int_osm_poi_plr_weighted: %s", e)
        return []

    available_variants = (
        set(variants_df["weight_variant"].tolist()) if not variants_df.empty else set()
    )

    if not available_variants:
        log.warning(
            "int_osm_poi_plr_weighted is empty (no ingestion data). "
            "Bandwidth sweep requires OSM data. Skipping."
        )
        return []

    expected_variants = {f"gaussian_{b}m" for b in BANDWIDTH_SWEEP_M}
    missing = expected_variants - available_variants
    if missing:
        log.info(
            "Bandwidth sweep: only %s present (missing: %s). "
            "To run full sweep, re-run dbt with poi_kernel_bandwidth_m override for each bandwidth.",
            available_variants,
            missing,
        )

    # Load PLR-level total weighted counts per year per variant.
    sql = """
        SELECT
            snapshot_year,
            area_code,
            weight_variant,
            SUM(weighted_count) AS total_weighted
        FROM int_osm_poi_plr_weighted
        WHERE area_code IS NOT NULL
        GROUP BY snapshot_year, area_code, weight_variant
    """
    try:
        wdf = con.execute(sql).df()
    except Exception as e:
        log.warning("Could not load bandwidth data: %s", e)
        return []

    if wdf.empty:
        log.warning("int_osm_poi_plr_weighted has no rows; skipping bandwidth sweep.")
        return []

    results = []
    present_variants = sorted(wdf["weight_variant"].unique())

    if len(present_variants) < 2:
        # Only one variant — compare weighted vs standard hard count (int_poi_features_pivot).
        log.info(
            "Only one bandwidth variant present (%s). "
            "Comparing weighted vs standard (int_poi_features_pivot) total POI counts.",
            present_variants,
        )
        std_sql = """
            SELECT
                snapshot_year,
                area_code,
                total_poi_count AS total_standard
            FROM int_poi_features_pivot
            WHERE area_code IS NOT NULL
        """
        try:
            std_df = con.execute(std_sql).df()
        except Exception as e:
            log.warning("Could not load int_poi_features_pivot: %s", e)
            return results

        for variant in present_variants:
            v_df = wdf[wdf["weight_variant"] == variant][
                ["snapshot_year", "area_code", "total_weighted"]
            ]
            merged = v_df.merge(std_df, on=["snapshot_year", "area_code"], how="inner")
            for year in sorted(merged["snapshot_year"].unique()):
                yd = merged[merged["snapshot_year"] == year].dropna(
                    subset=["total_weighted", "total_standard"]
                )
                if len(yd) < 3:
                    continue
                r, _ = pearsonr(yd["total_weighted"].values, yd["total_standard"].values)
                warning = ""
                if r < MAUP_THRESHOLD:
                    warning = (
                        f"BANDWIDTH WARNING: {variant} vs standard r={r:.3f} < {MAUP_THRESHOLD}. "
                        "Weighted variant diverges significantly from hard count."
                    )
                    log.warning(warning)
                results.append(
                    {
                        "analysis_type": "bandwidth_vs_standard",
                        "description": f"{variant} vs standard hard count — year={year}",
                        "snapshot_year": year,
                        "bandwidth_m": int(variant.replace("gaussian_", "").replace("m", ""))
                        if variant.startswith("gaussian_")
                        else None,
                        "pearson_r": round(float(r), 4),
                        "n_units": int(len(yd)),
                        "warning": warning,
                    }
                )
    else:
        # Multiple variants — compare pairs (250 vs 500, 500 vs 750).
        # spatial-methods.md §7: report divergence across the sweep.
        pivot = wdf.pivot_table(
            index=["snapshot_year", "area_code"],
            columns="weight_variant",
            values="total_weighted",
        ).reset_index()

        comparison_pairs = [
            (present_variants[i], present_variants[j])
            for i in range(len(present_variants))
            for j in range(i + 1, len(present_variants))
        ]

        for va, vb in comparison_pairs:
            if va not in pivot.columns or vb not in pivot.columns:
                continue
            for year in sorted(pivot["snapshot_year"].unique()):
                yd = pivot[pivot["snapshot_year"] == year][[va, vb]].dropna()
                if len(yd) < 3:
                    continue
                r, _ = pearsonr(yd[va].values, yd[vb].values)
                warning = ""
                if r < MAUP_THRESHOLD:
                    warning = (
                        f"BANDWIDTH WARNING: {va} vs {vb} r={r:.3f} < {MAUP_THRESHOLD} — "
                        f"year={year}. Kernel shape is sensitive to bandwidth choice."
                    )
                    log.warning(warning)
                results.append(
                    {
                        "analysis_type": "bandwidth_sweep",
                        "description": f"{va} vs {vb} — year={year}",
                        "snapshot_year": year,
                        "bandwidth_m": None,
                        "pearson_r": round(float(r), 4),
                        "n_units": int(len(yd)),
                        "warning": warning,
                    }
                )

    return results


def main() -> None:
    duckdb, np, pd, pearsonr, rankdata = _import_deps()

    if not Path(DUCKDB_PATH).exists():
        log.error("DuckDB not found at %s. Run uv run poe build first.", DUCKDB_PATH)
        sys.exit(1)

    con = duckdb.connect(DUCKDB_PATH, read_only=True)
    try:
        con.execute("LOAD spatial;")
    except Exception:
        pass

    log.info("Running MAUP sensitivity analysis...")

    scale_results = run_scale_sensitivity(con, pd, np, pearsonr, rankdata)
    bandwidth_results = run_bandwidth_sweep(con, pd, np, pearsonr)

    con.close()

    all_results = scale_results + bandwidth_results

    if not all_results:
        log.warning(
            "No MAUP results produced. This is expected before ingestion data is available. "
            "Run: uv run poe ingest && uv run poe build first."
        )
        # Write empty stub so downstream callers do not error on missing file.
        OUT_DIR.mkdir(parents=True, exist_ok=True)
        pd.DataFrame(
            columns=[
                "analysis_type",
                "description",
                "snapshot_year",
                "bandwidth_m",
                "pearson_r",
                "n_units",
                "warning",
            ]
        ).to_csv(OUT_DIR / "a6_maup_sensitivity.csv", index=False)
        return

    out_df = pd.DataFrame(all_results)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUT_DIR / "a6_maup_sensitivity.csv"
    out_df.to_csv(out_path, index=False)
    log.info("MAUP sensitivity written to %s (%d rows)", out_path, len(out_df))

    # Surface any warnings prominently.
    warnings = out_df[out_df["warning"] != ""]["warning"].tolist()
    if warnings:
        log.warning("MAUP SENSITIVITY CONCERNS:")
        for w in warnings:
            log.warning("  %s", w)
    else:
        log.info("All MAUP checks within thresholds.")

    log.info("a6_maup.py complete.")


if __name__ == "__main__":
    main()
