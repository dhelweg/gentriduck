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

  #269 (I-ortsteile): adds an "Ortsteile in this district" child table, same role/pattern as the
  existing "Prognoseräume in this district" table below -- Ortsteil -> Bezirk nests EXACTLY
  (a source-provided fact, see pages/berlin/area/ortsteil/[code].md's header comment), so this is a
  plain dim_area_geometry lookup, not a crosswalk join. Gives readers a direct hierarchy path into
  the new Ortsteil profile pages from the district they already land on here.

  #298 (I21-d): relocates the two "Live" widgets from /methodology-oa-modes §4/§5 onto this page --
  display-only, per docs/epic-i/I21-ia-restructure-scoping.md §5.2/§5.3 (already-decided, ADR-0024
  D2/D3). The mechanism changes from a citywide, dropdown-driven client re-query to a build-time
  ${params.code}-scoped read (same reparametrization the web-feasibility note's §9-Q2 answer
  describes), not a new computation:
  - "Offering Advantage across the area hierarchy": this district's own already-computed
    mart_poi_oa_arealevel row(s) (area_level='bezirk'), one bar per POI domain, latest snapshot_year
    -- same `pct_vs_baseline` display transform already established on this area's own PLR pages
    (I15). `maup_caveat_required` is always TRUE at this grain (bezirk is coarser than Berlin's OA
    leaf level, plr) -- rendered as an always-visible Alert, never hover-only, per the OA-D2/D6
    binding condition. `area_level_publish_tier` for bezirk is 'context_only' -- worded/de-emphasized
    accordingly (OA-D0 domain sign-off Condition D), never presented as equivalent-weight to BZR.
  - "Within-group dominance": mart_poi_dominance is PLR-grain ONLY (no area_level column -- see its
    schema.yml grain note) -- there is no pre-computed "this district's own" dominance figure to
    relocate. Building one would mean a NEW aggregation (re-deriving HHI/entropy from summed child
    counts), which is methodology-bearing and out of this ticket's scope (flagged in the PR/issue
    write-up, not guessed at here). What IS display-only and already-computed: the existing
    PLR-grain rows for this district's own constituent neighbourhoods, filtered by the same
    substr(area_code,1,2) prefix this page already uses for every other "children" query below --
    same mechanism as the "Neighbourhood stage mix"/"Mapped places" sections, applied to
    mart_poi_dominance. `is_public_safe = true` is restated here (defence in depth -- already
    filtered at the source layer, web/sources/gentriduck_marts/mart_poi_dominance.sql) and
    `is_thin_base` rows are excluded from the ranked table, with the suppressed count disclosed
    (never silently dropped), same as the /methodology-oa-modes original.

  FINDING flagged during this ticket (fixed here, not just relocated -- a filter fix, not a
  computation change): mart_poi_dominance's own grain includes `area_vintage` and `weight_variant`
  (schema.yml) -- the /methodology-oa-modes original this section relocates from did NOT filter
  either, so its citywide top-15 table silently mixed lor_pre2021/lor_2021 boundary codes and
  standard/gaussian_500m weighting into one ranking, re-surfacing the same PLR up to 4x. Every
  dominance query in this ticket's pages pins `area_vintage = 'lor_2021' and weight_variant =
  'standard'` (the same current-boundary, unweighted convention this project uses everywhere else,
  e.g. mart_poi_oa_arealevel's own source-layer `area_vintage = 'lor_2021'` filter) -- verified
  against the exported parquet directly (duplicate area_codes dropped to zero after this filter).
  Not methodology-bearing: no value is re-derived, only which pre-computed rows are selected.
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

<!-- #326: the previous version of this Alert linked
     `<a href="/berlin/area/[code]">any neighbourhood's own page</a>` -- a literal, non-templated
     `[code]` placeholder left in as real HTML, which produced a bogus, always-identical
     `/berlin/area/[code]` crawl target (Evidence's build crawls any real `<a href>`, template
     placeholder or not). Fixed by pointing at the actual full neighbourhood list instead, the same
     safe, already-crawlable target this page already links from its own top-of-page nav.

     #326 follow-up finding: this fix (plus the matching one in
     pages/berlin/area/ortsteil/[code].md and the bare-bzr/pgr de-link in
     pages/methodology-oa-modes.md) turned out to be the WHOLE fix for every OTHER 500 named in
     #326 -- a full clean `npm run build` after these two changes reproduces zero prerender 500s for
     the bzr/[code] real codes 025007/023004/024006 and the Hamburg subarea_l1/[code] codes such as
     02509. None of those were independent bugs, and no mart/component was changed to fix them:
     - Direct DuckDB queries against every exported mart these pages read (dim_area_geometry,
       gentrification_index, mart_area_demographics, mart_poi_oa_arealevel, mart_poi_dominance,
       mart_area_hierarchy, fct_gentrification_trajectory) confirmed complete rows for every
       individually-named code above -- the failures were never a data gap.
     - The "linked from /berlin/area/02400624" report is a separate, non-bug finding: that page was
       never actually 500ing, it just links to itself via its own breadcrumb, real but benign, not a
       bug in this project's own code. Every page here declares a `breadcrumb:` frontmatter query,
       and Evidence's own `BreadCrumbs.svelte` (`@evidence-dev/core-components`) renders a crumb
       trail that includes the CURRENT page as a real, clickable `<a href>` by design (see its
       `buildCrumbs()`, which only nulls a crumb's href when the matched file-tree node isn't a
       page) -- i.e. every page on this site "links to itself" via its own breadcrumb, normally a
       harmless no-op once the URL is already in the prerender crawler's visited set.
     - The most likely (but NOT independently stack-trace-confirmed) reason the bzr/pgr real-code
       and Hamburg subarea_l1 failures clustered right around the literal-`[code]`/bare-bzr-pgr crawl
       hits (rather than being scattered): SvelteKit's default prerender concurrency is 1 (strictly
       sequential), and this site's duckdb-wasm query engine is a single instance reused across that
       sequential crawl -- a page-render throw could plausibly leave it in a bad state for whichever
       page is rendered immediately next. This is a plausible, consistent-with-the-evidence theory,
       not a confirmed root cause (out of this ticket's scope once the clean-build result was
       reproducible): no code/data defect specific to any of the individually-named pages, and all of
       them render cleanly once the two link bugs above are gone. -->

