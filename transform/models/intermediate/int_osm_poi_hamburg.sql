-- int_osm_poi_hamburg.sql
-- H1 (#40) -- Spatial join: assign each Hamburg OSM POI to its statistisches-Gebiet
-- area_code (Hamburg's PLR-analogue, ADR-0014 Pillar 1's finest grain).
--
-- =============================================================================
-- Methodology
-- =============================================================================
-- Mirrors int_osm_poi_plr.sql's design (Berlin C3-join) for the Hamburg city
-- scope, per ADR-0014 Pillar 6: OSM POI sourcing needs "no new adapter
-- mechanics, only passing Hamburg's statistische-Gebiete/Stadtteil polygons
-- instead of Berlin's PLR polygons" -- this model is that polygon swap.
--
-- POI source: ingestion/hamburg/osm/ingest_hamburg_osm.py (same Geofabrik
-- .osh.pbf + osmium mechanics as Berlin's C1, ADR-0002 Option B).
-- Geometry source: ingestion/hamburg/geo/ingest_hamburg_geo.py (H1 Pillar 4,
-- LGV Hamburg WFS, dl-de/by-2.0), via stg_hamburg_geo.
--
-- Single-vintage join (unlike Berlin's pre2021/2021 split):
-- Hamburg's statistische-Gebiete geometry is ingested as a single 'current'
-- live-WFS edition (ADR-0014 Pillar 1; the 943-vs-941 historical vintage
-- crosswalk is an open question, ADR-0014 open question #2, deferred). Every
-- Hamburg OSM snapshot year is therefore joined against the same 'current'
-- geometry -- there is no vintage-cutoff branch to replicate from
-- int_osm_poi_plr. If a historical vintage crosswalk lands later, this model
-- will need a vintage-cutoff branch analogous to Berlin's; flagged as a
-- follow-up, not implemented speculatively now.
--
-- Spatial predicate (ST_Within, point-in-polygon):
-- POI point coordinates (lon, lat) are stored in EPSG:4326 (WGS 84), same as
-- Berlin's stg_osm_poi. Hamburg geometries are in EPSG:25832 (ETRS89 / UTM
-- zone 32N, native CRS per dim_city.native_crs_epsg) -- NOT Berlin's
-- EPSG:25833 (UTM 33N). This is the first OSM-POI exercise of the ADR-0005
-- per-city CRS parameter alongside the geometry pillar (0c2e453) and
-- Sozialmonitoring pillar.
-- Predicate: ST_Within(ST_Transform(ST_Point(lon, lat), 'EPSG:4326', 'EPSG:25832',
-- true), ST_GeomFromWKB(geometry_wkb))
-- always_xy=true forces (lon=x, lat=y) input axis order (same rationale as
-- int_osm_poi_plr's C3 note).
--
-- Deduplication:
-- Same boundary-POI fan-out risk as Berlin (issue #59) -- a POI whose
-- coordinates fall exactly on a shared Gebiet boundary can match more than one
-- geometry via ST_Within. QUALIFY ROW_NUMBER() OVER (PARTITION BY
-- snapshot_year, osm_id ORDER BY area_code) = 1 applies the same deterministic
-- tie-break as int_osm_poi_plr.
--
-- Known excluded areas (area_code = NULL):
-- - Elbe river / Alster lakes / harbour water bodies outside Gebiet coverage
-- - Hamburg Airport (Fuhlsbüttel) perimeter areas outside Gebiet boundaries
-- - OSM POIs with coordinates outside Hamburg administrative boundaries
-- (falling within the ingestion bbox but outside city limits, e.g. neighbouring
-- Schleswig-Holstein/Niedersachsen municipalities near the border)
-- These are expected NULLs; see the assert_null_rate_below test below. No
-- Hamburg-specific NULL-rate baseline exists yet (Berlin's 9-11% reflects
-- Berlin's Grunewald/Wannsee/Tegel geography specifically) -- the 12% warn
-- threshold is carried over as a reasonable structural default pending a
-- Hamburg-specific geo-DS calibration once real data is ingested.
--
-- Not methodology-bearing: this is a spatial join using an already-approved
-- predicate (ST_Within, same as Berlin's C3-join, geo-DS approved in Epic C),
-- applied to a new city's geometry/POI pair. It does not introduce a new
-- weighting, normalization, or index-construction method.
--
-- Graceful degradation:
-- When no Hamburg OSM parquet files exist (stg_osm_poi has zero HH rows) OR no
-- Hamburg geo parquet files exist (stg_hamburg_geo returns zero rows), this
-- model returns a zero-row typed stub with all output columns so that
-- downstream models and `uv run poe build` continue to pass before ingestion
-- data is available.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_osm_poi_harmonized') }}
-- depends_on: {{ ref('stg_hamburg_geo') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

{% if execute %}
    {%- set osm_count_result = run_query("SELECT count(*) FROM glob('" ~ var("project_root") ~ "/data/raw/osm/hamburg/*.parquet')") -%}
    {%- set osm_file_count = osm_count_result.columns[0][0] -%}
    {%- set hh_geo_glob = var("project_root") ~ "/data/raw/hamburg/geo/*.parquet" -%}
    {%- set hh_geo_result = run_query("SELECT count(*) FROM glob('" ~ hh_geo_glob ~ "')") -%}
    {%- set hh_geo_file_count = hh_geo_result.columns[0][0] -%}
{% else %} {%- set osm_file_count = 0 -%} {%- set hh_geo_file_count = 0 -%}
{% endif %}

{% if osm_file_count > 0 and hh_geo_file_count > 0 %}

    -- Both Hamburg OSM and geometry data are available: perform the spatial join.
    with
        -- Pre-materialise Hamburg POI points transformed to EPSG:25832 before the
        -- join (mirrors int_osm_poi_plr's poi_points CTE performance note).
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
                st_transform(
                    st_point(lon, lat), 'EPSG:4326', 'EPSG:25832', true
                ) as geom_25832
            from {{ ref("int_osm_poi_harmonized") }}
            where city_code = 'HH'
        ),

        -- Hamburg statistisches-Gebiet geometries (finest grain, subarea_l2,
        -- ADR-0014 Pillar-1 mapping table). Single 'current' vintage.
        gebiet_geoms as (
            select area_code, area_vintage, st_geomfromwkb(geometry_wkb) as geom
            from {{ ref("stg_hamburg_geo") }}
            where geometry_wkb is not null and area_level = 'subarea_l2'
        ),

        -- Spatial join, deduplicated for boundary POIs (same pattern as
        -- int_osm_poi_plr's issue-#59 fix).
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
                gebiet.area_code,
                gebiet.area_vintage
            from poi_points as poi
            left join gebiet_geoms as gebiet on st_within(poi.geom_25832, gebiet.geom)
            qualify
                row_number() over (
                    partition by poi.snapshot_year, poi.osm_id order by gebiet.area_code
                )
                = 1
        )

    select *
    from joined

{% else %}

    -- Zero-row typed stub: Hamburg OSM data or geometry parquet files not found.
    -- Run ingestion to populate:
    -- OSM:      ingestion/hamburg/osm/ingest_hamburg_osm.py
    -- Geometry: ingestion/hamburg/geo/ingest_hamburg_geo.py
    select
        cast(null as varchar) as city_code,
        cast(null as integer) as snapshot_year,
        cast(null as varchar) as osm_id,
        cast(null as varchar) as poi_domain_h,
        cast(null as varchar) as poi_category_h,
        cast(null as varchar) as poi_type_h,
        cast(null as double) as lon,
        cast(null as double) as lat,
        cast(null as varchar) as harmonization_provenance,
        cast(null as varchar) as source_attribution,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_vintage
    where false

{% endif %}
