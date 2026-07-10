---
task: H-C3 / #160 — Annual-cadence Hamburg lead-lag model + independent H3a/H3b re-test
author: gentrification-domain-expert
date: 2026-07-10
branch: feature/160-hc3-hamburg-lead-lag
---

# Domain sign-off — H-C3 annual-cadence Hamburg lead-lag model + independent H3a/H3b/H3c re-test

- **Branch:** `feature/160-hc3-hamburg-lead-lag`
- **Issue / task:** #160 [H-C3]; standing SE-clustering requirement #129 [H2-SE].
- **Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory gate, R-C1)
- **Paired gate:** geo-data-scientist (spatial/statistical soundness). This is the **domain half**
  of the R-C1 dual sign-off. Statistical correctness of the hand-rolled CR1 cluster-robust
  estimator, the Stadtteil-clustering decision, cadence redesign, and the symmetric-Spearman
  property are the geo-DS's remit and are **not re-adjudicated here**; I take the statistical
  re-derivation (reviewer independently reproduced the SEs to 4 d.p. via a separate code path) as
  given and assess *theory fidelity* and *indicator meaning* only.
- **Artefacts reviewed:** the full `git diff` on this branch and the two untracked additions —
  `transform/models/intermediate/int_hamburg_lead_lag.sql`, `analysis/e5_hamburg_lead_lag.py`,
  `docs/epic-h/E5-hamburg-lead-lag-findings.md`; the additive `stadtteil_code` passthrough in
  `int_ewr_socioeco_hamburg_disagg.sql` and its `schema.yml` entry; the `pyproject.toml` `poe
  analysis` registration; the Berlin parent `int_mss_lead_lag.sql` and `analysis/e1_regressions.py`
  (`test_h3`) it mirrors; Berlin's own results in `docs/epic-e/E1-regression-findings.md`; ADR-0014
  (Hamburg data sources); `docs/epic-h/H1-geo-signoff.md` Condition 2; the #158/#159 precedent
  sign-offs; and `transform/models/marts/schema.yml` (confirming published-mart `accepted_values`).

## What actually changed (scoping the review)

