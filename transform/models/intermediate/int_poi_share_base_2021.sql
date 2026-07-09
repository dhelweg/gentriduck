-- int_poi_share_base_2021.sql
-- Remaps int_poi_share_base to a unified LOR 2021 PLR scheme for all Berlin snapshot
-- years, and passes through any OTHER city's single-vintage rows unchanged.
--
-- Problem (Berlin only): int_poi_share_base contains rows with
-- area_vintage='lor_pre2021' for snapshot_year <= 2020 (old 448-PLR scheme) and
-- area_vintage='lor_2021' for snapshot_year >= 2021 (new 542-PLR scheme). The LAG
-- window in int_poi_status_dynamism is partitioned by (city_code, area_code,
-- area_vintage); different codes across the vintage boundary produce NULL for the
-- 2020->2021 delta in fct_gentrification_change.
--
-- Solution: apply the same crosswalk strategy used in int_berlin_ewr_plr2021 to remap
-- lor_pre2021 POI counts to 2021 PLR codes. The output is a unified time series in
-- the lor_2021 scheme for all years, enabling LAG to compute the 2020->2021 delta.
--
-- Crosswalk strategy:
-- 1. Rows with area_vintage='lor_pre2021': joined to seed_lor_crosswalk_2006_to_2021,
-- remapped and merged into the 'lor_2021' vintage.
-- total_poi_count is an extensive/count indicator: count_2021_plr = SUM(count *
-- weight). When multiple pre-2021 PLRs map to the same 2021 PLR, counts are summed.
-- 2. ALL OTHER area_vintage values (Berlin's 'lor_2021', and any second city's
-- own vintage tag, e.g. Hamburg's 'current' -- ADR-0014 Pillar 1, single live-WFS
-- statistische-Gebiete edition, no historical boundary reform to crosswalk) pass
-- through unchanged, keeping their own area_vintage. The Berlin 2021-reform
-- crosswalk is a Berlin-LOR-specific fact (thesis-era 448-PLR to 542-PLR boundary
-- change); a city with only one vintage across its whole time series has nothing
-- to remap (#125).
--
-- METHODOLOGY QUESTION (not decided here -- flagged for geo-DS/domain gate, #125):
-- is passthrough the *correct* long-run treatment for a future second city that DOES
-- get a mid-series boundary reform (unlike Hamburg's single 'current' vintage), or
-- would that city need its own crosswalk seed mirroring
-- seed_lor_crosswalk_2006_to_2021?
-- Not applicable to Hamburg today (no reform exists in the ingested source), but the
-- branch below should not be read as a general "any non-lor_pre2021 vintage never
-- needs a crosswalk" rule.
--
-- GUARD (#161 / H-C4, resolved as documentation + tripwire, ADR-0005 addendum
-- 2026-07-10): the enforced guard for this question is the `area_vintage`
-- accepted_values test below in schema.yml -- a future city's new vintage tag will
-- fail that test until someone decides (and, if needed, builds a crosswalk seed
-- mirroring seed_lor_crosswalk_2006_to_2021) rather than reflexively widening the
-- list. See docs/adr/0005-city-agnostic-data-model.md for the full checklist.
--
-- Derived columns:
-- - berlin_total_poi_count: city-wide total POI count per (city, year, vintage); does
-- not change when we remap Berlin's PLRs (same city, same year, same POIs), so we
-- recompute via SUM() window. Column name retained from the pre-#125 Berlin-only
-- version; despite the name it is now per-city (partitioned by city_code).
-- - plr_poi_share: recomputed from aggregated total_poi_count / berlin_total_poi_count
-- rather than weighted from the pre-aggregation share (ratio recomputation is exact).
--
-- Output columns match int_poi_share_base:
-- city_code, area_code, area_vintage ('lor_2021' for Berlin; unchanged for other
-- cities' passthrough rows), snapshot_year, total_poi_count, berlin_total_poi_count,
-- plr_poi_share.
--
-- This model is consumed exclusively by int_poi_status_dynamism.
-- Do not use directly for analysis; use int_poi_status_dynamism instead.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_share_base') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    base as (select * from {{ ref("int_poi_share_base") }}),

    crosswalk as (
        select *
        from {{ ref("seed_lor_crosswalk_2006_to_2021") }}
        -- Exclude the stub placeholder row (dummy codes 00000000).
        where mapping_type != 'stub'
    ),

    -- Rows that do not need Berlin's pre2021->2021 LOR crosswalk pass through
    -- unchanged, keeping their own area_vintage. This covers Berlin's own
    -- 'lor_2021' rows (2021+) AND any other city's single-vintage scheme (e.g.
    -- Hamburg's 'current' statistische Gebiete, ADR-0014) -- see header note (#125).
    passthrough as (
        select city_code, area_code, area_vintage, snapshot_year, total_poi_count
        from base
        where area_vintage != 'lor_pre2021'
    ),

    -- lor_pre2021 rows (Berlin only): join to crosswalk and apply weight to
    -- apportion counts. total_poi_count is an extensive (count) indicator:
    -- weight * count is exact. Multiple pre-2021 PLRs mapping to the same 2021
    -- PLR are aggregated via SUM.
    lor_pre2021_mapped as (
        select
            base.city_code,
            cw.plr_id_2021 as area_code,
            'lor_2021' as area_vintage,
            base.snapshot_year,
            case
                when base.total_poi_count is null
                then null
                else base.total_poi_count * cw.weight
            end as total_poi_count
        from base
        inner join crosswalk as cw on base.area_code = cw.plr_id_pre2021
        where base.area_vintage = 'lor_pre2021'
    ),

    combined as (
        select *
        from passthrough
        union all
        select *
        from lor_pre2021_mapped
    ),

    -- Aggregate to output grain: (city_code, area_code, area_vintage, snapshot_year).
    -- For passthrough rows (Berlin lor_2021, any other city): one row per group
    -- (weight=1.0, no aggregation effect -- int_poi_share_base is already unique on
    -- this grain).
    -- For lor_pre2021-mapped rows: SUM accumulates contributions from all pre-2021
    -- PLRs that map to the same 2021 PLR (all such rows carry area_vintage='lor_2021',
    -- so this never mixes with Berlin's own lor_2021 passthrough rows at a different
    -- grain -- both land in the same (city_code, area_code, 'lor_2021', snapshot_year)
    -- bucket only when they are, correctly, the same 2021 PLR/year).
    aggregated as (
        select
            city_code,
            area_code,
            area_vintage,
            snapshot_year,
            sum(total_poi_count) as total_poi_count
        from combined
        group by city_code, area_code, area_vintage, snapshot_year
    )

-- Recompute berlin_total_poi_count and plr_poi_share from the aggregated counts,
-- partitioned by (city_code, snapshot_year, area_vintage) so a second city's own
-- vintage never mixes into Berlin's total (and vice versa). For Berlin this is a
-- no-op vs partitioning by (city_code, snapshot_year) alone, since all Berlin rows
-- here share area_vintage='lor_2021' -- city-wide total is invariant to PLR
-- remapping (same city, same year, same POIs redistributed across new boundaries).
select
    city_code,
    area_code,
    area_vintage,
    snapshot_year,
    total_poi_count,
    sum(total_poi_count) over (
        partition by city_code, snapshot_year, area_vintage
    ) as berlin_total_poi_count,
    total_poi_count
    * 1.0
    / nullif(
        sum(total_poi_count) over (partition by city_code, snapshot_year, area_vintage),
        0
    ) as plr_poi_share
from aggregated
