-- test_hc2_trajectory_window_invariant.sql
-- H-C2 (#159, docs/epic-h/159-hc2-geo-spike.md) regression guard: codifies the
-- load-bearing invariant fct_gentrification_trajectory's `ts` CTE window-trim
-- fix depends on -- the classification input span (last_edition -
-- first_edition) must never exceed `trajectory_window_years` (dbt var,
-- transform/dbt_project.yml, default 6) for any (city_code, area_code,
-- area_vintage). Prior to this test, the invariant was only checked by manual
-- one-off warehouse diffs during the H-C2 review; nothing would catch a
-- regression if `trajectory_window_years` changes, or a future Berlin LOR
-- vintage accumulates more than 6 years of editions.
--
-- This is a structural invariant of the fix itself, not a data-quality
-- anomaly, so it is enforced at error severity (inline config below) --
-- unlike the C5 anomaly-detection singular tests (test_c5_poi_share_spike.sql,
-- test_c5_poi_count_drop.sql), which use warn severity configured in
-- dbt_project.yml.
--
-- Returns rows that violate the invariant; zero rows = test passes.
{{ config(severity='error') }}

select
    city_code,
    area_code,
    area_vintage,
    first_edition,
    last_edition,
    (last_edition - first_edition) as observed_span_years
from {{ ref('fct_gentrification_trajectory') }}
where (last_edition - first_edition) > {{ var('trajectory_window_years', 6) }}
