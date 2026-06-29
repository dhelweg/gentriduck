# ADR-0011: Autonomous merge via a `develop` integration branch

- **Status:** Accepted
- **Date:** 2026-06-29
- **Accepted:** 2026-06-29 by the maintainer. Decision made by the maintainer on #109; this ADR
  designs and records it. No methodology sign-off required — this is a process/ops decision, not
  methodology-bearing work (it touches none of the R-C1 paths), but it **re-words the R-C1 pre-merge
  check**, so the geo-DS + domain gate continues to apply to the work that flows through it.

## Context

Today, continuous dev mode (`ops/gentriduck-devmode.sh`) runs the `project-manager` (PM) agent in a
non-stop loop: it works the GitHub Project board, opens PRs against `main`, and then **stops at a human
gate for every PR** — it pings the maintainer (chat + `PushNotification`) and the maintainer merges the
PR in the GitHub UI. The PM physically cannot merge, because `Bash(gh pr merge*)` is on the **deny list**
in `.claude/settings.json` (deny wins over allow, so it holds even under
`--dangerously-skip-permissions` on the native-Linux automation host). See CLAUDE.md
§"Continuous dev mode" and `ops/README.md` §"Unsupervised by default".

This makes the merge step the loop's only hard, per-PR human dependency. Overnight and between
hands-on sessions the PM does everything *up to* merge and then parks — a steady stream of
ready-to-merge PRs queues for the maintainer, and forward progress stalls until they are cleared by
hand. The maintainer wants the PM to **integrate its own completed, reviewed work autonomously**,
while keeping a **human gate on `main`** so nothing reaches the published-history branch without a
person looking at it.

