-- G1b (#131): reads the F2/#34 parquet export directly; path is relative to the Evidence
-- process cwd (web/, where `npm run sources`/`build`/`dev` execute), one level up to the
-- repo root. Per-PLR per-MSS-edition panel used for the time-series page.
select *
from read_parquet('../data/serving/fct_gentrification_change.parquet')
