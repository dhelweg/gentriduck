[I20] Human-relevant amenity insights — dominant restaurant types, everyday infrastructure, mover persona

## Why (problem)
Maintainer feedback (2026-07-11): the pages must stop spamming every area with equally-weighted,
uninteresting POI counts ("number of benches") and instead **show detail where it matters and
what is of interest for humans** — which kinds of restaurants dominate an area, where the
schools, doctors, and everyday infrastructure are. That serves a deliberate **new user group for
GentriMap: people deciding where to move**, alongside the existing policy/research/data
audiences. Today the POI taxonomy (`seed_poi_canonical_category` / `seed_poi_mapping`) rolls
everything into index-oriented categories; human-salient attributes like `cuisine` are not
retained, and the pages render undifferentiated counts.

## Goal
Area pages answer the questions a human — especially a prospective mover — actually has: what
kind of food/retail scene dominates here, is everyday infrastructure (schools, kindergartens,
doctors, pharmacies, supermarkets, playgrounds, transit) present, and how does that compare to
the district — with low-signal categories removed from default views.

## Scope & approach
- **Data — retain human-salient OSM attributes:** extend the OSM POI ingestion/staging to carry
  `cuisine` (restaurants/cafés/fast food) and the everyday-infrastructure tags
  (`amenity=school|kindergarten|doctors|dentist|pharmacy`, `shop=supermarket`,
  `leisure=playground`, `public_transport=station|stop_position` — final list with the
  data-analyst). Same Overpass/OSM source under ADR-0002 — architect confirms no new
  source/ADR; snapshot-based like existing POI ingestion.
- **Data — display mart:** `mart_area_amenities` (per area × I18 level): counts/densities for the
  infrastructure categories and a **dominant-cuisine / dominant-gastro-type summary** (top-N with
  shares). **Display-only — explicitly not an index input**; no change to POI seeds' index
  columns, weights, or `int_poi_status_dynamism` (keeps this off the R-C1 index path).
- **Content — curation rules ("detail where it matters"):** data-analyst defines and commits
  `docs/epic-i/I20-poi-curation-rules.md`: which POI facts appear at which level, interestingness
  thresholds (e.g. dominant cuisine only where n ≥ threshold; suppress categories below a floor),
  which categories are demoted from default views (street furniture, benches, and their kin —
  full data stays available in tables/downloads, just not headline). Applied to the area profile
  pages and the POI overview page.
- **Persona:** add a "prospective mover / relocating household" persona to the I9
  audience-channel map (#226) with reach definition in the I12 loop (#229) (e.g. area-profile
  visits via campaign-tagged links).
- **Ethics framing (hard requirement):** a gentrification observatory that advises movers can
  become a gentrification *accelerant* (steering demand into "up-and-coming" areas) — exactly
  what the project critiques. Domain-expert gates the mover-facing framing: the site informs
  ("what is this area like, what is changing"), it does **not** recommend or rank areas to move
  to; no real-estate-portal language. OSM completeness bias for schools/doctors (well-mapped vs
  poorly-mapped areas) stated as a caveat next to the block; geo-DS consulted on whether counts
  need a completeness disclaimer per category (official directories, e.g. the Berlin school
  registry, noted as a possible future cross-check ticket — not in scope). **(Follow-up now tracked: #270 (I20-school-xcheck) — see `docs/planning/deferred-work-audit-2026-07/README.md`.)**

## Acceptance criteria
- Ingestion retains the agreed tags; `mart_area_amenities` built + tested; `uv run poe build`
  green; index outputs byte-identical before/after (proves display-only — leakage-guard style
  check committed).
- Area profile pages show dominant gastro types + everyday-infrastructure block per curation
  rules; bench-class categories absent from default views; comparison to district present;
  completeness caveat rendered; clean Evidence build.
- Curation-rules doc + persona addition to the I9 map committed.
- Domain sign-off on mover framing (`I20-domain-signoff.md`, Verdict: PASS) before integration;
  geo-DS completeness note recorded.

## Gate / sign-off
Domain-expert framing gate (enforced) + geo-DS completeness consult. DE pair for
ingestion/mart, data-analyst for curation, web pair for pages. Not index-methodology-bearing by
construction (see display-only requirement + identity check).

## Dependencies / relations
After I14 (#231, profile template) and I18 (levels — PLR-grain can land first). Persona work
touches I9 (#226) / I12 (#229) artifacts. Shares the no-stat-spam principle with I19. Architect
confirmation under ADR-0002 for the added tags.

## References
- Maintainer feedback 2026-07-11 · ADR-0002 (OSM sourcing) · `seed_poi_canonical_category.csv`,
  `seed_poi_mapping.csv`, `seed_poi_offering_relevance.csv` · `docs/epic-i/audience-channel-map.md`
- OSM wiki: `cuisine`, `amenity` keys (tag semantics)
