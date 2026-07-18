-- test_dim_area_hierarchy_hh_l2_boundary_spotcheck.sql
-- OA-D1b (#240, ADR-0024 D4): locks in the OA-D1b spike's boundary spot-check
-- findings for the Hamburg subarea_l2 -> subarea_l1 ST_Within(centroid,
-- parent_geom) spatial crosswalk (dim_area_hierarchy.sql's hh_l2_to_l1 CTE) --
-- the ticket's explicit ask to "spot-check boundary-straddling areas."
--
-- Checks (verified against the live-ingested WFS geometries, 2026-07-17 --
-- see dim_area_hierarchy.sql's header for the full derivation):
-- 1. The 2 Gebiete whose centroid falls OUTSIDE every Stadtteil polygon
-- ('90001', '106001') resolve via the nearest-Stadtteil fallback to their
-- manually-verified nearest Stadtteil ('90001' -> Gut Moor '02703',
-- 15.9m away; '106001' -> Schnelsen '02307', 6.5km away, next-nearest
-- 600m+ further in both cases -- an unambiguous single nearest match, not
-- a close call).
-- 2. A small sample of the closest-to-boundary PRIMARY (ST_Within) matches
-- resolve to their manually-verified containing Stadtteil, not a
-- plausible-looking neighbour -- '88003' -> Harburg '02701' (centroid
-- strictly inside, 34m from Neuland's boundary, next candidate 314m
-- further); '28012' -> Lurup '02208' (36m from Bahrenfeld's boundary,
-- next candidate 1.1km further); '14005' -> Rothenburgsort '02114' (38.8m
-- from Veddel's boundary, next candidate 700m+ further).
--
-- This is a REGRESSION guard, not a re-derivation -- if Hamburg re-ingests
-- updated WFS geometry and one of these 5 known cases resolves differently,
-- that is a real signal worth investigating (a source boundary redraw, or a
-- crosswalk-method regression), not assumed to always fail loudly elsewhere.
--
-- Returns rows that VIOLATE an expected assignment. Zero rows = test passes.
-- Degrades gracefully: if a given area_code is entirely absent from the
-- crosswalk (e.g. Hamburg geo not yet ingested), it is silently skipped here
-- (the separate coverage test catches that case) rather than failing this
-- spot-check for an unrelated reason.
with
    expected(area_code, expected_parent_area_code) as (
        values
            ('90001', '02703'),  -- fallback: centroid outside every Stadtteil, nearest = Gut Moor
            ('106001', '02307'),  -- fallback: centroid outside every Stadtteil, nearest = Schnelsen
            ('88003', '02701'),  -- primary, 34m boundary margin: Harburg
            ('28012', '02208'),  -- primary, 36m boundary margin: Lurup
            ('14005', '02114')  -- primary, 38.8m boundary margin: Rothenburgsort
    ),

    actual as (
        select area_code, parent_area_code
        from {{ ref("dim_area_hierarchy") }}
        where city_code = 'HH' and area_level = 'subarea_l2'
    )

select
    expected.area_code,
    expected.expected_parent_area_code,
    actual.parent_area_code as actual_parent_area_code
from expected
inner join actual on expected.area_code = actual.area_code
where actual.parent_area_code != expected.expected_parent_area_code
