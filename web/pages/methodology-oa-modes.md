---
title: Offering Advantage — modes, scales & dominance
sidebar_position: 21
---

<!--
  OA-D7 (#240, ADR-0024), PASS 1 of 2 (web-only; data-backed pass 2 follows once the site is wired
  to query mart_poi_oa_methods / mart_poi_oa_arealevel / mart_poi_dominance live). This page is the
  "dedicated methodology page" the #240 epic scopes: it restates, in plain language, the already
  gated OA-D0…D6 build (ADR-0024, both R-C1 sign-offs PASS WITH CONDITIONS) -- it introduces no new
  indicator, weight, method, or data source of its own. Where this page states a methodology claim,
  the source is cited inline (R-C2) -- primarily `docs/adr/0024-oa-calculation-modes-area-hierarchy-
  dominance.md`, `docs/methodology/OA-D0-geo-signoff.md`, `docs/methodology/OA-D0-domain-signoff.md`,
  `docs/methodology/OA-D4-domain-signoff.md`, `docs/methodology/OA-D5-mode-comparison-findings.md`,
  and `docs/planning/oa-modes-hierarchy-dominance.md`.

  Binding forward conditions this page discharges (carried from earlier sign-offs, per each doc's own
  "carried onto D7" language):
  - OA-D0 domain sign-off Condition B.2/B.3/B.4 + OA-D4 domain sign-off's closing note: restate
    dominance sign-blindness, the anti-stigma/cuisine-typed-dominance bar, and the Hipster/Vacancy
    documented-absence in public copy (see "Within-group dominance" section below).
  - OA-D0 domain sign-off Condition D + OA-D2 domain sign-off point 2: restate the
    resolution-vs-stability / ecological-fallacy framing at coarse area levels (BZR = headline,
    Bezirk = context-only) before any coarse-level figure is shown (see "The area hierarchy"
    section).
  - OA-D0 domain sign-off Condition C + OA-D3b domain sign-off: label density/per-capita/z-score by
    the exact question they answer, never share an axis/legend with the LQ family, and never present
    "significance" as a gentrification-importance claim (see "The nine calculation methods" and
    "Which mode answers which question" sections).
  - OA-D0 domain sign-off Guardrail E: state explicitly that nested-LQ alone is the 2018 thesis
    construct; every other mode is a new instrument (see "Which mode answers which question").

  Pass-1 scope (per the OA-D7 ticket description): page structure, narrative, the plain-language
  method/scale/dominance vocabulary, and the interpretation-by-question guide -- grounded in the
  already-signed-off docs and in the empirical OA-D5 comparison-study findings (which are themselves
  a static, already-generated markdown report, not a live query -- restated here as text/tables, same
  treatment /methodology §7 already gives other findings docs). NO live dbt/DuckDB query or chart is
  wired on this page (that is explicitly deferred to pass 2, once a consumer is confirmed against the
  is_public_safe / MAUP-disclosure / min-base-suppression conditions below). See "Honest caveats" and
  the closing note under "Where next" for the full list of what pass 2 will add.
-->

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
  <b>Pass 1 of 2.</b> This page is currently narrative and reference only — the plain-language
  vocabulary, the interpretation guide, and the already-computed OA-D5 comparison-study findings,
  restated as static text and tables. It does not yet carry a live, queryable chart of these nine
  methods, four area levels, or the dominance mart — that data-backed second pass is tracked as
  the remainder of OA-D7 and will only wire a consumer once each binding disclosure below (the
  <code>is_public_safe</code> filter, the MAUP/ecological-fallacy caveats, the min-base
  suppression) is actually applied at the point of publication, not just documented here.
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

**What's built today, and what isn't yet:** PLR and BZR are fully queryable (counts, geometry, and
choropleth-ready). PGR and Bezirk values roll up correctly from the same summed counts, and Bezirk
now has a real dissolved polygon (built by combining its constituent PLR shapes, with no new data
source). This page's second pass is what will actually surface a PGR/Bezirk Offering Advantage
figure on a public map — see the
[district & area profiles](/berlin/area) pages for what's already live at these coarser scales
today (population and typology-stage counts, not yet a re-scored OA figure).

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
  cuisine, or clientele.
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
- **It does not currently offer a re-scored Offering Advantage choropleth at PGR/Bezirk grain on a
  public map** — that wiring is explicitly pass 2 of this page, gated on the disclosures above
  actually being applied at the point of publication, not just documented here.

## 7. What the comparison study found (OA-D5)

A dedicated comparison study
([full findings](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D5-mode-comparison-findings.md))
already ran the seven core calculation methods (excluding density/per-capita, which were added
after the study ran) against each other and against known robustness checks. The headline results,
restated here as static findings, not a live query:

