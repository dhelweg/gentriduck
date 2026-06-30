"""
analysis/a9_spatial_dynamic.py
==============================
A9 (#79): Spatial-dynamic gentrification — autocorrelation diagnostics, spatial-econometric
inference, and a diffusion feature for the trajectory model.

R-C2 GROUNDING CITATIONS (mandatory per CLAUDE.md grounding rule):
  Anselin (1988), Spatial Econometrics: Methods and Models — spatial-lag and spatial-error
    models; Lagrange-multiplier diagnostics (LM-lag, LM-error); spatial dependence in
    OLS residuals as evidence for mis-specification.
  Moran (1950), Notes on Continuous Stochastic Phenomena, Biometrika 37(1) — Moran's I
    statistic for global spatial autocorrelation.
  Anselin (1995), Local Indicators of Spatial Association — LISA, Geographical Analysis
    27(2) — LISA / local Moran's I for cluster/outlier detection per PLR.
  Dangschat (1988/2000), invasion-succession / diffusion hypothesis — gentrification
    diffuses from pioneering Kieze into adjacent areas; a neighbour's gentrification at
    t−1 raises the focal PLR's odds at t. Operationalized here as the spatial lag of
    status_index / dynamism_score at t−1 as a predictor in the trajectory model.
  spatial-methods.md §8 — implementation constraints for spatial-robust inference in
    this project (Queen weights, LM decision rule, report OLS vs spatial model side by
    side, never publish significance from naive OLS alone).

PURPOSE:
  1. Build Queen contiguity spatial weights on PLR geometries (EPSG:25833, no geopandas;
     ADR-0010 Required 1 — same pattern as a6_hotspots.py).
  2. Global Moran's I on status_index and dynamism_score per MSS edition year.
  3. Local Moran's I (LISA) per PLR per year — cluster (HH/LL) and outlier (HL/LH) labels.
  4. Spatial-lag / spatial-error regression for H1–H3c predictors:
       naive OLS (spreg.OLS) → LM diagnostics → upgrade to ML_Lag or ML_Error if needed.
     Report OLS vs spatial model side by side (spatial-methods.md §8 rule 3).
  5. Diffusion feature: spatial lag of status_index at t−1 (W * status[t-1]) as a
     predictor in an augmented OLS / spatial-lag model testing Dangschat (1988) contagion.

WEIGHTS:
  Queen contiguity from shapely geometries parsed from DuckDB WKB in EPSG:25833.
  k-NN (k=6) fallback for island PLRs (same pattern as a6_hotspots.py §6).
  Row-standardized; explicit per-call seed=42 on every permutation call (R-C3;
  ADR-0010 Required 4).

OUTPUT:
  data/analysis/a9_moran_{year}.csv       — global Moran's I per variable per year.
  data/analysis/a9_lisa_{year}.csv        — LISA per PLR per year (HH/LL/HL/LH/ns).
  data/analysis/a9_regression_{year}.csv  — OLS vs spatial model comparison per year.
  data/analysis/a9_diffusion.csv          — diffusion feature results across edition pairs.

DB: $GENTRIDUCK_DB env var or data/gentriduck.duckdb (local default; ADR-0010 Amendment 7).

Usage:
  uv run python analysis/a9_spatial_dynamic.py
  # or via poe:
  uv run poe analysis

Citations:
  Moran (1950), Biometrika 37(1).
  Anselin (1988), Spatial Econometrics: Methods and Models, Kluwer.
  Anselin (1995), Geographical Analysis 27(2) — LISA.
  Dangschat (1988), Gentrification — die Aufwertung innenstadtnaher Wohnviertel.
  spatial-methods.md §8 (this project's spatial inference methodology).
"""

from __future__ import annotations

import logging
import os
import sys
from pathlib import Path
from typing import Any

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
log = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Configurable DB path (ADR-0010 Amendment 7: configurable, not hard-coded)
# ---------------------------------------------------------------------------
_env_db = os.environ.get("GENTRIDUCK_DB")
DUCKDB_PATH = _env_db if _env_db else "data/gentriduck.duckdb"

OUT_DIR = Path("data/analysis")

# spatial-methods.md §8: α=0.05 for all significance tests (Moran's I, LISA, regression).
ALPHA = 0.05

# R-C3 / ADR-0010 Required 4: explicit seed on every permutation call.
SEED = 42
PERMUTATIONS = 999


# ---------------------------------------------------------------------------
# Dependency imports
# ---------------------------------------------------------------------------


def _import_deps() -> tuple:
    """Import required packages with clear error messages on missing deps."""
    missing = []
    try:
        import duckdb
    except ImportError:
        missing.append("duckdb")
    try:
        import numpy as np
    except ImportError:
        missing.append("numpy")
        np = None  # type: ignore[assignment]
    try:
        import pandas as pd
    except ImportError:
        missing.append("pandas")
        pd = None  # type: ignore[assignment]
    try:
        from shapely import from_wkb
    except ImportError:
        missing.append("shapely")
        from_wkb = None  # type: ignore[assignment]
    try:
        import libpysal.weights as weights_mod
    except ImportError:
        missing.append("libpysal")
        weights_mod = None  # type: ignore[assignment]
    try:
        from esda import Moran, Moran_Local
    except ImportError:
        missing.append("esda")
        Moran = Moran_Local = None  # type: ignore[assignment]
    try:
        import spreg
    except ImportError:
        missing.append("spreg")
        spreg = None  # type: ignore[assignment]

    if missing:
        log.error("Missing packages: %s. Run: uv sync", ", ".join(missing))
        sys.exit(1)

    return duckdb, np, pd, from_wkb, weights_mod, Moran, Moran_Local, spreg  # type: ignore[return-value]


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------


