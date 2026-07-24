-- int_price_rent_brw_wohnlage_combined_hamburg.sql
-- #303 [I21-i / H-price-rent]: Hamburg's analogue of
-- int_price_rent_brw_wohnlage_combined, shaped to the SAME UNION grain so
-- mart_price_rent_dimension can UNION ALL Berlin + Hamburg without touching
-- Berlin's existing (byte-identical) CTEs/output. This model wires in
-- ALREADY-SIGNED-OFF Hamburg data -- an admission step (mirrors #237's
-- gentrification_index Hamburg admission), NOT new methodology:
-- - int_hamburg_wohnlage_mietenspiegel (#215 [H-C6]): PASS,
-- docs/epic-h/215-hc6-geo-signoff.md, docs/epic-h/215-hc6-domain-signoff.md
-- - int_hamburg_wohnlage_stadtteil (#203 [H-C5]): PASS,
-- docs/epic-h/203-hc5-geo-signoff.md, docs/epic-h/203-hc5-domain-signoff.md
--
-- =============================================================================
-- Why Hamburg needs its own combined model, not a fold into the Berlin one
-- =============================================================================
-- 1. No BRW-equivalent land-value source exists for Hamburg (Signal 1) -- there
-- is no int_berlin_brw_plr analogue to align against. All BRW columns
-- (brw_weighted_avg_eur_m2, n_brw_zones, brw_residential_coverage_frac) are
-- NULL for every Hamburg row. Expected and disclosed, not a gap to fill.
-- 2. Hamburg publishes a TWO-tier Wohnlage scheme ('Gute Wohnlage'/'Normale
-- Wohnlage'), NOT Berlin's THREE-tier (einfach/mittel/gut).
-- int_hamburg_wohnlage_stadtteil's own header is explicit: "No cross-city
-- tier remapping is attempted; any cross-city Wohnlage comparison must go
-- through the G2 methodology page's non-equivalence disclosure." Hamburg's
-- tiers are therefore carried in their OWN columns (pct_gute_wohnlage,
-- pct_normale_wohnlage) -- NEVER aliased onto pct_einfach/pct_mittel/
-- pct_gut. Berlin's tier columns are NULL here; conversely, Berlin's
-- combined model does not have pct_gute_wohnlage/pct_normale_wohnlage.
-- 3. wohnlage_score (Berlin's 3-tier ordinal mean) is not produced for
-- Hamburg -- int_hamburg_wohnlage_mietenspiegel's header explains a 2-tier
-- share-weighted ordinal mean would just be a linear rescale of
-- pct_gute_wohnlage, adding no information beyond the tier shares already
-- exposed. NULL here, consistent with the upstream source model's own
-- decision (not re-litigated).
-- 4. Hamburg's Wohnlage/Mietenspiegel join is CURRENT-STATE only -- there is
-- no vintage/edition-year dimension on the Wohnlage side (see
-- int_hamburg_wohnlage_stadtteil header: "current-state Wohnlagen-
-- verzeichnis crosswalk"), joined to the single LATEST ingested
-- Mietenspiegel edition. There is no multi-year Hamburg series to align
-- against a BRW-style yearly axis the way Berlin's Wohnlage vintages are.
-- snapshot_year choice (documented here, not new methodology): the
-- Mietenspiegel edition_year actually used
-- (mietenspiegel_edition_used from int_hamburg_wohnlage_mietenspiegel) is
-- the only real "vintage" signal Hamburg carries, so it is used as this
-- row's snapshot_year. wohnlage_vintage_matched is left NULL -- unlike
-- Berlin's Wohnlage-only rows, there is no separate Wohnlage vintage to
-- record here: the Wohnlage side is current-state, not year-stamped, so
-- duplicating the Mietenspiegel year under a "wohnlage_vintage_matched"
-- label would misrepresent it as a Wohnlage vintage that does not exist.
--
-- total_n_addresses: int_hamburg_wohnlage_mietenspiegel does not expose the
-- Stadtteil total address count directly (only the derived wohnlage_low_n
-- flag), so it is re-derived here by summing n_addresses across tiers from
-- int_hamburg_wohnlage_stadtteil -- the IDENTICAL SUM(n_addresses)
-- computation already performed (and signed off, #203) inside that model's
-- own `stadtteil_total` CTE, just re-exposed at this grain. Mechanical
-- re-derivation, not a new methodology choice.
--
-- Output shape mirrors int_price_rent_brw_wohnlage_combined's columns, PLUS
-- two Hamburg-native tier columns (pct_gute_wohnlage, pct_normale_wohnlage)
-- that Berlin's combined model does not have (and vice versa for
-- pct_einfach/pct_mittel/pct_gut). mart_price_rent_dimension UNION ALLs
-- both, NULL-padding the columns each side does not have.
--
-- Materialization: view (mirrors int_price_rent_brw_wohnlage_combined).
--
-- Output grain: (city_code, snapshot_year, area_code, area_vintage). One row
-- per Hamburg Stadtteil (area_vintage='current' -- see
-- int_hamburg_wohnlage_stadtteil header).
--
-- Graceful degradation: returns zero rows when int_hamburg_wohnlage_
-- mietenspiegel or int_hamburg_wohnlage_stadtteil return zero rows.
--
-- dbt_meta_owner: data-engineer
-- geo-ds-sign-off: inherited from #203/#215 (see citations above) -- #303 is a
-- mart-admission wiring step, not new methodology (per issue framing).
-- domain-sign-off: inherited from #203/#215 (see citations above).
-- depends_on: {{ ref('int_hamburg_wohnlage_mietenspiegel') }}
-- depends_on: {{ ref('int_hamburg_wohnlage_stadtteil') }}
{{ config(materialized="view", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    wohnlage_rent as (select * from {{ ref("int_hamburg_wohnlage_mietenspiegel") }}),

    -- Re-derive the Stadtteil total address count (see header) -- identical
    -- SUM(n_addresses) computation to int_hamburg_wohnlage_stadtteil's own
    -- stadtteil_total CTE, just re-exposed at this grain.
    address_totals as (
        select city_code, area_code, area_vintage, sum(n_addresses) as total_n_addresses
        from {{ ref("int_hamburg_wohnlage_stadtteil") }}
        group by city_code, area_code, area_vintage
    )

select
    wr.city_code,
    cast(wr.mietenspiegel_edition_used as bigint) as snapshot_year,
    wr.area_code,
    wr.area_vintage,

    -- Signal 1: no BRW-equivalent land-value source exists for Hamburg
    -- (header condition 1).
    cast(null as double) as brw_weighted_avg_eur_m2,
    cast(null as bigint) as n_brw_zones,
    cast(null as double) as brw_residential_coverage_frac,

    -- Signal 2: Berlin's 3-tier vocabulary does not apply to Hamburg (header
    -- condition 2) -- NULL, never force-mapped.
    cast(null as double) as pct_einfach,
    cast(null as double) as pct_mittel,
    cast(null as double) as pct_gut,

    -- Signal 2: Hamburg's own 2-tier vocabulary (header condition 2).
    wr.pct_gute_wohnlage,
    wr.pct_normale_wohnlage,

    addr_tot.total_n_addresses,
    wr.wohnlage_low_n,

    -- wohnlage_score: not produced for Hamburg (header condition 3).
    cast(null as double) as wohnlage_score,

    -- Signal 3: modelled Mietenspiegel rent estimate (already computed
    -- upstream, #215).
    wr.est_rent_mid,
    wr.est_rent_low,
    wr.est_rent_high,
    cast(wr.mietenspiegel_edition_used as bigint) as mietspiegel_vintage_used,

    -- No separate Wohnlage vintage to record for Hamburg (current-state;
    -- header condition 4).
    cast(null as bigint) as wohnlage_vintage_matched

from wohnlage_rent as wr
left join
    address_totals as addr_tot
    on wr.city_code = addr_tot.city_code
    and wr.area_code = addr_tot.area_code
    and wr.area_vintage = addr_tot.area_vintage
