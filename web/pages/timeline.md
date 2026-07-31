---
title: Timeline — the project's evolution, 2018 → today
sidebar_position: 15
---

<!--
  NEW page (I4, #221 — Epic I public communication & storytelling). The temporal story of the
  *data* already exists (`/berlin/time-series`); this is the temporal story of the *project*
  itself: a 2018 thesis revived eight years later by a supervised multi-agent team on a free/open
  stack (docs/assessment/2026-07-10-storytelling-comms-review.md, finding 6).

  Per the I4 SPEC (docs/epic-i/tickets/I4-timeline-page.md): a CSS vertical timeline (the new
  `Timeline.svelte` component, web/components/), no new library (stays inside ADR-0012's stack).
  Milestone dates are curated from citable repo sources -- ADR dates, the engineering retrospective
  (docs/process/retrospective.md), CITATION.cff, issue close dates, and the 2018 golden-output
  file dates in `reference/goldens/` -- **never derived from `git log`** (history is squashed and
  its commit dates are wrong for this purpose). Each entry below cites its source in a trailing
  comment; the "Source" link on each card points to the same artifact.

  Epic B's finding wording quotes B6-methodology-signoff.md's own verdict, per the ticket's gate
  note ("the Epic B verdict wording must quote the signed-off narrative") rather than paraphrasing
  it independently.
-->

<Hero
  compact
  eyebrow="Chapter 1→2 — Origins &amp; the Revival"
  title="Timeline"
  lede="The project's evolution end to end: a 2018 master's thesis, revived in mid-2026 by a supervised team of AI agents, and grown into a public, multi-city statistics project. Every date below is cited to a repository artifact — never derived from git history, which is squashed and dated wrong for this purpose."
/>

<ChapterLabel>Chapters 1–2, laid end to end</ChapterLabel>

This page is the connective tissue between [about](/about) (the origin story) and
[how it's organised](/how-its-organised) (the process this timeline dates) — read it if you want
the whole story chronologically, rather than the current state (which is what the
[home page](/) gives you).

<script>
  const milestones = [
    {
      date: '2018-09-09',
      title: 'The original thesis',
      body: 'Dennis Helweg\'s master\'s thesis analyzes gentrification pressure across Berlin\'s ' +
        'neighbourhoods, built on Hadoop + Hive SQL + Java UDFs + R + Weka. Its golden output CSVs ' +
        '(the exact per-area results it published) are the file this revival is checked against.',
      href: '/thesis-recheck',
      hrefLabel: 'reference/goldens/ · thesis re-check page →'
    },
    {
      date: '2026-06-17',
      title: 'Revival inception',
      body: 'The repository, GitHub Project board, agent team, pre-commit quality gate, and dbt ' +
        'scaffold stand up on a modern, free, local-first stack (dbt + DuckDB + Python) — the ' +
        'first four ADRs (stack, OSM sourcing, Berlin geographies, city-agnostic data model) are ' +
        'accepted the same day.',
      href: 'https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0001-stack-and-monorepo-architecture.md',
      hrefLabel: 'ADR-0001 →'
    },
    {
      date: '2026-06-18',
      title: 'Epic B verdict: the thesis holds, directionally',
      body: 'The formal methodology sign-off for the revival\'s first milestone: "the methodology ' +
        'is sound enough to proceed" to fresh-data ingestion, with the index definition, class ' +
        'labelling, and known-area rankings faithfully transcribed from the thesis at the ' +
        'directional-baseline stage.',
      href: 'https://github.com/dhelweg/gentriduck/blob/main/docs/epic-b/B6-methodology-signoff.md',
      hrefLabel: 'B6 methodology sign-off →'
    },
    {
      date: '2026-06-19',
      title: 'The methodology remediation wave — what the gates caught',
      body: 'A PM + architect deep review finds construct-validity drift in the early index (POI ' +
        'predictors and the social-status outcome were entangled); 21 remediation tickets (#64–#84) ' +
        'are filed the same day, including the dual geo + domain-expert methodology gate this ' +
        'project still runs today, made mechanically binding so a `concerns` verdict blocks a merge.',
      href: 'https://github.com/dhelweg/gentriduck/blob/main/docs/assessment/2026-06-19-pm-architect-review.md',
      hrefLabel: '2026-06-19 PM + architect review →'
    },
    {
      date: '2026-06-29',
      title: 'Autonomous develop-branch integration',
      body: 'ADR-0011: the PM stops opening a pull request per feature and instead self-integrates ' +
        'reviewed work onto an internal <code>develop</code> branch continuously; the human gate ' +
        'moves to one <code>develop → main</code> pull request the maintainer merges by hand each week.',
      href: 'https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0011-autonomous-merge-develop-branch.md',
      hrefLabel: 'ADR-0011 →'
    },
    {
      date: '2026-07-05',
      title: 'Website soft-launch',
      body: 'The public statistics site goes live on GitHub Pages (a documented fallback host — ' +
        'the self-hosted duckdb-wasm assets exceed Cloudflare Pages\' 25-MiB/file limit), marked ' +
        '<code>noindex</code> until the Epic I story-revision wave lands and routes freeze.',
      href: 'https://github.com/dhelweg/gentriduck/issues/144',
      hrefLabel: 'issue #144 (closed 2026-07-05) →'
    },
    {
      date: '2026-07-09',
      title: 'Reproducible methodology whitepaper',
      body: 'A versioned, citable whitepaper documenting the governed index and its methodology is ' +
        'published, with its own geo and domain-expert sign-offs — the same dual-gate discipline ' +
        'applied at document, not just model, granularity.',
      href: 'https://github.com/dhelweg/gentriduck/blob/main/docs/whitepaper/whitepaper.qmd',
      hrefLabel: 'issue #82 (closed 2026-07-09) · whitepaper →'
    },
    {
      date: '2026-07-09',
      title: 'Hamburg: the second city',
      body: 'Real Hamburg data — OSM POI history, socio-economic indicators, Mietenspiegel rents — ' +
        'is ingested end to end onto the same city-agnostic models (<code>dim_city</code>/' +
        '<code>dim_area</code>, ADR-0005) built into the schema from day one; staged, unpublished, ' +
        'proving the adapter pattern before any second-city launch decision.',
      href: 'https://github.com/dhelweg/gentriduck/issues/125',
      hrefLabel: 'issue #125 (closed 2026-07-09) →'
    },
    {
      date: '2026-07-24',
      title: 'Site restructured to an area-centric, multi-city-ready IA',
      body: 'I21 (#284) consolidates every area-hierarchy page (Bezirk/PGR/BZR/Ortsteil/PLR) onto ' +
        'one canonical per-level template, and scaffolds the same shape fresh for Hamburg, including ' +
        'its <code>subarea_l1</code>/<code>subarea_l2</code> hierarchy crosswalk — with an explicit architect ' +
        'ruling (I21-a) that no Berlin route is renamed, so the frozen I2 route map stands. ' +
        'Sub-tickets #296–#302 landed 2026-07-23 through 2026-07-24; folding Hamburg\'s per-area ' +
        'statistics sections into the template (#303) was still open and blocked on a maintainer ' +
        'publish-scope decision at this point — not part of this milestone, resolved the same day ' +
        '(see next entry).',
      href: 'https://github.com/dhelweg/gentriduck/issues/302',
      hrefLabel: 'issue #302 (closed 2026-07-24), last of #296–#302 to land →'
    },
    {
      date: '2026-07-24',
      title: 'Hamburg\'s per-area statistics go live (mostly)',
      body: 'The maintainer\'s #303 publish-scope ruling splits "fold in Hamburg\'s statistics" into ' +
        'one admission-shaped ticket per mart: price/rent (#303, narrowed), commercial-mix/Offering ' +
        'Advantage (#312, needed its own OSM-completeness-bias re-fit), and status/trajectory (#314, ' +
        'wired onto the pages by #317). All four clear dual geo + domain sign-off and land the same ' +
        'day, replacing most ' +
        '<code>&lt;NotYetPublished&gt;</code> placeholders on the Hamburg area pages with real data. ' +
        'Only the demographics/change composite (#313) stays placeholder — Hamburg\'s EWR-equivalent ' +
        'has 3 indicators vs Berlin\'s 5, and how to present that honestly is still an open maintainer ' +
        'ruling.',
      href: 'https://github.com/dhelweg/gentriduck/issues/303',
      hrefLabel: 'issue #303 (closed 2026-07-24) →'
    },
    {
      date: '2026-07-30',
      title: 'Map granularity selector',
      body: 'Both cities\' <code>/maps</code> pages gain a Bezirk/PGR/Ortsteil (Berlin) and ' +
        'Stadtteil/district (Hamburg) rollup view alongside the original PLR/Gebiet grain — a ' +
        'population-weighted dominant-stage colouring with its own composition counterweight and ' +
        'small-sample flag, never a re-scored index at the coarser grain. Dual geo + domain ' +
        'sign-off, including a three-round domain re-review that caught and fixed a label-overreach ' +
        'defect before integration.',
      href: 'https://github.com/dhelweg/gentriduck/issues/310',
      hrefLabel: 'issue #310 (closed 2026-07-30) →'
    }
  ];

  import { base } from '$app/paths';

  let repoStats = null;
  onMount(async () => {
    const res = await fetch(`${base}/data/repo-stats.json`);
    repoStats = await res.json();
  });
</script>

<Timeline {milestones} />

<Alert status="info">
  This page will gain one more entry — <strong>going fully public</strong> (noindex removed) — once
  the <a href="/about">Epic I revision wave</a> finishes and the launch playbook runs.
</Alert>

## How the codebase itself grew

<!--
  I17 (#241), slice 1 of 3 -- repo-growth stats block only (agent-activity swimlanes and the
  curated maintainer-steerings thread are follow-up slices of the same ticket, tracked on #241).

  Numbers come from `web/static/data/repo-stats.json`, a committed snapshot produced by the
  deterministic, stdlib-only generator `web/scripts/gen-repo-stats.mjs` (regenerate with
  `npm run repo-stats` from `web/`; two runs on the same tree produce byte-identical JSON). This
  is a **current-state snapshot**, not a time series -- per the I4 squashed-history rule, this repo
  never derives dated series from `git log`, so there is deliberately no history here yet. Labelled
  "as of" the whitepaper's own snapshot framing, not a specific commit date.
-->

The project is dbt + DuckDB + Python + an Evidence static site, built by a supervised multi-agent
team rather than one engineer. A single current-state snapshot, not a history (see caveat above):

{#if repoStats}
<DataTable data={[
  { layer: 'transform/ (dbt)', files: repoStats.layers.transform?.files ?? 0, loc: repoStats.layers.transform?.loc ?? 0 },
  { layer: 'ingestion/ (Python)', files: repoStats.layers.ingestion?.files ?? 0, loc: repoStats.layers.ingestion?.loc ?? 0 },
  { layer: 'web/ (Evidence site)', files: repoStats.layers.web?.files ?? 0, loc: repoStats.layers.web?.loc ?? 0 },
  { layer: 'docs/ (ADRs, methodology, epics)', files: repoStats.layers.docs?.files ?? 0, loc: repoStats.layers.docs?.loc ?? 0 },
  { layer: 'analysis/ (methodology-gated scripts)', files: repoStats.layers.analysis?.files ?? 0, loc: repoStats.layers.analysis?.loc ?? 0 },
  { layer: 'ops/ (autonomous-run scripts)', files: repoStats.layers.ops?.files ?? 0, loc: repoStats.layers.ops?.loc ?? 0 },
  { layer: '.claude/ (agents + skills)', files: repoStats.layers['.claude']?.files ?? 0, loc: repoStats.layers['.claude']?.loc ?? 0 }
]}>
  <Column id=layer title="Layer"/>
  <Column id=files title="Files"/>
  <Column id=loc title="Lines"/>
</DataTable>

<ul>
  <li><strong>{repoStats.dbt.models}</strong> dbt models, <strong>{repoStats.dbt.tests}</strong> custom tests, <strong>{repoStats.dbt.seeds}</strong> seeds.</li>
  <li><strong>{repoStats.site.pages}</strong> site pages, <strong>{repoStats.site.components}</strong> shared Svelte components.</li>
  <li><strong>{repoStats.adrs}</strong> accepted ADRs, <strong>{repoStats.signoffs}</strong> methodology/domain sign-off documents on file.</li>
</ul>
{:else}
<p><em>Loading repo stats…</em></p>
{/if}

## Honest caveats

- **This is a curated selection, not an exhaustive changelog.** Dozens of smaller tickets sit
  between these entries; the full, unfiltered record is the repository's
  [issue tracker](https://github.com/dhelweg/gentriduck/issues?q=is%3Aissue) and
  [commit history](https://github.com/dhelweg/gentriduck/commits/main).
- **Dates are the date a decision or milestone was recorded** (an ADR's acceptance date, an issue's
  close date, a sign-off document's date) — not necessarily the date every line of related code was
  written, since work on a ticket can span more than one day.
- Nothing on this page is a statistic about gentrification; for what the numbers themselves claim
  and don't claim, see [methodology &amp; data sources](/methodology).

## Where next

- **[About this project](/about)** — the short version of the origin story.
- **[How it's organised](/how-its-organised)** — the multi-agent process this timeline dates.
- **[Methodology &amp; data sources](/methodology)** — the statistics this process produces.

---

<FooterNav />
