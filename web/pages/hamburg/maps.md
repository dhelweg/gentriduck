---
title: Maps — gentrification stages by area
sidebar_position: 2
---

<!--
  H3 (#237) scope (c): Hamburg's own maps page, mirroring pages/berlin/maps.md's structure but
  scoped to what's actually real for Hamburg (see pages/hamburg/index.md's header comment for the
  full data inventory). Deliberately NOT a shared/toggled page with Berlin's /berlin/maps -- per
  the H3-domain-signoff.md structural guard (condition 2: "no pooled cross-city ranking or numeric
  status_index/dynamism_index differencing in any Hamburg-vs-Berlin UI"), Hamburg gets its own
  route, its own map instance (<PolygonMap> since #351, formerly <AreaMap>), and its own colour-scale computation, never a shared component
  instance that could invite a side-by-side/subtracted reading. See /methodology §6's "No pooled
  Berlin<->Hamburg ranking" bullet for the site-wide statement of this rule.

  Differences from /berlin/maps, all deliberate (not oversights):
  - No `variant` dropdown -- Hamburg only has `live_data` (see pages/hamburg/index.md).
  - #353 (parity): click-through links added -- clicking an area opens its profile page
    (/hamburg/area/[code] for a Gebiet, /hamburg/area/subarea_l1/[code] or
    /hamburg/area/district/[code] at the rollup levels), exactly as /berlin/maps does. Previously
    listed here as a difference; there was no gate reason for it, the profile routes simply didn't
    exist yet when H3 built this page. The 4 merged-pair Stadtteil codes (slash-joined, #334) get a
    NULL link (no geometry, no profile page).
  - Uses the `subarea_l2_live_data.geojson`/`subarea_l1_current.geojson`/`district_current.geojson`
    exports (web/scripts/export_area_geojson.py), not a variant of the existing plr_*/bzr_* files.

  The stage color palette and dropdown/indicator options are otherwise the same convention as
  /berlin/maps (#358: a cycle-ordered stage palette keyed on stage_number; single-hue sequential
  for the raw ordinals) -- same D1xD2 matrix, same colour semantics -- but this is a SEPARATE
  <PolygonMap> instance/data query,
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
  added to both the rollup Alert and Honest caveats. D4 -- acute_stage_share (#358: now
  stages_2_4_share) composition counterweight, computed page-side, added to the tooltip and table. R-310-1/R-310-5 -- Stage-mix
  table de-jargoned/row cap raised; reader-facing copy prefers "most widespread stage" (internal
  column keys untouched). No Ortsteil equivalent here (C5 is Berlin-only).

  #310 domain re-review fixes (2026-07-30, second round -- see /berlin/maps' identical header
  comment and docs/epic-e/310-map-granularity-domain-signoff.md, "Re-review after fix commit
  18dfeda3", for the full rationale, not city-specific): the D4 counterweight and C1 scalar-column
  relabelling each reintroduced the D2 label-overreach defect this fix closes. D2-R1 -- that
  share's "Residents in ..." label (tooltip, table column, D3 Alert, Honest-caveats bullet) was an
  unconditional residents claim, false on Hamburg's wholly-equal-weighted rollup surface (7/7
  districts, 99/104 Stadtteile) where it is really a share of constituent Gebiete -- relabelled as
  a neutral "Share in ..." (#358: now "Share in stages 2–4") with the same
  incomplete-population hedge `dominant_share` already carries. D2-R2 -- the scalar column
  titles/Indicator note/caveats bullet lost their "where available" qualifier; restored as "mean
  ordinal class (mean rank), population-weighted where population data is complete and
  equal-weighted otherwise".

  #358 (docs/epic-g/358-spec.md §1, §4, §5; Revision 1): same change as /berlin/maps (see its
  header comment) -- stage labels/numbers from the dbt display columns, no page-side CASE or
  "severity" sort, cycle-ordered palette without an alarm colour, "Share in stages 2–4", old
  wording replaced per spec §5, shared <StageNumberLegend>/<StatusTrendLegend>. "No stage on
  record" rows in the Stage-mix table carry the C2 note "not scored by the Sozialmonitoring".
-->

<script>
  import { base } from '$app/paths';

  // #358 (docs/epic-g/358-spec.md §1 "Colours"): stage palette keyed on stage_number, in cycle
  // order, no alarm colour -- the same constant and rationale (incl. the CVD check) as
  // /berlin/maps' stageColorByNumber comment. Kept as a separate constant here so each city keeps
  // its own colour-scale computation (H3 structural guard above).
  //
  // #310 review fix (HIGH-1), still applicable: PolygonMap assigns `colorPalette` POSITIONALLY
  // over the DISTINCT values of the map's `value` column in first-occurrence order, so
  // `presentStagePalette()` derives the palette from the current query result's own distinct
  // stage_label values in that order, looking each colour up by the row's stage_number. The
  // `areas_leaf`/`areas_rollup` queries below are ordered by stage_number (NULLs last), so the
  // legend reads 1..6, then "No stage on record".
  //
  // #351: the map is drawn by web/components/PolygonMap.svelte (SVG, no Leaflet/tile basemap)
  // instead of <AreaMap>; it is still a separate map instance and query from Berlin's (the H3
  // structural guard above); only the drawing component is shared.
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

  const indicatorShortLabel = {
    status_class: 'Gentrification stage',
    status_index: 'Social status',
    dynamism_index: 'Dynamism'
  };

  // #310: subarea_l2 is the individual-Gebiet leaf level (gentrification_index, unchanged from
  // H3); subarea_l1/district are rollup levels (mart_area_rollup_stage_mix). #352: every level now
  // has an area_name -- subarea_l2's is a derived label ('<Stadtteil> · <OSM place name>' or
  // '<Stadtteil> · Gebiet <code>', int_hamburg_gebiet_names), since the source has none.
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
  // #351: undefined (PolygonMap waits) until the Dropdown has a value, instead of requesting
  // "/geo/undefined" (a 404) for the one tick before the input store initializes.
  $: geoJsonUrl = geoJsonByLevel[inputs.area_level.value]
    ? `${base}/geo/${geoJsonByLevel[inputs.area_level.value]}`
    : undefined;

  // #352: both branches lead with area_name (the Gebiet label at subarea_l2, see isRollup above)
  // and keep the code as a small last line. subarea_l1/district (#310) additionally always carry
  // dominant_share/n_habitable_children alongside the indicator value (design point 3: never a
  // standalone dominant-stage label).
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
        // rows (no mart change) -- the share of the area in stages 2-4 (#358 label; the same
        // three stages as before), shown in the same visual unit as the fill colour/most-
        // widespread-stage label (see the D3 caveat below). #310 D2-R1: a neutral "share" label
        // (not "residents"), since Hamburg's entire rollup surface has has_incomplete_population;
        // the population_note line below discloses per-row whenever THIS area fell back to equal
        // weighting.
        { id: 'stages_2_4_share', title: 'Share in stages 2–4', fmt: 'pct0' },
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
        { id: 'area_name', showColumnName: false, valueClass: 'font-bold text-sm', fmt: 'id' },
        {
          id: effectiveIndicator === 'status_class' ? 'stage_label' : effectiveIndicator,
          title: indicatorShortLabel[effectiveIndicator],
          fmt: effectiveIndicator === 'status_class' ? 'id' : 'num1'
        },
        // #352 review: code_note is null (line skipped) when the label already holds the code.
        { id: 'code_note', title: 'Gebiet code', valueClass: 'text-xs opacity-60', fmt: 'id' }
      ];
</script>

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Maps — gentrification stages by area" lede="Colours each of Hamburg's statistische Gebiete by its current gentrification stage (numbered 1–6 by position in the cycle; see the legend), from Hamburg's own official Sozialmonitoring — the same D1×D2 typology matrix used for Berlin, applied to Hamburg's own indicators and observation window." />

<Alert status="info">
  <b>How to read the map:</b> the <b>"Gentrification stage"</b> option colours each area by one of
  six plain-language stages (numbered 1–6 by position in the cycle; see the legend) — the same
  six-stage typology used on <a href="/berlin/maps">Berlin's map</a>. At the statistisches Gebiet
  level, the <b>"Social status"</b> and <b>"Dynamism"</b> options are also offered, showing the raw
  ordinal inputs (not offered as a map colour at Stadtteil/Bezirk grain — see the Indicator note
  there for why): "Social status" is ordinal — higher shading means <b>more deprived</b>, not more
  prosperous. "Dynamism" is the official status-trend class: 1 = improving, 2 = stable,
  3 = worsening relative to the city, so higher shading means a <b>worsening</b> trend, over
  Hamburg's own <b>3-year</b> observation window (Berlin's is 2 years) — see
  <a href="/methodology">methodology §6</a> for why that is a qualitative difference in what
  "active" means, not just a numeric-scale one. Under "Gentrification stage", areas without a stage
  are drawn in very light grey as "No stage on record"; areas without a value for the other two
  options are drawn with grey hatching ("No data").
