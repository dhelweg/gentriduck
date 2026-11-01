-- test_354_hh_sozialmonitoring_published_class_counts.sql
-- #354/#355 phase A, prerequisite §2.1(4): Hamburg Dynamik (and Status)
-- ordering reconciliation against the published Sozialmonitoring reports
-- (index-definition.md §3.4, the Hamburg analogue of R-A3 C1 /
-- test_mss_plr_row_count + test_dynamik_ordering_guard for Berlin).
--
-- For every edition with a published annex (2016-2025), the number of scored
-- Gebiete per NUMERIC code in int_hamburg_sozialmonitoring_index must equal
-- the published number of Gebiete for the label that code is meant to carry
-- (seed_hh_sozialmonitoring_published_class_counts.expected_code). A reversed
-- or permuted label -> code mapping (e.g. positiv -> 3) changes the per-code
-- counts and fails here; it would silently invert every lead-lag sign
-- (index-definition.md §3.4). The per-Gebiet agreement (100% for all ten
-- editions) is documented in docs/epic-e/354-phase-a-data-prerequisites.md §4;
-- this test is its cheap, re-runnable guard.
--
-- Two-directional: a FULL OUTER JOIN over the editions the seed covers, so it
-- fails both when a published class is missing / differs in the warehouse and
-- when the warehouse has a (edition, index, code) cell the publication lacks
-- (e.g. a NULL or out-of-range code from an unmapped label). Editions without
-- a published annex (2013-2015) are out of scope here (covered by
-- test_354_hh_sozialmonitoring_label_code_consistency).
--
-- Returns one row per (edition, index, code) whose counts disagree or that
-- exists on one side only. Severity
-- error: the suite must not consume Hamburg Dynamik while this fails.
{{ config(severity="error") }}

with
    warehouse as (
        select edition, 'status' as index_name, status_index as code, count(*) as n
        from {{ ref("int_hamburg_sozialmonitoring_index") }}
        group by all
        union all
        select edition, 'dynamik' as index_name, dynamik_index as code, count(*) as n
        from {{ ref("int_hamburg_sozialmonitoring_index") }}
        group by all
    ),

    published as (
        select edition, index_name, class_label, expected_code, n_gebiete
        from {{ ref("seed_hh_sozialmonitoring_published_class_counts") }}
    ),

    published_editions as (select distinct edition from published),

    warehouse_in_scope as (
        select w.*
        from warehouse as w
        inner join published_editions as e on w.edition = e.edition
    )

select
    coalesce(p.edition, w.edition) as edition,
    coalesce(p.index_name, w.index_name) as index_name,
    p.class_label,
    coalesce(p.expected_code, w.code) as code,
    p.n_gebiete as published_n,
    w.n as warehouse_n
from published as p
full outer join
    warehouse_in_scope as w
    on p.edition = w.edition
    and p.index_name = w.index_name
    and p.expected_code = w.code
where p.n_gebiete is distinct from w.n
