-- int_poi_status_dynamism.sql
-- C4 intermediate: per-PLR per-year POI status and dynamism scores.
--
-- From int_poi_features_pivot, compute for each (area_code, snapshot_year):
-- - status_score: z-score of total_poi_count across all PLRs for that year
-- = (total_poi_count - mean(total_poi_count over year)) / stddev(... over year)
-- Captures how POI-rich an area is relative to other Berlin PLRs.
-- Mirrors the 2018 thesis status_index (reference/system/71_oa.sql).
-- - yoy_change: year-over-year absolute change in total_poi_count (LAG 1 year).
-- Only computed within the same area_vintage to avoid cross-vintage discontinuity
-- (the 2021 LOR reform changes PLR boundaries). Delta across vintages is NULL.
-- - dynamism_score: z-score of yoy_change across all PLRs for that year.
-- Captures how fast an area's POI stock is changing relative to other PLRs.
-- Mirrors the 2018 thesis dynamism_index.
--
-- Methodology notes (geo-data-scientist sign-off pending on weighting in
-- int_gentrification_ts; this model is inputs-only):
-- - Window functions over (snapshot_year) for z-scores: stddev returns NULL
-- when < 2 rows for that year. This is handled by NULLIF(stddev, 0) guard.
-- - YoY change is computed within (area_code, area_vintage) to avoid
-- cross-vintage comparisons (PLR boundary change at 2021 reform).
-- The break is documented; cross-vintage interpolation is issue #51.
-- - Null handling: where total_poi_count is NULL (no POIs in that year/area)
-- z-scores are NULL. Downstream models treat NULL scores as missing data.
-- - Implementation note: all window functions are computed in a single SELECT
-- from a subquery that provides total_poi_count + prev_count. This avoids a
-- DuckDB internal error that occurs when chaining CTEs with multiple window
-- function layers (the column binding resolver fails on the second layer).
--
-- Graceful degradation: returns zero rows when int_poi_features_pivot has no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_features_pivot') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Subquery provides total_poi_count + prev_year via LAG.
    -- LAG is partitioned by (city_code, area_code, area_vintage) so cross-vintage
    -- year-over-year comparisons produce NULL (correct for the 2021 LOR reform break).
    lag_base as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            total_poi_count,
            lag(total_poi_count) over (
                partition by city_code, area_code, area_vintage order by snapshot_year
            ) as total_poi_count_prev_year
        from {{ ref("int_poi_features_pivot") }}
    )

-- Compute all z-scores in a single pass using named WINDOW clauses.
-- DuckDB supports WINDOW ... AS (...) syntax for reusing window definitions.
-- status_score and dynamism_score use the same year-partition; combining them
-- in one SELECT avoids the CTE-chaining internal error described above.
select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    total_poi_count,
    total_poi_count_prev_year,
    (total_poi_count - total_poi_count_prev_year) as yoy_change,
    -- Status z-score: how POI-rich relative to city-wide average this year?
    (total_poi_count - avg(total_poi_count) over w_year)
    / nullif(stddev(total_poi_count) over w_year, 0) as status_score,
    -- Dynamism z-score: how fast is change relative to city-wide YoY this year?
    (
        (total_poi_count - total_poi_count_prev_year)
        - avg(total_poi_count - total_poi_count_prev_year) over w_year
    ) / nullif(
        stddev(total_poi_count - total_poi_count_prev_year) over w_year, 0
    ) as dynamism_score
from lag_base
window w_year as (partition by city_code, snapshot_year)
