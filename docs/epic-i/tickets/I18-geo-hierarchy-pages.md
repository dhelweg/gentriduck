[I18] Geo-hierarchy area pages — Bezirk / Prognoseraum / Bezirksregion profiles, not just PLR

## Why (problem)
The site's per-area pages exist only at PLR grain (`/berlin/area/[code]`, ~542 pages). Maintainer
feedback (2026-07-11): make better use of the geographic hierarchy — Berlin's LOR ladder is
**Bezirk (12) → Prognoseraum/PGR (~58) → Bezirksregion/BZR (~140) → Planungsraum/PLR (~542)** —
and the official small-area communication the site already emulates (the berlin.de Sozialraum
region profiles and *Kurzprofil* PDFs cited in I14) is published at **BZR** grain, not PLR. Readers
think in districts and Kieze, land on a PLR page, and have no way up or down the ladder. Hamburg
(H3, #237) has the same need at Bezirk/Stadtteil grain.

## Goal
Every level of `dim_area`'s hierarchy gets a profile page, and every area page knows its parent
and children — a reader can walk Friedrichshain-Kreuzberg → PGR → Boxhagener Platz (BZR) → single
PLR and back, with level-appropriate content at each step.

## Scope & approach
- **Data — add the missing level:** `dim_area` today carries `bezirk`/`bzr`/`plr` (Berlin) and
  `district`/`subarea_l1`/`subarea_l2` (Hamburg); **PGR is absent**. Ingest LOR Prognoseraum
  geometry from the same Berlin WFS family as the existing LOR staging (ADR-0003 source — architect
  confirms no new source/ADR needed), add `pgr` to `seed_dim_area_level`, extend `dim_area`.
- **Data — hierarchy edges:** LOR area codes nest by prefix (PLR code ⊃ BZR ⊃ PGR ⊃ Bezirk).
  Add a `dim_area_hierarchy` model (or `parent_area_code` on `dim_area`) derived from code
  structure, city-agnostic per ADR-0005 (Hamburg: Gebiet → Stadtteil → Bezirk), with dbt tests
  (every child has exactly one parent; both LOR vintages handled via the existing crosswalk logic).
- **Berlin "Stadtteile" (Ortsteile, 96): explicitly out of scope v1.** Ortsteile are not part of
  LOR and their boundaries do not nest with PLRs — surfacing them needs a crosswalk + MAUP
  decision. Record as an open question for geo-DS in the sign-off; a follow-up ticket if wanted.
- **What a coarse-level page shows (phased, gate-aware):**
  - *Phase 1 (this ticket):* data natively at or cleanly summable to that grain — population and
    EWR counts (sum of child PLRs; shares recomputed from summed numerators, never averaged),
    MSS at BZR (exists: `int_mss_bzr_aggregate`), POI counts, and the **distribution of child
    areas over the six typology stages** (e.g. "3 of 9 PLRs in this BZR are in stage X") — a
    descriptive rollup, *not* a re-scored index.
  - *Not in this ticket:* computing a gentrification-index value at BZR/PGR/Bezirk grain. That is
    a spatial-aggregation methodology decision (MAUP) → its own methodology-bearing follow-up if
    ever wanted.
  - Even the Phase-1 rollup rules (sum-then-recompute, stage-distribution framing) get a geo-DS
    check recorded, since they will be read as statements about areas.
- **Web:** extend the templated route to serve all levels (e.g. `/berlin/area/[code]` keyed by
  `dim_area`, level-aware layout, or `/berlin/[level]/[code]` — web pair decides against the I2
  route-freeze constraint: **no existing route moves**). Breadcrumb to parents on every area page;
  children listed as a ranked table on every parent page. **Crawlability constraint** (see
  `pages/berlin/area-detail.md` header): Evidence discovers templated routes only via real,
  server-rendered `<a>` elements — per-level index tables must render all rows at build time.
- **Hamburg:** same pattern for `district`/`subarea_l1` once H3 (#237) publishes Hamburg; keep the
  implementation city-agnostic so H3's scaffold can adopt it.

## Acceptance criteria
- `dim_area` contains `pgr` with geometry + names; hierarchy model passes tests for both cities
  and both LOR vintages; `uv run poe build` green.
- Profile pages render for every Bezirk, PGR, and BZR; breadcrumbs and child tables link correctly
  in both directions; per-level index pages make all pages crawlable (spot-check build output page
  count per level); clean Evidence build, no route moved.
- No index value is displayed at any grain coarser than PLR; stage information at coarse grain
  appears only as child-area distributions.
- Geo-DS note on the rollup rules + the Ortsteil open question recorded (`I18-geo-signoff.md`).

## Gate / sign-off
Rollup rules and the new spatial level make this **methodology-adjacent**: geo-DS sign-off on the
aggregation/display rules (Verdict: PASS) before integration; domain-expert consulted on what a
BZR/Bezirk profile may *say* (Kurzprofil parity without over-claiming). DE pair for models,
web pair for pages.

## Dependencies / relations
After I2 (#219, routes) and I14 (#231, page template — the level pages reuse the profile layout).
Hamburg part after H3 (#237). I19 (demographics) and I20 (amenity insights) render *into* these
pages — I18 is their structural prerequisite. Architect confirms the WFS PGR layer under ADR-0003.

## References
- Maintainer feedback 2026-07-11 · berlin.de Sozialraum region profile (Boxhagener Platz, BZR) and
  Kurzprofil PDFs — the official model for BZR-grain profiles (see I14 references)
- ADR-0003 (Berlin geographies) · ADR-0005 (city-agnostic core) · `docs/epic-i/I2-route-map.md`
- `transform/models/intermediate/dim_area.sql` · `seed_dim_area_level.csv` ·
  `int_mss_bzr_aggregate.sql` · `web/pages/berlin/area/[code].md`
