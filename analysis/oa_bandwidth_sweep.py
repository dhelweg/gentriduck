"""
analysis/oa_bandwidth_sweep.py
===============================
#274 (G2-oa-publish-gates): discharges ADR-0017 condition C-4, the OA
bandwidth-fragility publish gate -- "Report the cross-bandwidth OA rank
correlation; if OA rankings are bandwidth-fragile the G2 page must flag OA as
bandwidth-sensitive" (mirrors the §7 r > 0.7 MAUP publish gate discipline;
docs/methodology/spatial-methods.md §7, §11.2, §11.3; ADR-0017 D5 C-4).

This is an OA-SPECIFIC bandwidth sweep, distinct from `analysis/a6_maup.py`'s
POI-count/dynamism MAUP sweep (a6_maup answers "is the DYNAMISM index
scale/bandwidth-robust"; this answers "is OA rank-stable across its own
{500, 1000, 1500} m sweep", spatial-methods.md §11.2). a6_maup.py's own
bandwidth-sweep section only ever compares whatever single `gaussian_*`
weight_variant happens to already be built against the 'standard' hard count
-- it has never actually run the full {500, 1000, 1500} m cross-bandwidth
comparison, because `int_osm_poi_plr_weighted`/`int_poi_offering_advantage`
are `materialized='table'` and built with ONE bandwidth per dbt run (the
`poi_kernel_bandwidth_m` var), so only one `gaussian_*` variant physically
exists in the warehouse at a time.

DESIGN NOTE -- why this script invokes dbt directly (a deliberate, narrowly-
scoped exception to the analysis-scripts-only-read convention,
spatial-methods.md §9: "All PySAL/h3 code lives in analysis/*.py only ... it
never enters the dbt build path"): producing all three OA bandwidths requires
the actual `int_osm_poi_plr_weighted` distance-weighting recomputation at
each bandwidth, not a read-only reinterpretation of already-built data.
Rebuilding it three times via `dbt run --vars` is the only way to get real
numbers without either (a) duplicating the Gaussian-kernel spatial-join SQL a
second time in Python (a methodology-drift risk against the signed-off
canonical model), or (b) permanently changing `int_osm_poi_plr_weighted`'s
materialization to always compute all three bandwidths on every build (3x
cost paid by every downstream consumer -- dynamism, hotspots -- for a metric,
OA, only two consumers actually need). So this script:
  1. runs `dbt run` three times, once per sweep bandwidth, selecting only
     `int_osm_poi_plr_weighted` + `int_poi_offering_advantage` (fast: ~10-12s
     per bandwidth measured locally on the full Berlin 2008-2026 history);
  2. after each run, reads the resulting `oa_domain` rows into memory;
  3. restores the warehouse to its DEFAULT (project-var, currently 500 m)
     single-bandwidth build once done, plus the two downstream OA marts, so
     this script never leaves the warehouse in a non-default state for any
     other consumer (`uv run poe build` afterwards is then a no-op on these
     four models).
Flagged here for reviewer visibility -- this is a one-off exception for this
discharge ticket, not a new general analysis-script pattern.

Compares `oa_domain` (the coarsest OA taxonomy level) across the
{500, 1000, 1500} m sweep (spatial-methods.md §11.2, ADR-0017 D2.3), reporting
Spearman rank correlation (equivalent to a6_maup.py's own "Pearson correlation
of rankings") for each bandwidth pair, per snapshot_year AND pooled across all
years, for city_code='BER' (Hamburg's index/OA isn't signed off yet, #125),
weight_variant='gaussian_<bw>m' / methodology_variant='faithful' throughout.

CORRECTION (iteration 2 review, #274): this docstring previously claimed
`oa_domain` here is "the level actually displayed on
web/pages/berlin/poi-map.md" -- that is FALSE. That page filters
`weight_variant = 'standard'` (the bandwidth-free, hard point-in-polygon
variant, unchanged by this ticket), never a `gaussian_<bw>m` variant, and
every analysis script behind the methodology.md §7 headline correlation
(c_three_way_comparison.py, c_offering_relevance_validation.py,
e1_regressions.py, e4_early_warning.py) also hardcodes
`weight_variant='standard'`. This script's sweep therefore characterizes ONLY
the gaussian-weighted construct's own bandwidth sensitivity -- it says
nothing about the bandwidth-sensitivity of any currently-published figure,
since 'standard' has no bandwidth parameter to vary in the first place. See
docs/epic-g/G2-oa-bandwidth-sweep-findings.md ("What this sweep does NOT
characterize") for the full corrected disclosure, and OA-C.1 (#174) for the
separate, still-open question of whether the published headline should ever
switch from 'standard' to a gaussian_<bw>m construct.

Acceptance threshold: r > 0.7, mirroring spatial-methods.md §7's MAUP publish
gate (ADR-0017 D5 C-4 explicitly "mirrors the §7 r > 0.7 MAUP publish gate").
Below 0.7 for ANY pair, OA is bandwidth-fragile and the G2 methodology page
must flag OA as bandwidth-sensitive (C-4 is a publish gate, not merely a
caveat -- domain condition: "treat fragility as a substantive finding about
the spatial grain of succession, not merely a caveat").

Output: data/analysis/oa_bandwidth_sweep.csv (gitignored, like a6_maup's own
output).

DB: $GENTRIDUCK_DB env var or data/gentriduck.duckdb (ADR-0010 Amendment 7).

Usage:
  uv run python analysis/oa_bandwidth_sweep.py

Citations:
  spatial-methods.md §7 (r > 0.7 publish-gate threshold, mirrored per C-4);
  §11.2 ({500,1000,1500} m OA sweep spec, 1000 m headline).
  ADR-0017 D5 C-4 (bandwidth-fragility publish gate).
  Openshaw (1984), The Modifiable Areal Unit Problem, CATMOG 38.
"""

