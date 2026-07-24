-- #302 (I21-h): reads the export parquet directly; path is relative to the Evidence process cwd
-- (web/, where `npm run sources`/`build`/`dev` execute), one level up to the repo root. Thin
-- pass-through of dim_area_hierarchy (parent/child area edges) -- used by Hamburg's area-scaffold
-- pages (I21-g, #301) to render a real "Up:" link / children table where the code-prefix
-- substr() trick Berlin's LOR pages use doesn't apply (Hamburg's district <- subarea_l1 edge is
-- source-provided; subarea_l2 -> subarea_l1 is the OA-D1b/#240 ST_Within spatial crosswalk,
-- geo-DS + domain-expert PASS -- see dim_area_hierarchy.sql's header for the full method).
select *
from read_parquet('../data/serving/mart_area_hierarchy.parquet')
