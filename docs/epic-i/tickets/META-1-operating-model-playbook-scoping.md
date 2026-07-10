[META-1] Scoping: extract the operating model into an open playbook (parked)

## Why (problem)
The project's supervised-agent operating model (agent pair reviews, enforced methodology gates,
ADR discipline, devmode loop, handoffs, security posture) is itself reusable — a harness-level
playbook for running (open-)data projects with AI agents, in the spirit of Superpowers but
data-project-shaped. Interest exists; a second repo started now would split focus while Epic I
runs.

## Goal
A scoping decision — not an implementation: what the playbook would contain, what form it takes,
and the trigger condition for actually building it.

## Scope & approach
- Inventory what already exists and is generic vs Gentriduck-specific: `docs/process/`
  (operating-model, retrospective), `.claude/agents/` + skills structure, the gate mechanics
  (sign-off files, R-C1 enforcement), ADR templates, `ops/` devmode runner, SEC posture.
- Recommendation to record now: **incubate in place** — keep hardening `docs/process/` as the
  publishable reference (O1 already points there); extract to a standalone repo only when a
  concrete second project wants to adopt it (that adoption is the trigger).
- Scoping output: proposed table of contents, licence thought (MIT like Superpowers), what would
  need genericizing, and effort estimate. No new repo, no new tooling in this ticket.

## Acceptance criteria
- A one-page scoping doc in `docs/process/` with the ToC, extraction trigger, and effort estimate;
  decision recorded to incubate until triggered.

## Gate / sign-off
architect authors; maintainer decides. Parked: label `blocked` (maintainer-gated timing) — pick up
after the Epic I revision wave lands.

## Dependencies / relations
Builds on O1 (#81, `docs/process/`); no Epic I dependency, deliberately sequenced after it.

## References
- `docs/process/operating-model.md` · `docs/process/retrospective.md` · ADR-0009 (Superpowers
  adoption) · ADR-0011 (integration model) · O1 (`docs/PROJECT_PLAN.md`)
