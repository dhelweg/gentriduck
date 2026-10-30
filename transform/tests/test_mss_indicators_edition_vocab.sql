-- test_mss_indicators_edition_vocab.sql
-- #360: asserts the per-edition MSS index-indicator vocabulary in
-- stg_berlin_mss_indicators, and two construct checks that would have caught
-- the pre-#360 one-slot label shift (s2 -> transferbezug, s3 -> kinderarmut,
-- s4 -> alleinerziehende).
--
-- Verified mapping (docs/epic-c/360-mss-indicator-mapping-evidence.md;
-- seed_mss_indicator_vocab carries the Indikatorenheft page per row):
-- 2015/2017: S1 arbeitslose, S2 langzeitarbeitslose, S3 transferbezug,
-- S4 kinderarmut
-- 2019/2021: S1 arbeitslose, S2 vacant, S3 transferbezug, S4 kinderarmut
-- 2023/2025: S1 arbeitslose, S2 alleinerziehende, S3 transferbezug,
-- S4 kinderarmut
--
-- Checks (each returns violating rows):
-- (a) every staged (edition, indicator) is in the seed for that edition, and
-- every seed (edition, indicator) is staged for editions that are present;
-- (b) no staged (edition, indicator) is entirely null (a mislabelled vacant
-- slot looked exactly like this before #360);
-- (c) langzeitarbeitslose_anteil <= arbeitslose_anteil in every PLR: the
-- long-term unemployed are a subset of the unemployed, same denominator
-- (Indikatorenblaetter ab MSS 2013, Kap. 3.1.1 S. 11 / Kap. 3.1.2 S. 14);
-- (d) citywide mean kinderarmut_anteil > mean transferbezug_anteil per
-- edition: SGB II receipt among under-15s is far above the population-wide
-- share of non-unemployed SGB II/XII recipients in every MSS edition
-- (Indikatorenheft S3/S4 definitions; observed ratio ~2x in 2015-2025).
--
-- Conditioned on data presence so the graceful-degradation stub passes.
-- ADR-0007 Consequences: "A dbt test asserts the indicator vocabulary per edition
-- so the break is visible and tested, not smoothed over."
{{ config(severity='error') }}

with
    staged as (
        select
            edition,
            indicator,
            count(*) as n_rows,
            count(indicator_value) as n_non_null,
            avg(indicator_value) as mean_value
        from {{ ref('stg_berlin_mss_indicators') }}
        where area_code is not null
        group by edition, indicator
    ),

    vocab as (
        select
            cast(edition as integer) as edition, cast(indicator as varchar) as indicator
        from {{ ref('seed_mss_indicator_vocab') }}
    ),

    staged_editions as (select distinct edition from staged),

    wide as (
        select
            edition,
            area_code,
            max(
                case when indicator = 'arbeitslose_anteil' then indicator_value end
            ) as arbeitslose_anteil,
            max(
                case
                    when indicator = 'langzeitarbeitslose_anteil' then indicator_value
                end
            ) as langzeitarbeitslose_anteil
        from {{ ref('stg_berlin_mss_indicators') }}
        where area_code is not null
        group by edition, area_code
    )

-- (a1) staged indicator not in the seed vocabulary for that edition
select
    s.edition,
    s.indicator,
    'staged indicator not in seed_mss_indicator_vocab for this edition' as reason
from staged as s
left join vocab as v on s.edition = v.edition and s.indicator = v.indicator
where v.indicator is null

union all

-- (a2) seed indicator missing from a staged edition
select
    v.edition,
    v.indicator,
    'seed indicator missing from stg_berlin_mss_indicators for this edition' as reason
from vocab as v
inner join staged_editions as e on v.edition = e.edition
left join staged as s on v.edition = s.edition and v.indicator = s.indicator
where s.indicator is null

union all

-- (b) entirely-null indicator in an edition
select edition, indicator, 'indicator is entirely null in this edition' as reason
from staged
where n_non_null = 0

union all

-- (c) long-term unemployment share above the unemployment share
select
    edition,
    area_code as indicator,
    'langzeitarbeitslose_anteil > arbeitslose_anteil (subset violated)' as reason
from wide
where langzeitarbeitslose_anteil > arbeitslose_anteil + 0.01

union all

-- (d) child-poverty mean not above transfer-receipt mean
select
    k.edition,
    'kinderarmut_anteil' as indicator,
    'citywide mean kinderarmut_anteil <= mean transferbezug_anteil' as reason
from staged as k
inner join staged as t on k.edition = t.edition and t.indicator = 'transferbezug_anteil'
where k.indicator = 'kinderarmut_anteil' and k.mean_value <= t.mean_value
