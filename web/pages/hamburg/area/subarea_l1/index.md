---
title: Stadtteile
sidebar_position: 2
---

<!--
  I21-g (#301, parent #284/I21): crawl-anchor for Hamburg's `headline`-grain (Stadtteil / BZR-
  equivalent) profile pages. Unlike Berlin's BZR pages (reached via a chained crawl from Bezirk's own
  "children" table, no separate bzr/index.md needed — see docs/epic-i/I21-web-feasibility.md §1),
  Hamburg's district -> subarea_l1 parent link is not yet exported to a web-queryable mart (see
  pages/hamburg/area/district/[code].md's header comment), so there is no children table to crawl
  through yet. This flat index plays the same crawl-anchor role pages/hamburg/area/index.md plays
  for subarea_l2, one level up — a real, server-rendered link to every Stadtteil so the static build
  can discover the /hamburg/area/subarea_l1/[code] route at all.

  Hamburg's 104 Stadtteile ARE named in the source data (dim_area_geometry, city_code='HH',
  area_level='subarea_l1' — confirmed in docs/epic-i/I21-ia-restructure-scoping.md §4's data
  inventory), so this table shows real names/codes — structural plumbing, not a statistic, same
  framing as every other index page in this scaffold.

  Route shape per docs/epic-i/I21-a-route-ruling.md §2/§4: `/hamburg/area/subarea_l1/[code]`,
  `subarea_l1` being Hamburg's own vocabulary term for the generic `headline` slot (Berlin: `bzr`).

  #353 (Hamburg-Berlin parity review): the stale "no real figures are published there yet" lede
  is replaced, and the table now mirrors Berlin's Ortsteil list (pages/berlin/area/ortsteil/
  index.md): Stadtteil, its district, and how many Gebiete it contains (OA-D1b/#240 crosswalk via
  mart_area_hierarchy, #302). The bare code column is dropped: Stadtteile are officially named.
-->

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Stadtteile" lede="Hamburg's 104 Stadtteile — the named, official scale between district and statistisches Gebiet." />

Each Stadtteil page shows how many of its statistische Gebiete currently sit in each
gentrification stage and trajectory type, plus mapped-place counts and everyday amenities — never
a re-scored index (see the [methodology page](/methodology)). See the
[district & area profiles hub](/hamburg/area/district) for the 7 districts, or the
[full Gebiet list](/hamburg/area) for individual statistische Gebiete.

```sql stadtteile
select
    s.area_code,
    s.area_name,
    d.area_name as district,
    count(c.area_code) as n_gebiete,
    '/hamburg/area/subarea_l1/' || s.area_code as stadtteil_link
from gentriduck_marts.dim_area_geometry as s
left join
    gentriduck_marts.mart_area_hierarchy as p
    on p.city_code = 'HH' and p.area_level = 'subarea_l1' and p.area_code = s.area_code
left join
    gentriduck_marts.dim_area_geometry as d
    on d.city_code = 'HH' and d.area_level = 'district' and d.area_code = p.parent_area_code
left join
    gentriduck_marts.mart_area_hierarchy as c
    on c.city_code = 'HH' and c.area_level = 'subarea_l2' and c.parent_area_code = s.area_code
where s.city_code = 'HH' and s.area_level = 'subarea_l1'
    -- #334: defensive guard, currently a no-op -- verified none of the 4 disclosure-control
    -- merged-pair Stadtteile (slash-joined area_code, e.g. "02117/118") have a dim_area_geometry
    -- row (no WFS geometry for a merged pair), so this table never lists one today. See
    -- district/[code].md's `children` query for why a slash-bearing code must never be linked.
    and s.area_code not like '%/%'
group by all
order by s.area_name
```

<DataTable data={stadtteile} rows=20 search=true link=stadtteil_link emptySet="warn" emptyMessage="No Hamburg Stadtteil geometry available.">
    <Column id=area_name title="Stadtteil"/>
    <Column id=district title="District"/>
    <Column id=n_gebiete title="Statistische Gebiete"/>
</DataTable>

---

<FooterNav />
