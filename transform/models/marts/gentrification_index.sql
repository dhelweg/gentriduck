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
-- (variant='improved', Berlin lor_2021 AND lor_pre2021 rows since OA-ablation
-- #261 -- see that block below for scope)
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
-- Contract extended in #358 (docs/epic-g/358-spec.md Rev. 1): four columns APPENDED
-- (typology_stage, stage_number, stage_label, status_trend), populated for
-- variant='live_data' only and NULL for every other variant. Pre-#358 columns: no
-- value change beyond upstream float noise <=5e-14 in the 'improved' variant
-- (bit-exact copies of int_gentrification_ts; no upstream SQL changed).
-- PLR-level aggregate; not an individual- or building-level statement. Inferring an
-- individual's situation from a PLR stage is an ecological fallacy (G-2 guardrail;
-- index-definition.md §1.2).
--
-- HAMBURG ADMISSION (H3, #237): the #125 METHODOLOGY QUESTION is resolved. A fresh,
-- independent dual sign-off (docs/epic-h/H3-geo-signoff.md, H3-domain-signoff.md;
-- both Verdict: PASS WITH CONDITIONS) admitted Hamburg into this mart: city_code
-- accepted_values widened to ["BER","HH"] (schema.yml) and area_level widened to add
-- "subarea_l2" (Hamburg's Gebiet grain, the finest level int_gentrification_ts emits
-- for Hamburg). The admission is deliberately narrow: Hamburg only ever reaches this
-- mart via the 'live_data' branch below ('improved' stays Berlin-only by
-- construction), and that branch hard-NULLs own_idx_class/own_idx_class_bi (see the
-- 'live_data' select block) -- so the D4-EWR composite (the thing the H1 sign-offs
-- were most concerned about: migration-background/residence-duration omission,
-- Stadtteil->Gebiet grain-ceiling) does NOT enter this mart. What Hamburg publishes
-- here is the D1/D2 Sozialmonitoring OUTCOME (status/dynamism ordinals, typology
-- stage from the reused D1xD2 matrix) at full Gebiet resolution -- Hamburg's own
-- official Sozialmonitoring classification, re-labelled through the same matrix
-- Berlin's MSS uses. The D4-bearing marts (fct_gentrification_change,
-- fct_gentrification_trajectory, mart_area_demographics) are explicitly NOT admitted
-- by this change and remain city_code=["BER"]-only (H3 sign-off condition 4; see
-- their own model headers). Cross-city comparability caveats (Dynamik cadence:
-- Berlin biennial vs Hamburg annual/3yr window; same-named typology stage is not an
-- identical threshold) are disclosure-level, carried on web/pages/methodology.md §6
-- (H3 scope (c), separate ticket slice) -- not resolved by this SQL.
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

