---
title: Area hierarchy
---

<!--
  OA-D7 (#240, ADR-0024), PASS 1 of 2 (web-only). New reference page: full drill-down on the
  administrative area hierarchy Offering Advantage's area_level roll-up (ADR-0024 D2) is built on,
  per docs/planning/oa-modes-hierarchy-dominance.md's "The two hierarchies" section. No frontmatter
  sidebar_position: child of pages/reference/, discovered via reference/index.md's LinkCards and
  methodology-oa-modes.md's own links (same "no separate index needed" pattern as
  pages/berlin/area/pgr/[code].md, see that page's header comment).

  Grounding (R-C2): transform/models/intermediate/dim_area_hierarchy.sql (the full derivation --
  Berlin LOR code-prefix nesting, Hamburg's source-provided district<-subarea_l1 edge, the
  unresolved subarea_l2->subarea_l1 edge, and the two-mechanism Ortsteil treatment),
  transform/seeds/seed_dim_area_level.csv (the level list + descriptions), ADR-0024 D2 (stock-first/
  LQ-last/broadcast-once roll-up rules), OA-D0 geo sign-off C1/C6/C8 (prefix-sum correctness,
  the C1b mass-conservation test, ST_Union Bezirk dissolve conditions), OA-D0 domain sign-off
  Condition D + OA-D2 domain sign-off (ecological-fallacy / headline-scale framing), ADR-0003
  (Berlin geographies).

  No live query on this page (pass-1, web-only scope) -- the level list and worked example below are
  a static restatement of the already-governed seed_dim_area_level.csv content and
  dim_area_hierarchy.sql's documented derivation, not a live-computed figure. The actual per-area
  browse experience (population/typology-stage counts by Bezirk/PGR/BZR/Ortsteil) already exists and
  is live today at /berlin/area and /berlin/area/bezirk -- this page explains the CONCEPT the roll-up
  relies on; it deliberately does not duplicate that live browse UI.
-->

<Hero compact eyebrow="Chapter 3 — The Evidence · reference / rulebook" title="Area hierarchy" lede="How Berlin's neighbourhood-scale statistical areas nest into coarser levels — and why that nesting makes it possible to compute Offering Advantage at a whole borough's scale without any new geometry." />

This page explains the area hierarchy behind the `area_level` scale-switch introduced on the
[Offering Advantage methodology page](/methodology-oa-modes) — the concept, not a live browse
experience (for that, see [all neighbourhoods](/berlin/area) or the
[district & area profiles](/berlin/area) already live on this site).

## Berlin: a hierarchy that nests by construction

Berlin's official small-area statistics use the **LOR** (Lebensweltlich orientierte Räume) system,
and its area codes are **literal digit prefixes** of each other — no separate lookup table is
needed to find a finer area's coarser parent, because the parent's code is already the leading
digits of the child's own code
([`dim_area_hierarchy.sql`](https://github.com/dhelweg/gentriduck/blob/main/transform/models/intermediate/dim_area_hierarchy.sql)).

| Level | Code length | Roughly how many in Berlin | What it represents |
|---|---|---|---|
| **Planungsraum (PLR)** | 8 digits | ~447 (pre-2021) / ~542 (2021+) | The finest level — a neighbourhood ("Kiez") of a few thousand residents. The scale this project's index and most of its maps are built at. |
| **Bezirksregion (BZR)** | 6 digits (leading 6 of a PLR code) | ~138 | A grouping of several PLRs — this project's recommended public headline scale above the single-neighbourhood level. |
| **Prognoseraum (PGR)** | 4 digits (leading 4 of a PLR code) | ~58 | A mid-level planning aggregate, between Bezirksregion and Bezirk. |
| **Bezirk (borough)** | 2 digits (leading 2 of a PLR code) | 12 | Berlin's boroughs — the coarsest, most administratively familiar level. |

**Worked example:** Planungsraum `01011101` (Bezirk 01 = Mitte) belongs to Bezirksregion
`010111`, which belongs to Prognoseraum `0101`, which belongs to Bezirk `01`. Reading off the same
8-digit code at 6, 4, and 2 digits *is* the containment chain — no separate join is needed to find
it.

<Alert status="info">
  <b>One separate, non-nesting geography:</b> Berlin's <b>97 Ortsteile</b> (Stadtteile — a legally
  defined subdivision of a Bezirk, distinct from the LOR system above) nest cleanly into Bezirk
  (their Bezirk code is provided directly by the source data, not derived), but do <b>not</b> nest
  into Planungsraum — a single PLR often spans more than one Ortsteil and vice versa. Where an
  Ortsteil's constituent PLRs are shown on this site (e.g. its
  <a href="/berlin/area/ortsteil">profile pages</a>), that is resolved by a separate area-overlap
  method (each PLR assigned to its <i>dominant</i>-overlap Ortsteil), not a code-prefix match — see
  <a href="https://github.com/dhelweg/gentriduck/blob/main/transform/models/intermediate/dim_area_hierarchy.sql">
  <code>dim_area_hierarchy.sql</code></a> for the full method.
</Alert>

### Why this makes coarser-scale figures possible without new geometry

Because the code prefix relationship is exact, this project can compute Offering Advantage (or any
other count-based statistic) at BZR, PGR, or Bezirk scale by **summing the underlying counts up the
prefix**, and only then computing the ratio — never by averaging each finer area's own ratio. This
matters because a ratio is not the average of its parts' own ratios (the same arithmetic trap known
as Simpson's paradox): summing first and dividing last is the only way to get the correct answer
([ADR-0024 D2](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0024-oa-calculation-modes-area-hierarchy-dominance.md)).
The citywide comparison point used at every scale is computed once, from the finest (PLR) level,
and reused unchanged — recomputing it separately at each scale would count every business up to
four times over.

<Alert status="warning">
  <b>BZR is this project's recommended public headline scale for anything coarser than a single
  neighbourhood; Bezirk-level figures are context only.</b> A Bezirk pools roughly 30–40 PLRs of
  very different character into one number — reading a borough-level figure as if it described any
  one Kiez inside it is a textbook ecological fallacy. See
  <a href="/methodology-oa-modes">the OA methodology page §4</a> for the full framing, restated from
  the <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-domain-signoff.md">OA-D0 domain sign-off, Condition D</a>.
</Alert>

## What's queryable today vs. derivable-only

| Level | Values computable? | Real polygon geometry? |
|---|---|---|
| PLR | Yes | Yes |
| BZR | Yes | Yes |
| PGR | Yes (prefix-summed) | Yes (WFS-ingested) |
| Bezirk | Yes (prefix-summed) | Yes — **derived**, not sourced: built by combining ("dissolving") that vintage's constituent PLR polygons into one shape per borough, rather than ingested from a separate source. No new data source was needed for this. |

Every level's *values* are available the moment the underlying counts exist (they're the same
counts, just added up differently); it was the **Bezirk polygon** specifically that required this
extra derivation step, since Berlin's open geodata does not publish a ready-made Bezirk boundary
file in the same series as the finer LOR levels.

