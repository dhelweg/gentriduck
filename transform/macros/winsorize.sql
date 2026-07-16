{#
  winsorize(expr, lower, upper)
  =============================
  QA-winsor (#268): single source of truth for clipping a z-scored value to a
  symmetric bound, so a handful of extreme (thin-PLR) observations cannot swing
  downstream composites/visuals.

  Recommended repeatedly, never implemented, across four sign-offs:
  docs/epic-c/C4-geo-signoff.md (#5, non-blocking), docs/epic-c/C5-geo-signoff.md
  (non-blocking follow-up), docs/epic-c/C6-geo-signoff.md (PASS condition 2,
  "still open" -- 149 dynamism_score observations beyond +/-3 SD, range
  -5.1 to +13.4), docs/epic-g/G2-geo-signoff.md (non-blocking suggestion).

  Not, by itself, a new indicator/weighting/normalization *method* -- it is a
  bound applied on top of the existing z-score defined and geo-DS-approved in
  C5 (docs/epic-c/C5-geo-signoff.md). Still treated as methodology-bearing
  (CLAUDE.md: "changes ... normalization ... of any model") because it changes
  the distribution of a governed score; QA-winsor sign-off records the gate.

  Usage: {{ winsorize('dynamism_score_raw', -3, 3) }} as dynamism_score
  Bound is applied with LEAST/GREATEST, which pass NULL through unchanged
  (both DuckDB functions are NULL-in/NULL-out), so missing-data semantics
  upstream (NULLIF stddev guard) are preserved.
#}
{% macro winsorize(expr, lower=-3, upper=3) %}
    least(greatest({{ expr }}, {{ lower }}), {{ upper }})
{% endmacro %}
