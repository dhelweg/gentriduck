---
title: All Gebiete (statistische Gebiete)
sidebar_position: 4
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
  #352: Hamburg's subarea_l2 rows have no name in the source data, so dim_area_geometry.area_name
  carries a derived label ('<Stadtteil> · <OSM place name>' or '<Stadtteil> · Gebiet <code>', see
  transform/models/intermediate/int_hamburg_gebiet_names.sql). The table leads with that label and
  keeps the code as a secondary column; sorting by label groups the Gebiete by Stadtteil.

  #353 (Hamburg-Berlin parity review): re-titled and re-framed to match its Berlin counterpart,
  pages/berlin/area/index.md ("All neighbourhoods (Planungsräume)") -- the full, searchable list
  that is the secondary way in, next to the district browse (/hamburg/area-detail, new in #353)
  and the map. sidebar_position 3 -> 4 to match Berlin's order (time series 1, maps 2, area
  detail 3, full list 4, POI map 5). The stale "Scaffold only -- no real figures" Alert is
  removed: the Gebiet pages have published real figures since #317/I20, and since #353 show the
  Gebiet's stage, commercial mix and Offering Advantage too. Columns now mirror Berlin's list:
  stage and pressure trend (the same per-Gebiet values /hamburg/maps shows, H3/#237) plus the
  district. The code column is kept only where the label doesn't already contain the code (#352
  review follow-up, same strpos test as everywhere else), and the OSM-label count is computed.
-->

<Hero compact eyebrow="Chapter 3 — The Evidence" title="All Gebiete (statistische Gebiete)" lede="Every Hamburg statistisches Gebiet — a full-text search, secondary to the district browse for most readers." />

Search or sort the table, or use the [district browse](/hamburg/area-detail) / [map](/hamburg/maps)
instead — that district browse is the primary way in for most readers; this page exists mainly so
every Gebiet has a real, findable page.

```sql label_stats
-- #353 (#352 review follow-up): computed instead of a hard-coded "41 of 943".
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'
```

<Alert status="info">
  <b>Gebiet names are labels, not official names.</b> Hamburg's statistische Gebiete carry only a
  numeric code in the source geodata, so each one is listed as its Stadtteil plus an
  OpenStreetMap neighbourhood or quarter name that lies inside it
  ({label_stats[0]?.n_osm_named ?? '—'} of {label_stats[0]?.n_gebiete ?? '—'} Gebiete), or its code
  where there is none (e.g. "Eimsbüttel · Gebiet 35001"). An OSM name marks a point inside the
  Gebiet; the neighbourhood it names may be larger or smaller than the Gebiet. See the
  <a href="/hamburg">Hamburg data hub</a> for the full data inventory.
</Alert>

```sql gebiete
select
    g.area_name,
    d.area_name as district,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
    case when strpos(g.area_name, 'Gebiet ' || g.area_code) > 0 then null else g.area_code end
        as code_note,
    '/hamburg/area/' || g.area_code as area_link
from gentriduck_marts.dim_area_geometry as g
left join
    gentriduck_marts.mart_area_hierarchy as h2
    on h2.city_code = 'HH' and h2.area_level = 'subarea_l2' and h2.area_code = g.area_code
left join
    gentriduck_marts.mart_area_hierarchy as h1
    on h1.city_code = 'HH' and h1.area_level = 'subarea_l1' and h1.area_code = h2.parent_area_code
left join
    gentriduck_marts.dim_area_geometry as d
    on d.city_code = 'HH' and d.area_level = 'district' and d.area_code = h1.parent_area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = g.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where g.city_code = 'HH' and g.area_level = 'subarea_l2'
order by g.area_name
```

<DataTable data={gebiete} rows=20 search=true link=area_link emptySet="warn" emptyMessage="No Hamburg Gebiet geometry available.">
    <Column id=area_name title="Statistisches Gebiet"/>
    <Column id=district title="District"/>
    <Column id=stage title="Stage"/>
    <Column id=pressure_trend title="Pressure trend"/>
    <Column id=code_note title="Code (if not in the name)"/>
</DataTable>

Hamburg's stages are not directly equivalent to same-named Berlin stages (Hamburg's Dynamik window
is 3 years, Berlin's 2; see [methodology §6](/methodology)). Gebiete without a stage have no
Sozialmonitoring classification in the latest Hamburg edition on this site.

---

<FooterNav />
