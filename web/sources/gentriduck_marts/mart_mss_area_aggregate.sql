-- I18-web-b (#249): reads the F2/#34 parquet export directly; path is relative to the Evidence
-- process cwd (web/, where `npm run sources`/`build`/`dev` execute), one level up to the repo
-- root. Thin display mart over int_mss_bzr_aggregate (B10/#120) -- approximated MSS status/
-- Dynamik classification at BZR/Bezirk grain. See I249-web-b-geo-signoff.md /
-- I249-web-b-domain-signoff.md for the display-fitness gate.
select *
from read_parquet('../data/serving/mart_mss_area_aggregate.parquet')
