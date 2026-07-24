---
breadcrumb: "select '${params.code}' as breadcrumb"
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
-->

```sql code_info
-- Build-time-fixed route parameter, the same `${params.code}` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's `area_info` query) --
-- selected into a plain row so it can be referenced in markup as `code_info[0].area_code`, the
-- established pattern (this page has no name to derive from a mart, unlike Berlin's PLR page, so
-- this trivial select stands in for that role).
select '${params.code}' as area_code
```

```sql area_exists
select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${params.code}'
limit 1
```

```sql parent_info
-- #302 (I21-h): resolved parent Stadtteil, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name (structural lookup, not a statistic -- same framing as area_exists above).
select
    h.parent_area_code as stadtteil_code,
    g.area_name as stadtteil_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = '${params.code}'
limit 1
```

<script>
  // Plain script-computed fallback, kept out of markdown text/attribute strings -- mdsvex's
  // smart-quote pass rewrites straight `'…'` quotes inside markdown text (including heading text
  // containing a mustache expression) into curly typographic quotes, which then breaks the Svelte
  // expression parser (confirmed: build failed on the equivalent inline ternary in a `##` heading).
  // Computing the fallback here once avoids embedding any quote character in markdown prose.
  $: codeLabel = code_info[0] ? code_info[0].area_code : '';

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
</script>

<Hero compact eyebrow="Chapter 3 — The Evidence · most granular" title="Statistisches Gebiet {codeLabel}" lede="Hamburg's finest published small-area grain — the same scale Berlin's Planungsraum profile page covers, scaffolded here (I21-g, #301). Its social-status trajectory (2019–2025) is now published below (#317); most other sections remain deferred." />

<!-- #302 (I21-h): real "Up:" link, same #255-precedent value-guarded static-prefix-href pattern
     as pages/berlin/area/[code].md's own Up-link (see that page's comment for the "undefined"-
     cascade rationale this guards against). -->
