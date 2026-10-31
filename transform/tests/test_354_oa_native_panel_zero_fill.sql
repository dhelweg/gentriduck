-- test_354_oa_native_panel_zero_fill.sql
-- #354/#355 phase A, prerequisite §2.1(6): the pre-registered OA zero-fill
-- rule (pre-registration §5.1, "An area with no POI of a category has OA = 0,
-- not a missing value. Areas are excluded only by the OA minimum-base flag")
-- holds in int_poi_oa_native_panel.
--
-- Checks (one failing row each):
-- 1 dense: for every (city, vintage, weight variant, methodology variant,
-- year, level), rows = areas in the slice x taxonomy entries present
-- city-wide that year -- no area is missing a category it lacks;
-- 2 present rows: the panel's oa_value and flag equal the sparse source
-- (int_poi_offering_advantage_native) exactly, i.e. zero-filling did not
-- touch observed values;
-- 3 filled rows: oa_value = 0 and level_stock_local = 0;
-- 4 filled rows with an empty parent base (0/0 LQ) carry
-- oa_min_base_flag = true, so the flag -- not presence -- excludes them.
-- Severity error.
{{ config(severity="error") }}

with
    panel as (select * from {{ ref("int_poi_oa_native_panel") }}),

    slice_areas as (
        select
            city_code,
            area_vintage,
            weight_variant,
            methodology_variant,
            count(distinct area_code) as n_areas
        from panel
        group by all
    ),

    slice_entries as (
        select
            city_code,
            area_vintage,
            weight_variant,
            methodology_variant,
            snapshot_year,
            oa_level,
            count(
                distinct poi_domain_h || '|' || coalesce(poi_category_h, '')
            ) as n_entries,
            count(*) as n_rows
        from panel
        group by all
    ),

    check_dense as (
        select
            '1_dense' as check_name,
            e.city_code,
            e.snapshot_year,
            e.oa_level,
            cast(null as varchar) as area_code,
            cast(null as varchar) as entry,
            e.n_rows * 1.0 as observed,
            (e.n_entries * a.n_areas) * 1.0 as expected
        from slice_entries as e
        inner join
            slice_areas as a
            on e.city_code = a.city_code
            and e.area_vintage = a.area_vintage
            and e.weight_variant = a.weight_variant
            and e.methodology_variant = a.methodology_variant
        where e.n_rows != e.n_entries * a.n_areas
    ),

    source_domain as (
        select
            city_code,
            area_vintage,
            weight_variant,
            methodology_variant,
            snapshot_year,
            area_code,
            poi_domain_h,
            max(oa_domain) as oa,
            bool_or(oa_domain_min_base_flag) as flag
        from {{ ref("int_poi_offering_advantage_native") }}
        group by all
    ),

    source_category as (
        select
            city_code,
            area_vintage,
            weight_variant,
            methodology_variant,
            snapshot_year,
            area_code,
            poi_domain_h,
            poi_category_h,
            max(oa_category) as oa,
            bool_or(oa_category_min_base_flag) as flag
        from {{ ref("int_poi_offering_advantage_native") }}
        group by all
    ),

    check_present as (
        select
            '2_present_equals_source' as check_name,
            p.city_code,
            p.snapshot_year,
            p.oa_level,
            p.area_code,
            p.poi_domain_h || coalesce(' > ' || p.poi_category_h, '') as entry,
            p.oa_value as observed,
            coalesce(sd.oa, sc.oa) as expected
        from panel as p
        left join
            source_domain as sd
            on p.oa_level = 'domain'
            and p.city_code = sd.city_code
            and p.area_vintage = sd.area_vintage
            and p.weight_variant = sd.weight_variant
            and p.methodology_variant = sd.methodology_variant
            and p.snapshot_year = sd.snapshot_year
            and p.area_code = sd.area_code
            and p.poi_domain_h = sd.poi_domain_h
        left join
            source_category as sc
            on p.oa_level = 'category'
            and p.city_code = sc.city_code
            and p.area_vintage = sc.area_vintage
            and p.weight_variant = sc.weight_variant
            and p.methodology_variant = sc.methodology_variant
            and p.snapshot_year = sc.snapshot_year
            and p.area_code = sc.area_code
            and p.poi_domain_h = sc.poi_domain_h
            and p.poi_category_h = sc.poi_category_h
        where
            not p.is_zero_filled
            and (
                coalesce(sd.oa, sc.oa) is null
                or p.oa_value is distinct from coalesce(sd.oa, sc.oa)
                or p.oa_min_base_flag is distinct from coalesce(sd.flag, sc.flag)
            )
    ),

    check_filled as (
        select
            case
                when oa_value != 0 or level_stock_local != 0
                then '3_filled_not_zero'
                else '4_empty_parent_not_flagged'
            end as check_name,
            city_code,
            snapshot_year,
            oa_level,
            area_code,
            poi_domain_h || coalesce(' > ' || poi_category_h, '') as entry,
            oa_value as observed,
            0.0 as expected
        from panel
        where
            is_zero_filled
            and (
                oa_value != 0
                or level_stock_local != 0
                or (parent_stock_local = 0 and not oa_min_base_flag)
            )
    )

select *
from check_dense
union all
select *
from check_present
union all
select *
from check_filled
