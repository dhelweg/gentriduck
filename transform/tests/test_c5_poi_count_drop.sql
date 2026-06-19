-- test_c5_poi_count_drop.sql
-- C5 anomaly test: detect years where total Berlin POI count drops >5% year-over-year.
-- A drop indicates a data quality issue (mass deletion or ingestion error).
-- Returns rows that violate the threshold; zero rows = test passes.
-- Severity: warn (configured in dbt_project.yml).
--
-- Uses a subquery to compute LAG before filtering, because DuckDB does not allow
-- window functions in WHERE clauses.
with
    city_totals as (
        select
            city_code,
            snapshot_year,
            -- berlin_total_poi_count is the same for all PLRs in a year; take MAX.
            max(berlin_total_poi_count) as total_poi_count
        from {{ ref("int_poi_status_dynamism") }}
        where berlin_total_poi_count is not null
        group by city_code, snapshot_year
    ),

    with_lag as (
        select
            city_code,
            snapshot_year,
            total_poi_count,
            lag(total_poi_count) over (
                partition by city_code order by snapshot_year
            ) as prev_year_count
        from city_totals
    )

select
    city_code,
    snapshot_year,
    total_poi_count,
    prev_year_count,
    total_poi_count * 1.0 / nullif(prev_year_count, 0) as yoy_ratio
from with_lag
where
    prev_year_count is not null
    and prev_year_count > 0
    and total_poi_count < 0.95 * prev_year_count
