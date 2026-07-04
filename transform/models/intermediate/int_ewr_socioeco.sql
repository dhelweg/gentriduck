-- int_ewr_socioeco.sql
-- C4 intermediate: pivot int_berlin_ewr_plr2021 from long format to wide format and
-- compute the EWR composite socio-economic score.
--
-- Selects from int_berlin_ewr_plr2021 (long-format, 13 indicators, city_code='BER').
-- All rows carry area_vintage='lor_2021' (pre-2021 EWR data reapportioned via
-- crosswalk, 2021+ data passed through). This matches the lor_2021 vintage used by
-- int_poi_status_dynamism (updated in #63) so that int_gentrification_ts can join on
-- (area_code, area_vintage) without vintage mismatch for 2015-2020 years.
-- Pivots to one row per (city_code, area_code, area_vintage, reference_year).
-- Key indicators selected match the 2018 thesis own_idx (reference/system/71_oa.sql):
-- - foreigners_share          (thesis: k11 = E_A / E_E)
-- - age_under18_share         (proxy for dau5 / D_U5 + dau10 — combined bin here)
-- - mean_age_years            (thesis: ea midpoint-weighted)
-- - migration_background_share (thesis: mh / MH_E; available from 2015, break ~2017)
-- - residence_duration_5y_share (thesis: d2 — Wohndauer)
--
-- EWR composite score (full — 5 indicators, 2014+):
-- Thesis §4.2: composite = mean z-score of the 5 key vulnerability indicators.
-- For each indicator, compute a z-score across all PLRs for that year. Mean the
-- z-scores to produce ewr_composite on the same unit-variance scale as status_score
-- and dynamism_score in int_poi_status_dynamism, so the equal-weight 1/3 average
-- in int_gentrification_ts is actually equal (summing 5 z-scores would inflate SD
-- to ~√5 and silently dominate).
-- Higher ewr_composite = more socio-economically vulnerable population.
-- Sign convention: negated when entering gentrification_score in int_gentrification_ts.
-- All five z-score inputs are vulnerability-positive (high z = more
-- pre-gentrification/vulnerable).
--
-- EWR composite score (partial — 3 indicators, pre-2014, B9b):
-- Thesis §4.2 (partial): foreigners_share (E_A) and migration_background_share (MH_E)
-- are absent from EWR editions before 2014 (E_A series starts 2014; MH_E = EWRMIGRA
-- series also starts 2014). To extend the panel to 2010-2013, a reduced 3-indicator
-- composite is computed from age_under18_share, mean_age_years, and
-- residence_duration_5y_share. The partial composite is NOT cross-period comparable
-- with the 5-indicator composite used from 2014 onward: it omits two vulnerability
-- indicators that may carry systematic signal (foreigners_share in particular is a
-- strong predictor in the thesis). Consumers MUST filter on is_partial_composite=FALSE
-- for any cross-era pooled regression. See B9-geo-signoff.md / B9-domain-signoff.md.
--
-- is_partial_composite flag:
-- TRUE  for reference_year <= 2013 (only 3 indicators available)
-- FALSE for reference_year >= 2014 (full 5-indicator composite)
-- NULL ewr_composite (5-indicator) is preserved for pre-2014 rows alongside the
-- partial composite, making the distinction explicit.
--
-- Methodology notes:
-- - NULLIF(stddev, 0) guards against degenerate years.
-- - NULL indicator values (suppressed cells) are excluded from z-score computation.
-- A PLR with any suppressed key indicator will have a NULL z-score for that
-- indicator, which propagates to NULL ewr_composite. Downstream NULL handling
-- is documented in int_gentrification_ts.
-- - migration_background_share is methodologically stable only from 2017
-- (Mikrozensus reform); pre-2017 values are present but not directly comparable.
-- C4 consumers should apply reference_year >= 2017 for migration comparisons.
--
-- Note on #63 (POI PLR2021 remap, 2026-06-19):
-- int_poi_status_dynamism was updated to assign area_vintage='lor_2021' for all years
-- by remapping pre-2021 OSM POI area codes via the 2021 PLR crosswalk. To keep the
-- area_vintage join in int_gentrification_ts consistent, this model now reads from
-- int_berlin_ewr_plr2021 (which also carries area_vintage='lor_2021' for all years)
-- instead of int_ewr_series (which used vintage-split codes). The plr_id_2021 column
-- is aliased to area_code to match the downstream column name used throughout this
-- model.
--
-- Graceful degradation: returns zero rows when int_berlin_ewr_plr2021 has no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_berlin_ewr_plr2021') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    ewr as (
        select
            city_code,
            plr_id_2021 as area_code,  -- alias to match downstream column name
            area_vintage,
            reference_year,
            reference_date,
            indicator,
            indicator_value,
            is_suppressed_any,
            source_attribution
        from {{ ref("int_berlin_ewr_plr2021") }}
    ),

    -- Pivot long -> wide: one row per area x year with key indicator columns.
    pivoted as (
        select
            city_code,
            area_code,
            area_vintage,
            reference_year,
            max(indicator_value) filter (
                where indicator = 'foreigners_share'
            ) as foreigners_share,
            max(indicator_value) filter (
                where indicator = 'age_under18_share'
            ) as age_under18_share,
            max(indicator_value) filter (
                where indicator = 'migration_background_share'
            ) as migration_background_share,
            max(indicator_value) filter (
                where indicator = 'mean_age_years'
            ) as mean_age_years,
            max(indicator_value) filter (
                where indicator = 'residence_duration_5y_share'
            ) as residence_duration_5y_share,
            -- Additional indicators kept for downstream reference
            max(indicator_value) filter (
                where indicator = 'residents_total'
            ) as residents_total,
            max(indicator_value) filter (
                where indicator = 'residents_male_share'
            ) as residents_male_share,
            max(indicator_value) filter (
                where indicator = 'age_65plus_share'
            ) as age_65plus_share
        from ewr
        group by city_code, area_code, area_vintage, reference_year
    ),

    -- Compute z-scores for the 5 key indicators (full composite, 2014+).
    -- Also compute z-scores for the 3 partial-composite indicators (pre-2014).
    -- Z-scores are computed across PLRs within each (city_code, reference_year).
    with_z as (
        select
            city_code,
            area_code,
            area_vintage,
            reference_year,
            foreigners_share,
            age_under18_share,
            migration_background_share,
            mean_age_years,
            residence_duration_5y_share,
            residents_total,
            residents_male_share,
            age_65plus_share,
            -- Z-score: foreigners_share (absent pre-2014 → NULL)
            (
                foreigners_share
                - avg(foreigners_share) over (partition by city_code, reference_year)
            ) / nullif(
                stddev(foreigners_share) over (partition by city_code, reference_year),
                0
            ) as z_foreigners_share,
            -- Z-score: age_under18_share (present all years)
            (
                age_under18_share
                - avg(age_under18_share) over (partition by city_code, reference_year)
            ) / nullif(
                stddev(age_under18_share) over (partition by city_code, reference_year),
                0
            ) as z_age_under18_share,
            -- Z-score: migration_background_share (absent pre-2014; methodological
            -- break ~2017: Mikrozensus reform. Pre-2017 values present but not
            -- directly comparable. Use reference_year >= 2017 for migration
            -- comparisons.
            (
                migration_background_share - avg(migration_background_share) over (
                    partition by city_code, reference_year
                )
            ) / nullif(
                stddev(migration_background_share) over (
                    partition by city_code, reference_year
                ),
                0
            ) as z_migration_background_share,
            -- Z-score: mean_age_years (present all years)
            (
                mean_age_years
                - avg(mean_age_years) over (partition by city_code, reference_year)
            ) / nullif(
                stddev(mean_age_years) over (partition by city_code, reference_year), 0
            ) as z_mean_age_years,
            -- Z-score: residence_duration_5y_share (present all years)
            (
                residence_duration_5y_share - avg(residence_duration_5y_share) over (
                    partition by city_code, reference_year
                )
            ) / nullif(
                stddev(residence_duration_5y_share) over (
                    partition by city_code, reference_year
                ),
                0
            ) as z_residence_duration_5y_share
        from pivoted
    ),

    -- EWR composite: mean of z-scores.
    -- Full composite (5 indicators, 2014+): ewr_composite.
    -- NULL if any of the 5 z-scores is NULL (any key indicator suppressed or absent).
    -- Partial composite (3 indicators, pre-2014, B9b):
    -- ewr_composite_partial = mean(z_age_under18, z_mean_age, z_residence_5y).
    -- Available for all years; cross-era pooling is NOT valid (see header comment).
    -- is_partial_composite = TRUE when reference_year <= 2013.
    -- Higher composite = more socio-economically vulnerable population.
    -- Sign convention: negated when entering gentrification_score in
    -- int_gentrification_ts.
    with_composite as (
        select
            *,
            -- Full 5-indicator composite (Thesis §4.2, 2014+):
            (
                z_foreigners_share
                + z_age_under18_share
                + z_migration_background_share
                + z_mean_age_years
                + z_residence_duration_5y_share
            )
            / 5.0 as ewr_composite,
            -- Partial 3-indicator composite (B9b, pre-2014 extension):
            -- Thesis §4.2 partial: age_under18_share, mean_age_years,
            -- residence_duration_5y_share only — excludes foreigners_share
            -- and migration_background_share (not available pre-2014).
            -- NOT comparable to ewr_composite; analysts must filter separately.
            (z_age_under18_share + z_mean_age_years + z_residence_duration_5y_share)
            / 3.0 as ewr_composite_partial,
            -- Flag rows where only the partial composite is available.
            -- Pre-2014: is_partial_composite = TRUE (ewr_composite will be NULL).
            -- 2014+:    is_partial_composite = FALSE (ewr_composite is the full score).
            (reference_year <= 2013) as is_partial_composite
        from with_z
    )

select *
from with_composite
