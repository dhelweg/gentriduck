# Gentrification Domain Expert Sign-off: OA-B.4 (#173) — ADR-0018 causality-first-with-data-confirmation POI selection rule

- **Scope:** OA-B.4 #173 — the domain-fidelity half of the R-C1 dual gate on
  `docs/adr/0018-causal-tiered-poi-selection.md`. Validates that the rule's causal-plausibility premise
  is theoretically sound and correctly bounded against causal inference proper, that the 2×2 framing
  preserves the field's own distinctions (mechanism-absent vs. mechanism-present-but-unconfirmed), and
  that the D-1/D-2 ethics/framing guardrails inherited from ADR-0017 are not weakened by formalizing
  this rule as a standalone ADR. Method-level structural verification is covered separately by
  `docs/epic-c/B4-adr-causal-tier-geo-signoff.md`.
- **Operationalizes:** Zukin (2009) *Naked City*; Ley (1996) *The New Middle Class*; Lees, Slater &
  Wyly (2008) *Gentrification*; Dangschat (1988) invasion-succession; Smith (1979/1987) rent-gap;
  ADR-0017 D3 (2×2 rule, stated as prose there); the already-exercised OA-B.1/B.2 tiering and
  confirmation pass this ADR formalizes.
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-09
- **Branch:** feature/173-oa-b4-adr-poi-selection-rule → develop
- **Geo-DS verdict:** PASS (`docs/epic-c/B4-adr-causal-tier-geo-signoff.md`)
- **Verdict:** PASS

---

## 1. The rule's causal-plausibility premise is theoretically well-founded, and this ADR states it precisely

The ADR's D1 correctly requires Step 1 (tiering) to be grounded in literature "published independent
of this project's own outcome data" — this is exactly right: the retail-succession literature it cites
(Zukin's "third wave" boutique retail, Ley's cultural-intermediary consumption, Lees/Slater/Wyly's
succession indicator list, Dangschat's invasion-succession framing, Smith's rent-gap reading of
vacancy) was developed from cross-city, cross-decade urban-sociology observation, not fitted to
Berlin's 2018 golden or MSS series. I confirm this independence claim is accurate for every cited
source — none of them is a Berlin-specific or project-specific study.

## 2. D2's 2×2 correctly preserves the field's own conceptual distinction: absence-of-mechanism vs. unconfirmed-but-plausible-mechanism

