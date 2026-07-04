-- stg_hamburg_displacement_zones.sql
-- ADR-0014 Pillar 4: Hamburg "Soziale Erhaltungsverordnungen — Gebiete in
-- Hamburg" (dl-de/by-2.0). Direct legal analogue of Berlin's Milieuschutz
-- areas (§172 BauGB soziale Erhaltungssatzung) — the same statute
-- underlying both cities' designations. Berlin's own equivalent staging
-- (mirrors #70 [B1] Milieuschutz, currently `blocked` pending an architect
-- ADR + maintainer source approval for FIS-Broker) has NOT landed yet;
-- this Hamburg pillar uses a different, already-ADR-0014-approved source
-- (Transparenzportal, dl-de/by-2.0) and does not depend on #70's
-- resolution.
--
-- PLUMBING, not methodology: a straight polygon-attribute staging pull
-- (boundary + designation name + in-force date). No weighting, scoring,
-- or index-construction logic — not methodology-bearing under CLAUDE.md's
-- R-C1. Any future use as an input to a displacement/affordability
-- sub-index (mirroring #70's eventual scope) is an explicitly separate,
-- gated slice with its own geo-DS + domain-expert sign-off.
--
-- Staging view over the parquet produced by
-- ingestion/hamburg/displacement/ingest_hamburg_displacement.py.
--
-- Storage path: data/raw/hamburg/displacement/erhaltungsverordnung.parquet
--
-- Graceful-degradation: returns zero rows with the target schema when no
-- parquet file has been ingested, so downstream models and uv run poe
-- build continue to pass (docs/lessons/local-first-data-presence.md).
--
-- Column notes (mirrors stg_hamburg_geo's shape for the ADR-0005 seam):
-- city_code        -- canonical 'HH' (ADR-0005; matches dim_city.city_code)
-- area_code        -- natural key / feature id for the designated area.
-- Does NOT join to stg_hamburg_geo.area_code directly (an
-- Erhaltungsverordnung boundary is its own bespoke polygon,
-- not a statistisches-Gebiet aggregate) -- any spatial join
-- to dim_area grain is a downstream int_*-model decision.
-- area_name        -- human-readable designation name (e.g. "Sternschanze").
-- bezirk_name      -- informational Bezirk the area sits in; NOT a join key.
-- in_force_date    -- ISO date string the Erhaltungsverordnung took effect,
-- if published (ADR-0014 open question #4 -- confirm this
-- attribute exists per area at real ingestion; null rather
-- than fabricated if the source omits it for a given area).
-- geometry_wkb     -- raw WKB blob, native CRS EPSG:25832 (NOT EPSG:25833
-- like Berlin -- see dim_city.native_crs_epsg, ADR-0014).
-- Not reprojected at ingestion, matching stg_hamburg_geo's
-- convention (reprojection happens per-consumer).
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set hh_displacement_glob = var("project_root") ~ "/data/raw/hamburg/displacement/*.parquet" %}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ hh_displacement_glob ~ "')") -%}
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
        geometry_wkb,
        source_attribution
    from read_parquet('{{ hh_displacement_glob }}', union_by_name = true)
    where area_code is not null and city_code = 'HH'

{% else %}

    -- Zero-row typed stub: no Hamburg displacement-zone parquet found.
    -- Run ingestion/hamburg/displacement/ingest_hamburg_displacement.py to
    -- populate data/raw/hamburg/displacement/
    select
        cast(null as varchar) as city_code,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_name,
        cast(null as varchar) as bezirk_name,
        cast(null as varchar) as in_force_date,
        cast(null as blob) as geometry_wkb,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
