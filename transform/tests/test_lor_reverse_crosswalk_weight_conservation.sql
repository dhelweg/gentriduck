-- test_lor_reverse_crosswalk_weight_conservation.sql
-- D1d-followup (#136) geo-DS requirement: `reverse_weight` must sum to ~1.0 per
-- plr_id_2021 group in seed_lor_crosswalk_2006_to_2021 (mirrors the existing
-- test_lor_crosswalk_population_conservation.sql check on the forward `weight`
-- column, which sums to ~1.0 per plr_id_pre2021 group).
--
-- This test returns rows that VIOLATE the +/-1% conservation constraint.
-- Zero rows = test passes (every 2021 PLR's reverse_weight mass sums to ~1.0,
-- i.e. the 2021 PLR's full area is accounted for by intersecting pre-2021 PLRs).
--
-- Excludes mapping_type='stub' rows (no geometric weight yet).
with
    reverse_weight_sums as (
        select
            plr_id_2021, sum(reverse_weight) as reverse_weight_sum, count(*) as n_rows
        from {{ ref("seed_lor_crosswalk_2006_to_2021") }}
        where mapping_type != 'stub'
        group by plr_id_2021
    )

select
    plr_id_2021, reverse_weight_sum, n_rows, abs(reverse_weight_sum - 1.0) as deviation
from reverse_weight_sums
where abs(reverse_weight_sum - 1.0) > 0.01
