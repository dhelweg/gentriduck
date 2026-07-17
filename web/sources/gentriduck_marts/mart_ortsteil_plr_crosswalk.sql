-- #269 (I-ortsteile): reads the F2/#34 parquet export directly; path is relative to the Evidence
-- process cwd (web/, where `npm run sources`/`build`/`dev` execute), one level up to the repo
-- root. Thin pass-through of the dominant PLR<->Ortsteil area-overlap crosswalk
-- (int_berlin_plr_ortsteil_overlap.sql, geo-DS gated, docs/epic-i/I-ortsteile-geo-signoff.md) --
-- used by the Ortsteil profile/index pages to build the "constituent PLRs" child table and the
-- Mapped-places join, in place of the substr(area_code, 1, N) trick BZR/PGR/Bezirk pages use
-- (Ortsteil does not nest into PLR codes).
select *
from read_parquet('../data/serving/mart_ortsteil_plr_crosswalk.parquet')
