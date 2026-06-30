# AI-assisted data-engineering operating model

This document describes how Gentriduck organises AI agent work on a data project. It is written
as a standalone reference that someone outside this project could follow to replicate the model on
their own work.

## Context

Gentriduck is a local-first, open-source data pipeline (dbt + DuckDB) that revives a 2018
Berlin gentrification thesis and grows it into a public multi-city statistics site. The work
is executed by a team of specialised Claude Code agents working the GitHub Project board across
many sessions, supervised by a single human maintainer who interacts primarily via a mobile app.

All tools are free and open. No cloud CI, no paid data, no proprietary dependencies. The same
commands run identically on macOS, Windows (WSL2), and Linux.

## Guiding principles

These constraints drive every structural choice:

1. **Free + open only.** No paid tools, no proprietary or internal data. Any new tool or data
   source requires an Architecture Decision Record (ADR) and maintainer approval before use.
2. **Consult the architect first.** Before adopting anything new, the relevant ADR is read (or
   a new one is written). There is no "first tool that works" shortcut.
3. **Independent review, not self-approval.** The agent that implements work never merges its own
   output. A separate reviewer agent verifies in a fresh context. For methodology-bearing work,
   two domain-expert agents additionally sign off.
4. **City-agnostic core.** Data models use `dim_city`/`dim_area`; Berlin specifics are isolated
   in source adapters. New cities are onboarded by configuration, not code changes.
5. **Local-first.** The warehouse is DuckDB on the local machine. MotherDuck (free tier) is
   the planned hosting backend later, using the same dbt models unchanged.

## Agent roster

Each agent has a single clear responsibility and least-privilege tool access. Agents are defined
as Claude Code subagents in `.claude/agents/*.md`.

| Agent | Responsibility | Model | Key constraint |
|---|---|---|---|
| **project-manager** | Steers the process. Owns the GitHub Project board, picks the next-best unblocked task, runs the coder ↔ reviewer ↔ scientist loop, tracks capacity (disk + usage), self-integrates finished work into `develop`. | sonnet | No code edits. Never pushes to `main`. Cannot `gh pr merge`. |
| **system-architect** | Owns architecture and tool selection. Writes ADRs. All other agents must consult the relevant ADR before adopting anything new. | opus | No code edits. ADRs only. |
| **data-engineer** | Implements ingestion, dbt models, DuckDB/spatial queries, and tests. Works on a feature branch. | sonnet | Never merges own work. Consults architect / ADR before any new dependency. |
| **data-engineer-reviewer** | Independently reviews the coder's diff in a fresh context. Runs the build and tests. Emits a structured verdict. Does not edit. | opus | No Edit/Write tools. Read and Bash only. |
| **geo-data-scientist** | Spatial and statistical methodology authority. Validates the gentrification index, spatial methods, OSM temporal pitfalls. Co-gates methodology-bearing work. | opus | No production-code edits. Sign-off notes only. |
| **gentrification-domain-expert** | Urban-sociology and housing-policy authority. Validates theory fidelity (invasion-succession, rent-gap, displacement), indicator meaning, and ethics framing. Co-gates methodology-bearing work with the geo-DS. | opus | No production-code edits. Sign-off notes only. |
| **data-analyst** | Consumes marts to produce analyses, maps, and narratives. Owns website content and UX decisions. | sonnet | Reads from the warehouse only; never redefines the index. |
| **web-engineer** (+ reviewer) | Builds the frontend site. Activates at Epic G. | sonnet / opus | Mirrors the DE pair pattern. |

**Model tier matching:** orchestration and implementation agents use sonnet (cost-efficient for
volume). Domain-authority and review agents use opus (higher reasoning quality for the verification
and methodology work that cannot afford misses). Effort is set per agent in the agent definition
file.

## The coder ↔ reviewer ↔ gate loop

Every task follows this state machine: `SPEC → IMPLEMENT → VERIFY → REVIEW → (GATE) → INTEGRATE`

### Step 0: PM selects work

The project-manager re-scans all open issues every cycle, re-prioritizes against
`docs/PROJECT_PLAN.md` and dependency constraints, checks disk headroom (`shutil.disk_usage`)
and usage capacity, and moves exactly one issue to *In Progress*. The board's definition of done
is the issue closed and its card in the Done column — both must happen in the same step.

### Step 1: Architect consult

If the task introduces any new tool, library, or data source, the relevant ADR is read first
(or a new ADR is drafted). Work does not begin until this is clear. This is the "no first tool
that works" rule in practice.

### Step 2: Implement

The data-engineer creates a feature branch off `develop`, follows the `de-implement` skill
(plan from the issue SPEC → write models/tests → self-check: `uv run poe build`, `uv run poe
lint`), then hands off with a clear summary.

