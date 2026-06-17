-- test_lor_crosswalk_population_conservation.sql
-- Geo-data-scientist requirement: population (residents_total) must be conserved
-- within 1% per old->new PLR mapping group when using seed_lor_crosswalk_2006_to_2021.
--
-- This test checks that for each (reference_year, plr_id_pre2021) group:
-- sum(weighted_residents_2021) / original_residents_pre2021 is between 0.99 and 1.01
--
-- The test returns rows that VIOLATE the conservation constraint.
-- Zero rows = test passes (all mapped populations are conserved within 1%).
--
-- Note: this test produces zero rows automatically when the crosswalk is a stub
-- (no non-stub rows match). It will produce meaningful results once the official
-- concordance is loaded into seed_lor_crosswalk_2006_to_2021.
--
-- The test intentionally excludes mapping_type='stub' rows and restricts to
-- area_vintage='lor_pre2021' rows that have a crosswalk entry.
with
    crosswalk_non_stub as (
        select plr_id_pre2021, plr_id_2021, weight
        from {{ ref("seed_lor_crosswalk_2006_to_2021") }}
        where mapping_type != 'stub'
    ),

    pre2021_residents as (
        select
            area_code as plr_id_pre2021,
            reference_year,
            indicator_value as residents_original
        from {{ ref("stg_berlin_ewr") }}
        where area_vintage = 'lor_pre2021' and indicator = 'residents_total'
    ),

    -- Sum of weighted residents_total across all 2021 PLRs that each pre-2021 PLR
    -- maps to.
    weighted_sum as (
        select
            pre.plr_id_pre2021,
            pre.reference_year,
            pre.residents_original,
            sum(pre.residents_original * cw.weight) as residents_weighted_sum
        from pre2021_residents as pre
        inner join crosswalk_non_stub as cw on pre.plr_id_pre2021 = cw.plr_id_pre2021
        where pre.residents_original is not null and pre.residents_original > 0
        group by pre.plr_id_pre2021, pre.reference_year, pre.residents_original
    )

-- Return rows where population is NOT conserved within 1%.
select
    plr_id_pre2021,
    reference_year,
    residents_original,
    residents_weighted_sum,
    abs(residents_weighted_sum - residents_original)
    / residents_original as relative_error
from weighted_sum
where abs(residents_weighted_sum - residents_original) / residents_original > 0.01
