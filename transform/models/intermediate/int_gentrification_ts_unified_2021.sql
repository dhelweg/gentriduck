-- int_gentrification_ts_unified_2021.sql
-- R-A8b (#260) -- DRAFT / PENDING FRESH GEO-DS + DOMAIN SIGN-OFF (R-C1).
--
-- Purpose: build one continuous (city_code='BER', area_code=plr_id_2021, snapshot_year)
-- outcome panel spanning all 7 available MSS editions (2013, 2015, 2017, 2019, 2021,
-- 2023,
-- 2025), by remapping the lor_pre2021 editions onto the lor_2021 PLR scheme (542
-- PLRs), so
-- fct_gentrification_trajectory can (pending sign-off, see below) classify
-- trajectories over
-- the full panel instead of two disjoint sub-panels.
--
-- REVISION HISTORY (methodology gate iteration 2):
-- v1 (commit 27592d97) received PASS WITH CONCERNS from both geo-DS
-- (docs/epic-e/R-A8b-trajectory-unify-geo-signoff.md) and gentrification-domain-expert
-- (docs/epic-e/R-A8b-domain-signoff.md). v2 (this version) addresses every BLOCKING
-- concern
-- from both reviews:
--
-- FIX for geo-DS C1 (wrong crosswalk weight direction) + domain C-4 (area vs
-- population) +
-- both reviewers' Q1/C-4 recommendation ("population-weighted mode... methodologically
-- preferable"): v1 used int_berlin_lor_crosswalk_dominant_2021 (pure geometric AREA
-- majority, and ranked by the wrong direction for a remap-onto-2021 use case). v2
-- uses a NEW
-- model, int_berlin_lor_crosswalk_dominant_pop_2021, which selects the dominant
-- pre-2021
-- source PLR by ESTIMATED POPULATION contribution (residents_total(pre2021 PLR, 2019
-- baseline) * area_weight, the same extensive-apportionment idiom
-- int_berlin_ewr_plr2021
-- already uses for population counts) rather than by area. This directly answers both
-- reviewers' preference for population weighting over any area-based rule (forward or
-- reverse), since MSS status_index/dynamik_index are population-derived whole-PLR
-- classifications (domain sign-off §3), not counts/shares tied to land area. See that
-- model's header for full method detail and the R-C2 grounding this satisfies
-- (extensive-
-- apportionment idiom reuse, not a new spatial method).
--
-- FIX for geo-DS C2 (outcome panel contaminated by POI/predictor coverage): v1 sourced
-- status_index/dynamik_index/typology_stage from int_gentrification_ts, whose Branch B
-- inner-joins MSS to POI data, silently dropping the 2013 edition (no POI join year)
-- and any
-- PLR/year without POI coverage. v2 sources directly from stg_berlin_mss (the full MSS
-- outcome panel, including 2013 and uninhabited PLRs) -- no predictor dependency at
-- all, so
-- this is now a pure outcome panel as it should be. typology_stage is (re)computed
-- here via
-- the shared transform/macros/typology_stage.sql macro (extracted from
-- int_gentrification_ts
-- as a behaviour-preserving refactor) rather than borrowed from a predictor-joined
-- table.
--
-- FIX for geo-DS C3 (7-edition overclaim): with C2 fixed, the panel now genuinely
-- spans all
-- 7 MSS editions (verified: 2013/2015/2017/2019 via the lor_pre2021 branch of
-- stg_berlin_mss,
-- 2021/2023/2025 via the lor_2021 branch) -- the original header claim is now accurate.
--
-- FIX for geo-DS C4 (non-deterministic tie-break):
-- int_berlin_lor_crosswalk_dominant_pop_2021
-- uses an explicit `ORDER BY estimated_population_contribution DESC, plr_id_pre2021`
-- secondary sort key -- reproducible across engines/rebuilds.
--
-- ADDED for domain C-2/C-3 (pseudo-replication disclosure, REQUIRED before any public
-- use):
-- is_bridged (true for remapped lor_pre2021-origin rows),
-- n_lor2021_plrs_sharing_this_source
-- (how many other 2021 PLRs share this same dominant pre-2021 source -- up to 6 per the
-- domain sign-off's measured rate), and population_dominance_frac (what share of the
-- target
-- 2021 PLR's estimated population the dominant source actually represents -- a
-- continuous
-- diagnostic exposed for the consumer to threshold, same "expose the raw fraction,
-- defer the
-- materiality cutoff" precedent as int_berlin_milieuschutz_plr_flag's overlap_frac;
-- this is
-- the domain C-2 "low dominant_weight -> low-confidence" signal, on a population
-- basis).
--
-- STILL EXPLICITLY OUT OF SCOPE / NOT ADDRESSED HERE (both reviewers agree these gate
-- DOWNSTREAM/PUBLIC consumption, not this draft input panel):
-- - Domain C-1 (seam-aware trajectory handling): a status_delta computed across the
-- 2019->2021 remap seam can be a boundary-redraw artefact rather than a real Dangschat
-- succession transition (index-definition.md Sec 2.5 / R-A3 geo C4's existing
-- within-vintage-only guardrail exists precisely to avoid this). This model does NOT
-- attempt seam-aware logic -- that is fct_gentrification_trajectory's responsibility
-- if/
-- when it consumes this panel, and per geo-DS Q3, the recommendation is this panel runs
-- ALONGSIDE the existing two-vintage design as a caveated supplementary view, not as a
-- replacement.
-- - Trajectory clustering (k-means/DTW): both reviewers confirm out of scope (geo-DS
-- Q4).
--
-- GROUNDING (R-C2), addressing domain C-5 / geo-DS C3:
-- - MSS methodology: status_index/dynamik_index are whole-PLR, resident-EWR-indicator-
-- derived classifications (SenStadtWohnen Monitoring Soziale Stadtentwicklung
-- methodology;
-- see stg_berlin_mss.sql header and int_gentrification_ts.sql's D1/D2 definition) --
-- NOT a
-- land-area attribute, which is what makes a pure-area remap an ecological-inference
-- step
-- rather than a lossless re-key (see next point).
-- - MAUP / ecological inference (domain C-5 point 1): transplanting a whole-PLR
-- population-derived class onto a differently-bounded overlap sub-area assumes the
-- sub-population in that overlap zone shares the parent PLR's aggregate
-- classification --
-- a modifiable-areal-unit-problem / ecological-inference step (Openshaw 1984; Robinson
-- 1950 on the general hazard of imputing unit-level attributes across a
-- re-aggregation).
-- Selecting a single *observed* dominant class (rather than interval-averaging, per
-- Goodchild & Lam 1980's areal-reassignment practice) avoids fabricating an unobserved
-- value, but does not eliminate this ecological-inference step -- it is the best
-- available
-- simplification given no sub-PLR-resolution historical MSS data exists, not a claim
-- the
-- transplant is lossless.
-- - Existing guardrail this panel relaxes (domain C-5 point 3): index-definition.md
-- Sec 2.5
-- and R-A3 geo C4 (see fct_gentrification_trajectory.sql header) currently forbid
-- cross-vintage status deltas precisely because of the
-- ecological-inference/seam-confound
-- risk above. This panel is explicitly the input artefact for a FUTURE, separately
-- sign-off-gated relaxation of that guardrail (domain C-1) -- it does not itself relax
-- anything, since nothing downstream consumes it yet.
--
-- Output grain: (city_code, area_code [lor_2021], snapshot_year).
--
-- dbt_meta_owner: data-engineer
-- status: DRAFT -- pending fresh geo-DS + domain-expert sign-off on this revision. NOT
-- consumed by fct_gentrification_trajectory or any other downstream model.
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer", "status": "draft_pending_methodology_signoff"},
    )
}}

