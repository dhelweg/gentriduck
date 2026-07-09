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
  "🤖 You design AI systems" door on the home page. The pipeline diagram here is a text/markdown
  restatement of the same flow already sketched in pages/index.md's "flow" blockquote; a fully
  designed visual version is tracked separately as #151 (visual identity).
-->

# How it's organised — the multi-agent workflow

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

> **project manager** picks the next task →
> **coder** (data-engineer / web-engineer) implements ↔ **independent reviewer** checks
> (changes requested loop back to the coder) →
> *only for methodology-bearing changes:* **geo-data-scientist** AND
> **gentrification-domain-expert** each record a documented "PASS" verdict — not advisory,
> enforced →
> **project manager** self-integrates the reviewed, gated work onto `develop`
> (an internal integration branch — not yet public) →
> once a week, a **human-reviewed pull request** moves `develop` → `main`; the **human
> maintainer merges it by hand** — the only way `main` changes →
> the published site you're reading rebuilds from `main`

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

<sub>[Home](/) · [Methodology & data sources](/methodology) · [About this project](/about) · [GitHub repository](https://github.com/dhelweg/gentriduck)</sub>
