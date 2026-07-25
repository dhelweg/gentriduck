---
title: Maps — gentrification pressure by area
sidebar_position: 2
---

<!--
  I2 (#219): moved from /maps to /berlin/maps (city-folder navigation restructure — see
  docs/epic-i/I2-route-map.md). sidebar_position renumbered 12 -> 2 (scoped to this page's
  siblings under pages/berlin/, not the whole site; kept after time-series to preserve the
  pre-move relative order).

  I3 (#220): re-platformed onto the shared `<Hero>`/`<FooterNav>` components (plain `# ` heading
  and hand-copied `<sub>` footer line, both now standardized) and added an explicit "Honest
  caveats" section consolidating the cautions already stated inline in this page's Alerts (no new
  caveat -- see that section's own note).

  I16 (#233): colour-scale + label pass (display-only, no D1xD2/typology change). (1) Six-stage
  categorical palette swapped from a red->green ramp (not colorblind-safe: red-green confusion is
  the single most common CVD pattern) to ColorBrewer's RdYlBu-6 -- colorbrewer2.org classifies
  RdYlBu as colorblind-safe, and a local CVD-simulation check (Machado/Oliveira/Fairchild 2009
  matrices; script + output in the PR) confirms every adjacent-stop pair stays clearly separable
  under protanopia/deuteranopia/tritanopia (min pairwise distance improved from 0.025 to 0.252 for
  tritanopia, the old palette's worst case). Ordinal meaning (red=worst..blue=best) preserved, only
  the "best" hue moved from green to blue -- Alert copy below updated to match. (2) Both AreaMap
  tooltips now lead with `area_name` (bold) instead of the default `area_code`-first tooltip --
  nobody recognises their Kiez as a PLR ID; area_code stays as a de-emphasised secondary line for
  anyone cross-referencing the official code. Sourced from the same `areas` query already run
  below -- no geojson change, no payload delta. Scalar indicators (status_index, dynamism_index)
  keep Evidence's default single-hue sequential scale (light->dark blue): both are bounded ordinal
  ranges (1-4 / 1-3) with no meaningful zero/baseline to diverge around, and a single-hue ramp is
  inherently colorblind-safe (hue is constant; only lightness varies) -- geo-DS consulted, no
  change needed there.

  #309: carved the `standard`/`bzr` (2018 thesis, Dec 2016 snapshot) map out of this page entirely
  -- it now lives as a small, fixed map on /thesis-recheck, next to the six-hypothesis writeup,
  where it actually belongs.

  #310 (map granularity selector): reintroduces a real `area_level` picker, as #309's carve-out
  comment anticipated -- Planungsraum (PLR, the individual-neighbourhood leaf level, unchanged
  from #309) plus three new *rollup* levels sourced from `mart_area_rollup_stage_mix` (NOT from
  `gentrification_index` -- that mart's contract is unchanged by this ticket): Bezirk, Prognoseraum
  (PGR), Ortsteil. Per the #310 design decision (dual geo-DS + domain-expert pre-implementation
  review, see the issue's design-decision comment): a rollup level never shows a single re-derived
  typology label alone -- the map colours by the population-weighted PLURALITY ("dominant") stage,
  but every tooltip/table also always carries `dominant_share` (and an `is_dominant_fragile` flag
  when fewer than 3 real PLRs roll up into that area) right next to it, and the full
  population-weighted stage MIX for every area is one click away on that area's own profile page
  (`/berlin/area/bezirk/[code]`, `.../pgr/[code]`, `.../ortsteil/[code]`) as well as in the "Stage
  mix" table below the map -- never presented as a standalone re-scored index. `status_index`/
  `dynamism_index` at a rollup level are the population-weighted MEAN of the same D1/D2 ordinals
  PLR-level values carry (mart_area_rollup_stage_mix.status_index_weighted_mean /
  dynamism_index_weighted_mean) -- see that mart's header for the weighting method and the
  documented population-completeness caveat (`has_incomplete_population`).
-->

<script>
  // basePath-aware asset URL (#144): AreaMap fetches `geoJsonUrl` verbatim, and its click-through
  // `link` column does a raw `window.location.href = link` (EvidenceMap.js) -- unlike Evidence's
  // own nav/DataTable links, NEITHER prepends the base path -- so on the GitHub Pages project site
  // (served under /gentriduck) a bare "/geo/..." 404s (empty map) and a bare "/berlin/area/..."
  // 404s on click-through. Prepend SvelteKit's `base` (= deployment.basePath in the build; ""
  // when served at root in dev) to both -- `${base}` is interpolated directly into the `link`
  // column's SQL literal below, the same templating mechanism used for `${inputs...}`.
  import { base } from '$app/paths';

  // #152/#233 (I16): intuitive "worse -> red, best -> blue" ramp for the six-stage typology.
  // EvidenceMap assigns categorical colours positionally by first-occurrence order in the query
  // result (see AreaMap's underlying EvidenceMap.js handleLegendValues/initializeData) -- the
  // `areas` query below is ordered by `stage_sort` (most acute gentrification-pressure stage
  // first) precisely so that ordering lines up with this palette. ColorBrewer RdYlBu-6
  // (colorblind-safe per colorbrewer2.org); replaces the pre-I16 red->green ramp, which put the
  // two ends of the scale on exactly the hue pair most CVD types confuse. Display-only: does not
  // touch the D1xD2 typology_stage classification or its thresholds (int_gentrification_ts.sql,
  // ADR-0008).
  const stageColorPalette = ['#d73027', '#fc8d59', '#fee090', '#e0f3f8', '#91bfdb', '#4575b4'];

  // #233 (I16): tooltip leads with the human place name instead of Areas.svelte's default
  // areaCol-first tooltip (which would show the bare PLR/BZR area_code) -- area_name is already
  // selected by the `areas` query below via dim_area, so this is a display-only reorder, no new
  // join. area_code kept, de-emphasised, as a secondary line.
  //
  // Maintainer report (2026-07-24): the tooltip's field title originally reused
  // `inputs.indicator.label` -- the same string as the <DropdownOption valueLabel=...> text,
  // e.g. "Gentrification stage — plain-language, colour-coded". That full descriptive form is
  // appropriate for a one-time dropdown choice but unreadable repeated on every map hover, so the
  // tooltip now uses this short, indicator-only label instead; the dropdown's own longer-form
  // valueLabel is untouched.
  const indicatorShortLabel = {
    status_class: 'Gentrification stage',
    status_index: 'Social status',
    dynamism_index: 'Dynamism'
  };

  // #310: which mart/area_level combination is currently selected. 'plr' is the individual-
  // neighbourhood leaf level (gentrification_index, unchanged from #309); the other three are
  // rollup levels (mart_area_rollup_stage_mix) -- see this page's header comment.
  $: isRollup = inputs.area_level.value !== 'plr';

  // #310: geometry file + human label per area_level -- pgr_lor2021.geojson/bezirk_lor2021.geojson
  // (OA-D7, #240) and ortsteil_self.geojson (#308) are geometry-only exports already published for
  // other pages; reused verbatim here (no new export needed for Berlin -- see model header of
  // web/scripts/export_area_geojson.py's export_oa_arealevel_geometry()/export_ortsteil_self_geometry()).
  const geoJsonByLevel = {
    plr: 'plr_live_data.geojson',
    pgr: 'pgr_lor2021.geojson',
    bezirk: 'bezirk_lor2021.geojson',
    ortsteil: 'ortsteil_self.geojson'
  };
  const areaLevelLabel = {
    plr: 'Planungsraum (PLR)',
    pgr: 'Prognoseraum (PGR)',
    bezirk: 'Bezirk',
    ortsteil: 'Ortsteil'
  };
  $: geoJsonUrl = `${base}/geo/${geoJsonByLevel[inputs.area_level.value]}`;

  // #310: rollup rows carry dominant_share/is_dominant_fragile/n_habitable_children alongside the
  // usual indicator value -- always shown together (design point 3: never a standalone label).
  $: areaTooltip = isRollup
    ? [
        { id: 'area_name', showColumnName: false, valueClass: 'font-bold text-sm', fmt: 'id' },
        {
          id: inputs.indicator.value === 'status_class' ? 'stage_label' : inputs.indicator.value,
          title: indicatorShortLabel[inputs.indicator.value],
          fmt: inputs.indicator.value === 'status_class' ? 'id' : 'num1'
        },
        { id: 'dominant_share', title: 'Population share of dominant stage', fmt: 'pct0' },
        { id: 'n_habitable_children', title: 'Constituent areas with data', fmt: 'id' },
        { id: 'area_code', title: 'Area code', valueClass: 'text-xs opacity-60', fmt: 'id' }
      ]
    : [
        { id: 'area_name', showColumnName: false, valueClass: 'font-bold text-sm', fmt: 'id' },
        {
          id: inputs.indicator.value === 'status_class' ? 'stage_label' : inputs.indicator.value,
          title: indicatorShortLabel[inputs.indicator.value],
          fmt: inputs.indicator.value === 'status_class' ? 'id' : 'num1'
        },
        { id: 'area_code', title: 'Area code', valueClass: 'text-xs opacity-60', fmt: 'id' }
      ];
</script>

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Maps — gentrification pressure by area" lede="Colours each of Berlin's neighbourhoods by its current gentrification-pressure signal, so you can see at a glance which parts of the city show the strongest or weakest pressure." />

Pick an area level and an indicator below.

Right now this map covers Berlin only — Hamburg's boundaries are ready behind the scenes, but the
underlying index doesn't have real Hamburg numbers yet
([#125](https://github.com/dhelweg/gentriduck/issues/125)), so the area picker stays Berlin-only
for now.

<Alert status="info">
  <b>How to read the map:</b> The <b>"Gentrification stage"</b> option is the easiest to read at a
  glance — it colours each area by one of six plain-language stages (red = highest pressure /
  earliest displacement risk, blue = most stable), no decoder needed — hover any area for its name
  and value. The <b>"Social status"</b>
  and <b>"Dynamism"</b> options show the raw ordinal inputs behind that stage: "Social status" is
  ordinal — higher shading means <b>more deprived</b>, not more prosperous. "Dynamism" — higher
  means the area's status is improving <b>faster</b>. A <b>negative</b> pressure trend (see the
  table below the map) means <b>higher</b> gentrification pressure. See the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md">index definition</a>
  for the full methodology, or the <a href="/methodology">methodology & data sources</a> page for a
  plain-language walkthrough. Areas without a value (e.g. uninhabited planning areas) are drawn but
  left blank.
</Alert>

<Dropdown name="area_level" title="Area level" defaultValue="plr">
  <DropdownOption value="plr" valueLabel="Planungsraum (PLR) — individual neighbourhoods"/>
  <DropdownOption value="bezirk" valueLabel="Bezirk — 12 boroughs"/>
  <DropdownOption value="pgr" valueLabel="Prognoseraum (PGR) — ~58 mid-level areas"/>
  <DropdownOption value="ortsteil" valueLabel="Ortsteil — ~97 traditional neighbourhoods"/>
</Dropdown>

{#if isRollup}
<Alert status="info">
  <b>Bezirk / PGR / Ortsteil are population-weighted rollups of the PLR-level data</b> — never a
  re-scored index at this grain (averaging the underlying 1-4/1-3 MSS ordinals into a single new
  category would be statistically invalid; see the
  <a href="https://github.com/dhelweg/gentriduck/issues/310">#310 design decision</a>). The map
  colours by the <b>dominant (most common) stage</b> among that area's constituent PLRs, weighted
  by population — its tooltip and the tables below always show the dominant stage's population
  <b>share</b> alongside it, and the "Stage mix" table further down shows the full breakdown, never
  just the single dominant label. Areas with fewer than 3 PLRs with real data are flagged as a
  fragile ("small sample") dominant reading.
</Alert>
{/if}

<Dropdown name="indicator" title="Indicator" defaultValue="status_class">
  <DropdownOption value="status_class" valueLabel="Gentrification stage — plain-language, colour-coded"/>
  <DropdownOption value="status_index" valueLabel="Social status — how deprived or affluent (current snapshot)"/>
  <DropdownOption value="dynamism_index" valueLabel="Dynamism — how fast that status is changing"/>
</Dropdown>

```sql areas_plr
-- #152: stage_label is the de-jargoned, human-readable form of status_class (typology_stage
-- from int_gentrification_ts's D1xD2 matrix, ADR-0008 -- no thresholds touched here, just a
-- friendlier string). stage_sort orders rows by gentrification-pressure severity (most acute
-- first) so EvidenceMap's categorical legend -- which assigns colours positionally by
-- first-occurrence order in `data` (see AreaMap's underlying EvidenceMap.js
-- handleLegendValues/initializeData) -- lines up with the fixed "worse -> red" colorPalette
-- passed to <AreaMap> below, regardless of DuckDB's natural row order. Ordering rationale
-- (Dangschat 1988 double invasion-succession cycle; Döring & Ulbricht 2016 vulnerability
-- framework -- both cited in int_gentrification_ts.sql):
--   1 active-gentrification  -- mid-status area improving fastest: gentrification in motion.
--   2 pioneer-signal         -- low-status area improving fast: earliest displacement signal.
--   3 improving-vulnerable   -- most-deprived area improving: vulnerable population, watch.
--   4 pre-gentrification     -- early/mixed signals (filtering-down or nascent upgrading).
--   5 consolidation-pressure -- already-affluent area still intensifying: lower urgency.
--   6 stable-established     -- no material status change: least pressure.
select
    city_code,
    area_code,
    area_name,
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
    end as stage_sort,
    -- Drill-down click-through target (#133 G1d, exact-code fix #150): /berlin/area/[code]
    -- queries fct_gentrification_change etc. on lor_2021 (current, 542-PLR) area codes, which
    -- this `live_data`/`plr` query always returns -- see #309 for why the `standard` variant
    -- (pre-2021 codes, no click-through) no longer appears on this page at all.
    '${base}/berlin/area/' || area_code as link
from gentriduck_marts.gentrification_index
where variant = 'live_data'
  and area_level = 'plr'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by stage_sort
```

```sql areas_rollup
-- #310: one row per rollup area (bezirk/pgr/ortsteil), picked deterministically from
-- mart_area_rollup_stage_mix's per-(area, typology_stage) grain via QUALIFY -- dominant_stage,
-- dominant_share, status_index_weighted_mean, dynamism_index_weighted_mean, n_habitable_children,
-- is_dominant_fragile and has_incomplete_population are all CONSTANT across an area's stage rows
-- (see that mart's header), so any single row carries them; the row itself is not otherwise used
-- (the "Stage mix" table further down this page queries the full per-stage grain separately).
-- Bezirk has no area_name in dim_area (mart_area_rollup_stage_mix's own documented gap) -- the
-- same fixed 12-entry fallback web/scripts/export_area_geojson.py's BEZIRK_NAMES already uses for
-- this mart's geojson counterpart is reused here so the tooltip/table isn't blank for Bezirk.
select
    city_code,
    area_code,
    coalesce(
        area_name,
        case area_code
            when '01' then 'Mitte'
            when '02' then 'Friedrichshain-Kreuzberg'
            when '03' then 'Pankow'
            when '04' then 'Charlottenburg-Wilmersdorf'
            when '05' then 'Spandau'
            when '06' then 'Steglitz-Zehlendorf'
            when '07' then 'Tempelhof-Schöneberg'
            when '08' then 'Neukölln'
            when '09' then 'Treptow-Köpenick'
            when '10' then 'Marzahn-Hellersdorf'
            when '11' then 'Lichtenberg'
            when '12' then 'Reinickendorf'
            else area_code
        end
    ) as area_name,
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
    end as stage_sort,
    -- Rollup profile pages (all pre-existing routes): /berlin/area/<level>/<code>.
    '${base}/berlin/area/${inputs.area_level.value}/' || area_code as link
from gentriduck_marts.mart_area_rollup_stage_mix
where area_level = '${inputs.area_level.value}'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${inputs.area_level.value}' and city_code = 'BER'
  )
qualify row_number() over (partition by area_code order by typology_stage) = 1
order by stage_sort
```

<AreaMap
    data={isRollup ? areas_rollup : areas_plr}
    geoJsonUrl={geoJsonUrl}
    geoId="area_code"
    areaCol="area_code"
    value={inputs.indicator.value === 'status_class' ? 'stage_label' : inputs.indicator.value}
    legendType={inputs.indicator.value === 'status_class' ? 'categorical' : 'scalar'}
    colorPalette={inputs.indicator.value === 'status_class' ? stageColorPalette : undefined}
    title="Berlin {areaLevelLabel[inputs.area_level.value]} — {inputs.indicator.label}, latest period"
    startingLat={52.52}
    startingLong={13.405}
    startingZoom={9}
    link="link"
    tooltip={areaTooltip}
/>

Click an area on the map to open its exact {isRollup ? 'profile' : 'neighbourhood'} page.

## The numbers behind the map

```sql area_table_plr
select
    area_name,
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
where variant = 'live_data'
  and area_level = 'plr'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
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
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${inputs.area_level.value}' and city_code = 'BER'
  )
qualify row_number() over (partition by area_code order by typology_stage) = 1
order by dynamism_index_weighted_mean desc
```

{#if isRollup}

<DataTable data={area_table_rollup} rows=10>
    <Column id=area_name title="Area"/>
    <Column id=status_index title="Social status (1=least deprived … 4=most deprived, population-weighted mean)"/>
    <Column id=dynamism_index title="Speed of change (population-weighted mean)"/>
    <Column id=stage_label title="Dominant gentrification stage"/>
    <Column id=dominant_share title="Dominant stage's population share" fmt="pct0"/>
    <Column id=n_habitable_children title="PLRs with data"/>
    <Column id=is_dominant_fragile title="Fragile (< 3 PLRs)?"/>
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
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${inputs.area_level.value}' and city_code = 'BER'
  )
order by area_name, stage_population_share desc nulls last
```

<DataTable data={area_mix_table} rows=10 search=true>
    <Column id=area_name title="Area"/>
    <Column id=typology_stage title="Stage"/>
    <Column id=stage_population_share title="Population share" fmt="pct0"/>
    <Column id=stage_n_children title="Constituent PLRs"/>
</DataTable>

{:else}

<DataTable data={area_table_plr} rows=10>
    <Column id=area_name title="Area"/>
    <Column id=status_index title="Social status (1=least deprived … 4=most deprived)"/>
    <Column id=dynamism_index title="Speed of change (higher = faster upward change)"/>
    <Column id=stage_label title="Gentrification stage"/>
</DataTable>

{/if}

Want to see how one specific area has changed over the years? Use the
[time series page](/berlin/time-series). Clicking a Planungsraum (PLR) on the map above opens its
exact neighbourhood page ([#133](https://github.com/dhelweg/gentriduck/issues/133),
[#150](https://github.com/dhelweg/gentriduck/issues/150)); browsing by district still works on the
[area detail page](/berlin/area-detail). Want the commercial-mix (shops/cafés) view instead of the
social-status index -- POI density and Offering Advantage by domain -- see the
[POI & Offering Advantage map](/berlin/poi-map). Looking for the 2018 thesis reproduction's
Bezirksregion (BZR) map instead? It now lives on
[the 2018 thesis, re-checked](/thesis-recheck).

## Honest caveats

- **Social status and dynamism are ordinal, not linear.** Higher social-status shading means
  **more deprived**, not more prosperous; a negative pressure trend means **higher** gentrification
  pressure — see the alert above the map and [methodology & data sources](/methodology) for the
  full decoder.
- **Bezirk / PGR / Ortsteil are population-weighted rollups, never a re-scored index.** The map
  colours by the population-weighted *dominant* stage among each area's constituent PLRs — always
  shown with its population share and the full stage mix (see the "Stage mix" table), never as a
  standalone label. Areas with fewer than 3 PLRs contributing real data are flagged fragile.
- This map's Planungsraum (PLR) level covers Berlin's current, live data at neighbourhood detail.
  The 2018 thesis's Dec-2016-snapshot reproduction, at the coarser Bezirksregion level, has its own
  fixed map on [the 2018 thesis, re-checked](/thesis-recheck).
- Areas without a value (e.g. uninhabited planning areas) are drawn but left blank — a blank area
  is missing data, not a "zero pressure" reading.

## Where next

- **[Time series](/berlin/time-series)** — how one specific area, or the whole city, has moved
  over the years.
- **[Area detail](/berlin/area-detail)** — browse by district, or open one neighbourhood's full
  profile via a map click.
- **[POI & Offering Advantage map](/berlin/poi-map)** — the commercial-mix (shops/cafés) view of
  the same neighbourhoods.
- **[The 2018 thesis, re-checked](/thesis-recheck)** — the fixed 2018 thesis reproduction map
  (Bezirksregion, Dec 2016 snapshot) and six-hypothesis writeup.
- **[Methodology & data sources](/methodology)** — what "gentrification pressure" and the six-stage
  typology mean.

---

<FooterNav />
