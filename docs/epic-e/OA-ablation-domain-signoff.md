# Gentrification Domain Expert Sign-off: OA-ablation (#261) — improved-OA extended to lor_pre2021 for a true same-anchor ablation

- **Scope:** OA-ablation #261 — branch `feature/261-oa-ablation`, commit `15059189`
  - New model `transform/models/intermediate/int_poi_status_dynamism_improved_pre2021.sql`
    (causality-tier-weighted "improved" OA predictor computed natively at the lor_pre2021/2008–2020
    vintage, reusing `seed_poi_offering_relevance` tier weights **unchanged**), wired into
    `int_gentrification_ts` Branch B → `gentrification_index` variant='improved'.
  - `analysis/c_three_way_comparison.py` Part 2 (true same-anchor ablation).
  - `docs/epic-e/C1-three-way-comparison-findings.md` Part 2; `web/pages/methodology.md` §7.
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-17
- **Gate:** R-C1 methodology-bearing; dual gate with geo-data-scientist (parallel)
- **Discharges:** the B3 sign-off's standing requirement
  (`docs/epic-c/B3-oa-weighted-index-geo-signoff.md` §2.2 / Risk 3) that a lor_pre2021 extension needs
  "its own tier-weight review, not a mechanical crosswalk reuse."

## Verdict: PASS

---

## 1. Is it domain-defensible to reuse the lor_2021 tier weights on the 2008–2020 POI stock unchanged?

**Yes.** This is the central theory question, and the reuse is defensible because the tiers encode a
**format-level theoretical mechanism, not an era-specific empirical calibration.** The tier-3
(highest-weight) leaves are the canonical pioneer-business set of the invasion–succession /
cultural-intermediary literature — galleries, art centres, specialty/coffee cafés, boutiques,
delicatessen, books, coworking (Ley 1996 *The New Middle Class*; Zukin 2009 *Naked City*; Dangschat
1988; Lees/Slater/Wyly 2008). The claim each weight makes is "this retail *format* plausibly signals
gentrification-era succession," which is a statement about the format's mechanism, not about a
particular decade. I independently confirmed the seed's `causal_rationale` column contains **no**
"current / modern / today / 2021-Berlin" framing that would fail to describe 2008–2020 retail — the
citations themselves span the 1980s–2000s. The model's SQL header (lines 27–79) states this review
explicitly and grounds it (R-C2 satisfied). The coverage/composition evidence (zero-gap anti-join,
structurally similar top-domain composition) is necessary support and belongs to the geo-DS/DE gate;
my gate is the theoretical validity of holding weights constant, and that holds.

## 2. Honesty of the "curation does not sharpen" finding — no over- or under-claiming

**Correctly reported on both surfaces.** The finding is neither buried nor inflated:

- It is **not overclaimed**: `C1...findings.md` Run C explicitly says the result "should still be read
  as directional evidence, not proof that curation systematically helps or hurts," and §7 of
  `methodology.md` frames it as "a single snapshot-year, single-city comparison of two correlation
  coefficients … not a general verdict on whether theory-driven curation improves prediction."
