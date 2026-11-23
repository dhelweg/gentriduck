-- int_berlin_ewr_plr2021.sql
-- Intermediate model: aligns the EWR time series to the LOR 2021 PLR scheme.
--
-- Problem: stg_berlin_ewr contains rows with area_vintage='lor_pre2021'
-- (reference_year <= 2020, old 447/448-PLR scheme) and area_vintage='lor_2021'
-- (reference_year >= 2021, new 542-PLR scheme). Cross-vintage time-series
-- analysis requires mapping pre-2021 PLR codes to their 2021 equivalents.
--
-- Crosswalk strategy:
-- 1. Rows with area_vintage='lor_2021': passed through as-is.
-- 2. Rows with area_vintage='lor_pre2021': joined to seed_lor_crosswalk_2006_to_2021
-- (forward weight w = intersection area / pre-2021 PLR area) and re-aggregated
-- per 2021 PLR by indicator class (below). mapping_type='stub' rows are excluded.
--
-- Crosswalk seed: 3088 rows (448 pre-2021 PLRs -> 542 2021 PLRs) derived from GDI
-- Berlin WFS geometries (EPSG:25833) via ingestion/berlin/lor/ingest_lor_crosswalk.py.
-- Geo-DS approved 2026-06-19 (docs/epic-c/C3-crosswalk-geo-signoff.md, PASS).
-- Weight sums PER SOURCE (pre-2021 PLR) are 0.9993-1.0000 (C3 §4 gate). The seed's
-- mapping_type label 'areal_pop_weighted' is historical: the weights are AREA-ONLY
-- (no population or dasymetric information, #372); population weighting of the
-- intensive indicators happens here, not in the seed.
--
-- Indicator classes (#381; class = seed_ewr_indicator_meta.unit, explicit mapping
-- in the indicator_class CTE; an indicator whose unit is not mapped gets a NULL
-- value and fails test_381_ewr_plr2021_indicator_class_known):
-- * extensive (unit 'count': residents_total) -- areal interpolation of a count
-- (Goodchild & Lam 1980, "Areal interpolation: a variant of the traditional
-- spatial problem", Geo-Processing 1; Tobler 1979, JASA 74, on mass-preserving
-- areal interpolation; C3 sign-off §3):
-- count_t = SUM_s(count_s * w_st)
-- Mass-preserving per source because SUM_t(w_st) = 1. Unchanged by #381.
-- * intensive (unit 'share' or 'years': all *_share, mean_age_years) -- the
-- population-weighted mean of the contributing source values, with the
-- source population apportioned by the same area weight (C3 sign-off §3, the
-- approved "true weighted average"; Flowerdew & Green 1992 on intensive vs
-- extensive data in areal interpolation):
-- value_t = SUM_s(value_s * P_s * w_st) / SUM_s(P_s * w_st)
-- with P_s = residents_total of source PLR s in the same reference_year.
-- Sources with a NULL value (suppressed / not published, e.g.
-- foreigners_share before 2014) or NULL P_s are excluded from numerator AND
-- denominator; all-NULL or zero-population targets yield NULL (never 0).
--
-- Why the class split matters (#381): before this fix every indicator was
-- computed as SUM_s(value_s * w_st). That is correct for counts but, for an
-- intensive indicator, scales the value by SUM_s(w_st) -- the weight sum PER
-- TARGET, which ranges 0.033-2.031 (243 of 542 2021 PLRs more than 2 % from 1,
-- because w is normalised per source, not per target). Example: Pankower Tor
-- (03400831) 2020 mean age 7.5 years, male + female share 0.176; Bezirk Pankow
-- 2020 mean age 29.1 vs native 41.5 (docs/epic-c/372-investigation.md §3.3,
-- docs/epic-c/381-geo-triage.md). The population-weighted mean is invariant to the
-- per-target weight sum. Tests: test_381_ewr_plr2021_* (share range, male +
-- female = 1, mean-age plausibility, counts re-derived, Bezirk mean age vs the
-- native uncrosswalked aggregate).
--
-- Remaining limitation (documented, not fixed here): weights are area-only, so a
-- source's residents are spread uniformly over its area (C3 §2). Counts at PLR /
-- Ortsteil grain are distorted where population is concentrated (#372: e.g.
-- Pankower Tor 6,295 crosswalked residents in 2020, 0 in 2024); consumers that
-- publish PLR counts must not use the pre-2021 rows (mart_area_demographics
-- suppresses them, #372 option (b)). The population-weighted means inherit the
-- same within-source uniformity assumption but no longer the per-target scaling.
--
-- Publisher code typo (2024 only, #372/#381): the 2024 EWR file labels the blank
-- Landweg row '06200318', which is not a LOR 2021 PLR code (stg_berlin_lor).
-- Corrected to '06200418' here, exactly as stg_berlin_ewr_age_bands does (#371);
-- test_381_ewr_plr2021_codes_in_lor guards every plr_id_2021.
--
-- Output grain: (reference_year, plr_id_2021, indicator); plr_id_2021 always in
-- the LOR 2021 scheme. area_vintage is the BOUNDARY SCHEME of the output row and
-- is always 'lor_2021'; source_area_vintage records where the value came from
-- ('lor_pre2021' = crosswalked, 'lor_2021' = native passthrough).
-- crosswalk_weight and crosswalk_type are NULL post-aggregation (not meaningful).
--
-- Known breaks (inherited from stg_berlin_ewr):
-- - LOR 2021 reform: this model resolves the break for aligned analysis.
-- - Migrationshintergrund ~2017: see seed_ewr_indicator_meta (stable_from_year=2017).
-- This model does not filter by stable_from_year; consumers should apply that filter.
--
-- Materialization: table (not view) to work around DuckDB UNPIVOT-in-view chaining
-- limitation: stg_berlin_ewr uses UNPIVOT; referencing it in a view-over-view
-- causes a DuckDB bind error. Materializing as table resolves this at build time.
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    ewr as (select * from {{ ref("stg_berlin_ewr") }}),

    crosswalk as (
        select *
        from {{ ref("seed_lor_crosswalk_2006_to_2021") }}
        -- Exclude the stub placeholder row (dummy codes 00000000).
        where mapping_type != 'stub'
    ),

    -- #381: explicit extensive/intensive classification from the indicator
    -- metadata seed's unit (read-only). Unmapped units -> NULL class -> NULL
    -- value (never silently area-allocated); guarded by a singular test.
    indicator_class as (
        select
            indicator,
            case
                when unit = 'count'
                then 'extensive'
                when unit in ('share', 'years')
                then 'intensive'
            end as indicator_class
        from {{ ref("seed_ewr_indicator_meta") }}
    ),

    -- lor_2021 rows pass through directly (native values).
    lor2021_passthrough as (
        select
            city_code,
            -- publisher typo, see header (2024 only, mirrors stg_berlin_ewr_age_bands)
            case
                when reference_year = 2024 and area_code = '06200318'
                then '06200418'
                else area_code
            end as plr_id_2021,
            'lor_2021' as source_area_vintage,
            reference_year,
            reference_date,
            indicator,
            indicator_value,
            is_suppressed_any,
            source_attribution
        from ewr
        where area_vintage = 'lor_2021'
    ),

    -- P_s: the source PLR's own residents_total in the same year (C3 §3 weight).
    source_population as (
        select area_code, reference_year, indicator_value as source_residents
        from ewr
        where area_vintage = 'lor_pre2021' and indicator = 'residents_total'
    ),

    -- lor_pre2021 rows: one row per (source PLR, target PLR, year, indicator).
    lor_pre2021_mapped as (
        select
            ewr.city_code,
            cw.plr_id_2021,
            ewr.reference_year,
            ewr.reference_date,
            ewr.indicator,
            ic.indicator_class,
            ewr.indicator_value as source_value,
            cw.weight,
            sp.source_residents,
            ewr.is_suppressed_any,
            ewr.source_attribution
        from ewr
        inner join crosswalk as cw on ewr.area_code = cw.plr_id_pre2021
        left join indicator_class as ic on ewr.indicator = ic.indicator
        left join
            source_population as sp
            on ewr.area_code = sp.area_code
            and ewr.reference_year = sp.reference_year
        where ewr.area_vintage = 'lor_pre2021'
    ),

    -- Re-aggregate per target 2021 PLR by indicator class (see header formulas).
    -- is_suppressed_any: MAX (True if any contributing source was suppressed).
    -- source_attribution: MIN (all rows share the same source).
    lor_pre2021_crosswalked as (
        select
            city_code,
            plr_id_2021,
            'lor_pre2021' as source_area_vintage,
            reference_year,
            min(reference_date) as reference_date,
            indicator,
            case
                indicator_class
                -- C3 §3 / Goodchild & Lam 1980: count_t = SUM(count_s * w_st)
                when 'extensive'
                then sum(source_value * weight)
                -- C3 §3 / #381: SUM(v * P * w) / SUM(P * w) over sources with
                -- both v and P present
                when 'intensive'
                then
                    sum(source_value * source_residents * weight) / nullif(
                        sum(source_residents * weight) filter (
                            where source_value is not null
                        ),
                        0
                    )
            end as indicator_value,
            max(is_suppressed_any) as is_suppressed_any,
            min(source_attribution) as source_attribution
        from lor_pre2021_mapped
        group by city_code, plr_id_2021, reference_year, indicator, indicator_class
    ),

    combined as (
        select *
        from lor2021_passthrough
        union all
        select *
        from lor_pre2021_crosswalked
    )

select
    city_code,
    plr_id_2021,
    -- Boundary scheme of the output row: always LOR 2021 (see header).
    'lor_2021' as area_vintage,
    source_area_vintage,
    reference_year,
    reference_date,
    indicator,
    indicator_value,
    is_suppressed_any,
    source_attribution,
    cast(null as double) as crosswalk_weight,
    cast(null as varchar) as crosswalk_type
from combined
