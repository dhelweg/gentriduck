# #381 fix: geo-DS sign-off (R-C1)

- **Date:** 2026-11-23.
- **Scope:** `feat/381-formula-fix`, `git diff 844e6448e..162b2e856`.
- **Checked against:** `docs/epic-c/381-geo-triage.md` (reference formula and scratch re-run).

## Formula implementation: correct

- **Intensive indicators.** Shares and mean age (seed `unit` ∈ {share, years}) use
  `Σ v·P·w / Σ P·w`.
  - P is the source PLR's `residents_total` in the same year.
  - The denominator is filtered to non-NULL v, so a missing value never dilutes the mean.
- **Extensive indicators.** Counts use `Σ c·w`.
- **Unknown indicators.** An unknown unit gives `indicator_class` NULL and a NULL value. This is
  caught by `test_381_ewr_plr2021_indicator_class_known`.
- **P = 0 and P NULL edge cases:**
  - a source with P = 0 contributes 0 to the numerator and to the denominator, which is correct;
  - if every source has P = 0, `nullif(…, 0)` gives NULL, not a division error or a spurious 0;
  - a NULL P drops out of both sums consistently.
- **Typo fix.** `06200318` → `06200418` for 2024 only, as in the age-band model. Covered by
  `test_381_ewr_plr2021_codes_in_lor`.
- **Tests and mart.** The new tests (share range, male + female = 1, mean-age plausibility, counts
  area-allocated, Bezirk mean age vs native within 0.0002) cover the triage's checks. The #372
  suppression of crosswalked counts at PLR/Ortsteil grain is tested.

## Regenerated E1: matches the triage

**§4.**
- Exactly the six expected flips: H2 OLS k = 1/2/4, H3a k = 1, H3b k = 1 and H3b k = 2.
- The other estimates are identical to my scratch run (e.g. H2 Spearman k = 2 −0.0644; H3a k = 2
  −0.0839).
- §4 now reads Supported 7/13, Contradicted 0, Not significant 6. The whole scorecard reads
  18/63 supported, 8 contradicted, 37 not significant.

**Outside §4.**
- Estimates, p and verdicts are unchanged.
- CI shifts are in the 3rd decimal only, from the fixed row order (#364).

**The borderline §2 verdict (MSS modern H3a k = 1).**
- It reads CONTRADICTED (borderline), CI [0.001, 0.150], analytic p = 0.065.
- The existing "(borderline)" label and the section note ("CI only just excludes 0 while the
  analytic p does not reach 0.05") already state the fragility. No new wording is needed.
- It does not drive the "Which series leads?" line for that panel, which rests on H3b SUPPORTED.

## DRAFT texts B1 and B2

- **B2 (top note): accurate.** It says the other sections are unchanged in estimates, p and
  verdicts, and that CIs differ in the 3rd decimal because of the fixed row order and are now
  reproducible.
- **B1 (§4 banner): accurate.** The six named flips, "7 remain SUPPORTED, two to five times
  weaker", "six of them (the H2 and H3c Spearman rows) rely on analytic p-values …" and "H3a, k = 2
  … about half as strong" all match the table.
- **One addition is needed.** The regenerated "Which series leads?" now prints a single directional
  claim for this panel: "Cross-lagged (EWR) k=2: commercial change leads status change". It holds
  at k = 2 only (k = 1 shows nothing), and "status" here is the EWR composition composite, not
  social status. Without a qualifier this is the panel's new headline. Append to B1, after "… no
  longer holds.":

  > "The one directional result left (commercial change before change in the population
  > composite, at k = 2 only; none at k = 1) is not robust across lags and is not a statement
  > about social status."

## Required change

**R1.** Append the sentence above to `CORRECTION_NOTES_SECTION4` in `analysis/e1_regressions.py`
and regenerate E1. No estimate may change. The domain expert should confirm the wording alongside
the B1 finalisation.

Verdict (first round): CONCERNS (superseded below)

**Re-check (5b895d4ae):** R1 is applied verbatim in the E1 §4 banner. The EWR k=2 direction line now reads "commercial change leads composite change", which is more accurate than my qualifier alone. The regeneration is byte-identical in every estimate, p, CI and verdict. Met.

Verdict: PASS
