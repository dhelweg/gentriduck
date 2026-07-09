# Gentrification Domain Expert Sign-off: OA-B.1 (#170) — seed_poi_offering_relevance

- **Scope:** OA-B.1 #170 — the domain-fidelity half of the R-C1 dual gate on
  `seed_poi_offering_relevance.csv`, the causality-first tier/weight seed that will curate *which* POI
  taxonomy nodes count toward the improved (Workstream 2) offering-advantage signal (ADR-0017 D3).
  Validates that each tier assignment is grounded in the causal-plausibility literature **before** any
  outcome correlation is examined (the non-circularity rule), that the 2×2 (causally-plausible ×
  correlated) framing is honoured, and that ethics/framing guardrails (D-1, D-2) are respected. Seed
  structural soundness is covered separately by `docs/epic-b/B1-oa-relevance-seed-geo-signoff.md`.
- **Operationalizes:** Zukin (2009) *Naked City* (boutique/artisanal "third wave" retail signature);
  Ley (1996) *The New Middle Class* (cultural-intermediary consumption); Lees, Slater & Wyly (2008)
  *Gentrification* (retail-succession indicator list); Dangschat (1988) invasion-succession
  (incumbent-serving trades displaced BY upgrading are not themselves signal-bearing); Smith
  (1979/1987) rent-gap/disinvestment reading of vacancy; Florida (2002) creative class (coworking);
  Gotham (2005) tourism gentrification; ADR-0017 D2–D3 (multi-signed bundle, faithful/improved split,
  causality-first-with-data-confirmation rule).
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-09
- **Branch:** feature/170-oa-b1-seed-poi-offering-relevance → develop
- **Geo-DS verdict:** PASS (`docs/epic-b/B1-oa-relevance-seed-geo-signoff.md`)
- **Verdict:** PASS

---

## 1. The causality-first ordering is genuinely respected, not merely asserted

Every `causal_rationale` cell states a theoretical claim with no reference to any Berlin outcome data
(MSS trajectory, rent levels, or the 2018 golden) — I checked this is true across the file, not just in
the header prose. Tier assignments track the literature's own distinctions:

