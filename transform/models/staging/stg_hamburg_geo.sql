-- stg_hamburg_geo.sql
-- Staging view over the Hamburg geometry parquets (statistische Gebiete,
-- Stadtteile, Bezirke) produced by
-- ingestion/hamburg/geo/ingest_hamburg_geo.py (#40 H1, ADR-0014 Pillar 4:
-- LGV Hamburg WFS, dl-de/by-2.0).
--
-- Storage path: data/raw/hamburg/geo/{statgebiet,stadtteil,bezirk}.parquet
--
-- Graceful-degradation: returns zero rows with the target schema when no
-- parquet files have been ingested, so downstream models and uv run poe build
-- continue to pass (docs/lessons/local-first-data-presence.md).
--
-- Column notes (mirrors stg_berlin_lor's shape for the ADR-0005 seam):
-- city_code        -- canonical 'HH' (ADR-0005; matches dim_city.city_code)
-- area_vintage     -- 'current' for this first slice (the live WFS edition
-- at ingestion time). ADR-0014 flags a 943-vs-941
-- statistische-Gebiete vintage crosswalk as an open
-- question (mirrors Berlin LOR pre2021->2021); deferred
-- until a historical vintage is actually ingested.
-- area_level       -- generic dim_area levels per ADR-0014's mapping table:
-- 'district' (Bezirk, 7), 'subarea_l1' (Stadtteil, ~104),
-- 'subarea_l2' (statistisches Gebiet, ~945 -- the finest
-- grain, Hamburg's PLR analogue). Hamburg has one fewer
-- nested level than Berlin's PRG/BZR/PLR three-level
-- split; subarea_l3 is intentionally unused for Hamburg.
-- parent_area_code -- Bezirk code for Stadtteil rows; null for Bezirk and
-- statistisches-Gebiet rows (no parent join wired yet).
-- geometry_wkb     -- raw WKB blob, native CRS EPSG:25832 (NOT EPSG:25833
-- like Berlin -- see dim_city.native_crs_epsg, ADR-0014).
-- Not reprojected at ingestion, matching stg_berlin_lor's
-- convention (reprojection happens per-consumer).
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set hh_geo_glob = var("project_root") ~ "/data/raw/hamburg/geo/*.parquet" %}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ hh_geo_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        city_code,
        area_vintage,
        area_level,
        area_code,
        area_name,
        parent_area_code,
        geometry_wkb,
        source_attribution
    from read_parquet('{{ hh_geo_glob }}', union_by_name = true)
    where area_code is not null and city_code = 'HH'

{% else %}

    -- Zero-row typed stub: no Hamburg geo parquet files found.
    -- Run ingestion/hamburg/geo/ingest_hamburg_geo.py to populate
    -- data/raw/hamburg/geo/
    select
        cast(null as varchar) as city_code,
        cast(null as varchar) as area_vintage,
        cast(null as varchar) as area_level,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_name,
        cast(null as varchar) as parent_area_code,
        cast(null as blob) as geometry_wkb,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
