---
breadcrumb: "select area_name as breadcrumb from gentriduck_marts.dim_area_geometry where city_code = 'BER' and area_level = 'pgr' and area_code = '${params.code}' limit 1"
---

<!--
  #247 (I18-web slice 2): Prognoseraum (PGR) coarse profile page. Discovered/crawled via each
  Bezirk page's "Prognoseräume in this district" child table
  (pages/berlin/area/bezirk/[code].md) -- no separate index.md needed at this level (Evidence
  crawls any real server-rendered link, per the established precedent in
  pages/berlin/area/[code].md's header comment).

  Same display-only / non-methodology-bearing framing as the Bezirk page (see that file's header
  comment) -- reads mart_area_demographics (#243, I19-geo-signoff.md), gentrification_index and
  fct_poi_development at PLR grain via a plain COUNT/SUM group-by. Gate:
  docs/epic-i/I18-web-geo-signoff.md / I18-web-domain-signoff.md.
-->

```sql pgr_name
select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = '${params.code}'
limit 1
```

```sql bezirk_name
select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
from (
    select '01' as bezirk_code, 'Mitte' as bezirk_name
    union all select '02', 'Friedrichshain-Kreuzberg'
    union all select '03', 'Pankow'
    union all select '04', 'Charlottenburg-Wilmersdorf'
    union all select '05', 'Spandau'
    union all select '06', 'Steglitz-Zehlendorf'
    union all select '07', 'Tempelhof-Schöneberg'
    union all select '08', 'Neukölln'
    union all select '09', 'Treptow-Köpenick'
    union all select '10', 'Marzahn-Hellersdorf'
    union all select '11', 'Lichtenberg'
    union all select '12', 'Reinickendorf'
) t
where bezirk_code = substr('${params.code}', 1, 2)
```

<Hero compact eyebrow="Chapter 3 — The Evidence" title="{pgr_name[0] && pgr_name[0].area_name} — Prognoseraum profile" lede="Population, composition, and neighbourhood-stage mix for this Prognoseraum, summed and recomputed from its constituent Bezirksregionen — never a re-scored index at this grain." />

Up: <a href="/berlin/area/bezirk/{bezirk_name[0] && bezirk_name[0].bezirk_code}">{bezirk_name[0] && bezirk_name[0].bezirk_name}</a> ·
[all districts](/berlin/area/bezirk) · [full neighbourhood list](/berlin/area)

<Alert status="info">
  Figures on this page are <b>sums and population-weighted averages</b> of this Prognoseraum's
  neighbourhoods — never a separately re-scored index. See the
  <a href="/methodology">methodology page</a> for why coarse-grain areas are not re-scored.
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
where city_code = 'BER' and area_level = 'pgr' and area_code = '${params.code}'
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
  and substr(area_code, 1, 4) = '${params.code}'
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
  and substr(area_code, 1, 4) = '${params.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc
```

<BarChart data={poi_mix} x=poi_category_h y=poi_count title="Mapped places by category (latest snapshot)" swapXY=true/>

## Bezirksregionen in this Prognoseraum

```sql children
select
    d.area_code,
    coalesce(g.area_name, d.area_code) as area_name,
    d.residents_total,
    '/berlin/area/bzr/' || d.area_code as bzr_link
from gentriduck_marts.mart_area_demographics as d
left join gentriduck_marts.dim_area_geometry as g
  on g.city_code = 'BER' and g.area_level = 'bzr' and g.area_code = d.area_code
where d.city_code = 'BER' and d.area_level = 'bzr'
  and substr(d.area_code, 1, 4) = '${params.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'bzr'
  )
order by d.residents_total desc nulls last
```

<DataTable data={children} rows=20 link=bzr_link>
    <Column id=area_name title="Bezirksregion"/>
    <Column id=residents_total title="Residents" fmt="num0"/>
</DataTable>

---

<FooterNav />
