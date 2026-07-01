-- int_ewr_socioeco_hamburg_disagg.sql
-- #40 H1 methodology-gated integration slice: helper model that performs the
-- Stadtteil -> statistisches-Gebiet disaggregation step for Hamburg's
-- EWR-equivalent predictors (ADR-0014 open question #5). Split out from
-- int_ewr_socioeco_hamburg as a separate materialized table purely for a
-- DuckDB implementation reason: DuckDB does not support nested window
-- functions, and its binder fails with "unordered_map::at: key not found"
-- when window functions are chained across too many subquery/join layers in
-- a single statement (same limitation documented in int_poi_share_base's
-- header, C5). This model performs the disaggregation joins only (no window
-- functions); int_ewr_socioeco_hamburg reads this table and applies the
-- z-score window functions in a single, shallow pass.
--
-- Not methodology-bearing on its own terms (this is the join-mechanics half);
-- the reconciliation METHOD it implements (uniform inheritance from Stadtteil
-- to every child Gebiet, via a name-matched crosswalk) is the methodology
-- decision -- see int_ewr_socioeco_hamburg's header for the full rationale,
-- since that is the model that actually resolves ADR-0014 open question #5
-- and carries the sign-off requirement. This helper is reviewed as part of
-- the same methodology-gated slice.
--
-- =============================================================================
-- Method (see int_ewr_socioeco_hamburg header for full rationale)
-- =============================================================================
-- 1. Crosswalk: Gebiet -> Stadtteil name, sourced from
-- stg_hamburg_sozialmonitoring.stadtteil_name (informational field, latest
-- edition per Gebiet), matched case/whitespace-insensitively to
-- stg_hamburg_geo's Stadtteil area_name (area_level='subarea_l1').
-- 2. Every Gebiet (from stg_hamburg_geo, area_level='subarea_l2') inherits its
-- matched Stadtteil's EWR-equivalent indicator values UNCHANGED (uniform
-- disaggregation, not a population/area-weighted split -- no Gebiet-level
-- population weight is available in the ingested source set).
--
-- Output grain: (city_code='HH', area_code=Gebiet statgeb id,
-- area_vintage='current', reference_year).
--
-- Graceful degradation: returns zero rows when any upstream has no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('stg_hamburg_ewr_stadtteil') }}
-- depends_on: {{ ref('stg_hamburg_geo') }}
-- depends_on: {{ ref('stg_hamburg_sozialmonitoring') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Step 1: Stadtteil-grain EWR indicators, pivoted long -> wide.
    stadtteil_wide as (
        select
            city_code,
            area_code as stadtteil_code,
            reference_year,
            max(indicator_value) filter (
                where indicator = 'residents_total'
            ) as residents_total,
            max(indicator_value) filter (
                where indicator = 'age_under18_share'
            ) as age_under18_share,
            max(indicator_value) filter (
                where indicator = 'foreigners_share'
            ) as foreigners_share,
            max(indicator_value) filter (
                where indicator = 'unemployment_share'
            ) as unemployment_share
        from {{ ref("stg_hamburg_ewr_stadtteil") }}
        group by city_code, area_code, reference_year
    ),

    -- Step 2: Stadtteil area_name lookup (from geometry staging, area_level =
    -- 'subarea_l1'), keyed by the Stadtteil natural code so it can be joined
    -- back to stadtteil_wide's stadtteil_code.
    stadtteil_names as (
        select area_code as stadtteil_code, area_name as stadtteil_name
        from {{ ref("stg_hamburg_geo") }}
        where area_level = 'subarea_l1' and area_name is not null
    ),

    -- Step 3: Gebiet (statistisches Gebiet, subarea_l2) -> Stadtteil-name
    -- crosswalk, sourced from Sozialmonitoring's informational stadtteil_name
    -- field (see header -- the only ingested Gebiet-to-Stadtteil link).
    gebiet_stadtteil_xwalk as (
        select area_code as gebiet_code, stadtteil_name
        from {{ ref("stg_hamburg_sozialmonitoring") }}
        where stadtteil_name is not null and stadtteil_name != ''
        qualify row_number() over (partition by area_code order by edition desc) = 1
    ),

    -- Step 4: normalize name strings on both sides for a robust match (trim +
    -- lower-case; German umlauts are preserved verbatim since both sources
    -- originate from the same Transparenzportal/BSW naming convention).
    gebiet_to_stadtteil_code as (
        select x.gebiet_code, sn.stadtteil_code
        from gebiet_stadtteil_xwalk as x
        inner join
            stadtteil_names as sn
            on lower(trim(x.stadtteil_name)) = lower(trim(sn.stadtteil_name))
    ),

    -- Step 5: enumerate the full set of Gebiete that need an EWR row (from the
    -- geometry staging, subarea_l2) so that Gebiete present in geometry but not
    -- in the Sozialmonitoring crosswalk (e.g. unscored Gebiete below the
    -- >300-resident threshold) are still visible with NULL indicators rather
    -- than silently absent.
    all_gebiete as (
        select area_code as gebiet_code, city_code
        from {{ ref("stg_hamburg_geo") }}
        where area_level = 'subarea_l2' and area_code is not null
    )

-- Step 6: disaggregate Stadtteil indicators down to every Gebiet in that
-- Stadtteil (uniform inheritance, see header method note).
select
    g.city_code,
    g.gebiet_code as area_code,
    'current' as area_vintage,
    sw.reference_year,
    sw.residents_total,
    sw.age_under18_share,
    sw.foreigners_share,
    sw.unemployment_share,
    true as is_disaggregated_from_stadtteil
from all_gebiete as g
left join gebiet_to_stadtteil_code as xw on g.gebiet_code = xw.gebiet_code
left join
    stadtteil_wide as sw
    on xw.stadtteil_code = sw.stadtteil_code
    and g.city_code = sw.city_code
