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

  #310 dual sign-off fixes (2026-07-30, both PASS WITH CONCERNS, blocking -- see
  docs/epic-e/310-map-granularity-geo-signoff.md and .../310-map-granularity-domain-signoff.md, and
  /berlin/maps' identical header comment for the full rationale -- not city-specific, applied here
  unmodified): D1 -- Indicator dropdown no longer offers status_index/dynamism_index at rollup
  grain (subarea_l1/district). D2 -- "population share" labels are now conditional/neutral --
  this is the fix that matters most for Hamburg specifically, since its whole rollup surface is
  currently equal-weighted (see the has_incomplete_population prevalence already documented below).
  D3 -- directional caveat (coarser levels resolve toward the most common AND LEAST ACUTE stage)
  added to both the rollup Alert and Honest caveats. D4 -- acute_stage_share composition
  counterweight, computed page-side, added to the tooltip and table. R-310-1/R-310-5 -- Stage-mix
  table de-jargoned/row cap raised; reader-facing copy prefers "most widespread stage" (internal
  column keys untouched). No Ortsteil equivalent here (C5 is Berlin-only).

  #310 domain re-review fixes (2026-07-30, second round -- see /berlin/maps' identical header
  comment and docs/epic-e/310-map-granularity-domain-signoff.md, "Re-review after fix commit
  18dfeda3", for the full rationale, not city-specific): the D4 counterweight and C1 scalar-column
  relabelling each reintroduced the D2 label-overreach defect this fix closes. D2-R1 --
  `acute_stage_share`'s "Residents in an acute-pressure stage" label (tooltip, table column, D3
  Alert, Honest-caveats bullet) was an unconditional residents claim, false on Hamburg's
  wholly-equal-weighted rollup surface (7/7 districts, 99/104 Stadtteile) where it is really a
  share of constituent Gebiete -- relabelled "Share in an acute-pressure stage" with the same
  incomplete-population hedge `dominant_share` already carries. D2-R2 -- the scalar column
  titles/Indicator note/caveats bullet lost their "where available" qualifier; restored as "mean
  ordinal class (mean rank), population-weighted where population data is complete and
  equal-weighted otherwise".
-->

