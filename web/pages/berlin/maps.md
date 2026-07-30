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

  #310 dual sign-off fixes (2026-07-30, both PASS WITH CONCERNS, blocking -- see
  docs/epic-e/310-map-granularity-geo-signoff.md and .../310-map-granularity-domain-signoff.md):
  D1 (domain, blocking) -- the Indicator dropdown below no longer offers status_index/
  dynamism_index at rollup grain at all (option (a), the cheaper of the sign-off's two remedies) --
  a population-weighted MEAN of the D1/D2 ordinals, coloured and ranked as a coarse-grain map
  indicator, is exactly what the standing #267 domain decision (docs/epic-i/
  I-coarse-index-domain-decision.md) forbids. Those scalars remain available, plainly labelled a
  "mean ordinal class (mean rank)" per the geo-DS's C1, in the numbers-behind-the-map table (no
  longer used to *sort* that table either -- see area_table_rollup's own header comment). D2
  (domain, blocking) -- "population share" labels are now conditional/neutral, not an unconditional
  claim -- see the areaTooltip/DataTable column comments below. D3 (domain, blocking) -- both the
  rollup Alert and Honest-caveats section now state the *direction* of the aggregation artefact:
  coarser levels resolve toward the most common AND LEAST ACUTE stage, so a "Stable, established"
  reading is not evidence pressure is absent. D4 (domain, blocking) -- a composition counterweight
  (`acute_stage_share`, the combined population share of active-gentrification + pioneer-signal +
  improving-vulnerable) is now computed page-side (sum over already-published mix rows, no mart
  change) and shown next to the dominant-stage colour/label in both the tooltip and the table. C5
  (geo, blocking) -- the Ortsteil dominant-overlap approximation is now disclosed. R-310-1/R-310-5
  (both non-blocking, applied anyway) -- the Stage-mix table is de-jargoned and its row cap raised;
  reader-facing copy now prefers "most widespread stage" over "dominant stage" (internal column
  keys like `dominant_stage`/`dominant_share`/`is_dominant_fragile` are untouched -- this is a
  copy-only rename, not a mart or schema change).
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
  // ColorBrewer RdYlBu-6 (colorblind-safe per colorbrewer2.org); replaces the pre-I16 red->green
  // ramp, which put the two ends of the scale on exactly the hue pair most CVD types confuse.
  // Display-only: does not touch the D1xD2 typology_stage classification or its thresholds
  // (int_gentrification_ts.sql, ADR-0008).
  //
  // #310 review fix (HIGH-1): EvidenceMap assigns this ramp POSITIONALLY over the DISTINCT
  // indicator values present in the `data` array actually passed to <AreaMap>, in first-occurrence
  // order -- see @evidence-dev/core-components' EvidenceMap.js: `handleLegendValues()` computes
  // `values = [...new Set(data.map(d => d[value]))]`, and `handleFillColor()` then looks up
  // `colorPalette[values.indexOf(item[value])]`. At the PLR leaf grain all six stages are always
  // present, so a flat 6-entry array happened to line up 1:1 with `stage_sort` order below -- but
  // at a rollup level (Bezirk/PGR/Ortsteil) typically only a SUBSET of the six stages occurs, so
  // the same palette slot silently gets reassigned to a different (often much less severe) stage
  // -- e.g. a Bezirk where every constituent PLR happens to be 'stable-established' would render
  // solid RED (palette index 0), inverting this page's own "red = highest pressure" legend/Alert.
  // Fix: a fixed stage_label -> hex lookup (`stageColorByLabel`) plus `presentStagePalette()`,
  // which derives the colorPalette array from the CURRENT query result's own distinct stage_label
  // values in first-occurrence order -- the exact same `[...new Set(data.map(d => d[value]))]`
  // derivation EvidenceMap.js performs -- so `colorPalette[i]` always names the same stage
  // `values[i]` will resolve to, regardless of how many/which stages are present at the selected
  // area_level. (The `areas_plr`/`areas_rollup` queries below stay ordered by `stage_sort` --
  // most-acute-first -- purely so first-occurrence order is deterministic/readable, not because
  // EvidenceMap itself requires it any more.)
  const stageColorByLabel = {
    'Active gentrification': '#d73027',
    'Early pioneer signal': '#fc8d59',
    'Improving, vulnerable area': '#fee090',
    'Pre-gentrification watch': '#e0f3f8',
    'Consolidated, still intensifying': '#91bfdb',
    'Stable, established': '#4575b4'
  };

  function presentStagePalette(rows) {
    const seen = new Set();
    const palette = [];
    for (const row of rows ?? []) {
      const label = row?.stage_label;
      if (label != null && !seen.has(label) && label in stageColorByLabel) {
        seen.add(label);
        palette.push(stageColorByLabel[label]);
      }
    }
    return palette;
  }

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

  // #310 review fix (D1 -- domain sign-off blocking): a population-weighted MEAN of the
  // status_index/dynamism_index ordinals, coloured and ranked as a coarse-grain map indicator, is
  // a domain FAIL under the standing #267 decision (docs/epic-i/I-coarse-index-domain-decision.md
  // -- "never presented, coloured, or ordered ... a central-tendency point value remains a domain
  // FAIL"; see 310-map-granularity-domain-signoff.md section (b)). Remedy: the Indicator dropdown
  // itself is not rendered at rollup grain at all (see the <Dropdown name="indicator"> block
  // below) -- but Evidence's Dropdown/input store deliberately PERSISTS a value across area_level
  // changes (so a PLR-grain choice survives a round trip through a rollup level and back), so a
  // stale inputs.indicator.value of 'status_index'/'dynamism_index' left over from a previous PLR
  // view can still be sitting in the store while the dropdown UI is hidden. `effectiveIndicator`/
  // `effectiveIndicatorLabel` are the single source of truth every render path below uses instead
  // of reading inputs.indicator.* directly, so that stale value can never leak into the rollup
  // map/tooltip/table.
  $: effectiveIndicator = isRollup ? 'status_class' : inputs.indicator.value;
  $: effectiveIndicatorLabel = isRollup
    ? 'Gentrification stage — plain-language, colour-coded'
    : inputs.indicator.label;

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
  // #310 review fix (MEDIUM-3/MEDIUM-4): `fragile_note`/`population_note` (computed in the
  // `areas_rollup` query below) surface `is_dominant_fragile`/`has_incomplete_population` inline
  // -- blank when the flag is false, the caveat sentence when true -- rather than silently
  // omitting them from the tooltip.
  $: areaTooltip = isRollup
    ? [
        { id: 'area_name', showColumnName: false, valueClass: 'font-bold text-sm', fmt: 'id' },
        // #310 review fix (D1): always stage_label/'Most widespread stage' here -- the Indicator
        // dropdown no longer offers status_index/dynamism_index at rollup grain (see
        // effectiveIndicator above), so this branch no longer needs to branch on it at all.
        { id: 'stage_label', title: 'Most widespread stage', fmt: 'id' },
        // #310 review fix (D2 -- domain sign-off blocking, R-310-5): "Population share of
        // dominant stage" was an unconditional claim, false wherever has_incomplete_population is
        // true (today: the whole Hamburg rollup surface -- see hamburg/maps.md) -- neutral label
        // here; the population_note line below states, per-row, whenever THIS area fell back to
        // equal weighting.
        { id: 'dominant_share', title: "Most widespread stage's share", fmt: 'pct0' },
        // #310 review fix (D4 -- domain sign-off blocking): composition counterweight, computed
        // in the areas_rollup query below as a sum over already-published stage_population_share
        // rows (no mart change) -- the share of residents in the three most acute stages
        // (active-gentrification + pioneer-signal + improving-vulnerable), shown in the same
        // visual unit as the fill colour/most-widespread-stage label so a reader can't mistake a
        // "Stable, established" plurality for an all-clear (see the domain sign-off's Neukölln/
        // Spandau frontier-inversion finding, and the D3 caveat below).
        { id: 'acute_stage_share', title: 'Residents in an acute-pressure stage', fmt: 'pct0' },
        { id: 'n_habitable_children', title: 'Constituent areas with data', fmt: 'id' },
        {
          id: 'fragile_note',
          showColumnName: false,
          valueClass: 'text-xs text-amber-700',
          fmt: 'id'
        },
        {
          id: 'population_note',
          showColumnName: false,
          valueClass: 'text-xs text-amber-700',
          fmt: 'id'
        },
        { id: 'area_code', title: 'Area code', valueClass: 'text-xs opacity-60', fmt: 'id' }
      ]
    : [
        { id: 'area_name', showColumnName: false, valueClass: 'font-bold text-sm', fmt: 'id' },
        {
          id: effectiveIndicator === 'status_class' ? 'stage_label' : effectiveIndicator,
          title: indicatorShortLabel[effectiveIndicator],
          fmt: effectiveIndicator === 'status_class' ? 'id' : 'num1'
        },
        { id: 'area_code', title: 'Area code', valueClass: 'text-xs opacity-60', fmt: 'id' }
      ];
