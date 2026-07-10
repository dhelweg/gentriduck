---
title: Maps — gentrification pressure by area
sidebar_position: 12
---

<script>
  // basePath-aware asset URL (#144): AreaMap fetches `geoJsonUrl` verbatim, and its click-through
  // `link` column does a raw `window.location.href = link` (EvidenceMap.js) -- unlike Evidence's
  // own nav/DataTable links, NEITHER prepends the base path -- so on the GitHub Pages project site
  // (served under /gentriduck) a bare "/geo/..." 404s (empty map) and a bare "/area/..." 404s on
  // click-through. Prepend SvelteKit's `base` (= deployment.basePath in the build; "" when served
  // at root in dev) to both -- `${base}` is interpolated directly into the `link` column's SQL
  // literal below, the same templating mechanism used for `${inputs...}`.
  import { base } from '$app/paths';

  // #152: fixed, intuitive "worse -> red" ramp for the six-stage typology. EvidenceMap assigns
  // categorical colours positionally by first-occurrence order in the query result (see AreaMap's
  // underlying EvidenceMap.js handleLegendValues/initializeData) -- the `areas` query below is
  // ordered by `stage_sort` (most acute gentrification-pressure stage first) precisely so that
  // ordering lines up with this palette. Display-only: does not touch the D1xD2 typology_stage
  // classification or its thresholds (int_gentrification_ts.sql, ADR-0008).
  const stageColorPalette = ['#dc2626', '#f97316', '#f4b548', '#eab308', '#a3e635', '#16a34a'];
</script>

# Maps — gentrification pressure by area

This map colours each of Berlin's neighbourhoods by its current gentrification-pressure signal, so
you can see at a glance which parts of the city show the strongest or weakest pressure. Pick a map
level and an indicator below.

