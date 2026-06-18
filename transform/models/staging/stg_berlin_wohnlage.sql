-- stg_berlin_wohnlage.sql
-- Staging view over the Wohnlagen Mietspiegel 2023 Parquet produced by
-- ingestion/berlin/price_rent/ingest_wohnlage.py (D1, dl-de-zero-2.0).
--
-- Source: WFS GDI Berlin, Wohnlagen nach Adressen zum Berliner Mietspiegel 2023
-- https://gdi.berlin.de/services/wfs/wohnlagenadr2023
-- Feature type: wohnlagenadr2023:wohnlagenadr2023
-- CRS: EPSG:25833 (native, not reprojected)
-- Licence: dl-de-zero-2.0
-- Total features: ~397,542 address-level points
--
-- Storage path: data/raw/berlin/price_rent/wohnlage_2023.parquet
-- (gitignored per ADR-0008; rebuilt by the ingestion script above).
-- NOTE: Full download takes 5-15 minutes (~796 WFS pages at 500 features/page).
--
-- Graceful-degradation: returns zero rows with the target schema when no
-- parquet file has been ingested, so downstream models and uv run poe build
-- continue to pass before data is downloaded.
--
-- Output columns:
-- vintage            integer  -- always 2023
-- city_code          varchar  -- always 'berlin' (ADR-0005)
-- geometry_wkb       blob     -- MultiPoint WKB, EPSG:25833
-- wohnlage           varchar  -- Wohnlage classification (wol attribute)
-- address_id         varchar  -- address/block identifier (schluessel attribute)
-- source_attribution varchar  -- dl-de-zero-2.0 attribution
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set wohnlage_parquet = var("project_root") ~ "/data/raw/berlin/price_rent/wohnlage_2023.parquet" %}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ wohnlage_parquet ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        vintage,
        'berlin' as city_code,
        geometry_wkb,
        wohnlage,
        address_id,
        source_attribution
    from read_parquet('{{ wohnlage_parquet }}')
    where wohnlage is not null

{% else %}

    -- Zero-row typed stub: wohnlage_2023.parquet not found.
    -- Run ingestion/berlin/price_rent/ingest_wohnlage.py to populate
    -- data/raw/berlin/price_rent/
    select
        cast(null as integer) as vintage,
        cast(null as varchar) as city_code,
        cast(null as blob) as geometry_wkb,
        cast(null as varchar) as wohnlage,
        cast(null as varchar) as address_id,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