<Alert status="info">
  Figures on this page are <b>sums and population-weighted averages</b> of this district's
  neighbourhoods (Planungsräume) — never a separately re-scored index. See the
  <a href="/methodology">methodology page</a> for why coarse-grain areas are not re-scored, and any
  neighbourhood's own page in the <a href="/berlin/area">full neighbourhood list</a> for the actual
  gentrification index and trajectory.
</Alert>

<!--
  I21-f (#300): "Social status & trajectory" section, canonical §2.2 row 2. Reuses the existing
  stage_mix query verbatim (moved up from further down the page, not re-derived) and adds a
  `stage_mix_summary` query + a one-line distributional takeaway sentence, computed the same way as
  the PLR page's portrait sentences (a <script> reactive built from already-published mart columns,
  no new indicator/weight/normalization). This is the page's single above-the-fold visual + takeaway
  (§2.2's above-the-fold spec: headline + one-line takeaway + one visual, never a re-scored district
  claim stacked alongside it).

  REMOVED here (not just reworded): the previous "Approximate status & change (district-level
  estimate)" section, which rendered `mart_mss_area_aggregate`'s population-weighted-mean-of-ordinals
  `typology_stage`/`status_index`/`dynamik_index` as three single BigValues for this district. That
  section was domain-approved on its own narrow display-fitness question five days *before* this
  project's own I-coarse-index ticket (#267) directly examined "is a single coarse-grain
  gentrification-index VALUE defensible at Bezirk/PGR/BZR grain at all" and answered DECLINE on both
  the geo-DS lane (docs/epic-i/I-coarse-index-geo-decision.md: "must stay an internal MAUP diagnostic
  only... must NOT be surfaced as a headline value") and the domain lane
  (docs/epic-i/I-coarse-index-domain-decision.md: "not domain-defensible... erases the invasion-
  succession frontier heterogeneity that is the entire analytic payload"). That later, more specific
  ruling directly supersedes the section's earlier approval -- a population-weighted mean of ordinal
  stage codes rendered as "Estimated stage (district-level)" is precisely the point-value construct
  both lanes declined, regardless of the "estimated"/"approximate" hedging it carried. Per §5.1 of
  docs/epic-i/I21-ia-restructure-scoping.md (already-decided, do-not-relitigate): coarse-grain pages
  show a distribution + modal/heterogeneity flag, never a single re-scored stage/status claim for the
  area itself. `mart_mss_area_aggregate`/`int_mss_bzr_aggregate` are untouched by this change (still
  valid as an internal MAUP diagnostic per B10/#120) -- only this page's public rendering of them is
  removed. Flagged for a domain-expert spot-check before merge given this reverses a previously-
  shipped, previously-approved section (see this ticket's own final report).
-->

## Social status & trajectory

Every neighbourhood (Planungsraum) in this district is individually classified into one of six
gentrification stages (see [methodology](/methodology)). This district's own page reports the
**distribution** of those neighbourhood-level stages — never a single re-scored index value for the
district itself, since averaging ordinal stage codes across such different neighbourhoods would
mask exactly the neighbourhood-to-neighbourhood heterogeneity gentrification tracking depends on
(see "Honest caveats" below).

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

```sql stage_mix_summary
-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- the "N of M ... no single stage holds a majority" distributional headline §2.2 row 2
-- requires at context_only grain, in place of a re-scored point value (see header comment).
with
    mix as (
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
  // #308: for the drill-down mini map's geoJsonUrl/link base-path prefixing (#144 convention) --
  // see this page's "## Where this area sits" section below. Hoisted into this page's single
  // existing <script> block (Svelte allows only one instance-level <script> per component/page).
  import { base } from '$app/paths';

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
        return `<b>${nAdvanced}</b> of <b>${nTotal}</b> neighbourhoods (Planungsräume) here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${majorityClause} — a distribution across this district's own neighbourhoods, never a single re-scored gentrification-index value for the district itself.`;
      })();
</script>

{#if mssTakeaway}
<p>{@html mssTakeaway}</p>
{:else}
<Alert status="warning">No neighbourhood-stage data available for this district.</Alert>
{/if}

<BarChart data={stage_mix} x=stage y=n_areas title="Neighbourhoods by stage, {bezirk_name[0].bezirk_name}" swapXY=true/>

## Commercial mix & Offering Advantage

### Mapped places

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


### Offering Advantage across the area hierarchy

<Alert status="warning">
  <b>Context only — never a Kiez-level claim.</b> A district pools roughly 30–40 very different
  neighbourhoods into one number; that this district reads as "up-market" or "under-represented" in
  a domain says nothing about any one Kiez inside it. The Bezirksregionen and Prognoseräume listed
  further down this page sit closer to the neighbourhood grain — the
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
where area_level = 'bezirk' and area_code = '${params.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bezirk' and area_code = '${params.code}'
  )
order by oa_domain desc
```

{#if oa_arealevel[0] && oa_arealevel[0].maup_caveat_required}
<Alert status="warning">
  <b>MAUP fragility disclosure (always shown at this grain).</b> PLR-vs-Bezirk rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this district's apparent rank in a domain can genuinely
  shift depending on the spatial scale read. See the
  <a href="/methodology-oa-modes">Offering Advantage decoder</a> §4/§7 for the full finding.
</Alert>
{/if}

{#if oa_arealevel.length > 0}
<BarChart
    data={oa_arealevel}
    x=poi_domain_h
    y=pct_vs_baseline
    title="{bezirk_name[0].bezirk_name} — Offering Advantage vs. Berlin average, by domain"
    yAxisTitle="% vs. citywide average"
    swapXY=true
    emptySet="warn"
    emptyMessage="No Offering Advantage data for this district."
/>
{:else}
<Alert status="warning">No Offering Advantage data for this district.</Alert>
{/if}

{#if oa_arealevel.some((r) => r.oa_domain_min_base_flag)}
<Alert status="info">
  Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at district grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.
</Alert>
{/if}

Values shown are the canonical nested location quotient, summed up from constituent
neighbourhoods' counts and re-computed at this grain (never averaged — ADR-0024 D2) — the same
already-published figure this project publishes, not a new statistic. See the
[Offering Advantage decoder](/methodology-oa-modes) for the other eight calculation methods and the
full roll-up rule, or [this district's neighbourhoods](/berlin/area) for the canonical PLR-grain
figure.


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
-- Disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same discipline as the
-- /methodology-oa-modes original this table relocates from.
select
    count(*) filter (where is_thin_base) as n_suppressed,
    count(*) filter (where not is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance
where city_code = 'BER'
  and is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see this page's header comment (#298 finding).
  and area_vintage = 'lor_2021'
  and weight_variant = 'standard'
  and dominance_group = '${inputs.dom_group.value}'
  and snapshot_year = ${inputs.dom_year.value}
  and substr(area_code, 1, 2) = '${params.code}'
```

<Alert status="info">
  <b>{dom_suppressed_count[0] ? dom_suppressed_count[0].n_suppressed : 0} of {dom_suppressed_count[0] ? (dom_suppressed_count[0].n_suppressed + dom_suppressed_count[0].n_shown) : 0} neighbourhoods here are suppressed below as too thinly observed to characterize</b> — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."
</Alert>

```sql dominance_children
-- This district's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no district-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,2) prefix filter this page already uses for every other
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
    -- Defence-in-depth restatement of the source-layer filter (mart_poi_dominance.sql already
    -- filters is_public_safe = true and city_code = 'BER') -- same pattern as the
    -- /methodology-oa-modes original this table relocates from.
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see this page's header comment) -- without
    -- this, the same PLR resurfaces once per boundary vintage x weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${inputs.dom_group.value}'
    and d.snapshot_year = ${inputs.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 2) = '${params.code}'
order by d.hhi desc
limit 15
```

<DataTable data={dominance_children} rows=15 link=area_link emptySet="warn" emptyMessage="No non-suppressed neighbourhoods for this group/year in this district.">
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

## Where this area sits

<!--
  #308: shared per-area drill-down mini map (web/components/AreaDrilldownMap.svelte). This
  district's own polygon highlighted, its Prognoseräume (the primary LOR-ladder next level down,
  matching this page's "Up:"/breadcrumb chain and the "Prognoseräume in this district" table right
  below) each clickable. Ortsteile are a SEPARATE, non-nesting geography (see the "Ortsteile in this
  district" table further down and its own explanatory paragraph) -- deliberately not drawn on this
  same map alongside the PGR children, to keep one map to one "drill down exactly one level"
  affordance per the issue spec; Ortsteil already has its own browsable table/index on this page.
  `base` is imported once, in this page's single existing `<script>` block above (Svelte allows
  only one instance-level `<script>` per component/page).
-->

```sql minimap_areas
-- Self row's name resolved via the same fixed 12-entry lookup as this page's own `bezirk_name`
-- query above, re-expressed in SQL only (not a JS-templated string literal) so this query's SQL
-- syntax can never depend on the contents of an external name value -- same defensive reasoning
-- applied throughout this section for the WFS-sourced PGR/BZR/Ortsteil/Hamburg names.
select
    'bezirk:' || '${params.code}' as feature_key,
    bezirk_name as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
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
union all
select
    'pgr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${base}/berlin/area/pgr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${params.code}'
order by sort_order, area_name
```

<AreaDrilldownMap
    data={minimap_areas}
    geoJsonUrl={`${base}/geo/bezirk_pgr_drilldown.geojson`}
    title="{bezirk_name[0] ? bezirk_name[0].bezirk_name : 'This district'} and its Prognoseräume"
/>

### Prognoseräume in this district

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
  -- #255: defensive guard so a null/blank area_code (from mart_area_demographics; none exist
  -- today, but this belt-and-suspenders check keeps a future regression there from ever
  -- surfacing as a crawlable /berlin/area/pgr/undefined route) never reaches pgr_link.
  and d.area_code is not null and trim(d.area_code) <> ''
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


