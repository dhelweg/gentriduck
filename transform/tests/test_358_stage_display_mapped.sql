-- test_358_stage_display_mapped.sql
-- #358 (docs/epic-g/358-spec.md Rev. 1 §1; geo review C1/C2): no unmapped stage
-- value. For every stage key a stage mart emits (typology_stage / dominant_stage),
-- the typology_stage_display() columns must be:
-- - for one of the six D1xD2 keys (ADR-0008; index-definition.md §1.3/§1.5): a
-- number 1-6 and a label that starts with that same number followed by ' · ';
-- - for NULL or the roll-up bucket 'uninhabited / no data': NULL number and the
-- label 'No stage on record';
-- - anything else (a new, unmapped key): a failure, so a stage key added upstream
-- can never reach the site unlabelled.
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
    )

select
    model_name, stage_column, stage_key, stage_number, stage_label, count(*) as n_rows
from emitted
-- coalesce(..., false): a NULL comparison (e.g. a NULL label on a valid key) must
-- count as a violation, not silently drop out of the WHERE.
where
    not coalesce(
        (
            stage_key in (
                'pre-gentrification',
                'improving-vulnerable',
                'pioneer-signal',
                'active-gentrification',
                'consolidation-pressure',
                'stable-established'
            )
            and stage_number between 1 and 6
            and stage_label like cast(stage_number as varchar) || ' · %'
        )
        or (
            (stage_key is null or stage_key = 'uninhabited / no data')
            and stage_number is null
            and stage_label = 'No stage on record'
        ),
        false
    )
group by model_name, stage_column, stage_key, stage_number, stage_label
