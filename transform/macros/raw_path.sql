{#
  raw_path(relative_path)
  =======================
  QA-5 (#180): single macro to build an absolute path under data/raw/ from
  project_root, replacing the ~19 hand-copied
  `var("project_root") ~ "/data/raw/..."` string-building call sites across
  transform/models/staging/*.sql.

  Not methodology-bearing: pure path-string construction, no
  weighting/scoring/index-construction logic.

  Usage:
    {% set ewr_glob = raw_path("berlin/ewr/*.parquet") %}
  is equivalent to the old:
    {% set ewr_glob = var("project_root") ~ "/data/raw/berlin/ewr/*.parquet" %}
#}
{% macro raw_path(relative_path) %}
    {{ return(var("project_root") ~ "/data/raw/" ~ relative_path) }}
{% endmacro %}