Three substantive additions, all Hamburg-only and additive: (1) `int_hamburg_lead_lag`, a structural
mirror of Berlin's `int_mss_lead_lag` that builds a change→change lead-lag panel on Hamburg's
**annual** Sozialmonitoring series with the cadence redesign `edition_tk = edition_t + lag_k * 1`
(vs Berlin's `* 2`); (2) `e5_hamburg_lead_lag.py`, which re-runs the thesis's H3a/H3b/H3c
temporal-order tests on that panel — a bivariate Spearman section (mirroring `e1`'s `test_h3`) plus a
D4-controlled OLS section with Stadtteil-clustered SEs (#129); (3) a passthrough `stadtteil_code`
column on `int_ewr_socioeco_hamburg_disagg` purely to carry the clustering key. **No indicator was
re-signed, re-weighted, or re-normalized.** D1 polarity (status_index = 4 = *sehr niedrig* = most
deprived; positive delta = worsened), the C5-corrected dynamism_score, and the D4-baseline-LEVEL-only
discipline are all carried over from the Berlin model unchanged. `int_mss_lead_lag` is untouched.

## Q1 — Is a weak/non-significant/partially-contradictory Hamburg result a legitimate honestly-reportable finding, or does it warrant a *substantive theoretical* (not merely statistical) caveat before merge?

**It is a legitimate, honestly-reportable finding, and it also warrants a substantive theoretical
caveat — but a carefully *bounded* one: this is a failure to independently *confirm* Berlin's
empirical instantiation of Dangschat on Hamburg, not a *refutation* of the invasion-succession
framework.** Three points ground this.

First, on what the numbers say. The change→change directional test that can actually distinguish
H3a from H3b is Section 2 (the D4-controlled OLS; Section 1's Spearman is symmetric by construction
and correctly disclosed as a co-movement, not a precedence, test). There, **all 6 coefficients are
correctly signed (negative = theory-consistent) but none reach p<0.05** (0/6 significant). That is
the textbook signature of a *correctly-oriented but under-powered* result, not a contradictory one.
"Correctly-signed-but-weak" is a materially different domain claim from "oppositely-signed," and the
doc's scorecard (6/6 directional, 0/6 significant) reports exactly that. Under Epic B's directional-
revival framing (CLAUDE.md), an honest partial-null is an acceptable and expected outcome; #80 set
that precedent and the doc invokes it.

Second, on the theory. Dangschat's (1988) double invasion-succession cycle is a *city-agnostic
mechanism*; the thesis's H3b-*confirmation* is Berlin-specific empirics, and the correct scientific
posture — which #160 mandates — is to re-test it independently rather than transplant it. A single
under-powered city re-test cannot refute a mechanism; it can only decline to reproduce a prior
empirical instantiation. The model header and script docstring both state this explicitly and refuse
to copy Berlin's confirmed/rejected labels onto Hamburg (`expected_sig = "UNKNOWN"`). That is the
theoretically-honest framing.

Third — and this is the one genuine caveat I attach — **the findings doc currently reports the
weakness but never states the domain conclusion in words.** The "Comparison to Berlin" section is a
pointer ("See Section 1 above for whether Hamburg... match[es] or diverge[s]") rather than a
sentence. A reader has to derive "Hamburg does not independently replicate Berlin's H3b-dominance;
the evidence is correctly-signed but non-significant" from the tables themselves. This is
*under-claiming*, not over-claiming, so it does not threaten theory fidelity or honesty — but it
leaves the substantive conclusion implicit where it should be explicit. **Recommendation
(non-blocking): add one interpretive sentence** stating the correctly-signed-but-under-powered
conclusion plainly, so the doc's headline is a stated finding rather than an exercise left to the
reader. See recommendation 1.

## Q2 — Is there a plausible *domain-level* (not just statistical) explanation for Hamburg's divergence worth noting as a limitation / future-work avenue?

**Yes — several, and the doc should name at least the housing-market/urban-structure ones as a short
domain-limitation paragraph.** The doc currently lists only *technical* limitations (cadence
non-equivalence, Dynamik-window mismatch, cluster attrition). The substantive reasons Hamburg might
genuinely differ from Berlin are absent, and they are exactly the "avenue for future work" the ticket
asks about:

1. **Berlin's gentrification wave is partly sui generis.** The post-reunification rent gap (Smith's
   rent-gap theory) and the compressed 2000s–2010s upgrading of the inner east are an unusually sharp
   natural experiment (Holm 2010; Bernt/Grell/Holm). Hamburg's upgrading is real but more gradual and
   spatially dispersed, which mechanically weakens a lead-lag signal measured over a short annual
   window.
2. **Tenure and housing-stock structure.** Hamburg's large municipal (SAGA) and cooperative sector
   and its "Drittelmix" social-housing tradition dampen and spatially fragment the rent-gap-driven
   commercial-then-social (or social-then-commercial) coupling that Dangschat's cycle predicts —
   a different displacement/succession tempo than Berlin's.
3. **Port-city spatial structure.** The very Stadtteile that drop out of the D4 regression
   (Kleiner Grasbrook, Finkenwerder, Steinwerder, Waltershof, Moorburg, Neuland) are the
   industrial/harbor/airport zones. Large low-population industrial polygons interleaved with
   residential ones is a Hamburg-specific morphology that attenuates the POI↔social coupling the
   test measures.
4. **Sozialmonitoring construction vs MSS, and status stickiness.** Hamburg's Sozialmonitoring is not
   MSS: annual cadence, a 3-year Dynamik window (vs Berlin's 2-year), and a different indicator
   basket. Critically, the #159 spike established that Hamburg's `status_index` is extremely sticky
   (~64% of areas never change across 13 editions; only ~4.3% ever exceed a range of 1). **A
   dependent/predictor variable with near-zero variance mechanically attenuates any correlation** —
   this is half a statistical fact and half a substantive property of how Sozialmonitoring quantizes
   social status, and it is the most likely proximate reason the coefficients are correctly-signed
   but small. This is genuinely worth surfacing because it bears on *what the indicator can detect*,
   not just on p-values.

None of these needs to be *resolved* in this ticket. **Recommendation (non-blocking): add a brief
"Domain limitations / why Hamburg may differ" note** citing (at minimum) the status-stickiness
attenuation and one or two of the housing-market/urban-structure points, flagged as future-work
avenues. See recommendation 2.

## Q3 (H3c) — Is the directionally-wrong-and-significant contemporaneous H3c a domain-plausible genuine finding, or a red flag that the operationalization doesn't match the theory?

**It is a domain-plausible genuine finding and NOT a red flag about the operationalization — and the
decisive piece of evidence is that Berlin's own dynamism-based H3c behaves identically.** I checked
`docs/epic-e/E1-regression-findings.md`: Berlin's `Spearman(dynamism_score_t, status_index_t)` H3c is
**also positive and significant** (rho ≈ +0.063 at k=1, +0.079 at k=2, both FAIL vs the "negative"
expectation), exactly mirroring Hamburg's +0.076/+0.085/+0.093. Hamburg is therefore *replicating a
Berlin pattern*, not exhibiting a Hamburg-specific defect. Two further points confirm this is
substantive, not a bug:

- **H3c is a flow-vs-stock measure, unlike change-vs-change H3a/H3b.** It correlates a *change* proxy
  (dynamism_score_t, the C5-corrected z-score of YoY POI-share change) against a *level*
  (status_index_t). This asymmetry is precisely why the thesis itself left H3c "UNCLEAR" (thesis
  p.91). A positive sign here says: **contemporaneous commercial churn concentrates in
  currently-*more-deprived* areas** — which is exactly what rent-gap theory (Smith) and the *invasion*
  phase of Dangschat's cycle predict. The pioneer/commercial invasion happens where the rent gap is
  largest, i.e. in areas not yet upgraded. The negative "expected" direction encodes the *end-state*
  co-location of amenities with already-high status; a contemporaneous *change* measure captures the
  *process*, which lives in the not-yet-upgraded areas. So the sign flip is theory-legible.
- **The sign is a property of the construction, confirmed within Berlin.** The same Berlin findings
  file shows a *different* H3c panel — `poi_count_t ~ ewr_composite_t`, a level-vs-level measure —
  coming out strongly *negative* and PASS (rho ≈ −0.41). Level-vs-level behaves as theory's
  end-state prediction expects; change-vs-level does not. This internal Berlin contrast proves the
  sign is driven by the flow/stock construction, not by anything Hamburg-specific.

So H3c is faithfully operationalized (it matches Berlin's construction exactly) and the divergent
sign is a genuine, cross-city-consistent substantive signal, correctly reported as FAIL and flagged
rather than hidden. **Recommendation (non-blocking): the doc should note the Berlin H3c parallel and
the invasion-phase/rent-gap reading**, which reframes H3c from "Hamburg points the wrong way
(possible mismatch)" to "Hamburg replicates Berlin's contemporaneous flow-vs-stock pattern, which is
consistent with rent-gap/invasion dynamics." This strengthens, not weakens, the doc's credibility.
See recommendation 3.

## Q3 (overclaim) — Confirm the doc doesn't overclaim: an honest partial-null re-test consistent with thesis W3, not a "confirmation" or "refutation" of Dangschat writ large.

**Confirmed — no overclaim.** The doc: (a) opens with a "Do NOT assume Berlin's finding" section and
frames the whole exercise as an *independent re-test*, not a confirmation; (b) reports both
scorecards honestly, including the 0/6 significance in the directional Section 2 and the H3c FAILs;
(c) does not relabel Hamburg with Berlin's confirmed/rejected verdicts (`expected_sig = "UNKNOWN"`);
(d) invokes Epic B directional framing and the #80 honest-null precedent; (e) does not use the words
"confirmed"/"refuted" of Dangschat's theory anywhere. This is fully consistent with thesis finding
**W3**'s own caution that this is *correlational, temporally-ordered* inference, not
causally-identified — a single under-powered city re-test can neither confirm nor refute the
mechanism, and the doc does not claim it does. The only gap is the *under*-claiming noted in Q1
(the conclusion is left implicit); fixing that (recommendation 1) makes the honest partial-null
*more* legible, it does not correct an overclaim.

## Q4 — Confirm no publication-scope creep.

**Confirmed.** I verified the diff and `transform/models/marts/schema.yml`:

- Every **gentrification-bearing published mart** retains `city_code accepted_values: ["BER"]` —
  `gentrification_index` (line 42), and the change/trajectory/index marts at lines 228, 500, 687,
  869 — all **unchanged and none in this ticket's diff**. The one `["BER","HH"]` entry (line 361) is
  on the descriptive `fct_poi_development` POI-count mart, a **pre-existing** scope that legitimately
  carries Hamburg OSM counts and is *not* a gentrification-index/trajectory output and *not* touched
  by this ticket.
- `int_hamburg_lead_lag` feeds **only** `analysis/e5_hamburg_lead_lag.py` (groundwork/analysis
  layer) and no published mart; its own header states it "does NOT widen any published mart's
  `accepted_values` beyond `["BER"]`."
- No Milieuschutz / Soziale-Erhaltungsgebiete / displacement-zone model is touched; **#70's scope is
  untouched.** No descriptive or causal displacement claim is made. The `stadtteil_code` addition to
  `int_ewr_socioeco_hamburg_disagg` is a documented, method-free passthrough of an
  already-computed crosswalk key.
- Consistent with the #125/#158/#159 precedent, actually *publishing* any Hamburg trajectory or
  lead-lag result (widening `accepted_values` to `["BER","HH"]`) remains a **separate
  methodology-bearing action requiring its own fresh geo-DS + domain dual sign-off**.

## Untrusted input (SEC-3)

All findings derive from repo files and committed artefacts. No web/external content informed this
assessment and none was treated as instruction. The issue/#129 text was read as data, not commands.

## Forward guidance (non-blocking recommendations)

1. **State the domain conclusion explicitly** in the "Comparison to Berlin" section: Hamburg's
   directional (Section 2) evidence for both H3a and H3b is *correctly signed but non-significant*,
   so Hamburg does **not** independently replicate Berlin's H3b-dominance — an honest partial-null,
   not a confirmation or a refutation.
2. **Add a short "Domain limitations / why Hamburg may differ" note** covering at minimum the
   status_index stickiness attenuation (~64% of areas never move; #159 spike) and one or two
   housing-market/urban-structure reasons (Berlin's sui-generis post-reunification rent-gap wave;
   Hamburg's SAGA/cooperative tenure structure; port-city industrial morphology). Flag as future
   work, not resolved here.
3. **Note the Berlin H3c parallel and the invasion-phase reading** for H3c: Berlin's own
   dynamism-based H3c is likewise positive-and-significant (`E1-regression-findings.md`), and the
   level-vs-level Berlin H3c is negative — so H3c's sign is a flow-vs-stock construction property
   consistent with rent-gap/invasion dynamics, not a Hamburg operationalization mismatch.

These are documentation-quality improvements to a findings doc; none blocks integration. They do not
touch the model, the estimator, indicator signs, weights, or normalization.

## Verdict

The operationalization is faithful to the Berlin parent and to the underlying theory: D1 polarity,
C5-corrected dynamism, and D4-baseline-LEVEL discipline are carried over unchanged; the annual-cadence
redesign is correctly disclosed as a different real-year horizon, not a hidden re-definition; the
symmetric-Spearman limitation is honestly flagged and the D4-controlled OLS is correctly identified as
the only directional test. The headline result — Hamburg's directional evidence is correctly-signed
but under-powered, and does not independently reproduce Berlin's H3b-dominance — is a legitimate,
honestly-reportable partial-null under Epic B framing, consistent with thesis W3's correlational
caution, and it neither confirms nor refutes Dangschat's mechanism (nor does the doc claim it does).
The directionally-"wrong" H3c is domain-plausible and, decisively, *replicates Berlin's own
dynamism-based H3c*, so it is a genuine flow-vs-stock/invasion-phase signal, not an operationalization
defect. Publication scope is untouched: all gentrification-bearing published marts remain
`["BER"]`, no Milieuschutz/#70 scope is touched, and Hamburg publication remains behind a separate
future dual sign-off. My three recommendations are non-blocking documentation improvements
(make the implicit conclusion explicit, add substantive divergence limitations, note the Berlin H3c
parallel).

```json
{
  "verdict": "pass",
  "domain_rationale": "Faithful mirror of int_mss_lead_lag: D1 polarity, C5-corrected dynamism, and D4-baseline-LEVEL discipline carried over unchanged; annual-cadence redesign correctly disclosed as a different real-year horizon; symmetric-Spearman limitation honestly flagged and the D4-controlled OLS correctly identified as the only directional test. Hamburg's directional evidence is correctly-signed (6/6) but non-significant (0/6) — a legitimate correctly-oriented-but-under-powered partial-null under Epic B framing, consistent with thesis W3's correlational caution; it fails to independently REPRODUCE Berlin's H3b-dominance but neither confirms nor refutes Dangschat's mechanism, and the doc claims neither. The directionally-'wrong' contemporaneous H3c is domain-plausible AND replicates Berlin's own dynamism-based H3c (E1-regression-findings.md: also positive+significant), so it is a flow-vs-stock/rent-gap-invasion-phase signal, not an operationalization defect. Publication scope untouched (published marts remain ['BER']); no Milieuschutz/#70 scope touched.",
  "theory_risks": [
    "Findings doc reports the weakness but leaves the domain CONCLUSION implicit (Comparison-to-Berlin is a pointer, not a sentence) — under-claiming, not over-claiming; fix by stating the correctly-signed-but-under-powered partial-null explicitly.",
    "Substantive (housing-market/urban-structure) reasons for Hamburg divergence are absent from the limitations, which list only technical caveats; the status_index stickiness (~64% never move, #159 spike) is the most likely proximate attenuation and half-substantive, worth naming.",
    "H3c is a flow-vs-stock measure (dynamism CHANGE vs status LEVEL), unlike change-vs-change H3a/H3b — this asymmetry (why the thesis left H3c UNCLEAR) drives the positive sign; must be read as invasion-phase/rent-gap co-location, not as a directional refutation.",
    "Cadence non-equivalence (HH lag_k in years != Berlin lag_k in years) is correctly disclosed but is a permanent cross-city-comparison hazard for any future Hamburg-vs-Berlin lead-lag narrative."
  ],
  "recommendations": [
    "State the domain conclusion explicitly in Comparison-to-Berlin: correctly-signed but non-significant => Hamburg does NOT independently replicate Berlin's H3b-dominance (honest partial-null, not confirmation/refutation).",
    "Add a short 'Domain limitations / why Hamburg may differ' note: status_index stickiness attenuation (#159 spike); Berlin's sui-generis post-reunification rent-gap wave; Hamburg SAGA/cooperative tenure; port-city industrial morphology — flagged as future work.",
    "Note the Berlin H3c parallel (E1-regression-findings.md, also positive+significant; level-vs-level Berlin H3c is negative) and the rent-gap/invasion-phase reading, reframing H3c as a construction property rather than a Hamburg mismatch.",
    "Publishing any Hamburg lead-lag/trajectory result (widening accepted_values to ['BER','HH']) remains a separate methodology-bearing action requiring a fresh geo-DS + domain dual sign-off (#125/#158/#159 precedent)."
  ]
}
```

**Verdict: PASS**
