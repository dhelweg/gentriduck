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
-- Returns one row per (edition, index, code) whose counts disagree, or where
-- an edition present in the seed is missing from the warehouse. Severity
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
    )

select
    p.edition,
    p.index_name,
    p.class_label,
    p.expected_code,
    p.n_gebiete as published_n,
    w.n as warehouse_n
from published as p
left join
    warehouse as w
    on p.edition = w.edition
    and p.index_name = w.index_name
    and p.expected_code = w.code
where w.n is null or w.n != p.n_gebiete
