---
breadcrumb: "select area_name as breadcrumb from gentriduck_marts.gentrification_index where variant = 'live_data' and area_level = 'plr' and city_code = 'BER' and area_code = '${params.code}' order by period_yyyymm desc limit 1"
---

<!--
  #150: templated per-area drill-down route (Evidence "Templated Pages" — see
  https://docs.evidence.dev/core-concepts/templated-pages/). ${params.code} drives every query
  below, server-prerendered at build time -- discovered via the link-crawl from /maps and
  /time-series (Evidence builds whatever route a link points at; there is no separate static-paths
  query). Replaces the ~540-item dropdown that /area-detail dropped (#133 degradation) with an
  exact map-click / mover-row deep link. /area-detail remains the coarse Bezirk browse entry point.
  Presentation only; no indicator/weight/method change (no methodology gate).
-->

```sql area_info
select area_name, city_code
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and area_code = '${params.code}'
order by period_yyyymm desc
limit 1
```

# {area_info[0].area_name}

<Alert status="info">
  <b>How to read the charts:</b> official status runs <b>1 = least deprived</b> to
  <b>4 = most deprived</b>, so a <b>falling</b> status line means the area became <b>less</b> deprived
  (its status rose) — which is also the signature of gentrification, not automatically good news for
  existing residents. See the <a href="/methodology">methodology & data sources</a> page for a full
  walkthrough. Figures are on Berlin's current (2021+) boundaries and the live social-monitoring
  editions (2021–2025).
</Alert>

## Social status over time

```sql area_trend
select
    snapshot_year,
    status_index,
    typology_stage
from gentriduck_marts.fct_gentrification_change
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${params.code}'
order by snapshot_year
```

<LineChart
    data={area_trend}
    x=snapshot_year
    y=status_index
    title="Social status over time, {area_info[0].area_name} (1 = least deprived … 4 = most deprived)"
    yAxisTitle="Status class"
    yMin=1
    yMax=4
    emptySet="warn"
    emptyMessage="No time series for this area."
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
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${params.code}'
```

<BigValue data={trajectory_summary} value=trajectory_type title="Overall trajectory" emptySet="warn"/>
<BigValue data={trajectory_summary} value=dominant_stage title="Most common stage" emptySet="warn"/>
<BigValue data={trajectory_summary} value=trajectory_confidence title="Confidence" emptySet="warn"/>

Trajectory labels are explained on the [methodology page](/methodology) — an "improving" label does
not by itself mean the change was good for existing residents; rising status can reflect
displacement as easily as incumbent social mobility.

## How its commercial mix has developed

Shops, cafés and other businesses tend to *follow* — not lead — social change (see
[methodology](/methodology) for the theory). This shows how the mix of mapped places here has
evolved.

```sql poi_trend
select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${params.code}'
group by all
order by snapshot_year
```

<BarChart
    data={poi_trend}
    x=snapshot_year
    y=poi_count
    series=poi_category_h
    title="Mapped places by category, {area_info[0].area_name}"
    yAxisTitle="Number of mapped places"
    emptySet="warn"
/>

## Land value & estimated rent

<Alert status="info">
  These are official reference values (Bodenrichtwert land value and Mietspiegel-derived estimated
  rent), not observed transaction prices — see the
  <a href="/methodology">methodology page</a> for what they measure and their caveats.
</Alert>

```sql price_rent
select
    snapshot_year,
    brw_weighted_avg_eur_m2,
    est_rent_mid,
    est_rent_low,
    est_rent_high
from gentriduck_marts.mart_price_rent_dimension
where city_code = 'BER' and area_code = '${params.code}'
order by snapshot_year
```

<LineChart
    data={price_rent}
    x=snapshot_year
    y={['est_rent_low', 'est_rent_mid', 'est_rent_high']}
    title="Estimated rent range (EUR/m²), {area_info[0].area_name}"
    yAxisTitle="EUR/m²"
    emptySet="warn"
    emptyMessage="No price/rent estimate for this area."
/>

<DataTable data={price_rent} rows=10 emptySet="warn" emptyMessage="No price/rent estimate for this area.">
    <Column id=snapshot_year title="Year"/>
    <Column id=brw_weighted_avg_eur_m2 title="Land value, EUR/m² (Bodenrichtwert)"/>
    <Column id=est_rent_mid title="Estimated rent, typical (EUR/m²)"/>
    <Column id=est_rent_low title="Estimated rent, low (EUR/m²)"/>
    <Column id=est_rent_high title="Estimated rent, high (EUR/m²)"/>
</DataTable>

## Further reading

See [methodology & data sources](/methodology) for what the index means, the
[citywide POI & price/rent overview](/poi-price-overview) for these signals across all of Berlin,
[browse by district](/area-detail) for other neighbourhoods, or the
[time-series view](/time-series) for how the whole city has moved.
