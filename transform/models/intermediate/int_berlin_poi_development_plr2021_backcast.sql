-- int_berlin_poi_development_plr2021_backcast.sql
-- #354/#355 phase A, prerequisite §2.1(2): native LOR-2021 POI counts for the
-- back-cast OSM snapshots (default 2019, 2020), in EXACTLY the shape of
-- fct_poi_development (same columns, same grain, same canonical city_code).
--
-- Grain: one row per (city_code, snapshot_year, area_code, area_vintage,
-- poi_domain_h, poi_category_h, poi_type_h) -- the OA-A.1 (#165, ADR-0017 D1)
-- full 3-level taxonomy grain of fct_poi_development, so every domain,
-- category and type (all 13 domains and every category H1/H2 uses,
-- pre-registration §5.1) is available, not only a pivoted subset.
--
-- Aggregation mirrors fct_poi_development's Berlin branch line for line
-- (R-C2: fct_poi_development.sql header): count(*) per taxonomy leaf,
-- area_code IS NULL rows (POIs outside every LOR-2021 polygon) excluded,
-- city_code normalised with the shared canonical_city_code() macro (#140,
-- QA-4 #179, ADR-0005), source_attribution carried via any_value().
-- The counts are integers (each POI counted once, in the polygon that
-- contains it), unlike int_poi_share_base_2021's crosswalk-reallocated
-- fractional 2019/2020 counts.
--
-- Kept separate from fct_poi_development (a published mart) so that no
-- existing published output changes: fct_poi_development, its OA and C5
-- consumers and gentrification_index keep their lor_pre2021 rows for
-- 2008-2020. The suite reads the union in int_poi_development_native.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_berlin_osm_poi_plr2021_backcast') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

select
    {{ canonical_city_code("city_code") }} as city_code,
    snapshot_year,
    area_code,
    area_vintage,
    poi_domain_h,
    poi_category_h,
    poi_type_h,
    count(*) as poi_count,
    any_value(source_attribution) as source_attribution
from {{ ref("int_berlin_osm_poi_plr2021_backcast") }}
where area_code is not null
group by
    {{ canonical_city_code("city_code") }},
    snapshot_year,
    area_code,
    area_vintage,
    poi_domain_h,
    poi_category_h,
    poi_type_h