def load_geoms(con: Any) -> Any:
    """Load PLR geometries as WKB in EPSG:25833.

    spatial-methods.md §3; ADR-0010 Amendment 3: WKB already in 25833, no pyproj.
    Uses lor_2021 vintage — the primary analysis vintage (index-definition.md §6.2).
    """
    sql = """
        SELECT
            area_code,
            ST_AsWKB(ST_GeomFromWKB(geometry_wkb)) AS geom_wkb
        FROM stg_berlin_lor
        WHERE geometry_wkb IS NOT NULL
          AND area_vintage = 'lor_2021'
        ORDER BY area_code
    """
    try:
        return con.execute(sql).df()
    except Exception as e:
        log.warning("Could not load LOR geometries: %s", e)
        import pandas as pd

        return pd.DataFrame(columns=["area_code", "geom_wkb"])


def load_panel(con: Any) -> Any:
    """Load the fct_gentrification_change panel for lor_2021.

    Returns columns: area_code, snapshot_year, status_index, dynamik_index,
    dynamism_score, typology_stage, is_uninhabited, ewr_composite.

    lor_2021 vintage only (editions 2021, 2023, 2025).  We need the full panel
    (including is_uninhabited) to align spatial weight order; uninhabited PLRs
    get NaN-filled values and are excluded from regression but kept in the
    weights matrix with 0-fill (same convention as a6_hotspots.py).
    """
    sql = """
        SELECT
            area_code,
            snapshot_year,
            status_index,
            dynamik_index,
            dynamism_score,
            typology_stage,
            is_uninhabited,
            ewr_composite,
            total_poi_count
        FROM fct_gentrification_change
        WHERE area_vintage = 'lor_2021'
          AND area_code IS NOT NULL
        ORDER BY snapshot_year, area_code
    """
    try:
        return con.execute(sql).df()
    except Exception as e:
        log.warning("Could not load fct_gentrification_change: %s", e)
        import pandas as pd

        return pd.DataFrame()


# ---------------------------------------------------------------------------
# Spatial weights
# ---------------------------------------------------------------------------


def build_queen_weights(geom_df: Any, from_wkb: Any, weights_mod: Any) -> tuple[Any, list]:
    """Build Queen contiguity weights from shapely geometries.

    spatial-methods.md §6 + ADR-0010 Required 1: no geopandas; Queen built
    directly from shapely geometries parsed from DuckDB WKB (EPSG:25833).
    Island fallback: k-NN (k=6) for disconnected PLRs (water bodies, airport).
    Row-standardized (transform='r') per spatial-methods.md §6.

    Returns (w, ordered_area_codes) or (None, []) on failure.
    """
    import numpy as np

    if geom_df is None or geom_df.empty:
        return None, []

    geoms = [from_wkb(bytes(wkb)) for wkb in geom_df["geom_wkb"]]
    area_codes = list(geom_df["area_code"])

    try:
        # spatial-methods.md §6: Queen contiguity (shared edge or vertex).
        w = weights_mod.Queen.from_iterable(geoms, ids=area_codes)
        log.info("Queen weights: %d PLRs, mean neighbours=%.1f", len(w.id_order), w.mean_neighbors)

        # Island fallback (k-NN k=6) — water bodies, airport perimeter.
        islands = [k for k, v in w.neighbors.items() if len(v) == 0]
        if islands:
            log.warning(
                "Queen weights: %d island PLRs — falling back to k-NN (k=6) "
                "(spatial-methods.md §6).",
                len(islands),
            )
            centroids = np.array([(g.centroid.x, g.centroid.y) for g in geoms], dtype=float)
            knn = weights_mod.KNN.from_array(centroids, k=6, ids=area_codes)
            for island_id in islands:
                w.neighbors[island_id] = knn.neighbors[island_id]
                w.weights[island_id] = knn.weights[island_id]
            w._reset()

        # Row-standardize (spatial-methods.md §6).
        w.transform = "r"
        return w, area_codes

    except Exception as e:
        log.error("Failed to build Queen weights: %s", e)
        return None, []


# ---------------------------------------------------------------------------
# Global Moran's I
# ---------------------------------------------------------------------------


def run_moran(
    values: Any,
    w: Any,
    Moran: Any,
    np: Any,
    label: str,
) -> dict:
    """Compute global Moran's I for a single variable vector.

    Moran (1950) Biometrika 37(1); spatial-methods.md §8.
    esda.Moran(y, w, permutations=999, seed=42) — explicit per-call seed (R-C3).

    Returns dict with I, EI, z_norm, p_norm, p_sim, significant, label.
    """
    # Zero-fill NaN (uninhabited PLRs treated as 0 in spatial statistics;
    # same convention as a6_hotspots.py — conservative, avoids spurious
    # autocorrelation from missing-data patterns).
    y = np.where(np.isnan(values.astype(float)), 0.0, values.astype(float))
    n_valid = (~np.isnan(values.astype(float))).sum()
    if n_valid < 10:
        return {
            "label": label,
            "I": None,
            "EI": None,
            "z_norm": None,
            "p_norm": None,
            "p_sim": None,
            "significant": None,
            "n_valid": int(n_valid),
        }
    try:
        # Moran (1950); spatial-methods.md §8; R-C3: reproducible seed.
        # esda.Moran (this version) does not accept a per-call seed kwarg.
        # We set numpy random state immediately before the call to achieve
        # the same reproducibility guarantee (ADR-0010 Required 4 intent).
        import numpy as _np_seed

        _np_seed.random.seed(SEED)
        mi = Moran(y, w, permutations=PERMUTATIONS)
        return {
            "label": label,
            "I": float(mi.I),
            "EI": float(mi.EI),
            "z_norm": float(mi.z_norm),
            "p_norm": float(mi.p_norm),
            "p_sim": float(mi.p_sim),
            "significant": bool(mi.p_sim < ALPHA),
            "n_valid": int(n_valid),
        }
    except Exception as e:
        log.warning("Moran failed for %s: %s", label, e)
        return {
            "label": label,
            "I": None,
            "EI": None,
            "z_norm": None,
            "p_norm": None,
            "p_sim": None,
            "significant": None,
            "n_valid": int(n_valid),
        }


