-- int_poi_c5_share_native.sql
-- #354/#355 phase A, prerequisite §2.1(2): C5 share-normalised POI shares on
-- every native (city, vintage) slice (point-in-polygon counts only), dense
-- over areas x years, for the suite's H3 commercial-change variable
-- (pre-registration docs/methodology/354-355-hypothesis-suite-preregistration.md
-- §5.1 "Commercial share c_E", §5.2 total-share secondary rows).
--
-- =============================================================================
-- Construct (R-C2)
-- =============================================================================
-- C5 share normalisation (docs/epic-c/C5-geo-signoff.md, geo-DS approved
-- 2026-06-19; index-definition.md §2.4; int_poi_share_base /
-- int_poi_status_dynamism headers): an area's share of the city-wide POI
-- count in the same snapshot, share_a = count_a / Σ_a count_a, partitioned by
-- (city_code, area_vintage, snapshot_year). Under the uniform-coverage premise
-- city-wide OSM mapping growth cancels in the share.
-- - total_c5_share: all POIs. Identical by construction to
-- int_poi_share_base.plr_poi_share on every contemporaneous cell (enforced
-- by test_354_c5_share_native_matches_share_base), i.e. the same C5
-- construct, now also native on LOR 2021 for the back-cast years.
-- - commercial_c5_share = c_E of §5.1: the same share restricted to POIs of
-- the four commercial consumption domains Gastronomy, Retail, Services and
-- Entertainment (the E1 #168 basket; dbt var `poi_commercial_domains`).
-- §5.1 reasons: these domains are the thesis's Angebotsstruktur, while
-- Public Space and Mobility (64% of Berlin 2025 POIs) follow street-
-- furniture mapping campaigns, where C5's uniform-coverage premise is least
-- credible (domain review D2; thesis §6.3.2.2).
-- This model only computes levels. The DHS growth g(c_P), g(c_F) and every
-- other estimator stay in the suite (phase B).
--
-- Dense: every area seen in any snapshot of its (city, vintage) appears in
-- every snapshot year of that slice; a year without POIs gives counts 0 and
-- share 0 (the zero is real data for DHS growth, which is defined at a zero
-- endpoint, §5.1). has_any_poi = false marks those rows.
--
-- City-agnostic (ADR-0005): reads int_poi_development_native (all vintages;
-- shares are partitioned by vintage, so a consumer selects one vintage per
-- panel); the commercial basket is a var, not a city constant.
-- No published output changes: new table.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_development_native') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

{% set commercial_domains = var(
    "poi_commercial_domains",
    ["Gastronomy", "Retail", "Services", "Entertainment"],
) %}

with
    dev as (select * from {{ ref("int_poi_development_native") }}),

    area_year as (
        select
            city_code,
            area_vintage,
            snapshot_year,
            area_code,
            sum(poi_count) as total_poi_count,
            coalesce(
                sum(poi_count) filter (
                    where
                        poi_domain_h in (
                            {%- for d in commercial_domains %}
                                '{{ d }}'{% if not loop.last %},{% endif %}
                            {%- endfor %}
                        )
                ),
                0
            ) as commercial_poi_count
        from dev
        group by all
    ),

    slice_years as (
        select
            city_code,
            area_vintage,
            snapshot_year,
            any_value(geometry_pairing) as geometry_pairing
        from dev
        group by all
    ),

    slice_areas as (select distinct city_code, area_vintage, area_code from dev),

    dense as (
        select
            sy.city_code,
            sy.area_vintage,
            sy.snapshot_year,
            sa.area_code,
            sy.geometry_pairing,
            coalesce(ay.total_poi_count, 0) as total_poi_count,
            coalesce(ay.commercial_poi_count, 0) as commercial_poi_count,
            ay.area_code is not null as has_any_poi
        from slice_years as sy
        inner join
            slice_areas as sa
            on sy.city_code = sa.city_code
            and sy.area_vintage = sa.area_vintage
        left join
            area_year as ay
            on sy.city_code = ay.city_code
            and sy.area_vintage = ay.area_vintage
            and sy.snapshot_year = ay.snapshot_year
            and sa.area_code = ay.area_code
    )

select
    city_code,
    area_vintage,
    snapshot_year,
    area_code,
    geometry_pairing,
    has_any_poi,
    total_poi_count,
    commercial_poi_count,
    sum(total_poi_count) over w_city as city_total_poi_count,
    sum(commercial_poi_count) over w_city as city_commercial_poi_count,
    total_poi_count
    * 1.0
    / nullif(sum(total_poi_count) over w_city, 0) as total_c5_share,
    commercial_poi_count
    * 1.0
    / nullif(sum(commercial_poi_count) over w_city, 0) as commercial_c5_share
from dense
window w_city as (partition by city_code, area_vintage, snapshot_year)
