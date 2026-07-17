-- int_berlin_plr_ortsteil_overlap.sql
-- #269 (I-ortsteile) — the area-overlap crosswalk between Berlin PLR
-- (Planungsraum, LOR) and Ortsteil (Stadtteil, non-LOR) geometries.
--
-- =============================================================================
-- Why this model exists (R-C2 grounding)
-- =============================================================================
-- Ortsteile do NOT nest into the LOR ladder (dim_area_hierarchy.sql's header
-- documents this at length, and only resolves the CLEAN Ortsteil->Bezirk edge
-- there). A PLR and an Ortsteil are two independently-drawn tessellations of
-- the same land area (LOR Planungsraum boundaries were drawn for statistical/
-- planning purposes; Ortsteil boundaries are the older, legally-defined
-- Bezirk-subdivision boundaries, Berlin Bezirksverwaltungsgesetz Sec.2) -- so
-- resolving "which Ortsteil does this PLR belong to" is a genuine areal
-- interpolation problem, the same class of problem int_berlin_brw_plr.sql
-- (BRW zones <-> PLR) and the LOR pre2021<->2021 crosswalk
-- (seed_lor_crosswalk_2006_to_2021 / int_berlin_lor_crosswalk_dominant_2021)
-- already solve for two OTHER non-aligned-tessellation cases in this
-- warehouse. This model reuses that established method (ST_Intersects +
-- ST_Area-weighted overlap in native EPSG:25833, DuckDB spatial extension,
-- per CLAUDE.md's spatial-work convention) rather than inventing a new one.
--
-- =============================================================================
-- Method chosen: DOMINANT (max area-overlap-share) assignment, not fractional
-- apportionment
-- =============================================================================
-- This model computes the FULL overlap-weight table (every PLR x Ortsteil pair
-- with a non-trivial overlap, weight = overlap_area / plr_area) AND flags the
-- single dominant (largest-share) Ortsteil per PLR (is_dominant_ortsteil).
-- Downstream Ortsteil rollups (mart_area_demographics's ortsteil_agg CTE, the
-- Ortsteil stage/typology-distribution mart) use the DOMINANT assignment --
-- i.e. each PLR is counted as belonging wholly to ONE Ortsteil, not split
-- fractionally across the Ortsteile it overlaps.
--
-- Why dominant, not fractional apportionment (contrast with
-- int_berlin_ewr_plr2021 / int_berlin_brw_plr, which DO apportion fractionally):
-- those two models bridge a genuinely DIFFERENT-vintage or DIFFERENT-source
-- polygon set onto PLR, where the quantity being moved (EWR indicator value,
-- BRW EUR/m^2) has no other natural home and splitting it by area share under
-- a uniform-density assumption is the best available estimate of a real
-- (unobserved) sub-polygon quantity. Here, by contrast, the PLR itself is
-- already the unit every other model in this warehouse (EWR, MSS, POI,
-- gentrification_index) publishes its numbers at -- a PLR's residents_total or
-- typology_stage is not a hidden, splittable substrate; it is the number the
-- Amt fuer Statistik/Senate compute FOR that whole PLR polygon. Fractionally
-- splitting an already-published, whole-PLR figure across 2+ Ortsteile would
-- not recover a more accurate sub-PLR reality (we have no sub-PLR EWR data to
-- validate against, unlike the intra-PLR density assumption int_berlin_brw_plr
-- documents as "standard practice at the Berlin PLR spatial scale") -- it would
-- instead fabricate a false impression of precision. This is the same
-- "closest single areal match" reasoning int_berlin_lor_crosswalk_dominant_2021
-- documents for bridging whole-PLR POI counts across the 2021 LOR reform
-- (QA-7b #205) -- reused here for the analogous whole-PLR-unit bridging need.
-- Each PLR is assigned to exactly the Ortsteil that contains the largest share
-- of its own area, and its published figures roll up into that Ortsteil only.
--
-- Straddling PLRs (empirical, computed 2026-07-17 against the current WFS
-- Ortsteil layer + lor_2021 PLR geometries -- re-derive by querying this model,
-- do not treat this comment as a substitute for that query going forward):
-- of 542 lor_2021 PLRs, 82 (15.1%) have a non-trivial (>=0.5% of the PLR's own
-- area, post-sliver-guard) overlap with more than one Ortsteil -- these are
-- the PLRs whose LOR boundary was drawn across an Ortsteil line. The crosswalk
-- has 631 rows total (542 PLRs + 89 extra straddle rows), covers all 542
-- lor_2021 PLRs and all 97 Ortsteile, and the per-PLR overlap fractions sum to
-- 0.994-1.000 (verified) -- i.e. the two tessellations agree almost exactly on
-- where Berlin's land area is, with no gross misalignment. The dominant-row
-- overlap fraction (the confidence of the chosen assignment) ranges from a
-- low of 43.6% (a genuinely close 2-way split) up to ~100% (a fully-contained
-- PLR), averaging 97.9% -- so the large majority of PLRs are assigned to
-- their dominant Ortsteil with very high confidence; the 82 straddlers are
-- where a consumer should treat the assignment as approximate. For these, the
-- dominant assignment is a simplification: a small (sometimes not-so-small --
-- see the 43.6% low end) fraction of the PLR's population/area is
-- geographically in a different Ortsteil than the one its whole figures are
-- rolled into. This is analogous to (and no worse than) the existing
-- dominant-PLR-vintage-crosswalk's own documented pseudo-replication caveat.
-- The `is_dominant_ortsteil` flag plus `overlap_frac_of_plr` are BOTH exposed
-- (not just a collapsed 1:1 table) specifically so a consumer can see how
-- confident a given PLR->Ortsteil assignment is (low `overlap_frac_of_plr` on
-- the dominant row = a genuinely split/low-confidence PLR), the same
-- transparency precedent as int_berlin_lor_crosswalk_dominant_pop_2021's
-- `population_dominance_frac` diagnostic.
--
-- Sliver guard: ST_MakeValid on both inputs; drop a candidate pair when the
-- overlap is < 0.5% of the PLR's own area. int_berlin_brw_plr.sql's sliver
-- guard (< 1 m^2 ABSOLUTE area AND < 0.5% fraction) was evaluated and
-- REJECTED for this specific pairing: BRW zones can be legitimately tiny
-- individual parcels, so an absolute-area floor is meaningful there. PLR and
-- Ortsteil are both large administrative polygons (thousands to millions of
-- m^2) independently digitized against the same underlying Berlin boundary --
-- empirically (checked 2026-07-17), plain boundary-line digitization noise
-- between the two layers produces overlap slivers of hundreds of m^2 on large
-- (e.g. forested) PLRs while still being <0.01% of that PLR's area, i.e. an
-- absolute-area-OR-fraction guard here would keep almost every hairline
-- boundary touch as a "straddle." A FRACTION-ONLY threshold (0.5% of the
-- PLR's own area, the same 0.5% figure int_berlin_brw_plr uses as its
-- fractional leg) correctly separates genuine straddles from digitization
-- noise at this polygon scale -- see the straddling-PLR count above, which
-- is computed net of this guard.
--
-- Vintage: lor_2021 PLR geometries only (area_vintage = 'lor_2021'). Ortsteil
-- boundaries have no vintage discriminator (stg_berlin_ortsteil, single
-- current snapshot) and the Ortsteil profile pages this crosswalk feeds are a
-- CURRENT-state view (matching the 'live_data' gentrification_index variant's
-- effective PLR scope, see mart_area_demographics.sql / #247 I18-web precedent
-- of "current site content uses lor_2021"). NOT extended to lor_pre2021 --
-- if a historical Ortsteil view is ever wanted, that is a new, separately
-- scoped decision (flagged here as an explicit open question for geo-DS,
-- not silently assumed).
--
-- CRS: EPSG:25833 throughout (both PLR and Ortsteil sources are native
-- 25833 -- same GDI Berlin WFS family, ADR-0003). No ST_Transform needed.
--
-- Grain: one row per (plr_area_code, ortsteil_area_code) pair with a
-- non-trivial overlap. A PLR with a single dominant Ortsteil and no other
-- non-trivial overlap appears exactly once; a straddling PLR appears once per
-- overlapping Ortsteil.
--
-- Graceful degradation: stg_berlin_ortsteil / stg_berlin_lor return zero rows
-- when their respective parquet files are absent -- the join then produces
-- zero rows, same natural degradation as int_berlin_brw_plr.
--
-- GATE: this is the #269 ticket's explicitly flagged methodology-adjacent
-- model (area-overlap crosswalk + dominant-assignment rule) -- geo-DS sign-off
-- required before integration into develop (CLAUDE.md Methodology gate /
-- R-C1), same requirement as every other spatial-method choice in this file
-- list.
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    -- PLR geometries: LOR 2021 vintage only (see header "Vintage" note).
    plr as (
        select
            area_code as plr_area_code,
            st_makevalid(st_geomfromwkb(geometry_wkb)) as geom
        from {{ ref("stg_berlin_lor") }}
        where area_vintage = 'lor_2021' and geometry_wkb is not null
    ),

    ortsteil as (
        select
            area_code as ortsteil_area_code,
            area_name as ortsteil_area_name,
            parent_area_code as bezirk_code,
            st_makevalid(st_geomfromwkb(geometry_wkb)) as geom
        from {{ ref("stg_berlin_ortsteil") }}
        where geometry_wkb is not null
    ),

    -- Candidate pairs: any PLR touching any Ortsteil. ST_Intersects (not
    -- ST_Within) because PLRs routinely straddle Ortsteil boundaries -- the
    -- exact relationship this model exists to quantify.
    candidate_pairs as (
        select
            plr.plr_area_code,
            ortsteil.ortsteil_area_code,
            ortsteil.ortsteil_area_name,
            ortsteil.bezirk_code,
            st_area(plr.geom) as plr_area_m2,
            st_area(st_intersection(plr.geom, ortsteil.geom)) as overlap_area_m2
        from plr
        inner join ortsteil on st_intersects(plr.geom, ortsteil.geom)
    ),

    -- Sliver guard (see header): drop a pair when the overlap is < 0.5% of
    -- the PLR's own area -- a fraction-only threshold, not int_berlin_brw_plr's
    -- absolute-area-OR-fraction guard (rejected here as scale-inappropriate).
    guarded as (
        select
            plr_area_code,
            ortsteil_area_code,
            ortsteil_area_name,
            bezirk_code,
            plr_area_m2,
            overlap_area_m2,
            overlap_area_m2 / nullif(plr_area_m2, 0) as overlap_frac_of_plr
        from candidate_pairs
        where plr_area_m2 > 0 and (overlap_area_m2 / plr_area_m2) >= 0.005
    ),

    -- Dominant flag: the single largest-overlap-share Ortsteil per PLR.
    -- Deterministic tie-break (ORDER BY ... , ortsteil_area_code) in case of an
    -- exact-tie overlap fraction (should not occur in practice but avoids
    -- relying on DuckDB's unspecified default row order, same discipline as
    -- int_berlin_lor_crosswalk_dominant_pop_2021's C4 fix).
    ranked as (
        select
            *,
            row_number() over (
                partition by plr_area_code
                order by overlap_frac_of_plr desc, ortsteil_area_code asc
            ) as rn,
            count(*) over (partition by plr_area_code) as n_ortsteil_overlaps
        from guarded
    )

select
    cast('BER' as varchar) as city_code,
    plr_area_code,
    ortsteil_area_code,
    ortsteil_area_name,
    bezirk_code,
    plr_area_m2,
    overlap_area_m2,
    overlap_frac_of_plr,
    (rn = 1) as is_dominant_ortsteil,
    n_ortsteil_overlaps
from ranked
