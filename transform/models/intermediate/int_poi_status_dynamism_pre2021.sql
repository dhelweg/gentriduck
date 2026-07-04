-- int_poi_status_dynamism_pre2021.sql
-- B7 (#117): POI status and dynamism scores for the lor_pre2021 PLR system.
--
-- Mirrors int_poi_status_dynamism but stays in the lor_pre2021 coordinate system
-- (448 PLRs, snapshot_year 2008-2020). This enables int_gentrification_ts to join
-- lor_pre2021 MSS editions (2015, 2017, 2019) with POI predictors in the same
-- PLR boundary system, giving the thesis-era H2/H3 lead-lag panel.
--
-- Source: int_poi_share_base where area_vintage = 'lor_pre2021'.
-- The share base already has lor_pre2021 rows; we skip the crosswalk step
-- (int_poi_share_base_2021) that would remap them to lor_2021 codes.
--
-- Z-score normalisation (Thesis §3.2; index-definition.md §2.4, binding):
-- status_score and dynamism_score are computed within the lor_pre2021 PLR
-- population for each snapshot_year (not across vintages). This matches the
-- thesis computation, which ran entirely on the lor_pre2021 (~447-PLR) system.
-- IMPORTANT: lor_pre2021 z-scores are NOT directly comparable to lor_2021
-- z-scores in int_poi_status_dynamism (different reference populations).
-- Cross-vintage comparison is prohibited; int_mss_lead_lag enforces this via
-- the within-vintage constraint (base.area_vintage = lagged.area_vintage).
--
-- C5 normalisation (geo-DS approved 2026-06-19, docs/epic-c/C5-geo-signoff.md):
-- dynamism_score uses share_yoy_change (share of city-wide POI count, C5-corrected)
-- not raw count deltas, to control for OSM completeness-bias.
-- City-wide total is computed within the lor_pre2021 population each year.
--
-- Graceful degradation: returns zero rows when int_poi_share_base has no
-- lor_pre2021 rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_share_base') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Filter to lor_pre2021 rows only from the share base (2008-2020, 448 PLRs).
    pre2021_base as (
        select * from {{ ref("int_poi_share_base") }} where area_vintage = 'lor_pre2021'
    ),

    -- Apply LAG within (city_code, area_code, area_vintage) to compute YoY share
    -- delta. All rows share area_vintage='lor_pre2021' so the window is contiguous.
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
        from pre2021_base
    )

-- Z-scores in a single pass with named WINDOW clause (avoids DuckDB nested-window
-- binder error described in int_poi_status_dynamism).
-- Window partitions by (city_code, snapshot_year) within the lor_pre2021 population.
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
    -- D3 density face (Thesis §3.2, p.47): relative POI richness vs lor_pre2021
    -- average.
    (total_poi_count - avg(total_poi_count) over w_year)
    / nullif(stddev(total_poi_count) over w_year, 0) as status_score,
    -- D3 dynamism face (C5-corrected; index-definition.md §2.4): relative share growth.
    (share_yoy_change - avg(share_yoy_change) over w_year)
    / nullif(stddev(share_yoy_change) over w_year, 0) as dynamism_score
from lag_base
window w_year as (partition by city_code, snapshot_year)
