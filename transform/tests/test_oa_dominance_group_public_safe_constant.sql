-- test_oa_dominance_group_public_safe_constant.sql
-- OA-D4 (#240, ADR-0024): int_poi_within_group_dominance.sql aggregates
-- is_public_safe with min(is_public_safe) per dominance_group, relying on
-- seed_oa_dominance_groups.csv encoding a SINGLE is_public_safe value per
-- group (OA-D0 domain sign-off Condition B.3 -- is_public_safe is a
-- per-group property, not per-child). If a future seed edit accidentally
-- mixed true/false within one group, the model's min() aggregation would
-- silently mask it (any false child would make the whole group read
-- unsafe, hiding that some children were miscoded true) -- this test makes
-- that seed invariant a build-blocking guard instead of a silent risk.
--
-- Returns rows where a dominance_group has more than one distinct
-- is_public_safe value; zero rows = test passes.
select dominance_group, count(distinct is_public_safe) as n_distinct_public_safe
from {{ ref("seed_oa_dominance_groups") }}
group by dominance_group
having count(distinct is_public_safe) > 1
