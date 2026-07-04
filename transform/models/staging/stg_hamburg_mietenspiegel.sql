-- stg_hamburg_mietenspiegel.sql
-- ADR-0014 Pillar 5: Hamburger Mietenspiegel (biennial rent-table matrix:
-- year-built x size x Wohnlage -> rent range), the direct analogue of
-- Berlin's stg_berlin_mietspiegel (Berliner Mietspiegeltabelle, ADR-0003
-- item 11). Companion dataset to stg_hamburg_wohnlage (the address/street
-- -> Wohnlage crosswalk).
--
-- Source: Hamburg Transparenzportal / geodienste.hamburg.de WFS,
-- "Hamburger Mietenspiegel" dataset (dl-de/by-2.0). See
-- ingestion/hamburg/rent/ingest_hamburg_rent.py module docstring for the
-- UNCONFIRMED-endpoint caveat (no live GetCapabilities probe performed in
-- this environment; same discipline as every other Hamburg-pillar
-- staging model). ADR-0014 notes machine-readable formats (GML/CSV/
-- GeoJSON/OGC API-Features/XML) are listed for this dataset, unlike
-- Berlin's Mietspiegeltabelle which required a PDF-only re-tabulation
-- path -- the WFS/GeoJSON path is tried first here; a PDF fallback
-- re-tabulation (mirroring ingest_mietspiegel.py) is NOT attempted in
-- this slice and remains an open follow-up if the machine-readable
-- formats prove incomplete at live ingestion.
--
-- PLUMBING, not methodology: a straight rent-table staging pull (no
-- weighting, scoring, index-construction, or cross-grain join to
-- statistische Gebiete/Stadtteile) -- not methodology-bearing under
-- CLAUDE.md's R-C1. Any future use of Hamburg rent data as a rent-index
-- or affordability sub-index input is an explicitly separate, gated
-- slice.
--
-- Deliberately preserves Hamburg's own year_built_bucket/size_bucket/
-- wohnlage labels as-published rather than remapping onto Berlin's
-- bucket keys in this staging layer (mirrors stg_hamburg_wohnlage's and
-- stg_hamburg_sozialmonitoring's decision not to invent a cross-city
-- mapping ahead of the methodology-gated integration slice).
--
-- Storage path: data/raw/hamburg/rent/mietenspiegel.parquet
--
-- Graceful-degradation: returns zero rows with the target schema when no
-- parquet file has been ingested, so downstream models and uv run poe
-- build continue to pass (docs/lessons/local-first-data-presence.md).
--
-- Output columns:
-- edition_year          integer -- Mietenspiegel edition year (biennial;
-- e.g. 2025)
-- city_code             varchar -- canonical 'HH' (ADR-0005)
-- year_built_bucket      varchar -- construction-period bucket, preserved
-- as-published (NOT remapped onto Berlin's
-- year_built_bucket keys)
-- size_bucket             varchar -- apartment-size bucket, preserved
-- as-published
-- wohnlage                varchar -- location tier, matching
-- stg_hamburg_wohnlage's label scheme
-- rent_low                 double, nullable -- lower rent-range bound
-- (EUR/sqm/month)
-- rent_mid                  double, nullable -- Mittelwert (EUR/sqm/month)
-- rent_high                 double, nullable -- upper rent-range bound
-- (EUR/sqm/month)
-- source_attribution        varchar -- dl-de/by-2.0 attribution
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set hh_mietenspiegel_glob = var("project_root") ~ "/data/raw/hamburg/rent/mietenspiegel.parquet" %}

{% if execute %}
    {%- set file_count_result = run_query(
        "SELECT count(*) FROM glob('" ~ hh_mietenspiegel_glob ~ "')"
    ) -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        edition_year,
        'HH' as city_code,
        year_built_bucket,
        size_bucket,
        wohnlage,
        rent_low,
        rent_mid,
        rent_high,
        source_attribution
    from read_parquet('{{ hh_mietenspiegel_glob }}', union_by_name = true)
    where edition_year is not null

{% else %}

    -- Zero-row typed stub: no Hamburg mietenspiegel.parquet found.
    -- Run ingestion/hamburg/rent/ingest_hamburg_rent.py to populate
    -- data/raw/hamburg/rent/
    select
        cast(null as integer) as edition_year,
        cast(null as varchar) as city_code,
        cast(null as varchar) as year_built_bucket,
        cast(null as varchar) as size_bucket,
        cast(null as varchar) as wohnlage,
        cast(null as double) as rent_low,
        cast(null as double) as rent_mid,
        cast(null as double) as rent_high,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
