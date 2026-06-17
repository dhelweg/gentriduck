-- STUB — populated by Epic B2/C ingestion (not yet landed).
-- See ADR-0003 (Berlin geographies: LOR geometries from gdi.berlin.de WFS,
-- CC BY 3.0 DE, ingested via ingestion/berlin/geographies/).
-- Returns zero rows with the target schema declared so downstream models
-- compile and the dbt graph builds end-to-end.
-- When Epic B2/C ingestion lands, replace this stub with the real read_parquet()
-- call against data/raw/berlin/geographies/<vintage>/*.parquet.
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

select
    cast(null as varchar) as city_code,
    cast(null as varchar) as lor_vintage,
    cast(null as varchar) as area_level,
    cast(null as varchar) as area_code,
    cast(null as varchar) as area_name,
    cast(null as varchar) as parent_area_code,
    cast(null as varchar) as geometry_wkt,
    cast(null as varchar) as source_attribution
where false
