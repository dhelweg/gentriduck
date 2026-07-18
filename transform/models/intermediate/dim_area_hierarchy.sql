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
-- subarea_l2 (statistisches Gebiet) -> subarea_l1 (Stadtteil): RESOLVED
-- 2026-07-17 (OA-D1b, #240, ADR-0024 D4) via a ST_Within(centroid,
-- parent_geom) spatial crosswalk. Confirmed live 2026-07-12 (see the previous
-- version of this comment, kept in git history) and RE-CONFIRMED against the
-- currently-ingested data/raw/hamburg/geo/{statgebiet,stadtteil}.parquet
-- (2026-07-17, OA-D1b spike): the Gebiet layer's only properties are
-- `statgebiet` (a bare id, not a Stadtteil-prefixed code -- ingest_hamburg_geo
-- .py's WFS_LAYERS['statgebiet']['parent_prop'] is None, and every one of the
-- 943 distinct post-stg_hamburg_geo-dedup rows' parent_area_code is NULL in
-- the raw parquet) and Gebiet ids do NOT nest by string prefix with Stadtteil
-- codes (statgebiet area_code length varies 4/5/6 digits vs. Stadtteil's
-- fixed 5-digit 'stadtteil_schluessel'; checked directly against the ingested
-- geometries). So there is genuinely no attribute-based or prefix-derivable
-- parent -- the "if no" branch of the OA-D1b ticket's spike-first sizing note.
--
-- The only Gebiet->Stadtteil link ELSEWHERE in this warehouse is
-- int_ewr_socioeco_hamburg_disagg's name-matched crosswalk, which is a
-- methodology decision scoped and signed off for EWR disaggregation
-- specifically (H1 geo-signoff), not a general-purpose geographic crosswalk,
-- and does not cover all ~943 Gebiete (see that model's header) -- not reused
-- here; this edge needs a general (not disaggregation-specific) crosswalk
-- covering every Gebiet.
--
-- METHOD (methodology-bearing, R-C1 -- new spatial method, same class of
-- decision as int_berlin_plr_ortsteil_overlap.sql's area-overlap crosswalk
-- for the analogous Berlin PLR<->Ortsteil non-nesting case): a Stadtteil
-- polygon is large and simply-shaped relative to a statistisches Gebiet
-- (Hamburg's finest published subdivision), so ST_Within(ST_Centroid(gebiet),
-- stadtteil_geom) -- centroid-in-polygon containment, the DuckDB spatial
-- primitive named in CLAUDE.md's spatial-work convention -- was chosen over a
-- full ST_Intersects area-overlap join (int_berlin_plr_ortsteil_overlap.sql's
-- heavier method): unlike PLR<->Ortsteil (two independently-drawn
-- tessellations that routinely straddle each other, needing a dominant/
-- fractional-overlap treatment), a Gebiet is Hamburg's OWN finer statistical
-- subdivision and is expected to nest wholly inside a single Stadtteil by
-- construction -- centroid containment is the simpler, sufficient test for a
-- "which one parent" question, not a "how much does it straddle" question.
-- Both layers share native CRS EPSG:25832 (ADR-0014) -- no reprojection.
--
-- Empirical result (2026-07-17 spike, re-derive by querying this model --
-- do not treat this comment as a substitute going forward): of 943 distinct
-- (post stg_hamburg_geo dedup) statgebiet codes x 104 Stadtteile, 941 (99.8%)
-- have a centroid inside EXACTLY ONE Stadtteil polygon -- ZERO double-matches
-- (the two layers never overlap ambiguously at any Gebiet centroid). The
-- remaining 2 (0.2%: '90001', '106001') have a centroid inside NO Stadtteil
-- polygon -- boundary/digitization-noise gaps between the two independently-
-- drawn layers (same class of issue int_berlin_plr_ortsteil_overlap.sql
-- documents for Berlin, and stg_hamburg_geo's own header documents for the
-- '73002'/'105001' duplicate-geometry WFS artifact), not a genuine spatial
-- outlier: '90001' centroid is 15.9m from Gut Moor's (02703) boundary (a
-- >1.9 km^2 polygon) and 500m+ from any other Stadtteil centroid; '106001'
-- centroid is 6.5km from its nearest Stadtteil (Schnelsen, 02307), a large
-- (17.5 km^2), sparsely-built Gebiet whose polygon simply doesn't touch the
-- Stadtteil layer, but still resolves to a SINGLE unambiguous nearest
-- Stadtteil (next-nearest candidate 600m+ further for both). FALLBACK: these
-- 2 are assigned their nearest Stadtteil by centroid-to-polygon ST_Distance
-- (deterministic tie-break on stadtteil_code, though no real tie occurred).
--
-- Boundary spot-check (OA-D1b spike, 2026-07-17, per the ticket's explicit
-- ask to check straddlers): the 15 closest-to-boundary PRIMARY matches have a
-- centroid-to-assigned-polygon-boundary margin of 34m-75m -- e.g. statgebiet
-- '88003' centroid is inside Harburg (02701, dist=0), 34m from Neuland's
-- (02702) boundary, with the NEXT candidate (Wilstorf, 02704) 314m away;
-- '28012' is inside Lurup (02208, dist=0), 36m from Bahrenfeld's (02205)
-- boundary, next candidate 1.1km away. Every checked near-boundary case has
-- the assigned parent as the CLEAR nearest match, not a close call between
-- two plausible parents -- no evidence of an intuitively-wrong assignment
-- from centroid-containment at this polygon scale (Stadtteil polygons are
-- large administrative areas; a Gebiet centroid landing within ~35m of a
-- Stadtteil boundary is still unambiguously on one side of it).
--
-- GATE: methodology-bearing (new spatial method) -- geo-DS + domain-expert
-- R-C1 dual sign-off required before integration into develop (CLAUDE.md
-- Methodology gate), same requirement as int_berlin_plr_ortsteil_overlap.sql.
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

    -- Hamburg: statistisches Gebiet (subarea_l2) -> Stadtteil (subarea_l1),
    -- OA-D1b (#240, ADR-0024 D4). Spatial crosswalk (see header) -- unlike
    -- every other CTE in this model, this one is a geometric derivation, not
    -- a code-prefix substr() or an attribute pass-through.
    --
    -- Source geometries, deduped defensively (stg_hamburg_geo already dedups
    -- to one row per (city_code, area_level, area_code, area_vintage); this
    -- model has no vintage filter to apply since Hamburg carries a single
    -- 'current' vintage, so DISTINCT on area_code is a no-op safety net,
    -- matching hh_l1_to_district's own DISTINCT usage above).
    hh_l2_geoms as (
        select distinct area_code, geometry_wkb
        from {{ ref("stg_hamburg_geo") }}
        where
            city_code = 'HH' and area_level = 'subarea_l2' and geometry_wkb is not null
    ),

    hh_l1_geoms as (
        select distinct area_code as stadtteil_code, geometry_wkb
        from {{ ref("stg_hamburg_geo") }}
        where
            city_code = 'HH' and area_level = 'subarea_l1' and geometry_wkb is not null
    ),

    hh_l2_centroids as (
        select area_code, st_centroid(st_geomfromwkb(geometry_wkb)) as centroid
        from hh_l2_geoms
    ),

    -- Primary: centroid strictly within a Stadtteil polygon. Empirically
    -- (see header) every Gebiet centroid falls in AT MOST one Stadtteil --
    -- no dominant/tie-break logic is needed here, unlike
    -- int_berlin_plr_ortsteil_overlap.sql's straddling-PLR case.
    hh_l2_primary as (
        select sg.area_code, st.stadtteil_code
        from hh_l2_centroids as sg
        inner join
            hh_l1_geoms as st on st_within(sg.centroid, st_geomfromwkb(st.geometry_wkb))
    ),

    -- Fallback: Gebiete whose centroid falls in NO Stadtteil polygon (2 of
    -- 943 in the OA-D1b spike -- boundary/digitization-noise gaps between the
    -- two independently-drawn layers, see header) get their nearest Stadtteil
    -- by centroid-to-polygon ST_Distance. Deterministic tie-break on
    -- stadtteil_code (defensive -- no real tie was found in the spike).
    hh_l2_fallback as (
        select area_code, stadtteil_code
        from
            (
                select
                    sg.area_code,
                    st.stadtteil_code,
                    row_number() over (
                        partition by sg.area_code
                        order by
                            st_distance(
                                sg.centroid, st_geomfromwkb(st.geometry_wkb)
                            ) asc,
                            st.stadtteil_code asc
                    ) as rn
                from hh_l2_centroids as sg
                inner join hh_l1_geoms as st on true
                where
                    sg.area_code
                    not in (select hh_l2_primary.area_code from hh_l2_primary)
            ) as ranked
        where rn = 1
    ),

    hh_l2_to_l1 as (
        select
            cast('HH' as varchar) as city_code,
            cast('subarea_l2' as varchar) as area_level,
            area_code,
            cast('subarea_l1' as varchar) as parent_area_level,
            stadtteil_code as parent_area_code
        from hh_l2_primary
        union all
        select
            cast('HH' as varchar) as city_code,
            cast('subarea_l2' as varchar) as area_level,
            area_code,
            cast('subarea_l1' as varchar) as parent_area_level,
            stadtteil_code as parent_area_code
        from hh_l2_fallback
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
        union all
        select *
        from hh_l2_to_l1
    )

select city_code, area_level, area_code, parent_area_level, parent_area_code
from unioned
