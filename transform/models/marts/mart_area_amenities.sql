-- mart_area_amenities.sql
-- I20 slice 1 (#252): a DISPLAY-ONLY mart answering a prospective mover's
-- actual questions -- what kind of food/retail scene dominates an area, is
-- everyday infrastructure present -- at PLR grain AND rolled up to the I18
-- geo-hierarchy levels (BZR, PGR, Bezirk), same shape as mart_area_demographics
-- (#243/I19).
--
-- NOT methodology-bearing in the R-C1 index sense: reads int_osm_poi_plr
-- (already a published, non-gated intermediate) read-only. Makes NO change to
-- any seed/weight/normalization on the R-C1 gated-file list, no change to
-- int_poi_status_dynamism / gentrification_index / seed_poi_offering_relevance.
-- `uv run poe build` node counts for those gated models are unchanged before/
-- after this ticket (confirmed at review) -- same identity-check class as I19's
-- mart_area_demographics.
--
-- Everyday-infrastructure counts (I20 SPEC's agreed tag list): School,
-- Kindergarten, Doctor, Dentist, Pharmacy, Supermarket, Playground, and
-- Stop (public_transport=station|stop_position / highway=bus_stop) --
-- poi_type_h values already ingested by C1 (ingest_osm_history.py); no schema
-- change needed for these (they predate I20).
--
-- Dominant gastro-type summary: `cuisine` is a NEW column (I20 #252) added to
-- the C1/H1 ingestor's OUTPUT_SCHEMA + threaded through stg_osm_poi ->
-- int_osm_poi_harmonized -> int_osm_poi_plr unchanged. Only re-extracted
-- snapshot years carry non-NULL cuisine (older parquet files predate the
-- column and resolve to NULL via read_parquet's union_by_name=true) --
-- dominant_cuisine intentionally reads whichever years have cuisine data;
-- gastro POIs without a cuisine tag (or from a pre-I20 snapshot) are excluded
-- from the numerator/denominator of the dominant-cuisine share, not coalesced
-- to a fake "unknown" bucket.
--
-- "Interestingness" thresholds (dominant cuisine only shown where the
-- underlying sample is large enough to be meaningful) are a CURATION-RULES
-- concern (I20 slice 2, #253, docs/epic-i/I20-poi-curation-rules.md) applied
-- in the web layer -- this mart exposes the full ranked cuisine breakdown
-- (gastro_poi_count as the sample-size denominator) so the web slice can apply
-- whatever n >= threshold rule the curation doc lands on, without re-querying
-- OSM data.
--
-- Bench-class / low-signal categories (I20's "stop spamming every area with
-- equally-weighted, uninteresting POI counts") are NOT modeled here at all --
-- this mart only ever surfaces the agreed everyday-infrastructure + gastro
-- summary; suppression of other categories from default web views is a
-- web-layer curation concern (I20 slice 2/3), not a data-shape decision.
--
-- Density/per-capita normalization (POIs per km2 or per 1,000 residents) is
-- explicitly deferred to a follow-up -- this v1 exposes raw counts only, to
-- keep this slice reviewable; the web slice can compute a simple district-
-- comparison ratio client-side from the raw counts already exposed here.
--
-- ROLLUP RULE: infra counts are extensive (SUM across constituent PLRs) --
-- same rule class as residents_total in mart_area_demographics (#243) and
-- int_mss_bzr_aggregate (#120). gastro POI counts (total + per-cuisine) are
-- likewise summed. dominant_cuisine / dominant_cuisine_share are RECOMPUTED
-- from the rolled-up per-cuisine sums at each level (never averaged from PLR-
-- level dominant shares) -- same "recompute from summed numerators, don't
-- average shares" discipline as I19's rollup.
--
-- LEVEL DERIVATION: LOR codes nest by string prefix (PLR 8-digit superset of
-- BZR 6-digit superset of PGR 4-digit superset of Bezirk 2-digit) -- same
-- substr()-based derivation as mart_area_demographics.sql / int_mss_bzr_aggregate.sql
-- (lpad to 8 chars first; some thesis-golden PLR codes drop a leading zero).
--
-- Grain: one row per (city_code, area_level, area_code, area_vintage,
-- snapshot_year). area_level in ('plr', 'bzr', 'pgr', 'bezirk').
-- Berlin only (city_code = 'BER') -- Hamburg parity deferred, same as I19.
--
-- Graceful degradation: returns zero rows when int_osm_poi_plr has no rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_osm_poi_plr') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    poi_base as (
        select
            -- QA-4 (#179) / ADR-0005: int_osm_poi_plr is one of the models the
            -- canonical_city_code() macro's own docstring names as still
            -- emitting the legacy lowercase 'berlin' -- normalise here so this
            -- mart's city_code matches every other mart's canonical 'BER'
            -- (same call as mart_poi_offering_advantage / fct_poi_development;
            -- this mart previously left it un-normalised, inconsistent with
            -- that precedent -- fixed at review).
            {{ canonical_city_code("city_code") }} as city_code,
            snapshot_year,
            lpad(area_code, 8, '0') as area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            cuisine
        from {{ ref("int_osm_poi_plr") }}
        -- int_osm_poi_plr is already Berlin-only by construction (joins to
        -- stg_berlin_lor); no separate city_code filter needed.
        where area_code is not null
    ),

    with_parents as (
        select
            *,
            substr(area_code, 1, 6) as bzr_code,
            substr(area_code, 1, 4) as pgr_code,
            substr(area_code, 1, 2) as bezirk_code
        from poi_base
    ),

    -- One row per POI-level flag so infra counts are a simple SUM at every level.
    flagged as (
        select
            *,
            case when poi_type_h = 'School' then 1 else 0 end as is_school,
            case when poi_type_h = 'Kindergarten' then 1 else 0 end as is_kindergarten,
            case when poi_type_h = 'Doctor' then 1 else 0 end as is_doctor,
            case when poi_type_h = 'Dentist' then 1 else 0 end as is_dentist,
            case when poi_type_h = 'Pharmacy' then 1 else 0 end as is_pharmacy,
            case when poi_type_h = 'Supermarket' then 1 else 0 end as is_supermarket,
            case when poi_type_h = 'Playground' then 1 else 0 end as is_playground,
            case when poi_type_h = 'Stop' then 1 else 0 end as is_transit_stop,
            case when poi_domain_h = 'Gastronomy' then 1 else 0 end as is_gastro,
            case
                when poi_domain_h = 'Gastronomy' and cuisine is not null then 1 else 0
            end as is_gastro_with_cuisine
        from with_parents
    ),

    -- Per-(level-code, cuisine) counts -- feeds dominant-cuisine selection at
    -- every rollup level via a single reusable ranking CTE below.
    cuisine_counts_plr as (
        select
            city_code,
            area_vintage,
            snapshot_year,
            area_code as level_code,
            'plr' as area_level,
            cuisine,
            count(*) as cuisine_count
        from flagged
        where is_gastro_with_cuisine = 1
        group by city_code, area_vintage, snapshot_year, area_code, cuisine
    ),
    cuisine_counts_bzr as (
        select
            city_code,
            area_vintage,
            snapshot_year,
            bzr_code as level_code,
            'bzr' as area_level,
            cuisine,
            count(*) as cuisine_count
        from flagged
        where is_gastro_with_cuisine = 1
        group by city_code, area_vintage, snapshot_year, bzr_code, cuisine
    ),
    cuisine_counts_pgr as (
        select
            city_code,
            area_vintage,
            snapshot_year,
            pgr_code as level_code,
            'pgr' as area_level,
            cuisine,
            count(*) as cuisine_count
        from flagged
        where is_gastro_with_cuisine = 1
        group by city_code, area_vintage, snapshot_year, pgr_code, cuisine
    ),
    cuisine_counts_bezirk as (
        select
            city_code,
            area_vintage,
            snapshot_year,
            bezirk_code as level_code,
            'bezirk' as area_level,
            cuisine,
            count(*) as cuisine_count
        from flagged
        where is_gastro_with_cuisine = 1
        group by city_code, area_vintage, snapshot_year, bezirk_code, cuisine
    ),
    cuisine_counts as (
        select *
        from cuisine_counts_plr
        union all
        select *
        from cuisine_counts_bzr
        union all
        select *
        from cuisine_counts_pgr
        union all
        select *
        from cuisine_counts_bezirk
    ),
    dominant_cuisine as (
        select
            city_code,
            area_vintage,
            snapshot_year,
            level_code,
            area_level,
            cuisine as dominant_cuisine,
            cuisine_count as dominant_cuisine_count
        from cuisine_counts
        qualify
            row_number() over (
                partition by
                    city_code, area_vintage, snapshot_year, level_code, area_level
                order by cuisine_count desc, cuisine asc
            )
            = 1
    ),

    infra_agg as (
        select
            city_code,
            area_vintage,
            snapshot_year,
            'plr' as area_level,
            area_code as level_code,
            sum(is_school) as n_schools,
            sum(is_kindergarten) as n_kindergartens,
            sum(is_doctor) as n_doctors,
            sum(is_dentist) as n_dentists,
            sum(is_pharmacy) as n_pharmacies,
            sum(is_supermarket) as n_supermarkets,
            sum(is_playground) as n_playgrounds,
            sum(is_transit_stop) as n_transit_stops,
            sum(is_gastro) as gastro_poi_count,
            sum(is_gastro_with_cuisine) as gastro_poi_with_cuisine_count
        from flagged
        group by city_code, area_vintage, snapshot_year, area_code
        union all
        select
            city_code,
            area_vintage,
            snapshot_year,
            'bzr' as area_level,
            bzr_code as level_code,
            sum(is_school) as n_schools,
            sum(is_kindergarten) as n_kindergartens,
            sum(is_doctor) as n_doctors,
            sum(is_dentist) as n_dentists,
            sum(is_pharmacy) as n_pharmacies,
            sum(is_supermarket) as n_supermarkets,
            sum(is_playground) as n_playgrounds,
            sum(is_transit_stop) as n_transit_stops,
            sum(is_gastro) as gastro_poi_count,
            sum(is_gastro_with_cuisine) as gastro_poi_with_cuisine_count
        from flagged
        group by city_code, area_vintage, snapshot_year, bzr_code
        union all
        select
            city_code,
            area_vintage,
            snapshot_year,
            'pgr' as area_level,
            pgr_code as level_code,
            sum(is_school) as n_schools,
            sum(is_kindergarten) as n_kindergartens,
            sum(is_doctor) as n_doctors,
            sum(is_dentist) as n_dentists,
            sum(is_pharmacy) as n_pharmacies,
            sum(is_supermarket) as n_supermarkets,
            sum(is_playground) as n_playgrounds,
            sum(is_transit_stop) as n_transit_stops,
            sum(is_gastro) as gastro_poi_count,
            sum(is_gastro_with_cuisine) as gastro_poi_with_cuisine_count
        from flagged
        group by city_code, area_vintage, snapshot_year, pgr_code
        union all
        select
            city_code,
            area_vintage,
            snapshot_year,
            'bezirk' as area_level,
            bezirk_code as level_code,
            sum(is_school) as n_schools,
            sum(is_kindergarten) as n_kindergartens,
            sum(is_doctor) as n_doctors,
            sum(is_dentist) as n_dentists,
            sum(is_pharmacy) as n_pharmacies,
            sum(is_supermarket) as n_supermarkets,
            sum(is_playground) as n_playgrounds,
            sum(is_transit_stop) as n_transit_stops,
            sum(is_gastro) as gastro_poi_count,
            sum(is_gastro_with_cuisine) as gastro_poi_with_cuisine_count
        from flagged
        group by city_code, area_vintage, snapshot_year, bezirk_code
    )

select
    ia.city_code,
    ia.area_level,
    ia.level_code as area_code,
    ia.area_vintage,
    ia.snapshot_year,
    ia.n_schools,
    ia.n_kindergartens,
    ia.n_doctors,
    ia.n_dentists,
    ia.n_pharmacies,
    ia.n_supermarkets,
    ia.n_playgrounds,
    ia.n_transit_stops,
    ia.gastro_poi_count,
    ia.gastro_poi_with_cuisine_count,
    dc.dominant_cuisine,
    dc.dominant_cuisine_count,
    dc.dominant_cuisine_count
    / nullif(ia.gastro_poi_with_cuisine_count, 0) as dominant_cuisine_share
from infra_agg as ia
left join
    dominant_cuisine as dc
    on ia.city_code = dc.city_code
    and ia.area_vintage = dc.area_vintage
    and ia.snapshot_year = dc.snapshot_year
    and ia.area_level = dc.area_level
    and ia.level_code = dc.level_code
