-- test_354_backcast_native_vs_crosswalk_reconciliation.sql
-- #354/#355 phase A, prerequisite §2.1(2): reconcile the native LOR-2021
-- back-cast POI counts (int_berlin_poi_development_plr2021_backcast,
-- point-in-polygon) with the crosswalk-reallocated LOR-2021 counts they replace
-- for the suite (int_poi_share_base_2021: lor_pre2021 counts x areal weight,
-- seed_lor_crosswalk_2006_to_2021).
--
-- Expected relationship (measured 2019/2020; docs/epic-e/
-- 354-phase-a-data-prerequisites.md §2):
-- (a) POI universe: the back-cast re-assigns exactly the POIs of
-- int_osm_poi_plr for each back-cast year -- no POI lost or duplicated.
-- (b) City totals agree to < 0.1%. The crosswalk weight is
-- intersection_area / pre2021_area and sums to 1 per pre-2021 PLR up to
-- rounding (446 of 448 PLRs exactly 1.000), so the crosswalk total equals
-- the pre-2021 hard total; the native total differs from that only by POIs
-- whose point lies inside one vintage's outer extent and not the other's
-- (1 POI in 2019 and in 2020).
-- (c) PLRs whose geometry did not change in the 2021 reform (>= 99% of the
-- area shared in both directions, 287 PLRs): native = crosswalk up to
-- POIs on re-digitised shared boundaries; |diff| <= 10 POIs per PLR
-- (max seen 8) and <= 1% in aggregate (seen 0.4%).
-- The real differences sit in the 255 PLRs that were split or re-cut: the
-- crosswalk spreads a pre-2021 PLR's POIs in proportion to AREA, assuming
-- uniform POI density, while point-in-polygon puts each POI where it is
-- (Pearson r native vs crosswalk 0.84 for the PLRs split out of larger
-- pre-2021 PLRs). Those differences are the reason for the native counts
-- (pre-registration §3.3(1), domain review M2) and are not tested as errors.
--
-- Returns one row per violated check; severity error.
{{ config(severity="error") }}

{% set backcast_years = var("berlin_lor2021_backcast_years", [2019, 2020]) %}
{#- Guard (#354 review): the back-cast must be non-empty and pre-2021 only
    (>= 2021 snapshots are already native lor_2021 in int_osm_poi_plr). -#}
{% if backcast_years | length == 0 %}
    {{ exceptions.raise_compiler_error("berlin_lor2021_backcast_years is empty; the LOR-2021 back-cast needs at least one snapshot year <= 2020") }}
{% endif %}
{% for y in backcast_years %}
    {% if y | int > 2020 %}
        {{ exceptions.raise_compiler_error("berlin_lor2021_backcast_years contains " ~ y ~ "; back-cast years must be <= 2020") }}
    {% endif %}
{% endfor %}

with
    -- (a) POI universe conservation.
    source_pois as (
        select snapshot_year, count(*) as n
        from {{ ref("int_osm_poi_plr") }}
        where snapshot_year in ({{ backcast_years | join(", ") }})
        group by snapshot_year
    ),

    backcast_pois as (
        select snapshot_year, count(*) as n, count(distinct osm_id) as n_distinct
        from {{ ref("int_berlin_osm_poi_plr2021_backcast") }}
        group by snapshot_year
    ),

    check_universe as (
        select
            'a_poi_universe' as check_name,
            s.snapshot_year,
            cast(null as varchar) as area_code,
            s.n * 1.0 as reference_value,
            coalesce(b.n, 0) * 1.0 as native_value
        from source_pois as s
        left join backcast_pois as b on s.snapshot_year = b.snapshot_year
        where b.n is null or b.n != s.n or b.n_distinct != s.n
    ),

    native as (
        select snapshot_year, area_code, sum(poi_count) * 1.0 as n
        from {{ ref("int_berlin_poi_development_plr2021_backcast") }}
        group by snapshot_year, area_code
    ),

    crosswalked as (
        select snapshot_year, area_code, total_poi_count as n
        from {{ ref("int_poi_share_base_2021") }}
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and snapshot_year in ({{ backcast_years | join(", ") }})
    ),

    -- (b) City totals.
    crosswalked_total as (
        select snapshot_year, sum(n) as total from crosswalked group by snapshot_year
    ),

    native_total as (
        select snapshot_year, sum(n) as total from native group by snapshot_year
    ),

    check_city_total as (
        select
            'b_city_total_within_0.1pct' as check_name,
            x.snapshot_year,
            cast(null as varchar) as area_code,
            x.total as reference_value,
            coalesce(nt.total, 0) as native_value
        from crosswalked_total as x
        left join native_total as nt on x.snapshot_year = nt.snapshot_year
        where nt.total is null or abs(nt.total - x.total) > 0.001 * x.total
    ),

    -- PLRs unchanged by the 2021 reform: one dominant pre-2021 source holding
    -- >= 99% of both PLRs' areas (weight and reverse_weight, #136).
    unchanged_plrs as (
        select plr_id_2021 as area_code
        from {{ ref("seed_lor_crosswalk_2006_to_2021") }}
        where mapping_type != 'stub' and weight >= 0.99 and reverse_weight >= 0.99
    ),

    unchanged_pairs as (
        select
            x.snapshot_year,
            x.area_code,
            x.n as crosswalk_n,
            coalesce(nt.n, 0) as native_n
        from crosswalked as x
        inner join unchanged_plrs as u on x.area_code = u.area_code
        left join
            native as nt
            on x.snapshot_year = nt.snapshot_year
            and x.area_code = nt.area_code
    ),

    -- (c1) Per unchanged PLR.
    check_unchanged_plr as (
        select
            'c1_unchanged_plr_within_10_pois' as check_name,
            snapshot_year,
            area_code,
            crosswalk_n as reference_value,
            native_n as native_value
        from unchanged_pairs
        where abs(native_n - crosswalk_n) > 10
    ),

    -- (c2) Aggregate over unchanged PLRs.
    check_unchanged_total as (
        select
            'c2_unchanged_plrs_abs_diff_within_1pct' as check_name,
            snapshot_year,
            cast(null as varchar) as area_code,
            sum(crosswalk_n) as reference_value,
            sum(abs(native_n - crosswalk_n)) as native_value
        from unchanged_pairs
        group by snapshot_year
        having sum(abs(native_n - crosswalk_n)) > 0.01 * sum(crosswalk_n)
    )

select *
from check_universe
union all
select *
from check_city_total
union all
select *
from check_unchanged_plr
union all
select *
from check_unchanged_total
