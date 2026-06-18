-- stg_berlin_kauffaelle.sql
-- DEPRECATED: renamed to stg_berlin_verkaufte_grundstuecke per ADR-0003 item 10.
-- Delete this file and use stg_berlin_verkaufte_grundstuecke instead.
-- TODO: git rm transform/models/staging/stg_berlin_kauffaelle.sql
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

select *
from {{ ref("stg_berlin_verkaufte_grundstuecke") }}
