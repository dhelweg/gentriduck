-- int_berlin_osm_poi_plr2021_backcast_weighted.sql
-- #354/#355 phase A, prerequisite §2.1(2): distance-weighted (Gaussian kernel)
-- POI counts for the back-cast OSM snapshots (default 2019, 2020) on LOR-2021
-- PLRs -- the weighted counterpart of int_berlin_osm_poi_plr2021_backcast, in
-- exactly the shape of int_osm_poi_plr_weighted.
--
-- Method: NOT re-implemented here. The kernel, bandwidth, representative
-- point, mass normalisation and C-1 leakage guard come from the shared
-- berlin_poi_kernel_weighted_counts() macro, i.e. the very SQL that
-- int_osm_poi_plr_weighted runs (R-C2 grounding in that model's header:
-- docs/methodology/spatial-methods.md §1-§5, §9.3, §11.3; ADR-0010 D1/D4;
-- ADR-0017 D5 C-1). Same bandwidth var `poi_kernel_bandwidth_m` (default
-- 500), so one build always gives both models the same bandwidth and the same
-- weight_variant label (pre-registration §2.1(2): no methodology change).
--
-- The only difference from int_osm_poi_plr_weighted is the vintage rule
-- passed to the macro: every back-cast POI is weighted onto lor_2021
-- representative points (int_osm_poi_plr_weighted sends snapshots <= 2020 to
-- lor_pre2021). The leakage-guard fallback PLR is the POI's LOR-2021 hard
-- PLR from int_berlin_osm_poi_plr2021_backcast, so kernel and fallback share
-- one geometry vintage. Mass conservation against the hard back-cast counts
-- is enforced by test_354_backcast_oa_weighted_mass_conservation.
--
-- city_code is passed through un-normalised, as in int_osm_poi_plr_weighted
-- (legacy 'berlin'); int_poi_offering_advantage_native canonicalises it.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_berlin_osm_poi_plr2021_backcast') }}
-- depends_on: {{ ref('stg_berlin_lor') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

{% set bandwidth_m = var("poi_kernel_bandwidth_m", 500) %}

{{
    berlin_poi_kernel_weighted_counts(
        poi_relation=ref("int_berlin_osm_poi_plr2021_backcast"),
        lor_relation=ref("stg_berlin_lor"),
        vintage_predicate="l.area_vintage = 'lor_2021'",
        bandwidth_m=bandwidth_m,
    )
}}
