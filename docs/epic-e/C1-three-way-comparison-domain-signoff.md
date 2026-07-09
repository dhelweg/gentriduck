# Gentrification Domain Expert Sign-off: OA-C.1 (#174) — three-way comparison (faithful vs improved vs 2018 golden)

- **Scope:** OA-C.1 #174 — the domain-fidelity half of the R-C1 dual gate on
  `analysis/c_three_way_comparison.py` / `docs/epic-e/C1-three-way-comparison-
  findings.md`. Validates that the comparison's framing does not overclaim a causal
  or "improvement" conclusion the data cannot support, that the non-significant
  aggregate result is contextualized rather than presented as a verdict on OA or on
  the causal-tier curation approach, and that the D-1 descriptive-not-causal
  framing (ADR-0017, inherited through the whole OA cluster) is preserved.
- **Operationalizes:** ADR-0017 D-1 (descriptive, not causal, framing), D3 (faithful/
  improved never blended); Epic B framing (CLAUDE.md, directional revival — document
  divergences); the domain-expert precedent set at B.1/B.3
  (`docs/epic-b/B1-oa-relevance-seed-domain-signoff.md` §4,
  `docs/epic-c/B3-oa-weighted-index-domain-signoff.md`, if present — advisory that a
  curated score risks being over-read as "the corrected answer").
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-09
- **Branch:** feature/174-oa-c1-three-way-comparison → develop
- **Geo-DS verdict:** PASS (`docs/epic-e/C1-three-way-comparison-geo-signoff.md`)
- **Verdict:** PASS

---

## 1. The report correctly avoids the two most likely domain-framing errors for this ticket

A three-way comparison of a non-significant aggregate result is exactly the kind of
output most prone to two opposite misreadings, and I confirm the report avoids both:

1. **It does not claim the improved (curated) variant is "better" or "worse" than the
   faithful variant.** Given the two rho values are computed against genuinely
   different outcomes (2018 golden vs. current live MSS) over different periods, any
   direct ranking would misrepresent a construct/period confound as a methodology
   verdict — precisely the confound ADR-0017 D3's faithful/improved separation exists
   to prevent. The report states this limitation explicitly and repeatedly rather than
   only in a caveat buried at the end.
2. **It does not claim the non-significant, "wrong-direction" aggregate finding
   invalidates OA as a construct or the causal-tier curation approach (OA-B.1-B.4,
   ADR-0018).** The report correctly cross-references the same findings document's
   H1b/H2/H3a/H3b OA-based tests, which ARE significant and expected-direction,
   attributing the weak aggregate result to the coarseness of a 4-domain mean basket
   rather than to a defect in the underlying OA construct or the causal-tier weighting
   rule. This is the theoretically correct read: a crude unweighted mean of
   Gastronomy/Entertainment/Retail/Services OA collapses considerable within-domain
   heterogeneity (e.g., Fast Food is tier-1/ambiguous within Gastronomy per
   `seed_poi_offering_relevance.csv`, exactly the kind of averaging that would dilute
   a finer-grained signal), consistent with why the finer H1b/H2 tests (single
   category, not an averaged basket) perform better.

## 2. The structural scope limitation is the correct, honest finding — not an evasion

