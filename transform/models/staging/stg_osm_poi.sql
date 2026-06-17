-- STUB — populated by Epic B2/C ingestion (not yet landed).
-- See ADR-0002 (OSM POI history sourcing via ohsome API / full-history PBF).
-- Returns zero rows with the target schema declared so downstream models
-- compile and the dbt graph builds end-to-end.
-- When Epic C ingestion lands, replace this stub with the real read_parquet()
-- call against data/raw/osm/<city>/<year>.parquet.
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
    cast(null as integer) as snapshot_year,
    cast(null as varchar) as osm_id,
    cast(null as varchar) as poi_domain,
    cast(null as varchar) as poi_category,
    cast(null as varchar) as poi_type,
    cast(null as double) as lon,
    cast(null as double) as lat,
    cast(null as varchar) as source_attribution
where false
