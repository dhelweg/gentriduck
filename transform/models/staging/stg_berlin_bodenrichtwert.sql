-- stg_berlin_bodenrichtwert.sql
-- Staging view over the Bodenrichtwerte 2024 Parquet produced by
-- ingestion/berlin/price_rent/ingest_bodenrichtwerte.py (D1, dl-de-zero-2.0).
--
-- Source: WFS GDI Berlin, Bodenrichtwerte 2024
-- https://gdi.berlin.de/services/wfs/brw2024
-- Feature type: brw2024:brw_2024_vector
-- CRS: EPSG:25833 (native, not reprojected)
-- Licence: dl-de-zero-2.0
--
-- Storage path: data/raw/berlin/price_rent/bodenrichtwert_2024.parquet
-- (gitignored per ADR-0008; rebuilt by the ingestion script above).
--
-- Graceful-degradation: returns zero rows with the target schema when no
-- parquet file has been ingested, so downstream models and uv run poe build
-- continue to pass before data is downloaded.
--
-- Output columns:
-- reference_date     date     -- always 2024-01-01
-- city_code          varchar  -- always 'berlin' (ADR-0005)
-- geometry_wkb       blob     -- MultiPolygon WKB, EPSG:25833
-- brw_id             varchar  -- BRW zone identifier (brwid attribute)
-- value_eur_per_m2   double   -- Bodenrichtwert EUR/m2 (brw attribute)
-- nutzung            varchar  -- land use code (nutzung attribute)
-- source_attribution varchar  -- dl-de-zero-2.0 attribution
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set brw_parquet = var("project_root") ~ "/data/raw/berlin/price_rent/bodenrichtwert_2024.parquet" %}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ brw_parquet ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        reference_date,
        'berlin' as city_code,
        geometry_wkb,
        brw_id,
        value_eur_per_m2,
        nutzung,
        source_attribution
    from read_parquet('{{ brw_parquet }}')
    where brw_id is not null

{% else %}

    -- Zero-row typed stub: bodenrichtwert_2024.parquet not found.
    -- Run ingestion/berlin/price_rent/ingest_bodenrichtwerte.py to populate
    -- data/raw/berlin/price_rent/
    select
        cast(null as date) as reference_date,
        cast(null as varchar) as city_code,
        cast(null as blob) as geometry_wkb,
        cast(null as varchar) as brw_id,
        cast(null as double) as value_eur_per_m2,
        cast(null as varchar) as nutzung,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
