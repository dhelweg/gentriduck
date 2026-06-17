add jar hdfs://<hadoop-cluster>/user/<redacted>/lormapper_run1c.jar;

CREATE TEMPORARY FUNCTION planungsraum AS 'de.zeb.hive.udf.lormapper.Planungsraum';

drop table osm_poi_2014;
drop table osm_poi_2015;
drop table osm_poi_2016;
drop table osm_poi_2017;
drop table osm_poi_2018;
drop table osm_poi_latest;


CREATE TABLE osm_poi_2014 as 
select 
"201401" as timeslice,
concat(latitude,", ",longitude) as coords, 
planungsraum(concat(latitude,", ",longitude)) as planungsraum,
id as node_id,
userid as last_modification_userid,
date_format(`timestamp`,'yyyyMM') as last_modification_time,
`version` as last_modification_version,
changesetid as last_modification_changesetid,
tags["name"] as name,
tags["description"] as description, 
tags["addr:city"] as addr_city, 
tags["addr:country"] as addr_country, 
tags["addr:housenumber"] as addr_housenumber, 
tags["addr:postcode"] as addr_postcode, 
tags["addr:street"] as addr_street, 
tags["addr:suburb"] as addr_suburb, 
tags["amenity"] as amenity, 
tags["cuisine"] as cuisine, 
tags["vending"] as vending, 
case 
when (tags["recycling:glass_bottles"] = "yes" or tags["recycling:glass"] = "yes") 
	and (tags["recycling:clothes"] is null or tags["recycling:clothes"] = "no") 
	then 'glass'
when (tags["recycling:glass_bottles"] is null or tags["recycling:glass_bottles"] = "no") 
	and (tags["recycling:glass"] is null or tags["recycling:glass"] = "no") 
	and tags["recycling:clothes"] = "yes" 
	then 'clothes'
when (tags["recycling:glass_bottles"] = "yes" or tags["recycling:glass"] = "yes") 
	and tags["recycling:clothes"] = "yes" 
	then 'glass_clothes'
when tags["amenity"] = "recycling" 
	and (tags["recycling:glass"] is null and tags["recycling:glass_bottles"] is null 
	and tags["recycling:clothes"] is null) 
	then 'Sonstige Container' 
else null end as recycling,
tags["atm"] as atm, 
tags["heritage"] as heritage, 
tags["religion"] as religion, 
tags["tourism"] as tourism, 
tags["sport"] as sport, 
tags["leisure"] as leisure, 
tags["office"] as office, 
tags["landuse"] as landuse,
tags["shop"] as shop,
tags["public_transport"] as public_transport,
tags["wheelchair"] as wheelchair, 
tags["opening_hours"] as opening_hours
from osmnodes_filtered_140101;
CREATE TABLE osm_poi_2015 as 
select 
"201501" as timeslice,
concat(latitude,", ",longitude) as coords, 
planungsraum(concat(latitude,", ",longitude)) as planungsraum,
id as node_id,
userid as last_modification_userid,
date_format(`timestamp`,'yyyyMM') as last_modification_time,
`version` as last_modification_version,
changesetid as last_modification_changesetid,
tags["name"] as name,
tags["description"] as description, 
tags["addr:city"] as addr_city, 
tags["addr:country"] as addr_country, 
tags["addr:housenumber"] as addr_housenumber, 
tags["addr:postcode"] as addr_postcode, 
tags["addr:street"] as addr_street, 
tags["addr:suburb"] as addr_suburb, 
tags["amenity"] as amenity, 
tags["cuisine"] as cuisine, 
tags["vending"] as vending, 
case 
when (tags["recycling:glass_bottles"] = "yes" or tags["recycling:glass"] = "yes") 
	and (tags["recycling:clothes"] is null or tags["recycling:clothes"] = "no") 
	then 'glass'
when (tags["recycling:glass_bottles"] is null or tags["recycling:glass_bottles"] = "no") 
	and (tags["recycling:glass"] is null or tags["recycling:glass"] = "no") 
	and tags["recycling:clothes"] = "yes" 
	then 'clothes'
when (tags["recycling:glass_bottles"] = "yes" or tags["recycling:glass"] = "yes") 
	and tags["recycling:clothes"] = "yes" 
	then 'glass_clothes'
when tags["amenity"] = "recycling" 
	and (tags["recycling:glass"] is null and tags["recycling:glass_bottles"] is null 
	and tags["recycling:clothes"] is null) 
	then 'Sonstige Container' 
