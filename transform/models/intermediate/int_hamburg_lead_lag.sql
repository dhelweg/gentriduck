-- int_hamburg_lead_lag.sql
-- H-C3 (#160): Hamburg lead-lag validation model -- the mirror image of
-- int_mss_lead_lag.sql (Berlin), independently re-testing whether commercial
-- (POI) activity at t predicts social-status change at t+k (H3a) or vice versa
-- (H3b) on Hamburg's ANNUAL Sozialmonitoring series. Implements the
-- change->change panel at k=1, 2, 3 offsets within (city_code='HH', area_code,
-- area_vintage='current').
--
-- Theory grounding (index-definition.md §2.1; thesis p. 55-56, 91) -- SAME
-- framing as Berlin's model, re-tested independently on Hamburg's data, not
-- assumed to replicate:
-- H3a (POI change leads status change; REJECTED in the 2018 Berlin thesis, test
-- anyway on Hamburg):
-- Δstatus_{i,t+k}  ~  Δamenity_{i,t}  + baseline_i + controls
-- H3b (status change leads POI change; CONFIRMED in the 2018 Berlin thesis, test
-- anyway on Hamburg -- do NOT assume it confirms here):
-- Δamenity_{i,t+k} ~  Δstatus_{i,t}  + baseline_i + controls
--
-- Dangschat (1988) double invasion-succession: social cycle LEADS commercial
-- cycle. This is a Berlin-derived theory; whether it replicates on Hamburg's
-- annual Sozialmonitoring series is exactly the open methodology question
-- flagged by geo-DS Condition 2 (docs/epic-h/H1-geo-signoff.md) and #160 --
-- this model only builds the panel; analysis/e5_hamburg_lead_lag.py runs the
-- independent H3a/H3b re-test and reports whatever direction/significance is
-- actually observed, honestly (#160 explicit-scope note: "Do NOT attempt to
-- reconcile or force Hamburg's result to match Berlin's").
--
-- =============================================================================
-- ANNUAL-CADENCE REDESIGN (binding; #160; ADR-0014; docs/epic-h/H1-geo-signoff.md
-- Condition 2)
-- =============================================================================
-- int_mss_lead_lag hardcodes Berlin MSS's BIENNIAL cadence: edition_tk =
-- edition_t + lag_k * 2 (lag_k in {1,2,3} => 2/4/6 real years). Hamburg's
-- Sozialmonitoring is ANNUAL since 2010 (ADR-0014 Pillar 2, "Cadence: Annual
-- since 2010 -- finer than Berlin's biennial MSS"), so this model redesigns the
-- offset as:
-- edition_tk = edition_t + lag_k * 1   (lag_k in {1,2,3} => 1/2/3 real years)
-- This keeps lag_k's EDITION-COUNT range identical to Berlin's (1,2,3 steps)
-- for structural/analytical comparability, but it is NOT the same real-time
-- horizon: Hamburg's lag_k=1 is a 1-year gap, Berlin's lag_k=1 is a 2-year gap.
-- Hamburg's lag_k=3 (3 years) does not even reach Berlin's lag_k=1 (2 years) in
-- one case and undershoots Berlin's lag_k=2 (4 years) in another -- the two
-- panels' lag_k values are NOT directly comparable across cities. Any
-- cross-city lag_k comparison (e.g. "Hamburg lag_k=2 vs Berlin lag_k=2") MUST
-- be read as "same edition-step count, different real-year horizon", never as
-- "same real-time horizon" (index-definition.md §6.2-style vintage-discipline
-- analogue, applied here to cadence rather than boundary vintage). This
-- decision is recorded per R-C2 at: ADR-0014 (Pillar 2, annual cadence source
-- fact), docs/epic-h/H1-geo-signoff.md Condition 2 (SE-clustering precondition
-- for any Hamburg E1/E2-equivalent regression), and issue #160 (this ticket,
-- the annual-cadence redesign decision itself).
--
-- D1 POLARITY NOTE (thesis §3.2; int_mss_lead_lag.sql lines 19-23; same rule,
-- re-applied to Hamburg's numeric-mapped status_index from
-- int_hamburg_sozialmonitoring_index, which uses the IDENTICAL 1-4 scale --
-- see that model's header):
-- status_index = 4 (sehr niedrig) = most deprived / most vulnerable.
-- delta_status_ordinal > 0 -> status_index increased -> STATUS WORSENED.
-- delta_status_ordinal < 0 -> status_index decreased -> STATUS IMPROVED.
--
-- D3 C5 correction (binding; index-definition.md §2.4; geo condition 5a):
-- Uses C5-corrected dynamism_score (z-score of share_yoy_change) from
-- int_poi_status_dynamism, NEVER raw count deltas -- already independently
-- re-validated on Hamburg's own OSM coverage-growth curve (H-C1 #158; geo-DS
-- sign-off docs/epic-h/158-hc1-geo-signoff.md, 2026-07-10; spike
-- docs/epic-h/158-hc1-geo-spike.md), not merely assumed to transfer from
-- Berlin. Feeding uncorrected coverage growth into H3b would bias the test
-- toward false confirmation, exactly as it would for Berlin.
--
-- Vintage discipline (binding; index-definition.md §6.2; geo condition 2):
-- Hamburg has a single geometry vintage ('current', ADR-0014 Pillar 1) --
-- there is no vintage boundary to bridge (unlike Berlin's pre2021/2021 LOR
-- split), but the join still enforces base.area_vintage = lagged.area_vintage
-- for structural symmetry with int_mss_lead_lag and as a defensive guard
-- should a future Hamburg geometry re-cut (e.g. the 943->941 statistische-
-- Gebiete crosswalk, ADR-0014 open question #2) introduce a second vintage.
--
-- Uninhabited-Gebiet exclusion (index-definition.md §7.1 equivalent; R-A3 C3):
-- Hamburg has no is_uninhabited flag analogue -- a Gebiet below the
-- Sozialmonitoring's own >300-resident scoring threshold is simply ABSENT from
-- a given edition rather than present-with-NULL (int_hamburg_sozialmonitoring_
-- index header; int_gentrification_ts Branch C header). int_gentrification_ts
-- hard-codes is_uninhabited=false for every Hamburg row that appears at all
-- (by construction, above the threshold), so the `is_uninhabited = false`
-- filter below is a no-op safety net that mirrors Berlin's guard structurally
-- rather than a substantive Hamburg exclusion.
--
-- D4 baseline discipline (index-definition.md §4.3, binding; same rule as
-- Berlin's model, re-applied to Hamburg's 2-indicator ewr_composite from
-- int_ewr_socioeco_hamburg -- #329, 2026-07-31: unemployment_share was dropped
-- from that composite as a predictor/outcome conflation with Hamburg's D1
-- Sozialmonitoring Statusindex; see that model's header):
-- D4 enters ONLY as a baseline LEVEL (ewr_composite_t at time t). NO D4 delta
-- columns in the predictor block (D4 changes are near-tautological outcome
-- proxies; Döring & Ulbricht 2016; §4.2). D4 change features are excluded by
-- design, exactly as for Berlin.
--
-- Stadtteil-grain SE-clustering key (#129; H1-geo-signoff.md Condition 2,
-- binding acceptance criterion of #160):
-- ewr_composite_t is uniformly disaggregated from Stadtteil grain (~104-105
-- areas) to Gebiet grain (~941-945 areas) in int_ewr_socioeco_hamburg_disagg
-- (see that model's header) -- every Gebiet within the same Stadtteil carries
-- an IDENTICAL ewr_composite value, so the effective N for any D4-involving
-- regression is Stadtteil count, not Gebiet count (a standard change-of-support
-- problem, Gotway & Young 2002, cited in H1-geo-signoff.md). stadtteil_code is
-- carried on every output row here (joined from
-- int_ewr_socioeco_hamburg_disagg's own Gebiet->Stadtteil crosswalk -- see that
-- model's header for the name-matched-crosswalk method, unchanged here) purely
-- so downstream regressions (analysis/e5_hamburg_lead_lag.py) can cluster
-- standard errors at Stadtteil grain for any D4-covariate specification, per
-- #129's binding requirement. This model does not itself run any regression --
-- it only carries the key.
--
-- Grain: one row per (city_code, area_code, area_vintage, edition_t, lag_k),
-- matching int_mss_lead_lag's grain exactly (with city_code='HH' throughout,
-- area_vintage always 'current').
-- lag_k in {1, 2, 3} -- Sozialmonitoring edition steps; each step = 1 year
-- (annual cadence, see redesign note above -- NOT Berlin's 2-year step).
-- edition_tk = edition_t + lag_k * 1 (the outcome edition).
--
-- Source: int_gentrification_ts (Branch C, Hamburg rows only, city_code='HH').
-- Same-year join in int_gentrification_ts means every row there has
-- Sozialmonitoring + POI coexisting.
--
-- HAMBURG-ONLY SCOPE (mirror-image of int_mss_lead_lag's Berlin-only scope,
-- #125): this model is filtered to city_code='HH' and is purely additive --
-- int_mss_lead_lag.sql (Berlin) is untouched by this ticket. Does NOT widen any
-- published mart's `accepted_values` beyond `["BER"]` (#158/#159 precedent) --
-- this model feeds only analysis/e5_hamburg_lead_lag.py (groundwork/analysis
-- layer), not any published mart.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_gentrification_ts') }}
-- depends_on: {{ ref('int_ewr_socioeco_hamburg_disagg') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Source: Hamburg rows only (city_code='HH' per the scope note above,
    -- #160). is_uninhabited=false filter is a structural no-op for Hamburg
    -- (see header) kept for symmetry with int_mss_lead_lag.
    ts as (
        select *
        from {{ ref("int_gentrification_ts") }}
        where is_uninhabited = false and mss_edition is not null and city_code = 'HH'
    ),

    -- Gebiet -> Stadtteil crosswalk key, deduplicated to one row per
    -- (city_code, area_code, area_vintage) -- the crosswalk is static per
    -- Gebiet (does not vary by reference_year), so any single non-null year is
    -- representative; qualify picks the latest to prefer the most-recent
    -- crosswalk state if it ever changed (#129; int_ewr_socioeco_hamburg_disagg
    -- header method, unchanged here -- this model only reads the already-
    -- computed key, it does not re-derive the crosswalk).
    stadtteil_key as (
        select city_code, area_code, area_vintage, stadtteil_code
        from {{ ref("int_ewr_socioeco_hamburg_disagg") }}
        qualify
            row_number() over (
                partition by city_code, area_code, area_vintage
                order by reference_year desc
            )
            = 1
    ),

    -- D3 delta within vintage: delta_dynamism = dynamism_score at t vs t-1 (for
    -- H3b predictor). Uses LAG over mss_edition within (city_code, area_code,
    -- area_vintage) -- annual editions here, so this is a genuine 1-year-apart
    -- delta (vs Berlin's 2-year-apart delta at the same LAG offset).
    -- This produces the CHANGE in D3 commercial dynamism, not a level -- both
    -- sides are deltas (index-definition.md §2.2, geo condition 1, binding).
    ts_with_delta as (
        select
            *,
            dynamism_score - lag(dynamism_score) over (
                partition by city_code, area_code, area_vintage order by mss_edition
            ) as delta_dynamism_t_vs_prev
        from ts
    ),

    -- Lead-lag cross join: for each base row (time t), attach offset rows
    -- (time t+k) for k in {1, 2, 3} within the same area_code and
    -- area_vintage. Vintage guard: base.area_vintage = lagged.area_vintage
    -- (explicit WHERE clause below), mirroring int_mss_lead_lag.
    lead_lag_raw as (
        select
            base.city_code,
            base.area_code,
            base.area_vintage,

            -- Time t (predictor side)
            base.mss_edition as edition_t,
            k_steps.lag_k,
            -- ANNUAL-CADENCE REDESIGN (binding; see header): lag_k * 1, NOT
            -- Berlin's lag_k * 2.
            base.mss_edition + k_steps.lag_k * 1 as edition_tk,

            -- D1/D2 at time t (predictor for H3a: does status predict amenity
            -- change?)
            base.status_index as status_index_t,
            base.dynamik_index as dynamik_index_t,
            base.typology_stage as typology_stage_t,

            -- D1/D2 at time t+k (outcome for H3a; predictor in H3b is
            -- Δstatus)
            lagged.status_index as status_index_tk,
            lagged.dynamik_index as dynamik_index_tk,

            -- Ordinal transition: delta_status = status_index_tk -
            -- status_index_t. Positive delta -> status_index INCREASED ->
            -- STATUS WORSENED (more deprived). Negative delta -> status_index
            -- DECREASED -> STATUS IMPROVED (less deprived). D1 is ORDINAL; do
            -- NOT interpret the numeric difference as metric (§3; R-A3 C2).
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
            -- Δdynamism at t vs t-1 (H3b predictor side: change in amenity at
            -- t)
            base.delta_dynamism_t_vs_prev as delta_dynamism_t,

            -- D3 at time t+k (C5-corrected; outcome for H3b)
            lagged.dynamism_score as dynamism_score_tk,

            -- D4 baseline LEVEL at time t (cross-sectional vulnerability
            -- covariate; §4.3). D4 changes are NOT included (near-tautological
            -- outcome proxies; §4.2, §4.3).
            base.ewr_composite as ewr_composite_t,

            -- #129 binding requirement: Stadtteil grain for SE clustering on
            -- any D4-covariate regression (see header). Joined at time t's key
            -- (the crosswalk is time-invariant per Gebiet, see stadtteil_key
            -- above).
            base_stadtteil.stadtteil_code
        from ts_with_delta as base
        -- k in {1, 2, 3}: three offset distances in Sozialmonitoring edition
        -- steps (each = 1 year, annual cadence -- see header redesign note).
        cross join (values (1), (2), (3)) as k_steps(lag_k)
        -- Join lagged row: same Gebiet, same vintage, at t + k*1 years.
        left join
            ts_with_delta as lagged
            on base.area_code = lagged.area_code
            -- Vintage guard (binding): predictor and outcome must be in the
            -- same geometry vintage (structural no-op for Hamburg's single
            -- 'current' vintage today; see header).
            and base.area_vintage = lagged.area_vintage
            and lagged.mss_edition = base.mss_edition + k_steps.lag_k * 1
            -- Uninhabited guard: exclude uninhabited Gebiet at outcome time
            -- too (structural no-op for Hamburg, see header).
            and lagged.is_uninhabited = false
        left join
            stadtteil_key as base_stadtteil
            on base.city_code = base_stadtteil.city_code
            and base.area_code = base_stadtteil.area_code
            and base.area_vintage = base_stadtteil.area_vintage
    )

select *
from lead_lag_raw
-- Only rows where the outcome year exists (lagged row was found)
where status_index_tk is not null
