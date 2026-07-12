-- I19-web (#246): reads the F2/#34 parquet export directly; path is relative to the Evidence
-- process cwd (web/, where `npm run sources`/`build`/`dev` execute), one level up to the repo
-- root. EWR descriptive series (Einwohner, age structure, composition, residence duration) at PLR
-- grain and rolled up to BZR/PGR/Bezirk (#243) -- display-only, separate from the index inputs.
select *
from read_parquet('../data/serving/mart_area_demographics.parquet')
