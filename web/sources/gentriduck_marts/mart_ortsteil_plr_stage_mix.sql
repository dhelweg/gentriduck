-- #269 (I-ortsteile): reads the F2/#34 parquet export directly; path is relative to the Evidence
-- process cwd (web/, where `npm run sources`/`build`/`dev` execute), one level up to the repo
-- root. Child-PLR typology-stage DISTRIBUTION per Ortsteil (a count, deliberately NOT a
-- re-scored index at Ortsteil grain -- see the mart's own header comment and
-- docs/epic-i/I-ortsteile-geo-signoff.md item 4). Used by the Ortsteil profile page's
-- "Neighbourhood stage mix" chart, the Ortsteil-grain equivalent of the inline
-- substr(area_code, 1, N) stage_mix query every BZR/PGR/Bezirk page runs directly.
select *
from read_parquet('../data/serving/mart_ortsteil_plr_stage_mix.parquet')
