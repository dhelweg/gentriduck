-- test_mss_plr_row_count.sql
-- R-A3 row-count reconciliation: assert that each ingested MSS edition contains
-- the expected number of PLR rows (447 pre-2021, 542 from 2021), within ±5 tolerance.
--
-- Joins ingested data to seed_mss_expected_counts. Only editions present in the
-- ingested data are checked — missing editions (not yet ingested) do not fail.
--
-- Returns rows where the actual PLR count deviates from expected by >5.
-- Zero rows = test passes (dbt error severity).
--
-- ADR-0006: Berlin MSS WFS ingestion (dl-de-zero-2.0 licence)
with
    actual_counts as (
        select edition, count(*) as actual_plr_count
        from {{ ref("stg_berlin_mss") }}
        where area_code is not null
        group by edition
    ),

    expected as (
        select edition, expected_plr_count, lor_vintage
        from {{ ref("seed_mss_expected_counts") }}
    ),

    joined as (
        select
            a.edition,
            a.actual_plr_count,
            e.expected_plr_count,
            abs(a.actual_plr_count - e.expected_plr_count) as deviation
        from actual_counts as a
        inner join expected as e on a.edition = e.edition
    )

select edition, actual_plr_count, expected_plr_count, deviation
from joined
where deviation > 5
