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
  "🤖 You design AI systems" door on the home page. The pipeline diagram below reuses the same
  `.agent-pipeline` visual component introduced on the home page (#151 visual identity) for
  consistent theming across pages.
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

<div class="agent-pipeline">
  <div class="pipe-step"><span class="pipe-icon">🗂️</span><b>Project manager</b><small>picks the next task</small></div>
  <div class="pipe-arrow">→</div>
  <div class="pipe-step"><span class="pipe-icon">🛠️</span><b>Coder</b><small>data-engineer / web-engineer implements</small></div>
  <div class="pipe-arrow">↔</div>
  <div class="pipe-step"><span class="pipe-icon">🔍</span><b>Reviewer</b><small>checks — changes requested loop back</small></div>
  <div class="pipe-arrow">→</div>
  <div class="pipe-step pipe-gate"><span class="pipe-icon">⚖️</span><b>Dual methodology gate</b><small>geo-data-scientist &amp; domain expert — both PASS, only for methodology-bearing changes</small></div>
  <div class="pipe-arrow">→</div>
  <div class="pipe-step"><span class="pipe-icon">🔀</span><b>PM self-integrates</b><small>onto <code>develop</code> (internal, not yet public)</small></div>
  <div class="pipe-arrow">→</div>
  <div class="pipe-step pipe-human"><span class="pipe-icon">🧑</span><b>Human maintainer</b><small>weekly reviewed PR merges <code>develop</code> → <code>main</code>, by hand</small></div>
</div>

<style>
.agent-pipeline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin: 1.1rem 0 1.4rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.06), rgba(194, 65, 12, 0.06));
  border: 1px solid rgba(37, 99, 235, 0.16);
}
.pipe-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 7rem;
  padding: 0.55rem 0.6rem;
  border-radius: 0.6rem;
  background: rgba(127, 127, 127, 0.06);
  border: 1px solid rgba(127, 127, 127, 0.18);
  font-size: 0.8rem;
}
.pipe-step b { font-size: 0.82rem; margin-top: 0.2rem; }
.pipe-step small { opacity: 0.75; font-size: 0.68rem; margin-top: 0.15rem; line-height: 1.25; }
.pipe-icon { font-size: 1.3rem; line-height: 1; }
.pipe-gate { border-color: #c2410c; background: rgba(194, 65, 12, 0.08); }
.pipe-human { border-color: #16a34a; background: rgba(22, 163, 74, 0.1); }
.pipe-arrow { font-size: 1.1rem; opacity: 0.55; padding: 0 0.05rem; }
@media (max-width: 640px) {
  .agent-pipeline { flex-direction: column; align-items: stretch; }
  .pipe-arrow { transform: rotate(90deg); align-self: center; }
}
</style>

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
