-- #310 (map granularity selector): reads the F2/#34 parquet export directly; path is
-- relative to the Evidence process cwd (web/, where `npm run sources`/`build`/`dev`
-- execute), one level up to the repo root. Population-weighted typology_stage mix +
-- dominant-stage/dominant_share + weighted-mean status_index/dynamism_index for
-- gentrification_index's coarser-than-leaf area_levels (Berlin bezirk/pgr/ortsteil,
-- Hamburg subarea_l1/district) -- see the mart's own header for the full method. Used
-- by /berlin/maps and /hamburg/maps's "Area level" dropdown.
select *
from read_parquet('../data/serving/mart_area_rollup_stage_mix.parquet')
