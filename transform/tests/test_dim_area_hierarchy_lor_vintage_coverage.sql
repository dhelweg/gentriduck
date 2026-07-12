-- test_dim_area_hierarchy_lor_vintage_coverage.sql
-- #242 (I18, geo-hierarchy pages): the LOR code-prefix nesting dim_area_hierarchy
-- relies on (PLR -> BZR -> PGR -> Bezirk) is a per-vintage fact (see
-- dim_area_hierarchy.sql's header) -- a PLR code's derived BZR-prefix parent
-- must actually exist as a real BZR row FROM THE SAME LOR VINTAGE, and likewise
-- BZR -> PGR. dim_area_hierarchy itself doesn't carry area_vintage (it sits on
-- top of dim_area, which deliberately collapses both vintages), so this test
-- checks the underlying vintage-tagged staging models directly -- the more
-- precise place to verify "resolves correctly for both LOR vintages" (2019 and
-- 2021+) per the ticket's acceptance criterion.
--
-- Returns rows that VIOLATE the nesting (a PLR/BZR row whose code-prefix-derived
-- parent code does not exist as a same-vintage row one level up). Zero rows =
-- test passes. Runs over BOTH area_vintage values independently. A wholly
-- empty child level (e.g. before PLR/BZR/PGR have been ingested at all)
-- trivially passes -- there is nothing to check against a missing parent --
-- but a PARTIALLY ingested state (e.g. PLR/BZR present, PGR not yet ingested)
-- correctly fails, since ingest_lor_geometries.py always fetches all three
-- levels together and this test's job is exactly to catch that kind of drift.
with
    plr_missing_bzr_parent as (
        select
            plr.city_code,
            plr.area_vintage,
            'plr' as area_level,
            plr.area_code,
            substr(plr.area_code, 1, 6) as expected_bzr_parent
        from {{ ref("stg_berlin_lor") }} as plr
        left join
            {{ ref("stg_berlin_lor_bzr") }} as bzr
            on plr.area_vintage = bzr.area_vintage
            and substr(plr.area_code, 1, 6) = bzr.area_code
        where plr.area_code is not null and bzr.area_code is null
    ),

    bzr_missing_pgr_parent as (
        select
            bzr.city_code,
            bzr.area_vintage,
            'bzr' as area_level,
            bzr.area_code,
            substr(bzr.area_code, 1, 4) as expected_pgr_parent
        from {{ ref("stg_berlin_lor_bzr") }} as bzr
        left join
            {{ ref("stg_berlin_lor_pgr") }} as pgr
            on bzr.area_vintage = pgr.area_vintage
            and substr(bzr.area_code, 1, 4) = pgr.area_code
        where bzr.area_code is not null and pgr.area_code is null
    )

select city_code, area_vintage, area_level, area_code, expected_bzr_parent as expected_parent
from plr_missing_bzr_parent
union all
select city_code, area_vintage, area_level, area_code, expected_pgr_parent as expected_parent
from bzr_missing_pgr_parent
