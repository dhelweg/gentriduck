add jar hdfs://<hadoop-cluster>/user/<redacted>/brickhouse-0.7.1-SNAPSHOT.jar;

CREATE TEMPORARY FUNCTION collect AS 'brickhouse.udf.collect.CollectUDAF';

DROP table osm_poi_features_category_piv;
CREATE table osm_poi_features_category_piv as 
select 
	planungsraum, 
	timeslice,
group_map_new  ['Uebernachtung']  as c_uebernachtung_new,	group_map_deleted  ['Uebernachtung']  as c_uebernachtung_deleted,	group_map_ytd  ['Uebernachtung']  as c_uebernachtung_ytd,	group_map_steady  ['Uebernachtung']  as c_uebernachtung_steady,	group_map_stock  ['Uebernachtung']  as c_uebernachtung_stock,
group_map_new  ['Sehenswuerdigkeit']  as c_sehenswuerdigkeit_new,	group_map_deleted  ['Sehenswuerdigkeit']  as c_sehenswuerdigkeit_deleted,	group_map_ytd  ['Sehenswuerdigkeit']  as c_sehenswuerdigkeit_ytd,	group_map_steady  ['Sehenswuerdigkeit']  as c_sehenswuerdigkeit_steady,	group_map_stock  ['Sehenswuerdigkeit']  as c_sehenswuerdigkeit_stock,
group_map_new  ['Kultur']  as c_kultur_new,	group_map_deleted  ['Kultur']  as c_kultur_deleted,	group_map_ytd  ['Kultur']  as c_kultur_ytd,	group_map_steady  ['Kultur']  as c_kultur_steady,	group_map_stock  ['Kultur']  as c_kultur_stock,
group_map_new  ['Info']  as c_info_new,	group_map_deleted  ['Info']  as c_info_deleted,	group_map_ytd  ['Info']  as c_info_ytd,	group_map_steady  ['Info']  as c_info_steady,	group_map_stock  ['Info']  as c_info_stock,
group_map_new  ['Sport']  as c_sport_new,	group_map_deleted  ['Sport']  as c_sport_deleted,	group_map_ytd  ['Sport']  as c_sport_ytd,	group_map_steady  ['Sport']  as c_sport_steady,	group_map_stock  ['Sport']  as c_sport_stock,
group_map_new  ['Erholung']  as c_erholung_new,	group_map_deleted  ['Erholung']  as c_erholung_deleted,	group_map_ytd  ['Erholung']  as c_erholung_ytd,	group_map_steady  ['Erholung']  as c_erholung_steady,	group_map_stock  ['Erholung']  as c_erholung_stock,
group_map_new  ['Zwielicht']  as c_zwielicht_new,	group_map_deleted  ['Zwielicht']  as c_zwielicht_deleted,	group_map_ytd  ['Zwielicht']  as c_zwielicht_ytd,	group_map_steady  ['Zwielicht']  as c_zwielicht_steady,	group_map_stock  ['Zwielicht']  as c_zwielicht_stock,
group_map_new  ['Bildung']  as c_bildung_new,	group_map_deleted  ['Bildung']  as c_bildung_deleted,	group_map_ytd  ['Bildung']  as c_bildung_ytd,	group_map_steady  ['Bildung']  as c_bildung_steady,	group_map_stock  ['Bildung']  as c_bildung_stock,
group_map_new  ['Buero']  as c_buero_new,	group_map_deleted  ['Buero']  as c_buero_deleted,	group_map_ytd  ['Buero']  as c_buero_ytd,	group_map_steady  ['Buero']  as c_buero_steady,	group_map_stock  ['Buero']  as c_buero_stock,
group_map_new  ['Individual']  as c_individual_new,	group_map_deleted  ['Individual']  as c_individual_deleted,	group_map_ytd  ['Individual']  as c_individual_ytd,	group_map_steady  ['Individual']  as c_individual_steady,	group_map_stock  ['Individual']  as c_individual_stock,
group_map_new  ['Hipster']  as c_hipster_new,	group_map_deleted  ['Hipster']  as c_hipster_deleted,	group_map_ytd  ['Hipster']  as c_hipster_ytd,	group_map_steady  ['Hipster']  as c_hipster_steady,	group_map_stock  ['Hipster']  as c_hipster_stock,
group_map_new  ['Sicherheit']  as c_sicherheit_new,	group_map_deleted  ['Sicherheit']  as c_sicherheit_deleted,	group_map_ytd  ['Sicherheit']  as c_sicherheit_ytd,	group_map_steady  ['Sicherheit']  as c_sicherheit_steady,	group_map_stock  ['Sicherheit']  as c_sicherheit_stock,
group_map_new  ['Sonstiges']  as c_sonstiges_new,	group_map_deleted  ['Sonstiges']  as c_sonstiges_deleted,	group_map_ytd  ['Sonstiges']  as c_sonstiges_ytd,	group_map_steady  ['Sonstiges']  as c_sonstiges_steady,	group_map_stock  ['Sonstiges']  as c_sonstiges_stock,
group_map_new  ['Ausgehen']  as c_ausgehen_new,	group_map_deleted  ['Ausgehen']  as c_ausgehen_deleted,	group_map_ytd  ['Ausgehen']  as c_ausgehen_ytd,	group_map_steady  ['Ausgehen']  as c_ausgehen_steady,	group_map_stock  ['Ausgehen']  as c_ausgehen_stock,
group_map_new  ['Gaststaetten']  as c_gaststaetten_new,	group_map_deleted  ['Gaststaetten']  as c_gaststaetten_deleted,	group_map_ytd  ['Gaststaetten']  as c_gaststaetten_ytd,	group_map_steady  ['Gaststaetten']  as c_gaststaetten_steady,	group_map_stock  ['Gaststaetten']  as c_gaststaetten_stock,
group_map_new  ['Sozial']  as c_sozial_new,	group_map_deleted  ['Sozial']  as c_sozial_deleted,	group_map_ytd  ['Sozial']  as c_sozial_ytd,	group_map_steady  ['Sozial']  as c_sozial_steady,	group_map_stock  ['Sozial']  as c_sozial_stock,
group_map_new  ['Cafe']  as c_cafe_new,	group_map_deleted  ['Cafe']  as c_cafe_deleted,	group_map_ytd  ['Cafe']  as c_cafe_ytd,	group_map_steady  ['Cafe']  as c_cafe_steady,	group_map_stock  ['Cafe']  as c_cafe_stock,
group_map_new  ['Religioese Gebaeude']  as c_religioese_gebaeude_new,	group_map_deleted  ['Religioese Gebaeude']  as c_religioese_gebaeude_deleted,	group_map_ytd  ['Religioese Gebaeude']  as c_religioese_gebaeude_ytd,	group_map_steady  ['Religioese Gebaeude']  as c_religioese_gebaeude_steady,	group_map_stock  ['Religioese Gebaeude']  as c_religioese_gebaeude_stock,
group_map_new  ['Post']  as c_post_new,	group_map_deleted  ['Post']  as c_post_deleted,	group_map_ytd  ['Post']  as c_post_ytd,	group_map_steady  ['Post']  as c_post_steady,	group_map_stock  ['Post']  as c_post_stock,
group_map_new  ['Gesundheit']  as c_gesundheit_new,	group_map_deleted  ['Gesundheit']  as c_gesundheit_deleted,	group_map_ytd  ['Gesundheit']  as c_gesundheit_ytd,	group_map_steady  ['Gesundheit']  as c_gesundheit_steady,	group_map_stock  ['Gesundheit']  as c_gesundheit_stock,
group_map_new  ['WC']  as c_wc_new,	group_map_deleted  ['WC']  as c_wc_deleted,	group_map_ytd  ['WC']  as c_wc_ytd,	group_map_steady  ['WC']  as c_wc_steady,	group_map_stock  ['WC']  as c_wc_stock,
group_map_new  ['Bank']  as c_bank_new,	group_map_deleted  ['Bank']  as c_bank_deleted,	group_map_ytd  ['Bank']  as c_bank_ytd,	group_map_steady  ['Bank']  as c_bank_steady,	group_map_stock  ['Bank']  as c_bank_stock,
group_map_new  ['Telefon']  as c_telefon_new,	group_map_deleted  ['Telefon']  as c_telefon_deleted,	group_map_ytd  ['Telefon']  as c_telefon_ytd,	group_map_steady  ['Telefon']  as c_telefon_steady,	group_map_stock  ['Telefon']  as c_telefon_stock,
group_map_new  ['Recycling']  as c_recycling_new,	group_map_deleted  ['Recycling']  as c_recycling_deleted,	group_map_ytd  ['Recycling']  as c_recycling_ytd,	group_map_steady  ['Recycling']  as c_recycling_steady,	group_map_stock  ['Recycling']  as c_recycling_stock,
group_map_new  ['Parkbank']  as c_parkbank_new,	group_map_deleted  ['Parkbank']  as c_parkbank_deleted,	group_map_ytd  ['Parkbank']  as c_parkbank_ytd,	group_map_steady  ['Parkbank']  as c_parkbank_steady,	group_map_stock  ['Parkbank']  as c_parkbank_stock,
group_map_new  ['Briefe und Pakete']  as c_briefe_und_pakete_new,	group_map_deleted  ['Briefe und Pakete']  as c_briefe_und_pakete_deleted,	group_map_ytd  ['Briefe und Pakete']  as c_briefe_und_pakete_ytd,	group_map_steady  ['Briefe und Pakete']  as c_briefe_und_pakete_steady,	group_map_stock  ['Briefe und Pakete']  as c_briefe_und_pakete_stock,
group_map_new  ['Friedhof']  as c_friedhof_new,	group_map_deleted  ['Friedhof']  as c_friedhof_deleted,	group_map_ytd  ['Friedhof']  as c_friedhof_ytd,	group_map_steady  ['Friedhof']  as c_friedhof_steady,	group_map_stock  ['Friedhof']  as c_friedhof_stock,
group_map_new  ['Automaten']  as c_automaten_new,	group_map_deleted  ['Automaten']  as c_automaten_deleted,	group_map_ytd  ['Automaten']  as c_automaten_ytd,	group_map_steady  ['Automaten']  as c_automaten_steady,	group_map_stock  ['Automaten']  as c_automaten_stock,
group_map_new  ['OEPNV']  as c_oepnv_new,	group_map_deleted  ['OEPNV']  as c_oepnv_deleted,	group_map_ytd  ['OEPNV']  as c_oepnv_ytd,	group_map_steady  ['OEPNV']  as c_oepnv_steady,	group_map_stock  ['OEPNV']  as c_oepnv_stock,
group_map_new  ['Restaurant']  as c_restaurant_new,	group_map_deleted  ['Restaurant']  as c_restaurant_deleted,	group_map_ytd  ['Restaurant']  as c_restaurant_ytd,	group_map_steady  ['Restaurant']  as c_restaurant_steady,	group_map_stock  ['Restaurant']  as c_restaurant_stock,
group_map_new  ['Fast Food']  as c_fast_food_new,	group_map_deleted  ['Fast Food']  as c_fast_food_deleted,	group_map_ytd  ['Fast Food']  as c_fast_food_ytd,	group_map_steady  ['Fast Food']  as c_fast_food_steady,	group_map_stock  ['Fast Food']  as c_fast_food_stock,
group_map_new  ['Friseur']  as c_friseur_new,	group_map_deleted  ['Friseur']  as c_friseur_deleted,	group_map_ytd  ['Friseur']  as c_friseur_ytd,	group_map_steady  ['Friseur']  as c_friseur_steady,	group_map_stock  ['Friseur']  as c_friseur_stock,
group_map_new  ['Essen & Trinken']  as c_essen_und_trinken_new,	group_map_deleted  ['Essen & Trinken']  as c_essen_und_trinken_deleted,	group_map_ytd  ['Essen & Trinken']  as c_essen_und_trinken_ytd,	group_map_steady  ['Essen & Trinken']  as c_essen_und_trinken_steady,	group_map_stock  ['Essen & Trinken']  as c_essen_und_trinken_stock,
group_map_new  ['Kleidung']  as c_kleidung_new,	group_map_deleted  ['Kleidung']  as c_kleidung_deleted,	group_map_ytd  ['Kleidung']  as c_kleidung_ytd,	group_map_steady  ['Kleidung']  as c_kleidung_steady,	group_map_stock  ['Kleidung']  as c_kleidung_stock,
group_map_new  ['Sonstige Waren']  as c_sonstige_waren_new,	group_map_deleted  ['Sonstige Waren']  as c_sonstige_waren_deleted,	group_map_ytd  ['Sonstige Waren']  as c_sonstige_waren_ytd,	group_map_steady  ['Sonstige Waren']  as c_sonstige_waren_steady,	group_map_stock  ['Sonstige Waren']  as c_sonstige_waren_stock,
group_map_new  ['Werkstatt']  as c_werkstatt_new,	group_map_deleted  ['Werkstatt']  as c_werkstatt_deleted,	group_map_ytd  ['Werkstatt']  as c_werkstatt_ytd,	group_map_steady  ['Werkstatt']  as c_werkstatt_steady,	group_map_stock  ['Werkstatt']  as c_werkstatt_stock,
group_map_new  ['Kosmetik und Beauty']  as c_kosmetik_und_beauty_new,	group_map_deleted  ['Kosmetik und Beauty']  as c_kosmetik_und_beauty_deleted,	group_map_ytd  ['Kosmetik und Beauty']  as c_kosmetik_und_beauty_ytd,	group_map_steady  ['Kosmetik und Beauty']  as c_kosmetik_und_beauty_steady,	group_map_stock  ['Kosmetik und Beauty']  as c_kosmetik_und_beauty_stock,
group_map_new  ['Medical']  as c_medical_new,	group_map_deleted  ['Medical']  as c_medical_deleted,	group_map_ytd  ['Medical']  as c_medical_ytd,	group_map_steady  ['Medical']  as c_medical_steady,	group_map_stock  ['Medical']  as c_medical_stock,
group_map_new  ['Print']  as c_print_new,	group_map_deleted  ['Print']  as c_print_deleted,	group_map_ytd  ['Print']  as c_print_ytd,	group_map_steady  ['Print']  as c_print_steady,	group_map_stock  ['Print']  as c_print_stock,
group_map_new  ['Massage']  as c_massage_new,	group_map_deleted  ['Massage']  as c_massage_deleted,	group_map_ytd  ['Massage']  as c_massage_ytd,	group_map_steady  ['Massage']  as c_massage_steady,	group_map_stock  ['Massage']  as c_massage_stock,
group_map_new  ['Drogerie']  as c_drogerie_new,	group_map_deleted  ['Drogerie']  as c_drogerie_deleted,	group_map_ytd  ['Drogerie']  as c_drogerie_ytd,	group_map_steady  ['Drogerie']  as c_drogerie_steady,	group_map_stock  ['Drogerie']  as c_drogerie_stock,
group_map_new  ['Reisen']  as c_reisen_new,	group_map_deleted  ['Reisen']  as c_reisen_deleted,	group_map_ytd  ['Reisen']  as c_reisen_ytd,	group_map_steady  ['Reisen']  as c_reisen_steady,	group_map_stock  ['Reisen']  as c_reisen_stock,
group_map_new  ['Technik']  as c_technik_new,	group_map_deleted  ['Technik']  as c_technik_deleted,	group_map_ytd  ['Technik']  as c_technik_ytd,	group_map_steady  ['Technik']  as c_technik_steady,	group_map_stock  ['Technik']  as c_technik_stock,
group_map_new  ['Spielzeug & Geschenke']  as c_spielzeug_und_geschenke_new,	group_map_deleted  ['Spielzeug & Geschenke']  as c_spielzeug_und_geschenke_deleted,	group_map_ytd  ['Spielzeug & Geschenke']  as c_spielzeug_und_geschenke_ytd,	group_map_steady  ['Spielzeug & Geschenke']  as c_spielzeug_und_geschenke_steady,	group_map_stock  ['Spielzeug & Geschenke']  as c_spielzeug_und_geschenke_stock,
group_map_new  ['Waescherei']  as c_waescherei_new,	group_map_deleted  ['Waescherei']  as c_waescherei_deleted,	group_map_ytd  ['Waescherei']  as c_waescherei_ytd,	group_map_steady  ['Waescherei']  as c_waescherei_steady,	group_map_stock  ['Waescherei']  as c_waescherei_stock,
group_map_new  ['Kunst']  as c_kunst_new,	group_map_deleted  ['Kunst']  as c_kunst_deleted,	group_map_ytd  ['Kunst']  as c_kunst_ytd,	group_map_steady  ['Kunst']  as c_kunst_steady,	group_map_stock  ['Kunst']  as c_kunst_stock,
group_map_new  ['Beerdigung']  as c_beerdigung_new,	group_map_deleted  ['Beerdigung']  as c_beerdigung_deleted,	group_map_ytd  ['Beerdigung']  as c_beerdigung_ytd,	group_map_steady  ['Beerdigung']  as c_beerdigung_steady,	group_map_stock  ['Beerdigung']  as c_beerdigung_stock,
group_map_new  ['Handwerk']  as c_handwerk_new,	group_map_deleted  ['Handwerk']  as c_handwerk_deleted,	group_map_ytd  ['Handwerk']  as c_handwerk_ytd,	group_map_steady  ['Handwerk']  as c_handwerk_steady,	group_map_stock  ['Handwerk']  as c_handwerk_stock,
group_map_new  ['Leerstand']  as c_leerstand_new,	group_map_deleted  ['Leerstand']  as c_leerstand_deleted,	group_map_ytd  ['Leerstand']  as c_leerstand_ytd,	group_map_steady  ['Leerstand']  as c_leerstand_steady,	group_map_stock  ['Leerstand']  as c_leerstand_stock,
group_map_new  ['Sonstiger Shop']  as c_sonstiger_shop_new,	group_map_deleted  ['Sonstiger Shop']  as c_sonstiger_shop_deleted,	group_map_ytd  ['Sonstiger Shop']  as c_sonstiger_shop_ytd,	group_map_steady  ['Sonstiger Shop']  as c_sonstiger_shop_steady,	group_map_stock  ['Sonstiger Shop']  as c_sonstiger_shop_stock,
group_map_new  ['Sonstiges Gebaeude']  as c_sonstiges_gebaeude_new,	group_map_deleted  ['Sonstiges Gebaeude']  as c_sonstiges_gebaeude_deleted,	group_map_ytd  ['Sonstiges Gebaeude']  as c_sonstiges_gebaeude_ytd,	group_map_steady  ['Sonstiges Gebaeude']  as c_sonstiges_gebaeude_steady,	group_map_stock  ['Sonstiges Gebaeude']  as c_sonstiges_gebaeude_stock,
group_map_new  ['Sonstiges Gelaende']  as c_sonstiges_gelaende_new,	group_map_deleted  ['Sonstiges Gelaende']  as c_sonstiges_gelaende_deleted,	group_map_ytd  ['Sonstiges Gelaende']  as c_sonstiges_gelaende_ytd,	group_map_steady  ['Sonstiges Gelaende']  as c_sonstiges_gelaende_steady,	group_map_stock  ['Sonstiges Gelaende']  as c_sonstiges_gelaende_stock,
group_map_new  ['Sonstiges Tourismus']  as c_sonstiges_tourismus_new,	group_map_deleted  ['Sonstiges Tourismus']  as c_sonstiges_tourismus_deleted,	group_map_ytd  ['Sonstiges Tourismus']  as c_sonstiges_tourismus_ytd,	group_map_steady  ['Sonstiges Tourismus']  as c_sonstiges_tourismus_steady,	group_map_stock  ['Sonstiges Tourismus']  as c_sonstiges_tourismus_stock

from (
	select 
		planungsraum, 
		timeslice,
		collect(category, new) as group_map_new,
		collect(category, deleted) as group_map_deleted,
		collect(category, ytd) as group_map_ytd,
		collect(category, steady) as group_map_steady,
		collect(category, stock) as group_map_stock
		from (
				select 
					planungsraum, 
					timeslice,
					category,
					group_map['new'] as new,
					group_map['deleted'] as deleted,
					group_map['ytd'] as ytd,
					group_map['steady'] as steady,
					group_map['stock'] as stock
				from (
					select planungsraum, 
						timeslice,
						category,
						collect(poi_state, anz) as group_map
					from osm_poi_features_category 
					group by planungsraum, 
						timeslice,
						category
				)  m
			) a
	group by planungsraum, 
		timeslice
) d
;