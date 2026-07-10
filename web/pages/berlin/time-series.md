---
title: Time series — how Berlin has moved
sidebar_position: 1
---

<!--
  PROTOTYPE rework (maintainer feedback): a single-PLR picker over ~540 areas has no value.
  This page zooms OUT to the whole city — citywide trend + ranked "biggest movers" that link
  into the per-area drill-down (/berlin/area-detail). No individual-area picker. Presentation only;
  no indicator/weight/method change (no methodology gate). Berlin only until Hamburg data lands.

  I2 (#219): moved from /time-series to /berlin/time-series (city-folder navigation restructure —
  see docs/epic-i/I2-route-map.md). sidebar_position renumbered 11 -> 1: positions are scoped to
  this page's siblings under pages/berlin/ (Evidence sorts children per tree level, not globally),
  not the whole site; kept ahead of maps to preserve the pre-move relative order.

  I3 (#220): re-platformed onto the shared `<Hero>`/`<FooterNav>` components and added an explicit
  "Where next" section per the I1 template; the existing "Go deeper" section is kept and folded
  into it. No caveat dropped -- the "rose is not automatically good news" note stays verbatim.
-->

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Time series — how Berlin has moved" lede="Rather than making you guess one of Berlin's ~540 planning areas from a dropdown, this page zooms out: how the city as a whole has moved across the official social-monitoring reports, and which neighbourhoods moved the most." />

To inspect any single area, use the district browser on the
[area detail](/berlin/area-detail) page.

<Alert status="info">
  <b>How to read status:</b> the official status scale runs <b>1 = least deprived</b> to
  <b>4 = most deprived</b>, so a <b>falling</b> line or a <b>negative</b> change means an area became
  <b>less</b> deprived (its official status rose). "Rose" is not automatically good news for existing
  residents — rising status is also the signature of gentrification, and can reflect displacement as
  easily as incumbent social mobility. See the
  <a href="/methodology">methodology & data sources</a> page for the full picture. Berlin's area
  boundaries were redrawn in 2021; the movers table below is computed on the current (2021+)
  boundaries so it lines up with the map and the area drill-down.
</Alert>

## Berlin, citywide: social status over time

```sql citywide_trend
select
    snapshot_year,
    median(status_index) as median_status_index,
    count(*) filter (where not is_uninhabited) as areas_reporting
from gentriduck_marts.fct_gentrification_change
where city_code = 'BER'
group by all
order by snapshot_year
```

<LineChart
    data={citywide_trend}
    x=snapshot_year
    y=median_status_index
    title="City-wide median social status, Berlin (1 = least deprived … 4 = most deprived)"
    yAxisTitle="Median status class"
/>

The line stitches together two boundary systems across the 2021 redistricting — read it as one long
trend, not a break at 2021.

## Which neighbourhoods moved the most (2021 → 2025)

Over the three most recent official editions, these areas' official social status changed the most.

### Status rose the most (toward *less* deprived)

```sql improvers
select
    g.area_name,
    -- Exact-code drill-down (#150): area/[code] resolves lor_2021 PLR codes only.
    -- I2 (#219): area moved under /berlin/area. DataTable's own link mechanism is basePath-aware
    -- (unlike AreaMap's raw window.location click-through), so no base-path interpolation is
    -- needed here (NB: literal "dollar-brace-base" text would be evaluated by Evidence's SQL
    -- block compiler as a JS template expression even inside a comment -- avoid writing it here).
    '/berlin/area/' || t.area_code as area_link,
    t.status_index_first as status_2021,
    t.status_index_last as status_2025,
    t.status_delta,
    t.trajectory_type
from gentriduck_marts.fct_gentrification_trajectory t
left join (
    select distinct area_code, area_name
    from gentriduck_marts.gentrification_index
    where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
) g on g.area_code = t.area_code
where t.city_code = 'BER' and t.area_vintage = 'lor_2021' and t.status_delta < 0
order by t.status_delta asc, g.area_name
limit 12
```

<DataTable data={improvers} rows=12 rowShading=true emptySet="warn" link=area_link>
    <Column id=area_name title="Neighbourhood (PLR)"/>
    <Column id=status_2021 title="Status 2021"/>
    <Column id=status_2025 title="Status 2025"/>
    <Column id=status_delta title="Change" fmt="+0;-0"/>
    <Column id=trajectory_type title="Trajectory"/>
</DataTable>

### Status fell the most (toward *more* deprived)

```sql decliners
select
    g.area_name,
    '/berlin/area/' || t.area_code as area_link,
    t.status_index_first as status_2021,
    t.status_index_last as status_2025,
    t.status_delta,
    t.trajectory_type
from gentriduck_marts.fct_gentrification_trajectory t
left join (
    select distinct area_code, area_name
    from gentriduck_marts.gentrification_index
    where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
) g on g.area_code = t.area_code
where t.city_code = 'BER' and t.area_vintage = 'lor_2021' and t.status_delta > 0
order by t.status_delta desc, g.area_name
limit 12
```

<DataTable data={decliners} rows=12 rowShading=true emptySet="warn" link=area_link>
    <Column id=area_name title="Neighbourhood (PLR)"/>
    <Column id=status_2021 title="Status 2021"/>
    <Column id=status_2025 title="Status 2025"/>
    <Column id=status_delta title="Change" fmt="+0;-0"/>
    <Column id=trajectory_type title="Trajectory"/>
</DataTable>

## How neighbourhoods' trajectories break down

Every area's path across the recent editions is classified into a trajectory type. Here is how
Berlin's neighbourhoods distribute across those types.

```sql trajectory_mix
select
    trajectory_type,
    count(*) as area_count
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER' and area_vintage = 'lor_2021'
group by all
order by area_count desc
```

<BarChart
    data={trajectory_mix}
    x=trajectory_type
    y=area_count
    swapXY=true
    title="Berlin neighbourhoods by status trajectory (2021 → 2025)"
    xAxisTitle="Number of areas"
    yAxisTitle="Trajectory type"
/>

## Honest caveats

- **"Rose" is not automatically good news for existing residents** — rising status (a falling
  status-index line) is also the signature of gentrification, and can reflect displacement as
  easily as incumbent social mobility; see the alert above for the full decoder.
- The citywide trend line **stitches together two boundary systems** across Berlin's 2021
  redistricting — read it as one long trend, not a break at 2021.
- The "biggest movers" tables are computed on the **current (2021+) boundaries only**, so they
  line up with the map and area drill-down, but do not extend before 2021.

## Where next

Click any row above to open that exact neighbourhood's full breakdown — status trajectory,
commercial mix, and price/rent. To browse by district instead, use the
[area detail page](/berlin/area-detail), or see the citywide [maps](/berlin/maps) and the
[home page](/) for the current index and stage typology.

---

<FooterNav />

