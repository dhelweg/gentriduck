{#
  canonical_city_code(column)
  ============================
  QA-4 (#179): single source of truth for the legacy-lowercase-to-canonical
  city_code normalisation (ADR-0005). Several Berlin ingestion/staging models
  predate ADR-0005 canonicalization and still emit city_code='berlin'
  (lowercase) -- see stg_berlin_ewr, stg_berlin_bodenrichtwert,
  stg_berlin_wohnlage, stg_berlin_mietspiegel, stg_osm_poi (Berlin rows), and
  int_osm_poi_plr. dim_city / dim_area / every downstream consumer expects the
  canonical 'BER'.

  Before this macro, the same `case when city_code = 'berlin' then 'BER' else
  city_code end` fix was hand-copied at 3+ call sites (int_berlin_wohnlage_plr,
  int_berlin_brw_plr, fct_poi_development), risking silent drift if a future
  edit only patches one copy. This macro is the single normalisation point;
  new Berlin-sourcing models should call it instead of re-deriving the fix.

  Not methodology-bearing: pure mechanical string normalisation, no
  weighting/scoring/index-construction logic (same classification the
  pre-existing inline case-when patches already had).

  Usage: {{ canonical_city_code('a.city_code') }} as city_code
#}
{% macro canonical_city_code(column) %}
    case when {{ column }} = 'berlin' then 'BER' else {{ column }} end
{% endmacro %}
