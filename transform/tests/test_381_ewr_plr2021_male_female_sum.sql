-- test_381_ewr_plr2021_male_female_sum.sql
-- #381: residents_male_share + residents_female_share = 1 (tolerance 1e-6)
-- wherever both exist. The EWR register is binary-coded (E_EM + E_EW = E_E), and
-- the population-weighted crosswalk preserves that identity exactly because both
-- shares use the same weights P_s * w_st. Pre-#381: Pankower Tor 2020 summed
-- to 0.176 (docs/epic-c/372-investigation.md §3.3). Severity error.
{{ config(severity="error") }}

with
    wide as (
        select
            reference_year,
            plr_id_2021,
            max(indicator_value) filter (
                where indicator = 'residents_male_share'
            ) as male_share,
            max(indicator_value) filter (
                where indicator = 'residents_female_share'
            ) as female_share
        from {{ ref("int_berlin_ewr_plr2021") }}
        group by reference_year, plr_id_2021
    )

select reference_year, plr_id_2021, male_share, female_share
from wide
where
    male_share is not null
    and female_share is not null
    and abs(male_share + female_share - 1) > 1e-6
