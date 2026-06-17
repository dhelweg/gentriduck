add jar hdfs://<hadoop-cluster>/user/<redacted>/brickhouse-0.7.1-SNAPSHOT.jar;

CREATE TEMPORARY FUNCTION collect AS 'brickhouse.udf.collect.CollectUDAF';

DROP table osm_poi_features_domain_piv_distcalc;
CREATE table osm_poi_features_domain_piv_distcalc as 
select 
	planungsraum, 
	timeslice,
group_map_new  ['Tourismus']  as d_tourismus_new,	group_map_deleted  ['Tourismus']  as d_tourismus_deleted,	group_map_ytd  ['Tourismus']  as d_tourismus_ytd,	group_map_steady  ['Tourismus']  as d_tourismus_steady,	group_map_stock  ['Tourismus']  as d_tourismus_stock,
group_map_new  ['Vergnuegung']  as d_vergnuegung_new,	group_map_deleted  ['Vergnuegung']  as d_vergnuegung_deleted,	group_map_ytd  ['Vergnuegung']  as d_vergnuegung_ytd,	group_map_steady  ['Vergnuegung']  as d_vergnuegung_steady,	group_map_stock  ['Vergnuegung']  as d_vergnuegung_stock,
group_map_new  ['Sport und Erholung']  as d_sport_und_erholung_new,	group_map_deleted  ['Sport und Erholung']  as d_sport_und_erholung_deleted,	group_map_ytd  ['Sport und Erholung']  as d_sport_und_erholung_ytd,	group_map_steady  ['Sport und Erholung']  as d_sport_und_erholung_steady,	group_map_stock  ['Sport und Erholung']  as d_sport_und_erholung_stock,
group_map_new  ['Public Service']  as d_public_service_new,	group_map_deleted  ['Public Service']  as d_public_service_deleted,	group_map_ytd  ['Public Service']  as d_public_service_ytd,	group_map_steady  ['Public Service']  as d_public_service_steady,	group_map_stock  ['Public Service']  as d_public_service_stock,
group_map_new  ['Buero']  as d_buero_new,	group_map_deleted  ['Buero']  as d_buero_deleted,	group_map_ytd  ['Buero']  as d_buero_ytd,	group_map_steady  ['Buero']  as d_buero_steady,	group_map_stock  ['Buero']  as d_buero_stock,
group_map_new  ['Mobilitaet']  as d_mobilitaet_new,	group_map_deleted  ['Mobilitaet']  as d_mobilitaet_deleted,	group_map_ytd  ['Mobilitaet']  as d_mobilitaet_ytd,	group_map_steady  ['Mobilitaet']  as d_mobilitaet_steady,	group_map_stock  ['Mobilitaet']  as d_mobilitaet_stock,
group_map_new  ['Sonstiges']  as d_sonstiges_new,	group_map_deleted  ['Sonstiges']  as d_sonstiges_deleted,	group_map_ytd  ['Sonstiges']  as d_sonstiges_ytd,	group_map_steady  ['Sonstiges']  as d_sonstiges_steady,	group_map_stock  ['Sonstiges']  as d_sonstiges_stock,
group_map_new  ['Gastronomie']  as d_gastronomie_new,	group_map_deleted  ['Gastronomie']  as d_gastronomie_deleted,	group_map_ytd  ['Gastronomie']  as d_gastronomie_ytd,	group_map_steady  ['Gastronomie']  as d_gastronomie_steady,	group_map_stock  ['Gastronomie']  as d_gastronomie_stock,
group_map_new  ['Religion']  as d_religion_new,	group_map_deleted  ['Religion']  as d_religion_deleted,	group_map_ytd  ['Religion']  as d_religion_ytd,	group_map_steady  ['Religion']  as d_religion_steady,	group_map_stock  ['Religion']  as d_religion_stock,
group_map_new  ['Oeffentlicher Raum']  as d_oeffentlicher_raum_new,	group_map_deleted  ['Oeffentlicher Raum']  as d_oeffentlicher_raum_deleted,	group_map_ytd  ['Oeffentlicher Raum']  as d_oeffentlicher_raum_ytd,	group_map_steady  ['Oeffentlicher Raum']  as d_oeffentlicher_raum_steady,	group_map_stock  ['Oeffentlicher Raum']  as d_oeffentlicher_raum_stock,
group_map_new  ['Dienstleistung']  as d_dienstleistung_new,	group_map_deleted  ['Dienstleistung']  as d_dienstleistung_deleted,	group_map_ytd  ['Dienstleistung']  as d_dienstleistung_ytd,	group_map_steady  ['Dienstleistung']  as d_dienstleistung_steady,	group_map_stock  ['Dienstleistung']  as d_dienstleistung_stock,
group_map_new  ['Waren']  as d_waren_new,	group_map_deleted  ['Waren']  as d_waren_deleted,	group_map_ytd  ['Waren']  as d_waren_ytd,	group_map_steady  ['Waren']  as d_waren_steady,	group_map_stock  ['Waren']  as d_waren_stock,
group_map_new  ['Leerstand']  as d_leerstand_new,	group_map_deleted  ['Leerstand']  as d_leerstand_deleted,	group_map_ytd  ['Leerstand']  as d_leerstand_ytd,	group_map_steady  ['Leerstand']  as d_leerstand_steady,	group_map_stock  ['Leerstand']  as d_leerstand_stock
	
from (
	select 
		planungsraum, 
		timeslice,
		collect(domain, new) as group_map_new,
		collect(domain, deleted) as group_map_deleted,
		collect(domain, ytd) as group_map_ytd,
		collect(domain, steady) as group_map_steady,
		collect(domain, stock) as group_map_stock
		from (
				select 
					planungsraum, 
					timeslice,
					domain,
					group_map['new'] as new,
					group_map['deleted'] as deleted,
					group_map['ytd'] as ytd,
					group_map['steady'] as steady,
					group_map['stock'] as stock
				from (
					select planungsraum, 
						timeslice,
						domain,
						collect(poi_state, anz) as group_map
					from (
						select 
							fromareaname as planungsraum, 
							timeslice,
							domain,
							poi_state, 
							sum(anz * dist_weighted) as anz
						from osm_poi_features_domain osm
							join lor_dist_planungsraum lor on lor.toareaname = osm.planungsraum
							where dist_weighted > 0
						group by fromareaname, 
							timeslice,
							domain,
							poi_state
					) w
					group by planungsraum, 
						timeslice,
						domain
				)  m
			) a
	group by planungsraum, 
		timeslice
) d
;