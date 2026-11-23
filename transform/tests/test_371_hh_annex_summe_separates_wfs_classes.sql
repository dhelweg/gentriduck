-- test_371_hh_annex_summe_separates_wfs_classes.sql
-- #371, ADR-0014 Amendment 2026-11-02 ("reconcile with the WFS Sozialmonitoring
-- classes"): the annex Status-summe (sum of S1-S7 z) and Dynamik-summe (sum of
-- D1-D6 z) must separate the WFS classes of int_hamburg_sozialmonitoring_index in
-- the coded order, per edition: every Gebiet of status code k has a lower
-- Status-summe than every Gebiet of code k+1 (1 = hoch ... 4 = sehr niedrig), and
-- likewise for Dynamik (1 = positiv, 2 = stabil, 3 = negativ). This is the
-- row-level form of the phase-A §4 sign check. It guards the Gebiet join
-- (annex gebiet_id <-> WFS area_code per edition) and the class-code order of
-- int_hamburg_sozialmonitoring_index. It does not check the indicator columns:
-- it uses the published Status-/Dynamik-summe columns, not the S/D z-scores
-- (those are covered by test_371_hh_annex_summe_reproduction).
-- Returns one row per (edition, index, adjacent class pair) that overlaps.
{{ config(severity="error") }}

with
    annex as (
        select distinct
            edition_year as edition, gebiet_id as area_code, status_summe, dynamik_summe
        from {{ ref("stg_hamburg_sozialmonitoring_indicators") }}
    ),

    joined as (
        select a.*, i.status_index, i.dynamik_index
        from annex as a
        inner join
            {{ ref("int_hamburg_sozialmonitoring_index") }} as i
            on a.edition = i.edition
            and a.area_code = i.area_code
    ),

    ranges as (
        select
            edition,
            'status' as index_name,
            status_index as code,
            min(status_summe) as lo,
            max(status_summe) as hi
        from joined
        group by all
        union all
        select
            edition,
            'dynamik' as index_name,
            dynamik_index as code,
            min(dynamik_summe) as lo,
            max(dynamik_summe) as hi
        from joined
        group by all
    )

select
    a.edition,
    a.index_name,
    a.code,
    a.hi as hi_code,
    b.code as next_code,
    b.lo as lo_next
from ranges as a
inner join
    ranges as b
    on a.edition = b.edition
    and a.index_name = b.index_name
    and b.code = a.code + 1
where a.hi >= b.lo
