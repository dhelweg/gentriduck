"""
analysis/e1_regressions.py
==========================
E1 thesis validation: H1-H3c regressions — real hypotheses, POI predictors, lead-lag.

Implements the five hypotheses from the 2018 Berlin gentrification thesis (pp. 55-56, p. 91):

  H1  (p.55): POI supply (OSM stock) positively correlates with current MSS social status.
              Thesis confirmed (AUC 0.87 cross-section). Sub-hypothesis H1b: fast-food
              negative predictor (thesis p.55).
  H2  (p.55): Current POI stock predicts *future* social-status change (directional).
  H3a (p.91): POI change *leads* status change — REJECTED by thesis.
  H3b (p.91): Status change *leads* POI change — CONFIRMED by thesis.
  H3c (p.91): Simultaneous co-movement — thesis result unclear.

For the Gentriduck revival the primary validation criterion is directional agreement
(same sign / direction as thesis expectation), consistent with the Epic B framing
(directional revival — exact number reproduction is not required).

Data tables used:
  * stg_thesis_2018_result_plr  — 2018 golden PLR data (status_index, dynamism_index,
                                   own_idx_class_bi); 436 PLR rows.
  * int_poi_features_pivot       — PLR-level POI category counts by snapshot year;
                                   joined on LPAD(raum_id, 8, '0') = area_code, year=2018,
                                   vintage='lor_pre2021'.
  * int_mss_lead_lag             — MSS lead-lag panel with lag_k=1,2; used for H3a/H3b/H3c.
  * int_poi_features_pivot (2021, 2023, 2025) — joined to lead-lag on area_code + edition.

Dependencies: duckdb, scipy, numpy (all in pyproject.toml).
DB path: $GENTRIDUCK_DB env var or data/gentriduck.duckdb (default).

Usage:
  uv run python analysis/e1_regressions.py
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
    from scipy import stats
except ImportError:
    print("ERROR: scipy/numpy not installed. Run: uv sync")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

_env_db = os.environ.get("GENTRIDUCK_DB")
DUCKDB_PATH = (
    Path(_env_db) if _env_db else Path(__file__).parent.parent / "data" / "gentriduck.duckdb"
)
OUTPUT_MD = Path(__file__).parent.parent / "docs" / "epic-e" / "E1-regression-findings.md"

# Thesis hypotheses and expected directions — derived from pp. 55-56, p. 91 of the
# 2018 Berlin gentrification thesis.  "positive" means rho/beta > 0 is expected.
# Thesis p.55 H1: POI stock ~ MSS status — positive; AUC 0.87
# Thesis p.55 H1b: fast-food ~ status — NEGATIVE (fast-food is a displacement indicator)
# Thesis p.55 H2: POI stock → future status — positive (directional)
# Thesis p.91 H3a: ΔPOI_t leads Δstatus_t+k — REJECTED (rho not significant in thesis)
# Thesis p.91 H3b: Δstatus_t leads ΔPOI_t+k — CONFIRMED (rho positive, significant)
# Thesis p.91 H3c: simultaneous co-movement — UNCLEAR
THESIS_HYPOTHESES: dict[str, dict] = {
    "H1": {
        # D1 POLARITY: status_index is inverse-numeric — higher value = lower social status
        # (index-definition.md §5 polarity table; int_mss_lead_lag.sql lines 19-23).
        # Thesis found POI supply positively correlates with social STATUS, which means
        # negatively correlates with status_index (more POIs → better status → lower index).
        # expected_dir = "negative" for raw Spearman(poi_count, status_index).
        "desc": "POI stock (total_poi_count) ~ MSS social status (status_index)",
        "citation": "Thesis p.55: POI supply positively correlates with social status; because status_index is inverse-numeric (higher=worse, index-definition.md §5 polarity table), expected Spearman(poi, status_index) is negative",
        "expected_dir": "negative",
        "expected_sig": True,
    },
    "H1b": {
        # D1 POLARITY: fast-food is a contested proxy for low-status / displacement pressure
        # (thesis p.55; see also gentrification literature caveat).
        # More fast-food → lower social status → higher status_index → positive correlation.
        # expected_dir = "positive" for Spearman(poi_fast_food, status_index).
        "desc": "Fast-food POI count ~ MSS social status (status_index)",
        "citation": "Thesis p.55 H1b: fast-food as contested proxy for low-status / displacement pressure (see gentrification literature); more fast-food → lower status → higher status_index (inverse-numeric, index-definition.md §5), expected direction positive",
        "expected_dir": "positive",
        "expected_sig": True,
    },
    "H2": {
        # D1 POLARITY: delta_status_ordinal = status_index_tk - status_index_t.
        # Positive delta → status worsened (index increased). Negative delta → improved.
        # More POI at t → gentrification pressure → status IMPROVES → delta_status_ordinal < 0.
        # expected_dir = "negative" for Spearman(poi_count_t, delta_status_ordinal).
        "desc": "Current-edition POI stock (2021+ editions) ~ future status change (delta_status_ordinal)",
        "citation": "Thesis p.55 H2: current POI supply predicts future social-status improvement; delta_status_ordinal = tk - t (positive = worsened, index-definition.md §5 polarity), so expected direction is negative",
        "expected_dir": "negative",
        "expected_sig": False,  # directional only; thesis did not confirm significance for H2 in isolation
    },
    "H3a": {
        # D1 POLARITY + C5: delta_dynamism_t (C5-corrected) leads delta_status_ordinal.
        # More amenity growth (positive delta_dynamism) → gentrification → status improves
        # → delta_status_ordinal decreases (inverse-numeric). Expected direction: negative.
        "desc": "C5-corrected Δdynamism at t leads Δstatus at t+k (POI change leads status change)",
        "citation": "Thesis p.91 H3a: POI change leads status change — REJECTED in thesis (not confirmed); uses C5-corrected delta_dynamism_t (index-definition.md §2.4; int_mss_lead_lag.sql D3 C5 note); delta_status_ordinal inverse-numeric so expected direction is negative",
        "expected_dir": "negative",
        "expected_sig": False,  # thesis rejected this
    },
    "H3b": {
        # D1 POLARITY: Δstatus leads ΔPOI. Status IMPROVES (delta_status_ordinal < 0) →
        # commercial succession follows → delta_poi > 0. So Spearman(delta_status_ordinal, delta_poi)
        # should be negative (lower delta_status_ordinal = improved = leads to more POIs).
        "desc": "Δstatus at t leads Δdynamism at t+k (status change leads POI change)",
        "citation": "Thesis p.91 H3b: status change leads POI change — CONFIRMED in thesis; delta_status_ordinal inverse-numeric (index-definition.md §5 polarity), improved status = negative delta, expected Spearman(delta_status_ordinal, delta_dynamism) is negative",
        "expected_dir": "negative",
        "expected_sig": True,
    },
    "H3c": {
        # D1 POLARITY: dynamism_score_t ~ status_index_t. Higher dynamism → more gentrified
        # → better status → lower status_index (inverse-numeric). Expected direction: negative.
        "desc": "Simultaneous dynamism ~ status_index co-movement (same edition)",
        "citation": "Thesis p.91 H3c: simultaneous co-movement — thesis result unclear; status_index inverse-numeric (index-definition.md §5), expected direction negative",
        "expected_dir": "negative",
        "expected_sig": False,  # unclear per thesis
    },
}


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------


def load_h1_h2_data(con: duckdb.DuckDBPyConnection) -> object:
    """Load PLR-level 2018 golden data joined with POI category counts for H1/H2.

    Join key: LPAD(raum_id, 8, '0') = area_code (thesis IDs are 7-char; pivot is 8-char zero-padded).
    Snapshot year 2018, vintage lor_pre2021 matches the thesis data collection period.
    """
    # Thesis p.55: core POI features — cafes, bars, restaurants, fast-food, nightlife,
    # hairdressers (upscaling proxies); fast-food is negative per H1b.
    df = con.execute("""
        SELECT
            t.raum_id                  AS area_code,
            t.status_index,
            t.dynamism_index,
            t.own_idx_class_bi,
            p.total_poi_count,
            COALESCE(p.poi_cafe, 0)        AS poi_cafe,
            COALESCE(p.poi_bar, 0)         AS poi_bar,
            COALESCE(p.poi_restaurant, 0)  AS poi_restaurant,
            COALESCE(p.poi_fast_food, 0)   AS poi_fast_food,
            COALESCE(p.poi_nightlife, 0)   AS poi_nightlife,
            COALESCE(p.poi_hairdresser, 0) AS poi_hairdresser,
            COALESCE(p.poi_clothing, 0)    AS poi_clothing,
            COALESCE(p.poi_beauty, 0)      AS poi_beauty
        FROM main.stg_thesis_2018_result_plr t
        JOIN main.int_poi_features_pivot p
            ON LPAD(t.raum_id, 8, '0') = p.area_code
            AND p.snapshot_year = 2018
            AND p.area_vintage = 'lor_pre2021'
        WHERE t.area_level = 'plr'
          AND t.status_index IS NOT NULL
          AND p.total_poi_count IS NOT NULL
    """).df()
    return df


def load_ewr_lead_lag_data(con: duckdb.DuckDBPyConnection) -> object:
    """Load EWR lead-lag panel joined with POI counts for same-era H2/H3 comparison.

    Uses int_ewr_lead_lag (annual, lor_2021 vintage, 2014-2020).
    k=2 (2014→2016) matches the thesis lead-lag gap exactly.
    delta_ewr is a metric z-score delta — OLS and Spearman both valid.

    EWR composite polarity: higher = more socio-economically vulnerable (more deprived).
    More POI at t → gentrification pressure → EWR composite DECREASES → delta_ewr < 0.
    Expected direction for H2/H3a/H3b/H3c: negative.

    POI join strategy (vintage bridge):
    int_poi_features_pivot for years < 2021 uses lor_pre2021 area_codes (448 PLRs).
    int_ewr_lead_lag uses lor_2021 area_codes (542 PLRs, crosswalked).
    To bridge: use seed_lor_crosswalk_2006_to_2021 with the dominant (max-weight) pre-2021
    PLR for each lor_2021 PLR. All 542 lor_2021 PLRs resolve to a dominant pre-2021 PLR
    and receive a non-zero poi_count — no PLR falls through to the COALESCE(0) sentinel.

    Pseudo-replication caveat: ~78 pre-2021 PLRs are the dominant match for 2+ lor_2021
    PLRs (up to 6 each), meaning ~35% of lor_2021 PLRs share their poi_count_t with at
    least one neighbour. This inflates effective N and may overstate p-value precision.
    Treat EWR regression results as directional evidence, not independent-observation
    p-values.
    """
    df = con.execute("""
        WITH
        -- Dominant pre-2021 PLR for each 2021 PLR (max-weight crosswalk entry).
        -- Used to bridge POI data (lor_pre2021) to EWR data (lor_2021).
        xw_dominant AS (
            SELECT plr_id_2021, plr_id_pre2021
            FROM (
                SELECT plr_id_2021, plr_id_pre2021,
                       ROW_NUMBER() OVER (
                           PARTITION BY plr_id_2021 ORDER BY weight DESC
                       ) AS rn
                FROM main_seeds.seed_lor_crosswalk_2006_to_2021
            )
            WHERE rn = 1
        )
        SELECT
            ll.area_code,
            ll.lag_k,
            ll.year_t,
            ll.year_tk,
            ll.ewr_composite_t,
            ll.ewr_composite_tk,
            ll.delta_ewr,
            ll.delta_ewr_t,
            -- POI via pre-2021 crosswalk (all EWR years are 2014-2020, so lor_pre2021 only).
            -- Dominant PLR crosswalk: every lor_2021 PLR maps to exactly one lor_pre2021 PLR.
            COALESCE(p_t_pre.total_poi_count, 0)   AS poi_count_t,
            COALESCE(p_tk_pre.total_poi_count, 0)  AS poi_count_tk,
            COALESCE(p_tk_pre.total_poi_count, 0) - COALESCE(p_t_pre.total_poi_count, 0) AS delta_poi
        FROM main.int_ewr_lead_lag ll
        LEFT JOIN xw_dominant xw ON ll.area_code = xw.plr_id_2021
        -- lor_pre2021 crosswalk join: maps lor_2021 EWR area_code → lor_pre2021 POI area_code
        LEFT JOIN main.int_poi_features_pivot p_t_pre
            ON xw.plr_id_pre2021 = p_t_pre.area_code
            AND ll.year_t = p_t_pre.snapshot_year
            AND p_t_pre.area_vintage = 'lor_pre2021'
        LEFT JOIN main.int_poi_features_pivot p_tk_pre
            ON xw.plr_id_pre2021 = p_tk_pre.area_code
            AND ll.year_tk = p_tk_pre.snapshot_year
            AND p_tk_pre.area_vintage = 'lor_pre2021'
    """).df()
    return df


def load_lead_lag_data(con: duckdb.DuckDBPyConnection, vintage: str = "lor_2021") -> object:
    """Load MSS lead-lag panel joined with POI pivot counts for H3a/H3b/H3c.

    int_mss_lead_lag provides lag_k=1,2 MSS edition pairs.
    int_poi_features_pivot is joined at edition_t and edition_tk snapshot years.
    delta_poi = poi_count_tk - poi_count_t (POI stock change over lag window).
    delta_status = status_index_tk - status_index_t (MSS ordinal status change).

    B7 (#117): vintage parameter selects the LOR boundary system.
    'lor_2021' = modern 2021-2025 panel (default).
    'lor_pre2021' = thesis-era 2015-2019 panel (k=1: 2015→2017, 2017→2019; k=2: 2015→2019).
    """
    df = con.execute(f"""
        SELECT
            ll.area_code,
            ll.lag_k,
            ll.edition_t,
            ll.edition_tk,
            ll.status_index_t,
            ll.status_index_tk,
            ll.delta_status_ordinal,
            ll.dynamism_score_t,
            ll.dynamism_score_tk,
            ll.delta_dynamism_t,
            -- POI counts at t and t+k via pivot join
            COALESCE(p_t.total_poi_count, 0)    AS poi_count_t,
            COALESCE(p_tk.total_poi_count, 0)   AS poi_count_tk,
            -- POI delta (change in stock over lag window)
            COALESCE(p_tk.total_poi_count, 0) - COALESCE(p_t.total_poi_count, 0) AS delta_poi
        FROM main.int_mss_lead_lag ll
        LEFT JOIN main.int_poi_features_pivot p_t
            ON ll.area_code = p_t.area_code
            AND ll.edition_t = p_t.snapshot_year
            AND ll.area_vintage = p_t.area_vintage
        LEFT JOIN main.int_poi_features_pivot p_tk
            ON ll.area_code = p_tk.area_code
            AND ll.edition_tk = p_tk.snapshot_year
            AND ll.area_vintage = p_tk.area_vintage
        WHERE ll.area_vintage = '{vintage}'
    """).df()
    return df


# ---------------------------------------------------------------------------
# Statistical helpers
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


def run_ols(x: np.ndarray, y: np.ndarray, label: str) -> dict:
    """Run OLS via scipy.stats.linregress; return dict with coef, p, r2."""
    mask = ~(np.isnan(x) | np.isnan(y))
    xc, yc = x[mask], y[mask]
    n = int(mask.sum())
    _null_result = {
        "label": label,
        "n": n,
        "coef": None,
        "p": None,
        "r2": None,
        "sig": None,
        "stat_type": "beta",
    }
    if n < 10:
        return _null_result
    if np.std(xc) == 0 or np.std(yc) == 0:
        return _null_result
    res = stats.linregress(xc, yc)
    return {
        "label": label,
        "n": n,
        "coef": float(res.slope),
        "intercept": float(res.intercept),
        "p": float(res.pvalue),
        "r2": float(res.rvalue**2),
        "sig": res.pvalue < 0.05,
        "stat_type": "beta",
    }


def _dir(val: float | None) -> str:
    if val is None:
        return "N/A"
    return "positive" if val > 0 else "negative"


def _dir_match(val: float | None, expected: str) -> bool:
    if val is None:
        return False
    actual = _dir(val)
    return actual == expected


# ---------------------------------------------------------------------------
# Hypothesis tests
# ---------------------------------------------------------------------------


def test_h1(df) -> list[dict]:
    """H1: POI stock ~ MSS social status.

    Thesis p.55: total POI count and upscaling-category counts positively correlate
    with current MSS social status index.  H1b: fast-food negatively correlates.
    """
    results = []

    # H1: total_poi_count ~ status_index (Spearman + OLS)
    x = df["total_poi_count"].values.astype(float)
    y = df["status_index"].values.astype(float)

    r_sp = run_spearman(x, y, "Spearman(total_poi_count, status_index)")
    results.append(
        {
            "hyp": "H1",
            "test": "Spearman",
            "desc": THESIS_HYPOTHESES["H1"]["desc"],
            "citation": THESIS_HYPOTHESES["H1"]["citation"],
            "stat_val": r_sp["rho"],
            "stat_type": "rho",
            "n": r_sp["n"],
            "p": r_sp["p"],
            "sig": r_sp["sig"],
            "r2": None,
            "expected_dir": THESIS_HYPOTHESES["H1"]["expected_dir"],
            "actual_dir": _dir(r_sp["rho"]),
            "dir_match": _dir_match(r_sp["rho"], THESIS_HYPOTHESES["H1"]["expected_dir"]),
        }
    )

    r_ols = run_ols(x, y, "OLS(status_index ~ total_poi_count)")
    results.append(
        {
            "hyp": "H1",
            "test": "OLS",
            "desc": THESIS_HYPOTHESES["H1"]["desc"],
            "citation": THESIS_HYPOTHESES["H1"]["citation"],
            "stat_val": r_ols["coef"],
            "stat_type": "beta",
            "n": r_ols["n"],
            "p": r_ols["p"],
            "sig": r_ols["sig"],
            "r2": r_ols["r2"],
            "expected_dir": THESIS_HYPOTHESES["H1"]["expected_dir"],
            "actual_dir": _dir(r_ols["coef"]),
            "dir_match": _dir_match(r_ols["coef"], THESIS_HYPOTHESES["H1"]["expected_dir"]),
        }
    )

    # H1b: fast-food ~ status (thesis p.55: fast-food is negative indicator)
    xf = df["poi_fast_food"].values.astype(float)
    r_ff = run_spearman(xf, y, "Spearman(poi_fast_food, status_index)")
    results.append(
        {
            "hyp": "H1b",
            "test": "Spearman",
            "desc": THESIS_HYPOTHESES["H1b"]["desc"],
            "citation": THESIS_HYPOTHESES["H1b"]["citation"],
            "stat_val": r_ff["rho"],
            "stat_type": "rho",
            "n": r_ff["n"],
            "p": r_ff["p"],
            "sig": r_ff["sig"],
            "r2": None,
            "expected_dir": THESIS_HYPOTHESES["H1b"]["expected_dir"],
            "actual_dir": _dir(r_ff["rho"]),
            "dir_match": _dir_match(r_ff["rho"], THESIS_HYPOTHESES["H1b"]["expected_dir"]),
        }
    )

    return results


def test_h2(df_ll: object, panel_label: str = "2021+ panel") -> list[dict]:
    """H2: Current POI stock predicts future social-status change.

    Thesis p.55 H2: POI stock → Δstatus over lag window.
    panel_label: human-readable era label for descriptions (e.g. '2021+ panel' or '2015–2019 panel').

    D1 POLARITY (index-definition.md §5 polarity table; int_mss_lead_lag.sql lines 19-23):
    delta_status_ordinal = status_index_tk - status_index_t.
    Positive delta → status worsened (status_index increased = more deprived).
    More POI at t → gentrification pressure → status IMPROVES → delta_status_ordinal < 0.
    Expected direction: negative (Spearman rho < 0).

    Metric differencing is not permitted on ordinal MSS codes (index-definition.md §3.3).
    delta_status_ordinal is used here for direction-coded rank correlation only (Spearman),
    not as a metric response — permissible per §3.2 "ordinal transition" treatment.
    """
    results = []

    # Thesis p.55 H2: test at k=1 and k=2
    # poi_count_t at edition_t predicts delta_status_ordinal
    if panel_label == "2021+ panel":
        # k=3 requires 2027 MSS edition
        print(
            "  NOTE: k=3 skipped — only 3 MSS editions available (2021, 2023, 2025); k=3 requires 2027 edition"
        )
    for k in [1, 2]:
        sub = df_ll[df_ll["lag_k"] == k].copy()
        if len(sub) < 10:
            continue
        x = sub["poi_count_t"].values.astype(float)
        # delta_status_ordinal used as ordinal direction proxy (Spearman rank correlation only;
        # not metric differencing — index-definition.md §3.3 and §3.2 ordinal-transition treatment)
        y = sub["delta_status_ordinal"].values.astype(float)
        r = run_spearman(x, y, f"Spearman(poi_count_t, delta_status, k={k})")
        results.append(
            {
                "hyp": "H2",
                "test": f"Spearman k={k}",
                "desc": f"Current-edition POI stock ~ future status change [k={k} MSS editions, {panel_label}]",
                "citation": THESIS_HYPOTHESES["H2"]["citation"],
                "stat_val": r["rho"],
                "stat_type": "rho",
                "n": r["n"],
                "p": r["p"],
                "sig": r["sig"],
                "r2": None,
                "expected_dir": THESIS_HYPOTHESES["H2"]["expected_dir"],
                "actual_dir": _dir(r["rho"]),
                "dir_match": _dir_match(r["rho"], THESIS_HYPOTHESES["H2"]["expected_dir"]),
            }
        )

    return results


def test_h3(df_ll: object, panel_label: str = "2021+ panel") -> list[dict]:
    """H3a/H3b/H3c: Lead-lag relationships between POI change and status change.

    Thesis p.91:
      H3a: ΔPOI_t → Δstatus_t+k  (POI leads status) — REJECTED
      H3b: Δstatus_t → ΔPOI_t+k  (status leads POI) — CONFIRMED
      H3c: simultaneous ΔPOI ~ Δstatus                — UNCLEAR

    C5-corrected predictor (index-definition.md §2.4; int_mss_lead_lag.sql D3 C5 note;
    geo-DS sign-off PASS docs/epic-c/C5-geo-signoff.md 2026-06-19):
    Uses delta_dynamism_t (C5-corrected within-vintage dynamism change) for H3a/H3b,
    NOT raw delta_poi. Raw delta_poi reflects OSM coverage growth artefact — feeding it
    into H3b biases the test toward false confirmation.

    D1 POLARITY (index-definition.md §5 polarity table; int_mss_lead_lag.sql lines 19-23):
    delta_status_ordinal = status_index_tk - status_index_t.
    Positive delta → status_index increased → STATUS WORSENED (more deprived).
    Negative delta → status_index decreased → STATUS IMPROVED (less deprived).
    Expected directions are therefore negative for H3a, H3b, H3c (see THESIS_HYPOTHESES).

    Metric differencing on ordinal MSS codes is prohibited (index-definition.md §3.3).
    delta_status_ordinal is used here for rank-order correlation only (Spearman);
    this is permitted per §3.2 ordinal-transition treatment.

    NOTE: The int_mss_lead_lag model structures both predictors and outcomes as
    within-vintage changes at editions t and t+k; the lag structure is part of the model
    (not a pure lead test — both predictor and outcome share the same [t, t+k] window).
    This is a co-movement test across the lag window, not a strict temporal-precedence test.
    Results are labelled accordingly in the findings doc.

    For H3a: delta_dynamism_t (C5-corrected POI dynamism change at t) vs
             delta_status_ordinal (status change from t to t+k).
    For H3b: delta_status_ordinal (status change from t to t+k) vs delta_dynamism_t
             (C5-corrected POI dynamism change — outcome side of status-leads-POI test).
    For H3c: dynamism_score_t (contemporaneous dynamism at t) vs status_index_t.
    """
    results = []

    if panel_label == "2021+ panel":
        # k=3 requires 2027 MSS edition
        print(
            "  NOTE: k=3 skipped — only 3 MSS editions available (2021, 2023, 2025); k=3 requires 2027 edition"
        )
    for k in [1, 2]:
        sub = df_ll[df_ll["lag_k"] == k].copy()
        if len(sub) < 10:
            continue

        # delta_status_ordinal: ordinal direction proxy for rank correlation only
        # (not metric differencing; index-definition.md §3.3 + §3.2)
        delta_status = sub["delta_status_ordinal"].values.astype(float)
        dyn_t = sub["dynamism_score_t"].values.astype(float)
        # C5-corrected dynamism change (index-definition.md §2.4; int_mss_lead_lag.sql D3 C5 note)
        delta_dyn_t = sub["delta_dynamism_t"].values.astype(float)
        stat_t = sub["status_index_t"].values.astype(float)

        # H3a: Thesis p.91 — POI change leads status change (REJECTED)
        # Test: delta_dynamism_t (C5-corrected change) predicts delta_status_ordinal (k editions later)
        # Uses C5-corrected delta_dynamism_t, not raw delta_poi (index-definition.md §2.4)
        r3a = run_spearman(delta_dyn_t, delta_status, f"Spearman(delta_dyn_t, delta_status, k={k})")
        results.append(
            {
                "hyp": "H3a",
                "test": f"Spearman k={k}",
                "desc": f"{THESIS_HYPOTHESES['H3a']['desc']} [k={k}]",
                "citation": THESIS_HYPOTHESES["H3a"]["citation"],
                "stat_val": r3a["rho"],
                "stat_type": "rho",
                "n": r3a["n"],
                "p": r3a["p"],
                "sig": r3a["sig"],
                "r2": None,
                "expected_dir": THESIS_HYPOTHESES["H3a"]["expected_dir"],
                "actual_dir": _dir(r3a["rho"]),
                "dir_match": _dir_match(r3a["rho"], THESIS_HYPOTHESES["H3a"]["expected_dir"]),
            }
        )

        # H3b: Thesis p.91 — Status CHANGE leads POI CHANGE (CONFIRMED)
        # Thesis p.91 H3b: Δstatus at t leads ΔPOI at t+k — both are changes, not levels.
        # delta_status_ordinal = status change from t to t+k (ordinal direction proxy).
        # delta_dynamism_t = C5-corrected POI dynamism change (not raw delta_poi).
        # D1 POLARITY: improved status (delta_status_ordinal < 0) should lead to more amenity
        # growth (delta_dynamism_t > 0) → expected Spearman(delta_status, delta_dyn) is negative.
        r3b = run_spearman(delta_status, delta_dyn_t, f"Spearman(delta_status, delta_dyn_t, k={k})")
        results.append(
            {
                "hyp": "H3b",
                "test": f"Spearman k={k}",
                "desc": f"{THESIS_HYPOTHESES['H3b']['desc']} [k={k}]",
                "citation": THESIS_HYPOTHESES["H3b"]["citation"],
                "stat_val": r3b["rho"],
                "stat_type": "rho",
                "n": r3b["n"],
                "p": r3b["p"],
                "sig": r3b["sig"],
                "r2": None,
                "expected_dir": THESIS_HYPOTHESES["H3b"]["expected_dir"],
                "actual_dir": _dir(r3b["rho"]),
                "dir_match": _dir_match(r3b["rho"], THESIS_HYPOTHESES["H3b"]["expected_dir"]),
            }
        )

        # H3c: Thesis p.91 — Simultaneous co-movement (UNCLEAR)
        # Test: dynamism_score_t ~ status_index_t (contemporaneous correlation)
        # D1 POLARITY: higher dynamism → more gentrified → lower status_index (inverse-numeric).
        # Expected Spearman(dyn_score_t, status_index_t) is negative.
        r3c = run_spearman(dyn_t, stat_t, f"Spearman(dyn_score_t, status_t, k={k})")
        results.append(
            {
                "hyp": "H3c",
                "test": f"Spearman k={k}",
                "desc": f"{THESIS_HYPOTHESES['H3c']['desc']} [k={k}]",
                "citation": THESIS_HYPOTHESES["H3c"]["citation"],
                "stat_val": r3c["rho"],
                "stat_type": "rho",
                "n": r3c["n"],
                "p": r3c["p"],
                "sig": r3c["sig"],
                "r2": None,
                "expected_dir": THESIS_HYPOTHESES["H3c"]["expected_dir"],
                "actual_dir": _dir(r3c["rho"]),
                "dir_match": _dir_match(r3c["rho"], THESIS_HYPOTHESES["H3c"]["expected_dir"]),
            }
        )

    return results


def test_h2_ewr(df_ewr: object) -> list[dict]:
    """H2 (same-era EWR): Current POI stock predicts future EWR composite change.

    Same hypothesis as test_h2 but using the EWR 2014–2020 annual panel instead of
    the MSS 2021–2025 biennial panel. k=2 (2014→2016) matches the thesis gap exactly.

    EWR polarity: higher ewr_composite = more deprived. More POI at t → gentrification
    → EWR composite DECREASES → delta_ewr < 0. Expected direction: negative.
    delta_ewr is metric (z-score arithmetic diff) — both Spearman and OLS valid.
    """
    results = []
    for k in [1, 2, 4]:
        sub = df_ewr[df_ewr["lag_k"] == k].copy()
        if len(sub) < 10:
            continue
        x = sub["poi_count_t"].values.astype(float)
        y = sub["delta_ewr"].values.astype(float)
        r_sp = run_spearman(x, y, f"Spearman(poi_count_t, delta_ewr, k={k})")
        results.append(
            {
                "hyp": "H2",
                "test": f"Spearman k={k}",
                "source": "EWR",
                "desc": f"POI stock at year_t ~ delta_ewr over k={k} annual years [EWR 2014–2020, same-era]",
                "citation": THESIS_HYPOTHESES["H2"]["citation"],
                "stat_val": r_sp["rho"],
                "stat_type": "rho",
                "n": r_sp["n"],
                "p": r_sp["p"],
                "sig": r_sp["sig"],
                "r2": None,
                "expected_dir": THESIS_HYPOTHESES["H2"]["expected_dir"],
                "actual_dir": _dir(r_sp["rho"]),
                "dir_match": _dir_match(r_sp["rho"], THESIS_HYPOTHESES["H2"]["expected_dir"]),
            }
        )
        r_ols = run_ols(x, y, f"OLS(delta_ewr ~ poi_count_t, k={k})")
        results.append(
            {
                "hyp": "H2",
                "test": f"OLS k={k}",
                "source": "EWR",
                "desc": f"POI stock at year_t ~ delta_ewr over k={k} annual years [EWR 2014–2020, same-era]",
                "citation": THESIS_HYPOTHESES["H2"]["citation"],
                "stat_val": r_ols["coef"],
                "stat_type": "beta",
                "n": r_ols["n"],
                "p": r_ols["p"],
                "sig": r_ols["sig"],
                "r2": r_ols["r2"],
                "expected_dir": THESIS_HYPOTHESES["H2"]["expected_dir"],
                "actual_dir": _dir(r_ols["coef"]),
                "dir_match": _dir_match(r_ols["coef"], THESIS_HYPOTHESES["H2"]["expected_dir"]),
            }
        )
    return results


def test_h3_ewr(df_ewr: object) -> list[dict]:
    """H3a/H3b/H3c (same-era EWR): Lead-lag using EWR composite 2014–2020.

    Uses int_ewr_lead_lag at k=2 (2014→2016 = thesis gap).
    delta_ewr is metric so both Spearman and OLS are valid.

    EWR polarity: delta_ewr < 0 = EWR composite decreased = status IMPROVED.
    H3a: delta_poi (POI change) leads delta_ewr — expected negative.
    H3b: delta_ewr (status change) leads delta_poi — expected negative.
    H3c: ewr_composite_t ~ poi_count_t (contemporaneous) — expected negative.
    """
    results = []
    # Focus on k=2 (2014→2016) as the thesis-matching window; also test k=1 and k=4.
    for k in [1, 2, 4]:
        sub = df_ewr[df_ewr["lag_k"] == k].copy()
        if len(sub) < 10:
            continue
        delta_ewr = sub["delta_ewr"].values.astype(float)
        delta_ewr_t = sub["delta_ewr_t"].values.astype(float)
        delta_poi = sub["delta_poi"].values.astype(float)
        ewr_t = sub["ewr_composite_t"].values.astype(float)
        poi_t = sub["poi_count_t"].values.astype(float)

        # H3a: delta_poi (POI change at t) leads delta_ewr (status change t→t+k)
        r3a = run_spearman(delta_poi, delta_ewr, f"Spearman(delta_poi, delta_ewr, k={k})")
        results.append(
            {
                "hyp": "H3a",
                "test": f"Spearman k={k}",
                "source": "EWR",
                "desc": f"Δpoi leads Δewr_composite [k={k} annual years, EWR 2014–2020, same-era]",
                "citation": THESIS_HYPOTHESES["H3a"]["citation"],
                "stat_val": r3a["rho"],
                "stat_type": "rho",
                "n": r3a["n"],
                "p": r3a["p"],
                "sig": r3a["sig"],
                "r2": None,
                "expected_dir": THESIS_HYPOTHESES["H3a"]["expected_dir"],
                "actual_dir": _dir(r3a["rho"]),
                "dir_match": _dir_match(r3a["rho"], THESIS_HYPOTHESES["H3a"]["expected_dir"]),
            }
        )

        # H3b: delta_ewr_t (annual status change at t) leads delta_poi
        r3b = run_spearman(delta_ewr_t, delta_poi, f"Spearman(delta_ewr_t, delta_poi, k={k})")
        results.append(
            {
                "hyp": "H3b",
                "test": f"Spearman k={k}",
                "source": "EWR",
                "desc": f"Δewr_composite at t leads Δpoi [k={k} annual years, EWR 2014–2020, same-era]",
                "citation": THESIS_HYPOTHESES["H3b"]["citation"],
                "stat_val": r3b["rho"],
                "stat_type": "rho",
                "n": r3b["n"],
                "p": r3b["p"],
                "sig": r3b["sig"],
                "r2": None,
                "expected_dir": THESIS_HYPOTHESES["H3b"]["expected_dir"],
                "actual_dir": _dir(r3b["rho"]),
                "dir_match": _dir_match(r3b["rho"], THESIS_HYPOTHESES["H3b"]["expected_dir"]),
            }
        )

        # H3c: contemporaneous ewr_composite_t ~ poi_count_t
        r3c = run_spearman(poi_t, ewr_t, f"Spearman(poi_count_t, ewr_composite_t, k={k})")
        results.append(
            {
                "hyp": "H3c",
                "test": f"Spearman k={k}",
                "source": "EWR",
                "desc": f"poi_count_t ~ ewr_composite_t (contemporaneous) [k={k}, EWR 2014–2020, same-era]",
                "citation": THESIS_HYPOTHESES["H3c"]["citation"],
                "stat_val": r3c["rho"],
                "stat_type": "rho",
                "n": r3c["n"],
                "p": r3c["p"],
                "sig": r3c["sig"],
                "r2": None,
                "expected_dir": THESIS_HYPOTHESES["H3c"]["expected_dir"],
                "actual_dir": _dir(r3c["rho"]),
                "dir_match": _dir_match(r3c["rho"], THESIS_HYPOTHESES["H3c"]["expected_dir"]),
            }
        )

    return results


# ---------------------------------------------------------------------------
# Output helpers
# ---------------------------------------------------------------------------


def _fmt_val(val: float | None) -> str:
    """Format a stat value; switch to scientific notation when |val| < 0.001."""
    if val is None:
        return "N/A"
    if abs(val) < 0.001:
        return f"{val:.2e}"
    return f"{val:.4f}"


def print_results(results: list[dict]) -> None:
    print("\n" + "=" * 100)
    print("E1 REGRESSION RESULTS — Thesis H1-H3c Validation (real hypotheses, POI predictors)")
    print("=" * 100)
    hdr = f"{'Hyp':<5} {'Test':<14} {'N':<5} {'Type':<5} {'Value':<9} {'p-val':<10} {'Sig':<5} {'ExpDir':<9} {'ActDir':<9} {'Match':<6} Description"
    print(hdr)
    print("-" * 100)
    for r in results:
        val_str = _fmt_val(r["stat_val"])
        p_str = f"{r['p']:.4f}" if r.get("p") is not None else "N/A"
        sig_str = "YES" if r.get("sig") else "NO"
        match_str = "PASS" if r["dir_match"] else "FAIL"
        r2_note = f" R2={r['r2']:.4f}" if r.get("r2") is not None else ""
        print(
            f"{r['hyp']:<5} {r['test']:<14} {r['n']:<5} {r['stat_type']:<5} {val_str + r2_note:<9} "
            f"{p_str:<10} {sig_str:<5} {r['expected_dir']:<9} {r['actual_dir']:<9} {match_str:<6} {r['desc']}"
        )


def _write_results_table(f, results: list[dict]) -> None:
    f.write(
        "| Hyp | Test | N | Type | Value | p-value | Sig | Expected Dir | Actual Dir | Match | Description |\n"
    )
    f.write("|---|---|---|---|---|---|---|---|---|---|---|\n")
    for r in results:
        val_str = _fmt_val(r["stat_val"])
        if r.get("r2") is not None:
            val_str += f" R2={r['r2']:.4f}"
        p_str = f"{r['p']:.4f}" if r.get("p") is not None else "N/A"
        sig_str = "Yes" if r.get("sig") else "No"
        match_str = "PASS" if r["dir_match"] else "FAIL"
        f.write(
            f"| {r['hyp']} | {r['test']} | {r['n']} | {r['stat_type']} | {val_str} | "
            f"{p_str} | {sig_str} | {r['expected_dir']} | {r['actual_dir']} | {match_str} | {r['desc']} |\n"
        )


def write_findings(
    df_h1,
    results_mss: list[dict],
    results_ewr: list[dict] | None = None,
    results_mss_pre: list[dict] | None = None,
) -> None:
    import datetime

    today = datetime.date.today().isoformat()

    n_pass_mss = sum(1 for r in results_mss if r["dir_match"])
    n_sig_mss = sum(1 for r in results_mss if r.get("sig"))

    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_MD, "w") as f:
        f.write("# E1 Regression Findings -- Thesis H1-H3c Validation\n\n")
        f.write("- **Task:** H1-H3c regression and lead-lag analysis, real thesis hypotheses\n")
        f.write("- **Issue:** #65 / #115\n")
        f.write(f"- **Date:** {today}\n")
        f.write(
            f"- **Data (H1/H1b):** stg_thesis_2018_result_plr + int_poi_features_pivot (2018), n={len(df_h1)}\n"
        )
        f.write(
            "- **Data (H2/H3 MSS 2021–2025):** int_mss_lead_lag (lor_2021) + int_poi_features_pivot\n"
        )
        f.write(
            "- **Data (H2/H3 MSS 2015–2019, B7):** int_mss_lead_lag (lor_pre2021) + int_poi_features_pivot\n"
        )
        if results_ewr:
            f.write(
                "- **Data (H2/H3 EWR):** int_ewr_lead_lag + int_poi_features_pivot (2014–2020, same-era as thesis)\n"
            )
        f.write("- **Method:** Spearman rank correlation + OLS (scipy.stats)\n\n")

        f.write("## Methodology\n\n")
        f.write("Spearman rank correlations and OLS regression test five hypotheses from the 2018 ")
        f.write("Berlin gentrification thesis (pp. 55-56, p. 91). POI category counts from ")
        f.write("`int_poi_features_pivot` are used as the primary predictor variables.\n\n")
        f.write("**Three comparison sets for H2/H3:**\n\n")
        f.write(
            "1. **MSS panel (2021–2025):** Uses `int_mss_lead_lag` (lor_2021) — best ground truth "
        )
        f.write(
            "(official Berlin social monitoring index) but a different era and index than the thesis.\n"
        )
        f.write(
            "2. **MSS pre-2021 panel (2015–2019, B7 #117):** Uses `int_mss_lead_lag` (lor_pre2021) — "
        )
        f.write("thesis-era boundary system (447 PLRs). Enables same-era H3b lead-lag. ")
        f.write(
            "k=1: 2015→2017, 2017→2019 pairs; k=2: 2015→2019. Z-scores not cross-vintage comparable.\n"
        )
        f.write("3. **EWR same-era (2014–2020):** Uses `int_ewr_lead_lag` — the same data source ")
        f.write(
            "and timeframe as the 2018 thesis. k=2 (2014→2016) matches the thesis lead-lag gap "
        )
        f.write("exactly. delta_ewr is metric (z-score arithmetic diff) so OLS is also valid.\n\n")
        f.write("The primary validation criterion is directional agreement (same sign as thesis ")
        f.write("expectation), consistent with the Epic B directional revival framing.\n\n")

        f.write("## Hypothesis Citations\n\n")
        for key, hyp in THESIS_HYPOTHESES.items():
            f.write(f"- **{key}**: {hyp['citation']}\n")
        f.write("\n")

        f.write("## Results — Section 1: H1/H1b (2018 cross-section, unchanged)\n\n")
        h1_results = [r for r in results_mss if r["hyp"] in ("H1", "H1b")]
        _write_results_table(f, h1_results)
        f.write("\n")

        f.write("## Results — Section 2: H2/H3 MSS Panel (modern era, 2021–2025)\n\n")
        f.write(
            "> Different era and index than thesis. MSS is a better ground truth but covers 2021–2025, not 2012–2018.\n\n"
        )
        mss_h23 = [r for r in results_mss if r["hyp"] not in ("H1", "H1b")]
        _write_results_table(f, mss_h23)
        n_pass_mss_h23 = sum(1 for r in mss_h23 if r["dir_match"])
        n_sig_mss_h23 = sum(1 for r in mss_h23 if r.get("sig"))
        f.write(
            f"\n**Directional agreement (H2/H3 MSS): {n_pass_mss_h23}/{len(mss_h23)}. Significant: {n_sig_mss_h23}/{len(mss_h23)}.**\n\n"
        )

        if results_mss_pre:
            n_pass_pre = sum(1 for r in results_mss_pre if r["dir_match"])
            n_sig_pre = sum(1 for r in results_mss_pre if r.get("sig"))
            f.write(
                "## Results — Section 3: H2/H3 MSS Pre-2021 Panel (thesis-era, 2015–2019, B7 #117)\n\n"
            )
            f.write(
                "> lor_pre2021 boundary system (447 PLRs). Same-era H2/H3 panel as thesis. "
                "Z-scores normalised within lor_pre2021 population — NOT cross-vintage comparable to Section 2.\n"
            )
            f.write(
                "> k=1 pairs: 2015→2017, 2017→2019. k=2 pair: 2015→2019 (4-year lag, matches thesis H3b gap).\n\n"
            )
            _write_results_table(f, results_mss_pre)
            f.write(
                f"\n**Directional agreement (H2/H3 MSS pre-2021): {n_pass_pre}/{len(results_mss_pre)}. Significant: {n_sig_pre}/{len(results_mss_pre)}.**\n\n"
            )

        if results_ewr:
            f.write(
                "## Results — Section 4: H2/H3 EWR Same-Era (2014–2020, thesis source and timeframe)\n\n"
            )
            f.write(
                "> Same data source and timeframe as the 2018 thesis. k=2 (2014→2016) is the direct comparison window.\n"
            )
            f.write(
                "> delta_ewr is metric (z-score arithmetic difference) — OLS valid unlike MSS ordinal delta.\n\n"
            )
            _write_results_table(f, results_ewr)
            n_pass_ewr = sum(1 for r in results_ewr if r["dir_match"])
            n_sig_ewr = sum(1 for r in results_ewr if r.get("sig"))
            f.write(
                f"\n**Directional agreement (H2/H3 EWR): {n_pass_ewr}/{len(results_ewr)}. Significant: {n_sig_ewr}/{len(results_ewr)}.**\n\n"
            )

        f.write("## Overall Scorecard\n\n")
        all_results = results_mss + (results_mss_pre or []) + (results_ewr or [])
        n_pass_all = sum(1 for r in all_results if r["dir_match"])
        n_sig_all = sum(1 for r in all_results if r.get("sig"))
        f.write(
            f"**Total directional agreement: {n_pass_all}/{len(all_results)}. Significant: {n_sig_all}/{len(all_results)}.**\n\n"
        )
        f.write(
            f"**MSS modern panel (H1+H2+H3, 2021–2025): {n_pass_mss}/{len(results_mss)} direction, {n_sig_mss}/{len(results_mss)} significant.**\n"
        )
        if results_mss_pre:
            f.write(
                f"**MSS pre-2021 panel (H2+H3 only, 2015–2019): {n_pass_pre}/{len(results_mss_pre)} direction, {n_sig_pre}/{len(results_mss_pre)} significant.**\n"
            )
        if results_ewr:
            f.write(
                f"**EWR same-era (H2+H3 only): {n_pass_ewr}/{len(results_ewr)} direction, {n_sig_ewr}/{len(results_ewr)} significant.**\n\n"
            )

        f.write("## Divergences from 2018 Thesis\n\n")
        f.write("- **D1 polarity correction**: `status_index` is inverse-numeric — lower value = ")
        f.write("higher social status (index-definition.md §5 polarity table). All expected_dir ")
        f.write("values corrected accordingly.\n")
        f.write("- **H3 predictor (MSS panel)**: Uses C5-corrected `delta_dynamism_t` from ")
        f.write("`int_mss_lead_lag`, not raw `delta_poi` (avoids OSM coverage growth artefact).\n")
        f.write("- **H2/H3 MSS**: tested on 2021–2025 live panel (lor_2021, 535–1071 rows) vs ")
        f.write("thesis's 2012–2018 EWR cross-section. Different era, different index.\n")
        f.write("- **H2/H3 EWR**: tested on 2014–2020 annual panel (lor_2021, ~542 rows per lag). ")
        f.write("Same source as thesis. k=2 (2014→2016) matches thesis gap. delta_ewr is metric ")
        f.write(
            "(arithmetic z-score diff); OLS additionally applied where MSS ordinal prohibits it.\n"
        )
        f.write("- **No multiple-comparison correction** applied across hypotheses.\n")
        f.write("- Epic B framing: directional revival — exact number reproduction not required. ")
        f.write("See CLAUDE.md §Epic B framing.\n\n")

        f.write("## Limitations\n\n")
        f.write(
            "- **k=3 MSS not tested (modern panel)**: Only 3 lor_2021 MSS editions available (2021, 2023, 2025); "
        )
        f.write("k=3 requires 2027 edition.\n")
        f.write("- **EWR composite null pre-2014**: migration_background_share absent before 2014 ")
        f.write("makes ewr_composite null for 2008–2013 — EWR panel limited to 2014–2020.\n")
        f.write(
            "- **Cross-vintage z-scores not comparable**: lor_pre2021 and lor_2021 z-scores are "
            "normalised within their respective PLR populations and must not be compared directly.\n"
        )
        f.write(
            "- **MAUP sensitivity**: results are PLR-only and may be sensitive to area definition.\n"
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
        print("Exiting cleanly (data-presence guard — not a crash).")
        sys.exit(0)

    con = duckdb.connect(str(DUCKDB_PATH), read_only=True)

    # Check required tables exist
    tables = {
        row[0]
        for row in con.execute(
            "SELECT table_name FROM information_schema.tables WHERE table_schema='main'"
        ).fetchall()
    }
    required = {"stg_thesis_2018_result_plr", "int_poi_features_pivot", "int_mss_lead_lag"}
    missing = required - tables
    if missing:
        print(f"INFO: Required tables missing: {missing}. Run 'uv run poe build' first.")
        con.close()
        sys.exit(0)

    print("Loading H1/H1b data (thesis 2018 golden + POI pivot 2018)...")
    df_h1 = load_h1_h2_data(con)
    print(f"  Loaded {len(df_h1)} PLR rows (H1/H1b)")

    print("Loading H2/H3 MSS lead-lag data (int_mss_lead_lag + int_poi_features_pivot)...")
    df_ll = load_lead_lag_data(con, vintage="lor_2021")
    print(
        f"  Loaded {len(df_ll)} MSS lead-lag rows (k=1: {(df_ll['lag_k'] == 1).sum()}, k=2: {(df_ll['lag_k'] == 2).sum()})"
    )

    print("Loading H2/H3 MSS pre-2021 panel (lor_pre2021, 2015-2019)...")
    df_ll_pre = load_lead_lag_data(con, vintage="lor_pre2021")
    print(
        f"  Loaded {len(df_ll_pre)} pre-2021 lead-lag rows (k=1: {(df_ll_pre['lag_k'] == 1).sum()}, k=2: {(df_ll_pre['lag_k'] == 2).sum()})"
    )

    ewr_available = "int_ewr_lead_lag" in tables
    df_ewr = None
    if ewr_available:
        print("Loading H2/H3 EWR lead-lag data (int_ewr_lead_lag + int_poi_features_pivot)...")
        df_ewr = load_ewr_lead_lag_data(con)
        print(
            f"  Loaded {len(df_ewr)} EWR lead-lag rows "
            f"(k=2: {(df_ewr['lag_k'] == 2).sum()} = thesis-matching 2014→2016 window)"
        )
    else:
        print("INFO: int_ewr_lead_lag not found — skipping same-era EWR comparison.")

    con.close()

    if len(df_h1) < 10:
        print("INFO: Too few rows for H1/H1b tests after join. Check data ingestion.")
        sys.exit(0)

    # --- MSS panel results (modern era, better ground truth) ---
    print("\nRunning H1/H1b tests (POI stock ~ MSS status, 2018 cross-section)...")
    results_mss = test_h1(df_h1)

    print("Running H2 tests — MSS panel (POI stock → future MSS status change, 2021–2025)...")
    results_mss += test_h2(df_ll, panel_label="2021+ panel")

    print("Running H3a/H3b/H3c — MSS panel (k=1,2)...")
    results_mss += test_h3(df_ll, panel_label="2021+ panel")

    # --- MSS pre-2021 panel (B7 #117): thesis-era H2/H3 on lor_pre2021 (2015-2019) ---
    results_mss_pre = []
    if len(df_ll_pre) >= 10:
        print("\nRunning H2 tests — MSS pre-2021 panel (2015–2019)...")
        results_mss_pre += test_h2(df_ll_pre, panel_label="2015–2019 panel")

        print("Running H3a/H3b/H3c — MSS pre-2021 panel (2015–2019)...")
        results_mss_pre += test_h3(df_ll_pre, panel_label="2015–2019 panel")

    # --- EWR same-era results (2014–2020, matches thesis source and timeframe) ---
    results_ewr = []
    if df_ewr is not None and len(df_ewr) >= 10:
        print("\nRunning H2 tests — EWR same-era (k=1,2,4; thesis-matching 2014→2016 at k=2)...")
        results_ewr += test_h2_ewr(df_ewr)

        print("Running H3a/H3b/H3c — EWR same-era (k=1,2,4)...")
        results_ewr += test_h3_ewr(df_ewr)

    print("\n=== MSS PANEL (modern era, 2021–2025) ===")
    print_results(results_mss)
    n_pass_mss = sum(1 for r in results_mss if r["dir_match"])
    n_sig_mss = sum(1 for r in results_mss if r.get("sig"))
    print(f"\nMSS directional agreement: {n_pass_mss}/{len(results_mss)}")
    print(f"MSS significant at p<0.05: {n_sig_mss}/{len(results_mss)}")

    if results_mss_pre:
        print("\n=== MSS PRE-2021 PANEL (thesis-era, 2015–2019) ===")
        print_results(results_mss_pre)
        n_pass_pre = sum(1 for r in results_mss_pre if r["dir_match"])
        n_sig_pre = sum(1 for r in results_mss_pre if r.get("sig"))
        print(f"\nMSS pre-2021 directional agreement: {n_pass_pre}/{len(results_mss_pre)}")
        print(f"MSS pre-2021 significant at p<0.05: {n_sig_pre}/{len(results_mss_pre)}")

    if results_ewr:
        print("\n=== EWR SAME-ERA (2014–2020, thesis source and timeframe) ===")
        print_results(results_ewr)
        n_pass_ewr = sum(1 for r in results_ewr if r["dir_match"])
        n_sig_ewr = sum(1 for r in results_ewr if r.get("sig"))
        print(f"\nEWR directional agreement: {n_pass_ewr}/{len(results_ewr)}")
        print(f"EWR significant at p<0.05: {n_sig_ewr}/{len(results_ewr)}")

    write_findings(df_h1, results_mss, results_ewr, results_mss_pre=results_mss_pre)
    print(f"\nFindings written to: {OUTPUT_MD}")


if __name__ == "__main__":
    main()
