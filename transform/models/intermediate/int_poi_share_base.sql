-- int_poi_share_base.sql
-- C5 helper: pre-materializes PLR POI share per year before dynamism computation.
--
-- DuckDB does not support nested window functions, and its binder fails with
-- "unordered_map::at: key not found" when window functions are chained across
-- more than two subquery layers in a single SQL statement. Materializing the
-- share computation as a separate table breaks the chain at this boundary.
--
-- This model is consumed exclusively by int_poi_status_dynamism (C5 dynamism score).
-- Do not use directly for analysis; use int_poi_status_dynamism instead.
--
-- Output: one row per (city_code, snapshot_year, area_code, area_vintage)
-- with total_poi_count, berlin_total_poi_count, and plr_poi_share.
--
-- Fix (#122): area_vintage added to berlin_total_poi_count window partition so that
-- lor_pre2021 and lor_2021 rows are never summed together. Currently safe (lor_pre2021
-- covers 2008-2020; lor_2021 covers 2021+; no calendar year has both) but the invariant
-- was previously implicit and could silently break on a future backfill.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_features_pivot') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    total_poi_count,
    sum(total_poi_count) over (
        partition by city_code, snapshot_year, area_vintage
    ) as berlin_total_poi_count,
    total_poi_count
    * 1.0
    / nullif(
        sum(total_poi_count) over (partition by city_code, snapshot_year, area_vintage),
        0
    ) as plr_poi_share
from {{ ref("int_poi_features_pivot") }}
