-- test_area_rollup_stage_mix_leaf_coverage.sql
-- #310 review fix (gap flagged alongside MEDIUM-B/MEDIUM-C): every HABITABLE
-- leaf (gentrification_index, live_data, status_class IS NOT NULL) that this
-- rollup level's own crosswalk actually covers must roll up through exactly
-- one area at that level -- so summing n_habitable_children across DISTINCT
-- areas at a given (city_code, area_level, period_yyyymm) must reconcile
-- exactly against the count of habitable leaf rows that crosswalk covers for
-- that city/period. Hand-verified during the #310 review at period 202512:
-- 542/542 for every Berlin rollup level (bezirk/pgr/ortsteil) and 857/857 for
-- every Hamburg rollup level (subarea_l1/district) -- this test re-derives
-- that check generally, across every (city, level, period), and specifically
-- covers the MEDIUM-B fix's zero-children placeholder rows (which must
-- contribute 0, not double-count or under-count, to this reconciliation).
--
-- `coverage` below is deliberately NOT "every habitable leaf for the city/
-- period" -- Berlin's Ortsteil<->PLR crosswalk
-- (int_berlin_plr_ortsteil_overlap) is scoped to lor_2021 PLRs only (its own
-- documented header limitation: "NOT extended to lor_pre2021"), a
-- pre-existing, out-of-scope-for-#310 limitation, NOT a MEDIUM-B regression:
-- Berlin's four lor_pre2021 periods (2013/2015/2017/2019) genuinely have ZERO
-- Ortsteil-level rows in this mart (every PLR active in those periods is
-- outside the crosswalk's scope, so there is no area at all -- not even a
-- MEDIUM-B placeholder -- to roll them into). pgr/bezirk nest by LOR
-- code-prefix (mart_area_hierarchy) and so cover PLRs of EITHER vintage, and
-- Hamburg has no such vintage split at all -- `coverage` reflects each
-- level's real, current crosswalk scope instead of assuming universal
-- coverage.
--
-- Returns (city_code, area_level, period_yyyymm) rows where the reconciliation
-- fails. Zero rows = test passes.
with
    leaf_habitable as (
        select city_code, area_code as leaf_area_code, period_yyyymm
        from {{ ref("gentrification_index") }}
        where
            variant = 'live_data'
            and status_class is not null
            and (
                (city_code = 'BER' and area_level = 'plr')
                or (city_code = 'HH' and area_level = 'subarea_l2')
            )
    ),

    -- Which leaf codes each rollup area_level's crosswalk covers at all,
    -- period-independent (see header).
    coverage as (
        select 'BER' as city_code, 'pgr' as area_level, area_code as leaf_area_code
        from {{ ref("mart_area_hierarchy") }}
        where city_code = 'BER' and area_level = 'plr'
        union
        select 'BER' as city_code, 'bezirk' as area_level, area_code as leaf_area_code
        from {{ ref("mart_area_hierarchy") }}
        where city_code = 'BER' and area_level = 'plr'
        union
        select
            'BER' as city_code,
            'ortsteil' as area_level,
            plr_area_code as leaf_area_code
        from {{ ref("int_berlin_plr_ortsteil_overlap") }}
        where is_dominant_ortsteil
        union
        select
            'HH' as city_code, 'subarea_l1' as area_level, area_code as leaf_area_code
        from {{ ref("mart_area_hierarchy") }}
        where city_code = 'HH' and area_level = 'subarea_l2'
        union
        select 'HH' as city_code, 'district' as area_level, area_code as leaf_area_code
        from {{ ref("mart_area_hierarchy") }}
        where city_code = 'HH' and area_level = 'subarea_l2'
    ),

    expected as (
        select
            c.city_code,
            c.area_level,
            l.period_yyyymm,
            count(distinct l.leaf_area_code) as expected_habitable_leaf_count
        from coverage as c
        inner join
            leaf_habitable as l
            on c.city_code = l.city_code
            and c.leaf_area_code = l.leaf_area_code
        group by 1, 2, 3
    ),

    distinct_area_rows as (
        select distinct
            city_code, area_level, area_code, period_yyyymm, n_habitable_children
        from {{ ref("mart_area_rollup_stage_mix") }}
    ),

    rollup_sums as (
        select
            city_code,
            area_level,
            period_yyyymm,
            sum(n_habitable_children) as summed_habitable_children
        from distinct_area_rows
        group by 1, 2, 3
    )

select
    e.city_code,
    e.area_level,
    e.period_yyyymm,
    coalesce(r.summed_habitable_children, 0) as summed_habitable_children,
    e.expected_habitable_leaf_count
from expected as e
left join
    rollup_sums as r
    on e.city_code = r.city_code
    and e.area_level = r.area_level
    and e.period_yyyymm = r.period_yyyymm
where coalesce(r.summed_habitable_children, 0) != e.expected_habitable_leaf_count