- **The methods genuinely diverge, and that divergence is informative, not noise.** At the
  category level, nested LQ and raw within-group share correlate at only ρ ≈ 0.35 (Spearman) — they
  really do answer different questions about the same underlying data, exactly as intended.
- **Log-LQ is a perfect rank-preserving rescaling of nested LQ** (ρ = 1.000 at every taxonomy
  level, as expected of a monotonic transform) — a check on the arithmetic, not a separate finding.
- **The completeness-contamination gate mostly passed.** Five of seven methods (including the
  canonical nested LQ) showed no meaningful correlation between their year-over-year change and
  citywide OSM coverage growth (|ρ| < 0.06 in every case) — meaning a change in these figures over
  time is very unlikely to just be "OpenStreetMap got more complete." Two methods that were
  *expected* to fail this check (raw share, binomial z-score) did not fail it empirically either —
  disclosed here as a genuine, pre-registered prediction that the data did not confirm, not
  smoothed over.
- **The area-hierarchy roll-up is only proven for the canonical nested LQ so far.** The other eight
  methods have never been rolled up through the PLR→BZR→PGR→Bezirk hierarchy — extending that
  roll-up to every method is explicitly out of this study's scope, not a silent gap.
- **Only nested LQ is validated against the 2018 thesis's own results** (ρ = 0.148, p = 0.002,
  n = 435 — the same directional-but-modest result already reported on the
  [thesis re-check page](/thesis-recheck)). The other eight methods have no 2018 precedent to
  validate against by design — see §2 above.

## 8. Honest caveats

- **This page is a decoder, not a new finding.** Every methodology claim above restates an
  already-signed-off document (linked inline); nothing here is a new statistical result.
- **Live data and charts are not yet wired to this page (pass 1 of 2).** The interpretation guide,
  vocabulary, and OA-D5 findings above are accurate as of the linked sign-off documents' dates; a
  future data-backed pass will surface a live, queryable version of the mode/scale/dominance figures
  once every binding disclosure above is applied at the query layer, not just documented here.
- **Nine methods does not mean nine confirmations.** Only the canonical nested location quotient is
  backtested against the 2018 thesis; treat every other method as a new, unvalidated-against-2018
  instrument (§2, §7).
- **Getis-Ord hotspot clustering is not part of this page.** The maintainer's confirmed scope for
  this cluster included a spatial hotspot method (Getis-Ord Gi*), but it needs a new statistical
  tooling adoption this project hasn't yet accepted
  ([ADR-0025](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0025-getis-ord-gistar-esda-mart-handoff.md),
  status: proposed) — it is held out of the build, and therefore out of this page, until that ADR is
  accepted and its own methodology re-clears the R-C1 gate.
- **Density and per-capita are the highest-risk figures on this page**, precisely because they
  look the most like ordinary statistics to a lay reader while answering a different question than
  Offering Advantage (§2). Read their caveats above before drawing any conclusion from either.
- **PLR-scale figures remain this project's most misuse-prone display**, for the same small-sample
  reason the base index already flags (see [methodology §6](/methodology)) — a single new or closed
  business can swing a PLR's ratio disproportionately.

## 9. Further reading

- [ADR-0024](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0024-oa-calculation-modes-area-hierarchy-dominance.md) — the governing decision record for every method, scale, and the dominance model on this page.
- [OA-D0 geo-data-scientist sign-off](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-geo-signoff.md) and [OA-D0 domain-expert sign-off](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D0-domain-signoff.md) — the full R-C1 gate this page's claims are grounded in.
- [OA-D3b z-score domain sign-off](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D3b-zscore-domain-signoff.md) and [OA-D4 dominance domain sign-off](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D4-domain-signoff.md) — the specific binding conditions this page discharges.
- [OA-D5 comparison-study findings](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/OA-D5-mode-comparison-findings.md) — the full cross-mode statistics summarized in §7.
- [docs/planning/oa-modes-hierarchy-dominance.md](https://github.com/dhelweg/gentriduck/blob/main/docs/planning/oa-modes-hierarchy-dominance.md) — the scoping doc this whole cluster discharges, including the original method survey and pros/cons table.
- [The area-hierarchy reference](/reference/area-hierarchy) and [the POI-taxonomy reference](/reference/poi-taxonomy) — full drill-downs on the two hierarchies this page's §4/§5 summarize.
- [ADR-0017](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md) and [ADR-0018](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md) — the base Offering Advantage construct and its curated/faithful split, which this page extends rather than replaces.
- [Methodology & data sources](/methodology) — the governed index this page's methods feed into (unchanged by anything here) and its own honest limitations.
- [POI & Offering Advantage map](/berlin/poi-map) — the one method (canonical nested LQ, PLR grain) that is live on the site today.

---

<FooterNav />
