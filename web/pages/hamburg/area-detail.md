---
title: Area detail — Gebiet drill-down
sidebar_position: 3
---

<!--
  #353 (Hamburg-Berlin parity review): Hamburg's counterpart of pages/berlin/area-detail.md, the
  primary browse entry on Berlin's hub ("Area detail — start here"). Same shape: pick a district,
  see every statistisches Gebiet in it, then a headline spotlight on one of them with a link to its
  full profile. sidebar_position 3 matches Berlin's.

  Data and sign-offs (display only, no new statistic):
  - Stage and status trend read gentrification_index's latest Hamburg live_data rows -- the same
    per-Gebiet values /hamburg/maps shows, admitted under H3/#237 (docs/epic-h/H3-geo-signoff.md,
    H3-domain-signoff.md). The order is applied within one Hamburg district only -- H3 domain
    condition 2 forbids pooled cross-city ranking. H3 condition 1(iv): the stage is labelled "not
    directly equivalent" to same-named Berlin stages.
  - The spotlight's trajectory and confidence read fct_gentrification_trajectory's Hamburg rows
    (#314), with the binding window/status-only disclosure (<HamburgTrajectoryNote>).
  - District membership: two hops through mart_area_hierarchy (district <- Stadtteil,
    source-provided; Stadtteil <- Gebiet, OA-D1b/#240), the same edges every Hamburg profile page
    uses (#302). Hamburg codes don't nest by prefix, so Berlin's substr() can't be used.
  - The district Dropdown is query-driven (dim_area_geometry's 7 named Hamburg districts) instead
    of Berlin's hard-coded 12-entry list.

  Crawl note (same as Berlin's page): the browse table only renders the default district's rows at
  build time; every Gebiet page is still built via /hamburg/area and the Stadtteil pages' tables.

  #358 (docs/epic-g/358-spec.md §3-§5, Revision 1): replaces the former Dynamik-reading order
  (#353 R2 had already stopped calling its first row the top of a ranking). Stage and trend read
  gentrification_index.stage_label / status_trend (the "Stage" column previously showed the raw
  status_class key). Default order: stage_number ascending (NULLs last), then area_name, then
  area_code; user-sortable. The spotlight is a reader choice (per-district Dropdown defaulting to
  the table's first row). Legends come from <StageNumberLegend>/<StatusTrendLegend> (exact §5
  wording; the trend legend replaces this page's former "negative trend" sentence).
  The spotlight link is value-guarded (#255/#323 precedent) so an empty build-time result can never
  render a literal "/hamburg/area/undefined" link.
-->

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Area detail — one Gebiet, full picture" lede="Pick a district to compare its statistische Gebiete, then see a headline snapshot of any one of them, with a link to its full profile." />

For the citywide picture, see the [maps page](/hamburg/maps) or the
[time-series view](/hamburg/time-series). If you already know which Gebiet you want, the
[full searchable list](/hamburg/area) is the faster way in. This page covers Hamburg; Berlin has its
own [district browse](/berlin/area-detail).

<Alert status="info">
  <b>How to read the figures:</b> Hamburg's official status runs <b>1 = least deprived</b> to
  <b>4 = most deprived</b>, so a <b>rising</b> status (a falling status <i>index</i> value) means a
  Gebiet became <b>less</b> deprived — which is also the signature of gentrification, not
  automatically good news for existing residents. Hamburg's stages come from its own
  annual Sozialmonitoring with a 3-year Dynamik window (Berlin's is 2 years), so they are <b>not
  directly equivalent</b> to same-named Berlin stages — see
  <a href="/methodology">methodology §6</a>. Figures are from the latest Hamburg edition on this
  site.
</Alert>

## Browse by district

```sql districts
select area_code, area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district'
order by area_name
```

<Dropdown data={districts} name="district" value="area_code" label="area_name" title="District (Bezirk)" defaultValue="1"/>

```sql browse
-- #358: stage_label / status_trend come from gentrification_index (live_data only, spec §1-§2);
-- default order is the cycle position (stage_number, NULLs last), then name, then code (spec §3).
with
    latest as (
        select max(period_yyyymm) as period_yyyymm
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    ),
    in_district as (
        select g2.area_code
        from gentriduck_marts.mart_area_hierarchy as g2
        join
            gentriduck_marts.mart_area_hierarchy as g1
            on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
        where g2.city_code = 'HH' and g2.area_level = 'subarea_l2'
          and g1.parent_area_code = '${inputs.district.value}'
    )
select
    gi.area_code,
    gi.area_name,
    -- see pages/berlin/area-detail.md: lets the spotlight picker wait for the current district.
    '${inputs.district.value}' as district_code,
    gi.stage_number,
    gi.stage_label as stage,
    gi.status_trend,
    '/hamburg/area/' || gi.area_code as area_link
from gentriduck_marts.gentrification_index as gi
where gi.variant = 'live_data' and gi.area_level = 'subarea_l2' and gi.city_code = 'HH'
  and gi.period_yyyymm = (select period_yyyymm from latest)
  and gi.area_code in (select area_code from in_district)
  and gi.stage_number is not null
order by gi.stage_number nulls last, gi.area_name, gi.area_code
```

Every Gebiet with a current stage in the selected district, ordered by stage number (1 to 6), then
alphabetically. The order shows where each area sits in the cycle, not how urgent it is. Click a
column header to sort differently.

<DataTable data={browse} rows=10 rowShading=true search=true link=area_link>
    <Column id=area_name title="Statistisches Gebiet"/>
    <Column id=stage title="Stage"/>
    <Column id=status_trend title="Status trend"/>
</DataTable>

<StageNumberLegend />

<StatusTrendLegend />

```sql spotlight
with
    latest as (
        select max(period_yyyymm) as period_yyyymm
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    ),
    in_district as (
        select g2.area_code
        from gentriduck_marts.mart_area_hierarchy as g2
        join
            gentriduck_marts.mart_area_hierarchy as g1
            on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
        where g2.city_code = 'HH' and g2.area_level = 'subarea_l2'
          and g1.parent_area_code = '${inputs.district.value}'
    ),
    chosen as (
        select gi.area_code, gi.area_name, gi.stage_label, gi.status_trend
        from gentriduck_marts.gentrification_index as gi
        where gi.variant = 'live_data' and gi.area_level = 'subarea_l2' and gi.city_code = 'HH'
          and gi.period_yyyymm = (select period_yyyymm from latest)
          and gi.area_code in (select area_code from in_district)
          and gi.stage_number is not null
        -- #358: the reader's pick if it is in this district, otherwise the table's first row.
        order by
            (gi.area_code = '${spotCode}') desc,
            gi.stage_number nulls last,
            gi.area_name,
            gi.area_code
        limit 1
    )
select
    c.area_code,
    c.area_name,
    c.stage_label as stage,
    c.status_trend,
    t.trajectory_type,
    t.trajectory_confidence
from chosen as c
left join gentriduck_marts.fct_gentrification_trajectory as t
    on t.city_code = 'HH' and t.area_vintage = 'current' and t.area_code = c.area_code
```

---

<script>
  // Fallback computed here, not inline in the heading (mdsvex smart-quote note in
  // pages/hamburg/area/[code].md).
  $: spotlightName = spotlight?.[0]?.area_name ?? 'this district';
  // #358: the spotlight is the reader's choice -- same per-district input-name pattern as
  // pages/berlin/area-detail.md (see its comment): a new district starts at its first table row,
  // and the SQL falls back to that row whenever the pick is empty or not in the district.
  $: spotInputName = 'spot_' + (inputs.district?.value ?? '');
  $: spotCode = String(inputs[spotInputName]?.value ?? '').replaceAll("'", '');
  $: spotDefault = browse?.[0]?.area_code;
  $: spotReady = Boolean(spotDefault) && String(browse?.[0]?.district_code) === String(inputs.district?.value);
</script>

## Spotlight — {spotlightName}

{#if spotReady}
{#key spotInputName}
<Dropdown
    data={browse}
    name={spotInputName}
    value=area_code
    label=area_name
    order="stage_number nulls last, area_name, area_code"
    defaultValue={spotDefault}
    title="Gebiet to show"
/>
{/key}
{/if}

<BigValue data={spotlight} value=stage title="Current stage" emptySet="warn"/>
<BigValue data={spotlight} value=status_trend title="Status trend" emptySet="warn"/>
<BigValue data={spotlight} value=trajectory_type title="Overall trajectory (2019–2025)" emptySet="warn"/>
<BigValue data={spotlight} value=trajectory_confidence title="Confidence" emptySet="warn"/>

<!-- #353: value-guarded link (#255/#323 precedent, see pages/berlin/area-detail.md's comment). -->
<p>
{#if spotlight[0]?.area_code}
{spotlight[0].area_name} is shown because you selected it (or because it is first in the list). Its full profile — stage, social-status trajectory, commercial-mix development, Offering
Advantage, and amenities — is on its <a href="/hamburg/area/{spotlight[0].area_code}">canonical area page</a>.
{:else}
Pick a district above to see a snapshot of one of its Gebiete — each one also has a full profile in the <a href="/hamburg/area">Gebiet list</a>.
{/if}
</p>

<HamburgTrajectoryNote subject="this Gebiet" />

Trajectory labels are explained on the [methodology page](/methodology) — an "improving" label does
not by itself mean the change was good for existing residents; rising status can reflect
displacement as easily as incumbent social mobility.

## Honest caveats

- **These headline figures summarize what the linked Gebiet page shows in full** — its charts,
  definitions, and caveats live there, not duplicated here.
- **Gebiet names are labels, not official names** — Hamburg's statistische Gebiete carry only a
  numeric code, so each is shown as its Stadtteil plus an OpenStreetMap neighbourhood name inside
  it, or its code (see the [Hamburg data hub](/hamburg)).
- **Hamburg's stages are not directly equivalent to same-named Berlin stages**, and the two cities
  are never ranked against each other ([methodology §6](/methodology)).
- **Gebiete without a current stage** (no Sozialmonitoring classification in the latest edition)
  are not listed in the browse table; they still have their own page in the
  [full Gebiet list](/hamburg/area).

## Further reading

See [methodology & data sources](/methodology) for what the index means, the
[POI & Offering Advantage map](/hamburg/poi-map) for the commercial-mix picture, the
[time-series view](/hamburg/time-series) for how Hamburg's Gebiete have moved, or the
[full Gebiet list](/hamburg/area) to search for a specific Gebiet directly.

---

<FooterNav />
