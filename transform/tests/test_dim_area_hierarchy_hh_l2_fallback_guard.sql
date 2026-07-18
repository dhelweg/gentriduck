-- test_dim_area_hierarchy_hh_l2_fallback_guard.sql
-- #282: distance-cap / count-guard for the Hamburg subarea_l2 (statistisches
-- Gebiet) -> subarea_l1 (Stadtteil) nearest-Stadtteil FALLBACK path in
-- dim_area_hierarchy.sql's hh_l2_fallback CTE (see that model's header for
-- the full method -- OA-D1b, #240, ADR-0024 D4).
--
-- WHY this test exists (distinct from the two tests #282 identified as
-- insufficient): test_dim_area_hierarchy_hh_l2_coverage.sql only checks
-- referential integrity (every Gebiet resolves to SOME real Stadtteil), and
-- test_dim_area_hierarchy_hh_l2_boundary_spotcheck.sql only regression-locks
-- the 2 *currently-known* fallback codes ('90001', '106001') to their
-- *specific* expected parents. Neither would catch a *new*, *different*
-- Gebiet silently falling back to a nearest-Stadtteil match with an
-- implausible distance (e.g. a future WFS re-ingestion with a bad
-- reprojection, a degenerate/self-intersecting polygon, or a coordinate-
-- system mixup) -- that row would pass coverage (it has *a* parent) and
-- would never be examined by the spot-check (it isn't one of the 5 hardcoded
-- codes). This test guards the fallback PATH itself, not specific codes.
--
-- No marker column exists on dim_area_hierarchy's output distinguishing
-- primary (ST_Within) from fallback (ST_Distance) matches -- adding one was
-- considered but rejected here as unnecessary surface area for a test-only
-- change: an edge is fallback if and only if the Gebiet centroid is NOT
-- ST_Within its assigned parent's polygon (that is precisely how
-- hh_l2_primary/hh_l2_fallback partition the Gebiete in the model), so this
-- test re-derives "is this edge a fallback match" directly from that
-- definition against the model's own output, rather than re-implementing
-- the nearest-Stadtteil ranking logic.
--
-- Thresholds (judgment call, not derived from a source document):
-- 1. COUNT: fallback_count <= 5. Currently exactly 2 Gebiete fall back
-- (see dim_area_hierarchy.sql header). 5 gives headroom for a small amount
-- of legitimate growth from a future WFS edition (a few more boundary/
-- digitization gaps between the independently-drawn Gebiet and Stadtteil
-- layers) without being so loose the guard is meaningless -- more than a
-- ~2.5x jump from the known-good baseline is worth a human look, not a
-- silent pass.
-- 2. DISTANCE: fallback_distance_m <= 20,000 (20km). The two known fallback
-- distances are 15.9m and 6.5km; Hamburg's administrative area is roughly
-- 30km x 25km, so 20km is comfortably above the current max (~3x) while
-- still well inside plausible city-scale noise -- a genuinely broken
-- geometry (wrong CRS, degenerate polygon, coordinate-system mixup) would
-- typically produce a distance far larger than the city's own extent
-- (hundreds of km to a wrong UTM zone, or a "different continent" scale
-- error), not a borderline city-scale value, so this bound stays tight
-- enough to catch that class of bug without false-alarming on normal
-- boundary noise.
--
-- WARN severity (configured in dbt_project.yml's data_tests block, matching
-- the test_c5_* / test_ortsteil_overlap_ortsteil_never_dominant precedent
-- for "expected-but-noteworthy, not a hard blocker" conditions): a small
-- amount of fallback growth might be a legitimate consequence of a WFS
-- edition change, not a build-breaking bug, but should surface for review
-- rather than pass silently.
--
-- Returns one row per violation (all current fallback edges if the COUNT
-- threshold is breached; the specific over-bound edge(s) if the DISTANCE
-- threshold is breached). Zero rows = test passes.
with
    hh_l2_geoms as (
        select distinct area_code, geometry_wkb
        from {{ ref("stg_hamburg_geo") }}
        where
            city_code = 'HH' and area_level = 'subarea_l2' and geometry_wkb is not null
    ),

    hh_l1_geoms as (
        select distinct area_code as stadtteil_code, geometry_wkb
        from {{ ref("stg_hamburg_geo") }}
        where
            city_code = 'HH' and area_level = 'subarea_l1' and geometry_wkb is not null
    ),

    hh_l2_centroids as (
        select area_code, st_centroid(st_geomfromwkb(geometry_wkb)) as centroid
        from hh_l2_geoms
    ),

    edges as (
        select area_code, parent_area_code as stadtteil_code
        from {{ ref("dim_area_hierarchy") }}
        where city_code = 'HH' and area_level = 'subarea_l2'
    ),

    -- An edge is a FALLBACK match iff the Gebiet centroid is NOT within its
    -- assigned Stadtteil polygon -- see header. Joins back to the source
    -- geometries (not a re-derivation of the nearest-Stadtteil ranking).
    fallback_edges as (
        select
            e.area_code,
            e.stadtteil_code,
            st_distance(
                c.centroid, st_geomfromwkb(l1.geometry_wkb)
            ) as fallback_distance_m
        from edges as e
        inner join hh_l2_centroids as c on e.area_code = c.area_code
        inner join hh_l1_geoms as l1 on e.stadtteil_code = l1.stadtteil_code
        where not st_within(c.centroid, st_geomfromwkb(l1.geometry_wkb))
    ),

    fallback_summary as (select count(*) as fallback_count from fallback_edges)

select
    area_code,
    stadtteil_code,
    fallback_distance_m,
    'fallback_distance_exceeds_20km_bound' as violation
from fallback_edges
where fallback_distance_m > 20000
union all
select
    area_code,
    stadtteil_code,
    fallback_distance_m,
    'fallback_count_exceeds_threshold_of_5_actual_' || cast(
        (select fallback_summary.fallback_count from fallback_summary) as varchar
    ) as violation
from fallback_edges
where (select fallback_summary.fallback_count from fallback_summary) > 5
