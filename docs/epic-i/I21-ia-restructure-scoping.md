# I21 (#284) — site IA restructure + project-docs refresh: scoping

**Ticket:** I21 (#284), filed 2026-07-18 on direct maintainer request. **This is a scoping
ticket-of-tickets** — its deliverable is this plan plus a proposed sub-ticket breakdown. No page
moves, doc rewrites, or new routes land under #284 itself.

**Author:** data-analyst framing (IA/content) + web-engineer feasibility check + system-architect
route/ADR read, all folded into this one doc for the scoping deliverable (per the ticket's
"Gates & ownership" list). Not methodology-bearing (no model/indicator/weight change; the OA-at-
higher-levels section below is a **determination**, not a computation change).

---

## 0. Starting point — what exists today (do not assume it's wrong)

Route shape frozen by I2 (`docs/epic-i/I2-route-map.md`, #219):

- **Top-level (story/method/docs):** `/`, `/thesis-recheck`, `/methodology`,
  `/methodology-comparison`, `/methodology-oa-modes`, `/takeaways`, `/open-data`,
  `/how-its-built`, `/how-its-organised`, `/about` (frozen route — never moves), `/timeline`,
  `/reference/*` (area-hierarchy, poi-taxonomy).
- **Berlin data pages, `/berlin/…`:** landing (`index.md`), `time-series`, `maps`, `area-detail`
  (district browse + dropdown), `area/index` (542-row PLR table) → `area/[code]` (per-PLR
  profile, #150/#231/I14), `poi-map`, `poi-price-overview` (now a redirect stub, content merged
  into `poi-map` per I3).
- **Geo-hierarchy ladder, `/berlin/area/…` (added I18/I18-web/I-ortsteile, #242/#247/#249/#269):**
  `bezirk/index` → `bezirk/[code]`, `pgr/[code]` (crawled from a Bezirk page's child table),
  `bzr/[code]` (crawled from a PGR page's child table), `ortsteil/index` → `ortsteil/[code]`
  (non-LOR, dominant-PLR crosswalk, not a code-prefix nest).
- **Hamburg:** not yet scaffolded — gated on #237 (H3), itself gated on a fresh geo+domain
  admission sign-off per the maintainer's 2026-07-18 ruling (`#237` comment thread). This scoping
  plan's per-level template must hold for Hamburg's own ladder (district/subarea_l1/subarea_l2)
  without a rewrite, but **no Hamburg work is authorized here** — that stays #237's gate.

**The problem this ticket answers (maintainer framing, verbatim from the issue body):** the site
grew page-by-page and is now **topic-sliced**: understanding one neighbourhood requires hopping
between `/berlin/maps`, `/berlin/time-series`, `/berlin/poi-map`, `/berlin/poi-price-overview`
(now merged), and `/berlin/area/[code]`. Only the PLR level (`area/[code]`) is a true
area-centric profile; every coarser level (Bezirk/PGR/BZR/Ortsteil) already got a *partial*
profile treatment in I18/I18-web/I-ortsteile, but it is thinner than the PLR page and the topic
pages (`maps`, `time-series`, `poi-map`) remain separate, city-wide-browse-first entry points
that duplicate per-area content already on the profile pages (e.g. a status/dynamik chart lives
both inline in `maps.md`'s per-PLR tooltip *and* as its own section on `area/[code].md`).

---

## 1. Target IA — sitemap / route tree

**No route deletions, one route addition.** The existing `/berlin/area/{level}/[code]` ladder
already *is* the area-centric skeleton I21 wants — I18 built it correctly but stopped short of
folding the topic pages' per-area content into it. This plan's route tree is I2's frozen tree
**plus** a explicit "profile ladder is canonical" rule and one new top-level page:

```
/                              (unchanged — home, chapter hub)
/thesis-recheck                (unchanged)
/methodology                   (unchanged — content refresh only, no route change)
/methodology-comparison        (unchanged)
/methodology-oa-modes          (unchanged)
/takeaways                     (unchanged)
/open-data                     (unchanged)
/how-its-built                 (unchanged)
/how-its-organised             (unchanged)
/about                         (frozen — never moves, content refresh only)
/timeline                      (unchanged)
/reference/*                  (unchanged)

/berlin                        (landing — becomes a THIN city-level dashboard: headline stat,
                                 one map thumbnail, one time-series thumbnail, then hands off to
                                 the profile ladder — see §2 template applied at city grain)
/berlin/area                   (index — unchanged: the 542-row PLR browse/search table; this and
                                 its Bezirk/Ortsteil siblings remain the sitemap's "start here to
                                 pick an area" doors — indexes are navigation, not content, so
                                 they are NOT topic pages and are out of scope for consolidation)
/berlin/area/[code]            (PLR profile — canonical home for all PLR-grain facts; already
                                 the most complete instance of §2's template, I14/#231-built)
/berlin/area/bezirk            (index, unchanged)
/berlin/area/bezirk/[code]     (Bezirk profile — gains the sections §2/§3 below relocate to it)
/berlin/area/pgr/[code]        (PGR profile — same treatment)
/berlin/area/bzr/[code]        (BZR profile — same treatment)
/berlin/area/ortsteil          (index, unchanged)
/berlin/area/ortsteil/[code]   (Ortsteil profile — same treatment)

/berlin/maps                   (RETAINED, re-scoped: becomes the "pick an area visually" map
                                 ENTRY POINT into the profile ladder — a chooser, not a duplicate
                                 data page. Per-area detail that maps.md currently inlines in
                                 tooltips/side panels relocates to being a link into that area's
                                 profile page. The citywide choropleth + legend + "click to open
                                 profile" interaction is content that has no other home, so it
                                 stays — this is the one topic page that is genuinely
                                 non-duplicative: a map *is* the city-level view, not a
                                 restatement of a PLR's own numbers.)
/berlin/time-series             (RETAINED, re-scoped: becomes the CITYWIDE aggregate trend view
                                 — "how did Berlin as a whole move" — plus the two movers/losers
                                 leaderboards (already citywide comparisons, not single-area
                                 content — these belong here, not on any one area's page). The
                                 per-area trend chart it currently also shows inline moves to
                                 living solely on that area's profile page, linked from here.)
/berlin/poi-map                 (RETAINED, re-scoped: same "citywide POI/OA choropleth chooser +
                                 citywide aggregate POI/OA summary" split as maps/time-series —
                                 the per-area subtype/OA breakdown already lives on
                                 `area/[code].md`'s "Offering Advantage profile" section per I14;
                                 poi-map's per-area popup content should link there instead of
                                 restating it.)
```

**Net route change: zero new routes beyond what already exists**, except the profile pages at
Bezirk/PGR/BZR/Ortsteil grain gain sections (content moves in, no new URL). This is a smaller
architectural change than a naive reading of the ticket ("area-centric consolidation") might
suggest — the profile ladder already exists; the fix is disciplined content placement
(dedup: chart lives once, on the profile page, linked-to rather than restated) and turning the
three surviving topic pages (`maps`, `time-series`, `poi-map`) into **choosers + citywide-only
aggregates**, not per-area restatements. **This is I3's original "hub, not duplicate" discipline
(already the stated goal for `/berlin` itself), applied one level down to the topic pages.**

---

## 2. Canonical per-level page template

Every `/berlin/area/{level}/[code]` profile (PLR is the existing, most mature instance — I14/#231)
uses the same section order, so a reader learns the layout once. **Progressive disclosure**:
sections 1–2 are always above the fold; 3+ are "further down" (Evidence renders a single
scrolling page — "below the fold" here means position in reading order, not a client-side
accordion; that stays a page-feel judgement for web-engineer at build time, not mandated here).

| # | Section | Above/below fold | Content | Existing precedent |
|---|---|---|---|---|
| 1 | **`{area_name} at a glance`** | above | One headline number/stage + one-line plain-language takeaway + the single most load-bearing visual (status/typology badge) | PLR page's existing `## {area_name} at a glance` |
| 2 | **Breadcrumb + hierarchy nav** | above (chrome, not prose) | Parent link(s) up the ladder, children table down the ladder (already how Bezirk/PGR/BZR pages work) | Bezirk/PGR/BZR pages' existing child tables; PLR page's district_info block |
| 3 | **People & structure** | below | EWR/Sozialmonitoring demographics (age, composition) — Kurzprofil parity (I19) | PLR page `## People & structure` |
| 4 | **Social status & trajectory over time** | below | Status/Dynamik/typology stage history, this area's own trend chart (the one currently duplicated inline on `maps`/`time-series`) | PLR page `## Social status over time`; Bezirk/PGR/BZR's I249-web-b "Approximate status & change" |
| 5 | **How its commercial mix has developed** | below | POI category stacked bar over time | PLR page `## How its commercial mix has developed` |
| 6 | **Offering Advantage profile** | below | OA mix, subtype breakdown, dominance — **this is where OA-at-higher-levels content lands, see §3** | PLR page `## Offering Advantage profile` |
| 7 | **Amenities & everyday infrastructure** | below | I20 amenity block (dominant restaurant types, mover persona) | PLR page `## Amenities & everyday infrastructure` |
| 8 | **Land value & estimated rent** | below | BRW/Mietspiegel/Wohnlage | PLR page `## Land value & estimated rent`; Bezirk/PGR/BZR (not yet built — gap, see §5 sub-tickets) |
| 9 | **Honest caveats** | below | Per-level caveats: MAUP/ecological-fallacy at coarse grain, city-specific caveats, OA disclosure flags | PLR page `## Honest caveats`; every geo-hierarchy page's existing "display-only, not re-scored" framing |
| 10 | **Further reading** | below | Cross-links: methodology, thesis-recheck, sibling levels | PLR page `## Further reading` |

**Coarser levels (Bezirk/PGR/BZR/Ortsteil) currently implement a subset** (1–2, a thinner 4, no
5/6/7/8 yet) — this is the concrete "content → canonical home" gap this ticket's sub-tickets
close, not a template redesign.

---

## 3. Content → canonical home map (what relocates, what stays put)

| Fact / chart | Today's home(s) | Canonical home (this plan) | Action |
|---|---|---|---|
| Per-PLR status/dynamik trend | `area/[code].md` §4 (full) AND `maps.md` tooltip (partial) AND `time-series.md` (partial, via dropdown) | `area/[code].md` §4 only | `maps`/`time-series` link to the profile page instead of inlining the chart |
| Citywide status/dynamik trend | `time-series.md` | `time-series.md` (unchanged — genuinely citywide, no single-area home) | none |
| Movers/losers leaderboard | `time-series.md` | `time-series.md` (unchanged — citywide comparison) | none |
| Per-PLR POI mix over time | `area/[code].md` §5 AND `poi-map.md` popup | `area/[code].md` §5 only | `poi-map` popup links to profile page |
| Citywide POI/OA aggregate | `poi-map.md` "Citywide context" section | `poi-map.md` (unchanged) | none |
| Per-PLR OA/subtype/dominance | `area/[code].md` §6 | `area/[code].md` §6 (unchanged, most mature instance) | Bezirk/PGR/BZR/Ortsteil gain their OWN §6 (new, aggregated — see §4) |
| Bezirk/PGR/BZR "status & change" | `area/bezirk|pgr|bzr/[code].md` (I249-web-b) | same page, promoted into template position §4 | rename/reorder heading only, no data change |
| Land value/rent at coarse grain | not built | new §8 on Bezirk/PGR/BZR/Ortsteil pages | **new sub-ticket** (gap, not a relocation) |
| Amenities (I20) at coarse grain | not built | new §7 on Bezirk/PGR/BZR/Ortsteil pages | **new sub-ticket** (gap) |
| Demographics (I19) at coarse grain | already built (`mart_area_demographics`) | already correctly placed §3 | none — already conformant |

**No fact loses its only home** — every relocation leaves exactly one canonical copy and turns
the other occurrence into a link, per the ticket's "no repetitive content" principle.

---

## 4. OA at higher levels — display vs. methodology-bearing determination

**Good news: the computation already exists and is already gated.** ADR-0024 (OA-D2/D6/D8) built
`mart_poi_oa_arealevel` and `mart_poi_dominance` at every `dim_area` level (Berlin: plr/bzr/pgr/
bezirk; Hamburg: subarea_l2/subarea_l1/district), including a data-layer `maup_caveat_required`
disclosure flag (OA-D5 MAUP-fragility finding, r=0.662 < the 0.7 threshold for PLR-vs-BZR
nested_lq) and an `is_public_safe` ethics flag (OA-D0 domain sign-off Condition B). Per-view
determination for this ticket's sub-tickets:

| Candidate view | Computation already exists? | Display-only or methodology-bearing? |
|---|---|---|
| Bezirk/PGR/BZR/Ortsteil page §6 showing `mart_poi_oa_arealevel` rows at that area's own level | Yes (OA-D2/D6) | **Display-only** — read an already-published, already-signed-off mart, same as the existing I18-web Bezirk/PGR/BZR pages already do for demographics. Gate: web-engineer-reviewer + the existing "coarse-grain display rules" precedent (`docs/epic-i/I18-web-geo-signoff.md`/`I18-web-domain-signoff.md`), **not** a new R-C1 round. **MUST** surface `maup_caveat_required` and `is_public_safe` as page-level disclosure/filter, per the binding conditions already on record (OA-D5 geo sign-off; OA-D4 domain sign-off Condition B) — this is a **carry-forward compliance check**, not new methodology. |
| A ranked "which Bezirk has the highest OA" citywide comparison chart | Yes, same mart | **Display-only**, same reasoning — a sort/filter over an existing column, not a new statistic. |
| Any view that would **compute** a new roll-up method (e.g. an unweighted mean instead of the prefix-sum roll-up ADR-0024 confirmed, or a Getis-Ord hotspot map) | No | **Methodology-bearing** — routes to R-C1 (geo-DS + domain-expert), and for Getis-Ord specifically, is already blocked on ADR-0025 (maintainer acceptance pending) per #280. **Out of scope for this ticket's sub-tickets** — do not propose a sub-ticket that invents a new OA aggregation method; only wire the existing ones. |
| Ecological-fallacy/MAUP framing on the coarse-grain OA section's prose | N/A (prose, not computation) | **Consulted, not gated** — geo-DS/domain-expert are "consulted only" per the ticket's own ownership list; this is the same disclosure-wording review pattern I18-web already used, not a fresh PASS/FAIL round. |

**Bottom line:** every OA-at-higher-levels sub-ticket in §6 below is display-only (web-engineer +
web-engineer-reviewer gate), because ADR-0024 already did the methodology work. This determination
itself does not need geo-DS/domain-expert sign-off (no computation changes) — it is a scoping-time
inventory, consistent with the ticket's own instruction to "route the methodology-bearing ones to
R-C1" only if such a view is proposed (none is, here).

---

## 5. Project-docs refresh list

| Doc | What's stale | Target message | Owner |
|---|---|---|---|
| `README.md` | Doesn't mention Epic I's story spine, the geo-hierarchy ladder (I18), or amenity/demographics blocks (I19/I20); roadmap section likely lags current epic state | Broaden pitch to match `storytelling-guide.md`'s four-chapter arc; refresh epic-status summary | data-analyst + PM |
| `/about` | Predates I18/I19/I20/I21 — "how it's built" summary may not mention the geo-hierarchy ladder or amenity work | Add one line per major epic-I addition since I1; keep frozen route, edit in place only | data-analyst |
| `/timeline` | I17 enrichment landed 2026-07 vintage; needs a fresh milestone for I18–I21 once each ships | Add milestones as each I21 sub-ticket lands (not en masse now — this doc is itself append-as-you-go per I17's design) | web pair (mechanical: append committed JSON) |
| `/how-its-built` | Data-pipeline description predates the geo-hierarchy crosswalks (Ortsteil dominant-PLR overlap, Bezirk dissolve) and amenity curation (I20) | Add a short "area hierarchy" and "amenity curation" paragraph | data-analyst |
| `/how-its-organised` | Agent team table — check it lists `comms-strategist` (I10) and any agent added since | Sync agent table to current `.claude/agents/` | web pair (mechanical) |
| `docs/epic-i/I2-route-map.md` | Frozen "as of I2" — if any route changes land from this ticket's sub-tickets (none currently planned beyond content moves within existing routes), this doc needs a superseding addendum | See §7 below (no route-map break expected) | system-architect (superseding note only if triggered) |

---

## 6. Proposed sub-ticket breakdown (sequenced, gated)

Each sized for one coder→reviewer loop. **None require a fresh R-C1 methodology round** (all are
either pure content-relocation, a new display-only section over an already-signed-off mart, or
docs) — the existing per-view gates (web-engineer-reviewer, and where noted, the existing
I18-web-style "coarse-grain display rules" precedent) apply. `geo-data-scientist` +
`gentrification-domain-expert` are **consulted, not gated**, only on §4's disclosure-wording
items, per the ticket's own ownership note.

1. **I21-a — Topic-page de-duplication (`maps`/`time-series`/`poi-map` → choosers + citywide-only).**
   Remove the three pages' per-area inline detail, replace with "open this area's profile" links
   into `area/{level}/[code]`; keep their genuinely-citywide content (choropleth, citywide
   aggregate charts, leaderboards) unchanged. *Gate: web-engineer-reviewer.* Depends: none (can
   start immediately).
2. **I21-b — Bezirk/PGR/BZR/Ortsteil page: add §5 (commercial mix) + §6 (OA profile, display-only
   per §4 above).** Wire `mart_poi_oa_arealevel`/`mart_poi_dominance` at each level's own grain,
   including `maup_caveat_required`/`is_public_safe` disclosure. *Gate: web-engineer-reviewer;
   geo-DS/domain-expert consulted on disclosure wording only (not a PASS/FAIL round).* Depends:
   none.
3. **I21-c — Bezirk/PGR/BZR/Ortsteil page: add §7 (amenities, I20 parity) + §8 (land value/rent).**
   §7 mirrors the already-built PLR-grain I20 mart aggregated up; §8 needs a coarse-grain
   price/rent aggregation that does not yet exist (`mart_price_rent_dimension` is PLR-only) —
   **flag this as a genuinely new aggregation** (sum/mean roll-up of an already-published rent
   figure) that should get a lightweight geo-DS sanity check (aggregation method only, not a new
   indicator) before wiring, consistent with how I19's rollup got `I19-geo-signoff.md`. *Gate:
   web-engineer-reviewer + light geo-DS consult (aggregation method, not new R-C1 round unless the
   geo-DS flags a MAUP concern).* Depends: none for §7; §8 needs its own small design note first.
4. **I21-d — `/berlin` landing page thinning.** Re-scope to the "thin city dashboard + hand-off"
   shape in §1. *Gate: web-engineer-reviewer.* Depends: I21-a (so its links target the
   already-de-duplicated topic pages).
5. **I21-e — Project-docs refresh** (README, About, how-its-built, how-its-organised) per §5.
   *Gate: data-analyst self-review + PM.* Depends: none, can run in parallel with a–d.
6. **I21-f — I2 route-map addendum (only if triggered).** If any sub-ticket above turns out to
   need a genuine new route (none currently expected — this plan is content-reshuffle within
   existing routes), file the addendum here rather than silently drifting from I2's frozen map.
   *Gate: system-architect.* Depends: a–d (only filed if one of them needs it).

**Sequencing:** a → (b, c, e in parallel) → d → f (conditional). No sub-ticket blocks I13's launch
route-stability criterion, since none introduces a new top-level route; I13 should re-confirm
this when it picks this epic's output up.

---

## 7. Route-map impact — does I2's frozen map need a supersession?

**No route additions or removals are planned** — every sub-ticket above either moves content
within an existing route (topic-page de-dup) or adds a new section to an existing per-level
profile page (no new URL). I2's route map (`docs/epic-i/I2-route-map.md`) therefore **does not
need to be superseded** by this plan as scoped. If a sub-ticket's implementation discovers a
genuine need for a new route (e.g., splitting a page that grows too large), it must file the I21-f
addendum above rather than silently drift — this is the one open contingency this scoping doc
flags for the maintainer's awareness, not something to pre-approve now.

---

## Acceptance (per #284's criteria)

- [x] Target IA: sitemap/route tree (§1).
- [x] Canonical per-level page template (§2).
- [x] Content → canonical home relocation map (§3).
- [x] OA-at-higher-levels display-vs-methodology-bearing determination (§4).
- [x] Project-docs refresh list (§5).
- [x] Proposed sub-ticket breakdown, sequenced, with gates (§6).
- [x] Route-map impact note (§7): no supersession needed as scoped; contingency flagged.
- [ ] **Maintainer approval** — pending. On approval, file I21-a through I21-f (I21-f only if
      triggered) as their own issues, on the board, linked to this doc and to #284.
