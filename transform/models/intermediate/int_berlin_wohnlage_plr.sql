-- int_berlin_wohnlage_plr.sql
-- D3 (#29): Wohnlage residential quality tier composition per PLR per vintage year.
--
-- =============================================================================
-- R-C2 Methodology citations
-- =============================================================================
-- Smith (1979) rent gap: Wohnlage composition (high %-einfach) marks POTENTIAL
-- ground-rent that is not yet capitalised — upgrading headroom, not the gap itself.
-- Blasius & Dangschat (1990) Aufwertung: Wohnlage tier composition is the operational
-- language of residential Aufwertung; gentrification is the gradual recomposition of
-- housing stock quality. Tier SHARES (not modal class) capture the continuous process.
-- Holm (2010) / Bernt (2016) Milieuschutz: high %-einfach in inner-city PLRs is
-- the Milieuschutz target profile (vulnerability/headroom precondition, domain D3).
-- The Aufwertung OUTCOME is the DECLINING einfach share over vintages (built
-- separately).
-- wohnlage_score: share-weighted ordinal mean (einfach=1, mittel=2, gut=3). Labelled
-- as an ORDINAL-MEAN APPROXIMATION — the three tiers are ordered but not equidistant;
-- do not treat as interval-scaled in regression without noting this limitation.
-- ADR-0003 §Price/rent (P-B Mietspiegel/Wohnlage): approved source; governs ingestion
-- and
-- staging of Berlin Wohnlage address-tier data. See docs/adr/0003-*.md. (R-C2, geo 15)
-- Sign-offs: docs/epic-d/d3-price-rent-geo-signoff.md (PASS WITH CONDITIONS, 16
-- conditions)
-- docs/epic-d/d3-price-rent-domain-signoff.md (PASS WITH CONDITIONS, 14 conditions)
--
-- Polarity (index-definition §5, domain D3, geo condition 12):
-- High %-einfach = vulnerability/headroom PRECONDITION (precondition, not outcome).
-- Vulnerability-positive: pct_einfach is positive (high share = more
-- headroom/vulnerable),
-- only where coinciding with locational desirability/pressure.
-- wohnlage_score (high gut = desirable = consolidated = LOW remaining headroom):
-- requires sign-FLIP if pooled into vulnerability composite (high score = low
-- vulnerability).
--
-- =============================================================================
-- Methodology
-- =============================================================================
-- Source: stg_berlin_wohnlage (address points) and stg_berlin_lor (PLR geometries).
--
-- Spatial join: ST_Within(wohnlage_point, plr_polygon) — point-in-polygon.
-- Same predicate as int_osm_poi_plr (geo-DS approved C3 method).
-- Both datasets are native EPSG:25833; no ST_Transform needed.
--
-- Sanity: Berlin EPSG:25833 y ∈ [5.79e6, 5.84e6] — the Wohnlage CTE includes this
-- axis-order check to catch coordinate-order swaps before the join (geo condition 5).
-- Points outside this northing range would indicate EPSG:4326 (WGS84) coordinates
-- loaded into a 25833 column — a silent failure that would produce zero matches.
--
-- Deterministic boundary tie-break (geo condition 5):
-- QUALIFY ROW_NUMBER() OVER (PARTITION BY address_id, vintage ORDER BY area_code) = 1
-- ensures exactly one PLR per (address point, vintage) when a point falls on a shared
-- boundary. Partitioning by vintage prevents cross-vintage row elimination (same
-- address_id
-- appears in multiple WFS editions).
--
-- Vintage alignment (mirrors int_osm_poi_plr):
-- vintage <= 2020 → area_vintage = 'lor_pre2021' (448 PLRs)
-- vintage >= 2021 → area_vintage = 'lor_2021'    (542 PLRs)
--
-- Aggregation: COUNT(*) per (vintage, area_code, area_vintage, wohnlage).
--
-- wohnlage_low_n flag (geo condition 7):
-- A PLR-vintage has wohnlage_low_n = TRUE when SUM(n_addresses) for that PLR-vintage
-- < 10.
-- Downstream consumers (mart_price_rent_dimension) NULL the derived wohnlage_score and
-- estimated rent for low-N PLR-vintages; never zero-fill.
--
-- pct_wohnlage: tier share within each PLR for each vintage.
-- = n_addresses / SUM(n_addresses) OVER (PARTITION BY vintage, area_code, area_vintage)
--
-- Zero-fill / graceful degradation:
-- No fill applied — PLRs with no Wohnlage addresses are absent from output.
-- Downstream consumers LEFT JOIN to the full PLR list when completeness is needed.
--
-- Materialization: table (not view) — window function in the final SELECT causes a
-- DuckDB
-- bind error when a view is referenced in an outer WHERE. Same workaround as
-- int_berlin_ewr_plr2021 and int_osm_poi_plr.
--
-- CRS: EPSG:25833 throughout. No ST_Transform needed.
--
-- Output grain: (city_code, vintage, area_code, area_vintage, wohnlage)
-- One row per PLR per Wohnlage tier per WFS edition year.
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

with
    -- Wohnlage address points from staging (graceful: zero rows if parquets absent).
    -- Sanity: Berlin EPSG:25833 y in [5.79e6, 5.84e6] (geo condition 5).
    -- A point with y outside this range would indicate a coordinate-swap (WGS84 loaded
    -- as 25833); guard is applied as a WHERE to reject such rows rather than fail
    -- silently.
    wohnlage as (
        select
            vintage,
            city_code,
            wohnlage,
            address_id,
            st_geomfromwkb(geometry_wkb) as geom
        from {{ ref("stg_berlin_wohnlage") }}
        where
            geometry_wkb is not null
            and wohnlage is not null
            -- Sanity: Berlin EPSG:25833 y in [5.79e6, 5.84e6]
            -- stg_berlin_wohnlage stores geometry as MultiPoint WKB (native WFS type);
            -- ST_Centroid returns a Point regardless of geometry type, so ST_Y is
            -- safe here.
            and st_y(st_centroid(st_geomfromwkb(geometry_wkb)))
            between 5.79e6 and 5.84e6
    ),

    -- PLR geometries for both vintages from staging (graceful: zero rows if absent)
    plr as (
        select area_code, area_vintage, st_geomfromwkb(geometry_wkb) as geom
        from {{ ref("stg_berlin_lor") }}
        where geometry_wkb is not null
    ),

    -- Point-in-polygon join with vintage alignment:
    -- pre-2021 Wohnlage editions (vintage <= 2020) → pre-2021 PLR geometries
    -- 2021+ Wohnlage editions  (vintage >= 2021) → LOR 2021 PLR geometries
    -- Mirrors the vintage-cutoff rule from int_osm_poi_plr.
    -- Deterministic boundary tie-break: QUALIFY ROW_NUMBER() OVER (...) = 1
    -- ensures one PLR per address when a point falls on a shared boundary.
    joined as (
        select
            w.vintage,
            w.city_code,
            w.wohnlage,
            w.address_id,
            p.area_code,
            p.area_vintage
        from wohnlage as w
        inner join
            plr as p
            on st_within(w.geom, p.geom)
            and (
                (w.vintage <= 2020 and p.area_vintage = 'lor_pre2021')
                or (w.vintage >= 2021 and p.area_vintage = 'lor_2021')
            )
        -- Tie-break: when a point lands on a boundary shared by two PLRs, keep the
        -- PLR with the lexicographically smallest area_code (deterministic).
        qualify
            row_number() over (
                partition by w.address_id, w.vintage order by p.area_code
            )
            = 1
    ),

    -- Aggregate: count addresses per (vintage, PLR, wohnlage tier)
    aggregated as (
        select
            city_code,
            vintage,
            area_code,
            area_vintage,
            wohnlage,
            count(*) as n_addresses
        from joined
        group by city_code, vintage, area_code, area_vintage, wohnlage
    ),

    -- Total n per PLR-vintage (used for pct_wohnlage denominator and low-N flag)
    plr_vintage_total as (
        select
            city_code,
            vintage,
            area_code,
            area_vintage,
            sum(n_addresses) as total_n_addresses
        from aggregated
        group by city_code, vintage, area_code, area_vintage
    )

-- Final output: tier counts, shares, and wohnlage_low_n flag (geo condition 7).
-- pct_wohnlage: share of each tier within each PLR for each vintage year.
-- wohnlage_low_n: TRUE when the PLR-vintage has < 10 total address points.
-- Downstream: NULL wohnlage_score and estimated rent for low-N PLR-vintages.
select
    -- Normalise to canonical city code per ADR-0005; stg_berlin_wohnlage emits
    -- 'berlin'.
    case when a.city_code = 'berlin' then 'BER' else a.city_code end as city_code,
    a.vintage,
    a.area_code,
    a.area_vintage,
    a.wohnlage,
    a.n_addresses,
    -- Thesis §3.4: percentage of addresses in each Wohnlage tier per PLR
    cast(a.n_addresses as double) / nullif(t.total_n_addresses, 0) as pct_wohnlage,
    -- wohnlage_low_n flag (geo condition 7): TRUE when PLR-vintage has < 10 total
    -- addresses.
    -- Downstream consumers must NULL derived scalars (wohnlage_score, est_rent) for
    -- these PLRs.
    t.total_n_addresses < 10 as wohnlage_low_n
from aggregated as a
inner join
    plr_vintage_total as t
    on a.city_code = t.city_code
    and a.vintage = t.vintage
    and a.area_code = t.area_code
    and a.area_vintage = t.area_vintage
