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
#   GENTRIDUCK_DEVMODE_PERMISSION_MODE (default: host-aware — Mac & Windows/WSL2=bypassPermissions, native Linux=dangerously-skip)
#   GENTRIDUCK_DEVMODE_STALL_SECS      (default: 900)   — hang-watchdog idle threshold
#
# NON-STOP + SELF-HEALING: the while-loop restarts claude when it EXITS (usage limit / crash), and a
# background watchdog restarts it when it HANGS — process alive but its session transcript has gone
# idle past the stall threshold (the mid-response API-error wedge that stalled it overnight).

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

# Unsupervised mode: skip tool-permission prompts so the PM just works the board and only loops you
# in for real DECISIONS (PR merge, ADR / new tool-source, ambiguous calls) — not routine "may I run
# X?". The committed .claude/settings.json DENY list still blocks the irreversible stuff (gh pr merge,
# force-push, git reset --hard, sudo); rm/curl stay allowed for the ingestion pipeline. HOST-AWARE
# default: a supervised personal machine (Mac, or Windows via WSL2) uses
# gated `bypassPermissions` (one accept); only a NATIVE Linux box — assumed to be the dedicated,
# unattended automation host — uses `dangerously-skip` (no accept gate, so the watchdog/loop restart
# hands-free). WSL2 reports "Linux" but is usually a laptop, so it's treated as supervised. Override
# with GENTRIDUCK_DEVMODE_PERMISSION_MODE (e.g. on a real WSL/Linux server you want unattended).
case "$(uname -s)" in
    Darwin)
        DEFAULT_PERMISSION="bypassPermissions" ;;          # supervised personal Mac
    Linux)
        if [ -n "${WSL_DISTRO_NAME:-}" ] || grep -qiE 'microsoft|wsl' /proc/version 2>/dev/null; then
            DEFAULT_PERMISSION="bypassPermissions"         # Windows / WSL2 — treat as a supervised laptop
        else
            DEFAULT_PERMISSION="dangerously-skip"          # native Linux — the unattended automation host
        fi ;;
    *)
        DEFAULT_PERMISSION="bypassPermissions" ;;
esac
PERMISSION_MODE="${GENTRIDUCK_DEVMODE_PERMISSION_MODE:-$DEFAULT_PERMISSION}"
STALL_SECS="${GENTRIDUCK_DEVMODE_STALL_SECS:-900}"         # watchdog: restart if the transcript is idle this long

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

# --- Resolve the permission flag (host-aware); guard the dangerous one against root ---
if [ "$PERMISSION_MODE" = "dangerously-skip" ] || [ "$PERMISSION_MODE" = "dangerously-skip-permissions" ]; then
    if [ "$(id -u)" -eq 0 ]; then
        echo "devmode: refusing --dangerously-skip-permissions as root — run as a normal user." >&2
        exit 1
    fi
    PERM_ARGS=(--dangerously-skip-permissions)
    PERM_LABEL="dangerously-skip-permissions"
else
    PERM_ARGS=(--permission-mode "$PERMISSION_MODE")
    PERM_LABEL="$PERMISSION_MODE"
fi

# Where Claude writes this repo's session transcripts; their mtime is the watchdog's liveness signal.
# (Claude encodes the cwd by replacing / . _ with - .)
PROJDIR="$HOME/.claude/projects/$(printf '%s' "$DIR" | sed 's#[/._]#-#g')"

# Keep the host awake while running, using whatever's available; no-op on a
# headless server that never sleeps.
if command -v caffeinate >/dev/null 2>&1; then            # macOS
    KEEPAWAKE=(caffeinate -i)
elif command -v systemd-inhibit >/dev/null 2>&1; then     # most Linux
    KEEPAWAKE=(systemd-inhibit --what=idle:sleep --why="Gentriduck dev mode" --mode=block)
else
    KEEPAWAKE=(env)                                        # no-op prefix (keeps the array non-empty under `set -u`)
fi

