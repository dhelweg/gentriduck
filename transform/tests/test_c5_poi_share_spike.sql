-- test_c5_poi_share_spike.sql
-- C5 anomaly test: detect PLR-years where poi share exceeds 2x the 5-year rolling
-- average.
-- Rapid share growth may indicate either genuine gentrification or a late-mapping
-- burst.
-- Returns rows that violate the threshold; zero rows = test passes.
-- Severity: warn (configured in dbt_project.yml).
--
-- Uses a CTE-materialization approach to compute rolling averages before filtering,
-- because DuckDB does not allow window functions in WHERE clauses.
--
-- Material-count floor (H-C1 #158, see docs/epic-h/158-hc1-geo-spike.md R1): the
-- ratio-only test is grain-dependent -- fine-grained areas (e.g. Hamburg's ~940
-- Gebiete vs Berlin's ~542 PLRs) have far more low-POI areas (23.6% of HH areas
-- have <20 POIs vs 2.4% for BER), so small absolute POI fluctuations mechanically
-- trip the 2x share-ratio threshold with no real-world significance. A single
-- global `total_poi_count >= 30` floor (a city-agnostic constant, not a per-city
-- parameter) suppresses this small-N noise for every city while leaving the
-- ratio logic itself untouched. Measured effect: BER flags 75->47, HH flags
-- 77->45, equalizing the post-2016 tail across cities.
with
    share_with_rolling as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            total_poi_count,
            plr_poi_share,
            avg(plr_poi_share) over (
                partition by city_code, area_code
                order by snapshot_year
                rows between 4 preceding and current row
            ) as rolling_5yr_avg_share
        from {{ ref("int_poi_status_dynamism") }}
        where plr_poi_share is not null
    )

select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    total_poi_count,
    plr_poi_share,
    rolling_5yr_avg_share,
    plr_poi_share / nullif(rolling_5yr_avg_share, 0) as share_to_rolling_ratio
from share_with_rolling
where
    rolling_5yr_avg_share > 0
    and plr_poi_share > 2 * rolling_5yr_avg_share
    and total_poi_count >= 30  -- material-count floor, see header note above
