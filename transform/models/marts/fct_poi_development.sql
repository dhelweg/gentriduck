-- fct_poi_development.sql
-- C3-fact — POI development fact table: aggregated POI counts per
-- (city_code, snapshot_year, area_code, area_vintage, poi_category_h).
--
-- Purpose: captures the temporal development of POI composition at PLR grain
-- (Berlin) / statistisches-Gebiet grain (Hamburg), which feeds the
-- gentrification dynamism index (Epic C onwards).
--
-- Grain: one row per (city_code, snapshot_year, area_code, area_vintage,
-- poi_category_h).
-- Rows where area_code IS NULL are excluded (POIs outside area boundaries;
-- water bodies, airport areas, or coordinates outside city limits).
--
-- Sources (UNIONed, #40 H1 integration slice):
-- 1. int_osm_poi_plr (C3-join spatial join result) — Berlin, city_code='berlin'.
-- 2. int_osm_poi_hamburg (H1 spatial join result) — Hamburg, city_code='HH'.
-- Both sources already carry the harmonized poi_category_h taxonomy (C2), so no
-- new mapping logic is needed here — this is the ADR-0005 city-agnostic seam
-- exercised for the POI-predictor pillar (D3) for the first time with a second
-- city. Downstream (int_poi_features_pivot, int_poi_share_base,
-- int_poi_status_dynamism) already partition/window by city_code with no
-- Berlin-specific filtering, so Hamburg rows flow through those models
-- unmodified once they appear here (verified #40 integration slice).
--
-- Known: city_code='berlin' (lowercase, from C1 OSM ingestion) diverges from
-- dim_city where city_code='BER' (from 2018 thesis golden seed). This is a
-- pre-existing convention mismatch that will be resolved when the OSM staging
-- layer is normalised to use 'BER'. Hamburg's OSM ingestion (H1) uses the
-- canonical 'HH' code from the start (no legacy convention to preserve; see
-- ingest_hamburg_osm.py docstring, ADR-0014 Pillar 6).
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_osm_poi_plr') }}
-- depends_on: {{ ref('int_osm_poi_hamburg') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    berlin_source as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_category_h,
            source_attribution
        from {{ ref("int_osm_poi_plr") }}
        where area_code is not null
    ),

    hamburg_source as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_category_h,
            source_attribution
        from {{ ref("int_osm_poi_hamburg") }}
        where area_code is not null
    ),

    combined as (
        select *
        from berlin_source
        union all
        select *
        from hamburg_source
    ),

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
        from combined
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