The tracking issue (#109) first scoped this as *server-side* auto-merge: adopt GitHub Actions CI,
add required status checks (`uv run poe build`), an automated methodology-sign-off check, branch
protection on `main`, then `gh pr merge --auto`. That route **collides with the golden rules**: it
introduces a cloud CI dependency, directly against ADR-0001's "Quality gate (local, no cloud)" stance
and the "no new tool without an ADR" rule, and it makes autonomous merge *depend on* standing up that
infrastructure first. The maintainer chose a **simpler model that needs no cloud CI at all** and that
reuses permissions the PM already has. This ADR records that chosen model; the CI route is captured
under "Alternatives considered" and explicitly deferred.

### Constraints this ADR must respect (CLAUDE.md golden rules; ADR-0001; ADR-0009)

- **Free + open only; local-first; no cloud CI** (golden rule #1; ADR-0001 "Quality gate: local, no
  cloud"). The model must work with nothing but local git/`gh` and the local pre-commit gate.
- **Methodology gate is enforced, not advisory** (golden rule #3 / R-C1). Relocating the "merge" point
  must not weaken the gate; the geo-DS + domain `PASS` requirement has to bind at the new integration
  point.
- **Single credential.** The PM runs under the maintainer's `gh`/`git` identity, so GitHub cannot tell
  "PM" from "maintainer". Any protection of `main` against the PM is therefore **behavioral**
  (deny-list + instruction), not server-enforced. This is a constraint to be honest about, not one we
  can engineer away without a second identity.
- **Self-healing loop tolerance** (ADR-0009 ops layer). Whatever the PM does autonomously must be safe
  to interrupt and restart — a watchdog can kill and relaunch the session mid-action at any time, so
  the integration step has to be cheap to redo and have a small blast radius.

## Decision

Adopt a **`develop` integration branch** as the PM's autonomous merge target, with `main` reachable
only through a human-merged PR.

1. **Feature branches off `develop`.** The PM branches feature work from `develop` (not `main`) and,
   once a ticket has passed the full coder ↔ reviewer ↔ (methodology sign-off) loop, **self-integrates
   it into `develop` using plain git** — `git merge` then `git push origin develop`. Both are already
   permitted under `Bash(git *)`; **no new permission and no `gh pr merge` is involved.**

2. **`gh pr merge` stays denied.** The deny-list entry `Bash(gh pr merge*)` is **unchanged**. The PM
   therefore *physically cannot* merge any PR — including the one into `main` — through `gh`. Its only
   merge capability is `git`-merging into `develop`, a branch with no published-history status.

3. **`main` changes only via a human-merged `develop → main` PR.** On a **weekly** cadence the PM opens
   (or refreshes) a single standing `develop → main` pull request (`gh pr create` is allowed) and pings
   the maintainer. **The maintainer merges it in the GitHub UI.** This PR is the **human-in-the-loop
   gate** on `main`: one batched review of everything integrated that week, instead of a per-PR gate.

4. **The methodology gate relocates to the `develop`-integration point.** Under this model "merge"
   means *integrate into `develop`*, so the enforced R-C1 check moves to the moment **before** the PM
   `git merge`s methodology-bearing work into `develop`: the geo-DS **and** domain `Verdict: PASS`
   sign-offs must already exist. The weekly `develop → main` review is an **added backstop**, not the
   primary gate. Exact re-wording in "Re-wording the R-C1 pre-merge check" below.

5. **No cloud CI is adopted.** The local pre-commit push-stage gate (`dbt build` + tests; ADR-0001)
   remains the build gate, and it runs on the automation host before any `git push`. A `develop → main`
   CI status check is a **possible later, separate addition** (its own ADR / amendment) — it is
   **out of scope here** and the model is fully coherent without it.

### Why this satisfies the constraints

- **No new tool, no cloud, no new permission.** It is built entirely from capabilities the PM already
  has (`git merge`/`git push`, `gh pr create`) and the existing local pre-commit gate. It needs no
  GitHub Actions, no MotherDuck, nothing paid — golden rule #1 and ADR-0001 hold unchanged.
- **`main` keeps a real human gate.** Because `gh pr merge` stays denied and the PM is instructed to
  touch only `develop`, every change to `main` passes through a person clicking merge on the
  `develop → main` PR.
- **Small blast radius / restart-safe.** The PM's autonomous action is confined to `develop`. A bad
  auto-integration, or an interruption by the hang-watchdog mid-merge, can only damage `develop`,
  which is recoverable and never the published branch. `main` is insulated by construction.
- **Throughput unblocked.** The per-PR human merge bottleneck is replaced by one weekly review, so the
  loop makes forward progress unattended instead of parking on every finished ticket.

### Re-wording the R-C1 pre-merge check (CLAUDE.md §"Methodology gate")

The current CLAUDE.md text gates "merging any methodology-bearing PR". Because the PM now self-merges
to `develop` with plain git (there is no GitHub PR-merge step for feature → `develop`), the check must
bind to the **integration-into-`develop`** action and name the weekly PR as the backstop. The
maintainer should re-word the "PM pre-merge check (enforced)" block to (substance to implement, exact
wording at the PM/CLAUDE.md edit's discretion):

> **PM pre-integration check (enforced).** "Integrate" = merge a feature branch into `develop`.
> Before integrating any **methodology-bearing** work into `develop`, verify that:
> 1. A `*-geo-signoff.md` file in `docs/epic-*/` or `docs/methodology/` contains `Verdict: PASS`.
> 2. A `*-domain-signoff.md` (or equivalent) contains `Verdict: PASS` once
>    `gentrification-domain-expert` is active.
> If either sign-off is missing or has `Verdict: FAIL` / `concerns`, **do not integrate into
> `develop`** — block, label `blocked`, and escalate to the maintainer.
>
> **`develop → main` backstop (human gate).** The weekly maintainer-merged `develop → main` PR is a
> second checkpoint: the maintainer may verify the same sign-offs before merging to `main`. It does
> **not** replace the pre-integration check — methodology-bearing work must already have been gated
> before it reached `develop`.

The list of methodology-bearing paths (R-C1) and the R-C2 grounding rule are **unchanged**.

## Alternatives considered

- **A — `develop` integration branch, human-merged `develop → main` (chosen).** No cloud, no new
  permission, real human gate on `main`, small blast radius, restart-safe. Costs: `main` lags
  `develop` by up to a week; behavioral-only protection of `main` (see Consequences/Risks).

- **B — Allow `gh pr merge` straight to `main` — REJECTED.** The literal "merge autonomously" request,
  but it removes the human gate on the published branch entirely. With a single shared credential there
  is then *nothing* between the PM and `main`. Directly contradicts the maintainer's "keep a human gate
  on `main`" requirement.

- **C — GitHub Actions CI + branch protection + `gh pr merge --auto` (the original #109 plan) —
  REJECTED for now, deferred.** Server-enforced merge-on-green is the "proper" hardening, but it
  requires adopting cloud CI (against ADR-0001 "no cloud") and an automated sign-off-verdict check,
  and it makes autonomous merge depend on building that infrastructure first. It is also **weakened by
  the single-credential reality** — branch protection cannot distinguish PM from maintainer, so
  required reviews can't meaningfully gate the PM until it has its own identity (see D). Revisit as a
  separate ADR if/when a CI check on `develop → main` is wanted, ideally paired with D.

- **D — A separate bot account / dedicated PM identity — DEFERRED.** The real fix for the
  single-credential limitation: give the PM its own GitHub identity so branch protection, CODEOWNERS,
  and required-review rules on `main` can *server-enforce* "the PM may write `develop` but never
  `main`". Out of scope now (it adds account/secret management and a token-handling surface); recorded
  as the principled hardening path. C becomes genuinely enforceable once D exists.

- **E — Keep the status quo (per-PR human merge to `main`) — REJECTED.** This is exactly the
  bottleneck #109 exists to remove.

## Consequences

- **Downstream changes required** (implemented separately, routed through review — *not* part of this
  ADR):
  - **`ops/gentriduck-devmode.sh` `PROMPT`** — the standing instruction says merges "happen in the
    GitHub UI" and the PM should ping for every PR merge. Re-word so the PM (a) branches off and
    integrates into **`develop`** via `git merge`/`git push`, (b) opens/refreshes the **weekly
    `develop → main` PR** and pings the maintainer to merge *that* in the UI, and (c) only pings at the
    weekly gate, not per feature.
  - **`.claude/agents/project-manager.md`** — update "Blocked-on-maintainer handling" (a finished
    feature is no longer a per-PR merge gate; the gate is the weekly `develop → main` PR), the
    implement → review → sign-off → **integrate-into-`develop`** loop description, and the board
    discipline (Definition of Done can be reached on `develop` integration; the card need not wait for
    `develop → main`).
  - **`CLAUDE.md`** — (1) the "Methodology gate / PM pre-merge check" block, re-worded per
    "Re-wording the R-C1 pre-merge check" above; (2) the "Continuous dev mode" paragraph (which today
    says the PM "pings you at human gates — a PR ready to merge (merges via the GitHub UI)") to describe
    `develop` self-integration + the weekly `develop → main` gate; (3) add `develop` to the
    branch/workflow conventions and reference this ADR.
  - **`ops/README.md`** — "Unsupervised by default" / "Merges remain yours" currently says the PM
    "queues them for you to merge in the GitHub UI" per PR. Re-word: the PM self-integrates to
    `develop`; only the weekly `develop → main` PR is queued for the maintainer.
  - **`docs/adr/README.md`** — add the ADR-0011 row.
  - **One-time repo setup** — create the `develop` branch from `main`; make `develop` the default base
    for the PM's feature work.

- **`main` lags `develop`** by up to the weekly cadence. Acceptable: `main` is the human-gated,
  publish-ready branch; `develop` is the live integration tip. Hosting/serving (deferred ADR, task F1)
  should publish from `main`.

- **Known limitation / risk — behavioral, not server-enforced, protection of `main`.** With a single
  shared credential, GitHub cannot stop the PM from `git push`-ing directly to `main`: `Bash(git *)` is
  broadly allowed, so `git push origin HEAD:main` is *not* deny-listed today. The protection of `main`
  rests on **two behavioral layers**: (1) `gh pr merge` denied (blocks the PR-merge path), and (2) the
  PM **instructed to only ever touch `develop`**. This is weaker than server enforcement and should be
  stated plainly.
  - **Cheap hardening now (optional, recommend):** add a deny-list rule for direct pushes to `main`,
    e.g. `Bash(git push *main*)` / `Bash(git push origin*main*)`, to make a stray `main` push fail
    fast. This is brittle pattern-matching (it can be evaded by alternate syntaxes and may catch
    `develop → main` PR-branch names), so treat it as defence-in-depth, **not** a real boundary —
    verify it doesn't block legitimate `gh pr create` flows.
  - **Real hardening later:** Alternative D — a separate PM identity + branch protection / CODEOWNERS
    on `main`. Only then is "PM cannot write `main`" *enforced* rather than *trusted*.

- **The audit/review surface for feature work moves off GitHub PRs.** Because feature → `develop` is a
  plain `git merge`, there is no GitHub PR-merge record for it by default. The agent loop (coder ↔
  reviewer ↔ sign-off) remains the review of record, and sign-off files are committed artefacts.
  *Open operational choice:* whether the PM should still open a feature → `develop` **PR for
  traceability** (then integrate via `git merge`/`push`, which lets GitHub auto-close it) — adds a paper
  trail and a ready home for a future per-feature CI check, at the cost of extra PR churn. Defaulting to
  **no per-feature PR** (pure git integration) is simplest and matches the decision; revisit if an
  audit trail is wanted.

- **Merge-conflict / divergence handling.** If `main` ever receives a direct human hotfix, the weekly
  `develop → main` PR can conflict; the PM must merge `main` back into `develop` (allowed via `git`)
  before refreshing the PR. Document this in the PM agent definition as part of the weekly-PR routine.

- **No cloud CI is added; the local push-stage gate is unchanged.** A `develop → main` status check
  remains a clean future addition behind its own ADR, without revisiting this decision.

- **Reversible.** If the model proves worse than per-PR merges, revert by pointing feature work back at
  `main` and reinstating the per-PR ping — no data, schema, or dependency change is entangled.

## References

- #109 (tracking issue — original CI + branch-protection + auto-merge proposal; superseded here by the
  no-CI `develop`-branch model). Related ops hardening: #107 / #108.
- CLAUDE.md — golden rules (#1 free+open/local-first, #3 methodology gate / R-C1, R-C2 grounding),
  §"Methodology gate", §"Autonomous local run" / "Continuous dev mode".
- ADR-0001 (stack & monorepo; "Quality gate: local, no cloud" — the no-CI constraint this honours),
  ADR-0009 (agent/ops skill layer; the self-healing devmode loop this must be safe under).
- `ops/gentriduck-devmode.sh` (the `PROMPT` + host-aware permission mode), `ops/README.md`
  §"Unsupervised by default" / "Merges remain yours", `.claude/settings.json` (deny list —
  `Bash(gh pr merge*)`), `.claude/agents/project-manager.md` (§"Blocked-on-maintainer handling",
  §"Continuous (devmode) operation").
