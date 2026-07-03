-- G1a (#130): reads the F2/#34 parquet export directly; path is relative to the Evidence
-- process cwd (web/, where `npm run sources`/`build`/`dev` execute), one level up to the
-- repo root.
select *
from read_parquet('../data/serving/gentrification_index.parquet')
