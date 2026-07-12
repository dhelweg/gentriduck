-- int_ewr_demographics_wide.sql
-- #243 (I19, area demographics / Kurzprofil parity): pivots
-- int_berlin_ewr_plr2021 (long format, ALL 13 seed_ewr_indicator_meta
-- indicators) to one row per (city_code, area_code, area_vintage,
-- reference_year), at PLR grain, for DISPLAY purposes.
--
-- This is intentionally a SEPARATE model from int_ewr_socioeco (which
-- pivots only the 5 key vulnerability indicators used by the gentrification
-- index composite, plus 3 extras it happens to carry). int_ewr_socioeco is
-- on the R-C1 methodology-gate list (feeds gentrification_index weights);
-- this model is NOT -- it is a read-only, display-only re-pivot of the same
-- upstream long-format series and makes zero changes to any index input,
-- weight, or normalization. Kept separate so int_ewr_socioeco's own grain/
-- dedup/z-score logic is never at risk of being disturbed by demographic
-- display needs (same separation-of-concerns rationale dim_area_hierarchy's
-- header gives for not touching dim_area -- see #242).
--
-- Grain: one row per (city_code, area_code, area_vintage, reference_year),
-- PLR level only. Downstream mart_area_demographics (marts/) rolls this up
-- to BZR/PGR/Bezirk via dim_area_hierarchy.
--
-- Indicators pivoted: all 13 rows of seed_ewr_indicator_meta (Kurzprofil
-- parity -- I19 ticket: "the data is already ingested ... today they only
-- feed the composite, never shown descriptively"), vs. int_ewr_socioeco's 8.
--
-- Graceful degradation: returns zero rows when int_berlin_ewr_plr2021 has
-- no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_berlin_ewr_plr2021') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    ewr as (
        select
            city_code,
            plr_id_2021 as area_code,
            area_vintage,
            reference_year,
            reference_date,
            indicator,
            indicator_value,
            is_suppressed_any,
            source_attribution
        from {{ ref("int_berlin_ewr_plr2021") }}
    )

select
    city_code,
    area_code,
    area_vintage,
    reference_year,
    max(reference_date) as reference_date,
    max(indicator_value) filter (
        where indicator = 'residents_total'
    ) as residents_total,
    max(indicator_value) filter (
        where indicator = 'residents_male_share'
    ) as residents_male_share,
    max(indicator_value) filter (
        where indicator = 'residents_female_share'
    ) as residents_female_share,
    max(indicator_value) filter (
        where indicator = 'age_under18_share'
    ) as age_under18_share,
    max(indicator_value) filter (
        where indicator = 'age_18_27_share'
    ) as age_18_27_share,
    max(indicator_value) filter (
        where indicator = 'age_27_45_share'
    ) as age_27_45_share,
    max(indicator_value) filter (
        where indicator = 'age_45_65_share'
    ) as age_45_65_share,
    max(indicator_value) filter (
        where indicator = 'age_65plus_share'
    ) as age_65plus_share,
    max(indicator_value) filter (
        where indicator = 'mean_age_years'
    ) as mean_age_years,
    max(indicator_value) filter (
        where indicator = 'foreigners_share'
    ) as foreigners_share,
    max(indicator_value) filter (
        where indicator = 'migration_background_share'
    ) as migration_background_share,
    max(indicator_value) filter (
        where indicator = 'residence_duration_5y_share'
    ) as residence_duration_5y_share,
    max(indicator_value) filter (
        where indicator = 'residence_duration_10y_share'
    ) as residence_duration_10y_share,
    -- Suppression: TRUE if ANY pivoted indicator for this area/year was
    -- suppressed at source (propagate, don't silently zero -- I19 acceptance:
    -- "sparse/suppressed areas degrade gracefully").
    bool_or(coalesce(is_suppressed_any, false)) as any_indicator_suppressed,
    max(source_attribution) as source_attribution
from ewr
group by city_code, area_code, area_vintage, reference_year
