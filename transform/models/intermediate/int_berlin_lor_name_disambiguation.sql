-- int_berlin_lor_name_disambiguation.sql
-- #352 -- tell apart Berlin LOR areas that share a name within one level and
-- one LOR vintage.
--
-- Berlin's LOR names repeat a lot across the two vintages (lor_pre2021 and
-- lor_2021 reuse most names under new codes), which is fine: a page only
-- shows one vintage at a time. Within one (level, vintage) only a handful
-- collide (2026-10-27: BZR 'Heerstraße' in 2021, PLR 'Schloßstraße' in both
-- vintages), and those two rows look identical in a table, a tooltip or a
-- search box. This model gives each colliding row the label
-- '<name> (<nearest ancestor name that differs>)', e.g.
-- 'Heerstraße (Charlottenburg West)' / 'Heerstraße (Wilhelmstadt / Staaken)'.
--
-- Ancestors follow the LOR RAUMID prefix nesting (PLR 8 -> BZR 6 -> PGR 4
-- digits; same fact dim_area_hierarchy.sql cites), looked up in the SAME
-- vintage. An ancestor whose name equals the area's own name is skipped (PLR
-- 06100102 'Schloßstraße' sits in BZR 'Schloßstraße'), and if no ancestor
-- differs the code is used instead. Only colliding rows are output; dim_area
-- (via int_area_display_name_override) and dim_area_geometry LEFT JOIN this
-- model and keep the source name otherwise.
--
-- NOT methodology-bearing: display label only, area_code stays the key.
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    lor as (
        select distinct
            city_code, 'plr' as area_level, area_vintage, area_code, area_name
        from {{ ref("stg_berlin_lor") }}
        where area_code is not null
        union all
        select distinct
            city_code, 'bzr' as area_level, area_vintage, area_code, area_name
        from {{ ref("stg_berlin_lor_bzr") }}
        where area_code is not null
        union all
        select distinct
            city_code, 'pgr' as area_level, area_vintage, area_code, area_name
        from {{ ref("stg_berlin_lor_pgr") }}
        where area_code is not null
    ),

    colliding as (
        select *
        from lor
        qualify
            count(distinct area_code) over (
                partition by city_code, area_level, area_vintage, area_name
            )
            > 1
    ),

    with_ancestors as (
        select
            c.city_code,
            c.area_level,
            c.area_vintage,
            c.area_code,
            c.area_name,
            bzr.area_name as bzr_name,
            pgr.area_name as pgr_name
        from colliding as c
        left join
            lor as bzr
            on c.area_level = 'plr'
            and bzr.area_level = 'bzr'
            and c.area_vintage = bzr.area_vintage
            and bzr.area_code = substr(c.area_code, 1, 6)
        left join
            lor as pgr
            on c.area_level in ('plr', 'bzr')
            and pgr.area_level = 'pgr'
            and c.area_vintage = pgr.area_vintage
            and pgr.area_code = substr(c.area_code, 1, 4)
    )

select
    city_code,
    area_level,
    area_vintage,
    area_code,
    area_name as source_area_name,
    area_name
    || ' ('
    || coalesce(
        case when bzr_name != area_name then bzr_name end,
        case when pgr_name != area_name then pgr_name end,
        area_code
    )
    || ')' as area_name
from with_ancestors
