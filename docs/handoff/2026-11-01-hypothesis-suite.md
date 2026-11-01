# Session handoff — 2026-10-28 → 11-01 — MSS label fix, Berlin hypothesis suite (#354)

Maintainer-driven session: Opus subagents, one ticket at a time, with coder↔reviewer review and the
dual methodology gate. Previous note: `archive/2026-10-28.md`.

## Released and deployed

- PR #359 (#351 maps, #352 names, #353 parity) was merged by the maintainer. The site was rebuilt
  from `main` and deployed to gh-pages on 2026-10-28.

## Integrated into develop (not yet released)

- **#360 MSS indicator labels.** The WFS `s1–s4`/`d1–d4` are the official slots S1–S4/D1–D4. Slots
  2–4 had been mislabelled in every edition. Staging now maps per edition via
  `seed_mss_indicator_vocab`, with mutation-tested guards. Published marts are unchanged.
  `rent_pressure_proxy`/D5 changed and must not be consumed until #362. Dual sign-off:
  `docs/epic-c/360-*-signoff.md`.
- **#354 Berlin re-test of all eight hypotheses** (phases A–C):
  - Pre-registration: `docs/methodology/354-355-hypothesis-suite-preregistration.md`, including
    Amendment 1 (min-base handling, pre-results) and Amendment 2 (ΔAUC reading, post-results,
    disclosed). Maintainer decisions are in its §10: keep the 2013–19 panel, native 2019–20 POIs,
    Hamburg full chain + pivot 2022, Benjamini–Hochberg FDR.
  - Phase A: native 2019–20 POI/OA on LOR 2021 (shared macros, token-identical SQL), a zero-filled OA
    panel, C5 native shares, and the Hamburg Sozialmonitoring reference-date and class-order checks.
  - Phase B: `analysis/thesis_hypothesis_suite.py`. Results are in
    `docs/epic-e/thesis-hypothesis-suite-results.csv` and `E1b-berlin-hypothesis-suite-findings.md`.
  - Headline:
    - H1 and H1b hold in both eras.
    - H1c is the opposite direction.
    - H2 is explained by current status level.
    - H3a–c: no detectable ordering.
    - H3b (previously "supported on MSS 2021–25") is **not reproduced**.
  - Phase C: `/thesis-recheck` now shows the 8-row table from the CSV (new Evidence source
    `web/sources/gentriduck_findings/`) and a dated corrections block. Stale claims were fixed on
    index, takeaways and methodology.
  - Sign-offs: `docs/epic-e/354-*-signoff.md` and `354c-page-*-signoff.md`.

## New issues

- #361: one-step release deploy (avoid the rebuild and permission round-trip).
- #362: redesign the `rent_pressure_proxy` aggregation. Its corrected terms are anti-correlated, and
  D5 is barred from consumers until this is done.
- #363 (methodology-bearing, **escalated**): the C1 OA mass-conservation test is vacuous. With it
  fixed, 111 of 236 gaussian cells break the ADR-0017 "blocking" invariant in published marts.
- #364: E1 bootstrap CIs vary between runs (no ORDER BY).
- #365: Moran's I diagnostic on the suite's H3 residuals.
- #366: carry the OSM cuisine tag (döner/kebab sub-check).
- Still open from before: #356, #357, #358 (pressure-trend direction; maintainer and both reviewers
  to decide).

## Next steps (maintainer's call — the session stopped here on request)

1. Weekly `develop → main` release PR (#360 + #354), then rebuild from `main` and run
   `ops/deploy-gh-pages.sh`.
2. **#355 Hamburg:** run the suite with `--city HH`, using the full chain and pivot 2022 side by
   side. Then wire `poe analysis`, write `docs/epic-h/H-thesis-hypothesis-suite-findings.md`, add the
   Hamburg recheck page, retire E5, and get the dual sign-off. The phase B smoke run notes: H2 is low
   power, H1a/b keep n=100, and the commercial-only H1 row has NO DATA.

## Notes

- Hit the Claude session or weekly limit several times. Agents were resumed with their work intact.
- Auto mode blocks `ops/deploy-gh-pages.sh` unless the maintainer explicitly asks for the deploy.
