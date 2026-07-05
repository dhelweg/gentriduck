---
title: Gentriduck — Berlin Gentrification Index
---

<!--
  PROTOTYPE landing redesign (narrative iteration N1/N3) — foregrounds the "how it's built"
  (AI-architecture) story per maintainer direction, then the finding, then routes to three
  audiences. Preserves the working SQL blocks from the previous index. The agent-workflow "flow"
  below is intentionally plain markdown; turning it into a real diagram + audience cards is the
  web-engineer's polish step. Nothing here changes any indicator/weight/method (no methodology gate).
-->

# Gentriduck

**A live, public statistics project tracking gentrification pressure across Berlin's
neighbourhoods — reviving a 2018 master's thesis on a free, open, local-first data stack, and
built and maintained by a supervised team of AI agents.**

Everything here runs on open, official data — Berlin's own social-monitoring reports, the
population register, OpenStreetMap, and official land-value/rent references — and every figure
describes a small area of a few thousand residents, never a person, household, or building.

<div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin:0.5rem 0 1.5rem 0;">
  <a href="/about"><b>How it's built →</b></a>
  <a href="#the-finding"><b>What we found →</b></a>
  <a href="/methodology"><b>How we measure it →</b></a>
</div>

---

## Built by a team of AI agents — with a human at the wheel

