---
title: Gentriduck — Berlin Gentrification Index
---

Gentriduck tracks socio-economic status and neighbourhood change (a proxy for gentrification
pressure) across Berlin's planning areas, using open data. This overview shows the governed
index's headline numbers for the latest available period.

<Alert status="info">
  Label polarity note: a <b>negative</b> dynamism class means <b>higher</b> gentrification
  pressure (faster upward change); a <b>low</b> status class means lower deprivation (a wealthier
  area). See the <a href="/methodology">methodology & data sources</a> page for a plain-language
  explanation of what these numbers mean, or the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md">governed index definition (ADR-0004)</a> for the full technical spec.
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

Latest period: **{latest_period[0].period}**

## Dynamism class distribution

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
    title="Areas by dynamism class, {latest_period[0].period}"
    x=dynamism_class
    y=area_count
/>

## Highest-pressure areas

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

<DataTable data={top_pressure} rows=10/>

## Explore further

See the [methodology & data sources](/methodology) page for what these numbers mean and where they
come from, the [time-series page](/time-series) for per-area gentrification trajectories across the
available MSS editions, the [maps page](/maps) for a choropleth view over Berlin's planning
areas, the [citywide POI & price/rent overview](/poi-price-overview) for aggregate amenity and
rent/land-value trends across the whole city, or the [area detail page](/area-detail) for a full
per-PLR breakdown (index, POI development, price/rent).
