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

    -- #354/#355 phase A: the kernel body (POI points, representative points,
    -- ST_DWithin + Gaussian weights, mass normalisation, C-1 leakage guard,
    -- aggregation) lives in the berlin_poi_kernel_weighted_counts() macro
    -- (transform/macros/berlin_poi_kernel_weighted_counts.sql), moved there
    -- verbatim so the native LOR-2021 back-cast
    -- (int_berlin_osm_poi_plr2021_backcast_weighted) reuses the identical
    -- kernel instead of forking it. This model passes its original vintage
    -- rule unchanged. Compiled SQL token-identical to the pre-extraction
    -- model; this model holds gaussian rows only: keys and integer columns
    -- identical, weighted_count within pre-existing float-summation jitter
    -- (evidence
    -- docs/epic-e/354-phase-a-data-prerequisites.md §7).
    {{
        berlin_poi_kernel_weighted_counts(
            poi_relation=ref("int_osm_poi_plr"),
            lor_relation=ref("stg_berlin_lor"),
            vintage_predicate="(p.snapshot_year <= 2020 and l.area_vintage = 'lor_pre2021') or (p.snapshot_year >= 2021 and l.area_vintage = 'lor_2021')",
            bandwidth_m=bandwidth_m,
        )
    }}

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
