-- test_371_hh_annex_summe_reproduction.sql
-- #371 pre-registration §3.3 check 5 (phase-A doc §5): the annex Status-summe
-- equals the sum of the seven published status z-scores, and the Dynamik-summe
-- the sum of the six Dynamik z-scores, within rounding. Tolerance: each z is
-- rounded to 0.005 (two decimals) and the summe itself to 0.005, so
-- 7 * 0.005 + 0.005 = 0.04 (status) and 6 * 0.005 + 0.005 = 0.035 (Dynamik);
-- 1e-6 for full-precision editions. The published z (z_published, S7 exclusion
-- code 0 included) is summed, as the publisher does.
-- Returns one row per failing (edition, Gebiet, index). Severity error.
{{ config(severity="error") }}

with
    sums as (
        select
            edition_year,
            gebiet_id,
            indicator_kind,
            min(z_precision) as z_precision,
            sum(z_published) as sum_z,
            min(
                case
                    when indicator_kind = 'status' then status_summe else dynamik_summe
                end
            ) as published_summe
        from {{ ref("stg_hamburg_sozialmonitoring_indicators") }}
        group by all
    )

select *
from sums
where
    abs(sum_z - published_summe) > case
        when z_precision = 'full'
        then 1e-6
        when indicator_kind = 'status'
        then 0.04
        else 0.035
    end
