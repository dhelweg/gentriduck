-- dim_area: conformed area dimension (ADR-0005 city-agnostic seam).
-- One row per (city_code, area_level, area_code) with a display area_name and
-- the human-readable level_name.
--
-- Layering (#352):
-- int_dim_area_base -> dim_area_hierarchy -> int_hamburg_gebiet_names
-- -> int_area_display_name_override -> dim_area
-- The rows, codes and source names come from int_dim_area_base (this model's
-- body until #352; see its header for the sources and the dedup). On top of
-- that, int_area_display_name_override supplies display names where the
-- source has none or where it collides: every Hamburg statistisches Gebiet
-- ('<Stadtteil> · <OSM name>' or '<Stadtteil> · Gebiet <code>') and the few
-- Berlin LOR names repeated within one level and vintage (parent name
-- appended). Every other row keeps its source name.
--
-- area_code is the stable key; names are display-only, and the OSM-derived
-- Hamburg labels may change when the OSM places extract is re-ingested.
-- Tested: area_name never null or blank (schema.yml).
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

select
    base.city_code,
    base.area_level,
    base.area_code,
    coalesce(ovr.area_name, base.area_name) as area_name,
    base.level_name
from {{ ref("int_dim_area_base") }} as base
left join
    {{ ref("int_area_display_name_override") }} as ovr
    on base.city_code = ovr.city_code
    and base.area_level = ovr.area_level
    and base.area_code = ovr.area_code
