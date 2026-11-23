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
    -- #363 drift fix (docs/epic-c/363-geo-tolerance-note.md §7): rounded to
    -- 9 decimals (z-scale, so an absolute 1e-9). Rebuilding with no code
    -- change moved values by up to 2.7e-15 (floating-point summation order
    -- in the window aggregates), which split mathematically equal values
    -- and shifted the Spearman p of analysis/c_three_way_comparison.py. 9
    -- decimals merges the noise-split ties (~122 here, observed 2026-11-23).
    -- Margin, stated honestly: the smallest genuine within-year gap is
    -- 5.7e-10, BELOW the 1e-9 step, yet no genuine pair is merged on the
    -- current data (distinct values 9,138 -> 9,016 = 9,138 - 122); geo-DS
    -- accepted that a merge at this scale would be immaterial
    -- (docs/epic-c/363-geo-signoff.md flag 1). 6 decimals would be too
    -- coarse, 12 would let build noise straddle rounding boundaries. Rounding, not
    -- a fixed summation order, so that equal values become the exact ties
    -- that Spearman's average ranks (scipy.stats.spearmanr) then treat as
    -- ties; done here, in the model, so every consumer agrees.
    round(
        (amenity_weighted_count - avg(amenity_weighted_count) over w_year)
        / nullif(stddev(amenity_weighted_count) over w_year, 0),
        9
    ) as status_score_improved,
    (amenity_share_yoy_change - avg(amenity_share_yoy_change) over w_year) / nullif(
        stddev(amenity_share_yoy_change) over w_year, 0
    ) as dynamism_score_improved,
    (vacancy_weighted_count - avg(vacancy_weighted_count) over w_year) / nullif(
        stddev(vacancy_weighted_count) over w_year, 0
    ) as disinvestment_score_improved
from lag_base
window w_year as (partition by city_code, snapshot_year)