**Grounding rule (R-C2):** every methodology choice in a dbt model or analysis script must cite
the thesis section, EWR codebook page, or peer-reviewed source it operationalises. The citation
goes in the SQL comment (e.g. `-- Thesis §3.2: dynamism_index = ...`). An uncited methodology
change is a `high`-severity finding in review.

### Step 3: Review

The data-engineer-reviewer works from a fresh context (no shared state with the coder) and
follows the `de-review` skill:

1. Read the diff (`git diff main...HEAD`) and the issue SPEC / acceptance criteria.
2. Run the gate: `uv run poe build`, `uv run poe test`, `uv run poe lint`.
3. Check: correctness vs SPEC, dbt tests present and meaningful, mart contracts respected
   (`dim_city`/`dim_area` used, no Berlin hard-coding), no large or secret files added,
   reconciliation checks where required, methodology citations present.
4. Emit a **structured JSON verdict**: `{ "verdict": "approve" | "changes", "findings": [...] }`.

The reviewer never edits. Precise, actionable findings go back to the coder to fix.

**Iteration cap:** the coder ↔ reviewer loop is capped at approximately three iterations. On
exhaustion the PM escalates to the maintainer or the relevant scientist rather than continuing
to loop. This prevents runaway sessions.

### Step 4: Methodology gate (R-C1) — binding, not advisory

For **methodology-bearing** work (any change touching the gentrification index models, indicator
seeds, analysis scripts, methodology docs, or ADRs), two additional sign-offs are required before
integration:

- The **geo-data-scientist** signs off on statistical and spatial soundness.
- The **gentrification-domain-expert** signs off on theory fidelity and domain validity.

Each emits a sign-off document in `docs/epic-*/` or `docs/methodology/`:
`{ "verdict": "pass" | "concerns", "rationale": "...", "risks": [...] }`.

The PM checks for both `Verdict: PASS` before merging into `develop`. If either is missing, or
records `Verdict: FAIL` / `concerns`, integration is blocked, the card returns to Todo with the
`blocked` label, and the maintainer is notified. This gate is mechanical: the PM does not use
judgment to bypass it.

Methodology-bearing paths (R-C1 definition):
- `docs/methodology/**`, `docs/adr/**`
- `transform/models/intermediate/int_gentrification_ts.sql`
- `transform/models/intermediate/int_poi_status_dynamism.sql`
- `transform/models/intermediate/int_ewr_socioeco.sql`
- `transform/models/intermediate/int_berlin_ewr_plr2021.sql`
- `transform/models/marts/gentrification_index.sql`
- `transform/seeds/seed_ewr_indicator_meta.csv`
- `analysis/*.py`
- Any model changing indicator weights, normalization, or spatial method

### Step 5: Integrate

Once approved (and, if applicable, gated), the PM merges the feature branch into `develop` using
plain git (`git merge --no-ff`, then `git push origin develop`). There is no GitHub PR for
feature → develop. The PM cannot use `gh pr merge` (it is on the deny list).

On a weekly cadence the PM opens or refreshes a single `develop → main` pull request and sends
the maintainer a push notification. The maintainer merges this in the GitHub UI. This is the only
human gate on `main`.

## Branch model (ADR-0011)

```
feature/<n>-title  →  develop  →  (weekly PR)  →  main
      [PM merges]              [maintainer merges via GitHub UI]
```

- **Feature branches** are cut from `develop`.
- **`develop`** is the autonomous integration branch. The PM self-integrates finished, reviewed
  work here with plain git. It is always ahead of `main` by up to a week.
- **`main`** is the human-gated, published branch. It changes only via the weekly
  `develop → main` PR. The PM is instructed to never push to `main`; `gh pr merge` is
  deny-listed in `.claude/settings.json`.

Note: with a single shared GitHub credential, the `main` protection is behavioral (deny list +
PM instruction), not server-enforced. ADR-0011 records this limitation and the path to a proper
fix (a dedicated PM identity with branch protection).

## Quality gate (local, no cloud CI)

The pre-commit framework provides two hook stages:

**Commit stage (auto-format + lint):**
- `sqlfmt` auto-formats dbt SQL (Jinja-aware, opinionated)
- `sqlfluff lint` enforces SQL lint rules (layout rules off to avoid conflicts with sqlfmt)
- `ruff format` + `ruff check` for Python

**Push stage (correctness):**
- `uv run dbt build` + all dbt tests

Auto-format means the coder agent never debates style with the reviewer. The push-stage gate runs
independently of the agent's own reasoning — it is a verification layer the agent cannot talk its
way past.

