---
title: Offering Advantage — modes, scales & dominance
sidebar_position: 21
---

<!--
  OA-D7 (#240, ADR-0024), PASS 2 of 2 (data-backed). Pass 1 (web-only, merged to `develop`) built
  this page's narrative/vocabulary/decoder content -- see git history for that pass's own header
  comment. This pass wires live Evidence.dev queries + charts against the three OA-D7 marts
  (`mart_poi_oa_methods` OA-D3/D3b, `mart_poi_oa_arealevel` OA-D2/D6, `mart_poi_dominance` OA-D4)
  the pass-1 sign-offs explicitly deferred: docs/methodology/OA-D7-geo-signoff.md's "Carried-forward
  conditions (bind pass 2, not this web-only pass)" and docs/methodology/OA-D7-domain-signoff.md's
  discharge list. Every method/scale/dominance LABEL used below is copied verbatim from the
  already-governed static tables in §2/§4/§5 above -- this pass surfaces already-approved figures
  live; it introduces no new indicator, weight, normalization, or interpretive claim.

  #298 (I21-d, 2026-07): per docs/epic-i/I21-ia-restructure-scoping.md §3/§5.2/§5.3 and
  docs/epic-i/I21-a-route-ruling.md, the two LIVE widgets this page originally hosted for §4
  ("OA across area scales") and §5 ("within-group dominance") have been RELOCATED onto each area's
  own canonical /berlin/area/{level}/{code} page -- this page keeps the explainer prose, decoder
  tables, and the §2 nine-methods-for-one-Kiez live widget (unchanged, still live here), but no
  longer hosts a second, competing live widget for a figure now shown on the area page itself
  (scoping §3's "link don't re-paste" principle). §4/§5 below now point to the area pages instead of
  re-deriving the mechanism note; see pages/berlin/area/bezirk/[code].md's header comment for the
  full relocation rationale (mechanism change: build-time ${params.code}-scoped read, not a citywide
  dropdown-driven client re-query -- same underlying marts, same binding conditions, same filters).

  The four carried-forward pass-2 conditions and how each is discharged (see the "Live:" subsections
  under §2/§4/§5 below for the mechanism in each case; §4/§5's mechanism is now on the area pages,
  per the #298 note above, not on this page):
  1. Completeness-contamination badge on any live differenced-over-time density/per-capita figure:
     NOT built -- discharged by avoidance, not by badge. #285 extended OA-D5's completeness-
     contamination gate to empirically test density/per-capita too (previously they were absent
     because they were added to the pipeline after OA-D5 first ran) -- see
     `docs/methodology/OA-D5-mode-comparison-findings.md` §4: density empirically PASSES the
     citywide, per-method version of that test; per-capita is INDETERMINATE (Berlin's exact-year
     EWR-to-POI join currently has only one usable year-over-year transition, 2024->2025 -- a
     genuine data-coverage gap, not a design flaw). Neither result satisfies OA-D0 domain sign-off
     Condition C.2, though: that condition requires the completeness-contamination test to PASS
     **"for that cell"** (per-area, per-year), and the test #285 ran is a citywide, per-method
     aggregate -- a materially weaker bar than the per-cell one the condition actually sets. The
     §2 "Live" table below therefore still shows density/per-capita STOCK (point-in-time) values
     only, never a year-over-year delta -- see that subsection's own caveat for the full reasoning.
     Building a properly per-cell-badged temporal view remains out of this pass's scope; a future
     ticket would need a new per-cell completeness flag column upstream first (data-engineer + geo-DS
     work, not a display decision this pass can make on its own) -- #285's citywide result is
     supportive evidence for density that such a future ticket can cite, not a substitute for it.
  2. `is_public_safe = true` as an ACTUAL query filter, not just documented: applied at the SOURCE
     layer (`web/sources/gentriduck_marts/mart_poi_dominance.sql`), the strongest point available --
     Evidence bundles a source's full result to the client for any page that queries it reactively, so
     filtering there means the cuisine-typed internal-study-only group never reaches the browser at
     all, not merely a page-level WHERE a future page could omit. #298 (I21-d) relocated the page
     that first wired this filter's query-layer restatement + dropdown-exclusion from this page onto
     each area's own canonical page -- see pages/berlin/area/bezirk/[code].md's header comment; the
     source-layer filter this condition is actually anchored to is unchanged and unaffected.
  3. Coarse-level (BZR/PGR/Bezirk) choropleths must carry the ecological-fallacy + MAUP-instability
     (PLR-vs-BZR rho~=0.66) caveat inline: this was originally discharged by a §4 "Live" map on this
     page; #298 (I21-d) relocated that map's query to each Bezirk/BZR/PGR page's own
     "Offering Advantage across the area hierarchy" section, which surfaces `maup_caveat_required`
     and `area_level_publish_tier` (both already computed by the OA-D6 mart) as an always-visible
     Alert, not a hover-only tooltip, repeating the rho~=0.66 figure verbatim from §4's static text
     above -- same discharge mechanism, now on the area page instead of this one.
  4. Min-base suppression must render as "too thinly observed to characterize," never absence: this
     was originally discharged by the §4 map (oa_domain nulled when `oa_domain_min_base_flag` is set)
     and the §5 table (`not is_thin_base` filter with a disclosed suppressed count) on this page;
     #298 (I21-d) relocated both mechanisms onto each area's own canonical page, unchanged.

  Client-bundle-size note (not methodology-bearing, a build-practicality fix): the raw
  `mart_poi_oa_methods` (leaf-taxonomy grain x 9 methods) and `mart_poi_oa_arealevel` (leaf-taxonomy
  grain x 4 area levels) marts are far too large to bundle whole to the client (`evidence sources`
  OOM'd on the unfiltered `mart_poi_oa_arealevel` alone, 535,977 rows) -- the three source files under
  `web/sources/gentriduck_marts/` therefore pre-filter to `taxonomy_level = 'domain'` / drop
  `area_level = 'plr'` (already live elsewhere, at finer grain, via `mart_poi_offering_advantage_map`
  on `/berlin/poi-map`) / restrict to `city_code = 'BER'` and `is_public_safe = true` respectively,
  each with its own header comment explaining the specific cut. No value is altered, aggregated, or
  re-derived by any of these filters -- see each source file for the exact rationale.

  Geometry: `web/scripts/export_area_geojson.py` gained `export_oa_arealevel_geometry()`, exporting
  plain (geometry-only, no gentrification_index join) FeatureCollections for BZR/PGR/Bezirk at the
  `lor_2021` vintage -- `web/static/geo/{bzr,pgr,bezirk}_lor2021.geojson` -- since PGR/Bezirk had no
  exported geojson at all before this pass, and the existing `bzr_standard.geojson` is pre-2021
  vintage (would not match this mart's 2021+ area codes, the same #149-class mismatch the existing
  script's own header already documents and guards against for PLR). #298 (I21-d) note: these three
  static geojson files are no longer read by ANY page after this page's own choropleth widget was
  relocated (the relocated per-area pages show a single area's own figure via `<BarChart>`, not a
  map across areas, so they need no geometry file) -- left in place as a harmless, unreferenced
  static asset rather than deleted, since a future ticket may still want a BZR/PGR/Bezirk choropleth
  somewhere and re-exporting is not free. Flagged here, not silently orphaned.

  Explicitly scoped OUT of this pass (see each "Live" subsection's own note for why):
  - A live PLR-grain choropleth for any of the nine methods: the canonical nested-LQ PLR map already
    exists at /berlin/poi-map; re-deriving another PLR view here would duplicate a published figure
    and was also the single biggest contributor to the client-bundle-size problem above.
  - Category/type taxonomy-level drill-down for the nine-methods table (domain grain only) -- again a
    bundle-size cut; the underlying mart supports it, a future pass can lift this restriction once a
    narrower per-domain-drill-down page shape is designed.
  - A live re-run of the OA-D5 cross-mode correlation study: §7's numbers remain the static,
    already-generated findings-doc figures; this pass does not add a live statistics engine.
  - Getis-Ord Gi* hotspot clustering: still gated behind ADR-0025 (proposed), unchanged from pass 1.
-->

<!--
  #298 (I21-d): the `<script>import { base } from '$app/paths';</script>` block this page carried
  since OA-D7 pass 2 is REMOVED here -- it existed solely for the two now-relocated live widgets'
  basePath-aware `AreaMap` geoJsonUrl and `${base}`-prefixed link columns (§4/§5's original SQL).
  Neither remains on this page (see the "See this on your area's page" subsections below); the §2
  nine-methods table (still live here) never needed `base`, since it uses `<BarChart>`/`<DataTable>`
  only, which are already basePath-aware without manual interpolation.
-->

<script>
</script>

<Hero compact eyebrow="Chapter 3 — The Evidence · reference / rulebook" title="Offering Advantage — modes, scales & dominance" lede="Offering Advantage (OA) is not one number. It is a family of measurements along independent axes — which method, at which spatial scale — and the choice of axis changes what a figure means more than any parameter does. This page is the decoder for all of it." />

This page restates the project's governed methodology for Offering Advantage's calculation
methods, area-hierarchy scales, and within-group dominance construct
([ADR-0024](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0024-oa-calculation-modes-area-hierarchy-dominance.md),
both required sign-offs recorded as `PASS WITH CONDITIONS`:
[geo-data-scientist](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-geo-signoff.md),
[gentrification-domain-expert](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-domain-signoff.md)).
It introduces no new indicator, weight, or method of its own — if anything here disagrees with a
linked source document, the source document wins. For the base OA construct itself (what a
location quotient is, why it's the thesis's chosen predictor), start with the
[methodology page](/methodology) and [ADR-0017](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md);
this page picks up from there.

<Alert status="info">
  <b>Pass 2 of 2 — live data is wired; §4/§5 now live on each area's own page (#298, I21-d).</b>
  The §2 nine-methods table below still queries <code>mart_poi_oa_methods</code> live, for one Kiez
  at a time. The OA-across-area-scales figure (formerly §4's live map) and the within-group
  dominance table (formerly §5's live table) have moved to headline/context-only grain on each
  area's own canonical page — <a href="/berlin/area/bezirk">district</a>,
  <a href="/berlin/area/bzr">Bezirksregion</a>, <a href="/berlin/area/pgr">Prognoseraum</a>, and
  (dominance only — see §4's own note below) <a href="/berlin/area/ortsteil">Ortsteil</a> — so the
  figure lives where it's about one specific place, not duplicated here. §4/§5 below keep the
  explainer prose and a link to "see this on your area's page." What's <b>still not</b> live
  anywhere: a PLR-grain choropleth for the eight non-canonical methods (the canonical nested-LQ PLR
  map already exists on the <a href="/berlin/poi-map">POI &amp; Offering Advantage map</a>), a
  category/type drill-down for the nine-methods table (domain grain only), a live re-run of the
  OA-D5 comparison study (§7 stays a static findings restatement, now covering the full nine-method
  family per #285), a year-over-year delta view for density/per-capita (§7's extended completeness
  gate tested this citywide and density passes it, but no <b>per-cell</b> completeness badge exists
  yet to gate an individual figure — see that subsection's own caveat), and Getis-Ord Gi* hotspot
  clustering (still gated behind
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0025-getis-ord-gistar-esda-mart-handoff.md">ADR-0025</a>,
  proposed).
</Alert>

## 1. Why OA is a family, not a number

Today's [POI & Offering Advantage map](/berlin/poi-map) shows exactly one way of computing OA: a
**nested location quotient** — how over- or under-represented a POI type is *within its own parent
category*, compared to the citywide average — at Planungsraum (PLR) grain. That is the 2018
thesis's own construct, and it remains this project's sole backtested anchor. But it is only one
point in a larger space of possible measurements, and reading one mode as if it were another is a
category error:

- **Which calculation method?** A parent-relative ratio, a raw proportion, and a
  small-sample-corrected ratio answer genuinely different questions from the same underlying counts.
- **At which spatial scale?** The same commercial mix reads differently at the Kiez (PLR) level than
  summed up to a whole borough (Bezirk).
- **Representation, or composition?** "Is this type over-represented here?" (Offering Advantage) and
  "is this group a monoculture or a mix?" (within-group dominance) are different constructs entirely
  — bundling them invites exactly the confusion this page exists to prevent.

**The firm rule governing every axis below:** these measurements are never blended into one
composite score
([ADR-0017 D3](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md);
[ADR-0024 D1/D3](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0024-oa-calculation-modes-area-hierarchy-dominance.md)).
No "consensus OA" column or value exists anywhere in this pipeline. Every figure, on this page or
any other, is labelled with exactly which method and which scale it is.

## 2. The nine calculation methods

All nine methods are different mathematical transforms of the *same* underlying POI counts — a
local count within a parent category, and the same count citywide
([ADR-0024 D1](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0024-oa-calculation-modes-area-hierarchy-dominance.md)).
Only one, the canonical nested location quotient, was validated against the 2018 thesis's own
golden results; the other eight are **new instruments this project adds**, each answering a
genuinely different question, never a redefinition of the thesis construct
([OA-D0 domain sign-off, Guardrail E](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-domain-signoff.md)).

| Method | Plain-language question | Unit | Is this "the 2018 result"? |
|---|---|---|---|
| **Nested LQ** *(canonical)* | Is this type over/under-represented here, relative to its own category, vs. the city? | ratio centred on 1 | **Yes — the sole 2018-golden-anchored method** |
| Global (city-relative) LQ | Same question, but measured against the *whole* local commercial mix rather than just its category | ratio centred on 1 | No — new instrument (ADR-0024) |
| Log-LQ | The nested LQ, on a symmetric log scale (so a doubling and a halving are equal-sized moves) | log-ratio centred on 0 | No — a rescaling of the nested LQ |
| Share-diff (shift-share) | By how many percentage points does the local mix differ from the city's? (magnitude, not ratio) | percentage points | No — new instrument |
| Shrunk-LQ (empirical Bayes) | The nested LQ, damped toward the city average in thin-data areas | ratio centred on 1 (shrunk) | No — a small-sample-corrected variant |
| Raw within-group share | What share of this area's own category is this type, with no city comparison at all? | proportion 0–1 | No — pure local composition |
| Binomial z-score (SLQ) | Is this local count far from what pure chance would produce, given the area's sample size? | standardized score centred on 0 | No — a significance reading of the same ratio |
| POI density | How many of this type per km²? | POIs / km² | No — a **different construct** (provision/centrality, not representation) |
| POIs per 1,000 residents | How many of this type per resident? | POIs / 1,000 residents | No — a **different construct** (provision/exposure, not representation) |

<Alert status="warning">
  <b>Density and per-capita are not location quotients and must never share an axis, legend, or
  colour scale with the ratio-family methods above.</b> They answer a provision/centrality
  question ("how much commerce is here"), not an offering-advantage question ("is this type
  over-represented here") — plotting them on the same scale as a location quotient invites reading
  a dense, central district as "gentrified" when it may simply be busy
  (<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-domain-signoff.md">OA-D0 domain sign-off, Condition C</a>).
  Per-capita carries a further caveat: its population denominator is <b>itself changed by
  displacement</b> — a rising per-capita figure can mean new businesses arrived, <i>or</i> that
  residents left. A falling per-capita figure is not, by itself, evidence of disinvestment.
</Alert>

<Alert status="warning">
  <b>The binomial z-score borrows the word "significance," and that word is easy to misread here.</b>
  A high <code>|z|</code> means "this over/under-representation is unlikely to be sampling noise
  given the local sample size" — it does <b>not</b> mean "this area is significantly gentrifying,"
  and it is not a hypothesis test with any multiple-comparison correction applied. Because a
  large, well-mapped area can produce a large <code>|z|</code> for an unremarkable ratio purely
  from its bigger sample, while a thinly-mapped area (often a lower-income Kiez — see §6 below)
  produces a smaller <code>|z|</code> even at an equally extreme true ratio, this score must always
  be read <b>alongside</b> its nested-LQ value, never alone
  (<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D3b-zscore-domain-signoff.md">OA-D3b domain sign-off</a>).
</Alert>

### Live: the nine methods, for one Kiez at a time

Pick a district; this reads off the district's currently-highest-gentrification-pressure
neighbourhood (same "spotlight" rule the [area detail page](/berlin/area-detail) uses) and shows
every one of the nine calculation methods for the domain and year you choose — so you can see, for
one real Kiez, exactly how differently the "same" underlying counts read depending which method you
pick.

<Dropdown name="methods_bezirk" title="District (Bezirk)" defaultValue="02">
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

<Dropdown name="methods_domain" title="POI domain" defaultValue="Gastronomy">
  <DropdownOption value="Entertainment" valueLabel="Entertainment"/>
  <DropdownOption value="Gastronomy" valueLabel="Gastronomy"/>
  <DropdownOption value="Mobility" valueLabel="Mobility"/>
  <DropdownOption value="Office" valueLabel="Office"/>
  <DropdownOption value="Other" valueLabel="Other"/>
  <DropdownOption value="Public Service" valueLabel="Public Service"/>
  <DropdownOption value="Public Space" valueLabel="Public Space"/>
  <DropdownOption value="Religion" valueLabel="Religion"/>
  <DropdownOption value="Retail" valueLabel="Retail"/>
  <DropdownOption value="Services" valueLabel="Services"/>
  <DropdownOption value="Sports and Recreation" valueLabel="Sports and Recreation"/>
  <DropdownOption value="Tourism" valueLabel="Tourism"/>
  <DropdownOption value="Vacancy" valueLabel="Vacancy"/>
</Dropdown>

<Dropdown name="methods_year" title="Year" defaultValue="2025">
  <DropdownOption value="2008" valueLabel="2008"/>
  <DropdownOption value="2009" valueLabel="2009"/>
  <DropdownOption value="2010" valueLabel="2010"/>
  <DropdownOption value="2011" valueLabel="2011"/>
  <DropdownOption value="2012" valueLabel="2012"/>
  <DropdownOption value="2013" valueLabel="2013"/>
  <DropdownOption value="2014" valueLabel="2014"/>
  <DropdownOption value="2015" valueLabel="2015"/>
  <DropdownOption value="2016" valueLabel="2016"/>
  <DropdownOption value="2017" valueLabel="2017"/>
  <DropdownOption value="2018" valueLabel="2018"/>
  <DropdownOption value="2019" valueLabel="2019"/>
  <DropdownOption value="2020" valueLabel="2020"/>
  <DropdownOption value="2021" valueLabel="2021"/>
  <DropdownOption value="2022" valueLabel="2022"/>
  <DropdownOption value="2023" valueLabel="2023"/>
  <DropdownOption value="2024" valueLabel="2024"/>
  <DropdownOption value="2025" valueLabel="2025"/>
  <DropdownOption value="2026" valueLabel="2026"/>
</Dropdown>

```sql methods_chosen_area
-- Same spotlight rule as /berlin/area-detail's own `chosen` query: the district's PLR currently
-- showing the strongest gentrification-pressure signal (negative dynamism first, then highest
-- dynamism_index) -- not a methods-mart concept of its own, borrowed verbatim from that page.
select area_code, area_name
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
  and substr(area_code, 1, 2) = '${inputs.methods_bezirk.value}'
order by (dynamism_class_bi = 'negative') desc, dynamism_index desc
limit 1
```

```sql methods_ratio_family
-- Only the three methods genuinely sharing a unit ("ratio, centred on 1" per the §2 table above)
-- share this chart's axis -- log_lq (log-ratio, centred on 0), share_diff (percentage points),
-- raw_share (proportion), zscore_slq (standardized score), density and percapita (absolute,
-- provision-not-representation) are deliberately excluded here (OA-D0 domain sign-off Condition C /
-- OA-D0 geo sign-off C7 never-blend) -- they appear, correctly unit-labelled, in the table below
-- instead, which is not a chart and therefore has no shared-axis risk.
select oa_method, oa_value
from gentriduck_marts.mart_poi_oa_methods
where city_code = 'BER'
  and area_code = '${methods_chosen_area[0].area_code}'
  and poi_domain_h = '${inputs.methods_domain.value}'
  and snapshot_year = ${inputs.methods_year.value}
  and oa_method in ('nested_lq', 'global_lq', 'shrunk_lq')
order by oa_method
```

<BarChart
    data={methods_ratio_family}
    x=oa_method
    y=oa_value
    title="{methods_chosen_area[0].area_name} — ratio-centred methods, {inputs.methods_domain.value}, {inputs.methods_year.value} (1.0 = citywide average)"
    yAxisTitle="Ratio (1.0 = citywide average)"
    emptySet="warn"
    emptyMessage="No data for this district/domain/year combination."
/>

```sql methods_all
-- Method label/unit/family below are copied VERBATIM from this page's own §2 table -- no new
-- label, unit, or interpretive claim is introduced here (R-C2: this table restates, it does not
-- decide). sort_order matches §2's own row order.
select
    meta.method_label,
    meta.unit,
    meta.family,
    m.oa_value,
    meta.golden_note
from gentriduck_marts.mart_poi_oa_methods as m
join (
    values
        ('nested_lq', 'Nested LQ (canonical)', 'ratio, centred on 1', 'Ratio family', 'Yes — the sole 2018-golden-anchored method', 1),
        ('global_lq', 'Global (city-relative) LQ', 'ratio, centred on 1', 'Ratio family', 'No — new instrument', 2),
        ('log_lq', 'Log-LQ', 'log-ratio, centred on 0', 'Ratio family (rescaled)', 'No — a rescaling of the nested LQ', 3),
        ('shrunk_lq', 'Shrunk-LQ (empirical Bayes)', 'ratio, centred on 1 (shrunk)', 'Ratio family', 'No — a small-sample-corrected variant', 4),
        ('share_diff', 'Share-diff (shift-share)', 'percentage points', 'Magnitude family', 'No — new instrument', 5),
        ('raw_share', 'Raw within-group share', 'proportion 0–1', 'Composition family', 'No — pure local composition', 6),
        ('zscore_slq', 'Binomial z-score (SLQ)', 'standardized score, centred on 0', 'Significance family', 'No — a significance reading of the same ratio', 7),
        ('density', 'POI density', 'POIs per km²', 'Absolute family — NOT a location quotient', 'No — a different construct (provision/centrality)', 8),
        ('percapita', 'POIs per 1,000 residents', 'POIs per 1,000 residents', 'Absolute family — NOT a location quotient', 'No — a different construct (provision/exposure)', 9)
) as meta(oa_method, method_label, unit, family, golden_note, sort_order)
    on meta.oa_method = m.oa_method
where m.city_code = 'BER'
  and m.area_code = '${methods_chosen_area[0].area_code}'
  and m.poi_domain_h = '${inputs.methods_domain.value}'
  and m.snapshot_year = ${inputs.methods_year.value}
order by meta.sort_order
```

<DataTable data={methods_all} rows=9 emptySet="warn" emptyMessage="No data for this district/domain/year combination.">
    <Column id=method_label title="Method"/>
    <Column id=unit title="Unit"/>
    <Column id=family title="Family (never mix across families on one axis)"/>
    <Column id=oa_value title="Value" fmt="num2"/>
    <Column id=golden_note title="Is this the 2018 thesis construct?"/>
</DataTable>

<Alert status="warning">
  This table is deliberately a table, not a chart — a shared bar/line axis across families with
  incompatible units (a ratio, a log-ratio, percentage points, a proportion, a standardized score,
  and two absolute counts) would misrepresent every value's real magnitude relative to the others,
  the exact hazard §2's warning above names. The bar chart further up only ever plots the three
  methods that genuinely share a unit ("ratio, centred on 1"). <b>Density and per-capita above are
  point-in-time ("stock") values only</b> — this table does not show a year-over-year change for
  either. OA-D5's study now tests both empirically (§7 below, extended by #285): density passes the
  completeness-contamination gate at the citywide, per-method level; per-capita's result is
  indeterminate (too few years of exact-matched population data to test at all yet). Neither is the
  <b>per-cell</b> completeness-contamination PASS this project's own binding condition (OA-D0 domain
  sign-off Condition C.2) requires before differencing an individual figure — showing an undisclosed
  delta for either would violate the same completeness-contamination discipline this project applies
  everywhere else. <b>This table also does not suppress a thin-data area</b> — unlike the PLR
  Offering Advantage map's own domain-grain mart, `mart_poi_oa_methods` does not carry a min-base
  flag; read a single PLR's figures cautiously, per §2's data-thinness note above, especially where
  the spotlighted Kiez is itself a small area.
</Alert>

## 3. Which mode answers which question

This table is a navigation aid, not a menu to "pick the best one" — every row describes what a
given mode *can* and *cannot* tell you.

| Your question | Method(s) that answer it | Method(s) that cannot |
|---|---|---|
| Is this type over/under-represented here, vs. the city? | Nested LQ; global LQ | raw share, dominance, density |
| Do the 2018 thesis's findings still hold? | **Nested LQ only** (the sole golden-anchored construct) | every other method — new instruments, not the thesis construct |
| Are restaurants or fast-food dominating *within* gastronomy? | Within-group dominance, always read alongside the LQ for direction (§5) | the LQ family alone — it says *whether* over-represented, not the internal mix |
| Did local growth in a type beat the citywide trend? (magnitude-aware, over time) | Share-diff; log-LQ change | nested LQ alone (a ratio hides magnitude) |
| Is this over-representation real, given a thin data base? | Shrunk-LQ; binomial z-score, always paired with the LQ | nested LQ or raw share alone — neither is base-aware |
| How many cafés per resident / per km²? | Density; per-capita | the LQ family — compositional, not absolute |
| Monoculture or a diverse mix, and is that changing? | Within-group dominance (entropy/evenness) | the LQ family — representation, not internal concentration |

## 4. The area hierarchy: PLR → BZR → PGR → Bezirk

Berlin's official small-area codes (the LOR system) nest by construction: an 8-digit Planungsraum
(PLR) code's leading digits literally *are* its coarser parents' codes — 6 digits for
Bezirksregion (BZR), 4 for Prognoseraum (PGR), 2 for Bezirk (borough). Because of this, Offering
Advantage at a coarser scale needs no new geometry — the underlying POI counts are summed up the
code prefix, and the ratio is recomputed from the summed totals
([ADR-0024 D2](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0024-oa-calculation-modes-area-hierarchy-dominance.md)).
Two rules make that roll-up correct, not just convenient — see the
[area hierarchy reference page](/reference/area-hierarchy) for the worked example and the full
detail (Hamburg's non-nesting hierarchy included):

1. **Counts are summed first, and the ratio is formed last — never averaged.** A location quotient
   is not the average of its sub-areas' own quotients (this is Simpson's paradox in miniature); the
   underlying counts are added up the hierarchy, then divided.
2. **The citywide comparison point is the same number at every scale.** It is computed once, from
   the finest level, and reused — never recomputed by re-summing across the four levels at once
   (which would count each business up to four times over).

**Reading scale as a dial, not a ladder of "better."** Coarser scales trade resolution for
stability — a larger POI base per area makes the figure less sensitive to a single new or closed
business, but also erases exactly the kind of within-borough variation (an actively-changing Kiez
sitting inside an otherwise stable district) that is the actual point of small-area monitoring:

<Alert status="warning">
  <b>BZR is this project's recommended public headline scale for anything coarser than a single
  neighbourhood</b> — stabler than PLR, and less individually identifying. <b>PLR remains the Kiez
  succession front</b> — the finest, most theoretically meaningful scale — <b>but is the most
  data-thin and highest-misuse-risk scale</b>: read a single PLR's figure cautiously, especially in
  a thinly-mapped area (§6). <b>Bezirk-level figures are context only, never a Kiez-level claim</b>
  — a borough pools roughly 30–40 very different neighbourhoods into one number; that a borough
  reads as "up-market" or "under-represented" says nothing about any one Kiez inside it. This is
  the same ecological-fallacy discipline the rest of this site applies to Berlin's official
  Status/Dynamik classes (see <a href="/methodology">methodology §6</a>), extended here to Offering
  Advantage
  (<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-domain-signoff.md">OA-D0 domain sign-off, Condition D</a>,
  reaffirmed at the roll-up model itself in the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D2-domain-signoff.md">OA-D2 domain sign-off</a>).
</Alert>

**A real, measured limitation, not a hypothetical one.** The OA-D5 comparison study (§7 below)
found that PLR-vs-BZR rankings for the canonical nested LQ correlate only moderately (pooled
Spearman ρ ≈ 0.66, below the project's own 0.7 stability threshold, in every year 2009–2026) — so
an area's *rank* can genuinely shift between the Kiez and district scale. That is disclosed here as
a real finding about the spatial grain of gentrification signals, not swept under the rug: see §7.

**What's built today:** PLR and BZR are fully queryable (counts, geometry, and choropleth-ready) —
PLR's canonical nested-LQ figure is live on the [POI & Offering Advantage map](/berlin/poi-map)
today. PGR and Bezirk values roll up correctly from the same summed counts, and Bezirk has a real
dissolved polygon (built by combining its constituent PLR shapes, with no new data source). The
live map directly below is what actually surfaces a PGR/Bezirk (and BZR) Offering Advantage figure
on a public map for the first time — see the
[district & area profiles](/berlin/area) pages for the population and typology-stage counts already
live at these coarser scales.

### See this on your area's page

<!--
  #298 (I21-d): this subsection previously hosted a live, dropdown-driven choropleth
  (Area level x POI domain x Year) across all of Berlin's BZR/PGR/Bezirk areas at once. That widget
  has moved to each area's own canonical page, at headline/context-only grain, per
  docs/epic-i/I21-ia-restructure-scoping.md §3/§5.2 -- see
  pages/berlin/area/bezirk/[code].md's header comment for the full relocation rationale and the two
  binding conditions (`maup_caveat_required`, ecological-fallacy/headline-scale framing) carried
  through unchanged. This page keeps the explainer prose above (the roll-up rule, the "dial, not a
  ladder" framing, the §7 rho~=0.66 finding) -- it no longer duplicates the live figure a citywide
  map would show, since every area's own figure is now one click away on that area's own page.
-->

Rather than a second, citywide copy of this figure, **each area's own Offering Advantage roll-up now
lives on that area's own canonical page** — where it belongs, next to that area's demographics,
POI mix, and status trajectory. Every page carries the same `maup_caveat_required` disclosure and
headline/context-only framing described above:

- [District (Bezirk) profiles](/berlin/area/bezirk) — context only, never a Kiez-level claim.
- [Bezirksregion (BZR) profiles](/berlin/area/bzr) — this project's recommended public headline
  scale for anything coarser than a single neighbourhood.
- [Prognoseraum (PGR) profiles](/berlin/area/pgr) — context only, never a Kiez-level claim.
- The canonical nested-LQ figure at Kiez (PLR) grain is already live on the
  [POI & Offering Advantage map](/berlin/poi-map) and on
  [every neighbourhood's own page](/berlin/area).

Pick a district, Bezirksregion, or Prognoseraum above to see its own "Offering Advantage across the
area hierarchy" section — the same figure this page used to show on a single shared map, now shown
one area at a time, in context.

## 5. Within-group dominance: monoculture, or a mix?

A separate question from Offering Advantage entirely: **within a group of businesses, is one type
dominating, or is the mix diverse?** ("Are fast-food places crowding out sit-down restaurants
within gastronomy?") This needs its own model, computed only for a curated set of business groups
where a within-group read is theoretically meaningful — never blended into the LQ, and never
summed into one cross-domain score
([ADR-0024 D3](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0024-oa-calculation-modes-area-hierarchy-dominance.md)).

Four figures, all standard diversity/concentration indices borrowed from ecology and economics for
their math only, not their usual connotation (see the ethics note below):

- **HHI** (Herfindahl-Hirschman Index) — the sum of each type's squared share; higher means more
  concentrated in one type.
- **Top-share** — the largest single type's share of the group.
- **Entropy** — how unpredictable the mix is (higher = more even).
- **Evenness** — entropy normalized for how many types exist in the group, so groups of different
  sizes are comparable.

**Which business groups this covers, and which it deliberately doesn't:**

| Group | In / Out | Why |
|---|---|---|
| Gastronomy (Café / Restaurant / Fast Food) | **In**, category grain | The canonical artisanal / "third-wave" consumption signal (Zukin 2009) |
| Retail (12 categories) | **In**, category grain only | A headline retail-succession indicator (Lees, Slater & Wyly 2008); type grain would fragment too finely to read as a stable mix |
| Entertainment (Bar / Nightlife / Culture / Leisure) | **In**, category grain | Cultural-consumption nightlife economy (Ley 1996) |
| Wellness / fitness (curated cross-domain group: Beauty, Massage, Fitness Center, Martial Arts, Sauna) | **In**, a specifically curated subset | The canonical Lees/Slater/Wyly (2008) wellness signal spans two of this project's domains (Services and Sports and Recreation) — this group pools exactly that subset so the signal isn't half-measured |
| Cuisine-typed Restaurant dominance (Asian, German, Greek, Indian, Italian, Turkish, etc.) | **Computed, internal study only — never shown on this page or any public surface** | See the anti-stigma note below |
| Coworking / "Hipster" spaces | **Out of dominance**, deliberately | A single-type category — a within-group mix measure is mathematically degenerate with only one member; this signal is still tracked, just via its own Offering Advantage figure, not dominance |
| Vacancy / Leerstand | **Out** | Also a single category — its signal is the domain-level Offering Advantage and its change over time, already covered elsewhere on this site |
| Mobility, Public Service, Religion, Office, Public Space | **Out** | Incumbent-serving infrastructure with no succession signal — a concentration of bus stops or churches says nothing about gentrification |
| Tourism | **Out of the gentrification-dominance model** | Concentration here measures *touristification*, a related but analytically distinct process from classic invasion-succession gentrification |

<Alert status="warning">
  <b>Dominance is sign-blind, and that is its central hazard.</b> A number describing "this group is
  a monoculture" cannot, by itself, say whether that's an up-market or down-market monoculture.
  Boutique-ification (an up-market shift, Zukin 2009) and disinvestment (a down-market shift toward
  a rent-gap trough, Smith 1979) — or studentification — can produce an <b>identical</b> HHI/top-share
  reading. This project therefore never shows a bare dominance figure: every figure is paired with
  the leading type's own name and its tier on the same causal-relevance ladder the Offering
  Advantage curation already uses, and should be read alongside an area's status/dynamism trajectory,
  never in isolation
  (<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-domain-signoff.md">OA-D0 domain sign-off, Condition B.2</a>).
</Alert>

<Alert status="warning">
  <b>Not an antitrust or market-health reading.</b> HHI's name comes from competition economics, but
  nothing here says anything about market power, business viability, or economic "health" — these
  are used purely as descriptive diversity indices of what's on offer, borrowed for the math, not
  the usual connotation
  (<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-domain-signoff.md">OA-D0 domain sign-off, Condition B.1</a>).
</Alert>

<Alert status="warning">
  <b>Cuisine-typed dominance is barred from any public, displacement-adjacent surface — including
  this page.</b> The Restaurant taxonomy is cuisine/nationality-coded (Turkish, Greek, Asian,
  Indian, Italian, and so on). A dominance figure computed at that grain literally measures the
  concentration of a cuisine or national origin, and "monoculture"/"dominance" language attached to
  it is a concrete vector for ethnic stigmatization — for example, a high concentration of a
  particular cuisine being misread as coded disinvestment or an anti-immigrant framing. This
  project computes that figure only for internal methodological study, never for publication;
  the public cut of Gastronomy dominance stops at the category level (Café / Restaurant / Fast
  Food — not nationality-coded)
  (<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-domain-signoff.md">OA-D0 domain sign-off, Condition B.3</a>,
  confirmed technically enforced — not just documented — by the
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D4-domain-signoff.md">OA-D4 domain sign-off</a>).
  These figures describe <b>form composition on a cultural/price ladder</b> (Imbiss/fast-food →
  sit-down → café/specialty-coffee) — never the cultural or national origin of proprietors,
  cuisine, or clientele. <b>The live table below enforces this the same way</b>: its group dropdown
  only ever lists the four public-safe groups (never the cuisine-typed group), and its query filters
  <code>is_public_safe = true</code> explicitly, on top of the source-layer filter described in the
  note above the table.
</Alert>

<Alert status="info">
  <b>Descriptive, not causal — and never a targeting signal.</b> Dominance tracks composition; it
  does not predict displacement and must never be read as an "up-and-coming Kiez" signal to act on.
  Because a concentration index over very few businesses is noisy (two cafés out of two businesses
  reads as a "monoculture" purely from a tiny sample), a stricter minimum-base threshold than
  Offering Advantage's own applies here, and a thin cell is suppressed the same way a thin OA cell
  is — meaning "too thinly observed to characterize," never "commercially dead"
  (<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-domain-signoff.md">OA-D0 domain sign-off, Condition B.4</a>).
</Alert>

### See this on your area's page

<!--
  #298 (I21-d): this subsection previously hosted a live, citywide top-15 dominance ranking
  (Business group x Year, across all Berlin PLRs at once). That widget has moved to each area's own
  canonical page (PLR, Bezirk, Bezirksregion, Prognoseraum, and Ortsteil), per
  docs/epic-i/I21-ia-restructure-scoping.md §3/§5.3 -- see pages/berlin/area/bezirk/[code].md's
  header comment for the full relocation rationale. mart_poi_dominance is PLR-grain only (no
  district/BZR/PGR-level dominance figure exists), so the coarser-grain pages show a
  "within-group dominance across neighbourhoods here" table (this area's own constituent PLRs'
  already-computed rows, filtered -- not a new district-level statistic), while the PLR page shows
  that one neighbourhood's own figures directly. The `is_public_safe = true` filter and the
  is_thin_base suppression-with-disclosure discipline travel unchanged onto every relocated
  instance -- this page's own defence-in-depth restatement is no longer needed here since the live
  query itself has moved, but the SOURCE-layer filter
  (web/sources/gentriduck_marts/mart_poi_dominance.sql) still guarantees the cuisine-typed group
  never reaches any page's client bundle, this one included.
-->

Rather than a second, citywide copy of this ranking, **within-group dominance now lives on each
area's own canonical page** — where it can be read alongside that area's own status/dynamism
trajectory, per the sign-blindness warning above. Every relocated table keeps the same binding
conditions: public-safe groups only (the cuisine-typed group is barred from every public page, this
one included), sign-blind co-presentation of the leading type, and suppressed-but-disclosed thin
cells:

- [Neighbourhood (PLR) profiles](/berlin/area) — this area's own dominance figures, across all four
  public-safe groups.
- [District (Bezirk)](/berlin/area/bezirk), [Bezirksregion (BZR)](/berlin/area/bzr), and
  [Prognoseraum (PGR)](/berlin/area/pgr) profiles — a ranked table of this area's own constituent
  neighbourhoods (no district/BZR/PGR-level dominance figure exists to show instead — see the note
  above).
- [Ortsteil profiles](/berlin/area/ortsteil) — the same ranked table, joined through the
  dominant-overlap crosswalk (see the [area-hierarchy reference](/reference/area-hierarchy)).

Pick any area above to see its own "Within-group dominance" section.

## 6. What this does NOT do

- **It does not add a new predictor to the governed index.** Every method, scale, and dominance
  figure on this page is a *disclosure/study layer* — the [governed index](/methodology) still uses
  exactly the same faithful nested-LQ Offering Advantage input it always has (§2/§3 of that page);
  nothing here changes an index weight, a normalization, or an indicator definition.
- **It does not predict which neighbourhood will gentrify next.** Every figure here is descriptive
  of the current or historical commercial mix — none of it is validated as, or intended to be used
  as, a forward-looking targeting tool.
- **It does not say anything about any individual business, household, or building.** Every number
  is a small-area aggregate, same ecological-fallacy discipline as the rest of this site
  (see [methodology §6](/methodology)).
- **It does not treat "more methods" as "more proof."** Only the canonical nested LQ is validated
  against the 2018 thesis's own golden results. The other eight methods are new instruments,
  validated by internal consistency and robustness checks (§7), never by agreement with 2018 —
  implementing nine methods is not the same claim as nine methods confirming the thesis
  ([OA-D0 geo sign-off](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-geo-signoff.md), call-out 3).
- **It does not re-score the governed index at PGR/Bezirk grain, even though a live figure now
  exists at those scales (on each area's own page, §4 above).** That figure surfaces the same
  already-signed-off nested-LQ Offering Advantage figure, summed up the LOR code prefix — not a
  re-derived or re-weighted statistic. See [methodology §6](/methodology) for why the governed index
  itself is never recomputed at any coarser-than-PLR grain.
- **It does not show a live temporal (year-over-year) view of density or per-capita.** Neither
  method has a per-cell completeness-contamination safety check built yet (§2's "Live" note above)
  — showing a delta without one would risk reading an OSM-coverage-growth artefact as a real change.
  #285 extended OA-D5's gate to test both methods at the citywide, per-method level (§7): density
  passes it, per-capita's result is indeterminate for now (a data-coverage gap, not a failure) — a
  supportive signal for a future per-cell-badged view, not a substitute for one.

## 7. What the comparison study found (OA-D5, extended by #285)

A dedicated comparison study
([full findings](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D5-mode-comparison-findings.md))
originally ran the seven relative-family calculation methods against each other and against known
robustness checks; a 2026-07 extension (#285) added `density` and `per-capita` to the cross-mode
correlation and completeness-contamination deliverables — the two remaining methods added to the
mart after the original study ran. The headline results, restated here as static findings, not a
live query:

- **The seven relative-family methods genuinely diverge, and that divergence is informative, not
  noise.** At the category level, nested LQ and raw within-group share correlate at only ρ ≈ 0.35
  (Spearman) — they really do answer different questions about the same underlying data, exactly as
  intended.
- **Log-LQ is a perfect rank-preserving rescaling of nested LQ** (ρ = 1.000 at every taxonomy
  level, as expected of a monotonic transform) — a check on the arithmetic, not a separate finding.
- **Density and per-capita correlate weakly-to-moderately with the relative-LQ family — for
  information only, never as a shared-scale claim.** Pooled Spearman rho between density/per-capita
  and the seven relative methods ranges from near-zero to ≈0.3 depending on taxonomy level, and
  density and per-capita correlate with *each other* at ρ ≈ 0.7–0.8 (unsurprising — both are driven
  by the same local POI count numerator). None of this is a validation of one construct against the
  other: a dense, populous area can simply happen to also have a typical location quotient, a
  coincidence of geography, not agreement between "how over-represented" and "how much commerce."
  This is exactly why §2's warning above bars ever plotting them on a shared axis or colour scale —
  a weak correlation here would otherwise tempt a reader to assume the two questions overlap more
  than they do.
- **The completeness-contamination gate mostly passed, including — surprisingly — density.** Six of
  the seven relative-family methods (including the canonical nested LQ) plus density showed no
  meaningful correlation between their year-over-year change and citywide OSM coverage growth (|ρ|
  stayed well under the 0.3 gate threshold in every tested case) — meaning a change in these figures
  over time is unlikely to just be "OpenStreetMap got more complete." Density's pass **contradicts**
  its own pre-registered "expected to fail" prediction, the same class of surprise raw share and
  the binomial z-score already produced in the original run — disclosed here as a genuine result the
  data did not confirm, not smoothed over. **This citywide pass does not, by itself, authorize a live
  year-over-year density figure on this page**: OA-D0 domain sign-off Condition C.2 requires the gate
  to PASS *for that cell* (per-area, per-year), a stricter bar than the citywide aggregate #285 tested
  — see §6's "does not" list above.
- **Per-capita's gate result is indeterminate, not failing — too little data to test yet, not a
  finding either way.** Berlin's exact-year population join currently has only one usable
  year-over-year transition (2024→2025), so the correlation this test needs is mathematically
  undefined, not merely untested. A future EWR ingestion covering the 2021–2023 reference-year gap
  would let this run properly. **This data-coverage gap is a separate barrier from, and does not
  resolve, the denominator-endogeneity caveat in §2 above** — even with more years of data, a
  per-capita change over time would still conflate "commerce changed" with "who lives here changed,"
  which is why per-capita would need both an eventual gate PASS *and* that caveat addressed before
  any live delta view.
- **The area-hierarchy roll-up is only proven for the canonical nested LQ so far.** The other eight
  methods — including density/per-capita — have never been rolled up through the PLR→BZR→PGR→Bezirk
  hierarchy — extending that roll-up to every method is explicitly out of this study's scope, not a
  silent gap. (The live figure now on each Bezirk/BZR/PGR page, §4 above, surfaces exactly the one
  method this roll-up IS proven for — nested LQ — never any of the other eight at coarse grain.)
- **Only nested LQ is validated against the 2018 thesis's own results** (ρ = 0.148, p = 0.002,
  n = 435 — the same directional-but-modest result already reported on the
  [thesis re-check page](/thesis-recheck)). The other eight methods, including density/per-capita,
  have no 2018 precedent to validate against by design — see §2 above.
- **Getis-Ord Gi\* remains unavailable, verified directly against the seed registry.**
  `seed_oa_calculation_methods.csv` has no `getis_ord` row yet — #285 checked this directly rather
  than assuming it, per the maintainer's own "gated on that slice existing" framing. Its ADR
  ([ADR-0025](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0025-getis-ord-gistar-esda-mart-handoff.md))
  remains status Proposed; adding a Getis-Ord comparison here is left to a future
  method-registration ticket once that ADR is accepted and the underlying mart exists.

## 8. Honest caveats

- **This page is a decoder, not a new finding.** Every methodology claim above restates an
  already-signed-off document (linked inline); nothing here is a new statistical result — including
  the live nine-methods table, which surfaces already-governed values, not new computations, and the
  OA-across-scales/within-group-dominance figures now relocated onto each area's own page (#298,
  I21-d), which are the same relocation, not a new computation either.
- **The live/relocated sections have their own, narrower scope than the full nine-method/four-scale/
  five-group space this page describes.** Concretely: the §2 methods table (still live on this page)
  is domain-grain only (no category/type drill-down); the OA-across-scales figure (now on each
  Bezirk/BZR/PGR page) covers only the canonical nested LQ (not the other eight methods) — PLR's own
  figure is already live on [the POI map](/berlin/poi-map) and on
  [every neighbourhood's own page](/berlin/area); the dominance tables (now on each area's own page)
  cover only the four public-safe groups, never the cuisine-typed group; and density/per-capita are
  shown as point-in-time values only, never a year-over-year delta. Each narrowing is explained at
  the point it applies, above.
- **Nine methods does not mean nine confirmations.** Only the canonical nested location quotient is
  backtested against the 2018 thesis; treat every other method as a new, unvalidated-against-2018
  instrument (§2, §7).
- **Getis-Ord hotspot clustering is not part of this page.** The maintainer's confirmed scope for
  this cluster included a spatial hotspot method (Getis-Ord Gi*), but it needs a new statistical
  tooling adoption this project hasn't yet accepted
  ([ADR-0025](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0025-getis-ord-gistar-esda-mart-handoff.md),
  status: proposed) — it is held out of the build, and therefore out of this page, until that ADR is
  accepted and its own methodology re-clears the R-C1 gate. #285 re-verified this directly against
  `seed_oa_calculation_methods.csv` (no `getis_ord` row exists) rather than assuming the gap.
- **Density and per-capita are the highest-risk figures on this page**, precisely because they
  look the most like ordinary statistics to a lay reader while answering a different question than
  Offering Advantage (§2). Read their caveats above before drawing any conclusion from either. #285
  rank-correlated both against the relative-LQ family for information (§7) — that correlation is
  never a licence to plot them on the same axis or colour scale (§2's warning), and a passing
  completeness-contamination result for density (§7) is a citywide signal, not a per-cell PASS —
  it does not, on its own, authorize a live delta view.
- **PLR-scale figures remain this project's most misuse-prone display**, for the same small-sample
  reason the base index already flags (see [methodology §6](/methodology)) — a single new or closed
  business can swing a PLR's ratio disproportionately. The live nine-methods table above does not
  suppress a thin PLR (§2's own note) — read it alongside this caveat.

## 9. Further reading

- [ADR-0024](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0024-oa-calculation-modes-area-hierarchy-dominance.md) — the governing decision record for every method, scale, and the dominance model on this page.
- [OA-D0 geo-data-scientist sign-off](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-geo-signoff.md) and [OA-D0 domain-expert sign-off](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-domain-signoff.md) — the full R-C1 gate this page's claims are grounded in.
- [OA-D3b z-score domain sign-off](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D3b-zscore-domain-signoff.md) and [OA-D4 dominance domain sign-off](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D4-domain-signoff.md) — the specific binding conditions this page discharges.
- [OA-D5 comparison-study findings](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D5-mode-comparison-findings.md) — the full cross-mode statistics summarized in §7.
- [docs/planning/oa-modes-hierarchy-dominance.md](https://github.com/dhelweg/gentriduck/blob/main/docs/planning/oa-modes-hierarchy-dominance.md) — the scoping doc this whole cluster discharges, including the original method survey and pros/cons table.
- [The area-hierarchy reference](/reference/area-hierarchy) and [the POI-taxonomy reference](/reference/poi-taxonomy) — full drill-downs on the two hierarchies this page's §4/§5 summarize.
- [ADR-0017](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md) and [ADR-0018](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md) — the base Offering Advantage construct and its curated/faithful split, which this page extends rather than replaces.
- [Methodology & data sources](/methodology) — the governed index this page's methods feed into (unchanged by anything here) and its own honest limitations.
- [POI & Offering Advantage map](/berlin/poi-map) — the canonical nested-LQ method at PLR grain, live since before this page existed.
- [District (Bezirk)](/berlin/area/bezirk), [Bezirksregion (BZR)](/berlin/area/bzr),
  [Prognoseraum (PGR)](/berlin/area/pgr), [Ortsteil](/berlin/area/ortsteil), and
  [neighbourhood (PLR)](/berlin/area) profiles — where the §4/§5 "see this on your area's page"
  links above lead (#298, I21-d).

---

<FooterNav />
