-- stg_hamburg_sozialmonitoring_indicators.sql
-- #371, ADR-0014 Amendment 2026-11-02: Hamburg Sozialmonitoring report-annex
-- indicators S1-S7 (status) and D1-D6 (Dynamik) per scored statistisches
-- Gebiet, editions 2016-2025. Long format: one row per
-- (edition_year, gebiet_id, indicator).
--
-- Source: "Sozialmonitoring Integrierte Stadtteilentwicklung, Bericht <E> -
-- Anhang", sheet II "Indikatoren" (Freie und Hansestadt Hamburg, Behoerde fuer
-- Stadtentwicklung und Wohnen, dl-de/by-2.0), pinned URLs in
-- ingestion/hamburg/sozialmonitoring/ingest_hamburg_sozialmonitoring_annex.py.
--
-- ROLE RULE (R-A1, ADR-0014 amendment): OUTCOME COMPONENTS ONLY. No column of
-- this model may enter any model as a predictor (same leakage boundary as
-- Berlin MSS, ADR-0006 / R-C3). Hamburg-specific (ADR-0005): stays stg_hamburg_*.
--
-- Recovery of shares (R-C2):
-- The annex publishes each indicator as a z-score over the scored Gebiete of
-- the edition, z = (x - m) / s, with the edition's "Mittelwert" (m) and "SD"
-- (s) rows (docs/epic-e/354-phase-a-data-prerequisites.md §5;
-- pre-registration docs/methodology/371-matched-comparison-preregistration.md
-- §3.3). m and s are published as FRACTIONS (e.g. S3 2025: m = 0.105 = the
-- 10.5 % the 2025 report states for "Anteil der SGB-II-Empfaenger:innen",
-- Bericht 2025 S. 10-11). So, only where the annex supplies m and s:
-- share     = 100 * (m + z * s)   [%, status rows S1-S7]
-- change_pp = 100 * (m + z * s)   [percentage points over the 3-year
-- Dynamik window, rows D1-D6]
-- Nothing is imputed; no clamping. Evidence that m is the UNWEIGHTED mean of
-- the Gebiet shares (not a population-weighted city rate) and s the population
-- SD (ddof = 0): docs/epic-e/371-data-checks.md §1.
--
-- recovery_error_bound_pp: worst-case recovery error from published rounding,
-- 100 * (dz * s + dm + |z| * ds), where dz = 0.005 when the edition's z-scores
-- are published to two decimals (else 0) and dm = ds = 0.0005 when m / s are
-- published to three decimals (else 0). Precision is derived from the data per
-- edition (z_precision / moments_precision); pre-registration §3.3 check 3.
--
-- Excluded cells (ADR-0014 amendment: NULL with a flag, never 0):
-- S7 "Schulabschluesse (... bes. Gebietsausschluss)" codes area exclusion as
-- z = 0 in SOME editions only. Per edition (docs/epic-e/371-data-checks.md §1):
-- edition  zeros  SD(z) with zeros  SD(z) without zeros
-- 2016       43       0.975              1.001
-- 2017        2       1.000              1.001
-- 2018        2       1.000              1.001
-- 2019        6       1.000              1.004
-- 2020        0       1.000              1.000
-- 2021-2025 28-39   0.976-0.983        0.999-1.002
-- In 2016 and 2021-2025 the zeros were left out of the standardisation (SD is
-- 1 only without them): exclusion code. In 2017-2020 the zeros are part of
-- the standardisation (SD is 1 with them): genuine z = 0.00 values.
-- Rule: S7 cells with z_published = 0 in editions 2016 and 2021-2025 ->
-- z_score / share NULL, cell_flag = 's7_zero_exclusion_code'; 2017-2020 zeros
-- are kept. A genuine 0.00 in an exclusion edition cannot be told apart; this
-- affects only S7, which is context only (pre-registration §3.1).
-- Gebiete below the source's 300-resident threshold are not in the annex at
-- all: absent rows, not NULL rows, exactly as in the WFS (deviation from the
-- ADR-0014 amendment wording; docs/epic-e/371-data-checks.md §1).
--
-- Reference date: edition E carries data as of 31.12.(E-1) (phase-A §3).
--
-- Graceful degradation: zero-row typed stub when the annex parquet has not been
-- ingested (docs/lessons/local-first-data-presence.md).
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer", "role": "outcome_only"},
    )
}}

