-- mart_area_demographics.sql
-- #243 (I19, area demographics / Kurzprofil parity): a DISPLAY-ONLY mart
-- exposing the EWR descriptive indicator series (Einwohner, age structure,
-- composition, residence duration) at PLR grain AND rolled up to the I18
-- geo-hierarchy levels (BZR, PGR, Bezirk) -- on the model of berlin.de's
-- Sozialraum region pages / BZR Kurzprofil PDFs.
--
-- NOT methodology-bearing in the index sense: reads int_ewr_demographics_wide
-- (itself a read-only re-pivot of int_berlin_ewr_plr2021) -- makes NO change
-- to int_ewr_socioeco, gentrification_index, any weight, or the gated seed
-- (seed_ewr_indicator_meta is joined read-only for labels/units downstream in
-- the web layer, never modified here). Index outputs are untouched by this
-- model's existence (byte-identical before/after -- same class of check I20
-- commits to for its own display mart).
--
-- The FRAMING of foreigners_share / migration_background_share at small-area
-- grain nonetheless carries real stigmatization/misuse risk (I19 ticket "Gate
-- (hard)"), which is why this ticket still requires a domain-expert sign-off
-- before integration even though no index math changes -- see
-- docs/epic-i/I19-domain-signoff.md (Verdict: PASS).
--
-- ROLLUP RULE (I19 ticket + geo-DS check, I19-geo-signoff.md):
-- Extensive indicator (residents_total): SUM across constituent PLRs.
-- Intensive indicators (all *_share, mean_age_years): shares recomputed from
-- SUMMED NUMERATORS, i.e. sum(share_i * residents_total_i) / sum(residents_total_i)
-- -- mathematically identical to a population-weighted mean of the PLR shares
-- (same weight, same formula, phrased per the ticket's "never average shares"
-- wording) -- NOT a simple arithmetic mean of PLR-level shares, which would
-- silently equal-weight a tiny and a huge PLR. This is the same rollup
-- formula already used and geo-DS-approved for int_mss_bzr_aggregate.sql
-- (B10, #120) -- reused here rather than re-litigated, per I19's "same geo-DS
-- check as I18's" instruction.
-- PLR rows with NULL residents_total are excluded from BOTH numerator and
-- denominator sums (never coalesced to 0/1 here -- unlike int_mss_bzr_aggregate,
-- which defaults missing weight to 1.0 for score aggregation; a demographics
-- mart with an unknown population should not silently assume population=1).
-- Suppression: any_indicator_suppressed = TRUE at the rollup grain if ANY
-- constituent PLR carried a suppressed cell -- coarser figures degrade
-- gracefully (flagged, not silently smoothed away) per I19 acceptance.
--
-- LEVEL DERIVATION: Berlin LOR codes nest by string prefix (PLR 8-digit ⊃
-- BZR 6-digit ⊃ PGR 4-digit ⊃ Bezirk 2-digit) -- same grounding as
-- dim_area_hierarchy.sql and int_mss_bzr_aggregate.sql (#242, #120); derived
-- directly via substr() here (not via a dim_area_hierarchy join) to match
-- int_mss_bzr_aggregate's existing, geo-DS-approved precedent for BZR/Bezirk
-- rollups, extended one level further to PGR. lpad to 8 chars first (some
-- thesis-golden PLR codes drop the leading zero for Bezirk 1-9 -- same fix
-- as I18's d39510fa).
--
-- ORTSTEIL ROLLUP (#269, I-ortsteile): unlike bzr/pgr/bezirk, Ortsteil is NOT
-- code-prefix derivable (dim_area_hierarchy.sql documents why PLR<->Ortsteil
-- does not nest). Its constituent-PLR membership instead comes from the
-- DOMINANT area-overlap assignment in int_berlin_plr_ortsteil_overlap.sql
-- (is_dominant_ortsteil = true) -- each PLR rolls into exactly the one
-- Ortsteil containing the largest share of its own area (see that model's
-- header for the full method + straddling-PLR count: 82 of 542 lor_2021 PLRs,
-- 15.1%, straddle a non-trivial Ortsteil boundary). Restricted to
-- area_vintage = 'lor_2021' (the crosswalk's own scope) -- lor_pre2021 rows
-- are excluded from the ortsteil_agg CTE below (they simply do not join and
-- are dropped, same graceful-degradation style as everywhere else in this
-- model). SAME rollup rule as bzr/pgr/bezirk (extensive=sum, intensive=
-- summed-numerator recompute) -- no new aggregation formula, just a
-- different constituent-PLR lookup mechanism.
--
-- Grain: one row per (city_code, area_level, area_code, area_vintage,
-- reference_year). area_level in ('plr', 'bzr', 'pgr', 'bezirk', 'ortsteil').
-- Berlin only (city_code='BER') -- Hamburg parity is explicitly deferred to
-- after H3 (#237) per the I19 ticket.
--
-- Graceful degradation: returns zero rows when int_ewr_demographics_wide has
-- no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_ewr_demographics_wide') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    plr_base as (
        select
            city_code,
            'plr' as area_level,
            lpad(area_code, 8, '0') as area_code,
            area_vintage,
            reference_year,
            reference_date,
            residents_total,
            residents_male_share,
            residents_female_share,
            age_under18_share,
            age_18_27_share,
            age_27_45_share,
            age_45_65_share,
            age_65plus_share,
            mean_age_years,
            foreigners_share,
            migration_background_share,
            residence_duration_5y_share,
            residence_duration_10y_share,
            any_indicator_suppressed
        from {{ ref("int_ewr_demographics_wide") }}
        where city_code = 'BER'
    ),

    -- PLR rows carry their own BZR/PGR/Bezirk parent codes for rollup grouping.
    with_parents as (
        select
            *,
            substr(area_code, 1, 6) as bzr_code,
            substr(area_code, 1, 4) as pgr_code,
            substr(area_code, 1, 2) as bezirk_code
        from plr_base
    ),

    plr_out as (
        select
            city_code,
            area_level,
            area_code,
            area_vintage,
            reference_year,
            reference_date,
            residents_total,
            residents_male_share,
            residents_female_share,
            age_under18_share,
            age_18_27_share,
            age_27_45_share,
            age_45_65_share,
            age_65plus_share,
            mean_age_years,
            foreigners_share,
            migration_background_share,
            residence_duration_5y_share,
            residence_duration_10y_share,
            any_indicator_suppressed,
            1 as n_plr
        from with_parents
    ),

    -- Reusable rollup macro-in-SQL: group by the given parent code, sum
    -- residents_total (extensive), recompute every share/mean_age from
    -- summed numerators (intensive), OR the suppression flag.
    bzr_agg as (
        select
            city_code,
            'bzr' as area_level,
            bzr_code as area_code,
            area_vintage,
            reference_year,
            max(reference_date) as reference_date,
            sum(residents_total) as residents_total,
            sum(residents_male_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_male_share,
            sum(residents_female_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_female_share,
            sum(age_under18_share * residents_total)
            / nullif(sum(residents_total), 0) as age_under18_share,
            sum(age_18_27_share * residents_total)
            / nullif(sum(residents_total), 0) as age_18_27_share,
            sum(age_27_45_share * residents_total)
            / nullif(sum(residents_total), 0) as age_27_45_share,
            sum(age_45_65_share * residents_total)
            / nullif(sum(residents_total), 0) as age_45_65_share,
            sum(age_65plus_share * residents_total)
            / nullif(sum(residents_total), 0) as age_65plus_share,
            sum(mean_age_years * residents_total)
            / nullif(sum(residents_total), 0) as mean_age_years,
            sum(foreigners_share * residents_total)
            / nullif(sum(residents_total), 0) as foreigners_share,
            sum(migration_background_share * residents_total)
            / nullif(sum(residents_total), 0) as migration_background_share,
            sum(residence_duration_5y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_5y_share,
            sum(residence_duration_10y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_10y_share,
            bool_or(any_indicator_suppressed) as any_indicator_suppressed,
            count(*) as n_plr
        from with_parents
        group by city_code, bzr_code, area_vintage, reference_year
    ),

    pgr_agg as (
        select
            city_code,
            'pgr' as area_level,
            pgr_code as area_code,
            area_vintage,
            reference_year,
            max(reference_date) as reference_date,
            sum(residents_total) as residents_total,
            sum(residents_male_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_male_share,
            sum(residents_female_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_female_share,
            sum(age_under18_share * residents_total)
            / nullif(sum(residents_total), 0) as age_under18_share,
            sum(age_18_27_share * residents_total)
            / nullif(sum(residents_total), 0) as age_18_27_share,
            sum(age_27_45_share * residents_total)
            / nullif(sum(residents_total), 0) as age_27_45_share,
            sum(age_45_65_share * residents_total)
            / nullif(sum(residents_total), 0) as age_45_65_share,
            sum(age_65plus_share * residents_total)
            / nullif(sum(residents_total), 0) as age_65plus_share,
            sum(mean_age_years * residents_total)
            / nullif(sum(residents_total), 0) as mean_age_years,
            sum(foreigners_share * residents_total)
            / nullif(sum(residents_total), 0) as foreigners_share,
            sum(migration_background_share * residents_total)
            / nullif(sum(residents_total), 0) as migration_background_share,
            sum(residence_duration_5y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_5y_share,
            sum(residence_duration_10y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_10y_share,
            bool_or(any_indicator_suppressed) as any_indicator_suppressed,
            count(*) as n_plr
        from with_parents
        group by city_code, pgr_code, area_vintage, reference_year
    ),

    bezirk_agg as (
        select
            city_code,
            'bezirk' as area_level,
            bezirk_code as area_code,
            area_vintage,
            reference_year,
            max(reference_date) as reference_date,
            sum(residents_total) as residents_total,
            sum(residents_male_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_male_share,
            sum(residents_female_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_female_share,
            sum(age_under18_share * residents_total)
            / nullif(sum(residents_total), 0) as age_under18_share,
            sum(age_18_27_share * residents_total)
            / nullif(sum(residents_total), 0) as age_18_27_share,
            sum(age_27_45_share * residents_total)
            / nullif(sum(residents_total), 0) as age_27_45_share,
            sum(age_45_65_share * residents_total)
            / nullif(sum(residents_total), 0) as age_45_65_share,
            sum(age_65plus_share * residents_total)
            / nullif(sum(residents_total), 0) as age_65plus_share,
            sum(mean_age_years * residents_total)
            / nullif(sum(residents_total), 0) as mean_age_years,
            sum(foreigners_share * residents_total)
            / nullif(sum(residents_total), 0) as foreigners_share,
            sum(migration_background_share * residents_total)
            / nullif(sum(residents_total), 0) as migration_background_share,
            sum(residence_duration_5y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_5y_share,
            sum(residence_duration_10y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_10y_share,
            bool_or(any_indicator_suppressed) as any_indicator_suppressed,
            count(*) as n_plr
        from with_parents
        group by city_code, bezirk_code, area_vintage, reference_year
    ),

    -- Ortsteil rollup (#269): constituent PLRs come from the DOMINANT
    -- area-overlap crosswalk, not a code-prefix substr() -- see header.
    -- inner join intentionally: a PLR with no dominant Ortsteil assignment
    -- (should not occur -- int_berlin_plr_ortsteil_overlap covers all 542
    -- lor_2021 PLRs) is excluded rather than silently coalesced.
    with_ortsteil as (
        select wp.*, xw.ortsteil_area_code
        from with_parents as wp
        inner join
            {{ ref("int_berlin_plr_ortsteil_overlap") }} as xw
            on wp.area_code = xw.plr_area_code
            and xw.is_dominant_ortsteil
        where wp.area_vintage = 'lor_2021'
    ),

    ortsteil_agg as (
        select
            city_code,
            'ortsteil' as area_level,
            ortsteil_area_code as area_code,
            area_vintage,
            reference_year,
            max(reference_date) as reference_date,
            sum(residents_total) as residents_total,
            sum(residents_male_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_male_share,
            sum(residents_female_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_female_share,
            sum(age_under18_share * residents_total)
            / nullif(sum(residents_total), 0) as age_under18_share,
            sum(age_18_27_share * residents_total)
            / nullif(sum(residents_total), 0) as age_18_27_share,
            sum(age_27_45_share * residents_total)
            / nullif(sum(residents_total), 0) as age_27_45_share,
            sum(age_45_65_share * residents_total)
            / nullif(sum(residents_total), 0) as age_45_65_share,
            sum(age_65plus_share * residents_total)
            / nullif(sum(residents_total), 0) as age_65plus_share,
            sum(mean_age_years * residents_total)
            / nullif(sum(residents_total), 0) as mean_age_years,
            sum(foreigners_share * residents_total)
            / nullif(sum(residents_total), 0) as foreigners_share,
            sum(migration_background_share * residents_total)
            / nullif(sum(residents_total), 0) as migration_background_share,
            sum(residence_duration_5y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_5y_share,
            sum(residence_duration_10y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_10y_share,
            bool_or(any_indicator_suppressed) as any_indicator_suppressed,
            count(*) as n_plr
        from with_ortsteil
        group by city_code, ortsteil_area_code, area_vintage, reference_year
    )

select *
from plr_out
union all
select *
from bzr_agg
union all
select *
from pgr_agg
union all
select *
from bezirk_agg
union all
select *
from ortsteil_agg
