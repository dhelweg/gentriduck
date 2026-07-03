---
title: Maps — gentrification pressure by area
---

# Maps — gentrification pressure by area

A choropleth view of the governed gentrification index (ADR-0004) over Berlin's planning areas.
Pick a level (Bezirksregion or Planungsraum) and an indicator below. Per ADR-0005 this page is
already parameterized by `city_code` — Hamburg's boundaries are already exported to
`dim_area_geometry`, but the governed index doesn't have real Hamburg data yet
([#125](https://github.com/dhelweg/gentriduck/issues/125)), so the area picker is Berlin-only for
now.

<Alert status="info">
  Label polarity note: <b>status_index</b> is ordinal (higher = <b>more deprived</b>);
  <b>dynamism_index</b> — higher means <b>faster upward</b> change. A <b>negative</b>
  <code>dynamism_class_bi</code> means <b>higher</b> gentrification pressure. See the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md">index definition</a>
  for the full methodology. Areas without a governed value (e.g. uninhabited PLRs) are drawn but
  left blank.
</Alert>

<Dropdown name="area_level" title="Area level" defaultValue="bzr">
  <DropdownOption value="bzr" valueLabel="Bezirksregion (BZR)"/>
  <DropdownOption value="plr" valueLabel="Planungsraum (PLR)"/>
</Dropdown>

<Dropdown name="indicator" title="Indicator" defaultValue="status_index">
  <DropdownOption value="status_index" valueLabel="Social status (status_index)"/>
  <DropdownOption value="dynamism_index" valueLabel="Dynamism (dynamism_index)"/>
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
where variant = 'standard'
  and area_level = '${inputs.area_level.value}'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'standard' and area_level = '${inputs.area_level.value}'
  )
```

{#if inputs.area_level.value === 'plr'}

<AreaMap
    data={areas}
    geoJsonUrl="/geo/plr.geojson"
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

Click a Planungsraum on the map to open its [drill-down page](/area-detail).

{:else}

<AreaMap
    data={areas}
    geoJsonUrl="/geo/bzr.geojson"
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

## Underlying data

```sql area_table
select
    area_name,
    status_index,
    dynamism_index
from gentriduck_marts.gentrification_index
where variant = 'standard'
  and area_level = '${inputs.area_level.value}'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'standard' and area_level = '${inputs.area_level.value}'
  )
order by dynamism_index desc
```

<DataTable data={area_table} rows=10/>

Per-area trajectories are on the [time-series page](/time-series). Clicking a Planungsraum (PLR)
on the map above opens its [detail/drill-down view](/area-detail) pre-selected on that area
([#133](https://github.com/dhelweg/gentriduck/issues/133)); the drill-down page is PLR-only (it
has no Bezirksregion-level data), so the BZR map above is view-only for now.
