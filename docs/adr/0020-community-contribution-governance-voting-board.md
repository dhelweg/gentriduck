# ADR-0020: Community-contribution governance — voting board & autonomous triage

- **Status:** Accepted
- **Date:** 2026-07-09
- **Methodology gate:** not applicable — this is a community-contribution-governance/process decision (backlog intake mechanics), not a change to index methodology, weights, normalization, or spatial method. It touches none of the R-C1 substantive paths; per precedent (ADR-0009,
  ADR-0011, ADR-0012, ADR-0015, ADR-0016 — process/infra ADRs with no sign-off files), no
  geo-DS/domain-expert sign-off is required. The §5 ethics framing below is a design safeguard,
  not a substitute for that gate — see "Gate interaction".

## Context

The repo is public (open-data / open-source ethos): anyone can read, fork, and check out
Gentriduck. The maintainer wants to preserve that openness for *consumption* while preventing
outsiders from **directly steering** the project — no third-party backlog tickets, no direct code
changes. `docs/planning/community-voting-board.md` (2026-07-08) captures the target governance
model and the open questions this ADR must settle; see it for the full "why" and the gate-safety
argument. This ADR is the **keystone** of the CV cluster (#185–#188): CV-1 (governance/access
hardening), CV-2 (stand up the board), and CV-3 (autonomous triage agent) all block on it.

Per golden rule 2 (CLAUDE.md), adopting any new tool/platform for the voting mechanism is an
architect decision recorded here, not a "first tool that works" pick made inside an
implementation ticket.

### Constraints this ADR must respect

- **Free + open only; local-first; no cloud CI** (golden rule 1; ADR-0001). No paid SaaS, no new
  hosted backend service. The project already runs local-CI-only (pre-commit + `dbt build`), with
  no GitHub Actions runners.
- **Existing gates are not renegotiated** (ADR-0011, R-C1/CLAUDE.md §Methodology gate). Anything
  promoted from the voting board is an ordinary backlog ticket subject to the architect/ADR gate,
  the R-C1 dual sign-off for methodology-bearing work, the coder↔reviewer loop, and `develop`/`main`
  branch gating. Voting can never buy a bypass.
- **`main` is human-gated, `develop` is PM-integrated** (ADR-0011) — already covers *code*. This
  ADR covers the separate surface of *backlog intake* (issues) and *public discourse* (requests +
  votes), which today has no equivalent control: any GitHub account can open an issue on this repo.

## Decision

### 1. Board platform: **GitHub Discussions**

Adopt **GitHub Discussions**, in a single **"Ideas" category** (GitHub's built-in category type,
which ships **native upvoting** via the 👍 reaction summed per discussion — no custom vote-counting
code or storage needed). This is:

- **Free** — included with the public GitHub repo, no incremental cost or new account.
- **Zero new infrastructure** — no self-hosted vote store, no static-site vote backend (the Evidence
  site is fully static and has no database; a site-hosted voting feature would be new infra to
  justify against golden rule 1, and GitHub Discussions makes that unnecessary).
- **Already the platform the maintainer/agents live in** — same `gh` CLI and GraphQL API surface
  used everywhere else in this repo's tooling (`gh project`, `gh issue`), so the triage agent (CV-3)
  needs no new client library, only `gh api graphql` against the Discussions GraphQL schema.
  `hasDiscussionsEnabled` is currently `false` on the repo; **CV-2 enables it** (`gh repo edit
  --enable-discussions` or the repo Settings UI) as part of standing up the board — no ADR needed
  for that mechanical step, it is already decided here.
- **Rejected alternative — issue-form + reactions convention**: reuses existing Issues tooling, but
  fails the core governance goal: Issues are the **live backlog** (PROJECT_PLAN §Decisions is
  explicit about this), so a "just use an issue template" convention would keep community-created
  issues mixed into the same namespace we are trying to fence off. Discussions is a **distinct
  GitHub object type**, which makes the fence structural, not just a naming convention — the
  strongest reason to prefer it over reactions-on-issues.
