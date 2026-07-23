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


  #249 (I18-web-b, follow-on): adds an 'Approximate status & change' section reading the new gentriduck_marts.mart_mss_area_aggregate (thin display mart over int_mss_bzr_aggregate, B10/#120). This section's own display-fitness gate is docs/epic-i/I249-web-b-geo-signoff.md / I249-web-b-domain-signoff.md -- it does NOT extend the formula-level B10/#120 sign-off, only display fitness/wording of an already-approved research aggregation.
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
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  -- (dim_area_geometry.area_code has no nulls today; this belt-and-suspenders check just makes
  -- sure a future regression there can't feed a null into pgr_link / the Up-link below.)
  and area_code is not null and trim(area_code) <> ''
limit 1
```

<Hero compact eyebrow="Chapter 3 — The Evidence" title="{bzr_name[0] && bzr_name[0].area_name} — Bezirksregion profile" lede="Population, composition, and neighbourhood-stage mix for this Bezirksregion, summed and recomputed from its constituent Planungsräume — never a re-scored index at this grain." />

<!-- #255: guard on the VALUE (`pgr_name[0]?.area_code`), keep a static-prefix href inside a
     one-line `{#if}` written as explicit `<p>` HTML -- see pages/berlin/area/[code].md's Up-link
     comment for the full "undefined"-cascade + base-path rationale. -->
<p>Up: {#if pgr_name[0]?.area_code}<a href="/berlin/area/pgr/{pgr_name[0].area_code}">{pgr_name[0].area_name}</a>{:else}<a href="/berlin/area/bezirk">Prognoseraum profile</a>{/if} · <a href="/berlin/area/bezirk">all districts</a> · <a href="/berlin/area">full neighbourhood list</a></p>

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

<!--
  #299 (I21-e): "Amenities & everyday infrastructure" backfill at BZR grain. Display-only --
  ports the SAME query already reading gentriduck_marts.mart_area_amenities on
  pages/berlin/area/[code].md's "Amenities & everyday infrastructure" section, changed only in
  which area_level/area_code the "area" row selects (bzr / this page's ${params.code} instead of
  plr / the PLR page's code) -- the "district" comparison row is the EXACT SAME area_level='bezirk'
  read the PLR page already uses (mart_area_amenities already rolls up to bzr/pgr/bezirk grain --
  schema.yml's mart_area_amenities.area_level accepted_values -- so this is "same reads, just
  applied at more levels," no new aggregation logic/SQL formula per docs/epic-i/
  I21-ia-restructure-scoping.md §5.4). Gate: web-engineer-reviewer only (display-only precedent
  already set, no R-C1 escalation needed for this section).

  Binding domain conditions from docs/epic-i/I20-domain-signoff.md, carried through unchanged (same
  as the PLR page's own header comment): "most common cuisine" wording only, co-equal district
  comparison (no colour/sort/highlight), no ranking/livability/investment language, completeness
  caveat rendered every time, and the >=8 count / >=0.15 share interestingness floor for the
  dominant-cuisine sentence.
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
where city_code = 'BER' and area_level = 'bzr' and area_code = '${params.code}'
order by snapshot_year desc
limit 1
```

```sql amenities_table
-- One row per infrastructure fact: this Bezirksregion vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'bzr' and area_code = '${params.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bzr' and area_code = '${params.code}'
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
Based on OpenStreetMap tagging as of <b>{amenities_current[0].snapshot_year}</b>, this Bezirksregion
has the everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.
{:else}
No amenity data is available for this area yet.
{/if}
</p>

<DataTable data={amenities_table} rows=8 emptySet="warn" emptyMessage="No amenity data for this area.">
    <Column id=indicator title="Infrastructure"/>
    <Column id=area_value title="This Bezirksregion"/>
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
data tagged in this Bezirksregion, the <b>most common cuisine</b> is
<b>{amenities_current[0].dominant_cuisine}</b>
({Math.round(amenities_current[0].dominant_cuisine_share * 100)}% of tagged gastronomy POIs).
{:else}
There isn't enough tagged cuisine data in this Bezirksregion yet to identify a most-common cuisine
(OpenStreetMap tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).
{/if}
</p>

<p>
This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.
</p>

## Approximate status & change (Bezirksregion-level estimate)

<Alert status="info">
  This is an <b>approximation</b>, not the Senate's own Bezirksregion classification. It is a
  population-weighted average of this Bezirksregion's neighbourhood-level status/Dynamik ordinals,
  rounded — the Senate's own MSS BZR figures are computed by re-combining and re-classifying the
  underlying raw indicators at BZR grain, which can shift borderline BZRs into a different class
  than this estimate shows (boundary effects are more likely to bite at this finer grain than at
  the district level). Treat this as directional, not authoritative; see the
  <a href="/methodology">methodology page</a> for the full caveat.
</Alert>

```sql mss
select status_index, dynamik_index, typology_stage, n_plr, reference_year
from gentriduck_marts.mart_mss_area_aggregate
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code = '${params.code}'
order by reference_year desc
limit 1
```

{#if mss && mss[0]}
<BigValue data={mss} value=typology_stage title="Estimated stage (BZR-level)"/>
<BigValue data={mss} value=status_index title="Estimated status index (1=lower, 4=higher)"/>
<BigValue data={mss} value=dynamik_index title="Estimated Dynamik index (1=rising pressure, 3=stable)"/>
{:else}
<Alert status="warning">No Bezirksregion-level status/Dynamik estimate available for this area.</Alert>
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
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  and area_code is not null and trim(area_code) <> ''
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
