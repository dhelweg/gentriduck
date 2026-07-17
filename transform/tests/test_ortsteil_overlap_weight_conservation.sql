-- test_ortsteil_overlap_weight_conservation.sql
-- #269 (I-ortsteile): sanity check that the two independently-digitized
-- tessellations (PLR, Ortsteil) actually cover the same land area -- for each
-- PLR, SUM(overlap_frac_of_plr) across all its (post-sliver-guard) Ortsteil
-- overlaps should be close to 1.0. Empirically (2026-07-17) this ranges
-- 0.994-1.000 across all 542 lor_2021 PLRs. A value far below 1.0 would mean
-- a PLR has real area not attributed to ANY Ortsteil (a gap/misalignment
-- between the two boundary sources); a value above ~1.02 would indicate
-- double-counted overlap area (a join/geometry bug). Tolerance set at
-- [0.95, 1.02] -- looser than the observed range to avoid false failures
-- from a future WFS edition's minor boundary redraw, tight enough to catch a
-- genuine regression.
--
-- Returns rows that VIOLATE the tolerance. Zero rows = test passes.
select plr_area_code, sum(overlap_frac_of_plr) as total_frac
from {{ ref("int_berlin_plr_ortsteil_overlap") }}
group by plr_area_code
having sum(overlap_frac_of_plr) < 0.95 or sum(overlap_frac_of_plr) > 1.02
