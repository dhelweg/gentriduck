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

  The four carried-forward pass-2 conditions and how each is discharged (see the "Live:" subsections
  under §2/§4/§5 below for the mechanism in each case):
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
     all, not merely a page-level WHERE a future page could omit. This page's own dominance query
     additionally restates the filter (defence in depth) and its dropdown never lists the cuisine
     group as an option in the first place.
  3. Coarse-level (BZR/PGR/Bezirk) choropleths must carry the ecological-fallacy + MAUP-instability
     (PLR-vs-BZR rho~=0.66) caveat inline: the §4 "Live" map surfaces `maup_caveat_required` and
     `area_level_publish_tier` (both already computed by the OA-D6 mart) as an always-visible Alert,
     not a hover-only tooltip, and repeats the rho~=0.66 figure verbatim from §4's static text above.
  4. Min-base suppression must render as "too thinly observed to characterize," never absence: the
     §4 map nulls out `oa_domain` (unshaded gap, same convention `/berlin/poi-map` already uses) when
     `oa_domain_min_base_flag` is set, and the §5 dominance table filters `not is_thin_base` while
     disclosing the suppressed count rather than silently dropping rows.

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
  script's own header already documents and guards against for PLR).

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

<script>
  // OA-D7 pass 2: basePath-aware asset/link URLs, same reason + mechanism as
  // /berlin/poi-map's and /berlin/maps' own <script> header comments -- AreaMap's geoJsonUrl fetch
  // and its raw `window.location.href` link click-through neither prepend SvelteKit's deployment
  // basePath, so `${base}` must be interpolated directly into both.
  import { base } from '$app/paths';
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
  <b>Pass 2 of 2 — live data is now wired.</b> Every "Live" subsection below queries the actual OA
  marts (<code>mart_poi_oa_methods</code>, <code>mart_poi_oa_arealevel</code>,
  <code>mart_poi_dominance</code>) rather than restating a static figure. What's <b>still not</b>
  live here: a PLR-grain choropleth for the eight non-canonical methods (the canonical nested-LQ PLR
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

### Live: Offering Advantage across area scales (BZR · PGR · Bezirk)

<Dropdown name="scale_domain" title="POI domain" defaultValue="Gastronomy">
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

<Dropdown name="scale_year" title="Year" defaultValue="2025">
  <DropdownOption value="2021" valueLabel="2021"/>
  <DropdownOption value="2022" valueLabel="2022"/>
  <DropdownOption value="2023" valueLabel="2023"/>
  <DropdownOption value="2024" valueLabel="2024"/>
  <DropdownOption value="2025" valueLabel="2025"/>
  <DropdownOption value="2026" valueLabel="2026"/>
</Dropdown>

<!-- Year list starts at 2021, not 2008: the roll-up mart only carries `area_vintage = 'lor_2021'`
     rows (the vintage matching the exported bzr/pgr/bezirk geometry below) -- pre-2021 years used
     Berlin's old LOR boundaries, a different area-code scheme entirely (see the area-hierarchy
     reference page's "Bezirk polygon is derived" caveat and #149's PLR precedent for the same
     vintage-mismatch class of bug). -->

<ButtonGroup name="scale_level" title="Area level" display="tabs" defaultValue="bzr">
  <ButtonGroupItem value="bzr" valueLabel="Bezirksregion (BZR) — recommended headline scale"/>
  <ButtonGroupItem value="pgr" valueLabel="Prognoseraum (PGR) — context only"/>
  <ButtonGroupItem value="bezirk" valueLabel="Bezirk (borough) — context only, never a Kiez claim"/>
</ButtonGroup>

<Alert status="warning">
  <b>Every level on this map is coarser than the Kiez (PLR) scale — read every figure below through
  the "dial, not a ladder" framing above.</b> PLR-vs-BZR rankings for the canonical nested LQ
  correlate only moderately (pooled Spearman ρ ≈ 0.66, below this project's own 0.7 stability
  threshold, in every year 2009–2026) — an area's apparent rank can genuinely shift between the Kiez
  and district scale (§7). <b>Bezirksregion (BZR) is this project's recommended public headline
  scale</b> for anything coarser than a single neighbourhood. <b>Prognoseraum (PGR) and Bezirk are
  context only, never a Kiez-level claim</b> — a Bezirk alone pools roughly 30–40 very different
  neighbourhoods into one number. Blank areas below are <b>too thinly observed to compute a stable
  ratio</b>, per the min-base rule already applied on the PLR map — never read a blank cell as
  "commercially dead." In practice this rarely triggers at BZR/PGR/Bezirk grain (unlike PLR): these
  coarser levels pool far more POIs per area, so the min-base threshold is seldom crossed here —
  which is exactly the "coarser = more stable" trade-off §4 describes, not a sign the suppression
  rule was skipped.
</Alert>

