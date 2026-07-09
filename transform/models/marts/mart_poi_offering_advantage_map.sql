-- mart_poi_offering_advantage_map.sql
-- #210 (perf follow-up to #208/#209): slim, domain-grain companion to
-- mart_poi_offering_advantage, built specifically for the /poi-map page's
-- reactive query.
--
-- Why this exists: Evidence.dev bundles the ENTIRE referenced source parquet
-- to the client for any page with a reactive (`${inputs...}`) query against
-- it -- a query's own WHERE-clause filters do NOT shrink what gets shipped,
-- because duckdb-wasm needs the full table in-browser to answer arbitrary
-- future input combinations. `mart_poi_offering_advantage` is leaf-grain
-- (poi_domain_h x poi_category_h x poi_type_h, 856,464 rows / ~14MB parquet,
-- confirmed via `data/serving/mart_poi_offering_advantage.parquet`), but
-- /poi-map only ever needs one value per (area, year, domain) -- it never
-- reads poi_category_h/poi_type_h/oa_category/oa_type. Shipping the leaf
-- grain to answer a domain-grain question is the actual driver of the ~14MB
-- bundle flagged in #210, not the metric/year/view reactivity itself.
--
-- Not methodology-bearing: pure re-aggregation of an already-signed-off,
-- already-published mart (SUM of an unweighted count + a location quotient
-- that is provably constant within a domain -- see below), no new
-- indicator/weight/normalization. Not on the R-C1 gated-file list.
--
-- oa_domain is constant across all (poi_category_h, poi_type_h) leaf rows
-- within the same (city_code, snapshot_year, area_code, area_vintage,
-- weight_variant, methodology_variant, poi_domain_h) group by construction
-- (int_poi_offering_advantage computes it once per domain and repeats it
-- across that domain's leaf rows) -- verified directly against the built
-- parquet (COUNT(DISTINCT oa_domain) = 1 per group, sampled). any_value(...)
-- is therefore lossless here, not a lossy approximation.
--
-- poi_density_per_km2 is NOT simply averaged/any_value'd across leaves --
-- it is recomputed as SUM(poi_count) / area_km2 so the domain-level density
-- is the true total (e.g. "all Gastronomy POIs per km2"), not one arbitrary
-- leaf's density.
--
-- Grain: one row per (city_code, snapshot_year, area_code, area_vintage,
-- weight_variant, methodology_variant, poi_domain_h) -- a strict
-- (poi_category_h, poi_type_h)-collapsed subset of mart_poi_offering_advantage's
-- grain, ~1/3 the row count (251,159 vs 856,464 rows measured on the same
-- build) with 4 fewer columns (poi_category_h, poi_type_h, oa_category,
-- oa_type dropped).
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('mart_poi_offering_advantage') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    weight_variant,
    methodology_variant,
    poi_domain_h,
    -- Constant within the group (see header) -- any_value is lossless.
    any_value(oa_domain) as oa_domain,
    sum(poi_count) as poi_count,
    any_value(area_km2) as area_km2,
    sum(poi_count) / nullif(any_value(area_km2), 0) as poi_density_per_km2
from {{ ref("mart_poi_offering_advantage") }}
group by
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    weight_variant,
    methodology_variant,
    poi_domain_h
