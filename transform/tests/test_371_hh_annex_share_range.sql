-- test_371_hh_annex_share_range.sql
-- #371 pre-registration §3.3 check 2 / ADR-0014 Amendment 2026-11-02: recovered
-- shares (status rows S1-S7) lie in [0, 100] up to the published-rounding error
-- bound recovery_error_bound_pp (z to two decimals, mean/SD to three; see the
-- model header). A share outside [-bound, 100 + bound] cannot come from rounding
-- and means a wrong mean/SD row, a wrong unit (fraction vs %), or a column shift.
-- The pre-registration's own FAIL rule (> 0.5 % of shares outside [-0.5, 100.5])
-- is reported in docs/epic-e/371-data-checks.md (0 shares outside that range).
-- Returns one row per offending cell. Severity error.
{{ config(severity="error") }}

select edition_year, gebiet_id, indicator, share, recovery_error_bound_pp
from {{ ref("stg_hamburg_sozialmonitoring_indicators") }}
where
    indicator_kind = 'status'
    and share is not null
    -- 1e-9: floating-point noise (e.g. -0.0 for a 0 % share in the
    -- full-precision 2020 edition, whose bound is 0).
    and (
        share < - recovery_error_bound_pp - 1e-9
        or share > 100 + recovery_error_bound_pp + 1e-9
    )
