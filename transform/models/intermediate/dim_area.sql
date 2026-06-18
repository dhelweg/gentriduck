-- dim_area: conformed area dimension (ADR-0005 city-agnostic seam).
-- Distinct (city_code, area_level, area_code, area_name) from the 2018 thesis
-- index staging, joined with seed_dim_area_level for the human-readable level name.
--
-- Sources (UNIONed):
-- 1. int_thesis_2018_area_index — 2018 thesis goldens (BER / bezirk / bzr / plr codes).
-- 2. stg_berlin_lor — WFS LOR geometry staging (BER / plr, both vintages).
-- Added in #52 (dim_area wiring). This is the source that makes OSM 8-digit
-- PLR area_codes visible to dimension tests and to the int_ewr_series join.
-- city_code is 'BER' (ADR-0005 canonical) from stg_berlin_lor.
--
-- NOTE — parent_area_code is intentionally omitted at this stage.
-- Populating parent_area_code requires the LOR geometry crosswalk
-- (stg_berlin_lor, which is currently a stub — Epic B2/C).
-- TODO(Epic C): when stg_berlin_lor is populated, add:
-- lor.parent_area_code
-- in a join on (city_code, area_code, area_level).
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    -- 2018 thesis golden areas (bezirk + bzr + plr from golden staging)
    thesis_areas as (
        select distinct idx.city_code, idx.area_level, idx.area_code, idx.area_name
        from {{ ref("int_thesis_2018_area_index") }} as idx
    ),

    -- WFS LOR PLR areas (both vintages, city_code='BER', issue #52)
    lor_areas as (
        select distinct city_code, 'plr' as area_level, area_code, area_name
        from {{ ref("stg_berlin_lor") }}
        where area_code is not null
    ),

    -- Combine both sources; DISTINCT deduplicate any overlap.
    combined as (
        select *
        from thesis_areas
        union
        select *
        from lor_areas
    )

select
    combined.city_code,
    combined.area_level,
    combined.area_code,
    combined.area_name,
    lvl.level_name
from combined
left join
    {{ ref("seed_dim_area_level") }} as lvl on combined.area_level = lvl.level_code
