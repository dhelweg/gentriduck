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
-- HAMBURG (#313): widened to include Hamburg's individual EWR-equivalent
-- indicators, at Stadtteil grain (area_level='subarea_l1') and rolled up to
-- district/Bezirk (area_level='district'). This is INDIVIDUAL INDICATORS
-- ONLY -- there is deliberately NO blended composite column here (unlike
-- fct_gentrification_change.sql's `ewr_composite`, which stays Berlin-only
-- and is NOT touched by this ticket). #313 independently consulted
-- geo-data-scientist and gentrification-domain-expert (2026-07-31); both
-- converged that exposing Hamburg's individual, already-ingested indicators
-- here is safe/additive/display-only (same class of finding as I19's own
-- sign-off for Berlin foreigners_share/migration_background_share), while a
-- Hamburg composite would be a materially different construct from Berlin's
-- 5-indicator one and should not be shown publicly as if it were a weaker
-- version of the same thing -- see docs/epic-h/H3-geo-signoff.md's D4
-- discussion for why the composite itself is excluded from
-- gentrification_index publication for Hamburg, and #329 (RESOLVED,
-- 2026-07-31) for a separate, deeper finding about unemployment_share's
-- circularity against Hamburg's own D1 Statusindex inside that composite --
-- #329 fixed int_ewr_socioeco_hamburg's ewr_composite to a 2-indicator
-- (age_under18_share, foreigners_share only) composite; neither that
-- pre-existing 3-indicator composite nor its #329 fix is relevant to this
-- display mart, which never reads the composite.
--
-- GRAIN (domain-expert condition, #313): Hamburg indicators are exposed at
-- STADTTEIL grain (subarea_l1, hh_base CTE below) and its district/Bezirk
-- rollup ONLY -- never at the finer Gebiet (subarea_l2) grain. Hamburg's raw
-- EWR source is already published at Stadtteil grain (see
-- stg_hamburg_ewr_stadtteil.sql / int_ewr_demographics_wide_hamburg.sql);
-- this mart reads that model directly rather than
-- int_ewr_socioeco_hamburg[_disagg] (which disaggregate Stadtteil values
-- down to Gebiet for the D4 predictor-composite use case in
-- gentrification_index -- the disaggregated Gebiet-level values there are
-- UNIFORMLY INHERITED from their parent Stadtteil with zero sub-Stadtteil
-- variation, so showing them at Gebiet grain here would be false precision).
-- District rollup uses dim_area_hierarchy's Hamburg subarea_l1 -> district
-- edge (source-provided WFS attribute, see that model's header) via a JOIN,
-- NOT a code-prefix substr() -- Hamburg area codes do not nest like Berlin's
-- LOR codes. That edge now ALSO covers Hamburg's 4 merged EWR Stadtteil
-- codes (#313 C-1 fix, e.g. '02117/118') via an explicit crosswalk CTE
-- added to dim_area_hierarchy.sql -- see hh_with_district's own comment
-- below for the full C-1 finding/fix and that model's header for the
-- crosswalk's grounding.
-- unemployment_share is Hamburg-only (NULL for all Berlin rows, never
-- fabricated); Berlin-only indicators not published in Hamburg's EWR source
-- (age_18_27_share, age_27_45_share, age_45_65_share, mean_age_years,
-- migration_background_share, residence_duration_5y_share,
-- residence_duration_10y_share) are NULL for all Hamburg rows, same
-- discipline -- see int_ewr_demographics_wide_hamburg.sql header.
-- unemployment_share carries the SAME small-area-grain stigmatization/misuse
-- framing caveat as foreigners_share (domain-expert condition, #313, citing
-- docs/epic-i/I19-domain-signoff.md's precedent for that framing).
-- unemployment_share's DENOMINATOR (#313 C-2) is total resident population
-- ("Arbeitslose je 100 Einwohner"), NOT the working-age population -- i.e.
-- it is NOT the German Arbeitslosenquote and is NOT comparable to Berlin's
-- MSS arbeitslose_anteil (different numerator and denominator); see this
-- column's schema.yml entry (marts + intermediate) for the full grounding.
-- Because the denominator IS total population, this mart's district rollup
-- weight (residents_total) is exact for unemployment_share, not an
-- approximation.
-- n_plr is reused (not renamed) for Hamburg rows too -- semantically "number
-- of constituent finer-grain areas rolled into this row" (1 Stadtteil for
-- subarea_l1 rows, count of constituent Stadtteile for district rows); kept
-- as one column rather than adding a parallel n_stadtteil column since this
-- mart's contract is not schema-enforced (no `config: contract: enforced`)
-- and a second, mostly-NULL count column would only add confusion for no
-- semantic gain.
--
-- Grain: one row per (city_code, area_level, area_code, area_vintage,
-- reference_year). area_level in ('plr', 'bzr', 'pgr', 'bezirk', 'ortsteil')
-- for Berlin (city_code='BER'), ('subarea_l1', 'district') for Hamburg
-- (city_code='HH'). H3 (#237) admitted Hamburg into gentrification_index
-- only (docs/epic-h/H3-geo-signoff.md, H3-domain-signoff.md); #313 admits
-- Hamburg into this display mart on the terms above.
--
-- Graceful degradation: returns zero rows for a city when its upstream wide
-- model (int_ewr_demographics_wide / int_ewr_demographics_wide_hamburg) has
-- no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_ewr_demographics_wide') }}
-- depends_on: {{ ref('int_ewr_demographics_wide_hamburg') }}
-- depends_on: {{ ref('dim_area_hierarchy') }}
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
            cast(null as double) as unemployment_share,
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
            unemployment_share,
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
            cast(null as double) as unemployment_share,
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
            cast(null as double) as unemployment_share,
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
            cast(null as double) as unemployment_share,
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
            cast(null as double) as unemployment_share,
            bool_or(any_indicator_suppressed) as any_indicator_suppressed,
            count(*) as n_plr
        from with_ortsteil
        group by city_code, ortsteil_area_code, area_vintage, reference_year
    ),

    -- Hamburg (#313): Stadtteil grain, straight from
    -- int_ewr_demographics_wide_hamburg (already Stadtteil grain -- no
    -- further pivot needed). Berlin-only indicators NULLed out, never
    -- fabricated -- see header.
    hh_base as (
        select
            city_code,
            'subarea_l1' as area_level,
            area_code,
            area_vintage,
            reference_year,
            reference_date,
            residents_total,
            residents_male_share,
            residents_female_share,
            age_under18_share,
            cast(null as double) as age_18_27_share,
            cast(null as double) as age_27_45_share,
            cast(null as double) as age_45_65_share,
            age_65plus_share,
            cast(null as double) as mean_age_years,
            foreigners_share,
            cast(null as double) as migration_background_share,
            cast(null as double) as residence_duration_5y_share,
            cast(null as double) as residence_duration_10y_share,
            unemployment_share,
            any_indicator_suppressed,
            1 as n_plr
        from {{ ref("int_ewr_demographics_wide_hamburg") }}
        where city_code = 'HH'
    ),

    -- Hamburg district (Bezirk) rollup: constituent-Stadtteil membership
    -- comes from dim_area_hierarchy's subarea_l1 -> district edge (a JOIN,
    -- not a code-prefix substr() -- Hamburg area codes do not nest like
    -- Berlin's LOR codes; see dim_area_hierarchy.sql header). SAME rollup
    -- rule as the Berlin bzr/pgr/bezirk/ortsteil CTEs above (extensive=sum,
    -- intensive=summed-numerator recompute, bool_or suppression) -- no new
    -- aggregation formula, just a different constituent-area lookup
    -- mechanism (mirrors the Ortsteil rollup's own precedent for a
    -- non-code-prefix parent lookup).
    -- inner join: every one of the 99 Stadtteil units Hamburg's EWR source
    -- publishes now has a resolvable district parent edge in
    -- dim_area_hierarchy -- 95 individual Stadtteile via the WFS-sourced
    -- subarea_l1 -> district edge, plus the 4 MERGED disclosure-control
    -- Stadtteil pairs (e.g. '02117/118') via the explicit
    -- hh_l1_merged_to_district crosswalk added for #313 C-1 (see
    -- dim_area_hierarchy.sql's header for the full grounding). Before that
    -- fix, this inner join silently dropped the 4 merged units -- 15,310
    -- Hamburg residents (0.78% of the city), concentrated as a 4.1%
    -- undercount in Hamburg-Mitte and a 1.4% undercount in Harburg -- and
    -- the prior version of this comment incorrectly asserted this "should
    -- not occur" and was "empirically verified" by the reconciliation test;
    -- neither was true (see docs/epic-h/313-hh-area-demographics-geo-
    -- signoff.md F1 and 313-hh-area-demographics-domain-signoff.md D-1 for
    -- the full finding). The inner join is kept (rather than switched to a
    -- left join) because every Stadtteil now DOES resolve; a future
    -- Stadtteil with no district parent edge would still be silently
    -- excluded here, same discipline as the Ortsteil CTE above --
    -- test_mart_area_demographics_hh_district_completeness.sql now guards
    -- against that regression independently of this join (see that test's
    -- header for why the existing reconciliation test could not).
    hh_with_district as (
        select hb.*, dah.parent_area_code as district_code
        from hh_base as hb
        inner join
            {{ ref("dim_area_hierarchy") }} as dah
            on hb.city_code = dah.city_code
            and hb.area_code = dah.area_code
            and dah.area_level = 'subarea_l1'
            and dah.parent_area_level = 'district'
    ),

    hh_district_agg as (
        select
            city_code,
            'district' as area_level,
            district_code as area_code,
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
            cast(null as double) as age_18_27_share,
            cast(null as double) as age_27_45_share,
            cast(null as double) as age_45_65_share,
            sum(age_65plus_share * residents_total)
            / nullif(sum(residents_total), 0) as age_65plus_share,
            cast(null as double) as mean_age_years,
            sum(foreigners_share * residents_total)
            / nullif(sum(residents_total), 0) as foreigners_share,
            cast(null as double) as migration_background_share,
            cast(null as double) as residence_duration_5y_share,
            cast(null as double) as residence_duration_10y_share,
            sum(unemployment_share * residents_total)
            / nullif(sum(residents_total), 0) as unemployment_share,
            bool_or(any_indicator_suppressed) as any_indicator_suppressed,
            count(*) as n_plr
        from hh_with_district
        group by city_code, district_code, area_vintage, reference_year
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
union all
select *
from hh_base
union all
select *
from hh_district_agg
