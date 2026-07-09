---
title: Gentriduck — Berlin Gentrification Index
---

<!--
  Landing redesign (narrative iteration N1/N3/N5) — foregrounds the "how it's built"
  (AI-architecture) story per maintainer direction, then the finding, then routes to three
  audiences. Preserves the working SQL blocks from the previous index. #151 (visual identity)
  turned the agent-workflow flow into the `.agent-pipeline` diagram, "Pick your path" into the
  `.audience-cards` grid, and added the `.hero` treatment below — nothing here changes any
  indicator/weight/method (no methodology gate).
-->

<div class="hero">
  <div class="hero-eyebrow">A 2018 Berlin master's thesis, revived — built by a supervised team of AI agents</div>
  <h1>Gentriduck</h1>
  <p class="hero-lede">A live, public statistics project tracking gentrification pressure across
  Berlin's neighbourhoods, on a free, open, local-first data stack. Everything here runs on open,
  official data — Berlin's own social-monitoring reports, the population register, OpenStreetMap,
  and official land-value/rent references — and every figure describes a small area of a few
  thousand residents, never a person, household, or building.</p>
  <div class="hero-links">
    <a href="/how-its-organised" class="primary">How it's organised →</a>
    <a href="#the-finding" class="secondary">What we found →</a>
    <a href="/methodology" class="secondary">How we measure it →</a>
  </div>
</div>


---

## Built by a team of AI agents — with a human at the wheel

Gentriduck is unusual: the data pipeline, the models, and this website are built and maintained
largely by a **team of specialised AI agents** (running on
[Claude Code](https://claude.com/claude-code)), each with one narrow job, working a shared backlog.
Nobody grades their own homework, and nothing sensitive ships without a person looking at it.

The work flows through a deliberately adversarial pipeline:

<div class="agent-pipeline">
  <div class="pipe-step"><span class="pipe-icon">🗂️</span><b>Project manager</b><small>picks the next task</small></div>
  <div class="pipe-arrow">→</div>
  <div class="pipe-step"><span class="pipe-icon">🛠️</span><b>Data engineer</b><small>builds it</small></div>
  <div class="pipe-arrow">↔</div>
  <div class="pipe-step"><span class="pipe-icon">🔍</span><b>Reviewer</b><small>independently checks</small></div>
  <div class="pipe-arrow">→</div>
  <div class="pipe-step pipe-gate"><span class="pipe-icon">⚖️</span><b>Dual methodology gate</b><small>geo-data-scientist &amp; domain expert — both must PASS</small></div>
  <div class="pipe-arrow">→</div>
  <div class="pipe-step"><span class="pipe-icon">🔀</span><b>PM self-integrates</b><small>onto <code>develop</code></small></div>
  <div class="pipe-arrow">→</div>
  <div class="pipe-step pipe-human"><span class="pipe-icon">🧑</span><b>Human maintainer</b><small>merges to the live site — once a week, by hand</small></div>
</div>


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

<div class="audience-cards">
  <a href="/methodology" class="audience-card">
    <div class="audience-icon">🏙️</div>
    <h3>You study cities &amp; gentrification</h3>
    <p>What "gentrification pressure" means here and the theory behind the six-stage typology, the
    <a href="/thesis-recheck">2018 thesis re-checked</a> hypothesis by hypothesis, then the
    <a href="/maps">maps</a>, <a href="/area-detail">area detail</a>, and
    <a href="/time-series">time series</a>.</p>
    <span class="audience-cta">Start with methodology →</span>
  </a>
  <a href="/how-its-built" class="audience-card">
    <div class="audience-icon">⚙️</div>
    <h3>You build data pipelines</h3>
    <p>dbt + DuckDB, local-first, rebuilt from open sources with a full OpenStreetMap history back
    to 2008. The stack, the data sources, and a worked completeness-bias correction; every model,
    seed, and test lives in the
    <a href="https://github.com/dhelweg/gentriduck">GitHub repository</a>.</p>
    <span class="audience-cta">Start with how it's built →</span>
  </a>
  <a href="/how-its-organised" class="audience-card">
    <div class="audience-icon">🤖</div>
    <h3>You design AI systems</h3>
    <p>A supervised multi-agent workflow with an enforced, adversarial methodology gate. The agent
    team, the pipeline that ships a change, then the
    <a href="https://github.com/dhelweg/gentriduck/tree/main/.claude/agents">agent definitions</a>
    and <a href="https://github.com/dhelweg/gentriduck/tree/main/docs/adr">ADRs</a>.</p>
    <span class="audience-cta">Start with how it's organised →</span>
  </a>
</div>


<Alert status="info">
  <b>How to read the numbers on this site:</b> a <b>negative</b> trend means an area's official
  classification is moving toward <b>higher</b> gentrification pressure (fast upward change); a
  <b>positive</b> trend means <b>lower</b> pressure. A <b>low</b> status class means <b>lower</b>
  deprivation (a wealthier area) — so "low" is not the same as "bad." The
  <a href="/methodology">methodology & data sources</a> page is the full decoder;
  <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md">ADR-0004</a>
  is the technical spec.
</Alert>

---

<sub>[Home](/) · [Methodology & data sources](/methodology) · [About this project](/about) · [GitHub repository](https://github.com/dhelweg/gentriduck)</sub>

<style>
.hero {
  margin: -0.5rem -0.25rem 1.75rem;
  padding: 2.1rem 1.6rem;
  border-radius: 1rem;
  background:
    radial-gradient(circle at 12% 18%, rgba(37, 99, 235, 0.18), transparent 55%),
    radial-gradient(circle at 88% 82%, rgba(194, 65, 12, 0.15), transparent 55%),
    rgba(127, 127, 127, 0.04);
  border: 1px solid rgba(127, 127, 127, 0.16);
}
.hero-eyebrow {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.5rem;
}
.hero h1 { margin: 0 0 0.65rem 0; font-size: 2.5rem; line-height: 1.1; }
.hero-lede { max-width: 46rem; font-size: 1.02rem; line-height: 1.55; opacity: 0.92; margin: 0 0 1.1rem 0; }
.hero-links a {
  display: inline-block;
  margin: 0 0.55rem 0.4rem 0;
  padding: 0.45rem 0.85rem;
  border-radius: 0.5rem;
  text-decoration: none !important;
  font-weight: 600;
  font-size: 0.85rem;
}
.hero-links a.primary { background: #2563eb; color: #fff !important; }
.hero-links a.secondary { background: transparent; border: 1px solid #2563eb; color: #2563eb !important; }
.hero-links a.primary:hover { background: #1d4ed8; }
.hero-links a.secondary:hover { background: rgba(37, 99, 235, 0.08); }
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
.audience-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
  margin: 1.1rem 0 1.5rem;
}
.audience-card {
  display: block;
  text-decoration: none !important;
  color: inherit;
  padding: 1.15rem 1.15rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(127, 127, 127, 0.25);
  background: rgba(127, 127, 127, 0.04);
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}
.audience-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: #2563eb;
}
.audience-icon { font-size: 1.7rem; margin-bottom: 0.4rem; }
.audience-card h3 { margin: 0 0 0.4rem 0; font-size: 1rem; }
.audience-card p { margin: 0 0 0.7rem 0; font-size: 0.85rem; opacity: 0.85; line-height: 1.4; }
.audience-card p a { text-decoration: underline; }
.audience-cta { font-size: 0.82rem; font-weight: 700; color: #2563eb; }
</style>
