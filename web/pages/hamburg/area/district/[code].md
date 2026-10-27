---
breadcrumb: "select area_name as breadcrumb from gentriduck_marts.dim_area_geometry where city_code = 'HH' and area_level = 'district' and area_code = '${params.code}' limit 1"
hide_breadcrumbs: true
---

<!--
  I21-g (#301, parent #284/I21): Hamburg's `context_only`-grain (district / Bezirk-equivalent)
  profile page — the Hamburg counterpart of pages/berlin/area/bezirk/[code].md, per
  docs/epic-i/I21-ia-restructure-scoping.md §2.2's `context_only` row and the route shape decided in
  docs/epic-i/I21-a-route-ruling.md §2/§4 (`/hamburg/area/district/[code]`, `district` being
  Hamburg's own vocabulary term for the generic `context_only` slot).

  Discovered/crawled via pages/hamburg/area/district/index.md's 7-row district table.

  SCOPE (Track 1 of I21 §4 — structure only, no live data): same discipline as
  pages/hamburg/area/[code].md — the canonical `context_only` section order renders in full, but
  every substantive section shows the shared <NotYetPublished> honest-deferred state rather than a
  live query, even for marts that hardcode-restrict to Berlin (mart_area_demographics,
  fct_gentrification_change — see docs/epic-i/I21-web-feasibility.md §5's publish-gate
  footnote) or, as of #314, admit Hamburg rows (fct_gentrification_trajectory) but have no page
  section wired to them yet: a fixed placeholder is used instead of relying on an incidental
  empty/unwired query result, so this page's honesty doesn't depend on which marts happen to be
  city-gated today (see NotYetPublished.svelte's own header comment).
  area_name IS read from dim_area_geometry (structural — Hamburg's 7 districts are genuinely named
  in the source data), the same "plumbing, not a statistic" precedent as the district index page.

  Per §2.2's `context_only` row, this grain would NEVER show a re-scored index value even once
  published (docs/epic-i/I-coarse-index-geo-decision.md / -domain-decision.md, DECLINE) — only a
  distribution + modal/heterogeneity flag, same rule Berlin's own bezirk/pgr/bzr pages already
  follow (see pages/berlin/area/bezirk/[code].md's header comment). Noted here so a future I21-i
  pass knows this page's eventual "Social status" section is a distribution, not a BigValue, even
  once real data is wired in.

  Hierarchy nav (§2.2 row 8): a `context_only` grain has children (subarea_l1 / Stadtteile in this
  district) and no parent (district is Hamburg's coarsest level) — mirrors Berlin bezirk's own
  up-link-less, children-table-only treatment. Hamburg's district -> subarea_l1 edge is
  SOURCE-PROVIDED (the WFS 'bezirk' attribute on the Stadtteil layer, passed through unmodified in
  dim_area_hierarchy.sql's `hh_l1_to_district` CTE — not a derivation, unlike the L2->L1 spatial
  crosswalk).

  #302 (I21-h): closes the web-layer wiring gap flagged in the previous version of this comment
  (kept in git history) — this edge is now published via the thin pass-through mart
  mart_area_hierarchy.sql (transform/models/marts/, exported by
  transform/export_serving_parquet.py, registered under
  web/sources/gentriduck_marts/mart_area_hierarchy.sql). Export/wiring only — no re-derivation (see
  mart_area_hierarchy.sql's own header for the grounding citation). The "Stadtteile in this
  district" table below now queries that mart for real child codes + names (names joined from
  dim_area_geometry), replacing the previous deferred-state Alert.

  #317 (Hamburg trajectory web wiring): the "Social status & trajectory" section below now shows a
  real **distribution** of this district's constituent Gebiete's own trajectory classifications --
  a two-hop join (district -> subarea_l1 -> subarea_l2) through `mart_area_hierarchy` (#302, I21-h,
  itself a pass-through of the already-approved OA-D1b/#240 crosswalk + the source-provided
  district<->Stadtteil edge) against `fct_gentrification_trajectory` (Hamburg admitted #314,
  dual-signed-off PASS: docs/epic-h/314-hh-trajectory-geo-signoff.md,
  314-hh-trajectory-domain-signoff.md), city_code='HH', area_vintage='current'. Same
  distribution-not-point-value discipline this file's own header comment already committed to above
  (§2.2 `context_only` row: never a single re-scored value at this grain) -- this ticket supplies the
  distribution, it does not change that ruling. Display wiring only; every OTHER section on this
  page (commercial mix, dominance, demographics, amenities, land value/rent) stays gated, unchanged.

  BINDING (carried forward from #314's domain sign-off §5, inherited from 159-hc2-domain-signoff.md
  Q1): every rendering of this section discloses (1) a recent ~6-year window (2019-2025), not
  Hamburg's full 13-edition history, and (2) a status-only classification, never a displacement
  verdict -- both stated in the Alert immediately below this heading.

  #353 (Hamburg-Berlin parity review): this page now follows Berlin's district profile
  (pages/berlin/area/bezirk/[code].md) section by section. Same rule as the Gebiet and Stadtteil
  pages (docs/epic-g/353-hamburg-berlin-parity-audit.md): only counts and sums of per-Gebiet
  figures already public under a sign-off.
  - Neighbourhood stage mix: a COUNT of the district's Gebiete by current stage
    (gentrification_index, the per-Gebiet stages /hamburg/maps shows, H3/#237), two hops through
    mart_area_hierarchy (district <- Stadtteil source-provided, Stadtteil <- Gebiet OA-D1b/#240).
    Same display as Berlin's I18-web stage mix, plus H3 condition 1(iv)'s "not directly
    equivalent" label.
  - Mapped places: a SUM of the Gebiete's latest-snapshot fct_poi_development counts.
  - Still not shown, with reasons on the page: Offering Advantage roll-up, within-group dominance,
    people & structure, amenities (Berlin's district pages have no amenities section either; a
    Hamburg district version would be new copy under I20 condition 5), land value & rent.
-->

```sql district_name
select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${params.code}'
limit 1
```

```sql children
-- #302 (I21-h): constituent Stadtteile, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name -- structural links only.
select
    h.area_code as stadtteil_code,
    coalesce(g.area_name, h.area_code) as stadtteil_name,
    '/hamburg/area/subarea_l1/' || h.area_code as stadtteil_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${params.code}'
    -- #334: 4 Hamburg Stadtteile are disclosure-control MERGED pairs whose area_code is itself
    -- slash-joined (e.g. "02117/118", see ingest_hamburg_ewr_stadtteil.py's docstring). They have
    -- no dim_area_geometry row (no WFS geometry for a merged pair) and no children of their own
    -- (no Gebiet has a merged code as parent_area_code), so linking to them ships a dead-end,
    -- unnamed profile page -- and the raw "/" 404s during prerender besides (an earlier version of
    -- this fix percent-encoded it, but that only fools the prerender crawler: GitHub Pages decodes
    -- the URL once before file lookup, so the encoded link still 404s for real visitors). Simplest
    -- correct fix: don't list/link them here at all.
    and h.area_code not like '%/%'
order by stadtteil_name
```

```sql stage_mix
-- #353: COUNT of this district's Gebiete by current stage -- two hops through mart_area_hierarchy
-- (see header note). Same shape as pages/berlin/area/bezirk/[code].md's stage_mix.
select
    -- Not 'uninhabited': see pages/hamburg/area/subarea_l1/[code].md's stage_mix comment.
    coalesce(gi.status_class, 'no stage on record') as stage,
    count(*) as n_areas
from gentriduck_marts.mart_area_hierarchy as g2
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = g2.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g1.parent_area_code = '${params.code}'
group by all
order by n_areas desc
```

```sql stage_mix_summary
-- Modal stage + heterogeneity flag from the SAME rows as stage_mix (Gebiete with a stage only).
with
    mix as (
        select gi.status_class as stage, count(*) as n_areas
        from gentriduck_marts.mart_area_hierarchy as g2
        join
            gentriduck_marts.mart_area_hierarchy as g1
            on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
        join
            gentriduck_marts.gentrification_index as gi
            on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
            and gi.area_code = g2.area_code
            and gi.period_yyyymm = (
                select max(period_yyyymm)
                from gentriduck_marts.gentrification_index
                where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
            )
        where
            g2.city_code = 'HH' and g2.area_level = 'subarea_l2'
            and g1.parent_area_code = '${params.code}' and gi.status_class is not null
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
    a.n_advanced
from totals as t cross join top cross join advanced as a
```

<script>
  // #308: for the drill-down mini map's geoJsonUrl/link base-path prefixing (#144 convention) --
  // see this page's "## Where this area sits" section below. Hoisted into this page's single
  // existing <script> block (Svelte allows only one instance-level <script> per component/page).
  import { base } from '$app/paths';

  // #353: breadcrumb trail + browser-tab title (see web/components/AreaBreadcrumbs.svelte).
  $: districtLabel = district_name?.[0]?.area_name ?? null;
  $: crumbs = [
    { label: 'Hamburg', href: '/hamburg' },
    { label: 'District & area profiles', href: '/hamburg/area/district' },
    { label: districtLabel ?? 'District' }
  ];
  $: pageTitle = districtLabel ? `${districtLabel} — district profile · Hamburg` : null;

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
        return `<b>${nAdvanced}</b> of <b>${nTotal}</b> Gebiete here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${majorityClause} — a distribution across this district's own Gebiete, never a single re-scored gentrification-index value for the district itself.`;
      })();

  $: trajMix = trajectory_mix_summary?.[0];
  $: trajTakeaway = (!trajMix || trajMix.n_total == null || Number(trajMix.n_total) === 0)
    ? null
    : (() => {
        const nTotal = Number(trajMix.n_total);
        const nTrending = Number(trajMix.n_trending || 0);
        const topShare = trajMix.top_type_share != null ? Number(trajMix.top_type_share) : null;
        const majorityClause = (topShare != null && topShare > 0.5)
          ? `<b>${trajMix.top_type}</b> is the only trajectory type holding a majority (${Math.round(topShare * 100)}%)`
          : 'no single trajectory type holds a majority';
        return `<b>${nTrending}</b> of <b>${nTotal}</b> Gebiete here show a clear <b>improving</b> or <b>declining</b> trajectory over the 2019–2025 window; ${majorityClause} — a distribution across this district's own Gebiete, never a single re-scored value for the district itself.`;
      })();
</script>

<AreaBreadcrumbs {crumbs} />
<PageTitle title={pageTitle} />

<Hero compact eyebrow="Chapter 3 — The Evidence" title="{district_name[0] ? district_name[0].area_name : 'District'} — district profile" lede="Neighbourhood-stage mix, trajectory mix, and commercial mix for this district, counted from its constituent statistische Gebiete — never a re-scored index at this grain." />

[All districts](/hamburg/area/district) · [all Gebiete](/hamburg/area) ·
[district browse](/hamburg/area-detail)

<Alert status="info">
  Figures on this page are <b>counts and sums</b> over this district's statistische Gebiete —
  never a separately re-scored index. See the <a href="/methodology">methodology page</a> for why
  coarse-grain areas are not re-scored, and any Gebiet's own page (via the Stadtteile listed
  further down) for its stage and trajectory.
</Alert>

## Social status & trajectory

Every statistisches Gebiet in this district is individually classified into one of six
gentrification stages from Hamburg's own Sozialmonitoring (see [methodology](/methodology)). This
page reports the **distribution** of those Gebiet-level stages — never a single re-scored index
value for the district itself (same rule as Berlin's district pages;
`docs/epic-i/I-coarse-index-geo-decision.md`). Hamburg's stages are **not directly equivalent** to
same-named Berlin stages (Hamburg's Dynamik window is 3 years, Berlin's 2;
[methodology §6](/methodology)).

{#if mssTakeaway}
<p>{@html mssTakeaway}</p>
{:else}
<Alert status="warning">No Gebiet stage data available for this district.</Alert>
{/if}

<BarChart data={stage_mix} x=stage y=n_areas title="Gebiete by current stage, {district_name[0] ? district_name[0].area_name : 'this district'}" swapXY=true emptySet="warn" emptyMessage="No Gebiet stage data for this district."/>

Which Gebiete belong to this district comes from its Stadtteile (a source-provided attribute) and,
one level down, a spatial crosswalk assigning each Gebiet to the Stadtteil that contains it
(OA-D1b, #240).

### Trajectory mix, 2019–2025

<HamburgTrajectoryNote subject="each Gebiet" />

```sql trajectory_mix
-- #317: distribution of trajectory_type across this district's constituent Gebiete -- a two-hop
-- join (district -> subarea_l1 -> subarea_l2) through mart_area_hierarchy (#302, I21-h) against
-- fct_gentrification_trajectory (Hamburg admitted #314), same distribution-not-point-value
-- discipline as pages/berlin/area/bezirk/[code].md's own stage_mix query, applied to the
-- newly-admitted trajectory mart instead of gentrification_index's current-stage column.
select t.trajectory_type, count(*) as n_areas
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as g2
    on g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g2.area_code = t.area_code
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and g1.parent_area_code = '${params.code}'
group by all
order by n_areas desc
```

```sql trajectory_mix_summary
-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
-- trajectory_mix rows above (no new query logic) -- same "N of M ... no single type holds a
-- majority" distributional takeaway pattern as Berlin's own stage_mix_summary query.
with
    mix as (
        select t.trajectory_type, count(*) as n_areas
        from gentriduck_marts.fct_gentrification_trajectory as t
        join
            gentriduck_marts.mart_area_hierarchy as g2
            on
                g2.city_code = 'HH' and g2.area_level = 'subarea_l2'
                and g2.area_code = t.area_code
        join
            gentriduck_marts.mart_area_hierarchy as g1
            on
                g1.city_code = 'HH' and g1.area_level = 'subarea_l1'
                and g1.area_code = g2.parent_area_code
        where
            t.city_code = 'HH' and t.area_vintage = 'current'
            and g1.parent_area_code = '${params.code}'
        group by all
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select trajectory_type, n_areas from mix order by n_areas desc limit 1),
    trending as (
        select coalesce(sum(n_areas), 0) as n_trending
        from mix
        where trajectory_type in ('improving', 'declining')
    )
select
    t.n_total,
    top.trajectory_type as top_type,
    top.n_areas as top_type_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_type_share,
    tr.n_trending,
    (tr.n_trending::double / nullif(t.n_total, 0)) as trending_share
from totals as t cross join top cross join trending as tr
```

{#if trajTakeaway}
<p>{@html trajTakeaway}</p>
{:else}
<Alert status="warning">No Gebiet trajectory data available for this district within the 2019–2025 window.</Alert>
{/if}

<BarChart data={trajectory_mix} x=trajectory_type y=n_areas title="Gebiete by trajectory classification, 2019–2025 ({district_name[0] ? district_name[0].area_name : 'this district'})" swapXY=true emptySet="warn" emptyMessage="No Gebiet trajectory data for this district."/>

## Commercial mix & Offering Advantage

### Mapped places

```sql poi_mix
-- #353: SUM of this district's Gebiete' latest-snapshot counts, two hops through
-- mart_area_hierarchy -- same shape as Berlin's district-page poi_mix.
select
    f.poi_category_h,
    sum(f.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as f
join
    gentriduck_marts.mart_area_hierarchy as g2
    on g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g2.area_code = f.area_code
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
where f.city_code = 'HH' and f.area_vintage = 'current'
  and g1.parent_area_code = '${params.code}'
  and f.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'HH' and area_vintage = 'current'
  )
group by all
order by poi_count desc
```

<BarChart data={poi_mix} x=poi_category_h y=poi_count title="Mapped places by category (latest snapshot), {district_name[0] ? district_name[0].area_name : 'this district'}" swapXY=true emptySet="warn" emptyMessage="No mapped places recorded for this district."/>

These are OpenStreetMap-derived counts; OSM coverage is not spatially neutral (poorer or peripheral
areas tend to be less thoroughly mapped, Haklay 2010), so a low count can be a coverage gap rather
than a real absence. See the [Hamburg POI map](/hamburg/poi-map) for the per-Gebiet picture.

### Offering Advantage across the area hierarchy

<NotYetPublished what="This district's Offering Advantage roll-up (Berlin's district pages show one per domain)">
  The roll-up is computed for Hamburg in the data layer, but the site's data source keeps only
  Berlin's rows, and the scale-sensitivity (MAUP) disclosure that must accompany a roll-up has only
  been checked for Berlin. Each Gebiet's own Offering Advantage profile is on its page.
</NotYetPublished>

## Within-group dominance

<NotYetPublished what="Within-group dominance for this district's Gebiete">
  The underlying mart carries Hamburg rows, but the site's data source deliberately restricts it to
  Berlin, and no sign-off has yet reviewed a Hamburg public view of it.
</NotYetPublished>

## People & structure

<NotYetPublished what="Population and composition sums for this district">
  Hamburg's population-register figures do exist at district level, but the Hamburg demographics
  sign-off (#313) sets conditions for a Hamburg web page of its own (wording, no ranking, how merged
  Stadtteile and missing values are explained), and that page has not been built or reviewed yet.
</NotYetPublished>

## Amenities & everyday infrastructure

<NotYetPublished what="An amenities table for the district as a whole">
  This district's totals already appear as the comparison column on each of its Stadtteil and
  Gebiet pages. Berlin's district pages have no amenities section either; a district-level version
  would be new reader-facing copy, which the amenities sign-off asks to have re-checked first.
</NotYetPublished>

## Land value & estimated rent

<NotYetPublished what="Land value and estimated rent for this district">
  Hamburg has no land-value (Bodenrichtwert) series on this site. Its rent signal is narrower in kind
  than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, at Stadtteil level,
  current state only), and its sign-off (#303) requires a Hamburg-specific methodology disclosure
  before any of it is shown publicly — that has not been done yet.
</NotYetPublished>

## Where this area sits

<!-- #308: shared per-area drill-down mini map (web/components/AreaDrilldownMap.svelte). This
     district's own polygon highlighted, its Stadtteile (the next level down) clickable -- mirrors
     pages/berlin/area/bezirk/[code].md's own drill-down mini map, city-agnostic component (ADR-0005),
     Hamburg's own `mart_area_hierarchy` edge (district <- subarea_l1, source-provided, see this
     page's own header comment) used instead of Berlin's substr()-prefix derivation. `base` is
     imported once, in this page's single existing `<script>` block above. -->

```sql minimap_areas
-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'district:' || '${params.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${params.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${params.code}'
union all
select
    'subarea_l1:' || h.area_code as feature_key,
    coalesce(g.area_name, h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${base}/hamburg/area/subarea_l1/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${params.code}'
    -- #334: see the `children` query above -- merged-pair composite codes have no geometry (so
    -- no drilldown map feature either) and no dead-end page worth linking to.
    and h.area_code not like '%/%'
order by sort_order, area_name
```

<AreaDrilldownMap
    data={minimap_areas}
    geoJsonUrl={`${base}/geo/district_subarea_l1_drilldown.geojson`}
    title="{district_name[0] ? district_name[0].area_name : 'This district'} and its Stadtteile"
/>

### Stadtteile in this district

<DataTable data={children} rows=25 link=stadtteil_link emptySet="warn" emptyMessage="No constituent Stadtteile found for this district.">
    <Column id=stadtteil_name title="Stadtteil"/>
</DataTable>

This table comes from <code>mart_area_hierarchy</code> (#302), a thin pass-through of Hamburg's
source-provided district attribute on its Stadtteil geodata — published without re-deciding it.

## Honest caveats

- **District figures are counts and sums of its Gebiete, never a re-scored index** — and this grain
  will never show a single gentrification-index value, per the same ruling that governs Berlin's
  district pages (`docs/epic-i/I-coarse-index-geo-decision.md`, DECLINE).
- **Hamburg's stages are not directly equivalent to same-named Berlin stages** — Hamburg's Dynamik
  window is 3 years, Berlin's 2 ([methodology §6](/methodology), points 1 and 4).
- **The trajectory mix describes a recent ~6-year (2019–2025) window**, not full history, and is a
  **status-only classification**, never a displacement verdict.
- **Mapped-place counts come from OpenStreetMap**, whose coverage varies by area and grew over time.
- **Some Berlin sections are not shown for Hamburg** — each with its reason in its own section
  above. See the [Hamburg data hub](/hamburg) for the full inventory and
  [methodology & data sources §6](/methodology) for how Hamburg's data differs from Berlin's.

## Further reading

See the [Hamburg data hub](/hamburg) for what's published today, [Hamburg's map](/hamburg/maps)
(switch the area level to Bezirk for this district's stage mix on the map),
[browse by district](/hamburg/area-detail) for this district's Gebiete ranked by pressure, or
[the area-hierarchy reference](/reference/area-hierarchy) for how Hamburg's small-area geography is
structured.

---

<FooterNav />
