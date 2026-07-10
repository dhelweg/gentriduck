"""
analysis/e4_early_warning.py
=============================
A10-P1 (#80, Part 1 ONLY): early-warning displacement-risk indicator.

Answers: which precursors observable *now* (amenity/OA acceleration, socio-economic
baseline, spatial diffusion from neighbouring Kieze) predict an *elevated
displacement-pressure signal* at t+k (one MSS edition step = 2 years), validated
OUT-OF-TIME (fit on the earlier panel wave, evaluate on the strictly later wave --
never a random/k-fold split of pooled years).

SCOPE (binding, per issue #80 maintainer decision 2026-07-05/07-10): Part 1 ONLY --
a predictive, out-of-time-validated early-warning score. Part 2 (difference-in-
differences / event-study on Milieuschutz designation, #70) is explicitly OUT OF
SCOPE and parked; nothing here claims a causally identified treatment effect
(see "NOT A CAUSAL EFFECT" note below and docs/assessment/2018-thesis-critical-
assessment.md finding W3).

R-C2 GROUNDING CITATIONS (mandatory per CLAUDE.md grounding rule):
  Dangschat (1988), Gentrification -- die Aufwertung innenstadtnaher Wohnviertel --
    double invasion-succession cycle: social status change LEADS commercial/amenity
    succession, which in turn diffuses spatially from pioneering Kieze into adjacent
    areas. Operationalized three ways below: (a) amenity ACCELERATION as a precursor
    (the commercial-succession leg), (b) the D4 socio-economic baseline LEVEL as a
    vulnerability covariate (Doering & Ulbricht 2016), and (c) a spatial-lag
    "neighbour diffusion" feature (the invasion-succession contagion leg, same
    operationalization as analysis/a9_spatial_dynamic.py's diffusion test, Anselin
    1988/1995, Moran 1950).
  Freeman, L. & Braconi, F. (2004), "Gentrification and Displacement: New York City
    in the 1990s" -- commercial succession / turnover as a displacement-pressure
    correlate; frames why an accelerating (not just growing) amenity signal is the
    relevant precursor, not a bare level.
  index-definition.md Sec 1.3 / Sec 1.5 (D1xD2 stage matrix, ADR-0008): the
    `consolidation-pressure` typology stage is *explicitly* defined as "Elevated
    displacement-pressure signal, NOT confirmed displacement (G-1)" -- this is the
    ONLY existing column in this warehouse that is already named and governed as a
    displacement-*risk* construct, so the target here is DERIVED from it (see
    "TARGET DEFINITION" below) rather than inventing a new unmotivated construct
    (issue #80 explicit ask).
  index-definition.md Sec 1.2 G-1 guardrail (binding): "No stage may assert an
    unobserved displacement *event*." This script follows the same discipline:
    every output is labelled a *signal* / *elevated risk*, never "displacement
    occurred".
  index-definition.md Sec 2.4 (C5 completeness correction, binding) + docs/epic-c/
    C5-geo-signoff.md (PASS, 2026-06-19): the amenity-acceleration feature
    (`delta_dynamism_t`) is the already-C5-corrected column from
    `int_mss_lead_lag` (PLR-share normalised, not raw OSM count deltas) -- raw
    counts would conflate OSM coverage growth with real neighbourhood change.
  index-definition.md Sec 4.3 (D4 baseline discipline, binding): "D4 enters ONLY as
    a baseline LEVEL ... NO D4 delta columns in the predictor block (D4 changes are
    near-tautological outcome proxies)." The EWR/D4 "social" feature below
    (`ewr_composite_t`) is therefore a LEVEL, per this existing binding rule -- not
    a re-derived delta.
  ADR-0017 (Offering Advantage): `oa_mean` (mean of the 4 upscaling-relevant domain
    OA location-quotients, same construct as e1_regressions.py's
    `load_oa_category_panel`) gives a second, independently-computed amenity signal
    (compositional/location-quotient, not share-of-city-total like C5's
    `dynamism_score`) -- its own acceleration (`delta_oa_mean_annual_t`) is computed
    here directly from OA's *annual* panel (not gated to biennial MSS editions).
  Anselin (1988) Spatial Econometrics; Moran (1950) Biometrika 37(1); Anselin (1995)
    Geographical Analysis 27(2) -- Queen contiguity weights + spatial lag, same
    method as analysis/a9_spatial_dynamic.py (`build_queen_weights`, reused directly
    here to avoid re-deriving a second, possibly-inconsistent spatial-weights
    implementation).
  docs/assessment/2018-thesis-critical-assessment.md, finding W3 -- "Causal/temporal
    inference is suggestive, not identified." This script is the R-A10-P1 response
    to W3: it upgrades the *validation discipline* (out-of-time, not in-sample) but
    explicitly does NOT claim causal identification -- see "NOT A CAUSAL EFFECT".

TARGET DEFINITION (grounded; a judgment call flagged for geo-DS/domain-expert review):
  `typology_stage_tk in ('consolidation-pressure', 'active-gentrification')`, read
  from `int_gentrification_ts.typology_stage` at `snapshot_year = edition_tk`
  (int_mss_lead_lag does not itself expose the t+k typology, only status_index_tk /
  dynamik_index_tk components, so this script re-joins int_gentrification_ts
  directly -- same city_code/area_code/area_vintage/snapshot_year grain).
  `consolidation-pressure` is index-definition.md's own explicit "elevated
  displacement-pressure signal" cell (Sec 1.3). It is also very rare (0-9 PLRs per
  edition across the full panel -- see findings doc) -- too sparse on its own for a
  stable out-of-time AUC (0 positives in the 2019 test-edition target for the
  primary panel used here). `active-gentrification` ("mid status rising ... the
  heart of the upgrading process", Sec 1.3) is the Dangschat double-cycle stage
  immediately upstream of `consolidation-pressure` -- i.e. the stage that most often
  transitions INTO consolidation-pressure at a later edition. Combining the two
  gives a workable, still-rare positive rate (~7% train / ~3% test on the panel
  used here) while keeping the "elevated risk", not "confirmed displacement",
  framing (G-1). FLAG FOR REVIEW: this union is an interpretive choice, not
  dictated verbatim by any existing doc -- see the findings doc's "Judgment calls"
  section for the empirical sensitivity (it is nearly identical to
  `active-gentrification` alone on this specific panel, since
  `consolidation-pressure` has 0 rows in the test edition).

NOT A CAUSAL EFFECT: every number in this script's output is a PREDICTIVE
association from an out-of-time classifier. None of it is a difference-in-
differences, event-study, or otherwise causally identified estimate of a
displacement-*causing* mechanism (thesis W3; Part 2 of #80, DiD/event-study on
Milieuschutz #70, is explicitly parked and not attempted here). Treat the AUC/
calibration numbers as "how well do today's observable precursors rank areas by
future elevated-risk status", not "these precursors CAUSE displacement".

PANEL CHOICE (judgment call, flagged for review): this script uses the Berlin
`lor_pre2021` vintage (MSS editions 2013, 2015, 2017, 2019 -- 448 PLRs), fitting on
the 2015-edition predictor wave (-> outcome at 2017) and evaluating on the
STRICTLY LATER, held-out 2017-edition predictor wave (-> outcome at 2019). The
`lor_2021` ("current") vintage was considered but rejected for the PRIMARY model:
it only has 3 editions since the 2021 LOR reform (2021, 2023, 2025), so the
amenity-acceleration feature (`delta_dynamism_t`, needs a PRIOR edition) is null at
its very first edition (2021) -- there is no way to get two out-of-time waves with
that feature populated within the current-vintage panel yet (will become possible
once a 2027 edition lands). See the findings doc's "Panel choice" note for the full
reasoning, including why rent/price data (BRW/Mietspiegel) could not be included in
either vintage (a genuine, pre-existing data-density gap, not something this
ticket's scope authorizes fixing).

Dependencies: duckdb, numpy, pandas, shapely, libpysal, scikit-learn (all in
pyproject.toml; same set analysis/a9_spatial_dynamic.py already uses).
DB path: $GENTRIDUCK_DB env var or data/gentriduck.duckdb (default).

Usage:
  uv run python analysis/e4_early_warning.py
  # or via poe:
  uv run poe analysis
"""

