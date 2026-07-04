-- int_ewr_socioeco_pre2021.sql
-- B7 (#117): EWR socio-economic composite for the lor_pre2021 PLR system (2008-2020).
--
-- Mirrors int_ewr_socioeco but reads directly from stg_berlin_ewr (lor_pre2021 rows),
-- bypassing the crosswalk in int_berlin_ewr_plr2021. This preserves the original
-- lor_pre2021 area codes so they can be joined with lor_pre2021 MSS outcomes in
-- int_gentrification_ts for the thesis-era lead-lag panel.
--
-- Key indicator selection (Thesis §3.1, EWR codebook; matches int_ewr_socioeco):
-- - foreigners_share           (EWR: k11 = E_A / E_E)
-- - age_under18_share          (EWR: dau5+dau10 combined bin)
-- - migration_background_share (EWR: mh / MH_E; present from 2015, break ~2017;
-- methodologically comparable only from 2017)
-- - mean_age_years             (EWR: ea midpoint-weighted)
-- - residence_duration_5y_share (EWR: d2 — Wohndauer ≥5 Jahre)
--
-- Pre-2014 note: migration_background_share is NULL pre-2014 (E_A column absent
-- before Mikrozensus reform). ewr_composite is NULL for pre-2014 rows because any
-- NULL z-score propagates to NULL composite. This is acceptable: the B7 use case
-- (MSS 2015/2017/2019) only needs EWR at edition years 2015, 2017, 2019 where
-- all five indicators are present.
--
-- Z-score normalisation: computed within the lor_pre2021 PLR population per year.
-- NOT directly comparable to int_ewr_socioeco z-scores (different reference
-- population: 447 lor_pre2021 PLRs vs 542 lor_2021 PLRs).
--
-- Graceful degradation: returns zero rows when stg_berlin_ewr has no lor_pre2021 rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('stg_berlin_ewr') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Filter stg_berlin_ewr to lor_pre2021 rows only (area_vintage='lor_pre2021').
    ewr_raw as (
        select
            city_code,
            area_code,
            area_vintage,
            reference_year,
            indicator,
            indicator_value,
            is_suppressed_any
        from {{ ref("stg_berlin_ewr") }}
        where area_vintage = 'lor_pre2021'
    ),

    -- Pivot long -> wide: one row per (area_code, reference_year) with key indicators.
    pivoted as (
        select
            city_code,
            area_code,
            area_vintage,
            reference_year,
            max(indicator_value) filter (
                where indicator = 'foreigners_share'
            ) as foreigners_share,
            max(indicator_value) filter (
                where indicator = 'age_under18_share'
            ) as age_under18_share,
            -- NULL pre-2014 (Mikrozensus reform; methodological break ~2017)
            max(indicator_value) filter (
                where indicator = 'migration_background_share'
            ) as migration_background_share,
            max(indicator_value) filter (
                where indicator = 'mean_age_years'
            ) as mean_age_years,
            max(indicator_value) filter (
                where indicator = 'residence_duration_5y_share'
            ) as residence_duration_5y_share,
            -- Additional indicators kept for downstream reference
            max(indicator_value) filter (
                where indicator = 'residents_total'
            ) as residents_total,
            max(indicator_value) filter (
                where indicator = 'residents_male_share'
            ) as residents_male_share,
            max(indicator_value) filter (
                where indicator = 'age_65plus_share'
            ) as age_65plus_share
        from ewr_raw
        group by city_code, area_code, area_vintage, reference_year
    ),

    -- Z-scores within the lor_pre2021 population per year (Thesis §3.1, p.43).
    -- Mirrors int_ewr_socioeco exactly; reference population is lor_pre2021 PLRs.
    with_z as (
        select
            city_code,
            area_code,
            area_vintage,
            reference_year,
            foreigners_share,
            age_under18_share,
            migration_background_share,
            mean_age_years,
            residence_duration_5y_share,
            residents_total,
            residents_male_share,
            age_65plus_share,
            (
                foreigners_share
                - avg(foreigners_share) over (partition by city_code, reference_year)
            ) / nullif(
                stddev(foreigners_share) over (partition by city_code, reference_year),
                0
            ) as z_foreigners_share,
            (
                age_under18_share
                - avg(age_under18_share) over (partition by city_code, reference_year)
            ) / nullif(
                stddev(age_under18_share) over (partition by city_code, reference_year),
                0
            ) as z_age_under18_share,
            -- NULL pre-2014 (migration_background_share absent); propagates to
            -- NULL ewr_composite for those years.
            (
                migration_background_share - avg(migration_background_share) over (
                    partition by city_code, reference_year
                )
            ) / nullif(
                stddev(migration_background_share) over (
                    partition by city_code, reference_year
                ),
                0
            ) as z_migration_background_share,
            (
                mean_age_years
                - avg(mean_age_years) over (partition by city_code, reference_year)
            ) / nullif(
                stddev(mean_age_years) over (partition by city_code, reference_year), 0
            ) as z_mean_age_years,
            (
                residence_duration_5y_share - avg(residence_duration_5y_share) over (
                    partition by city_code, reference_year
                )
            ) / nullif(
                stddev(residence_duration_5y_share) over (
                    partition by city_code, reference_year
                ),
                0
            ) as z_residence_duration_5y_share
        from pivoted
    ),

    -- EWR composite: mean of 5 z-scores (Thesis §3.1; Döring & Ulbricht 2016).
    -- Mean keeps ewr_composite on unit-variance scale matching status/dynamism scores.
    -- NULL if any z-score is NULL (suppressed cell or pre-2014 migration_background).
    -- Higher ewr_composite = more socio-economically vulnerable population.
    with_composite as (
        select
            *,
            (
                z_foreigners_share
                + z_age_under18_share
                + z_migration_background_share
                + z_mean_age_years
                + z_residence_duration_5y_share
            )
            / 5.0 as ewr_composite
        from with_z
    )

select *
from with_composite
