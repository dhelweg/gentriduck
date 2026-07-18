# OA-D3b zscore_slq (#280, ADR-0024) — gentrification-domain-expert sign-off

**Verdict: PASS WITH A LABELLING CONDITION**

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with
  `OA-D3b-zscore-geo-signoff.md`).
- **Artifact under review:** `int_poi_offering_advantage_methods.sql` (method 7,
  `zscore_slq`) + `mart_poi_oa_methods.sql` + `seed_oa_calculation_methods.csv`
  — the binomial-significance z-score method, reviewed against OA-D0's binding
  conditions (`OA-D0-domain-signoff.md`) and the precedent set by
  `OA-D3-domain-signoff.md`.
- **Reviewer:** gentrification-domain-expert.
- **Date:** 2026-07-17.

---

## Summary judgement

Like OA-D3's core six, this slice **re-expresses the same already-approved
OA construct** (the local/city share pair) rather than introducing a new
signal-domain, dominance model, or displacement-targeting surface. It does
not touch the within-group dominance allow-list (Condition A), the dominance
ethics statement (Condition B), or density/per-capita's provision/exposure
framing (Condition C) — those remain scoped to D4 and the deferred remainder
of #280 respectively. The operative condition here is again **Condition E**
(nested-LQ is the sole 2018 construct) plus a **new, narrower concern this
specific method introduces**: `zscore_slq` borrows the vocabulary of
inferential statistics ("z-score", "significance") for a **descriptive**
figure, on a project whose subject matter (neighbourhood change, displacement
risk) makes "statistically significant" a loaded, easily-misread phrase to a
lay public reader. I confirm the construction is domain-valid and require one
binding labelling condition to close that gap; I do not require a rebuild.

## Verification against OA-D0 Condition E (nested-LQ remains the sole anchor)

Confirmed unchanged from the OA-D3 review: `nested_lq`'s `golden_anchored =
true` / all other methods `false` in `seed_oa_calculation_methods.csv` is
preserved; `zscore_slq`'s seed row correctly carries `golden_anchored =
false`. `zscore_slq` is explicitly a NEW instrument (a significance reading
of the same ratio), never a redefinition of the thesis construct.

## New condition: "significance" language must not be read as a causal or
## normative claim (binding, carried to any future D6/D7/site surface)

A z-score/binomial-SLQ answers a specific, narrow statistical question: *is
the local count far from what a Bernoulli(p=city_share) null model would
produce by chance, given the local sample size?* This is a legitimate and
useful base-awareness instrument (it correctly distinguishes "LQ=2 on 5 POIs"
from "LQ=2 on 500 POIs" — the same directional signal OA-D0 Condition C.4
already requires: *don't blend, label by question*). The domain risk is
specifically in the WORD "significance" reaching a non-technical reader on a
displacement-adjacent public surface:

1. **Statistical significance ≠ gentrification significance.** A high `|z|`
   means "this over/under-representation is unlikely to be sampling noise
   given the local base" — it does NOT mean "this area is significantly
   gentrifying," "this is a strong effect," or "this matters more than a
   lower-|z| area." A large, well-mapped PLR can produce a large `|z|` for a
   modest, unremarkable LQ purely because its base is large (the geo sign-off
   already documents this precisely: at fixed LQ, `|z|` grows with N). A
   thin, under-mapped PLR (frequently a lower-income Kiez, per the
   Haklay 2010 coverage-non-neutrality finding this project's own D-3/C3
   machinery already exists to guard against) will systematically produce
   SMALLER `|z|` even when its true LQ is just as extreme — which risks
   exactly the anti-erasure failure mode #274/OA-D0 Condition B.4 already
   name: an under-mapped, lower-income area's real over-representation
   reading as "not significant" and disappearing from a ranked/filtered view.
2. **Not a hypothesis test with error-rate control.** No multiple-comparison
   correction is applied (this model computes a z-score per taxonomy leaf ×
   area × year — hundreds of thousands of simultaneous "tests"). Presenting
   `zscore_slq` with conventional significance thresholds (`|z|>1.96`) as if
   each were an independent, corrected hypothesis test would systematically
   overstate how many "significant" cells exist by chance alone (this is the
   Getis-Ord FDR caveat from OA-D0 Condition C9/C3 restated for a different
   method — the same false-discovery risk applies here at even higher volume
   since this method ships at full taxonomy leaf grain, unlike the
   BZR/domain-restricted Gi* the geo sign-off recommends).

**Binding condition:** any future consumer of `zscore_slq` (D6 comparison
study, D7 methodology page, or any site surface) MUST (a) never use the bare
word "significant" without the qualifier "statistically, relative to a
null model of the citywide rate — not a claim about gentrification
importance or effect size," (b) always pair `zscore_slq` with its
corresponding `nested_lq` value (mirrors the dominance sign-blindness
pairing rule, Condition B.2 — a z-score alone answers "is this surprising
given the sample size", never "is this a big effect"; the LQ is what answers
the magnitude question), and (c) disclose the no-multiple-comparison-
correction caveat if any thresholded/ranked view of `zscore_slq` is ever
published. This condition binds the DOWNSTREAM consumer, not this ticket —
`int_poi_offering_advantage_methods`/`mart_poi_oa_methods` are internal
model/mart layers with no public copy yet, so nothing here is currently
misleading a reader; the condition exists so the labelling discipline is not
lost by the time a page consumes this column (mirrors how OA-D0's Conditions
A–D were carried onto D3/D4/D7 rather than re-litigated at each step).

## Verification against the deferred scope (correctly out of this slice)

Consistent with the OA-D3 domain sign-off: no dominance construct, no
density, no per-capita, no cuisine-typed concentration is introduced by this
change. Getis-Ord's specific hotspot-targeting misuse risk (OA-D0 Condition
C.3) remains scoped to its own ADR-0025-gated slice and is not implicated by
a scalar z-score column with no spatial-clustering claim.

## Epic B framing (re-confirmed)

`zscore_slq` does not alter, re-derive, or compete with `nested_lq`'s
pass-through values — verified by the geo sign-off's build/test results and
this review's read of the model SQL. Directional revival framing (CLAUDE.md
Epic B) is unaffected.

## Untrusted input (SEC-3)

This review consumed only in-repo code, the OA-D0/OA-D3 domain sign-offs,
ADR-0024, the #280 issue body, and the geo sign-off's data-sanity results —
no web-fetched or non-maintainer issue text was treated as instructions.

---

**Verdict: PASS WITH A LABELLING CONDITION.** The construction is
domain-valid, correctly preserves `nested_lq` as the sole 2018-golden anchor
(Condition E), and correctly leaves the higher-risk dominance/density/
per-capita/Getis-Ord scope untouched. The binding condition — never present
"significance" as a gentrification-importance claim, always pair with the
underlying LQ, disclose the no-correction caveat if ever thresholded/ranked
— carries forward to any future D6/D7/site consumer of this column, mirroring
how OA-D0's own conditions were front-loaded rather than re-litigated. No
rebuild is required to close this condition; it is a downstream labelling
obligation, not a defect in what was built here.
