-- int_gentrification_ts.sql
-- R-A1 re-grounding (#64): time-series panel combining D3 predictors (POI), D1/D2
-- outcomes
-- (MSS Status/Dynamik), and D4 baseline covariate (EWR composite).
--
-- ADR-0008 architectural fix: the pre-R-A1 model averaged a predictor (POI z-scores)
-- and
-- an outcome (EWR composite negated) into a single gentrification_score — a formula
-- with no
-- theoretical grounding that conflated the double invasion-succession cycles
-- (Dangschat 1988)
-- and lost the lead-lag relationship (H3b confirmed / H3a rejected; thesis p. 91).
--
-- Dimension map (ADR-0008; index-definition.md §0.2):
-- D1 = MSS status_index (1=hoch … 4=sehr_niedrig)     → social STATUS outcome (state)
-- D2 = MSS dynamik_index (1=positiv, 2=stabil, 3=negativ) → social DIRECTION outcome
-- D3 = POI status_score / dynamism_score (C5-corrected) → commercial PREDICTOR
-- D4 = EWR composite + 5 indicators                    → demographic BASELINE COVARIATE
--
-- D1 POLARITY NOTE (thesis §3.2, reference/system/50_lor_mss_idx_bzr_idx.sql):
-- status_index = 4 (sehr_niedrig) is the MOST deprived / most vulnerable area.
-- The 2018 thesis used `status_summe` where HIGHER = MORE deprived.
-- These are INVERSE numeric scales encoding the identical deprivation gradient.
-- 2018-high-status_summe ↔ status_index = 4 ↔ most-vulnerable. Any comparison
-- to the 2018 baseline must apply an explicit flip (index-definition.md §5).
--
-- C5 correction: dynamism_score is the z-score of share_yoy_change (PLR POI share
-- delta),
-- NOT of raw count deltas. Controls OSM completeness-bias (~40% coverage; ADR-0008 D5).
-- C5 geo-DS sign-off: PASS (docs/epic-c/C5-geo-signoff.md, 2026-06-19).
--
-- Join strategy (index-definition.md §2.5; geo condition 2, binding):
-- POI data (int_poi_status_dynamism): snapshot_year, area_code, area_vintage='lor_2021'
-- MSS data (stg_berlin_mss):          edition year (2013,2015,2017,2019,2021,2023,2025)
-- EWR data (int_ewr_socioeco):        reference_year, area_code,
-- area_vintage='lor_2021'
--
-- SAME-YEAR JOIN: for each MSS edition, attach POI from snapshot_year = edition AND
-- EWR from reference_year = edition. Only years where MSS + POI coexist produce rows.
-- This is the correct structure for the lead-lag (int_mss_lead_lag separates t vs t+k);
-- within this model every row is a LEVEL snapshot at a single edition year.
--
-- Cross-vintage note: int_poi_status_dynamism and int_ewr_socioeco both carry
-- area_vintage='lor_2021' for all years (pre-2021 PLRs crosswalk-remapped in #63).
-- stg_berlin_mss carries native vintage ('lor_pre2021' ≤2019, 'lor_2021' ≥2021).
-- MSS is the determining vintage for the row; POI and EWR are joined on area_code only
-- (their vintage is always 'lor_2021') plus snapshot_year = edition year.
--
-- Uninhabited PLRs: gesamtindex IS NULL in MSS → is_uninhabited = true. These rows are
-- retained here for completeness but MUST be excluded from all regressions, lead-lag,
-- and metric computation (index-definition.md §7.1; R-A3 C3).
--
-- Output grain: (city_code, area_code, area_vintage, snapshot_year) per MSS edition.
-- One row per PLR per MSS edition year where POI data also exists.
-- snapshot_year = MSS edition year (aligned for temporal clarity in the panel).
--
-- Graceful degradation: returns zero rows when any upstream has no rows.
--
-- dbt_meta_owner: data-engineer
-- geo-ds-sign-off: PASS WITH CONDITIONS (R-A1-geo-signoff.md, 2026-06-20, issue #64)
-- depends_on: {{ ref('int_poi_status_dynamism') }}
-- depends_on: {{ ref('stg_berlin_mss') }}
-- depends_on: {{ ref('int_ewr_socioeco') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    poi as (select * from {{ ref("int_poi_status_dynamism") }}),

    mss as (select * from {{ ref("stg_berlin_mss") }}),

    ewr as (select * from {{ ref("int_ewr_socioeco") }}),

    -- Same-year join: MSS edition drives the row; POI and EWR are attached at the
    -- same year.
    -- MSS area_vintage is native ('lor_pre2021' ≤2019, 'lor_2021' ≥2021); POI and EWR
    -- carry area_vintage='lor_2021' for all years. Joining POI/EWR on area_code +
    -- year only.
    -- The result area_vintage follows MSS to preserve the native PLR boundary tracking.
    joined as (
        select
            -- Identity columns (ADR-0005)
            'BER' as city_code,
            mss.edition as snapshot_year,  -- snapshot_year = MSS edition year for panel alignment
            mss.area_code,
            mss.area_vintage,

            -- D3 predictors (POI; C5-corrected — index-definition.md §2.4, binding)
            -- Higher status_score = more POI-rich area (less vulnerable on D3
            -- predictor side).
            -- Higher dynamism_score = faster relative amenity growth (commercial
            -- succession signal).
            -- Use dynamism_score (share-based, C5-corrected) never raw POI count
            -- deltas.
            poi.total_poi_count,
            poi.plr_poi_share_prev_year,
            poi.share_yoy_change,
            poi.status_score,  -- D3 density face: z-score of total_poi_count
            poi.dynamism_score,  -- D3 dynamism face: z-score of share_yoy_change (C5-corrected)

            -- D1 outcome: MSS social status (index-definition.md §1.4, §5)
            -- POLARITY: 1=hoch (high status, low deprivation) … 4=sehr_niedrig (most
            -- deprived).
            -- Lower numeric = higher status = LESS vulnerable (INVERSE of 2018 thesis
            -- status_summe).
            -- See D1 POLARITY NOTE above; flip required for vulnerability-positive
            -- orientation.
            mss.status_index,  -- D1: ordinal 1–4; NULL = uninhabited PLR

            -- D2 outcome: MSS social direction (index-definition.md §1.4)
            -- 1=positiv (improving), 2=stabil, 3=negativ (worsening). Already
            -- vulnerability-positive.
            -- Mapped from WFS di_n {1,3,5} → {1,2,3} in stg_berlin_mss.
            mss.dynamik_index,  -- D2: ordinal 1–3; NULL = uninhabited PLR

            -- 12-group Gesamtindex (tens=status 1–4, units=dynamik WFS code {1,3,5})
            -- NULL = uninhabited PLR. Do NOT use as a 12-level metric ordinal.
            mss.gesamtindex,

            -- MSS edition year (biennial: 2013, 2015, 2017, 2019, 2021, 2023, 2025)
            mss.edition as mss_edition,

            -- Uninhabited PLR flag (index-definition.md §7.1; R-A3 C3).
            -- Exclude is_uninhabited=true rows from ALL regression and lead-lag.
            (mss.gesamtindex is null) as is_uninhabited,

            -- Typology stage (index-definition.md §1.5 MSS Status × Dynamik matrix).
            -- D-2 binding sign guard (domain condition): upgrading stages REQUIRE
            -- non-negativ Dynamik (dynamik_index IN (1, 2)) as a NECESSARY CONDITION.
            -- A negativ Dynamik (=3) in a declining high/mid-status PLR is DECLINE,
            -- not gentrification — it must NEVER promote to an upgrading stage.
            -- This CASE WHEN encodes that guard explicitly.
            --
            -- Thesis §3.2 (Gentrifizierung als Prozess); Dangschat (1988) double
            -- invasion-succession cycle; Döring & Ulbricht (2016) vulnerability
            -- polarity.
            case
                when mss.status_index is null
                then null  -- uninhabited PLR: no typology assignment
                when mss.status_index = 1 and mss.dynamik_index = 1
                then 'consolidation-pressure'
                -- D-2 GUARD: status=1 + dynamik=2 or 3 → stable-established (NOT
                -- upgrading)
                -- dynamik=3 in a high-status PLR is DECLINE, not gentrification
                -- (tension cell *)
                when mss.status_index = 1 and mss.dynamik_index = 2
                then 'stable-established'
                when mss.status_index = 1 and mss.dynamik_index = 3
                then 'stable-established'  -- tension: decline, not gentrification
                when mss.status_index = 2 and mss.dynamik_index = 1
                then 'active-gentrification'
                when mss.status_index = 2 and mss.dynamik_index = 2
                then 'stable-established'
                -- D-2 GUARD: status=2 + dynamik=3 → pre-gentrification (NOT upgrading)
                -- mid-status declining = filtering-down; tension cell *
                when mss.status_index = 2 and mss.dynamik_index = 3
                then 'pre-gentrification'  -- tension: filtering-down
                -- status=3 + dynamik=1: low status improving → pioneer-signal
                -- (D3 dynamism_score can sub-divide further into improving-vulnerable,
                -- but that disambiguation is not done inline here; pioneer-signal is
                -- the primary assignment per index-definition.md §1.5 footnote †)
                when mss.status_index = 3 and mss.dynamik_index = 1
                then 'pioneer-signal'  -- low status + positiv: D3 disambiguates further
                when mss.status_index = 3 and mss.dynamik_index = 2
                then 'pre-gentrification'
                when mss.status_index = 3 and mss.dynamik_index = 3
                then 'pre-gentrification'
                -- status=4 + dynamik=1: canonical "lowest status + positiv Dynamik"
                -- cell
                -- improving-vulnerable: could be incumbent-led improvement OR early
                -- gentrification;
                -- model cannot yet distinguish without D5 (Milieuschutz/rent-burden
                -- data).
                -- (R-A3 C2; index-definition.md §1.3, §1.5 footnote †)
                when mss.status_index = 4 and mss.dynamik_index = 1
                then 'improving-vulnerable'
                when mss.status_index = 4 and mss.dynamik_index = 2
                then 'pre-gentrification'
                when mss.status_index = 4 and mss.dynamik_index = 3
                then 'pre-gentrification'
            end as typology_stage,

            -- D4 baseline covariate (index-definition.md §4.3, binding).
            -- D4 enters ONLY as a LEVEL — a cross-sectional baseline-vulnerability
            -- snapshot.
            -- D4 CHANGES are near-tautological outcome proxies and are EXCLUDED from
            -- the
            -- predictor block (Döring & Ulbricht 2016; §4.2).
            -- Higher ewr_composite = more socio-economically vulnerable population.
            -- All 5 z-score inputs are vulnerability-positive (PR #89, R-A5 §9).
            ewr.ewr_composite,
            ewr.foreigners_share,
            ewr.age_under18_share,
            ewr.migration_background_share,
            ewr.mean_age_years,
            ewr.residence_duration_5y_share,
            ewr.residents_total,

            -- Legacy formula (pre-R-A1) for backward comparison with 2018 thesis
            -- baseline.
            -- This averaged predictors and outcomes, losing the lead-lag relationship.
            -- DO NOT use for new analysis. Kept per ADR-0004 contract backward-compat.
            -- NULL-safe: if any component is NULL, legacy score is NULL.
            (poi.status_score + poi.dynamism_score - ewr.ewr_composite)
            / 3.0 as legacy_gentrification_score
        from mss
        -- Join POI at the same edition year; POI area_vintage is always 'lor_2021'
        inner join
            poi on mss.area_code = poi.area_code and mss.edition = poi.snapshot_year
        -- Left join EWR at the same edition year; EWR area_vintage is always 'lor_2021'
        left join
            ewr on mss.area_code = ewr.area_code and mss.edition = ewr.reference_year
    )

select *
from joined
