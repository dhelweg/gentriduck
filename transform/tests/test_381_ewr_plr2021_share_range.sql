-- test_381_ewr_plr2021_share_range.sql
-- #381: every share indicator (seed_ewr_indicator_meta.unit = 'share') of
-- int_berlin_ewr_plr2021 lies in [0, 1] (tolerance 1e-9), for native AND
-- crosswalked rows. Before #381 the crosswalked shares were scaled by the
-- per-target weight sum (0.033-2.031), so this range held only by accident.
-- Returns one row per out-of-range value. Severity error.
{{ config(severity="error") }}

with
    shares as (
        select indicator from {{ ref("seed_ewr_indicator_meta") }} where unit = 'share'
    )

select e.reference_year, e.plr_id_2021, e.indicator, e.indicator_value
from {{ ref("int_berlin_ewr_plr2021") }} as e
inner join shares as s on e.indicator = s.indicator
where e.indicator_value < -1e-9 or e.indicator_value > 1 + 1e-9
