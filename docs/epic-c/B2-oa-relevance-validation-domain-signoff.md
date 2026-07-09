# Gentrification Domain Expert Sign-off: OA-B.2 (#171) — data-driven offering-relevance validation

- **Scope:** OA-B.2 #171 — the domain-fidelity half of the R-C1 dual gate on the data-driven
  confirmation pass over `seed_poi_offering_relevance.csv` (OA-B.1 #170). Validates that the pass
  genuinely respects the non-circularity rule in *practice*, not merely in code structure (covered by
  the geo-DS sign-off), that the individual findings (spurious tier-0 correlates, direction-mismatched
  tier ≥ 1 nodes) are sociologically coherent rather than statistical noise being over-read, and that
  the D-1/D-2 ethics/framing guardrails continue to hold at this second curation step.
- **Operationalizes:** Dangschat (1988) invasion-succession (incumbent/administrative infrastructure
  is not itself a signal); Zukin (2009), Ley (1996), Lees/Slater/Wyly (2008) (retail-succession
  signature); Smith (1979/1987) rent-gap/disinvestment (Vacancy opposite pole); ADR-0017 D2–D3
  (multi-signed bundle, non-circularity, causality-first-with-data-confirmation).
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-09
- **Branch:** feature/171-oa-b2-data-driven-validation → develop
- **Geo-DS verdict:** PASS (`docs/epic-c/B2-oa-relevance-validation-geo-signoff.md`)
- **Verdict:** PASS

---

## 1. The non-circularity rule holds in substance, not just in code

I checked every one of the report's four result buckets against what the rule actually requires
(ADR-0017 D3: theory sets tier before data; data may confirm/calibrate within a tier; data may never
promote a tier-0 node, and — per my own OA-B.1 sign-off §2 — should not be read as licence to demote a
causally-plausible node either):

- **45 tier ≥ 1 nodes not empirically confirmed this pass** are correctly left at their theory tier. This
  is the expected, healthy outcome for a 2016 OSM snapshot with genuinely sparse coverage at the leaf
  level — theoretical ambiguity (tier 1, the largest bucket per my OA-B.1 sign-off) is a *permanent*,
  legitimate resting place for a node data cannot decide, not a temporary state awaiting eventual
  confirmation. I confirm the report frames this correctly ("kept per the non-circularity rule --
  theory-only, not demoted") rather than implying these are somehow weaker or provisional.
- **15 tier-0 nodes are correlated-but-non-causal (spurious).** I reviewed all 15
  (Mobility/Individual + Bike Parking + Parking Lot; Public Service + Health/Vet + Social + Social
  Service; Public Space + Phone + Recycling + Glass Container; Retail/Workshop/Car Repair;
  Tourism/Info ×2) against their own `causal_rationale` text in the seed: every one is civic/
  administrative infrastructure or an incumbent-serving trade with **no** plausible commercial-succession
  mechanism (bike racks, phone booths, glass recycling bins, vet clinics, social services, car repair,
  tourist info kiosks are sited by administrative/incumbent logic, not retail-market response — exactly
  Dangschat's 1988 distinction). Finding a *correlation* here (whatever its sign) is precisely the
  spurious-correlate cell of the 2×2, and correctly changes nothing: these nodes were already excluded on
  causal-plausibility grounds alone, and the correlation neither strengthens nor should ever be allowed to
  weaken that exclusion (a future reader must not read "correlated" as "should have been kept" — I note
  this as a documentation risk below, not a defect in this pass).
- **6 direction-mismatched tier ≥ 1 nodes** (Entertainment, Fast Food ×2, Bank Branch, Pet Shop, Sports
  and Recreation) correlate *significantly* with `status_index` in the sign opposite the H1 amenity
  prior. I read this as a genuine, interesting finding rather than noise to dismiss:
  - **Fast Food** is tiered 1 ("ambiguous... theory does not implicate it as a gentrification signal") in
    the OA-B.1 seed precisely because Dangschat's incumbent-serving reading competes with a weaker
    upgrading-format reading; a positive correlation with `status_index` (i.e. *more* fast food in
    *worse*-status PLRs) is fully consistent with the incumbent-serving reading dominating in this
    dataset, and is not contradictory evidence against the tier-1 ambiguous assignment — if anything it
    mildly reinforces choosing NOT to tier it higher.
  - **Entertainment** (tier 2, domain-level) mixing bars/culture/leisure/nightlife sub-categories at the
    domain roll-up is a plausible source of a confounded domain-level signal (nightlife is tier-0 within
    this same domain per the OA-B.1 seed) — the domain-level aggregate correlating oppositely from the
    category-level signature items (Culture at tier 3) is not itself alarming; it is a known risk of
    reading domain-level OA as if it were homogeneous, and the seed's own category/type breakdown exists
    precisely to avoid over-reading the domain aggregate.
  - **Bank Branch / Pet Shop** direction-mismatches are individually weaker evidence (n=40, n=10 — the
    latter at the sample-size floor) and I would not weight them heavily; correctly the script does not
    act on any of the six unilaterally.
  This is exactly the kind of finding OA-B.2 exists to surface for review, not to resolve by algorithm —
  I concur with the report's framing that these should be documented, not acted on unilaterally.

## 2. `data_corr` values are read correctly relative to `status_index` polarity

I independently re-derived the polarity logic (status_index inverse: higher = worse status; amenity
nodes expect negative rho; Vacancy expects positive rho) against `index-definition.md` §5 and
`e1_regressions.py`'s own H1 comment and confirm the script's `expected_sign()` matches. This matters
because a domain reviewer reading raw `data_corr` values without this context could misinterpret sign —
the schema.yml description update and the findings-doc header both now state the polarity convention
explicitly, which is the right mitigation (same discipline as the `e1_regressions.py` "D1 POLARITY"
comments this ticket is consistent with).

## 3. Vacancy's opposite-pole framing survives this pass, correctly, by being untouched

`Vacancy` (all three levels) has insufficient data (n<10, current OSM stock too sparse for a
non-degenerate PLR-level read at this leaf) and is correctly left with a blank `data_corr` rather than a
fabricated value. This is the right outcome: Vacancy's full-weight tier rests on Smith's rent-gap theory
alone (per my own OA-B.1 finding), and this pass neither confirms nor undermines that — it simply cannot
yet speak to it. I confirm no attempt was made to force a read out of an under-populated leaf.

## 4. Ethical framing (D-1) is preserved — this remains a diagnostic pass, not a re-targeting exercise

None of the findings are framed as, or risk being read as, an "up-and-coming Kiez" signal — the findings
doc's language stays descriptive ("confirmed", "not confirmed", "flagged for review") and does not
smuggle in a causal-inference claim. I re-affirm the OA-B.1 sign-off's advisory that the eventual
improved-variant public presentation (OA-C.2 #175 / G2 page) must still apply the descriptive-not-causal
framing discipline; this ticket's diagnostic report is appropriately scoped as an internal
methodology-development artifact, not a public-facing claim, and does not itself need that framing
applied (it is in `docs/epic-c/`, not the site).

---

## 5. Conditions

None blocking. One advisory, new:

- **Advisory (OA-B.3 #172):** when documenting the 15 tier-0 "correlated-but-non-causal" nodes in any
  downstream methodology writeup (O2 whitepaper #82, OA-C.2 #175), state explicitly that the correlation
  *confirms* the 2×2's "drop even if correlated" cell rather than implying these nodes were "close calls"
  — a careless paraphrase could make readers think a borderline decision was made, when in fact the drop
  was always unconditional on causal-implausibility grounds alone (§1, bullet 2).

---

## 6. Risks

1. The 6 direction-mismatched tier ≥ 1 nodes are a genuine open question (§1, bullet 3) that this pass
   correctly surfaces but cannot resolve alone — OA-B.3's weighted composite and OA-C.1's three-way
   comparison will be the tickets that show whether these mismatches persist or wash out once the
   domain/category/type LQ is properly weighted rather than read leaf-by-leaf.
2. As the geo-DS sign-off notes, no multiple-comparison correction is applied across 231 tests — I concur
   this is acceptable for a diagnostic pass but flag (jointly with geo-DS) that the 15 "spurious"
   tier-0 findings and 6 direction-mismatches should not be over-read as a definitive list until a
   correction is applied in a more decision-bearing future pass.
3. Roughly half the taxonomy (114/231 nodes) has no data-driven read yet — the improved variant's initial
   ship will rest more heavily on theory alone than a mature OSM dataset would eventually allow.

---

## 7. Certification

The data-driven confirmation pass genuinely respects the non-circularity rule in substance: theory-tier
nodes are never demoted for lacking confirmation, tier-0 nodes remain dropped regardless of any found
correlation, and the six direction-mismatched findings are documented as open questions rather than acted
on unilaterally. The 15 spurious tier-0 correlates are sociologically coherent (civic/administrative
infrastructure and incumbent-serving trades, per Dangschat 1988) rather than noise mistaken for signal.
Vacancy's opposite-pole framing is untouched by an appropriately-blank read. D-1 descriptive-not-causal
framing is preserved. I have no domain-fidelity objection to integrating this into `develop`.

```json
{
  "verdict": "pass",
  "rationale": "The OA-B.2 data-driven confirmation pass respects the ADR-0017 D3 non-circularity rule in substance: 45 causally-plausible (tier>=1) nodes lacking significant confirmation are correctly left at their theory tier rather than demoted (theoretical ambiguity, tier 1, is a legitimate permanent resting place, not a provisional state); the 15 tier-0 'correlated-but-non-causal' findings are sociologically coherent (civic/administrative infrastructure -- bike racks, phone booths, recycling bins, vet clinics, social services, tourist info -- and incumbent-serving trades like car repair, matching Dangschat 1988's invasion-succession distinction) and correctly change nothing since these nodes were already excluded on causal-implausibility grounds alone. The 6 direction-mismatched tier>=1 nodes (Fast Food, Entertainment domain roll-up, Bank Branch, Pet Shop, Sports and Recreation) are genuine, interpretable findings (e.g. Fast Food's mismatch is consistent with its own tier-1 ambiguous rationale, not contradictory) correctly left as open questions for OA-B.3/C.1, not resolved unilaterally. Vacancy's opposite-pole full-weight tier is untouched by an appropriately-blank (insufficient-n) read, preserving Smith's rent-gap framing. Status_index polarity is correctly re-derived and matches the seed schema/findings-doc documentation. D-1 descriptive-not-causal framing is preserved throughout; this is an internal methodology-development diagnostic, not a public claim.",
  "risks": [
    "6 direction-mismatched tier>=1 nodes are a genuine open question this pass surfaces but cannot resolve alone -- OA-B.3/OA-C.1 will show whether they persist once properly weighted",
    "No multiple-comparison correction across 231 tests means the 15 spurious/6 mismatch findings should not be over-read as definitive until a correction is applied in a more decision-bearing future pass",
    "114/231 nodes (roughly half the taxonomy) have no data-driven read yet given current OSM sparsity"
  ],
  "recommendations": [
    "OA-B.3 (#172) / O2 whitepaper #82 / OA-C.2 (#175): when documenting the 15 tier-0 'correlated-but-non-causal' nodes, state explicitly the drop was unconditional on causal-implausibility grounds, not a close call resolved by the correlation finding",
    "OA-C.1 (#174): use the three-way comparison to test whether the 6 direction-mismatched findings persist once domain/category/type OA is properly weighted rather than read leaf-by-leaf"
  ]
}
```

---

## Final Verdict

Verdict: PASS
