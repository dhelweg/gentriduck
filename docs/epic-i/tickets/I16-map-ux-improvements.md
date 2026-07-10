[I16] Map UX improvements — color scales + name labels

## Why (problem)
The maps are the site's core asset for non-expert readers, and two things blunt them (maintainer
input): the color scales need improvement, and labels/tooltips identify areas by PLR ID instead of
by name — nobody recognises their Kiez as `04200311`.

## Goal
Both map pages read at a glance: perceptually sound, colorblind-safe scales consistent across
pages and themes, and human place names wherever an area is identified.

## Scope & approach
- **Color scales:** review the choropleth scales on `/maps` (six-stage typology) and `/poi-map`
  (OA / density metrics): perceptually ordered ramps, colorblind-safe, sequential vs diverging
  chosen to match the measure's semantics (geo-data-scientist consulted — e.g. OA around a
  citywide baseline of 1.0/0% is a diverging scale), consistent meaning across both pages, and
  legible in light *and* dark theme. Stay within Evidence theming (`evidence.config.yaml` scales);
  document the chosen palettes and the reasoning.
- **Names, not IDs:** join `dim_area` names into the map layer/geojson export so hover tooltips,
  labels, and any legend/table show the area name (ID available secondarily, e.g. in the detail
  link). Applies to both map pages and to the map-adjacent DataTables.
- Verify click-through to the I14 profile pages still works after the I2 restructure; ensure the
  geojson name join doesn't inflate the payload materially (static-hosting budget, ADR-0012).

## Acceptance criteria
- Both maps use the documented scales; a colorblind simulation check is recorded in the PR;
  light/dark both legible.
- No user-facing PLR-ID-only labels remain on map pages; tooltips lead with the area name.
- Build green; geojson size delta reported.

## Gate / sign-off
web-engineer-reviewer (render + regression). geo-data-scientist consulted on scale semantics
(lightweight — display, not methodology; the underlying stage/OA definitions are untouched).

## Dependencies / relations
After I2 (final page locations); OA-scale semantics align with I15's verdict on the published OA
scale. Click-through targets are I14's pages.

## References
- `docs/assessment/2026-07-10-storytelling-comms-review.md` (finding 7)
- `web/pages/maps.md` · `web/pages/poi-map.md` · `web/evidence.config.yaml` (theme scales) ·
  ADR-0012
