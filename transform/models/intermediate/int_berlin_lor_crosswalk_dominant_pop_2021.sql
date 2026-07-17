-- int_berlin_lor_crosswalk_dominant_pop_2021.sql
-- R-A8b (#260) fix -- POPULATION-weighted dominant pre-2021 <-> 2021 PLR crosswalk.
--
-- Built in response to the geo-DS (docs/epic-e/R-A8b-trajectory-unify-geo-signoff.md,
-- C1/Q1)
-- and gentrification-domain-expert (docs/epic-e/R-A8b-domain-signoff.md, C-4/C-1)
-- sign-offs
-- on int_gentrification_ts_unified_2021.sql: BOTH reviewers concluded that for a
-- population-derived MSS classification (status_index/dynamik_index -- computed from
-- residents' EWR indicators for a bounded PLR), the sociologically representative
-- pre-2021
-- source PLR is the one contributing the most PEOPLE to a 2021 PLR, not the most land
-- area.
-- The existing int_berlin_lor_crosswalk_dominant_2021 (QA-7b #205) ranks by pure
-- geometric
-- area share and is explicitly scoped to a POI-count predictor bridge (area-keyed
-- counts,
-- not population); it is NOT modified here to avoid an unreviewed behaviour change to
-- its
-- existing consumer (analysis/e1_regressions.py's H2/H3 EWR-lead-lag comparison,
-- already
-- signed off under its own area-based semantics). This is a NEW, separate model,
-- scoped to
-- the outcome-side (MSS) remap use case only.
--
-- Method: extensive-indicator apportionment (the SAME established pattern as
-- int_berlin_ewr_plr2021's count apportionment: count_2021_plr = SUM(count_pre2021 *
-- weight)),
-- applied here not to sum a total but to RANK candidate sources: for each 2021 PLR,
-- estimate
-- how many of each contributing pre-2021 PLR's residents fall into this specific
-- fragment as
-- residents_total(pre2021_plr) * weight(pre2021_plr, 2021_plr), where weight =
-- intersection_area / pre2021_plr_area (the *forward* share -- what fraction of the
-- pre-2021
-- PLR's own area/population falls in this fragment; correct direction for an extensive
-- apportionment, unlike a "largest share of the target" area-majority pick, which
-- needed
-- reverse_weight instead -- see int_gentrification_ts_unified_2021.sql's C1 fix note
-- for that
-- distinction). This reuses the uniform-population-within-PLR assumption
-- int_berlin_ewr_plr2021
-- already documents as "standard practice at the Berlin PLR spatial scale" -- no new
-- methodology invented, just the existing apportionment idiom applied for selection
-- instead of
-- summation.
--
-- Population baseline year: 2019 (int_ewr_socioeco_pre2021, the LAST pre-reform EWR
-- edition,
-- closest available population snapshot to the 2021 LOR boundary redraw). A single
-- baseline
-- year is used (not a per-MSS-edition-year population) because population
-- DISTRIBUTION across a
-- PLR's sub-area (which is what this ranking needs -- not the population level, which
-- varies
-- moderately 2013-2019 but not the internal density pattern within a single PLR) is
-- reasonably
-- stable over a 6-year window; documented simplification, flagged for geo-DS to
-- confirm if this
-- panel moves beyond draft status.
--
-- Grain: one row per plr_id_2021 (all 542 lor_2021 PLRs resolve to exactly one dominant
-- pre-2021 PLR by estimated population contribution).
--
-- Deterministic tie-break: ROW_NUMBER() ... ORDER BY
-- estimated_population_contribution DESC,
-- plr_id_pre2021 -- explicit secondary sort key (C4 fix: the sibling model this
-- pattern is
-- based on relied on DuckDB's unspecified default row order on ties; not repeated
-- here).
--
-- dbt_meta_owner: data-engineer
-- status: DRAFT -- supports int_gentrification_ts_unified_2021.sql, itself still
-- pending
-- methodology sign-off.
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer", "status": "draft_pending_methodology_signoff"},
    )
}}

with
    crosswalk as (
        select *
        from {{ ref("seed_lor_crosswalk_2006_to_2021") }}
        -- Exclude the stub placeholder row (dummy codes 00000000), same exclusion as
        -- the
        -- sibling area-based crosswalk models.
        where mapping_type != 'stub'
    ),

    pop_2019 as (
        select area_code as plr_id_pre2021, residents_total
        from {{ ref("int_ewr_socioeco_pre2021") }}
        where reference_year = 2019 and area_vintage = 'lor_pre2021'
    ),

    weighted as (
        select
            xw.plr_id_2021,
            xw.plr_id_pre2021,
            xw.weight as area_weight,
            xw.reverse_weight,
            pop.residents_total as pre2021_plr_residents_total_2019,
            -- Extensive apportionment: population estimated to fall in THIS fragment,
            -- assuming uniform density within the pre-2021 PLR (same assumption
            -- int_berlin_ewr_plr2021 already documents and uses for the real
            -- apportionment
            -- sum; here used only to rank candidates, not to sum a published total).
            coalesce(pop.residents_total, 0)
            * xw.weight as estimated_population_contribution
        from crosswalk as xw
        left join pop_2019 as pop on xw.plr_id_pre2021 = pop.plr_id_pre2021
    ),

    ranked as (
        select
            *,
            row_number() over (
                partition by plr_id_2021
                order by estimated_population_contribution desc, plr_id_pre2021 asc
            ) as rn
        from weighted
    ),

    dominant as (select * from ranked where rn = 1),

    -- Total estimated population apportioned to each 2021 PLR across ALL contributing
    -- pre-2021 fragments (not just the dominant one) -- denominator for a
    -- population-dominance-fraction diagnostic (C-2 domain condition: low-confidence
    -- flagging), same idea as the sibling area-based model's overlap_frac.
    target_totals as (
        select
            plr_id_2021,
            sum(estimated_population_contribution) as total_estimated_population
        from weighted
        group by plr_id_2021
    ),

    -- C-3/C-2 (domain + geo-DS sign-off): pseudo-replication disclosure -- count how
    -- many
    -- lor_2021 PLRs share this same pre-2021 dominant source, so a downstream
    -- consumer can
    -- flag "this value is borrowed from a neighbour" rather than presenting it as
    -- neighbourhood-specific measured history.
    sibling_counts as (
        select plr_id_pre2021, count(*) as n_lor2021_plrs_sharing_this_source
        from dominant
        group by plr_id_pre2021
    )

select
    cast('BER' as varchar) as city_code,
    d.plr_id_2021,
    d.plr_id_pre2021,
    d.area_weight,
    d.reverse_weight,
    d.pre2021_plr_residents_total_2019,
    d.estimated_population_contribution as dominant_population_weight,
    -- Diagnostic only (not used to gate/filter here, per the B1-flag precedent of
    -- exposing
    -- the raw fraction and deferring the materiality threshold to the consumer): what
    -- share
    -- of the 2021 PLR's total estimated population comes from the dominant source. Low
    -- values mean the dominant match is a weak/fragmented representative -- the C-2
    -- domain
    -- condition's "low dominant_weight" low-confidence signal, on a population basis.
    least(
        1.0,
        d.estimated_population_contribution / nullif(t.total_estimated_population, 0)
    ) as population_dominance_frac,
    sc.n_lor2021_plrs_sharing_this_source
from dominant as d
inner join sibling_counts as sc on d.plr_id_pre2021 = sc.plr_id_pre2021
inner join target_totals as t on d.plr_id_2021 = t.plr_id_2021
