---
breadcrumb: "select area_name as breadcrumb from gentriduck_marts.dim_area_geometry where city_code = 'BER' and area_level = 'bzr' and area_code = '${params.code}' limit 1"
---

<!--
  #247 (I18-web slice 2): Bezirksregion (BZR) coarse profile page. Discovered/crawled via each
  Prognoseraum page's "Bezirksregionen in this Prognoseraum" child table
  (pages/berlin/area/pgr/[code].md) -- no separate index.md needed at this level, same reasoning
  as the PGR page's header comment.

  Children here are individual neighbourhoods (Planungsräume, PLR grain) -- these already have
  their own full profile page (pages/berlin/area/[code].md, #150/#231/I14), so this page links
  straight into that existing route rather than duplicating it.

  Same display-only / non-methodology-bearing framing as the Bezirk/PGR pages (see those files'
  header comments). Gate: docs/epic-i/I18-web-geo-signoff.md / I18-web-domain-signoff.md.
-->

```sql bzr_name
select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_code = '${params.code}'
limit 1
```

```sql pgr_name
select area_code, area_name, '/berlin/area/pgr/' || area_code as pgr_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = substr('${params.code}', 1, 4)
limit 1
```

<Hero compact eyebrow="Chapter 3 — The Evidence" title="{bzr_name[0] && bzr_name[0].area_name} — Bezirksregion profile" lede="Population, composition, and neighbourhood-stage mix for this Bezirksregion, summed and recomputed from its constituent Planungsräume — never a re-scored index at this grain." />

Up: <a href="/berlin/area/pgr/{pgr_name[0] && pgr_name[0].area_code}">{pgr_name[0] && pgr_name[0].area_name}</a> ·
[all districts](/berlin/area/bezirk) · [full neighbourhood list](/berlin/area)

<Alert status="info">
  Figures on this page are <b>sums and population-weighted averages</b> of this Bezirksregion's
  neighbourhoods — never a separately re-scored index. Each neighbourhood below has its own full
  profile (index, trajectory, commercial mix) — see the
  <a href="/methodology">methodology page</a> for why this coarser grain is not re-scored.
</Alert>

## Population & composition

```sql demographics
select
    reference_year,
    residents_total,
    age_under18_share,
    age_18_27_share,
    age_27_45_share,
    age_45_65_share,
    age_65plus_share,
    mean_age_years,
    any_indicator_suppressed,
    n_plr
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'bzr' and area_code = '${params.code}'
order by reference_year desc
limit 1
```

<BigValue data={demographics} value=residents_total title="Residents (latest EWR year)" fmt="num0" emptySet="warn"/>
<BigValue data={demographics} value=n_plr title="Constituent neighbourhoods (Planungsräume)" emptySet="warn"/>
<BigValue data={demographics} value=mean_age_years title="Mean age (years)" fmt="num1" emptySet="warn"/>

{#if demographics && demographics[0] && demographics[0].any_indicator_suppressed}
<Alert status="warning">
  At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this area's figures may understate the true total.
</Alert>
{/if}

## Neighbourhood stage mix

```sql stage_mix
select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 6) = '${params.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc
```

<BarChart data={stage_mix} x=stage y=n_areas title="Neighbourhoods by stage" swapXY=true/>

## Mapped places

```sql poi_mix
select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 6) = '${params.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc
```

<BarChart data={poi_mix} x=poi_category_h y=poi_count title="Mapped places by category (latest snapshot)" swapXY=true/>

## Neighbourhoods (Planungsräume) in this Bezirksregion

```sql children
select
    area_code,
    area_name,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 6) = '${params.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by (dynamism_class_bi = 'negative') desc, dynamism_index desc
```

<DataTable data={children} rows=20 link=area_link>
    <Column id=area_name title="Neighbourhood (PLR)"/>
    <Column id=stage title="Stage"/>
    <Column id=pressure_trend title="Pressure trend"/>
</DataTable>

---

<FooterNav />
