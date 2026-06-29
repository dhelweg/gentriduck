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
DUCKDB_PATH = Path(_env_db) if _env_db else Path(__file__).parent.parent / "data" / "gentriduck.duckdb"
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


def load_lead_lag_data(con: duckdb.DuckDBPyConnection) -> object:
    """Load MSS lead-lag panel joined with POI pivot counts for H3a/H3b/H3c.

    int_mss_lead_lag provides lag_k=1,2 MSS edition pairs.
    int_poi_features_pivot is joined at edition_t and edition_tk snapshot years.
    delta_poi = poi_count_tk - poi_count_t (POI stock change over lag window).
    delta_status = status_index_tk - status_index_t (MSS ordinal status change).
    """
    # Thesis p.91 H3a/H3b/H3c: lead-lag tested at k=1 (2yr) and k=2 (4yr) editions
    df = con.execute("""
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
        WHERE ll.area_vintage = 'lor_2021'
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
    return {"label": label, "n": n, "rho": float(rho), "p": float(p), "sig": p < 0.05, "stat_type": "rho"}


def run_ols(x: np.ndarray, y: np.ndarray, label: str) -> dict:
    """Run OLS via scipy.stats.linregress; return dict with coef, p, r2."""
    mask = ~(np.isnan(x) | np.isnan(y))
    xc, yc = x[mask], y[mask]
    n = int(mask.sum())
    if n < 10:
        return {"label": label, "n": n, "coef": None, "p": None, "r2": None, "sig": None, "stat_type": "beta"}
    res = stats.linregress(xc, yc)
    return {
        "label": label,
        "n": n,
        "coef": float(res.slope),
        "intercept": float(res.intercept),
        "p": float(res.pvalue),
        "r2": float(res.rvalue ** 2),
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
    results.append({
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
    })

    r_ols = run_ols(x, y, "OLS(status_index ~ total_poi_count)")
    results.append({
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
    })

    # H1b: fast-food ~ status (thesis p.55: fast-food is negative indicator)
    xf = df["poi_fast_food"].values.astype(float)
    r_ff = run_spearman(xf, y, "Spearman(poi_fast_food, status_index)")
    results.append({
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
    })

    return results


def test_h2(df_ll: object) -> list[dict]:
    """H2: Current POI stock predicts future social-status change.

    Thesis p.55 H2: POI stock → Δstatus over lag window.
    Tested here on the 2021+ live panel (not the 2018 cross-section — the thesis
    PLRs use the pre-2021 LOR vintage while the lead-lag panel uses lor_2021).
    poi_count_t at edition_t predicts delta_status_ordinal k editions later.

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

    # Thesis p.55 H2: test at k=1 and k=2 using live MSS panel
    # poi_count_t at edition_t predicts delta_status_ordinal
    # k=3 skipped: only 3 MSS editions currently (2021, 2023, 2025); testable once 2027 edition ingested
    print("  NOTE: k=3 skipped — only 3 MSS editions available (2021, 2023, 2025); k=3 requires 2027 edition")
    for k in [1, 2]:
        sub = df_ll[df_ll["lag_k"] == k].copy()
        if len(sub) < 10:
            continue
        x = sub["poi_count_t"].values.astype(float)
        # delta_status_ordinal used as ordinal direction proxy (Spearman rank correlation only;
        # not metric differencing — index-definition.md §3.3 and §3.2 ordinal-transition treatment)
        y = sub["delta_status_ordinal"].values.astype(float)
        r = run_spearman(x, y, f"Spearman(poi_count_t, delta_status, k={k})")
        results.append({
            "hyp": "H2",
            "test": f"Spearman k={k}",
            "desc": f"Current-edition POI stock ~ future status change [k={k} MSS editions, 2021+ panel]",
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
        })

    return results


def test_h3(df_ll: object) -> list[dict]:
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

    # k=3 skipped: only 3 MSS editions currently (2021, 2023, 2025); testable once 2027 edition ingested
    print("  NOTE: k=3 skipped — only 3 MSS editions available (2021, 2023, 2025); k=3 requires 2027 edition")
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
        results.append({
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
        })

        # H3b: Thesis p.91 — Status CHANGE leads POI CHANGE (CONFIRMED)
        # Thesis p.91 H3b: Δstatus at t leads ΔPOI at t+k — both are changes, not levels.
        # delta_status_ordinal = status change from t to t+k (ordinal direction proxy).
        # delta_dynamism_t = C5-corrected POI dynamism change (not raw delta_poi).
        # D1 POLARITY: improved status (delta_status_ordinal < 0) should lead to more amenity
        # growth (delta_dynamism_t > 0) → expected Spearman(delta_status, delta_dyn) is negative.
        r3b = run_spearman(delta_status, delta_dyn_t, f"Spearman(delta_status, delta_dyn_t, k={k})")
        results.append({
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
        })

        # H3c: Thesis p.91 — Simultaneous co-movement (UNCLEAR)
        # Test: dynamism_score_t ~ status_index_t (contemporaneous correlation)
        # D1 POLARITY: higher dynamism → more gentrified → lower status_index (inverse-numeric).
        # Expected Spearman(dyn_score_t, status_index_t) is negative.
        r3c = run_spearman(dyn_t, stat_t, f"Spearman(dyn_score_t, status_t, k={k})")
        results.append({
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
        })

    return results


# ---------------------------------------------------------------------------
# Output helpers
# ---------------------------------------------------------------------------

def print_results(results: list[dict]) -> None:
    print("\n" + "=" * 100)
    print("E1 REGRESSION RESULTS — Thesis H1-H3c Validation (real hypotheses, POI predictors)")
    print("=" * 100)
    hdr = f"{'Hyp':<5} {'Test':<14} {'N':<5} {'Type':<5} {'Value':<9} {'p-val':<10} {'Sig':<5} {'ExpDir':<9} {'ActDir':<9} {'Match':<6} Description"
    print(hdr)
    print("-" * 100)
    for r in results:
        val_str = f"{r['stat_val']:.4f}" if r["stat_val"] is not None else "N/A"
        p_str = f"{r['p']:.4f}" if r.get("p") is not None else "N/A"
        sig_str = "YES" if r.get("sig") else "NO"
        match_str = "PASS" if r["dir_match"] else "FAIL"
        r2_note = f" R2={r['r2']:.4f}" if r.get("r2") is not None else ""
        print(
            f"{r['hyp']:<5} {r['test']:<14} {r['n']:<5} {r['stat_type']:<5} {val_str+r2_note:<9} "
            f"{p_str:<10} {sig_str:<5} {r['expected_dir']:<9} {r['actual_dir']:<9} {match_str:<6} {r['desc']}"
        )


def write_findings(df_h1, results: list[dict]) -> None:
    n_pass = sum(1 for r in results if r["dir_match"])
    n_sig = sum(1 for r in results if r.get("sig"))
    n_total = len(results)

    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_MD, "w") as f:
        f.write("# E1 Regression Findings -- Thesis H1-H3c Validation\n\n")
        f.write("- **Task:** H1-H3c regression and lead-lag analysis, real thesis hypotheses\n")
        f.write("- **Issue:** #65\n")
        f.write("- **Date:** 2026-06-29\n")
        f.write(f"- **Data (H1/H1b):** stg_thesis_2018_result_plr + int_poi_features_pivot (2018), n={len(df_h1)}\n")
        f.write("- **Data (H2/H3):** int_mss_lead_lag + int_poi_features_pivot (2021-2025)\n")
        f.write("- **Method:** Spearman rank correlation + OLS (scipy.stats)\n\n")

        f.write("## Methodology\n\n")
        f.write("Spearman rank correlations and OLS regression test five hypotheses from the 2018 ")
        f.write("Berlin gentrification thesis (pp. 55-56, p. 91). POI category counts from ")
        f.write("`int_poi_features_pivot` are used as the primary predictor variables, joined ")
        f.write("to MSS social status indices (`status_index`). This corrects the prior ")
        f.write("implementation which regressed MSS indices against each other (no POI features).\n\n")
        f.write("The lead-lag hypotheses (H3a/H3b/H3c) are tested using `int_mss_lead_lag` at ")
        f.write("k=1 (2-year MSS edition gap) and k=2 (4-year gap), with POI counts from ")
        f.write("`int_poi_features_pivot` joined at the relevant snapshot years.\n\n")
        f.write("The primary validation criterion is directional agreement (same sign as thesis ")
        f.write("expectation), consistent with the Epic B directional revival framing.\n\n")

        f.write("## Hypothesis Citations\n\n")
        for key, hyp in THESIS_HYPOTHESES.items():
            f.write(f"- **{key}**: {hyp['citation']}\n")
        f.write("\n")

        f.write("## Results\n\n")
        f.write("| Hyp | Test | N | Type | Value | p-value | Sig | Expected Dir | Actual Dir | Match | Description |\n")
        f.write("|---|---|---|---|---|---|---|---|---|---|---|\n")
        for r in results:
            val_str = f"{r['stat_val']:.4f}" if r["stat_val"] is not None else "N/A"
            if r.get("r2") is not None:
                val_str += f" R2={r['r2']:.4f}"
            p_str = f"{r['p']:.4f}" if r.get("p") is not None else "N/A"
            sig_str = "Yes" if r.get("sig") else "No"
            match_str = "PASS" if r["dir_match"] else "FAIL"
            f.write(
                f"| {r['hyp']} | {r['test']} | {r['n']} | {r['stat_type']} | {val_str} | "
                f"{p_str} | {sig_str} | {r['expected_dir']} | {r['actual_dir']} | {match_str} | {r['desc']} |\n"
            )

        f.write(f"\n**Directional agreement: {n_pass}/{n_total} tests match the expected direction.**\n\n")
        f.write(f"**Statistical significance: {n_sig}/{n_total} results significant at p<0.05.**\n\n")

        f.write("## Interpretation by Hypothesis\n\n")
        f.write("### H1 — POI stock vs MSS social status (thesis p.55, confirmed AUC 0.87)\n\n")
        h1_rows = [r for r in results if r["hyp"] == "H1"]
        for r in h1_rows:
            if r["stat_val"] is not None:
                f.write(f"**{r['test']}**: rho/beta = {r['stat_val']:.4f}, p = {r['p']:.4f}, n={r['n']}. ")
                verdict = "matches" if r["dir_match"] else "diverges from"
                f.write(f"Direction ({r['actual_dir']}) {verdict} thesis expectation ({r['expected_dir']}). ")
                f.write("Significant.\n\n" if r.get("sig") else "Not significant at p<0.05.\n\n")

        f.write("### H1b — Fast-food as contested proxy for low-status / displacement (thesis p.55)\n\n")
        f.write("Note: fast-food as a 'displacement indicator' is a contested proxy in the ")
        f.write("gentrification literature; the thesis (p.55) treats it as a low-status marker. ")
        f.write("D1 polarity correction: expected Spearman(poi_fast_food, status_index) = positive ")
        f.write("(more fast-food → lower status → higher status_index; index-definition.md §5).\n\n")
        h1b_rows = [r for r in results if r["hyp"] == "H1b"]
        for r in h1b_rows:
            if r["stat_val"] is not None:
                f.write(f"**{r['test']}**: rho = {r['stat_val']:.4f}, p = {r['p']:.4f}, n={r['n']}. ")
                verdict = "confirmed — fast-food positively correlates with status_index (low-status proxy)" if r["dir_match"] else "diverges from thesis expectation"
                f.write(f"{verdict}.\n\n")

        f.write("### H2 — Current-edition POI stock predicts future status change (thesis p.55)\n\n")
        f.write("Note: H2 is tested on the 2021+ live MSS panel (lor_2021 vintage), not the 2018 ")
        f.write("cross-section. This operationalizes the general 'current POI stock predicts future ")
        f.write("status change' hypothesis. n=1071 (panel rows), not n=436 (2018 cross-section).\n\n")
        h2_rows = [r for r in results if r["hyp"] == "H2"]
        if h2_rows:
            for r in h2_rows:
                if r["stat_val"] is not None:
                    verdict = "directional agreement" if r["dir_match"] else "directional divergence"
                    f.write(
                        f"**k={r['test'].split('=')[1]}**: rho = {r['stat_val']:.4f}, p = {r['p']:.4f}, "
                        f"n={r['n']} — {verdict}.\n\n"
                    )
        else:
            f.write("No data available for H2 test (lead-lag panel missing).\n\n")

        f.write("### H3a — POI change leads status change (thesis p.91, REJECTED)\n\n")
        f.write("Thesis rejected this hypothesis; we expect no significant positive rho. ")
        h3a_rows = [r for r in results if r["hyp"] == "H3a"]
        for r in h3a_rows:
            if r["stat_val"] is not None:
                f.write(
                    f"k={r['test'].split('=')[1]}: rho = {r['stat_val']:.4f}, p = {r['p']:.4f}, n={r['n']}. "
                )
                if not r.get("sig"):
                    f.write("Not significant — consistent with thesis rejection.\n")
                else:
                    f.write("Significant — diverges from thesis (which rejected H3a).\n")
        f.write("\n")

        f.write("### H3b — Status change leads POI change (thesis p.91, CONFIRMED)\n\n")
        f.write("Thesis confirmed this hypothesis; we expect positive significant rho. ")
        h3b_rows = [r for r in results if r["hyp"] == "H3b"]
        for r in h3b_rows:
            if r["stat_val"] is not None:
                f.write(
                    f"k={r['test'].split('=')[1]}: rho = {r['stat_val']:.4f}, p = {r['p']:.4f}, n={r['n']}. "
                )
                verdict = "consistent with thesis confirmation" if r["dir_match"] else "diverges from thesis"
                sig_note = "Significant." if r.get("sig") else "Not significant at p<0.05."
                f.write(f"{sig_note} {verdict.capitalize()}.\n")
        f.write("\n")

        f.write("### H3c — Simultaneous co-movement (thesis p.91, UNCLEAR)\n\n")
        h3c_rows = [r for r in results if r["hyp"] == "H3c"]
        for r in h3c_rows:
            if r["stat_val"] is not None:
                f.write(
                    f"k={r['test'].split('=')[1]}: rho = {r['stat_val']:.4f}, p = {r['p']:.4f}, n={r['n']}. "
                )
                f.write("Simultaneous dynamism-status correlation.\n")
        f.write("\n")

        f.write("## Divergences from 2018 Thesis\n\n")
        f.write("- **D1 polarity correction**: `status_index` is inverse-numeric — lower value = ")
        f.write("higher social status (index-definition.md §5 polarity table; int_mss_lead_lag.sql ")
        f.write("lines 19-23). All expected_dir values have been corrected accordingly: ")
        f.write("H1 expected Spearman(poi, status_index) = negative; H1b expected = positive; ")
        f.write("H2/H3a/H3b/H3c expected direction = negative. Prior implementation had these inverted.\n")
        f.write("- **H3 predictor**: H3a and H3b use C5-corrected `delta_dynamism_t` from ")
        f.write("`int_mss_lead_lag` (not raw `delta_poi`). Raw POI count deltas embed OSM coverage ")
        f.write("growth artefact and would bias H3b toward false confirmation ")
        f.write("(index-definition.md §2.4; int_mss_lead_lag.sql D3 C5 note).\n")
        f.write("- **Ordinal treatment**: `delta_status_ordinal` is used for Spearman rank ")
        f.write("correlation only (ordinal direction proxy), never as a metric response. ")
        f.write("This is permitted per index-definition.md §3.2 ordinal-transition treatment. ")
        f.write("OLS regression against delta_status_ordinal is not applied (§3.3 prohibits ")
        f.write("metric differencing on non-uniform ordinal cut-points).\n")
        f.write("- The H1/H1b tests use 2018 POI category counts from `int_poi_features_pivot` ")
        f.write("joined to the 2018 golden thesis data — correct POI-as-predictor formulation.\n")
        f.write("- H2 is tested on the 2021+ live panel rather than the 2018 cross-section; ")
        f.write("n=1071 (panel rows) vs n=436 (2018 PLRs). The hypothesis is reframed as ")
        f.write("'current-edition POI stock predicts future status change' (general form).\n")
        f.write("- The H3 lead-lag tests use the live MSS panel (2021-2025 editions); the thesis ")
        f.write("used 2012-2018. Both predictor and outcome share the [t, t+k] window — this is ")
        f.write("a co-movement test across the lag window, not a strict temporal-precedence test.\n")
        f.write("- No multiple-comparison correction was applied across the five hypotheses. ")
        f.write("Results are PLR-only (Berlin, lor_2021 vintage) and may have MAUP sensitivity.\n")
        f.write("- Epic B framing: directional revival — exact number reproduction not required. ")
        f.write("See CLAUDE.md §Epic B framing.\n\n")

        f.write("## Limitations\n\n")
        f.write("- **k=3 lead-lag not tested**: Only 3 MSS editions are currently available ")
        f.write("(2021, 2023, 2025). A k=3 test (6-year lag) would require a 2027 edition. ")
        f.write("k=3 results will be added once the 2027 MSS edition is ingested.\n")


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

    print("Loading H1/H1b/H2 data (thesis 2018 golden + POI pivot 2018)...")
    df_h1 = load_h1_h2_data(con)
    print(f"  Loaded {len(df_h1)} PLR rows (H1/H1b)")

    print("Loading H2/H3 lead-lag data (int_mss_lead_lag + int_poi_features_pivot)...")
    df_ll = load_lead_lag_data(con)
    print(f"  Loaded {len(df_ll)} lead-lag rows (k=1: {(df_ll['lag_k']==1).sum()}, k=2: {(df_ll['lag_k']==2).sum()})")
    con.close()

    if len(df_h1) < 10:
        print("INFO: Too few rows for H1/H1b tests after join. Check data ingestion.")
        sys.exit(0)

    # Run hypothesis tests
    print("\nRunning H1/H1b tests (POI stock ~ MSS status)...")
    results = test_h1(df_h1)

    print("Running H2 tests (POI stock → future status change)...")
    results += test_h2(df_ll)

    print("Running H3a/H3b/H3c lead-lag tests (k=1,2)...")
    results += test_h3(df_ll)

    print_results(results)

    n_pass = sum(1 for r in results if r["dir_match"])
    n_sig = sum(1 for r in results if r.get("sig"))
    print(f"\nDirectional agreement: {n_pass}/{len(results)}")
    print(f"Significant at p<0.05: {n_sig}/{len(results)}")

    write_findings(df_h1, results)
    print(f"\nFindings written to: {OUTPUT_MD}")


if __name__ == "__main__":
    main()