Right now this map covers Berlin only — Hamburg's boundaries are ready behind the scenes, but the
underlying index doesn't have real Hamburg numbers yet
([#125](https://github.com/dhelweg/gentriduck/issues/125)), so the area picker stays Berlin-only
for now.

<Alert status="info">
  <b>How to read the map:</b> The <b>"Gentrification stage"</b> option is the easiest to read at a
  glance — it colours each area by one of six plain-language stages (red = highest pressure /
  earliest displacement risk, green = most stable), no decoder needed. The <b>"Social status"</b>
  and <b>"Dynamism"</b> options show the raw ordinal inputs behind that stage: "Social status" is
  ordinal — higher shading means <b>more deprived</b>, not more prosperous. "Dynamism" — higher
  means the area's status is improving <b>faster</b>. A <b>negative</b> pressure trend (see the
  table below the map) means <b>higher</b> gentrification pressure. See the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md">index definition</a>
  for the full methodology, or the <a href="/methodology">methodology & data sources</a> page for a
  plain-language walkthrough. Areas without a value (e.g. uninhabited planning areas) are drawn but
  left blank.
</Alert>

<Dropdown name="variant" title="Data" defaultValue="live_data">
  <DropdownOption value="live_data" valueLabel="Live data (latest MSS editions, 2013–2025)"/>
  <DropdownOption value="standard" valueLabel="2018 thesis reproduction (Dec 2016 snapshot)"/>
</Dropdown>

<Dropdown name="area_level" title="Area level" defaultValue="plr">
  <DropdownOption value="bzr" valueLabel="Bezirksregion (BZR) — 2018 thesis reproduction only"/>
  <DropdownOption value="plr" valueLabel="Planungsraum (PLR)"/>
</Dropdown>

{#if inputs.variant.value === 'live_data' && inputs.area_level.value === 'bzr'}
<Alert status="warning">
  The "Live data" option only has neighbourhood-level (Planungsraum) detail — there's no wider
  Bezirksregion view for it yet. Switch "Area level" to Planungsraum, or "Data" to the 2018 thesis
  reproduction, to see a Bezirksregion map.
</Alert>
{/if}

<Dropdown name="indicator" title="Indicator" defaultValue="status_class">
  <DropdownOption value="status_class" valueLabel="Gentrification stage — plain-language, colour-coded (Live data + Planungsraum only)"/>
  <DropdownOption value="status_index" valueLabel="Social status — how deprived or affluent (current snapshot)"/>
  <DropdownOption value="dynamism_index" valueLabel="Dynamism — how fast that status is changing"/>
</Dropdown>

{#if inputs.indicator.value === 'status_class' && (inputs.variant.value !== 'live_data' || inputs.area_level.value !== 'plr')}
<Alert status="warning">
  "Gentrification stage" is only available for "Live data" at the Planungsraum level — the six-stage
  typology isn't computed for the 2018 thesis reproduction or the Bezirksregion aggregate. Switch
  "Data" to Live data and "Area level" to Planungsraum to use it, or pick "Social status" /
  "Dynamism" above.
</Alert>
{/if}

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
    -- Drill-down click-through target (#133 G1d, exact-code fix #150): only wire the link for
    -- `live_data`, since /area/[code] queries fct_gentrification_change etc. on lor_2021 (current,
    -- 542-PLR) area codes -- the `standard` (2018 thesis, 447-PLR pre-2021) variant's codes don't
    -- resolve there. Only the PLR branch below actually renders this as a link.
    case
        when '${inputs.variant.value}' = 'live_data' then '${base}/area/' || area_code
    end as link
from gentriduck_marts.gentrification_index
where variant = '${inputs.variant.value}'
  and area_level = '${inputs.area_level.value}'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = '${inputs.variant.value}' and area_level = '${inputs.area_level.value}'
  )
order by stage_sort
```

{#if inputs.area_level.value === 'plr'}

<!-- #149: `standard` and `live_data` sit on opposite sides of Berlin's 2021 area-boundary
     redraw (447 pre-2021 PLR vs. 542 current PLR) -- picking the geojson by variant keeps
     the boundaries in sync with whichever area codes the query above actually returns. -->
<AreaMap
    data={areas}
    geoJsonUrl={`${base}/geo/plr_${inputs.variant.value}.geojson`}
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
/>

{#if inputs.variant.value === 'live_data'}

Click a Planungsraum on the map to open its exact neighbourhood page.

{/if}
{#if inputs.variant.value !== 'live_data'}

Click-through is only available for "Live data" — the 2018 thesis reproduction uses Berlin's
pre-2021 area codes, which the per-area page doesn't cover. Switch "Data" above, or browse by
district on the [area detail page](/area-detail).

{/if}

{:else}

<!-- #149: BZR only has `standard`-variant data (see the warning above), so the geoJsonUrl
     stays fixed to that vintage regardless of the selected variant -- there's no
     `bzr_live_data.geojson` to switch to yet. -->
<AreaMap
    data={areas}
    geoJsonUrl={`${base}/geo/bzr_standard.geojson`}
    geoId="area_code"
    areaCol="area_code"
    value={inputs.indicator.value === 'status_class' ? 'stage_label' : inputs.indicator.value}
    legendType={inputs.indicator.value === 'status_class' ? 'categorical' : 'scalar'}
    colorPalette={inputs.indicator.value === 'status_class' ? stageColorPalette : undefined}
    title="Berlin Bezirksregion (BZR) — {inputs.indicator.label}, latest period"
    startingLat={52.52}
    startingLong={13.405}
    startingZoom={9}
/>

{/if}

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
where variant = '${inputs.variant.value}'
  and area_level = '${inputs.area_level.value}'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = '${inputs.variant.value}' and area_level = '${inputs.area_level.value}'
  )
order by dynamism_index desc
```

<DataTable data={area_table} rows=10>
    <Column id=area_name title="Area"/>
    <Column id=status_index title="Social status (1=least deprived … 4=most deprived)"/>
    <Column id=dynamism_index title="Speed of change (higher = faster upward change)"/>
    <Column id=stage_label title="Gentrification stage (Live data + Planungsraum only)"/>
</DataTable>

Want to see how one specific area has changed over the years? Use the
[time series page](/time-series). Clicking a Planungsraum (PLR) on the map above opens its
exact neighbourhood page ([#133](https://github.com/dhelweg/gentriduck/issues/133),
[#150](https://github.com/dhelweg/gentriduck/issues/150)) when viewing "Live data"; the
Bezirksregion map above is view-only for now, and browsing by district still works on the
[area detail page](/area-detail). Want the commercial-mix (shops/cafés) view instead of the
social-status index -- POI density and Offering Advantage by domain -- see the
[POI & Offering Advantage map](/poi-map).

---

<sub>[Home](/) · [Methodology & data sources](/methodology) · [About this project](/about) · [GitHub repository](https://github.com/dhelweg/gentriduck)</sub>
