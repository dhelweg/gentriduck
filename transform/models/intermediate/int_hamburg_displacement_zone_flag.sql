-- int_hamburg_displacement_zone_flag.sql
-- #203 [H-C5]: spatially resolves stg_hamburg_displacement_zones (current-state
-- soziale Erhaltungsverordnung / §172 BauGB designated-area polygons) onto the
-- Stadtteil grain -- the direct Hamburg analogue of
-- int_berlin_milieuschutz_plr_flag (#70 [B1]), same legal basis (§172 BauGB),
-- same disclosure-only scoping call: produces a binary flag + overlap
-- fraction, deliberately NOT composited into any weighted index and NOT
-- wired into the contract-enforced gentrification_index mart (ADR-0004).
--
-- =============================================================================
-- Spatial method (mirrors int_berlin_milieuschutz_plr_flag's reasoning)
-- =============================================================================
-- ST_Intersects (not ST_Within): Erhaltungsverordnung designations are
-- bespoke Kiez-level polygons drawn independently of Stadtteil administrative
-- boundaries -- the two boundary systems are not nested or aligned, same
-- reasoning as Berlin's Milieuschutz-vs-PLR case (see
-- docs/methodology/B1-milieuschutz-geo-signoff.md §a for the full argument
-- this model reuses). Requiring full containment would systematically
-- undercount designations that straddle a Stadtteil boundary.
--
-- CRS: both source geometries are native EPSG:25832 (stg_hamburg_geo and
-- stg_hamburg_displacement_zones both confirmed per ADR-0014; NOT EPSG:25833
-- like Berlin -- see dim_city.native_crs_epsg). No ST_Transform needed.
-- Sanity: Hamburg EPSG:25832 y in [5.90e6, 5.97e6] (computed via WGS84
-- bbox ~9.65-10.35E/53.35-53.75N through pyproj, #203) -- guards against a
-- silent coordinate-order/CRS-mismatch failure the same way
-- int_berlin_wohnlage_plr's y in [5.79e6, 5.84e6] guard does for Berlin's
-- EPSG:25833.
--
-- Overlap-fraction column: displacement_zone_overlap_frac = sum of
-- intersection area across all matching designations, divided by the
-- Stadtteil's own area. Exposed alongside the boolean flag so a future
-- consumer can distinguish partial from near-total coverage without this
-- model picking a materiality threshold -- same reasoning as Berlin's
-- milieuschutz_overlap_frac (that threshold choice is deferred to the
-- consumer / G2 disclosure).
--
-- Current-state only (no time series): stg_hamburg_displacement_zones
-- exposes only the current designation set (16 in-force zones as of #203;
-- no per-year edition endpoint) -- same limitation as Berlin's Milieuschutz
-- WFS. earliest_in_force_date is carried through for a coarse before/after
-- cut only; this model does NOT reconstruct a historical status panel.
--
-- Grain: Stadtteil (`subarea_l1`) -- chosen to match
-- int_hamburg_wohnlage_stadtteil's grain (this ticket's companion model) so
-- a future G2/web disclosure layer can join both without a further
-- cross-grain step. Statistisches-Gebiet grain (Hamburg's PLR analogue,
-- `subarea_l2`) was considered and rejected for this slice: Stadtteil is
-- coarse enough that overlap fractions remain interpretable (~104-105
-- areas vs ~941-945), and re-running the same join at Gebiet grain is a
-- mechanical follow-up if a finer-grain consumer needs it later -- not
-- blocked by anything in this model.
--
-- Not wired into gentrification_index (contract-enforced mart) or into any
-- weighted composite with int_hamburg_wohnlage_stadtteil's tier shares --
-- same reasoning as Berlin's B1 slice: blending a binary policy marker with
-- continuous tier-composition shares would require inventing an
-- unreviewed normalization/weighting rule, out of scope for this slice.
--
-- dbt_meta_owner: data-engineer
-- geo-ds-sign-off: PASS (docs/epic-h/203-hc5-geo-signoff.md, 2026-07-09, issue #203)
-- domain-sign-off: PASS (docs/epic-h/203-hc5-domain-signoff.md, 2026-07-09, issue #203)
-- depends_on: {{ ref('stg_hamburg_displacement_zones') }}
-- depends_on: {{ ref('stg_hamburg_geo') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    zones as (
        select
            city_code,
            area_code as zone_area_code,
            area_name as zone_area_name,
            in_force_date,
            st_geomfromwkb(geometry_wkb) as zone_geom
        from {{ ref("stg_hamburg_displacement_zones") }}
        where geometry_wkb is not null
    ),

    stadtteile as (
        select
            city_code,
            area_code,
            area_vintage,
            st_geomfromwkb(geometry_wkb) as stadtteil_geom,
            st_area(st_geomfromwkb(geometry_wkb)) as stadtteil_area_m2
        from {{ ref("stg_hamburg_geo") }}
        where
            area_level = 'subarea_l1'
            and geometry_wkb is not null
            -- Sanity: Hamburg EPSG:25832 y in [5.90e6, 5.97e6] -- guards against a
            -- coordinate-swap / CRS-mismatch silently producing zero matches.
            and st_y(st_centroid(st_geomfromwkb(geometry_wkb)))
            between 5.90e6 and 5.97e6
    ),

    stadtteil_zone_overlaps as (
        select
            s.city_code,
            s.area_code,
            s.area_vintage,
            s.stadtteil_area_m2,
            z.zone_area_code,
            z.zone_area_name,
            z.in_force_date,
            st_area(st_intersection(s.stadtteil_geom, z.zone_geom)) as overlap_area_m2
        from stadtteile as s
        inner join
            zones as z
            on s.city_code = z.city_code
            and st_intersects(s.stadtteil_geom, z.zone_geom)
    ),

    agg as (
        select
            city_code,
            area_code,
            area_vintage,
            max(stadtteil_area_m2) as stadtteil_area_m2,
            count(distinct zone_area_code) as displacement_zone_count,
            sum(overlap_area_m2) as displacement_zone_overlap_area_m2,
            string_agg(
                distinct zone_area_code, ',' order by zone_area_code
            ) as displacement_zone_area_codes,
            min(in_force_date) as earliest_in_force_date
        from stadtteil_zone_overlaps
        group by city_code, area_code, area_vintage
    )

select
    s.city_code,
    s.area_code,
    s.area_vintage,
    coalesce(agg.displacement_zone_count, 0) > 0 as under_displacement_protection,
    coalesce(agg.displacement_zone_count, 0) as displacement_zone_count,
    agg.displacement_zone_area_codes,
    agg.earliest_in_force_date,
    -- Overlap fraction: total intersection area / Stadtteil area, clipped to
    -- [0,1] (LEAST guards floating-point overshoot at exactly-tracking
    -- boundaries -- mirrors int_berlin_milieuschutz_plr_flag).
    least(
        1.0,
        coalesce(agg.displacement_zone_overlap_area_m2, 0)
        / nullif(s.stadtteil_area_m2, 0)
    ) as displacement_zone_overlap_frac
from stadtteile as s
left join
    agg
    on s.city_code = agg.city_code
    and s.area_code = agg.area_code
    and s.area_vintage = agg.area_vintage
