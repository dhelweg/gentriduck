-- stg_berlin_verkaufte_grundstuecke.sql
-- Staging view over the Kauffälle (Verkaufte Grundstücke) Parquet files produced by
-- ingestion/berlin/price_rent/ingest_kauffaelle.py (D1b, dl-de-zero-2.0).
--
-- Source: GDI Berlin OGC WFS, Kauffälle 2024 + 2025
--   Base URL: https://gdi.berlin.de/services/wfs/kauffaelle_{year}
--   9 sub-market layers per year (a_teileigen … i_mehrfamhaus)
--   CRS: EPSG:25833 (native, not reprojected)
--   Licence: Datenlizenz Deutschland — Zero — Version 2.0 (DL-Zero-2.0)
--   Publisher: Gutachterausschuss für Grundstückswerte in Berlin
--
-- WFS endpoint confirmed 2026-06-29: kauffaelle_2024 / kauffaelle_2025.
-- NOTE: only 2024 and 2025 are available; no WFS endpoint exists for earlier years.
-- Historical coverage gap must be disclosed in D2 source-completeness check and
-- on the G2 public methodology page.
--
-- Storage paths (gitignored per ADR-0008; rebuilt by the ingestion script):
--   data/raw/berlin/price_rent/kauffaelle_2024.parquet
--   data/raw/berlin/price_rent/kauffaelle_2025.parquet
--
-- Graceful-degradation: returns zero rows with the target schema when no parquet
-- files have been ingested, so downstream models and uv run poe build pass before
-- data is downloaded.
--
-- Output columns:
--   reference_date       date     -- YYYY-01-01 for the given year
--   city_code            varchar  -- always 'berlin' (ADR-0005)
--   teilmarkt            varchar  -- sub-market layer (e.g. 'c_eigentwhg')
--   geometry_wkb         blob     -- Point/geometry WKB, EPSG:25833
--   transaction_id       varchar  -- WFS feature ID
--   kaufpreis_eur        double   -- purchase price in EUR (null if not exposed by WFS)
--   flaeche_m2           double   -- plot/floor area in m2 (null if not exposed)
--   kauftyp              varchar  -- sub-market type string from WFS
--   raw_properties_json  varchar  -- full JSON of WFS properties for audit/schema discovery
--   source_attribution   varchar  -- DL-Zero-2.0 attribution
--
-- ADR-0003 Amendment P-D: Kauffälle as dynamism lead indicator — rent-gap realisation
-- (Smith) and ownership turnover preceding social succession (Dangschat). Transactions
-- are block-level; block→PLR interpolation is handled downstream with geo-DS sign-off
-- (see docs/adr/0003-berlin-geographies-and-open-price-rent-sources.md §Amendment P-D).
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set parquet_2024 = var("project_root") ~ "/data/raw/berlin/price_rent/kauffaelle_2024.parquet" %}
{% set parquet_2025 = var("project_root") ~ "/data/raw/berlin/price_rent/kauffaelle_2025.parquet" %}

{% if execute %}
    {%- set result_2024 = run_query("SELECT count(*) FROM glob('" ~ parquet_2024 ~ "')") -%}
    {%- set cnt_2024 = result_2024.columns[0][0] -%}
    {%- set result_2025 = run_query("SELECT count(*) FROM glob('" ~ parquet_2025 ~ "')") -%}
    {%- set cnt_2025 = result_2025.columns[0][0] -%}
{% else %}
    {%- set cnt_2024 = 0 -%}
    {%- set cnt_2025 = 0 -%}
{% endif %}

{% if cnt_2024 > 0 or cnt_2025 > 0 %}

    {% set sources = [] %}
    {% if cnt_2024 > 0 %}
        {%- do sources.append("read_parquet('" ~ parquet_2024 ~ "')") -%}
    {% endif %}
    {% if cnt_2025 > 0 %}
        {%- do sources.append("read_parquet('" ~ parquet_2025 ~ "')") -%}
    {% endif %}

    {% for src in sources %}
        select
            reference_date,
            city_code,
            teilmarkt,
            geometry_wkb,
            transaction_id,
            kaufpreis_eur,
            flaeche_m2,
            kauftyp,
            raw_properties_json,
            source_attribution
        from {{ src }}
        where transaction_id is not null
        {% if not loop.last %}union all{% endif %}
    {% endfor %}

{% else %}

    -- Zero-row typed stub: no kauffaelle_{year}.parquet found.
    -- Run ingestion/berlin/price_rent/ingest_kauffaelle.py to populate
    -- data/raw/berlin/price_rent/ (only 2024 and 2025 available via WFS).
    select
        cast(null as date)    as reference_date,
        cast(null as varchar) as city_code,
        cast(null as varchar) as teilmarkt,
        cast(null as blob)    as geometry_wkb,
        cast(null as varchar) as transaction_id,
        cast(null as double)  as kaufpreis_eur,
        cast(null as double)  as flaeche_m2,
        cast(null as varchar) as kauftyp,
        cast(null as varchar) as raw_properties_json,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
