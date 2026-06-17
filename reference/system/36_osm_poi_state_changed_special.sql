create view osm_poi_state_changed_special as
select 
  act.node_id,
  act.timeslice,
  act.planungsraum,
  act.poi_type,
  act.name,
  case 
   when act.poi_state = 'changed' 
	  and prev.name is null 
	  and act.poi_type = prev.poi_type 
	then "steady"
   when act.poi_state = 'changed' 
	  and prev.name = act.name 
	  and act.poi_type = prev.poi_type 
	then "steady"
   else act.poi_state
  end as poi_state
from osm_poi_state_basis act 
 left join osm_poi_state_basis prev 
	on act.node_id = prev.node_id 
	and act.timeslice - 100 = prev.timeslice;