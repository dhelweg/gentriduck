-- int_berlin_brw_trend.sql
-- D3-brw-change (#263): explicit, separately-polarised BRW *change* signal
-- (brw_yoy / brw_trend), distinct from the BRW *level* (int_berlin_brw_plr).
--
-- =============================================================================
-- R-C2 Methodology citations
-- =============================================================================
-- Smith (1979) rent gap: the LEVEL of capitalised ground-rent (int_berlin_brw_plr)
-- is only one term of the rent gap; the *realisation* of that gap is read from its
-- CHANGE over time -- rising land value ahead of the existing built-up use signals
-- upgrading pressure actually materialising, not just a structural precondition
-- for it. This model builds that change signal.
-- D3 geo-signoff (docs/epic-d/d3-price-rent-geo-signoff.md) condition 14 and D3
-- domain-signoff (docs/epic-d/d3-price-rent-domain-signoff.md) point D5 both
-- explicitly deferred this exact construction ("a defensible brw_yoy/brw_trend
-- change signal is possible ... but it must be built and polarised as an
-- explicit change indicator, distinct from the level") to this follow-up
-- ticket (#263) -- this model is that follow-up, not a new methodology
-- invention: it reuses the construction pattern both sign-offs pre-approved.
--
-- =============================================================================
-- Methodology
-- =============================================================================
-- Source: int_berlin_brw_plr (D3 level model; lor_2021 PLR grain only, 2017-2024
-- BRW back-series, area-weighted mean EUR/m2, residential zones only).
--
-- Explicit year_t / year_t-1 self-join (NOT LAG()): the BRW back-series is not
-- annual for every PLR (a PLR can have zero residential BRW coverage in a given
-- year and reappear later), so a blind LAG() over an ORDER BY snapshot_year
-- window could silently bridge a real multi-year gap as if it were a 1-year
-- delta. An explicit self-join on year_t-1 = year_t - 1 yields NULL instead of a
-- wrong value when the true predecessor year is missing for that PLR -- same
-- discipline as int_berlin_turnover_proxy and int_berlin_rent_pressure_proxy's
-- edition-matching.
--
-- brw_yoy_delta_eur_m2 = brw_weighted_avg_eur_m2(t) - brw_weighted_avg_eur_m2(t-1)
-- brw_yoy_pct_change    = brw_yoy_delta_eur_m2 / brw_weighted_avg_eur_m2(t-1)
-- (percentage form is the primary input to brw_trend below: a EUR100/m2 rise on
-- a EUR200/m2 base is a materially bigger rent-gap-realisation event than the
-- same absolute rise on a EUR2000/m2 base, so pooling raw EUR deltas across PLRs
-- with very different price levels before standardising would conflate scale
-- with pressure. The pct form removes that scale effect before z-scoring.)
--
-- brw_trend = per-(city_code, snapshot_year) z-score of brw_yoy_pct_change
-- across PLRs (NULLIF(stddev_pop,0) degenerate-year guard -- same
-- guard as int_ewr_socioeco / int_berlin_rent_pressure_proxy /
-- int_berlin_turnover_proxy).
--
-- Polarity (D3 geo condition 14; D3 domain point D5; Smith 1979): brw_trend is
-- built change-positive, NOT vulnerability-positive -- a HIGH (positive)
-- brw_trend means land value rose *faster* than the citywide PLR average that
-- year, i.e. the rent gap identified by the BRW level is being actively
-- realised (upgrading pressure). This is the OPPOSITE sign convention from a
-- vulnerability/deprivation composite (where high = more vulnerable): brw_trend
-- must NEVER be pooled unsigned into int_ewr_socioeco-style vulnerability
-- composites without an explicit sign discussion -- it belongs on the
-- predictor/lead side of the index (ADR-0008), not the outcome (D1/D2 MSS)
-- side, exactly as the D3 domain sign-off requires. Never fold into the D3
-- level dimension (they answer different questions: "is land expensive here"
-- vs "is it becoming more expensive here, relatively, right now").
--
-- Interpretation limits (D3 domain sign-off condition, restated here per R-C2):
-- - Land value is not realised rent: brw_trend is a rent-gap-REALISATION proxy,
-- not a measured rent or displacement outcome. Read jointly with low-status/
-- low-Wohnlage context (per D3 domain sign-off) before any displacement-risk
-- framing; never read alone as "displacement happened here".
-- - Back-series depth: only 2017-2024 (8 annual snapshots per int_berlin_brw_plr,
-- lor_2021-only), so brw_yoy/brw_trend exist for snapshot_year 2018-2024 (the
-- first available year, 2017, has no year_t-1 predecessor and is correctly
-- absent from this model's output, not NULL-padded).
-- - Residential-BRW-coverage guard: inherited from int_berlin_brw_plr -- a PLR
-- with zero residential BRW coverage in either year_t or year_t-1 has no row
-- in that year (int_berlin_brw_plr never emits 0, only omits the row), so the
-- self-join naturally excludes it rather than manufacturing a spurious delta
-- against an implicit zero.
--
-- Zero consumers as of this model -- following the same staged-slice pattern as
-- int_berlin_rent_pressure_proxy / int_berlin_turnover_proxy / the Milieuschutz
-- flag (all deliberately not wired into int_gentrification_ts or the
-- contract-enforced gentrification_index mart in their first slice). Wiring
-- this predictor-side signal into int_gentrification_ts (per ADR-0008
-- placement guidance above) is scoped to its own follow-up integration ticket,
-- mirroring the #258 (D5-wire) pattern for the B1 displacement proxies.
--
-- See docs/methodology/D3-brw-trend-geo-signoff.md and
-- docs/methodology/D3-brw-trend-domain-signoff.md.
--
-- Grain: one row per (city_code, area_code, area_vintage='lor_2021', snapshot_year)
-- where a year_t-1 counterpart exists in int_berlin_brw_plr.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_berlin_brw_plr') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    brw as (select * from {{ ref("int_berlin_brw_plr") }}),

    -- Explicit year_t / year_t-1 self-join (not LAG()) so a real gap in the
    -- back-series yields NULL/omission rather than a silently-wrong multi-year
    -- delta -- same discipline as int_berlin_turnover_proxy.
    with_prev as (
        select
            curr.city_code,
            curr.area_code,
            curr.area_vintage,
            curr.snapshot_year,
            curr.brw_weighted_avg_eur_m2,
            curr.brw_residential_coverage_frac,
            prev.brw_weighted_avg_eur_m2 as brw_weighted_avg_eur_m2_prev
        from brw as curr
        inner join
            brw as prev
            on curr.city_code = prev.city_code
            and curr.area_code = prev.area_code
            and curr.area_vintage = prev.area_vintage
            and prev.snapshot_year = curr.snapshot_year - 1
    ),

    with_raw as (
        select
            *,
            brw_weighted_avg_eur_m2
            - brw_weighted_avg_eur_m2_prev as brw_yoy_delta_eur_m2,
            (brw_weighted_avg_eur_m2 - brw_weighted_avg_eur_m2_prev)
            / nullif(brw_weighted_avg_eur_m2_prev, 0) as brw_yoy_pct_change
        from with_prev
    ),

    zscored as (
        select
            *,
            (
                brw_yoy_pct_change
                - avg(brw_yoy_pct_change) over (partition by city_code, snapshot_year)
            ) / nullif(
                stddev_pop(brw_yoy_pct_change) over (
                    partition by city_code, snapshot_year
                ),
                0
            ) as brw_trend
        from with_raw
    )

select
    city_code,
    area_code,
    area_vintage,
    snapshot_year,
    brw_weighted_avg_eur_m2,
    brw_weighted_avg_eur_m2_prev,
    brw_residential_coverage_frac,
    brw_yoy_delta_eur_m2,
    brw_yoy_pct_change,
    brw_trend
from zscored
