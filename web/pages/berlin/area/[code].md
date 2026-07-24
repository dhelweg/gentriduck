---
breadcrumb: "select area_name as breadcrumb from gentriduck_marts.gentrification_index where variant = 'live_data' and area_level = 'plr' and city_code = 'BER' and area_code = '${params.code}' order by period_yyyymm desc limit 1"
---

<!--
  #150: templated per-area drill-down route (Evidence "Templated Pages" — see
  https://docs.evidence.dev/core-concepts/templated-pages/). ${params.code} drives every query
  below, server-prerendered at build time -- discovered via the link-crawl from /berlin/maps and
  /berlin/time-series (Evidence builds whatever route a link points at; there is no separate
  static-paths query). Replaces the ~540-item dropdown that /berlin/area-detail dropped (#133
  degradation) with an exact map-click / mover-row deep link. /berlin/area-detail remains the
  coarse Bezirk browse entry point. Presentation only; no indicator/weight/method change (no
  methodology gate).

  I2 (#219): moved from /area/[code] to /berlin/area/[code] (city-folder navigation restructure —
  see docs/epic-i/I2-route-map.md). No frontmatter sidebar_position here (dynamic templated route,
  not a sidebar entry, per pre-existing precedent).

  I3 (#220): mechanical template conversion only -- swapped the plain `# ` heading and hand-copied
  `<sub>` footer for the shared `<Hero>`/`<FooterNav>` components. Per
  docs/epic-i/storytelling-guide.md §2 ("this is I14's target ... turning the chart stack into a
  profile"), the deeper narrative rework (a plain-language portrait, district/citywide context
  lines alongside each chart) is explicitly I14's scope, not I3's -- this page's charts, captions,
  and caveats are otherwise unchanged.

  I14 (#231): turns the chart stack into a neighbourhood profile, per
  docs/epic-i/tickets/I14-plr-deepdive-profile.md and the I15 review
  (docs/epic-i/I15-oa-review-findings.md, -geo-signoff.md, -domain-signoff.md). Display-only --
  no dbt model/mart change, no new indicator/weight/normalization (not on the R-C1 gated-file list).
  What changed:

  1. **Portrait block** ("<AreaName> at a glance"): a deterministic template composed from already-
     published mart columns (gentrification_index's current stage/pressure, fct_gentrification_trajectory's
     trajectory summary, mart_poi_offering_advantage_map's domain mix) -- no free-generated text, no
     new statistic. The stage-to-plain-language mapping is a fixed dictionary over the six
     ADR-0008 typology_stage values (see script block below); the "how fast" wording buckets the
     already-published `status_delta` (fct_gentrification_trajectory) into three qualitative bands
     -- a display heuristic, not a new statistical method, called out here explicitly because this
     is exactly the wording the domain-expert framing gate (ticket's own "Gate / sign-off" section)
     reviews. Degrades explicitly for the two sparse cases confirmed present in the current 542
     PLRs: uninhabited PLRs (status_index/typology_stage NULL -- 7 of 542 at the time of writing)
     and areas with < 2 MSS editions on record (trajectory_confidence='low', no speed claim made).

  2. **OA radar dedup fix (I15 root cause, applied here as scoped):** the previous query read raw
     leaf-grain rows from `mart_poi_offering_advantage` with no GROUP BY/DISTINCT, so a domain with
     several subtypes (e.g. Mobility) rendered the same value on multiple redundant radar axes. This
     is a **chart de-duplication fix** -- the numbers were always correct (verified in I15 to
     floating-point exactness against a hand-rebuild of the LQ formula); nothing about the underlying
     data changed. The fix reads the already-existing domain-grain companion mart
     (`mart_poi_offering_advantage_map`, built in #210 for exactly this access pattern) instead of
     the leaf-grain mart, per the I15 geo-signoff's explicit recommendation.

  3. **OA displayed as % vs citywide baseline** (`pct_vs_baseline = (oa_domain - 1) * 100`, a pure
     display-layer transform of the existing continuous `oa_domain` column, no new mart column --
     confirmed sufficient in I15 §3 "Value scale"). Binding framing conditions from the I15 domain
     sign-off, honoured here: (a) framed as compositional over/under-representation of the local
     place *mix*, never a count ("more of the local mix," never "more restaurants"); (b) under-
     representation shown symmetrically as a negative percentage, not hidden; (c) domains with a
     very small POI base (< 5 mapped places in this area) are flagged (not silently shown at full
     precision) -- a display-layer instability guard, since D-3 (mart-level minimum-base flagging)
     remains deferred per ADR-0017 D5; (d) the word "advantage" is avoided on the public number
     itself -- the section keeps its existing, already-linked title ("Offering Advantage profile",
     an established term with a methodology link) but the inline explanation and per-domain wording
     describe it as a descriptive mix/specialization signal, not a value judgment.

  4. **District + citywide context on every chart:** the status-over-time line, the OA radar, and
     the estimated-rent line each gain a district-average and/or citywide-average comparison series
     (simple, unweighted means across the district's/city's PLRs at the same year -- same aggregation
     style already used for citywide averages on /berlin/poi-map's "Citywide context" section, not a
     new statistical method). The POI-mix bar gets a textual latest-year comparison caption instead
     of a second stacked bar (a second stacked bar over the same categories was judged harder to read,
     not more informative, for a segment-count comparison). District name is a fixed 12-entry
     Bezirk-code lookup (mirroring the already-hardcoded labels in /berlin/area-detail's dropdown) --
     presentation only, not a new dim table.

  5. **POI-mix stacked bar reordered** by total mapped-place count for this area, largest segment
     first (`seriesOrder`, computed client-side from the same query already powering the chart -- no
     new query). Previously unordered (stacking order followed SQL row order, not count).

  I21-f (#300): template-consolidation pass -- reorders this page's sections into the canonical
  per-level order (docs/epic-i/I21-ia-restructure-scoping.md §2.2): portrait (1) -> social status &
  trajectory (2) -> commercial mix & Offering Advantage (3, "How its commercial mix has developed" +
  "Offering Advantage profile" grouped under one heading, now ### subsections) -> within-group
  dominance (4) -> people & structure (5) -> amenities (6) -> land value & rent (7) -> honest
  caveats (9) -> further reading (10). Row 8 (hierarchy nav) is the existing "Up:" link above the
  fold -- PLR is a leaf grain with no children to list, so no separate section is added here
  (omitted, not rendered empty, per the ticket's own rule). Presentation/reordering only -- no
  query, mart, indicator, or wording change, beyond moving the "How to read the charts" Alert to sit
  at the top of the (renamed) "Social status & trajectory" section, immediately before the chart it
  explains, instead of at the tail of the portrait paragraphs. Gate: web-engineer-reviewer only
  (structure/order, no methodology).
-->

```sql area_info
select area_name, city_code, substr(area_code, 1, 6) as bzr_code
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and area_code = '${params.code}'
order by period_yyyymm desc
limit 1
```

```sql district_info
-- Fixed 12-entry Bezirk-code -> name lookup, mirroring the labels already hardcoded in
-- /berlin/area-detail's <Dropdown> (presentation only, not a new dim table/mart column).
select
    substr('${params.code}', 1, 2) as bezirk_code,
    case substr('${params.code}', 1, 2)
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
        else 'its district'
    end as bezirk_name
```

```sql context_current
-- Current (latest published period) status/pressure for this area, plus the simple district and
-- citywide averages at that same period -- for the portrait's "compared to district/city" claim
-- and the status chart's context lines' current-value anchor. Unweighted means, same style as the
-- citywide averages already used on /berlin/poi-map's "Citywide context" section.
with
    latest_period as (
        select max(period_yyyymm) as period_yyyymm
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr'
    ),
    district_now as (
        select
            avg(status_index) as district_avg_status_index,
            avg(dynamism_index) as district_avg_dynamism_index
        from gentriduck_marts.gentrification_index
        where
            variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
            and period_yyyymm = (select period_yyyymm from latest_period)
            and status_index is not null
            and substr(area_code, 1, 2) = substr('${params.code}', 1, 2)
    ),
    city_now as (
        select
            avg(status_index) as city_avg_status_index,
            avg(dynamism_index) as city_avg_dynamism_index
        from gentriduck_marts.gentrification_index
        where
            variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
            and period_yyyymm = (select period_yyyymm from latest_period)
            and status_index is not null
    )
select
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
    gi.status_index,
    gi.dynamism_index,
    d.district_avg_status_index,
    d.district_avg_dynamism_index,
    c.city_avg_status_index,
    c.city_avg_dynamism_index
from gentriduck_marts.gentrification_index as gi
cross join district_now as d
cross join city_now as c
where
    gi.variant = 'live_data' and gi.area_level = 'plr' and gi.city_code = 'BER'
    and gi.area_code = '${params.code}'
    and gi.period_yyyymm = (select period_yyyymm from latest_period)
```

<Hero compact eyebrow="Chapter 3 — The Evidence · most granular" title={area_info[0] ? area_info[0].area_name : 'Neighbourhood'} lede="Status trajectory, commercial-mix development, Offering Advantage, and land value/rent for one Berlin Planungsraum." />

<!-- #247 (I18-web slice 2): breadcrumb up to this area's Bezirksregion coarse profile. bzr_code
     comes from the area_info query above (a plain substr of area_code), same derivation as
     dim_area_hierarchy.sql / int_mss_bzr_aggregate.sql.

     #255: guard on the VALUE (`area_info[0]?.bzr_code`), not just the row. Evidence's
     unparameterized `[code]` template-shell build renders a placeholder `area_info[0]` row whose
     `bzr_code` column is `undefined`; a row-level `area_info[0] ? ...` check is still truthy and
     concatenates the literal text "undefined" into the href, producing a crawlable
     `/berlin/area/bzr/undefined` route (which then cascades to `pgr/` and `bezirk/undefined`). A
     static-prefix href inside a one-line `{#if}` -- kept as an explicit `<p>` so mdsvex can't
     split the paragraph around the block -- both drops the "undefined" segment AND preserves
     Evidence's base-path rewriting. (A fully-dynamic `{cond ? a : b}` href instead defeats
     base-path rewriting and emits a double-slashed `//berlin` path.) -->
<p>Up: {#if area_info[0]?.bzr_code}<a href="/berlin/area/bzr/{area_info[0].bzr_code}">Bezirksregion profile</a>{:else}<a href="/berlin/area/bezirk">Bezirksregion profile</a>{/if} · <a href="/berlin/area-detail">district browse</a> · <a href="/berlin/area/bezirk">all districts</a></p>

<script>
  const areaName = () => (area_info?.[0] ? area_info[0].area_name : 'This area');
  $: bezirkName = district_info?.[0]?.bezirk_name ?? 'its district';

  // -- Portrait: current stage, in plain language ---------------------------------------------
  $: cur = context_current?.[0];
  $: hasStatus = cur && cur.status_index !== null && cur.status_index !== undefined;

  // Fixed dictionary over ADR-0008's six typology_stage values (index-definition.md §1.5) --
  // this is the wording the domain-expert framing gate reviews. Risk/pressure language only
  // (storytelling-guide.md §3 rule 5): never "is gentrifying," always a named stage + what it
  // does and doesn't claim.
  const stageWording = {
    'stable-established':
      "classified **stable-established** — consistently low deprivation, with no sign of an active gentrification-type process",
    'pre-gentrification':
      "classified **pre-gentrification** — still comparatively deprived, and not yet showing the upward status movement that would signal an active process",
    'pioneer-signal':
      "showing a **pioneer signal** — an early, small-scale upward shift in status, the kind of movement that sometimes precedes wider gentrification pressure",
    'active-gentrification':
      "in **active-gentrification** — the strongest form of the upward-status pressure this site tracks",
    'consolidation-pressure':
      "under **consolidation pressure** — status is already comparatively high and continuing to firm up, consistent with a later stage of the process",
    'improving-vulnerable':
      "a named, deliberately ambiguous **\"improving-vulnerable\"** case — status is improving even though the area remains comparatively deprived; the site reports this combination without resolving it (see methodology)"
  };

  $: stageSentence = !hasStatus
    ? `${areaName()} is classified as **uninhabited** in Berlin's official population register (no resident population) — the social-status figures on this page do not apply here.`
    : `${areaName()} is currently ${stageWording[cur.stage] ?? `classified **${cur.stage ?? 'unclassified'}**`} ([what this does and doesn't mean](/methodology)).`;

  // -- Portrait: how it compares to district & city (current status level) --------------------
  $: comparisonSentence = (() => {
    if (!hasStatus || cur.district_avg_status_index == null || cur.city_avg_status_index == null) {
      return '';
    }
    const areaS = Number(cur.status_index);
    const distS = Number(cur.district_avg_status_index);
    const cityS = Number(cur.city_avg_status_index);
    // status_index: lower = less deprived/higher status (D1 polarity). A small tolerance band
    // avoids over-reading noise as a real difference.
    const rel = (a, b) => (a < b - 0.1 ? 'less deprived than' : a > b + 0.1 ? 'more deprived than' : 'about the same as');
    return `Its social status is currently ${rel(areaS, distS)} the ${bezirkName} average, and ${rel(areaS, cityS)} Berlin as a whole.`;
  })();

  // -- Portrait: commercial mix, from the (already deduped) domain-grain OA rows ---------------
  const LOW_BASE_THRESHOLD = 5; // display-only instability guard; see header comment (D-3 note)
  $: oaRows = Array.isArray(poi_oa_radar) ? poi_oa_radar : Array.from(poi_oa_radar ?? []);
  $: oaRowsWithBase = oaRows.filter((r) => Number(r.poi_count || 0) >= LOW_BASE_THRESHOLD);
  $: topDomains = [...oaRowsWithBase]
    .sort((a, b) => Number(b.oa_domain) - Number(a.oa_domain))
    .filter((r) => Number(r.oa_domain) >= 1.15)
    .slice(0, 2);

  $: mixSentence = (() => {
    if (oaRows.length === 0) {
      return 'Too few mapped places (shops, cafés, and other points of interest) are recorded here yet to describe a commercial mix.';
    }
    if (topDomains.length === 0) {
      return "Its commercial mix — the shops, cafés, and other mapped places here — doesn't lean strongly toward any particular kind, compared to Berlin as a whole.";
    }
    const names = topDomains.map((r) => r.poi_domain_h);
    const joined = names.length === 1 ? names[0] : `${names[0]} and ${names[1]}`;
    return `Its commercial mix leans toward ${joined} — both make up a larger share of the local mix here than they do citywide (see the Offering Advantage profile below).`;
  })();

  // -- Portrait: how fast it's moving -----------------------------------------------------------
  $: traj = trajectory_summary?.[0];
  $: districtTrajRows = Array.isArray(district_trajectory_mix)
    ? district_trajectory_mix
    : Array.from(district_trajectory_mix ?? []);

  $: speedSentence = (() => {
    if (!traj || traj.n_editions == null) {
      return 'No multi-edition trajectory is available yet for this area.';
    }
    if (traj.n_editions <= 1) {
      return "Only one social-status reading is on record for this area so far, so its pace of change can't be assessed yet.";
    }
    const delta = traj.status_delta != null ? Math.abs(Number(traj.status_delta)) : null;
    // Display-only qualitative bands over the already-published status_delta (see header comment).
    const pace = delta == null ? 'at an unclear pace' : delta < 0.4 ? 'only gradually' : delta < 1.2 ? 'at a moderate pace' : 'quickly, moving several status steps';
    const direction = {
      improving: 'become less deprived',
      declining: 'become more deprived',
      'stable-established': 'stayed consistently low-deprivation',
      'persistently-deprived': 'stayed consistently high-deprivation',
      mixed: 'shown no single clear direction'
    }[traj.trajectory_type] ?? 'shown an unclassified pattern';
    let sentence = `Across the ${traj.first_edition}–${traj.last_edition} editions on record, it has ${direction}, ${pace} (trajectory confidence: ${traj.trajectory_confidence}).`;
    const total = districtTrajRows.reduce((s, r) => s + Number(r.n || 0), 0);
    const same = districtTrajRows.find((r) => r.trajectory_type === traj.trajectory_type);
    if (total > 0 && same) {
      sentence += ` ${same.n} of ${total} other areas in ${bezirkName} with a usable trajectory show this same "${traj.trajectory_type}" pattern.`;
    }
    return sentence;
  })();

  $: portraitParagraphs = [stageSentence, comparisonSentence, mixSentence, speedSentence].filter(Boolean);

  // I14 (#231): stacked-bar segments sorted by total mapped-place count, largest first --
  // previously unordered (stacking order followed SQL row order, not count). Computed client-side
  // from the same query already powering the chart; no new query, no mart change.
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

  const OA_LOW_BASE_THRESHOLD = 5; // display-only; see this section's header comment.
  $: radarSourceRows = Array.isArray(poi_oa_radar) ? poi_oa_radar : Array.from(poi_oa_radar ?? []);
  $: districtOaByDomain = new Map(
    (Array.isArray(poi_oa_radar_district) ? poi_oa_radar_district : Array.from(poi_oa_radar_district ?? [])).map(
      (r) => [r.poi_domain_h, Number(r.district_avg_oa_domain)]
    )
  );

  $: radarRows = radarSourceRows.map((r) => {
    const districtOa = districtOaByDomain.get(r.poi_domain_h);
    return {
      domain: r.poi_domain_h,
      pct: (Number(r.oa_domain) - 1) * 100,
      districtPct: districtOa != null && !Number.isNaN(districtOa) ? (districtOa - 1) * 100 : null,
      lowBase: Number(r.poi_count || 0) < OA_LOW_BASE_THRESHOLD,
      poiCount: r.poi_count
    };
  });

  $: radarMaxScale = Math.max(
    100,
    ...radarRows.map((r) => r.pct),
    ...radarRows.map((r) => r.districtPct ?? 0)
  ) * 1.1;
  const radarMinScale = -100; // oa_domain >= 0, so pct_vs_baseline can never go below -100%.

  $: radarIndicator = radarRows.map((r) => ({
    name: r.lowBase ? `${r.domain} †` : r.domain,
    max: radarMaxScale,
    min: radarMinScale
  }));

  $: radarConfig = {
    tooltip: {},
    radar: {
      indicator: radarIndicator,
      splitNumber: 4,
      axisName: { fontSize: 10 }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: radarRows.map((r) => r.pct),
            name: areaName(),
            areaStyle: { opacity: 0.15 }
          },
          {
            value: radarRows.map((r) => r.districtPct),
            name: `${bezirkName} average`,
            lineStyle: { type: 'solid', width: 1 },
            areaStyle: { opacity: 0 },
            symbol: 'none'
          },
          {
            value: radarRows.map(() => 0),
            name: 'Citywide baseline (0% = Berlin average)',
            lineStyle: { type: 'dashed', width: 1 },
            areaStyle: { opacity: 0 },
            symbol: 'none'
          }
        ]
      }
    ]
  };
</script>


## {area_info[0] ? area_info[0].area_name : 'This area'} at a glance

{#each portraitParagraphs as para}
<p>{@html para}</p>
{/each}


## Social status & trajectory

<Alert status="info">
  <b>How to read the charts:</b> official status runs <b>1 = least deprived</b> to
  <b>4 = most deprived</b>, so a <b>falling</b> status line means the area became <b>less</b> deprived
  (its status rose) — which is also the signature of gentrification, not automatically good news for
  existing residents. See the <a href="/methodology">methodology & data sources</a> page for a full
  walkthrough. Figures are on Berlin's current (2021+) boundaries and the live social-monitoring
  editions (2021–2025).
</Alert>



```sql area_trend
with
    district_year as (
        select snapshot_year, avg(status_index) as district_avg_status_index
        from gentriduck_marts.fct_gentrification_change
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and status_index is not null
            and substr(area_code, 1, 2) = substr('${params.code}', 1, 2)
        group by snapshot_year
    ),
    city_year as (
        select snapshot_year, avg(status_index) as city_avg_status_index
        from gentriduck_marts.fct_gentrification_change
        where city_code = 'BER' and area_vintage = 'lor_2021' and status_index is not null
        group by snapshot_year
    )
select
    a.snapshot_year,
    a.status_index as "This area",
    d.district_avg_status_index as "District average",
    c.city_avg_status_index as "Berlin average",
    a.typology_stage
from gentriduck_marts.fct_gentrification_change as a
left join district_year as d on d.snapshot_year = a.snapshot_year
left join city_year as c on c.snapshot_year = a.snapshot_year
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${params.code}'
order by a.snapshot_year
```

<LineChart
    data={area_trend}
    x=snapshot_year
    y={['This area', 'District average', 'Berlin average']}
    title="Social status over time, {area_info[0] ? area_info[0].area_name : 'this area'} (1 = least deprived … 4 = most deprived)"
    yAxisTitle="Status class"
    yMin=1
    yMax=4
    emptySet="warn"
    emptyMessage="No time series for this area."
/>

District and city lines are the simple average across all Planungsräume in the same Bezirk /
across Berlin at each edition — context, not a target.

```sql trajectory_summary
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
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${params.code}'
```

```sql district_trajectory_mix
select trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory
where
    city_code = 'BER' and area_vintage = 'lor_2021'
    and substr(area_code, 1, 2) = substr('${params.code}', 1, 2)
group by trajectory_type
```

{#if hasStatus}
<BigValue data={context_current} value=stage title="Current stage"/>
{:else}
<Alert status="info">
  This is an uninhabited planning area in Berlin's official population register (e.g. a park,
  development site, or similar) — no current stage applies here.
</Alert>
{/if}
<BigValue data={trajectory_summary} value=trajectory_type title="Overall trajectory" emptySet="warn"/>
<BigValue data={trajectory_summary} value=dominant_stage title="Most common stage" emptySet="warn"/>
<BigValue data={trajectory_summary} value=trajectory_confidence title="Confidence" emptySet="warn"/>

Trajectory labels are explained on the [methodology page](/methodology) — an "improving" label does
not by itself mean the change was good for existing residents; rising status can reflect
displacement as easily as incumbent social mobility.


## Commercial mix & Offering Advantage

### How its commercial mix has developed

Shops, cafés and other businesses tend to *follow* — not lead — social change (see
[methodology](/methodology) for the theory). This shows how the mix of mapped places here has
evolved.

```sql poi_trend
select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${params.code}'
group by all
order by snapshot_year
```

```sql poi_mix_context
-- Latest-year top category here vs. this area's district vs. citywide -- textual context for the
-- stacked bar below (a second stacked bar over the same categories was judged harder to read, not
-- more informative, for a segment-count comparison).
with
    area_latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.fct_poi_development
        where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${params.code}'
    ),
    area_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${params.code}'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    district_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021'
            and substr(area_code, 1, 2) = substr('${params.code}', 1, 2)
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    city_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    )
select
    (select snapshot_year from area_latest) as snapshot_year,
    (select poi_category_h from area_mix order by poi_count desc limit 1) as area_top_category,
    (select poi_category_h from district_mix order by poi_count desc limit 1) as district_top_category,
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category
```


<BarChart
    data={poi_trend}
    x=snapshot_year
    y=poi_count
    series=poi_category_h
    seriesOrder={poiCategoryOrder}
    title="Mapped places by category, {area_info[0] ? area_info[0].area_name : 'this area'} (largest segment first)"
    yAxisTitle="Number of mapped places"
    emptySet="warn"
/>

{#if poiMixCtx && poiMixCtx.area_top_category}
<p>The most common kind of mapped place here in {poiMixCtx.snapshot_year} is <b>{poiMixCtx.area_top_category}</b>;
across {bezirkName} it's <b>{poiMixCtx.district_top_category ?? '—'}</b>, and across Berlin as a whole
it's <b>{poiMixCtx.city_top_category ?? '—'}</b>.</p>
{/if}

### Offering Advantage profile

<!--
  #209 (web slice of #207): radar/spider chart of this area's Offering Advantage (OA,
  ADR-0017/0018) by POI domain, latest available snapshot_year. I14 (#231) fix, per the I15 review
  (docs/epic-i/I15-oa-review-findings.md §1, both sign-offs' recommendations): reads the
  domain-grain companion mart `mart_poi_offering_advantage_map` (#210) instead of raw-selecting
  leaf-grain rows from `mart_poi_offering_advantage`, so each domain renders exactly one radar
  point (previously a domain with several subtypes rendered the same value on multiple redundant
  axes -- a chart de-duplication fix; the underlying oa_domain values were always correct, verified
  in I15 to floating-point exactness). Displayed as % vs citywide baseline
  (`pct_vs_baseline = (oa_domain - 1) * 100`, a pure display transform of the existing continuous
  column -- I15 §3, no mart change). Uses Evidence's bundled `<ECharts>` component
  (`@evidence-dev/core-components`, confirmed present -- no new-tool ADR needed) since Evidence
  does not ship a radar chart primitive.
-->

**Offering Advantage (OA)** compares each POI domain's share of this area's mapped places (shops,
cafés, and other points of interest) to that domain's share across Berlin as a whole — a
compositional read on the local place *mix*, not a count, and not a value judgment: being
over-represented in a domain doesn't mean an area is "better" or "worse," only that its commercial
mix is more specialised in that direction than the city as a whole. The chart below shows each
domain as a **percentage above or below Berlin's citywide average share** for that domain — e.g.
"+30%" means this domain makes up about 30% more of the local mix here than it does citywide on
average; a **negative** percentage means the opposite, under-representation, shown the same way.
OA is one input among several into the governed index (see [methodology](/methodology)), never a
standalone gentrification score on its own — and vacancy (if shown) marks the *opposite* pole from
the others, a pre-reinvestment signal, not a "more OA is more pressure" reading. See the
[POI & Offering Advantage map](/berlin/poi-map) to explore this across all of Berlin.

```sql poi_oa_radar
select
    poi_domain_h,
    oa_domain,
    poi_count
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${params.code}'
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${params.code}'
            and oa_domain is not null
    )
order by oa_domain desc
```

```sql poi_oa_radar_district
-- Same domain-grain mart, averaged (unweighted) across every PLR in this area's Bezirk at the same
-- snapshot_year, for the radar's district-context series.
select poi_domain_h, avg(oa_domain) as district_avg_oa_domain
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and substr(area_code, 1, 2) = substr('${params.code}', 1, 2)
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${params.code}'
            and oa_domain is not null
    )
group by poi_domain_h
```

{#if radarRows.length > 0}
<ECharts config={radarConfig} data={poi_oa_radar} height="360px" downloadableData downloadableImage />
{:else}
<Alert status="warning">
  No Offering Advantage data for this area (e.g. an uninhabited planning area, or no POIs mapped
  for any domain here yet).
</Alert>
{/if}

{#if radarRows.some((r) => r.lowBase)}
<Alert status="warning">
  Domains marked <b>†</b> are based on very few mapped places here (fewer than {OA_LOW_BASE_THRESHOLD}) —
  treat their percentage cautiously, since a single new or closed business can swing a small base
  sharply. Counts: {radarRows.filter((r) => r.lowBase).map((r) => `${r.domain} (${r.poiCount ?? 0})`).join(', ')}.
</Alert>
{/if}

## Within-group dominance

<!--
  #298 (I21-d): relocates the "Live: within-group dominance" widget from /methodology-oa-modes §5
  onto this page -- display-only, per docs/epic-i/I21-ia-restructure-scoping.md §5.3 (already-decided,
  ADR-0024 D3). mart_poi_dominance is PLR-grain (this page's own grain), so this is the one area
  page where the mart's own row(s) -- not a children-listing workaround -- are the direct relocation
  target (contrast pages/berlin/area/bezirk|bzr|pgr|ortsteil/[code].md, which have no PLR-grain
  `${params.code}` and therefore list constituent PLRs instead). `is_public_safe = true` is restated
  here (defence in depth -- already filtered at the source layer,
  web/sources/gentriduck_marts/mart_poi_dominance.sql) so the cuisine-typed internal-study-only
  group is never an option; `is_thin_base` rows are flagged, never dropped (anti-erasure, OA-D0
  domain sign-off Condition B.4).
-->

**Within-group dominance** asks a different question from Offering Advantage: within a curated
group of businesses, is one type dominating, or is the mix diverse? ("Are fast-food places crowding
out sit-down restaurants within gastronomy?") The figures below are **sign-blind** — a high
concentration reading says only that this area's mix is concentrated in the named leading type,
never whether that is an up-market or down-market shift; read it alongside the status/trajectory
section above, never in isolation. See the [Offering Advantage decoder](/methodology-oa-modes) §5
for the full methodology, ethics note, and why cuisine-typed dominance never appears on any public
page (this table included).

```sql dominance_area
select
    dominance_group,
    case dominance_group
        when 'gastronomy_category' then 'Gastronomy (Café / Restaurant / Fast Food)'
        when 'retail_category' then 'Retail (12 categories)'
        when 'entertainment_category' then 'Entertainment (Bar / Nightlife / Culture / Leisure)'
        when 'wellness_curated' then 'Wellness / fitness (curated cross-domain group)'
        else dominance_group
    end as group_label,
    hhi,
    top_share,
    top_child,
    top_child_offering_tier,
    n_children,
    group_stock_local,
    is_thin_base
from gentriduck_marts.mart_poi_dominance
where
    city_code = 'BER'
    -- Defence-in-depth restatement of the source-layer filter (mart_poi_dominance.sql already
    -- filters is_public_safe = true and city_code = 'BER') -- same pattern as the
    -- /methodology-oa-modes original this section relocates from.
    and is_public_safe = true
    -- area_vintage/weight_variant pinned to avoid returning up to 4 rows per business group
    -- (mart_poi_dominance's own grain includes both) -- same current-boundary, unweighted
    -- convention used everywhere else on this site; see pages/berlin/area/bezirk/[code].md's
    -- header comment for the #298 finding this fixes (the pre-relocation /methodology-oa-modes
    -- widget did not filter either, and silently mixed vintages/weightings into one ranking).
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and area_code = '${params.code}'
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_dominance
        where
            city_code = 'BER' and is_public_safe = true and area_code = '${params.code}'
            and area_vintage = 'lor_2021' and weight_variant = 'standard'
    )
order by hhi desc
```

{#if dominance_area.filter((r) => !r.is_thin_base).length > 0}
<DataTable data={dominance_area.filter((r) => !r.is_thin_base)} rows=4 emptySet="warn" emptyMessage="No within-group dominance data for this area.">
    <Column id=group_label title="Business group"/>
    <Column id=hhi title="HHI (higher = more concentrated)" fmt="num2"/>
    <Column id=top_share title="Top-share" fmt="pct1"/>
    <Column id=top_child title="Leading type"/>
    <Column id=n_children title="Types in this group here"/>
    <Column id=group_stock_local title="Group's total POI count here" fmt="num0"/>
</DataTable>
{:else}
<Alert status="warning">No within-group dominance data for this area (e.g. an uninhabited planning
area, or too few mapped places in every curated group here).</Alert>
{/if}

{#if dominance_area.some((r) => r.is_thin_base)}
<Alert status="info">
  {dominance_area.filter((r) => r.is_thin_base).length} of {dominance_area.length} business group(s)
  here are too thinly observed to characterize their mix confidently (fewer mapped places than this
  group's own minimum-base rule) — omitted from the table above, never shown as "commercially dead."
</Alert>
{/if}

<!--
  I19-web (#246): "People & structure" block, PLR level -- slice 1 of the web render (BZR/PGR/
  Bezirk-level pages don't have a web route yet; I18 itself only landed its dbt-layer slice,
  #242 -- see docs/handoff and the follow-up ticket filed alongside this one). Reads
  `mart_area_demographics` (#243, geo + domain PASS) read-only; no dbt model change, no new
  indicator/weight/normalization (not on the R-C1 gated-file list). District/city comparison rows
  reuse the SAME sum-then-recompute rollup formula already geo-DS-approved inside
  mart_area_demographics.sql (I19-geo-signoff.md) -- applied one level further (city) here, in the
  display layer only, not a new spatial/statistical method.

  Hard framing conditions from I19-domain-signoff.md, honoured here:
  (a) no ranking/sorting affordance on foreigners_share/migration_background_share -- both are
      plain table rows among many, never sorted or highlighted;
  (b) always co-presented with structural context -- population, age structure, and residence
      duration sit in the same table, never displayed standalone;
  (c) no causal/evaluative language -- every figure is dated + sourced ("EWR, vintage YYYY"),
      purely descriptive;
  (d) the >=2017 migration_background_share comparability caveat is rendered inline, unconditionally,
      next to that row (not only when a trend is shown, to stay on the safe side of the gate);
  (e) suppressed/sparse areas degrade gracefully -- an inline note replaces silent, misleadingly
      precise figures when `any_indicator_suppressed` is true, rather than hiding the row outright.

  Re-consulted with the domain expert on this exact rendered wording before integration --
  docs/epic-i/I19-web-domain-signoff.md (Verdict: PASS).
-->

## People & structure

```sql demographics_current
select
    reference_year,
    reference_date,
    residents_total,
    mean_age_years,
    any_indicator_suppressed
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'plr' and area_code = '${params.code}'
order by reference_year desc
limit 1
```

```sql demographics_table
-- One row per indicator: this area vs. its district (Bezirk, already population-weighted by the
-- mart's own rollup) vs. Berlin as a whole (same sum-then-recompute rule, applied here one level
-- further -- display layer only, see header comment). Values pre-formatted as text in SQL (mixed
-- units -- counts, years, shares -- in one comparison column) rather than via a per-column Evidence
-- `fmt`, since a single DataTable column can't carry three different numeric formats.
with
    latest as (
        select max(reference_year) as reference_year
        from gentriduck_marts.mart_area_demographics
        where city_code = 'BER' and area_level = 'plr' and area_code = '${params.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${params.code}'
            and reference_year = (select reference_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${params.code}', 1, 2)
            and reference_year = (select reference_year from latest)
    ),
    city_row as (
        select
            reference_year,
            sum(residents_total) as residents_total,
            sum(residents_male_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_male_share,
            sum(residents_female_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_female_share,
            sum(age_under18_share * residents_total)
            / nullif(sum(residents_total), 0) as age_under18_share,
            sum(age_18_27_share * residents_total)
            / nullif(sum(residents_total), 0) as age_18_27_share,
            sum(age_27_45_share * residents_total)
            / nullif(sum(residents_total), 0) as age_27_45_share,
            sum(age_45_65_share * residents_total)
            / nullif(sum(residents_total), 0) as age_45_65_share,
            sum(age_65plus_share * residents_total)
            / nullif(sum(residents_total), 0) as age_65plus_share,
            sum(mean_age_years * residents_total)
            / nullif(sum(residents_total), 0) as mean_age_years,
            sum(foreigners_share * residents_total)
            / nullif(sum(residents_total), 0) as foreigners_share,
            sum(migration_background_share * residents_total)
            / nullif(sum(residents_total), 0) as migration_background_share,
            sum(residence_duration_5y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_5y_share,
            sum(residence_duration_10y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_10y_share
        from gentriduck_marts.mart_area_demographics
        where city_code = 'BER' and area_level = 'bezirk'
            and reference_year = (select reference_year from latest)
        group by reference_year
    )
select 1 as sort_order, 'Residents (Einwohner)' as indicator, cast(a.residents_total as varchar) as area_value,
    cast(round(d.residents_total) as varchar) as district_value, cast(round(c.residents_total) as varchar) as city_value
from area_row as a cross join district_row as d cross join city_row as c
union all
select 2, 'Mean age', round(a.mean_age_years, 1) || ' yrs', round(d.mean_age_years, 1) || ' yrs', round(c.mean_age_years, 1) || ' yrs'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 3, 'Female share', round(a.residents_female_share * 100, 1) || '%', round(d.residents_female_share * 100, 1) || '%', round(c.residents_female_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 4, 'Under 18', round(a.age_under18_share * 100, 1) || '%', round(d.age_under18_share * 100, 1) || '%', round(c.age_under18_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 5, '18 to under 27', round(a.age_18_27_share * 100, 1) || '%', round(d.age_18_27_share * 100, 1) || '%', round(c.age_18_27_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 6, '27 to under 45', round(a.age_27_45_share * 100, 1) || '%', round(d.age_27_45_share * 100, 1) || '%', round(c.age_27_45_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 7, '45 to under 65', round(a.age_45_65_share * 100, 1) || '%', round(d.age_45_65_share * 100, 1) || '%', round(c.age_45_65_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 8, '65 and over', round(a.age_65plus_share * 100, 1) || '%', round(d.age_65plus_share * 100, 1) || '%', round(c.age_65plus_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 9, 'Resident 5+ years at address', round(a.residence_duration_5y_share * 100, 1) || '%', round(d.residence_duration_5y_share * 100, 1) || '%', round(c.residence_duration_5y_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 10, 'Resident 10+ years at address', round(a.residence_duration_10y_share * 100, 1) || '%', round(d.residence_duration_10y_share * 100, 1) || '%', round(c.residence_duration_10y_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 11, 'Foreign-national share', round(a.foreigners_share * 100, 1) || '%', round(d.foreigners_share * 100, 1) || '%', round(c.foreigners_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 12, 'Migration-background share †', round(a.migration_background_share * 100, 1) || '%', round(d.migration_background_share * 100, 1) || '%', round(c.migration_background_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
order by sort_order
```

<p>
{#if demographics_current[0]}
As of the <b>{demographics_current[0].reference_year}</b> EWR register (population statistics), this area has
<b>{demographics_current[0].residents_total != null ? Math.round(demographics_current[0].residents_total).toLocaleString() : '—'}</b> registered
residents. The table below is purely descriptive — dated and sourced from Berlin's official
population register (EWR) — and always shown alongside its full demographic context, never as an
isolated figure.
{:else}
No population-register data is available for this area yet.
{/if}
</p>

{#if demographics_current[0] && demographics_current[0].any_indicator_suppressed}
<Alert status="warning">
  One or more figures below are based on a small or privacy-suppressed population cell for this
  area (per Berlin's EWR disclosure rules) — treat the values in this table as <b>approximate</b>,
  not exact counts.
</Alert>
{/if}

<DataTable data={demographics_table} rows=12 emptySet="warn" emptyMessage="No population-register data for this area.">
    <Column id=indicator title="Indicator"/>
    <Column id=area_value title="This area"/>
    <Column id=district_value title="District average"/>
    <Column id=city_value title="Berlin average"/>
</DataTable>

<p>
† <b>Migration-background share</b> uses a Mikrozensus definition that changed around 2017 —
figures from before 2017 are present in the underlying data but are <b>not directly comparable</b>
to 2017-and-later figures. This page shows only the current-vintage snapshot above; do not compare
this row across years without checking the vintage.
</p>

<p>
Both the foreign-national and migration-background shares above are shown only as plain rows in
this table, alongside the area's full age and residence-duration profile — this page never ranks
or sorts areas by either figure, and makes no claim about whether a change in either is good or bad
for the neighbourhood.
</p>


<!--
  I20-web (#254): "Amenities & everyday infrastructure" block, PLR level -- same slice-1-only
  scope precedent as I19-web (BZR/PGR/Bezirk pages don't have this block yet; filed as a follow-up
  alongside this one, same pattern as #247 was to #246). Reads `mart_area_amenities` (#252, NOT
  methodology-bearing -- reads int_osm_poi_plr read-only, no index/weight change) read-only; no
  dbt model change here. District comparison reuses the mart's own already-rolled-up bezirk-level
  row (extensive-count SUM, no share-weighting needed -- these are raw counts, not shares like
  I19's demographics case) -- same "sum, don't reinvent" display-layer discipline.

  Hard framing conditions from docs/epic-i/I20-domain-signoff.md (Verdict: PASS, 5 binding
  conditions), honoured here:
  (1) "most common cuisine" wording used throughout (never "dominant") in reader-facing copy --
      the underlying `dominant_cuisine` mart column name is unchanged, only prose differs;
  (2) district comparison renders as co-equal counts, same format, no colour/sort/highlight of
      above-vs-below;
  (3) denylist honoured -- no area-ranking, "livability", investment-adjacent, or
      possessive/recommending language anywhere in this block;
  (4) the completeness caveat (curation rules §3, geo-DS-confirmed) renders directly adjacent to
      the infrastructure table, every time the block is shown;
  (5) interestingness thresholds from docs/epic-i/I20-poi-curation-rules.md §2 applied verbatim --
      a "most common cuisine" line only renders when gastro_poi_with_cuisine_count >= 8 AND
      dominant_cuisine_share >= 0.15; below either floor, an honest null state renders instead.

  Bench-class / low-signal POI categories (benches, waste baskets, etc.) are not in
  `mart_area_amenities` at all, by construction (see that mart's header comment) -- nothing to
  suppress here, they were never modeled into this display mart in the first place. Full inventory
  remains queryable on /poi-map for any reader who wants it.
-->

## Amenities & everyday infrastructure

```sql amenities_current
select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    dominant_cuisine, dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'plr' and area_code = '${params.code}'
order by snapshot_year desc
limit 1
```

```sql amenities_table
-- One row per infrastructure fact: this area vs. its district (Bezirk, already summed by the
-- mart's own rollup -- extensive counts, no share-weighting needed). Values pre-formatted as text
-- in SQL since some rows are plain integers and the gastro row is a percentage-bearing sentence.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'plr' and area_code = '${params.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${params.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${params.code}', 1, 2)
            and snapshot_year = (select snapshot_year from latest)
    )
select 1 as sort_order, 'Schools' as indicator, cast(a.n_schools as varchar) as area_value, cast(d.n_schools as varchar) as district_value
from area_row as a cross join district_row as d
union all
select 2, 'Kindergartens', cast(a.n_kindergartens as varchar), cast(d.n_kindergartens as varchar)
from area_row as a cross join district_row as d
union all
select 3, 'Doctors', cast(a.n_doctors as varchar), cast(d.n_doctors as varchar)
from area_row as a cross join district_row as d
union all
select 4, 'Dentists', cast(a.n_dentists as varchar), cast(d.n_dentists as varchar)
from area_row as a cross join district_row as d
union all
select 5, 'Pharmacies', cast(a.n_pharmacies as varchar), cast(d.n_pharmacies as varchar)
from area_row as a cross join district_row as d
union all
select 6, 'Supermarkets', cast(a.n_supermarkets as varchar), cast(d.n_supermarkets as varchar)
from area_row as a cross join district_row as d
union all
select 7, 'Playgrounds', cast(a.n_playgrounds as varchar), cast(d.n_playgrounds as varchar)
from area_row as a cross join district_row as d
union all
select 8, 'Transit stops', cast(a.n_transit_stops as varchar), cast(d.n_transit_stops as varchar)
from area_row as a cross join district_row as d
order by sort_order
```

<p>
{#if amenities_current[0]}
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
{#if amenities_current[0] && amenities_current[0].gastro_poi_with_cuisine_count >= 8 && amenities_current[0].dominant_cuisine_share >= 0.15}
Among <b>{amenities_current[0].gastro_poi_with_cuisine_count}</b> restaurants/cafes with cuisine
data tagged in this area, the <b>most common cuisine</b> is
<b>{amenities_current[0].dominant_cuisine}</b>
({Math.round(amenities_current[0].dominant_cuisine_share * 100)}% of tagged gastronomy POIs).
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

<Alert status="info">
  These are official reference values (Bodenrichtwert land value and Mietspiegel-derived estimated
  rent), not observed transaction prices — see the
  <a href="/methodology">methodology page</a> for what they measure and their caveats.
</Alert>

```sql price_rent
with
    district_rent as (
        select snapshot_year, avg(est_rent_mid) as district_avg_est_rent_mid
        from gentriduck_marts.mart_price_rent_dimension
        where city_code = 'BER' and substr(area_code, 1, 2) = substr('${params.code}', 1, 2)
        group by snapshot_year
    ),
    city_rent as (
        select snapshot_year, avg(est_rent_mid) as city_avg_est_rent_mid
        from gentriduck_marts.mart_price_rent_dimension
        where city_code = 'BER'
        group by snapshot_year
    )
select
    p.snapshot_year,
    p.brw_weighted_avg_eur_m2,
    p.est_rent_mid,
    p.est_rent_low,
    p.est_rent_high,
    d.district_avg_est_rent_mid as "District average (typical)",
    c.city_avg_est_rent_mid as "Berlin average (typical)"
from gentriduck_marts.mart_price_rent_dimension as p
left join district_rent as d on d.snapshot_year = p.snapshot_year
left join city_rent as c on c.snapshot_year = p.snapshot_year
where p.city_code = 'BER' and p.area_code = '${params.code}'
order by p.snapshot_year
```

<LineChart
    data={price_rent}
    x=snapshot_year
    y={['est_rent_low', 'est_rent_mid', 'est_rent_high', 'District average (typical)', 'Berlin average (typical)']}
    title="Estimated rent range (EUR/m²), {area_info[0] ? area_info[0].area_name : 'this area'}"
    yAxisTitle="EUR/m²"
    emptySet="warn"
    emptyMessage="No price/rent estimate for this area."
/>

<DataTable data={price_rent} rows=10 emptySet="warn" emptyMessage="No price/rent estimate for this area.">
    <Column id=snapshot_year title="Year"/>
    <Column id=brw_weighted_avg_eur_m2 title="Land value, EUR/m² (Bodenrichtwert)"/>
    <Column id=est_rent_mid title="Estimated rent, typical (EUR/m²)"/>
    <Column id=est_rent_low title="Estimated rent, low (EUR/m²)"/>
    <Column id=est_rent_high title="Estimated rent, high (EUR/m²)"/>
</DataTable>

## Honest caveats

- **A falling status line means the area became *less* deprived** (its status rose) — which is
  also the signature of gentrification, not automatically good news for existing residents.
- **The portrait's stage, comparison, and pace sentences are display-layer wording over already-
  published mart figures** — no new indicator, weight, or normalization is introduced by this page.
- **Offering Advantage is descriptive, not causal, and multi-signed** — over- or under-representation
  in a domain is a mix/specialization signal, never a standalone claim about gentrification, and
  domains do not all point the same direction (vacancy is the opposite pole from amenity domains).
- **Very small POI bases produce noisy percentages** — domains flagged † above are based on fewer
  than 5 mapped places in this area and should be read cautiously.
- **Land value and estimated rent are official reference values, not observed transaction prices.**
- Figures are on Berlin's **current (2021+) boundaries** and the live social-monitoring editions
  (2021–2025) only — this page does not show the pre-2021 `standard` variant.
- See [methodology & data sources §6](/methodology) for the full list of project-wide limitations
  (ecological fallacy, no displacement measurement, OSM completeness bias, and more).

## Further reading

See [methodology & data sources](/methodology) for what the index means, the
[POI & Offering Advantage map](/berlin/poi-map) for this area's commercial-mix signal citywide
(including a "citywide context" section for these same signals across all of Berlin),
[browse by district](/berlin/area-detail) for other neighbourhoods, or the
[time-series view](/berlin/time-series) for how the whole city has moved.

---

<FooterNav />
