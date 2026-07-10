---
title: The 2018 thesis, re-checked
sidebar_position: 10
---

<!--
  NEW page (maintainer request): a dedicated thesis-vs-project re-check, structured by the six
  original hypotheses. The live site leads with CURRENT data (home/maps/area-detail); this page is
  the historical reproduction study, kept separate. Content restates the signed-off Epic B findings
  (docs/epic-g/O4-milestone-B-narrative.md) plus the OA-A "faithful" revival (Run 1) findings
  (docs/epic-e/E1-regression-findings.md #168, docs/epic-b/A3-oa-validation-findings.md #167) — no
  new methodology claim, only the thesis's own Offering-Advantage predictor swapped in per ADR-0017.
  Public framing follows the #155/G2 sign-off precedent (geo-DS + domain-expert read of the public
  claims) — see docs/epic-g/A5-thesis-recheck-refresh-*-signoff.md.
-->

<div class="hero hero-compact">
  <div class="hero-eyebrow">The historical reproduction study</div>
  <h1>The 2018 thesis, re-checked</h1>
  <p class="hero-lede">Gentriduck began as a question: an
  <a href="https://github.com/dhelweg/masterthesis2018_gentrification">award-era master's thesis</a>
  from 2018 claimed that the churn of shops, cafés and restaurants in a Berlin neighbourhood
  tracks — and partly <i>predicts</i> — its social change. Eight years and a completely rebuilt,
  open-source stack later: <b>does that result still hold?</b></p>
</div>

<style>
.hero-compact {
  margin: -0.5rem -0.25rem 1.5rem;
  padding: 1.5rem 1.6rem;
  border-radius: 1rem;
  background:
    radial-gradient(circle at 12% 18%, rgba(37, 99, 235, 0.16), transparent 55%),
    radial-gradient(circle at 88% 82%, rgba(194, 65, 12, 0.13), transparent 55%),
    rgba(127, 127, 127, 0.04);
  border: 1px solid rgba(127, 127, 127, 0.16);
}
.hero-compact .hero-eyebrow {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.45rem;
}
.hero-compact h1 { margin: 0 0 0.55rem 0; font-size: 1.9rem; line-height: 1.15; }
.hero-compact .hero-lede { max-width: 46rem; font-size: 0.98rem; line-height: 1.5; opacity: 0.92; margin: 0; }
</style>

This page answers that hypothesis by hypothesis. It is deliberately about the *reproduction* — the
historical check. For what Berlin looks like **today**, start with the [home page](/), the
[maps](/berlin/maps), and the [area detail](/berlin/area-detail); those lead with the current data,
where these 2018 hypotheses matter less than the live picture.

<Alert status="info">
  <b>The short version:</b> rebuilt on the <i>same</i> data the thesis used, its core result
  replicates cleanly. Swap in the thesis's own commercial predictor — the <b>Offering Advantage</b>
  (a location quotient, not a raw shop count) — and fast food becomes the clearest signal of all,
  while the "social change leads commercial change" finding partially <i>revives</i> at a two-year
  lag in modern official data, where a raw count still failed. Swap in Berlin's more robust
  <i>official</i> social monitor instead of the thesis's welfare register, and the overall signal
  weakens — real, but fragile. The relationship between commerce and social change is genuine, but it
  depends on how you measure both "commerce" and "social change," and on the period you look at. We
  show that tension rather than hiding it.
</Alert>

## Two studies, same idea

|  | 2018 thesis | Gentriduck (this project) |
|---|---|---|
| **Question** | Does commercial activity track & predict neighbourhood social change in Berlin? | The same — re-checked, then extended |
| **Commercial signal** | OpenStreetMap points of interest, expressed as an *Offering Advantage* (a location quotient: a PLR's local share of a business category relative to Berlin overall) | Same OSM sources and same Offering-Advantage construct, full annual history back to 2008 |
| **Social measure** | Berlin welfare register (EWR), 2014–2020 | EWR *and* the official social monitor (MSS), 2013–2025 |
| **Stack** | Hadoop · Hive SQL · Java · R · Weka | dbt · DuckDB · Python (scipy, scikit-learn) — free, open, local-first |
| **Grain** | Planungsraum (≈2,000–5,000 residents) | Same, plus coarser scales for robustness checks |
| **Scope** | One-shot analysis | Ongoing public statistics site, Berlin now, more cities later |

The original thesis repository is left untouched as the historical record; Gentriduck is a
from-scratch rebuild from open sources only. Two methodological points matter here: the thesis
blended everything into one score, while this project keeps **what we're trying to explain** (social
status) strictly separate from **the commercial signal used to explain it** (see the
[methodology page](/methodology)); and this re-check (Run 1, faithful revival) now uses the thesis's
actual predictor — the **Offering Advantage**, a location quotient of how over- or under-represented a
business category is in a given area, exactly as the thesis computed it (its `oa_*`/`prev_oa_*`
columns) — rather than a plain POI count. Both are shown below where they diverge.

