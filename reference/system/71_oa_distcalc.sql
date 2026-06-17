drop table osm_poi_oa_distcalc;
create table osm_poi_oa_distcalc as
select 
  d.planungsraum,
  d.timeslice,
	(coalesce(d_tourismus_stock,0) /
		(coalesce(d_tourismus_stock,0) + 
		coalesce(d_vergnuegung_stock,0) + 
		coalesce(d_sport_und_erholung_stock,0) + 
		coalesce(d_public_service_stock,0) + 
		coalesce(d_buero_stock,0) + 
		coalesce(d_mobilitaet_stock,0) + 
		coalesce(d_sonstiges_stock,0) + 
		coalesce(d_gastronomie_stock,0) + 
		coalesce(d_religion_stock,0) + 
		coalesce(d_oeffentlicher_raum_stock,0) + 
		coalesce(d_dienstleistung_stock,0) + 
		coalesce(d_waren_stock,0) + 
		coalesce(d_leerstand_stock,0))) * oa_helper_total_d_tourismus_stock
	as oa_total_d_tourismus_stock,
	(coalesce(d_vergnuegung_stock,0) /
		(coalesce(d_tourismus_stock,0) + 
		coalesce(d_vergnuegung_stock,0) + 
		coalesce(d_sport_und_erholung_stock,0) + 
		coalesce(d_public_service_stock,0) + 
		coalesce(d_buero_stock,0) + 
		coalesce(d_mobilitaet_stock,0) + 
		coalesce(d_sonstiges_stock,0) + 
		coalesce(d_gastronomie_stock,0) + 
		coalesce(d_religion_stock,0) + 
		coalesce(d_oeffentlicher_raum_stock,0) + 
		coalesce(d_dienstleistung_stock,0) + 
		coalesce(d_waren_stock,0) + 
		coalesce(d_leerstand_stock,0))) * oa_helper_total_d_vergnuegung_stock
	as oa_total_d_vergnuegung_stock,
	(coalesce(d_sport_und_erholung_stock,0) /
		(coalesce(d_tourismus_stock,0) + 
		coalesce(d_vergnuegung_stock,0) + 
		coalesce(d_sport_und_erholung_stock,0) + 
		coalesce(d_public_service_stock,0) + 
		coalesce(d_buero_stock,0) + 
		coalesce(d_mobilitaet_stock,0) + 
		coalesce(d_sonstiges_stock,0) + 
		coalesce(d_gastronomie_stock,0) + 
		coalesce(d_religion_stock,0) + 
		coalesce(d_oeffentlicher_raum_stock,0) + 
		coalesce(d_dienstleistung_stock,0) + 
		coalesce(d_waren_stock,0) + 
		coalesce(d_leerstand_stock,0))) * oa_helper_total_d_sport_und_erholung_stock
	as oa_total_d_sport_und_erholung_stock,
	(coalesce(d_public_service_stock,0) /
		(coalesce(d_tourismus_stock,0) + 
		coalesce(d_vergnuegung_stock,0) + 
		coalesce(d_sport_und_erholung_stock,0) + 
		coalesce(d_public_service_stock,0) + 
		coalesce(d_buero_stock,0) + 
		coalesce(d_mobilitaet_stock,0) + 
		coalesce(d_sonstiges_stock,0) + 
		coalesce(d_gastronomie_stock,0) + 
		coalesce(d_religion_stock,0) + 
		coalesce(d_oeffentlicher_raum_stock,0) + 
		coalesce(d_dienstleistung_stock,0) + 
		coalesce(d_waren_stock,0) + 
		coalesce(d_leerstand_stock,0))) * oa_helper_total_d_public_service_stock
	as oa_total_d_public_service_stock,
	(coalesce(d_buero_stock,0) /
		(coalesce(d_tourismus_stock,0) + 
		coalesce(d_vergnuegung_stock,0) + 
		coalesce(d_sport_und_erholung_stock,0) + 
		coalesce(d_public_service_stock,0) + 
		coalesce(d_buero_stock,0) + 
		coalesce(d_mobilitaet_stock,0) + 
		coalesce(d_sonstiges_stock,0) + 
		coalesce(d_gastronomie_stock,0) + 
		coalesce(d_religion_stock,0) + 
		coalesce(d_oeffentlicher_raum_stock,0) + 
		coalesce(d_dienstleistung_stock,0) + 
		coalesce(d_waren_stock,0) + 
		coalesce(d_leerstand_stock,0))) * oa_helper_total_d_buero_stock
	as oa_total_d_buero_stock,
	(coalesce(d_mobilitaet_stock,0) /
		(coalesce(d_tourismus_stock,0) + 
		coalesce(d_vergnuegung_stock,0) + 
		coalesce(d_sport_und_erholung_stock,0) + 
		coalesce(d_public_service_stock,0) + 
		coalesce(d_buero_stock,0) + 
		coalesce(d_mobilitaet_stock,0) + 
		coalesce(d_sonstiges_stock,0) + 
		coalesce(d_gastronomie_stock,0) + 
		coalesce(d_religion_stock,0) + 
		coalesce(d_oeffentlicher_raum_stock,0) + 
		coalesce(d_dienstleistung_stock,0) + 
		coalesce(d_waren_stock,0) + 
		coalesce(d_leerstand_stock,0))) * oa_helper_total_d_mobilitaet_stock
	as oa_total_d_mobilitaet_stock,
	(coalesce(d_sonstiges_stock,0) /
		(coalesce(d_tourismus_stock,0) + 
		coalesce(d_vergnuegung_stock,0) + 
		coalesce(d_sport_und_erholung_stock,0) + 
		coalesce(d_public_service_stock,0) + 
		coalesce(d_buero_stock,0) + 
		coalesce(d_mobilitaet_stock,0) + 
		coalesce(d_sonstiges_stock,0) + 
		coalesce(d_gastronomie_stock,0) + 
		coalesce(d_religion_stock,0) + 
		coalesce(d_oeffentlicher_raum_stock,0) + 
		coalesce(d_dienstleistung_stock,0) + 
		coalesce(d_waren_stock,0) + 
		coalesce(d_leerstand_stock,0))) * oa_helper_total_d_sonstiges_stock
	as oa_total_d_sonstiges_stock,
	(coalesce(d_gastronomie_stock,0) /
		(coalesce(d_tourismus_stock,0) + 
		coalesce(d_vergnuegung_stock,0) + 
		coalesce(d_sport_und_erholung_stock,0) + 
		coalesce(d_public_service_stock,0) + 
		coalesce(d_buero_stock,0) + 
		coalesce(d_mobilitaet_stock,0) + 
		coalesce(d_sonstiges_stock,0) + 
		coalesce(d_gastronomie_stock,0) + 
		coalesce(d_religion_stock,0) + 
		coalesce(d_oeffentlicher_raum_stock,0) + 
		coalesce(d_dienstleistung_stock,0) + 
		coalesce(d_waren_stock,0) + 
		coalesce(d_leerstand_stock,0))) * oa_helper_total_d_gastronomie_stock
	as oa_total_d_gastronomie_stock,
	(coalesce(d_religion_stock,0) /
		(coalesce(d_tourismus_stock,0) + 
		coalesce(d_vergnuegung_stock,0) + 
		coalesce(d_sport_und_erholung_stock,0) + 
		coalesce(d_public_service_stock,0) + 
		coalesce(d_buero_stock,0) + 
		coalesce(d_mobilitaet_stock,0) + 
		coalesce(d_sonstiges_stock,0) + 
		coalesce(d_gastronomie_stock,0) + 
		coalesce(d_religion_stock,0) + 
		coalesce(d_oeffentlicher_raum_stock,0) + 
		coalesce(d_dienstleistung_stock,0) + 
		coalesce(d_waren_stock,0) + 
		coalesce(d_leerstand_stock,0))) * oa_helper_total_d_religion_stock
	as oa_total_d_religion_stock,
	(coalesce(d_oeffentlicher_raum_stock,0) /
		(coalesce(d_tourismus_stock,0) + 
		coalesce(d_vergnuegung_stock,0) + 
		coalesce(d_sport_und_erholung_stock,0) + 
		coalesce(d_public_service_stock,0) + 
		coalesce(d_buero_stock,0) + 
		coalesce(d_mobilitaet_stock,0) + 
		coalesce(d_sonstiges_stock,0) + 
		coalesce(d_gastronomie_stock,0) + 
		coalesce(d_religion_stock,0) + 
		coalesce(d_oeffentlicher_raum_stock,0) + 
		coalesce(d_dienstleistung_stock,0) + 
		coalesce(d_waren_stock,0) + 
		coalesce(d_leerstand_stock,0))) * oa_helper_total_d_oeffentlicher_raum_stock
	as oa_total_d_oeffentlicher_raum_stock,
	(coalesce(d_dienstleistung_stock,0) /
		(coalesce(d_tourismus_stock,0) + 
		coalesce(d_vergnuegung_stock,0) + 
		coalesce(d_sport_und_erholung_stock,0) + 
		coalesce(d_public_service_stock,0) + 
		coalesce(d_buero_stock,0) + 
		coalesce(d_mobilitaet_stock,0) + 
		coalesce(d_sonstiges_stock,0) + 
		coalesce(d_gastronomie_stock,0) + 
		coalesce(d_religion_stock,0) + 
		coalesce(d_oeffentlicher_raum_stock,0) + 
		coalesce(d_dienstleistung_stock,0) + 
		coalesce(d_waren_stock,0) + 
		coalesce(d_leerstand_stock,0))) * oa_helper_total_d_dienstleistung_stock
	as oa_total_d_dienstleistung_stock,
	(coalesce(d_waren_stock,0) /
		(coalesce(d_tourismus_stock,0) + 
		coalesce(d_vergnuegung_stock,0) + 
		coalesce(d_sport_und_erholung_stock,0) + 
		coalesce(d_public_service_stock,0) + 
		coalesce(d_buero_stock,0) + 
		coalesce(d_mobilitaet_stock,0) + 
		coalesce(d_sonstiges_stock,0) + 
		coalesce(d_gastronomie_stock,0) + 
		coalesce(d_religion_stock,0) + 
		coalesce(d_oeffentlicher_raum_stock,0) + 
		coalesce(d_dienstleistung_stock,0) + 
		coalesce(d_waren_stock,0) + 
		coalesce(d_leerstand_stock,0))) * oa_helper_total_d_waren_stock
	as oa_total_d_waren_stock,
	(coalesce(d_leerstand_stock,0) /
		(coalesce(d_tourismus_stock,0) + 
		coalesce(d_vergnuegung_stock,0) + 
		coalesce(d_sport_und_erholung_stock,0) + 
		coalesce(d_public_service_stock,0) + 
		coalesce(d_buero_stock,0) + 
		coalesce(d_mobilitaet_stock,0) + 
		coalesce(d_sonstiges_stock,0) + 
		coalesce(d_gastronomie_stock,0) + 
		coalesce(d_religion_stock,0) + 
		coalesce(d_oeffentlicher_raum_stock,0) + 
		coalesce(d_dienstleistung_stock,0) + 
		coalesce(d_waren_stock,0) + 
		coalesce(d_leerstand_stock,0))) * oa_helper_total_d_leerstand_stock
	as oa_total_d_leerstand_stock,
	(c_fast_food_stock / d_gastronomie_stock     ) * oa_helper_gastro_c_fast_food_stock      as oa_gastro_c_fast_food_stock,     
	(c_restaurant_stock / d_gastronomie_stock    ) * oa_helper_gastro_c_restaurant_stock     as oa_gastro_c_restaurant_stock,       
	(c_cafe_stock / d_gastronomie_stock          ) * oa_helper_gastro_c_cafe_stock           as oa_gastro_c_cafe_stock,      
	(t_restaurant_italiener_stock / d_gastronomie_stock     ) * oa_helper_gastro_t_restaurant_italiener_stock     as oa_gastro_t_restaurant_italiener_stock,     
	(t_restaurant_deutsch_stock / d_gastronomie_stock       ) * oa_helper_gastro_t_restaurant_deutsch_stock       as oa_gastro_t_restaurant_deutsch_stock,       
	(t_restaurant_indisch_stock / d_gastronomie_stock       ) * oa_helper_gastro_t_restaurant_indisch_stock       as oa_gastro_t_restaurant_indisch_stock,       
	(t_restaurant_asiatisch_stock / d_gastronomie_stock     ) * oa_helper_gastro_t_restaurant_asiatisch_stock     as oa_gastro_t_restaurant_asiatisch_stock,     
	(t_restaurant_sushi_stock / d_gastronomie_stock         ) * oa_helper_gastro_t_restaurant_sushi_stock         as oa_gastro_t_restaurant_sushi_stock,         
	(t_restaurant_griechisch_stock / d_gastronomie_stock    ) * oa_helper_gastro_t_restaurant_griechisch_stock    as oa_gastro_t_restaurant_griechisch_stock,    
	(t_restaurant_steakhouse_stock / d_gastronomie_stock    ) * oa_helper_gastro_t_restaurant_steakhouse_stock    as oa_gastro_t_restaurant_steakhouse_stock,    
	(t_restaurant_international_stock / d_gastronomie_stock ) * oa_helper_gastro_t_restaurant_international_stock as oa_gastro_t_restaurant_international_stock, 
	(t_restaurant_tuerkisch_stock / d_gastronomie_stock     ) * oa_helper_gastro_t_restaurant_tuerkisch_stock     as oa_gastro_t_restaurant_tuerkisch_stock,     
	(t_restaurant_sonstiges_stock / d_gastronomie_stock     ) * oa_helper_gastro_t_restaurant_sonstiges_stock     as oa_gastro_t_restaurant_sonstiges_stock,     
	(t_eisdiele_stock / d_gastronomie_stock                 ) * oa_helper_gastro_t_eisdiele_stock                 as oa_gastro_t_eisdiele_stock,                 
	(t_sonstige_cafes_stock / d_gastronomie_stock           ) * oa_helper_gastro_t_sonstige_cafes_stock           as oa_gastro_t_sonstige_cafes_stock,           
	(t_kaffee_stock / d_gastronomie_stock                   ) * oa_helper_gastro_t_kaffee_stock                   as oa_gastro_t_kaffee_stock,                   
	(t_fastfood_kebap_stock / d_gastronomie_stock           ) * oa_helper_gastro_t_fastfood_kebap_stock           as oa_gastro_t_fastfood_kebap_stock,           
	(t_fastfood_burger_stock / d_gastronomie_stock          ) * oa_helper_gastro_t_fastfood_burger_stock          as oa_gastro_t_fastfood_burger_stock,          
	(t_fastfood_asiatisch_stock / d_gastronomie_stock       ) * oa_helper_gastro_t_fastfood_asiatisch_stock       as oa_gastro_t_fastfood_asiatisch_stock,       
	(t_fastfood_pizza_stock / d_gastronomie_stock           ) * oa_helper_gastro_t_fastfood_pizza_stock           as oa_gastro_t_fastfood_pizza_stock,           
	(t_fastfood_pommesbude_stock / d_gastronomie_stock      ) * oa_helper_gastro_t_fastfood_pommesbude_stock      as oa_gastro_t_fastfood_pommesbude_stock,      
	(t_fast_food_sonstiges_stock / d_gastronomie_stock      ) * oa_helper_gastro_t_fast_food_sonstiges_stock      as oa_gastro_t_fast_food_sonstiges_stock,   
	(c_friseur_stock             / d_dienstleistung_stock ) * oa_helper_dl_c_friseur_stock               as    oa_dl_c_friseur_stock                 ,
	(c_kosmetik_und_beauty_stock / d_dienstleistung_stock ) * oa_helper_dl_c_kosmetik_und_beauty_stock   as    oa_dl_c_kosmetik_und_beauty_stock     ,
	(c_massage_stock             / d_dienstleistung_stock ) * oa_helper_dl_c_massage_stock               as    oa_dl_c_massage_stock                 ,
	(c_reisen_stock              / d_dienstleistung_stock ) * oa_helper_dl_c_reisen_stock                as    oa_dl_c_reisen_stock                  ,
	(c_waescherei_stock          / d_dienstleistung_stock ) * oa_helper_dl_c_waescherei_stock            as    oa_dl_c_waescherei_stock              ,
	(c_beerdigung_stock          / d_dienstleistung_stock ) * oa_helper_dl_c_beerdigung_stock            as    oa_dl_c_beerdigung_stock              ,
	(c_bildung_stock      / d_public_service_stock ) * oa_helper_pubserv_c_bildung_stock      as  oa_pubserv_c_bildung_stock        ,
	(c_sicherheit_stock   / d_public_service_stock ) * oa_helper_pubserv_c_sicherheit_stock   as  oa_pubserv_c_sicherheit_stock     ,
	(c_sonstiges_stock    / d_public_service_stock ) * oa_helper_pubserv_c_sonstiges_stock    as  oa_pubserv_c_sonstiges_stock      ,
	(c_sozial_stock       / d_public_service_stock ) * oa_helper_pubserv_c_sozial_stock       as  oa_pubserv_c_sozial_stock         ,
	(c_gesundheit_stock   / d_public_service_stock ) * oa_helper_pubserv_c_gesundheit_stock   as  oa_pubserv_c_gesundheit_stock     ,
	(c_bank_stock         / d_public_service_stock ) * oa_helper_pubserv_c_bank_stock         as  oa_pubserv_c_bank_stock           ,
	(c_essen_und_trinken_stock        / d_waren_stock ) *  oa_helper_waren_c_essen_und_trinken_stock          as  oa_waren_c_essen_und_trinken_stock       ,
	(c_kleidung_stock                 / d_waren_stock ) *  oa_helper_waren_c_kleidung_stock                   as  oa_waren_c_kleidung_stock                ,
	(c_sonstige_waren_stock           / d_waren_stock ) *  oa_helper_waren_c_sonstige_waren_stock             as  oa_waren_c_sonstige_waren_stock          ,
	(c_werkstatt_stock                / d_waren_stock ) *  oa_helper_waren_c_werkstatt_stock                  as  oa_waren_c_werkstatt_stock               ,
	(c_medical_stock                  / d_waren_stock ) *  oa_helper_waren_c_medical_stock                    as  oa_waren_c_medical_stock                 ,
	(c_print_stock                    / d_waren_stock ) *  oa_helper_waren_c_print_stock                      as  oa_waren_c_print_stock                   ,
	(c_drogerie_stock                 / d_waren_stock ) *  oa_helper_waren_c_drogerie_stock                   as  oa_waren_c_drogerie_stock                ,
	(c_technik_stock                  / d_waren_stock ) *  oa_helper_waren_c_technik_stock                    as  oa_waren_c_technik_stock                 ,
	(c_spielzeug_und_geschenke_stock  / d_waren_stock ) *  oa_helper_waren_c_spielzeug_und_geschenke_stock    as  oa_waren_c_spielzeug_und_geschenke_stock ,
	(c_kunst_stock                    / d_waren_stock ) *  oa_helper_waren_c_kunst_stock                      as  oa_waren_c_kunst_stock                   ,
	(c_handwerk_stock                 / d_waren_stock ) *  oa_helper_waren_c_handwerk_stock                   as  oa_waren_c_handwerk_stock                ,
	(c_sonstiger_shop_stock           / d_waren_stock ) *  oa_helper_waren_c_sonstiger_shop_stock             as  oa_waren_c_sonstiger_shop_stock          ,
	(t_kunstzentrum_stock  /  d_vergnuegung_stock ) * oa_helper_vergnuegung_t_kunstzentrum_stock   as oa_vergnuegung_t_kunstzentrum_stock  ,
	(t_gallerie_stock      /  d_vergnuegung_stock ) * oa_helper_vergnuegung_t_gallerie_stock       as oa_vergnuegung_t_gallerie_stock      ,
	(t_museum_stock        /  d_vergnuegung_stock ) * oa_helper_vergnuegung_t_museum_stock         as oa_vergnuegung_t_museum_stock        ,
	(t_zoo_stock           /  d_vergnuegung_stock ) * oa_helper_vergnuegung_t_zoo_stock            as oa_vergnuegung_t_zoo_stock           ,
	(t_spielothek_stock    /  d_vergnuegung_stock ) * oa_helper_vergnuegung_t_spielothek_stock     as oa_vergnuegung_t_spielothek_stock    ,
	(t_kino_stock          /  d_vergnuegung_stock ) * oa_helper_vergnuegung_t_kino_stock           as oa_vergnuegung_t_kino_stock          ,
	(t_biergarten_stock    /  d_vergnuegung_stock ) * oa_helper_vergnuegung_t_biergarten_stock     as oa_vergnuegung_t_biergarten_stock    ,
	(t_theater_stock       /  d_vergnuegung_stock ) * oa_helper_vergnuegung_t_theater_stock        as oa_vergnuegung_t_theater_stock       ,
	(t_nachtclub_stock     /  d_vergnuegung_stock ) * oa_helper_vergnuegung_t_nachtclub_stock      as oa_vergnuegung_t_nachtclub_stock     ,
	(t_bordell_stock       /  d_vergnuegung_stock ) * oa_helper_vergnuegung_t_bordell_stock        as oa_vergnuegung_t_bordell_stock       ,
	(t_bar_stock           /  d_vergnuegung_stock ) * oa_helper_vergnuegung_t_bar_stock            as oa_vergnuegung_t_bar_stock           ,
	(t_pub_stock           /  d_vergnuegung_stock ) * oa_helper_vergnuegung_t_pub_stock            as oa_vergnuegung_t_pub_stock           ,
	(t_schwimmen_stock            / d_sport_und_erholung_stock ) * oa_helper_sport_t_schwimmen_stock              as oa_sport_t_schwimmen_stock          ,
	(t_basketball_stock           / d_sport_und_erholung_stock ) * oa_helper_sport_t_basketball_stock             as oa_sport_t_basketball_stock         ,
	(t_fussball_stock             / d_sport_und_erholung_stock ) * oa_helper_sport_t_fussball_stock               as oa_sport_t_fussball_stock           ,
	(t_sportzentrum_stock         / d_sport_und_erholung_stock ) * oa_helper_sport_t_sportzentrum_stock           as oa_sport_t_sportzentrum_stock       ,
	(t_tischtennis_stock          / d_sport_und_erholung_stock ) * oa_helper_sport_t_tischtennis_stock            as oa_sport_t_tischtennis_stock        ,
	(t_sauna_stock                / d_sport_und_erholung_stock ) * oa_helper_sport_t_sauna_stock                  as oa_sport_t_sauna_stock              ,
	(t_tennis_stock               / d_sport_und_erholung_stock ) * oa_helper_sport_t_tennis_stock                 as oa_sport_t_tennis_stock             ,
	(t_kampfsport_stock           / d_sport_und_erholung_stock ) * oa_helper_sport_t_kampfsport_stock             as oa_sport_t_kampfsport_stock         ,
	(t_fitnesszentrum_stock       / d_sport_und_erholung_stock ) * oa_helper_sport_t_fitnesszentrum_stock         as oa_sport_t_fitnesszentrum_stock     ,
	(t_spielplatz_stock           / d_sport_und_erholung_stock ) * oa_helper_sport_t_spielplatz_stock             as oa_sport_t_spielplatz_stock         ,
	(t_wassersport_stock          / d_sport_und_erholung_stock ) * oa_helper_sport_t_wassersport_stock            as oa_sport_t_wassersport_stock        ,
	(t_sonstige_sportarten_stock  / d_sport_und_erholung_stock ) * oa_helper_sport_t_sonstige_sportarten_stock    as oa_sport_t_sonstige_sportarten_stock,
	(t_sonstiges_sport_stock      / d_sport_und_erholung_stock ) * oa_helper_sport_t_sonstiges_sport_stock        as oa_sport_t_sonstiges_sport_stock    ,
	(t_sonstiges_erholung_stock   / d_sport_und_erholung_stock ) * oa_helper_sport_t_sonstiges_erholung_stock     as oa_sport_t_sonstiges_erholung_stock 
	from osm_poi_features_domain_piv_distcalc d
left join osm_poi_features_category_piv_distcalc c
	on d.timeslice = c.timeslice
	and cast(d.planungsraum as int) = cast(c.planungsraum as int)
left join osm_poi_features_type_piv_distcalc t
	on d.timeslice = t.timeslice
	and cast(d.planungsraum as int) = cast(t.planungsraum as int)
left join osm_poi_oa_helper_distcalc oah
	on d.timeslice = oah.timeslice
where d.planungsraum is not null
;