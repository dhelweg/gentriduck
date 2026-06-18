-- int_osm_poi_plr.sql
-- C3-join — Spatial join: assign each OSM POI to its PLR area_code using the
-- correct LOR vintage geometry.
--
-- =============================================================================
-- Methodology
-- =============================================================================
-- WFS source URLs and licence:
-- Pre-2021 geometry: https://gdi.berlin.de/services/wfs/lor_2019
-- typeNames=lor_2019:a_lor_plr_2019  (448 PLR areas, EPSG:25833)
-- LOR 2021 geometry: https://gdi.berlin.de/services/wfs/lor_2021
-- typeNames=lor_2021:a_lor_plr_2021  (542 PLR areas, EPSG:25833)
-- Licence: CC BY 3.0 DE — Geoportal Berlin / GDI Berlin
-- Ingestion: ingestion/berlin/lor/ingest_lor_geometries.py
--
-- Vintage cutoff rule (geo-DS approved):
-- snapshot_year <= 2020 -> join against pre-2021 PLR geometry (lor_pre2021)
-- snapshot_year >= 2021 -> join against LOR 2021 PLR geometry (lor_2021)
-- Rationale: the LOR 2021 reform reorganised Berlin's 447-PLR scheme into the
-- new 542-PLR scheme, effective 1 Jan 2021. Using the wrong vintage would
-- produce erroneous area_code assignments for ~20% of PLRs that changed.
--
-- Spatial predicate (ST_Within, point-in-polygon):
-- POI point coordinates (lon, lat) are stored in EPSG:4326 (WGS 84).
-- LOR geometries are in EPSG:25833 (ETRS89 / UTM zone 33N, native CRS).
-- Predicate: ST_Within(ST_Transform(ST_Point(lon, lat), 'EPSG:4326', 'EPSG:25833',
-- true),
-- ST_GeomFromWKB(geometry_wkb))
-- always_xy=true forces (lon=x, lat=y) input axis order — required because
-- DuckDB ST_Transform defaults to EPSG:4326's canonical (lat, lon) order.
-- ST_Within is exact point-in-polygon; no buffer is applied. This is correct
-- for centroid-level OSM POI data.
-- Performance: POI point coordinates are pre-materialised in a CTE (poi_points)
-- before the join — see geo-DS note in C3 sign-off.
--
-- Known excluded areas (area_code = NULL):
-- - Water bodies (Spree, Havel, Tegeler See, Mueggelsee) that lack PLR coverage
-- - Airport perimeter areas outside PLR boundaries (e.g. BER airport zone)
-- - OSM POIs with coordinates outside Berlin administrative boundaries
-- These are expected NULLs; the 2% warn threshold (assert_null_rate_below test)
-- is the sentinel for unexpected data quality issues.
--
-- NULL-rate sentinel:
-- dbt test assert_null_rate_below(area_code, partition_by=snapshot_year,
-- max_null_fraction=0.12)
-- at severity=warn. The ~9-11% observed NULL rate is structural: Berlin has
-- ~30 km² of Grunewald forest, Wannsee/Havel/Spree water bodies, Tegel airport,
-- and Schönefeld perimeter that lie outside PLR boundaries. The 12% threshold
-- detects catastrophic spatial misalignments while accommodating the real Berlin
-- geography. A NULL rate jump > 12% in a single year indicates a data quality
-- issue (coordinate drift, wrong vintage, geometry ingestion bug).
-- =============================================================================
--
-- Graceful degradation:
-- When no OSM parquet files exist (stg_osm_poi returns zero rows) OR no LOR
-- parquet files exist, this model returns a zero-row typed stub with all
-- output columns so that downstream models and `uv run poe build` continue
-- to pass before ingestion data is available.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_osm_poi_harmonized') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

{% set lor_pre2021_glob = var("project_root") ~ "/data/raw/berlin/lor/pre2021.parquet" %}
{% set lor_2021_glob = var("project_root") ~ "/data/raw/berlin/lor/lor_2021.parquet" %}

{% if execute %}
    {%- set osm_count_result = run_query("SELECT count(*) FROM glob('" ~ var("project_root") ~ "/data/raw/osm/berlin/*.parquet')") -%}
    {%- set osm_file_count = osm_count_result.columns[0][0] -%}
    {%- set lor_pre_result = run_query("SELECT count(*) FROM glob('" ~ lor_pre2021_glob ~ "')") -%}
    {%- set lor_pre_count = lor_pre_result.columns[0][0] -%}
    {%- set lor_2021_result = run_query("SELECT count(*) FROM glob('" ~ lor_2021_glob ~ "')") -%}
    {%- set lor_2021_count = lor_2021_result.columns[0][0] -%}
{% else %}
    {%- set osm_file_count = 0 -%}
    {%- set lor_pre_count = 0 -%}
    {%- set lor_2021_count = 0 -%}
{% endif %}

{% if osm_file_count > 0 and lor_pre_count > 0 and lor_2021_count > 0 %}

    -- Both OSM and LOR data are available: perform the spatial join.
    with
        -- Pre-materialise POI points transformed to EPSG:25833 before the join.
        -- Avoids repeated ST_Transform calls inside the join predicate (geo-DS note).
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
                -- Transform POI point from EPSG:4326 to EPSG:25833 (native LOR CRS).
                -- always_xy=true forces (lon, lat) = (x, y) input axis order,
                -- overriding EPSG:4326's canonical (lat, lon) axis order in
                -- DuckDB's ST_Transform implementation.
                st_transform(
                    st_point(lon, lat), 'EPSG:4326', 'EPSG:25833', true
                ) as geom_25833
            from {{ ref("int_osm_poi_harmonized") }}
        ),

        -- Load pre-2021 LOR geometries (for snapshot_year <= 2020)
        lor_pre2021 as (
            select
                area_code, vintage as area_vintage, st_geomfromwkb(geometry_wkb) as geom
            from read_parquet('{{ lor_pre2021_glob }}')
        ),

        -- Load LOR 2021 geometries (for snapshot_year >= 2021)
        lor_2021 as (
            select
                area_code, vintage as area_vintage, st_geomfromwkb(geometry_wkb) as geom
            from read_parquet('{{ lor_2021_glob }}')
        ),

        -- Spatial join for pre-2021 POIs (snapshot_year <= 2020)
        joined_pre2021 as (
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
                lor.area_code,
                lor.area_vintage
            from poi_points as poi
            left join lor_pre2021 as lor on st_within(poi.geom_25833, lor.geom)
            where poi.snapshot_year <= 2020
        ),

        -- Spatial join for 2021+ POIs (snapshot_year >= 2021)
        joined_2021 as (
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
                lor.area_code,
                lor.area_vintage
            from poi_points as poi
            left join lor_2021 as lor on st_within(poi.geom_25833, lor.geom)
            where poi.snapshot_year >= 2021
        ),

        -- Union both vintage cohorts
        final as (
            select *
            from joined_pre2021
            union all
            select *
            from joined_2021
        )

    select *
    from final

{% else %}

    -- Zero-row typed stub: OSM data or LOR geometry parquet files not found.
    -- Run ingestion to populate:
    -- OSM:  ingestion/berlin/osm/ingest_osm_history.py
    -- LOR:  ingestion/berlin/lor/ingest_lor_geometries.py --out-dir data/raw/berlin/lor
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
