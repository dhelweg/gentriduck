-- Mart: governed gentrification index per area x period x variant (ADR-0004).
-- This is the core output table of the Gentriduck warehouse. The index definition
-- is governed: inputs, formula, per-city parameters, and limitations are documented
-- in ADR-0004 and in the public methodology page (Epic G2).
--
-- Sources (UNIONed):
-- 1. int_thesis_2018_area_index — 2018 thesis goldens
-- (variant='standard'/'distance_weighted')
-- 2. int_gentrification_ts — C4 live-data index (variant='live_data')
--
-- Contract (ADR-0004): column names and types below are the governed contract.
-- Changes require a deliberate contract edit and reviewer sign-off.
-- Contract extended in C4 (#24): added 'live_data' to variant accepted values;
-- class columns are NULL for live_data rows (classification not yet implemented).
{{
    config(
        materialized="table",
        contract={"enforced": true},
        meta={
            "dbt_meta_owner": "data-engineer",
            "governed_definition": "ADR-0004",
            "index_inputs": (
                "2018_thesis: status_index/dynamism_index/own_idx_class from thesis goldens | "
                "live_data: status_score (POI z-score), dynamism_score (POI YoY z-score), "
                "ewr_composite (socio-eco z-score sum from EWR)"
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

-- C4 live-data index (variant='live_data')
-- Joins int_gentrification_ts to dim_area for area_name and area_level.
-- class columns are NULL: area classification requires a separate step (follow-up).
-- period_yyyymm is constructed as YYYY12 (31-Dec snapshot convention).
select
    ts.city_code,
    da.area_level,
    ts.area_code,
    da.area_name,
    cast(ts.snapshot_year as varchar) || '12' as period_yyyymm,
    'live_data' as variant,
    cast(ts.residents_total as double) as population,
    cast(ts.status_score as double) as status_index,
    cast(null as varchar) as status_class,
    cast(null as varchar) as status_class_bi,
    cast(ts.dynamism_score as double) as dynamism_index,
    cast(null as varchar) as dynamism_class,
    cast(null as varchar) as dynamism_class_bi,
    cast(null as varchar) as own_idx_class,
    cast(null as varchar) as own_idx_class_bi
from {{ ref("int_gentrification_ts") }} as ts
inner join
    {{ ref("dim_area") }} as da
    on ts.city_code = da.city_code
    and ts.area_code = da.area_code
