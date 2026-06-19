[B2] Ground-truth back-test harness: validate the live index vs. MSS classes & known hotspots

## Why (problem)
There is currently no answer to "does the index actually work?". The live `gentrification_score` is published
without any check that it identifies neighbourhoods that are, by independent evidence, gentrifying. With the MSS
ingested (A3) we have an official ground truth, and the Berlin gentrification literature gives well-known
hotspots (Reuterkiez / nördl. Neukölln, Prenzlauer Berg, parts of Friedrichshain-Kreuzberg) and stable/cold
areas (outer Marzahn-Hellersdorf, Lichtenberg fringes).

## Goal
A repeatable harness that scores the live index against MSS classes and a curated hotspot/coldspot list, with
clear pass/fail thresholds, so regressions in methodology are caught.

## Scope & approach
1. Curate `seeds/seed_gentrification_ground_truth.csv`: a small, cited list of PLRs labelled hotspot / coldspot
   / mixed with source notes (literature + MSS). Keep it golden and reviewed.
2. Build a back-test (`analysis/backtest_index.py`, run under the gate per C3): compare the live index/lead-lag
   output against (a) MSS Status/Dynamik classes (agreement, rank correlation, confusion matrix) and (b) the
   curated hotspots (does the top-decile include them?).
3. Report metrics + maps; write `docs/methodology/backtest.md`. Add a `poe` task and a CI check that fails if
   agreement drops below an agreed threshold.

## Acceptance criteria
- Ground-truth seed exists, reviewed by the domain expert, with citations.
- Back-test computes agreement vs. MSS and hotspot recall; thresholds defined.
- Runs deterministically under `poe`/CI; `docs/methodology/backtest.md` written.
- `uv run poe build` green.

## Gate / sign-off
geo-DS `pass` (metrics) + domain-expert `pass` (ground-truth labels).

## Dependencies / relations
Depends on A3 (MSS) and A1 (index). Consumes C3 (gated analysis). Feeds G2 (#38) credibility.

## References
- `docs/assessment/2026-06-19-pm-architect-review.md` §2.5, §4
- MSS reports (Status/Dynamik classes); Berlin gentrification literature (Döring & Ulbricht; Holm & Schulz)
