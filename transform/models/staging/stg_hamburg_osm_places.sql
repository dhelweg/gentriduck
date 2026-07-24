-- stg_hamburg_osm_places.sql
-- #307 -- Staging view over the current-snapshot OSM place=neighbourhood|
-- suburb|quarter nodes for Hamburg, produced by
-- ingestion/hamburg/osm/ingest_hamburg_osm_places.py (reuses the same
-- Hamburg-covering Geofabrik .osh.pbf already ingested for H1 POI history,
-- ADR-0014 Pillar 6 -- source reuse, not a new source; ODbL).
--
-- Storage path: data/raw/osm/hamburg_places/*.parquet -- a SIBLING directory
-- to data/raw/osm/hamburg/ (that one is stg_osm_poi's raw_osm.hamburg
-- source; this file's schema is not POI-shaped and must not land in the
-- same glob, see the ingestion script's own header note).
--
-- Feeds int_hamburg_gebiet_osm_names.sql's point-in-polygon name match --
-- this staging model does no matching/geometry work itself, it only exposes
-- the extracted OSM place points.
--
-- Graceful-degradation: returns zero rows with the target schema when no
-- parquet files have been ingested, so downstream models and
-- `uv run poe build` continue to pass (docs/lessons/local-first-data-presence.md),
-- same convention as stg_hamburg_geo.sql.
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set hh_places_glob = raw_path("osm/hamburg_places/*.parquet") %}
{%- set _src_raw_hamburg_places = source("raw_osm", "hamburg_places") -%}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ hh_places_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select city_code, osm_id, place_type, place_name, lon, lat, source_attribution
    from read_parquet({{ _src_raw_hamburg_places }}, union_by_name = true)
    where city_code = 'HH' and place_name is not null and place_name != ''

{% else %}

    -- Zero-row typed stub: no Hamburg OSM place-names parquet found.
    -- Run ingestion/hamburg/osm/ingest_hamburg_osm_places.py to populate
    -- data/raw/osm/hamburg_places/
    select
        cast(null as varchar) as city_code,
        cast(null as varchar) as osm_id,
        cast(null as varchar) as place_type,
        cast(null as varchar) as place_name,
        cast(null as double) as lon,
        cast(null as double) as lat,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
