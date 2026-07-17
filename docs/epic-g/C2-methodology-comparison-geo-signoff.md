# Geo-Data-Scientist Sign-off: OA-C.2 (#175) — methodology-comparison site page

- **Scope:** OA-C.2 #175 — `web/pages/methodology-comparison.md` (new page) and the
  linking edit in `web/pages/thesis-recheck.md` (Further reading section). Checks
  that the public restatement of the OA-C.1 (#174) three-way comparison is
  statistically accurate, keeps the faithful/improved result sets visually and
  textually separated (ADR-0017 D3), and does not overclaim beyond what
  `docs/epic-e/C1-three-way-comparison-findings.md` actually supports.
- **Operationalizes:** ADR-0017 D3/D5 (never blend faithful/improved); ADR-0018
  (causal-tier selection rule, cited as the improved variant's definition); the #155
  public-framing precedent inherited per the ticket's own "Relations" section and the
  A.5 sign-off's own note ("re-check this sign-off if... OA-C.1 #174 adds further
  OA-vs-raw-count claims to this or a linked page").
- **Reviewer:** geo-data-scientist
- **Date:** 2026-07-09
- **Branch:** feature/175-oa-c2-methodology-comparison-page → develop
- **Deliverables reviewed:** `web/pages/methodology-comparison.md`,
  `web/pages/thesis-recheck.md` (link addition only).
- **Verdict:** PASS

---

## 1. Summary

1. **The numbers on the page match the signed-off findings doc exactly.** I checked
   every statistic against `docs/epic-e/C1-three-way-comparison-findings.md`: n=92 for
   the faithful basket, n=1,607 for the improved basket, "weak and not statistically
   significant" for both (rho=0.135/p=0.1996 and rho=0.029/p=0.2449 respectively,
   neither below alpha=0.05). No number is rounded favorably, re-derived, or restated
   with a different implied conclusion than the source finding.
2. **The structural scope limitation is stated prominently, first, in an `<Alert>`
   block — not buried in caveats.** This matches (and slightly exceeds) the rigor of
   the C.1 findings doc itself, which is the right editorial choice for a public page:
   a reader who stops after the first alert already has the load-bearing caveat.
3. **The "not a fair head-to-head" framing is preserved from the source finding,
   correctly attributed to differing year/boundary/outcome, not glossed as
   uncertainty about the method.** The page explicitly states the two numbers "come
   from different years, different area boundaries, and... different underlying
   social outcomes entirely" — this matches C.1's own framing precisely and avoids
   the failure mode the C.1 sign-off flagged as a risk (a reader mistaking
   non-significance for a ranking).
4. **The "doesn't mean OA doesn't work" cross-reference to the thesis-recheck page's
   fast-food finding is accurate and correctly sourced.** I confirmed
   `thesis-recheck.md`'s H1b row (rho 0.42 OA vs 0.14 raw, "stronger under OA") is
   the finding being cited, and the page's claim that basket-averaging "smooths out
   exactly the kind of type-specific signal... that the finer tests pick up" is a
   fair, non-overreaching characterization (not a claim that averaging *causes* the
   weak result, just that the two are consistent).
5. **Faithful/improved separation (ADR-0017 D3) is preserved structurally, not just
   in prose.** The comparison table keeps the two workstreams in separate columns
   with distinct anchor periods/boundaries named explicitly; no single blended
   number is presented anywhere on the page. This is consistent with the schema-level
   discriminator enforcement (`methodology_variant`) already in place in the
   underlying marts.
6. **The page correctly attributes the improved variant's scope limit to a
   *research* gap, not a technical one.** "Building the curated, theory-weighted
   business-type list... was itself a research exercise... Re-doing that exercise for
   the 2018 thesis's older area boundaries... would be a new piece of research in its
   own right, not a mechanical rerun" — this is an accurate, non-misleading
   characterization of why the ablation isn't computable (consistent with my own
   #174 sign-off's assessment of the same gap).
7. **Verified the page builds cleanly.** `npm run build` in `web/` completes without
   error; `build/methodology-comparison/index.html` is produced; the linking edit in
   `thesis-recheck.md` resolves to a valid internal route.

Verdict: **PASS.**

---

## 2. Methodological assessment

### 2.1 No new statistical claim is introduced beyond the signed-off findings doc

I checked line-by-line that every quantitative or directional claim on the page
traces to a specific statement in `C1-three-way-comparison-findings.md`; the page
adds no new correlation, no new test, and no new inferential claim not already
reviewed at the R-C1 gate for #174. This is the correct scope for a "publish the
detailed comparison" ticket — restatement, not new analysis.

### 2.2 The ADR-0018 curation-rule summary is accurate

The page's plain-language description of the causal-tier rule ("included only if
urban-sociology literature... gives it a plausible mechanism," "a transit stop or a
recycling bin is not, even if it happens to correlate... that correlation is treated
as a coincidence... the type stays excluded either way," "Vacancy is the one
deliberate exception... never summed") is a faithful, non-oversimplified restatement
of ADR-0018 D1/D2 and ADR-0017 D-2 — I checked each clause against the ADR text and
found no distortion or omission of the non-circularity mechanism.

### 2.3 No bandwidth/spatial-method claim is introduced or contradicted

This page (like C.1) consumes already-built OA/improved artifacts; no kernel,
bandwidth, or spatial-join claim appears on the page, so none of ADR-0017's C-1...C-5
spatial conditions are engaged or re-litigated here.

---

## 3. Conditions

None blocking, no new conditions.

---

## 4. Risks

1. Same risk the C.1 sign-off flagged, restated for a public audience: a skimming
   reader could still take away "both are weak, so the methods roughly cancel out"
   rather than the intended "not comparable, and both inconclusive on their own
   terms" — the page's ordering (limitation-first alert, then explicit "not a fair
   head-to-head" bullet) mitigates this about as well as prose can, but is not a
   structural guarantee.
2. The page is now the second public page (after thesis-recheck) that must be kept in
   sync if #200 (the area_code padding bug affecting the underlying faithful n=92
   figure) is fixed — both this page and thesis-recheck.md would need a coordinated
   refresh at that point (tracked on #200's acceptance criteria, not a defect of this
   ticket).

