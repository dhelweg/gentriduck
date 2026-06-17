-- dim_city: conformed city dimension (ADR-0005 city-agnostic seam).
-- One row per city. Currently Berlin only; seam designed for multi-city
-- expansion (Epic H) — adding a city is a new seed row + adapter, no model change.
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

select *
from {{ ref("seed_dim_city") }}
