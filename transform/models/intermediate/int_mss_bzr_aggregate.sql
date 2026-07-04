-- int_mss_bzr_aggregate.sql
-- B10 (#120): BZR (Bezirksregion) and Bezirk spatial aggregation of MSS, EWR, and POI
-- data.
--
-- MOTIVATION (Thesis §3.2, pp. 55-56):
-- The 2018 thesis ran H1-H3c at three spatial scales:
-- PLR  (~436/542 units)  — smallest LOR planning area
-- BZR  (~137/143 units)  — Bezirksregion (sub-district planning region)
-- Bezirk (~12 units)     — district (borough)
-- The revival runs PLR only; this model adds BZR and Bezirk rollups to enable
-- like-for-like comparison of E1/E2 AUCs across scales (MAUP sensitivity check).
--
-- CODE HIERARCHY (from 8-digit PLR codes):
-- PLR code:    BBZRZZLL  (8 chars)
-- BZR code:    SUBSTR(plr_code, 1, 6)  (143 in lor_2021; 138 in lor_pre2021)
-- Bezirk code: SUBSTR(plr_code, 1, 2)  (12 districts, '01'-'12')
--
-- For lor_pre2021, the first-6-char BZR codes match the 2018 thesis BZR raum_ids
-- exactly
-- (all 137 thesis BZR codes are found via this derivation; verified 2026-06-30).
--
-- AGGREGATION STRATEGY:
-- MSS status_index / dynamik_index are ORDINAL, not metric. For district-level rollup:
-- - Use population-weighted mean of PLR ordinal status codes, rounded to nearest
-- integer
-- and clamped to the ordinal range. This is a population-weighted mean-of-PLR-ordinals
-- approximation that DIFFERS from the Senate/thesis method: the Senate re-z-scores
-- aggregated raw indicators (s1-s4) within the BZR population then re-classifies
-- (reference/system/50_lor_mss_idx_bzr_z.sql, 50_lor_mss_idx_bzr_idx.sql). This
-- model is fit for the directional MAUP probe but may mis-stage boundary BZRs/Bezirke.
-- - residents_total from int_gentrification_ts is the weight (NULL PLRs excluded).
-- - is_uninhabited=TRUE PLRs are excluded from aggregation per index-definition.md
-- §7.1.
--
-- EWR indicators: population-weighted average (shares) or sum (counts) across
-- constituent PLRs.
-- - Intensive indicators (shares, mean_age): WEIGHTED AVERAGE (weight =
-- residents_total).
-- - Extensive indicators (residents_total): SUM.
-- - ewr_composite: population-weighted average of PLR-level composites (valid because
-- composites are z-scored to unit variance; weighting by pop gives a proper aggregate).
--
-- POI data: SUM of PLR-level POI counts within each BZR/Bezirk (from
-- int_poi_features_pivot).
-- POI counts are extensive (each POI belongs to exactly one PLR); district-level total
-- is a simple sum. status_score and dynamism_score are NOT summed — they are re-derived
-- from the PLR-level int_gentrification_ts rows (population-weighted mean of z-scores).
--
-- TYPOLOGY: At BZR/Bezirk level, typology_stage is derived from the aggregated
-- status_index and dynamik_index (both population-weighted mean-of-ordinals, rounded)
-- using the same D1xD2 matrix as PLR. Indicative coarsening approximation only
-- (NOT the official Senate BZR typology); for MAUP diagnostic use only.
--
-- GRAIN:
-- Output: (city_code, area_code, area_vintage, area_level, snapshot_year)
-- area_level: 'bzr' or 'bezirk'
-- area_code: 6-char BZR code or 2-char Bezirk code
-- One row per (area_code, area_vintage, snapshot_year).
--
-- MAUP NOTE (index-definition.md §8):
-- Aggregation changes statistical properties. BZR/Bezirk averages smooth
-- within-district
-- variance. Correlations at coarser scales are typically stronger (spatial
-- autocorrelation
-- amplified by smoothing). Comparisons across scales must account for this MAUP effect.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_gentrification_ts') }}
-- depends_on: {{ ref('int_poi_features_pivot') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Base: PLR-level panel from int_gentrification_ts (excludes uninhabited PLRs)
    plr_base as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            -- BZR = first 6 chars of 8-char PLR code
            substr(area_code, 1, 6) as bzr_code,
            -- Bezirk = first 2 chars of 8-char PLR code ('01'-'12')
            substr(area_code, 1, 2) as bezirk_code,
            status_index,
            dynamik_index,
            -- POI-derived scores (z-scores, population-weighted mean used at rollup)
            status_score,
            dynamism_score,
            total_poi_count,
            -- EWR indicators (for weighted aggregation)
            ewr_composite,
            foreigners_share,
            age_under18_share,
            migration_background_share,
            mean_age_years,
            residence_duration_5y_share,
            residents_total
        from {{ ref("int_gentrification_ts") }}
        where not is_uninhabited and status_index is not null
    ),

    -- BZR-level aggregation
    -- Population-weighted mean of PLR ordinal status codes, rounded to nearest integer.
    -- NOTE: this differs from the Senate/thesis method (re-z-scoring aggregated raw
    -- indicators s1-s4 within the BZR population and re-classifying). Fit for
    -- directional MAUP probe; may mis-stage boundary BZRs.
    -- Clamp to [1, 4] in case of rounding artefacts.
    bzr_agg as (
        select
            city_code,
            'bzr' as area_level,
            bzr_code as area_code,
            area_vintage,
            snapshot_year,
            -- Population-weighted mean status_index, rounded to nearest ordinal (1-4)
            -- Approximation: differs from Senate re-z-score BZR classification method.
            greatest(
                1,
                least(
                    4,
                    cast(
                        round(
                            sum(status_index * coalesce(residents_total, 1.0))
                            / nullif(sum(coalesce(residents_total, 1.0)), 0)
                        ) as integer
                    )
                )
            ) as agg_status_index,
            greatest(
                1,
                least(
                    3,
                    cast(
                        round(
                            sum(dynamik_index * coalesce(residents_total, 1.0))
                            / nullif(sum(coalesce(residents_total, 1.0)), 0)
                        ) as integer
                    )
                )
            ) as agg_dynamik_index,
            -- POI scores: population-weighted mean of PLR z-scores
            sum(status_score * coalesce(residents_total, 1.0))
            / nullif(sum(coalesce(residents_total, 1.0)), 0) as status_score,
            sum(dynamism_score * coalesce(residents_total, 1.0))
            / nullif(sum(coalesce(residents_total, 1.0)), 0) as dynamism_score,
            -- POI counts: sum across constituent PLRs (extensive)
            sum(total_poi_count) as total_poi_count,
            -- EWR composite: population-weighted average
            sum(ewr_composite * coalesce(residents_total, 1.0))
            / nullif(sum(coalesce(residents_total, 1.0)), 0) as ewr_composite,
            -- EWR intensive indicators: population-weighted average
            sum(foreigners_share * coalesce(residents_total, 1.0))
            / nullif(sum(coalesce(residents_total, 1.0)), 0) as foreigners_share,
            sum(age_under18_share * coalesce(residents_total, 1.0))
            / nullif(sum(coalesce(residents_total, 1.0)), 0) as age_under18_share,
            sum(migration_background_share * coalesce(residents_total, 1.0)) / nullif(
                sum(coalesce(residents_total, 1.0)), 0
            ) as migration_background_share,
            sum(mean_age_years * coalesce(residents_total, 1.0))
            / nullif(sum(coalesce(residents_total, 1.0)), 0) as mean_age_years,
            sum(residence_duration_5y_share * coalesce(residents_total, 1.0)) / nullif(
                sum(coalesce(residents_total, 1.0)), 0
            ) as residence_duration_5y_share,
            -- Residents total: sum (extensive)
            sum(residents_total) as residents_total,
            -- Count of constituent PLRs (for MAUP diagnostics)
            count(*) as n_plr
        from plr_base
        group by city_code, bzr_code, area_vintage, snapshot_year
    ),

    -- Bezirk-level aggregation (12 Berlin districts)
    bezirk_agg as (
        select
            city_code,
            'bezirk' as area_level,
            bezirk_code as area_code,
            area_vintage,
            snapshot_year,
            greatest(
                1,
                least(
                    4,
                    cast(
                        round(
                            sum(status_index * coalesce(residents_total, 1.0))
                            / nullif(sum(coalesce(residents_total, 1.0)), 0)
                        ) as integer
                    )
                )
            ) as agg_status_index,
            greatest(
                1,
                least(
                    3,
                    cast(
                        round(
                            sum(dynamik_index * coalesce(residents_total, 1.0))
                            / nullif(sum(coalesce(residents_total, 1.0)), 0)
                        ) as integer
                    )
                )
            ) as agg_dynamik_index,
            sum(status_score * coalesce(residents_total, 1.0))
            / nullif(sum(coalesce(residents_total, 1.0)), 0) as status_score,
            sum(dynamism_score * coalesce(residents_total, 1.0))
            / nullif(sum(coalesce(residents_total, 1.0)), 0) as dynamism_score,
            sum(total_poi_count) as total_poi_count,
            sum(ewr_composite * coalesce(residents_total, 1.0))
            / nullif(sum(coalesce(residents_total, 1.0)), 0) as ewr_composite,
            sum(foreigners_share * coalesce(residents_total, 1.0))
            / nullif(sum(coalesce(residents_total, 1.0)), 0) as foreigners_share,
            sum(age_under18_share * coalesce(residents_total, 1.0))
            / nullif(sum(coalesce(residents_total, 1.0)), 0) as age_under18_share,
            sum(migration_background_share * coalesce(residents_total, 1.0)) / nullif(
                sum(coalesce(residents_total, 1.0)), 0
            ) as migration_background_share,
            sum(mean_age_years * coalesce(residents_total, 1.0))
            / nullif(sum(coalesce(residents_total, 1.0)), 0) as mean_age_years,
            sum(residence_duration_5y_share * coalesce(residents_total, 1.0)) / nullif(
                sum(coalesce(residents_total, 1.0)), 0
            ) as residence_duration_5y_share,
            sum(residents_total) as residents_total,
            count(*) as n_plr
        from plr_base
        group by city_code, bezirk_code, area_vintage, snapshot_year
    ),

    -- Union BZR and Bezirk with derived typology
    bzr_typed as (
        select
            city_code,
            area_level,
            area_code,
            area_vintage,
            snapshot_year,
            agg_status_index as status_index,
            agg_dynamik_index as dynamik_index,
            status_score,
            dynamism_score,
            total_poi_count,
            ewr_composite,
            foreigners_share,
            age_under18_share,
            migration_background_share,
            mean_age_years,
            residence_duration_5y_share,
            residents_total,
            n_plr,
            case
                when agg_status_index is null
                then null
                when agg_status_index = 1 and agg_dynamik_index = 1
                then 'consolidation-pressure'
                when agg_status_index = 1 and agg_dynamik_index = 2
                then 'stable-established'
                when agg_status_index = 1 and agg_dynamik_index = 3
                then 'stable-established'
                when agg_status_index = 2 and agg_dynamik_index = 1
                then 'active-gentrification'
                when agg_status_index = 2 and agg_dynamik_index = 2
                then 'stable-established'
                when agg_status_index = 2 and agg_dynamik_index = 3
                then 'pre-gentrification'
                when agg_status_index = 3 and agg_dynamik_index = 1
                then 'pioneer-signal'
                when agg_status_index = 3 and agg_dynamik_index = 2
                then 'pre-gentrification'
                when agg_status_index = 3 and agg_dynamik_index = 3
                then 'pre-gentrification'
                when agg_status_index = 4 and agg_dynamik_index = 1
                then 'improving-vulnerable'
                when agg_status_index = 4 and agg_dynamik_index = 2
                then 'pre-gentrification'
                when agg_status_index = 4 and agg_dynamik_index = 3
                then 'pre-gentrification'
            end as typology_stage
        from bzr_agg
    ),

    bezirk_typed as (
        select
            city_code,
            area_level,
            area_code,
            area_vintage,
            snapshot_year,
            agg_status_index as status_index,
            agg_dynamik_index as dynamik_index,
            status_score,
            dynamism_score,
            total_poi_count,
            ewr_composite,
            foreigners_share,
            age_under18_share,
            migration_background_share,
            mean_age_years,
            residence_duration_5y_share,
            residents_total,
            n_plr,
            case
                when agg_status_index is null
                then null
                when agg_status_index = 1 and agg_dynamik_index = 1
                then 'consolidation-pressure'
                when agg_status_index = 1 and agg_dynamik_index = 2
                then 'stable-established'
                when agg_status_index = 1 and agg_dynamik_index = 3
                then 'stable-established'
                when agg_status_index = 2 and agg_dynamik_index = 1
                then 'active-gentrification'
                when agg_status_index = 2 and agg_dynamik_index = 2
                then 'stable-established'
                when agg_status_index = 2 and agg_dynamik_index = 3
                then 'pre-gentrification'
                when agg_status_index = 3 and agg_dynamik_index = 1
                then 'pioneer-signal'
                when agg_status_index = 3 and agg_dynamik_index = 2
                then 'pre-gentrification'
                when agg_status_index = 3 and agg_dynamik_index = 3
                then 'pre-gentrification'
                when agg_status_index = 4 and agg_dynamik_index = 1
                then 'improving-vulnerable'
                when agg_status_index = 4 and agg_dynamik_index = 2
                then 'pre-gentrification'
                when agg_status_index = 4 and agg_dynamik_index = 3
                then 'pre-gentrification'
            end as typology_stage
        from bezirk_agg
    )

-- Final union: BZR + Bezirk rolled-up panels
select *
from bzr_typed
union all
select *
from bezirk_typed
