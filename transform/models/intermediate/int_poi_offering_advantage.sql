-- int_poi_offering_advantage.sql
-- OA-A.2 (#166, ADR-0017): Offering Advantage (OA) — 3-level nested location
-- quotient (LQ), faithful Run 1, both POI variants (hard + distance-weighted).
--
-- =============================================================================
-- Construct (R-C2 grounding: reference/system/70_oa_helper.sql, 71_oa.sql;
-- thesis pp. 55-56, 91; docs/methodology/spatial-methods.md §11; ADR-0017 D1/D2)
-- =============================================================================
--
-- OA is a location quotient computed at THREE nested taxonomy levels -- domain,
-- category, type -- against a PARENT-RELATIVE reference base, confirmed against
-- 71_oa.sql column-by-column (spatial-methods.md §11.1, ADR-0017 D1):
--
-- domain X:              OA(X, a) = ( X_a / Σ_d d_a ) / ( X_city / Σ_d d_city )
-- category c ⊂ domain D: OA(c, a) = ( c_a / D_a )     / ( c_city / D_city )
-- type t ⊂ domain D:     OA(t, a) = ( t_a / D_a )     / ( t_city / D_city )
--
-- Category AND type both divide by their PARENT DOMAIN total (D_a / D_city),
-- never by the grand all-domains total and never by the category (type does
-- NOT nest under category) -- e.g. thesis
-- `t_restaurant_italiener_stock / d_gastronomie_stock`, not
-- `.../c_restaurant_stock`. Domain divides by the all-domains grand total.
-- OA = 1 means "represented exactly at the city-wide compositional rate";
-- > 1 = over-represented ("offering advantage"); < 1 = under-represented.
-- Standard LQ (Isard 1960; Miller, Gibson & Wright 1991).
--
-- Grain (one row per taxonomy LEAF, i.e. the finest (domain, category, type)
-- triple actually observed, per ADR-0017 D4's literal unique key):
-- (city_code, snapshot_year, area_code, area_vintage, poi_domain_h,
-- poi_category_h, poi_type_h, weight_variant, methodology_variant)
-- Each row carries all three OA figures (oa_domain, oa_category, oa_type) for
-- its own taxonomy leaf, rather than melting into three separate per-level
-- rows -- this is the long-format analogue of the thesis's wide 170-OA-column
-- table (one row per PLR-year, one column per taxonomy entry), consistent with
-- how fct_poi_development / int_osm_poi_plr_weighted are already grained.
--
-- Sparse representation (documented Epic B directional divergence, not a
-- defect -- CLAUDE.md "Epic B framing"): a taxonomy leaf with zero POIs in a
-- given PLR-year produces no row here, matching the sparse-count convention
-- already used throughout this codebase (fct_poi_development,
-- int_poi_features_pivot, int_osm_poi_plr_weighted never zero-fill missing
-- categories per PLR either). The thesis's wide pivot tables zero-fill every
-- named column per PLR-year, so a type genuinely absent from a PLR reads as
-- oa = 0 there (not NULL) when its parent domain is present. This revival
-- instead omits the row, which is NULL-equivalent for aggregate/mean
-- comparisons but not identical when comparing raw column density against the
-- golden (170 OA columns, reference/goldens/20180909_result_full_plr.csv).
-- Golden validation (a later ticket) must account for this when reindexing
-- against the dense wide format -- flagged as an open question for the
-- geo-DS/domain-expert sign-off on this ticket.
--
-- =============================================================================
-- Order of operations on the weighted variant (spatial-methods.md §11.1;
-- ADR-0017 D2.1 -- geo-DS condition, "weight first, LQ last")
-- =============================================================================
-- The Gaussian-weighted variant's `weighted_count` (already kernel + mass-
-- normalized + leakage-guarded in int_osm_poi_plr_weighted) is aggregated UP
-- the taxonomy (via window SUMs below) within each PLR and city-wide, and the
-- LQ is formed LAST -- exactly mirroring the hard variant's arithmetic on
-- `poi_count`. Forming per-POI shares before the kernel, or smoothing an
-- already-formed OA ratio, is prohibited (ratio-of-smoothed != smooth-of-
-- ratio; §11.1). `combined_base` below is the single point where both variants
-- enter this shared LQ-last pipeline.
--
-- =============================================================================
-- Denominator: same-variant weighted city totals + the C-1 invariance
-- (spatial-methods.md §11.1, §11.3; ADR-0017 D5 C-1 -- BLOCKING)
-- =============================================================================
-- The city-wide reference for each level is computed from the SAME variant's
-- stock (window SUMs partitioned by weight_variant, never mixing a weighted
-- local numerator with a hard-count city denominator). Because
-- int_osm_poi_plr_weighted's kernel weights sum to 1 per POI (mass
-- conservation, spatial-methods.md §2) AND the C-1 leakage guard (§11.3;
-- implemented in int_osm_poi_plr_weighted.sql) prevents any POI from being
-- silently dropped, the city-wide weighted total per level equals the hard-
-- count city total per level EXACTLY. This is the correctness anchor for this
-- model and is enforced (not just documented) by the singular test
-- test_c1_oa_weighted_mass_conservation_invariance.sql, which fails the build
-- if any (city_code, snapshot_year, area_vintage, level, level_value) cell's
-- weighted and hard city-wide totals diverge beyond floating tolerance.
--
-- =============================================================================
-- methodology_variant (ADR-0017 D4)
-- =============================================================================
-- Every row is tagged methodology_variant = 'faithful' -- this ticket builds
-- ONLY the faithful Run 1 (thesis-fidelity, all types, no curation; ADR-0017
-- D3). The 'improved' Run 2 (causal-tier curated weighting) is a SEPARATE,
-- never-blended workstream owned by OA-B.1..B.4 (#170-173); this column exists
-- now (enumerated + accepted_values-tested) so those tickets append rows
-- rather than requiring a grain migration (ADR-0017 D4 "structural invariant").
--
-- =============================================================================
-- Interpretation notes (NOT SQL logic -- domain-expert D-1/D-2 conditions;
-- ADR-0017 D5; docs/epic-b/P0.1-oa-variant-domain-signoff.md §1.3, §4)
-- =============================================================================
-- D-1: OA is a DESCRIPTIVE indicator of commercial/retail change consistent
-- with *early* gentrification (Dangschat 1988 invasion-succession applied to
-- the retail landscape; Zukin 2009; Lees/Slater/Wyly 2008) -- it is NOT a
-- causal displacement predictor and must never be presented as an "up-and-
-- coming Kiez" targeting signal. This model computes the LQ only; framing is
-- enforced downstream (G2 methodology page, O2 whitepaper #82, A.5 #169).
-- D-2: OA is a MULTI-SIGNED BUNDLE -- do not sum raw oa_* columns across types
-- into a single "how gentrified" score. `d_leerstand`/Vacancy-domain OA is a
-- DISINVESTMENT / rent-gap marker (Smith 1979/1987) -- high vacancy-OA
-- signals the pre-reinvestment trough, the OPPOSITE pole from amenity-OA
-- (e.g. Gastronomy/Entertainment). Incumbent-serving or sign-neutral types
-- (Religion, Funeral, parts of Public Service) also coexist unweighted in
-- this faithful Run 1. Per-type sign must be respected by any downstream
-- reader; the causal-tier curation (Workstream 2, OA-B.1-4 #170-173) is the
-- ONLY sanctioned mechanism for dropping/weighting types -- it must not be
-- short-circuited here (ADR-0017 D3 firm rule).
-- D-3 (advisory, not blocking here): the compositional LQ is unstable in low-
-- POI-base PLRs (a single POI can swing a type's local share). A minimum-
-- POI-base flag/suppression is deferred to a later ticket (OA-C.1/G2 per
-- ADR-0017 D5) -- NOT implemented in this model.
--
-- Graceful degradation: returns zero rows when fct_poi_development and/or
-- int_osm_poi_plr_weighted have no rows (OSM/LOR ingestion not yet run).
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('fct_poi_development') }}
-- depends_on: {{ ref('int_osm_poi_plr_weighted') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Hard point-in-polygon variant, tagged 'standard' to match the
    -- weight_variant vocabulary already used by int_osm_poi_plr_weighted
    -- (ADR-0010 §1) and referenced by the weighted variant's own
    -- weight_variant description ("standard" = the bandwidth-free floor,
    -- ADR-0017 D2.3).
    standard_base as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            poi_count * 1.0 as stock,
            'standard' as weight_variant
        from {{ ref("fct_poi_development") }}
    ),

    -- Mass-conserving Gaussian-weighted variant (leakage-guarded; see
    -- int_osm_poi_plr_weighted.sql header for the C-1 guard). weight_variant
    -- carries whatever bandwidth this table was last built with (default
    -- 'gaussian_500m'; the OA headline bandwidth is 1000 m per
    -- spatial-methods.md §11.2 / ADR-0017 D2.3 -- build/rebuild
    -- int_osm_poi_plr_weighted with `--vars 'poi_kernel_bandwidth_m: 1000'`
    -- for the OA headline run; the {500,1000,1500} m sweep is OA-C.1 #174's
    -- scope, not this model's).
    weighted_base as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weighted_count as stock,
            weight_variant
        from {{ ref("int_osm_poi_plr_weighted") }}
    ),

    -- Weight-first: both variants now share one `stock` column at the LQ-last
    -- pipeline's entry point (spatial-methods.md §11.1).
    combined_base as (
        select *
        from standard_base
        union all
        select *
        from weighted_base
    ),

    -- All parent-relative reference bases, computed as window SUMs over
    -- combined_base (same idiom as int_poi_share_base's
    -- berlin_total_poi_count: partition by area_vintage as well as
    -- weight_variant so lor_pre2021/lor_2021 and standard/gaussian_* stocks
    -- are never summed together across an incompatible boundary).
    with_bases as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            -- t_a: this row's own leaf stock (already the finest grain).
            stock as type_stock_local,
            -- t_city: Σ_a t_a for this exact (domain, category, type) triple.
            sum(stock) over (
                partition by
                    city_code,
                    snapshot_year,
                    area_vintage,
                    weight_variant,
                    poi_domain_h,
                    poi_category_h,
                    poi_type_h
            ) as type_stock_city,
            -- c_a: category total within this PLR (sum over types in this
            -- category).
            sum(stock) over (
                partition by
                    city_code,
                    snapshot_year,
                    area_code,
                    area_vintage,
                    weight_variant,
                    poi_domain_h,
                    poi_category_h
            ) as category_stock_local,
            -- c_city: Σ_a c_a city-wide.
            sum(stock) over (
                partition by
                    city_code,
                    snapshot_year,
                    area_vintage,
                    weight_variant,
                    poi_domain_h,
                    poi_category_h
            ) as category_stock_city,
            -- D_a = X_a: domain total within this PLR (sum over
            -- categories/types in this domain). Shared parent base for BOTH
            -- category-level and type-level OA (ADR-0017 D1 -- neither nests
            -- under category).
            sum(stock) over (
                partition by
                    city_code,
                    snapshot_year,
                    area_code,
                    area_vintage,
                    weight_variant,
                    poi_domain_h
            ) as domain_stock_local,
            -- D_city = X_city: Σ_a D_a city-wide.
            sum(stock) over (
                partition by
                    city_code, snapshot_year, area_vintage, weight_variant, poi_domain_h
            ) as domain_stock_city,
            -- Σ_d d_a: all-domains grand total within this PLR (domain-level
            -- parent base).
            sum(stock) over (
                partition by
                    city_code, snapshot_year, area_code, area_vintage, weight_variant
            ) as all_domains_stock_local,
            -- Σ_d d_city: all-domains grand total city-wide.
            sum(stock) over (
                partition by city_code, snapshot_year, area_vintage, weight_variant
            ) as all_domains_stock_city
        from combined_base
    )

select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    poi_domain_h,
    poi_category_h,
    poi_type_h,
    weight_variant,
    -- ADR-0017 D4: this ticket builds faithful Run 1 only (all types, no
    -- curation); 'improved' rows are appended by OA-B.1..B.4 (#170-173) --
    -- never blended into this run (ADR-0017 D3).
    'faithful' as methodology_variant,

    -- Raw stocks, exposed for transparency, auditability, and the C-1
    -- invariance test (test_c1_oa_weighted_mass_conservation_invariance.sql
    -- compares *_city columns across weight_variant = 'standard' vs
    -- 'gaussian_%').
    type_stock_local,
    type_stock_city,
    category_stock_local,
    category_stock_city,
    domain_stock_local,
    domain_stock_city,
    all_domains_stock_local,
    all_domains_stock_city,

    -- domain X: OA(X, a) = (X_a / Σ_d d_a) / (X_city / Σ_d d_city)
    -- 71_oa.sql: (d_<domain>_stock / Σd) * oa_helper_total_d_<domain>_stock,
    -- where oa_helper = Σd_city / d_<domain>_city -- algebraically identical
    -- to this ratio-of-shares form (thesis §70/71; spatial-methods.md §11.1).
    (domain_stock_local / nullif(all_domains_stock_local, 0))
    / nullif(domain_stock_city / nullif(all_domains_stock_city, 0), 0) as oa_domain,

    -- category c ⊂ domain D: OA(c, a) = (c_a / D_a) / (c_city / D_city)
    -- 71_oa.sql, e.g. (c_cafe_stock / d_gastronomie_stock) *
    -- oa_helper_gastro_c_cafe_stock, oa_helper = d_gastronomie_city /
    -- c_cafe_city.
    (category_stock_local / nullif(domain_stock_local, 0))
    / nullif(category_stock_city / nullif(domain_stock_city, 0), 0) as oa_category,

    -- type t ⊂ domain D (NOT category -- ADR-0017 D1): OA(t, a) =
    -- (t_a / D_a) / (t_city / D_city). 71_oa.sql, e.g.
    -- (t_restaurant_italiener_stock / d_gastronomie_stock) *
    -- oa_helper_gastro_t_restaurant_italiener_stock, oa_helper =
    -- d_gastronomie_city / t_restaurant_italiener_city.
    (type_stock_local / nullif(domain_stock_local, 0))
    / nullif(type_stock_city / nullif(domain_stock_city, 0), 0) as oa_type

from with_bases
