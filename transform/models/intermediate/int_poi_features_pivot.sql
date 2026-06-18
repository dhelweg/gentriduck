-- int_poi_features_pivot.sql
-- C4 intermediate: pivot fct_poi_development from long format to wide format.
-- One row per (city_code, area_code, area_vintage, snapshot_year) with one column
-- per POI category and a total_poi_count summary column.
--
-- Source: fct_poi_development (C3-fact). Uses poi_category_h which is the
-- harmonised category key from the taxonomy (C2 harmonization).
-- Note: fct_poi_development uses city_code='berlin' (ingestion convention).
-- This model passes city_code through as-is; normalization happens in
-- int_gentrification_ts before joining with EWR data (city_code='BER').
--
-- Graceful degradation: returns zero rows when fct_poi_development has no rows
-- (OSM ingestion not yet run). Downstream models must handle zero rows.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('fct_poi_development') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    poi as (
        select
            city_code, snapshot_year, area_code, area_vintage, poi_category_h, poi_count
        from {{ ref("fct_poi_development") }}
    ),

    pivoted as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            -- Total POI count across all categories
            sum(poi_count) as total_poi_count,
            -- Individual category columns (conditional aggregation)
            sum(poi_count) filter (
                where poi_category_h = 'Accommodation'
            ) as poi_accommodation,
            sum(poi_count) filter (where poi_category_h = 'Art') as poi_art,
            sum(poi_count) filter (where poi_category_h = 'Bank') as poi_bank,
            sum(poi_count) filter (where poi_category_h = 'Bar') as poi_bar,
            sum(poi_count) filter (where poi_category_h = 'Beauty') as poi_beauty,
            sum(poi_count) filter (where poi_category_h = 'Bench') as poi_bench,
            sum(poi_count) filter (where poi_category_h = 'Cafe') as poi_cafe,
            sum(poi_count) filter (where poi_category_h = 'Cemetery') as poi_cemetery,
            sum(poi_count) filter (where poi_category_h = 'Clothing') as poi_clothing,
            sum(poi_count) filter (where poi_category_h = 'Culture') as poi_culture,
            sum(poi_count) filter (where poi_category_h = 'Drugstore') as poi_drugstore,
            sum(poi_count) filter (where poi_category_h = 'Education') as poi_education,
            sum(poi_count) filter (where poi_category_h = 'Fast Food') as poi_fast_food,
            sum(poi_count) filter (
                where poi_category_h = 'Food and Drink'
            ) as poi_food_and_drink,
            sum(poi_count) filter (where poi_category_h = 'Funeral') as poi_funeral,
            sum(poi_count) filter (
                where poi_category_h = 'Hairdresser'
            ) as poi_hairdresser,
            sum(poi_count) filter (where poi_category_h = 'Hardware') as poi_hardware,
            sum(poi_count) filter (where poi_category_h = 'Health') as poi_health,
            sum(poi_count) filter (
                where poi_category_h = 'Individual'
            ) as poi_individual,
            sum(poi_count) filter (where poi_category_h = 'Info') as poi_info,
            sum(poi_count) filter (where poi_category_h = 'Laundry') as poi_laundry,
            sum(poi_count) filter (where poi_category_h = 'Leisure') as poi_leisure,
            sum(poi_count) filter (where poi_category_h = 'Mail') as poi_mail,
            sum(poi_count) filter (where poi_category_h = 'Massage') as poi_massage,
            sum(poi_count) filter (where poi_category_h = 'Medical') as poi_medical,
            sum(poi_count) filter (where poi_category_h = 'Nightlife') as poi_nightlife,
            sum(poi_count) filter (where poi_category_h = 'Office') as poi_office,
            sum(poi_count) filter (where poi_category_h = 'Other') as poi_other,
            sum(poi_count) filter (
                where poi_category_h = 'Other Goods'
            ) as poi_other_goods,
            sum(poi_count) filter (where poi_category_h = 'Phone') as poi_phone,
            sum(poi_count) filter (where poi_category_h = 'Post') as poi_post,
            sum(poi_count) filter (where poi_category_h = 'Print') as poi_print,
            sum(poi_count) filter (
                where poi_category_h = 'Public Transport'
            ) as poi_public_transport,
            sum(poi_count) filter (
                where poi_category_h = 'Recreation'
            ) as poi_recreation,
            sum(poi_count) filter (where poi_category_h = 'Recycling') as poi_recycling,
            sum(poi_count) filter (
                where poi_category_h = 'Religious Buildings'
            ) as poi_religious_buildings,
            sum(poi_count) filter (
                where poi_category_h = 'Restaurant'
            ) as poi_restaurant,
            sum(poi_count) filter (where poi_category_h = 'Safety') as poi_safety,
            sum(poi_count) filter (where poi_category_h = 'Sights') as poi_sights,
            sum(poi_count) filter (where poi_category_h = 'Social') as poi_social,
            sum(poi_count) filter (where poi_category_h = 'Sport') as poi_sport,
            sum(poi_count) filter (where poi_category_h = 'Tech') as poi_tech,
            sum(poi_count) filter (where poi_category_h = 'Toilet') as poi_toilet,
            sum(poi_count) filter (
                where poi_category_h = 'Toys and Gifts'
            ) as poi_toys_and_gifts,
            sum(poi_count) filter (where poi_category_h = 'Travel') as poi_travel,
            sum(poi_count) filter (where poi_category_h = 'Vacancy') as poi_vacancy,
            sum(poi_count) filter (where poi_category_h = 'Workshop') as poi_workshop,
            sum(poi_count) filter (where poi_category_h = 'workspace') as poi_workspace
        from poi
        group by city_code, snapshot_year, area_code, area_vintage
    )

select *
from pivoted
