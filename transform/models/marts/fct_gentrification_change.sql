-- fct_gentrification_change.sql
-- C4 mart: per-PLR per-year gentrification change metrics.
-- R-A1 update (#64): adds D1/D2 MSS outcome columns and ordinal status transition.
--
-- Extends int_gentrification_ts with:
-- - status_index, dynamik_index, typology_stage (D1/D2 MSS outcomes; R-A1)
-- - status_index_prev: D1 at the prior MSS edition (LAG within vintage)
-- - status_transition: 'improved'/'stable'/'worsened' ordinal transition
-- (index-definition.md §2.2; D1 is ORDINAL — do not treat numeric delta as metric)
-- - Previous-year POI score columns (legacy comparison)
-- - legacy_gentrification_score: the pre-R-A1 formula kept for 2018 baseline comparison
-- (equal-weight mean of status_score + dynamism_score - ewr_composite; NOT for new
-- analysis)
--
-- D1 POLARITY NOTE (thesis §3.2; reference/system/50_lor_mss_idx_bzr_idx.sql):
-- status_index = 4 (sehr_niedrig) = most deprived / most vulnerable.
-- status_transition='improved' means status_index DECREASED (lower numeric = less
-- deprived).
-- status_transition='worsened' means status_index INCREASED (higher numeric = more
-- deprived).
-- D1 is INVERSE numeric vs 2018 thesis status_summe; same deprivation gradient.
--
-- LAG is computed within (city_code, area_code, area_vintage) to avoid
-- cross-vintage rank comparisons at the 2021 LOR reform boundary.
-- This produces NULL for the first year of each vintage.
--
-- Uninhabited PLRs (is_uninhabited=true) are retained for completeness but
-- status_index, status_transition, and rank columns are NULL for those rows.
--
-- Output grain: (city_code, area_code, area_vintage, snapshot_year).
-- One row per PLR per MSS edition year (aligned with int_gentrification_ts).
--
-- C5 note: dynamism_score is the z-score of share_yoy_change (PLR POI share delta;
-- C5 OSM completeness-bias correction). See int_gentrification_ts for details.
--
-- Contract: see marts/schema.yml for the governed column spec.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_gentrification_ts') }}
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    ts as (select * from {{ ref("int_gentrification_ts") }}),

    with_rank as (
        select
            *,
            -- Rank by legacy_gentrification_score within city x year (higher score =
            -- rank 1).
            -- NULLs are ranked last by default in DuckDB RANK().
            -- Note: legacy_gentrification_score (the pre-R-A1 formula) is used here for
            -- continuity; use D1/D2 columns for any new analysis.
            rank() over (
                partition by city_code, snapshot_year
                order by legacy_gentrification_score desc nulls last
            ) as rank_current
        from ts
    ),

    with_lag as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            mss_edition,
            total_poi_count,
            share_yoy_change,
            status_score,
            dynamism_score,
            ewr_composite,
            foreigners_share,
            migration_background_share,
            mean_age_years,
            residence_duration_5y_share,
            residents_total,
            -- D1/D2 MSS outcome columns (R-A1)
            status_index,
            dynamik_index,
            typology_stage,
            is_uninhabited,
            gesamtindex,
            -- Legacy formula kept for 2018 baseline comparison (NOT for new analysis)
            legacy_gentrification_score,
            rank_current,
            -- Previous MSS edition D1 status (LAG within area + vintage)
            -- Used to compute ordinal status transition (index-definition.md §2.2)
            lag(status_index) over (
                partition by city_code, area_code, area_vintage order by snapshot_year
            ) as status_index_prev,
            -- Previous year's legacy score and rank (within same area + vintage)
            lag(legacy_gentrification_score) over (
                partition by city_code, area_code, area_vintage order by snapshot_year
            ) as gentrification_score_prev,
            lag(rank_current) over (
                partition by city_code, area_code, area_vintage order by snapshot_year
            ) as rank_prev
        from with_rank
    )

select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    mss_edition,
    total_poi_count,
    share_yoy_change,
    status_score,
    dynamism_score,
    ewr_composite,
    foreigners_share,
    migration_background_share,
    mean_age_years,
    residence_duration_5y_share,
    residents_total,
    -- D1/D2 MSS outcomes (R-A1): use these for all new analysis
    status_index,
    dynamik_index,
    typology_stage,
    is_uninhabited,
    gesamtindex,
    -- Ordinal status transition (index-definition.md §2.2; R-A3 C2):
    -- D1 is ORDINAL — delta is informational, NOT metric. Use ordinal logit for
    -- regressions.
    -- positive delta = status_index increased = STATUS WORSENED (less deprived → more
    -- deprived)
    -- negative delta = status_index decreased = STATUS IMPROVED (more deprived → less
    -- deprived)
    status_index_prev,
    case
        when status_index is null or status_index_prev is null
        then null  -- uninhabited PLR or first edition in vintage
        when status_index - status_index_prev < 0
        then 'improved'
        when status_index - status_index_prev > 0
        then 'worsened'
        else 'stable'
    end as status_transition,
    -- Legacy formula columns (kept for 2018 thesis baseline comparison; NOT for new
    -- analysis)
    -- legacy_gentrification_score = (status_score + dynamism_score - ewr_composite) /
    -- 3.0
    legacy_gentrification_score as gentrification_score,  -- aliased for backward compat
    gentrification_score_prev,
    (legacy_gentrification_score - gentrification_score_prev) as gentrification_delta,
    rank_current,
    rank_prev,
    -- rank_change: positive means moved up (lower rank number = better)
    -- Note: rank numbers run from 1 (highest score) to N (lowest); a lower
    -- rank_current means the area improved. rank_change = rank_prev - rank_current
    -- so positive = improved rank (less negative = better).
    (rank_prev - rank_current) as rank_change
from with_lag
