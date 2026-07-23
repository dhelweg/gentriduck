---
breadcrumb: "select '${params.code}' as breadcrumb"
---

<!--
  I21-g (#301, parent #284/I21): Hamburg's `primary`-grain (statistisches Gebiet / subarea_l2) area
  page — the Hamburg leaf of the canonical per-level template I21-f (#300) consolidated at
  /berlin/area/[code].md, per docs/epic-i/I21-ia-restructure-scoping.md §2.2 and the route shape
  decided in docs/epic-i/I21-a-route-ruling.md §2/§4 (`/hamburg/area/[code]`, bare leaf, singular
  `area`, mirroring Berlin's PLR leaf exactly — NOT `/hamburg/areas/…`).

  Discovered/crawled via pages/hamburg/area/index.md's flat Gebiet list (same "Evidence builds
  whatever route a link points at" mechanism as every other templated page on this site — see that
  page's own header comment for why a flat list, not a chained children-table crawl, is used for
  Hamburg specifically).

  SCOPE (Track 1 of I21 §4 — structure only, no live data): this page renders the FULL canonical
  section order (docs/epic-i/I21-ia-restructure-scoping.md §2.2's `primary`-grain row) so the
  template is genuinely reviewable end-to-end, but every section that would show a real Hamburg
  figure renders the shared <NotYetPublished> honest-deferred state instead of a live query — see
  that component's own header comment for why a fixed placeholder is used here rather than a live
  query that would happen to return real rows for some marts (e.g. gentrification_index already
  publishes Hamburg subarea_l2 stage/status on /hamburg/maps, H3/#237) and empty rows for others.
  Publishing this page's real content is explicitly reserved for I21-i (#303), which is its own,
  separately-gated ticket — this page must not pre-empt that gate even where a mart could already
  answer the query correctly today. No mart is queried here except dim_area_geometry, for the area's
  own existence/code (structural plumbing, not a statistic — same framing as
  pages/hamburg/area/index.md).

  Hierarchy nav (§2.2 row 8): a `primary`-grain leaf only needs an "Up:" link (no children — same as
  /berlin/area/[code].md's own leaf treatment). Hamburg's subarea_l2 -> subarea_l1 parent edge IS
  now resolved on the data layer (OA-D1b, #240, ST_Within centroid-in-polygon crosswalk, geo-DS +
  domain-expert PASS, merged to develop -- see transform/models/intermediate/dim_area_hierarchy.sql's
  `hh_l2_to_l1` CTE) — this SUPERSEDES reference/area-hierarchy.md's current text, written before
  OA-D1b landed, which still describes this edge as "not currently resolved" (flagged here and in
  this ticket's own report for the PM/data-analyst to correct as part of I21-j, the docs-refresh
  ticket; not corrected in this file since that page is out of this ticket's scope). What is still
  genuinely missing is the WEB-LAYER wiring: dim_area_hierarchy is an intermediate model, not a mart
  (transform/models/intermediate/, not transform/models/marts/), so it is not exported to parquet by
  transform/export_serving_parquet.py and has no Evidence source registered under
  web/sources/gentriduck_marts/. There is therefore no queryable parent code for this page's "Up:"
  link today — rendered below as an explicit, honest deferred state (never a broken/silent
  breadcrumb), distinct from the "not yet published" numeric-content state above: this is a
  plumbing gap (the edge is resolved but not wired to the web layer), not a publication-gate
  decision.
-->

```sql code_info
-- Build-time-fixed route parameter, the same `${params.code}` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's `area_info` query) --
-- selected into a plain row so it can be referenced in markup as `code_info[0].area_code`, the
-- established pattern (this page has no name to derive from a mart, unlike Berlin's PLR page, so
-- this trivial select stands in for that role).
select '${params.code}' as area_code
```

```sql area_exists
select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${params.code}'
limit 1
```

<script>
  // Plain script-computed fallback, kept out of markdown text/attribute strings -- mdsvex's
  // smart-quote pass rewrites straight `'…'` quotes inside markdown text (including heading text
  // containing a mustache expression) into curly typographic quotes, which then breaks the Svelte
  // expression parser (confirmed: build failed on the equivalent inline ternary in a `##` heading).
  // Computing the fallback here once avoids embedding any quote character in markdown prose.
  $: codeLabel = code_info[0] ? code_info[0].area_code : '';
</script>

<Hero compact eyebrow="Chapter 3 — The Evidence · most granular" title="Statistisches Gebiet {codeLabel}" lede="Hamburg's finest published small-area grain — the same scale Berlin's Planungsraum profile page covers, scaffolded here (I21-g, #301) ahead of Hamburg's own numbers going live." />

{#if area_exists.length === 0}
<Alert status="warning">
  No Hamburg Gebiet geometry found for code <b>{codeLabel}</b> —
  this route should only be reachable via a real crawled link from
  <a href="/hamburg/area">the Gebiet list</a>; if you landed here another way, that list is the
  reliable starting point.
</Alert>
{/if}

<NotYetPublished pageLevel what="this Gebiet's status, trajectory, commercial mix, and demographic profile" />

## Statistisches Gebiet {codeLabel} at a glance

<NotYetPublished what="a plain-language portrait for this area (equivalent to the PLR page's 'at a glance' summary)" />

This area's current gentrification-stage classification is already public on
[Hamburg's map](/hamburg/maps) (hover the Gebiet's shape or search its code) — this page does not
repeat that figure yet; see the header comment above for why.

## Social status & trajectory

<NotYetPublished what="a status/trajectory chart for this area" />

## Commercial mix & Offering Advantage

<NotYetPublished what="this area's commercial-mix breakdown and Offering Advantage profile" />

## Within-group dominance

<NotYetPublished what="within-group dominance figures for this area" />

## People & structure

<NotYetPublished what="demographic figures for this area" />

## Amenities & everyday infrastructure

<NotYetPublished what="everyday-infrastructure counts for this area" />

## Land value & estimated rent

<NotYetPublished what="land value / estimated rent figures for this area" />

## Where this area sits

<Alert status="info">
  <b>Hierarchy nav pending web-layer wiring.</b> This Gebiet's parent Stadtteil (subarea_l1) IS
  resolved on the data layer (OA-D1b, #240 — a geo-DS + domain-expert-approved spatial crosswalk,
  merged to <code>develop</code>) but is not yet exported to a web-queryable mart, so no "Up:" link
  can be rendered correctly here yet. This is <b>not</b> a broken or silently-wrong breadcrumb — it
  is an explicit, disclosed plumbing gap between an already-resolved data-layer edge and this
  scaffold's web layer. See <a href="/reference/area-hierarchy">the area-hierarchy reference page</a>
  for the general concept (note: that page's own text predates OA-D1b and should be treated as
  stale on this specific point until it is refreshed).
</Alert>

## Honest caveats

- **This entire page is a structural scaffold (I21-g, #301).** No section above shows a real
  Hamburg figure, even where an underlying mart already has real Hamburg rows for some other public
  page (e.g. this Gebiet's stage is already shown on [the map](/hamburg/maps)) — publishing this
  page's own content is a separately-gated follow-up (I21-i, #303), not assumed here.
- **The "Up: Stadtteil" hierarchy link is disclosed as pending, not broken.** The underlying spatial
  crosswalk is resolved and signed off; only its export to a web-queryable mart is outstanding.
- See [Hamburg's data hub](/hamburg) for the full, current inventory of what is and isn't published
  for Hamburg, and [methodology & data sources §6](/methodology) for how Hamburg's data differs from
  Berlin's generally.

## Further reading

See the [Hamburg data hub](/hamburg) for what's published today, [Hamburg's map](/hamburg/maps) for
this area's already-public gentrification-stage figure, the
[POI & Offering Advantage map](/hamburg/poi-map) for its commercial-mix signal, or
[the area-hierarchy reference](/reference/area-hierarchy) for how Hamburg's small-area geography is
structured.

---

<FooterNav />
