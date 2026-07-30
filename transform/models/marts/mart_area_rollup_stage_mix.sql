-- mart_area_rollup_stage_mix.sql
-- #310 (map granularity selector): population-weighted typology_stage MIX (never a
-- single re-derived label) + a paired population-weighted plurality "dominant stage" +
-- continuous status_index/dynamism_index population-weighted means, for the
-- gentrification_index area_levels that are one or more rollup hops ABOVE the finest
-- live_data grain (plr for Berlin, subarea_l2 for Hamburg): Berlin bezirk/pgr/ortsteil,
-- Hamburg subarea_l1/district.
--
-- =============================================================================
-- WHY THIS EXISTS AND WHY IT LOOKS LIKE THIS (R-C2 grounding)
-- =============================================================================
-- Design decision resolved on issue #310 (dual geo-DS + gentrification-domain-expert
-- pre-implementation review, see the issue's design-decision comment) -- this model
-- implements that decision point-for-point:
-- 1. Never publish a single re-derived/majority-vote `typology_stage` label ALONE at
-- a coarser grain: averaging the D1/D2 MSS ordinals then re-deriving a typology
-- cell is statistically invalid (ADR-0008 forbids averaging ordinal codes as a
-- metric) and a majority vote alone erases real intra-area heterogeneity
-- (Dangschat 1988 double invasion-succession cycle; Simpson's-paradox risk the
-- domain-expert flagged). NOTE: `mart_mss_area_aggregate` / `int_mss_bzr_aggregate`
-- (#120) DOES publish exactly that single-label rounded-mean re-derivation at
-- bzr/bezirk grain -- that is a SEPARATE, already-gated, already-gated-differently
-- ticket (I249-web-b sign-off) explicitly scoped as a "MAUP diagnostic / directional
-- display only" feature on the per-area profile pages, not this map-granularity
-- selector; #310 deliberately does NOT reuse or extend it (see its own header).
-- 2. Follow the #269 precedent (`mart_ortsteil_plr_stage_mix.sql`): extend the
-- stage-mix DISTRIBUTION pattern (share of population per typology_stage among
-- child areas) to the new rollup levels -- generalized here via `mart_area_hierarchy`
-- (#302) instead of #269's single-purpose Ortsteil-only join, and upgraded from
-- #269's plain child COUNT to a population weight (see WEIGHTING note below).
-- 3. Also expose a population-weighted plurality "dominant stage" + `dominant_share`
-- for compact display, paired with (never a substitute for) the mix --
-- `is_dominant_fragile` flags it when fewer than 3 real (non-uninhabited) children
-- roll up into this area (the consuming UI must suppress/caveat the dominant label,
-- never the mix itself, when this is true).
-- 4. `status_index`/`dynamism_index` aggregate by population-weighted mean of children
-- (continuous ordinal scores on the same D1/D2 scale gentrification_index's
-- live_data variant already carries -- see that mart's own header).
-- 5. Missing/uninhabited children (status_class IS NULL, i.e. is_uninhabited=true in
-- int_gentrification_ts) get an explicit 'uninhabited / no data' bucket: visible as
-- its own row in the mix, but EXCLUDED from the weighted-mean/vote denominator (a
-- NULL status_index cannot contribute to a mean, and an uninhabited area has no
-- typology_stage to vote with).
--
-- =============================================================================
-- REVIEW FIX MEDIUM-B (#310 review, commits 89452d11/6b9cd086): rollup areas with
-- ZERO contributing leaf children must not silently vanish
-- =============================================================================
-- Before this fix, `joined` was built via parent_map INNER JOIN leaf_all: an area
-- with zero leaf children surviving that join got NO row at all, so it was silently
-- dropped from the mart -- and Areas.svelte, which filters the displayed geojson down
-- to codes actually present in the query result, then drew nothing for it at all,
-- contradicting this ticket's own "areas without a value are drawn but left blank, not
-- silently omitted" convention (web/pages/*/maps.md).
--
-- Two DIFFERENT root causes produce this, both empirically confirmed by re-deriving
-- against the live warehouse (2026-07-30, re-derive by querying the CTEs below):
-- (a) the crosswalk hop itself assigns ZERO leaf codes to the area at all -- Berlin
-- Ortsteil 0608 (Schlachtensee) and 1106 (Malchow) are small enclave Ortsteile that
-- never hold the majority share of any PLR under the #269 dominant-assignment method
-- (already disclosed as a real, non-bug geographic fact by
-- test_ortsteil_overlap_ortsteil_never_dominant.sql, WARN severity);
-- (b) the crosswalk DOES assign leaf codes to the area, but NONE of them ever appear
-- in gentrification_index at ANY period -- Hamburg Stadtteile 02118 (Steinwerder),
-- 02119 (Waltershof), 02121 (Neuwerk), 02703 (Gut Moor), 02712 (Altenwerder) each have
-- 1-3 statistisches Gebiete mapped via dim_area_hierarchy's subarea_l2->subarea_l1
-- edge (OA-D1b, #240), but those Gebiete are non-residential/uninhabited (a remote
-- island, port terminals, a hamlet) and carry no EWR/gentrification_index row at all,
-- ever.
--
-- FIX: rather than special-casing (a)/(b) per city/level, `area_orphans` below
-- generalizes both as "an area_code enumerated in mart_area_hierarchy's full universe
-- for this (city_code, area_level) that has ZERO rows anywhere in
-- parent_map INNER JOIN leaf_all, across every period" -- this is checked ACROSS ALL
-- PERIODS (not per-period) so it never fires for an area that legitimately has data in
-- SOME periods but not others (see next paragraph). Confirmed empirically (2026-07-30)
-- this generalization recovers EXACTLY the 2 Berlin + 5 Hamburg codes above and
-- (crucially) flags ZERO pgr/bezirk/district codes as orphans -- i.e. it is a strict
-- superset fix, not a new gap-introducing one.
--
-- Why "across all periods" and not a blanket per-(area, period) LEFT JOIN: Berlin's
-- pgr/bzr/bezirk codes differ between the pre-2021 and 2021 LOR vintages (same fact
-- dim_area_hierarchy.sql's header documents), so a NEWER-vintage pgr code has, BY
-- DESIGN, zero constituent PLRs in an OLDER period's data (and vice versa) -- that is
-- correct, expected temporal behaviour, not a "vanishing area" bug, and forcing a
-- blank placeholder row for every vintage-inapplicable (area, period) combination
-- would flood the mart with meaningless always-empty rows for the "wrong" vintage's
-- pgr/bezirk codes at every period. Checking orphan status ACROSS ALL periods (not
-- per-period) avoids this entirely: a pgr code that has real children in ANY period is
-- never treated as an orphan, so it only ever appears in the periods it legitimately
-- belongs to, unchanged from pre-fix behaviour (re-derive: every one of Berlin's 117
-- mart_area_hierarchy pgr codes has real data in at least one period -- 0 orphans).
-- Only a code with LITERALLY ZERO real data in ANY period, ever (the 2 Ortsteil + 5
-- Stadtteil codes above) gets the placeholder-row treatment, and it gets one such row
-- for EVERY period this model's city actually publishes (`periods_by_city`), so the
-- area is drawn-but-blank consistently rather than appearing/disappearing across
-- periods.
--
-- Placeholder rows carry n_children = 0, n_habitable_children = 0,
-- has_incomplete_population = false (nothing to be incomplete about),
-- dominant_stage = NULL, status_index_weighted_mean/dynamism_index_weighted_mean =
-- NULL, and a single typology_stage = 'uninhabited / no data' mix row (stage_n_children
-- = 0, stage_weight = 0) so the mandatory (city, area_level, area_code, period,
-- variant, typology_stage) grain still has exactly one row to hang the area's name/
-- geometry off of -- consistent with design point 5's existing "no data" bucket rather
-- than inventing a second, parallel "no data" concept.
--
-- =============================================================================
-- WEIGHTING NOTE (a design choice this model adds beyond the #310 comment's text --
-- flagged explicitly for geo-DS/domain review): population weight fallback
-- =============================================================================
-- `gentrification_index.population` is NOT reliably populated for every live_data
-- period: empirically (re-derive by querying gentrification_index directly), Berlin's
-- 202112/202312 periods and Hamburg's entire latest 202512 period carry
-- `population IS NULL` for EVERY row (0/542 non-null in Berlin 202112 and 0/542
-- non-null in Berlin 202312; 0/857 non-null in Hamburg 202512) -- including rows that
-- DO have a real (non-null) status_class. A strict `coalesce(population, 0)` weight
-- would zero
-- out nearly every habitable child in exactly those periods, degenerating
-- `status_index_weighted_mean`/`dominant_stage` to NULL across the board for the
-- CURRENT/latest Hamburg period and two of Berlin's recent periods -- the periods a
-- map granularity selector is most likely to be viewed at. Instead, this model uses
-- an equal per-child weight of 1 (the same equal-weight behaviour #269's original
-- unweighted `n_plr` count used) as the fallback, and exposes
-- `has_incomplete_population`
-- so a consumer/reviewer can see when a row's weighting fell back to equal-weight for
-- this area, rather than either (a) losing the row entirely or (b) silently pretending
-- every child was population-weighted when it wasn't.
--
-- REVIEW FIX MEDIUM-C (#310 review): the fallback above used to be a PER-CHILD
-- `coalesce(population, 1)` -- correct in the all-or-nothing case this note
-- originally documented (every child in a period either has population or none do,
-- empirically true today), but WRONG the day population coverage is ever partial
-- within one area: known children would keep their real (large) population weights
-- while unknown children got weight 1, i.e. near-ZERO-weighting the unknowns rather
-- than equal-weighting the area -- silently contradicting the "equal-weighted, not
-- population-weighted" claim `has_incomplete_population` and the consuming pages
-- (web/pages/*/maps.md's population_note) already assert unconditionally whenever
-- `has_incomplete_population` is true. Fixed: `population_coverage` (below) computes,
-- per area, whether population is missing for NONE / SOME / ALL real habitable
-- children; whenever it is missing for ANY of them (some or all), EVERY child in that
-- area gets weight = 1 (true equal-weight for the whole area), not just the ones
-- actually missing it. `n_children_without_population` and
-- `population_coverage_frac` are exposed so a consumer/reviewer can distinguish "0
-- have population" (the original, safe all-equal-weight case) from "some but not all"
-- (the near-drop-out failure mode this fix closes) -- both now produce a genuinely
-- equal-weighted row, so `has_incomplete_population = true` is an honest claim in
-- either case.
--
-- =============================================================================
-- CHILD RESOLUTION (reuses mart_area_hierarchy #302 / int_berlin_plr_ortsteil_overlap
-- #269 -- no new spatial method; both edges were already methodology-gated elsewhere)
-- =============================================================================
-- Berlin: plr -> bzr -> pgr -> bezirk nests by LOR code-prefix (mart_area_hierarchy
-- resolves each hop as its own edge; multi-hop rollups here chain those edges rather
-- than re-deriving substr() locally, so this model tracks mart_area_hierarchy's own
-- resolution -- e.g. its Berlin Bezirk-vintage-stability test -- automatically).
-- Ortsteil<->PLR does NOT nest (mart_area_hierarchy's own header) -- reuses the
-- #269-gated DOMINANT PLR->Ortsteil assignment (int_berlin_plr_ortsteil_overlap,
-- is_dominant_ortsteil), same as mart_ortsteil_plr_stage_mix.
-- Hamburg: subarea_l2 -> subarea_l1 -> district, both via mart_area_hierarchy (the
-- subarea_l2->subarea_l1 edge is itself the OA-D1b #240 spatial crosswalk, already
-- dual-signed-off; district<-subarea_l1 is source-provided WFS pass-through).
--
-- Scope: variant='live_data' only (the only variant carrying a typology_stage/
-- status_class AND the current/live index shown on the map granularity selector this
-- ticket wires up -- 'standard'/'distance_weighted' are the frozen 2018-thesis
-- reproduction, out of this ticket's scope per #309's carve-out; 'improved' carries no
-- status_class at all, see gentrification_index.sql).
--
-- Grain: one row per (city_code, area_level, area_code, period_yyyymm, variant,
-- typology_stage). A consumer wanting "latest snapshot only" filters
-- period_yyyymm = max(period_yyyymm) themselves, same convention as
-- mart_ortsteil_plr_stage_mix and gentrification_index itself.
--
-- GATE: methodology-bearing (new aggregation over gentrification_index's typology/
-- index columns) -- geo-DS + domain-expert R-C1 dual sign-off required before
-- integration into develop (CLAUDE.md Methodology gate).
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('gentrification_index') }}
-- depends_on: {{ ref('mart_area_hierarchy') }}
-- depends_on: {{ ref('int_berlin_plr_ortsteil_overlap') }}
-- depends_on: {{ ref('dim_area') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- =========================================================================
    -- Leaf-grain live_data rows (the finest level each city actually publishes).
    -- =========================================================================
    leaf_all as (
        select
            city_code,
            area_code as leaf_area_code,
            period_yyyymm,
            population,
            status_index,
            dynamism_index,
            -- coalesce here, once, so every downstream CTE shares the identical
            -- uninhabited-bucket label (design point 5).
            coalesce(status_class, 'uninhabited / no data') as typology_stage
        from {{ ref("gentrification_index") }}
        where
            variant = 'live_data'
            and (
                (city_code = 'BER' and area_level = 'plr')
                or (city_code = 'HH' and area_level = 'subarea_l2')
            )
    ),

    -- =========================================================================
    -- Berlin hierarchy hops (mart_area_hierarchy stores only IMMEDIATE parent
    -- edges -- chain them for the 2-/3-hop rollups, per header note).
    -- =========================================================================
    ber_plr_bzr as (
        select area_code as plr_code, parent_area_code as bzr_code
        from {{ ref("mart_area_hierarchy") }}
        where city_code = 'BER' and area_level = 'plr' and parent_area_level = 'bzr'
    ),

    ber_bzr_pgr as (
        select area_code as bzr_code, parent_area_code as pgr_code
        from {{ ref("mart_area_hierarchy") }}
        where city_code = 'BER' and area_level = 'bzr' and parent_area_level = 'pgr'
    ),

    ber_pgr_bezirk as (
        select area_code as pgr_code, parent_area_code as bezirk_code
        from {{ ref("mart_area_hierarchy") }}
        where city_code = 'BER' and area_level = 'pgr' and parent_area_level = 'bezirk'
    ),

    ber_plr_to_pgr as (
        select p.plr_code, b.pgr_code
        from ber_plr_bzr as p
        inner join ber_bzr_pgr as b on p.bzr_code = b.bzr_code
    ),

    ber_plr_to_bezirk as (
        select p.plr_code, g.bezirk_code
        from ber_plr_to_pgr as p
        inner join ber_pgr_bezirk as g on p.pgr_code = g.pgr_code
    ),

    -- Ortsteil<->PLR non-nesting crosswalk (#269) -- dominant assignment only, same
    -- as mart_ortsteil_plr_stage_mix; NOT sourced from mart_area_hierarchy (see
    -- header).
    ber_plr_to_ortsteil as (
        select plr_area_code as plr_code, ortsteil_area_code as ortsteil_code
        from {{ ref("int_berlin_plr_ortsteil_overlap") }}
        where is_dominant_ortsteil
    ),

    -- =========================================================================
    -- Hamburg hierarchy hops.
    -- =========================================================================
    hh_l2_l1 as (
        select area_code as l2_code, parent_area_code as l1_code
        from {{ ref("mart_area_hierarchy") }}
        where
            city_code = 'HH'
            and area_level = 'subarea_l2'
            and parent_area_level = 'subarea_l1'
    ),

    hh_l1_district as (
        select area_code as l1_code, parent_area_code as district_code
        from {{ ref("mart_area_hierarchy") }}
        where
            city_code = 'HH'
            and area_level = 'subarea_l1'
            and parent_area_level = 'district'
    ),

    hh_l2_to_district as (
        select a.l2_code, d.district_code
        from hh_l2_l1 as a
        inner join hh_l1_district as d on a.l1_code = d.l1_code
    ),

    -- =========================================================================
    -- Union: (city_code, rollup area_level, rollup area_code, leaf_area_code) --
    -- one row per leaf child mapped to its rollup parent, for every new level.
    -- =========================================================================
    parent_map as (
        select
            cast('BER' as varchar) as city_code,
            cast('pgr' as varchar) as area_level,
            pgr_code as rollup_area_code,
            plr_code as leaf_area_code
        from ber_plr_to_pgr
        union all
        select
            cast('BER' as varchar) as city_code,
            cast('bezirk' as varchar) as area_level,
            bezirk_code as rollup_area_code,
            plr_code as leaf_area_code
        from ber_plr_to_bezirk
        union all
        select
            cast('BER' as varchar) as city_code,
            cast('ortsteil' as varchar) as area_level,
            ortsteil_code as rollup_area_code,
            plr_code as leaf_area_code
        from ber_plr_to_ortsteil
        union all
        select
            cast('HH' as varchar) as city_code,
            cast('subarea_l1' as varchar) as area_level,
            l1_code as rollup_area_code,
            l2_code as leaf_area_code
        from hh_l2_l1
        union all
        select
            cast('HH' as varchar) as city_code,
            cast('district' as varchar) as area_level,
            district_code as rollup_area_code,
            l2_code as leaf_area_code
        from hh_l2_to_district
    ),

    -- =========================================================================
    -- MEDIUM-B fix: full period-independent universe of rollup area codes per
    -- (city_code, area_level), so an area with zero real leaf children can still
    -- be detected and given a placeholder row rather than silently vanishing.
    -- mart_area_hierarchy records an edge's CHILD side as area_code/area_level
    -- and its PARENT side as parent_area_code/parent_area_level -- a top-of-
    -- ladder level with no further parent above it (bezirk, district) only ever
    -- appears on the PARENT side, so both sides are unioned here to enumerate
    -- every level completely.
    -- =========================================================================
    all_rollup_areas as (
        select distinct city_code, area_level, area_code
        from
            (
                select city_code, area_level, area_code
                from {{ ref("mart_area_hierarchy") }}
                union all
                select
                    city_code,
                    parent_area_level as area_level,
                    parent_area_code as area_code
                from {{ ref("mart_area_hierarchy") }}
            ) as both_sides
        where area_level in ('bezirk', 'pgr', 'ortsteil', 'subarea_l1', 'district')
    ),

    -- =========================================================================
    -- Real, actually-matched leaf children (pre-fix behaviour, unchanged).
    -- =========================================================================
    matched as (
        select
            pm.city_code,
            pm.area_level,
            pm.rollup_area_code as area_code,
            l.period_yyyymm,
            cast('live_data' as varchar) as variant,
            true as is_real_leaf,
            l.typology_stage,
            l.status_index,
            l.dynamism_index,
            l.population
        from parent_map as pm
        inner join
            leaf_all as l
            on pm.city_code = l.city_code
            and pm.leaf_area_code = l.leaf_area_code
    ),

    -- =========================================================================
    -- MEDIUM-B fix: area_codes in the full universe that have ZERO rows in
    -- `matched`, across EVERY period -- i.e. an area whose leaf children (if any
    -- are even mapped at all) never once produced a live_data row. Checked
    -- across all periods at once (not per-period) so a Berlin pgr/bzr/bezirk
    -- code that is simply the "other" LOR vintage for a given period is never
    -- misclassified as an orphan -- see header note. Confirmed empirically
    -- (2026-07-30): exactly BER ortsteil 0608/1106 and HH subarea_l1
    -- 02118/02119/02121/02703/02712; zero pgr/bezirk/district codes.
    -- =========================================================================
    area_orphans as (
        select u.city_code, u.area_level, u.area_code
        from all_rollup_areas as u
        left join
            matched as m
            on u.city_code = m.city_code
            and u.area_level = m.area_level
            and u.area_code = m.area_code
        where m.area_code is null
    ),

    periods_by_city as (select distinct city_code, period_yyyymm from leaf_all),

    -- One placeholder row per (orphan area, period this city actually
    -- publishes) -- MEDIUM-B fix.
    orphan_rows as (
        select
            o.city_code,
            o.area_level,
            o.area_code,
            p.period_yyyymm,
            cast('live_data' as varchar) as variant,
            false as is_real_leaf,
            cast(null as varchar) as typology_stage,
            cast(null as double) as status_index,
            cast(null as double) as dynamism_index,
            cast(null as double) as population
        from area_orphans as o
        inner join periods_by_city as p on o.city_code = p.city_code
    ),

    -- =========================================================================
    -- Real children + orphan placeholders, with design point 5's 'uninhabited /
    -- no data' bucket label applied uniformly to both a genuinely uninhabited
    -- leaf child (status_class IS NULL but the leaf row exists) and a
    -- structurally orphaned rollup area (no leaf row at all, ever) -- the two
    -- are distinguished at the counting stage by `is_real_leaf`, never
    -- conflated in n_children/stage_n_children/stage_weight.
    -- =========================================================================
    joined_labeled as (
        select
            city_code,
            area_level,
            area_code,
            period_yyyymm,
            variant,
            is_real_leaf,
            coalesce(typology_stage, 'uninhabited / no data') as typology_stage,
            status_index,
            dynamism_index,
            population
        from matched
        union all
        select
            city_code,
            area_level,
            area_code,
            period_yyyymm,
            variant,
            is_real_leaf,
            coalesce(typology_stage, 'uninhabited / no data') as typology_stage,
            status_index,
            dynamism_index,
            population
        from orphan_rows
    ),

    -- =========================================================================
    -- MEDIUM-C fix: population coverage per area, computed BEFORE the weight
    -- fallback so the fallback can react to genuinely PARTIAL coverage (some
    -- but not all real habitable children missing population), not just the
    -- all-or-nothing case the original WEIGHTING NOTE anticipated.
    -- =========================================================================
    population_coverage as (
        select
            city_code,
            area_level,
            area_code,
            period_yyyymm,
            variant,
            count(*) filter (
                where is_real_leaf and typology_stage <> 'uninhabited / no data'
            ) as n_real_habitable_children,
            count(*) filter (
                where
                    is_real_leaf
                    and typology_stage <> 'uninhabited / no data'
                    and population is not null
            ) as n_children_with_population
        from joined_labeled
        group by 1, 2, 3, 4, 5
    ),

    -- =========================================================================
    -- Join leaf values onto every rollup they belong to, plus population
    -- coverage, to compute the final per-child weight. weight: see the
    -- header's "WEIGHTING NOTE" + MEDIUM-C fix -- real population only when
    -- EVERY real habitable child in the area has it; otherwise an equal
    -- weight of 1 for every child in the area (not just the ones missing it).
    -- =========================================================================
    joined as (
        select
            j.city_code,
            j.area_level,
            j.area_code,
            j.period_yyyymm,
            j.variant,
            j.is_real_leaf,
            j.typology_stage,
            j.status_index,
            j.dynamism_index,
            j.population,
            pc.n_real_habitable_children,
            pc.n_children_with_population,
            case
                when
                    pc.n_real_habitable_children > 0
                    and pc.n_children_with_population < pc.n_real_habitable_children
                then 1
                else coalesce(j.population, 1)
            end as weight
        from joined_labeled as j
        inner join
            population_coverage as pc
            on j.city_code = pc.city_code
            and j.area_level = pc.area_level
            and j.area_code = pc.area_code
            and j.period_yyyymm = pc.period_yyyymm
            and j.variant = pc.variant
    ),

    -- =========================================================================
    -- Per-area totals (constant across every typology_stage row for that area).
    -- =========================================================================
    area_totals as (
        select
            city_code,
            area_level,
            area_code,
            period_yyyymm,
            variant,
            -- MEDIUM-B fix: only count rows backed by a real leaf child -- a
            -- placeholder (orphan) row must contribute 0, not 1.
            count(*) filter (where is_real_leaf) as n_children,
            count(*) filter (
                where is_real_leaf and typology_stage <> 'uninhabited / no data'
            ) as n_habitable_children,
            sum(weight) filter (
                where is_real_leaf and typology_stage <> 'uninhabited / no data'
            ) as habitable_weight,
            -- MEDIUM-C fix: n_children_without_population / population_coverage_frac
            -- distinguish "0 have population" (the original all-equal-weight
            -- fallback, safe) from "some but not all have population" (the
            -- near-drop-out failure mode MEDIUM-C closed) -- both are now
            -- genuinely equal-weighted per `joined`'s weight expression above;
            -- these columns tell a consumer/reviewer HOW incomplete coverage
            -- was, not just THAT it was. any_value() is safe: both are
            -- constant across an area's rows (population_coverage grain
            -- matches this group by).
            any_value(
                n_real_habitable_children - n_children_with_population
            ) as n_children_without_population,
            case
                when any_value(n_real_habitable_children) > 0
                then
                    cast(any_value(n_children_with_population) as double)
                    / any_value(n_real_habitable_children)
            end as population_coverage_frac,
            -- coalesce false: an area with ZERO habitable children has no
            -- population weighting to have degraded in the first place.
            coalesce(
                any_value(n_real_habitable_children - n_children_with_population) > 0,
                false
            ) as has_incomplete_population,
            sum(weight * status_index) filter (
                where status_index is not null
            ) as weighted_status_sum,
            sum(weight) filter (where status_index is not null) as status_weight_sum,
            sum(weight * dynamism_index) filter (
                where dynamism_index is not null
            ) as weighted_dynamism_sum,
            sum(weight) filter (where dynamism_index is not null) as dynamism_weight_sum
        from joined
        group by 1, 2, 3, 4, 5
    ),

    -- =========================================================================
    -- Per-(area, typology_stage) mix rows.
    -- =========================================================================
    stage_agg as (
        select
            city_code,
            area_level,
            area_code,
            period_yyyymm,
            variant,
            typology_stage,
            -- MEDIUM-B fix: exclude placeholder (orphan) rows from the stage
            -- counts/weights -- a zero-child area's single synthetic
            -- 'uninhabited / no data' group must read 0/0, not 1/1.
            count(*) filter (where is_real_leaf) as stage_n_children,
            coalesce(sum(weight) filter (where is_real_leaf), 0) as stage_weight
        from joined
        group by 1, 2, 3, 4, 5, 6
    ),

    stage_with_totals as (
        select
            s.city_code,
            s.area_level,
            s.area_code,
            s.period_yyyymm,
            s.variant,
            s.typology_stage,
            s.stage_n_children,
            s.stage_weight,
            t.n_children,
            t.n_habitable_children,
            t.habitable_weight,
            t.has_incomplete_population,
            t.n_children_without_population,
            t.population_coverage_frac,
            case
                when t.status_weight_sum > 0
                then t.weighted_status_sum / t.status_weight_sum
            end as status_index_weighted_mean,
            case
                when t.dynamism_weight_sum > 0
                then t.weighted_dynamism_sum / t.dynamism_weight_sum
            end as dynamism_index_weighted_mean
        from stage_agg as s
        inner join
            area_totals as t
            on s.city_code = t.city_code
            and s.area_level = t.area_level
            and s.area_code = t.area_code
            and s.period_yyyymm = t.period_yyyymm
            and s.variant = t.variant
    ),

    -- =========================================================================
    -- Population-weighted plurality "dominant stage" -- vote over HABITABLE
    -- children only (design point 5: uninhabited bucket excluded from the
    -- vote). Deterministic tie-break on typology_stage for a genuine exact tie.
    -- =========================================================================
    dominant_ranked as (
        select
            city_code,
            area_level,
            area_code,
            period_yyyymm,
            variant,
            typology_stage as dominant_stage,
            stage_weight as dominant_stage_weight,
            habitable_weight,
            row_number() over (
                partition by city_code, area_level, area_code, period_yyyymm, variant
                order by stage_weight desc, typology_stage asc
            ) as rn
        from stage_with_totals
        where typology_stage <> 'uninhabited / no data'
    ),

    dominant_top as (
        select
            city_code,
            area_level,
            area_code,
            period_yyyymm,
            variant,
            dominant_stage,
            case
                when habitable_weight > 0 then dominant_stage_weight / habitable_weight
            end as dominant_share
        from dominant_ranked
        where rn = 1
    ),

    -- =========================================================================
    -- Area name lookup (dim_area). NB: dim_area carries NO 'bezirk'-level rows
    -- today (seed_dim_area_level.csv's own note: "Bezirk has no dissolved-
    -- geometry choropleth, only a numeric roll-up") -- area_name is genuinely
    -- NULL for area_level='bezirk' here, matching the same
    -- honest-not-backfilled convention export_hamburg_geometry() already
    -- documents for Hamburg subarea_l2's blank area_name (H3-domain-signoff.md
    -- condition 3). A friendly Bezirk display name, if wanted, belongs in the
    -- presentation layer (see web/scripts/export_area_geojson.py's BEZIRK_NAMES
    -- for the existing precedent), not fabricated here.
    -- =========================================================================
    area_name_lookup as (
        select distinct city_code, area_level, area_code, area_name
        from {{ ref("dim_area") }}
    )

select
    s.city_code,
    s.area_level,
    s.area_code,
    an.area_name,
    s.period_yyyymm,
    s.variant,
    s.typology_stage,
    s.n_children,
    s.n_habitable_children,
    (s.n_habitable_children < 3) as is_dominant_fragile,
    s.has_incomplete_population,
    s.n_children_without_population,
    s.population_coverage_frac,
    s.stage_n_children,
    s.stage_weight,
    case
        when s.typology_stage <> 'uninhabited / no data' and s.habitable_weight > 0
        then s.stage_weight / s.habitable_weight
    end as stage_population_share,
    s.status_index_weighted_mean,
    s.dynamism_index_weighted_mean,
    d.dominant_stage,
    d.dominant_share
from stage_with_totals as s
left join
    area_name_lookup as an
    on s.city_code = an.city_code
    and s.area_level = an.area_level
    and s.area_code = an.area_code
left join
    dominant_top as d
    on s.city_code = d.city_code
    and s.area_level = d.area_level
    and s.area_code = d.area_code
    and s.period_yyyymm = d.period_yyyymm
    and s.variant = d.variant
