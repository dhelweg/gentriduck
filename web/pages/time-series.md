---
title: Time series — gentrification trajectory
---

# Time series — gentrification trajectory

Track how a single planning area (PLR) changes across the available MSS editions. Pick a city
and area below. Per ADR-0005 the page is parameterized by `city_code`/`area_code` — nothing here
is Berlin-specific, even though Berlin is currently the only city with a real MSS panel.

<Alert status="info">
  Label polarity note: <b>status_index</b> is ordinal, 1 (least deprived) to 4 (most deprived) —
  a <b>rising</b> line means the area is becoming <b>more</b> deprived. <b>gentrification_score</b>
  is the legacy (pre-R-A1) composite kept for continuity with the 2018 baseline; see the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md">index definition</a>
  for the governed methodology. Uninhabited PLRs have no status_index/rank for the affected years.
</Alert>

```sql cities
select distinct
    city_code as value,
    city_code as label
from gentriduck_marts.fct_gentrification_change
order by label
```

<Dropdown name="city" data={cities} value=value label=label title="City"/>

```sql areas
select distinct
    c.area_code as value,
    coalesce(g.area_name, c.area_code) as label
from gentriduck_marts.fct_gentrification_change c
left join gentriduck_marts.gentrification_index g
    on g.city_code = c.city_code
    and g.area_code = c.area_code
    and g.area_level = 'plr'
where c.city_code = '${inputs.city.value}'
order by label
```

<Dropdown name="area" data={areas} value=value label=label title="Area (PLR)"/>

## {inputs.area.label} — trend

```sql area_trend
select
    snapshot_year,
    status_index,
    dynamik_index,
    gentrification_score,
    rank_current
from gentriduck_marts.fct_gentrification_change
where city_code = '${inputs.city.value}'
  and area_code = '${inputs.area.value}'
order by snapshot_year
```

<LineChart
    data={area_trend}
    x=snapshot_year
    y=status_index
    title="Social status (D1), {inputs.area.label}"
    yAxisTitle="status_index (1=least deprived … 4=most deprived)"
/>

<LineChart
    data={area_trend}
    x=snapshot_year
    y=gentrification_score
    title="Legacy gentrification score, {inputs.area.label}"
    yAxisTitle="gentrification_score (legacy, pre-R-A1)"
/>

<DataTable data={area_trend} rows=10/>

## City-wide context

```sql citywide_trend
select
    snapshot_year,
    median(status_index) as median_status_index,
    median(gentrification_score) as median_gentrification_score,
    count(*) filter (where not is_uninhabited) as areas_reporting
from gentriduck_marts.fct_gentrification_change
where city_code = '${inputs.city.value}'
group by all
order by snapshot_year
```

<LineChart
    data={citywide_trend}
    x=snapshot_year
    y=median_status_index
    title="City-wide median social status (D1), {inputs.city.label}"
    yAxisTitle="median status_index"
/>
