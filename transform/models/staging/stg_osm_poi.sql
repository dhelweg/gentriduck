-- stg_osm_poi.sql
-- Staging view over annual OSM POI GeoParquet snapshots produced by C1 (Berlin)
-- and H1 (Hamburg, #40) ingestion. City-agnostic per ADR-0005: unions every
-- data/raw/osm/<city>/*.parquet directory found on disk.
--
-- Source: ingestion/berlin/osm/ingest_osm_history.py (ADR-0002, Option B)
-- and     ingestion/hamburg/osm/ingest_hamburg_osm.py (H1, ADR-0014 Pillar 6 --
-- explicitly "no new adapter mechanics", reuses the same Geofabrik .osh.pbf +
-- osmium mechanics against the SAME physical file, only bbox/city_code differ).
-- Geofabrik Germany full-history .osh.pbf processed with osmium (BSL-1.0, PyPI)
-- -> annual snapshots per (city, year) in data/raw/osm/<city>/<year>.parquet.
-- Files are gitignored (ADR-0008); rebuild with:
-- uv run python ingestion/berlin/osm/ingest_osm_history.py
-- --osh-pbf data/raw/osm/germany-internal.osh.pbf
-- --out-dir data/raw/osm/berlin --years 2008-2024
-- uv run python ingestion/hamburg/osm/ingest_hamburg_osm.py
-- --osh-pbf data/raw/osm/germany-internal.osh.pbf
-- --out-dir data/raw/osm/hamburg --years 2008-2024
--
-- Attribution (ODbL -- mandatory):
-- "OpenStreetMap contributors / ODbL -- https://www.openstreetmap.org/copyright"
-- Each parquet row carries source_attribution; the attribution page (Epic G3) must
-- surface this.
--
-- city_code convention note: Berlin rows carry the legacy lowercase 'berlin'
-- value (pre-dates ADR-0005 canonicalization); Hamburg rows carry the canonical
-- 'HH' (ADR-0005/ADR-0014). Both are valid per-city values at this staging layer
-- -- downstream models normalise to dim_city.city_code where a canonical join is
-- needed (see int_osm_poi_plr for Berlin's own 'BER' vs 'berlin' handling
-- precedent). Not touched here to avoid an unrelated Berlin-side migration.
--
-- Graceful-degradation: when NEITHER data/raw/osm/berlin/ NOR data/raw/osm/hamburg/
-- has parquet files, this model returns zero rows with the target schema so that
-- downstream models and uv run poe build continue to pass before data is ingested.
-- Each city's parquet set is independently optional -- Hamburg's absence does not
-- block Berlin's rows from flowing through, and vice versa.
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set berlin_osm_glob = var("project_root") ~ "/data/raw/osm/berlin/*.parquet" %}
{% set hamburg_osm_glob = var("project_root") ~ "/data/raw/osm/hamburg/*.parquet" %}

{% if execute %}
    {%- set berlin_count_result = run_query("SELECT count(*) FROM glob('" ~ berlin_osm_glob ~ "')") -%}
    {%- set berlin_file_count = berlin_count_result.columns[0][0] -%}
    {%- set hamburg_count_result = run_query("SELECT count(*) FROM glob('" ~ hamburg_osm_glob ~ "')") -%}
    {%- set hamburg_file_count = hamburg_count_result.columns[0][0] -%}
{% else %} {%- set berlin_file_count = 0 -%} {%- set hamburg_file_count = 0 -%}
{% endif %}

{% if berlin_file_count > 0 or hamburg_file_count > 0 %}

    with
        combined as (
            {% if berlin_file_count > 0 %}
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
                        '{{ berlin_osm_glob }}',
                        hive_partitioning = false,
                        union_by_name = true
                    )
            {% endif %}
            {% if berlin_file_count > 0 and hamburg_file_count > 0 %}
                union all
            {% endif %}
            {% if hamburg_file_count > 0 %}
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
                        '{{ hamburg_osm_glob }}',
                        hive_partitioning = false,
                        union_by_name = true
                    )
            {% endif %}
        )

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
    from combined

{% else %}

    -- Zero-row typed stub: no parquet files found for either city.
    -- Run ingestion/berlin/osm/ingest_osm_history.py to populate data/raw/osm/berlin/
    -- Run ingestion/hamburg/osm/ingest_hamburg_osm.py to populate data/raw/osm/hamburg/
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