{% set hh_annex_glob = raw_path("hamburg/sozialmonitoring_annex/*.parquet") %}
{%- set _src_annex = source("raw_hamburg", "sozialmonitoring_annex") -%}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ hh_annex_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    with
        raw as (
            select
                cast(city_code as varchar) as city_code,
                cast(edition as integer) as edition_year,
                cast(gebiet_id as varchar) as gebiet_id,
                cast(stadtteil_name as varchar) as stadtteil_name,
                cast(population as integer) as population,
                cast(indicator as varchar) as indicator,
                cast(indicator_label_de as varchar) as indicator_label_de,
                cast(z_published as double) as z_published,
                cast(edition_mean as double) as edition_mean,
                cast(edition_sd as double) as edition_sd,
                cast(status_summe as double) as status_summe,
                cast(dynamik_summe as double) as dynamik_summe,
                cast(source_file as varchar) as source_file,
                cast(source_attribution as varchar) as source_attribution
            from read_parquet({{ _src_annex }}, union_by_name = true)
        ),

        -- Published precision per edition, derived from the values themselves.
        edition_precision as (
            select
                edition_year,
                bool_or(
                    abs(z_published * 100 - round(z_published * 100)) > 1e-9
                ) as z_full,
                bool_or(
                    abs(edition_mean * 1000 - round(edition_mean * 1000)) > 1e-9
                    or abs(edition_sd * 1000 - round(edition_sd * 1000)) > 1e-9
                ) as moments_full
            from raw
            group by edition_year
        ),

        flagged as (
            select
                raw.*,
                case
                    when
                        raw.indicator = 'S7'
                        and raw.z_published = 0
                        and (raw.edition_year = 2016 or raw.edition_year >= 2021)
                    then 's7_zero_exclusion_code'
                    else 'scored'
                end as cell_flag,
                case
                    when edition_precision.z_full then 'full' else 'two_decimals'
                end as z_precision,
                case
                    when edition_precision.moments_full
                    then 'full'
                    else 'three_decimals'
                end as moments_precision,
                case when edition_precision.z_full then 0.0 else 0.005 end as dz,
                case when edition_precision.moments_full then 0.0 else 0.0005 end as dm
            from raw
            inner join
                edition_precision on raw.edition_year = edition_precision.edition_year
        )

    select
        city_code,
        edition_year,
        make_date(edition_year - 1, 12, 31) as reference_date,
        gebiet_id,
        stadtteil_name,
        population,
        indicator,
        case
            when indicator like 'S%' then 'status' else 'dynamik'
        end as indicator_kind,
        indicator_label_de,
        z_published,
        case when cell_flag = 'scored' then z_published end as z_score,
        edition_mean,
        edition_sd,
        -- R-C2: x = m + z * s (pre-registration §3.3), in % for status rows.
        -- Column name 'share' is fixed by the ADR-0014 amendment (RF04 waived).
        case
            when cell_flag = 'scored' and indicator like 'S%'
            then 100 * (edition_mean + z_published * edition_sd)
        end as share,  -- noqa: RF04
        -- Same recovery for the Dynamik rows: change in percentage points.
        case
            when cell_flag = 'scored' and indicator like 'D%'
            then 100 * (edition_mean + z_published * edition_sd)
        end as change_pp,
        100 * (dz * edition_sd + dm + abs(z_published) * dm) as recovery_error_bound_pp,
        z_precision,
        moments_precision,
        cell_flag,
        status_summe,
        dynamik_summe,
        source_file,
        source_attribution
    from flagged

{% else %}

    -- Zero-row typed stub: run
    -- ingestion/hamburg/sozialmonitoring/ingest_hamburg_sozialmonitoring_annex.py
    select
        cast(null as varchar) as city_code,
        cast(null as integer) as edition_year,
        cast(null as date) as reference_date,
        cast(null as varchar) as gebiet_id,
        cast(null as varchar) as stadtteil_name,
        cast(null as integer) as population,
        cast(null as varchar) as indicator,
        cast(null as varchar) as indicator_kind,
        cast(null as varchar) as indicator_label_de,
        cast(null as double) as z_published,
        cast(null as double) as z_score,
        cast(null as double) as edition_mean,
        cast(null as double) as edition_sd,
        cast(null as double) as share,  -- noqa: RF04
        cast(null as double) as change_pp,
        cast(null as double) as recovery_error_bound_pp,
        cast(null as varchar) as z_precision,
        cast(null as varchar) as moments_precision,
        cast(null as varchar) as cell_flag,
        cast(null as double) as status_summe,
        cast(null as double) as dynamik_summe,
        cast(null as varchar) as source_file,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
