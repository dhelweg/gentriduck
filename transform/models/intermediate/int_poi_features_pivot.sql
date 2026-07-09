-- int_poi_features_pivot.sql
-- C4 intermediate: pivot fct_poi_development from long format to wide format.
-- One row per (city_code, area_code, area_vintage, snapshot_year) with one column
-- per POI category, one column per POI domain, one column per POI type, and a
-- total_poi_count summary column.
--
-- Source: fct_poi_development (C3-fact). Uses poi_domain_h / poi_category_h /
-- poi_type_h -- the full 3-level harmonised taxonomy from C2 harmonization.
-- Note (#140): fct_poi_development normalises Berlin's city_code to the
-- canonical 'BER' at aggregation time (fixed at the source); this model just
-- passes city_code through as-is.
--
-- OA-A.1 (#165, ADR-0017 D1): domain- and type-level pivots restore the columns
-- dropped at this model's flattening point (previously category-only). This is
-- a straightforward carry-through, not a new methodology decision: each level
-- is pivoted independently by conditional SUM(...) FILTER(WHERE <level>_h = '...')
-- on its own harmonized label, exactly mirroring the pre-existing
-- category-level pattern below -- no aggregation/weighting/normalization choice
-- is introduced. Column-name prefixes (poi_domain_<slug> / poi_<slug> /
-- poi_type_<slug>) are chosen to avoid collisions where the same label string
-- appears at more than one level (e.g. 'Office', 'Other', 'Vacancy' are each
-- both a domain and a category value in seed_poi_mapping.csv).
--
-- Value universe (R-C2 grounding: seed_poi_mapping.csv is the closed-world
-- taxonomy ingest_osm_history.py / ingest_hamburg_osm.py resolve every raw OSM
-- tag to -- a POI whose tag matches no (osm_key, osm_value) pair in that
-- mapping is dropped at ingestion, never written with a fallback label):
-- - Domain: all 13 distinct seed_poi_mapping.domain values.
-- - Type: all 163 distinct seed_poi_mapping.type values.
-- - Category: the pre-existing, hand-curated subset below (UNCHANGED by
-- this ticket -- additive only). Note this subset does not cover all 53
-- seed_poi_mapping.category values (a pre-existing gap, not introduced or
-- widened here); uncovered categories still count in total_poi_count.
-- int_osm_poi_harmonized's drift remap (seed_poi_canonical_category) can rarely
-- coalesce in a handful of differently-cased domain/category/type labels not
-- in seed_poi_mapping.csv; those POIs also still count in total_poi_count but
-- have no dedicated named column -- same "counted in the total, not in a named
-- column" pattern as the pre-existing category gap above.
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
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            poi_count
        from {{ ref("fct_poi_development") }}
    ),

    pivoted as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            -- Total POI count across all categories/domains/types (same total
            -- at every level -- each POI has exactly one domain, one category,
            -- one type, so this is not level-specific).
            sum(poi_count) as total_poi_count,

            -- OA-A.1 #165: domain-level pivot (13 harmonized domains).
            sum(poi_count) filter (
                where poi_domain_h = 'Entertainment'
            ) as poi_domain_entertainment,
            sum(poi_count) filter (
                where poi_domain_h = 'Gastronomy'
            ) as poi_domain_gastronomy,
            sum(poi_count) filter (
                where poi_domain_h = 'Mobility'
            ) as poi_domain_mobility,
            sum(poi_count) filter (where poi_domain_h = 'Office') as poi_domain_office,
            sum(poi_count) filter (where poi_domain_h = 'Other') as poi_domain_other,
            sum(poi_count) filter (
                where poi_domain_h = 'Public Service'
            ) as poi_domain_public_service,
            sum(poi_count) filter (
                where poi_domain_h = 'Public Space'
            ) as poi_domain_public_space,
            sum(poi_count) filter (
                where poi_domain_h = 'Religion'
            ) as poi_domain_religion,
            sum(poi_count) filter (where poi_domain_h = 'Retail') as poi_domain_retail,
            sum(poi_count) filter (
                where poi_domain_h = 'Services'
            ) as poi_domain_services,
            sum(poi_count) filter (
                where poi_domain_h = 'Sports and Recreation'
            ) as poi_domain_sports_and_recreation,
            sum(poi_count) filter (
                where poi_domain_h = 'Tourism'
            ) as poi_domain_tourism,
            sum(poi_count) filter (
                where poi_domain_h = 'Vacancy'
            ) as poi_domain_vacancy,

            -- Category-level pivot (pre-existing; UNCHANGED by OA-A.1 #165 --
            -- additive rule, see file header note on category coverage).
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
            sum(poi_count) filter (where poi_category_h = 'workspace') as poi_workspace,

            -- OA-A.1 #165: type-level pivot (163 harmonized types).
            sum(poi_count) filter (where poi_type_h = 'ATM') as poi_type_atm,
            sum(poi_count) filter (where poi_type_h = 'Art') as poi_type_art,
            sum(poi_count) filter (
                where poi_type_h = 'Art Center'
            ) as poi_type_art_center,
            sum(poi_count) filter (where poi_type_h = 'Artwork') as poi_type_artwork,
            sum(poi_count) filter (
                where poi_type_h = 'Asian Fast Food'
            ) as poi_type_asian_fast_food,
            sum(poi_count) filter (
                where poi_type_h = 'Asian Restaurant'
            ) as poi_type_asian_restaurant,
            sum(poi_count) filter (where poi_type_h = 'Bakery') as poi_type_bakery,
            sum(poi_count) filter (
                where poi_type_h = 'Bank Branch'
            ) as poi_type_bank_branch,
            sum(poi_count) filter (where poi_type_h = 'Bar') as poi_type_bar,
            sum(poi_count) filter (
                where poi_type_h = 'Barbecue Area'
            ) as poi_type_barbecue_area,
            sum(poi_count) filter (
                where poi_type_h = 'Basketball'
            ) as poi_type_basketball,
            sum(poi_count) filter (where poi_type_h = 'Beauty') as poi_type_beauty,
            sum(poi_count) filter (
                where poi_type_h = 'Beer Garden'
            ) as poi_type_beer_garden,
            sum(poi_count) filter (
                where poi_type_h = 'Beverages'
            ) as poi_type_beverages,
            sum(poi_count) filter (where poi_type_h = 'Bicycle') as poi_type_bicycle,
            sum(poi_count) filter (
                where poi_type_h = 'Bike Parking'
            ) as poi_type_bike_parking,
            sum(poi_count) filter (
                where poi_type_h = 'Bike Rental'
            ) as poi_type_bike_rental,
            sum(poi_count) filter (where poi_type_h = 'Books') as poi_type_books,
            sum(poi_count) filter (where poi_type_h = 'Boutique') as poi_type_boutique,
            sum(poi_count) filter (where poi_type_h = 'Brothel') as poi_type_brothel,
            sum(poi_count) filter (
                where poi_type_h = 'Burger Fast Food'
            ) as poi_type_burger_fast_food,
            sum(poi_count) filter (where poi_type_h = 'Butcher') as poi_type_butcher,
            sum(poi_count) filter (
                where poi_type_h = 'Candy Machine'
            ) as poi_type_candy_machine,
            sum(poi_count) filter (
                where poi_type_h = 'Car Dealership'
            ) as poi_type_car_dealership,
            sum(poi_count) filter (
                where poi_type_h = 'Car Rental'
            ) as poi_type_car_rental,
            sum(poi_count) filter (
                where poi_type_h = 'Car Repair'
            ) as poi_type_car_repair,
            sum(poi_count) filter (where poi_type_h = 'Cemetery') as poi_type_cemetery,
            sum(poi_count) filter (
                where poi_type_h = 'Charging Station'
            ) as poi_type_charging_station,
            sum(poi_count) filter (where poi_type_h = 'Church') as poi_type_church,
            sum(poi_count) filter (
                where poi_type_h = 'Cigarette Machine'
            ) as poi_type_cigarette_machine,
            sum(poi_count) filter (where poi_type_h = 'Cinema') as poi_type_cinema,
            sum(poi_count) filter (where poi_type_h = 'Clinic') as poi_type_clinic,
            sum(poi_count) filter (where poi_type_h = 'Clothing') as poi_type_clothing,
            sum(poi_count) filter (
                where poi_type_h = 'Clothing Container'
            ) as poi_type_clothing_container,
            sum(poi_count) filter (where poi_type_h = 'Coffee') as poi_type_coffee,
            sum(poi_count) filter (
                where poi_type_h = 'Community Center'
            ) as poi_type_community_center,
            sum(poi_count) filter (where poi_type_h = 'Computer') as poi_type_computer,
            sum(poi_count) filter (
                where poi_type_h = 'Condom Machine'
            ) as poi_type_condom_machine,
            sum(poi_count) filter (
                where poi_type_h = 'Copy Shop'
            ) as poi_type_copy_shop,
            sum(poi_count) filter (
                where poi_type_h = 'Coworking Space'
            ) as poi_type_coworking_space,
            sum(poi_count) filter (where poi_type_h = 'Daycare') as poi_type_daycare,
            sum(poi_count) filter (
                where poi_type_h = 'Decoration'
            ) as poi_type_decoration,
            sum(poi_count) filter (
                where poi_type_h = 'Delicatessen'
            ) as poi_type_delicatessen,
            sum(poi_count) filter (where poi_type_h = 'Dentist') as poi_type_dentist,
            sum(poi_count) filter (
                where poi_type_h = 'Discount Market'
            ) as poi_type_discount_market,
            sum(poi_count) filter (where poi_type_h = 'Doctor') as poi_type_doctor,
            sum(poi_count) filter (
                where poi_type_h = 'Dog Bag Dispenser'
            ) as poi_type_dog_bag_dispenser,
            sum(poi_count) filter (
                where poi_type_h = 'Drinks Machine'
            ) as poi_type_drinks_machine,
            sum(poi_count) filter (
                where poi_type_h = 'Drinks and Candy Machine'
            ) as poi_type_drinks_and_candy_machine,
            sum(poi_count) filter (
                where poi_type_h = 'Driving School'
            ) as poi_type_driving_school,
            sum(poi_count) filter (
                where poi_type_h = 'Drugstore'
            ) as poi_type_drugstore,
            sum(poi_count) filter (
                where poi_type_h = 'Dry Cleaning'
            ) as poi_type_dry_cleaning,
            sum(poi_count) filter (
                where poi_type_h = 'Electronics'
            ) as poi_type_electronics,
            sum(poi_count) filter (where poi_type_h = 'Embassy') as poi_type_embassy,
            sum(poi_count) filter (
                where poi_type_h = 'Fire Station'
            ) as poi_type_fire_station,
            sum(poi_count) filter (
                where poi_type_h = 'Fitness Center'
            ) as poi_type_fitness_center,
            sum(poi_count) filter (where poi_type_h = 'Florist') as poi_type_florist,
            sum(poi_count) filter (where poi_type_h = 'Football') as poi_type_football,
            sum(poi_count) filter (
                where poi_type_h = 'Fries Fast Food'
            ) as poi_type_fries_fast_food,
            sum(poi_count) filter (
                where poi_type_h = 'Funeral Home'
            ) as poi_type_funeral_home,
            sum(poi_count) filter (
                where poi_type_h = 'Furniture'
            ) as poi_type_furniture,
            sum(poi_count) filter (where poi_type_h = 'Gallery') as poi_type_gallery,
            sum(poi_count) filter (where poi_type_h = 'Gambling') as poi_type_gambling,
            sum(poi_count) filter (
                where poi_type_h = 'Gas Station'
            ) as poi_type_gas_station,
            sum(poi_count) filter (
                where poi_type_h = 'German Restaurant'
            ) as poi_type_german_restaurant,
            sum(poi_count) filter (where poi_type_h = 'Gifts') as poi_type_gifts,
            sum(poi_count) filter (
                where poi_type_h = 'Glass Container'
            ) as poi_type_glass_container,
            sum(poi_count) filter (
                where poi_type_h = 'Glass and Clothing Container'
            ) as poi_type_glass_and_clothing_container,
            sum(poi_count) filter (
                where poi_type_h = 'Greek Restaurant'
            ) as poi_type_greek_restaurant,
            sum(poi_count) filter (
                where poi_type_h = 'Hairdresser'
            ) as poi_type_hairdresser,
            sum(poi_count) filter (
                where poi_type_h = 'Hardware Store'
            ) as poi_type_hardware_store,
            sum(poi_count) filter (
                where poi_type_h = 'Hearing Aid'
            ) as poi_type_hearing_aid,
            sum(poi_count) filter (
                where poi_type_h = 'High School'
            ) as poi_type_high_school,
            sum(poi_count) filter (where poi_type_h = 'Hospital') as poi_type_hospital,
            sum(poi_count) filter (where poi_type_h = 'Hostel') as poi_type_hostel,
            sum(poi_count) filter (where poi_type_h = 'Hotel') as poi_type_hotel,
            sum(poi_count) filter (
                where poi_type_h = 'Ice Cream Shop'
            ) as poi_type_ice_cream_shop,
            sum(poi_count) filter (
                where poi_type_h = 'Indian Restaurant'
            ) as poi_type_indian_restaurant,
            sum(poi_count) filter (where poi_type_h = 'Info') as poi_type_info,
            sum(poi_count) filter (
                where poi_type_h = 'International Restaurant'
            ) as poi_type_international_restaurant,
            sum(poi_count) filter (
                where poi_type_h = 'Ironmonger'
            ) as poi_type_ironmonger,
            sum(poi_count) filter (
                where poi_type_h = 'Italian Restaurant'
            ) as poi_type_italian_restaurant,
            sum(poi_count) filter (where poi_type_h = 'Jewelry') as poi_type_jewelry,
            sum(poi_count) filter (
                where poi_type_h = 'Kebab Fast Food'
            ) as poi_type_kebab_fast_food,
            sum(poi_count) filter (
                where poi_type_h = 'Kindergarten'
            ) as poi_type_kindergarten,
            sum(poi_count) filter (where poi_type_h = 'Kiosk') as poi_type_kiosk,
            sum(poi_count) filter (
                where poi_type_h = 'Laundromat'
            ) as poi_type_laundromat,
            sum(poi_count) filter (where poi_type_h = 'Library') as poi_type_library,
            sum(poi_count) filter (where poi_type_h = 'Liquor') as poi_type_liquor,
            sum(poi_count) filter (
                where poi_type_h = 'Listed Building'
            ) as poi_type_listed_building,
            sum(poi_count) filter (where poi_type_h = 'Mailbox') as poi_type_mailbox,
            sum(poi_count) filter (
                where poi_type_h = 'Martial Arts'
            ) as poi_type_martial_arts,
            sum(poi_count) filter (where poi_type_h = 'Massage') as poi_type_massage,
            sum(poi_count) filter (where poi_type_h = 'Medical') as poi_type_medical,
            sum(poi_count) filter (where poi_type_h = 'Mobile') as poi_type_mobile,
            sum(poi_count) filter (where poi_type_h = 'Mosque') as poi_type_mosque,
            sum(poi_count) filter (where poi_type_h = 'Museum') as poi_type_museum,
            sum(poi_count) filter (
                where poi_type_h = 'Music School'
            ) as poi_type_music_school,
            sum(poi_count) filter (
                where poi_type_h = 'Newspaper'
            ) as poi_type_newspaper,
            sum(poi_count) filter (
                where poi_type_h = 'Nightclub'
            ) as poi_type_nightclub,
            sum(poi_count) filter (where poi_type_h = 'Office') as poi_type_office,
            sum(poi_count) filter (where poi_type_h = 'Optician') as poi_type_optician,
            sum(poi_count) filter (
                where poi_type_h = 'Other Accommodation'
            ) as poi_type_other_accommodation,
            sum(poi_count) filter (
                where poi_type_h = 'Other Area'
            ) as poi_type_other_area,
            sum(poi_count) filter (
                where poi_type_h = 'Other Building'
            ) as poi_type_other_building,
            sum(poi_count) filter (
                where poi_type_h = 'Other Cafes'
            ) as poi_type_other_cafes,
            sum(poi_count) filter (
                where poi_type_h = 'Other Container'
            ) as poi_type_other_container,
            sum(poi_count) filter (
                where poi_type_h = 'Other Fast Food'
            ) as poi_type_other_fast_food,
            sum(poi_count) filter (
                where poi_type_h = 'Other Monument'
            ) as poi_type_other_monument,
            sum(poi_count) filter (
                where poi_type_h = 'Other Recreation'
            ) as poi_type_other_recreation,
            sum(poi_count) filter (
                where poi_type_h = 'Other Restaurant'
            ) as poi_type_other_restaurant,
            sum(poi_count) filter (
                where poi_type_h = 'Other Shop'
            ) as poi_type_other_shop,
            sum(poi_count) filter (
                where poi_type_h = 'Other Sport'
            ) as poi_type_other_sport,
            sum(poi_count) filter (
                where poi_type_h = 'Other Sports'
            ) as poi_type_other_sports,
            sum(poi_count) filter (
                where poi_type_h = 'Other Temple'
            ) as poi_type_other_temple,
            sum(poi_count) filter (
                where poi_type_h = 'Other Tourism'
            ) as poi_type_other_tourism,
            sum(poi_count) filter (
                where poi_type_h = 'Other Vending Machine'
            ) as poi_type_other_vending_machine,
            sum(poi_count) filter (
                where poi_type_h = 'Parcel Locker'
            ) as poi_type_parcel_locker,
            sum(poi_count) filter (
                where poi_type_h = 'Park Bench'
            ) as poi_type_park_bench,
            sum(poi_count) filter (
                where poi_type_h = 'Parking Lot'
            ) as poi_type_parking_lot,
            sum(poi_count) filter (
                where poi_type_h = 'Parking Ticket Machine'
            ) as poi_type_parking_ticket_machine,
            sum(poi_count) filter (where poi_type_h = 'Pet Shop') as poi_type_pet_shop,
            sum(poi_count) filter (where poi_type_h = 'Pharmacy') as poi_type_pharmacy,
            sum(poi_count) filter (where poi_type_h = 'Phone') as poi_type_phone,
            sum(poi_count) filter (where poi_type_h = 'Photo') as poi_type_photo,
            sum(poi_count) filter (
                where poi_type_h = 'Pizza Fast Food'
            ) as poi_type_pizza_fast_food,
            sum(poi_count) filter (
                where poi_type_h = 'Playground'
            ) as poi_type_playground,
            sum(poi_count) filter (where poi_type_h = 'Police') as poi_type_police,
            sum(poi_count) filter (
                where poi_type_h = 'Post Office'
            ) as poi_type_post_office,
            sum(poi_count) filter (where poi_type_h = 'Pub') as poi_type_pub,
            sum(poi_count) filter (where poi_type_h = 'Sauna') as poi_type_sauna,
            sum(poi_count) filter (where poi_type_h = 'School') as poi_type_school,
            sum(poi_count) filter (
                where poi_type_h = 'Second Hand'
            ) as poi_type_second_hand,
            sum(poi_count) filter (where poi_type_h = 'Shoes') as poi_type_shoes,
            sum(poi_count) filter (
                where poi_type_h = 'Social Service'
            ) as poi_type_social_service,
            sum(poi_count) filter (where poi_type_h = 'Sports') as poi_type_sports,
            sum(poi_count) filter (
                where poi_type_h = 'Sports Center'
            ) as poi_type_sports_center,
            sum(poi_count) filter (
                where poi_type_h = 'Stamp Machine'
            ) as poi_type_stamp_machine,
            sum(poi_count) filter (
                where poi_type_h = 'Steakhouse'
            ) as poi_type_steakhouse,
            sum(poi_count) filter (where poi_type_h = 'Stop') as poi_type_stop,
            sum(poi_count) filter (
                where poi_type_h = 'Supermarket'
            ) as poi_type_supermarket,
            sum(poi_count) filter (
                where poi_type_h = 'Sushi Restaurant'
            ) as poi_type_sushi_restaurant,
            sum(poi_count) filter (where poi_type_h = 'Sweets') as poi_type_sweets,
            sum(poi_count) filter (where poi_type_h = 'Swimming') as poi_type_swimming,
            sum(poi_count) filter (
                where poi_type_h = 'Table Tennis'
            ) as poi_type_table_tennis,
            sum(poi_count) filter (where poi_type_h = 'Tailor') as poi_type_tailor,
            sum(poi_count) filter (
                where poi_type_h = 'Taxi Stand'
            ) as poi_type_taxi_stand,
            sum(poi_count) filter (where poi_type_h = 'Tennis') as poi_type_tennis,
            sum(poi_count) filter (
                where poi_type_h = 'Textile Shop'
            ) as poi_type_textile_shop,
            sum(poi_count) filter (where poi_type_h = 'Theater') as poi_type_theater,
            sum(poi_count) filter (
                where poi_type_h = 'Ticket Machine'
            ) as poi_type_ticket_machine,
            sum(poi_count) filter (where poi_type_h = 'Toilet') as poi_type_toilet,
            sum(poi_count) filter (where poi_type_h = 'Toys') as poi_type_toys,
            sum(poi_count) filter (
                where poi_type_h = 'Trash Can'
            ) as poi_type_trash_can,
            sum(poi_count) filter (where poi_type_h = 'Travel') as poi_type_travel,
            sum(poi_count) filter (
                where poi_type_h = 'Turkish Restaurant'
            ) as poi_type_turkish_restaurant,
            sum(poi_count) filter (
                where poi_type_h = 'University'
            ) as poi_type_university,
            sum(poi_count) filter (where poi_type_h = 'Vacancy') as poi_type_vacancy,
            sum(poi_count) filter (where poi_type_h = 'Vet') as poi_type_vet,
            sum(poi_count) filter (
                where poi_type_h = 'Viewpoint'
            ) as poi_type_viewpoint,
            sum(poi_count) filter (
                where poi_type_h = 'Water Sports'
            ) as poi_type_water_sports,
            sum(poi_count) filter (
                where poi_type_h = 'Weekly Market'
            ) as poi_type_weekly_market,
            sum(poi_count) filter (where poi_type_h = 'Zoo') as poi_type_zoo
        from poi
        group by city_code, snapshot_year, area_code, area_vintage
    )

select *
from pivoted
