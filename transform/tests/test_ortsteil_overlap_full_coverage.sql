-- test_ortsteil_overlap_full_coverage.sql
-- #269 (I-ortsteile): int_berlin_plr_ortsteil_overlap must cover every
-- lor_2021 PLR (dim_area area_level='plr' whose code is a lor_2021 code --
-- approximated here via a direct join against stg_berlin_lor filtered to
-- area_vintage='lor_2021', the same source the crosswalk model itself reads)
-- with a dominant Ortsteil assignment. A PLR silently missing from the
-- crosswalk would mean a downstream rollup (mart_area_demographics ortsteil
-- level, mart_ortsteil_plr_stage_mix) undercounts without any visible error --
-- this test surfaces that as a build failure instead.
--
-- NOTE: this is deliberately the PLR-side coverage check ONLY. The
-- Ortsteil-side equivalent ("does every Ortsteil have at least one PLR whose
-- DOMINANT assignment is to it") is a separate, lower-severity test --
-- test_ortsteil_overlap_ortsteil_never_dominant.sql -- because empirically
-- (2026-07-17) it fails for 2 real, small Ortsteile (Schlachtensee 0608,
-- Malchow 1106) that never hold the majority share of any PLR -- a genuine
-- geographic fact about small enclave Ortsteile straddled by larger
-- neighbours under the dominant-assignment method, not a data bug. See that
-- test's header for the full disclosure.
--
-- Returns rows that VIOLATE PLR coverage. Zero rows = pass.
with
    plrs as (
        select distinct area_code as plr_area_code
        from {{ ref("stg_berlin_lor") }}
        where area_vintage = 'lor_2021'
    ),

    dominant as (
        select plr_area_code
        from {{ ref("int_berlin_plr_ortsteil_overlap") }}
        where is_dominant_ortsteil
    )

select p.plr_area_code
from plrs as p
left join dominant as d on p.plr_area_code = d.plr_area_code
where d.plr_area_code is null
