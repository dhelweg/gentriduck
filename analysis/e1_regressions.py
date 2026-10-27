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

OA-A.4 (#168): every hypothesis is additionally tested against the Offering Advantage
(OA) location-quotient predictor -- the thesis's actual oa_*/prev_oa_* construct
(reference/system/80_result_h1_plr.sql, 80_result_h2_plr.sql;
int_poi_offering_advantage #166, ADR-0017) -- alongside the pre-existing raw-count /
C5-dynamism predictors (kept for continuity; see load_oa_category_panel,
load_h1_h2_data, load_lead_lag_data, and the "(OA)"-tagged rows in test_h1/h2/h3).

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

import argparse
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
# Thesis p.91 H3b: Δstatus_t leads ΔPOI_t+k — only TENTATIVELY supported (Tabelle 6-16: 'eher bestätigt')
# Thesis p.91 H3c: simultaneous co-movement — UNCLEAR
# Cross-lagged H3a/H3b design + significance-aware verdicts (2026-10-26 methodology
# review). Sibling module; same import convention as e4_early_warning -> a9.
sys.path.insert(0, str(Path(__file__).parent))
from directional_inference import (  # noqa: E402
    build_cross_lagged,
    cross_lagged_tests,
    direction_conclusion,
    summarise,
    verdict,
)

THESIS_HYPOTHESES: dict[str, dict] = {
    "H1": {
        # D1 POLARITY: status_index is inverse-numeric — higher value = lower social status
        # (index-definition.md §5 polarity table; int_mss_lead_lag.sql lines 19-23).
        # Thesis found POI supply positively correlates with social STATUS, which means
        # negatively correlates with status_index (more POIs → better status → lower index).
        # expected_dir = "negative" for raw Spearman(poi_count, status_index).
        "desc": "POI stock (total_poi_count) ~ MSS social status (status_index)",
        "citation": "Thesis p.55; verdict Tabelle 6-16 (PDF p.91): H1 proven (check mark). POI supply positively correlates with social status; because status_index is inverse-numeric (higher=worse, index-definition.md §5 polarity table), expected Spearman(poi, status_index) is negative",
        "expected_dir": "negative",
        "expected_sig": True,
    },
    "H1b": {
        # D1 POLARITY: fast-food is a contested proxy for low-status / displacement pressure
        # (thesis p.55; see also gentrification literature caveat).
        # More fast-food → lower social status → higher status_index → positive correlation.
        # expected_dir = "positive" for Spearman(poi_fast_food, status_index).
        "desc": "Fast-food POI count ~ MSS social status (status_index)",
        "citation": "Thesis p.55 H1b; verdict Tabelle 6-16: proven (check mark). Fast-food as contested proxy for low-status / displacement pressure (see gentrification literature); more fast-food → lower status → higher status_index (inverse-numeric, index-definition.md §5), expected direction positive",
        "expected_dir": "positive",
        "expected_sig": True,
    },
    "H2": {
        # D1 POLARITY: delta_status_ordinal = status_index_tk - status_index_t.
        # Positive delta → status worsened (index increased). Negative delta → improved.
        # More POI at t → gentrification pressure → status IMPROVES → delta_status_ordinal < 0.
        # expected_dir = "negative" for Spearman(poi_count_t, delta_status_ordinal).
        "desc": "Current-edition POI stock (2021+ editions) ~ future status change (delta_status_ordinal)",
        "citation": "Thesis p.55 H2; verdict Tabelle 6-16: INCONCLUSIVE (0, 'kein klares Bild' -- best model only mediocre). Current POI supply predicts future social-status improvement; delta_status_ordinal = tk - t (positive = worsened, index-definition.md §5 polarity), so expected direction is negative",
        "expected_dir": "negative",
        "expected_sig": False,  # directional only; thesis did not confirm significance for H2 in isolation
    },
    "H3a": {
        # D1 POLARITY + C5: delta_dynamism_t (C5-corrected) leads delta_status_ordinal.
        # More amenity growth (positive delta_dynamism) → gentrification → status improves
        # → delta_status_ordinal decreases (inverse-numeric). Expected direction: negative.
        "desc": "Prior POI change [e0→e1] predicts later status change [e1→e2], given prior status change + D4 (POI leads status)",
        "citation": "Thesis Tabelle 6-16 (PDF p.91): H3a REJECTED (cross mark, 'wenig spricht fuer H3a'). Cross-lagged partial Spearman rho(dPOI_P, dStatus_F | dStatus_P, D4) with a Bezirksregion cluster-bootstrap CI (analysis/directional_inference.py); POI = C5-corrected dynamism (index-definition.md §2.4) or OA; delta_status_ordinal inverse-numeric so expected direction is negative",
        "expected_dir": "negative",
        "expected_sig": False,  # thesis rejected this
    },
    "H3b": {
        # D1 POLARITY: Δstatus leads ΔPOI. Status IMPROVES (delta_status_ordinal < 0) →
        # commercial succession follows → delta_poi > 0. So Spearman(delta_status_ordinal, delta_poi)
        # should be negative (lower delta_status_ordinal = improved = leads to more POIs).
        "desc": "Prior status change [e0→e1] predicts later POI change [e1→e2], given prior POI change + D4 (status leads POI)",
        "citation": "Thesis Tabelle 6-16 (PDF p.91): H3b TENTATIVELY supported -- '(check mark)', 'eher bestaetigt', 'leichte Tendenz' -- not confirmed. Cross-lagged partial Spearman rho(dStatus_P, dPOI_F | dPOI_P, D4) with a Bezirksregion cluster-bootstrap CI (analysis/directional_inference.py); improved status = negative delta, so expected direction is negative",
        "expected_dir": "negative",
        "expected_sig": True,
    },
    "H3c": {
        # D1 POLARITY: dynamism_score_t ~ status_index_t. Higher dynamism → more gentrified
        # → better status → lower status_index (inverse-numeric). Expected direction: negative.
        "desc": "Simultaneous dynamism ~ status_index co-movement (same edition)",
        "citation": "Thesis Tabelle 6-16 (PDF p.91): H3c INCONCLUSIVE (0, 'kein klares Bild'). Simultaneous co-movement; status_index inverse-numeric (index-definition.md §5), expected direction negative",
        "expected_dir": "negative",
        "expected_sig": False,  # unclear per thesis
    },
}


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------


def load_oa_category_panel(
    con: duckdb.DuckDBPyConnection, weight_variant: str = "standard"
) -> object:
    """OA-A.4 (#168): Offering Advantage panel, one row per (area_code,
    area_vintage, snapshot_year), pivoted from `int_poi_offering_advantage`
    (ADR-0017, #166).

    Faithful Run 1 only (`methodology_variant = 'faithful'`); `weight_variant`
    defaults to 'standard' (hard point-in-polygon counts) to mirror the raw
    `int_poi_features_pivot` counts H1/H2/H3 previously used (thesis pp. 55-56,
    91 tested unweighted stock; the Gaussian-weighted variant is a Gentriduck
    addition, not part of the faithful revival -- ADR-0017 D2.3).

    **Domain-level primary, category-level fallback only for H1b (geo-DS
    Condition C-3, docs/epic-b/A3-oa-validation-geo-signoff.md §5):** "OA-A.4's
    H1-H3c regressions should primarily use domain-level OA as predictors,
    falling back to category/type only where the thesis's own hypothesis
    specifically operationalizes a finer leaf (e.g. H1b fast-food)." Category-
    /type-level OA is statistically noisier (a single POI can swing a low-count
    leaf's local share -- OA-A.2 #166's own D-3 note; C-3's own evidence: domain
    rho 0.15-0.91 vs category/type rho as low as 0.001-0.5).

    `oa_domain(gastronomy|entertainment|retail|services)`: MAX(oa_domain)
    FILTER by `poi_domain_h`, one value per domain (identical across every
    (category, type) row sharing that domain -- MAX collapses the sparse rows
    without double-counting). These four domains are exactly the ones the H1
    raw-count "upscaling proxy" categories (cafe, bar, restaurant, nightlife,
    hairdresser, clothing, beauty) fall under (Gastronomy: cafe/restaurant/
    fast-food; Entertainment: bar/nightlife; Services: hairdresser/beauty;
    Retail: clothing).

    `oa_fast_food`: MAX(oa_category) FILTER (poi_category_h = 'Fast Food') --
    the C-3-sanctioned category-level exception for H1b (thesis p.55 H1b names
    fast-food specifically, not the whole Gastronomy domain).

    `oa_mean` = unweighted mean of the 4 domain-level OA values -- the OA
    analogue of `total_poi_count` for the H1/H2/H3 "basket" tests (a single
    scalar "OA" of a closed basket is definitionally ~1, so the mean of these
    four upscaling-relevant domains is the grounded aggregate substitute, per
    C-3's domain-level-primary guidance).
    """
    df = con.execute(f"""
        SELECT
            area_code,
            area_vintage,
            snapshot_year,
            MAX(oa_domain) FILTER (WHERE poi_domain_h = 'Gastronomy')   AS oa_domain_gastronomy,
            MAX(oa_domain) FILTER (WHERE poi_domain_h = 'Entertainment') AS oa_domain_entertainment,
            MAX(oa_domain) FILTER (WHERE poi_domain_h = 'Retail')        AS oa_domain_retail,
            MAX(oa_domain) FILTER (WHERE poi_domain_h = 'Services')      AS oa_domain_services,
            MAX(oa_category) FILTER (WHERE poi_category_h = 'Fast Food') AS oa_fast_food
        FROM main.int_poi_offering_advantage
        WHERE weight_variant = '{weight_variant}'
          AND methodology_variant = 'faithful'
        GROUP BY area_code, area_vintage, snapshot_year
    """).df()
    domain_cols = [
        "oa_domain_gastronomy",
        "oa_domain_entertainment",
        "oa_domain_retail",
        "oa_domain_services",
    ]
    df["oa_mean"] = df[domain_cols].mean(axis=1, skipna=True)
    return df


def load_h1_h2_data(con: duckdb.DuckDBPyConnection) -> object:
    """Load PLR-level 2018 golden data joined with POI category counts + OA for H1/H2.

    Join key: LPAD(raum_id, 8, '0') = area_code (thesis IDs are 7-char; pivot is 8-char zero-padded).
    Snapshot year 2018, vintage lor_pre2021 matches the thesis data collection period.

    OA-A.4 (#168): also joins `int_poi_offering_advantage` category-level OA
    (`load_oa_category_panel`) at the same (area_code, 2018, lor_pre2021) cell --
    the thesis's own H1 result view (reference/system/80_result_h1_plr.sql)
    selects `oa_gastro_c_cafe_stock` etc. alongside the raw `c_*_stock`
    columns from the SAME edition (`zeit`), confirming H1's OA predictor is the
    *current*-edition OA, matching `oa_cafe` etc. here.

    Bug fix (#200, 2026-07-09): the SELECTed `area_code` alias below is now
    `LPAD(t.raum_id, 8, '0')`, matching the JOIN condition immediately below it and
    -- critically -- matching `load_oa_category_panel`'s always-8-char
    `int_poi_offering_advantage.area_code`. Previously this alias was the raw,
    unpadded `t.raum_id` (mixed length: 343 golden rows are 7-char, 93 already
    8-char), so the later `df.merge(df_oa_2018, on="area_code")` silently matched
    only the 93 already-8-char rows -- truncating the OA-tagged H1/H1b tests from
    n=436 to n=92 without raising an error. `p.area_code` (used only inside the JOIN,
    never selected) was already correctly padded; only the *aliased, returned* column
    carried the bug. The corrected n=435 H1 (OA) and n=359 H1b (OA) figures are now the
    authoritative output in docs/epic-e/E1-regression-findings.md (regenerated by this fix).
    """
    # Thesis p.55: core POI features — cafes, bars, restaurants, fast-food, nightlife,
    # hairdressers (upscaling proxies); fast-food is negative per H1b.
    df = con.execute("""
        SELECT
            LPAD(t.raum_id, 8, '0')    AS area_code,
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

    oa_available = "int_poi_offering_advantage" in {
        row[0]
        for row in con.execute(
            "SELECT table_name FROM information_schema.tables WHERE table_schema='main'"
        ).fetchall()
    }
    if oa_available:
        df_oa = load_oa_category_panel(con)
        df_oa_2018 = df_oa[
            (df_oa["snapshot_year"] == 2018) & (df_oa["area_vintage"] == "lor_pre2021")
        ]
        df = df.merge(
            df_oa_2018.drop(columns=["snapshot_year", "area_vintage"]), on="area_code", how="left"
        )
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
    QA-7b (#205): the dominant (max-weight) pre-2021↔2021 PLR crosswalk previously computed
    inline here now lives in the gated dbt intermediate int_berlin_lor_crosswalk_dominant_2021
    (R-C1; geo-DS + domain-expert sign-off in docs/epic-c/QA-7b-crosswalk-bridge-*-signoff.md).
    All 542 lor_2021 PLRs resolve to a dominant pre-2021 PLR and receive a non-zero
    poi_count — no PLR falls through to the COALESCE(0) sentinel.

    Pseudo-replication caveat: ~78 pre-2021 PLRs are the dominant match for 2+ lor_2021
    PLRs (up to 6 each), meaning ~35% of lor_2021 PLRs share their poi_count_t with at
    least one neighbour. This inflates effective N and may overstate p-value precision.
    Treat EWR regression results as directional evidence, not independent-observation
    p-values.
    """
    df = con.execute("""
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
        LEFT JOIN main.int_berlin_lor_crosswalk_dominant_2021 xw ON ll.area_code = xw.plr_id_2021
        -- lor_pre2021 crosswalk join: maps lor_2021 EWR area_code → lor_pre2021 POI area_code
        LEFT JOIN main.int_poi_features_pivot p_t_pre
            ON xw.plr_id_pre2021 = p_t_pre.area_code
            AND ll.year_t = p_t_pre.snapshot_year
            AND p_t_pre.area_vintage = 'lor_pre2021'
        LEFT JOIN main.int_poi_features_pivot p_tk_pre
            ON xw.plr_id_pre2021 = p_tk_pre.area_code
            AND ll.year_tk = p_tk_pre.snapshot_year
            AND p_tk_pre.area_vintage = 'lor_pre2021'
        -- B9 sign-off condition C-2: main H2/H3 analysis uses full-composite pairs only.
        -- Pre-2014 partial-composite rows (ewr_composite_partial only) are excluded here;
        -- they have no matching POI data and would inject zero-POI rows that dilute the signal.
        WHERE ll.any_endpoint_partial = FALSE
    """).df()
    return df


def load_lead_lag_data(con: duckdb.DuckDBPyConnection, vintage: str = "lor_2021") -> object:
    """Load MSS lead-lag panel joined with POI pivot counts + OA for H3a/H3b/H3c.

    int_mss_lead_lag provides lag_k=1,2 MSS edition pairs.
    int_poi_features_pivot is joined at edition_t and edition_tk snapshot years.
    delta_poi = poi_count_tk - poi_count_t (POI stock change over lag window).
    delta_status = status_index_tk - status_index_t (MSS ordinal status change).

    B7 (#117): vintage parameter selects the LOR boundary system.
    'lor_2021' = modern 2021-2025 panel (default).
    'lor_pre2021' = thesis-era panel, MSS editions 2013-2019 (2013 from the MSS Excel source;
    k=1: 2013→2015, 2015→2017, 2017→2019; k=2: 2013→2017, 2015→2019).

    OA-A.4 (#168): also joins `int_poi_offering_advantage` category-level OA
    (`load_oa_category_panel`) at edition_t and edition_tk, exposing
    `oa_mean_t` / `oa_mean_tk` (current + t+k OA) and `delta_oa_mean_t`
    (`oa_mean_tk - oa_mean_t`, the OA-change analogue of `delta_poi` /
    `delta_dynamism_t`). Thesis p.55 H2 uses `prev_oa_*` (an earlier edition's
    OA predicting projected future status) -- `oa_mean_t` here plays exactly
    that "prior OA" role relative to the future `delta_status_ordinal`
    (reference/system/80_result_h2_plr.sql). `delta_oa_mean_t` is a compositional
    (location-quotient) change measure, which -- being a ratio against the
    same-period city-wide total -- is structurally robust to the shared OSM
    coverage-growth artifact that motivated the C5 dynamism correction
    (index-definition.md §2.4; docs/epic-c/C5-geo-signoff.md) in a similar
    way; both are reported here (see test_h3) rather than one replacing the
    other, since C5-dynamism already has its own geo-DS sign-off.
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
            ll.ewr_composite_t,  -- D4 baseline LEVEL: cross-lagged H3 control (§4.3)
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

    tables = {
        row[0]
        for row in con.execute(
            "SELECT table_name FROM information_schema.tables WHERE table_schema='main'"
        ).fetchall()
    }
    if "int_poi_offering_advantage" in tables:
        df_oa = load_oa_category_panel(con)
        df_oa_v = df_oa[df_oa["area_vintage"] == vintage][["area_code", "snapshot_year", "oa_mean"]]
        df = df.merge(
            df_oa_v.rename(columns={"snapshot_year": "edition_t", "oa_mean": "oa_mean_t"}),
            on=["area_code", "edition_t"],
            how="left",
        )
        df = df.merge(
            df_oa_v.rename(columns={"snapshot_year": "edition_tk", "oa_mean": "oa_mean_tk"}),
            on=["area_code", "edition_tk"],
            how="left",
        )
        df["delta_oa_mean_t"] = df["oa_mean_tk"] - df["oa_mean_t"]
    return df


def load_bzr_h1_data(con: duckdb.DuckDBPyConnection, scale: str = "bzr") -> object:
    """Load BZR/Bezirk-level cross-section for H1 at coarser spatial scales.

    B10 (#120): extend H1 to BZR (~137 units in lor_pre2021) and Bezirk (~12 districts).
    Uses stg_thesis_2018_result_bzr for BZR status labels joined with BZR-level POI sums
    from int_poi_features_pivot (summed over lor_pre2021 PLRs, snapshot 2018).

    BZR code = first 6 chars of 8-char PLR area_code (pre-2021 system).
    For lor_pre2021, these match the 2018 thesis BZR raum_ids exactly (verified B10).

    Thesis BZR status_index is a z-score float (not the MSS ordinal 1-4).
    We use the thesis status_index directly for H1 at BZR scale, same as PLR scale uses
    stg_thesis_2018_result_plr.status_index.

    For Bezirk scale (12 units), we aggregate thesis BZR data further to Bezirk level
    (first 2 chars of BZR raum_id).

    MAUP note (Thesis §3.2): correlations at coarser scales are typically stronger due to
    spatial smoothing. BZR/Bezirk H1 results should be compared against PLR H1 to assess
    MAUP sensitivity, not treated as independent confirmation.
    """
    if scale == "bzr":
        # BZR level: thesis BZR golden joined with BZR POI sums
        df = con.execute("""
            WITH bzr_poi AS (
                SELECT
                    city_code,
                    SUBSTR(area_code, 1, 6) AS bzr_code,
                    snapshot_year,
                    SUM(total_poi_count) AS total_poi_count,
                    SUM(COALESCE(poi_cafe, 0)) AS poi_cafe,
                    SUM(COALESCE(poi_bar, 0)) AS poi_bar,
                    SUM(COALESCE(poi_restaurant, 0)) AS poi_restaurant,
                    SUM(COALESCE(poi_fast_food, 0)) AS poi_fast_food,
                    SUM(COALESCE(poi_nightlife, 0)) AS poi_nightlife,
                    SUM(COALESCE(poi_hairdresser, 0)) AS poi_hairdresser,
                    SUM(COALESCE(poi_clothing, 0)) AS poi_clothing,
                    SUM(COALESCE(poi_beauty, 0)) AS poi_beauty
                FROM main.int_poi_features_pivot
                WHERE area_vintage = 'lor_pre2021' AND snapshot_year = 2018
                GROUP BY city_code, bzr_code, snapshot_year
            )
            SELECT
                t.raum_id AS area_code,
                -- Thesis BZR status_index is a normalized float (z-score style)
                -- Same D1 polarity caveat: higher status_summe = more deprived (thesis scale)
                -- For thesis BZR, status_sum is the raw deprivation composite (higher=worse),
                -- and status_index is its z-score. Use status_sum directly for Spearman
                -- (monotonic transform preserves rank; see index-definition.md §5).
                t.status_sum AS status_index,
                t.ew AS residents_total,
                p.total_poi_count,
                p.poi_cafe, p.poi_bar, p.poi_restaurant, p.poi_fast_food,
                p.poi_nightlife, p.poi_hairdresser, p.poi_clothing, p.poi_beauty
            FROM main.stg_thesis_2018_result_bzr t
            JOIN bzr_poi p ON t.raum_id = p.bzr_code
            WHERE t.status_sum IS NOT NULL
              AND p.total_poi_count IS NOT NULL
        """).df()
    elif scale == "bezirk":
        # Bezirk level: aggregate BZR thesis data to 12 districts
        df = con.execute("""
            WITH bzr_poi AS (
                SELECT
                    SUBSTR(area_code, 1, 6) AS bzr_code,
                    SUM(total_poi_count) AS total_poi_count,
                    SUM(COALESCE(poi_cafe, 0)) AS poi_cafe,
                    SUM(COALESCE(poi_bar, 0)) AS poi_bar,
                    SUM(COALESCE(poi_restaurant, 0)) AS poi_restaurant,
                    SUM(COALESCE(poi_fast_food, 0)) AS poi_fast_food,
                    SUM(COALESCE(poi_nightlife, 0)) AS poi_nightlife,
                    SUM(COALESCE(poi_hairdresser, 0)) AS poi_hairdresser,
                    SUM(COALESCE(poi_clothing, 0)) AS poi_clothing,
                    SUM(COALESCE(poi_beauty, 0)) AS poi_beauty
                FROM main.int_poi_features_pivot
                WHERE area_vintage = 'lor_pre2021' AND snapshot_year = 2018
                GROUP BY bzr_code
            ),
            bezirk_thesis AS (
                SELECT
                    SUBSTR(raum_id, 1, 2) AS bezirk_code,
                    SUM(status_sum * COALESCE(ew, 1.0)) / NULLIF(SUM(COALESCE(ew, 1.0)), 0) AS status_index,
                    SUM(COALESCE(ew, 0.0)) AS residents_total
                FROM main.stg_thesis_2018_result_bzr
                WHERE status_sum IS NOT NULL
                GROUP BY bezirk_code
            ),
            bezirk_poi AS (
                SELECT
                    SUBSTR(bzr_code, 1, 2) AS bezirk_code,
                    SUM(total_poi_count) AS total_poi_count,
                    SUM(poi_cafe) AS poi_cafe,
                    SUM(poi_bar) AS poi_bar,
                    SUM(poi_restaurant) AS poi_restaurant,
                    SUM(poi_fast_food) AS poi_fast_food,
                    SUM(poi_nightlife) AS poi_nightlife,
                    SUM(poi_hairdresser) AS poi_hairdresser,
                    SUM(poi_clothing) AS poi_clothing,
                    SUM(poi_beauty) AS poi_beauty
                FROM bzr_poi
                GROUP BY bezirk_code
            )
            SELECT
                t.bezirk_code AS area_code,
                t.status_index,
                t.residents_total,
                p.total_poi_count,
                p.poi_cafe, p.poi_bar, p.poi_restaurant, p.poi_fast_food,
                p.poi_nightlife, p.poi_hairdresser, p.poi_clothing, p.poi_beauty
            FROM bezirk_thesis t
            JOIN bezirk_poi p ON t.bezirk_code = p.bezirk_code
            WHERE t.status_index IS NOT NULL
              AND p.total_poi_count IS NOT NULL
        """).df()
    else:
        raise ValueError(f"Unknown scale: {scale!r}. Use 'plr', 'bzr', or 'bezirk'.")
    return df


def load_bzr_lead_lag_data(con: duckdb.DuckDBPyConnection, scale: str = "bzr") -> object:
    """Load BZR/Bezirk-level MSS lead-lag panel for H2/H3 at coarser spatial scales.

    B10 (#120): int_mss_bzr_aggregate provides population-weighted rollups of MSS,
    EWR, and POI data at BZR and Bezirk level. We build a synthetic lead-lag panel
    from consecutive MSS editions using the same lag_k structure as int_mss_lead_lag.

    For lor_2021 editions: 2021->2023 (k=1), 2021->2025 (k=2).
    For lor_pre2021 editions: 2015->2017 (k=1), 2017->2019 (k=1), 2015->2019 (k=2).

    delta_status_ordinal = status_index_tk - status_index_t (same polarity as PLR).
    status_transition: 'improved' if delta<0, 'worsened' if delta>0, 'stable' if delta=0.
    dynamism_score_t / delta_dynamism_t: from the BZR aggregate.

    MAUP note: BZR/Bezirk panels have far fewer rows (n_bzr*n_editions vs n_plr*n_editions).
    Statistical power is reduced. Results at Bezirk scale (12 units) are particularly
    susceptible to small-sample effects and should be interpreted with caution.
    """
    area_level = scale  # 'bzr' or 'bezirk'

    df = con.execute(f"""
        WITH base AS (
            SELECT
                city_code,
                area_code,
                area_vintage,
                snapshot_year AS edition,
                status_index,
                dynamik_index,
                dynamism_score,
                total_poi_count
            FROM main.int_mss_bzr_aggregate
            WHERE area_level = '{area_level}'
              AND status_index IS NOT NULL
        ),
        -- Generate lead-lag pairs for k=1 and k=2
        -- lor_2021: (2021->2023, k=1), (2023->2025, k=1), (2021->2025, k=2)
        -- lor_pre2021: (2015->2017, k=1), (2017->2019, k=1), (2015->2019, k=2)
        pairs AS (
            SELECT
                b.city_code,
                b.area_code,
                b.area_vintage,
                1 AS lag_k,
                b.edition AS edition_t,
                bk.edition AS edition_tk,
                b.status_index AS status_index_t,
                bk.status_index AS status_index_tk,
                bk.status_index - b.status_index AS delta_status_ordinal,
                b.dynamism_score AS dynamism_score_t,
                bk.dynamism_score AS dynamism_score_tk,
                bk.dynamism_score - b.dynamism_score AS delta_dynamism_t,
                b.total_poi_count AS poi_count_t,
                bk.total_poi_count AS poi_count_tk,
                bk.total_poi_count - b.total_poi_count AS delta_poi
            FROM base b
            JOIN base bk
                ON b.area_code = bk.area_code
                AND b.area_vintage = bk.area_vintage
                AND (
                    -- lor_2021 k=1 pairs
                    (b.area_vintage = 'lor_2021' AND b.edition = 2021 AND bk.edition = 2023)
                    OR (b.area_vintage = 'lor_2021' AND b.edition = 2023 AND bk.edition = 2025)
                    -- lor_pre2021 k=1 pairs
                    OR (b.area_vintage = 'lor_pre2021' AND b.edition = 2015 AND bk.edition = 2017)
                    OR (b.area_vintage = 'lor_pre2021' AND b.edition = 2017 AND bk.edition = 2019)
                )
            UNION ALL
            SELECT
                b.city_code,
                b.area_code,
                b.area_vintage,
                2 AS lag_k,
                b.edition AS edition_t,
                bk.edition AS edition_tk,
                b.status_index AS status_index_t,
                bk.status_index AS status_index_tk,
                bk.status_index - b.status_index AS delta_status_ordinal,
                b.dynamism_score AS dynamism_score_t,
                bk.dynamism_score AS dynamism_score_tk,
                bk.dynamism_score - b.dynamism_score AS delta_dynamism_t,
                b.total_poi_count AS poi_count_t,
                bk.total_poi_count AS poi_count_tk,
                bk.total_poi_count - b.total_poi_count AS delta_poi
            FROM base b
            JOIN base bk
                ON b.area_code = bk.area_code
                AND b.area_vintage = bk.area_vintage
                AND (
                    -- lor_2021 k=2 pair
                    (b.area_vintage = 'lor_2021' AND b.edition = 2021 AND bk.edition = 2025)
                    -- lor_pre2021 k=2 pair
                    OR (b.area_vintage = 'lor_pre2021' AND b.edition = 2015 AND bk.edition = 2019)
                )
        )
        SELECT
            *,
            CASE
                WHEN delta_status_ordinal < 0 THEN 'improved'
                WHEN delta_status_ordinal > 0 THEN 'worsened'
                ELSE 'stable'
            END AS status_transition
        FROM pairs
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

    # OA-A.4 (#168): OA-quotient predictors -- the thesis's actual H1/H1b
    # construct (reference/system/80_result_h1_plr.sql selects oa_gastro_c_cafe_stock
    # etc. alongside the raw stocks). oa_mean (mean of the 4 upscaling-relevant
    # domain OA values, load_oa_category_panel, geo-DS Condition C-3) replaces
    # total_poi_count;
    # oa_fast_food replaces poi_fast_food for H1b. Same expected directions as
    # the raw-count tests (Epic B directional-revival framing, CLAUDE.md) --
    # OA and raw stock are expected to move together for these proxies, though
    # OA is compositional (relative to city-wide share) rather than absolute.
    if "oa_mean" in df.columns:
        x_oa = df["oa_mean"].values.astype(float)
        r_oa = run_spearman(x_oa, y, "Spearman(oa_mean, status_index)")
        results.append(
            {
                "hyp": "H1",
                "test": "Spearman (OA)",
                "desc": "OA-quotient basket (mean of 4 upscaling-relevant domain OAs) ~ MSS social status",
                "citation": (
                    "Thesis p.55 H1, OA construct (reference/system/80_result_h1_plr.sql "
                    "oa_* columns; int_poi_offering_advantage #166/ADR-0017); OA-A.4 #168 "
                    "swaps the raw-stock predictor for the domain-level OA quotient (geo-DS "
                    "Condition C-3, docs/epic-b/A3-oa-validation-geo-signoff.md §5: "
                    '"H1-H3c ... should primarily use domain-level OA"). '
                    "Same D1 polarity as the raw-count H1 test (status_index inverse-numeric)."
                ),
                "stat_val": r_oa["rho"],
                "stat_type": "rho",
                "n": r_oa["n"],
                "p": r_oa["p"],
                "sig": r_oa["sig"],
                "r2": None,
                "expected_dir": THESIS_HYPOTHESES["H1"]["expected_dir"],
                "actual_dir": _dir(r_oa["rho"]),
                "dir_match": _dir_match(r_oa["rho"], THESIS_HYPOTHESES["H1"]["expected_dir"]),
            }
        )

        r_oa_ols = run_ols(x_oa, y, "OLS(status_index ~ oa_mean)")
        results.append(
            {
                "hyp": "H1",
                "test": "OLS (OA)",
                "desc": "OA-quotient basket (mean of 4 upscaling-relevant domain OAs) ~ MSS social status",
                "citation": (
                    "Thesis p.55 H1, OA construct (reference/system/80_result_h1_plr.sql); "
                    "OA-A.4 #168, geo-DS Condition C-3 (domain-level primary)."
                ),
                "stat_val": r_oa_ols["coef"],
                "stat_type": "beta",
                "n": r_oa_ols["n"],
                "p": r_oa_ols["p"],
                "sig": r_oa_ols["sig"],
                "r2": r_oa_ols["r2"],
                "expected_dir": THESIS_HYPOTHESES["H1"]["expected_dir"],
                "actual_dir": _dir(r_oa_ols["coef"]),
                "dir_match": _dir_match(r_oa_ols["coef"], THESIS_HYPOTHESES["H1"]["expected_dir"]),
            }
        )

    if "oa_fast_food" in df.columns:
        xf_oa = df["oa_fast_food"].values.astype(float)
        r_ff_oa = run_spearman(xf_oa, y, "Spearman(oa_fast_food, status_index)")
        results.append(
            {
                "hyp": "H1b",
                "test": "Spearman (OA)",
                "desc": "Fast-food OA quotient ~ MSS social status (status_index)",
                "citation": (
                    "Thesis p.55 H1b, OA construct (reference/system/80_result_h1_plr.sql "
                    "oa_gastro_c_fast_food_stock); OA-A.4 #168 swaps the raw fast-food count "
                    "for its OA quotient -- category-level here per geo-DS Condition C-3's "
                    "explicit fast-food exception (docs/epic-b/A3-oa-validation-geo-signoff.md "
                    "§5). Same D1 polarity as the raw-count H1b test."
                ),
                "stat_val": r_ff_oa["rho"],
                "stat_type": "rho",
                "n": r_ff_oa["n"],
                "p": r_ff_oa["p"],
                "sig": r_ff_oa["sig"],
                "r2": None,
                "expected_dir": THESIS_HYPOTHESES["H1b"]["expected_dir"],
                "actual_dir": _dir(r_ff_oa["rho"]),
                "dir_match": _dir_match(r_ff_oa["rho"], THESIS_HYPOTHESES["H1b"]["expected_dir"]),
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

        # OA-A.4 (#168): oa_mean_t ~ delta_status_ordinal -- the thesis's actual
        # H2 construct is prev_oa_* (an earlier edition's OA quotient predicting
        # projected future status, reference/system/80_result_h2_plr.sql);
        # oa_mean_t (edition_t domain-level OA, load_oa_category_panel, geo-DS
        # Condition C-3) plays that "prior OA"
        # role relative to delta_status_ordinal (edition_t -> edition_tk).
        if "oa_mean_t" in sub.columns:
            x_oa = sub["oa_mean_t"].values.astype(float)
            r_oa = run_spearman(x_oa, y, f"Spearman(oa_mean_t, delta_status, k={k})")
            results.append(
                {
                    "hyp": "H2",
                    "test": f"Spearman (OA) k={k}",
                    "desc": (
                        f"Current-edition OA-quotient basket ~ future status change "
                        f"[k={k} MSS editions, {panel_label}]"
                    ),
                    "citation": (
                        "Thesis p.55 H2, prev_oa_* construct (reference/system/80_result_h2_plr.sql); "
                        "OA-A.4 #168 swaps the raw POI-stock predictor for the domain-level OA "
                        "quotient (oa_mean_t = mean of 4 upscaling-relevant domain OAs, edition_t; "
                        "geo-DS Condition C-3, docs/epic-b/A3-oa-validation-geo-signoff.md §5)."
                    ),
                    "stat_val": r_oa["rho"],
                    "stat_type": "rho",
                    "n": r_oa["n"],
                    "p": r_oa["p"],
                    "sig": r_oa["sig"],
                    "r2": None,
                    "expected_dir": THESIS_HYPOTHESES["H2"]["expected_dir"],
                    "actual_dir": _dir(r_oa["rho"]),
                    "dir_match": _dir_match(r_oa["rho"], THESIS_HYPOTHESES["H2"]["expected_dir"]),
                }
            )

    return results


def _cross_lag_rows(cl, tests: dict, k: int, tag: str, measure_note: str) -> list[dict]:
    """Result rows for one cross-lagged H3a/H3b pair (see directional_inference.py)."""
    rows = []
    pivots = sorted({int(p) for p in cl["pivot"]}) if not cl.empty else []
    window_note = f"pivot edition(s) {pivots}" if pivots else "no consecutive windows"
    for hyp in ("H3a", "H3b"):
        res = tests[hyp]
        rows.append(
            {
                "hyp": hyp,
                "test": f"Cross-lagged{tag} k={k}",
                "desc": (
                    f"{THESIS_HYPOTHESES[hyp]['desc']} [{measure_note}; k={k}; {window_note}; "
                    + (
                        "D4 control"
                        if res.get("d4_control")
                        else "no D4 control -- unavailable at the pivot"
                    )
                    + "]"
                ),
                "citation": THESIS_HYPOTHESES[hyp]["citation"],
                "stat_val": res["rho"],
                "stat_type": "partial rho",
                "n": res["n"],
                "p": res["p"],
                "ci_low": res["ci_low"],
                "ci_high": res["ci_high"],
                "n_clusters": res["n_clusters"],
                "r2": None,
                "expected_dir": THESIS_HYPOTHESES[hyp]["expected_dir"],
                "actual_dir": _dir(res["rho"]),
                "dir_match": _dir_match(res["rho"], THESIS_HYPOTHESES[hyp]["expected_dir"]),
            }
        )
    return rows


def test_h3(df_ll: object, panel_label: str = "2021+ panel") -> list[dict]:
    """H3a/H3b (cross-lagged, directional) and H3c (contemporaneous).

    Thesis verdicts (Tabelle 6-16, PDF p.91): H3a REJECTED, H3b TENTATIVELY supported
    ("eher bestaetigt"), H3c inconclusive.

    H3a and H3b are claims about temporal ORDER, so they are tested with a cross-lagged
    panel design (analysis/directional_inference.py): around each pivot edition e1 the
    prior window P = [e0, e1] and the following window F = [e1, e2] never overlap, and

        H3a = partial_rho(dPOI_P,    dStatus_F | dStatus_P, D4_e1)
        H3b = partial_rho(dStatus_P, dPOI_F    | dPOI_P,    D4_e1)

    each controlling for the outcome's own prior change. Until 2026-10-26 this function
    computed H3b as Spearman of the SAME two arrays as H3a with the arguments swapped
    (Spearman is symmetric, so H3b always equalled H3a), and the OA variants correlated
    two changes over the same window. Neither test separated the directions.

    Rank-based (partial Spearman) because MSS status is ordinal -- metric differencing of
    MSS codes is prohibited (index-definition.md §3.2/§3.3). CIs: cluster bootstrap over
    Bezirksregionen (spatial dependence, thesis weakness W1); the verdict uses the CI.

    POI measures: C5-corrected D3 dynamism (index-definition.md §2.4 -- raw counts carry
    the OSM-coverage-growth artefact) and, where present, the OA-quotient basket (#168).
    D4 control (ewr_composite_t, LEVEL only, §4.3) where the panel carries it.

    D1 POLARITY (index-definition.md §5): status_index is inverse-numeric (higher =
    more deprived), so an improvement is a NEGATIVE delta and the theory-expected sign of
    both cross-lags is negative.
    """
    results = []
    control = "ewr_composite_t" if "ewr_composite_t" in df_ll.columns else None
    measures = [("", ("dynamism_score_t", "dynamism_score_tk"), "C5-corrected dynamism")]
    if {"oa_mean_t", "oa_mean_tk"} <= set(df_ll.columns):
        measures.append((" (OA)", ("oa_mean_t", "oa_mean_tk"), "OA-quotient basket"))

    for k in sorted(int(x) for x in df_ll["lag_k"].unique()):
        for tag, cols, note in measures:
            cl = build_cross_lagged(df_ll, k=k, poi_cols=cols, control_col=control)
            if cl.empty:
                print(
                    f"  NOTE ({panel_label}): no consecutive k={k} windows for the "
                    f"cross-lagged H3a/H3b{tag} test -- skipped"
                )
                continue
            results += _cross_lag_rows(cl, cross_lagged_tests(cl), k, tag, note)

        # H3c: contemporaneous level co-movement at edition t (not a lead-lag claim).
        sub = df_ll[df_ll["lag_k"] == k]
        if len(sub) < 10:
            continue
        stat_t = sub["status_index_t"].values.astype(float)
        dyn_t = sub["dynamism_score_t"].values.astype(float)
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
        if "oa_mean_t" in sub.columns:
            oa_t = sub["oa_mean_t"].values.astype(float)
            r3c_oa = run_spearman(oa_t, stat_t, f"Spearman(oa_mean_t, status_t, k={k})")
            results.append(
                {
                    "hyp": "H3c",
                    "test": f"Spearman (OA) k={k}",
                    "desc": f"Simultaneous OA-quotient ~ status_index co-movement (same edition) [k={k}]",
                    "citation": THESIS_HYPOTHESES["H3c"]["citation"] + " OA construct (#168).",
                    "stat_val": r3c_oa["rho"],
                    "stat_type": "rho",
                    "n": r3c_oa["n"],
                    "p": r3c_oa["p"],
                    "sig": r3c_oa["sig"],
                    "r2": None,
                    "expected_dir": THESIS_HYPOTHESES["H3c"]["expected_dir"],
                    "actual_dir": _dir(r3c_oa["rho"]),
                    "dir_match": _dir_match(
                        r3c_oa["rho"], THESIS_HYPOTHESES["H3c"]["expected_dir"]
                    ),
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
        ewr_t = sub["ewr_composite_t"].values.astype(float)
        poi_t = sub["poi_count_t"].values.astype(float)

        # H3a/H3b (2026-10-26): cross-lagged, ordered non-overlapping windows. Before, H3a
        # correlated delta_poi and delta_ewr over the SAME [t, t+k] window (co-movement,
        # not order) while H3b correctly paired the PRIOR status change with the following
        # POI change, so the two were never comparable. Both now use the cross-lagged
        # design (see test_h3 / directional_inference.py). Status = EWR composite (metric;
        # lower = better status), POI = raw count via the dominant crosswalk, control =
        # composite LEVEL at the pivot year. Repeated years per area and the crosswalk's
        # pseudo-replication (load_ewr_lead_lag_data docstring) are both absorbed by the
        # Bezirksregion cluster bootstrap.
        cl = build_cross_lagged(
            df_ewr,
            k=k,
            status_cols=("ewr_composite_t", "ewr_composite_tk"),
            poi_cols=("poi_count_t", "poi_count_tk"),
            control_col="ewr_composite_t",
            time_cols=("year_t", "year_tk"),
        )
        if cl.empty:
            print(f"  NOTE (EWR): no consecutive k={k} windows for cross-lagged H3a/H3b -- skipped")
        else:
            results += _cross_lag_rows(cl, cross_lagged_tests(cl), k, " (EWR)", "raw POI count")

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


def attach_verdicts(results: list[dict]) -> list[dict]:
    """Score every row (2026-10-26). Significance is REQUIRED: the old `dir_match`
    "PASS" only checked the sign, so e.g. rho = -0.05, p = 0.33 counted as confirming the
    thesis. Cross-lagged rows use their cluster-bootstrap CI; the rest use p < 0.05."""
    for r in results:
        r["verdict"] = verdict(
            r.get("stat_val"),
            r["expected_dir"],
            p=r.get("p"),
            ci_low=r.get("ci_low"),
            ci_high=r.get("ci_high"),
        )
        r["sig"] = r["verdict"] in ("SUPPORTED", "CONTRADICTED")
        # Borderline: the cluster CI only just excludes 0 while the analytic p does not
        # reach 0.05 -- the two inference routes disagree, so the label says so. Counts
        # still use the canonical verdict.
        r["borderline"] = bool(
            r["sig"] and r.get("ci_low") is not None and r.get("p") is not None and r["p"] >= 0.05
        )
    return results


def _verdict_label(r: dict) -> str:
    v = r.get("verdict", "?")
    return f"{v} (borderline)" if r.get("borderline") else v


def h3_direction_lines(results: list[dict]) -> list[str]:
    """One line per cross-lagged (test, k) pair: which series leads, if any."""
    lines = []
    seen = []
    for r in results:
        if r["hyp"] == "H3a" and r["test"].startswith("Cross-lagged"):
            seen.append(r["test"])
    for test in seen:
        a = next(r for r in results if r["hyp"] == "H3a" and r["test"] == test)
        b = next((r for r in results if r["hyp"] == "H3b" and r["test"] == test), None)
        if b is None:
            continue
        lines.append(
            f"- **{test}:** {direction_conclusion(a['verdict'], b['verdict'])} "
            f"(H3a {_verdict_label(a)}, H3b {_verdict_label(b)})"
        )
    return lines


def _value_str(r: dict) -> str:
    val = _fmt_val(r["stat_val"])
    if r.get("ci_low") is not None and r.get("ci_high") is not None:
        val += f" [{r['ci_low']:.3f}, {r['ci_high']:.3f}]"
    if r.get("r2") is not None:
        val += f" R2={r['r2']:.4f}"
    return val


def _summary_lines(rows: list[dict]) -> list[str]:
    lines = [f"Verdicts: {summarise([r['verdict'] for r in rows])}"]
    direction = h3_direction_lines(rows)
    if direction:
        lines += ["Direction (cross-lagged H3a vs H3b):", *direction]
    return lines


def _print_verdicts(label: str, rows: list[dict]) -> None:
    attach_verdicts(rows)
    print(f"\n{label} -- " + "\n".join(_summary_lines(rows)))


def _write_section_summary(f, rows: list[dict]) -> None:
    attach_verdicts(rows)
    f.write(f"\n**Verdicts:** {summarise([r['verdict'] for r in rows])}\n\n")
    direction = h3_direction_lines(rows)
    if direction:
        f.write("**Direction (cross-lagged H3a vs H3b):**\n\n" + "\n".join(direction) + "\n\n")


def print_results(results: list[dict]) -> None:
    attach_verdicts(results)
    print("\n" + "=" * 100)
    print("E1 REGRESSION RESULTS — Thesis H1-H3c Validation (real hypotheses, POI predictors)")
    print("=" * 100)
    hdr = f"{'Hyp':<5} {'Test':<24} {'N':<5} {'Value [95% CI]':<26} {'p-val':<10} {'ExpDir':<9} {'Verdict':<16} Description"
    print(hdr)
    print("-" * 100)
    for r in results:
        p_str = f"{r['p']:.4f}" if r.get("p") is not None else "N/A"
        print(
            f"{r['hyp']:<5} {r['test']:<24} {r['n']:<5} {_value_str(r):<26} "
            f"{p_str:<10} {r['expected_dir']:<9} {_verdict_label(r):<28} {r['desc']}"
        )


def _write_results_table(f, results: list[dict]) -> None:
    f.write(
        "| Hyp | Test | N | Statistic | Value [95% CI] | p-value | Expected dir | Verdict | Description |\n"
    )
    f.write("|---|---|---|---|---|---|---|---|---|\n")
    for r in results:
        p_str = f"{r['p']:.4f}" if r.get("p") is not None else "N/A"
        f.write(
            f"| {r['hyp']} | {r['test']} | {r['n']} | {r['stat_type']} | {_value_str(r)} | "
            f"{p_str} | {r['expected_dir']} | {_verdict_label(r)} | {r['desc']} |\n"
        )


def write_findings(
    df_h1,
    results_mss: list[dict],
    results_ewr: list[dict] | None = None,
    results_mss_pre: list[dict] | None = None,
    results_bzr: list[dict] | None = None,
    results_bezirk: list[dict] | None = None,
) -> None:
    import datetime

    today = datetime.date.today().isoformat()

    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_MD, "w", encoding="utf-8") as f:
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
            "- **Data (H2/H3 MSS 2013–2019, B7):** int_mss_lead_lag (lor_pre2021) + int_poi_features_pivot\n"
        )
        if results_ewr:
            f.write(
                "- **Data (H2/H3 EWR):** int_ewr_lead_lag + int_poi_features_pivot (2014–2020, same-era as thesis)\n"
            )
        f.write(
            "- **Method:** Spearman / OLS for H1, H2 and H3c; cross-lagged partial Spearman "
            "with a Bezirksregion cluster-bootstrap 95% CI for H3a/H3b "
            "(`analysis/directional_inference.py`). Every result needs significance to "
            "count -- see Scoring.\n\n"
        )

        f.write("## Methodology\n\n")
        f.write("Spearman rank correlations and OLS regression test five hypotheses from the 2018 ")
        f.write("Berlin gentrification thesis (pp. 55-56, p. 91). POI category counts from ")
        f.write("`int_poi_features_pivot` are used as the primary predictor variables.\n\n")
        f.write(
            "**OA-A.4 (#168) rework:** every hypothesis is ALSO tested against the Offering "
            "Advantage (OA) location-quotient predictor -- the thesis's actual "
            "`oa_*`/`prev_oa_*` construct (reference/system/80_result_h1_plr.sql, "
            "80_result_h2_plr.sql; `int_poi_offering_advantage` #166, ADR-0017) -- rows tagged "
            "`(OA)` in the test column. Raw-count rows are retained unlabelled for continuity "
            "and comparison; OA rows are the ticket's primary swapped predictor. `oa_mean` "
            "(H1/H1b) and `oa_mean_t`/`delta_oa_mean_t` (H2/H3) are the mean of the 4 "
            "upscaling-relevant domain OAs (Gastronomy, Entertainment, Retail, Services -- "
            "geo-DS Condition C-3, domain-level primary) from `load_oa_category_panel` -- see docstrings in "
            "`analysis/e1_regressions.py`. OA is available at PLR scale only (built from "
            "`fct_poi_development`/`int_osm_poi_plr_weighted`, both PLR-grain); BZR/Bezirk "
            "(B10 #120) and the EWR same-era panel keep their pre-existing raw-count/dynamism "
            "predictors unchanged -- a documented Epic B directional-divergence scope boundary, "
            'not a defect (CLAUDE.md "Epic B framing"), left for a future ticket if an '
            "OA-BZR/Bezirk or OA-EWR bridge is wanted.\n\n"
        )
        f.write("**Three comparison sets for H2/H3:**\n\n")
        f.write(
            "1. **MSS panel (2021–2025):** Uses `int_mss_lead_lag` (lor_2021) — best ground truth "
        )
        f.write(
            "(official Berlin social monitoring index) but a different era and index than the thesis.\n"
        )
        f.write(
            "2. **MSS pre-2021 panel (2013–2019, B7 #117):** Uses `int_mss_lead_lag` (lor_pre2021) — "
        )
        f.write("thesis-era boundary system (447 PLRs). Enables same-era H3b lead-lag. ")
        f.write(
            "Editions 2013-2019 (2013 from the MSS Excel source): k=1 pairs 2013→2015, 2015→2017, "
            "2017→2019. Z-scores not cross-vintage comparable.\n"
        )
        f.write("3. **EWR resident-register composite (2014–2020):** Uses `int_ewr_lead_lag`. ")
        f.write(
            "EWR is Berlin's resident register (Einwohnerregister); its composite measures population composition (residence duration, age, nationality, migration background), NOT social status, and it was not the thesis's outcome measure -- the thesis used MSS Status/Dynamik (editions 2013-2017; thesis §6.2.3, Tabelle 6-1). "
        )
        f.write("delta_ewr is metric (z-score arithmetic diff) so OLS is also valid.\n\n")
        f.write("## Scoring\n\n")
        f.write(
            'Each row gets one verdict (2026-10-26; previously a row "passed" whenever its '
            "sign matched, so a rho of -0.05 with p = 0.33 counted as confirming the thesis):\n\n"
            "- **SUPPORTED** -- significant, in the thesis's expected direction.\n"
            "- **CONTRADICTED** -- significant, in the opposite direction.\n"
            "- **NOT SIGNIFICANT** -- the data cannot tell (whatever the sign).\n"
            "- **NO DATA** -- not testable on this panel.\n\n"
            "Significance = the 95% cluster-bootstrap CI excludes 0 for cross-lagged rows, "
            "else p < 0.05. Epic B is a *directional* revival (exact numbers need not match), "
            "but a direction only counts when the data actually establish it.\n\n"
        )
        f.write("## H3a vs H3b: how direction is tested\n\n")
        f.write(
            "H3a (commercial change precedes status change) and H3b (status change precedes "
            "commercial change) are claims about ORDER. Around each pivot edition e1 the prior "
            "window [e0, e1] and the following window [e1, e2] never overlap:\n\n"
            "- H3a = partial rho(dPOI prior, dStatus following | dStatus prior, D4)\n"
            "- H3b = partial rho(dStatus prior, dPOI following | dPOI prior, D4)\n\n"
            "Each controls for the outcome's own prior change. **Before 2026-10-26 the two were "
            "not separable:** on the MSS panels H3b was Spearman of the same two arrays as H3a "
            "with the arguments swapped (identical by symmetry), the OA variants and the EWR "
            "H3a correlated two changes over the same window, and only one direction per "
            "panel was ever genuinely lagged. Rank-based because MSS status is ordinal "
            "(index-definition.md §3.2).\n\n"
        )

        f.write("## Hypothesis Citations\n\n")
        for key, hyp in THESIS_HYPOTHESES.items():
            f.write(f"- **{key}**: {hyp['citation']}\n")
        f.write("\n")

        panels = [
            ("MSS modern (2021–2025)", results_mss),
            ("MSS pre-2021 (2013–2019, the thesis's editions)", results_mss_pre or []),
            ("EWR resident-register composite (2014–2020)", results_ewr or []),
            ("BZR scale", results_bzr or []),
            ("Bezirk scale", results_bezirk or []),
        ]
        for _, rows in panels:
            attach_verdicts(rows)

        f.write("## Results — Section 1: H1/H1b (2018 cross-section)\n\n")
        h1_results = [r for r in results_mss if r["hyp"] in ("H1", "H1b")]
        _write_results_table(f, h1_results)
        _write_section_summary(f, h1_results)

        f.write("## Results — Section 2: H2/H3 MSS Panel (modern era, 2021–2025)\n\n")
        f.write(
            "> Different era and index than thesis. MSS is a better ground truth but covers "
            "2021–2025, not 2012–2018. Three editions -> ONE cross-lagged pivot (2023), and NO D4 "
            "control (EWR 2021-2023 was never published): treat its H3a/H3b rows as a single-window "
            "estimate. Rows marked (borderline) have a CI that only just excludes 0 while the "
            "analytic p does not reach 0.05.\n\n"
        )
        mss_h23 = [r for r in results_mss if r["hyp"] not in ("H1", "H1b")]
        _write_results_table(f, mss_h23)
        _write_section_summary(f, mss_h23)

        if results_mss_pre:
            f.write(
                "## Results — Section 3: H2/H3 MSS Pre-2021 Panel (thesis-era, 2013–2019, B7 #117)\n\n"
            )
            f.write(
                "> lor_pre2021 boundary system (447 PLRs). Same era as the thesis. Z-scores "
                "normalised within lor_pre2021 -- NOT comparable to Section 2. Editions 2013-2019 "
                "give two cross-lagged pivots (2015, 2017).\n\n"
            )
            _write_results_table(f, results_mss_pre)
            _write_section_summary(f, results_mss_pre)

        if results_ewr:
            f.write("## Results — Section 4: H2/H3 EWR Resident-Register Composite (2014–2020)\n\n")
            f.write(
                "> EWR is Berlin's resident register (Einwohnerregister); its composite measures population composition (residence duration, age, nationality, migration background), NOT social status, and it was not the thesis's outcome measure -- the thesis used MSS Status/Dynamik (editions 2013-2017; thesis §6.2.3, Tabelle 6-1). H3c here correlates same-year LEVELS, not co-occurring "
                "changes -- not a like-for-like test of H3c. The POI side is the raw OSM count "
                "without the C5 completeness correction, so mapping growth can feed both "
                "directions. Annual panel: many "
                "cross-lagged pivots per area, all absorbed by the cluster bootstrap. POI side is "
                "the raw count via the dominant pre-2021 crosswalk (~35% of lor_2021 PLRs share a "
                "count with a neighbour -- pseudo-replication, see load_ewr_lead_lag_data). **Only the "
                "cross-lagged H3a/H3b rows use cluster-bootstrap CIs; the H2 and H3c rows here use "
                "analytic p-values on pooled area-year rows that are not independent, so their "
                'significance is overstated** -- read them as directional. The "D4 control" in '
                "this panel is the EWR composite's own level at the pivot (status IS the composite "
                "here), not an independent covariate.\n\n"
            )
            _write_results_table(f, results_ewr)
            _write_section_summary(f, results_ewr)

        if results_bzr:
            f.write(
                "## Results — Section 5: H1/H2/H3 at BZR Scale (Bezirksregion, ~137 units, B10 #120)\n\n"
            )
            f.write(
                "> Population-weighted rollup from PLR. MAUP: coarser scales smooth and inflate "
                "correlations (index-definition.md §8, B10-geo-signoff.md). Cross-lagged CIs "
                "cluster by Bezirk.\n\n"
            )
            _write_results_table(f, results_bzr)
            _write_section_summary(f, results_bzr)

        if results_bezirk:
            f.write(
                "## Results — Section 6: H1/H2/H3 at Bezirk Scale (District, 12 units, B10 #120)\n\n"
            )
            f.write(
                "> n = 12 districts: very low power; indicative only (B10-geo-signoff.md §MAUP). "
                "Each district is its own cluster, and a 12-cluster bootstrap CI is itself "
                "unreliable -- treat every verdict here as indicative.\n\n"
            )
            _write_results_table(f, results_bezirk)
            _write_section_summary(f, results_bezirk)

        f.write("## Overall Scorecard\n\n")
        for label, rows in panels:
            if rows:
                f.write(f"- **{label}:** {summarise([r['verdict'] for r in rows])}\n")
        all_rows = [r for _, rows in panels for r in rows]
        f.write(f"\n**All tests:** {summarise([r['verdict'] for r in all_rows])}\n\n")
        f.write("### Which series leads? (cross-lagged H3a vs H3b)\n\n")
        for label, rows in panels:
            lines = h3_direction_lines(rows)
            if lines:
                f.write(f"**{label}**\n\n" + "\n".join(lines) + "\n\n")

        f.write("## Divergences from 2018 Thesis\n\n")
        f.write(
            "- **D1 polarity correction**: `status_index` is inverse-numeric -- lower = higher "
            "social status (index-definition.md §5). All expected directions corrected.\n"
            "- **H3 predictor (MSS panels)**: C5-corrected dynamism (and the OA basket), not "
            "raw POI counts -- avoids the OSM coverage-growth artefact.\n"
            "- **H3a/H3b method**: the thesis inferred direction from lagged-feature classifier "
            "fit (Weka) plus correlations; here it is a cross-lagged partial rank correlation "
            "with cluster-robust CIs. Same question, a design that can actually separate the "
            "two directions.\n"
            "- **Panels**: the thesis's outcome was MSS Status/Dynamik, editions 2013–2017. The "
            "like-for-like re-test is the MSS 2013–2019 panel (lor_pre2021), which contains those "
            "editions -- but it measures change as a move between the four status classes, "
            "where the thesis used the finer MSS Dynamik index, so it is lower-powered, not a "
            "clean refutation. MSS 2021–2025 (lor_2021) is the modern extension; EWR 2014–2020 "
            "is a population-composition context panel, not the thesis's outcome.\n"
            "- **No multiple-comparison correction** across hypotheses -- with this many rows, "
            "an isolated SUPPORTED cell is weak evidence on its own.\n"
            "- Epic B framing: directional revival (CLAUDE.md §Epic B framing) -- exact numbers "
            "need not match, but a direction must be established to count.\n\n"
        )

        f.write("## Limitations\n\n")
        f.write(
            "- **Few MSS pivots**: the modern panel (2021-2025) has a single cross-lagged pivot "
            "(2023) and no D4 control; the pre-2021 PLR panel has two (2015, 2017). The BZR/Bezirk "
            "loader still uses editions 2015-2019 only (no 2013), so its pre-2021 part has one "
            "pivot (2017) and differs from the PLR panel. k=2 cross-lags need five editions.\n"
            "- **EWR composite null pre-2014** (migration_background_share absent) -- the EWR "
            "panel's cross-lags start at 2014.\n"
            "- **Cross-vintage z-scores not comparable** (lor_pre2021 vs lor_2021).\n"
            "- **Granger logic is predictive, not causal**: a SUPPORTED cross-lag says one "
            "series' past change carries information about the other's next change beyond the "
            "outcome's own history -- not that it causes it (thesis weakness W3).\n"
            "- **MAUP**: PLR-scale results may change with area definition (A6 MAUP check).\n"
        )


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main() -> None:
    # B10 (#120): --scale argument for multi-scale analysis.
    # PLR is the default (existing behavior preserved). BZR and Bezirk are new.
    parser = argparse.ArgumentParser(description="E1 regressions: thesis H1-H3c, multi-scale")
    parser.add_argument(
        "--scale",
        choices=["plr", "bzr", "bezirk", "all"],
        default="all",
        help="Spatial scale: plr (default), bzr, bezirk, or all (runs all three). "
        "B10 (#120): 'all' adds BZR and Bezirk sections to findings doc.",
    )
    args = parser.parse_args()
    run_plr = args.scale in ("plr", "all")
    run_bzr = args.scale in ("bzr", "all")
    run_bezirk = args.scale in ("bezirk", "all")

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

    # --- B10: load BZR/Bezirk data BEFORE closing connection ---
    df_bzr_h1 = None
    df_bzr_ll = None
    df_bezirk_h1 = None
    df_bezirk_ll = None

    if run_bzr and "int_mss_bzr_aggregate" in tables:
        print("\nLoading H1 BZR data (thesis BZR golden + BZR POI sums)...")
        df_bzr_h1 = load_bzr_h1_data(con, scale="bzr")
        print(f"  Loaded {len(df_bzr_h1)} BZR rows for H1")
        print("Loading H2/H3 BZR lead-lag data...")
        df_bzr_ll = load_bzr_lead_lag_data(con, scale="bzr")
        print(f"  Loaded {len(df_bzr_ll)} BZR lead-lag rows")
    elif run_bzr:
        print("INFO: int_mss_bzr_aggregate not found (B10) — run 'uv run poe build' first.")

    if run_bezirk and "int_mss_bzr_aggregate" in tables:
        print("\nLoading H1 Bezirk data (thesis Bezirk aggregate + Bezirk POI sums)...")
        df_bezirk_h1 = load_bzr_h1_data(con, scale="bezirk")
        print(f"  Loaded {len(df_bezirk_h1)} Bezirk rows for H1")
        print("Loading H2/H3 Bezirk lead-lag data...")
        df_bezirk_ll = load_bzr_lead_lag_data(con, scale="bezirk")
        print(f"  Loaded {len(df_bezirk_ll)} Bezirk lead-lag rows")
    elif run_bezirk:
        print("INFO: int_mss_bzr_aggregate not found (B10) — run 'uv run poe build' first.")

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
        print("\nRunning H2 tests — MSS pre-2021 panel (2013–2019)...")
        results_mss_pre += test_h2(df_ll_pre, panel_label="2013–2019 panel")

        print("Running H3a/H3b/H3c — MSS pre-2021 panel (2013–2019)...")
        results_mss_pre += test_h3(df_ll_pre, panel_label="2013–2019 panel")

    # --- EWR same-era results (2014–2020, matches thesis source and timeframe) ---
    results_ewr = []
    if df_ewr is not None and len(df_ewr) >= 10:
        print("\nRunning H2 tests — EWR same-era (k=1,2,4; thesis-matching 2014→2016 at k=2)...")
        results_ewr += test_h2_ewr(df_ewr)

        print("Running H3a/H3b/H3c — EWR same-era (k=1,2,4)...")
        results_ewr += test_h3_ewr(df_ewr)

    print("\n=== MSS PANEL (modern era, 2021–2025) ===")
    print_results(results_mss)
    _print_verdicts("MSS", results_mss)

    if results_mss_pre:
        print("\n=== MSS PRE-2021 PANEL (thesis-era, 2013–2019) ===")
        print_results(results_mss_pre)
        _print_verdicts("MSS pre-2021", results_mss_pre)

    if results_ewr:
        print("\n=== EWR RESIDENT-REGISTER COMPOSITE (2014–2020) ===")
        print_results(results_ewr)
        _print_verdicts("EWR", results_ewr)

    # --- B10: BZR scale H1/H2/H3 (data loaded above, before con.close) ---
    results_bzr = []
    if run_bzr and df_bzr_h1 is not None:
        print(f"  Loaded {len(df_bzr_h1)} BZR rows for H1")
        print(f"  Loaded {len(df_bzr_ll)} BZR lead-lag rows")

        if len(df_bzr_h1) >= 10:
            print("\nRunning H1/H1b tests at BZR scale...")
            results_bzr += test_h1(df_bzr_h1)

        if len(df_bzr_ll) >= 10:
            print("Running H2/H3 tests at BZR scale...")
            results_bzr += test_h2(df_bzr_ll, panel_label="BZR lor_2021 panel")
            results_bzr += test_h3(df_bzr_ll, panel_label="BZR lor_2021 panel")

        if results_bzr:
            print("\n=== BZR SCALE (~137 units) ===")
            print_results(results_bzr)
            _print_verdicts("BZR", results_bzr)
    elif run_bzr:
        print("INFO: int_mss_bzr_aggregate not found — run 'uv run poe build' first (B10).")

    # --- B10: Bezirk scale H1/H2/H3 (12 districts — low power, indicative only) ---
    # Data was loaded above, before con.close().
    results_bezirk = []
    if run_bezirk and df_bezirk_h1 is not None:
        if len(df_bezirk_h1) >= 5:
            print("\nRunning H1/H1b tests at Bezirk scale (n=12; low power — indicative only)...")
            results_bezirk += test_h1(df_bezirk_h1)

        if df_bezirk_ll is not None and len(df_bezirk_ll) >= 5:
            print("Running H2/H3 tests at Bezirk scale (low power)...")
            results_bezirk += test_h2(df_bezirk_ll, panel_label="Bezirk lor_2021 panel")
            results_bezirk += test_h3(df_bezirk_ll, panel_label="Bezirk lor_2021 panel")

        if results_bezirk:
            print("\n=== BEZIRK SCALE (12 districts — LOW POWER) ===")
            print_results(results_bezirk)
            _print_verdicts("Bezirk", results_bezirk)
    elif run_bezirk:
        print("INFO: int_mss_bzr_aggregate not found — run 'uv run poe build' first (B10).")

    write_findings(
        df_h1 if run_plr else None,
        results_mss,
        results_ewr,
        results_mss_pre=results_mss_pre,
        results_bzr=results_bzr or None,
        results_bezirk=results_bezirk or None,
    )
    print(f"\nFindings written to: {OUTPUT_MD}")


if __name__ == "__main__":
    main()
