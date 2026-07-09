-- OA-A.3 (#167): staging -- golden 2018 oa_*/prev_oa_* columns, long format.
-- source: reference/goldens/20180909_result_full_plr.csv (ODbL), same file as
-- stg_thesis_2018_result_plr.sql -- 170 OA columns (85 oa_* current + 85
-- prev_oa_* lagged) retained here, one row per (PLR, thesis_oa_suffix) with
-- BOTH the current and lagged value as sibling columns (mirrors the thesis's
-- own oa_*/prev_oa_* column-pairing convention, thesis pp. 55-56 H1/H2).
--
-- Grain: (raum_id, thesis_oa_suffix) -- 436 PLRs x 85 suffixes = 37,060 rows
-- (dense: the golden CSV zero-fills every named OA column per PLR, so unlike
-- int_poi_offering_advantage's sparse leaf representation, every suffix has a
-- value here even when it is 0 -- see int_poi_offering_advantage.sql's
-- "Sparse representation" note; this asymmetry is exactly what
-- analysis/b_oa_validation.py (this ticket) must reconcile).
--
-- thesis_oa_suffix is the RAW thesis column suffix (e.g.
-- 'total_d_tourismus_stock', 'gastro_t_restaurant_italiener_stock') --
-- resolved to our (poi_domain_h, poi_category_h, poi_type_h, level) taxonomy
-- via seed_poi_thesis_taxonomy_crosswalk (a separate, reviewable crosswalk
-- seed; kept out of this purely-mechanical unpivot per single-responsibility --
-- structure here, semantics there).
--
-- raum_id / area_code: golden CSVs sometimes drop the PLR leading zero,
-- mirroring int_thesis_2018_area_index.sql's lpad(raum_id, 8, '0') convention
-- exactly, so this joins cleanly to fct_poi_development.area_code (BER,
-- area_vintage = 'lor_pre2021' -- the golden predates the 2021 LOR reform).
--
-- Explicit per-suffix SELECT/UNION ALL (not DuckDB UNPIVOT) -- 170 named
-- columns read individually so every one is visibly accounted for and the
-- 85-suffix list is the single static source shared, by construction, with
-- seed_poi_thesis_taxonomy_crosswalk.csv (both generated from the same golden
-- column inventory; a mismatch would 0-row-join downstream, not silently
-- drop data).
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{% set oa_suffixes = [
    "dl_c_beerdigung_stock",
    "dl_c_friseur_stock",
    "dl_c_kosmetik_und_beauty_stock",
    "dl_c_massage_stock",
    "dl_c_reisen_stock",
    "dl_c_waescherei_stock",
    "gastro_c_cafe_stock",
    "gastro_c_fast_food_stock",
    "gastro_c_restaurant_stock",
    "gastro_t_eisdiele_stock",
    "gastro_t_fast_food_sonstiges_stock",
    "gastro_t_fastfood_asiatisch_stock",
    "gastro_t_fastfood_burger_stock",
    "gastro_t_fastfood_kebap_stock",
    "gastro_t_fastfood_pizza_stock",
    "gastro_t_fastfood_pommesbude_stock",
    "gastro_t_kaffee_stock",
    "gastro_t_restaurant_asiatisch_stock",
    "gastro_t_restaurant_deutsch_stock",
    "gastro_t_restaurant_griechisch_stock",
    "gastro_t_restaurant_indisch_stock",
    "gastro_t_restaurant_international_stock",
    "gastro_t_restaurant_italiener_stock",
    "gastro_t_restaurant_sonstiges_stock",
    "gastro_t_restaurant_steakhouse_stock",
    "gastro_t_restaurant_sushi_stock",
    "gastro_t_restaurant_tuerkisch_stock",
    "gastro_t_sonstige_cafes_stock",
    "pubserv_c_bank_stock",
    "pubserv_c_bildung_stock",
    "pubserv_c_gesundheit_stock",
    "pubserv_c_sicherheit_stock",
    "pubserv_c_sonstiges_stock",
    "pubserv_c_sozial_stock",
    "sport_t_basketball_stock",
    "sport_t_fitnesszentrum_stock",
    "sport_t_fussball_stock",
    "sport_t_kampfsport_stock",
    "sport_t_sauna_stock",
    "sport_t_schwimmen_stock",
    "sport_t_sonstige_sportarten_stock",
    "sport_t_sonstiges_erholung_stock",
    "sport_t_sonstiges_sport_stock",
    "sport_t_spielplatz_stock",
    "sport_t_sportzentrum_stock",
    "sport_t_tennis_stock",
    "sport_t_tischtennis_stock",
    "sport_t_wassersport_stock",
    "total_d_buero_stock",
    "total_d_dienstleistung_stock",
    "total_d_gastronomie_stock",
    "total_d_leerstand_stock",
    "total_d_mobilitaet_stock",
    "total_d_oeffentlicher_raum_stock",
    "total_d_public_service_stock",
    "total_d_religion_stock",
    "total_d_sonstiges_stock",
    "total_d_sport_und_erholung_stock",
    "total_d_tourismus_stock",
    "total_d_vergnuegung_stock",
    "total_d_waren_stock",
    "vergnuegung_t_bar_stock",
    "vergnuegung_t_biergarten_stock",
    "vergnuegung_t_bordell_stock",
    "vergnuegung_t_gallerie_stock",
    "vergnuegung_t_kino_stock",
    "vergnuegung_t_kunstzentrum_stock",
    "vergnuegung_t_museum_stock",
    "vergnuegung_t_nachtclub_stock",
    "vergnuegung_t_pub_stock",
    "vergnuegung_t_spielothek_stock",
    "vergnuegung_t_theater_stock",
    "vergnuegung_t_zoo_stock",
    "waren_c_drogerie_stock",
    "waren_c_essen_und_trinken_stock",
    "waren_c_handwerk_stock",
    "waren_c_kleidung_stock",
    "waren_c_kunst_stock",
    "waren_c_medical_stock",
    "waren_c_print_stock",
    "waren_c_sonstige_waren_stock",
    "waren_c_sonstiger_shop_stock",
    "waren_c_spielzeug_und_geschenke_stock",
    "waren_c_technik_stock",
    "waren_c_werkstatt_stock"
] %}

with
    source as (
        select
            cast("r.raum_id" as varchar) as raum_id,
            lpad(cast("r.raum_id" as varchar), 8, '0') as area_code,
            cast("r.zeit" as integer) as zeit,
            cast("r.prev_zeit" as integer) as prev_zeit,
            cast("r.oa_dl_c_beerdigung_stock" as double) as oa_dl_c_beerdigung_stock,
            cast(
                "r.prev_oa_dl_c_beerdigung_stock" as double
            ) as prev_oa_dl_c_beerdigung_stock,
            cast("r.oa_dl_c_friseur_stock" as double) as oa_dl_c_friseur_stock,
            cast(
                "r.prev_oa_dl_c_friseur_stock" as double
            ) as prev_oa_dl_c_friseur_stock,
            cast(
                "r.oa_dl_c_kosmetik_und_beauty_stock" as double
            ) as oa_dl_c_kosmetik_und_beauty_stock,
            cast(
                "r.prev_oa_dl_c_kosmetik_und_beauty_stock" as double
            ) as prev_oa_dl_c_kosmetik_und_beauty_stock,
            cast("r.oa_dl_c_massage_stock" as double) as oa_dl_c_massage_stock,
            cast(
                "r.prev_oa_dl_c_massage_stock" as double
            ) as prev_oa_dl_c_massage_stock,
            cast("r.oa_dl_c_reisen_stock" as double) as oa_dl_c_reisen_stock,
            cast("r.prev_oa_dl_c_reisen_stock" as double) as prev_oa_dl_c_reisen_stock,
            cast("r.oa_dl_c_waescherei_stock" as double) as oa_dl_c_waescherei_stock,
            cast(
                "r.prev_oa_dl_c_waescherei_stock" as double
            ) as prev_oa_dl_c_waescherei_stock,
            cast("r.oa_gastro_c_cafe_stock" as double) as oa_gastro_c_cafe_stock,
            cast(
                "r.prev_oa_gastro_c_cafe_stock" as double
            ) as prev_oa_gastro_c_cafe_stock,
            cast(
                "r.oa_gastro_c_fast_food_stock" as double
            ) as oa_gastro_c_fast_food_stock,
            cast(
                "r.prev_oa_gastro_c_fast_food_stock" as double
            ) as prev_oa_gastro_c_fast_food_stock,
            cast(
                "r.oa_gastro_c_restaurant_stock" as double
            ) as oa_gastro_c_restaurant_stock,
            cast(
                "r.prev_oa_gastro_c_restaurant_stock" as double
            ) as prev_oa_gastro_c_restaurant_stock,
            cast(
                "r.oa_gastro_t_eisdiele_stock" as double
            ) as oa_gastro_t_eisdiele_stock,
            cast(
                "r.prev_oa_gastro_t_eisdiele_stock" as double
            ) as prev_oa_gastro_t_eisdiele_stock,
            cast(
                "r.oa_gastro_t_fast_food_sonstiges_stock" as double
            ) as oa_gastro_t_fast_food_sonstiges_stock,
            cast(
                "r.prev_oa_gastro_t_fast_food_sonstiges_stock" as double
            ) as prev_oa_gastro_t_fast_food_sonstiges_stock,
            cast(
                "r.oa_gastro_t_fastfood_asiatisch_stock" as double
            ) as oa_gastro_t_fastfood_asiatisch_stock,
            cast(
                "r.prev_oa_gastro_t_fastfood_asiatisch_stock" as double
            ) as prev_oa_gastro_t_fastfood_asiatisch_stock,
            cast(
                "r.oa_gastro_t_fastfood_burger_stock" as double
            ) as oa_gastro_t_fastfood_burger_stock,
            cast(
                "r.prev_oa_gastro_t_fastfood_burger_stock" as double
            ) as prev_oa_gastro_t_fastfood_burger_stock,
            cast(
                "r.oa_gastro_t_fastfood_kebap_stock" as double
            ) as oa_gastro_t_fastfood_kebap_stock,
            cast(
                "r.prev_oa_gastro_t_fastfood_kebap_stock" as double
            ) as prev_oa_gastro_t_fastfood_kebap_stock,
            cast(
                "r.oa_gastro_t_fastfood_pizza_stock" as double
            ) as oa_gastro_t_fastfood_pizza_stock,
            cast(
                "r.prev_oa_gastro_t_fastfood_pizza_stock" as double
            ) as prev_oa_gastro_t_fastfood_pizza_stock,
            cast(
                "r.oa_gastro_t_fastfood_pommesbude_stock" as double
            ) as oa_gastro_t_fastfood_pommesbude_stock,
            cast(
                "r.prev_oa_gastro_t_fastfood_pommesbude_stock" as double
            ) as prev_oa_gastro_t_fastfood_pommesbude_stock,
            cast("r.oa_gastro_t_kaffee_stock" as double) as oa_gastro_t_kaffee_stock,
            cast(
                "r.prev_oa_gastro_t_kaffee_stock" as double
            ) as prev_oa_gastro_t_kaffee_stock,
            cast(
                "r.oa_gastro_t_restaurant_asiatisch_stock" as double
            ) as oa_gastro_t_restaurant_asiatisch_stock,
            cast(
                "r.prev_oa_gastro_t_restaurant_asiatisch_stock" as double
            ) as prev_oa_gastro_t_restaurant_asiatisch_stock,
            cast(
                "r.oa_gastro_t_restaurant_deutsch_stock" as double
            ) as oa_gastro_t_restaurant_deutsch_stock,
            cast(
                "r.prev_oa_gastro_t_restaurant_deutsch_stock" as double
            ) as prev_oa_gastro_t_restaurant_deutsch_stock,
            cast(
                "r.oa_gastro_t_restaurant_griechisch_stock" as double
            ) as oa_gastro_t_restaurant_griechisch_stock,
            cast(
                "r.prev_oa_gastro_t_restaurant_griechisch_stock" as double
            ) as prev_oa_gastro_t_restaurant_griechisch_stock,
            cast(
                "r.oa_gastro_t_restaurant_indisch_stock" as double
            ) as oa_gastro_t_restaurant_indisch_stock,
            cast(
                "r.prev_oa_gastro_t_restaurant_indisch_stock" as double
            ) as prev_oa_gastro_t_restaurant_indisch_stock,
            cast(
                "r.oa_gastro_t_restaurant_international_stock" as double
            ) as oa_gastro_t_restaurant_international_stock,
            cast(
                "r.prev_oa_gastro_t_restaurant_international_stock" as double
            ) as prev_oa_gastro_t_restaurant_international_stock,
            cast(
                "r.oa_gastro_t_restaurant_italiener_stock" as double
            ) as oa_gastro_t_restaurant_italiener_stock,
            cast(
                "r.prev_oa_gastro_t_restaurant_italiener_stock" as double
            ) as prev_oa_gastro_t_restaurant_italiener_stock,
            cast(
                "r.oa_gastro_t_restaurant_sonstiges_stock" as double
            ) as oa_gastro_t_restaurant_sonstiges_stock,
            cast(
                "r.prev_oa_gastro_t_restaurant_sonstiges_stock" as double
            ) as prev_oa_gastro_t_restaurant_sonstiges_stock,
            cast(
                "r.oa_gastro_t_restaurant_steakhouse_stock" as double
            ) as oa_gastro_t_restaurant_steakhouse_stock,
            cast(
                "r.prev_oa_gastro_t_restaurant_steakhouse_stock" as double
            ) as prev_oa_gastro_t_restaurant_steakhouse_stock,
            cast(
                "r.oa_gastro_t_restaurant_sushi_stock" as double
            ) as oa_gastro_t_restaurant_sushi_stock,
            cast(
                "r.prev_oa_gastro_t_restaurant_sushi_stock" as double
            ) as prev_oa_gastro_t_restaurant_sushi_stock,
            cast(
                "r.oa_gastro_t_restaurant_tuerkisch_stock" as double
            ) as oa_gastro_t_restaurant_tuerkisch_stock,
            cast(
                "r.prev_oa_gastro_t_restaurant_tuerkisch_stock" as double
            ) as prev_oa_gastro_t_restaurant_tuerkisch_stock,
            cast(
                "r.oa_gastro_t_sonstige_cafes_stock" as double
            ) as oa_gastro_t_sonstige_cafes_stock,
            cast(
                "r.prev_oa_gastro_t_sonstige_cafes_stock" as double
            ) as prev_oa_gastro_t_sonstige_cafes_stock,
            cast("r.oa_pubserv_c_bank_stock" as double) as oa_pubserv_c_bank_stock,
            cast(
                "r.prev_oa_pubserv_c_bank_stock" as double
            ) as prev_oa_pubserv_c_bank_stock,
            cast(
                "r.oa_pubserv_c_bildung_stock" as double
            ) as oa_pubserv_c_bildung_stock,
            cast(
                "r.prev_oa_pubserv_c_bildung_stock" as double
            ) as prev_oa_pubserv_c_bildung_stock,
            cast(
                "r.oa_pubserv_c_gesundheit_stock" as double
            ) as oa_pubserv_c_gesundheit_stock,
            cast(
                "r.prev_oa_pubserv_c_gesundheit_stock" as double
            ) as prev_oa_pubserv_c_gesundheit_stock,
            cast(
                "r.oa_pubserv_c_sicherheit_stock" as double
            ) as oa_pubserv_c_sicherheit_stock,
            cast(
                "r.prev_oa_pubserv_c_sicherheit_stock" as double
            ) as prev_oa_pubserv_c_sicherheit_stock,
            cast(
                "r.oa_pubserv_c_sonstiges_stock" as double
            ) as oa_pubserv_c_sonstiges_stock,
            cast(
                "r.prev_oa_pubserv_c_sonstiges_stock" as double
            ) as prev_oa_pubserv_c_sonstiges_stock,
            cast("r.oa_pubserv_c_sozial_stock" as double) as oa_pubserv_c_sozial_stock,
            cast(
                "r.prev_oa_pubserv_c_sozial_stock" as double
            ) as prev_oa_pubserv_c_sozial_stock,
            cast(
                "r.oa_sport_t_basketball_stock" as double
            ) as oa_sport_t_basketball_stock,
            cast(
                "r.prev_oa_sport_t_basketball_stock" as double
            ) as prev_oa_sport_t_basketball_stock,
            cast(
                "r.oa_sport_t_fitnesszentrum_stock" as double
            ) as oa_sport_t_fitnesszentrum_stock,
            cast(
                "r.prev_oa_sport_t_fitnesszentrum_stock" as double
            ) as prev_oa_sport_t_fitnesszentrum_stock,
            cast("r.oa_sport_t_fussball_stock" as double) as oa_sport_t_fussball_stock,
            cast(
                "r.prev_oa_sport_t_fussball_stock" as double
            ) as prev_oa_sport_t_fussball_stock,
            cast(
                "r.oa_sport_t_kampfsport_stock" as double
            ) as oa_sport_t_kampfsport_stock,
            cast(
                "r.prev_oa_sport_t_kampfsport_stock" as double
            ) as prev_oa_sport_t_kampfsport_stock,
            cast("r.oa_sport_t_sauna_stock" as double) as oa_sport_t_sauna_stock,
            cast(
                "r.prev_oa_sport_t_sauna_stock" as double
            ) as prev_oa_sport_t_sauna_stock,
            cast(
                "r.oa_sport_t_schwimmen_stock" as double
            ) as oa_sport_t_schwimmen_stock,
            cast(
                "r.prev_oa_sport_t_schwimmen_stock" as double
            ) as prev_oa_sport_t_schwimmen_stock,
            cast(
                "r.oa_sport_t_sonstige_sportarten_stock" as double
            ) as oa_sport_t_sonstige_sportarten_stock,
            cast(
                "r.prev_oa_sport_t_sonstige_sportarten_stock" as double
            ) as prev_oa_sport_t_sonstige_sportarten_stock,
            cast(
                "r.oa_sport_t_sonstiges_erholung_stock" as double
            ) as oa_sport_t_sonstiges_erholung_stock,
            cast(
                "r.prev_oa_sport_t_sonstiges_erholung_stock" as double
            ) as prev_oa_sport_t_sonstiges_erholung_stock,
            cast(
                "r.oa_sport_t_sonstiges_sport_stock" as double
            ) as oa_sport_t_sonstiges_sport_stock,
            cast(
                "r.prev_oa_sport_t_sonstiges_sport_stock" as double
            ) as prev_oa_sport_t_sonstiges_sport_stock,
            cast(
                "r.oa_sport_t_spielplatz_stock" as double
            ) as oa_sport_t_spielplatz_stock,
            cast(
                "r.prev_oa_sport_t_spielplatz_stock" as double
            ) as prev_oa_sport_t_spielplatz_stock,
            cast(
                "r.oa_sport_t_sportzentrum_stock" as double
            ) as oa_sport_t_sportzentrum_stock,
            cast(
                "r.prev_oa_sport_t_sportzentrum_stock" as double
            ) as prev_oa_sport_t_sportzentrum_stock,
            cast("r.oa_sport_t_tennis_stock" as double) as oa_sport_t_tennis_stock,
            cast(
                "r.prev_oa_sport_t_tennis_stock" as double
            ) as prev_oa_sport_t_tennis_stock,
            cast(
                "r.oa_sport_t_tischtennis_stock" as double
            ) as oa_sport_t_tischtennis_stock,
            cast(
                "r.prev_oa_sport_t_tischtennis_stock" as double
            ) as prev_oa_sport_t_tischtennis_stock,
            cast(
                "r.oa_sport_t_wassersport_stock" as double
            ) as oa_sport_t_wassersport_stock,
            cast(
                "r.prev_oa_sport_t_wassersport_stock" as double
            ) as prev_oa_sport_t_wassersport_stock,
            cast("r.oa_total_d_buero_stock" as double) as oa_total_d_buero_stock,
            cast(
                "r.prev_oa_total_d_buero_stock" as double
            ) as prev_oa_total_d_buero_stock,
            cast(
                "r.oa_total_d_dienstleistung_stock" as double
            ) as oa_total_d_dienstleistung_stock,
            cast(
                "r.prev_oa_total_d_dienstleistung_stock" as double
            ) as prev_oa_total_d_dienstleistung_stock,
            cast(
                "r.oa_total_d_gastronomie_stock" as double
            ) as oa_total_d_gastronomie_stock,
            cast(
                "r.prev_oa_total_d_gastronomie_stock" as double
            ) as prev_oa_total_d_gastronomie_stock,
            cast(
                "r.oa_total_d_leerstand_stock" as double
            ) as oa_total_d_leerstand_stock,
            cast(
                "r.prev_oa_total_d_leerstand_stock" as double
            ) as prev_oa_total_d_leerstand_stock,
            cast(
                "r.oa_total_d_mobilitaet_stock" as double
            ) as oa_total_d_mobilitaet_stock,
            cast(
                "r.prev_oa_total_d_mobilitaet_stock" as double
            ) as prev_oa_total_d_mobilitaet_stock,
            cast(
                "r.oa_total_d_oeffentlicher_raum_stock" as double
            ) as oa_total_d_oeffentlicher_raum_stock,
            cast(
                "r.prev_oa_total_d_oeffentlicher_raum_stock" as double
            ) as prev_oa_total_d_oeffentlicher_raum_stock,
            cast(
                "r.oa_total_d_public_service_stock" as double
            ) as oa_total_d_public_service_stock,
            cast(
                "r.prev_oa_total_d_public_service_stock" as double
            ) as prev_oa_total_d_public_service_stock,
            cast("r.oa_total_d_religion_stock" as double) as oa_total_d_religion_stock,
            cast(
                "r.prev_oa_total_d_religion_stock" as double
            ) as prev_oa_total_d_religion_stock,
            cast(
                "r.oa_total_d_sonstiges_stock" as double
            ) as oa_total_d_sonstiges_stock,
            cast(
                "r.prev_oa_total_d_sonstiges_stock" as double
            ) as prev_oa_total_d_sonstiges_stock,
            cast(
                "r.oa_total_d_sport_und_erholung_stock" as double
            ) as oa_total_d_sport_und_erholung_stock,
            cast(
                "r.prev_oa_total_d_sport_und_erholung_stock" as double
            ) as prev_oa_total_d_sport_und_erholung_stock,
            cast(
                "r.oa_total_d_tourismus_stock" as double
            ) as oa_total_d_tourismus_stock,
            cast(
                "r.prev_oa_total_d_tourismus_stock" as double
            ) as prev_oa_total_d_tourismus_stock,
            cast(
                "r.oa_total_d_vergnuegung_stock" as double
            ) as oa_total_d_vergnuegung_stock,
            cast(
                "r.prev_oa_total_d_vergnuegung_stock" as double
            ) as prev_oa_total_d_vergnuegung_stock,
            cast("r.oa_total_d_waren_stock" as double) as oa_total_d_waren_stock,
            cast(
                "r.prev_oa_total_d_waren_stock" as double
            ) as prev_oa_total_d_waren_stock,
            cast(
                "r.oa_vergnuegung_t_bar_stock" as double
            ) as oa_vergnuegung_t_bar_stock,
            cast(
                "r.prev_oa_vergnuegung_t_bar_stock" as double
            ) as prev_oa_vergnuegung_t_bar_stock,
            cast(
                "r.oa_vergnuegung_t_biergarten_stock" as double
            ) as oa_vergnuegung_t_biergarten_stock,
            cast(
                "r.prev_oa_vergnuegung_t_biergarten_stock" as double
            ) as prev_oa_vergnuegung_t_biergarten_stock,
            cast(
                "r.oa_vergnuegung_t_bordell_stock" as double
            ) as oa_vergnuegung_t_bordell_stock,
            cast(
                "r.prev_oa_vergnuegung_t_bordell_stock" as double
            ) as prev_oa_vergnuegung_t_bordell_stock,
            cast(
                "r.oa_vergnuegung_t_gallerie_stock" as double
            ) as oa_vergnuegung_t_gallerie_stock,
            cast(
                "r.prev_oa_vergnuegung_t_gallerie_stock" as double
            ) as prev_oa_vergnuegung_t_gallerie_stock,
            cast(
                "r.oa_vergnuegung_t_kino_stock" as double
            ) as oa_vergnuegung_t_kino_stock,
            cast(
                "r.prev_oa_vergnuegung_t_kino_stock" as double
            ) as prev_oa_vergnuegung_t_kino_stock,
            cast(
                "r.oa_vergnuegung_t_kunstzentrum_stock" as double
            ) as oa_vergnuegung_t_kunstzentrum_stock,
            cast(
                "r.prev_oa_vergnuegung_t_kunstzentrum_stock" as double
            ) as prev_oa_vergnuegung_t_kunstzentrum_stock,
            cast(
                "r.oa_vergnuegung_t_museum_stock" as double
            ) as oa_vergnuegung_t_museum_stock,
            cast(
                "r.prev_oa_vergnuegung_t_museum_stock" as double
            ) as prev_oa_vergnuegung_t_museum_stock,
            cast(
                "r.oa_vergnuegung_t_nachtclub_stock" as double
            ) as oa_vergnuegung_t_nachtclub_stock,
            cast(
                "r.prev_oa_vergnuegung_t_nachtclub_stock" as double
            ) as prev_oa_vergnuegung_t_nachtclub_stock,
            cast(
                "r.oa_vergnuegung_t_pub_stock" as double
            ) as oa_vergnuegung_t_pub_stock,
            cast(
                "r.prev_oa_vergnuegung_t_pub_stock" as double
            ) as prev_oa_vergnuegung_t_pub_stock,
            cast(
                "r.oa_vergnuegung_t_spielothek_stock" as double
            ) as oa_vergnuegung_t_spielothek_stock,
            cast(
                "r.prev_oa_vergnuegung_t_spielothek_stock" as double
            ) as prev_oa_vergnuegung_t_spielothek_stock,
            cast(
                "r.oa_vergnuegung_t_theater_stock" as double
            ) as oa_vergnuegung_t_theater_stock,
            cast(
                "r.prev_oa_vergnuegung_t_theater_stock" as double
            ) as prev_oa_vergnuegung_t_theater_stock,
            cast(
                "r.oa_vergnuegung_t_zoo_stock" as double
            ) as oa_vergnuegung_t_zoo_stock,
            cast(
                "r.prev_oa_vergnuegung_t_zoo_stock" as double
            ) as prev_oa_vergnuegung_t_zoo_stock,
            cast("r.oa_waren_c_drogerie_stock" as double) as oa_waren_c_drogerie_stock,
            cast(
                "r.prev_oa_waren_c_drogerie_stock" as double
            ) as prev_oa_waren_c_drogerie_stock,
            cast(
                "r.oa_waren_c_essen_und_trinken_stock" as double
            ) as oa_waren_c_essen_und_trinken_stock,
            cast(
                "r.prev_oa_waren_c_essen_und_trinken_stock" as double
            ) as prev_oa_waren_c_essen_und_trinken_stock,
            cast("r.oa_waren_c_handwerk_stock" as double) as oa_waren_c_handwerk_stock,
            cast(
                "r.prev_oa_waren_c_handwerk_stock" as double
            ) as prev_oa_waren_c_handwerk_stock,
            cast("r.oa_waren_c_kleidung_stock" as double) as oa_waren_c_kleidung_stock,
            cast(
                "r.prev_oa_waren_c_kleidung_stock" as double
            ) as prev_oa_waren_c_kleidung_stock,
            cast("r.oa_waren_c_kunst_stock" as double) as oa_waren_c_kunst_stock,
            cast(
                "r.prev_oa_waren_c_kunst_stock" as double
            ) as prev_oa_waren_c_kunst_stock,
            cast("r.oa_waren_c_medical_stock" as double) as oa_waren_c_medical_stock,
            cast(
                "r.prev_oa_waren_c_medical_stock" as double
            ) as prev_oa_waren_c_medical_stock,
            cast("r.oa_waren_c_print_stock" as double) as oa_waren_c_print_stock,
            cast(
                "r.prev_oa_waren_c_print_stock" as double
            ) as prev_oa_waren_c_print_stock,
            cast(
                "r.oa_waren_c_sonstige_waren_stock" as double
            ) as oa_waren_c_sonstige_waren_stock,
            cast(
                "r.prev_oa_waren_c_sonstige_waren_stock" as double
            ) as prev_oa_waren_c_sonstige_waren_stock,
            cast(
                "r.oa_waren_c_sonstiger_shop_stock" as double
            ) as oa_waren_c_sonstiger_shop_stock,
            cast(
                "r.prev_oa_waren_c_sonstiger_shop_stock" as double
            ) as prev_oa_waren_c_sonstiger_shop_stock,
            cast(
                "r.oa_waren_c_spielzeug_und_geschenke_stock" as double
            ) as oa_waren_c_spielzeug_und_geschenke_stock,
            cast(
                "r.prev_oa_waren_c_spielzeug_und_geschenke_stock" as double
            ) as prev_oa_waren_c_spielzeug_und_geschenke_stock,
            cast("r.oa_waren_c_technik_stock" as double) as oa_waren_c_technik_stock,
            cast(
                "r.prev_oa_waren_c_technik_stock" as double
            ) as prev_oa_waren_c_technik_stock,
            cast(
                "r.oa_waren_c_werkstatt_stock" as double
            ) as oa_waren_c_werkstatt_stock,
            cast(
                "r.prev_oa_waren_c_werkstatt_stock" as double
            ) as prev_oa_waren_c_werkstatt_stock
        from
            read_csv(
                {{ source("thesis_2018", "result_full_plr") }},
                encoding = 'latin-1',
                auto_detect = true
            )
    ),

    unpivoted as (
        {% for suf in oa_suffixes %}
            select
                raum_id,
                area_code,
                zeit,
                prev_zeit,
                '{{ suf }}' as thesis_oa_suffix,
                oa_{{ suf }} as oa_value,
                prev_oa_{{ suf }} as prev_oa_value
            from source
            {% if not loop.last %}
                union all
            {% endif %}
        {% endfor %}
    )

select
    'BER' as city_code,
    'plr' as area_level,
    'lor_pre2021' as area_vintage,
    raum_id,
    area_code,
    zeit,
    prev_zeit,
    thesis_oa_suffix,
    oa_value,
    prev_oa_value
from unpivoted
