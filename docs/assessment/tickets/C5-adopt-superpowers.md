[R-C5] Adopt ADR-0009: cherry-pick Superpowers skills into the setup (pinned)

## Why (problem)
ADR-0009 decided to **complement** (not replace) the bespoke agent setup with a selected set of Superpowers
skills. This ticket implements that decision and flips ADR-0009 to **Accepted**.

## Goal
The chosen Superpowers skills are installed (pinned), available, and integrated without conflicting with
`de-implement`/`de-review`, the binding methodology gate (R-C1), or the PM-driven loop — and the setup stays
reproducible.

## Scope & approach
1. Install Superpowers via the Claude plugin marketplace at a **pinned version**; record the version.
2. Enable only the agreed skills: `brainstorming`, `systematic-debugging`, `verification-before-completion`,
   `writing-skills` (per ADR-0009). Do **not** enable a second competing plan/review/TDD loop.
3. **Adapt** the verification/TDD ethos to our analytics-engineering paradigm — dbt schema/data tests +
   contracts and the leakage/nested-CV guards (R-C3); document the mapping (no red-green-refactor on dbt models).
4. Trial it on **one** upcoming task (e.g. a C-group or ingestion ticket); confirm no regression to the gate
   or loop; note what helped vs. what conflicted.
5. **Document** the install, pinned version, and the enabled-skills list in the method docs (O1, #81) so the
   operating model is reproducible.
6. Flip ADR-0009 to **Accepted** (or revise if the trial surfaces conflicts).

## Acceptance criteria
- Pinned Superpowers install with the agreed skills enabled; version recorded in `docs/method/`.
- One trial task completed with no regression to the binding gate / PM loop; brief notes on value vs. conflict.
- TDD→dbt-test mapping documented; no red-green-refactor forced on dbt.
- ADR-0009 status updated (Accepted or revised).

## Gate / sign-off
Architect + PM; maintainer OK (it's a tooling adoption). Free+open already confirmed (MIT).

## Dependencies / relations
Implements ADR-0009. Relates to O1 (#81, method docs), R-C1/R-C2/R-C3 (process), A6 (agent team).

## References
- `docs/adr/0009-agent-skill-tooling-superpowers.md`
- https://github.com/obra/Superpowers (MIT)
