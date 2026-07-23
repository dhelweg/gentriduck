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

  #298 (I21-d): relocates the two "Live" widgets from /methodology-oa-modes §4/§5 onto this page --
  see pages/berlin/area/bezirk/[code].md's header comment for the full rationale. PGR-specific
  difference: `area_level_publish_tier` for pgr is 'context_only' (same de-emphasized framing as
  Bezirk); this PGR's own constituent PLRs for the dominance section are two hierarchy rungs down
  (PGR -> BZR -> PLR), so the filter is substr(area_code,1,4) against the PLR-grain mart directly --
  same pattern this page's own existing stage_mix/poi_mix queries already use, not a new join path.
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


<!--
  I21-f (#300): "Social status & trajectory" section, canonical §2.2 row 2 -- same pattern as
  pages/berlin/area/bezirk/[code].md's own header comment (read that file for the full rationale on
  why this project reports a distribution + modal/heterogeneity flag here, never a single re-scored
  index value). This page never had an "Approximate status & change" MSS section to remove (PGR grain
  was never wired to mart_mss_area_aggregate) -- included here only for canonical-order consistency
  with the sibling Bezirk/BZR pages.
-->

## Social status & trajectory

Every neighbourhood (Planungsraum) in this Prognoseraum is individually classified into one of six
gentrification stages (see [methodology](/methodology)). This page reports the **distribution** of
those neighbourhood-level stages — never a single re-scored index value for the Prognoseraum itself,
since averaging ordinal stage codes across such different neighbourhoods would mask exactly the
neighbourhood-to-neighbourhood heterogeneity gentrification tracking depends on (see "Honest
caveats" below).

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

```sql stage_mix_summary
-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
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
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select stage, n_areas from mix order by n_areas desc limit 1),
    advanced as (
        select coalesce(sum(n_areas), 0) as n_advanced
        from mix
        where stage in ('active-gentrification', 'pioneer-signal')
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a
```

<script>
  $: mssMix = stage_mix_summary?.[0];
  $: mssTakeaway = (!mssMix || mssMix.n_total == null || Number(mssMix.n_total) === 0)
    ? null
    : (() => {
        const nTotal = Number(mssMix.n_total);
        const nAdvanced = Number(mssMix.n_advanced || 0);
        const topShare = mssMix.top_stage_share != null ? Number(mssMix.top_stage_share) : null;
        const majorityClause = (topShare != null && topShare > 0.5)
          ? `<b>${mssMix.top_stage}</b> is the only stage holding a majority (${Math.round(topShare * 100)}%)`
          : 'no single stage holds a majority';
        return `<b>${nAdvanced}</b> of <b>${nTotal}</b> neighbourhoods (Planungsräume) here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${majorityClause} — a distribution across this Prognoseraum's own neighbourhoods, never a single re-scored gentrification-index value for the Prognoseraum itself.`;
      })();
</script>

{#if mssTakeaway}
<p>{@html mssTakeaway}</p>
{:else}
<Alert status="warning">No neighbourhood-stage data available for this area.</Alert>
{/if}

<BarChart data={stage_mix} x=stage y=n_areas title="Neighbourhoods by stage" swapXY=true/>

## Commercial mix & Offering Advantage

### Mapped places

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


### Offering Advantage across the area hierarchy

<Alert status="warning">
  <b>Context only — never a Kiez-level claim.</b> A Prognoseraum pools several very different
  neighbourhoods into one number; that this area reads as "up-market" or "under-represented" in a
  domain says nothing about any one Kiez inside it. The Bezirksregionen listed further down this
  page sit closer to the neighbourhood grain — the
  <a href="/methodology-oa-modes">Offering Advantage decoder</a> recommends Bezirksregion (BZR) as
  this project's public headline scale for anything coarser than a single neighbourhood.
</Alert>

```sql oa_arealevel
select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'pgr' and area_code = '${params.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'pgr' and area_code = '${params.code}'
  )
order by oa_domain desc
```

{#if oa_arealevel[0] && oa_arealevel[0].maup_caveat_required}
<Alert status="warning">
  <b>MAUP fragility disclosure (always shown at this grain).</b> PLR-vs-BZR rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this Prognoseraum's apparent rank in a domain can
  genuinely shift depending on the spatial scale read. See the
  <a href="/methodology-oa-modes">Offering Advantage decoder</a> §4/§7 for the full finding.
</Alert>
{/if}

{#if oa_arealevel.length > 0}
<BarChart
    data={oa_arealevel}
    x=poi_domain_h
    y=pct_vs_baseline
    title="Offering Advantage vs. Berlin average, by domain"
    yAxisTitle="% vs. citywide average"
    swapXY=true
    emptySet="warn"
    emptyMessage="No Offering Advantage data for this Prognoseraum."
/>
{:else}
<Alert status="warning">No Offering Advantage data for this Prognoseraum.</Alert>
{/if}

{#if oa_arealevel.some((r) => r.oa_domain_min_base_flag)}
<Alert status="info">
  Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at PGR grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.
</Alert>
{/if}

Values shown are the canonical nested location quotient, summed up from constituent
neighbourhoods' counts and re-computed at this grain (never averaged — ADR-0024 D2) — the same
already-published figure this project publishes, not a new statistic. See the
[Offering Advantage decoder](/methodology-oa-modes) for the other eight calculation methods and the
full roll-up rule.


## Within-group dominance

<Alert status="info">
  <b>Dominance is sign-blind</b> — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  <a href="/methodology-oa-modes">Offering Advantage decoder</a> §5 for the full ethics note.
</Alert>

<Dropdown name="dom_group" title="Business group" defaultValue="gastronomy_category">
  <DropdownOption value="gastronomy_category" valueLabel="Gastronomy (Café / Restaurant / Fast Food)"/>
  <DropdownOption value="retail_category" valueLabel="Retail (12 categories)"/>
  <DropdownOption value="entertainment_category" valueLabel="Entertainment (Bar / Nightlife / Culture / Leisure)"/>
  <DropdownOption value="wellness_curated" valueLabel="Wellness / fitness (curated cross-domain group)"/>
</Dropdown>

<Dropdown name="dom_year" title="Year" defaultValue="2025">
  <DropdownOption value="2025" valueLabel="2025"/>
  <DropdownOption value="2024" valueLabel="2024"/>
  <DropdownOption value="2023" valueLabel="2023"/>
  <DropdownOption value="2022" valueLabel="2022"/>
  <DropdownOption value="2021" valueLabel="2021"/>
  <DropdownOption value="2020" valueLabel="2020"/>
</Dropdown>

```sql dom_suppressed_count
select
    count(*) filter (where is_thin_base) as n_suppressed,
    count(*) filter (where not is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance
where city_code = 'BER'
  and is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see pages/berlin/area/bezirk/[code].md's header comment
  -- (#298 finding).
  and area_vintage = 'lor_2021'
  and weight_variant = 'standard'
  and dominance_group = '${inputs.dom_group.value}'
  and snapshot_year = ${inputs.dom_year.value}
  and substr(area_code, 1, 4) = '${params.code}'
```

<Alert status="info">
  <b>{dom_suppressed_count[0] ? dom_suppressed_count[0].n_suppressed : 0} of {dom_suppressed_count[0] ? (dom_suppressed_count[0].n_suppressed + dom_suppressed_count[0].n_shown) : 0} neighbourhoods here are suppressed below as too thinly observed to characterize</b> — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."
</Alert>

```sql dominance_children
-- This Prognoseraum's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no PGR-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,4) prefix filter this page's own stage_mix/poi_mix queries
-- already use -- a filter, not a new aggregation.
select
    d.area_code,
    coalesce(gi.area_name, d.area_code) as area_name,
    d.hhi,
    d.top_share,
    d.top_child,
    d.top_child_offering_tier,
    d.n_children,
    d.group_stock_local,
    '/berlin/area/' || d.area_code as area_link
from gentriduck_marts.mart_poi_dominance as d
left join gentriduck_marts.gentrification_index as gi
  on
    gi.area_code = d.area_code and gi.variant = 'live_data' and gi.area_level = 'plr'
    and gi.city_code = 'BER'
    and gi.period_yyyymm = (
        select max(period_yyyymm) from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr'
    )
where
    d.city_code = 'BER'
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see pages/berlin/area/bezirk/[code].md's
    -- header comment) -- without this, the same PLR resurfaces once per boundary vintage x
    -- weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${inputs.dom_group.value}'
    and d.snapshot_year = ${inputs.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 4) = '${params.code}'
order by d.hhi desc
limit 15
```

<DataTable data={dominance_children} rows=15 link=area_link emptySet="warn" emptyMessage="No non-suppressed neighbourhoods for this group/year in this Prognoseraum.">
    <Column id=area_name title="Neighbourhood (PLR)"/>
    <Column id=hhi title="HHI (higher = more concentrated)" fmt="num2"/>
    <Column id=top_share title="Top-share" fmt="pct1"/>
    <Column id=top_child title="Leading type"/>
    <Column id=n_children title="Types in this group here"/>
    <Column id=group_stock_local title="Group's total POI count here" fmt="num0"/>
</DataTable>

A high HHI/top-share here says only that a neighbourhood's mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal. Compare
against each neighbourhood's own status/dynamism trajectory before drawing any conclusion. See the
[Offering Advantage decoder](/methodology-oa-modes) for the full dominance methodology.


## People & structure

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


## Where this area sits

### Bezirksregionen in this Prognoseraum

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

## Honest caveats

- **This page never shows a single re-scored gentrification-index value for this Prognoseraum** —
  only the distribution of its constituent neighbourhoods' (Planungsräume) own stages. A population-
  weighted average of ordinal stage/Dynamik classes would violate this project's own "never average
  ordinal class codes" rule and would describe no actual neighbourhood while masking exactly the
  frontier heterogeneity gentrification tracking depends on (see
  `docs/epic-i/I-coarse-index-geo-decision.md` / `docs/epic-i/I-coarse-index-domain-decision.md`,
  both **decline** the coarse-grain point value).
- **Offering Advantage and within-group dominance figures on this page describe the whole pooled
  Prognoseraum — a district pools several very different neighbourhoods into one number.** See the
  [Offering Advantage decoder](/methodology-oa-modes) before comparing areas.
- Figures on this page are **sums and population-weighted averages** of this Prognoseraum's
  neighbourhoods, never observed at the Prognoseraum level itself. Land value and estimated rent
  are only published at the individual-neighbourhood grain — see any neighbourhood's own page
  (linked above) for those figures.
- See [methodology & data sources §6](/methodology) for the full list of project-wide limitations
  (ecological fallacy, no displacement measurement, OSM completeness bias, and more).

## Further reading

See [methodology & data sources](/methodology) for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, [browse by district](/berlin/area-detail)
for other areas, or drill into any of this Prognoseraum's own neighbourhoods above for the full
profile, index, and trajectory.


---

<FooterNav />
