-- int_poi_oa_native_panel.sql
-- #354/#355 phase A, prerequisites §2.1(2) and §2.1(6): the dense, ZERO-FILLED
-- domain- and category-level Offering Advantage panel the hypothesis suite
-- reads (pre-registration docs/methodology/354-355-hypothesis-suite-preregistration.md
-- §5.1 "OA zero-fill (binding)", §5.2 domain-level rows, §6.2).
--
-- =============================================================================
-- Why zero-fill (§2.1(6), §5.1; evidence
-- docs/epic-e/354-phase-a-data-prerequisites.md §6)
-- =============================================================================
-- int_poi_offering_advantage is SPARSE by design (its header: "a taxonomy leaf
-- with zero POIs in a given PLR-year produces no row"). Pivoting it with
-- MAX(oa_category) FILTER (WHERE poi_category_h = 'Fast Food') -- as
-- analysis/e1_regressions.py load_oa_category_panel does -- therefore yields
-- NULL, not 0, for every area without a fast-food outlet, and the NaN mask in
-- run_spearman then drops those areas. That is why E1's H1b OA row had
-- n = 341 of 436 PLRs: 341 PLRs had >= 1 fast-food POI in the 2018 snapshot,
-- 77 had gastronomy but no fast food (true OA = 0), 18 had no gastronomy at
-- all. The test conditioned on presence. §5.1: "An area with no POI of a
-- category has OA = 0, not a missing value. Areas are excluded only by the OA
-- minimum-base flag (ADR-0017)."
--
-- Rule implemented here, per level and per (city, vintage, weight variant,
-- methodology variant, snapshot year):
-- - Universe of areas: every area that has at least one POI in ANY snapshot
-- year of that slice. Areas with zero POIs in every year never appear
-- (they are the index-definition.md §7 rule-4 / D3-guard exclusion anyway).
-- - Universe of taxonomy entries: every domain (resp. (domain, category))
-- present city-wide in that year, i.e. whose city-wide reference base is
-- non-zero. A category absent from the whole city in a year has an
-- undefined LQ (0/0 city share) and gets no row that year.
-- - Present in the sparse source -> the source's oa value and flag, unchanged.
-- - Absent -> oa_value = 0 and is_zero_filled = true. When the parent base
-- of the area-year is > 0 this IS the location quotient
-- ((0 / D_a) / (c_city / D_city) = 0). When the parent base is 0 the ratio
-- is 0/0; the row still gets oa_value = 0 but its min-base flag is always
-- true (0 < oa_min_poi_base_n), so §5.1's "excluded only by the OA
-- minimum-base flag" removes it -- the flag, not presence, decides.
-- - oa_min_base_flag uses the D-3 rule of int_poi_offering_advantage (#274):
-- domain level: all_domains_stock_local < oa_min_poi_base_n;
-- category level: domain_stock_local < oa_min_poi_base_n (same var).
--
-- The suite must therefore (a) read oa_value from this model, never pivot
-- int_poi_offering_advantage with MAX(...) FILTER, and (b) drop rows with
-- oa_min_base_flag = true for the feature/area in question, and nothing else.
--
-- =============================================================================
-- Shape
-- =============================================================================
-- Grain: (city_code, area_vintage, weight_variant, methodology_variant,
-- snapshot_year, area_code, oa_level, poi_domain_h, poi_category_h), with
-- oa_level in ('domain', 'category') and poi_category_h NULL on domain rows.
-- level_stock_local / parent_stock_local are the LQ numerator's local stock
-- and its parent base (domain: X_a and Σ_d d_a; category: c_a and D_a),
-- level_stock_city / parent_stock_city the city-wide counterparts
-- (ADR-0017 D1; reference/system/71_oa.sql). Type level is not densified
-- (the pre-registered primaries use category and domain OA, §5.1/§5.2);
-- type-level rows stay available, sparse, in int_poi_offering_advantage_native.
--
-- Vintages: every native (city, vintage) slice of int_poi_offering_advantage_native
-- is densified separately (Berlin lor_pre2021 2008-2020, Berlin lor_2021
-- 2019-2026 incl. the 2019/2020 back-cast, Hamburg 'current'), so the
-- thesis-era and the modern panels both get the rule; the suite selects one
-- area_vintage per panel (§5.8(5)).
--
-- No published output changes: new table over new views.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_offering_advantage_native') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

{% set min_base = var("oa_min_poi_base_n", 10) %}

with
    oa as (select * from {{ ref("int_poi_offering_advantage_native") }}),

    -- Domain-level figures are constant across a domain's leaves (window
    -- partitions in offering_advantage_lq); MAX collapses the leaves.
    domain_obs as (
        select
            city_code,
            area_vintage,
            weight_variant,
            methodology_variant,
            snapshot_year,
            area_code,
            poi_domain_h,
            max(domain_stock_local) as domain_stock_local,
            max(all_domains_stock_local) as all_domains_stock_local,
            max(domain_stock_city) as domain_stock_city,
            max(all_domains_stock_city) as all_domains_stock_city,
            max(oa_domain) as oa_domain,
            bool_or(oa_domain_min_base_flag) as oa_domain_min_base_flag
        from oa
        group by all
    ),

    category_obs as (
        select
            city_code,
            area_vintage,
            weight_variant,
            methodology_variant,
            snapshot_year,
            area_code,
            poi_domain_h,
            poi_category_h,
            max(category_stock_local) as category_stock_local,
            max(category_stock_city) as category_stock_city,
            max(oa_category) as oa_category,
            bool_or(oa_category_min_base_flag) as oa_category_min_base_flag
        from oa
        group by all
    ),

    slice_years as (
        select
            city_code,
            area_vintage,
            weight_variant,
            methodology_variant,
            snapshot_year,
            any_value(geometry_pairing) as geometry_pairing
        from oa
        group by all
    ),

    slice_areas as (
        select distinct
            city_code, area_vintage, weight_variant, methodology_variant, area_code
        from oa
    ),

    -- Local parent bases per area-year: the all-domains total (domain-level
    -- parent) and each domain's total (category-level parent). Absent = 0.
    area_year_totals as (
        select
            city_code,
            area_vintage,
            weight_variant,
            methodology_variant,
            snapshot_year,
            area_code,
            max(all_domains_stock_local) as all_domains_stock_local
        from domain_obs
        group by all
    ),

    domain_universe as (
        select
            city_code,
            area_vintage,
            weight_variant,
            methodology_variant,
            snapshot_year,
            poi_domain_h,
            max(domain_stock_city) as domain_stock_city,
            max(all_domains_stock_city) as all_domains_stock_city
        from domain_obs
        group by all
    ),

    category_universe as (
        select
            o.city_code,
            o.area_vintage,
            o.weight_variant,
            o.methodology_variant,
            o.snapshot_year,
            o.poi_domain_h,
            o.poi_category_h,
            max(o.category_stock_city) as category_stock_city,
            max(d.domain_stock_city) as domain_stock_city
        from category_obs as o
        inner join
            domain_universe as d
            on o.city_code = d.city_code
            and o.area_vintage = d.area_vintage
            and o.weight_variant = d.weight_variant
            and o.methodology_variant = d.methodology_variant
            and o.snapshot_year = d.snapshot_year
            and o.poi_domain_h = d.poi_domain_h
        group by all
    ),

    domain_dense as (
        select
            u.city_code,
            u.area_vintage,
            u.weight_variant,
            u.methodology_variant,
            u.snapshot_year,
            a.area_code,
            'domain' as oa_level,
            u.poi_domain_h,
            cast(null as varchar) as poi_category_h,
            coalesce(d.domain_stock_local, 0.0) as level_stock_local,
            coalesce(t.all_domains_stock_local, 0.0) as parent_stock_local,
            u.domain_stock_city as level_stock_city,
            u.all_domains_stock_city as parent_stock_city,
            -- Present: the source LQ unchanged. Absent: 0 (§5.1 zero-fill).
            case when d.area_code is null then 0.0 else d.oa_domain end as oa_value,
            d.area_code is null as is_zero_filled,
            coalesce(
                d.oa_domain_min_base_flag,
                coalesce(t.all_domains_stock_local, 0.0) < {{ min_base }}
            ) as oa_min_base_flag
        from domain_universe as u
        inner join
            slice_areas as a
            on u.city_code = a.city_code
            and u.area_vintage = a.area_vintage
            and u.weight_variant = a.weight_variant
            and u.methodology_variant = a.methodology_variant
        left join
            area_year_totals as t
            on u.city_code = t.city_code
            and u.area_vintage = t.area_vintage
            and u.weight_variant = t.weight_variant
            and u.methodology_variant = t.methodology_variant
            and u.snapshot_year = t.snapshot_year
            and a.area_code = t.area_code
        left join
            domain_obs as d
            on u.city_code = d.city_code
            and u.area_vintage = d.area_vintage
            and u.weight_variant = d.weight_variant
            and u.methodology_variant = d.methodology_variant
            and u.snapshot_year = d.snapshot_year
            and a.area_code = d.area_code
            and u.poi_domain_h = d.poi_domain_h
    ),

    category_dense as (
        select
            u.city_code,
            u.area_vintage,
            u.weight_variant,
            u.methodology_variant,
            u.snapshot_year,
            a.area_code,
            'category' as oa_level,
            u.poi_domain_h,
            u.poi_category_h,
            coalesce(c.category_stock_local, 0.0) as level_stock_local,
            coalesce(d.domain_stock_local, 0.0) as parent_stock_local,
            u.category_stock_city as level_stock_city,
            u.domain_stock_city as parent_stock_city,
            case when c.area_code is null then 0.0 else c.oa_category end as oa_value,
            c.area_code is null as is_zero_filled,
            coalesce(
                c.oa_category_min_base_flag,
                coalesce(d.domain_stock_local, 0.0) < {{ min_base }}
            ) as oa_min_base_flag
        from category_universe as u
        inner join
            slice_areas as a
            on u.city_code = a.city_code
            and u.area_vintage = a.area_vintage
            and u.weight_variant = a.weight_variant
            and u.methodology_variant = a.methodology_variant
        left join
            domain_obs as d
            on u.city_code = d.city_code
            and u.area_vintage = d.area_vintage
            and u.weight_variant = d.weight_variant
            and u.methodology_variant = d.methodology_variant
            and u.snapshot_year = d.snapshot_year
            and a.area_code = d.area_code
            and u.poi_domain_h = d.poi_domain_h
        left join
            category_obs as c
            on u.city_code = c.city_code
            and u.area_vintage = c.area_vintage
            and u.weight_variant = c.weight_variant
            and u.methodology_variant = c.methodology_variant
            and u.snapshot_year = c.snapshot_year
            and a.area_code = c.area_code
            and u.poi_domain_h = c.poi_domain_h
            and u.poi_category_h = c.poi_category_h
    ),

    dense as (
        select *
        from domain_dense
        union all
        select *
        from category_dense
    )

select
    dense.city_code,
    dense.area_vintage,
    dense.weight_variant,
    dense.methodology_variant,
    dense.snapshot_year,
    dense.area_code,
    dense.oa_level,
    dense.poi_domain_h,
    dense.poi_category_h,
    dense.level_stock_local,
    dense.parent_stock_local,
    dense.level_stock_city,
    dense.parent_stock_city,
    dense.oa_value,
    dense.is_zero_filled,
    dense.oa_min_base_flag,
    sy.geometry_pairing
from dense
inner join
    slice_years as sy
    on dense.city_code = sy.city_code
    and dense.area_vintage = sy.area_vintage
    and dense.weight_variant = sy.weight_variant
    and dense.methodology_variant = sy.methodology_variant
    and dense.snapshot_year = sy.snapshot_year
