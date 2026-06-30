-- stg_berlin_mietspiegel_address_plr.sql
-- D1c (#56): PLR-level Wohnlage distribution derived from the Wohnlage WFS
-- address-point data spatially joined to LOR PLR polygons.
--
-- =============================================================================
-- R-C2 Methodology citations
-- =============================================================================
-- Thesis §3.4: Wohnlage residential quality tier composition per PLR is used as
-- the spatial price/rent quality signal for the gentrification analysis.  This
-- model aggregates per-address wohnlage assignments from the official Berlin
-- Mietspiegel Strassenverzeichnis WFS (via stg_berlin_wohnlage) to PLR level by
-- spatial containment (point-in-polygon), producing tier fractions and a dominant
-- wohnlage label.
--
-- Source (address points): WFS GDI Berlin, Wohnlagen nach Adressen zum Berliner
-- Mietspiegel. Feature type wohnlagenadr{year}:wohnlagenadr{year}.
-- URL pattern: https://gdi.berlin.de/services/wfs/wohnlagenadr{year}
-- CRS: EPSG:25833 (native). Licence: dl-de-zero-2.0.
-- Vintages: 2017, 2019, 2021, 2023, 2026.
--
-- Source (PLR polygons): stg_berlin_lor — GDI Berlin WFS, CC BY 3.0 DE.
-- Pre-2021: 448 PLRs (lor_pre2021); LOR 2021 reform: 542 PLRs (lor_2021).
--
-- =============================================================================
-- Methodology
-- =============================================================================
-- Spatial join: ST_Within(wohnlage_point, plr_polygon) — point-in-polygon.
-- Same predicate and vintage-alignment rule as int_berlin_wohnlage_plr:
-- vintage <= 2020 → area_vintage = 'lor_pre2021' (448 PLRs)
-- vintage >= 2021 → area_vintage = 'lor_2021'    (542 PLRs)
-- Both datasets are native EPSG:25833; no ST_Transform needed.
--
-- Deterministic boundary tie-break (mirrors int_berlin_wohnlage_plr):
-- QUALIFY ROW_NUMBER() OVER (PARTITION BY address_id, vintage ORDER BY area_code) = 1
-- ensures exactly one PLR per (address point, vintage) when a point falls on a
-- shared boundary.
--
-- Pivot: COUNT per (vintage, plr_area_code, wohnlage) is pivoted into three
-- fraction columns (einfach/mittel/gut).  wohnlage_dominant is the tier with
-- the highest address count; ties broken by the ordinal order gut > mittel >
-- einfach (higher quality wins the tie deterministically); 'mittel' is used as
-- a fallback when the PLR has zero address points.
--
-- Graceful degradation: if wohnlage parquets are missing (stg_berlin_wohnlage
-- returns zero rows) OR lor parquets are missing (stg_berlin_lor returns zero
-- rows), this model returns a zero-row typed stub so that uv run poe build
-- passes without ingested data.  Check via DuckDB glob() count, same pattern
-- as stg_berlin_wohnlage and int_osm_poi_plr.
--
-- Materialization: table (not view) — window function in the final SELECT causes
-- a DuckDB bind error when a view is referenced in an outer WHERE.  Same
-- workaround as int_berlin_wohnlage_plr and int_osm_poi_plr.
--
-- CRS: EPSG:25833 throughout.  No ST_Transform needed.
--
-- Output grain: (vintage, plr_area_code) — one row per PLR per wohnlage edition.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('stg_berlin_wohnlage') }}
-- depends_on: {{ ref('stg_berlin_lor') }}
{{
    config(
        materialized="table",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set wohnlage_glob = var("project_root") ~ "/data/raw/berlin/price_rent/wohnlage_*.parquet" %}
{% set lor_glob = var("project_root") ~ "/data/raw/berlin/lor/*.parquet" %}

{% if execute %}
    {%- set wl_result = run_query("SELECT count(*) FROM glob('" ~ wohnlage_glob ~ "')") -%}
    {%- set wl_file_count = wl_result.columns[0][0] -%}
    {%- set lor_result = run_query("SELECT count(*) FROM glob('" ~ lor_glob ~ "')") -%}
    {%- set lor_file_count = lor_result.columns[0][0] -%}
{% else %} {%- set wl_file_count = 0 -%} {%- set lor_file_count = 0 -%}
{% endif %}

{% if wl_file_count > 0 and lor_file_count > 0 %}

    -- Both Wohnlage and LOR data are available: perform the spatial join + pivot.
    with
        -- Wohnlage address points from staging (graceful: zero rows if parquets
        -- absent).
        -- Sanity: Berlin EPSG:25833 y in [5.79e6, 5.84e6] (geo condition 5 from D3
        -- sign-off).
        -- A point with y outside this range would indicate a coordinate-swap
        -- (WGS84 loaded as 25833); guard rejects such rows silently.
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
                -- stg_berlin_wohnlage stores geometry as MultiPoint WKB (native WFS
                -- type);
                -- ST_Centroid returns a Point regardless of geometry type, so ST_Y is
                -- safe here.
                and st_y(st_centroid(st_geomfromwkb(geometry_wkb)))
                between 5.79e6 and 5.84e6
        ),

        -- PLR geometries for both vintages from staging.
        plr as (
            select area_code, area_vintage, st_geomfromwkb(geometry_wkb) as geom
            from {{ ref("stg_berlin_lor") }}
            where geometry_wkb is not null
        ),

        -- Point-in-polygon spatial join with vintage alignment.
        -- vintage <= 2020 → lor_pre2021 PLR geometries (448 PLRs)
        -- vintage >= 2021 → lor_2021    PLR geometries (542 PLRs)
        -- Mirrors int_osm_poi_plr and int_berlin_wohnlage_plr vintage-cutoff rule.
        -- Deterministic boundary tie-break: QUALIFY ROW_NUMBER() = 1 ensures one PLR
        -- per (address_id, vintage) when a point lands on a shared boundary.
        joined as (
            select w.vintage, w.city_code, w.wohnlage, w.address_id, p.area_code
            from wohnlage as w
            inner join
                plr as p
                on st_within(w.geom, p.geom)
                and (
                    (w.vintage <= 2020 and p.area_vintage = 'lor_pre2021')
                    or (w.vintage >= 2021 and p.area_vintage = 'lor_2021')
                )
            -- Tie-break: keep the PLR with the lexicographically smallest area_code
            -- (deterministic; same rule as int_berlin_wohnlage_plr).
            qualify
                row_number() over (
                    partition by w.address_id, w.vintage order by p.area_code
                )
                = 1
        ),

        -- Aggregate: count addresses per (vintage, PLR, wohnlage tier).
        aggregated as (
            select
                vintage,
                city_code,
                area_code as plr_area_code,
                wohnlage,
                count(*) as n_addresses
            from joined
            group by vintage, city_code, area_code, wohnlage
        ),

        -- Total count per (vintage, PLR) for fraction denominator.
        totals as (
            select vintage, city_code, plr_area_code, sum(n_addresses) as total_n
            from aggregated
            group by vintage, city_code, plr_area_code
        ),

        -- Pivot: one row per (vintage, PLR) with three fraction columns.
        pivoted as (
            select
                t.vintage,
                t.city_code,
                t.plr_area_code,
                coalesce(
                    sum(case when a.wohnlage = 'einfach' then a.n_addresses else 0 end),
                    0
                ) as n_einfach,
                coalesce(
                    sum(case when a.wohnlage = 'mittel' then a.n_addresses else 0 end),
                    0
                ) as n_mittel,
                coalesce(
                    sum(case when a.wohnlage = 'gut' then a.n_addresses else 0 end), 0
                ) as n_gut,
                t.total_n
            from totals as t
            left join
                aggregated as a
                on t.vintage = a.vintage
                and t.city_code = a.city_code
                and t.plr_area_code = a.plr_area_code
            group by t.vintage, t.city_code, t.plr_area_code, t.total_n
        )

    -- Final output: fractions, dominant tier, address count, source attribution.
    -- wohnlage_dominant: tier with highest count; tie-break ordinal gut > mittel >
    -- einfach;
    -- 'mittel' as fallback when total_n = 0 (per issue spec).
    select
        vintage,
        -- Normalise to 'berlin' per ADR-0005; stg_berlin_wohnlage already emits
        -- 'berlin'.
        cast(city_code as varchar) as city_code,
        cast(plr_area_code as varchar) as plr_area_code,
        -- Thesis §3.4: fraction of addresses in each Wohnlage tier per PLR per edition.
        cast(
            case
                when total_n > 0 then cast(n_einfach as double) / total_n else 0.0
            end as double
        ) as wohnlage_einfach_frac,
        cast(
            case
                when total_n > 0 then cast(n_mittel as double) / total_n else 0.0
            end as double
        ) as wohnlage_mittel_frac,
        cast(
            case
                when total_n > 0 then cast(n_gut as double) / total_n else 0.0
            end as double
        ) as wohnlage_gut_frac,
        -- wohnlage_dominant: majority tier; tie-break: gut > mittel > einfach.
        -- 'mittel' as fallback for empty PLRs (total_n = 0).
        case
            when total_n = 0
            then 'mittel'
            when n_gut >= n_mittel and n_gut >= n_einfach
            then 'gut'
            when n_mittel >= n_einfach
            then 'mittel'
            else 'einfach'
        end as wohnlage_dominant,
        cast(total_n as bigint) as address_count,
        cast(
            'WFS GDI Berlin Wohnlagen nach Adressen zum Berliner Mietspiegel; '
            || 'Senatsverwaltung fuer Stadtentwicklung und Wohnen Berlin; '
            || 'Stichtag varies by vintage; dl-de-zero-2.0; '
            || 'LOR geometries: Geoportal Berlin / GDI Berlin, CC BY 3.0 DE' as varchar
        ) as source_attribution
    from pivoted

{% else %}

    -- Zero-row typed stub: wohnlage parquet files or LOR parquet files not found.
    -- Run ingestion to populate:
    -- Wohnlage: ingestion/berlin/price_rent/ingest_wohnlage.py
    -- LOR:      ingestion/berlin/lor/ingest_lor_geometries.py --out-dir
    -- data/raw/berlin/lor
    select
        cast(null as integer) as vintage,
        cast(null as varchar) as city_code,
        cast(null as varchar) as plr_area_code,
        cast(null as double) as wohnlage_einfach_frac,
        cast(null as double) as wohnlage_mittel_frac,
        cast(null as double) as wohnlage_gut_frac,
        cast(null as varchar) as wohnlage_dominant,
        cast(null as bigint) as address_count,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
