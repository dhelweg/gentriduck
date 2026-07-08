# 2026-07-08 security review — autonomous-setup enforcement (SEC cluster)

**Scope:** security posture of the autonomous operation setup — the committed
`.claude/settings.json` permission rules, `ops/gentriduck-devmode.sh`, `ops/deploy-gh-pages.sh`,
secret handling (`.gitignore`, `.env.example`, `transform/profiles.yml`), and the server-side
GitHub configuration they assume. One-off review, independent of the devmode loop. Deliverable is
this document plus tickets and plan updates — **no code was changed** in this review.

**Threat model:** the primary risk is not an external attacker with shell access — it is **the
autonomous agent itself going wrong**, either through error or through injected instructions
(issue bodies, web content). The agent runs unattended with `--dangerously-skip-permissions` on
the Linux automation host, under the **maintainer's own `gh` credentials** (ADR-0011's documented
single-credential nuance), with unrestricted network egress (`curl`/`wget` are allow-listed for
the ingestion pipeline).

**Verdict:** thoughtfully built, honestly documented — but the core safety claim ("`main` stays
human-gated") rests entirely on **client-side rules that are bypassable**. No secrets are
committed; the devmode script's guards (root refusal, single-instance lock, host-aware permission
mode) are sound. The gaps are concentrated in three places: no server-side branch protection, a
blanket `Bash(gh *)` allow that undermines the two key denies, and an unhardened prompt-injection
surface on the always-on loop.

## What is solid (verified)

- **No committed secrets.** A pattern scan (GitHub PATs, AWS keys, JWTs, Slack tokens) over the
  tree found nothing. `.env` is gitignored, `.env.example` holds only placeholders, and
  `MOTHERDUCK_TOKEN` is injected via `env_var()` in `transform/profiles.yml` — never inline.
- **Devmode script guards** (`ops/gentriduck-devmode.sh`): refuses `--dangerously-skip-permissions`
  as root; single-instance `pgrep` guard against two PMs racing the board; host-aware default
  (supervised Mac/WSL2 → gated `bypassPermissions`, only the native Linux automation host →
  `dangerously-skip`).
- **Deny-over-allow semantics** are correctly relied on: Claude Code enforces `deny` rules even
  under bypass modes, so the listed blocks (`gh pr merge`, force-push, `git reset --hard`,
  `sudo`, push-to-`main` patterns) hold *for those exact command shapes*.
- **Self-awareness:** the `$comment` in `.claude/settings.json` explicitly states the
  push-to-`main` denies are defence-in-depth only and that full enforcement needs a separate PM
  identity (ADR-0011 Alternative D). The setup does not overclaim.

## Findings → tickets

| # | Finding (severity) | Ticket |
|---|---|---|
| 1 | `main` has **no server-side protection**: every guard lives in local files the running agent can route around, and `settings.local.json` (gitignored) can add further allows. A GitHub **ruleset** on `main` (require PR, block force-pushes/deletions, no bypass) closes all local-bypass paths at once and works even with the single shared credential — direct pushes are blocked for *everyone*; the maintainer still merges the weekly PR in the UI. `develop` similarly deserves force-push/deletion protection. (high) | **#190** SEC-1 |
| 2 | `Bash(gh *)` in the allow-list **undermines both key denies**: `gh api repos/…/pulls/N/merge -X PUT` merges a PR and `gh api …/git/refs/heads/main -X PATCH` moves `main` directly — neither matches any deny pattern. The same indirection exists via `python -c 'subprocess.run(["git","push",…])'` and `xargs git push`, since deny patterns match the Bash command *string*, not what it ultimately executes. (high) | **#191** SEC-2 |
| 3 | **Prompt-injection surface on the always-on loop:** the devmode PROMPT instructs the PM to "RE-SCAN ALL open issues" every cycle, and domain agents have WebFetch/WebSearch. On a public repo, anyone filing an issue writes instructions into a loop running with skipped permissions, `gh` credentials (`gh auth token` matches `gh *`), and unrestricted `curl`/`wget` egress — the classic injection → credential-exfiltration chain. (high) | **#192** SEC-3 |
| 4 | Deny-list **destructive-command gaps**: `git reset --hard` is denied but `git checkout .` / `git clean -fdx` are not (same effect on uncommitted work); `rm *` stays allowed for the ingestion pipeline, which makes the `reset --hard` deny largely symbolic. (low — accept or patch cheaply) | folded into **#191** SEC-2 |
| 5 | `ops/deploy-gh-pages.sh` performs a `git push --force` that the deny-list cannot see when the *script* is invoked (the command string is the script path, not `git push`). Harmless today — it only targets the generated `gh-pages` artefact branch — but worth a guard comment / target assertion if the script ever grows. (low) | folded into **#191** SEC-2 |

