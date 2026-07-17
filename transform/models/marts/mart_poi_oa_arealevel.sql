-- mart_poi_oa_arealevel.sql
-- OA-D6 (#240, ADR-0024): serving mart for OA-D2's area_level roll-up
-- (int_poi_offering_advantage_arealevel), so the site/analysis layer can
-- query nested-LQ Offering Advantage at plr/bzr/pgr/bezirk grain -- the same
-- "Evidence only bundles gentriduck_marts.*" reason #208 split
-- mart_poi_offering_advantage out of the intermediate layer for the PLR-only
-- OA mart. Not itself methodology-bearing beyond what int_poi_offering_-
-- advantage_arealevel already computes and OA-D0/OA-D2 already
-- signed off -- pure pass-through, plus one NEW derived disclosure column
-- (see below). Not on the R-C1 gated-file list (D6 is explicitly the
-- "mostly plumbing" slice of the #240 spine, no MB tag).
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
-- data layer (not just prose) via `maup_caveat_required`, TRUE for every
-- 'bzr'/'pgr'/'bezirk' row (coarser than the PLR baseline the MAUP check was
-- run against) so a consumer can filter/badge without re-deriving the
-- condition from a doc. 'plr' rows are the baseline the comparison is
-- against, so the flag is FALSE there -- the caveat is about COMPARING
-- levels, not about the finest level itself.
--
-- =============================================================================
-- Ecological-fallacy / headline-scale framing (OA-D0 domain sign-off
-- Condition D + the maintainer's confirmed D0 scope knob #4, BLOCKING)
-- =============================================================================
-- The maintainer's D0 scope-knob confirmation designates BZR as the
-- recommended public headline scale for coarser-than-PLR figures, and
-- Bezirk as context-only (ecological-fallacy caveat: a Bezirk pools ~30-40
-- PLRs of very different character). `area_level_publish_tier` surfaces this
-- distinction as data so a consumer does not have to re-derive or hard-code
-- it: 'primary' (plr), 'headline' (bzr), 'context_only' (pgr, bezirk -- pgr
-- has no dissolved geometry either, see below, so it is grouped with bezirk
-- pending a future geometry ticket).
--
-- Bezirk geometry: this ticket ALSO adds the Bezirk dissolved-geometry rows
-- to dim_area_geometry.sql (ST_Union of the finest-vintage berlin_plr child
-- polygons per bezirk_code -- see that model's header) so a Bezirk
-- choropleth is reachable; this mart carries the numeric side only (join
-- dim_area_geometry on (city_code, area_level, area_code, area_vintage) at
-- the consumer, same pattern mart_poi_offering_advantage_map's siblings
-- already use for PLR/BZR/PGR).
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
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

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
    oa_domain,
    oa_category,
    oa_type,
    oa_domain_min_base_flag,
    oa_category_min_base_flag,
    oa_type_min_base_flag,
    -- OA-D5 forward-binding condition: TRUE for every roll-up level coarser
    -- than the PLR baseline the MAUP check compared against.
    area_level != 'plr' as maup_caveat_required,
    case
        area_level
        when 'plr'
        then 'primary'
        when 'bzr'
        then 'headline'
        else 'context_only'
    end as area_level_publish_tier
from {{ ref("int_poi_offering_advantage_arealevel") }}
