{#
  berlin_poi_kernel_weighted_counts(poi_relation, lor_relation, vintage_predicate, bandwidth_m)
  ===========================================================================================
  #354/#355 phase A (pre-registration docs/methodology/
  354-355-hypothesis-suite-preregistration.md §2.1(2), §10.2): the
  mass-conserving, leakage-guarded Gaussian-kernel POI -> PLR weighting,
  moved VERBATIM out of int_osm_poi_plr_weighted.sql so the native LOR-2021
  back-cast of OSM snapshots 2019/2020
  (int_berlin_osm_poi_plr2021_backcast_weighted) applies the identical kernel,
  bandwidth var, representative point and C-1 leakage guard instead of a fork.

  No methodology change: the SQL is the former `with ... select` body of
  int_osm_poi_plr_weighted, statement-for-statement, with three
  substitutions only -- the POI source (`ref("int_osm_poi_plr")` ->
  `poi_relation`), the LOR source (`ref("stg_berlin_lor")` -> `lor_relation`)
  and the vintage join rule (-> `vintage_predicate`, a boolean SQL expression
  over aliases `p` = POI, `l` = LOR representative point). int_osm_poi_plr_weighted
  passes its original rule verbatim, and its output is verified row-identical
  before/after (docs/epic-e/354-phase-a-data-prerequisites.md §6).
  Grounding (R-C2) stays in int_osm_poi_plr_weighted.sql's header:
  docs/methodology/spatial-methods.md §1-§5, §9.3, §11.3; ADR-0010 D1/D4;
  ADR-0017 D5 C-1.

  Scope: Berlin adapter. Distances are computed in EPSG:25833 (Berlin's
  native LOR CRS, spatial-methods.md §3) exactly as in the original model;
  a second city would need its CRS parametrised first (ADR-0005).

  Contract: poi_relation has the int_osm_poi_plr columns (city_code,
  snapshot_year, osm_id, poi_domain_h, poi_category_h, poi_type_h,
  harmonization_provenance, source_attribution, area_code, area_vintage, lon,
  lat); lor_relation has the stg_berlin_lor columns (area_code, area_vintage,
  geometry_wkb). Emits a complete `with ... select` statement.
#}
{% macro berlin_poi_kernel_weighted_counts(
    poi_relation, lor_relation, vintage_predicate, bandwidth_m
) %}
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
            from {{ poi_relation }}
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
            from {{ lor_relation }}
            where geometry_wkb is not null
        ),

        -- Cross-join POIs to PLRs within bandwidth using ST_DWithin for efficiency.
        -- spatial-methods.md §1: w_ij = exp(-d_ij² / (2·b²)) for d_ij ≤ b (else 0).
        -- The ST_DWithin predicate truncates at bandwidth b before weight computation,
        -- so zero-weight POI-PLR pairs never enter the kernel evaluation.
        -- Vintage filter: supplied by the caller as vintage_predicate. It must
        -- mirror the vintage rule of the hard join that produced poi_relation
        -- (int_osm_poi_plr: pre-2021 POIs -> lor_pre2021, 2021+ -> lor_2021;
        -- the back-cast: every POI -> lor_2021), so the leakage-guard fallback
        -- PLR and the kernel PLRs share one geometry vintage.
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
                and ({{ vintage_predicate }})
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
{% endmacro %}
