-- stg_oa_getis_ord.sql
-- OA-D3c (#280, ADR-0025): staging view over the precomputed Getis-Ord Gi*
-- results table produced by analysis/f_oa_getis_ord.py -- the
-- analysis-layer->mart handoff ADR-0025 mandates ("Gi* stays out of
-- dbt/DuckDB. Do not attempt to re-implement contiguity or the Gi*
-- statistic in SQL" -- ADR-0025 Decision 2). This model performs NO spatial
-- computation of its own -- it is a pure read of a Python-computed parquet
-- output, identical in shape to how stg_berlin_lor.sql reads ingestion/'s
-- parquet output, except the producer here is analysis/f_oa_getis_ord.py
-- instead of an ingestion/*.py script (see analysis_path() macro header).
-- Not on the R-C1 gated-file list itself (this is plumbing, like
-- dim_area_geometry.sql) -- the METHODOLOGY it exposes (weights params,
-- FDR correction, cut-points) lives in analysis/f_oa_getis_ord.py, which IS
-- gated (see that script's module docstring).
--
-- Storage path: data/analysis/oa_getis_ord/*.parquet (gitignored,
-- deterministically rebuilt by `uv run python analysis/f_oa_getis_ord.py`,
-- seed=42 on every esda permutation call -- R-C3).
--
-- BUILD-ORDER NOTE (binding workflow, see analysis/f_oa_getis_ord.py):
-- the analysis script itself READS from `int_poi_offering_advantage_arealevel`
-- (via DuckDB), so a fresh warehouse needs: (1) `uv run poe build` (populates
-- int_poi_offering_advantage_arealevel), (2)
-- `uv run python analysis/f_oa_getis_ord.py` (writes the parquet this model
-- reads), (3) `uv run poe build` again (or `dbt build --select
-- stg_oa_getis_ord+`) to materialize this model + mart_poi_oa_hotspots with
-- the fresh precompute. This mirrors the two-pass shape every
-- ingestion-fed staging model already has (ingest, then build) -- the
-- "ingestion" step here is just a deterministic analysis script instead of
-- an external-source fetch.
--
-- Graceful degradation: returns zero rows with the target schema when no
-- parquet files have been written yet, so `uv run poe build` continues to
-- pass on a fresh checkout (same convention as stg_berlin_lor.sql et al.).
--
-- Grain: one row per (city_code, area_vintage, area_level, area_code,
-- snapshot_year, poi_domain_h) -- ADR-0025 Decision 2's binding stable key,
-- restricted to area_level IN ('plr', 'bzr') and domain-only taxonomy grain
-- (ADR-0025 Decision 3 -- NOT Bezirk, NOT category/type leaf; see
-- analysis/f_oa_getis_ord.py header for the full scope rationale).
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set gi_glob = analysis_path("oa_getis_ord/*.parquet") %}
{%- set _src_oa_getis_ord = source("analysis_precompute", "oa_getis_ord") -%}

{% if execute %}
    {%- set file_count_result = run_query("SELECT count(*) FROM glob('" ~ gi_glob ~ "')") -%}
    {%- set file_count = file_count_result.columns[0][0] -%}
{% else %} {%- set file_count = 0 -%}
{% endif %}

{% if file_count > 0 %}

    select
        city_code,
        area_vintage,
        area_level,
        area_code,
        snapshot_year,
        poi_domain_h,
        domain_stock_local,
        gi_star_z,
        gi_star_p,
        gi_star_p_fdr,
        gi_star_fdr_significant,
        gi_star_cluster_label,
        gi_star_w_fallback
    from read_parquet({{ _src_oa_getis_ord }}, union_by_name = true)
    where area_code is not null and area_level in ('plr', 'bzr')

{% else %}

    -- Zero-row typed stub: no Gi* precompute parquet found.
    -- Run `uv run poe build` then `uv run python analysis/f_oa_getis_ord.py`
    -- then `uv run poe build` again to populate data/analysis/oa_getis_ord/.
    select
        cast(null as varchar) as city_code,
        cast(null as varchar) as area_vintage,
        cast(null as varchar) as area_level,
        cast(null as varchar) as area_code,
        cast(null as integer) as snapshot_year,
        cast(null as varchar) as poi_domain_h,
        cast(null as double) as domain_stock_local,
        cast(null as double) as gi_star_z,
        cast(null as double) as gi_star_p,
        cast(null as double) as gi_star_p_fdr,
        cast(null as boolean) as gi_star_fdr_significant,
        cast(null as varchar) as gi_star_cluster_label,
        cast(null as boolean) as gi_star_w_fallback
    where false

{% endif %}
