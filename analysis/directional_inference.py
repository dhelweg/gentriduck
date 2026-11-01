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

numpy/scipy, plus scikit-learn (already a dependency, imported lazily) for the
#354/#355 grouped-CV classifier -- no new dependency (CLAUDE.md golden rule #2).
Deterministic: bootstrap seed fixed (R-C3).

#354/#355 extensions (docs/methodology/354-355-hypothesis-suite-preregistration.md
§6.1), all backward-compatible: `cluster_bootstrap_stat` (generic cluster bootstrap),
`min_clusters` / `return_draws` on `cluster_bootstrap_ci`, `bootstrap_p`, `bh_adjust`,
`holm_adjust`, `auc_score`, `grouped_oof_auc` with `leakage_guard_groups` and
`assert_fold_local_preprocessing`, optional `delta_cols` / `level_cols` on
`build_cross_lagged`, per-direction `controls` on `cross_lagged_tests`, and
opposite-sign wording in `direction_conclusion`.
"""

from __future__ import annotations

from collections.abc import Callable, Sequence

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


def cluster_bootstrap_stat(
    stat_fn: Callable[[np.ndarray], float | None],
    clusters: np.ndarray,
    n_boot: int = N_BOOT,
    seed: int = SEED,
    alpha: float = ALPHA,
    min_clusters: int = 5,
) -> tuple[float | None, float | None, int, list[float]]:
    """Generic percentile cluster bootstrap of any row-index statistic.

    `stat_fn(idx)` receives the row indices of one resample (whole clusters drawn with
    replacement) and returns the statistic, or None when it is undefined on that draw.
    Returns (ci_low, ci_high, n_clusters, draws). The CI is (None, None) when there are
    fewer than `min_clusters` clusters or fewer than half the draws are defined.

    Cluster membership follows first-appearance order (`pd.unique`), so callers must pass
    rows in a deterministic order (#354/#355 pre-registration §5.7: every SQL load ends in
    ORDER BY). Cluster-bootstrap coverage is poor with few clusters (Cameron, Gelbach &
    Miller 2008), hence `min_clusters` (default 5 keeps E1/E5 unchanged; the #354/#355
    suite passes 20, §5.3).
    """
    clusters = np.asarray(clusters)
    uniq = pd.unique(clusters)
    g = len(uniq)
    if g < min_clusters:
        return None, None, g, []
    members = [np.flatnonzero(clusters == c) for c in uniq]
    rng = np.random.default_rng(seed)
    draws: list[float] = []
    for _ in range(n_boot):
        pick = rng.integers(0, g, size=g)
        idx = np.concatenate([members[i] for i in pick])
        r = stat_fn(idx)
        if r is not None and np.isfinite(r):
            draws.append(float(r))
    if len(draws) < n_boot // 2:
        return None, None, g, draws
    lo, hi = np.percentile(draws, [100 * alpha / 2, 100 * (1 - alpha / 2)])
    return float(lo), float(hi), g, draws


def cluster_bootstrap_ci(
    x: np.ndarray,
    y: np.ndarray,
    controls: Sequence[np.ndarray],
    clusters: np.ndarray,
    n_boot: int = N_BOOT,
    seed: int = SEED,
    alpha: float = ALPHA,
    min_clusters: int = 5,
    return_draws: bool = False,
) -> tuple:
    """Percentile CI for partial_spearman, resampling whole clusters with replacement.

    Returns (ci_low, ci_high, n_clusters). (None, None, g) when fewer than `min_clusters`
    clusters -- too few for a cluster bootstrap to mean anything. With
    `return_draws=True` the bootstrap draws are appended as a fourth element, for the
    bootstrap p-value (`bootstrap_p`; #354/#355 pre-registration §5.3, §6.1). The
    defaults reproduce the pre-#354 behaviour exactly (same RNG stream, same 5-cluster
    floor), so E1/E5 output is unchanged.
    """
    x = np.asarray(x, dtype=float)
    y = np.asarray(y, dtype=float)
    ctrl = [np.asarray(c, dtype=float) for c in controls]
    clusters = np.asarray(clusters)
    mask = _finite_mask(x, y, *ctrl) & pd.notna(clusters)
    x, y, clusters = x[mask], y[mask], clusters[mask]
    ctrl = [c[mask] for c in ctrl]

    def _rho(idx: np.ndarray) -> float | None:
        return partial_spearman(x[idx], y[idx], [c[idx] for c in ctrl])["rho"]

    lo, hi, g, draws = cluster_bootstrap_stat(_rho, clusters, n_boot, seed, alpha, min_clusters)
    if return_draws:
        return lo, hi, g, draws
    return lo, hi, g


def bootstrap_p(draws: Sequence[float], theta0: float, n_boot: int = N_BOOT) -> float | None:
    """Two-sided bootstrap p-value against the null value `theta0`.

    p = 2 * min(P*(theta* <= theta0), P*(theta* >= theta0)), floored at 1/(B+1) and capped
    at 1 (#354/#355 pre-registration §5.3; theta0 = 0 for rho, 0.5 for AUC). None when
    there are no draws.
    """
    d = np.asarray(list(draws), dtype=float)
    if d.size == 0:
        return None
    p = 2.0 * min(float(np.mean(d <= theta0)), float(np.mean(d >= theta0)))
    return float(min(1.0, max(p, 1.0 / (n_boot + 1))))


def _clean_p(pvals: Sequence[float | None]) -> list[float | None]:
    return [None if p is None or not np.isfinite(p) else float(p) for p in pvals]


def bh_adjust(pvals: Sequence[float | None]) -> list[float | None]:
    """Benjamini-Hochberg (1995) step-up adjusted p-values (false discovery rate).

    p_adj(i) = min_{j >= i} (m / j) * p_(j), capped at 1, with m = the number of
    non-missing p-values. Missing entries (None/NaN, e.g. NO DATA rows) stay None and do
    not count towards m. Binding correction for each panel's 8 primaries (#354/#355
    pre-registration §5.5, maintainer decision 2026-10-28).
    """
    vals = _clean_p(pvals)
    idx = [i for i, p in enumerate(vals) if p is not None]
    m = len(idx)
    out: list[float | None] = [None] * len(vals)
    order = sorted(idx, key=lambda i: (vals[i], i))
    running = 1.0
    for rank in range(m, 0, -1):
        i = order[rank - 1]
        running = min(running, vals[i] * m / rank)
        out[i] = min(1.0, running)
    return out


def holm_adjust(pvals: Sequence[float | None]) -> list[float | None]:
    """Holm (1979) step-down adjusted p-values (family-wise error rate).

    p_adj(i) = max_{j <= i} min(1, (m - j + 1) * p_(j)). Reported as `p_holm`; it does not
    decide verdicts (#354/#355 pre-registration §5.5). Missing entries stay None.
    """
    vals = _clean_p(pvals)
    idx = [i for i, p in enumerate(vals) if p is not None]
    m = len(idx)
    out: list[float | None] = [None] * len(vals)
    order = sorted(idx, key=lambda i: (vals[i], i))
    running = 0.0
    for rank, i in enumerate(order, start=1):
        running = max(running, min(1.0, (m - rank + 1) * vals[i]))
        out[i] = running
    return out


# ---------------------------------------------------------------------------
# Grouped cross-validated classifier (H1 / H2; #354/#355 pre-registration §5.1, A1.1)
# ---------------------------------------------------------------------------


def auc_score(y: np.ndarray, score: np.ndarray) -> float | None:
    """Area under the ROC curve via the Mann-Whitney rank identity (mid-ranks for ties).

    None when only one class is present. Same value as sklearn's roc_auc_score, but
    allocation-light for the B = 1999 bootstrap.
    """
    y = np.asarray(y)
    score = np.asarray(score, dtype=float)
    pos = y == 1
    n1 = int(pos.sum())
    n0 = int(len(y) - n1)
    if n1 == 0 or n0 == 0:
        return None
    r = stats.rankdata(score)
    return float((r[pos].sum() - n1 * (n1 + 1) / 2.0) / (n1 * n0))


def leakage_guard_groups(
    groups: np.ndarray, folds: Sequence[tuple[np.ndarray, np.ndarray]]
) -> None:
    """R-C3 leakage guard §5.8(3): no cluster may appear in both a train and a test fold."""
    groups = np.asarray(groups)
    for k, (train, test) in enumerate(folds):
        shared = set(groups[train].tolist()) & set(groups[test].tolist())
        assert not shared, f"grouped-CV leak in fold {k}: clusters {sorted(shared)[:5]}"  # noqa: S101 -- R-C3


def make_logit_pipeline():
    """The fixed, untuned classifier of pre-registration §5.1 and Amendment 1 A1.1.

    SimpleImputer(mean) -> StandardScaler -> L2 LogisticRegression(C = 1.0,
    class_weight = "balanced", solver = "lbfgs", max_iter = 5000). Imputer and scaler are
    fitted inside each training fold (§5.8(4)); `keep_empty_features=True` keeps the
    column layout fixed when a feature is entirely missing in one training fold. No
    missing-indicator columns (A1.1).
    """
    from sklearn.impute import SimpleImputer
    from sklearn.linear_model import LogisticRegression
    from sklearn.pipeline import Pipeline
    from sklearn.preprocessing import StandardScaler

    return Pipeline(
        [
            ("impute", SimpleImputer(strategy="mean", keep_empty_features=True)),
            ("scale", StandardScaler()),
            (
                "logit",
                LogisticRegression(C=1.0, class_weight="balanced", solver="lbfgs", max_iter=5000),
            ),
        ]
    )


def assert_fold_local_preprocessing(pipe, x_train: np.ndarray) -> None:
    """R-C3 leakage guard §5.8(4): imputer and scaler were fitted on the training fold only."""
    imp = pipe.named_steps["impute"]
    scaler = pipe.named_steps["scale"]
    assert scaler.n_samples_seen_ == len(x_train), "scaler not fitted on the training fold"  # noqa: S101 -- R-C3
    x_train = np.asarray(x_train, dtype=float)
    finite = np.isfinite(x_train)
    counts = finite.sum(axis=0)
    sums = np.where(finite, x_train, 0.0).sum(axis=0)
    seen = counts > 0
    col_mean = np.divide(sums, np.maximum(counts, 1))
    assert np.allclose(imp.statistics_[seen], col_mean[seen], rtol=1e-9, atol=1e-12), (  # noqa: S101 -- R-C3
        "imputer statistics differ from the training-fold means"
    )


def grouped_oof_auc(
    x: np.ndarray,
    y: np.ndarray,
    groups: np.ndarray,
    n_splits: int = 5,
    pipeline_factory: Callable | None = None,
) -> dict:
    """Out-of-fold scores of the fixed logit pipeline under GroupKFold by cluster.

    Returns {"oof": scores, "auc": OOF AUC, "folds": [(train, test)], "coefs": array
    (n_folds x n_features) of standardised training-fold coefficients}. GroupKFold
    without shuffling is deterministic given the row order (§5.7, A1.5). Every fold is
    checked by `leakage_guard_groups` and `assert_fold_local_preprocessing`
    (§5.8(3)-(4)).
    """
    from sklearn.model_selection import GroupKFold

    x = np.asarray(x, dtype=float)
    y = np.asarray(y).astype(int)
    groups = np.asarray(groups)
    factory = pipeline_factory or make_logit_pipeline
    k = min(n_splits, len(pd.unique(groups)))
    empty = {"oof": None, "auc": None, "folds": [], "coefs": None}
    if k < 2 or len(np.unique(y)) < 2:
        return empty
    folds = list(GroupKFold(n_splits=k).split(x, y, groups))
    leakage_guard_groups(groups, folds)
    oof = np.full(len(y), np.nan)
    coefs = []
    for train, test in folds:
        if len(np.unique(y[train])) < 2:
            return {**empty, "folds": folds}
        pipe = factory()
        pipe.fit(x[train], y[train])
        assert_fold_local_preprocessing(pipe, x[train])
        oof[test] = pipe.predict_proba(x[test])[:, 1]
        coefs.append(pipe.named_steps["logit"].coef_[0].copy())
    return {"oof": oof, "auc": auc_score(y, oof), "folds": folds, "coefs": np.vstack(coefs)}


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
    delta_cols: tuple[str, str] | None = None,
    level_cols: dict[str, tuple[str, str]] | None = None,
) -> pd.DataFrame:
    """Pair each prior link P = (e0 -> e1) with the following link F = (e1 -> e2).

    `df` holds lead-lag rows (one per area x start edition x lag). Only links with the
    same lag k are paired, and only where P's end edition IS F's start edition, so the
    windows are strictly ordered and never overlap. Returns one row per (area, pivot e1):
    d_status_p, d_poi_p, d_status_f, d_poi_f, control (at e1, from F's start), cluster.

    #354/#355 (pre-registration §6.1), optional and backward-compatible:
    - `delta_cols=(status_delta, poi_delta)`: per-link changes are read ready-made from
      these columns (e.g. a published Dynamik composite and a DHS growth rate) instead of
      being differenced from `status_cols` / `poi_cols`, which are then not required.
    - `level_cols={out_name: (column, side)}` with side "p" or "f": carry a level from the
      prior (P) or following (F) link row, e.g. the status at the pivot and at the start
      of the predictor window (§3.5). The output also gets `start_p` (= e0) and `end_f`
      (= e2) so callers can assert the temporal order (§5.8(2)).
    """
    t0, t1 = time_cols
    s0, s1 = status_cols
    p0, p1 = poi_cols
    keep = ["area_code", t0, t1]
    keep += list(delta_cols) if delta_cols else [s0, s1, p0, p1]
    if control_col:
        keep.append(control_col)
    if cluster_col:
        keep.append(cluster_col)
    for col, _side in (level_cols or {}).values():
        keep.append(col)
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
    if delta_cols:
        ds, dp = delta_cols
        changes = {
            "d_status_p": m[f"{ds}_p"].astype(float),
            "d_poi_p": m[f"{dp}_p"].astype(float),
            "d_status_f": m[f"{ds}_f"].astype(float),
            "d_poi_f": m[f"{dp}_f"].astype(float),
        }
    else:
        changes = {
            "d_status_p": m[f"{s1}_p"].astype(float) - m[f"{s0}_p"].astype(float),
            "d_poi_p": m[f"{p1}_p"].astype(float) - m[f"{p0}_p"].astype(float),
            "d_status_f": m[f"{s1}_f"].astype(float) - m[f"{s0}_f"].astype(float),
            "d_poi_f": m[f"{p1}_f"].astype(float) - m[f"{p0}_f"].astype(float),
        }
    out = pd.DataFrame({"area_code": m["area_code"], "pivot": m[f"{t1}_p"], **changes})
    if level_cols:
        out["start_p"] = m[f"{t0}_p"]
        out["end_f"] = m[f"{t1}_f"]
        for name, (col, side) in level_cols.items():
            if side not in ("p", "f"):
                raise ValueError(f"build_cross_lagged: level side must be 'p' or 'f', got {side!r}")
            out[name] = m[f"{col}_{side}"].astype(float)
    if control_col and f"{control_col}_f" in m:
        out["control"] = m[f"{control_col}_f"].astype(float)
    if cluster_col and f"{cluster_col}_f" in m:
        # Keep a missing cluster missing (astype(str) would make every NaN one "nan" cluster);
        # cluster_bootstrap_ci drops rows without a cluster.
        out["cluster"] = m[f"{cluster_col}_f"].map(lambda v: None if pd.isna(v) else str(v))
    else:
        out["cluster"] = out["area_code"].map(default_cluster)
    return out.reset_index(drop=True)


def cross_lagged_tests(
    cl: pd.DataFrame,
    n_boot: int = N_BOOT,
    seed: int = SEED,
    controls: dict[str, Sequence[str]] | None = None,
    min_clusters: int = 5,
) -> dict:
    """Run H3a and H3b on a build_cross_lagged() frame.

    H3a: partial_rho(d_poi_p, d_status_f | d_status_p [, control])
    H3b: partial_rho(d_status_p, d_poi_f | d_poi_p [, control])

    #354/#355 (pre-registration §3.5, §6.1): `controls={"H3a": [...], "H3b": [...]}` gives
    each direction its own full list of control columns of `cl` (e.g. H3a: own lag +
    status at the pivot; H3b: own lag + status at the start of the predictor window) and
    replaces the default "own lag + D4 if >= 80% available" rule for that direction.
    Every result also carries `p_boot` (two-sided bootstrap p against 0, §5.3).
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
            "p_boot": None,
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
    d4_used = {"H3a": use_d4, "H3b": use_d4}
    for hyp, cols in (controls or {}).items():
        x, y, _ = specs[hyp]
        specs[hyp] = (x, y, [cl[c].to_numpy() for c in cols])
        d4_used[hyp] = "control" in cols
    out = {}
    for hyp, (x, y, ctrl_arrays) in specs.items():
        est = partial_spearman(x.to_numpy(), y.to_numpy(), ctrl_arrays)
        lo, hi, g, draws = cluster_bootstrap_ci(
            x.to_numpy(),
            y.to_numpy(),
            ctrl_arrays,
            cl["cluster"].to_numpy(),
            n_boot,
            seed,
            min_clusters=min_clusters,
            return_draws=True,
        )
        out[hyp] = {
            **est,
            "ci_low": lo,
            "ci_high": hi,
            "n_clusters": g,
            "d4_control": d4_used[hyp],
            "p_boot": bootstrap_p(draws, 0.0, n_boot) if lo is not None else None,
        }
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
    """What a cross-lagged H3a/H3b pair says about which series leads.

    #354/#355 (pre-registration §1.1, §5.6): H3a/H3b are ordering claims with no sign in
    their wording, so a significant precedence of the opposite sign (CONTRADICTED) is
    still precedence and is worded as such; the original four outcomes are unchanged.
    """
    a, b = h3a_verdict == SUPPORTED, h3b_verdict == SUPPORTED
    a_opp, b_opp = h3a_verdict == CONTRADICTED, h3b_verdict == CONTRADICTED
    if NO_DATA in (h3a_verdict, h3b_verdict):
        return "not testable (insufficient data)"
    if b and not a:
        return "status change leads commercial change (H3b; the thesis's direction)"
    if a and not b:
        return "commercial change leads status change (H3a; against the thesis)"
    if a and b:
        return "both directions supported -- no single leading series"
    if b_opp and not a_opp:
        return (
            "status change leads commercial change with the opposite sign (H3b ordering "
            "present: status improvement followed by relative commercial decline)"
        )
    if a_opp and not b_opp:
        return (
            "commercial change leads status change with the opposite sign (H3a ordering "
            "present, against the thesis)"
        )
    if a_opp and b_opp:
        return "both directions show opposite-sign precedence -- no single leading series"
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
