-- test_381_ewr_plr2021_bezirk_mean_age_vs_native.sql
-- #381: for every pre-2021 year, the population-weighted Bezirk mean age of the
-- crosswalked PLRs equals the native, uncrosswalked Bezirk mean age from
-- stg_berlin_ewr (lor_pre2021 codes; both schemes nest Bezirk = first 2 digits)
-- within 0.05 years. The Bezirk boundaries did not change in the 2021 LOR reform,
-- so only geometry slivers move residents across Bezirke (158 residents in 2020,
-- docs/epic-c/372-investigation.md §3.2); observed max |delta| is 0.0002 years in
-- 2020. Pre-#381 the gap was up to 12.4 years (Pankow 2020: 29.1 vs 41.5).
-- Both sides use the same rollup rule as mart_area_demographics (I19:
-- SUM(mean_age * residents) / SUM(residents)). Severity error.
{{ config(severity="error") }}

with
    native_plr as (
        select
            reference_year,
            substr(lpad(area_code, 8, '0'), 1, 2) as bezirk_code,
            max(indicator_value) filter (
                where indicator = 'residents_total'
            ) as residents_total,
            max(indicator_value) filter (
                where indicator = 'mean_age_years'
            ) as mean_age_years
        from {{ ref("stg_berlin_ewr") }}
        where area_vintage = 'lor_pre2021'
        group by reference_year, area_code
    ),

    crosswalked_plr as (
        select
            reference_year,
            substr(plr_id_2021, 1, 2) as bezirk_code,
            max(indicator_value) filter (
                where indicator = 'residents_total'
            ) as residents_total,
            max(indicator_value) filter (
                where indicator = 'mean_age_years'
            ) as mean_age_years
        from {{ ref("int_berlin_ewr_plr2021") }}
        where source_area_vintage = 'lor_pre2021'
        group by reference_year, plr_id_2021
    ),

    native as (
        select
            reference_year,
            bezirk_code,
            sum(mean_age_years * residents_total)
            / nullif(sum(residents_total), 0) as mean_age_native
        from native_plr
        group by reference_year, bezirk_code
    ),

    crosswalked as (
        select
            reference_year,
            bezirk_code,
            sum(mean_age_years * residents_total)
            / nullif(sum(residents_total), 0) as mean_age_crosswalked
        from crosswalked_plr
        group by reference_year, bezirk_code
    )

select
    coalesce(n.reference_year, x.reference_year) as reference_year,
    coalesce(n.bezirk_code, x.bezirk_code) as bezirk_code,
    n.mean_age_native,
    x.mean_age_crosswalked
from native as n
full outer join
    crosswalked as x
    on n.reference_year = x.reference_year
    and n.bezirk_code = x.bezirk_code
where
    n.mean_age_native is null
    or x.mean_age_crosswalked is null
    or abs(n.mean_age_native - x.mean_age_crosswalked) > 0.05