# ---------------------------------------------------------------------------
# Local Moran's I (LISA)
# ---------------------------------------------------------------------------


def run_lisa(
    values: Any,
    w: Any,
    ordered_codes: list,
    Moran_Local: Any,
    np: Any,
    pd: Any,
    year: int,
    var_name: str,
) -> Any:
    """Compute local Moran's I (LISA) per PLR for a single variable.

    Anselin (1995), Geographical Analysis 27(2); spatial-methods.md §8.
    esda.Moran_Local(y, w, permutations=999, seed=42) — explicit per-call seed (R-C3).

    LISA quadrant labels (standard PySAL convention):
      q=1: HH (High-High) — cluster: high value surrounded by high neighbours
      q=2: LH (Low-High)  — outlier: low value surrounded by high neighbours
      q=3: LL (Low-Low)   — cluster: low value surrounded by low neighbours
      q=4: HL (High-Low)  — outlier: high value surrounded by low neighbours

    Only PLRs with p_sim < ALPHA receive a cluster/outlier label; others = 'ns'.
    """
    raw = values.astype(float)
    valid_mask = ~np.isnan(raw)
    n_valid = int(valid_mask.sum())
    if n_valid < 10:
        log.warning("LISA year=%d %s: only %d valid PLRs; skipping.", year, var_name, n_valid)
        return None

    y = np.where(valid_mask, raw, 0.0)

    try:
        # Anselin (1995); R-C3: explicit seed=42; permutations=999.
        ml = Moran_Local(y, w, permutations=PERMUTATIONS, seed=SEED)
    except Exception as e:
        log.error("Moran_Local failed year=%d %s: %s", year, var_name, e)
        return None

    _QUAD_LABEL = {1: "HH", 2: "LH", 3: "LL", 4: "HL"}
    lisa_labels = []
    for i in range(len(ordered_codes)):
        if not valid_mask[i]:
            lisa_labels.append("ns")
        elif ml.p_sim[i] < ALPHA:
            lisa_labels.append(_QUAD_LABEL.get(int(ml.q[i]), "ns"))
        else:
            lisa_labels.append("ns")

    result = pd.DataFrame(
        {
            "area_code": ordered_codes,
            "snapshot_year": year,
            "variable": var_name,
            "value": raw,
            "local_I": ml.Is,
            "lisa_pvalue": ml.p_sim,
            "lisa_label": lisa_labels,
        }
    )
    return result


# ---------------------------------------------------------------------------
# Spatial regression: OLS → LM diagnostics → spatial upgrade
# ---------------------------------------------------------------------------


def _na_to_float(val: Any) -> float:
    """Convert a pandas/Python scalar to float; return NaN for any NA-like value.

    pandas NAType (pd.NA) cannot be passed to float() directly.  We must use
    pd.isna() to detect it.  Handles: None, pd.NA, np.nan, numeric types.
    """
    try:
        if val is None:
            return float("nan")
        import pandas as _pd

        if _pd.isna(val):
            return float("nan")
        return float(val)
    except (TypeError, ValueError):
        return float("nan")


def _align_to_weights(
    panel_year: Any,
    ordered_codes: list,
    np: Any,
    y_col: str,
    x_cols: list[str],
) -> tuple[Any, Any, Any]:
    """Align panel_year to the weights matrix order.

    Returns (y_arr, X_arr, valid_mask) aligned to ordered_codes.
    Rows with NaN in y or any X are excluded (valid_mask=False).
    """
    code_to_row = {c: i for i, c in enumerate(panel_year["area_code"])}
    n = len(ordered_codes)

    y_arr = np.full(n, float("nan"))
    X_arr = np.full((n, len(x_cols)), float("nan"))

    for wi, code in enumerate(ordered_codes):
        if code in code_to_row:
            ri = code_to_row[code]
            row = panel_year.iloc[ri]
            y_arr[wi] = _na_to_float(row[y_col])
            for ci, col in enumerate(x_cols):
                X_arr[wi, ci] = _na_to_float(row.get(col))

    valid_mask = ~(np.isnan(y_arr) | np.any(np.isnan(X_arr), axis=1))
    return y_arr, X_arr, valid_mask


