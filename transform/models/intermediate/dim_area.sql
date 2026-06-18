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
-- Deduplication strategy:
-- - Area codes that appear in both sources get one row per (city_code, area_level,
-- area_code). WFS names (UTF-8, stg_berlin_lor) are preferred over thesis goldens
-- (which sometimes have latin-1 mojibake). ROW_NUMBER() QUALIFY keeps the first
-- row when ordered by name (WFS rows sort before '?' placeholders alphabetically).
-- - stg_berlin_lor has two vintages (lor_pre2021, lor_2021) sharing some area_codes;
-- DISTINCT on the lor_areas CTE collapses these to one row per code.
--
-- NOTE — parent_area_code is intentionally omitted at this stage.
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

    -- WFS LOR PLR areas (both vintages collapsed, city_code='BER', issue #52).
    -- DISTINCT on (city_code, area_level, area_code, area_name) collapses any PLR
    -- codes that appear in both pre-2021 and 2021 vintages with the same name.
    lor_areas as (
        select distinct city_code, 'plr' as area_level, area_code, area_name
        from {{ ref("stg_berlin_lor") }}
        where area_code is not null
    ),

    -- Union all sources; keep all columns to allow dedup in next step.
    combined as (
        select *, 1 as source_priority
        from lor_areas
        union all
        select *, 2 as source_priority
        from thesis_areas
    ),

    -- Deduplicate: one row per (city_code, area_level, area_code).
    -- WFS rows (source_priority=1) are preferred over thesis golden rows
    -- (source_priority=2) so UTF-8 area_names win over latin-1 placeholders.
    deduped as (
        select city_code, area_level, area_code, area_name
        from combined
        qualify
            row_number() over (
                partition by city_code, area_level, area_code
                order by source_priority, area_name
            )
            = 1
    )

select
    deduped.city_code,
    deduped.area_level,
    deduped.area_code,
    deduped.area_name,
    lvl.level_name
from deduped
left join {{ ref("seed_dim_area_level") }} as lvl on deduped.area_level = lvl.level_code
