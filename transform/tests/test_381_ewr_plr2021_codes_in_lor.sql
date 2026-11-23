-- test_381_ewr_plr2021_codes_in_lor.sql
-- #381/#372: every plr_id_2021 of int_berlin_ewr_plr2021 is a LOR 2021 PLR code
-- in stg_berlin_lor (area_vintage 'lor_2021', area_level 'plr'). Guards the 2024
-- publisher code typo fix (06200318 -> 06200418, Landweg) and any future one;
-- mirrors test_371_ewr_age_bands_codes_in_lor. Severity error.
{{ config(severity="error") }}

with
    lor_2021 as (
        select distinct area_code
        from {{ ref("stg_berlin_lor") }}
        where area_vintage = 'lor_2021' and area_level = 'plr'
    )

select distinct e.reference_year, e.plr_id_2021
from {{ ref("int_berlin_ewr_plr2021") }} as e
left join lor_2021 as l on e.plr_id_2021 = l.area_code
where l.area_code is null
