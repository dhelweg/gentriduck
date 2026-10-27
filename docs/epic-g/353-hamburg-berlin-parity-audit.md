# #353 — Hamburg ↔ Berlin usability parity audit

**Ticket:** [#353](https://github.com/dhelweg/gentriduck/issues/353), plus the #352 review follow-ups
in its comment. **Branch:** `feat/353-hamburg-parity` (cut from `develop` after #351 and #352).
**Author:** web-engineer. **Date:** 2026-10-27. **Status:** awaiting `web-engineer-reviewer`.

Maintainer request: *"please review all pages and align usability of hamburg with berlin."*

## Rule used to decide what Hamburg may show

This is a web-only parity pass. It adds no dbt model, mart, indicator, weight or method. A Hamburg
figure is shown only if:

1. the **same figure for the same area** is already public elsewhere on the site under an existing
   sign-off, or
2. it is a **count or sum** of such figures (as Berlin's coarse pages already do).

Averages of indices, new comparisons, and long-run series are not added. Where Hamburg can't match
Berlin, the page says so in the section itself and gives the reason (`<NotYetPublished>` now takes
a per-section reason instead of the stale "I21-i, #303" pointer).

Sign-offs this relies on: H3 (`docs/epic-h/H3-geo-signoff.md`, `H3-domain-signoff.md`) for the
per-Gebiet stage; #314 (`docs/epic-h/314-hh-trajectory-*-signoff.md`) for trajectories; #312/#318
(`docs/epic-h/312-hh-oa-*`, `318-hh-oa-gate-*`) for Hamburg POI/Offering Advantage, which is already
live on `/hamburg/poi-map`; OA-D1b (`docs/methodology/OA-D1b-*-signoff.md`) and #302
(`docs/epic-i/302-i21h-*`) for the Gebiet → Stadtteil → district edges; I20 Hamburg parity
(`docs/epic-i/I20-hamburg-parity-domain-signoff.md`) for amenities copy; I18-web
(`docs/epic-i/I18-web-*`) for the coarse-page distribution display.

**For the PM:** three closures re-use copy that was signed off for Berlin on Hamburg data that is
already public: the Gebiet Offering Advantage radar text (I15 framing), the coarse-page stage-mix
sentence (I18-web), and the district-browse pressure ordering (Berlin's `area-detail` rule).
Hamburg-specific differences are disclosed next to each one. If you want a domain spot-check before
integration, these three are the ones to look at (rows G17, G23, G6), plus the "at a glance" stage
sentence (G14).

## Gap list

Legend: **closed** = done in this branch · **not possible** = data or sign-off missing (cited) ·
**out of scope** = deliberately left for another ticket.

### Navigation and structure (all pages)

| # | Gap (Hamburg vs Berlin) | Decision | What / why |
|---|---|---|---|
| G1 | Breadcrumb drops the city on 4-level routes ("Home / Area profiles / Stadtteile / …"); Berlin BZR/PGR show the slug "bzr"/"pgr" | **closed** | New `web/components/AreaBreadcrumbs.svelte`; all 8 profile templates (5 Berlin, 3 Hamburg) set `hide_breadcrumbs: true` and render "Home › City › list page › (parent) › area". Root cause: Evidence's `BreadCrumbs.svelte` collapses trails longer than 3 crumbs. |
| G2 | Profile pages have `<title>Evidence</title>` (both cities, all levels) | **closed** | New `web/components/PageTitle.svelte` (a child component may hold its own `<svelte:head>`; the page may not hold a second one). Titles read e.g. "Altona — district profile · Hamburg · Gentriduck". |
| G3 | Hamburg hub had 3 cards; Berlin's has 5 (maps, time series, area detail, full list, POI map) | **closed** | Hamburg hub mirrors Berlin's cards in the same order. A "District & area profiles" card was missing on **both** hubs; added to both. |
| G4 | No `/hamburg/time-series` | **closed** (partly, see G5) | New page, Berlin's sections in Berlin's order: movers (status rose / fell) and trajectory mix, from the #314 rows, with the binding window disclosure. The movers list every changed Gebiet (searchable) rather than a top 12, because `status_delta` is a small integer and 83 Gebiete tie at −1. |
| G5 | Berlin's time series opens with a citywide median-status line | **not possible** | Berlin's line reads `fct_gentrification_change`, which is Berlin-only by design (H3 domain sign-off, condition 4). The #314 domain sign-off §5 says a long-run Hamburg view must be "a separately-labelled descriptive product". Stated on the page. **Follow-up:** a separately signed-off Hamburg long-run descriptive series (new mart or gate). |
| G6 | No `/hamburg/area-detail` (Berlin's "start here" browse) | **closed** | New page: query-driven district dropdown, every Gebiet with a stage in that district ordered by Berlin's pressure rule, spotlight with profile link. Ordering is within one Hamburg district only (H3 condition 2 forbids only pooled cross-city ranking). |
| G7 | `/hamburg/maps` areas weren't clickable; Berlin's open the profile | **closed** | Click-through at all three levels (Gebiet, Stadtteil, district). The 4 merged-pair Stadtteil codes (#334) get no link. Added Berlin's "Where next" section. |
| G8 | `/hamburg/poi-map` Gebiete weren't clickable; Berlin's are | **closed** | Click-through to the Gebiet profile, which now carries the OA radar (G10). |
| G9 | Sidebar order differed (Hamburg: maps, POI map, area profiles) | **closed** | Berlin's order: time series 1, maps 2, area detail 3, full list 4, POI map 5. |
| G10 | Hamburg list pages titled "Area profiles" / "Districts"; Berlin "All neighbourhoods" / "District & area profiles" | **closed** | Retitled "All Gebiete (statistische Gebiete)" and "District & area profiles"; ledes and intro copy follow Berlin's. Stale "Scaffold only — no real figures" alerts removed. |
| G11 | Hamburg full list had name + code only; Berlin's has stage, pressure trend, district | **closed** | Added district, stage, pressure trend (the values `/hamburg/maps` shows). Stadtteil list gains district and Gebiet count (mirrors Berlin's Ortsteil list). |
| G12 | No cross-city pointers on time series / area detail | **closed** | One line on each city's page pointing to the other's (never combined). |
| G13 | `reference/area-hierarchy` said the Hamburg Gebiet → Stadtteil edge was "not currently resolved"; every Hamburg page flagged it as stale | **closed** | Restated the signed-off OA-D1b method (centroid-in-polygon, nearest-Stadtteil fallback for 2 Gebiete). Also fixed a wrong Berlin hub link there. |

### Area profiles — section by section

Canonical section order (I21-f) is now identical in both cities: at a glance → social status &
trajectory → commercial mix & OA → within-group dominance → people & structure → amenities → land
value & rent → where this area sits → honest caveats → further reading.

| # | Section / page | Decision | What / why |
|---|---|---|---|
| G14 | Gebiet: current stage (Berlin shows a "Current stage" value and a written portrait) | **closed** (stage) / **not possible** (portrait) | "At a glance" states the current stage and pressure trend: the same row `/hamburg/maps` shows (H3), labelled "not directly equivalent" to a same-named Berlin stage (H3 domain condition 1(iv)), then the existing #317 pace sentence. Berlin's stage-wording dictionary and district/city comparison sentence are **not** carried over: that wording was reviewed for Berlin areas only (I14), and the comparison averages `status_index`, which has never been computed or reviewed for Hamburg. |
| G15 | Gebiet: status-over-time line chart with district/city lines | **not possible** | Same reason as G5 (`fct_gentrification_change` Berlin-only; #314 long-run condition). Stated in the section. |
| G16 | Gebiet: commercial mix over time + top-category sentence | **closed** | `fct_poi_development` HH (the counts `/hamburg/poi-map` uses). Sentence compares Gebiet / Stadtteil / Hamburg (sums of counts). Hamburg's OSM coverage caveat (stabilizes ~2014–15; Haklay 2010) is placed next to the chart. |
| G17 | Gebiet: Offering Advantage radar | **closed** (city baseline) / **not possible** (district line) | Same rows `/hamburg/poi-map` colours by (HH, standard/faithful). Min-base-flagged rows left out and disclosed, as on the map; Berlin's "† fewer than 5 places" flag kept. Berlin's district-average line is not drawn: that average has not been computed or reviewed for Hamburg. Berlin's sentence "OA is one input into the governed index" is replaced, because it is false for Hamburg (Hamburg's stage is the Sozialmonitoring D1/D2 outcome only). |
| G18 | Within-group dominance (all levels) | **not possible** | `mart_poi_dominance` has HH rows, but `web/sources/gentriduck_marts/mart_poi_dominance.sql` keeps `city_code = 'BER'`, and the OA-D0 dominance ethics conditions were checked for Berlin only. **Follow-up:** Hamburg dominance display gate + source change. |
| G19 | People & structure (all levels) | **not possible** | Hamburg EWR exists only at Stadtteil/district grain (methodology §6 point 3), and `docs/epic-h/313-hh-area-demographics-domain-signoff.md` forward conditions C-5..C-8 bind a Hamburg web slice of its own (wording, no ranking, merged-Stadtteil and NULL handling). **Follow-up:** Hamburg demographics web slice with its own gate. |
| G20 | Land value & estimated rent (all levels) | **not possible** | Hamburg has no BRW series; its Wohnlage/Mietenspiegel rows are narrower in kind, and `docs/epic-h/303-price-rent-hamburg-domain-signoff.md` Condition 2 requires a Hamburg-specific G2 methodology disclosure before any public display. **Follow-up:** that G2 disclosure, then a display ticket. |
| G21 | Amenities (Gebiet, Stadtteil) | already at parity | Unchanged (I20 Hamburg parity sign-off). |
| G22 | Amenities on the district page | **out of scope** | Berlin's district pages have no amenities section either; a Hamburg district version would be new reader-facing copy, which I20 condition 5 asks to re-check first. The district totals already appear as the comparison column on Stadtteil/Gebiet pages. Stated in the section. |
| G23 | Stadtteil/district: neighbourhood-stage mix (Berlin's coarse pages lead with it) | **closed** | Count of the area's Gebiete by current stage (the per-Gebiet values on `/hamburg/maps`), with Berlin's distribution takeaway sentence, the "not directly equivalent" label, and the crosswalk-provenance note the #302 domain sign-off asks for. Gebiete without a stage are labelled "no stage on record", not "uninhabited" (cf. #313 domain finding D-7). |
| G24 | Stadtteil/district: "Mapped places" bar | **closed** | Sum of the Gebiete's latest-snapshot `fct_poi_development` counts. |
| G25 | Stadtteil/district: Offering Advantage roll-up | **not possible** | `mart_poi_oa_arealevel` has HH district/Stadtteil rows, but `web/sources/gentriduck_marts/mart_poi_oa_arealevel.sql` keeps `city_code = 'BER'` (its comment still says "Hamburg has no rows", now stale), and the roll-up's MAUP disclosure was only checked for Berlin. **Follow-up:** source change + geo-DS check of the Hamburg MAUP disclosure. |
| G26 | Stadtteil child table: Berlin's coarse children tables carry stage | **closed** | Gebiete table gains stage and pressure trend. |
| G27 | Up line / hub links differ in shape | **closed** | Gebiet: "Up: Stadtteil · district browse · all districts" (Berlin PLR shape). Stadtteil: Berlin Ortsteil shape. District: Berlin Bezirk link line. |
| G28 | Trajectory disclosure hand-copied on three pages | **closed** | `web/components/HamburgTrajectoryNote.svelte` holds the binding #314 wording once (five uses). |
| G29 | Hamburg hypothesis testing | **out of scope** | #355. Hub caveat links to it as the placeholder. |

### #352 review follow-ups (issue comment)

| # | Item | Decision | What |
|---|---|---|---|
| F1 | Per-page title from area label | **closed** | G2. |
| F2 | Missing "Hamburg" crumb | **closed** | G1. |
| F3 | Hard-coded "41 of 943" (hub, Gebiet page) | **closed** | Computed from `dim_area_geometry` on the hub, the Gebiet page, and the full list (currently 41 of 943). |
| F4 | `areaName.includes(codeLabel)` vs `strpos(area_name, 'Gebiet ' \|\| area_code)` | **closed** | The Gebiet page now gets `label_has_code` from SQL with the same `strpos` test the maps and lists use. |
| F5 | Redundant Code column (Gebiet list, maps table) | **closed** | Shown only where the label lacks the code ("Code (if not in the name)"). |
| F6 | Berlin PLR names differing only by spelling across vintages | **note only** | Not changed (data side). |

### Cross-city pages

| Page | Finding | Decision |
|---|---|---|
| `/` (home) | Hamburg sentence said "maps and a POI overview map" only | **closed**: lists the same set of views as Berlin. |
| `/takeaways`, `/thesis-recheck` | Berlin-only by subject (the 2018 thesis is about Berlin) | **out of scope**: Hamburg hypotheses are #355. |
| `/methodology`, `/methodology-oa-modes` | Hamburg §6 already complete; OA-modes widgets are Berlin-only by source | no change (OA roll-up is G25). |
| `/timeline`, `/open-data`, `/about`, `/how-its-*`, `/reference/poi-taxonomy` | city-neutral | no change. |

### Found in Berlin during the review

| # | Finding | Decision |
|---|---|---|
| B1 | PLR "at a glance" showed literal `**bold**` and `[link](/methodology)` text (`{@html}` on markdown) | **closed** (display-only conversion, wording unchanged). |
| B2 | Berlin time series cuts movers at 12 rows although many areas tie at ±1 | **follow-up**: consider Hamburg's full searchable list on Berlin too. Not changed here. |
| B3 | `reference/area-hierarchy` linked "district & area profiles" to `/berlin/area` | **closed** (now `/berlin/area/bezirk`). |

## Follow-ups (need a mart, source change, or gate — not built here)

1. Hamburg long-run status series (G5/G15): separately labelled product per #314 §5.
2. Hamburg OA roll-up (G25): drop the `BER` filter in the `mart_poi_oa_arealevel` source, and get a
   geo-DS check of the MAUP disclosure for Hamburg.
3. Hamburg within-group dominance (G18): source change + OA-D0 ethics check for Hamburg.
4. Hamburg demographics web slice (G19): #313 C-5..C-8.
5. Hamburg price/rent display (G20): #303 Condition 2 G2 disclosure first.
6. Hamburg district amenities copy (G22): I20 condition-5 re-check.
7. Berlin movers top-12 cut (B2).