## The six hypotheses, then and now

Each hypothesis links commercial activity to social status. "Directional test passes" means the
effect pointed the way the thesis predicted; "significant" means it was unlikely to be chance.
Results below are from the thesis's own **Offering Advantage** predictor (OA, Run 1) where available;
a raw-count comparison is noted where OA and raw count disagree, or where OA has not yet been tested
(the EWR same-era panel — a documented scope boundary, see caveats).

| # | The hypothesis | 2018 thesis | Our re-check (OA, Run 1) | Verdict |
|---|---|---|---|---|
| **H1** | More businesses → higher social standing | Supported | Reproduces on raw POI counts (thesis-era EWR); the OA quotient itself points the *other* way (statistically significant, n=435, after a #200 data-quality fix restored the full sample) | ⚠️ Predictor-dependent, significant in the wrong direction |
| **H1b** | More fast-food outlets → lower status / displacement pressure | Supported | Significant and correctly signed on both raw counts and OA — and **stronger under OA** (rho 0.42 vs 0.14) — even at coarser city scales | ✅✅ Robust, strengthens under the thesis's own predictor |
| **H2** | Today's commerce *predicts* tomorrow's social improvement (lead–lag) | Supported (core claim) | Reproduces on EWR (thesis-era data, raw count; strengthens over 1→4-year windows); reproduces on the modern official monitor under **both** raw count and OA | ✅ Holds, EWR + modern OA agree |
| **H3a** | Rapid commercial change *precedes* social-status change | Supported | Reproduces on EWR (raw count); on the modern monitor, raw count points the wrong way, but **OA is correctly signed at a 2-year lag** (significant) | ⚠️ Data- and predictor-dependent |
| **H3b** | The reverse — social improvement *leads* commercial succession (the thesis's strongest finding) | Strongly supported | Replicates cleanly on EWR; on the modern official monitor a **raw-count classifier collapses**, but testing the same panel with the thesis's own OA predictor **revives the correct direction at a 2-year lag** (rho ‑0.14, p=0.001) | ⚠️ Partially revives under the thesis's own predictor |
| **H3c** | Commercial dynamism & social movement co-occur (same time) | Supported | Reproduces on EWR (raw count); wrong-signed on the modern monitor under both raw count and OA | ❌ Data-dependent, not rescued by OA |

### Read the columns together, not alone

The verdicts hinge on **two things at once: which data measures "social status," and which
predictor measures "commerce."**

- **On the welfare register the thesis used (EWR, 2014–2020, raw POI count):** the reproduction is
  unambiguous — **all 15 directional tests pass, every one statistically significant.** This panel has
  not yet been re-tested with the OA predictor (a documented scope boundary for this run, not a
  defect — see caveats); it remains the strongest "yes, it still holds" result.
- **On Berlin's *official* social monitor, same era (MSS, 2015–2019):** the signal weakens sharply
  under both predictors — few directional tests pass, almost none significant. MSS is coarser and
  biennial; it is simply harder to move with any commercial signal, and it measures a
  related-but-distinct thing.
- **On the official monitor, modern era (2021–2025), the thesis's own Offering-Advantage predictor:**
  fast food (H1b) is the strongest signal of all — stronger under OA than under a raw count. The
  lead–lag story is more nuanced than a flat "collapse": a raw-count classifier for H3b (the thesis's
  strongest finding) does fail outright, but swapping in the OA quotient at a **two-year** lag brings
  back a small, statistically significant match in the thesis's predicted direction — for H3a *and*
  H3b symmetrically (the underlying test is the same correlation read both ways). H3c (same-time
  co-movement) does not revive under either predictor. Whether the OA-driven partial revival reflects
  a genuinely better predictor, the short modern window, or a coincidence of this particular lag is
  not resolvable from this data alone, and should be read as suggestive rather than conclusive.

## What still matters for social science today

For the **current** picture the six hypotheses take a back seat to the live typology on the
[home page](/). But three threads remain genuinely interesting:

- **Fast food as a durable down-signal, strengthened by the thesis's own predictor (H1b).** Of
  everything tested, the fast-food association is the most robust — it holds on official data, it
  survives aggregation to district scale, *and* it gets clearly stronger once measured the way the
  thesis actually measured it (a location quotient, not a raw count). This is the one commercial
  indicator that behaves consistently — and increasingly clearly — as a status marker.
- **The lead–lag story is subtler than "vanished" (H3a/H3b).** The 2018 finding that "social change
  leads commercial change" was strong on EWR data. A raw-count re-test on modern official data made it
  look like the effect had disappeared entirely. Re-testing with the thesis's actual Offering-Advantage
  predictor tells a more nuanced story: the correct-direction, significant relationship comes back at a
  two-year lag. That is a meaningfully different conclusion from "this no longer holds," and a reminder
  that *how* you operationalize "commercial change" matters as much as *when* you measure it.
- **Not every hypothesis is rescued by the better predictor (H3c).** Same-time co-movement between
  commercial dynamism and social-status change stays wrong-signed on the modern monitor whichever
  predictor is used — a useful negative result, since it means the OA revival above isn't just "OA
  always helps."

## Honest caveats

- No multiple-comparison correction was applied; these are **directional indicators, consistent with
  a hypothesis, not confirmatory proof.**
- All analysis is at the aggregate planning-area level. Nothing here says anything about an individual
  person, household, or building (the ecological fallacy).
- EWR, MSS, and OSM measure different things on different schedules; a difference between the two
  social measures is a measurement story as much as a real-world one.
- **The EWR same-era panel (thesis-era welfare register, 2014–2020) has not yet been re-tested with
  the OA predictor** — it still uses the raw POI count/dynamism measures from earlier editions of this
  page. This is a documented scope boundary for Run 1 (OA is currently built at PLR scale only), not a
  result — a future run may close this gap.
- The OA "revival" at H3a/H3b's two-year lag is one specific test on one specific panel (modern MSS,
  k=2, n=534); it should be read as suggestive, not as overturning the k=1 null result on the same
  panel.
- Reproducing a 2018 result is a directional check, not a number-for-number replay — see the
  [Epic B framing](https://github.com/dhelweg/gentriduck/blob/main/docs/PROJECT_PLAN.md) for why.
- **Data correction (2026-07-09, #200):** the H1 (OA) test's sample was previously understated
  (n=92 instead of the correct n=435) by an area-code join bug that silently dropped most PLRs;
  fixing it changed the H1 (OA) result from "not significant either way" to "statistically
  significant, in the direction opposite the thesis's prior" — a more decisive, not a more
  favourable, finding. No other hypothesis in this table was affected.

## Further reading

- [Epic B milestone write-up](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/O4-milestone-B-narrative.md) — the full signed-off findings this page summarises
- [E1 regression findings (OA-A.4, Run 1)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/E1-regression-findings.md) — the full H1–H3c results table this page draws from
- [OA direct validation vs. the 2018 golden (OA-A.3)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-b/A3-oa-validation-findings.md) — confirms the recomputed Offering Advantage matches the thesis's own numbers directionally
- [Faithful vs improved methodology comparison](/methodology-comparison) — does curating which business types count sharpen the signal? (OA-C.2)
- [Methodology & data sources](/methodology) — what the current index measures and how it differs from the 2018 original
- [Home page](/) and [maps](/berlin/maps) — the current, live picture of Berlin
- [github.com/dhelweg/gentriduck](https://github.com/dhelweg/gentriduck) — all code, models, and decisions

---

<sub>[Home](/) · [Methodology & data sources](/methodology) · [About this project](/about) · [GitHub repository](https://github.com/dhelweg/gentriduck)</sub>