- **Signature "third wave" retail** (Cafe/Coffee, Boutique clothing, independent bookstores,
  Delicatessen, coworking, boutique fitness) is correctly tiered **3** — this is precisely the retail
  vocabulary Zukin (2009) and Lees/Slater/Wyly (2008) single out as the observable commercial-succession
  signature, and matches the worked examples already accepted into the codebase (the original
  `seed_poi_canonical_category.csv` stub's `coworking_space=true`, `yoga_studio=true`).
- **Incumbent-serving trades displaced BY gentrification rather than signalling it** (hardware stores,
  auto/bicycle repair, laundromats, travel agencies) are correctly tiered **0**, citing Dangschat
  (1988) — this is the right theoretical distinction: a trade's *presence* predating upgrading is not
  evidence *of* upgrading, and a naive "more retail = more OA" reading would have wrongly rewarded these.
- **Civic/public infrastructure sited by administrative logic, not commercial-market response**
  (transit stops, benches, toilets, vending, mailboxes, cemeteries, embassies, playgrounds) is correctly
  tiered **0** across the board — this is exactly the ticket's own framing ("benches, toilets, vending,
  public transport... are not characteristic-shaping") and is theoretically sound: none of these are
  sited in response to neighbourhood retail-market change.

## 2. The 2×2 framing is honoured — tier-0 is reserved for genuine non-plausibility, not merely "unknown"

I distinguish two reasons a node could plausibly be excluded, and the seed keeps them separate:

- **Tier 0 ("drop")** is reserved for nodes with **no established causal mechanism** connecting them to
  commercial gentrification (civic infrastructure, incumbent trades, funeral services, static heritage
  sights). This is correct: these should be dropped even if a future correlation pass found them
  spuriously correlated with an outcome (e.g. transit stops correlating with density generally) —
  exactly the "not causally plausible → DROP even if correlated" cell of ADR-0017's 2×2.
- **Tier 1 ("keep, low weight")** is used for genuinely **ambiguous** cases where theory does not decide
  cleanly either way (fast food, generic hairdressers, generic restaurants, generic office space,
  hardware-adjacent bicycle shops). This is the correct home for nodes that should be *confirmed or
  down-weighted by data* (OA-B.2 #171), not pre-judged — I confirm none of these tier-1 rationales
  smuggle in an implicit outcome-based judgment; each states an honest theoretical ambiguity.

This tier-0/tier-1 distinction is the load-bearing mechanism that keeps the improved variant
non-circular, and I confirm it is applied consistently rather than tier-0 being used as a catch-all for
"types I'm not sure about."

## 3. Vacancy's opposite-pole sign is correctly preserved and explicitly flagged

`Vacancy` is tiered 3 (full theoretical weight, since Smith's rent-gap disinvestment reading is exactly
as strong a signal as amenity-boutiquing, just at the opposite pole) and its rationale states, by name,
that it is **not** an amenity-offering signal and must never be summed with amenity rows into one score
(ADR-0017 D-2). This matches my own OA-A.2 finding almost verbatim and correctly propagates the
multi-signed-bundle discipline into the new curated-weighting workstream, where the risk of an
accidental sign-blind sum is arguably *higher* than in the faithful Run 1 (a weighted composite index
is exactly the kind of artifact that invites naive summing). I flag as an **advisory condition** (not
blocking, matching the geo-DS sign-off) that OA-B.3 (#172) must implement Vacancy as a structurally
separate signal, not rely on this seed's comment alone.

## 4. Ethical framing (D-1) is preserved at the curation stage

None of the tier-3 ("signature") assignments read as encoding a "targeting" or "up-and-coming Kiez"
signal — they are drawn directly from the academic retail-succession literature as *descriptive*
correlates of commercial change, consistent with D-1's descriptive-not-causal framing. I note (as an
advisory, carried to OA-C.2/G2 rather than blocking here) that once OA-B.3 computes the actual weighted
improved-variant score, the same D-1 framing discipline used for the faithful OA (OA-A.5 #169, the #155
public-framing precedent) must be reapplied to the improved-variant public presentation, since a
*curated, weighted* score could read as more "authoritative" to a lay audience than the faithful
uncurated OA — a framing risk specific to this workstream that the faithful Run 1 did not carry.

## 5. Faithful/improved separation preserved — no leakage into Run 1

This seed is net-new and does not modify `int_poi_offering_advantage` (#166) or any faithful-Run-1
artifact; it exists purely as an input to the not-yet-built OA-B.3 (#172) improved index. I confirm the
firm rule (ADR-0017 D3) is respected: no existing faithful-variant row is touched, curated, or dropped
by this ticket.

---

## 6. Conditions

None blocking. Two advisory, carried forward:

- **Advisory (OA-B.3 #172, same as geo-DS):** implement Vacancy's disinvestment signal as a structurally
  separate component, not merely documented in this seed's `causal_rationale`.
- **Advisory (OA-C.2 #175 / G2 page, new):** when the improved-variant weighted score is published,
  apply the same descriptive-not-causal framing discipline (D-1) used for the faithful OA, with explicit
  language that curation reflects *theoretical* plausibility, not a validated causal test — a curated
  score is more prone to being over-read as "the corrected answer" than the faithful baseline.

---

## 7. Risks

1. ~140 category-inherited (non-overridden) type-level tiers carry the same rationale as their category
   default rather than an individually-cited source — theoretically defensible as a default (I checked
   the category-level defaults themselves are all cited) but means OA-B.2's data-driven confirmation
   pass bears more of the calibration burden for those types, same risk flagged by geo-DS.
2. A future reader could mistake tier-3 ("signature") for "causally proven driver of gentrification"
   rather than "theoretically plausible descriptive correlate, pending data confirmation" — mitigated by
   the tier semantics being spelled out in `schema.yml` and the advisory condition above.
3. The tier-1 "ambiguous, keep low weight" bucket is large (59 of 231 rows) — this is appropriate given
   genuine theoretical ambiguity across many everyday-retail/service types, but means OA-B.2's
   data-confirmation pass on this bucket materially shapes the improved variant's final composition.

---

## 8. Certification

The seed's tier assignments are grounded in the causal-plausibility literature, set independently of any
outcome data, and correctly distinguish "not causally plausible" (tier 0, immune to future correlation)
from "theoretically ambiguous, pending data confirmation" (tier 1) — the exact 2×2 structure ADR-0017
D3 requires for non-circularity. Vacancy's opposite-pole disinvestment reading and the D-1
descriptive-not-causal framing are both correctly carried forward. I have no domain-fidelity objection
to integrating this into `develop`.

```json
{
  "verdict": "pass",
  "rationale": "seed_poi_offering_relevance.csv's causal_rationale column grounds every tier assignment in causal-plausibility theory (Zukin 2009, Ley 1996, Lees/Slater/Wyly 2008, Dangschat 1988, Smith 1979/1987, Florida 2002, Gotham 2005) independent of any outcome data, and correctly implements the ADR-0017 D3 2x2: tier-0 ('not causally plausible') is reserved for nodes with no established mechanism linking them to commercial gentrification (civic/public infrastructure, incumbent-serving trades displaced BY upgrading, static heritage sites) so they remain excluded even if later found spuriously correlated, while tier-1 ('ambiguous') is the correct home for genuinely undecided cases (fast food, generic hairdressers/restaurants/office) pending OA-B.2's data-driven confirmation. Signature tier-3 assignments (specialty cafes, boutiques, independent bookstores, delicatessens, coworking, boutique fitness) match the literature's own retail-succession vocabulary and the already-accepted seed_poi_canonical_category.csv stub precedent. Vacancy is correctly tiered at full weight as the Smith rent-gap opposite-pole disinvestment marker, explicitly flagged (citing ADR-0017 D-2) as never to be summed with amenity rows. The faithful Run 1 (int_poi_offering_advantage, OA-A.2) is untouched by this net-new seed, preserving the firm faithful/improved separation.",
  "risks": [
    "~140 category-inherited (non-overridden) type-level tiers rely on their category default's citation rather than an individually-cited source, shifting more calibration weight onto OA-B.2's data-driven pass for those types",
    "Tier-3 ('signature') could be misread by a future consumer as a causally-proven driver rather than a theoretically-plausible descriptive correlate pending data confirmation",
    "The 59-row tier-1 ('ambiguous') bucket is large, so OA-B.2's data confirmation materially shapes the improved variant's final composition"
  ],
  "recommendations": [
    "OA-B.3 (#172): implement Vacancy's disinvestment signal as a structurally separate component from the amenity-offering weighted composite, per ADR-0017 D-2 (same recommendation as the geo-DS sign-off)",
    "OA-C.2 (#175) / G2 methodology page: apply the same descriptive-not-causal (D-1) framing discipline to the improved-variant weighted score as was applied to the faithful OA (#155 precedent), explicitly naming that curation reflects theoretical plausibility, not a validated causal test",
    "OA-B.2 (#171): prioritize data-driven confirmation coverage on the tier-1 ambiguous bucket and the category-inherited types, since they carry the least individually-cited theoretical support"
  ]
}
```

---

## Final Verdict

Verdict: PASS
