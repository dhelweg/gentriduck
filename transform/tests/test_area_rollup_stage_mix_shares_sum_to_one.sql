-- test_area_rollup_stage_mix_shares_sum_to_one.sql
-- #310: mart_area_rollup_stage_mix.stage_population_share is a share of the
-- HABITABLE population/weight only (uninhabited bucket excluded from the
-- denominator, design point 5) -- so summing stage_population_share across
-- every typology_stage row for a given (city_code, area_level, area_code,
-- period_yyyymm, variant) with at least one habitable child must land at 1.0
-- (within floating-point tolerance). A drift here would mean the weighted
-- vote/mix denominator and the per-stage numerators went out of sync.
--
-- Returns rows that VIOLATE this invariant. Zero rows = pass.
select
    city_code,
    area_level,
    area_code,
    period_yyyymm,
    variant,
    sum(stage_population_share) as total_share
from {{ ref("mart_area_rollup_stage_mix") }}
where n_habitable_children > 0
group by city_code, area_level, area_code, period_yyyymm, variant
having abs(sum(stage_population_share) - 1.0) > 0.001
