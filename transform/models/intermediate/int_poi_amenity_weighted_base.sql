-- int_poi_amenity_weighted_base.sql
-- OA-B.3 (#172, ADR-0017 workstream 2): tier-weighted amenity composite per
-- (city_code, snapshot_year, area_code, area_vintage), "Run 2 / improved"
-- companion to int_poi_share_base's unweighted total_poi_count.
--
-- =============================================================================
-- Construct (R-C2 grounding: docs/planning/oa-revival-and-methodology-improvement.md
-- §"POI relevance model (Workstream 2)"; seed_poi_offering_relevance.csv;
-- ADR-0017 D2.1 "weight first" idiom, here applied to a THEORY weight rather
-- than a spatial kernel weight)
-- =============================================================================
-- Every (poi_domain_h, poi_category_h, poi_type_h) leaf's stock (poi_count from
-- fct_poi_development) is multiplied by its causality-first tier weight
-- (seed_poi_offering_relevance, level='type', offering_weight in {0, 0.33,
-- 0.66, 1.0} -- OA-B.1 #170) BEFORE aggregation, mirroring how
-- int_osm_poi_plr_weighted's Gaussian kernel weight is applied before the OA
-- LQ is formed in int_poi_offering_advantage ("weight first, ratio last").
-- Types with tier 0 (theory says non-causal, OA-B.1) contribute zero to the
-- composite -- this is a curation, not a data-driven promotion/demotion
-- (workstream-2 "causality-first" rule, ADR firmed up by OA-B.4 #173).
--
-- =============================================================================
-- Vacancy kept OUT of the amenity composite (ADR-0017 D-2, seed header row for
-- domain='Vacancy'; docs/planning §"Two workstreams")
-- =============================================================================
-- Vacancy is the theorised OPPOSITE-POLE disinvestment/rent-gap marker (Smith
-- 1979) -- summing it into the same composite as amenity-offering types would
-- silently cancel a positive amenity signal against a positive vacancy signal
-- even though they mean opposite things. It is tracked here as its own column
-- (vacancy_weighted_count) so downstream consumers can treat it as a distinct,
-- oppositely-signed series, never blended into the amenity composite.
--
-- Scope note: Berlin only. seed_poi_offering_relevance's tier weights and
-- causal_rationale citations were authored against Berlin's OSM taxonomy and
-- literature review (OA-B.1/B.2, #170/#171); extending this composite to
-- Hamburg would require its own causal-tier review (out of scope here, unlike
-- the city-agnostic unweighted total_poi_count basis).
--
-- Graceful degradation: returns zero rows when fct_poi_development has no
-- Berlin rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('fct_poi_development') }}
-- depends_on: {{ ref('seed_poi_offering_relevance') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    type_weights as (
        select poi_domain_h, poi_category_h, poi_type_h, offering_weight
        from {{ ref("seed_poi_offering_relevance") }}
        where level = 'type'
    ),

    weighted_stock as (
        select
            f.city_code,
            f.snapshot_year,
            f.area_code,
            f.area_vintage,
            f.poi_domain_h,
            -- Coalesce to 0: a leaf absent from the seed carries no established
            -- causal rationale and is treated as tier-0 (dropped), never
            -- silently promoted (workstream-2 "causality-first" rule). Every
            -- leaf actually observed in fct_poi_development is expected to
            -- have a seed row (OA-B.1 built the seed from this exact
            -- taxonomy); the schema test below guards the invariant.
            f.poi_count * coalesce(w.offering_weight, 0) as weighted_count
        from {{ ref("fct_poi_development") }} as f
        left join
            type_weights as w
            on f.poi_domain_h = w.poi_domain_h
            and f.poi_category_h = w.poi_category_h
            and f.poi_type_h = w.poi_type_h
        where f.city_code = 'BER'
    ),

    aggregated as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            sum(
                case when poi_domain_h != 'Vacancy' then weighted_count else 0 end
            ) as amenity_weighted_count,
            sum(
                case when poi_domain_h = 'Vacancy' then weighted_count else 0 end
            ) as vacancy_weighted_count
        from weighted_stock
        group by city_code, snapshot_year, area_code, area_vintage
    )

select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    amenity_weighted_count,
    vacancy_weighted_count,
    sum(amenity_weighted_count) over (
        partition by city_code, snapshot_year, area_vintage
    ) as berlin_amenity_weighted_total,
    amenity_weighted_count
    * 1.0
    / nullif(
        sum(amenity_weighted_count) over (
            partition by city_code, snapshot_year, area_vintage
        ),
        0
    ) as amenity_weighted_share
from aggregated
