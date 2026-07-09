-- int_osm_poi_plr_weighted.sql
-- A6 (#69): Distance-weighted PLR POI counts — Gaussian kernel variant.
--
-- =============================================================================
-- Methodology (spatial-methods.md §1-§5; ADR-0010 Decision 1/4)
-- =============================================================================
--
-- MOTIVATION (spatial-methods.md §1):
-- The standard int_osm_poi_plr uses a hard point-in-polygon predicate (ST_Within)
-- — a café 10 m across a PLR border counts zero for the neighbour (classic MAUP /
-- edge-effect artefact). The 2018 thesis mitigated this with a distance-weighted
-- variant (thesis Abb. 5-14; p. 91; best H1 AUC 0.87 on distance-weighted data).
-- This model is the live reproduction/improvement: Gaussian kernel, mass-conserving,
-- computed in DuckDB spatial SQL (ADR-0010 Decision 1).
--
-- KERNEL (spatial-methods.md §1, §4):
-- Gaussian kernel: w_ij = exp(-d_ij² / (2·b²))  for d_ij ≤ b  (else 0)
-- where d_ij = ST_Distance(poi_geom_25833, lor_representative_point_25833) in metres.
-- Default bandwidth b = 500 m (sub-PLR for Berlin median ~0.6–1 km²; pedestrian
-- walkable-amenity catchment ≈5–6 min walk; also aligns with Dangschat 1988/2000
-- invasion-succession / Kiez-diffusion scale at roughly the pedestrian-Kiez radius
-- — Döring & Ulbricht 2016; Fotheringham, Brunsdon & Charlton 2002, GWR §bandwidth).
-- Stored as a dbt var 'poi_kernel_bandwidth_m' (default 500); per-city parameter,
-- never hard-coded in the model body (ADR-0005 city-agnostic core).
--
-- REPRESENTATIVE POINT (spatial-methods.md §9.3, geo-DS condition 3):
-- d_ij uses ST_PointOnSurface(lor_geom) as the PLR representative point — guaranteed
-- to lie on/within the polygon, stable across the sweep. ST_PointOnSurface is used
-- rather than ST_Centroid because centroids of concave PLRs can fall outside the
-- polygon. The choice is held constant across the bandwidth/kernel sensitivity sweep
-- (spatial-methods.md §9.3 condition 3).
--
-- MASS CONSERVATION (spatial-methods.md §2):
-- ŵ_ij = w_ij / Σ_i w_ij   (sum over all PLRs i within bandwidth of POI j)
-- Each POI's weights sum to 1 → total POI mass is conserved city-wide, making the
-- distance_weighted variant honestly comparable to the standard hard count (ADR-0010
-- §4).
--
-- MASS-LEAKAGE GUARD (spatial-methods.md §11.3; ADR-0017 D5 condition C-1;
-- docs/epic-b/P0.1-oa-variant-geo-signoff.md §2.5,
-- docs/epic-b/P0.1-oa-variant-domain-signoff.md §3):
-- At finite bandwidth b, a POI whose home PLR is large/low-density (Tempelhofer Feld,
-- Grunewald, Flughafensee) can be > b from EVERY PLR's ST_PointOnSurface, including its
-- own. Such a POI matched no row in poi_plr_distances/poi_weight_sums and was silently
-- dropped -- mass was NOT conserved, contrary to this section's own contract, and the
-- PLR's local base was distorted. This is blocking for OA-A.2 (#166) on cross-time (H3
-- change-on-change under the 2021 LOR re-cut) and cross-city (ADR-0005) comparability
-- grounds, not only mass conservation -- but the fix is general and benefits every
-- consumer of this model (density layer, dynamism, hotspots), so it is implemented here
-- rather than duplicated in a second model. Guard: any POI with a non-null hard home
-- PLR
-- (`hard_area_code`, from the C3 hard join) that matched zero PLRs within bandwidth is
-- fall-back-assigned to that hard home PLR at weight 1 (see leakage_guard_contributions
-- below). This makes Σ_a weighted_count = hard city total hold exactly (§11.1
-- invariance), enforced by test_c1_oa_weighted_mass_conservation_invariance.sql via
-- int_poi_offering_advantage. POIs with a NULL hard_area_code (outside all PLR polygons
-- -- water bodies, airport perimeter) have no fallback and are correctly excluded
-- either
-- way, matching fct_poi_development's `where area_code is not null` filter on the hard
-- variant.
--
-- CRS (spatial-methods.md §3; ADR-0010 Amendment 3):
-- All distance/bandwidth computations in EPSG:25833 (ETRS89 / UTM zone 33N), Berlin's
-- native LOR CRS. POI points transformed once via ST_Transform(..., true) (always_xy).
-- LOR geometries are already in EPSG:25833 from stg_berlin_lor.
--
-- C5 COMPOSITION (spatial-methods.md §5; ADR-0008 §5):
-- Distance-weighting is applied to PLR POI counts before share normalization.
-- The C5 share normalization (plr_count / city_total) is applied DOWNSTREAM in
-- int_poi_share_base / int_poi_status_dynamism — exactly as for the standard variant.
-- This respects the "C5 share-normalization first, distance-weighting second" rule:
-- weighted_count feeds into the same share pipeline, so the kernel is applied to the
-- quantity that gets C5-normalized, never to an already-smeared coverage-growth
-- artefact.
-- PLRs with zero POIs across all years remain excluded (index-definition.md §7 rule 4).
--
-- WEIGHT_VARIANT (ADR-0010 §1; spatial-methods.md §7 MAUP sweep):
-- Output includes weight_variant = 'gaussian_500m' (default) to discriminate against
-- the standard hard point-in-polygon ('standard') for the MAUP sensitivity comparison.
-- The bandwidth sweep (250m / 750m) produces additional variant values.
--
-- SCOPE: Parallel to int_osm_poi_plr (hard join). Downstream: feeds
-- int_poi_features_pivot
-- via a variant-aware ref, then int_poi_share_base → int_poi_status_dynamism.
-- The Gi* hotspot analysis (analysis/a6_hotspots.py) reads dynamism_score from a
-- weighted_dynamism view of int_poi_status_dynamism seeded with this model's output
-- (spatial-methods.md §6).
--
-- GRACEFUL DEGRADATION: returns a zero-row typed stub when no OSM or LOR data is
-- present
-- (same guard as int_osm_poi_plr), so dbt build passes before ingestion is run.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_osm_poi_plr') }}
-- depends_on: {{ ref('stg_berlin_lor') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

{% set bandwidth_m = var("poi_kernel_bandwidth_m", 500) %}

{% if execute %}
    {%- set osm_count_result = run_query("SELECT count(*) FROM glob('" ~ var("project_root") ~ "/data/raw/osm/berlin/*.parquet')") -%}
    {%- set osm_file_count = osm_count_result.columns[0][0] -%}
    {%- set lor_glob = var("project_root") ~ "/data/raw/berlin/lor/*.parquet" -%}
    {%- set lor_result = run_query("SELECT count(*) FROM glob('" ~ lor_glob ~ "')") -%}
    {%- set lor_file_count = lor_result.columns[0][0] -%}
{% else %} {%- set osm_file_count = 0 -%} {%- set lor_file_count = 0 -%}
{% endif %}

{% if osm_file_count > 0 and lor_file_count > 0 %}

    -- Both OSM and LOR data available: compute distance-weighted POI-PLR assignments.
    with
        -- POI points already assigned to their hard PLR (int_osm_poi_plr).
        -- We use the pre-transformed geom from int_osm_poi_plr upstream; however,
        -- int_osm_poi_plr does not expose geom_25833. Re-derive it here from lon/lat.
        -- spatial-methods.md §3: transform once, always_xy=true.
        poi_points as (
            select
                city_code,
                snapshot_year,
                osm_id,
                poi_domain_h,
                poi_category_h,
                poi_type_h,
                harmonization_provenance,
                source_attribution,
                -- Source area_code from hard join (for NULL-POI exclusion guard).
                -- POIs with NULL area_code (outside PLR boundaries) are still eligible
                -- for distance-weighting if they fall within bandwidth of a PLR.
                area_code as hard_area_code,
                area_vintage as hard_area_vintage,
                st_transform(
                    st_point(lon, lat), 'EPSG:4326', 'EPSG:25833', true
                ) as geom_25833
            from {{ ref("int_osm_poi_plr") }}
        ),

        -- LOR geometries: representative point for distance computation.
        -- spatial-methods.md §9.3 (geo-DS condition 3): use ST_PointOnSurface for a
        -- point guaranteed to lie on/within the polygon (handles concave PLRs where
        -- ST_Centroid can fall outside). Held constant across the sweep.
        lor_rep_points as (
            select
                area_code,
                area_vintage,
                st_pointonsurface(st_geomfromwkb(geometry_wkb)) as rep_point_25833
            from {{ ref("stg_berlin_lor") }}
            where geometry_wkb is not null
        ),

        -- Cross-join POIs to PLRs within bandwidth using ST_DWithin for efficiency.
        -- spatial-methods.md §1: w_ij = exp(-d_ij² / (2·b²)) for d_ij ≤ b (else 0).
        -- The ST_DWithin predicate truncates at bandwidth b before weight computation,
        -- so zero-weight POI-PLR pairs never enter the kernel evaluation.
        -- Vintage filter mirrors int_osm_poi_plr: pre-2021 POIs join pre-2021
        -- geometries;
        -- 2021+ POIs join lor_2021 geometries.
        poi_plr_distances as (
            select
                p.city_code,
                p.snapshot_year,
                p.osm_id,
                p.poi_domain_h,
                p.poi_category_h,
                p.poi_type_h,
                p.harmonization_provenance,
                p.source_attribution,
                l.area_code,
                l.area_vintage,
                st_distance(p.geom_25833, l.rep_point_25833) as dist_m,
                -- Gaussian kernel weight (spatial-methods.md §1):
                -- w_ij = exp(-d_ij² / (2·b²))
                exp(
                    - (power(st_distance(p.geom_25833, l.rep_point_25833), 2))
                    / (2.0 * power({{ bandwidth_m }}.0, 2))
                ) as raw_weight
            from poi_points as p
            inner join
                lor_rep_points as l
                on st_dwithin(p.geom_25833, l.rep_point_25833, {{ bandwidth_m }}.0)
                and (
                    (p.snapshot_year <= 2020 and l.area_vintage = 'lor_pre2021')
                    or (p.snapshot_year >= 2021 and l.area_vintage = 'lor_2021')
                )
        ),

        -- Mass normalization (spatial-methods.md §2):
        -- ŵ_ij = w_ij / Σ_i w_ij
        -- Denominator: sum of raw_weight for this POI across ALL PLRs it reaches.
        -- If a POI is in the interior of a PLR far from any boundary, only its home
        -- PLR lies within the bandwidth; weight normalizes to 1.0 (same as hard join).
        poi_weight_sums as (
            select snapshot_year, osm_id, sum(raw_weight) as total_weight
            from poi_plr_distances
            group by snapshot_year, osm_id
        ),

        -- Normalized (mass-conserving) weights per POI-PLR pair.
        normalized_weights as (
            select
                d.city_code,
                d.snapshot_year,
                d.osm_id,
                d.poi_domain_h,
                d.poi_category_h,
                d.poi_type_h,
                d.harmonization_provenance,
                d.source_attribution,
                d.area_code,
                d.area_vintage,
                d.dist_m,
                d.raw_weight,
                -- ŵ_ij = w_ij / Σ_i w_ij  (spatial-methods.md §2)
                d.raw_weight / nullif(s.total_weight, 0) as normalized_weight
            from poi_plr_distances as d
            inner join
                poi_weight_sums as s
                on d.snapshot_year = s.snapshot_year
                and d.osm_id = s.osm_id
        ),

        -- Mass-leakage guard (spatial-methods.md §11.3; ADR-0017 D5 C-1; see file
        -- header). A POI is "leaked" when it matched zero PLR representative points
        -- within bandwidth b, i.e. it has no row in poi_weight_sums at all -- not a
        -- row with total_weight = 0 (ST_DWithin already excludes those pairs upstream,
        -- so poi_weight_sums simply never gains a row for a fully-isolated POI).
        -- Only POIs with a non-null hard home PLR get a fallback; NULL-hard_area_code
        -- POIs (outside every PLR polygon) are correctly left out, same as the hard
        -- variant.
        leaked_pois as (
            select
                p.city_code,
                p.snapshot_year,
                p.osm_id,
                p.poi_domain_h,
                p.poi_category_h,
                p.poi_type_h,
                p.hard_area_code as area_code,
                p.hard_area_vintage as area_vintage
            from poi_points as p
            left join
                poi_weight_sums as s
                on p.snapshot_year = s.snapshot_year
                and p.osm_id = s.osm_id
            where s.osm_id is null and p.hard_area_code is not null
        ),

        -- Unified per-POI-PLR weight contribution: mass-conserving Gaussian weights
        -- for matched POIs, plus weight-1 fallback contributions for leaked POIs.
        -- Union (not union-of-aggregates) so a PLR/taxonomy cell that receives both
        -- kernel-matched and leakage-guard mass in the same group re-aggregates
        -- correctly in weighted_agg below (a leaked POI's fallback PLR could in
        -- principle coincide with a cell also fed by other, non-leaked POIs).
        poi_contributions as (
            select
                city_code,
                snapshot_year,
                osm_id,
                poi_domain_h,
                poi_category_h,
                poi_type_h,
                area_code,
                area_vintage,
                normalized_weight as contribution_weight
            from normalized_weights
            union all
            select
                city_code,
                snapshot_year,
                osm_id,
                poi_domain_h,
                poi_category_h,
                poi_type_h,
                area_code,
                area_vintage,
                1.0 as contribution_weight
            from leaked_pois
        ),

        -- Aggregate weighted POI fractional counts per (PLR, year, category).
        -- Each POI contributes ŵ_ij (or 1.0 if leakage-guarded) to PLR i; summed =
        -- weighted_count. Σ_j ŵ_ij = total distance-weighted POI mass for PLR i in
        -- this year. City-wide sum of weighted_count = total POI count (mass
        -- conservation; §11.1 invariance once the leakage guard is applied).
        weighted_agg as (
            select
                city_code,
                snapshot_year,
                area_code,
                area_vintage,
                poi_domain_h,
                poi_category_h,
                poi_type_h,
                -- Weighted fractional count: sum of normalized (+ leakage-guard)
                -- weights for this POI category in this PLR. Replaces integer count
                -- from hard join.
                sum(contribution_weight) as weighted_count,
                count(*) as contributing_poi_count
            from poi_contributions
            group by
                city_code,
                snapshot_year,
                area_code,
                area_vintage,
                poi_domain_h,
                poi_category_h,
                poi_type_h
        )

    select
        city_code,
        snapshot_year,
        area_code,
        area_vintage,
        poi_domain_h,
        poi_category_h,
        poi_type_h,
        weighted_count,
        contributing_poi_count,
        -- weight_variant discriminator for MAUP sensitivity sweep (spatial-methods.md
        -- §7;
        -- ADR-0010 §1). Default = 'gaussian_500m' (b=500 m Gaussian kernel).
        -- Bandwidth sweep variants ('gaussian_250m', 'gaussian_750m') produced by
        -- overriding the poi_kernel_bandwidth_m var in analysis/a6_maup.py.
        'gaussian_{{ bandwidth_m }}m' as weight_variant
    from weighted_agg

{% else %}

    -- Zero-row typed stub: OSM data or LOR geometry parquet files not found.
    -- Run ingestion to populate:
    -- OSM:  ingestion/berlin/osm/ingest_osm_history.py
    -- LOR:  ingestion/berlin/lor/ingest_lor_geometries.py --out-dir data/raw/berlin/lor
    select
        cast(null as varchar) as city_code,
        cast(null as integer) as snapshot_year,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_vintage,
        cast(null as varchar) as poi_domain_h,
        cast(null as varchar) as poi_category_h,
        cast(null as varchar) as poi_type_h,
        cast(null as double) as weighted_count,
        cast(null as bigint) as contributing_poi_count,
        cast(null as varchar) as weight_variant
    where false

{% endif %}
