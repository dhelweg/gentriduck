-- test_mart_area_amenities_bzr_reconciliation.sql
-- #252 (I20 slice 1): same reconciliation discipline as I19's
-- test_mart_area_demographics_bzr_reconciliation.sql -- independently
-- re-derives the BZR-level infra counts and gastro/cuisine totals for EVERY
-- (bzr_code, area_vintage, snapshot_year) by hand-summing the mart's own PLR
-- rows, and asserts it matches the mart's 'bzr' rows exactly -- every BZR row
-- is reconciled, not just one hand-picked example.
--
-- All checked columns are extensive (SUM across constituent PLRs, per
-- mart_area_amenities.sql's ROLLUP RULE) so exact-match (not tolerance-band)
-- comparison is correct: n_schools, n_transit_stops (infra counts) and
-- gastro_poi_count / gastro_poi_with_cuisine_count (gastro totals feeding the
-- dominant-cuisine share).
--
-- Returns rows that FAIL reconciliation. Zero rows = test passes.
with
    plr_rows as (
        select
            city_code,
            substr(area_code, 1, 6) as bzr_code,
            area_vintage,
            snapshot_year,
            n_schools,
            n_transit_stops,
            gastro_poi_count,
            gastro_poi_with_cuisine_count
        from {{ ref("mart_area_amenities") }}
        where area_level = 'plr'
    ),

    hand_summed as (
        select
            city_code,
            bzr_code,
            area_vintage,
            snapshot_year,
            sum(n_schools) as expected_n_schools,
            sum(n_transit_stops) as expected_n_transit_stops,
            sum(gastro_poi_count) as expected_gastro_poi_count,
            sum(gastro_poi_with_cuisine_count) as expected_gastro_poi_with_cuisine_count
        from plr_rows
        group by city_code, bzr_code, area_vintage, snapshot_year
    ),

    mart_bzr as (
        select
            city_code,
            area_code as bzr_code,
            area_vintage,
            snapshot_year,
            n_schools as mart_n_schools,
            n_transit_stops as mart_n_transit_stops,
            gastro_poi_count as mart_gastro_poi_count,
            gastro_poi_with_cuisine_count as mart_gastro_poi_with_cuisine_count
        from {{ ref("mart_area_amenities") }}
        where area_level = 'bzr'
    )

select
    h.city_code,
    h.bzr_code,
    h.area_vintage,
    h.snapshot_year,
    h.expected_n_schools,
    m.mart_n_schools,
    h.expected_n_transit_stops,
    m.mart_n_transit_stops,
    h.expected_gastro_poi_count,
    m.mart_gastro_poi_count,
    h.expected_gastro_poi_with_cuisine_count,
    m.mart_gastro_poi_with_cuisine_count
from hand_summed as h
inner join
    mart_bzr as m
    on h.city_code = m.city_code
    and h.bzr_code = m.bzr_code
    and h.area_vintage = m.area_vintage
    and h.snapshot_year = m.snapshot_year
where
    coalesce(h.expected_n_schools, 0) != coalesce(m.mart_n_schools, 0)
    or coalesce(h.expected_n_transit_stops, 0) != coalesce(m.mart_n_transit_stops, 0)
    or coalesce(h.expected_gastro_poi_count, 0) != coalesce(m.mart_gastro_poi_count, 0)
    or coalesce(h.expected_gastro_poi_with_cuisine_count, 0)
    != coalesce(m.mart_gastro_poi_with_cuisine_count, 0)
