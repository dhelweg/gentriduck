# `docs/method/` — AI-assisted operating model & engineering retrospective

Reference documentation for Gentriduck's multi-agent development process.

| Document | What it covers |
|---|---|
| [operating-model.md](operating-model.md) | How to run an AI-assisted data project like this: the agent roster, the coder ↔ reviewer ↔ methodology-gate loop, branch model, and how to replicate the setup on a new project. |
| [retrospective.md](retrospective.md) | Key architecture and methodology decisions, concrete findings from the gate mechanisms, iteration/throughput observations, and pitfalls to avoid. |

## Relationship to other docs

- The **live backlog** is the GitHub Project board (issues + `docs/PROJECT_PLAN.md`).
- **Architecture decisions** live in `docs/adr/` — each decision the operating model relies on is cross-referenced from the relevant sections below.
- **Methodology sign-offs** (geo-DS + domain expert verdicts) live in `docs/epic-*/` and `docs/methodology/`.
- **Session handoffs** live in `docs/handoff/` (the most recent is the starting point for each session).

These files are living documentation. Append new milestones and lessons at the end of each document rather than rewriting earlier sections; it keeps the history of what happened visible.
