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
`reference/` original thesis (read-only) · `data/` gitignored artefacts · `.claude/` agents+skills ·
`ops/` autonomous-run scripts.

## Quality gate (local, no cloud)
pre-commit: commit stage auto-formats (sqlfmt, ruff) + lints (sqlfluff, ruff); push stage runs
`dbt build`. Don't fight the formatter; keep diffs clean. Large/raw data is gitignored and rebuilt
from open sources — only small golden/reference files are committed.

## Branch model (ADR-0011)
`develop` is the **integration branch** — the devmode PM branches features off it and self-integrates
finished, reviewed work into it via plain git (its autonomous merge). `main` is the **published,
human-gated** branch: it changes only via a **weekly `develop → main` PR the maintainer merges in the
GitHub UI**. The PM never uses `gh pr merge` and never pushes to `main` (both blocked in
`.claude/settings.json`). The methodology gate (R-C1) binds at the `develop`-integration point.

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

**PM pre-integration check (enforced):** "Integrate" = merge a feature branch into `develop`
(ADR-0011). Before integrating any methodology-bearing work into `develop`, verify that:
1. A `*-geo-signoff.md` file in `docs/epic-*/` or `docs/methodology/` contains `Verdict: PASS`.
2. A `*-domain-signoff.md` (or equivalent) contains `Verdict: PASS` once `gentrification-domain-expert` is active.
If either sign-off is missing or has `Verdict: FAIL` / `concerns`, **do not integrate into `develop`** —
block, label `blocked`, and escalate. The weekly maintainer-merged `develop → main` PR is an added
**backstop** (the maintainer may re-verify the same sign-offs); it does **not** replace this
pre-integration check — methodology-bearing work must be gated *before* it reaches `develop`.

**Grounding rule (R-C2):** Every methodology choice in a dbt model or analysis script must cite
the thesis section, EWR codebook page, or peer-reviewed source it operationalizes. This citation
belongs in the SQL comment of the relevant model (e.g., `-- Thesis §3.2: dynamism_index = ...`).
The reviewer checks this; an uncited methodology change is a `high`-severity finding.

## Autonomous local run
Claude **must run as the main session** (not a background subagent) so that `git push` and `gh`
work. The pre-approved permissions + deny-list ship in the committed `.claude/settings.json`
(machine-specific tweaks go in the gitignored `.claude/settings.local.json`). On a fresh machine,
do the one-time `tmux` install + interactive `claude` onboarding (theme + trust dialog) first — see
*First run on a new machine* in [`ops/README.md`](ops/README.md). These run on the **Linux automation
host** (the runner also works on macOS, and on Windows via WSL2).

### Continuous dev mode (default) — `ops/gentriduck-devmode.sh`
One long-lived **interactive** PM session with Claude Code **Remote Control** enabled, so you
supervise and unblock it from your **phone** (Claude mobile app). It works the board task-by-task and
**self-integrates finished, reviewed work into `develop`** (ADR-0011), pinging you only at real human
gates — the **weekly `develop → main` PR** (which you merge in the GitHub UI), a methodology-gate
escalation/`concerns`, an ADR or new-tool approval, or a genuinely ambiguous call. **Self-healing:**
the loop restarts `claude` on exit *and* a watchdog restarts it on a hang (idle transcript), so a
mid-response API error can't silently wedge it. Runs **unsupervised** with a **host-aware** permission
mode — Mac & Windows/WSL2 use gated `bypassPermissions`, the native Linux host uses hands-free
`dangerously-skip` — but the committed `settings.json` **deny-list still blocks** the irreversible
commands (`gh pr merge`, force-push, `git reset --hard`, `sudo`, direct push to `main`), so `main`
stays human-gated. Full guide: [`ops/README.md`](ops/README.md).
```bash
tmux new-session -d -s devmode "$(pwd)/ops/gentriduck-devmode.sh"   # run from the repo root
# then connect to the "gentriduck-dev" session in the Claude mobile app
tmux attach -t devmode            # watch live (detach: Ctrl-b then d)
tmux kill-session -t devmode      # stop — do NOT /exit (the loop just restarts)
```

### Headless overnight runner (fallback) — `~/.claude/gentriduck-overnight.sh`
The older one-shot mode: up to 3 `claude --print` runs then stop, parsing the session-limit reset
time and retrying. No phone loop-in (headless can't ask mid-run). Use for a bounded, fire-and-forget
batch rather than always-on.
```bash
tmux new-session -d -s overnight "~/.claude/gentriduck-overnight.sh"
tail ~/.claude/gentriduck-overnight.log
# recurring nightly (00:00 Berlin = 22:00 UTC):
(crontab -l 2>/dev/null; echo '0 22 * * * ~/.claude/gentriduck-overnight.sh') | crontab -
```

> **Why main session, not a subagent?** A PM spawned as a subagent runs in a restricted sandbox
> and cannot push to GitHub. Both runners launch Claude as the main session.

## Epic B framing
B is a **directional revival** — does the 2018 paper's findings still hold? Exact number-for-number
reproduction is **not** required; document divergences and move on to the extension (Epic C).
