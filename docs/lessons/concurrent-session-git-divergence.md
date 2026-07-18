# Lesson: two Claude Code sessions working the same repo concurrently causes duplicate work and git divergence

**Class of problem:** any project run by an autonomous/semi-autonomous agent loop against a
shared GitHub repo, where more than one execution channel (a local tmux devmode loop, a
cloud/remote session, a scheduled routine) can independently pick up work. Gentriduck is exactly
this shape (ADR-0011's self-integrating PM). This lesson should generalize to any future
multi-channel agent setup, not just this one incident — treat it as a standing risk, not a
one-off fix.

## What happened (2026-07-18)

This local devmode PM session started with `develop` at `8907c94d` (local, 2 commits ahead of
`origin/develop` — unpushed from an earlier local session). It ran a normal cycle: reconciled the
board, picked up **#280**'s F1 defect (density mislabeled `expected_temporal_safe=true` on
`develop`), implemented the fix, got it code-reviewed, and got an independent geo-DS + domain
R-C1 sign-off (`Verdict: PASS`, clean). It also moved **#284**'s card to `blocked` and added
**#285** to the board.

When it went to push, `git push`/`git pull` reported `origin/develop` had **diverged** — 12
commits ahead on origin's side that this session had no knowledge of. All 12 commits carried the
same trailer:

```
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01JwEisGiQPYsYuMiQYn7kEo
```

— a **separate, single, coherent session** (different session ID, different model — Opus 4.8 vs.
this session's Sonnet 5) that ran from roughly 06:24 to 08:32 UTC on a branch named
`claude/open-issues-blockers-nhgckv` (the `claude/<topic>-<random>` pattern is Claude Code's
auto-generated **cloud/remote session** branch name — not this repo's own `feature/<n>-<slug>` /
`fix/<n>-<slug>` convention used by the local devmode loop). That session independently:

- Fixed the **exact same #280 F1 defect** (density `expected_temporal_safe`), reaching a
  functionally identical fix but a different sign-off wording (`PASS WITH CONDITIONS`, residual
  C-2, vs. this session's clean `PASS` — its sandbox couldn't load the DuckDB `spatial`
  extension, egress-blocked).
- Drafted its own, more thorough **#284 scoping doc** (508 lines vs. this session's 267) plus a
  separate web-feasibility note.
- Filed **#285**'s in-repo SPEC.
- Got the maintainer's **ADR-0025 acceptance** recorded.
- **Self-merged all of it into `origin/develop`** via `gh`/plain git, ahead of this session.

Net effect: **duplicate agent-hours spent on the same three tickets**, a git history divergence
that required a manual merge to reconcile (one real conflict, on `docs/epic-i/I21-ia-restructure-
scoping.md`, resolved by keeping the more thorough origin version), and two different R-C1
sign-off verdicts for the same code that had to be de-duplicated after the fact.

## Root cause

The devmode single-instance guard (#101, #103) only prevents **multiple local tmux loops on the
same machine**. It has **no visibility into cloud/remote Claude Code sessions** — a session
launched from claude.ai/code (mobile, web, or a scheduled routine) runs on Anthropic's
infrastructure, talks to GitHub directly, and is invisible to any local lock file, PID check, or
`tmux has-session` guard. Both channels read the **same GitHub Project board** as their source of
truth for "what's next," but nothing marks a card as *claimed by a specific session* — only as
"In Progress," which either channel can independently interpret as "pick this up." There is no
distributed lock (a comment marker, a card sub-status, a branch-existence check before starting)
that one channel can use to see the other already has a ticket in flight.

This is not a code bug — it is a **missing coordination primitive** between execution channels
that both `git push`/`gh` and both write to the board.

## What limited the damage

- Both sessions independently converged on the **same substantive fix** for #280 (not
  contradictory changes) — the divergence was additive, not conflicting, in every file except one.
- Both sessions ran the **same R-C1 gate discipline** (independent geo-DS + domain-expert review,
  not self-attested) — so neither session's methodology evidence was invalid, just redundant.
- Git's merge machinery caught the one real content collision (`I21-ia-restructure-scoping.md`)
  as an explicit conflict rather than silently picking one side — nothing was silently lost.

## Recommendation (feeds into the #234 meta/playbook ticket, and immediate remediation)

1. **Before starting work on a ticket, check for an in-flight signal beyond the board's Status
   field** — e.g., an existing open branch for that issue number (`git ls-remote --heads origin
   'feature/<n>-*' 'fix/<n>-*'`) or a recent (`< few hours`) commit/comment referencing it. If
   found, treat the ticket as claimed and skip to the next unblocked one, same as the `blocked`
   handling.
2. **Pull `origin/develop` at the start of every cycle, not just before pushing** — this session's
   divergence was only discovered at push time; discovering it at cycle-start would have let it
   rebase/skip the ticket instead of doing redundant work.
2b. **Consider a lightweight claim marker** — e.g., the PM comments `Claimed by <session-id> at
    <timestamp>` on an issue the moment it goes In Progress, and every session checks for a
    recent claim comment from a *different* session ID before starting. Cheap, human-readable,
    works across both local and cloud channels since both write through `gh`.
3. **This is exactly the kind of operating-model gap #234 (open playbook extraction) should
   document and design around** — multi-channel coordination is a generalizable lesson, not a
   Gentriduck-specific quirk, so it belongs in the playbook's "known failure modes" section.
4. No code/process change has been made yet as part of this lesson — this doc is the RCA; the
   concrete guard (item 1/2b above) is tracked as follow-up scope, not implemented inline here.
