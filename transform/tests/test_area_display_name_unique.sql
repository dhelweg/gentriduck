-- test_area_display_name_unique.sql
-- #352: two different areas of the same city, level and vintage must never
-- share a display name -- otherwise a table, a map tooltip or a search box
-- shows two identical labels for different places. dim_area_geometry is the
-- grain the pages read names from (one row per area per vintage), so the
-- check runs there. dim_area itself cannot be checked this way: it collapses
-- both Berlin LOR vintages, and the same place legitimately keeps its name
-- under a new code across vintages.
--
-- Covers the Hamburg Gebiet labels (int_hamburg_gebiet_names) and the Berlin
-- within-vintage disambiguation (int_berlin_lor_name_disambiguation).
-- Rows without a name (the dissolved Berlin 'bezirk' rows, no name source
-- yet) are out of scope here.
--
-- Returns one row per colliding (city_code, area_level, area_vintage,
-- area_name). Zero rows = pass.
select
    city_code,
    area_level,
    area_vintage,
    area_name,
    count(distinct area_code) as n_areas,
    string_agg(distinct area_code, ', ') as area_codes
from {{ ref("dim_area_geometry") }}
where area_name is not null
group by city_code, area_level, area_vintage, area_name
having count(distinct area_code) > 1
