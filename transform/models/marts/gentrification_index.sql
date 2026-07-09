-- Mart: governed gentrification index per area x period x variant (ADR-0004).
-- This is the core output table of the Gentriduck warehouse. The index definition
-- is governed: inputs, formula, per-city parameters, and limitations are documented
-- in ADR-0004 and in the public methodology page (Epic G2).
--
-- Sources (UNIONed):
-- 1. int_thesis_2018_area_index — 2018 thesis goldens
-- (variant='standard'/'distance_weighted')
-- 2. int_gentrification_ts — R-A1 re-grounded live-data index (variant='live_data')
-- 3. int_gentrification_ts — OA-B.3 (#172) tier-weighted improved OA predictor
-- (variant='improved', Berlin lor_2021 only; see that block below for scope)
--
-- R-A1 re-grounding (#64): status_index now carries MSS social status (D1, ordinal
-- 1–4),
-- NOT the POI z-score (legacy_gentrification_score is available in
-- int_gentrification_ts).
-- Thesis §3.2 + ADR-0008: POI metrics (D3) are predictors; MSS Status/Dynamik (D1/D2)
-- are outcomes. D1 polarity: 1=hoch(best) … 4=sehr_niedrig(worst) — INVERSE of 2018
-- thesis status_summe (reference/system/50_lor_mss_idx_bzr_idx.sql), same deprivation
-- gradient, opposite numeric scale. See int_gentrification_ts for the D1 polarity note.
-- Theory sources: Dangschat (1988) double invasion-succession cycle; Döring & Ulbricht
-- (2016) vulnerability/D4 polarity. Full citation chain in int_gentrification_ts
-- header.
--
-- Contract (ADR-0004): column names and types below are the governed contract.
-- Changes require a deliberate contract edit and reviewer sign-off.
-- Contract extended in C4 (#24): added 'live_data' to variant accepted values.
-- status_class for live_data now carries the typology stage name (ADR-0008; R-A1).
-- PLR-level aggregate; not an individual- or building-level statement. Inferring an
-- individual's situation from a PLR stage is an ecological fallacy (G-2 guardrail;
-- index-definition.md §1.2).
--
-- BERLIN-ONLY SCOPE (#125, staging decision -- not a methodology change): as of the
-- H1 (#40) integration, int_gentrification_ts also carries Hamburg rows
-- (city_code='HH', ADR-0014). This governed, contract-enforced public mart
-- (city_code accepted_values=["BER"] below) stays Berlin-only for now: the H1
-- geo-DS/domain-expert sign-offs (docs/epic-h/H1-geo-signoff.md,
-- H1-domain-signoff.md) explicitly scoped their PASS to int_gentrification_ts
-- pipeline wiring, stating "no dashboard/report is published from it yet."
-- METHODOLOGY QUESTION flagged for the gate (#125): should Hamburg now be admitted
-- to this published index (widening city_code to ["BER","HH"] and area_level to
-- include Hamburg's dim_area levels), or should it remain staged until the
-- conditions in those sign-offs (crosswalk match-rate test, G2 disclosures) are
-- satisfied? Not decided here -- the explicit filter below preserves Berlin's
-- existing rows/values exactly and keeps Hamburg out of the public mart pending
-- that decision.
{{
    config(
        materialized="table",
        contract={"enforced": true},
        meta={
            "dbt_meta_owner": "data-engineer",
            "governed_definition": "ADR-0004",
            "index_inputs": (
                "2018_thesis: status_index/dynamism_index/own_idx_class from thesis goldens | "
                "live_data (R-A1): status_index (D1 MSS Status ordinal 1–4), "
                "dynamism_index (D2 MSS Dynamik ordinal 1–3), "
                "status_class (typology stage from D1xD2 matrix, ADR-0008), "
                "legacy_gentrification_score available in int_gentrification_ts for 2018 comparison"
            ),
            "index_period": "201612 / 201412 (thesis); YYYY12 per snapshot_year (live_data)",
        },
    )
}}

-- 2018 thesis baseline (unchanged)
select
    city_code,
    area_level,
    area_code,
    area_name,
    period_yyyymm,
    variant,
    population,
    status_index,
    status_class,
    status_class_bi,
    dynamism_index,
    dynamism_class,
    dynamism_class_bi,
    own_idx_class,
    own_idx_class_bi
from {{ ref("int_thesis_2018_area_index") }}

union all

-- R-A1 live-data index (variant='live_data')
-- status_index now carries D1 MSS social status (ordinal 1–4, NOT the POI z-score).
-- dynamism_index now carries D2 MSS Dynamik (ordinal 1–3, NOT the POI dynamism
-- z-score).
-- status_class now carries the typology stage name (ADR-0008 D1xD2 matrix).
-- Joins int_gentrification_ts to dim_area for area_name and area_level.
-- period_yyyymm is constructed as YYYY12 (31-Dec snapshot convention).
-- G4 (#138) backfill: status_class_bi / dynamism_class_bi are now derived
-- deterministically for live_data (no new threshold rule invented):
-- * dynamism_class_bi is a direct relabel of the existing D2 Dynamik ordinal
-- (1=positiv/2=stabil/3=negativ -> positive/neutral/negative), matching the
-- thesis-variant domain exactly (ADR-0008 D2 binding; index-definition.md D2).
-- * status_class_bi is a 4-class-to-3-bucket grouping of the D1 Status ordinal
-- (1=hoch->high, 2=mittel->medium, 3=niedrig & 4=sehr_niedrig->low), grounded
-- in index-definition-domain-draft.md's D1xD2 stage table, which already
-- treats niedrig/sehr_niedrig as a single "-deprived" band (ADR-0008 D1
-- binding: ordinal class grouping only, never averaging codes as metric).
-- own_idx_class / own_idx_class_bi remain NULL for live_data -- out of scope for
-- G4 (they are the EWR/D4 own-index, not covered by this ticket's acceptance
-- criteria); a future D4-facing ticket may populate them.
-- PLR-level aggregate; not an individual- or building-level statement (G-2; §1.2).
select
    ts.city_code,
    da.area_level,
    ts.area_code,
    da.area_name,
    cast(ts.snapshot_year as varchar) || '12' as period_yyyymm,
    'live_data' as variant,
    cast(ts.residents_total as double) as population,
    -- D1: MSS social status ordinal (1=hoch/best … 4=sehr_niedrig/worst).
    -- INVERSE numeric vs 2018 thesis status_summe; same deprivation gradient.
    cast(ts.status_index as double) as status_index,
    -- typology stage from D1×D2 matrix (ADR-0008; index-definition.md §1.5).
    -- NULL for uninhabited PLRs (is_uninhabited=true; §7.1).
    cast(ts.typology_stage as varchar) as status_class,
    -- G4 (#138): D1 4-class -> 3-bucket grouping (hoch=high, mittel=medium,
    -- niedrig/sehr_niedrig=low). NULL propagates for uninhabited PLRs.
    case
        when ts.status_index is null
        then null
        when ts.status_index = 1
        then 'high'
        when ts.status_index = 2
        then 'medium'
        when ts.status_index in (3, 4)
        then 'low'
    end as status_class_bi,
    -- D2: MSS Dynamik ordinal (1=positiv/improving … 3=negativ/worsening).
    cast(ts.dynamik_index as double) as dynamism_index,
    -- G4 (#138): direct relabel of the D2 ordinal, same domain as the thesis
    -- variant (positive/neutral/negative). No new threshold; dynamism_class and
    -- dynamism_class_bi carry the identical relabel for live_data (there is no
    -- second MSS Dynamik projection to distinguish them, unlike the 2018 thesis'
    -- two distinct classification passes).
    case
        when ts.dynamik_index is null
        then null
        when ts.dynamik_index = 1
        then 'positive'
        when ts.dynamik_index = 2
        then 'neutral'
        when ts.dynamik_index = 3
        then 'negative'
    end as dynamism_class,
    case
        when ts.dynamik_index is null
        then null
        when ts.dynamik_index = 1
        then 'positive'
        when ts.dynamik_index = 2
        then 'neutral'
        when ts.dynamik_index = 3
        then 'negative'
    end as dynamism_class_bi,
    cast(null as varchar) as own_idx_class,
    cast(null as varchar) as own_idx_class_bi
from {{ ref("int_gentrification_ts") }} as ts
inner join
    {{ ref("dim_area") }} as da
    on ts.city_code = da.city_code
    and ts.area_code = da.area_code
-- Publication filter (QA-4b, #202): var('published_cities') -- see header note.
where {{ published_cities_filter('ts.city_code') }}

union all

-- OA-B.3 (#172): "improved" variant -- the causality-first tier-weighted OA
-- predictor (int_poi_status_dynamism_improved via int_gentrification_ts),
-- Berlin lor_2021 rows only. This variant swaps the D3 POI PREDICTOR for its
-- curated counterpart; it does NOT recompute the D1/D2 MSS social-status
-- OUTCOME, so status_class/dynamism_class/status_class_bi/dynamism_class_bi
-- are NULL here (no typology stage exists for a bare predictor score) --
-- consumers wanting the D1xD2 typology should read the 'live_data' variant.
-- NEVER blended with 'live_data' or the thesis variants (ADR-0017 D3/D4).
-- Filtered to rows where the improved predictor actually computed (excludes
-- the lor_pre2021/Hamburg branches where it is NULL by construction -- see
-- int_gentrification_ts header).
select
    ts.city_code,
    da.area_level,
    ts.area_code,
    da.area_name,
    cast(ts.snapshot_year as varchar) || '12' as period_yyyymm,
    'improved' as variant,
    cast(ts.residents_total as double) as population,
    ts.status_score_improved as status_index,
    cast(null as varchar) as status_class,
    cast(null as varchar) as status_class_bi,
    ts.dynamism_score_improved as dynamism_index,
    cast(null as varchar) as dynamism_class,
    cast(null as varchar) as dynamism_class_bi,
    cast(null as varchar) as own_idx_class,
    cast(null as varchar) as own_idx_class_bi
from {{ ref("int_gentrification_ts") }} as ts
inner join
    {{ ref("dim_area") }} as da
    on ts.city_code = da.city_code
    and ts.area_code = da.area_code
where
    {{ published_cities_filter('ts.city_code') }}
    and ts.status_score_improved is not null
