-- test_371_ewr_age_bands_sum_to_total.sql
-- #371 pre-registration §3.7 DE check 4 (staging half): in every staged EWR
-- matrix row the 32 narrow age bands partition the population exactly:
-- - Sum(bands) = residents_total (E_E), exact integer equality;
-- - 32 bands, contiguous from 0 to 110 (sum of band widths = 110, min age 0,
-- max age 110);
-- - no partially blank row (a NULL band in a non-blank row would be an
-- undocumented suppression; see stg_berlin_ewr_age_bands header).
-- Returns one row per failing (reference_year, area_code). Severity error.
{{ config(severity="error") }}

select
    reference_year,
    area_code,
    count(*) as n_bands,
    sum(age_to - age_from) as width,
    min(age_from) as min_age,
    max(age_to) as max_age,
    sum(residents) as sum_bands,
    min(residents_total) as residents_total,
    count(residents) as n_non_null
from {{ ref("stg_berlin_ewr_age_bands") }}
group by reference_year, area_code
having
    count(*) != 32
    or sum(age_to - age_from) != 110
    or min(age_from) != 0
    or max(age_to) != 110
    or count(residents) != 32
    or sum(residents) is distinct from min(residents_total)
    or min(residents_total) is distinct from max(residents_total)
