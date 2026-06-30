-- int_ewr_lead_lag.sql
-- #114: EWR-based annual lead-lag panel for same-era H2/H3 thesis comparison.
--
-- The E1 regressions (e1_regressions.py) test H2/H3 against the MSS 2021–2025
-- panel (int_mss_lead_lag), but the 2018 thesis used EWR data at the 2014→2016
-- snapshot gap.  This model provides the same-era, same-source comparison:
-- annual EWR composite pairs at k=1, 2, and 4 year lags.
--
-- Theory grounding (thesis p. 55–56, p. 91):
-- H2  (p.55): Current POI stock predicts future social-status improvement.
-- H3a (p.91, REJECTED): Δamenity leads Δstatus.
-- H3b (p.91, CONFIRMED): Δstatus leads Δamenity.
-- H3c (p.91, UNCLEAR): Simultaneous co-movement.
--
-- Key differences from int_mss_lead_lag:
-- - Source: int_ewr_socioeco (annual EWR composite) not MSS (biennial status_index).
-- - Lag unit: calendar years (not MSS edition steps × 2 years).
-- - Delta type: ewr_composite is a metric z-score mean → delta_ewr is metric,
-- valid for OLS and Spearman (unlike MSS ordinal status_index where OLS is
-- prohibited; index-definition.md §3.3).
-- - Coverage: 2014–2020 only (ewr_composite is NULL for 2008–2013 and 2024–2025;
-- migration_background_share absent pre-2014).
-- - Vintage: lor_2021 throughout (all EWR years crosswalked via
-- int_berlin_ewr_plr2021; no lor_pre2021 rows).
--
-- Thesis comparison window: k=2 (2014→2016 = 2 annual steps) matches the thesis
-- lead-lag gap exactly. k=1 and k=4 extend the analysis.
--
-- Grain: one row per (area_code, area_vintage, year_t, lag_k).
-- lag_k ∈ {1, 2, 4} — annual steps.
--
-- Uninhabited PLR exclusion: PLRs with residents_total IS NULL or = 0 at year_t
-- are excluded (no population = no meaningful social indicator).
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_ewr_socioeco') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Only years where ewr_composite is non-null (2014–2020).
    -- Excludes PLRs with no population at the base year.
    ewr as (
        select
            city_code,
            area_code,
            area_vintage,
            reference_year,
            ewr_composite,
            residents_total
        from {{ ref("int_ewr_socioeco") }}
        where
            ewr_composite is not null
            and residents_total is not null
            and residents_total > 0
    ),

    -- Annual delta of ewr_composite within PLR (for H3a/H3b predictor side).
    -- Uses LAG over reference_year within (city_code, area_code, area_vintage).
    ewr_with_delta as (
        select
            *,
            ewr_composite - lag(ewr_composite) over (
                partition by city_code, area_code, area_vintage order by reference_year
            ) as delta_ewr_vs_prev
        from ewr
    ),

    -- Lead-lag cross join: for each base year t, attach outcome at year t+k
    -- for k ∈ {1, 2, 4}.  Both endpoints must have non-null ewr_composite
    -- (enforced by the WHERE below).
    lead_lag_raw as (
        select
            base.city_code,
            base.area_code,
            base.area_vintage,
            base.reference_year as year_t,
            k_steps.lag_k,
            base.reference_year + k_steps.lag_k as year_tk,
            base.ewr_composite as ewr_composite_t,
            lagged.ewr_composite as ewr_composite_tk,
            -- Metric delta: ewr_composite is a z-score mean → arithmetic difference
            -- valid.
            lagged.ewr_composite - base.ewr_composite as delta_ewr,
            -- Annual EWR change at base year (Δewr_composite vs prior year; H3b
            -- predictor).
            base.delta_ewr_vs_prev as delta_ewr_t,
            -- Population at base year (context / uninhabited guard).
            base.residents_total as residents_total_t
        from ewr_with_delta as base
        cross join (values (1), (2), (4)) as k_steps(lag_k)
        -- Join outcome row: same PLR, same vintage, at year_t + lag_k
        inner join
            ewr_with_delta as lagged
            on base.city_code = lagged.city_code
            and base.area_code = lagged.area_code
            and base.area_vintage = lagged.area_vintage
            and lagged.reference_year = base.reference_year + k_steps.lag_k
    )

select *
from lead_lag_raw
-- Both endpoints non-null already guaranteed by inner join + source filter,
-- but make the intent explicit for the reviewer.
where ewr_composite_t is not null and ewr_composite_tk is not null
