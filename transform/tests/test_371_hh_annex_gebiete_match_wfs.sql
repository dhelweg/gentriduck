-- test_371_hh_annex_gebiete_match_wfs.sql
-- #371, ADR-0014 Amendment 2026-11-02 (dbt tests: "Gebiet IDs reconcile with the
-- WFS Sozialmonitoring classes per edition"). For every annex edition
-- (2016-2025), the set of scored Gebiete in stg_hamburg_sozialmonitoring_indicators
-- must equal the WFS set in stg_hamburg_sozialmonitoring, both directions, and
-- the annex population ("Bevoelkerung 31.12.(E-1)") must equal the WFS
-- `bevoelkerung` for every Gebiet (phase-A doc §3-4 found 8,519/8,519).
-- Returns one row per mismatching (edition, Gebiet). Severity error.
{{ config(severity="error") }}

with
    annex as (
        select distinct edition_year as edition, gebiet_id as area_code, population
        from {{ ref("stg_hamburg_sozialmonitoring_indicators") }}
    ),

    annex_editions as (select distinct edition from annex),

    wfs as (
        select w.edition, w.area_code, w.population
        from {{ ref("stg_hamburg_sozialmonitoring") }} as w
        inner join annex_editions as e on w.edition = e.edition
    )

select
    coalesce(a.edition, w.edition) as edition,
    coalesce(a.area_code, w.area_code) as area_code,
    a.population as annex_population,
    w.population as wfs_population
from annex as a
full outer join wfs as w on a.edition = w.edition and a.area_code = w.area_code
where
    a.area_code is null
    or w.area_code is null
    or a.population is distinct from w.population
