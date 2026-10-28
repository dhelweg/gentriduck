---
title: Hamburg
sidebar_position: 12
---

<!--
  H3 (#237) scope (b)/(c): new sibling city folder, following the exact pattern I2 established for
  Berlin (docs/epic-i/I2-route-map.md, which explicitly deferred Hamburg until its methodology gate
  cleared -- this is that gate: docs/epic-h/H3-geo-signoff.md, H3-domain-signoff.md, both PASS WITH
  CONDITIONS). This page's own frontmatter (title + sidebar_position) sets the "Hamburg" folder's
  sidebar label/position, same convention as pages/berlin/index.md -- sidebar_position: 12 keeps
  Hamburg numbered right after the Berlin folder (11) and before /timeline (15), the next top-level
  position already in use (positions are scoped per tree level, Sidebar.svelte, see I2-route-map.md
  for the full caveat about flat-page vs. folder-section render passes).

  Scope: this is written honestly narrower than Berlin's landing page, not a 1:1 mirror --
  see docs/epic-h/H3-domain-signoff.md conditions 1-3 and H3-geo-signoff.md's "why the admission
  surface is narrower than the ticket framing implies" section. Confirmed against the built
  parquet (data/serving/*.parquet, refreshed via `uv run poe export-serving` on this branch):
  - gentrification_index: 11,020 HH rows, variant='live_data' ONLY, area_level='subarea_l2' ONLY
    (943 distinct Gebiete), period_yyyymm 201312..202512 (13 annual editions).
    own_idx_class/own_idx_class_bi are hard-NULL for every HH row (H3 admission is D1/D2 outcome
    only, not the D4-EWR composite) -- see /maps below and /methodology §6.
  - fct_gentrification_change / mart_area_demographics: still BER-only (H3 sign-off condition
    4/scope guard). fct_gentrification_trajectory itself was widened to admit Hamburg rows by
    #314 (using H-C2 #159's dual-signed-off cadence-normalized trajectory_window_years window,
    unmodified thresholds) -- but no web display layer for it is built here yet, so this remains
    a data-layer-only change: no Hamburg time-series-with-trajectory-labels page, no per-area
    demographic profile, built here. The `<NotYetPublished>` placeholders on the Hamburg
    area-detail pages (area/[code].md, area/subarea_l1/[code].md, area/district/[code].md)
    already gate the trajectory section generically, so #314 required no web change.
  - mart_price_rent_dimension: admitted Hamburg's Wohnlage tier composition + modelled
    Mietenspiegel rent (I21-i/#303, docs/epic-h/303-price-rent-hamburg-geo-signoff.md and
    303-price-rent-hamburg-domain-signoff.md, both PASS) -- narrower IN KIND than Berlin's, not
    missing: no BRW/land-value signal, 2-tier (not 3-tier) Wohnlage, current-state-only (no
    multi-year vintage). No Hamburg price/rent display section is built from it here (that
    remains separate, out-of-scope future work) -- see the table below.
  - mart_price_rent_dimension_pre2021: still BER-only -- it structurally excludes Hamburg via its
    `area_vintage = 'lor_2021'` filter (Hamburg rows are `area_vintage = 'current'`); no Hamburg
    page is built from it here.
  - fct_poi_development / mart_poi_offering_advantage / mart_poi_offering_advantage_map: DO carry
    real HH rows (245,031 / 245,031 / 100,128 respectively) -- this data predates H3 (it flowed in
    via H1, #40, already gated) and is city-agnostic by construction (ADR-0005), so a genuine
    Hamburg POI & Offering Advantage page IS built (/hamburg/poi-map).
  - dim_area_geometry has HH rows at district (7, named), subarea_l1/Stadtteil (104, named), and
    subarea_l2/Gebiet (943; the source data has no name at this grain, so since #352 area_name is
    a derived label -- '<Stadtteil> · <OSM place name>' or '<Stadtteil> · Gebiet <code>', see
    transform/models/intermediate/int_hamburg_gebiet_names.sql).

  NOT built here, and why (SUPERSEDED by #353, see the note below): a district-browse/area-detail page (Berlin's primary browse entry)
  needs named areas and a per-area profile drawing on fct_gentrification_change (still
  Berlin-only, H3 sign-off condition 4) and fct_gentrification_trajectory (admits Hamburg as of
  #314, but no per-area display section is built from it here) and price-rent (which Hamburg
  *does* have since #303 --
  narrower in kind, see the table below -- but no per-area display section is built from it here);
  so this page isn't built. (#352: the "full searchable list" Berlin has as its secondary browse
  entry now exists for Hamburg too -- /hamburg/area lists every Gebiet by its derived label.) A time-series page mirroring Berlin's (citywide trend + "biggest movers"
  trajectory table) would need fct_gentrification_change (still Berlin-only, H3 sign-off
  condition 4) and fct_gentrification_trajectory (admits Hamburg as of #314, but no page is
  built from it here) -- so no /hamburg/time-series page either. This page states that gap
  honestly rather than building a thinner mirror.

  #353 (Hamburg-Berlin parity review) supersedes the "NOT built here" paragraph above. Both pages
  now exist, scoped to what existing sign-offs cover: /hamburg/area-detail (district browse +
  spotlight over the per-Gebiet stage already public on /hamburg/maps, H3) and
  /hamburg/time-series (the #314 trajectory rows -- movers and trajectory mix -- with the binding
  window disclosure; no citywide long-run status line, because fct_gentrification_change stays
  Berlin-only and #314 asks for a separately labelled long-run product). The card grid now mirrors
  Berlin's hub card for card, plus a District & area profiles card added to BOTH hubs. The OSM-label
  count in the caveats is computed (#352 review follow-up). Full gap list:
  docs/epic-g/353-hamburg-berlin-parity-audit.md.
-->

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Hamburg" lede="Gentriduck's second city, admitted 2026-07-18 (H3, #237) after a dedicated methodology gate. Hamburg's own official Sozialmonitoring reports its social-status and change classification, at the statistisches-Gebiet (Kiez-equivalent) scale — and OpenStreetMap's commercial-mix data covers Hamburg the same way it covers Berlin. This is a genuinely narrower dataset than Berlin's, and this page says exactly how." />

Every figure here is a small-area aggregate — a property of a statistisches Gebiet of a few
thousand residents, never a person, household, or building — built on the same governed
methodology described on the [methodology & data sources](/methodology) page, §6 of which carries
the full, specific list of what is different about Hamburg's data compared to Berlin's. If you're
new to the project, that page (or the [home page](/)) is the better starting point.

```sql headline
select
    count(*) as areas_monitored,
    max(period_yyyymm) as latest_period
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )
```

<BigValue data={headline} value=areas_monitored title="Hamburg statistische Gebiete monitored"/>
<BigValue data={headline} value=latest_period title="Latest reporting period" fmt="0"/>

```sql label_stats
-- #353 (#352 review follow-up): computed instead of a hard-coded "41 of 943" -- same
-- label-contains-code test as the Gebiet pages and map tooltips.
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'
```

<script>
  // Pre-formatted here so the caveat list below carries no quote characters (mdsvex smart quotes).
  $: osmLabelCount = label_stats?.[0]
    ? `${label_stats[0].n_osm_named} of ${label_stats[0].n_gebiete}`
    : 'a minority';
</script>

## What Hamburg has — and what it doesn't (yet)

<Alert status="info">
  <b>Hamburg is not a smaller Berlin.</b> The two cities share the same theoretical model
  (Dangschat's double invasion-succession cycle) and the same D1×D2 typology matrix, but Hamburg's
  data is genuinely thinner in specific, disclosed ways — not just "less complete." See
  <a href="/methodology">methodology §6</a> for the full four-point list (observation-window
  meaning, the missing migration/tenure indicators, the Stadtteil grain ceiling, and the
  same-named-stage disclosure rule) before reading anything below as directly comparable to a
  Berlin number.
</Alert>

| | Berlin | Hamburg |
|---|---|---|
| Social status / dynamism outcome (D1/D2) | ✅ Planungsraum grain | ✅ statistisches-Gebiet grain (this admission, H3/#237) |
| Six-stage typology (D1×D2 matrix) | ✅ | ✅ — same matrix, different underlying window (see methodology §6.1) |
| Commercial/amenity mix (D3, OSM POI + Offering Advantage) | ✅ | ✅ — see [POI & Offering Advantage map](/hamburg/poi-map) |
| Socio-demographic baseline composite (D4/EWR) | ✅ 5 indicators, PLR grain | ⛔ not published in this mart (`own_idx_class` is NULL for every Hamburg row) — see methodology §6.2/§6.3 for what the underlying composite looks like where it *is* disclosed |
| Land value & estimated rent (Bodenrichtwert/Mietspiegel) | ✅ | ⚠️ narrower in kind, not missing — `mart_price_rent_dimension` carries Hamburg's Wohnlage tier composition + modelled Mietenspiegel rent (I21-i/#303): no BRW/land-value equivalent, 2-tier not 3-tier Wohnlage, current-state-only. Not shown on any page yet: its sign-off requires a Hamburg-specific methodology disclosure first |
| Milieuschutz / displacement-zone flag | ✅ | disclosed separately (Hamburg's *soziale Erhaltungsverordnung*, C5/#203) but not yet surfaced as a site page |
| Named neighbourhoods / district browse | ✅ (542 PLRs, all named) | ⚠️ Hamburg's finest grain (943 Gebiete) has **no official name** in the source data; this site labels each one by its Stadtteil plus an OpenStreetMap neighbourhood name or its code (e.g. "Eimsbüttel · Gebiet 35001"). [District browse](/hamburg/area-detail) and area profiles (district → Stadtteil → Gebiet) publish stage, trajectory, commercial mix and amenities; demographics, within-group dominance and land value are not shown, each page says why |
| Per-area trajectory / time-series page | ✅ | ⚠️ the 2019–2025 social-status trajectory is on every area page and the [time series](/hamburg/time-series) page (movers, trajectory mix; #314/#317); no citywide long-run status line or per-area status chart, which would need `fct_gentrification_change` (kept Berlin-only until Hamburg has its own sign-off for it, H3 sign-off condition 4) |
| Everyday amenities (schools, doctors, transit, most common cuisine; OSM) | ✅ | ✅ on every Gebiet and Stadtteil page (I20) |

## Where to go next

<!-- #353: same cards, same order and wording pattern as pages/berlin/index.md's grid, so a reader
     who knows one hub can use the other; plus the District & area profiles card (added to both). -->
<LinkCards>
  <LinkCard href="/hamburg/maps" icon="🗺️" title="Maps" cta="Open the maps →">
    A citywide choropleth of Hamburg's official Sozialmonitoring gentrification stage (or the raw
    social-status/dynamism inputs behind it), one statistisches Gebiet at a time. Click any area to
    open its full profile.
  </LinkCard>
  <LinkCard href="/hamburg/time-series" icon="📈" title="Time series" cta="See the trend →">
    How Hamburg's Gebiete have moved over the 2019–2025 Sozialmonitoring editions, plus a list of
    the Gebiete whose status changed.
  </LinkCard>
  <LinkCard href="/hamburg/area-detail" icon="🏘️" title="Area detail — start here" cta="Browse by district →">
    The primary way in: browse by district (Bezirk), then read a headline spotlight on one Gebiet
    with that district's strongest pressure reading, with a link to its full profile. If you
    already know the Gebiet, the full searchable list (next card) is faster.
  </LinkCard>
  <LinkCard href="/hamburg/area" icon="🔍" title="All Gebiete (full list)" cta="Search Gebiete →">
    A searchable table of all statistische Gebiete — a secondary way in for when you already know
    which one you want; district browse above is the primary way in for everyone else.
  </LinkCard>
  <LinkCard href="/hamburg/poi-map" icon="🏪" title="POI &amp; Offering Advantage map" cta="Explore the commercial mix →">
    Where shops, cafés, and other mapped places are concentrated across Hamburg — raw density or
    Offering Advantage — plus the same signal added up across the whole city.
  </LinkCard>
  <LinkCard href="/hamburg/area/district" icon="🧭" title="District &amp; area profiles" cta="Browse districts and Stadtteile →">
    Hamburg's 7 districts and 104 Stadtteile: how their Gebiete are spread across stages and
    trajectories, mapped places, and amenities — never a re-scored index for the larger area.
  </LinkCard>
</LinkCards>

## Honest caveats

- **Gebiet names are labels, not official names.** Hamburg's statistische Gebiete (this
  project's Hamburg equivalent of a Berlin Planungsraum) carry only a numeric code in the source
  geodata, unlike Berlin's PLRs, which are all named. So each Gebiet is shown as its Stadtteil
  plus either an OpenStreetMap neighbourhood or quarter name that lies inside it ({osmLabelCount}, e.g.
  "St. Pauli · Karolinenviertel") or its code (e.g. "Eimsbüttel · Gebiet 35001"). An OSM name
  marks a point inside the Gebiet; it does not mean the Gebiet and the neighbourhood share a
  boundary.
- **Only one data variant.** Unlike Berlin (which offers a 2018-thesis-reproduction `standard`
  variant alongside `live_data`), Hamburg only ever appears in the `live_data` variant — there is
  no Hamburg equivalent of the frozen 2018 snapshot.
- **The area profiles show fewer sections than Berlin's.** They follow the same section order as
  Berlin's area pages and publish the stage, the 2019–2025 trajectory, the commercial mix and
  Offering Advantage (Gebiet pages), and everyday amenities. Demographics, within-group dominance,
  land value and rent, and a status-over-time chart are not shown for Hamburg yet; each of those
  sections says why, instead of showing a figure.
- **The 2018 thesis's hypotheses have not been fully re-tested on Hamburg yet.** That work is
  planned in [#355](https://github.com/dhelweg/gentriduck/issues/355); the
  [thesis re-check](/thesis-recheck) covers Berlin.
- **Every other caveat on this page is a pointer, not a repeat.** The specific, load-bearing
  differences from Berlin — the Dynamik window's qualitative meaning, the missing D4 indicators,
  the Stadtteil grain ceiling, and the same-named-stage disclosure rule — are stated once, in full,
  on the [methodology & data sources page, §6](/methodology).

---

<FooterNav />
