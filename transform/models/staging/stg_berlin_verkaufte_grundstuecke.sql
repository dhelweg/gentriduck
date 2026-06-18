-- stg_berlin_verkaufte_grundstuecke.sql
-- D1 STUB: Verkaufte Grundstücke (Kauffälle) 2024 — WFS endpoint not yet discovered.
--
-- During D1 implementation (2026-06-18), the expected WFS endpoint
-- https://gdi.berlin.de/services/wfs/kauffaelle2024
-- returned HTTP 404 Not Found.
--
-- The correct endpoint URL needs to be manually discovered from the dataset
-- page on daten.berlin.de. See GitHub issue:
-- D1b: discover Verkaufte Grundstücke WFS endpoint + implement ingestion.
--
-- This stub model always returns zero rows with the target schema so that
-- uv run poe build passes while ingestion is pending.
--
-- Planned output columns (once the WFS is available):
-- reference_date     date     -- 2024-01-01 (or the actual WFS reference date)
-- city_code          varchar  -- 'berlin' (ADR-0005)
-- geometry_wkb       blob     -- geometry WKB, EPSG:25833
-- transaction_id     varchar  -- feature identifier
-- price_eur          double   -- transaction price in EUR
-- area_m2            double   -- area in m2 (if available)
-- nutzung            varchar  -- land use / property type
-- source_attribution varchar  -- dl-de-zero-2.0 attribution
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

-- STUB: WFS endpoint returned 404 on 2026-06-18. See issue D1b.
select
    cast(null as date) as reference_date,
    cast(null as varchar) as city_code,
    cast(null as blob) as geometry_wkb,
    cast(null as varchar) as transaction_id,
    cast(null as double) as price_eur,
    cast(null as double) as area_m2,
    cast(null as varchar) as nutzung,
    cast(null as varchar) as source_attribution
where false
