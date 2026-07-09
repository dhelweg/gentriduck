-- mart_price_rent_dimension.sql
-- D3 (#29): Price/rent dimension mart — combines BRW land value, Wohnlage composition,
-- and modelled Mietspiegel rent estimate per PLR per vintage year.
--
-- QA-6b (#204): the BRW/Wohnlage/Mietspiegel merge logic previously inlined here (616
-- lines) was split into two intermediates for readability/testability -- pure
-- mechanical extraction, byte-identical output verified against a pre-split snapshot:
-- - int_price_rent_wohnlage_mietspiegel  (Signal 2 + 3 merge: Wohnlage x Mietspiegel)
-- - int_price_rent_brw_wohnlage_combined (Signal 1 alignment + all-vintage UNION)
-- This mart now owns only the winsorized normalization (z-score/rank/percentile) and
-- the final published grain -- see those two models' headers for the merge methodology.
--
-- =============================================================================
-- R-C2 Methodology citations
-- =============================================================================
-- Smith (1979) rent gap: BRW LEVEL = capitalised ground-rent level (price-surface
-- context,
-- one term of the gap); rent-gap REALISATION = BRW CHANGE (brw_trend, built
-- separately).
-- Do NOT label the BRW level "the rent gap" (domain D1). The level is ambiguous between
-- historic wealth, consolidated gentrification, and active pressure (domain D2).
-- Blasius & Dangschat (1990) Aufwertung: Wohnlage tier composition is the operational
-- language of residential Aufwertung; the tier MIX (not modal class) is the signal.
-- Holm (2010) / Bernt (2016) Milieuschutz: modelled rent is a Bestandsmiete-lagging,
-- ortsübliche Vergleichsmiete estimate — conservative, structural, NOT leading-edge
-- rent.
-- Frame toward displacement-protection use, not investment-opportunity ranking
-- (domain D12).
-- Openshaw (1984) MAUP: PLR is the publication floor; no sub-PLR land-value grain.
-- Area-weighted BRW; PLR-aggregate labels carry G-2 ecological-fallacy guardrail.
-- OECD/JRC (2008): winsorized z-score + rank/percentile per city × vintage; common
-- polarity
-- before aggregation (but levels here are structural — NOT blended into
-- Status×Dynamik).
-- Sign-offs: docs/epic-d/d3-price-rent-geo-signoff.md (PASS WITH CONDITIONS, 16
-- conditions)
-- docs/epic-d/d3-price-rent-domain-signoff.md (PASS WITH CONDITIONS, 14 conditions)
-- ADR-0003 §Price/rent (P-A Bodenrichtwerte, P-B Mietspiegel/Wohnlage); ADR-0008
-- lead-lag.
--
-- STRUCTURAL LEVEL vs DYNAMIC SIGNAL (geo 14, domain D2, ADR-0008):
-- BRW/Wohnlage/modelled-rent LEVELS are baseline/context covariates (D4-levels pattern,
-- index-definition §4.6). They MUST NOT be blended contemporaneously into the MSS
-- Status×Dynamik typology — that would reproduce the ADR-0008 legacy-averaging error
-- that "lost the lead-lag relationship" (int_gentrification_ts header; thesis p. 91).
-- Any BRW CHANGE signal (brw_trend, rent-gap reading) is a separate, explicit change
-- indicator on the predictor/lead side and is NOT in this mart.
--
-- =============================================================================
-- Methodology overview
-- =============================================================================
-- Grain: (city_code, snapshot_year, area_code, area_vintage)
-- One row per PLR per price/rent dimension vintage year.
--
-- Signal 1 — BRW weighted avg (from int_berlin_brw_plr, via
-- int_price_rent_brw_wohnlage_combined):
-- Area-weighted mean EUR/m² for residential BRW zones, n_brw_zones,
-- brw_residential_coverage_frac.
--
-- Signal 2 — Wohnlage composition (from int_price_rent_wohnlage_mietspiegel):
-- pct_einfach, pct_mittel, pct_gut — tier shares within each PLR for each vintage.
-- wohnlage_score: ordinal mean = pct_einfach*1 + pct_mittel*2 + pct_gut*3.
-- LABELLED AS ORDINAL-MEAN APPROXIMATION (tiers are ordered but not equidistant).
-- NULL when wohnlage_low_n = TRUE (< 10 address points; unstable composition).
-- wohnlage_low_n: TRUE when PLR-vintage has < 10 Wohnlage address points.
--
-- Signal 3 — Modelled Mietspiegel rent estimate (from
-- int_price_rent_wohnlage_mietspiegel):
-- est_rent_mid/low/high = SUM_tier(pct_wohnlage_tier * rent_X(tier, FIXED_profile))
-- FIXED representative profile (geo condition 9):
-- size_bucket     = '60_to_90' (60–90 m² band)
-- year_built_bucket = '1950_1964' (mid/representative construction-year bucket)
-- This profile is declared CONSTANT across all PLRs and vintages to isolate the
-- Wohnlage-and-vintage signal from year-built and size variation. This is a modelling
-- choice, not a measurement. State the profile explicitly on the G2 page.
-- Mietspiegel construction-year-bucket schema drift (geo condition 10):
-- Harmonised bucket '1950_1964' is present in all Mietspiegel vintages
-- (2017, 2019, 2021, 2023, 2024, 2026) with the 60_to_90 size bucket.
-- The 1973+ buckets split between vintages (e.g. 1973_1990_west → 1973_1985_west +
-- 1986_1990_west in 2024/2026) — selecting '1950_1964' avoids this drift break.
-- Any future bucket selection from the 1973+ range MUST define a stable crosswalk
-- across all vintages; NULL any vintage that cannot be mapped (geo condition 10).
-- Vintage matching (geo condition 8):
-- Wohnlage vintages: 2017, 2019, 2021, 2023, 2026.
-- Mietspiegel vintages: 2017, 2019, 2021, 2023, 2024, 2026.
-- Match rule: join Wohnlage vintage to the nearest Mietspiegel vintage that is
-- less-than-or-equal (<=) to the Wohnlage vintage year.
-- 2017 → 2017, 2019 → 2019, 2021 → 2021, 2023 → 2023, 2026 → 2026 (exact matches).
-- Approximation disclosure: the 2026 Wohnlage vintage stands in for the 2025 MSS
-- panel edition (no MSS 2025 Wohnlage exists); document on G2 (domain D13).
-- Modelled estimate label (domain D6): "modelled/estimated net cold rent at a fixed
-- reference dwelling profile — NOT observed rent paid."
-- Bestandsmiete bias (domain D7): The Mietspiegel is the ortsübliche Vergleichsmiete
-- of the standing tenancy stock. It LAGS new-letting/asking rents, the rents that
-- drive displacement. This estimate is a conservative, lagging affordability LEVEL of
-- the standing stock — it understates leading-edge pressure at the gentrifying margin.
-- NULL est_rent when wohnlage_low_n = TRUE (geo condition 7; domain D6).
--
-- BRW × Wohnlage alignment (int_price_rent_brw_wohnlage_combined):
-- BRW series covers 2017–2024; snapshot_year is YEAR(brw.reference_date).
-- Wohnlage covers 2017, 2019, 2021, 2023, 2026.
-- That intermediate LEFT JOINs BRW data to the nearest Wohnlage vintage using the same
-- nearest-≤ rule, so a BRW snapshot_year gets the Wohnlage vintage for that year.
-- When no Wohnlage vintage is available for a given BRW year (e.g. 2018, 2020, 2022,
-- 2024), Wohnlage columns are NULL — BRW is the only signal for those years.
--
-- Normalization (geo condition 13):
-- Winsorized (1%/99%) z-score of brw_weighted_avg_eur_m2, wohnlage_score, est_rent_mid
-- per (city_code, snapshot_year) over non-NULL, non-low-n, inhabited residential PLRs.
-- Named: brw_zscore, wohnlage_zscore, est_rent_zscore.
-- Rank and percentile of BRW value added (rank preferred for heavy-tailed display):
-- brw_rank (ascending; lower rank = lower land value), brw_percentile (PERCENT_RANK).
-- Headline for G2: brw_rank / brw_percentile (heavy-tailed land values; z-score
-- secondary).
--
-- Ecological fallacy guardrail (domain D10, G-2):
-- All values here are PLR-LEVEL aggregates. NOT individual or building-level
-- statements.
-- BRW is coarser than PLR (1,621 zones, area-interpolated) — do not imply parcel
-- precision.
-- Inferring an individual's rent, land value, or displacement from a PLR value is an
-- ecological fallacy.
--
-- Milieuschutz / counter-misuse framing (domain D12):
-- Frame this dimension toward identifying quarters that MAY WARRANT DISPLACEMENT
-- PROTECTION (candidate Milieuschutz / Soziale Erhaltungsgebiete monitoring; Holm 2010,
-- Bernt 2016). NOT an investment-opportunity surface. A low land value coinciding
-- with a
-- vulnerable population is a FLAG FOR PROTECTION, not an invitation. Prominent on G2.
--
-- Known limitation (#135, discovered from G1d/#133) -- RESOLVED by #136:
-- This mart is published ONLY on the lor_2021 (542-PLR, post-2021) area_vintage --
-- int_berlin_brw_plr deliberately always uses lor_2021 PLR geometries (see its header)
-- for a consistent single-vintage spatial grain, and Wohnlage/Mietspiegel are joined
-- against that same scheme. The governed gentrification_index (currently only period
-- 201612) reports on the lor_pre2021 (447/448-PLR) scheme instead -- a DIFFERENT set of
-- area codes/boundaries, not just a renumbering -- so a naive join on area_code between
-- this mart and the governed index/area-detail page returns (correctly) almost nothing.
-- #136 re-keys this mart's intensive covariates onto lor_pre2021 area codes in
-- mart_price_rent_dimension_pre2021 -- see that model's header for the methodology
-- (geo-DS finding: the EXISTING forward `weight` column in seed_lor_crosswalk_2006_
-- to_2021 already sums to 1.0 per plr_id_pre2021, so it is already the correct
-- areal-weighted-average operator for this direction; no new weight derivation was
-- actually required). Sign-off: docs/epic-d/D1d-followup-geo-signoff.md (PASS).
--
-- Graceful degradation:
-- When intermediate models return zero rows, this mart returns zero rows. Build passes.
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    -- QA-6b (#204): merge/alignment logic lives in int_price_rent_brw_wohnlage_combined
    -- (which in turn depends on int_price_rent_wohnlage_mietspiegel). This mart starts
    -- from that combined grain and owns only the normalization below.
    combined as (select * from {{ ref("int_price_rent_brw_wohnlage_combined") }}),

    -- Normalization (geo condition 13):
    -- Winsorized (1%/99%) z-score per (city_code, snapshot_year) over inhabited
    -- residential
    -- PLRs only (exclude NULL/low-n PLRs from the moments so they don't dilute the
    -- distribution).
    -- brw_zscore, wohnlage_zscore, est_rent_zscore.
    -- brw_rank, brw_percentile: rank and percent_rank of BRW value (rank is the
    -- headline
    -- for heavy-tailed land values; z-score secondary per geo condition 13).
    --
    -- Winsorization approach: compute 1%/99% quantiles as GROUP BY aggregates per
    -- (city_code, snapshot_year) over the non-NULL, non-low-n subset, then join back
    -- to combined. DuckDB supports quantile_cont(col, [0.01, 0.99]) as a set aggregate
    -- returning a LIST; we use quantile_cont(col, 0.01) and quantile_cont(col, 0.99)
    -- as separate scalar aggregates (both supported as GROUP BY aggregates in DuckDB).
    -- Percentile thresholds: compute over non-NULL, non-low-n PLRs only.
    brw_quantiles as (
        select
            city_code,
            snapshot_year,
            quantile_cont(brw_weighted_avg_eur_m2, 0.01) as brw_p01,
            quantile_cont(brw_weighted_avg_eur_m2, 0.99) as brw_p99
        from combined
        where
            brw_weighted_avg_eur_m2 is not null
            and (wohnlage_low_n is null or wohnlage_low_n = false)
        group by city_code, snapshot_year
    ),

    ws_quantiles as (
        select
            city_code,
            snapshot_year,
            quantile_cont(wohnlage_score, 0.01) as ws_p01,
            quantile_cont(wohnlage_score, 0.99) as ws_p99
        from combined
        where
            wohnlage_score is not null
            and (wohnlage_low_n is null or wohnlage_low_n = false)
        group by city_code, snapshot_year
    ),

    er_quantiles as (
        select
            city_code,
            snapshot_year,
            quantile_cont(est_rent_mid, 0.01) as er_p01,
            quantile_cont(est_rent_mid, 0.99) as er_p99
        from combined
        where
            est_rent_mid is not null
            and (wohnlage_low_n is null or wohnlage_low_n = false)
        group by city_code, snapshot_year
    ),

    -- City-year moments for z-score computation (after winsorization):
    -- Mean and stddev over the winsorized values (clipped to [p01, p99]).
    brw_moments as (
        select
            c.city_code,
            c.snapshot_year,
            avg(
                greatest(q.brw_p01, least(q.brw_p99, c.brw_weighted_avg_eur_m2))
            ) as brw_mean,
            stddev_pop(
                greatest(q.brw_p01, least(q.brw_p99, c.brw_weighted_avg_eur_m2))
            ) as brw_std,
            min(q.brw_p01) as brw_p01,
            min(q.brw_p99) as brw_p99
        from combined as c
        inner join
            brw_quantiles as q
            on c.city_code = q.city_code
            and c.snapshot_year = q.snapshot_year
        where
            c.brw_weighted_avg_eur_m2 is not null
            and (c.wohnlage_low_n is null or c.wohnlage_low_n = false)
        group by c.city_code, c.snapshot_year
    ),

    ws_moments as (
        select
            c.city_code,
            c.snapshot_year,
            avg(greatest(q.ws_p01, least(q.ws_p99, c.wohnlage_score))) as ws_mean,
            stddev_pop(greatest(q.ws_p01, least(q.ws_p99, c.wohnlage_score))) as ws_std,
            min(q.ws_p01) as ws_p01,
            min(q.ws_p99) as ws_p99
        from combined as c
        inner join
            ws_quantiles as q
            on c.city_code = q.city_code
            and c.snapshot_year = q.snapshot_year
        where
            c.wohnlage_score is not null
            and (c.wohnlage_low_n is null or c.wohnlage_low_n = false)
        group by c.city_code, c.snapshot_year
    ),

    er_moments as (
        select
            c.city_code,
            c.snapshot_year,
            avg(greatest(q.er_p01, least(q.er_p99, c.est_rent_mid))) as er_mean,
            stddev_pop(greatest(q.er_p01, least(q.er_p99, c.est_rent_mid))) as er_std,
            min(q.er_p01) as er_p01,
            min(q.er_p99) as er_p99
        from combined as c
        inner join
            er_quantiles as q
            on c.city_code = q.city_code
            and c.snapshot_year = q.snapshot_year
        where
            c.est_rent_mid is not null
            and (c.wohnlage_low_n is null or c.wohnlage_low_n = false)
        group by c.city_code, c.snapshot_year
    )

-- Final mart output.
-- All values here are PLR-LEVEL AGGREGATES — not individual/building-level statements.
-- BRW is coarser than PLR (1,621 zones, area-interpolated); do not imply parcel
-- precision.
select
    c.city_code,
    c.snapshot_year,
    c.area_code,
    c.area_vintage,

    -- Signal 1: BRW land value
    c.brw_weighted_avg_eur_m2,
    c.n_brw_zones,
    -- Residential coverage fraction; NULL when no W% BRW zones overlap (not 0).
    c.brw_residential_coverage_frac,

    -- Signal 2: Wohnlage composition
    c.pct_einfach,
    c.pct_mittel,
    c.pct_gut,
    c.total_n_addresses as wohnlage_n_addresses,
    c.wohnlage_low_n,
    -- wohnlage_score: ordinal mean (einfach=1, mittel=2, gut=3); ORDINAL-MEAN
    -- APPROXIMATION.
    -- NULL when wohnlage_low_n = TRUE. High score = more desirable = consolidated =
    -- LOW residual headroom; sign-flip required for vulnerability composite.
    c.wohnlage_score,

    -- Signal 3: Modelled Mietspiegel rent estimate
    -- "modelled/estimated net cold rent at a fixed reference dwelling profile
    -- (60–90 m² apartment, 1950–1964 construction year) — NOT observed rent paid."
    -- Bestandsmiete/ortsübliche Vergleichsmiete (Holm 2010): lagging, conservative
    -- proxy.
    -- NULL when wohnlage_low_n = TRUE.
    c.est_rent_mid,
    c.est_rent_low,
    c.est_rent_high,
    c.mietspiegel_vintage_used,
    c.wohnlage_vintage_matched,

    -- Normalization: winsorized (1%/99%) z-scores per (city_code, snapshot_year)
    -- over non-NULL, non-low-n PLRs (geo condition 13; OECD/JRC 2008 polarity
    -- convention).
    --
    -- brw_zscore polarity: ambiguous (domain D2). High BRW =
    -- price-surface/consolidation;
    -- if pooled into vulnerability composite, FLIP sign (high BRW = low vulnerability
    -- headroom).
    -- Context covariate, NOT a vulnerability score.
    -- wohnlage_zscore polarity: high score = desirable = consolidated = LOW headroom;
    -- FLIP sign for vulnerability composite. For vulnerability framing, pct_einfach
    -- is +positive.
    -- est_rent_zscore polarity: affordability-negative (high = less affordable);
    -- Bestandsmiete-lagging.
    (greatest(bm.brw_p01, least(bm.brw_p99, c.brw_weighted_avg_eur_m2)) - bm.brw_mean)
    / nullif(bm.brw_std, 0) as brw_zscore,

    (greatest(wm.ws_p01, least(wm.ws_p99, c.wohnlage_score)) - wm.ws_mean)
    / nullif(wm.ws_std, 0) as wohnlage_zscore,

    (greatest(em.er_p01, least(em.er_p99, c.est_rent_mid)) - em.er_mean)
    / nullif(em.er_std, 0) as est_rent_zscore,

    -- BRW rank and percentile (geo condition 13):
    -- Rank is the HEADLINE presentation for heavy-tailed land values (G2 page).
    -- brw_rank: ascending (1 = lowest BRW in city-year; higher rank = higher land
    -- value).
    -- brw_percentile: PERCENT_RANK [0,1] (0 = lowest, 1 = highest).
    rank() over (
        partition by c.city_code, c.snapshot_year
        order by c.brw_weighted_avg_eur_m2 asc nulls last
    ) as brw_rank,

    percent_rank() over (
        partition by c.city_code, c.snapshot_year
        order by c.brw_weighted_avg_eur_m2 asc nulls last
    ) as brw_percentile

from combined as c
left join
    brw_moments as bm
    on c.city_code = bm.city_code
    and c.snapshot_year = bm.snapshot_year
left join
    ws_moments as wm
    on c.city_code = wm.city_code
    and c.snapshot_year = wm.snapshot_year
left join
    er_moments as em
    on c.city_code = em.city_code
    and c.snapshot_year = em.snapshot_year
