-- stg_berlin_mss.sql
-- ADR-0006: Berlin MSS WFS ingestion (dl-de-zero-2.0 licence)
-- Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin
-- Outcome variable for R-A1 re-grounding. One row per (edition, PLR).
--
-- Staging view over MSS (Monitoring Soziale Stadtentwicklung) Parquets produced
-- by ingestion/berlin/mss/ingest_mss.py. Each parquet file holds one biennial
-- MSS edition at PLR grain with Status-Index, Dynamik-Index, and Gesamtindex.
--
-- Storage path: data/raw/berlin/mss/mss_<YEAR>.parquet (gitignored, ADR-0001/A8)
-- Licence: dl-de-zero-2.0 (https://www.govdata.de/dl-de/zero-2-0)
--
-- Graceful-degradation: returns zero rows with the target schema when no parquet
-- files have been ingested, so dbt build passes before data is downloaded.
--
-- Column notes:
-- city_code    -- canonical 'BER' (ADR-0005; matches dim_city.city_code)
-- area_vintage -- LOR boundary vintage: 'lor_pre2021' (<=2019) or 'lor_2021' (>=2021)
-- area_code    -- PLR identifier zero-padded to 8 chars (matches stg_berlin_lor)
-- edition      -- MSS publication year (2013, 2015, 2017, 2019, 2021, 2023, 2025)
-- status_index -- 1=hoch, 2=mittel, 3=niedrig, 4=sehr niedrig (null=uninhabited PLR)
-- dynamik_index-- 1=positiv, 2=stabil, 3=negativ (normalised from WFS di_n {1,3,5})
-- gesamtindex  -- MSS 2-digit group code (11–45; null=uninhabited PLR)
--               tens=status (1–4), units=dynamik WFS code (1,3,5)
--               e.g. 23 = Status mittel + Dynamik stabil (12 distinct valid codes)
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set mss_glob = var("project_root") ~ "/data/raw/berlin/mss/mss_????.parquet" %}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ mss_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        'BER' as city_code,
        cast(lor_vintage as varchar) as area_vintage,
        cast(plr_id as varchar) as area_code,
        cast(plr_name as varchar) as area_name,
        cast(edition as integer) as edition,
        cast(status_index as integer) as status_index,
        cast(dynamik_index as integer) as dynamik_index,
        cast(gesamtindex as integer) as gesamtindex,
        cast(source_attribution as varchar) as source_attribution
    from read_parquet('{{ mss_glob }}', union_by_name = true)
    where plr_id is not null

{% else %}

    -- Zero-row typed stub: no MSS parquet files found.
    -- Run ingestion/berlin/mss/ingest_mss.py to populate data/raw/berlin/mss/
    select
        cast(null as varchar) as city_code,
        cast(null as varchar) as area_vintage,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_name,
        cast(null as integer) as edition,
        cast(null as integer) as status_index,
        cast(null as integer) as dynamik_index,
        cast(null as integer) as gesamtindex,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
