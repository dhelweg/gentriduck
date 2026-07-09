-- int_berlin_lor_crosswalk_dominant_2021.sql
-- QA-7b (#205, split from #182): dominant (max-weight) pre-2021 <-> 2021 PLR crosswalk.
--
-- Extracted from analysis/e1_regressions.py's inline `xw_dominant` CTE (previously
-- embedded
-- in load_ewr_lead_lag_data). This is spatial-aggregation methodology -- picking a
-- single
-- representative pre-2021 PLR per lor_2021 PLR -- not analysis-script plumbing, so it
-- belongs
-- in a gated dbt intermediate rather than inline SQL in a Python script (R-C1).
--
-- Why "dominant" (max-weight), not areal-weighted apportionment:
-- int_berlin_ewr_plr2021 (the EWR alignment model) uses full areal-weighted
-- apportionment
-- (SUM(indicator_value * weight) across ALL contributing pre-2021 PLRs) because EWR
-- indicators
-- are counts/shares that can be validly split and re-summed across a fractional area
-- overlap.
-- e1_regressions.py's H2/H3 EWR-lead-lag comparison instead needs to bridge lor_2021
-- EWR rows
-- to lor_pre2021 POI-count rows (int_poi_features_pivot only has lor_pre2021 area
-- codes for
-- years < 2021) via a 1:1 join key -- POI counts are area-level integers keyed to a
-- specific
-- PLR polygon, not a quantity that can be fractionally apportioned across multiple
-- pre-2021
-- PLRs without double- or under-counting. Taking the single dominant
-- (largest-overlap-share)
-- pre-2021 PLR per lor_2021 PLR is the standard simplification for this "closest
-- single areal
-- match" bridging need (see e.g. crosswalk practice in areal interpolation
-- literature, e.g.
-- Goodchild & Lam 1980 areal-weighting review) -- it is a *representative-unit*
-- choice, not an
-- apportionment, so max-weight (largest shared area) is the correct selection
-- criterion.
--
-- Pseudo-replication caveat (grounding, R-C2): ~78 pre-2021 PLRs are the dominant
-- match for 2+
-- lor_2021 PLRs (up to 6 each), meaning ~35% of lor_2021 PLRs share their bridged
-- poi_count
-- with at least one neighbour. This inflates effective N in any regression that
-- treats each
-- lor_2021 PLR as an independent observation. e1_regressions.py's H2/H3 EWR
-- comparison must
-- continue to report these results as directional evidence, not independent-observation
-- p-values (unchanged from the pre-extraction docstring in load_ewr_lead_lag_data).
--
-- Output grain: one row per plr_id_2021 (all 542 lor_2021 PLRs resolve to exactly one
-- dominant
-- pre-2021 PLR -- ROW_NUMBER() ORDER BY weight DESC, rn = 1 breaks all ties
-- deterministically
-- by picking the first plr_id_pre2021 in DuckDB's default row order, matching the
-- pre-extraction
-- behaviour exactly since no explicit tie-break column existed before either).
--
-- Materialization: table, not view -- this is read by a Python analysis script via a
-- plain
-- SELECT, not chained through further dbt views, so a view would work too; table is
-- chosen for
-- consistency with the other LOR-crosswalk-consuming intermediate
-- (int_berlin_ewr_plr2021) and
-- because dbt_utils.unique tests are cheaper against a materialized table.
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    crosswalk as (
        select *
        from {{ ref("seed_lor_crosswalk_2006_to_2021") }}
        -- Exclude the stub placeholder row (dummy codes 00000000), same exclusion as
        -- int_berlin_ewr_plr2021.
        where mapping_type != 'stub'
    ),

    ranked as (
        select
            plr_id_2021,
            plr_id_pre2021,
            weight,
            row_number() over (partition by plr_id_2021 order by weight desc) as rn
        from crosswalk
    )

select
    cast('BER' as varchar) as city_code,
    plr_id_2021,
    plr_id_pre2021,
    weight as dominant_weight
from ranked
where rn = 1
