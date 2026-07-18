-- mart_poi_oa_arealevel.sql
-- OA-D6 (#240, ADR-0024): serving mart for OA-D2's area_level roll-up
-- (int_poi_offering_advantage_arealevel), so the site/analysis layer can
-- query nested-LQ Offering Advantage at plr/bzr/pgr/bezirk (Berlin) and
-- subarea_l2/subarea_l1/district (Hamburg, OA-D8) grain -- the same
-- "Evidence only bundles gentriduck_marts.*" reason #208 split
-- mart_poi_offering_advantage out of the intermediate layer for the PLR-only
-- OA mart. Not itself methodology-bearing beyond what int_poi_offering_-
-- advantage_arealevel already computes and OA-D0/OA-D2 already
-- signed off -- pure pass-through, plus two derived disclosure columns
-- (see below). Not on the R-C1 gated-file list for D6's own plumbing scope,
-- but OA-D8's generalization of the headline-scale CASE below to a
-- per-level seed lookup IS methodology-bearing (it operationalizes the
-- Hamburg headline-scale call, OA-D1b domain sign-off forward condition 1).
--
-- =============================================================================
-- MAUP-fragility disclosure (OA-D5 #240 forward-binding condition, BLOCKING)
-- =============================================================================
-- OA-D5's cross-mode comparison study (docs/methodology/OA-D5-mode-comparison-
-- findings.md) found nested_lq's PLR-vs-BZR rank correlation is MAUP-fragile
-- (pooled rho=0.662, below the spatial-methods.md §7 r>0.7 threshold, every
-- year 2009-2026 fails) and its geo sign-off imposed a BINDING condition:
-- "any future public PLR-vs-BZR display of nested_lq MUST carry the §7
-- MAUP-fragility disclosure prominently". This mart discharges that at the
-- data layer (not just prose) via `maup_caveat_required`, TRUE for every row
-- coarser than the city's OWN OA leaf level (dim_city.oa_leaf_area_level --
-- OA-D8 generalized this from the Berlin-only literal `area_level != 'plr'`
-- so the SAME disclosure fires for Hamburg's subarea_l1/district rows
-- relative to its own subarea_l2 leaf, not just Berlin's bzr/pgr/bezirk
-- relative to plr) so a consumer can filter/badge without re-deriving the
-- condition from a doc. The MAUP r>0.7 gate itself has only been EMPIRICALLY
-- run against Berlin (OA-D5's PLR-vs-BZR study) -- this flag is a
-- conservative disclosure default for Hamburg (any coarser-than-leaf row
-- gets the caveat) pending a Hamburg-specific re-run of the same rank-
-- correlation check (D5/D7 follow-on, not re-derived here); it is NOT a
-- claim that Hamburg's own MAUP fragility has been measured yet.
--
-- =============================================================================
-- Ecological-fallacy / headline-scale framing (OA-D0 domain sign-off
-- Condition D, OA-D1b domain sign-off forward condition 1, BLOCKING)
-- =============================================================================
-- `area_level_publish_tier` surfaces the recommended public display tier as
-- DATA (seed_dim_area_level.publish_tier) so a consumer does not have to
-- re-derive or hard-code it. OA-D8 (#240) generalized this column from a
-- Berlin-only `CASE area_level WHEN 'plr'...WHEN 'bzr'...` literal to a
-- lookup against seed_dim_area_level -- the per-level config point ADR-0005
-- calls for -- and, per the OA-D1b domain sign-off's binding forward
-- condition 1, the Hamburg tiers below are argued INDEPENDENTLY on
-- Hamburg's own resolution-vs-stability/ecological-fallacy terms, not
-- copy-pasted from Berlin's BZR default:
--
-- Berlin (unchanged from OA-D0/D2, maintainer-confirmed D0 scope knob #4):
-- 'primary' (plr, ~447 areas) -- the succession-front leaf, but D-3-unstable/
-- highest misuse risk. 'headline' (bzr, ~138 areas) -- the recommended
-- public default: stabler, less identifying. 'context_only' (pgr ~58, bezirk
-- 12) -- pgr has no dissolved geometry (grouped with bezirk pending a future
-- geometry ticket); bezirk pools ~30-40 PLRs of very different character
-- (ecological-fallacy caveat).
--
-- Hamburg (OA-D8, #240, this ticket -- argued from Hamburg's OWN hierarchy
-- shape, dim_area_hierarchy.sql's empirically-confirmed area counts: 943
-- subarea_l2 Gebiete, 104 subarea_l1 Stadtteile, 7 district Bezirke):
-- 'primary' (subarea_l2, ~943 Gebiete) -- Hamburg's OA leaf level. Hamburg's
-- leaf is proportionally FINER than Berlin's PLR relative to city
-- population (Hamburg ~1.9M residents / 943 Gebiete vs Berlin ~3.7M / 447
-- PLRs -- approximate, order-of-magnitude, Statistikamt Nord / Amt für
-- Statistik Berlin-Brandenburg public releases -- roughly ~2,000
-- residents/Gebiet vs ~8,300/PLR), so its D-3 low-base instability risk is
-- AT LEAST as severe as PLR's, likely more so -- it is emphatically not a
-- safer default than Berlin's PLR, reinforcing 'primary' (leaf-only,
-- succession-front use), never 'headline'.
-- 'headline' (subarea_l1, ~104 Stadtteile) -- Hamburg's recommended public
-- default, chosen on Hamburg's own terms: (a) SCALE comparability --
-- ~104 areas across ~1.9M residents (~18,000/Stadtteil) sits in the same
-- resolution band as Berlin's BZR (~138 areas / ~3.7M, ~27,000/BZR) --
-- both are the "named, publicly legible neighborhood-cluster" tier of their
-- respective hierarchies, not a coincidence of matching ORDINAL position
-- (both happen to be their city's middle rung) but a genuine population-
-- per-unit correspondence; (b) STABILITY -- rolling ~9 Gebiete on average
-- into each Stadtteil (943/104) damps the same small-base noise BZR damps
-- for PLR (447/138 ≈ 3-4 PLRs/BZR -- Hamburg's roll-up factor is actually
-- LARGER, so at least as stabilizing); (c) LEGIBILITY -- Stadtteile are
-- Hamburg's own well-known, named administrative/cultural units (the
-- Hamburg analogue of a Berlin Kiez/Bezirksregion in public recognition),
-- not an artifact of this pipeline. This is NOT "BZR is headline in Berlin,
-- therefore the analogous rung is headline in Hamburg" (the exact reasoning
-- OA-D1b's forward condition 1 forbids) -- it is an independent argument
-- that happens to land on the structurally analogous rung because Hamburg's
-- population-per-unit ratios independently support it.
-- 'context_only' (district, 7 Bezirke) -- EVEN MORE aggregated relative to
-- its own city than Berlin's Bezirk: a Hamburg Bezirk pools ~135 Gebiete
-- on average (943/7) vs a Berlin Bezirk's ~37 PLRs (447/12) -- the
-- ecological-fallacy caveat (a borough figure says nothing about any
-- Stadtteil/Gebiet within it) applies AT LEAST as strongly here as for
-- Berlin's Bezirk.
--
-- This Hamburg tiering is a data-engineer-proposed default grounded in the
-- repo's own confirmed area counts (R-C2) -- per CLAUDE.md's methodology
-- gate, it is subject to re-confirmation (not self-certified) by
-- geo-data-scientist + gentrification-domain-expert dual sign-off before
-- integration into `develop` (this ticket, OA-D8, is itself
-- methodology-bearing).
--
-- Bezirk geometry: dim_area_geometry.sql carries the Berlin Bezirk
-- dissolved-geometry rows (ST_Union of child PLR polygons per bezirk_code)
-- AND Hamburg's district/subarea_l1/subarea_l2 WFS geometry natively (no
-- dissolve needed -- Hamburg's levels already have their own WFS polygons);
-- this mart carries the numeric side only (join dim_area_geometry on
-- (city_code, area_level, area_code, area_vintage) at the consumer, same
-- pattern mart_poi_offering_advantage_map's siblings already use).
--
-- Grain: one row per (city_code, snapshot_year, area_level, area_code,
-- area_vintage, poi_domain_h, poi_category_h, poi_type_h, weight_variant,
-- methodology_variant) -- identical to int_poi_offering_advantage_arealevel's
-- own grain (OA-D2).
--
-- Graceful degradation: returns zero rows when
-- int_poi_offering_advantage_arealevel has no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_offering_advantage_arealevel') }}
-- depends_on: {{ ref('dim_city') }}
-- depends_on: {{ ref('seed_dim_area_level') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

select
    arealevel.city_code,
    arealevel.snapshot_year,
    arealevel.area_level,
    arealevel.area_code,
    arealevel.area_vintage,
    arealevel.poi_domain_h,
    arealevel.poi_category_h,
    arealevel.poi_type_h,
    arealevel.weight_variant,
    arealevel.methodology_variant,
    arealevel.oa_domain,
    arealevel.oa_category,
    arealevel.oa_type,
    arealevel.oa_domain_min_base_flag,
    arealevel.oa_category_min_base_flag,
    arealevel.oa_type_min_base_flag,
    -- OA-D5 forward-binding condition, generalized (OA-D8): TRUE for every
    -- row coarser than THIS CITY's own OA leaf level (dim_city.
    -- oa_leaf_area_level), not a literal `!= 'plr'` (see header).
    arealevel.area_level != city.oa_leaf_area_level as maup_caveat_required,
    -- OA-D0 domain sign-off Condition D / OA-D1b forward condition 1,
    -- generalized (OA-D8): looked up per level from seed_dim_area_level
    -- instead of a Berlin-only CASE literal (see header for the Hamburg
    -- reasoning).
    lvl.publish_tier as area_level_publish_tier
from {{ ref("int_poi_offering_advantage_arealevel") }} as arealevel
left join {{ ref("dim_city") }} as city on arealevel.city_code = city.city_code
left join
    {{ ref("seed_dim_area_level") }} as lvl on arealevel.area_level = lvl.level_code
