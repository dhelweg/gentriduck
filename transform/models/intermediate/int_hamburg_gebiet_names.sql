-- int_hamburg_gebiet_names.sql
-- #352 -- display name for every Hamburg statistisches Gebiet (subarea_l2).
--
-- The LGV Gebiet WFS layer has no name property (see stg_hamburg_geo and
-- int_hamburg_gebiet_osm_names), so all 943 Gebiete reached dim_area with a
-- blank area_name and the Hamburg pages showed bare codes. This model gives
-- each one a readable, deterministic, unique label:
--
-- 1. '<Stadtteil> · <OSM place name>' where an OSM place=neighbourhood|
-- suburb|quarter node with its own name lies inside the Gebiet
-- (int_hamburg_gebiet_osm_names; Stadtteil-named nodes are already
-- filtered out there), e.g. 'St. Pauli · Karolinenviertel'.
-- 2. '<Stadtteil> · Gebiet <code>' otherwise, e.g.
-- 'Eimsbüttel · Gebiet 14005'.
--
-- The parent Stadtteil comes from dim_area_hierarchy's Gebiet -> Stadtteil
-- edge (OA-D1b, #240), the same edge the Gebiet pages' "Up:" link uses, so
-- the label and the link never disagree. The Stadtteil name is the WFS name
-- from stg_hamburg_geo. A Gebiet without a resolved parent (none today)
-- would get 'Gebiet <code>'.
--
-- Uniqueness: the code fallback is unique by construction. An OSM label
-- can repeat when two Gebiete in one Stadtteil each contain a node with the
-- same name (OSM has duplicate nodes, e.g. 'Oberbillwerder'); those get
-- ' (Gebiet <code>)' appended. Tested on dim_area_geometry
-- (test_area_display_name_unique.sql).
--
-- NOT methodology-bearing: a display label only. area_code stays the key
-- everywhere; no index, weight, or spatial method changes. The OSM name is
-- a best-effort label, not an official designation (the pages say so).
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    gebiete as (
        select distinct city_code, area_code
        from {{ ref("stg_hamburg_geo") }}
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code is not null
    ),

    stadtteil_names as (
        select distinct area_code, area_name
        from {{ ref("stg_hamburg_geo") }}
        where
            city_code = 'HH'
            and area_level = 'subarea_l1'
            and nullif(area_name, '') is not null
    ),

    parents as (
        select h.area_code, st.area_name as stadtteil_name
        from {{ ref("dim_area_hierarchy") }} as h
        inner join stadtteil_names as st on h.parent_area_code = st.area_code
        where
            h.city_code = 'HH'
            and h.area_level = 'subarea_l2'
            and h.parent_area_level = 'subarea_l1'
    ),

    labelled as (
        select
            g.city_code,
            g.area_code,
            p.stadtteil_name,
            osm.osm_place_name,
            case
                when p.stadtteil_name is null
                then 'Gebiet ' || g.area_code
                when osm.osm_place_name is not null
                then p.stadtteil_name || ' · ' || osm.osm_place_name
                else p.stadtteil_name || ' · Gebiet ' || g.area_code
            end as base_label,
            case
                when osm.osm_place_name is not null then 'osm' else 'code'
            end as area_name_source
        from gebiete as g
        left join parents as p on g.area_code = p.area_code
        left join
            {{ ref("int_hamburg_gebiet_osm_names") }} as osm
            on g.city_code = osm.city_code
            and g.area_code = osm.area_code
    )

select
    city_code,
    cast('subarea_l2' as varchar) as area_level,
    area_code,
    case
        when count(*) over (partition by base_label) > 1
        then base_label || ' (Gebiet ' || area_code || ')'
        else base_label
    end as area_name,
    area_name_source,
    stadtteil_name,
    osm_place_name
from labelled
