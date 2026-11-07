-- test_371_hh_annex_d_vs_s_consistency.sql
-- #371 (pre-registration §3.3; DE review finding 4): the recovered Dynamik
-- change of edition E must equal the change of the recovered status shares over
-- the same 3-year window:
-- change_pp(D_j, E)  ~=  share(S_j, E) - share(S_j, E-3)
-- for the harmonised-core indicators S3/S4/S5 (D3/D4/D5), on the Gebiete
-- scored in both editions. Both sides are built from independently published
-- mean/SD rows, so a wrong or swapped SD (or mean) row in either edition breaks
-- the equality; the z-moment test cannot see that (any z column is standardised).
--
-- Tolerance: median |difference| <= 0.2 pp per edition x indicator (observed
-- 0.03-0.12 pp; rounding of z and of the mean/SD rows, plus occasional publisher
-- back-revisions of single Gebiete, e.g. S3 2022/2023 with correlation
-- 0.913/0.951 but medians 0.05/0.04 pp). At least 800 matched Gebiete, so the
-- test cannot pass vacuously.
--
-- Excluded definition seams (D and S are not on the same definition across the
-- window; docs/epic-e/371-data-checks.md §2):
-- S4 editions 2019 and 2021: Arbeitslose SGB III + II -> SGB II only
-- (median |diff| about 1.6 pp);
-- S3 edition 2020: AsylbLG added to S3 from edition 2019.
-- Returns one row per failing (edition, indicator). Severity error.
{{ config(severity="error") }}

with
    s as (
        select edition_year, gebiet_id, indicator, share
        from {{ ref("stg_hamburg_sozialmonitoring_indicators") }}
        where indicator in ('S3', 'S4', 'S5') and share is not null
    ),

    d as (
        select
            edition_year, gebiet_id, 'S' || substr(indicator, 2) as indicator, change_pp
        from {{ ref("stg_hamburg_sozialmonitoring_indicators") }}
        where indicator in ('D3', 'D4', 'D5') and change_pp is not null
    ),

    matched as (
        select
            d.edition_year,
            d.indicator,
            abs(d.change_pp - (s_end.share - s_start.share)) as abs_diff
        from d
        inner join
            s as s_end
            on d.edition_year = s_end.edition_year
            and d.gebiet_id = s_end.gebiet_id
            and d.indicator = s_end.indicator
        inner join
            s as s_start
            on d.edition_year - 3 = s_start.edition_year
            and d.gebiet_id = s_start.gebiet_id
            and d.indicator = s_start.indicator
        where
            not (d.indicator = 'S4' and d.edition_year in (2019, 2021))
            and not (d.indicator = 'S3' and d.edition_year = 2020)
    )

select
    edition_year,
    indicator,
    count(*) as n_gebiete,
    median(abs_diff) as median_abs_diff_pp
from matched
group by edition_year, indicator
having median(abs_diff) > 0.2 or count(*) < 800
