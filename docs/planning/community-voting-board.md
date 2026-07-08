# Community Voting Board + Autonomous Triage — Plan

**Status:** planned (2026-07-08). Working reference for the **CV (Community Voting)** ticket
cluster (`CV-0`…`CV-3`). Link this doc from every ticket in the cluster.

## Why

The repo is public (open-data / open-source ethos), so anyone can **read, fork, and check out**
the project. The maintainer wants to keep that openness for *consumption* while preventing
outsiders from **directly steering** the project: no third party should be able to create backlog
tickets or change code directly.

Instead of a free-for-all, the community (if one forms) gets a **structured, opt-in channel**: a
public **voting board** where people submit change requests and **upvote** them. A request only
becomes a real backlog ticket after it (a) crosses an **upvote threshold** (default **≥10**,
configurable) *and* (b) passes an **autonomous triage agent** that screens it for maliciousness,
spam, off-topic scope, and fit with the project's golden rules — before it is promoted into our
backlog as a properly-formatted issue.

This keeps the project **open to input but closed to hijacking**: the crowd sets *interest*, but
every existing gate still binds (see "Gate interaction" below).

## Governance model (target state)

| Actor | Read / fork / checkout | Vote & submit requests | Create backlog tickets | Change code (merge) |
|---|---|---|---|---|
| Public / community | ✅ | ✅ (voting board only) | ❌ (only via triage promotion) | ❌ |
| Autonomous agents | ✅ | — | ✅ (promotion + normal flow) | via `develop` (ADR-0011) |
| Maintainer | ✅ | ✅ | ✅ | ✅ (`main` human-gated) |

- **Code** is already protected: `main` is human-gated and `develop` is PM-integrated (ADR-0011),
  and the committed deny-list blocks irreversible ops. External forks can only *propose* via PRs
  the maintainer controls — this cluster hardens and documents that so the voting board becomes
  the intended contribution channel, not fork-PRs.
- **Backlog tickets** (GitHub Issues) are the live backlog (PROJECT_PLAN §Decisions). Today anyone
  can open one. The cluster funnels community intent to the voting board and keeps direct
  issue-creation to the maintainer + agents.

## The three concerns

1. **Governance / access hardening** — configure the repo + docs so external contributors can
   consume freely but cannot create backlog tickets or land code directly; the voting board is the
   documented channel. → `CV-1`
2. **The voting board itself** — a **free, open, zero-/low-infra** surface where the community
   submits change requests and upvotes them. Candidate: **GitHub Discussions** (native upvotes; a
   "Change requests" category or Polls; already integrated; free) — but the platform choice is an
   **architect decision**, not pre-committed here. → `CV-2`
3. **Autonomous triage agent** — watches the board; when a request crosses the threshold, it
   screens for maliciousness / spam / scope and **promotes** the survivors into the backlog as
   conforming issues (routing methodology-bearing ones to the R-C1 gate). → `CV-3`

## Open questions for the ADR (`CV-0`, keystone)

Per golden rule 2 (consult the architect before adopting any new tool), the platform + mechanism
are decided in an ADR, not here. The ADR must settle:

- **Board platform** (free/open only): GitHub Discussions (upvotes / Polls) vs an issue-form +
  reactions convention vs a site feature. Local-first / no-paid-tool constraints apply; a static
  Evidence site has no vote backend, so a self-hosted vote store would be new infra to justify.
- **Direct-issue-creation control**: interaction limits, an auto-redirect bot/agent that closes
  community-opened issues pointing to the board, `CONTRIBUTING.md` policy, or a combination.
- **Automation substrate**: how/when the triage agent runs, given the project is **local CI only,
  no cloud runners** (the devmode PM session, a scheduled trigger, or a manual `poe` task).
- **Threshold + rubric**: confirm the default **≥10 upvotes** (configurable) and the exact
  maliciousness/scope screening rubric the agent applies.
- **Ethics framing** (domain expert): a public vote ranking changes to a *gentrification* measure
  is sensitive — votes must never influence methodology fidelity, only intake priority.

## Gate interaction (safety property — non-negotiable)

Voting affects **intake and prioritisation only**. A promoted request is an ordinary backlog
ticket and is still subject to **every existing gate**:

- New tool/lib/source → **architect gate + ADR** (golden rule 2).
- Methodology-bearing change → **R-C1 dual sign-off** (geo-DS + domain expert), enforced.
- Code → coder ↔ reviewer loop; `develop` integration (ADR-0011); `main` human-gated.

So a popular-but-harmful request (malicious code, methodology poisoning, scope creep) is caught
either by the triage agent at intake **or** by the downstream gates — a high vote count can never
buy a bypass. The triage agent is an **added** front-door filter, not a replacement for review.

## Ticket cluster

| ID | Title | Depends on | Labels |
|---|---|---|---|
| `CV-0` | ADR — community-contribution governance, voting board & autonomous triage (keystone) | — | `adr`, `infra` |
| `CV-1` | Governance / access hardening — read-only-to-outsiders; board is the channel | `CV-0` | `infra`, `documentation` |
| `CV-2` | Stand up the community voting board (platform per ADR) | `CV-0` | `enhancement`, `infra` |
| `CV-3` | Autonomous triage agent — screen ≥10-upvote requests, promote survivors to backlog | `CV-0`, `CV-2` | `infra` |

## Out of scope / later

- **Surfacing** the top-voted requests / a public roadmap on the Evidence website (Epic G) — a
  natural follow-up once `CV-2` exists; captured here, not ticketed yet.
- Any paid/proprietary voting SaaS — excluded by golden rule 1.
