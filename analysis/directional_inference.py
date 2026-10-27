"""
analysis/directional_inference.py
=================================
Shared inference helpers for the thesis's directional hypotheses (H3a / H3b) and
for honest verdict scoring. Used by e1_regressions.py and e5_hamburg_lead_lag.py.

Why this module exists (2026-10-26 methodology review)
------------------------------------------------------
1. **H3a and H3b were never both tested.** H3a ("commercial change precedes social-
   status change") and H3b ("status change precedes commercial change") are claims
   about temporal ORDER. On the MSS panels H3b was computed as Spearman of the same two
   arrays as H3a with the arguments swapped -- Spearman is symmetric, so it returned
   H3a's number. On the EWR panel H3a correlated two changes over the SAME window (co-
   movement, not order). Hamburg's "D4-controlled OLS" regressed the same same-window
   pair in both directions, which changes the coefficient's scale but not the evidence
   about order (its two p-values were 0.31/0.31, 0.27/0.27, 0.25/0.26). No test
   identified direction.

   The fix is a **cross-lagged panel design** with strictly ordered, non-overlapping
   windows around a pivot edition e1 (prior window P = [e0, e1], following F = [e1, e2]):

       H3a:  partial_rho( dPOI_P , dStatus_F | dStatus_P , D4_e1 )
       H3b:  partial_rho( dStatus_P , dPOI_F | dPOI_P , D4_e1 )

   Each direction controls for the OUTCOME's own prior change (Granger logic: does the
   other series add information beyond the outcome's own trajectory?) and the D4
   baseline level (index-definition.md §4.3 -- D4 LEVELS only). The two directions now
   use different variables and can disagree.

2. **Rank-based, because MSS status is ordinal.** index-definition.md §3.2 permits rank-
   order methods on MSS ordinal deltas and forbids metric (OLS) treatment, so the
   estimator is a partial SPEARMAN correlation: rank-transform every variable, partial
   out the ranked controls by least squares, correlate the residuals.

3. **Spatial dependence (thesis weakness W1).** Neighbouring areas are not independent,
   and EWR panels repeat each area across years. Confidence intervals therefore come
   from a CLUSTER bootstrap that resamples whole clusters (Bezirksregion for PLR
   panels; Stadtteil for Hamburg), never single rows. The verdict uses that CI.

4. **"PASS" used to mean "the sign matched".** A rho of -0.05 with p = 0.33 scored as a
   confirmation. `verdict()` requires significance: SUPPORTED / CONTRADICTED (wrong sign,
   significant) / NOT SIGNIFICANT / NO DATA.

Pure numpy/scipy -- no new dependency (CLAUDE.md golden rule #2). Deterministic:
bootstrap seed fixed (R-C3).
"""

from __future__ import annotations

from collections.abc import Sequence

import numpy as np
import pandas as pd
from scipy import stats

ALPHA = 0.05
N_BOOT = 1999
SEED = 42

SUPPORTED = "SUPPORTED"
CONTRADICTED = "CONTRADICTED"
NOT_SIGNIFICANT = "NOT SIGNIFICANT"
NO_DATA = "NO DATA"


# ---------------------------------------------------------------------------
# Estimator
# ---------------------------------------------------------------------------


def _finite_mask(*arrays: np.ndarray) -> np.ndarray:
    mask = np.ones(len(arrays[0]), dtype=bool)
    for a in arrays:
        mask &= np.isfinite(np.asarray(a, dtype=float))
    return mask


def _partial_r(rx: np.ndarray, ry: np.ndarray, rz: list[np.ndarray]) -> float:
    """Pearson correlation of rx, ry after partialling out rz (all already ranked)."""
    n = len(rx)
    design = np.column_stack([np.ones(n), *rz]) if rz else np.ones((n, 1))
    ex = rx - design @ np.linalg.lstsq(design, rx, rcond=None)[0]
    ey = ry - design @ np.linalg.lstsq(design, ry, rcond=None)[0]
    sx, sy = ex.std(), ey.std()
    if sx == 0 or sy == 0:
        return float("nan")
    return float(np.mean((ex - ex.mean()) * (ey - ey.mean())) / (sx * sy))


def partial_spearman(x: np.ndarray, y: np.ndarray, controls: Sequence[np.ndarray] = ()) -> dict:
    """Partial Spearman correlation of x and y given `controls` (rank-based).

    Returns rho, an analytic p-value (t-distribution, df = n - 2 - n_controls; reported
    for reference -- the verdict uses the cluster-bootstrap CI), and n.
    """
    x = np.asarray(x, dtype=float)
    y = np.asarray(y, dtype=float)
    ctrl = [np.asarray(c, dtype=float) for c in controls]
    mask = _finite_mask(x, y, *ctrl)
    n = int(mask.sum())
    k = len(ctrl)
    if n < 10 + k:
        return {"rho": None, "p": None, "n": n}
    rx = stats.rankdata(x[mask])
    ry = stats.rankdata(y[mask])
    rz = [stats.rankdata(c[mask]) for c in ctrl]
    rho = _partial_r(rx, ry, rz)
    if not np.isfinite(rho):
        return {"rho": None, "p": None, "n": n}
    df = n - 2 - k
    if df <= 0 or abs(rho) >= 1:
        p = 0.0 if abs(rho) >= 1 else None
    else:
        t = rho * np.sqrt(df / (1 - rho**2))
        p = float(2 * stats.t.sf(abs(t), df))
    return {"rho": rho, "p": p, "n": n}


