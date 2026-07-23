---
title: Methodology & data sources
sidebar_position: 20
---

<!--
  I3 (#220): re-platformed onto the shared `<Hero>`/`<FooterNav>` components (this page previously
  had a plain `# ` heading and a hand-copied `<sub>` footer line, both now standardized per the I1
  template — docs/epic-i/storytelling-guide.md §4). Named consolidation: `/methodology-comparison`
  folds into this page as new §7 below (content carried over verbatim from that page, only heading
  levels and a handful of self-referential links adjusted — see §7's own header note); that route
  is now a redirect stub (`pages/methodology-comparison.md`). No indicator/weight/normalization
  change of any kind in this edit — this remains a restatement of the governed methodology
  (`docs/methodology/index-definition.md`), same as before I3.
-->

<Hero compact eyebrow="Chapter 3 — The Evidence · reference / rulebook" title="Methodology & data sources" lede="What Gentriduck measures, where the numbers come from, and where they should not be trusted too far — the plain-language decoder every other Chapter-3 page on this site links back to." />

This page explains, in plain language, what Gentriduck measures, where the numbers come from, and
where the numbers should **not** be trusted too far. It restates the project's governed methodology
(`docs/methodology/index-definition.md`, `Verdict: PASS` from both the geo-data-scientist and the
gentrification-domain-expert) — it does not introduce any new indicator, weight, or normalization of
its own. If anything here seems to disagree with the linked source documents, the source documents
win.

<Alert status="info">
  Gentriduck revives a 2018 university thesis about Berlin and extends it with more years of data,
  modern statistical methods, and (as of Epic H) a second city, Hamburg. Every figure on this site is
  a <b>small-area aggregate</b> — a property of a neighbourhood-sized statistical area, not of any
  individual, household, or building. See §6 below.
</Alert>

## 1. What "gentrification pressure" means here

Gentriduck does not claim to detect gentrification directly — no open dataset observes an
individual's decision to move, or a landlord's decision to raise rent, or a household being pushed
out. Instead, the project follows the same theoretical model the 2018 thesis used: Dangschat's (1988)
**double invasion–succession cycle**. The idea is that gentrification proceeds as two coupled
processes with an order to them:

- a **social cycle** — higher-status residents move into a neighbourhood, gradually changing who
  lives there; and
- a **commercial cycle** — the mix of shops, cafés, and services turns over to serve the new
  residents.

Döring & Ulbricht (2016) confirmed this pattern specifically for Berlin, and the 2018 thesis found
(p. 91) that the **social cycle leads the commercial cycle**: a neighbourhood's social composition
tends to change *before* its commercial landscape visibly follows. "Gentrification pressure," in this
project, means: **is a small area's official social-status classification improving, and does its
commercial/demographic profile look like an area earlier or later in that same process?** It is a
*signal*, drawn from the official record and from OpenStreetMap, not a certainty. The site
deliberately avoids saying an area "is gentrifying" as settled fact — it reports a **stage** in an
observed process (pre-gentrification, pioneer-signal, active-gentrification, consolidation-pressure,
stable-established, or the named ambiguous case "improving-vulnerable" — see §3) and a
**displacement-*pressure* signal**, never a claim that displacement has occurred.

**What the index explicitly does not do:**
- It does not predict, or say anything about, any individual person, household, or building.
- It does not assert that displacement *happened* anywhere — only that the measurable preconditions
  for displacement pressure are present or absent in a given area (see the ecological-fallacy and
  "no displacement stage" guardrails in §6).
- It does not currently capture the economic driver of gentrification (the "rent gap" — Smith 1979):
  it measures the *social outcome* and its *commercial/demographic correlates*, not the underlying
  land-value/capital mechanism. That is a stated, known gap (§6).

## 2. Where the numbers come from

Four open data sources feed the index. Each is free, requires no signup, and is used at the finest
grain it publishes — Berlin's **Planungsraum (PLR)**, a small statistical area of roughly 2,000–5,000
residents (Hamburg's equivalent is its **statistisches Gebiet**).

### MSS — Monitoring Soziale Stadtentwicklung (Berlin's official social monitor)

The Berlin Senate has published this small-area social classification roughly every two years since
1998. For every PLR it publishes a **Status-Index** (the current social situation, four classes from
highest to lowest) and a **Dynamik-Index** (the direction of recent change: improving / stable /
worsening), built from the Senate's own indicators — unemployment, welfare-benefit receipt, and child
poverty. This is the project's **outcome** variable: the thing the model is trying to explain, not a
predictor. It is a proxy for a neighbourhood's social trajectory precisely because it is the Senate's
own, citable, methodologically consistent classification of that trajectory — the same measure the
2018 thesis treated as ground truth. Hamburg publishes an equivalent Sozialmonitoring index on a
similar (though not identical) basis; see §5 for the caveats that come with comparing the two cities.

### EWR — Einwohnerregisterauswertung (the population register)

An extract from Berlin's resident register, published per PLR: age structure, share of foreign
nationals, share of residents with a migration background, and how long residents have lived at their
current address. This is **not** a social-status measure — it is a demographic snapshot. It is used
as a **baseline covariate**: a PLR with a young, highly mobile, migrant-heavy population and few
long-tenure residents is read (per Döring & Ulbricht 2016) as more *susceptible* to gentrification,
not as already gentrifying. It answers "how pre-gentrification did this area look at the start?", not
"is this area gentrifying right now?" — see §4 for why that distinction is enforced strictly in the
model. One field, share of residents with a migration background, changed its official definition in
2017 (a Mikrozensus reform); this project restricts any comparison of that field across years to
2017 onward and does not compare pre-2017 and post-2017 values directly.

### OSM POI — OpenStreetMap points of interest

Every mapped café, restaurant, shop, and other commercial point of interest in OpenStreetMap, sliced
by year back to 2008. This is the project's **predictor**: the commercial half of the double
invasion-succession cycle. A rising, changing mix of amenities is read as a signal of commercial
succession — the process the thesis expects to *follow*, not lead, social change. Because OpenStreetMap
is crowd-mapped, its coverage of any neighbourhood has grown substantially over time regardless of
whether the neighbourhood itself changed; §6 explains the correction applied for this.

### Bodenrichtwert / Mietspiegel — Berlin's official land-value and rent references

**Bodenrichtwerte** are the Senate's annual reference land values (EUR per m² of land, not of a
dwelling) determined by an independent valuation committee (*Gutachterausschuss*). **Mietspiegel** is
Berlin's official qualified rent index — a modelled net cold rent (EUR/m²/month) for a fixed reference
dwelling profile, combined with the per-address *Wohnlage* (locational-quality: simple / medium / good)
classification. Together these are a **structural price-and-desirability context**, not a
vulnerability score: a high land value is consistent with long-established wealth, completed
gentrification, or active upward pressure, and the level alone cannot distinguish between those. The
*level* is treated as a baseline/context covariate; only the *change* in these values over time carries
any displacement-pressure reading, and even then only as one part of the still-unbuilt displacement
dimension (§6). These figures are shown on the [area detail](/berlin/area-detail) page and the
[POI & Offering Advantage map](/berlin/poi-map)'s citywide-context section.

### Milieuschutz / rent-pressure / turnover — disclosed, not yet in the index

Three further signals exist as of mid-2026, each independently computed and gated
(R-C1 sign-off: geo-data-scientist + gentrification-domain-expert, both `PASS`), but **not yet
blended into the governed index** — they are separate, queryable, disclosure-only layers, published
here for transparency rather than folded into any score:

- **Milieuschutz** (`under_milieuschutz`, `milieuschutz_overlap_frac`) — whether a Planungsraum
  intersects one of Berlin's 82 active *Erhaltungsverordnungsgebiete* (social-preservation zoning
  areas), and by how much of its area. This is a **policy marker, not a measurement of displacement
  pressure**: a designation reflects the Senate's administrative capacity and political
  prioritization as much as underlying risk, and a PLR *without* the flag is not thereby "safe from
  displacement" — only "not (yet) formally protected."
