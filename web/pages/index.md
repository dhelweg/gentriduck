---
title: Gentriduck — Gentrification Index for Berlin & Hamburg
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
  I4 (#221) added the `/timeline` page and links to it from here (Chapter 2's Alert, and the
  "You design AI systems" audience card) -- per the ticket's "linked from the home page and footer
  nav" acceptance criterion.
  I21-j (#304) docs/copy pass: now that Hamburg has a live `/hamburg` hub (H3/#237, published
  2026-07-22) and I21 (#284) has consolidated the area-hierarchy template for both cities, the
  title/hero framing was Berlin-only and Hamburg was introduced only two-thirds down the page --
  a light copy touch (frontmatter title, hero lede) makes the framing city-aware up front,
  without touching the live_data/city_code='BER'-scoped queries below, which stay Berlin-only by
  design (methodology §6's no-pooled-cross-city-comparison rule). No SQL/frontmatter structure
  changed.
  #354 phase C (2026-11): the thesis summary paragraph and the commerce <-> status caveat now follow
  the pre-registered hypothesis suite (docs/epic-e/E1b-berlin-hypothesis-suite-findings.md, wording
  bound by docs/epic-e/354-domain-signoff.md §4-§5): H3b "status first" is not reproduced in either
  era, H1/H1b hold, fast food is a *share* of the gastronomy mix (never outlet counts/density). Copy
  only; no SQL changed.
  #358 (docs/epic-g/358-spec.md §3, §5; Revision 1 incl. geo-DS C4): the "Highest-pressure
  neighbourhoods" top-10 (`top_pressure`, ordered by dynamism_index) is deleted, not replaced by
  another named-area ranking. The two Dynamik-based BigValues are replaced by three status-trend
  counts ("Status improving / stable / worsening") from gentrification_index.status_trend,
  variant = 'live_data' only, at each city's own latest edition, shown PER CITY (Berlin in the
  Berlin section, Hamburg in the Hamburg paragraph) and never summed across cities (2- vs 3-year
  windows, different indicators). They ignore the Data selector: status_trend is NULL for the
  thesis variants by design (spec §2, C3). The stage chart reads the dbt stage_label (falls back
  to status_class only for the thesis variant, which carries no stage) in cycle order; the trend
  legend is <StatusTrendLegend>.
-->

<Hero
  eyebrow="A 2018 Berlin master's thesis, revived — built by a supervised team of AI agents"
  title="Gentriduck"
  lede="A live, public statistics project tracking signs of gentrification across neighbourhoods in Berlin — and, since 2026, Hamburg — on a free, open, local-first data stack. Everything here runs on open, official data — each city's own social-monitoring reports, population register, OpenStreetMap, and official land-value/rent references — and every figure describes a small area of a few thousand residents, never a person, household, or building."
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
  rules, and the methodology gate — the <a href="/timeline">project timeline</a> lays out every
  milestone, dated and source-cited — or read the agent definitions and Architecture Decision Records
  directly in the <a href="https://github.com/dhelweg/gentriduck">GitHub repository</a>.
</Alert>

---

## The finding

<ChapterLabel>Chapter 3 — The Evidence</ChapterLabel>

**Does the 2018 thesis's result still hold in 2025? Partly — and that's the interesting part.**

The original thesis asked whether the churn of shops, cafés and restaurants in a Berlin
neighbourhood tracks its social change. Re-tested in 2026 with a design fixed in advance, on both
the thesis's own era (2013–2019) and 2019–2025, two of its findings hold: an area's social status is
linked to its local business mix, modestly, and **fast food makes up a larger share of the
gastronomy mix where officially measured disadvantage is higher**. Its tentative timing finding, that
a fall in disadvantage comes before commercial change, is not reproduced: we find no detectable
ordering between commercial change and change in officially measured disadvantage, in either
direction. We show where the thesis holds and where it does not, openly, rather than papering
over it.

**→ [The 2018 thesis, re-checked hypothesis by hypothesis](/thesis-recheck)** — the full comparison
of what the thesis claimed, what it found, and what our rebuild finds today.

---

## Berlin right now

<Dropdown name="variant" title="Data" defaultValue="live_data">
  <DropdownOption value="live_data" valueLabel="Live data (latest MSS editions, 2013–2025)"/>
  <DropdownOption value="standard" valueLabel="2018 thesis reproduction (Dec 2016 snapshot)"/>
</Dropdown>

<!-- live_data only has PLR-grain rows (no Bezirksregion aggregate); standard/distance_weighted
     carry both. Pick the matching area_level in SQL rather than in JS templating (#138 G4).

     H3 (#237) audit: city_code = 'BER' added here explicitly. This section is Berlin-only ("Berlin
     right now" / area_level = 'plr' below already excludes Hamburg's 'subarea_l2' rows in
     practice), but this query itself had no city_code filter and would silently pool Berlin's and
     Hamburg's live_data max(period_yyyymm) once gentrification_index carried both (H3 widened its
     city_code accepted_values to ["BER","HH"]). Today both happen to share the same latest period
     (202512), so this was not yet visibly wrong, but the two cities' editions are NOT guaranteed to
     stay in lockstep (Berlin biennial vs. Hamburg annual cadence, methodology §6) -- an unfiltered
     max() here would otherwise silently apply the WRONG period to the Berlin-only headline query
     below once they diverge. Explicit city_code scoping, not a cross-city comparison. -->

```sql latest_period
select max(period_yyyymm) as period
from gentriduck_marts.gentrification_index
where variant = '${inputs.variant.value}' and city_code = 'BER'
```

```sql headline
select
    count(*) as areas_monitored
from gentriduck_marts.gentrification_index
where variant = '${inputs.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${inputs.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${latest_period[0].period}'
```

```sql trend_ber
-- #358 (spec §3, C4): Berlin's official status-trend counts -- live_data only (status_trend is
-- NULL for the thesis variants), Berlin's own latest MSS edition, never pooled with Hamburg.
select
    max(period_yyyymm) as period,
    count(*) filter (where status_trend = 'Improving') as n_improving,
    count(*) filter (where status_trend = 'Stable') as n_stable,
    count(*) filter (where status_trend = 'Worsening') as n_worsening
from gentriduck_marts.gentrification_index
where variant = 'live_data' and city_code = 'BER' and area_level = 'plr'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and city_code = 'BER' and area_level = 'plr'
  )
```

<BigValue data={headline} value=areas_monitored title="Areas monitored"/>

Figures reflect the most recent available reporting period: **{latest_period[0].period}**.

**Official status trend, Berlin** (live data, MSS edition {trend_ber[0]?.period ?? '—'}; shown
whichever data option is selected above, since only the live data carries it):

<BigValue data={trend_ber} value=n_improving title="Status improving" fmt="0"/>
<BigValue data={trend_ber} value=n_stable title="Status stable" fmt="0"/>
<BigValue data={trend_ber} value=n_worsening title="Status worsening" fmt="0"/>

<StatusTrendLegend />

Full plain-language decoder on the [methodology page](/methodology). For the full Berlin deep-dive —
maps, per-neighbourhood profiles, time series, and the commercial-mix data — start at the
**[Berlin data hub](/berlin)**.

<!-- H3 (#237): the section above is Berlin-only by design (its queries are scoped to
     city_code='BER'). Hamburg is a real second city on this site, not folded into the figures
     above — see its own data hub, never a pooled/merged headline (methodology §6's structural
     rule against pooled cross-city comparison). -->
Gentriduck now also tracks **Hamburg** — admitted 2026-07-18 after its own methodology gate, and
live since with the same kinds of views as Berlin: maps, a time series, a district browse,
per-area profiles, and a POI map. It is a narrower dataset than Berlin's, honestly scoped on its
own page: the **[Hamburg data hub](/hamburg)**. To see the 2018 thesis's hypotheses tested in both
cities on matched areas and shared indicators, see
**[Berlin vs Hamburg, like for like](/berlin-vs-hamburg)**.

```sql trend_hh
-- #358 (spec §3, C4): Hamburg's official status-trend counts -- live_data only, Hamburg's own
-- latest Sozialmonitoring edition, kept separate from Berlin's (3-year window, other indicators).
select
    max(period_yyyymm) as period,
    count(*) filter (where status_trend = 'Improving') as n_improving,
    count(*) filter (where status_trend = 'Stable') as n_stable,
    count(*) filter (where status_trend = 'Worsening') as n_worsening
from gentriduck_marts.gentrification_index
where variant = 'live_data' and city_code = 'HH' and area_level = 'subarea_l2'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and city_code = 'HH' and area_level = 'subarea_l2'
  )
```

**Official status trend, Hamburg** (statistische Gebiete, Sozialmonitoring edition
{trend_hh[0]?.period ?? '—'}). Hamburg's trend covers 3 years and a different indicator set, so
these counts are not comparable with Berlin's and are never added to them:

<BigValue data={trend_hh} value=n_improving title="Status improving" fmt="0"/>
<BigValue data={trend_hh} value=n_stable title="Status stable" fmt="0"/>
<BigValue data={trend_hh} value=n_worsening title="Status worsening" fmt="0"/>

### Where each neighbourhood sits in the gentrification cycle

Instead of a single blended score, the live index places every neighbourhood into one **stage** of
the invasion–succession process — from 1 · Pre-gentrification through 3 · Pioneer signal and
4 · Active gentrification to 5 · Consolidation, plus 6 · Stable / established and the deliberately
ambiguous 2 · Improving from very low status. This staged
typology is the project's headline product; here is how Berlin's neighbourhoods distribute across
it today.

```sql stage_distribution
-- #358: live_data reads the dbt stage_label in cycle order (spec §1). The thesis variant carries
-- no stage (stage_label NULL), so it keeps showing its own status_class as before.
select
    coalesce(stage_label, status_class) as stage,
    min(stage_number) as stage_number,
    count(*) as area_count
from gentriduck_marts.gentrification_index
where variant = '${inputs.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${inputs.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${latest_period[0].period}'
  and status_class is not null
group by 1
order by stage_number nulls last, stage
```

<BarChart
    data={stage_distribution}
    title="Berlin neighbourhoods by gentrification stage, {latest_period[0].period}"
    x=stage
    y=area_count
    swapXY=true
    sort=false
    chartAreaHeight=300 echartsOptions={{ yAxis: { axisLabel: { width: 130, overflow: 'break', interval: 0, hideOverlap: false } }, grid: { left: 16, containLabel: true } }}
    xAxisTitle="Number of areas"
    yAxisTitle="Stage"
/>

<StageNumberLegend />

**What to notice:** most of the city sits in 6 · Stable / established — Berlin is not one giant
gentrification wave. The smaller 3 · Pioneer signal and 4 · Active gentrification bars are areas
whose status is low or middle *and* whose official trend is improving relative to the city, the two-part signature
this project's typology is built to pick up.
2 · Improving from very low status is deliberately ambiguous (see the [methodology page](/methodology)) —
rising status in an area that started out deprived reads as good news and displacement risk at
once.

### Does this agree with what we already know?

Before trusting a headline like the one above, it is worth asking: does this index recognise
the Berlin neighbourhoods that housing researchers describe as gentrifying — or as
stable, affluent areas? The project runs a back-test whenever the index changes
(`docs/methodology/backtest.md`). It is worth reading for what it is, and what it is not:

- **Pipeline-integrity checks, not validation.** The index's status column *is* the official MSS
  status class, so comparing the two gives Spearman rho = 1.00 by construction. That check catches
  pipeline breakage (a vintage mismatch, a flipped sign); it says nothing about whether the index
  measures gentrification.
- **Label consistency.** 8 literature-documented gentrification hotspots — Neukölln's Rollberg,
  Wartheplatz and Silbersteinstraße (the Reuterkiez/Schillerkiez area), Mitte's Koloniestraße and
  Soldiner Straße (Wedding/Gesundbrunnen), and Friedrichshain-Kreuzberg's Wassertorplatz and
  Prinzenstraße — all land in the most-deprived MSS status band, and 6 stable, affluent outer-city
  PLRs (Alt-Gatow, Wannsee, Nikolassee, Dahlem and similar) all land in the least-deprived band. But
  2 of the 8 hotspot labels and all 6 stable-area labels were themselves taken from MSS status
  classes, and because the status column takes only four values, the "top decile" they are scored
  against actually covers 17% of PLRs. These recalls are far easier than they look.
- **The one partially independent check.** Areas the index places in an upgrading stage are more
  often under Milieuschutz (social preservation) designation, which the districts decide from their
  own studies of upgrading and displacement risk: 57% against 42% for other areas (odds ratio
  1.84, interval 1.02–3.41). The exact test just misses significance (p = 0.0525), so this is weak
  support. It is only partly independent: the designation studies use some of the same social
  indicators, and district policy varies a lot.

In short: the index is internally consistent, it does not mistake Wannsee for a hotspot, and the one
external check points weakly in the expected direction. That is not proof that it measures
gentrification. The full methodology, thresholds, and PLR-by-PLR detail are in
[`docs/methodology/backtest.md`](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/backtest.md).

---

## Honest caveats

- **Status trend** is the city's own official change class (Berlin: MSS Dynamik over 2 years;
  Hamburg: Sozialmonitoring Dynamik over 3 years). It says whether an area's social-status
  indicators **improved**, stayed **stable** or **worsened** relative to the city as a whole. A
  **low** status class means **lower** deprivation
  (a wealthier area) — so "low" is not the same as "bad." The
  [methodology & data sources](/methodology) page is the full decoder;
  [ADR-0004](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md)
  is the technical spec.
