-- G1d (#133): reads the F2/#34 parquet export directly; path is relative to the Evidence
-- process cwd (web/, where `npm run sources`/`build`/`dev` execute), one level up to the
-- repo root. Per-PLR trajectory summary across all available MSS editions, used for the
-- area drill-down page.
select *
from read_parquet('../data/serving/fct_gentrification_trajectory.parquet')
