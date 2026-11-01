-- test_mss_indicators_raw_attr_mapped.sql
-- #360: no populated WFS indexind attribute may be silently dropped by
-- stg_berlin_mss_indicators' inner join to seed_mss_indicator_vocab.
--
-- The seed deliberately omits the vacant S2/D2 slot of MSS 2019 and 2021
-- ('s2_x'/'d2_x', always null after Langzeitarbeitslosigkeit was dropped:
-- Indikatorenblaetter zum MSS 2019, Stand 02.06.2020, Kap. 1 S. 9). If a future
-- edition (or a re-publication) puts values into an attribute the seed does not
-- map, this test fails and the mapping must be re-verified against that
-- edition's Indikatorenheft before the seed is extended.
--
-- Reads the raw parquet directly (the staging view only exposes mapped rows).
-- Conditioned on data presence so the graceful-degradation case passes.
{{ config(severity='error') }}

{% set ind_glob = raw_path("berlin/mss/*_indicators.parquet") %}
{%- set _src = source("raw_berlin", "mss_indicators") -%}
{%- set _vocab = ref("seed_mss_indicator_vocab") -%}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ ind_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    with
        raw_attrs as (
            select
                cast(edition as integer) as edition,
                cast(raw_attr as varchar) as raw_attr,
                count(value) as n_non_null
            from read_parquet({{ _src }}, union_by_name = true)
            where plr_id is not null
            group by 1, 2
        ),

        vocab as (
            select
                cast(edition as integer) as edition,
                cast(raw_attr as varchar) as raw_attr
            from {{ _vocab }}
        )

    select r.edition, r.raw_attr, r.n_non_null
    from raw_attrs as r
    left join vocab as v on r.edition = v.edition and r.raw_attr = v.raw_attr
    where v.raw_attr is null and r.n_non_null > 0

{% else %}

    select
        cast(null as integer) as edition,
        cast(null as varchar) as raw_attr,
        cast(null as bigint) as n_non_null
    where false

{% endif %}
