-- test_hamburg_gebiet_stadtteil_crosswalk_match_rate.sql
-- Geo-data-scientist requirement (#125, H1-geo-signoff.md Condition 1): once
-- real Sozialmonitoring + geometry data is ingested, assert the Gebiet <->
-- Stadtteil name-matched crosswalk in int_ewr_socioeco_hamburg_disagg
-- achieves >=98% match rate, and investigate/fix normalization for any
-- residual mismatch before trusting the composite.
--
-- Denominator: Gebiete that DO have a Sozialmonitoring score (i.e. appear in
-- stg_hamburg_sozialmonitoring at all -- below-threshold/unscored Gebiete are
-- a legitimate data-coverage gap, not a crosswalk-matching failure, and are
-- correctly excluded per the >300-resident scoring threshold documented in
-- stg_hamburg_sozialmonitoring's header).
-- Numerator: of those, how many resolved to a non-null EWR composite via the
-- crosswalk in int_ewr_socioeco_hamburg_disagg (i.e. residents_total is not
-- null -- the disagg model LEFT JOINs so an unmatched Gebiet has NULL
-- indicators).
--
-- The test returns one row (with the measured rate) IFF the rate falls below
-- the 98% bar; zero rows = test passes.
with
    scored_gebiete as (
        select distinct area_code as gebiet_code
        from {{ ref("stg_hamburg_sozialmonitoring") }}
        where area_code is not null
    ),

    disagg_current as (
        select area_code as gebiet_code, residents_total
        from {{ ref("int_ewr_socioeco_hamburg_disagg") }}
        where area_vintage = 'current'
        qualify
            row_number() over (partition by area_code order by reference_year desc) = 1
    ),

    joined as (
        select
            s.gebiet_code,
            case when d.residents_total is not null then 1 else 0 end as is_matched
        from scored_gebiete as s
        left join disagg_current as d on s.gebiet_code = d.gebiet_code
    ),

    summary as (
        select
            count(*) as total_scored_gebiete,
            sum(is_matched) as matched_gebiete,
            cast(sum(is_matched) as double) / nullif(count(*), 0) as match_rate
        from joined
    )

select total_scored_gebiete, matched_gebiete, match_rate
from summary
where total_scored_gebiete > 0 and match_rate < 0.98
