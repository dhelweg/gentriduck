---
breadcrumb: "select bezirk_name as breadcrumb from (select '01' as bezirk_code, 'Mitte' as bezirk_name union all select '02','Friedrichshain-Kreuzberg' union all select '03','Pankow' union all select '04','Charlottenburg-Wilmersdorf' union all select '05','Spandau' union all select '06','Steglitz-Zehlendorf' union all select '07','Tempelhof-Schöneberg' union all select '08','Neukölln' union all select '09','Treptow-Köpenick' union all select '10','Marzahn-Hellersdorf' union all select '11','Lichtenberg' union all select '12','Reinickendorf') t where bezirk_code = '${params.code}'"
---

<!--
  #247 (I18-web slice 2): Bezirk (district) coarse profile page. Pairs with
  pages/berlin/area/bezirk/index.md per Evidence's templated-page pattern (index.md + [param].md),
  which is what makes this route buildable (link-crawled from that page's district table).

  Display-only: reads already-published, already-signed-off marts (mart_area_demographics, #243/
  I19-geo-signoff.md's sum-then-recompute rollup; gentrification_index and fct_poi_development at
  PLR grain, aggregated here by a plain COUNT/SUM group-by -- not a re-scored index). No new
  indicator, weight, or normalization (not on the R-C1 gated-file list) -- gated instead on the
  coarse-grain DISPLAY rules per this ticket's own "Gate" section; see
  docs/epic-i/I18-web-geo-signoff.md and docs/epic-i/I18-web-domain-signoff.md.

  Bezirk name: fixed 12-entry lookup, same one already used on /berlin/area-detail's Dropdown and
  /berlin/area/[code].md's district_info query (presentation only, not a new dim table -- Bezirk
  itself has no backing dim_area row yet, per dim_area_hierarchy.sql's header).


  #249 (I18-web-b, follow-on): adds an 'Approximate status & change' section reading the new gentriduck_marts.mart_mss_area_aggregate (thin display mart over int_mss_bzr_aggregate, B10/#120). This section's own display-fitness gate is docs/epic-i/I249-web-b-geo-signoff.md / I249-web-b-domain-signoff.md -- it does NOT extend the formula-level B10/#120 sign-off, only display fitness/wording of an already-approved research aggregation.
-->

```sql bezirk_name
select bezirk_name
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
where bezirk_code = '${params.code}'
```

<Hero compact eyebrow="Chapter 3 — The Evidence" title="{bezirk_name[0].bezirk_name} — district profile" lede="Population, composition, and neighbourhood-stage mix for this district, summed and recomputed from its constituent Planungsräume — never a re-scored index at this grain." />

[All districts](/berlin/area/bezirk) · [full neighbourhood list](/berlin/area) ·
[district browse](/berlin/area-detail)

<Alert status="info">
  Figures on this page are <b>sums and population-weighted averages</b> of this district's
  neighbourhoods (Planungsräume) — never a separately re-scored index. See the
  <a href="/methodology">methodology page</a> for why coarse-grain areas are not re-scored, and
  <a href="/berlin/area/[code]">any neighbourhood's own page</a> for the actual gentrification
  index and trajectory.
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
where city_code = 'BER' and area_level = 'bezirk' and area_code = '${params.code}'
order by reference_year desc
limit 1
```

<BigValue data={demographics} value=residents_total title="Residents (latest EWR year)" fmt="num0" emptySet="warn"/>
<BigValue data={demographics} value=n_plr title="Constituent neighbourhoods (Planungsräume)" emptySet="warn"/>
<BigValue data={demographics} value=mean_age_years title="Mean age (years)" fmt="num1" emptySet="warn"/>

{#if demographics && demographics[0] && demographics[0].any_indicator_suppressed}
<Alert status="warning">
  At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this district's figures may understate the true total.
</Alert>
{/if}

```sql age_mix
with latest as (
    select age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share, age_65plus_share
    from gentriduck_marts.mart_area_demographics
    where city_code = 'BER' and area_level = 'bezirk' and area_code = '${params.code}'
    order by reference_year desc
    limit 1
)
select 'Under 18' as age_band, age_under18_share as share, 1 as sort_order from latest
union all
select '18–27', age_18_27_share, 2 from latest
union all
select '27–45', age_27_45_share, 3 from latest
union all
select '45–65', age_45_65_share, 4 from latest
union all
select '65+', age_65plus_share, 5 from latest
order by sort_order
```

<BarChart data={age_mix} x=age_band y=share title="Age structure, {bezirk_name[0].bezirk_name}" yFmt="pct0"/>

## Approximate status & change (district-level estimate)

<Alert status="info">
  This is an <b>approximation</b>, not the Senate's own district classification. It is a
  population-weighted average of this district's neighbourhood-level status/Dynamik ordinals,
  rounded — the Senate's own Bezirk figures are computed by re-combining and re-classifying the
  underlying raw indicators at district grain, which can shift borderline districts into a
  different class than this estimate shows. Treat this as directional, not authoritative; see the
  <a href="/methodology">methodology page</a> for the full caveat.
</Alert>

```sql mss
select status_index, dynamik_index, typology_stage, n_plr, reference_year
from gentriduck_marts.mart_mss_area_aggregate
where city_code = 'BER' and area_level = 'bezirk' and area_vintage = 'lor_2021'
  and area_code = '${params.code}'
order by reference_year desc
limit 1
```

{#if mss && mss[0]}
<BigValue data={mss} value=typology_stage title="Estimated stage (district-level)"/>
<BigValue data={mss} value=status_index title="Estimated status index (1=lower, 4=higher)"/>
<BigValue data={mss} value=dynamik_index title="Estimated Dynamik index (1=rising pressure, 3=stable)"/>
{:else}
<Alert status="warning">No district-level status/Dynamik estimate available for this district.</Alert>
{/if}

## Neighbourhood stage mix

Every neighbourhood (Planungsraum) in this district, grouped by its current gentrification stage
— a **count**, not a re-scored district-level index. See the
[methodology page](/methodology) for what each stage means.

```sql stage_mix
select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 2) = '${params.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc
```

<BarChart data={stage_mix} x=stage y=n_areas title="Neighbourhoods by stage, {bezirk_name[0].bezirk_name}" swapXY=true/>

## Mapped places

```sql poi_mix
select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 2) = '${params.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc
```

<BarChart data={poi_mix} x=poi_category_h y=poi_count title="Mapped places by category (latest snapshot), {bezirk_name[0].bezirk_name}" swapXY=true/>

## Prognoseräume in this district

```sql children
select
    d.area_code,
    coalesce(g.area_name, d.area_code) as area_name,
    d.residents_total,
    '/berlin/area/pgr/' || d.area_code as pgr_link
from gentriduck_marts.mart_area_demographics as d
left join gentriduck_marts.dim_area_geometry as g
  on g.city_code = 'BER' and g.area_level = 'pgr' and g.area_code = d.area_code
where d.city_code = 'BER' and d.area_level = 'pgr'
  and substr(d.area_code, 1, 2) = '${params.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'pgr'
  )
order by d.residents_total desc nulls last
```

<DataTable data={children} rows=20 link=pgr_link>
    <Column id=area_name title="Prognoseraum"/>
    <Column id=residents_total title="Residents" fmt="num0"/>
</DataTable>

---

<FooterNav />