with
    mss as (
        select *
        from {{ ref("stg_berlin_mss") }}
        where area_vintage in ('lor_pre2021', 'lor_2021')
    ),

    lor2021_passthrough as (
        select
            'BER' as city_code,
            area_code,
            edition as snapshot_year,
            status_index,
            dynamik_index,
            {{ typology_stage("status_index", "dynamik_index") }} as typology_stage,
            (gesamtindex is null) as is_uninhabited,
            cast('passthrough' as varchar) as remap_method,
            false as is_bridged,
            cast(1.0 as double) as population_dominance_frac,
            cast(null as bigint) as n_lor2021_plrs_sharing_this_source
        from mss
        where area_vintage = 'lor_2021'
    ),

    dominant_pop_crosswalk as (
        select * from {{ ref("int_berlin_lor_crosswalk_dominant_pop_2021") }}
    ),

    pre2021_remapped as (
        select
            'BER' as city_code,
            xw.plr_id_2021 as area_code,
            mss.edition as snapshot_year,
            mss.status_index,
            mss.dynamik_index,
            {{ typology_stage("mss.status_index", "mss.dynamik_index") }}
            as typology_stage,
            (mss.gesamtindex is null) as is_uninhabited,
            cast('dominant_pop_crosswalk' as varchar) as remap_method,
            true as is_bridged,
            xw.population_dominance_frac,
            xw.n_lor2021_plrs_sharing_this_source
        from mss
        inner join dominant_pop_crosswalk as xw on mss.area_code = xw.plr_id_pre2021
        where mss.area_vintage = 'lor_pre2021'
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
