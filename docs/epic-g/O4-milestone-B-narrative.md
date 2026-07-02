# Gentriduck — Epic B Milestone: Reviving a 2018 Berlin Gentrification Study

**Date:** 2026-06-30
**Status:** Epic B complete — analytical findings validated and signed off.

---

## What we built

In 2018, a master thesis at the University of Hamburg asked whether OpenStreetMap data — the
crowd-sourced map of the world — could track gentrification across Berlin's neighbourhoods. The
thesis combined commercial point-of-interest data (cafes, bars, restaurants, fast-food outlets)
with Berlin's welfare register to test whether the mix of businesses in an area predicted, or at
least mirrored, its social trajectory.

Gentriduck revives that work on a modern, fully open-source stack: dbt for data transformation,
DuckDB as the local warehouse, Python (scipy and scikit-learn) replacing the original R and Weka
tools. The original thesis repository is untouched; Gentriduck is a fresh implementation from
open sources only.

The pipeline covers Berlin's Planungsraume (planning areas, PLR) — the city's smallest
statistical unit, each housing roughly 2,000 to 5,000 people, with 436 to 542 areas depending on
the boundary vintage in use. Three data sources feed the models: OpenStreetMap commercial
snapshots (annual, 2014 to 2025), Berlin's welfare register (EWR, annual, 2014 to 2020), and
the Monitoring Soziale Stadtentwicklung (MSS), Berlin's official biennial social monitoring
index, from 2015 to 2025.

---

## What the thesis asked

Five hypotheses tested the link between commercial activity and neighbourhood social status.

**H1** — Areas with more businesses have higher social standing.
**H1b** — More fast-food outlets signal lower status and displacement pressure.
**H2** — Today's commercial activity predicts tomorrow's social improvement (a lead-lag claim).
**H3a** — Rapid change in the commercial scene precedes measurable social-status change.
**H3b** — The reverse: social improvement leads commercial succession (the thesis's strongest confirmed finding).
**H3c** — Commercial dynamism and social-status movement co-occur at the same point in time.

---

## What we found

The answer depends almost entirely on which data is used to measure "social status."

**EWR (welfare register, same era as thesis): strong agreement.** Testing on the same data source
the 2018 thesis used — the annual welfare register covering 2014 to 2020 — the results are
unambiguous. All five hypotheses point in the direction the thesis predicted: 15 out of 15
directional tests pass, all with statistical significance. H2 grows stronger as the time window
lengthens from one to four years, which is the signature of a genuine lead-lag mechanism. H3b,
the thesis's most firmly confirmed finding, replicates cleanly. When inputs are held constant,
the modern pipeline reproduces the thesis's conclusions.

**MSS data, same era (2015-2019): direction right, effect too small to confirm.** Switching to
Berlin's official social monitoring index for the same period, the signal weakens sharply. H2 is
in the expected direction but falls short of statistical significance across all time-lag
configurations. The temporal hypotheses (H3a through H3c) point the wrong way. Two out of eight
directional tests pass; none are significant. The MSS and EWR measure related but distinct
things, and the coarser, biennial MSS is simply harder to move with a commercial activity signal.

**MSS data, modern era (2021-2025): H2 survives weakly; H3b collapses.** For the current period,
H2 holds with a significant signal in both one- and two-year lag configurations, and H1b
(fast-food) is also significant and correctly signed. But H3b — the strongest thesis finding —
has effectively vanished: the classifier built to test it produces below-chance accuracy. Whether
this reflects the short available window (three biennial editions spanning four years), a genuine
shift in Berlin's gentrification dynamics since 2018, or a structural difference between the two
social indices is not resolvable from this data alone.

**Three spatial scales: fast food is robust; lead-lag does not strengthen with aggregation.**
Retesting at the Bezirksregion level (roughly 137 sub-districts) and the Bezirk level (12
districts), H1b remains significant and correctly signed at both coarser scales. H2 maintains its
direction consistently. The temporal hypotheses, however, do not strengthen with aggregation — an
outcome that would be expected if spatial noise were the only obstacle.

---

## What it means

The most important result is not the headline agreement score but what it reveals about
measurement. The thesis's core claim holds when you use the data the thesis used. That is a
meaningful check. But when you use a different — and arguably more robust — social indicator, the
signal weakens or disappears. The relationship between commercial activity and neighbourhood
social change is real but fragile: sensitive to which social measure is used, the time window
available, and possibly to the historical period.

The H3b collapse in modern data is the most substantively interesting finding. The thesis
confirmed, and this project replicates on EWR data, that rising neighbourhood status tends to
attract commercial succession. That this signal has weakened in 2021-2025 may reflect market
saturation in the inner city, the effects of Milieuschutz (social-preservation zoning) in
pressure areas, or simply the brevity of the current data window.

**Honest caveats.** EWR welfare register data is administrative data, not publicly available for
download. OSM data is open under the Open Database Licence and requires attribution. Berlin MSS
data is published under Berlin's open data licence. No multiple-comparison correction has been
applied; results are directional indicators, not confirmatory tests. All analysis is at the
aggregate planning-area level; no inference about individual displacement is possible or claimed.

---

## What is next

Epic G — the public statistics website — is the next milestone: neighbourhood-level social
development statistics, trajectory maps, and time-series charts for Berlin, with a full
methodology page and data attribution. The pipeline is city-agnostic by design, so adding a
second city later means adding a data adapter, not rewriting models.

The open dataset release (derived, non-PII aggregate statistics under an open licence) follows
once the hosting decision is confirmed. Outstanding analytical work before the launch includes the
housing-market dimension (rent and land-value data from open Berlin sources) and spatial
econometric analyses that would test for neighbourhood spillover effects the current tabular
analysis cannot address.

---

*Gentriduck is a public, free, and open-source project. Repository:
[github.com/dhelweg/gentriduck](https://github.com/dhelweg/gentriduck).
All data sources are free and openly licensed; see the methodology documentation for full attribution.*
