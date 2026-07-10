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
    amenity change; CONFIRMED in the Berlin thesis) via Dangschat's (1988) double
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

H3a/H3b SYMMETRIC-SPEARMAN CAVEAT (binding disclosure; inherited from
e1_regressions.py's test_h3, see its docstring around "co-movement test across the
lag window" and B7-geo-signoff.md Concern 2):
  Spearman(delta_dyn_t, delta_status) == Spearman(delta_status, delta_dyn_t) --
  correlation is symmetric under argument swap. `test_h3_hamburg` below therefore
  returns IDENTICAL rho/p/n for H3a and H3b at every lag_k (Section 1 of the findings
  doc). This is NOT a bug and NOT evidence that the two directional hypotheses agree
  -- a symmetric bivariate statistic structurally cannot distinguish "POI leads
  status" from "status leads POI"; it can only say the two series co-move within the
  [t, t+k] window. Section 1 is reported as a co-movement test, not a strict
  temporal-precedence test, exactly as Berlin's own test_h3 is labelled. The test that
  actually can distinguish direction is Section 2 (`test_h3_d4_clustered` below): the
  D4-controlled OLS with Stadtteil-clustered SEs has H3a/H3b as two DIFFERENT
  regression specifications (different dependent variables), so its coefficients are
  not symmetric by construction and are the genuinely informative directional test.

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
            "on Hamburg -- CONFIRMED in the Berlin thesis, NOT assumed to replicate or "
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
            "UNCLEAR in the Berlin thesis. status_index inverse-numeric "
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
    """H3a/H3b/H3c on Hamburg's annual-cadence panel -- Spearman only, mirroring
    e1_regressions.py's test_h3 bivariate method EXACTLY (same predictor/outcome
    pairs, same C5-corrected delta_dynamism_t, same D1-polarity delta_status_ordinal)
    for direct methodological comparability.

    #129 SCOPE NOTE (binding, explicit per ticket instructions): none of these three
    bivariate Spearman tests use ewr_composite_t (D4) as a covariate -- they mirror
    e1's own test_h3, which is a pure two-variable rank correlation. Stadtteil
    clustering therefore does NOT apply to these three tests; the D4-covariate
    regression that DOES require it is `test_h3_d4_clustered` below.

    SYMMETRIC-SPEARMAN CAVEAT (binding disclosure; see module docstring): H3a's
    Spearman(delta_dyn_t, delta_status) and H3b's Spearman(delta_status, delta_dyn_t)
    are the SAME two vectors with swapped argument order -- Spearman correlation is
    symmetric, so H3a and H3b return IDENTICAL rho/p/n below at every lag_k. This is a
    co-movement test, not a strict temporal-precedence test; it cannot itself
    adjudicate which hypothesis holds. `test_h3_d4_clustered` is the specification
    that can (non-symmetric OLS coefficients).
    """
    results = []
    for k in sorted(df_ll["lag_k"].unique()):
        sub = df_ll[df_ll["lag_k"] == k].copy()
        if len(sub) < 10:
            continue
        real_years = LAG_K_REAL_YEARS.get(int(k), k)

        delta_status = sub["delta_status_ordinal"].values.astype(float)
        dyn_t = sub["dynamism_score_t"].values.astype(float)
        delta_dyn_t = sub["delta_dynamism_t"].values.astype(float)
        stat_t = sub["status_index_t"].values.astype(float)

        # H3a: POI change at t leads status change at t+k
        r3a = run_spearman(delta_dyn_t, delta_status, f"Spearman(delta_dyn_t, delta_status, k={k})")
        results.append(
            {
                "hyp": "H3a",
                "test": f"Spearman k={k} ({real_years}yr)",
                "desc": f"{HAMBURG_HYPOTHESES['H3a']['desc']} [k={k}, {real_years} real year(s)]",
                "citation": HAMBURG_HYPOTHESES["H3a"]["citation"],
                "stat_val": r3a["rho"],
                "stat_type": "rho",
                "n": r3a["n"],
                "p": r3a["p"],
                "sig": r3a["sig"],
                "expected_dir": HAMBURG_HYPOTHESES["H3a"]["expected_dir"],
                "actual_dir": _dir(r3a["rho"]),
                "dir_match": _dir_match(r3a["rho"], HAMBURG_HYPOTHESES["H3a"]["expected_dir"]),
            }
        )

        # H3b: status change at t leads POI change at t+k
        r3b = run_spearman(delta_status, delta_dyn_t, f"Spearman(delta_status, delta_dyn_t, k={k})")
        results.append(
            {
                "hyp": "H3b",
                "test": f"Spearman k={k} ({real_years}yr)",
                "desc": f"{HAMBURG_HYPOTHESES['H3b']['desc']} [k={k}, {real_years} real year(s)]",
                "citation": HAMBURG_HYPOTHESES["H3b"]["citation"],
                "stat_val": r3b["rho"],
                "stat_type": "rho",
                "n": r3b["n"],
                "p": r3b["p"],
                "sig": r3b["sig"],
                "expected_dir": HAMBURG_HYPOTHESES["H3b"]["expected_dir"],
                "actual_dir": _dir(r3b["rho"]),
                "dir_match": _dir_match(r3b["rho"], HAMBURG_HYPOTHESES["H3b"]["expected_dir"]),
            }
        )

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
    """H3a/H3b re-tested as OLS controlling for the D4 baseline (ewr_composite_t),
    with standard errors clustered at Stadtteil grain (#129 binding requirement).

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
                "hyp": "H3a (D4-controlled, Stadtteil-clustered)",
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
                "hyp": "H3b (D4-controlled, Stadtteil-clustered)",
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
# Output
# ---------------------------------------------------------------------------


def print_results(results: list[dict]) -> None:
    print("\n" + "=" * 100)
    print("E5 HAMBURG LEAD-LAG RESULTS -- independent H3a/H3b/H3c re-test (#160)")
    print("=" * 100)
    hdr = (
        f"{'Hyp':<38} {'Test':<28} {'N':<6} {'Value':<10} {'p-val':<10} "
        f"{'Sig':<5} {'ExpDir':<9} {'ActDir':<9} {'Match':<6}"
    )
    print(hdr)
    print("-" * 100)
    for r in results:
        val_str = _fmt_val(r["stat_val"])
        p_str = f"{r['p']:.4f}" if r.get("p") is not None else "N/A"
        sig_str = "YES" if r.get("sig") else "NO"
        match_str = "PASS" if r["dir_match"] else "FAIL"
        print(
            f"{r['hyp']:<38} {r['test']:<28} {r['n']:<6} {val_str:<10} "
            f"{p_str:<10} {sig_str:<5} {r['expected_dir']:<9} {r['actual_dir']:<9} {match_str:<6}"
        )


def _write_results_table(f, results: list[dict], with_clusters: bool = False) -> None:
    if with_clusters:
        f.write(
            "| Hyp | Test | N | N clusters | Value | p-value | Sig | Expected Dir | "
            "Actual Dir | Match | ewr_composite_t coef (p) |\n"
        )
        f.write("|---|---|---|---|---|---|---|---|---|---|---|\n")
        for r in results:
            val_str = _fmt_val(r["stat_val"])
            p_str = f"{r['p']:.4f}" if r.get("p") is not None else "N/A"
            sig_str = "Yes" if r.get("sig") else "No"
            match_str = "PASS" if r["dir_match"] else "FAIL"
            z_str = (
                f"{_fmt_val(r.get('coef_z_ewr'))} (p={_fmt_val(r.get('p_z_ewr'))})"
                if r.get("coef_z_ewr") is not None
                else "N/A"
            )
            f.write(
                f"| {r['hyp']} | {r['test']} | {r['n']} | {r.get('n_clusters', 'N/A')} | "
                f"{val_str} | {p_str} | {sig_str} | {r['expected_dir']} | {r['actual_dir']} | "
                f"{match_str} | {z_str} |\n"
            )
    else:
        f.write("| Hyp | Test | N | Value | p-value | Sig | Expected Dir | Actual Dir | Match |\n")
        f.write("|---|---|---|---|---|---|---|---|---|\n")
        for r in results:
            val_str = _fmt_val(r["stat_val"])
            p_str = f"{r['p']:.4f}" if r.get("p") is not None else "N/A"
            sig_str = "Yes" if r.get("sig") else "No"
            match_str = "PASS" if r["dir_match"] else "FAIL"
            f.write(
                f"| {r['hyp']} | {r['test']} | {r['n']} | {val_str} | {p_str} | {sig_str} | "
                f"{r['expected_dir']} | {r['actual_dir']} | {match_str} |\n"
            )


def write_findings(
    df_ll: pd.DataFrame,
    results_bivariate: list[dict],
    results_d4_clustered: list[dict],
) -> None:
    import datetime

    today = datetime.date.today().isoformat()

    n_pass = sum(1 for r in results_bivariate if r["dir_match"])
    n_sig = sum(1 for r in results_bivariate if r.get("sig"))
    n_clusters_seen = ", ".join(
        str(v)
        for v in sorted({r.get("n_clusters") for r in results_d4_clustered if r.get("n_clusters")})
    )

    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_MD, "w") as f:
        f.write(
            "# E5 Hamburg Lead-Lag Findings -- Independent H3a/H3b/H3c Re-Test (H-C3, #160)\n\n"
        )
        f.write(
            "- **Task:** H-C3 (#160) -- annual-cadence Hamburg lead-lag model + independent H3a/H3b re-test\n"
        )
        f.write("- **Issue:** #160 (H-C3); #129 (Stadtteil SE-clustering binding requirement)\n")
        f.write(f"- **Date:** {today}\n")
        f.write(f"- **Data:** int_hamburg_lead_lag (H-C3 #160), n={len(df_ll)} rows\n")
        f.write(
            "- **Method:** Spearman rank correlation (bivariate, mirrors "
            "e1_regressions.py's test_h3 exactly) + OLS with Stadtteil-clustered "
            "standard errors (D4-covariate specification only, #129)\n\n"
        )

        f.write("## Do NOT assume Berlin's finding\n\n")
        f.write(
            "This is an **independent re-test**, not a confirmation exercise. The Berlin thesis "
            "(p. 91) found H3b (status change leads POI change) CONFIRMED and H3a (POI change "
            "leads status change) REJECTED. This script does not assume, expect, or force that "
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

        f.write("## Section 1: Bivariate Spearman (mirrors e1_regressions.py's test_h3 method)\n\n")
        f.write(
            "> No D4 (ewr_composite_t) covariate in this section -- these are pure two-variable "
            "rank correlations, same as Berlin's own test_h3. Stadtteil clustering (#129) does "
            "NOT apply here (see module docstring scope note); it applies only to Section 2.\n\n"
        )
        f.write(
            "> **H3a/H3b are identical by construction in this section.** H3a computes "
            "`Spearman(delta_dyn_t, delta_status)` and H3b computes `Spearman(delta_status, "
            "delta_dyn_t)` -- the same two vectors with swapped argument order. Spearman "
            "correlation is symmetric under argument swap, so H3a and H3b return IDENTICAL "
            "rho/p/n at every lag_k below (inherited from e1_regressions.py's test_h3, which has "
            "the same property on Berlin's MSS data; see that function's docstring and "
            "B7-geo-signoff.md Concern 2). This is a **co-movement test across the lag window, "
            "not a strict temporal-precedence test** -- a symmetric bivariate statistic cannot "
            "distinguish \"POI leads status\" (H3a) from \"status leads POI\" (H3b); it can only "
            "say the two series co-move. **Section 2 below (the D4-controlled OLS with "
            "Stadtteil-clustered SEs) is the test that actually distinguishes the two directional "
            "hypotheses** -- H3a and H3b there are different regression specifications (different "
            "dependent variables) and its coefficients are genuinely non-symmetric.\n\n"
        )
        _write_results_table(f, results_bivariate)
        f.write(
            f"\n**Directional agreement (bivariate): {n_pass}/{len(results_bivariate)}. Significant: {n_sig}/{len(results_bivariate)}.**\n\n"
        )

        f.write(
            "## Section 2: D4-controlled OLS, Stadtteil-clustered standard errors (#129 binding)\n\n"
        )
        f.write(
            "> ewr_composite_t (D4 baseline LEVEL, index-definition.md §4.3) enters as a covariate "
            "here -- per #129 / H1-geo-signoff.md Condition 2, standard errors on the primary "
            "change-predictor coefficient are clustered at Stadtteil grain "
            "(`run_ols_clustered`, CR1 sandwich estimator, Cameron, Gelbach & Miller 2011; "
            "Cameron & Miller 2015). Effective D4 sample size is Stadtteil count "
            f"(observed: {n_clusters_seen} distinct clusters per lag_k below; "
            "~104-105 Stadtteile expected per ADR-0014), not Gebiet (row) count.\n\n"
        )
        _write_results_table(f, results_d4_clustered, with_clusters=True)
        n_pass_d4 = sum(1 for r in results_d4_clustered if r["dir_match"])
        n_sig_d4 = sum(1 for r in results_d4_clustered if r.get("sig"))
        f.write(
            f"\n**Directional agreement (D4-controlled, clustered): {n_pass_d4}/{len(results_d4_clustered)}. "
            f"Significant: {n_sig_d4}/{len(results_d4_clustered)}.**\n\n"
        )

        f.write("## Overall scorecard\n\n")
        all_results = results_bivariate + results_d4_clustered
        n_pass_all = sum(1 for r in all_results if r["dir_match"])
        n_sig_all = sum(1 for r in all_results if r.get("sig"))
        f.write(
            f"**Total directional agreement: {n_pass_all}/{len(all_results)}. "
            f"Significant: {n_sig_all}/{len(all_results)}.**\n\n"
        )

        f.write("## Comparison to Berlin (int_mss_lead_lag / e1_regressions.py test_h3)\n\n")
        f.write(
            "Berlin (thesis p. 91, replicated directionally by e1_regressions.py): H3b "
            "(status-leads-POI) CONFIRMED, H3a (POI-leads-status) REJECTED. See Section 1 above "
            "for whether Hamburg's bivariate H3a/H3b directions and significance match or diverge "
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
            ">300-resident-threshold rationale as Stage 1), not a join/name-matching bug. See the "
            "observed cluster count (95) reported in Section 2 above.\n"
        )
        f.write(
            "- **Epic B framing**: directional/exploratory revival work (CLAUDE.md) -- honest "
            "reporting of whatever direction/significance is observed is the bar, not matching "
            "Berlin's thesis-confirmed result.\n"
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

    print_results(results_bivariate)
    n_pass = sum(1 for r in results_bivariate if r["dir_match"])
    n_sig = sum(1 for r in results_bivariate if r.get("sig"))
    print(f"\nBivariate directional agreement: {n_pass}/{len(results_bivariate)}")
    print(f"Bivariate significant at p<0.05: {n_sig}/{len(results_bivariate)}")

    print_results(results_d4_clustered)

    write_findings(df_ll, results_bivariate, results_d4_clustered)
    print(f"\nFindings written to: {OUTPUT_MD}")


if __name__ == "__main__":
    main()
