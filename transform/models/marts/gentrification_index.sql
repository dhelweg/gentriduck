-- Mart: governed gentrification index per area × period × variant (ADR-0004).
-- This is the core output table of the Gentriduck warehouse. The index definition
-- is governed: inputs, formula, per-city parameters, and limitations are documented
-- in ADR-0004 and in the public methodology page (Epic G2).
--
-- Current state (Epic B baseline): sourced entirely from the 2018 thesis goldens
-- via int_thesis_2018_area_index. When Epic B3/C re-computes the index from
-- fresh OSM/EWR inputs, the intermediate model is updated and this mart re-builds
-- without schema changes (mart contract is stable).
--
-- Contract (ADR-0004): column names and types below are the governed contract.
-- Changes require a deliberate contract edit and reviewer sign-off.
{{
    config(
        materialized="table",
        contract={"enforced": true},
        meta={
            "dbt_meta_owner": "data-engineer",
            "governed_definition": "ADR-0004",
            "index_inputs": (
                "status_index (POI-based status z-score), "
                "dynamik_index (POI-based dynamik z-score), "
                "own_idx_class (socio-economic index from EWR k11/dau5/dau10/d2/ea/mh/ee)"
            ),
            "index_period": "201612 (current), 201412 (previous) from 2018 thesis golden",
            "directional_baseline": True,
        },
    )
}}

select
    city_code,
    area_level,
    area_code,
    area_name,
    period_yyyymm,
    variant,
    population,
    status_index,
    status_class,
    status_class_bi,
    dynamik_index,
    dynamik_class,
    dynamik_class_bi,
    own_idx_class,
    own_idx_class_bi
from {{ ref("int_thesis_2018_area_index") }}
