# Session handoff — 2026-11-03..06 — #371 matched comparison, #369, #357, release bundle

Maintainer-driven session: Opus subagents, coder↔reviewer, dual methodology gate. Previous note:
`archive/2026-11-02-hamburg-suite-matched-prereg.md`.

## Integrated into develop (not yet released)
- **#371 matched Berlin–Hamburg comparison** (closed), merged as `c4d70a287`.
  - Data:
    - Hamburg Sozialmonitoring annex indicators 2016–2025 (`stg_hamburg_sozialmonitoring_indicators`,
      ADR-0014 amendment);
    - Berlin EWR age bands (`int_berlin_ewr_age_bands_plr2021`, which carries the single Berlin
      population, P);
    - evidence in `docs/epic-e/371-data-checks.md`.
  - Pre-registration `docs/methodology/371-matched-comparison-preregistration.md`, with:
    - **Amendment 4** (pre-results): area-only LOR crosswalk disclosure plus the W24 sensitivity;
      the single P; **R19**, under which the HH S3 2019 base is re-based to the publisher revision
      (s3_2022 − D3_2022) and becomes the primary, following the Bericht 2021 AsylbLG counting
      change;
    - **Amendment 5** (post-results-generation, disclosed): the A5.1 flip definition and A5.2 BH
      inside the ≥5,000 panel. Its correction note records that the BER H2 trigger came from a
      B=29 debug run;
    - the M3 clarification.
  - Analysis: `analysis/thesis_matched_panel.py` (`--panel matched`). Outputs are
    `docs/epic-e/matched-comparison-results.csv`, its metadata, and
    `E1c-matched-comparison-findings.md`. Reruns are byte-identical.
  - Page `/berlin-vs-hamburg`.
  - Sign-offs: geo + domain PASS on the pre-registration, Amendments 4/5, the results
    (`docs/epic-e/371-results-*`) and the page wording (`371c-page-*`).
  - **Headline (binding):** compared like for like, Berlin and Hamburg show no detectable
    difference in how the local POI mix relates to neighbourhood disadvantage. The comparison can
    only detect large differences, so this does not mean the cities are the same. The other
    results:
    - All 8 X8 rows are NO DIFFERENCE DETECTED, mostly "too imprecise".
    - Both cities: H1, H1a and H1b are supported.
    - BER H1c is contradicted (it reads as a sports-share artefact).
    - BER H2 is "consistent (still unclear)": it is W2-only, vanishes under core-2, and adds
      nothing beyond the starting disadvantage.
    - H3 and N are null.
    - BER N1 could not be tested (19 blocks, below the floor of 20).
- **#369 release-deploy sources binding** (closed), merged as `a8a6df3af`.
  - The build marker is bound to the `npm run sources` data, and the release rebuild uses
    `sources:strict`.
  - **ADR-0012 Amendment C** (auto-deploy after the maintainer's release merge) has geo + domain
    PASS.
  - The first release after #369 always rebuilds.
  - `settings.json` already allows `Bash(uv *)`, so no new rule was added. The deploy prompt seen
    earlier came from the auto-mode classifier.
- **#357 zero-POI density**, on branch `feat/357-zero-poi-density` (DE review APPROVE; domain copy
  R1 applied verbatim). The map mart zero-fills standard rows, with `oa_domain` NULL and
  `is_zero_filled`. No OA or analysis input changes.

## Maintainer decision 2026-11-05: bundled release
Release once #357, #368 and #358 are also in `develop`, in that order. Then open the develop→main PR;
the maintainer merges it, and the PM rebuilds from `main` and deploys (ADR-0012 Amendment C).
- **Release PR body:** list the public pages changed, with their sign-off verdicts (domain
  recommendation).
- **"Release live" message:** list the methodology-bearing tickets (geo recommendation).

## Next
#368 (site-wide pages: timeline, about, how-it's-built/organised, open data; mention the Hamburg
suite and `/berlin-vs-hamburg`) → #358 (neutral status trend + leading stage number, dual gate) →
release PR. After that: #363 (determinism, with a new comment on improved-lineage float drift and a
stale C1 doc), #364, #370, #372 (crosswalked 2018/2020 PLR populations on the public site).

## Open follow-ups
- #356, #362, #365, #366, #372.
- Optional: filter the `mart_poi_offering_advantage_map` web source to `weight_variant =
  'standard'` (payload budget, #210).
