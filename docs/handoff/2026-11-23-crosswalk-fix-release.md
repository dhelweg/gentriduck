# Session handoff — 2026-11-07..23 — releases #377/#382, #363, #381 crosswalk fix

Stopped on maintainer request (token budget). Previous note: `archive/2026-11-06-matched-comparison-release-bundle.md`.

## Live on main (deployed 2026-11-23)
- **PR #377:** #355, #361, #369, #371, #357, #368, #358.
- **PR #382:** the items below.
  - **#381:** pre-2021 Berlin EWR shares and means now use the C3 population-weighted crosswalk.
    - E1 §4 regenerated: 6 of 13 verdicts flip.
    - #354 suite: two "+ D4" sensitivity rows moved; no verdict change.
    - Final correction texts are on `/thesis-recheck`, `/open-data` and E1.
  - **#372:** pre-2021 PLR/Ortsteil rows removed from the demographics bundle.
  - **#364:** E1 is deterministic.
  - **#363:**
    - The ADR-0017 C-1 amendment is accepted (maintainer, 2026-11-23). It contrasts with the thesis's un-normalized PLR-to-PLR spread.
    - Gaussian city code is now 'BER'.
    - Deterministic dominance tie-break, disclosed on the pages.
    - C1 regenerated.
- The deploy is the one-step `uv run poe release-deploy` after a `poe build` on `main`. The auto-mode classifier did not prompt.

## In progress: #374 (paused, no commits; branch `feat/374-hh-gebiet-stadtteil` = develop)
- **Fallback scope:** the only nearest-Stadtteil fallback is in `dim_area_hierarchy.sql` (`hh_l2_fallback`). Exactly 2 Gebiete use it.
- **90001:** Gut Moor is correct. Its centroid falls 16 m outside a concave polygon; the prefix rule agrees.
- **106001:** wrongly assigned to Schnelsen. The polygon touches no Stadtteil, and its centroid lies about 7 km north, outside Hamburg (near Quickborn). The answer is likely "no Stadtteil" (flagged).
- **Prefix rule:** "Stadtteil number = code minus its last 3 digits" holds for all 941 other Gebiete. The Sozialmonitoring `stadtteil_name` column confirms all 862 Gebiete it lists. Hamm-Nord/-Mitte/-Süd (prefixes 8, 9, 10) all map to Hamm.
- **Next:**
  - check whether 106001 feeds any Stadtteil sums, the #371 matched panel or the #355 suite. If yes, it needs dual-gate approval before any change;
  - then implement the prefix rule with the Sozialmonitoring cross-check, plus tests.

## Queue (maintainer order)
#374 → #373 (with external PR #378 as input; security-reviewed: one CSS rule plus Evidence's default layout. Do NOT merge #378; the maintainer decides) → #379 (dominance tie flag) → #376 (trajectory-type labels) → #380, #375, #383 (2018 weighting distortion, low priority) → #370.

## Open follow-ups
#356, #362, #365, #366. Leftover from a reviewer: a `C:\c\…\rv358r2\out\` folder; the maintainer can delete it by hand.
