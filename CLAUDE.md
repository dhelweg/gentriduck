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
3. **Coder ↔ reviewer + dual methodology gate.** `data-engineer` implements; `data-engineer-reviewer`
   verifies. For **methodology-bearing** work (see §Methodology gate below), `geo-data-scientist` AND
   `gentrification-domain-expert` must each record a `pass` before the PM merges. The gate is
   **enforced, not advisory** — work may not merge with a verdict pending or `concerns`. Cap the
   coder↔reviewer loop at ~3 iterations, then escalate to the maintainer.
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
uv run poe analysis     # run analysis/*.py scripts (deterministic; requires ingested data)
```
Never use a global `dbt`/`python`. The repo-local dbt profile is `transform/profiles.yml`.

## Superpowers skills (harness layer, ADR-0009)

ADR-0009 selectively adopts [Superpowers](https://github.com/obra/Superpowers) (MIT) as a
**complementary harness-level skill layer**. The bespoke domain core (de-implement/de-review,
domain agents, methodology gate) remains authoritative. Adopted skills:

| Skill | Purpose |
|---|---|
| `brainstorming` | Open-ended exploration of methodology / implementation options |
| `systematic-debugging` | Root-cause-first diagnosis of pipeline failures |
| `verification-before-completion` | Check actual behaviour before marking a task done |
| `writing-skills` | Methodology docs and whitepaper quality |

**Install (per developer, one-time):** Install Superpowers via the Claude Code plugin marketplace.
Pin the version in use here: **v7** (confirmed 2026-06-19). Bump only via an ADR-0009 amendment.
Superpowers' TDD / red-green-refactor is **not adopted** — use `dbt schema/data tests` + the
leakage guard (R-C3) as the analytics-engineering equivalent.
See `docs/adr/0009-agent-skill-tooling-superpowers.md` for the full decision record.

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
`geo-data-scientist` (spatial/statistical methodology gate) ·
`gentrification-domain-expert` (urban-sociology/housing-policy theory gate, pairs with geo-DS) ·
`data-analyst` (analysis + site content).
`web-engineer` (+ reviewer) are added at Epic G.

## Methodology gate (R-C1)

**Methodology-bearing** work is any PR that touches:
- `docs/methodology/**` or `docs/adr/**`
- `transform/models/intermediate/int_gentrification_ts.sql`
- `transform/models/intermediate/int_poi_status_dynamism.sql`
- `transform/models/intermediate/int_ewr_socioeco.sql`
- `transform/models/intermediate/int_berlin_ewr_plr2021.sql`
- `transform/models/marts/gentrification_index.sql`
- `transform/seeds/seed_ewr_indicator_meta.csv`
- `analysis/*.py`
- Any model that changes indicator weights, normalization, or spatial method

**PM pre-merge check (enforced):** Before merging any methodology-bearing PR, verify that:
1. A `*-geo-signoff.md` file in `docs/epic-*/` or `docs/methodology/` contains `Verdict: PASS`.
2. A `*-domain-signoff.md` (or equivalent) contains `Verdict: PASS` once `gentrification-domain-expert` is active.
If either sign-off is missing or has `Verdict: FAIL` / `concerns`, **block the merge** and escalate.

**Grounding rule (R-C2):** Every methodology choice in a dbt model or analysis script must cite
the thesis section, EWR codebook page, or peer-reviewed source it operationalizes. This citation
belongs in the SQL comment of the relevant model (e.g., `-- Thesis §3.2: dynamism_index = ...`).
The reviewer checks this; an uncited methodology change is a `high`-severity finding.

## Overnight / autonomous local run
Claude **must run as the main session** (not a background subagent) so that git push and gh
commands work. All required permissions are pre-approved in `.claude/settings.local.json`.

**Start now and detach (one command):**
```bash
tmux new-session -d -s overnight "~/.claude/gentriduck-overnight.sh"
```
The script (`~/.claude/gentriduck-overnight.sh`) runs up to 3 `claude --print` sessions
sequentially. If a run hits the Claude session limit it parses the reset time from the
output, sleeps until then (+10 min buffer), and retries automatically.

Check progress tomorrow:
```bash
tmux attach -t overnight                       # live session (if still running)
tail ~/.claude/gentriduck-overnight.log        # if session already ended
```

**Recurring nightly cron (00:00 Berlin = 22:00 UTC):**
```bash
(crontab -l 2>/dev/null; echo '0 22 * * * ~/.claude/gentriduck-overnight.sh') | crontab -
```
Remove with: `crontab -e`

> **Why not ask Claude to "run the PM" in an open session?** That spawns the PM as a subagent,
> which runs in a restricted sandbox and cannot push to GitHub. Use `claude --print` above.

## Epic B framing
B is a **directional revival** — does the 2018 paper's findings still hold? Exact number-for-number
reproduction is **not** required; document divergences and move on to the extension (Epic C).
