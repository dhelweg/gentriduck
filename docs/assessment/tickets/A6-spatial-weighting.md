[A6] Reproduce distance-weighting in the live pipeline + adopt modern spatial methods (decay, Gi* hotspots, MAUP sensitivity)

## Why (problem)
The thesis used POIs two ways — hard point-in-polygon **and** a **distance-weighted** variant that spread each
POI's count across nearby PLRs by an inverse-distance "Gewichtungsfaktor"
(`reference/system/45_osm_poi_features_domain_piv_distcalc.sql:54-57`; thesis Abb. 5-14). It mattered: the best
H1 model (AUC 0.87) ran on distance-weighted data (p.91).

In the revival:
- the 2018 `distance_weighted` variant is only the thesis's **precomputed** CSV
  (`stg_thesis_2018_result_plr_distcalc`), not recomputed;
- the **live** pipeline does hard `ST_Within` point-in-polygon with "no buffer applied"
  (`transform/models/intermediate/int_osm_poi_plr.sql:23-34`) — no decay, no spillover, no smoothing;
- the schema says distance weighting "will be reproduced … (Epic B3/C)" — deferred in a comment, tracked by
  no issue. This is the MAUP / edge-effect problem: a café 10 m across a border counts zero for the neighbour.

## Goal
A documented, gated spatial-aggregation method for the live index that handles edge effects, plus an
interpretable hotspot output and a MAUP sensitivity check.

## Scope & approach
1. **ADR** (architect) for any new libs — DuckDB **H3** community extension and/or **PySAL** (`libpysal`,
   `esda`, `tobler`, `spreg`). All free/open; confirm packaging via `uv`.
2. **Distance-decay done better than the thesis**: the revival has exact POI lon/lat, so compute point→polygon
   distance within a bandwidth (`ST_DWithin`), apply a Gaussian/exponential decay, and **normalise each POI's
   weights to sum 1** (conserve total POI mass). Expose as a live `distance_weighted` variant alongside `standard`.
   Keep CRS in EPSG:25833 (already used) for metric distance.
3. **Hotspots**: add Getis-Ord Gi* (esda) on the per-PLR amenity/index series — interpretable hot/cold spots,
   a direct match to Döring & Ulbricht's "Gentrification-Hotspots" and a natural public-site output.
4. **MAUP sensitivity**: report the index at ≥2 scales (PLR and BZR; optionally H3 hex via `tobler` areal
   interpolation) and document robustness.
5. Document the method in `docs/methodology/spatial-methods.md`.

## Acceptance criteria
- ADR merged for the chosen libs.
- Live `distance_weighted` variant computed in-pipeline with mass-conserving weights; documented bandwidth/decay.
- Gi* hotspot output available per year; MAUP sensitivity (PLR vs BZR) documented.
- `uv run poe build` green; methodology doc written.

## Gate / sign-off
geo-DS `pass` (spatial-method authority) + domain-expert `pass`. Cite methods (C2).

## Dependencies / relations
Interacts with A1 (index definition) and #51 (tobler areal interpolation reusable for the LOR crosswalk).
The spatial weights built here feed the spatial-econometric inference + diffusion model in **R-A9 (#79)**.
Supersedes the deferred "Epic B3/C" distance-weighting comment.

## References
- `reference/system/45_osm_poi_features_domain_piv_distcalc.sql`, `70_oa_helper_disctcalc.sql`,
  `transform/models/intermediate/int_osm_poi_plr.sql`
- `docs/assessment/2026-06-19-pm-architect-review.md` §2.6
- PySAL (libpysal/esda/tobler/spreg), DuckDB spatial + H3 extension
