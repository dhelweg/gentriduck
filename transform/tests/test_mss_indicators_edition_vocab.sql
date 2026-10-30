-- test_mss_indicators_edition_vocab.sql
-- #360: asserts the per-edition MSS index-indicator vocabulary in
-- stg_berlin_mss_indicators, plus construct checks that guard against any
-- slot mislabel. Checks (b) and (d) would have caught the pre-#360 one-slot
-- label shift (s2 -> transferbezug, s3 -> kinderarmut, s4 -> alleinerziehende);
-- (e)-(g) were added in review to also catch s1<->s3 and s2<->s4 swaps.
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
-- (e) citywide mean arbeitslose_anteil < mean transferbezug_anteil per
-- edition (observed 7.41 < 12.17 in 2015 ... 4.69 < 9.87 in 2025): S3
-- counts all non-unemployed recipients incl. children and pensioners per
-- resident, S1 only the registered unemployed aged 15-<65/Regelaltersgrenze;
-- (f) Spearman rho(kinderarmut, transferbezug) > 0.9 (observed 0.97 in every
-- edition) and rho(alleinerziehende, transferbezug) < 0.8 (observed
-- 0.54-0.56 in 2023/2025): Kinderarmut and Transferbezug are both SGB II
-- receipt measures; the single-parent share is a family-structure measure;
-- (g) each Dynamik indicator is the two-year change of its own status slot:
-- Pearson r(d_k, s_k(E) - s_k(E-2)) > 0.9 within the same LOR vintage
-- (observed >= 0.917; the 2017/2019 deviations from 1.0 are the
-- documented SGB II revision 2016 and the MSS 2019 S1 redefinition --
-- Indikatorenblaetter MSS 2023 S. 13, MSS 2019 S. 16).
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
            ) as langzeitarbeitslose_anteil,
            max(
                case when indicator = 'transferbezug_anteil' then indicator_value end
            ) as transferbezug_anteil,
            max(
                case when indicator = 'kinderarmut_anteil' then indicator_value end
            ) as kinderarmut_anteil,
            max(
                case when indicator = 'alleinerziehende_anteil' then indicator_value end
            ) as alleinerziehende_anteil
        from {{ ref('stg_berlin_mss_indicators') }}
        where area_code is not null
        group by edition, area_code
    ),

    -- (f) rank correlations per edition (Spearman = Pearson on ranks)
    ranked_kt as (
        select
            edition,
            rank() over (partition by edition order by kinderarmut_anteil) as r_k,
            rank() over (partition by edition order by transferbezug_anteil) as r_t
        from wide
        where kinderarmut_anteil is not null and transferbezug_anteil is not null
    ),

    ranked_at as (
        select
            edition,
            rank() over (partition by edition order by alleinerziehende_anteil) as r_a,
            rank() over (partition by edition order by transferbezug_anteil) as r_t
        from wide
        where alleinerziehende_anteil is not null and transferbezug_anteil is not null
    ),

    rho_kt as (select edition, corr(r_k, r_t) as rho from ranked_kt group by edition),

    rho_at as (select edition, corr(r_a, r_t) as rho from ranked_at group by edition),

    -- (g) Dynamik vs own-slot status change, same LOR vintage only
    stg as (
        select edition, area_code, area_vintage, indicator, indicator_value
        from {{ ref('stg_berlin_mss_indicators') }}
        where area_code is not null and indicator_value is not null
    ),

    dyn_consistency as (
        select
            d.edition,
            d.indicator,
            count(*) as n_pairs,
            corr(d.indicator_value, s_now.indicator_value - s_prev.indicator_value) as r
        from stg as d
        inner join
            stg as s_now
            on d.edition = s_now.edition
            and d.area_code = s_now.area_code
            and s_now.indicator = replace(d.indicator, '_dynamik', '_anteil')
        inner join
            stg as s_prev
            on s_prev.edition = d.edition - 2
            and d.area_vintage = s_prev.area_vintage
            and d.area_code = s_prev.area_code
            and s_now.indicator = s_prev.indicator
        where d.indicator like '%dynamik'
        group by d.edition, d.indicator
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

union all

-- (e) unemployment mean not below transfer-receipt mean
select
    u.edition,
    'arbeitslose_anteil' as indicator,
    'citywide mean arbeitslose_anteil >= mean transferbezug_anteil' as reason
from staged as u
inner join staged as t on u.edition = t.edition and t.indicator = 'transferbezug_anteil'
where u.indicator = 'arbeitslose_anteil' and u.mean_value >= t.mean_value

union all

-- (f1) Kinderarmut must track Transferbezug closely
select
    edition,
    'kinderarmut_anteil' as indicator,
    'rho(kinderarmut_anteil, transferbezug_anteil) <= 0.9' as reason
from rho_kt
where rho is null or rho <= 0.9

union all

-- (f2) the single-parent share must not track Transferbezug like a benefit share
select
    edition,
    'alleinerziehende_anteil' as indicator,
    'rho(alleinerziehende_anteil, transferbezug_anteil) >= 0.8' as reason
from rho_at
where rho is null or rho >= 0.8

union all

-- (g) Dynamik not consistent with the change of its own status slot
select
    edition,
    indicator,
    'r(dynamik, status change over 2 years) <= 0.9 (same LOR vintage)' as reason
from dyn_consistency
where n_pairs >= 30 and (r is null or r <= 0.9)