from __future__ import annotations

import logging
import os
import sys
import warnings
from pathlib import Path
from typing import Any

warnings.filterwarnings("ignore")
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
log = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
_env_db = os.environ.get("GENTRIDUCK_DB")
# QA-7 (#182) convention: __file__-anchored so this script runs from any cwd.
_repo_root = Path(__file__).parent.parent
DUCKDB_PATH = Path(_env_db) if _env_db else _repo_root / "data" / "gentriduck.duckdb"

OUTPUT_MD = _repo_root / "docs" / "epic-e" / "E4-early-warning-findings.md"

# R-C3: explicit seed on every stochastic step (permutation test, sklearn solver).
SEED = 42
N_PERMUTATIONS = 999

# index-definition.md Sec 1.3/1.5 (ADR-0008 D1xD2 matrix): the two upgrading-process
# stages that jointly define "elevated displacement-pressure signal" for this script.
# See module docstring "TARGET DEFINITION" for the full grounding + judgment-call note.
TARGET_STAGES = ("consolidation-pressure", "active-gentrification")

# Panel choice (see module docstring): Berlin lor_pre2021, lag_k=1 only.
AREA_VINTAGE = "lor_pre2021"
TRAIN_EDITION_T = 2015  # -> outcome at edition_tk = 2017
TEST_EDITION_T = 2017  # -> outcome at edition_tk = 2019  (STRICTLY LATER than train)

FEATURE_COLS = [
    "status_index_t",  # own current D1 status LEVEL (baseline control)
    "dynamism_score_t",  # C5-corrected D3 amenity growth-rate LEVEL
    "delta_dynamism_t",  # C5-corrected D3 amenity ACCELERATION (index-definition.md Sec 2.4)
    "ewr_composite_t",  # D4 socio-economic baseline LEVEL (index-definition.md Sec 4.3, binding)
    "delta_oa_mean_annual_t",  # OA location-quotient ACCELERATION (ADR-0017)
    "w_lag_status_t",  # spatial lag of neighbour status (Dangschat 1988 diffusion)
    "w_lag_dynamism_t",  # spatial lag of neighbour amenity dynamism (Dangschat 1988 diffusion)
]


# ---------------------------------------------------------------------------
# Dependency imports (graceful, clear error messages -- same pattern as a9/e1/e2)
# ---------------------------------------------------------------------------


def _import_deps() -> tuple:
    missing = []
    try:
        import duckdb
    except ImportError:
        missing.append("duckdb")
        duckdb = None  # type: ignore[assignment]
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
        from sklearn.linear_model import LogisticRegression
        from sklearn.preprocessing import StandardScaler
        from sklearn.pipeline import Pipeline
        from sklearn.metrics import roc_auc_score, brier_score_loss
        from sklearn.calibration import calibration_curve
    except ImportError:
        missing.append("scikit-learn")
        LogisticRegression = StandardScaler = Pipeline = None  # type: ignore[assignment]
        roc_auc_score = brier_score_loss = calibration_curve = None  # type: ignore[assignment]

    if missing:
        log.error("Missing packages: %s. Run: uv sync", ", ".join(missing))
        sys.exit(1)

    return (
        duckdb,
        np,
        pd,
        from_wkb,
        weights_mod,
        LogisticRegression,
        StandardScaler,
        Pipeline,
        roc_auc_score,
        brier_score_loss,
        calibration_curve,
    )


