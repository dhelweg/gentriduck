-- int_berlin_milieuschutz_event_panel.sql
-- A10-P2 (#259) -- DRAFT / PENDING GEO-DS + DOMAIN SIGN-OFF (R-C1).
--
-- Purpose: mechanical panel-construction step for a difference-in-differences /
-- event-study on Milieuschutz (soziale Erhaltungsverordnung) designation. #80's Part 1
-- (early-warning indicator, closed) explicitly parked Part 2 ("DiD/event-study...
-- explicitly
-- OUT OF SCOPE and parked; nothing here claims a causally identified treatment
-- effect" --
-- analysis/e4_early_warning.py header). #259 re-opens Part 2.
--
-- What this model does: joins the outcome time series (int_gentrification_ts) to each
-- PLR's
-- Milieuschutz designation status (int_berlin_milieuschutz_plr_flag, #70/B1 fourth
-- slice) and
-- computes event time (years since designation) for treated PLRs. This is PURELY the
-- treatment/control panel assembly -- it does NOT run any DiD/event-study regression,
-- choose
-- a control-matching strategy, or apply spatial controls. Those are the actual causal-
-- identification design decisions #259 requires geo-DS + domain-expert sign-off on
-- (see open
-- questions below); this model only gets the input panel into a shape that estimation
-- code
-- can consume once that design is approved.
--
-- Grounding (R-C2): reuses int_berlin_milieuschutz_plr_flag's ST_Intersects spatial
-- join and earliest_in_force_date field verbatim
-- (docs/methodology/B1-milieuschutz-geo-signoff.md) -- no new spatial method invented
-- here.
-- Designation date parsing: source dates are DD.MM.YYYY strings (Berlin GDI WFS
-- convention, see stg_berlin_milieuschutz), parsed via DuckDB strptime to extract
-- designation_year.
--
-- OUTCOME SOURCE (learned from #260's geo-DS review, applied proactively here rather
-- than
-- waiting to repeat the same defect): sources status_index/dynamik_index/typology_stage
-- directly from stg_berlin_mss (the full MSS outcome panel), NOT from
-- int_gentrification_ts
-- (whose Branch B inner-joins MSS to POI data, silently dropping the 2013 edition and
-- any
-- PLR/year lacking POI coverage -- see #260's C2 finding, docs/epic-e/
-- R-A8b-trajectory-unify-geo-signoff.md). Filtering an outcome/treatment panel by
-- predictor
-- availability would bias which PLRs receive a DiD observation, the same defect flagged
-- there. typology_stage is computed via the shared transform/macros/typology_stage.sql
-- macro (same one #260 extracted), not borrowed from a predictor-joined table.
--
-- Event time definition: event_time = snapshot_year - designation_year, for MSS-outcome
-- panel years vs the PLR's earliest Milieuschutz in-force year. NULL for
-- never-treated PLRs
-- (under_milieuschutz = false) -- these form the raw control pool,
-- unfiltered/unmatched.
--
-- OPEN QUESTIONS FOR GEO-DS + DOMAIN-EXPERT SIGN-OFF (flagged, not decided here):
-- 1. Staggered adoption: Milieuschutz designations were enacted at many different dates
-- (this panel's earliest_in_force_date spans 2016-2023 per a live query), so this is a
-- STAGGERED treatment-timing DiD setting, not a single common event date. The classic
-- two-way-fixed-effects DiD estimator is known to be biased under staggered adoption
-- with
-- heterogeneous treatment effects (Goodman-Bacon 2021, Callaway & Sant'Anna 2021) --
-- estimator choice is a first-order design decision not made here.
-- 2. Control group definition: "never-treated" PLRs (under_milieuschutz = false) are
-- the
-- naive control pool below, unfiltered. Whether a matched-control design (e.g. on
-- baseline
-- D4/status_index or spatial proximity via R-A9's weights,
-- analysis/a9_spatial_dynamic.py)
-- is needed to satisfy parallel-trends more credibly is not decided here.
-- 3. Only one MSS/status_index observation exists per 2-year edition (biennial cadence,
-- lor_2021) or per PLR-vintage-specific cadence -- event_time granularity is
-- therefore in
-- 2-year MSS-edition steps, not designation-exact years. Whether this is sufficient
-- resolution for a credible event-study is a geo-DS call.
-- 4. Cross-vintage designations (a PLR whose Milieuschutz status differs between its
-- lor_pre2021 and lor_2021 boundary definition) are carried as-is per area_vintage
-- (matching int_gentrification_ts's own vintage-separated grain) -- NOT unified via the
-- #260 crosswalk (that model is itself still pending its own sign-off; not depended on
-- here to keep this ticket's review scope independent).
-- 5. Outcome variable choice for the DiD (status_index level? dynamik_index? a derived
-- displacement-pressure indicator per #80's `consolidation-pressure` typology stage?)
-- is
-- not decided here -- all outcome columns from int_gentrification_ts are passed through
-- unfiltered so estimation code can choose.
--
-- Output grain: (city_code, area_code, area_vintage, snapshot_year).
-- dbt_meta_owner: data-engineer
-- status: DRAFT -- pending methodology gate; not consumed by any analysis script yet.
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer", "status": "draft_pending_methodology_signoff"},
    )
}}

with
    ts as (
        select
            'BER' as city_code,
            area_code,
            area_vintage,
            edition as snapshot_year,
            status_index,
            dynamik_index,
            {{ typology_stage("status_index", "dynamik_index") }} as typology_stage,
            (gesamtindex is null) as is_uninhabited
        from {{ ref("stg_berlin_mss") }}
        where area_vintage in ('lor_pre2021', 'lor_2021')
    ),

    ms_flag as (
        select
            city_code,
            area_code,
            area_vintage,
            under_milieuschutz,
            milieuschutz_designation_count,
            milieuschutz_overlap_frac,
            earliest_in_force_date,
            case
                when earliest_in_force_date is not null
                then extract(year from strptime(earliest_in_force_date, '%d.%m.%Y'))
            end as designation_year
        from {{ ref("int_berlin_milieuschutz_plr_flag") }}
    )

select
    ts.city_code,
    ts.area_code,
    ts.area_vintage,
    ts.snapshot_year,
    ts.status_index,
    ts.dynamik_index,
    ts.typology_stage,
    ts.is_uninhabited,
    coalesce(ms.under_milieuschutz, false) as under_milieuschutz,
    ms.milieuschutz_designation_count,
    ms.milieuschutz_overlap_frac,
    ms.designation_year,
    -- Event time in MSS-edition years; NULL for never-treated (control) PLR-years.
    case
        when ms.under_milieuschutz and ms.designation_year is not null
        then ts.snapshot_year - ms.designation_year
    end as event_time_years,
    -- Pre/post-designation flag; NULL for controls (not a 0/1 -- controls are never
    -- "post").
    case
        when ms.under_milieuschutz and ms.designation_year is not null
        then (ts.snapshot_year >= ms.designation_year)
    end as is_post_designation
from ts
left join
    ms_flag as ms
    on ts.city_code = ms.city_code
    and ts.area_code = ms.area_code
    and ts.area_vintage = ms.area_vintage
order by ts.city_code, ts.area_code, ts.area_vintage, ts.snapshot_year
