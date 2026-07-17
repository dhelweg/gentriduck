-- test_dim_area_hierarchy_hh_l2_coverage.sql
-- OA-D1b (#240, ADR-0024 D4): referential-integrity guard for the Hamburg
-- statistisches Gebiet (subarea_l2) -> Stadtteil (subarea_l1) spatial
-- crosswalk edge (dim_area_hierarchy.sql's hh_l2_to_l1 CTE) -- the ticket's
-- explicit acceptance criterion: "every Hamburg area with a level above the
-- finest should have a non-null parent_area_code that resolves to a real
-- parent row."
--
-- Every HH subarea_l2 dim_area row must have EXACTLY ONE resolved edge in
-- dim_area_hierarchy, and that edge's parent_area_code must resolve to a
-- real HH subarea_l1 dim_area row. Both directions matter: a LEFT join from
-- dim_area catches an unresolved Gebiet (a coverage gap in the crosswalk --
-- e.g. a new WFS feature with a geometry so degenerate ST_Centroid can't
-- place it in or near any Stadtteil), while the FK check on parent_area_code
-- catches a crosswalk edge pointing at a Stadtteil code that doesn't actually
-- exist in dim_area (a stale/mismatched join key).
--
-- Returns rows that VIOLATE coverage or referential integrity. Zero rows =
-- test passes. A wholly empty HH subarea_l2 dim_area (before Hamburg geo
-- ingestion) trivially passes -- there is nothing to check.
with
    hh_gebiete as (
        select city_code, area_code
        from {{ ref("dim_area") }}
        where city_code = 'HH' and area_level = 'subarea_l2'
    ),

    hh_stadtteile as (
        select area_code
        from {{ ref("dim_area") }}
        where city_code = 'HH' and area_level = 'subarea_l1'
    ),

    hierarchy_edges as (
        select city_code, area_code, parent_area_code
        from {{ ref("dim_area_hierarchy") }}
        where city_code = 'HH' and area_level = 'subarea_l2'
    ),

    -- Every Gebiet must have exactly one resolved edge.
    missing_or_duplicate_edge as (
        select g.city_code, g.area_code, count(e.area_code) as n_edges
        from hh_gebiete as g
        left join
            hierarchy_edges as e
            on g.city_code = e.city_code
            and g.area_code = e.area_code
        group by g.city_code, g.area_code
        having count(e.area_code) != 1
    ),

    -- Every resolved edge's parent must be a real Stadtteil dim_area row.
    edge_with_dangling_parent as (
        select e.city_code, e.area_code, e.parent_area_code
        from hierarchy_edges as e
        left join hh_stadtteile as s on e.parent_area_code = s.area_code
        where s.area_code is null
    )

select city_code, area_code, n_edges as detail, 'missing_or_duplicate_edge' as violation
from missing_or_duplicate_edge
union all
select
    city_code,
    area_code,
    cast(null as bigint) as detail,
    'dangling_parent: ' || parent_area_code as violation
from edge_with_dangling_parent
