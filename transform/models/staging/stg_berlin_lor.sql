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
-- NOTE: dim_area currently sources PLR rows only from int_thesis_2018_area_index
-- (2018 thesis golden). Wiring stg_berlin_lor into dim_area so that OSM-style
-- 8-digit zero-padded WFS area_codes appear in the dimension is deferred to a
-- follow-up issue (stg_berlin_lor + dim_area wiring). Until then the relationships
-- test on int_osm_poi_plr.area_code fires as a warn-severity signal.
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
        'berlin' as city_code,
        vintage as lor_vintage,
        'plr' as area_level,
        area_code,
        area_name,
        cast(null as varchar) as parent_area_code,
        cast(null as varchar) as geometry_wkt,
        source_attribution
    from read_parquet('{{ lor_glob }}', union_by_name = true)
    where area_code is not null and area_code ~ '^\d{8}$'

{% else %}

    -- Zero-row typed stub: no LOR parquet files found.
    -- Run ingestion/berlin/lor/ingest_lor_geometries.py to populate
    -- data/raw/berlin/lor/
    select
        cast(null as varchar) as city_code,
        cast(null as varchar) as lor_vintage,
        cast(null as varchar) as area_level,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_name,
        cast(null as varchar) as parent_area_code,
        cast(null as varchar) as geometry_wkt,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
