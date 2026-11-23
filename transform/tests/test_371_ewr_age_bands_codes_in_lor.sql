-- test_371_ewr_age_bands_codes_in_lor.sql
-- #371: every PLR code staged from the EWR matrices exists in its LOR vintage:
-- lor_2021 codes in stg_berlin_lor (area_vintage 'lor_2021', area_level 'plr'),
-- lor_pre2021 codes in seed_lor_crosswalk_2006_to_2021.plr_id_pre2021 (so no
-- pre-2021 PLR silently drops out of the crosswalk join). Guards the 2024
-- publisher code typo fix (06200318 -> 06200418) and any future one.
-- Returns one row per unknown (reference_year, area_code). Severity error.
{{ config(severity="error") }}

with
    staged as (
        select distinct reference_year, area_vintage, area_code
        from {{ ref("stg_berlin_ewr_age_bands") }}
    ),

    lor_2021 as (
        select distinct area_code
        from {{ ref("stg_berlin_lor") }}
        where area_vintage = 'lor_2021' and area_level = 'plr'
    ),

    pre2021 as (
        select distinct plr_id_pre2021 as area_code
        from {{ ref("seed_lor_crosswalk_2006_to_2021") }}
        where mapping_type != 'stub'
    )

select s.reference_year, s.area_vintage, s.area_code
from staged as s
left join lor_2021 as l on s.area_code = l.area_code
left join pre2021 as p on s.area_code = p.area_code
where
    (s.area_vintage = 'lor_2021' and l.area_code is null)
    or (s.area_vintage = 'lor_pre2021' and p.area_code is null)
