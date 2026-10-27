-- dim_area: conformed area dimension (ADR-0005 city-agnostic seam).
-- One row per (city_code, area_level, area_code) with a display area_name and
-- the human-readable level_name.
--
-- The rows, codes and source names come from int_dim_area_base (this model's
-- body until #352; see its header for the sources and the dedup). On top of
-- that, #352 fills or disambiguates display names so no page has to show a
-- bare code or two identical labels:
-- - Hamburg statistisches Gebiet (subarea_l2): the source has no name, so
-- area_name comes from int_hamburg_gebiet_names ('<Stadtteil> · <OSM
-- name>' or '<Stadtteil> · Gebiet <code>').
-- - Berlin LOR (plr/bzr/pgr): the few names that repeat within one level
-- and vintage get their parent's name appended, from
-- int_berlin_lor_name_disambiguation. dim_area has no vintage column, so a
-- code takes its disambiguated label from whichever vintage it collides
-- in (the colliding codes are vintage-specific today; min() keeps it
-- deterministic if that ever changes).
-- Every other row keeps its source name. area_code stays the key; names are
-- display-only. Tested: area_name never null or blank (schema.yml).
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    berlin_disambiguated as (
        select city_code, area_level, area_code, min(area_name) as area_name
        from {{ ref("int_berlin_lor_name_disambiguation") }}
        group by city_code, area_level, area_code
    )

select
    base.city_code,
    base.area_level,
    base.area_code,
    coalesce(hh.area_name, ber.area_name, base.area_name) as area_name,
    base.level_name
from {{ ref("int_dim_area_base") }} as base
left join
    {{ ref("int_hamburg_gebiet_names") }} as hh
    on base.city_code = hh.city_code
    and base.area_level = hh.area_level
    and base.area_code = hh.area_code
left join
    berlin_disambiguated as ber
    on base.city_code = ber.city_code
    and base.area_level = ber.area_level
    and base.area_code = ber.area_code
