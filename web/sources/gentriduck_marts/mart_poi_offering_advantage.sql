-- #209 (web slice of #207): reads the #208 F2/#34 parquet export directly (same pattern as
-- fct_poi_development.sql); path is relative to the Evidence process cwd (web/, where
-- `npm run sources`/`build`/`dev` execute), one level up to the repo root. Surfaces POI
-- Offering Advantage (OA, ADR-0017/0018) location-quotient values and POI density for the
-- POI/OA map + area radar chart -- not methodology-bearing (already-signed-off values,
-- pure pass-through per mart_poi_offering_advantage.sql's own header).
select *
from read_parquet('../data/serving/mart_poi_offering_advantage.parquet')
