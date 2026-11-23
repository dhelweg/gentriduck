-- test_381_ewr_plr2021_mean_age_plausible.sql
-- #381: mean_age_years of every populated PLR (residents_total > 0) lies in a
-- plausible band of 20-65 years. Observed (post-fix) PLR range is 29.1-63.4
-- over 2008-2025; the native 2024/2025 range is 31.6-57.3. Pre-#381 the
-- crosswalked values ranged 1.5-100.7 (Pankower Tor 2020: 7.5).
-- Returns one row per implausible (or missing) mean age. Severity error.
{{ config(severity="error") }}

with
    wide as (
        select
            reference_year,
            plr_id_2021,
            max(indicator_value) filter (
                where indicator = 'residents_total'
            ) as residents_total,
            max(indicator_value) filter (
                where indicator = 'mean_age_years'
            ) as mean_age_years
        from {{ ref("int_berlin_ewr_plr2021") }}
        group by reference_year, plr_id_2021
    )

select reference_year, plr_id_2021, residents_total, mean_age_years
from wide
where
    residents_total > 0
    and (mean_age_years is null or mean_age_years not between 20 and 65)
