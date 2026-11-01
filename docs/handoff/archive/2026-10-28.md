# Session handoff — 2026-10-27/28 — polygon maps, Hamburg names, Hamburg↔Berlin parity

Maintainer-driven session. The coder↔reviewer pairs ran as Opus subagents, one ticket at a time.
Each ticket was integrated into `develop` after review. Previous note: `archive/2026-10-27.md`.

## Integrated into develop

- **#351 Polygon maps.** The maps were broken because Evidence's `<AreaMap>` hard-wires CARTO
  basemap tiles, which now return an "API KEY REQUIRED" watermark. The new
  `web/components/PolygonMap.svelte` is a self-contained SVG map: no tile provider, no new
  dependency. It does its own projection and draws an inset for far-away exclaves (Neuwerk).
  Areas with no data are drawn hatched, and the map has one tab stop with arrow-key navigation.
  `AreaDrilldownMap` shows two panels: the whole city with the current area highlighted, and a
  close-up. The display GeoJSON is simplified with shapely (66 MB → 11.5 MB), and placeholder
  "orphan" areas are dropped from the display export only. The POI-map "Stock" default was
  fixed (it had been broken on develop too).
- **#352 Area names.** Every `dim_area` row now has a name. Hamburg Gebiete are labelled
  `<Stadtteil> · <OSM place>` (41) or `<Stadtteil> · Gebiet <code>` (902). Berlin name
  collisions within one LOR vintage get the parent name added. One override seam,
  `int_area_display_name_override` (a table). `dim_area_hierarchy` is unchanged row for row.
  Names are display-only: the non-name output diff against develop is 0.
- **#353 Parity.** A 29-gap audit (`docs/epic-g/353-hamburg-berlin-parity-audit.md`). New
  pages `/hamburg/time-series` and `/hamburg/area-detail`. Breadcrumbs (`AreaBreadcrumbs`) and
  per-page titles (`PageTitle`) are city-aware. Hamburg maps click through to profiles, and
  Hamburg profiles follow Berlin's sections where a sign-off allows. Gaps that cannot be closed
  say so on the page (`NotYetPublished` takes a reason and the city). Domain spot-check PASS
  (`docs/epic-g/353-domain-spotcheck.md`).

## New issues

- #356 Hamburg Gebiet 106001 is a placeholder rectangle in the LGV geometry.
- #357 The POI maps draw areas with zero POIs as "No data" instead of density 0.
- **#358 (methodology, needs the maintainer and both reviewers).** "Negative Dynamik = higher
  pressure" may invert the D1×D2 gentrification signal, so active-gentrification areas sort
  last in "highest pressure" lists in both cities. Also: the spotlight sentence should be
  guarded for districts with no negative area, and the home page's Berlin top-10 runs into ties.

## Queue (from the maintainer's 2026-10-27 request)

- **#354** Berlin modern-era (2020+) re-test of all eight hypotheses, as a city- and
  window-parametrised suite. Methodology-bearing: needs dual sign-off.
- **#355** Run the same suite on Hamburg. Depends on #354. Dual sign-off.

## Next step

The maintainer merges the weekly `develop → main` release PR, then #354 starts.

## Notes

- The run hit the Claude session limit three times. Each time the agents were resumed with
  their work intact.
- Stale local preview servers (`serve351.py`, ports 8791–8793) may need a manual
  `Stop-Process` on the Windows machine. Auto mode blocked the agents from killing them.