def _import_queen_weights():
    """Reuse a9_spatial_dynamic.py's Queen-weights builder (same method, same repo
    convention) rather than re-deriving a second spatial-weights implementation.

    analysis/ is not a package; __file__'s own directory is on sys.path when this
    script is invoked directly (`python analysis/e4_early_warning.py` or
    `uv run poe analysis`), so the sibling-module import below works without a
    package/__init__.py. Falls back to a clear error if that assumption breaks
    (e.g. invoked from an unusual cwd) rather than failing silently.
    """
    sys.path.insert(0, str(Path(__file__).parent))
    try:
        from a9_spatial_dynamic import build_queen_weights
    except ImportError as e:
        log.error(
            "Could not import build_queen_weights from a9_spatial_dynamic.py "
            "(expected sibling module in analysis/): %s",
            e,
        )
        sys.exit(1)
    return build_queen_weights


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------


def load_lead_lag_base(con: Any, pd: Any) -> Any:
    """Predictor-side (time t) panel from int_mss_lead_lag: lag_k=1, Berlin
    lor_pre2021, the two editions this script's out-of-time split needs.

    int_mss_lead_lag already enforces (index-definition.md Sec 2.5, binding):
    within-vintage lag only, uninhabited-PLR exclusion at both t and t+k, and the
    C5 correction on dynamism_score/delta_dynamism_t (Sec 2.4). This script adds
    no new dbt model -- it reads this existing, already-gated intermediate as-is.
    """
    df = con.execute(f"""
        select
            area_code,
            lag_k,
            edition_t,
            edition_tk,
            status_index_t,
            dynamism_score_t,
            delta_dynamism_t,
            ewr_composite_t,
            typology_stage_t
        from int_mss_lead_lag
        where area_vintage = '{AREA_VINTAGE}'
          and lag_k = 1
          and edition_t in ({TRAIN_EDITION_T}, {TEST_EDITION_T})
        order by area_code, edition_t
    """).df()
    return df


def load_typology_tk(con: Any) -> Any:
    """Outcome-side (time t+k) typology stage, read directly from
    int_gentrification_ts (NOT re-derived here -- ADR-0008's typology_case is the
    single source of truth). int_mss_lead_lag exposes status_index_tk/
    dynamik_index_tk but not the combined typology_stage at t+k, so this script
    re-joins on the same (city_code, area_code, area_vintage, snapshot_year) grain
    int_mss_lead_lag itself uses for its `lagged` join.
    """
    df = con.execute(f"""
        select
            area_code,
            snapshot_year as edition_tk,
            typology_stage as typology_stage_tk
        from int_gentrification_ts
        where city_code = 'BER'
          and area_vintage = '{AREA_VINTAGE}'
        order by area_code, edition_tk
    """).df()
    return df


def load_oa_annual(con: Any) -> Any:
    """OA (Offering Advantage) domain-level location-quotients, ANNUAL grain
    (int_poi_offering_advantage is annual for lor_pre2021, 2008-2020 -- unlike the
    biennial MSS editions), 'standard' weight variant, 'faithful' methodology
    variant -- same construct as e1_regressions.py's load_oa_category_panel
    `oa_mean` (mean of the 4 upscaling-relevant domain OAs: Gastronomy,
    Entertainment, Retail, Services; geo-DS Condition C-3,
    docs/epic-b/A3-oa-validation-geo-signoff.md Sec 5).

    Annual grain lets this script compute a genuine ACCELERATION (year t vs year
    t-1) independent of the biennial MSS edition cadence, unlike delta_dynamism_t
    (which is only defined edition-to-edition).
    """
    df = con.execute(f"""
        select
            area_code,
            snapshot_year,
            max(oa_domain) filter (where poi_domain_h = 'Gastronomy')   as oa_domain_gastronomy,
            max(oa_domain) filter (where poi_domain_h = 'Entertainment') as oa_domain_entertainment,
            max(oa_domain) filter (where poi_domain_h = 'Retail')        as oa_domain_retail,
            max(oa_domain) filter (where poi_domain_h = 'Services')      as oa_domain_services
        from int_poi_offering_advantage
        where area_vintage = '{AREA_VINTAGE}'
          and weight_variant = 'standard'
          and methodology_variant = 'faithful'
        group by area_code, snapshot_year
    """).df()
    domain_cols = [
        "oa_domain_gastronomy",
        "oa_domain_entertainment",
        "oa_domain_retail",
        "oa_domain_services",
    ]
    df["oa_mean"] = df[domain_cols].mean(axis=1, skipna=True)
    return df[["area_code", "snapshot_year", "oa_mean"]]


def load_geometries(con: Any) -> Any:
    """PLR geometries for lor_pre2021 (EPSG:25833, WKB) -- same pattern as
    a9_spatial_dynamic.py's load_geoms, but for the pre-2021 vintage (a9 itself
    only loads lor_2021).
    """
    sql = f"""
        select
            area_code,
            ST_AsWKB(ST_GeomFromWKB(geometry_wkb)) as geom_wkb
        from stg_berlin_lor
        where geometry_wkb is not null
          and area_vintage = '{AREA_VINTAGE}'
        order by area_code
    """
    try:
        return con.execute(sql).df()
    except Exception as e:
        log.warning("Could not load lor_pre2021 LOR geometries: %s", e)
        import pandas as pd

        return pd.DataFrame(columns=["area_code", "geom_wkb"])


