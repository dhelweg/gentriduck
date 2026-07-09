# Geo-Data-Scientist Sign-off: OA-C.1 (#174) — three-way comparison (faithful vs improved vs 2018 golden)

- **Scope:** OA-C.1 #174 — `analysis/c_three_way_comparison.py`,
  `docs/epic-e/C1-three-way-comparison-findings.md`. Verifies the statistical
  construction of Run 1/Run 2, the honesty of the "structural, not ablation" framing
  given the discovered scope limitation, and the correctness of reusing (not
  re-deriving) the already-published Run 1 H1 (OA) number.
- **Operationalizes:** ADR-0017 D3 (faithful/improved never blended); CLAUDE.md Epic B
  framing (directional, document divergences); `docs/planning/oa-revival-and-
  methodology-improvement.md` §"Experimental design" (Run 3 = ablation of Run 1 vs
  Run 2); `docs/epic-c/B3-oa-weighted-index-geo-signoff.md` §2.2 (improved variant's
  lor_2021-only scope, cited here as the reason a literal ablation isn't computable).
- **Reviewer:** geo-data-scientist
- **Date:** 2026-07-09
- **Branch:** feature/174-oa-c1-three-way-comparison → develop
- **Verdict:** PASS

---

## 1. Summary

1. **The central methodological finding — a same-anchor ablation is not currently
   computable — is correct, not an excuse.** I confirmed independently:
   `int_poi_offering_advantage`'s `methodology_variant='improved'`-equivalent inputs
   (`seed_poi_offering_relevance` tier weights feeding `int_poi_amenity_weighted_base`)
   are wired only from `int_gentrification_ts` Branch A (`lor_2021`, 2021-2025) per
   the B.3 sign-off's own §2.2 finding — there genuinely is no `improved`-variant row
   for `snapshot_year=2018`/`area_vintage='lor_pre2021'` to correlate against the 2018
   golden. The script does not attempt to fabricate or approximate one; it correctly
   declines and documents the boundary as a **substantive finding**, consistent with
   Epic B's "document divergences" framing rather than a silently narrower scope.
2. **Run 1 correctly reuses (not re-derives) the already-published number.** I traced
   `run_faithful()`'s call into `e1_regressions.load_h1_h2_data`/`run_spearman`
   directly (not a re-implementation) and confirmed the returned rho/p/n
   (0.135/0.1996/92) is bit-identical to `docs/epic-e/E1-regression-findings.md`'s H1
   (OA) row. This is the right call: OA-C.1's job is comparison, not re-litigating an
   already-signed-off H1 test.
3. **The discovered area_code padding bug (filed as #200) is real, correctly scoped
   out of this ticket, and correctly NOT silently fixed here.** I reproduced the
   author's finding independently: `e1_regressions.load_h1_h2_data`'s `area_code`
   column is the raw `t.raum_id` (343 rows 7-char, 93 rows 8-char, unpadded), while
   `load_oa_category_panel`'s `area_code` is uniformly 8-char, so the pandas
   `merge(..., on="area_code")` only succeeds for the 93 already-8-char rows. Silently
   patching this inside a comparison ticket would have introduced a second, unreviewed
   H1 (OA) number contradicting the currently-published, signed-off one — filing it as
   its own bug (#200, correctly labelled methodology-bearing, needs its own R-C1 gate)
   and reusing the pre-fix number for this ticket is the disciplined choice.
4. **Run 2's construction (`status_score_improved` vs live MSS `status_index`, joined
   on `area_code`/`period_yyyymm`/`area_level`) is a correct predictor-vs-contemporaneous-
   outcome test, structurally parallel to Run 1's.** I confirmed the join recovers
   1,607 matched rows (2021-2025, `lor_2021`) — a materially larger and more reliable
   sample than Run 1's (bug-truncated) 92, correctly reported as an incomparable `n`
   rather than as evidence of anything about relative "quality."
5. **Polarity handling is correct and consistently applied.** Both `status_index`
   values (2018 golden and live MSS D1 ordinal) are inverse-numeric (higher = worse);
   I confirmed this against `gentrification_index.sql`'s own D1 comment cited in the
   script's docstring, and the expected-negative-correlation framing is applied
   identically to both runs.
6. **The report does not overclaim a "curation improves prediction" conclusion from an
   invalid comparison — this is the single most important thing to get right here**,
   and the script's Run 3 explicitly and repeatedly disclaims any predictive-
   performance-delta reading, instead reporting the honest result: neither rho is
   significant this pass, and both point the "wrong" (positive, not H1-expected
   negative) direction on the aggregate `oa_mean`/`status_score_improved` baskets —
   correctly contextualized against the same findings doc's OA-based H1b/H2/H3 tests,
   which ARE significant and expected-direction, so this is not read as evidence
   against OA as a construct.
7. **Verified reproducible.** `uv run python analysis/c_three_way_comparison.py`
   re-run twice, byte-identical numeric output both times (deterministic given a
   read-only DB connection, no randomness). `uv run poe lint`: clean (ruff + sqlfluff).

Verdict: **PASS.**

---

## 2. Methodological assessment

### 2.1 Structural (not ablation) comparison is the right call given the discovered constraint, not a downgrade of the ticket's acceptance criterion

The ticket's acceptance criterion ("clear methodology-improvement delta") presumes a
computable same-anchor ablation. Given the genuine structural gap (Run 2 has zero
2018/`lor_pre2021` coverage), forcing a delta number would require either (a)
approximating a fake 2018-era improved score (methodologically indefensible — would
conflate a real curated-weight computation with a guess) or (b) comparing rho values
across genuinely different outcomes as if they were commensurable (the exact
confound ADR-0017 D3 exists to prevent, restated correctly in the script's Run 3
prose). Reporting the boundary itself as the finding, with an explicit follow-up
path (lor_pre2021 re-tiering extension), is the only methodologically honest option
available at this ticket's scope.

### 2.2 The non-significant, wrong-direction aggregate result is reported honestly, not spun

I re-ran both queries independently against the live warehouse and confirm the
reported rho/p/n are correct. A less careful report might have been tempted to
soft-pedal a "does not confirm H1" result on a headline metric; this one states it
plainly (bold "DOES NOT match", "NOT significant") while correctly noting the
existing published caveat that finer-grained OA tests (H1b, H2, H3a/H3b) in the same
pipeline DO show significant, expected-direction effects — so the reader is not left
to wrongly conclude "OA doesn't work," only that this particular coarse 4-domain
mean basket is a weak aggregate summary, which is an accurate characterization.

### 2.3 No new spatial/bandwidth method introduced or re-litigated

This ticket adds no new OA computation, kernel, or bandwidth choice — it consumes
`int_poi_offering_advantage` (faithful) and `gentrification_index` (improved,
live_data) as already-built, already-signed-off artifacts. None of ADR-0017's D1/D2
spatial-method decisions are touched or contradicted.

---

## 3. Conditions

None blocking. One carried-forward condition (already filed, not new):

- **#200 (filed this ticket, separate methodology-bearing bug):** once fixed, re-run
  this script and update the findings doc's Run 1 figures — noted in both the script
  docstring and the bug ticket's acceptance criteria.

---

## 4. Risks

1. Run 2's `n=1607` pools multiple years (2021-2025) of the same ~436 `lor_2021` PLRs
   without any year/cluster adjustment — a pseudo-replication caveat structurally
   identical to the one already documented for the EWR lead-lag panel
   (`load_ewr_lead_lag_data` docstring, "Pseudo-replication caveat"). This script does
   not repeat that caveat explicitly; I recommend the findings doc note it (advisory,
   not blocking — the qualitative "not significant" conclusion would not flip even
   with a more conservative effective-n).
2. Once #200 is fixed, Run 1's `n` will rise substantially (92→~435) and its rho will
   change sign in my own independent check (positive 0.135 → positive 0.148 — actually
   the sign does NOT flip, both positive; I verified this while investigating #200) —
   worth flagging so a future reader isn't surprised, but this is #200's scope, not
   this ticket's.

---

## 5. Certification

The three-way comparison correctly identifies and honestly reports a genuine
structural scope boundary (no same-anchor ablation is currently computable) rather
than forcing or hiding it, correctly reuses the already-published Run 1 number
instead of introducing a second unreviewed figure, correctly discovered and properly
routed a real, separate area_code padding bug (#200) through its own methodology-
bearing gate rather than silently patching it here, and reports a non-significant,
wrong-direction aggregate result plainly and in context rather than overselling it.
No new spatial/statistical method is introduced or re-litigated.

**The PM MAY integrate this into `develop`**, pending the independent
`gentrification-domain-expert` PASS also required by the R-C1 dual gate.

```json
{
  "verdict": "pass",
  "rationale": "analysis/c_three_way_comparison.py correctly identifies that a same-anchor (2018 golden) ablation of faithful vs improved OA is not currently computable, because the improved variant (status_score_improved) is wired lor_2021-only 2021-2025 (confirmed against docs/epic-c/B3-oa-weighted-index-geo-signoff.md sec2.2) with zero 2018/lor_pre2021 rows -- rather than fabricating or forcing a comparison, the script reports this boundary itself as the substantive finding, consistent with Epic B directional framing. Run 1 correctly reuses e1_regressions.py's own load_h1_h2_data/run_spearman verbatim (traced, bit-identical to the published n=92/rho=0.135/p=0.1996 in docs/epic-e/E1-regression-findings.md) rather than re-deriving a second number. In the process, a real area_code padding bug was discovered in e1_regressions.load_h1_h2_data's OA merge (raw unpadded raum_id vs 8-char-padded OA table key, silently dropping 79% of PLRs, n=436->92) -- verified independently by re-deriving the correct join (recovers ~435/436 rows, rho=0.148, still positive/non-H1-direction) -- and correctly filed as its own methodology-bearing bug ticket (#200) rather than silently patched inside this comparison ticket, which would have introduced an unreviewed, inconsistent Run 1 number. Run 2 (status_score_improved vs live MSS status_index, joined on area_code/period_yyyymm/area_level, n=1607) is a structurally parallel predictor-vs-contemporaneous-outcome test with correct, consistent inverse-numeric polarity handling across both runs. The Run 3 comparison honestly reports a non-significant, wrong-direction (positive, not H1-expected negative) result for both aggregate baskets without overselling or hiding it, and correctly contextualizes this against the same findings doc's significant, expected-direction H1b/H2/H3a/H3b OA tests so the reader does not wrongly conclude OA as a construct is invalidated. No new spatial/bandwidth method is introduced. Verified via independent re-run (deterministic, byte-identical) and a clean poe lint.",
  "risks": [
    "Run 2's n=1607 pools 2021-2025 (multiple years) of the same ~436 lor_2021 PLRs without a year/cluster adjustment -- a pseudo-replication caveat structurally identical to the already-documented EWR lead-lag panel caveat, not explicitly repeated in this findings doc (advisory, does not change the qualitative non-significance conclusion)",
    "Once #200 is fixed, Run 1's n will rise substantially and should be re-run -- tracked on #200, not this ticket"
  ],
  "recommendations": [
    "Add the pseudo-replication caveat (already used for the EWR lead-lag panel) to Run 2's findings-doc entry for consistency",
    "Re-run this script once #200 lands and update the findings doc, per the script's own docstring note"
  ]
}
```

---

## Final Verdict

Verdict: PASS
