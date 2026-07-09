# Geo-Data-Scientist Sign-off: #200 — e1_regressions.py area_code padding fix

- **Scope:** #200 — `analysis/e1_regressions.py` (`load_h1_h2_data`'s `area_code`
  alias, now `LPAD`-padded), the regenerated `docs/epic-e/E1-regression-findings.md`,
  the regenerated `docs/epic-e/C1-three-way-comparison-findings.md` (via
  `analysis/c_three_way_comparison.py`'s verbatim reuse, code unchanged except a
  comment update), and the two consumer site pages
  (`web/pages/thesis-recheck.md`, `web/pages/methodology-comparison.md`) updated to
  match the corrected figures. This re-derives an already-published, previously
  R-C1-signed-off result (`docs/epic-b/A4-e1-oa-regressions-{geo,domain}-signoff.md`)
  with a materially different n/significance, per that sign-off's own gate
  requirement and this bug's own filed acceptance criteria.
- **Operationalizes:** the original H1/H1b OA test design (OA-A.4 #168,
  `docs/epic-b/A4-e1-oa-regressions-geo-signoff.md`); the join-key convention already
  used everywhere else in the same query (`int_poi_features_pivot` join already pads
  `LPAD(t.raum_id, 8, '0')`) — this fix makes the SELECTed alias consistent with the
  query's own JOIN condition, introducing no new join logic.
- **Reviewer:** geo-data-scientist
- **Date:** 2026-07-09
- **Branch:** fix/200-e1-oa-areacode-padding → develop
- **Verdict:** PASS

---

## 1. Summary

