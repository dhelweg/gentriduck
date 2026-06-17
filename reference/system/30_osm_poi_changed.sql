CREATE TABLE osm_poi_changed as 
select 
 coalesce(j2018.coords           ,j2017.coords            ,j2016.coords            ,j2015.coords            ,j2014.coords           ) as coords          
,coalesce(j2018.planungsraum     ,j2017.planungsraum      ,j2016.planungsraum      ,j2015.planungsraum      ,j2014.planungsraum     ) as planungsraum    
,coalesce(j2018.node_id          ,j2017.node_id           ,j2016.node_id           ,j2015.node_id           ,j2014.node_id          ) as node_id         
,coalesce(j2018.addr_city        ,j2017.addr_city         ,j2016.addr_city         ,j2015.addr_city         ,j2014.addr_city        ) as addr_city       
,coalesce(j2018.addr_country     ,j2017.addr_country      ,j2016.addr_country      ,j2015.addr_country      ,j2014.addr_country     ) as addr_country    
,coalesce(j2018.addr_housenumber ,j2017.addr_housenumber  ,j2016.addr_housenumber  ,j2015.addr_housenumber  ,j2014.addr_housenumber ) as addr_housenumber
,coalesce(j2018.addr_postcode    ,j2017.addr_postcode     ,j2016.addr_postcode     ,j2015.addr_postcode     ,j2014.addr_postcode    ) as addr_postcode   
,coalesce(j2018.addr_street      ,j2017.addr_street       ,j2016.addr_street       ,j2015.addr_street       ,j2014.addr_street      ) as addr_street     
,coalesce(j2018.addr_suburb      ,j2017.addr_suburb       ,j2016.addr_suburb       ,j2015.addr_suburb       ,j2014.addr_suburb      ) as addr_suburb                       
,j2014.last_modification_time      as 2014_last_modification_time 
,j2015.last_modification_time      as 2015_last_modification_time 
,j2016.last_modification_time      as 2016_last_modification_time 
,j2017.last_modification_time      as 2017_last_modification_time 
,j2018.last_modification_time      as 2018_last_modification_time              
,j2014.last_modification_version   as 2014_last_modification_version 
,j2015.last_modification_version   as 2015_last_modification_version 
,j2016.last_modification_version   as 2016_last_modification_version 
,j2017.last_modification_version   as 2017_last_modification_version 
,j2018.last_modification_version   as 2018_last_modification_version 
,j2014.name                        as 2014_name                      
,j2015.name                        as 2015_name                      
,j2016.name                        as 2016_name                      
,j2017.name                        as 2017_name                      
,j2018.name                        as 2018_name                      
,j2014.poi_type                    as 2014_poi_type                  
,j2015.poi_type                    as 2015_poi_type                  
,j2016.poi_type                    as 2016_poi_type                  
,j2017.poi_type                    as 2017_poi_type                  
,j2018.poi_type                    as 2018_poi_type                 	 
,case
	when
		levenshtein(UPPER(coalesce(j2015.name,"")),UPPER(coalesce(j2014.name,"")))
		-(	greatest(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2014.name,"")))) 
			- least(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2014.name,"")))))
		>= 0.1* least(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2014.name,""))))
		and least(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2014.name,"")))) > 0
	then 1
	when
		j2015.name is null and j2014.name is not null
	then 1
	when
		j2015.name is not null and j2014.name is null
	then 1
	else 0
end as changed_2014_to_2015
,case
	when
		levenshtein(UPPER(coalesce(j2015.name,"")),UPPER(coalesce(j2016.name,"")))
		-(	greatest(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2016.name,"")))) 
			- least(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2016.name,"")))))
		>= 0.1* least(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2016.name,""))))
		and least(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2016.name,"")))) > 0
	then 1
	when
		j2015.name is null and j2016.name is not null
	then 1
	when
		j2015.name is not null and j2016.name is null
	then 1
	else 0
end as changed_2015_to_2016
,case
	when
		levenshtein(UPPER(coalesce(j2017.name,"")),UPPER(coalesce(j2016.name,"")))
		-(	greatest(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2016.name,"")))) 
			- least(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2016.name,"")))))
		>= 0.1* least(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2016.name,""))))
		and least(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2016.name,"")))) > 0
	then 1
	when
		j2017.name is null and j2016.name is not null
	then 1
	when
		j2017.name is not null and j2016.name is null
	then 1
	else 0
end as changed_2016_to_2017
,case
	when
		levenshtein(UPPER(coalesce(j2017.name,"")),UPPER(coalesce(j2018.name,"")))
		-(	greatest(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2018.name,"")))) 
			- least(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2018.name,"")))))
		>= 0.1* least(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2018.name,""))))
		and least(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2018.name,"")))) > 0
	then 1
	when
		j2017.name is null and j2018.name is not null
	then 1
	when
		j2017.name is not null and j2018.name is null
	then 1
	else 0
end as changed_2017_to_2018
,case
	when
		levenshtein(UPPER(coalesce(j2015.name,"")),UPPER(coalesce(j2014.name,"")))
		-(	greatest(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2014.name,"")))) 
			- least(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2014.name,"")))))
		>= 0.1* least(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2014.name,""))))
		and least(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2014.name,"")))) > 0
	then 1
	when
		j2015.name is null and j2014.name is not null
	then 1
	when
		j2015.name is not null and j2014.name is null
	then 1
	when
		levenshtein(UPPER(coalesce(j2015.name,"")),UPPER(coalesce(j2016.name,"")))
		-(	greatest(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2016.name,"")))) 
			- least(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2016.name,"")))))
		>= 0.1* least(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2016.name,""))))
		and least(length(coalesce(j2015.name,"")),length(UPPER(coalesce(j2016.name,"")))) > 0
	then 1
	when
		j2015.name is null and j2016.name is not null
	then 1
	when
		j2015.name is not null and j2016.name is null
	then 1
	when
		levenshtein(UPPER(coalesce(j2017.name,"")),UPPER(coalesce(j2016.name,"")))
		-(	greatest(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2016.name,"")))) 
			- least(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2016.name,"")))))
		>= 0.1* least(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2016.name,""))))
		and least(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2016.name,"")))) > 0
	then 1
	when
		j2017.name is null and j2016.name is not null
	then 1
	when
		j2017.name is not null and j2016.name is null
	then 1
	when
		levenshtein(UPPER(coalesce(j2017.name,"")),UPPER(coalesce(j2018.name,"")))
		-(	greatest(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2018.name,"")))) 
			- least(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2018.name,"")))))
		>= 0.1* least(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2018.name,""))))
		and least(length(coalesce(j2017.name,"")),length(UPPER(coalesce(j2018.name,"")))) > 0
	then 1
	when
		j2017.name is null and j2018.name is not null
	then 1
	when
		j2017.name is not null and j2018.name is null
	then 1
else 0
end as name_changed
from osm_poi_type_2014 j2014
full outer join osm_poi_type_2015 j2015
	on j2014.node_id = j2015.node_id 
full outer join osm_poi_type_2016 j2016
	on coalesce(j2015.node_id,j2014.node_id) = j2016.node_id 
full outer join osm_poi_type_2017 j2017
	on coalesce(j2016.node_id,j2015.node_id,j2014.node_id) = j2017.node_id 
full outer join osm_poi_type_2018 j2018
	on coalesce(j2017.node_id,j2016.node_id,j2015.node_id,j2014.node_id) = j2018.node_id 
;