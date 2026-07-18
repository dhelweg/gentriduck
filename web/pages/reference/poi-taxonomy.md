---
title: POI taxonomy
---

<!--
  OA-D7 (#240, ADR-0024), PASS 1 of 2 (web-only). New reference page: full drill-down on the
  domain->category->type POI taxonomy Offering Advantage is computed over, per
  docs/planning/oa-modes-hierarchy-dominance.md's "The two hierarchies" section ("short vocabulary
  sections inline on the OA-modes page + full drill-down on a reference page"). No frontmatter
  sidebar_position: this is a child of the pages/reference/ folder, discovered via that folder's
  index.md link (same "no separate index needed, Evidence crawls any real server-rendered <a href>"
  pattern the Bezirk/PGR page ladder already uses -- see pages/berlin/area/pgr/[code].md's header
  comment for the citation) and via LinkCards on reference/index.md and this project's own
  methodology-oa-modes.md.

  Grounding (R-C2): transform/seeds/seed_poi_thesis_taxonomy_crosswalk.csv (the domain/category
  list and the Handwerk/Werkstatt translation-caveat note), transform/models/intermediate/
  int_osm_poi_harmonized.sql (tag-drift remapping header, craft=* non-adoption decision),
  ADR-0017 D1 (type nests under domain, not category -- the "genuine quirk" the planning doc asks
  this page to state plainly), ADR-0018 (the causal-tiered curation this taxonomy also serves),
  docs/planning/oa-modes-hierarchy-dominance.md ("The two hierarchies" section).

  No live query on this page (pass-1, web-only scope) -- the domain/category list below is a static
  restatement of the already-governed seed_poi_thesis_taxonomy_crosswalk.csv and
  seed_poi_offering_relevance.csv content, not a live-computed figure.
-->

<Hero compact eyebrow="Chapter 3 — The Evidence · reference / rulebook" title="POI taxonomy" lede="How every mapped shop, café, or other point of interest on this site is classified — the domain → category → type ladder Offering Advantage and within-group dominance are both built from." />

This page restates, in full, the classification scheme every OpenStreetMap point of interest (POI)
on this site is sorted into before any statistic — Offering Advantage, within-group dominance, or
the raw density map — is computed from it. It is the reference drill-down for the vocabulary
introduced on the [Offering Advantage methodology page](/methodology-oa-modes); nothing here is a
new indicator or classification rule of its own.

## The three levels

Every mapped place is classified at three nested levels, from broadest to most specific:

- **Domain** — the broadest grouping (e.g. *Gastronomy*, *Retail*, *Services*). This project tracks
  13 domains.
- **Category** — a grouping within a domain (e.g. *Gastronomy → Café*, *Retail → Clothing*).
- **Type** — the most specific classification, where it exists (e.g.
  *Gastronomy → Restaurant → Italian Restaurant*). Not every category is further split into types.

**Worked example:** a mapped Italian restaurant sits at
**Gastronomy → Restaurant → Italian Restaurant**.

<Alert status="warning">
  <b>A genuine quirk, not an oversight:</b> for Offering Advantage specifically, a <b>type</b> is
  compared against its <b>domain</b> total, not its category total — Offering Advantage's nested
  location quotient nests <i>type within domain</i>, skipping the intermediate category level
  entirely
  (<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md">ADR-0017 D1</a>).
  So "how over-represented is Italian Restaurant here" is read against all of Gastronomy, not just
  against all Restaurants. This is a deliberate, documented modelling choice inherited from the
  2018 thesis's own construct — not a bug in this project's taxonomy.
</Alert>

## The 13 domains

| Domain | What it covers |
|---|---|
| Entertainment | Bars, nightlife, culture, leisure |
| Gastronomy | Cafés, restaurants, fast food |
| Mobility | Transit-adjacent infrastructure |
| Office | Workplaces, coworking |
| Other | Places that don't fit an existing domain |
| Public Service | Banks, education, health, safety, social services |
| Public Space | Parks, squares, and similar shared space |
| Religion | Places of worship |
| Retail | Shops — clothing, food & drink, hardware, tech, and more |
| Services | Personal-care and other everyday services (hairdressers, beauty, massage, laundry, travel, funeral homes) |
| Sports and Recreation | Fitness, martial arts, sauna, and other recreation |
| Tourism | Accommodation, sights, visitor information |
| Vacancy | Empty commercial premises (a disinvestment marker, tracked separately from every other domain — see [methodology §1](/methodology)) |

## Sample categories, by domain

A non-exhaustive sample of how a few domains split into categories (see the
[source seed](https://github.com/dhelweg/gentriduck/blob/main/transform/seeds/seed_poi_thesis_taxonomy_crosswalk.csv)
on GitHub for the complete, versioned list):

| Domain | Categories (sample) |
|---|---|
| Gastronomy | Café, Restaurant, Fast Food |
| Retail | Art, Clothing, Drugstore, Food and Drink, Hardware, Medical, Other Goods, Other Shop, Print, Tech, Toys and Gifts, Workshop |
| Entertainment | Bar, Nightlife, Culture, Leisure |
| Services | Beauty, Funeral, Hairdresser, Laundry, Massage, Travel |
| Public Service | Bank, Education, Health, Safety, Social, Other |

## Where the taxonomy comes from, and one known translation caveat

The domain/category mapping is sourced from
[`seed_poi_thesis_taxonomy_crosswalk.csv`](https://github.com/dhelweg/gentriduck/blob/main/transform/seeds/seed_poi_thesis_taxonomy_crosswalk.csv) —
a crosswalk between this project's classification and the 2018 thesis's own German-language
category names, so the revived index stays comparable to the original. **One recorded translation
caveat:** the thesis's German category *"Handwerk"* (craft trades) is mapped to this project's
**Hardware** category, and *"Werkstatt"* (workshop) is mapped to **Workshop** — a deliberate
translation pairing, not a literal word-for-word cognate. The **type** level (the finest grain,
e.g. individual cuisines within Restaurant) is sourced separately, from the OpenStreetMap tag
mapping itself
([`int_osm_poi_harmonized.sql`](https://github.com/dhelweg/gentriduck/blob/main/transform/models/intermediate/int_osm_poi_harmonized.sql)),
since the thesis-crosswalk seed only carries domain- and category-level rows.

**A related, documented no-op decision:** OpenStreetMap's `craft=*` tag namespace (carpenters,
electricians, and similar trades) was inventoried and deliberately *not* adopted into this
taxonomy — it is a mixed utility/trade signal rather than the artisanal/creative subset the
gentrification literature points to, and adopting it would have required re-processing the entire
multi-year POI history for a modest volume gain
([craft-taxonomy decision record](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-c/tickets/C-craft-taxonomy-decision.md)).

## How this taxonomy feeds Offering Advantage and dominance

- **Offering Advantage** compares a category's or type's local share of its parent to the citywide
  share of that same parent — see the [OA methodology page](/methodology-oa-modes) for the full
  method vocabulary.
- **Curated ("improved") Offering Advantage** — a separate, theory-weighted subset of this same
  taxonomy — is documented in
  [ADR-0018](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md)
  and compared against the uncurated ("faithful") version in
  [methodology §7](/methodology#7-faithful-vs-improved--a-methodology-comparison).
- **Within-group dominance** is computed only over a curated allow-list of business groups from
  this taxonomy (Gastronomy, Retail, Entertainment, and a cross-domain wellness group) — see
  [the OA methodology page §5](/methodology-oa-modes) for exactly which groups, and why the rest
  are deliberately excluded.

## Honest caveats

- **This is a classification scheme, not a quality judgement.** A business appearing in a given
  category is a statement about what kind of place it is, never about its quality, ownership, or
  cultural value.
- **OpenStreetMap tagging drifts over time**, and this project applies an approved remapping
  (`int_osm_poi_harmonized.sql`) to keep classifications comparable across years — but that
  remapping only covers tags this project has already reviewed; an unreviewed or newly-introduced
  OSM tag falls back to its original (native) classification until reviewed.
- **The taxonomy is Berlin-first and not automatically portable.** The *categories themselves*
  travel reasonably well to another city (a café is a café), but the *cultural/price ladder* built
  on top of this taxonomy for the within-group dominance construct (§5 of the
  [OA methodology page](/methodology-oa-modes)) is culturally specific to Berlin and would need
  re-authoring, not a direct port, for another city
  ([docs/planning/oa-modes-hierarchy-dominance.md](https://github.com/dhelweg/gentriduck/blob/main/docs/planning/oa-modes-hierarchy-dominance.md), "City reusability").

## Further reading

- [Offering Advantage methodology page](/methodology-oa-modes) — how this taxonomy feeds every OA
  calculation method and the dominance model.
- [Area hierarchy reference](/reference/area-hierarchy) — the other hierarchy this site is built
  on, at the *area* rather than the *business* level.
- [ADR-0017](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md) and [ADR-0018](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md) — the full Offering Advantage and curation methodology.
- [`seed_poi_thesis_taxonomy_crosswalk.csv`](https://github.com/dhelweg/gentriduck/blob/main/transform/seeds/seed_poi_thesis_taxonomy_crosswalk.csv) and [`seed_poi_offering_relevance.csv`](https://github.com/dhelweg/gentriduck/blob/main/transform/seeds/seed_poi_offering_relevance.csv) — the full, versioned taxonomy and curation-weight seeds, in the GitHub repository.

---

<FooterNav />
