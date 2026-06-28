#!/usr/bin/env bash
# Gentriduck — continuous autonomous dev mode with Remote Control (phone loop-in).
#
# Supersedes the one-shot overnight runner: instead of N headless runs then stop,
# this launches ONE long-lived *interactive* project-manager session with Claude
# Code's Remote Control enabled, and keeps it alive. You drive it from the Claude
# mobile app: it pushes a notification when it needs a human decision, and you
# reply from your phone (the reply injects into the live session and resumes it).
#
# Runs on Linux (primary automation host), macOS, and Windows via WSL2. See ops/README.md.
#
#   Launch (detached, survives terminal close):
#       tmux new-session -d -s devmode "<repo>/ops/gentriduck-devmode.sh"
#   Watch live:   tmux attach -t devmode        (detach: Ctrl-b then d)
#   Stop:         tmux kill-session -t devmode   (do NOT /exit — that just restarts)
#
# Config is PINNED below (not inherited from ~/.claude/settings.json). Override via env:
#   GENTRIDUCK_DEVMODE_MODEL   (default: sonnet)        GENTRIDUCK_DEVMODE_EFFORT  (default: medium)
#   GENTRIDUCK_DEVMODE_RC_NAME (default: gentriduck-dev) GENTRIDUCK_DEVMODE_LOG     (default: ~/.claude/…)
#   GENTRIDUCK_DEVMODE_PERMISSION_MODE (default: bypassPermissions — unsupervised; `default` = prompts)
#
# The while-loop makes it truly non-stop: if claude exits (usage limit reached or
# a crash) it restarts after a short sleep, resuming once the limit resets.

set -uo pipefail

# Repo root = parent of this script's directory, so the path is never hard-coded.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
LOG="${GENTRIDUCK_DEVMODE_LOG:-$HOME/.claude/gentriduck-devmode.log}"

# --- Pinned config (override via env; do NOT silently inherit ~/.claude/settings.json) ---
# The PM loop is mostly orchestration, so it runs Sonnet at medium effort by default; heavy
# reasoning is delegated to Opus subagents at the methodology gate. Raise these deliberately
# only if you accept the cost of a non-stop loop (e.g. MODEL=opus, EFFORT=high).
MODEL="${GENTRIDUCK_DEVMODE_MODEL:-sonnet}"        # alias (sonnet|opus|fable) or a full model id
EFFORT="${GENTRIDUCK_DEVMODE_EFFORT:-medium}"      # one of: low | medium | high | xhigh | max
SESSION_NAME="${GENTRIDUCK_DEVMODE_RC_NAME:-gentriduck-dev}"

# Unsupervised mode: skip tool-permission prompts so the PM just works the board and only loops
# you in for real DECISIONS (PR merge, ADR / new tool-source, ambiguous calls) per its standing
# prompt — not for routine "may I run X?". The settings.local.json DENY list still blocks the
# dangerous stuff (gh pr merge, force-push, rm, curl, …). Set `default` to restore prompts.
PERMISSION_MODE="${GENTRIDUCK_DEVMODE_PERMISSION_MODE:-bypassPermissions}"  # default|acceptEdits|bypassPermissions|dontAsk|auto|plan

cd "$DIR"

# --- Preflight: fail fast with a clear message instead of a cryptic mid-run error ---
for bin in claude git gh; do
    command -v "$bin" >/dev/null 2>&1 || { echo "devmode: required command not found: $bin" >&2; exit 1; }
done
[ -f "$DIR/.claude/agents/project-manager.md" ] || {
    echo "devmode: '$DIR' does not look like the gentriduck repo (no .claude/agents/project-manager.md)" >&2
    exit 1
}

# --- Single-instance guard: never let two PMs race the same board ---
if pgrep -f -- "--remote-control $SESSION_NAME" >/dev/null 2>&1; then
    echo "devmode: a session '$SESSION_NAME' is already running — refusing to start a second PM." >&2
    echo "         attach: tmux attach -t devmode    |    stop: tmux kill-session -t devmode" >&2
    exit 1
fi

# Keep the host awake while running, using whatever's available; no-op on a
# headless server that never sleeps.
if command -v caffeinate >/dev/null 2>&1; then            # macOS
    KEEPAWAKE=(caffeinate -i)
elif command -v systemd-inhibit >/dev/null 2>&1; then     # most Linux
    KEEPAWAKE=(systemd-inhibit --what=idle:sleep --why="Gentriduck dev mode" --mode=block)
else
    KEEPAWAKE=(env)                                        # no-op prefix (keeps the array non-empty under `set -u`)
fi

# Standing instruction. Wrapped in /loop so the session re-paces itself and never
# silently stalls after an idle turn. At every human gate it pings the phone via
# PushNotification and parks for the reply, instead of guessing.
PROMPT='/loop You are the Gentriduck project manager in continuous dev mode; follow your agent definition, especially the "Continuous (devmode) operation" and "Blocked-on-maintainer handling" sections. Each cycle: run the board reconciliation pass; RE-SCAN ALL open issues and re-prioritize against docs/PROJECT_PLAN.md and dependencies (filing new tickets judiciously for genuinely discovered work, after a duplicate check); then advance the top UNBLOCKED ticket through implement -> review -> methodology sign-off -> merge, moving its card in lockstep (start -> In Progress, merge/close -> Done). When a task needs MY decision -- a PR ready to merge (merges happen in the GitHub UI), an ADR or new tool/library/data-source approval, a genuinely ambiguous call, or a ~3-iteration escalation -- comment the question on the issue, send me a PushNotification, label it `blocked` and move its card back to Todo, then immediately pull the NEXT unblocked ticket; never idle waiting on me. When I reply, clear `blocked` and resume that ticket. Post me a short chat status update on every ticket you finish, create, or newly block -- max 3 bullets per ticket (also PushNotification the blocked ones). Treat any message from me as TOP PRIORITY: answer status requests immediately with a board snapshot, and turn scope requests into properly-filed, prioritized tickets, before resuming. Keep exactly one card In Progress. Never stop the loop on your own.'

mkdir -p "$(dirname "$LOG")"
{
    echo "=== gentriduck devmode ==="
    echo "repo:    $DIR"
    echo "model:   $MODEL    effort: $EFFORT    permissions: $PERMISSION_MODE"
    echo "session: $SESSION_NAME (Remote Control)"
    echo "started: $(date)"
} | tee -a "$LOG"

while true; do
    echo "--- devmode start $(date) ---" >> "$LOG"
    "${KEEPAWAKE[@]}" claude --model "$MODEL" --effort "$EFFORT" --permission-mode "$PERMISSION_MODE" --remote-control "$SESSION_NAME" "$PROMPT"
    echo "--- devmode exited $(date); restarting in 60s (usage limit or crash) ---" >> "$LOG"
    sleep 60
done