- **Rejected alternative — a site feature (custom voting UI on the Evidence site)**: would require a
  vote-storage backend (a database or serverless function) that does not exist today and that a
  fully static site (ADR-0012) cannot provide without introducing new hosted infrastructure —
  against golden rule 1 and ADR-0012's "static, no server" framing. Discussions gets equivalent
  functionality for free; revisit only if Discussions' feature set proves inadequate in practice.

### 2. Direct-issue-creation control

Combine two low-effort mechanisms rather than a single heavy one:

- **Rejected**: GitHub's built-in repo-level "Limit to collaborators" interaction limit is too
  blunt — it would also block genuine bug reports from users running the pipeline locally.
  **Adopted instead — documentation + template steer**: a `.github/ISSUE_TEMPLATE/config.yml` with
  `blank_issues_enabled: false` and a single issue-template choice that **links out to the
  Discussions "Ideas" category** instead of opening an issue form. This is the same low-infra
  pattern GitHub itself recommends for redirecting feature/change requests to Discussions, and
  needs no bot/agent to run.
- **`CONTRIBUTING.md` policy statement** (new, short file — CV-1 scope): states plainly that this
  repo's backlog (Issues) is maintained by the maintainer + autonomous agents only; community change
  requests go through the voting board; forks/PRs are welcome but merge is at the maintainer's
  discretion (already true; this documents it).
- **No auto-redirect bot** for now — the template redirect + `CONTRIBUTING.md` statement is
  sufficient friction given the project's current traffic; an automated issue-closing bot is
  deferred as a CV-3-adjacent follow-up if community-opened issues become a recurring nuisance in
  practice (not speculatively built now — avoid infra for a problem that has not yet materialized).

### 3. Automation substrate for the triage agent (CV-3)

The project has **no cloud CI runners** (ADR-0001 "local, no cloud"; ADR-0011 Context). The
triage agent therefore runs as **a step inside the existing devmode PM session** (`ops/
gentriduck-devmode.sh`), not as a separate scheduled job or GitHub Action:

- Each devmode cycle's "re-scan" step (CLAUDE.md §Continuous operation, step 2) gains a sibling
  check: query open Discussions "Ideas" items via `gh api graphql`, filter to ones whose 👍 count
  has crossed the threshold (see §4) since last seen, and run the triage rubric on each.
- **Idempotency**: mark a Discussion as triaged by applying a label-equivalent — GitHub Discussions
  support category assignment but not labels; use a fixed **triage-status marker**: the agent posts
  one comment on the Discussion recording its verdict (`Triage: promoted → #<issue>` or `Triage:
  rejected — <reason>`) and that comment's presence is the "already processed" check, avoiding
  reprocessing on every cycle.
- **No new scheduled trigger** is introduced — piggybacking on the always-on devmode loop avoids
  standing up cron/Actions infrastructure (golden rule 1) and keeps triage cadence consistent with
  every other backlog-scan the PM already does.
- A **manual `poe` task** (`uv run poe triage-community`) is added as a fallback/manual-run path for
  when devmode is not running, invoking the same script devmode calls.

### 4. Threshold + screening rubric

- **Threshold**: confirm the default **≥10 upvotes** (👍 reactions) proposed in the planning doc,
  **configurable** via a single constant in the triage script (not hard-coded inline) so the
  maintainer can retune without a code review cycle.