## Hamburg: a different hierarchy, not a Berlin clone

Hamburg's equivalent small-area system uses different terms and, critically, **does not nest by
code prefix at all** — this project deliberately does not assume Berlin's trick generalizes.

| Berlin term | Hamburg equivalent (generic label used site-wide) |
|---|---|
| Bezirk | District |
| Prognoseraum / Bezirksregion (roughly) | Subarea (level 1) — Hamburg's *Stadtteil*, ~104 areas |
| Planungsraum | Subarea (level 2) — Hamburg's *statistisches Gebiet*, ~945 areas |

The **district ← subarea (level 1)** edge is resolved directly from Hamburg's own source data (a
Bezirk attribute the geodata already carries) — no derivation needed. The **subarea (level 1) ←
subarea (level 2)** edge, however, is **not currently resolved**: Hamburg's statistisches-Gebiet
geodata carries only a bare sequential ID and an area figure, with no parent-Stadtteil code and no
prefix relationship to derive one from. Building that link would require a new spatial-containment
method (matching each Gebiet's location against its enclosing Stadtteil boundary) — a genuine
methodology choice in its own right, not a mechanical extension of the Berlin approach, and it is
explicitly not yet built
([`dim_area_hierarchy.sql`](https://github.com/dhelweg/gentriduck/blob/main/transform/models/intermediate/dim_area_hierarchy.sql)).
This is disclosed here rather than assumed away: **Hamburg's Offering Advantage figures do not
currently roll up to a coarser scale the way Berlin's do.**

## What this does NOT do

- **It does not imply every level is equally reliable.** Coarser levels are more stable (larger
  data base per area) but coarser in resolution and higher ecological-fallacy risk; finer levels
  are the opposite. See [the OA methodology page §4](/methodology-oa-modes) for the
  resolution-vs-stability framing this hierarchy is read through.
- **It does not mean Hamburg is "behind."** Hamburg's hierarchy is genuinely structured
  differently (source-provided links, not code-prefix derivation) — this is a factual difference
  between the two cities' open-data systems, not a project gap to be silently closed with a
  Berlin-style shortcut.
- **It does not produce a re-scored gentrification index at any coarser-than-PLR level.** The
  gentrification index itself is never recomputed at Bezirk/PGR/BZR/Ortsteil grain — only sums and
  distributions of the underlying PLR-level classifications are shown at those levels (see
  [methodology §6](/methodology) for why averaging the ordinal Status/Dynamik classes across PLRs
  would itself be a methodological error, and the linked geo-data-scientist/domain-expert decisions
  behind that call).

## Honest caveats

- **This page describes a data-structural fact (code nesting), not a claim about which scale is
  "correct" for reading gentrification.** See [the OA methodology page §4](/methodology-oa-modes)
  for the actual measured PLR-vs-BZR ranking stability (a real, disclosed limitation — pooled
  Spearman ρ ≈ 0.66, below this project's own 0.7 stability threshold).
- **The Bezirk polygon is derived, not sourced** — while its numeric roll-up is exact (the same
  summed counts as every other level), the dissolved shape is one additional processing step
  compared to the other three levels, disclosed here for full transparency.
- **Hamburg's finest-level roll-up gap is a real, current limitation**, not a placeholder — any
  Hamburg figure on this site that appears to be at a coarser-than-source-level scale should be
  checked against this page before being read as a genuine roll-up.

## Further reading

- [Offering Advantage methodology page](/methodology-oa-modes) — how this hierarchy feeds the
  `area_level` scale switch for every OA calculation method.
- [POI taxonomy reference](/reference/poi-taxonomy) — the other hierarchy this site is built on, at
  the *business* rather than the *area* level.
- [All neighbourhoods](/berlin/area) and [district & area profiles](/berlin/area) — the live,
  queryable browse experience across this same hierarchy (population and typology-stage counts,
  today; not yet a re-scored Offering Advantage figure at coarser grain — see the OA methodology
  page's §4 for what pass 2 of that page will add).
- [ADR-0003](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0003-berlin-geographies-and-open-price-rent-sources.md) — Berlin's official geographies.
- [ADR-0024](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0024-oa-calculation-modes-area-hierarchy-dominance.md) — the roll-up rules this hierarchy is used for.
- [`dim_area_hierarchy.sql`](https://github.com/dhelweg/gentriduck/blob/main/transform/models/intermediate/dim_area_hierarchy.sql) and [`seed_dim_area_level.csv`](https://github.com/dhelweg/gentriduck/blob/main/transform/seeds/seed_dim_area_level.csv) — the full, versioned derivation and level list, in the GitHub repository.

---

<FooterNav />
