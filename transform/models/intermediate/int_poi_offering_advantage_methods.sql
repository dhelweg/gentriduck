-- int_poi_offering_advantage_methods.sql
-- OA-D3 (#240, ADR-0024): calculation-method columns for Offering Advantage --
-- CORE slice of the D3 "everything" method set (D0 knob 1) -- global-LQ,
-- log-LQ, share-diff, shrunk-LQ (empirical-Bayes), raw within-group share --
-- alongside the existing faithful nested-LQ. OA-D3b (#280) added the
-- z-score/binomial-SLQ method (see note 7 below) as a second slice, since it
-- too is a pure function of already-computed stock columns. The three
-- remaining PROMOTED modes named in the maintainer's maximal-breadth knob
-- (Getis-Ord, density, per-capita) are DELIBERATELY DEFERRED to a follow-on
-- slice: they each need an external join/tool this model does not introduce
-- (EWR population for per-capita, ST_Area geometry for density, a
-- Queen-contiguity spatial-weights matrix for Getis-Ord) and OA-D0 geo
-- sign-off Condition C9 explicitly flags Getis-Ord's `esda`/W-matrix
-- promotion as possibly straining the "no new tool, pure DuckDB" ADR-0024
-- claim -- "route to the system-architect to confirm before D3/D6", and is
-- additionally gated on ADR-0025 (Getis-Ord/esda mart-handoff), Status:
-- Proposed, awaiting maintainer accept/reject -- see #280 issue body for the
-- split rationale.
--
-- =============================================================================
-- Grounding (R-C2): OA-D0 geo-DS sign-off (docs/methodology/OA-D0-geo-signoff.md)
-- C1 (LQ-last), C2 (stock-first/broadcast-once), C7 (never-blend, typed
-- columns, oa_method accepted_values); OA-D0 domain sign-off
-- (docs/methodology/OA-D0-domain-signoff.md); ADR-0024 method vocabulary;
-- spatial-methods.md §11.1 (LQ construct); Isard (1960) and Miller, Gibson &
-- Wright (1991) for the base LQ; Efron & Morris (1975), "Data Analysis Using
-- Stein's Estimator and its Generalizations", JASA, for empirical-Bayes
-- shrinkage; Agresti (2013), "Categorical Data Analysis" 3rd ed., §3.3, for
-- additive/Laplace smoothing of small-count proportions (the shrunk-LQ prior
-- weight k below); Isserman (1977), "The Location Quotient Approach to
-- Estimating Regional Economic Impacts", JAIP, for the binomial-significance
-- framing of an LQ (z-score/binomial-SLQ, note 7 below); the normal
-- approximation to the binomial (Wilson 1927) for the variance term.
-- =============================================================================
--
-- Method definitions (seven methods x three taxonomy levels = 21 value
-- columns). Every method reuses the SAME local/city stock pair
-- int_poi_offering_advantage already computes for a given taxonomy level --
-- (domain_stock_local, all_domains_stock_local) for domain; (category_stock_
-- local, domain_stock_local) for category; (type_stock_local, domain_stock_
-- local) for type -- so no new stock is derived here, only new FUNCTIONS of
-- the existing local-share vs. city-share pair (LQ-last is inherited
-- unchanged; C1/C2 are therefore satisfied by construction, not re-proven).
--
-- 1. nested_lq (existing, pass-through) -- OA(level,a) = local_share /
-- city_share, parent-relative (category/type divide by their DOMAIN
-- total, never the grand total -- ADR-0017 D1). The sole
-- golden-anchored method (Epic B directional anchor,
-- reference/goldens/20180909_result_full_plr.csv) -- OA-D0 geo sign-off
-- call-out 3.
-- 2. global_lq -- same ratio-of-shares FORM, but every level's local/city
-- share is taken against the ALL-DOMAINS grand total instead of the
-- parent-relative domain total (a CITY-relative, not PARENT-relative,
-- question -- #240 issue body: "a parent-relative LQ...a city-relative
-- LQ...answer different questions"). For domain itself, global_lq is
-- ALGEBRAICALLY IDENTICAL to nested_lq (a domain's own parent already IS
-- the all-domains grand total) -- documented here, not a bug, so a
-- reader does not mistake oa_domain_global_lq == oa_domain_nested_lq for
-- a copy-paste error; category/type diverge from their nested
-- counterpart because their global denominator no longer passes through
-- the domain.
-- 3. log_lq -- ln(nested_lq). A LOG-CENTRED (around 0, not 1) transform of
-- the SAME ratio -- makes over/under-representation symmetric (a 2x
-- over-representation and a 2x under-representation are now equidistant
-- from 0, unlike the raw ratio's 2.0 vs 0.5), a standard LQ-family
-- transform (Isard 1960 ch. 5 notes the ratio's right-skew). NULL where
-- nested_lq <= 0 (never observed here since both stocks are
-- non-negative counts, but guarded for a zero-stock edge case).
-- 4. share_diff -- local_share MINUS city_share (a percentage-POINT
-- difference, not a ratio) at the same parent-relative bases as
-- nested_lq. A different UNIT (pp, not a unitless ratio) answering "how
-- many more/fewer POIs of this type per 100 local POIs than the city
-- average" -- deliberately NOT comparable/summable with the ratio-family
-- methods (C7 never-blend).
-- 5. shrunk_lq -- an empirical-Bayes / Laplace-smoothed nested-LQ: the local
-- share is shrunk toward the city share by adding k pseudo-observations
-- distributed at the city rate BEFORE forming the ratio (shrunk_share =
-- (local_stock + k*city_share) / (local_base + k); shrunk_lq =
-- shrunk_share / city_share), damping exactly the small-denominator
-- instability the existing D-3 min-base FLAG only ANNOTATES rather than
-- corrects (int_poi_offering_advantage.sql D-3 comment). k reuses the
-- already-justified `oa_min_poi_base_n` var (OA-D0 geo sign-off C4: "keep
-- the default at 10") as the pseudo-count -- not a new number, the same
-- threshold the min-base flag already uses, applied as a smoothing prior
-- instead of a suppression cutoff (Efron & Morris 1975; Agresti 2013
-- §3.3 additive smoothing). shrunk_lq -> nested_lq as local_base -> infinity
-- (the shrinkage vanishes at large sample sizes, as required).
-- 6. raw_share -- the local share ALONE (local_stock / local_base), with NO
-- city normalization at all -- a proportion in [0,1], not an
-- over/under-representation figure. OA-D0 geo sign-off C3 EXPECTS this
-- mode to FAIL the (D5-deliverable) completeness-contamination gate
-- (|rho|>=0.3) because, unlike the LQ family, it is NOT invariant to
-- uniform city-wide OSM coverage growth -- exposed here for
-- orthogonality/robustness comparison (D5), not as a temporally-safe
-- reading; any consumer must carry the C3 temporal-unsafe caveat once D5
-- lands.
-- 7. zscore_slq (OA-D3b, #280) -- the BINOMIAL-SIGNIFICANCE reading of the
-- SAME local/city share pair nested_lq already uses: under a null model
-- where the local_base draws are Bernoulli(p=city_share) i.i.d., the
-- EXPECTED local count is local_base*city_share and its variance is
-- local_base*city_share*(1-city_share) (Wilson 1927 normal approximation
-- to the binomial); z = (observed_local_count - expected_local_count) /
-- sqrt(variance) answers "IS this over/under-representation big relative
-- to what the local sample SIZE could produce by chance" (Isserman 1977) --
-- a DIFFERENT question than nested_lq's ratio-of-shares magnitude. Unlike
-- nested_lq, zscore_slq is BASE-AWARE by construction: the identical
-- ratio (say LQ=2) on a base of 5 gives a small |z| (not significant) while
-- on a base of 500 gives a large |z| (clearly significant) -- this is the
-- planning epic's "cross-area (one year) -- trustworthy" / "low-POI-base --
-- base-encoding mode" characterisation of binomial-SLQ, now folded into
-- #240/#280. z is centred at 0 (0 = local count exactly matches the
-- binomial expectation), a DIFFERENT unit from every other column here (a
-- standardized score, not a ratio/pp/proportion -- C7 never-blend). NULL
-- where variance <= 0 (city_share is exactly 0 or 1, a degenerate null
-- model, INCLUDING a float-rounding near-1/near-0 share that can otherwise
-- compute a tiny NEGATIVE variance -- guarded with greatest(variance, 0)
-- before the nullif/sqrt, so a rounding artifact NULLs the cell instead of
-- erroring the build) or local_base is 0. No new join, no new tool -- pure
-- function of the existing stock pair, so (unlike Getis-Ord/density/
-- per-capita) it does NOT need ADR-0025 or an EWR/geometry join and is not
-- blocked by either.
--
-- C7 (geo sign-off, BLOCKING, "never blend / no consensus column"): every
-- column below is a function of EXACTLY ONE method against the SAME
-- underlying stock pair -- no column here is a function of two or more
-- methods, and this model does not compute or expose any combined/averaged
-- score. mart_poi_oa_methods (the long serving view built alongside this
-- model) accepted_values-tests its `oa_method` label against
-- seed_oa_calculation_methods.csv.
--
-- Deferred (NOT built here -- see header): Getis-Ord Gi*, density,
-- per-capita (OA-D3b remainder, #280 -- Getis-Ord pending system-architect/
-- ADR-0025 ruling; density/per-capita pending their EWR population /
-- ST_Area geometry joins, a later slice).
--
-- Raw stock columns (type_stock_local etc.) are NOT re-exposed here --
-- callers needing them should join int_poi_offering_advantage on the shared
-- grain (#210 lesson: avoid duplicating already-available columns across
-- models, keep this model's payload slim).
--
-- Grain: identical to int_poi_offering_advantage (one row per taxonomy leaf
-- x weight_variant x methodology_variant) -- this model extends it with new
-- columns, it does not introduce a new grain discriminator (ADR-0024
-- "methods as columns, not a new grain").
--
-- Graceful degradation: returns zero rows when int_poi_offering_advantage has
-- no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_offering_advantage') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    base as (
        select
            city_code,
            snapshot_year,
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
            oa_domain,
            oa_category,
            oa_type
        from {{ ref("int_poi_offering_advantage") }}
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
    methodology_variant,

    -- 1. nested_lq -- pass-through of the existing, golden-anchored method.
    oa_domain as oa_domain_nested_lq,
    oa_category as oa_category_nested_lq,
    oa_type as oa_type_nested_lq,

    -- 2. global_lq -- every level against the all-domains grand total.
    -- oa_domain_global_lq is algebraically identical to oa_domain_nested_lq
    -- (see header note 2) -- kept as its own column for a uniform six-method
    -- surface, not because it differs numerically at the domain level.
    (domain_stock_local / nullif(all_domains_stock_local, 0)) / nullif(
        domain_stock_city / nullif(all_domains_stock_city, 0), 0
    ) as oa_domain_global_lq,
    (category_stock_local / nullif(all_domains_stock_local, 0)) / nullif(
        category_stock_city / nullif(all_domains_stock_city, 0), 0
    ) as oa_category_global_lq,
    (type_stock_local / nullif(all_domains_stock_local, 0)) / nullif(
        type_stock_city / nullif(all_domains_stock_city, 0), 0
    ) as oa_type_global_lq,

    -- 3. log_lq -- ln() of the nested-LQ ratio (log-centred at 0).
    ln(nullif(oa_domain, 0)) as oa_domain_log_lq,
    ln(nullif(oa_category, 0)) as oa_category_log_lq,
    ln(nullif(oa_type, 0)) as oa_type_log_lq,

    -- 4. share_diff -- local_share minus city_share, parent-relative bases
    -- (percentage-point unit, NOT a ratio -- C7 never-blend with the LQ
    -- family).
    (domain_stock_local / nullif(all_domains_stock_local, 0))
    - (domain_stock_city / nullif(all_domains_stock_city, 0)) as oa_domain_share_diff,
    (category_stock_local / nullif(domain_stock_local, 0))
    - (category_stock_city / nullif(domain_stock_city, 0)) as oa_category_share_diff,
    (type_stock_local / nullif(domain_stock_local, 0))
    - (type_stock_city / nullif(domain_stock_city, 0)) as oa_type_share_diff,

    -- 5. shrunk_lq -- empirical-Bayes/Laplace-smoothed nested-LQ, prior
    -- weight k = oa_min_poi_base_n (OA-D0 geo sign-off C4; Efron & Morris
    -- 1975; Agresti 2013 §3.3). shrunk_share = (local + k*city_share) /
    -- (local_base + k); shrunk_lq = shrunk_share / city_share.
    (
        (
            domain_stock_local
            + {{ var("oa_min_poi_base_n", 10) }}
            * (domain_stock_city / nullif(all_domains_stock_city, 0))
        )
        / nullif(all_domains_stock_local + {{ var("oa_min_poi_base_n", 10) }}, 0)
    ) / nullif(
        domain_stock_city / nullif(all_domains_stock_city, 0), 0
    ) as oa_domain_shrunk_lq,
    (
        (
            category_stock_local
            + {{ var("oa_min_poi_base_n", 10) }}
            * (category_stock_city / nullif(domain_stock_city, 0))
        )
        / nullif(domain_stock_local + {{ var("oa_min_poi_base_n", 10) }}, 0)
    ) / nullif(
        category_stock_city / nullif(domain_stock_city, 0), 0
    ) as oa_category_shrunk_lq,
    (
        (
            type_stock_local
            + {{ var("oa_min_poi_base_n", 10) }}
            * (type_stock_city / nullif(domain_stock_city, 0))
        )
        / nullif(domain_stock_local + {{ var("oa_min_poi_base_n", 10) }}, 0)
    )
    / nullif(type_stock_city / nullif(domain_stock_city, 0), 0) as oa_type_shrunk_lq,

    -- 6. raw_share -- local share alone, no city normalization (a
    -- proportion in [0,1], expected to FAIL the D5 completeness gate --
    -- header note 6 / OA-D0 geo sign-off C3).
    domain_stock_local / nullif(all_domains_stock_local, 0) as oa_domain_raw_share,
    category_stock_local / nullif(domain_stock_local, 0) as oa_category_raw_share,
    type_stock_local / nullif(domain_stock_local, 0) as oa_type_raw_share,

    -- 7. zscore_slq -- binomial-significance z-score of the SAME local/city
    -- share pair as nested_lq (header note 7; Isserman 1977; Wilson 1927
    -- normal approximation). expected = local_base * city_share; variance =
    -- local_base * city_share * (1 - city_share); z = (observed -
    -- expected) / sqrt(variance). NULL where variance <= 0 or local_base
    -- is 0 (nullif guards both).
    (
        domain_stock_local
        - all_domains_stock_local
        * (domain_stock_city / nullif(all_domains_stock_city, 0))
    ) / sqrt(
        nullif(
            greatest(
                all_domains_stock_local
                * (domain_stock_city / nullif(all_domains_stock_city, 0))
                * (1 - (domain_stock_city / nullif(all_domains_stock_city, 0))),
                0
            ),
            0
        )
    ) as oa_domain_zscore_slq,
    (
        category_stock_local
        - domain_stock_local * (category_stock_city / nullif(domain_stock_city, 0))
    ) / sqrt(
        nullif(
            greatest(
                domain_stock_local
                * (category_stock_city / nullif(domain_stock_city, 0))
                * (1 - (category_stock_city / nullif(domain_stock_city, 0))),
                0
            ),
            0
        )
    ) as oa_category_zscore_slq,
    (
        type_stock_local
        - domain_stock_local * (type_stock_city / nullif(domain_stock_city, 0))
    ) / sqrt(
        nullif(
            greatest(
                domain_stock_local
                * (type_stock_city / nullif(domain_stock_city, 0))
                * (1 - (type_stock_city / nullif(domain_stock_city, 0))),
                0
            ),
            0
        )
    ) as oa_type_zscore_slq

from base
