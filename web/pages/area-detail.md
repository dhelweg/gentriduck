---
title: Area detail — per-PLR drill-down
---

<script>
  // $page and `browser` are already provided by Evidence's markdown preprocessing
  // ($app/stores, $app/environment). Accessing url.searchParams is disallowed during static
  // prerendering, so gate on `browser`: pre-select the area clicked on the /maps page
  // (?area=<area_code>) once running client-side (#133 G1d click-through); falls back to the
  // Dropdown's own default when absent/unmatched/prerendering.
  $: initialArea = browser ? ($page.url.searchParams.get('area') ?? undefined) : undefined;
</script>

# Area detail — one neighbourhood, full picture

Pick a single Berlin planning area below to see everything the site knows about it: how its social
status has changed over time, how its mix of shops/cafés/services has developed, and how land
value and estimated rent compare over the years. Arrive here pre-selected by clicking a
Planungsraum on the [maps page](/maps), or choose one directly.

<Alert status="info">
  <b>How to read the charts below:</b> "Social status" is ordinal — higher means <b>more
  deprived</b>; "dynamism" — higher means the status is improving <b>faster</b>. See the
  <a href="/methodology">methodology & data sources</a> page for a plain-language walkthrough of
  what these fields mean, or the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md">governed index definition (ADR-0004)</a>
  for the full technical spec. Data note: the trajectory, POI, and price/rent sections below are all
  matched to the same (older, pre-2021) neighbourhood boundaries, to line up with the one period
  currently governed by the index (Dec 2016) — see
  <code>web/scripts/export_area_geojson.py</code> for the same convention.
</Alert>

```sql areas
select distinct
    c.area_code as value,
    coalesce(g.area_name, c.area_code) as label
from gentriduck_marts.fct_gentrification_change c
left join gentriduck_marts.gentrification_index g
    on g.city_code = c.city_code
    and g.area_code = c.area_code
    and g.area_level = 'plr'
where c.city_code = 'BER'
order by label
```

<Dropdown name="area" data={areas} value=value label=label title="Area (PLR)" defaultValue={initialArea}/>

## {inputs.area.label} — how its social status has changed

```sql area_trend
select
    snapshot_year,
    status_index,
    dynamik_index,
    gentrification_score,
    rank_current
from gentriduck_marts.fct_gentrification_change
where city_code = 'BER'
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

```sql trajectory_summary
select
    n_editions,
    first_edition,
    last_edition,
    status_index_first,
    status_index_last,
    status_delta,
    trajectory_type,
    dominant_stage,
    trajectory_confidence,
    is_persistently_vulnerable,
    is_persistently_affluent
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER'
  and area_code = '${inputs.area.value}'
  and area_vintage = 'lor_pre2021'
```

<BigValue data={trajectory_summary} value=trajectory_type title="Overall trajectory" emptySet="warn"/>
<BigValue data={trajectory_summary} value=status_delta title="Status change (first→last edition)" fmt="0.00" emptySet="warn"/>
<BigValue data={trajectory_summary} value=trajectory_confidence title="Confidence in this trajectory" emptySet="warn"/>

Trajectory labels (e.g. "improving," "persistently-deprived") are explained on the
[methodology page](/methodology) — an "improving" label does not by itself mean the change was
purely positive for existing residents (it could reflect displacement as easily as incumbent
social mobility). Full detail behind the summary above:

<DataTable data={trajectory_summary} rows=1 emptySet="warn">
    <Column id=n_editions title="Editions available"/>
    <Column id=first_edition title="First edition"/>
    <Column id=last_edition title="Latest edition"/>
    <Column id=status_index_first title="Status at first edition"/>
    <Column id=status_index_last title="Status at latest edition"/>
    <Column id=status_delta title="Status change"/>
    <Column id=trajectory_type title="Trajectory type"/>
    <Column id=dominant_stage title="Most common stage"/>
    <Column id=trajectory_confidence title="Confidence"/>
    <Column id=is_persistently_vulnerable title="Persistently vulnerable?"/>
    <Column id=is_persistently_affluent title="Persistently affluent?"/>
</DataTable>

## How its commercial mix has developed

Shops, cafés, and other businesses tend to follow — not lead — social change (see
[methodology](/methodology) for the theory behind this). This chart shows how the mix of mapped
places here has evolved; treat the earliest years cautiously, since OpenStreetMap's own coverage
was still growing then, independent of any real neighbourhood change.

```sql poi_trend
select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
  and area_code = '${inputs.area.value}'
  and area_vintage = 'lor_pre2021'
group by all
order by snapshot_year
```

<BarChart
    data={poi_trend}
    x=snapshot_year
    y=poi_count
    series=poi_category_h
    title="Mapped places by category, {inputs.area.label}"
    yAxisTitle="Number of mapped places"
    emptySet="warn"
/>

## Land value & estimated rent

<Alert status="info">
  So what: this shows how land value and estimated rent have moved here. Because Berlin's official
  neighbourhood boundaries were redrawn in 2021, these figures are re-mapped (area-weighted) from
  the current boundary scheme onto the older one used elsewhere on this page — treat them as a
  close approximation, not an exact measurement. A thin overlap between old and new boundaries
  (mostly non-residential areas) makes an estimate less reliable; see the mart's model header and
  the <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-d/D1d-followup-geo-signoff.md">geo-DS sign-off</a> for the full method.
</Alert>

```sql price_rent
select
    snapshot_year,
    brw_weighted_avg_eur_m2,
    est_rent_mid,
    est_rent_low,
    est_rent_high
from gentriduck_marts.mart_price_rent_dimension_pre2021
where city_code = 'BER'
  and area_code = '${inputs.area.value}'
order by snapshot_year
```

<DataTable data={price_rent} rows=10 emptySet="warn" emptyMessage="No price/rent estimate for this area (no current-boundary planning area overlaps its footprint).">
    <Column id=snapshot_year title="Year"/>
    <Column id=brw_weighted_avg_eur_m2 title="Land value, EUR/m² (Bodenrichtwert)"/>
    <Column id=est_rent_mid title="Estimated rent, typical (EUR/m²)"/>
    <Column id=est_rent_low title="Estimated rent, low end (EUR/m²)"/>
    <Column id=est_rent_high title="Estimated rent, high end (EUR/m²)"/>
</DataTable>

<LineChart
    data={price_rent}
    x=snapshot_year
    y=est_rent_mid
    title="Estimated mid-range rent (EUR/m²), {inputs.area.label}"
    yAxisTitle="EUR/m²"
    emptySet="warn"
    emptyMessage="No price/rent estimate for this area (no current-boundary planning area overlaps its footprint)."
/>

## Further reading

See [methodology & data sources](/methodology) for what the index means and where the data comes
from, or the [citywide POI & price/rent overview](/poi-price-overview) for the same two signals
aggregated across all of Berlin.
