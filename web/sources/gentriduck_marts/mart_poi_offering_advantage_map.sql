-- #210 (perf follow-up to #208/#209): reads the slim, domain-grain
-- mart_poi_offering_advantage_map parquet export (same read_parquet pattern
-- as the sibling mart_poi_offering_advantage.sql) -- used by /poi-map's
-- reactive query so the client bundles the domain-grain table instead of
-- the ~3.4x-larger leaf-grain one. Not methodology-bearing (pure
-- re-aggregation of an already-signed-off mart; see the dbt model header).
select *
from read_parquet('../data/serving/mart_poi_offering_advantage_map.parquet')
