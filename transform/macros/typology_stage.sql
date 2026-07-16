{#
  typology_stage.sql
  R-A8b (#260) refactor: extracted from int_gentrification_ts.sql's inline `{% set
  typology_case %}` block (unchanged logic -- pure refactor, behaviour-preserving) so the
  six-stage D1xD2 typology classification can be reused by
  int_gentrification_ts_unified_2021.sql (#260 fix C2: must source status_index/dynamik_index
  directly from stg_berlin_mss, not the POI-inner-joined int_gentrification_ts, so this macro
  is invoked against stg_berlin_mss columns there rather than int_gentrification_ts's mss.*
  alias -- same CASE logic, different source alias, passed as macro arguments to keep it
  source-agnostic).

  Theory basis (unchanged from the original, see int_gentrification_ts.sql header for full
  R-C2 grounding): ADR-0008 D1xD2 typology matrix; Dangschat (1988) double invasion-succession
  cycle; index-definition.md Sec 1.3/1.5; D-2 guard (status=1/dynamik=2-3 and status=2/
  dynamik=3 tension cells); R-A3 C2 improving-vulnerable cell (status=4/dynamik=1).
#}
{% macro typology_stage(status_index_col, dynamik_index_col) %}
    case
        when {{ status_index_col }} is null
        then null  -- uninhabited PLR: no typology assignment
        when {{ status_index_col }} = 1 and {{ dynamik_index_col }} = 1
        then 'consolidation-pressure'
        -- D-2 GUARD: status=1 + dynamik=2 or 3 → stable-established (NOT upgrading)
        -- dynamik=3 in a high-status PLR is DECLINE, not gentrification (tension cell
        -- *)
        when {{ status_index_col }} = 1 and {{ dynamik_index_col }} = 2
        then 'stable-established'
        when {{ status_index_col }} = 1 and {{ dynamik_index_col }} = 3
        then 'stable-established'  -- tension: decline, not gentrification
        when {{ status_index_col }} = 2 and {{ dynamik_index_col }} = 1
        then 'active-gentrification'
        when {{ status_index_col }} = 2 and {{ dynamik_index_col }} = 2
        then 'stable-established'
        -- D-2 GUARD: status=2 + dynamik=3 → pre-gentrification (NOT upgrading)
        -- mid-status declining = filtering-down; tension cell *
        when {{ status_index_col }} = 2 and {{ dynamik_index_col }} = 3
        then 'pre-gentrification'  -- tension: filtering-down
        -- status=3 + dynamik=1: low status improving → pioneer-signal
        when {{ status_index_col }} = 3 and {{ dynamik_index_col }} = 1
        then 'pioneer-signal'
        when {{ status_index_col }} = 3 and {{ dynamik_index_col }} = 2
        then 'pre-gentrification'
        when {{ status_index_col }} = 3 and {{ dynamik_index_col }} = 3
        then 'pre-gentrification'
        -- status=4 + dynamik=1: improving-vulnerable (R-A3 C2; §1.3, §1.5 †)
        when {{ status_index_col }} = 4 and {{ dynamik_index_col }} = 1
        then 'improving-vulnerable'
        when {{ status_index_col }} = 4 and {{ dynamik_index_col }} = 2
        then 'pre-gentrification'
        when {{ status_index_col }} = 4 and {{ dynamik_index_col }} = 3
        then 'pre-gentrification'
    end
{% endmacro %}
