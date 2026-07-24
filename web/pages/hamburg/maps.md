---
title: Maps — gentrification pressure by area
sidebar_position: 1
---

<!--
  H3 (#237) scope (c): Hamburg's own maps page, mirroring pages/berlin/maps.md's structure but
  scoped to what's actually real for Hamburg (see pages/hamburg/index.md's header comment for the
  full data inventory). Deliberately NOT a shared/toggled page with Berlin's /berlin/maps -- per
  the H3-domain-signoff.md structural guard (condition 2: "no pooled cross-city ranking or numeric
  status_index/dynamism_index differencing in any Hamburg-vs-Berlin UI"), Hamburg gets its own
  route, its own AreaMap instance, and its own colour-scale computation, never a shared component
  instance that could invite a side-by-side/subtracted reading. See /methodology §6's "No pooled
  Berlin<->Hamburg ranking" bullet for the site-wide statement of this rule.

  Differences from /berlin/maps, all deliberate (not oversights):
  - No `variant` dropdown -- Hamburg only has `live_data` (see pages/hamburg/index.md).
  - No `area_level` dropdown -- Hamburg only reaches this mart at `subarea_l2` grain (H3 sign-off
    condition 1: schema.yml widened to add exactly "subarea_l2", no district/subarea_l1 rows).
  - Tooltip leads with the Gebiet CODE, not a name -- dim_area_geometry.area_name is genuinely
    blank for every Hamburg subarea_l2 row (confirmed via the built parquet; see
    web/scripts/export_area_geojson.py's export_hamburg_geometry() docstring).
  - No click-through link -- there is no /hamburg/area/[code] per-area profile page (Berlin's
    version needs fct_gentrification_change/mart_price_rent_dimension, both Berlin-only).
  - Uses the new `subarea_l2_live_data.geojson` (web/scripts/export_area_geojson.py,
    export_hamburg_geometry()), not a variant of the existing plr_*/bzr_* files.

  The stage color palette and dropdown/indicator options are otherwise the same convention as
  /berlin/maps (RdYlBu-6 for the six-stage typology, single-hue sequential for the raw ordinals) --
  same D1xD2 matrix, same colour semantics -- but this is a SEPARATE <AreaMap> instance/data query,
  not the same component instance reused across cities, so there is no shared legend/colour-scale
  object a reader could misread as asserting Berlin/Hamburg equivalence.
-->

<script>
  import { base } from '$app/paths';

  const stageColorPalette = ['#d73027', '#fc8d59', '#fee090', '#e0f3f8', '#91bfdb', '#4575b4'];

  // No area_name to lead with (genuinely blank at Gebiet grain, see header comment) -- tooltip
  // leads with the Gebiet code itself instead of a name.
  //
  // Maintainer report (2026-07-24, mirrors the same fix on /berlin/maps): the tooltip field title
  // originally reused `inputs.indicator.label`, the long descriptive dropdown valueLabel text --
  // fine for a one-time dropdown choice, unreadable repeated on every map hover. Short,
  // indicator-only label used for the tooltip instead; the dropdown's own valueLabel is untouched.
  const indicatorShortLabel = {
    status_class: 'Gentrification stage',
    status_index: 'Social status',
    dynamism_index: 'Dynamism'
  };
  $: areaTooltip = [
    {
      id: inputs.indicator.value === 'status_class' ? 'stage_label' : inputs.indicator.value,
      title: indicatorShortLabel[inputs.indicator.value],
      fmt: inputs.indicator.value === 'status_class' ? 'id' : 'num1'
    },
    { id: 'area_code', title: 'Gebiet code', valueClass: 'text-xs opacity-60', fmt: 'id' }
  ];
</script>

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Maps — gentrification pressure by area" lede="Colours each of Hamburg's statistische Gebiete by its current gentrification-pressure signal, from Hamburg's own official Sozialmonitoring — the same D1×D2 typology matrix used for Berlin, applied to Hamburg's own indicators and observation window." />

<Alert status="info">
  <b>How to read the map:</b> the <b>"Gentrification stage"</b> option colours each area by one of
  six plain-language stages (red = highest pressure / earliest displacement risk, blue = most
  stable) — the same six-stage typology used on <a href="/berlin/maps">Berlin's map</a>. The
  <b>"Social status"</b> and <b>"Dynamism"</b> options show the raw ordinal inputs: "Social status"
  is ordinal — higher shading means <b>more deprived</b>, not more prosperous. "Dynamism" — higher
  means the area's status is improving <b>faster</b>, over Hamburg's own <b>3-year</b> observation
  window (Berlin's is 2 years) — see <a href="/methodology">methodology §6</a> for why that is a
  qualitative difference in what "active" means, not just a numeric-scale one. Areas without a
  value are drawn but left blank.
</Alert>

<Alert status="warning">
  <b>This map has no neighbourhood names.</b> Hamburg's statistische Gebiete carry only a numeric
  code in the source geodata (unlike Berlin's named Planungsräume) — hover any area for its code
  and value. There is no per-area drill-down page for Hamburg yet (Berlin's equivalent needs data —
  a trajectory history, price/rent — that does not yet exist for Hamburg; see
  <a href="/hamburg">the Hamburg data hub</a> for the full inventory of what is and isn't built).
  <b>This map is never shown alongside, or blended with, Berlin's own map</b> — Hamburg and Berlin
  each have their own route, their own colour-scale computation, and are never offered as a
  side-by-side or subtracted comparison (see <a href="/methodology">methodology §6</a>).
</Alert>

<Dropdown name="indicator" title="Indicator" defaultValue="status_class">
  <DropdownOption value="status_class" valueLabel="Gentrification stage — plain-language, colour-coded"/>
  <DropdownOption value="status_index" valueLabel="Social status — how deprived or affluent (current snapshot)"/>
  <DropdownOption value="dynamism_index" valueLabel="Dynamism — how fast that status is changing (3-year window)"/>
</Dropdown>

```sql areas
-- Only one (variant, area_level) combination exists for Hamburg in this mart: live_data /
-- subarea_l2 (H3, #237) -- no dropdown needed for either, unlike /berlin/maps. stage_label/
-- stage_sort follow the exact same D1xD2 typology-stage convention as /berlin/maps' `areas` query
-- (see that page's header comment for the Dangschat 1988 / Döring & Ulbricht 2016 ordering
-- rationale) -- same matrix, reused unmodified per H1-domain-signoff.md §1.
select
    city_code,
    area_code,
    status_index,
    dynamism_index,
    status_class,
    case status_class
        when 'active-gentrification' then 'Active gentrification'
        when 'pioneer-signal' then 'Early pioneer signal'
        when 'improving-vulnerable' then 'Improving, vulnerable area'
        when 'pre-gentrification' then 'Pre-gentrification watch'
        when 'consolidation-pressure' then 'Consolidated, still intensifying'
        when 'stable-established' then 'Stable, established'
    end as stage_label,
    case status_class
        when 'active-gentrification' then 1
        when 'pioneer-signal' then 2
        when 'improving-vulnerable' then 3
        when 'pre-gentrification' then 4
        when 'consolidation-pressure' then 5
        when 'stable-established' then 6
        else 99
    end as stage_sort
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )
order by stage_sort
```

<AreaMap
    data={areas}
    geoJsonUrl={`${base}/geo/subarea_l2_live_data.geojson`}
    geoId="area_code"
    areaCol="area_code"
    value={inputs.indicator.value === 'status_class' ? 'stage_label' : inputs.indicator.value}
    legendType={inputs.indicator.value === 'status_class' ? 'categorical' : 'scalar'}
    colorPalette={inputs.indicator.value === 'status_class' ? stageColorPalette : undefined}
    title="Hamburg statistisches Gebiet — {inputs.indicator.label}, latest period"
    startingLat={53.5511}
    startingLong={9.9937}
    startingZoom={10}
    tooltip={areaTooltip}
/>

## The numbers behind the map

```sql area_table
select
    area_code,
    status_index,
    dynamism_index,
    case status_class
        when 'active-gentrification' then 'Active gentrification'
        when 'pioneer-signal' then 'Early pioneer signal'
        when 'improving-vulnerable' then 'Improving, vulnerable area'
        when 'pre-gentrification' then 'Pre-gentrification watch'
        when 'consolidation-pressure' then 'Consolidated, still intensifying'
        when 'stable-established' then 'Stable, established'
    end as stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )
order by dynamism_index desc
```

<DataTable data={area_table} rows=10>
    <Column id=area_code title="Gebiet code"/>
    <Column id=status_index title="Social status (1=least deprived … 4=most deprived)"/>
    <Column id=dynamism_index title="Speed of change (higher = faster upward change, 3-year window)"/>
    <Column id=stage_label title="Gentrification stage"/>
</DataTable>

Want the commercial-mix (shops/cafés) view instead of the social-status index — POI density and
Offering Advantage by domain — see the
[POI & Offering Advantage map](/hamburg/poi-map).

## Honest caveats

- **Social status and dynamism are ordinal, not linear** — higher social-status shading means
  **more deprived**, not more prosperous. See [methodology & data sources](/methodology) for the
  full decoder.
- **Hamburg's Dynamik window is 3 years, Berlin's is 2** — this is a qualitative difference in
  what "active-gentrification" means, not just a numeric-scale one; see
  [methodology §6](/methodology) point 1.
- **No neighbourhood names** — Hamburg's statistische Gebiete are shown by numeric code only; see
  the [Hamburg data hub](/hamburg) for why.
- **Only Hamburg's D1/D2 Sozialmonitoring outcome is shown here** — the demographic (D4)
  composite, land value & rent, and Milieuschutz-equivalent displacement zones are not (yet)
  published as a Hamburg map; see [methodology §6](/methodology) for the full inventory.
- **This map is never combined with, or compared numerically against, Berlin's map** — see
  [methodology §6](/methodology)'s structural rule against pooled cross-city ranking.

---

<FooterNav />
