-- int_osm_poi_harmonized.sql
-- C2 — POI taxonomy harmonization: apply tag-schema drift remapping to OSM POI
-- snapshots.
--
-- Purpose: OSM tag conventions drift over time.  A feature that was tagged
-- `amenity=coworking_space` before 2018 should be treated as the canonical
-- `office=coworking` for cross-year comparability.  This model applies the
-- approved drift remapping from seed_poi_tag_drift and resolves each POI to
-- its canonical (poi_domain_h, poi_category_h, poi_type_h) classification.
--
-- Join design note (C2 implementation):
-- stg_osm_poi does NOT carry the raw OSM tag key/value.  The C1 ingestion
-- layer (ingest_osm_history.py) resolves raw tags to English labels at write
-- time, so poi_type in stg_osm_poi contains values like "Coworking Space",
-- "Bakery", "Supermarket" — not raw OSM values like "coworking_space".
-- The drift seed carries a stg_poi_type column that stores the English label
-- C1 writes for each drift tag; the join uses this column.  Drift rows where
-- stg_poi_type is empty (secondary-tag organic variants, and tags not yet in
-- the C1 poi_mapping) will never match stg_osm_poi rows with the current C1
-- output — this is correct behaviour; those rows are forward-looking drift
-- definitions that become active once C1 is extended to capture secondary tags.
--
-- craft=* namespace is not in C1 poi_mapping — flag PM for a follow-up ticket.
--
-- Provenance values:
-- 'drift_remap'  — poi_type matched exactly one non-ambiguous drift rule and
-- was remapped to its canonical classification.
-- 'ambiguous'    — poi_type matched more than one drift rule (should not
-- happen with the approved seed, but guarded explicitly).
-- 'native'       — no drift rule matched; original stg_osm_poi classification
-- is authoritative.
-- 'unmapped'     — poi_type matched a drift rule but the canonical_key/value
-- pair has no entry in seed_poi_canonical_category.  Treated
-- as native classification until the canonical seed is updated.
--
-- dbt_meta_owner: data-engineer
{{ config(materialized="view", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    source as (select * from {{ ref("stg_osm_poi") }}),

    drift as (
        select *
        from {{ ref("seed_poi_tag_drift") }}
        -- Only consider drift rules that have a stg_poi_type mapping (i.e. rows
        -- that C1 currently writes to parquet).  Rows with an empty stg_poi_type
        -- are forward-looking definitions and cannot match any current parquet row.
        where stg_poi_type is not null and trim(stg_poi_type) != ''
    ),

    canonical as (select * from {{ ref("seed_poi_canonical_category") }}),

    -- Count how many drift rules match each stg_poi_type so we can flag ambiguity.
    drift_match_count as (
        select stg_poi_type, count(*) as match_count from drift group by stg_poi_type
    ),

    joined as (
        select
            -- All original stg_osm_poi columns (unchanged)
            src.city_code,
            src.area_code,
            src.snapshot_year,
            src.osm_id,
            src.poi_domain,
            src.poi_category,
            src.poi_type,
            src.lon,
            src.lat,
            src.source_attribution,

            -- Drift and canonical columns (null when no match)
            drft.canonical_key,
            drft.canonical_value,
            drft.since_year as drift_since_year,
            drft.confidence as drift_confidence,
            dmc.match_count as drift_match_count,
            can.poi_domain as canonical_poi_domain,
            can.poi_category as canonical_poi_category,
            can.poi_type as canonical_poi_type,
            can.gentrification_proxy as canonical_gentrification_proxy

        from source as src
        left join drift as drft on src.poi_type = drft.stg_poi_type
        left join drift_match_count as dmc on src.poi_type = dmc.stg_poi_type
        left join
            canonical as can
            on drft.canonical_key = can.canonical_key
            and drft.canonical_value = can.canonical_value

        -- Dedup: if multiple drift rules match the same stg_poi_type (fan-out),
        -- keep the rule with the highest since_year. Future seed additions MUST
        -- ensure stg_poi_type is unique within high-confidence rules.
        qualify
            row_number() over (
                partition by src.snapshot_year, src.osm_id
                order by drft.since_year desc nulls last
            )
            = 1
    ),

    final as (
        select
            city_code,
            area_code,
            snapshot_year,
            osm_id,
            poi_domain,
            poi_category,
            poi_type,
            lon,
            lat,
            source_attribution,

            -- Harmonized classification columns
            coalesce(canonical_poi_domain, poi_domain) as poi_domain_h,
            coalesce(canonical_poi_category, poi_category) as poi_category_h,
            coalesce(canonical_poi_type, poi_type) as poi_type_h,

            -- Harmonization provenance
            case
                when canonical_key is null
                then 'native'
                when drift_match_count > 1
                then 'ambiguous'
                when canonical_poi_type is null
                then 'unmapped'
                else 'drift_remap'
            end as harmonization_provenance

        from joined
    )

select *
from final
