-- dim_area_hierarchy.sql
-- #242 (I18, geo-hierarchy pages): parent/child links for dim_area's area
-- levels, so a reader (and the web layer) can walk the geographic ladder in
-- either direction (Bezirk -> Prognoseraum -> Bezirksregion -> Planungsraum
-- for Berlin; district -> subarea_l1 -> subarea_l2 for Hamburg).
--
-- Kept as a SEPARATE model rather than a parent_area_code column on dim_area
-- (ticket's "your call" option) so dim_area's own dedup/grain logic (which
-- already collapses both LOR vintages into one row per area_code) stays
-- untouched -- this model layers parent/child derivation on top without
-- re-opening that dedup.
--
-- Grain: one row per (city_code, area_level, area_code) THAT HAS a resolvable
-- parent. Not every dim_area row necessarily appears here (see Hamburg
-- subarea_l2 note below) -- this is a set of resolved EDGES, not a full
-- re-statement of dim_area.
--
-- =============================================================================
-- Berlin: LOR code-prefix nesting (PLR ⊃ BZR ⊃ PGR ⊃ Bezirk)
-- =============================================================================
-- Grounding (R-C2): the Berlin LOR RAUMID scheme nests by construction -- an
-- 8-digit PLR code is [2-digit Bezirk][2-digit Prognoseraum][2-digit
-- Bezirksregion][2-digit Planungsraum-within-BZR], i.e. every finer-grain
-- code's leading digits literally ARE its coarser-grain parent's code. This
-- is the same derivation int_mss_bzr_aggregate.sql's "CODE HIERARCHY" comment
-- already documents and uses for its own PLR->BZR->Bezirk rollup (verified
-- there against the 2018 thesis BZR raum_ids: "all 137 thesis BZR codes are
-- found via this derivation"; see also ADR-0003 §Geographies for the PRG/BZR/
-- PLR/Bezirk level definitions). PGR/BZR code VALUES differ between the
-- pre-2021 and 2021 LOR vintages (the 2021 reform renumbered/redrew PGR and
-- BZR boundaries -- confirmed against seed_lor_crosswalk_2006_to_2021: at
-- dominant/max-weight PLR match, ~99% of PGR-prefix and 100% of BZR-prefix
-- values differ pre2021-vs-2021 for the SAME physical area), but that does
-- NOT affect this derivation: substr(child_area_code, 1, N) always reads off
-- THAT SAME CODE STRING's own vintage's parent digits, so no cross-vintage
-- crosswalk is needed for PLR->BZR->PGR derivation itself (only the Bezirk
-- (top, 2-digit) level is administratively stable across the 2021 reform --
-- see the singular test test_dim_area_hierarchy_bezirk_vintage_stable.sql,
-- which reuses the existing int_berlin_lor_crosswalk_dominant_2021 crosswalk
-- to confirm this empirically rather than asserting it un-tested).
--
-- Bezirk itself is not yet a populated dim_area row (Epic C; see
-- seed_dim_area_level.csv's "'bezirk' level is deferred" note and dim_area's
-- own accepted_values test, which already anticipates the 'bezirk' level_code
-- string without a backing seed/geometry row). PGR's parent_area_code is
-- still recorded here as a plain 2-digit code -- it is a real, well-defined
-- administrative fact even though its own dim_area row doesn't exist yet.
--
-- =============================================================================
-- Hamburg: district <- subarea_l1, sourced from the WFS (not derived)
-- =============================================================================
-- stg_hamburg_geo.parent_area_code is the Bezirk code straight from the LGV
-- WFS 'bezirk' property on the Stadtteil (subarea_l1) layer (see
-- ingest_hamburg_geo.py's WFS_LAYERS['stadtteil']['parent_prop']) -- this is
-- source-provided, not a derivation, so it is simply passed through here.
--
-- subarea_l2 (statistisches Gebiet) -> subarea_l1 (Stadtteil) is intentionally
-- NOT resolved in this model. Confirmed live 2026-07-12 (DescribeFeatureType +
-- direct WFS query against HH_WFS_Statistische_Gebiete): the Gebiet layer's
-- only properties are `statgebiet` (a bare sequential id, not a Stadtteil-
-- prefixed code) and `flaeche` -- there is no source-provided parent code, and
-- Gebiet ids do NOT nest by string prefix with Stadtteil codes (checked
-- directly against the ingested geometries). The only Gebiet->Stadtteil link
-- that exists anywhere in this warehouse is int_ewr_socioeco_hamburg_disagg's
-- name-matched crosswalk, which is itself a methodology decision scoped and
-- signed off for EWR disaggregation specifically (H1 geo-signoff), not a
-- general-purpose geographic crosswalk, and does not cover all ~943 Gebiete
-- (see that model's header for the documented coverage gaps). Minting a NEW
-- geometric (e.g. spatial-containment) crosswalk here would be a new spatial
-- method choice outside this ticket's data-engineer/reviewer scope (R-C1) --
-- flagged as an open question for geo-DS, same treatment the ticket already
-- gives the Berlin Ortsteil non-nesting case. A follow-up ticket can add this
-- edge once that method is chosen and gated.
--
-- =============================================================================
-- Berlin Ortsteil: TWO DIFFERENT mechanisms for TWO DIFFERENT relationships (#269)
-- =============================================================================
-- #269 (I-ortsteile) resolves the "Berlin Ortsteil non-nesting case" flagged
-- above, and splits it explicitly into two relationships that do NOT share a
-- mechanism:
--
-- 1. Ortsteil -> Bezirk: NESTS CLEANLY (added HERE, code-prefix derivation,
-- same pattern as the LOR PLR->BZR->PGR->Bezirk edges above). Ortsteil is a
-- legally-defined Bezirk subdivision (Berlin Bezirksverwaltungsgesetz Sec.2)
-- -- unlike the LOR ladder, an Ortsteil's Bezirk parent is a SOURCE-PROVIDED
-- fact (the WFS `sch` attribute's own 2-digit prefix; see
-- ingest_ortsteil_geometries.py and stg_berlin_ortsteil.sql), so this edge
-- is a straight pass-through of stg_berlin_ortsteil.parent_area_code, the
-- same treatment as the Hamburg subarea_l1->district edge just above, not a
-- substr() re-derivation.
--
-- 2. Ortsteil <-> PLR: DOES NOT NEST (deliberately NOT added here). A single
-- PLR frequently spans more than one Ortsteil and vice versa -- there is no
-- single resolvable parent, so adding it to THIS model would violate the
-- model's own documented grain ("every child area has at most one parent by
-- construction"). This relationship is a genuine area-overlap spatial join,
-- built as its own gated intermediate model,
-- int_berlin_plr_ortsteil_overlap.sql (methodology-bearing -- geo-DS
-- sign-off required per the #269 ticket gate) -- see that model's header
-- for the method, the straddling-PLR count, and the dominant-assignment
-- rationale.
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    -- Berlin: PLR (8-digit) -> BZR (leading 6 digits).
    -- lpad(area_code, 8, '0') kept as a defensive no-op safety net: before #266,
    -- int_thesis_2018_area_index carried some thesis-golden PLR raum_ids with the
    -- leading zero dropped for Bezirk 1-9 (7 chars, e.g. '1033102' not '01033102'),
    -- which flowed unchanged into dim_area (dim_area.sql has no padding step) and
    -- would otherwise silently derive a wrong/truncated BZR parent from the raw
    -- 7-char string. #266 fixed this AT SOURCE (int_thesis_2018_area_index.sql now
    -- emits already-padded area_code) -- this lpad is now always a no-op for every
    -- row but is kept as a cheap defensive guard against any future un-padded
    -- source. WFS-sourced PLR codes (stg_berlin_lor) were already correctly 8-char.
    ber_plr_to_bzr as (
        select
            city_code,
            area_level,
            area_code,
            'bzr' as parent_area_level,
            substr(lpad(area_code, 8, '0'), 1, 6) as parent_area_code
        from {{ ref("dim_area") }}
        where city_code = 'BER' and area_level = 'plr'
    ),

    -- Berlin: BZR (6-digit) -> PGR (leading 4 digits)
    ber_bzr_to_pgr as (
        select
            city_code,
            area_level,
            area_code,
            'pgr' as parent_area_level,
            substr(area_code, 1, 4) as parent_area_code
        from {{ ref("dim_area") }}
        where city_code = 'BER' and area_level = 'bzr'
    ),

    -- Berlin: PGR (4-digit) -> Bezirk (leading 2 digits)
    ber_pgr_to_bezirk as (
        select
            city_code,
            area_level,
            area_code,
            'bezirk' as parent_area_level,
            substr(area_code, 1, 2) as parent_area_code
        from {{ ref("dim_area") }}
        where city_code = 'BER' and area_level = 'pgr'
    ),

    -- Hamburg: Stadtteil (subarea_l1) -> Bezirk (district). parent_area_code
    -- is source-provided (WFS 'bezirk' property), not derived -- see header.
    -- DISTINCT because stg_hamburg_geo carries a single 'current' vintage per
    -- area_code already (see that model's own dedup), matching dim_area's grain.
    hh_l1_to_district as (
        select distinct
            city_code,
            area_level,
            area_code,
            'district' as parent_area_level,
            parent_area_code
        from {{ ref("stg_hamburg_geo") }}
        where
            city_code = 'HH'
            and area_level = 'subarea_l1'
            and parent_area_code is not null
    ),

    -- Berlin: Ortsteil -> Bezirk (#269, I-ortsteile). Source-provided parent
    -- code (WFS `sch` prefix, passed through by stg_berlin_ortsteil), same
    -- pass-through treatment as hh_l1_to_district above -- see header.
    ber_ortsteil_to_bezirk as (
        select distinct
            city_code,
            area_level,
            area_code,
            'bezirk' as parent_area_level,
            parent_area_code
        from {{ ref("stg_berlin_ortsteil") }}
        where
            city_code = 'BER'
            and area_level = 'ortsteil'
            and parent_area_code is not null
    ),

    unioned as (
        select *
        from ber_plr_to_bzr
        union all
        select *
        from ber_bzr_to_pgr
        union all
        select *
        from ber_pgr_to_bezirk
        union all
        select *
        from hh_l1_to_district
        union all
        select *
        from ber_ortsteil_to_bezirk
    )

select city_code, area_level, area_code, parent_area_level, parent_area_code
from unioned
