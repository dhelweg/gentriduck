-- int_hamburg_gebiet_osm_names.sql
-- #307 -- statistisches-Gebiet (subarea_l2) -> OSM place-name crosswalk.
--
-- Problem: ingest_hamburg_geo.py's statistische-Gebiete WFS layer has no
-- name property at the source (WFS_LAYERS["statgebiet"]["name_prop"] = None
-- -- see that script's header). Every other Hamburg area level (district,
-- subarea_l1) and Berlin's PLR carry a real area_name; Gebiet is the one
-- gap in the area-hierarchy ladder. This model derives a best-effort,
-- DISPLAY-ONLY name for each Gebiet from OSM `place=neighbourhood|suburb|
-- quarter` nodes (stg_hamburg_osm_places, #307 ingestion), consumed only by
-- dim_area_geometry.area_name for subarea_l2 rows and, through it, the web
-- layer (web/pages/hamburg/area/[code].md).
--
-- NOT methodology-bearing (label/name enrichment for display, same framing
-- CLAUDE.md gives dim_area_geometry itself): does not touch
-- gentrification_index, fct_gentrification_change,
-- fct_gentrification_trajectory, or any existing mart's grain. Not on the
-- R-C1 methodology-bearing model list. Documented here per CLAUDE.md's
-- grounding-rule *spirit* anyway (good practice, not a gate requirement).
--
-- METHOD (point-in-polygon containment, not overlap): OSM place=* features
-- for informal German neighbourhoods are overwhelmingly tagged on NODES
-- (single representative points), not closed way/relation polygons -- see
-- ingest_hamburg_osm_places.py's header for why polygon extraction was
-- deliberately out of scope. So the match is always "does this OSM place
-- POINT fall inside this Gebiet POLYGON" (ST_Within), never a
-- largest-overlap polygon-vs-polygon test (issue #307's "or largest-overlap
-- if the OSM place is itself a polygon" branch does not apply here, since
-- no OSM place polygons are extracted). Both layers are reprojected to the
-- SAME CRS before the spatial test: stg_hamburg_osm_places' lon/lat are
-- WGS-84 (EPSG:4326, OSM's native CRS); stg_hamburg_geo's geometry_wkb is
-- native EPSG:25832 -- the OSM point is transformed to EPSG:25832 (not the
-- Gebiet polygon to WGS-84) to stay in a metric CRS, matching the CRS
-- discipline int_osm_poi_hamburg.sql / dim_area_hierarchy.sql already use
-- for Hamburg spatial joins (spatial-methods.md Sec.3).
--
-- Tie-break: a Gebiet polygon can contain more than one OSM place point
-- (e.g. a neighbourhood name plus a smaller quarter name inside it). Rather
-- than pick arbitrarily, this model prefers, in order: (1) place_type
-- 'neighbourhood' over 'suburb' over 'quarter' (informal specificity
-- ordering -- 'neighbourhood' is OSM's closest semantic analogue to a
-- statistisches Gebiet's grain; 'suburb'/'quarter' skew coarser/finer
-- respectively), then (2) deterministic tie-break on osm_id for any
-- residual tie. This is a PLUMBING tie-break (arbitrary-but-deterministic,
-- same class as stg_hamburg_geo's own '73002'/'105001' WKB-length
-- tie-break), not a methodology decision about which name is "correct".
--
-- Coverage (expected, not a bug -- #307's own scope note): 943 official
-- Gebiete vs informal, patchy OSM neighbourhood/suburb/quarter tagging in
-- Hamburg means most Gebiete will have NO OSM place point inside them.
-- Unmatched Gebiete are simply absent from this crosswalk's output (no row)
-- -- the consuming model (dim_area_geometry) must LEFT JOIN and tolerate a
-- null osm_place_name, never treat absence as an error.
--
-- Grain: at most one row per (city_code='HH', area_code) -- area_code is
-- the statistisches-Gebiet natural key (subarea_l2 only; this model does
-- not touch district/subarea_l1, which already have real WFS names).
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    gebiete as (
        select distinct area_code, geometry_wkb
        from {{ ref("stg_hamburg_geo") }}
        where
            city_code = 'HH' and area_level = 'subarea_l2' and geometry_wkb is not null
    ),

    -- Transform OSM's WGS-84 lon/lat to the Gebiet layer's native metric CRS
    -- (EPSG:25832) so the point-in-polygon test runs in a metric, not
    -- degree, space -- same direction/convention as int_osm_poi_hamburg.sql.
    places as (
        select
            osm_id,
            place_type,
            place_name,
            st_transform(
                st_point(lon, lat), 'EPSG:4326', 'EPSG:25832', always_xy := true
            ) as geom_25832
        from {{ ref("stg_hamburg_osm_places") }}
        where city_code = 'HH'
    ),

    candidates as (
        select
            g.area_code,
            p.osm_id,
            p.place_type,
            p.place_name,
            case
                p.place_type
                when 'neighbourhood'
                then 1
                when 'suburb'
                then 2
                when 'quarter'
                then 3
                else 4
            end as place_type_rank
        from gebiete as g
        inner join
            places as p on st_within(p.geom_25832, st_geomfromwkb(g.geometry_wkb))
    ),

    ranked as (
        select
            area_code,
            osm_id,
            place_type,
            place_name,
            row_number() over (
                partition by area_code order by place_type_rank asc, osm_id asc
            ) as rn
        from candidates
    )

select
    cast('HH' as varchar) as city_code,
    area_code,
    place_name as osm_place_name,
    place_type as osm_place_type,
    osm_id as osm_place_osm_id
from ranked
where rn = 1