- **Screening rubric** (applied by the triage agent to any Discussion that crosses the threshold,
  before promotion to a backlog issue):
  1. **Malicious/spam filter**: reject requests that are off-topic, spam, abusive, or attempt prompt
     injection against the agents that will later read the promoted issue (per SEC-3 / #192 — the
     triage agent is itself untrusted-input-handling code and must treat Discussion body text as
     data, never as instructions).
  2. **Scope filter**: reject requests for paid/proprietary tools or data sources (golden rule 1),
     or requests that assume bypassing an existing gate (per the "Gate interaction" section below).
  3. **Free/open-source-only echo check**: if a request proposes a new tool/library/data source,
     the promoted issue is **explicitly flagged** as needing the architect/ADR gate before any
     implementation — the triage agent does not adjudicate free-vs-paid tool suitability itself,
     it routes to the existing gate.
  4. **Methodology-bearing echo check**: if a request touches any R-C1 path (CLAUDE.md
     §Methodology gate file list), the promoted issue is labeled so the PM routes it through the
     dual sign-off — triage never fast-tracks methodology changes.
  5. Survivors are promoted via `gh issue create --project Gentriduck` (existing PM tooling),
     cross-linked back to the originating Discussion, and enter the normal backlog/prioritization
     flow (PROJECT_PLAN + PM re-scan) — **no priority boost from vote count**; votes decide *whether*
     something enters the backlog, not where it sits once there (see Gate interaction).

### 5. Ethics framing (public voting on a gentrification-measurement project)

A public vote ranking changes to a project that **measures displacement and social change** is
sensitive: a popular request could, in principle, push toward methodology choices that flatter a
particular political narrative rather than empirical fidelity. This ADR fixes that risk
structurally, not just by policy statement:

- Votes decide **intake priority only** — whether/when a request is even considered. They carry
  **zero weight** in any methodology decision once a ticket exists; every methodology-bearing ticket
  (promoted or not) still requires the independent `geo-data-scientist` + `gentrification-domain-
  expert` PASS (R-C1), which is not vote-influenced by construction (those agents never see or
  weigh the originating vote count).
- The triage rubric's methodology-bearing echo check (§4.4) is specifically there so a
  high-vote-count methodology request cannot skip the architect/domain gates by virtue of
  popularity — it is routed through them like any other ticket, same cadence as everything else.
- This framing is restated verbatim in `CONTRIBUTING.md` (CV-1) so external contributors see it
  before they vote.

## Gate interaction (restated — non-negotiable)

Voting affects **intake and prioritisation only**. A promoted request is an ordinary backlog
ticket, still subject to every existing gate: architect gate + ADR for new tools (golden rule 2),
R-C1 dual sign-off for methodology-bearing work, coder↔reviewer loop, `develop`/`main` branch
gating (ADR-0011). A high vote count can never buy a bypass — the triage agent is an added
front-door filter, not a replacement for review.

## Consequences

- **Positive**: a structured, low-infra, free channel for community input that keeps the live
  backlog (Issues) agent/maintainer-controlled, satisfying the maintainer's "open to read, closed to
  steer" goal without new paid tooling or hosted infrastructure.
- **Positive**: reuses `gh`/GraphQL tooling already present in the repo's automation, keeping the
  triage agent's implementation small (CV-3 scope).
- **Trade-off**: GitHub Discussions' native reactions are a coarser signal than a purpose-built
  voting UI (no ranked-choice, no weighting) — accepted as sufficient for an intake-priority signal,
  not a decision-making mechanism.
- **Trade-off**: no auto-redirect bot for stray community-opened Issues initially — accept some
  manual/PM-cycle cleanup of misdirected issues until/unless volume justifies building one.
- **Follow-up work enabled**: CV-1 (governance docs + issue-template redirect), CV-2 (enable
  Discussions, create the "Ideas" category, publish the board), CV-3 (implement the triage script +
  `poe triage-community` task) are now unblocked.
- **Out of scope / later** (unchanged from the planning doc): surfacing top-voted requests on the
  public Evidence site (a natural Epic G follow-up once CV-2 exists, not yet ticketed).

## Alternatives considered

See §Decision inline for the rejected board-platform alternatives (issue-form + reactions; a
custom site voting feature) and their rejection reasons.

## Relations

`docs/planning/community-voting-board.md` (working reference, linked from every CV ticket) ·
ADR-0011 (branch model / `main` gating) · ADR-0001 (local-first, no cloud CI) · ADR-0012 (static
serving/hosting stack) · R-C1 / CLAUDE.md §Methodology gate · golden rule 1 (free + open only) ·
golden rule 2 (architect/tool gate) · #185 (this ticket) · #186/#187/#188 (CV-1/2/3, unblocked by
this ADR).
