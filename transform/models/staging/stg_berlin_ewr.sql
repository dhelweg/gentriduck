-- stg_berlin_ewr.sql
-- Staging view over annual EWR (Einwohnerregister) Parquet snapshots produced
-- by the C3b ingestion script. UNPIVOTs wide-format parquet (one row per PLR)
-- to long format (one row per PLR x indicator).
--
-- Source: ingestion/berlin/ewr/ingest_ewr.py (ADR-0003, EWR per-PLR section)
-- "Einwohnerinnen und Einwohner in Berlin in LOR-Planungsraeumen am 31.12.YYYY"
-- Published by Amt fuer Statistik Berlin-Brandenburg (CC BY 3.0 DE) on
-- daten.berlin.de. One parquet per year under data/raw/berlin/ewr/<year>.parquet
-- (gitignored per ADR-0008). Run ingestion/berlin/ewr/ingest_ewr.py to populate.
--
-- Attribution (mandatory -- CC BY 3.0 DE):
-- "Amt fuer Statistik Berlin-Brandenburg / Einwohnerregister
-- Berlin-Brandenburg (EWR), CC BY 3.0 DE --
-- https://www.statistik-berlin-brandenburg.de/"
-- Each parquet row carries source_attribution; the attribution page (Epic G3)
-- must surface this.
--
-- Graceful-degradation: when no parquet files exist under data/raw/berlin/ewr/
-- this model returns zero rows with the target schema so downstream models and
-- uv run poe build continue to pass before data is ingested.
--
-- Indicator set (13 approved indicators -- see seed_ewr_indicator_meta):
-- residents_total, residents_male_share, residents_female_share,
-- age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share,
-- age_65plus_share, mean_age_years, foreigners_share,
-- migration_background_share, residence_duration_5y_share,
-- residence_duration_10y_share
--
-- Known breaks in the series:
-- 1. LOR 2021 reform: pre-2021 data uses the old 447-PLR scheme
-- (area_vintage='lor_pre2021'); 2021+ uses the new 542-PLR scheme
-- (area_vintage='lor_2021'). Cross-vintage comparison requires the
-- crosswalk in seed_lor_crosswalk_2006_to_2021 (handled by
-- int_berlin_ewr_plr2021).
-- 2. Migrationshintergrund ~2017: the MH_E column definition changed around
-- 2017 with a Mikrozensus methodological update. migration_background_share
-- is present from ~2015 but methodologically comparable only from 2017
-- (stable_from_year=2017 in seed_ewr_indicator_meta). Values pre-2017 are
-- NOT silently concatenated; stable_from_year documents the break explicitly.
--
-- Start-year decision (2015):
-- 2015 is the default start year. Rationale: MH_E column consistently present
-- from 2015; schema stable and machine-readable from 2015; earlier vintages
-- have per-year column layout variation requiring manual mapping. Users may
-- extend to 2008+ via --years 2008-2024 on the ingestion script, accepting
-- increased schema variation.
--
-- Suppressed cells:
-- is_suppressed_any=True when any indicator cell for a PLR was privacy-
-- suppressed (value '-', '.', blank) in the source CSV. The indicator_value
-- for suppressed cells is NULL, not 0 (never coerced).
--
-- Schema (long format, one row per PLR x indicator):
-- city_code           varchar  -- always 'BER' (ADR-0005 canonical; normalised from
-- parquet 'berlin')
-- area_code           varchar  -- PLR identifier (zero-padded to 8 chars)
-- area_vintage        varchar  -- 'lor_pre2021' (<=2020) or 'lor_2021' (>=2021)
-- reference_year      integer  -- calendar year of the 31-Dec snapshot
-- reference_date      date     -- 31-Dec snapshot date (e.g. 2018-12-31)
-- indicator           varchar  -- one of the 13 approved indicator keys
-- indicator_value     double   -- computed share or count (NULL if suppressed)
-- is_suppressed_any   boolean  -- True if any indicator was suppressed for PLR
-- source_attribution  varchar  -- CC BY 3.0 DE attribution string
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set ewr_parquet_glob = var("project_root") ~ "/data/raw/berlin/ewr/*.parquet" %}

{% if execute %}
    {%- set file_count_result = run_query(
        "SELECT count(*) FROM glob('" ~ ewr_parquet_glob ~ "')"
    ) -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    -- Long-format union (one row per PLR x indicator).
    -- NOTE: intentionally NOT `unpivot` -- DuckDB 1.5.3 round-trips a
    -- CREATE VIEW containing UNPIVOT's `IN (col_a, col_b, ...)` column list
    -- into quoted string literals on persistence, so the view raises
    -- "UNPIVOT name count mismatch" the moment it's queried from a fresh
    -- connection (i.e. always, outside the single dbt-build session that
    -- created it). A manual UNION ALL is semantically identical and persists
    -- cleanly. Confirmed reproduced here for #128 (same latent pattern
    -- flagged from stg_hamburg_ewr_stadtteil.sql's #125 fix) once real
    -- Berlin EWR parquet existed to exercise this branch from a fresh
    -- connection.
    -- city_code is normalized from parquet value ('berlin') to canonical 'BER'
    -- (ADR-0005) so it matches dim_city and dim_area (fix for #52 / int_ewr_series).
    {% set berlin_ewr_indicators = [
        "residents_total",
        "residents_male_share",
        "residents_female_share",
        "age_under18_share",
        "age_18_27_share",
        "age_27_45_share",
        "age_45_65_share",
        "age_65plus_share",
        "mean_age_years",
        "foreigners_share",
        "migration_background_share",
        "residence_duration_5y_share",
        "residence_duration_10y_share",
    ] %}
    with
        source as (
            select *
            from
                read_parquet(
                    '{{ ewr_parquet_glob }}',
                    hive_partitioning = false,
                    union_by_name = true
                )
        )

    {% for ind in berlin_ewr_indicators %}
        select
            'BER' as city_code,
            area_code,
            area_vintage,
            reference_year,
            reference_date,
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

    -- Zero-row typed stub: no parquet files found.
    -- Run ingestion/berlin/ewr/ingest_ewr.py to populate data/raw/berlin/ewr/
    select
        cast(null as varchar) as city_code,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_vintage,
        cast(null as integer) as reference_year,
        cast(null as date) as reference_date,
        cast(null as varchar) as indicator,
        cast(null as double) as indicator_value,
        cast(null as boolean) as is_suppressed_any,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
