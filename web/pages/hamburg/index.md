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
  - fct_gentrification_change / fct_gentrification_trajectory / mart_area_demographics: BER-only
    (H3 sign-off condition 4/scope guard) -- no Hamburg time-series-with-trajectory-labels page,
    no per-area demographic profile, built here.
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
    subarea_l2/Gebiet (943, NOT named -- area_name is a genuine blank in the source data at this
    grain, not a bug) -- see that page and /methodology §6 point 3 for what this means for the map.

  NOT built here, and why: a district-browse/area-detail page (Berlin's primary browse entry)
  needs named areas and a per-area profile drawing on fct_gentrification_change/trajectory/
  price-rent, none of which Hamburg has; a "full searchable list" page (Berlin's secondary browse
  entry) would be a 943-row table of bare numeric codes with no name to search by -- not a useful
  mirror of Berlin's named-PLR list, so it is not built either. A time-series page mirroring
  Berlin's (citywide trend + "biggest movers" trajectory table) would need
  fct_gentrification_change/fct_gentrification_trajectory, which remain Berlin-only by the H3
  sign-off's explicit scope guard (condition 4) -- so no /hamburg/time-series page either. This
  page states that gap honestly rather than building a thinner mirror.
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
| Land value & estimated rent (Bodenrichtwert/Mietspiegel) | ✅ | ⛔ not yet in a published Hamburg mart |
| Milieuschutz / displacement-zone flag | ✅ | disclosed separately (Hamburg's *soziale Erhaltungsverordnung*, C5/#203) but not yet surfaced as a site page |
| Named neighbourhoods / district browse | ✅ (542 PLRs, all named) | ⛔ Hamburg's finest grain (943 Gebiete) has **no name** in the source data — only a numeric code (see the map below). A [structural area-hierarchy scaffold](/hamburg/area) exists (I21-g, #301) — routes and page layout only, no real per-area figures published yet |
| Per-area trajectory / time-series page | ✅ | ⛔ needs `fct_gentrification_change`/`fct_gentrification_trajectory`, which remain Berlin-only by design (H3 sign-off condition 4) |

## Where to go next

<LinkCards>
  <LinkCard href="/hamburg/maps" icon="🗺️" title="Maps" cta="Open the maps →">
    A choropleth of Hamburg's official Sozialmonitoring gentrification stage (or the raw
    social-status/dynamism inputs behind it), one statistisches Gebiet at a time.
  </LinkCard>
  <LinkCard href="/hamburg/poi-map" icon="🏪" title="POI &amp; Offering Advantage map" cta="Explore the commercial mix →">
    Where shops, cafés, and other mapped places are concentrated across Hamburg — raw density or
    Offering Advantage — plus the same signal added up across the whole city.
  </LinkCard>
  <LinkCard href="/hamburg/area" icon="🧭" title="Area profiles (scaffold)" cta="See the structure →">
    A structural preview of the district → Stadtteil → Gebiet drill-down template (I21-g, #301) —
    routes and page layout only; no real per-area figures are published here yet.
  </LinkCard>
</LinkCards>

## Honest caveats

- **No neighbourhood names at Hamburg's finest grain.** Hamburg's statistisches Gebiete (this
  project's Hamburg equivalent of a Berlin Planungsraum) carry only a numeric code in the source
  geodata — unlike Berlin's PLRs, which are all named. The [maps page](/hamburg/maps) shows the
  code; there is no name to browse or search by, so no full-list or district-browse page is built
  for Hamburg (see the table above).
- **Only one data variant.** Unlike Berlin (which offers a 2018-thesis-reproduction `standard`
  variant alongside `live_data`), Hamburg only ever appears in the `live_data` variant — there is
  no Hamburg equivalent of the frozen 2018 snapshot.
- **The [area-profile scaffold](/hamburg/area) shows structure only.** I21-g (#301) introduced the
  `/hamburg/area/…` route tree (district → Stadtteil → Gebiet) on the same canonical template as
  Berlin's area pages, but every page in it renders an explicit "not yet published for Hamburg"
  state rather than a real figure — publishing real content there is its own, separately-gated
  ticket (I21-i, #303).
- **Every other caveat on this page is a pointer, not a repeat.** The specific, load-bearing
  differences from Berlin — the Dynamik window's qualitative meaning, the missing D4 indicators,
  the Stadtteil grain ceiling, and the same-named-stage disclosure rule — are stated once, in full,
  on the [methodology & data sources page, §6](/methodology).

---

<FooterNav />
