-- test_357_poi_map_zero_fill.sql
-- #357: mart_poi_offering_advantage_map emits a row for every leaf area x
-- snapshot year x POI domain of the 'standard' weight variant, zero-count
-- rows carry poi_count = 0 / density 0 / NULL OA, and the rows that existed
-- before the zero-fill are unchanged.
--
-- Checks (one failing row each):
-- 1 dense: per standard (city, vintage, year, methodology) slice, the number
-- of rows equals the leaf areas of that city-vintage (dim_area_geometry at
-- dim_city.oa_leaf_area_level) x the domains the city has in
-- mart_poi_offering_advantage. Built here from the sources, not from the
-- model's own scaffold.
-- 2 present rows unchanged: every not-zero-filled row equals a fresh
-- domain roll-up of mart_poi_offering_advantage (oa_domain, flag, poi_count,
-- area_km2, density), and every roll-up row is present (full outer join).
-- 3 zero-filled rows: poi_count = 0, poi_density_per_km2 = 0, oa_domain NULL,
-- weight_variant 'standard', and the key has no row in the roll-up.
-- 4 zero-filled flag: the area-year's own oa_domain_min_base_flag where the
-- area-year has any POI, else the flag at stock 0 (0 < oa_min_poi_base_n, true).
-- Severity error.
{{ config(severity="error") }}

with
    map as (select * from {{ ref("mart_poi_offering_advantage_map") }}),

    source_rollup as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            weight_variant,
            methodology_variant,
            poi_domain_h,
            any_value(oa_domain) as oa_domain,
            any_value(oa_domain_min_base_flag) as oa_domain_min_base_flag,
            sum(poi_count) as poi_count,
            any_value(area_km2) as area_km2,
            sum(poi_count) / nullif(any_value(area_km2), 0) as poi_density_per_km2
        from {{ ref("mart_poi_offering_advantage") }}
        group by
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            weight_variant,
            methodology_variant,
            poi_domain_h
    ),

    leaf_area_counts as (
        select geo.city_code, geo.area_vintage, count(distinct geo.area_code) as n_areas
        from {{ ref("dim_area_geometry") }} as geo
        inner join
            {{ ref("dim_city") }} as city
            on geo.city_code = city.city_code
            and geo.area_level = city.oa_leaf_area_level
        where geo.area_code is not null
        group by geo.city_code, geo.area_vintage
    ),

    domain_counts as (
        select city_code, count(distinct poi_domain_h) as n_domains
        from {{ ref("mart_poi_offering_advantage") }}
        where weight_variant = 'standard'
        group by city_code
    ),

    slice_rows as (
        select
            city_code,
            area_vintage,
            snapshot_year,
            methodology_variant,
            count(*) as n_rows
        from map
        where weight_variant = 'standard'
        group by city_code, area_vintage, snapshot_year, methodology_variant
    ),

    check_dense as (
        select
            '1_dense' as check_name,
            s.city_code,
            s.snapshot_year,
            cast(null as varchar) as area_code,
            cast(null as varchar) as poi_domain_h,
            s.n_rows * 1.0 as observed,
            coalesce(a.n_areas * d.n_domains, 0) * 1.0 as expected
        from slice_rows as s
        left join
            leaf_area_counts as a
            on s.city_code = a.city_code
            and s.area_vintage = a.area_vintage
        left join domain_counts as d on s.city_code = d.city_code
        where s.n_rows is distinct from a.n_areas * d.n_domains
    ),

    check_present as (
        select
            '2_present_unchanged' as check_name,
            coalesce(m.city_code, r.city_code) as city_code,
            coalesce(m.snapshot_year, r.snapshot_year) as snapshot_year,
            coalesce(m.area_code, r.area_code) as area_code,
            coalesce(m.poi_domain_h, r.poi_domain_h) as poi_domain_h,
            m.oa_domain as observed,
            r.oa_domain as expected
        from (select * from map where not is_zero_filled) as m
        full outer join
            source_rollup as r
            on m.city_code = r.city_code
            and m.snapshot_year = r.snapshot_year
            and m.area_code = r.area_code
            and m.area_vintage = r.area_vintage
            and m.weight_variant = r.weight_variant
            and m.methodology_variant = r.methodology_variant
            and m.poi_domain_h = r.poi_domain_h
        where
            m.city_code is null
            or r.city_code is null
            or m.oa_domain is distinct from r.oa_domain
            or m.oa_domain_min_base_flag is distinct from r.oa_domain_min_base_flag
            or m.poi_count is distinct from r.poi_count
            or m.area_km2 is distinct from r.area_km2
            or m.poi_density_per_km2 is distinct from r.poi_density_per_km2
    ),

    check_filled as (
        select
            '3_zero_filled_row' as check_name,
            m.city_code,
            m.snapshot_year,
            m.area_code,
            m.poi_domain_h,
            m.poi_density_per_km2 as observed,
            0.0 as expected
        from map as m
        left join
            source_rollup as r
            on m.city_code = r.city_code
            and m.snapshot_year = r.snapshot_year
            and m.area_code = r.area_code
            and m.area_vintage = r.area_vintage
            and m.weight_variant = r.weight_variant
            and m.methodology_variant = r.methodology_variant
            and m.poi_domain_h = r.poi_domain_h
        where
            m.is_zero_filled
            and (
                m.poi_count is distinct from 0
                or m.poi_density_per_km2 is distinct from 0
                or m.oa_domain is not null
                or m.weight_variant != 'standard'
                or r.city_code is not null
            )
    ),

    area_year_flag as (
        select
            city_code,
            area_vintage,
            snapshot_year,
            methodology_variant,
            area_code,
            bool_or(oa_domain_min_base_flag) as flag
        from source_rollup
        where weight_variant = 'standard'
        group by city_code, area_vintage, snapshot_year, methodology_variant, area_code
    ),

    check_flag as (
        select
            '4_zero_filled_flag' as check_name,
            m.city_code,
            m.snapshot_year,
            m.area_code,
            m.poi_domain_h,
            cast(m.oa_domain_min_base_flag as double) as observed,
            cast(
                coalesce(f.flag, 0 < {{ var("oa_min_poi_base_n", 10) }}) as double
            ) as expected
        from map as m
        left join
            area_year_flag as f
            on m.city_code = f.city_code
            and m.area_vintage = f.area_vintage
            and m.snapshot_year = f.snapshot_year
            and m.methodology_variant = f.methodology_variant
            and m.area_code = f.area_code
        where
            m.is_zero_filled
            and m.oa_domain_min_base_flag
            is distinct from coalesce(f.flag, 0 < {{ var("oa_min_poi_base_n", 10) }})
    )

select *
from check_dense
union all
select *
from check_present
union all
select *
from check_filled
union all
select *
from check_flag
