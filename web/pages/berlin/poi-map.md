---
title: POI & Offering Advantage map
sidebar_position: 5
---

<!--
  #209 (web slice of #207, maintainer-requested): surfaces POI density and POI Offering
  Advantage (OA, ADR-0017/0018) directly on the site -- previously an internal index input
  only. Not methodology-bearing: this page reads already-signed-off `oa_domain` /
  `poi_density_per_km2` values from `mart_poi_offering_advantage` (itself a pure pass-through,
  see that model's header) with no new indicator, weight, or normalization introduced here.
  Follows the existing /berlin/maps AreaMap dropdown pattern (#132/#150/#152 precedent).
  Berlin-only for now, matching /berlin/maps and /berlin/poi-price-overview -- Hamburg's index
  isn't signed off yet (#125), even though the OA mart itself has Hamburg rows.

  sidebar_position history: bumped 14 -> 15 (I1, #218) to resolve a collision with
  pages/area/index.md's sidebar_position: 14 (2026-07-10 storytelling review, finding 4).
  I2 (#219): moved from /poi-map to /berlin/poi-map (city-folder navigation restructure — see
  docs/epic-i/I2-route-map.md); position renumbered again, 15 -> 5, now scoped to this page's
  siblings under pages/berlin/ rather than the whole site.

  I3 (#220) named consolidation: `/berlin/poi-price-overview` (citywide POI growth + land
  value/rent trend) merges into this page as a "Citywide context" section below the map -- both
  pages already covered the same commercial-mix data source, one per-area/interactive (this page)
  and one citywide/aggregate (the old page); this page keeps its OA-map identity, the old route
  becomes a redirect stub (`pages/berlin/poi-price-overview.md`) rather than a 404 for anyone with
  an old link. No indicator/weight/method changes -- the merged section's SQL and Alerts are
  copied verbatim from the old page, only cross-links updated. Re-platformed onto `<Hero>`/
  `<ChapterLabel>`/`<FooterNav>` (removing the plain `# ` heading + hand-copied `<sub>` footer
  line I1 didn't touch on this page).
-->

<script>
  import { base } from '$app/paths';
</script>

<Hero compact eyebrow="Chapter 3 — The Evidence" title="POI & Offering Advantage map" lede="Where shops, cafés, and other mapped places are concentrated across Berlin, and how that commercial mix has grown over time — the commercial half of the double invasion-succession model this project's index is built on." />

This map shows where different kinds of shops, cafés, and other mapped places ("points of
interest," or POIs) are concentrated across Berlin -- either as raw density, or as
**Offering Advantage (OA)**: how over- or under-represented a POI domain is in an area compared
to the citywide average for that domain (a location quotient). OA already feeds the governed
gentrification index as one input among several; this page surfaces it directly, then (further
down) zooms out to the same signal added up across the whole city, alongside land value & rent.
See [ADR-0017](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md)
and [ADR-0018](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md)
for the full method, or the [methodology page](/methodology) for a plain-language walkthrough.

<Alert status="info">
  <b>How to read this:</b> <b>OA = 1.0</b> means an area has exactly the citywide-average share of
  a POI domain; <b>above 1.0</b> means that domain is over-represented there (e.g. more
  gastronomy per resident/area than the city as a whole), <b>below 1.0</b> means under-represented.
  <b>Density</b> is simply mapped-place count per km². Switch <b>"Stock vs. development"</b> to
  <b>"Change since previous year"</b> to see year-over-year movement instead of the point-in-time
  value -- useful for spotting where a domain is growing or shrinking fastest. This map covers
  Berlin only for now; Hamburg's underlying gentrification index isn't signed off yet
  ([#125](https://github.com/dhelweg/gentriduck/issues/125)).
</Alert>

<Dropdown name="metric" title="Metric" defaultValue="density">
  <DropdownOption value="density" valueLabel="POI density (mapped places per km²)"/>
  <DropdownOption value="oa" valueLabel="Offering Advantage (location quotient vs. citywide)"/>
</Dropdown>

<Dropdown name="domain" title="POI domain" defaultValue="Retail">
  <DropdownOption value="Entertainment" valueLabel="Entertainment"/>
  <DropdownOption value="Gastronomy" valueLabel="Gastronomy"/>
  <DropdownOption value="Mobility" valueLabel="Mobility"/>
  <DropdownOption value="Office" valueLabel="Office"/>
  <DropdownOption value="Other" valueLabel="Other"/>
  <DropdownOption value="Public Service" valueLabel="Public Service"/>
  <DropdownOption value="Public Space" valueLabel="Public Space"/>
  <DropdownOption value="Religion" valueLabel="Religion"/>
  <DropdownOption value="Retail" valueLabel="Retail"/>
  <DropdownOption value="Services" valueLabel="Services"/>
  <DropdownOption value="Sports and Recreation" valueLabel="Sports and Recreation"/>
  <DropdownOption value="Tourism" valueLabel="Tourism"/>
  <DropdownOption value="Vacancy" valueLabel="Vacancy"/>
</Dropdown>

<Dropdown name="year" title="Year" defaultValue="2025">
  <DropdownOption value="2008" valueLabel="2008"/>
  <DropdownOption value="2009" valueLabel="2009"/>
  <DropdownOption value="2010" valueLabel="2010"/>
  <DropdownOption value="2011" valueLabel="2011"/>
  <DropdownOption value="2012" valueLabel="2012"/>
  <DropdownOption value="2013" valueLabel="2013"/>
  <DropdownOption value="2014" valueLabel="2014"/>
  <DropdownOption value="2015" valueLabel="2015"/>
  <DropdownOption value="2016" valueLabel="2016"/>
  <DropdownOption value="2017" valueLabel="2017"/>
  <DropdownOption value="2018" valueLabel="2018"/>
  <DropdownOption value="2019" valueLabel="2019"/>
  <DropdownOption value="2020" valueLabel="2020"/>
  <DropdownOption value="2021" valueLabel="2021"/>
  <DropdownOption value="2022" valueLabel="2022"/>
  <DropdownOption value="2023" valueLabel="2023"/>
  <DropdownOption value="2024" valueLabel="2024"/>
  <DropdownOption value="2025" valueLabel="2025"/>
  <DropdownOption value="2026" valueLabel="2026"/>
</Dropdown>

<ButtonGroup name="view" title="Stock vs. development" display="tabs" defaultValue="stock">
  <ButtonGroupItem value="stock" valueLabel="Stock (this year's value)"/>
  <ButtonGroupItem value="development" valueLabel="Change since previous year"/>
</ButtonGroup>

```sql poi_map_data
-- #210: reads mart_poi_offering_advantage_map (domain-grain, ~1/3 the rows and
-- 4 fewer columns than the leaf-grain mart_poi_offering_advantage) -- Evidence
-- ships the whole referenced table to the client for any reactive query
-- against it, so this page never needed the poi_category_h/poi_type_h leaf
-- grain it doesn't read.
-- density_delta / oa_delta: year-over-year change vs. the immediately preceding snapshot_year
-- present in the mart for the same area + domain (window function over the full series, before
-- the year filter below) -- "development" = movement, not a re-derived indicator.
with
    base as (
        select
            area_code,
            snapshot_year,
            poi_density_per_km2,
            oa_domain,
            poi_density_per_km2
            - lag(poi_density_per_km2) over (
                partition by area_code order by snapshot_year
            ) as density_delta,
            oa_domain
            - lag(oa_domain) over (partition by area_code order by snapshot_year) as oa_delta
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${inputs.domain.value}'
    ),
    names as (
        select distinct area_code, area_name
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
    )
select
    b.area_code,
    n.area_name,
    b.poi_density_per_km2,
    b.oa_domain,
    b.density_delta,
    b.oa_delta,
    -- basePath-aware click-through (see /berlin/maps' `<script>` header comment): AreaMap's link
    -- column does a raw `window.location.href = link` (EvidenceMap.js), unlike Evidence's own
    -- nav/DataTable links, so `${base}` (SvelteKit's deployment.basePath) must be interpolated
    -- into the link literal here, or click-through 404s on the GitHub Pages project site.
    '${base}/berlin/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${inputs.year.value}
```

<AreaMap
    data={poi_map_data}
    geoJsonUrl={`${base}/geo/plr_live_data.geojson`}
    geoId="area_code"
    areaCol="area_code"
    value={
        inputs.metric.value === 'density'
            ? (inputs.view.value === 'stock' ? 'poi_density_per_km2' : 'density_delta')
            : (inputs.view.value === 'stock' ? 'oa_domain' : 'oa_delta')
    }
    legendType="scalar"
    title="Berlin Planungsraum (PLR) — {inputs.metric.value === 'density' ? 'POI density' : 'Offering Advantage'}, {inputs.domain.value}, {inputs.year.value}{inputs.view.value === 'development' ? ' (change vs. previous year)' : ''}"
    startingLat={52.52}
    startingLong={13.405}
    startingZoom={9}
    link="link"
    emptySet="warn"
    emptyMessage="No data for this domain/year combination."
/>

Click a Planungsraum on the map to open its exact neighbourhood page, which also shows the
area's full OA-by-domain profile as a radar chart.

---

## Citywide context: POI growth, land value & rent

<!--
  Merged from the former `/berlin/poi-price-overview` page (I3, #220 named consolidation) --
  content, SQL, and Alerts below are carried over verbatim; only cross-links were updated (a
  self-link to this same page no longer makes sense as a "further reading" pointer). See this
  file's top header comment for the consolidation rationale.
-->
Two more contextual signals, added up across the whole city rather than one neighbourhood at a
time: how the mix of mapped shops, cafés, and other amenities has grown, and how land value and
estimated rent have moved. Neither feeds the governed index directly — they're both context, not
predictors — but they're the same underlying data as the map above. Looking at the whole city
lets you see the citywide trend without already knowing which neighbourhood to check; for a
single-neighbourhood breakdown, see the [area detail page](/berlin/area-detail).

<Alert status="info">
  These are simple citywide averages/totals of the same governed data used elsewhere on the site —
  no new indicator, weight, or method is introduced here, so no separate methodology sign-off
  applies. See the [methodology & data sources](/methodology) page for how the underlying figures
  are built.
</Alert>

### Shops, cafés & amenities, citywide

```sql poi_citywide
select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
group by all
order by snapshot_year
```

<Alert status="info">
  Because Berlin's official neighbourhood boundaries changed in 2021, this line stitches together
  counts from two boundary systems (pre-2021 and 2021+) into one continuous citywide series — read
  it as one trend, not two. It's also worth reading the early years cautiously: since these are
  OpenStreetMap-derived counts, growing map-contributor coverage over time inflates early-year
  counts on its own, independent of real-world change (see the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-c/C5-geo-signoff.md">completeness-bias correction write-up</a>
  for how the index itself corrects for this).
</Alert>

<LineChart
    data={poi_citywide}
    x=snapshot_year
    y=poi_count
    title="Total mapped shops, cafés & amenities, city of Berlin"
    yAxisTitle="Number of mapped places"
/>

#### What kinds of places make up that total? (latest year)

```sql poi_latest_year
select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
```

```sql poi_mix_latest
select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
  and snapshot_year = ${poi_latest_year[0].year}
group by all
order by poi_count desc
limit 15
```

<BarChart
    data={poi_mix_latest}
    x=poi_category_h
    y=poi_count
    title="Top 15 categories of mapped places, {poi_latest_year[0].year}"
    yAxisTitle="Number of mapped places"
    swapXY=true
/>

### Land value & estimated rent, citywide

```sql price_rent_citywide
select
    snapshot_year,
    avg(est_rent_mid) as avg_est_rent_mid,
    avg(est_rent_low) as avg_est_rent_low,
    avg(est_rent_high) as avg_est_rent_high,
    avg(brw_weighted_avg_eur_m2) filter (where brw_weighted_avg_eur_m2 is not null)
        as avg_brw_eur_m2,
    count(*) filter (where brw_weighted_avg_eur_m2 is not null) as n_areas_with_brw
from gentriduck_marts.mart_price_rent_dimension
group by all
order by snapshot_year
```

<Alert status="info">
  These are citywide averages of official reference values, not observed transaction prices — see
  the [area detail page](/berlin/area-detail)'s price & rent section, or the
  [methodology page](/methodology), for what "land value" (Bodenrichtwert) and "estimated rent"
  (Mietspiegel-derived) actually measure and their caveats. Land-value coverage is uneven across
  years (some years have no residential zones matched — see <code>n_areas_with_brw</code> in the
  underlying data); the chart below only plots years with a usable citywide average. Estimated-rent
  coverage is broader.
</Alert>

<LineChart
    data={price_rent_citywide}
    x=snapshot_year
    y={['avg_est_rent_low', 'avg_est_rent_mid', 'avg_est_rent_high']}
    title="Citywide estimated rent range (EUR/m²), by year"
    yAxisTitle="EUR/m²"
/>

<BarChart
    data={price_rent_citywide}
    x=snapshot_year
    y=avg_brw_eur_m2
    title="Citywide average land value (Bodenrichtwert), residential zones (EUR/m²)"
    yAxisTitle="EUR/m²"
    emptySet="warn"
    emptyMessage="No residential land-value zones matched for any year."
/>

## Honest caveats

- **OSM early-year completeness bias.** The citywide POI-growth chart's early years should be read
  cautiously — growing OpenStreetMap contributor coverage over time inflates early-year counts
  independent of real change; the governed index corrects for this at the area level (see
  [methodology §6](/methodology)), but the simple citywide totals above do not.
- **Land value and estimated rent are reference values, not transaction prices**, and their
  *level* is a context/desirability signal, not a vulnerability score — only their *change* over
  time carries any displacement-pressure reading, and even that is not yet part of the governed
  index (see [methodology §2/§6](/methodology)).
- **Offering Advantage and POI density are commercial-side signals, not the outcome variable.**
  A high OA or fast-growing POI count is read as a signal of commercial succession, never as a
  standalone claim that an area is gentrifying — see [methodology §1](/methodology) for the
  double invasion-succession model this reads into.

## Further reading

See [ADR-0017](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md)
for how Offering Advantage is computed, the [area detail page](/berlin/area-detail) for a
single-neighbourhood breakdown of these same signals alongside the governed index, or the
[gentrification-pressure map](/berlin/maps) for the governed index itself.

---

<FooterNav />
