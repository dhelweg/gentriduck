-- fct_gentrification_trajectory.sql
-- R-A8 (#78): Longitudinal gentrification trajectory & stage model (2013–2025).
--
-- Classifies each PLR's social-status trajectory across the full MSS time series
-- (editions: 2013, 2015, 2017, 2019, 2021, 2023, 2025 — up to 7 biennial observations)
-- into one of five trajectory types aligned with Dangschat's (1988) double
-- invasion-succession cycle and the Döring & Ulbricht (2016) vulnerability framework.
--
-- Theory basis (R-C2 grounding rule):
--   Dangschat (1988): double invasion-succession cycle — pioneers → gentrifiers →
--   displacement pressure; early upgrading then accelerating escalation.
--   Thesis §3.2 (Gentrifizierung als Prozess): phases of the gentrification process.
--   ADR-0008 (R-A7 #77): multi-dimensional typology; D1 = social-status outcome.
--   Döring & Ulbricht (2016): vulnerability-positive orientation; persistently
--   deprived areas as the pre-gentrification frontier.
--
-- Trajectory classification method:
--   Rule-based trend analysis on D1 status_index across all available MSS editions.
--   D1 ordinal: 1=hoch (least deprived) … 4=sehr_niedrig (most deprived).
--   Vulnerability-positive: higher status_index = more deprived = higher pressure.
--
--   FIVE trajectory types:
--   1. 'stable-established'    — consistently low status_index (1–2) throughout;
--                                 no sustained worsening trend. Thesis: outer-city
--                                 affluent areas. (Dangschat: pre-invasion stable zone)
--   2. 'persistently-deprived' — consistently high status_index (3–4) throughout;
--                                 no material improvement. Thesis: chronic deprivation
--                                 zones. (Dangschat: high-pressure invasion-succession)
--   3. 'improving'             — status_index decreased materially over the panel
--                                 (area status improved, deprivation fell). Could
--                                 indicate gentrification-driven displacement complete,
--                                 or genuine social mobility. Requires domain
--                                 interpretation. (Dangschat: succession complete or
--                                 latent pressure building)
--   4. 'declining'             — status_index increased materially over the panel
--                                 (deprivation worsened). Counter-gentrification or
--                                 suburban decline trajectory. Escalation of
--                                 vulnerability.
--   5. 'mixed'                 — significant within-panel variation without a clear
--                                 dominant trend; or trajectory type indeterminate from
--                                 available editions. E.g. V-shaped (improved then
--                                 worsened) or N-shaped; or only one edition available.
--
-- LOR vintage handling (geo-DS condition, index-definition.md §2.5; R-A3 geo C4):
--   The 2021 LOR reform redistributed 447 → 542 PLRs; int_gentrification_ts
--   carries area_vintage='lor_pre2021' for editions ≤2019 and 'lor_2021' for ≥2021.
--   Cross-vintage deltas MUST NOT be computed directly because the same area_code
--   may refer to different geographic boundaries on each side of the reform.
--   Trajectories are computed within EACH VINTAGE SEPARATELY and then unioned:
--     - lor_pre2021 trajectory uses editions 2013, 2015, 2017, 2019 (4 observations)
--     - lor_2021 trajectory uses editions 2021, 2023, 2025 (3 observations)
--   A per-PLR summary uses the lor_2021 trajectory where available; the lor_pre2021
--   trajectory is surfaced alongside for comparison and is not combined arithmetically
--   with the lor_2021 values.
--
-- Output grain:
--   (city_code, area_code, area_vintage) — one trajectory summary per PLR per vintage.
--   The companion per-year view (fct_gentrification_change) already covers the
--   year-level grain; this mart adds the across-time trajectory classification.
--
-- Validation:
--   Cross-checked against seed_gentrification_ground_truth labels via R-B2 back-test.
--   Known hotspot PLRs (persistently deprived) and coldspot PLRs (stable-established)
--   validated in analysis/backtest_index.py.
--
-- dbt_meta_owner: data-engineer
-- geo-ds-sign-off: docs/methodology/R-B2-geo-signoff.md (R-B2 #71 PASS used as basis)
-- depends_on: {{ ref('int_gentrification_ts') }}
{{
    config(
        materialized="table",
        meta={
            "dbt_meta_owner": "data-engineer",
            "trajectory_method": (
                "Rule-based trend on D1 status_index within LOR vintage. "
                "Dangschat (1988) theory. R-A8 #78."
            ),
        },
    )
}}

with
    -- Raw panel from int_gentrification_ts (all editions, inhabited PLRs only)
    ts as (
        select
            city_code,
            area_code,
            area_vintage,
            snapshot_year,
            status_index,
            dynamik_index,
            typology_stage,
            is_uninhabited
        from {{ ref("int_gentrification_ts") }}
        where is_uninhabited = false
    ),

    -- Pivot to per-PLR per-vintage aggregate statistics
    -- Compute: count of editions, first/last status_index, min/max, mean, std
    -- These feed the trajectory classification rule.
    -- Cross-vintage boundary is enforced by partitioning on area_vintage.
    per_plr_agg as (
        select
            city_code,
            area_code,
            area_vintage,
            count(snapshot_year) as n_editions,
            min(snapshot_year) as first_edition,
            max(snapshot_year) as last_edition,
            -- First and last D1 status within this vintage (for trend direction)
            first(status_index order by snapshot_year) as status_index_first,
            last(status_index order by snapshot_year) as status_index_last,
            min(status_index) as status_index_min,
            max(status_index) as status_index_max,
            avg(status_index) as status_index_mean,
            -- Status delta: positive = worsened; negative = improved.
            -- Only meaningful if n_editions > 1 within this vintage.
            (last(status_index order by snapshot_year)
                - first(status_index order by snapshot_year)) as status_delta,
            -- Range of status values within this vintage (volatility measure)
            (max(status_index) - min(status_index)) as status_range,
            -- Dominant typology stage: most frequent typology_stage across editions
            mode(typology_stage) as dominant_stage,
            -- Count of editions with improving typology (pioneer-signal, active-gentrification,
            -- consolidation-pressure, improving-vulnerable, stable-established)
            count_if(
                typology_stage in (
                    'pioneer-signal',
                    'active-gentrification',
                    'consolidation-pressure',
                    'improving-vulnerable',
                    'stable-established'
                )
            ) as n_editions_improving_stage,
            -- Count of editions at highest deprivation (status_index = 4)
            count_if(status_index = 4) as n_editions_sehr_niedrig,
            -- Count of editions at lowest deprivation (status_index = 1)
            count_if(status_index = 1) as n_editions_hoch
        from ts
        group by city_code, area_code, area_vintage
    ),

    -- Apply trajectory classification rules
    -- Thresholds (index-definition.md §3.1, R-A8):
    --   status_delta >= +1: 'declining' (worsened by ≥1 ordinal step)
    --   status_delta <= -1: 'improving' (improved by ≥1 ordinal step)
    --   Both stable ends: 'stable-established' if mean ≤ 2.0 and range ≤ 1
    --   Both deprived ends: 'persistently-deprived' if mean ≥ 3.0 and range ≤ 1
    --   Otherwise: 'mixed' (volatile, indeterminate, or single-edition)
    --
    -- Priority order for disambiguation:
    --   1. Single-edition trajectories → 'mixed' (not enough data to classify trend)
    --   2. status_delta and mean classify the dominant direction
    --   3. 'stable' ends (low deprivation through panel): stable-established
    --   4. 'deprived' ends (high deprivation through panel): persistently-deprived
    with_trajectory as (
        select
            city_code,
            area_code,
            area_vintage,
            n_editions,
            first_edition,
            last_edition,
            status_index_first,
            status_index_last,
            status_index_min,
            status_index_max,
            status_index_mean,
            status_delta,
            status_range,
            dominant_stage,
            n_editions_improving_stage,
            n_editions_sehr_niedrig,
            n_editions_hoch,
            -- Trajectory type classification (R-A8 rules, Dangschat framework)
            case
                -- Single observation: cannot classify a trend
                when n_editions <= 1 then 'mixed'
                -- Clear worsening trend: status_index increased by ≥1 ordinal step
                -- (more deprived at end than at start)
                when status_delta >= 1 then 'declining'
                -- Clear improving trend: status_index decreased by ≥1 ordinal step
                -- (less deprived at end than at start)
                when status_delta <= -1 then 'improving'
                -- Stable trajectory: first AND last both in the low-deprivation range
                -- (status_index ≤ 2 = hoch or mittel), and limited within-panel variation
                when
                    status_index_first <= 2
                    and status_index_last <= 2
                    and status_index_mean <= 2.5
                    and status_range <= 1
                then 'stable-established'
                -- Persistently deprived: first AND last both in the high-deprivation range
                -- (status_index ≥ 3 = niedrig or sehr_niedrig), limited within-panel variation
                when
                    status_index_first >= 3
                    and status_index_last >= 3
                    and status_index_mean >= 2.5
                    and status_range <= 1
                then 'persistently-deprived'
                -- All other patterns (V-shape, oscillating, small delta without clear ends)
                else 'mixed'
            end as trajectory_type
        from per_plr_agg
    ),

    -- Compute trajectory validity score and additional flags
    final as (
        select
            city_code,
            area_code,
            area_vintage,
            n_editions,
            first_edition,
            last_edition,
            status_index_first,
            status_index_last,
            status_index_min,
            status_index_max,
            round(status_index_mean, 3) as status_index_mean,
            status_delta,
            status_range,
            trajectory_type,
            dominant_stage,
            n_editions_improving_stage,
            n_editions_sehr_niedrig,
            n_editions_hoch,
            -- Trajectory confidence: higher when more editions are available
            -- and the trajectory is non-mixed
            case
                when trajectory_type = 'mixed' then 'low'
                when n_editions >= 3 then 'high'
                else 'medium'
            end as trajectory_confidence,
            -- Flag: area with high sustained vulnerability across the panel
            -- (useful for back-test validation against hotspot seed)
            (status_index_mean >= 3.0) as is_persistently_vulnerable,
            -- Flag: area with consistently low deprivation (coldspot indicator)
            (status_index_mean <= 1.5) as is_persistently_affluent
        from with_trajectory
    )

select *
from final
