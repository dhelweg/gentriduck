-- int_poi_offering_advantage_arealevel.sql
-- OA-D2 (#240, ADR-0024): area_level roll-up of int_poi_offering_advantage's
-- faithful nested-LQ (domain/category/type). OA-D8 (#240) generalized this
-- model from the original Berlin-only build to city-agnostic (ADR-0005) --
-- it now rolls up BOTH Berlin (plr/bzr/pgr/bezirk) and Hamburg
-- (subarea_l2/subarea_l1/district) through the same code path.
--
-- =============================================================================
-- OA-D8 generalization (R-C2 grounding): what changed and why
-- =============================================================================
-- The OA-D2 build filtered `where city_code = 'BER'` and derived bzr/pgr/
-- bezirk parent codes via a Berlin-specific `substr(plr_code, 1, N)` LOR
-- RAUMID prefix -- a mechanism that is TRUE for Berlin but meaningless for
-- Hamburg (dim_area_hierarchy.sql's header confirms Hamburg statgebiet ids
-- do NOT nest by string prefix with Stadtteil codes). Per ADR-0005's "do not
-- put substr() in a shared model" rule (this planning doc's own "The seam"
-- section, docs/planning/oa-modes-hierarchy-dominance.md), that Berlin-only
-- prefix derivation was never supposed to live here permanently -- it was a
-- deliberate Berlin-first narrowing (D2's header: "Hamburg is D8, out of
-- scope here"), pending dim_area_hierarchy.sql resolving a Hamburg parent
-- edge (done in OA-D1b, #240, ADR-0024 D4: the Gebiet->Stadtteil spatial
-- crosswalk).
--
-- This model now consumes dim_area_hierarchy's resolved, city-agnostic
-- (city_code, area_level, area_code) -> (parent_area_level, parent_area_code)
-- EDGES generically, via two small per-city config points instead of a
-- literal `'BER'`:
-- 1. `dim_city.oa_leaf_area_level` (OA-D8 seed column, seed_dim_city.csv) --
-- each city's own OA leaf area_level ('plr' for Berlin, 'subarea_l2' for
-- Hamburg -- Hamburg's finest published statistical subdivision, the
-- OA-A.2/H1 spatial-join grain, see int_osm_poi_hamburg.sql). This model
-- no longer needs to know which city is which -- it asks dim_city.
-- 2. `dim_area_hierarchy` walked up to 3 ancestor levels (enough for
-- Berlin's 4-level plr->bzr->pgr->bezirk chain; Hamburg's shallower
-- 3-level subarea_l2->subarea_l1->district chain simply terminates one
-- level earlier -- LEFT JOINs mean a city with fewer ancestor levels than
-- another gets NULL past its own top level, filtered out below, not
-- assumed to exist). This model performs NO substr()/code-prefix
-- derivation of its own any more -- Berlin's LOR-prefix mechanism and
-- Hamburg's OA-D1b spatial-crosswalk mechanism both already live inside
-- dim_area_hierarchy.sql; this model only consumes whichever edges that
-- model resolved, generically, exactly the "seam" ADR-0005 exists for.
--
-- C1/C2 (below) are UNCHANGED in substance -- rolling up via
-- dim_area_hierarchy's edges is still a prefix-sum-equivalent stock roll-up
-- (Hamburg's Gebiet->Stadtteil edge is a spatial ASSIGNMENT, not a
-- fractional-overlap split -- OA-D1b domain sign-off finding 1 confirms a
-- Gebiet nests wholly inside exactly one Stadtteil by construction, so
-- summing child Gebiet stock into its one Stadtteil is exactly as
-- mass-conserving as summing PLR stock into its one BZR by prefix). Only the
-- MECHANISM used to find "this leaf's parent" changed (edge lookup instead
-- of substr()); the LQ-last / broadcast-once-city-denominator math below is
-- untouched.
--
-- =============================================================================
-- Grounding (R-C2): OA-D0 geo-DS sign-off C1/C2/C6, domain sign-off Condition D
-- (docs/methodology/OA-D0-geo-signoff.md, OA-D0-domain-signoff.md); ADR-0024
-- D2 rollup rules; spatial-methods.md §11.1/§11.3; ADR-0017 D1/D2 (LQ-last,
-- parent-relative bases); OA-D1b domain sign-off (docs/methodology/
-- OA-D1b-domain-signoff.md) forward-carried conditions 1-3 (Hamburg headline
-- scale argued on its own terms, ecological-fallacy/anti-erasure caveats
-- carry through, fallback-Gebiete re-check) -- discharged as follows:
-- - Condition 1 (headline scale): decided in seed_dim_area_level.csv's
-- publish_tier column + mart_poi_oa_arealevel.sql's header, NOT here --
-- this model exposes area_level as a plain dimension with no
-- labelling/framing layer (unchanged from OA-D2), so the substantive
-- Hamburg-specific reasoning lives at the mart, the actual publication
-- boundary.
-- - Condition 2 (ecological-fallacy/anti-erasure caveats carry through):
-- the D-3 min-POI-base flags below are recomputed against EACH city's OWN
-- rolled-up local base, per area_level, with the SAME mechanism and
-- threshold for Hamburg as for Berlin (no city-conditional logic) -- a
-- thinly-observed Hamburg Stadtteil/Bezirk flags exactly as a thinly-
-- observed Berlin BZR/Bezirk would, so the "too thinly observed to
-- characterize, never commercially dead" framing (Haklay 2010) carries
-- through unchanged.
-- - Condition 3 (fallback-Gebiete '90001'/'106001' re-check): data-engineer
-- spot-check performed in the OA-D8 build (2026-07-17, re-derive by
-- querying this model directly -- not a substitute for the geo-DS/domain-
-- expert R-C1 sign-off this ticket still requires): '90001' (sole Gebiet
-- mapped to Stadtteil 02703/Gut Moor -- its rolled-up Stadtteil figures are
-- therefore numerically identical to its own leaf figures, all_domains_
-- stock_local=16, above the flat oa_min_poi_base_n=10 floor but still
-- genuinely thin) shows no domain-level distortion attributable to the
-- fallback assignment itself -- its low count is a property of the Gebiet's
-- own sparse OSM coverage, unrelated to which Stadtteil it was assigned to.
-- '106001' (one of 13 Gebiete under Stadtteil 02307/Schnelsen,
-- all_domains_stock_local=600, the LARGEST of the 13 but not an outlier in
-- kind) has a Gastronomy oa_domain=0.68, squarely inside its 12 siblings'
-- 0.42-1.67 range and close to the Stadtteil-level rolled-up 0.72 -- not a
-- value that looks like a crosswalk-fallback artifact. Neither Gebiet's
-- figures stand out from their geographic neighbors in a way suggestive of
-- a boundary-noise/fallback-assignment problem.
--
-- C1 (geo sign-off, BLOCKING): the weighted roll-up MUST be a SUM of the
-- mass-conserved `weighted_count`/hard `poi_count` stock, formed BEFORE
-- the LQ (LQ-last), never a per-level re-kernel. Summing a leaf's
-- `type_stock_local` over a DISJOINT, EXHAUSTIVE parent partition (every
-- leaf area maps to exactly one parent per level, whether via Berlin's LOR
-- RAUMID code-prefix nesting or Hamburg's OA-D1b spatial assignment --
-- dim_area_hierarchy.sql's resolved edges guarantee this for both)
-- reproduces the SAME city-wide total the hard count would give,
-- independent of area_level. This model therefore rolls up
-- int_poi_offering_advantage's leaf-grain `type_stock_local` via
-- dim_area_hierarchy's edges and recomputes the LQ from there -- it does not
-- re-touch fct_poi_development or int_osm_poi_plr_weighted.
--
-- C2 (geo sign-off, BLOCKING): stock-first / LQ-last / broadcast-once city
-- denominator. The `*_stock_city` columns int_poi_offering_advantage already
-- computes (type_stock_city, category_stock_city, domain_stock_city,
-- all_domains_stock_city) are CITY-WIDE totals -- identical at every area
-- level by construction (the whole city's stock does not change depending on
-- which spatial grain you view it at). This model therefore copies those
-- columns straight through UNCHANGED for every area_level row rather than
-- re-computing them with a window SUM over the unioned multi-level rows --
-- doing the latter would be exactly the I15-class bug at 4x scale the geo
-- sign-off calls out (each POI's city total would be summed once per area
-- level = 4x overcount, now potentially worse across two cities' level
-- counts if a future edit re-windowed globally instead of per city_code).
-- Only the LOCAL numerators (type/category/domain/all_domains _stock_local)
-- are re-derived per area_level, via the same parent-relative window-SUM
-- pattern int_poi_offering_advantage.sql already uses, just re-partitioned
-- by (city_code, area_level, area_code) instead of (area_code) alone.
--
-- Area levels produced:
-- Berlin (LOR prefix-nesting, via dim_area_hierarchy's Berlin edges):
-- 'plr'    -- pass-through of int_poi_offering_advantage's own PLR-grain
-- rows (area_level added, everything else copied through).
-- 'bzr'    -- rolled up via the plr->bzr dim_area_hierarchy edge.
-- 'pgr'    -- rolled up via the bzr->pgr dim_area_hierarchy edge.
-- 'bezirk' -- rolled up via the pgr->bezirk dim_area_hierarchy edge. NOTE
-- (OA-D0 geo sign-off C8): this is the numeric/stock roll-up only -- the
-- Bezirk DISSOLVED GEOMETRY (ST_Union of child PLR polygons) that a
-- choropleth would need is separate D6 "mart + geometry plumbing" scope
-- (built in dim_area_geometry.sql), not built here. A Bezirk row here has
-- valid oa_domain/oa_category/oa_type but no backing dim_area row (dim_area
-- itself has no 'bezirk' rows -- see that model's header).
-- Hamburg (OA-D8, #240, via dim_area_hierarchy's Hamburg edges):
-- 'subarea_l2' -- pass-through of int_poi_offering_advantage's own Gebiet-
-- grain rows (Hamburg's OA leaf level, dim_city.oa_leaf_area_level).
-- 'subarea_l1' -- rolled up via the OA-D1b Gebiet->Stadtteil spatial-
-- crosswalk edge (dim_area_hierarchy.sql).
-- 'district'   -- rolled up via the WFS-provided Stadtteil->Bezirk edge.
--
-- D-3 min-POI-base flags are recomputed per area_level using the SAME
-- `oa_min_poi_base_n` var and the SAME "keyed on this level's own local-share
-- denominator" logic as int_poi_offering_advantage.sql (D-3, #274) -- a
-- coarser area level naturally has a larger local base, so the flag fires
-- less often there (the "resolution-vs-stability dial" the geo sign-off
-- names in C4); this model does not change the threshold or its rationale,
-- only re-evaluates it against the rolled-up local base per level, IDENTICAL
-- mechanism for both cities (OA-D1b domain sign-off forward condition 2).
--
-- Deferred to later D-spine tickets (NOT built here, flagged so this model's
-- narrow scope is explicit):
-- - D3: calculation-method columns (global-LQ, log-LQ, share-diff,
-- shrunk-LQ, raw share, z-score, Getis-Ord, density, per-capita). This
-- model rolls up ONLY the existing faithful nested-LQ (oa_domain/
-- oa_category/oa_type), the sole 2018-golden-anchored construct (Epic B
-- framing, domain sign-off Condition E) -- not the "everything" method
-- set.
-- - C3 (geo sign-off): the per-mode x per-level completeness-contamination
-- Spearman gate is a D5 (comparison study) deliverable, not asserted here
-- as a build-blocking test -- this model's own C-1b test (below) checks
-- mass conservation, not temporal contamination.
-- - C5 (geo sign-off) / Condition D (domain sign-off): the §7 MAUP
-- rank-stability check across adjacent scales is a D5/D7 (comparison
-- study + public methodology page) deliverable -- this model exposes
-- area_level as a plain dimension with no labelling/framing layer; any
-- consumer (mart, web page) MUST carry the ecological-fallacy/headline-
-- scale framing per the domain sign-off's binding Condition D (Berlin) and
-- the OA-D1b domain sign-off forward condition 1 (Hamburg, argued on its
-- own terms) before publishing a coarse-level figure -- see
-- mart_poi_oa_arealevel.sql.
-- - D6: Bezirk dissolved geometry + mart/geometry plumbing (built; see
-- dim_area_geometry.sql).
--
-- Grain: one row per (city_code, snapshot_year, area_level, area_code,
-- area_vintage, poi_domain_h, poi_category_h, poi_type_h, weight_variant,
-- methodology_variant). Leaf-level rows (area_level = each city's
-- dim_city.oa_leaf_area_level) are a 1:1 pass-through of
-- int_poi_offering_advantage; ancestor-level rows are new, rolled-up rows --
-- this model does not replace int_poi_offering_advantage, it extends it
-- along a new orthogonal axis (ADR-0024's "methods/levels as columns/
-- dimensions, never blended" spine).
--
-- Graceful degradation: returns zero rows when int_poi_offering_advantage has
-- no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_offering_advantage') }}
-- depends_on: {{ ref('dim_city') }}
-- depends_on: {{ ref('dim_area_hierarchy') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Leaf-grain rows from int_poi_offering_advantage, tagged with each
    -- city's OWN leaf area_level (OA-D8 seam: dim_city.oa_leaf_area_level,
    -- not a `city_code = 'BER'` literal). The INNER JOIN to dim_city also
    -- defensively excludes int_poi_offering_advantage's legacy lowercase
    -- 'berlin' city_code rows (a pre-ADR-0005-canonicalization artifact,
    -- see fct_poi_development.sql's canonical_city_code() note) exactly as
    -- the original `where city_code = 'BER'` filter did, generically rather
    -- than by literal string match. City-wide totals are carried through
    -- unchanged (C2).
    leaf as (
        select
            oa.city_code,
            oa.snapshot_year,
            oa.area_vintage,
            oa.poi_domain_h,
            oa.poi_category_h,
            oa.poi_type_h,
            oa.weight_variant,
            oa.methodology_variant,
            city.oa_leaf_area_level as leaf_area_level,
            -- Berlin's 'plr' codes are a fixed 8-digit LOR RAUMID (the #266
            -- historical un-padded-7-char bug this guards against, see
            -- dim_area_hierarchy.sql header); this defensive zero-pad is a
            -- fact about the 'plr' CODE FORMAT, not a Berlin-only business
            -- rule, so it is scoped to `leaf_area_level = 'plr'` (data-
            -- driven) rather than `city_code = 'BER'` (a city literal).
            -- Hamburg's subarea_l2 (Gebiet) codes are a different,
            -- variable-width (4-6 digit) id space (dim_area_hierarchy.sql
            -- header: "statgebiet area_code length varies 4/5/6 digits") --
            -- padding them to 8 would corrupt the join to dim_area_hierarchy,
            -- so they pass through unpadded.
            case
                when city.oa_leaf_area_level = 'plr'
                then lpad(oa.area_code, 8, '0')
                else oa.area_code
            end as leaf_code,
            oa.type_stock_local,
            oa.type_stock_city,
            oa.category_stock_city,
            oa.domain_stock_city,
            oa.all_domains_stock_city
        from {{ ref("int_poi_offering_advantage") }} as oa
        inner join {{ ref("dim_city") }} as city on oa.city_code = city.city_code
    ),

    -- Walk up to 3 ancestor levels generically via dim_area_hierarchy's
    -- resolved edges (OA-D8 seam). LEFT JOINs so a city with fewer ancestor
    -- levels than another (Hamburg: 2 levels above its leaf; Berlin: 3)
    -- simply carries NULL parent columns past its own top level -- filtered
    -- out below (`where l2_code is not null` / `where l3_code is not null`),
    -- never assumed to exist.
    with_l1 as (
        select leaf.*, h1.parent_area_level as l1_level, h1.parent_area_code as l1_code
        from leaf
        left join
            {{ ref("dim_area_hierarchy") }} as h1
            on leaf.city_code = h1.city_code
            and leaf.leaf_area_level = h1.area_level
            and leaf.leaf_code = h1.area_code
    ),

    with_l2 as (
        select
            with_l1.*, h2.parent_area_level as l2_level, h2.parent_area_code as l2_code
        from with_l1
        left join
            {{ ref("dim_area_hierarchy") }} as h2
            on with_l1.city_code = h2.city_code
            and with_l1.l1_level = h2.area_level
            and with_l1.l1_code = h2.area_code
    ),

    with_l3 as (
        select
            with_l2.*, h3.parent_area_level as l3_level, h3.parent_area_code as l3_code
        from with_l2
        left join
            {{ ref("dim_area_hierarchy") }} as h3
            on with_l2.city_code = h3.city_code
            and with_l2.l2_level = h3.area_level
            and with_l2.l2_code = h3.area_code
    ),

    -- Leaf level: pass-through, area_code = the leaf's own code
    -- ('plr' for Berlin, 'subarea_l2' for Hamburg).
    leaf_rows as (
        select
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            leaf_area_level as area_level,
            leaf_code as area_code,
            type_stock_local,
            type_stock_city,
            category_stock_city,
            domain_stock_city,
            all_domains_stock_city
        from with_l3
    ),

    -- Level 1 above the leaf ('bzr' for Berlin, 'subarea_l1' for Hamburg):
    -- sum type_stock_local grouped by the resolved parent code (C1). City
    -- totals are the SAME value repeated per group (MAX is a no-op
    -- aggregator here since every row in the group already carries the
    -- identical city-wide constant -- not a re-derivation).
    l1_rows as (
        select
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            l1_level as area_level,
            l1_code as area_code,
            sum(type_stock_local) as type_stock_local,
            max(type_stock_city) as type_stock_city,
            max(category_stock_city) as category_stock_city,
            max(domain_stock_city) as domain_stock_city,
            max(all_domains_stock_city) as all_domains_stock_city
        from with_l3
        where l1_code is not null
        group by
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            l1_level,
            l1_code
    ),

    -- Level 2 above the leaf ('pgr' for Berlin, 'district' for Hamburg --
    -- Hamburg's top level, so this is its coarsest OA rollup). Same pattern.
    l2_rows as (
        select
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            l2_level as area_level,
            l2_code as area_code,
            sum(type_stock_local) as type_stock_local,
            max(type_stock_city) as type_stock_city,
            max(category_stock_city) as category_stock_city,
            max(domain_stock_city) as domain_stock_city,
            max(all_domains_stock_city) as all_domains_stock_city
        from with_l3
        where l2_code is not null
        group by
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            l2_level,
            l2_code
    ),

    -- Level 3 above the leaf ('bezirk' for Berlin -- Berlin's top level;
    -- Hamburg has no level 3, so l3_code is always NULL there and this CTE
    -- contributes zero Hamburg rows). Numeric roll-up only -- see header
    -- note on Bezirk choropleth geometry living in dim_area_geometry.sql.
    l3_rows as (
        select
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            l3_level as area_level,
            l3_code as area_code,
            sum(type_stock_local) as type_stock_local,
            max(type_stock_city) as type_stock_city,
            max(category_stock_city) as category_stock_city,
            max(domain_stock_city) as domain_stock_city,
            max(all_domains_stock_city) as all_domains_stock_city
        from with_l3
        where l3_code is not null
        group by
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            l3_level,
            l3_code
    ),

    unioned as (
        select *
        from leaf_rows
        union all
        select *
        from l1_rows
        union all
        select *
        from l2_rows
        union all
        select *
        from l3_rows
    ),

    -- Re-derive the LOCAL parent-relative bases per area_level (C2: window
    -- SUMs re-partitioned by (city_code, area_level, area_code) instead of
    -- area_code alone -- this is the ONLY thing that changes per level; city
    -- totals above are already broadcast, not re-windowed).
    with_local_bases as (
        select
            *,
            sum(type_stock_local) over (
                partition by
                    city_code,
                    snapshot_year,
                    area_level,
                    area_code,
                    area_vintage,
                    weight_variant,
                    poi_domain_h,
                    poi_category_h
            ) as category_stock_local,
            sum(type_stock_local) over (
                partition by
                    city_code,
                    snapshot_year,
                    area_level,
                    area_code,
                    area_vintage,
                    weight_variant,
                    poi_domain_h
            ) as domain_stock_local,
            sum(type_stock_local) over (
                partition by
                    city_code,
                    snapshot_year,
                    area_level,
                    area_code,
                    area_vintage,
                    weight_variant
            ) as all_domains_stock_local
        from unioned
    )

select
    city_code,
    snapshot_year,
    area_level,
    area_code,
    area_vintage,
    poi_domain_h,
    poi_category_h,
    poi_type_h,
    weight_variant,
    methodology_variant,

    type_stock_local,
    type_stock_city,
    category_stock_local,
    category_stock_city,
    domain_stock_local,
    domain_stock_city,
    all_domains_stock_local,
    all_domains_stock_city,

    -- Same LQ formulas as int_poi_offering_advantage.sql (ADR-0017 D1),
    -- applied to the area_level-local numerators against the unchanged
    -- city-wide denominators (LQ-last, C1/C2).
    (domain_stock_local / nullif(all_domains_stock_local, 0))
    / nullif(domain_stock_city / nullif(all_domains_stock_city, 0), 0) as oa_domain,

    (category_stock_local / nullif(domain_stock_local, 0))
    / nullif(category_stock_city / nullif(domain_stock_city, 0), 0) as oa_category,

    (type_stock_local / nullif(domain_stock_local, 0))
    / nullif(type_stock_city / nullif(domain_stock_city, 0), 0) as oa_type,

    -- D-3 min-POI-base flags, re-evaluated per area_level's own local base
    -- (OA-D0 geo sign-off C4: same threshold/rationale, coarser levels
    -- naturally flag less -- the "resolution-vs-stability dial"; IDENTICAL
    -- mechanism for Berlin and Hamburg, OA-D1b domain sign-off forward
    -- condition 2).
    all_domains_stock_local
    < {{ var("oa_min_poi_base_n", 10) }} as oa_domain_min_base_flag,
    domain_stock_local
    < {{ var("oa_min_poi_base_n", 10) }} as oa_category_min_base_flag,
    domain_stock_local < {{ var("oa_min_poi_base_n", 10) }} as oa_type_min_base_flag

from with_local_bases
