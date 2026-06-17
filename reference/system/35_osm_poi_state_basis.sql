create view osm_poi_state_basis as
select distinct
o.node_id,
201401 as timeslice,
o.planungsraum,
case 
	when o.changed_2014_to_2015 = 0 and o.changed_2015_to_2016 = 0 and o.changed_2016_to_2017 = 0 and o.changed_2017_to_2018 = 0 and o.2018_poi_type is not null
	then o.2018_poi_type
	when o.changed_2014_to_2015 = 0 and o.changed_2015_to_2016 = 0 and o.changed_2016_to_2017 = 0 and o.2017_poi_type is not null
	then o.2017_poi_type
	when o.changed_2014_to_2015 = 0 and o.changed_2015_to_2016 = 0 and o.2016_poi_type is not null
	then o.2016_poi_type 
	when o.changed_2014_to_2015 = 0 and o.2015_poi_type is not null
	then o.2015_poi_type 
	else o.2014_poi_type  
end as poi_type,
case 
	when o.changed_2014_to_2015 = 0 and o.changed_2015_to_2016 = 0 and o.changed_2016_to_2017 = 0 and o.changed_2017_to_2018 = 0 and o.2018_name is not null
	then o.2018_name
	when o.changed_2014_to_2015 = 0 and o.changed_2015_to_2016 = 0 and o.changed_2016_to_2017 = 0 and o.2017_name is not null
	then o.2017_name 
	when o.changed_2014_to_2015 = 0 and o.changed_2015_to_2016 = 0 and o.2016_name is not null
	then o.2016_name 
	when o.changed_2014_to_2015 = 0 and o.2015_name is not null
	then o.2015_name 
	else o.2014_name  
end as name,
case 
	when o.2014_last_modification_version is not null and o.2014_last_modification_time < 201301
	then "steady"	
	when o.2014_last_modification_version is not null and o.2014_last_modification_time >= 201301 and o.2014_last_modification_version > 1
	then "steady"	
	when o.2014_last_modification_version is not null and o.2014_last_modification_time >= 201301 and o.2014_last_modification_version = 1
	then "new"	
	else null
end as poi_state
from osm_poi_changed o
union all
select distinct 
o.node_id,
201501 as timeslice,
o.planungsraum,
case 
	when o.changed_2015_to_2016 = 0 and o.changed_2016_to_2017 = 0 and o.changed_2017_to_2018 = 0 and o.2018_poi_type is not null
	then o.2018_poi_type
	when o.changed_2015_to_2016 = 0 and o.changed_2016_to_2017 = 0 and o.2017_poi_type is not null
	then o.2017_poi_type 
	when o.changed_2015_to_2016 = 0 and o.2016_poi_type is not null
	then o.2016_poi_type 
	when o.2015_poi_type is not null
	then o.2015_poi_type 
	else o.2014_poi_type  
end as poi_type,
case 
	when o.changed_2015_to_2016 = 0 and o.changed_2016_to_2017 = 0 and o.changed_2017_to_2018 = 0 and o.2018_name is not null
	then o.2018_name 
	when o.changed_2015_to_2016 = 0 and o.changed_2016_to_2017 = 0 and o.2017_name is not null
	then o.2017_name 
	when o.changed_2015_to_2016 = 0 and o.2016_name is not null
	then o.2016_name 
	when o.2015_name is not null
	then o.2015_name 
	else o.2014_name  
end as name,
case 
	when o.2014_last_modification_version is null and o.2015_last_modification_version is not null
	then "new"
	when o.2014_last_modification_version is not null and o.2015_last_modification_version is null
	then "deleted"
	when o.2014_last_modification_version is not null and o.2015_last_modification_version is not null and o.changed_2014_to_2015 = 0
	then "steady"	
	when o.2014_last_modification_version is not null and o.2015_last_modification_version is not null and o.changed_2014_to_2015 = 1
	then "changed"
	else null
end as poi_state
from osm_poi_changed o
union all
select distinct 
o.node_id,
201601 as timeslice,
o.planungsraum,
case 
	when o.changed_2016_to_2017 = 0 and o.changed_2017_to_2018 = 0 and o.2018_poi_type is not null
	then o.2018_poi_type 
	when o.changed_2016_to_2017 = 0 and o.2017_poi_type is not null
	then o.2017_poi_type 
	when o.2016_poi_type is not null
	then o.2016_poi_type 
	else o.2015_poi_type  
end as poi_type,
case 
	when o.changed_2016_to_2017 = 0 and o.changed_2017_to_2018 = 0 and o.2018_name is not null
	then o.2018_name 
	when o.changed_2016_to_2017 = 0 and o.2017_name is not null
	then o.2017_name 
	when o.2016_name is not null
	then o.2016_name 
	else o.2015_name  
end as name,
case 
	when o.2015_last_modification_version is null and o.2016_last_modification_version is not null
	then "new"
	when o.2015_last_modification_version is not null and o.2016_last_modification_version is null
	then "deleted"
	when o.2015_last_modification_version is not null and o.2016_last_modification_version is not null and o.changed_2015_to_2016 = 0
	then "steady"	
	when o.2015_last_modification_version is not null and o.2016_last_modification_version is not null and o.changed_2015_to_2016 = 1
	then "changed"
	else null
end as poi_state
from osm_poi_changed o
union all
select distinct 
o.node_id,
201701 as timeslice,
o.planungsraum,
case 
	when o.changed_2017_to_2018 = 0 and o.2018_poi_type is not null
	then o.2018_poi_type
	when o.2017_poi_type is not null
	then o.2017_poi_type 
	else o.2016_poi_type  
end as poi_type,
case 
	when o.changed_2017_to_2018 = 0 and o.2018_name is not null
	then o.2018_name 
	when o.2017_name is not null
	then o.2017_name 
	else o.2016_name   
end as name,
case 
	when o.2016_last_modification_version is null and o.2017_last_modification_version is not null
	then "new"
	when o.2016_last_modification_version is not null and o.2017_last_modification_version is null
	then "deleted"
	when o.2016_last_modification_version is not null and o.2017_last_modification_version is not null and o.changed_2016_to_2017 = 0
	then "steady"	
	when o.2016_last_modification_version is not null and o.2017_last_modification_version is not null and o.changed_2016_to_2017 = 1
	then "changed"
	else null
end as poi_state
from osm_poi_changed o
union all
select distinct 
o.node_id,
201801 as timeslice,
o.planungsraum,
case 
	when o.2018_poi_type is not null
	then o.2018_poi_type 
	else o.2017_poi_type  
end as poi_type,
case 
	when o.2018_name is not null
	then o.2018_name 
	else o.2017_name   
end as name,
case 
	when o.2017_last_modification_version is null and o.2018_last_modification_version is not null
	then "new"
	when o.2017_last_modification_version is not null and o.2018_last_modification_version is null
	then "deleted"
	when o.2017_last_modification_version is not null and o.2018_last_modification_version is not null and o.changed_2017_to_2018 = 0
	then "steady"	
	when o.2017_last_modification_version is not null and o.2018_last_modification_version is not null and o.changed_2017_to_2018 = 1
	then "changed"
	else null
end as poi_state
from osm_poi_changed o;