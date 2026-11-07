# #371 page `/berlin-vs-hamburg`: geo-DS wording sign-off

- **Date:** 2026-11-05.
- **Scope:** the statistical statements in `web/pages/berlin-vs-hamburg.md` and
  `web/sources/gentriduck_findings/matched_comparison.sql` at c36eca05c, checked against the
  pre-registration (PR, through A5 and its correction note) and
  `E1c-matched-comparison-findings.md`.
- **Not in scope:** code style and layout. I did not review the screenshot.

## Checks

- **MDD qualifier: correct.**
  - The thresholds 0.10 (AUC) and 0.30 (ρ) are the pre-registered ones (PR §0/§6.3 statement rule).
  - The qualifier is evaluated from `mdd` and `estimator`, so H3c (0.213) and N3 (0.280) correctly
    carry none.
- **Flag labels: correct.** They follow the A5.1 rules:
  - "(unadjusted significance change)" where significance differs;
  - "(sign unstable around zero)" where both are non-significant;
  - `maup_flip` is sign-only and uses the matched-vs-fine p values (F1).

  The labels reproduce the findings at 2e818492, e.g. X8 H2: core-3M = significance change,
  core-2 = sign unstable. Disclosure-type flags are handled in the legend.
- **Statement-rule line: correct.** It is a faithful plain-language summary of §6.3 with A5.2.
  "None of the eight comparisons gives a difference in the main test" is guarded on
  x8_differs = 0.
- **D6 note: correct.** It sits with the W2-only exploratory row, not the primary. It states that
  Hamburg is below chance in W2 and that the pooled main comparison detects no difference
  (Amendment 3, D6; geo R3).
- **Methods box: correct, except for the over-claim in Required change 2 below.** It states 143 BZR
  vs 99 Stadtteile, Berlin T\*, the 2019/2021/2023/2025 editions, 24 blocks, B = 1999, and BH over
  T8 and X8. M3 interpolation and the R19 primary base (with R19-pub as a check) are disclosed.

## Required changes (wording only)

**1. Wrong reason given for core-3M ("Reading the checks" paragraph).** Construct gap 5 (PR §3.2,
D1) is that *Hamburg's* K double-weights unemployment, because Hamburg T includes the unemployed. It
is not Berlin's indicator that counts unemployment twice.
- Replace: "Berlin's uncorrected welfare indicator, for example, counts unemployment twice in the
  disadvantage score, which is why the corrected one is used for every verdict."
- With: "With Berlin's uncorrected welfare indicator, for example, the two cities weigh unemployment
  differently (Hamburg's welfare figure includes unemployed recipients, Berlin's uncorrected one
  does not), which is why the corrected one is used for every verdict."

**2. "Fixed in advance" over-claims (methods box).** Amendment 5, which fixed the flag definition
and the ≥ 5,000 reading of the statement rule, was written after the first binding run existed, and
before interpretation.
- Replace: "The design, the checks and this page's statement rule were registered before the
  results were computed:"
- With: "The design, the checks and this page's statement rule were registered before the results
  were computed. One later clarification of how the checks are scored (Amendment 5) was added after
  the first run and before the results were interpreted, and is disclosed in the findings:"

Neither change touches a statistic or a guard. A re-check of the two sentences is enough.

Verdict (first round): CONCERNS (superseded below)

**Re-check (83434904d):** Required change 1 (lines 507–510) now says Berlin's uncorrected indicator leaves out unemployed recipients while Hamburg's includes them, so the two cities weigh unemployment differently. That is equivalent to my text and correct for gap 5. Required change 2 (lines 404–407) now discloses that two clarifications were added after the results were computed (Amendment 5). It does not say "before interpretation", but it is accurate and no longer over-claims. Both met.

Verdict: PASS
