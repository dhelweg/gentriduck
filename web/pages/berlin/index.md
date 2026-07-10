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

  I3 (#220): re-platformed onto the shared `<Hero>`/`<ChapterLabel>`/`<LinkCard>`/`<LinkCards>`
  components (web/components/), removing the hand-copied `.hero-compact`/`.audience-card` CSS this
  page had duplicated from `pages/index.md` (flagged by I3's scope: "remove any duplicated inline
  CSS/markup that I1 didn't already extract"). The "Where to go next" grid drops from six cards to
  five, folding the former "Citywide POI & price/rent overview" card into the "POI & Offering
  Advantage map" card -- I3's named consolidation merges that page's content into
  `/berlin/poi-map` (see that page and `pages/berlin/poi-price-overview.md`'s redirect stub).
-->

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Berlin" lede="Gentriduck's original city, and the one with the fullest data: eight years of official social-monitoring editions, a full OpenStreetMap history back to 2008, and official land-value/rent references, all at the neighbourhood (Planungsraum) scale. This page is the deep-dive entry point — pick a view below." />

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

<!--
  I3 (#220): "Area detail" (district browse + spotlight) is the primary browse entry; "All
  neighbourhoods" is kept as a secondary, explicitly-labelled full-text search rather than folded
  into it -- see pages/berlin/area-detail.md's header comment for why the two routes are
  reconciled in role/labelling rather than merged (the crawlable full-list table is what lets
  Evidence's static build generate a real page per PLR; the district-browse table can't do that
  on its own). This card grid states that relationship explicitly rather than presenting them as
  two independent, equally-weighted options.
-->
<LinkCards>
  <LinkCard href="/berlin/maps" icon="🗺️" title="Maps" cta="Open the maps →">
    A citywide choropleth of gentrification stage (or the raw social-status/dynamism inputs
    behind it), one Planungsraum at a time. Click any area to open its full profile.
  </LinkCard>
  <LinkCard href="/berlin/time-series" icon="📈" title="Time series" cta="See the trend →">
    How Berlin has moved as a whole since the official social-monitoring reports began, plus a
    ranked list of the neighbourhoods that moved the most.
  </LinkCard>
  <LinkCard href="/berlin/area-detail" icon="🏘️" title="Area detail — start here" cta="Browse by district →">
    The primary way in: browse by district (Bezirk), then read a full spotlight — status
    trajectory, commercial mix, land value &amp; rent — on that district's highest-pressure
    neighbourhood. Links to <a href="/berlin/area">the full searchable list</a> if you already
    know the neighbourhood's name.
  </LinkCard>
  <LinkCard href="/berlin/area" icon="🔍" title="All neighbourhoods (full list)" cta="Search neighbourhoods →">
    A searchable table of all 542 current Planungsräume — a secondary way in for when you already
    know which neighbourhood you want; district browse above is the primary way in for everyone else.
  </LinkCard>
  <LinkCard href="/berlin/poi-map" icon="🏪" title="POI &amp; Offering Advantage map" cta="Explore the commercial mix →">
    Where shops, cafés, and other mapped places are concentrated (as raw density or Offering
    Advantage), plus the same two citywide contextual signals — POI growth, land value &amp; rent
    — added up across the whole city.
  </LinkCard>
</LinkCards>

## Honest caveats

Every page linked above carries its own specific caveats inline (early-year OSM completeness bias,
"improving is not automatically good news," ordinal-data handling, and so on) — see the
[methodology & data sources](/methodology) page, especially §6, for the full list rather than a
repeated summary here.

---

<FooterNav />
