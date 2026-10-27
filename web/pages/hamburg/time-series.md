---
title: Time series — how Hamburg has moved
sidebar_position: 1
---

<!--
  #353 (Hamburg-Berlin parity review): Hamburg's counterpart of pages/berlin/time-series.md, same
  sections in the same order, scoped to what existing sign-offs cover. sidebar_position 1 matches
  Berlin's (positions are scoped to this folder's siblings).

  What it shows, and the sign-off behind it:
  - "Which Gebiete moved the most" and "How the Gebiete break down by trajectory" read
    fct_gentrification_trajectory's Hamburg rows (admitted #314, dual sign-off PASS:
    docs/epic-h/314-hh-trajectory-geo-signoff.md, 314-hh-trajectory-domain-signoff.md) -- the same
    columns the Berlin page shows (status_index_first/last, status_delta, trajectory_type). The
    #314 domain sign-off §5 anticipated exactly this page ("Hamburg time-series-with-trajectory-
    labels page") and binds it to disclose the recent ~6-year window and the status-only reading:
    <HamburgTrajectoryNote> carries that disclosure, unchanged from the #317 area pages. The
    trajectory mix bar is the same COUNT the district/Stadtteil pages already show, at city level.
    Ranking stays within Hamburg (H3 domain condition 2 forbids only pooled cross-city ranking).
  - The movers tables list EVERY Gebiet whose status changed (searchable, 12 rows per page),
    rather than Berlin's top-12 cut: status_delta is a small integer, so a top-12 list would be an
    arbitrary alphabetical slice of a large tie (83 Gebiete share the -1 step). Noted as a Berlin
    follow-up in docs/epic-g/353-hamburg-berlin-parity-audit.md, not changed there.

  What it does NOT show, stated on the page: Berlin's citywide median-status line. That line
  reads fct_gentrification_change, which is Berlin-only by design (H3 domain sign-off, scope-guard
  condition 4), and #314's sign-off asks for any long-run Hamburg view to be a separately labelled
  product rather than built from the 2019-2025 labels. No new statistic, weight or method here.
-->

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Time series — how Hamburg has moved" lede="Rather than making you pick one of Hamburg's ~940 statistische Gebiete from a dropdown, this page zooms out: how Hamburg's Gebiete have moved over the recent Sozialmonitoring editions, and which of them moved the most." />

To inspect any single area, use the district browser on the [area detail](/hamburg/area-detail)
page. This page covers Hamburg; Berlin has its own [time series page](/berlin/time-series), never
combined with this one.

<Alert status="info">
  <b>How to read status:</b> Hamburg's official status scale runs <b>1 = least deprived</b> to
  <b>4 = most deprived</b>, so a <b>negative</b> change means a Gebiet became <b>less</b> deprived
  (its official status rose). "Rose" is not automatically good news for existing residents — rising
  status is also the signature of gentrification, and can reflect displacement as easily as
  incumbent social mobility. Hamburg's figures come from its own annual Sozialmonitoring and are
  never pooled or ranked against Berlin's (see <a href="/methodology">methodology §6</a>).
</Alert>

<HamburgTrajectoryNote subject="each Gebiet" />

## Hamburg, citywide: social status over time

<NotYetPublished what="A citywide status-over-time line (Berlin's page opens with one)">
  Berlin's line reads <code>fct_gentrification_change</code>, which is Berlin-only by design (the
  Hamburg admission sign-off's scope-guard condition 4). Hamburg's 13 annual editions are not drawn
  as a long-run series anywhere on this site yet: the Hamburg trajectory sign-off (#314) asks for
  any long-run Hamburg view to be a separately labelled product, not built from the 2019–2025
  labels below. The current stage of every Gebiet is on <a href="/hamburg/maps">Hamburg's map</a>.
</NotYetPublished>

## Which Gebiete moved the most (2019 → 2025)

Over the 2019–2025 window, the official social status of these Gebiete changed. Every Gebiet with a
change is listed (largest change first, then by name), not just the top few — the status scale
has only four steps, so many Gebiete share the same change.

```sql movers
select
    g.area_name,
    '/hamburg/area/' || t.area_code as area_link,
    t.first_edition,
    t.last_edition,
    t.status_index_first,
    t.status_index_last,
    t.status_delta,
    t.trajectory_type
from gentriduck_marts.fct_gentrification_trajectory as t
left join gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = t.area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and t.status_delta <> 0
```

### Status rose the most (toward *less* deprived)

```sql improvers
select * from ${movers} where status_delta < 0 order by status_delta asc, area_name
```

<DataTable data={improvers} rows=12 rowShading=true search=true emptySet="warn" link=area_link>
    <Column id=area_name title="Statistisches Gebiet"/>
    <Column id=first_edition title="First edition"/>
    <Column id=status_index_first title="Status, first edition"/>
    <Column id=last_edition title="Latest edition"/>
    <Column id=status_index_last title="Status, latest edition"/>
    <Column id=status_delta title="Change" fmt="+0;-0"/>
    <Column id=trajectory_type title="Trajectory"/>
</DataTable>

### Status fell the most (toward *more* deprived)

```sql decliners
select * from ${movers} where status_delta > 0 order by status_delta desc, area_name
```

<DataTable data={decliners} rows=12 rowShading=true search=true emptySet="warn" link=area_link>
    <Column id=area_name title="Statistisches Gebiet"/>
    <Column id=first_edition title="First edition"/>
    <Column id=status_index_first title="Status, first edition"/>
    <Column id=last_edition title="Latest edition"/>
    <Column id=status_index_last title="Status, latest edition"/>
    <Column id=status_delta title="Change" fmt="+0;-0"/>
    <Column id=trajectory_type title="Trajectory"/>
</DataTable>

## How the Gebiete break down by trajectory

Every Gebiet's path across the 2019–2025 editions is classified into a trajectory type. Here is how
Hamburg's Gebiete distribute across those types.

```sql trajectory_mix
select
    trajectory_type,
    count(*) as area_count
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'HH' and area_vintage = 'current'
group by all
order by area_count desc
```

<BarChart
    data={trajectory_mix}
    x=trajectory_type
    y=area_count
    swapXY=true
    title="Hamburg statistische Gebiete by status trajectory (2019 → 2025)"
    xAxisTitle="Number of Gebiete"
    yAxisTitle="Trajectory type"
/>

## Honest caveats

- **"Rose" is not automatically good news for existing residents** — rising status is also the
  signature of gentrification, and can reflect displacement as easily as incumbent social mobility.
- **The trajectory labels and movers describe a recent ~6-year window (2019–2025)**, not each
  Gebiet's full 13-edition history, and are a **status-only classification**, never a displacement
  verdict (see the disclosure at the top of this page).
- **No citywide long-run status line for Hamburg** — see the note in that section for why.
- **Hamburg and Berlin are never ranked against each other** — each city's status scale is read
  within its own official classification ([methodology §6](/methodology)).

## Where next

Click any row above to open that Gebiet's full profile — stage, trajectory, commercial mix, and
amenities. To browse by district instead, use the [area detail page](/hamburg/area-detail), or see
[Hamburg's map](/hamburg/maps) and the [Hamburg data hub](/hamburg).

---

<FooterNav />
