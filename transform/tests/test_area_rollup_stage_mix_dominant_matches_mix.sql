-- test_area_rollup_stage_mix_dominant_matches_mix.sql
-- #310: dominant_stage/dominant_share must be internally consistent with the
-- mix rows they are paired with -- dominant_share should equal the
-- stage_population_share of the mix row whose typology_stage = dominant_stage
-- (within floating-point tolerance). A mismatch would mean the dominant-vote
-- CTE and the per-stage share CTE drifted apart (e.g. a different weight
-- basis or denominator sneaking in on one side only).
--
-- Returns rows that VIOLATE this invariant. Zero rows = pass.
with
    mix as (
        select
            city_code,
            area_level,
            area_code,
            period_yyyymm,
            variant,
            typology_stage,
            stage_population_share
        from {{ ref("mart_area_rollup_stage_mix") }}
    ),

    dominant as (
        select distinct
            city_code,
            area_level,
            area_code,
            period_yyyymm,
            variant,
            dominant_stage,
            dominant_share
        from {{ ref("mart_area_rollup_stage_mix") }}
        where dominant_stage is not null
    )

select
    d.city_code,
    d.area_level,
    d.area_code,
    d.period_yyyymm,
    d.variant,
    d.dominant_share,
    m.stage_population_share
from dominant as d
inner join
    mix as m
    on d.city_code = m.city_code
    and d.area_level = m.area_level
    and d.area_code = m.area_code
    and d.period_yyyymm = m.period_yyyymm
    and d.variant = m.variant
    and d.dominant_stage = m.typology_stage
where abs(d.dominant_share - m.stage_population_share) > 0.001
