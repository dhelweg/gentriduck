-- mart_poi_oa_hotspots.sql
-- OA-D3c (#280, ADR-0025): Getis-Ord Gi* hotspot/coldspot mart -- the
-- analysis->mart handoff ADR-0025 authorizes for the one OA method
-- (Getis-Ord) that ADR-0024 held out because it needs a spatial-weights
-- matrix W (Queen contiguity), which is NOT a SQL operation (OA-D0 geo
-- sign-off C9). This model performs NO spatial computation itself -- it
-- joins int_poi_offering_advantage_arealevel's already-computed domain-grain
-- local stock to stg_oa_getis_ord's precomputed Gi* statistic
-- (analysis/f_oa_getis_ord.py) by the stable key ADR-0025 Decision 2
-- mandates. Not itself methodology-bearing beyond what
-- int_poi_offering_advantage_arealevel already computes and what
-- analysis/f_oa_getis_ord.py already gates (weights params, FDR
-- correction, cut-points, public-labelling guardrail all live in that
-- script -- see its module docstring, which is the R-C1-gated artifact for
-- this feature).
--
-- =============================================================================
-- Grain asymmetry (ADR-0025 Decision 3, BINDING -- state explicitly, geo C9)
-- =============================================================================
-- Every OTHER OA mart (mart_poi_oa_methods, mart_poi_oa_arealevel) is full
-- type-leaf grain across up to four area levels. THIS mart is deliberately
-- narrower on BOTH axes:
-- - Area level: PLR and BZR ONLY. NOT Bezirk (12 units -> degenerate
-- contiguity graph, meaningless neighbour structure -- OA-D0 geo
-- sign-off C9) and NOT PGR (Gi* was only validated at PLR/BZR by the
-- R-C1 gate; extending to PGR is a future ticket, not this one).
-- - Taxonomy grain: domain ONLY. NOT category/type leaf -- a sparse
-- type-leaf surface is mostly near-empty cells, so Gi* on it is noise
-- (OA-D0 geo sign-off C9). Full-grain Getis-Ord is out of scope by
-- design, not an oversight.
-- This is the SAME asymmetry ADR-0025 Decision 3 requires be stated
-- explicitly in the model/script and the serving view -- this is that
-- serving-view statement.
--
-- =============================================================================
-- Public labelling guardrail (ADR-0025 Decision 3 item 7 / OA-D0 geo
-- sign-off C9 / a6_hotspots.py's already-established convention, BINDING)
-- =============================================================================
-- `gi_star_cluster_label` carries the INTERNAL statistic's short code
-- ('hot' / 'cold' / 'ns'), identical convention to a6_hotspots.py's own
-- cluster_label. A bare "gentrification hotspot" (or even "hotspot" without
-- qualification) is PROHIBITED on any public-facing surface consuming this
-- column -- consumers (site pages, map legends) MUST apply a
-- provision/stock-calibrated hedged qualifier ("amenity-provision cluster" /
-- "concentrated-provision area"), NOT a6_hotspots.py's own hedge
-- ("amenity-change hotspot" / "social-change-pressure cluster"), which is
-- calibrated for a change/dynamism input, not this mart's single-snapshot-
-- year stock input (OA-D3c domain sign-off F1) -- plus the ecological-
-- inference disclaimer, before this column reaches a reader.
-- This mart does not relabel to the hedged phrasing itself (matching
-- mart_poi_oa_arealevel's own pattern of carrying machine-readable flags,
-- not final prose, for the consuming layer to render).
--
-- =============================================================================
-- FDR / multiple-comparison disclosure (CC1 remediation, #287, of ADR-0025
-- Decision 4, BINDING)
-- =============================================================================
-- `gi_star_p` is the RAW, uncorrected permutation p-value from a single
-- esda.G_Local call. TWO labelled BH-adjusted variants are carried:
-- - `gi_star_p_fdr` / `gi_star_fdr_significant` (PRIMARY, label source):
-- corrected PER-DOMAIN, PER-MAP -- one BH batch per (city_code,
-- area_vintage, area_level, snapshot_year, poi_domain_h). Standard ESDA
-- "one map = one family" unit (Caldas de Castro & Singer 2006). THIS is
-- the flag `gi_star_cluster_label` is derived from.
-- - `gi_star_p_fdr_pooled_alldomains` / `gi_star_fdr_significant_pooled_alldomains`
-- (SECONDARY, conservative variant, NOT the label source): the original
-- #280 design -- corrected POOLED across every PLR/BZR x domain p-value
-- tested together for one city/area_vintage/area_level/snapshot_year
-- "map", per OA-D0 geo sign-off C9's original framing ("Gi* over hundreds
-- of PLRs x domains inflates false hotspots") -- still valid and
-- safe-direction, just wider than the primary family.
-- See analysis/f_oa_getis_ord.py Note 5 for the full CC1 remediation
-- rationale (docs/methodology/OA-D3c-getis-ord-geo-signoff.md). A consumer
-- that reads `gi_star_p` directly without an FDR flag is reading the
-- uncorrected, multiple-comparison-inflated number.
--
-- =============================================================================
-- `lor_2021` zero-significant-cells disclosure (CC2, #287, BINDING for any
-- future consumer)
-- =============================================================================
-- Under the POOLED-secondary FDR variant (gi_star_fdr_significant_pooled_alldomains),
-- `lor_2021` still yields ZERO significant cells at any level -- a milder
-- recent permutation p-floor compounding with the pooled x13-domain
-- denominator, per geo sign-off CC2. Under the PRIMARY per-domain FDR
-- variant (gi_star_fdr_significant, this ticket's CC1 remediation),
-- `lor_2021` DOES surface real discoveries (108 cells at PLR, 376 at BZR),
-- confirming the original pooled-only zero was suppression-by-conservatism,
-- not an absence of amenity clustering. Any future G2 methodology page or
-- site content MUST still disclose that (a) the pooled-secondary variant
-- under-detects by design and (b) these Gi* results are NOT temporal/change
-- claims regardless of FDR variant (C3 completeness-contamination caveat
-- applies to both). Full empirical detail: analysis/f_oa_getis_ord.py
-- Note 7 / docs/methodology/OA-D3c-getis-ord-geo-signoff.md CC2.
--
-- weight_variant / methodology_variant are constants here ('standard' /
-- 'faithful') -- the analysis script deliberately restricts its input to
-- the bandwidth-free hard-count construct (same restriction
-- oa_bandwidth_sweep.py / c_offering_relevance_validation.py already apply
-- to their own canonical-figure reads), not because Gi* is undefined for
-- the gaussian_* weight variants but to avoid compounding an already-large
-- MAUP/multiple-comparison surface with a THIRD sweep axis (bandwidth) this
-- ticket does not scope. Carried through as literal columns (not filtered
-- out of the select) so a consumer never has to guess which variant this
-- mart represents.
--
-- Grain: one row per (city_code, area_vintage, area_level, area_code,
-- snapshot_year, poi_domain_h) -- ADR-0025 Decision 2's binding stable key.
--
-- Graceful degradation: returns zero rows when
-- int_poi_offering_advantage_arealevel has no plr/bzr domain-grain rows, or
-- (LEFT JOIN) all-NULL Gi* columns when analysis/f_oa_getis_ord.py has not
-- yet been run (stg_oa_getis_ord's zero-row stub) -- a fresh checkout still
-- builds green, it just carries no Gi* values until the analysis script has
-- run once (see stg_oa_getis_ord.sql header for the required build order).
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_offering_advantage_arealevel') }}
-- depends_on: {{ ref('stg_oa_getis_ord') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Domain-grain PLR/BZR local stock, deduped down from
    -- int_poi_offering_advantage_arealevel's leaf-grain rows (poi_domain_h's
    -- domain_stock_local repeats once per (poi_category_h, poi_type_h) leaf
    -- under that domain by construction -- same fan-out fact
    -- oa_bandwidth_sweep.py's load_oa_domain() documents and guards against
    -- with the identical any_value()+GROUP BY collapse).
    domain_stock as (
        select
            city_code,
            area_vintage,
            area_level,
            area_code,
            snapshot_year,
            poi_domain_h,
            weight_variant,
            methodology_variant,
            any_value(domain_stock_local) as domain_stock_local,
            any_value(oa_domain_min_base_flag) as oa_domain_min_base_flag
        from {{ ref("int_poi_offering_advantage_arealevel") }}
        where
            area_level in ('plr', 'bzr')
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code is not null
        group by
            city_code,
            area_vintage,
            area_level,
            area_code,
            snapshot_year,
            poi_domain_h,
            weight_variant,
            methodology_variant
    )

select
    stock.city_code,
    stock.area_vintage,
    stock.area_level,
    stock.area_code,
    stock.snapshot_year,
    stock.poi_domain_h,
    stock.weight_variant,
    stock.methodology_variant,
    stock.domain_stock_local,
    stock.oa_domain_min_base_flag,
    gi.gi_star_z,
    gi.gi_star_p,
    gi.gi_star_p_fdr,
    gi.gi_star_fdr_significant,
    gi.gi_star_p_fdr_pooled_alldomains,
    gi.gi_star_fdr_significant_pooled_alldomains,
    gi.gi_star_cluster_label,
    gi.gi_star_w_fallback
from domain_stock as stock
left join
    {{ ref("stg_oa_getis_ord") }} as gi
    on stock.city_code = gi.city_code
    and stock.area_vintage = gi.area_vintage
    and stock.area_level = gi.area_level
    and stock.area_code = gi.area_code
    and stock.snapshot_year = gi.snapshot_year
    and stock.poi_domain_h = gi.poi_domain_h
