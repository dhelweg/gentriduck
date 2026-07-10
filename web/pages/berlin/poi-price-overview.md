---
title: Citywide POI & price/rent overview (moved)
sidebar_link: false
hide_title: true
---

<!--
  I3 (#220) named consolidation: this page's content (citywide POI growth + land value/rent
  trends) merged into `/berlin/poi-map` ("Citywide context" section) -- see that page's header
  comment for the rationale. This route is kept as a short stub rather than deleted or left to
  404, per I3's SPEC ("removed routes get a short meta-refresh stub or are removed while still
  noindex"): the site already ships site-wide noindex during the soft-launch phase
  (`scripts/postbuild-noindex.mjs`), and this stub additionally drops out of the sidebar
  (`sidebar_link: false`, per @evidence-dev/core-components' Sidebar.svelte) so it isn't presented
  as a live, first-class page alongside the real ones -- it only exists for anyone who follows an
  old bookmark or external link to this exact URL. No `<meta http-equiv="refresh">` here: Evidence
  auto-injects its own `<svelte:head>` for every page's title/OG tags (see
  `@evidence-dev/preprocess`), and Svelte hard-errors the whole build on a second `<svelte:head>`
  in the same page -- a plain link is used instead of a client-side auto-redirect.
-->

# This page has moved

The citywide POI growth and land value/rent charts that used to live here are now part of the
**[POI & Offering Advantage map](/berlin/poi-map)** page, in its "Citywide context" section — same
data, same caveats, no methodology change.

---

<FooterNav />
