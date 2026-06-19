[C1] Enforce the methodology sign-off gate (no merge of methodology-bearing work with verdict pending/concerns)

## Why (problem)
The methodology gate is advisory and it leaked. The geo-DS "gates the merge of methodology-bearing work"
(`.claude/agents/geo-data-scientist.md:3`), but the PM loop lists the step as "implement → review →
(methodology sign-off) → merge" with sign-off **in parentheses** (`.claude/agents/project-manager.md:14`).
In practice E1/E2 (#30/#31) — methodology-bearing, and carrying the §2.4 misframing — were implemented, written
to findings docs, and merged in PR #62 with the geo-DS sign-off still "pending". Nothing structural stopped it.

## Goal
A binding gate: index/regression/ML/index-feeding work cannot merge unless the geo-DS **and** the domain expert
(C0) have a recorded `pass`.

## Scope & approach
1. Define what counts as "methodology-bearing" (a label `methodology` and/or paths: `transform/models/**index**`,
   `int_*gentrification*`, `int_*socioeco*`, `analysis/**`, `docs/methodology/**`).
2. Record verdicts as durable artifacts: e.g. `docs/signoffs/<issue>-geo.json` and `-domain.json` (the JSON
   schema the agents already emit), or a model-meta key. One source of truth.
3. Enforcement (pick the lightest that works locally/free):
   - PM checklist made mandatory in `project-manager.md` (de-parenthesise the sign-off step; PM must verify both
     verdicts = `pass` before `gh pr merge`), **and**
   - a pre-merge check (pre-push hook or a `poe gate` script / CI) that fails if a touched methodology path lacks
     a matching `pass` sign-off file for the issue.
4. Document the rule in `CLAUDE.md` golden rules.

## Acceptance criteria
- "Methodology-bearing" is defined (label + path globs).
- A mechanical check blocks merge when a required `pass` sign-off is missing; verified with a dummy case.
- `project-manager.md` sign-off step is mandatory (not parenthetical); CLAUDE.md updated.
- Works locally and free (no paid CI required).

## Gate / sign-off
Architect + PM. Maintainer approves the process change.

## Dependencies / relations
Depends on C0 (domain verdict exists). Pairs with C2 (grounding). Directly motivated by #30/#31/PR #62.

## References
- `.claude/agents/project-manager.md`, `.claude/agents/geo-data-scientist.md`, `.claude/skills/de-review`
- `docs/assessment/2026-06-19-pm-architect-review.md` §3 (O1)