```sql scale_map_data
with
    base as (
        select
            area_code,
            case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
            oa_domain_min_base_flag,
            area_level_publish_tier,
            maup_caveat_required
        from gentriduck_marts.mart_poi_oa_arealevel
        where area_level = '${inputs.scale_level.value}'
          and poi_domain_h = '${inputs.scale_domain.value}'
          and snapshot_year = ${inputs.scale_year.value}
    ),
    bezirk_names as (
        -- Fixed 12-entry Bezirk-code -> name lookup, the same one hardcoded across the site (e.g.
        -- /berlin/area-detail's Dropdown, /berlin/area/bezirk/[code].md) -- dim_area_geometry
        -- carries no area_name for area_level='bezirk' rows (its dissolved-polygon derivation never
        -- populated one), so this is presentation-only, not a new source of truth.
        select '01' as bezirk_code, 'Mitte' as bezirk_name
        union all select '02', 'Friedrichshain-Kreuzberg'
        union all select '03', 'Pankow'
        union all select '04', 'Charlottenburg-Wilmersdorf'
        union all select '05', 'Spandau'
        union all select '06', 'Steglitz-Zehlendorf'
        union all select '07', 'Tempelhof-Schöneberg'
        union all select '08', 'Neukölln'
        union all select '09', 'Treptow-Köpenick'
        union all select '10', 'Marzahn-Hellersdorf'
        union all select '11', 'Lichtenberg'
        union all select '12', 'Reinickendorf'
    ),
    names as (
        select
            g.area_code,
            coalesce(g.area_name, b.bezirk_name, g.area_code) as area_name
        from gentriduck_marts.dim_area_geometry as g
        left join bezirk_names as b on g.area_code = b.bezirk_code
        where g.city_code = 'BER'
          and g.area_level = '${inputs.scale_level.value}'
          and g.area_vintage = 'lor_2021'
    )
select
    base.area_code,
    n.area_name,
    base.oa_domain,
    base.oa_domain_min_base_flag,
    base.area_level_publish_tier,
    base.maup_caveat_required,
    -- basePath-aware click-through to the matching coarse-area profile page (already live, I18) --
    -- same `${base}` interpolation /berlin/poi-map's own AreaMap link column uses.
    '${base}/berlin/area/' || '${inputs.scale_level.value}' || '/' || base.area_code as link
from base
left join names as n on base.area_code = n.area_code
```

<AreaMap
    data={scale_map_data}
    geoJsonUrl={`${base}/geo/${inputs.scale_level.value}_lor2021.geojson`}
    geoId="area_code"
    areaCol="area_code"
    value="oa_domain"
    legendType="scalar"
    title="Berlin {inputs.scale_level.value === 'bzr' ? 'Bezirksregion (BZR)' : inputs.scale_level.value === 'pgr' ? 'Prognoseraum (PGR)' : 'Bezirk'} — Offering Advantage (nested LQ), {inputs.scale_domain.value}, {inputs.scale_year.value}"
    startingLat={52.52}
    startingLong={13.405}
    startingZoom={9}
    link="link"
    tooltip={[
      { id: 'area_name', showColumnName: false, valueClass: 'font-bold text-sm', fmt: 'id' },
      { id: 'oa_domain', title: 'Offering Advantage (1.0 = citywide average)', fmt: 'num2' },
      { id: 'area_level_publish_tier', title: 'Publish tier' },
      { id: 'area_code', title: 'Area code', valueClass: 'text-xs opacity-60', fmt: 'id' }
    ]}
    emptySet="warn"
    emptyMessage="No data for this level/domain/year combination."
/>

Click an area on the map to open its district/PGR/Bezirk profile page (population and
typology-stage counts). This choropleth shows only the canonical nested-LQ method — for the other
eight calculation methods at this Kiez, use the single-area table above; a coarse-grain re-scoring
of those eight is out of this pass's scope (§2's data-thinness caveat above still applies at PLR,
even though it rarely applies at BZR/PGR/Bezirk).

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

### Live: within-group dominance — public-safe groups only

<Dropdown name="dom_group" title="Business group" defaultValue="gastronomy_category">
  <DropdownOption value="gastronomy_category" valueLabel="Gastronomy (Café / Restaurant / Fast Food)"/>
  <DropdownOption value="retail_category" valueLabel="Retail (12 categories)"/>
  <DropdownOption value="entertainment_category" valueLabel="Entertainment (Bar / Nightlife / Culture / Leisure)"/>
  <DropdownOption value="wellness_curated" valueLabel="Wellness / fitness (curated cross-domain group)"/>
</Dropdown>

<!-- The cuisine-typed group (is_public_safe=false) is NEVER an option here, by construction, on top
     of the source-layer + query-layer filters below -- see the "Cuisine-typed dominance" alert above. -->

<Dropdown name="dom_year" title="Year" defaultValue="2025">
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

