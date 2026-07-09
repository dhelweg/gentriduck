# Session handoffs

`state.json` carries the machine-readable board/loop state; the `.md` files here are
human-readable session notes for the "resume" convention in `CLAUDE.md` ("start with the
latest session handoff").

## Compaction policy (QA-9, #184)

By 2026-07-09 this directory had grown to 139 files (~124 near-identical `devmode-N` notes,
up to ~60/day) — noise, not signal. Policy going forward:

- **Skip writing a handoff when a cycle changed nothing** (no ticket advanced, nothing
  merged, nothing newly blocked). `state.json` already carries that machine state; a
  no-op handoff note adds nothing a `git log`/board check wouldn't show faster.
- **Archive by day.** Once a calendar day's handoff files are no longer the *latest* day,
  concatenate them into one digest at `archive/<YYYY-MM-DD>.md` (chronological, one per day)
  and delete the originals. Keep only the current/most-recent day's file(s) live in this
  directory so "read the latest handoff" stays a one-glance operation.
- The 2026-07-09 compaction pass archived 134 files (2026-06-17 through 2026-07-04) into
  8 digests under `archive/`; the 4 `2026-07-05-*` files were left live as the most recent day.
