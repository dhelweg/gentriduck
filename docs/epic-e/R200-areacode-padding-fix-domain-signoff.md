# Gentrification Domain Expert Sign-off: #200 — e1_regressions.py area_code padding fix

- **Scope:** #200 — the domain-fidelity half of the R-C1 gate on the corrected H1
  (OA) result and its propagation into `docs/epic-e/E1-regression-findings.md`,
  `docs/epic-e/C1-three-way-comparison-findings.md`, `web/pages/thesis-recheck.md`,
  and `web/pages/methodology-comparison.md`. Validates that the *more decisive*
  (now-significant, wrong-signed) result is reported with the same non-advocacy
  honesty already established for this page family, that no framing spin was
  introduced to soften an unflattering correction, and that the public-facing
  correction disclosure itself is transparent about what changed and why.
- **Operationalizes:** ADR-0008/O3 non-advocacy editorial stance; the #155/A.5
  public-framing precedent (`docs/epic-g/A5-thesis-recheck-refresh-domain-
  signoff.md`); the C.1 domain sign-off's own standard for honest reporting of
  non-significant/unflattering results (`docs/epic-e/C1-three-way-comparison-
  domain-signoff.md`).
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-09
- **Branch:** fix/200-e1-oa-areacode-padding → develop
- **Geo-DS verdict:** PASS (`docs/epic-e/R200-areacode-padding-fix-geo-signoff.md`)
- **Verdict:** PASS

---

## 1. The correction makes the finding *more* decisive against the thesis's H1 prior, and this is reported plainly, not minimized

This is the single most important thing to check here: a bug fix that happens to
strengthen a negative/unflattering finding is exactly the kind of correction a less
disciplined project might be tempted to quietly under-report. I confirm the
opposite happened: `docs/epic-e/E1-regression-findings.md`'s H1 (OA) row states the
result plainly (n=435, rho=0.1482, p=0.0019, "Yes" significant, "FAIL" against the
directional prior); `web/pages/thesis-recheck.md`'s H1 row now reads "statistically
significant (n=435)... in the wrong direction" rather than the previous, arguably
easier-to-wave-away "not significant either way." No adjective softens this.

## 2. The public correction disclosure is transparent about cause and effect, not just the new number

`web/pages/thesis-recheck.md`'s new "Data correction (2026-07-09, #200)" caveat
explicitly states what was wrong (an area-code join bug undercounting the sample),
what changed (non-significant → significant, wrong-signed), and scopes the blast
radius ("No other hypothesis in this table was affected"). This is the right level
of transparency for a public methodology page correcting a previously-published
figure — it does not merely swap in a new number silently, which would risk a
reader noticing an inconsistency with an earlier cached view of the page and losing
trust in the site's rigor.

## 3. The "more decisive negative" framing does not overreach into declaring OA invalid

Consistent with the C.1 domain sign-off's own standard, I checked that this
correction is not leveraged to overstate a broader conclusion. The updated
thesis-recheck.md H1 row and the honest-caveats note both scope the correction to
this specific aggregate-basket test; H1b (fast food, single type) remains
significant and correctly signed, unaffected in direction (its own n also grew,
70→359, strengthening rather than reversing that finding) — the page does not let
the H1 aggregate correction cast doubt on the H1b finding, which is domain-accurate:
these are different tests of different granularity, exactly as already established
in the existing "Read the columns together" framing.

## 4. No causal-language creep introduced

The correction is described in purely statistical terms (significance, direction,
sample size) with no causal claim added or implied about *why* the aggregate basket
points the "wrong" way. This preserves ADR-0017 D-1's descriptive-not-causal
framing, unaffected by this data-quality fix.

## 5. `methodology-comparison.md`'s Run 1 description is updated consistently and does not create a new inconsistency with `thesis-recheck.md`

I cross-checked both pages side by side: `methodology-comparison.md` now describes
Run 1 as "statistically significant but points the opposite way from the thesis's
prior (n=435)," matching `thesis-recheck.md`'s H1 row and the underlying findings
doc numerically and directionally. Both pages' "Honest caveats" sections were
updated in step (no stale "not significant" language survives in either).

---

## 6. Conditions

None blocking, no new conditions.

---

## 7. Risks

1. Same risk noted by geo-DS: the O2 whitepaper (#82), once authored, should cite
   the corrected figure — a reasonable forward-looking note, not a defect here.
2. A reader who saw the site before this fix (if the site was already live/cached)
   would notice the H1 finding changed from "not significant" to "significant,
   wrong direction" — the explicit, dated correction note mitigates any impression
   this was a quiet, undisclosed change.

---

## 8. Certification

The correction is reported with full transparency about cause, effect, and scope;
the now-more-decisive negative finding is stated plainly rather than softened,
consistent with the project's non-advocacy editorial stance; the correction does
not overreach into casting doubt on the unaffected, still-significant H1b finding;
no causal-language creep is introduced; and both public pages are updated
consistently with each other and with the underlying findings documents. I have no
domain-fidelity objection to integrating this into `develop`.

```json
{
  "verdict": "pass",
  "rationale": "The #200 fix corrects H1 (OA)'s previously-understated sample (n=92->435), which flips the reported result from 'weak, not significant' to 'significant, wrong-signed' -- a more decisive negative finding against the thesis's H1 prior for this specific aggregate-basket test. This is reported plainly in docs/epic-e/E1-regression-findings.md and both public pages (thesis-recheck.md, methodology-comparison.md), with no softening language, consistent with the established non-advocacy editorial stance (ADR-0008/O3, #155/A.5 precedent). thesis-recheck.md's new dated correction note is transparent about what was wrong, what changed, and confirms no other hypothesis in the table was affected -- the right level of disclosure for correcting a previously-published public figure rather than silently swapping in a new number. The correction is correctly scoped: it does not cast doubt on the unaffected, still-significant, still-correctly-signed H1b (fast food) finding, which is domain-accurate since H1 and H1b test different granularities (aggregate 4-domain basket vs single type) as already established in the page's own 'read the columns together' framing. No causal-language creep is introduced -- the correction is described in purely statistical terms. Both public pages are cross-checked and consistent with each other and the underlying findings documents, with no stale 'not significant' language remaining anywhere.",
  "risks": [
    "The O2 whitepaper (#82), once authored, should cite the corrected H1 (OA) figure rather than any earlier informal reference to the pre-fix number",
    "A reader who viewed the live site before this fix would see the H1 finding change from non-significant to significant-wrong-signed -- mitigated by the explicit, dated correction note on thesis-recheck.md"
  ],
  "recommendations": [
    "When #82 (O2 whitepaper) is authored, explicitly cite this correction's dated note as the authoritative current H1 (OA) figure",
    "No further action needed on the public pages; both are internally consistent post-fix"
  ]
}
```

---

## Final Verdict

Verdict: PASS
