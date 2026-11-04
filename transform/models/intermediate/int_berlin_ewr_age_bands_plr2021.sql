-- int_berlin_ewr_age_bands_plr2021.sql
-- #371 (pre-registration docs/methodology/371-matched-comparison-preregistration.md
-- §3.7 DE checks 4 and 6; PM decision M3): EWR narrow age bands per PLR on the
-- LOR 2021 scheme, reference dates 31.12.2018, 2020, 2022 (interpolated), 2024
-- and 2025. Grain: (reference_year, plr_id_2021, band_code).
--
-- Used by the #371 matched panel to form Berlin's MSS S1 denominator
-- P(15 to < Regelaltersgrenze) and the all-recipients transfer construct T*
-- (pre-registration §3.7). This model only stages population COUNTS; it does
-- not apply the Regelaltersgrenze fraction or build T* (analysis phase).
--
-- Methodology (R-C2):
-- 1. lor_2021 vintages (2024, 2025): passed through (derivation
-- 'native_lor_2021').
-- 2. lor_pre2021 vintages (2018, 2020): apportioned to LOR 2021 PLRs with the
-- geo-signed crosswalk seed_lor_crosswalk_2006_to_2021
-- (docs/epic-c/C3-crosswalk-geo-signoff.md, PASS), the same seed
-- int_berlin_ewr_plr2021 uses. Its mapping_type reads 'areal_pop_weighted',
-- but per its note the weight is intersection_area / pre2021_plr_area, i.e.
-- purely AREAL: residents are spread uniformly over each old PLR's area,
-- including uninhabited parts (known limitation, quantified in
-- docs/epic-e/371-data-checks.md §4.4; not changed here).
-- count_2021 = sum(count_pre2021 * w) apportions the extensive counts.
-- The seed's weights per pre-2021 PLR sum to 0.9993-1.0000 (slivers of old
-- polygons outside every new PLR), which loses ~43 residents city-wide in
-- 2018. Pre-registration §3.7 check 4 requires the crosswalk to keep the city
-- totals, so the weights are RENORMALISED per pre-2021 PLR:
-- w' = w / sum_j(w_j). This is the volume-preserving (pycnophylactic)
-- property of areal interpolation (Tobler 1979, JASA 74(367); Goodchild &
-- Lam 1980, Geo-Processing 1): every pre-2021 PLR's residents are
-- allocated in full, so city totals (and every band's city total) are
-- preserved exactly. Effect vs the un-renormalised int_berlin_ewr_plr2021
-- residents_total: at most 0.07 % per PLR (test_371_ewr_age_bands_vs_ewr_plr2021).
-- 3. 31.12.2022 (no EWR release, #346): linear interpolation per PLR and band
-- between 31.12.2020 and 31.12.2024, i.e. the midpoint
-- r_2022 = (r_2020 + r_2024) / 2 (PM decision M3, pre-registration "PM
-- decisions" §M3). Flagged is_interpolated = true and derivation
-- 'linear_interpolation_2020_2024'. Being linear in the counts, it keeps
-- Sum(bands) = residents_total per PLR and the city total = mean of the
-- 2020 and 2024 city totals.
--
-- residents_total is the sum of the 32 bands of the same PLR-year, so
-- Sum(bands) = residents_total holds exactly by construction (and equals the
-- published E_E where the matrix is native; staging test).
--
-- Materialization: table, not view. As a view, DuckDB 1.5.3 raises an internal
-- error ("invalid unordered_map<K, T> key") when a filter on reference_year is
-- pushed through the window sum / union / unnest chain of the staging
-- view; the same class of view-chaining limitation int_berlin_ewr_plr2021
-- documents. Materialising resolves it at build time.
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    bands as (select * from {{ ref("stg_berlin_ewr_age_bands") }}),

    crosswalk_raw as (
        select plr_id_pre2021, plr_id_2021, weight
        from {{ ref("seed_lor_crosswalk_2006_to_2021") }}
        where mapping_type != 'stub'
    ),

    -- Renormalise per pre-2021 PLR so each old PLR is allocated in full.
    crosswalk as (
        select
            plr_id_pre2021,
            plr_id_2021,
            weight / sum(weight) over (partition by plr_id_pre2021) as weight_norm
        from crosswalk_raw
    ),

    native as (
        select
            city_code,
            area_code as plr_id_2021,
            reference_year,
            reference_date,
            band_code,
            age_from,
            age_to,
            cast(residents as double) as residents,
            is_blank_row,
            'native_lor_2021' as derivation
        from bands
        where area_vintage = 'lor_2021'
    ),

    crosswalked as (
        select
            b.city_code,
            cw.plr_id_2021,
            b.reference_year,
            b.reference_date,
            b.band_code,
            b.age_from,
            b.age_to,
            sum(b.residents * cw.weight_norm) as residents,
            bool_or(b.is_blank_row) as is_blank_row,
            'crosswalk_areal_pop_weighted_renormalised' as derivation
        from bands as b
        inner join crosswalk as cw on b.area_code = cw.plr_id_pre2021
        where b.area_vintage = 'lor_pre2021'
        group by all
    ),

    observed as (
        select *
        from native
        union all
        select *
        from crosswalked
    ),

    -- M3: 31.12.2022 = midpoint of 31.12.2020 and 31.12.2024, per PLR and band.
    interpolated_2022 as (
        select
            a.city_code,
            a.plr_id_2021,
            2022 as reference_year,
            make_date(2022, 12, 31) as reference_date,
            a.band_code,
            a.age_from,
            a.age_to,
            (a.residents + b.residents) / 2.0 as residents,
            a.is_blank_row or b.is_blank_row as is_blank_row,
            'linear_interpolation_2020_2024' as derivation
        from observed as a
        inner join
            observed as b
            on a.plr_id_2021 = b.plr_id_2021
            and a.band_code = b.band_code
            and b.reference_year = 2024
        where a.reference_year = 2020
    ),

    unioned as (
        select *
        from observed
        union all
        select *
        from interpolated_2022
    )

select
    city_code,
    plr_id_2021,
    'lor_2021' as area_vintage,
    reference_year,
    reference_date,
    band_code,
    age_from,
    age_to,
    residents,
    sum(residents) over (partition by reference_year, plr_id_2021) as residents_total,
    derivation = 'linear_interpolation_2020_2024' as is_interpolated,
    derivation,
    is_blank_row
from unioned
