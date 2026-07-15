-- test_thesis_area_code_padding.sql
-- QA-raumid (#266) regression guard: int_thesis_2018_area_index's area_code must be
-- zero-padded to the same fixed width as every other consumer expects for that
-- area_level (8 chars for 'plr', 6 chars for 'bzr') -- the exact bug this ticket
-- fixed at source (previously the golden CSV's raw, sometimes-leading-zero-dropped
-- raum_id flowed straight into area_code; only the join *condition* lpad'd
-- defensively, not the emitted column). A width mismatch here silently produces
-- orphan duplicate rows in dim_area / mis-joins in gentrification_index and any
-- other downstream area_code consumer -- exactly the class of bug #200 fixed for
-- e1_regressions.py's OA join and this ticket generalizes to the model layer.
-- Returns rows that violate the expected width; zero rows = test passes.
select area_level, area_code, length(area_code) as actual_length
from {{ ref("int_thesis_2018_area_index") }}
where
    (area_level = 'plr' and length(area_code) != 8)
    or (area_level = 'bzr' and length(area_code) != 6)