- **Rent-pressure proxy** — a per-PLR, per-Wohnlage-snapshot-year composite of relative Mietspiegel
  rent level and MSS transfer-receipt share. This is a **point-in-time affordability-stress /
  risk-exposure signal, not a rent-burden ratio** (no PLR-grain income series exists to compute a
  literal rent-to-income figure), and not, by itself, evidence that rent is *rising* — it should be
  read alongside an area's Status/Dynamik trajectory, not in isolation.
- **Turnover proxy** — the year-over-year change in the EWR long-tenure (5+ year) resident share,
  sign-negated so a rising value means faster turnover. This is a **compositional-change signal, not
  a measured displacement event** — it cannot distinguish displacement-driven turnover from ordinary
  demographic churn (student housing, short lets, an aging cohort moving to care facilities).

None of the three is averaged with the others or with the governed index: doing so would require
inventing an untested weighting rule across three genuinely different time grains (a static
current-state designation, a Wohnlage-snapshot-year composite, and an EWR-annual delta). See
[ADR-0019](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0019-berlin-milieuschutz-displacement-source.md)
and the B1 sign-offs (§7) for the full reasoning. A grounded, gated integration of these signals into
a fifth index dimension remains planned but not yet built (§6).

## 3. The governed index definition, in plain terms

The single biggest change from the 2018 thesis is this: the current model keeps **what changed** and
**what we are trying to explain** strictly separate, instead of blending them into one score.

| Dimension | What it measures | Role |
|---|---|---|
| **Social status** | Berlin/Hamburg's official Status-Index class | **Outcome** — the thing we're explaining |
| **Social change** | The official Dynamik-Index class (improving / stable / worsening) | **Outcome** — its direction |
| **Commercial / amenity mix** | OSM point-of-interest density and its year-over-year change | **Predictor** |
| **Socio-demographic baseline** | The EWR-derived composite (age, migration, tenure) at a fixed starting year | **Baseline covariate** |
| *(Displacement / affordability)* | Milieuschutz zoning flag, rent-pressure proxy, turnover proxy — computed and disclosed (§2) but **not yet blended into the index** | Predictor (planned integration) |