def cluster_bootstrap_ci(
    x: np.ndarray,
    y: np.ndarray,
    controls: Sequence[np.ndarray],
    clusters: np.ndarray,
    n_boot: int = N_BOOT,
    seed: int = SEED,
    alpha: float = ALPHA,
) -> tuple[float | None, float | None, int]:
    """Percentile CI for partial_spearman, resampling whole clusters with replacement.

    Returns (ci_low, ci_high, n_clusters). (None, None, g) when fewer than 5 clusters --
    too few for a cluster bootstrap to mean anything.
    """
    x = np.asarray(x, dtype=float)
    y = np.asarray(y, dtype=float)
    ctrl = [np.asarray(c, dtype=float) for c in controls]
    clusters = np.asarray(clusters)
    mask = _finite_mask(x, y, *ctrl) & pd.notna(clusters)
    x, y, clusters = x[mask], y[mask], clusters[mask]
    ctrl = [c[mask] for c in ctrl]
    uniq = pd.unique(clusters)
    g = len(uniq)
    if g < 5:
        return None, None, g
    members = [np.flatnonzero(clusters == c) for c in uniq]
    rng = np.random.default_rng(seed)
    draws = []
    for _ in range(n_boot):
        pick = rng.integers(0, g, size=g)
        idx = np.concatenate([members[i] for i in pick])
        r = partial_spearman(x[idx], y[idx], [c[idx] for c in ctrl])["rho"]
        if r is not None:
            draws.append(r)
    if len(draws) < n_boot // 2:
        return None, None, g
    lo, hi = np.percentile(draws, [100 * alpha / 2, 100 * (1 - alpha / 2)])
    return float(lo), float(hi), g


# ---------------------------------------------------------------------------
# Panel construction
# ---------------------------------------------------------------------------


def default_cluster(area_code: str) -> str:
    """Spatial cluster for an area code.

    Berlin LOR codes are BEZ(2) PGR(2) BZR(2) PLR(2): an 8-digit PLR clusters to its
    Bezirksregion (first 6), a 6-digit BZR to its Bezirk (first 2). Anything else is its
    own cluster.
    """
    s = str(area_code)
    if len(s) == 8:
        return s[:6]
    if len(s) == 6:
        return s[:2]
    return s


def build_cross_lagged(
    df: pd.DataFrame,
    k: int,
    status_cols: tuple[str, str] = ("status_index_t", "status_index_tk"),
    poi_cols: tuple[str, str] = ("dynamism_score_t", "dynamism_score_tk"),
    control_col: str | None = None,
    cluster_col: str | None = None,
    time_cols: tuple[str, str] = ("edition_t", "edition_tk"),
) -> pd.DataFrame:
    """Pair each prior link P = (e0 -> e1) with the following link F = (e1 -> e2).

    `df` holds lead-lag rows (one per area x start edition x lag). Only links with the
    same lag k are paired, and only where P's end edition IS F's start edition, so the
    windows are strictly ordered and never overlap. Returns one row per (area, pivot e1):
    d_status_p, d_poi_p, d_status_f, d_poi_f, control (at e1, from F's start), cluster.
    """
    t0, t1 = time_cols
    s0, s1 = status_cols
    p0, p1 = poi_cols
    keep = ["area_code", t0, t1, s0, s1, p0, p1]
    if control_col:
        keep.append(control_col)
    if cluster_col:
        keep.append(cluster_col)
    sub = df.loc[df["lag_k"] == k, [c for c in dict.fromkeys(keep) if c in df.columns]]
    # A duplicated (area, start, end) link would turn the self-merge below into a silent
    # cartesian product and inflate n -- refuse it instead.
    dup = int(sub.duplicated(["area_code", t0, t1]).sum()) if not sub.empty else 0
    if dup:
        raise ValueError(
            f"build_cross_lagged: {dup} duplicated (area_code, {t0}, {t1}) links at k={k}"
        )
    if sub.empty:
        return pd.DataFrame()
    m = sub.merge(sub, left_on=["area_code", t1], right_on=["area_code", t0], suffixes=("_p", "_f"))
    if m.empty:
        return pd.DataFrame()
    out = pd.DataFrame(
        {
            "area_code": m["area_code"],
            "pivot": m[f"{t1}_p"],
            "d_status_p": m[f"{s1}_p"].astype(float) - m[f"{s0}_p"].astype(float),
            "d_poi_p": m[f"{p1}_p"].astype(float) - m[f"{p0}_p"].astype(float),
            "d_status_f": m[f"{s1}_f"].astype(float) - m[f"{s0}_f"].astype(float),
            "d_poi_f": m[f"{p1}_f"].astype(float) - m[f"{p0}_f"].astype(float),
        }
    )
    if control_col and f"{control_col}_f" in m:
        out["control"] = m[f"{control_col}_f"].astype(float)
    if cluster_col and f"{cluster_col}_f" in m:
        # Keep a missing cluster missing (astype(str) would make every NaN one "nan" cluster);
        # cluster_bootstrap_ci drops rows without a cluster.
        out["cluster"] = m[f"{cluster_col}_f"].map(lambda v: None if pd.isna(v) else str(v))
    else:
        out["cluster"] = out["area_code"].map(default_cluster)
    return out.reset_index(drop=True)


