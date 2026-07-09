-- int_price_rent_brw_wohnlage_combined.sql
-- QA-6b (#204): extracted from mart_price_rent_dimension.sql (616-line split, stretch
-- item deferred from QA-6 #181) to improve readability/testability. Pure mechanical
-- extraction -- no logic change; see mart_price_rent_dimension.sql header for the full
-- R-C2 methodology citations and geo/domain sign-off references (this model inherits
-- them unchanged).
--
-- Purpose: aligns the BRW land-value series (Signal 1, yearly 2017-2024) with the
-- Wohnlage+modelled-rent series (Signals 2+3, from int_price_rent_wohnlage_mietspiegel,
-- biennial 2017/2019/2021/2023/2026) via nearest-<= vintage matching, then UNIONs in
-- Wohnlage-only rows for vintages that have no BRW companion (e.g. 2026). One row per
-- (city_code, snapshot_year, area_code, area_vintage) -- the mart's final grain.
--
-- dbt_meta_owner: data-engineer
{{ config(materialized="view", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- BRW: area-weighted mean land value per PLR per snapshot year.
    brw as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            brw_weighted_avg_eur_m2,
            n_brw_zones,
            brw_residential_coverage_frac
        from {{ ref("int_berlin_brw_plr") }}
    ),

    wohnlage_with_rent as (
        select * from {{ ref("int_price_rent_wohnlage_mietspiegel") }}
    ),

    -- BRW × Wohnlage alignment:
    -- BRW has yearly data (2017–2024); Wohnlage has biennial data
    -- (2017,2019,2021,2023,2026).
    -- We produce one row per BRW snapshot_year, attaching the nearest-<= Wohnlage
    -- vintage.
    -- When no Wohnlage vintage is <= the BRW year, Wohnlage columns are NULL.
    brw_aligned as (
        select
            b.city_code,
            b.snapshot_year,
            b.area_code,
            b.area_vintage,
            b.brw_weighted_avg_eur_m2,
            b.n_brw_zones,
            b.brw_residential_coverage_frac,
            w.pct_einfach,
            w.pct_mittel,
            w.pct_gut,
            w.total_n_addresses,
            w.wohnlage_low_n,
            w.wohnlage_score,
            w.est_rent_mid,
            w.est_rent_low,
            w.est_rent_high,
            w.mietspiegel_vintage_used,
            -- Record which Wohnlage vintage was matched for audit trail
            w.snapshot_year as wohnlage_vintage_matched
        from brw as b
        left join
            wohnlage_with_rent as w
            on b.city_code = w.city_code
            and b.area_code = w.area_code
            and b.area_vintage = w.area_vintage
            and w.snapshot_year = (
                select max(wwr2.snapshot_year)
                from wohnlage_with_rent as wwr2
                where
                    wwr2.city_code = b.city_code
                    and wwr2.area_code = b.area_code
                    and wwr2.area_vintage = b.area_vintage
                    and wwr2.snapshot_year <= b.snapshot_year
            )
    )

-- Add Wohnlage-only rows (vintages 2026 have no BRW match since BRW only goes to
-- 2024).
-- UNION the wohnlage_with_rent rows that don't appear in BRW.
-- For Wohnlage vintage 2026 (no BRW year 2026), carry it as a Wohnlage-only row.
select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    brw_weighted_avg_eur_m2,
    n_brw_zones,
    brw_residential_coverage_frac,
    pct_einfach,
    pct_mittel,
    pct_gut,
    total_n_addresses,
    wohnlage_low_n,
    wohnlage_score,
    est_rent_mid,
    est_rent_low,
    est_rent_high,
    mietspiegel_vintage_used,
    wohnlage_vintage_matched
from brw_aligned

union all

-- Wohnlage-only rows: vintages where no BRW snapshot exists.
-- BRW covers 2017–2024; Wohnlage vintage 2026 has no BRW companion.
select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    null as brw_weighted_avg_eur_m2,
    null as n_brw_zones,
    null as brw_residential_coverage_frac,
    pct_einfach,
    pct_mittel,
    pct_gut,
    total_n_addresses,
    wohnlage_low_n,
    wohnlage_score,
    est_rent_mid,
    est_rent_low,
    est_rent_high,
    mietspiegel_vintage_used,
    snapshot_year as wohnlage_vintage_matched
from wohnlage_with_rent as wwr
where wwr.snapshot_year not in (select distinct b.snapshot_year from brw as b)
