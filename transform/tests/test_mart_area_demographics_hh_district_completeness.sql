-- test_mart_area_demographics_hh_district_completeness.sql
-- #313 C-1 (geo-DS/domain-expert R-C1 sign-off, docs/epic-h/313-hh-area-
-- demographics-geo-signoff.md F1 and 313-hh-area-demographics-domain-
-- signoff.md D-1): a COMPLETENESS guard the existing
-- test_mart_area_demographics_hh_district_reconciliation.sql cannot express,
-- because that test re-derives its "expected" district totals by joining
-- the mart's own subarea_l1 rows through dim_area_hierarchy's
-- subarea_l1 -> district edge -- the SAME join hh_with_district uses in
-- mart_area_demographics.sql. Any Stadtteil silently dropped by that join
-- (as the 4 merged EWR codes were, before the #313 C-1 fix) is absent from
-- both sides of that comparison and cancels out, so that test is
-- structurally blind to this failure mode. It caught 0 rows both before and
-- after the fix.
--
-- This test instead compares the mart's OWN subarea_l1-level total directly
-- against its OWN district-level total -- no dim_area_hierarchy join, no
-- re-derivation through hh_with_district -- so a Stadtteil that fails to
-- resolve to a district parent shows up as a residents_total gap here
-- regardless of WHY it failed to resolve (missing hierarchy edge, a future
-- regression in hh_with_district, or anything else in that join path).
--
-- Verified this would have failed pre-fix: with dim_area_hierarchy's
-- hh_l1_merged_to_district crosswalk (added for #313 C-1) temporarily
-- removed, this test returned 12 rows (one per reference_year, 2013-2024),
-- each with a residents_total gap matching the 4 dropped merged Stadtteile's
-- combined population for that year (e.g. 15,310 for 2024) -- confirming
-- the guard actually detects the regression the old reconciliation test
-- missed.
--
-- Returns rows that FAIL the completeness check. Zero rows = test passes.
with
    subarea_l1_totals as (
        select
            city_code,
            area_vintage,
            reference_year,
            sum(residents_total) as subarea_l1_residents_total
        from {{ ref("mart_area_demographics") }}
        where city_code = 'HH' and area_level = 'subarea_l1'
        group by city_code, area_vintage, reference_year
    ),

    district_totals as (
        select
            city_code,
            area_vintage,
            reference_year,
            sum(residents_total) as district_residents_total
        from {{ ref("mart_area_demographics") }}
        where city_code = 'HH' and area_level = 'district'
        group by city_code, area_vintage, reference_year
    )

select
    sl.city_code,
    sl.area_vintage,
    sl.reference_year,
    sl.subarea_l1_residents_total,
    d.district_residents_total,
    coalesce(sl.subarea_l1_residents_total, 0)
    - coalesce(d.district_residents_total, 0) as residents_total_gap
from subarea_l1_totals as sl
left join
    district_totals as d
    on sl.city_code = d.city_code
    and sl.area_vintage = d.area_vintage
    and sl.reference_year = d.reference_year
where
    abs(
        coalesce(sl.subarea_l1_residents_total, 0)
        - coalesce(d.district_residents_total, 0)
    )
    > 0.001