else null end as recycling,
tags["atm"] as atm, 
tags["heritage"] as heritage, 
tags["religion"] as religion,  
tags["tourism"] as tourism, 
tags["sport"] as sport, 
tags["leisure"] as leisure, 
tags["office"] as office, 
tags["landuse"] as landuse,
tags["shop"] as shop,
tags["public_transport"] as public_transport,
tags["wheelchair"] as wheelchair, 
tags["opening_hours"] as opening_hours
from osmnodes_filtered_150101;
CREATE TABLE osm_poi_2016 as 
select 
"201601" as timeslice,
concat(latitude,", ",longitude) as coords, 
planungsraum(concat(latitude,", ",longitude)) as planungsraum,
id as node_id,
userid as last_modification_userid,
date_format(`timestamp`,'yyyyMM') as last_modification_time,
`version` as last_modification_version,
changesetid as last_modification_changesetid,
tags["name"] as name,
tags["description"] as description, 
tags["addr:city"] as addr_city, 
tags["addr:country"] as addr_country, 
tags["addr:housenumber"] as addr_housenumber, 
tags["addr:postcode"] as addr_postcode, 
tags["addr:street"] as addr_street, 
tags["addr:suburb"] as addr_suburb, 
tags["amenity"] as amenity, 
tags["cuisine"] as cuisine, 
tags["vending"] as vending, 
case 
when (tags["recycling:glass_bottles"] = "yes" or tags["recycling:glass"] = "yes") 
	and (tags["recycling:clothes"] is null or tags["recycling:clothes"] = "no") 
	then 'glass'
when (tags["recycling:glass_bottles"] is null or tags["recycling:glass_bottles"] = "no") 
	and (tags["recycling:glass"] is null or tags["recycling:glass"] = "no") 
	and tags["recycling:clothes"] = "yes" 
	then 'clothes'
when (tags["recycling:glass_bottles"] = "yes" or tags["recycling:glass"] = "yes") 
	and tags["recycling:clothes"] = "yes" 
	then 'glass_clothes'
when tags["amenity"] = "recycling" 
	and (tags["recycling:glass"] is null and tags["recycling:glass_bottles"] is null 
	and tags["recycling:clothes"] is null) 
	then 'Sonstige Container' 
else null end as recycling,
tags["atm"] as atm, 
tags["heritage"] as heritage, 
tags["religion"] as religion,  
tags["tourism"] as tourism, 
tags["sport"] as sport, 
tags["leisure"] as leisure, 
tags["office"] as office, 
tags["landuse"] as landuse,
tags["shop"] as shop,
tags["public_transport"] as public_transport,
tags["wheelchair"] as wheelchair, 
tags["opening_hours"] as opening_hours
from osmnodes_filtered_160101;
CREATE TABLE osm_poi_2017 as 
select 
"201701" as timeslice,
concat(latitude,", ",longitude) as coords, 
planungsraum(concat(latitude,", ",longitude)) as planungsraum,
id as node_id,
userid as last_modification_userid,
date_format(`timestamp`,'yyyyMM') as last_modification_time,
`version` as last_modification_version,
changesetid as last_modification_changesetid,
tags["name"] as name,
tags["description"] as description, 
tags["addr:city"] as addr_city, 
tags["addr:country"] as addr_country, 
tags["addr:housenumber"] as addr_housenumber, 
tags["addr:postcode"] as addr_postcode, 
tags["addr:street"] as addr_street, 
tags["addr:suburb"] as addr_suburb, 
tags["amenity"] as amenity, 
tags["cuisine"] as cuisine, 
tags["vending"] as vending, 
case 
when (tags["recycling:glass_bottles"] = "yes" or tags["recycling:glass"] = "yes") 
	and (tags["recycling:clothes"] is null or tags["recycling:clothes"] = "no") 
	then 'glass'
when (tags["recycling:glass_bottles"] is null or tags["recycling:glass_bottles"] = "no") 
	and (tags["recycling:glass"] is null or tags["recycling:glass"] = "no") 
	and tags["recycling:clothes"] = "yes" 
	then 'clothes'
when (tags["recycling:glass_bottles"] = "yes" or tags["recycling:glass"] = "yes") 
	and tags["recycling:clothes"] = "yes" 
	then 'glass_clothes'
when tags["amenity"] = "recycling" 
	and (tags["recycling:glass"] is null and tags["recycling:glass_bottles"] is null 
	and tags["recycling:clothes"] is null) 
	then 'Sonstige Container' 
