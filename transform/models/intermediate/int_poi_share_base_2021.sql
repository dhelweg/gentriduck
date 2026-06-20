-- int_poi_share_base_2021.sql
-- Remaps int_poi_share_base to a unified LOR 2021 PLR scheme for all snapshot years.
--
-- Problem: int_poi_share_base contains rows with area_vintage='lor_pre2021' for
-- snapshot_year <= 2020 (old 448-PLR scheme) and area_vintage='lor_2021' for
-- snapshot_year >= 2021 (new 542-PLR scheme). The LAG window in int_poi_status_dynamism
-- is partitioned by (city_code, area_code, area_vintage); different codes across the
-- vintage boundary produce NULL for the 2020->2021 delta in fct_gentrification_change.
--
-- Solution: apply the same crosswalk strategy used in int_berlin_ewr_plr2021 to remap
-- lor_pre2021 POI counts to 2021 PLR codes. The output is a unified time series in
-- the lor_2021 scheme for all years, enabling LAG to compute the 2020->2021 delta.
--
-- Crosswalk strategy:
-- 1. Rows with area_vintage='lor_2021': passed through as-is (weight=1.0).
-- 2. Rows with area_vintage='lor_pre2021': joined to seed_lor_crosswalk_2006_to_2021.
-- total_poi_count is an extensive/count indicator: count_2021_plr = SUM(count *
-- weight).
-- When multiple pre-2021 PLRs map to the same 2021 PLR, counts are summed.
--
-- Derived columns:
-- - berlin_total_poi_count: city-wide total POI count per year; does not change when
-- we remap PLRs (same city, same year, same POIs), so we recompute via SUM() window.
-- - plr_poi_share: recomputed from aggregated total_poi_count / berlin_total_poi_count
-- rather than weighted from the pre-aggregation share (ratio recomputation is exact).
--
-- Output columns match int_poi_share_base:
-- city_code, area_code (always plr_id_2021), area_vintage (always 'lor_2021'),
-- snapshot_year, total_poi_count, berlin_total_poi_count, plr_poi_share
--
-- This model is consumed exclusively by int_poi_status_dynamism.
-- Do not use directly for analysis; use int_poi_status_dynamism instead.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_share_base') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    base as (select * from {{ ref("int_poi_share_base") }}),

    crosswalk as (
        select *
        from {{ ref("seed_lor_crosswalk_2006_to_2021") }}
        -- Exclude the stub placeholder row (dummy codes 00000000).
        where mapping_type != 'stub'
    ),

    -- lor_2021 rows pass through directly.
    lor2021_passthrough as (
        select city_code, area_code as plr_id_2021, snapshot_year, total_poi_count
        from base
        where area_vintage = 'lor_2021'
    ),

    -- lor_pre2021 rows: join to crosswalk and apply weight to apportion counts.
    -- total_poi_count is an extensive (count) indicator: weight * count is exact.
    -- Multiple pre-2021 PLRs mapping to the same 2021 PLR are aggregated via SUM.
    lor_pre2021_mapped as (
        select
            base.city_code,
            cw.plr_id_2021,
            base.snapshot_year,
            case
                when base.total_poi_count is null
                then null
                else base.total_poi_count * cw.weight
            end as total_poi_count
        from base
        inner join crosswalk as cw on base.area_code = cw.plr_id_pre2021
        where base.area_vintage = 'lor_pre2021'
    ),

    combined as (
        select *
        from lor2021_passthrough
        union all
        select *
        from lor_pre2021_mapped
    ),

    -- Aggregate to output grain: (city_code, snapshot_year, plr_id_2021).
    -- For lor_2021 passthrough rows: one row per group (weight=1.0, no aggregation
    -- effect).
    -- For lor_pre2021 mapped rows: SUM accumulates contributions from all pre-2021 PLRs
    -- that map to this 2021 PLR.
    aggregated as (
        select
            city_code,
            plr_id_2021 as area_code,
            snapshot_year,
            sum(total_poi_count) as total_poi_count
        from combined
        group by city_code, plr_id_2021, snapshot_year
    )

-- Recompute berlin_total_poi_count and plr_poi_share from the aggregated counts.
-- berlin_total_poi_count is city-wide and does not change with PLR remapping
-- (same city, same year, same POIs redistributed across new PLR boundaries).
-- plr_poi_share is recomputed as ratio (exact) rather than summing weighted shares.
select
    city_code,
    area_code,
    'lor_2021' as area_vintage,
    snapshot_year,
    total_poi_count,
    sum(total_poi_count) over (
        partition by city_code, snapshot_year
    ) as berlin_total_poi_count,
    total_poi_count
    * 1.0
    / nullif(
        sum(total_poi_count) over (partition by city_code, snapshot_year), 0
    ) as plr_poi_share
from aggregated
