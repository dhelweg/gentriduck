# ADR-0009: Agent-skill tooling — selectively adopt Superpowers

- **Status:** Proposed
- **Date:** 2026-06-19

## Context

Gentriduck runs on a **bespoke, domain-tuned agent setup**: specialised agents (project-manager,
system-architect, data-engineer ↔ data-engineer-reviewer, geo-data-scientist, gentrification-domain expert),
the `de-implement` / `de-review` skills, a **binding methodology gate** (R-C1), an ADR tool-gate, and
structured handoffs.

[Superpowers](https://github.com/obra/Superpowers) (Jesse Vincent, **MIT**) is a popular, actively-developed,
multi-host **skills framework** for coding agents. It ships ~14 general engineering-discipline skills as plain
markdown — `brainstorming`, `writing-plans`, `subagent-driven-development`, test-driven-development
(red-green-refactor), `systematic-debugging` (root-cause-first), `verification-before-completion`,
`code-review`, `writing-skills` — installed as a **harness-level plugin** (via the Claude plugin marketplace),
i.e. it shapes how the local Claude Code behaves and is largely orthogonal to the repo's committed
`.claude/agents`.

Question (raised 2026-06-19): should we adopt it for our setup? It clearly passes the free+open golden rule
(MIT) and matches our portability stance (plain markdown, cross-platform). The real question is fit vs. our
existing setup.

## Decision

**Selectively adopt Superpowers as a complementary skills layer — do not replace the bespoke core.**

- **Adopt** the generic discipline skills that fill gaps we don't currently have:
  `brainstorming`, `systematic-debugging`, `verification-before-completion`, `writing-skills`.
- **Keep as the core** (Superpowers does not replace these): `de-implement` / `de-review`, the domain agents
  (geo-data-scientist, gentrification-domain expert), project-manager, system-architect, the **binding
  methodology gate** (R-C1), the ADR tool-gate, and structured handoffs. Superpowers has **no** domain
  capability (gentrification methodology, spatial pitfalls, OSM completeness) — the heart of this project.
- **Adapt, don't adopt as-is**, the parts that assume an application-code project:
  - its **TDD / red-green-refactor** → map onto our analytics-engineering equivalent: **dbt schema/data
    tests + contracts** plus the leakage / nested-CV guards (R-C3). Do not force red-green-refactor on dbt models.
  - `writing-plans` / `subagent-driven-development` / `code-review` overlap our **SPEC-per-issue**, **PM-driven
    agent loop**, and **reviewer agent** — use Superpowers' framing as inspiration, not a second competing loop.
- **Pin a version.** It moves fast (v6+); for multi-session and overnight `--print` runs, behavioural drift is
  a risk. Pin and bump deliberately.
- **Treat it as a per-developer harness layer**, but **document the install + pinned version** in the method
  docs (O1, #81) so the operating model stays reproducible for others.

## Alternatives considered

- **Wholesale-adopt Superpowers' methodology** — rejected: duplicates/conflicts with our gate and loop,
  forces TDD onto a dbt project, and cannot supply the domain methodology that defines Gentriduck.
- **Don't use it at all** — rejected: it is free/open and its brainstorming, systematic-debugging,
  verification, and skill-authoring skills genuinely fill gaps we lack, at low risk (reversible harness layer).

## Consequences

- A small, named set of external skills augments our setup; the bespoke domain core and gates remain
  authoritative.
- A pinned external dependency to track; bumps are deliberate, behind this ADR.
- The method-showcase (O1) documents the install + version so reproduction is exact.
- Implementation, trial, and the flip of this ADR to **Accepted** are tracked in **R-C5 (#84)**.
