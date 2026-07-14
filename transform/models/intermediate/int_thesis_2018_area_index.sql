-- Intermediate: union of all three 2018 thesis golden staging models.
-- Normalises column names to the conformed schema used by the mart layer:
-- area_code, area_name, period_yyyymm, population, status_*/dynamism_*,
-- own_idx_*, city_code, area_level, variant.
-- variant discriminator: 'standard' (bzr + plr) vs 'distance_weighted' (plr_distcalc).
-- This intermediate model is the single source of truth for the 2018 thesis index
-- within the Gentriduck warehouse. It is superseded by the fully re-computed index
-- once Epic B3/C ingestion lands; until then it serves as the directional baseline.
-- All German data values are translated to English by the staging models upstream.
--
-- area_name fix (#134 bug): the golden CSVs' raum_desc is latin-1-mojibake-corrupted
-- at the source file (literal '?' bytes replacing German umlauts/ß -- confirmed by
-- inspecting raw CSV bytes; not a DuckDB read_csv encoding bug). This model coalesces
-- to the correctly-encoded (UTF-8) WFS name from stg_berlin_lor (plr) /
-- stg_berlin_lor_bzr (bzr) wherever the golden's raum_id matches a WFS area_code
-- (100% match rate verified: 436/436 plr, 137/137 bzr), falling back to the
-- (possibly-corrupted) raum_desc only when no WFS row exists. This mirrors, at this
-- layer, the same WFS-preferred pattern dim_area.sql already uses -- can't join
-- dim_area itself here (dim_area's thesis_areas CTE sources this very model,
-- which would be circular).
-- raum_id join key: golden CSVs sometimes drop the leading zero (Bezirk 1-9), so
-- lpad to the WFS's zero-padded width (6 for bzr, 8 for plr) before joining.
-- Follow-up now tracked: #266 (see
-- docs/epic-c/tickets/QA-raumid.md).
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    -- One WFS area_name per area_code (both LOR vintages collapsed; deterministic
    -- pick when the name differs across vintages, mirroring dim_area.sql's
    -- ROW_NUMBER-by-name tie-break).
    lor_plr_names as (
        select area_code, area_name
        from {{ ref("stg_berlin_lor") }}
        qualify row_number() over (partition by area_code order by area_name) = 1
    ),
    lor_bzr_names as (
        select area_code, area_name
        from {{ ref("stg_berlin_lor_bzr") }}
        qualify row_number() over (partition by area_code order by area_name) = 1
    ),

    -- BZR level -- standard variant
    bzr_standard as (
        select
            bzr.city_code,
            bzr.area_level,
            bzr.raum_id as area_code,
            coalesce(wfs_names.area_name, bzr.raum_desc) as area_name,
            cast(bzr.zeit as varchar) as period_yyyymm,
            bzr.ew as population,
            bzr.status_index,
            bzr.status_class,
            bzr.status_class_bi,
            bzr.dynamism_index,
            bzr.dynamism_class,
            bzr.dynamism_class_bi,
            bzr.own_idx_class,
            bzr.own_idx_class_bi,
            'standard' as variant
        from {{ ref("stg_thesis_2018_result_bzr") }} as bzr
        left join
            lor_bzr_names as wfs_names
            on lpad(bzr.raum_id, 6, '0') = wfs_names.area_code
    ),

    -- PLR level -- standard variant
    plr_standard as (
        select
            plr.city_code,
            plr.area_level,
            plr.raum_id as area_code,
            coalesce(wfs_names.area_name, plr.raum_desc) as area_name,
            cast(plr.zeit as varchar) as period_yyyymm,
            plr.ew as population,
            plr.status_index,
            plr.status_class,
            plr.status_class_bi,
            plr.dynamism_index,
            plr.dynamism_class,
            plr.dynamism_class_bi,
            plr.own_idx_class,
            plr.own_idx_class_bi,
            'standard' as variant
        from {{ ref("stg_thesis_2018_result_plr") }} as plr
        left join
            lor_plr_names as wfs_names
            on lpad(plr.raum_id, 8, '0') = wfs_names.area_code
    ),

    -- PLR level -- distance-weighted variant (Java UDF replacement; ref Epic B3/C)
    plr_distcalc as (
        select
            plr.city_code,
            plr.area_level,
            plr.raum_id as area_code,
            coalesce(wfs_names.area_name, plr.raum_desc) as area_name,
            cast(plr.zeit as varchar) as period_yyyymm,
            plr.ew as population,
            plr.status_index,
            plr.status_class,
            plr.status_class_bi,
            plr.dynamism_index,
            plr.dynamism_class,
            plr.dynamism_class_bi,
            plr.own_idx_class,
            plr.own_idx_class_bi,
            'distance_weighted' as variant
        from {{ ref("stg_thesis_2018_result_plr_distcalc") }} as plr
        left join
            lor_plr_names as wfs_names
            on lpad(plr.raum_id, 8, '0') = wfs_names.area_code
    )

select *
from bzr_standard
union all
select *
from plr_standard
union all
select *
from plr_distcalc
