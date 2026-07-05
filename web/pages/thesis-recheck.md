---
title: The 2018 thesis, re-checked
---

<!--
  NEW page (maintainer request): a dedicated thesis-vs-project re-check, structured by the six
  original hypotheses. The live site leads with CURRENT data (home/maps/area-detail); this page is
  the historical reproduction study, kept separate. Content restates the signed-off Epic B findings
  (docs/epic-g/O4-milestone-B-narrative.md) — no new methodology claim. When productionised, the
  public framing should get a geo-DS + domain-expert read (as the methodology page did), per R-C2.
-->

# The 2018 thesis, re-checked

Gentriduck began as a question: an [award-era master's thesis](https://github.com/dhelweg/masterthesis2018_gentrification)
from 2018 claimed that the churn of shops, cafés and restaurants in a Berlin neighbourhood tracks —
and partly *predicts* — its social change. Eight years and a completely rebuilt, open-source stack
later: **does that result still hold?**

This page answers that hypothesis by hypothesis. It is deliberately about the *reproduction* — the
historical check. For what Berlin looks like **today**, start with the [home page](/), the
[maps](/maps), and the [area detail](/area-detail); those lead with the current data, where these
2018 hypotheses matter less than the live picture.

<Alert status="info">
  <b>The short version:</b> rebuilt on the <i>same</i> data the thesis used, its core result
  replicates cleanly. Swap in Berlin's more robust <i>official</i> social monitor, and the signal
  weakens — real, but fragile. The relationship between commerce and social change is genuine, but
  it depends on how you measure "social change" and on the period you look at. We show that tension
  rather than hiding it.
</Alert>

## Two studies, same idea

|  | 2018 thesis | Gentriduck (this project) |
|---|---|---|
| **Question** | Does commercial activity track & predict neighbourhood social change in Berlin? | The same — re-checked, then extended |
| **Commercial signal** | OpenStreetMap points of interest (cafés, bars, restaurants, fast food) | Same OSM sources, full annual history back to 2008 |
| **Social measure** | Berlin welfare register (EWR), 2014–2020 | EWR *and* the official social monitor (MSS), 2013–2025 |
| **Stack** | Hadoop · Hive SQL · Java · R · Weka | dbt · DuckDB · Python (scipy, scikit-learn) — free, open, local-first |
| **Grain** | Planungsraum (≈2,000–5,000 residents) | Same, plus coarser scales for robustness checks |
| **Scope** | One-shot analysis | Ongoing public statistics site, Berlin now, more cities later |

The original thesis repository is left untouched as the historical record; Gentriduck is a
from-scratch rebuild from open sources only. The single biggest methodological change: the thesis
blended everything into one score, while this project keeps **what we're trying to explain** (social
status) strictly separate from **the commercial signal used to explain it** — see the
[methodology page](/methodology) for why that matters.

## The six hypotheses, then and now

Each hypothesis links commercial activity to social status. "Directional test passes" means the
effect pointed the way the thesis predicted; "significant" means it was unlikely to be chance.

| # | The hypothesis | 2018 thesis | Our re-check | Verdict |
|---|---|---|---|---|
| **H1** | More businesses → higher social standing | Supported | Reproduces on the thesis's own (EWR) data | ✅ Holds |
| **H1b** | More fast-food outlets → lower status / displacement pressure | Supported | Significant and correctly signed — even at coarser city scales | ✅✅ Robust |
| **H2** | Today's commerce *predicts* tomorrow's social improvement (lead–lag) | Supported (core claim) | Reproduces on EWR (and *strengthens* over 1→4-year windows — the signature of a real lead–lag); survives weakly on modern official data | ⚠️ Holds, fragile |
| **H3a** | Rapid commercial change *precedes* social-status change | Supported | Reproduces on EWR; points the wrong way on the official monitor | ⚠️ Data-dependent |
| **H3b** | The reverse — social improvement *leads* commercial succession (the thesis's strongest finding) | Strongly supported | Replicates cleanly on EWR; **collapses in modern (2021–2025) official data** | ❌ Weakens sharply |
| **H3c** | Commercial dynamism & social movement co-occur (same time) | Supported | Reproduces on EWR; not confirmed on the official monitor | ⚠️ Data-dependent |

### Read the columns together, not alone

The verdicts hinge almost entirely on **which data measures "social status":**

- **On the welfare register the thesis used (EWR, 2014–2020):** the reproduction is unambiguous —
  **all 15 directional tests pass, every one statistically significant.** When the inputs are held
  constant, the modern pipeline reproduces the thesis's conclusions. This is the real "yes, it still
  holds" result.
- **On Berlin's *official* social monitor, same era (MSS, 2015–2019):** the signal weakens sharply —
  only 2 of 8 directional tests pass, none significant. MSS is coarser and biennial; it is simply
  harder to move with a commercial-activity signal, and it measures a related-but-distinct thing.
- **On the official monitor, modern era (2021–2025):** the fast-food effect (H1b) and a short-lag
  version of the lead–lag (H2) survive, but **H3b — the thesis's strongest finding — effectively
  vanishes** (the classifier built to test it scores below chance). Whether that reflects the short
  modern window, Berlin's Milieuschutz (social-preservation) zoning cooling inner-city pressure, or a
  genuine shift in the city's gentrification dynamics is not resolvable from this data alone.

## What still matters for social science today

For the **current** picture the six hypotheses take a back seat to the live typology on the
[home page](/). But two threads remain genuinely interesting:

- **Fast food as a durable down-signal (H1b).** Of everything tested, the fast-food association is
  the most robust — it holds on official data *and* survives aggregation to district scale. It is the
  one commercial indicator that behaves consistently as a status marker across data sources and
  scales.
- **The vanishing lead–lag (H3b).** That "social change leads commercial change" was strong in 2018
  and on EWR data, yet collapses in 2021–2025 official data, is the most substantively interesting
  modern result. If Berlin's inner-city commercial succession has saturated — or been dampened by
  tenant-protection policy — the classic invasion–succession lead–lag may simply have less room to
  run than it did a decade ago. That is a hypothesis worth watching as more editions arrive.

## Honest caveats

- No multiple-comparison correction was applied; these are **directional indicators, consistent with
  a hypothesis, not confirmatory proof.**
- All analysis is at the aggregate planning-area level. Nothing here says anything about an individual
  person, household, or building (the ecological fallacy).
- EWR, MSS, and OSM measure different things on different schedules; a difference between the two
  social measures is a measurement story as much as a real-world one.
- Reproducing a 2018 result is a directional check, not a number-for-number replay — see the
  [Epic B framing](https://github.com/dhelweg/gentriduck/blob/main/docs/PROJECT_PLAN.md) for why.

## Further reading

- [Epic B milestone write-up](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/O4-milestone-B-narrative.md) — the full signed-off findings this page summarises
- [Methodology & data sources](/methodology) — what the current index measures and how it differs from the 2018 original
- [Home page](/) and [maps](/maps) — the current, live picture of Berlin
- [github.com/dhelweg/gentriduck](https://github.com/dhelweg/gentriduck) — all code, models, and decisions
