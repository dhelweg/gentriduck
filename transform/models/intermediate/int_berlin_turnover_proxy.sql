-- int_berlin_turnover_proxy.sql
-- #70 [B1], third slice: turnover / Wohndauer (residence-duration) proxy.
--
-- Deferred from the first two #70 slices pending #68 (EWR indicator-semantics audit,
-- now closed) -- that audit (docs/methodology/indicator-semantics.md) confirmed
-- `residence_duration_5y_share` (EWR field DAU5) is correctly signed as a *level*:
-- high share of 5+-year residents = a stable, long-tenure, not-yet-gentrified
-- population (the "single most important sign", indicator-semantics.md line 103).
-- That level is already the vulnerability-positive input consumed by
-- `int_ewr_socioeco`'s composite. This model instead operationalizes the *thesis's own
-- change convention* for the same field (indicator-semantics.md lines 65-66: the
-- original thesis pipeline negates `dau5_msr` -- "DAU5 falling -> gentrifying") as a
-- standalone year-over-year **turnover proxy**: a PLR where the long-tenure share is
-- *shrinking* is one where established residents are leaving faster than they are
-- being replaced by other long-tenure residents -- a displacement/turnover signal
-- distinct from (and complementary to) the static vulnerability level already in
-- `int_ewr_socioeco`.
--
-- Formula:
-- delta_residence_5y  = residence_duration_5y_share(t) -
-- residence_duration_5y_share(t-1)
-- (explicit year_t / year_t-1 self-join, not a blind LAG(), so a
-- real gap in the annual EWR panel yields NULL rather than a
-- silently-wrong multi-year delta -- same discipline as the
-- edition-matching in int_berlin_rent_pressure_proxy.)
-- turnover_raw        = -1 * delta_residence_5y  (thesis sign convention: falling
-- long-tenure share = turnover-positive; mirrors
-- indicator-semantics.md's documented `dau5_msr * -1`.)
-- turnover_proxy       = per-(city_code, reference_year) z-score of turnover_raw across
-- PLRs (NULLIF(stddev,0) degenerate-year guard), mirroring the
-- z-score-composite pattern of int_ewr_socioeco and
-- int_berlin_rent_pressure_proxy so this column sits on the same
-- unit-variance scale as the rest of the B1 displacement
-- dimension.
--
-- Scope limits (explicit, per R-C2 grounding):
-- - This is a single-indicator change score, not a multi-indicator composite -- no
-- averaging/weighting decision is made here (unlike rent_pressure_proxy).
-- - Uninhabited-PLR guard: rows with residents_total IS NULL or = 0 at year_t are
-- excluded (mirrors int_ewr_lead_lag's guard -- no population, no meaningful
-- residence-duration statistic).
-- - Cross-era caution: is_partial_composite is carried through for both years; a
-- pre-2014 endpoint (partial composite era) still has residence_duration_5y_share
-- populated (it is one of the 3 partial-composite indicators), so turnover_proxy is
-- NOT restricted to 2014+, but any_endpoint_partial is exposed so consumers can
-- filter consistently with the B9 cross-era pooling caution if they later pool this
-- with the 5-indicator composite.
-- - Zero consumers as of this model -- not yet wired into any mart or the governed
-- gentrification_index (same staged-slice pattern as int_berlin_rent_pressure_proxy;
-- integration is a separately-gated future slice per the #70 progress notes).
-- Follow-up now tracked: #258 (see
-- docs/epic-d/tickets/D5-wire.md).
-- - Known coverage gap (#197, upstream EWR CSV parse failures):
-- residence_duration_5y_share
-- is entirely NULL for reference_year 2024 and 2025 as ingested (confirmed directly
-- against int_ewr_socioeco: 0 of 542/540 rows populated for those years), so
-- turnover_raw/turnover_proxy are NULL for reference_year=2025 (year_t-1=2024 has no
-- usable input) and reference_year=2024 rows are excluded outright by the uninhabited/
-- NULL propagation upstream. This is honest NULL propagation of a pre-existing,
-- already-tracked data gap, not a defect in this model -- do not impute across it.
--
-- Grain: one row per (city_code, area_code, area_vintage, reference_year) where a
-- year_t-1 counterpart exists in the panel.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_ewr_socioeco') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    ewr as (
        select
            city_code,
            area_code,
            area_vintage,
            reference_year,
            residence_duration_5y_share,
            is_partial_composite,
            residents_total
        from {{ ref("int_ewr_socioeco") }}
        where residents_total is not null and residents_total > 0
    ),

    -- Explicit year_t / year_t-1 self-join (not LAG()) so a real gap in the annual
    -- panel yields NULL rather than a silently-wrong multi-year delta.
    with_prev as (
        select
            curr.city_code,
            curr.area_code,
            curr.area_vintage,
            curr.reference_year,
            curr.residence_duration_5y_share,
            curr.is_partial_composite,
            prev.residence_duration_5y_share as residence_duration_5y_share_prev,
            prev.is_partial_composite as is_partial_composite_prev,
            (
                curr.is_partial_composite or prev.is_partial_composite
            ) as any_endpoint_partial
        from ewr as curr
        inner join
            ewr as prev
            on curr.city_code = prev.city_code
            and curr.area_code = prev.area_code
            and curr.area_vintage = prev.area_vintage
            and prev.reference_year = curr.reference_year - 1
    ),

    with_raw as (
        select
            *,
            -- Thesis sign convention (indicator-semantics.md 65-66): negate the
            -- residence-duration change so a falling long-tenure share scores
            -- turnover-positive.
            -1.0 * (
                residence_duration_5y_share - residence_duration_5y_share_prev
            ) as turnover_raw
        from with_prev
    ),

    zscored as (
        select
            *,
            (
                turnover_raw
                - avg(turnover_raw) over (partition by city_code, reference_year)
            ) / nullif(
                stddev_pop(turnover_raw) over (partition by city_code, reference_year),
                0
            ) as turnover_proxy
        from with_raw
    )

select
    city_code,
    area_code,
    area_vintage,
    reference_year,
    residence_duration_5y_share,
    residence_duration_5y_share_prev,
    turnover_raw,
    turnover_proxy,
    any_endpoint_partial
from zscored
