-- int_gentrification_ts_unified_2021.sql
-- R-A8b (#260) -- DRAFT / PENDING GEO-DS + DOMAIN SIGN-OFF (R-C1).
--
-- Purpose: build one continuous (city_code='BER', area_code=plr_id_2021, snapshot_year)
-- outcome panel spanning all 7 available MSS editions (2013, 2015, 2017, 2019, 2021,
-- 2023,
-- 2025), by remapping the lor_pre2021 branch of int_gentrification_ts (editions
-- 2013-2019,
-- ~447 PLRs) onto the lor_2021 PLR scheme (542 PLRs), so
-- fct_gentrification_trajectory can
-- (pending sign-off) classify trajectories over the full panel instead of two disjoint
-- sub-panels (see that model's header for why it currently splits: LOR 2021 reform
-- redistributed 447 -> 542 PLRs).
--
-- Method: DOMINANT-PLR remap, not areal-weighted apportionment (R-C2 grounding).
-- int_berlin_ewr_plr2021 uses full areal-weighted apportionment (SUM(value * weight)
-- across
-- ALL contributing pre-2021 PLRs) for EWR indicators because those are counts/shares
-- that can
-- be validly split and re-summed across a fractional area overlap (an
-- "extensive"/"intensive"
-- indicator in that model's terminology).
--
-- status_index / dynamik_index / typology_stage are NOT that kind of quantity: they are
-- ORDINAL CLASSIFICATIONS assigned to a whole PLR (MSS methodology scores an area,
-- not a
-- fractional sub-area), so there is no valid arithmetic average of e.g.
-- status_index=2 and
-- status_index=4 across a fractional area split -- the resulting "3" would not
-- correspond to
-- any actual observed social-status classification, and averaging ordinals silently
-- assumes
-- interval-scale properties D1/D2 do not have (D1/D2 are explicitly ordinal per this
-- model's
-- own header and index-definition.md).
--
-- This mirrors int_berlin_lor_crosswalk_dominant_2021 (QA-7b #205)'s existing,
-- already-used
-- rationale for exactly this situation ("POI counts are area-level integers keyed to a
-- specific PLR polygon, not a quantity that can be fractionally apportioned... taking
-- the
-- single dominant (largest-overlap-share) pre-2021 PLR per lor_2021 PLR is the standard
-- simplification for this 'closest single areal match' bridging need, citing
-- Goodchild & Lam
-- 1980 areal-weighting review"). This model reuses that same crosswalk (not a new
-- one) for the
-- same reason, applied to the outcome side (status_index/dynamik_index/typology_stage)
-- instead of the predictor side (POI counts).
--
-- OPEN QUESTION FOR GEO-DS SIGN-OFF (flagged, not decided here):
-- 1. Is dominant-PLR remap the right choice for status_index/dynamik_index
-- specifically, or
-- should a different rule apply (e.g. population-weighted MODE across contributing
-- PLRs,
-- which would use more of the crosswalk's information at the cost of being a
-- genuinely new
-- aggregation rule not yet used anywhere in the codebase)?
-- 2. int_berlin_lor_crosswalk_dominant_2021's own header flags a pseudo-replication
-- caveat
-- (~78 pre-2021 PLRs are the dominant match for 2+ lor_2021 PLRs, up to 6 each, ~35% of
-- lor_2021 PLRs share a bridged value with a neighbour) -- for POI counts feeding a
-- directional-evidence-only regression this was accepted; does the same tolerance
-- apply to
-- the OUTCOME series feeding a published trajectory *classification* (not just a
-- regression), where a status_index value literally repeats verbatim across up to 6
-- PLRs?
-- 3. Does this unified panel actually get used to REPLACE
-- fct_gentrification_trajectory's
-- current two-vintage-panel design, or run alongside it as a supplementary view? Not
-- decided -- fct_gentrification_trajectory.sql is NOT modified by this ticket; this
-- model
-- only builds the input panel for that decision.
-- 4. Trajectory clustering method (k-means/DTW per R-A8's deferred condition) is
-- explicitly
-- OUT OF SCOPE of this model -- a separate methodology design question, not implemented
-- here.
--
-- Output grain: (city_code, area_code [lor_2021 plr_id_2021], snapshot_year).
-- lor_2021 editions (2021, 2023, 2025) pass through unchanged (already
-- lor_2021-native).
-- lor_pre2021 editions (2013, 2015, 2017, 2019) are remapped via the dominant-PLR
-- crosswalk.
--
-- dbt_meta_owner: data-engineer
-- status: DRAFT -- pending geo-DS + domain-expert sign-off (R-C1) before any downstream
-- model consumes this in place of the existing split-vintage trajectory design.
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer", "status": "draft_pending_methodology_signoff"},
    )
}}

with
    ts as (select * from {{ ref("int_gentrification_ts") }} where city_code = 'BER'),

    lor2021_passthrough as (
        select
            city_code,
            area_code,
            snapshot_year,
            status_index,
            dynamik_index,
            typology_stage,
            is_uninhabited,
            cast('passthrough' as varchar) as remap_method,
            cast(1.0 as double) as remap_weight
        from ts
        where area_vintage = 'lor_2021'
    ),

    dominant_crosswalk as (
        select * from {{ ref("int_berlin_lor_crosswalk_dominant_2021") }}
    ),

    pre2021_remapped as (
        select
            ts.city_code,
            xw.plr_id_2021 as area_code,
            ts.snapshot_year,
            ts.status_index,
            ts.dynamik_index,
            ts.typology_stage,
            ts.is_uninhabited,
            cast('dominant_plr_crosswalk' as varchar) as remap_method,
            xw.dominant_weight as remap_weight
        from ts
        inner join dominant_crosswalk as xw on ts.area_code = xw.plr_id_pre2021
        where ts.area_vintage = 'lor_pre2021'
    ),

    unioned as (
        select *
        from lor2021_passthrough
        union all
        select *
        from pre2021_remapped
    )

select *
from unioned
order by city_code, area_code, snapshot_year
