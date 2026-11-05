-- mart_poi_offering_advantage_map.sql
-- #210 (perf follow-up to #208/#209): slim, domain-grain companion to
-- mart_poi_offering_advantage, built specifically for the /poi-map page's
-- reactive query.
--
-- Why this exists: Evidence.dev bundles the ENTIRE referenced source parquet
-- to the client for any page with a reactive (`${inputs...}`) query against
-- it -- a query's own WHERE-clause filters do NOT shrink what gets shipped,
-- because duckdb-wasm needs the full table in-browser to answer arbitrary
-- future input combinations. `mart_poi_offering_advantage` is leaf-grain
-- (poi_domain_h x poi_category_h x poi_type_h, 856,464 rows / ~14MB parquet,
-- confirmed via `data/serving/mart_poi_offering_advantage.parquet`), but
-- /poi-map only ever needs one value per (area, year, domain) -- it never
-- reads poi_category_h/poi_type_h/oa_category/oa_type. Shipping the leaf
-- grain to answer a domain-grain question is the actual driver of the ~14MB
-- bundle flagged in #210, not the metric/year/view reactivity itself.
--
-- Not methodology-bearing: pure re-aggregation of an already-signed-off,
-- already-published mart (SUM of an unweighted count + a location quotient
-- that is provably constant within a domain -- see below), no new
-- indicator/weight/normalization. Not on the R-C1 gated-file list.
--
-- oa_domain is constant across all (poi_category_h, poi_type_h) leaf rows
-- within the same (city_code, snapshot_year, area_code, area_vintage,
-- weight_variant, methodology_variant, poi_domain_h) group by construction
-- (int_poi_offering_advantage computes it once per domain and repeats it
-- across that domain's leaf rows) -- verified directly against the built
-- parquet (COUNT(DISTINCT oa_domain) = 1 per group, sampled). any_value(...)
-- is therefore lossless here, not a lossy approximation.
--
-- #274 (ADR-0017 D5 D-3 discharge): oa_domain_min_base_flag is carried through
-- the same way (any_value) -- it is in fact constant across this PLR-year's
-- EVERY domain, not just this one (int_poi_offering_advantage header: it is
-- keyed on all_domains_stock_local, the PLR-year's grand total, a
-- PLR-year-level property), so collapsing it here is exact, not lossy.
-- web/pages/berlin/poi-map.md suppresses oa_domain on this flag before
-- display (C-4/D-3 publish-gate discharge).
--
-- poi_density_per_km2 is NOT simply averaged/any_value'd across leaves --
-- it is recomputed as SUM(poi_count) / area_km2 so the domain-level density
-- is the true total (e.g. "all Gastronomy POIs per km2"), not one arbitrary
-- leaf's density.
--
-- Grain: one row per (city_code, snapshot_year, area_code, area_vintage,
-- weight_variant, methodology_variant, poi_domain_h) -- the
-- (poi_category_h, poi_type_h)-collapsed grain of mart_poi_offering_advantage,
-- ~1/3 the row count (251,159 vs 856,464 rows measured on the same build,
-- before #357's zero-fill below) with 4 fewer columns (poi_category_h,
-- poi_type_h, oa_category, oa_type dropped) and 2 added
-- (oa_domain_min_base_flag, #274; is_zero_filled, #357).
--
-- #357: zero-count rows. The upstream marts are SPARSE (int_poi_offering_advantage
-- header, "Sparse representation"): a domain with zero POIs in an area-year has
-- no row there, so the map pages drew those area-years as hatched "No data"
-- although their mapped-place density is 0 (Retail 2025: 25 Berlin PLRs, 282
-- Hamburg Gebiete). This model now also emits one row for every leaf area x
-- snapshot year x POI domain of the 'standard' (hard point-in-polygon) weight
-- variant, the only variant any page reads. The added rows carry
-- is_zero_filled = true, poi_count = 0 and poi_density_per_km2 = 0. The rows
-- that existed before are unchanged, column for column (is_zero_filled =
-- false); test_357_poi_map_zero_fill.sql checks that against
-- mart_poi_offering_advantage. No upstream model changes.
--
-- Scaffold scope (all derived, nothing city-specific hard-coded, ADR-0005):
-- * areas: dim_area_geometry at each city's dim_city.oa_leaf_area_level (the
-- grain int_poi_offering_advantage is computed at: Berlin plr, Hamburg
-- subarea_l2), per area_vintage. This includes the two areas with no POI in
-- any domain in any year (BER 06200418 Landweg, HH 105001), which had no row
-- at all before.
-- * years: the (city, area_vintage, snapshot_year) slices the standard variant
-- already has, so a vintage is never filled outside its own years (Berlin
-- lor_pre2021 2008-2020, lor_2021 2021-2026; Hamburg 2008-2026).
-- * domains: every poi_domain_h the city has in any year (the page dropdown).
-- The gaussian_* rows stay sparse: their poi_count is the HARD count joined onto
-- the weighted leaf rows (mart_poi_offering_advantage), so "no weighted row"
-- does not mean "zero POIs" there, and no page reads them.
--
-- OA stays undefined on zero-filled rows (a binding constraint of #357, not a
-- new methodology choice): oa_domain is NULL, exactly what the absent row meant
-- before (NULL-equivalent, int_poi_offering_advantage "Sparse representation").
-- Evaluated on stock 0, the LQ formula would give 0 where the area-year has
-- other POIs, but publishing that would change the OA map and the district
-- averages, so it is a question for the R-C1 dual gate, not for this display
-- fix. oa_domain_min_base_flag is not an OA value: a zero-filled row takes its
-- area-year's own flag (constant across the area-year's domains, see above),
-- and an area-year with no POI at all gets the flag's definition evaluated at
-- all_domains_stock_local = 0, i.e. 0 < oa_min_poi_base_n (offering_advantage_lq
-- macro, #274 D-3), which is true.
--
-- area_km2 on zero-filled rows: the value the same (city, area, vintage)
-- already carries on its existing rows (mart_poi_offering_advantage, native-CRS
-- ST_Area). Only the two never-populated areas above have no such rows; for
-- them it is ST_Area of the dim_area_geometry polygon transformed from WGS84
-- back to the city's native metric CRS (dim_city.native_crs_epsg), the same
-- "ST_Area in native CRS, never in degrees" rule (OA-D0 geo sign-off C5/C8).
-- Density is 0 either way.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('mart_poi_offering_advantage') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    rollup as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            weight_variant,
            methodology_variant,
            poi_domain_h,
            -- Constant within the group (see header) -- any_value is lossless.
            any_value(oa_domain) as oa_domain,
            -- #274: constant across the WHOLE PLR-year, a fortiori constant within
            -- this domain group -- any_value is exact (see header).
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

    -- #357 scaffold, standard variant only (see header).
    slices as (
        select distinct
            city_code, area_vintage, snapshot_year, weight_variant, methodology_variant
        from rollup
        where weight_variant = 'standard'
    ),

    domains as (
        select distinct city_code, poi_domain_h
        from rollup
        where weight_variant = 'standard'
    ),

    leaf_areas as (
        select
            geo.city_code,
            geo.area_vintage,
            geo.area_code,
            st_area(
                st_transform(
                    st_geomfromgeojson(geo.geometry_geojson),
                    'EPSG:4326',
                    'EPSG:' || city.native_crs_epsg,
                    always_xy := true
                )
            )
            / 1e6 as geometry_area_km2
        from {{ ref("dim_area_geometry") }} as geo
        inner join
            {{ ref("dim_city") }} as city
            on geo.city_code = city.city_code
            and geo.area_level = city.oa_leaf_area_level
        where geo.area_code is not null
    ),

    -- The area size the area's existing rows already carry (area-keyed, so the
    -- same on every one of them).
    known_area_km2 as (
        select city_code, area_vintage, area_code, any_value(area_km2) as area_km2
        from rollup
        where weight_variant = 'standard'
        group by city_code, area_vintage, area_code
    ),

    area_year_flag as (
        select
            city_code,
            area_vintage,
            snapshot_year,
            weight_variant,
            methodology_variant,
            area_code,
            any_value(oa_domain_min_base_flag) as oa_domain_min_base_flag
        from rollup
        where weight_variant = 'standard'
        group by
            city_code,
            area_vintage,
            snapshot_year,
            weight_variant,
            methodology_variant,
            area_code
    ),

    zero_filled as (
        select
            s.city_code,
            s.snapshot_year,
            a.area_code,
            s.area_vintage,
            s.weight_variant,
            s.methodology_variant,
            d.poi_domain_h,
            cast(null as double) as oa_domain,
            coalesce(
                f.oa_domain_min_base_flag, 0 < {{ var("oa_min_poi_base_n", 10) }}
            ) as oa_domain_min_base_flag,
            0 as poi_count,
            coalesce(k.area_km2, a.geometry_area_km2) as area_km2,
            0 / nullif(
                coalesce(k.area_km2, a.geometry_area_km2), 0
            ) as poi_density_per_km2
        from slices as s
        inner join
            leaf_areas as a
            on s.city_code = a.city_code
            and s.area_vintage = a.area_vintage
        inner join domains as d on s.city_code = d.city_code
        left join
            known_area_km2 as k
            on a.city_code = k.city_code
            and a.area_vintage = k.area_vintage
            and a.area_code = k.area_code
        left join
            area_year_flag as f
            on s.city_code = f.city_code
            and s.area_vintage = f.area_vintage
            and s.snapshot_year = f.snapshot_year
            and s.weight_variant = f.weight_variant
            and s.methodology_variant = f.methodology_variant
            and a.area_code = f.area_code
        where
            not exists (
                select 1
                from rollup as r
                where
                    r.city_code = s.city_code
                    and r.area_vintage = s.area_vintage
                    and r.snapshot_year = s.snapshot_year
                    and r.weight_variant = s.weight_variant
                    and r.methodology_variant = s.methodology_variant
                    and r.area_code = a.area_code
                    and r.poi_domain_h = d.poi_domain_h
            )
    )

select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    weight_variant,
    methodology_variant,
    poi_domain_h,
    oa_domain,
    oa_domain_min_base_flag,
    poi_count,
    area_km2,
    poi_density_per_km2,
    false as is_zero_filled
from rollup
union all
select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    weight_variant,
    methodology_variant,
    poi_domain_h,
    oa_domain,
    oa_domain_min_base_flag,
    poi_count,
    area_km2,
    poi_density_per_km2,
    true as is_zero_filled
from zero_filled