The four active dimensions are never averaged into a single number as an input to each other — a
social-status class and a POI count are fundamentally different kinds of measurement, and averaging
them (as an earlier version of this project's index briefly did) hid which dimension was actually
driving a score. Instead:

1. The official Status × Dynamik classification is the **spine** of a six-stage typology (an
   extension of Berlin's own 4×3 classification grid), following the invasion-succession process:
   `pre-gentrification` → `pioneer-signal` → `active-gentrification` → `consolidation-pressure`, with
   `stable-established` for areas outside the process and `improving-vulnerable` as a named,
   deliberately ambiguous case the model cannot yet resolve without the still-missing displacement
   dimension.
2. The commercial (OSM) signal refines that classification — within an official Status × Dynamik cell,
   it distinguishes areas where the commercial succession is visibly happening (`amenity-active`) from
   those where it isn't yet (`amenity-quiet`).
3. **Order matters, and is tested, not assumed.** Because Dangschat's model predicts the social cycle
   *leads* the commercial cycle, the index tests social change against *later* commercial change at
   several time offsets (1–3 years), and reports which direction of prediction actually wins as a
   result — it does not assume the answer.
4. **The 2018 thesis's original single blended score is kept**, unchanged, as one backward-compatible
   output variant (labelled `standard` in the site's data selector) — for comparison, not as the
   model's current definition.

## 4. Ordinal data, honestly

Berlin and Hamburg's official Status and Dynamik classes are **ordered categories** — first, second,
third, fourth — not evenly spaced numbers. The gap between "high status" and "medium status" is not
guaranteed to equal the gap between "low" and "lowest." Gentriduck does not average these class codes
as if they were on a metric scale (an error the 2018 thesis's own scoring made); it uses rank-based
methods (ordered-logit models, Spearman rank correlation, named transitions like "improved / stable /
worsened") wherever these classes are involved.

The demographic baseline (EWR) is used only at a **fixed starting level**, never as a year-over-year
*change* feature feeding the same model that predicts social-status change. This is a deliberate
firewall: a *rising* young-adult share or a *falling* long-tenure-resident share **is itself one of the
demographic signatures of gentrification already under way** — using it as a "predictor" of the social
outcome it already describes would be closer to circular reasoning than to prediction.

## 5. The two data variants on this site: `standard` vs `live_data`

The data selector on the [home page](/) and [maps page](/berlin/maps) offers two variants, and the
difference between them matters for how you should read a number:

- **`standard`** is the **2018 thesis reproduction**, frozen at its original December 2016 snapshot.
  It is anchored to Berlin's pre-2021 area boundaries (447 Planungsräume) and computed against the
  demographic (EWR) data the thesis itself used, using the thesis's own single-blended-score
  definition (§3, point 4). Use it to compare against the original findings, not as a current picture
  of Berlin.
- **`live_data`** is the actively re-grounded index (§3): official MSS/Sozialmonitoring editions from
  2013 through 2025, on the current area boundaries, using the separated-dimensions/typology model.
  This is the default variant shown across the site, and the one that reflects the most recent
  official social-status data available.

These are **not directly comparable numbers**. `standard`'s single score and `live_data`'s typology
stage are built from different definitions, different area boundaries, and — critically — Berlin's
official area boundaries were redrawn in 2021 (447 areas became 542); no time series on this site
crosses that boundary without an explicit, documented area crosswalk. If you want to know "how has
this specific area changed since the 2018 thesis," use the [area detail page](/berlin/area-detail)'s
trajectory chart, which is built to handle the boundary discipline correctly, rather than comparing a
`standard` number to a `live_data` number by eye.

There is a second, smaller structured break within `live_data` itself: the Berlin Senate's own MSS
Status/Dynamik definition changed in 2023, adding a fourth input (the share of children in
single-parent households) to what had been a three-indicator classification. The Senate maintains
class continuity in spirit across this change — pre-2023 and 2023+ classes remain comparable in
*interpretation* — but they are not computed from an identical input set, so a small movement in an
area's class right around 2023 should not be over-read as a sudden real change.

## 6. Known limitations

We would rather state these plainly than have you discover them by surprise.

- **OpenStreetMap completeness bias.** OSM is crowd-mapped, and its coverage of any neighbourhood has
  grown substantially since 2008, independent of whether the neighbourhood itself changed. Gentriduck
  corrects for this by working with each area's **share** of the city's total point-of-interest count
  in a given year rather than its raw count — if citywide mapping coverage grows roughly evenly, the
  correction cancels out; only an area gaining points of interest *faster than the rest of the city*
  registers a real signal. This is an approximation, not a perfect fix: coverage did not grow
  perfectly evenly across the city, and already-popular inner-city areas were typically mapped earlier
  than peripheral ones. A small number of very-low-POI areas can still produce statistically extreme
  dynamism values from a tiny denominator (a single new business changing their share disproportionately);
  since 2026-07 these are winsorized at ±3 standard deviations before they reach any map, chart, or
  composite score, so one thin-data area cannot visually dominate the rest of the city (the raw,
  unclipped value remains available for diagnostics). A sharper form of the same effect is that three
  point-of-interest domains have *no* mapped OSM presence anywhere in Berlin before their tagging
  onset — Services before 2009, Vacancy before 2012, and Office before 2014 — so their pre-onset
  years are a left-censoring of the predictor series (the community had not yet begun tagging them),
  not a real absence of offices, service businesses, or vacant units; these all-zero domain-years are
  excluded from the hotspot significance testing
  ([#290](https://github.com/dhelweg/gentriduck/issues/290)) so a coverage gap cannot masquerade as a
  finding.
- **Ecological fallacy — aggregate, not individual, statistics.** Every number on this site describes
  a small-area aggregate of thousands of residents. It is not, and cannot be, a statement about any
  specific person, household, or building. Inferring an individual's situation from an area-level
  statistic is a well-known statistical error, and this project does not make that inference — please
  don't either.
- **No displacement measurement, and no stage claims one occurred.** Open data can observe
  socio-economic upgrading and demographic recomposition; it cannot observe that a specific household
  was involuntarily displaced. The site therefore uses risk/signal language throughout ("pressure",
  "signal") and deliberately avoids any stage name that would assert displacement as a completed fact.
  The Milieuschutz flag, rent-pressure proxy, and turnover proxy (§2) are a first step toward a
  genuine displacement-*risk* dimension, but each is disclosed individually with its own
  "policy marker / risk-exposure signal / compositional-change signal, not a measured outcome"
  caveat (§2) and none is yet integrated into a fifth index dimension.
- **The 2016-anchored `standard` baseline vs. the `live_data` variant (§5).** These use different area
  boundaries, different definitions, and different eras of demographic data. Treating a `standard`
  score and a `live_data` stage as interchangeable, or comparing them across Berlin's 2021 boundary
  change without a crosswalk, would produce a misleading comparison.
- **The rent-gap / economic driver is not yet represented.** The project measures the social outcome
  and its commercial/demographic correlates; it does not yet measure the land-value/capital mechanism
  (Smith 1979) that economic theories of gentrification put at the centre of the story.
  Bodenrichtwert/Mietspiegel data (§2) is a step toward this, but only as descriptive context so far.
- **Berlin and Hamburg are not directly comparable — four specific reasons, not a generic caveat.**
  [H3 (#237)](https://github.com/dhelweg/gentriduck/issues/237) admitted Hamburg's own official
  Sozialmonitoring Status/Dynamik outcome into the governed index, at Hamburg's Gebiet
  (`subarea_l2`) grain. Both cities are tracked with the same D1×D2 typology matrix and the same
  theoretical model (Dangschat 1988), but four concrete differences mean a same-named result in the
  two cities is not the same underlying measurement:
  1. **Different observation windows, and a different meaning of "active."** Berlin's official
     Dynamik-Index is built over a **2-year** window; Hamburg's over a **3-year** window. This is
     not just a numeric-scale difference — it changes *what counts as* "active-gentrification" in
     each city's own source methodology: a Hamburg Gebiet coded "improving" over 3 years captures
     slower-moving change than a Berlin PLR coded "improving" over 2 years, so the same typology
     label encodes a different underlying velocity threshold in each city's own classification.
  2. **Hamburg's demographic (D4/EWR) composite is thinner, and misses migration-driven signal.**
     Where Berlin's composite uses 5 indicators, Hamburg's uses only 3, substituting
     `unemployment_share` for two indicators Hamburg's ingested source does not carry:
     **`migration_background_share`** and **`residence_duration_5y_share`**. This is a real
     sensitivity loss, not just "thinner data" — migration background and length of residence are
     the closest available proxies for the "who is moving in/out" dynamic Dangschat's succession
     model is partly about, so a Hamburg "vulnerable" classification under this composite is
     systematically **less able to detect migration-driven succession** than Berlin's. (This
     composite does not itself appear in the governed `gentrification_index` mart admitted by H3 —
     `own_idx_class`/`own_idx_class_bi` are hard-`NULL` for every Hamburg row there — but it is
     disclosed here because it is the D4 covariate referenced by the Hamburg C-series validation
     below and elsewhere on this site.)
  3. **Hamburg's D4 covariate is coarser-grained than its own D1/D2/D3 data.** Hamburg's
     demographic composite is only published at **Stadtteil** grain (~104–105 areas) and is
     uniformly inherited down to Hamburg's ~941–945 finer **statistisches Gebiete** (`subarea_l2`)
     — every Gebiet within one Stadtteil shares an identical D4 value. Berlin has no such ceiling:
     its D1 (status), D2 (dynamism), and D3 (POI/commercial) dimensions all retain full
     Gebiet-equivalent (PLR) resolution — and so do Hamburg's own D1/D2/D3; only Hamburg's D4
     demographic covariate is coarsened this way. A uniform shading across several neighbouring
     Hamburg Gebiete on any demographic view is a resolution artefact of this inheritance, not
     measured sub-Stadtteil homogeneity.
  4. **A same-named typology stage is not directly equivalent across the two cities.** Any
     narrative, chart, or headline that names a Hamburg-coded typology stage (e.g.
     "active-gentrification") alongside a Berlin-coded one must carry a one-line disclosure —
     **"not directly equivalent — see methodology"** — rather than presenting the two as the same
     measurement. This applies to any future public write-up, not only to this page.

  **Substantive basis for admitting Hamburg at all.** These four points are disclosed limitations,
  not reasons to withhold Hamburg — the admission rests on a re-verified, Hamburg-specific
  validation series, not mere structural parallelism with Berlin:
  [C1/#158](https://github.com/dhelweg/gentriduck/issues/158) (OSM completeness-bias correction
  re-fit on Hamburg's own 2008–2026 coverage curve), [C2/#159](https://github.com/dhelweg/gentriduck/issues/159)
  (trajectory-window thresholds re-derived for Hamburg's annual cadence, holding panel span
  constant so the ordinal step means the same *rate* in both cities), [C3/#160](https://github.com/dhelweg/gentriduck/issues/160)
  (an independent re-run of the lead-lag hypotheses on Hamburg's own annual panel — an honest,
  correctly-signed-but-under-powered partial null, not a confirmation or refutation),
  [C4/#161](https://github.com/dhelweg/gentriduck/issues/161) (the Gebiet↔Stadtteil crosswalk
  match-rate guard behind point 3 above, closed at 98.6%), [C5/#203](https://github.com/dhelweg/gentriduck/issues/203)
  (Wohnlage/Mietenspiegel-input and displacement-zone integration, confirming Hamburg's *soziale
  Erhaltungsverordnung* is the same §172 BauGB instrument as Berlin's Milieuschutz), and
  [C6/#215](https://github.com/dhelweg/gentriduck/issues/215) (confirming the Hamburger
  Mietenspiegel is the same §558 BGB *ortsübliche-Vergleichsmiete* instrument as Berlin's, with the
  same Holm-2010 Bestandsmiete-lagging bias). See
  [H1-domain-signoff.md](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/H1-domain-signoff.md),
  [H3-geo-signoff.md](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/H3-geo-signoff.md),
  and [H3-domain-signoff.md](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/H3-domain-signoff.md)
  for the full reasoning behind each of the four points above.
- **No pooled Berlin↔Hamburg ranking or numeric differencing, anywhere on this site — a structural
  rule, not a footnote.** Following the same principle already applied to the Bezirk/PGR/BZR
  coarse-index question above ([#267](https://github.com/dhelweg/gentriduck/issues/267)): this site
  never offers a shared leaderboard, a shared numeric colour scale, or a "which city is more
  gentrified" comparison across Berlin and Hamburg. Each city's `status_index`/`dynamism_index` is
  read only within its own official Sozialmonitoring/MSS classification — point 1 above is exactly
  why averaging or subtracting them across cities would be misleading, not merely inconvenient.
  Hamburg's data pages live on their own separate routes ([`/hamburg/…`](/hamburg)) with their own
  maps and colour scales, never merged into a Berlin view or a shared cross-city component.
- **Small samples and no multiple-comparison correction** in the directional statistical tests behind
  this model. Results should be read as directional indicators, consistent with a hypothesis, not as
  confirmatory proof.
- **No re-scored index value at BZR/PGR/Bezirk grain — by design, not oversight.** The Bezirk/PGR/BZR
  profile pages on this site show sums and **distributions** of child-PLR typology stages, never a
  single re-scored gentrification-index number for the coarser area itself. This was considered
  ([#267](https://github.com/dhelweg/gentriduck/issues/267)) and declined by both the geo-data-scientist
  and the gentrification-domain-expert: averaging the ordinal Status/Dynamik class codes across PLRs
  into one coarse-grain value would violate the same "don't average ordinal codes as if metric" rule
  this page states in §4, and — separately — a single coarse number would erase exactly the kind of
  intra-Bezirk heterogeneity (a district containing both actively-gentrifying and stable PLRs at once)
  that is the actual analytic point of a PLR-grain, frontier-based index. See the
  [geo-data-scientist decision](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-i/I-coarse-index-geo-decision.md)
  and the [domain-expert decision](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-i/I-coarse-index-domain-decision.md)
  for the full reasoning.

## 7. Faithful vs improved — a methodology comparison

<!--
  I3 (#220) named consolidation: folded in from the former standalone `/methodology-comparison`
  page (OA-C.2, #175) -- content restates the signed-off findings in
  docs/epic-e/C1-three-way-comparison-findings.md (dual R-C1 sign-off,
  docs/epic-e/C1-three-way-comparison-{geo,domain}-signoff.md) unchanged from that page; only
  heading levels (##/### -> ###/####) and a few self-referential links were adjusted for this
  page's numbering. The three result sets (faithful, improved, comparison) stay visually and
  textually separated per ADR-0017 D3's firm "never blend" rule, same as before. That route is now
  a short redirect stub (`pages/methodology-comparison.md`).

  OA-ablation (#261) update: the improved variant now ALSO computes natively at the 2018
  thesis's own lor_pre2021 vintage (int_poi_status_dynamism_improved_pre2021), so a true
  same-anchor ablation is now possible -- restates
  docs/epic-e/C1-three-way-comparison-findings.md Part 2 unchanged. The original
  approximate/structural comparison (Part 1) is KEPT below, clearly labeled "original
  comparison", per the #261 ticket's explicit instruction not to delete history -- only the
  "why we can't (yet) run the head-to-head test" section and the warning Alert have been
  updated/removed since that limitation is now discharged.
-->

The [thesis re-check page](/thesis-recheck) already swaps in the 2018 thesis's own
commercial predictor — the **Offering Advantage** (OA), a location quotient — in place
of a raw point-of-interest count. That is the **faithful** revival: reproduce OA
exactly as the thesis defined it, with **no curation of which business types count**.

This section goes one step further and asks a different question: **does curating *which*
business types count — grounded in urban-sociology theory, then confirmed where the
data allows — sharpen the signal?** That curated version is the **improved** variant.
The two are never blended into one number (see §3 above); the rest of this section
shows them side by side.

<Alert status="info">
  <b>Update (#261):</b> the improved variant now also computes natively for the 2018
  thesis's own period and area boundaries, so we can finally run a true head-to-head
  "does curation improve the exact same prediction" test — see "The true head-to-head
  test" below. The original, more limited comparison (before this extension) is kept
  further down, clearly labeled, for continuity.
</Alert>

### Two workstreams, one taxonomy, never blended

| | Faithful (thesis re-check) | Improved (this section) |
|---|---|---|
| **Which business types count?** | All of them — no curation, exactly as the 2018 thesis did it | A curated subset, weighted by how theoretically plausible each type is as a gentrification signal *before* any outcome data is consulted, then confirmed (never promoted) by a correlation pass |
| **Anchor period** | 2018 (thesis-era data, `lor_pre2021` boundaries) | 2021–2025 (current Berlin, `lor_2021` boundaries) |
| **Question** | Do the 2018 findings still hold? | Does curating the signal sharpen it? |
| **Where it's built** | [thesis re-check](/thesis-recheck) | this section |

The curation rule itself — which business types are kept, dropped, or down-weighted,
and why — is a **standing, citable decision** now written up as
[ADR-0018](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md).
In short: a type is included only if urban-sociology literature (independent of this
project's own data) gives it a plausible mechanism connecting it to commercial
gentrification — coworking spaces and specialty cafés are the kind of "third-wave
retail" the literature points to; a transit stop or a recycling bin is not, even if it
happens to correlate with social status in a given year (that correlation is treated as
a coincidence of general density, not a signal, and the type stays excluded either way).
Vacancy is the one deliberate exception: it is tracked as its own, oppositely-signed
disinvestment marker, never summed into the "more business = more upscaling" signal.

### The true head-to-head test (#261)

Building the curated, theory-weighted business-type list (ADR-0018) was originally
grounded only in Berlin's *current* OpenStreetMap taxonomy — extending it to the 2018
thesis's older area boundaries and business classifications needed its own review, not
a mechanical rerun. That review is now done: the same curated business-type list
transfers to the thesis-era data **unchanged** (every 2008–2020-era business type
already had a tiered, cited entry in the existing list; no new weights were needed —
see the [three-way comparison findings](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/C1-three-way-comparison-findings.md)
Part 2 for the full review). That makes a genuine, same-year, same-boundary,
same-outcome comparison possible for the first time:

- **Faithful** (all business types, uncurated) against the 2018 golden data:
  **statistically significant but wrong-signed** (n=435 areas — same result as before,
  repeated here as the left side of the comparison).
- **Improved** (the curated, theory-weighted basket), now computed *natively* for 2018
  thesis-era boundaries, against the *same* 2018 golden data: **essentially no
  correlation** (rho ≈ 0.007, n=436, not statistically significant) — numerically
  closer to zero than the faithful basket's wrong-signed result.
- **On this genuine like-for-like test, curating the business-type list does not
  sharpen the aggregate signal** — if anything the curated basket is weaker (closer to
  a null result) than the uncurated one. This holds even on the strictest possible cut
  (restricting to the identical set of areas where both predictors are available,
  n=435).
- **This still does not mean Offering Advantage "doesn't work."** As before, the
  [thesis re-check page](/thesis-recheck) shows finer-grained, single-business-type
  tests (fast food) using the *same* faithful OA construct remain significant,
  correctly signed, and *stronger* under OA than under a raw count. A coarse
  four-domain average — whether curated or not — smooths out exactly the kind of
  type-specific signal those finer tests pick up. This result says the *aggregate
  basket* isn't sharpened by curation, not that the curation approach or the
  underlying OA construct is invalid.
- This is a **single snapshot-year, single-city comparison of two correlation
  coefficients** — read it as directional evidence about this particular aggregate
  test, not as a general verdict on whether theory-driven curation improves prediction
  in every setting.

### The original (approximate) comparison — kept for context, superseded above

*Before the #261 extension above, a true head-to-head test wasn't possible — the
improved variant only existed for Berlin's current area boundaries and years
(2021–2025), not the 2018 thesis's own period. The comparison below is kept, unchanged,
for historical continuity; the numbers in "The true head-to-head test" above are the
ones to read for the actual faithful-vs-improved question.*

**Faithful (reproduces the thesis's own H1 test, all business types):** using the
thesis's actual Offering-Advantage basket (the four business domains it identified as
upscaling-relevant, averaged) against the 2018 golden data, the relationship is
**statistically significant but points the opposite way from the thesis's prior**
(n=435 areas — more of this business basket goes with slightly *worse*, not better,
social standing).

**Improved (the curated, theory-weighted basket) against Berlin's current official
social monitor:** **weak and not statistically significant** (n=1,607 area-years,
2021–2025), also pointing the same, unexpected direction.

Neither result, on its own, is the headline. What *is* worth reporting:

- **Both point in the same, unexpected direction** — more of the tracked business
  activity going with slightly *worse*, not better, social standing. The faithful
  result clears the bar for statistical confidence (in the unexpected direction); the
  improved result does not reach significance either way. Taken together this is a
  **directional-disagreement-with-theory** finding for the coarse aggregate basket —
  not a confirmation of the thesis's original H1 prior in either workstream.
- **The two numbers above were not a fair head-to-head** (this is the limitation
  discharged by the section above): they came from different years, different area
  boundaries, and different underlying social outcomes entirely.

### Honest caveats (this section)

- **Neither correlation confirms the thesis's original H1 prior** — the faithful
  basket is statistically significant but wrong-signed, and the improved basket does
  not reach significance either way (on the true same-anchor test above, the improved
  basket is essentially uncorrelated). Read both as evidence against the *aggregate*
  basket confirming H1, not as confirmed findings in the thesis's predicted
  direction.
- The **true head-to-head test above** (#261) is a genuine ablation (same outcome,
  year, and area boundaries for both predictors) — but it is still a single
  snapshot-year, single-city comparison of two correlation coefficients, not a
  controlled experiment with repeated trials; the **original comparison** further up
  (kept for continuity) remains structural, not a controlled experiment, since it
  compares different outcome measures, time periods, and area boundaries
  simultaneously.
- This section describes **correlational, descriptive** results. Nothing here is a
  causal claim about what makes an area gentrify, and nothing here should be read as a
  "which neighbourhood is about to change" targeting signal.
- Aggregate business-type counts are unreliable in areas with very few mapped
  businesses; per-area results should not be over-read at the individual-area level.
  A minimum-POI-base flag/suppression for individual thinly-mapped PLRs is now **applied**
  on the [POI & Offering Advantage map](/berlin/poi-map): PLR-years with fewer than 10
  total mapped places are shown as a blank/unshaded gap rather than a potentially
  misleading Offering Advantage value (#274, ADR-0017 D5 D-3).
- No multiple-comparison correction was applied; treat all figures here as
  **directional indicators**, consistent (or not) with a hypothesis, not confirmatory
  proof.
- Offering Advantage is computed with an **isotropic (equal-in-all-directions) catchment**
  around each area — it does not account for how Berlin's actual street/transit network
  shapes which businesses residents can realistically reach, a known simplification of the
  real accessibility surface. Berlin's headline OA figures on this site (including the
  faithful/improved comparison above) are built from the **hard point-in-polygon variant**
  (`weight_variant='standard'`), which has no distance-decay bandwidth parameter at all and
  is therefore bandwidth-invariant by construction — that means only that it makes no bandwidth
  choice, not that it has been tested and found spatially robust; it remains untested for the
  fragility described next and sits at the sharp/narrow end of the same spatial-grain family.
  Separately, a dedicated 500 m, 1000 m, and
  1500 m bandwidth sweep (`analysis/oa_bandwidth_sweep.py`, #274, ADR-0017 D5 C-4) tested a
  **Gaussian distance-weighted variant** of OA (not the one used above) and found its
  rankings **stable** close to the 1000 m headline catchment (500 m↔1000 m and
  1000 m↔1500 m both rank-correlate above the 0.7 publish-gate threshold, Spearman, in every
  year 2008–2026) but **re-ranked meaningfully** across the sweep's full 500 m to 1500 m
  span (pooled Spearman r = 0.68, below 0.7 in 17 of 19 years) — see the
  [bandwidth-sweep findings](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G2-oa-bandwidth-sweep-findings.md)
  for the full detail, including why this finding does not describe the figures above. It is
  disclosed here because it bears on a separate, still-open question
  ([OA-C.1, #174](https://github.com/dhelweg/gentriduck/issues/174)) of whether the published
  headline should ever switch from the hard-count variant to a Gaussian-weighted one — if that
  ever happens, the sweep's finding (stable near 1000 m, fragile at the sweep's full span)
  becomes directly relevant to that variant's publish-readiness.

This section's own further reading: [the 2018 thesis, re-checked](/thesis-recheck) (the faithful
revival, hypothesis by hypothesis), [three-way comparison findings (OA-C.1)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/C1-three-way-comparison-findings.md)
(the full statistical detail behind this section), [ADR-0018](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md)
(the curation rule), [ADR-0017](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md)
(the Offering Advantage construct and the faithful/improved separation), and the
[OA bandwidth-sweep findings (#274)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G2-oa-bandwidth-sweep-findings.md)
(the C-4 bandwidth-fragility publish-gate discharge for the Gaussian-weighted variant, and what
it does and doesn't say about the hard-count variant published above).

## 8. Further reading

This page is a plain-language summary. The full, versioned methodology — including exact statistical
methods, sensitivity analyses, and the theory citations behind every design choice — lives in the
project's public GitHub repository:

- [Governed index definition](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/index-definition.md) — the complete, signed-off methodology this page summarizes
- [ADR-0004 — data governance & governed index](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md)
- [ADR-0008 — the multi-dimensional gentrification model](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0008-multi-dimensional-gentrification-model.md)
- [ADR-0006 — Berlin MSS data source](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0006-berlin-mss-data-source.md) and [ADR-0007 — SES indicators](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0007-berlin-ses-indicators.md)
- [ADR-0003 — Berlin geographies & price/rent sources](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0003-berlin-geographies-and-open-price-rent-sources.md)
- [Spatial methods](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/spatial-methods.md) — how points of interest are assigned to areas
- [OSM completeness-bias correction sign-off](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-c/C5-geo-signoff.md)
- [ADR-0019 — Berlin Milieuschutz displacement source](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0019-berlin-milieuschutz-displacement-source.md)
- [ADR-0018 — causal-tiered POI selection](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md) and [ADR-0017 — Offering Advantage revival](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md) — the faithful/improved comparison in §7
- [Offering Advantage — modes, scales & dominance](/methodology-oa-modes) — the dedicated page for OA's nine calculation methods, four spatial scales, and the within-group dominance construct (ADR-0024), extending the faithful/improved comparison in §7
- B1 displacement/affordability sign-offs (§2): [Milieuschutz geo](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/B1-milieuschutz-geo-signoff.md) / [domain](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/B1-milieuschutz-domain-signoff.md), [rent-pressure geo](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/B1-rent-pressure-geo-signoff.md) / [domain](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/B1-rent-pressure-domain-signoff.md), [turnover geo](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/B1-turnover-geo-signoff.md) / [domain](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/B1-turnover-domain-signoff.md)
- Coarse-grain (BZR/PGR/Bezirk) index-value decline (§6): [geo-data-scientist decision](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-i/I-coarse-index-geo-decision.md) / [domain-expert decision](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-i/I-coarse-index-domain-decision.md)
- Hamburg admission (§6): [H1 geo](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/H1-geo-signoff.md) / [H1 domain](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/H1-domain-signoff.md) sign-offs (pipeline wiring, the four publication conditions restated in §6 above), [H3 geo](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/H3-geo-signoff.md) / [H3 domain](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/H3-domain-signoff.md) sign-offs (the #237 admission decision itself), and the Hamburg C-series validation re-fits: [C1/#158 geo](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/158-hc1-geo-signoff.md) / [domain](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/158-hc1-domain-signoff.md), [C2/#159 geo](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/159-hc2-geo-signoff.md) / [domain](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/159-hc2-domain-signoff.md), [C3/#160 geo](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/160-hc3-geo-signoff.md) / [domain](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/160-hc3-domain-signoff.md), [C5/#203 geo](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/203-hc5-geo-signoff.md) / [domain](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/203-hc5-domain-signoff.md), [C6/#215 geo](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/215-hc6-geo-signoff.md) / [domain](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/215-hc6-domain-signoff.md)

See also the [home page](/) for the current index, [time-series](/berlin/time-series) for per-area
trajectories, [maps](/berlin/maps) for a citywide choropleth, [area detail](/berlin/area-detail) for
a full per-area breakdown, the [POI & Offering Advantage map](/berlin/poi-map) (including its
citywide-context section), and [Offering Advantage — modes, scales & dominance](/methodology-oa-modes)
for the full method/scale/dominance vocabulary, with its own [POI taxonomy](/reference/poi-taxonomy)
and [area hierarchy](/reference/area-hierarchy) reference pages.

---

<FooterNav />

