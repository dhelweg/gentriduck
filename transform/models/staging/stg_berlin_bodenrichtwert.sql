-- stg_berlin_bodenrichtwert.sql
-- Staging view over the Bodenrichtwerte back-series 2017–2024 Parquet files produced by
-- ingestion/berlin/price_rent/ingest_bodenrichtwerte.py (D1a, dl-de-zero-2.0).
--
-- Source: WFS GDI Berlin, Bodenrichtwerte 2017–2024
--   Base URL: https://gdi.berlin.de/services/wfs/brw{year}
--   Feature type: brw{year}:brw_{year}_vector
--   CRS: EPSG:25833 (native, not reprojected)
--   Licence: dl-de-zero-2.0
--   All years 2017–2024 confirmed live via HTTP 200 probe on 2026-06-29.
--
-- Storage paths (gitignored per ADR-0008; rebuilt by the ingestion script):
--   data/raw/berlin/price_rent/bodenrichtwert_2017.parquet
--   data/raw/berlin/price_rent/bodenrichtwert_2018.parquet
--   data/raw/berlin/price_rent/bodenrichtwert_2019.parquet
--   data/raw/berlin/price_rent/bodenrichtwert_2020.parquet
--   data/raw/berlin/price_rent/bodenrichtwert_2021.parquet
--   data/raw/berlin/price_rent/bodenrichtwert_2022.parquet
--   data/raw/berlin/price_rent/bodenrichtwert_2023.parquet
--   data/raw/berlin/price_rent/bodenrichtwert_2024.parquet
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

{% set parquet_2017 = var("project_root") ~ "/data/raw/berlin/price_rent/bodenrichtwert_2017.parquet" %}
{% set parquet_2018 = var("project_root") ~ "/data/raw/berlin/price_rent/bodenrichtwert_2018.parquet" %}
{% set parquet_2019 = var("project_root") ~ "/data/raw/berlin/price_rent/bodenrichtwert_2019.parquet" %}
{% set parquet_2020 = var("project_root") ~ "/data/raw/berlin/price_rent/bodenrichtwert_2020.parquet" %}
{% set parquet_2021 = var("project_root") ~ "/data/raw/berlin/price_rent/bodenrichtwert_2021.parquet" %}
{% set parquet_2022 = var("project_root") ~ "/data/raw/berlin/price_rent/bodenrichtwert_2022.parquet" %}
{% set parquet_2023 = var("project_root") ~ "/data/raw/berlin/price_rent/bodenrichtwert_2023.parquet" %}
{% set parquet_2024 = var("project_root") ~ "/data/raw/berlin/price_rent/bodenrichtwert_2024.parquet" %}

{% if execute %}
    {%- set result_2017 = run_query("SELECT count(*) FROM glob('" ~ parquet_2017 ~ "')") -%}
    {%- set cnt_2017 = result_2017.columns[0][0] -%}
    {%- set result_2018 = run_query("SELECT count(*) FROM glob('" ~ parquet_2018 ~ "')") -%}
    {%- set cnt_2018 = result_2018.columns[0][0] -%}
    {%- set result_2019 = run_query("SELECT count(*) FROM glob('" ~ parquet_2019 ~ "')") -%}
    {%- set cnt_2019 = result_2019.columns[0][0] -%}
    {%- set result_2020 = run_query("SELECT count(*) FROM glob('" ~ parquet_2020 ~ "')") -%}
    {%- set cnt_2020 = result_2020.columns[0][0] -%}
    {%- set result_2021 = run_query("SELECT count(*) FROM glob('" ~ parquet_2021 ~ "')") -%}
    {%- set cnt_2021 = result_2021.columns[0][0] -%}
    {%- set result_2022 = run_query("SELECT count(*) FROM glob('" ~ parquet_2022 ~ "')") -%}
    {%- set cnt_2022 = result_2022.columns[0][0] -%}
    {%- set result_2023 = run_query("SELECT count(*) FROM glob('" ~ parquet_2023 ~ "')") -%}
    {%- set cnt_2023 = result_2023.columns[0][0] -%}
    {%- set result_2024 = run_query("SELECT count(*) FROM glob('" ~ parquet_2024 ~ "')") -%}
    {%- set cnt_2024 = result_2024.columns[0][0] -%}
{% else %}
    {%- set cnt_2017 = 0 -%}
    {%- set cnt_2018 = 0 -%}
    {%- set cnt_2019 = 0 -%}
    {%- set cnt_2020 = 0 -%}
    {%- set cnt_2021 = 0 -%}
    {%- set cnt_2022 = 0 -%}
    {%- set cnt_2023 = 0 -%}
    {%- set cnt_2024 = 0 -%}
{% endif %}

{% if cnt_2017 > 0 or cnt_2018 > 0 or cnt_2019 > 0 or cnt_2020 > 0 or cnt_2021 > 0 or cnt_2022 > 0 or cnt_2023 > 0 or cnt_2024 > 0 %}

    {% set sources = [] %}
    {% if cnt_2017 > 0 %}
        {%- do sources.append("read_parquet('" ~ parquet_2017 ~ "')") -%}
    {% endif %}
    {% if cnt_2018 > 0 %}
        {%- do sources.append("read_parquet('" ~ parquet_2018 ~ "')") -%}
    {% endif %}
    {% if cnt_2019 > 0 %}
        {%- do sources.append("read_parquet('" ~ parquet_2019 ~ "')") -%}
    {% endif %}
    {% if cnt_2020 > 0 %}
        {%- do sources.append("read_parquet('" ~ parquet_2020 ~ "')") -%}
    {% endif %}
    {% if cnt_2021 > 0 %}
        {%- do sources.append("read_parquet('" ~ parquet_2021 ~ "')") -%}
    {% endif %}
    {% if cnt_2022 > 0 %}
        {%- do sources.append("read_parquet('" ~ parquet_2022 ~ "')") -%}
    {% endif %}
    {% if cnt_2023 > 0 %}
        {%- do sources.append("read_parquet('" ~ parquet_2023 ~ "')") -%}
    {% endif %}
    {% if cnt_2024 > 0 %}
        {%- do sources.append("read_parquet('" ~ parquet_2024 ~ "')") -%}
    {% endif %}

    {% for src in sources %}
        select
            reference_date,
            'berlin' as city_code,
            geometry_wkb,
            brw_id,
            value_eur_per_m2,
            nutzung,
            source_attribution
        from {{ src }}
        where brw_id is not null
        {% if not loop.last %}union all{% endif %}
    {% endfor %}

{% else %}

    -- Zero-row typed stub: no bodenrichtwert_{year}.parquet found.
    -- Run ingestion/berlin/price_rent/ingest_bodenrichtwerte.py to populate
    -- data/raw/berlin/price_rent/ (years 2017–2024 available via WFS).
    select
        cast(null as date)    as reference_date,
        cast(null as varchar) as city_code,
        cast(null as blob)    as geometry_wkb,
        cast(null as varchar) as brw_id,
        cast(null as double)  as value_eur_per_m2,
        cast(null as varchar) as nutzung,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
