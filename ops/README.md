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
  waits for your reply whenever it hits a decision that's yours: a PR ready to merge
  (merges go through the GitHub UI), a methodology-gate escalation or `concerns`/pending
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
| `GENTRIDUCK_DEVMODE_STALL_SECS` | `900` | hang-watchdog idle threshold (restart if the session transcript is idle this long) |
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
in for real **decisions** (a PR ready to merge, an ADR / new tool-source, an ambiguous call) via
chat + push. The mode is **chosen by host** so you never have to remember a flag:

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
  `git reset --hard`, `sudo`). `deny` wins over `allow`, so these hold even under
  `--dangerously-skip-permissions`. (`rm`, `curl`/`wget` are deliberately **allowed** — the ingestion
  pipeline rebuilds gitignored data artefacts and fetches open-data sources; the protection is that
  the truly irreversible/remote-history actions above are blocked, not raw file/network ops.)
- **Merges remain yours.** `gh pr merge` is denied, so the PM opens PRs and **queues them for you to
  merge in the GitHub UI** — it can't push to `main` itself. Unsupervised means it keeps *building*;
  it does not mean it self-merges to `main`.

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

### Tuning

- Edit the `PROMPT` in the script to change what "next-best task" and the human-gate rules
  mean. Keep it aligned with the methodology gate and board discipline in
  [`../CLAUDE.md`](../CLAUDE.md).

> **Cost note:** continuous mode burns usage continuously and will hit session limits; the
> restart-on-reset loop handles that but it is not cheap. The light `sonnet`/`medium` defaults keep
> it affordable; for an even lower-burn cadence, run the script under a `cron`/`systemd timer` window
> instead of leaving it always-on.
