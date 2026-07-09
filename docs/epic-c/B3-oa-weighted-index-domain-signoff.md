# Gentrification Domain Expert Sign-off: OA-B.3 (#172) — weighted offering-advantage → gentrification_index

- **Scope:** OA-B.3 #172 — the domain-fidelity half of the R-C1 dual gate on the tier-weighted
  amenity composite (`int_poi_amenity_weighted_base*`, `int_poi_status_dynamism_improved`) and its
  wiring into `int_gentrification_ts`/`gentrification_index` as `methodology_variant='improved'` /
  `variant='improved'`. Validates that the theory-tier weighting is applied faithfully to the intent
  set in OA-B.1/B.2, that Vacancy's opposite-pole framing survives the aggregation step, and that the
  public-facing mart contract does not smuggle a causal or outcome-recomputation claim into the new
  variant.
- **Operationalizes:** Dangschat (1988) invasion-succession; Zukin (2009), Ley (1996), Lees/Slater/
  Wyly (2008) retail-succession signature (the theory basis for `offering_weight`); Smith (1979/1987)
  rent-gap/disinvestment (Vacancy opposite pole, ADR-0017 D-2); ADR-0008 predictor/outcome separation
  (R-A1, #64) — the exact conflation this ticket must not reintroduce for the new variant.
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-09
- **Branch:** feature/172-oa-b3-weighted-index → develop
- **Geo-DS verdict:** PASS (`docs/epic-c/B3-oa-weighted-index-geo-signoff.md`)
- **Verdict:** PASS

---

## 1. The theory-tier weighting is applied as OA-B.1/B.2 intended, not reinterpreted

I checked that `int_poi_amenity_weighted_base` consumes `seed_poi_offering_relevance`'s `offering_weight`
column exactly as authored — tier 0 → weight 0.0 (dropped), tier 1 → 0.33, tier 2 → 0.66, tier 3 → 1.0
(my own OA-B.1 sign-off's tier-weight scale) — with no re-derivation, re-normalization, or reinterpretation
of what those weights mean. This matters because the weights carry the actual theoretical content (Zukin's
"third wave" retail signature, Dangschat's incumbent-serving exclusion, Florida's coworking worked example,
etc.) — a wiring ticket that silently changed the weight scale or reintroduced dropped (tier-0) nodes at
non-zero weight would undermine the causal-tier curation this whole workstream exists to encode. I confirm
the wiring is a faithful mechanical application of the OA-B.1/B.2 curation, not a reinterpretation.

## 2. Vacancy's opposite-pole status survives the aggregation, structurally

This was my primary domain-fidelity concern going into this review: aggregating many weighted leaf counts
into a single composite is exactly the kind of step that could silently re-introduce a Vacancy-into-amenity
blend (the specific error ADR-0017 D-2 exists to prevent — summing a disinvestment marker into an amenity
score would produce a nonsensical composite where high vacancy AND high amenity offering could cancel each
other into a falsely "neutral" reading). I verified `int_poi_amenity_weighted_base`'s `aggregated` CTE uses
two disjoint `SUM(CASE WHEN poi_domain_h != 'Vacancy' ...)` / `SUM(CASE WHEN poi_domain_h = 'Vacancy' ...)`
branches — Vacancy literally cannot enter `amenity_weighted_count`'s sum. `disinvestment_score_improved`
is exposed as its own column throughout the chain (int_poi_status_dynamism_improved →
int_gentrification_ts), never combined back into `status_score_improved`/`dynamism_score_improved`. I have
no domain-fidelity objection here — the disinvestment/rent-gap signal (Smith 1979) is correctly preserved
as its own, oppositely-signed series.

## 3. The `gentrification_index` mart's 'improved' variant does not smuggle in an outcome claim

I read the new `variant='improved'` SELECT block in `gentrification_index.sql` specifically looking for
whether it implies a recomputed D1 (social status) or D2 (Dynamik) *outcome* — it does not.
`status_class`/`dynamism_class`/`status_class_bi`/`dynamism_class_bi` are all explicitly `NULL`, and the
schema.yml documentation states this variant carries a continuous PREDICTOR z-score, not an MSS-derived
typology. This is the correct call: the improved OA composite is still, per the OA construct's own D-1
guardrail (ADR-0017 D5, first affirmed in my OA-A.2 sign-off), a descriptive early-gentrification
*indicator*, not a re-measurement of social status itself — publishing a typology stage derived from it
would risk exactly the "up-and-coming Kiez" targeting-signal framing the D-1 guardrail prohibits. Keeping
the class columns NULL for this variant is the right way to avoid that risk at the data-contract level,
ahead of any public-facing page (OA-C.2 #175) that will need its own framing review.

## 4. Berlin-only scope is domain-appropriate, not merely a data-availability shortcut

Restricting the improved predictor to Berlin lor_2021 (§2.2 of the geo-DS sign-off) is also the right
domain call, not just a convenience: the `offering_weight` tiers cite literature (Zukin, Ley, Lees/Slater/
Wyly) interpreted specifically against Berlin's commercial-succession context and OSM taxonomy density.
Applying the same numeric tiers to Hamburg's retail landscape or the thesis-era (2015-2019) commercial
mix without a fresh domain review would be exactly the kind of "silent" methodology transfer this project's
process is designed to avoid (cf. ADR-0014's explicit non-equivalence notes for Hamburg's Sozialmonitoring
cadence). I concur this should remain out of scope here.

---

## 5. Conditions

None blocking. One advisory, carried forward from OA-B.2 (unchanged, still open):

- **Advisory (OA-C.2 #175 / O2 #82):** when the improved variant reaches a public-facing page, apply the
  same descriptive-not-causal (D-1) framing discipline already required of the faithful OA variant — the
  tier-weighted composite is still not a displacement predictor or a "next hot Kiez" signal, and a reader
  unfamiliar with the theory-tier curation could easily over-read a single "improved" composite score as
  more authoritative than the faithful variant, when in fact it answers a different question (curated
  predictive signal vs. thesis-fidelity backtest) — the three-way comparison framing (OA-C.1 #174) is the
  right place to make this distinction explicit to a public reader.

---

## 6. Risks

1. As geo-DS notes, one taxonomy leaf (`coworking_space`) is unmapped and silently defaults to weight 0 —
   domain-fidelity impact is negligible (a single low-volume leaf, itself tier-3/full-weight in the seed had
   it matched, so the *direction* of the gap is conservative/undercounting a positive signal, not
   overcounting), but should be reconciled for taxonomy completeness.
2. The `data_corr` calibration advisory from OA-B.2 remains open (geo-DS §2.1) — the improved variant is
   theory-tier-only; I do not consider this a domain-fidelity gap (theory-tier weighting alone is a
   defensible, citable methodology), but flag it as unfinished business for OA-C.1's comparison.
3. Publishing an "improved" composite risks a reader conflating it with a more "correct" or "final" score
   relative to the faithful variant, if the eventual public page does not explicitly frame the two as
   answering different questions (§5 advisory).

---

## 7. Certification

The theory-tier weighting from OA-B.1/B.2 is applied faithfully and mechanically (no reinterpretation of
tier weights or dropped-node reintroduction). Vacancy's opposite-pole disinvestment framing is preserved
structurally through the aggregation (disjoint SUM branches, never combined with the amenity composite).
The new `gentrification_index` variant correctly avoids implying a recomputed social-status outcome
(explicit NULL typology columns, documented predictor-only semantics) — the R-A1 predictor/outcome
separation is not reintroduced as a conflation. The Berlin-only scope restriction is domain-appropriate,
not merely a shortcut. I have no domain-fidelity objection to integrating this into `develop`.

```json
{
  "verdict": "pass",
  "rationale": "The tier-weighted amenity composite applies seed_poi_offering_relevance's offering_weight exactly as authored in OA-B.1/B.2 (no re-derivation or reinterpretation of the causal-tier scale), and Vacancy is structurally excluded from the amenity aggregate via disjoint SUM(CASE WHEN...) branches rather than a signed sum -- the disinvestment/rent-gap opposite-pole framing (Smith 1979, ADR-0017 D-2) survives the aggregation step, which was the primary domain-fidelity risk of this ticket. The new gentrification_index 'improved' variant correctly avoids implying a recomputed D1/D2 social-status outcome: status_class/dynamism_class/*_class_bi are explicitly NULL and documented as carrying a continuous predictor score only, preserving the D-1 descriptive-not-causal guardrail and the R-A1 predictor/outcome separation (ADR-0008) rather than reintroducing that conflation for the new variant. Restricting the improved predictor to Berlin lor_2021 is domain-appropriate (the offering_weight tiers cite literature interpreted specifically against Berlin's current commercial-succession context and OSM taxonomy), not merely a data-availability shortcut -- extending to Hamburg or the thesis-era system would need its own domain review.",
  "risks": [
    "One taxonomy leaf (coworking_space) is unmapped and defaults to weight 0 -- negligible impact (single low-volume leaf, direction is conservative/undercounting), should be reconciled for taxonomy completeness",
    "OA-B.2's data_corr calibration advisory remains open -- the improved variant is theory-tier-only for now, not a domain-fidelity gap but unfinished business",
    "A public-facing 'improved' page must explicitly frame this as answering a different question from the faithful variant (curated predictive signal vs. thesis-fidelity backtest), not a 'more correct' successor score"
  ],
  "recommendations": [
    "OA-C.2 (#175) / O2 (#82): apply the same D-1 descriptive-not-causal framing discipline to the improved variant's public presentation, and use the three-way comparison (OA-C.1 #174) to make explicit that faithful and improved answer different questions"
  ]
}
```

---

## Final Verdict

Verdict: PASS