else null end as recycling,
tags["atm"] as atm, 
tags["heritage"] as heritage, 
tags["religion"] as religion,  
tags["tourism"] as tourism, 
tags["sport"] as sport, 
tags["leisure"] as leisure, 
tags["office"] as office, 
tags["landuse"] as landuse,
tags["shop"] as shop,
tags["public_transport"] as public_transport,
tags["wheelchair"] as wheelchair, 
tags["opening_hours"] as opening_hours
from osmnodes_filtered_170101;
CREATE TABLE osm_poi_2018 as 
select 
"201801" as timeslice,
concat(latitude,", ",longitude) as coords, 
planungsraum(concat(latitude,", ",longitude)) as planungsraum,
id as node_id,
userid as last_modification_userid,
date_format(`timestamp`,'yyyyMM') as last_modification_time,
`version` as last_modification_version,
changesetid as last_modification_changesetid,
tags["name"] as name,
tags["description"] as description, 
tags["addr:city"] as addr_city, 
tags["addr:country"] as addr_country, 
tags["addr:housenumber"] as addr_housenumber, 
tags["addr:postcode"] as addr_postcode, 
tags["addr:street"] as addr_street, 
tags["addr:suburb"] as addr_suburb, 
tags["amenity"] as amenity, 
tags["cuisine"] as cuisine, 
tags["vending"] as vending, 
case 
when (tags["recycling:glass_bottles"] = "yes" or tags["recycling:glass"] = "yes") 
	and (tags["recycling:clothes"] is null or tags["recycling:clothes"] = "no") 
	then 'glass'
when (tags["recycling:glass_bottles"] is null or tags["recycling:glass_bottles"] = "no") 
	and (tags["recycling:glass"] is null or tags["recycling:glass"] = "no") 
	and tags["recycling:clothes"] = "yes" 
	then 'clothes'
when (tags["recycling:glass_bottles"] = "yes" or tags["recycling:glass"] = "yes") 
	and tags["recycling:clothes"] = "yes" 
	then 'glass_clothes'
when tags["amenity"] = "recycling" 
	and (tags["recycling:glass"] is null and tags["recycling:glass_bottles"] is null 
	and tags["recycling:clothes"] is null) 
	then 'Sonstige Container' 
else null end as recycling,
tags["atm"] as atm, 
tags["heritage"] as heritage, 
tags["religion"] as religion,  
tags["tourism"] as tourism, 
tags["sport"] as sport, 
tags["leisure"] as leisure, 
tags["office"] as office, 
tags["landuse"] as landuse,
tags["shop"] as shop,
tags["public_transport"] as public_transport,
tags["wheelchair"] as wheelchair, 
tags["opening_hours"] as opening_hours
from osmnodes_filtered_180101;
CREATE TABLE osm_poi_latest as 
select 
"201803" as timeslice,
concat(latitude,", ",longitude) as coords, 
planungsraum(concat(latitude,", ",longitude)) as planungsraum,
id as node_id,
userid as last_modification_userid,
date_format(`timestamp`,'yyyyMM') as last_modification_time,
`version` as last_modification_version,
changesetid as last_modification_changesetid,
tags["name"] as name,
tags["description"] as description, 
tags["addr:city"] as addr_city, 
tags["addr:country"] as addr_country, 
tags["addr:housenumber"] as addr_housenumber, 
tags["addr:postcode"] as addr_postcode, 
tags["addr:street"] as addr_street, 
tags["addr:suburb"] as addr_suburb, 
tags["amenity"] as amenity, 
tags["cuisine"] as cuisine, 
tags["vending"] as vending, 
case 
when (tags["recycling:glass_bottles"] = "yes" or tags["recycling:glass"] = "yes") 
	and (tags["recycling:clothes"] is null or tags["recycling:clothes"] = "no") 
	then 'glass'
when (tags["recycling:glass_bottles"] is null or tags["recycling:glass_bottles"] = "no") 
	and (tags["recycling:glass"] is null or tags["recycling:glass"] = "no") 
	and tags["recycling:clothes"] = "yes" 
	then 'clothes'
when (tags["recycling:glass_bottles"] = "yes" or tags["recycling:glass"] = "yes") 
	and tags["recycling:clothes"] = "yes" 
	then 'glass_clothes'
when tags["amenity"] = "recycling" 
	and (tags["recycling:glass"] is null and tags["recycling:glass_bottles"] is null 
	and tags["recycling:clothes"] is null) 
	then 'Sonstige Container' 
else null end as recycling,
tags["atm"] as atm, 
tags["heritage"] as heritage, 
tags["religion"] as religion,  
tags["tourism"] as tourism, 
tags["sport"] as sport, 
tags["leisure"] as leisure, 
tags["office"] as office, 
tags["landuse"] as landuse,
tags["shop"] as shop,
tags["public_transport"] as public_transport,
tags["wheelchair"] as wheelchair, 
tags["opening_hours"] as opening_hours
from osmnodes_filtered_latest;