---

## 5. Certification

The page's every statistic traces exactly to the signed-off `docs/epic-e/
C1-three-way-comparison-findings.md`, the structural scope limitation is stated
first and prominently (not buried), the faithful/improved separation is preserved
both structurally and in the prose, the ADR-0018 curation-rule summary is accurate
and non-oversimplified, and the page builds cleanly. No new statistical, spatial, or
methodological claim is introduced beyond what #174 already cleared the R-C1 gate
for.

**The PM MAY integrate this into `develop`**, pending the independent
`gentrification-domain-expert` PASS also required by the R-C1 gate (inheriting the
#155 public-framing precedent).

```json
{
  "verdict": "pass",
  "rationale": "web/pages/methodology-comparison.md restates docs/epic-e/C1-three-way-comparison-findings.md's already-signed-off statistics exactly (n=92/rho=0.135/p=0.1996 faithful, n=1607/rho=0.029/p=0.2449 improved, both non-significant) with no new claim, no favorable rounding, and no reframed conclusion. The structural scope limitation (improved variant is Berlin lor_2021-only 2021-2025, no true same-anchor ablation computable) is placed first in a prominent Alert block rather than buried in caveats, matching or exceeding the source finding's own rigor. The page correctly cross-references thesis-recheck.md's significant, OA-strengthened fast-food (H1b) finding to explain why the weak aggregate-basket result here does not indict Offering Advantage as a construct -- an accurate, non-overreaching characterization (coarse averaging smooths a signal the finer test picks up, not a causal claim about the averaging itself). The ADR-0018 causal-tier rule summary is a faithful, checked-against-source restatement including the non-circularity mechanism (tier-0 exclusion regardless of correlation) and the Vacancy opposite-pole exception. Faithful/improved separation (ADR-0017 D3) is preserved both structurally (separate table columns, distinct anchors) and in prose (no blended number anywhere). Verified the page builds cleanly via npm run build in web/.",
  "risks": [
    "A skimming public reader could still misread 'both weak' as 'the methods are equivalent' rather than 'not comparable, both inconclusive' -- mitigated by the alert-first ordering but not structurally guaranteed",
    "This page and thesis-recheck.md will both need a coordinated refresh once #200 (area_code padding bug affecting the underlying faithful n=92 figure) is fixed -- tracked on #200, not a defect here"
  ],
  "recommendations": [
    "When #200 lands, refresh both web/pages/thesis-recheck.md and web/pages/methodology-comparison.md together, not just the findings docs, since both cite the pre-fix n=92 figure",
    "Consider a future ticket to extend the improved-variant causal-tier seed to lor_pre2021/2018 so a true head-to-head ablation becomes publishable **(Follow-up now tracked: #261 (OA-ablation) — see `docs/planning/deferred-work-audit-2026-07.md`.)**"
  ]
}
```

---

## Final Verdict

Verdict: PASS
