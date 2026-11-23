-- test_358_stage_display_mapped.sql
-- #358 (docs/epic-g/358-spec.md Rev. 1 §1; geo review C1/C2): no unmapped stage
-- value. For every stage key a stage mart emits (typology_stage / dominant_stage),
-- the typology_stage_display() columns must EXACTLY match one of the pinned
-- (stage_key, stage_number, stage_label) triples of spec §1 (the `expected` CTE):
-- - the six D1xD2 keys (ADR-0008; index-definition.md §1.3/§1.5) -> 1-6 + label;
-- - NULL and the roll-up bucket 'uninhabited / no data' -> NULL number, label
-- 'No stage on record'.
-- A key with no triple (a new, unmapped key) or a number/label that differs from
-- its triple (e.g. pioneer-signal mapped to '4 · Active gentrification') is a
-- failure, so a stage key can never reach the site unlabelled or mislabelled.
-- (gentrification_index rows are checked for variant='live_data' only; the other
-- variants are NULL by construction, asserted in
-- test_358_status_trend_live_data_only.sql.)
--
-- Returns rows that VIOLATE the invariant. Zero rows = pass.
with
    emitted as (
        select
            'gentrification_index' as model_name,
            'typology_stage' as stage_column,
            typology_stage as stage_key,
            stage_number,
            stage_label
        from {{ ref("gentrification_index") }}
        where variant = 'live_data'
        union all
        select
            'fct_gentrification_change' as model_name,
            'typology_stage' as stage_column,
            typology_stage,
            stage_number,
            stage_label
        from {{ ref("fct_gentrification_change") }}
        union all
        select
            'fct_gentrification_trajectory' as model_name,
            'dominant_stage' as stage_column,
            dominant_stage,
            dominant_stage_number,
            dominant_stage_label
        from {{ ref("fct_gentrification_trajectory") }}
        union all
        select
            'mart_mss_area_aggregate' as model_name,
            'typology_stage' as stage_column,
            typology_stage,
            stage_number,
            stage_label
        from {{ ref("mart_mss_area_aggregate") }}
        union all
        select
            'mart_ortsteil_plr_stage_mix' as model_name,
            'typology_stage' as stage_column,
            typology_stage,
            stage_number,
            stage_label
        from {{ ref("mart_ortsteil_plr_stage_mix") }}
        union all
        select
            'mart_area_rollup_stage_mix' as model_name,
            'typology_stage' as stage_column,
            typology_stage,
            stage_number,
            stage_label
        from {{ ref("mart_area_rollup_stage_mix") }}
        union all
        select
            'mart_area_rollup_stage_mix' as model_name,
            'dominant_stage' as stage_column,
            dominant_stage,
            dominant_stage_number,
            dominant_stage_label
        from {{ ref("mart_area_rollup_stage_mix") }}
    ),

    expected as (
        select t.stage_key, t.stage_number, t.stage_label
        from
            (
                values
                    ('pre-gentrification', 1, '1 · Pre-gentrification'),
                    (
                        'improving-vulnerable',
                        2,
                        '2 · Improving from very low status (ambiguous)'
                    ),
                    ('pioneer-signal', 3, '3 · Pioneer signal'),
                    ('active-gentrification', 4, '4 · Active gentrification'),
                    ('consolidation-pressure', 5, '5 · Consolidation'),
                    ('stable-established', 6, '6 · Stable / established'),
                    (null, null, 'No stage on record'),
                    ('uninhabited / no data', null, 'No stage on record')
            ) as t(stage_key, stage_number, stage_label)
    )

select
    em.model_name,
    em.stage_column,
    em.stage_key,
    em.stage_number,
    em.stage_label,
    ex.stage_number as expected_stage_number,
    ex.stage_label as expected_stage_label,
    count(*) as n_rows
from emitted as em
-- IS NOT DISTINCT FROM so the NULL-key triple matches NULL keys.
left join expected as ex on em.stage_key is not distinct from ex.stage_key
where
    ex.stage_label is null  -- unmapped key: no pinned triple
    or em.stage_number is distinct from ex.stage_number
    or em.stage_label is distinct from ex.stage_label
group by all
