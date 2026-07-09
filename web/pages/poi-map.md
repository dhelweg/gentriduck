---
title: POI & Offering Advantage map
sidebar_position: 14
---

<!--
  #209 (web slice of #207, maintainer-requested): surfaces POI density and POI Offering
  Advantage (OA, ADR-0017/0018) directly on the site -- previously an internal index input
  only. Not methodology-bearing: this page reads already-signed-off `oa_domain` /
  `poi_density_per_km2` values from `mart_poi_offering_advantage` (itself a pure pass-through,
  see that model's header) with no new indicator, weight, or normalization introduced here.
  Follows the existing /maps AreaMap dropdown pattern (#132/#150/#152 precedent). Berlin-only
  for now, matching /maps and /poi-price-overview -- Hamburg's index isn't signed off yet
  (#125), even though the OA mart itself has Hamburg rows.
-->

<script>
  import { base } from '$app/paths';
</script>

# POI & Offering Advantage map

This map shows where different kinds of shops, cafés, and other mapped places ("points of
interest," or POIs) are concentrated across Berlin -- either as raw density, or as
**Offering Advantage (OA)**: how over- or under-represented a POI domain is in an area compared
to the citywide average for that domain (a location quotient). OA already feeds the governed
gentrification index as one input among several; this page surfaces it directly. See
[ADR-0017](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md)
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
    '/area/' || b.area_code as link
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

## Further reading

See [ADR-0017](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md)
for how Offering Advantage is computed, the [citywide POI & price/rent overview](/poi-price-overview)
for POI trends without the OA lens, or the [gentrification-pressure map](/maps) for the governed
index itself.

---

<sub>[Home](/) · [Methodology & data sources](/methodology) · [About this project](/about) · [GitHub repository](https://github.com/dhelweg/gentriduck)</sub>
