# #381 interim correction notes: geo-DS sign-off (R-C1)

- **Date:** 2026-11-23.
- **Scope:** commit bd128d7f5 on `feat/381-crosswalk-shares`. It covers the `/thesis-recheck`
  line, the E1 top and §4 notes (constants in `analysis/e1_regressions.py`) and the `/open-data`
  paragraph.
- **Checked against:** `docs/epic-c/381-geo-triage.md` and the scratch re-run.

## Accurate

- "6 of the 13 verdicts … change from SUPPORTED to NOT SIGNIFICANT". The six are H2 OLS k = 1/2/4,
  H3a k = 1, H3b k = 1 and H3b k = 2.
- "No verdict on this page changes; two sensitivity figures will shift slightly". Only the two
  modern "+ D4" rows move.
- The scope of the E1 top note (§4 plus the EWR scorecard and lead lines; the other sections not
  affected).
- The `/open-data` paragraph: shares and means 2008–2020 are wrong; counts and 2021+ values are not
  affected by this error.

## Two inaccuracies (wording only)

**1. "three to five times weaker" overstates the range.** H3a k = 2 drops only 2.2× (−0.185 →
−0.084), and H3c drops about 3.2–4×. In `CORRECTION_NOTES_SECTION4`, replace:

> "and the correlations are three to five times weaker"

with:

> "and the correlations are two to five times weaker"

**2. "the remaining verdicts rely on analytic p-values over pooled, non-independent rows" is not
true for every remaining verdict.** H3a cross-lagged k = 2 stays SUPPORTED (−0.084,
cluster-bootstrap CI [−0.152, −0.017]).

In `CORRECTION_NOTES_SECTION4`, replace:

> "the remaining verdicts rely on analytic p-values over pooled, non-independent rows and are weak
> as well."

with:

> "of the remaining seven, six rely on analytic p-values over pooled, non-independent rows, and
> the one cross-lagged result that holds (H3a, k = 2) is about half as strong."

In `/thesis-recheck`, replace:

> "and the rest rely on tests the findings already flag as weak."

with:

> "and most of the rest rely on tests the findings already flag as weak."

The domain expert should confirm that the two replacements keep the meaning they ratified. A
re-check of the two sentences is enough.

Verdict (first round): CONCERNS (superseded below)

**Re-check (1ba7ff447):** Both replacements are applied verbatim: "two to five times weaker" and the "remaining seven … (H3a, k = 2)" sentence in the E1 §4 constant and doc, and "most of the rest" on `/thesis-recheck`. The old phrases are removed. Accurate.

Verdict: PASS