- **"Improving" is not automatically good news.** Rising status is also the signature of
  gentrification — that is exactly why the 2 · Improving from very low status stage above is deliberately
  ambiguous rather than a straightforward "good" result (see [methodology](/methodology) §3).
- Open data can observe socio-economic upgrading and demographic recomposition; **it cannot
  observe that a specific household was involuntarily displaced.** Every figure on this page
  describes an aggregate area of a few thousand residents, never a person, household, or building,
  and the project uses risk and signal language throughout rather than a claim that displacement has
  occurred (full statement: [methodology](/methodology) §6).
- The commerce ↔ social-status relationship above is an association, and a modest one: the local
  business mix goes with an area's social status, but we find no detectable ordering between
  commercial change and change in officially measured disadvantage.
  [The 2018 thesis, re-checked](/thesis-recheck) shows this hypothesis by hypothesis rather than
  behind one headline number.

---

## Pick your path

<ChapterLabel>Chapter 4 — What it means for you</ChapterLabel>

Gentriduck speaks to five audiences. Start wherever you fit:

<!--
  I1 (#218): 5 cards per docs/epic-i/storytelling-guide.md §5's target order. Two of the five
  (policy/initiatives -> takeaways, open-data -> open-data) originally pointed to pages I5/I6
  hadn't built yet -- building placeholder routes for those pages was out of I1/I3's scope.
  Evidence's static build prerenders and crawls every <a href>, and fails the whole build on a
  404 for an internal link -- so, until each page existed, its card omitted `href` (LinkCard then
  renders a non-linking, dashed `.audience-card-planned` <div>, not an <a>). I3 (#220):
  re-platformed onto the shared `<LinkCard>`/`<LinkCards>` components (extracted from this page's
  own former inline markup/CSS, which `pages/berlin/index.md` had also hand-copied -- see those
  components' header comments); content and card order unchanged from I1. I5 (#222): `/takeaways`
  landed -- swapped the policy/initiatives card to a real `href` per this comment's own note ("swap
  each planned card to a real href once its page lands"); open-data card still planned (I6). I6
  (#223): `/open-data` landed -- swapped the open-data card to a real `href` too; all five cards
  now link live pages.
-->
<LinkCards>
  <LinkCard href="/takeaways" icon="🏛️" title="You work in housing policy or a local initiative" cta="Start with takeaways →">
    Plain-language, honestly caveated takeaways on gentrification signals — each with a
    "what the data shows" link and an explicit "what this can NOT tell you" boundary — plus the
    <a href="/berlin/maps">maps</a> and per-neighbourhood profiles behind them.
  </LinkCard>
  <LinkCard href="/methodology" icon="🏙️" title="You study cities &amp; gentrification" cta="Start with methodology →">
    What the gentrification stages mean here and the theory behind the six-stage typology, the
    <a href="/thesis-recheck">2018 thesis re-checked</a> hypothesis by hypothesis, then the
    <a href="/berlin/maps">maps</a>, <a href="/berlin/area-detail">area detail</a>, and
    <a href="/berlin/time-series">time series</a>.
  </LinkCard>
  <LinkCard href="/open-data" icon="🔓" title="You care about open data" cta="Start with the open-data report →">
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
    team, the pipeline that ships a change, the <a href="/timeline">project timeline</a> from
    thesis to today, then the
    <a href="https://github.com/dhelweg/gentriduck/tree/main/.claude/agents">agent definitions</a>
    and <a href="https://github.com/dhelweg/gentriduck/tree/main/docs/adr">ADRs</a>.
  </LinkCard>
</LinkCards>

---

<FooterNav />
