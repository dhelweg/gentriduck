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
  where it actually belongs. That was the only reason this page carried a `variant` ("Data")
  dropdown and a `bzr` option on `area_level` -- `gentrification_index` has no `live_data`+`bzr`
  combination (see the now-removed warning Alert this page used to show for exactly that gap), so
  once `standard` left, `variant` had nothing left to select between and `area_level` had only
  `plr` left. Rather than ship a single-option dropdown, both are now hardcoded (`live_data`/
  `plr`) and their `<Dropdown>`s removed; #310 will reintroduce a real `area_level` picker once it
  adds new *live_data*-backed levels (Bezirk/PGR/Ortsteil) to this mart -- out of scope here.
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
  $: areaTooltip = [
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

Pick an indicator below.

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

<Dropdown name="indicator" title="Indicator" defaultValue="status_class">
  <DropdownOption value="status_class" valueLabel="Gentrification stage — plain-language, colour-coded"/>
  <DropdownOption value="status_index" valueLabel="Social status — how deprived or affluent (current snapshot)"/>
  <DropdownOption value="dynamism_index" valueLabel="Dynamism — how fast that status is changing"/>
</Dropdown>

```sql areas
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

<AreaMap
    data={areas}
    geoJsonUrl={`${base}/geo/plr_live_data.geojson`}
    geoId="area_code"
    areaCol="area_code"
    value={inputs.indicator.value === 'status_class' ? 'stage_label' : inputs.indicator.value}
    legendType={inputs.indicator.value === 'status_class' ? 'categorical' : 'scalar'}
    colorPalette={inputs.indicator.value === 'status_class' ? stageColorPalette : undefined}
    title="Berlin Planungsraum (PLR) — {inputs.indicator.label}, latest period"
    startingLat={52.52}
    startingLong={13.405}
    startingZoom={9}
    link="link"
    tooltip={areaTooltip}
/>

Click a Planungsraum on the map to open its exact neighbourhood page.

## The numbers behind the map

```sql area_table
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

<DataTable data={area_table} rows=10>
    <Column id=area_name title="Area"/>
    <Column id=status_index title="Social status (1=least deprived … 4=most deprived)"/>
    <Column id=dynamism_index title="Speed of change (higher = faster upward change)"/>
    <Column id=stage_label title="Gentrification stage"/>
</DataTable>

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
- This map covers Berlin's current, live data at Planungsraum (neighbourhood) detail only. The
  2018 thesis's Dec-2016-snapshot reproduction, at the coarser Bezirksregion level, has its own
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