from __future__ import annotations

import logging
import os
import shutil
import subprocess
import sys
from itertools import combinations
from pathlib import Path

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
log = logging.getLogger(__name__)

# QA-7 (#182) precedent: __file__-anchored so this script runs from any cwd.
_repo_root = Path(__file__).parent.parent
_transform_dir = _repo_root / "transform"

_env_db = os.environ.get("GENTRIDUCK_DB")
DUCKDB_PATH = Path(_env_db) if _env_db else _repo_root / "data" / "gentriduck.duckdb"

OUT_DIR = _repo_root / "data" / "analysis"
OUT_CSV = OUT_DIR / "oa_bandwidth_sweep.csv"

# spatial-methods.md §11.2 / ADR-0017 D2.3: the OA sweep set, 1000 m headline.
OA_BANDWIDTH_SWEEP_M = [500, 1000, 1500]

# spatial-methods.md §7 threshold, mirrored by ADR-0017 D5 C-4.
FRAGILITY_THRESHOLD = 0.7

# Models this sweep touches, in dependency order (used both for the per-
# bandwidth builds and the final default-state restore).
_SWEEP_MODELS = ["int_osm_poi_plr_weighted", "int_poi_offering_advantage"]
_RESTORE_MODELS = [
    "int_osm_poi_plr_weighted",
    "int_poi_offering_advantage",
    "mart_poi_offering_advantage",
    "mart_poi_offering_advantage_map",
]


def _import_deps() -> tuple:
    try:
        import duckdb
    except ImportError:
        log.error("duckdb not installed. Run: uv sync")
        sys.exit(1)
    try:
        import pandas as pd
    except ImportError:
        log.error("pandas not installed. Run: uv sync")
        sys.exit(1)
    try:
        from scipy.stats import spearmanr
    except ImportError:
        log.error("scipy not installed. Run: uv sync")
        sys.exit(1)
    return duckdb, pd, spearmanr


def _dbt_bin() -> str:
    dbt_path = shutil.which("dbt")
    if not dbt_path:
        log.error(
            "dbt not found on PATH. Run this script via the project venv "
            "(uv run python analysis/oa_bandwidth_sweep.py) so the repo-local "
            "dbt is resolvable, per CLAUDE.md (never a global dbt)."
        )
        sys.exit(1)
    return dbt_path


def _run_dbt(dbt_bin: str, select: list[str], vars_override: str | None) -> None:
    """One `dbt run` invocation, project-scoped exactly like `uv run poe build`
    (transform/profiles.yml, ADR-0001), optionally overriding
    `poi_kernel_bandwidth_m` for this call only (see module docstring)."""
    cmd = [
        dbt_bin,
        "run",
        "--project-dir",
        str(_transform_dir),
        "--profiles-dir",
        str(_transform_dir),
        "--select",
        *select,
    ]
    if vars_override:
        cmd += ["--vars", vars_override]
    log.info("Running: %s", " ".join(cmd))
    result = subprocess.run(  # noqa: S603 -- fixed argv built from constants/local vars, not user input
        cmd, cwd=_repo_root, capture_output=True, text=True, check=False
    )
    if result.returncode != 0:
        log.error("dbt run failed (select=%s, vars=%s):\n%s", select, vars_override, result.stdout)
        log.error(result.stderr)
        sys.exit(1)


