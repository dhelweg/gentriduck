-- test_354_c5_share_native_matches_share_base.sql
-- #354/#355 phase A: int_poi_c5_share_native.total_c5_share must be the SAME
-- C5 construct as the signed-off int_poi_share_base.plr_poi_share
-- (docs/epic-c/C5-geo-signoff.md; index-definition.md §2.4). On every
-- contemporaneous cell -- Berlin lor_pre2021 2008-2020 and lor_2021 2021+,
-- Hamburg 'current' all years,
-- which both models compute from the same fct_poi_development counts -- the
-- shares, counts and city totals must agree, and each share-base cell must
-- exist in the native model. Only the back-cast years (no share-base
-- counterpart on lor_2021) are new. Severity error, tolerance 1e-12.
{{ config(severity="error") }}

with
    native as (
        select *
        from {{ ref("int_poi_c5_share_native") }}
        where geometry_pairing = 'contemporaneous' and has_any_poi
    ),

    native_vintages as (select distinct city_code, area_vintage from native),

    share_base as (
        select sb.*
        from {{ ref("int_poi_share_base") }} as sb
        inner join
            native_vintages as v
            on sb.city_code = v.city_code
            and sb.area_vintage = v.area_vintage
    )

select
    coalesce(s.city_code, n.city_code) as city_code,
    coalesce(s.area_vintage, n.area_vintage) as area_vintage,
    coalesce(s.snapshot_year, n.snapshot_year) as snapshot_year,
    coalesce(s.area_code, n.area_code) as area_code,
    s.plr_poi_share,
    n.total_c5_share,
    s.total_poi_count as share_base_count,
    n.total_poi_count as native_count
from share_base as s
full outer join
    native as n
    on s.city_code = n.city_code
    and s.area_vintage = n.area_vintage
    and s.snapshot_year = n.snapshot_year
    and s.area_code = n.area_code
where
    s.area_code is null
    or n.area_code is null
    or s.total_poi_count != n.total_poi_count
    or s.berlin_total_poi_count != n.city_total_poi_count
    or abs(s.plr_poi_share - n.total_c5_share) > 1e-12
