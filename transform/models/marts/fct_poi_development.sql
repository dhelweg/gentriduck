-- fct_poi_development.sql
-- C3-fact — POI development fact table: aggregated POI counts per
-- (city_code, snapshot_year, area_code, area_vintage, poi_domain_h,
-- poi_category_h, poi_type_h).
--
-- Purpose: captures the temporal development of POI composition at PLR grain
-- (Berlin) / statistisches-Gebiet grain (Hamburg), which feeds the
-- gentrification dynamism index (Epic C onwards).
--
-- Grain (OA-A.1 #165 -- ADR-0017 D1): one row per (city_code, snapshot_year,
-- area_code, area_vintage, poi_domain_h, poi_category_h, poi_type_h). Prior to
-- #165 this table was grained at poi_category_h only; poi_domain_h and
-- poi_type_h were dropped here even though int_osm_poi_plr / int_osm_poi_hamburg
-- already carried the full 3-level harmonized taxonomy (C2). This is a
-- strictly ADDITIVE re-plumb, not a breaking rename: poi_category_h keeps its
-- name/meaning, and every existing category-grain consumer (int_poi_features_pivot)
-- still gets correct category totals by re-aggregating (SUM) over the now-finer
-- type dimension -- see int_poi_features_pivot.sql. The finer grain does not
-- introduce ambiguity: poi_type_h -> (poi_domain_h, poi_category_h) is a
-- functional dependency in seed_poi_mapping.csv (verified: every harmonized
-- type maps to exactly one domain/category pair; ingest_osm_history.py /
-- ingest_hamburg_osm.py write poi_domain/poi_category/poi_type as one
-- resolved (domain, category, type) triple per POI, never independently), so
-- grouping by all three together is the natural finest-grain aggregation, not
-- a new indicator/weighting/normalization decision (not R-C1 methodology-bearing).
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
-- Normalization (#140): Berlin's OSM ingestion (C1) predates ADR-0005
-- canonicalization and writes city_code='berlin' (lowercase) into the raw
-- parquet files (gitignored, upstream of stg_osm_poi/int_osm_poi_plr). Rather
-- than re-running the OSM history ingestion, this mart normalises
-- 'berlin' -> 'BER' (dim_city's canonical code) at aggregation time, so every
-- downstream consumer of this fact table sees the single canonical value.
-- Hamburg's OSM ingestion (H1) already uses the canonical 'HH' code from the
-- start (no legacy convention to preserve; see ingest_hamburg_osm.py
-- docstring, ADR-0014 Pillar 6) and passes through unchanged.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_osm_poi_plr') }}
-- depends_on: {{ ref('int_osm_poi_hamburg') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    berlin_source as (
        select
            -- #140: normalise legacy lowercase 'berlin' to canonical 'BER'
            -- (dim_city.city_code) at the source of this fact table.
            'BER' as city_code,
            snapshot_year,
            area_code,
            area_vintage,
            -- OA-A.1 #165: carry the full 3-level harmonized taxonomy through
            -- (previously only poi_category_h was selected here).
            poi_domain_h,
            poi_category_h,
            poi_type_h,
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
            poi_domain_h,
            poi_category_h,
            poi_type_h,
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
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            count(*) as poi_count,
            -- Carry source_attribution from any row in the group (same for all rows
            -- within a city/year cohort since they share a single data source).
            any_value(source_attribution) as source_attribution
        from combined
        group by
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h
    )

select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    poi_domain_h,
    poi_category_h,
    poi_type_h,
    poi_count,
    source_attribution
from aggregated
