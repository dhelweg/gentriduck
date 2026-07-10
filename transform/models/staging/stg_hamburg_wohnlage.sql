-- stg_hamburg_wohnlage.sql
-- ADR-0014 Pillar 5: Hamburg "Wohnlagenverzeichnis" (address/street ->
-- Wohnlage location-quality tier crosswalk), the direct analogue of
-- Berlin's stg_berlin_wohnlage (Wohnlagen nach Adressen zum Berliner
-- Mietspiegel, ADR-0003). Companion dataset to stg_hamburg_mietenspiegel
-- (the rent-table matrix itself).
--
-- Source: Hamburg Transparenzportal / geodienste.hamburg.de WFS,
-- "Hamburger Mietenspiegel" dataset family (dl-de/by-2.0). See
-- ingestion/hamburg/rent/ingest_hamburg_rent.py module docstring for the
-- UNCONFIRMED-endpoint caveat (no live GetCapabilities probe performed in
-- this environment; same discipline as every other Hamburg-pillar
-- staging model).
--
-- PLUMBING, not methodology: a straight address/street-attribute staging
-- pull (Wohnlage classification label, publisher-supplied Stadtteil name,
-- and optional geometry). No weighting, scoring, or index-construction
-- logic -- not methodology-bearing under CLAUDE.md's R-C1. The `stadtteil`
-- passthrough column below is a raw source attribute (the publisher
-- already stamps each address with its containing Stadtteil name), not a
-- computed cross-grain join -- exposing it here stays plumbing; USING it
-- to key a spatial/statistical composite is the methodology-bearing step,
-- done downstream in int_hamburg_wohnlage_stadtteil (#203).
--
-- QA-6 (#181): #203 [H-C5] is the first consumer (int_hamburg_wohnlage_stadtteil).
--
-- Deliberately preserves Hamburg's own Wohnlage label scheme as-published
-- rather than remapping onto Berlin's einfach/mittel/gut scale in this
-- staging layer (mirrors stg_hamburg_sozialmonitoring's decision not to
-- invent a cross-city mapping ahead of the methodology-gated integration
-- slice).
--
-- Storage path: data/raw/hamburg/rent/wohnlage.parquet
--
-- Graceful-degradation: returns zero rows with the target schema when no
-- parquet file has been ingested, so downstream models and uv run poe
-- build continue to pass (docs/lessons/local-first-data-presence.md).
--
-- Output columns:
-- city_code           varchar -- canonical 'HH' (ADR-0005)
-- address_id           varchar -- natural key / feature id for the address
-- or street segment (schema TBC at live probe)
-- street_name           varchar, nullable -- street name, if published at
-- street rather than address grain
-- stadtteil             varchar -- publisher-supplied Stadtteil name for this
-- address (raw passthrough attribute; matched
-- 1:1 against stg_hamburg_geo.area_name for
-- area_level='subarea_l1' at 100% row coverage
-- -- verified #203). Not a computed join.
-- wohnlage              varchar -- Hamburg's own location-quality tier label
-- (NOT assumed identical to Berlin's
-- einfach/mittel/gut scheme). Live schema
-- confirmed two-tier ('Gute Wohnlage',
-- 'Normale Wohnlage'), not Berlin's three-tier
-- einfach/mittel/gut scheme (#203).
-- geometry_wkb          blob, nullable -- address/street geometry WKB, native
-- CRS EPSG:25832 (NOT reprojected; matches
-- stg_hamburg_geo's convention)
-- source_attribution    varchar -- dl-de/by-2.0 attribution
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set hh_wohnlage_glob = raw_path("hamburg/rent/wohnlage.parquet") %}
{%- set _src_raw_hamburg_wohnlage = source("raw_hamburg", "wohnlage") -%}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ hh_wohnlage_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        city_code,
        address_id,
        street_name,
        stadtteil,
        wohnlage,
        geometry_wkb,
        source_attribution
    from read_parquet({{ _src_raw_hamburg_wohnlage }}, union_by_name = true)
    where wohnlage is not null and city_code = 'HH'

{% else %}

    -- Zero-row typed stub: no Hamburg wohnlage.parquet found.
    -- Run ingestion/hamburg/rent/ingest_hamburg_rent.py to populate
    -- data/raw/hamburg/rent/
    select
        cast(null as varchar) as city_code,
        cast(null as varchar) as address_id,
        cast(null as varchar) as street_name,
        cast(null as varchar) as stadtteil,
        cast(null as varchar) as wohnlage,
        cast(null as blob) as geometry_wkb,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
