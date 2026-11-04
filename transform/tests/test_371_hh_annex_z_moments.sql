-- test_371_hh_annex_z_moments.sql
-- #371 pre-registration §3.3 check 1 / ADR-0014 Amendment 2026-11-02: the
-- published z-scores are standardised over the scored Gebiete, so per edition
-- and indicator mean(z) = 0.00 +- 0.01 and SD(z) = 1.00 +- 0.01 (population SD,
-- ddof = 0; excluded S7 cells are NULL and not counted). A column read from the
-- wrong position, or a mean/SD row taken from another indicator, fails here.
-- Returns one row per failing (edition, indicator). Severity error.
{{ config(severity="error") }}

select
    edition_year,
    indicator,
    count(z_score) as n,
    avg(z_score) as mean_z,
    stddev_pop(z_score) as sd_z
from {{ ref("stg_hamburg_sozialmonitoring_indicators") }}
group by edition_year, indicator
having
    abs(avg(z_score)) > 0.01
    or abs(stddev_pop(z_score) - 1) > 0.01
    or count(z_score) < 800