# ---------------------------------------------------------------------------
# Feature engineering
# ---------------------------------------------------------------------------


def add_oa_acceleration(base_df: Any, oa_annual: Any, pd: Any) -> Any:
    """delta_oa_mean_annual_t = oa_mean[edition_t] - oa_mean[edition_t - 1 year].

    ADR-0017 OA construct, annual difference (see module docstring). Left-merged
    twice (year t, year t-1); rows where either year is missing from the OA panel
    get NaN here (dropped downstream by the per-fold dropna, same convention as
    e1/e2's per-hypothesis NaN masking).
    """
    df = base_df.copy()
    df["edition_tm1"] = df["edition_t"] - 1

    oa_t = oa_annual.rename(columns={"snapshot_year": "edition_t", "oa_mean": "oa_mean_t"})
    oa_tm1 = oa_annual.rename(columns={"snapshot_year": "edition_tm1", "oa_mean": "oa_mean_tm1"})

    df = df.merge(
        oa_t[["area_code", "edition_t", "oa_mean_t"]], on=["area_code", "edition_t"], how="left"
    )
    df = df.merge(
        oa_tm1[["area_code", "edition_tm1", "oa_mean_tm1"]],
        on=["area_code", "edition_tm1"],
        how="left",
    )
    df["delta_oa_mean_annual_t"] = df["oa_mean_t"] - df["oa_mean_tm1"]
    return df.drop(columns=["edition_tm1"])


def add_spatial_diffusion(
    df: Any,
    geom_df: Any,
    from_wkb: Any,
    weights_mod: Any,
    np: Any,
    pd: Any,
    build_queen_weights: Any,
) -> Any:
    """w_lag_status_t / w_lag_dynamism_t: Queen-contiguity spatial lag of the
    neighbouring PLRs' CURRENT status_index_t / dynamism_score_t (Dangschat 1988
    diffusion; same weights-building method as a9_spatial_dynamic.py's
    build_queen_weights, reused directly -- see _import_queen_weights).

    Computed separately per edition_t (the two editions in this panel have
    slightly different non-null coverage), row-standardized weights, zero-filled
    NaN inputs for the lag multiplication (same convention as a9's run_diffusion_test
    -- islands/uninhabited PLRs contribute 0 to a neighbour's lag rather than
    propagating NaN through the whole weights matrix).
    """
    w, ordered_codes = build_queen_weights(geom_df, from_wkb, weights_mod)
    if w is None:
        log.warning("Could not build spatial weights -- w_lag_* features will be NaN.")
        df["w_lag_status_t"] = np.nan
        df["w_lag_dynamism_t"] = np.nan
        return df

    code_to_idx = {c: i for i, c in enumerate(ordered_codes)}
    w_sparse = w.sparse
    n = len(ordered_codes)

    def _lag_for_edition(sub: Any, col: str) -> dict:
        vals = np.zeros(n)
        for _, row in sub.iterrows():
            idx = code_to_idx.get(row["area_code"])
            if idx is not None and not pd.isna(row[col]):
                vals[idx] = row[col]
        lag = np.asarray(w_sparse.dot(vals)).flatten()
        out = {}
        for _, row in sub.iterrows():
            idx = code_to_idx.get(row["area_code"])
            if idx is not None:
                out[row["area_code"]] = lag[idx]
        return out

    parts = []
    for _edition_t, sub in df.groupby("edition_t"):
        sub = sub.copy()
        lag_status = _lag_for_edition(sub, "status_index_t")
        lag_dyn = _lag_for_edition(sub, "dynamism_score_t")
        sub["w_lag_status_t"] = sub["area_code"].map(lag_status)
        sub["w_lag_dynamism_t"] = sub["area_code"].map(lag_dyn)
        parts.append(sub)
    return pd.concat(parts, ignore_index=True)


def assemble_panel(
    con: Any, np: Any, pd: Any, from_wkb: Any, weights_mod: Any, build_queen_weights: Any
) -> Any:
    """Build the full (area_code, edition_t) panel with target + all FEATURE_COLS."""
    base = load_lead_lag_base(con, pd)
    tgt = load_typology_tk(con)
    oa_annual = load_oa_annual(con)
    geom_df = load_geometries(con)

    df = base.merge(tgt, on=["area_code", "edition_tk"], how="left")
    n_missing_target = df["typology_stage_tk"].isna().sum()
    if n_missing_target:
        log.warning(
            "%d/%d rows have no matching typology_stage_tk in int_gentrification_ts (dropped).",
            n_missing_target,
            len(df),
        )
    df = df[df["typology_stage_tk"].notna()].copy()

    df = add_oa_acceleration(df, oa_annual, pd)

    if not geom_df.empty:
        df = add_spatial_diffusion(df, geom_df, from_wkb, weights_mod, np, pd, build_queen_weights)
    else:
        df["w_lag_status_t"] = np.nan
        df["w_lag_dynamism_t"] = np.nan

    # TARGET DEFINITION -- see module docstring. G-1 guardrail: labelled
    # "elevated displacement-pressure signal", never "displacement occurred".
    df["y_elevated_risk"] = df["typology_stage_tk"].isin(TARGET_STAGES).astype(int)
    return df


# ---------------------------------------------------------------------------
# Modelling: out-of-time fit + evaluation
# ---------------------------------------------------------------------------


def make_classifier(StandardScaler: Any, LogisticRegression: Any, Pipeline: Any) -> Any:
    """Regularised LogisticRegression (StandardScaler + L2, C=1.0) -- identical
    recipe to e2_classification.py's make_classifier, for consistency across
    this repo's analysis/*.py classification scripts.
    """
    return Pipeline(
        [
            ("scaler", StandardScaler()),
            ("clf", LogisticRegression(C=1.0, max_iter=2000, random_state=SEED, solver="lbfgs")),
        ]
    )