def cross_lagged_tests(cl: pd.DataFrame, n_boot: int = N_BOOT, seed: int = SEED) -> dict:
    """Run H3a and H3b on a build_cross_lagged() frame.

    H3a: partial_rho(d_poi_p, d_status_f | d_status_p [, control])
    H3b: partial_rho(d_status_p, d_poi_f | d_poi_p [, control])
    """
    if cl.empty:
        empty = {
            "rho": None,
            "p": None,
            "n": 0,
            "ci_low": None,
            "ci_high": None,
            "n_clusters": 0,
            "d4_control": False,
        }
        return {"H3a": dict(empty), "H3b": dict(empty)}
    # The D4 baseline is a control, not part of the hypothesis: use it only where it is
    # available for most rows. Requiring it everywhere silently dropped whole panels --
    # e.g. the 2021-2025 MSS panel pivots on 2023, and EWR 2021-2023 was never published,
    # so D4 is null for every row there. Below the threshold the test runs without it and
    # says so (`d4_control`), instead of returning no data.
    use_d4 = "control" in cl and float(np.isfinite(cl["control"].to_numpy(float)).mean()) >= 0.8
    ctrl = [cl["control"].to_numpy()] if use_d4 else []
    specs = {
        "H3a": (cl["d_poi_p"], cl["d_status_f"], [cl["d_status_p"].to_numpy(), *ctrl]),
        "H3b": (cl["d_status_p"], cl["d_poi_f"], [cl["d_poi_p"].to_numpy(), *ctrl]),
    }
    out = {}
    for hyp, (x, y, controls) in specs.items():
        est = partial_spearman(x.to_numpy(), y.to_numpy(), controls)
        lo, hi, g = cluster_bootstrap_ci(
            x.to_numpy(), y.to_numpy(), controls, cl["cluster"].to_numpy(), n_boot, seed
        )
        out[hyp] = {**est, "ci_low": lo, "ci_high": hi, "n_clusters": g, "d4_control": use_d4}
    return out


# ---------------------------------------------------------------------------
# Scoring
# ---------------------------------------------------------------------------


def verdict(
    estimate: float | None,
    expected_dir: str,
    p: float | None = None,
    ci_low: float | None = None,
    ci_high: float | None = None,
    alpha: float = ALPHA,
) -> str:
    """Score one test. Significance is required -- the sign alone never confirms.

    Uses the CI when one is given (it must exclude 0), else p < alpha.
    expected_dir is "positive" or "negative".
    """
    if estimate is None or not np.isfinite(estimate):
        return NO_DATA
    if ci_low is not None and ci_high is not None:
        significant = ci_low > 0 or ci_high < 0
    elif p is not None:
        significant = p < alpha
    else:
        return NO_DATA
    if not significant:
        return NOT_SIGNIFICANT
    actual = "positive" if estimate > 0 else "negative"
    return SUPPORTED if actual == expected_dir else CONTRADICTED


def direction_conclusion(h3a_verdict: str, h3b_verdict: str) -> str:
    """What a cross-lagged H3a/H3b pair says about which series leads."""
    a, b = h3a_verdict == SUPPORTED, h3b_verdict == SUPPORTED
    if NO_DATA in (h3a_verdict, h3b_verdict):
        return "not testable (insufficient data)"
    if b and not a:
        return "status change leads commercial change (H3b; the thesis's direction)"
    if a and not b:
        return "commercial change leads status change (H3a; against the thesis)"
    if a and b:
        return "both directions supported -- no single leading series"
    return "no directional evidence either way"


def summarise(verdicts: Sequence[str]) -> str:
    """'Supported a/n · Contradicted b · Not significant c [· No data d]'."""
    n = len(verdicts)
    counts = {
        v: sum(1 for x in verdicts if x == v)
        for v in (SUPPORTED, CONTRADICTED, NOT_SIGNIFICANT, NO_DATA)
    }
    s = (
        f"Supported {counts[SUPPORTED]}/{n} · Contradicted {counts[CONTRADICTED]} · "
        f"Not significant {counts[NOT_SIGNIFICANT]}"
    )
    if counts[NO_DATA]:
        s += f" · No data {counts[NO_DATA]}"
    return s
