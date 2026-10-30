-- stg_berlin_mss_indicators.sql
-- ADR-0007: Berlin MSS indexind WFS — SES indicators per PLR (dl-de-zero-2.0)
-- Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin
-- Continuous SES predictor inputs for R-A1 index re-grounding.
--
-- Staging view over MSS indexind Parquet files produced by
-- ingestion/berlin/mss/ingest_mss_indicators.py. Each parquet file holds one
-- biennial MSS edition in long format: one row per (edition, PLR, indicator).
--
-- Storage path: data/raw/berlin/mss/mss_<YEAR>_indicators.parquet (gitignored,
-- ADR-0001/A8)
-- Licence: dl-de-zero-2.0 (https://www.govdata.de/dl-de/zero-2-0)
--
-- Graceful-degradation: returns zero rows with the target schema when no parquet
-- files have been ingested, so dbt build passes before data is downloaded.
--
-- #360 INDICATOR MAPPING (per edition, from the WFS attribute, NOT from the
-- parquet's own `indicator` label). The WFS attributes s1..s4 / d1..d4 are the
-- MSS index-indicator SLOTS S1..S4 / D1..D4, and what sits in a slot changed
-- between editions. The canonical name is therefore looked up per
-- (edition, raw_attr) in seed_mss_indicator_vocab, which records the official
-- definition and the Indikatorenheft page for every row. Verified mapping
-- (evidence: docs/epic-c/360-mss-indicator-mapping-evidence.md):
-- 2015, 2017: S1 arbeitslose_anteil (SGB II + SGB III, 15-<65 J.),
-- S2 langzeitarbeitslose_anteil (WFS attr 's2_x'),
-- S3 transferbezug_anteil, S4 kinderarmut_anteil
-- [MSS Indikatorenblaetter ab MSS 2013, Stand 23.08.2016,
-- Kap. 3.1 S. 10 / Kap. 3.2 S. 24; Indikatorenblaetter zum MSS 2017,
-- Stand 01.06.2018, Kap. 3.1 S. 11 / Kap. 3.2 S. 29;
-- WFS mss_2015/mss_2017 indexind Abstract: "vier Index-Indikatoren
-- Arbeitslosigkeit, Langzeitarbeitslosigkeit, Transferbezug und
-- Kinderarmut"]
-- 2019, 2021: S1 arbeitslose_anteil (SGB II only from MSS 2019), S2 slot VACANT
-- (Langzeitarbeitslosigkeit dropped; WFS 's2_x'/'d2_x' all null and
-- deliberately not staged), S3 transferbezug_anteil,
-- S4 kinderarmut_anteil
-- [Indikatorenblaetter zum MSS 2019, Stand 02.06.2020, Kap. 1 S. 9
-- "Wegfall S2: Langzeitarbeitslosigkeit", Kap. 3.1 S. 12;
-- Indikatorenblaetter MSS 2021, Stand 29.07.2022, Kap. 3.1 S. 15
-- (S1/S3 Regelaltersgrenze: Vorbemerkungen S. 7)]
-- 2023, 2025: S1 arbeitslose_anteil (SGB II, 15-<Regelaltersgrenze),
-- S2 alleinerziehende_anteil (Kinder und Jugendliche unter 18 in
-- alleinerziehenden Haushalten, new index indicator from MSS 2023),
-- S3 transferbezug_anteil, S4 kinderarmut_anteil
-- [Indikatorenblaetter MSS 2023 (Nov 2024) Kap. 3.1 S. 17,
-- S2 Kap. 3.1.2 S. 23; Indikatorenblaetter MSS 2025 Kap. 3.1 S. 17,
-- S2 Kap. 3.1.2 S. 23;
-- WFS mss_2025 Abstract]
-- Before #360 the ingestion mapped s2 -> transferbezug, s3 -> kinderarmut,
-- s4 -> alleinerziehende for every edition, i.e. every label from S2 to S4 was
-- shifted by one slot (#360; first flagged in the #354/#355 domain review).
-- The raw parquet's `indicator` column may still carry those legacy labels
-- until the next re-ingest; this view ignores it and maps from raw_attr.
-- Unmapped raw attributes that carry values fail
-- test_mss_indicators_raw_attr_mapped (no silent drop of a populated slot).
--
-- Column notes:
-- city_code      -- canonical 'BER' (ADR-0005; matches dim_city.city_code)
-- edition        -- MSS publication year (2015, 2017, 2019, 2021, 2023, 2025;
-- 2013 has no WFS indexind layer)
-- area_code      -- PLR identifier zero-padded to 8 chars (matches stg_berlin_lor)
-- area_name      -- Human-readable Planungsraum name (German proper noun from WFS)
-- area_vintage   -- LOR boundary vintage: 'lor_pre2021' (<=2019) or 'lor_2021' (>=2021)
-- indicator      -- Canonical snake_case indicator name (seed_mss_indicator_vocab)
-- raw_attr       -- Original WFS attribute ('s1'..'s4', 's2_x', 'd1'..'d4', 'd2_x')
-- official_code  -- MSS slot code ('S1'..'S4', 'D1'..'D4') for that edition
-- indicator_value -- Float indicator value (null for uninhabited PLRs)
-- source_attribution -- dl-de-zero-2.0 attribution string
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set ind_glob = raw_path("berlin/mss/*_indicators.parquet") %}
{%- set _src_raw_berlin_mss_indicators = source("raw_berlin", "mss_indicators") -%}
{%- set _seed_mss_indicator_vocab = ref("seed_mss_indicator_vocab") -%}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ ind_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    with
        raw as (
            select
                cast(edition as integer) as edition,
                cast(plr_id as varchar) as plr_id,
                cast(plr_name as varchar) as plr_name,
                cast(lor_vintage as varchar) as lor_vintage,
                cast(raw_attr as varchar) as raw_attr,
                cast(value as double) as indicator_value,
                cast(source_attribution as varchar) as source_attribution
            from
                read_parquet({{ _src_raw_berlin_mss_indicators }}, union_by_name = true)
            where plr_id is not null
        ),

        -- #360: per-edition slot -> construct mapping (see header for sources).
        vocab as (
            select
                cast(edition as integer) as edition,
                cast(raw_attr as varchar) as raw_attr,
                cast(indicator as varchar) as indicator,
                cast(official_code as varchar) as official_code
            from {{ _seed_mss_indicator_vocab }}
        )

    select
        'BER' as city_code,
        r.edition,
        r.plr_id as area_code,
        r.plr_name as area_name,
        r.lor_vintage as area_vintage,
        v.indicator,
        r.raw_attr,
        v.official_code,
        r.indicator_value,
        r.source_attribution
    from raw as r
    inner join vocab as v on r.edition = v.edition and r.raw_attr = v.raw_attr

{% else %}

    -- Zero-row typed stub: no MSS indicators parquet files found.
    -- Run ingestion/berlin/mss/ingest_mss_indicators.py to populate
    -- data/raw/berlin/mss/
    select
        cast(null as varchar) as city_code,
        cast(null as integer) as edition,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_name,
        cast(null as varchar) as area_vintage,
        cast(null as varchar) as indicator,
        cast(null as varchar) as raw_attr,
        cast(null as varchar) as official_code,
        cast(null as double) as indicator_value,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
