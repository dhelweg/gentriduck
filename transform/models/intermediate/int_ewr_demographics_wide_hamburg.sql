-- int_ewr_demographics_wide_hamburg.sql
-- #313: Hamburg analogue of int_ewr_demographics_wide.sql -- pivots
-- stg_hamburg_ewr_stadtteil (long format, Hamburg's 7-indicator
-- EWR-equivalent series) to one row per (city_code, area_code,
-- area_vintage, reference_year), at STADTTEIL grain, for DISPLAY purposes.
--
-- CONSULTATION (2026-07-31, #313): geo-data-scientist and
-- gentrification-domain-expert were independently consulted on whether/how
-- to admit Hamburg into the mart_area_demographics display mart ahead of
-- H3's (#237) EWR-composite admission into gentrification_index. Both
-- converged: individual EWR-equivalent indicators (this model) are safe to
-- display; the BLENDED composite (2-indicator as of #329) is not (see
-- mart_area_demographics.sql header for the full rationale -- that
-- composite is never read here or by the mart this feeds).
--
-- GRAIN CHOICE -- Stadtteil, deliberately NOT Gebiet (domain-expert
-- condition, #313): this model reads stg_hamburg_ewr_stadtteil DIRECTLY,
-- not int_ewr_socioeco_hamburg / int_ewr_socioeco_hamburg_disagg (which
-- disaggregate Stadtteil-level EWR values down to Gebiet grain for the D4
-- predictor-composite use case in gentrification_index). Hamburg's raw EWR
-- source only ever publishes at Stadtteil grain -- the Gebiet-level values
-- in the disagg model are UNIFORMLY INHERITED from their parent Stadtteil
-- with zero sub-Stadtteil variation (see H3-geo-signoff.md's D4 discussion:
-- effective N ~104 Stadtteile, not ~941 Gebiete, for this pillar). Showing
-- that inherited, non-varying value at Gebiet grain in a DISPLAY mart would
-- be false precision -- a reader would reasonably assume Gebiet-level
-- figures reflect Gebiet-level measurement. This model's own grain (one row
-- per Stadtteil) sidesteps that risk entirely by construction.
--
-- Separation of concerns: same rationale as int_ewr_demographics_wide.sql
-- (Berlin) not reusing int_ewr_socioeco -- this is a read-only, display-only
-- re-pivot of the raw staging series, kept fully separate from
-- int_ewr_socioeco_hamburg's own D4-composite grain/dedup logic so neither
-- is at risk of being disturbed by the other's needs.
--
-- Indicators pivoted: all 7 of stg_hamburg_ewr_stadtteil's indicators
-- (residents_total, residents_male_share, residents_female_share,
-- age_under18_share, age_65plus_share, foreigners_share,
-- unemployment_share) -- narrower than Berlin's 13 because that is
-- Hamburg's entire published EWR-equivalent indicator set at this grain
-- (see stg_hamburg_ewr_stadtteil.sql header); no Berlin-only indicator
-- (age_18_27_share, age_27_45_share, age_45_65_share, mean_age_years,
-- migration_background_share, residence_duration_5y_share,
-- residence_duration_10y_share) exists for Hamburg -- not fabricated here.
--
-- Grain: one row per (city_code='HH', area_code, area_vintage,
-- reference_year), Stadtteil (subarea_l1) level only. Downstream
-- mart_area_demographics (marts/) rolls this up to district (Bezirk) via
-- dim_area_hierarchy's hh_l1_to_district edge -- NOT a code-prefix
-- substr(), since Hamburg area codes do not nest like Berlin's LOR codes
-- (see dim_area_hierarchy.sql header).
--
-- reference_date: stg_hamburg_ewr_stadtteil does not carry a 31-Dec
-- snapshot date column (Berlin's stg_berlin_ewr does -- see that model's
-- header); Hamburg's source only publishes an annual reference_year.
-- Cast to a typed NULL here (rather than omitting the column) so this
-- model's shape matches int_ewr_demographics_wide.sql's for
-- mart_area_demographics's Berlin/Hamburg `union all` -- not fabricated.
--
-- Graceful degradation: returns zero rows when stg_hamburg_ewr_stadtteil
-- has no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('stg_hamburg_ewr_stadtteil') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    ewr as (
        select
            city_code,
            area_code,
            area_vintage,
            reference_year,
            indicator,
            indicator_value,
            is_suppressed_any,
            source_attribution
        from {{ ref("stg_hamburg_ewr_stadtteil") }}
    )

select
    city_code,
    area_code,
    area_vintage,
    reference_year,
    cast(null as date) as reference_date,
    max(indicator_value) filter (
        where indicator = 'residents_total'
    ) as residents_total,
    max(indicator_value) filter (
        where indicator = 'residents_male_share'
    ) as residents_male_share,
    max(indicator_value) filter (
        where indicator = 'residents_female_share'
    ) as residents_female_share,
    max(indicator_value) filter (
        where indicator = 'age_under18_share'
    ) as age_under18_share,
    max(indicator_value) filter (
        where indicator = 'age_65plus_share'
    ) as age_65plus_share,
    max(indicator_value) filter (
        where indicator = 'foreigners_share'
    ) as foreigners_share,
    max(indicator_value) filter (
        where indicator = 'unemployment_share'
    ) as unemployment_share,
    -- Suppression: TRUE if ANY pivoted indicator for this area/year was
    -- suppressed at source (propagate, don't silently zero -- same
    -- discipline as int_ewr_demographics_wide.sql / stg_hamburg_ewr_stadtteil).
    bool_or(coalesce(is_suppressed_any, false)) as any_indicator_suppressed,
    max(source_attribution) as source_attribution
from ewr
group by city_code, area_code, area_vintage, reference_year
