-- test_ortsteil_overlap_ortsteil_never_dominant.sql
-- #269 (I-ortsteile): WARN-severity disclosure test -- which Ortsteile are
-- never the DOMINANT assignment for any PLR (i.e. get zero constituent PLRs,
-- hence no row at all in mart_area_demographics's ortsteil level or
-- mart_ortsteil_plr_stage_mix under the dominant-assignment method).
--
-- Confirmed (2026-07-17): exactly 2 of 97 Ortsteile -- Schlachtensee (0608)
-- and Malchow (1106) -- are small enclave Ortsteile fully split across
-- neighbouring PLRs where a LARGER neighbouring Ortsteil (Nikolassee/
-- Zehlendorf for Schlachtensee; Wartenberg for Malchow) always holds the
-- majority share (see int_berlin_plr_ortsteil_overlap.sql's own header for
-- the method). This is a REAL, disclosed geographic consequence of the
-- dominant-assignment method (a small Ortsteil that never contains the
-- majority of any PLR is invisible to a "count whole PLRs by their dominant
-- Ortsteil" rollup) -- not a data-quality bug, hence WARN not ERROR (severity
-- configured in dbt_project.yml, matching the test_c5_* precedent for
-- expected-but-noteworthy conditions).
--
-- Flagged explicitly for the #269 ticket's geo-DS sign-off: an Ortsteil
-- profile page for Schlachtensee or Malchow will show zero constituent PLRs
-- and no demographic/stage-mix rollup under this method -- the page (web-
-- engineer follow-up) needs to disclose this rather than silently rendering
-- an empty/misleading page. If this list ever grows beyond these 2 known
-- cases, that is a genuine signal worth re-examining (a WFS edition change,
-- or the dominant-assignment method proving too coarse) -- this test is not
-- meant to be silently re-baselined without checking why the set changed.
--
-- Returns Ortsteile that are never anyone's dominant assignment. Zero rows
-- would mean the 2 known cases have somehow gone away (also worth checking).
with
    dominant_ortsteile as (
        select distinct ortsteil_area_code
        from {{ ref("int_berlin_plr_ortsteil_overlap") }}
        where is_dominant_ortsteil
    )

select o.area_code as ortsteil_area_code, o.area_name as ortsteil_area_name
from {{ ref("stg_berlin_ortsteil") }} as o
left join dominant_ortsteile as d on o.area_code = d.ortsteil_area_code
where d.ortsteil_area_code is null
