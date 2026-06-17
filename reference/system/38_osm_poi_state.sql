create table osm_poi_state as
select 
  act.node_id,
  act.timeslice,
  act.planungsraum,
  act.poi_type,
  act.name,
  act.poi_state
from osm_poi_state_changed_del act
union all
select 
  act.node_id,
  act.timeslice,
  act.planungsraum,
  act.poi_type,
  act.name,
  act.poi_state
from osm_poi_state_changed_special act
;