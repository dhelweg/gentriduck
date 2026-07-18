# I21 (#284) — site information-architecture restructure + project-docs refresh: scoping

- **Status:** SCOPING ONLY. No page moves, no doc rewrites, no code in this document.
- **Author:** data-analyst.
- **Scope trigger:** #284 ("ticket of tickets"), amended to fold in #237 (Hamburg publish) per the
  amendment comment referenced in the task brief.
- **Gate on the scoping doc itself:** none (a scoping/planning doc is not on the R-C1 gated-file
  list) — but every sub-ticket below carries its own gate, and none may be filed/integrated without
  it being identified first.

## 0. Method note — a hard access limitation in this session

This scoping was produced **without direct read access to issue #284 or #237 on GitHub**. The
sandboxed subagent session this was run in has `gh` uninstalled and `api.github.com` repo-scoped
calls (issues/PRs/repo metadata) return a 403 ("GitHub access is not enabled for this session — an
org admin must connect the Claude GitHub App") — this is an org-level policy denial, not a
credentials problem (`GET /user` with the same token succeeds; `GET /repos/dhelweg/gentriduck/*`
does not). Per this environment's own operating rule ("do not retry organization policy denials —
report them instead"), I did not attempt to route around it. No local copy of #284/#237's issue
body exists anywhere in the repo (checked `docs/epic-i/tickets/`, all handoffs, all branches,
`PROJECT_PLAN.md` — no I21/#284 entry exists yet anywhere in the tree, confirming this is a very
recently filed ticket the local checkout predates).

**What this scoping is grounded in instead:** the very detailed acceptance-criteria brief supplied
in the task instructions (which itself closely paraphrases #284's SPEC and amendment, down to
specific phrases like "one canonical home, link don't re-paste" and "today's #237 ruling"), plus a
full read of the current, *already-built* site tree, the overlapping tickets' SPEC files and
sign-offs, ADR-0024, ADR-0005, and the mart layer. **Flag for the PM/architect:** before filing the
sub-tickets in §9, diff this plan against the actual #284/#237 issue threads (which a session with
working `gh`/GitHub-App access can read) to catch anything the brief paraphrased loosely or omitted
— treat this document as a strong draft, not a verbatim transcription of the issue.

**Second finding worth flagging up front:** the branch this scoping was run from
(`claude/open-issues-blockers-nhgckv`) is **51 commits ahead of `develop`**, and unmerged. It
contains a large, already-built chunk of exactly the material #284 asks the IA to organize:
ADR-0024's OA-D1–D3 marts (`mart_poi_oa_arealevel`, `mart_poi_oa_methods`, `mart_poi_dominance`),
the `/methodology-oa-modes` page (with **already-live** BZR/PGR/Bezirk OA choropleths and a
within-group dominance section), and `/reference/area-hierarchy` + `/reference/poi-taxonomy`. None
of this is on `develop` yet. **This plan treats that branch's content as "exists, not yet
integrated" and designs the target IA to absorb it on its own already-built terms once it lands,
rather than scoping new work to rebuild it.** The PM should confirm this branch's integration status
before sequencing §9's tickets — several of them are lighter than they'd otherwise be specifically
because this groundwork already exists.

---

## 1. Where the site actually is today (grounding, not aspiration)

