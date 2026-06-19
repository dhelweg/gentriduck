-- stg_berlin_mss_indicators.sql
-- ADR-0007: Berlin MSS indexind WFS — SES indicators per PLR (dl-de-zero-2.0)
-- Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin
-- Continuous SES predictor inputs for R-A1 index re-grounding.
--
-- Staging view over MSS indexind Parquet files produced by
-- ingestion/berlin/mss/ingest_mss_indicators.py. Each parquet file holds one
-- biennial MSS edition in long format: one row per (edition, PLR, indicator).
--
-- Storage path: data/raw/berlin/mss/mss_<YEAR>_indicators.parquet (gitignored, ADR-0001/A8)
-- Licence: dl-de-zero-2.0 (https://www.govdata.de/dl-de/zero-2-0)
--
-- Graceful-degradation: returns zero rows with the target schema when no parquet
-- files have been ingested, so dbt build passes before data is downloaded.
--
-- Column notes:
-- city_code      -- canonical 'BER' (ADR-0005; matches dim_city.city_code)
-- edition        -- MSS publication year (2013, 2015, 2017, 2019, 2021, 2023, 2025)
-- area_code      -- PLR identifier zero-padded to 8 chars (matches stg_berlin_lor)
-- area_name      -- Human-readable Planungsraum name (German proper noun from WFS)
-- area_vintage   -- LOR boundary vintage: 'lor_pre2021' (<=2019) or 'lor_2021' (>=2021)
-- indicator      -- Canonical snake_case indicator name (e.g. arbeitslose_anteil)
--                   Status indicators: arbeitslose_anteil, transferbezug_anteil,
--                                      kinderarmut_anteil, alleinerziehende_anteil
--                   Dynamik indicators: arbeitslose_dynamik, transferbezug_dynamik,
--                                       kinderarmut_dynamik, alleinerziehende_dynamik
--                   transferbezug_* has null values in editions <=2021 (WFS column s2_x)
-- value          -- Float indicator value (null for uninhabited PLRs or suspended cols)
-- source_attribution -- dl-de-zero-2.0 attribution string
-- raw_attr is intentionally excluded from this view; it is written to the raw
-- Parquet files for traceability (e.g. 's2_x' vs 's2' per edition) and can be
-- queried directly via DuckDB on data/raw/berlin/mss/*_indicators.parquet.
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set ind_glob = var("project_root") ~ "/data/raw/berlin/mss/*_indicators.parquet" %}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ ind_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        'BER' as city_code,
        cast(edition as integer) as edition,
        cast(plr_id as varchar) as area_code,
        cast(plr_name as varchar) as area_name,
        cast(lor_vintage as varchar) as area_vintage,
        cast(indicator as varchar) as indicator,
        cast(value as double) as indicator_value,
        cast(source_attribution as varchar) as source_attribution
    from read_parquet('{{ ind_glob }}', union_by_name = true)
    where plr_id is not null

{% else %}

    -- Zero-row typed stub: no MSS indicators parquet files found.
    -- Run ingestion/berlin/mss/ingest_mss_indicators.py to populate data/raw/berlin/mss/
    select
        cast(null as varchar) as city_code,
        cast(null as integer) as edition,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_name,
        cast(null as varchar) as area_vintage,
        cast(null as varchar) as indicator,
        cast(null as double) as indicator_value,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
