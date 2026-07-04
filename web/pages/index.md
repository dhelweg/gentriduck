---
title: Gentriduck — Berlin Gentrification Index
---

Which Berlin neighbourhoods are showing the clearest signs of gentrification pressure right now —
and which aren't? Gentriduck answers that using only free, official, open data: Berlin's own
social-monitoring reports, the population register, OpenStreetMap, and official land-value/rent
references. Below are the headline numbers for the latest available period.

Every figure on this site describes a small area of a few thousand residents (a *Planungsraum*),
never an individual, household, or building — see the [methodology & data sources](/methodology)
page for what that means and where the caveats are.

<Alert status="info">
  <b>How to read the numbers below:</b> a <b>negative</b> trend means an area's official
  classification is moving in a direction this project reads as <b>higher</b> gentrification
  pressure (fast upward change); a <b>positive</b> trend means <b>lower</b> pressure. Separately, a
  <b>low</b> status class means <b>lower</b> deprivation (a wealthier area) — so "low" is not the
  same as "bad" here. See the <a href="/methodology">methodology & data sources</a> page for a full
  plain-language walkthrough, or the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md">governed index definition (ADR-0004)</a> for the technical spec.
</Alert>

<Dropdown name="variant" title="Data" defaultValue="live_data">
  <DropdownOption value="live_data" valueLabel="Live data (latest MSS editions, 2013–2025)"/>
  <DropdownOption value="standard" valueLabel="2018 thesis reproduction (Dec 2016 snapshot)"/>
</Dropdown>

<!-- live_data only has PLR-grain rows (no Bezirksregion aggregate); standard/distance_weighted
     carry both. Pick the matching area_level in SQL rather than in JS templating (#138 G4). -->

```sql latest_period
select max(period_yyyymm) as period
from gentriduck_marts.gentrification_index
where variant = '${inputs.variant.value}'
```

```sql headline
select
    count(*) as areas_monitored,
    count(*) filter (where dynamism_class_bi = 'negative') as high_pressure_areas,
    count(*) filter (where dynamism_class_bi = 'positive') as low_pressure_areas
from gentriduck_marts.gentrification_index
where variant = '${inputs.variant.value}'
  and area_level = case when '${inputs.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${latest_period[0].period}'
```

<BigValue data={headline} value=areas_monitored title="Areas monitored"/>
<BigValue data={headline} value=high_pressure_areas title="High gentrification pressure" fmt="0"/>
<BigValue data={headline} value=low_pressure_areas title="Low gentrification pressure" fmt="0"/>

Numbers above reflect the most recent available reporting period: **{latest_period[0].period}**.

## Areas by pressure trend

```sql dynamism_distribution
select
    dynamism_class,
    count(*) as area_count
from gentriduck_marts.gentrification_index
where variant = '${inputs.variant.value}'
  and area_level = case when '${inputs.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${latest_period[0].period}'
group by all
order by area_count desc
```

<BarChart
    data={dynamism_distribution}
    title="Areas by gentrification-pressure trend, {latest_period[0].period}"
    x=dynamism_class
    y=area_count
    xAxisTitle="Pressure trend"
    yAxisTitle="Number of areas"
/>

## Top 10 highest-pressure areas

These are the ten Berlin planning areas currently showing the strongest gentrification-pressure
signal (a "negative" trend, in the terms above) for the latest period.

```sql top_pressure
select
    area_name,
    status_class,
    dynamism_class
from gentriduck_marts.gentrification_index
where variant = '${inputs.variant.value}'
  and area_level = case when '${inputs.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${latest_period[0].period}'
  and dynamism_class_bi = 'negative'
order by dynamism_index desc
limit 10
```

<DataTable data={top_pressure} rows=10>
    <Column id=area_name title="Area"/>
    <Column id=status_class title="Current classification"/>
    <Column id=dynamism_class title="Pressure trend"/>
</DataTable>

## Explore further

See [methodology & data sources](/methodology) for what these numbers mean and where they come
from, [time series](/time-series) for how a single area has changed over the years,
[maps](/maps) for a citywide map, the [citywide POI & price/rent overview](/poi-price-overview)
for shop/amenity and rent/land-value trends across all of Berlin, or [area detail](/area-detail)
for a full breakdown of any one neighbourhood.
