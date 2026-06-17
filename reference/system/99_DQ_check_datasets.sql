select count(1) as anz, 2014 as year, "osmnodes_filtered" as src from osmnodes_filtered_140101 o1
union all
select count(1) as anz, 2014 as year, "osm_poi" as src from osm_poi_2014 o
union all
select count(1) as anz, 2014 as year, "osm_poi_type" as src from osm_poi_type_2014 o
UNION ALL
select count(1) as anz, 2015 as year, "osmnodes_filtered" as src from osmnodes_filtered_150101 o1
union all
select count(1) as anz, 2015 as year, "osm_poi" as src from osm_poi_2015 o
union all
select count(1) as anz, 2015 as year, "osm_poi_type" as src from osm_poi_type_2015 o
UNION ALL
select count(1) as anz, 2016 as year, "osmnodes_filtered" as src from osmnodes_filtered_160101 o1
union all
select count(1) as anz, 2016 as year, "osm_poi" as src from osm_poi_2016 o
union all
select count(1) as anz, 2016 as year, "osm_poi_type" as src from osm_poi_type_2016 o
UNION ALL
select count(1) as anz, 2017 as year, "osmnodes_filtered" as src from osmnodes_filtered_170101 o1
union all
select count(1) as anz, 2017 as year, "osm_poi" as src from osm_poi_2017 o
union all
select count(1) as anz, 2017 as year, "osm_poi_type" as src from osm_poi_type_2017 o
UNION ALL
select count(1) as anz, 2018 as year, "osmnodes_filtered" as src from osmnodes_filtered_180101 o1
union all
select count(1) as anz, 2018 as year, "osm_poi" as src from osm_poi_2018 o
union all
select count(1) as anz, 2018 as year, "osm_poi_type" as src from osm_poi_type_2018 o
union all
select count(1) as anz, "2014-2018" as year, "osm_poi_changed" as src from osm_poi_changed o
union all
select count(1) as anz, "2014-2018" as year, "osm_poi_state" as src from osm_poi_state_basis o
union all
select count(1) as anz, "2014-2018" as year, "osm_poi_state" as src from osm_poi_state_changed_special o
union all
select count(1) as anz, "2014-2018" as year, "osm_poi_state" as src from osm_poi_state_changed_del o
union all
select count(1) as anz, "2014-2018" as year, "osm_poi_state" as src from osm_poi_state o
union all
select count(1) as anz, o.timeslice as year, concat("osm_poi_state",o.poi_state) as src from osm_poi_state o group by  o.timeslice, o.poi_state;