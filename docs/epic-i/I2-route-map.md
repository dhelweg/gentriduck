# I2 (#219) — route map: city-folder navigation restructure

**Status:** implemented on `feature/219-i2-city-folder-nav`, pending web-engineer-reviewer.
**Purpose:** freeze the site's route shape so I13 (launch playbook) can declare routes stable
before the noindex/robots block comes off. This is the authoritative "what moved from where to
where" record the ticket asks for.

**Gate:** web-engineer-reviewer only (structure/routing only, no data/model/indicator change —
not methodology-bearing per CLAUDE.md's methodology-gate file list).

> **I21-a (#296) architect ruling — this route map is UPHELD, not superseded.** The I21 site
> restructure (#284) does **not** rename any Berlin route: `/berlin/area/…` stays frozen as recorded
> below, and the target IA is achieved by reorganizing *content* within these routes. The
> city-agnostic area-route shape is confirmed as `/{city}/area/{level}/{code}` (singular) for both
> cities; Hamburg's greenfield area routes are introduced fresh at `/hamburg/area/…` (mirroring
> Berlin), not `/hamburg/areas/…`. I13's "routes frozen (I2)" launch precondition (#230) is
> unchanged. Full reasoning: `docs/epic-i/I21-a-route-ruling.md`. The only future edit this map may
> need from I21 is a redirect-stub row *if* I21-c chooses to merge `/berlin/area-detail` into
> `/berlin/area` (established `poi-price-overview` / `methodology-comparison` stub pattern).

## What changed

Berlin's eight data pages moved from the site's top level into a `/berlin/…` folder, with a new
`/berlin` landing page as the deep-dive entry point. Story/method/about pages (home, thesis-recheck,
methodology, methodology-comparison, how-its-built, how-its-organised, about) stay top-level,
unchanged. `web/pages/hamburg/` was deliberately **not** scaffolded in this ticket — Epic H's
methodology gate for Hamburg hasn't cleared yet, so there is nothing to publish there; when Hamburg
does clear its gate, the same folder pattern established here (`pages/berlin/…` → `pages/hamburg/…`)
is the template to follow, and it can be added at that point without touching Berlin's routes.

## Route map (old → new)

| Page | Old route | New route | Notes |
|---|---|---|---|
| Home | `/` | `/` | **unchanged** |
| Thesis re-check | `/thesis-recheck` | `/thesis-recheck` | **unchanged** |
| Methodology & data sources | `/methodology` | `/methodology` | **unchanged** |
| Methodology comparison | `/methodology-comparison` | `/methodology-comparison` | **unchanged** |
| How it's built | `/how-its-built` | `/how-its-built` | **unchanged** |
| How it's organised | `/how-its-organised` | `/how-its-organised` | **unchanged** |
| About this project | `/about` | `/about` | **unchanged — externally linked, frozen route** |
| *(new)* Berlin landing page | — | `/berlin` | New in this ticket; the city deep-dive entry point |
| Maps | `/maps` | `/berlin/maps` | moved |
| Time series | `/time-series` | `/berlin/time-series` | moved |
| Area detail (district browse) | `/area-detail` | `/berlin/area-detail` | moved |
| All neighbourhoods (index) | `/area` | `/berlin/area` | moved (`pages/area/index.md` → `pages/berlin/area/index.md`) |
| Area detail (per-PLR, templated) | `/area/[code]` | `/berlin/area/[code]` | moved (`pages/area/[code].md` → `pages/berlin/area/[code].md`); still generates one static page per current PLR (542 areas) via the same link-crawl mechanism (Evidence builds whatever route a link points at) |
| POI & Offering Advantage map | `/poi-map` | `/berlin/poi-map` | moved |
| Citywide POI & price/rent overview | `/poi-price-overview` | `/berlin/poi-price-overview` | moved |
| *(future, Epic H gate)* Hamburg landing page | — | `/hamburg` | not built in this ticket — scaffold only when Hamburg's methodology gate clears |

## Sidebar `sidebar_position` scheme

Positions are scoped **per tree level** (Evidence's `Sidebar.svelte` sorts each node's children
independently — see `sortChildrenBySidebarPosition` in
`web/node_modules/@evidence-dev/core-components/dist/organisms/layout/sidebar/Sidebar.svelte`), so
top-level pages and a folder's children no longer share one global numbering space. This removes
the `sidebar_position: 14` collision (`pages/area/index.md` vs. the pre-I1 `pages/poi-map.md`) for
good — the two pages that collided are no longer even at the same tree level, and a repeat requires
two pages in the *same* folder to share a number, not just the whole site.

**Top level** (children of the site root):

| Page | `sidebar_position` |
|---|---|
| Thesis re-check | 10 |
| **Berlin** (folder, label/position set by `pages/berlin/index.md`) | 11 |
| Methodology & data sources | 20 |
| Methodology comparison | 21 |
| How it's built | 22 |
| How it's organised | 23 |
| About this project | 30 |

**Caveat, confirmed against the built sidebar HTML:** `Sidebar.svelte` renders top-level *flat*
pages and top-level *folder* sections in two separate passes (two distinct
`{#each firstLevelFiles as file}` loops — one only renders `file.children.length === 0` entries,
the next only renders `file.children.length > 0` entries), so in the rendered sidebar the Berlin
folder section always appears **after** every flat top-level page (thesis-recheck through about),
regardless of its `sidebar_position` number relative to theirs. Position 11 is kept for
readability/relative-order intent, not because it literally interleaves Berlin between
thesis-recheck and methodology — the same was already true of the pre-I2 `/area` folder (position
14, which never rendered between `/maps` (12) and `/poi-map` (15) either). This is inherent
Evidence behaviour, not a regression introduced by this ticket.

**Under `/berlin/…`** (children of the Berlin folder, scoped independently — order preserved from
the pre-move top-level ordering):

| Page | `sidebar_position` |
|---|---|
| Time series | 1 |
| Maps | 2 |
| Area detail (district browse) | 3 |
| All neighbourhoods (`area` sub-folder, label/position set by `pages/berlin/area/index.md`) | 4 |
| POI & Offering Advantage map | 5 |
| Citywide POI & price/rent overview | 6 |

`pages/berlin/area/[code].md` (the templated per-area route) carries no `sidebar_position` — it is
a dynamic route, not a sidebar entry, same as before the move.

## Internal links updated

Every internal `<a href>` / markdown link and DataTable/AreaMap `link` SQL column pointing at a
moved route was updated to its `/berlin/…` equivalent, across:
- `web/pages/index.md` (home — audience router cards, "Berlin right now" section)
- `web/pages/methodology.md`, `web/pages/methodology-comparison.md`, `web/pages/thesis-recheck.md`
  (top-level pages that cross-link into Berlin's data pages)
- Every moved page's own cross-links to its Berlin siblings
- `web/components/FooterNav.svelte` needed **no change** — it only links to `/`, `/methodology`,
  `/about`, and the GitHub repository, none of which moved.

## Verification

- `npm run sources && npm run build` (Evidence static export), run from a clean `web/build/`,
  completed with **zero** broken internal links — Evidence's static build fails hard on any
  internal `<a href>` (or DataTable/AreaMap `link` column) that 404s during prerender.
- The build's crawled/prerendered output includes one static page per current Planungsraum
  (542 areas) under `web/build/berlin/area/<code>/index.html`, confirming the templated per-area
  route still expands correctly after the move (`find web/build/berlin/area -mindepth 1 -maxdepth
  1 -type d | wc -l` → 542).
- `web/build/` top level, post-clean-rebuild, contains exactly: `about`, `berlin`, `how-its-built`,
  `how-its-organised`, `methodology`, `methodology-comparison`, `thesis-recheck`, plus `index.html`
  (home) and asset dirs (`_app`, `api`, `data`, `geo`) — no stray top-level `maps`/`area-detail`/
  `time-series`/`poi-map`/`poi-price-overview`/`area` directories remain.
- `/about` route is byte-identical in path (`web/pages/about.md` untouched, still resolves to
  `/about`).
- Inspected the rendered sidebar HTML directly (`grep` over `web/build/index.html`): it lists
  `thesis-recheck`, `methodology`, `methodology-comparison`, `how-its-built`, `how-its-organised`,
  `about` as flat top-level entries, then a `Berlin` section with exactly six children (`time-series`,
  `maps`, `area-detail`, `area`, `poi-map`, `poi-price-overview`) in that order, and no Hamburg entry
  anywhere — confirming the folder tree renders correctly with no `sidebar_position` collisions.
- One (pre-existing-style, non-fatal) build warning appears: `Warning in Big Value: Dataset is
  empty...`. This is a `console.warn`, not a build error (exit code 0, `Build complete`); it does
  not block the static export and is out of this ticket's navigation-only scope.
