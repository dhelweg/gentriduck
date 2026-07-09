{#
  published_cities_filter(column)
  ================================
  QA-4b (#202): single source of truth for the publication-filter mechanism --
  which dim_city.city_code values are exposed downstream / on the site -- as a
  var-driven IN filter, replacing hard-coded `city_code = 'BER'` literals.

  This is a different concern from canonical_city_code() (#179, QA-4): that macro
  fixes a legacy-lowercase-format bug at the ingestion boundary; this macro is a
  publication-readiness gate applied further downstream, in the marts that decide
  what a consumer (site, analysis) sees. Onboarding a second published city (e.g.
  Hamburg once its H2 real-data ingestion + sign-off conditions land, #125) means
  adding its city_code to the `published_cities` var in dbt_project.yml, not
  editing every call site.

  Not methodology-bearing: pure filter-mechanism refactor -- no
  weighting/scoring/index-construction change. The set of published cities
  itself is a project/publication-readiness decision (tracked in PROJECT_PLAN.md
  / the relevant city-onboarding ticket), not something this macro decides.

  Usage: where {{ published_cities_filter('ts.city_code') }}
#}
{% macro published_cities_filter(column) %}
    {{ column }} in (
        {%- for city in var("published_cities") -%}
            '{{ city }}'{% if not loop.last %}, {% endif %}
        {%- endfor -%}
    )
{% endmacro %}
