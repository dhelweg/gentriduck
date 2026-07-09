-- int_price_rent_wohnlage_mietspiegel.sql
-- QA-6b (#204): extracted from mart_price_rent_dimension.sql (616-line split, stretch
-- item deferred from QA-6 #181) to improve readability/testability. Pure mechanical
-- extraction -- no logic change; see mart_price_rent_dimension.sql header for the full
-- R-C2 methodology citations and geo/domain sign-off references (this model inherits
-- them unchanged, in particular geo conditions 7-10 and domain D6/D7/D13 below).
--
-- Purpose: merges Wohnlage tier composition (Signal 2) with the modelled Mietspiegel
-- rent estimate at the fixed representative dwelling profile (Signal 3), one row per
-- (city_code, snapshot_year=Wohnlage vintage, area_code, area_vintage).
--
-- dbt_meta_owner: data-engineer
{{ config(materialized="view", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Wohnlage: tier shares per PLR per vintage year (long format, one row per tier).
    wohnlage_long as (
        select
            city_code,
            vintage,
            area_code,
            area_vintage,
            wohnlage,
            n_addresses,
            pct_wohnlage,
            wohnlage_low_n
        from {{ ref("int_berlin_wohnlage_plr") }}
    ),

    -- Pivot Wohnlage from long to wide: one row per (vintage, PLR).
    -- COALESCE pct_* to 0.0 so that the composition sums to 1.0 even when a tier
    -- is fully absent in a PLR. wohnlage_low_n and total addresses are PLR-level.
    wohnlage_wide as (
        select
            city_code,
            vintage,
            area_code,
            area_vintage,
            sum(
                case when wohnlage = 'einfach' then pct_wohnlage else 0.0 end
            ) as pct_einfach,
            sum(
                case when wohnlage = 'mittel' then pct_wohnlage else 0.0 end
            ) as pct_mittel,
            sum(case when wohnlage = 'gut' then pct_wohnlage else 0.0 end) as pct_gut,
            sum(n_addresses) as total_n_addresses,
            -- wohnlage_low_n is the same for all tiers within a PLR-vintage
            max(cast(wohnlage_low_n as integer)) = 1 as wohnlage_low_n
        from wohnlage_long
        group by city_code, vintage, area_code, area_vintage
    ),

    -- Mietspiegel rent values for the fixed representative profile (geo condition 9):
    -- size_bucket = '60_to_90'  (60–90 m² band)
    -- year_built_bucket = '1950_1964'  (mid/representative construction-year bucket)
    -- Harmonised bucket crosswalk (geo condition 10):
    -- '1950_1964' exists in all Mietspiegel vintages (2017, 2019, 2021, 2023, 2024,
    -- 2026)
    -- and is therefore the stable anchor across the full series without schema-drift
    -- breaks.
    -- See mart_price_rent_dimension.sql header note on the 1973+ drift and bucket
    -- split in 2024/2026 editions.
    mietspiegel_fixed as (
        select vintage as ms_vintage, wohnlage, rent_low, rent_mid, rent_high
        from {{ ref("stg_berlin_mietspiegel") }}
        -- Fixed profile (declared modelling choice; stated on G2):
        -- 60–90 m² mid-size band; 1950–1964 construction year (harmonised mid bucket).
        where size_bucket = '60_to_90' and year_built_bucket = '1950_1964'
    ),

    -- Pivot Mietspiegel to one row per vintage: three wohnlage columns each for
    -- low/mid/high.
    mietspiegel_pivot as (
        select
            ms_vintage,
            sum(case when wohnlage = 'einfach' then rent_low end) as ms_einfach_low,
            sum(case when wohnlage = 'einfach' then rent_mid end) as ms_einfach_mid,
            sum(case when wohnlage = 'einfach' then rent_high end) as ms_einfach_high,
            sum(case when wohnlage = 'mittel' then rent_low end) as ms_mittel_low,
            sum(case when wohnlage = 'mittel' then rent_mid end) as ms_mittel_mid,
            sum(case when wohnlage = 'mittel' then rent_high end) as ms_mittel_high,
            sum(case when wohnlage = 'gut' then rent_low end) as ms_gut_low,
            sum(case when wohnlage = 'gut' then rent_mid end) as ms_gut_mid,
            sum(case when wohnlage = 'gut' then rent_high end) as ms_gut_high
        from mietspiegel_fixed
        group by ms_vintage
    )

-- Vintage-matching (geo condition 8):
-- Join Wohnlage vintage to the nearest Mietspiegel vintage <= Wohnlage vintage.
-- Mietspiegel vintages available: 2017, 2019, 2021, 2023, 2024, 2026.
-- Wohnlage vintages:              2017, 2019, 2021, 2023,       2026.
-- All Wohnlage vintages have an exact Mietspiegel match (no interpolation needed).
-- Approximation disclosure (domain D13): 2026 Wohnlage stands in for the 2025 MSS
-- panel edition; document on G2.
select
    w.city_code,
    w.vintage as snapshot_year,
    w.area_code,
    w.area_vintage,
    w.pct_einfach,
    w.pct_mittel,
    w.pct_gut,
    w.total_n_addresses,
    w.wohnlage_low_n,
    -- wohnlage_score: ordinal mean approximation (einfach=1, mittel=2, gut=3).
    -- Labelled as ordinal-mean approximation; not equidistant interval.
    -- NULL when wohnlage_low_n = TRUE (< 10 addresses; unstable).
    case
        when w.wohnlage_low_n
        then null
        else w.pct_einfach * 1.0 + w.pct_mittel * 2.0 + w.pct_gut * 3.0
    end as wohnlage_score,
    -- Modelled rent estimate (geo conditions 9, 10; domain D6, D7):
    -- est_rent_X = SUM_tier(pct_tier * ms_X_tier)
    -- Fixed profile: 60–90 m², 1950–1964 construction year.
    -- "modelled/estimated net cold rent at a fixed reference dwelling profile
    -- — NOT observed rent paid." (Mietspiegel ortsübliche Vergleichsmiete;
    -- Bestandsmiete lagging bias; Holm 2010 ~84% rental Berlin).
    -- NULL when wohnlage_low_n = TRUE (geo condition 7).
    case
        when w.wohnlage_low_n
        then null
        else
            (
                w.pct_einfach * m.ms_einfach_mid
                + w.pct_mittel * m.ms_mittel_mid
                + w.pct_gut * m.ms_gut_mid
            )
    end as est_rent_mid,
    case
        when w.wohnlage_low_n
        then null
        else
            (
                w.pct_einfach * m.ms_einfach_low
                + w.pct_mittel * m.ms_mittel_low
                + w.pct_gut * m.ms_gut_low
            )
    end as est_rent_low,
    case
        when w.wohnlage_low_n
        then null
        else
            (
                w.pct_einfach * m.ms_einfach_high
                + w.pct_mittel * m.ms_mittel_high
                + w.pct_gut * m.ms_gut_high
            )
    end as est_rent_high,
    m.ms_vintage as mietspiegel_vintage_used
from wohnlage_wide as w
-- Nearest-<= Mietspiegel vintage: for all Wohnlage vintages in the series
-- (2017,2019,2021,2023,2026) there is an exact Mietspiegel match.
-- The lateral-style join below takes the max Mietspiegel vintage that is <=
-- Wohnlage.
inner join
    mietspiegel_pivot as m
    on m.ms_vintage = (
        select max(mp2.ms_vintage)
        from mietspiegel_pivot as mp2
        where mp2.ms_vintage <= w.vintage
    )
