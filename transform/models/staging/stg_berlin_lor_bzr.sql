-- stg_berlin_lor_bzr.sql
-- Staging view over the LOR Bezirksregion (BZR) geometry parquets produced by
-- ingestion/berlin/lor/ingest_lor_geometries.py (ADR-0003, WFS GDI Berlin,
-- CC BY 3.0 DE). Sibling of stg_berlin_lor.sql (PLR grain) -- see that model's
-- header for the PLR-level equivalent.
--
-- Added in #134 (bug fix): the 2018-thesis-golden CSV's `raum_desc` column for
-- BZR-level rows is corrupted at the source file (literal '?' bytes replacing
-- German umlauts/ß -- confirmed by inspecting the raw CSV bytes; NOT a DuckDB
-- read_csv `encoding` bug). The GDI Berlin WFS gives correctly-encoded (UTF-8)
-- BZR names for the same area_codes, so dim_area.sql's existing
-- WFS-preferred-over-thesis-golden dedup pattern (already used for PLR) now
-- extends to BZR via this model.
--
-- Storage path: data/raw/berlin/lor/{pre2021,lor_2021}_bzr.parquet.
--
-- Graceful-degradation: returns zero rows with the target schema when no
-- parquet files have been ingested, so downstream models and uv run poe build
-- continue to pass.
--
-- Column notes: see stg_berlin_lor.sql (identical grain semantics, BZR instead
-- of PLR; area_code is 6 digits instead of 8).
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set lor_bzr_glob = var("project_root") ~ "/data/raw/berlin/lor/*_bzr.parquet" %}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ lor_bzr_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        'BER' as city_code,
        vintage as area_vintage,
        'bzr' as area_level,
        area_code,
        area_name,
        cast(null as varchar) as parent_area_code,
        geometry_wkb,
        source_attribution
    from read_parquet('{{ lor_bzr_glob }}', union_by_name = true)
    where area_code is not null and area_code ~ '^\d{6}$'

{% else %}

    -- Zero-row typed stub: no LOR BZR parquet files found.
    -- Run ingestion/berlin/lor/ingest_lor_geometries.py to populate
    -- data/raw/berlin/lor/
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
