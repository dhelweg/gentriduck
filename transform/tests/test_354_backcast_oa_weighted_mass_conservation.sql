-- test_354_backcast_oa_weighted_mass_conservation.sql
-- #354/#355 phase A, prerequisite §2.1(2): mass accounting of the Gaussian-
-- weighted back-cast OA (int_berlin_poi_offering_advantage_plr2021_backcast)
-- against its hard point-in-polygon counterpart, per back-cast year and
-- domain.
--
-- Exact identity implied by the shared kernel (berlin_poi_kernel_weighted_counts;
-- spatial-methods.md §2 mass normalisation, §11.3 C-1 leakage guard):
-- every POI inside a LOR-2021 polygon contributes total weight 1 (normalised
-- kernel weights, or weight 1 to its own PLR when no representative point is
-- within the bandwidth); every POI OUTSIDE all polygons contributes 1 if some
-- representative point is within the bandwidth (the kernel model keeps such
-- POIs, int_osm_poi_plr_weighted header) and 0 otherwise. Hence
-- weighted city total = hard city total + n(outside POIs within bandwidth),
-- for every domain. The hard total counts only POIs inside a polygon
-- (fct_poi_development rule).
--
-- Why not "weighted = hard" as test_c1_oa_weighted_mass_conservation_invariance
-- states: the outside-but-near POIs make the weighted total slightly larger
-- (2019: +41 of 73,415). That pre-existing behaviour also holds for the
-- contemporaneous rows, and the C-1 test does not catch it because it joins
-- the variants on city_code ('BER' vs 'berlin') and so compares zero rows
-- (docs/epic-e/354-phase-a-data-prerequisites.md §7, open issue). This test
-- canonicalises city_code and checks the exact identity instead.
-- Severity error, tolerance 0.01 (floating point).
{{ config(severity="error") }}

{% set bandwidth_m = var("poi_kernel_bandwidth_m", 500) %}

with
    oa as (
        select
            {{ canonical_city_code("city_code") }} as city_code,
            snapshot_year,
            poi_domain_h,
            weight_variant,
            max(domain_stock_city) as domain_stock_city
        from {{ ref("int_berlin_poi_offering_advantage_plr2021_backcast") }}
        group by all
    ),

    hard as (select * from oa where weight_variant = 'standard'),
    weighted as (select * from oa where weight_variant like 'gaussian_%'),

    rep_points as (
        select st_pointonsurface(st_geomfromwkb(geometry_wkb)) as rep_point_25833
        from {{ ref("stg_berlin_lor") }}
        where geometry_wkb is not null and area_vintage = 'lor_2021'
    ),

    -- POIs outside every LOR-2021 polygon that reach >= 1 representative point
    -- within the bandwidth (same CRS transform as the kernel macro).
    outside_reached as (
        select
            {{ canonical_city_code("p.city_code") }} as city_code,
            p.snapshot_year,
            p.poi_domain_h,
            count(*) as n_outside_reached
        from {{ ref("int_berlin_osm_poi_plr2021_backcast") }} as p
        where
            p.area_code is null
            and exists (
                select 1
                from rep_points as r
                where
                    st_dwithin(
                        st_transform(
                            st_point(p.lon, p.lat), 'EPSG:4326', 'EPSG:25833', true
                        ),
                        r.rep_point_25833,
                        {{ bandwidth_m }}.0
                    )
            )
        group by all
    ),

    expected as (
        select
            coalesce(h.city_code, o.city_code) as city_code,
            coalesce(h.snapshot_year, o.snapshot_year) as snapshot_year,
            coalesce(h.poi_domain_h, o.poi_domain_h) as poi_domain_h,
            coalesce(h.domain_stock_city, 0)
            + coalesce(o.n_outside_reached, 0) as expected_weighted_total
        from hard as h
        full outer join
            outside_reached as o
            on h.city_code = o.city_code
            and h.snapshot_year = o.snapshot_year
            and h.poi_domain_h = o.poi_domain_h
    )

select
    e.city_code,
    e.snapshot_year,
    e.poi_domain_h,
    e.expected_weighted_total,
    w.weight_variant,
    w.domain_stock_city as weighted_total
from expected as e
left join
    weighted as w
    on e.city_code = w.city_code
    and e.snapshot_year = w.snapshot_year
    and e.poi_domain_h = w.poi_domain_h
where
    w.domain_stock_city is null
    or abs(w.domain_stock_city - e.expected_weighted_total) > 0.01
