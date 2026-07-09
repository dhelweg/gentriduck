---
title: Faithful vs improved — a methodology comparison
sidebar_position: 21
---

<!--
  NEW page (OA-C.2 #175): the detailed public write-up of the OA-C.1 (#174) three-way
  comparison (faithful vs improved vs 2018 golden). Content restates the signed-off
  findings in docs/epic-e/C1-three-way-comparison-findings.md (dual R-C1 sign-off,
  docs/epic-e/C1-three-way-comparison-{geo,domain}-signoff.md) — no new methodology
  claim here, only a public restatement. The three result sets (faithful, improved,
  comparison) are kept visually and textually separated per ADR-0017 D3's firm
  "never blend" rule; the honest structural-scope-limitation finding (a same-anchor
  ablation is not currently computable — the improved variant is Berlin lor_2021-only,
  2021-2025) is stated up front, not buried. Public framing inherits the #155
  precedent (geo-DS + domain-expert read of the public claims) — see
  docs/epic-g/C2-methodology-comparison-*-signoff.md.
-->

# Faithful vs improved — a methodology comparison

The [thesis re-check page](/thesis-recheck) already swaps in the 2018 thesis's own
commercial predictor — the **Offering Advantage** (OA), a location quotient — in place
of a raw point-of-interest count. That is the **faithful** revival: reproduce OA
exactly as the thesis defined it, with **no curation of which business types count**.

This page goes one step further and asks a different question: **does curating *which*
business types count — grounded in urban-sociology theory, then confirmed where the
data allows — sharpen the signal?** That curated version is the **improved** variant.
The two are never blended into one number (see [methodology](/methodology)); this page
shows them side by side.

<Alert status="warning">
  <b>Read this before the numbers below:</b> the improved variant is currently only
  computed for Berlin's <b>current</b> area boundaries and years (2021–2025) — it has
  <i>not</i> been computed for the 2018 thesis's own period and boundaries. That means
  we cannot yet run a true head-to-head "does curation improve the exact same
  prediction" test. Rather than force a misleading comparison, we report each
  variant's own best-available result and are explicit about what is, and is not,
  comparable.
</Alert>

## Two workstreams, one taxonomy, never blended

| | Faithful (thesis re-check) | Improved (this page) |
|---|---|---|
| **Which business types count?** | All of them — no curation, exactly as the 2018 thesis did it | A curated subset, weighted by how theoretically plausible each type is as a gentrification signal *before* any outcome data is consulted, then confirmed (never promoted) by a correlation pass |
| **Anchor period** | 2018 (thesis-era data, `lor_pre2021` boundaries) | 2021–2025 (current Berlin, `lor_2021` boundaries) |
| **Question** | Do the 2018 findings still hold? | Does curating the signal sharpen it? |
| **Where it's built** | [thesis re-check](/thesis-recheck) | this page |

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

## What we found

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
- **This does not mean Offering Advantage "doesn't work."** The [thesis re-check
  page](/thesis-recheck) shows that finer-grained tests using the *same* faithful OA
  construct — a single business type (fast food) rather than an averaged four-domain
  basket — are significant and correctly signed, and get *stronger* under OA than under
  a raw count. Averaging several business domains into one basket smooths out exactly
  the kind of type-specific signal (fast food is one clear example) that the finer
  tests pick up. The wrong-signed aggregate result here is a property of the coarse
  basket, not evidence
  against the underlying construct.
- **The two numbers above are not a fair head-to-head.** They come from different
  years, different area boundaries, and — because the improved variant only exists for
  the current period — different underlying social outcomes entirely. We are not
  claiming curation "helped" or "hurt"; we are reporting that, on their own separate
  best-available tests, the faithful basket clears significance in the *unexpected*
  direction and the improved basket does not clear significance at all — neither
  confirms the thesis's original H1 prior.

## Why we can't (yet) run the head-to-head test

Building the curated, theory-weighted business-type list (ADR-0018) was itself a
research exercise, grounded in Berlin's *current* OpenStreetMap taxonomy and modern
urban-sociology literature. Re-doing that exercise for the 2018 thesis's older area
boundaries and business classifications would be a new piece of research in its own
right, not a mechanical rerun — so it hasn't been done yet. Until it is, a literal
apples-to-apples "does the curated basket predict better" test isn't something we can
honestly compute. We'd rather say that plainly than manufacture a misleading number.

## Honest caveats

- **Neither correlation confirms the thesis's original H1 prior** — the faithful
  basket is statistically significant but wrong-signed, and the improved basket does
  not reach significance either way. Read both as evidence against the *aggregate*
  basket confirming H1, not as confirmed findings in the thesis's predicted
  direction.
- The comparison above is **structural, not a controlled experiment**: the two numbers
  differ in outcome measure, time period, and area boundaries simultaneously.
- This page describes **correlational, descriptive** results. Nothing here is a causal
  claim about what makes an area gentrify, and nothing here should be read as a
  "which neighbourhood is about to change" targeting signal — see the
  [methodology page](/methodology) for the full descriptive-vs-causal framing.
- Aggregate business-type counts are unreliable in areas with very few mapped
  businesses; per-area results should not be over-read at the individual-area level.
- No multiple-comparison correction was applied; treat all figures here as
  **directional indicators**, consistent (or not) with a hypothesis, not confirmatory
  proof.

## Further reading

- [The 2018 thesis, re-checked](/thesis-recheck) — the faithful revival, hypothesis by hypothesis
- [Three-way comparison findings (OA-C.1)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/C1-three-way-comparison-findings.md) — the full statistical detail behind this page
- [ADR-0018](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md) — the curation rule that defines the improved variant
- [ADR-0017](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md) — the Offering Advantage construct and the faithful/improved separation
- [Methodology & data sources](/methodology) — what the current index measures and how it differs from the 2018 original
- [Home page](/) and [maps](/maps) — the current, live picture of Berlin

---

<sub>[Home](/) · [Methodology & data sources](/methodology) · [About this project](/about) · [GitHub repository](https://github.com/dhelweg/gentriduck)</sub>

