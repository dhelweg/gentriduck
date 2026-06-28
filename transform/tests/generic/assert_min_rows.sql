-- assert_min_rows.sql
-- Generic dbt test: WARNS when the model has rows but FEWER than `min_rows`.
--
-- Pairs with assert_not_empty (which FAILS on zero rows). The band
-- 0 < count(*) < min_rows is the "looks mocked" zone: a non-empty relation
-- smaller than one real data snapshot is most likely a fixture / mock / partial
-- stand-in rather than a fully ingested source. See
-- docs/lessons/local-first-data-presence.md.
--
-- This is a HEURISTIC, not proof. Set `min_rows` to roughly one real snapshot's
-- worth of rows for the source (e.g. ~one MSS edition ≈ 447–542 PLRs) and use
-- `config: { severity: warn }`. Trade-offs (accepted; the maintainer chose the
-- row-count floor over a per-row provenance flag):
-- - a legitimately small ingest (e.g. a single edition) can false-warn;
-- - a large mock would not trip it.
-- It is a smoke alarm, not a lock.
--
-- Parameters:
-- model    — the relation under test (injected by dbt as {{ model }}).
-- min_rows — the floor below which non-empty data is treated as suspect.
--
-- Returns one row (the row_count) when 0 < count(*) < min_rows → warn.
-- Returns no rows when the relation is empty (assert_not_empty owns that case)
-- or has at least min_rows → pass.
{% test assert_min_rows(model, min_rows) %}

    select count(*) as row_count
    from {{ model }}
    having count(*) > 0 and count(*) < {{ min_rows }}

{% endtest %}
