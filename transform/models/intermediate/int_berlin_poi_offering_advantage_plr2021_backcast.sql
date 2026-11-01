-- int_berlin_poi_offering_advantage_plr2021_backcast.sql
-- #354/#355 phase A, prerequisite §2.1(2): Offering Advantage (OA) on LOR-2021
-- PLRs for the back-cast OSM snapshots (default 2019, 2020), in exactly the
-- shape of int_poi_offering_advantage (same columns, grain, weight_variant and
-- methodology_variant vocabulary).
--
-- Method: NOT re-implemented here. The 3-level nested location quotient, its
-- parent-relative city bases and the D-3 min-base flags come from the shared
-- offering_advantage_lq() macro -- the very SQL int_poi_offering_advantage
-- runs (R-C2 grounding in that model's header: reference/system/
-- 70_oa_helper.sql, 71_oa.sql; thesis pp. 55-56, 91; spatial-methods.md §11;
-- ADR-0017 D1/D2/D4; #274 min-base flag; ADR-0024 leaves the canonical
-- nested LQ unchanged). Same `oa_min_poi_base_n` var. Faithful Run 1 only
-- (methodology_variant = 'faithful', ADR-0017 D3/D4), both weight variants:
-- - 'standard': hard point-in-polygon counts from
-- int_berlin_poi_development_plr2021_backcast;
-- - 'gaussian_<b>m': kernel counts from
-- int_berlin_osm_poi_plr2021_backcast_weighted (same bandwidth var as
-- int_osm_poi_plr_weighted, so the label matches the 2021+ rows).
--
-- City-wide reference bases: every OA window partitions by (city_code,
-- snapshot_year, area_vintage, weight_variant). The back-cast slice is
-- (BER, 2019|2020, lor_2021, *), which int_poi_offering_advantage never
-- contains (it holds 2019/2020 only on lor_pre2021), so computing OA on this
-- slice alone gives exactly the values it would get inside a union. The city
-- base is the LOR-2021 extent (POIs inside a LOR-2021 polygon), the same
-- definition the 2021+ rows use.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_berlin_poi_development_plr2021_backcast') }}
-- depends_on: {{ ref('int_berlin_osm_poi_plr2021_backcast_weighted') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Hard point-in-polygon variant (mirrors int_poi_offering_advantage's
    -- standard_base, reading the back-cast fct-shaped counts).
    standard_base as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            poi_count * 1.0 as stock,
            'standard' as weight_variant
        from {{ ref("int_berlin_poi_development_plr2021_backcast") }}
    ),

    -- Kernel variant (mirrors int_poi_offering_advantage's weighted_base).
    weighted_base as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weighted_count as stock,
            weight_variant
        from {{ ref("int_berlin_osm_poi_plr2021_backcast_weighted") }}
    ),

    combined_base as (
        select *
        from standard_base
        union all
        select *
        from weighted_base
    ),

    {{ offering_advantage_lq("combined_base") }}
