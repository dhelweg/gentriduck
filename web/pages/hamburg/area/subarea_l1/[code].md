---
breadcrumb: "select area_name as breadcrumb from gentriduck_marts.dim_area_geometry where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${params.code}' limit 1"
---

<!--
  I21-g (#301, parent #284/I21): Hamburg's `headline`-grain (Stadtteil / BZR-equivalent) profile
  page — the Hamburg counterpart of pages/berlin/area/bzr/[code].md, per
  docs/epic-i/I21-ia-restructure-scoping.md §2.2's `headline` row and the route shape decided in
  docs/epic-i/I21-a-route-ruling.md §2/§4 (`/hamburg/area/subarea_l1/[code]`, `subarea_l1` being
  Hamburg's own vocabulary term for the generic `headline` slot).

  Discovered/crawled via pages/hamburg/area/subarea_l1/index.md's 104-row Stadtteil table (a flat
  index, not a chained crawl from the district page — see that index page's own header comment for
  why).

  SCOPE (Track 1 of I21 §4 — structure only, no live data): same discipline as every other page in
  this scaffold — the canonical `headline` section order renders in full, but every substantive
  section shows the shared <NotYetPublished> honest-deferred state rather than a live query.
  area_name IS read from dim_area_geometry (structural — Hamburg's 104 Stadtteile are genuinely
  named in the source data), same "plumbing, not a statistic" precedent as every index page here.

  Hierarchy nav (§2.2 row 8): a `headline` grain has BOTH a parent (district) and children
  (subarea_l2 / Gebiete in this Stadtteil) — mirrors Berlin's BZR page shape. Both edges exist on
  the data layer (district -> subarea_l1 is source-provided; subarea_l2 -> subarea_l1 is the OA-D1b
  spatial crosswalk, #240, geo-DS + domain-expert PASS).

  #302 (I21-h): closes the web-layer wiring gap flagged in the previous version of this comment
  (kept in git history) — both edges are now published via the thin pass-through mart
  mart_area_hierarchy.sql (transform/models/marts/, exported by
  transform/export_serving_parquet.py, registered under
  web/sources/gentriduck_marts/mart_area_hierarchy.sql). Export/wiring only — no re-derivation of
  either edge (see mart_area_hierarchy.sql's own header for the grounding citation back to
  OA-D1b/#240). The "Up:" link and the "Gebiete in this Stadtteil" children table below now query
  that mart for real parent/child codes + names (names joined from dim_area_geometry), replacing
  the previous deferred-state Alerts.

  #317 (Hamburg trajectory web wiring): the "Social status & trajectory" section below now shows a
  real **distribution** of this Stadtteil's constituent Gebiete's own trajectory classifications --
  a one-hop join (this Stadtteil's own code as `parent_area_code`) through `mart_area_hierarchy`
  (#302, I21-h, itself a pass-through of the already-approved OA-D1b/#240 spatial crosswalk) against
  `fct_gentrification_trajectory` (Hamburg admitted #314, dual-signed-off PASS:
  docs/epic-h/314-hh-trajectory-geo-signoff.md, 314-hh-trajectory-domain-signoff.md), city_code='HH',
  area_vintage='current'. Same distribution-not-point-value discipline this file's own header
  comment already committed to (§2.2 `headline` row: never a single re-scored value at this grain
  unless a future ticket promotes it, out of scope here) -- this ticket supplies the distribution, it
  does not change that ruling. Display wiring only; every OTHER section on this page (commercial mix,
  dominance, demographics, amenities, land value/rent) stays gated, unchanged.

  BINDING (carried forward from #314's domain sign-off §5, inherited from 159-hc2-domain-signoff.md
  Q1): every rendering of this section discloses (1) a recent ~6-year window (2019-2025), not
  Hamburg's full 13-edition history, and (2) a status-only classification, never a displacement
  verdict -- both stated in the Alert immediately below this heading.
-->

```sql stadtteil_name
select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${params.code}'
limit 1
```

```sql parent_info
-- #302 (I21-h): resolved parent district, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name.
select
    h.parent_area_code as district_code,
    g.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'district' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.area_code = '${params.code}'
limit 1
```

```sql children
-- #302 (I21-h): constituent Gebiete, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name -- structural links only, no statistic (I21-i, #303, publishes real figures).
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    '/hamburg/area/' || h.area_code as gebiet_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${params.code}'
order by gebiet_name
```

<Hero compact eyebrow="Chapter 3 — The Evidence" title="{stadtteil_name[0] ? stadtteil_name[0].area_name : 'Stadtteil'}" lede="Hamburg's Stadtteil-level (Bezirksregion-equivalent) scaffold — the headline scale between district and statistisches Gebiet (I21-g, #301). Most sections are still deferred; the Up/children links (#302) and the Gebiet trajectory distribution below (#317) are real." />

<!-- #302 (I21-h): real "Up:" link, same #255-precedent value-guarded static-prefix-href pattern
     as pages/berlin/area/[code].md's own Up-link. -->
<p>Up: {#if parent_info[0]?.district_code}<a href="/hamburg/area/district/{parent_info[0].district_code}">{parent_info[0].district_name ?? 'District profile'}</a>{:else}<a href="/hamburg/area/district">District profile</a>{/if} · <a href="/hamburg/area/subarea_l1">all Stadtteile</a> · <a href="/hamburg/area/district">all districts</a></p>

[All Stadtteile](/hamburg/area/subarea_l1) · [Districts](/hamburg/area/district) ·
[Hamburg data hub](/hamburg)

<NotYetPublished pageLevel what="this Stadtteil's status, commercial mix, and demographic profile (its Gebiet-level trajectory distribution is now published below, #317)" />

## Social status & trajectory

This section shows the **distribution** of this Stadtteil's constituent Gebiete's own trajectory
classifications — never a single re-scored index value for the Stadtteil itself, unless a future
ticket promotes this grain to primary-equivalent scoring (currently out of scope; see
`docs/epic-i/I21-ia-restructure-scoping.md` §2.2's `headline` row).

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
-- #317: distribution of trajectory_type across this Stadtteil's constituent Gebiete -- a one-hop
-- join through mart_area_hierarchy (#302, I21-h) against fct_gentrification_trajectory (Hamburg
-- admitted #314), same distribution-not-point-value discipline as
-- pages/berlin/area/bzr/[code].md's own stage_mix query, applied to the newly-admitted trajectory
-- mart instead of gentrification_index's current-stage column.
select t.trajectory_type, count(*) as n_areas
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and h.parent_area_code = '${params.code}'
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
            gentriduck_marts.mart_area_hierarchy as h
            on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
        where
            t.city_code = 'HH' and t.area_vintage = 'current'
            and h.parent_area_code = '${params.code}'
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
        return `<b>${nTrending}</b> of <b>${nTotal}</b> Gebiete here show a clear <b>improving</b> or <b>declining</b> trajectory over the 2019–2025 window; ${majorityClause} — a distribution across this Stadtteil's own Gebiete, never a single re-scored value for the Stadtteil itself.`;
      })();
</script>

{#if trajTakeaway}
<p>{@html trajTakeaway}</p>
{:else}
<Alert status="warning">No Gebiet trajectory data available for this Stadtteil within the 2019–2025 window.</Alert>
{/if}

<BarChart data={trajectory_mix} x=trajectory_type y=n_areas title="Gebiete by trajectory classification, 2019–2025 ({stadtteil_name[0] ? stadtteil_name[0].area_name : 'this Stadtteil'})" swapXY=true emptySet="warn" emptyMessage="No Gebiet trajectory data for this Stadtteil."/>

## Commercial mix & Offering Advantage

<NotYetPublished what="this Stadtteil's commercial-mix breakdown and Offering Advantage roll-up" />

## Within-group dominance

<NotYetPublished what="within-group dominance figures for this Stadtteil" />

## People & structure

<NotYetPublished what="demographic sums for this Stadtteil" />

## Amenities & everyday infrastructure

<NotYetPublished what="everyday-infrastructure sums for this Stadtteil" />

## Land value & estimated rent

<NotYetPublished what="land value / estimated rent figures for this Stadtteil" />

## Where this area sits

### Gebiete in this Stadtteil

<DataTable data={children} rows=20 link=gebiet_link emptySet="warn" emptyMessage="No constituent Gebiete found for this Stadtteil.">
    <Column id=gebiet_name title="Statistisches Gebiet"/>
</DataTable>

This Stadtteil's parent district is linked above ("Up:") and this list of constituent Gebiete both
come from <code>mart_area_hierarchy</code> (#302, I21-h), a thin pass-through of
<code>dim_area_hierarchy.sql</code>'s <code>hh_l1_to_district</code> (source-provided) and
<code>hh_l2_to_l1</code> (OA-D1b/#240 spatial crosswalk, geo-DS + domain-expert PASS) edges — this
ticket publishes those already-resolved edges to the web layer without re-deciding either method.

## Honest caveats

- **This page is mostly still a structural scaffold (I21-g, #301).** Every section except "Social
  status & trajectory" (below), the "Up" link, and the "Gebiete in this Stadtteil" table shows a
  fixed deferred-state placeholder rather than a real Hamburg figure — publishing the rest of this
  page's content is a separately-gated follow-up (I21-i, #303).
- **The "Social status & trajectory" distribution above is real, not a placeholder (#317).** It
  reads Hamburg's own admitted rows in `fct_gentrification_trajectory` (#314, dual-signed-off PASS)
  — a recent **~6-year (2019–2025) window**, not full history, and a **status-only classification**,
  never a displacement verdict (see the disclosure directly above that section's chart).
- **The "Up" link and "Gebiete in this Stadtteil" table are real, not placeholders (#302, I21-h).**
  The underlying parent/child links were resolved and signed off earlier (one source-provided, one
  the OA-D1b/#240 spatial crosswalk); this ticket only publishes them to the web layer.
- See [Hamburg's data hub](/hamburg) for the full, current inventory of what is and isn't published
  for Hamburg, and [methodology & data sources §6](/methodology) for how Hamburg's data differs from
  Berlin's generally.

## Further reading

See the [Hamburg data hub](/hamburg) for what's published today, [Hamburg's map](/hamburg/maps) for
this Stadtteil's constituent areas' already-public gentrification-stage figures, or
[the area-hierarchy reference](/reference/area-hierarchy) for how Hamburg's small-area geography is
structured.

---

<FooterNav />
