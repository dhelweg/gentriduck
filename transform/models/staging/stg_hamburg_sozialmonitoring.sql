-- stg_hamburg_sozialmonitoring.sql
-- ADR-0014 Pillar 2: Hamburg Sozialmonitoring Integrierte Stadtteilentwicklung
-- (dl-de/by-2.0), Behörde für Stadtentwicklung und Wohnen (BSW).
-- Direct conceptual analogue of stg_berlin_mss (ADR-0006): Status-Index x
-- Dynamik-Index -> Gesamtindex. This is the **outcome / ground-truth**
-- variable for R-A1-style re-grounding, never a predictor (ADR-0014
-- Pillar-2 "role discipline", mirrors ADR-0006 decision 6) — do not let
-- Hamburg POI dynamism or the EWR-equivalent predictors (Pillar 3) leak
-- into this model.
--
-- Staging view over the Sozialmonitoring parquet produced by
-- ingestion/hamburg/sozialmonitoring/ingest_hamburg_sozialmonitoring.py.
-- One row per (edition, statistisches Gebiet). Editions: annual 2013-2025
-- (NOT biennial like Berlin's MSS — ADR-0014 Pillar-2 cadence note; finer
-- lead-lag resolution than Berlin's pipeline).
--
-- Storage path: data/raw/hamburg/sozialmonitoring/sozialmonitoring.parquet
-- (gitignored, ADR-0001/A8).
-- Licence: dl-de/by-2.0 (attribution required; see source_attribution column).
--
-- Graceful-degradation: returns zero rows with the target schema when no
-- parquet file has been ingested, so dbt build passes before data is
-- downloaded (docs/lessons/local-first-data-presence.md).
--
-- Column notes:
-- city_code          -- canonical 'HH' (ADR-0005; matches dim_city.city_code)
-- edition            -- Sozialmonitoring publication year (jahr, 2013-2025)
-- area_code          -- statistisches-Gebiet id ('statgeb'); joins to
-- stg_hamburg_geo.area_code where area_level='subarea_l2'
-- stadtteil_name     -- informational Stadtteil name; NOT a join key (the
-- Stadtteil grain lives in stg_hamburg_geo separately)
-- population         -- 'bevoelkerung'; the source's own >300-residents
-- scoring threshold is already applied upstream — a
-- gebiet below it is simply absent for that year, not
-- present-with-nulls (unlike Berlin MSS's -9999 sentinel)
-- status_index       -- Hamburg's own text-coded ordinal label:
-- 'hoch'|'mittel'|'niedrig'|'sehr niedrig'. NOT
-- remapped to Berlin's 1-4 integer scale here — see
-- the ingestion script docstring: any ordinal-to-
-- numeric encoding for cross-city comparison is a
-- methodology decision (R-C1) for a downstream
-- int_*-equivalent Hamburg model, not this staging layer.
-- dynamik_index      -- 'positiv'|'stabil'|'negativ'. Analogous meaning to
-- Berlin's mapped 1/2/3 but computed over Hamburg's
-- 3-year change window vs Berlin's 2-year (ADR-0014
-- Pillar-2 non-equivalence note) — do not treat
-- Dynamik *magnitude* as directly comparable across
-- the two cities without accounting for this.
-- gesamtindex_label  -- source's own free-text composite label (e.g.
-- "Status mittel - Dynamik 0"); Hamburg does not
-- publish Berlin's compact 2-digit numeric code, so
-- no equivalent gesamtindex integer is fabricated.
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set hh_sozmon_glob = var("project_root") ~ "/data/raw/hamburg/sozialmonitoring/*.parquet" %}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ hh_sozmon_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        cast(city_code as varchar) as city_code,
        cast(edition as integer) as edition,
        cast(area_code as varchar) as area_code,
        cast(stadtteil_name as varchar) as stadtteil_name,
        cast(population as integer) as population,
        cast(status_index as varchar) as status_index,
        cast(dynamik_index as varchar) as dynamik_index,
        cast(gesamtindex_label as varchar) as gesamtindex_label,
        cast(source_attribution as varchar) as source_attribution
    from read_parquet('{{ hh_sozmon_glob }}', union_by_name = true)
    where area_code is not null

{% else %}

    -- Zero-row typed stub: no Sozialmonitoring parquet found.
    -- Run ingestion/hamburg/sozialmonitoring/ingest_hamburg_sozialmonitoring.py
    -- to populate data/raw/hamburg/sozialmonitoring/
    select
        cast(null as varchar) as city_code,
        cast(null as integer) as edition,
        cast(null as varchar) as area_code,
        cast(null as varchar) as stadtteil_name,
        cast(null as integer) as population,
        cast(null as varchar) as status_index,
        cast(null as varchar) as dynamik_index,
        cast(null as varchar) as gesamtindex_label,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
