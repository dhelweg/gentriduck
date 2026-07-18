#!/usr/bin/env bash
# ops/check-ticket-claim.sh -- pre-pickup cross-channel claim check (#286).
#
# Devmode's single-instance guard (#101/#103) only stops two *local* tmux loops
# on the same machine from racing the board. It has no visibility into a
# cloud/remote Claude Code session (claude.ai/code web/mobile) working the
# same board concurrently -- see docs/lessons/concurrent-session-git-divergence.md
# for the incident this guards against (2026-07-18: a local session and a
# cloud session both independently implemented #280/#284/#285 before either
# pushed, requiring a manual merge + de-duplicated sign-offs).
#
# This script gives ANY session (local devmode, headless overnight, or a
# cloud/remote run) a cheap, `gh`-only way to check "is someone already on
# this ticket?" before starting work, and to leave a claim marker other
# sessions can see.
#
# Usage:
#   ops/check-ticket-claim.sh <issue-number>          # check only
#   ops/check-ticket-claim.sh <issue-number> claim     # check, then claim if free
#
# Exit codes: 0 = free (or freshly claimed), 1 = claimed by someone else.
#
# Env:
#   GENTRIDUCK_SESSION_ID  identifies this session (default: hostname-PID; set
#                          a stable value, e.g. from the devmode wrapper, so a
#                          restarted-but-same-session run recognizes its own
#                          prior claim instead of treating it as foreign)
#   CLAIM_STALE_HOURS      how old a claim comment may be before it's ignored
#                          and the ticket is treated as free again (default 6 --
#                          long enough to cover one PM cycle, short enough that
#                          an abandoned/crashed claim doesn't wedge the ticket
#                          forever)
#   GENTRIDUCK_REPO        owner/repo (default: dhelweg/gentriduck)

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: $0 <issue-number> [claim]" >&2
  exit 2
fi

ISSUE="$1"
ACTION="${2:-check}"
SESSION_ID="${GENTRIDUCK_SESSION_ID:-$(hostname)-$$}"
STALE_HOURS="${CLAIM_STALE_HOURS:-6}"
REPO="${GENTRIDUCK_REPO:-dhelweg/gentriduck}"

# 1. In-flight branch check: an existing feature/fix branch for this issue
#    number (pushed by any channel) is a strong "someone is/was on this"
#    signal -- catches work-in-progress even before a claim comment exists.
branch_hit="$(git ls-remote --heads origin "feature/${ISSUE}-*" "fix/${ISSUE}-*" 2>/dev/null || true)"
if [[ -n "$branch_hit" ]]; then
  echo "CLAIMED: existing remote branch for #${ISSUE}:"
  echo "$branch_hit"
  exit 1
fi

# 2. Recent claim-comment check: the most recent "Claimed by <session> at
#    <timestamp>" comment, if any, and whether it's ours / still fresh.
claim_line="$(gh issue view "$ISSUE" --repo "$REPO" --json comments \
  --jq '[.comments[] | select(.body | startswith("Claimed by "))] | last | [.createdAt, .body] | @tsv' \
  2>/dev/null || true)"

if [[ -n "$claim_line" && "$claim_line" != $'\t' ]]; then
  claim_ts="$(printf '%s' "$claim_line" | cut -f1)"
  claim_body="$(printf '%s' "$claim_line" | cut -f2-)"
  now_epoch="$(date -u +%s)"
  claim_epoch="$(date -u -d "$claim_ts" +%s 2>/dev/null || echo 0)"
  age_hours=$(( (now_epoch - claim_epoch) / 3600 ))

  if [[ "$claim_body" != *"$SESSION_ID"* && "$age_hours" -lt "$STALE_HOURS" ]]; then
    echo "CLAIMED: recent claim from another session (${age_hours}h old, stale threshold ${STALE_HOURS}h):"
    echo "$claim_body"
    exit 1
  fi
fi

echo "FREE: #${ISSUE} has no in-flight branch and no recent foreign claim."

if [[ "$ACTION" == "claim" ]]; then
  gh issue comment "$ISSUE" --repo "$REPO" \
    --body "Claimed by ${SESSION_ID} at $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "Posted claim comment for #${ISSUE} as ${SESSION_ID}."
fi
