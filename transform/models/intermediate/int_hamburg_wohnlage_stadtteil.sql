-- int_hamburg_wohnlage_stadtteil.sql
-- #203 [H-C5]: Wohnlage residential-quality tier composition per Stadtteil,
-- the Hamburg analogue of int_berlin_wohnlage_plr (D3, Thesis §3.4). First
-- integration slice of the Hamburg rent/Wohnlage + displacement pillar
-- (ADR-0014 Pillar 5) -- scoped down to tier composition only, mirroring the
-- #70 [B1] Milieuschutz-flag precedent's de-risking call (see
-- int_berlin_milieuschutz_plr_flag.sql header): the full Mietenspiegel
-- rent-VALUE join (Berlin's D1 int_price_rent_wohnlage_mietspiegel analogue)
-- is deliberately deferred to a follow-up ticket rather than attempted here,
-- since Hamburg's mietenspiegel.parquet carries an additional `ausstattung`
-- (fitting-standard) dimension not yet reconciled against wohnlage's
-- two-tier scheme -- forcing that match now would invent an unreviewed
-- methodology choice this slice was not scoped to make.
--
-- =============================================================================
-- R-C2 Methodology citations
-- =============================================================================
-- Same grounding as int_berlin_wohnlage_plr (D3): Smith (1979) rent gap --
-- Wohnlage composition marks potential ground-rent (upgrading headroom), not
-- realised value. Blasius & Dangschat (1990) Aufwertung -- tier SHARES (not
-- modal class) are the continuous operationalisation of housing-stock-quality
-- recomposition. Thesis §3.4: percentage of addresses in each Wohnlage tier
-- per area.
--
-- =============================================================================
-- Grain-choice + join method (differs from Berlin's D3 spatial join)
-- =============================================================================
-- Unlike Berlin's stg_berlin_wohnlage (address points requiring an
-- ST_Within point-in-polygon join to PLR geometries), Hamburg's
-- stg_hamburg_wohnlage carries a publisher-supplied `stadtteil` free-text
-- column directly on each address row -- no spatial join is needed or
-- performed here. This is a NAME match (Stadtteil is an administrative
-- containment fact stamped by the publisher), the same class of join
-- int_ewr_socioeco_hamburg_disagg uses for its Gebiet->Stadtteil crosswalk
-- (ADR-0014 open question #5 precedent), verified empirically at build time
-- via the `wohnlage_stadtteil_match_rate` test below: 100% of the 283,801
-- live address rows match a Stadtteil in stg_hamburg_geo (area_level =
-- 'subarea_l1') on exact string equality -- no normalization rule (case
-- fold, hyphenation) was needed, unlike the EWR crosswalk's 98.6%
-- (verified against the currently ingested data; the test enforces a >=98%
-- floor to catch future-vintage drift, mirroring the EWR crosswalk's own
-- condition).
--
-- Grain: Stadtteil (`subarea_l1`, ~104-105 areas) -- Hamburg's Wohnlage
-- source does not publish at the finer statistisches-Gebiet grain, so no
-- disaggregation choice is made here (contrast int_ewr_socioeco_hamburg's
-- uniform Stadtteil->Gebiet inheritance) -- this model simply stays at its
-- native grain, which is coarser than Hamburg's PLR-analogue
-- (statistisches Gebiet) but the grain the source actually supports.
--
-- Wohnlage vocabulary (verified live, #203): Hamburg publishes a two-tier
-- scheme ('Gute Wohnlage', 'Normale Wohnlage'), NOT Berlin's three-tier
-- einfach/mittel/gut -- preserved as-published (stg_hamburg_wohnlage's own
-- scoping decision). No cross-city tier remapping is attempted; any
-- cross-city Wohnlage comparison must go through the G2 methodology page's
-- non-equivalence disclosure (mirrors ADR-0014's Sozialmonitoring/EWR
-- non-equivalence notes).
--
-- No `wohnlage_score` ordinal-mean column is produced here (unlike Berlin's
-- D3 model): with only two tiers, a share-weighted ordinal mean collapses
-- to a simple linear rescale of pct_wohnlage_gute and would not add
-- information beyond the tier shares already exposed -- deferred, not
-- omitted by oversight.
--
-- Aggregation: COUNT(*) per (city_code, area_code, area_vintage, wohnlage).
-- No time dimension: the Wohnlagenverzeichnis source is a current-state
-- crosswalk (mirrors stg_hamburg_displacement_zones' current-state framing
-- and ADR-0014's Pillar 5 access-mechanism note) -- unlike Berlin's D3
-- model, there is no `vintage` column since Hamburg's Wohnlage release does
-- not carry a WFS edition-year dimension in the ingested schema.
--
-- wohnlage_low_n flag (mirrors Berlin D3 geo condition 7): TRUE when
-- SUM(n_addresses) for a Stadtteil < 10. Downstream consumers must NULL any
-- derived scalar for low-N Stadtteile; never zero-fill.
--
-- Materialization: table (window function in final SELECT; same DuckDB
-- view-binding workaround as int_berlin_wohnlage_plr).
--
-- CRS: not applicable -- no spatial join performed (name-match only); the
-- source's geometry_wkb column (EPSG:25832) is not read by this model.
--
-- Output grain: (city_code, area_code, area_vintage, wohnlage).
-- One row per Stadtteil per Wohnlage tier.
--
-- Graceful degradation: returns zero rows when stg_hamburg_wohnlage or
-- stg_hamburg_geo return zero rows (no parquets ingested yet).
--
-- dbt_meta_owner: data-engineer
-- geo-ds-sign-off: PASS (docs/epic-h/203-hc5-geo-signoff.md, 2026-07-09, issue #203)
-- domain-sign-off: PASS (docs/epic-h/203-hc5-domain-signoff.md, 2026-07-09, issue #203)
-- depends_on: {{ ref('stg_hamburg_wohnlage') }}
-- depends_on: {{ ref('stg_hamburg_geo') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    wohnlage as (
        select city_code, address_id, stadtteil, wohnlage
        from {{ ref("stg_hamburg_wohnlage") }}
        where stadtteil is not null
    ),

    stadtteile as (
        select city_code, area_code, area_vintage, area_name
        from {{ ref("stg_hamburg_geo") }}
        where area_level = 'subarea_l1'
    ),

    -- Name-match join: publisher-supplied Stadtteil name on each address row
    -- against the Stadtteil geometry layer's area_name. See header for why
    -- this is a containment fact, not a computed spatial join.
    joined as (
        select w.city_code, w.address_id, w.wohnlage, s.area_code, s.area_vintage
        from wohnlage as w
        inner join
            stadtteile as s on w.city_code = s.city_code and w.stadtteil = s.area_name
    ),

    aggregated as (
        select city_code, area_code, area_vintage, wohnlage, count(*) as n_addresses
        from joined
        group by city_code, area_code, area_vintage, wohnlage
    ),

    stadtteil_total as (
        select city_code, area_code, area_vintage, sum(n_addresses) as total_n_addresses
        from aggregated
        group by city_code, area_code, area_vintage
    )

-- Final output: tier counts, shares, and wohnlage_low_n flag (mirrors
-- Berlin D3 geo condition 7). pct_wohnlage: share of each tier within each
-- Stadtteil.
select
    {{ canonical_city_code("a.city_code") }} as city_code,
    a.area_code,
    a.area_vintage,
    a.wohnlage,
    a.n_addresses,
    -- Thesis §3.4: percentage of addresses in each Wohnlage tier per area.
    cast(a.n_addresses as double) / nullif(t.total_n_addresses, 0) as pct_wohnlage,
    t.total_n_addresses < 10 as wohnlage_low_n
from aggregated as a
inner join
    stadtteil_total as t
    on a.city_code = t.city_code
    and a.area_code = t.area_code
    and a.area_vintage = t.area_vintage
