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
  - No click-through link -- there is no /hamburg/area/[code] per-area profile page (Berlin's
    version needs fct_gentrification_change/mart_price_rent_dimension, both Berlin-only). #310's
    new subarea_l1/district rollup levels DO have profile-page routes
    (/hamburg/area/subarea_l1/[code], /hamburg/area/district/[code]) but this page still doesn't
    link to them, for the same "no click-through anywhere on this page" consistency Berlin's own
    page doesn't have to worry about.
  - Uses the `subarea_l2_live_data.geojson`/`subarea_l1_current.geojson`/`district_current.geojson`
    exports (web/scripts/export_area_geojson.py), not a variant of the existing plr_*/bzr_* files.

  The stage color palette and dropdown/indicator options are otherwise the same convention as
  /berlin/maps (RdYlBu-6 for the six-stage typology, single-hue sequential for the raw ordinals) --
  same D1xD2 matrix, same colour semantics -- but this is a SEPARATE <AreaMap> instance/data query,
  not the same component instance reused across cities, so there is no shared legend/colour-scale
  object a reader could misread as asserting Berlin/Hamburg equivalence.

  #310 (map granularity selector): adds an "Area level" dropdown -- subarea_l2 (statistisches
  Gebiet, the finest live_data leaf level, unchanged from H3) plus two new *rollup* levels sourced
  from `mart_area_rollup_stage_mix` (NOT `gentrification_index` -- that mart's contract/H3 scope is
  unchanged by this ticket): subarea_l1 (Stadtteil) and district (Bezirk). Same #310 design decision
  as /berlin/maps -- population-weighted stage MIX + a paired dominant-stage/dominant_share, never a
  single re-derived label alone; see that page's header comment for the full rationale (identical
  reasoning, not city-specific) and mart_area_rollup_stage_mix.sql's own header for the method.
-->

