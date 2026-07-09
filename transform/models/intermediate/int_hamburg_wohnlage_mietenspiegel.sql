-- int_hamburg_wohnlage_mietenspiegel.sql
-- #215 [H-C6]: Mietenspiegel rent-VALUE join for Hamburg -- the Hamburg
-- analogue of Berlin's D1 int_price_rent_wohnlage_mietspiegel. Follow-up to
-- #203 [H-C5], which shipped Wohnlage tier composition
-- (int_hamburg_wohnlage_stadtteil) but deliberately deferred this rent-value
-- join because stg_hamburg_mietenspiegel's `ausstattung` (fitting-standard)
-- dimension was not yet reconciled (see that model's header and
-- docs/epic-h/203-hc5-geo-signoff.md Sec.e).
--
-- =============================================================================
-- R-C2 Methodology citations
-- =============================================================================
-- Same grounding as int_price_rent_wohnlage_mietspiegel (D1, Thesis Sec.3.2):
-- Smith (1979) rent gap; Holm (2010) Bestandsmiete-lagging-bias; Mietspiegel
-- ortsuebliche Vergleichsmiete is a MODELLED reference rent at a fixed
-- dwelling profile, NOT observed rent paid. est_rent_X = weighted sum over
-- Wohnlage tier shares (pct_tier * rent_X_tier), the same construction as
-- Berlin's D1 model.
--
-- =============================================================================
-- The `ausstattung` reconciliation (#215's actual scope)
-- =============================================================================
-- Investigated directly against the live parquet (data/raw/hamburg/rent/
-- mietenspiegel.parquet, 2025 edition): `ausstattung` carries EXACTLY ONE
-- value across all 88 rows -- 'mit Bad und Sammelheizung' ("with bathroom and
-- central/collective heating"). This is not a coincidence to paper over: it
-- is Hamburg's own standard-equipment baseline, the same institutional
-- concept as Berlin's stg_berlin_mietspiegel, whose header states "All cells
-- represent standard equipment (mit SH, Bad, IWC)" -- both cities' rent
-- tables are published at ONE implicit/explicit standard-fitting baseline,
-- not a matrix of fitting levels. Hamburg's Mietenspiegel simply makes this
-- explicit as a column rather than a table-wide footnote. Picking
-- 'mit Bad und Sammelheizung' as the representative `ausstattung` is
-- therefore not an invented judgment call -- it is the ONLY value the
-- publisher currently offers, directly analogous to Berlin's fixed
-- "standard equipment" assumption (D1 domain sign-off).
--
-- Caveat (disclosure, mirrors #203's domain D13 approximation note): this
-- reconciliation is verified against a SINGLE ingested edition (2025). If a
-- future Hamburg Mietenspiegel edition publishes multiple `ausstattung`
-- categories (as some German-city rent tables do for e.g. "ohne Bad"), the
-- `where ausstattung = '...'` filter below will silently narrow to the one
-- named value rather than fail -- flagged on G2 as a limitation to revisit at
-- the next Hamburg Mietenspiegel edition ingestion, not treated as
-- permanently resolved.
--
-- Representative dwelling profile (mirrors Berlin D1 geo condition 9's fixed
-- 60-90 sqm / 1950-1964 profile; NOT independently re-derived here, since
-- Hamburg's bucket vocabulary differs and only one edition is ingested so far
-- -- no cross-edition stability check is possible yet, unlike Berlin's
-- harmonised-bucket check, geo condition 10):
-- size_bucket       = '66m² bis unter 91m²'  (Hamburg's own mid-size band,
-- closest analogue to Berlin's 60-90 sqm)
-- year_built_bucket = '1968 bis 1977'         (median-position construction
-- era among Hamburg's 10 published buckets; postwar
-- reconstruction-era housing stock, a large and typical
-- segment of Hamburg's building stock, analogous in role
-- to Berlin's 1950-1964 "typical stock" anchor)
-- ausstattung       = 'mit Bad und Sammelheizung' (the only published value;
-- see reconciliation note above)
--
-- =============================================================================
-- Grain + join method
-- =============================================================================
-- int_hamburg_wohnlage_stadtteil (#203) has NO vintage/edition-year dimension
-- (current-state Wohnlagenverzeichnis crosswalk; see that model's header) --
-- unlike Berlin's D3-to-D1 vintage-matching join, there is nothing to match
-- the Mietenspiegel edition_year against. This model simply joins the
-- current-state tier composition against the LATEST ingested Mietenspiegel
-- edition (MAX(edition_year) at the fixed profile) -- degenerate case of
-- Berlin's "nearest <=" rule with a single point on the Wohnlage side.
--
-- wohnlage_score: NOT produced, mirroring int_hamburg_wohnlage_stadtteil's
-- own decision -- with only two tiers, a share-weighted ordinal mean
-- collapses to a linear rescale of pct_gute_wohnlage.
--
-- est_rent_* is NULL when wohnlage_low_n = TRUE (< 10 addresses; inherited
-- from int_hamburg_wohnlage_stadtteil's own low-N flag).
--
-- Scoping (mirrors #203 Sec.f): disclosure-only -- NOT wired into
-- gentrification_index (contract-enforced, ADR-0004) and NOT composited with
-- int_hamburg_displacement_zone_flag.
--
-- Materialization: view (no window function in the final SELECT; pivot CTEs
-- use aggregation only).
--
-- Output grain: (city_code, area_code, area_vintage). One row per Stadtteil.
--
-- Graceful degradation: returns zero rows when int_hamburg_wohnlage_stadtteil
-- or stg_hamburg_mietenspiegel return zero rows.
--
-- dbt_meta_owner: data-engineer
-- geo-ds-sign-off: PASS (docs/epic-h/215-hc6-geo-signoff.md, 2026-07-09, issue #215)
-- domain-sign-off: PASS (docs/epic-h/215-hc6-domain-signoff.md, 2026-07-09, issue #215)
-- depends_on: {{ ref('int_hamburg_wohnlage_stadtteil') }}
-- depends_on: {{ ref('stg_hamburg_mietenspiegel') }}
{{ config(materialized="view", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    -- Wohnlage tier composition (Stadtteil grain, current-state, #203).
    wohnlage_long as (
        select
            city_code, area_code, area_vintage, wohnlage, pct_wohnlage, wohnlage_low_n
        from {{ ref("int_hamburg_wohnlage_stadtteil") }}
    ),

    -- Pivot Wohnlage from long to wide: one row per Stadtteil.
    -- COALESCE pct_* to 0.0 so the composition sums to 1.0 even when a tier
    -- is fully absent in a Stadtteil (mirrors Berlin D1's wohnlage_wide CTE).
    wohnlage_wide as (
        select
            city_code,
            area_code,
            area_vintage,
            sum(
                case when wohnlage = 'Gute Wohnlage' then pct_wohnlage else 0.0 end
            ) as pct_gute_wohnlage,
            sum(
                case when wohnlage = 'Normale Wohnlage' then pct_wohnlage else 0.0 end
            ) as pct_normale_wohnlage,
            -- wohnlage_low_n is the same for both tiers within a Stadtteil (see
            -- int_hamburg_wohnlage_stadtteil header); MAX collapses the
            -- per-tier duplication into one flag.
            max(cast(wohnlage_low_n as integer)) = 1 as wohnlage_low_n
        from wohnlage_long
        group by city_code, area_code, area_vintage
    ),

    -- Mietenspiegel rent values at the fixed representative profile (see
    -- header for the ausstattung/size_bucket/year_built_bucket rationale).
    mietenspiegel_fixed as (
        select edition_year, wohnlage, rent_low, rent_mid, rent_high
        from {{ ref("stg_hamburg_mietenspiegel") }}
        where
            size_bucket = '66m² bis unter 91m²'
            and year_built_bucket = '1968 bis 1977'
            and ausstattung = 'mit Bad und Sammelheizung'
    ),

    -- Pivot to one row per edition: two wohnlage columns each for
    -- low/mid/high (Hamburg's two-tier scheme, unlike Berlin's three).
    mietenspiegel_pivot as (
        select
            edition_year,
            sum(case when wohnlage = 'Gute Wohnlage' then rent_low end) as ms_gute_low,
            sum(case when wohnlage = 'Gute Wohnlage' then rent_mid end) as ms_gute_mid,
            sum(
                case when wohnlage = 'Gute Wohnlage' then rent_high end
            ) as ms_gute_high,
            sum(
                case when wohnlage = 'Normale Wohnlage' then rent_low end
            ) as ms_normale_low,
            sum(
                case when wohnlage = 'Normale Wohnlage' then rent_mid end
            ) as ms_normale_mid,
            sum(
                case when wohnlage = 'Normale Wohnlage' then rent_high end
            ) as ms_normale_high
        from mietenspiegel_fixed
        group by edition_year
    ),

    -- Latest ingested Mietenspiegel edition (degenerate "nearest <=" rule --
    -- see header: Wohnlage has no vintage to match against).
    latest_edition as (
        select max(edition_year) as edition_year from mietenspiegel_pivot
    )

select
    w.city_code,
    w.area_code,
    w.area_vintage,
    w.pct_gute_wohnlage,
    w.pct_normale_wohnlage,
    w.wohnlage_low_n,
    -- Modelled rent estimate (fixed profile; see header). NULL when
    -- wohnlage_low_n = TRUE (inherited low-N guard).
    case
        when w.wohnlage_low_n
        then null
        else
            (
                w.pct_gute_wohnlage * m.ms_gute_mid
                + w.pct_normale_wohnlage * m.ms_normale_mid
            )
    end as est_rent_mid,
    case
        when w.wohnlage_low_n
        then null
        else
            (
                w.pct_gute_wohnlage * m.ms_gute_low
                + w.pct_normale_wohnlage * m.ms_normale_low
            )
    end as est_rent_low,
    case
        when w.wohnlage_low_n
        then null
        else
            (
                w.pct_gute_wohnlage * m.ms_gute_high
                + w.pct_normale_wohnlage * m.ms_normale_high
            )
    end as est_rent_high,
    m.edition_year as mietenspiegel_edition_used
from wohnlage_wide as w
inner join latest_edition as l on true
inner join mietenspiegel_pivot as m on l.edition_year = m.edition_year
