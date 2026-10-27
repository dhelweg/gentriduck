"""
analysis/e5_hamburg_lead_lag.py
================================
H-C3 (#160): independent re-test of the thesis's H3a/H3b temporal-order finding on
Hamburg's ANNUAL Sozialmonitoring series (int_hamburg_lead_lag), mirroring
analysis/e1_regressions.py's `test_h3` statistical method (Spearman rank correlation
per lag_k) for direct comparability -- but this script does NOT assume or hard-code
the Berlin H3b-dominance result. Whatever direction/significance is actually observed
on Hamburg's data is reported honestly (#160 explicit-scope note: "Do NOT attempt to
reconcile or force Hamburg's result to match Berlin's -- an honest negative/different
finding is an acceptable and expected outcome", citing #80's precedent for honest
null/negative-finding reporting).

R-C2 GROUNDING CITATIONS (mandatory per CLAUDE.md grounding rule):
  Thesis p. 91 (2018 Berlin gentrification thesis): defines H3a (POI/amenity change
    LEADS status change; REJECTED in the Berlin thesis) and H3b (status change LEADS
    amenity change; TENTATIVELY supported in the Berlin thesis (Tabelle 6-16: '(check)', 'eher bestaetigt')) via Dangschat's (1988) double
    invasion-succession cycle. The THEORY (Dangschat 1988) is city-agnostic; the
    thesis's empirical CONFIRMATION is Berlin-specific and is exactly what this script
    re-tests independently for Hamburg, per geo-DS Condition 2
    (docs/epic-h/H1-geo-signoff.md) and issue #160.
  ADR-0014 (Hamburg data sources, Pillar 2): Hamburg's Sozialmonitoring is ANNUAL
    since 2010 (vs Berlin MSS's BIENNIAL cadence) -- the source fact underlying
    int_hamburg_lead_lag's `edition_tk = edition_t + lag_k * 1` redesign (see that
    model's header for the full annual-cadence rationale). This script's lag_k values
    (1, 2, 3 real years) are therefore NOT directly comparable in real-time horizon to
    Berlin's int_mss_lead_lag lag_k values (2, 4, 6 real years) -- see "CADENCE
    CAVEAT" below.
  #129 / docs/epic-h/H1-geo-signoff.md Condition 2 (binding acceptance criterion of
    #160): D4 (ewr_composite_t) is uniformly disaggregated from Stadtteil grain
    (~104-105 areas) to Gebiet grain (~941-945 areas) in
    int_ewr_socioeco_hamburg_disagg -- every Gebiet within a Stadtteil carries an
    IDENTICAL ewr_composite value, so the effective N for any D4-covariate regression
    is Stadtteil count, not Gebiet count (Gotway & Young 2002, change-of-support
    problem). Any regression here using ewr_composite_t as a covariate clusters
    standard errors at Stadtteil grain (see `run_ols_clustered` below); the plain
    bivariate Spearman tests (mirroring e1's test_h3, which does NOT use D4 as a
    covariate) do not use D4 at all, so clustering does not apply to them -- flagged
    explicitly at each test site below, not silently assumed either way.
  index-definition.md Sec 2.4 (C5 completeness-bias correction, binding): dynamism_score
    / delta_dynamism_t are the C5-corrected columns from int_poi_status_dynamism,
    independently re-validated on Hamburg's own OSM coverage-growth curve (H-C1 #158,
    docs/epic-h/158-hc1-geo-signoff.md) -- not raw POI count deltas.
  index-definition.md Sec 4.3 (D4 baseline discipline, binding): ewr_composite_t enters
    every regression here ONLY as a cross-sectional LEVEL at time t -- no D4 delta is
    computed or used, identical to Berlin's own rule.
  index-definition.md Sec 3.2/3.3 (ordinal-transition treatment): delta_status_ordinal
    is used only for rank-order correlation (Spearman) and as a linear-regression
    dependent/independent variable in the same limited sense e1_regressions.py already
    treats it (a signed direction proxy, not a metric-differenced score) -- same
    caveat applies here.
  Cameron, A.C., Gelbach, J.B. & Miller, D.L. (2011), "Robust Inference with Multiway
    Clustering", Journal of Business & Economic Statistics 29(2) -- the cluster-robust
    (CR1) sandwich variance estimator implemented in `run_ols_clustered` below.
  Cameron, A.C. & Miller, D.L. (2015), "A Practitioner's Guide to Cluster-Robust
    Inference", Journal of Human Resources 50(2), Sec 2.1 eq. 8 -- the (G/(G-1)) *
    ((N-1)/(N-K)) small-sample correction factor applied in `run_ols_clustered`.

CADENCE CAVEAT (binding; see int_hamburg_lead_lag.sql header for the full note):
  Hamburg's lag_k=1 is a 1-CALENDAR-YEAR gap; Berlin's lag_k=1 (int_mss_lead_lag) is a
  2-CALENDAR-YEAR gap. Do not read "Hamburg lag_k=2 vs Berlin lag_k=2" as "the same
  real-time horizon" anywhere in this script's output or the findings doc -- every
  results table below labels lag_k with its real-year equivalent explicitly.

H3a/H3b DIRECTION (2026-10-26 methodology review -- supersedes the old caveat):
  H3a/H3b are claims about temporal ORDER. Until 2026-10-26 neither section of this
  script could separate them. Section 1 computed Spearman(delta_dyn_t, delta_status)
  for H3a and the SAME two arrays swapped for H3b (Spearman is symmetric -> identical
  numbers). Section 2 was documented as "the genuinely informative directional test",
  but its two OLS specs regress the same same-window pair in both orientations: that
  rescales the coefficient without adding evidence about order, which is why its H3a/H3b
  p-values were near-identical (0.31/0.31, 0.27/0.27, 0.25/0.26).

  Section 1 now uses the shared cross-lagged design (analysis/directional_inference.py):
  around each pivot year, prior window [e0, e1] and following window [e1, e2] never
  overlap; H3a = partial_rho(dPOI_prior, dStatus_following | dStatus_prior, D4) and
  H3b = partial_rho(dStatus_prior, dPOI_following | dPOI_prior, D4), with a
  Stadtteil-clustered bootstrap CI (#129: Stadtteil is the effective D4 sample unit).
  Section 2 is kept, relabelled as what it is: D4-controlled same-window CO-MOVEMENT.

Why manual cluster-robust OLS, not statsmodels (CLAUDE.md golden rule #2):
  statsmodels is not an existing dependency of this project (pyproject.toml lists
  duckdb/pandas/numpy/scipy/libpysal/esda/spreg/h3, not statsmodels) and adopting a new
  library requires an architect-reviewed ADR (CLAUDE.md golden rule #1/#2). The CR1
  cluster-robust sandwich estimator is a textbook, closed-form linear-algebra
  computation (Cameron & Miller 2015); `run_ols_clustered` below implements it directly
  with numpy (already an approved dependency), avoiding a new-library adoption
  decision for a formula this small and well-specified.

Data table used:
  * int_hamburg_lead_lag -- Hamburg annual-cadence lead-lag panel (H-C3 #160),
    city_code='HH' throughout, area_vintage='current'.

Dependencies: duckdb, numpy, scipy, pandas (all already in pyproject.toml).
DB path: $GENTRIDUCK_DB env var or data/gentriduck.duckdb (default).

Usage:
  uv run python analysis/e5_hamburg_lead_lag.py
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

try:
    import duckdb
except ImportError:
    print("ERROR: duckdb not installed. Run: uv sync")
    sys.exit(1)

try:
    import numpy as np
    import pandas as pd
    from scipy import stats
except ImportError:
    print("ERROR: scipy/numpy/pandas not installed. Run: uv sync")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

_env_db = os.environ.get("GENTRIDUCK_DB")
DUCKDB_PATH = (
    Path(_env_db) if _env_db else Path(__file__).parent.parent / "data" / "gentriduck.duckdb"
)
OUTPUT_MD = Path(__file__).parent.parent / "docs" / "epic-h" / "E5-hamburg-lead-lag-findings.md"

# Hamburg re-test of the thesis's H3a/H3b temporal-order hypotheses (thesis p. 91;
# Dangschat 1988). expected_dir encodes the THEORY-DERIVED prediction (city-agnostic
# Dangschat mechanism + D1 polarity, index-definition.md §5) -- it is what the theory
# predicts, NOT an assumption that Hamburg empirically confirms it. expected_sig is
# deliberately left as "UNKNOWN" (not True/False) for every hypothesis here, unlike
# e1_regressions.py's THESIS_HYPOTHESES -- Berlin's own thesis-confirmed/rejected
# labels must NOT be copied onto Hamburg (#160 explicit instruction). This field is
# documentation-only (not consumed by _dir_match, matching e1's own convention).
HAMBURG_HYPOTHESES: dict[str, dict] = {
    "H3a": {
        "desc": "C5-corrected Δdynamism at t leads Δstatus at t+k (POI change leads status change)",
        "citation": (
            "Thesis p.91 H3a framing (theory: Dangschat 1988), independently re-tested "
            "on Hamburg -- REJECTED in the Berlin thesis, NOT assumed to replicate or "
            "reject here. Uses C5-corrected delta_dynamism_t (index-definition.md §2.4; "
            "int_hamburg_lead_lag.sql D3 C5 note, H-C1 #158 re-validation); "
            "delta_status_ordinal is inverse-numeric (index-definition.md §5 polarity "
            "table) so the theory-derived expected direction is negative."
        ),
        "expected_dir": "negative",
        "expected_sig": "UNKNOWN -- independent re-test, not assumed (#160)",
    },
    "H3b": {
        "desc": "Δstatus at t leads Δdynamism at t+k (status change leads POI change)",
        "citation": (
            "Thesis p.91 H3b framing (theory: Dangschat 1988), independently re-tested "
            "on Hamburg -- TENTATIVELY supported in the Berlin thesis (Tabelle 6-16: '(check)', 'eher bestaetigt'), NOT assumed to replicate or "
            "reject here. delta_status_ordinal is inverse-numeric (index-definition.md "
            "§5 polarity table); improved status = negative delta, so the theory-derived "
            "expected Spearman(delta_status_ordinal, delta_dynamism_t) direction is "
            "negative."
        ),
        "expected_dir": "negative",
        "expected_sig": "UNKNOWN -- independent re-test, not assumed (#160)",
    },
    "H3c": {
        "desc": "Simultaneous dynamism ~ status_index co-movement (same edition)",
        "citation": (
            "Thesis p.91 H3c framing, run alongside H3a/H3b for the same "
            "apples-to-apples comparability e1_regressions.py provides for Berlin -- "
            "INCONCLUSIVE in the Berlin thesis (Tabelle 6-16: 0). status_index inverse-numeric "
            "(index-definition.md §5), theory-derived expected direction negative."
        ),
        "expected_dir": "negative",
        "expected_sig": "UNKNOWN -- independent re-test, not assumed (#160)",
    },
}

# Real-year equivalent of each lag_k step for this ANNUAL-cadence panel (see
# int_hamburg_lead_lag.sql header; ADR-0014 Pillar 2) -- 1 edition step = 1 year here,
# vs Berlin's 1 step = 2 years. Used only to label output tables unambiguously.
LAG_K_REAL_YEARS = {1: 1, 2: 2, 3: 3}


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------


# Cross-lagged H3a/H3b + significance-aware verdicts (2026-10-26). Sibling module;
# same import convention as e4_early_warning -> a9 / e1 -> directional_inference.
sys.path.insert(0, str(Path(__file__).parent))
from directional_inference import (  # noqa: E402
    build_cross_lagged,
    cross_lagged_tests,
    direction_conclusion,
    summarise,
    verdict,
)


def load_hamburg_lead_lag(con: duckdb.DuckDBPyConnection) -> pd.DataFrame:
    """Load the full Hamburg annual-cadence lead-lag panel (H-C3 #160).

    int_hamburg_lead_lag already carries every column this script needs (D1/D2/D3/D4
    values at t and t+k, delta_status_ordinal, delta_dynamism_t, stadtteil_code) --
    no further joins are required, unlike e1_regressions.py's load_lead_lag_data
    (which joins int_mss_lead_lag to a separate POI pivot table). Hamburg's dynamism
    predictor already lives on the same row via int_gentrification_ts's Branch C join.
    """
    return con.execute("""
        SELECT
            area_code,
            lag_k,
            edition_t,
            edition_tk,
            status_index_t,
            status_index_tk,
            delta_status_ordinal,
            dynamism_score_t,
            dynamism_score_tk,
            delta_dynamism_t,
            ewr_composite_t,
            stadtteil_code
        FROM main.int_hamburg_lead_lag
    """).df()


# ---------------------------------------------------------------------------
# Statistical helpers (mirrors e1_regressions.py's run_spearman/_dir/_dir_match
# exactly, for methodological comparability -- see module docstring)
# ---------------------------------------------------------------------------


def run_spearman(x: np.ndarray, y: np.ndarray, label: str) -> dict:
    """Run Spearman rank correlation; return dict with rho, p, n."""
    mask = ~(np.isnan(x) | np.isnan(y))
    xc, yc = x[mask], y[mask]
    n = int(mask.sum())
    if n < 10:
        return {"label": label, "n": n, "rho": None, "p": None, "sig": None, "stat_type": "rho"}
    rho, p = stats.spearmanr(xc, yc)
    return {
        "label": label,
        "n": n,
        "rho": float(rho),
        "p": float(p),
        "sig": p < 0.05,
        "stat_type": "rho",
    }


def _dir(val: float | None) -> str:
    if val is None:
        return "N/A"
    return "positive" if val > 0 else "negative"


def _dir_match(val: float | None, expected: str) -> bool:
    if val is None:
        return False
    return _dir(val) == expected


def _fmt_val(val: float | None) -> str:
    if val is None:
        return "N/A"
    if abs(val) < 0.001:
        return f"{val:.2e}"
    return f"{val:.4f}"


# ---------------------------------------------------------------------------
# Cluster-robust OLS (#129 binding requirement -- see module docstring citations)
# ---------------------------------------------------------------------------


def run_ols_clustered(
    x: np.ndarray,
    z: np.ndarray,
    y: np.ndarray,
    clusters: np.ndarray,
    label: str,
) -> dict:
    """OLS of y ~ intercept + x + z, with CR1 cluster-robust standard errors.

    #129 / H1-geo-signoff.md Condition 2 (binding, see module docstring): this is the
    ONLY function in this script that may be used when ewr_composite_t (D4) enters a
    specification as a covariate `z`. `clusters` MUST be `stadtteil_code` in that case
    -- every Gebiet within a Stadtteil shares an identical ewr_composite_t value
    (int_ewr_socioeco_hamburg_disagg's uniform-inheritance method), so the effective
    number of independent D4 observations is the Stadtteil count, not the Gebiet
    (row) count.

    Method (Cameron, Gelbach & Miller 2011; Cameron & Miller 2015 Sec 2.1 eq. 8):
    beta = (X'X)^-1 X'y (plain OLS point estimate -- clustering affects only the
    variance, not the coefficient). CR1 sandwich variance:
        V = (X'X)^-1 [ sum_g X_g' e_g e_g' X_g ] (X'X)^-1
    with small-sample correction c = (G / (G-1)) * ((N-1) / (N-K)), G = #clusters,
    N = #observations, K = #regressors (incl. intercept). Standard errors are
    sqrt(diag(c * V)); p-values use a t-distribution with (G-1) degrees of freedom
    (the conventional cluster-robust df choice, Cameron & Miller 2015 Sec 2.2).

    Returns None-valued dict (n=0/insufficient) if fewer than 10 usable rows or fewer
    than 2 usable clusters (a single cluster cannot support a robust variance
    estimate).
    """
    mask = ~np.isnan(x) & ~np.isnan(z) & ~np.isnan(y) & pd.notna(clusters)
    xc, zc, yc, cc = x[mask], z[mask], y[mask], clusters[mask]
    n = int(mask.sum())
    n_clusters = int(pd.Series(cc).nunique()) if n > 0 else 0
    _null_result = {
        "label": label,
        "n": n,
        "n_clusters": n_clusters,
        "coef_x": None,
        "se_x": None,
        "p_x": None,
        "coef_z": None,
        "se_z": None,
        "p_z": None,
        "sig_x": None,
        "stat_type": "beta (clustered SE)",
    }
    if n < 10 or n_clusters < 2:
        return _null_result

    design = np.column_stack([np.ones(n), xc, zc])
    k = design.shape[1]
    xtx = design.T @ design
    try:
        xtx_inv = np.linalg.inv(xtx)
    except np.linalg.LinAlgError:
        return _null_result
    beta = xtx_inv @ design.T @ yc
    resid = yc - design @ beta

    cluster_ids = pd.Series(cc)
    meat = np.zeros((k, k))
    for _, idx in cluster_ids.groupby(cluster_ids).groups.items():
        pos = cluster_ids.index.get_indexer(idx)
        xg = design[pos]
        eg = resid[pos]
        score_g = xg.T @ eg
        meat += np.outer(score_g, score_g)

    g = n_clusters
    small_sample_c = (g / (g - 1)) * ((n - 1) / (n - k)) if (g > 1 and n > k) else np.nan
    v_cluster = small_sample_c * (xtx_inv @ meat @ xtx_inv)
    se = np.sqrt(np.diag(v_cluster))

    df_resid = g - 1
    t_x = beta[1] / se[1] if se[1] > 0 else np.nan
    t_z = beta[2] / se[2] if se[2] > 0 else np.nan
    p_x = float(2 * (1 - stats.t.cdf(abs(t_x), df_resid))) if df_resid > 0 else None
    p_z = float(2 * (1 - stats.t.cdf(abs(t_z), df_resid))) if df_resid > 0 else None

    return {
        "label": label,
        "n": n,
        "n_clusters": n_clusters,
        "coef_x": float(beta[1]),
        "se_x": float(se[1]),
        "p_x": p_x,
        "coef_z": float(beta[2]),
        "se_z": float(se[2]),
        "p_z": p_z,
        "sig_x": (p_x is not None and p_x < 0.05),
        "stat_type": "beta (clustered SE)",
    }


# ---------------------------------------------------------------------------
# Hypothesis tests
# ---------------------------------------------------------------------------


def test_h3_hamburg(df_ll: pd.DataFrame) -> list[dict]:
    """H3a/H3b (cross-lagged, directional) and H3c (contemporaneous), Hamburg annual panel.

    Same design as e1_regressions.test_h3 (analysis/directional_inference.py): ordered,
    non-overlapping windows around each pivot year; each direction controls for the
    outcome's own prior change and the D4 baseline LEVEL (ewr_composite_t, §4.3). CIs
    are a cluster bootstrap over Stadtteile (#129 / H1-geo-signoff.md Condition 2 --
    every Gebiet in a Stadtteil inherits the same D4 value, so the Stadtteil is the
    effective independent unit). Replaces the pre-2026-10-26 symmetric Spearman pair,
    which returned identical numbers for H3a and H3b.
    """
    results = []
    for k in sorted(int(x) for x in df_ll["lag_k"].unique()):
        real_years = LAG_K_REAL_YEARS.get(k, k)
        cl = build_cross_lagged(
            df_ll, k=k, control_col="ewr_composite_t", cluster_col="stadtteil_code"
        )
        if cl.empty:
            print(f"  NOTE: no consecutive k={k} windows for cross-lagged H3a/H3b -- skipped")
        else:
            tests = cross_lagged_tests(cl)
            for hyp in ("H3a", "H3b"):
                res = tests[hyp]
                results.append(
                    {
                        "hyp": hyp,
                        "test": f"Cross-lagged k={k} ({real_years}yr)",
                        "desc": (
                            f"{HAMBURG_HYPOTHESES[hyp]['desc']} [cross-lagged, k={k}, "
                            f"{real_years} real year(s) per window; "
                            + ("D4 control" if res.get("d4_control") else "no D4 control")
                            + "]"
                        ),
                        "citation": HAMBURG_HYPOTHESES[hyp]["citation"],
                        "stat_val": res["rho"],
                        "stat_type": "partial rho",
                        "n": res["n"],
                        "n_clusters": res["n_clusters"],
                        "p": res["p"],
                        "ci_low": res["ci_low"],
                        "ci_high": res["ci_high"],
                        "expected_dir": HAMBURG_HYPOTHESES[hyp]["expected_dir"],
                        "actual_dir": _dir(res["rho"]),
                        "dir_match": _dir_match(
                            res["rho"], HAMBURG_HYPOTHESES[hyp]["expected_dir"]
                        ),
                    }
                )

        sub = df_ll[df_ll["lag_k"] == k]
        if len(sub) < 10:
            continue
        dyn_t = sub["dynamism_score_t"].values.astype(float)
        stat_t = sub["status_index_t"].values.astype(float)
        # H3c: simultaneous co-movement (same edition, run alongside for parity)
        r3c = run_spearman(dyn_t, stat_t, f"Spearman(dyn_score_t, status_t, k={k})")
        results.append(
            {
                "hyp": "H3c",
                "test": f"Spearman k={k} ({real_years}yr)",
                "desc": f"{HAMBURG_HYPOTHESES['H3c']['desc']} [k={k}, {real_years} real year(s)]",
                "citation": HAMBURG_HYPOTHESES["H3c"]["citation"],
                "stat_val": r3c["rho"],
                "stat_type": "rho",
                "n": r3c["n"],
                "p": r3c["p"],
                "sig": r3c["sig"],
                "expected_dir": HAMBURG_HYPOTHESES["H3c"]["expected_dir"],
                "actual_dir": _dir(r3c["rho"]),
                "dir_match": _dir_match(r3c["rho"], HAMBURG_HYPOTHESES["H3c"]["expected_dir"]),
            }
        )

    return results


def test_h3_d4_clustered(df_ll: pd.DataFrame) -> list[dict]:
    """D4-controlled same-window CO-MOVEMENT between status change and POI change,
    with standard errors clustered at Stadtteil grain (#129 binding requirement).

    NOT a direction test (2026-10-26): both specs below regress the SAME two changes
    over the SAME [t, t+k] window, once in each orientation. Swapping the dependent
    variable rescales the coefficient but adds no evidence about which change came
    first. Direction is tested in test_h3_hamburg (cross-lagged). Rows here are
    labelled 'H3 co-movement', never H3a/H3b.

    This is the ONE specification in this script where ewr_composite_t enters as a
    covariate (index-definition.md §4.3 D4-baseline-LEVEL discipline: ewr_composite_t
    is used here exactly as a cross-sectional LEVEL at time t, never a delta) --
    controlling for baseline socio-economic vulnerability alongside the primary
    change-predictor, mirroring how e4_early_warning.py's classifier also includes
    ewr_composite_t as one covariate among several. Per #129 / H1-geo-signoff.md
    Condition 2, clustering on stadtteil_code is mandatory here and is what
    `run_ols_clustered` provides.

    H3a spec: delta_status_ordinal ~ intercept + delta_dynamism_t + ewr_composite_t
    H3b spec: delta_dynamism_t     ~ intercept + delta_status_ordinal + ewr_composite_t
    """
    results = []
    for k in sorted(df_ll["lag_k"].unique()):
        sub = df_ll[df_ll["lag_k"] == k].copy()
        if len(sub) < 10:
            continue
        real_years = LAG_K_REAL_YEARS.get(int(k), k)

        delta_status = sub["delta_status_ordinal"].values.astype(float)
        delta_dyn_t = sub["delta_dynamism_t"].values.astype(float)
        ewr_t = sub["ewr_composite_t"].values.astype(float)
        clusters = sub["stadtteil_code"].values

        # H3a (D4-controlled, clustered): delta_dyn_t + ewr_t -> delta_status
        r3a = run_ols_clustered(
            delta_dyn_t,
            ewr_t,
            delta_status,
            clusters,
            f"OLS-clustered(delta_dyn_t, ewr_composite_t -> delta_status, k={k})",
        )
        results.append(
            {
                "hyp": "H3 co-movement (status on POI)",
                "test": f"OLS-clustered k={k} ({real_years}yr)",
                "desc": (
                    f"{HAMBURG_HYPOTHESES['H3a']['desc']} [k={k}, {real_years} real "
                    "year(s)], controlling for baseline ewr_composite_t (D4 LEVEL), "
                    "SEs clustered at Stadtteil grain (#129)"
                ),
                "citation": HAMBURG_HYPOTHESES["H3a"]["citation"]
                + " D4-covariate specification per #129 / H1-geo-signoff.md Condition 2.",
                "stat_val": r3a["coef_x"],
                "stat_type": r3a["stat_type"],
                "n": r3a["n"],
                "n_clusters": r3a["n_clusters"],
                "p": r3a["p_x"],
                "sig": r3a["sig_x"],
                "coef_z_ewr": r3a["coef_z"],
                "p_z_ewr": r3a["p_z"],
                "expected_dir": HAMBURG_HYPOTHESES["H3a"]["expected_dir"],
                "actual_dir": _dir(r3a["coef_x"]),
                "dir_match": _dir_match(r3a["coef_x"], HAMBURG_HYPOTHESES["H3a"]["expected_dir"]),
            }
        )

        # H3b (D4-controlled, clustered): delta_status + ewr_t -> delta_dyn_tk
        r3b = run_ols_clustered(
            delta_status,
            ewr_t,
            delta_dyn_t,
            clusters,
            f"OLS-clustered(delta_status, ewr_composite_t -> delta_dyn_t, k={k})",
        )
        results.append(
            {
                "hyp": "H3 co-movement (POI on status)",
                "test": f"OLS-clustered k={k} ({real_years}yr)",
                "desc": (
                    f"{HAMBURG_HYPOTHESES['H3b']['desc']} [k={k}, {real_years} real "
                    "year(s)], controlling for baseline ewr_composite_t (D4 LEVEL), "
                    "SEs clustered at Stadtteil grain (#129)"
                ),
                "citation": HAMBURG_HYPOTHESES["H3b"]["citation"]
                + " D4-covariate specification per #129 / H1-geo-signoff.md Condition 2.",
                "stat_val": r3b["coef_x"],
                "stat_type": r3b["stat_type"],
                "n": r3b["n"],
                "n_clusters": r3b["n_clusters"],
                "p": r3b["p_x"],
                "sig": r3b["sig_x"],
                "coef_z_ewr": r3b["coef_z"],
                "p_z_ewr": r3b["p_z"],
                "expected_dir": HAMBURG_HYPOTHESES["H3b"]["expected_dir"],
                "actual_dir": _dir(r3b["coef_x"]),
                "dir_match": _dir_match(r3b["coef_x"], HAMBURG_HYPOTHESES["H3b"]["expected_dir"]),
            }
        )

    return results


# ---------------------------------------------------------------------------
# #330 self-correction record (durability fix -- D330-C1, geo-signoff E-C1,
# domain-signoff D330-C1/C2/C3/C4/C5:
# docs/epic-h/330-hh-e5-regen-geo-signoff.md,
# docs/epic-h/330-hh-e5-regen-domain-signoff.md)
# ---------------------------------------------------------------------------
#
# This block is a STATIC historical audit record, not a live computation: it
# documents a specific one-time methodology correction (#329 removed
# `unemployment_share` -- a direct constituent of Hamburg's own D1 Statusindex
# outcome -- from the Hamburg D4 composite) and preserves the stale,
# contaminated pre-#329 Section 2 numbers (generated 2026-07-10) for audit
# purposes. It is embedded directly in this generator -- rather than left as
# a hand-edit on the generated markdown file -- because `write_findings`
# below rewrites docs/epic-h/E5-hamburg-lead-lag-findings.md wholesale
# (`open(OUTPUT_MD, "w", encoding="utf-8")`) on every `uv run poe analysis` run: a note living
# only in the generated file would be silently erased by the next
# regeneration, which is exactly the failure both #330 sign-offs flagged
# (domain-signoff §2 "one command away from deletion"; geo-signoff E-C1). Do
# not delete this block; if the underlying #329/#330 correction is ever
# superseded by a further methodology change, update this text (and re-run
# the dual methodology gate per CLAUDE.md) rather than removing the audit
# trail.
CORRECTION_330_NOTE_MD = """## Correction (#330): pre-#330 Section 2 numbers were computed under a contaminated D4 composite

**This note must not be deleted or silently overwritten by a future regeneration** -- it records a
methodology self-correction that is itself part of the O2 whitepaper narrative (per #329
domain-expert sign-off condition D-C2, `docs/epic-h/329-hh-d4-conflation-domain-signoff.md`).

Prior to #329 (merged into `develop` @ 4cee9dce), Hamburg's D4 predictor composite
(`int_ewr_socioeco_hamburg.ewr_composite`) was built from **three** indicators, one of which
(`unemployment_share`) is also a direct constituent of Hamburg's own D1 outcome (the Sozialmonitoring
Statusindex used as `status_index_t`/`status_index_tk` throughout this document). Because the
covariate (`ewr_composite_t`) and the dependent variable it was being used to control for both
partly reflected the same underlying unemployment measure, the **entire stale Section 2 row** first
reported here (dated 2026-07-10) was **partly self-predicting** -- not only the `ewr_composite_t`
coefficient/p-value itself, but also the primary change-predictor coefficients (`delta_dynamism_t`
for H3a, `delta_status_ordinal` for H3b), since partialling out an endogenous control biases every
coefficient in the same OLS specification. This was therefore not an independent D4-controlled test
of H3a/H3b, but one contaminated by shared construction with D1. #329 removed `unemployment_share`
from the Hamburg composite (now a 2-indicator composite); this document was regenerated against that
corrected composite per #330 on 2026-07-31 (Section 1 and Section 2 tables above are the
corrected/current numbers).

The **stale, contaminated** pre-#329 Section 2 results (3-indicator composite, generated 2026-07-10)
are kept below for transparency and audit trail, not because they are usable for any citation or
inference -- do not cite these numbers as an independent D4-controlled result.

<details>
<summary>Superseded/contaminated: pre-#329 Section 2 results (3-indicator composite incl. unemployment_share -- DO NOT CITE)</summary>

| Hyp | Test | N | N clusters | Value | p-value | Sig | Expected Dir | Actual Dir | Match | ewr_composite_t coef (p) |
|---|---|---|---|---|---|---|---|---|---|---|
| H3a (D4-controlled, Stadtteil-clustered) | OLS-clustered k=1 (1yr) | 9118 | 95 | -0.0058 | 0.0964 | No | negative | negative | PASS | -2.75e-04 (p=0.9370) |
| H3b (D4-controlled, Stadtteil-clustered) | OLS-clustered k=1 (1yr) | 9118 | 95 | -0.1165 | 0.1388 | No | negative | negative | PASS | -0.0023 (p=0.8007) |
| H3a (D4-controlled, Stadtteil-clustered) | OLS-clustered k=2 (2yr) | 8277 | 95 | -0.0018 | 0.6125 | No | negative | negative | PASS | -0.0081 (p=0.2089) |
| H3b (D4-controlled, Stadtteil-clustered) | OLS-clustered k=2 (2yr) | 8277 | 95 | -0.0257 | 0.6109 | No | negative | negative | PASS | -0.0130 (p=0.1817) |
| H3a (D4-controlled, Stadtteil-clustered) | OLS-clustered k=3 (3yr) | 7436 | 95 | -0.0057 | 0.1642 | No | negative | negative | PASS | -0.0168 (p=0.0573) |
| H3b (D4-controlled, Stadtteil-clustered) | OLS-clustered k=3 (3yr) | 7436 | 95 | -0.0721 | 0.2158 | No | negative | negative | PASS | -0.0056 (p=0.4800) |

Stale directional agreement (D4-controlled, clustered): 6/6. Stale significant: 0/6.
Stale overall scorecard (bivariate + D4-controlled, pre-#329 composite): 12/15 directional agreement,
5/15 significant.

**Note on the 5/15 -> 3/15 significance drop (#330 regeneration; D330-C2 correction):** this drop is
**not caused by #329**. Section 2 -- the only part of this document that reads `ewr_composite_t` --
is 0/6 significant in **both** the stale (pre-#329) and corrected (post-#329) runs, so the composite
fix changed none of Section 2's significance calls. The entire 5/15 -> 3/15 drop comes from
**Section 1** (`run_spearman`, which never reads `ewr_composite_t` and therefore structurally cannot
be affected by #329): H3a/H3b at k=1 lost their only nominally-significant bivariate result,
flipping from Sig=Yes (p=0.0384, N=9285) in the stale run to Sig=No (p=0.0514, N=9293) in this
regeneration -- alongside a shift in rho (-0.0215 -> -0.0202). Because #329 touched only Hamburg's
D4-composite SQL and Section 1 has no D4 dependency, this Section 1 shift must originate elsewhere in
`develop` between the stale run's generation date (2026-07-10) and this regeneration (2026-07-31) --
most plausibly **#313** (Hamburg merged-Stadtteil crosswalk fix, commit `3ed12751`) and/or **#307**.
**Consequence: this regeneration is a combined-run comparison** (D4-composite fix #329 + crosswalk
fix #313 + possibly other intervening `develop` commits), **not a clean #329-only counterfactual** --
the corrected 3/15 overall-significant count reflects all of that combined change, not #329 in
isolation. See the forward note in Limitations below for how to isolate a clean #329-only effect if
one is ever needed for citation.

</details>

**What changed and what didn't:** directional agreement is identical (6/6 PASS in both the stale and
corrected Section 2 runs) and significance is identical (0/6 significant in both) -- but this should
**not** be read as "nothing changed": the whole stale Section 2 row is unusable, not only its
`ewr_composite_t` column (see the broadened contamination note above). Point estimates and p-values
on the **primary** change-predictor coefficients moved substantially, not modestly -- e.g. H3b k=1's
primary coefficient moved -0.1165 -> -0.0477 (a 59% reduction in magnitude) and H3a k=1's p-value
moved 0.0964 -> 0.3081 -- alongside the smaller `ewr_composite_t` shift (e.g. H3a k=1: -2.75e-04
(p=0.9370) -> 0.0017 (p=0.6544), even flipping sign). None of these shifts happened to flip a
directional-match or significance call at p<0.05 in this dataset, so the substantive conclusion (no
significant D4-controlled directional effect for either H3a or H3b at any lag_k) is unchanged --
but that stability is a property of this dataset, not evidence the pre-#329 specification was valid.
The correction was necessary because an endogenous control (one that shares construction with the D1
outcome it is meant to partial out) is not a methodologically valid test of H3a/H3b regardless of
whether its point estimates happen to resemble the corrected ones; identical qualitative conclusions
from an invalid and a valid specification here is a property of this dataset, not a retrospective
justification for having used the invalid specification. See Limitations/Epic B framing below.
"""


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------


def attach_verdicts(results: list[dict]) -> list[dict]:
    """Significance-aware verdict per row (2026-10-26) -- see e1_regressions.attach_verdicts."""
    for r in results:
        r["verdict"] = verdict(
            r.get("stat_val"),
            r["expected_dir"],
            p=r.get("p"),
            ci_low=r.get("ci_low"),
            ci_high=r.get("ci_high"),
        )
        r["sig"] = r["verdict"] in ("SUPPORTED", "CONTRADICTED")
    return results


def _value_str(r: dict) -> str:
    val = _fmt_val(r["stat_val"])
    if r.get("ci_low") is not None and r.get("ci_high") is not None:
        val += f" [{r['ci_low']:.3f}, {r['ci_high']:.3f}]"
    return val


def _direction_lines(results: list[dict]) -> list[str]:
    lines = []
    for a in (r for r in results if r["hyp"] == "H3a"):
        b = next((r for r in results if r["hyp"] == "H3b" and r["test"] == a["test"]), None)
        if b is not None:
            lines.append(
                f"- **{a['test']}:** {direction_conclusion(a['verdict'], b['verdict'])} "
                f"(H3a {a['verdict']}, H3b {b['verdict']})"
            )
    return lines


def print_results(results: list[dict]) -> None:
    attach_verdicts(results)
    print("\n" + "=" * 100)
    print("E5 HAMBURG LEAD-LAG RESULTS -- independent H3a/H3b/H3c re-test (#160)")
    print("=" * 100)
    print(
        f"{'Hyp':<34} {'Test':<24} {'N':<6} {'Value [95% CI]':<26} {'p-val':<10} "
        f"{'ExpDir':<9} {'Verdict':<16}"
    )
    print("-" * 100)
    for r in results:
        p_str = f"{r['p']:.4f}" if r.get("p") is not None else "N/A"
        print(
            f"{r['hyp']:<34} {r['test']:<24} {r['n']:<6} {_value_str(r):<26} "
            f"{p_str:<10} {r['expected_dir']:<9} {r['verdict']:<16}"
        )
    print(f"\nVerdicts: {summarise([r['verdict'] for r in results])}")
    for line in _direction_lines(results):
        print(line)


def _write_results_table(f, results: list[dict], with_clusters: bool = False) -> None:
    attach_verdicts(results)
    f.write(
        "| Hyp | Test | N | N clusters | Value [95% CI] | p-value | Expected dir | Verdict |"
        + (" ewr_composite_t coef (p) |" if with_clusters else "")
        + "\n"
    )
    f.write("|---|---|---|---|---|---|---|---|" + ("---|" if with_clusters else "") + "\n")
    for r in results:
        p_str = f"{r['p']:.4f}" if r.get("p") is not None else "N/A"
        row = (
            f"| {r['hyp']} | {r['test']} | {r['n']} | {r.get('n_clusters', 'N/A')} | "
            f"{_value_str(r)} | {p_str} | {r['expected_dir']} | {r['verdict']} |"
        )
        if with_clusters:
            z = (
                f"{_fmt_val(r.get('coef_z_ewr'))} (p={_fmt_val(r.get('p_z_ewr'))})"
                if r.get("coef_z_ewr") is not None
                else "N/A"
            )
            row += f" {z} |"
        f.write(row + "\n")


def write_findings(
    df_ll: pd.DataFrame,
    results_bivariate: list[dict],
    results_d4_clustered: list[dict],
) -> None:
    import datetime

    today = datetime.date.today().isoformat()

    attach_verdicts(results_bivariate)
    attach_verdicts(results_d4_clustered)
    n_clusters_seen = ", ".join(
        str(v)
        for v in sorted({r.get("n_clusters") for r in results_d4_clustered if r.get("n_clusters")})
    )

    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_MD, "w", encoding="utf-8") as f:
        f.write(
            "# E5 Hamburg Lead-Lag Findings -- Independent H3a/H3b/H3c Re-Test (H-C3, #160)\n\n"
        )
        f.write(
            "- **Task:** H-C3 (#160) -- annual-cadence Hamburg lead-lag model + independent H3a/H3b re-test\n"
        )
        f.write(
            "- **Issue:** #160 (H-C3); #129 (Stadtteil SE-clustering binding requirement) "
            "**(Follow-up now tracked: #265 (H-reg-SE) — see "
            "`docs/planning/deferred-work-audit-2026-07.md`.)**\n"
        )
        f.write(f"- **Date:** {today}\n")
        f.write(f"- **Data:** int_hamburg_lead_lag (H-C3 #160), n={len(df_ll)} rows\n")
        f.write(
            "- **Method:** cross-lagged partial Spearman with a Stadtteil cluster-bootstrap "
            "95% CI for H3a/H3b (shared with e1, `analysis/directional_inference.py`); "
            "Spearman for H3c; OLS with Stadtteil-clustered SEs for D4-controlled "
            "co-movement (#129). A result needs significance to count -- see Scoring.\n\n"
        )

        f.write("## Do NOT assume Berlin's finding\n\n")
        f.write(
            "This is an **independent re-test**, not a confirmation exercise. The Berlin thesis "
            "(Tabelle 6-16, PDF p. 91) found H3b (status change leads POI change) TENTATIVELY "
            "supported ('eher bestaetigt') and H3a (POI change leads status change) REJECTED. This script does not assume, expect, or force that "
            "outcome to replicate on Hamburg -- whatever direction/significance is observed below "
            "is reported as-is (#160 explicit scope note; #80 precedent for honest null/negative "
            "findings).\n\n"
        )

        f.write("## Cadence caveat (binding)\n\n")
        f.write(
            "Hamburg's Sozialmonitoring is ANNUAL (ADR-0014); `int_hamburg_lead_lag` uses "
            "`edition_tk = edition_t + lag_k * 1` (1/2/3 real years), NOT Berlin's "
            "`edition_tk = edition_t + lag_k * 2` (2/4/6 real years). Every `lag_k` value below is "
            'labelled with its real-year equivalent -- **do not read "Hamburg lag_k=2" as the '
            'same real-time horizon as "Berlin lag_k=2"**; they are not.\n\n'
        )

        f.write("## Hypothesis citations\n\n")
        for key, hyp in HAMBURG_HYPOTHESES.items():
            f.write(f"- **{key}**: {hyp['citation']}\n")
        f.write("\n")

        f.write("## Scoring\n\n")
        f.write(
            "SUPPORTED = significant in the expected direction; CONTRADICTED = significant, "
            "opposite direction; NOT SIGNIFICANT = the data cannot tell; NO DATA = untestable. "
            "Significance = the 95% cluster-bootstrap CI excludes 0 (cross-lagged rows), else "
            "p < 0.05. Before 2026-10-26 a row 'passed' whenever its sign matched -- six "
            "non-significant Section 2 coefficients scored 6/6.\n\n"
        )
        f.write("## Section 1: Cross-lagged H3a/H3b (directional) + H3c\n\n")
        f.write(
            "> H3a/H3b: ordered, non-overlapping windows around each pivot year; each direction "
            "controls for the outcome's own prior change and the D4 baseline LEVEL. CIs: "
            "cluster bootstrap over Stadtteile (#129). This replaces the pre-2026-10-26 "
            "symmetric Spearman pair, which returned identical numbers for H3a and H3b.\n\n"
        )
        _write_results_table(f, results_bivariate)
        f.write(f"\n**Verdicts:** {summarise([r['verdict'] for r in results_bivariate])}\n\n")
        direction = _direction_lines(results_bivariate)
        if direction:
            f.write("**Direction:**\n\n" + "\n".join(direction) + "\n\n")

        f.write(
            "## Section 2: D4-controlled co-movement, Stadtteil-clustered OLS (#129) -- NOT directional\n\n"
        )
        f.write(
            "> ewr_composite_t (D4 baseline LEVEL, index-definition.md §4.3) enters as a covariate "
            "here -- per #129 / H1-geo-signoff.md Condition 2, standard errors on the primary "
            "change-predictor coefficient are clustered at Stadtteil grain "
            "(`run_ols_clustered`, CR1 sandwich estimator, Cameron, Gelbach & Miller 2011; "
            "Cameron & Miller 2015). Effective D4 sample size is Stadtteil count "
            f"(observed: {n_clusters_seen} distinct clusters per lag_k below; "
            "~104-105 Stadtteile expected per ADR-0014), not Gebiet (row) count. **Both specs "
            "regress the same same-window pair, once in each orientation -- a co-movement "
            "measure, not a direction test** (it was mislabelled as directional before "
            "2026-10-26).\n\n"
        )
        _write_results_table(f, results_d4_clustered, with_clusters=True)
        f.write(f"\n**Verdicts:** {summarise([r['verdict'] for r in results_d4_clustered])}\n\n")

        # #330 durability fix (D330-C1 / E-C1): emit the self-correction record from
        # the generator itself so it survives every `uv run poe analysis` re-run --
        # see CORRECTION_330_NOTE_MD's own header comment for the full rationale.
        f.write(CORRECTION_330_NOTE_MD)
        f.write("\n")

        f.write("## Overall scorecard\n\n")
        directional = [r for r in results_bivariate if r["hyp"] in ("H3a", "H3b")]
        f.write(
            f"- **Directional (cross-lagged H3a/H3b):** "
            f"{summarise([r['verdict'] for r in directional])}\n"
            f"- **Contemporaneous (H3c):** "
            f"{summarise([r['verdict'] for r in results_bivariate if r['hyp'] == 'H3c'])}\n"
            f"- **D4-controlled co-movement (Section 2):** "
            f"{summarise([r['verdict'] for r in results_d4_clustered])}\n\n"
        )
        f.write(
            "Only the cross-lagged rows speak to H3a vs H3b; the other two kinds measure "
            "association, not order. Do not add them into one directional count.\n\n"
        )

        f.write("## Comparison to Berlin (int_mss_lead_lag / e1_regressions.py test_h3)\n\n")
        f.write(
            "Berlin thesis (Tabelle 6-16, PDF p. 91): H3b (status-leads-POI) TENTATIVELY "
            "supported, H3a (POI-leads-status) REJECTED. Berlin's own cross-lagged re-test is in "
            "docs/epic-e/E1-regression-findings.md. See Section 1 above for whether Hamburg's "
            "cross-lagged H3a/H3b directions and significance match or diverge "
            "from this -- read alongside the cadence caveat (Hamburg lag_k is a different "
            "real-year window than Berlin's lag_k at the same integer value).\n\n"
        )

        f.write("## Limitations\n\n")
        f.write(
            "- **No multiple-comparison correction** applied across hypotheses/lag_k values, "
            "same convention as e1_regressions.py.\n"
        )
        f.write(
            "- **Cadence non-equivalence**: Hamburg lag_k values are NOT the same real-year "
            "horizon as Berlin's (see cadence caveat above) -- any cross-city lag_k-by-lag_k "
            "comparison must control for this, not read integer lag_k values as equivalent.\n"
        )
        f.write(
            "- **Dynamik-index window mismatch** (ADR-0014 Pillar 2): Hamburg's Sozialmonitoring "
            "Dynamik is a 3-year window vs Berlin's 2-year window -- not used directly as a "
            "regression variable here (only status_index/dynamism_score/delta_dynamism_t are), "
            "but flagged since it is a known non-equivalence in the same source pillar.\n"
        )
        f.write(
            "- **Stadtteil cluster count (95) below ADR-0014's ~104-105 estimate**: a two-stage "
            "gap, fully accounted for (int_ewr_socioeco_hamburg_disagg.sql header). Stage 1 "
            "(104/105 -> 99): 5 Stadtteile have no Sozialmonitoring score at all -- Altenwerder "
            "(02712), Gut Moor (02703), Neuwerk (02121), Steinwerder (02118), Waltershof (02119), "
            "all uninhabited/harbor areas below the >300-resident scoring threshold (documented "
            "in H1-geo-signoff.md). Stage 2 (99 -> 95, newly verified for this iteration): 4 "
            "further Stadtteile DO get a crosswalk match (Gebiete resolve to them) but "
            "`stg_hamburg_ewr_stadtteil` has zero EWR rows for them, so `ewr_composite_t` is NULL "
            "and they drop out of the D4-covariate regression via the n<10/NaN mask in "
            "`run_ols_clustered` -- Kleiner Grasbrook (02117, harbor terminal), Finkenwerder "
            "(02120, Airbus works/airport), Neuland (02702, industrial estate), Moorburg (02711, "
            "industrial/former power plant), confirmed by direct query against "
            "`stg_hamburg_ewr_stadtteil` to be a genuine no-EWR-coverage gap (same "
            ">300-resident-threshold rationale as Stage 1), not a join/name-matching bug. "
            "**Re-verified per #330**: dropping `unemployment_share` from the D4 composite (#329) "
            "removes one column's worth of potential NULLs but does not change which Stadtteile "
            "have zero EWR rows for the two *remaining* indicators, so the observed cluster count "
            "is unchanged at 95 after the #330 regeneration (re-run on 2026-07-31 against the "
            "corrected 2-indicator composite; see the observed cluster count (95) reported in "
            "Section 2 above -- same value as the pre-#330 run, confirmed not coincidental but "
            "structural, since the NULL-driving gap is at the Stadtteil/EWR-coverage level, not "
            "the indicator-count level).\n"
        )
        f.write(
            "- **Epic B framing**: directional/exploratory revival work (CLAUDE.md) -- honest "
            "reporting of whatever direction/significance is observed is the bar, not matching "
            "Berlin's thesis-confirmed result.\n"
        )
        f.write(
            "- **Forward note on isolating a clean #329-only effect (E-C2, geo-signoff "
            "`docs/epic-h/330-hh-e5-regen-geo-signoff.md`, citation-only, no action required now):** "
            "this regeneration's before/after comparison is confounded between #329 (D4-composite "
            "fix) and other `develop` changes landed since the stale run (2026-07-10), most "
            "plausibly #313's Hamburg merged-Stadtteil crosswalk fix and/or #307 -- see the "
            '"Note on the 5/15 -> 3/15 significance drop" above. If a clean #329-only effect is '
            "ever needed for citation, re-run the pre-#329 (3-indicator) composite against the "
            "*current* data snapshot to isolate it, rather than relying on the 2026-07-10 stale "
            "numbers as the pre-#329 baseline.\n"
        )


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main() -> None:
    if not DUCKDB_PATH.exists():
        print(
            f"INFO: DuckDB not found at {DUCKDB_PATH}. "
            "Set GENTRIDUCK_DB or run 'uv run poe build' to populate the database."
        )
        print("Exiting cleanly (data-presence guard -- not a crash).")
        sys.exit(0)

    con = duckdb.connect(str(DUCKDB_PATH), read_only=True)

    tables = {
        row[0]
        for row in con.execute(
            "SELECT table_name FROM information_schema.tables WHERE table_schema='main'"
        ).fetchall()
    }
    if "int_hamburg_lead_lag" not in tables:
        print("INFO: int_hamburg_lead_lag not found. Run 'uv run poe build' first.")
        con.close()
        sys.exit(0)

    print("Loading Hamburg annual-cadence lead-lag panel (int_hamburg_lead_lag, #160)...")
    df_ll = load_hamburg_lead_lag(con)
    con.close()
    print(f"  Loaded {len(df_ll)} rows across lag_k values {sorted(df_ll['lag_k'].unique())}")

    if len(df_ll) < 10:
        print("INFO: Too few rows for H3a/H3b/H3c tests. Check Hamburg data ingestion.")
        sys.exit(0)

    print("\nRunning H3a/H3b/H3c bivariate Spearman tests (mirrors e1_regressions.py test_h3)...")
    results_bivariate = test_h3_hamburg(df_ll)

    print("Running H3a/H3b D4-controlled OLS with Stadtteil-clustered SEs (#129 binding)...")
    results_d4_clustered = test_h3_d4_clustered(df_ll)
    for r in results_d4_clustered:
        print(f"  {r['hyp']} {r['test']}: n={r['n']}, n_clusters={r.get('n_clusters')}")

    print_results(results_bivariate)  # prints verdicts + direction itself

    print_results(results_d4_clustered)

    write_findings(df_ll, results_bivariate, results_d4_clustered)
    print(f"\nFindings written to: {OUTPUT_MD}")


if __name__ == "__main__":
    main()
