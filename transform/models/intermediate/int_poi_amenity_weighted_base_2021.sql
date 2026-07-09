-- int_poi_amenity_weighted_base_2021.sql
-- OA-B.3 (#172): remaps int_poi_amenity_weighted_base to a unified LOR 2021 PLR
-- scheme for all Berlin snapshot years, mirroring int_poi_share_base_2021's
-- crosswalk (issue #63) so the improved-variant LAG window can compute a
-- non-NULL 2020->2021 delta.
--
-- Crosswalk strategy identical to int_poi_share_base_2021 (see that model's
-- header for the full rationale): lor_pre2021 rows (snapshot_year <= 2020) are
-- apportioned via seed_lor_crosswalk_2006_to_2021 (weight * count, an
-- extensive/count indicator, summed when multiple pre-2021 PLRs map to the
-- same 2021 PLR); all lor_2021 rows pass through unchanged.
--
-- berlin_amenity_weighted_total and amenity_weighted_share are recomputed after
-- aggregation (ratio recomputation is exact for counts, same as the unweighted
-- model). vacancy_weighted_count is remapped identically (also an extensive
-- count-like indicator).
--
-- Consumed exclusively by int_poi_status_dynamism_improved.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_poi_amenity_weighted_base') }}
-- depends_on: {{ ref('seed_lor_crosswalk_2006_to_2021') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    base as (select * from {{ ref("int_poi_amenity_weighted_base") }}),

    crosswalk as (
        select *
        from {{ ref("seed_lor_crosswalk_2006_to_2021") }}
        where mapping_type != 'stub'
    ),

    passthrough as (
        select
            city_code,
            area_code,
            area_vintage,
            snapshot_year,
            amenity_weighted_count,
            vacancy_weighted_count
        from base
        where area_vintage != 'lor_pre2021'
    ),

    lor_pre2021_mapped as (
        select
            base.city_code,
            cw.plr_id_2021 as area_code,
            'lor_2021' as area_vintage,
            base.snapshot_year,
            case
                when base.amenity_weighted_count is null
                then null
                else base.amenity_weighted_count * cw.weight
            end as amenity_weighted_count,
            case
                when base.vacancy_weighted_count is null
                then null
                else base.vacancy_weighted_count * cw.weight
            end as vacancy_weighted_count
        from base
        inner join crosswalk as cw on base.area_code = cw.plr_id_pre2021
        where base.area_vintage = 'lor_pre2021'
    ),

    combined as (
        select *
        from passthrough
        union all
        select *
        from lor_pre2021_mapped
    ),

    aggregated as (
        select
            city_code,
            area_code,
            area_vintage,
            snapshot_year,
            sum(amenity_weighted_count) as amenity_weighted_count,
            sum(vacancy_weighted_count) as vacancy_weighted_count
        from combined
        group by city_code, area_code, area_vintage, snapshot_year
    )

select
    city_code,
    area_code,
    area_vintage,
    snapshot_year,
    amenity_weighted_count,
    vacancy_weighted_count,
    sum(amenity_weighted_count) over (
        partition by city_code, snapshot_year, area_vintage
    ) as berlin_amenity_weighted_total,
    amenity_weighted_count
    * 1.0
    / nullif(
        sum(amenity_weighted_count) over (
            partition by city_code, snapshot_year, area_vintage
        ),
        0
    ) as amenity_weighted_share
from aggregated
