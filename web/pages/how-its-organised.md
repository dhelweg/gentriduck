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

  I21-j (#304) docs refresh: added the comms-strategist row (I10, #227; ADR-0021) to the agent
  table below -- the agent + comms-draft skill existed since #227 but this public roster hadn't
  been updated to list it, even though six posts (I11, #228) are already drafted and signed off.
  No other change -- the pipeline diagram and process description are unaffected (comms drafting
  is a separate publish-and-screen loop, not part of "the pipeline that ships a change" to the
  site itself).

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

  #368 (2026-11): brought in line with the current process. Adds the community-triage row
  (.claude/agents/community-triage.md, ADR-0020; screens and routes only), a deploy step to the
  pipeline and the release routine (ADR-0011; ADR-0012 Amendment C, 2026-11-02, #361/#369: the
  maintainer's merge is the decision to publish, the PM deploys from `main` after detecting it),
  and a section on how an analysis reaches the site: pre-registration -> domain review -> results
  -> geo-DS + domain sign-off -> page sign-off, with deviations disclosed as amendments
  (docs/methodology/354-355-hypothesis-suite-preregistration.md status block and Amendments 1-3;
  docs/methodology/371-matched-comparison-preregistration.md binding rule and Amendment 5; the
  354c/355c/371c page sign-offs). Process description only, no result sentence. #370 will add a
  subscription-tier section here later; not part of this change.
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
| **comms-strategist** | Turns already signed-off findings into draft social-media posts (LinkedIn, Bluesky/Mastodon) under a per-post sign-off gate — never posts, schedules, or holds credentials; every post is a manual act by the human maintainer. |
| **community-triage** | Screens ideas from the project's community voting board (GitHub Discussions) once they pass an upvote threshold, and either files them as a backlog issue or records why not. It routes; it never builds anything ([ADR-0020](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0020-community-contribution-governance-voting-board.md)). |

The same team and the same gates run both cities on the site, Berlin and Hamburg: a city is added
through its own data adapter and its own methodology sign-off, not a separate process.

## The pipeline that ships a change

<script>
  const organisedSteps = [
    { icon: '🗂️', label: 'Project manager', note: 'picks the next task' },
    { icon: '🛠️', label: 'Coder', note: 'data-engineer / web-engineer implements', arrow: '→' },
    { icon: '🔍', label: 'Reviewer', note: 'checks — changes requested loop back', arrow: '↔' },
    { icon: '⚖️', label: 'Dual methodology gate', note: 'geo-data-scientist &amp; domain expert — both PASS, only for methodology-bearing changes', kind: 'gate', arrow: '→' },
    { icon: '🔀', label: 'PM self-integrates', note: 'onto <code>develop</code> (internal, not yet public)', arrow: '→' },
    { icon: '🧑', label: 'Human maintainer', note: 'weekly reviewed PR merges <code>develop</code> → <code>main</code>, by hand', kind: 'human', arrow: '→' },
    { icon: '🚀', label: 'PM deploys', note: 'rebuilds from <code>main</code>, smoke-checks, publishes', arrow: '→' }
  ];
</script>

<AgentPipeline steps={organisedSteps} />

The human step is the point: agents self-integrate finished work onto an internal branch
continuously, but the **published** site only ever advances through a pull request a human
reviews and merges — never a direct or automatic push. It's supervised autonomy, not a black box.

## The release routine

Once a week the project manager opens one `develop → main` pull request. The maintainer reviews it
and merges it by hand in GitHub; agents cannot merge to `main` or push to it. **That merge is the
decision to publish.** The project manager notices the merge and then carries it out with one
command (`uv run poe release-deploy`):

- it rebuilds the site from `main`, or reuses an existing build only if that build was made from
  exactly the same tree as `main` and from the same data;
- it runs a smoke check on the build, and a failed check publishes nothing — the old site stays
  live and the maintainer is told;
- it deploys the static files and sends the maintainer a short "release live" note.

This is recorded in [ADR-0011](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0011-autonomous-merge-develop-branch.md)
(the branch model) and Amendment C of
[ADR-0012](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0012-serving-and-hosting-stack.md)
(the deploy).

## How an analysis gets onto the site

The statistical analyses behind pages such as [the 2018 thesis, re-checked](/thesis-recheck), its
[Hamburg counterpart](/hamburg/thesis-recheck) and [Berlin vs Hamburg, like for
like](/berlin-vs-hamburg) go through a stricter route than ordinary code:

1. **The design is written down first.** Before any result is computed, the geo-data-scientist
   writes a pre-registration: the data, the main test for each hypothesis, the rules for calling a
   result, and what the results must not be used to claim. The domain expert reviews this plan
   too, before the analysis runs.
2. **Changes are disclosed, never silent.** If the work has to deviate from the plan, the change is
   recorded as a numbered amendment, and an amendment made after the results were seen is marked
   as such. An undisclosed deviation is a serious review finding.
3. **Two independent sign-offs on the results.** The geo-data-scientist (statistics) and the domain
   expert (urban sociology and housing policy) each have to record a `PASS`. The domain sign-off
   also fixes the exact public wording and lists what must not be said.
4. **The page gets its own check.** The page that reports the results is reviewed again by both,
   against that binding wording, before it is integrated.

Each of these documents is public in the repository, linked from the pages that use them.

## What the human maintainer actually does

Not everything is delegated. The maintainer:

- **Approves every new tool, library, or data source** before it's adopted (an ADR is required first).
- **Is the escalation point** whenever the methodology gate comes back with "concerns" instead of a
  clean pass, or whenever an agent hits a genuinely ambiguous call it shouldn't decide alone.
- **Merges the weekly `develop → main` pull request by hand** — the one step that always requires a
  human to click "merge," reviewed the same as any other pull request. That merge decides what goes
  public; the deploy that follows only carries it out.
- **Decides when an analysis plan needs changing** — maintainer decisions on a pre-registration are
  recorded in the document itself.
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
