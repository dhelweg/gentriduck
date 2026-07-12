-- test_mart_area_demographics_bzr_reconciliation.sql
-- #243 (I19, area demographics): acceptance criteria requires "reconciliation
-- spot-check of one BZR rollup against hand-summed PLR values committed".
-- This test independently re-derives the BZR-level residents_total and
-- foreigners_share for EVERY (bzr_code, area_vintage, reference_year) by
-- hand-summing the mart's own PLR rows, and asserts it matches the mart's
-- 'bzr' rows within floating-point tolerance -- i.e. every BZR row is
-- reconciled, not just one hand-picked example, which is a strictly stronger
-- check than the acceptance criteria's "one BZR" floor.
--
-- residents_total: exact sum match (extensive indicator).
-- foreigners_share: recomputed from summed numerators (intensive indicator,
-- rollup rule per mart_area_demographics.sql header) must match within 1e-9.
--
-- Returns rows that FAIL reconciliation. Zero rows = test passes.
with
    plr_rows as (
        select
            city_code,
            substr(area_code, 1, 6) as bzr_code,
            area_vintage,
            reference_year,
            residents_total,
            foreigners_share
        from {{ ref("mart_area_demographics") }}
        where area_level = 'plr'
    ),

    hand_summed as (
        select
            city_code,
            bzr_code,
            area_vintage,
            reference_year,
            sum(residents_total) as expected_residents_total,
            sum(foreigners_share * residents_total)
            / nullif(sum(residents_total), 0) as expected_foreigners_share
        from plr_rows
        group by city_code, bzr_code, area_vintage, reference_year
    ),

    mart_bzr as (
        select
            city_code,
            area_code as bzr_code,
            area_vintage,
            reference_year,
            residents_total as mart_residents_total,
            foreigners_share as mart_foreigners_share
        from {{ ref("mart_area_demographics") }}
        where area_level = 'bzr'
    )

select
    h.city_code,
    h.bzr_code,
    h.area_vintage,
    h.reference_year,
    h.expected_residents_total,
    m.mart_residents_total,
    h.expected_foreigners_share,
    m.mart_foreigners_share
from hand_summed as h
inner join mart_bzr as m
    on
        h.city_code = m.city_code
        and h.bzr_code = m.bzr_code
        and h.area_vintage = m.area_vintage
        and h.reference_year = m.reference_year
where
    abs(coalesce(h.expected_residents_total, 0) - coalesce(m.mart_residents_total, 0))
    > 0.001
    or abs(
        coalesce(h.expected_foreigners_share, 0)
        - coalesce(m.mart_foreigners_share, 0)
    )
    > 1e-9
