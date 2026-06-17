-- int_berlin_ewr_plr2021.sql
-- Intermediate model: aligns the EWR time series to the LOR 2021 PLR scheme.
--
-- Problem: stg_berlin_ewr contains rows with area_vintage='lor_pre2021'
-- (reference_year <= 2020, old 447-PLR scheme) and area_vintage='lor_2021'
-- (reference_year >= 2021, new 542-PLR scheme). Cross-vintage time-series
-- analysis requires mapping pre-2021 PLR codes to their 2021 equivalents.
--
-- Crosswalk strategy:
-- 1. Rows with area_vintage='lor_2021': passed through as-is (weight=1.0).
-- 2. Rows with area_vintage='lor_pre2021': joined to seed_lor_crosswalk_2006_to_2021.
-- - mapping_type='identity': 1:1 map; indicator_value unchanged.
-- - mapping_type='official_concordance' or 'areal_pop_weighted': indicator_value
-- multiplied by weight (fractional for splits). For shares: weighted avg.
-- For residents_total (count): weight * value.
-- - mapping_type='stub': crosswalk not yet populated; pre-2021 rows dropped
-- with a NULL plr_id_2021 (not silently coerced).
--
-- Current state:
-- seed_lor_crosswalk_2006_to_2021 is a STUB (single placeholder row with
-- dummy codes 00000000). Until the official concordance is loaded:
-- - lor_2021 rows pass through normally (2021-2024 data fully available).
-- - lor_pre2021 rows produce zero output rows (no matching crosswalk entries).
-- TODO: replace stub crosswalk with official_concordance data from
-- Senatsverwaltung fuer Stadtentwicklung Berlin. See seed schema.yml for provenance.
--
-- Output grain: (reference_year, plr_id_2021, indicator)
-- One row per (reference_year, plr_id_2021, indicator) combination.
-- plr_id_2021 always uses the LOR 2021 area code scheme.
--
-- Known breaks (inherited from stg_berlin_ewr):
-- - LOR 2021 reform: this model resolves the break for aligned analysis.
-- - Migrationshintergrund ~2017: see seed_ewr_indicator_meta (stable_from_year=2017).
-- This model does not filter by stable_from_year; consumers should apply that filter.
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    ewr as (select * from {{ ref("stg_berlin_ewr") }}),

    crosswalk as (
        select *
        from {{ ref("seed_lor_crosswalk_2006_to_2021") }}
        -- Exclude the stub placeholder row (dummy codes 00000000).
        where mapping_type != 'stub'
    ),

    -- lor_2021 rows pass through directly with weight=1.0.
    lor2021_passthrough as (
        select
            city_code,
            area_code as plr_id_2021,
            area_vintage,
            reference_year,
            reference_date,
            indicator,
            indicator_value,
            is_suppressed_any,
            source_attribution,
            cast(1.0 as double) as crosswalk_weight,
            cast('passthrough' as varchar) as crosswalk_type
        from ewr
        where area_vintage = 'lor_2021'
    ),

    -- lor_pre2021 rows: join to crosswalk and apply weight.
    -- When crosswalk has no matching row (stub or missing), these rows are dropped.
    lor_pre2021_mapped as (
        select
            ewr.city_code,
            cw.plr_id_2021,
            ewr.area_vintage,
            ewr.reference_year,
            ewr.reference_date,
            ewr.indicator,
            -- For indicator_value: apply crosswalk weight.
            -- For count indicators (residents_total): weight * value.
            -- For share indicators: value * weight (weighted average component;
            -- NOTE: true weighted average requires summing weights per plr_id_2021
            -- which is handled by callers if needed).
            case
                when ewr.indicator_value is null
                then null
                else ewr.indicator_value * cw.weight
            end as indicator_value,
            ewr.is_suppressed_any,
            ewr.source_attribution,
            cw.weight as crosswalk_weight,
            cw.mapping_type as crosswalk_type
        from ewr
        inner join crosswalk as cw on ewr.area_code = cw.plr_id_pre2021
        where ewr.area_vintage = 'lor_pre2021'
    ),

    combined as (
        select *
        from lor2021_passthrough
        union all
        select *
        from lor_pre2021_mapped
    )

select
    city_code,
    plr_id_2021,
    area_vintage,
    reference_year,
    reference_date,
    indicator,
    indicator_value,
    is_suppressed_any,
    source_attribution,
    crosswalk_weight,
    crosswalk_type
from combined
