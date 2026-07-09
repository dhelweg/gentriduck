---
title: About this project
sidebar_position: 30
---

# About this project

If you found this site and are wondering "who or what made this, and can I trust it?" — this page
is for you. It's the story of the project, not of any one neighbourhood's numbers; for what the
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
public statistics project, Berlin first and other cities (Hamburg is next) added as the data model
allows, without a rewrite. See the [methodology page](/methodology) for how the current index
differs from, and stays honest about, the 2018 original.

## How it's built: a supervised, multi-agent workflow

Gentriduck is built and maintained largely by a team of specialised AI agents (running on
[Claude Code](https://claude.com/claude-code)), each with a narrow job, working from a shared
backlog on a GitHub Project board:

- A **project manager** agent orchestrates the work, keeps the board up to date, and decides what
  gets built next.
- A **data engineer** implements dbt models and ingestion pipelines; a separate **data engineer
  reviewer** agent checks that work independently before it's accepted — nobody grades their own
  homework.
- A **geo-data-scientist** and a **gentrification-domain-expert** act as a dual methodology gate:
  any change that touches the index definition, indicator weights, spatial methods, or normalization
  needs a documented `PASS` from *both* of them — one checking the statistics and spatial methods,
  the other checking that the result still means what it claims to mean in urban-sociology terms —
  before it can be merged into the project's integration branch. Work is not merged with a gate
  verdict pending or in question.
- A **web engineer** and **web engineer reviewer** pair build and check the public site you're
  reading now (built with [Evidence.dev](https://evidence.dev/), a free, open-source
  markdown-plus-SQL site generator).
- A **data analyst** agent (the one that helped write this page) turns the data into the actual
  charts, captions, and narrative on the site.

**This is not a fully autonomous, unsupervised system.** A human maintainer sits above all of this:
they approve every new tool, data source, or architectural decision; they are the escalation point
whenever a methodology gate comes back with "concerns" instead of a clean pass; and — critically —
the agents' day-to-day work lands on an internal integration branch, but it only ever reaches the
live, published version of this site through a **weekly pull request that the human maintainer
reviews and merges by hand**. Nothing reaches the public site without a person looking at it first.

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

## See the work yourself

Because this is a free and open project, there's nothing hidden behind the numbers on this site.
The full source code, the dbt models that compute every statistic, the agent definitions described
above, and the complete history of architecture decisions are all public:

**[github.com/dhelweg/gentriduck](https://github.com/dhelweg/gentriduck)**

Start with the [methodology & data sources](/methodology) page for what the numbers mean, or browse
the repository's `docs/adr/` folder for the project's architecture decisions and `.claude/agents/`
for the agent definitions described above.

---

<sub>[Home](/) · [Methodology & data sources](/methodology) · [About this project](/about) · [GitHub repository](https://github.com/dhelweg/gentriduck)</sub>