def build_bandwidth_variant(dbt_bin: str, bandwidth_m: int) -> None:
    """Rebuild int_osm_poi_plr_weighted + int_poi_offering_advantage at one
    sweep bandwidth (see module docstring, DESIGN NOTE)."""
    _run_dbt(
        dbt_bin,
        _SWEEP_MODELS,
        f"{{poi_kernel_bandwidth_m: {bandwidth_m}}}",
    )


def restore_default_state(dbt_bin: str) -> None:
    """Rebuild the two sweep models + their two downstream OA marts at the
    project DEFAULT bandwidth (no --vars override, i.e. whatever
    `poi_kernel_bandwidth_m`'s in-model default currently is -- 500 m as of
    this ticket), so this script leaves the warehouse exactly as it found it.
    """
    log.info("Restoring warehouse to its default-bandwidth build...")
    _run_dbt(dbt_bin, _RESTORE_MODELS, None)


def load_oa_domain(con, pd, bandwidth_m: int):
    """oa_domain per (area_code, snapshot_year, poi_domain_h) at this
    bandwidth -- Berlin only (Hamburg's weighted variant isn't built, and
    Hamburg's index isn't signed off yet, #125).

    QA-4 (#179) precedent, same pitfall documented in
    mart_poi_offering_advantage.sql: int_poi_offering_advantage's 'gaussian_*'
    rows inherit city_code='berlin' (lowercase) from int_osm_poi_plr_weighted
    (predates ADR-0005 canonicalization), while its 'standard' rows already
    carry canonical 'BER'. This is a raw DuckDB query reading the intermediate
    layer directly (not through the mart's `canonical_city_code()` dbt macro),
    so both spellings must be matched explicitly here.

    Review finding (iteration 2, #274): int_poi_offering_advantage's grain is
    (..., poi_category_h, poi_type_h, ...) -- a domain-level oa_domain value is
    repeated once per (category, type) leaf under that domain (verified:
    raw_rows=321,092 vs distinct (area_code, snapshot_year, poi_domain_h)
    triples=76,731 at gaussian_500m alone -- some keys repeat 33-34x). Without
    deduplicating here, compare_pair()'s merge on matching keys performs a
    many-to-many cross-product on top of that duplication, inflating n_units
    into the millions and implicitly over-weighting domains with more
    category/type leaves (e.g. Retail). GROUP BY + any_value(oa_domain)
    mirrors the same lossless collapse already used in
    transform/models/marts/mart_poi_offering_advantage_map.sql (oa_domain is
    constant across all (poi_category_h, poi_type_h) leaves within a domain by
    construction -- int_poi_offering_advantage computes it once per domain and
    repeats it across that domain's leaf rows).
    """
    sql = f"""
        SELECT
            area_code,
            snapshot_year,
            poi_domain_h,
            any_value(oa_domain) AS oa_domain
        FROM int_poi_offering_advantage
        WHERE (lower(city_code) = 'berlin' OR city_code = 'BER')
          AND weight_variant = 'gaussian_{bandwidth_m}m'
          AND methodology_variant = 'faithful'
          AND area_code IS NOT NULL
          AND oa_domain IS NOT NULL
        GROUP BY area_code, snapshot_year, poi_domain_h
    """
    return con.execute(sql).df()


def compare_pair(pd, spearmanr, df_a, df_b, label_a: str, label_b: str, year: int | None):
    """Spearman rank correlation of oa_domain between two bandwidth variants,
    joined on (area_code, poi_domain_h) [+ snapshot_year when year is None,
    i.e. the pooled-across-years comparison]."""
    join_keys = (
        ["area_code", "poi_domain_h"]
        if year is not None
        else [
            "area_code",
            "snapshot_year",
            "poi_domain_h",
        ]
    )
    merged = df_a.merge(df_b, on=join_keys, suffixes=("_a", "_b"))
    merged = merged.dropna(subset=["oa_domain_a", "oa_domain_b"])
    if len(merged) < 3:
        return None
    r, pval = spearmanr(merged["oa_domain_a"], merged["oa_domain_b"])
    warning = ""
    if r < FRAGILITY_THRESHOLD:
        warning = (
            f"BANDWIDTH-FRAGILITY WARNING: {label_a} vs {label_b} Spearman r={r:.3f} "
            f"< {FRAGILITY_THRESHOLD}. OA rankings are bandwidth-fragile "
            f"{'(pooled, all years)' if year is None else f'at year={year}'} "
            "-- ADR-0017 D5 C-4 publish gate: the G2 methodology page MUST flag OA "
            "as bandwidth-sensitive."
        )
        log.warning(warning)
    return {
        "analysis_type": "oa_bandwidth_sweep_pooled"
        if year is None
        else "oa_bandwidth_sweep_per_year",
        "description": f"oa_domain {label_a} vs {label_b}"
        + ("" if year is None else f" -- year={year}"),
        "snapshot_year": year,
        "bandwidth_pair": f"{label_a}_vs_{label_b}",
        "spearman_r": round(float(r), 4),
        "p_value": round(float(pval), 6),
        "n_units": int(len(merged)),
        "warning": warning,
    }


