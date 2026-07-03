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

# Area detail — per-PLR drill-down

Full indicator breakdown for a single Berlin Planungsraum (PLR): index trajectory across all
available MSS editions, POI development, and the Bodenrichtwert/Mietspiegel-derived price & rent
dimension. Pick an area below, or arrive here pre-selected by clicking a Planungsraum on the
[maps page](/maps).

<Alert status="info">
  Label polarity note: <b>status_index</b> is ordinal (higher = <b>more deprived</b>);
  <b>dynamism_index</b> — higher means <b>faster upward</b> change. See the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md">index definition</a>
  for the full methodology. Vintage note: trajectory/POI/price-rent are joined on
  <code>area_vintage = 'lor_pre2021'</code> to match the only MSS period currently governed
  (201612) — see <code>web/scripts/export_area_geojson.py</code> for the same convention.
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

## {inputs.area.label} — index trajectory

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
    title="Social status (D1), {inputs.area.label}"
    yAxisTitle="status_index (1=least deprived … 4=most deprived)"
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

<BigValue data={trajectory_summary} value=trajectory_type title="Trajectory type" emptySet="warn"/>
<BigValue data={trajectory_summary} value=status_delta title="Status delta (first→last edition)" fmt="0.00" emptySet="warn"/>
<BigValue data={trajectory_summary} value=trajectory_confidence title="Confidence" emptySet="warn"/>

<DataTable data={trajectory_summary} rows=1 emptySet="warn"/>

## POI development

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
    title="POI counts by harmonized category, {inputs.area.label}"
    yAxisTitle="POI count"
    emptySet="warn"
/>

## Price & rent dimension

<Alert status="warning">
  <code>mart_price_rent_dimension</code> is only published for the <code>lor_2021</code> PLR
  scheme, which uses different area codes/boundaries than the <code>lor_pre2021</code> scheme
  the governed index (period 201612) and this area picker use — so this section is usually
  empty for now. Aligning the two vintages (or re-deriving price/rent on the pre-2021 scheme)
  is tracked as follow-up work, not solved in this ticket.
</Alert>

```sql price_rent
select
    snapshot_year,
    brw_weighted_avg_eur_m2,
    est_rent_mid,
    est_rent_low,
    est_rent_high,
    brw_percentile
from gentriduck_marts.mart_price_rent_dimension
where city_code = 'BER'
  and area_code = '${inputs.area.value}'
order by snapshot_year
```

<DataTable data={price_rent} rows=10 emptySet="warn" emptyMessage="No price/rent row for this area under the lor_2021 scheme (vintage mismatch, see note above)."/>

<LineChart
    data={price_rent}
    x=snapshot_year
    y=est_rent_mid
    title="Estimated mid-range rent (EUR/m²), {inputs.area.label}"
    yAxisTitle="EUR/m²"
    emptySet="warn"
    emptyMessage="No price/rent row for this area under the lor_2021 scheme (vintage mismatch, see note above)."
/>
