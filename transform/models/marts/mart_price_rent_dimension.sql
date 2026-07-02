-- mart_price_rent_dimension.sql
-- D3 (#29): Price/rent dimension mart — combines BRW land value, Wohnlage composition,
-- and modelled Mietspiegel rent estimate per PLR per vintage year.
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
-- Signal 1 — BRW weighted avg (from int_berlin_brw_plr):
-- Area-weighted mean EUR/m² for residential BRW zones, n_brw_zones,
-- brw_residential_coverage_frac.
--
-- Signal 2 — Wohnlage composition (from int_berlin_wohnlage_plr, pivoted):
-- pct_einfach, pct_mittel, pct_gut — tier shares within each PLR for each vintage.
-- wohnlage_score: ordinal mean = pct_einfach*1 + pct_mittel*2 + pct_gut*3.
-- LABELLED AS ORDINAL-MEAN APPROXIMATION (tiers are ordered but not equidistant).
-- NULL when wohnlage_low_n = TRUE (< 10 address points; unstable composition).
-- wohnlage_low_n: TRUE when PLR-vintage has < 10 Wohnlage address points.
--
-- Signal 3 — Modelled Mietspiegel rent estimate:
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
-- BRW × Wohnlage alignment:
-- BRW series covers 2017–2024; snapshot_year is YEAR(brw.reference_date).
-- Wohnlage covers 2017, 2019, 2021, 2023, 2026.
-- This mart LEFT JOINs BRW data to the nearest Wohnlage vintage using the same
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
    -- BRW: area-weighted mean land value per PLR per snapshot year.
    brw as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            brw_weighted_avg_eur_m2,
            n_brw_zones,
            brw_residential_coverage_frac
        from {{ ref("int_berlin_brw_plr") }}
    ),

    -- Wohnlage: tier shares per PLR per vintage year (long format, one row per tier).
    wohnlage_long as (
        select
            city_code,
            vintage,
            area_code,
            area_vintage,
            wohnlage,
            n_addresses,
            pct_wohnlage,
            wohnlage_low_n
        from {{ ref("int_berlin_wohnlage_plr") }}
    ),

    -- Pivot Wohnlage from long to wide: one row per (vintage, PLR).
    -- COALESCE pct_* to 0.0 so that the composition sums to 1.0 even when a tier
    -- is fully absent in a PLR. wohnlage_low_n and total addresses are PLR-level.
    wohnlage_wide as (
        select
            city_code,
            vintage,
            area_code,
            area_vintage,
            sum(
                case when wohnlage = 'einfach' then pct_wohnlage else 0.0 end
            ) as pct_einfach,
            sum(
                case when wohnlage = 'mittel' then pct_wohnlage else 0.0 end
            ) as pct_mittel,
            sum(case when wohnlage = 'gut' then pct_wohnlage else 0.0 end) as pct_gut,
            sum(n_addresses) as total_n_addresses,
            -- wohnlage_low_n is the same for all tiers within a PLR-vintage
            max(cast(wohnlage_low_n as integer)) = 1 as wohnlage_low_n
        from wohnlage_long
        group by city_code, vintage, area_code, area_vintage
    ),

    -- Mietspiegel rent values for the fixed representative profile (geo condition 9):
    -- size_bucket = '60_to_90'  (60–90 m² band)
    -- year_built_bucket = '1950_1964'  (mid/representative construction-year bucket)
    -- Harmonised bucket crosswalk (geo condition 10):
    -- '1950_1964' exists in all Mietspiegel vintages (2017, 2019, 2021, 2023, 2024,
    -- 2026)
    -- and is therefore the stable anchor across the full series without schema-drift
    -- breaks.
    -- See header note on the 1973+ drift and bucket split in 2024/2026 editions.
    mietspiegel_fixed as (
        select vintage as ms_vintage, wohnlage, rent_low, rent_mid, rent_high
        from {{ ref("stg_berlin_mietspiegel") }}
        -- Fixed profile (declared modelling choice; stated on G2):
        -- 60–90 m² mid-size band; 1950–1964 construction year (harmonised mid bucket).
        where size_bucket = '60_to_90' and year_built_bucket = '1950_1964'
    ),

    -- Pivot Mietspiegel to one row per vintage: three wohnlage columns each for
    -- low/mid/high.
    mietspiegel_pivot as (
        select
            ms_vintage,
            sum(case when wohnlage = 'einfach' then rent_low end) as ms_einfach_low,
            sum(case when wohnlage = 'einfach' then rent_mid end) as ms_einfach_mid,
            sum(case when wohnlage = 'einfach' then rent_high end) as ms_einfach_high,
            sum(case when wohnlage = 'mittel' then rent_low end) as ms_mittel_low,
            sum(case when wohnlage = 'mittel' then rent_mid end) as ms_mittel_mid,
            sum(case when wohnlage = 'mittel' then rent_high end) as ms_mittel_high,
            sum(case when wohnlage = 'gut' then rent_low end) as ms_gut_low,
            sum(case when wohnlage = 'gut' then rent_mid end) as ms_gut_mid,
            sum(case when wohnlage = 'gut' then rent_high end) as ms_gut_high
        from mietspiegel_fixed
        group by ms_vintage
    ),

    -- Vintage-matching (geo condition 8):
    -- Join Wohnlage vintage to the nearest Mietspiegel vintage <= Wohnlage vintage.
    -- Mietspiegel vintages available: 2017, 2019, 2021, 2023, 2024, 2026.
    -- Wohnlage vintages:              2017, 2019, 2021, 2023,       2026.
    -- All Wohnlage vintages have an exact Mietspiegel match (no interpolation needed).
    -- Approximation disclosure (domain D13): 2026 Wohnlage stands in for the 2025 MSS
    -- panel edition; document on G2.
    wohnlage_with_rent as (
        select
            w.city_code,
            w.vintage as snapshot_year,
            w.area_code,
            w.area_vintage,
            w.pct_einfach,
            w.pct_mittel,
            w.pct_gut,
            w.total_n_addresses,
            w.wohnlage_low_n,
            -- wohnlage_score: ordinal mean approximation (einfach=1, mittel=2, gut=3).
            -- Labelled as ordinal-mean approximation; not equidistant interval.
            -- NULL when wohnlage_low_n = TRUE (< 10 addresses; unstable).
            case
                when w.wohnlage_low_n
                then null
                else w.pct_einfach * 1.0 + w.pct_mittel * 2.0 + w.pct_gut * 3.0
            end as wohnlage_score,
            -- Modelled rent estimate (geo conditions 9, 10; domain D6, D7):
            -- est_rent_X = SUM_tier(pct_tier * ms_X_tier)
            -- Fixed profile: 60–90 m², 1950–1964 construction year.
            -- "modelled/estimated net cold rent at a fixed reference dwelling profile
            -- — NOT observed rent paid." (Mietspiegel ortsübliche Vergleichsmiete;
            -- Bestandsmiete lagging bias; Holm 2010 ~84% rental Berlin).
            -- NULL when wohnlage_low_n = TRUE (geo condition 7).
            case
                when w.wohnlage_low_n
                then null
                else
                    (
                        w.pct_einfach * m.ms_einfach_mid
                        + w.pct_mittel * m.ms_mittel_mid
                        + w.pct_gut * m.ms_gut_mid
                    )
            end as est_rent_mid,
            case
                when w.wohnlage_low_n
                then null
                else
                    (
                        w.pct_einfach * m.ms_einfach_low
                        + w.pct_mittel * m.ms_mittel_low
                        + w.pct_gut * m.ms_gut_low
                    )
            end as est_rent_low,
            case
                when w.wohnlage_low_n
                then null
                else
                    (
                        w.pct_einfach * m.ms_einfach_high
                        + w.pct_mittel * m.ms_mittel_high
                        + w.pct_gut * m.ms_gut_high
                    )
            end as est_rent_high,
            m.ms_vintage as mietspiegel_vintage_used
        from wohnlage_wide as w
        -- Nearest-<= Mietspiegel vintage: for all Wohnlage vintages in the series
        -- (2017,2019,2021,2023,2026) there is an exact Mietspiegel match.
        -- The lateral-style join below takes the max Mietspiegel vintage that is <=
        -- Wohnlage.
        inner join
            mietspiegel_pivot as m
            on m.ms_vintage = (
                select max(mp2.ms_vintage)
                from mietspiegel_pivot as mp2
                where mp2.ms_vintage <= w.vintage
            )
    ),

    -- BRW × Wohnlage alignment:
    -- BRW has yearly data (2017–2024); Wohnlage has biennial data
    -- (2017,2019,2021,2023,2026).
    -- We produce one row per BRW snapshot_year, attaching the nearest-<= Wohnlage
    -- vintage.
    -- When no Wohnlage vintage is <= the BRW year, Wohnlage columns are NULL.
    brw_aligned as (
        select
            b.city_code,
            b.snapshot_year,
            b.area_code,
            b.area_vintage,
            b.brw_weighted_avg_eur_m2,
            b.n_brw_zones,
            b.brw_residential_coverage_frac,
            w.pct_einfach,
            w.pct_mittel,
            w.pct_gut,
            w.total_n_addresses,
            w.wohnlage_low_n,
            w.wohnlage_score,
            w.est_rent_mid,
            w.est_rent_low,
            w.est_rent_high,
            w.mietspiegel_vintage_used,
            -- Record which Wohnlage vintage was matched for audit trail
            w.snapshot_year as wohnlage_vintage_matched
        from brw as b
        left join
            wohnlage_with_rent as w
            on b.city_code = w.city_code
            and b.area_code = w.area_code
            and b.area_vintage = w.area_vintage
            and w.snapshot_year = (
                select max(wwr2.snapshot_year)
                from wohnlage_with_rent as wwr2
                where
                    wwr2.city_code = b.city_code
                    and wwr2.area_code = b.area_code
                    and wwr2.area_vintage = b.area_vintage
                    and wwr2.snapshot_year <= b.snapshot_year
            )
    ),

    -- Add Wohnlage-only rows (vintages 2026 have no BRW match since BRW only goes to
    -- 2024).
    -- UNION the wohnlage_with_rent rows that don't appear in BRW.
    -- For Wohnlage vintage 2026 (no BRW year 2026), carry it as a Wohnlage-only row.
    combined as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            brw_weighted_avg_eur_m2,
            n_brw_zones,
            brw_residential_coverage_frac,
            pct_einfach,
            pct_mittel,
            pct_gut,
            total_n_addresses,
            wohnlage_low_n,
            wohnlage_score,
            est_rent_mid,
            est_rent_low,
            est_rent_high,
            mietspiegel_vintage_used,
            wohnlage_vintage_matched
        from brw_aligned

        union all

        -- Wohnlage-only rows: vintages where no BRW snapshot exists.
        -- BRW covers 2017–2024; Wohnlage vintage 2026 has no BRW companion.
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            null as brw_weighted_avg_eur_m2,
            null as n_brw_zones,
            null as brw_residential_coverage_frac,
            pct_einfach,
            pct_mittel,
            pct_gut,
            total_n_addresses,
            wohnlage_low_n,
            wohnlage_score,
            est_rent_mid,
            est_rent_low,
            est_rent_high,
            mietspiegel_vintage_used,
            snapshot_year as wohnlage_vintage_matched
        from wohnlage_with_rent as wwr
        where wwr.snapshot_year not in (select distinct b.snapshot_year from brw as b)
    ),

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
