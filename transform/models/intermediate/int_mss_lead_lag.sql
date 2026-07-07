-- int_mss_lead_lag.sql
-- R-A1 lead-lag validation model (#64): does POI activity at t predict MSS status
-- change
-- at t+k? Implements the change→change panel at k=1, 2, 3 offsets within LOR vintage.
--
-- Theory grounding (index-definition.md §2.1; thesis p. 55–56, 91):
-- H3a (REJECTED in thesis, test anyway):
-- Δstatus_{i,t+k}  ~  Δamenity_{i,t}  + baseline_i + controls
-- H3b (CONFIRMED in thesis, expected to dominate):
-- Δamenity_{i,t+k} ~  Δstatus_{i,t}  + baseline_i + controls
--
-- Dangschat (1988) double invasion-succession: social cycle LEADS commercial cycle.
-- Thesis confirmed (p. 91): H3b (status → amenity) dominates; H3a (amenity → status)
-- rejected.
-- The social cycle (D1/D2) is the LEADING cycle; commercial succession (D3) FOLLOWS.
-- Both directions are fit for every k; dominance is a REPORTED TEST OUTCOME, never
-- hard-coded.
--
-- D1 POLARITY NOTE (thesis §3.2; reference/system/50_lor_mss_idx_bzr_idx.sql):
-- status_index = 4 (sehr_niedrig) = most deprived / most vulnerable.
-- 2018 thesis used status_summe where HIGHER = MORE deprived (inverse numeric).
-- delta_status_ordinal > 0 → status_index increased → STATUS WORSENED (more deprived).
-- delta_status_ordinal < 0 → status_index decreased → STATUS IMPROVED (less deprived).
--
-- D3 C5 correction (binding; index-definition.md §2.4; geo condition 5a):
-- Uses C5-corrected dynamism_score (z-score of share_yoy_change), NEVER raw count
-- deltas.
-- Feeding uncorrected coverage growth into H3b would bias the test toward false
-- confirmation.
-- C5 geo-DS sign-off: PASS (docs/epic-c/C5-geo-signoff.md, 2026-06-19).
--
-- Vintage discipline (binding; index-definition.md §6.2; geo condition 2):
-- No Δ crosses the 2019→2021 LOR boundary without the crosswalk.
-- Lead-lag is fit WITHIN vintage: join enforces base.area_vintage =
-- lagged.area_vintage.
-- Within any single fit, predictor and outcome must share PLR geometry (§6.3).
--
-- Uninhabited PLR exclusion (index-definition.md §7.1; R-A3 C3):
-- is_uninhabited = true rows are EXCLUDED from this model.
-- They appear in int_gentrification_ts for completeness but have no MSS outcome.
--
-- D4 baseline discipline (index-definition.md §4.3, binding):
-- D4 enters ONLY as a baseline LEVEL (ewr_composite_t at time t).
-- NO D4 delta columns in the predictor block (D4 changes are near-tautological outcome
-- proxies; Döring & Ulbricht 2016; §4.2). D4 change features are excluded by design.
--
-- Grain: one row per (area_code, area_vintage, edition_t, lag_k).
-- lag_k ∈ {1, 2, 3} — MSS edition steps; each step = 2 years (biennial cadence).
-- edition_tk = edition_t + lag_k * 2 (the outcome edition).
--
-- Source: int_gentrification_ts (rows with MSS data, mss_edition IS NOT NULL).
-- Same-year join in int_gentrification_ts means every row there has MSS + POI
-- coexisting.
--
-- BERLIN-ONLY SCOPE (#125, staging decision -- not a methodology re-derivation):
-- int_gentrification_ts now also carries Hamburg rows (Branch C, ADR-0014, H1 #40).
-- This model is filtered to city_code='BER' because `edition_tk = edition_t +
-- lag_k * 2` hardcodes Berlin MSS's BIENNIAL cadence -- ADR-0014 records Hamburg's
-- Sozialmonitoring as ANNUAL since 2010, so the same "lag_k * 2" step would silently
-- redefine a "1-step lag" as a 2-edition (not 1-edition) gap for Hamburg, and would
-- need its own cadence-aware offset (lag_k * 1) plus a re-derivation of whether H3a/
-- H3b even replicate on Hamburg's annual series -- a genuine methodology question,
-- not a mechanical fix. The H1 sign-offs (docs/epic-h/H1-geo-signoff.md,
-- H1-domain-signoff.md) scoped their PASS to int_gentrification_ts pipeline wiring
-- only ("no dashboard/report is published from it yet") and geo-DS Condition 2
-- explicitly defers a Hamburg E1/E2-equivalent regression to a future ticket.
-- METHODOLOGY QUESTION flagged for geo-DS + domain-expert gate (#125): should a
-- Hamburg lead-lag model be built now (with an annual-cadence redesign), and does
-- H3a/H3b replicate on Hamburg's annual Sozialmonitoring series at all? Not decided
-- here -- Berlin-only filter preserves existing Berlin behaviour and output exactly.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_gentrification_ts') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Source: inhabited Berlin PLRs with MSS data only (uninhabited excluded per
    -- §7.1; city_code='BER' per the staging-scope note above, #125).
    ts as (
        select *
        from {{ ref("int_gentrification_ts") }}
        where is_uninhabited = false and mss_edition is not null and city_code = 'BER'
    ),

    -- D3 delta within vintage: delta_dynamism = dynamism_score at t vs t-1 (for H3b
    -- predictor)
    -- Uses LAG over mss_edition within (city_code, area_code, area_vintage).
    -- This produces the CHANGE in D3 commercial dynamism, not a level — both sides
    -- are deltas
    -- (index-definition.md §2.2, geo condition 1, binding).
    ts_with_delta as (
        select
            *,
            -- D3 within-vintage delta: Δdynamism at t vs prior MSS edition
            dynamism_score - lag(dynamism_score) over (
                partition by city_code, area_code, area_vintage order by mss_edition
            ) as delta_dynamism_t_vs_prev
        from ts
    ),

    -- Lead-lag cross join: for each base row (time t), attach offset rows (time t+k)
    -- for k in {1, 2, 3} within the same area_code and area_vintage.
    -- Vintage guard: base.area_vintage = lagged.area_vintage (explicit WHERE clause
    -- below).
    lead_lag_raw as (
        select
            base.city_code,
            base.area_code,
            base.area_vintage,

            -- Time t (predictor side)
            base.mss_edition as edition_t,
            k_steps.lag_k,
            base.mss_edition + k_steps.lag_k * 2 as edition_tk,

            -- D1/D2 at time t (predictor for H3a: does status predict amenity change?)
            base.status_index as status_index_t,
            base.dynamik_index as dynamik_index_t,
            base.typology_stage as typology_stage_t,

            -- D1/D2 at time t+k (outcome for H3a; predictor in H3b is Δstatus)
            lagged.status_index as status_index_tk,
            lagged.dynamik_index as dynamik_index_tk,

            -- Ordinal transition: delta_status = status_index_tk - status_index_t
            -- positive delta → status_index INCREASED → STATUS WORSENED (more
            -- deprived).
            -- negative delta → status_index DECREASED → STATUS IMPROVED (less
            -- deprived).
            -- D1 is ORDINAL; do NOT interpret the numeric difference as metric (§3;
            -- R-A3 C2).
            -- This expresses the signed transition direction for H3a regression
            -- (ordered logit).
            lagged.status_index - base.status_index as delta_status_ordinal,
            case
                when (lagged.status_index - base.status_index) < 0
                then 'improved'
                when (lagged.status_index - base.status_index) > 0
                then 'worsened'
                else 'stable'
            end as status_transition,

            -- D3 at time t (C5-corrected; predictor for H3a; outcome for H3b)
            base.dynamism_score as dynamism_score_t,
            -- Δdynamism at t vs t-1 (H3b predictor side: change in amenity at t)
            -- Uses the within-vintage delta computed above (C5-corrected; §2.2).
            base.delta_dynamism_t_vs_prev as delta_dynamism_t,

            -- D3 at time t+k (C5-corrected; outcome for H3b)
            lagged.dynamism_score as dynamism_score_tk,

            -- D4 baseline LEVEL at time t (cross-sectional vulnerability covariate;
            -- §4.3)
            -- D4 changes are NOT included (near-tautological outcome proxies; §4.2,
            -- §4.3).
            base.ewr_composite as ewr_composite_t,

            -- LOR vintage flag: pre-2021 vintage has longest MSS time series (thesis
            -- universe)
            (base.area_vintage = 'lor_pre2021') as is_pre2021_vintage
        from ts_with_delta as base
        -- k ∈ {1, 2, 3}: three offset distances in MSS edition steps (each = 2 years)
        cross join (values (1), (2), (3)) as k_steps(lag_k)
        -- Join lagged row: same PLR, same vintage, at t + k*2 years
        left join
            ts_with_delta as lagged
            on base.area_code = lagged.area_code
            -- Vintage guard (binding): predictor and outcome must be in the same PLR
            -- geometry.
            -- (index-definition.md §6.3 non-negotiable rule; §2.5 LOR vintage
            -- discipline)
            and base.area_vintage = lagged.area_vintage
            and lagged.mss_edition = base.mss_edition + k_steps.lag_k * 2
            -- Uninhabited guard: exclude uninhabited PLR at outcome time too
            and lagged.is_uninhabited = false
    )

select *
from lead_lag_raw
-- Only rows where the outcome year exists (lagged row was found)
where status_index_tk is not null
