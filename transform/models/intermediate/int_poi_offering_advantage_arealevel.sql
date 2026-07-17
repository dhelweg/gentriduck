-- int_poi_offering_advantage_arealevel.sql
-- OA-D2 (#240, ADR-0024): area_level roll-up of int_poi_offering_advantage's
-- faithful nested-LQ (domain/category/type), Berlin-first per the D2 spine
-- ("Berlin-first, city-agnostic seam proven for Hamburg" -- Hamburg is D8,
-- out of scope here: Hamburg's subarea_l2 -> subarea_l1 edge is not yet
-- resolved -- see dim_area_hierarchy.sql header -- so there is no prefix or
-- source-provided parent to roll Hamburg up through today).
--
-- =============================================================================
-- Grounding (R-C2): OA-D0 geo-DS sign-off C1/C2/C6, domain sign-off Condition D
-- (docs/methodology/OA-D0-geo-signoff.md, OA-D0-domain-signoff.md); ADR-0024
-- D2 rollup rules; spatial-methods.md §11.1/§11.3; ADR-0017 D1/D2 (LQ-last,
-- parent-relative bases)
-- =============================================================================
-- C1 (geo sign-off, BLOCKING): the weighted roll-up MUST be a PREFIX-SUM of
-- the mass-conserved `weighted_count`/hard `poi_count` stock, formed BEFORE
-- the LQ (LQ-last), never a per-level re-kernel. Prefix-sum is the only
-- option that *provably* preserves the C-1 invariant: because
-- int_osm_poi_plr_weighted already guarantees each POI's weight sums to
-- exactly 1 across the PLRs it reaches, summing a leaf's `type_stock_local`
-- over a DISJOINT, EXHAUSTIVE prefix partition (bzr=6, pgr=4, bezirk=2 digits
-- of the 8-digit PLR code -- each PLR maps to exactly one parent per level,
-- the same LOR RAUMID nesting dim_area_hierarchy.sql already documents and
-- uses) reproduces the SAME city-wide total the hard count would give,
-- independent of area_level. This model therefore rolls up
-- int_poi_offering_advantage's PLR-grain `type_stock_local` by prefix and
-- recomputes the LQ from there -- it does not re-touch fct_poi_development or
-- int_osm_poi_plr_weighted.
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
-- level = 4x overcount). Only the LOCAL numerators
-- (type/category/domain/all_domains _stock_local) are re-derived per
-- area_level, via the same parent-relative window-SUM pattern
-- int_poi_offering_advantage.sql already uses, just re-partitioned by
-- (area_level, area_code) instead of (area_code) alone.
--
-- Area levels produced (Berlin LOR prefix-nesting only -- see
-- dim_area_hierarchy.sql header for why this holds per-vintage without a
-- cross-vintage crosswalk):
-- 'plr'    -- pass-through of int_poi_offering_advantage's own PLR-grain
-- rows (area_level added, everything else copied through).
-- 'bzr'    -- substr(plr_code, 1, 6) parent.
-- 'pgr'    -- substr(plr_code, 1, 4) parent.
-- 'bezirk' -- substr(plr_code, 1, 2) parent. NOTE (OA-D0 geo sign-off C8):
-- this is the numeric/stock roll-up only -- the Bezirk
-- DISSOLVED GEOMETRY (ST_Union of child PLR polygons) that a
-- choropleth would need is separate D6 "mart + geometry
-- plumbing" scope, not built here. A Bezirk row here has valid
-- oa_domain/oa_category/oa_type but no backing dim_area/
-- dim_area_geometry row yet.
--
-- D-3 min-POI-base flags are recomputed per area_level using the SAME
-- `oa_min_poi_base_n` var and the SAME "keyed on this level's own local-share
-- denominator" logic as int_poi_offering_advantage.sql (D-3, #274) -- a
-- coarser area level naturally has a larger local base, so the flag fires
-- less often there (the "resolution-vs-stability dial" the geo sign-off
-- names in C4); this model does not change the threshold or its rationale,
-- only re-evaluates it against the rolled-up local base per level.
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
-- rank-stability check across adjacent scales and the public
-- ecological-fallacy / "BZR is the recommended headline scale, Bezirk is
-- context-only" labelling guidance are D5/D7 (comparison study + public
-- methodology page) deliverables -- this model exposes area_level as a
-- plain dimension with no labelling/framing layer; any consumer (mart,
-- web page) MUST carry that framing per the domain sign-off's binding
-- Condition D before publishing a coarse-level figure.
-- - D6: Bezirk dissolved geometry + mart/geometry plumbing (see above).
-- - D8: Hamburg reuse validation (blocked on D1b's Hamburg parent-wiring
-- spatial crosswalk, not yet built -- see dim_area_hierarchy.sql).
--
-- Grain: one row per (city_code, snapshot_year, area_level, area_code,
-- area_vintage, poi_domain_h, poi_category_h, poi_type_h, weight_variant,
-- methodology_variant). area_level = 'plr' rows are a 1:1 pass-through of
-- int_poi_offering_advantage; 'bzr'/'pgr'/'bezirk' rows are new, rolled-up
-- rows -- this model does not replace int_poi_offering_advantage, it extends
-- it along a new orthogonal axis (ADR-0024's "methods/levels as columns/
-- dimensions, never blended" spine).
--
-- Graceful degradation: returns zero rows when int_poi_offering_advantage has
-- no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_offering_advantage') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- PLR-grain leaf rows from int_poi_offering_advantage, Berlin only (the
    -- LOR prefix-nesting this model relies on is a Berlin-specific fact --
    -- see header). City-wide totals are carried through unchanged (C2).
    plr_leaf as (
        select
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            lpad(area_code, 8, '0') as plr_code,
            type_stock_local,
            type_stock_city,
            category_stock_city,
            domain_stock_city,
            all_domains_stock_city
        from {{ ref("int_poi_offering_advantage") }}
        where city_code = 'BER'
    ),

    -- Attach each PLR-grain leaf's bzr/pgr/bezirk parent codes via the same
    -- code-prefix derivation dim_area_hierarchy.sql uses (LOR RAUMID nesting;
    -- see C1 above -- this is a per-area_vintage fact, no crosswalk needed).
    plr_with_parents as (
        select
            *,
            substr(plr_code, 1, 6) as bzr_code,
            substr(plr_code, 1, 4) as pgr_code,
            substr(plr_code, 1, 2) as bezirk_code
        from plr_leaf
    ),

    -- area_level = 'plr': pass-through, area_code = the PLR's own code.
    plr_rows as (
        select
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            'plr' as area_level,
            plr_code as area_code,
            type_stock_local,
            type_stock_city,
            category_stock_city,
            domain_stock_city,
            all_domains_stock_city
        from plr_with_parents
    ),

    -- area_level = 'bzr': prefix-sum type_stock_local grouped by bzr_code
    -- (C1). City totals are the SAME value repeated per group (MAX is a
    -- no-op aggregator here since every row in the group already carries the
    -- identical city-wide constant -- not a re-derivation).
    bzr_rows as (
        select
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            'bzr' as area_level,
            bzr_code as area_code,
            sum(type_stock_local) as type_stock_local,
            max(type_stock_city) as type_stock_city,
            max(category_stock_city) as category_stock_city,
            max(domain_stock_city) as domain_stock_city,
            max(all_domains_stock_city) as all_domains_stock_city
        from plr_with_parents
        group by
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            bzr_code
    ),

    -- area_level = 'pgr': same pattern, grouped by pgr_code.
    pgr_rows as (
        select
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            'pgr' as area_level,
            pgr_code as area_code,
            sum(type_stock_local) as type_stock_local,
            max(type_stock_city) as type_stock_city,
            max(category_stock_city) as category_stock_city,
            max(domain_stock_city) as domain_stock_city,
            max(all_domains_stock_city) as all_domains_stock_city
        from plr_with_parents
        group by
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            pgr_code
    ),

    -- area_level = 'bezirk': same pattern, grouped by bezirk_code. Numeric
    -- roll-up only -- see header note on Bezirk geometry being D6 scope.
    bezirk_rows as (
        select
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            'bezirk' as area_level,
            bezirk_code as area_code,
            sum(type_stock_local) as type_stock_local,
            max(type_stock_city) as type_stock_city,
            max(category_stock_city) as category_stock_city,
            max(domain_stock_city) as domain_stock_city,
            max(all_domains_stock_city) as all_domains_stock_city
        from plr_with_parents
        group by
            city_code,
            snapshot_year,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            methodology_variant,
            bezirk_code
    ),

    unioned as (
        select *
        from plr_rows
        union all
        select *
        from bzr_rows
        union all
        select *
        from pgr_rows
        union all
        select *
        from bezirk_rows
    ),

    -- Re-derive the LOCAL parent-relative bases per area_level (C2: window
    -- SUMs re-partitioned by (area_level, area_code) instead of area_code
    -- alone -- this is the ONLY thing that changes per level; city totals
    -- above are already broadcast, not re-windowed).
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
    -- naturally flag less -- the "resolution-vs-stability dial").
    all_domains_stock_local
    < {{ var("oa_min_poi_base_n", 10) }} as oa_domain_min_base_flag,
    domain_stock_local
    < {{ var("oa_min_poi_base_n", 10) }} as oa_category_min_base_flag,
    domain_stock_local < {{ var("oa_min_poi_base_n", 10) }} as oa_type_min_base_flag

from with_local_bases