</script>

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Maps — gentrification pressure by area" lede="Colours each of Berlin's neighbourhoods by its current gentrification-pressure signal, so you can see at a glance which parts of the city show the strongest or weakest pressure." />

Pick an area level and an indicator below.

This page covers Berlin. See [Hamburg's own maps page](/hamburg/maps) for the same view scoped to
Hamburg's own indicators, area levels, and observation window.

<Alert status="info">
  <b>How to read the map:</b> The <b>"Gentrification stage"</b> option is the easiest to read at a
  glance — it colours each area by one of six plain-language stages (red = highest pressure /
  earliest displacement risk, blue = most stable), no decoder needed — hover any area for its name
  and value. At the Planungsraum (PLR) level, the <b>"Social status"</b> and <b>"Dynamism"</b>
  options are also offered, showing the raw ordinal inputs behind that stage (not offered as a map
  colour at Bezirk/PGR/Ortsteil grain — see the Indicator note there for why): "Social status" is
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
  <DropdownOption value="ortsteil" valueLabel="Ortsteil — ~97 traditional neighbourhoods (approximate assignment, see caveats)"/>
</Dropdown>

{#if isRollup}
<Alert status="info">
  <b>Bezirk / PGR / Ortsteil are population-weighted rollups of the PLR-level data</b> — never a
  re-scored index at this grain (averaging the underlying 1-4/1-3 MSS ordinals into a single new
  category would be statistically invalid; see the
  <a href="https://github.com/dhelweg/gentriduck/issues/310">#310 design decision</a>). The map
  colours by the <b>most widespread ("dominant") stage</b> among that area's constituent PLRs,
  weighted by population where available — its tooltip and the tables below always show that
  stage's <b>share</b> alongside it (population-weighted where possible, equal-weighted as a
  flagged fallback otherwise), and the "Stage mix" table further down shows the full breakdown,
  never just the single most-widespread label. Areas with fewer than 3 PLRs with real data are
  flagged as a fragile ("small sample") reading. Where population data is missing for some or all
  of an area's constituent PLRs, that area falls back to <b>equal</b> weighting rather than true
  population weighting — flagged per-area as "population data incomplete" in the table and map
  tooltip below.
</Alert>
<Alert status="warning">
  <b>A "Stable, established" reading at this grain is not evidence that pressure is absent.</b>
  Plurality voting resolves an area to whichever stage is most widespread among its constituent
  PLRs — and because "Stable, established" is, by construction, the most common and <b>least
  acute</b> stage citywide, coarser levels are systematically biased toward reading as calm, not
  toward neutral noise. An area whose map colour reads "Stable, established" can still contain
  neighbourhoods under active gentrification pressure; this map alone cannot show you whether it
  does. The share of residents in an acute-pressure stage (in the tooltip and table below) and the
  Planungsraum (PLR) level — the finest grain this site publishes — are where that pressure is
  actually locatable.
</Alert>
{/if}

{#if !isRollup}
<Dropdown name="indicator" title="Indicator" defaultValue="status_class">
  <DropdownOption value="status_class" valueLabel="Gentrification stage — plain-language, colour-coded"/>
  <DropdownOption value="status_index" valueLabel="Social status — how deprived or affluent (current snapshot)"/>
  <DropdownOption value="dynamism_index" valueLabel="Dynamism — how fast that status is changing"/>
</Dropdown>
{:else}
<p class="text-sm mb-2">
  <b>Indicator: Gentrification stage</b> — the only map colour offered at this area level. A
  population-weighted <i>mean</i> of the Social status / Dynamism ordinals is not offered as a
  coloured, ranked map indicator at Bezirk/PGR/Ortsteil grain (averaging discrete ordinal classes
  into a coarse-grain score and colouring or ranking by it is a documented methodology red line
  for this project — see the <a href="/methodology">methodology & data sources</a> page); those
  raw ordinals remain available, clearly labelled as a population-weighted mean ordinal class, in
  the table below and as a real map colour at the Planungsraum (PLR) level above.
</p>
{/if}

```sql areas_plr
-- #152: stage_label is the de-jargoned, human-readable form of status_class (typology_stage
-- from int_gentrification_ts's D1xD2 matrix, ADR-0008 -- no thresholds touched here, just a
-- friendlier string). stage_sort orders rows by gentrification-pressure severity (most acute
-- first) so this data's first-occurrence order of distinct stage_label values -- what
-- `presentStagePalette()` above (and EvidenceMap.js's own handleLegendValues/handleFillColor)
-- keys its colour lookup on -- is deterministic and matches the "worse -> red" reading order,
-- regardless of DuckDB's natural row order. Ordering rationale (Dangschat 1988 double
-- invasion-succession cycle; Döring & Ulbricht 2016 vulnerability framework -- both cited in
-- int_gentrification_ts.sql):
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

```sql bezirk_names
-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the `areas_rollup`, `area_table_rollup`, and `area_mix_table`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real `evidence build`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- `from base`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in `areas_rollup` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
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
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)
```

```sql areas_rollup
-- One row per rollup area (bezirk/pgr/ortsteil), picked deterministically from
-- mart_area_rollup_stage_mix's per-(area, typology_stage) grain via QUALIFY -- dominant_stage,
-- dominant_share, status_index_weighted_mean, dynamism_index_weighted_mean, n_habitable_children,
-- is_dominant_fragile and has_incomplete_population are all CONSTANT across an area's stage rows
-- (see that mart's header), so any single row carries them; the row itself is not otherwise used
-- (the "Stage mix" table further down this page queries the full per-stage grain separately).
--
-- #310 review fix (MEDIUM-A): area_name falls back to the shared Bezirk-name lookup block above
-- (see that block's header comment; referenced by name in the actual `left join` below) wherever
-- the mart's own area_name is NULL -- every Bezirk row, since dim_area carries no bezirk-level
-- rows. At PGR/Ortsteil grain the mart's area_name is always populated, so the left join below is
-- a no-op there (no PGR/Ortsteil code ever matches a '01'..'12' Bezirk code).
--
-- NB: this comment deliberately avoids spelling out the lookup block's interpolation token in
-- prose (see the `bezirk_names` block's own header comment for why -- doing so would textually
-- substitute the lookup's entire compiled SQL into the middle of THIS single-line comment,
-- breaking out of the comment and corrupting the query, exactly as it would for a self-reference).
--
-- #310 review fix (D4 -- domain sign-off blocking): `acute` sums stage_population_share over the
-- three most acute typology_stage values (Dangschat's invasion phase plus the Döring/Ulbricht
-- vulnerability case) from the mart's own per-(area, typology_stage) grain -- a plain aggregate
-- over already-published mix rows, no mart change, permitted under the standing #267 domain
-- decision's Recommendation 4 ("share of PLRs in active-gentrification typology" is an explicitly
-- allowed composition statistic). Filtering to one (city, level, period, variant) before grouping
-- by area_code cannot double-count, since that combination plus typology_stage is this mart's
-- natural key.
--
-- NB: the mart is SPARSE, not padded to all six stages per area (`stage_agg` there groups by
-- observed `typology_stage` only) -- so `sum(...) filter (where typology_stage in (...))` returns
-- NULL, not 0, for an area with real habitable children but none in an acute stage (zero matching
-- rows to sum). `acute_stage_share_raw` is therefore coalesced to 0 in `base` below, but ONLY when
-- the area has at least one habitable child -- an orphan area (n_habitable_children = 0) keeps a
-- genuine NULL, matching dominant_share's own convention.
with
    acute as (
        select
            area_code,
            sum(stage_population_share) filter (
                where typology_stage in
                    ('active-gentrification', 'pioneer-signal', 'improving-vulnerable')
            ) as acute_stage_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${inputs.area_level.value}'
          and city_code = 'BER'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${inputs.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        group by area_code
    ),
    base as (
        select
            m.city_code,
            m.area_code,
            coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
            m.status_index_weighted_mean as status_index,
            m.dynamism_index_weighted_mean as dynamism_index,
            -- dominant_stage as status_class kept for shape symmetry with `areas_plr`'s
            -- status_class column (not otherwise consumed downstream at this grain -- the map/
            -- tooltip read `stage_label` instead).
            m.dominant_stage as status_class,
            m.dominant_share,
            case
                when m.n_habitable_children = 0 then null
                else coalesce(a.acute_stage_share_raw, 0)
            end as acute_stage_share,
            m.n_habitable_children,
            m.is_dominant_fragile,
            m.has_incomplete_population,
            case m.dominant_stage
                when 'active-gentrification' then 'Active gentrification'
                when 'pioneer-signal' then 'Early pioneer signal'
                when 'improving-vulnerable' then 'Improving, vulnerable area'
                when 'pre-gentrification' then 'Pre-gentrification watch'
                when 'consolidation-pressure' then 'Consolidated, still intensifying'
                when 'stable-established' then 'Stable, established'
            end as stage_label,
            case m.dominant_stage
                when 'active-gentrification' then 1
                when 'pioneer-signal' then 2
                when 'improving-vulnerable' then 3
                when 'pre-gentrification' then 4
                when 'consolidation-pressure' then 5
                when 'stable-established' then 6
                else 99
            end as stage_sort,
            -- #310 review fix (MEDIUM-4): pairs the dominant-stage reading with an explicit
            -- caveat whenever is_dominant_fragile -- per the #310 design decision (issue comment
            -- point 3) this must never be shown as a standalone, confident-looking label. Blank
            -- ('') rather than NULL when not fragile, so the tooltip line renders empty instead
            -- of a formatted "-" placeholder.
            case
                when m.is_dominant_fragile
                then 'Small sample — fewer than 3 constituent areas, most-widespread-stage reading may not be robust'
                else ''
            end as fragile_note,
            -- #310 review fix (MEDIUM-3): pairs the "population-weighted" claim with an explicit
            -- caveat whenever the weighting silently degraded to equal-weight for this area (see
            -- mart_area_rollup_stage_mix's own WEIGHTING NOTE / MEDIUM-C fix: whenever this flag
            -- is true, the mart now equal-weights EVERY child in the area consistently -- never a
            -- silent partial-coverage mix of weighting schemes within the same area).
            case
                when m.has_incomplete_population
                then 'Population data incomplete for this area — equal-weighted, not population-weighted'
                else ''
            end as population_note,
            -- Rollup profile pages (all pre-existing routes): /berlin/area/<level>/<code>.
            '${base}/berlin/area/${inputs.area_level.value}/' || m.area_code as link
        from gentriduck_marts.mart_area_rollup_stage_mix as m
        left join ${bezirk_names} as bn on m.area_code = bn.area_code
        left join acute as a on m.area_code = a.area_code
        where m.area_level = '${inputs.area_level.value}'
          and m.city_code = 'BER'
          -- #310 review fix (LOW-6): explicit even though the mart is currently single-variant --
          -- defends against a future second variant silently duplicating rows here.
          and m.variant = 'live_data'
          and m.period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${inputs.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
    )
select *
from base
order by stage_sort
```

<AreaMap
    data={isRollup ? areas_rollup : areas_plr}
    geoJsonUrl={geoJsonUrl}
    geoId="area_code"
    areaCol="area_code"
    value={effectiveIndicator === 'status_class' ? 'stage_label' : effectiveIndicator}
    legendType={effectiveIndicator === 'status_class' ? 'categorical' : 'scalar'}
    colorPalette={effectiveIndicator === 'status_class' ? presentStagePalette(isRollup ? areas_rollup : areas_plr) : undefined}
    title="Berlin {areaLevelLabel[inputs.area_level.value]} — {effectiveIndicatorLabel}, latest period"
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
-- #310 review fix (MEDIUM-A): area_name fallback via the shared Bezirk-name lookup block defined
-- once above (see that block's header comment; referenced by name in the actual `left join`
-- below) instead of duplicating the Bezirk code -> name CTE here -- not the raw (NULL-for-Bezirk)
-- mart column.
--
-- #310 review fix (D4 -- domain sign-off blocking): `acute` sums stage_population_share over the
-- three most acute typology_stage values (same construction as the `areas_rollup` query above --
-- see that block's header comment for the full rationale/citation) so the composition
-- counterweight is available in this table too, not just the map tooltip.
--
-- #310 review fix (D1/C1 -- domain sign-off section (b)): this table no longer
-- `order by dynamism_index desc`. Ranking a citywide table by a population-weighted MEAN of an
-- ordinal class code is exactly the "presented, coloured, or ordered" construct the standing #267
-- domain decision forbids for a coarse scalar -- order by area_name instead (matches the
-- Stage-mix table below). status_index/dynamism_index remain visible as informational columns
-- (see the Column titles below, per the geo-DS's C1: "population-weighted mean ordinal class
-- (mean rank)", not a score) -- keeping the mart's diagnostic columns available is exactly what
-- D1 remedy (a) intends; only the map-colour/rank uses are removed.
--
-- NB: see `areas_rollup`'s own header comment above for why `acute_stage_share_raw` is coalesced
-- to 0 below only when the area has at least one habitable child (the mart is sparse -- a filtered
-- SUM over zero matching rows is NULL, not 0).
with
    acute as (
        select
            area_code,
            sum(stage_population_share) filter (
                where typology_stage in
                    ('active-gentrification', 'pioneer-signal', 'improving-vulnerable')
            ) as acute_stage_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${inputs.area_level.value}'
          and city_code = 'BER'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${inputs.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.acute_stage_share_raw, 0)
    end as acute_stage_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population,
    case m.dominant_stage
        when 'active-gentrification' then 'Active gentrification'
        when 'pioneer-signal' then 'Early pioneer signal'
        when 'improving-vulnerable' then 'Improving, vulnerable area'
        when 'pre-gentrification' then 'Pre-gentrification watch'
        when 'consolidation-pressure' then 'Consolidated, still intensifying'
        when 'stable-established' then 'Stable, established'
    end as stage_label
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join ${bezirk_names} as bn on m.area_code = bn.area_code
left join acute as a on m.area_code = a.area_code
where m.area_level = '${inputs.area_level.value}'
  and m.city_code = 'BER'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where
          area_level = '${inputs.area_level.value}' and city_code = 'BER'
          and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by area_name
```

{#if isRollup}

<DataTable data={area_table_rollup} rows=10>
    <Column id=area_name title="Area"/>
    <Column id=status_index title="Social status — population-weighted mean ordinal class (mean rank; 1=least deprived … 4=most deprived)"/>
    <Column id=dynamism_index title="Speed of change — population-weighted mean ordinal class (mean rank)"/>
    <Column id=stage_label title="Most widespread gentrification stage"/>
    <Column id=dominant_share title="Most widespread stage's share (population-weighted, or equal-weighted — see the incomplete-data column)" fmt="pct0"/>
    <Column id=acute_stage_share title="Residents in an acute-pressure stage (active-gentrification + pioneer-signal + improving-vulnerable)" fmt="pct0"/>
    <Column id=n_habitable_children title="PLRs with data"/>
    <Column id=is_dominant_fragile title="Fragile (< 3 PLRs)?"/>
    <Column id=has_incomplete_population title="Population data incomplete (share above is equal-weighted, not population-weighted)?"/>
</DataTable>

### Stage mix — full breakdown per area

Never rely on the most widespread stage alone: this table is the full stage-mix distribution
behind every area above — population-weighted where an area's population data is complete,
equal-weighted as a flagged fallback otherwise (see the "population data incomplete" column) —
including the `uninhabited / no data` bucket, shown as a count of constituent areas, not a share
(it is excluded from the share calculation by design; see that column's own values below).

```sql area_mix_table
-- #310 review fix (MEDIUM-A): area_name fallback via the shared Bezirk-name lookup block defined
-- once above (referenced by name in the actual `left join` below), left-joined directly onto the
-- mart's full per-stage grain -- not this mart's raw (NULL-for-Bezirk) area_name column --
-- otherwise both this table's Bezirk rows AND its `order by area_name` degenerate to
-- blank/undefined for all 12 Bezirke.
--
-- #310 review fix (R-310-1): stage_label de-jargons m.typology_stage with the exact same
-- stage-name mapping used everywhere else on this page -- the raw machine code (e.g.
-- 'active-gentrification') was previously shown verbatim here, the only table on the page that
-- did so. has_incomplete_population is added (D2) so this table -- unlike area_table_rollup above,
-- which has one row per area -- can disclose per-row whether THIS area's shares are population- or
-- equal-weighted, since a single mix table spans every area at the selected level and those can
-- have different has_incomplete_population values.
select
    coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
    case m.typology_stage
        when 'active-gentrification' then 'Active gentrification'
        when 'pioneer-signal' then 'Early pioneer signal'
        when 'improving-vulnerable' then 'Improving, vulnerable area'
        when 'pre-gentrification' then 'Pre-gentrification watch'
        when 'consolidation-pressure' then 'Consolidated, still intensifying'
        when 'stable-established' then 'Stable, established'
        else m.typology_stage -- 'uninhabited / no data' -- already plain language, pass through
    end as stage_label,
    m.stage_population_share,
    m.stage_n_children,
    m.has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join ${bezirk_names} as bn on m.area_code = bn.area_code
where m.area_level = '${inputs.area_level.value}'
  and m.city_code = 'BER'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${inputs.area_level.value}' and city_code = 'BER' and variant = 'live_data'
  )
order by area_name, m.stage_population_share desc nulls last
```

<DataTable data={area_mix_table} rows=50 search=true>
    <Column id=area_name title="Area"/>
    <Column id=stage_label title="Stage"/>
    <Column id=stage_population_share title="Share (population-weighted, or equal-weighted — see last column)" fmt="pct0"/>
    <Column id=stage_n_children title="Constituent PLRs"/>
    <Column id=has_incomplete_population title="Population data incomplete for this area?"/>
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
  colours by the *most widespread* ("dominant") stage among each area's constituent PLRs — always
  shown with its share (population-weighted where possible, equal-weighted as a flagged fallback
  otherwise) and the full stage mix (see the "Stage mix" table), never as a standalone label.
  Areas with fewer than 3 PLRs contributing real data are flagged fragile.
- **A coarse-grain reading is directionally biased toward "calm", not neutral.** Plurality voting
  resolves an area to whichever stage is most widespread among its constituents, and the most
  widespread stage is, by construction, usually the least acute one — so coarser levels
  systematically understate pressure rather than randomly blurring it. An area shown as "Stable,
  established" can still contain neighbourhoods under acute pressure; this map cannot be read as
  evidence that pressure is absent anywhere in it. The share of residents in an acute-pressure
  stage (in the tooltip and table above) and the Planungsraum (PLR) level — the finest grain this
  site publishes — are where that pressure is actually locatable.
- **The rollup "Social status"/"Speed of change" figures are a population-weighted mean ordinal
  class (a mean rank), not a rescaled score.** They are not offered as a map colour at Bezirk/
  PGR/Ortsteil grain, and the table above no longer ranks by them, for exactly this reason — see
  the Indicator note above the map.
- **Ortsteil figures are approximate, unlike PGR/Bezirk which nest exactly.** PLRs do not nest
  cleanly into Ortsteile, so each Ortsteil's figures are assembled from the PLRs a dominant-overlap
  rule assigns to it, not from a clean administrative nesting — the drawn polygon is the true
  Ortsteil boundary, but the value describes that assigned-PLR set.
- **"Population-weighted" is a best-effort weighting, not a guarantee.** Where population data is
  missing for some or all of an area's constituent PLRs, that area's rollup falls back to *equal*
  weighting across its constituent PLRs rather than true population weighting — flagged per-area
  as "population data incomplete" in the table and map tooltip.
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
