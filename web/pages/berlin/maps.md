---
title: Maps — gentrification stages by area
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
  -- it now lives as a small, fixed map on /thesis-recheck, next to the hypothesis writeup,
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
  coarser levels resolve toward the most common stage, so a stage-6 plurality reading is not an
  all-clear. D4 (domain, blocking) -- a composition counterweight
  (`acute_stage_share`, #358: now `stages_2_4_share`, the combined share -- population-weighted,
  or equal-weighted as a flagged fallback -- of active-gentrification + pioneer-signal + improving-vulnerable) is now computed
  page-side (sum over already-published mix rows, no mart change) and shown next to the
  dominant-stage colour/label in both the tooltip and the table. C5
  (geo, blocking) -- the Ortsteil dominant-overlap approximation is now disclosed. R-310-1/R-310-5
  (both non-blocking, applied anyway) -- the Stage-mix table is de-jargoned and its row cap raised;
  reader-facing copy now prefers "most widespread stage" over "dominant stage" (internal column
  keys like `dominant_stage`/`dominant_share`/`is_dominant_fragile` are untouched -- this is a
  copy-only rename, not a mart or schema change).

  #310 domain re-review fixes (2026-07-30, second round -- domain verdict on the D1 fix commit was
  `Verdict: CONCERNS (blocking -- D2 only)`, NOT a pass; see docs/epic-e/310-map-granularity-domain-signoff.md,
  "Re-review after fix commit 18dfeda3" -- 18dfeda3 alone did not clear the domain gate, the D2 label
  fix in dadcb721 below plus a third review round were still required):
  D1/D3/D4/C1/C5 were confirmed resolved on their own merits, but the D4 counterweight and the C1
  scalar-column relabelling each reintroduced the exact D2 label-overreach defect in two new
  places -- both now fixed here. D2-R1 (domain, blocking) -- that share was labelled as a count of
  "Residents in ..." (tooltip, table column, D3 Alert, Honest-caveats bullet): an unconditional
  residents claim, false on Hamburg's rollup surface (7/7 districts, 99/104 Stadtteile
  equal-weighted per `has_incomplete_population`) where it is really a share of constituent areas,
  not residents -- relabelled as a neutral "Share in ..." (#358: now "Share in stages 2–4"), with the same
  "(population-weighted, or equal-weighted -- see the incomplete-data column)" hedge
  `dominant_share` already carried, in all four places. D2-R2 (domain, blocking) -- the C1 scalar
  column titles/Indicator note/caveats bullet dropped the pre-existing "where available" qualifier
  and asserted "population-weighted mean ordinal class" unconditionally; restored as "mean ordinal
  class (mean rank), population-weighted where population data is complete and equal-weighted
  otherwise" in all four places.

  #358 (docs/epic-g/358-spec.md §1, §4, §5; Revision 1): stage labels are the dbt columns
  stage_label/stage_number (gentrification_index) and dominant_stage_label/dominant_stage_number /
  stage_label (mart_area_rollup_stage_mix) -- the five page-side label CASEs and the "severity"
  stage_sort are gone. Rows are ordered by cycle position (1..6, then "No stage on record"). The
  palette follows that order with no alarm colour (see stageColorByNumber below). The former
  "acute" composition share is now "Share in stages 2–4" (stage_number 2..4 -- the same three
  stages as before). Old wording replaced per spec §5; the stage-number and status-trend
  legends come from <StageNumberLegend>/<StatusTrendLegend>.
-->

<script>
  // basePath-aware asset URL (#144): the map fetches `geoJsonUrl` verbatim, and its click-through
  // `link` column is a plain <a href> (PolygonMap, #351; AreaMap used window.location.href) -- unlike Evidence's
  // own nav/DataTable links, NEITHER prepends the base path -- so on the GitHub Pages project site
  // (served under /gentriduck) a bare "/geo/..." 404s (empty map) and a bare "/berlin/area/..."
  // 404s on click-through. Prepend SvelteKit's `base` (= deployment.basePath in the build; ""
  // when served at root in dev) to both -- `${base}` is interpolated directly into the `link`
  // column's SQL literal below, the same templating mechanism used for `${inputs...}`.
  import { base } from '$app/paths';

  // #358 (docs/epic-g/358-spec.md §1 "Colours"): the stage palette is keyed on stage_number and
  // follows the cycle order, with no alarm colour (the pre-#358 ColorBrewer RdYlBu-6 ramp encoded
  // severity with red at one end). Stages 1-5 are five stops of the viridis ramp (a perceptually
  // uniform, colourblind-safe sequential scale; light = 1 ... dark = 5, with the brightest yellow
  // and darkest purple ends trimmed), stage 6 is a neutral grey, and "No stage on record"
  // (stage_number NULL) is a very light grey. A local CVD check (Machado/Oliveira/Fairchild 2009
  // matrices, CIELAB distance -- the same method as the I16 check) gives a minimum pairwise deltaE
  // of 18.2 (normal vision, protanopia, deuteranopia) and 13.1 (tritanopia, stage 1 vs 6). The
  // same constant is repeated on /hamburg/maps (each city keeps its own colour-scale computation,
  // H3 structural guard). Display-only: the D1xD2 classification is untouched.
  //
  // #310 review fix (HIGH-1), still applicable: PolygonMap (#351; formerly EvidenceMap) assigns
  // `colorPalette` POSITIONALLY over the DISTINCT values of the map's `value` column in
  // first-occurrence order (`[...new Set(data.map(d => d[value]))]`). At a rollup level only a
  // subset of stages may occur, so a flat array would silently shift colours between stages.
  // `presentStagePalette()` therefore derives the palette from the CURRENT query result's own
  // distinct stage_label values in first-occurrence order, looking each colour up by that row's
  // stage_number -- so `colorPalette[i]` always belongs to the stage `values[i]` resolves to. The
  // `areas_plr`/`areas_rollup` queries below are ordered by stage_number (NULLs last), so the
  // legend reads 1..6, then "No stage on record".
  //
  // #351: the map is drawn by web/components/PolygonMap.svelte (SVG, no Leaflet/tile basemap,
  // since CARTO's basemap now returns "API KEY REQUIRED" tiles) instead of <AreaMap>; it keeps the
  // positional first-occurrence colour rule and the `${base}`-prefixed geoJsonUrl/link convention.
  const stageColorByNumber = {
    1: '#bddf26',
    2: '#5ec962',
    3: '#21918c',
    4: '#31688e',
    5: '#482878',
    6: '#bdbdbd'
  };
  const noStageColor = '#f0f0f0';

  function presentStagePalette(rows) {
    const seen = new Set();
    const palette = [];
    for (const row of rows ?? []) {
      const label = row?.stage_label;
      if (label == null || seen.has(label)) continue;
      seen.add(label);
      palette.push(stageColorByNumber[row?.stage_number] ?? noStageColor);
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
  // #351: undefined (PolygonMap waits) until the Dropdown has a value, instead of requesting
  // "/geo/undefined" (a 404) for the one tick before the input store initializes.
  $: geoJsonUrl = geoJsonByLevel[inputs.area_level.value]
    ? `${base}/geo/${geoJsonByLevel[inputs.area_level.value]}`
    : undefined;

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
        // rows (no mart change) -- the share of the area in stages 2-4 (#358 label; the same
        // three stages as before), shown in the same visual unit as the fill colour/most-
        // widespread-stage label so a reader can't mistake a stage-6 plurality for an all-clear
        // (see the domain sign-off's Neukölln/Spandau frontier-inversion finding, and the D3
        // caveat below). #310 D2-R1: a neutral "share" label (not "residents"), since
        // has_incomplete_population can be true; the population_note line below discloses per-row
        // whenever THIS area fell back to equal weighting.
        { id: 'stages_2_4_share', title: 'Share in stages 2–4', fmt: 'pct0' },
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
        // #358 (spec §1, C2): "(uninhabited)" only where the PLR has no stage and population 0.
        { id: 'stage_note', showColumnName: false, valueClass: 'text-xs opacity-70', fmt: 'id' },
        { id: 'area_code', title: 'Area code', valueClass: 'text-xs opacity-60', fmt: 'id' }
      ];
</script>

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Maps — gentrification stages by area" lede="Colours each of Berlin's neighbourhoods by its current gentrification stage (numbered 1–6 by position in the cycle; see the legend)." />

Pick an area level and an indicator below.

This page covers Berlin. See [Hamburg's own maps page](/hamburg/maps) for the same view scoped to
Hamburg's own indicators, area levels, and observation window.

<Alert status="info">
  <b>How to read the map:</b> The <b>"Gentrification stage"</b> option is the easiest to read at a
  glance — it colours each area by one of six plain-language stages (numbered 1–6 by position in
  the cycle; see the legend), no decoder needed — hover any area for its name and value. At the
  Planungsraum (PLR) level, the <b>"Social status"</b> and <b>"Dynamism"</b> options are also
  offered, showing the raw ordinal inputs behind that stage (not offered as a map colour at
  Bezirk/PGR/Ortsteil grain — see the Indicator note there for why): "Social status" is ordinal —
  higher shading means <b>more deprived</b>, not more prosperous. "Dynamism" is the official
  status-trend class: 1 = improving, 2 = stable, 3 = worsening relative to the city, so higher
  shading means a <b>worsening</b> trend. See the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md">index definition</a>
  for the full methodology, or the <a href="/methodology">methodology & data sources</a> page for a
  plain-language walkthrough. Under "Gentrification stage", areas without a stage are drawn in very
  light grey as "No stage on record"; under the other two options, areas without a value are drawn
  with grey hatching and marked "No data" in the legend.
</Alert>

<StageNumberLegend />

<StatusTrendLegend />

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
  <b>A "6 · Stable / established" reading at this grain does not mean that no part of the area is
  changing.</b> Plurality voting resolves an area to whichever stage is most widespread among its
  constituent PLRs — and because "6 · Stable / established" is, by construction, the most common
  stage citywide, coarser levels are systematically biased toward reading as calm, not toward
  neutral noise. An area whose map colour reads "6 · Stable / established" can still contain
  smaller neighbourhoods in stages 2–4; this map alone cannot show you whether it does. The share
  of the area in stages 2–4 (residents where population data exists, otherwise constituent areas —
  in the tooltip and table below) and the Planungsraum (PLR) level — the finest grain this site
  publishes — are where such change can actually be located.
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
  raw ordinals remain available, clearly labelled as a mean ordinal class (mean rank),
  population-weighted where population data is complete and equal-weighted otherwise, in
  the table below and as a real map colour at the Planungsraum (PLR) level above.
</p>
{/if}

```sql areas_plr
-- #358: stage_label / stage_number come straight from gentrification_index (dbt macro
-- typology_stage_display, docs/epic-g/358-spec.md §1) -- the page no longer carries its own
-- label CASE or a "severity" sort. Rows are ordered by cycle position (stage_number, NULLs last)
-- so the first-occurrence order of distinct stage_label values -- what presentStagePalette()
-- above and PolygonMap's positional colour rule key on -- is the legend order 1..6, then
-- "No stage on record". stage_note adds "(uninhabited)" to the tooltip only where the PLR has no
-- stage and a population of 0 (spec §1, C2).
select
    city_code,
    area_code,
    area_name,
    status_index,
    dynamism_index,
    status_class,
    stage_label,
    stage_number,
    case
        when stage_number is null and population = 0 then '(uninhabited)'
        else ''
    end as stage_note,
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
order by stage_number nulls last, area_name, area_code
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
-- #310 review fix (D4 -- domain sign-off blocking): `stages_2_4` (#358: formerly `acute`) sums
-- stage_population_share over stage_number 2-4 (improving-vulnerable, pioneer-signal,
-- active-gentrification -- the same three typology_stage values as before; Dangschat's invasion
-- phase plus the Döring/Ulbricht vulnerability case) from the mart's own per-(area, typology_stage) grain -- a plain aggregate
-- over already-published mix rows, no mart change, permitted under the standing #267 domain
-- decision's Recommendation 4 ("share of PLRs in active-gentrification typology" is an explicitly
-- allowed composition statistic). Filtering to one (city, level, period, variant) before grouping
-- by area_code cannot double-count, since that combination plus typology_stage is this mart's
-- natural key.
--
-- NB: the mart is SPARSE, not padded to all six stages per area (`stage_agg` there groups by
-- observed `typology_stage` only) -- so `sum(...) filter (where stage_number between 2 and 4)` returns
-- NULL, not 0, for an area with real habitable children but none in stages 2-4 (zero matching
-- rows to sum). `stages_2_4_share_raw` is therefore coalesced to 0 in `base` below, but ONLY when
-- the area has at least one habitable child -- an orphan area (n_habitable_children = 0) keeps a
-- genuine NULL, matching dominant_share's own convention.
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
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
                else coalesce(a.stages_2_4_share_raw, 0)
            end as stages_2_4_share,
            m.n_habitable_children,
            m.is_dominant_fragile,
            m.has_incomplete_population,
            -- #358: dbt display columns (typology_stage_display), no page-side CASE.
            m.dominant_stage_label as stage_label,
            m.dominant_stage_number as stage_number,
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
        left join stages_2_4 as a on m.area_code = a.area_code
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
order by stage_number nulls last, area_name, area_code
```

<PolygonMap
    data={isRollup ? areas_rollup : areas_plr}
    geoJsonUrl={geoJsonUrl}
    geoId="area_code"
    areaCol="area_code"
    value={effectiveIndicator === 'status_class' ? 'stage_label' : effectiveIndicator}
    legendType={effectiveIndicator === 'status_class' ? 'categorical' : 'scalar'}
    colorPalette={effectiveIndicator === 'status_class' ? presentStagePalette(isRollup ? areas_rollup : areas_plr) : undefined}
    title="Berlin {areaLevelLabel[inputs.area_level.value]} — {effectiveIndicatorLabel}, latest period"
    link="link"
    tooltip={areaTooltip}
/>

Click an area on the map to open its exact {isRollup ? 'profile' : 'neighbourhood'} page.

## The numbers behind the map

```sql area_table_plr
-- #358 (spec §3): cycle order (stage_number, NULLs last), then name, then code -- no longer
-- ordered by the Dynamik reading. User-sortable via the DataTable headers.
select
    area_name,
    status_index,
    dynamism_index,
    stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data'
  and area_level = 'plr'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by stage_number nulls last, area_name, area_code
```

```sql area_table_rollup
-- #310 review fix (MEDIUM-A): area_name fallback via the shared Bezirk-name lookup block defined
-- once above (see that block's header comment; referenced by name in the actual `left join`
-- below) instead of duplicating the Bezirk code -> name CTE here -- not the raw (NULL-for-Bezirk)
-- mart column.
--
-- #310 review fix (D4 -- domain sign-off blocking): `stages_2_4` (#358: formerly `acute`) sums
-- stage_population_share over stage_number 2-4 (improving-vulnerable, pioneer-signal,
-- active-gentrification -- the same three typology_stage values as before; same construction
-- as the `areas_rollup` query above -- see that block's header comment for the full rationale/citation) so the composition
-- counterweight is available in this table too, not just the map tooltip.
--
-- #310 review fix (D1/C1 -- domain sign-off section (b)): this table no longer
-- `order by dynamism_index desc`. Ranking a citywide table by a population-weighted MEAN of an
-- ordinal class code is exactly the "presented, coloured, or ordered" construct the standing #267
-- domain decision forbids for a coarse scalar -- order by area_name instead (matches the
-- Stage-mix table below). status_index/dynamism_index remain visible as informational columns
-- (see the Column titles below, per the geo-DS's C1: "mean ordinal class (mean rank)", not a
-- score -- #310 review fix D2-R2: population-weighted where population data is complete and
-- equal-weighted otherwise, not unconditionally) -- keeping the mart's diagnostic columns
-- available is exactly what D1 remedy (a) intends; only the map-colour/rank uses are removed.
--
-- NB: see `areas_rollup`'s own header comment above for why `stages_2_4_share_raw` is coalesced
-- to 0 below only when the area has at least one habitable child (the mart is sparse -- a filtered
-- SUM over zero matching rows is NULL, not 0).
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
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
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population,
    m.dominant_stage_label as stage_label
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join ${bezirk_names} as bn on m.area_code = bn.area_code
left join stages_2_4 as a on m.area_code = a.area_code
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
    <Column id=status_index title="Social status — mean ordinal class (mean rank; 1=least deprived … 4=most deprived), population-weighted where population data is complete and equal-weighted otherwise"/>
    <Column id=dynamism_index title="Speed of change — mean ordinal class (mean rank), population-weighted where population data is complete and equal-weighted otherwise"/>
    <Column id=stage_label title="Most widespread gentrification stage"/>
    <Column id=dominant_share title="Most widespread stage's share (population-weighted, or equal-weighted — see the incomplete-data column)" fmt="pct0"/>
    <Column id=stages_2_4_share title="Share in stages 2–4 (improving from very low, low or middle status; population-weighted, or equal-weighted — see the incomplete-data column)" fmt="pct0"/>
    <Column id=n_habitable_children title="PLRs with data"/>
    <Column id=is_dominant_fragile title="Fragile (< 3 PLRs)?"/>
    <Column id=has_incomplete_population title="Population data incomplete (share above is equal-weighted, not population-weighted)?"/>
</DataTable>

### Stage mix — full breakdown per area

Never rely on the most widespread stage alone: this table is the full stage-mix distribution
behind every area above — population-weighted where an area's population data is complete,
equal-weighted as a flagged fallback otherwise (see the "population data incomplete" column) —
including the "No stage on record" bucket, shown as a count of constituent areas, not a share
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
    m.stage_label,
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
order by area_name, m.stage_number nulls last
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
    <Column id=dynamism_index title="Status trend class (1 = improving, 2 = stable, 3 = worsening)"/>
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
  **more deprived**, not more prosperous; the status trend is explained in the legend above the map
  — see [methodology & data sources](/methodology) for the full decoder.
- **Bezirk / PGR / Ortsteil are population-weighted rollups, never a re-scored index.** The map
  colours by the *most widespread* ("dominant") stage among each area's constituent PLRs — always
  shown with its share (population-weighted where possible, equal-weighted as a flagged fallback
  otherwise) and the full stage mix (see the "Stage mix" table), never as a standalone label.
  Areas with fewer than 3 PLRs contributing real data are flagged fragile.
- **A coarse-grain reading is directionally biased toward "calm", not neutral.** Plurality voting
  resolves an area to whichever stage is most widespread among its constituents, and the most
  widespread stage is, by construction, usually "6 · Stable / established" — so coarser levels
  systematically understate local change rather than randomly blurring it. An area shown as
  "6 · Stable / established" can still contain smaller neighbourhoods in stages 2–4; this map
  cannot be read as evidence that no part of it is changing. The share of the area in stages 2–4
  (residents where population data exists, otherwise constituent areas — in the tooltip and table
  above) and the Planungsraum (PLR) level — the finest grain this site publishes — are where such
  change can actually be located.
- **The rollup "Social status"/"Speed of change" figures are a mean ordinal class (a mean rank),
  population-weighted where population data is complete and equal-weighted otherwise, not a
  rescaled score.** They are not offered as a map colour at Bezirk/PGR/Ortsteil grain, and the
  table above no longer ranks by them, for exactly this reason — see the Indicator note above the
  map.
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
- Areas without a stage (e.g. uninhabited planning areas) are drawn in very light grey ("No stage
  on record"), and areas without a value for the "Social status" or "Dynamism" option with grey
  hatching ("No data") — either one is missing data, not a "no change" reading.

## Where next

- **[Time series](/berlin/time-series)** — how one specific area, or the whole city, has moved
  over the years.
- **[Area detail](/berlin/area-detail)** — browse by district, or open one neighbourhood's full
  profile via a map click.
- **[POI & Offering Advantage map](/berlin/poi-map)** — the commercial-mix (shops/cafés) view of
  the same neighbourhoods.
- **[The 2018 thesis, re-checked](/thesis-recheck)** — the fixed 2018 thesis reproduction map
  (Bezirksregion, Dec 2016 snapshot) and the re-test of all eight hypotheses.
- **[Methodology & data sources](/methodology)** — what the six gentrification stages
  mean.

---

<FooterNav />
