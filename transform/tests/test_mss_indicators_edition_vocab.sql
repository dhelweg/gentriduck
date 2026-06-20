-- test_mss_indicators_edition_vocab.sql
-- Validates the documented transferbezug suspension in stg_berlin_mss_indicators.
--
-- WFS discovery (ingest_mss_indicators.py docstring):
-- transferbezug_anteil / transferbezug_dynamik use column 's2_x'/'d2_x' in 2019/2021,
-- which the WFS publishes as always null (the indicator was suspended in those
-- editions).
-- In 2015/2017 the column had real values; in 2023+ it is restored as 's2'/'d2'.
--
-- Note: ADR-0006 stated "3 indicators through 2021, 4 from 2023 (alleinerziehende
-- added)".
-- WFS probing found alleinerziehende_anteil was present in ALL editions (not added in
-- 2023),
-- and transferbezug is the one with null values specifically in 2019 and 2021.
-- This test enforces the 2019/2021 null pattern and the 2023+ non-null restoration.
--
-- Conditioned on data presence so the graceful-degradation stub passes.
-- Returns rows for any violation of the expected null/non-null pattern.
--
-- ADR-0007 Consequences: "A dbt test asserts the indicator vocabulary per edition
-- so the break is visible and tested, not smoothed over."
{{ config(severity='error') }}

with
    transferbezug as (
        select edition, count(*) as total_plr, count(indicator_value) as non_null_count
        from {{ ref('stg_berlin_mss_indicators') }}
        where area_code is not null and indicator = 'transferbezug_anteil'
        group by edition
    )

-- 2019 and 2021 must have all-null transferbezug (WFS column 's2_x' suspended)
select
    edition,
    non_null_count,
    0 as expected,
    'transferbezug_anteil must be all-null in editions 2019 and 2021 (s2_x suspension)'
    as reason
from transferbezug
where edition in (2019, 2021) and non_null_count > 0

union all

-- 2023 and 2025 must have non-null transferbezug (column 's2' restored)
select
    edition,
    non_null_count,
    total_plr as expected,
    'transferbezug_anteil should have non-null values in editions 2023 and 2025'
    as reason
from transferbezug
where edition in (2023, 2025) and non_null_count = 0 and total_plr > 0
