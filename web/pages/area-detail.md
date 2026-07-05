---
title: Area detail — neighbourhood drill-down
---

# Area detail — one neighbourhood, full picture

Pick a district to compare its neighbourhoods, then read the spotlight below on the one currently
under the most gentrification pressure — its social-status trajectory, how its mix of shops and
cafés has developed, and how land value and estimated rent compare. For the citywide picture, see
the [maps page](/maps) or the [time-series view](/time-series).

<!--
  No blind ~540-item PLR picker (maintainer feedback). Navigation is coarse Bezirk (district) +
  a ranked comparison table; the single-area "spotlight" is the district's highest-pressure area.
  Kept prerender-clean: no $page/?area machinery (that forced client-only rendering and left every
  query empty at build). Exact per-area deep-link from a map/table click is a follow-up — it needs
  an Evidence templated route (/area/[code]) so ${params.code} can drive the queries server-side.
  Presentation only; no indicator/weight/method change (no methodology gate).
-->

<Alert status="info">
  <b>How to read the charts:</b> official status runs <b>1 = least deprived</b> to
  <b>4 = most deprived</b>, so a <b>falling</b> status line means the area became <b>less</b> deprived
  (its status rose) — which is also the signature of gentrification, not automatically good news for
  existing residents. See the <a href="/methodology">methodology & data sources</a> page for a full
  walkthrough. Figures are on Berlin's current (2021+) boundaries and the live social-monitoring
  editions (2021–2025).
</Alert>

## Browse by district

<Dropdown name="bezirk" title="District (Bezirk)" defaultValue="02">
  <DropdownOption value="01" valueLabel="01 · Mitte"/>
  <DropdownOption value="02" valueLabel="02 · Friedrichshain-Kreuzberg"/>
  <DropdownOption value="03" valueLabel="03 · Pankow"/>
  <DropdownOption value="04" valueLabel="04 · Charlottenburg-Wilmersdorf"/>
  <DropdownOption value="05" valueLabel="05 · Spandau"/>
  <DropdownOption value="06" valueLabel="06 · Steglitz-Zehlendorf"/>
  <DropdownOption value="07" valueLabel="07 · Tempelhof-Schöneberg"/>
  <DropdownOption value="08" valueLabel="08 · Neukölln"/>
  <DropdownOption value="09" valueLabel="09 · Treptow-Köpenick"/>
  <DropdownOption value="10" valueLabel="10 · Marzahn-Hellersdorf"/>
  <DropdownOption value="11" valueLabel="11 · Lichtenberg"/>
  <DropdownOption value="12" valueLabel="12 · Reinickendorf"/>
</Dropdown>

```sql browse
select
    area_name,
    status_class as stage,
    dynamism_class as pressure_trend
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
  and substr(area_code, 1, 2) = '${inputs.bezirk.value}'
order by (dynamism_class_bi = 'negative') desc, dynamism_index desc
```

Every neighbourhood in the selected district, highest gentrification pressure first. The top-ranked
one is profiled in the spotlight below.

<DataTable data={browse} rows=10 rowShading=true>
    <Column id=area_name title="Neighbourhood (PLR)"/>
    <Column id=stage title="Stage"/>
    <Column id=pressure_trend title="Pressure trend"/>
</DataTable>

```sql chosen
select area_code, area_name
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
  and substr(area_code, 1, 2) = '${inputs.bezirk.value}'
order by (dynamism_class_bi = 'negative') desc, dynamism_index desc
limit 1
```

---

## {chosen[0].area_name} — how its social status has changed

```sql area_trend
select
    snapshot_year,
    status_index,
    typology_stage
from gentriduck_marts.fct_gentrification_change
where city_code = 'BER' and area_vintage = 'lor_2021'
  and area_code = (
      select area_code
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
        and period_yyyymm = (
            select max(period_yyyymm) from gentriduck_marts.gentrification_index
            where variant = 'live_data' and area_level = 'plr'
        )
        and substr(area_code, 1, 2) = '${inputs.bezirk.value}'
      order by (dynamism_class_bi = 'negative') desc, dynamism_index desc
      limit 1
  )
order by snapshot_year
```

<LineChart
    data={area_trend}
    x=snapshot_year
    y=status_index
    title="Social status over time, {chosen[0].area_name} (1 = least deprived … 4 = most deprived)"
    yAxisTitle="Status class"
    yMin=1
    yMax=4
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
where city_code = 'BER' and area_vintage = 'lor_2021'
  and area_code = (
      select area_code
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
        and period_yyyymm = (
            select max(period_yyyymm) from gentriduck_marts.gentrification_index
            where variant = 'live_data' and area_level = 'plr'
        )
        and substr(area_code, 1, 2) = '${inputs.bezirk.value}'
      order by (dynamism_class_bi = 'negative') desc, dynamism_index desc
      limit 1
  )
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
where city_code = 'BER' and area_vintage = 'lor_2021'
  and area_code = (
      select area_code
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
        and period_yyyymm = (
            select max(period_yyyymm) from gentriduck_marts.gentrification_index
            where variant = 'live_data' and area_level = 'plr'
        )
        and substr(area_code, 1, 2) = '${inputs.bezirk.value}'
      order by (dynamism_class_bi = 'negative') desc, dynamism_index desc
      limit 1
  )
group by all
order by snapshot_year
```

<BarChart
    data={poi_trend}
    x=snapshot_year
    y=poi_count
    series=poi_category_h
    title="Mapped places by category, {chosen[0].area_name}"
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
where city_code = 'BER'
  and area_code = (
      select area_code
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
        and period_yyyymm = (
            select max(period_yyyymm) from gentriduck_marts.gentrification_index
            where variant = 'live_data' and area_level = 'plr'
        )
        and substr(area_code, 1, 2) = '${inputs.bezirk.value}'
      order by (dynamism_class_bi = 'negative') desc, dynamism_index desc
      limit 1
  )
order by snapshot_year
```

<LineChart
    data={price_rent}
    x=snapshot_year
    y={['est_rent_low', 'est_rent_mid', 'est_rent_high']}
    title="Estimated rent range (EUR/m²), {chosen[0].area_name}"
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
[citywide POI & price/rent overview](/poi-price-overview) for these signals across all of Berlin, or
the [time-series view](/time-series) for how the whole city has moved.
