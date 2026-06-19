[O1] Method showcase: document the AI-assisted multi-agent operating model + engineering retrospective

## Why (problem)
Gentriduck is built by a team of specialised AI agents under a structured workflow (coder↔reviewer↔methodology
gate, ADR tool-gate, structured handoffs). That operating model is itself a reusable asset, but it is currently
spread across `CLAUDE.md`, `.claude/agents/*`, `.claude/skills/*` and `docs/PROJECT_PLAN.md`. Consolidating it
into a coherent, reproducible reference makes the **method** a first-class output and eases onboarding.

## Goal
A polished `docs/method/` reference describing the operating model, plus an honest **engineering retrospective**,
reproducible by others.

## Scope & approach
- Consolidate the operating model into a "how to run an AI-assisted data project like this" guide: the agent
  roster + responsibilities, the coder↔reviewer↔(geo-DS + domain) loop, the binding methodology gate (R-C1),
  the grounding rule (R-C2), ADR tool-gate, structured handoffs, local-first gates.
- **Retrospective:** key decisions, what the gates caught (e.g. the enforced methodology gate; the E1
  misframing caught in review), iteration/throughput observations, and pitfalls to avoid.
- Living doc, updated at milestones; linked from `README.md`.

## Acceptance criteria
- `docs/method/` published (operating model + retrospective), linked from README; reproducible setup steps.
- Reads as a standalone reference someone outside the project could follow.
- Contains no personal, employer, or non-project content.

## Gate / sign-off
architect + PM author; data-analyst polish. No methodology gate (process doc).

## Dependencies / relations
A6 (agent team). Reflects C0–C4 (process hardening). Cross-cutting output.

## References
- `CLAUDE.md`, `.claude/agents/*`, `.claude/skills/*`, `docs/PROJECT_PLAN.md` (agent team & gates)
