-- stg_berlin_lor.sql
-- Staging view over the LOR PLR geometry parquets produced by
-- ingestion/berlin/lor/ingest_lor_geometries.py (ADR-0003, WFS GDI Berlin,
-- CC BY 3.0 DE).
--
-- Storage path: data/raw/berlin/lor/{pre2021,lor_2021}.parquet
-- (ratified as the canonical path — see ADR-0003 implementation note).
--
-- Graceful-degradation: returns zero rows with the target schema when no
-- parquet files have been ingested, so downstream models and uv run poe build
-- continue to pass.
--
-- Column notes:
-- city_code    -- canonical 'BER' (ADR-0005; matches dim_city.city_code)
-- area_vintage -- LOR vintage discriminator: 'lor_pre2021' or 'lor_2021'
-- (renamed from parquet column 'vintage' for semantic clarity)
-- geometry_wkb -- raw WKB blob exposed for spatial join consumers
-- (int_osm_poi_plr uses ST_GeomFromWKB(geometry_wkb))
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set lor_glob = var("project_root") ~ "/data/raw/berlin/lor/*.parquet" %}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ lor_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        'BER' as city_code,
        vintage as area_vintage,
        'plr' as area_level,
        area_code,
        area_name,
        cast(null as varchar) as parent_area_code,
        geometry_wkb,
        source_attribution
    from read_parquet('{{ lor_glob }}', union_by_name = true)
    where area_code is not null and area_code ~ '^\d{8}$'

{% else %}

    -- Zero-row typed stub: no LOR parquet files found.
    -- Run ingestion/berlin/lor/ingest_lor_geometries.py to populate
    -- data/raw/berlin/lor/
    select
        cast(null as varchar) as city_code,
        cast(null as varchar) as area_vintage,
        cast(null as varchar) as area_level,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_name,
        cast(null as varchar) as parent_area_code,
        cast(null as blob) as geometry_wkb,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
