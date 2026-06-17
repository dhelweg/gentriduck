drop view osm_poi_oa_helper_distcalc;
create view osm_poi_oa_helper_distcalc as
select 
  d.timeslice,
	sum(coalesce(d_tourismus_stock,0) + 
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
		coalesce(d_leerstand_stock,0)) / sum(d_tourismus_stock)
	as oa_helper_total_d_tourismus_stock,
	sum(coalesce(d_tourismus_stock,0) + 
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
		coalesce(d_leerstand_stock,0)) / sum(d_vergnuegung_stock) 
	as oa_helper_total_d_vergnuegung_stock,
	sum(coalesce(d_tourismus_stock,0) + 
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
		coalesce(d_leerstand_stock,0)) / sum(d_sport_und_erholung_stock) 
	as oa_helper_total_d_sport_und_erholung_stock,
	sum(coalesce(d_tourismus_stock,0) + 
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
		coalesce(d_leerstand_stock,0)) / sum(d_public_service_stock)
	as oa_helper_total_d_public_service_stock,
	sum(coalesce(d_tourismus_stock,0) + 
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
		coalesce(d_leerstand_stock,0)) / sum(d_buero_stock) 
	as oa_helper_total_d_buero_stock,
	sum(coalesce(d_tourismus_stock,0) + 
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
		coalesce(d_leerstand_stock,0)) / sum(d_mobilitaet_stock) 
	as oa_helper_total_d_mobilitaet_stock,
	sum(coalesce(d_tourismus_stock,0) + 
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
		coalesce(d_leerstand_stock,0)) / sum(d_sonstiges_stock) 
	as oa_helper_total_d_sonstiges_stock,
	sum(coalesce(d_tourismus_stock,0) + 
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
		coalesce(d_leerstand_stock,0)) / sum(d_gastronomie_stock) 
	as oa_helper_total_d_gastronomie_stock,
	sum(coalesce(d_tourismus_stock,0) + 
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
		coalesce(d_leerstand_stock,0)) / sum(d_religion_stock) 
	as oa_helper_total_d_religion_stock,
	sum(coalesce(d_tourismus_stock,0) + 
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
		coalesce(d_leerstand_stock,0)) / sum(d_oeffentlicher_raum_stock) 
	as oa_helper_total_d_oeffentlicher_raum_stock,
	sum(coalesce(d_tourismus_stock,0) + 
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
		coalesce(d_leerstand_stock,0)) / sum(d_dienstleistung_stock) 
	as oa_helper_total_d_dienstleistung_stock,
	sum(coalesce(d_tourismus_stock,0) + 
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
		coalesce(d_leerstand_stock,0)) / sum(d_waren_stock) 
	as oa_helper_total_d_waren_stock,
	sum(coalesce(d_tourismus_stock,0) + 
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
		coalesce(d_leerstand_stock,0)) / sum(d_leerstand_stock) 
	as oa_helper_total_d_leerstand_stock,
	( sum(coalesce(d_public_service_stock,0)) / sum(coalesce(c_bildung_stock     ,0)))  as oa_helper_pubserv_c_bildung_stock       ,
	( sum(coalesce(d_public_service_stock,0)) / sum(coalesce(c_sicherheit_stock  ,0)))  as oa_helper_pubserv_c_sicherheit_stock    ,
	( sum(coalesce(d_public_service_stock,0)) / sum(coalesce(c_sonstiges_stock   ,0)))  as oa_helper_pubserv_c_sonstiges_stock     ,
	( sum(coalesce(d_public_service_stock,0)) / sum(coalesce(c_sozial_stock      ,0)))  as oa_helper_pubserv_c_sozial_stock        ,
	( sum(coalesce(d_public_service_stock,0)) / sum(coalesce(c_gesundheit_stock  ,0)))  as oa_helper_pubserv_c_gesundheit_stock    ,
	( sum(coalesce(d_public_service_stock,0)) / sum(coalesce(c_bank_stock        ,0)))  as oa_helper_pubserv_c_bank_stock          ,
	( sum(coalesce(d_dienstleistung_stock,0)) / sum(coalesce(c_friseur_stock             	  ,0)))  as oa_helper_dl_c_friseur_stock               ,
	( sum(coalesce(d_dienstleistung_stock,0)) / sum(coalesce(c_kosmetik_und_beauty_stock 	  ,0)))  as oa_helper_dl_c_kosmetik_und_beauty_stock   ,
	( sum(coalesce(d_dienstleistung_stock,0)) / sum(coalesce(c_massage_stock             	  ,0)))  as oa_helper_dl_c_massage_stock               ,
	( sum(coalesce(d_dienstleistung_stock,0)) / sum(coalesce(c_reisen_stock              	  ,0)))  as oa_helper_dl_c_reisen_stock                ,
	( sum(coalesce(d_dienstleistung_stock,0)) / sum(coalesce(c_waescherei_stock          	  ,0)))  as oa_helper_dl_c_waescherei_stock            ,
	( sum(coalesce(d_dienstleistung_stock,0)) / sum(coalesce(c_beerdigung_stock          	  ,0)))  as oa_helper_dl_c_beerdigung_stock            ,	
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(c_fast_food_stock   ,0)))  as oa_helper_gastro_c_fast_food_stock         ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(c_restaurant_stock  ,0)))  as oa_helper_gastro_c_restaurant_stock        ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(c_cafe_stock        ,0)))  as oa_helper_gastro_c_cafe_stock              ,	
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_restaurant_italiener_stock      ,0)))  as oa_helper_gastro_t_restaurant_italiener_stock      ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_restaurant_deutsch_stock        ,0)))  as oa_helper_gastro_t_restaurant_deutsch_stock        ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_restaurant_indisch_stock        ,0)))  as oa_helper_gastro_t_restaurant_indisch_stock        ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_restaurant_asiatisch_stock      ,0)))  as oa_helper_gastro_t_restaurant_asiatisch_stock      ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_restaurant_sushi_stock          ,0)))  as oa_helper_gastro_t_restaurant_sushi_stock          ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_restaurant_griechisch_stock     ,0)))  as oa_helper_gastro_t_restaurant_griechisch_stock     ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_restaurant_steakhouse_stock     ,0)))  as oa_helper_gastro_t_restaurant_steakhouse_stock     ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_restaurant_international_stock  ,0)))  as oa_helper_gastro_t_restaurant_international_stock  ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_restaurant_tuerkisch_stock      ,0)))  as oa_helper_gastro_t_restaurant_tuerkisch_stock      ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_restaurant_sonstiges_stock      ,0)))  as oa_helper_gastro_t_restaurant_sonstiges_stock      ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_eisdiele_stock                  ,0)))  as oa_helper_gastro_t_eisdiele_stock                  ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_sonstige_cafes_stock            ,0)))  as oa_helper_gastro_t_sonstige_cafes_stock            ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_kaffee_stock                    ,0)))  as oa_helper_gastro_t_kaffee_stock                    ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_fastfood_kebap_stock            ,0)))  as oa_helper_gastro_t_fastfood_kebap_stock            ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_fastfood_burger_stock           ,0)))  as oa_helper_gastro_t_fastfood_burger_stock           ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_fastfood_asiatisch_stock        ,0)))  as oa_helper_gastro_t_fastfood_asiatisch_stock        ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_fastfood_pizza_stock            ,0)))  as oa_helper_gastro_t_fastfood_pizza_stock            ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_fastfood_pommesbude_stock       ,0)))  as oa_helper_gastro_t_fastfood_pommesbude_stock       ,
	( sum(coalesce(d_gastronomie_stock,0)) / sum(coalesce(t_fast_food_sonstiges_stock       ,0)))  as oa_helper_gastro_t_fast_food_sonstiges_stock       ,
	( sum(coalesce(d_waren_stock,0)) / sum(coalesce(c_essen_und_trinken_stock        ,0)))  as oa_helper_waren_c_essen_und_trinken_stock       ,
	( sum(coalesce(d_waren_stock,0)) / sum(coalesce(c_kleidung_stock                 ,0)))  as oa_helper_waren_c_kleidung_stock                ,
	( sum(coalesce(d_waren_stock,0)) / sum(coalesce(c_sonstige_waren_stock           ,0)))  as oa_helper_waren_c_sonstige_waren_stock          ,
	( sum(coalesce(d_waren_stock,0)) / sum(coalesce(c_werkstatt_stock                ,0)))  as oa_helper_waren_c_werkstatt_stock               ,
	( sum(coalesce(d_waren_stock,0)) / sum(coalesce(c_medical_stock                  ,0)))  as oa_helper_waren_c_medical_stock                 ,
	( sum(coalesce(d_waren_stock,0)) / sum(coalesce(c_print_stock                    ,0)))  as oa_helper_waren_c_print_stock                   ,
	( sum(coalesce(d_waren_stock,0)) / sum(coalesce(c_drogerie_stock                 ,0)))  as oa_helper_waren_c_drogerie_stock                ,
	( sum(coalesce(d_waren_stock,0)) / sum(coalesce(c_technik_stock                  ,0)))  as oa_helper_waren_c_technik_stock                 ,
	( sum(coalesce(d_waren_stock,0)) / sum(coalesce(c_spielzeug_und_geschenke_stock  ,0)))  as oa_helper_waren_c_spielzeug_und_geschenke_stock ,
	( sum(coalesce(d_waren_stock,0)) / sum(coalesce(c_kunst_stock                    ,0)))  as oa_helper_waren_c_kunst_stock                   ,
	( sum(coalesce(d_waren_stock,0)) / sum(coalesce(c_handwerk_stock                 ,0)))  as oa_helper_waren_c_handwerk_stock                ,
	( sum(coalesce(d_waren_stock,0)) / sum(coalesce(c_sonstiger_shop_stock           ,0)))  as oa_helper_waren_c_sonstiger_shop_stock          ,
	( sum(coalesce(d_vergnuegung_stock,0)) / sum(coalesce(t_kunstzentrum_stock ,0)))  as oa_helper_vergnuegung_t_kunstzentrum_stock ,   
	( sum(coalesce(d_vergnuegung_stock,0)) / sum(coalesce(t_gallerie_stock     ,0)))  as oa_helper_vergnuegung_t_gallerie_stock     ,
	( sum(coalesce(d_vergnuegung_stock,0)) / sum(coalesce(t_museum_stock       ,0)))  as oa_helper_vergnuegung_t_museum_stock       ,
	( sum(coalesce(d_vergnuegung_stock,0)) / sum(coalesce(t_zoo_stock          ,0)))  as oa_helper_vergnuegung_t_zoo_stock          ,
	( sum(coalesce(d_vergnuegung_stock,0)) / sum(coalesce(t_spielothek_stock   ,0)))  as oa_helper_vergnuegung_t_spielothek_stock   , 
	( sum(coalesce(d_vergnuegung_stock,0)) / sum(coalesce(t_kino_stock         ,0)))  as oa_helper_vergnuegung_t_kino_stock         ,
	( sum(coalesce(d_vergnuegung_stock,0)) / sum(coalesce(t_biergarten_stock   ,0)))  as oa_helper_vergnuegung_t_biergarten_stock   , 
	( sum(coalesce(d_vergnuegung_stock,0)) / sum(coalesce(t_theater_stock      ,0)))  as oa_helper_vergnuegung_t_theater_stock      ,
	( sum(coalesce(d_vergnuegung_stock,0)) / sum(coalesce(t_nachtclub_stock    ,0)))  as oa_helper_vergnuegung_t_nachtclub_stock    ,
	( sum(coalesce(d_vergnuegung_stock,0)) / sum(coalesce(t_bordell_stock      ,0)))  as oa_helper_vergnuegung_t_bordell_stock      ,
	( sum(coalesce(d_vergnuegung_stock,0)) / sum(coalesce(t_bar_stock          ,0)))  as oa_helper_vergnuegung_t_bar_stock          ,
	( sum(coalesce(d_vergnuegung_stock,0)) / sum(coalesce(t_pub_stock          ,0)))  as oa_helper_vergnuegung_t_pub_stock          ,
	( sum(coalesce(d_sport_und_erholung_stock,0)) / sum(coalesce(t_schwimmen_stock            ,0)))  as oa_helper_sport_t_schwimmen_stock            ,
	( sum(coalesce(d_sport_und_erholung_stock,0)) / sum(coalesce(t_basketball_stock           ,0)))  as oa_helper_sport_t_basketball_stock           ,
	( sum(coalesce(d_sport_und_erholung_stock,0)) / sum(coalesce(t_fussball_stock             ,0)))  as oa_helper_sport_t_fussball_stock             ,
	( sum(coalesce(d_sport_und_erholung_stock,0)) / sum(coalesce(t_sportzentrum_stock         ,0)))  as oa_helper_sport_t_sportzentrum_stock         ,
	( sum(coalesce(d_sport_und_erholung_stock,0)) / sum(coalesce(t_tischtennis_stock          ,0)))  as oa_helper_sport_t_tischtennis_stock          ,
	( sum(coalesce(d_sport_und_erholung_stock,0)) / sum(coalesce(t_sauna_stock                ,0)))  as oa_helper_sport_t_sauna_stock                ,
	( sum(coalesce(d_sport_und_erholung_stock,0)) / sum(coalesce(t_tennis_stock               ,0)))  as oa_helper_sport_t_tennis_stock               ,
	( sum(coalesce(d_sport_und_erholung_stock,0)) / sum(coalesce(t_kampfsport_stock           ,0)))  as oa_helper_sport_t_kampfsport_stock           ,
	( sum(coalesce(d_sport_und_erholung_stock,0)) / sum(coalesce(t_fitnesszentrum_stock       ,0)))  as oa_helper_sport_t_fitnesszentrum_stock       ,
	( sum(coalesce(d_sport_und_erholung_stock,0)) / sum(coalesce(t_spielplatz_stock           ,0)))  as oa_helper_sport_t_spielplatz_stock           ,
	( sum(coalesce(d_sport_und_erholung_stock,0)) / sum(coalesce(t_wassersport_stock          ,0)))  as oa_helper_sport_t_wassersport_stock          ,
	( sum(coalesce(d_sport_und_erholung_stock,0)) / sum(coalesce(t_sonstige_sportarten_stock  ,0)))  as oa_helper_sport_t_sonstige_sportarten_stock  ,  
	( sum(coalesce(d_sport_und_erholung_stock,0)) / sum(coalesce(t_sonstiges_sport_stock      ,0)))  as oa_helper_sport_t_sonstiges_sport_stock      ,
	( sum(coalesce(d_sport_und_erholung_stock,0)) / sum(coalesce(t_sonstiges_erholung_stock   ,0)))  as oa_helper_sport_t_sonstiges_erholung_stock   	
from osm_poi_features_domain_piv_distcalc d
left join osm_poi_features_category_piv_distcalc c
	on d.timeslice = c.timeslice
	and cast(d.planungsraum as int) = cast(c.planungsraum as int)
left join osm_poi_features_type_piv_distcalc t
	on d.timeslice = t.timeslice
	and cast(d.planungsraum as int) = cast(t.planungsraum as int)
where d.planungsraum is not null
group by 
  d.timeslice;