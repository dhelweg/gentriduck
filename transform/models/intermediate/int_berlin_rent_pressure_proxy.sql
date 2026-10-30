-- int_berlin_rent_pressure_proxy.sql
-- #70 [B1] / ADR-0019 Decision 2: affordability / rent-pressure proxy.
--
-- ADR-0019 explicitly deferred this formula to a follow-up gated slice (R-C1
-- methodology-bearing): "rent level (already-staged Mietspiegel) relative to the
-- citywide/PLR median, combined with the SES transfer-receipt share
-- (stg_berlin_mss_indicators, ADR-0007) as an ability-to-pay-stress proxy -- not a
-- true burden ratio." No literal rent-to-income ratio is computed here: ADR-0007's
-- documented gap (no PLR-grain income series anywhere in this pipeline) rules that
-- out (ADR-0019 Alternative C, rejected under R-C2 grounding).
--
-- Formula (both terms vulnerability/pressure-positive, R-A5 sign convention;
-- geo-DS confirms no re-orientation needed for either input -- see
-- docs/methodology/B1-rent-pressure-geo-signoff.md):
-- z_rent_rel        = z-score of est_rent_mid across PLRs within the same
-- snapshot_year (higher = rent further above that year's
-- citywide median -- Signal 3, int_price_rent_wohnlage_mietspiegel)
-- z_transfer_stress = z-score of transferbezug_anteil across PLRs within the
-- matched MSS edition (higher = more of the resident
-- population depends on SGB II/XII transfers -- already
-- vulnerability-positive per R-A4/#67 geo-signoff Finding d)
--
-- #360 input definition: transferbezug_anteil is MSS index indicator S3
-- "Transferbezug" = non-unemployed recipients of SGB II and SGB XII
-- subsistence benefits per resident, in % (Indikatorenblaetter ab MSS 2013,
-- Kap. 3.1.3 S. 17; MSS 2017 Kap. 3.1.3 S. 20; MSS 2019 Kap. 3.1.2 S. 18;
-- MSS 2021 Kap. 3.1.2 S. 21;
-- MSS 2023 Kap. 3.1.3 S. 26; MSS 2025 Kap. 3.1.3 S. 26). It excludes the
-- registered unemployed (they are S1), so it captures children, pensioners,
-- people unable to work and "Aufstocker". Before #360 this column was
-- mis-mapped from WFS slot s2: Langzeitarbeitslosigkeit in 2015/2017, empty
-- in 2019/2021 and Kinder/Jugendliche in alleinerziehenden Haushalten in
-- 2023/2025 -- i.e. the 2023/2026 rent_pressure_proxy carried a
-- family-structure share labelled as benefit stress
-- (docs/epic-c/360-mss-indicator-mapping-evidence.md).
-- rent_pressure_proxy = mean(z_rent_rel, z_transfer_stress)
-- Equal-weight mean of two unit-variance z-scores mirrors the int_ewr_socioeco
-- composite pattern (mean of z-scores, not a sum, to avoid inflating SD -- same
-- reasoning as that model's header note).
--
-- Interpretation (domain framing; see B1-rent-pressure-domain-signoff.md): a PLR
-- scores HIGH on this proxy when it combines above-median modelled rent with an
-- above-median transfer-dependent population share -- i.e. rent has risen (or is
-- already high) in an area whose residents are the least able to absorb it. This
-- is an *affordability-stress* signal, not a measured displacement event, and not
-- a rent-to-income ratio (no income series exists; ADR-0007 gap).
--
-- Coverage (#360 correction): S3 Transferbezug is published in every MSS
-- edition 2015-2025, so transferbezug_anteil is non-null for all ingested
-- editions (2015, 2017, 2019, 2021, 2023, 2025). The earlier "NULL for 2019 and
-- 2021" gap (R-A4/#67 C3) was an artefact of the slot mis-mapping (it was the
-- vacant S2 slot), not a Transferbezug gap. Of the Wohnlage snapshot years
-- (2017, 2019, 2021, 2023, 2026), the matched MSS editions are 2017, 2019,
-- 2021, 2023, 2025 respectively (nearest-<= rule below), so rent_pressure_proxy
-- is now populated for every snapshot_year wherever est_rent_mid and the PLR's
-- MSS value exist (uninhabited PLRs stay NULL). Definition breaks inside S3
-- that a cross-edition reader must know: SGB II statistics revision 2016 (MSS
-- 2017) and the Regelaltersgrenze correction from MSS 2021 (MSS 2021
-- Indikatorenblaetter, Vorbemerkungen S. 7). z_transfer_stress is a
-- within-year z-score, so these level shifts do not leak into it.
--
-- Vintage/edition matching: nearest MSS edition <= Wohnlage snapshot_year, mirroring
-- int_price_rent_wohnlage_mietspiegel's own nearest-<=-vintage pattern (geo condition 8
-- precedent). Grain: one row per (city_code, snapshot_year, area_code, area_vintage).
--
-- Zero consumers as of this model -- not yet wired into any mart or the governed
-- gentrification_index (ADR-0019 explicitly scopes that integration to a later,
-- separately-gated slice).
-- Follow-up now tracked: #258 (see
-- docs/epic-d/tickets/D5-wire.md).
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_price_rent_wohnlage_mietspiegel') }}
-- depends_on: {{ ref('stg_berlin_mss_indicators') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    rent as (
        select city_code, snapshot_year, area_code, area_vintage, est_rent_mid
        from {{ ref("int_price_rent_wohnlage_mietspiegel") }}
    ),

    -- Transfer-receipt share (MSS S3 Transferbezug, SGB II/XII benefit
    -- dependency), one value per (city_code, edition, area_code, area_vintage).
    -- Populated in every edition since #360 (see coverage note above).
    transfer_stress as (
        select city_code, edition, area_code, area_vintage, indicator_value
        from {{ ref("stg_berlin_mss_indicators") }}
        where indicator = 'transferbezug_anteil'
    ),

    -- Nearest-<= MSS edition per rent snapshot_year (mirrors the Mietspiegel
    -- nearest-<=-vintage join in int_price_rent_wohnlage_mietspiegel).
    rent_with_edition as (
        select
            r.*,
            (
                select max(ts2.edition)
                from transfer_stress as ts2
                where
                    ts2.city_code = r.city_code
                    and ts2.area_vintage = r.area_vintage
                    and ts2.edition <= r.snapshot_year
            ) as matched_edition
        from rent as r
    ),

    joined as (
        select
            rwe.city_code,
            rwe.snapshot_year,
            rwe.area_code,
            rwe.area_vintage,
            rwe.est_rent_mid,
            rwe.matched_edition,
            ts.indicator_value as transferbezug_anteil
        from rent_with_edition as rwe
        left join
            transfer_stress as ts
            on rwe.city_code = ts.city_code
            and rwe.area_code = ts.area_code
            and rwe.area_vintage = ts.area_vintage
            and rwe.matched_edition = ts.edition
    ),

    -- Per-year z-scores across PLRs. NULLIF(stddev,0) guards degenerate years
    -- (same guard as int_ewr_socioeco).
    zscored as (
        select
            *,
            (
                est_rent_mid
                - avg(est_rent_mid) over (partition by city_code, snapshot_year)
            ) / nullif(
                stddev_pop(est_rent_mid) over (partition by city_code, snapshot_year), 0
            ) as z_rent_rel,
            (
                transferbezug_anteil
                - avg(transferbezug_anteil) over (partition by city_code, snapshot_year)
            ) / nullif(
                stddev_pop(transferbezug_anteil) over (
                    partition by city_code, snapshot_year
                ),
                0
            ) as z_transfer_stress
        from joined
    )

select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    est_rent_mid,
    transferbezug_anteil,
    matched_edition as transfer_stress_mss_edition,
    z_rent_rel,
    z_transfer_stress,
    -- rent_pressure_proxy: NULL when either term is NULL (no imputation of a
    -- missing term, per R-A4/#67 C3).
    case
        when z_rent_rel is null or z_transfer_stress is null
        then null
        else (z_rent_rel + z_transfer_stress) / 2.0
    end as rent_pressure_proxy
from zscored
