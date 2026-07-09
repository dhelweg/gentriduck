-- test_hamburg_wohnlage_stadtteil_match_rate.sql
-- #203 [H-C5]: assert the publisher-supplied stadtteil name-match in
-- int_hamburg_wohnlage_stadtteil (stg_hamburg_wohnlage.stadtteil ->
-- stg_hamburg_geo.area_name, area_level='subarea_l1') achieves >=98% row
-- coverage -- mirrors test_hamburg_gebiet_stadtteil_crosswalk_match_rate's
-- discipline and threshold for the EWR pillar's own name-match crosswalk.
-- Measured 100% at #203 implementation time (283,801/283,801 live rows).
--
-- Denominator: all stg_hamburg_wohnlage rows with a non-null stadtteil.
-- Numerator: of those, how many resolved to a Stadtteil area_code via the
-- name-match join in int_hamburg_wohnlage_stadtteil (i.e. how many
-- (city_code, address_id) pairs from staging survive into the intermediate
-- model's join). Counted at the raw address grain (not the aggregated
-- Stadtteil grain) so a partial-match scenario is not masked by aggregation.
--
-- The test returns one row (with the measured rate) IFF the rate falls
-- below the 98% bar; zero rows = test passes.
with
    staged as (
        select city_code, address_id
        from {{ ref("stg_hamburg_wohnlage") }}
        where stadtteil is not null
    ),

    matched as (
        -- Re-derive the join at address grain (int_hamburg_wohnlage_stadtteil
        -- aggregates away address_id, so this re-runs the same name-match
        -- rather than re-reading a column no longer present downstream).
        select w.city_code, w.address_id
        from {{ ref("stg_hamburg_wohnlage") }} as w
        inner join
            {{ ref("stg_hamburg_geo") }} as g
            on w.city_code = g.city_code
            and w.stadtteil = g.area_name
            and g.area_level = 'subarea_l1'
        where w.stadtteil is not null
    ),

    summary as (
        select
            (select count(*) from staged) as total_rows,
            (select count(*) from matched) as matched_rows,
            cast((select count(*) from matched) as double)
            / nullif((select count(*) from staged), 0) as match_rate
    )

select total_rows, matched_rows, match_rate
from summary
where total_rows > 0 and match_rate < 0.98