def main() -> None:
    duckdb, pd, spearmanr = _import_deps()

    if not DUCKDB_PATH.exists():
        log.warning(
            "DuckDB not found at %s. Run `uv run poe build` first (requires ingested "
            "data). Writing empty stub CSV so downstream callers don't error.",
            DUCKDB_PATH,
        )
        OUT_DIR.mkdir(parents=True, exist_ok=True)
        pd.DataFrame(
            columns=[
                "analysis_type",
                "description",
                "snapshot_year",
                "bandwidth_pair",
                "spearman_r",
                "p_value",
                "n_units",
                "warning",
            ]
        ).to_csv(OUT_CSV, index=False)
        return

    dbt_bin = _dbt_bin()

    per_bandwidth: dict[int, "pd.DataFrame"] = {}
    try:
        for bw in OA_BANDWIDTH_SWEEP_M:
            log.info("Building OA at bandwidth=%dm...", bw)
            build_bandwidth_variant(dbt_bin, bw)
            con = duckdb.connect(str(DUCKDB_PATH), read_only=True)
            try:
                per_bandwidth[bw] = load_oa_domain(con, pd, bw)
            finally:
                con.close()
    finally:
        # Always restore, even if a build/read step above raised.
        restore_default_state(dbt_bin)

    results = []
    labels = {bw: f"gaussian_{bw}m" for bw in OA_BANDWIDTH_SWEEP_M}

    for bw_a, bw_b in combinations(OA_BANDWIDTH_SWEEP_M, 2):
        df_a, df_b = per_bandwidth[bw_a], per_bandwidth[bw_b]
        if df_a.empty or df_b.empty:
            log.warning(
                "No rows for bandwidth %sm or %sm (int_osm_poi_plr_weighted/"
                "int_poi_offering_advantage empty -- OSM ingestion not run). Skipping pair.",
                bw_a,
                bw_b,
            )
            continue

        # Pooled across all years (the single headline figure for the G2 page).
        pooled = compare_pair(pd, spearmanr, df_a, df_b, labels[bw_a], labels[bw_b], year=None)
        if pooled:
            results.append(pooled)

        # Per-year (robustness detail -- consistent fragility/stability across
        # time is itself part of the substantive finding, not only the pooled number).
        years = sorted(set(df_a["snapshot_year"]) & set(df_b["snapshot_year"]))
        for year in years:
            ya = df_a[df_a["snapshot_year"] == year]
            yb = df_b[df_b["snapshot_year"] == year]
            r = compare_pair(pd, spearmanr, ya, yb, labels[bw_a], labels[bw_b], year=year)
            if r:
                results.append(r)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    if not results:
        log.warning("No OA bandwidth-sweep results produced (no overlapping data).")
        pd.DataFrame(
            columns=[
                "analysis_type",
                "description",
                "snapshot_year",
                "bandwidth_pair",
                "spearman_r",
                "p_value",
                "n_units",
                "warning",
            ]
        ).to_csv(OUT_CSV, index=False)
        return

    out_df = pd.DataFrame(results)
    out_df.to_csv(OUT_CSV, index=False)
    log.info("OA bandwidth sweep written to %s (%d rows)", OUT_CSV, len(out_df))

    pooled_rows = out_df[out_df["analysis_type"] == "oa_bandwidth_sweep_pooled"]
    log.info("Pooled (all-years) cross-bandwidth OA rank correlation:")
    for _, row in pooled_rows.iterrows():
        log.info(
            "  %s: Spearman r=%.3f (n=%d)", row["bandwidth_pair"], row["spearman_r"], row["n_units"]
        )

    warnings = out_df[out_df["warning"] != ""]["warning"].tolist()
    if warnings:
        log.warning("OA BANDWIDTH-FRAGILITY CONCERNS:")
        for w in warnings:
            log.warning("  %s", w)
    else:
        log.info(
            "OA rankings are STABLE across the {500,1000,1500}m sweep "
            "(all pairs r > %.1f) -- no bandwidth-sensitivity flag required per C-4.",
            FRAGILITY_THRESHOLD,
        )

    log.info("oa_bandwidth_sweep.py complete.")


if __name__ == "__main__":
    main()
