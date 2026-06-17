-- stg_osm_poi.sql
-- Staging view over annual OSM POI GeoParquet snapshots produced by C1 ingestion.
--
-- Source: ingestion/berlin/osm/ingest_osm_history.py (ADR-0002, Option B)
-- Geofabrik Germany full-history .osh.pbf processed with osmium (BSL-1.0, PyPI)
-- -> annual snapshots per (city, year) in data/raw/osm/<city>/<year>.parquet.
-- Files are gitignored (ADR-0008); rebuild with:
-- uv run python ingestion/berlin/osm/ingest_osm_history.py
-- --osh-pbf data/raw/osm/germany-internal.osh.pbf
-- --out-dir data/raw/osm/berlin --years 2008-2024
--
-- Attribution (ODbL -- mandatory):
-- "OpenStreetMap contributors / ODbL -- https://www.openstreetmap.org/copyright"
-- Each parquet row carries source_attribution; the attribution page (Epic G3) must
-- surface this.
--
-- Graceful-degradation: when no parquet files exist under data/raw/osm/berlin/ this
-- model returns zero rows with the target schema so that downstream models and
-- uv run poe build continue to pass before data is ingested.
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set osm_parquet_glob = var("project_root") ~ "/data/raw/osm/berlin/*.parquet" %}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ osm_parquet_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        city_code,
        area_code,
        snapshot_year,
        osm_id,
        poi_domain,
        poi_category,
        poi_type,
        lon,
        lat,
        source_attribution
    from
        read_parquet(
            '{{ osm_parquet_glob }}', hive_partitioning = false, union_by_name = true
        )

{% else %}

    -- Zero-row typed stub: no parquet files found.
    -- Run ingestion/berlin/osm/ingest_osm_history.py to populate data/raw/osm/berlin/
    select
        cast(null as varchar) as city_code,
        cast(null as varchar) as area_code,
        cast(null as integer) as snapshot_year,
        cast(null as varchar) as osm_id,
        cast(null as varchar) as poi_domain,
        cast(null as varchar) as poi_category,
        cast(null as varchar) as poi_type,
        cast(null as double) as lon,
        cast(null as double) as lat,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
