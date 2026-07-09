---
title: All neighbourhoods (Planungsräume)
sidebar_position: 14
---

# All neighbourhoods (Planungsräume)

<!--
  #150: pairs with pages/area/[code].md per Evidence's documented templated-page pattern
  (index.md + [param].md — https://docs.evidence.dev/core-concepts/templated-pages/). Not primary
  navigation (no nav link, no dropdown/picker UX) -- its job is to be a real, crawlable link to
  every current PLR so the static-site build (adapter-static, GitHub Pages, no server) actually
  generates a page for each of the 542 areas, since the canvas-rendered AreaMap can't be crawled
  server-side (its links only exist after client-side JS runs). The searchable table below is a
  legitimate secondary way in for anyone who lands here directly; the primary UX stays the district
  browse on /area-detail and the map/mover click-throughs.
-->

Every Berlin neighbourhood (Planungsraum) on its current (2021+) boundaries. Search or sort the
table, or use the [district browse](/area-detail) / [map](/maps) instead.

```sql all_areas
select
    area_name,
    substr(area_code, 1, 2) as bezirk,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by area_name
```

<DataTable data={all_areas} rows=542 search=true link=area_link>
    <Column id=area_name title="Neighbourhood (PLR)"/>
    <Column id=bezirk title="District code"/>
    <Column id=stage title="Stage"/>
    <Column id=pressure_trend title="Pressure trend"/>
</DataTable>

---

<sub>[Home](/) · [Methodology & data sources](/methodology) · [About this project](/about) · [GitHub repository](https://github.com/dhelweg/gentriduck)</sub>

