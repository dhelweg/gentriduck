# I21 (#284) — Evidence.dev structural feasibility note

**Status:** scoping only. No page moves, no implementation. Companion to the data-analyst's
`docs/epic-i/I21-ia-restructure-scoping.md` (IA/content plan) — this file is the web-engineer's
separate structural-feasibility read so that plan rests on what Evidence.dev can actually build.

**Access note (please read before trusting this doc's issue framing):** this session had no
working `gh` CLI and the GitHub API returned "GitHub access is not enabled for this session" for
every attempt (`curl https://api.github.com/repos/.../issues/284` → 403-class error). I could not
read #284's issue body or its amendment comment directly, and `docs/epic-i/I21-ia-restructure-scoping.md`
does not exist yet in this checkout (not on `develop`, not on any fetched branch) — so I could not
cross-read the analyst's plan either. Everything below is grounded instead in: the task brief's own
paraphrase of #284 (six numbered asks, the "multi-city from the start" amendment, the #237/
`published_cities` two-track dependency), `docs/epic-i/I2-route-map.md`, the live `web/pages/`
tree, `web/components/`, ADR-0005, ADR-0012, and — critically — **the installed Evidence.dev
source** (`web/node_modules/@evidence-dev/**`, installed fresh via `npm ci` for this scoping pass
since it wasn't present in the checkout; this let me read the actual route-copy and
sidebar-manifest code rather than reason from docs alone, and I could not reach
`docs.evidence.dev` from this sandbox either — proxy 403). If the real #284 text differs from the
task brief's paraphrase in some material way, re-check this note's premises before relying on it.

## Summary of top findings (read this first)

1. **Per-level templated pages already exist and work** — not as one generic template, but as
   **five separate per-level template files** (`bezirk/[code]`, `bzr/[code]`, `pgr/[code]`,
   `ortsteil/[code]`, `area/[code]` for PLR). The mechanism (`index.md` + `[param].md`, discovered
   by link-crawl) is proven at scale (542 PLR pages). A single generic `/[city]/[level]/[code]`
   template is *possible* for the three structurally-identical levels (bezirk/bzr/pgr) but is a
   medium-cost, marginal-benefit refactor, not a slam dunk — see §1.
2. **The biggest concrete finding: a naive `/[city]/…` folder for the whole Berlin subtree
   (maps, time-series, area-detail, etc.) would silently delete that entire subtree from the
   sidebar navigation** — not just the templated leaf pages (which already have no sidebar entry
   today, by design) but every literal page nested under it too. This is a hard mechanical fact of
   Evidence's `pagesManifest` builder (`_buildPageManifest`), verified by reading the source
   directly (see §2). It is the load-bearing constraint the analyst's IA plan must design around.