def assert_temporal_order(train_edition_t: int, test_edition_t: int) -> None:
    """Out-of-time guard (R-C3 panel equivalent, CLAUDE.md's explicit ask that
    this NOT be a random split): the test predictor edition must be strictly
    LATER in calendar time than the train predictor edition. This is a runtime
    invariant, not a tunable option -- if it ever fails, the split silently
    degenerated into an in-time/random comparison.
    """
    assert test_edition_t > train_edition_t, (  # noqa: S101 -- R-C3-style out-of-time invariant
        f"NOT OUT-OF-TIME: test edition_t={test_edition_t} must be strictly later "
        f"than train edition_t={train_edition_t}"
    )


def run_permutation_test(
    y_test: Any, p_test: Any, roc_auc_score: Any, np: Any
) -> tuple[float, float]:
    """Label-permutation null for the observed test AUC (R-C3: explicit seed,
    999 permutations -- same discipline as a9_spatial_dynamic.py's Moran/LISA
    permutation tests). Returns (observed_auc, one_sided_p_value), where
    p_value = P(permuted AUC >= observed AUC) under random label reshuffling.
    """
    rng = np.random.default_rng(SEED)
    observed_auc = roc_auc_score(y_test, p_test)
    n_ge = 0
    y_arr = np.asarray(y_test)
    for _ in range(N_PERMUTATIONS):
        y_perm = rng.permutation(y_arr)
        if len(np.unique(y_perm)) < 2:
            continue
        auc_perm = roc_auc_score(y_perm, p_test)
        if auc_perm >= observed_auc:
            n_ge += 1
    p_value = (n_ge + 1) / (
        N_PERMUTATIONS + 1
    )  # +1 smoothing, standard permutation-test convention
    return float(observed_auc), float(p_value)


def fit_and_evaluate(
    df: Any,
    feature_cols: list[str],
    StandardScaler: Any,
    LogisticRegression: Any,
    Pipeline: Any,
    roc_auc_score: Any,
    brier_score_loss: Any,
    calibration_curve: Any,
    np: Any,
) -> dict:
    """Out-of-time fit: train on TRAIN_EDITION_T, evaluate on TEST_EDITION_T.

    Reports (per issue #80 explicit ask -- "report AUC/calibration, not just
    in-sample fit"):
      - train_auc (in-sample, on the training wave itself -- for contrast only,
        NOT the headline result)
      - test_auc (the headline out-of-time result)
      - test_brier (calibration, overall)
      - calibration_table (tercile bins: mean predicted vs observed positive rate)
      - permutation p-value for test_auc
      - standardized logistic coefficients (direction/magnitude, not causal)
    """
    assert_temporal_order(TRAIN_EDITION_T, TEST_EDITION_T)

    # R-C3 determinism: pin row order explicitly (belt-and-braces alongside the
    # `ORDER BY area_code, edition_t` in load_lead_lag_base/load_typology_tk) so
    # run_permutation_test's positional np.random shuffle of y_test/p_test is
    # byte-reproducible across independent fresh builds, not dependent on
    # whatever row order the upstream SELECTs/joins happened to return.
    df = df.sort_values(["edition_t", "area_code"]).reset_index(drop=True)

    train = df[df["edition_t"] == TRAIN_EDITION_T].dropna(subset=feature_cols).copy()
    test = df[df["edition_t"] == TEST_EDITION_T].dropna(subset=feature_cols).copy()

    n_train, n_pos_train = len(train), int(train["y_elevated_risk"].sum())
    n_test, n_pos_test = len(test), int(test["y_elevated_risk"].sum())

    log.info(
        "Train (edition_t=%d): n=%d, elevated-risk=%d (%.1f%%)",
        TRAIN_EDITION_T,
        n_train,
        n_pos_train,
        100 * n_pos_train / n_train if n_train else float("nan"),
    )
    log.info(
        "Test  (edition_t=%d): n=%d, elevated-risk=%d (%.1f%%)",
        TEST_EDITION_T,
        n_test,
        n_pos_test,
        100 * n_pos_test / n_test if n_test else float("nan"),
    )

    if n_train < 20 or n_test < 20 or n_pos_train < 5 or n_pos_test < 3:
        log.warning(
            "Too few rows/positives for a stable out-of-time fit (train n=%d pos=%d, "
            "test n=%d pos=%d) -- returning None.",
            n_train,
            n_pos_train,
            n_test,
            n_pos_test,
        )
        return {}

    clf = make_classifier(StandardScaler, LogisticRegression, Pipeline)
    clf.fit(train[feature_cols], train["y_elevated_risk"])

    p_train = clf.predict_proba(train[feature_cols])[:, 1]
    p_test = clf.predict_proba(test[feature_cols])[:, 1]

    train_auc = float(roc_auc_score(train["y_elevated_risk"], p_train))
    test_auc, perm_p = run_permutation_test(
        test["y_elevated_risk"].values, p_test, roc_auc_score, np
    )
    test_brier = float(brier_score_loss(test["y_elevated_risk"], p_test))

    # Calibration: tercile bins (n_bins=3 -- the ~3%-14-positive test fold is too
    # sparse for the usual decile binning to have >=1 positive per bin reliably).
    n_bins = 3
    try:
        obs_freq, pred_freq = calibration_curve(
            test["y_elevated_risk"], p_test, n_bins=n_bins, strategy="quantile"
        )
        calibration_table = [
            {"bin": i + 1, "mean_predicted": float(pf), "observed_rate": float(of)}
            for i, (pf, of) in enumerate(zip(pred_freq, obs_freq))
        ]
    except ValueError as e:
        log.warning("Calibration curve failed (%s) -- reporting Brier score only.", e)
        calibration_table = []

    coefs = dict(zip(feature_cols, clf.named_steps["clf"].coef_[0].tolist()))

    return {
        "n_train": n_train,
        "n_pos_train": n_pos_train,
        "n_test": n_test,
        "n_pos_test": n_pos_test,
        "train_auc": train_auc,
        "test_auc": test_auc,
        "test_auc_permutation_p": perm_p,
        "test_brier": test_brier,
        "calibration_table": calibration_table,
        "coefficients": coefs,
        "feature_cols": feature_cols,
    }


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------


