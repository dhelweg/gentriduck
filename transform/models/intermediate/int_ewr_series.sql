-- int_ewr_series.sql
-- Intermediate model: EWR socio-economic time series joined to the conformed
-- area dimension (ADR-0005).
--
-- Selects from stg_berlin_ewr (long-format, PLR grain, 13 indicators) and
-- inner-joins dim_area to validate that each area_code exists in the warehouse.
--
-- Graceful-degradation: stg_berlin_ewr returns zero rows when no parquet files
-- have been ingested yet.  dim_area currently only contains BZR / PLR rows from
-- the 2018 thesis golden (city_code='BER', uppercase).  Because stg_berlin_ewr
-- uses city_code='berlin' (lowercase, ADR-0005 C1 convention) and dim_area
-- currently only holds 'BER' rows, the inner join intentionally returns zero
-- rows until EITHER (a) EWR data is ingested AND (b) dim_area is extended with
-- lowercase 'berlin' PLR rows from stg_berlin_lor.  This is correct and
-- expected; dbt build passes with zero rows.
--
-- When both conditions are met, each output row represents one indicator
-- observation for one PLR area for one reference year, with area metadata
-- (level_name, area_name) from dim_area attached.
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

select
    ewr.city_code,
    ewr.area_code,
    ewr.area_vintage,
    ewr.reference_year,
    ewr.reference_date,
    ewr.indicator,
    ewr.indicator_value,
    ewr.source_attribution,
    da.area_name,
    da.area_level,
    da.level_name
from {{ ref("stg_berlin_ewr") }} as ewr
inner join
    {{ ref("dim_area") }} as da
    on ewr.city_code = da.city_code
    and ewr.area_code = da.area_code
