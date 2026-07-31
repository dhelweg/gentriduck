-- int_poi_offering_advantage_methods.sql
-- OA-D3 (#240, ADR-0024): calculation-method columns for Offering Advantage --
-- CORE slice of the D3 "everything" method set (D0 knob 1) -- global-LQ,
-- log-LQ, share-diff, shrunk-LQ (empirical-Bayes), raw within-group share --
-- alongside the existing faithful nested-LQ. OA-D3b (#280) added the
-- z-score/binomial-SLQ method (note 7) as a second slice, and THIS slice
-- (OA-D3b remainder) adds **density** and **per-capita** (notes 8, 9) -- the
-- two remaining PROMOTED modes that need an external join this model did not
-- previously introduce (`ST_Area` geometry for density, EWR population for
-- per-capita). **Getis-Ord Gi\* remains DEFERRED**: it needs a
-- Queen-contiguity spatial-weights matrix, not a plain join, and OA-D0 geo
-- sign-off Condition C9 explicitly flags its `esda`/W-matrix promotion as
-- possibly straining the "no new tool, pure DuckDB" ADR-0024 claim -- it is
-- additionally gated on ADR-0025 (Getis-Ord/esda mart-handoff), Status:
-- Proposed, awaiting maintainer accept/reject -- see #280 issue body for the
-- full split rationale.
--
-- =============================================================================
-- Grounding (R-C2): OA-D0 geo-DS sign-off (docs/methodology/OA-D0-geo-signoff.md)
-- C1 (LQ-last), C2 (stock-first/broadcast-once), C7 (never-blend, typed
-- columns, oa_method accepted_values), C5/C8 (density: native-CRS ST_Area,
-- ecological-fallacy at coarse grain), C10 (per-capita: EWR population,
-- temporal-alignment/vintage pitfalls); OA-D0 domain sign-off
-- (docs/methodology/OA-D0-domain-signoff.md) Condition C (density/per-capita
-- answer provision/centrality, NOT offering-advantage; per-capita's
-- denominator is endogenous to displacement; never blended/legend-shared
-- with the LQ family); ADR-0024 method vocabulary; spatial-methods.md §11.1
-- (LQ construct), §7 (MAUP r>0.7 gate); Isard (1960) and Miller, Gibson &
-- Wright (1991) for the base LQ; Efron & Morris (1975), "Data Analysis Using
-- Stein's Estimator and its Generalizations", JASA, for empirical-Bayes
-- shrinkage; Agresti (2013), "Categorical Data Analysis" 3rd ed., §3.3, for
-- additive/Laplace smoothing of small-count proportions (the shrunk-LQ prior
-- weight k below); Isserman (1977), "The Location Quotient Approach to
-- Estimating Regional Economic Impacts", JAIP, for the binomial-significance
-- framing of an LQ (z-score/binomial-SLQ, note 7 below); the normal
-- approximation to the binomial (Wilson 1927) for the variance term;
-- Openshaw (1984), "The Modifiable Areal Unit Problem", for density's
-- area-dependence (note 8).
-- =============================================================================
--
-- Method definitions (seven methods x three taxonomy levels = 21 value
-- columns, PLUS density + per-capita x three taxonomy levels = 6 more = 27
-- total). Methods 1-7 reuse the SAME local/city stock pair
-- int_poi_offering_advantage already computes for a given taxonomy level --
-- (domain_stock_local, all_domains_stock_local) for domain; (category_stock_
-- local, domain_stock_local) for category; (type_stock_local, domain_stock_
-- local) for type -- so no new stock is derived here, only new FUNCTIONS of
-- the existing local-share vs. city-share pair (LQ-last is inherited
-- unchanged; C1/C2 are therefore satisfied by construction, not re-proven).
-- Methods 8-9 (density, per-capita) instead divide the SAME local stock
-- numerators (domain_stock_local/category_stock_local/type_stock_local) by
-- a NEW per-area denominator (area_km2, residents_total) joined in below --
-- they are NOT location quotients at all (no city-share divisor), a
-- different construct family entirely (OA-D0 domain sign-off Condition C).
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
-- blocked by either. TEMPORAL-UNSAFE: seed_oa_calculation_methods.csv flags
-- zscore_slq expected_temporal_safe=false -- unlike nested_lq's ratio, z's
-- EXPECTED count/variance scale with local_base*city_share, so a uniform
-- OSM-completeness multiplier on local_base does not cancel out of z the way
-- it cancels out of a same-year LQ ratio (int_poi_offering_advantage.sql's
-- same-year-ratio invariance argument, docs/epic-h/312-oa-c5-geo-spike.md §2,
-- does not apply here); exposed for orthogonality/robustness comparison (D5),
-- not as a temporally-safe reading; any consumer must carry this caveat,
-- matching notes 6/8/9.
-- 8. density (OA-D3b remainder, #280) -- local stock (domain_stock_local /
-- category_stock_local / type_stock_local) divided by the area's own
-- geometric size (`area_km2`, ST_Area in native metric CRS -- EPSG:25833
-- Berlin / EPSG:25832 Hamburg -- BEFORE any WGS84 reprojection, exactly
-- mirroring mart_poi_offering_advantage.sql's existing area_km2 CTE, which
-- itself already implements OA-D0 geo sign-off C5/C8's "ST_Area in native
-- CRS, never in degrees" rule). Answers "how many POIs of this type per
-- km2 in this area" -- an ABSOLUTE provision/concentration reading with NO
-- city-share divisor at all, NOT a location quotient (OA-D0 domain
-- sign-off Condition C: density/per-capita answer provision/centrality
-- questions, not offering-advantage -- never blended/legend-shared with
-- the LQ family). Scope: PLR grain ONLY (this model is not area_level-
-- rolled -- see int_poi_offering_advantage_arealevel.sql for that axis),
-- which keeps this slice OUT of OA-D0 geo sign-off C5's flagged fragile
-- corner ("density at full type grain across all levels... PGR/Bezirk
-- density is an ecological-fallacy magnet") -- rolling density up to
-- coarser area_levels (with the required ecological-fallacy disclaimer)
-- is deliberately left to a follow-on ticket, not built here. NULL where
-- area_km2 is unavailable (no geometry join match) or zero. TEMPORAL-UNSAFE
-- (#280 F1 fix): area_km2 is a time-invariant denominator, so density is
-- directly proportional to the raw local_stock numerator and inherits the
-- SAME OSM completeness-growth contamination raw_share does (note 6 above)
-- -- OA-D0 geo sign-off C3 expects density to FAIL the completeness-
-- contamination gate, and OA-D0 domain sign-off Condition C.2 bars
-- time-differencing it without a D6 PASS; seed_oa_calculation_methods.csv's
-- density row therefore carries expected_temporal_safe=false, matching
-- raw_share and percapita. Exposed here for orthogonality/robustness
-- comparison (D5), not as a temporally-safe reading; any consumer must
-- carry this caveat.
-- 9. percapita (OA-D3b remainder, #280) -- local stock divided by the
-- area's EWR resident population (`residents_total`, per 1,000 residents),
-- joined on an EXACT (city_code, area_code, area_vintage, reference_year =
-- snapshot_year) match -- OA-D0 geo sign-off C10 explicitly bars
-- extrapolating population to fill POI years ("join on nearest-available
-- EWR year... where no EWR year is within tolerance, per-capita is NULL,
-- not imputed"); this model takes the stricter EXACT-year reading (no
-- nearest-year fallback), so per-capita is populated only for the subset
-- of snapshot_years that have a literal EWR reference_year match, NULL
-- elsewhere -- sparse by construction, same convention already used for
-- int_berlin_rent_pressure_proxy's Wohnlage-year alignment. Population
-- from int_ewr_socioeco (Berlin, lor_2021 vintage only per C10's vintage
-- pitfall -- pre2021-vintage rows are therefore always NULL here, by
-- design, not a bug) and int_ewr_socioeco_hamburg (Hamburg, current
-- vintage). Answers "how many POIs of this type per 1,000 residents" --
-- like density, an ABSOLUTE provision reading, NOT a location quotient.
-- OA-D0 domain sign-off Condition C flags the population denominator as
-- ENDOGENOUS TO DISPLACEMENT (a gentrifying area's population itself
-- shifts) -- this caveat MUST travel with any downstream consumer/mart/
-- page exposing this column, never presented as a clean "demand" measure.
--
-- C7 (geo sign-off, BLOCKING, "never blend / no consensus column"): every
-- column below is a function of EXACTLY ONE method against the SAME
-- underlying stock pair (or, for density/per-capita, the same stock
-- numerator against one new denominator) -- no column here is a function of
-- two or more methods, and this model does not compute or expose any
-- combined/averaged score. mart_poi_oa_methods (the long serving view built
-- alongside this model) accepted_values-tests its `oa_method` label against
-- seed_oa_calculation_methods.csv.
--
-- Deferred (NOT built here -- see header): Getis-Ord Gi* (#280 remainder,
-- pending system-architect/ADR-0025 ruling); area_level-rolled density
-- (follow-on, PLR-only in this slice per C5).
--
-- Raw stock columns (type_stock_local etc.) are NOT re-exposed here --
-- callers needing them should join int_poi_offering_advantage on the shared
-- grain (#210 lesson: avoid duplicating already-available columns across
-- models, keep this model's payload slim).
--
-- Grain: identical to int_poi_offering_advantage (one row per taxonomy leaf
-- x weight_variant x methodology_variant) -- this model extends it with new
-- columns, it does not introduce a new grain discriminator (ADR-0024
-- "methods as columns, not a new grain"). density/per-capita's area_km2 and
-- residents_total denominators are joined on (city_code, area_code,
-- area_vintage[, snapshot_year for population]) -- coarser than the model's
-- own grain -- so they broadcast identically across every taxonomy leaf /
-- weight_variant / methodology_variant row for a given area, same
-- broadcast-once discipline as the *_stock_city columns (C2).
--
-- Hamburg C5 re-fit (#312, docs/epic-h/312-oa-c5-geo-spike.md): the OA-D0 geo
-- sign-off Condition C3 completeness-contamination gate (deliverable 4 of
-- analysis/d_oa_mode_comparison.py, previously run Berlin-only --
-- docs/methodology/OA-D5-mode-comparison-findings.md Sec 4) was extended to
-- Hamburg for the first time under #312. Result: all nine registered methods
-- (seed_oa_calculation_methods.csv) pass for Hamburg, including raw_share,
-- zscore_slq, density, and percapita -- the FOUR methods this file's notes
-- 6/7/8/9 above document as expected_temporal_safe=false -- mirroring the
-- same "prediction contradicted, gate empirically passes at the citywide
-- level" surprise already documented for Berlin. This does NOT relax any of
-- notes 6/7/8/9's standing caveats for either city: the citywide gate remains
-- supportive evidence only, not itself an authorization for a live per-cell
-- YoY delta absent the still-unbuilt per-cell completeness flag the OA-D7
-- page's own carried-forward condition requires (unchanged). No change to
-- this model's methods/formulas was made or required; the existing
-- mart-level accepted_values=['BER','HH'] is retroactively validated, not
-- newly authorized, by this re-fit. See the spike doc for the full
-- per-method rho table (Hamburg vs re-verified Berlin) and for why
-- percapita's Hamburg result is additionally determinate where Berlin's own
-- run is indeterminate (Hamburg's EWR reference_year coverage is broader,
-- a data-availability difference, not a methodological one).
--
-- Graceful degradation: returns zero rows when int_poi_offering_advantage has
-- no rows; density/per-capita are individually NULL (not a build failure)
-- when their respective join has no match.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_offering_advantage') }}
-- depends_on: {{ ref('stg_berlin_lor') }}
-- depends_on: {{ ref('stg_hamburg_geo') }}
-- depends_on: {{ ref('int_ewr_socioeco') }}
-- depends_on: {{ ref('int_ewr_socioeco_hamburg') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    base as (
        select
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
            oa_type,
            -- QA-4 (#179) legacy-lowercase normalisation, same mechanical fix
            -- mart_poi_offering_advantage.sql already applies at this exact
            -- boundary -- int_poi_offering_advantage's gaussian_* rows still
            -- carry lowercase 'berlin' (inherited from int_osm_poi_plr_weighted,
            -- predating ADR-0005 canonicalization). #281: this single
            -- canonicalized value now serves BOTH as the join key for the
            -- area_km2/population CTEs below AND as the model's output
            -- city_code column (final select at the bottom of this file) --
            -- OA-D3/D3b's original scope-limiting decision (canonicalize only
            -- the internal join key, leave the output untouched) let
            -- non-canonical lowercase 'berlin' rows leak into
            -- mart_poi_oa_methods; #281 closes that gap the same way
            -- mart_poi_offering_advantage.sql already does at its own output
            -- boundary.
            {{ canonical_city_code("city_code") }} as join_city_code
        from {{ ref("int_poi_offering_advantage") }}
    ),

    -- 8. density denominator -- area size per (city_code, area_code,
    -- area_vintage), native-CRS m^2 / 1e6, PLR/subarea_l2 grain only (see
    -- note 8 above). Identical pattern to mart_poi_offering_advantage.sql's
    -- own area_km2 CTE (OA-D0 geo sign-off C5/C8: ST_Area in native metric
    -- CRS, before WGS84 reprojection).
    berlin_area_km2 as (
        select
            lor.city_code,
            lor.area_code,
            lor.area_vintage,
            st_area(st_geomfromwkb(lor.geometry_wkb)) / 1e6 as area_km2
        from {{ ref("stg_berlin_lor") }} as lor
        where lor.area_code is not null
    ),

    hamburg_area_km2 as (
        select
            geo.city_code,
            geo.area_code,
            geo.area_vintage,
            st_area(st_geomfromwkb(geo.geometry_wkb)) / 1e6 as area_km2
        from {{ ref("stg_hamburg_geo") }} as geo
        where geo.area_code is not null and geo.area_level = 'subarea_l2'
    ),

    area_km2 as (
        select *
        from berlin_area_km2
        union all
        select *
        from hamburg_area_km2
    ),

    -- 9. per-capita denominator -- EWR resident population per (city_code,
    -- area_code, area_vintage, reference_year), unioned across both cities'
    -- already-computed EWR socio-economic models (see note 9 above; OA-D0
    -- geo sign-off C10). Berlin's int_ewr_socioeco already restricts itself
    -- to area_vintage='lor_2021' (its own header); Hamburg's
    -- int_ewr_socioeco_hamburg is area_vintage='current' throughout.
    ewr_population as (
        select city_code, area_code, area_vintage, reference_year, residents_total
        from {{ ref("int_ewr_socioeco") }}
        union all
        select city_code, area_code, area_vintage, reference_year, residents_total
        from {{ ref("int_ewr_socioeco_hamburg") }}
    )

select
    -- #281: canonicalized in the base CTE above (join_city_code) and reused
    -- here as the output city_code -- see base CTE comment.
    base.join_city_code as city_code,
    base.snapshot_year,
    base.area_code,
    base.area_vintage,
    base.poi_domain_h,
    base.poi_category_h,
    base.poi_type_h,
    base.weight_variant,
    base.methodology_variant,

    -- 1. nested_lq -- pass-through of the existing, golden-anchored method.
    base.oa_domain as oa_domain_nested_lq,
    base.oa_category as oa_category_nested_lq,
    base.oa_type as oa_type_nested_lq,

    -- 2. global_lq -- every level against the all-domains grand total.
    -- oa_domain_global_lq is algebraically identical to oa_domain_nested_lq
    -- (see header note 2) -- kept as its own column for a uniform six-method
    -- surface, not because it differs numerically at the domain level.
    (base.domain_stock_local / nullif(base.all_domains_stock_local, 0)) / nullif(
        base.domain_stock_city / nullif(base.all_domains_stock_city, 0), 0
    ) as oa_domain_global_lq,
    (base.category_stock_local / nullif(base.all_domains_stock_local, 0)) / nullif(
        base.category_stock_city / nullif(base.all_domains_stock_city, 0), 0
    ) as oa_category_global_lq,
    (base.type_stock_local / nullif(base.all_domains_stock_local, 0)) / nullif(
        base.type_stock_city / nullif(base.all_domains_stock_city, 0), 0
    ) as oa_type_global_lq,

    -- 3. log_lq -- ln() of the nested-LQ ratio (log-centred at 0).
    ln(nullif(base.oa_domain, 0)) as oa_domain_log_lq,
    ln(nullif(base.oa_category, 0)) as oa_category_log_lq,
    ln(nullif(base.oa_type, 0)) as oa_type_log_lq,

    -- 4. share_diff -- local_share minus city_share, parent-relative bases
    -- (percentage-point unit, NOT a ratio -- C7 never-blend with the LQ
    -- family).
    (base.domain_stock_local / nullif(base.all_domains_stock_local, 0)) - (
        base.domain_stock_city / nullif(base.all_domains_stock_city, 0)
    ) as oa_domain_share_diff,
    (base.category_stock_local / nullif(base.domain_stock_local, 0)) - (
        base.category_stock_city / nullif(base.domain_stock_city, 0)
    ) as oa_category_share_diff,
    (base.type_stock_local / nullif(base.domain_stock_local, 0))
    - (base.type_stock_city / nullif(base.domain_stock_city, 0)) as oa_type_share_diff,

    -- 5. shrunk_lq -- empirical-Bayes/Laplace-smoothed nested-LQ, prior
    -- weight k = oa_min_poi_base_n (OA-D0 geo sign-off C4; Efron & Morris
    -- 1975; Agresti 2013 §3.3). shrunk_share = (local + k*city_share) /
    -- (local_base + k); shrunk_lq = shrunk_share / city_share.
    (
        (
            base.domain_stock_local
            + {{ var("oa_min_poi_base_n", 10) }}
            * (base.domain_stock_city / nullif(base.all_domains_stock_city, 0))
        )
        / nullif(base.all_domains_stock_local + {{ var("oa_min_poi_base_n", 10) }}, 0)
    ) / nullif(
        base.domain_stock_city / nullif(base.all_domains_stock_city, 0), 0
    ) as oa_domain_shrunk_lq,
    (
        (
            base.category_stock_local
            + {{ var("oa_min_poi_base_n", 10) }}
            * (base.category_stock_city / nullif(base.domain_stock_city, 0))
        )
        / nullif(base.domain_stock_local + {{ var("oa_min_poi_base_n", 10) }}, 0)
    ) / nullif(
        base.category_stock_city / nullif(base.domain_stock_city, 0), 0
    ) as oa_category_shrunk_lq,
    (
        (
            base.type_stock_local
            + {{ var("oa_min_poi_base_n", 10) }}
            * (base.type_stock_city / nullif(base.domain_stock_city, 0))
        )
        / nullif(base.domain_stock_local + {{ var("oa_min_poi_base_n", 10) }}, 0)
    ) / nullif(
        base.type_stock_city / nullif(base.domain_stock_city, 0), 0
    ) as oa_type_shrunk_lq,

    -- 6. raw_share -- local share alone, no city normalization (a
    -- proportion in [0,1], expected to FAIL the D5 completeness gate --
    -- header note 6 / OA-D0 geo sign-off C3).
    base.domain_stock_local
    / nullif(base.all_domains_stock_local, 0) as oa_domain_raw_share,
    base.category_stock_local
    / nullif(base.domain_stock_local, 0) as oa_category_raw_share,
    base.type_stock_local / nullif(base.domain_stock_local, 0) as oa_type_raw_share,

    -- 7. zscore_slq -- binomial-significance z-score of the SAME local/city
    -- share pair as nested_lq (header note 7; Isserman 1977; Wilson 1927
    -- normal approximation). expected = local_base * city_share; variance =
    -- local_base * city_share * (1 - city_share); z = (observed -
    -- expected) / sqrt(variance). NULL where variance <= 0 or local_base
    -- is 0 (nullif guards both).
    (
        base.domain_stock_local
        - base.all_domains_stock_local
        * (base.domain_stock_city / nullif(base.all_domains_stock_city, 0))
    ) / sqrt(
        nullif(
            greatest(
                base.all_domains_stock_local
                * (base.domain_stock_city / nullif(base.all_domains_stock_city, 0))
                * (
                    1
                    - (base.domain_stock_city / nullif(base.all_domains_stock_city, 0))
                ),
                0
            ),
            0
        )
    ) as oa_domain_zscore_slq,
    (
        base.category_stock_local
        - base.domain_stock_local
        * (base.category_stock_city / nullif(base.domain_stock_city, 0))
    ) / sqrt(
        nullif(
            greatest(
                base.domain_stock_local
                * (base.category_stock_city / nullif(base.domain_stock_city, 0))
                * (1 - (base.category_stock_city / nullif(base.domain_stock_city, 0))),
                0
            ),
            0
        )
    ) as oa_category_zscore_slq,
    (
        base.type_stock_local
        - base.domain_stock_local
        * (base.type_stock_city / nullif(base.domain_stock_city, 0))
    ) / sqrt(
        nullif(
            greatest(
                base.domain_stock_local
                * (base.type_stock_city / nullif(base.domain_stock_city, 0))
                * (1 - (base.type_stock_city / nullif(base.domain_stock_city, 0))),
                0
            ),
            0
        )
    ) as oa_type_zscore_slq,

    -- 8. density (OA-D3b remainder, #280) -- local stock / area_km2, PLR
    -- grain only (header note 8). NULL where area_km2 has no join match or
    -- is zero. TEMPORAL-UNSAFE: area_km2 is time-invariant, so density is
    -- proportional to local_stock and inherits the same OSM
    -- completeness-growth bias as raw_share -- expected to FAIL the
    -- completeness-contamination gate (OA-D0 geo sign-off C3) and must not
    -- be time-differenced without a D6 PASS (OA-D0 domain sign-off
    -- Condition C.2).
    base.domain_stock_local / nullif(ak.area_km2, 0) as oa_domain_density,
    base.category_stock_local / nullif(ak.area_km2, 0) as oa_category_density,
    base.type_stock_local / nullif(ak.area_km2, 0) as oa_type_density,

    -- 9. percapita (OA-D3b remainder, #280) -- local stock per 1,000 EWR
    -- residents, EXACT snapshot_year = reference_year match only (header
    -- note 9; OA-D0 geo sign-off C10 -- no nearest-year fallback, no
    -- imputation). NULL where no exact-year EWR match exists or
    -- residents_total is zero. Domain sign-off Condition C: denominator is
    -- endogenous to displacement -- caveat travels with every downstream
    -- consumer.
    base.domain_stock_local
    / nullif(ewr.residents_total, 0)
    * 1000 as oa_domain_percapita,
    base.category_stock_local
    / nullif(ewr.residents_total, 0)
    * 1000 as oa_category_percapita,
    base.type_stock_local / nullif(ewr.residents_total, 0) * 1000 as oa_type_percapita

from base
left join
    area_km2 as ak
    on base.join_city_code = ak.city_code
    and base.area_code = ak.area_code
    and base.area_vintage = ak.area_vintage
left join
    ewr_population as ewr
    on base.join_city_code = ewr.city_code
    and base.area_code = ewr.area_code
    and base.area_vintage = ewr.area_vintage
    and base.snapshot_year = ewr.reference_year
