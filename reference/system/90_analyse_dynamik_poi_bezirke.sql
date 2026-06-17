select 
osm2014.bezirk, 
anz2013, anz2014, anz2015, anz2016,
anz2014-anz2013 as ytd14, 
anz2015-anz2014 as ytd15,
anz2016-anz2015 as ytd16,
anz2014/anz2013 -1 as ytd14_PCT, 
anz2015/anz2014 -1 as ytd15_PCT, 
anz2016/anz2015 -1 as ytd16_PCT, 
anz2015-anz2013 as dyn1513,
anz2015/anz2013 -1 as dyn1513_PCT
anz2016-anz2013 as dyn1613,
anz2016/anz2013 -1 as dyn1613_PCT
from (
 select 
  substr(planungsraum,0,2) as bezirk, 
  count(node_id) as anz2013
from osm_poi_2014 
group by substr(planungsraum,0,2)) osm2014 join
(
select 
  substr(planungsraum,0,2) as bezirk, 
  count(node_id) as anz2014
from osm_poi_2015 
group by substr(planungsraum,0,2)) osm2015 on (osm2014.bezirk = osm2015.bezirk) join
(
select 
  substr(planungsraum,0,2) as bezirk, 
  count(node_id) as anz2015
from osm_poi_2016 
group by substr(planungsraum,0,2)) osm2016 on (osm2014.bezirk = osm2016.bezirk) join 
(
select 
  substr(planungsraum,0,2) as bezirk, 
  count(node_id) as anz2016
from osm_poi_2017
group by substr(planungsraum,0,2)) osm2017 on (osm2014.bezirk = osm2017.bezirk)  
order by bezirk;