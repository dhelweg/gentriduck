-- int_poi_status_dynamism.sql
-- C4/C5 intermediate: per-PLR per-year POI status and dynamism scores.
--
-- From int_poi_features_pivot (via int_poi_share_base), compute for each
-- (area_code, snapshot_year):
-- - status_score: z-score of total_poi_count across all PLRs for that year
-- = (total_poi_count - mean(total_poi_count over year)) / stddev(... over year)
-- Captures how POI-rich an area is relative to other Berlin PLRs.
-- Mirrors the 2018 thesis status_index (reference/system/71_oa.sql).
-- - plr_poi_share: each PLR's fraction of total Berlin POI count for that year
-- (pre-computed in int_poi_share_base to avoid DuckDB nested window limitation).
-- - share_yoy_change: YoY change in plr_poi_share.
-- Computed within the same area_code after remapping all rows to the lor_2021 scheme
-- via int_poi_share_base_2021. The 2020->2021 delta is now computable (issue #63).
-- - dynamism_score: z-score of share_yoy_change across all PLRs for that year.
-- Captures how fast an area's share of total POIs is changing relative to others.
-- Mirrors the 2018 thesis dynamism_index.
--
-- C5 normalization (geo-DS approved 2026-06-19, docs/epic-c/C5-geo-signoff.md):
-- Prior to C5, dynamism_score was a z-score of raw YoY count deltas. This exposed
-- it to OSM completeness-bias: areas mapped late appeared to have high dynamism
-- simply because mapper coverage improved, not because real POI churn occurred.
-- The C4 geo-DS sign-off explicitly required C5 before publishing dynamism_score.
--
-- Solution (Option A -- PLR POI share normalization):
-- Using each PLR's share of city-wide POIs controls for uniform OSM coverage growth.
-- Under the uniform-coverage assumption (acceptable at Berlin PLR scale 2008-2024),
-- city-wide mapping growth cancels in share_yoy_change, leaving only real relative
-- density changes. If a PLR gains share, it attracted disproportionately more POIs
-- than Berlin overall -- a real signal, not mapping noise.
--
-- Limitation: non-uniform mapping coverage growth (some PLRs mapped earlier than
-- others) may create spurious share dynamics. Option B (ohsome edit-density
-- normalization) is available for a future epic if needed post-publication.
--
-- Methodology notes:
-- - Window functions over (snapshot_year) for z-scores: stddev returns NULL
-- when < 2 rows for that year. This is handled by NULLIF(stddev, 0) guard.
-- - share_yoy_change is computed within (area_code, area_vintage) to avoid
-- cross-vintage comparisons (PLR boundary change at 2021 reform).
-- The break is documented; cross-vintage interpolation is issue #51 (C3).
-- - Null handling: where total_poi_count is NULL (no POIs in that year/area)
-- z-scores are NULL. Downstream models treat NULL scores as missing data.
-- - Implementation: DuckDB does not support nested window functions, and its
-- binder fails when window functions are chained across multiple subquery layers
-- in a single SQL statement ("unordered_map::at: key not found" internal error).
-- Solution: plr_poi_share is pre-materialized in int_poi_share_base (separate
-- table model). This model applies LAG and z-scores in two subquery layers,
-- which is within DuckDB's supported depth (as confirmed by the original model).
--
-- Graceful degradation: returns zero rows when int_poi_features_pivot has no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_share_base_2021') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Subquery: apply LAG to pre-computed plr_poi_share and compute share_yoy_change.
    -- LAG is partitioned by (city_code, area_code, area_vintage). Because
    -- int_poi_share_base_2021 remaps all pre-2021 PLR codes to their 2021 equivalents
    -- and outputs area_vintage='lor_2021' for all rows, the LAG window now spans the
    -- 2020->2021 vintage boundary and produces non-NULL deltas at snapshot_year=2021.
    lag_base as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            total_poi_count,
            berlin_total_poi_count,
            plr_poi_share,
            lag(plr_poi_share) over (
                partition by city_code, area_code, area_vintage order by snapshot_year
            ) as plr_poi_share_prev_year,
            plr_poi_share - lag(plr_poi_share) over (
                partition by city_code, area_code, area_vintage order by snapshot_year
            ) as share_yoy_change
        from {{ ref("int_poi_share_base_2021") }}
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
    berlin_total_poi_count,
    plr_poi_share,
    plr_poi_share_prev_year,
    share_yoy_change,
    -- Status z-score: how POI-rich relative to city-wide average this year?
    (total_poi_count - avg(total_poi_count) over w_year)
    / nullif(stddev(total_poi_count) over w_year, 0) as status_score,
    -- Dynamism z-score (C5): how fast is share changing relative to city-wide?
    -- Uses share_yoy_change instead of raw count delta to control for OSM
    -- completeness-bias (geo-DS approved 2026-06-19, C5-geo-signoff.md).
    (share_yoy_change - avg(share_yoy_change) over w_year)
    / nullif(stddev(share_yoy_change) over w_year, 0) as dynamism_score
from lag_base
window w_year as (partition by city_code, snapshot_year)
