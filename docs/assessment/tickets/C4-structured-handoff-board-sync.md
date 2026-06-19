[C4] Structured, machine-readable handoff + PM board auto-sync at task close

## Why (problem)
Handoffs are narrative markdown and the board drifts: handoffs note "board still shows Todo, needs manual move",
and the next PM session must re-read prose to reconstruct state. There is no machine-readable record of what is
in progress, what is blocked, capacity used, or pending sign-offs — so resumption is error-prone and the board
lags reality.

## Goal
A small structured state file the PM reads/writes each session, plus a discipline that the board is updated when
a task changes state — so any session (incl. the overnight `--print` runner) can resume deterministically.

## Scope & approach
1. Define `docs/handoff/state.json` (or `.yaml`): current in-progress issue, blocked issues + reason, pending
   sign-offs (issue → geo/domain verdict status), last-merged PR, capacity proxy (loops/turns), disk headroom.
2. Update `project-manager.md` so the PM: reads `state.json` at start; at task close, moves the GitHub Project
   item (`gh project item-edit`) **and** updates `state.json`; keeps exactly one item In Progress.
3. Optionally add a tiny `poe pm-state` helper to print/validate the file. Keep narrative handoffs as a human
   summary, but make `state.json` the source of truth for resumption.
4. Backfill `state.json` once from the current board/handoffs.

## Acceptance criteria
- `state.json` schema defined and committed; backfilled to current reality.
- `project-manager.md` mandates read-at-start and update-at-close (board move + state file).
- A dry run shows a board item moved and `state.json` updated on task close.

## Gate / sign-off
PM + architect. Maintainer approves the process change.

## Dependencies / relations
Independent; improves every subsequent session. Complements C1 (records pending sign-offs).

## References
- `docs/handoff/*` (narrative), `.claude/agents/project-manager.md`
- `docs/assessment/2026-06-19-pm-architect-review.md` §3 (O4)
