---
title: Berlin
sidebar_position: 11
---

<!--
  I2 (#219): new city landing page — the "/berlin" deep-dive entry point the ticket calls for
  (city-folder navigation restructure, see docs/epic-i/I2-route-map.md). Its own frontmatter
  (title + sidebar_position) sets the "Berlin" folder's sidebar label/position, per Evidence's
  documented folder convention (a folder's index.md governs the folder node itself; sibling files
  in the same folder become its children — see @evidence-dev/core-components's Sidebar.svelte,
  sortChildrenBySidebarPosition/deleteEmptyNodes). sidebar_position: 11 keeps Berlin numbered
  right after /thesis-recheck (10) and before /methodology (20) for readability, matching the
  pre-I2 relative order -- NB Sidebar.svelte actually renders top-level *flat* pages and top-level
  *folder* sections in two separate passes (see that file's two `{#each firstLevelFiles as file}`
  loops), so in the rendered sidebar the Berlin section will always appear after every flat
  top-level page (thesis-recheck..about), not literally between thesis-recheck and methodology --
  this was already true of the pre-I2 /area folder and is not a defect introduced here.

  Scope: this is a navigation hub, not a new finding — every claim below is a restatement of
  what's already live on /, /methodology, and the pages linked into from here. No new indicator,
  weight, or normalization is introduced (not methodology-bearing). Follows the I1 page template
  (docs/epic-i/storytelling-guide.md §4) in miniature: a compact hero, one paragraph of orientation
  (why Berlin, why these five pages), then direct links into every Berlin deep-dive page, then the
  footer nav -- deliberately no duplicate charts (those already live on the linked pages).
-->

<div class="hero hero-compact">
  <div class="hero-eyebrow">Chapter 3 — The Evidence</div>
  <h1>Berlin</h1>
  <p class="hero-lede">Gentriduck's original city, and the one with the fullest data: eight years
  of official social-monitoring editions, a full OpenStreetMap history back to 2008, and official
  land-value/rent references, all at the neighbourhood (Planungsraum) scale. This page is the
  deep-dive entry point — pick a view below.</p>
</div>

<style>
.hero-compact {
  margin: -0.5rem -0.25rem 1.5rem;
  padding: 1.5rem 1.6rem;
  border-radius: 1rem;
  background:
    radial-gradient(circle at 12% 18%, rgba(37, 99, 235, 0.16), transparent 55%),
    radial-gradient(circle at 88% 82%, rgba(194, 65, 12, 0.13), transparent 55%),
    rgba(127, 127, 127, 0.04);
  border: 1px solid rgba(127, 127, 127, 0.16);
}
.hero-compact .hero-eyebrow {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.45rem;
}
.hero-compact h1 { margin: 0 0 0.55rem 0; font-size: 1.9rem; line-height: 1.15; }
.hero-compact .hero-lede { max-width: 46rem; font-size: 0.98rem; line-height: 1.5; opacity: 0.92; margin: 0; }
.audience-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
  margin: 1.1rem 0 1.5rem;
}
.audience-card {
  display: block;
  text-decoration: none !important;
  color: inherit;
  padding: 1.15rem 1.15rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(127, 127, 127, 0.25);
  background: rgba(127, 127, 127, 0.04);
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}
.audience-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: #2563eb;
}
.audience-icon { font-size: 1.7rem; margin-bottom: 0.4rem; }
.audience-card h3 { margin: 0 0 0.4rem 0; font-size: 1rem; }
.audience-card p { margin: 0 0 0.7rem 0; font-size: 0.85rem; opacity: 0.85; line-height: 1.4; }
.audience-cta { font-size: 0.82rem; font-weight: 700; color: #2563eb; }
</style>

Every figure here is a small-area aggregate — a property of a neighbourhood of a few thousand
residents, never a person, household, or building — built on the same governed methodology
described on the [methodology & data sources](/methodology) page. If you're new to the project,
that page (or the [home page](/)) is the better starting point; this page assumes you already want
Berlin specifically and just need to find the right view.

```sql headline
select
    count(*) as areas_monitored,
    max(period_yyyymm) as latest_period
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  )
```

<BigValue data={headline} value=areas_monitored title="Berlin neighbourhoods (Planungsräume) monitored"/>
<BigValue data={headline} value=latest_period title="Latest reporting period" fmt="0"/>

## Where to go next

<div class="audience-cards">
  <a href="/berlin/maps" class="audience-card">
    <div class="audience-icon">🗺️</div>
    <h3>Maps</h3>
    <p>A citywide choropleth of gentrification stage (or the raw social-status/dynamism inputs
    behind it), one Planungsraum at a time. Click any area to open its full profile.</p>
    <span class="audience-cta">Open the maps →</span>
  </a>
  <a href="/berlin/time-series" class="audience-card">
    <div class="audience-icon">📈</div>
    <h3>Time series</h3>
    <p>How Berlin has moved as a whole since the official social-monitoring reports began, plus a
    ranked list of the neighbourhoods that moved the most.</p>
    <span class="audience-cta">See the trend →</span>
  </a>
  <a href="/berlin/area-detail" class="audience-card">
    <div class="audience-icon">🏘️</div>
    <h3>Area detail</h3>
    <p>Browse by district (Bezirk), then read a full spotlight — status trajectory, commercial
    mix, land value & rent — on that district's highest-pressure neighbourhood.</p>
    <span class="audience-cta">Browse by district →</span>
  </a>
  <a href="/berlin/area" class="audience-card">
    <div class="audience-icon">🔍</div>
    <h3>All neighbourhoods</h3>
    <p>A searchable table of all 542 current Planungsräume — the fastest way in if you already
    know which neighbourhood you want.</p>
    <span class="audience-cta">Search neighbourhoods →</span>
  </a>
  <a href="/berlin/poi-map" class="audience-card">
    <div class="audience-icon">🏪</div>
    <h3>POI &amp; Offering Advantage map</h3>
    <p>Where shops, cafés, and other mapped places are concentrated, and how over- or
    under-represented each commercial category is compared to the citywide average.</p>
    <span class="audience-cta">Explore the commercial mix →</span>
  </a>
  <a href="/berlin/poi-price-overview" class="audience-card">
    <div class="audience-icon">📊</div>
    <h3>Citywide POI &amp; price/rent overview</h3>
    <p>The same two contextual signals — commercial mix, land value &amp; rent — added up across
    the whole city rather than one neighbourhood at a time.</p>
    <span class="audience-cta">See the citywide picture →</span>
  </a>
</div>

## Honest caveats

Every page linked above carries its own specific caveats inline (early-year OSM completeness bias,
"improving is not automatically good news," ordinal-data handling, and so on) — see the
[methodology & data sources](/methodology) page, especially §6, for the full list rather than a
repeated summary here.

---

<FooterNav />
