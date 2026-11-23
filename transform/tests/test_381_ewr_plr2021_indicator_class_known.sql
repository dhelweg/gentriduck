-- test_381_ewr_plr2021_indicator_class_known.sql
-- #381: int_berlin_ewr_plr2021 classifies every EWR indicator as extensive
-- (unit 'count') or intensive (unit 'share' / 'years') from
-- seed_ewr_indicator_meta. An indicator in stg_berlin_ewr without a meta row, or
-- with any other unit, would get a NULL crosswalked value instead of being
-- silently area-allocated; this test makes that loud. Severity error.
{{ config(severity="error") }}

select distinct e.indicator, m.unit
from {{ ref("stg_berlin_ewr") }} as e
left join {{ ref("seed_ewr_indicator_meta") }} as m on e.indicator = m.indicator
where m.indicator is null or m.unit not in ('count', 'share', 'years')