def run_ols_and_spatial(
    panel_year: Any,
    w: Any,
    ordered_codes: list,
    spreg: Any,
    np: Any,
    pd: Any,
    year: int,
) -> list[dict]:
    """Run OLS + LM diagnostics + spatial upgrade for a single year.

    Implements spatial-methods.md §8:
      1. Fit spreg.OLS with LM diagnostics.
      2. Inspect LM-lag (lm_lag) and LM-error (lm_error) diagnostics.
         If either is significant at α=0.05: upgrade to spatial model.
         Use ML_Lag if LM-lag is more significant; ML_Error if LM-error is
         more significant (Anselin–Florax LM decision rule, Anselin 1988).
      3. Report naive OLS and spatial model side by side.

    Regression specification: H1-type model (thesis p.55, e1_regressions.py):
      y = status_index (D1 MSS ordinal — used as a numeric proxy for OLS
          directional comparison only; not a formal metric regression; same
          licence as e1_regressions.py Spearman rank correlation tests,
          index-definition.md §3.2 ordinal-transition treatment).
      X = [total_poi_count, dynamism_score]
        total_poi_count: POI density predictor (thesis p.55 H1).
        dynamism_score:  C5-corrected POI dynamism (share-change z-score; D3 predictor).
                         Used in place of ewr_composite because the live lor_2021 panel
                         currently has ewr_composite = NULL for all rows (EWR data joins
                         only for lor_pre2021 editions currently available). This is the
                         within-dbt limitation flagged in fct_gentrification_change comments.
                         Both predictors are non-NULL for all inhabited lor_2021 PLRs.

    Returns a list of result dicts (one per model type: OLS, spatial).
    """
    results: list[dict] = []

    y_col = "status_index"
    x_cols = ["total_poi_count", "dynamism_score"]
    y_arr, X_arr, valid_mask = _align_to_weights(panel_year, ordered_codes, np, y_col, x_cols)

    n_valid = int(valid_mask.sum())
    if n_valid < 20:
        log.warning(
            "Regression year=%d: only %d valid PLRs after NA exclusion; skipping.", year, n_valid
        )
        return results

    # Subset to valid observations.
    y_valid = y_arr[valid_mask].reshape(-1, 1)
    X_valid = X_arr[valid_mask]

    # Build a row-subset of w for the valid PLRs only.
    valid_codes = [code for code, ok in zip(ordered_codes, valid_mask) if ok]
    w_subset = w.sparse[np.ix_(np.where(valid_mask)[0], np.where(valid_mask)[0])]
    try:
        import libpysal

        w_valid = libpysal.weights.WSP(w_subset, id_order=valid_codes).to_W()
        w_valid.transform = "r"
    except Exception as e:
        log.warning(
            "Could not build subset weights for year=%d regression: %s. "
            "Falling back to full weights matrix — result may be approximate.",
            year,
            e,
        )
        w_valid = w

    # --- Step 1: OLS with LM diagnostics (Anselin 1988; spatial-methods.md §8) ---
    try:
        ols = spreg.OLS(
            y_valid,
            X_valid,
            w=w_valid,
            name_y=y_col,
            name_x=x_cols,
            spat_diag=True,  # enables LM-lag and LM-error diagnostics
        )
    except Exception as e:
        log.error("OLS failed for year=%d: %s", year, e)
        return results

    # Extract LM diagnostics (spreg stores as dict: {stat, p_value}).
    lm_lag_p = ols.lm_lag[1] if hasattr(ols, "lm_lag") and ols.lm_lag is not None else None
    lm_err_p = ols.lm_error[1] if hasattr(ols, "lm_error") and ols.lm_error is not None else None

    # Moran's I on OLS residuals (spatial-methods.md §8 step 1).
    # spreg.OLS computes Moran's I on residuals when w is passed and spat_diag=True.
    moran_resid_I = None
    moran_resid_p = None
    if hasattr(ols, "moran_res") and ols.moran_res is not None:
        moran_resid_I = float(ols.moran_res[0])
        moran_resid_p = float(ols.moran_res[2])  # p-value

    # Build OLS betas for total_poi_count and dynamism_score.
    betas = ols.betas.flatten() if hasattr(ols, "betas") else []
    beta_intercept = float(betas[0]) if len(betas) > 0 else None
    beta_poi = float(betas[1]) if len(betas) > 1 else None
    beta_x2 = float(betas[2]) if len(betas) > 2 else None  # dynamism_score

    ols_ps = list(ols.t_stat) if hasattr(ols, "t_stat") else []
    p_intercept = float(ols_ps[0][1]) if len(ols_ps) > 0 else None
    p_poi = float(ols_ps[1][1]) if len(ols_ps) > 1 else None
    p_x2 = float(ols_ps[2][1]) if len(ols_ps) > 2 else None  # dynamism_score

    results.append(
        {
            "snapshot_year": year,
            "model_type": "OLS",
            "x2_var": "dynamism_score",
            "n": n_valid,
            "beta_poi_count": beta_poi,
            "p_poi_count": p_poi,
            "beta_x2": beta_x2,
            "p_x2": p_x2,
            "beta_intercept": beta_intercept,
            "p_intercept": p_intercept,
            "r2": float(ols.r2) if hasattr(ols, "r2") else None,
            "moran_resid_I": moran_resid_I,
            "moran_resid_p": moran_resid_p,
            "moran_resid_significant": (
                bool(moran_resid_p < ALPHA) if moran_resid_p is not None else None
            ),
            "lm_lag_stat": float(ols.lm_lag[0]) if lm_lag_p is not None else None,
            "lm_lag_p": float(lm_lag_p) if lm_lag_p is not None else None,
            "lm_error_stat": float(ols.lm_error[0]) if lm_err_p is not None else None,
            "lm_error_p": float(lm_err_p) if lm_err_p is not None else None,
            "spatial_model_needed": (
                bool(
                    (lm_lag_p is not None and lm_lag_p < ALPHA)
                    or (lm_err_p is not None and lm_err_p < ALPHA)
                )
            ),
            "rho": None,  # not applicable for OLS
            "lambda_": None,
        }
    )

    # --- Step 2: Spatial upgrade if LM diagnostics indicate autocorrelation ---
    # Anselin–Florax LM decision rule (Anselin 1988; spatial-methods.md §8):
    #   If LM-lag < LM-error p-value: prefer ML_Lag.
    #   If LM-error < LM-lag p-value: prefer ML_Error.
    #   If both significant or ambiguous: run both; prefer the one with lower AIC.
    spatial_needed = (lm_lag_p is not None and lm_lag_p < ALPHA) or (
        lm_err_p is not None and lm_err_p < ALPHA
    )

    if not spatial_needed:
        log.info(
            "Year=%d: LM diagnostics not significant — OLS is adequate (spatial-methods.md §8).",
            year,
        )
        return results

    # Determine model type via LM decision rule.
    use_lag = True  # default to spatial lag if ambiguous
    if lm_lag_p is not None and lm_err_p is not None:
        use_lag = lm_lag_p <= lm_err_p  # prefer lag when lag p-value is smaller

    model_type = "ML_Lag" if use_lag else "ML_Error"
    log.info(
        "Year=%d: LM diagnostics significant (lag_p=%s, err_p=%s) → upgrading to %s "
        "(Anselin 1988; spatial-methods.md §8).",
        year,
        f"{lm_lag_p:.4f}" if lm_lag_p is not None else "N/A",
        f"{lm_err_p:.4f}" if lm_err_p is not None else "N/A",
        model_type,
    )

    try:
        # Suppress spreg's default stdout summary print (noisy in batch runs).
        import io
        import contextlib

        _buf = io.StringIO()
        with contextlib.redirect_stdout(_buf):
            if use_lag:
                # Spatial-lag model: y = rho * W*y + X*beta + epsilon
                # Anselin (1988) — rho = spatial autoregressive parameter.
                spat_model = spreg.ML_Lag(
                    y_valid,
                    X_valid,
                    w=w_valid,
                    name_y=y_col,
                    name_x=x_cols,
                )
            else:
                # Spatial-error model: y = X*beta + u; u = lambda * W*u + epsilon
                # Anselin (1988) — lambda = spatial error parameter.
                spat_model = spreg.ML_Error(
                    y_valid,
                    X_valid,
                    w=w_valid,
                    name_y=y_col,
                    name_x=x_cols,
                )
    except Exception as e:
        log.error("Spatial model %s failed for year=%d: %s", model_type, year, e)
        return results

    s_betas = spat_model.betas.flatten() if hasattr(spat_model, "betas") else []
    # For ML_Lag: betas = [intercept, poi, x2, rho]; rho appended at end.
    # For ML_Error: betas = [intercept, poi, x2]; lambda separately.
    if use_lag and len(s_betas) == 4:
        sb_intercept, sb_poi, sb_x2, sb_rho = s_betas
        sb_lambda = None
    elif use_lag and len(s_betas) == 3:
        sb_intercept, sb_poi, sb_x2 = s_betas
        sb_rho = getattr(spat_model, "rho", None)
        sb_lambda = None
    elif not use_lag and len(s_betas) == 3:
        sb_intercept, sb_poi, sb_x2 = s_betas
        sb_rho = None
        sb_lambda = getattr(spat_model, "lam", None)
    else:
        sb_intercept = s_betas[0] if len(s_betas) > 0 else None
        sb_poi = s_betas[1] if len(s_betas) > 1 else None
        sb_x2 = s_betas[2] if len(s_betas) > 2 else None
        sb_rho = getattr(spat_model, "rho", None)
        sb_lambda = getattr(spat_model, "lam", None)

    # p-values from z_stat (ML models use asymptotic z, not t).
    s_zstats = list(spat_model.z_stat) if hasattr(spat_model, "z_stat") else []
    sp_intercept = float(s_zstats[0][1]) if len(s_zstats) > 0 else None
    sp_poi = float(s_zstats[1][1]) if len(s_zstats) > 1 else None
    sp_x2 = float(s_zstats[2][1]) if len(s_zstats) > 2 else None

    results.append(
        {
            "snapshot_year": year,
            "model_type": model_type,
            "x2_var": "dynamism_score",
            "n": n_valid,
            "beta_poi_count": float(sb_poi) if sb_poi is not None else None,
            "p_poi_count": sp_poi,
            "beta_x2": float(sb_x2) if sb_x2 is not None else None,
            "p_x2": sp_x2,
            "beta_intercept": float(sb_intercept) if sb_intercept is not None else None,
            "p_intercept": sp_intercept,
            "r2": float(spat_model.pr2) if hasattr(spat_model, "pr2") else None,
            "moran_resid_I": None,
            "moran_resid_p": None,
            "moran_resid_significant": None,
            "lm_lag_stat": None,
            "lm_lag_p": None,
            "lm_error_stat": None,
            "lm_error_p": None,
            "spatial_model_needed": True,
            "rho": float(sb_rho) if sb_rho is not None else None,
            "lambda_": float(sb_lambda) if sb_lambda is not None else None,
        }
    )

    return results


