-- int_poi_offering_advantage_native.sql
-- #354/#355 phase A, prerequisite §2.1(2): Offering Advantage in which every
-- row is computed from point-in-polygon counts on the geometry of its own
-- area_vintage. All int_poi_offering_advantage rows (Berlin lor_pre2021
-- 2008-2020 and lor_2021 2021+, Hamburg 'current'; 'contemporaneous') plus the
-- Berlin LOR-2021 back-cast of 2019/2020 ('backcast'). Leaf-grain twin of
-- int_poi_development_native; a consumer selects ONE area_vintage per panel
-- (pre-registration docs/methodology/354-355-hypothesis-suite-preregistration.md
-- §2.1(2), §5.1, §5.8(5), §6.2).
--
-- Shape: int_poi_offering_advantage's columns and leaf grain (sparse: a
-- taxonomy leaf absent from an area-year has no row), plus `geometry_pairing`
-- ('contemporaneous' | 'backcast', see int_poi_development_native). For the
-- dense, zero-filled domain/category panel the suite consumes, use
-- int_poi_oa_native_panel.
--
-- One OA definition throughout: both sources run the shared
-- offering_advantage_lq() macro (R-C2: reference/system/71_oa.sql; ADR-0017
-- D1/D2/D4; spatial-methods.md §11) with the same `oa_min_poi_base_n` and
-- `poi_kernel_bandwidth_m` vars. No methodology change.
--
-- city_code is canonicalised here with canonical_city_code() (ADR-0005,
-- QA-4 #179): the gaussian rows of both sources inherit the legacy 'berlin'
-- value from int_osm_poi_plr_weighted, the standard rows already say 'BER'.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_offering_advantage') }}
-- depends_on: {{ ref('int_berlin_poi_offering_advantage_plr2021_backcast') }}
{{ config(materialized="view", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    contemporaneous_all as (
        select
            * exclude (city_code),
            {{ canonical_city_code("city_code") }} as city_code,
            'contemporaneous' as geometry_pairing
        from {{ ref("int_poi_offering_advantage") }}
    ),

    backcast_all as (
        select
            * exclude (city_code),
            {{ canonical_city_code("city_code") }} as city_code,
            'backcast' as geometry_pairing
        from {{ ref("int_berlin_poi_offering_advantage_plr2021_backcast") }}
    ),

    unioned as (
        select *
        from contemporaneous_all
        union all
        select *
        from backcast_all
    )

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
    type_stock_local,
    type_stock_city,
    category_stock_local,
    category_stock_city,
    domain_stock_local,
    domain_stock_city,
    all_domains_stock_local,
    all_domains_stock_city,
    oa_domain,
    oa_category,
    oa_type,
    oa_domain_min_base_flag,
    oa_category_min_base_flag,
    oa_type_min_base_flag,
    geometry_pairing
from unioned