3. The **drill-down/templated layer** (`[code]`-style pages, ~95% of the site's page count) has
   **zero sidebar cost** today (by existing, established convention — "dynamic route, not a
   sidebar entry"), so that whole layer can adopt a shared `/[city]/…` parameterized route **right
   now, for free**, with no navigation regression. The duplication risk the #284 amendment worries
   about is concentrated in a *small, bounded* set of ~8 sidebar-visible "hub" pages per city, not
   the exploding-cardinality area tree.
4. Berlin's per-level hierarchy derivation (Bezirk/BZR/PGR/Ortsteil via `substr()` on a LOR area
   code) is **Berlin-specific business logic**, not just a `city_code` literal to swap out.
   Hamburg's own hierarchy shape (`dim_city.oa_leaf_area_level = 'subarea_l2'`) is named
   differently and is not known by me to nest the same way — routing/templates are reusable,
   the *SQL that derives parent/child relationships* is not a drop-in, and that's the analyst's +
   geo-DS's problem, not mine, but it bounds what "one shared template" can mean for anything above
   the leaf grain.
5. `published_cities` (a dbt var, `transform/dbt_project.yml`) already gates Hamburg out of
   `gentrification_index` / `fct_gentrification_change` / `fct_gentrification_trajectory` at the
   **mart layer** — so link-emitting queries built on those marts degrade to zero Hamburg rows
   automatically, no web-side "if published" branch needed. But **not every mart uses this
   filter** — some (`mart_area_demographics`) hardcode `city_code = 'BER'` outright, others
   (`dim_area_geometry`) union whatever city sources exist with no publish gate at all, and
   `dim_city` itself already lists Hamburg's row unconditionally. A page that enumerates cities
   from `dim_city` directly (e.g. a city-picker) would leak Hamburg before its gate clears — flag
   this concretely for the analyst: **city-selector queries must go through a
   publication-filtered source, never `dim_city` alone.**

## 1. Templated per-level pages: one template vs. per-level templates

**What's proven today:** Evidence's "templated pages" pattern (`index.md` + `[param].md` in the
same folder; documented at `docs.evidence.dev/core-concepts/templated-pages/`, referenced in-repo)
is exactly what powers `web/pages/berlin/area/[code].md` (542 PLR pages) and four more coarse-grain
siblings: `web/pages/berlin/area/bezirk/[code].md`, `.../bzr/[code].md`, `.../pgr/[code].md`,
`.../ortsteil/[code].md`. These are **five distinct template files**, not one generic template
branching on a `level` param — I read all five; bezirk/bzr/pgr are near-identical in shape (same
demographics block, same MSS-estimate block, same stage-mix bar, same "children" table, differing
only in `area_level` filter string, `substr(area_code, 1, N)` depth, and which mart/table the
children link into), while `ortsteil` and the PLR page (`area/[code].md`) are genuinely different
(Ortsteil uses a dominant-overlap crosswalk instead of a code-prefix `substr()`, with an explicit
zero-children enclave guard; the PLR page carries the full narrative profile — portrait, OA radar,
amenities, land value/rent — none of which the coarser levels have).

**Mechanism, verified from source, not docs:** I installed `web/node_modules` (not present in the
checkout) and read `@evidence-dev/sdk`'s `copyMethods/sveltekit.js`. Evidence's build literally
copies every `pages/**/*.md` file into a real SvelteKit route tree
(`src/routes/(evidence-pages)/<same relative path>/+page.md`), one-for-one. That means:
- **Route nesting depth is unbounded** — it's just SvelteKit's native file-based routing, so
  `/[city]/[level]/[code].md` or `/[city]/area/[code].md` are both structurally supported; there is
  no Evidence-specific limit on how many `[param]` segments a route can carry or where they sit.
- **Discovery is pure link-crawl, not a static-paths query.** `svelte.config.js` uses
  `@sveltejs/adapter-static` with `strict: false` and no explicit `entries`/`crawl` override
  (adapter-static's crawl-from-real-links default), and the root layout sets
  `export const prerender = …` globally. There is no `getStaticPaths`/`entries()` mechanism
  anywhere in this stack — a dynamic route only gets a static HTML file if something else,
  already-rendered, links to it with a real `<a href>` at build time. This matches every existing
  in-repo comment on the subject ("Evidence builds whatever route a link points at; there is no
  separate static-paths query") — I confirmed it's literally true of the underlying framework, not
  just repo convention.

**Scaling the crawl to all levels × both cities:** today's crawl chain is
`area/index.md` (542-row table) → PLR pages; `bezirk/index.md` (12-row table) → Bezirk pages, whose
"children" tables link → PGR pages, whose children tables link → BZR pages; `ortsteil/index.md`
(97-row table) → Ortsteil pages. Every level needs **one real, server-rendered listing/index page**
somewhere upstream that emits a full set of `<a href>`s for that level — this is the actual scaling
mechanism, and it already works. Extending it to Hamburg is mechanically identical: whatever
listing page enumerates Hamburg's areas needs to exist and be reachable; if its underlying query
returns zero rows (because Hamburg isn't in `published_cities` yet, or its geometry/hierarchy marts
aren't populated), it emits zero links and the crawl simply never reaches those routes — no broken
build, no 404s, just absence. This is the same graceful-degradation shape the amendment asks for,
and it requires no new mechanism, only correctly-scoped SQL in each listing page (analyst's job).

**Cost read — collapsing bezirk/bzr/pgr into one `/[city]/[level]/[code]` template:**
technically feasible (interpolate `${params.level}` into the `where area_level = '${params.level}'`
clause and a `CASE params.level WHEN … END` for `substr()` depth and the "up"/"children" link
targets, same pattern already used for `${params.code}` everywhere). **Medium cost, not cheap**:
Evidence markdown pages are mdsvex + inline SQL fences, not a full templating language — a single
file juggling 3 levels' worth of conditional children-queries, up-links, and titles risks becoming
harder to reason about than three small, clean files (this is a real trade-off, not a
recommendation either way — flagging it as a call for the analyst/architect, not something I'm
deciding here). Ortsteil and PLR should very likely stay separate templates regardless — they are
structurally and narratively distinct, not boilerplate.

## 2. Multi-city from the start: `/[city]/…` vs. per-city folders (CRITICAL per the amendment)

This is the one finding in this note I'd flag as load-bearing enough to change the analyst's plan.

**What I verified, directly in the framework's own manifest-builder** (not inferred —
`@evidence-dev/evidence/template/src/pages/api/pagesManifest.json/+server.js`,
`_buildPageManifest()`): the sidebar's `fileTree` is built by walking every `.md` file's path and,
for each path segment, only assigning a `label` if that segment doesn't contain `[`, and only
assigning an `href` to the page node **if the *entire accumulated path string* contains no `[`
anywhere in it** — not just the leaf filename, the whole ancestor chain. `Sidebar.svelte`'s
`deleteEmptyNodes()` then recursively prunes any node whose own `label` and `href` are both
undefined — checked at the node's own level, in its parent's iteration, independent of whether that
node has surviving descendants.

I traced this against the *existing, already-verified* case to make sure I had it right:
`web/pages/berlin/area/[code].md` — the `[code]` node itself has `label`/`href` both undefined and
gets pruned (matching the repo's own comment, "dynamic route, not a sidebar entry"), while `area`,
`berlin` survive because *their own* path segments carry no bracket. That's the safe case: the
bracket is a **leaf**.

Now trace a naive `/[city]/maps.md` (i.e. renaming `pages/berlin/` to `pages/[city]/` wholesale, as
a literal reading of "one city-agnostic template set" might suggest): the `maps` node itself gets a
`label` ('maps', its own segment has no bracket) but **no `href`**, because the full path
`[city]/maps/+page.md` contains a `[` from its ancestor. `maps` survives `deleteEmptyNodes` (it has
a label) but is **unclickable** — worse, when `deleteEmptyNodes` walks the `[city]` node itself (at
the root's level), `[city]`'s own `label` and `href` are *both* undefined, so `[city]` — and
everything under it, including `maps`, `time-series`, `area-detail`, etc. — is deleted from the
tree wholesale. **The entire Berlin (or Hamburg) sidebar section would vanish**, not degrade to
flat unlabelled links — it disappears completely. I2's own verification (`docs/epic-i/I2-route-map.md`)
explicitly confirms the *current* `/berlin/…` literal-folder sidebar section renders correctly with
"exactly six children" — that's precisely the structure a naive `[city]` rename would break.

**Conclusion: any page that needs to appear in the left-hand sidebar must live under a
literal, bracket-free folder name** (`berlin/`, `hamburg/`, or whatever the analyst's IA calls
them) — Evidence's own routing mechanics rule out a fully parameterized ancestor segment above
navigable pages, full stop, not a stylistic preference.

**But this only bites the sidebar-visible layer.** The site's actual page-count is dominated by the
templated drill-down tree (`[code].md` at every level), and *that* layer already has **no sidebar
cost today** — it was deliberately built with no `sidebar_position`, reached only via crawled
in-page links, breadcrumbs, and search tables. Converting that whole layer to
`/[city]/area/[code].md`, `/[city]/area/bezirk/[code].md`, etc. costs **nothing** in navigation,
because there's no navigation to lose. This is good news buried in a mechanical constraint: the
amendment's "don't duplicate the tree" goal is fully achievable for ~95% of the page count (every
`[code]`-templated page, current + future Hamburg) with zero duplication and zero UX regression —
the duplication concern only has teeth for the small set of **sidebar-visible hub pages**
(`maps.md`, `time-series.md`, `area-detail.md`, `area/index.md`, `poi-map.md`,
`poi-price-overview.md`, and the city landing page itself — 7 pages today, per I2's route map).

**Two concrete options for those hub pages, given the sidebar constraint:**

- **(A) Keep literal per-city folders for hub pages** (today's I2 pattern, extended to Hamburg by
  copy — exactly what I2's own doc already names as "the template to follow"). Simple, proven,
  sidebar works. Cost: genuine duplication at the *file* level, though the amount of duplicated
  *logic* can be minimized by factoring shared page-body markup/SQL fragments into
  `web/components/` Svelte components parameterized by a `city` prop (the same pattern `<Hero>`/
  `<LinkCards>` already establish) — the literal per-city `.md` files become thin wrappers around a
  shared component rather than fully independent hand-copies. This is buildable now, is squarely
  within my (web-engineer) ownership, and doesn't need a new tool/ADR.
- **(B) A build-time codegen step:** author each hub page **once** as a template with
  `{{CITY_CODE}}`/`{{CITY_SLUG}}` placeholders, and a small Node prebuild script (same style as the
  existing `web/scripts/postbuild-noindex.mjs` / `postbuild-analytics.mjs` — pure JS, no new
  dependency, cross-platform per ADR-0012) stamps out `pages/berlin/maps.md`,
  `pages/hamburg/maps.md`, etc. from one source before `evidence build` runs. This gets literal,
  sidebar-visible per-city files (satisfying the mechanical constraint above) from a single
  authored source (satisfying the amendment's intent). It's a genuinely new *mechanism* (codegen),
  not a new *tool/library* — I don't think it needs a fresh ADR under CLAUDE.md's "new tool or
  library" gate, but flagging it for a quick architect nod is cheap insurance since it's a
  structural precedent, not just a component.
- Either way, **`/[city]/…` as a literal route prefix should be reserved for the non-sidebar
  drill-down layer**, where it's free; the sidebar-visible hub layer needs one of the above, not a
  bare parameterized folder.

**Rendering gracefully pre-publish:** for both options, an unpublished city's hub page/section can
either (a) not exist yet as a file at all (today's approach — I2 explicitly did *not* scaffold
`pages/hamburg/`), or (b) exist but have every listing query filtered through a
publication-gated mart so it legitimately renders an empty/hidden state — the site already has this
exact pattern live (`hasChildren`-style guards, e.g. the Ortsteil page's `child_count` gate)
producing an honest empty-state `<Alert>` instead of a broken page. Either is mechanically sound;
which one the analyst wants (invisible vs. visible-but-empty) is an IA call, not a technical one —
flagging both as available.

**Hierarchy-shape caveat (bounds what "shared template" can mean above leaf grain):** Berlin's
bezirk/bzr/pgr/ortsteil pages derive parent/child relationships via `substr(area_code, 1, N)` on
Berlin's LOR code — a Berlin-specific fact, not a generic city-agnostic rule. `dim_city.oa_leaf_area_level`
is `'subarea_l2'` for Hamburg (`HH`) vs `'plr'` for Berlin, per `transform/seeds/seed_dim_city.csv` —
different naming, and I have no evidence Hamburg's hierarchy nests via the same
"N leading characters of the code" trick. A shared `/[city]/[level]/[code]` template's *routing*
would work fine for Hamburg; its *SQL* (the `substr()`-based parent/child derivation) would not be
portable without Hamburg's own equivalent crosswalk logic — squarely the analyst's/geo-DS's problem
per ADR-0005's "city-specific quirks stay in the adapter" principle, but it means "one template
renders every level for both cities" is **not** simply a `city_code` swap once you're above the
PLR-equivalent leaf grain.

**Publication-filter footnote:** `published_cities_filter()` (`transform/macros/published_cities_filter.sql`)
already gates `gentrification_index`, `fct_gentrification_change`, and `fct_gentrification_trajectory`
to `["BER"]` today (`transform/dbt_project.yml`) — any web query against those three marts is
automatically Hamburg-empty until the var flips, no web-side branch required. This is **not**
universal: `mart_area_demographics.sql` hardcodes `where city_code = 'BER'` directly (not var-driven,
Hamburg parity explicitly deferred per its own header comment), `dim_area_geometry.sql` unions
whatever per-city source CTEs exist with no publish gate visible in what I read, and
`seed_dim_city.csv` already lists Hamburg (`HH`) unconditionally. **Any new city-picker/city-card
component must source its city list from a publication-filtered mart, never `dim_city` directly**,
or it will list Hamburg before its gate clears — a concrete implementation note for whoever builds
that component (me, per "component" ownership) once the analyst's IA calls for one.

## 3. Progressive disclosure & sub-pages

Checked the installed `@evidence-dev/core-components` package directly (not docs, which I couldn't
reach): `<Accordion>`/`<AccordionItem>`, `<Details>` (native `<details>`/`<summary>` wrapper), and
`<Tabs>`/`<Tab>` are all genuinely exported from the package's public barrel
(`atoms/index.js` → `./accordion`; `unsorted/ui/index.js` → `Details`, `./Tabs`) — confirmed by
reading the barrel files, not assuming from filenames. They're picked up by Evidence's
`sveltekit-autoimport`-based `injectComponents()` preprocessor exactly the way `<Alert>`,
`<BigValue>`, `<DataTable>` already are in every page in this repo — no new import syntax, no new
dependency, they "just work" if used in markdown today.

**Cheap / idiomatic:**
- **Above-the-fold summary + detail-below** is exactly what the PLR profile page
  (`web/pages/berlin/area/[code].md`) already does today: a portrait block first, then successive
  `##` sections for demographics/amenities/status/POI/OA/rent, each independently guarded with
  `{#if}` for sparse-data cases. This pattern generalizes directly to any coarser level.
- **`<Details>`/`<Accordion>`** for "click to expand" secondary detail (e.g. a caveat block, a
  full indicator table) is a straight drop-in — no new component needed, same idiom as
  `<Alert status="info">` already used everywhere.
- **`<Tabs>`** for switching between, say, "status view" / "raw indicators view" at the same grain
  is available and would replace ad-hoc script-driven toggle logic if the analyst wants that
  pattern — cheap to try.
- **Linked sub-routes (drill-down)** is already the dominant idiom on this site (PLR → BZR → PGR →
  Bezirk → city, each with an "Up:" link and a "children" table) and is the cheapest, most
  crawl-friendly progressive-disclosure mechanism available, because it's just more static pages,
  not client-side state — favor this over client-heavy tab/accordion state for anything that should
  itself be a shareable, indexable URL (a sub-page has a URL; a tab pane's open/closed state does
  not, post-JS-hydration nuances aside).

**Fights the framework:** anything requiring server-side conditional rendering keyed on
request-time state (there is none — it's a static export), or a dynamic paths list independent of
a crawlable link (Evidence has no `getStaticPaths`/`entries()` escape hatch — confirmed above,
not merely undocumented). Client-only, JS-driven route generation (e.g. a canvas-rendered map's
click targets, like the existing `AreaMap`) is **not** crawlable and must always be paired with a
real, server-rendered link elsewhere (exactly why `area/index.md`'s 542-row table exists — its own
header comment says so directly) — this constraint is unchanged by the restructure and applies
equally to any new drill-down surface the analyst adds.

## 4. Sidebar-per-level navigation for a deeper hierarchy

Already proven, not hypothetical: `docs/epic-i/I2-route-map.md` documents that `sidebar_position`
is scoped **per folder**, independently at each tree level (`Sidebar.svelte`'s
`sortChildrenBySidebarPosition` recurses per-node), which is exactly what removed the pre-I2 global
`sidebar_position: 14` collision. A deeper hierarchy (say, an explicit `/berlin/area/bezirk/`
sidebar section, distinct from `/berlin/area/`) works the same way — each folder's own `index.md`
frontmatter sets that folder's own label/position, scoped only to its siblings. The one caveat
already documented and re-confirmed by my reading of the source (§2 above): **only literal,
bracket-free folders get a sidebar node at all** — a deeper hierarchy is free to add as many
literal nested folder levels as the IA wants, but every `[param]` segment (and everything nested
under it) is invisible to the sidebar by construction. Plan the sidebar tree entirely in terms of
literal folders; treat every `[param]` segment as sidebar-invisible by default, not as something to
configure away.

## 5. OA-at-higher-levels: rendering feasibility

Purely the "can the same components show it" question, not the aggregation-correctness question
(analyst's + R-C1's). Answer: **yes, and this is already proven**, not hypothetical. The Bezirk,
BZR, and Ortsteil coarse-profile pages already render `<BarChart>`, `<BigValue>`, and `<DataTable>`
against coarser-grain marts (`mart_area_demographics`, `mart_mss_area_aggregate`,
`fct_poi_development` grouped by district) using the exact same Svelte components the PLR page
uses. None of `web/components/`'s shared components (`Hero`, `ChapterLabel`, `LinkCard`,
`LinkCards`, `FooterNav`, `Timeline`) contain any area-level-specific or city-specific logic — they
are generic wrappers around markup/layout. The PLR page's OA radar specifically uses Evidence's
bundled `<ECharts>` primitive (no radar chart is a first-class Evidence chart type) reading
`mart_poi_offering_advantage_map`; that mart is already queried filtered by `area_level` at other
call sites in this codebase (e.g. `mart_poi_offering_advantage_map` isn't literally shown at
non-PLR grain today, but `mart_poi_oa_arealevel` exists as a source and the PLR page's own radar
query pattern — filter by `area_code`/`area_level`, group by domain — would port to a Bezirk-grain
row with zero component changes if the mart provides one). The rendering layer is not the
constraint here; whether the underlying OA aggregation is *methodologically valid* at Bezirk/BZR
grain (compositional ratios don't always aggregate the same way sums do) is explicitly out of my
scope and belongs to the analyst + geo-DS.

## 6. Cost read (cheap vs. expensive, by piece)

| Piece | Cost | Notes |
|---|---|---|
| Extend `[code]`-style templated drill-down pages to `/[city]/…` | **Cheap** | No sidebar cost today (already true); routing/crawl mechanism already proven at 542-page scale; mechanical `${params.city}`-style interpolation, same pattern as `${params.code}` everywhere. |
| One shared `/[city]/[level]/[code]` template collapsing bezirk/bzr/pgr | **Medium** | Technically feasible; real risk of an unwieldy single file with 3-way conditional SQL; Ortsteil/PLR should stay separate regardless (real structural differences, not boilerplate). Judgment call for analyst/architect, not a clear win either way. |
| Literal per-city hub-page folders (option A, §2) | **Cheap–Medium** | Proven pattern (I2's own plan); duplication risk reduced by factoring shared logic into `web/components/` Svelte components; still N literal files per city, small N (~7-8). |
| Codegen'd per-city hub pages from one template (option B, §2) | **Medium** | New mechanism (a prebuild Node script), not a new tool/dependency; matches existing `web/scripts/*.mjs` postbuild precedent; worth a quick architect nod since it's a structural pattern, not just a component. |
| `/[city]/…` as a literal ancestor above **sidebar-visible** pages | **Do not do — breaks navigation** | Verified mechanically in `_buildPageManifest`/`deleteEmptyNodes`: deletes the entire subtree from the sidebar, not just the templated leaf. This is the one hard "no" in this note. |
| Progressive disclosure via `<Details>`/`<Accordion>`/`<Tabs>` | **Cheap** | Confirmed genuinely exported, auto-imported the same as every other core component already used; no new dependency. |
| Progressive disclosure via more linked sub-routes | **Cheap, and preferred for anything that should have its own shareable URL** | Already the dominant, proven idiom on this site. |
| Coarser-grain OA/demographics rendering (components) | **Cheap** | Components are already generic; coarse-grain marts already exist and are already rendered this way for other indicators. Aggregation correctness is not a rendering-cost question — analyst/R-C1 territory. |
| City-picker/city-list UI sourced correctly (not leaking unpublished cities) | **Cheap, but easy to get wrong** | Must query a `published_cities`-filtered mart, not `dim_city` directly — `dim_city` already contains Hamburg unconditionally. |

## What I did not attempt

Per the task's own scoping instructions, I did not run a full Evidence build (`npm run sources &&
npm run build`) — a real build additionally requires a live DuckDB warehouse with the exported
marts present (`poe export-serving`), which depends on the dbt pipeline / spatial-extension egress
this sandbox may not have; I didn't attempt it since a green build isn't needed for a feasibility
read and I didn't want to risk a long, possibly-failing build as a distraction from the actual
question. I *did* run `npm ci` inside `web/` (841 packages, clean) specifically so I could read the
real, installed Evidence.dev source rather than reason from repo comments alone — that succeeded
and is what grounds §§1–3 above. I made no commits and moved no pages.

## Addendum — direct answers to the analyst's §9 (this scoping doc landed mid-pass)

`docs/epic-i/I21-ia-restructure-scoping.md` (data-analyst's plan) appeared in the working tree
partway through this pass — I'm evidently running on the same branch it was authored from
(`claude/open-issues-blockers-nhgckv`, currently 51 commits ahead of `develop`, unmerged), which
also means the OA-D marts/pages it references (`mart_poi_oa_arealevel`, `mart_poi_oa_methods`,
`mart_poi_dominance`, `/methodology-oa-modes`, `/reference/area-hierarchy`, `/reference/poi-taxonomy`)
were already sitting in `web/pages/`/`web/sources/` and I read them for this addendum. I did not
edit that file. Its §9 poses five pointed web-engineer questions; direct answers, grounded in the
same source-reading as above:

**§9-Q1 (one shared `AreaPage` template over `{city, level, code}` + variable-depth breadcrumb, or
forced per-level duplication?)** Not forced into duplication by routing — confirmed in §1/§2 above,
route nesting depth is unbounded and these are all non-sidebar leaf pages (zero sidebar cost either
way). The variable-depth breadcrumb specifically has a clean answer: `dim_area_hierarchy.sql`
already produces a generic **self-referential edge table** — one row per
`(city_code, area_level, area_code)` with `parent_area_level`/`parent_area_code` columns, covering
Berlin's 4-rung LOR ladder *and* Hamburg's 2-resolved-rung chain via the same shape (I read the
model directly: it's a single `UNION ALL` of per-edge CTEs, not two separate schemas). A breadcrumb
component can walk this with one recursive CTE (DuckDB supports `WITH RECURSIVE`) keyed on
`(city_code, area_level, area_code)` and render however many rows come back via a plain
`{#each}` loop — **the variable depth lives in the data, not in per-city template branches**. This
is a clean, buildable, city-agnostic pattern; whether it's *one* markdown file or several sharing
this one breadcrumb query/component is the same medium-cost judgment call as §1's bezirk/bzr/pgr
question — my answer doesn't collapse to a single yes/no on file count, but the breadcrumb/hierarchy
problem specifically has a genuinely clean, low-cost solution.

**§9-Q2 (relocating `/methodology-oa-modes`'s live §2/§4/§5 widgets onto area pages — mechanical
copy-and-reparametrize, or real rework?)** **Real rework, not mechanical** — I read the actual
widgets. They are driven by Evidence's `<Dropdown>`/`inputs` mechanism
(`${inputs.methods_bezirk.value}`, `${inputs.scale_domain.value}`, `${inputs.dom_group.value}`,
etc.) — a **client-side reactive re-query**: one static page, DuckDB-WASM re-runs the SQL in-browser
whenever the visitor changes a dropdown, no rebuild/new route involved. The templated area pages use
an entirely different mechanism — `${params.code}`, a **build-time route parameter**: one
prerendered static page per crawled value, resolved once at build time, no client-side re-query.
Relocating a widget from one mechanism to the other means rewriting its parametrization, not copying
its SQL block: e.g. `where area_level = '${inputs.scale_level.value}'` (visitor-chosen, any value,
one page) becomes `where area_level = '${params.level}' and area_code = '${params.code}'`
(build-time-fixed per page, many pages) — same underlying mart, genuinely different wiring, plus the
chart/table markup around it typically assumes a user-adjustable dropdown context (e.g. captions
like "for the district selected above") that needs rewriting for a fixed-area page. Budget this as a
real (if bounded, one-widget-at-a-time) engineering task, not a copy-paste.

**§9-Q3 (is a `/berlin/area-detail` + `/berlin/area` → `/berlin/areas` rename safe under the
static-build link-crawl discipline, or does it need a redirect-stub strategy at 542+97+~150+58+12-page
scale?)** Safe, and already precedented at comparable-or-larger scale: I2's own migration (documented
in `docs/epic-i/I2-route-map.md`) moved eight pages including the exact same 542-page PLR tree and
verified **zero broken internal links** post-move, because Evidence's `adapter-static` build
**fails hard** on any internal `<a href>` (or `DataTable`/`AreaMap` `link` column) that doesn't
resolve during prerender — that's not a manual check, it's the build's own safety net, and I
confirmed the underlying mechanism (`adapter-static`, `strict: false`, crawl-based discovery) is
unchanged since I2. A rename needs every internal link/DataTable `link` column search-and-replaced
(mechanical, and the build will *catch* any miss, not silently ship it) — that's real but bounded
work, not a structural risk. **Redirect stubs are a separate, lower-priority concern**: the site is
still `noindex` today (confirmed in `web/scripts/postbuild-noindex.mjs` and the README's own status
line — "soft-launched (noindex)... Cloudflare Pages primary host is finalised"), so there are no
externally-indexed inbound links yet to preserve. The existing redirect-stub pattern
(`poi-price-overview.md`, `methodology-comparison.md`) is a nice-to-have for any URL that may have
been shared manually, not a hard requirement the way it would be post-launch.

**§9-Q4 (can the breadcrumb/hierarchy-nav render "no parent link yet" cleanly without per-city
special-casing, given the PGR asymmetry and Hamburg's missing edge?)** Yes, for the same reason as
Q1: since the breadcrumb is data-driven off `dim_area_hierarchy`'s edge rows, a missing edge (e.g.
Hamburg's unresolved `subarea_l1 ← subarea_l2`) is simply an **absent row** — the recursive walk
stops one rung short and the component's own "no further parent" case (which it needs anyway, for
the top of *any* hierarchy, Bezirk/district) renders once, with an honest label sourced from
`reference/area-hierarchy.md`'s own disclosed framing ("this edge isn't resolved yet"), not a
per-city `if (city === 'hamburg')` branch. This is a case where the ADR-0005 self-referential
`parent_area_id`/generic-`level` design is doing real work — the web layer doesn't need to know
*why* a parent is missing, only that it is.

**§9-Q5 (are `mart_poi_oa_arealevel`/`mart_poi_oa_methods`/`mart_poi_dominance` already
source-registered for Evidence?)** **Confirmed yes** — `web/sources/gentriduck_marts/mart_poi_oa_arealevel.sql`,
`mart_poi_oa_methods.sql`, and `mart_poi_dominance.sql` all exist in this checkout already (same
branch). I did not verify their query correctness or that a `poe export-serving` run would actually
populate them (no live warehouse in this sandbox — see "What I did not attempt" above), only that
the Evidence-side source-registration plumbing is in place.

## Files read/consulted (for the reviewer's convenience)

- `docs/epic-i/I2-route-map.md` (frozen route shape, sidebar_position scheme, link-crawl mechanism)
- `web/pages/berlin/**` (all five per-level templates, `berlin/index.md`, `berlin/area/index.md`)
- `web/components/*.svelte` (all six shared components — confirmed none are area/city-specific)
- `docs/adr/0005-city-agnostic-data-model.md`, `docs/adr/0012-serving-and-hosting-stack.md`
- `transform/macros/published_cities_filter.sql`, `transform/dbt_project.yml` (published_cities var)
- `transform/seeds/seed_dim_city.csv`, `transform/models/marts/mart_area_demographics.sql`,
  `transform/models/marts/dim_area_geometry.sql` (publish-gating footnote)
- `web/node_modules/@evidence-dev/sdk/src/plugins/layouts/copyMethods/sveltekit.js` (page→route copy)
- `web/node_modules/@evidence-dev/evidence/template/src/pages/api/pagesManifest.json/+server.js`
  (`_buildPageManifest` — the sidebar-visibility mechanics in §2)
- `web/node_modules/@evidence-dev/core-components/dist/organisms/layout/sidebar/Sidebar.svelte`
  (`deleteEmptyNodes`, `sortChildrenBySidebarPosition`)
- `web/node_modules/@evidence-dev/core-components/dist/atoms/index.js`,
  `.../unsorted/ui/index.js` (confirming `Accordion`/`Details`/`Tabs` are genuinely exported)
- `web/node_modules/@evidence-dev/evidence/template/svelte.config.js` (adapter-static config,
  prerender flag, no `entries`/static-paths mechanism)
- `web/evidence.config.yaml`, `web/sources/gentriduck_marts/*.sql` (bundled-marts shape,
  including the addendum's confirmation that the three OA-D marts are already source-registered)
- `docs/epic-i/I21-ia-restructure-scoping.md` (data-analyst's plan — landed mid-pass; addendum only)
- `web/pages/methodology-oa-modes.md`, `web/pages/reference/area-hierarchy.md` (the `<Dropdown>`/
  `inputs`-driven live widgets referenced in the addendum's §9-Q2 answer)
- `transform/models/intermediate/dim_area_hierarchy.sql` (the self-referential
  `parent_area_level`/`parent_area_code` edge table underlying the addendum's §9-Q1/Q4 answers)
