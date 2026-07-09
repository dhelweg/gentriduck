# Contributing to Gentriduck

Gentriduck is open-data / open-source: **read, fork, and check out freely.** This document is the
canonical statement of *how* to propose a change — see [ADR-0020](docs/adr/0020-community-contribution-governance-voting-board.md)
for the full governance decision record this page summarizes.

## The backlog (GitHub Issues + Project board) is maintainer- and agent-controlled

The Issues backlog and the [Gentriduck project board](https://github.com/users/dhelweg/projects/1)
are the **working backlog** for the maintainer and the autonomous agent team (`project-manager`,
`data-engineer`, `geo-data-scientist`, `gentrification-domain-expert`, and others — see
[CLAUDE.md](CLAUDE.md)). Per [ADR-0011](docs/adr/0011-autonomous-merge-develop-branch.md)
and ADR-0020, direct backlog-ticket creation and direct code merges stay maintainer/agent-only —
this is a deliberate governance choice, not an oversight. Opening a blank issue on this repo is
disabled; the issue-template picker redirects here instead.

## How to propose a change: the community voting board

Use the **[voting board](https://github.com/dhelweg/gentriduck/discussions/categories/ideas)**
(GitHub Discussions, "Ideas" category — see the pinned
[guidelines discussion](https://github.com/dhelweg/gentriduck/discussions/213)):

1. **Search first** — check whether your idea (or something close) is already posted.
2. **Post a new "Idea"** if not, or **upvote (👍) an existing one** if it already captures what you
   want.
3. Requests that cross a vote threshold are periodically **screened** by an autonomous triage
   step (spam/malicious filter, free-and-open-source-only scope check, methodology-gate flagging)
   and, if they pass, **promoted into the backlog** as a normal ticket — cross-linked back to the
   originating discussion.
4. From there, a promoted ticket is **subject to every existing engineering gate** exactly like any
   other backlog item: the architect/ADR gate for new tools or data sources, the dual
   `geo-data-scientist` + `gentrification-domain-expert` sign-off for methodology-bearing changes
   (R-C1), the coder ↔ reviewer loop, and `develop`/`main` branch gating. **Vote count never buys a
   bypass** — votes decide *whether/when* something is considered, never a methodology outcome.

This applies to feature ideas, data-source suggestions, and bug reports alike — post them all in
Ideas; keeping intake in one place makes triage simpler.

## Code contributions (forks / PRs)

Forks and pull requests are welcome as *proposals* — the maintainer controls what merges. In
practice, the voting board is the primary channel for driving what gets built; a fork/PR is a way
to *show* an idea, not a way to bypass the backlog/gate process above. `main` is human-gated and
`develop` is PM-integrated (ADR-0011); nothing merges to either without going through the same
gates internal work does.

## Licensing note

Code is [MIT](LICENSE); the published derived dataset is
[ODbL v1.0](https://opendatacommons.org/licenses/odbl/1-0/) (see `DATA_LICENSE.md`). By
contributing, you agree your contribution is offered under those same terms.
