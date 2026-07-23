---
breadcrumb: "select area_name as breadcrumb from gentriduck_marts.dim_area_geometry where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${params.code}' limit 1"
---

<!--
  I21-g (#301, parent #284/I21): Hamburg's `headline`-grain (Stadtteil / BZR-equivalent) profile
  page — the Hamburg counterpart of pages/berlin/area/bzr/[code].md, per
  docs/epic-i/I21-ia-restructure-scoping.md §2.2's `headline` row and the route shape decided in
  docs/epic-i/I21-a-route-ruling.md §2/§4 (`/hamburg/area/subarea_l1/[code]`, `subarea_l1` being
  Hamburg's own vocabulary term for the generic `headline` slot).

  Discovered/crawled via pages/hamburg/area/subarea_l1/index.md's 104-row Stadtteil table (a flat
  index, not a chained crawl from the district page — see that index page's own header comment for
  why).

  SCOPE (Track 1 of I21 §4 — structure only, no live data): same discipline as every other page in
  this scaffold — the canonical `headline` section order renders in full, but every substantive
  section shows the shared <NotYetPublished> honest-deferred state rather than a live query.
  area_name IS read from dim_area_geometry (structural — Hamburg's 104 Stadtteile are genuinely
  named in the source data), same "plumbing, not a statistic" precedent as every index page here.

  Hierarchy nav (§2.2 row 8): a `headline` grain has BOTH a parent (district) and children
  (subarea_l2 / Gebiete in this Stadtteil) — mirrors Berlin's BZR page shape. Both edges exist on
  the data layer (district -> subarea_l1 is source-provided; subarea_l2 -> subarea_l1 is the OA-D1b
  spatial crosswalk, #240, geo-DS + domain-expert PASS) but NEITHER is exported to a web-queryable
  mart yet (dim_area_hierarchy is an intermediate model — see pages/hamburg/area/[code].md's header
  comment for the full explanation of this gap, which is identical for both edges here). Both the
  "Up:" link and the "children" table below render the same explicit deferred state, not a broken
  or silently-empty nav.
-->

```sql stadtteil_name
select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${params.code}'
limit 1
```

<Hero compact eyebrow="Chapter 3 — The Evidence" title="{stadtteil_name[0] ? stadtteil_name[0].area_name : 'Stadtteil'}" lede="Hamburg's Stadtteil-level (Bezirksregion-equivalent) scaffold — the headline scale between district and statistisches Gebiet. Structural scaffold only (I21-g, #301); no real figures are published yet." />

<Alert status="info">
  <b>Up:</b> this Stadtteil's parent district is a resolved, source-provided fact on the data layer,
  but not yet exported to a web-queryable mart — see the "Where this area sits" section below for
  the full, honest explanation, rather than a broken or guessed link here.
</Alert>

[All Stadtteile](/hamburg/area/subarea_l1) · [Districts](/hamburg/area/district) ·
[Hamburg data hub](/hamburg)

<NotYetPublished pageLevel what="this Stadtteil's status, trajectory, commercial mix, and demographic profile" />

## Social status & trajectory

Once published, this section will show a **distribution** of this Stadtteil's constituent Gebiete's
own stages — never a single re-scored index value for the Stadtteil itself, unless a future ticket
promotes this grain to primary-equivalent scoring (currently out of scope; see
`docs/epic-i/I21-ia-restructure-scoping.md` §2.2's `headline` row).

<NotYetPublished what="a neighbourhood-stage distribution for this Stadtteil" />

## Commercial mix & Offering Advantage

<NotYetPublished what="this Stadtteil's commercial-mix breakdown and Offering Advantage roll-up" />

## Within-group dominance

<NotYetPublished what="within-group dominance figures for this Stadtteil" />

## People & structure

<NotYetPublished what="demographic sums for this Stadtteil" />

## Amenities & everyday infrastructure

<NotYetPublished what="everyday-infrastructure sums for this Stadtteil" />

## Land value & estimated rent

<NotYetPublished what="land value / estimated rent figures for this Stadtteil" />

## Where this area sits

<Alert status="info">
  <b>Hierarchy nav pending web-layer wiring, both directions.</b> This Stadtteil's parent district
  and its constituent Gebiete are both resolved on the data layer (
  <code>dim_area_hierarchy.sql</code>'s <code>hh_l1_to_district</code> and <code>hh_l2_to_l1</code>
  edges — the latter a geo-DS + domain-expert-approved spatial crosswalk, OA-D1b/#240, merged to
  <code>develop</code>) but neither is exported to a web-queryable mart yet — only
  <code>transform/models/marts/*.sql</code> models are exported to parquet
  (<code>transform/export_serving_parquet.py</code>), and <code>dim_area_hierarchy</code> is an
  intermediate model. This is disclosed here rather than shown as a broken link or an empty table.
</Alert>

## Honest caveats

- **This entire page is a structural scaffold (I21-g, #301).** No section above shows a real
  Hamburg figure — publishing this page's content is a separately-gated follow-up (I21-i, #303).
- **Both the "Up" link and "children" table are disclosed as pending, not broken.** The underlying
  parent/child links are resolved (one source-provided, one a signed-off spatial crosswalk); only
  their export to a web-queryable mart is outstanding.
- See [Hamburg's data hub](/hamburg) for the full, current inventory of what is and isn't published
  for Hamburg, and [methodology & data sources §6](/methodology) for how Hamburg's data differs from
  Berlin's generally.

## Further reading

See the [Hamburg data hub](/hamburg) for what's published today, [Hamburg's map](/hamburg/maps) for
this Stadtteil's constituent areas' already-public gentrification-stage figures, or
[the area-hierarchy reference](/reference/area-hierarchy) for how Hamburg's small-area geography is
structured.

---

<FooterNav />
