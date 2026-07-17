-- mart_poi_oa_methods.sql
-- OA-D3 (#240, ADR-0024): long-format serving view over
-- int_poi_offering_advantage_methods's six wide method columns per taxonomy
-- level (ADR-0024 "methods = columns + a long serving view, not a new grain
-- discriminator" -- see #240 issue body / OA-D0 geo sign-off C7). Not itself
-- methodology-bearing beyond what int_poi_offering_advantage_methods already
-- computes -- this is a pure UNPIVOT/reshape for the site/analysis layer to
-- query "give me every method's value for this taxonomy leaf" without
-- hard-coding six column names.
--
-- Grain: one row per (city_code, snapshot_year, area_code, area_vintage,
-- poi_domain_h, poi_category_h, poi_type_h, weight_variant,
-- methodology_variant, taxonomy_level, oa_method). taxonomy_level in
-- ('domain', 'category', 'type') is a SEPARATE dimension from area_level
-- (OA-D2's spatial-scale roll-up, int_poi_offering_advantage_arealevel) --
-- this mart is PLR-grain only (area_level = 'plr' equivalent); wiring the
-- method columns through the area_level roll-up is out of this ticket's
-- scope (a D3/D2 cross-product follow-on, not requested by the #240 spine).
--
-- C7 (OA-D0 geo sign-off, BLOCKING, never-blend): oa_method is
-- accepted_values-tested against seed_oa_calculation_methods.csv; oa_value
-- is a single scalar per row -- no column here is a function of two or more
-- methods.
--
-- Graceful degradation: returns zero rows when
-- int_poi_offering_advantage_methods has no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_offering_advantage_methods') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    domain_methods as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            'domain' as taxonomy_level,
            oa_domain_nested_lq as nested_lq,
            oa_domain_global_lq as global_lq,
            oa_domain_log_lq as log_lq,
            oa_domain_share_diff as share_diff,
            oa_domain_shrunk_lq as shrunk_lq,
            oa_domain_raw_share as raw_share
        from {{ ref("int_poi_offering_advantage_methods") }}
    ),

    category_methods as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            'category' as taxonomy_level,
            oa_category_nested_lq as nested_lq,
            oa_category_global_lq as global_lq,
            oa_category_log_lq as log_lq,
            oa_category_share_diff as share_diff,
            oa_category_shrunk_lq as shrunk_lq,
            oa_category_raw_share as raw_share
        from {{ ref("int_poi_offering_advantage_methods") }}
    ),

    type_methods as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            'type' as taxonomy_level,
            oa_type_nested_lq as nested_lq,
            oa_type_global_lq as global_lq,
            oa_type_log_lq as log_lq,
            oa_type_share_diff as share_diff,
            oa_type_shrunk_lq as shrunk_lq,
            oa_type_raw_share as raw_share
        from {{ ref("int_poi_offering_advantage_methods") }}
    ),

    by_level as (
        select *
        from domain_methods
        union all
        select *
        from category_methods
        union all
        select *
        from type_methods
    )

    unpivot by_level
    on nested_lq,
    global_lq,
    log_lq,
    share_diff,
    shrunk_lq,
    raw_share
    into
    name oa_method
    value oa_value
