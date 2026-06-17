# CLAUDE.md — Gentriduck working conventions

Reviving a 2018 Berlin gentrification thesis on a modern, **free, open, local-first** stack and
growing it into a public, **multi-city** statistics website. Plan: `docs/PROJECT_PLAN.md`.
Decisions: `docs/adr/`. Live backlog: the **Gentriduck** GitHub Project board.

**Resuming?** Start with the latest session handoff in `docs/handoff/` for current state + next step.

## Golden rules
1. **Free + open only.** No paid tools, no proprietary/internal data — ever. New tool/library/source
   needs an ADR and the maintainer's OK.
2. **Consult the architect first.** Before adopting anything new, read the relevant `docs/adr/` (or
   ask `system-architect`). No "first tool that works".
3. **Coder ↔ reviewer.** `data-engineer` implements; `data-engineer-reviewer` verifies in a fresh
   context and never edits. Loop until approved; methodology tasks also need `geo-data-scientist`
   sign-off. The PM merges. Cap the loop at ~3 iterations, then escalate to the maintainer.
4. **City-agnostic core** (ADR-0005): use `dim_city`/`dim_area`; never hard-code Berlin in shared models.
5. **Local-first** DuckDB; MotherDuck (free tier) only for hosting later — same dbt models.

## Commands (always via the isolated venv)
```bash
uv sync                 # install deps into .venv
uv run poe debug        # dbt debug
uv run poe build        # dbt build (+ models/tests)
uv run poe test         # dbt tests
uv run poe fmt          # ruff format + sqlfmt
uv run poe lint         # ruff check + sqlfluff lint
uv run poe docs         # dbt docs generate
```
Never use a global `dbt`/`python`. The repo-local dbt profile is `transform/profiles.yml`.

## Layout
`transform/` dbt · `ingestion/` Python · `web/` site (later) · `docs/` plan+ADRs ·
`reference/` original thesis (read-only) · `data/` gitignored artefacts · `.claude/` agents+skills.

## Quality gate (local, no cloud)
pre-commit: commit stage auto-formats (sqlfmt, ruff) + lints (sqlfluff, ruff); push stage runs
`dbt build`. Don't fight the formatter; keep diffs clean. Large/raw data is gitignored and rebuilt
from open sources — only small golden/reference files are committed.

## Agents (`.claude/agents/`)
`project-manager` (orchestrates, owns board + capacity) · `system-architect` (ADRs, tool gate) ·
`data-engineer` + `data-engineer-reviewer` (build + verify; skills `de-implement`/`de-review`) ·
`geo-data-scientist` (methodology authority) · `data-analyst` (analysis + site content).
`web-engineer` (+ reviewer) are added at Epic G.

## Overnight / autonomous local run
To hand off to the agents and walk away, open a persistent tmux session and invoke the PM:
```bash
tmux new -s gentriduck          # or: tmux attach -t gentriduck
# inside tmux — tell Claude: "start the project manager and work on next best tasks"
```
The PM reads `docs/handoff/`, drives the next board task through the coder↔reviewer loop,
creates a PR, and writes a new handoff. Permissions in `.claude/settings.local.json` are
pre-approved so no manual prompts are needed. Tomorrow: `tmux attach -t gentriduck` to review.

For a recurring nightly cron (fires at 00:00 Berlin time, logs to `~/.claude/gentriduck-overnight.log`):
```bash
(crontab -l 2>/dev/null; echo '0 22 * * * cd ~/git_private/gentriduck && claude --print "start the project manager and work on next best tasks" >> ~/.claude/gentriduck-overnight.log 2>&1') | crontab -
```
Remove with: `crontab -e`

## Epic B framing
B is a **directional revival** — does the 2018 paper's findings still hold? Exact number-for-number
reproduction is **not** required; document divergences and move on to the extension (Epic C).
