-- STUB — populated by Epic B2/C ingestion (not yet landed).
-- See ADR-0003 (Berlin geographies + open sources: EWR per-PLR from
-- daten.berlin.de, CC BY 3.0 DE, published by Amt fur Statistik Berlin-Brandenburg).
-- Returns zero rows with the target schema declared so downstream models
-- compile and the dbt graph builds end-to-end.
-- When Epic B2/C3b ingestion lands, replace this stub with the real read_parquet()
-- or read_csv() call against data/raw/berlin/ewr/<year>/*.csv.
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

select
    cast(null as varchar) as city_code,
    cast(null as varchar) as area_code,
    cast(null as integer) as reference_year,
    cast(null as varchar) as indicator,
    cast(null as double) as indicator_value,
    cast(null as varchar) as source_attribution
where false
