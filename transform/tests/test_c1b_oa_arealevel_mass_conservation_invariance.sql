-- test_c1b_oa_arealevel_mass_conservation_invariance.sql
-- OA-D2 (#240, ADR-0024) -- geo-DS sign-off Condition C6 (BLOCKING).
-- int_poi_offering_advantage_arealevel.sql prefix-sums PLR-grain stock up to
-- bzr/pgr/bezirk (C1) and MUST preserve the C-1 mass-conservation invariant
-- at every level: for a given (city, year, vintage, weight_variant, taxonomy
-- leaf), summing the LOCAL stock over every area at a given area_level must
-- equal that leaf's CITY-WIDE total -- and because area_level is a re-grain
-- of the SAME underlying stock (never a re-derivation, see model header C2),
-- the city-wide total itself must be IDENTICAL across all four area_level
-- values. The second assertion is what specifically catches a broadcast-
-- denominator error (e.g. a future edit that re-windows the city total over
-- the unioned multi-level rows instead of carrying it through unchanged --
-- exactly the I15-class bug at 4x scale the geo sign-off calls out).
--
-- Checked at the type-leaf grain (the finest taxonomy level -- domain/
-- category totals are strict roll-ups of type and so are implied, matching
-- the existing test_c1_oa_weighted_mass_conservation_invariance.sql's own
-- per-level design, extended here with the area_level dimension).
--
-- Same abs(diff) > 0.01 float tolerance as the sibling PLR-level C-1 test.
-- Returns rows that VIOLATE either assertion; zero rows = test passes.
with
    -- Assertion 1: per (city, year, vintage, weight_variant, taxonomy leaf,
    -- area_level), Σ local stock across all areas at that level == the
    -- level's own city-wide total column.
    local_sum_per_level as (
        select
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            methodology_variant,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            area_level,
            sum(type_stock_local) as summed_local_stock,
            max(type_stock_city) as type_stock_city
        from {{ ref("int_poi_offering_advantage_arealevel") }}
        group by
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            methodology_variant,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            area_level
    ),

    assertion_1_violations as (
        select
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            methodology_variant,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            area_level,
            summed_local_stock,
            type_stock_city,
            'local_sum_ne_city_total' as violation_type
        from local_sum_per_level
        where abs(summed_local_stock - type_stock_city) > 0.01
    ),

    -- Assertion 2: for a given (city, year, vintage, weight_variant, leaf),
    -- the CITY-WIDE total (type_stock_city) is identical across every
    -- area_level it appears at -- checked by comparing each level's city
    -- total to the MIN and MAX seen for that leaf; any spread > tolerance is
    -- a violation.
    city_total_spread as (
        select
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            methodology_variant,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            min(type_stock_city) as min_city_total,
            max(type_stock_city) as max_city_total
        from local_sum_per_level
        group by
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            methodology_variant,
            poi_domain_h,
            poi_category_h,
            poi_type_h
    ),

    assertion_2_violations as (
        select
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            methodology_variant,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            null as area_level,
            min_city_total as summed_local_stock,
            max_city_total as type_stock_city,
            'city_total_varies_across_levels' as violation_type
        from city_total_spread
        where abs(max_city_total - min_city_total) > 0.01
    )

select *
from assertion_1_violations
union all
select *
from assertion_2_violations
