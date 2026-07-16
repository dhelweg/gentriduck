-- int_berlin_milieuschutz_event_panel.sql
-- A10-P2 (#259) -- DRAFT / PENDING FRESH GEO-DS + DOMAIN SIGN-OFF (R-C1), header-fix
-- revision.
--
-- Purpose: mechanical panel-construction step for a difference-in-differences /
-- event-study on Milieuschutz (soziale Erhaltungsverordnung) designation. #80's Part 1
-- (early-warning indicator, closed) explicitly parked Part 2 ("DiD/event-study
-- explicitly
-- OUT OF SCOPE and parked; nothing here claims a causally identified treatment
-- effect" --
-- analysis/e4_early_warning.py header). #259 re-opens Part 2.
--
-- What this model does: joins the outcome time series (sourced directly from
-- stg_berlin_mss -- see OUTCOME SOURCE below) to each PLR's Milieuschutz designation
-- status (int_berlin_milieuschutz_plr_flag, #70/B1 fourth slice) and computes event
-- time
-- (years since designation) for treated PLRs. This is PURELY the treatment/control
-- panel
-- assembly -- it does NOT run any DiD/event-study regression, choose a control-matching
-- strategy, or apply spatial controls. Those are the actual causal-identification
-- design
-- decisions #259 requires geo-DS + domain-expert sign-off on (see open questions
-- below);
-- this model only gets the input panel into a shape that estimation code can consume
-- once
-- that design is approved.
--
-- CENTRAL DOMAIN CONCERN (gentrification-domain-expert sign-off, docs/epic-e/
-- A10-P2-milieuschutz-panel-domain-signoff.md, "blocking item"): Milieuschutz
-- designation
-- is NOT an exogenous shock -- it is an ENDOGENOUS POLICY RESPONSE. Senate designation
-- criteria explicitly screen for gentrification indicators (rising rents,
-- Umwandlungs- and
-- modernization pressure, resident-composition risk) BEFORE the fact, so treatment is
-- assigned on the basis of the pre-treatment trajectory of the very outcome being
-- studied --
-- the textbook selection-on-outcome / reverse-causality confounder for DiD. Treated
-- PLRs
-- are, by the selection mechanism, exactly those with the steepest pre-designation
-- upgrading dynamik, so parallel pre-trends against a naive control pool are not merely
-- "possibly" violated -- they are EXPECTED to be violated by construction. A naive
-- DiD also
-- risks an Ashenfelter-dip / mean-reversion bias toward a SPURIOUS "mitigation"
-- finding --
-- the ethically dangerous direction (over-claiming Milieuschutz "works"). This is the
-- same
-- causal-arrow-runs-backward finding already established by the B1 domain sign-off
-- (docs/methodology/B1-milieuschutz-domain-signoff.md §b: "the causal arrow runs from
-- 'neighbourhood the Senate judged at risk' to 'designation'") and #80 finding W3 (the
-- lead-lag relationship is a SIGNAL, not an identified effect) -- this panel exists
-- precisely to carry that parked W3 caveat forward into any future estimation, and any
-- estimation ticket consuming it MUST treat endogenous selection-on-outcome as the
-- first-order identifying-assumption threat, not an incidental caveat.
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
-- than waiting to repeat the same defect): sources status_index/dynamik_index/
-- typology_stage directly from stg_berlin_mss (the full MSS outcome panel) -- NOT from
-- int_gentrification_ts, whose Branch B inner-joins MSS to POI data and would silently
-- drop the 2013 edition and any PLR/year lacking POI coverage (see #260's C2 finding,
-- docs/epic-e/R-A8b-trajectory-unify-geo-signoff.md). Filtering an outcome/treatment
-- panel
-- by predictor availability would bias which PLRs receive a DiD observation -- this
-- model
-- never joins to int_gentrification_ts or any POI-derived table at all, so that defect
-- cannot occur here. typology_stage is computed via the shared
-- transform/macros/typology_stage.sql macro (same one #260 extracted), not borrowed
-- from
-- a predictor-joined table.
--
-- Event time definition: event_time = snapshot_year - designation_year, for MSS-outcome
-- panel years vs the PLR's earliest Milieuschutz in-force year. NULL for
-- never-treated PLRs
-- (under_milieuschutz = false) -- these form the raw control pool,
-- unfiltered/unmatched.
--
-- OPEN QUESTIONS FOR GEO-DS + DOMAIN-EXPERT SIGN-OFF (flagged, not decided here):
-- 1. Staggered adoption: Milieuschutz designations were enacted at many different
-- dates.
-- The built panel's earliest_in_force_date spans 1999-2026 (verified directly against
-- the built table -- NOT a narrow 2016-2023 window). This means many treated PLRs were
-- designated BEFORE the 2013-2025 outcome window even begins: these are
-- "always-treated"
-- units with no in-panel pre-period at all, must be excluded from BOTH the
-- treated-cohort
-- and control roles at estimation time (a staggered-adoption estimator like Callaway &
-- Sant'Anna 2021 cannot estimate an ATT(g,t) for a cohort whose treatment date precedes
-- the first observed period), and must not be silently dropped without disclosure. This
-- panel correctly keeps such PLRs out of the control pool already (they carry
-- under_milieuschutz = true), which is the right default, but the eventual estimation
-- code must explicitly partition never-treated / in-window-treated / pre-window
-- (always-treated) rather than assume only two groups exist. The classic
-- two-way-fixed-effects DiD estimator is known to be biased under staggered adoption
-- with heterogeneous treatment effects regardless (Goodman-Bacon 2021, Callaway &
-- Sant'Anna 2021) -- estimator choice is a first-order design decision not made here.
-- 2. Control group definition: the "never-treated" PLR pool (under_milieuschutz =
-- false)
-- is the naive control pool below, unfiltered, and per the domain sign-off this is
-- **NOT DEFENSIBLE AS AN UNMATCHED CONTROL GROUP** (not merely an open choice) --
-- Milieuschutz is deliberately targeted at high-pressure inner-city Kieze, so a large
-- share of never-designated PLRs were never designated BECAUSE they are under no
-- upgrading pressure at all (stable-established or declining areas the Senate had no
-- reason to protect). Comparing high-pressure treated Kieze to zero-pressure
-- never-treated PLRs estimates the difference between different neighbourhood TYPES,
-- not
-- the effect of designation. A credible design needs either a matched-control approach
-- (e.g. on baseline D4/status_index or spatial proximity via R-A9's weights,
-- analysis/a9_spatial_dynamic.py) or a not-yet-treated timing-control frame in a
-- staggered design. The panel correctly carries the raw pool unfiltered and defers the
-- matching decision to the estimation ticket -- that division of labour is fine -- but
-- the naive pool must never be used as-is for a published estimate.
-- 3. Only one MSS/status_index observation exists per 2-year edition (biennial cadence,
-- lor_2021) or per PLR-vintage-specific cadence -- event_time granularity is
-- therefore in
-- 2-year MSS-edition steps, not designation-exact years. Adequate for a directional
-- event study (Epic B framing) but coarse; the real risk is event_time=0 boundary
-- misclassification (a designation in force late in its calendar year can be coded
-- "post" for a same-year snapshot preceding the actual in-force date) -- estimation
-- code should treat event_time=0 as an ambiguous/transition bin rather than a clean
-- post period.
-- 4. Cross-vintage designations (a PLR whose Milieuschutz status differs between its
-- lor_pre2021 and lor_2021 boundary definition) are carried as-is per area_vintage --
-- NOT unified via the #260 crosswalk (that model is itself still gated by its own
-- forward-binding conditions before consumption; not depended on here to keep this
-- ticket's review scope independent). The 2019->2021 vintage break coincides with the
-- LOR boundary redefinition, so a PLR's identity is not continuous across it --
-- estimation should run within-vintage, or adopt the #260 crosswalk once that model's
-- forward-binding conditions are separately cleared.
-- 5. Outcome variable choice for the DiD (status_index level? dynamik_index? a derived
-- displacement-pressure indicator per #80's `consolidation-pressure` typology stage?)
-- is not decided here -- all outcome columns are passed through unfiltered so
-- estimation code can choose. Domain read (not binding, recorded for the estimation
-- gate): status_index LEVEL is the LEAST appropriate primary outcome -- Milieuschutz
-- does not aim to hold status down, it aims to prevent displacement of the existing
-- resident population via modernization/conversion (Umwandlung), so a rising status
-- level can coexist with either successful tenant protection or failure, conflating
-- "the area got richer" with "the incumbents were pushed out." dynamik_index (the PACE
-- of change) is closer to the theorized mechanism (does designation slow
-- socially-selective upgrading?). MSS Status/Dynamik overall is only a coarse,
-- biennial,
-- ordinal PROXY for what Milieuschutz actually protects (tenant turnover, residence
-- duration, rent, Umwandlung) -- the more policy-faithful outcomes live in EWR
-- (residence-duration/turnover) and Mietspiegel, a separate future data lift, not built
-- here.
--
-- Output grain: (city_code, area_code, area_vintage, snapshot_year).
-- dbt_meta_owner: data-engineer
-- status: DRAFT -- pending fresh methodology gate on this header revision; not consumed
-- by any analysis script yet.
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
