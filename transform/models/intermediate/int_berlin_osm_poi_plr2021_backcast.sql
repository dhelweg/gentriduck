-- int_berlin_osm_poi_plr2021_backcast.sql
-- #354/#355 phase A, prerequisite §2.1(2): native LOR-2021 PLR assignment of
-- the pre-2021 OSM snapshots used by the Berlin modern-era hypothesis suite.
--
-- =============================================================================
-- Why (pre-registration docs/methodology/354-355-hypothesis-suite-preregistration.md
-- §2, §2.1(2), §3.1, §3.3(1), §10.2)
-- =============================================================================
-- The suite's first Berlin status-change window W1 (MSS edition 2021, data
-- 31.12.2018 -> 31.12.2020) pairs with OSM snapshots 2019-01-01 and
-- 2021-01-01, all on LOR 2021 geometry. int_osm_poi_plr assigns snapshots
-- <= 2020 to the pre-2021 PLRs (vintage cutoff rule), and the only LOR-2021
-- series for 2019/2020 so far was int_poi_share_base_2021's crosswalk
-- reallocation (fractional counts, total-POI only, no OA). The maintainer
-- approved native counts by point-in-polygon instead (pre-registration §10.2);
-- the crosswalk-1:1 fallback is withdrawn (§3.3(1)).
--
-- What: every Berlin POI of a back-cast snapshot year is re-assigned to the
-- LOR-2021 PLR polygon that contains it. Nothing else changes: the POI
-- universe, harmonised taxonomy, cuisine and attribution are taken unchanged
-- from int_osm_poi_plr (same snapshot, same rows; its pre-2021 PLR is kept as
-- area_code_pre2021 for the native-vs-crosswalk reconciliation).
--
-- =============================================================================
-- Spatial method (identical to int_osm_poi_plr -- R-C2: that model's header,
-- C3-join geo-DS approval, C3-dedup #59)
-- =============================================================================
-- - CRS: POI lon/lat (EPSG:4326) -> EPSG:25833 via
-- ST_Transform(ST_Point(lon, lat), 'EPSG:4326', 'EPSG:25833', true)
-- (always_xy = true), LOR polygons native EPSG:25833 from stg_berlin_lor.
-- - Predicate: ST_Within (exact point-in-polygon, no buffer).
-- - Boundary dedup: QUALIFY ROW_NUMBER() OVER (PARTITION BY snapshot_year,
-- osm_id ORDER BY area_code) = 1 (alphabetical tie-break, as in C3-dedup).
-- - Vintage: lor_2021 for EVERY back-cast year (the point of this model).
-- POIs outside every LOR-2021 polygon keep area_code = NULL (water, airport
-- perimeter, outside Berlin), exactly like int_osm_poi_plr; downstream
-- aggregations drop them as fct_poi_development does.
--
-- Back-cast years: dbt var `berlin_lor2021_backcast_years`, default [2019, 2020]
-- (the two snapshots the pre-registration needs). Years >= 2021 are always
-- excluded here because int_osm_poi_plr already assigns them natively to
-- lor_2021; this keeps the back-cast and the contemporaneous series disjoint
-- (tested in int_poi_development_native's grain test).
--
-- Not methodology-bearing on its own: the join method and taxonomy are the
-- signed-off C3 ones; only the geometry vintage paired with the snapshot
-- changes, as approved by the maintainer (§10.2). The suite that consumes
-- it is gated under #354/#355.
--
-- Graceful degradation: when int_osm_poi_plr or stg_berlin_lor have no rows
-- (no OSM / LOR ingested yet) the joins below simply return zero rows.
--
-- dbt_meta_owner: data-engineer
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

{% set backcast_years = var("berlin_lor2021_backcast_years", [2019, 2020]) %}

with
    -- Same POI rows as int_osm_poi_plr for the back-cast snapshots, including
    -- the POIs that fell outside every pre-2021 polygon (area_code NULL there)
    -- -- they may lie inside a LOR-2021 polygon.
    poi_points as (
        select
            city_code,
            snapshot_year,
            osm_id,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            lon,
            lat,
            harmonization_provenance,
            source_attribution,
            cuisine,
            area_code as area_code_pre2021,
            -- int_osm_poi_plr header: always_xy = true forces (lon, lat) =
            -- (x, y) input axis order for EPSG:4326 in DuckDB's ST_Transform.
            st_transform(
                st_point(lon, lat), 'EPSG:4326', 'EPSG:25833', true
            ) as geom_25833
        from {{ ref("int_osm_poi_plr") }}
        where
            snapshot_year in ({{ backcast_years | join(", ") }})
            and snapshot_year <= 2020
    ),

    lor_2021_geoms as (
        select area_code, area_vintage, st_geomfromwkb(geometry_wkb) as geom
        from {{ ref("stg_berlin_lor") }}
        where geometry_wkb is not null and area_vintage = 'lor_2021'
    ),

    joined as (
        select
            poi.city_code,
            poi.snapshot_year,
            poi.osm_id,
            poi.poi_domain_h,
            poi.poi_category_h,
            poi.poi_type_h,
            poi.lon,
            poi.lat,
            poi.harmonization_provenance,
            poi.source_attribution,
            poi.cuisine,
            lor.area_code,
            -- Constant 'lor_2021' (not lor.area_vintage) so a POI outside every
            -- polygon still carries the vintage it was tested against; its
            -- NULL area_code is what marks it as unassigned.
            'lor_2021' as area_vintage,
            poi.area_code_pre2021
        from poi_points as poi
        left join lor_2021_geoms as lor on st_within(poi.geom_25833, lor.geom)
        qualify
            row_number() over (
                partition by poi.snapshot_year, poi.osm_id order by lor.area_code
            )
            = 1
    )

select
    city_code,
    snapshot_year,
    osm_id,
    poi_domain_h,
    poi_category_h,
    poi_type_h,
    lon,
    lat,
    harmonization_provenance,
    source_attribution,
    cuisine,
    area_code,
    area_vintage,
    area_code_pre2021
from joined
