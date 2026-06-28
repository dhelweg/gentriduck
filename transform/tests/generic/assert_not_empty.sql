-- assert_not_empty.sql
-- Generic dbt test: FAILS when the model/source has zero rows.
--
-- Why this exists (docs/lessons/local-first-data-presence.md):
-- Gentriduck is local-first DuckDB with NO cloud data store. Raw data lives only
-- in gitignored data/raw/*.parquet, rebuilt per machine from open sources. Every
-- staging model uses "graceful degradation" — it returns a typed zero-row stub
-- when its parquet is absent, so `dbt build` stays green before ingestion. The
-- failure mode: a machine that never ingested a source (or a failed/forgotten
-- transfer between machines) produces a SILENTLY EMPTY model and a FALSELY GREEN
-- build. This test turns the absence of critical raw data into a hard,
-- build-blocking failure instead of a silent pass.
--
-- Use with `config: { severity: error }` on models whose raw data MUST be present
-- for the build to be meaningful (MSS, OSM, EWR, LOR, and the keystone panel
-- models). Pair with assert_min_rows (warn) to also catch suspiciously-small
-- (likely mocked/fixture) data that is non-empty.
--
-- Parameters:
-- model — the relation under test (injected by dbt as {{ model }}).
--
-- Returns one row (row_count = 0) when the relation is empty → test fails.
-- Returns no rows when the relation has data → test passes.
{% test assert_not_empty(model) %}

    select count(*) as row_count from {{ model }} having count(*) = 0

{% endtest %}
