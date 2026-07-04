---
title: Time series — gentrification trajectory
---

# Time series — how a neighbourhood has changed

See how a single Berlin planning area has changed across every official social-monitoring report
since the data begins. Pick a city and an area below.

<Alert status="info">
  <b>How to read the chart:</b> a <b>falling</b> line means the area's official status
  classification is improving (getting less deprived); a <b>rising</b> line means it's becoming
  <b>more</b> deprived (the scale runs 1 = least deprived to 4 = most deprived). The second chart,
  "Legacy score," is the single blended number the original 2018 study used — kept only for
  comparison with that study, not as the current definition. See the
  <a href="/methodology">methodology & data sources</a> page for what these mean in plain language,
  or the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md">index definition</a>
  for the governed methodology. Uninhabited planning areas have no status/rank for the affected
  years.
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

## {inputs.area.label} — how it has changed

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
    title="Social status over time, {inputs.area.label}"
    yAxisTitle="Status class (1=least deprived … 4=most deprived)"
/>

<LineChart
    data={area_trend}
    x=snapshot_year
    y=gentrification_score
    title="Legacy score (2018 methodology), {inputs.area.label}"
    yAxisTitle="Legacy score — not comparable to the chart above"
/>

<DataTable data={area_trend} rows=10>
    <Column id=snapshot_year title="Year"/>
    <Column id=status_index title="Social status (1=least deprived … 4=most deprived)"/>
    <Column id=dynamik_index title="Direction of change (1=improving … 3=worsening)"/>
    <Column id=gentrification_score title="Legacy score (2018 methodology)"/>
    <Column id=rank_current title="Legacy rank"/>
</DataTable>

## How does this compare to the rest of the city?

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
    title="City-wide median social status, {inputs.city.label}"
    yAxisTitle="Median status class (1=least deprived … 4=most deprived)"
/>