def write_findings(results: dict) -> None:
    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_MD, "w") as f:
        f.write("# E4 Early-Warning Displacement-Risk Findings (A10-P1, #80)\n\n")
        f.write("- **Task:** out-of-time-validated early-warning indicator: precursors now -> ")
        f.write("elevated displacement-pressure signal at t+k\n")
        f.write("- **Issue:** #80 (A10-P1 ONLY -- DiD/event-study Part 2 parked on #70)\n")
        f.write("- **Method:** LogisticRegression (L2, StandardScaler), OUT-OF-TIME split ")
        f.write(f"(train edition_t={TRAIN_EDITION_T} -> test edition_t={TEST_EDITION_T}, ")
        f.write("strictly later in calendar time -- not a random/k-fold split)\n\n")

        f.write("## NOT A CAUSAL EFFECT\n\n")
        f.write(
            "Every number below is a **predictive association** from an out-of-time "
            "classifier. This is the R-A10-P1 response to thesis finding **W3** "
            '("causal/temporal inference is suggestive, not identified", '
            "docs/assessment/2018-thesis-critical-assessment.md): it upgrades the "
            "*validation discipline* (strictly-later held-out wave, not in-sample fit) "
            "but does **not** claim a causally identified displacement-causing effect. "
            "Part 2 of #80 (difference-in-differences / event-study on Milieuschutz "
            "designation, #70) is explicitly out of scope here and remains parked.\n\n"
        )

        f.write("## Target definition\n\n")
        f.write(
            "`y_elevated_risk = 1` if `typology_stage_tk` (from `int_gentrification_ts`, "
            "ADR-0008 D1xD2 matrix) is in `('consolidation-pressure', 'active-gentrification')`, "
            "else 0. `consolidation-pressure` is index-definition.md's own explicit "
            '"Elevated displacement-pressure signal, NOT confirmed displacement (G-1)" '
            "cell (Sec 1.3); `active-gentrification` is the immediately-upstream Dangschat "
            "(1988) double-cycle stage. G-1 guardrail preserved: this is a *signal*, never "
            "a claim that displacement occurred.\n\n"
        )

        f.write("## Panel + features\n\n")
        f.write(
            f"Berlin `lor_pre2021` vintage, lag_k=1 (`int_mss_lead_lag`). "
            f"Train predictor wave: edition_t={TRAIN_EDITION_T} (-> outcome at "
            f"edition_tk={TRAIN_EDITION_T + 2}). Test predictor wave: "
            f"edition_t={TEST_EDITION_T} (-> outcome at edition_tk={TEST_EDITION_T + 2}), "
            "strictly LATER than the train wave (out-of-time, R-C3-style temporal-order "
            "assertion in code).\n\n"
        )
        f.write("Features (see module docstring for full R-C2 citations):\n\n")
        f.write("| Feature | Precursor category | Grounding |\n")
        f.write("|---|---|---|\n")
        f.write("| `status_index_t` | baseline control | own current D1 status level |\n")
        f.write(
            "| `dynamism_score_t` | amenity acceleration (level) | C5-corrected D3, "
            "index-definition.md Sec 2.4 |\n"
        )
        f.write(
            "| `delta_dynamism_t` | amenity acceleration | C5-corrected D3 change, "
            "index-definition.md Sec 2.4 |\n"
        )
        f.write(
            "| `ewr_composite_t` | social / demographic baseline | D4 LEVEL only "
            "(index-definition.md Sec 4.3, binding -- no D4 deltas) |\n"
        )
        f.write(
            "| `delta_oa_mean_annual_t` | amenity/OA acceleration | ADR-0017 OA "
            "location-quotient, annual 2nd source independent of C5 |\n"
        )
        f.write(
            "| `w_lag_status_t`, `w_lag_dynamism_t` | neighbour/spatial diffusion | "
            "Dangschat (1988) contagion, Queen weights (a9_spatial_dynamic.py method) |\n\n"
        )

        if not results:
            f.write(
                "## Result\n\nInsufficient data (see console log) -- model was not fit. "
                "Run `uv run poe build` to populate the DuckDB warehouse first.\n"
            )
            return

        f.write("## Out-of-time result\n\n")
        f.write(
            f"| | Train (edition_t={TRAIN_EDITION_T}) | Test (edition_t={TEST_EDITION_T}, "
            "held out, later) |\n"
        )
        f.write("|---|---|---|\n")
        f.write(f"| n | {results['n_train']} | {results['n_test']} |\n")
        f.write(
            f"| positive (`y_elevated_risk=1`) | {results['n_pos_train']} "
            f"({100 * results['n_pos_train'] / results['n_train']:.1f}%) | "
            f"{results['n_pos_test']} ({100 * results['n_pos_test'] / results['n_test']:.1f}%) |\n"
        )
        f.write(
            f"| AUC | {results['train_auc']:.4f} (in-sample, NOT the headline result) | "
            f"**{results['test_auc']:.4f}** (out-of-time, headline) |\n"
        )
        f.write(f"| Brier score (test only) | -- | {results['test_brier']:.4f} |\n")
        f.write(
            f"| Permutation p-value (test AUC vs label-shuffled null, "
            f"{N_PERMUTATIONS} perms, seed={SEED}) | -- | {results['test_auc_permutation_p']:.4f} |\n\n"
        )

        auc = results["test_auc"]
        if auc >= 0.65:
            verdict = "Out-of-time AUC suggests a genuine, generalizing early-warning signal."
        elif auc >= 0.55:
            verdict = "Out-of-time AUC is weakly above chance -- a marginal, not strong, signal."
        elif auc >= 0.45:
            verdict = (
                "Out-of-time AUC is essentially at chance -- these precursors do NOT "
                "reliably rank areas by future elevated-risk status on this panel."
            )
        else:
            verdict = (
                "Out-of-time AUC is BELOW chance -- the model performs worse than random "
                "on the held-out wave. This is reported as observed, not tuned away; see "
                "Limitations for candidate explanations (rare positive class, single-wave "
                "train, only 2 editions of history)."
            )
        f.write(f"**Verdict:** {verdict}\n\n")

        if results["train_auc"] - auc > 0.15:
            f.write(
                f"**Overfitting note:** in-sample AUC ({results['train_auc']:.4f}) exceeds "
                f"out-of-time AUC ({auc:.4f}) by more than 0.15 -- the in-sample fit "
                "substantially overstates genuine predictive power, exactly the failure "
                "mode out-of-time validation exists to catch (cf. thesis W2, overfitting; "
                "docs/assessment/2018-thesis-critical-assessment.md).\n\n"
            )

        if results["calibration_table"]:
            f.write("### Calibration (test fold, tercile bins)\n\n")
            f.write("| Bin | Mean predicted P(elevated risk) | Observed rate |\n")
            f.write("|---|---|---|\n")
            for row in results["calibration_table"]:
                f.write(
                    f"| {row['bin']} | {row['mean_predicted']:.4f} | {row['observed_rate']:.4f} |\n"
                )
            f.write("\n")

        f.write("### Standardized logistic coefficients (direction/magnitude, NOT causal)\n\n")
        f.write("| Feature | Coefficient |\n|---|---|\n")
        for feat, coef in results["coefficients"].items():
            f.write(f"| `{feat}` | {coef:+.4f} |\n")
        f.write("\n")

        f.write("## Judgment calls flagged for geo-DS / domain-expert review\n\n")
        f.write(
            "1. **Target union** (`consolidation-pressure` OR `active-gentrification`): "
            "an interpretive combination, not dictated verbatim by any existing doc. "
            "`consolidation-pressure` alone has 0 rows in the 2019 test-edition target on "
            "this panel (too rare to test standalone), so the union is empirically nearly "
            "identical here to `active-gentrification` alone (differs by only the 2 "
            "consolidation-pressure PLRs in the 2017 training-edition target). Scrutinize "
            "whether this union is the right displacement-risk operationalization, or "
            "whether `consolidation-pressure` alone should be revisited once a longer panel "
            "(more editions) gives it a non-zero test-fold count.\n"
        )
        f.write(
            "2. **Panel choice** (`lor_pre2021`, not the current `lor_2021` panel): "
            "chosen because `lor_2021` only has 3 editions since the 2021 LOR reform, so "
            "`delta_dynamism_t` (needs a PRIOR edition) is null at its very first edition "
            "(2021) -- no way to get two out-of-time waves with that feature populated yet. "
            "This will become possible once a 2027 `lor_2021` edition lands. Using the "
            "thesis-era panel instead means results describe 2015-2019 Berlin, not the "
            "current 2021-2025 state -- scrutinize whether this generalizes.\n"
        )
        f.write(
            "3. **Rent/price acceleration was NOT included** (issue #80 names it as a "
            "precursor category). `mart_price_rent_dimension`/`_pre2021`'s `est_rent_mid` "
            "(the only Wohnlage/Mietspiegel-modelled rent estimate in this pipeline) IS "
            "populated for `snapshot_year` in (2023, 2024, 2026) in BOTH vintages (NULL for "
            "2017-2022) -- verified against the live warehouse -- so 2023->2024 ARE two "
            "consecutive non-null years, and a first-difference rent feature is computable "
            "in principle on that later window. The actual blocker is a TEMPORAL-"
            "AVAILABILITY MISMATCH with this script's panel, not a lack of any two "
            "consecutive years: this script's predictor wave is edition_t=2015 (outcome at "
            "edition_tk=2017/2019), but `est_rent_mid` has no data before 2023 -- rent data "
            "from 2023 onward cannot retroactively serve as a 'time t' predictor for a "
            "2015/2017-edition panel. `brw_weighted_avg_eur_m2` (land value, populated "
            "annually 2017-2024 in both vintages) WAS considered as a substitute, but it "
            "only has enough lead time (3 consecutive years before an MSS edition) for the "
            "`lor_2021` panel's 2021/2023 editions, which conflicts with judgment call #2 "
            "above (the amenity/OA-acceleration features are only available on "
            "`lor_pre2021`). This is a genuine, pre-existing data-density/temporal-coverage "
            "gap (Wohnlage/Mietspiegel ingestion vintage coverage, ADR-0003 P-B) -- not "
            "something this ticket's scope authorizes fixing (would need new ingestion, a "
            "new-data-source decision requiring architect sign-off per CLAUDE.md). Flagging "
            "rather than substituting a weaker, unrelated proxy.\n"
        )
        f.write(
            '4. **`ewr_composite_t` as "social in-movement"**: per index-definition.md '
            "Sec 4.3 (binding), D4 enters ONLY as a baseline LEVEL, never a delta -- so "
            "this feature captures the CURRENT socio-economic vulnerability composition, "
            'not literally "in-movement" (a rate). Consistent with the existing binding '
            'rule, but worth double-checking it satisfies the issue\'s "social in-movement" '
            "intent as well as a genuine (currently unavailable) migration-turnover rate "
            "would.\n"
        )
        f.write(
            "5. **Spatial autocorrelation in the AUC estimate**: PLR observations are not "
            "independent (Tobler's first law; spatial-methods.md Sec 8) -- the reported "
            "test-fold AUC/permutation p-value do not correct for spatial clustering of "
            "errors among neighbouring PLRs, unlike a9_spatial_dynamic.py's spatial-HAC "
            "regression diagnostics (out of scope for a classifier AUC; flagging as a "
            "known limitation, not a correction attempted here).\n\n"
        )

        f.write("## Limitations\n\n")
        f.write(
            "- **Single train/test wave pair**: only ONE out-of-time train->test comparison "
            "is possible with the current 4-edition `lor_pre2021` panel (2013, 2015, 2017, "
            "2019) once the first edition (2013, missing full `ewr_composite`/`delta_dynamism_t`) "
            "is excluded -- see module docstring. This is a single replication, not a "
            "distribution of out-of-time AUCs; treat the reported AUC as one draw, not a "
            "stable estimate with a tight confidence interval.\n"
        )
        f.write(
            "- **Rare positive class**: the test fold has a small number of positive rows "
            "(see table above) -- AUC estimates with this few positives have wide sampling "
            "variance; the permutation test above is the honest way to read whether the "
            "point estimate is distinguishable from chance, not the point estimate alone.\n"
        )
        f.write(
            "- **k=1 only**: this script does not test k=2 (2015->2019 in this vintage) or "
            "the `lor_2021` panel's own transitions; a future re-run once more editions "
            "accumulate could extend this.\n"
        )
        f.write(
            "- **Epic B framing**: directional/exploratory revival work (CLAUDE.md); exact "
            "AUC reproduction against any prior number is not the bar -- honest reporting "
            "of the observed out-of-time AUC (including a below-chance result, if that is "
            "what is observed) is.\n"
        )


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def _check_tables(con: Any, tables: set[str]) -> set[str]:
    existing = {
        row[0]
        for row in con.execute(
            "SELECT table_name FROM information_schema.tables WHERE table_schema='main'"
        ).fetchall()
    }
    return tables - existing


