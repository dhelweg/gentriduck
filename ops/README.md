# `ops/` — running Gentriduck autonomously

Operational tooling for running the Gentriduck agent team unattended. The data/dbt
toolchain lives in [`transform/`](../transform/) and [`ingestion/`](../ingestion/); this
directory is only about **how the autonomous dev loop is driven**.

## Continuous dev mode (`gentriduck-devmode.sh`)

The project's default way to make progress between hands-on sessions. It runs **one
long-lived interactive `project-manager` session** with Claude Code's **Remote Control**
enabled, so you can supervise and unblock it from your phone.

It supersedes the older one-shot "overnight" runner (N headless `claude --print` runs,
then stop). Continuous mode instead:

- **never stops on its own** — it works the GitHub Project board task-by-task, restarting
  automatically when a usage limit resets;
- **re-plans every cycle** — it re-scans *all* open issues, re-prioritizes against
  `docs/PROJECT_PLAN.md` + dependencies, and files new tickets for genuinely discovered work
  (after a duplicate check) rather than grinding a frozen queue;
- **loops you in at human gates** — instead of guessing, it sends a push notification and
  waits for your reply whenever it hits a decision that's yours: the **weekly `develop → main` PR**
  (which you merge in the GitHub UI; ADR-0011), a methodology-gate escalation or `concerns`/pending
  verdict, an ADR / new-tool approval, or a genuinely ambiguous call;
- **never idles waiting on you** — a ticket blocked on your reply gets the **`blocked`** label
  and its card returns to **Todo** (freeing the single In Progress slot), and the PM advances
  the next unblocked ticket meanwhile. When you reply, it clears `blocked` and resumes.

> One devmode session is a single PM working **sequentially** — "meanwhile" means *the next
> unblocked ticket*, not parallel work. True concurrency would need multiple sessions/worktrees.

### The chat interface (two-way, from your phone)

The Remote Control session is a live chat in the Claude mobile app — both directions:

- **It reports to you** — a short status update (**≤ 3 bullets per ticket**) on every ticket
  **finished** (✅), **created** (🆕), or **newly blocked** (⛔). Blocked items also fire an OS
  **push** since they need a decision; finished/created land as chat messages (flip these to push
  too, or to a periodic digest, by editing the prompt / agent definition if you want the buzz).
- **You drive it** — at any time you can ask for a status snapshot ("status?", "where are we?") or
  **add scope** ("also add X", "we should Y"); the PM turns scope requests into properly-filed,
  prioritized tickets on the board and confirms. Maintainer messages are handled before the loop
  resumes. (See *Status reporting & maintainer chat* in
  [`../.claude/agents/project-manager.md`](../.claude/agents/project-manager.md).)

### Why interactive + Remote Control (not headless)

A headless `claude --print` run can't ask you anything mid-run — it just completes or
stops. An **interactive** session with `--remote-control` is mirrored to the Claude mobile
app, so the same session that's coding can pause, ask, and resume from your reply. That two-
way link is the whole point of "loop me in via phone". No third-party messenger (Telegram /
WhatsApp / Signal) or extra service is needed — it's a built-in Claude Code feature, which
keeps us inside the **free + open, no-new-tool** rule (no ADR required).

### Host

Runs on the **Linux automation host**, and also on **macOS** and **Windows (via WSL2)**. The
script must run as the **main session**, never a background subagent, so `git push` / `gh` work
(see the autonomous-run note in [`../CLAUDE.md`](../CLAUDE.md)). It keeps the host awake via
`systemd-inhibit` on Linux / `caffeinate` on macOS (a no-op on a headless server that never sleeps).

**Windows:** run under **WSL2** (e.g. Ubuntu) — it provides the `bash` + `tmux` the runner needs;
native PowerShell has no tmux for session persistence. Clone the repo and `uv sync` *inside* WSL,
then launch exactly as below. Caveat: `systemd-inhibit` inside WSL only inhibits the Linux layer,
so to stop a Windows laptop from sleeping, also keep it awake via Windows power settings (or run on
an always-on machine). Remote Control + the Claude mobile app work identically.

### Prerequisites

- Claude Code (`claude`) signed in, and the **Claude mobile app** signed into the same
  account (for Remote Control).
- `tmux` and `git` / `gh`, plus the repo cloned and `uv sync` run once (see the top-level
  [`README.md`](../README.md)).
