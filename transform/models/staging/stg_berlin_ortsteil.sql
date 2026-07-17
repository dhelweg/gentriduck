-- stg_berlin_ortsteil.sql
-- #269 (I-ortsteile): staging view over the Ortsteil geometry parquet
-- produced by ingestion/berlin/ortsteile/ingest_ortsteil_geometries.py
-- (ADR-0003-governed gdi.berlin.de WFS infrastructure, ALKIS Berlin
-- Ortsteile layer, dl-de-zero-2.0).
--
-- Ortsteil is a NON-LOR Berlin administrative geography (96/97 Stadtteile,
-- legally defined Bezirk subdivisions, Berlin Bezirksverwaltungsgesetz Sec.2)
-- -- distinct from the Prognoseraum/Bezirksregion/Planungsraum ladder this
-- staging layer's LOR siblings (stg_berlin_lor / _bzr / _pgr) expose. See
-- ingest_ortsteil_geometries.py's module docstring for the area_code /
-- bezirk_code derivation from the source `sch` attribute.
--
-- Single current snapshot -- unlike stg_berlin_lor/_bzr/_pgr there is no
-- pre2021/2021 vintage split here (Ortsteil boundaries are not part of the
-- 2021 LOR reform), so there is no area_vintage column.
--
-- parent_area_code is populated here (unlike stg_berlin_lor/_bzr/_pgr, which
-- emit NULL and let dim_area_hierarchy derive the parent downstream): an
-- Ortsteil's Bezirk parent is a source-provided fact (the `sch` code's own
-- prefix), analogous to how stg_hamburg_geo passes through its
-- WFS-provided Bezirk parent code directly (see dim_area_hierarchy.sql's
-- Hamburg section) rather than deriving it. dim_area_hierarchy.sql still
-- does the actual edge-building (ortsteil -> bezirk), consistent with every
-- other level -- this column is exposed here so that model can read it
-- without a second staging join.
--
-- Ortsteil <-> PLR is explicitly NOT resolved here (and never will be via a
-- simple parent_area_code column): Ortsteile do not nest cleanly into PLRs,
-- so that relationship is a genuine area-overlap crosswalk, built separately
-- in int_berlin_plr_ortsteil_overlap.sql (methodology-bearing, geo-DS gated).
--
-- Graceful-degradation: returns zero rows with the target schema when no
-- parquet file has been ingested, so downstream models and `uv run poe
-- build` continue to pass (same pattern as every other stg_berlin_lor*
-- sibling).
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set ortsteil_glob = raw_path("berlin/ortsteile/*.parquet") %}
{%- set _src_raw_berlin_ortsteile = source("raw_berlin", "ortsteile") -%}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ ortsteil_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        'BER' as city_code,
        'ortsteil' as area_level,
        area_code,
        area_name,
        bezirk_code as parent_area_code,
        geometry_wkb,
        source_attribution
    from read_parquet({{ _src_raw_berlin_ortsteile }}, union_by_name = true)
    where area_code is not null and area_code ~ '^\d{4}$'

{% else %}

    -- Zero-row typed stub: no Ortsteil parquet file found.
    -- Run ingestion/berlin/ortsteile/ingest_ortsteil_geometries.py to populate
    -- data/raw/berlin/ortsteile/
    select
        cast(null as varchar) as city_code,
        cast(null as varchar) as area_level,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_name,
        cast(null as varchar) as parent_area_code,
        cast(null as blob) as geometry_wkb,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
