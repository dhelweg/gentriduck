---
title: Faithful vs improved — a methodology comparison (moved)
sidebar_link: false
hide_title: true
---

<!--
  I3 (#220) named consolidation: this page's content (the faithful-vs-improved Offering Advantage
  comparison, OA-C.2 #175) folded into `/methodology` as new §7 -- see that page's §7 header
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

The faithful-vs-improved Offering Advantage comparison that used to live here is now **§7 of the
[methodology & data sources](/methodology) page** — same content, same caveats, no methodology
change.

---

<FooterNav />
