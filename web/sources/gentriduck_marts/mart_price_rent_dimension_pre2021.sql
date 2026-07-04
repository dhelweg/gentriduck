-- bug-fix (discovered alongside #139): area-detail.md (#133/#136) already queries
-- gentriduck_marts.mart_price_rent_dimension_pre2021, but this Evidence source definition was
-- never added when the mart landed in #136 (D1d-followup) -- the price & rent section of the area
-- detail page was silently returning no table/erroring without it. Reads the F2/#34 parquet
-- export directly; path is relative to the Evidence process cwd (web/, where
-- `npm run sources`/`build`/`dev` execute), one level up to the repo root. Per-PLR (lor_pre2021),
-- re-keyed Bodenrichtwert/Mietspiegel-derived price & rent dimension, used for the area drill-down
-- page.
select *
from read_parquet('../data/serving/mart_price_rent_dimension_pre2021.parquet')