- The pre-approved permissions + deny-list ship in the committed
  [`.claude/settings.json`](../.claude/settings.json) (no per-machine setup needed; machine-specific
  tweaks go in the gitignored `.claude/settings.local.json`).

#### First run on a new machine (one-time)

The unattended loop can't click through interactive prompts, so clear them **once** by hand first —
otherwise the spawned `claude` wedges on the onboarding wizard instead of starting the PM loop:

1. **Install `tmux`** (needs root, e.g. `sudo apt-get install -y tmux`) — the runner itself doesn't
   call tmux, but it's how the session survives a closed terminal and stays attachable.
2. **Complete `claude` onboarding interactively**: run `claude` once in the repo, pick a **theme**,
   and **accept the trust-folder dialog**, then `/exit`. This persists `theme`,
   `hasCompletedOnboarding`, and the per-project `hasTrustDialogAccepted` in `~/.claude.json`; without
   them the autonomous session stalls on the theme picker. (The trust dialog is a security gate —
   accept it yourself; don't script it.)
3. **Confirm you're signed in** (`oauthAccount` present) and the **mobile app** is on the same
   account, so Remote Control can pair once the loop is live.

### Run

```bash
# from anywhere — the script finds the repo root from its own location
tmux new-session -d -s devmode "$(git -C /path/to/gentriduck rev-parse --show-toplevel)/ops/gentriduck-devmode.sh"

# …or from inside the repo:
tmux new-session -d -s devmode "$(pwd)/ops/gentriduck-devmode.sh"
```

Then open the **Claude mobile app** → connect to the Remote Control session named
**`gentriduck-dev`**. You'll get a push when it needs you, and can reply from the phone.

| Action | Command |
|---|---|
| Watch live on the host | `tmux attach -t devmode` (detach: `Ctrl-b` then `d`) |
| Tail the log | `tail -f ~/.claude/gentriduck-devmode.log` |
| **Stop** | `tmux kill-session -t devmode` — do **not** `/exit` inside (the loop just restarts) |

### Verify on first launch

1. The session picked up the `/loop` standing instruction (attach and check). If the CLI
   didn't treat the initial prompt as a slash command, type `/loop <same instruction>` once
   in the session — or from your phone — and it sticks.
2. `gentriduck-dev` appears in the mobile app's Remote Control list.

### Model / effort (pinned, not inherited)

The runner **pins** the model and effort so the non-stop loop never silently tracks whatever your
interactive `~/.claude/settings.json` happens to be. The PM loop is mostly orchestration, so the
defaults are deliberately light — heavy reasoning is delegated to **Opus** subagents at the
methodology gate. Override per-launch via env:

| Env var | Default | Notes |
|---|---|---|
| `GENTRIDUCK_DEVMODE_MODEL` | `sonnet` | alias (`sonnet`/`opus`/`fable`) or a full model id |
| `GENTRIDUCK_DEVMODE_EFFORT` | `medium` | `low` · `medium` · `high` · `xhigh` · `max` |
| `GENTRIDUCK_DEVMODE_PERMISSION_MODE` | *host-aware* | macOS & Windows/WSL2 → `bypassPermissions`, native Linux → `dangerously-skip`; or `default` · `acceptEdits` · `dontAsk` · `auto` · `plan` |
| `GENTRIDUCK_DEVMODE_STALL_SECS` | `1800` | hang-watchdog idle threshold (restart if the session transcript is idle this long) |
| `GENTRIDUCK_DEVMODE_RC_NAME` | `gentriduck-dev` | Remote Control session name |
| `GENTRIDUCK_DEVMODE_LOG` | `~/.claude/gentriduck-devmode.log` | log path |

```bash
# e.g. crank the PM up for a hard planning night:
GENTRIDUCK_DEVMODE_MODEL=opus GENTRIDUCK_DEVMODE_EFFORT=high \
  tmux new-session -d -s devmode "$(pwd)/ops/gentriduck-devmode.sh"

# supervised instead: re-enable interactive permission prompts (they surface on your phone)
GENTRIDUCK_DEVMODE_PERMISSION_MODE=default \
  tmux new-session -d -s devmode "$(pwd)/ops/gentriduck-devmode.sh"
```

### Unsupervised by default (host-aware permission mode)

The runner **skips routine "may I run X?" prompts** so the PM just works the board and only loops you
in for real **decisions** (the weekly `develop → main` PR, an ADR / new tool-source, an ambiguous call)
via chat + push. The mode is **chosen by host** so you never have to remember a flag:

- **macOS** + **Windows/WSL2** (supervised personal machines) → `bypassPermissions` — one interactive
  "I accept" gate. WSL2 reports `uname` = `Linux` but is treated as a supervised laptop.
- **native Linux** (the unattended automation host) → `--dangerously-skip-permissions` — **no accept
  gate**, so the watchdog/loop restart hands-free. Refuses to run as **root**; use a normal user.
  (Running the unattended loop on a Windows/WSL2 *server*? Set `GENTRIDUCK_DEVMODE_PERMISSION_MODE=dangerously-skip`.)

Override either way with `GENTRIDUCK_DEVMODE_PERMISSION_MODE` (e.g. `=default` to prompt for
everything; `=bypassPermissions` to keep the gate on Linux too).

What still protects you:
- The **`deny` list** in the committed [`../.claude/settings.json`](../.claude/settings.json) still
  blocks the irreversible / privilege-escalating commands (`gh pr merge`, `git push --force`,
  `git reset --hard`, `sudo`, direct push to `main`). `deny` wins over `allow`, so these hold even under
  `--dangerously-skip-permissions`. (`rm`, `curl`/`wget` are deliberately **allowed** — the ingestion
  pipeline rebuilds gitignored data artefacts and fetches open-data sources; the protection is that
  the truly irreversible/remote-history actions above are blocked, not raw file/network ops.)
- **`main` stays yours; `develop` is autonomous** (ADR-0011). The PM self-integrates finished, reviewed
  work into the **`develop`** branch via plain git — that's its hands-off merge. It **cannot** reach
  `main`: `gh pr merge` is denied and so is a direct push to `main`. `main` changes only via a **weekly
  `develop → main` PR that you merge in the GitHub UI**. So unsupervised means it keeps *integrating to
  `develop`*; the published branch always passes through your click. (Note: with a single shared `gh`
  credential this separation is **behavioral** — deny-list + PM instruction — not server-enforced; see
  ADR-0011's risk section.)

### Self-healing (hang watchdog)

A non-stop loop that only restarts on process *exit* can't recover a session that **hangs but stays
alive** — e.g. after an `API Error: Connection closed mid-response`, the TUI wedges and produces
nothing (this stalled an overnight run for ~1h45m). So a background **watchdog** checks the session
transcript's mtime every 60s; if `claude` is alive but idle past `GENTRIDUCK_DEVMODE_STALL_SECS`
(default 900s), it kills the session so the loop restarts a fresh one. Restarts also use an
**escalating backoff** (60s → 5m → 15m on repeated quick exits), and the log records *why* each
restart happened (clean exit code vs watchdog kill). State lives in the board, not the session, so a
fresh restart just re-reconciles and resumes — losing a wedged session costs nothing.

> The watchdog assumes devmode is the **primary Claude session for this repo on the host** (true on a
> dedicated box). If you run another Claude session in the same repo on the same machine, its activity
> can mask a devmode hang.

The script also **preflights** (needs `claude`/`git`/`gh` + a real gentriduck checkout) and **refuses
to start a second instance** of the same Remote Control session, so two PMs can't race the board.

### Cross-channel claim check (`check-ticket-claim.sh`, #286)

The single-instance guard above only stops two **local** tmux loops on the same machine from
racing the board — it can't see a **cloud/remote** Claude Code session (claude.ai/code web/mobile)
working the same board concurrently. That gap caused a real incident (2026-07-18): a local devmode
session and a separate cloud session both independently implemented the same three tickets before
either pushed, requiring a manual merge and de-duplicated methodology sign-offs (see
[`../docs/lessons/concurrent-session-git-divergence.md`](../docs/lessons/concurrent-session-git-divergence.md)).

`ops/check-ticket-claim.sh <issue-number> [claim]` gives **any** session (local devmode, headless
overnight, or cloud/remote) a cheap `gh`-only pre-pickup check, run automatically as devmode step 4:

- checks for an existing `feature/<n>-*`/`fix/<n>-*` remote branch (someone's mid-implementation);
- checks for a recent (<6h, `CLAIM_STALE_HOURS`) `Claimed by <session> at <timestamp>` issue comment
  from a *different* `GENTRIDUCK_SESSION_ID`;
- exits `1` (treat like `blocked` — skip to the next unblocked ticket) if either hits, `0` if free;
- with the `claim` argument, posts its own claim comment once a session actually starts the ticket.

No new tool/service — it's `git ls-remote` + `gh issue comment`, so no ADR is needed.

### Tuning

- Edit the `PROMPT` in the script to change what "next-best task" and the human-gate rules
  mean. Keep it aligned with the methodology gate and board discipline in
  [`../CLAUDE.md`](../CLAUDE.md).

## Deploy — publishing the website (`deploy-gh-pages.sh`)

The public site is GitHub Pages serving the generated `gh-pages` branch (ADR-0012 Amendment A;
Cloudflare re-assessment tracked in #146). **Nothing deploys automatically** — no CI, and Pages
does not build from `main`.

**Standing policy (maintainer, 2026-07-07): the deploy is part of the weekly release routine.**
After each weekly `develop → main` merge, the PM session checks whether the release changed
`web/**` or a published mart (a model exported by `poe export-serving` / the map GeoJSON). If
yes, it closes out the release **right after it detects the merge** (devmode re-scan), without
waiting to be asked, on a machine with the ingested data. It runs one command from a checkout
of `main`:

```bash
git switch main && git pull --ff-only   # or stay on a develop tip whose tree equals origin/main
uv run poe release-deploy               # check → skip-or-rebuild → smoke check → deploy-gh-pages.sh
```

`poe release-deploy` (`ops/release_deploy.py`, #361) does four things:

1. **Checks** that it can fetch `origin/main`, that the local `HEAD` is `origin/main` or a commit
   with the **same tree** (a GitHub merge commit has a new SHA but the develop tip's tree), and
   that the working tree is clean (tracked edits anywhere, or untracked files under `web/`).
   Otherwise it stops with an error.
2. **Skips the rebuild only if the existing `web/build` provably matches `main` today.**
   `web/scripts/postbuild-build-source.mjs` writes `web/build/.build-source` at the end of every
   `npm run build`. It holds the tree, commit, UTC time, a dirty flag and dirty count, plus two
   records of things the tree hash can't see:
   - `inputs`: sha256 over `data/serving/*.parquet`, `web/static/geo/**` and the effective
     GoatCounter code (`GOATCOUNTER_CODE` if set, else `web/goatcounter-code.txt`);
   - `exports`: the export stamps of the bundled data (see *Export stamps* below), which
     record the warehouse the data was exported from;
   - `sources` and `sources_problem`: the record of the `npm run sources` run whose data the
     build bundled (see *Sources record* below). If that record can't vouch for the bundled
     data, `sources_problem` says why and `inputs` is `null`, which forces a rebuild.

   The rebuild is skipped when all of these hold:
   - the build ran on a clean tree equal to `origin/main^{tree}`;
   - it embeds a complete sources record and no `sources_problem` (a build made before #369
     has neither, so it rebuilds);
   - the recomputed inputs fingerprint is unchanged, so a new data vintage always rebuilds;
   - both embedded export stamps show the data was exported from a warehouse with a complete,
     clean `poe build` of `origin/main`'s tree.

   The *current* warehouse record isn't part of the skip decision. An unrelated later
   `poe build` (e.g. the pre-push hook) doesn't change what `web/build` contains.

   This is the common case after a release with no new data: the PM already built and checked
   the site from `develop`, and the release merge didn't change the tree. Otherwise it
   **rebuilds**: `poe export-serving` → `poe export-area-geojson` → `npm ci` (only if
   `web/node_modules` is missing) → `npm run sources:strict` (fails if any query fails) →
   `npm run build`. Before rebuilding it
   **refuses** unless `data/.warehouse-source` shows a complete, clean `poe build` from
   `origin/main`'s tree. The message is "run `uv run poe build` on main first", because the
   exports would otherwise publish marts built from different model code.
3. **Smoke-checks** `web/build`. It must be non-empty, have at least 500 HTML pages
   (`--min-pages`), and contain no `cartocdn` string (#351 removed the CARTO basemap). Its
   `.build-source` must match `origin/main`'s tree and the current inputs fingerprint, carry a
   complete sources record, and its export stamps must be valid for `origin/main`.
4. **Deploys** via `ops/deploy-gh-pages.sh`. The script is unchanged, so its SEC-2 (#191)
   hard-asserted gh-pages-only force-push is still the only push.

**Warehouse provenance (`data/.warehouse-source`).** `poe build` and `poe build-full-refresh`,
and so `poe refresh`/`resync` and the pre-push hook, now run `dbt build` through
`ops/dbt_build.py`. Extra args still pass through (`poe build --select x+`), and dbt's exit code
is unchanged. The wrapper records the git tree the warehouse was built from, plus a `clean`
flag (no uncommitted changes under `transform/`) and a `complete` flag:
- **Before dbt starts**, it sets `complete: false, reason: "dbt build in progress"`. A killed
  or interrupted build (Ctrl-C, `taskkill`, crash) therefore never leaves a valid certificate.
- **After dbt exits**:
  - a successful full build (no extra args, or only `--full-refresh`, `--fail-fast`,
    `--threads`) sets `complete: true`;
  - a successful partial build (`--select`/`-s`/`-m`/`--models`/`--exclude`) of the same clean
    tree restores the existing certificate;
  - anything else voids it (`complete: false`): a failed build, a partial build of another
    tree, or any other arg such as `--vars`, `--target`, `--defer` or `--state`.

The provenance covers only `poe build` and `poe build-full-refresh` (and so `refresh`/`resync`).
**`poe materialize-oa-getis-ord`, `poe oa-bandwidth-sweep` and any direct `dbt` call bypass the
wrapper** and don't touch the record. Inside `refresh`/`resync`, `materialize-oa-getis-ord`
re-materializes two models from the same tree right after the certified build. If you run dbt
directly against the warehouse, run `uv run poe build` afterwards before a release.

**Export stamps.** `poe export-serving` copies the warehouse record into
`data/serving/.export-source`. `poe export-area-geojson` copies the serving stamp's warehouse
into `data/.geo-export-source`; it lives in `data/` rather than `web/static/geo/`, so it isn't
published with the site. Each export deletes its stamp before it starts, so an interrupted
export leaves none, which forces a rebuild. `npm run build` embeds both stamps in
`.build-source`. The serving stamp comes from the sources record (below), because the bundled
mart data is what `npm run sources` extracted, not what is in `data/serving` at build time.

**Sources record (`web/.sources-source`, #369).** `npm run build` (`evidence build`) doesn't run
sources: it bundles whatever the last `npm run sources` extracted into
`web/.evidence/template/static/data`. So `web/scripts/sources-stamp.mjs` runs as the
`presources`/`postsources` npm hooks (also for `sources:strict`):
- **Before** sources, it writes `complete: false, reason: "npm run sources in progress"`. A
  failed or killed run leaves no usable record.
- **After** sources, it records the tree, commit and dirty flag, a fingerprint of
  `data/serving/*.parquet`, the serving export stamp, and a fingerprint of the extracted data.
  It marks the run unusable unless this run extracted every query. npm doesn't pass
  `npm run sources -- --changed` (or `--queries`, `--sources`) to the hooks, so the check
  looks at the result:
  - every file in Evidence's `manifest.json` must have been written by this run. Evidence
    keeps the previous run's file for every query a partial run skips, and for a query that
    returned no rows;
  - every query in `web/sources/` (each `*.sql` except `initialize.sql`, named as Evidence
    names it) must be in `manifest.json`. In a non-strict run, a query that fails is dropped
    from the manifest instead, so no stale file is left to catch.

  Release rebuilds run `npm run sources:strict`, which stops on a failed query. A query that
  legitimately returns no rows also counts as missing, so it forces a rebuild every time.
  If `EVIDENCE_DATA_DIR` is set in the environment or in `web/.env`, `web/.env.local` (the
  files Evidence reads), the record is unusable: it only covers the default data directory.

`postbuild-build-source.mjs` accepts the record only if it is complete, ran on a clean tree
equal to the build's tree, and its serving and extracted-data fingerprints equal the ones at
build time. Otherwise the build gets `inputs: null` and `release-deploy` rebuilds. A direct
`npx evidence sources` skips the hooks, but if it changes the extracted data, the
extracted-data check catches it. Evidence's parquet output isn't guaranteed to be
byte-identical across runs, so an extra direct run after the recorded one can force a rebuild
even with the same data. That errs on the safe side.

**First release after #361:** no machine has the warehouse record or export stamps yet, and
older builds lack the fingerprint. So the first `release-deploy` will rebuild, and it refuses
until you run `uv run poe build` once on a clean checkout of `main`. Likewise, builds made
before #369 have no sources record, so the first release after #369 rebuilds too.

Flags go straight after the task name, e.g. `uv run poe release-deploy --dry-run`. A single
leading `--` (`uv run poe release-deploy -- --dry-run`) is also accepted.

- `--dry-run` runs the checks and the skip/rebuild decision, then prints the steps without
  running them. It still fetches `origin/main`, and runs the read-only smoke check on the skip path.
- `--force-rebuild` rebuilds even when everything matches.
- `--no-fetch` uses the local `origin/main` ref as it is.
- `--min-pages N` overrides the smoke-check page floor.

The task never runs `poe refresh`/`poe build` itself. For a new data vintage, run
`uv run poe refresh` on `main` first. The new parquet changes the inputs fingerprint, so
`release-deploy` rebuilds on its own.

**Permission and ADR (pending maintainer approval):** `ops/deploy-gh-pages.sh` is a production
publish, so auto mode blocks it unless the maintainer asks for it. #361 proposes adding exactly
this rule to the `permissions.allow` list in the committed `.claude/settings.json`:

```json
"Bash(uv run poe release-deploy)"
```

The rule is an exact match, so it covers only the bare task: no `--force-rebuild`, no
`--dry-run`, no other arguments. Those still prompt. The force-push target stays hard-asserted
inside `deploy-gh-pages.sh`.

Before adding the rule, the maintainer also has to decide on an **ADR-0012 amendment**. It would
cover two changes to the documented "rebuild from `main`" routine:
- reusing a build whose tree, inputs and warehouse provenance match `main`;
- the PM running the production deploy without being asked.

The #361 review raised this. Until the maintainer approves both and adds the rule, the PM asks
once per release.

If the release touched neither `web/**` nor a published mart, skip the deploy and say so in the
handoff. Deploy only builds of `main`'s tree, never a `develop` tree that differs from it;
`release-deploy` enforces this. The `gh-pages` branch is a generated artefact, so never merge it
back. See the script header for details (`.nojekyll`, author identity, empty-build guard).

The manual step-by-step sequence still works (e.g. to rerun a single step):

```bash
uv run poe refresh      # data → data/serving/*.parquet + web/static/geo/
uv run poe web-build    # cd web && npm ci && npm run sources && npm run build → web/build/ (incl. noindex meta)
ops/deploy-gh-pages.sh  # force-replace gh-pages with the fresh build
```

**Web-build smoke check (QA-9, #184):** `uv run poe web-build` (added 2026-07-09) wraps the
same three Node steps as a reusable poe task, so a mart/schema change that silently breaks the
Evidence build gets a cheap local signal before it reaches the release routine above — run it
after `poe refresh` any time a model or schema touching a published mart changes, not just at
weekly release time.

**Resync a second/stale machine (#292):** `data/` is gitignored, so nothing about the ingested
warehouse syncs via `git` — a second machine (or a first machine whose `data/gentriduck.duckdb`
predates a seed schema change, e.g. #240's `oa_leaf_area_level` column) needs its own full
pipeline run. Use `resync` instead of `refresh` there:

```bash
uv run poe resync       # same pipeline as `refresh`, but --full-refresh + the OA two-pass
```

`resync` differs from `refresh` in two ways: (1) its first `dbt build` passes `--full-refresh`,
which recreates relations instead of patching them — plain `build`'s seed truncate+copy can't
absorb a new seed column under duckdb ≥1.5 ("CSV sniffing" error) on a stale warehouse, and per
#248 `dbt build` isn't the release-time bottleneck (~5 min vs. ingest's much longer run) so the
extra cost is cheap; and (2) both tasks now correctly run the `oa-getis-ord` (#280, ADR-0025)
analysis→mart two-pass — `poe build` alone previously left `mart_poi_oa_hotspots` empty. Use
plain `refresh` on the primary, regularly-refreshed machine; reach for `resync` only when
bringing a second machine current or recovering from a schema-drift build failure.

**Build-time trend (#248 item 3):** `poe web-build`'s final step now runs through
`ops/time_web_build.py` instead of a bare `npm run build` — a stdlib-only timer that appends one
line (timestamp, elapsed seconds, status) to the committed `ops/web-build-timings.log` per run, so
the Evidence prerender time (currently ~15 min for 559 pages) has a visible trend as page count
grows (#247, future city expansion) before it becomes a release-time problem worth its own ADR.

> **Cost note:** continuous mode burns usage continuously and will hit session limits; the
> restart-on-reset loop handles that but it is not cheap. The light `sonnet`/`medium` defaults keep
> it affordable; for an even lower-burn cadence, run the script under a `cron`/`systemd timer` window
> instead of leaving it always-on.