# ---------------------------------------------------------------------------
# Diffusion feature: spatial lag of status_index at t−1 (Dangschat 1988)
# ---------------------------------------------------------------------------


def run_diffusion_test(
    panel_df: Any,
    w: Any,
    ordered_codes: list,
    spreg: Any,
    np: Any,
    pd: Any,
) -> list[dict]:
    """Test the Dangschat (1988) invasion-succession diffusion hypothesis.

    Dangschat (1988): gentrification diffuses from pioneering Kieze into adjacent areas.
    A neighbour's gentrification status at t−1 raises the focal PLR's odds at t.

    Operationalization (spatial-methods.md §8; R-C2):
      Diffusion feature = W * status_index[t-1] (spatial lag of prior-year status).
      Regression: status_index[t] ~ W*status_index[t-1] + status_index[t-1] + dynamism_score[t-1]
        (controls: own prior status + POI dynamism baseline).
      Note: ewr_composite is NULL for all lor_2021 rows currently; dynamism_score_prev is used
      as the socio-economic/commercial control instead (both are non-NULL for lor_2021 PLRs).

    If the coefficient on W*status_index[t-1] is significant and positive (positive =
    more deprived neighbours → own status worsens), this supports the spatial contagion
    / frontier diffusion reading (Dangschat invasion-succession).

    D1 POLARITY (index-definition.md §5): status_index is INVERSE numeric — higher value =
    more deprived. A positive coefficient on W*status[t-1] means: more deprived neighbours
    at t-1 → own status worsens (higher status_index at t) → consistent with displacement
    pressure diffusion from deprived Kieze frontiers (Dangschat 1988 contagion).

    Tested per lor_2021 edition-pair (2021→2023, 2023→2025).

    Returns list of result dicts (one per edition-pair).
    """
    results: list[dict] = []

    years = sorted(panel_df["snapshot_year"].unique())
    # Test on consecutive lor_2021 edition pairs: (2021,2023), (2023,2025)
    edition_pairs = [(years[i], years[i + 1]) for i in range(len(years) - 1) if len(years) > 1]

    for t_prev, t_curr in edition_pairs:
        df_prev = panel_df[panel_df["snapshot_year"] == t_prev].copy()
        df_curr = panel_df[panel_df["snapshot_year"] == t_curr].copy()

        # Align to weights matrix order.
        code_prev = {c: i for i, c in enumerate(df_prev["area_code"])}
        code_curr = {c: i for i, c in enumerate(df_curr["area_code"])}

        n = len(ordered_codes)
        status_prev = np.full(n, float("nan"))
        status_curr = np.full(n, float("nan"))
        dyn_prev = np.full(n, float("nan"))  # dynamism_score as control (ewr_composite NULL)

        for wi, code in enumerate(ordered_codes):
            if code in code_prev:
                ri = code_prev[code]
                status_prev[wi] = _na_to_float(df_prev.iloc[ri]["status_index"])
                dyn_prev[wi] = _na_to_float(df_prev.iloc[ri]["dynamism_score"])
            if code in code_curr:
                ri = code_curr[code]
                status_curr[wi] = _na_to_float(df_curr.iloc[ri]["status_index"])

        # Compute the spatial lag: W * status_index[t-1] (row-standardized weights).
        # w.sparse is the scipy sparse weight matrix.
        try:
            w_sparse = w.sparse
            # Fill NaN with 0 for spatial lag multiplication.
            status_prev_fill = np.where(np.isnan(status_prev), 0.0, status_prev)
            w_lag = np.asarray(w_sparse.dot(status_prev_fill)).flatten()
        except Exception as e:
            log.error("Spatial lag computation failed for %d→%d: %s", t_prev, t_curr, e)
            continue

        # Build regression dataset: valid mask = all required variables non-NaN.
        # ewr_composite is NULL for lor_2021 rows; use dynamism_score as control instead.
        valid_mask = (
            ~np.isnan(status_prev) & ~np.isnan(status_curr) & ~np.isnan(dyn_prev) & ~np.isnan(w_lag)
        )
        # Note: w_lag from zero-filled status_prev will always be numeric, but PLRs
        # with all-zero neighbours (islands with status_prev=NaN) get w_lag=0 —
        # not truly missing. We additionally require status_prev to be non-NaN to
        # guard against spurious w_lag=0 for islands.
        n_valid = int(valid_mask.sum())
        if n_valid < 20:
            log.warning(
                "Diffusion test %d→%d: only %d valid PLRs; skipping.", t_prev, t_curr, n_valid
            )
            continue

        y_d = status_curr[valid_mask].reshape(-1, 1)
        X_d = np.column_stack(
            [
                w_lag[valid_mask],  # diffusion feature: W*status[t-1]
                status_prev[valid_mask],  # own prior status (control)
                dyn_prev[valid_mask],  # dynamism_score at t-1 (control; ewr_composite NULL)
            ]
        )
        x_names = ["W_status_prev", "status_prev", "dynamism_score_prev"]

        valid_codes = [code for code, ok in zip(ordered_codes, valid_mask) if ok]
        try:
            import libpysal

            w_subset_sparse = w.sparse[np.ix_(np.where(valid_mask)[0], np.where(valid_mask)[0])]
            w_valid = libpysal.weights.WSP(w_subset_sparse, id_order=valid_codes).to_W()
            w_valid.transform = "r"
        except Exception:
            w_valid = w

        try:
            ols_d = spreg.OLS(
                y_d,
                X_d,
                w=w_valid,
                name_y="status_index_curr",
                name_x=x_names,
                spat_diag=True,
            )
        except Exception as e:
            log.error("Diffusion OLS failed for %d→%d: %s", t_prev, t_curr, e)
            continue

        betas = ols_d.betas.flatten() if hasattr(ols_d, "betas") else []
        t_stats = list(ols_d.t_stat) if hasattr(ols_d, "t_stat") else []

        b_intercept = float(betas[0]) if len(betas) > 0 else None
        b_wlag = float(betas[1]) if len(betas) > 1 else None
        b_own = float(betas[2]) if len(betas) > 2 else None
        b_dyn = float(betas[3]) if len(betas) > 3 else None  # dynamism_score control

        p_wlag = float(t_stats[1][1]) if len(t_stats) > 1 else None
        p_own = float(t_stats[2][1]) if len(t_stats) > 2 else None
        p_dyn = float(t_stats[3][1]) if len(t_stats) > 3 else None  # dynamism_score control

        moran_resid_I = None
        moran_resid_p = None
        if hasattr(ols_d, "moran_res") and ols_d.moran_res is not None:
            moran_resid_I = float(ols_d.moran_res[0])
            moran_resid_p = float(ols_d.moran_res[2])

        results.append(
            {
                "edition_prev": t_prev,
                "edition_curr": t_curr,
                "n": n_valid,
                # Diffusion feature coefficient (Dangschat 1988 test):
                # positive = deprived neighbours at t-1 → focal PLR more deprived at t
                "beta_W_status_prev": b_wlag,
                "p_W_status_prev": p_wlag,
                "diffusion_significant": (bool(p_wlag < ALPHA) if p_wlag is not None else None),
                # Controls (dynamism_score_prev replaces ewr_composite: NULL for lor_2021 panel)
                "beta_status_prev": b_own,
                "p_status_prev": p_own,
                "beta_dyn_prev": b_dyn,
                "p_dyn_prev": p_dyn,
                "beta_intercept": b_intercept,
                "r2": float(ols_d.r2) if hasattr(ols_d, "r2") else None,
                "moran_resid_I": moran_resid_I,
                "moran_resid_p": moran_resid_p,
            }
        )

        # Log direction & significance for the diffusion hypothesis.
        direction = (
            "positive (supports diffusion)"
            if (b_wlag is not None and b_wlag > 0)
            else "negative (contradicts diffusion)"
        )  # noqa: E501
        sig = "significant" if (p_wlag is not None and p_wlag < ALPHA) else "not significant"
        log.info(
            "Diffusion test %d→%d: beta_W_status_prev=%.4f (%s, %s) "
            "— Dangschat (1988) contagion hypothesis: %s.",
            t_prev,
            t_curr,
            b_wlag if b_wlag is not None else float("nan"),
            direction,
            sig,
            "SUPPORTED"
            if (b_wlag is not None and b_wlag > 0 and p_wlag is not None and p_wlag < ALPHA)
            else "NOT SUPPORTED",  # noqa: E501
        )

    return results


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def _check_table(con: Any, table: str) -> bool:
    rows = con.execute(
        f"SELECT count(*) FROM information_schema.tables "  # noqa: S608
        f"WHERE table_schema='main' AND table_name='{table}'"
    ).fetchone()
    return bool(rows and rows[0] > 0)


