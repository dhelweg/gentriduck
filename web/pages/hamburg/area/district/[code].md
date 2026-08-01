---
breadcrumb: "select area_name as breadcrumb from gentriduck_marts.dim_area_geometry where city_code = 'HH' and area_level = 'district' and area_code = '${params.code}' limit 1"
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
-- header). Joined against dim_area_geometry for the display name -- structural links only, no
-- statistic (I21-i, #303, publishes real figures).
select
    h.area_code as stadtteil_code,
    coalesce(g.area_name, h.area_code) as stadtteil_name,
    -- #334: 4 Hamburg Stadtteile are disclosure-control MERGED pairs whose area_code
    -- is itself slash-joined (e.g. "02117/118", see ingest_hamburg_ewr_stadtteil.py's docstring).
    -- A literal "/" here would split into an extra path segment and 404 during prerender --
    -- percent-encode it so it stays one route segment; subarea_l1/[code].md's params.code comes
    -- back decoded by SvelteKit's per-segment decodeURIComponent, so the query there is unaffected.
    '/hamburg/area/subarea_l1/' || replace(h.area_code, '/', '%2F') as stadtteil_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${params.code}'
order by stadtteil_name
```

<Hero compact eyebrow="Chapter 3 — The Evidence" title="{district_name[0] ? district_name[0].area_name : 'District'} — district profile" lede="Hamburg's district-level (Bezirk-equivalent) scaffold — the coarsest grain in Hamburg's area hierarchy (I21-g, #301). Most sections are still deferred; the Stadtteile table (#302) and the Gebiet trajectory distribution below (#317) are real." />

[All districts](/hamburg/area/district) · [Hamburg data hub](/hamburg)

<NotYetPublished pageLevel what="this district's population, commercial mix, and demographic sums (its Gebiet-level trajectory distribution is now published below, #317)" />

## Social status & trajectory

This section shows the **distribution** of this district's constituent Gebiete's own trajectory
classifications — never a single re-scored index value for the district itself (same rule already
governing Berlin's Bezirk/PGR/BZR pages; see [methodology](/methodology) and
`docs/epic-i/I-coarse-index-geo-decision.md`).

<Alert status="warning">
  <b>Two things to know before reading this section (#317):</b><br/>
  <b>1. Recent window, not full history.</b> These labels describe a bounded <b>~6-year window
  (2019–2025)</b> of Hamburg's own annual Sozialmonitoring panel, not the full 13-edition
  (2013–2025) series — the same cadence-normalized window already used for Berlin (H-C2, #159),
  applied here to Hamburg's annual cadence for the first time (#314). A Gebiet classified
  <b>persistently-deprived</b> or <b>stable-established</b> below reflects only the last ~6 years,
  not necessarily its full history — don't read it with the same long-run framing Berlin's own
  multi-decade biennial figures might imply.<br/>
  <b>2. Status-only, not a displacement verdict.</b> <code>stable-established</code>,
  <code>persistently-deprived</code>, <code>improving</code>, <code>declining</code>, and
  <code>mixed</code> describe how each Gebiet's <i>officially-measured social status</i> moved over
  that window — never a claim about who moved, why, or whether any resident was displaced. See
  <a href="/methodology">methodology</a> for what this classification does and doesn't claim.
</Alert>

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

<script>
  // #308: for the drill-down mini map's geoJsonUrl/link base-path prefixing (#144 convention) --
  // see this page's "## Where this area sits" section below. Hoisted into this page's single
  // existing <script> block (Svelte allows only one instance-level <script> per component/page).
  import { base } from '$app/paths';

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

{#if trajTakeaway}
<p>{@html trajTakeaway}</p>
{:else}
<Alert status="warning">No Gebiet trajectory data available for this district within the 2019–2025 window.</Alert>
{/if}

<BarChart data={trajectory_mix} x=trajectory_type y=n_areas title="Gebiete by trajectory classification, 2019–2025 ({district_name[0] ? district_name[0].area_name : 'this district'})" swapXY=true emptySet="warn" emptyMessage="No Gebiet trajectory data for this district."/>

## Commercial mix & Offering Advantage

<NotYetPublished what="this district's commercial-mix breakdown and Offering Advantage roll-up" />

## Within-group dominance

<NotYetPublished what="within-group dominance figures for this district" />

## People & structure

<NotYetPublished what="demographic sums for this district" />

## Amenities & everyday infrastructure

<NotYetPublished what="everyday-infrastructure sums for this district" />

## Land value & estimated rent

<NotYetPublished what="land value / estimated rent figures for this district" />

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
    -- see the `children` query above for why this must be percent-encoded, not concatenated raw
    '${base}/hamburg/area/subarea_l1/' || replace(h.area_code, '/', '%2F') as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${params.code}'
order by sort_order, area_name
```

<AreaDrilldownMap
    data={minimap_areas}
    geoJsonUrl={`${base}/geo/district_subarea_l1_drilldown.geojson`}
    title="{district_name[0] ? district_name[0].area_name : 'This district'} and its Stadtteile"
/>

### Stadtteile in this district

<DataTable data={children} rows=20 link=stadtteil_link emptySet="warn" emptyMessage="No constituent Stadtteile found for this district.">
    <Column id=stadtteil_name title="Stadtteil"/>
</DataTable>

This table comes from <code>mart_area_hierarchy</code> (#302, I21-h), a thin pass-through of
<code>dim_area_hierarchy.sql</code>'s <code>hh_l1_to_district</code> edge (source-provided, the
Hamburg WFS district attribute) — this ticket publishes that already-resolved edge to the web layer
without re-deciding it.

## Honest caveats

- **This page is mostly still a structural scaffold (I21-g, #301).** Every section except "Social
  status & trajectory" (below) and the "Stadtteile in this district" table shows a fixed
  deferred-state placeholder rather than a real Hamburg figure — publishing the rest of this page's
  content is a separately-gated follow-up (I21-i, #303).
- **The "Social status & trajectory" distribution above is real, not a placeholder (#317).** It
  reads Hamburg's own admitted rows in `fct_gentrification_trajectory` (#314, dual-signed-off PASS)
  — a recent **~6-year (2019–2025) window**, not full history, and a **status-only classification**,
  never a displacement verdict (see the disclosure directly above that section's chart).
- **This grain will never show a single re-scored gentrification-index value, even once fully
  published** — only a distribution of its constituent areas' own trajectory classifications, per
  the same ruling already governing Berlin's Bezirk/PGR/BZR pages
  (`docs/epic-i/I-coarse-index-geo-decision.md`, DECLINE).
- **The "Stadtteile in this district" table is real, not a placeholder (#302, I21-h).** The
  underlying parent link is source-provided and was already resolved in the data layer; this ticket
  only publishes it to the web layer.
- See [Hamburg's data hub](/hamburg) for the full, current inventory of what is and isn't published
  for Hamburg, and [methodology & data sources §6](/methodology) for how Hamburg's data differs from
  Berlin's generally.

## Further reading

See the [Hamburg data hub](/hamburg) for what's published today, [Hamburg's map](/hamburg/maps) for
this district's constituent areas' already-public gentrification-stage figures, or
[the area-hierarchy reference](/reference/area-hierarchy) for how Hamburg's small-area geography is
structured.

---

<FooterNav />