-- #358: live_data typology stage, computed once with the shared D1xD2 macro and
-- reused by the stage display columns below (ADR-0008; index-definition.md §1.5).
{% set live_stage %}
    ({{ typology_stage('ts.status_index', 'ts.dynamik_index') }})
{% endset %}

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
    own_idx_class_bi,
    -- #358: stage display + status trend are live_data-only (spec §1/§2, geo C3).
    -- Thesis variants carry the 2018 POI-dynamism projection, not the official
    -- Dynamik, so no typology stage or status trend exists for them.
    cast(null as varchar) as typology_stage,
    cast(null as integer) as stage_number,
    cast(null as varchar) as stage_label,
    cast(null as varchar) as status_trend
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
    cast(null as varchar) as own_idx_class_bi,
    -- #358 (spec docs/epic-g/358-spec.md Rev. 1, §1/§2; geo review C1/C3): display
    -- columns, appended after the pre-#358 contract columns, which are unchanged.
    -- typology_stage: the existing D1xD2 typology_stage() macro on the same D1
    -- Status / D2 Dynamik ordinals int_gentrification_ts uses (ADR-0008 D1xD2
    -- typology matrix; index-definition.md §1.5; Dangschat 1988 double
    -- invasion-succession cycle) -- identical to status_class for live_data, exposed
    -- under its own name so consumers stop reading status_class as "stage".
    -- Equality with int_gentrification_ts.typology_stage is asserted by
    -- tests/test_358_gentrification_index_stage_matches_ts.sql.
    cast({{ live_stage }} as varchar) as typology_stage,
    -- stage_number / stage_label: cycle position + exact public label from
    -- typology_stage_display() (Dangschat 1988; Clay 1979 pioneer -> expanding ->
    -- maturing = stages 3 -> 4 -> 5; Smith 1979 rent-gap precondition = stage 1).
    -- NULL stage (uninhabited / unscored) -> 'No stage on record', NULL number.
    {{ typology_stage_display(live_stage) }},
    -- status_trend: neutral public reading of the official D2 Dynamik class, a
    -- RELATIVE change of the official status indicators vs the whole city (Berlin
    -- MSS: 2-year window; Hamburg Sozialmonitoring: 3-year window -- the window
    -- belongs in the page legend, not in the value; ADR-0005).
    -- 1=positiv -> Improving, 2=stabil -> Stable, 3=negativ -> Worsening
    -- (index-definition.md §1.4/§3.4; sign confirmed in both cities by
    -- docs/epic-g/358-spec-geo-review.md §1). NOT a pressure measure: negativ
    -- Dynamik is filtering-down, at most a rent-gap precondition (Smith 1979); the
    -- upgrading signal is positiv Dynamik in low/middle status (Dangschat 1988;
    -- index-definition.md §1.5). Any unmapped code yields NULL (caught by the
    -- not_null test on live_data rows).
    case
        when ts.dynamik_index is null
        then 'No trend on record'
        when ts.dynamik_index = 1
        then 'Improving'
        when ts.dynamik_index = 2
        then 'Stable'
        when ts.dynamik_index = 3
        then 'Worsening'
    end as status_trend
from {{ ref("int_gentrification_ts") }} as ts
inner join
    {{ ref("dim_area") }} as da
    on ts.city_code = da.city_code
    and ts.area_code = da.area_code
-- Publication filter (QA-4b, #202): var('published_cities') -- see header note.
where {{ published_cities_filter('ts.city_code') }}

union all

-- OA-B.3 (#172) / OA-ablation (#261): "improved" variant -- the causality-first
-- tier-weighted OA predictor (int_poi_status_dynamism_improved for lor_2021 rows,
-- int_poi_status_dynamism_improved_pre2021 for lor_pre2021 rows, via
-- int_gentrification_ts), Berlin lor_2021 AND lor_pre2021 rows (still NOT
-- Hamburg -- seed_poi_offering_relevance is not validated for Hamburg's
-- taxonomy). This variant swaps the D3 POI PREDICTOR for its curated
-- counterpart; it does NOT recompute the D1/D2 MSS social-status OUTCOME, so
-- status_class/dynamism_class/status_class_bi/dynamism_class_bi are NULL here
-- (no typology stage exists for a bare predictor score) -- consumers wanting
-- the D1xD2 typology should read the 'live_data' variant. NEVER blended with
-- 'live_data' or the thesis variants (ADR-0017 D3/D4). Filtered to rows where
-- the improved predictor actually computed (excludes the Hamburg branch where
-- it is NULL by construction -- see int_gentrification_ts header). lor_2021
-- and lor_pre2021 rows here are NOT cross-vintage comparable (each vintage's
-- z-scores are normalised within its own PLR population, 542 vs 448 PLRs) --
-- same rule as every other z-score column in this pipeline.
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
    cast(null as varchar) as own_idx_class_bi,
    -- #358: no D1xD2 outcome is recomputed for this predictor variant (see above),
    -- so no stage display or status trend either (live_data-only; spec §1/§2).
    cast(null as varchar) as typology_stage,
    cast(null as integer) as stage_number,
    cast(null as varchar) as stage_label,
    cast(null as varchar) as status_trend
from {{ ref("int_gentrification_ts") }} as ts
inner join
    {{ ref("dim_area") }} as da
    on ts.city_code = da.city_code
    and ts.area_code = da.area_code
where
    {{ published_cities_filter('ts.city_code') }}
    and ts.status_score_improved is not null
