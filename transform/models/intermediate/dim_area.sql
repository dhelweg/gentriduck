-- dim_area: conformed area dimension (ADR-0005 city-agnostic seam).
-- Distinct (city_code, area_level, area_code, area_name) from the 2018 thesis
-- index staging, joined with seed_dim_area_level for the human-readable level name.
--
-- NOTE — parent_area_code is intentionally omitted at this stage.
-- Populating parent_area_code requires the LOR geometry crosswalk
-- (stg_berlin_lor, which is currently a stub — Epic B2/C).
-- A dbt_utils.expression_is_true test below documents the omission and acts
-- as a reminder; it passes vacuously on the current data set because
-- the column is not present.
--
-- When stg_berlin_lor is populated, add:
-- lor.parent_area_code
-- in a join on (city_code, area_code, area_level).
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

select distinct
    idx.city_code, idx.area_level, idx.area_code, idx.area_name, lvl.level_name
from {{ ref("int_thesis_2018_area_index") }} as idx
left join {{ ref("seed_dim_area_level") }} as lvl on idx.area_level = lvl.level_code
