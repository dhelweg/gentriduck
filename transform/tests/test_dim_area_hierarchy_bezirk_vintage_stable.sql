-- test_dim_area_hierarchy_bezirk_vintage_stable.sql
-- #242 (I18, geo-hierarchy pages): unlike PGR/BZR (renumbered by the 2021 LOR
-- reform -- see dim_area_hierarchy.sql's header), Bezirk boundaries/codes are
-- administratively stable across the pre-2021 -> 2021 LOR transition. This
-- test verifies that empirically, reusing the EXISTING pre2021<->2021 PLR
-- crosswalk (int_berlin_lor_crosswalk_dominant_2021 -- QA-7b #205) rather than
-- inventing a new one (per ticket instruction): for each 2021 PLR's dominant
-- (max-weight/largest-overlap) pre-2021 PLR match, the Bezirk derived from
-- each side's own 2-digit code prefix must agree -- i.e. the "same physical
-- area" resolves to the same Bezirk regardless of which vintage's PLR code is
-- used to derive it. This is exactly the Bezirk-level edge dim_area_hierarchy
-- produces (ber_pgr_to_bezirk, one level further down via PGR -- but the
-- 2-digit Bezirk prefix is identical whether read off the PLR or the PGR
-- code, since PGR code = PLR code's own leading 4 digits).
--
-- Returns rows that VIOLATE Bezirk stability (mismatched 2-digit prefix
-- between a 2021 PLR and its dominant pre-2021 match). Zero rows = test
-- passes. Verified against real ingested data (2026-07-12): 0/542 mismatches.
select
    plr_id_2021,
    plr_id_pre2021,
    substr(plr_id_2021, 1, 2) as bezirk_2021,
    substr(plr_id_pre2021, 1, 2) as bezirk_pre2021
from {{ ref("int_berlin_lor_crosswalk_dominant_2021") }}
where substr(plr_id_2021, 1, 2) != substr(plr_id_pre2021, 1, 2)