<script>
  import { base } from '$app/paths';

  const stageColorPalette = ['#d73027', '#fc8d59', '#fee090', '#e0f3f8', '#91bfdb', '#4575b4'];

  const indicatorShortLabel = {
    status_class: 'Gentrification stage',
    status_index: 'Social status',
    dynamism_index: 'Dynamism'
  };

  // #310: subarea_l2 is the individual-Gebiet leaf level (gentrification_index, unchanged from
  // H3); subarea_l1/district are rollup levels (mart_area_rollup_stage_mix).
  $: isRollup = inputs.area_level.value !== 'subarea_l2';
  // subarea_l2 genuinely has no area_name in the source data (H3-domain-signoff.md condition 3);
  // subarea_l1/district DO carry a real Stadtteil/Bezirk name.
  $: hasAreaName = inputs.area_level.value !== 'subarea_l2';

  const geoJsonByLevel = {
    subarea_l2: 'subarea_l2_live_data.geojson',
    subarea_l1: 'subarea_l1_current.geojson',
    district: 'district_current.geojson'
  };
  const areaLevelLabel = {
    subarea_l2: 'statistisches Gebiet',
    subarea_l1: 'Stadtteil',
    district: 'Bezirk'
  };
  $: geoJsonUrl = `${base}/geo/${geoJsonByLevel[inputs.area_level.value]}`;

  // No area_name to lead with at the Gebiet grain (genuinely blank, see header comment) --
  // tooltip leads with the Gebiet code instead of a name there; subarea_l1/district (#310) DO
  // have a name, and additionally always carry dominant_share/n_habitable_children alongside the
  // indicator value (design point 3: never a standalone dominant-stage label).
  $: areaTooltip = isRollup
    ? [
        ...(hasAreaName
          ? [{ id: 'area_name', showColumnName: false, valueClass: 'font-bold text-sm', fmt: 'id' }]
          : []),
        {
          id: inputs.indicator.value === 'status_class' ? 'stage_label' : inputs.indicator.value,
          title: indicatorShortLabel[inputs.indicator.value],
          fmt: inputs.indicator.value === 'status_class' ? 'id' : 'num1'
        },
        { id: 'dominant_share', title: 'Population share of dominant stage', fmt: 'pct0' },
        { id: 'n_habitable_children', title: 'Constituent Gebiete with data', fmt: 'id' },
        { id: 'area_code', title: 'Area code', valueClass: 'text-xs opacity-60', fmt: 'id' }
      ]
    : [
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
  <b>This map has no neighbourhood names at the Gebiet level.</b> Hamburg's statistische Gebiete
  carry only a numeric code in the source geodata (unlike Berlin's named Planungsräume or
  Hamburg's own Stadtteile/Bezirke) — hover any Gebiet for its code and value. There is no
  per-area drill-down page for Hamburg's Gebiet level yet (Berlin's equivalent needs data — a
  trajectory history, price/rent — that does not yet exist for Hamburg; see
  <a href="/hamburg">the Hamburg data hub</a> for the full inventory of what is and isn't built).
  <b>This map is never shown alongside, or blended with, Berlin's own map</b> — Hamburg and Berlin
  each have their own route, their own colour-scale computation, and are never offered as a
  side-by-side or subtracted comparison (see <a href="/methodology">methodology §6</a>).
</Alert>

<Dropdown name="area_level" title="Area level" defaultValue="subarea_l2">
  <DropdownOption value="subarea_l2" valueLabel="Statistisches Gebiet — finest detail (no names)"/>
  <DropdownOption value="subarea_l1" valueLabel="Stadtteil — ~104 named districts"/>
  <DropdownOption value="district" valueLabel="Bezirk — 7 boroughs"/>
</Dropdown>

{#if isRollup}
<Alert status="info">
  <b>Stadtteil / Bezirk are population-weighted rollups of the Gebiet-level data</b> — never a
  re-scored index at this grain (averaging the underlying MSS-equivalent ordinals into a single new
  category would be statistically invalid; see the
  <a href="https://github.com/dhelweg/gentriduck/issues/310">#310 design decision</a>, the same
  decision applied unmodified to Berlin's Bezirk/PGR/Ortsteil rollups). The map colours by the
  <b>dominant (most common) stage</b> among that area's constituent Gebiete, weighted by
  population — its tooltip and the tables below always show the dominant stage's population
  <b>share</b> alongside it, and the "Stage mix" table further down shows the full breakdown.
  Areas with fewer than 3 Gebiete with real data are flagged as a fragile ("small sample") dominant
  reading.
</Alert>
{/if}

<Dropdown name="indicator" title="Indicator" defaultValue="status_class">
  <DropdownOption value="status_class" valueLabel="Gentrification stage — plain-language, colour-coded"/>
  <DropdownOption value="status_index" valueLabel="Social status — how deprived or affluent (current snapshot)"/>
  <DropdownOption value="dynamism_index" valueLabel="Dynamism — how fast that status is changing (3-year window)"/>
</Dropdown>

```sql areas_leaf
-- Only one (variant, area_level) combination exists for Hamburg's leaf grain in
-- gentrification_index: live_data / subarea_l2 (H3, #237). stage_label/stage_sort follow the
-- exact same D1xD2 typology-stage convention as /berlin/maps' `areas_plr` query (see that page's
-- header comment for the Dangschat 1988 / Döring & Ulbricht 2016 ordering rationale) -- same
-- matrix, reused unmodified per H1-domain-signoff.md §1.
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

```sql areas_rollup
-- #310: one row per rollup area (subarea_l1/district), picked deterministically from
-- mart_area_rollup_stage_mix's per-(area, typology_stage) grain via QUALIFY -- see
-- /berlin/maps' `areas_rollup` query for the identical pattern/rationale (dominant_stage,
-- dominant_share, status_index_weighted_mean, dynamism_index_weighted_mean,
-- n_habitable_children, is_dominant_fragile, has_incomplete_population are all CONSTANT across
-- an area's typology_stage rows).
select
    city_code,
    area_code,
    area_name,
    status_index_weighted_mean as status_index,
    dynamism_index_weighted_mean as dynamism_index,
    dominant_stage as status_class,
    dominant_share,
    n_habitable_children,
    is_dominant_fragile,
    has_incomplete_population,
    case dominant_stage
        when 'active-gentrification' then 'Active gentrification'
        when 'pioneer-signal' then 'Early pioneer signal'
        when 'improving-vulnerable' then 'Improving, vulnerable area'
        when 'pre-gentrification' then 'Pre-gentrification watch'
        when 'consolidation-pressure' then 'Consolidated, still intensifying'
        when 'stable-established' then 'Stable, established'
    end as stage_label,
    case dominant_stage
        when 'active-gentrification' then 1
        when 'pioneer-signal' then 2
        when 'improving-vulnerable' then 3
        when 'pre-gentrification' then 4
        when 'consolidation-pressure' then 5
        when 'stable-established' then 6
        else 99
    end as stage_sort
from gentriduck_marts.mart_area_rollup_stage_mix
where area_level = '${inputs.area_level.value}'
  and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${inputs.area_level.value}' and city_code = 'HH'
  )
qualify row_number() over (partition by area_code order by typology_stage) = 1
order by stage_sort
```

<AreaMap
    data={isRollup ? areas_rollup : areas_leaf}
    geoJsonUrl={geoJsonUrl}
    geoId="area_code"
    areaCol="area_code"
    value={inputs.indicator.value === 'status_class' ? 'stage_label' : inputs.indicator.value}
    legendType={inputs.indicator.value === 'status_class' ? 'categorical' : 'scalar'}
    colorPalette={inputs.indicator.value === 'status_class' ? stageColorPalette : undefined}
    title="Hamburg {areaLevelLabel[inputs.area_level.value]} — {inputs.indicator.label}, latest period"
    startingLat={53.5511}
    startingLong={9.9937}
    startingZoom={10}
    tooltip={areaTooltip}
/>

## The numbers behind the map

```sql area_table_leaf
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

```sql area_table_rollup
select
    area_name,
    status_index_weighted_mean as status_index,
    dynamism_index_weighted_mean as dynamism_index,
    case dominant_stage
        when 'active-gentrification' then 'Active gentrification'
        when 'pioneer-signal' then 'Early pioneer signal'
        when 'improving-vulnerable' then 'Improving, vulnerable area'
        when 'pre-gentrification' then 'Pre-gentrification watch'
        when 'consolidation-pressure' then 'Consolidated, still intensifying'
        when 'stable-established' then 'Stable, established'
    end as stage_label,
    dominant_share,
    n_habitable_children,
    is_dominant_fragile
from gentriduck_marts.mart_area_rollup_stage_mix
where area_level = '${inputs.area_level.value}'
  and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${inputs.area_level.value}' and city_code = 'HH'
  )
qualify row_number() over (partition by area_code order by typology_stage) = 1
order by dynamism_index_weighted_mean desc
```

{#if isRollup}

<DataTable data={area_table_rollup} rows=10>
    <Column id=area_name title="Area"/>
    <Column id=status_index title="Social status (1=least deprived … 4=most deprived, population-weighted mean)"/>
    <Column id=dynamism_index title="Speed of change (population-weighted mean, 3-year window)"/>
    <Column id=stage_label title="Dominant gentrification stage"/>
    <Column id=dominant_share title="Dominant stage's population share" fmt="pct0"/>
    <Column id=n_habitable_children title="Gebiete with data"/>
    <Column id=is_dominant_fragile title="Fragile (< 3 Gebiete)?"/>
</DataTable>

### Stage mix — full breakdown per area

Never rely on the dominant stage alone: this table is the full population-weighted stage
distribution behind every area above, including the `uninhabited / no data` share where relevant.

```sql area_mix_table
select
    area_name,
    typology_stage,
    stage_population_share,
    stage_n_children
from gentriduck_marts.mart_area_rollup_stage_mix
where area_level = '${inputs.area_level.value}'
  and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${inputs.area_level.value}' and city_code = 'HH'
  )
order by area_name, stage_population_share desc nulls last
```

<DataTable data={area_mix_table} rows=10 search=true>
    <Column id=area_name title="Area"/>
    <Column id=typology_stage title="Stage"/>
    <Column id=stage_population_share title="Population share" fmt="pct0"/>
    <Column id=stage_n_children title="Constituent Gebiete"/>
</DataTable>

{:else}

<DataTable data={area_table_leaf} rows=10>
    <Column id=area_code title="Gebiet code"/>
    <Column id=status_index title="Social status (1=least deprived … 4=most deprived)"/>
    <Column id=dynamism_index title="Speed of change (higher = faster upward change, 3-year window)"/>
    <Column id=stage_label title="Gentrification stage"/>
</DataTable>

{/if}

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
- **Stadtteil / Bezirk are population-weighted rollups, never a re-scored index.** The map colours
  by the population-weighted *dominant* stage among each area's constituent Gebiete — always shown
  with its population share and the full stage mix (see the "Stage mix" table), never as a
  standalone label. Areas with fewer than 3 Gebiete contributing real data are flagged fragile.
- **No neighbourhood names at the Gebiet level** — Hamburg's statistische Gebiete are shown by
  numeric code only; see the [Hamburg data hub](/hamburg) for why. Stadtteil/Bezirk do have names.
- **Only Hamburg's D1/D2 Sozialmonitoring outcome is shown here** — the demographic (D4)
  composite, land value & rent, and Milieuschutz-equivalent displacement zones are not (yet)
  published as a Hamburg map; see [methodology §6](/methodology) for the full inventory.
- **This map is never combined with, or compared numerically against, Berlin's map** — see
  [methodology §6](/methodology)'s structural rule against pooled cross-city ranking.

---

<FooterNav />
