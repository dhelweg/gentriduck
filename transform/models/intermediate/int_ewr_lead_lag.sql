-- int_ewr_lead_lag.sql
-- #114: EWR-based annual lead-lag panel for same-era H2/H3 thesis comparison.
-- #119 (B9b): Extended backward to 2008 using the partial composite.
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
-- B9b composite selection (reference_year >= 2008 extension):
-- This model uses ewr_composite_effective = COALESCE(ewr_composite,
-- ewr_composite_partial) so that pre-2014 rows (where the full 5-indicator
-- composite is NULL) contribute to the panel via the 3-indicator partial
-- composite. The is_partial_composite flag is carried through for every
-- base-year row; pairs where EITHER endpoint is partial are flagged via
-- any_endpoint_partial.
--
-- CRITICAL CONSTRAINT (B9-domain-signoff.md §3):
-- Cross-era pooling of full and partial composite rows in a single regression
-- is NOT valid. The partial composite omits foreigners_share (thesis's strongest
-- predictor, k11) and migration_background_share. Regressions MUST filter to
-- rows where any_endpoint_partial = FALSE for H2/H3 tests. The pre-2014 rows
-- are retained here for exploratory / caveat-documented use only.
--
-- Key differences from int_mss_lead_lag:
-- - Source: int_ewr_socioeco (annual EWR composite) not MSS (biennial status_index).
-- - Lag unit: calendar years (not MSS edition steps × 2 years).
-- - Delta type: ewr_composite is a metric z-score mean → delta_ewr is metric,
-- valid for OLS and Spearman (unlike MSS ordinal status_index where OLS is
-- prohibited; index-definition.md §3.3).
-- - Coverage: 2008–2020 (extended from 2014–2020 by B9b).
-- Full composite: 2014–2020. Partial composite: 2008–2013.
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
    -- B9b: use COALESCE(ewr_composite, ewr_composite_partial) as effective composite.
    -- This extends panel to 2008-2013 via partial composite.
    -- Only years where at least the partial composite is non-null.
    -- Excludes PLRs with no population at the base year.
    ewr as (
        select
            city_code,
            area_code,
            area_vintage,
            reference_year,
            -- Effective composite: full 5-indicator preferred; partial 3-indicator
            -- fallback.
            coalesce(ewr_composite, ewr_composite_partial) as ewr_composite_effective,
            ewr_composite,
            ewr_composite_partial,
            is_partial_composite,
            residents_total
        from {{ ref("int_ewr_socioeco") }}
        where
            coalesce(ewr_composite, ewr_composite_partial) is not null
            and residents_total is not null
            and residents_total > 0
    ),

    -- Annual delta of ewr_composite_effective within PLR (for H3a/H3b predictor side).
    -- Uses LAG over reference_year within (city_code, area_code, area_vintage).
    -- NULL when prior year used partial composite (B9 C-2: cross-era differencing
    -- prohibited).
    -- This ensures 2014 base-year rows (where lag = partial 2013 composite) yield
    -- delta_ewr_vs_prev = NULL, so H3b naturally excludes them without an extra filter.
    ewr_with_delta as (
        select
            *,
            case
                when
                    lag(is_partial_composite) over (
                        partition by city_code, area_code, area_vintage
                        order by reference_year
                    )
                    = true
                then null
                else
                    ewr_composite_effective - lag(ewr_composite_effective) over (
                        partition by city_code, area_code, area_vintage
                        order by reference_year
                    )
            end as delta_ewr_vs_prev
        from ewr
    ),

    -- Lead-lag cross join: for each base year t, attach outcome at year t+k
    -- for k ∈ {1, 2, 4}.  Both endpoints must have non-null ewr_composite_effective
    -- (enforced by the WHERE below).
    lead_lag_raw as (
        select
            base.city_code,
            base.area_code,
            base.area_vintage,
            base.reference_year as year_t,
            k_steps.lag_k,
            base.reference_year + k_steps.lag_k as year_tk,
            base.ewr_composite_effective as ewr_composite_t,
            lagged.ewr_composite_effective as ewr_composite_tk,
            -- Metric delta: ewr_composite_effective is a z-score mean → arithmetic
            -- difference valid.
            lagged.ewr_composite_effective - base.ewr_composite_effective as delta_ewr,
            -- Annual EWR change at base year (Δewr_composite vs prior year; H3b
            -- predictor).
            base.delta_ewr_vs_prev as delta_ewr_t,
            -- Population at base year (context / uninhabited guard).
            base.residents_total as residents_total_t,
            -- B9b partial composite flags (critical: must filter
            -- any_endpoint_partial=FALSE
            -- for valid H2/H3 pooled regressions — partial composite omits
            -- foreigners_share
            -- and migration_background_share; see B9-domain-signoff.md §3).
            base.is_partial_composite as is_partial_composite_t,
            lagged.is_partial_composite as is_partial_composite_tk,
            (
                base.is_partial_composite or lagged.is_partial_composite
            ) as any_endpoint_partial
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
