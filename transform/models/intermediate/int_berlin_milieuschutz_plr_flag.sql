-- int_berlin_milieuschutz_plr_flag.sql
-- #70 [B1], fourth slice (first *integration* slice): Milieuschutz-as-binary-flag
-- at PLR grain. Scoped-down per PM decision (2026-07-09) to de-risk the full B1
-- integration (three different time grains -- static Milieuschutz polygons,
-- Wohnlage-snapshot-year rent_pressure_proxy, EWR-annual turnover_proxy -- cannot
-- honestly be composited into one sub-index without inventing an alignment rule
-- not yet grounded anywhere; see ADR-0019 Open Question #2). This slice instead
-- spatially resolves the already-staged `stg_berlin_milieuschutz` polygons (a
-- direct §172 BauGB policy marker of displacement risk) onto the PLR grain as a
-- disclosure-only flag, satisfying #70's acceptance-criteria fallback ("a
-- parallel published layer") without touching the contract-enforced
-- `gentrification_index` mart or inventing a rent/turnover blending rule.
--
-- Method (spatial join, ST_Intersects -- not ST_Within):
-- Milieuschutz boundaries are bespoke Kiez polygons independently drawn by the
-- Senate; they do not align with PLR (Planungsraum) boundaries, unlike the
-- point-in-polygon POI case (int_osm_poi_plr) which correctly uses ST_Within
-- for a point. Requiring full PLR containment (ST_Within on the PLR side) would
-- silently miss every PLR only partially covered by a designation -- the common
-- case, since Kiez-level protection areas are drawn at a finer grain than PLRs.
-- ST_Intersects (any spatial overlap) is therefore the correct predicate for
-- "is any part of this PLR under a Milieuschutz designation" -- see
-- docs/methodology/B1-milieuschutz-geo-signoff.md for the full comparison
-- against ST_Within and an area-weighted-majority alternative (both rejected).
--
-- Both source geometries are already in native CRS EPSG:25833 (ETRS89 / UTM
-- zone 33N) -- Milieuschutz per ADR-0019, LOR per stg_berlin_lor -- so no
-- ST_Transform is needed (verified: same CRS family as every other Berlin GDI
-- WFS layer already ingested).
--
-- Overlap-fraction column: milieuschutz_overlap_frac = sum of intersection area
-- (ST_Area(ST_Intersection(...))) across all matching designations, divided by
-- the PLR's own area. Exposed alongside the boolean flag so a future consumer
-- can distinguish "PLR barely touches a designation boundary" from "PLR is
-- almost entirely covered" without this model having to pick a materiality
-- threshold itself (that threshold choice is deferred to the consumer /
-- G2 disclosure, per the geo-signoff).
-- Follow-up now tracked: #258 (see
-- docs/planning/deferred-work-audit-2026-07/D5-wire.md).
--
-- Current-state only (no time series): the WFS exposes only the *current*
-- designation set (ADR-0019 Open Question #2) -- there is no per-year edition
-- endpoint. `earliest_in_force_date` is carried through as the oldest
-- `in_force_date` among the PLR's matching designations, so a consumer can at
-- least do a coarse "was this area protected before/after year X" cut, but this
-- model does NOT attempt to reconstruct a Milieuschutz status *panel* across
-- snapshot_year/reference_year -- that would require assuming designations were
-- static before their in_force_date, which is not supported by the source.
--
-- Grain: one row per (city_code, area_code, area_vintage) covering BOTH LOR
-- vintages (lor_pre2021, lor_2021) via stg_berlin_lor -- Milieuschutz
-- designations are current-state, so the same polygon set is spatially
-- resolved against both PLR boundary vintages independently (a PLR's
-- pre-2021 and 2021 boundaries differ, so its overlap can differ too).
--
-- Not wired into gentrification_index (contract-enforced mart; adding a column
-- there is a separate, larger contract-change decision) or into any weighted
-- composite with rent_pressure_proxy/turnover_proxy (those remain at their own
-- native time grains -- see header note above). This model IS intended to be
-- read directly by a future G2/web disclosure layer as the "parallel published
-- layer" satisfying #70's acceptance-criteria fallback option.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('stg_berlin_milieuschutz') }}
-- depends_on: {{ ref('stg_berlin_lor') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    milieuschutz as (
        select
            city_code,
            area_code as ms_area_code,
            area_name as ms_area_name,
            in_force_date,
            st_geomfromwkb(geometry_wkb) as ms_geom
        from {{ ref("stg_berlin_milieuschutz") }}
    ),

    plr as (
        select
            city_code,
            area_code,
            area_vintage,
            st_geomfromwkb(geometry_wkb) as plr_geom,
            st_area(st_geomfromwkb(geometry_wkb)) as plr_area_m2
        from {{ ref("stg_berlin_lor") }}
        where area_code is not null
    ),

    -- Every (PLR, Milieuschutz designation) pair that actually overlaps.
    -- Cross-join guarded by ST_Intersects so this stays a small result set
    -- (82 designations x ~1000 PLR-vintage rows is a cheap bounded join, not a
    -- full cross product materialised before filtering -- DuckDB's spatial join
    -- optimizer handles the ST_Intersects predicate directly).
    plr_ms_overlaps as (
        select
            plr.city_code,
            plr.area_code,
            plr.area_vintage,
            plr.plr_area_m2,
            ms.ms_area_code,
            ms.ms_area_name,
            ms.in_force_date,
            st_area(st_intersection(plr.plr_geom, ms.ms_geom)) as overlap_area_m2
        from plr
        inner join
            milieuschutz as ms
            on plr.city_code = ms.city_code
            and st_intersects(plr.plr_geom, ms.ms_geom)
    ),

    -- Aggregate to one row per PLR: how many designations touch it, total
    -- overlap area, and the earliest in-force date among them.
    agg as (
        select
            city_code,
            area_code,
            area_vintage,
            max(plr_area_m2) as plr_area_m2,
            count(distinct ms_area_code) as milieuschutz_designation_count,
            sum(overlap_area_m2) as milieuschutz_overlap_area_m2,
            string_agg(
                distinct ms_area_code, ',' order by ms_area_code
            ) as milieuschutz_area_codes,
            min(in_force_date) as earliest_in_force_date
        from plr_ms_overlaps
        group by city_code, area_code, area_vintage
    )

select
    plr.city_code,
    plr.area_code,
    plr.area_vintage,
    coalesce(agg.milieuschutz_designation_count, 0) > 0 as under_milieuschutz,
    coalesce(agg.milieuschutz_designation_count, 0) as milieuschutz_designation_count,
    agg.milieuschutz_area_codes,
    agg.earliest_in_force_date,
    -- Overlap fraction: total intersection area / PLR area, clipped to [0,1]
    -- (LEAST guards floating-point overshoot when a designation boundary
    -- exactly tracks the PLR boundary -- observed to be negligible in practice,
    -- but cheap to guard).
    least(
        1.0, coalesce(agg.milieuschutz_overlap_area_m2, 0) / nullif(plr.plr_area_m2, 0)
    ) as milieuschutz_overlap_frac
from plr
left join
    agg
    on plr.city_code = agg.city_code
    and plr.area_code = agg.area_code
    and plr.area_vintage = agg.area_vintage
