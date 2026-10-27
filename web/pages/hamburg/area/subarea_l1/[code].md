---
breadcrumb: "select area_name as breadcrumb from gentriduck_marts.dim_area_geometry where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${params.code}' limit 1"
hide_breadcrumbs: true
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

  #353 (Hamburg-Berlin parity review): this page now follows the Berlin coarse-profile shape
  (pages/berlin/area/bzr/[code].md, pages/berlin/area/ortsteil/[code].md) section by section. Same
  rule as the Gebiet page (see pages/hamburg/area/[code].md's #353 note and
  docs/epic-g/353-hamburg-berlin-parity-audit.md): show only counts and sums of per-Gebiet figures
  that are already public under a sign-off; no averaged or re-scored Stadtteil value.
  - Neighbourhood stage mix: a COUNT of this Stadtteil's Gebiete by their current stage
    (`gentrification_index`, live_data, latest Hamburg period -- the per-Gebiet stages /hamburg/maps
    already shows, H3/#237), grouped through mart_area_hierarchy's OA-D1b/#240 edge (#302). Same
    distribution-not-point-value display as Berlin's I18-web-signed stage mix
    (docs/epic-i/I18-web-geo-signoff.md / -domain-signoff.md), plus H3 domain condition 1(iv)'s
    "not directly equivalent" label. The crosswalk-provenance note the #302 domain sign-off asks
    for sits next to it.
  - Mapped places: a SUM of the Gebiete's latest-snapshot `fct_poi_development` counts (the same
    counts /hamburg/poi-map uses), same as Berlin's coarse-page "Mapped places" bar.
  - Still not shown, each with its reason on the page: Offering Advantage roll-up (the HH rows in
    mart_poi_oa_arealevel are filtered out at the site's source layer and the roll-up's MAUP
    disclosure has not been reviewed for Hamburg), within-group dominance (source layer BER-only),
    people & structure (#313 forward conditions C-5..C-8 bind a Hamburg web slice of its own),
    land value & rent (#303 Condition 2).
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
-- display name. #353: plus each Gebiet's current stage (the same per-Gebiet row /hamburg/maps
-- shows), mirroring the stage column on Berlin's coarse-page children tables.
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
    '/hamburg/area/' || h.area_code as gebiet_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = h.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${params.code}'
order by gebiet_name
```

```sql stage_mix
-- #353: COUNT of this Stadtteil's Gebiete by current stage (see header note) -- same shape as
-- pages/berlin/area/bzr/[code].md's stage_mix, grouped through mart_area_hierarchy instead of a
-- code prefix (Hamburg codes don't nest).
select
    -- Not 'uninhabited': a Gebiet without a stage may simply be below Hamburg's own reporting
    -- threshold, so the label only says what is known (no stage on record). Cf. the #313 domain
    -- sign-off's D-7 finding about an unconditional 'uninhabited' label.
    coalesce(gi.status_class, 'no stage on record') as stage,
    count(*) as n_areas
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = h.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${params.code}'
group by all
order by n_areas desc
```

```sql stage_mix_summary
-- Modal stage + heterogeneity flag from the SAME rows as stage_mix -- Berlin's stage_mix_summary
-- pattern. Gebiete with no stage in the latest edition are excluded from the
-- total, so the sentence only counts Gebiete that actually carry a stage.
with
    mix as (
        select gi.status_class as stage, count(*) as n_areas
        from gentriduck_marts.mart_area_hierarchy as h
        join
            gentriduck_marts.gentrification_index as gi
            on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
            and gi.area_code = h.area_code
            and gi.period_yyyymm = (
                select max(period_yyyymm)
                from gentriduck_marts.gentrification_index
                where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
            )
        where
            h.city_code = 'HH' and h.area_level = 'subarea_l2'
            and h.parent_area_code = '${params.code}' and gi.status_class is not null
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
  $: stadtteilLabel = stadtteil_name?.[0]?.area_name ?? null;
  $: crumbs = [
    { label: 'Hamburg', href: '/hamburg' },
    { label: 'Stadtteile', href: '/hamburg/area/subarea_l1' },
    { label: stadtteilLabel ?? 'Stadtteil' }
  ];
  $: pageTitle = stadtteilLabel ? `${stadtteilLabel} — Stadtteil profile · Hamburg` : null;

  // #353: stage-mix takeaway -- Berlin's coarse-page mssTakeaway sentence, Gebiete instead of
  // Planungsräume.
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
        return `<b>${nAdvanced}</b> of <b>${nTotal}</b> Gebiete here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${majorityClause} — a distribution across this Stadtteil's own Gebiete, never a single re-scored gentrification-index value for the Stadtteil itself.`;
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
        return `<b>${nTrending}</b> of <b>${nTotal}</b> Gebiete here show a clear <b>improving</b> or <b>declining</b> trajectory over the 2019–2025 window; ${majorityClause} — a distribution across this Stadtteil's own Gebiete, never a single re-scored value for the Stadtteil itself.`;
      })();
</script>

<AreaBreadcrumbs {crumbs} />
<PageTitle title={pageTitle} />

<Hero compact eyebrow="Chapter 3 — The Evidence" title="{stadtteil_name[0] ? stadtteil_name[0].area_name : 'Stadtteil'} — Stadtteil profile" lede="Neighbourhood-stage mix, trajectory mix, commercial mix, and everyday amenities for this Stadtteil, counted from its constituent statistische Gebiete — never a re-scored index at this grain." />

<!-- #302 (I21-h): real "Up:" link, same #255-precedent value-guarded static-prefix-href pattern
     as pages/berlin/area/[code].md's own Up-link. #353: same shape as Berlin's Ortsteil line. -->
<p>Up: {#if parent_info[0]?.district_code}<a href="/hamburg/area/district/{parent_info[0].district_code}">{parent_info[0].district_name ?? 'District profile'}</a>{:else}<a href="/hamburg/area/district">District profile</a>{/if} · <a href="/hamburg/area/subarea_l1">all Stadtteile</a> · <a href="/hamburg/area/district">all districts</a> · <a href="/hamburg/area">all Gebiete</a></p>

<Alert status="info">
  Figures on this page are <b>counts and sums</b> over this Stadtteil's statistische Gebiete —
  never a separately re-scored index. See the <a href="/methodology">methodology page</a> for why
  coarse-grain areas are not re-scored, and any Gebiet's own page (listed further down) for its
  stage and trajectory.
</Alert>

## Social status & trajectory

Every statistisches Gebiet in this Stadtteil is individually classified into one of six
gentrification stages from Hamburg's own Sozialmonitoring (see [methodology](/methodology)). This
page reports the **distribution** of those Gebiet-level stages — never a single re-scored index
value for the Stadtteil itself. Hamburg's stages are **not directly equivalent** to same-named
Berlin stages (Hamburg's Dynamik window is 3 years, Berlin's 2; [methodology §6](/methodology)).

{#if mssTakeaway}
<p>{@html mssTakeaway}</p>
{:else}
<Alert status="warning">No Gebiet stage data available for this Stadtteil.</Alert>
{/if}

<BarChart data={stage_mix} x=stage y=n_areas title="Gebiete by current stage, {stadtteil_name[0] ? stadtteil_name[0].area_name : 'this Stadtteil'}" swapXY=true emptySet="warn" emptyMessage="No Gebiet stage data for this Stadtteil."/>

Which Gebiete belong to this Stadtteil comes from a spatial crosswalk (each Gebiet assigned to the
Stadtteil that contains it; OA-D1b, #240), not from the Gebiet codes themselves.

### Trajectory mix, 2019–2025

<HamburgTrajectoryNote subject="each Gebiet" />

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

{#if trajTakeaway}
<p>{@html trajTakeaway}</p>
{:else}
<Alert status="warning">No Gebiet trajectory data available for this Stadtteil within the 2019–2025 window.</Alert>
{/if}

<BarChart data={trajectory_mix} x=trajectory_type y=n_areas title="Gebiete by trajectory classification, 2019–2025 ({stadtteil_name[0] ? stadtteil_name[0].area_name : 'this Stadtteil'})" swapXY=true emptySet="warn" emptyMessage="No Gebiet trajectory data for this Stadtteil."/>

## Commercial mix & Offering Advantage

### Mapped places

```sql poi_mix
-- #353: SUM of this Stadtteil's Gebiete' latest-snapshot counts -- same shape as Berlin's
-- coarse-page poi_mix, grouped through mart_area_hierarchy (OA-D1b/#240) instead of a code prefix.
select
    f.poi_category_h,
    sum(f.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as f
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = f.area_code
where f.city_code = 'HH' and f.area_vintage = 'current'
  and h.parent_area_code = '${params.code}'
  and f.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'HH' and area_vintage = 'current'
  )
group by all
order by poi_count desc
```

<BarChart data={poi_mix} x=poi_category_h y=poi_count title="Mapped places by category (latest snapshot), {stadtteil_name[0] ? stadtteil_name[0].area_name : 'this Stadtteil'}" swapXY=true emptySet="warn" emptyMessage="No mapped places recorded for this Stadtteil."/>

These are OpenStreetMap-derived counts; OSM coverage is not spatially neutral (poorer or peripheral
areas tend to be less thoroughly mapped, Haklay 2010), so a low count can be a coverage gap rather
than a real absence. See the [Hamburg POI map](/hamburg/poi-map) for the per-Gebiet picture.

### Offering Advantage across the area hierarchy

<NotYetPublished what="This Stadtteil's Offering Advantage roll-up (Berlin's coarse pages show one per domain)">
  The roll-up is computed for Hamburg in the data layer, but the site's data source keeps only
  Berlin's rows, and the scale-sensitivity (MAUP) disclosure that must accompany a roll-up has only
  been checked for Berlin. Each Gebiet's own Offering Advantage profile is on its page, linked below.
</NotYetPublished>

## Within-group dominance

<NotYetPublished what="Within-group dominance for this Stadtteil's Gebiete">
  The underlying mart carries Hamburg rows, but the site's data source deliberately restricts it to
  Berlin, and no sign-off has yet reviewed a Hamburg public view of it.
</NotYetPublished>

## People & structure

<NotYetPublished what="Population and composition sums for this Stadtteil">
  Hamburg's population-register figures do exist at Stadtteil level, but the Hamburg demographics
  sign-off (#313) sets conditions for a Hamburg web page of its own (wording, no ranking, how merged
  Stadtteile and missing values are explained), and that page has not been built or reviewed yet.
</NotYetPublished>

## Amenities & everyday infrastructure

<!--
  Hamburg parity for I20-web (#254), 2026-10-26: same block as the Berlin PLR page
  (web/pages/berlin/area/[code].md, "Amenities & everyday infrastructure"), reading the now
  city-agnostic `mart_area_amenities` (HH levels: subarea_l2 / subarea_l1 / district). The five
  binding framing conditions of docs/epic-i/I20-domain-signoff.md carry over verbatim:
  (1) "most common cuisine", never "dominant", in reader-facing copy; (2) the district comparison
  renders as co-equal counts, no colour/sort/highlight; (3) no ranking, "livability",
  investment-adjacent or recommending language; (4) the OSM completeness caveat sits directly
  next to the table; (5) a most-common-cuisine line only renders when
  gastro_poi_with_cuisine_count >= 8 AND dominant_cuisine_share >= 0.15
  (docs/epic-i/I20-poi-curation-rules.md §2), else an honest null state.
  Hamburg codes do not nest by prefix, so the district comes from mart_area_hierarchy
  (the district_row subquery below), not Berlin's substr(). The district row is LEFT-joined so a missing
  parent leaves its column empty instead of blanking the whole table.
  #353: block unchanged (I20-hamburg-parity-domain-signoff.md reviewed this exact copy).
-->

```sql amenities_current
select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${params.code}'
order by snapshot_year desc
limit 1
```

```sql amenities_table
-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
-- rollup -- extensive counts). Values pre-formatted as text, as on the Berlin page.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${params.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${params.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'district'
            and area_code = (select parent_area_code
                from gentriduck_marts.mart_area_hierarchy
                where city_code = 'HH' and area_level = 'subarea_l1'
                    and area_code = '${params.code}'
                limit 1)
            and snapshot_year = (select snapshot_year from latest)
    ),
    facts as (
        select 1 as sort_order, 'Schools' as indicator, a.n_schools as area_n, d.n_schools as district_n
        from area_row as a left join district_row as d on true
        union all
        select 2, 'Kindergartens', a.n_kindergartens, d.n_kindergartens
        from area_row as a left join district_row as d on true
        union all
        select 3, 'Doctors', a.n_doctors, d.n_doctors
        from area_row as a left join district_row as d on true
        union all
        select 4, 'Dentists', a.n_dentists, d.n_dentists
        from area_row as a left join district_row as d on true
        union all
        select 5, 'Pharmacies', a.n_pharmacies, d.n_pharmacies
        from area_row as a left join district_row as d on true
        union all
        select 6, 'Supermarkets', a.n_supermarkets, d.n_supermarkets
        from area_row as a left join district_row as d on true
        union all
        select 7, 'Playgrounds', a.n_playgrounds, d.n_playgrounds
        from area_row as a left join district_row as d on true
        union all
        select 8, 'Transit stops', a.n_transit_stops, d.n_transit_stops
        from area_row as a left join district_row as d on true
    )
select sort_order, indicator, cast(cast(area_n as bigint) as varchar) as area_value, cast(cast(district_n as bigint) as varchar) as district_value
from facts
order by sort_order
```

<p>
{#if amenities_current[0]?.snapshot_year}
Based on OpenStreetMap tagging as of <b>{amenities_current[0].snapshot_year}</b>, this Stadtteil has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.
{:else}
No amenity data is available for this Stadtteil yet.
{/if}
</p>

<DataTable data={amenities_table} rows=8 emptySet="warn" emptyMessage="No amenity data for this area.">
    <Column id=indicator title="Infrastructure"/>
    <Column id=area_value title="This area"/>
    <Column id=district_value title="District total"/>
</DataTable>

<Alert status="info">
  These figures come from OpenStreetMap tagging, not an official registry. A <b>0</b> may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the <a href="/open-data">open-data</a> page for
  more on this project's data-completeness caveats generally.
</Alert>

<p>
{#if amenities_current[0]?.snapshot_year && amenities_current[0].gastro_poi_with_cuisine_count >= 8 && amenities_current[0].dominant_cuisine_share >= 0.15}
Among <b>{amenities_current[0].gastro_poi_with_cuisine_count}</b> restaurants/cafes with cuisine
data tagged in this Stadtteil, the <b>most common cuisine</b> is
<b>{amenities_current[0].dominant_cuisine}</b>
({Math.round(amenities_current[0].dominant_cuisine_share * 100)}% of cuisine-tagged restaurants/cafes).
{:else if amenities_current[0]?.snapshot_year && amenities_current[0].gastro_poi_with_cuisine_count >= 8}
Cuisine is tagged for <b>{amenities_current[0].gastro_poi_with_cuisine_count}</b> restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.
{:else}
There isn't enough tagged cuisine data in this Stadtteil yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).
{/if}
</p>

<p>
This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.
</p>

## Land value & estimated rent

<NotYetPublished what="Land value and estimated rent for this Stadtteil">
  Hamburg has no land-value (Bodenrichtwert) series on this site. Its rent signal is narrower in kind
  than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, current state only),
  and its sign-off (#303) requires a Hamburg-specific methodology disclosure before any of it is
  shown publicly — that has not been done yet.
</NotYetPublished>

## Where this area sits

<!-- #308: shared per-area drill-down mini map (web/components/AreaDrilldownMap.svelte). This
     Stadtteil's own polygon highlighted, its statistische Gebiete (the next level down, OA-D1b/#240
     ST_Within spatial crosswalk, published via mart_area_hierarchy) clickable -- see
     pages/hamburg/area/district/[code].md's own drill-down mini map comment for the general
     pattern. Uses area_name (the derived Gebiet label, #307/#352: '<Stadtteil> · <OSM place
     name>' or '<Stadtteil> · Gebiet <code>', see int_hamburg_gebiet_names.sql) as the visible
     child label, not the raw numeric area_code; every Gebiet has one since #352. `base` is
     imported once, in this page's single existing `<script>` block above. -->

```sql minimap_areas
-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'subarea_l1:' || '${params.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${params.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${params.code}'
union all
select
    'subarea_l2:' || h.area_code as feature_key,
    -- #307/#352: the derived Gebiet label (every Gebiet has one); the coalesce-to-code is a
    -- guard only -- same coalesce as this page's own `children` query above (gebiet_name).
    coalesce(nullif(g.area_name, ''), h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${base}/hamburg/area/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${params.code}'
order by sort_order, area_name
```

<AreaDrilldownMap
    data={minimap_areas}
    geoJsonUrl={`${base}/geo/subarea_l1_subarea_l2_drilldown.geojson`}
    title="{stadtteil_name[0] ? stadtteil_name[0].area_name : 'This Stadtteil'} and its statistische Gebiete"
/>

### Gebiete in this Stadtteil

<DataTable data={children} rows=20 link=gebiet_link emptySet="warn" emptyMessage="No constituent Gebiete found for this Stadtteil.">
    <Column id=gebiet_name title="Statistisches Gebiet"/>
    <Column id=stage title="Stage"/>
    <Column id=pressure_trend title="Pressure trend"/>
</DataTable>

The parent district ("Up:" above) is a source-provided attribute of Hamburg's Stadtteil geodata;
the Gebiet list comes from the OA-D1b (#240) spatial crosswalk. Both are published through
<code>mart_area_hierarchy</code> (#302) without re-deciding either method.

## Honest caveats

- **Stadtteil figures are counts and sums of its Gebiete, never a re-scored index** — the stage and
  trajectory sections show how this Stadtteil's Gebiete are distributed, not a single value for
  the Stadtteil.
- **Hamburg's stages are not directly equivalent to same-named Berlin stages** — Hamburg's Dynamik
  window is 3 years, Berlin's 2 ([methodology §6](/methodology), points 1 and 4).
- **The trajectory mix describes a recent ~6-year (2019–2025) window**, not full history, and is a
  **status-only classification**, never a displacement verdict.
- **Mapped-place counts come from OpenStreetMap**, whose coverage varies by area and grew over time.
- **Some Berlin sections are not shown for Hamburg** — the Offering Advantage roll-up, within-group
  dominance, people & structure, and land value & rent — each with its reason in its own section
  above. See the [Hamburg data hub](/hamburg) for the full inventory and
  [methodology & data sources §6](/methodology) for how Hamburg's data differs from Berlin's.

## Further reading

See the [Hamburg data hub](/hamburg) for what's published today, [Hamburg's map](/hamburg/maps)
(switch the area level to Stadtteil for this Stadtteil's stage mix on the map),
[browse by district](/hamburg/area-detail) for other areas, or
[the area-hierarchy reference](/reference/area-hierarchy) for how Hamburg's small-area geography is
structured.

---

<FooterNav />
