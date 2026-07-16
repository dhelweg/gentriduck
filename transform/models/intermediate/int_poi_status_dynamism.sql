-- int_poi_status_dynamism.sql
-- C4/C5 intermediate: per-PLR per-year POI status and dynamism scores.
--
-- From int_poi_features_pivot (via int_poi_share_base), compute for each
-- (area_code, snapshot_year):
-- - status_score: z-score of total_poi_count across all PLRs for that year
-- = (total_poi_count - mean(total_poi_count over year)) / stddev(... over year)
-- Captures how POI-rich an area is relative to other Berlin PLRs.
-- Mirrors the 2018 thesis status_index (reference/system/71_oa.sql).
-- - plr_poi_share: each PLR's fraction of total city-wide POI count for that year
-- (pre-computed in int_poi_share_base to avoid DuckDB nested window limitation).
-- - share_yoy_change: YoY change in plr_poi_share.
-- Computed within the same (city_code, area_code, area_vintage). For Berlin, all
-- rows are remapped to the lor_2021 scheme via int_poi_share_base_2021 first, so
-- the 2020->2021 delta is computable (issue #63). For other cities with a single
-- vintage across their whole series (e.g. Hamburg's 'current', ADR-0014, #125),
-- int_poi_share_base_2021 passes rows through unchanged -- there is no vintage
-- boundary to bridge.
--
-- City-agnostic (#125): this model is shared across cities -- filtered by
-- city_code (e.g. 'HH') in int_gentrification_ts Branch C for Hamburg. See that
-- model's header for the Hamburg wiring (ADR-0014; H1 #40 sign-offs).
-- - dynamism_score: z-score of share_yoy_change across all PLRs for that year.
-- Captures how fast an area's share of total POIs is changing relative to others.
-- Mirrors the 2018 thesis dynamism_index.
--
-- C5 normalization (geo-DS approved 2026-06-19, docs/epic-c/C5-geo-signoff.md):
-- Prior to C5, dynamism_score was a z-score of raw YoY count deltas. This exposed
-- it to OSM completeness-bias: areas mapped late appeared to have high dynamism
-- simply because mapper coverage improved, not because real POI churn occurred.
-- The C4 geo-DS sign-off explicitly required C5 before publishing dynamism_score.
--
-- Solution (Option A -- PLR POI share normalization):
-- Using each PLR's share of city-wide POIs controls for uniform OSM coverage growth.
-- Under the uniform-coverage assumption (acceptable at Berlin PLR scale 2008-2024),
-- city-wide mapping growth cancels in share_yoy_change, leaving only real relative
-- density changes. If a PLR gains share, it attracted disproportionately more POIs
-- than Berlin overall -- a real signal, not mapping noise.
--
-- Limitation: non-uniform mapping coverage growth (some PLRs mapped earlier than
-- others) may create spurious share dynamics. Option B (ohsome edit-density
-- normalization) is available for a future epic if needed post-publication.
--
-- QA-winsor (#268, geo-DS approved -- docs/epic-c/QA-winsor-geo-signoff.md):
-- dynamism_score is winsorized at +/-3 SD (see winsorize() macro) so a small
-- number of thin-PLR extreme observations cannot swing downstream composites,
-- maps, or narratives. This was recommended as a non-blocking follow-up across
-- four prior sign-offs (C4/C5/C6/G2) and left open until now. dynamism_score_raw
-- carries the pre-winsorization value for diagnostics; every governed downstream
-- consumer (fct_gentrification_change, gentrification_index, E-series analysis)
-- should read dynamism_score, not dynamism_score_raw.
--
-- Hamburg re-validation (H-C1 #158, geo-DS spike docs/epic-h/158-hc1-geo-spike.md):
-- The C5 sign-off's two empirical premises -- (1) the bulk of OSM coverage growth
-- predates 2015, with post-2015 coverage more stable, and (2) uniform-ish
-- city-wide mapping growth so share-based normalization cancels completeness
-- bias -- were independently re-checked against Hamburg's own OSM POI
-- coverage-growth curve, not merely assumed to transfer from Berlin. Hamburg's
-- ingested series runs 2008-2026, the same window/cadence as Berlin, and shows
-- the same shape: a 2009-2013 cold-start explosion (e.g. +598% YoY in 2009)
-- stabilizing to a low-single/low-double-digit growth regime by ~2014-2015 --
-- matching Berlin's stabilization point. Because dynamism_score and status_score
-- are already z-scores partitioned by (city_code, snapshot_year) (see w_year
-- below), Hamburg is scored entirely relative to Hamburg's own distribution --
-- the mechanism was already per-city, not a Berlin-hardcoded constant. No change
-- to this model's normalization, cutoff year, or math was required or made.
-- The 77 test_c5_poi_share_spike flags initially observed for Hamburg were
-- diagnosed as a small-N artifact of that test's fixed 2x-ratio threshold at
-- Hamburg's finer Gebiet grain (23.6% of HH areas carry <20 POIs vs 2.4% for
-- BER PLRs) -- not evidence of a broken uniform-coverage assumption. The
-- dynamism_score itself was measured to be well-behaved: the smallest-POI
-- areas contribute zero >3SD extreme scores, and per-row extreme-value rates
-- are comparable across cities (~1.9% for both HH and BER). The test (not this
-- model) was fixed with a material-count floor -- see
-- transform/tests/test_c5_poi_share_spike.sql.
--
-- Methodology notes:
-- - Window functions over (snapshot_year) for z-scores: stddev returns NULL
-- when < 2 rows for that year. This is handled by NULLIF(stddev, 0) guard.
-- - share_yoy_change is computed within (area_code, area_vintage) to avoid
-- cross-vintage comparisons (PLR boundary change at 2021 reform).
-- The break is documented; cross-vintage interpolation is issue #51 (C3).
-- - Null handling: where total_poi_count is NULL (no POIs in that year/area)
-- z-scores are NULL. Downstream models treat NULL scores as missing data.
-- - Implementation: DuckDB does not support nested window functions, and its
-- binder fails when window functions are chained across multiple subquery layers
-- in a single SQL statement ("unordered_map::at: key not found" internal error).
-- Solution: plr_poi_share is pre-materialized in int_poi_share_base (separate
-- table model). This model applies LAG and z-scores in two subquery layers,
-- which is within DuckDB's supported depth (as confirmed by the original model).
--
-- Graceful degradation: returns zero rows when int_poi_features_pivot has no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_share_base_2021') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Subquery: apply LAG to pre-computed plr_poi_share and compute share_yoy_change.
    -- LAG is partitioned by (city_code, area_code, area_vintage). Because
    -- int_poi_share_base_2021 remaps all pre-2021 PLR codes to their 2021 equivalents
    -- and outputs area_vintage='lor_2021' for all rows, the LAG window now spans the
    -- 2020->2021 vintage boundary and produces non-NULL deltas at snapshot_year=2021.
    lag_base as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            total_poi_count,
            berlin_total_poi_count,
            plr_poi_share,
            lag(plr_poi_share) over (
                partition by city_code, area_code, area_vintage order by snapshot_year
            ) as plr_poi_share_prev_year,
            plr_poi_share - lag(plr_poi_share) over (
                partition by city_code, area_code, area_vintage order by snapshot_year
            ) as share_yoy_change
        from {{ ref("int_poi_share_base_2021") }}
    )

-- Compute all z-scores in a single pass using named WINDOW clauses.
-- DuckDB supports WINDOW ... AS (...) syntax for reusing window definitions.
-- status_score and dynamism_score use the same year-partition; combining them
-- in one SELECT avoids the CTE-chaining internal error described above.
select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    total_poi_count,
    berlin_total_poi_count,
    plr_poi_share,
    plr_poi_share_prev_year,
    share_yoy_change,
    -- Status z-score: how POI-rich relative to city-wide average this year?
    (total_poi_count - avg(total_poi_count) over w_year)
    / nullif(stddev(total_poi_count) over w_year, 0) as status_score,
    -- Dynamism z-score (C5): how fast is share changing relative to city-wide?
    -- Uses share_yoy_change instead of raw count delta to control for OSM
    -- completeness-bias (geo-DS approved 2026-06-19, C5-geo-signoff.md).
    -- Raw (unwinsorized) value kept for any consumer that needs the untrimmed
    -- z-score (QA-winsor, #268).
    (share_yoy_change - avg(share_yoy_change) over w_year)
    / nullif(stddev(share_yoy_change) over w_year, 0) as dynamism_score_raw,
    -- QA-winsor (#268, geo-DS approved -- docs/epic-c/QA-winsor-geo-signoff.md):
    -- winsorize dynamism_score at +/-3 SD so a handful of thin-PLR extreme
    -- observations (149 obs beyond +/-3 SD, range -5.1 to +13.4, per
    -- C6-geo-signoff.md) cannot swing downstream composites/maps/narratives.
    -- This is the value all downstream consumers (fct_gentrification_change,
    -- gentrification_index, E-series analysis) should use; dynamism_score_raw
    -- above is retained for diagnostics only.
    {{
        winsorize(
            "(share_yoy_change - avg(share_yoy_change) over w_year) / nullif(stddev(share_yoy_change) over w_year, 0)"
        )
    }}
    as dynamism_score
from lag_base
window w_year as (partition by city_code, snapshot_year)
