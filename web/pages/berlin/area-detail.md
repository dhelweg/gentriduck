---
title: Area detail — neighbourhood drill-down
sidebar_position: 3
---

<!--
  No blind ~540-item PLR picker (maintainer feedback). Navigation is coarse Bezirk (district) +
  a ranked comparison table; the single-area "spotlight" is the district's highest-pressure area.
  Kept prerender-clean: no $page/?area machinery (that forced client-only rendering and left every
  query empty at build). Exact per-area deep-link from a map/table click is a follow-up — it needs
  an Evidence templated route (/berlin/area/[code]) so ${params.code} can drive the queries
  server-side. Presentation only; no indicator/weight/method change (no methodology gate).

  I2 (#219): moved from /area-detail to /berlin/area-detail (city-folder navigation restructure —
  see docs/epic-i/I2-route-map.md). sidebar_position renumbered 13 -> 3 (scoped to this page's
  siblings under pages/berlin/, not the whole site).

  I3 (#220) rationalization decision, area-detail vs. area/index (ticket's "reconcile ... or
  document why not merging them"): this page (coarse Bezirk browse + spotlight) is the primary
  browse entry; `pages/berlin/area/index.md` (the crawlable full-text-search table of all 542
  PLRs) is kept as a secondary, explicitly-labelled entry rather than merged into this one, for a
  concrete technical reason, not an oversight: Evidence's static build discovers every templated
  `/berlin/area/[code]` route by crawling real `<a href>` elements at build time, and this page's
  own DataTable only ever renders the *default* district's ~12 rows at build time (the other 11
  districts' rows only exist after the reader changes the dropdown, client-side) — nowhere near
  covering all 542 areas. `AreaMap`'s canvas click-throughs (on `/berlin/maps`, `/berlin/poi-map`)
  can't be crawled either (their links only exist after client-side JS runs — see
  `pages/berlin/area/index.md`'s own header comment). `area/index.md`'s single big DataTable,
  with every one of the 542 rows rendered server-side, is what actually makes the full per-PLR
  page set buildable; removing it (or folding its table into this page behind a dropdown that
  only renders one district at build time) would silently shrink the crawled/generated page set.
  Given that hard constraint plus I2's route freeze (`/berlin/…` routes do not move again in this
  ticket), the two pages keep their separate routes; this page's own copy and
  `pages/berlin/index.md`'s card grid instead state the relationship explicitly (primary browse
  vs. secondary full list) so a reader is never left guessing which one to use.

  I3 (#220): re-platformed onto the shared `<Hero>`/`<FooterNav>` components and added an explicit
  "Honest caveats" section consolidating this page's inline cautions; no caveat dropped.

  I21-c (#297): the spotlight below used to re-paste this area's status trend, POI-mix bar, and
  price/rent chart in full -- a near-verbatim duplicate of the content already on this same area's
  canonical `/berlin/area/[code]` page (flagged by the independent I21 UX review; target per
  docs/epic-i/I21-ia-restructure-scoping.md §3, "Deleted, replaced by a link"). Slimmed to a
  headline BigValue summary + a link into that canonical page, which carries the full charts,
  demographics, amenities, and caveats. Per the I21-a route ruling
  (docs/epic-i/I21-a-route-ruling.md §3), this is a content change on the existing
  `/berlin/area-detail` route -- no rename, no I2 route-map supersession needed. Presentation only;
  no indicator/weight/method change (no methodology gate). The district-browse table above is
  unchanged -- it is not duplicated elsewhere (I21-ia scoping §3).
-->

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Area detail — one neighbourhood, full picture" lede="Pick a district to compare its neighbourhoods, then see a headline snapshot of the one currently under the most gentrification pressure, with a link to its full profile." />

For the citywide picture, see the [maps page](/berlin/maps) or the
[time-series view](/berlin/time-series). If you already know which neighbourhood you want, the
[full searchable list](/berlin/area) is the faster way in.

<Alert status="info">
  <b>How to read the figures:</b> official status runs <b>1 = least deprived</b> to
  <b>4 = most deprived</b>, so a <b>rising</b> status (a falling status <i>index</i> value) means an
  area became <b>less</b> deprived — which is also the signature of gentrification, not automatically
  good news for existing residents. See the <a href="/methodology">methodology & data sources</a>
  page for a full walkthrough. Figures are on Berlin's current (2021+) boundaries and the live
  social-monitoring editions (2021–2025).
</Alert>

## Browse by district

<Dropdown name="bezirk" title="District (Bezirk)" defaultValue="02">
  <DropdownOption value="01" valueLabel="01 · Mitte"/>
  <DropdownOption value="02" valueLabel="02 · Friedrichshain-Kreuzberg"/>
  <DropdownOption value="03" valueLabel="03 · Pankow"/>
  <DropdownOption value="04" valueLabel="04 · Charlottenburg-Wilmersdorf"/>
  <DropdownOption value="05" valueLabel="05 · Spandau"/>
  <DropdownOption value="06" valueLabel="06 · Steglitz-Zehlendorf"/>
  <DropdownOption value="07" valueLabel="07 · Tempelhof-Schöneberg"/>
  <DropdownOption value="08" valueLabel="08 · Neukölln"/>
  <DropdownOption value="09" valueLabel="09 · Treptow-Köpenick"/>
  <DropdownOption value="10" valueLabel="10 · Marzahn-Hellersdorf"/>
  <DropdownOption value="11" valueLabel="11 · Lichtenberg"/>
  <DropdownOption value="12" valueLabel="12 · Reinickendorf"/>
</Dropdown>

```sql browse
select
    area_name,
    status_class as stage,
    dynamism_class as pressure_trend,
    -- Exact-code drill-down (#150): every area is one click from its full page, not just the
    -- district's top-ranked spotlight below. I2 (#219): area moved under /berlin/area.
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
  and substr(area_code, 1, 2) = '${inputs.bezirk.value}'
order by (dynamism_class_bi = 'negative') desc, dynamism_index desc
```

Every neighbourhood in the selected district, highest gentrification pressure first. Click any row
to open its exact page; the top-ranked one is also profiled in the spotlight below.

<DataTable data={browse} rows=10 rowShading=true link=area_link>
    <Column id=area_name title="Neighbourhood (PLR)"/>
    <Column id=stage title="Stage"/>
    <Column id=pressure_trend title="Pressure trend"/>
</DataTable>

```sql chosen
select area_code, area_name
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
  and substr(area_code, 1, 2) = '${inputs.bezirk.value}'
order by (dynamism_class_bi = 'negative') desc, dynamism_index desc
limit 1
```

---

## Spotlight — {chosen[0]?.area_name ?? 'this district'}

```sql spotlight
select
    g.area_code,
    g.status_class as stage,
    g.dynamism_class as pressure_trend,
    t.trajectory_type,
    t.trajectory_confidence
from gentriduck_marts.gentrification_index as g
left join gentriduck_marts.fct_gentrification_trajectory as t
    on t.city_code = g.city_code and t.area_vintage = 'lor_2021' and t.area_code = g.area_code
where g.variant = 'live_data' and g.area_level = 'plr' and g.city_code = 'BER'
  and g.period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
  and g.area_code = (
      select area_code
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
        and period_yyyymm = (
            select max(period_yyyymm) from gentriduck_marts.gentrification_index
            where variant = 'live_data' and area_level = 'plr'
        )
        and substr(area_code, 1, 2) = '${inputs.bezirk.value}'
      order by (dynamism_class_bi = 'negative') desc, dynamism_index desc
      limit 1
  )
```

<BigValue data={spotlight} value=stage title="Current stage" emptySet="warn"/>
<BigValue data={spotlight} value=pressure_trend title="Pressure trend" emptySet="warn"/>
<BigValue data={spotlight} value=trajectory_type title="Overall trajectory" emptySet="warn"/>
<BigValue data={spotlight} value=trajectory_confidence title="Confidence" emptySet="warn"/>

<!-- #323: guard on the VALUE (`chosen[0]?.area_code`), not just the row -- same #255 precedent as
     every /berlin/area/[code]-style Up-link (see e.g. pages/berlin/area/[code].md's Up-link
     comment for the full "undefined"-cascade rationale). This page isn't itself a `[code].md`
     template, but its `chosen`/`spotlight` queries are driven by a Dropdown input rather than a
     route param, and can be legitimately empty (build-time/shell rendering before the input's
     default value is bound); `chosen[0].area_code` was previously read directly, so an
     empty/placeholder result rendered the literal text "undefined" into this static `<a href>` --
     a real, crawlable `/berlin/area/undefined` route that Evidence then tried to prerender as the
     `/berlin/area/[code]` template and failed on (#323). -->
<p>
{#if chosen[0]?.area_code}
{chosen[0].area_name} is currently the highest gentrification-pressure neighbourhood in the
selected district. Its full profile — social-status trajectory, commercial-mix development,
Offering Advantage, demographics, amenities, and land value/rent — is on its
<a href="/berlin/area/{chosen[0].area_code}">canonical area page</a>.
{:else}
Pick a district above to see its highest-pressure neighbourhood — each one also has a full profile in the <a href="/berlin/area">neighbourhood list</a>.
{/if}
</p>

Trajectory labels are explained on the [methodology page](/methodology) — an "improving" label does
not by itself mean the change was good for existing residents; rising status can reflect
displacement as easily as incumbent social mobility.

## Honest caveats

- **These headline figures summarize what the linked area page shows in full** — its charts,
  definitions, and caveats (including that a falling status line means an area became *less*
  deprived, the signature of gentrification, and that land value/rent are official reference
  values, not observed transaction prices) live there, not duplicated here.
- Figures are on Berlin's **current (2021+) boundaries** and the live social-monitoring editions
  (2021–2025) only — this page does not show the pre-2021 `standard` variant.
- See [methodology & data sources §6](/methodology) for the full list of project-wide limitations
  (ecological fallacy, no displacement measurement, OSM completeness bias, and more).

## Further reading

See [methodology & data sources](/methodology) for what the index means, the
[POI & Offering Advantage map](/berlin/poi-map) (its "citywide context" section covers these
signals across all of Berlin) for the citywide picture, the [time-series view](/berlin/time-series)
for how the whole city has moved, or the [full neighbourhood list](/berlin/area) to search for a
specific area directly.

---

<FooterNav />