</Alert>

<StageNumberLegend />

<StatusTrendLegend />

<Alert status="warning">
  <b>Gebiet names on this map are labels, not official names.</b> Hamburg's statistische Gebiete
  carry only a numeric code in the source geodata (unlike Berlin's named Planungsräume or
  Hamburg's own Stadtteile/Bezirke), so each one is shown as its Stadtteil plus an OpenStreetMap
  neighbourhood name that lies inside it, or its code where there is none — hover any Gebiet for
  its label and value, and click it to open its profile page (or search for it in
  <a href="/hamburg/area">the full Gebiet list</a>).
  <b>This map is never shown alongside, or blended with, Berlin's own map</b> — Hamburg and Berlin
  each have their own route, their own colour-scale computation, and are never offered as a
  side-by-side or subtracted comparison (see <a href="/methodology">methodology §6</a>).
</Alert>

<Dropdown name="area_level" title="Area level" defaultValue="subarea_l2">
  <DropdownOption value="subarea_l2" valueLabel="Statistisches Gebiet — finest detail"/>
  <DropdownOption value="subarea_l1" valueLabel="Stadtteil — ~104 named districts"/>
  <DropdownOption value="district" valueLabel="Bezirk — 7 boroughs"/>
</Dropdown>

{#if isRollup}
<Alert status="info">
  <b>Stadtteil / Bezirk are population-weighted rollups, where possible, of the Gebiet-level
  data</b> — never a re-scored index at this grain (averaging the underlying MSS-equivalent
  ordinals into a single new category would be statistically invalid; see the
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
  <b>A "6 · Stable / established" reading at this grain does not mean that no part of the area is
  changing.</b> Plurality voting resolves an area to whichever stage is most widespread among its
  constituent Gebiete — and because "6 · Stable / established" is, by construction, the most common
  stage citywide, coarser levels are systematically biased toward reading as calm, not toward
  neutral noise. An area whose map colour reads "6 · Stable / established" can still contain
  smaller neighbourhoods in stages 2–4; this map alone cannot show you whether it does. The share
  of the area in stages 2–4 (residents where population data exists, otherwise constituent areas —
  in the tooltip and table below) and the statistisches Gebiet level — the finest grain this site
  publishes — are where such change can actually be located.
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
-- gentrification_index: live_data / subarea_l2 (H3, #237). #358: stage_label/stage_number are
-- gentrification_index's own dbt display columns (typology_stage_display), the same as
-- /berlin/maps' `areas_plr` -- same D1xD2 matrix, reused unmodified per H1-domain-signoff.md §1.
-- Ordered by cycle position so the legend reads 1..6, then "No stage on record".
select
    city_code,
    area_code,
    area_name,
    -- #352 review: the Gebiet code as a separate tooltip line, only where the label doesn't
    -- already contain it (the '<Stadtteil> · Gebiet <code>' fallback labels do).
    case when strpos(area_name, 'Gebiet ' || area_code) > 0 then null else area_code end
        as code_note,
    status_index,
    dynamism_index,
    status_class,
    stage_label,
    stage_number,
    -- #353: click-through to this Gebiet's profile page, same `${base}`-prefixed column
    -- convention as /berlin/maps' areas_plr `link` (PolygonMap expects an already-prefixed URL).
    '${base}/hamburg/area/' || area_code as link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )
order by stage_number nulls last, area_name, area_code
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
-- #310 review fix (D4 -- domain sign-off blocking): `stages_2_4` (#358: formerly `acute`) sums
-- stage_population_share over stage_number 2-4 (the same three typology_stage values) -- see /berlin/maps' identical `areas_rollup` query for
-- the full rationale/citation and the NULL-vs-0 note (the mart is sparse, so a filtered SUM over
-- zero matching rows is NULL, not 0 -- `stages_2_4_share_raw` is coalesced to 0 below only when
-- the area has at least one habitable child).
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
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
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population,
    m.dominant_stage_label as stage_label,
                m.dominant_stage_number as stage_number,
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
    end as population_note,
    -- #353: rollup profile pages, /hamburg/area/<level>/<code> (same pattern as /berlin/maps).
    -- Merged-pair Stadtteil codes (#334, slash-joined) have no profile page -> NULL, no link.
    case
        when m.area_code like '%/%' then null
        else '${base}/hamburg/area/${inputs.area_level.value}/' || m.area_code
    end as link
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join stages_2_4 as a on m.area_code = a.area_code
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
order by m.dominant_stage_number nulls last, m.area_name, m.area_code
```

<PolygonMap
    data={isRollup ? areas_rollup : areas_leaf}
    geoJsonUrl={geoJsonUrl}
    geoId="area_code"
    areaCol="area_code"
    value={effectiveIndicator === 'status_class' ? 'stage_label' : effectiveIndicator}
    legendType={effectiveIndicator === 'status_class' ? 'categorical' : 'scalar'}
    colorPalette={effectiveIndicator === 'status_class' ? presentStagePalette(isRollup ? areas_rollup : areas_leaf) : undefined}
    title="Hamburg {areaLevelLabel[inputs.area_level.value]} — {effectiveIndicatorLabel}, latest period"
    link="link"
    tooltip={areaTooltip}
/>

Click an area on the map to open its {isRollup ? 'profile' : 'Gebiet'} page.

## The numbers behind the map

```sql area_table_leaf
select
    area_name,
    -- #353 (#352 review follow-up): the code only where the label doesn't already contain it,
    -- same label-contains-code test as code_note above.
    case when strpos(area_name, 'Gebiet ' || area_code) > 0 then null else area_code end
        as code_note,
    status_index,
    dynamism_index,
    stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )
-- #358 (spec §3): cycle order (stage_number, NULLs last), then name, then code -- no longer
-- ordered by the Dynamik reading. User-sortable via the DataTable headers.
order by stage_number nulls last, area_name, area_code
```

```sql area_table_rollup
-- #310 review fix (D4 -- domain sign-off blocking): `stages_2_4` (#358: formerly `acute`) sums
-- stage_population_share over stage_number 2-4 (the same three typology_stage values) -- see /berlin/maps' `area_table_rollup` query for the
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
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
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
    m.dominant_stage_label as stage_label,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join stages_2_4 as a on m.area_code = a.area_code
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
    <Column id=stages_2_4_share title="Share in stages 2–4 (improving from very low, low or middle status; population-weighted, or equal-weighted — see the incomplete-data column)" fmt="pct0"/>
    <Column id=n_habitable_children title="Gebiete with data"/>
    <Column id=is_dominant_fragile title="Fragile (< 3 Gebiete)?"/>
    <Column id=has_incomplete_population title="Population data incomplete (share above is equal-weighted, not population-weighted)?"/>
</DataTable>

### Stage mix — full breakdown per area

Never rely on the most widespread stage alone: this table is the full stage-mix distribution
behind every area above — population-weighted where an area's population data is complete,
equal-weighted as a flagged fallback otherwise (see the "population data incomplete" column) —
including the "No stage on record" bucket (Gebiete not scored by the Sozialmonitoring), shown as
a count of constituent areas, not a share (it is excluded from the share calculation by design;
see that column's own values below).

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
-- #358: stage_label is the mart's dbt display column; stages listed in cycle order within each
-- area; stage_note carries the spec §1 C2 text for the "No stage on record" bucket.
select
    area_name,
    stage_label,
    case
        when stage_number is null then 'not scored by the Sozialmonitoring'
        else ''
    end as stage_note,
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
order by area_name, stage_number nulls last
```

<DataTable data={area_mix_table} rows=50 search=true>
    <Column id=area_name title="Area"/>
    <Column id=stage_label title="Stage"/>
    <Column id=stage_note title="Note"/>
    <Column id=stage_population_share title="Share (population-weighted, or equal-weighted — see last column)" fmt="pct0"/>
    <Column id=stage_n_children title="Constituent Gebiete"/>
    <Column id=has_incomplete_population title="Population data incomplete for this area?"/>
</DataTable>

{:else}

<DataTable data={area_table_leaf} rows=10 search=true>
    <Column id=area_name title="Statistisches Gebiet"/>
    <Column id=code_note title="Code (if not in the name)"/>
    <Column id=status_index title="Social status (1=least deprived … 4=most deprived)"/>
    <Column id=dynamism_index title="Status trend class (1 = improving, 2 = stable, 3 = worsening; 3-year window)"/>
    <Column id=stage_label title="Gentrification stage"/>
</DataTable>

{/if}

Want to see how Hamburg's Gebiete have moved since 2019? Use the
[time series page](/hamburg/time-series). Clicking a Gebiet on the map above opens its exact
profile page; browsing by district works on the [area detail page](/hamburg/area-detail). Want
the commercial-mix (shops/cafés) view instead of the social-status index — POI density and
Offering Advantage by domain — see the
[POI & Offering Advantage map](/hamburg/poi-map).

## Honest caveats

- **Social status and dynamism are ordinal, not linear** — higher social-status shading means
  **more deprived**, not more prosperous. See [methodology & data sources](/methodology) for the
  full decoder.
- **Hamburg's Dynamik window is 3 years, Berlin's is 2** — this is a qualitative difference in
  what "4 · Active gentrification" means, not just a numeric-scale one; see
  [methodology §6](/methodology) point 1.
- **Stadtteil / Bezirk are population-weighted rollups, where possible, never a re-scored index.**
  The map colours by the *most widespread* ("dominant") stage among each area's constituent
  Gebiete — always shown with its share (population-weighted where possible, equal-weighted as a
  flagged fallback otherwise) and the full stage mix (see the "Stage mix" table), never as a
  standalone label. Areas with fewer than 3 Gebiete contributing real data are flagged fragile.
- **A coarse-grain reading is directionally biased toward "calm", not neutral.** Plurality voting
  resolves an area to whichever stage is most widespread among its constituents, and the most
  widespread stage is, by construction, usually "6 · Stable / established" — so coarser levels
  systematically understate local change rather than randomly blurring it. An area shown as
  "6 · Stable / established" can still contain smaller neighbourhoods in stages 2–4; this map
  cannot be read as evidence that no part of it is changing. The share of the area in stages 2–4
  (residents where population data exists, otherwise constituent areas — in the tooltip and table
  above) and the statistisches Gebiet level — the finest grain this site publishes — are where such
  change can actually be located.
- **The rollup "Social status"/"Speed of change" figures are a mean ordinal class (a mean rank),
  population-weighted where population data is complete and equal-weighted otherwise, not a
  rescaled score.** They are not offered as a map colour at Stadtteil/Bezirk grain, and the table
  above no longer ranks by them, for exactly this reason — see the Indicator note above the map.
- **"Population-weighted" is a best-effort weighting, not a guarantee.** Hamburg's latest published
  period has no population figures for effectively any Gebiet, so every Stadtteil/Bezirk rollup
  shown here currently falls back to *equal* weighting across its constituent Gebiete rather than
  true population weighting — flagged per-area as "population data incomplete" in the table and
  map tooltip.
- **Gebiet names are labels, not official names** — Hamburg's statistische Gebiete have only a
  numeric code in the source data, so each is shown as its Stadtteil plus an OpenStreetMap
  neighbourhood name inside it, or its code; see the [Hamburg data hub](/hamburg) for details.
  Stadtteil/Bezirk names are the official ones.
- **Only Hamburg's D1/D2 Sozialmonitoring outcome is shown here** — the demographic (D4)
  composite, land value & rent, and Milieuschutz-equivalent displacement zones are not (yet)
  published as a Hamburg map; see [methodology §6](/methodology) for the full inventory.
- **This map is never combined with, or compared numerically against, Berlin's map** — see
  [methodology §6](/methodology)'s structural rule against pooled cross-city ranking.

## Where next

- **[Time series](/hamburg/time-series)** — how Hamburg's Gebiete have moved over the 2019–2025
  trajectory window.
- **[Area detail](/hamburg/area-detail)** — browse by district, or open one Gebiet's full profile
  via a map click.
- **[POI & Offering Advantage map](/hamburg/poi-map)** — the commercial-mix (shops/cafés) view of
  the same Gebiete.
- **[Methodology & data sources](/methodology)** — what the six gentrification stages
  mean, and (§6) how Hamburg's data differs from Berlin's.

---

<FooterNav />