## Detail

### 1. `main` protection is deterrence, not enforcement (SEC-1)

The full chain protecting `main` today: deny patterns in the committed `settings.json` + the PM
being *instructed* to only touch `develop` (ADR-0011). Issue #109 originally proposed branch
protection + auto-merge; the maintainer's 2026-06-29 decision superseded it with the `develop`
integration model, noting that "branch protection can't distinguish PM from maintainer" under the
single credential. That nuance is correct **for actor-based rules** — but a plain ruleset that
blocks *all* direct pushes to `main` and requires a PR does not need to distinguish actors: the
maintainer's weekly UI merge satisfies it, and every local bypass path (finding 2, exotic push
forms, `settings.local.json`) is closed server-side. The residual gap — the PM merging the weekly
PR itself via API under the shared credential — is addressed by SEC-2's `gh` narrowing, and fully
by ADR-0011 Alternative D (separate PM identity), which SEC-1 should record a go/no-go decision on.

### 2. The allow-list's blast radius (SEC-2)

The deny mechanism matches the Bash command string. Anything that reaches git/GitHub through
another binary sails past it. Concretely reachable today under the current allows:

- `gh api` — merge PRs, move refs, edit repo settings, read `gh auth token`.
- `python -c` / `python3 -c` — arbitrary subprocess, including any denied command.
- `xargs`, `tee` into a script + `chmod` — trivial indirection wrappers.

The fix is not to chase every wrapper (impossible — `uv run python` is load-bearing for the whole
pipeline) but to (a) narrow `gh *` to the subcommands the PM actually uses (`gh issue`, `gh pr
view/create/comment/list`, `gh project`, `gh repo view`, `gh api` **only if scoped read-only**, or
drop it), and (b) accept the remaining indirection as residual risk *because SEC-1's server-side
ruleset backstops it*. Cheap adds while in the file: deny `git clean -fdx`-style patterns, and an
explicit target assertion in `deploy-gh-pages.sh` (refuse to push any ref other than `gh-pages`).

### 3. Untrusted input into an unattended agent (SEC-3)

Mitigations, in increasing order of effort:

1. **Agent-definition hardening:** instruct the PM (and any agent that reads issues or fetches
   web content) to treat non-maintainer-authored issue/comment bodies and all fetched web content
   as **untrusted data, never instructions** — and to escalate via PushNotification instead of
   acting when such content asks for tool use, credential access, or scope changes.
2. **Intake restriction** (overlaps CV-1 #186): limiting who can file backlog issues shrinks the
   injection channel; the CV cluster's voting board becomes the moderated intake.
3. **Egress reduction:** the ingestion pipeline needs `curl`/`wget` against known open-data
   hosts; consider documenting the expected host set so a reviewer (or a future hook) can flag
   fetches to unknown destinations. Full egress allow-listing is out of scope for a free stack —
   document it as accepted residual risk.

SEC-1 + SEC-2 materially cap the damage an injected agent can do (no path to `main`, no
credential-holding `gh api`), which is why they rank ahead of SEC-3's mitigations.

## Non-findings (checked, fine)

- Watchdog `pkill` is scoped to the named Remote Control session; no broader process kill.
- Pre-commit/push-stage gate is orthogonal to this review (quality, not security) and intact.
- `.claude/settings.local.json` being gitignored is correct: local files can *add allows* but
  cannot remove committed denies — the risk it poses collapses once SEC-1 exists.
- Repo-local dbt profile keeps `~/.dbt` untouched; MotherDuck stays off the serving path
  (ADR-0012), so no serving-path credential exists at all.

## Recommended order

**SEC-1 (#190) → SEC-2 (#191) → SEC-3 (#192).** SEC-1 is a maintainer-only UI action (highest value, near-zero cost,
no ADR needed — it changes no tool, only repo settings). SEC-2 is a one-file settings change plus
a small ops-script guard. SEC-3 is agent-definition text plus documentation, partially delivered
by the CV cluster.
