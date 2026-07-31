---
title: About this project
sidebar_position: 30
---

<!--
  I3 (#220): content revised in place per the ticket's hard constraint -- this file is never
  deleted or renamed and `/about`'s route does not change (externally linked, frozen). Re-platformed
  onto the shared `<Hero>`/`<ChapterLabel>`/`<AgentPipeline>`/`<FooterNav>` components (this page
  previously had a plain `# ` heading and a hand-copied `<sub>` footer line). Per
  docs/epic-i/storytelling-guide.md §2's explicit note that "nothing else builds toward or from"
  this page (review finding 5): the "How it's built" section below is trimmed from a full
  restatement of the agent-role table to a short summary + the shared pipeline diagram + an
  explicit link to `/how-its-organised` for the full breakdown (that page "already summarizes this
  page in miniature" per the guide -- this edit makes the relationship explicit rather than having
  both pages carry the full list independently). Added an explicit "Honest caveats" section (this
  page previously had none) and formalized the existing "See the work yourself" section into a
  labelled "Where next," per the I1 template (docs/epic-i/storytelling-guide.md §4). No fact is
  removed: the full agent-role table remains, just on `/how-its-organised` where the guide says it
  belongs; every claim on this page keeps its "who made this and can I trust it" purpose.
-->

<Hero compact eyebrow="Chapter 1 — The Question" title="About this project" lede="If you found this site and are wondering &quot;who or what made this, and can I trust it?&quot; — this page is for you." />

It's the story of the project, not of any one neighbourhood's numbers; for what the
statistics mean and where they come from, see [methodology & data sources](/methodology). For a
deeper look at the two halves of "how" specifically, see [how it's
built](/how-its-built) (the data pipeline) and [how it's
organised](/how-its-organised) (the multi-agent workflow) — this page is the short version of both.

## It started as a 2018 university thesis

Gentriduck revives a 2018 master's thesis written at Universität Hamburg, **"Measurement of
Gentrification in Berlin via Big Data Analytics"** ([original repo on
GitHub](https://github.com/dhelweg/masterthesis2018_gentrification)). That thesis measured
gentrification across Berlin's small statistical areas by combining OpenStreetMap points of
interest with population-register socio-economic data, built a gentrification index, and tested it
against a theoretical model of how neighbourhoods change. It ran on a now-dated stack — Hadoop,
Hive SQL, Java, R, Weka.

The original thesis repository is left untouched, as the historical record. Gentriduck is a
from-scratch rebuild of the same idea on a modern, free, and open stack (dbt + DuckDB), extended
with a full time-series of OpenStreetMap data back to 2008, open price/rent data, and — the part the
thesis never had — a public website. What started as "reproduce a thesis" has grown into an ongoing
public statistics project, Berlin first, Hamburg since (2026-07), with further cities addable as the
data model allows, without a rewrite. See the [methodology page](/methodology) for how the current index
differs from, and stays honest about, the 2018 original.

## How it's built: a supervised, multi-agent workflow

<ChapterLabel>Chapter 2 — The Revival</ChapterLabel>

Gentriduck is built and maintained largely by a team of specialised AI agents (running on
[Claude Code](https://claude.com/claude-code)), each with a narrow job, working from a shared
backlog on a GitHub Project board. A **project manager** agent orchestrates the work; a
**data engineer** and **web engineer** implement, each checked independently by their own
**reviewer** agent before anything is accepted — nobody grades their own homework; a
**geo-data-scientist** and a **gentrification-domain-expert** act as a dual methodology gate on
anything touching the index's definition, weights, spatial method, or normalization; and a
**data analyst** agent (the one that helped write this page) turns the data into charts and
narrative. The work flows through the same pipeline every time:

<AgentPipeline />

**This is not a fully autonomous, unsupervised system.** A human maintainer sits above all of this:
they approve every new tool, data source, or architectural decision; they are the escalation point
whenever a methodology gate comes back with "concerns" instead of a clean pass; and — critically —
the agents' day-to-day work lands on an internal integration branch, but it only ever reaches the
live, published version of this site through a **weekly pull request that the human maintainer
reviews and merges by hand**. Nothing reaches the public site without a person looking at it first.

The full agent-role table, the pipeline diagram above in more detail, and what the human maintainer
actually does day to day all live on **[how it's organised](/how-its-organised)** — this section is
the short version; that page is the full one.

## The tooling philosophy: free, open, local-first

A few rules constrain everything built here, and they're enforced, not aspirational:

- **Free and open only.** No paid tools, no proprietary or internal data sources — ever. Every data
  source behind this site is public and requires no signup: Berlin and Hamburg's official
  social-monitoring reports, the population register, OpenStreetMap, and official land-value/rent
  references. See [methodology & data sources](/methodology) for the full list.
- **Local-first.** The data warehouse is [DuckDB](https://duckdb.org/), a free, open-source, local
  analytical database — no cloud data platform required to build or run this project.
- **Every decision is written down.** New tools, data sources, or methodology changes require an
  **Architecture Decision Record (ADR)** — a short, public document explaining what was decided and
  why — before they're adopted. These ADRs live in the open in the project's repository, alongside
  the rest of the code, so anyone can see exactly why the project works the way it does, not just
  what it currently does.

## Honest caveats

This page tells the project's origin story; it makes no claim about any neighbourhood's numbers —
those claims, and their own honest limits, live on [methodology & data sources](/methodology).
Two things worth stating plainly here too:

- **Reproducing a 2018 result is a directional check, not a number-for-number replay.** Epic B (the
  thesis-revival phase) is explicitly a *directional* revival — does the 2018 thesis's finding still
  hold, broadly? — not an exercise in reproducing the original numbers exactly. See the
  [2018 thesis, re-checked](/thesis-recheck) for what that looks like in practice, hypothesis by
  hypothesis.
- **"Supervised" describes an enforced process, not a guarantee against every error.** The methodology
  gate and human-maintainer sign-off are enforced, not aspirational — but they reduce the rate of
  error, they do not eliminate it. See [how it's organised](/how-its-organised)'s own honest caveat
  for a concrete, disclosed example of the gate catching and correcting a mistake after publication.

## See the work yourself, and where next

Because this is a free and open project, there's nothing hidden behind the numbers on this site.
The full source code, the dbt models that compute every statistic, the agent definitions described
above, and the complete history of architecture decisions are all public:

**[github.com/dhelweg/gentriduck](https://github.com/dhelweg/gentriduck)**

- **[Methodology & data sources](/methodology)** — what the numbers mean, where they come from,
  and where they should not be trusted too far.
- **[How it's built](/how-its-built)** and **[how it's organised](/how-its-organised)** — the two
  "how" deep dives this page summarizes: the data pipeline, and the multi-agent workflow.
- **[The 2018 thesis, re-checked](/thesis-recheck)** — does the original finding still hold? The
  full hypothesis-by-hypothesis comparison.
- **[`docs/adr/`](https://github.com/dhelweg/gentriduck/tree/main/docs/adr)** and
  **[`.claude/agents/`](https://github.com/dhelweg/gentriduck/tree/main/.claude/agents)** — the
  project's architecture decisions and agent definitions, in the repository.

---

<FooterNav />

