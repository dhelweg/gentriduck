-- int_poi_status_dynamism_improved.sql
-- OA-B.3 (#172, ADR-0017 workstream 2 "improved" run): per-PLR per-year status
-- and dynamism scores computed from the tier-weighted amenity composite
-- (int_poi_amenity_weighted_base_2021) instead of int_poi_status_dynamism's
-- unweighted total_poi_count. Mirrors that model's z-score/LAG structure
-- exactly -- see its header for the shared C5 share-normalization rationale
-- and the DuckDB nested-window-function limitation this two-CTE-layer
-- structure works around.
--
-- methodology_variant = 'improved' throughout (never blended with the
-- 'faithful' status_score/dynamism_score from int_poi_status_dynamism --
-- ADR-0017 D3/D4; docs/planning/oa-revival-and-methodology-improvement.md).
--
-- status_score_improved: z-score of amenity_weighted_count (tier-weighted POI
-- stock, Vacancy excluded) across all PLRs for that year -- how
-- amenity-offering-rich an area is, curated by causal-tier weight rather than
-- raw POI count.
-- dynamism_score_improved: z-score of the YoY change in amenity_weighted_share
-- (C5-equivalent share-normalization, same OSM-completeness-bias control as
-- the faithful model, applied to the weighted composite).
-- disinvestment_score_improved: z-score of vacancy_weighted_count (the
-- OPPOSITE-POLE Vacancy-domain signal, ADR-0017 D-2). Kept as a SEPARATE
-- column -- never summed with status/dynamism_score_improved into one score.
--
-- Scope: Berlin only (city_code='BER'), same scope as
-- int_poi_amenity_weighted_base (seed_poi_offering_relevance tier weights are
-- not validated for any other city's taxonomy).
--
-- Graceful degradation: returns zero rows when int_poi_amenity_weighted_base_2021
-- has no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_amenity_weighted_base_2021') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    lag_base as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            amenity_weighted_count,
            vacancy_weighted_count,
            berlin_amenity_weighted_total,
            amenity_weighted_share,
            lag(amenity_weighted_share) over (
                partition by city_code, area_code, area_vintage order by snapshot_year
            ) as amenity_weighted_share_prev_year,
            amenity_weighted_share - lag(amenity_weighted_share) over (
                partition by city_code, area_code, area_vintage order by snapshot_year
            ) as amenity_share_yoy_change
        from {{ ref("int_poi_amenity_weighted_base_2021") }}
    )

select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    'improved' as methodology_variant,
    amenity_weighted_count,
    vacancy_weighted_count,
    berlin_amenity_weighted_total,
    amenity_weighted_share,
    amenity_weighted_share_prev_year,
    amenity_share_yoy_change,
    (amenity_weighted_count - avg(amenity_weighted_count) over w_year)
    / nullif(stddev(amenity_weighted_count) over w_year, 0) as status_score_improved,
    (amenity_share_yoy_change - avg(amenity_share_yoy_change) over w_year) / nullif(
        stddev(amenity_share_yoy_change) over w_year, 0
    ) as dynamism_score_improved,
    (vacancy_weighted_count - avg(vacancy_weighted_count) over w_year) / nullif(
        stddev(vacancy_weighted_count) over w_year, 0
    ) as disinvestment_score_improved
from lag_base
window w_year as (partition by city_code, snapshot_year)
