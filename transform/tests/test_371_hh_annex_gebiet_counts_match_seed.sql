-- test_371_hh_annex_gebiet_counts_match_seed.sql
-- #371, ADR-0014 Amendment 2026-11-02: per-edition scored-Gebiet counts in the
-- annex indicator table match seed_hh_sozialmonitoring_published_class_counts
-- (sum of the four status classes), and every Gebiet carries all 13 indicators
-- (S1-S7, D1-D6). Returns one row per failing edition. Severity error.
{{ config(severity="error") }}

with
    annex as (
        select
            edition_year as edition,
            count(distinct gebiet_id) as n_gebiete,
            count(*) as n_rows
        from {{ ref("stg_hamburg_sozialmonitoring_indicators") }}
        group by edition_year
    ),

    published as (
        select edition, sum(n_gebiete) as n_gebiete
        from {{ ref("seed_hh_sozialmonitoring_published_class_counts") }}
        where index_name = 'status'
        group by edition
    )

select
    coalesce(p.edition, a.edition) as edition,
    p.n_gebiete as published_n,
    a.n_gebiete as annex_n,
    a.n_rows as annex_rows
from published as p
full outer join annex as a on p.edition = a.edition
where
    p.n_gebiete is distinct from a.n_gebiete
    or a.n_rows is distinct from 13 * a.n_gebiete