The improved variant's Berlin-`lor_2021`-only, 2021-2025-only scope (locked at OA-B.3,
`docs/epic-c/B3-oa-weighted-index-geo-signoff.md` §2.2) means there is genuinely no
2018-era improved-variant data to compare against the thesis golden. From a domain
perspective, forcing an artificial same-anchor comparison here (e.g., applying the
`improved` tier weights retroactively to 2018-era OSM data without re-deriving the
causal-tier seed for that era's taxonomy) would risk **exactly** the kind of
methodological overreach the field is rightly skeptical of — presenting a result as
validated when the underlying construct was never actually computed for that period.
Declining to do so and naming the gap as a tracked follow-up is the correct,
disciplined choice, consistent with the Epic B "document divergences, don't force
exact reproduction" framing already established for this whole revival.

## 3. Descriptive-not-causal framing (D-1) is preserved throughout

Nowhere does the report characterize either rho as evidence of a causal relationship
between commercial offering and social status change — both are correctly described
as correlational tests of a descriptive predictor against a contemporaneous outcome,
consistent with ADR-0017 D-1 and ADR-0018's explicit boundary against #80 causal
inference. This matters especially here because a "three-way comparison" framing
could tempt a less careful author toward causal-sounding language ("the improved
method predicts better/worse") — this report does not use that language.

## 4. The area_code padding bug discovery (#200) is handled with appropriate rigor, not swept under the rug

Discovering that an already-published, already-signed-off result (H1 OA, n=92) was
computed on a silently truncated, non-random subsample (only PLRs whose id happens to
already be 8 characters) is a meaningful data-quality finding in its own right. I
confirm the report/ticket does the right thing domain-wise: it does not quietly
correct the number (which could look like moving the goalposts on an already-
published, cited finding without transparency) and does not ignore it either; filing
it as its own gated ticket with an explicit acceptance criterion to re-publish the
corrected findings doc is the transparent, correct path for a public-facing
methodology artifact.

---

## 5. Conditions

None blocking, no new conditions. I echo the geo-DS sign-off's advisory (add the
pseudo-replication caveat to Run 2's entry) as a minor polish, not a gate condition.

---

## 6. Risks

1. A future reader of the findings doc alone (without this sign-off's context) could
   still misread "neither correlation is significant" as "OA doesn't work" if they
   don't follow through to the H1b/H2/H3 cross-reference — the report does make this
   cross-reference explicitly, but it is easy to skim past. Advisory: when this
   feeds the O2 whitepaper (#82) or a future G2/site page, carry the full context
   (fine-grained tests significant, aggregate basket not) rather than quoting the
   aggregate rho in isolation.
2. Once #200 is fixed and Run 1 is re-run with the corrected ~435-row sample, the
   qualitative conclusion (non-significant, wrong-direction aggregate) may or may not
   hold — this report's finding is scoped to the current (pre-fix) published number
   and should not be read as a permanent verdict on the aggregate basket's
   performance.

---

## 7. Certification

The three-way comparison correctly declines to force an invalid same-anchor ablation
given a genuine structural data gap, correctly avoids both a "curation improves
prediction" overclaim and a "non-significant result invalidates OA" overclaim by
cross-referencing the same pipeline's finer-grained significant results, preserves
the ADR-0017 D-1 descriptive-not-causal framing throughout, and handles the
discovered area_code padding bug (#200) with appropriate transparency rather than
silently correcting or ignoring an already-published, signed-off figure. I have no
domain-fidelity objection to integrating this into `develop`.

```json
{
  "verdict": "pass",
  "rationale": "The three-way comparison report avoids the two most likely domain-framing errors for this kind of ticket: it does not rank faithful vs improved as 'better/worse' given they are tested against genuinely different outcomes over different periods (the exact construct/period confound ADR-0017 D3's faithful/improved separation exists to prevent), and it does not let the non-significant, wrong-direction aggregate oa_mean/status_score_improved basket result read as invalidating OA as a construct or the causal-tier curation rule -- it correctly cross-references the same findings document's significant, expected-direction H1b/H2/H3a/H3b OA tests, attributing the weak aggregate result to basket-averaging coarseness (a 4-domain mean dilutes within-domain heterogeneity, e.g. tier-1/ambiguous Fast Food averaged into Gastronomy) rather than a defect in OA itself. The structural scope limitation (improved variant is Berlin lor_2021-only 2021-2025, no 2018-era coverage, per B3 sec2.2) is honestly reported as a substantive finding rather than papered over or forced into an artificial comparison, consistent with Epic B's directional-revival framing. Descriptive-not-causal language (ADR-0017 D-1, ADR-0018's boundary against #80) is preserved throughout -- no causal-sounding characterization of either correlation. The discovered area_code padding bug in the already-published H1 (OA) result (#200) is handled transparently: neither silently corrected (which would move the goalposts on a cited, signed-off finding without disclosure) nor ignored, but filed as its own gated ticket with an explicit re-publication acceptance criterion.",
  "risks": [
    "A reader who only skims the findings doc's headline rho values (without following the H1b/H2/H3 cross-reference) could still misread the non-significant aggregate result as 'OA doesn't work' -- advisory for any future whitepaper/site consumer to carry the full context, not quote the aggregate rho in isolation",
    "The qualitative conclusion (non-significant, wrong-direction Run 1 aggregate) is scoped to the current pre-#200-fix n=92 sample and should not be treated as a permanent verdict once the padding bug is fixed and Run 1 is re-run at full N"
  ],
  "recommendations": [
    "When this feeds the O2 whitepaper (#82) or a future G2/site methodology page, always present the aggregate-basket non-significance alongside the fine-grained H1b/H2/H3 significant results, never the aggregate figure in isolation",
    "Re-run this comparison once #200 lands and treat any change in the qualitative conclusion as a new finding to report, not a silent update"
  ]
}
```

---

## Final Verdict

Verdict: PASS
