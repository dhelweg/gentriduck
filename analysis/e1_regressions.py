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
    'lor_pre2021' = thesis-era 2015-2019 panel (k=1: 2015→2017, 2017→2019; k=2: 2015→2019).

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

        # OA-A.4 (#168): OA-change lead-lag analogues, run ALONSIDE (not instead
        # of) the C5-corrected dynamism tests above -- the C5 correction already
        # has its own geo-DS sign-off (docs/epic-c/C5-geo-signoff.md) for the
        # OSM-coverage-growth artifact; delta_oa_mean_t is independently robust
        # to that artifact (compositional / relative-to-city-total, see
        # load_lead_lag_data docstring) rather than replacing the C5 measure.
        # Ticket #168 body: "H3a-c use OA-change vs status-change lead/lag".
        if "delta_oa_mean_t" in sub.columns and "oa_mean_t" in sub.columns:
            delta_oa_t = sub["delta_oa_mean_t"].values.astype(float)
            oa_t = sub["oa_mean_t"].values.astype(float)

            # H3a (OA): delta_oa_mean_t leads delta_status_ordinal.
            r3a_oa = run_spearman(
                delta_oa_t, delta_status, f"Spearman(delta_oa_mean_t, delta_status, k={k})"
            )
            results.append(
                {
                    "hyp": "H3a",
                    "test": f"Spearman (OA) k={k}",
                    "desc": f"OA-quotient change at t leads Δstatus at t+k (POI-composition change leads status change) [k={k}]",
                    "citation": (
                        "Thesis p.91 H3a, OA-change construct (ticket #168: "
                        '"H3a-c use OA-change vs status-change lead/lag"); '
                        "delta_oa_mean_t = oa_mean_tk - oa_mean_t (load_lead_lag_data); "
                        "same D1 polarity as the dynamism-based H3a test above."
                    ),
                    "stat_val": r3a_oa["rho"],
                    "stat_type": "rho",
                    "n": r3a_oa["n"],
                    "p": r3a_oa["p"],
                    "sig": r3a_oa["sig"],
                    "r2": None,
                    "expected_dir": THESIS_HYPOTHESES["H3a"]["expected_dir"],
                    "actual_dir": _dir(r3a_oa["rho"]),
                    "dir_match": _dir_match(
                        r3a_oa["rho"], THESIS_HYPOTHESES["H3a"]["expected_dir"]
                    ),
                }
            )

            # H3b (OA): delta_status_ordinal leads delta_oa_mean_t.
            r3b_oa = run_spearman(
                delta_status, delta_oa_t, f"Spearman(delta_status, delta_oa_mean_t, k={k})"
            )
            results.append(
                {
                    "hyp": "H3b",
                    "test": f"Spearman (OA) k={k}",
                    "desc": f"Δstatus at t leads OA-quotient change at t+k (status change leads POI-composition change) [k={k}]",
                    "citation": (
                        "Thesis p.91 H3b, OA-change construct (ticket #168); "
                        "delta_oa_mean_t = oa_mean_tk - oa_mean_t; same D1 polarity as the "
                        "dynamism-based H3b test above."
                    ),
                    "stat_val": r3b_oa["rho"],
                    "stat_type": "rho",
                    "n": r3b_oa["n"],
                    "p": r3b_oa["p"],
                    "sig": r3b_oa["sig"],
                    "r2": None,
                    "expected_dir": THESIS_HYPOTHESES["H3b"]["expected_dir"],
                    "actual_dir": _dir(r3b_oa["rho"]),
                    "dir_match": _dir_match(
                        r3b_oa["rho"], THESIS_HYPOTHESES["H3b"]["expected_dir"]
                    ),
                }
            )

            # H3c (OA): simultaneous oa_mean_t ~ status_index_t co-movement.
            r3c_oa = run_spearman(oa_t, stat_t, f"Spearman(oa_mean_t, status_t, k={k})")
            results.append(
                {
                    "hyp": "H3c",
                    "test": f"Spearman (OA) k={k}",
                    "desc": f"Simultaneous OA-quotient ~ status_index co-movement (same edition) [k={k}]",
                    "citation": (
                        "Thesis p.91 H3c, OA construct (ticket #168); oa_mean_t at edition_t "
                        "~ status_index_t; same D1 polarity as the dynamism-based H3c test above."
                    ),
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
    results_bzr: list[dict] | None = None,
    results_bezirk: list[dict] | None = None,
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

        if results_bzr:
            n_pass_bzr = sum(1 for r in results_bzr if r["dir_match"])
            n_sig_bzr = sum(1 for r in results_bzr if r.get("sig"))
            f.write(
                "## Results — Section 5: H1/H2/H3 at BZR Scale (Bezirksregion, ~137 units, B10 #120)\n\n"
            )
            f.write(
                "> B10: BZR scale (n≈137 units). Population-weighted rollup from PLR. "
                "MAUP note: coarser-scale correlations tend to be stronger (spatial smoothing). "
                "See index-definition.md §8 and B10-geo-signoff.md.\n\n"
            )
            _write_results_table(f, results_bzr)
            f.write(
                f"\n**Directional agreement (BZR): {n_pass_bzr}/{len(results_bzr)}. Significant: {n_sig_bzr}/{len(results_bzr)}.**\n\n"
            )

        if results_bezirk:
            n_pass_bezirk = sum(1 for r in results_bezirk if r["dir_match"])
            n_sig_bezirk = sum(1 for r in results_bezirk if r.get("sig"))
            f.write(
                "## Results — Section 6: H1/H2/H3 at Bezirk Scale (District, 12 units, B10 #120)\n\n"
            )
            f.write(
                "> B10: Bezirk scale (n=12 districts). Population-weighted rollup from PLR. "
                "CAUTION: n=12 is extremely small; results have very low statistical power "
                "and should be treated as indicative only (see B10-geo-signoff.md §MAUP).\n"
                ">\n"
                "> **MAUP caveat:** Bezirk-level correlations reflect within-district smoothing, not "
                "independent observations. Statistical significance at this scale is edge-fragile: "
                "for H1 cross-section (n=12), |rho|≈0.58 needed for p<0.05; "
                "for H2 lead-lag (n=24 at k=2), |rho|≈0.40 needed. "
                "Significant H2 cells (k=1, k=2) should be read with this threshold in mind.\n\n"
            )
            _write_results_table(f, results_bezirk)
            f.write(
                f"\n**Directional agreement (Bezirk): {n_pass_bezirk}/{len(results_bezirk)}. Significant: {n_sig_bezirk}/{len(results_bezirk)}.**\n\n"
            )

        f.write("## Overall Scorecard\n\n")
        all_results = (
            results_mss
            + (results_mss_pre or [])
            + (results_ewr or [])
            + (results_bzr or [])
            + (results_bezirk or [])
        )
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
            n_pass_bzr = sum(1 for r in results_bzr if r["dir_match"])
            n_sig_bzr = sum(1 for r in results_bzr if r.get("sig"))
            print(f"\nBZR directional agreement: {n_pass_bzr}/{len(results_bzr)}")
            print(f"BZR significant at p<0.05: {n_sig_bzr}/{len(results_bzr)}")
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
            n_pass_bezirk = sum(1 for r in results_bezirk if r["dir_match"])
            n_sig_bezirk = sum(1 for r in results_bezirk if r.get("sig"))
            print(f"\nBezirk directional agreement: {n_pass_bezirk}/{len(results_bezirk)}")
            print(f"Bezirk significant at p<0.05: {n_sig_bezirk}/{len(results_bezirk)}")
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
