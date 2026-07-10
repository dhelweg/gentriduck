---
title: All neighbourhoods (Planungsräume)
sidebar_position: 4
---

# All neighbourhoods (Planungsräume)

<!--
  #150: pairs with pages/berlin/area/[code].md per Evidence's documented templated-page pattern
  (index.md + [param].md — https://docs.evidence.dev/core-concepts/templated-pages/). Not primary
  navigation (no nav link, no dropdown/picker UX) -- its job is to be a real, crawlable link to
  every current PLR so the static-site build (adapter-static, GitHub Pages, no server) actually
  generates a page for each of the 542 areas, since the canvas-rendered AreaMap can't be crawled
  server-side (its links only exist after client-side JS runs). The searchable table below is a
  legitimate secondary way in for anyone who lands here directly; the primary UX stays the district
  browse on /berlin/area-detail and the map/mover click-throughs.

  I2 (#219): moved from /area to /berlin/area (city-folder navigation restructure — see
  docs/epic-i/I2-route-map.md). sidebar_position renumbered 14 -> 4 (scoped to this page's
  siblings under pages/berlin/, not the whole site).
-->

Every Berlin neighbourhood (Planungsraum) on its current (2021+) boundaries. Search or sort the
table, or use the [district browse](/berlin/area-detail) / [map](/berlin/maps) instead.

```sql all_areas
select
    area_name,
    substr(area_code, 1, 2) as bezirk,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/berlin/area/' || area_code as area_link
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

