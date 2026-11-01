-- int_poi_development_native.sql
-- #354/#355 phase A, prerequisite §2.1(2): POI counts in which EVERY row was
-- produced by point-in-polygon against the geometry of that row's own
-- area_vintage -- never crosswalk-reallocated. The suite's single source for
-- counts, so each panel reads one vintage uniformly: Berlin modern 2019-2025 on
-- lor_2021, Berlin thesis era on lor_pre2021, Hamburg 2013-2025 on 'current'
-- (pre-registration docs/methodology/354-355-hypothesis-suite-preregistration.md
-- §2, §2.1(2), §3.3(1), §6.2, §6.5).
--
-- Shape: fct_poi_development's columns and grain, plus `geometry_pairing`:
-- - 'contemporaneous': the snapshot was joined against the geometry valid at
-- that date -- all fct_poi_development rows (Berlin lor_pre2021 2008-2020
-- and lor_2021 2021+, Hamburg 'current' all years);
-- - 'backcast': an earlier snapshot joined against a later geometry
-- (int_berlin_poi_development_plr2021_backcast: Berlin 2019/2020 on
-- lor_2021 by default, maintainer-approved §10.2).
-- Berlin 2019/2020 therefore appear twice, once per vintage; area_vintage is
-- part of the grain and a consumer must select ONE vintage per panel (suite
-- leakage guard §5.8(5): no delta crosses a LOR boundary, index-definition.md
-- §2.5). The back-cast years (<= 2020) never coincide with contemporaneous
-- lor_2021 years (>= 2021); the grain test would fail if they did.
--
-- City-agnostic (ADR-0005): no city or vintage literal here; the Berlin
-- back-cast enters as an adapter model, the same pattern fct_poi_development
-- uses for its per-city sources. No published output changes: new view.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('fct_poi_development') }}
-- depends_on: {{ ref('int_berlin_poi_development_plr2021_backcast') }}
{{ config(materialized="view", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    contemporaneous as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            poi_count,
            source_attribution,
            'contemporaneous' as geometry_pairing
        from {{ ref("fct_poi_development") }}
    ),

    backcast as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            poi_count,
            source_attribution,
            'backcast' as geometry_pairing
        from {{ ref("int_berlin_poi_development_plr2021_backcast") }}
    )

select *
from contemporaneous
union all
select *
from backcast
