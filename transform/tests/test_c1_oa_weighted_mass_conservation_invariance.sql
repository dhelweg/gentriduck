-- test_c1_oa_weighted_mass_conservation_invariance.sql
-- ADR-0017 D5 condition C-1 (BLOCKING; spatial-methods.md §11.1, §11.3):
-- int_poi_offering_advantage's weighted variant ('gaussian_%') must reproduce the
-- SAME city-wide stock totals, at every taxonomy level (domain / category / type),
-- as the 'standard' hard-count variant. This holds by construction once
-- int_osm_poi_plr_weighted's mass-leakage guard is in place (every POI contributes
-- total weight exactly 1 across all PLRs it reaches -- kernel normalization for
-- matched POIs, weight-1 fallback for leaked POIs -- so a taxonomy leaf's city-wide
-- total is just "how many POIs of that leaf exist", independent of *which* PLR each
-- POI's weight ultimately lands in). A regression here (e.g. a future change that
-- re-introduces the leakage drop, or double-counts a leaked POI in both the
-- kernel-matched and fallback branches) would silently distort every downstream OA
-- ratio, so this is enforced as an error-severity singular test, not a warning.
--
-- Returns rows that violate the invariance beyond floating tolerance; zero rows =
-- test passes.
with
    -- One row per (city, year, vintage, taxonomy-leaf) city-wide total, per level,
    -- for the 'standard' (hard point-in-polygon) variant.
    standard_domain as (
        select distinct
            city_code, snapshot_year, area_vintage, poi_domain_h, domain_stock_city
        from {{ ref("int_poi_offering_advantage") }}
        where weight_variant = 'standard'
    ),
    weighted_domain as (
        select distinct
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            weight_variant,
            domain_stock_city
        from {{ ref("int_poi_offering_advantage") }}
        where weight_variant like 'gaussian_%'
    ),
    standard_category as (
        select distinct
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            category_stock_city
        from {{ ref("int_poi_offering_advantage") }}
        where weight_variant = 'standard'
    ),
    weighted_category as (
        select distinct
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            weight_variant,
            category_stock_city
        from {{ ref("int_poi_offering_advantage") }}
        where weight_variant like 'gaussian_%'
    ),
    standard_type as (
        select distinct
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            type_stock_city
        from {{ ref("int_poi_offering_advantage") }}
        where weight_variant = 'standard'
    ),
    weighted_type as (
        select distinct
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            type_stock_city
        from {{ ref("int_poi_offering_advantage") }}
        where weight_variant like 'gaussian_%'
    ),

    domain_mismatches as (
        select
            'domain' as oa_level,
            w.city_code,
            w.snapshot_year,
            w.area_vintage,
            w.weight_variant,
            w.poi_domain_h as level_value,
            s.domain_stock_city as standard_city_total,
            w.domain_stock_city as weighted_city_total
        from weighted_domain as w
        inner join
            standard_domain as s
            on w.city_code = s.city_code
            and w.snapshot_year = s.snapshot_year
            and w.area_vintage = s.area_vintage
            and w.poi_domain_h = s.poi_domain_h
        where abs(w.domain_stock_city - s.domain_stock_city) > 0.01
    ),

    category_mismatches as (
        select
            'category' as oa_level,
            w.city_code,
            w.snapshot_year,
            w.area_vintage,
            w.weight_variant,
            w.poi_domain_h || ' > ' || w.poi_category_h as level_value,
            s.category_stock_city as standard_city_total,
            w.category_stock_city as weighted_city_total
        from weighted_category as w
        inner join
            standard_category as s
            on w.city_code = s.city_code
            and w.snapshot_year = s.snapshot_year
            and w.area_vintage = s.area_vintage
            and w.poi_domain_h = s.poi_domain_h
            and w.poi_category_h = s.poi_category_h
        where abs(w.category_stock_city - s.category_stock_city) > 0.01
    ),

    type_mismatches as (
        select
            'type' as oa_level,
            w.city_code,
            w.snapshot_year,
            w.area_vintage,
            w.weight_variant,
            w.poi_domain_h
            || ' > '
            || w.poi_category_h
            || ' > '
            || w.poi_type_h as level_value,
            s.type_stock_city as standard_city_total,
            w.type_stock_city as weighted_city_total
        from weighted_type as w
        inner join
            standard_type as s
            on w.city_code = s.city_code
            and w.snapshot_year = s.snapshot_year
            and w.area_vintage = s.area_vintage
            and w.poi_domain_h = s.poi_domain_h
            and w.poi_category_h = s.poi_category_h
            and w.poi_type_h = s.poi_type_h
        where abs(w.type_stock_city - s.type_stock_city) > 0.01
    )

select *
from domain_mismatches
union all
select *
from category_mismatches
union all
select *
from type_mismatches
