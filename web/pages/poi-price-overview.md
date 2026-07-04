---
title: Citywide POI & price/rent overview
---

# Citywide POI & price/rent overview

`fct_poi_development` (amenity/commerce counts, ADR-0008 D3 predictor pillar) and
`mart_price_rent_dimension` (Bodenrichtwert land value + Mietspiegel-derived estimated rent, D pillar)
are fully built but were previously visible only per-area on the [area detail page](/area-detail).
This page aggregates both **citywide**, so the trend is visible without already knowing a specific
Planungsraum to look up.

<Alert status="info">
  These are descriptive aggregates of the same governed marts used elsewhere on the site — no new
  indicator, weight, or normalization is introduced here, so no methodology sign-off applies (see
  the <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G2-public-methodology-page.md">methodology write-up</a>
  for how the underlying marts are built).
</Alert>

## POI development, citywide

```sql poi_citywide
select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code in ('berlin', 'BER')
group by all
order by snapshot_year
```

<Alert status="info">
  <code>fct_poi_development</code> spans two non-overlapping LOR vintages —
  <code>lor_pre2021</code> (2008–2020) and <code>lor_2021</code> (2021–2026) — unioned here into one
  continuous citywide series. Counts are OSM-derived and subject to OSM mapping-completeness bias
  (growing OSM contributor coverage inflates early-year counts; see C5 completeness-bias controls
  in the <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-c/C5-geo-signoff.md">C5 completeness-bias write-up</a>) — read the early-2010s ramp partly as
  OSM-adoption growth, not only real-world POI growth.
</Alert>

<LineChart
    data={poi_citywide}
    x=snapshot_year
    y=poi_count
    title="Total mapped POIs, city of Berlin"
    yAxisTitle="POI count (all harmonized categories)"
/>

### POI mix by harmonized category (latest year)

```sql poi_latest_year
select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code in ('berlin', 'BER')
```

```sql poi_mix_latest
select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code in ('berlin', 'BER')
  and snapshot_year = ${poi_latest_year[0].year}
group by all
order by poi_count desc
limit 15
```

<BarChart
    data={poi_mix_latest}
    x=poi_category_h
    y=poi_count
    title="Top 15 POI categories, {poi_latest_year[0].year}"
    yAxisTitle="POI count"
    swapXY=true
/>

## Price & rent dimension, citywide

```sql price_rent_citywide
select
    snapshot_year,
    avg(est_rent_mid) as avg_est_rent_mid,
    avg(est_rent_low) as avg_est_rent_low,
    avg(est_rent_high) as avg_est_rent_high,
    avg(brw_weighted_avg_eur_m2) filter (where brw_weighted_avg_eur_m2 is not null)
        as avg_brw_eur_m2,
    count(*) filter (where brw_weighted_avg_eur_m2 is not null) as n_areas_with_brw
from gentriduck_marts.mart_price_rent_dimension
group by all
order by snapshot_year
```

<Alert status="info">
  Bodenrichtwert (land-value) coverage is uneven across snapshot years — some years have no
  residential BRW zones matched (see <code>n_areas_with_brw</code> in the underlying data); the
  chart below only plots years with a non-null citywide average. Mietspiegel-derived estimated rent
  (<code>est_rent_mid/low/high</code>) has broader year coverage. Figures are city-average Mietspiegel
  Wohnlage-tier estimates, not individual observed rents — see the
  <a href="/area-detail">area detail page</a>'s price & rent section for the full per-area
  methodology caveats (Bestandsmiete bias, low-n Wohnlage suppression).
</Alert>

<LineChart
    data={price_rent_citywide}
    x=snapshot_year
    y={['avg_est_rent_low', 'avg_est_rent_mid', 'avg_est_rent_high']}
    title="Citywide estimated rent range (EUR/m²), by snapshot year"
    yAxisTitle="EUR/m²"
/>

<BarChart
    data={price_rent_citywide}
    x=snapshot_year
    y=avg_brw_eur_m2
    title="Citywide average Bodenrichtwert (EUR/m², residential zones)"
    yAxisTitle="EUR/m²"
    emptySet="warn"
    emptyMessage="No residential BRW zones matched for any snapshot year."
/>

## Drill down further

For a per-Planungsraum breakdown of these same two dimensions alongside the governed
status/dynamism index, see the [area detail page](/area-detail). For the citywide index headline
and choropleth map, see the [homepage](/) and the [maps page](/maps).
