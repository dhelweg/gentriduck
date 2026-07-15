-- I20-web (#254): reads the F2/#34 parquet export directly; path is relative to the Evidence
-- process cwd (web/, where `npm run sources`/`build`/`dev` execute), one level up to the repo
-- root. Everyday-infrastructure counts + dominant-cuisine summary at PLR grain and rolled up to
-- BZR/PGR/Bezirk (#252) -- display-only, not an index input (mart's own header comment).
select *
from read_parquet('../data/serving/mart_area_amenities.parquet')
