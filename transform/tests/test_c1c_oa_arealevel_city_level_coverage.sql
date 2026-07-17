-- test_c1c_oa_arealevel_city_level_coverage.sql
-- OA-D8 (#240, ADR-0024): guards against a city's area_level roll-up
-- silently producing ZERO rows at one of its own expected levels -- which
-- would make the sibling C-1b mass-conservation test
-- (test_c1b_oa_arealevel_mass_conservation_invariance.sql) vacuously pass
-- with no evidence of anything (an empty GROUP BY produces no violating
-- rows, so a silently-dropped city/level combination would go undetected by
-- that test alone). This is the "seam actually works end-to-end" check the
-- OA-D8 ticket asks for, not a re-statement of C-1b's own mass-conservation
-- math.
--
-- Expected (city_code, area_level) pairs are derived GENERICALLY, not
-- hardcoded per city (ADR-0005): each city's own OA leaf level
-- (dim_city.oa_leaf_area_level, OA-D8 seed config) plus every
-- parent_area_level dim_area_hierarchy resolves an edge FOR THAT CITY
-- (dim_area_hierarchy.city_code is the child edge's own city, so filtering
-- by it already scopes to the levels reachable from that city's own leaf
-- chain -- for Berlin: bzr, pgr, bezirk; for Hamburg: subarea_l1, district
-- -- without this test needing to know either city's level names).
--
-- Scoped to cities that actually HAVE leaf-grain OA data (distinct city_code
-- in int_poi_offering_advantage) -- NOT every city_code seeded in dim_city.
-- This preserves the model's own documented graceful-degradation contract
-- ("returns zero rows when int_poi_offering_advantage has no rows", e.g. a
-- fresh checkout before any ingestion has run): a city with genuinely no
-- upstream data is expected to be entirely absent, not a bug; a city WITH
-- leaf data that fails to reach one of its own parent levels IS a bug.
--
-- Returns (city_code, area_level) pairs with ZERO rows in
-- int_poi_offering_advantage_arealevel where at least one row was expected;
-- zero rows returned = test passes.
with
    cities_with_leaf_data as (
        select distinct city_code from {{ ref("int_poi_offering_advantage") }}
    ),

    expected_leaf_levels as (
        select city.city_code, city.oa_leaf_area_level as area_level
        from {{ ref("dim_city") }} as city
        inner join
            cities_with_leaf_data on city.city_code = cities_with_leaf_data.city_code
    ),

    expected_parent_levels as (
        select distinct hier.city_code, hier.parent_area_level as area_level
        from {{ ref("dim_area_hierarchy") }} as hier
        inner join
            cities_with_leaf_data on hier.city_code = cities_with_leaf_data.city_code
    ),

    expected as (
        select *
        from expected_leaf_levels
        union
        select *
        from expected_parent_levels
    ),

    actual as (
        select distinct city_code, area_level
        from {{ ref("int_poi_offering_advantage_arealevel") }}
    )

select
    expected.city_code,
    expected.area_level,
    'no_rows_at_expected_city_level' as violation_type
from expected
left join
    actual
    on expected.city_code = actual.city_code
    and expected.area_level = actual.area_level
where actual.city_code is null
