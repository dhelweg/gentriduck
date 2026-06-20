-- Mart: governed gentrification index per area x period x variant (ADR-0004).
-- This is the core output table of the Gentriduck warehouse. The index definition
-- is governed: inputs, formula, per-city parameters, and limitations are documented
-- in ADR-0004 and in the public methodology page (Epic G2).
--
-- Sources (UNIONed):
-- 1. int_thesis_2018_area_index — 2018 thesis goldens
-- (variant='standard'/'distance_weighted')
-- 2. int_gentrification_ts — R-A1 re-grounded live-data index (variant='live_data')
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
-- status_class_bi, dynamism_class_bi, own_idx_class, own_idx_class_bi: NULL for
-- live_data
-- (binary classification and EWR-class not yet implemented; follow-up issue).
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
    cast(null as varchar) as status_class_bi,
    -- D2: MSS Dynamik ordinal (1=positiv/improving … 3=negativ/worsening).
    cast(ts.dynamik_index as double) as dynamism_index,
    cast(null as varchar) as dynamism_class,
    cast(null as varchar) as dynamism_class_bi,
    cast(null as varchar) as own_idx_class,
    cast(null as varchar) as own_idx_class_bi
from {{ ref("int_gentrification_ts") }} as ts
inner join
    {{ ref("dim_area") }} as da
    on ts.city_code = da.city_code
    and ts.area_code = da.area_code
