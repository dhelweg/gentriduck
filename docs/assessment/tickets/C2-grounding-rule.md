[C2] Grounding rule: methodology work must cite the thesis/literature it operationalizes; reviewer checks it

## Why (problem)
The root cause of the E1 misframing was ungrounded assumptions. `analysis/e1_regressions.py:53-58` hardcodes
`THESIS_DIRECTION = {all "positive"}` with no citation, and the docstring describes hypotheses the code does not
implement. The coder↔reviewer loop checks build/tests/lint/SPEC — it has no basis to catch a hypothesis invented
out of thin air. There is no rule requiring methodology choices (hypotheses, indicators, weights, signs, spatial
methods) to cite the thesis section or literature they come from.

## Goal
Every methodology-bearing choice carries an explicit citation; the reviewer verifies the citation exists and
matches, so invented expectations are caught before sign-off.

## Scope & approach
1. Add a **grounding requirement** to the relevant docs/skills:
   - `.claude/skills/de-implement`: methodology choices (hypotheses, indicator definitions+signs, weights,
     spatial method) must cite source (thesis page / ADR / paper) inline or in the SPEC.
   - `.claude/skills/de-review` + `geo-data-scientist.md` + the C0 domain expert: reviewer/sign-off must confirm
     each such choice has a citation and that it matches the cited source.
   - `CLAUDE.md` golden rules: add the one-line rule.
2. Provide a tiny template/checklist (e.g. a "Methodology provenance" section for SPECs and findings docs).

## Acceptance criteria
- de-implement and de-review skills updated with the grounding requirement and a check step.
- geo-DS + domain-expert sign-off explicitly includes "citations present and correct".
- CLAUDE.md golden rules updated.
- Demonstrated on A2: the rewritten E1/E2 cite thesis pages for each hypothesis/direction.

## Gate / sign-off
Architect (owns skills/process). Maintainer approves.

## Dependencies / relations
Pairs with C1 (gate). Enables A2 to be done right. Cheap; do early.

## References
- `analysis/e1_regressions.py:10-13,53-58`
- `.claude/skills/de-implement`, `.claude/skills/de-review`
- `docs/assessment/2026-06-19-pm-architect-review.md` §3 (O2)
