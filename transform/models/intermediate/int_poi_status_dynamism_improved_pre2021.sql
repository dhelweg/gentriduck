-- int_poi_status_dynamism_improved_pre2021.sql
-- OA-ablation (#261): "improved" companion to int_poi_status_dynamism_pre2021, computed
-- from the SAME causality-first tier-weighted amenity composite
-- (seed_poi_offering_relevance, OA-B.1/B.2 #170/#171) as
-- int_poi_status_dynamism_improved,
-- but staying in the lor_pre2021 (448-PLR, 2008-2020) coordinate system instead of the
-- crosswalked-to-2021 grain int_poi_status_dynamism_improved consumes.
--
-- =============================================================================
-- Why this model exists (#261 ticket motivation)
-- =============================================================================
-- OA-B.3 (#172) wired the improved variant Berlin-lor_2021-only: the crosswalk step
-- (int_poi_amenity_weighted_base_2021) remaps every lor_pre2021 row onto lor_2021 PLR
-- codes, so no row ever surfaces in ITS OWN lor_pre2021 vintage downstream. That B3
-- sign-off (docs/epic-c/B3-oa-weighted-index-geo-signoff.md §2.2/Risk 3) explicitly
-- flagged this gap and required "its own tier-weight review, not a mechanical crosswalk
-- reuse" before extending -- see the review below. This closes that gap the same way
-- int_poi_status_dynamism_pre2021 (B7 #117) closes the equivalent gap for the FAITHFUL
-- total_poi_count pipeline: read the untransformed lor_pre2021 rows directly from the
-- shared upstream table (int_poi_amenity_weighted_base, which -- unlike its _2021
-- sibling -- already computes amenity_weighted_count/vacancy_weighted_count for EVERY
-- area_vintage present in fct_poi_development with no crosswalk applied) rather than
-- the
-- crosswalked table, and skip the crosswalk step entirely.
--
-- =============================================================================
-- Tier-weight review (#261 R-C2 grounding: is seed_poi_offering_relevance's tiering
-- valid for the lor_pre2021/2008-2020 POI taxonomy, or does it need its own weights?)
-- =============================================================================
-- Conclusion: the EXISTING seed_poi_offering_relevance weights transfer to the
-- lor_pre2021 vintage UNCHANGED -- no new tier weights were authored, for three
-- independently-checked reasons (verified against the live warehouse while building
-- this model, not asserted):
--
-- 1. FULL TAXONOMY COVERAGE, NO GAP. An anti-join of every (poi_domain_h,
-- poi_category_h, poi_type_h) leaf actually observed in
-- fct_poi_development WHERE area_vintage='lor_pre2021' against
-- seed_poi_offering_relevance (level='type') returns ZERO unmatched rows --
-- every pre-2021 taxonomy leaf already has a tiered, cited seed row. This is
-- possible because the taxonomy this seed keys on (poi_domain_h/poi_category_h/
-- poi_type_h) is the C2-HARMONIZED classification (int_osm_poi_harmonized +
-- seed_poi_tag_drift), which exists specifically to normalize OSM tag-schema
-- drift ACROSS YEARS to one canonical label set (see int_osm_poi_harmonized.sql
-- header) -- i.e. the cross-vintage harmonization problem B3's "tag-schema drift
-- across time" concern raises was already solved upstream of this model, by C2,
-- before this ticket. (For contrast: the same anti-join against the lor_2021
-- branch that B3 originally reviewed found one gap then -- coworking_space,
-- B3-geo-signoff.md §1.5/§4 Risk 1 -- that gap has since closed on the harmonized
-- taxonomy and does not reproduce for lor_pre2021 either, per the anti-join above.)
-- 2. DOMAIN-LEVEL COMPOSITION IS STRUCTURALLY SIMILAR ACROSS VINTAGES. Aggregate
-- poi_count share by poi_domain_h (city_code='BER') ranks Mobility / Public Space /
-- Retail / Gastronomy / Public Service as the largest domains in BOTH lor_pre2021
-- and lor_2021 -- the same domains the seed already tiers 0 (structural/incumbent,
-- Mobility/Public Space/most of Public Service) or refines per-category (Retail/
-- Gastronomy). No domain present in one vintage is absent from the other; the
-- causal-tier judgment (which retail/consumption FORMATS plausibly signal
-- gentrification-era succession, Zukin 2009 / Ley 1996 / Lees, Slater & Wyly 2008 /
-- Dangschat 1988) is a claim about the FORMAT's theoretical mechanism, not about a
-- particular decade -- none of the seed's causal_rationale citations invoke
-- "current"/"modern"/"today" Berlin-specific framing (checked: no such language
-- appears in the seed) that would not equally describe 2008-2020 retail activity.
-- 3. KNOWN, ALREADY-MITIGATED EARLY-YEAR SPARSITY, NOT A TIER-VALIDITY PROBLEM. Several
-- tier-3 (highest-weight) leaves (e.g. Books, Boutique, Coworking Space) have near-
-- zero counts in 2008-2011 and grow through 2020, mirroring the well-documented,
-- already-corrected OSM contributor-growth completeness bias (C5,
-- docs/epic-c/C5-geo-signoff.md) that int_poi_status_dynamism_pre2021 already
-- carries for the faithful pipeline. This is a DATA-VOLUME characteristic of early
-- OSM history, not evidence the tier assignment is wrong for that era, and this
-- model reuses the identical C5 share-based (not raw-count) dynamism treatment
-- below for exactly that reason. Vacancy-domain counts are additionally near-zero
-- before ~2012 (0 in 2008-2011): disinvestment_score_improved will be NULL/undefined
-- (STDDEV=0 guard) in those very-early years -- the same accepted, documented
-- limitation already noted for int_poi_status_dynamism_improved's early-year
-- behaviour (B3-geo-signoff.md §2.4), not a new defect introduced here.
--
-- No seed row, tier, or weight was changed by this ticket --
-- seed_poi_offering_relevance
-- is consumed read-only, identically to how int_poi_amenity_weighted_base already
-- consumes it for lor_2021.
--
-- =============================================================================
-- Construct (mirrors int_poi_status_dynamism_improved exactly; see that model's header
-- for the shared causal-tier-weighting/C5/Vacancy-separation rationale in full)
-- =============================================================================
-- methodology_variant = 'improved' throughout (never blended with the faithful
-- status_score/dynamism_score from int_poi_status_dynamism_pre2021 -- ADR-0017 D3/D4).
-- status_score_improved: z-score of amenity_weighted_count (Vacancy excluded), computed
-- WITHIN the lor_pre2021 PLR population for that year (NOT cross-vintage comparable
-- with int_poi_status_dynamism_improved's lor_2021 z-scores -- same
-- Z-SCORE CROSS-VINTAGE NOTE as int_poi_status_dynamism_pre2021 /
-- int_gentrification_ts).
-- dynamism_score_improved: z-score of the YoY change in amenity_weighted_share
-- (C5-equivalent share-normalization).
-- disinvestment_score_improved: z-score of vacancy_weighted_count, the OPPOSITE-POLE
-- Vacancy signal (ADR-0017 D-2) -- kept as its own column, never summed with
-- status/dynamism_score_improved.
--
-- Scope: Berlin only (city_code='BER'), same scope as int_poi_amenity_weighted_base
-- (seed_poi_offering_relevance is not validated for any other city's taxonomy).
--
-- Graceful degradation: returns zero rows when int_poi_amenity_weighted_base has no
-- lor_pre2021 rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_amenity_weighted_base') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Filter to lor_pre2021 rows only -- skip the crosswalk-to-2021 step
    -- (int_poi_amenity_weighted_base_2021) entirely, mirroring
    -- int_poi_status_dynamism_pre2021's treatment of int_poi_share_base.
    pre2021_base as (
        select *
        from {{ ref("int_poi_amenity_weighted_base") }}
        where area_vintage = 'lor_pre2021'
    ),

    lag_base as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            amenity_weighted_count,
            vacancy_weighted_count,
            berlin_amenity_weighted_total,
            amenity_weighted_share,
            lag(amenity_weighted_share) over (
                partition by city_code, area_code, area_vintage order by snapshot_year
            ) as amenity_weighted_share_prev_year,
            amenity_weighted_share - lag(amenity_weighted_share) over (
                partition by city_code, area_code, area_vintage order by snapshot_year
            ) as amenity_share_yoy_change
        from pre2021_base
    )

select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    'improved' as methodology_variant,
    amenity_weighted_count,
    vacancy_weighted_count,
    berlin_amenity_weighted_total,
    amenity_weighted_share,
    amenity_weighted_share_prev_year,
    amenity_share_yoy_change,
    (amenity_weighted_count - avg(amenity_weighted_count) over w_year)
    / nullif(stddev(amenity_weighted_count) over w_year, 0) as status_score_improved,
    (amenity_share_yoy_change - avg(amenity_share_yoy_change) over w_year) / nullif(
        stddev(amenity_share_yoy_change) over w_year, 0
    ) as dynamism_score_improved,
    (vacancy_weighted_count - avg(vacancy_weighted_count) over w_year) / nullif(
        stddev(vacancy_weighted_count) over w_year, 0
    ) as disinvestment_score_improved
from lag_base
window w_year as (partition by city_code, snapshot_year)
