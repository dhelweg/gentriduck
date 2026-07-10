-- fct_gentrification_trajectory.sql
-- R-A8 (#78): Longitudinal gentrification trajectory & stage model (2013–2025).
--
-- Classifies each PLR's social-status trajectory across the full MSS time series
-- (editions: 2013, 2015, 2017, 2019, 2021, 2023, 2025 — up to 7 biennial observations)
-- into one of five trajectory types aligned with Dangschat's (1988) double
-- invasion-succession cycle and the Döring & Ulbricht (2016) vulnerability framework.
--
-- Theory basis (R-C2 grounding rule):
-- Dangschat (1988): double invasion-succession cycle — pioneers → gentrifiers →
-- displacement pressure; early upgrading then accelerating escalation.
-- Thesis §3.2 (Gentrifizierung als Prozess): phases of the gentrification process.
-- ADR-0008 (R-A7 #77): multi-dimensional typology; D1 = social-status outcome.
-- Döring & Ulbricht (2016): vulnerability-positive orientation; persistently
-- deprived areas as the pre-gentrification frontier.
--
-- Trajectory classification method:
-- Rule-based trend analysis on D1 status_index across all available MSS editions.
-- D1 ordinal: 1=hoch (least deprived) … 4=sehr_niedrig (most deprived).
-- Vulnerability-positive: higher status_index = more deprived = higher pressure.
--
-- FIVE trajectory types:
-- 1. 'stable-established'    — consistently low status_index (1–2) throughout;
-- no sustained worsening trend. Thesis: outer-city
-- affluent areas. (Dangschat: pre-invasion stable zone)
-- 2. 'persistently-deprived' — consistently high status_index (3–4) throughout;
-- no material improvement. Thesis: chronic deprivation
-- zones. (Dangschat: high-pressure invasion-succession)
-- 3. 'improving'             — status_index decreased materially over the panel
-- (area status improved, deprivation fell). Could
-- indicate gentrification-driven displacement complete,
-- or genuine social mobility. Requires domain
-- interpretation. (Dangschat: succession complete or
-- latent pressure building)
-- 4. 'declining'             — status_index increased materially over the panel
-- (deprivation worsened). Counter-gentrification or
-- suburban decline trajectory. Escalation of
-- vulnerability.
-- 5. 'mixed'                 — significant within-panel variation without a clear
-- dominant trend; or trajectory type indeterminate from
-- available editions. E.g. V-shaped (improved then
-- worsened) or N-shaped; or only one edition available.
--
-- LOR vintage handling (geo-DS condition, index-definition.md §2.5; R-A3 geo C4):
-- The 2021 LOR reform redistributed 447 → 542 PLRs; int_gentrification_ts
-- carries area_vintage='lor_pre2021' for editions ≤2019 and 'lor_2021' for ≥2021.
-- Cross-vintage deltas MUST NOT be computed directly because the same area_code
-- may refer to different geographic boundaries on each side of the reform.
-- Trajectories are computed within EACH VINTAGE SEPARATELY and then unioned:
-- - lor_pre2021 trajectory uses editions 2013, 2015, 2017, 2019 (4 observations)
-- - lor_2021 trajectory uses editions 2021, 2023, 2025 (3 observations)
-- A per-PLR summary uses the lor_2021 trajectory where available; the lor_pre2021
-- trajectory is surfaced alongside for comparison and is not combined arithmetically
-- with the lor_2021 values.
--
-- Output grain:
-- (city_code, area_code, area_vintage) — one trajectory summary per PLR per vintage.
-- The companion per-year view (fct_gentrification_change) already covers the
-- year-level grain; this mart adds the across-time trajectory classification.
--
-- Validation:
-- Cross-checked against seed_gentrification_ground_truth labels via R-B2 back-test.
-- Known hotspot PLRs (persistently deprived) and coldspot PLRs (stable-established)
-- validated in analysis/backtest_index.py.
--
-- BERLIN-ONLY SCOPE (#125, staging decision -- not a methodology change): as of the
-- H1 (#40) integration, int_gentrification_ts also carries Hamburg rows
-- (city_code='HH', ADR-0014). This mart stays Berlin-only for now: the trajectory
-- thresholds (status_delta >= 1, status_range <= 1, etc.) were derived and
-- back-tested (R-B2) against Berlin's biennial MSS panel and have not been
-- reviewed for Hamburg's annual Sozialmonitoring panel, and the H1 sign-offs
-- (docs/epic-h/H1-geo-signoff.md, H1-domain-signoff.md) scoped their PASS to
-- int_gentrification_ts pipeline wiring only ("no dashboard/report is published
-- from it yet").
-- METHODOLOGY QUESTION flagged for the gate (#125): do these Berlin-calibrated
-- trajectory thresholds transfer to Hamburg's annual (not biennial) cadence
-- unmodified, or does "status_delta >= 1 within the panel" mean something
-- different when editions are 1 year apart instead of 2? Not decided here.
--
-- H-C2 (#159) matched year-span classification window (geo-DS spike
-- docs/epic-h/159-hc2-geo-spike.md): the METHODOLOGY QUESTION above is answered
-- for the panel-length dimension by bounding the `ts` CTE's input to each
-- (city_code, area_vintage)'s most recent `trajectory_window_years` (dbt var,
-- default 6, transform/dbt_project.yml) years, rather than every ingested
-- edition. Rationale (panel-length vs rate-of-change conflation): the
-- `status_delta >= 1` first-to-last check integrates over however many years
-- the panel spans, so an unbounded 12-year Hamburg panel (13 annual editions)
-- encodes a ~3x slower per-year rate than Berlin's 4-6 year panels for the
-- identical "+/-1 ordinal step" threshold, inflating Hamburg's improving+
-- declining share from ~14-16% (Berlin-length window) to 21.5% (full panel) --
-- see the spike's evidence (2). The spike separately confirmed (evidence
-- section 2 of the same doc) that the `status_range <= 1` stability check does
-- NOT need a matching cadence fix: Hamburg's status_index is sticky (64% of
-- areas never move, only 4.3% exceed range 1, across all 13 annual editions),
-- so "more editions -> more wobble" does not materialize and the range
-- tolerance is left unchanged.
-- A year-span window (not an edition-count window) is used because it is
-- cadence-agnostic -- correct for any future city regardless of annual,
-- biennial, or other cadence -- per the spike's R1. `trajectory_window_years =
-- 6` is chosen because it equals Berlin's longest single-vintage span
-- (lor_pre2021, 2013-2019), which makes the window a PROVABLE NO-OP FOR
-- BERLIN: lor_pre2021 (max=2019, span 6yr, 4 editions) and lor_2021 (max=2025,
-- span 4yr, 3 editions) both already fall within a 6-year window, so every
-- edition is retained and Berlin's published trajectory_type classifications
-- are unchanged -- verified by direct before/after warehouse comparison (see
-- H-C2 #159 PR). This is why the fix needs no R-B2 re-calibration. For Hamburg
-- (city_code='HH', area_vintage='current', max=2025) the window trims the
-- input to snapshot_year >= 2019, i.e. ~7 of the 13 annual editions (2019-2025,
-- a 6-year span) -- Berlin-comparable, though Hamburg rows are already excluded
-- before this window logic even runs: `ts_with_vintage_max`'s WHERE clause
-- applies published_cities_filter (#125) upstream of the `ts` window-trim CTE,
-- so under the current default (published_cities: ["BER"]) Hamburg rows never
-- reach this window filter in a normal build.
-- Left out of scope (spike R2, Berlin-affecting): endpoint-only status_delta
-- (first vs last edition only, ignoring interior years) is fragile --
-- ~19-25% of Hamburg's full-panel trend calls flip under 3-edition-smoothed
-- endpoints -- but fixing that (smoothing or a regression slope) would change
-- Berlin's output too and would reopen the R-B2 back-test; deferred to a
-- future issue if pursued, and would need its own fresh dual sign-off.
-- This window fix does NOT widen accepted_values beyond ["BER"] (spike R4) --
-- it is Berlin-output-preserving groundwork, not a Hamburg-publication
-- decision; publishing Hamburg trajectories needs a separate fresh geo-DS +
-- domain-expert dual sign-off referencing this spike, per the #125/#158
-- precedent.
--
-- dbt_meta_owner: data-engineer
-- geo-ds-sign-off: docs/methodology/R-B2-geo-signoff.md (R-B2 #71 PASS used as basis)
-- geo-ds-spike: docs/epic-h/159-hc2-geo-spike.md (H-C2 #159, matched-window fix)
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
    -- Raw panel from int_gentrification_ts (all editions, inhabited PLRs only),
    -- annotated with each (city_code, area_vintage)'s most recent edition year
    -- so the H-C2 (#159) window filter below can bound the classification
    -- input to a matched year-span (see header note).
    -- Window function is materialized here, then filtered in the next CTE,
    -- because a window function cannot be referenced in the WHERE clause of
    -- the SELECT that defines it (same two-layer pattern as
    -- int_poi_status_dynamism.sql's header note on DuckDB's window-function
    -- restrictions).
    ts_with_vintage_max as (
        select
            city_code,
            area_code,
            area_vintage,
            snapshot_year,
            status_index,
            dynamik_index,
            typology_stage,
            is_uninhabited,
            max(snapshot_year) over (
                partition by city_code, area_vintage
            ) as vintage_max_year
        from {{ ref("int_gentrification_ts") }}
        -- Berlin-only staging filter (#125) -- see header note.
        where is_uninhabited = false and {{ published_cities_filter('city_code') }}
    ),

    -- H-C2 (#159): restrict the classification input to each
    -- (city_code, area_vintage)'s most recent `trajectory_window_years` (var,
    -- default 6) years -- a matched year-span window, not an edition-count
    -- window (cadence-agnostic; see header note). Provable no-op for Berlin:
    -- lor_pre2021 (max=2019) keeps snapshot_year >= 2013 = all 4 editions;
    -- lor_2021 (max=2025) keeps snapshot_year >= 2019 = all 3 editions.
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
        from ts_with_vintage_max
        where
            snapshot_year
            >= (vintage_max_year - {{ var('trajectory_window_years', 6) }})
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
            (
                last(status_index order by snapshot_year)
                - first(status_index order by snapshot_year)
            ) as status_delta,
            -- Range of status values within this vintage (volatility measure)
            (max(status_index) - min(status_index)) as status_range,
            -- Dominant typology stage: most frequent typology_stage across editions
            mode(typology_stage) as dominant_stage,
            -- Count of editions with improving typology (pioneer-signal,
            -- active-gentrification,
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
    -- status_delta >= +1: 'declining' (worsened by ≥1 ordinal step)
    -- status_delta <= -1: 'improving' (improved by ≥1 ordinal step)
    -- Both stable ends: 'stable-established' if mean ≤ 2.0 and range ≤ 1
    -- Both deprived ends: 'persistently-deprived' if mean ≥ 3.0 and range ≤ 1
    -- Otherwise: 'mixed' (volatile, indeterminate, or single-edition)
    --
    -- Priority order for disambiguation:
    -- 1. Single-edition trajectories → 'mixed' (not enough data to classify trend)
    -- 2. status_delta and mean classify the dominant direction
    -- 3. 'stable' ends (low deprivation through panel): stable-established
    -- 4. 'deprived' ends (high deprivation through panel): persistently-deprived
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
                when n_editions <= 1
                then 'mixed'
                -- Clear worsening trend: status_index increased by ≥1 ordinal step
                -- (more deprived at end than at start)
                when status_delta >= 1
                then 'declining'
                -- Clear improving trend: status_index decreased by ≥1 ordinal step
                -- (less deprived at end than at start)
                when status_delta <= -1
                then 'improving'
                -- Stable trajectory: first AND last both in the low-deprivation range
                -- (status_index ≤ 2 = hoch or mittel), and limited within-panel
                -- variation
                when
                    status_index_first <= 2
                    and status_index_last <= 2
                    and status_index_mean <= 2.5
                    and status_range <= 1
                then 'stable-established'
                -- Persistently deprived: first AND last both in the high-deprivation
                -- range
                -- (status_index ≥ 3 = niedrig or sehr_niedrig), limited within-panel
                -- variation
                when
                    status_index_first >= 3
                    and status_index_last >= 3
                    and status_index_mean >= 2.5
                    and status_range <= 1
                then 'persistently-deprived'
                -- All other patterns (V-shape, oscillating, small delta without clear
                -- ends)
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
                when trajectory_type = 'mixed'
                then 'low'
                when n_editions >= 3
                then 'high'
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
