-- test_dynamik_ordering_guard.sql
-- R-A1 C-2 (geo sign-off): Dynamik {1,3,5} → {1,2,3} ordering confirmation.
-- BUILD-BLOCKING prerequisite (severity: error) before any Δstatus/Δdynamik is
-- consumed.
--
-- A reversed/permuted {1,3,5}→{1,2,3} code silently inverts the ENTIRE lead-lag sign
-- and the typology. This test is the cheap internal cross-check (R-A3 C1, R-A3 R4):
--
-- floor(gesamtindex / 10) must equal status_index (tens digit = status class)
-- gesamtindex % 10 must be IN (1, 3, 5)   (units digit = Dynamik WFS code)
--
-- Returns ROWS on failure (which makes the dbt test FAIL).
-- Conditioned on gesamtindex IS NOT NULL (uninhabited PLRs have NULL gesamtindex;
-- §7.1).
--
-- Test geometry (index-definition.md §1.7; R-A3 C1, R-A3 R4; geo-DS C-2):
-- Valid gesamtindex codes: {11,13,15, 21,23,25, 31,33,35, 41,43,45} (12 cells).
-- tens digit = status_index (1–4) → floor(gesamtindex / 10).
-- units digit = Dynamik WFS code (1=positiv, 3=stabil, 5=negativ) → mapped to {1,2,3}.
-- dynamik_index mapping: WFS code 1 → 1 (positiv), WFS code 3 → 2 (stabil),
-- WFS code 5 → 3 (negativ).
--
-- Reference: stg_berlin_mss.sql (ingest_mss.py normalizes WFS di_n {1,3,5} → {1,2,3}).
-- index-definition.md §1.4, §3.4, §1.7.
{{ config(severity="error") }}

select
    edition,
    area_code,
    status_index,
    dynamik_index,
    gesamtindex,
    case
        when gesamtindex is not null and floor(gesamtindex / 10) != status_index
        then 'tens digit does not match status_index'
        when gesamtindex is not null and (gesamtindex % 10) not in (1, 3, 5)
        then 'units digit is not a valid Dynamik WFS code (expected 1, 3, or 5)'
        when
            gesamtindex is not null
            and not (
                (gesamtindex % 10 = 1 and dynamik_index = 1)
                or (gesamtindex % 10 = 3 and dynamik_index = 2)
                or (gesamtindex % 10 = 5 and dynamik_index = 3)
            )
        then
            'mapping direction wrong: WFS {1,3,5} -> {1,2,3} permuted (inverts lead-lag sign)'
    end as failure_reason
from {{ ref("stg_berlin_mss") }}
where
    gesamtindex is not null
    and (
        floor(gesamtindex / 10) != status_index
        or (gesamtindex % 10) not in (1, 3, 5)
        or not (
            (gesamtindex % 10 = 1 and dynamik_index = 1)
            or (gesamtindex % 10 = 3 and dynamik_index = 2)
            or (gesamtindex % 10 = 5 and dynamik_index = 3)
        )
    )
