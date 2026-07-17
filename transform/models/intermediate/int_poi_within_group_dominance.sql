-- int_poi_within_group_dominance.sql
-- OA-D4 (#240, ADR-0024): within-group offering-dominance model -- HHI,
-- top-share, Shannon entropy, Pielou evenness, and signed top_child + tier,
-- computed over a CURATED allow-list of dominance groups (never all 13
-- domains -- OA-D0 domain sign-off Condition A is the allow-list authority,
-- see docs/methodology/OA-D0-domain-signoff.md).
--
-- =============================================================================
-- Grounding (R-C2)
-- =============================================================================
-- Herfindahl 1950 / Hirschman 1945 (HHI concentration index); Shannon 1948
-- (entropy); Simpson 1949 (diversity complement, HHI is Simpson's index under
-- the same math); Pielou 1966 (evenness = entropy / ln(n), diversity
-- normalized for group size); Zukin 2009 "Naked City" (boutique/artisanal
-- "third wave" retail monoculture as a gentrification signature); Ley 1996
-- "The New Middle Class" (cultural-intermediary consumption); Lees/Slater/
-- Wyly 2008 "Gentrification" (retail-succession indicators incl.
-- fitness/wellness); Smith 1979/1987 (rent-gap/disinvestment -- why Vacancy
-- is excluded, its signal lives in OA domain-level Δ, not dominance); Dangschat
-- 1988 (invasion-succession -- why incumbent-serving/infrastructure domains
-- are excluded); Haklay 2010 (VGI coverage non-neutrality, inherited
-- anti-erasure framing). docs/methodology/OA-D0-domain-signoff.md Conditions
-- A (allow-list), B (dominance ethics), OA-D0-geo-signoff.md (this ticket's
-- own geo review) for the concentration-math + min-base-gate specifics.
--
-- =============================================================================
-- Allow-list (OA-D0 domain sign-off Condition A) -- seed_oa_dominance_groups.csv
-- =============================================================================
-- Only FIVE dominance groups are computed, each an explicit, literature-cited
-- curated subset -- this is NOT "dominance over every domain/category":
-- 1. gastronomy_category   -- Cafe/Restaurant/Fast Food (category grain).
-- 2. gastronomy_restaurant_cuisine -- Restaurant TYPE grain (cuisine-typed:
-- Asian/German/Greek/Indian/Italian/Turkish/... Restaurant). PUBLIC-UNSAFE
-- (is_public_safe = false) -- Condition B.3 anti-stigma clause: the
-- Restaurant taxonomy is nationality/cuisine-coded, so a type-within-
-- Restaurant dominance figure literally measures concentration of a
-- cuisine/national origin. This group is retained for INTERNAL STUDY ONLY;
-- any consumer MUST filter is_public_safe = true before rendering on a
-- public, displacement-adjacent surface (poi-map, area pages, G2/O2).
-- 3. retail_category      -- all Retail categories (category grain only --
-- type grain fragments too finely to be a stable monoculture read,
-- Condition A.2).
-- 4. entertainment_category -- Bar/Nightlife/Culture/Leisure (category grain).
-- 5. wellness_curated     -- cross-domain pooled group resolving the
-- fitness/wellness signal-placement gap the ADR's "partial Services"
-- framing missed (Condition A.4): Services>{Beauty, Massage} (category
-- grain) POOLED with Sports and Recreation>Sport>{Fitness Center, Martial
-- Arts} and >Recreation>Sauna (type grain) -- a single curated group
-- spanning two domains and two grains, matching the canonical LSW (2008)
-- "fitness/wellness" amenity signal as ONE construct, not split across
-- Services vs. Sports and Recreation.
--
-- EXPLICITLY OUT (Condition A confirmed exclusions -- never a dominance
-- group here): Vacancy (single-category, k=1, degenerate -- its signal is the
-- domain-level OA + Δ disinvestment marker, Smith 1979/1987); Mobility,
-- Public Service, Religion, Office, Public Space (incumbent-serving /
-- sign-neutral infrastructure, Dangschat 1988); Tourism (touristification is
-- an analytically distinct displacement driver, never blended into classic
-- invasion-succession dominance); `Other > Hipster` / Coworking (single-child
-- category, k=1, degenerate HHI -- its signal is carried by domain/category
-- OA + Δ, not dominance -- documented absence, not an oversight, per
-- Condition A.6, to be restated on the D7 page).
--
-- =============================================================================
-- Concentration/diversity math (per (city, year, area, vintage, weight_variant,
-- dominance_group) cell, n = number of children with positive stock)
-- =============================================================================
-- share_i        = child_stock_i / group_stock_local           (Σ share_i = 1)
-- hhi            = Σ share_i^2                                  (Herfindahl 1950)
-- range: [1/n, 1]; 1/n = perfectly even, 1 = total monoculture.
-- top_share      = max(share_i)                                 (largest single
-- child's share)
-- entropy        = -Σ share_i * ln(share_i)                     (Shannon 1948; range
-- [0, ln(n)])
-- evenness       = entropy / ln(n)                               (Pielou 1966; range
-- [0,1];
-- NULL when n <= 1 -- ln(1) = 0, division is undefined, and a
-- single-child group has no meaningful "evenness" question --
-- distinct from the OA-D0 domain sign-off's Condition A.6/A.7
-- degenerate-group EXCLUSION, which drops the group from the
-- allow-list entirely; here n=1 can still occur transiently
-- within an included group, e.g. a PLR-year where only one
-- Retail category has any stock, so it is NULLed per-cell,
-- not excluded model-wide).
-- top_child      = the child_label with the largest share (arg_max) -- the
-- SIGNED read that makes an unsigned HHI interpretable
-- (Condition B.2 sign-blindness clause -- HHI alone cannot
-- distinguish up-market boutique-ification from down-market
-- disinvestment monoculture; top_child + its offering_tier
-- below disambiguates).
-- top_child_offering_tier / top_child_offering_weight -- joined from
-- seed_poi_offering_relevance.csv at the matching (level, domain, category,
-- type) key, so a caller never has to re-derive "is this a high- or
-- low-tier monoculture" -- Condition B.2 mandates dominance is NEVER
-- published as a bare HHI without this signed pairing.
--
-- =============================================================================
-- Min-parent-base gate (OA-D0 domain sign-off Condition B.4; OA-D0 geo
-- sign-off, dominance min_parent_base = max(10, 5*n_children))
-- =============================================================================
-- HHI on a tiny child-count EXPLODES (two POIs, both cafes -> HHI = 0.5, a
-- spurious "monoculture"). The threshold scales with n_children (a group with
-- more possible children needs a proportionally larger base before its
-- concentration reading is stable) -- stricter than OA's flat
-- `oa_min_poi_base_n` (10) floor, per the geo sign-off's explicit dominance
-- condition. `is_thin_base` flags (never drops) the cell -- Condition B.4
-- anti-erasure: a suppressed/thin cell reads "too thinly observed to
-- characterize", never "commercially dead" (Haklay 2010 coverage-is-not-
-- spatially-neutral disclosure, inherited from the OA model).
--
-- =============================================================================
-- Ethics framing (OA-D0 domain sign-off Condition B -- MANDATORY, all four
-- clauses; enforced downstream at D7/any consumer, not re-derivable from this
-- model's columns alone, so this note anchors the citation)
-- =============================================================================
-- B.1 Not a market-power/antitrust reading -- HHI/entropy/evenness here are
-- descriptive DIVERSITY indices of offering composition; no implication
-- about market competition, business viability, or monopoly.
-- B.2 Sign-blindness -- see top_child/top_child_offering_tier above; NEVER
-- publish a bare hhi/top_share without pairing it to top_child + tier.
-- B.3 Anti-stigma/anti-xenophobia -- see is_public_safe above; cuisine-typed
-- Restaurant dominance is barred from public surfaces, category grain
-- only.
-- B.4 Descriptive-not-causal + low-base + anti-erasure -- see is_thin_base
-- above; dominance tracks composition, never predicts displacement, and
-- is never an "up-and-coming Kiez" targeting signal.
--
-- Grain: one row per (city_code, snapshot_year, area_code, area_vintage,
-- weight_variant, dominance_group) -- NOT per taxonomy leaf (a genuinely new
-- aggregation grain vs. OA's leaf grain, since dominance is inherently a
-- property of the GROUP, not any one child).
--
-- Graceful degradation: returns zero rows when int_poi_offering_advantage
-- has no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_offering_advantage') }}
-- depends_on: {{ ref('seed_oa_dominance_groups') }}
-- depends_on: {{ ref('seed_poi_offering_relevance') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    base as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            weight_variant,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            category_stock_local,
            type_stock_local
        from {{ ref("int_poi_offering_advantage") }}
        where methodology_variant = 'faithful'
    ),

    groups as (select * from {{ ref("seed_oa_dominance_groups") }}),

    -- Category-grain members: one row per (..., domain, category) -- dedup
    -- the type-level fan-out in `base` since category_stock_local repeats
    -- across every sibling type.
    category_members as (
        select distinct
            b.city_code,
            b.snapshot_year,
            b.area_code,
            b.area_vintage,
            b.weight_variant,
            g.dominance_group,
            g.is_public_safe,
            g.child_label,
            b.category_stock_local as child_stock,
            'category' as child_level
        from base as b
        inner join
            groups as g
            on b.poi_domain_h = g.poi_domain_h
            and b.poi_category_h = g.poi_category_h
            and g.child_grain = 'category'
    ),

    -- Type-grain members: already unique per leaf in `base`.
    type_members as (
        select
            b.city_code,
            b.snapshot_year,
            b.area_code,
            b.area_vintage,
            b.weight_variant,
            g.dominance_group,
            g.is_public_safe,
            g.child_label,
            b.type_stock_local as child_stock,
            'type' as child_level
        from base as b
        inner join
            groups as g
            on b.poi_domain_h = g.poi_domain_h
            and b.poi_category_h = g.poi_category_h
            and b.poi_type_h = g.poi_type_h
            and g.child_grain = 'type'
    ),

    members as (
        select *
        from category_members
        union all
        select *
        from type_members
    ),

    -- Only children with positive stock enter the concentration math (a
    -- zero-stock child contributes nothing to share/HHI/entropy and would
    -- otherwise pollute n_children with structurally-absent taxonomy slots).
    present_members as (select * from members where child_stock > 0),

    with_group_totals as (
        select
            *,
            sum(child_stock) over (
                partition by
                    city_code,
                    snapshot_year,
                    area_code,
                    area_vintage,
                    weight_variant,
                    dominance_group
            ) as group_stock_local,
            count(*) over (
                partition by
                    city_code,
                    snapshot_year,
                    area_code,
                    area_vintage,
                    weight_variant,
                    dominance_group
            ) as n_children
        from present_members
    ),

    with_shares as (
        select *, child_stock / nullif(group_stock_local, 0) as child_share
        from with_group_totals
    ),

    agg as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            weight_variant,
            dominance_group,
            -- is_public_safe/is_public_safe is constant per dominance_group
            -- by seed construction (checked by
            -- test_oa_dominance_group_public_safe_constant.sql); any() is
            -- syntactic-sugar-free min() over a boolean.
            min(is_public_safe) as is_public_safe,
            max(group_stock_local) as group_stock_local,
            max(n_children) as n_children,
            sum(child_share * child_share) as hhi,
            max(child_share) as top_share,
            - sum(
                case when child_share > 0 then child_share * ln(child_share) else 0 end
            ) as entropy,
            arg_max(child_label, child_share) as top_child,
            arg_max(child_level, child_share) as top_child_level
        from with_shares
        group by
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            weight_variant,
            dominance_group
    ),

    -- One row per (dominance_group, child_label) -> its own taxonomy key, so
    -- the final join back to seed_poi_offering_relevance is a plain equi-join
    -- (not a correlated subquery) -- distinct because a (dominance_group,
    -- child_label) pair is unique by seed construction (one row per member).
    group_child_key as (
        select distinct
            dominance_group,
            child_label,
            child_grain,
            poi_domain_h,
            poi_category_h,
            poi_type_h
        from {{ ref("seed_oa_dominance_groups") }}
    )

select
    a.city_code,
    a.snapshot_year,
    a.area_code,
    a.area_vintage,
    a.weight_variant,
    a.dominance_group,
    a.is_public_safe,
    a.group_stock_local,
    a.n_children,
    a.hhi,
    a.top_share,
    a.entropy,
    -- Pielou evenness: NULL (not zero/error) when n_children <= 1 -- ln(1)=0
    -- makes the ratio undefined, and "evenness" has no meaning for a
    -- single-child cell (header note above).
    case when a.n_children > 1 then a.entropy / ln(a.n_children) end as evenness,
    a.top_child,
    a.top_child_level,
    -- Signed pairing (Condition B.2, mandatory): the top_child's own
    -- offering_tier/offering_weight from the causal-tier seed, joined via
    -- group_child_key at the matching (level, domain, category, type) key.
    rel.offering_tier as top_child_offering_tier,
    rel.offering_weight as top_child_offering_weight,
    -- Dominance-specific min-parent-base gate (stricter than OA's flat
    -- oa_min_poi_base_n floor -- OA-D0 geo sign-off dominance condition):
    -- max(10, 5 * n_children).
    a.group_stock_local < greatest(10, 5 * a.n_children) as is_thin_base
from agg as a
left join
    group_child_key as k
    on a.dominance_group = k.dominance_group
    and a.top_child = k.child_label
left join
    {{ ref("seed_poi_offering_relevance") }} as rel
    on k.poi_domain_h = rel.poi_domain_h
    and coalesce(k.poi_category_h, '') = coalesce(rel.poi_category_h, '')
    and coalesce(k.poi_type_h, '') = coalesce(rel.poi_type_h, '')
    and a.top_child_level = rel.level