- It is **not underclaimed / buried**: the null is stated plainly (improved rho≈0.007–0.014, not
  significant; weaker than the faithful basket's rho=0.148), including the strictest identical-sample
  cut (Run D, n=435).
- It correctly **protects the OA construct** from a false inference: both docs note the finer-grained,
  single-type OA tests (H1b fast-food, `E1-regression-findings.md`) remain significant and
  correctly-signed, so this result says *the coarse aggregate basket is not sharpened by curation*,
  not that OA or the tier theory is invalid. This is the theoretically correct reading — a 4-domain
  average smooths out exactly the type-specific pioneer signal the literature predicts.

## 3. Ethical / public-framing concerns — adequately caveated

Low misuse risk (this is a humbling negative result about the authors' own method, not a
neighbourhood-targeting output), and the framing is already sound: §7 carries the descriptive-not-causal
guard verbatim and the explicit "nothing here should be read as a 'which neighbourhood is about to
change' targeting signal" line, plus the D-3 minimum-POI-base suppression note. ADR-0017 D-1 framing is
faithfully applied. No further caveat required for PASS; see recommendations for the O2 carry-forward.

---

## Theory risks (non-blocking)

1. **Gentrification-stage / signal-attenuation confound.** Invasion–succession theory implies a pioneer
   format's *signal value* is highest at the frontier and attenuates as a quarter consolidates. Reusing
   weights unchanged treats the format→signal mapping as stage-invariant, which the theory does not
   strictly guarantee across a 2008–2020 vs 2021–2025 span (some 2008 frontier quarters are now
   consolidated, where a café is mainstream rather than a pioneer marker). This does **not** argue for
   different weights (the tier is a format judgment, not a stage judgment) and, if anything, is
   *consistent with* — not contradicted by — the weak/null aggregate finding. Worth naming as a
   limitation, not a defect.
2. **Format-meaning drift for the ambiguous mid-tier types** (ethnic-cuisine restaurants, generic
   cafés) that can equally mark stable incumbent immigrant commerce — already flagged era-independently
   in the seed's own rationale, so the ablation does not introduce new exposure here.

## Verdict block

```json
{
  "verdict": "pass",
  "verdict_label": "PASS (clean)",
  "scope": "OA-ablation #261 — improved-OA extended to lor_pre2021 (int_poi_status_dynamism_improved_pre2021) for a true same-anchor faithful-vs-improved ablation; branch feature/261-oa-ablation, commit 15059189",
  "domain_rationale": "Reusing seed_poi_offering_relevance's tier weights unchanged on the 2008-2020 POI stock is domain-defensible: the tiers encode a format-level theoretical mechanism (pioneer/cultural-intermediary consumption formats per Ley 1996, Zukin 2009, Dangschat 1988, Lees/Slater/Wyly 2008), not an era-specific empirical calibration; the seed's causal_rationale carries no current/modern/2021-Berlin framing that would fail to describe thesis-era retail (independently confirmed), and the tier-3 set is the canonical pioneer-business list. This discharges the B3 requirement for a real tier-weight review (SQL header lines 27-79, R-C2 grounded) rather than a mechanical crosswalk reuse. The 'curation does not sharpen the aggregate basket' null (improved rho~0.007-0.014 vs faithful 0.148, incl. the strictest identical-sample cut) is reported honestly on both C1-findings and methodology.md 7 -- not overclaimed (explicit 'directional, not a general verdict'), not buried, and correctly shielded from a false anti-OA inference by pointing to the still-significant finer-grained single-type tests. Descriptive-not-causal (D-1), anti-targeting framing, and D-3 min-POI-base note are all present.",
  "theory_risks": [
    "Gentrification-stage/signal-attenuation confound: a pioneer format's signal value can decay as a quarter consolidates, so holding weights stage-invariant across 2008-2020 vs 2021-2025 is a simplification -- non-blocking, does not argue for different weights, and is consistent with (not contradicted by) the observed null.",
    "Format-meaning drift for ambiguous mid-tier types (ethnic-cuisine restaurants, generic cafes) which can mark stable incumbent immigrant commerce -- already flagged era-independently in the seed, no new exposure."
  ],
  "recommendations": [
    "Carry the 'single snapshot-year, single-city -- directional evidence, not a general verdict on theory-driven curation' caveat and the anti-targeting/descriptive-not-causal framing verbatim into the O2 whitepaper and any G2 public surface; do not let 'curation didn't help here' be read as 'theory-tier curation is useless'.",
    "If/when the improved variant is compared across the vintage boundary in future, re-open this gate to address the stage-attenuation confound (theory risk 1) explicitly -- e.g. by reporting the aggregate result alongside the frontier-stage-restricted subset rather than the whole-city z-score.",
    "Keep the null visible next to the still-significant finer-grained OA tests (H1b) so the aggregate-basket result is never read in isolation as evidence against OA as a construct."
  ]
}
```

**Verdict: PASS** — the domain/theory-fidelity gate is clean. OA-ablation #261 may be integrated into
`develop` once the geo-data-scientist's parallel gate is also `PASS`.
