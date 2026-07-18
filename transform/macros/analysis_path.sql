{#
  analysis_path(relative_path)
  =============================
  OA-D3c (#280, ADR-0025): sibling to raw_path() (transform/macros/raw_path.sql),
  but pointed at data/analysis/ instead of data/raw/ -- for staging models that
  read a PRECOMPUTED analysis-layer results table (e.g. the Getis-Ord Gi*
  analysis->mart handoff, analysis/f_oa_getis_ord.py) rather than a raw
  ingested source. Same gitignored-and-rebuildable framing (CLAUDE.md golden
  rule: large/derived data is gitignored and reproducibly rebuilt, here by a
  deterministic `analysis/*.py` script instead of `ingestion/*.py`) --
  data/analysis/ is already the established output directory for every
  analysis/*.py script (a6_hotspots.py, a9_spatial_dynamic.py,
  oa_bandwidth_sweep.py, ...).

  Not methodology-bearing: pure path-string construction, no
  weighting/scoring/index-construction logic (same framing as raw_path.sql).

  Usage:
    {% set gi_glob = analysis_path("oa_getis_ord/*.parquet") %}
  is equivalent to:
    {% set gi_glob = var("project_root") ~ "/data/analysis/oa_getis_ord/*.parquet" %}
#}
{% macro analysis_path(relative_path) %}
    {{ return(var("project_root") ~ "/data/analysis/" ~ relative_path) }}
{% endmacro %}
