---
title: Methodology & data sources
sidebar_position: 20
---

# Methodology & data sources

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
model.

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
dimension (§6). These figures are shown on the [area detail](/berlin/area-detail) and
[citywide POI & price/rent overview](/berlin/poi-price-overview) pages.

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

## 6. Known limitations

We would rather state these plainly than have you discover them by surprise.

- **OpenStreetMap completeness bias.** OSM is crowd-mapped, and its coverage of any neighbourhood has
  grown substantially since 2008, independent of whether the neighbourhood itself changed. Gentriduck
  corrects for this by working with each area's **share** of the city's total point-of-interest count
  in a given year rather than its raw count — if citywide mapping coverage grows roughly evenly, the
  correction cancels out; only an area gaining points of interest *faster than the rest of the city*
  registers a real signal. This is an approximation, not a perfect fix: coverage did not grow
  perfectly evenly across the city, and already-popular inner-city areas were typically mapped earlier
  than peripheral ones.
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
- **Berlin and Hamburg are not directly comparable.** Both cities are tracked with the same model
  structure, but their official social-monitoring editions use different observation windows and
  Hamburg's demographic baseline is thinner (fewer indicators, coarser geography) than Berlin's. A
  same-named typology stage in the two cities does not represent an identical underlying threshold.
- **Small samples and no multiple-comparison correction** in the directional statistical tests behind
  this model. Results should be read as directional indicators, consistent with a hypothesis, not as
  confirmatory proof.

## 7. Further reading

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
- B1 displacement/affordability sign-offs (§2): [Milieuschutz geo](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/B1-milieuschutz-geo-signoff.md) / [domain](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/B1-milieuschutz-domain-signoff.md), [rent-pressure geo](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/B1-rent-pressure-geo-signoff.md) / [domain](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/B1-rent-pressure-domain-signoff.md), [turnover geo](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/B1-turnover-geo-signoff.md) / [domain](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/B1-turnover-domain-signoff.md)

See also the [home page](/) for the current index, [time-series](/berlin/time-series) for per-area
trajectories, [maps](/berlin/maps) for a citywide choropleth, [area detail](/berlin/area-detail) for
a full per-area breakdown, and the [citywide POI & price/rent overview](/berlin/poi-price-overview).

---

<sub>[Home](/) · [Methodology & data sources](/methodology) · [About this project](/about) · [GitHub repository](https://github.com/dhelweg/gentriduck)</sub>

