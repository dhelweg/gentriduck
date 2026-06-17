-- stg_berlin_ewr.sql
-- Staging view over annual EWR (Einwohnerregister) Parquet snapshots produced
-- by the C3b ingestion script.
--
-- Source: ingestion/berlin/ewr/ingest_ewr.py (ADR-0003, EWR per-PLR section)
-- "Einwohnerinnen und Einwohner in Berlin in LOR-Planungsraeumen am 31.12.YYYY"
-- Published by Amt fuer Statistik Berlin-Brandenburg (CC BY 3.0 DE) on
-- daten.berlin.de. One parquet per year under data/raw/berlin/ewr/<year>.parquet
-- (gitignored per ADR-0008). Run ingestion/berlin/ewr/ingest_ewr.py to populate.
--
-- Attribution (mandatory — CC BY 3.0 DE):
-- "Amt fuer Statistik Berlin-Brandenburg / Einwohnerregister
-- Berlin-Brandenburg (EWR), CC BY 3.0 DE —
-- https://www.statistik-berlin-brandenburg.de/"
-- Each parquet row carries source_attribution; the attribution page (Epic G3)
-- must surface this.
--
-- Graceful-degradation: when no parquet files exist under data/raw/berlin/ewr/
-- this model returns zero rows with the target schema so downstream models and
-- uv run poe build continue to pass before data is ingested.
--
-- Schema (long format, PLR grain):
-- city_code        varchar  — always 'berlin' (ADR-0005)
-- area_code        varchar  — PLR identifier (zero-padded to 8 chars)
-- area_vintage     varchar  — 'lor_pre2021' (<=2020) or 'lor_2021' (>=2021)
-- reference_year   integer  — calendar year of the 31-Dec snapshot
-- reference_date   date     — 31-Dec snapshot date (e.g. 2018-12-31)
-- indicator        varchar  — one of the 13 approved indicator keys
-- indicator_value  double   — computed share or count
-- source_attribution varchar — CC BY 3.0 DE attribution string
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set ewr_parquet_glob = var("project_root") ~ "/data/raw/berlin/ewr/*.parquet" %}

{% if execute %}
    {%- set file_count_result = run_query(
        "SELECT count(*) FROM glob('" ~ ewr_parquet_glob ~ "')"
    ) -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        city_code,
        area_code,
        area_vintage,
        reference_year,
        reference_date,
        indicator,
        indicator_value,
        source_attribution
    from
        read_parquet(
            '{{ ewr_parquet_glob }}', hive_partitioning = false, union_by_name = true
        )

{% else %}

    -- Zero-row typed stub: no parquet files found.
    -- Run ingestion/berlin/ewr/ingest_ewr.py to populate data/raw/berlin/ewr/
    select
        cast(null as varchar) as city_code,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_vintage,
        cast(null as integer) as reference_year,
        cast(null as date) as reference_date,
        cast(null as varchar) as indicator,
        cast(null as double) as indicator_value,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
