---
title: Districts
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
-->

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Districts" lede="Hamburg's 7 districts (Bezirke) — the coarsest grain in Hamburg's area hierarchy. Each district's own page is a structural scaffold (I21-g, #301); no real figures are published there yet." />

```sql districts
select
    area_code,
    area_name,
    '/hamburg/area/district/' || area_code as district_link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district'
order by area_name
```

<DataTable data={districts} rows=7 link=district_link emptySet="warn" emptyMessage="No Hamburg district geometry available.">
    <Column id=area_name title="District"/>
    <Column id=area_code title="Code"/>
</DataTable>

---

<FooterNav />
