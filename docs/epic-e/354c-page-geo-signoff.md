# #354 phase C geo-DS public-wording sign-off: /thesis-recheck and related pages

- **Reviewer:** geo-data-scientist (R-C1 gate, ADR-0011)
- **Date:** 2026-11-01
- **Reviewed:** branch `feat/354c-thesis-recheck-page`, commit 9c34e592 (`web/` only)
- **Checked against:** `docs/epic-e/thesis-hypothesis-suite-results.csv` (run 3661079aa212), the
  metadata JSON, findings E1b, and `docs/epic-e/354-geo-signoff.md` §2–§5. The DB was not opened.

Verdict: CONCERNS

Two wording changes are required, both on `web/pages/thesis-recheck.md`. Everything else passes,
including takeaway 1, which is **approved**. When C1 (final text, revised) and C2 are applied verbatim
or with equivalent meaning, the verdict becomes **PASS** without another review round.

## Required changes

**C1: composite/tie-ceiling sentence (revised 2026-11-01 after the computed tie ceiling).**
`web/pages/thesis-recheck.md:119`
- Current: "Our change measure follows the official Dynamik ordering as closely as its three classes allow."
- Re-check: my first version of C1 was wrong. Findings §4 (commit 36b36074, `tie_ceiling()`) computes
  the highest Spearman any continuous measure can reach against the tied three-level Dynamik class:
  0.691 / 0.726 / 0.670 / 0.678 / 0.739 / 0.750 for 2015–2025. The observed ρ(D, class) is 95–100% of
  that ceiling, and in 2019 and 2021 it equals the ceiling. I wrote that the 2019/2021 failure showed ties
  do not explain the gap; the opposite is true. The 0.80 threshold was unattainable in every edition, so
  the tie structure fully accounts for missing it. The current sentence is therefore substantively
  true. It still has to disclose the missed pre-registered threshold, and it should not imply the
  official classes are the truth.
- Final text (proposed for geo-DS and domain): "Our change measure is a continuous score built from
  the same three indicators. Its rank agreement with the official three-class Dynamik ordering is
  about 0.7, which is 95–100% of the highest agreement any continuous score can reach, because most
  areas share one class. That also means the 0.8 agreement we set in advance could not be reached in
  any edition and was missed. Where the score and the classes disagree, we report both."

**C2: H3 sentence: "on the official classes" and "each window".**
`web/pages/thesis-recheck.md:262-263`
- Current: "(all effects negligible, |ρ| ≤ 0.06). This holds for both eras, for each window separately, and on the official classes."
- Problem: |ρ| ≤ 0.06 is correct for the six pooled main tests (maximum 0.055) and the eight per-pivot rows
  (maximum 0.058). But one official-class check is significant: the thesis-era H3b class row,
  ρ 0.096 [0.023, 0.171]. That puts it outside the stated bound and makes it not null, even though it is
  negligible in size. "Each window" is also wrong: the separate rows are per starting point (pivot),
  not per window.
- Proposed: "(all main-test effects negligible, |ρ| ≤ 0.06). This holds for both eras and for each
  starting point separately. On the official classes, one of the many secondary checks came out weakly
  the other way for H3b in the thesis era (ρ 0.10); about 4–5 such checks are expected by chance, so we
  do not read it as a finding."

## Claims verified (pass)

| Claim | Source value | OK |
|---|---|---|
| Table cells: H1 AUC 0.68 / 0.74, H1b ρ 0.47 / 0.44 (`printf('%.2f')`) | 0.676537, 0.740604, 0.465351, 0.444289 | yes |
| Labels via `holds` mapping; raw verdict not selected; primary rows only | CSV `holds` values match the CASE branches | yes |
| H2 "AUC about 0.61, 'poor'" | 0.617 thesis era, 0.609 modern | yes |
| H2 "current level predicts that change better on its own, adding the mix adds nothing" | status alone 0.767 / 0.694 vs OA-only 0.617 / 0.609; ΔAUC −0.018 / −0.004 | yes; matches Amendment 2 (no increment, not "worse") |
| H2 "negligible or absent ... roughly one area in ten classed as worsening" | class rows 0.560 (negligible) / 0.525 n.s.; n_pos 118/1307 = 9.0%, 168/1607 = 10.5% | yes |
| Spurious correlation attributed to the thesis | thesis §6.3.2.1 | yes (domain wording accepted) |
| H1a "cafés per resident go slightly with lower disadvantage (exploratory)" | per-1k ρ −0.168 [−0.282, −0.047] modern; −0.133 thesis era | yes |
| H1b "per resident shows no clear link" | per-1k ρ 0.081 [−0.024, 0.184] modern | yes |
| H1b "about half of all planning areas" | 260/535 = 49%, 188/436 = 43% | acceptable |
| BH sentence (bounds the expected share of false claims, not each result) | pre-registration §5.5 | yes |
| "of about 90 such checks, about 4.5 by chance" | findings §5 tally: 90 rows with a verdict | yes |
| Corrections block: H3b superseded; reasons (one window, no level control, all objects) | 354-geo-signoff §5 | yes |
| "Not like-for-like" / thesis AUCs not shown | pre-registration §1.2 (D4c) | yes |
| index.md, methodology.md §1/§7, methodology-oa-modes.md | no numeric claim beyond the cited E1 ρ +0.15, n = 433 | yes |

## Takeaway 1: approved

`web/pages/takeaways.md` takeaway 1 is accurate against the CSV and the sign-off rules. It covers:
- H1 as a modest association, not a signal;
- H1b as a share among areas with at least ten outlets, plus the per-resident null and the area-level disclaimer;
- H3 as no detectable ordering in either direction or era;
- the current status level predicting change better than the mix (0.767 / 0.694 vs 0.617 / 0.609).

geo-DS approves it. The domain sign-off is still required separately.

## Re-check (applied edits), 2026-11-01

Commit 90ed9aae, `web/pages/thesis-recheck.md`:
- **C1** is applied verbatim (the final tie-ceiling text). It is accurate against findings §4: ≈ 0.7,
  95–100% of the computed ceiling, and the 0.8 threshold disclosed as missed and unattainable.
- **C2** is applied verbatim (the H3 sentence). It is accurate: the main tests are within |ρ| ≤ 0.06
  (maximum 0.055), the separate rows are per starting point, and the thesis-era H3b class row
  (ρ 0.096) is disclosed as chance-level.
- Incidental edits in the same commit, checked:
  - The summary now says H3b is not reproduced and the H3a rejection holds, which matches the
    `holds` labels.
  - The OA gloss now reads "shops, services or public facilities", which is accurate.
  - `string_agg` over `run_sha` is a display-only change.
  - The H1c paragraph merges two sentences of the §1.3 binding text with the meaning unchanged.
    The domain owns that text.

Verdict: PASS
