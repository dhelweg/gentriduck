-- stg_hamburg_ewr_stadtteil.sql
-- Staging view over Hamburg's "Regionalstatistische Daten der Stadtteile"
-- parquet (Stadtteil grain, ~104-105 areas), produced by
-- ingestion/hamburg/ewr/ingest_hamburg_ewr_stadtteil.py
-- (#40 H1, ADR-0014 Pillar 3 -- PRIMARY source only). UNPIVOTs wide-format
-- parquet (one row per Stadtteil x year) to long format (one row per
-- Stadtteil x year x indicator), mirroring stg_berlin_ewr's shape.
--
-- Storage path: data/raw/hamburg/ewr_stadtteil/stadtteile.parquet
--
-- **Scope discipline (R-C1 -- this model is PLUMBING, not methodology):**
-- This is raw ingestion + long-format staging ONLY, at the Stadtteil grain
-- the source itself publishes at (matches stg_hamburg_geo's subarea_l1
-- area_code). It does NOT:
-- - join or reconcile Stadtteil-grain values down to statistisches-Gebiete
-- (the two-grain reconciliation ADR-0014 open question #5 flags as
-- methodology-bearing, requiring geo-DS + domain-expert sign-off);
-- - compute any weighted index, normalization, or composite score;
-- - feed int_gentrification_ts.sql, int_ewr_socioeco.sql, or
-- gentrification_index.sql (still Berlin-only / city-agnostic-core
-- files, unmodified by this slice).
-- A later, dedicated methodology-gated slice will do the two-grain join and
-- any index-weighting integration once this raw layer exists to build on.
--
-- Graceful-degradation: returns zero rows with the target schema when no
-- parquet files have been ingested, so downstream models and
-- uv run poe build continue to pass (docs/lessons/local-first-data-presence.md).
--
-- Indicator set (this slice -- narrower than Berlin's 13-item EWR set;
-- see ingest_hamburg_ewr_stadtteil.py module docstring for the
-- UNCONFIRMED-pending-live-probe column mapping):
-- residents_total, residents_male_share, residents_female_share,
-- age_under18_share, age_65plus_share, foreigners_share,
-- unemployment_share
--
-- Suppressed cells:
-- is_suppressed_any=True when any indicator cell for a Stadtteil x year was
-- privacy-suppressed in the source CSV. indicator_value for suppressed
-- cells is NULL, never coerced to 0 (mirrors stg_berlin_ewr discipline).
--
-- Schema (long format, one row per Stadtteil x year x indicator):
-- city_code           varchar  -- canonical 'HH' (ADR-0005)
-- area_code           varchar  -- Stadtteil Schluessel (matches
-- stg_hamburg_geo.area_code where area_level='subarea_l1')
-- area_vintage        varchar  -- 'current' (single Stadtteil boundary
-- edition -- see ingestor docstring)
-- reference_year      integer  -- calendar year of the annual release
-- indicator           varchar  -- one of the 7 indicator keys above
-- indicator_value     double   -- value (NULL if suppressed)
-- is_suppressed_any   boolean  -- True if any indicator was suppressed
-- for this Stadtteil x year
-- source_attribution  varchar  -- dl-de/by-2.0 attribution
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set hh_ewr_glob = var("project_root") ~ "/data/raw/hamburg/ewr_stadtteil/*.parquet" %}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ hh_ewr_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    -- Long-format union (one row per Stadtteil x year x indicator).
    -- NOTE: intentionally NOT `unpivot` -- DuckDB 1.5.3 round-trips a
    -- CREATE VIEW containing UNPIVOT's `IN (col_a, col_b, ...)` column list
    -- into quoted string literals on persistence, so the view raises
    -- "UNPIVOT name count mismatch" the moment it's queried from a fresh
    -- connection (i.e. always, outside the single dbt-build session that
    -- created it) -- reproduced in this session once real Hamburg EWR data
    -- existed to exercise the file_count > 0 branch for the
    -- first time. A manual UNION ALL is semantically identical and
    -- persists cleanly. See also stg_berlin_ewr.sql, which uses the same
    -- UNPIVOT pattern and is presumed to carry the same latent bug
    -- (tracked separately, not fixed here -- out of #125's Hamburg scope).
    {% set hh_ewr_indicators = [
        "residents_total",
        "residents_male_share",
        "residents_female_share",
        "age_under18_share",
        "age_65plus_share",
        "foreigners_share",
        "unemployment_share",
    ] %}
    with
        source as (
            select *
            from
                read_parquet(
                    '{{ hh_ewr_glob }}', hive_partitioning = false, union_by_name = true
                )
            where area_code is not null and city_code = 'HH'
        )

    {% for ind in hh_ewr_indicators %}
        select
            city_code,
            area_code,
            area_vintage,
            reference_year,
            '{{ ind }}' as indicator,
            {{ ind }} as indicator_value,
            is_suppressed_any,
            source_attribution
        from source
        {% if not loop.last %}
            union all
        {% endif %}
    {% endfor %}

{% else %}

    -- Zero-row typed stub: no Hamburg EWR-Stadtteil parquet files found.
    -- Run ingestion/hamburg/ewr/ingest_hamburg_ewr_stadtteil.py to populate
    -- data/raw/hamburg/ewr_stadtteil/
    select
        cast(null as varchar) as city_code,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_vintage,
        cast(null as integer) as reference_year,
        cast(null as varchar) as indicator,
        cast(null as double) as indicator_value,
        cast(null as boolean) as is_suppressed_any,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
