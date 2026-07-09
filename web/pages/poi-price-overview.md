---
title: Citywide POI & price/rent overview
sidebar_position: 15
---

# Berlin, citywide: shops & amenities, land value & rent

Two data sources Gentriduck tracks, added up across the whole city — one feeds the governed index,
one is contextual: how the mix of mapped shops, cafés, and other amenities ("points of interest,"
or POIs) has grown, and how land value and estimated rent have moved. Looking at the whole city
lets you see the citywide trend without already knowing which neighbourhood to check — for a
single-neighbourhood breakdown, see the [area detail page](/area-detail).

<Alert status="info">
  These are simple citywide averages/totals of the same governed data used elsewhere on the site —
  no new indicator, weight, or method is introduced here, so no separate methodology sign-off
  applies. See the [methodology & data sources](/methodology) page for how the underlying figures
  are built.
</Alert>

## Shops, cafés & amenities, citywide

```sql poi_citywide
select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
group by all
order by snapshot_year
```

<Alert status="info">
  Because Berlin's official neighbourhood boundaries changed in 2021, this line stitches together
  counts from two boundary systems (pre-2021 and 2021+) into one continuous citywide series — read
  it as one trend, not two. It's also worth reading the early years cautiously: since these are
  OpenStreetMap-derived counts, growing map-contributor coverage over time inflates early-year
  counts on its own, independent of real-world change (see the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-c/C5-geo-signoff.md">completeness-bias correction write-up</a>
  for how the index itself corrects for this).
</Alert>

<LineChart
    data={poi_citywide}
    x=snapshot_year
    y=poi_count
    title="Total mapped shops, cafés & amenities, city of Berlin"
    yAxisTitle="Number of mapped places"
/>

### What kinds of places make up that total? (latest year)

```sql poi_latest_year
select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
```

```sql poi_mix_latest
select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
  and snapshot_year = ${poi_latest_year[0].year}
group by all
order by poi_count desc
limit 15
```

<BarChart
    data={poi_mix_latest}
    x=poi_category_h
    y=poi_count
    title="Top 15 categories of mapped places, {poi_latest_year[0].year}"
    yAxisTitle="Number of mapped places"
    swapXY=true
/>

## Land value & estimated rent, citywide

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
  These are citywide averages of official reference values, not observed transaction prices — see
  the [area detail page](/area-detail)'s price & rent section, or the
  [methodology page](/methodology), for what "land value" (Bodenrichtwert) and "estimated rent"
  (Mietspiegel-derived) actually measure and their caveats. Land-value coverage is uneven across
  years (some years have no residential zones matched — see <code>n_areas_with_brw</code> in the
  underlying data); the chart below only plots years with a usable citywide average. Estimated-rent
  coverage is broader.
</Alert>

<LineChart
    data={price_rent_citywide}
    x=snapshot_year
    y={['avg_est_rent_low', 'avg_est_rent_mid', 'avg_est_rent_high']}
    title="Citywide estimated rent range (EUR/m²), by year"
    yAxisTitle="EUR/m²"
/>

<BarChart
    data={price_rent_citywide}
    x=snapshot_year
    y=avg_brw_eur_m2
    title="Citywide average land value (Bodenrichtwert), residential zones (EUR/m²)"
    yAxisTitle="EUR/m²"
    emptySet="warn"
    emptyMessage="No residential land-value zones matched for any year."
/>

## Drill down further

For a single-neighbourhood breakdown of these same two signals alongside the governed
gentrification index, see the [area detail page](/area-detail). For the citywide index headline
and map, see the [home page](/) and the [maps page](/maps).

---

<sub>[Home](/) · [Methodology & data sources](/methodology) · [About this project](/about) · [GitHub repository](https://github.com/dhelweg/gentriduck)</sub>

