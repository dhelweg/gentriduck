-- int_ewr_socioeco.sql
-- C4 intermediate: pivot int_ewr_series from long format to wide format and
-- compute the EWR composite socio-economic score.
--
-- Selects from int_ewr_series (long-format, 13 indicators, city_code='BER').
-- Pivots to one row per (city_code, area_code, area_vintage, reference_year).
-- Key indicators selected match the 2018 thesis own_idx (reference/system/71_oa.sql):
-- - foreigners_share          (thesis: k11 = E_A / E_E)
-- - age_under18_share         (proxy for dau5 / D_U5 + dau10 — combined bin here)
-- - mean_age_years            (thesis: ea midpoint-weighted)
-- - migration_background_share (thesis: mh / MH_E; available from 2015, break ~2017)
-- - residence_duration_5y_share (thesis: d2 — Wohndauer)
--
-- EWR composite score:
-- For each of the 5 key indicators, compute a z-score across all PLRs for that year.
-- Sum the z-scores to produce ewr_composite. Higher values indicate areas with
-- more socio-economically vulnerable populations (directional, not absolute).
--
-- Methodology notes (geo-data-scientist sign-off pending):
-- - NULLIF(stddev, 0) guards against degenerate years.
-- - NULL indicator values (suppressed cells) are excluded from z-score computation.
-- A PLR with any suppressed key indicator will have a NULL z-score for that
-- indicator, which propagates to NULL ewr_composite. Downstream NULL handling
-- is documented in int_gentrification_ts.
-- - migration_background_share is methodologically stable only from 2017
-- (Mikrozensus reform); pre-2017 values are present but not directly comparable.
-- C4 consumers should apply reference_year >= 2017 for migration comparisons.
--
-- Graceful degradation: returns zero rows when int_ewr_series has no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_ewr_series') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    ewr as (select * from {{ ref("int_ewr_series") }}),

    -- Pivot long -> wide: one row per area x year with key indicator columns.
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
        from ewr
        group by city_code, area_code, area_vintage, reference_year
    ),

    -- Compute z-scores for the 5 key indicators across PLRs per year.
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
            -- Z-score: foreigners_share
            (
                foreigners_share
                - avg(foreigners_share) over (partition by city_code, reference_year)
            ) / nullif(
                stddev(foreigners_share) over (partition by city_code, reference_year),
                0
            ) as z_foreigners_share,
            -- Z-score: age_under18_share
            (
                age_under18_share
                - avg(age_under18_share) over (partition by city_code, reference_year)
            ) / nullif(
                stddev(age_under18_share) over (partition by city_code, reference_year),
                0
            ) as z_age_under18_share,
            -- Z-score: migration_background_share (note: methodological break ~2017)
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
            -- Z-score: mean_age_years (negated: higher mean age -> lower
            -- vulnerability, so high z = lower vulnerability -> subtract from
            -- composite)
            -1.0 * (
                mean_age_years
                - avg(mean_age_years) over (partition by city_code, reference_year)
            )
            / nullif(
                stddev(mean_age_years) over (partition by city_code, reference_year), 0
            ) as z_mean_age_years,
            -- Z-score: residence_duration_5y_share
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

    -- EWR composite: mean of z-scores for the 5 key indicators (not sum).
    -- Using mean keeps ewr_composite on the same unit-variance scale as
    -- status_score and dynamism_score in int_poi_status_dynamism, so the
    -- equal-weight 1/3 average in int_gentrification_ts is actually equal.
    -- (Summing 5 z-scores would produce SD ~√5 and silently dominate.)
    -- NULL if any z-score is NULL (i.e., any key indicator was suppressed or absent).
    -- Higher ewr_composite = more socio-economically vulnerable population.
    -- Sign convention: negated when entering gentrification_score in
    -- int_gentrification_ts.
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
