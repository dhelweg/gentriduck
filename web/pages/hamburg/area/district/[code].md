---
breadcrumb: "select area_name as breadcrumb from gentriduck_marts.dim_area_geometry where city_code = 'HH' and area_level = 'district' and area_code = '${params.code}' limit 1"
---

<!--
  I21-g (#301, parent #284/I21): Hamburg's `context_only`-grain (district / Bezirk-equivalent)
  profile page — the Hamburg counterpart of pages/berlin/area/bezirk/[code].md, per
  docs/epic-i/I21-ia-restructure-scoping.md §2.2's `context_only` row and the route shape decided in
  docs/epic-i/I21-a-route-ruling.md §2/§4 (`/hamburg/area/district/[code]`, `district` being
  Hamburg's own vocabulary term for the generic `context_only` slot).

  Discovered/crawled via pages/hamburg/area/district/index.md's 7-row district table.

  SCOPE (Track 1 of I21 §4 — structure only, no live data): same discipline as
  pages/hamburg/area/[code].md — the canonical `context_only` section order renders in full, but
  every substantive section shows the shared <NotYetPublished> honest-deferred state rather than a
  live query, even for marts that already hardcode-restrict to Berlin (mart_area_demographics,
  fct_gentrification_change/trajectory — see docs/epic-i/I21-web-feasibility.md §5's publish-gate
  footnote) and would therefore just render an empty-state anyway: a fixed placeholder is used
  instead of relying on an incidental empty query result, so this page's honesty doesn't depend on
  which marts happen to be city-gated today (see NotYetPublished.svelte's own header comment).
  area_name IS read from dim_area_geometry (structural — Hamburg's 7 districts are genuinely named
  in the source data), the same "plumbing, not a statistic" precedent as the district index page.

  Per §2.2's `context_only` row, this grain would NEVER show a re-scored index value even once
  published (docs/epic-i/I-coarse-index-geo-decision.md / -domain-decision.md, DECLINE) — only a
  distribution + modal/heterogeneity flag, same rule Berlin's own bezirk/pgr/bzr pages already
  follow (see pages/berlin/area/bezirk/[code].md's header comment). Noted here so a future I21-i
  pass knows this page's eventual "Social status" section is a distribution, not a BigValue, even
  once real data is wired in.

  Hierarchy nav (§2.2 row 8): a `context_only` grain has children (subarea_l1 / Stadtteile in this
  district) and no parent (district is Hamburg's coarsest level) — mirrors Berlin bezirk's own
  up-link-less, children-table-only treatment. Hamburg's district -> subarea_l1 edge is
  SOURCE-PROVIDED (the WFS 'bezirk' attribute on the Stadtteil layer, passed through unmodified in
  dim_area_hierarchy.sql's `hh_l1_to_district` CTE — not a derivation, unlike the L2->L1 spatial
  crosswalk) but, like that edge, dim_area_hierarchy is an intermediate model with no mart/Evidence
  source registered (see pages/hamburg/area/[code].md's header comment for the same gap, restated
  here for this page's own children-table case) — so no live "children" table can be built yet
  either. Rendered below as an explicit deferred state, not an empty DataTable.
-->

```sql district_name
select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${params.code}'
limit 1
```

<Hero compact eyebrow="Chapter 3 — The Evidence" title="{district_name[0] ? district_name[0].area_name : 'District'} — district profile" lede="Hamburg's district-level (Bezirk-equivalent) scaffold — the coarsest grain in Hamburg's area hierarchy. Structural scaffold only (I21-g, #301); no real figures are published yet." />

[All districts](/hamburg/area/district) · [Hamburg data hub](/hamburg)

<NotYetPublished pageLevel what="this district's population, gentrification-stage distribution, commercial mix, and demographic sums" />

## Social status & trajectory

Once published, this section will show a **distribution** of this district's constituent
Stadtteile'/Gebiete's own stages — never a single re-scored index value for the district itself
(same rule already governing Berlin's Bezirk/PGR/BZR pages; see
[methodology](/methodology) and `docs/epic-i/I-coarse-index-geo-decision.md`).

<NotYetPublished what="a neighbourhood-stage distribution for this district" />

## Commercial mix & Offering Advantage

<NotYetPublished what="this district's commercial-mix breakdown and Offering Advantage roll-up" />

## Within-group dominance

<NotYetPublished what="within-group dominance figures for this district" />

## People & structure

<NotYetPublished what="demographic sums for this district" />

## Amenities & everyday infrastructure

<NotYetPublished what="everyday-infrastructure sums for this district" />

## Land value & estimated rent

<NotYetPublished what="land value / estimated rent figures for this district" />

## Where this area sits

### Stadtteile in this district

<Alert status="info">
  <b>Children table pending web-layer wiring.</b> This district's constituent Stadtteile are a
  source-provided fact (Hamburg's own WFS district attribute) resolved on the data layer in
  <code>dim_area_hierarchy.sql</code>, but that model is not yet exported to a web-queryable mart
  (see this page's own header comment for the full explanation — the same plumbing gap affects
  every Hamburg area page's hierarchy nav). This is disclosed here rather than shown as an empty
  table.
</Alert>

## Honest caveats

- **This entire page is a structural scaffold (I21-g, #301).** No section above shows a real
  Hamburg figure — publishing this page's content is a separately-gated follow-up (I21-i, #303).
- **Even once published, this grain will never show a single re-scored gentrification-index value**
  — only a distribution of its constituent areas' own stages, per the same ruling already governing
  Berlin's Bezirk/PGR/BZR pages (`docs/epic-i/I-coarse-index-geo-decision.md`, DECLINE).
- **The "Stadtteile in this district" table is disclosed as pending, not broken.** The underlying
  parent link is source-provided and already resolved in the data layer; only its export to a
  web-queryable mart is outstanding.
- See [Hamburg's data hub](/hamburg) for the full, current inventory of what is and isn't published
  for Hamburg, and [methodology & data sources §6](/methodology) for how Hamburg's data differs from
  Berlin's generally.

## Further reading

See the [Hamburg data hub](/hamburg) for what's published today, [Hamburg's map](/hamburg/maps) for
this district's constituent areas' already-public gentrification-stage figures, or
[the area-hierarchy reference](/reference/area-hierarchy) for how Hamburg's small-area geography is
structured.

---

<FooterNav />
