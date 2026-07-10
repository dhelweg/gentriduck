---
title: Gentriduck — Berlin Gentrification Index
---

<!--
  I1 (#218) story-spine conversion: this is the exemplar page the storytelling guide
  (docs/epic-i/storytelling-guide.md) asks I1 to prove the shared template against --
  hero -> story -> evidence -> honest caveats -> where next (guide §4), with explicit chapter
  labels (guide §1's four-chapter arc) and the 5-audience "Pick your path" router (guide §5).
  The `.hero` and `.agent-pipeline` markup/CSS that used to be duplicated inline here and on
  other pages now live in web/components/Hero.svelte and web/components/AgentPipeline.svelte
  (Evidence auto-imports project components -- see those files' header comments); the footer nav
  now lives in web/components/FooterNav.svelte. No indicator/weight/method changes here (no
  methodology gate) -- all evidence queries below are unchanged from the previous revision.
  I3 (#220) converted every remaining page onto this same template/component set; see each page's
  own header comment for what changed there. This page's own audience-card markup was further
  re-platformed onto the shared `<LinkCard>`/`<LinkCards>` components in that same pass (see
  the "Pick your path" section below).
-->

<Hero
  eyebrow="A 2018 Berlin master's thesis, revived — built by a supervised team of AI agents"
  title="Gentriduck"
  lede="A live, public statistics project tracking gentrification pressure across Berlin's neighbourhoods, on a free, open, local-first data stack. Everything here runs on open, official data — Berlin's own social-monitoring reports, the population register, OpenStreetMap, and official land-value/rent references — and every figure describes a small area of a few thousand residents, never a person, household, or building."
>
  <a href="/how-its-organised" class="primary">How it's organised →</a>
  <a href="#the-finding" class="secondary">What we found →</a>
  <a href="/methodology" class="secondary">How we measure it →</a>
</Hero>

---

## Built by a team of AI agents — with a human at the wheel

<ChapterLabel>Chapter 2 — The Revival</ChapterLabel>

Gentriduck is unusual: the data pipeline, the models, and this website are built and maintained
largely by a **team of specialised AI agents** (running on
[Claude Code](https://claude.com/claude-code)), each with one narrow job, working a shared backlog.
Nobody grades their own homework, and nothing sensitive ships without a person looking at it.

The work flows through a deliberately adversarial pipeline:

<AgentPipeline />

That last step is the point: the agents self-integrate onto an internal branch, but the published
site only ever advances through a **weekly pull request a human reviews and merges**. It is
supervised autonomy, not a black box — and because the project is fully open, you can read every
agent definition, every architecture decision, and every line of SQL that produces a number here.

<Alert status="info">
  Curious how a multi-agent system builds this statistics site under an enforced methodology gate? The
  <a href="/about">about page</a> walks through the full workflow, the enforced "free & open only"
  rules, and the methodology gate — or read the agent definitions and Architecture Decision Records
  directly in the <a href="https://github.com/dhelweg/gentriduck">GitHub repository</a>.
</Alert>

---

## The finding

<ChapterLabel>Chapter 3 — The Evidence</ChapterLabel>

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
plain-language decoder on the [methodology page](/methodology). For the full Berlin deep-dive —
maps, per-neighbourhood profiles, time series, and the commercial-mix data — start at the
**[Berlin data hub](/berlin)**.

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

**What to notice:** most of the city sits in `stable-established` — Berlin is not one giant
gentrification wave. The neighbourhoods to watch are the smaller `pioneer-signal` and
`active-gentrification` bars: those are areas where status is currently deprived *and* the
official trend is moving fast, the two-part signature this project's typology is built to catch.
`improving-vulnerable` is deliberately ambiguous (see the [methodology page](/methodology)) —
rising status in an area that started out deprived reads as good news and displacement risk at
once.

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

**What to notice:** this table re-sorts itself every time the underlying MSS/EWR editions update —
it is not a fixed watch-list, it is whatever the latest official data currently flags. Areas that
combine a deprived `status_class` with a fast `dynamism_class` trend are the ones under the most
pressure right now; areas already `stable-established` rarely appear here even with a strong trend,
because they started from a position with less room to fall.

### Does this agree with what we already know?

Before trusting a headline like the one above, it is worth asking: does this index actually
recognise the Berlin neighbourhoods that housing researchers and the Senate's own monitoring
already agree are under gentrification pressure — or coasting along as stable, affluent areas?
The project runs a dedicated back-test against both kinds of independently sourced ground truth
(`docs/methodology/backtest.md`), and re-runs it whenever the index changes:

- **8 literature-documented gentrification hotspots** — Neukölln's Rollberg, Wartheplatz and
  Silbersteinstraße (the Reuterkiez/Schillerkiez area), Mitte's Koloniestraße and Soldiner Straße
  (Wedding/Gesundbrunnen), and Friedrichshain-Kreuzberg's Wassertorplatz and Prinzenstraße — drawn
  from Döring & Ulbricht (2016), Holm & Schulz (2016), and official MSS 2023 status classes.
  **All 8 of 8 (100% recall)** land in the index's top decile of gentrification-pressure status,
  well above the 50% pass bar.
- **6 stable, affluent outer-city PLRs** — Alt-Gatow, Wannsee, Nikolassee, Dahlem, and similar
  areas — used as a negative control. **All 6 of 6 (100% recall)** land in the bottom decile, where
  a stable area should sit.
- A third, independent cross-check compares the index's own status column against the raw MSS
  ordinal it is built from (Spearman rho = 1.00): the pipeline is not silently drifting from the
  official source it claims to encode.

In short: run the index today and it puts the Reuterkiez/Schillerkiez area's well-documented
gentrification hotspots — plus Wedding and Kreuzberg PLRs the housing-research literature and the
Senate's own monitoring flag the same way — exactly where those independent sources say they
belong, and it does not mistake Wannsee for a hotspot. That is the credibility check behind the
headline numbers on this page; the full methodology, thresholds, and PLR-by-PLR detail are in
[`docs/methodology/backtest.md`](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/backtest.md).

---

## Honest caveats

- A **negative** trend is the one this project reads as **higher** gentrification pressure; a
  **positive** trend means **lower** pressure. A **low** status class means **lower** deprivation
  (a wealthier area) — so "low" is not the same as "bad." The
  [methodology & data sources](/methodology) page is the full decoder;
  [ADR-0004](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md)
  is the technical spec.
- **"Improving" is not automatically good news.** Rising status is also the signature of
  gentrification — that is exactly why the `improving-vulnerable` stage above is deliberately
  ambiguous rather than a straightforward "good" result (see [methodology](/methodology) §3).
- Open data can observe socio-economic upgrading and demographic recomposition; **it cannot
  observe that a specific household was involuntarily displaced.** Every figure on this page
  describes an aggregate area of a few thousand residents, never a person, household, or building,
  and the project uses risk/pressure language throughout rather than a claim that displacement has
  occurred (full statement: [methodology](/methodology) §6).
- The commerce ↔ social-status relationship above is real but fragile — sensitive to which social
  measure and which period you use. [The 2018 thesis, re-checked](/thesis-recheck) shows that
  tension hypothesis by hypothesis rather than behind one headline number.

---

## Pick your path

<ChapterLabel>Chapter 4 — What it means for you</ChapterLabel>

Gentriduck speaks to five audiences. Start wherever you fit:

<!--
  I1 (#218): 5 cards per docs/epic-i/storytelling-guide.md §5's target order. Two of the five
  (policy/initiatives -> takeaways, open-data -> open-data) point to pages I5/I6 haven't built
  yet -- building placeholder routes for those pages is out of I1/I3's scope (that's I5/I6's
  job). Evidence's static build prerenders and crawls every <a href>, and fails the whole build
  on a 404 for an internal link (confirmed locally: `npm run build` hard-errors on a link to
  `/takeaways`) -- so, until those pages exist, these two cards omit `href` (LinkCard then renders
  a non-linking, dashed `.audience-card-planned` <div>, not an <a>), so the router is honestly 5
  cards wide without a dead link or a broken build. I3 (#220): re-platformed onto the shared
  `<LinkCard>`/`<LinkCards>` components (extracted from this page's own former inline markup/CSS,
  which `pages/berlin/index.md` had also hand-copied -- see those components' header comments);
  content and card order unchanged from I1. Swap each planned card to a real `href` once its page
  lands (I5, I6).
-->
<LinkCards>
  <LinkCard icon="🏛️" title="You work in housing policy or a local initiative" cta="Takeaways page — coming soon">
    Plain-language, honestly caveated takeaways on gentrification pressure — each with a
    "what the data shows" link and an explicit "what this can NOT tell you" boundary — plus the
    <a href="/berlin/maps">maps</a> and per-neighbourhood profiles behind them.
  </LinkCard>
  <LinkCard href="/methodology" icon="🏙️" title="You study cities &amp; gentrification" cta="Start with methodology →">
    What "gentrification pressure" means here and the theory behind the six-stage typology, the
    <a href="/thesis-recheck">2018 thesis re-checked</a> hypothesis by hypothesis, then the
    <a href="/berlin/maps">maps</a>, <a href="/berlin/area-detail">area detail</a>, and
    <a href="/berlin/time-series">time series</a>.
  </LinkCard>
  <LinkCard icon="🔓" title="You care about open data" cta="Open-data report — coming soon">
    What open data enabled here, the concrete friction encountered building on it, and
    standardization recommendations for data publishers — grounded in the same pipeline documented on
    <a href="/how-its-built">how it's built</a>.
  </LinkCard>
  <LinkCard href="/how-its-built" icon="⚙️" title="You build data pipelines" cta="Start with how it's built →">
    dbt + DuckDB, local-first, rebuilt from open sources with a full OpenStreetMap history back
    to 2008. The stack, the data sources, and a worked completeness-bias correction; every model,
    seed, and test lives in the
    <a href="https://github.com/dhelweg/gentriduck">GitHub repository</a>.
  </LinkCard>
  <LinkCard href="/how-its-organised" icon="🤖" title="You design AI systems" cta="Start with how it's organised →">
    A supervised multi-agent workflow with an enforced, adversarial methodology gate. The agent
    team, the pipeline that ships a change, then the
    <a href="https://github.com/dhelweg/gentriduck/tree/main/.claude/agents">agent definitions</a>
    and <a href="https://github.com/dhelweg/gentriduck/tree/main/docs/adr">ADRs</a>.
  </LinkCard>
</LinkCards>

---

<FooterNav />
