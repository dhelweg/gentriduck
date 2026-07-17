-- mart_poi_dominance.sql
-- OA-D6 (#240, ADR-0024): serving mart for OA-D4's within-group
-- offering-dominance model (int_poi_within_group_dominance), so the site/
-- analysis layer can query HHI/top-share/entropy/evenness -- the same
-- "Evidence only bundles gentriduck_marts.*" reason #208 split
-- mart_poi_offering_advantage out for the OA mart. Not itself
-- methodology-bearing beyond what int_poi_within_group_dominance already
-- computes and OA-D0/OA-D4 already signed off -- pure pass-through. Not on
-- the R-C1 gated-file list (D6 is the "mostly plumbing" slice of the #240
-- spine, no MB tag).
--
-- =============================================================================
-- Ethics gate re-affirmed at the publication boundary (OA-D0 domain sign-off
-- Condition B, BLOCKING -- carried through unchanged, not re-derived)
-- =============================================================================
-- This mart does NOT filter is_public_safe -- OA-D4's own forward-binding
-- condition (docs/methodology/OA-D4-domain-signoff.md) is explicit that
-- "whichever ticket first wires this mart into a public surface... MUST
-- re-verify is_public_safe = true is actually applied as a filter at the
-- POINT OF PUBLICATION, not just present as a column". D6 builds the mart
-- (plumbing); it does not wire a public page (that is a future site
-- ticket) -- so is_public_safe is passed through as a plain, unfiltered
-- column here, same as every upstream min-base/flag column in this cluster.
-- Any future consumer publishing a dominance figure MUST filter
-- is_public_safe = true first (this discharges nothing on its own).
--
-- Grain: one row per (city_code, snapshot_year, area_code, area_vintage,
-- weight_variant, dominance_group) -- identical to
-- int_poi_within_group_dominance's own grain (OA-D4). PLR-only (OA-D4 was
-- not built against the OA-D2 area_level roll-up -- a future ticket, not
-- requested by the #240 spine).
--
-- Graceful degradation: returns zero rows when
-- int_poi_within_group_dominance has no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_within_group_dominance') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    weight_variant,
    dominance_group,
    is_public_safe,
    group_stock_local,
    n_children,
    hhi,
    top_share,
    entropy,
    evenness,
    top_child,
    top_child_level,
    top_child_offering_tier,
    top_child_offering_weight,
    is_thin_base
from {{ ref("int_poi_within_group_dominance") }}
