-- test_358_gentrification_index_stage_matches_ts.sql
-- #358 (docs/epic-g/358-spec.md Rev. 1 §1; geo review C1): the typology_stage that
-- gentrification_index now exposes for variant='live_data' must EQUAL
-- int_gentrification_ts.typology_stage for the same area and period. Both are the
-- shared typology_stage() macro (ADR-0008 D1xD2 matrix; index-definition.md §1.5) on
-- the same D1/D2 ordinals, so any difference means the two paths drifted apart.
--
-- Also asserted here, because they are the same invariant seen from the mart side:
-- - every live_data row has its int_gentrification_ts source row (period YYYY12 ->
-- snapshot_year; the (city_code, area_code, snapshot_year) grain is unique there);
-- - typology_stage equals status_class for live_data (status_class has carried the
-- stage key since R-A1, #64; #358 only exposes it under its own name).
--
-- Returns rows that VIOLATE the invariant. Zero rows = pass.
with
    gi as (
        select city_code, area_code, period_yyyymm, status_class, typology_stage
        from {{ ref("gentrification_index") }}
        where variant = 'live_data'
    ),

    ts as (
        select
            city_code,
            area_code,
            cast(snapshot_year as varchar) || '12' as period_yyyymm,
            typology_stage
        from {{ ref("int_gentrification_ts") }}
    )

select
    gi.city_code,
    gi.area_code,
    gi.period_yyyymm,
    gi.typology_stage as gi_typology_stage,
    gi.status_class as gi_status_class,
    ts.typology_stage as ts_typology_stage,
    (ts.period_yyyymm is null) as is_missing_in_ts
from gi
left join
    ts
    on gi.city_code = ts.city_code
    and gi.area_code = ts.area_code
    and gi.period_yyyymm = ts.period_yyyymm
where
    ts.period_yyyymm is null
    or gi.typology_stage is distinct from ts.typology_stage
    or gi.typology_stage is distinct from gi.status_class
