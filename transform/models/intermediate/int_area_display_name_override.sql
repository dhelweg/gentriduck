-- int_area_display_name_override.sql
-- #352 -- one row per area whose display name differs from its source name,
-- unioned across cities, so dim_area applies every override with a single
-- join (ADR-0005: the shared dimension sees one city-agnostic seam, the
-- city-specific logic stays in the city-specific models below).
--
-- Inputs:
-- - int_hamburg_gebiet_names: every Hamburg statistisches Gebiet (the
-- source has no name): '<Stadtteil> · <OSM place name>' or
-- '<Stadtteil> · Gebiet <code>'.
-- - int_berlin_lor_name_disambiguation: the few Berlin LOR names that repeat
-- within one level and vintage, with the parent name appended. That model
-- is per vintage; dim_area has no vintage, so a code takes its label from
-- whichever vintage it collides in (the colliding codes are vintage-specific
-- today; min() keeps it deterministic if that ever changes).
-- A new city adds its own override model and one more UNION ALL branch here.
--
-- Stability: the OSM-derived Hamburg labels can change when the OSM places
-- extract is re-ingested (a node is added, renamed or moved). area_code is
-- the stable key; never join or link on area_name.
--
-- Materialized as a table (#352 review): int_hamburg_gebiet_names sits on
-- dim_area_hierarchy's spatial crosswalk and the OSM ST_Within match, so a
-- view here made every dim_area query re-run both spatial joins.
--
-- NOT methodology-bearing: display names only.
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

select city_code, area_level, area_code, area_name
from {{ ref("int_hamburg_gebiet_names") }}

union all

select city_code, area_level, area_code, min(area_name) as area_name
from {{ ref("int_berlin_lor_name_disambiguation") }}
group by city_code, area_level, area_code