def main() -> None:
    duckdb, np, pd, from_wkb, weights_mod, Moran, Moran_Local, spreg = _import_deps()

    if not Path(DUCKDB_PATH).exists():
        log.info(
            "DuckDB not found at %s. Set GENTRIDUCK_DB or run 'uv run poe build' first. "
            "Exiting cleanly (data-presence guard).",
            DUCKDB_PATH,
        )
        sys.exit(0)

    con = duckdb.connect(DUCKDB_PATH, read_only=True)
    try:
        con.execute("LOAD spatial;")
    except Exception:
        pass

    # Check required tables.
    required_tables = {"stg_berlin_lor", "fct_gentrification_change"}
    for tbl in required_tables:
        if not _check_table(con, tbl):
            log.info(
                "Required table '%s' not found. Run 'uv run poe build' first. Exiting cleanly.",
                tbl,
            )
            con.close()
            sys.exit(0)

    log.info("Loading PLR geometries (lor_2021, EPSG:25833) …")
    geom_df = load_geoms(con)

    log.info("Loading gentrification panel (fct_gentrification_change, lor_2021) …")
    panel_df = load_panel(con)
    con.close()

    if geom_df.empty:
        log.error("No PLR geometries found. Run: uv run poe ingest && uv run poe build")
        sys.exit(1)

    if panel_df.empty:
        log.warning("No panel data; exiting without writing output.")
        return

    # Build Queen contiguity weights (spatial-methods.md §6; ADR-0010 Required 1).
    log.info("Building Queen contiguity weights …")
    w, ordered_codes = build_queen_weights(geom_df, from_wkb, weights_mod)
    if w is None:
        log.error("Could not build spatial weights; exiting.")
        sys.exit(1)

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    years = sorted(panel_df["snapshot_year"].unique())
    log.info("A9 analysis: %d edition years: %s", len(years), years)

    def _build_arr(col: str, yr_df: Any, code_idx: dict, ordered_codes: list, np: Any) -> Any:
        """Extract a column aligned to ordered_codes (NaN if code missing or value NA)."""
        out = np.full(len(ordered_codes), float("nan"))
        for wi, code in enumerate(ordered_codes):
            if code in code_idx:
                ri = code_idx[code]
                out[wi] = _na_to_float(yr_df.iloc[ri][col])
        return out

    # ------------------------------------------------------------------
    # 1. Global Moran's I per year per variable (Moran 1950; §8)
    # ------------------------------------------------------------------
    all_moran: list[dict] = []

    for year in years:
        yr_df = panel_df[panel_df["snapshot_year"] == year]
        code_idx = {c: i for i, c in enumerate(yr_df["area_code"])}

        for var in ["status_index", "dynamism_score"]:
            values = _build_arr(var, yr_df, code_idx, ordered_codes, np)
            res = run_moran(values, w, Moran, np, f"{var}_{year}")
            res["snapshot_year"] = year
            res["variable"] = var
            all_moran.append(res)
            sig_str = "SIGNIFICANT" if res["significant"] else "not significant"
            log.info(
                "Moran's I year=%d %s: I=%.4f, p_sim=%.4f (%s)",
                year,
                var,
                res["I"] if res["I"] is not None else float("nan"),
                res["p_sim"] if res["p_sim"] is not None else float("nan"),
                sig_str,
            )

    moran_path = OUT_DIR / "a9_moran.csv"
    pd.DataFrame(all_moran).to_csv(moran_path, index=False)
    log.info("Moran's I results → %s", moran_path)

    # ------------------------------------------------------------------
    # 2. LISA per year per variable (Anselin 1995; §8)
    # ------------------------------------------------------------------
    for year in years:
        yr_df = panel_df[panel_df["snapshot_year"] == year]
        code_idx = {c: i for i, c in enumerate(yr_df["area_code"])}

        for var in ["status_index", "dynamism_score"]:
            values = _build_arr(var, yr_df, code_idx, ordered_codes, np)
            lisa_df = run_lisa(values, w, ordered_codes, Moran_Local, np, pd, year, var)
            if lisa_df is not None:
                lisa_path = OUT_DIR / f"a9_lisa_{var}_{year}.csv"
                lisa_df.to_csv(lisa_path, index=False)
                n_hh = (lisa_df["lisa_label"] == "HH").sum()
                n_ll = (lisa_df["lisa_label"] == "LL").sum()
                n_hl = (lisa_df["lisa_label"] == "HL").sum()
                n_lh = (lisa_df["lisa_label"] == "LH").sum()
                log.info(
                    "LISA year=%d %s: HH=%d LL=%d HL=%d LH=%d → %s",
                    year,
                    var,
                    n_hh,
                    n_ll,
                    n_hl,
                    n_lh,
                    lisa_path,
                )

    # ------------------------------------------------------------------
    # 3. Spatial regression per year (OLS + LM + spatial upgrade; §8)
    # ------------------------------------------------------------------
    all_reg: list[dict] = []

    for year in years:
        yr_df = panel_df[panel_df["snapshot_year"] == year].copy()
        reg_results = run_ols_and_spatial(yr_df, w, ordered_codes, spreg, np, pd, year)
        all_reg.extend(reg_results)

    if all_reg:
        reg_path = OUT_DIR / "a9_regression.csv"
        pd.DataFrame(all_reg).to_csv(reg_path, index=False)
        log.info("Regression results (OLS vs spatial) → %s", reg_path)

    # ------------------------------------------------------------------
    # 4. Diffusion feature test (Dangschat 1988; §8)
    # ------------------------------------------------------------------
    diff_results = run_diffusion_test(panel_df, w, ordered_codes, spreg, np, pd)
    if diff_results:
        diff_path = OUT_DIR / "a9_diffusion.csv"
        pd.DataFrame(diff_results).to_csv(diff_path, index=False)
        log.info("Diffusion feature results → %s", diff_path)

        # Print a summary of diffusion findings.
        print("\n" + "=" * 80)
        print("A9 DIFFUSION HYPOTHESIS — Dangschat (1988) Invasion-Succession Contagion")
        print("=" * 80)
        print(
            "D1 POLARITY: status_index inverse numeric (higher = more deprived; "
            "index-definition.md §5)."
        )
        print(
            "Positive beta_W_status_prev: deprived neighbours at t-1 "
            "→ focal PLR more deprived at t (supports diffusion)."
        )
        for r in diff_results:
            verdict = (
                "SUPPORTED"
                if (
                    r["beta_W_status_prev"] is not None
                    and r["beta_W_status_prev"] > 0
                    and r["diffusion_significant"]
                )
                else "NOT SUPPORTED"
            )
            beta_str = (
                f"{r['beta_W_status_prev']:.4f}" if r["beta_W_status_prev"] is not None else "N/A"
            )
            p_str = f"{r['p_W_status_prev']:.4f}" if r["p_W_status_prev"] is not None else "N/A"
            print(
                f"  {r['edition_prev']}→{r['edition_curr']}: "
                f"beta_W_status_prev={beta_str}, "
                f"p={p_str}, "
                f"n={r['n']} — {verdict}"
            )
        print()

    # ------------------------------------------------------------------
    # 5. Summary of Moran's I findings
    # ------------------------------------------------------------------
    print("=" * 80)
    print("A9 GLOBAL MORAN'S I — Spatial Autocorrelation in Gentrification Index")
    print("=" * 80)
    for r in all_moran:
        if r["I"] is not None:
            sig = "SIGNIFICANT" if r["significant"] else "not significant"
            print(
                f"  Year={r['snapshot_year']} {r['variable']}: "
                f"I={r['I']:.4f}, p_sim={r['p_sim']:.4f} ({sig}, n={r['n_valid']})"
            )
    print()

    log.info("a9_spatial_dynamic.py complete.")


if __name__ == "__main__":
    main()
