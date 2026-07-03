-- dim_area_geometry: area polygon geometries for the conformed area dimension
-- (ADR-0005 city-agnostic seam), reprojected to WGS84 (EPSG:4326) GeoJSON for
-- client-side web mapping (G1c #132 -- choropleth map page prep).
--
-- Why this model exists: dim_area (intermediate) carries no geometry -- the raw
-- WKB blobs live only in the staging layer (stg_berlin_lor / stg_berlin_lor_bzr /
-- stg_hamburg_geo), which is upstream of the marts layer that F2 (#34)
-- exports to parquet for the static, client-side-DuckDB-WASM site (ADR-0012).
-- This mart is PLUMBING: it exposes the same geometries the marts layer
-- already implicitly has access to, in a web-consumable projection/format.
-- No new spatial method, aggregation, or index/methodology decision is made
-- here (not on the R-C1 methodology-bearing model list) -- non-methodology-bearing.
--
-- Sources (UNIONed, one row per city_code/area_level/area_code/area_vintage):
-- 1. stg_berlin_lor       -- WFS LOR PLR geometry (BER / plr, both vintages).
-- 2. stg_berlin_lor_bzr   -- WFS LOR BZR geometry (BER / bzr, both vintages).
-- 3. stg_hamburg_geo      -- WFS Hamburg geometry (HH / district / subarea_l1 /
-- subarea_l2, single 'current' vintage). Included for the ADR-0005 seam,
-- even though G1c's initial map scope is Berlin-only.
--
-- Reprojection: native CRS per dim_city.native_crs_epsg (BER=EPSG:25833,
-- HH=EPSG:25832) -> EPSG:4326 (WGS84 lon/lat), matching the st_transform(...,
-- always_xy=true) convention already established in int_osm_poi_plr.sql /
-- int_osm_poi_hamburg.sql for the same native-CRS-to-WGS84 direction.
-- geometry_geojson is the GeoJSON `geometry` object only (not a full Feature);
-- consumers (e.g. a GeoJSON-export step for Evidence's AreaMap component)
-- wrap it with per-area `properties` (area_code/area_name/...).
--
-- area_vintage is kept (not deduped) so a consumer can pick the LOR vintage
-- that matches the period they're displaying, mirroring stg_berlin_lor's
-- own grain -- no vintage-preference decision is made in this model.
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    berlin_plr as (
        select
            lor.city_code,
            'plr' as area_level,
            lor.area_code,
            lor.area_name,
            lor.area_vintage,
            lor.geometry_wkb,
            city.native_crs_epsg
        from {{ ref("stg_berlin_lor") }} as lor
        left join {{ ref("dim_city") }} as city on lor.city_code = city.city_code
        where lor.area_code is not null
    ),

    berlin_bzr as (
        select
            lor.city_code,
            'bzr' as area_level,
            lor.area_code,
            lor.area_name,
            lor.area_vintage,
            lor.geometry_wkb,
            city.native_crs_epsg
        from {{ ref("stg_berlin_lor_bzr") }} as lor
        left join {{ ref("dim_city") }} as city on lor.city_code = city.city_code
        where lor.area_code is not null
    ),

    hamburg as (
        select
            geo.city_code,
            geo.area_level,
            geo.area_code,
            geo.area_name,
            geo.area_vintage,
            geo.geometry_wkb,
            city.native_crs_epsg
        from {{ ref("stg_hamburg_geo") }} as geo
        left join {{ ref("dim_city") }} as city on geo.city_code = city.city_code
        where geo.area_code is not null
    ),

    combined as (
        select *
        from berlin_plr
        union all
        select *
        from berlin_bzr
        union all
        select *
        from hamburg
    )

select
    city_code,
    area_level,
    area_code,
    area_name,
    area_vintage,
    st_asgeojson(
        st_transform(
            st_geomfromwkb(geometry_wkb),
            'EPSG:' || native_crs_epsg,
            'EPSG:4326',
            always_xy := true
        )
    ) as geometry_geojson
from combined