def main() -> None:
    (
        duckdb,
        np,
        pd,
        from_wkb,
        weights_mod,
        LogisticRegression,
        StandardScaler,
        Pipeline,
        roc_auc_score,
        brier_score_loss,
        calibration_curve,
    ) = _import_deps()
    build_queen_weights = _import_queen_weights()

    if not DUCKDB_PATH.exists():
        log.info(
            "DuckDB not found at %s. Set GENTRIDUCK_DB or run 'uv run poe build' first. "
            "Exiting cleanly (data-presence guard).",
            DUCKDB_PATH,
        )
        sys.exit(0)

    con = duckdb.connect(str(DUCKDB_PATH), read_only=True)
    try:
        con.execute("LOAD spatial;")
    except Exception:  # noqa: S110 -- best-effort load, absence handled downstream
        pass

    required = {
        "int_mss_lead_lag",
        "int_gentrification_ts",
        "int_poi_offering_advantage",
        "stg_berlin_lor",
    }
    missing = _check_tables(con, required)
    if missing:
        log.info("Required tables missing: %s. Run 'uv run poe build' first.", missing)
        con.close()
        sys.exit(0)

    log.info(
        "Assembling %s panel (lag_k=1, editions %d/%d)...",
        AREA_VINTAGE,
        TRAIN_EDITION_T,
        TEST_EDITION_T,
    )
    df = assemble_panel(con, np, pd, from_wkb, weights_mod, build_queen_weights)
    con.close()

    if df.empty:
        log.warning("No panel rows assembled; exiting without writing output.")
        write_findings({})
        return

    log.info("Fitting out-of-time model (train=%d, test=%d)...", TRAIN_EDITION_T, TEST_EDITION_T)
    results = fit_and_evaluate(
        df,
        FEATURE_COLS,
        StandardScaler,
        LogisticRegression,
        Pipeline,
        roc_auc_score,
        brier_score_loss,
        calibration_curve,
        np,
    )

    print("\n" + "=" * 80)
    print("E4 EARLY-WARNING DISPLACEMENT-RISK -- OUT-OF-TIME VALIDATION (A10-P1, #80)")
    print("=" * 80)
    if results:
        print(
            f"Train (edition_t={TRAIN_EDITION_T}): n={results['n_train']}, pos={results['n_pos_train']}"
        )
        print(
            f"Test  (edition_t={TEST_EDITION_T}): n={results['n_test']}, pos={results['n_pos_test']}"
        )
        print(f"In-sample (train) AUC:      {results['train_auc']:.4f}")
        print(f"OUT-OF-TIME (test) AUC:     {results['test_auc']:.4f}  <-- headline result")
        print(f"Test Brier score:           {results['test_brier']:.4f}")
        print(
            f"Permutation p-value:        {results['test_auc_permutation_p']:.4f} "
            f"({N_PERMUTATIONS} perms, seed={SEED})"
        )
        print("NOT A CAUSAL EFFECT -- see docs/epic-e/E4-early-warning-findings.md.")
    else:
        print("Insufficient data to fit -- see log above.")
    print()

    write_findings(results)
    log.info("Findings written to: %s", OUTPUT_MD)


if __name__ == "__main__":
    main()