# --- Hang watchdog: claude can stay alive but wedged after a mid-response API error, which the
# exit-triggered loop below never catches. This restarts a session whose transcript has gone idle
# past STALL_SECS. Runs in the background per attempt; scoped to OUR Remote Control session.
# (Assumes devmode is the primary Claude session for this repo on the host — true on a dedicated box.)
watchdog() {
    while sleep 60; do
        pgrep -f -- "--remote-control $SESSION_NAME" >/dev/null 2>&1 || return     # claude already gone
        newest="$(ls -t "$PROJDIR"/*.jsonl 2>/dev/null | head -1)"
        [ -n "$newest" ] || continue                                              # no transcript yet
        # GNU stat (-c %Y) first — the Linux host. On macOS BSD-stat rejects -c (stderr only,
        # no stdout) so it falls through to -f %m. Doing BSD-first on Linux is WRONG: `stat -f`
        # is --file-system there, prints fs-info to stdout AND exits non-zero, polluting mtime.
        mtime="$(stat -c %Y "$newest" 2>/dev/null || stat -f %m "$newest" 2>/dev/null)"
        case "$mtime" in '' | *[!0-9]*) continue ;; esac                          # guard: epoch must be all digits
        age=$(( $(date +%s) - mtime ))
        if [ "$age" -gt "$STALL_SECS" ]; then
            echo "--- watchdog: session idle ${age}s (> ${STALL_SECS}s) — killing to force restart $(date) ---" >> "$LOG"
            pkill -f -- "--remote-control $SESSION_NAME"
            return
        fi
    done
}

# Standing instruction. Wrapped in /loop so the session re-paces itself and never
# silently stalls after an idle turn. At every human gate it pings the phone via
# PushNotification and parks for the reply, instead of guessing.
PROMPT='/loop You are the Gentriduck project manager in continuous dev mode; follow your agent definition, especially the "Branch & merge model (ADR-0011)", "Continuous (devmode) operation" and "Blocked-on-maintainer handling" sections. Each cycle: run the board reconciliation pass; RE-SCAN ALL open issues and re-prioritize against docs/PROJECT_PLAN.md and dependencies (filing new tickets judiciously for genuinely discovered work, after a duplicate check); then advance the top UNBLOCKED ticket through implement -> review -> methodology sign-off -> INTEGRATE INTO `develop` YOURSELF via plain git (branch features off `develop`; methodology-bearing work must clear the pre-integration sign-off check BEFORE you git-merge), moving its card in lockstep (start -> In Progress, integrated -> Done). NEVER use `gh pr merge` and NEVER push to `main` -- `main` is reached only by a WEEKLY `develop -> main` PR that I merge in the GitHub UI: open/refresh that one standing PR when due, summarize the batched tickets, and PushNotification me to merge it. When a task needs MY decision -- an ADR or new tool/library/data-source approval, a genuinely ambiguous call, or a ~3-iteration escalation -- comment the question on the issue, send me a PushNotification, label it `blocked` and move its card back to Todo, then immediately pull the NEXT unblocked ticket; never idle waiting on me. When I reply, clear `blocked` and resume that ticket. Post me a short chat status update on every ticket you finish, create, or newly block, plus when the weekly release PR is ready -- max 3 bullets per ticket (also PushNotification the blocked ones and the release PR). Treat any message from me as TOP PRIORITY: answer status requests immediately with a board snapshot, and turn scope requests into properly-filed, prioritized tickets, before resuming. Keep exactly one card In Progress. Never stop the loop on your own.'

mkdir -p "$(dirname "$LOG")"
{
    echo "=== gentriduck devmode ==="
    echo "repo:    $DIR"
    echo "model:   $MODEL    effort: $EFFORT    permissions: $PERM_LABEL"
    echo "session: $SESSION_NAME (Remote Control)    stall-watchdog: ${STALL_SECS}s"
    echo "started: $(date)"
} | tee -a "$LOG"

fails=0
while true; do
    start=$(date +%s)
    echo "--- devmode start $(date) (perm: $PERM_LABEL) ---" >> "$LOG"

    watchdog & wd=$!                                        # self-healing: restart on hang, not just exit
    "${KEEPAWAKE[@]}" claude --model "$MODEL" --effort "$EFFORT" "${PERM_ARGS[@]}" --remote-control "$SESSION_NAME" "$PROMPT"
    code=$?
    kill "$wd" 2>/dev/null; wait "$wd" 2>/dev/null         # stop this attempt's watchdog

    ran=$(( $(date +%s) - start ))
    if [ "$ran" -lt 120 ]; then fails=$((fails + 1)); else fails=0; fi   # quick exit → escalate backoff
    case "$fails" in 0 | 1) backoff=60 ;; 2) backoff=300 ;; *) backoff=900 ;; esac
    echo "--- devmode exited (code $code) after ${ran}s; restart #$fails in ${backoff}s $(date) ---" >> "$LOG"
    sleep "$backoff"
done
