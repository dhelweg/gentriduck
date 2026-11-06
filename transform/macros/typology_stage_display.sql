{#
  typology_stage_display.sql
  #358 (Epic G, spec docs/epic-g/358-spec.md Revision 1, §1 + geo review C1/C2): the
  single source of truth for the PUBLIC display of a D1xD2 typology stage key -- a cycle
  position number (stage_number, 1-6) and an exact public label (stage_label). Replaces
  the ~30 copies of a label CASE + "pressure severity" stage_sort the web layer carried.

  Pure display mapping: it does NOT change the classification. The stage keys, the D1xD2
  matrix and every threshold stay exactly as in typology_stage.sql (ADR-0008 D1xD2
  typology matrix; index-definition.md §1.3/§1.5). Keyed only on the stage key, so it is
  city-agnostic and applies unchanged to Berlin MSS and Hamburg Sozialmonitoring stages
  (ADR-0005).

  R-C2 grounding of the ORDER (an interpretive ordering, hence methodology-bearing):
  the numbers follow the status ascent of the double invasion-succession cycle
  (Dangschat 1988; index-definition.md §9):
    1 pre-gentrification     -- Dangschat stage 0: low/middle status, stable or worsening;
                                includes filtering-down (middle status worsening), i.e. the
                                rent-gap PRECONDITION (Smith 1979), not an upgrading signal.
    2 improving-vulnerable   -- lowest status rung improving; a named tension cell, not a
                                process stage (index-definition.md §1.3), placed before 3
                                because it sits one status rung lower on the same ascent.
    3 pioneer-signal         -- Dangschat stage 1: social invasion in a low-status area
                                (Clay 1979 "pioneer" phase).
    4 active-gentrification  -- Dangschat stage 2: middle status still improving; social
                                succession with commercial succession visible (Clay 1979
                                "expanding" phase).
    5 consolidation-pressure -- Dangschat stage 3: high status still improving; upgrading
                                consolidating (Clay 1979 "maturing" phase). The public label
                                drops "pressure"; the KEY stays as a data contract.
    6 stable-established     -- settled middle/high status without an upgrading trend: after
                                the cycle or never part of it (incl. the high-status-
                                worsening tension cell: decline, not gentrification).
  Stages 2-5 are exactly the Dynamik = 1 (positiv) column of the D1xD2 matrix in descending
  status-rung order 4, 3, 2, 1 (geo review §2). The number is a POSITION, not a timetable:
  it implies no deterministic progression (spec §5 stage-number legend).

  NULL and the literal roll-up bucket 'uninhabited / no data' (mart_area_rollup_stage_mix,
  mart_ortsteil_plr_stage_mix) both map to 'No stage on record' with a NULL number (geo
  review C2), which sorts after every digit-prefixed label.

  Any OTHER (unmapped) value yields NULL for BOTH columns, so the not_null tests on
  stage_label and the singular test test_358_stage_display_mapped.sql catch it rather
  than silently labelling it.

  Labels use the middle dot with spaces ("1 · "), exact strings per spec §1.
#}
{% macro typology_stage_number(stage_col) %}
    cast(
        case
            {{ stage_col }}
            when 'pre-gentrification'
            then 1
            when 'improving-vulnerable'
            then 2
            when 'pioneer-signal'
            then 3
            when 'active-gentrification'
            then 4
            when 'consolidation-pressure'
            then 5
            when 'stable-established'
            then 6
        end as integer
    )
{% endmacro %}

{% macro typology_stage_label(stage_col) %}
    case
        when {{ stage_col }} is null or {{ stage_col }} = 'uninhabited / no data'
        then 'No stage on record'
        when {{ stage_col }} = 'pre-gentrification'
        then '1 · Pre-gentrification'
        when {{ stage_col }} = 'improving-vulnerable'
        then '2 · Improving from very low status (ambiguous)'
        when {{ stage_col }} = 'pioneer-signal'
        then '3 · Pioneer signal'
        when {{ stage_col }} = 'active-gentrification'
        then '4 · Active gentrification'
        when {{ stage_col }} = 'consolidation-pressure'
        then '5 · Consolidation'
        when {{ stage_col }} = 'stable-established'
        then '6 · Stable / established'
    end
{% endmacro %}

{#
  typology_stage_display(stage_col, prefix="") emits TWO aliased select-list columns,
  `<prefix>stage_number` and `<prefix>stage_label`. `prefix` lets the same macro serve
  `dominant_stage` (prefix="dominant_" -> dominant_stage_number / dominant_stage_label).
#}
{% macro typology_stage_display(stage_col, prefix="") %}
    {{ typology_stage_number(stage_col) }} as {{ prefix }}stage_number,
    {{ typology_stage_label(stage_col) }} as {{ prefix }}stage_label
{% endmacro %}