<p>Up: {#if parent_info[0]?.stadtteil_code}<a href="/hamburg/area/subarea_l1/{parent_info[0].stadtteil_code}">{parent_info[0].stadtteil_name ?? 'Stadtteil profile'}</a>{:else}<a href="/hamburg/area/subarea_l1">Stadtteil profile</a>{/if} · <a href="/hamburg/area">all Gebiete</a> · <a href="/hamburg/area/subarea_l1">all Stadtteile</a></p>

{#if area_exists.length === 0}
<Alert status="warning">
  No Hamburg Gebiet geometry found for code <b>{codeLabel}</b> —
  this route should only be reachable via a real crawled link from
  <a href="/hamburg/area">the Gebiet list</a>; if you landed here another way, that list is the
  reliable starting point.
</Alert>
{/if}

<NotYetPublished pageLevel what="this Gebiet's status, commercial mix, and demographic profile (its social-status trajectory is now published below, #317)" />

## Statistisches Gebiet {codeLabel} at a glance

<NotYetPublished what="a plain-language portrait for this area (equivalent to the PLR page's 'at a glance' summary)" />

This area's current gentrification-stage classification is already public on
[Hamburg's map](/hamburg/maps) (hover the Gebiet's shape or search its code) — this page does not
repeat that figure yet; see the header comment above for why.

## Social status & trajectory

<Alert status="warning">
  <b>Two things to know before reading this section (#317):</b><br/>
  <b>1. Recent window, not full history.</b> These labels describe a bounded <b>~6-year window
  (2019–2025)</b> of Hamburg's own annual Sozialmonitoring panel, not the full 13-edition
  (2013–2025) series on record — the same cadence-normalized window already used for Berlin
  (H-C2, #159), applied here to Hamburg's annual cadence for the first time (#314). A Gebiet
  classified <b>persistently-deprived</b> or <b>stable-established</b> below reflects only the last
  ~6 years, not necessarily this area's full history — don't read it with the same long-run framing
  Berlin's own multi-decade biennial figures might imply.<br/>
  <b>2. Status-only, not a displacement verdict.</b> <code>stable-established</code>,
  <code>persistently-deprived</code>, <code>improving</code>, <code>declining</code>, and
  <code>mixed</code> describe how this Gebiet's <i>officially-measured social status</i> moved over
  that window — never a claim about who moved, why, or whether any resident was displaced. See
  <a href="/methodology">methodology</a> for what this classification does and doesn't claim.
</Alert>

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

<BigValue data={trajectory_summary} value=trajectory_type title="Overall trajectory" emptySet="warn"/>
<BigValue data={trajectory_summary} value=dominant_stage title="Most common stage" emptySet="warn"/>
<BigValue data={trajectory_summary} value=trajectory_confidence title="Confidence" emptySet="warn"/>

{#if trajectorySentence}
<p>{@html trajectorySentence}</p>
{:else if trajectory_summary.length === 0}
<Alert status="info">
  No trajectory classification is available yet for this Gebiet within the 2019–2025 window (e.g.
  no usable Sozialmonitoring reading on record for this area in that span).
</Alert>
{/if}

Trajectory labels are explained on the [methodology page](/methodology) — an "improving" label does
not by itself mean the change was good for existing residents; rising status can reflect
displacement as easily as incumbent social mobility.

## Commercial mix & Offering Advantage

<NotYetPublished what="this area's commercial-mix breakdown and Offering Advantage profile" />

## Within-group dominance

<NotYetPublished what="within-group dominance figures for this area" />

## People & structure

<NotYetPublished what="demographic figures for this area" />

## Amenities & everyday infrastructure

<NotYetPublished what="everyday-infrastructure counts for this area" />

## Land value & estimated rent

<NotYetPublished what="land value / estimated rent figures for this area" />

## Where this area sits

This Gebiet's parent Stadtteil is {#if parent_info[0]?.stadtteil_code}<a href="/hamburg/area/subarea_l1/{parent_info[0].stadtteil_code}">{parent_info[0].stadtteil_name ?? parent_info[0].stadtteil_code}</a>{:else}linked above{/if}
(see the "Up:" link above) — resolved via the OA-D1b (#240) spatial crosswalk, now published to the
web layer through <code>mart_area_hierarchy</code> (#302, I21-h). See
<a href="/reference/area-hierarchy">the area-hierarchy reference page</a> for the general concept
(note: that page's own text predates OA-D1b and should be treated as stale on this specific point
until it is refreshed, I21-j).

## Honest caveats

- **This page is mostly still a structural scaffold (I21-g, #301).** Every section except "Social
  status & trajectory" (below) and the "Up: Stadtteil" link shows a fixed deferred-state placeholder
  rather than a real Hamburg figure, even where an underlying mart already has real Hamburg rows for
  some other public page (e.g. this Gebiet's current stage is already shown on
  [the map](/hamburg/maps)) — publishing the rest of this page's content is a separately-gated
  follow-up (I21-i, #303), not assumed here.
- **The "Social status & trajectory" section above is real, not a placeholder (#317).** It reads
  Hamburg's own admitted rows in `fct_gentrification_trajectory` (#314, dual-signed-off PASS) — a
  recent **~6-year (2019–2025) window**, not this area's full 13-edition history, and a
  **status-only classification**, never a displacement verdict (see the disclosure directly above
  that section's chart).
- **The "Up: Stadtteil" hierarchy link is real, not a placeholder (#302, I21-h).** The underlying
  spatial crosswalk was resolved and signed off under OA-D1b/#240; this ticket only publishes it to
  the web layer, without re-deciding the method.
- See [Hamburg's data hub](/hamburg) for the full, current inventory of what is and isn't published
  for Hamburg, and [methodology & data sources §6](/methodology) for how Hamburg's data differs from
  Berlin's generally.

## Further reading

See the [Hamburg data hub](/hamburg) for what's published today, [Hamburg's map](/hamburg/maps) for
this area's already-public gentrification-stage figure, the
[POI & Offering Advantage map](/hamburg/poi-map) for its commercial-mix signal, or
[the area-hierarchy reference](/reference/area-hierarchy) for how Hamburg's small-area geography is
structured.

---

<FooterNav />
