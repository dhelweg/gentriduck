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

  #298 (I21-d): relocates the two "Live" widgets from /methodology-oa-modes §4/§5 onto this page --
  see pages/berlin/area/bezirk/[code].md's header comment for the full rationale (mechanism change,
  not a new computation; mart_poi_dominance is PLR-grain only, so its section here lists this BZR's
  own constituent PLRs, substr(area_code,1,6)-filtered, not a re-derived BZR-level dominance figure).
  BZR-specific difference: `area_level_publish_tier` for bzr is 'headline' (this project's
  recommended public headline scale for anything coarser than a single neighbourhood, OA-D0 domain
  sign-off Condition D) -- worded/de-emphasized less than the Bezirk/PGR pages' 'context_only'
  framing, but `maup_caveat_required` is still always TRUE relative to PLR and still rendered as an
  always-visible Alert, never hover-only.
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


<!--
  I21-f (#300): "Social status & trajectory" section, canonical §2.2 row 2 -- same pattern as
  pages/berlin/area/bezirk/[code].md's own header comment (read that file for the full rationale).

  REMOVED here (not just reworded): the previous "Approximate status & change (Bezirksregion-level
  estimate)" section, which rendered `mart_mss_area_aggregate`'s population-weighted-mean-of-ordinals
  `typology_stage`/`status_index`/`dynamik_index` as three single BigValues for this Bezirksregion.
  That section's own domain approval (I249-web-b-domain-signoff.md, 2026-07-12) pre-dates this
  project's own I-coarse-index ticket (#267, 2026-07-17), which directly asked "is a single coarse-
  grain gentrification-index VALUE defensible at Bezirk/PGR/BZR grain at all" and answered DECLINE on
  both lanes -- explicitly naming BZR, not just Bezirk/PGR (docs/epic-i/I-coarse-index-geo-decision.md,
  docs/epic-i/I-coarse-index-domain-decision.md). That later, more specific ruling supersedes the
  section's earlier approval. Flagged for a domain-expert spot-check before merge (see this ticket's
  final report).
-->

## Social status & trajectory

Every neighbourhood (Planungsraum) in this Bezirksregion is individually classified into one of six
gentrification stages (see [methodology](/methodology)). This page reports the **distribution** of
those neighbourhood-level stages — never a single re-scored index value for the Bezirksregion
itself, since averaging ordinal stage codes across such different neighbourhoods would mask exactly
the neighbourhood-to-neighbourhood heterogeneity gentrification tracking depends on (see "Honest
caveats" below).

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
          and substr(area_code, 1, 6) = '${params.code}'
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
        return `<b>${nAdvanced}</b> of <b>${nTotal}</b> neighbourhoods (Planungsräume) here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${majorityClause} — a distribution across this Bezirksregion's own neighbourhoods, never a single re-scored gentrification-index value for the Bezirksregion itself.`;
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
  and substr(area_code, 1, 6) = '${params.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc
```

<BarChart data={poi_mix} x=poi_category_h y=poi_count title="Mapped places by category (latest snapshot)" swapXY=true/>


### Offering Advantage across the area hierarchy

<Alert status="info">
  <b>Bezirksregion (BZR) is this project's recommended public headline scale</b> for anything
  coarser than a single neighbourhood — stabler than a single Kiez (PLR), and less individually
  identifying, while still keeping meaningfully more resolution than a whole district. See the
  <a href="/methodology-oa-modes">Offering Advantage decoder</a> for the full "dial, not a ladder"
  framing.
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
where area_level = 'bzr' and area_code = '${params.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bzr' and area_code = '${params.code}'
  )
order by oa_domain desc
```

{#if oa_arealevel[0] && oa_arealevel[0].maup_caveat_required}
<Alert status="warning">
  <b>MAUP fragility disclosure (always shown at this grain).</b> PLR-vs-BZR rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this Bezirksregion's apparent rank in a domain can
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
    emptyMessage="No Offering Advantage data for this Bezirksregion."
/>
{:else}
<Alert status="warning">No Offering Advantage data for this Bezirksregion.</Alert>
{/if}

{#if oa_arealevel.some((r) => r.oa_domain_min_base_flag)}
<Alert status="info">
  Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at BZR grain, since coarser levels pool far more POIs per area than a single
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
  and substr(area_code, 1, 6) = '${params.code}'
```

<Alert status="info">
  <b>{dom_suppressed_count[0] ? dom_suppressed_count[0].n_suppressed : 0} of {dom_suppressed_count[0] ? (dom_suppressed_count[0].n_suppressed + dom_suppressed_count[0].n_shown) : 0} neighbourhoods here are suppressed below as too thinly observed to characterize</b> — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."
</Alert>

```sql dominance_children
-- This Bezirksregion's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no BZR-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,6) prefix filter this page already uses for every other
-- children query -- a filter, not a new aggregation.
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
    and substr(d.area_code, 1, 6) = '${params.code}'
order by d.hhi desc
limit 15
```

<DataTable data={dominance_children} rows=15 link=area_link emptySet="warn" emptyMessage="No non-suppressed neighbourhoods for this group/year in this Bezirksregion.">
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


## Where this area sits

### Neighbourhoods (Planungsräume) in this Bezirksregion

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

## Honest caveats

- **This page never shows a single re-scored gentrification-index value for this Bezirksregion** —
  only the distribution of its constituent neighbourhoods' (Planungsräume) own stages. A population-
  weighted average of ordinal stage/Dynamik classes would violate this project's own "never average
  ordinal class codes" rule and would describe no actual neighbourhood while masking exactly the
  frontier heterogeneity gentrification tracking depends on (see
  `docs/epic-i/I-coarse-index-geo-decision.md` / `docs/epic-i/I-coarse-index-domain-decision.md`,
  both **decline** the coarse-grain point value).
- **Offering Advantage and within-group dominance figures on this page describe the whole pooled
  Bezirksregion, not any one neighbourhood inside it** — see the MAUP fragility disclosure above, and
  the [Offering Advantage decoder](/methodology-oa-modes) before comparing areas.
- Figures on this page are **sums and population-weighted averages** of this Bezirksregion's
  neighbourhoods, never observed at the Bezirksregion level itself. Land value and estimated rent
  are only published at the individual-neighbourhood grain — see any neighbourhood's own page
  (linked above) for those figures.
- See [methodology & data sources §6](/methodology) for the full list of project-wide limitations
  (ecological fallacy, no displacement measurement, OSM completeness bias, and more).

## Further reading

See [methodology & data sources](/methodology) for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, [browse by district](/berlin/area-detail)
for other areas, or drill into any of this Bezirksregion's own neighbourhoods above for the full
profile, index, and trajectory.


---

<FooterNav />
