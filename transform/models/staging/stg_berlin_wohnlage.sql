-- stg_berlin_wohnlage.sql
-- Staging view over the Wohnlagen Mietspiegel back-series parquets produced by
-- ingestion/berlin/price_rent/ingest_wohnlage.py (D1, dl-de-zero-2.0).
--
-- Source: WFS GDI Berlin, Wohnlagen nach Adressen zum Berliner Mietspiegel
-- URL pattern: https://gdi.berlin.de/services/wfs/wohnlagenadr{year}
-- Feature type: wohnlagenadr{year}:wohnlagenadr{year}
-- CRS: EPSG:25833 (native, not reprojected)
-- Licence: dl-de-zero-2.0
-- All vintages confirmed live on GDI Berlin 2026-06-18.
--
-- Storage paths (gitignored per ADR-0008; rebuilt by the ingestion script):
-- data/raw/berlin/price_rent/wohnlage_2017.parquet  (Stichtag 01.09.2016)
-- data/raw/berlin/price_rent/wohnlage_2019.parquet  (Stichtag 01.09.2018)
-- data/raw/berlin/price_rent/wohnlage_2021.parquet  (Stichtag 01.09.2020)
-- data/raw/berlin/price_rent/wohnlage_2023.parquet  (Stichtag 01.09.2022)
-- data/raw/berlin/price_rent/wohnlage_2026.parquet  (Stichtag 01.09.2025)
--
-- QA-5 (#180): declared as source('raw_berlin', 'wohnlage') -- see
-- models/staging/_sources.yml. read_parquet() natively handles a glob
-- matching however many vintage files exist (equivalent to the old
-- per-vintage enumerate-and-UNION-ALL logic).
--
-- Graceful-degradation: returns zero rows with the target schema when no parquet
-- files have been ingested, so downstream models and uv run poe build pass before
-- data is downloaded.
--
-- Output columns:
-- vintage            integer  -- WFS edition year (2017/2019/2021/2023/2026)
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

{% set wohnlage_glob = raw_path("berlin/price_rent/wohnlage_*.parquet") %}
{%- set _src_raw_berlin_wohnlage = source("raw_berlin", "wohnlage") -%}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ wohnlage_glob ~ "')") -%}
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
    from read_parquet({{ _src_raw_berlin_wohnlage }}, union_by_name = true)
    where wohnlage is not null

{% else %}

    -- Zero-row typed stub: no wohnlage_{year}.parquet found.
    -- Run ingestion/berlin/price_rent/ingest_wohnlage.py to populate
    -- data/raw/berlin/price_rent/ (vintages 2017, 2019, 2021, 2023, 2026 available
    -- via WFS).
    select
        cast(null as integer) as vintage,
        cast(null as varchar) as city_code,
        cast(null as blob) as geometry_wkb,
        cast(null as varchar) as wohnlage,
        cast(null as varchar) as address_id,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
