-- test_mss_gesamtindex_consistency.sql
-- Validates the internal encoding of stg_berlin_mss.gesamtindex:
-- tens digit = status_index (1–4)
-- units digit = Dynamik WFS code (1, 3, or 5) which maps to dynamik_index {1,2,3}
-- Recommended by geo-DS sign-off (R-A3-geo-signoff.md condition C1) to guard against
-- a silently reversed or permuted Dynamik coding that row-count tests cannot catch.
-- Conditioned on gesamtindex IS NOT NULL (uninhabited PLRs are excluded).
{{ config(severity='error') }}

select
    edition,
    area_code,
    status_index,
    dynamik_index,
    gesamtindex,
    'tens digit does not match status_index' as failure_reason
from {{ ref('stg_berlin_mss') }}
where gesamtindex is not null and floor(gesamtindex / 10) != status_index

union all

select
    edition,
    area_code,
    status_index,
    dynamik_index,
    gesamtindex,
    'units digit is not a valid Dynamik WFS code (expected 1, 3, or 5)'
    as failure_reason
from {{ ref('stg_berlin_mss') }}
where gesamtindex is not null and (gesamtindex % 10) not in (1, 3, 5)
