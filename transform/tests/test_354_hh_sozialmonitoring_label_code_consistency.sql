-- test_354_hh_sozialmonitoring_label_code_consistency.sql
-- #354/#355 phase A, prerequisite §2.1(4): internal label <-> code check for
-- Hamburg Sozialmonitoring (index-definition.md §3.4 "cheap internal
-- cross-check", Hamburg analogue of test_mss_gesamtindex_consistency).
--
-- The source publishes three labels per Gebiet and edition: statusindex,
-- dynamikindex and the combined gesamtindex ("Status <status> - Dynamik
-- <+|0|->"). The check asserts, row by row in int_hamburg_sozialmonitoring_index:
-- 1. gesamtindex_label = 'Status ' || status_index_label || ' - Dynamik ' || sym
-- with sym = '+' for positiv, '0' for stabil, '-' for negativ;
-- 2. status_index_label -> status_index is hoch 1, mittel 2, niedrig 3,
-- sehr niedrig 4; dynamik_index_label -> dynamik_index is positiv 1,
-- stabil 2, negativ 3 (the mapping signed off in #40, H1 geo/domain
-- sign-offs, and confirmed against the published Status-/Dynamik-summe
-- ordering, docs/epic-e/354-phase-a-data-prerequisites.md §4).
-- Returns the offending rows; severity error.
{{ config(severity="error") }}

select
    edition,
    area_code,
    gesamtindex_label,
    status_index_label,
    status_index,
    dynamik_index_label,
    dynamik_index
from {{ ref("int_hamburg_sozialmonitoring_index") }}
where
    gesamtindex_label is distinct from (
        'Status '
        || status_index_label
        || ' - Dynamik '
        || case
            dynamik_index_label
            when 'positiv'
            then '+'
            when 'stabil'
            then '0'
            when 'negativ'
            then '-'
        end
    )
    or status_index is distinct from case
        status_index_label
        when 'hoch'
        then 1
        when 'mittel'
        then 2
        when 'niedrig'
        then 3
        when 'sehr niedrig'
        then 4
    end
    or dynamik_index is distinct from case
        dynamik_index_label
        when 'positiv'
        then 1
        when 'stabil'
        then 2
        when 'negativ'
        then 3
    end
