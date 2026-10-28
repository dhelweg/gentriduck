---
title: District & area profiles
sidebar_position: 1
---

<!--
  I21-g (#301, parent #284/I21): crawl-anchor for Hamburg's `context_only`-grain (district / Bezirk-
  equivalent) profile pages, mirroring pages/berlin/area/bezirk/index.md's role. Hamburg's 7
  districts ARE named in the source data (dim_area_geometry, city_code='HH', area_level='district'
  — confirmed in docs/epic-i/I21-ia-restructure-scoping.md §4's data inventory), so this table shows
  real names/codes, same "structural plumbing, not a statistic" framing as
  pages/hamburg/area/index.md's Gebiet list — no gentrification/demographic/OA figure appears here.

  Route shape per docs/epic-i/I21-a-route-ruling.md §2/§4: `/hamburg/area/district/[code]`, `district`
  being Hamburg's own vocabulary term for the generic `context_only` slot (Berlin: `bezirk`).

  #353 (Hamburg-Berlin parity review): re-titled "District & area profiles" to match its Berlin
  counterpart (pages/berlin/area/bezirk/index.md), which plays the same hub role (district list +
  a pointer to the other named geography, Ortsteile there, Stadtteile here). The stale "no real
  figures are published there yet" lede is replaced: district pages have shown real figures since
  #317 and, since #353, the Gebiete's stage mix and mapped-place counts too.
-->

<Hero compact eyebrow="Chapter 3 — The Evidence" title="District & area profiles" lede="Hamburg's 7 Bezirke (districts) and its 104 Stadtteile — coarser-grain profiles above the statistisches-Gebiet level, for readers who want the district or Stadtteil picture at a glance." />

Each district and Stadtteil page shows how many of its statistische Gebiete currently sit in each
gentrification stage and trajectory type, plus mapped-place counts — never a re-scored index (see
the [methodology page](/methodology) for why coarse-grain areas are not re-scored). For a single
Gebiet's full profile, use the [district browse](/hamburg/area-detail) or the
[full Gebiet list](/hamburg/area) instead. Hamburg's 104 **Stadtteile** have their own
[Stadtteil list](/hamburg/area/subarea_l1).

```sql districts
select
    d.area_code,
    d.area_name,
    count(h.area_code) as n_stadtteile,
    '/hamburg/area/district/' || d.area_code as district_link
from gentriduck_marts.dim_area_geometry as d
left join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = d.area_code
    -- #334: merged-pair Stadtteil codes have no geometry and no page; not counted.
    and h.area_code not like '%/%'
where d.city_code = 'HH' and d.area_level = 'district'
group by all
order by d.area_name
```

<DataTable data={districts} rows=7 link=district_link emptySet="warn" emptyMessage="No Hamburg district geometry available.">
    <Column id=area_name title="District"/>
    <Column id=n_stadtteile title="Stadtteile"/>
</DataTable>

---

<FooterNav />