1. **The fix is minimal and mechanically verified correct.** The change is a single
   alias correction: `t.raum_id AS area_code` → `LPAD(t.raum_id, 8, '0') AS area_code`
   in `load_h1_h2_data`'s SELECT list. I confirmed this exactly matches the padding
   already applied in the same query's `JOIN ... ON LPAD(t.raum_id, 8, '0') =
   p.area_code` condition two lines below — the fix makes the *returned* column
   consistent with the join key already used internally, introducing no new
   transformation.
2. **Root cause independently re-confirmed.** I re-derived the bug from scratch:
   `stg_thesis_2018_result_plr.raum_id` is 7-char for 343 of 436 golden rows and
   already-8-char for the other 93 (an artifact of Berlin's LOR numbering, not a data
   defect); `int_poi_offering_advantage.area_code` (used by
   `load_oa_category_panel`) is uniformly 8-char. Before the fix, `df.merge(...,
   on="area_code")` matched only string-identical keys, silently succeeding for the 93
   coincidentally-8-char rows and silently failing (NaN, no error) for the other 343 —
   confirmed by reproducing `df['area_code'].str.len().value_counts()` = `{7: 343, 8:
   93}` on the pre-fix code, and `{8: 436}` post-fix.
3. **Post-fix sample size is exactly what's expected.** `oa_mean` non-null count rises
   from 92/436 to 435/436 (the single remaining non-match is one of the two rows
   where the OA domain aggregate is genuinely all-null — verified against
   `int_poi_offering_advantage`, not a residual join defect). H1b's OA-basket n also
   rises correspondingly (70→359). This matches my independent pre-fix
   investigation exactly (I had already reproduced n≈435/rho=0.148 via a separate raw
   SQL query while investigating the bug for #174).
4. **No other loader in this module shares the same bug.** I checked
   `load_oa_category_panel`, `load_ewr_lead_lag_data`, and the lead-lag panel loaders
   used for H2/H3 — none constructs an `area_code` column from an unpadded
   `raum_id`-like source merged against the padded OA panel; `load_h1_h2_data` was the
   only affected loader. This matches the bug ticket's own explicitly scoped claim
   ("scope of this ticket is `load_h1_h2_data`'s H1/H1b merge only").
5. **The regenerated findings and site pages are consistent with the new numbers, not
   selectively updated.** I cross-checked every place the old n=92/rho=0.135/
   "not significant" language appeared (`docs/epic-e/E1-regression-findings.md`,
   `docs/epic-e/C1-three-way-comparison-findings.md`, `web/pages/thesis-recheck.md`,
   `web/pages/methodology-comparison.md`) and confirmed all four were updated
   consistently to n=435/rho=0.148/p=0.0019/significant-wrong-signed, with no stale
   reference left in any of the four documents.
6. **The new, more decisive result is reported honestly, not downplayed.** The
   pre-fix result was "weak, not significant" (arguably easier to wave away); the
   post-fix result is "significant, wrong-signed" — a more decisive disconfirmation
   of a piece of the thesis's H1 prior on the coarse OA basket. Both the findings
   docs and the site pages state this plainly rather than softening it, consistent
   with the project's established non-advocacy stance.
7. **Verified against a live, green `dbt build` (pre-existing state, unaffected by
   this fix — no dbt model touched) and a clean `npm run build`** for the two updated
   site pages.

Verdict: **PASS.**

---

## 2. Methodological assessment

### 2.1 The fix does not change the underlying construct or method, only a data-plumbing defect

`oa_mean`'s definition (mean of 4 upscaling-relevant domain OAs, ADR-0017 D2.3
`weight_variant='standard'`, `methodology_variant='faithful'`) is unchanged; the
outcome (`status_index` from the 2018 golden) is unchanged; only which rows
successfully join is corrected. This is squarely a data-quality bug fix, not a new
methodological choice — consistent with why #200 was filed and gated as its own
ticket rather than bundled into #174.

### 2.2 The `c_three_way_comparison.py` "verbatim reuse" design paid off exactly as intended

Because `run_faithful()` calls `e1_regressions.load_h1_h2_data`/`run_spearman`
directly rather than re-implementing the query, this fix required **zero code
changes** to `c_three_way_comparison.py` itself (only a docstring/comment update
reflecting the bug's new fixed status) — the corrected figure propagated
automatically on re-run. This is the exact benefit the original C.1 sign-off
anticipated when it praised reusing rather than re-deriving the Run 1 number.

### 2.3 The dynamically-corrected Run 3 narrative in `c_three_way_comparison.py` is now accurate for the new (significant, wrong-signed) case

I reviewed the updated `render_report` logic (previously hardcoded around a
"neither significant" assumption, now branches on each run's own
significance-and-direction combination) and confirm it correctly characterizes Run
1 as "statistically significant but in the OPPOSITE direction from the H1 prior... a
significant, wrong-signed result, not a null result" — this is the accurate
statistical characterization, and the code no longer assumes a specific outcome
pattern that could go stale on a future re-run with different data.

---

## 3. Conditions

None blocking, no new conditions.

---

## 4. Risks

1. The now-significant, wrong-signed H1 (OA) result on the PLR-level golden panel is
   a genuinely more decisive finding against the coarse aggregate basket's ability to
   confirm the thesis's H1 prior — this doesn't change the overall Epic B "directional
   revival" framing, but is worth the O2 whitepaper (#82) author's attention as a
   corrected, now-clearer negative result for that specific test.
2. This fix does not audit whether the same 7-vs-8-char `raum_id` inconsistency
   affects any *other* pipeline that joins directly on `stg_thesis_2018_result_plr`
   (or an equivalent Berlin PLR key) without going through
   `int_poi_features_pivot`'s already-correct `LPAD` join — I did not find another
   instance in this review's scope, but a broader repo-wide grep for un-padded
   `raum_id` usage would be good due diligence for a future ticket if time permits.

---

## 5. Certification

The fix is a minimal, correctly-targeted alias correction that makes
`load_h1_h2_data`'s SELECTed `area_code` consistent with its own JOIN condition;
the root cause and corrected sample size are independently re-derived and match; no
other loader shares the bug; all four downstream documents/pages are consistently
updated to the corrected, more decisive (significant, wrong-signed) result, reported
honestly; and the site builds cleanly.

**The PM MAY integrate this into `develop`**, pending the independent
`gentrification-domain-expert` PASS also required by the R-C1 gate (this ticket
re-derives an already R-C1-gated result with a materially different figure, per
#200's own filed acceptance criteria).

```json
{
  "verdict": "pass",
  "rationale": "The #200 fix (LPAD-padding load_h1_h2_data's SELECTed area_code alias to match its own JOIN condition) is minimal, mechanically correct, and independently re-verified: raum_id is 7-char for 343/436 golden rows and already-8-char for 93, while int_poi_offering_advantage.area_code is uniformly 8-char, so the pre-fix unpadded merge silently matched only the 93 coincidentally-8-char rows (n=92 after further NaN filtering). Post-fix, oa_mean non-null rises to 435/436 exactly as independently predicted. No other loader in the module shares this bug (checked load_oa_category_panel, load_ewr_lead_lag_data). All four downstream artifacts (E1-regression-findings.md, C1-three-way-comparison-findings.md, thesis-recheck.md, methodology-comparison.md) are consistently updated to the corrected n=435/rho=0.148/p=0.0019/significant-wrong-signed result, with the more decisive (not more favorable) finding reported plainly rather than softened. c_three_way_comparison.py required zero query changes -- its verbatim-reuse design (established at #174's own sign-off) propagated the fix automatically -- and its Run 3 narrative logic was correctly generalized from a hardcoded 'neither significant' assumption to a dynamic per-run significance/direction characterization. Verified via a clean npm run build for both updated site pages; no dbt model is touched by this fix.",
  "risks": [
    "The now-significant, wrong-signed H1 (OA) aggregate-basket result is a more decisive negative finding than the pre-fix 'not significant' result -- worth flagging for the O2 whitepaper (#82) as a corrected, clearer result, not a defect",
    "This fix's scope was verified for load_h1_h2_data only; a broader repo-wide check for other un-padded raum_id joins was not performed and would be reasonable future due diligence"
  ],
  "recommendations": [
    "Flag the corrected H1 (OA) figure for the O2 whitepaper (#82) author when that work begins, since it changed from non-significant to significant-wrong-signed",
    "Consider a lightweight grep-based follow-up check for other un-padded raum_id-vs-area_code joins repo-wide, time permitting"
  ]
}
```

---

## Final Verdict

Verdict: PASS
