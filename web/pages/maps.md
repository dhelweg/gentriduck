---
title: Maps — gentrification pressure by area
---

<script>
  // basePath-aware asset URL (#144): AreaMap fetches `geoJsonUrl` verbatim — unlike Evidence's
  // nav/data links it does NOT prepend the base path — so on the GitHub Pages project site
  // (served under /gentriduck) a bare "/geo/..." would 404 and the map renders empty. Prepend
  // SvelteKit's `base` (= deployment.basePath in the build; "" when served at root in dev).
  import { base } from '$app/paths';
</script>

# Maps — gentrification pressure by area

This map colours each of Berlin's neighbourhoods by its current gentrification-pressure signal, so
you can see at a glance which parts of the city show the strongest or weakest pressure. Pick a map
level and an indicator below.

Right now this map covers Berlin only — Hamburg's boundaries are ready behind the scenes, but the
underlying index doesn't have real Hamburg numbers yet
([#125](https://github.com/dhelweg/gentriduck/issues/125)), so the area picker stays Berlin-only
for now.

<Alert status="info">
  <b>How to read the map:</b> "Social status" is ordinal — higher shading means <b>more deprived</b>,
  not more prosperous. "Dynamism" — higher means the area's status is improving <b>faster</b>. A
  <b>negative</b> pressure trend (see the table below the map) means <b>higher</b> gentrification
  pressure. See the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md">index definition</a>
  for the full methodology, or the <a href="/methodology">methodology & data sources</a> page for a
  plain-language walkthrough. Areas without a value (e.g. uninhabited planning areas) are drawn but
  left blank.
</Alert>

<Dropdown name="variant" title="Data" defaultValue="live_data">
  <DropdownOption value="live_data" valueLabel="Live data (latest MSS editions, 2013–2025)"/>
  <DropdownOption value="standard" valueLabel="2018 thesis reproduction (Dec 2016 snapshot)"/>
</Dropdown>

<Dropdown name="area_level" title="Area level" defaultValue="plr">
  <DropdownOption value="bzr" valueLabel="Bezirksregion (BZR) — 2018 thesis reproduction only"/>
  <DropdownOption value="plr" valueLabel="Planungsraum (PLR)"/>
</Dropdown>

{#if inputs.variant.value === 'live_data' && inputs.area_level.value === 'bzr'}
<Alert status="warning">
  The "Live data" option only has neighbourhood-level (Planungsraum) detail — there's no wider
  Bezirksregion view for it yet. Switch "Area level" to Planungsraum, or "Data" to the 2018 thesis
  reproduction, to see a Bezirksregion map.
</Alert>
{/if}

<Dropdown name="indicator" title="Indicator" defaultValue="status_index">
  <DropdownOption value="status_index" valueLabel="Social status — how deprived or affluent (current snapshot)"/>
  <DropdownOption value="dynamism_index" valueLabel="Dynamism — how fast that status is changing"/>
</Dropdown>

```sql areas
select
    city_code,
    area_code,
    area_name,
    status_index,
    dynamism_index,
    period_yyyymm,
    -- Drill-down click-through target (#133 G1d); area-detail only covers PLR-level areas
    -- (fct_gentrification_change has no area_level split), so only the PLR branch below
    -- actually wires this up as a link.
    '/area-detail?area=' || area_code as link
from gentriduck_marts.gentrification_index
where variant = '${inputs.variant.value}'
  and area_level = '${inputs.area_level.value}'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = '${inputs.variant.value}' and area_level = '${inputs.area_level.value}'
  )
```

{#if inputs.area_level.value === 'plr'}

<AreaMap
    data={areas}
    geoJsonUrl={`${base}/geo/plr.geojson`}
    geoId="area_code"
    areaCol="area_code"
    value={inputs.indicator.value}
    legendType="scalar"
    title="Berlin Planungsraum (PLR) — {inputs.indicator.label}, latest period"
    startingLat={52.52}
    startingLong={13.405}
    startingZoom={9}
    link="link"
/>

Click a Planungsraum on the map to open its [detailed breakdown](/area-detail).

{:else}

<AreaMap
    data={areas}
    geoJsonUrl={`${base}/geo/bzr.geojson`}
    geoId="area_code"
    areaCol="area_code"
    value={inputs.indicator.value}
    legendType="scalar"
    title="Berlin Bezirksregion (BZR) — {inputs.indicator.label}, latest period"
    startingLat={52.52}
    startingLong={13.405}
    startingZoom={9}
/>

{/if}

## The numbers behind the map

```sql area_table
select
    area_name,
    status_index,
    dynamism_index
from gentriduck_marts.gentrification_index
where variant = '${inputs.variant.value}'
  and area_level = '${inputs.area_level.value}'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = '${inputs.variant.value}' and area_level = '${inputs.area_level.value}'
  )
order by dynamism_index desc
```

<DataTable data={area_table} rows=10>
    <Column id=area_name title="Area"/>
    <Column id=status_index title="Social status (1=least deprived … 4=most deprived)"/>
    <Column id=dynamism_index title="Speed of change (higher = faster upward change)"/>
</DataTable>

Want to see how one specific area has changed over the years? Use the
[time series page](/time-series). Clicking a Planungsraum (PLR) on the map above opens its
[detailed breakdown](/area-detail) pre-selected on that area
([#133](https://github.com/dhelweg/gentriduck/issues/133)); that detail page only covers
Planungsräume, so the Bezirksregion map above is view-only for now.
