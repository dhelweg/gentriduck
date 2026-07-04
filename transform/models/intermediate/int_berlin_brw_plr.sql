-- int_berlin_brw_plr.sql
-- D3 (#29): Area-weighted spatial join of BRW land value zones → PLR boundaries.
--
-- =============================================================================
-- R-C2 Methodology citations
-- =============================================================================
-- Smith (1979) rent gap: BRW LEVEL = capitalised ground-rent (one term of the gap);
-- the gap-realisation signal is BRW CHANGE (brw_trend), built separately.
-- Do NOT label the level "the rent gap" (domain condition D1).
-- Blasius & Dangschat (1990) Aufwertung: residential land value as a structural
-- LEVEL descriptor of the Berlin housing market; price-surface/consolidation context.
-- Holm (2010) / Bernt (2016) Milieuschutz: NULL/uninhabited PLRs are published as NULL
-- (protective transparency), not zero; framed toward displacement-protection use.
-- Openshaw (1984) MAUP: PLR is the publication floor (never sub-PLR grain);
-- area-weighted mean chosen over centroid-in-zone to handle the BRW-PLR
-- non-aligned tessellation without MAUP bias.
-- Baunutzung classes (BauNVO): 'W%' filter selects residential categories
-- (WA=Allgemeines Wohngebiet, WR=Reines Wohngebiet, WB=Besonderes Wohngebiet, etc.)
-- Intensive variable note (mirrors int_berlin_ewr_plr2021 geo-DS approval 2026-06-19):
-- EUR/m² is a density/rate (intensive), so area-weighted mean is the correct
-- aggregation; SUM is incorrect. Formula:
-- brw_plr_i = SUM_z(value_z * area(intersect(zone_z,plr_i))) / SUM_z(area(...))
-- ADR-0003 §Price/rent (P-A Bodenrichtwerte): approved source; governs ingestion and
-- staging of Berlin Bodenrichtwert polygon data. See docs/adr/0003-*.md. (R-C2, geo 15)
-- Sign-offs: docs/epic-d/d3-price-rent-geo-signoff.md (PASS WITH CONDITIONS, 16
-- conditions)
-- docs/epic-d/d3-price-rent-domain-signoff.md (PASS WITH CONDITIONS, 14 conditions)
--
-- Polarity (index-definition §5, domain condition D2, geo condition 12):
-- brw_weighted_avg_eur_m2 = price-surface/consolidation CONTEXT COVARIATE.
-- Ambiguous polarity: high BRW = historic wealth OR completed gentrification.
-- If ever pooled into a vulnerability composite → sign FLIP required (high BRW = low
-- residual headroom = LOW vulnerability). The honest role is context, not a
-- vulnerability score. Displacement-risk language attaches only to BRW CHANGE,
-- never the level alone.
--
-- =============================================================================
-- Methodology
-- =============================================================================
-- Source: stg_berlin_bodenrichtwert (BRW polygon zones) and stg_berlin_lor (PLR
-- geometries).
--
-- Filter: residential zones only — nutzung LIKE 'W%' (BauNVO Wohngebiet variants: WA,
-- WR,
-- WB, WS, etc.). Mixing in commercial/industrial (G/I) Richtwerte would contaminate a
-- residential-affordability reading with non-comparable land economics (geo condition
-- 2).
-- All-use mean is intentionally NOT persisted — this DEVIATES from geo condition 2
-- (which
-- requires a secondary all-use QA column). A geo-DS exception sign-off is required
-- before
-- this deviation is considered resolved. Omission rationale: keeps the grain clean
-- and the
-- residential-only signal unambiguous; treat as a known open item.
--
-- Spatial join predicate: ST_Intersects(brw_geom, plr_geom)
-- BRW zones and PLRs are non-aligned tessellations (1,621 BRW zones vs 542 PLRs).
-- This is a genuine areal interpolation problem; ST_Intersects + area-weighting is
-- correct.
--
-- Sliver guard (geo condition 3):
-- ST_MakeValid applied to inputs before intersection.
-- Drop pairs where: overlap area < 1 m² AND overlap fraction < 0.5% of the smaller
-- polygon.
-- (AND semantics per geo condition 3: both must be below threshold to drop a pair; a
-- large
-- but thin overlap that passes the fraction check is retained.) Slivers carry near-zero
-- weight but degenerate geometries crash ST_Area; removing them keeps the denominator
-- clean.
--
-- Area weighting for intensive variable:
-- weight = ST_Area(intersection) — the intersection area itself (not normalised by
-- any polygon).
-- Final formula: SUM(value * overlap_area) / SUM(overlap_area) per PLR.
-- Consistent with the geo sign-off intensive-variable formula and
-- int_berlin_ewr_plr2021.
--
-- brw_residential_coverage_frac (geo condition 4):
-- = SUM(intersection_area_m2) / ST_Area(plr_geom) per PLR.
-- A PLR with zero residential BRW coverage yields NULL brw_weighted_avg_eur_m2 and
-- NULL brw_residential_coverage_frac; never 0.
-- Consumers use this to identify pure park/water/industrial/airport PLRs where the
-- BRW signal is absent (transparent, not silently zero).
--
-- Vintage alignment:
-- Always use lor_2021 PLR geometries (area_vintage = 'lor_2021') for consistent spatial
-- alignment across the full 2017–2024 BRW series. snapshot_year = YEAR(reference_date).
--
-- CRS: EPSG:25833 throughout. Both datasets are native 25833; no ST_Transform needed.
-- Berlin axis-order sanity enforced as WHERE filter in the brw CTE (geo condition 1):
-- x ∈ [3.7e5, 4.2e5], y ∈ [5.79e6, 5.84e6] (EPSG:25833; guards against WGS84 swap).
--
-- Zero-residential-BRW PLRs → NULL, not 0 (index-definition §7 "exclude, don't
-- zero-impute").
-- Matches is_uninhabited treatment in int_gentrification_ts.
--
-- Graceful degradation:
-- stg_berlin_bodenrichtwert returns zero rows when no parquets are present.
-- stg_berlin_lor returns zero rows when no LOR parquets are present.
-- When either returns zero rows the spatial join produces zero rows — natural
-- degradation.
--
-- Output grain: (city_code, snapshot_year, area_code, area_vintage)
-- One row per PLR per BRW reference year with area-weighted mean BRW value.
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    -- Residential BRW zones from staging (graceful: zero rows if parquets absent)
    -- ST_MakeValid applied here (geo condition 3) to fix degenerate polygon edges
    -- before
    -- intersection; avoids ST_Area crashes on self-intersecting rings.
    brw as (
        select
            reference_date,
            city_code,
            brw_id,
            value_eur_per_m2,
            nutzung,
            st_makevalid(st_geomfromwkb(geometry_wkb)) as geom
        from {{ ref("stg_berlin_bodenrichtwert") }}
        -- BauNVO Wohngebiet filter (geo condition 2): residential zones only.
        -- W% covers WA, WR, WB, WS variants. Non-residential (G/I/GE) excluded.
        where
            nutzung like 'W%'
            and geometry_wkb is not null
            and value_eur_per_m2 is not null
            and value_eur_per_m2 > 0
            -- Axis-order sanity (geo condition 1): Berlin EPSG:25833 centroids must
            -- be in
            -- x ∈ [3.7e5, 4.2e5], y ∈ [5.79e6, 5.84e6]. Guards against coordinate-swap
            -- (WGS84 loaded into a 25833 column produces near-zero intersections
            -- silently).
            and st_x(st_centroid(st_makevalid(st_geomfromwkb(geometry_wkb))))
            between 3.7e5 and 4.2e5
            and st_y(st_centroid(st_makevalid(st_geomfromwkb(geometry_wkb))))
            between 5.79e6 and 5.84e6
    ),

    -- PLR geometries: LOR 2021 vintage only for consistent alignment with the BRW
    -- series.
    -- BRW reference years span 2017–2024; always join against the stable 2021 PLR
    -- scheme.
    -- ST_MakeValid applied here (geo condition 3) alongside the BRW inputs.
    plr as (
        select
            area_code, area_vintage, st_makevalid(st_geomfromwkb(geometry_wkb)) as geom
        from {{ ref("stg_berlin_lor") }}
        where area_vintage = 'lor_2021' and geometry_wkb is not null
    ),

    -- Candidate intersections: BRW zones touching each PLR.
    -- ST_Intersects is the predicate (not ST_Within) because BRW zones cross PLR
    -- boundaries.
    -- Pre-compute intersection geometry once for both area calculations below.
    candidate_pairs as (
        select
            brw.reference_date,
            brw.city_code,
            brw.brw_id,
            brw.value_eur_per_m2,
            plr.area_code,
            plr.area_vintage,
            st_intersection(brw.geom, plr.geom) as intersection_geom,
            st_area(plr.geom) as plr_area_m2,
            st_area(brw.geom) as brw_area_m2
        from brw
        inner join plr on st_intersects(brw.geom, plr.geom)
    ),

    -- Compute intersection area and apply the sliver guard (geo condition 3):
    -- Reject pairs where overlap area < 1 m² (numerical artefact guard)
    -- AND reject pairs where overlap fraction < 0.5% of the smaller polygon.
    -- Using LEAST(plr_area_m2, brw_area_m2) as "the smaller polygon" per condition 3.
    brw_plr_intersections as (
        select
            reference_date,
            city_code,
            brw_id,
            value_eur_per_m2,
            area_code,
            area_vintage,
            st_area(intersection_geom) as intersection_area_m2,
            plr_area_m2,
            brw_area_m2
        from candidate_pairs
        -- Sliver guard (geo condition 3 AND semantics): drop only when BOTH
        -- thresholds fail.
        -- Keep a pair when EITHER: overlap area >= 1 m² OR fraction >= 0.5% of
        -- smaller polygon.
        where
            st_area(intersection_geom) > 1.0
            or case
                when least(plr_area_m2, brw_area_m2) > 0
                then
                    st_area(intersection_geom) / least(plr_area_m2, brw_area_m2)
                    >= 0.005
                else false
            end
    )

-- Area-weighted mean BRW per PLR per year (intensive variable formula):
-- brw_weighted_avg_eur_m2 = SUM(value * overlap_area) / SUM(overlap_area)
-- This averages the BRW value weighted by the portion of the PLR each zone covers.
--
-- brw_residential_coverage_frac (geo condition 4):
-- = SUM(intersection_area_m2) / plr_area_m2
-- Fraction of the PLR area covered by residential BRW zones.
-- NULL when plr_area_m2 = 0 (degenerate geometry; should never occur post-makevalid).
-- Consumers: NULL PLRs with zero residential coverage (pure park/water/airport PLRs).
--
-- n_brw_zones: count of distinct residential BRW zones contributing to each PLR.
select
    -- Normalise to canonical city code per ADR-0005; stg_berlin_bodenrichtwert emits
    -- 'berlin'.
    case when city_code = 'berlin' then 'BER' else city_code end as city_code,
    year(reference_date) as snapshot_year,
    area_code,
    area_vintage,
    sum(value_eur_per_m2 * intersection_area_m2)
    / nullif(sum(intersection_area_m2), 0) as brw_weighted_avg_eur_m2,
    count(distinct brw_id) as n_brw_zones,
    -- Residential coverage fraction of PLR (geo condition 4).
    -- NULL when no valid PLR area (degenerate); zero naturally never appears because
    -- rows only exist when intersection_area_m2 > 1.0 (guard above).
    sum(intersection_area_m2)
    / nullif(max(plr_area_m2), 0) as brw_residential_coverage_frac
from brw_plr_intersections
where plr_area_m2 > 0
group by city_code, year(reference_date), area_code, area_vintage