<script>
  import { base } from '$app/paths';

  // #152/#233 (I16): intuitive "worse -> red, best -> blue" ramp for the six-stage typology.
  // ColorBrewer RdYlBu-6 (colorblind-safe per colorbrewer2.org).
  //
  // #310 review fix (HIGH-1): EvidenceMap assigns this ramp POSITIONALLY over the DISTINCT
  // indicator values present in the `data` array actually passed to <AreaMap>, in first-occurrence
  // order -- see @evidence-dev/core-components' EvidenceMap.js: `handleLegendValues()` computes
  // `values = [...new Set(data.map(d => d[value]))]`, and `handleFillColor()` then looks up
  // `colorPalette[values.indexOf(item[value])]`. At the subarea_l2 leaf grain all six stages are
  // (usually) present, so a flat 6-entry array happened to line up with `stage_sort` order below --
  // but at a rollup level (Stadtteil/Bezirk) typically only a SUBSET of the six stages occurs, so
  // the same palette slot silently gets reassigned to a different (often much less severe) stage
  // -- e.g. a Bezirk where every constituent Gebiet happens to be 'active-gentrification' would
  // still render solid RED (correct, coincidentally), but a Bezirk that's entirely
  // 'stable-established' would ALSO render solid RED (palette index 0), inverting this page's own
  // "red = highest pressure" legend/Alert -- this is exactly the bug reported for Hamburg's
  // district level (see the #310 review findings). Fix: a fixed stage_label -> hex lookup
  // (`stageColorByLabel`) plus `presentStagePalette()`, which derives the colorPalette array from
  // the CURRENT query result's own distinct stage_label values in first-occurrence order -- the
  // exact same `[...new Set(data.map(d => d[value]))]` derivation EvidenceMap.js performs -- so
  // `colorPalette[i]` always names the same stage `values[i]` will resolve to, regardless of how
  // many/which stages are present at the selected area_level. (The `areas_leaf`/`areas_rollup`
  // queries below stay ordered by `stage_sort` -- most-acute-first -- purely so first-occurrence
  // order is deterministic/readable.)
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

  const indicatorShortLabel = {
    status_class: 'Gentrification stage',
    status_index: 'Social status',
    dynamism_index: 'Dynamism'
  };

  // #310: subarea_l2 is the individual-Gebiet leaf level (gentrification_index, unchanged from
  // H3); subarea_l1/district are rollup levels (mart_area_rollup_stage_mix). subarea_l2 genuinely
  // has no area_name in the source data (H3-domain-signoff.md condition 3); subarea_l1/district DO
  // carry a real Stadtteil/Bezirk name -- since that's exactly the same condition as `isRollup`,
  // the tooltip below branches on `isRollup` directly rather than a separate `hasAreaName` (#310
  // review fix, LOW-7: dead indirection -- the two were definitionally identical).
  $: isRollup = inputs.area_level.value !== 'subarea_l2';

  // #310 review fix (D1 -- domain sign-off blocking): see berlin/maps.md's identical
  // effectiveIndicator/effectiveIndicatorLabel comment for the full rationale (not
  // city-specific) -- Evidence's Dropdown/input store persists a value across area_level changes,
  // so a stale inputs.indicator.value of 'status_index'/'dynamism_index' left over from a
  // previous subarea_l2 (leaf grain) view could otherwise leak into the rollup map/tooltip/table
  // even though the Indicator dropdown itself is hidden at rollup grain (see below).
  $: effectiveIndicator = isRollup ? 'status_class' : inputs.indicator.value;
  $: effectiveIndicatorLabel = isRollup
    ? 'Gentrification stage — plain-language, colour-coded'
    : inputs.indicator.label;

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
  // #310 review fix (MEDIUM-3/MEDIUM-4): `fragile_note`/`population_note` (computed in the
  // `areas_rollup` query below) surface `is_dominant_fragile`/`has_incomplete_population` inline
  // -- blank when the flag is false, the caveat sentence when true.
  $: areaTooltip = isRollup
    ? [
        { id: 'area_name', showColumnName: false, valueClass: 'font-bold text-sm', fmt: 'id' },
        // #310 review fix (D1): always stage_label/'Most widespread stage' here -- the Indicator
        // dropdown no longer offers status_index/dynamism_index at rollup grain (see
        // effectiveIndicator above), so this branch no longer needs to branch on it at all.
        { id: 'stage_label', title: 'Most widespread stage', fmt: 'id' },
        // #310 review fix (D2 -- domain sign-off blocking, R-310-5): "Population share of
        // dominant stage" was an unconditional claim, false wherever has_incomplete_population is
        // true -- currently the entire Hamburg rollup surface (see the Alert below). Neutral label
        // here; the population_note line below states, per-row, whenever THIS area fell back to
        // equal weighting.
        { id: 'dominant_share', title: "Most widespread stage's share", fmt: 'pct0' },
        // #310 review fix (D4 -- domain sign-off blocking): composition counterweight, computed
        // in the areas_rollup query below as a sum over already-published stage_population_share
        // rows (no mart change) -- the share of the area in the three most acute stages
        // (active-gentrification + pioneer-signal + improving-vulnerable), shown in the same
        // visual unit as the fill colour/most-widespread-stage label (see the D3 caveat below).
        // #310 review fix (D2-R1 -- domain re-review blocking): "Residents in an acute-pressure
        // stage" was an unconditional residents claim, false today for Hamburg's entire rollup
        // surface (has_incomplete_population -- see the Alert above) -- neutral "share" label
        // here, same fix as dominant_share above; the population_note line below still discloses
        // per-row whenever THIS area fell back to equal weighting.
        { id: 'acute_stage_share', title: 'Share in an acute-pressure stage', fmt: 'pct0' },
        { id: 'n_habitable_children', title: 'Constituent Gebiete with data', fmt: 'id' },
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
        {
          id: effectiveIndicator === 'status_class' ? 'stage_label' : effectiveIndicator,
          title: indicatorShortLabel[effectiveIndicator],
          fmt: effectiveIndicator === 'status_class' ? 'id' : 'num1'
        },
        { id: 'area_code', title: 'Gebiet code', valueClass: 'text-xs opacity-60', fmt: 'id' }
      ];
