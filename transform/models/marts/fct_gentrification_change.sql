-- fct_gentrification_change.sql
-- C4 mart: per-PLR per-year gentrification change metrics.
-- Extends int_gentrification_ts with previous-year comparison columns:
-- - gentrification_score_prev: score from the previous year (LAG 1 year)
-- - gentrification_delta: year-over-year change in gentrification_score
-- - rank_current: rank of the PLR by gentrification_score within city x year
-- (RANK() — ties get the same rank; higher score -> lower rank number)
-- - rank_prev: rank from the previous year (LAG on rank_current)
-- - rank_change: rank_current - rank_prev (positive = moved up in ranking)
--
-- LAG is computed within (city_code, area_code, area_vintage) to avoid
-- cross-vintage rank comparisons at the 2021 LOR reform boundary.
-- This produces NULL for the first year of each vintage.
--
-- Output grain: (city_code, area_code, area_vintage, snapshot_year).
-- One row per PLR per year. Rows with NULL gentrification_score (sparse EWR or
-- suppressed cells) are included — rank and delta are NULL for those rows.
--
-- Contract: see marts/schema.yml for the governed column spec.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_gentrification_ts') }}
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    ts as (select * from {{ ref("int_gentrification_ts") }}),

    with_rank as (
        select
            *,
            -- Rank by gentrification_score within city x year (higher score = rank 1).
            -- NULLs are ranked last by default in DuckDB RANK().
            rank() over (
                partition by city_code, snapshot_year
                order by gentrification_score desc nulls last
            ) as rank_current
        from ts
    ),

    with_lag as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            total_poi_count,
            yoy_change,
            status_score,
            dynamism_score,
            ewr_composite,
            foreigners_share,
            migration_background_share,
            mean_age_years,
            residence_duration_5y_share,
            residents_total,
            gentrification_score,
            rank_current,
            -- Previous year's score and rank (within same area + vintage)
            lag(gentrification_score) over (
                partition by city_code, area_code, area_vintage order by snapshot_year
            ) as gentrification_score_prev,
            lag(rank_current) over (
                partition by city_code, area_code, area_vintage order by snapshot_year
            ) as rank_prev
        from with_rank
    )

select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    total_poi_count,
    yoy_change,
    status_score,
    dynamism_score,
    ewr_composite,
    foreigners_share,
    migration_background_share,
    mean_age_years,
    residence_duration_5y_share,
    residents_total,
    gentrification_score,
    gentrification_score_prev,
    (gentrification_score - gentrification_score_prev) as gentrification_delta,
    rank_current,
    rank_prev,
    -- rank_change: positive means moved up (lower rank number = better)
    -- Note: rank numbers run from 1 (highest score) to N (lowest); a lower
    -- rank_current means the area improved. rank_change = rank_prev - rank_current
    -- so positive = improved rank (less negative = better).
    (rank_prev - rank_current) as rank_change
from with_lag
