---
title: Area profiles
sidebar_position: 3
---

<!--
  I21-g (#301, parent #284/I21): Hamburg area-hierarchy scaffold, Track 1 (structure only, no live
  data — see docs/epic-i/I21-ia-restructure-scoping.md §4 and docs/epic-i/I21-a-route-ruling.md).
  This is the crawl-anchor for Hamburg's finest published grain (statistisches Gebiet / subarea_l2),
  mirroring pages/berlin/area/index.md's role (Evidence's static build only discovers a templated
  `[code].md` route by crawling a real, server-rendered `<a href>` -- see that page's own header
  comment for the mechanism; there is no separate static-paths query, confirmed in
  docs/epic-i/I21-web-feasibility.md §1).

  Route shape follows I21-a's architect ruling (docs/epic-i/I21-a-route-ruling.md §2/§4): singular
  `/hamburg/area/…` (NOT `/hamburg/areas/…`, correcting the scoping doc's original literal), with
  Hamburg's finest grain at the bare `/hamburg/area/[code]` leaf -- exact structural mirror of
  Berlin's `/berlin/area/[code]` PLR leaf, per the ruling's explicit recommendation ("bare leaf, for
  exact cross-city symmetry with Berlin").

  Why a flat list here, unlike Berlin's chained bezirk->pgr->bzr crawl: Berlin's coarser-to-finer
  "children" tables can link down because the LOR code-prefix nesting (dim_area_hierarchy.sql) is a
  cheap substr() on the child's own code -- no separate join needed. Hamburg's subarea_l2 ->
  subarea_l1 parent link is NOT a code-prefix fact; it is a resolved spatial crosswalk
  (`hh_l2_to_l1` in transform/models/intermediate/dim_area_hierarchy.sql, OA-D1b/#240, geo-DS +
  domain-expert PASS, merged to develop) that is NOT currently exported to the web layer -- only
  `transform/models/marts/*.sql` are exported to parquet (see transform/export_serving_parquet.py's
  `MART_MODELS` glob), and dim_area_hierarchy is an INTERMEDIATE model, not a mart. So there is no
  web-queryable parent/child edge to build a "children of this Stadtteil" table from yet (a separate,
  small follow-up: promoting dim_area_hierarchy's edges into a mart and registering it as an Evidence
  source -- flagged in this ticket's PR/report, not built here, since it's a data-engineering change
  outside a "structure only, no live data" web scaffold). This page is therefore reached directly
  (not via a parent's children table, the same role Berlin's own /berlin/area/index.md plays for its
  542 PLRs) and simply lists every subarea_l2 area_code this project has geometry for.

  dim_area_geometry (already Evidence-source-registered, web/sources/gentriduck_marts/
  dim_area_geometry.sql) is used here for names/codes ONLY -- structural plumbing (which areas
  exist), not a statistic -- consistent with the ticket's "no real Hamburg per-area numbers" scope.
  Hamburg's subarea_l2 rows carry a genuinely blank area_name in the source data (not a bug -- see
  pages/hamburg/index.md's header comment and reference/area-hierarchy.md), so this table is codes
  only, same honest framing pages/hamburg/index.md already uses for why no full-list page was built
  there.
-->

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Area profiles" lede="Hamburg's statistische Gebiete, by code — the crawl-anchor for each Gebiet's own scaffolded profile page. This list exists to make every area reachable, not as a polished browse experience (see the caveat below)." />

<Alert status="info">
  <b>No neighbourhood names at this grain.</b> Hamburg's statistische Gebiete carry only a numeric
  code in the source geodata — see the <a href="/hamburg">Hamburg data hub</a> for the full data
  inventory. Prefer <a href="/hamburg/area/district">browsing by district</a> or
  <a href="/hamburg/maps">the map</a> as a friendlier way in; this table is the technical crawl root
  that makes every Gebiet's own page buildable at all.
</Alert>

<Alert status="warning">
  <b>Scaffold only — no real figures published here yet.</b> This whole `/hamburg/area/…` route
  tree (I21-g, #301) is a structural scaffold: routes, breadcrumbs, and section layout exist and are
  reviewed, but no page under it shows a real Hamburg number yet — that is reserved for a
  separately-gated follow-up (I21-i, #303). See any area's own page for the full explanation.
</Alert>

```sql gebiete
select
    area_code,
    '/hamburg/area/' || area_code as area_link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'
order by area_code
```

<DataTable data={gebiete} rows=20 search=true link=area_link emptySet="warn" emptyMessage="No Hamburg Gebiet geometry available.">
    <Column id=area_code title="Gebiet code"/>
</DataTable>

---

<FooterNav />
