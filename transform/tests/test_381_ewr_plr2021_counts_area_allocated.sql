-- test_381_ewr_plr2021_counts_area_allocated.sql
-- #381: the count indicators (seed_ewr_indicator_meta.unit = 'count', i.e.
-- residents_total) of the crosswalked rows are still the area-allocated
-- SUM(count_s * w_st) (C3-crosswalk-geo-signoff.md §3; Goodchild & Lam 1980).
-- The #381 fix changes only the intensive indicators. This re-derives the counts
-- independently from stg_berlin_ewr and the crosswalk seed (the pre-#381
-- formula) and compares every (reference_year, plr_id_2021, indicator) key both
-- ways: a missing or extra row, or a value off by more than 1e-6, fails.
-- (Verified once against the pre-#381 table at fix time: EXCEPT ALL both ways on
-- the count rows returned 0 rows, max |delta| 1.8e-12.) Severity error.
{{ config(severity="error") }}

with
    counts as (
        select indicator from {{ ref("seed_ewr_indicator_meta") }} where unit = 'count'
    ),

    expected as (
        select
            cw.plr_id_2021,
            ewr.reference_year,
            ewr.indicator,
            sum(ewr.indicator_value * cw.weight) as expected_value
        from {{ ref("stg_berlin_ewr") }} as ewr
        inner join counts as c on ewr.indicator = c.indicator
        inner join
            {{ ref("seed_lor_crosswalk_2006_to_2021") }} as cw
            on ewr.area_code = cw.plr_id_pre2021
            and cw.mapping_type != 'stub'
        where ewr.area_vintage = 'lor_pre2021'
        group by cw.plr_id_2021, ewr.reference_year, ewr.indicator
    ),

    actual as (
        select e.plr_id_2021, e.reference_year, e.indicator, e.indicator_value
        from {{ ref("int_berlin_ewr_plr2021") }} as e
        inner join counts as c on e.indicator = c.indicator
        where e.source_area_vintage = 'lor_pre2021'
    )

select
    coalesce(x.plr_id_2021, a.plr_id_2021) as plr_id_2021,
    coalesce(x.reference_year, a.reference_year) as reference_year,
    coalesce(x.indicator, a.indicator) as indicator,
    x.expected_value,
    a.indicator_value
from expected as x
full outer join
    actual as a
    on x.plr_id_2021 = a.plr_id_2021
    and x.reference_year = a.reference_year
    and x.indicator = a.indicator
where
    x.plr_id_2021 is null
    or a.plr_id_2021 is null
    or (x.expected_value is null) != (a.indicator_value is null)
    or abs(x.expected_value - a.indicator_value) > 1e-6
