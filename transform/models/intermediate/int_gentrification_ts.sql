-- int_gentrification_ts.sql
-- C4 intermediate: time-series gentrification index combining POI development
-- and EWR socio-economic data.
--
-- *** GEO-DATA-SCIENTIST SIGN-OFF REQUIRED before merging (issue #24) ***
-- Methodology decisions requiring expert review:
-- 1. Weight choice: status_score, dynamism_score, ewr_composite are averaged
-- equally (weight = 1/3 each). Alternative: weighted sum (e.g., thesis used
-- different emphasis per domain). Geo-DS should confirm or adjust weights.
-- 2. Z-score normalisation: each component is already z-scored in its upstream
-- model; the gentrification_score here is their arithmetic mean. This means
-- each component contributes equally regardless of its raw scale.
-- 3. Cross-vintage handling: YoY deltas in dynamism_score are computed within
-- area_vintage (in int_poi_status_dynamism). This produces a NULL dynamism_score
-- for the first year of each vintage (2008 for lor_pre2021, 2021 for lor_2021).
-- Cross-vintage interpolation is issue #51 (not in scope here).
-- 4. EWR coverage sparsity: EWR data starts 2015 (earlier years available in
-- raw parquets but not ingested by default). Years < 2015 will have NULL
-- ewr_composite; gentrification_score for those years is NULL. The model
-- correctly propagates NULLs rather than substituting 0.
-- 5. EWR NULL from suppression: PLRs with suppressed cells in key indicators
-- will have NULL ewr_composite. gentrification_score is NULL for those PLRs
-- in that year. This is intentional -- do not impute.
--
-- C5 note: dynamism_score is now the z-score of share_yoy_change (PLR POI share
-- delta), not raw count delta. poi.total_poi_count_prev_year and poi.yoy_change
-- are replaced by poi.plr_poi_share_prev_year and poi.share_yoy_change.
-- Geo-DS C5 sign-off: PASS (docs/epic-c/C5-geo-signoff.md, 2026-06-19).
--
-- Join strategy:
-- POI data (int_poi_status_dynamism): city_code='berlin', snapshot_year, area_code
-- EWR data (int_ewr_socioeco):        city_code='BER',    reference_year, area_code
-- The city_code mismatch (ingestion convention) is handled here by joining
-- on area_code + year only, with city_code fixed to 'BER' in output
-- (canonical ADR-0005 code for Berlin).
-- Only areas that appear in both POI and EWR data produce a row; areas with
-- POI data only still appear (LEFT JOIN from POI side) with NULL ewr scores.
--
-- Output grain: (city_code, area_code, area_vintage, snapshot_year) -- one row
-- per PLR per year. Years with no POI data are absent (POI is the left side).
--
-- Graceful degradation: returns zero rows when either upstream has no rows.
--
-- dbt_meta_owner: data-engineer
-- geo-ds-sign-off: PENDING (issue #24)
-- depends_on: {{ ref('int_poi_status_dynamism') }}
-- depends_on: {{ ref('int_ewr_socioeco') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    poi as (select * from {{ ref("int_poi_status_dynamism") }}),

    ewr as (select * from {{ ref("int_ewr_socioeco") }}),

    joined as (
        select
            'BER' as city_code,
            poi.snapshot_year,
            poi.area_code,
            poi.area_vintage,
            poi.total_poi_count,
            -- C5: use share-based columns instead of raw count columns.
            poi.plr_poi_share_prev_year,
            poi.share_yoy_change,
            poi.status_score,
            poi.dynamism_score,
            ewr.ewr_composite,
            ewr.foreigners_share,
            ewr.age_under18_share,
            ewr.migration_background_share,
            ewr.mean_age_years,
            ewr.residence_duration_5y_share,
            ewr.residents_total,
            -- Gentrification score: equal-weight mean of the three z-scored components.
            -- ewr_composite is NEGATED: high vulnerability (high ewr_composite) means
            -- the area is NOT YET gentrified; gentrified areas have displaced
            -- vulnerable
            -- populations and show low ewr_composite. Negating aligns the sign with
            -- status_score and dynamism_score (high = more gentrified).
            -- All five ewr_composite inputs are vulnerability-positive; single outer
            -- negation is the only sign flip.
            -- NULL if any component is NULL (sparse EWR coverage or suppressed cells).
            -- Geo-DS C4 sign-off: PASS WITH CONDITIONS (docs/epic-c/C4-geo-signoff.md).
            (poi.status_score + poi.dynamism_score - ewr.ewr_composite)
            / 3.0 as gentrification_score
        from poi
        left join
            ewr
            on poi.area_code = ewr.area_code
            and poi.snapshot_year = ewr.reference_year
            -- Note: area_vintage may differ between POI (snap_year <= 2020 ->
            -- lor_pre2021)
            -- and EWR (reference_year <= 2020 -> lor_pre2021) -- both should match
            -- since vintage is assigned by year in both pipelines.
            and poi.area_vintage = ewr.area_vintage
    )

select *
from joined