</script>

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Maps — gentrification pressure by area" lede="Colours each of Hamburg's statistische Gebiete by its current gentrification-pressure signal, from Hamburg's own official Sozialmonitoring — the same D1×D2 typology matrix used for Berlin, applied to Hamburg's own indicators and observation window." />

<Alert status="info">
  <b>How to read the map:</b> the <b>"Gentrification stage"</b> option colours each area by one of
  six plain-language stages (red = highest pressure / earliest displacement risk, blue = most
  stable) — the same six-stage typology used on <a href="/berlin/maps">Berlin's map</a>. At the
  statistisches Gebiet level, the <b>"Social status"</b> and <b>"Dynamism"</b> options are also
  offered, showing the raw ordinal inputs (not offered as a map colour at Stadtteil/Bezirk grain —
  see the Indicator note there for why): "Social status" is ordinal — higher shading means <b>more
  deprived</b>, not more prosperous. "Dynamism" — higher means the area's status is improving
  <b>faster</b>, over Hamburg's own <b>3-year</b> observation window (Berlin's is 2 years) — see
  <a href="/methodology">methodology §6</a> for why that is a qualitative difference in what
  "active" means, not just a numeric-scale one. Areas without a value are drawn but left blank.
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
  <b>most widespread ("dominant") stage</b> among that area's constituent Gebiete, weighted by
  population where available — its tooltip and the tables below always show that stage's
  <b>share</b> alongside it (population-weighted where possible, equal-weighted as a flagged
  fallback otherwise), and the "Stage mix" table further down shows the full breakdown. Areas with
  fewer than 3 Gebiete with real data are flagged as a fragile ("small sample") reading.
  <b>Hamburg's latest published period has no population figures for effectively any Gebiet</b> —
  every Stadtteil/Bezirk rollup shown here currently falls back to <b>equal</b> weighting across
  its constituent Gebiete rather than true population weighting, flagged as "population data
  incomplete" in the table and map tooltip below.
</Alert>
<Alert status="warning">
  <b>A "Stable, established" reading at this grain is not evidence that pressure is absent.</b>
  Plurality voting resolves an area to whichever stage is most widespread among its constituent
  Gebiete — and because "Stable, established" is, by construction, the most common and <b>least
  acute</b> stage citywide, coarser levels are systematically biased toward reading as calm, not
  toward neutral noise. An area whose map colour reads "Stable, established" can still contain
  neighbourhoods under active gentrification pressure; this map alone cannot show you whether it
  does. The share of the area in an acute-pressure stage (residents where population data exists,
  otherwise constituent areas — in the tooltip and table below) and the statistisches Gebiet
  level — the finest grain this site publishes — are where that pressure is actually locatable.
</Alert>
{/if}

