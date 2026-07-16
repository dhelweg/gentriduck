-- int_gentrification_ts.sql
-- R-A1 re-grounding (#64): time-series panel combining D3 predictors (POI), D1/D2
-- outcomes (MSS Status/Dynamik), and D4 baseline covariate (EWR composite).
-- B7 (#117): extended with lor_pre2021 branch (MSS 2015/2017/2019) for thesis-era
-- H2/H3 lead-lag panel.
--
-- ADR-0008 architectural fix: the pre-R-A1 model averaged a predictor (POI z-scores)
-- and an outcome (EWR composite negated) into a single gentrification_score — a formula
-- with no theoretical grounding that conflated the double invasion-succession cycles
-- (Dangschat 1988) and lost the lead-lag relationship (H3b confirmed / H3a rejected;
-- thesis p. 91).
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
-- delta), NOT of raw count deltas. Controls OSM completeness-bias (~40% coverage;
-- ADR-0008 D5). C5 geo-DS sign-off: PASS (docs/epic-c/C5-geo-signoff.md, 2026-06-19).
--
-- THREE BRANCHES (B7 #117; Hamburg branch added #40 H1 integration slice):
-- Branch A — lor_2021 (2021–2025):
-- MSS area_vintage='lor_2021'; POI from int_poi_status_dynamism (lor_2021, all years);
-- EWR from int_ewr_socioeco (lor_2021, all years). Join on (area_code, edition year).
-- Branch B — lor_pre2021 (2015, 2017, 2019):
-- MSS area_vintage='lor_pre2021'; POI from int_poi_status_dynamism_pre2021
-- (lor_pre2021, 2008-2020); EWR from int_ewr_socioeco_pre2021 (lor_pre2021, 2008-2020).
-- Join on (area_code, edition year) — codes match within the lor_pre2021 system.
-- Branch C — Hamburg 'current' (2013-2025, ADR-0014):
-- Outcome from int_hamburg_sozialmonitoring_index (annual editions, statistisches
-- Gebiet grain, numeric-mapped D1/D2 -- see that model's header for the
-- methodology-bearing label mapping); POI from int_poi_status_dynamism
-- (already city-agnostic, filtered to city_code='HH'); EWR from
-- int_ewr_socioeco_hamburg (two-grain-reconciled composite -- see that model's
-- header for the ADR-0014 open-question-#5 methodology). Join on
-- (area_code, edition year). city_code='HH' throughout, distinguishing this
-- branch from Berlin's 'BER'/'berlin' rows in every downstream consumer.
--
-- Z-score cross-vintage note (binding; index-definition.md §6.2):
-- lor_pre2021 z-scores (int_poi_status_dynamism_pre2021, int_ewr_socioeco_pre2021)
-- are normalised within the lor_pre2021 PLR population (~447 PLRs) for each year.
-- lor_2021 z-scores are normalised within the lor_2021 population (542 PLRs).
-- Cross-vintage z-score comparison is NOT valid. int_mss_lead_lag enforces
-- within-vintage lag computation (base.area_vintage = lagged.area_vintage).
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
-- depends_on: {{ ref('int_poi_status_dynamism_pre2021') }}
-- depends_on: {{ ref('stg_berlin_mss') }}
-- depends_on: {{ ref('int_ewr_socioeco') }}
-- depends_on: {{ ref('int_ewr_socioeco_pre2021') }}
-- depends_on: {{ ref('int_hamburg_sozialmonitoring_index') }}
-- depends_on: {{ ref('int_ewr_socioeco_hamburg') }}
-- depends_on: {{ ref('int_poi_status_dynamism_improved') }}
-- depends_on: {{ ref('int_poi_status_dynamism_improved_pre2021') }}
-- depends_on: {{ ref('int_berlin_brw_trend') }}
-- depends_on: {{ ref('int_berlin_displacement_subindex') }}
--
-- OA-B.3 (#172) / OA-ablation (#261): status_score_improved /
-- dynamism_score_improved / disinvestment_score_improved columns carry the
-- tier-weighted "improved" POI predictor, joined into Branch A (lor_2021,
-- Berlin, via int_poi_status_dynamism_improved) AND Branch B (lor_pre2021,
-- Berlin, via int_poi_status_dynamism_improved_pre2021, #261) -- STILL NULL in
-- Branch C (Hamburg; seed_poi_offering_relevance is not validated for
-- Hamburg's taxonomy, out of #261's scope). NEVER blended with the faithful
-- status_score/dynamism_score above (ADR-0017 D3/D4 methodology_variant
-- discriminator). Branch A and Branch B improved z-scores are each normalised
-- within their own PLR population/vintage (542 vs 448 PLRs) -- NOT cross-
-- vintage comparable, same rule as every other z-score column here (see
-- int_poi_status_dynamism_improved_pre2021's header for the #261 tier-weight
-- review that grounds reusing seed_poi_offering_relevance unchanged for the
-- lor_pre2021 taxonomy).
--
-- D3-brw-wire (#273): brw_trend / brw_yoy_pct_change columns thread the BRW
-- change/rent-gap-realisation signal (int_berlin_brw_trend, #263) through as
-- a PREDICTOR/lead-side field (ADR-0008; D3-brw-trend-geo-signoff condition
-- C1) -- change-positive polarity (high = land value rising faster than the
-- citywide PLR average = upgrading pressure being actively realised, Smith
-- 1979), the OPPOSITE convention from the D1/D2 vulnerability-positive
-- outcome side. NEVER blended with status_index/dynamik_index or the D4
-- ewr_composite. Berlin lor_2021 rows only (int_berlin_brw_trend's own
-- back-series/grain constraint -- BRW pre2021 back-series depth and Hamburg
-- BRW sourcing are both open, unresolved questions, not addressed here);
-- NULL in Branch B (lor_pre2021) and Branch C (Hamburg), same
-- graceful-degradation convention as *_improved above. Not a measured rent
-- or displacement outcome -- read jointly with low-status/low-Wohnlage
-- context (D3-brw-trend-domain-signoff point D5), never alone as a
-- displacement-risk score.
--
-- D5-wire (#258): displacement_subindex / displacement_subindex_is_partial /
-- under_milieuschutz / milieuschutz_overlap_frac columns thread the ADR-0008
-- D5 displacement/affordability predictor (int_berlin_displacement_subindex)
-- through as a PREDICTOR/lead-side field, same side as D3 -- NEVER blended
-- with the D1/D2 MSS outcome or the D4 ewr_composite baseline. Higher
-- displacement_subindex = higher displacement/affordability pressure from
-- whichever of {turnover_proxy, rent_pressure_proxy} is available for that
-- year (NULL only when both underlying proxies are null -- a verified
-- coverage finding in that model's header shows a strict both-required rule
-- would be permanently empty given today's data, so this is a documented
-- partial-availability composite, not silent imputation).
-- displacement_subindex_is_partial flags rows fed by only one component.
-- under_milieuschutz / milieuschutz_overlap_frac are DISCLOSURE-ONLY and
-- time-invariant (current-state Sec. 172 BauGB designation, repeated across
-- every snapshot_year of a PLR) -- read jointly, never treated as a third
-- annual input to displacement_subindex (D5-wire-domain-signoff.md point
-- D-1). Berlin lor_2021 rows only (int_berlin_displacement_subindex's own
-- scope constraint, same as D3-brw-wire); NULL in Branch B (lor_pre2021) and
-- Branch C (Hamburg), same graceful-degradation convention as brw_trend
-- above.
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

-- R-A8b (#260) refactor: typology classification extracted to the shared
-- transform/macros/typology_stage.sql macro (behaviour-preserving -- identical CASE
-- logic,
-- now reusable by int_gentrification_ts_unified_2021.sql). Invoked below via the
-- typology_stage macro call against the mss status_index/dynamik_index columns.
with
    -- Branch A sources: lor_2021 (2021–2025)
    poi_2021 as (select * from {{ ref("int_poi_status_dynamism") }}),
    mss_2021 as (
        select * from {{ ref("stg_berlin_mss") }} where area_vintage = 'lor_2021'
    ),
    ewr_2021 as (select * from {{ ref("int_ewr_socioeco") }}),

    -- OA-B.3 (#172): tier-weighted "improved" POI predictor, Berlin lor_2021
    -- branch only (see int_poi_status_dynamism_improved header for scope note
    -- -- seed_poi_offering_relevance is not validated for lor_pre2021 or
    -- Hamburg's taxonomy). NOT joined into Branch B/C below; those columns are
    -- NULL there (see joined_pre2021/joined_hamburg).
    poi_improved_2021 as (select * from {{ ref("int_poi_status_dynamism_improved") }}),

    -- D3-brw-wire (#273): BRW change/rent-gap-realisation predictor, Berlin
    -- lor_2021 branch only (see int_berlin_brw_trend header -- grain is
    -- fixed to lor_2021 PLR geometries; pre2021/Hamburg BRW sourcing is not
    -- addressed by this ticket). NOT joined into Branch B/C below; those
    -- columns are NULL there (see joined_pre2021/joined_hamburg).
    brw_2021 as (select * from {{ ref("int_berlin_brw_trend") }}),

    -- D5-wire (#258): displacement/affordability predictor, Berlin lor_2021
    -- branch only (see int_berlin_displacement_subindex header -- grain is
    -- fixed by its turnover_proxy spine, same constraint class as brw_2021
    -- above). NOT joined into Branch B/C below; those columns are NULL there
    -- (see joined_pre2021/joined_hamburg).
    displacement_2021 as (select * from {{ ref("int_berlin_displacement_subindex") }}),

    -- Branch B sources: lor_pre2021 (2015, 2017, 2019)
    poi_pre2021 as (select * from {{ ref("int_poi_status_dynamism_pre2021") }}),
    mss_pre2021 as (
        select * from {{ ref("stg_berlin_mss") }} where area_vintage = 'lor_pre2021'
    ),
    ewr_pre2021 as (select * from {{ ref("int_ewr_socioeco_pre2021") }}),

    -- OA-ablation (#261): tier-weighted "improved" POI predictor, lor_pre2021
    -- branch (see int_poi_status_dynamism_improved_pre2021 header for the
    -- tier-weight review grounding this extension). Joined into Branch B
    -- below; NOT joined into Branch C (Hamburg).
    poi_improved_pre2021 as (
        select * from {{ ref("int_poi_status_dynamism_improved_pre2021") }}
    ),

    -- Branch C sources: Hamburg 'current' (2013-2025, #40 H1 integration slice)
    poi_hamburg as (
        select * from {{ ref("int_poi_status_dynamism") }} where city_code = 'HH'
    ),
    mss_hamburg as (select * from {{ ref("int_hamburg_sozialmonitoring_index") }}),
    ewr_hamburg as (select * from {{ ref("int_ewr_socioeco_hamburg") }}),

    -- Branch A: lor_2021 join (POI and EWR already carry area_vintage='lor_2021')
    joined_2021 as (
        select
            'BER' as city_code,
            mss.edition as snapshot_year,
            mss.area_code,
            mss.area_vintage,
            poi.total_poi_count,
            poi.plr_poi_share_prev_year,
            poi.share_yoy_change,
            poi.status_score,
            poi.dynamism_score,
            mss.status_index,
            mss.dynamik_index,
            mss.gesamtindex,
            mss.edition as mss_edition,
            (mss.gesamtindex is null) as is_uninhabited,
            {{ typology_stage('mss.status_index', 'mss.dynamik_index') }}
            as typology_stage,
            ewr.ewr_composite,
            ewr.foreigners_share,
            ewr.age_under18_share,
            ewr.migration_background_share,
            ewr.mean_age_years,
            ewr.residence_duration_5y_share,
            ewr.residents_total,
            (poi.status_score + poi.dynamism_score - ewr.ewr_composite)
            / 3.0 as legacy_gentrification_score,
            -- OA-B.3 (#172): tier-weighted "improved" predictor variant, kept
            -- as separate columns -- NEVER blended with the faithful
            -- status_score/dynamism_score above (ADR-0017 D3/D4). NULL where
            -- int_poi_status_dynamism_improved has no matching row (e.g. a
            -- PLR/year the weighted composite could not compute, same
            -- graceful-degradation convention as every other predictor here).
            poi_improved.status_score_improved,
            poi_improved.dynamism_score_improved,
            poi_improved.disinvestment_score_improved,
            -- D3-brw-wire (#273): predictor/lead-side, change-positive (never
            -- blended with D1/D2 outcome or D4 baseline above). NULL where
            -- int_berlin_brw_trend has no matching row (e.g. a PLR/year
            -- without residential BRW coverage or the first change-year,
            -- same graceful-degradation convention as every other predictor
            -- here).
            brw.brw_trend,
            brw.brw_yoy_pct_change,
            -- D5-wire (#258): predictor/lead-side, pressure-positive (never
            -- blended with D1/D2 outcome or D4 baseline above). NULL where
            -- int_berlin_displacement_subindex has no matching row, same
            -- graceful-degradation convention as every other predictor here.
            disp.displacement_subindex,
            disp.is_partial_availability as displacement_subindex_is_partial,
            disp.under_milieuschutz,
            disp.milieuschutz_overlap_frac
        from mss_2021 as mss
        inner join
            poi_2021 as poi
            on mss.area_code = poi.area_code
            and mss.edition = poi.snapshot_year
        left join
            ewr_2021 as ewr
            on mss.area_code = ewr.area_code
            and mss.edition = ewr.reference_year
        left join
            poi_improved_2021 as poi_improved
            on mss.area_code = poi_improved.area_code
            and mss.edition = poi_improved.snapshot_year
        left join
            brw_2021 as brw
            on mss.area_code = brw.area_code
            and mss.area_vintage = brw.area_vintage
            and mss.edition = brw.snapshot_year
        left join
            displacement_2021 as disp
            on mss.area_code = disp.area_code
            and mss.area_vintage = disp.area_vintage
            and mss.edition = disp.reference_year
    ),

    -- Branch B: lor_pre2021 join (B7 #117).
    -- POI and EWR are also in the lor_pre2021 system so area_code matches directly.
    -- EWR z-scores are lor_pre2021-population-normalised (not cross-vintage
    -- comparable).
    -- Thesis §3.2: thesis computed all scores within the contemporaneous ~447-PLR
    -- system.
    joined_pre2021 as (
        select
            'BER' as city_code,
            mss.edition as snapshot_year,
            mss.area_code,
            mss.area_vintage,
            poi.total_poi_count,
            poi.plr_poi_share_prev_year,
            poi.share_yoy_change,
            poi.status_score,
            poi.dynamism_score,
            mss.status_index,
            mss.dynamik_index,
            mss.gesamtindex,
            mss.edition as mss_edition,
            (mss.gesamtindex is null) as is_uninhabited,
            {{ typology_stage('mss.status_index', 'mss.dynamik_index') }}
            as typology_stage,
            ewr.ewr_composite,
            ewr.foreigners_share,
            ewr.age_under18_share,
            ewr.migration_background_share,
            ewr.mean_age_years,
            ewr.residence_duration_5y_share,
            ewr.residents_total,
            -- NOT CROSS-VINTAGE COMPARABLE (B7-geo-signoff C-3): ewr_composite std
            -- ~0.34
            -- in lor_pre2021 vs ~0.84 in lor_2021 due to high foreigners↔migration
            -- r≈0.93.
            -- legacy_gentrification_score is a pre-R-A1 diagnostic retained per
            -- ADR-0004;
            -- DO NOT compare across vintages or use for new analysis.
            (poi.status_score + poi.dynamism_score - ewr.ewr_composite)
            / 3.0 as legacy_gentrification_score,
            -- OA-ablation (#261): "improved" predictor now computed for the
            -- lor_pre2021 branch too (int_poi_status_dynamism_improved_pre2021
            -- -- see that model's header for the tier-weight review
            -- concluding seed_poi_offering_relevance transfers unchanged).
            -- NULL where int_poi_status_dynamism_improved_pre2021 has no
            -- matching row, same graceful-degradation convention as every
            -- other predictor here. Normalised within the lor_pre2021
            -- population (448 PLRs) -- NOT cross-vintage comparable with
            -- Branch A's lor_2021-normalised improved z-scores.
            poi_improved_pre2021.status_score_improved,
            poi_improved_pre2021.dynamism_score_improved,
            poi_improved_pre2021.disinvestment_score_improved,
            -- D3-brw-wire (#273): int_berlin_brw_trend is lor_2021-grain only
            -- (BRW pre2021 back-series depth is an open, unresolved question,
            -- not addressed by this ticket) -- NULL, never backfilled from
            -- the lor_2021 branch (no cross-vintage comparison, same rule as
            -- every other predictor column here).
            cast(null as double) as brw_trend,
            cast(null as double) as brw_yoy_pct_change,
            -- D5-wire (#258): int_berlin_displacement_subindex is lor_2021-
            -- grain only (its own turnover_proxy spine constraint) -- NULL,
            -- never backfilled from the lor_2021 branch (no cross-vintage
            -- comparison, same rule as every other predictor column here).
            cast(null as double) as displacement_subindex,
            cast(null as boolean) as displacement_subindex_is_partial,
            cast(null as boolean) as under_milieuschutz,
            cast(null as double) as milieuschutz_overlap_frac
        from mss_pre2021 as mss
        inner join
            poi_pre2021 as poi
            on mss.area_code = poi.area_code
            and mss.edition = poi.snapshot_year
        left join
            ewr_pre2021 as ewr
            on mss.area_code = ewr.area_code
            and mss.edition = ewr.reference_year
        left join
            poi_improved_pre2021
            on mss.area_code = poi_improved_pre2021.area_code
            and mss.edition = poi_improved_pre2021.snapshot_year
    ),

    -- Branch C: Hamburg join (#40 H1 integration slice).
    -- mss_hamburg (int_hamburg_sozialmonitoring_index) already carries numeric
    -- status_index/dynamik_index on the SAME 1-4/1-3 scale as Berlin's MSS (see
    -- that model's header for the label-mapping methodology), so the typology_stage()
    -- macro
    -- (D1xD2 matrix, ADR-0008) applies unmodified -- the matrix logic operates
    -- purely on the shared numeric scale, not on any Berlin-specific column.
    -- ewr_hamburg (int_ewr_socioeco_hamburg) carries a 3-indicator composite
    -- (vs Berlin's 5-indicator) -- see that model's header for why migration_
    -- background_share and residence_duration_5y_share are NULL for Hamburg
    -- rows (not available in the ingested Hamburg source set, ADR-0014 open
    -- question #3).
    -- is_uninhabited: Hamburg has no gesamtindex analogue; a Gebiet below the
    -- Sozialmonitoring's own >300-resident threshold is simply absent from
    -- mss_hamburg for that edition (row-absence, not a NULL flag -- see
    -- int_hamburg_sozialmonitoring_index header) and therefore never appears
    -- here at all via the inner join below. is_uninhabited is hard-coded FALSE
    -- for all Hamburg rows that do appear (they are, by construction, above
    -- the scoring threshold).
    joined_hamburg as (
        select
            'HH' as city_code,
            mss.edition as snapshot_year,
            mss.area_code,
            mss.area_vintage,
            poi.total_poi_count,
            poi.plr_poi_share_prev_year,
            poi.share_yoy_change,
            poi.status_score,
            poi.dynamism_score,
            mss.status_index,
            mss.dynamik_index,
            mss.gesamtindex,
            mss.edition as mss_edition,
            false as is_uninhabited,
            {{ typology_stage('mss.status_index', 'mss.dynamik_index') }}
            as typology_stage,
            ewr.ewr_composite,
            ewr.foreigners_share,
            ewr.age_under18_share,
            cast(null as double) as migration_background_share,
            cast(null as double) as mean_age_years,
            cast(null as double) as residence_duration_5y_share,
            ewr.residents_total,
            -- NOT CROSS-CITY COMPARABLE to Berlin's legacy_gentrification_score
            -- (different EWR indicator set; see int_ewr_socioeco_hamburg header).
            -- Retained only for Hamburg-internal diagnostic parity with the
            -- Berlin branches' own column, per ADR-0004.
            (poi.status_score + poi.dynamism_score - ewr.ewr_composite)
            / 3.0 as legacy_gentrification_score,
            -- OA-B.3 (#172): "improved" predictor is Berlin-only (see
            -- int_poi_status_dynamism_improved scope note) -- NULL for Hamburg.
            cast(null as double) as status_score_improved,
            cast(null as double) as dynamism_score_improved,
            cast(null as double) as disinvestment_score_improved,
            -- D3-brw-wire (#273): int_berlin_brw_trend is Berlin-only (see
            -- int_berlin_brw_plr header -- source BRW data is a Berlin GIS
            -- product; Hamburg BRW sourcing is an open, unresolved question,
            -- not addressed by this ticket) -- NULL for Hamburg.
            cast(null as double) as brw_trend,
            cast(null as double) as brw_yoy_pct_change,
            -- D5-wire (#258): int_berlin_displacement_subindex is Berlin-only
            -- (source proxies are all Berlin GIS/EWR/MSS products; Hamburg
            -- sourcing is an open, unresolved question, not addressed by this
            -- ticket) -- NULL for Hamburg.
            cast(null as double) as displacement_subindex,
            cast(null as boolean) as displacement_subindex_is_partial,
            cast(null as boolean) as under_milieuschutz,
            cast(null as double) as milieuschutz_overlap_frac
        from mss_hamburg as mss
        inner join
            poi_hamburg as poi
            on mss.area_code = poi.area_code
            and mss.edition = poi.snapshot_year
        left join
            ewr_hamburg as ewr
            on mss.area_code = ewr.area_code
            and mss.edition = ewr.reference_year
    )

-- UNION all three branches. No row can appear in more than one (area_vintage /
-- city_code combinations are disjoint: 'BER'+'lor_2021', 'BER'+'lor_pre2021',
-- 'HH'+'current').
select *
from joined_2021
union all
select *
from joined_pre2021
union all
select *
from joined_hamburg
