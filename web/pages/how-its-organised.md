---
title: How it's organised — the multi-agent workflow
sidebar_position: 23
---

<!--
  NEW page (#153, Epic G "audience front doors" — AI-architect audience). Restates existing,
  already-published facts (web/pages/about.md's "How it's built: a supervised, multi-agent
  workflow" + "tooling philosophy" sections, CLAUDE.md's methodology-gate rules, ADR-0011) for a
  public audience -- no new indicator, weight, method, or data source is introduced here, so no
  methodology gate. Pairs with /how-its-built (data-engineer audience) and productionizes the
  "🤖 You design AI systems" door on the home page.

  I3 (#220): re-platformed onto the shared `<Hero>`/`<AgentPipeline>`/`<FooterNav>` components,
  removing the hand-copied `.agent-pipeline`/`.pipe-step` markup+CSS this page had duplicated from
  `pages/index.md` (exactly the "appears twice" duplication the 2026-07-10 storytelling review's
  finding 4 named, and `AgentPipeline.svelte`'s own header comment flagged as pending until "I3
  converts them"). This page's own wording ("Coder" implements, not "Data engineer") is preserved
  via `AgentPipeline`'s `steps` prop rather than dropped in favour of the home page's copy. Added
  an explicit "Honest caveats" section per the I1 template: the gate is enforced, but the sign-off
  process itself does not claim infallibility — the domain-expert's I1 sign-off (C2 watch-item,
  `docs/epic-i/I1-storytelling-domain-signoff.md`) explicitly asks that this kind of page state
  what the gate *did*, not adjectives of quality, so the added caveat cites the one already-public,
  gate-caught correction (#200, also documented on `/thesis-recheck`) rather than a generic
  disclaimer.
-->

<Hero compact eyebrow="Chapter 2 — The Revival" title="How it's organised — the multi-agent workflow" lede="How this project itself is run: a team of specialised AI agents, each with one narrow job, supervised by one human maintainer who is the only one who can move anything onto the published site." />

This page is for the audience curious about **how this project itself is run**: Gentriduck is
built and maintained largely by a team of specialised AI agents, supervised by one human
maintainer. If you want to know how the *data pipeline* works, see [how it's
built](/how-its-built); if you want the statistics themselves, see [methodology & data
sources](/methodology).

## The agent team

Each agent has one narrow job and works from a shared backlog on a public GitHub Project board:

| Agent | Job |
|---|---|
| **project manager** | Orchestrates the backlog, keeps the board in sync with reality, decides what gets built next. |
| **data engineer** ↔ **reviewer** | Implements dbt models and ingestion pipelines; an independent reviewer checks every change before it's accepted. Nobody grades their own homework. |
| **geo-data-scientist** + **gentrification-domain-expert** | A dual methodology gate — one checks the statistics and spatial methods, the other checks the urban-sociology and housing-policy framing. Both must record a documented `PASS` before anything touching the index's definition, weights, or spatial method can ship. |
| **web engineer** ↔ **reviewer** | Build and independently check the public site you're reading now. |
| **data analyst** | Turns the data into charts, captions, and narrative — including this page's neighbour. |
| **system architect** | Owns Architecture Decision Records; any new tool, library, or data source needs its sign-off before adoption. |

## The pipeline that ships a change

<script>
  const organisedSteps = [
    { icon: '🗂️', label: 'Project manager', note: 'picks the next task' },
    { icon: '🛠️', label: 'Coder', note: 'data-engineer / web-engineer implements', arrow: '→' },
    { icon: '🔍', label: 'Reviewer', note: 'checks — changes requested loop back', arrow: '↔' },
    { icon: '⚖️', label: 'Dual methodology gate', note: 'geo-data-scientist &amp; domain expert — both PASS, only for methodology-bearing changes', kind: 'gate', arrow: '→' },
    { icon: '🔀', label: 'PM self-integrates', note: 'onto <code>develop</code> (internal, not yet public)', arrow: '→' },
    { icon: '🧑', label: 'Human maintainer', note: 'weekly reviewed PR merges <code>develop</code> → <code>main</code>, by hand', kind: 'human', arrow: '→' }
  ];
</script>

<AgentPipeline steps={organisedSteps} />

That last step is the point: agents self-integrate finished work onto an internal branch
continuously, but the **published** site only ever advances through a pull request a human
reviews and merges — never a direct or automatic push. It's supervised autonomy, not a black box.

## What the human maintainer actually does

Not everything is delegated. The maintainer:

- **Approves every new tool, library, or data source** before it's adopted (an ADR is required first).
- **Is the escalation point** whenever the methodology gate comes back with "concerns" instead of a
  clean pass, or whenever an agent hits a genuinely ambiguous call it shouldn't decide alone.
- **Merges the weekly `develop → main` pull request by hand** — the one step that always requires a
  human to click "merge," reviewed the same as any other pull request.
- Sets the overall direction and scope — what this backlog covers, and what it deliberately doesn't.

## Why this is written down, not just claimed

Because the project is fully open, none of this is a claim you have to take on trust:

- Every **agent definition** (its exact instructions, tools, and rules) is public —
  [`.claude/agents/`](https://github.com/dhelweg/gentriduck/tree/main/.claude/agents).
- Every **Architecture Decision Record** explaining why a tool or method was adopted is public —
  [`docs/adr/`](https://github.com/dhelweg/gentriduck/tree/main/docs/adr).
- The **methodology gate's rules** — which files trigger it, and what "PASS" requires — are in the
  repository's [`CLAUDE.md`](https://github.com/dhelweg/gentriduck/blob/main/CLAUDE.md).
- The full commit history, including every reviewer verdict and sign-off document, is public in the
  [GitHub repository](https://github.com/dhelweg/gentriduck).

## Honest caveats

- **An enforced gate reduces errors; it does not eliminate them.** The gate is enforced (work does
  not merge with a verdict pending or in question — see `CLAUDE.md`'s methodology-gate rules), but
  "supervised" is not "infallible": on 2026-07-09 an area-code join bug was found in a live
  statistical result and corrected after publication (documented on the
  [thesis re-check page](/thesis-recheck), issue #200) — a concrete example of the gate's own
  after-the-fact review process catching and disclosing an error, not evidence the process is
  error-proof.
- **This page describes the intended workflow, not a claim that every task follows it perfectly.**
  Escalations, iteration loops, and the occasional documented exception are part of normal
  operation, not a deviation this page hides — see the repository's issue tracker and PR history
  for the actual, unfiltered record.
- Nothing on this page is a statistic about gentrification; for what the numbers themselves claim
  and don't claim, see [methodology & data sources](/methodology).

## Where next

- **[How it's built](/how-its-built)** — the data pipeline this workflow builds and ships (this
  page's sideways neighbour: same process, the pipeline side).
- **[About this project](/about)** — the short version of this same workflow, in the project's
  origin-story context.
- **[Methodology & data sources](/methodology)** — the statistics this workflow produces, and
  their own honest limits.
- **[`.claude/agents/`](https://github.com/dhelweg/gentriduck/tree/main/.claude/agents)** and
  **[`docs/adr/`](https://github.com/dhelweg/gentriduck/tree/main/docs/adr)** — the full mechanism,
  in the GitHub repository.

---

<FooterNav />
