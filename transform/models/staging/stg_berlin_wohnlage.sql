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

{% set parquet_2017 = var("project_root") ~ "/data/raw/berlin/price_rent/wohnlage_2017.parquet" %}
{% set parquet_2019 = var("project_root") ~ "/data/raw/berlin/price_rent/wohnlage_2019.parquet" %}
{% set parquet_2021 = var("project_root") ~ "/data/raw/berlin/price_rent/wohnlage_2021.parquet" %}
{% set parquet_2023 = var("project_root") ~ "/data/raw/berlin/price_rent/wohnlage_2023.parquet" %}
{% set parquet_2026 = var("project_root") ~ "/data/raw/berlin/price_rent/wohnlage_2026.parquet" %}

{% if execute %}
    {%- set result_2017 = run_query("SELECT count(*) FROM glob('" ~ parquet_2017 ~ "')") -%}
    {%- set cnt_2017 = result_2017.columns[0][0] -%}
    {%- set result_2019 = run_query("SELECT count(*) FROM glob('" ~ parquet_2019 ~ "')") -%}
    {%- set cnt_2019 = result_2019.columns[0][0] -%}
    {%- set result_2021 = run_query("SELECT count(*) FROM glob('" ~ parquet_2021 ~ "')") -%}
    {%- set cnt_2021 = result_2021.columns[0][0] -%}
    {%- set result_2023 = run_query("SELECT count(*) FROM glob('" ~ parquet_2023 ~ "')") -%}
    {%- set cnt_2023 = result_2023.columns[0][0] -%}
    {%- set result_2026 = run_query("SELECT count(*) FROM glob('" ~ parquet_2026 ~ "')") -%}
    {%- set cnt_2026 = result_2026.columns[0][0] -%}
{% else %}
    {%- set cnt_2017 = 0 -%}
    {%- set cnt_2019 = 0 -%}
    {%- set cnt_2021 = 0 -%}
    {%- set cnt_2023 = 0 -%}
    {%- set cnt_2026 = 0 -%}
{% endif %}

{% if cnt_2017 > 0 or cnt_2019 > 0 or cnt_2021 > 0 or cnt_2023 > 0 or cnt_2026 > 0 %}

    {% set sources = [] %}
    {% if cnt_2017 > 0 %}
        {%- do sources.append({"parquet": parquet_2017, "year": 2017}) -%}
    {% endif %}
    {% if cnt_2019 > 0 %}
        {%- do sources.append({"parquet": parquet_2019, "year": 2019}) -%}
    {% endif %}
    {% if cnt_2021 > 0 %}
        {%- do sources.append({"parquet": parquet_2021, "year": 2021}) -%}
    {% endif %}
    {% if cnt_2023 > 0 %}
        {%- do sources.append({"parquet": parquet_2023, "year": 2023}) -%}
    {% endif %}
    {% if cnt_2026 > 0 %}
        {%- do sources.append({"parquet": parquet_2026, "year": 2026}) -%}
    {% endif %}

    {% for src in sources %}
        select
            vintage,
            'berlin' as city_code,
            geometry_wkb,
            wohnlage,
            address_id,
            source_attribution
        from read_parquet('{{ src.parquet }}')
        where wohnlage is not null
        {% if not loop.last %}
            union all
        {% endif %}
    {% endfor %}

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
