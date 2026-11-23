# #381 fix: domain sign-off and final public correction texts

- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-11-23
- **Reviewed:** branch `feat/381-formula-fix`:
  - c5c9db1ec: the population-weighted crosswalk; #372 suppression in `mart_area_demographics`;
  - c679b8f2e: E1 and the #354 Berlin suite regenerated;
  - 05ed2ad41: the DRAFT resolved notes;
  - 162b2e856: #364, the deterministic E1 bootstrap;
  - the geo sign-off addition R1 (`docs/epic-c/381-fix-geo-signoff.md`).
- **Checked against the outputs (read from git, not re-run):**
  - E1 §4, before and after;
  - E1 outside §4, before and after;
  - `thesis-hypothesis-suite-results.csv`, all 216 keys compared, develop → branch;
  - the #372 filter in `mart_area_demographics.sql`.

Verdict: PASS (conditional on the §3 final texts being applied verbatim; no re-check needed)

## 1. Domain validity of the fix

- **The fix is right in substance.** Shares and means are now crosswalked population-weighted,
  which is the C3-approved formula. Counts stay area-allocated. Tests now cover share range,
  male + female = 1 and plausible mean age.
- **Suppressing pre-2021 PLR and Ortsteil demographics (#372) is the right public choice.**
  Area-allocated counts at those grains are unreliable (e.g. Pankower Tor). Bezirksregion,
  Prognoseraum and Bezirk keep their rows, because they roll up all children. Leaving data out
  with a stated reason is better than shipping misleading small-area values.
- **The substantive consequence is honestly reported.** The EWR panel no longer supports H2/H3 as
  previously read. The thesis re-check page is unaffected: the suite CSV shows 0 verdict changes
  and exactly 2 estimate changes, the two "+ D4" sensitivity rows.

## 2. Claims in the drafts, verified

| Claim | Evidence | OK |
|---|---|---|
| 6 of 13 §4 verdicts flip: H2 OLS k = 1/2/4, H3a CL k = 1, H3b CL k = 1 and 2 | §4 table, develop vs branch | ✓ |
| The 7 SUPPORTED are 2–5× weaker | H2 Spearman ≈ 4.5–5×; H3c ≈ 3.2–4×; H3a k = 2 ≈ 2.2× | ✓ |
| Six of the seven are analytic-p Spearman rows; H3a k = 2 about half as strong | −0.1845 → −0.0839 | ✓ |
| Outside §4: estimates, p and verdicts unchanged; only CIs move in the 3rd decimal (#364) | diff of E1 outside §4 (Section 2 H3a k = 1 is still CONTRADICTED (borderline)) | ✓ |
| "No verdict on this page changed; two sensitivity figures moved slightly" | suite CSV: 0 verdict changes; H3a + D4 −0.038 → −0.044, H3b + D4 −0.0495 → −0.0502 | ✓ |
| Pre-2021 demographics only at BZR/PGR/Bezirk; page figures unchanged | `mart_area_demographics.sql` #372 filter and test | ✓ |

Two points needed wording:
- **"Earlier" in the `/thesis-recheck` bullet before the correction** ("Its earlier results remain
  documented…"). The §4 results are now the corrected ones, not "earlier" ones. Fixed in A1 below.
- **The single remaining directional result.** "Which series leads?" now prints, for the EWR panel,
  "commercial change leads status change (H3a; against the thesis)". That holds at k = 2 only. And
  the "status" in that panel is the resident-register **population composite** (age, migration,
  residence duration), not social status. The geo-DS sentence (R1) fixes the public reading.
  **I confirm it verbatim.** It goes at the end of the §4 banner.

## 3. Final texts (verbatim; replace the DRAFTs)

The geo-DS calls the §4 banner "B1" and the file-top note "B2"; my earlier review used the reverse
labels. To avoid confusion, the texts below are named by **where they go**.

**A1: `web/pages/thesis-recheck.md`, the bullet before the correction (l. 446–448).** Replace:

> "- **The resident-register (EWR) panel is outside this re-test.** Its earlier results remain
>   documented in the [E1 regression findings](…), §4."

with (link unchanged):

> "- **The resident-register (EWR) panel is outside this re-test.** Its results are documented
>   separately in the [E1 regression findings](…), §4."

**A2: `web/pages/thesis-recheck.md`, the correction bullet (l. 449–454).** Keep the 05ed2ad41 text
verbatim:

> "- **Correction (November 2026):** the resident-register results in E1 §4 were first computed with
>   an error in how pre-2021 population shares were carried over to the 2021 area boundaries
>   ([#381](https://github.com/dhelweg/gentriduck/issues/381)). They have now been re-run on
>   corrected data: 6 of the 13 verdicts are no longer significant, and most of the rest rely on tests
>   the findings already flag as weak. No verdict on this page changed; two sensitivity figures moved
>   slightly."

**FILE-TOP NOTE: `CORRECTION_NOTES_TOP` in `analysis/e1_regressions.py`, rendered at the top of
`docs/epic-e/E1-regression-findings.md`.** Keep the branch-head text (162b2e856) verbatim:

> "**Correction (November 2026, #381):** Section 4 (EWR resident-register composite, 2014–2020) and
> the EWR lines of the Overall Scorecard and of 'Which series leads?' were regenerated on corrected
> data; see the note at the top of Section 4. All other sections, including the H1 cross-section in
> Section 1, are not affected by that error: their estimates, p-values and verdicts are unchanged.
> Their bootstrap confidence intervals differ from the previous version in the third decimal because
> the bootstrap now runs on a fixed row order (#364); from this version on they are reproducible from
> run to run."

**§4 BANNER: `CORRECTION_NOTES_SECTION4` in `analysis/e1_regressions.py`, rendered under "## Results
— Section 4".** This is the 05ed2ad41 text with the geo-DS R1 sentence appended:

> "**Correction (November 2026, #381).** This section was regenerated on corrected data. Its first
> version carried pre-2021 resident-register shares and averages over to the 2021 area boundaries by
> area instead of by population. With the correction, 6 of the 13 verdicts change from SUPPORTED to
> NOT SIGNIFICANT: H2 OLS at k = 1, 2 and 4, H3a cross-lagged at k = 1, and H3b cross-lagged at k = 1
> and 2. The 7 that remain SUPPORTED are two to five times weaker than before; six of them (the H2 and
> H3c Spearman rows) rely on analytic p-values over pooled, non-independent rows, and the one
> cross-lagged result that holds (H3a, k = 2) is about half as strong. The earlier reading that this
> panel supports H2 and H3, with both series leading each other, no longer holds. The one directional
> result left (commercial change before change in the population composite, at k = 2 only; none at
> k = 1) is not robust across lags and is not a statement about social status."

**C: `web/pages/open-data.md`, the paragraph after the sources table.** Keep the 05ed2ad41 text
verbatim:

> "**Correction (November 2026, [#381](https://github.com/dhelweg/gentriduck/issues/381)):** in the
> site's bundled Berlin demographics data, the shares and averages for 2008–2020 (for example
> age-structure or nationality shares) were wrong because of how they were carried over to the 2021
> area boundaries. They have been corrected. The bundle now has 2008–2020 values only for
> Bezirksregionen, Prognoseräume and Bezirke: at the finer Planungsraum and Ortsteil level, resident
> counts carried over from the old boundaries are not reliable
> ([#372](https://github.com/dhelweg/gentriduck/issues/372)), so those years are left out there. The
> demographic figures shown on the site's pages are current values and did not change."

**Housekeeping (required).** Remove the "DRAFT … pending the R-C1 dual-gate check" wording from:
- the HTML comments in `thesis-recheck.md` and `open-data.md`;
- the comment above the constants in `e1_regressions.py`.

Keep the history line ("the interim wording was domain-ratified in
381-correction-domain-review.md").

## 4. Optional

- **O1** In the E1 generator, label the EWR panel's "Which series leads?" lines with "composite
  change" instead of "status change" (e.g. "commercial change leads change in the population
  composite (H3a; k = 2 only)"). The §4 banner covers the public reading until then.
- **O2** Close #381 only after the next release has published the resolved texts. The interim
  notes stay live on `main` until that release.

Verdict: PASS (conditional on the §3 final texts being applied verbatim; no re-check needed)

---

## Re-check (2026-11-23, `feat/381-formula-fix` @ 5b895d4ae)

| Item | Status |
|---|---|
| A1 `/thesis-recheck` "Its results are documented separately in the [E1 regression findings](…), §4." | **Met**, verbatim. |
| A2 correction bullet, E1 file-top note (`CORRECTION_NOTES_TOP`), C `/open-data` paragraph | **Met**, unchanged as required. |
| §4 banner (`CORRECTION_NOTES_SECTION4`) with the geo-DS R1 sentence | **Met**, verbatim. Rendered under the Section 4 heading. |
| DRAFT markers | **Removed** from both pages and `e1_regressions.py`. |
| O1 "composite change" | **Adopted, correctly scoped.** Only the EWR direction lines read "commercial change leads composite change" (Section 4 l. 151 and "Which series leads?" l. 222). The MSS lines keep "status change", which is right there because their outcome is MSS social status. |

Verdict: PASS
