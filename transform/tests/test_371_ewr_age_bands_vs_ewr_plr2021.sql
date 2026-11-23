-- test_371_ewr_age_bands_vs_ewr_plr2021.sql
-- #371: the PLR totals of int_berlin_ewr_age_bands_plr2021 agree with the
-- residents_total of int_berlin_ewr_plr2021 (the population weights of
-- pre-registration §3.4). Native years (2024, 2025) must agree exactly; the
-- crosswalked years (2018, 2020) differ only by the per-old-PLR weight
-- renormalisation (seed weights sum to 0.9993-1.0000), so within 0.1 %.
-- The blank Landweg row (2024 publisher code 06200318 -> 06200418) is compared
-- as 0 residents.
-- Severity warn: a drift here is a consistency signal for the analysis, not a
-- data error in either model.
{{ config(severity="warn") }}

with
    bands as (
        select reference_year, plr_id_2021, min(residents_total) as total_bands
        from {{ ref("int_berlin_ewr_age_bands_plr2021") }}
        where reference_year in (2018, 2020, 2024, 2025)
        group by all
    ),

    ewr as (
        select
            reference_year,
            case
                when reference_year = 2024 and plr_id_2021 = '06200318'
                then '06200418'
                else plr_id_2021
            end as plr_id_2021,
            coalesce(indicator_value, 0) as total_ewr
        from {{ ref("int_berlin_ewr_plr2021") }}
        where
            indicator = 'residents_total' and reference_year in (2018, 2020, 2024, 2025)
    )

select
    b.reference_year,
    b.plr_id_2021,
    b.total_bands,
    e.total_ewr,
    abs(b.total_bands - e.total_ewr)
    / nullif(greatest(b.total_bands, e.total_ewr), 0) as rel_diff
from bands as b
full outer join
    ewr as e on b.reference_year = e.reference_year and b.plr_id_2021 = e.plr_id_2021
where
    b.total_bands is null
    or e.total_ewr is null
    or (b.reference_year in (2024, 2025) and abs(b.total_bands - e.total_ewr) > 1e-6)
    or (
        b.reference_year in (2018, 2020)
        and abs(b.total_bands - e.total_ewr)
        > 0.001 * greatest(b.total_bands, e.total_ewr)
    )
