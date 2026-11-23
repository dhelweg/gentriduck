-- test_372_mart_area_demographics_no_crosswalked_plr_ortsteil.sql
-- #372 option (b) (docs/epic-c/372-investigation.md §5-6): mart_area_demographics
-- publishes no Berlin 'plr' or 'ortsteil' row for a reference_year whose values
-- are crosswalked from the pre-2021 LOR scheme (area-only weights distort counts
-- at those grains). The crosswalked years are read from
-- int_ewr_demographics_wide.source_area_vintage, not hard-coded. A second branch
-- checks the converse: every crosswalked year still has its 'bzr', 'pgr' and
-- 'bezirk' rows (kept by design). Severity error.
{{ config(severity="error") }}

with
    crosswalked_years as (
        select distinct reference_year
        from {{ ref("int_ewr_demographics_wide") }}
        where source_area_vintage = 'lor_pre2021'
    ),

    leaked as (
        select m.area_level, m.reference_year, count(*) as n_rows
        from {{ ref("mart_area_demographics") }} as m
        inner join crosswalked_years as y on m.reference_year = y.reference_year
        where m.city_code = 'BER' and m.area_level in ('plr', 'ortsteil')
        group by m.area_level, m.reference_year
    ),

    kept_levels as (select unnest(['bzr', 'pgr', 'bezirk']) as area_level),

    missing as (
        select k.area_level, y.reference_year, 0 as n_rows
        from crosswalked_years as y
        cross join kept_levels as k
        left join
            {{ ref("mart_area_demographics") }} as m
            on k.area_level = m.area_level
            and y.reference_year = m.reference_year
            and m.city_code = 'BER'
        where m.area_code is null
    )

select 'leaked' as failure, area_level, reference_year, n_rows
from leaked
union all
select 'missing' as failure, area_level, reference_year, n_rows
from missing
