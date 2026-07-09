-- int_ewr_series.sql
-- Intermediate model: EWR socio-economic time series joined to the conformed
-- area dimension (ADR-0005).
--
-- Selects from stg_berlin_ewr (long-format, PLR grain, 13 indicators) and
-- inner-joins dim_area to validate that each area_code exists in the warehouse.
--
-- QA-4 (#179): stale-comment fix -- stg_berlin_ewr normalises to canonical
-- city_code='BER' (uppercase, ADR-0005) at its own staging boundary, NOT
-- lowercase 'berlin' as this comment previously (incorrectly) claimed. This
-- model is self-documented DEAD CODE (see int_ewr_socioeco.sql's header and
-- QA-6/#181, which tracks its removal) -- int_ewr_socioeco reads from
-- int_berlin_ewr_plr2021 instead. Left in place, comment corrected only, since
-- deletion is QA-6's scope, not this ticket's.
--
-- Graceful-degradation: stg_berlin_ewr returns zero rows when no parquet files
-- have been ingested yet.
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
