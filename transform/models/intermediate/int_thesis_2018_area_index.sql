-- Intermediate: union of all three 2018 thesis golden staging models.
-- Normalises column names to the conformed schema used by the mart layer:
-- area_code, area_name, period_yyyymm, population, status_*/dynamik_*,
-- own_idx_*, city_code, area_level, variant.
-- variant discriminator: 'standard' (bzr + plr) vs 'distance_weighted' (plr_distcalc).
-- This intermediate model is the single source of truth for the 2018 thesis index
-- within the Gentriduck warehouse. It is superseded by the fully re-computed index
-- once Epic B3/C ingestion lands; until then it serves as the directional baseline.
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

-- BZR level — standard variant
select
    city_code,
    area_level,
    raum_id as area_code,
    raum_desc as area_name,
    cast(zeit as varchar) as period_yyyymm,
    ew as population,
    status_index,
    status_klasse_prj as status_class,
    status_klasse_prj_bi as status_class_bi,
    dynamik_index,
    dynamik_klasse_prj as dynamik_class,
    dynamik_klasse_prj_bi as dynamik_class_bi,
    own_idx_class,
    own_idx_class_bi,
    'standard' as variant
from {{ ref("stg_thesis_2018_result_bzr") }}

union all

-- PLR level — standard variant
select
    city_code,
    area_level,
    raum_id as area_code,
    raum_desc as area_name,
    cast(zeit as varchar) as period_yyyymm,
    ew as population,
    status_index,
    status_klasse_prj as status_class,
    status_klasse_prj_bi as status_class_bi,
    dynamik_index,
    dynamik_klasse_prj as dynamik_class,
    dynamik_klasse_prj_bi as dynamik_class_bi,
    own_idx_class,
    own_idx_class_bi,
    'standard' as variant
from {{ ref("stg_thesis_2018_result_plr") }}

union all

-- PLR level — distance-weighted variant (Java UDF replacement; ref Epic B3/C)
select
    city_code,
    area_level,
    raum_id as area_code,
    raum_desc as area_name,
    cast(zeit as varchar) as period_yyyymm,
    ew as population,
    status_index,
    status_klasse_prj as status_class,
    status_klasse_prj_bi as status_class_bi,
    dynamik_index,
    dynamik_klasse_prj as dynamik_class,
    dynamik_klasse_prj_bi as dynamik_class_bi,
    own_idx_class,
    own_idx_class_bi,
    'distance_weighted' as variant
from {{ ref("stg_thesis_2018_result_plr_distcalc") }}