The repo is considerably further along than a fresh read of `docs/epic-i/I2-route-map.md` alone
suggests — I2 froze the top-level `/berlin/…` folder shape, but I18 (#242/#247) and I-ortsteile
(#269) have since built most of an area-hierarchy page ladder **on `develop` already**:

```
/                                    (home, city-agnostic router + Berlin headline)
/thesis-recheck, /methodology(+§7), /how-its-built, /how-its-organised, /about,
/takeaways, /open-data, /timeline                              (top-level story/method pages)
/berlin                                                          (city landing hub)
/berlin/maps                                                     (choropleth LENS: indicator × area_level)
/berlin/time-series                                              (citywide trend + movers LENS)
/berlin/area-detail                                              (district-browse LENS + a near-duplicate
                                                                    "spotlight" of the top PLR's profile)
/berlin/area                          (index.md: full 542-row crawlable PLR list — search utility)
/berlin/area/[code]                   (PLR canonical home — rich: I14 portrait, I19 demographics,
                                        I20 amenities, trajectory, POI mix, OA radar, price/rent)
/berlin/area/bezirk (index + [code])  (Bezirk canonical home — partial: demographics, approx.
                                        status/Dynamik (#249), stage-mix distribution, POI mix,
                                        PGR + Ortsteil child tables — NO portrait, NO OA, NO amenities)
/berlin/area/pgr/[code]               (PGR canonical home — same partial shape as Bezirk)
/berlin/area/bzr/[code]               (BZR canonical home — same partial shape, links down to PLR)
/berlin/area/ortsteil (index + [code])(Ortsteil canonical home — same partial shape; non-nesting)
/berlin/poi-map                       (per-area OA/density LENS + "citywide context" aggregate section)
/berlin/poi-price-overview            (redirect stub → poi-map)
/methodology-comparison               (redirect stub → methodology §7)
/reference, /reference/area-hierarchy, /reference/poi-taxonomy   (unmerged branch only — static
                                                                    drill-down references)
/methodology-oa-modes                 (unmerged branch only — OA family explainer with ALREADY-LIVE
                                        §4 BZR/PGR/Bezirk OA choropleth + §5 dominance section)
```

**The actual gap #284 is naming** is not "no area hierarchy exists" — it's that the area hierarchy
that *does* exist is **inconsistent across levels** (PLR has 6 content sections coarser levels
lack), **the OA-at-higher-levels work landed on a standalone methodology page instead of on the
area pages it's actually about**, **the topic lenses (`maps`/`time-series`/`area-detail`) partially
duplicate the area pages instead of purely linking into them** (`area-detail`'s spotlight is the
clearest offender), and **the whole shape is Berlin-only in its route literals** (`/berlin/area/…`)
with no Hamburg mirror scaffolded, even as a template. #284's job is consolidation, template
discipline, and multi-city generalization of already-mostly-built material — not building an area
hierarchy from zero.

---

## 2. Target IA

### 2.1 Sitemap (logical target; route-literal question deferred to §10/§11)

```
/{city}                                       city landing hub (exists: /berlin)
/{city}/explore/maps                          indicator × area_level choropleth LENS
/{city}/explore/time-series                   citywide trend + movers LENS
/{city}/explore/poi                           OA/density choropleth LENS + citywide POI/price context
/{city}/areas                                 area-hierarchy entry point: pick a level, browse/search
/{city}/areas/{level}                         index page per level (crawlable table -> every code)
/{city}/areas/{level}/{code}                  ← THE canonical per-area page (one template, §2.2)
/{city}/areas/ortsteil, /areas/ortsteil/{code}   (Berlin-only non-nesting geography, same template)
```

`{level}` is the **generic, city-agnostic slot name already defined in
`seed_dim_area_level.csv`/ADR-0024**, not a Berlin literal:

| Generic slot (`publish_tier`) | Berlin | Hamburg |
|---|---|---|
| `context_only` (coarsest) | `bezirk` (12) | `district` (7) |
| *(Berlin-only extra rung)* | `pgr` (~58) | *(no Hamburg equivalent — see §4)* |
| `headline` | `bzr` (~138) | `subarea_l1` / Stadtteil (~104) |
| `primary` (finest) | `plr` (~542/447) | `subarea_l2` / statistisches Gebiet (~945) |
| *(non-nesting, Berlin-only)* | `ortsteil` (97) | *(no Hamburg equivalent)* |

This table **is** the "consistent per-level structure, city-agnostic" deliverable at the routing
level — it is already the vocabulary `dim_city.oa_leaf_area_level` and `seed_dim_area_level.csv`
use internally (ADR-0024 D4, OA-D8's Hamburg generalization already reached `mart_poi_oa_arealevel`
on the unmerged branch). The IA should **name routes/URLs after the generic slot** (`headline`,
`primary`, `context_only`) or after each city's own vocabulary (`bzr`, `subarea_l1`) — **not** force
Hamburg's Stadtteil into a page literally titled `/hamburg/area/bzr/…`. Recommend the latter (each
city's own term in the URL, e.g. `/hamburg/areas/subarea_l1/{code}`), matching how `/berlin/area/…`
already reads in German/Berlin-native terms — but this is a naming call for the web-engineer
feasibility pass (§10) to weigh against Evidence's templated-route mechanics.

**PGR asymmetry, stated plainly:** Berlin has one more rung (PGR) than Hamburg does. The template
must tolerate a variable-depth hierarchy per city (3 nested levels for Hamburg: district → subarea_l1
→ subarea_l2; 4 for Berlin: bezirk → pgr → bzr → plr, plus the non-nesting Ortsteil branch) — this is
already how `dim_area_hierarchy.sql` models it (a generic self-referential `parent_area_code`, per
ADR-0005), so the *data* layer already tolerates this; the *page template* (breadcrumb component,
"levels in this hierarchy" nav) needs to render a variable number of rungs, not a hardcoded
4-deep breadcrumb.

### 2.2 Canonical per-level page template (one template, every level, every city)

This is a **generalization of the PLR template that already exists at `/berlin/area/[code]`**
(I14/I19-web/I20-web), not a new design — the job is (a) making every other level use the same
section set, degrading gracefully where a section doesn't apply, and (b) making it city-agnostic.

**Above the fold:**
1. **Headline** — area name, level badge (e.g. "Neighbourhood (Planungsraum)" / "District (Bezirk)"
   / generic-city equivalent), breadcrumb up the hierarchy (variable depth, see §2.1).
2. **One-line takeaway** —
   - `primary`/`headline` levels: the I14 portrait's first sentence ("*X* is currently classified
     **pioneer-signal**…").
   - `context_only` levels (Bezirk/PGR/District — and, once built, BZR too if it is ever demoted):
     **never** a single-stage claim (binding per the I-coarse-index geo/domain decision, §5.1) —
     instead a one-line distributional summary ("*N* of *M* neighbourhoods here are in
     `active-gentrification` or `pioneer-signal`; no single stage holds a majority").
3. **Single most important visual** — the status-trajectory line (primary/headline) or the
   child-stage-distribution bar chart (context_only) — never both stacked above the fold.

**Below the fold — same section order at every level, sections that don't apply at a given level are
omitted (not shown empty):**

| # | Section | primary (PLR/subarea_l2) | headline (BZR/subarea_l1) | context_only (Bezirk/PGR/district) |
|---|---|---|---|---|
| 1 | Portrait / at-a-glance | full I14 narrative | full narrative (I18 extension) | distributional narrative only (no single-stage claim) |
| 2 | Social status & trajectory | re-scored index + trend line, district/city context | re-scored index + trend, only if BZR is ever promoted to primary-equivalent scoring (currently: sums/distribution per §5.1) — else distribution + modal/heterogeneity flag | distribution + modal/heterogeneity flag only (never re-scored, §5.1) |
| 3 | Commercial mix & Offering Advantage | POI mix bar + OA radar (existing) | OA radar via area-hierarchy roll-up (ADR-0024 D2) — **new, display-only** | OA radar via roll-up — **new, display-only**, `maup_caveat_required` disclosure mandatory (§5.2) |
| 4 | Within-group dominance | optional (signal domains only, sign-blind, public-safe groups only) | same | same, `min_parent_base = max(10, 5·n_children)` |
| 5 | People & structure (demographics) | existing (I19) | existing (I18-web/#249 partial → extend) | existing (I18-web) |
| 6 | Amenities & everyday infrastructure | existing (I20) | **new** (extend I20 mart read) | **new** (extend, extensive-count SUM) |
| 7 | Land value & estimated rent | existing | **new** (avg/sum roll-up) | **new** |
| 8 | Hierarchy nav ("children in this area" / "where this sits") | up-link only (leaf) | child table (down) + up-link | child table (down) + up-link |
| 9 | Honest caveats | existing | existing + MAUP-fragility disclosure where triggered | existing + MAUP + ecological-fallacy emphasis (context_only levels get the strongest wording) |
| 10 | Further reading | existing (link out, never re-paste) | existing | existing |

Sections 3, 4, 6, 7 are the actual **new build** this restructure requires at headline/context_only
grain — everything else already exists somewhere and needs relocating/reordering, not building.

---

## 3. Content → canonical home map

Every existing chart/fact, and where it relocates. "Stays as a lens" = the page keeps the content
because it is a genuinely distinct citywide/comparison view, not a duplicate of an area page.

| Current location | Content | Canonical home under the target IA | Action |
|---|---|---|---|
| `/berlin/maps` | Choropleth (stage/status/dynamism × area_level) | **Stays** — this *is* the cross-area lens; each area click already links into its canonical page | No change; keep as lens |
| `/berlin/maps` | "Numbers behind the map" DataTable | Stays — top-10 comparison table, not a full profile | No change |
| `/berlin/time-series` | Citywide median trend | Stays — citywide-only figure, no single-area home exists for it | No change |
| `/berlin/time-series` | "Biggest movers" tables | Stays — citywide ranking; already links each row into `/berlin/area/[code]` | No change |
| `/berlin/time-series` | Trajectory-type mix bar | Stays — citywide distribution | No change |
| `/berlin/area-detail` | District dropdown + ranked table | **Becomes** `/…/areas/bzr` or `/…/areas/{level}` index-style browse (folds into the new `/{city}/areas` hub) | Relocate/merge into the areas hub |
| `/berlin/area-detail` | **Spotlight** (status trend, POI mix, price/rent for the district's top PLR) | **Deleted, replaced by a link** into that PLR's canonical `/…/areas/plr/{code}` page (principle 5 — this is currently a near-verbatim duplicate of the PLR template) | Remove duplication |
| `/berlin/area` (index) | Full 542-row crawlable list | Stays as the `primary`-level index page (`/{city}/areas/plr`) — same crawl-anchor role, just under the areas hub | Relocate under `/areas/{level}` |
| `/berlin/area/[code]` | Portrait, status trend, POI mix, OA radar, demographics, amenities, price/rent | **Is** the canonical `primary` home already — becomes the template's reference implementation | No content change; becomes the template baseline |
| `/berlin/area/bezirk`, `/pgr/[code]`, `/bzr/[code]`, `/ortsteil/…` | Demographics, approx. status/Dynamik, stage-mix, POI mix, child tables | **Is** the canonical `context_only`/`headline` home already, needs sections 3/4/6/7 backfilled (§2.2) | Extend in place |
| `/berlin/poi-map` | Per-area OA/density choropleth | Stays — cross-area lens; click-through already goes to the PLR canonical page | No change |
| `/berlin/poi-map` "Citywide context" | Citywide POI growth + price/rent trend | Stays — genuinely citywide-only aggregate, no single-area home | No change |
| `/methodology-oa-modes` §2 "Live: nine methods, one Kiez" | Per-PLR OA-methods radar (all 9 ADR-0024 columns) | **Relocate** into `/…/areas/plr/{code}`'s OA section as an expandable "see all 9 methods" detail (currently only the canonical `nested_lq` is shown there) — methodology page keeps the *explainer* prose, drops the *live per-area widget* | Relocate widget, keep prose + link |
| `/methodology-oa-modes` §4 "Live: OA across area scales (BZR/PGR/Bezirk)" | BZR/PGR/Bezirk OA choropleth | **Relocate** — this is precisely what §2.2 row 3 asks each `/…/areas/{level}/{code}` page to show for its own area; the methodology page's job is to *explain* the roll-up rule (ADR-0024 D2), not host a second, competing live widget for the same data | Relocate widget into area pages; methodology page keeps prose |
| `/methodology-oa-modes` §5 "Live: within-group dominance" | HHI/top-share/entropy chart | **Relocate**, same reasoning, into §2.2 row 4 on qualifying area pages | Relocate widget into area pages |
| `/reference/area-hierarchy`, `/reference/poi-taxonomy` | Static drill-downs | **Stay** as reference pages, linked from every area page's "Further reading" and from the methodology pages — this is the correct "link don't re-paste" home for hierarchy/taxonomy vocabulary | No change; becomes a link target, not duplicated content |
| `/methodology` §6 coarse-grain note | "No re-scored index at BZR/PGR/Bezirk grain" caveat | Stays on `/methodology` as the governing rule; **restated in one line, linked back**, on every `context_only` area page's caveats section (§2.2 row 9) | Link, don't re-paste |

---

## 4. Multi-city / Hamburg — structure now, data later (two-track dependency)

Per the amendment: **the template is multi-city from the start; #237 (publish Hamburg) is folded
into this restructure, not run in parallel to it.** Concretely:

- **Track 1 — structure (this restructure, buildable now):** every model above (§2.1's sitemap,
  §2.2's template, the generic `{level}` vocabulary) is specified in terms Hamburg already has data
  for at the *shape* level: `dim_area_hierarchy.sql` already has the district ← subarea_l1 edge
  resolved from source data (no derivation needed); `mart_poi_oa_arealevel` already computes at
  Hamburg's `subarea_l2`/`subarea_l1`/`district` grain (OA-D8, unmerged branch). The area-hierarchy
  page ladder (`/hamburg/areas/{level}/{code}`) can be **scaffolded and reviewed structurally**
  (routing, template, breadcrumbs, empty-state handling) without a single real Hamburg number
  appearing anywhere public.
- **Known Hamburg structural gap to design around, not silently paper over:** the
  `subarea_l1 ← subarea_l2` edge (Stadtteil ← statistisches Gebiet) is **not currently resolved** —
  Hamburg's finest-grain geodata carries no parent-Stadtteil code and no prefix relationship
  (`reference/area-hierarchy.md`'s own disclosure). This means Hamburg's `primary`-level pages
  cannot yet show a working "up" breadcrumb to their `headline` parent, and Hamburg's OA/demographics
  roll-up from `primary` to `headline` is **not yet buildable** the way Berlin's prefix-sum is. The
  template must render an honest empty/deferred state for this specific edge (not fabricate a
  spatial join) — this is itself a small, separately-gated **geo-DS methodology question**
  (a spatial-containment crosswalk, `ST_Within(centroid, parent_geom)`), not a web-layer decision;
  flag it as its own sub-ticket dependency, independent of #237.
- **Track 2 — data going live (gated on #237, run *inside* this sequence, not before or beside it):**
  every Hamburg number only actually renders once (a) Hamburg's own fresh, independent geo + domain
  dual sign-off clears for whatever is being displayed, and (b) `published_cities` in
  `dbt_project.yml` (read via `published_cities_filter()`, QA-4b/#202) includes `HH`. Until then,
  Hamburg-shaped pages either don't build (no crawlable route) or render an explicit
  "Hamburg's [X] isn't published yet" state — never a silently-empty or broken page.
- **I could not independently re-verify "today's #237 ruling"** (§0's access limitation) — the most
  recent locally-visible signal is the README's "Hamburg ingested + wired through the pipeline …
  staged (not yet published) pending a separate publish-scope decision" and a 2026-07-10 handoff
  entry recording the maintainer's explicit deferral ("go deeper on that case tomorrow… skip, not
  pick up"). **The PM must confirm the actual current #237 state before sequencing §9's Hamburg
  sub-ticket** — this plan assumes Hamburg data publication is still gated and unresolved as of this
  writing, and designs Track 2 to slot in wherever that gate actually clears.

---

## 5. OA-at-higher-levels — display-only vs. methodology-bearing, per view

Consulted ADR-0024 (and the unmerged-branch marts that already implement its D1–D4 decisions) for
the exact line. The governing rule, stated once in ADR-0024 D2 and repeatedly re-affirmed in every
downstream sign-off: **aggregating already-computed stocks up an already-approved hierarchy and
forming the ratio last is display-only; anything that changes *how* a value is computed, re-derives
a new reference distribution, or introduces a new construct is methodology-bearing.**

### 5.1 Gentrification index (status/dynamism/typology stage) at coarser grain — DECIDED, display-only summary only

Already ruled on (`docs/epic-i/I-coarse-index-geo-decision.md`, `I-coarse-index-domain-decision.md`,
`#267`, verdict **CONCERNS → decline the point value**): a single re-scored index number at
BZR/PGR/Bezirk grain is **not admissible** — averaging the ordinal Status/Dynamik class codes
violates ADR-0008/R-A3-C2, and the only methodology-sound alternative (raw-indicator re-aggregation +
re-classification at each grain) is explicitly reserved as its own future ADR, not this restructure's
job. **§2.2 row 2's "distribution + modal/heterogeneity flag only" design is not a new call — it
restates this existing ruling.** Nothing in I21 needs to re-litigate this; a sub-ticket that tried to
add a coarse-grain index *value* would itself need a fresh R-C1 pass and is explicitly out of scope.

### 5.2 Offering Advantage at coarser grain (ADR-0024 D2) — DISPLAY-ONLY, already built, needs relocating

Prefix-sum-then-ratio roll-up (never average child LQs — the Simpson's-paradox rule) is the decided,
signed-off (`OA-D0-geo-signoff.md`/`OA-D0-domain-signoff.md`, both `PASS WITH CONDITIONS`) mechanism,
already implemented in `mart_poi_oa_arealevel`/`mart_poi_oa_methods` (unmerged branch). **Surfacing
this already-computed column on a `/…/areas/{level}/{code}` page is display-only** — same category as
the I18-web-geo-signoff precedent ("pure display of pre-computed, already-reviewed mart rows... no
objection"). Two binding conditions travel with it and must be enforced at the point of publication
(not re-derived, just carried through):
- **`maup_caveat_required`** (a column on `mart_poi_oa_arealevel` itself) — any row coarser than a
  city's own `dim_city.oa_leaf_area_level` **must** render the §7 MAUP-fragility disclosure
  (pooled PLR-vs-BZR rho ≈ 0.66, below the 0.7 stability threshold) prominently, every time. This is
  a **display/wiring requirement**, not a new methodology decision — the flag already exists to be
  read, not computed.
- **Ecological-fallacy / headline-scale framing** (OA-D0 domain sign-off Condition D): BZR is the
  recommended public headline scale for anything coarser than PLR; **Bezirk/district-level figures
  are context-only, never presented as equivalent-weight alternatives to BZR.** The §2.2 template's
  `context_only` row should visually/textually de-emphasize this section relative to `headline`.

**If I21's sub-ticket does nothing more than move the already-built OA-arealevel widget from
`/methodology-oa-modes` onto the area pages (§3's relocation rows) and wires these two disclosures
in, it is display-only** and only needs the web-engineer-reviewer gate. **It becomes
methodology-bearing again only if it changes which method is shown as the default/canonical figure,
introduces a new roll-up rule, or relaxes/removes either binding condition** — none of which this
restructure should do.

### 5.3 Within-group dominance at any grain — DISPLAY-ONLY *with a mandatory publish-time filter*, not yet wired anywhere public

`mart_poi_dominance` (unmerged branch) is built and signed off (OA-D0/OA-D4) but **deliberately does
not filter `is_public_safe`** — its own header states this explicitly: *"whichever ticket first wires
this mart into a public surface... MUST re-verify `is_public_safe = true` is actually applied as a
filter at the point of publication."* Wiring it into the area-page template (§2.2 row 4) is the
ticket that discharges this. This is **display-only in the sense that no new computation is
introduced**, but it carries a **binding, checkable publish-gate condition** (the anti-xenophobia
clause: cuisine/nationality-coded dominance is barred from public surfaces, category grain only;
sign-blindness must always co-present the signed `top_child`; `min_parent_base = max(10, 5·n_children)`
at coarser grain). Recommend routing this specific sub-ticket through the **web-engineer-reviewer as
the primary gate** (it is not introducing new methodology), but with an **explicit domain-expert spot
check** before merge, given the recency and specificity of the OA-D0 domain conditions binding it —
flag this as a judgment call for the PM/architect rather than asserting it needs the full dual R-C1
gate outright.

### 5.4 Demographics/amenities/price-rent at coarser grain — DISPLAY-ONLY, precedent already set

Already extended to Bezirk/BZR/PGR grain today (`mart_area_demographics`'s sum-then-recompute
rollup, approved in `I19-geo-signoff.md` and re-confirmed for the web layer in
`I18-web-geo-signoff.md`; `mart_area_amenities`'s extensive-count SUM, same discipline). Extending
these same already-approved marts' existing rollup to any grain the template needs (including a
future Hamburg grain, once its hierarchy edge resolves) is **display-only** by the same precedent —
web-engineer-reviewer gate only, no new R-C1 pass required, **provided no new rollup formula is
invented** (if a level needs a rollup rule that doesn't already exist in the mart, that specific
extension is methodology-bearing and needs its own geo-DS pass, same as any new aggregation would).

---

## 6. Project-docs refresh list

| Doc | What's stale | Target message | Owner |
|---|---|---|---|
| `README.md` | Epic H line already says "staged, unpublished, pending a publish-scope decision" — accurate today, but will go stale the moment #237/Track 2 (§4) resolves either way; also doesn't yet mention #284/I21 as an epic-I ticket. Site pitch and "where to start" list still enumerate only Berlin-specific pages/URLs. | Keep the existing top-simple pitch; update the Epic H one-liner the moment #237 resolves (not before); add I21 to the roadmap line once filed; genericize the "where to start" section's file paths to city-agnostic phrasing once the areas-hub route exists. | data-analyst + PM (README & story realignment already has precedent from I7) |
| `/about` | Origin story is stable and explicitly "nothing else builds toward or from this page" (I3's own framing) — low staleness risk, but its "How it's built" summary references the current agent-pipeline shape, which should be spot-checked against `/how-its-organised`'s fuller table after any agent-roster change. | No structural change expected from I21; only a spot-check that its short summary hasn't drifted from `/how-its-organised`'s canonical table. | data-analyst (light touch) |
| `/timeline` | Will need one more milestone entry once I21 lands (site restructure) and, separately, once #237/Hamburg goes live (per its own "going fully public" placeholder note already on the page). Milestone dates must be cited to a repo artifact per the page's own rule (ADR/issue-close date, never `git log`). | Add a dated, source-cited milestone for "site restructured to an area-centric, multi-city-ready IA" once I21 integrates; add the Hamburg-publish milestone once #237 resolves. | data-analyst |
| `/how-its-built` | Describes the pipeline/stack — should stay accurate through I21 (no stack change), but its Hamburg mention (if any) should be checked against the Track-2 gating language in §4 so it doesn't overstate Hamburg's current publish status. | Spot-check Hamburg framing matches "ingested, staged, not yet published" precisely; no structural rewrite needed. | data-analyst |
| `/how-its-organised` | Describes the agent roster/workflow — orthogonal to the site IA; low staleness risk from I21 itself, but should get a factual mention if I21 introduces any new agent-facing process (e.g. a new "IA consistency check" review step) — probably doesn't, since this is a content/routing restructure, not a process change. | No change expected; confirm after §9's sub-tickets are scoped whether any new review step needs documenting here. | data-analyst |
| `docs/epic-i/I2-route-map.md` | This is the frozen route-map record I2 produced — if any route literally moves/renames under I21 (see §10/§11's open question), this file needs a **superseding entry**, not a silent edit (per I2's own "routes frozen after" framing and I13's dependency on that freeze). | New "I21 supersedes/extends I2 route map" section, or a fresh `I21-route-map.md`, once the architect rules on §11's route-literal question. | web-engineer + PM, gated on architect ruling |
| `docs/PROJECT_PLAN.md` | No I21/#284 entry exists yet under Epic I. | Add I21 (+ the folded-in #237 note) to the Epic I section, in the same terse table format as I1–I20, once sub-tickets are filed. | PM |
| `web/README.md` (not read in this pass — flagged, not inspected) | Likely references the current flat/`/berlin`-prefixed route list; should be checked once §11 resolves. | Spot-check after route decision. | web-engineer |

No other public-linked doc surfaced stale content specific to this restructure in this pass (open-data,
methodology, methodology-oa-modes, reference/* were all read and are internally consistent with the
target IA in §2–§5, not stale relative to it — they need *content relocated into* area pages per §3,
not rewriting).

---

## 7. Overlapping-ticket reconciliation

| Ticket | Relationship to I21 |
|---|---|
| **I2** (#219, route map) | **Extended, not superseded**, unless §11's route-literal question resolves in favour of renaming `/berlin/area-detail`/`/berlin/area` into the new `/areas` hub — in that case I2's route map needs a formal superseding entry (architect-ruled, §11) and I13's "routes frozen (I2)" precondition needs updating to point at the new freeze point. |
| **I3** (#220, page-revision pass) | **Superseded on the two items it left as an open tension**: the `area-detail` vs. `area/index` reconciliation (I3 kept them separate and documented why, but did not resolve `area-detail`'s spotlight duplicating the PLR template — I21 §3 resolves it) and the general "consolidate, one canonical home" principle I3 applied page-by-page — I21 extends that principle to the whole area hierarchy. Everything else I3 did (shared component adoption, About/GitHub-README realignment) stands, unaffected. |
| **I14** (#231, PLR deep-dive profile) | **Depended on, not superseded** — I14's PLR template (portrait, OA-as-%-vs-baseline, district/city context lines, POI-mix ordering) **is** the reference implementation §2.2 generalizes to every other level. I21's PLR-level page itself needs no rebuild. |
| **I16** (#233, map UX) | **Depended on, not superseded** — the colorblind-safe palette/tooltip work applies to the `maps`/`poi-map` lenses, which I21 keeps as-is (§3). If §2.2's area-page OA/dominance sections add any new chart type (e.g. the OA radar or HHI chart at coarser grain), I16's palette conventions should be reused, not re-litigated — flag as a light dependency for whichever sub-ticket builds those sections. |
| **I18** (#242/#247, geo-hierarchy pages) | **Directly extended** — I18 built the Bezirk/PGR/BZR/Ortsteil page ladder I21 is generalizing into the full template (§2.2 rows 3/4/6/7 are exactly what I18 explicitly deferred: "Phase-1 coarse-grain content only... no OA, no amenities"). I18's own geo-signoff already anticipated this ("that model is not yet exposed as a mart... a future ticket"). |
| **I19** (#243/#246, area demographics) | **Depended on, not superseded** — its sum-then-recompute rollup and binding domain-framing conditions (no ranking/sorting on foreigners/migration share, always co-presented with structural context, inline comparability caveat, graceful degradation on suppression) travel unchanged into §2.2 row 5 at every level; §5.4 states this precedent explicitly. |
| **I20** (#244/#254, amenity insights) | **Depended on, extended in grain** — its binding domain conditions (wording, denylist, completeness caveat, interestingness thresholds) travel unchanged into §2.2 row 6; the *new* work is extending its already-built mart read from PLR-only to headline/context_only grain (extensive-count SUM, same discipline as I19). |

---

## 8. Proposed sub-ticket breakdown

Sequenced; each sized for one coder↔reviewer loop. "Gate" names the **primary** review path per
CLAUDE.md's methodology-gate rule — R-C1 items need **both** geo-DS and domain-expert `PASS` before
PM integration; non-R-C1 items need web-engineer-reviewer (structure) or data-engineer-reviewer
(marts) only.

1. **I21-a — Architect ruling: route-literal decision + I2 supersession scope**
   Scope: decide whether `/berlin/area-detail` + `/berlin/area` fold into a new `/berlin/areas` hub
   (route rename, needs a superseding I2 route-map entry) or whether the target IA in §2.1 is
   achieved by reorganizing *content* within the existing frozen `/berlin/area/…` routes (no rename).
   **Gate: system-architect (ADR or a route-map-supersession memo); no code.**

2. **I21-b — Web-engineer feasibility note (parallel to a)**
   Scope: answer §10's open questions (Evidence templated-route mechanics for a variable-depth,
   city-agnostic breadcrumb; whether relocating the `methodology-oa-modes` §2/§4/§5 live widgets is a
   mechanical query-move or a bigger rework; cost of a shared `AreaPage` template component vs. six
   near-duplicate page files). **Gate: none (a feasibility note, not a ship); informs a/c/d/e below.**

3. **I21-c — `area-detail` de-duplication (§3)**
   Scope: remove the spotlight's duplicated status/POI-mix/price-rent charts, replace with a
   BigValue + link into the top-pressure PLR's canonical page; keep the district-browse table.
   Depends on: a (route decision determines whether this also moves under a new hub route).
   **Gate: web-engineer-reviewer only (presentation-only, no indicator/weight/method change).**

4. **I21-d — Relocate the OA-arealevel + dominance live widgets from `/methodology-oa-modes` into the area-page template (§3, §5.2, §5.3)**
   Scope: move (not rebuild) the already-built §4/§5 widgets from the unmerged branch's
   `/methodology-oa-modes` onto `/…/areas/{level}/{code}` at headline/context_only grain; wire the
   `maup_caveat_required` disclosure and the dominance mart's `is_public_safe` filter at the point of
   publication (§5.2/§5.3's binding conditions). Depends on: the OA-D branch's integration into
   `develop` (flagged in §0) landing first, or this ticket absorbs that integration as its own first
   step — PM to decide sequencing once the branch's status is confirmed.
   **Gate: web-engineer-reviewer as primary (relocating pre-approved display, not new methodology);
   domain-expert spot-check recommended before merge given how recent/specific the OA-D0 binding
   conditions are (§5.3) — PM/architect call on whether that spot check needs a formal sign-off doc
   or can be a lighter review comment.**

5. **I21-e — Backfill demographics/amenities/price-rent sections at headline/context_only grain (§2.2 rows 5–7, §5.4)**
   Scope: extend the already-approved `mart_area_demographics`/`mart_area_amenities`/
   `mart_price_rent_dimension` reads (same rollup formulas, no new aggregation) to BZR/PGR pages that
   don't yet show them. **Gate: web-engineer-reviewer only (display-only precedent already set,
   §5.4) — escalate to R-C1 only if a level is found needing a rollup formula that doesn't already
   exist in the mart.**

6. **I21-f — Canonical per-level template consolidation (§2.2)**
   Scope: the structural pass — consistent section order, above/below-fold split, breadcrumb
   component that tolerates variable hierarchy depth, honest degradation for `context_only` levels
   (distribution-only, never a re-scored index, per §5.1). Depends on: c, d, e (content sections must
   exist before the template can be finalized around them).
   **Gate: web-engineer-reviewer (structure/routing/presentation only) — confirm with domain-expert
   only if any wording changes what a stage/status claim implies (unlikely if content is a straight
   relocation of already-approved language).**

7. **I21-g — Hamburg template scaffold, Track 1 only (§4)**
   Scope: scaffold `/hamburg/areas/{level}/{code}` routes on the same template as f, with an explicit,
   honest "not yet published" state wherever real Hamburg data would render (no real numbers exposed
   — `published_cities` gate stays as-is). Render an explicit deferred state for the unresolved
   `subarea_l1 ← subarea_l2` hierarchy edge (§4) rather than a broken/silent breadcrumb.
   **Gate: web-engineer-reviewer (no data is actually published — pure scaffold/structure).**

8. **I21-h — Hamburg subarea hierarchy crosswalk (small, separately gated, unblocks g's remaining gap)**
   Scope: resolve the `subarea_l1 ← subarea_l2` spatial-containment edge
   (`ST_Within(centroid, parent_geom)` or an equivalent method), per `reference/area-hierarchy.md`'s
   own disclosure of the gap. This is a genuine new spatial method, independent of #237's publish-scope
   question. **Gate: full R-C1 dual sign-off (geo-DS + domain-expert) — this is a new spatial/
   aggregation method, methodology-bearing per the CLAUDE.md file list (touches a hierarchy-defining
   intermediate model).**

9. **I21-i — Fold in #237: publish Hamburg on the new template (Track 2, gated)**
   Scope: once Hamburg's own fresh, independent geo + domain dual sign-off clears (whatever that
   entails — outside this scoping's authority to define) and `published_cities` flips to include
   `HH`, Hamburg's real numbers render on the already-built-and-reviewed template from g/h. No new
   template work — this ticket is pure data-gate flip + verification, **provided** g/h already
   shipped. **Gate: full R-C1 dual sign-off specific to whatever #237's own scope turns out to be
   (unknown to this scoping — §0's access limitation) — PM must re-read #237 directly before
   sequencing this ticket's exact acceptance criteria.**

10. **I21-j — Project-docs refresh (§6)**
    Scope: the README/timeline/route-map updates in §6's table, sequenced **after** the IA changes
    actually land (dated milestones should cite real merge/close dates, not be pre-written).
    **Gate: none beyond normal PM review — these are prose-only, non-methodology-bearing docs, except
    the I2-route-map supersession entry, which is gated on a's architect ruling already having
    happened.**

**Suggested order:** a, b (parallel) → c, e (parallel, independent of d) → d (once OA-D branch status
is confirmed) → f (needs c/d/e) → g → h (parallel to g's non-Hamburg-data parts) → j (docs, rolling) →
i (last, gated on the real #237 resolution, whenever that lands — not assumed to be soon).

---

## 9. Open questions for web-engineer (Evidence.dev feasibility — do not guess at these)

1. Can a single shared `AreaPage`-style Evidence component/template parametrize over
   `{city, level, code}` and a variable-depth breadcrumb, or does Evidence's templated-page mechanism
   (`[code].md` per folder) force one near-duplicate file per level, as today? This materially affects
   how many files I21-f actually touches and whether "one template" is literal or a shared-partial
   convention.
2. What is the actual cost of relocating `/methodology-oa-modes`' §2/§4/§5 **live** widgets (SQL query
   blocks + ECharts config) onto the area-page template — a mechanical copy-and-reparametrize, or does
   each widget's current parametrization (fixed dropdowns vs. `${params.code}`-driven) need real
   rework?
3. Is a route rename of `/berlin/area-detail` + `/berlin/area` into a `/berlin/areas` hub
   (§2.1/§10-a's open question) safe under Evidence's static-build link-crawl discipline (I2's own
   verification method — "zero broken internal links, fails hard on a 404 during prerender") given the
   number of existing internal links pointing at the current routes, or does it require a redirect-stub
   strategy at real scale (542+97+~150+58+12 pages)?
4. Given the PGR-asymmetry (§2.1) and Hamburg's missing `subarea_l1 ← subarea_l2` edge (§4), can the
   breadcrumb/hierarchy-nav component render a clean "no parent link available yet" state without a
   special-case per city, or does this need its own small city-config seed read into the web layer?
5. Confirm whether `mart_poi_oa_arealevel`/`mart_poi_oa_methods`/`mart_poi_dominance` (currently only
   on the unmerged branch) are already source-registered for Evidence (`web/sources/gentriduck_marts/`)
   — I saw `.sql` source stubs for exactly these three marts in that branch's diff, suggesting yes, but
   this needs the web-engineer's own confirmation before I21-d is sized.

## 10. Open questions for system-architect

1. **Route-literal decision (§2.1, §7's I2 note, §9-a):** does `/berlin/area-detail` + `/berlin/area`
   fold into a renamed `/berlin/areas` hub (requires a formal I2-route-map supersession entry, and
   updates I13's "routes frozen (I2)" launch precondition), or does the target IA get achieved through
   *content* reorganization within the existing frozen routes? This is the single highest-leverage
   decision in this whole plan — it determines whether I21-a is a one-paragraph ADR-adjacent memo or a
   full route-map supersession with its own re-verification pass (à la I2's own build/link-crawl
   verification).
2. **Does I21 itself need a new ADR**, or is it correctly scoped as a routing/content-reorganization
   ticket under the existing ADR-0005 (city-agnostic core) and ADR-0024 (OA hierarchy) umbrella with no
   new architectural decision of its own? My read: **no new ADR is needed** — I21 doesn't introduce a
   new tool, a new aggregation method, or a new grain; it consolidates and generalizes decisions
   already recorded in ADR-0005/ADR-0008/ADR-0024 and the I-coarse-index decisions. Flagging for
   confirmation rather than asserting it.
3. **OA-D branch integration sequencing (§0):** should the 51-commit `claude/open-issues-blockers-nhgckv`
   branch (ADR-0024's OA-D1–D3 marts + `/methodology-oa-modes` + `/reference/*`) be integrated into
   `develop` as its own prior step, or does I21-d (§9) absorb that integration as part of its own scope?
   This is a sequencing call, not a methodology call, but it affects every downstream ticket's sizing.

---

## 11. Summary for the parent agent

- **Plan path:** `docs/epic-i/I21-ia-restructure-scoping.md` (this file).
- **Ten proposed sub-tickets** (§8): a (architect route ruling) → b (web-eng feasibility, parallel) →
  c (area-detail de-dup, web-eng-reviewer) → e (demographics/amenities backfill, web-eng-reviewer) →
  d (relocate OA-arealevel/dominance widgets, web-eng-reviewer + domain spot-check) → f (template
  consolidation, web-eng-reviewer) → g (Hamburg scaffold, web-eng-reviewer, no real data) → h (Hamburg
  hierarchy crosswalk, full R-C1) → j (docs refresh, PM review) → i (fold in #237, full R-C1 on
  whatever its real scope is, last/gated).
- **Biggest finding:** most of what #284 asks for is **already built**, scattered across `develop`
  (I18/I-ortsteile's Bezirk/PGR/BZR/Ortsteil ladder) and an **unmerged 51-commit branch**
  (ADR-0024's OA-D marts + `/methodology-oa-modes` + `/reference/*`). I21's real job is
  **consolidation and generalization**, not new methodology — the two genuinely new-methodology
  pieces are narrow and already identified (§8-h, the Hamburg hierarchy crosswalk; and, separately,
  whatever #237 itself turns out to require).
- **Caveat I could not resolve myself:** this session had no working GitHub API/`gh` access to
  `dhelweg/gentriduck` (org policy denial, §0) — I worked from the task brief plus full repo
  grounding. **Recommend the PM re-diff this plan against the live #284 and #237 issue threads**
  before filing the sub-tickets, particularly for #237's exact current status and #284's amendment
  wording beyond what was paraphrased into my task brief.
- **Open questions requiring input before filing tickets:** §9 (web-engineer feasibility, 5
  questions) and §10 (system-architect, 3 questions, the route-literal decision being the
  highest-leverage one).