Trade-off accepted: there is no cloud CI (cost + ADR-0001's "local only" constraint). The
push-stage gate plus `uv.lock` pinning mitigates "works on my machine" drift. `assert_not_empty`
dbt tests on critical models catch hollow builds (see `docs/lessons/local-first-data-presence.md`).

## Structured handoffs

Agents exchange structured outputs, not prose:

- **Reviewer verdict:** `{ "verdict": "approve" | "changes", "findings": [{"severity","where","issue","fix"}], "ran": [...] }`
- **Scientist sign-off:** `{ "verdict": "pass" | "concerns", "rationale": "...", "risks": [...], "recommendations": [...] }`
- **Session state:** `docs/handoff/state.json` — build status, open PRs, completed work, blocked items. The PM reads this at the start of each session.

## Capacity and human-in-the-loop policy

The PM cannot read Claude subscription limits directly. It tracks a maintainer-set budget and a
proxy: number of coder ↔ reviewer loops and elapsed turns. Before and after each task it checks
disk headroom (`shutil.disk_usage`). When capacity is tight it defers or splits work and reports
status rather than running a limit.

Human approval is required for:
- Adding any new data source or tool (plus an ADR)
- Anything published or external
- Unusually cost/disk-heavy runs flagged by the PM
- The weekly `develop → main` PR

## Continuous dev mode

The default operating mode is `ops/gentriduck-devmode.sh`: a long-lived interactive PM session
with Claude Code Remote Control enabled. The maintainer supervises from the Claude mobile app.

The loop:
1. Reconciliation pass (fix any board drift: closed issues in wrong column, missing cards).
2. Re-scan all open issues and re-prioritize.
3. Triage blocked vs. unblocked.
4. Advance the top unblocked ticket through implement → review → (gate) → integrate.
5. Refresh the weekly `develop → main` PR when due.

**Self-healing:** a watchdog monitors the session transcript mtime every 60 seconds. If the
session is alive but idle past the threshold (default 900 s), the watchdog kills and restarts it.
Restarts use escalating backoff. State lives in the board and `docs/handoff/state.json`, not in
the session, so a restart costs nothing except the in-flight response.

**Permission model:** on a supervised personal machine (macOS, Windows/WSL2), `bypassPermissions`
is used with one interactive accept gate. On an unattended Linux host,
`--dangerously-skip-permissions` is used. In both cases the deny list in `.claude/settings.json`
blocks the irreversible commands: `gh pr merge`, `git push --force`, `git reset --hard`, `sudo`,
direct push to `main`. `deny` wins over `allow` regardless of permission mode.

## Skill layer (ADR-0009)

A small set of Superpowers skills (MIT; v7) augment the bespoke domain core at the harness level:

| Skill | Purpose |
|---|---|
| `brainstorming` | Open-ended exploration of methodology or implementation options |
| `systematic-debugging` | Root-cause-first diagnosis of pipeline failures |
| `verification-before-completion` | Check actual behaviour before marking a task done |
| `writing-skills` | Methodology docs and whitepaper quality |

Superpowers' TDD / red-green-refactor is not adopted — the analytics-engineering equivalent is
dbt schema/data tests plus the leakage guard (R-C3). The bespoke domain core (de-implement /
de-review, methodology gate, domain agents, ADR tool-gate) remains authoritative. Superpowers
has no domain capability in gentrification methodology or spatial statistics.

Pin the version in use in CLAUDE.md. Bump only deliberately, behind an ADR-0009 amendment.

## Setup for a new project

To replicate this model on a different project:

1. **Define the agent roster.** One agent per distinct responsibility. Assign least-privilege tools
   (reviewers get no Edit/Write; domain authorities get no production-code access). Match model tier
   to task volume and reasoning demand.
2. **Write the ADR gate.** Every new tool/library/source goes through the architect and an ADR
   before any implementation. One file per decision, append-only.
3. **Separate the coder and reviewer contexts.** The reviewer must not share the coder's session
   context. This is the difference between independent review and rubber-stamping.
4. **Define your methodology gate** and the paths it covers. Make it mechanical: sign-offs are
   files with a `Verdict:` field the PM checks, not a judgment call.
5. **Cap the iteration loop.** Without a max-iteration cap the PM can run forever. Pick a number
   (3 is reasonable) and escalate rather than loop.
6. **Use structured handoffs.** JSON verdicts and sign-offs are parseable and auditable. Prose
   is not.
7. **Add a session-state file** (`state.json` or equivalent). The agent cannot remember across
   sessions; the board + state file are the shared memory.
8. **Make the quality gate independent of the agent.** Pre-commit hooks, `dbt build`, and
   `assert_not_empty` tests run without the agent's cooperation. The agent cannot reason its way
   past them.
9. **Document the human gates explicitly.** Write down exactly which decisions require a human:
   new tools, published output, and (in this case) the weekly `develop → main` PR. Everything
   else the agent handles autonomously.
10. **Protect the published branch behaviourally.** Deny-list `gh pr merge` and force-push.
    Note the single-credential limitation honestly; plan a real identity boundary if it matters.
