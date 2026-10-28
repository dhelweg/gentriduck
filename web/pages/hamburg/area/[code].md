---
breadcrumb: "select coalesce((select nullif(area_name, '') from gentriduck_marts.dim_area_geometry where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${params.code}' limit 1), '${params.code}') as breadcrumb"
hide_breadcrumbs: true
---

<!--
  I21-g (#301, parent #284/I21): Hamburg's `primary`-grain (statistisches Gebiet / subarea_l2) area
  page — the Hamburg leaf of the canonical per-level template I21-f (#300) consolidated at
  /berlin/area/[code].md, per docs/epic-i/I21-ia-restructure-scoping.md §2.2 and the route shape
  decided in docs/epic-i/I21-a-route-ruling.md §2/§4 (`/hamburg/area/[code]`, bare leaf, singular
  `area`, mirroring Berlin's PLR leaf exactly — NOT `/hamburg/areas/…`).

  Discovered/crawled via pages/hamburg/area/index.md's flat Gebiet list (same "Evidence builds
  whatever route a link points at" mechanism as every other templated page on this site — see that
  page's own header comment for why a flat list, not a chained children-table crawl, is used for
  Hamburg specifically).

  SCOPE (Track 1 of I21 §4 — structure only, no live data): this page renders the FULL canonical
  section order (docs/epic-i/I21-ia-restructure-scoping.md §2.2's `primary`-grain row) so the
  template is genuinely reviewable end-to-end, but every section that would show a real Hamburg
  figure renders the shared <NotYetPublished> honest-deferred state instead of a live query — see
  that component's own header comment for why a fixed placeholder is used here rather than a live
  query that would happen to return real rows for some marts (e.g. gentrification_index already
  publishes Hamburg subarea_l2 stage/status on /hamburg/maps, H3/#237) and empty rows for others.
  Publishing this page's real content is explicitly reserved for I21-i (#303), which is its own,
  separately-gated ticket — this page must not pre-empt that gate even where a mart could already
  answer the query correctly today. No mart is queried here except dim_area_geometry, for the area's
  own existence/code (structural plumbing, not a statistic — same framing as
  pages/hamburg/area/index.md).

  Hierarchy nav (§2.2 row 8): a `primary`-grain leaf only needs an "Up:" link (no children — same as
  /berlin/area/[code].md's own leaf treatment). Hamburg's subarea_l2 -> subarea_l1 parent edge IS
  resolved on the data layer (OA-D1b, #240, ST_Within centroid-in-polygon crosswalk, geo-DS +
  domain-expert PASS, merged to develop -- see transform/models/intermediate/dim_area_hierarchy.sql's
  `hh_l2_to_l1` CTE) — this SUPERSEDES reference/area-hierarchy.md's current text, written before
  OA-D1b landed, which still describes this edge as "not currently resolved" (flagged here and in
  this ticket's own report for the PM/data-analyst to correct as part of I21-j, the docs-refresh
  ticket; not corrected in this file since that page is out of this ticket's scope).

  #302 (I21-h): closes the web-layer wiring gap flagged in the previous version of this comment
  (kept in git history) -- dim_area_hierarchy is now exposed to the web layer via the thin
  pass-through mart mart_area_hierarchy.sql (transform/models/marts/), exported to parquet by
  transform/export_serving_parquet.py and registered under
  web/sources/gentriduck_marts/mart_area_hierarchy.sql. This commit is export/wiring only -- it does
  not re-derive or change the OA-D1b spatial method itself (see mart_area_hierarchy.sql's own header
  for the grounding citation). The "Up:" link below now queries that mart for a real parent Stadtteil
  code + name (joined against dim_area_geometry for the display name), replacing the previous
  deferred-state Alert.

  #317 (Hamburg trajectory web wiring): closes the display-wiring gap #314 left open (that ticket's
  own report and the H3/#237 header note above both flagged "no web display layer for it is built
  here yet"). #314 already dual-signed-off (docs/epic-h/314-hh-trajectory-geo-signoff.md,
  314-hh-trajectory-domain-signoff.md, both PASS) admitting Hamburg (city_code='HH',
  area_vintage='current') into `fct_gentrification_trajectory` using H-C2/#159's already-approved
  cadence-normalized `trajectory_window_years=6` window (2019-2025), unmodified thresholds -- no
  Hamburg-specific re-derivation. The "Social status & trajectory" section below now reads those
  real rows, mirroring pages/berlin/area/[code].md's own `trajectory_summary` /
  `district_trajectory_mix` query shape (area_vintage/city_code swapped; the sibling comparison is
  resolved via `mart_area_hierarchy`'s subarea_l2 -> subarea_l1 edge, #302/I21-h, since Hamburg's
  area codes don't nest by substr() prefix the way Berlin's LOR codes do). Display wiring only -- no
  dbt model/mart change (#314 already landed and is dual-signed-off; if this ticket had needed a
  model change it would have stopped short and escalated instead, per its own scope note).

  Deliberately NOT read here: `gentrification_index`'s current stage/status (still reserved for
  I21-i, #303 -- a separate, not-yet-cleared gate, unaffected by this ticket) and
  `fct_gentrification_change` (still Berlin-only, H3 sign-off condition 4) -- only the columns
  `fct_gentrification_trajectory` itself already publishes. The pageLevel `<NotYetPublished>` banner
  below is updated to drop "trajectory" from its list accordingly; every other section on this page
  (commercial mix, dominance, demographics, amenities, land value/rent) stays gated, unchanged.

  BINDING (carried forward verbatim from #314's domain sign-off §5 "Carried-forward binding
  condition", itself inherited from 159-hc2-domain-signoff.md Q1): every rendering of this section
  must disclose (1) the classification describes a recent ~6-year window (2019-2025), not Hamburg's
  full 13-edition history, and (2) it is a status-only classification, never a displacement verdict
  -- both stated in the Alert immediately below this heading, not buried in a footnote.

  #353 (Hamburg-Berlin parity review): this page now follows the Berlin Planungsraum profile
  (pages/berlin/area/[code].md) section by section, filling every section that existing sign-offs
  already cover and saying plainly, with the reason, where they don't. The full gap list, with the
  sign-off or missing data behind each decision, is docs/epic-g/353-hamburg-berlin-parity-audit.md.
  The rule applied: show a Hamburg figure here only if the same figure for the same Gebiet is
  already public elsewhere on the site under a sign-off; add no new Hamburg aggregate beyond
  counts and sums of such figures (no averages of indices, no new comparisons).
  - Current stage + pressure trend (`gentrification_index`, latest live_data period): the same row
    /hamburg/maps already shows for this Gebiet (H3/#237, docs/epic-h/H3-geo-signoff.md,
    H3-domain-signoff.md). H3 domain condition 1(iv) is honoured: the stage is labelled "not
    directly equivalent" to a same-named Berlin stage, linking to methodology §6. The I21-g
    "reserved for I21-i" note above is superseded here: #303 (I21-i) closed after admitting only
    price/rent rows to the mart, and the stage figure itself was already public on the map.
  - Commercial mix over time (`fct_poi_development`, HH/current) and the Offering Advantage radar
    (`mart_poi_offering_advantage_map`, HH, standard/faithful, the same rows /hamburg/poi-map
    colours its map by; #312/#318 dual sign-offs): same charts and I14/I15 framing conditions as
    the Berlin page, with Hamburg's own baseline. Rows with the mart's minimum-base flag are left
    out of the radar and disclosed (same suppression as /hamburg/poi-map); the Berlin page's
    per-domain "fewer than 5 places" dagger is kept. NOT carried over: Berlin's district-average
    radar line and district/city status-chart lines (averages never computed or reviewed for
    Hamburg), and the Offering-Advantage-as-index-input sentence (false for Hamburg, whose stage is
    the Sozialmonitoring D1/D2 outcome only).
  - Up-link / hierarchy: the parent Stadtteil (OA-D1b/#240 crosswalk via mart_area_hierarchy,
    #302) and, one hop further, its district (source-provided edge).
  - Still not shown, each with its reason on the page: a written portrait (Berlin's wording is
    I14-reviewed for Berlin areas only), status over time (fct_gentrification_change is BER-only,
    H3 condition 4; #314 asks for any long-run Hamburg view to be a separately labelled product),
    within-group dominance (source layer restricted to BER, web/sources/.../mart_poi_dominance.sql),
    people & structure (Hamburg demographics exist only at Stadtteil/district grain and their web
    slice has its own forward conditions, docs/epic-h/313-hh-area-demographics-domain-signoff.md
    C-5..C-8), land value & rent (docs/epic-h/303-price-rent-hamburg-domain-signoff.md Condition 2).
-->

```sql code_info
-- Build-time-fixed route parameter, the same `${params.code}` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's `area_info` query) --
-- selected into a plain row so it can be referenced in markup as `code_info[0].area_code`.
select '${params.code}' as area_code
```

```sql area_exists
select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${params.code}'
limit 1
```

```sql name_info
-- #307/#352: the Gebiet's display label. The source has no Gebiet names, so
-- dim_area_geometry.area_name for subarea_l2 is derived (int_hamburg_gebiet_names):
-- '<Stadtteil> · <OSM place name>' where an OSM neighbourhood/quarter point lies inside the
-- Gebiet, else '<Stadtteil> · Gebiet <code>'. Every Gebiet has one; the script fallback below
-- only covers a route with no geometry row at all.
-- #353 (#352 review follow-up): `label_has_code` is the ONE label-contains-code test used site-wide
-- (same expression as the code_note columns on /hamburg/maps, /hamburg/poi-map and the Gebiet
-- lists), replacing a JS `areaName.includes(code)` check that could also match a code appearing
-- inside an OSM name.
select area_name, strpos(area_name, 'Gebiet ' || area_code) > 0 as label_has_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${params.code}'
limit 1
```

```sql parent_info
-- #302 (I21-h): resolved parent Stadtteil, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name (structural lookup, not a statistic -- same framing as area_exists above).
-- #353: plus the Stadtteil's own parent district (hh_l1_to_district, source-provided), for the
-- breadcrumb/Up line and the district-total amenity column's label.
select
    h.parent_area_code as stadtteil_code,
    g.area_name as stadtteil_name,
    h2.parent_area_code as district_code,
    gd.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.parent_area_code
left join
    gentriduck_marts.mart_area_hierarchy as h2
    on h2.city_code = 'HH' and h2.area_level = 'subarea_l1' and h2.area_code = h.parent_area_code
left join
    gentriduck_marts.dim_area_geometry as gd
    on gd.city_code = 'HH' and gd.area_level = 'district' and gd.area_code = h2.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = '${params.code}'
limit 1
```

```sql current_stage
-- #353: this Gebiet's current stage and pressure trend -- the exact row /hamburg/maps' `areas_leaf`
-- query colours this Gebiet by (live_data, subarea_l2, latest Hamburg period; H3/#237). Re-shown
-- here, not re-derived.
select
    period_yyyymm,
    status_class as stage,
    dynamism_class as pressure_trend,
    status_index,
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
  and area_code = '${params.code}'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )
```

```sql trajectory_summary
-- #317: real Hamburg trajectory data, via fct_gentrification_trajectory (Hamburg admitted #314,
-- H-C2/#159 cadence-normalized trajectory_window_years=6 window, area_vintage='current'). Same
-- shape as pages/berlin/area/[code].md's own trajectory_summary query, area_vintage/city_code
-- swapped -- no new computation, this ticket is display wiring only.
select
    n_editions,
    first_edition,
    last_edition,
    status_index_first,
    status_index_last,
    status_delta,
    trajectory_type,
    dominant_stage,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'HH' and area_vintage = 'current' and area_code = '${params.code}'
```

```sql sibling_trajectory_mix
-- Distribution of trajectory_type across this Gebiet's sibling Gebiete (same Stadtteil) -- the same
-- "N of M other areas ... show this pattern" comparison as the PLR page's district_trajectory_mix,
-- resolved via mart_area_hierarchy's already-published subarea_l2 -> subarea_l1 edge (OA-D1b/#240,
-- #302/I21-h), not re-derived here.
select t.trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where
    t.city_code = 'HH' and t.area_vintage = 'current'
    and h.parent_area_code = (
        select parent_area_code
        from gentriduck_marts.mart_area_hierarchy
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${params.code}'
        limit 1
    )
group by all
```

```sql gebiet_label_stats
-- #353 (#352 review follow-up): how many Gebiet labels carry an OSM place name, computed instead of
-- the hard-coded "41 of 943" -- same label_has_code test as name_info above.
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'
```

<script>
  // #308: for the drill-down mini map's geoJsonUrl base-path prefixing (#144 convention) -- see
  // this page's "## Where this area sits" section below.
  import { base } from '$app/paths';

  // Plain script-computed fallback, kept out of markdown text/attribute strings -- mdsvex's
  // smart-quote pass rewrites straight `'…'` quotes inside markdown text (including heading text
  // containing a mustache expression) into curly typographic quotes, which then breaks the Svelte
  // expression parser (confirmed: build failed on the equivalent inline ternary in a `##` heading).
  // Computing the fallback here once avoids embedding any quote character in markdown prose.
  $: codeLabel = code_info[0] ? code_info[0].area_code : '';

  // #352: the Gebiet label leads (see name_info's comment); the code moves to the eyebrow as
  // secondary text, and only when the label doesn't already contain it (the code-fallback labels
  // do). "Statistisches Gebiet {code}" remains only for a route with no geometry row.
  // #353: `label_has_code` comes from SQL (name_info), the one site-wide test.
  $: areaName = name_info?.[0]?.area_name ? name_info[0].area_name : null;
  $: nameLabel = areaName ?? `Statistisches Gebiet ${codeLabel}`;
  $: heroEyebrow =
    'Chapter 3 — The Evidence · most granular' +
    (areaName && !name_info[0].label_has_code ? ` · Gebiet ${codeLabel}` : '');

  // #353: breadcrumb trail + browser-tab title, same shape as the Berlin PLR page
  // ("Home › <City> › <full list> › <this area>").
  $: crumbs = [
    { label: 'Hamburg', href: '/hamburg' },
    { label: 'All Gebiete', href: '/hamburg/area' },
    { label: nameLabel }
  ];
  $: pageTitle = areaName ? `${areaName} — Gebiet profile · Hamburg` : null;
  $: parent = parent_info?.[0];
  $: labelStats = gebiet_label_stats?.[0];
  // Pre-formatted here, not inline in the markdown caveat list (smart-quote note above).
  $: osmLabelCount = labelStats ? `${labelStats.n_osm_named} of ${labelStats.n_gebiete} Gebiete` : 'a minority of Gebiete';

  // #353: plain-language stage line for "at a glance" -- the stage label is the same plain label
  // /hamburg/maps shows for this Gebiet; the "not directly equivalent" clause is H3 domain
  // condition 1(iv). No portrait wording beyond that (see this page's header comment).
  // The link is a literal `href="/methodology"`: Evidence's base-path preprocessor rewrites literal
  // hrefs in +page.md files (script included), so it must not carry `${base}` itself.
  $: cur = current_stage?.[0];
  $: stageSentence = cur && cur.stage_label
    ? `In Hamburg's latest Sozialmonitoring edition on this site (${String(cur.period_yyyymm).slice(0, 4)}), this Gebiet is in the stage <b>${cur.stage_label}</b>, with a <b>${cur.pressure_trend}</b> pressure trend. This is a Hamburg-coded stage: it is <b>not directly equivalent</b> to a Berlin stage of the same name (Hamburg's Dynamik window is 3 years, Berlin's 2; see <a href="/methodology">methodology §6</a>).`
    : 'No current Sozialmonitoring stage is on record for this Gebiet in the latest Hamburg edition on this site.';

  // #317: pace/comparison sentence for the "Social status & trajectory" section, computed the same
  // way as pages/berlin/area/[code].md's own speedSentence -- a display-layer heuristic over
  // already-published fct_gentrification_trajectory columns, no new statistic.
  $: traj = trajectory_summary?.[0];
  $: siblingRows = Array.isArray(sibling_trajectory_mix) ? sibling_trajectory_mix : Array.from(sibling_trajectory_mix ?? []);
  $: trajectorySentence = (() => {
    if (!traj || traj.n_editions == null) return null;
    if (traj.n_editions <= 1) {
      return "Only one annual Sozialmonitoring reading is on record for this Gebiet within the 2019–2025 window, so its pace of change can't be assessed yet.";
    }
    const delta = traj.status_delta != null ? Math.abs(Number(traj.status_delta)) : null;
    const pace = delta == null ? 'at an unclear pace' : delta < 0.4 ? 'only gradually' : delta < 1.2 ? 'at a moderate pace' : 'quickly, moving several status steps';
    const direction = {
      improving: 'become less deprived',
      declining: 'become more deprived',
      'stable-established': 'stayed consistently low-deprivation',
      'persistently-deprived': 'stayed consistently high-deprivation',
      mixed: 'shown no single clear direction'
    }[traj.trajectory_type] ?? 'shown an unclassified pattern';
    let sentence = `Within the 2019–2025 window (editions ${traj.first_edition}–${traj.last_edition} on record), it has ${direction}, ${pace} (trajectory confidence: ${traj.trajectory_confidence}).`;
    const total = siblingRows.reduce((s, r) => s + Number(r.n || 0), 0);
    const same = siblingRows.find((r) => r.trajectory_type === traj.trajectory_type);
    if (total > 0 && same) {
      sentence += ` ${same.n} of ${total} other Gebiete in this Stadtteil with a usable trajectory show this same "${traj.trajectory_type}" pattern.`;
    }
    return sentence;
  })();

  $: glanceParagraphs = [stageSentence, trajectorySentence].filter(Boolean);

  // #353: commercial-mix charts, same client-side helpers as the Berlin PLR page (I14 #231):
  // stacked-bar segments ordered by total count, largest first.
  $: poiTrendRows = Array.isArray(poi_trend) ? poi_trend : Array.from(poi_trend ?? []);
  $: poiCategoryOrder = Array.from(
    poiTrendRows.reduce((totals, row) => {
      totals.set(row.poi_category_h, (totals.get(row.poi_category_h) || 0) + Number(row.poi_count || 0));
      return totals;
    }, new Map())
  )
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);
  $: poiMixCtx = poi_mix_context?.[0];

  // #353: Offering Advantage radar, the Berlin PLR page's I14/I15 display transform
  // (pct_vs_baseline = (oa_domain - 1) * 100) over Hamburg's own rows. Minimum-base-flagged rows
  // are already dropped in SQL (poi_oa_radar); the per-domain "fewer than 5 mapped places" dagger
  // is the Berlin page's display-only guard, unchanged. No district-average series (see header).
  const OA_LOW_BASE_THRESHOLD = 5;
  $: radarSourceRows = Array.isArray(poi_oa_radar) ? poi_oa_radar : Array.from(poi_oa_radar ?? []);
  $: radarRows = radarSourceRows.map((r) => ({
    domain: r.poi_domain_h,
    pct: (Number(r.oa_domain) - 1) * 100,
    lowBase: Number(r.poi_count || 0) < OA_LOW_BASE_THRESHOLD,
    poiCount: r.poi_count
  }));
  $: radarMaxScale = Math.max(100, ...radarRows.map((r) => r.pct)) * 1.1;
  const radarMinScale = -100; // oa_domain >= 0, so pct_vs_baseline can never go below -100%.
  $: radarConfig = {
    tooltip: {},
    radar: {
      indicator: radarRows.map((r) => ({
        name: r.lowBase ? `${r.domain} †` : r.domain,
        max: radarMaxScale,
        min: radarMinScale
      })),
      splitNumber: 4,
      axisName: { fontSize: 10 }
    },
    series: [
      {
        type: 'radar',
        data: [
          { value: radarRows.map((r) => r.pct), name: nameLabel, areaStyle: { opacity: 0.15 } },
          {
            value: radarRows.map(() => 0),
            name: 'Citywide baseline (0% = Hamburg average)',
            lineStyle: { type: 'dashed', width: 1 },
            areaStyle: { opacity: 0 },
            symbol: 'none'
          }
        ]
      }
    ]
  };
</script>

<AreaBreadcrumbs {crumbs} />
<PageTitle title={pageTitle} />

<Hero compact eyebrow={heroEyebrow} title="{nameLabel}" lede="Stage, social-status trajectory, commercial mix, Offering Advantage, and everyday amenities for one Hamburg statistisches Gebiet — Hamburg's finest published small-area grain, the same scale as a Berlin Planungsraum." />

<!-- #302 (I21-h): real "Up:" link, same #255-precedent value-guarded static-prefix-href pattern
     as pages/berlin/area/[code].md's own Up-link (see that page's comment for the "undefined"-
     cascade rationale this guards against). #353: same three-part shape as the Berlin PLR line
     ("Up: parent profile · district browse · all districts"). -->
<p>Up: {#if parent_info[0]?.stadtteil_code}<a href="/hamburg/area/subarea_l1/{parent_info[0].stadtteil_code}">{parent_info[0].stadtteil_name ?? 'Stadtteil profile'}</a>{:else}<a href="/hamburg/area/subarea_l1">Stadtteil profile</a>{/if} · <a href="/hamburg/area-detail">district browse</a> · <a href="/hamburg/area/district">all districts</a></p>

{#if area_exists.length === 0}
<Alert status="warning">
  No Hamburg Gebiet geometry found for code <b>{codeLabel}</b> —
  this route should only be reachable via a real crawled link from
  <a href="/hamburg/area">the Gebiet list</a>; if you landed here another way, that list is the
  reliable starting point.
</Alert>
{/if}

## {nameLabel} at a glance

{#each glanceParagraphs as para}
<p>{@html para}</p>
{/each}

## Social status & trajectory

<Alert status="info">
  <b>How to read this section:</b> Hamburg's official status runs <b>1 = least deprived</b> to
  <b>4 = most deprived</b>, so a status that <b>falls</b> means the Gebiet became <b>less</b>
  deprived (its status rose) — which is also the signature of gentrification, not automatically good
  news for existing residents. A <b>negative</b> pressure trend is the reading this project treats as
  <b>higher</b> gentrification pressure. Figures come from Hamburg's own annual Sozialmonitoring —
  see the <a href="/methodology">methodology & data sources</a> page, §6 for how it differs from
  Berlin's.
</Alert>

<HamburgTrajectoryNote subject="this Gebiet" />

{#if cur && cur.stage}
<BigValue data={current_stage} value=stage title="Current stage"/>
{:else}
<Alert status="info">
  No current Sozialmonitoring stage is on record for this Gebiet in the latest Hamburg edition on
  this site, so no current stage applies here.
</Alert>
{/if}
<BigValue data={trajectory_summary} value=trajectory_type title="Overall trajectory" emptySet="warn"/>
<BigValue data={trajectory_summary} value=dominant_stage title="Most common stage" emptySet="warn"/>
<BigValue data={trajectory_summary} value=trajectory_confidence title="Confidence" emptySet="warn"/>

<!-- #353: the pace sentence now leads the "at a glance" section (as Berlin's speedSentence does)
     and is not repeated here; only the empty state remains. -->
{#if !trajectorySentence && trajectory_summary.length === 0}
<Alert status="info">
  No trajectory classification is available yet for this Gebiet within the 2019–2025 window (e.g.
  no usable Sozialmonitoring reading on record for this area in that span).
</Alert>
{/if}

Trajectory labels are explained on the [methodology page](/methodology) — an "improving" label does
not by itself mean the change was good for existing residents; rising status can reflect
displacement as easily as incumbent social mobility.

<NotYetPublished what="A status-over-time chart (Berlin's profile pages draw one, with district and city lines)">
  Berlin's chart reads <code>fct_gentrification_change</code>, which is Berlin-only by design
  (H3 sign-off, scope-guard condition 4). Hamburg's 13 annual editions are not charted as a time
  series anywhere on this site yet: the Hamburg trajectory sign-off (#314) asks for any long-run
  Hamburg view to be a separately labelled product, not a reuse of the 2019–2025 labels above.
</NotYetPublished>

## Commercial mix & Offering Advantage

### How its commercial mix has developed

Shops, cafés and other businesses tend to *follow* — not lead — social change (see
[methodology](/methodology) for the theory). This shows how the mix of mapped places here has
evolved.

```sql poi_trend
-- #353: same query as the Berlin PLR page's poi_trend, Hamburg's single 'current' vintage. The
-- per-Gebiet counts are the ones /hamburg/poi-map's density and tooltip figures are built from.
select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH' and area_vintage = 'current' and area_code = '${params.code}'
group by all
order by snapshot_year
```

```sql poi_mix_context
-- Latest-year top category here vs. this Gebiet's Stadtteil vs. Hamburg -- textual context for the
-- stacked bar below, same shape as the Berlin PLR page's poi_mix_context (plain sums of counts;
-- the Stadtteil set is the mart_area_hierarchy subarea_l2 -> subarea_l1 edge, OA-D1b/#240).
with
    area_latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.fct_poi_development
        where city_code = 'HH' and area_vintage = 'current' and area_code = '${params.code}'
    ),
    area_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'HH' and area_vintage = 'current' and area_code = '${params.code}'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    stadtteil_mix as (
        select f.poi_category_h, sum(f.poi_count) as poi_count
        from gentriduck_marts.fct_poi_development as f
        join
            gentriduck_marts.mart_area_hierarchy as h
            on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = f.area_code
        where
            f.city_code = 'HH' and f.area_vintage = 'current'
            and h.parent_area_code = (
                select parent_area_code
                from gentriduck_marts.mart_area_hierarchy
                where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${params.code}'
                limit 1
            )
            and f.snapshot_year = (select snapshot_year from area_latest)
        group by f.poi_category_h
    ),
    city_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'HH' and area_vintage = 'current'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    )
select
    (select snapshot_year from area_latest) as snapshot_year,
    (select poi_category_h from area_mix order by poi_count desc limit 1) as area_top_category,
    (select poi_category_h from stadtteil_mix order by poi_count desc limit 1) as stadtteil_top_category,
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category
```

<BarChart
    data={poi_trend}
    x=snapshot_year
    y=poi_count
    series=poi_category_h
    seriesOrder={poiCategoryOrder}
    title="Mapped places by category, {nameLabel} (largest segment first)"
    yAxisTitle="Number of mapped places"
    emptySet="warn"
/>

{#if poiMixCtx && poiMixCtx.area_top_category}
<p>The most common kind of mapped place here in {poiMixCtx.snapshot_year} is <b>{poiMixCtx.area_top_category}</b>;
across {parent?.stadtteil_name ?? 'its Stadtteil'} it's <b>{poiMixCtx.stadtteil_top_category ?? '—'}</b>, and across
Hamburg as a whole it's <b>{poiMixCtx.city_top_category ?? '—'}</b>.</p>
{/if}

<Alert status="info">
  These are OpenStreetMap-derived counts. Mapper coverage grew fastest in Hamburg's earliest years
  (the citywide coverage curve stabilizes only around ~2014–2015, see the
  <a href="/hamburg/poi-map">Hamburg POI map</a>), so early-year growth can reflect new mappers
  catching up rather than real commercial change. OSM coverage is also not spatially neutral:
  poorer or peripheral areas tend to be less thoroughly mapped (Haklay 2010), so a low count can be
  a coverage gap rather than a real absence.
</Alert>

### Offering Advantage profile

**Offering Advantage (OA)** compares each POI domain's share of this Gebiet's mapped places
(shops, cafés, and other points of interest) to that domain's share across Hamburg as a whole — a
compositional read on the local place *mix*, not a count, and not a value judgment: being
over-represented in a domain doesn't mean an area is "better" or "worse," only that its commercial
mix is more specialised in that direction than the city as a whole. The chart below shows each
domain as a **percentage above or below Hamburg's citywide average share** for that domain — e.g.
"+30%" means this domain makes up about 30% more of the local mix here than it does citywide on
average; a **negative** percentage means the opposite, under-representation, shown the same way.
The baseline is Hamburg's own, never pooled with Berlin's. For Hamburg, OA is commercial-side
context only: Hamburg's published stage above comes from its own Sozialmonitoring, not from OA (see
[methodology §6](/methodology)). See the [POI & Offering Advantage map](/hamburg/poi-map) to explore
this across all of Hamburg.

```sql poi_oa_radar
-- #353: the same mart rows /hamburg/poi-map colours its map by (HH, standard/faithful), this
-- Gebiet, latest snapshot_year with a value. Rows carrying the mart's minimum-base flag are
-- dropped here -- /hamburg/poi-map shows the same Gebiet-years as hatched "No data" -- and their
-- count is disclosed below via poi_oa_suppressed.
select
    poi_domain_h,
    oa_domain,
    poi_count
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'HH'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${params.code}'
    and not oa_domain_min_base_flag
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${params.code}'
            and oa_domain is not null
    )
order by oa_domain desc
```

```sql poi_oa_suppressed
select count(*) as n_flagged
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'HH'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${params.code}'
    and oa_domain_min_base_flag
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${params.code}'
    )
```

{#if radarRows.length > 0}
<ECharts config={radarConfig} data={poi_oa_radar} height="360px" downloadableData downloadableImage />
{:else}
<Alert status="warning">
  No Offering Advantage value is shown for this Gebiet — too few mapped places are recorded here to
  compute a stable ratio. That means "too thinly observed to characterize", never "commercially
  dead".
</Alert>
{/if}

{#if poi_oa_suppressed[0] && Number(poi_oa_suppressed[0].n_flagged) > 0 && radarRows.length > 0}
<Alert status="info">
  Some domains are left out of the chart because this Gebiet has too few mapped places overall for
  a stable ratio in the latest year (the same minimum-base rule the Hamburg POI map uses) — "too
  thinly observed", never "commercially dead".
</Alert>
{/if}

{#if radarRows.some((r) => r.lowBase)}
<Alert status="warning">
  Domains marked <b>†</b> are based on very few mapped places here (fewer than {OA_LOW_BASE_THRESHOLD}) —
  treat their percentage cautiously, since a single new or closed business can swing a small base
  sharply. Counts: {radarRows.filter((r) => r.lowBase).map((r) => `${r.domain} (${r.poiCount ?? 0})`).join(', ')}.
</Alert>
{/if}

Berlin's version of this chart also draws a district-average line. That average has not been
computed or reviewed for Hamburg, so only the citywide baseline is drawn here.

## Within-group dominance

<NotYetPublished what="Within-group dominance (is one business type crowding out the rest of its group?)">
  The underlying mart (<code>mart_poi_dominance</code>) carries Hamburg rows, but the site's data
  source deliberately restricts it to Berlin, and no sign-off has yet reviewed a Hamburg public view
  of it (the dominance ethics conditions, OA-D0 domain sign-off, were checked for Berlin only).
</NotYetPublished>

## People & structure

<NotYetPublished what="A population and composition table">
  Hamburg's population-register figures are only published at Stadtteil and district level, not
  for single Gebiete (methodology §6, point 3). Even at Stadtteil level, the Hamburg demographics
  sign-off (#313) sets conditions that bind a future Hamburg web page of its own, which has not been
  built or reviewed yet.
</NotYetPublished>

## Amenities & everyday infrastructure

<!--
  Hamburg parity for I20-web (#254), 2026-10-26: same block as the Berlin PLR page
  (web/pages/berlin/area/[code].md, "Amenities & everyday infrastructure"), reading the now
  city-agnostic `mart_area_amenities` (HH levels: subarea_l2 / subarea_l1 / district). The five
  binding framing conditions of docs/epic-i/I20-domain-signoff.md carry over verbatim:
  (1) "most common cuisine", never "dominant", in reader-facing copy; (2) the district comparison
  renders as co-equal counts, no colour/sort/highlight; (3) no ranking, "livability",
  investment-adjacent or recommending language; (4) the OSM completeness caveat sits directly
  next to the table; (5) a most-common-cuisine line only renders when
  gastro_poi_with_cuisine_count >= 8 AND dominant_cuisine_share >= 0.15
  (docs/epic-i/I20-poi-curation-rules.md §2), else an honest null state.
  Hamburg codes do not nest by prefix, so the district comes from mart_area_hierarchy
  (the district_row subquery below), not Berlin's substr(). The district row is LEFT-joined so a missing
  parent leaves its column empty instead of blanking the whole table.
  #353: block unchanged (I20-hamburg-parity-domain-signoff.md reviewed this exact copy).
-->

```sql amenities_current
select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${params.code}'
order by snapshot_year desc
limit 1
```

```sql amenities_table
-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
-- rollup -- extensive counts). Values pre-formatted as text, as on the Berlin page.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${params.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${params.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'district'
            and area_code = (select h2.parent_area_code
                from gentriduck_marts.mart_area_hierarchy as h1
                join gentriduck_marts.mart_area_hierarchy as h2
                    on h2.city_code = 'HH' and h2.area_level = 'subarea_l1'
                    and h2.area_code = h1.parent_area_code
                where h1.city_code = 'HH' and h1.area_level = 'subarea_l2'
                    and h1.area_code = '${params.code}'
                limit 1)
            and snapshot_year = (select snapshot_year from latest)
    ),
    facts as (
        select 1 as sort_order, 'Schools' as indicator, a.n_schools as area_n, d.n_schools as district_n
        from area_row as a left join district_row as d on true
        union all
        select 2, 'Kindergartens', a.n_kindergartens, d.n_kindergartens
        from area_row as a left join district_row as d on true
        union all
        select 3, 'Doctors', a.n_doctors, d.n_doctors
        from area_row as a left join district_row as d on true
        union all
        select 4, 'Dentists', a.n_dentists, d.n_dentists
        from area_row as a left join district_row as d on true
        union all
        select 5, 'Pharmacies', a.n_pharmacies, d.n_pharmacies
        from area_row as a left join district_row as d on true
        union all
        select 6, 'Supermarkets', a.n_supermarkets, d.n_supermarkets
        from area_row as a left join district_row as d on true
        union all
        select 7, 'Playgrounds', a.n_playgrounds, d.n_playgrounds
        from area_row as a left join district_row as d on true
        union all
        select 8, 'Transit stops', a.n_transit_stops, d.n_transit_stops
        from area_row as a left join district_row as d on true
    )
select sort_order, indicator, cast(cast(area_n as bigint) as varchar) as area_value, cast(cast(district_n as bigint) as varchar) as district_value
from facts
order by sort_order
```

<p>
{#if amenities_current[0]?.snapshot_year}
Based on OpenStreetMap tagging as of <b>{amenities_current[0].snapshot_year}</b>, this area has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.
{:else}
No amenity data is available for this area yet.
{/if}
</p>

<DataTable data={amenities_table} rows=8 emptySet="warn" emptyMessage="No amenity data for this area.">
    <Column id=indicator title="Infrastructure"/>
    <Column id=area_value title="This area"/>
    <Column id=district_value title="District total"/>
</DataTable>

<Alert status="info">
  These figures come from OpenStreetMap tagging, not an official registry. A <b>0</b> may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the <a href="/open-data">open-data</a> page for
  more on this project's data-completeness caveats generally.
</Alert>

<p>
{#if amenities_current[0]?.snapshot_year && amenities_current[0].gastro_poi_with_cuisine_count >= 8 && amenities_current[0].dominant_cuisine_share >= 0.15}
Among <b>{amenities_current[0].gastro_poi_with_cuisine_count}</b> restaurants/cafes with cuisine
data tagged in this area, the <b>most common cuisine</b> is
<b>{amenities_current[0].dominant_cuisine}</b>
({Math.round(amenities_current[0].dominant_cuisine_share * 100)}% of cuisine-tagged restaurants/cafes).
{:else if amenities_current[0]?.snapshot_year && amenities_current[0].gastro_poi_with_cuisine_count >= 8}
Cuisine is tagged for <b>{amenities_current[0].gastro_poi_with_cuisine_count}</b> restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.
{:else}
There isn't enough tagged cuisine data in this area yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).
{/if}
</p>

<p>
This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.
</p>

## Land value & estimated rent

<NotYetPublished what="Land value and estimated rent">
  Hamburg has no land-value (Bodenrichtwert) series on this site at all. Its rent signal is
  narrower in kind than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, at
  Stadtteil level, current state only), and its sign-off (#303) requires a Hamburg-specific
  methodology disclosure before any of it is shown publicly — that has not been done yet.
</NotYetPublished>

## Where this area sits

<!--
  #308: shared per-area drill-down mini map (web/components/AreaDrilldownMap.svelte). This is
  Hamburg's finest published small-area grain (statistisches Gebiet) -- no further level to drill
  into, same leaf treatment as Berlin's PLR page. Self-only: this Gebiet's own polygon highlighted
  for orientation, no clickable children. Reuses subarea_l1_subarea_l2_drilldown.geojson (every
  Gebiet polygon already lives in that file as a "child" feature of its own Stadtteil) -- no new
  geometry export needed for this leaf level.
-->
```sql minimap_areas
-- Name resolved directly in SQL (not via a JS-templated string literal) so a label containing an
-- OSM name (#307/#352) with a quote character can never break this query's own SQL syntax. The
-- coalesce-to-code is a no-op since #352 (every Gebiet has a label), kept as a guard.
select
    'subarea_l2:' || '${params.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${params.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${params.code}'
```

<AreaDrilldownMap
    data={minimap_areas}
    geoJsonUrl={`${base}/geo/subarea_l1_subarea_l2_drilldown.geojson`}
    title={nameLabel ?? codeLabel}
/>

This is Hamburg's finest published small-area grain (statistisches Gebiet) — there is no further
level to drill into. Its parent Stadtteil is {#if parent_info[0]?.stadtteil_code}<a href="/hamburg/area/subarea_l1/{parent_info[0].stadtteil_code}">{parent_info[0].stadtteil_name ?? parent_info[0].stadtteil_code}</a>{:else}linked above{/if}
(see "Up:" above), resolved by a spatial crosswalk (each Gebiet assigned to the Stadtteil that
contains it; OA-D1b, #240) — see the [area-hierarchy reference](/reference/area-hierarchy).

## Honest caveats

- **This Gebiet's name is a label, not an official designation (#307, #352).** Hamburg's own
  statistisches-Gebiet source has no name field, so the name above is this Gebiet's Stadtteil
  plus either an OpenStreetMap `place=neighbourhood`/`quarter` name whose point lies inside the
  Gebiet ({osmLabelCount}) or, where there is none, the Gebiet's code. An OSM name marks a
  point inside this Gebiet; the neighbourhood it names may be larger or smaller than the Gebiet.
- **A falling status means the area became *less* deprived** (its status rose) — which is also the
  signature of gentrification, not automatically good news for existing residents.
- **Hamburg's stage is not directly equivalent to a same-named Berlin stage** — Hamburg's Dynamik
  window is 3 years, Berlin's 2 ([methodology §6](/methodology), point 1 and 4).
- **The trajectory labels describe a recent ~6-year (2019–2025) window**, not this area's full
  13-edition history, and are a **status-only classification**, never a displacement verdict (see
  the disclosure above that section).
- **Offering Advantage is descriptive, not causal, and multi-signed** — over- or under-representation
  in a domain is a mix/specialization signal, never a standalone claim about gentrification.
  Domains flagged † above rest on fewer than 5 mapped places here and should be read cautiously.
- **Some Berlin sections are not shown for Hamburg** — the written portrait, the status-over-time
  chart, within-group dominance, people & structure, and land value & rent — each with its reason
  in its own section above. See the [Hamburg data hub](/hamburg) for the full inventory and
  [methodology & data sources §6](/methodology) for how Hamburg's data differs from Berlin's.

## Further reading

See the [Hamburg data hub](/hamburg) for what's published today, [Hamburg's map](/hamburg/maps) for
every Gebiet's stage at a glance, the [POI & Offering Advantage map](/hamburg/poi-map) for the
commercial-mix signal citywide, [browse by district](/hamburg/area-detail) for other Gebiete, or
the [time-series view](/hamburg/time-series) for how Hamburg's Gebiete have moved since 2019.

---

<FooterNav />
