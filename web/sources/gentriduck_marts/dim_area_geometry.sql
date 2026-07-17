-- #247 (I18-web slice 2): reads the F2/#34 parquet export directly, same pattern as
-- mart_area_demographics.sql. Used here only for `area_name` at BZR/PGR grain (dim_area_geometry
-- is PLUMBING per its own model header -- no new spatial method/aggregation) so the new coarse
-- profile pages can show a human-readable name instead of a bare LOR code. Geometry itself is not
-- consumed on these pages (the choropleth polygons live in web/static/geo/*.geojson, exported
-- separately by export_area_geojson.py) -- select only the columns needed to keep this source
-- lean.
select city_code, area_level, area_code, area_name, area_vintage
from read_parquet('../data/serving/dim_area_geometry.parquet')
