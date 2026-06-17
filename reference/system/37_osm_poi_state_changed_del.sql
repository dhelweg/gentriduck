create view osm_poi_state_changed_del as
select 
  act.node_id,
  act.timeslice,
  act.planungsraum,
  prev.poi_type,
  prev.name,
  "changed_deleted" as poi_state
from osm_poi_state_changed_special act 
 left join osm_poi_state_changed_special prev 
	on act.node_id = prev.node_id 
	and act.timeslice - 100 = prev.timeslice
where act.poi_state = 'changed';