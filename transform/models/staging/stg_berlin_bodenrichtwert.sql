-- stg_berlin_bodenrichtwert.sql
-- Staging view over the Bodenrichtwerte back-series 2017–2024 Parquet files produced by
-- ingestion/berlin/price_rent/ingest_bodenrichtwerte.py (D1a, dl-de-zero-2.0).
--
-- Source: WFS GDI Berlin, Bodenrichtwerte 2017–2024
-- Base URL: https://gdi.berlin.de/services/wfs/brw{year}
-- Feature type: brw{year}:brw_{year}_vector
-- CRS: EPSG:25833 (native, not reprojected)
-- Licence: dl-de-zero-2.0
-- All years 2017–2024 confirmed live via HTTP 200 probe on 2026-06-29.
--
-- Storage paths (gitignored per ADR-0008; rebuilt by the ingestion script):
-- data/raw/berlin/price_rent/bodenrichtwert_2017.parquet
-- data/raw/berlin/price_rent/bodenrichtwert_2018.parquet
-- data/raw/berlin/price_rent/bodenrichtwert_2019.parquet
-- data/raw/berlin/price_rent/bodenrichtwert_2020.parquet
-- data/raw/berlin/price_rent/bodenrichtwert_2021.parquet
-- data/raw/berlin/price_rent/bodenrichtwert_2022.parquet
-- data/raw/berlin/price_rent/bodenrichtwert_2023.parquet
-- data/raw/berlin/price_rent/bodenrichtwert_2024.parquet
--
-- QA-5 (#180): declared as source('raw_berlin', 'bodenrichtwert') -- see
-- models/staging/_sources.yml. read_parquet() natively handles a glob
-- matching however many yearly files exist (equivalent to the old
-- per-year enumerate-and-UNION-ALL logic, since a missing year's file is
-- simply absent from the glob match rather than erroring).
--
-- Graceful-degradation: returns zero rows with the target schema when no parquet
-- files have been ingested, so downstream models and uv run poe build pass before
-- data is downloaded.
--
-- Output columns:
-- reference_date     date     -- YYYY-01-01 for the given year
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

{% set brw_glob = raw_path("berlin/price_rent/bodenrichtwert_*.parquet") %}
{%- set _src_raw_berlin_bodenrichtwert = source("raw_berlin", "bodenrichtwert") -%}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ brw_glob ~ "')") -%}
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
    from read_parquet({{ _src_raw_berlin_bodenrichtwert }}, union_by_name = true)
    where brw_id is not null

{% else %}

    -- Zero-row typed stub: no bodenrichtwert_{year}.parquet found.
    -- Run ingestion/berlin/price_rent/ingest_bodenrichtwerte.py to populate
    -- data/raw/berlin/price_rent/ (years 2017–2024 available via WFS).
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