{#if !isRollup}
<Dropdown name="indicator" title="Indicator" defaultValue="status_class">
  <DropdownOption value="status_class" valueLabel="Gentrification stage — plain-language, colour-coded"/>
  <DropdownOption value="status_index" valueLabel="Social status — how deprived or affluent (current snapshot)"/>
  <DropdownOption value="dynamism_index" valueLabel="Dynamism — how fast that status is changing (3-year window)"/>
</Dropdown>
{:else}
<p class="text-sm mb-2">
  <b>Indicator: Gentrification stage</b> — the only map colour offered at this area level. A
  population-weighted <i>mean</i> of the Social status / Dynamism ordinals is not offered as a
  coloured, ranked map indicator at Stadtteil/Bezirk grain (averaging discrete ordinal classes into
  a coarse-grain score and colouring or ranking by it is a documented methodology red line for
  this project — see the <a href="/methodology">methodology & data sources</a> page); those raw
  ordinals remain available, clearly labelled as a mean ordinal class (mean rank),
  population-weighted where population data is complete and equal-weighted otherwise, in the
  table below and as a real map colour at the statistisches Gebiet level above.
</p>
{/if}

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
--
-- #310 review fix (MEDIUM-A): `area_table_rollup`/`area_mix_table` below each re-run an
-- equivalent query directly against the mart rather than chaining from this block by name using
-- Evidence's own block-interpolation syntax -- not because Evidence/DuckDB-WASM lacks support for
-- that (an earlier revision of this comment claimed exactly that; it was wrong -- see
-- /berlin/maps' `bezirk_names` block, added in the #310 review's MEDIUM-A fix, for a working
-- example of one block referencing another this way), but because `area_mix_table` needs the full
-- per-stage grain this query has already collapsed via QUALIFY, and `area_table_rollup` only
-- needs a handful of the same columns -- a direct re-select reads just as clearly as a chained one
-- here, for a query this short. Hamburg's subarea_l1/district area_name is real (no
-- Berlin-Bezirk-style blank-name gap, see H3-domain-signoff.md §condition 3), so unlike
-- /berlin/maps this page has no name-fallback lookup to de-duplicate in the first place.
--
-- NB: this comment deliberately avoids spelling out this block's own name inside that
-- interpolation syntax -- Evidence's query-chaining resolver scans a block's full text (comments
-- included) for that exact token, so a block mentioning its own name that way, in its own text,
-- creates a literal self-reference the resolver reports as "Compiler error: circular reference"
-- (hit and fixed during this review pass, both here and in /berlin/maps' `bezirk_names` block).
--
-- #310 review fix (D4 -- domain sign-off blocking): `acute` sums stage_population_share over the
-- three most acute typology_stage values -- see /berlin/maps' identical `areas_rollup` query for
-- the full rationale/citation and the NULL-vs-0 note (the mart is sparse, so a filtered SUM over
-- zero matching rows is NULL, not 0 -- `acute_stage_share_raw` is coalesced to 0 below only when
-- the area has at least one habitable child).
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
          and city_code = 'HH'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${inputs.area_level.value}' and city_code = 'HH'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    m.city_code,
    m.area_code,
    m.area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    -- dominant_stage as status_class kept for shape symmetry with `areas_leaf`'s status_class
    -- column (#310 review, LOW-J) -- not otherwise consumed downstream at this grain (the map/
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
    -- #310 review fix (MEDIUM-4): pairs the most-widespread-stage reading with an explicit
    -- caveat whenever is_dominant_fragile -- per the #310 design decision (issue comment point 3)
    -- this must never be shown as a standalone, confident-looking label. Blank ('') rather than
    -- NULL when not fragile, so the tooltip line renders empty instead of a formatted "-"
    -- placeholder.
    case
        when m.is_dominant_fragile
        then 'Small sample — fewer than 3 constituent areas, most-widespread-stage reading may not be robust'
        else ''
    end as fragile_note,
    -- #310 review fix (MEDIUM-3): pairs the "population-weighted" claim with an explicit caveat
    -- whenever the weighting silently degraded to equal-weight for this area (see
    -- mart_area_rollup_stage_mix's own WEIGHTING NOTE / has_incomplete_population -- Hamburg's
    -- entire latest published period has this for effectively every Gebiet).
    case
        when m.has_incomplete_population
        then 'Population data incomplete for this area — equal-weighted, not population-weighted'
        else ''
    end as population_note
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join acute as a on m.area_code = a.area_code
where m.area_level = '${inputs.area_level.value}'
  and m.city_code = 'HH'
  -- #310 review fix (LOW-6): explicit even though the mart is currently single-variant --
  -- defends against a future second variant silently duplicating rows here.
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${inputs.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by stage_sort
```

<AreaMap
    data={isRollup ? areas_rollup : areas_leaf}
    geoJsonUrl={geoJsonUrl}
    geoId="area_code"
    areaCol="area_code"
    value={effectiveIndicator === 'status_class' ? 'stage_label' : effectiveIndicator}
    legendType={effectiveIndicator === 'status_class' ? 'categorical' : 'scalar'}
    colorPalette={effectiveIndicator === 'status_class' ? presentStagePalette(isRollup ? areas_rollup : areas_leaf) : undefined}
    title="Hamburg {areaLevelLabel[inputs.area_level.value]} — {effectiveIndicatorLabel}, latest period"
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
-- #310 review fix (D4 -- domain sign-off blocking): `acute` sums stage_population_share over the
-- three most acute typology_stage values -- see /berlin/maps' `area_table_rollup` query for the
-- full rationale/citation and the NULL-vs-0 note.
--
-- #310 review fix (D1/C1 -- domain sign-off section (b)): this table no longer
-- `order by dynamism_index_weighted_mean desc`. Ranking a citywide table by a population-weighted
-- MEAN of an ordinal class code is exactly the "presented, coloured, or ordered" construct the
-- standing #267 domain decision forbids for a coarse scalar -- order by area_name instead (matches
-- /berlin/maps' equivalent fix and the Stage-mix table below). status_index/dynamism_index remain
-- visible as informational columns (see the Column titles below, per the geo-DS's C1: "mean
-- ordinal class (mean rank)", not a score -- #310 review fix D2-R2: population-weighted where
-- population data is complete and equal-weighted otherwise, not unconditionally).
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
          and city_code = 'HH'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${inputs.area_level.value}' and city_code = 'HH'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    m.area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    case m.dominant_stage
        when 'active-gentrification' then 'Active gentrification'
        when 'pioneer-signal' then 'Early pioneer signal'
        when 'improving-vulnerable' then 'Improving, vulnerable area'
        when 'pre-gentrification' then 'Pre-gentrification watch'
        when 'consolidation-pressure' then 'Consolidated, still intensifying'
        when 'stable-established' then 'Stable, established'
    end as stage_label,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.acute_stage_share_raw, 0)
    end as acute_stage_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join acute as a on m.area_code = a.area_code
where m.area_level = '${inputs.area_level.value}'
  and m.city_code = 'HH'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${inputs.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by area_name
```

{#if isRollup}

<DataTable data={area_table_rollup} rows=10>
    <Column id=area_name title="Area"/>
    <Column id=status_index title="Social status — mean ordinal class (mean rank; 1=least deprived … 4=most deprived), population-weighted where population data is complete and equal-weighted otherwise"/>
    <Column id=dynamism_index title="Speed of change — mean ordinal class (mean rank; 3-year window), population-weighted where population data is complete and equal-weighted otherwise"/>
    <Column id=stage_label title="Most widespread gentrification stage"/>
    <Column id=dominant_share title="Most widespread stage's share (population-weighted, or equal-weighted — see the incomplete-data column)" fmt="pct0"/>
    <Column id=acute_stage_share title="Share in an acute-pressure stage (active-gentrification + pioneer-signal + improving-vulnerable; population-weighted, or equal-weighted — see the incomplete-data column)" fmt="pct0"/>
    <Column id=n_habitable_children title="Gebiete with data"/>
    <Column id=is_dominant_fragile title="Fragile (< 3 Gebiete)?"/>
    <Column id=has_incomplete_population title="Population data incomplete (share above is equal-weighted, not population-weighted)?"/>
</DataTable>

### Stage mix — full breakdown per area

Never rely on the most widespread stage alone: this table is the full stage-mix distribution
behind every area above — population-weighted where an area's population data is complete,
equal-weighted as a flagged fallback otherwise (see the "population data incomplete" column) —
including the `uninhabited / no data` bucket, shown as a count of constituent areas, not a share
(it is excluded from the share calculation by design; see that column's own values below).

```sql area_mix_table
-- #310 review fix (LOW-6): explicit variant filter, same as areas_rollup/area_table_rollup above
-- -- Hamburg's subarea_l1/district area_name is real (no Berlin-Bezirk-style blank-name gap), so
-- unlike /berlin/maps' equivalent query this one needs no name-fallback join.
--
-- #310 review fix (R-310-1): stage_label de-jargons typology_stage with the exact same stage-name
-- mapping used everywhere else on this page -- the raw machine code (e.g.
-- 'active-gentrification') was previously shown verbatim here, the only table on the page that
-- did so. has_incomplete_population is added (D2) so this table -- unlike area_table_rollup above,
-- which has one row per area -- can disclose per-row whether THIS area's shares are population- or
-- equal-weighted, since a single mix table spans every area at the selected level.
select
    area_name,
    case typology_stage
        when 'active-gentrification' then 'Active gentrification'
        when 'pioneer-signal' then 'Early pioneer signal'
        when 'improving-vulnerable' then 'Improving, vulnerable area'
        when 'pre-gentrification' then 'Pre-gentrification watch'
        when 'consolidation-pressure' then 'Consolidated, still intensifying'
        when 'stable-established' then 'Stable, established'
        else typology_stage -- 'uninhabited / no data' -- already plain language, pass through
    end as stage_label,
    stage_population_share,
    stage_n_children,
    has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix
where area_level = '${inputs.area_level.value}'
  and city_code = 'HH'
  and variant = 'live_data'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${inputs.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
order by area_name, stage_population_share desc nulls last
```

<DataTable data={area_mix_table} rows=50 search=true>
    <Column id=area_name title="Area"/>
    <Column id=stage_label title="Stage"/>
    <Column id=stage_population_share title="Share (population-weighted, or equal-weighted — see last column)" fmt="pct0"/>
    <Column id=stage_n_children title="Constituent Gebiete"/>
    <Column id=has_incomplete_population title="Population data incomplete for this area?"/>
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
  by the *most widespread* ("dominant") stage among each area's constituent Gebiete — always shown
  with its share (population-weighted where possible, equal-weighted as a flagged fallback
  otherwise) and the full stage mix (see the "Stage mix" table), never as a standalone label. Areas
  with fewer than 3 Gebiete contributing real data are flagged fragile.
- **A coarse-grain reading is directionally biased toward "calm", not neutral.** Plurality voting
  resolves an area to whichever stage is most widespread among its constituents, and the most
  widespread stage is, by construction, usually the least acute one — so coarser levels
  systematically understate pressure rather than randomly blurring it. An area shown as "Stable,
  established" can still contain neighbourhoods under acute pressure; this map cannot be read as
  evidence that pressure is absent anywhere in it. The share of the area in an acute-pressure stage
  (residents where population data exists, otherwise constituent areas — in the tooltip and table
  above) and the statistisches Gebiet level — the finest grain this site publishes — are where that
  pressure is actually locatable.
- **The rollup "Social status"/"Speed of change" figures are a mean ordinal class (a mean rank),
  population-weighted where population data is complete and equal-weighted otherwise, not a
  rescaled score.** They are not offered as a map colour at Stadtteil/Bezirk grain, and the table
  above no longer ranks by them, for exactly this reason — see the Indicator note above the map.
- **"Population-weighted" is a best-effort weighting, not a guarantee.** Hamburg's latest published
  period has no population figures for effectively any Gebiet, so every Stadtteil/Bezirk rollup
  shown here currently falls back to *equal* weighting across its constituent Gebiete rather than
  true population weighting — flagged per-area as "population data incomplete" in the table and
  map tooltip.
- **No neighbourhood names at the Gebiet level** — Hamburg's statistische Gebiete are shown by
  numeric code only; see the [Hamburg data hub](/hamburg) for why. Stadtteil/Bezirk do have names.
- **Only Hamburg's D1/D2 Sozialmonitoring outcome is shown here** — the demographic (D4)
  composite, land value & rent, and Milieuschutz-equivalent displacement zones are not (yet)
  published as a Hamburg map; see [methodology §6](/methodology) for the full inventory.
- **This map is never combined with, or compared numerically against, Berlin's map** — see
  [methodology §6](/methodology)'s structural rule against pooled cross-city ranking.

---

<FooterNav />
