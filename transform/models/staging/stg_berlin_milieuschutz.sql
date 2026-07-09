-- stg_berlin_milieuschutz.sql
-- R-B1 (#70 [B1]) / ADR-0019 -- Berlin Milieuschutz (soziale
-- Erhaltungsverordnung, Sec. 172 Abs. 1 Nr. 2 BauGB) designated-area
-- polygons. Direct legal analogue of Hamburg's stg_hamburg_displacement_zones
-- (ADR-0014 Pillar 4) -- same statute, same staging shape, for the
-- ADR-0005 city-agnostic seam.
--
-- PLUMBING, not methodology: a straight polygon-attribute staging pull
-- (boundary + designation name + Bezirk + effective date + area size). No
-- weighting, scoring, or index-construction logic -- not methodology-bearing
-- under CLAUDE.md's R-C1. Any future use as an input to a
-- displacement/affordability sub-index (#70's eventual scope) is an
-- explicitly separate, gated slice (ADR-0019 Decision 2) requiring
-- geo-data-scientist + gentrification-domain-expert sign-off.
--
-- Zero consumers as of this writing (mirrors QA-6/#181's treatment of the
-- Hamburg equivalent) -- the consuming intermediate/sub-index slice is a
-- separate, gated follow-up under #70.
--
-- Source: GDI Berlin WFS (erhaltungsverordnungsgebiete:erhaltgeb_em),
-- dl-de-zero-2.0. Only the *social* designation (Abs. 1 Nr. 2) is ingested;
-- the sibling *townscape* designation (erhaltgeb_es, Abs. 1 Nr. 1) is
-- deliberately excluded -- see ingest_milieuschutz.py / ADR-0019 Decision 1.
--
-- Storage path (gitignored, ADR-0008; rebuilt by
-- ingestion/berlin/displacement/ingest_milieuschutz.py):
-- data/raw/berlin/displacement/milieuschutz.parquet
--
-- Graceful-degradation: returns zero rows with the target schema when no
-- parquet file has been ingested, so downstream models and
-- uv run poe build continue to pass (docs/lessons/local-first-data-presence.md).
--
-- Output columns:
-- city_code          varchar  -- canonical 'berlin' (ADR-0005)
-- area_code          varchar  -- natural key / schluessel attribute, e.g. "EM0105".
-- Does NOT join to stg_berlin_lor.area_code directly (a
-- Milieuschutz boundary is its own bespoke polygon, not a
-- PLR aggregate) -- any spatial join to dim_area grain is a
-- downstream int_*-model decision.
-- area_name          varchar  -- designation name (e.g. "Sparrplatz").
-- bezirk_name        varchar  -- informational Bezirk the area sits in; NOT a join key.
-- in_force_date      varchar  -- date the designation took effect (f_in_kraft), if
-- published.
-- area_ha            varchar  -- area in hectares, as-published (string; cast
-- to numeric downstream if/when a consumer needs it).
-- geometry_wkb       blob     -- designated-area polygon, WKB, native CRS EPSG:25833.
-- source_attribution varchar  -- dl-de-zero-2.0 attribution.
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set milieuschutz_glob = raw_path("berlin/displacement/milieuschutz.parquet") %}
{%- set _src_raw_berlin_milieuschutz = source("raw_berlin", "milieuschutz") -%}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ milieuschutz_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        city_code,
        area_code,
        area_name,
        bezirk_name,
        in_force_date,
        area_ha,
        geometry_wkb,
        source_attribution
    from read_parquet({{ _src_raw_berlin_milieuschutz }}, union_by_name = true)
    where area_code is not null and city_code = 'berlin'

{% else %}

    -- Zero-row typed stub: no milieuschutz.parquet found.
    -- Run ingestion/berlin/displacement/ingest_milieuschutz.py to populate
    -- data/raw/berlin/displacement/
    select
        cast(null as varchar) as city_code,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_name,
        cast(null as varchar) as bezirk_name,
        cast(null as varchar) as in_force_date,
        cast(null as varchar) as area_ha,
        cast(null as blob) as geometry_wkb,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
