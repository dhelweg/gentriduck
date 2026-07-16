-- mart_poi_offering_advantage.sql
-- #208 (split from #207, maintainer-requested): exposes the already-computed,
-- already-signed-off POI Offering Advantage (OA) location-quotient values
-- (int_poi_offering_advantage.sql, ADR-0017/0018) plus per-area POI density
-- through a mart, so the site can query them -- Evidence pages only bundle
-- `gentriduck_marts.*` parquet (never `gentriduck_intermediate.*`), so without
-- this step OA is unreachable from the web layer.
--
-- NOT methodology-bearing: this model does not compute or alter OA, its
-- weights, or its normalization -- it is a pure pass-through/join of an
-- already-signed-off intermediate model (int_poi_offering_advantage) plus a
-- density = count / area_km2 ratio, the same non-methodology-bearing
-- "plumbing" framing already used for dim_area_geometry.sql. Not on the R-C1
-- gated-file list.
--
-- #274 (ADR-0017 D5 D-3 discharge): also passes through the min-POI-base
-- flags (oa_domain_min_base_flag/oa_category_min_base_flag/
-- oa_type_min_base_flag) computed in int_poi_offering_advantage -- pure
-- pass-through of an upstream, already-computed column, no new flag logic
-- introduced at this layer.
--
-- Grain: one row per (city_code, snapshot_year, area_code, area_vintage,
-- weight_variant, methodology_variant, poi_domain_h, poi_category_h,
-- poi_type_h) -- identical to int_poi_offering_advantage's own grain (ADR-0017
-- D4), so this mart is a faithful pass-through, not a re-aggregation.
-- poi_count / poi_density_per_km2 are carried at the SAME taxonomy leaf (e.g.
-- "Gastronomy POIs per km2"), joined in from fct_poi_development on the
-- identical (city_code, snapshot_year, area_code, area_vintage, poi_domain_h,
-- poi_category_h, poi_type_h) key -- fct_poi_development has no weight_variant
-- dimension (it is the unweighted OSM point-in-polygon count), so poi_count /
-- poi_density_per_km2 are identical across weight_variant rows for the same
-- leaf; this mirrors how OA's own 'standard' weight_variant is defined
-- relative to the same unweighted stock (int_poi_offering_advantage.sql
-- standard_base CTE).
--
-- area_km2: ST_Area computed in each city's NATIVE (metres-based) CRS --
-- BER=EPSG:25833, HH=EPSG:25832 (dim_city.native_crs_epsg) -- before any
-- WGS84 reprojection, since area in degrees is not physically meaningful.
-- Berlin uses stg_berlin_lor (area_level='plr', matching int_osm_poi_plr's
-- join level); Hamburg uses stg_hamburg_geo filtered to area_level=
-- 'subarea_l2' (matching int_osm_poi_hamburg's join level, ADR-0014 Pillar 1).
--
-- Graceful degradation: returns zero rows when int_poi_offering_advantage
-- and/or the area-geometry staging sources have no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_offering_advantage') }}
-- depends_on: {{ ref('fct_poi_development') }}
-- depends_on: {{ ref('stg_berlin_lor') }}
-- depends_on: {{ ref('stg_hamburg_geo') }}
-- depends_on: {{ ref('dim_city') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- QA-4 (#179) legacy-lowercase normalisation (canonical_city_code() macro):
    -- int_poi_offering_advantage's 'gaussian_*' weight_variant rows inherit
    -- city_code='berlin' (lowercase) from int_osm_poi_plr_weighted (predates
    -- ADR-0005 canonicalization), while its 'standard' rows already carry
    -- canonical 'BER' (via fct_poi_development). Left un-normalised here, ~37%
    -- of rows (the entire gaussian_500m variant) would silently fail the
    -- poi_counts/area_km2 joins below (both keyed on canonical city_code) and
    -- carry NULL poi_count/area_km2/poi_density_per_km2. Same mechanical,
    -- non-methodology-bearing fix already applied at this exact boundary in
    -- fct_poi_development.sql.
    oa as (
        select
            {{ canonical_city_code("city_code") }} as city_code,
            snapshot_year,
            area_code,
            area_vintage,
            weight_variant,
            methodology_variant,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            oa_domain,
            oa_category,
            oa_type,
            oa_domain_min_base_flag,
            oa_category_min_base_flag,
            oa_type_min_base_flag
        from {{ ref("int_poi_offering_advantage") }}
    ),

    poi_counts as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            poi_count
        from {{ ref("fct_poi_development") }}
    ),

    -- Area size per (city_code, area_code, area_vintage), native-CRS m^2 / 1e6.
    -- Berlin: PLR grain (matches int_osm_poi_plr's join level).
    berlin_area_km2 as (
        select
            lor.city_code,
            lor.area_code,
            lor.area_vintage,
            st_area(st_geomfromwkb(lor.geometry_wkb)) / 1e6 as area_km2
        from {{ ref("stg_berlin_lor") }} as lor
        where lor.area_code is not null
    ),

    -- Hamburg: subarea_l2 grain (matches int_osm_poi_hamburg's join level,
    -- ADR-0014 Pillar 1).
    hamburg_area_km2 as (
        select
            geo.city_code,
            geo.area_code,
            geo.area_vintage,
            st_area(st_geomfromwkb(geo.geometry_wkb)) / 1e6 as area_km2
        from {{ ref("stg_hamburg_geo") }} as geo
        where geo.area_code is not null and geo.area_level = 'subarea_l2'
    ),

    area_km2 as (
        select *
        from berlin_area_km2
        union all
        select *
        from hamburg_area_km2
    )

select
    oa.city_code,
    oa.snapshot_year,
    oa.area_code,
    oa.area_vintage,
    oa.weight_variant,
    oa.methodology_variant,
    oa.poi_domain_h,
    oa.poi_category_h,
    oa.poi_type_h,
    oa.oa_domain,
    oa.oa_category,
    oa.oa_type,
    oa.oa_domain_min_base_flag,
    oa.oa_category_min_base_flag,
    oa.oa_type_min_base_flag,
    pc.poi_count,
    ak.area_km2,
    pc.poi_count / nullif(ak.area_km2, 0) as poi_density_per_km2
from oa
left join
    poi_counts as pc
    on oa.city_code = pc.city_code
    and oa.snapshot_year = pc.snapshot_year
    and oa.area_code = pc.area_code
    and oa.area_vintage = pc.area_vintage
    and oa.poi_domain_h = pc.poi_domain_h
    and oa.poi_category_h = pc.poi_category_h
    and oa.poi_type_h = pc.poi_type_h
left join
    area_km2 as ak
    on oa.city_code = ak.city_code
    and oa.area_code = ak.area_code
    and oa.area_vintage = ak.area_vintage
