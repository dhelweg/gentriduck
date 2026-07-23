# I21-a (#296) — Architect ruling: route-literal decision + I2 supersession scope

**Status:** DECIDED. Ruling only — no code, no page moves.
**Author:** system-architect.
**Parent:** I21 (#284) site-restructure; child ticket #296.
**Inputs read in full:** `docs/epic-i/I21-ia-restructure-scoping.md` (data-analyst IA plan),
`docs/epic-i/I21-web-feasibility.md` (web-engineer feasibility note + addendum),
`docs/epic-i/I2-route-map.md` (the frozen route record), plus the live `web/pages/berlin/**` and
`web/pages/hamburg/**` trees and `web/pages/berlin/index.md`/`hamburg/index.md` frontmatter.
**Relation to ADRs:** operates under the existing ADR-0005 (city-agnostic core) and ADR-0024 (OA
hierarchy) umbrella. **No new ADR is warranted** (confirming scoping §10-Q2) — this ticket
introduces no new tool, aggregation method, or grain; it is a routing/content-organization ruling.
Hence a route-map-supersession memo (this file), not an ADR.

---

## The question (#296 exact scope)

Do `/berlin/area-detail` + `/berlin/area` fold into a **new `/berlin/areas` hub** (a route rename,
which would need a superseding entry against the I2-frozen routes and would move I13's "routes
frozen" launch precondition, #230) — **OR** is the target IA (scoping §2.1) achievable by
reorganizing *content* within the existing frozen `/berlin/area/…` routes, with **no rename**?

Plus: confirm Hamburg's new area-hierarchy routes can be introduced fresh without the same
route-freeze consideration Berlin carries.

---

## Decision

### 1. Berlin: KEEP `/berlin/area/…` — no stem rename. Reorganize content in place.

The target IA is achieved by reorganizing **content** within the existing, I2-frozen `/berlin/area/…`
routes. **Do not rename to `/berlin/areas`.** Reasoning:

- **`/berlin/area/` already *is* the area-hierarchy hub.** It holds the crawlable index
  (`/berlin/area`), the PLR canonical pages (`/berlin/area/[code]`), and the per-level subfolders
  (`/berlin/area/bezirk`, `/bzr`, `/pgr`, `/ortsteil`, each with `index` + `[code]`). The scoping
  doc's logical `/{city}/areas/{level}/{code}` sitemap (§2.1, explicitly a *logical* target with the
  route-literal question deferred to me) maps onto the **already-built** `/{city}/area/{level}/{code}`
  literal shape. There is no missing hub to create — only content to consolidate onto pages that
  already exist at their canonical routes (scoping §3's map is overwhelmingly "Stays" / "Extend in
  place").
- **`areas` (plural) vs `area` (singular) is cosmetic.** It delivers no user-visible value that
  justifies breaking the I2 freeze, re-pointing I13's launch precondition (#230), and search-and-
  replacing every internal link + DataTable/AreaMap `link` column across 542 PLR + ~97 Ortsteil +
  ~150 BZR + ~58 PGR + coarse index pages. "Prefer the simplest option that fits; reject scope
  creep" (architect mandate) resolves this cleanly toward no rename.
- **The freeze is a real constraint to honour, not route around.** I2 froze these routes precisely
  as a launch-stability input for I13 (#230). The site is still `noindex` (no external inbound links
  to preserve yet), so a rename would be *mechanically* safe (the feasibility note §9-Q3 confirms
  Evidence's static build fails hard on any unresolved link, so a miss can't silently ship) — but
  "mechanically safe" is not "worth doing." The bar for touching a deliberately-frozen,
  launch-gating route set is a concrete IA benefit, and singular→plural clears no such bar.

**Consequence for the frozen record:** because **no Berlin route is renamed**, I2's route map is
**upheld, not superseded**, for every route it froze. This memo *extends* I2 (records the I21 IA
realization and the Hamburg area-route shape below); it does not move I13's freeze point. I13's
"routes frozen (I2)" launch precondition (#230) stands unchanged.

### 2. The city-agnostic route shape is `/{city}/area/{level}/{code}` (singular) for BOTH cities.

- `{level}` uses each city's own vocabulary term in the URL (`bezirk`/`pgr`/`bzr`/`ortsteil` for
  Berlin; `district`/`subarea_l1`/`subarea_l2` for Hamburg) — matching the existing Berlin pattern
  and the scoping §2.1 recommendation ("each city's own term in the URL"). This is a presentation
  choice; the city-agnostic *core* (dim_city/dim_area, the self-referential `dim_area_hierarchy`
  edge table) is unaffected and remains the single source of hierarchy truth (ADR-0005).
- **Berlin's finest grain (PLR) stays at the existing bare `/berlin/area/[code]`** and its index at
  `/berlin/area` — no `/plr/` segment inserted, no 542-page move. The finest/"default" grain living
  directly under `area/` (with coarser grains namespaced in subfolders) is a legitimate, already-
  shipped shape; regularizing PLR to `/berlin/area/plr/[code]` would be the single most disruptive
  possible move (highest page count, most-linked routes) for the least IA benefit. Do not do it. The
  template-consolidation ticket (I21-f) renders one consistent *template* across the bare-leaf and
  namespaced routes without needing a uniform `{level}` URL segment — the leaf is its own Evidence
  template file regardless (feasibility §1).

### 3. `/berlin/area-detail` consolidation (I21-c): content change, not a rename.

De-duplicating `area-detail` (strip the spotlight that re-pastes the top PLR's profile; keep the
district-browse table, per scoping §3) is a **page-content** change on the existing
`/berlin/area-detail` route. Two acceptable realizations, web-engineer's choice in I21-c:
(a) keep `/berlin/area-detail` as a slimmed browse page, or (b) merge its browse into `/berlin/area`
and leave a **redirect stub** at `/berlin/area-detail` (the established `poi-price-overview.md` /
`methodology-comparison.md` pattern). Either preserves link stability and needs **no I2 supersession**
— a redirect-stubbed consolidation is exactly the I2/I3 pattern, not a route freeze change. If (b)
is chosen, record the stub in I2-route-map.md's redirect list at implementation time.

### 4. Hamburg: confirmed clean slate for the area-hierarchy routes — introduce fresh.

- **No `/hamburg/area/…` routes exist.** Hamburg currently publishes only `/hamburg`,
  `/hamburg/maps`, `/hamburg/poi-map` (H3/#237 cleared PASS-WITH-CONDITIONS since the scoping doc
  was written — the scoping's "Hamburg still gated" assumption in its §4 is now stale; flagged to
  PM). None of these are area-drill-down routes. The area-hierarchy layer I21-g introduces is
  therefore **greenfield** — nothing published to break, so **no route-freeze consideration applies
  to it**. It can be introduced fresh.
- **But Hamburg must mirror Berlin's route shape, not diverge.** Hamburg's existing hubs already
  mirror Berlin literally (`/hamburg/maps`↔`/berlin/maps`, `/hamburg/poi-map`↔`/berlin/poi-map`),
  and city-agnostic discipline (one shape, both cities) requires the area routes do the same.
  **Therefore I21-g's planned `/hamburg/areas/{level}/{code}` (plural) is corrected to
  `/hamburg/area/{level}/{code}` (singular)** — same stem as Berlin. Hamburg's finest published grain
  (`subarea_l2`) may live either at the bare `/hamburg/area/[code]` (mirroring Berlin's bare PLR leaf)
  or namespaced at `/hamburg/area/subarea_l2/[code]`; since no freeze binds Hamburg, this is the
  web-engineer's call in I21-g. **Recommendation:** bare leaf, for exact cross-city symmetry with
  Berlin.

---

## What the downstream tickets inherit from this ruling

- **I21-c** (`area-detail` de-dup): operate on the existing `/berlin/area-detail` route; no rename.
  If you merge the browse into `/berlin/area`, leave a redirect stub and log it in I2-route-map.md.
- **I21-d** (relocate OA/dominance widgets): target pages are the existing `/berlin/area/{level}/{code}`
  routes — no route change needed; you are moving content onto already-canonical routes.
- **I21-f** (template consolidation): build one shared template across the existing
  `/berlin/area/[code]` (bare leaf) and `/berlin/area/{level}/[code]` routes. Do **not** move PLR to
  `/berlin/area/plr/[code]`. Variable-depth breadcrumb comes from `dim_area_hierarchy` (feasibility
  §9-Q1/Q4), not from URL uniformity.
- **I21-g** (Hamburg scaffold): use `/hamburg/area/{level}/{code}` (singular, mirroring Berlin), NOT
  `/hamburg/areas/…`. Clean slate — no freeze consideration. Recommend bare leaf at
  `/hamburg/area/[code]`.
- **I21-j** (docs refresh): **no I2 route-map supersession entry is required** for a rename (none
  occurs). The only I2-route-map.md edit needed is (a) this memo's pointer (added now) and (b), *if*
  I21-c picks the merge-with-redirect option, the new stub row at implementation time.
- **PM note:** the scoping doc's §2.1 sitemap and §4 both say `/{city}/areas/…` and assume Hamburg is
  unpublished — both are now corrected by this ruling (`/{city}/area/…`; Hamburg partially published
  via H3/#237). Downstream tickets should follow this memo where it and the scoping doc differ on the
  route literal.