### Ortsteile in this district

Ortsteil (Stadtteil) is a different, non-LOR district subdivision (it does not nest into the
Prognoseraum/Bezirksregion/Planungsraum ladder above) — see the
[Ortsteil profile page](/berlin/area/ortsteil) for how its own neighbourhood rollup is built.

```sql ortsteile
select
    area_code,
    area_name,
    '/berlin/area/ortsteil/' || area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil'
  -- #255-style defensive guard, see the matching comment above this page's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${params.code}'
order by area_name
```

<DataTable data={ortsteile} rows=20 link=ortsteil_link>
    <Column id=area_name title="Ortsteil"/>
</DataTable>

## Honest caveats

- **This page never shows a single re-scored gentrification-index value for this district** — only
  the distribution of its constituent neighbourhoods' (Planungsräume) own stages. A population-
  weighted average of ordinal stage/Dynamik classes would violate this project's own "never average
  ordinal class codes" rule and would describe no actual neighbourhood while masking exactly the
  frontier heterogeneity gentrification tracking depends on (see
  `docs/epic-i/I-coarse-index-geo-decision.md` / `docs/epic-i/I-coarse-index-domain-decision.md`,
  both **decline** the coarse-grain point value).
- **Offering Advantage and within-group dominance figures on this page describe the whole pooled
  district, not any one neighbourhood inside it** — see the MAUP fragility disclosure above, and the
  [Offering Advantage decoder](/methodology-oa-modes) before comparing districts.
- Figures on this page are **sums and population-weighted averages** of this district's
  neighbourhoods, never observed at the district level itself. Land value and estimated rent are
  only published at the individual-neighbourhood grain — see any neighbourhood's own page (linked
  above) for those figures.
- See [methodology & data sources §6](/methodology) for the full list of project-wide limitations
  (ecological fallacy, no displacement measurement, OSM completeness bias, and more).

## Further reading

See [methodology & data sources](/methodology) for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, [browse by district](/berlin/area-detail)
for other districts, or drill into any of this district's own neighbourhoods above for the full
profile, index, and trajectory.


---

<FooterNav />