Gentriduck is unusual: the data pipeline, the models, and this website are built and maintained
largely by a **team of specialised AI agents** (running on
[Claude Code](https://claude.com/claude-code)), each with one narrow job, working a shared backlog.
Nobody grades their own homework, and nothing sensitive ships without a person looking at it.

The work flows through a deliberately adversarial pipeline:

> **Project-manager agent** picks the next task →
> **data-engineer** builds it ↔ an independent **reviewer** checks it →
> a **dual methodology gate** (a geo-data-scientist *and* a gentrification-domain-expert) must
> *both* record a `PASS` on anything touching the index →
> the **human maintainer** merges to the live site by hand, once a week.

That last step is the point: the agents self-integrate onto an internal branch, but the published
site only ever advances through a **weekly pull request a human reviews and merges**. It is
supervised autonomy, not a black box — and because the project is fully open, you can read every
agent definition, every architecture decision, and every line of SQL that produces a number here.

<Alert status="info">
  Curious how a multi-agent system builds a peer-review-grade statistics site? The
  <a href="/about">about page</a> walks through the full workflow, the enforced "free & open only"
  rules, and the methodology gate — or read the agent definitions and Architecture Decision Records
  directly in the <a href="https://github.com/dhelweg/gentriduck">GitHub repository</a>.
</Alert>

---

## The finding

**Does the 2018 thesis's result still hold in 2025? Partly — and that's the interesting part.**

The original thesis asked whether the churn of shops, cafés and restaurants in a Berlin
neighbourhood tracks its social change. Rebuilt on the *same* welfare-register data the thesis
used, the core result replicates cleanly: **rising neighbourhood status tends to pull in new
commerce, rather than the other way round** — the social cycle leads the commercial one. Swap in
Berlin's more robust *official* social monitor, though, and the signal weakens. The relationship is
real, but fragile — sensitive to which social measure you use and to the period you look at. We
show that tension openly rather than papering over it.

**→ [The 2018 thesis, re-checked hypothesis by hypothesis](/thesis-recheck)** — the full comparison
of what the thesis claimed, what it found, and what our rebuild finds today.

---

## Berlin right now

<Dropdown name="variant" title="Data" defaultValue="live_data">
  <DropdownOption value="live_data" valueLabel="Live data (latest MSS editions, 2013–2025)"/>
  <DropdownOption value="standard" valueLabel="2018 thesis reproduction (Dec 2016 snapshot)"/>
</Dropdown>

<!-- live_data only has PLR-grain rows (no Bezirksregion aggregate); standard/distance_weighted
     carry both. Pick the matching area_level in SQL rather than in JS templating (#138 G4). -->

```sql latest_period
select max(period_yyyymm) as period
from gentriduck_marts.gentrification_index
where variant = '${inputs.variant.value}'
```

```sql headline
select
    count(*) as areas_monitored,
    count(*) filter (where dynamism_class_bi = 'negative') as high_pressure_areas,
    count(*) filter (where dynamism_class_bi = 'positive') as low_pressure_areas
from gentriduck_marts.gentrification_index
where variant = '${inputs.variant.value}'
  and area_level = case when '${inputs.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${latest_period[0].period}'
```

<BigValue data={headline} value=areas_monitored title="Areas monitored"/>
<BigValue data={headline} value=high_pressure_areas title="High gentrification pressure" fmt="0"/>
<BigValue data={headline} value=low_pressure_areas title="Low gentrification pressure" fmt="0"/>

Figures reflect the most recent available reporting period: **{latest_period[0].period}**. A
*negative* trend is the one this project reads as **higher** gentrification pressure — full
plain-language decoder on the [methodology page](/methodology).

### Where each neighbourhood sits in the gentrification cycle

Instead of a single blended score, the live index places every neighbourhood into one **stage** of
the invasion–succession process — from `pre-gentrification`, through the `pioneer-signal` and
`active-gentrification` phases, to `consolidation-pressure`, plus `stable-established` for areas
outside the process and the deliberately ambiguous `improving-vulnerable` case. This staged
typology is the project's headline product; here is how Berlin's neighbourhoods distribute across
it today.

```sql stage_distribution
select
    status_class as stage,
    count(*) as area_count
from gentriduck_marts.gentrification_index
where variant = '${inputs.variant.value}'
  and area_level = case when '${inputs.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${latest_period[0].period}'
  and status_class is not null
group by all
order by area_count desc
```

<BarChart
    data={stage_distribution}
    title="Berlin neighbourhoods by gentrification stage, {latest_period[0].period}"
    x=stage
    y=area_count
    swapXY=true
    xAxisTitle="Number of areas"
    yAxisTitle="Stage"
/>

### Highest-pressure neighbourhoods

The ten planning areas currently showing the strongest gentrification-pressure signal (a
"negative" trend) for the latest period.

```sql top_pressure
select
    area_name,
    status_class,
    dynamism_class
from gentriduck_marts.gentrification_index
where variant = '${inputs.variant.value}'
  and area_level = case when '${inputs.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${latest_period[0].period}'
  and dynamism_class_bi = 'negative'
order by dynamism_index desc
limit 10
```

<DataTable data={top_pressure} rows=10>
    <Column id=area_name title="Area"/>
    <Column id=status_class title="Stage / classification"/>
    <Column id=dynamism_class title="Pressure trend"/>
</DataTable>

---

## Pick your path

Gentriduck is three projects in one. Start wherever you fit:

**🏙 You study cities & gentrification** — start with [the methodology & data sources](/methodology)
for what "gentrification pressure" means here and the theory behind the six-stage typology, see
[the 2018 thesis re-checked](/thesis-recheck) for the hypothesis-by-hypothesis reproduction, then
the [maps](/maps) and [area detail](/area-detail) to explore specific neighbourhoods, or the
[time-series view](/time-series) for how the city has moved over the years.

**⚙️ You build data pipelines** — the whole thing is dbt + DuckDB, local-first, rebuilt from open
sources with a full OpenStreetMap history back to 2008. The
[about page](/about) sketches the stack; the
[GitHub repository](https://github.com/dhelweg/gentriduck) has every model, seed, and test.

**🤖 You design AI systems** — this site is built by a supervised multi-agent workflow with an
enforced, adversarial methodology gate. See [how it's built](/about), then the
[agent definitions](https://github.com/dhelweg/gentriduck/tree/main/.claude/agents) and
[architecture decision records](https://github.com/dhelweg/gentriduck/tree/main/docs/adr) in the
repository.

<Alert status="info">
  <b>How to read the numbers on this site:</b> a <b>negative</b> trend means an area's official
  classification is moving toward <b>higher</b> gentrification pressure (fast upward change); a
  <b>positive</b> trend means <b>lower</b> pressure. A <b>low</b> status class means <b>lower</b>
  deprivation (a wealthier area) — so "low" is not the same as "bad." The
  <a href="/methodology">methodology & data sources</a> page is the full decoder;
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md">ADR-0004</a>
  is the technical spec.
</Alert>
