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

<!-- #255: guard on the VALUE (`bezirk_name[0]?.bezirk_code`), keep a static-prefix href inside a
     one-line `{#if}` written as explicit `<p>` HTML -- see pages/berlin/area/[code].md's Up-link
     comment for the full "undefined"-cascade + base-path rationale. -->
<p>Up: {#if bezirk_name[0]?.bezirk_code}<a href="/berlin/area/bezirk/{bezirk_name[0].bezirk_code}">{bezirk_name[0].bezirk_name}</a>{:else}<a href="/berlin/area/bezirk">District profile</a>{/if} · <a href="/berlin/area/bezirk">all districts</a> · <a href="/berlin/area">full neighbourhood list</a></p>

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

<!--
  #299 (I21-e): "Amenities & everyday infrastructure" backfill at PGR grain. Display-only -- same
  port as the identical section added to pages/berlin/area/bzr/[code].md in this same ticket; see
  that file's header comment for the full rationale (mart_area_amenities already rolls up to
  bzr/pgr/bezirk grain, so this is "same reads, just applied at more levels," no new aggregation
  logic per docs/epic-i/I21-ia-restructure-scoping.md §5.4). Gate: web-engineer-reviewer only.
-->

## Amenities & everyday infrastructure

```sql amenities_current
select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    dominant_cuisine, dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'pgr' and area_code = '${params.code}'
order by snapshot_year desc
limit 1
```

```sql amenities_table
-- One row per infrastructure fact: this Prognoseraum vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'pgr' and area_code = '${params.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'pgr' and area_code = '${params.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${params.code}', 1, 2)
            and snapshot_year = (select snapshot_year from latest)
    )
select 1 as sort_order, 'Schools' as indicator, cast(a.n_schools as varchar) as area_value, cast(d.n_schools as varchar) as district_value
from area_row as a cross join district_row as d
union all
select 2, 'Kindergartens', cast(a.n_kindergartens as varchar), cast(d.n_kindergartens as varchar)
from area_row as a cross join district_row as d
union all
select 3, 'Doctors', cast(a.n_doctors as varchar), cast(d.n_doctors as varchar)
from area_row as a cross join district_row as d
union all
select 4, 'Dentists', cast(a.n_dentists as varchar), cast(d.n_dentists as varchar)
from area_row as a cross join district_row as d
union all
select 5, 'Pharmacies', cast(a.n_pharmacies as varchar), cast(d.n_pharmacies as varchar)
from area_row as a cross join district_row as d
union all
select 6, 'Supermarkets', cast(a.n_supermarkets as varchar), cast(d.n_supermarkets as varchar)
from area_row as a cross join district_row as d
union all
select 7, 'Playgrounds', cast(a.n_playgrounds as varchar), cast(d.n_playgrounds as varchar)
from area_row as a cross join district_row as d
union all
select 8, 'Transit stops', cast(a.n_transit_stops as varchar), cast(d.n_transit_stops as varchar)
from area_row as a cross join district_row as d
order by sort_order
```

<p>
{#if amenities_current[0]}
Based on OpenStreetMap tagging as of <b>{amenities_current[0].snapshot_year}</b>, this Prognoseraum
has the everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.
{:else}
No amenity data is available for this area yet.
{/if}
</p>

<DataTable data={amenities_table} rows=8 emptySet="warn" emptyMessage="No amenity data for this area.">
    <Column id=indicator title="Infrastructure"/>
    <Column id=area_value title="This Prognoseraum"/>
    <Column id=district_value title="District total"/>
</DataTable>

<Alert status="info">
  These figures come from OpenStreetMap tagging, not an official registry. A <b>0</b> may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the <a href="/open-data">open-data</a> page for
  more on this project's data-completeness caveats generally.
</Alert>

<p>
{#if amenities_current[0] && amenities_current[0].gastro_poi_with_cuisine_count >= 8 && amenities_current[0].dominant_cuisine_share >= 0.15}
Among <b>{amenities_current[0].gastro_poi_with_cuisine_count}</b> restaurants/cafes with cuisine
data tagged in this Prognoseraum, the <b>most common cuisine</b> is
<b>{amenities_current[0].dominant_cuisine}</b>
({Math.round(amenities_current[0].dominant_cuisine_share * 100)}% of tagged gastronomy POIs).
{:else}
There isn't enough tagged cuisine data in this Prognoseraum yet to identify a most-common cuisine
(OpenStreetMap tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).
{/if}
</p>

<p>
This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.
</p>

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
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  and d.area_code is not null and trim(d.area_code) <> ''
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
