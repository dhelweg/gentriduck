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
-- 4. stg_berlin_lor_pgr   -- WFS LOR Prognoseraum geometry (BER / pgr, both
-- vintages). Added #242 (I18, geo-hierarchy pages) so PGR profile pages can
-- render a choropleth polygon, same as BZR/PLR.
-- 5. stg_berlin_ortsteil  -- WFS Ortsteil geometry (BER / ortsteil, single
-- current vintage; area_vintage set to the literal 'current' since this
-- source has no pre2021/2021 split). Added #269 (I-ortsteile) so Ortsteil
-- profile pages can render a choropleth polygon, same as PGR/BZR/PLR.
-- 6. berlin_bezirk (DERIVED, not a new source) -- OA-D6 (#240, ADR-0024):
-- Bezirk (12 districts) has no WFS geometry source of its own. Per the
-- maintainer's OA-D0 confirmed scope knob #3 ("Geometry = reuse + dissolve
-- ... derived by ST_Union dissolve of child PLR polygons -- no new
-- source"), this CTE dissolves stg_berlin_lor's own PLR polygons, grouped
-- by their 2-digit Bezirk code prefix (substr(area_code, 1, 2), the same
-- LOR RAUMID nesting fact int_poi_offering_advantage_arealevel.sql/OA-D2
-- and dim_area_hierarchy.sql already rely on -- see those models' headers),
-- one dissolve per area_vintage (a PLR belongs to exactly one Bezirk within
-- a given vintage; the 2021 reform is Bezirk-stable across vintages per
-- test_dim_area_hierarchy_bezirk_vintage_stable.sql, but the dissolve is
-- still run per-vintage rather than assumed identical, so this model does
-- not silently depend on that separate test staying green). ST_Union is a
-- pure geometric aggregation (no new spatial statistic, no weighting, no
-- index/methodology decision) -- still non-methodology-bearing, same
-- framing as the rest of this model. area_name is NOT resolved for Bezirk
-- rows (NULL) -- no Bezirk-name seed/source exists anywhere in this
-- warehouse today (checked; only PLR/BZR/PGR/Ortsteil names come from
-- their own WFS sources) -- minting one is out of this ticket's narrow
-- "mart + geometry plumbing" scope.
--
-- Reprojection: native CRS per dim_city.native_crs_epsg (BER=EPSG:25833,
-- HH=EPSG:25832) -> EPSG:4326 (WGS84 lon/lat), matching the st_transform(...,
-- always_xy=true) convention already established in int_osm_poi_plr.sql /
-- int_osm_poi_hamburg.sql for the same native-CRS-to-WGS84 direction. The
-- Bezirk dissolve itself runs in the NATIVE CRS (before reprojection, same as
-- every other row here) -- ST_Union on already-metric EPSG:25833 geometry,
-- never on WGS84 degrees (spatial-methods.md §3 CRS discipline).
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

    berlin_pgr as (
        select
            lor.city_code,
            'pgr' as area_level,
            lor.area_code,
            lor.area_name,
            lor.area_vintage,
            lor.geometry_wkb,
            city.native_crs_epsg
        from {{ ref("stg_berlin_lor_pgr") }} as lor
        left join {{ ref("dim_city") }} as city on lor.city_code = city.city_code
        where lor.area_code is not null
    ),

    -- OA-D6 (#240): dissolved Bezirk geometry, one row per
    -- (city_code, area_vintage, bezirk_code) -- ST_Union of that vintage's
    -- child PLR polygons in their native (metric) CRS. See header for the
    -- full rationale.
    berlin_bezirk as (
        select
            lor.city_code,
            'bezirk' as area_level,
            substr(lor.area_code, 1, 2) as area_code,
            cast(null as varchar) as area_name,
            lor.area_vintage,
            st_aswkb(st_union_agg(st_geomfromwkb(lor.geometry_wkb))) as geometry_wkb,
            any_value(city.native_crs_epsg) as native_crs_epsg
        from {{ ref("stg_berlin_lor") }} as lor
        left join {{ ref("dim_city") }} as city on lor.city_code = city.city_code
        where lor.area_code is not null
        group by lor.city_code, lor.area_vintage, substr(lor.area_code, 1, 2)
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

    -- #269 (I-ortsteile): single current vintage, no pre2021/2021 split (see
    -- stg_berlin_ortsteil.sql header) -- 'current' literal keeps this CTE's
    -- column shape identical to its siblings above for the UNION ALL.
    berlin_ortsteil as (
        select
            ort.city_code,
            ort.area_level,
            ort.area_code,
            ort.area_name,
            cast('current' as varchar) as area_vintage,
            ort.geometry_wkb,
            city.native_crs_epsg
        from {{ ref("stg_berlin_ortsteil") }} as ort
        left join {{ ref("dim_city") }} as city on ort.city_code = city.city_code
        where ort.area_code is not null
    ),

    combined as (
        select *
        from berlin_plr
        union all
        select *
        from berlin_bzr
        union all
        select *
        from berlin_pgr
        union all
        select *
        from berlin_bezirk
        union all
        select *
        from hamburg
        union all
        select *
        from berlin_ortsteil
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
