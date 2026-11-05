# Session handoff — 2026-11-01/02 — release, Hamburg suite, one-step deploy, #371 pre-registration

Maintainer-driven session: Opus subagents, coder↔reviewer, dual methodology gate. It stopped on
request because the weekly limit was close. Previous note: `archive/2026-11-01.md`.

## Released and deployed
- **PR #367** (#360 + #354), merged by the maintainer. Rebuilt from `main` (`ef1f23c8`) and deployed
  to gh-pages. Live `/thesis-recheck` was verified.

## Integrated into develop (not yet released)
- **#355 Hamburg hypothesis suite, closed by this session's work.**
  - The analysis covers the full chain 2013–2025 and pivot 2022 side by side:
    `docs/epic-h/H-thesis-hypothesis-suite-findings.md`.
  - Amendment 3, ratified by both reviewers: a below-chance AUC is NOT SIGNIFICANT and gets no
    inverse reading.
  - New page `/hamburg/thesis-recheck`. H1/H2 are shown as "Not comparable": there is no business
    category at Gebiet grain. H1a is tentative. H1b holds, H1c runs opposite, H3 is n.s.
  - E5 is superseded.
  - Sign-offs: `docs/epic-h/355-*`, `355c-page-*`.
- **#361 one-step release deploy:** `uv run poe release-deploy`.
  - It skips the rebuild only when the tree, the data fingerprint and the export stamps match
    `origin/main`.
  - `poe build` now writes `data/.warehouse-source`; the record is voided while a build runs. The
    provenance files are now gitignored.

## Maintainer decisions (2026-11-02)
1. **Auto-deploy (option A).** The PM deploys unprompted after the release merge.
   - The ADR-0012 **Amendment C text is approved**. It is committed (Accepted) on
     branch `feat/369-release-deploy-sources` (pushed), where the #369 fix also goes. It still needs a
     brief geo/domain pass, since it sits under `docs/adr/`.
   - Add the permission rule `Bash(uv run poe release-deploy)` only after #369 lands.
2. **#358.** Neutral "status trend" (improving / stable / worsening) plus a **leading stage number**
   (cycle position), so an alphabetical sort is also cycle order. Remove the "highest pressure"
   ordering and wording. Dual sign-off.
3. **#363 O1: option B.** Restate the ADR-0017 mass-conservation invariant with a tolerance. Kernel
   mass across the city boundary is intended ("the corner matters, not Berlin vs Brandenburg"). Fix the
   vacuous test join.

## In progress: #371 matched Berlin–Hamburg comparison
- Branch `feat/371-matched-comparison` (pushed). The local worktree is in the scratchpad (`wt371`) and
  can be removed.
- **ADR-0014 amendment** (Hamburg annex indicator z-scores, outcome-only): approved by the maintainer
  and committed on the branch, with `daten.transparenz.hamburg.de` added to egress-hosts.
- **Pre-registration** `docs/methodology/371-matched-comparison-preregistration.md`: Revisions 1–3
  plus D10. Geo-DS authored it; domain review PASS after D10.
  - Grain: BZR vs Stadtteil, with a spatial block bootstrap (24 blocks).
  - Harmonised core: U, **T\***, child poverty. Berlin T\* adds the unemployed back via EWR age bands,
    which corrects the double-counting of unemployment (maintainer question).
  - Windows: editions 2019–2025, changes from levels.
  - City × hypothesis difference test, with a strict public-statement rule.
  - New hypotheses: N1 (level-conditional H3a), N2 (café/fast-food ratio change, not an
    "early signal"), N3 (spatial lag, exploratory).
  - PM decisions: M1 separate CSV, M3 interpolated 2022 weights, M4 all 99 Stadtteile.
- **Next:** data-engineer ingests the annex (pinned URLs, openpyxl, dbt tests). It must also stage the
  Berlin EWR age bands, and run the binding DE checks 1–7 in the pre-registration. Then the matched
  panel, DE review, dual sign-off, findings, page.

## Queue after #371
#368 site-wide pages (timeline etc.) → #369 + ADR-0012 Amendment C → #358 → #363 → #357, #364 →
#370 (agent setup vs subscription tier; publish on /how-its-organised).

## Other new issues this session
#366 (OSM cuisine tag) · #370 · #371.
