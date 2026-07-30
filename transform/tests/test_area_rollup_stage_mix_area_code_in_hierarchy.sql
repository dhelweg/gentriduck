-- test_area_rollup_stage_mix_area_code_in_hierarchy.sql
-- #310 review fix (gap flagged alongside MEDIUM-B/MEDIUM-C): a "relationships"-
-- style referential-integrity check tying every mart_area_rollup_stage_mix
-- (city_code, area_level, area_code) back to mart_area_hierarchy -- a plain
-- single-column dbt `relationships` test does not fit here because
-- mart_area_hierarchy records an edge's CHILD side as area_code/area_level and
-- its PARENT side as parent_area_code/parent_area_level: a top-of-ladder level
-- with no further parent above it (bezirk, district) only ever appears on the
-- PARENT side (see mart_area_rollup_stage_mix.sql's `all_rollup_areas` CTE,
-- which unions both sides for exactly this reason). This test re-derives that
-- same union independently rather than importing the model's own CTE, so a
-- bug in `all_rollup_areas` itself would not silently pass.
--
-- Returns mart rows whose (city_code, area_level, area_code) has NO match on
-- either side of mart_area_hierarchy. Zero rows = test passes.
with
    hierarchy_both_sides as (
        select city_code, area_level, area_code
        from {{ ref("mart_area_hierarchy") }}
        union
        select city_code, parent_area_level as area_level, parent_area_code as area_code
        from {{ ref("mart_area_hierarchy") }}
    )

select distinct m.city_code, m.area_level, m.area_code
from {{ ref("mart_area_rollup_stage_mix") }} as m
left join
    hierarchy_both_sides as h
    on m.city_code = h.city_code
    and m.area_level = h.area_level
    and m.area_code = h.area_code
where h.area_code is null
