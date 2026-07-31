-- test_mart_area_demographics_hh_district_reconciliation.sql
-- #313 (Hamburg area demographics widen): Hamburg analogue of
-- test_mart_area_demographics_bzr_reconciliation.sql's rollup reconciliation
-- guard, for the Stadtteil (subarea_l1) -> district rollup wired up via
-- dim_area_hierarchy's subarea_l1 -> district edge in mart_area_demographics'
-- hh_with_district CTE.
-- This test independently re-derives the district-level residents_total and
-- foreigners_share for EVERY (district_code, area_vintage, reference_year) by
-- hand-summing the mart's own subarea_l1 (Stadtteil) rows, and asserts it
-- matches the mart's 'district' rows within floating-point tolerance -- i.e.
-- every district row is reconciled, not just one hand-picked example.
--
-- residents_total: exact sum match (extensive indicator).
-- foreigners_share, unemployment_share: recomputed from summed numerators
-- (intensive indicators, rollup rule per mart_area_demographics.sql header)
-- must match within 1e-9. unemployment_share added #313 C-2 (geo-DS F3
-- non-blocking suggestion): pins the district rollup's exact behaviour on a
-- NULL-share Stadtteil (its residents stay in the denominator, its NULL
-- share drops out of the numerator -- same precedent as foreigners_share,
-- see F3) as a regression guard, alongside the C-2 denominator
-- documentation in schema.yml.
--
-- SCOPE NOTE (#313 C-1, docs/epic-h/313-hh-area-demographics-geo-signoff.md
-- F1 / 313-hh-area-demographics-domain-signoff.md D-1): this test's
-- hand_summed CTE joins through dim_area_hierarchy's subarea_l1 -> district
-- edge -- the SAME edge mart_area_demographics.sql's hh_with_district CTE
-- joins through. It therefore verifies ROLLUP ARITHMETIC (do the Stadtteile
-- that DO resolve to a district sum correctly?), not rollup COMPLETENESS
-- (does every Stadtteil resolve to a district at all?) -- a Stadtteil
-- missing from that edge is absent from both sides of this comparison and
-- cancels out, undetected. The completeness question is covered separately,
-- and independently of this join, by
-- test_mart_area_demographics_hh_district_completeness.sql.
--
-- Returns rows that FAIL reconciliation. Zero rows = test passes.
with
    subarea_l1_rows as (
        select
            city_code,
            area_code,
            area_vintage,
            reference_year,
            residents_total,
            foreigners_share,
            unemployment_share
        from {{ ref("mart_area_demographics") }}
        where area_level = 'subarea_l1'
    ),

    hand_summed as (
        select
            sl.city_code,
            dah.parent_area_code as district_code,
            sl.area_vintage,
            sl.reference_year,
            sum(sl.residents_total) as expected_residents_total,
            sum(sl.foreigners_share * sl.residents_total)
            / nullif(sum(sl.residents_total), 0) as expected_foreigners_share,
            sum(sl.unemployment_share * sl.residents_total)
            / nullif(sum(sl.residents_total), 0) as expected_unemployment_share
        from subarea_l1_rows as sl
        inner join
            {{ ref("dim_area_hierarchy") }} as dah
            on sl.city_code = dah.city_code
            and sl.area_code = dah.area_code
            and dah.area_level = 'subarea_l1'
            and dah.parent_area_level = 'district'
        group by sl.city_code, dah.parent_area_code, sl.area_vintage, sl.reference_year
    ),

    mart_district as (
        select
            city_code,
            area_code as district_code,
            area_vintage,
            reference_year,
            residents_total as mart_residents_total,
            foreigners_share as mart_foreigners_share,
            unemployment_share as mart_unemployment_share
        from {{ ref("mart_area_demographics") }}
        where area_level = 'district'
    )

select
    h.city_code,
    h.district_code,
    h.area_vintage,
    h.reference_year,
    h.expected_residents_total,
    m.mart_residents_total,
    h.expected_foreigners_share,
    m.mart_foreigners_share,
    h.expected_unemployment_share,
    m.mart_unemployment_share
from hand_summed as h
inner join
    mart_district as m
    on h.city_code = m.city_code
    and h.district_code = m.district_code
    and h.area_vintage = m.area_vintage
    and h.reference_year = m.reference_year
where
    abs(coalesce(h.expected_residents_total, 0) - coalesce(m.mart_residents_total, 0))
    > 0.001
    or abs(
        coalesce(h.expected_foreigners_share, 0) - coalesce(m.mart_foreigners_share, 0)
    )
    > 1e-9
    or abs(
        coalesce(h.expected_unemployment_share, 0)
        - coalesce(m.mart_unemployment_share, 0)
    )
    > 1e-9