This is the single most important thing to get right in a causal-plausibility screen, and the ADR gets
it right: **tier-0 ("not causally plausible")** is reserved for nodes where urban-sociology theory
identifies *no* mechanism connecting the type to commercial gentrification (civic infrastructure sited
by administrative logic, incumbent trades displaced BY upgrading per Dangschat, not signalling it).
**Tier-≥1 nodes that fail to show significant correlation this pass** are a theoretically distinct
case — a mechanism is asserted by theory but this particular cross-sectional test (often small-n,
§Risks) didn't confirm it, which is *not* the same epistemic state as "no mechanism exists." The ADR's
insistence that the theory floor governs in both cases (D2's top row) is the correct application of
this distinction, and matches how the field itself treats null results from underpowered tests — a
null result is not evidence of absence when the test is known to be underpowered for rare urban forms.

## 3. The empirical proof (D3) is read correctly as supporting, not overclaiming, non-circularity

I agree with the geo-DS assessment that the 15/45-count asymmetry is the right empirical signature to
point to, and I additionally note the *substantive* content of which 15 nodes were dropped is itself
theoretically consistent: transit stops, bike parking, recycling containers, and public phones
correlating with a general urban-density gradient (which itself correlates with almost anything,
including status) is a textbook confound, not evidence these types have a retail-succession mechanism.
The rule correctly discarded a confound rather than mistaking density-correlation for a
gentrification-specific signal — this is exactly the kind of judgment a causal-plausibility screen is
supposed to make, and the ADR's framing of it as "spurious" (D2) is the theoretically correct label,
not merely a convenient dismissal.

## 4. The boundary against #80 causal inference (D4) is essential and correctly drawn

This is the ADR's most important framing service. A theory-tiered, correlation-confirmed selection
rule is easy to over-read as "causally validated" by a lay audience or even a careless internal
consumer — the ADR's explicit statement that the correlation step is "not claimed as a causal effect
estimate" and that the tiering is "a qualitative literature screen ... not a statistical identification
strategy" pre-empts exactly the kind of misreading that would misrepresent the improved OA variant's
epistemic status to the public (inheriting and reinforcing ADR-0017 D-1's descriptive-not-causal
framing, and the B.1/B.3 sign-offs' advisories about the improved variant reading as more
"authoritative" than the faithful baseline). I confirm D4 does not weaken or walk back any of those
prior framing commitments — it strengthens them by giving the boundary its own citable name.

## 5. No new ethics/misuse surface introduced by formalizing the rule as a standalone ADR

Formalizing an already-exercised, already-approved rule as its own ADR does not itself create new
public-facing content or a new display artifact — the actual public-framing obligations (D-1, the
#155 precedent) attach to OA-C.2 (#175)/G2, not to this ADR. I confirm this ADR does not attempt to
discharge those framing obligations itself (it correctly defers them, citing the existing advisories),
so there is no risk of this ADR being mistaken for "the framing is now done."

---

## 6. Conditions

None blocking, no new conditions.

---

## 7. Risks

1. Same risk flagged by geo-DS: the non-circularity discipline for *future* re-tiering exercises is
   documentary (D5), not code-enforced — a future author under time pressure could be tempted to
   "peek" at a correlation before finalizing a tier. This is a governance risk inherent to any
   two-human-step process, not a defect specific to this ADR's content.
2. The 15 dropped tier-0-correlated nodes are Berlin-specific empirical findings from one snapshot; a
   future re-run (new year, new city) could see a different confound set, and the ADR is correctly
   silent on whether *these specific* 15 nodes generalize — it formalizes the *rule*, not the specific
   Berlin result, which is the right scope but worth naming so a future reader does not treat "transit
   stops are always excluded" as a universal empirical law rather than one snapshot's finding under
   this rule.

---

## 8. Certification

The ADR's causal-plausibility premise is grounded in literature genuinely independent of the project's
own outcome data, the 2×2 correctly distinguishes "no mechanism" from "mechanism asserted but
unconfirmed by an underpowered test," the empirical asymmetry it cites as proof is both statistically
and substantively consistent with theory (the dropped nodes are density confounds, not
gentrification-specific signals), and the boundary against #80 causal inference is essential,
correctly drawn, and strengthens rather than weakens the existing ADR-0017 D-1 descriptive-not-causal
framing commitment. I have no domain-fidelity objection to integrating this into `develop`.

```json
{
  "verdict": "pass",
  "rationale": "ADR-0018's causal-plausibility premise is grounded in retail-succession/urban-sociology literature (Zukin 2009, Ley 1996, Lees/Slater/Wyly 2008, Dangschat 1988, Smith 1979/1987) developed independently of this project's Berlin outcome data -- confirmed none of the cited sources is a Berlin-specific or project-specific study. The D2 2x2 correctly preserves the field's own distinction between 'no mechanism exists' (tier-0, immune to correlation) and 'mechanism asserted but not confirmed by this underpowered cross-sectional test' (tier>=1 unconfirmed, kept at theory floor) -- a null result from a small-n PLR-level test is not evidence of absence for a rare urban form, and the ADR correctly does not treat it as such. The empirical asymmetry cited as the non-circularity proof (15 tier-0-correlated nodes dropped anyway, 45 tier>=1-unconfirmed nodes kept anyway) is substantively consistent with theory: the 15 dropped nodes (transit stops, bike parking, recycling, public phones) are textbook general-density confounds, not retail-succession-specific signals, so discarding them as 'spurious' rather than promoting them is the theoretically correct call, not a convenient dismissal. D4's explicit boundary against #80 causal inference is the ADR's most important framing service, pre-empting a lay misreading of the improved OA variant as causally validated, and correctly reinforces rather than weakens ADR-0017 D-1's descriptive-not-causal framing and the B.1/B.3 sign-offs' 'more authoritative than faithful' framing risk. This ADR correctly defers the actual public-facing framing obligations to OA-C.2/G2 rather than attempting to discharge them itself.",
  "risks": [
    "The two-step non-circularity discipline for future re-tiering exercises is documentary/governance-based (D5), not code-enforced -- a governance risk inherent to any human-mediated process, not a defect of this ADR's content",
    "The specific 15 dropped Berlin nodes are one snapshot's empirical finding under the rule, not a universal law -- the ADR correctly formalizes the rule rather than the specific result, but a future reader could mistake the two if not careful"
  ],
  "recommendations": [
    "OA-C.1 (#174): when reporting the crosstab, explicitly frame the 15/45 counts as this-snapshot findings under the rule, not as generalizable POI-type conclusions",
    "Future re-tiering exercises (new city/year) should re-cite this ADR's D5 requirement (re-tiering redoes Step 1, not just Step 2) explicitly in their own ticket scope to keep the governance discipline visible"
  ]
}
```

---

## Final Verdict

Verdict: PASS
