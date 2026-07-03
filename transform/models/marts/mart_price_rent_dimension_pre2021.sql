-- mart_price_rent_dimension_pre2021.sql
-- D1d-followup (#136): re-key mart_price_rent_dimension's intensive covariates from
-- the lor_2021 PLR scheme onto lor_pre2021 area codes, so the price/rent dimension
-- is joinable to the governed gentrification_index / area-detail page (which report
-- on lor_pre2021, period 201612 -- see mart_price_rent_dimension's own header, #135).
--
-- =============================================================================
-- R-C2 Methodology citations
-- =============================================================================
-- Flowerdew & Green (1992) "Areal Interpolation and Types of Data": areal-weighted
-- reaggregation across non-nested/boundary-changed zonations, using intersection-area
-- weights, is the standard method (same citation basis as C3-crosswalk,
-- docs/epic-c/C3-crosswalk-geo-signoff.md).
-- Openshaw (1984) MAUP: PLR is the publication floor in both directions; crossing a
-- boundary-reform pair is a second MAUP exposure on top of the existing PLR-level
-- ecological-fallacy guardrail (mart_price_rent_dimension domain D10).
-- Sign-off: docs/epic-d/D1d-followup-geo-signoff.md (Verdict: PASS).
--
-- =============================================================================
-- Methodology
-- =============================================================================
-- KEY FINDING (geo-DS review, #136): the reverse (2021 -> pre2021) reaggregation of
-- an INTENSIVE covariate does NOT need a newly-derived weight. seed_lor_crosswalk_
-- 2006_to_2021's existing `weight` column is defined per (plr_id_pre2021 i,
-- plr_id_2021 j) pair as:
-- weight(i, j) = intersection_area(i, j) / area(i)
-- and by construction SUM_j weight(i, j) = 1.0 for a FIXED pre-2021 PLR i (validated
-- +/-0.01 at ingestion, ingestion/berlin/lor/ingest_lor_crosswalk.py). That is exactly
-- the areal-weighted-average coefficient set needed to blend 2021-grain intensive
-- values INTO a pre-2021 PLR's footprint:
-- value_pre2021(i) = SUM_j( value_2021(j) * weight(i, j) )   -- weights already sum
-- to 1
-- This is the SAME technique int_berlin_brw_plr uses (area-weighted mean of an
-- intensive variable across a non-aligned tessellation), just with PLR-to-PLR
-- weights instead of BRW-zone-to-PLR weights. No new spatial derivation or area
-- re-computation is required -- the seed's #63/#51 forward weights are already the
-- correct operator for this direction.
-- (The seed's separately-added `reverse_weight` column -- intersection_area /
-- area_2021_plr -- is the correct primitive for the DIFFERENT operation of
-- apportioning an EXTENSIVE/count value from 2021 into pre2021 shares; it is not
-- used here because every covariate in mart_price_rent_dimension is intensive.)
--
-- NULL-aware weighted average (avoids zero-imputation bias, index-definition §7):
-- For each covariate, only 2021 PLRs with a NON-NULL value contribute to both the
-- numerator and the renormalized denominator:
-- value_pre2021(i) = SUM_j(value_2021(j) * weight(i,j) WHERE value_2021(j) IS NOT NULL)
-- / SUM_j(weight(i,j) WHERE value_2021(j) IS NOT NULL)
-- This correctly discounts pre-2021 PLRs whose footprint falls partly on
-- non-residential/low-n 2021 PLRs, rather than silently treating the missing portion
-- as zero. `<covariate>_coverage_frac` reports the renormalized weight mass retained
-- (0-1); low coverage flags a thin/uncertain re-keyed estimate.
--
-- wohnlage_low_n_pre2021: TRUE when the weight-apportioned address count
-- (SUM_j(weight(i,j) * total_n_addresses(j))) is below 10, OR every contributing
-- 2021 PLR is itself low_n. Mirrors the < 10 address threshold used at the lor_2021
-- grain (mart_price_rent_dimension geo condition 7).
--
-- Scope (per #136): covariate LEVELS only (brw_weighted_avg_eur_m2, wohnlage
-- composition/score, est_rent_low/mid/high). Winsorized z-scores/ranks are NOT
-- recomputed here -- they are normalization moments over the lor_2021 population and
-- would need their own city-year moments computed at the lor_pre2021 grain; out of
-- scope for this follow-up (re-derive downstream if a pre2021-grain ranking is
-- needed).
--
-- Crosswalk source: mapping_type != 'stub' only (stub rows carry no geometric
-- weight and must not silently zero-fill).
--
-- Output grain: (city_code, snapshot_year, area_code, area_vintage='lor_pre2021')
--
-- Graceful degradation: zero rows in mart_price_rent_dimension or the crosswalk seed
-- -> zero rows here.
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    price_rent_2021 as (
        select
            city_code,
            snapshot_year,
            area_code as plr_id_2021,
            brw_weighted_avg_eur_m2,
            pct_einfach,
            pct_mittel,
            pct_gut,
            wohnlage_n_addresses as total_n_addresses,
            wohnlage_low_n,
            wohnlage_score,
            est_rent_mid,
            est_rent_low,
            est_rent_high,
            mietspiegel_vintage_used,
            wohnlage_vintage_matched
        from {{ ref("mart_price_rent_dimension") }}
        where area_vintage = 'lor_2021'
    ),

    -- Forward crosswalk weights (existing #51/#63 seed): weight(i, j) sums to 1.0
    -- per plr_id_pre2021 (i) -- the correct operator to blend 2021-grain intensive
    -- values into a pre2021 PLR's footprint. Excludes 'stub' rows (no geometric
    -- weight yet).
    crosswalk as (
        select plr_id_pre2021, plr_id_2021, weight
        from {{ ref("seed_lor_crosswalk_2006_to_2021") }}
        where mapping_type != 'stub'
    ),

    joined as (
        select
            cw.plr_id_pre2021,
            pr.city_code,
            pr.snapshot_year,
            cw.weight,
            pr.brw_weighted_avg_eur_m2,
            pr.pct_einfach,
            pr.pct_mittel,
            pr.pct_gut,
            pr.total_n_addresses,
            pr.wohnlage_low_n,
            pr.wohnlage_score,
            pr.est_rent_mid,
            pr.est_rent_low,
            pr.est_rent_high,
            pr.mietspiegel_vintage_used,
            pr.wohnlage_vintage_matched
        from crosswalk as cw
        inner join price_rent_2021 as pr on cw.plr_id_2021 = pr.plr_id_2021
    )

-- NULL-aware weighted average per covariate: numerator/denominator both restricted
-- to contributing 2021 PLRs where the covariate is non-NULL, so a partially
-- non-residential/low-n footprint discounts rather than zero-fills the estimate.
select
    city_code,
    snapshot_year,
    plr_id_pre2021 as area_code,
    'lor_pre2021' as area_vintage,

    sum(
        case
            when brw_weighted_avg_eur_m2 is not null
            then brw_weighted_avg_eur_m2 * weight
        end
    ) / nullif(
        sum(case when brw_weighted_avg_eur_m2 is not null then weight end), 0
    ) as brw_weighted_avg_eur_m2,
    sum(case when brw_weighted_avg_eur_m2 is not null then weight end)
    / nullif(sum(weight), 0) as brw_coverage_frac,

    sum(case when wohnlage_score is not null then pct_einfach * weight end) / nullif(
        sum(case when wohnlage_score is not null then weight end), 0
    ) as pct_einfach,
    sum(case when wohnlage_score is not null then pct_mittel * weight end) / nullif(
        sum(case when wohnlage_score is not null then weight end), 0
    ) as pct_mittel,
    sum(case when wohnlage_score is not null then pct_gut * weight end)
    / nullif(sum(case when wohnlage_score is not null then weight end), 0) as pct_gut,

    sum(weight * coalesce(total_n_addresses, 0)) as wohnlage_n_addresses_apportioned,
    -- low_n if the apportioned address count is thin, or every contributing 2021
    -- PLR was itself low_n (mirrors mart_price_rent_dimension geo condition 7).
    (sum(weight * coalesce(total_n_addresses, 0)) < 10)
    or bool_and(coalesce(wohnlage_low_n, true)) as wohnlage_low_n,

    sum(case when wohnlage_score is not null then wohnlage_score * weight end) / nullif(
        sum(case when wohnlage_score is not null then weight end), 0
    ) as wohnlage_score,
    sum(case when wohnlage_score is not null then weight end)
    / nullif(sum(weight), 0) as wohnlage_coverage_frac,

    sum(case when est_rent_mid is not null then est_rent_mid * weight end) / nullif(
        sum(case when est_rent_mid is not null then weight end), 0
    ) as est_rent_mid,
    sum(case when est_rent_low is not null then est_rent_low * weight end) / nullif(
        sum(case when est_rent_low is not null then weight end), 0
    ) as est_rent_low,
    sum(case when est_rent_high is not null then est_rent_high * weight end) / nullif(
        sum(case when est_rent_high is not null then weight end), 0
    ) as est_rent_high,
    sum(case when est_rent_mid is not null then weight end)
    / nullif(sum(weight), 0) as est_rent_coverage_frac,

    max(mietspiegel_vintage_used) as mietspiegel_vintage_used,
    max(wohnlage_vintage_matched) as wohnlage_vintage_matched

from joined
group by city_code, snapshot_year, plr_id_pre2021