```sql dom_suppressed_count
-- Disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4): how many of this
-- group/year's PLRs were suppressed as too thinly observed, alongside how many are shown below.
select
    count(*) filter (where is_thin_base) as n_suppressed,
    count(*) filter (where not is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance
where city_code = 'BER'
  and is_public_safe = true
  and dominance_group = '${inputs.dom_group.value}'
  and snapshot_year = ${inputs.dom_year.value}
```

<Alert status="info">
  <b>{dom_suppressed_count[0].n_suppressed} of {dom_suppressed_count[0].n_suppressed + dom_suppressed_count[0].n_shown} Planungsräume for this group/year are suppressed below as too thinly observed to characterize</b> (dominance's own stricter min-base rule, §5's info note above) — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix." The table below shows only the top 15 non-suppressed areas, ranked by concentration (HHI).
</Alert>

```sql dominance_top
with
    base as (
        select
            area_code,
            hhi,
            top_share,
            entropy,
            evenness,
            top_child,
            top_child_offering_tier,
            n_children,
            group_stock_local
        from gentriduck_marts.mart_poi_dominance
        where city_code = 'BER'
          -- Defence-in-depth restatement of the source-layer filter (see
          -- web/sources/gentriduck_marts/mart_poi_dominance.sql's header) -- this is the
          -- binding OA-D4 forward condition, applied a second time at the point of use.
          and is_public_safe = true
          and dominance_group = '${inputs.dom_group.value}'
          and snapshot_year = ${inputs.dom_year.value}
          and not is_thin_base
    ),
    names as (
        select distinct area_code, area_name
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
    )
select
    b.area_code,
    n.area_name,
    b.hhi,
    b.top_share,
    b.entropy,
    b.evenness,
    b.top_child,
    -- Tier labels copied verbatim from ADR-0018 / seed_poi_offering_relevance.csv's own
    -- offering_tier definition (0=drop/not causally plausible, 1=low weight/ambiguous,
    -- 2=medium weight/plausible, 3=full weight/headline literature signature) -- no new
    -- interpretive claim, a direct restatement of the already-governed tier vocabulary.
    case b.top_child_offering_tier
        when 3 then 'Tier 3 — headline literature signature'
        when 2 then 'Tier 2 — plausible, medium weight'
        when 1 then 'Tier 1 — ambiguous, low weight'
        when 0 then 'Tier 0 — not a causally plausible signal'
        else 'Not tiered'
    end as top_child_tier_label,
    b.n_children,
    b.group_stock_local,
    '${base}/berlin/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
order by b.hhi desc
limit 15
```

<DataTable data={dominance_top} rows=15 rowShading=true link=link emptySet="warn" emptyMessage="No non-suppressed areas for this group/year.">
    <Column id=area_name title="Neighbourhood (PLR)"/>
    <Column id=hhi title="HHI (higher = more concentrated)" fmt="num2"/>
    <Column id=top_share title="Top-share" fmt="pct1"/>
    <Column id=top_child title="Leading type"/>
    <Column id=top_child_tier_label title="Leading type's causal-relevance tier"/>
    <Column id=n_children title="Types in this group here"/>
    <Column id=group_stock_local title="Group's total POI count here" fmt="num0"/>
</DataTable>

A high HHI/top-share here says only that this group's mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal (the
sign-blindness warning above). Compare the leading neighbourhoods against their own status/dynamism
trajectory on the [maps page](/berlin/maps) or [area detail](/berlin/area-detail) before drawing
any conclusion.

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
- **It does not re-score the governed index at PGR/Bezirk grain, even though a live choropleth now
  exists at those scales.** The §4 map above surfaces the same already-signed-off nested-LQ
  Offering Advantage figure, summed up the LOR code prefix — not a re-derived or re-weighted
  statistic. See [methodology §6](/methodology) for why the governed index itself is never
  recomputed at any coarser-than-PLR grain.
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
  silent gap. (The §4 live choropleth above surfaces exactly the one method this roll-up IS proven
  for — nested LQ — never any of the other eight at coarse grain.)
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
  the live charts/tables, which surface already-governed values, not new computations.
- **The live sections have their own, narrower scope than the full nine-method/four-scale/five-group
  space this page describes.** Concretely: the methods table is domain-grain only (no category/type
  drill-down); the area-scale map covers BZR/PGR/Bezirk only (PLR is already live on
  [the POI map](/berlin/poi-map)) and only the canonical nested LQ (not the other eight methods);
  the dominance table covers only the four public-safe groups, never the cuisine-typed group; and
  density/per-capita are shown as point-in-time values only, never a year-over-year delta. Each
  narrowing is explained at the point it applies, above.
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
- [Area detail](/berlin/area-detail) and [district & area profiles](/berlin/area) — where the "Live" sections' click-throughs above lead.

---

<FooterNav />
