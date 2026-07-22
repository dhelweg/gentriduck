---
title: POI & Offering Advantage map
sidebar_position: 2
---

<!--
  H3 (#237) scope (c): Hamburg's own POI & Offering Advantage page, mirroring
  pages/berlin/poi-map.md's structure. Unlike the gentrification-stage map (pages/hamburg/maps.md),
  this data does NOT depend on the H3 admission at all -- fct_poi_development,
  mart_poi_offering_advantage, and mart_poi_offering_advantage_map are city-agnostic marts
  (ADR-0005) that have carried real Hamburg rows since H1 (#40), already gated then. Confirmed
  against the built parquet on this branch: fct_poi_development 245,031 HH rows (2008-2026),
  mart_poi_offering_advantage_map 100,128 HH rows, weight_variant='standard' /
  methodology_variant='faithful' only (same headline choice already used for Berlin's map), 13 POI
  domains, area_vintage='current' throughout (no pre/post-2021 boundary split, unlike Berlin).

  Differences from /berlin/poi-map, all deliberate:
  - No price/rent "citywide context" section -- mart_price_rent_dimension has zero Hamburg rows
    (confirmed BER-only in the built parquet); this page does not claim a Hamburg land-value/rent
    signal that doesn't exist.
  - Uses the new `subarea_l2_live_data.geojson` for the choropleth (same file
    pages/hamburg/maps.md uses -- this page ignores that file's baked-in gentrification-index
    properties and only reads geometry + area_code, the same "geometry vehicle, values joined
    client-side" pattern /berlin/poi-map.md already uses against plr_live_data.geojson).
  - Tooltip/table lead with the Gebiet CODE, not a name (see pages/hamburg/maps.md's header
    comment for why -- area_name is genuinely blank at this grain).
  - No click-through link -- no /hamburg/area/[code] profile page exists (see
    pages/hamburg/index.md).
  - Separate <AreaMap> instance/route from Berlin's, per the H3-domain-signoff.md structural guard
    (no shared cross-city component instance) -- same principle as pages/hamburg/maps.md.
-->

<script>
  import { base } from '$app/paths';

  $: areaTooltip = [
    {
      id: inputs.metric.value === 'density'
        ? (inputs.view.value === 'stock' ? 'poi_density_per_km2' : 'density_delta')
        : (inputs.view.value === 'stock' ? 'oa_domain' : 'oa_delta'),
      title: inputs.metric.value === 'density' ? 'POI density / km²' : 'Offering Advantage',
      fmt: 'num1'
    },
    { id: 'poi_count', title: 'Mapped places (this domain)', fmt: 'num0' },
    { id: 'area_code', title: 'Gebiet code', valueClass: 'text-xs opacity-60', fmt: 'id' }
  ];

  const divergingPalette = ['#e66101', '#fdb863', '#f7f7f7', '#b2abd2', '#5e3c99'];

  function symmetricDomain(rows, col, baseline) {
    const vals = rows.map((r) => r[col]).filter((v) => v !== null && v !== undefined && !isNaN(v));
    const maxAbsDev = vals.reduce((acc, v) => Math.max(acc, Math.abs(v - baseline)), 0) || 1;
    return [baseline - maxAbsDev, baseline + maxAbsDev];
  }
</script>

<Hero compact eyebrow="Chapter 3 — The Evidence" title="POI & Offering Advantage map" lede="Where shops, cafés, and other mapped places are concentrated across Hamburg, and how that commercial mix has grown over time — the same Offering Advantage construct used for Berlin, computed independently on Hamburg's own OpenStreetMap history." />

This map shows where different kinds of shops, cafés, and other mapped places ("points of
interest," or POIs) are concentrated across Hamburg — either as raw density, or as
**Offering Advantage (OA)**: how over- or under-represented a POI domain is in an area compared
to the citywide (Hamburg-wide) average for that domain. See
[ADR-0017](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md)
and [ADR-0018](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md)
for the full method, or the [methodology page](/methodology) for a plain-language walkthrough. This
data does not depend on Hamburg's gentrification-index admission (H3, #237) — it is a separate,
city-agnostic mart that has carried real Hamburg rows since H1 (#40).

<Alert status="info">
  <b>How to read this:</b> <b>OA = 1.0</b> means an area has exactly the Hamburg-wide average share
  of a POI domain; <b>above 1.0</b> means that domain is over-represented there, <b>below 1.0</b>
  means under-represented. <b>Density</b> is simply mapped-place count per km². Switch
  <b>"Stock vs. development"</b> to <b>"Change since previous year"</b> to see year-over-year
  movement instead of the point-in-time value. This map covers Hamburg only — its Offering
  Advantage baseline is computed against Hamburg's own citywide average, never pooled with
  Berlin's (see <a href="/methodology">methodology §6</a>'s structural rule against pooled
  cross-city comparison).
</Alert>

<Alert status="warning">
  <b>This map has no neighbourhood names, and thinly-mapped Gebiete are left blank.</b> Hamburg's
  statistische Gebiete carry only a numeric code (see the <a href="/hamburg/maps">gentrification
  map</a> for why); hover any area for its code. Offering Advantage is a compositional ratio (a
  location quotient) — in a Gebiet-year with very few mapped places overall, a single new or
  removed business can swing its Offering Advantage value disproportionately, so Gebiet-years
  below the same minimum-mapped-place threshold used for Berlin are shown as an unshaded gap rather
  than a potentially misleading value; the raw mapped-place count is always visible in the
  tooltip. OSM's mapping coverage is not spatially neutral — see the
  <a href="/berlin/poi-map">Berlin POI map</a>'s caveats (Haklay 2010) for the general point, which
  applies equally to Hamburg.
</Alert>

<Dropdown name="metric" title="Metric" defaultValue="density">
  <DropdownOption value="density" valueLabel="POI density (mapped places per km²)"/>
  <DropdownOption value="oa" valueLabel="Offering Advantage (location quotient vs. Hamburg-wide average)"/>
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
-- Single-query form (Berlin's berlin/poi-map.md precedent, that page's `poi_map_data` block):
-- delta columns computed on the RAW (pre-suppression) oa_domain over the full series via a
-- window function, suppression applied once at the very end based on THIS row's own
-- oa_domain_min_base_flag, then filtered to the selected year -- no cross-block query chaining
-- (Evidence sql blocks are independent DuckDB-WASM queries; this keeps the whole thing in one).
with
    base as (
        select
            area_code,
            snapshot_year,
            poi_density_per_km2,
            poi_count,
            oa_domain as oa_domain_raw,
            oa_domain_min_base_flag,
            poi_density_per_km2
            - lag(poi_density_per_km2) over (
                partition by area_code order by snapshot_year
            ) as density_delta,
            oa_domain
            - lag(oa_domain) over (partition by area_code order by snapshot_year) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${inputs.domain.value}'
    )
select
    b.area_code,
    b.poi_density_per_km2,
    b.poi_count,
    case when b.oa_domain_min_base_flag then null else b.oa_domain_raw end as oa_domain,
    b.density_delta,
    case when b.oa_domain_min_base_flag then null else b.oa_delta_raw end as oa_delta,
    b.oa_domain_min_base_flag
from base as b
where b.snapshot_year = ${inputs.year.value}
```

<AreaMap
    data={poi_map_data}
    geoJsonUrl={`${base}/geo/subarea_l2_live_data.geojson`}
    geoId="area_code"
    areaCol="area_code"
    value={
        inputs.metric.value === 'density'
            ? (inputs.view.value === 'stock' ? 'poi_density_per_km2' : 'density_delta')
            : (inputs.view.value === 'stock' ? 'oa_domain' : 'oa_delta')
    }
    legendType="scalar"
    colorPalette={
        inputs.metric.value === 'density' && inputs.view.value === 'stock'
            ? undefined
            : divergingPalette
    }
    min={
        inputs.metric.value === 'oa'
            ? (inputs.view.value === 'stock'
                ? symmetricDomain(poi_map_data, 'oa_domain', 1)[0]
                : symmetricDomain(poi_map_data, 'oa_delta', 0)[0])
            : inputs.view.value === 'development'
                ? symmetricDomain(poi_map_data, 'density_delta', 0)[0]
                : undefined
    }
    max={
        inputs.metric.value === 'oa'
            ? (inputs.view.value === 'stock'
                ? symmetricDomain(poi_map_data, 'oa_domain', 1)[1]
                : symmetricDomain(poi_map_data, 'oa_delta', 0)[1])
            : inputs.view.value === 'development'
                ? symmetricDomain(poi_map_data, 'density_delta', 0)[1]
                : undefined
    }
    title="Hamburg statistisches Gebiet — {inputs.metric.value === 'density' ? 'POI density' : 'Offering Advantage'}, {inputs.domain.value}, {inputs.year.value}{inputs.view.value === 'development' ? ' (change vs. previous year)' : ''}"
    startingLat={53.5511}
    startingLong={9.9937}
    startingZoom={10}
    tooltip={areaTooltip}
    emptySet="warn"
    emptyMessage="No data for this domain/year combination."
/>

There is no per-area drill-down page for Hamburg yet — see the [Hamburg data hub](/hamburg) for
what is and isn't built.

---

## Citywide context: POI growth

<Alert status="info">
  A simple citywide total of the same governed data used above — no new indicator, weight, or
  method is introduced here, so no separate methodology sign-off applies. Unlike
  <a href="/berlin/poi-map">Berlin's equivalent section</a>, there is no land-value/rent chart here:
  Hamburg has no published price/rent mart on this site (see <a href="/hamburg">the Hamburg data
  hub</a>).
</Alert>

### Shops, cafés & amenities, citywide

```sql poi_citywide
select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
group by all
order by snapshot_year
```

<Alert status="info">
  As with Berlin, these are OpenStreetMap-derived counts — growing map-contributor coverage over
  time inflates early-year counts on its own, independent of real-world change. Read the early
  years cautiously.
</Alert>

<LineChart
    data={poi_citywide}
    x=snapshot_year
    y=poi_count
    title="Total mapped shops, cafés & amenities, city of Hamburg"
    yAxisTitle="Number of mapped places"
/>

#### What kinds of places make up that total? (latest year)

```sql poi_latest_year
select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
```

```sql poi_mix_latest
select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
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

## Honest caveats

- **OSM early-year completeness bias** — the citywide POI-growth chart's early years should be
  read cautiously, for the same reason as Berlin's (see [methodology §6](/methodology)).
- **No neighbourhood names** — Hamburg's statistische Gebiete are shown by numeric code only.
- **No land value or rent context** — unlike the Berlin equivalent of this page, there is no
  published price/rent mart for Hamburg on this site.
- **Offering Advantage and POI density are commercial-side signals, not the outcome variable** —
  see [methodology §1](/methodology).
- **Thinly-mapped Gebiete are suppressed, not shown as zero** — same D-3 minimum-mapped-place
  threshold as Berlin's map (#274, ADR-0017 D5 D-3); a blank cell means "too thinly observed,"
  never "commercially dead."
- **This map's Offering Advantage baseline is Hamburg-wide, never pooled with Berlin's** — see
  [methodology §6](/methodology)'s structural rule against pooled cross-city comparison.

## Further reading

See [ADR-0017](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md)
for how Offering Advantage is computed, the [Hamburg gentrification-pressure map](/hamburg/maps)
for the governed D1/D2 outcome, the [Hamburg data hub](/hamburg) for the full inventory of what is
and isn't built for Hamburg, or [methodology & data sources](/methodology) for the full
Berlin/Hamburg comparability caveats.

---

<FooterNav />
