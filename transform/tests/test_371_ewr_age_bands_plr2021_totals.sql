-- test_371_ewr_age_bands_plr2021_totals.sql
-- #371 pre-registration §3.7 DE checks 4 and 6 (LOR 2021 half):
-- (a) the crosswalk keeps the city totals: per reference year and band, the
-- city sum in int_berlin_ewr_age_bands_plr2021 equals the city sum of the
-- staged matrices (2018, 2020: crosswalked with renormalised weights;
-- 2024, 2025: native), tolerance 1e-6 residents;
-- (b) 31.12.2022 is the midpoint of 2020 and 2024 for every band's city total
-- (linear interpolation, M3) and is the only year flagged is_interpolated;
-- (c) full grid: 542 LOR 2021 PLRs x 32 bands in every year;
-- (d) Sum(bands) = residents_total per PLR-year.
-- Returns one row per violation. Severity error.
{{ config(severity="error") }}

with
    out as (select * from {{ ref("int_berlin_ewr_age_bands_plr2021") }}),

    staged_city as (
        select reference_year, band_code, sum(residents) as city_residents
        from {{ ref("stg_berlin_ewr_age_bands") }}
        group by all
    ),

    expected_city as (
        select reference_year, band_code, city_residents
        from staged_city
        union all
        select
            2022 as reference_year,
            a.band_code,
            (a.city_residents + b.city_residents) / 2.0 as city_residents
        from staged_city as a
        inner join
            staged_city as b on a.band_code = b.band_code and b.reference_year = 2024
        where a.reference_year = 2020
    ),

    out_city as (
        select reference_year, band_code, sum(residents) as city_residents
        from out
        group by all
    ),

    totals_check as (
        select
            'city_total' as check_name,
            coalesce(e.reference_year, o.reference_year) as reference_year,
            coalesce(e.band_code, o.band_code) as detail,
            e.city_residents as expected,
            o.city_residents as actual
        from expected_city as e
        full outer join
            out_city as o
            on e.reference_year = o.reference_year
            and e.band_code = o.band_code
        where
            e.city_residents is null
            or o.city_residents is null
            or abs(e.city_residents - o.city_residents) > 1e-6
    ),

    grid_check as (
        select
            'grid' as check_name,
            reference_year,
            cast(count(distinct plr_id_2021) as varchar) as detail,
            542.0 * 32 as expected,
            cast(count(*) as double) as actual
        from out
        group by reference_year
        having count(*) != 542 * 32 or count(distinct plr_id_2021) != 542
    ),

    flag_check as (
        select
            'interpolation_flag' as check_name,
            reference_year,
            derivation as detail,
            cast(null as double) as expected,
            cast(null as double) as actual
        from out
        where is_interpolated != (reference_year = 2022)
    ),

    sum_check as (
        select
            'sum_bands' as check_name,
            reference_year,
            plr_id_2021 as detail,
            min(residents_total) as expected,
            sum(residents) as actual
        from out
        group by reference_year, plr_id_2021
        having abs(sum(residents) - min(residents_total)) > 1e-6
    )

select *
from totals_check
union all
select *
from grid_check
union all
select *
from flag_check
union all
select *
from sum_check
