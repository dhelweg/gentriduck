-- fct_poi_development.sql
-- C3-fact — POI development fact table: aggregated POI counts per
-- (city_code, snapshot_year, area_code, area_vintage, poi_category_h).
--
-- Purpose: captures the temporal development of POI composition at PLR grain,
-- which feeds the gentrification dynamism index (Epic C onwards).
--
-- Grain: one row per (city_code, snapshot_year, area_code, area_vintage,
-- poi_category_h).
-- Rows where area_code IS NULL are excluded (POIs outside all PLR boundaries;
-- these are water bodies, airport areas, or coordinates outside Berlin).
--
-- Source: int_osm_poi_plr (C3-join spatial join result).
--
-- Known: city_code='berlin' (lowercase, from C1 OSM ingestion) diverges from
-- dim_city where city_code='BER' (from 2018 thesis golden seed). This is a
-- pre-existing convention mismatch that will be resolved when the OSM staging
-- layer is normalised to use 'BER'. See stg_berlin_lor population TODO in
-- dim_area.sql and the follow-up issue for stg_berlin_lor + dim_area wiring.
--
-- dbt_meta_owner: data-engineer
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    source as (select * from {{ ref("int_osm_poi_plr") }} where area_code is not null),

    aggregated as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_category_h,
            count(*) as poi_count,
            -- Carry source_attribution from any row in the group (same for all rows
            -- within a city/year cohort since they share a single data source).
            any_value(source_attribution) as source_attribution
        from source
        group by city_code, snapshot_year, area_code, area_vintage, poi_category_h
    )

select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    poi_category_h,
    poi_count,
    source_attribution
from aggregated
