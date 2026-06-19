-- int_berlin_ewr_plr2021.sql
-- Intermediate model: aligns the EWR time series to the LOR 2021 PLR scheme.
--
-- Problem: stg_berlin_ewr contains rows with area_vintage='lor_pre2021'
-- (reference_year <= 2020, old 447-PLR scheme) and area_vintage='lor_2021'
-- (reference_year >= 2021, new 542-PLR scheme). Cross-vintage time-series
-- analysis requires mapping pre-2021 PLR codes to their 2021 equivalents.
--
-- Crosswalk strategy:
-- 1. Rows with area_vintage='lor_2021': passed through as-is (weight=1.0).
-- 2. Rows with area_vintage='lor_pre2021': joined to seed_lor_crosswalk_2006_to_2021.
-- - mapping_type='identity': 1:1 map; indicator_value unchanged.
-- - mapping_type='official_concordance' or 'areal_pop_weighted': indicator_value
-- multiplied by weight (fractional for splits). For shares: weighted avg.
-- For residents_total (count): weight * value.
-- - mapping_type='stub': crosswalk not yet populated; pre-2021 rows dropped
-- with a NULL plr_id_2021 (not silently coerced).
--
-- Current state (as of 2026-06-19):
-- seed_lor_crosswalk_2006_to_2021 is POPULATED with 3055 areal_pop_weighted rows
-- derived from GDI Berlin WFS geometries (EPSG:25833) via
-- ingestion/berlin/lor/ingest_lor_crosswalk.py. Geo-DS approved 2026-06-19
-- (docs/epic-c/C3-crosswalk-geo-signoff.md -- verdict: PASS).
-- Weight-sum validation passed: all 448 pre-2021 PLRs within +/-0.01 tolerance.
-- Both lor_2021 and lor_pre2021 rows now produce output; the 2020->2021 vintage
-- boundary in fct_gentrification_change is bridged by the crosswalk.
--
-- Intensive vs extensive indicator note (geo-DS condition):
-- For extensive indicators (counts: residents_total): areal-weighted apportionment
-- is exact: count_2021_plr = SUM(count_pre2021 * weight).
-- For intensive indicators (rates/shares: foreigners_share, migration_background_share,
-- mean_age_years, residence_duration_5y_share): the areal-weighted sum approximates a
-- population-weighted average under the uniform-population-within-PLR assumption.
-- This is standard practice at the Berlin PLR spatial scale (median ~0.35 km2) and is
-- the best available approach absent sub-PLR population grids for historical years.
--
-- Aggregation note:
-- When multiple pre-2021 PLRs contribute to the same 2021 PLR (many-to-one mapping),
-- indicator_value is SUM(indicator_value_pre2021 * weight) across all contributing
-- pre-2021 PLRs. For extensive indicators this is exact; for intensive indicators
-- this is the areal-weighted approximation described above. The final SELECT aggregates
-- to the output grain (reference_year, plr_id_2021, indicator).
--
-- Output grain: (reference_year, plr_id_2021, indicator)
-- One row per (reference_year, plr_id_2021, indicator) combination.
-- plr_id_2021 always uses the LOR 2021 area code scheme.
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

    -- lor_2021 rows pass through directly with weight=1.0.
    lor2021_passthrough as (
        select
            city_code,
            area_code as plr_id_2021,
            area_vintage,
            reference_year,
            reference_date,
            indicator,
            indicator_value,
            is_suppressed_any,
            source_attribution,
            cast(1.0 as double) as crosswalk_weight,
            cast('passthrough' as varchar) as crosswalk_type
        from ewr
        where area_vintage = 'lor_2021'
    ),

    -- lor_pre2021 rows: join to crosswalk and apply weight.
    -- When multiple pre-2021 PLRs map to the same 2021 PLR, this produces
    -- multiple rows per (reference_year, plr_id_2021, indicator) that are
    -- aggregated in the final SELECT.
    lor_pre2021_mapped as (
        select
            ewr.city_code,
            cw.plr_id_2021,
            ewr.area_vintage,
            ewr.reference_year,
            ewr.reference_date,
            ewr.indicator,
            -- Apply crosswalk weight. For many-to-one mappings, SUM() in the
            -- outer aggregation accumulates contributions from all pre-2021 PLRs.
            case
                when ewr.indicator_value is null
                then null
                else ewr.indicator_value * cw.weight
            end as indicator_value,
            ewr.is_suppressed_any,
            ewr.source_attribution,
            cw.weight as crosswalk_weight,
            cw.mapping_type as crosswalk_type
        from ewr
        inner join crosswalk as cw on ewr.area_code = cw.plr_id_pre2021
        where ewr.area_vintage = 'lor_pre2021'
    ),

    combined as (
        select *
        from lor2021_passthrough
        union all
        select *
        from lor_pre2021_mapped
    )

-- Aggregate to output grain: (city_code, reference_year, plr_id_2021, indicator).
-- For lor_2021 passthrough rows: each group has exactly one row (weight=1.0).
-- For lor_pre2021 mapped rows: SUM aggregates contributions from all pre-2021 PLRs
-- that map to this 2021 PLR. is_suppressed_any uses MAX (True if any source was
-- suppressed). source_attribution uses MIN (arbitrary choice; all share same source).
-- crosswalk_weight and crosswalk_type: not meaningful post-aggregation (set to NULL).
select
    city_code,
    plr_id_2021,
    -- Use 'lor_2021' as the output vintage for all rows (they are all mapped
    -- to the 2021 PLR scheme, regardless of origin vintage).
    'lor_2021' as area_vintage,
    reference_year,
    min(reference_date) as reference_date,
    indicator,
    sum(indicator_value) as indicator_value,
    max(is_suppressed_any) as is_suppressed_any,
    min(source_attribution) as source_attribution,
    cast(null as double) as crosswalk_weight,
    cast(null as varchar) as crosswalk_type
from combined
group by city_code, plr_id_2021, reference_year, indicator
