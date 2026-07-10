# Gentriduck storytelling guide — the story spine

**Ticket:** I1 (#218). **Author:** data-analyst. **Status:** content spine for the web-engineer to
build the shared Evidence components on top of (I1 scope is content only — no `web/components/`
or page edits happen in this ticket).

**Gate:** this document changes how findings are framed for the public, so it is
methodology-bearing per the I1 SPEC. It needs a `gentrification-domain-expert`
`I1-*-domain-signoff.md` with `Verdict: PASS` before I3/I5/I14 build on it (see CLAUDE.md R-C1).
That sign-off is a separate step, not produced here.

**Grounding.** Nothing below invents a finding. Every claim, number, and quoted register example
is copied or closely paraphrased from what is already live in `web/pages/**`, or is a direct
citation of `docs/assessment/2026-07-10-storytelling-comms-review.md`,
`docs/epic-g/O4-milestone-B-narrative.md`, and `docs/PROJECT_PLAN.md`'s O3/O4 outputs. Where I
describe a page that doesn't exist yet (I4/I5/I6), I mark it **planned** and scope its content to
what the corresponding SPEC ticket already commits to — I do not pre-write findings for pages that
don't exist.

---

## 0. How to use this guide

This is the spine every page revision in Epic I (I2, I3, I4, I5, I6, I14, I16) revises *toward*.
It answers four questions for any page: which chapter of the one story is this, what goes in each
of its five template sections, what tone does it use, and who is it for — where do they come from,
where do they go next. The web-engineer builds the shared `web/components/` (hero, agent-pipeline,
footer nav, Evidence-supported "Evidence" chart/caveat wrappers) against §4 below; page-by-page
rewrites in I3 (and the new pages in I4/I5/I6) use §2 and §4 together.

**A forward-compatibility note.** I2 will move the eight Berlin data pages under `/berlin/…` and
I3 will consolidate three page pairs (`poi-price-overview` into the POI page, `methodology-comparison`
into `/methodology`, `area-detail`/`area/index` into one browse entry). This guide maps *today's*
13 pages, because that is what exists and what I1's acceptance criteria ask for — but every mapping
below is written so it survives that consolidation: I note, per page, which chapter and which
"where next" pointers hold regardless of URL. I2/I3 change routes and page count; they do not
change which chapter a topic belongs to.

---

## 1. The narrative arc

One story threads every page on the site. Four chapters:

### Chapter 1 — The Question (2018)
*A master's thesis at Universität Hamburg asked whether gentrification — usually studied through
surveys, interviews, and years of fieldwork — could instead be measured from open data: the
churn of shops, cafés and restaurants mapped by volunteers on OpenStreetMap, cross-referenced
against Berlin's own population register. It found a real, if partial, answer: commercial change
tracks social change, and in one case (H3b) even seems to follow it in a predictable order. Then
the thesis was filed, the repository archived, and the question sat unanswered for the public for
eight years.*

Home: About §"It started as a 2018 university thesis". Chapter home: `/about`.

### Chapter 2 — The Revival (2026)
*Gentriduck rebuilds that thesis from scratch, in the open, on a modern free-and-open stack — and
does it with a supervised team of specialised AI agents instead of one person, each with a narrow
job, checking each other's work, gated by a human maintainer who is the only one who can move
anything onto the published site. This is itself worth telling: not just "we redid a thesis" but
"here is a working, documented, adversarial process for AI-assisted quantitative research that
doesn't cut corners."*

Home: `how-its-built` (the pipeline) + `how-its-organised` (the workflow) + the home page's
agent-pipeline diagram + About §"How it's built". Planned: `timeline` (I4) narrates this
chronologically alongside Chapter 1.

### Chapter 3 — The Evidence (what holds, what changed)
*Rebuilt on the same data the thesis used, the core finding replicates cleanly. Rebuilt on
Berlin's more robust official social monitor, the signal weakens — real, but fragile, sensitive to
which social measure and which period you use. That tension, not a clean "confirmed" or
"debunked," is the honest headline. This chapter is where the site's actual statistics live: the
governed index, the maps, the time series, the per-neighbourhood drill-downs, the commercial
(OSM/OA) data, and the land-value/rent context — all built on the same governed definition, all
carrying the same caveats.*

Home: the home page's "The finding" + "Berlin right now" sections, `thesis-recheck`,
`methodology-comparison`, `methodology`, `maps`, `time-series`, `area-detail`/`area/index`/
`area/[code]`, `poi-map`, `poi-price-overview`.

### Chapter 4 — What it means for you (per audience)
*The data and the process are only useful if they reach the people who can do something with
them: a housing-policy reader who wants a plain, honest takeaway; a researcher who wants the
quantified method; a technologist who wants to see how a supervised multi-agent system actually
works; a data engineer who wants the open stack; an open-data advocate who wants a concrete
argument, backed by a working pipeline, for why open data and open standards matter. This chapter
is where the site stops being one-size-fits-all and hands each reader the door built for them.*

Home: the home page's "Pick your path" audience router (today three cards; extended in I3/I5/I6
to five). Planned: `takeaways` (I5, policy/initiatives), `open-data` (I6, open-data/civic-tech +
data-publisher audiences).

**How the chapters connect.** Home is the hub: its hero states Chapter 1 in one line, its
agent-pipeline section is Chapter 2 in miniature, its "finding" and "Berlin right now" sections
are a Chapter 3 teaser, and "Pick your path" launches Chapter 4. Every other page commits fully to
one chapter and links back to home plus sideways/forward along the arc — no page is an island, and
no page tries to be all four chapters at once (that's what made the site read as "dashboards, not
a story" per the review's finding 1).

---

## 2. Per-page chapter mapping

### Chapter 1 — The Question

| Page | Route | Chapter | What it currently does | Where it points next |
|---|---|---|---|---|
| **About** | `/about` (frozen route, edit in place only) | **1** (primary), touches 2 | Origin story: the 2018 thesis, the agent team, the free/open/local-first rules, "see the work yourself." Today it's written but — per review finding 5 — nothing else builds toward or from it. | Forward to `methodology` (what the numbers mean), `how-its-built`, `how-its-organised` (the two "how" deep dives it currently summarizes). I3 should add a backward link *into* About from `thesis-recheck` (Ch.1 callback: "curious who rebuilt this and why?") and from the planned `timeline`. |

### Chapter 2 — The Revival

| Page | Route | Chapter | What it currently does | Where it points next |
|---|---|---|---|---|
| **How it's built** | `/how-its-built` | **2** | The data-pipeline audience door: dbt+DuckDB, Python/uv, Evidence.dev, the OSM completeness-bias correction, ADR discipline. | Sideways to `how-its-organised` (its explicit "neighbour" page), forward to `methodology` for what the pipeline computes. Planned: cross-link to `open-data` (I6) once it exists — friction encountered building this pipeline is the raw material for that page. |
| **How it's organised** | `/how-its-organised` | **2** | The AI-architect audience door: the agent team table, the pipeline-that-ships-a-change diagram (same `.agent-pipeline` component as home), the gate. | Sideways to `how-its-built`, backward to `about` (which already summarizes this page in miniature — I3 should make that relationship explicit rather than duplicated). Planned: cross-link to `timeline` (I4) once it exists — "see this pipeline's actual history" is a natural next click. |

*(Home's hero + agent-pipeline section is also Chapter 2, in miniature — see §1's "how the
chapters connect.")*

### Chapter 3 — The Evidence

| Page | Route | Chapter | What it currently does | Where it points next |
|---|---|---|---|---|
| **Home — "The finding" + "Berlin right now"** | `/` | **3** (teaser) | States the headline tension in one paragraph, then the live index: areas monitored, stage distribution, top-pressure table, the back-test-vs-literature credibility check. | Forward, hard, to `thesis-recheck` ("the full comparison of what the thesis claimed... and what our rebuild finds today") and to `methodology` for the decoder. |
| **Thesis re-check** | `/thesis-recheck` | **3** (headline) | The historical reproduction study: the six original hypotheses (H1, H1b, H2, H3a, H3b, H3c), what the 2018 thesis found, what the rebuild finds on EWR vs. MSS, same era vs. modern era. This is the site's most direct answer to the arc's central question. | Forward to `methodology-comparison` (the OA curation follow-up question), sideways to `methodology` (the theory/definitions behind the hypotheses), backward to `about` (who rebuilt this). |
| **Methodology comparison** | `/methodology-comparison` | **3** (deep dive) | "Does curating *which* business types count sharpen the signal?" — the faithful-vs-improved Offering Advantage comparison, with the honest "we can't yet run the head-to-head" caveat stated up front. | Backward to `thesis-recheck` (the faithful revival this extends), forward to `methodology` (§2 predictor definitions), forward to `poi-map` (where OA is explorable directly). *Planned consolidation (I3): folds into `/methodology` as a section — when that happens, this content becomes a subsection reachable from the same methodology page rather than a standalone route; the chapter and the "does curation sharpen the signal" story stay unchanged.* |
| **Methodology & data sources** | `/methodology` | **3** (reference / rulebook) | The plain-language decoder underneath every other Chapter-3 page: what "gentrification pressure" means, the four/seven data sources, the governed index definition, ordinal-data handling, `standard` vs `live_data`, and §6's seven honest limitations. | Every Chapter-3 data page links here for its decoder; this page links back out to home, time-series, maps, area-detail, poi-price-overview. It is the one page every other Chapter-3 page cites — treat it as load-bearing, not optional reading. |
| **Time series** | `/time-series` | **3** | Citywide trend (median status over time) + ranked "biggest movers," explicitly built to avoid a useless 540-item dropdown. | Forward to `area-detail` ("To inspect any single area, use the district browser"). |
| **Maps** | `/maps` | **3** | Choropleth of gentrification stage (and the raw Status/Dynamism inputs) across Berlin's neighbourhoods; Hamburg boundaries staged but not yet populated. | Click-through to `area/[code]` (per-area profile); sideways to `poi-map` for the commercial-data equivalent. I16 will fix color-scale/name-label issues here without changing this chapter placement. |
| **Area detail** | `/area-detail` | **3** | District browse + a "spotlight" on the district's highest-pressure area — the coarse entry point, deliberately not a 540-item picker. | Forward to `maps`, `time-series`; deep-links into `area/[code]`. *Planned consolidation (I3): rationalized with `area/index` into one browse entry under `/berlin/` — the "coarse entry point into per-area detail" role stays, only the URL/UI changes.* |
| **Area index** | `/area/index` | **3** | The crawlable table of all 542 current PLRs — exists mainly so the static build generates a real page per area (the canvas map can't be crawled), secondarily a searchable table. | Forward to `area/[code]` (every row links there); sideways to `area-detail`/`maps` as the "real" primary UX. |
| **Area detail (per-area)** | `/area/[code]` | **3** (most granular) | The richest single view: status trajectory, commercial-mix development, OA, land value/rent, for one PLR. Per the review (finding 7) this is currently data-rich but narrative-poor — no descriptive profile, no district context, a cryptic OA radar, an unordered POI-mix bar. | Every chart cites `methodology` for its decoder (already true). **This is I14's target** — turning the chart stack into a profile — and I1's template (§4) is exactly the shape I14 should apply: hero (area name/stage), story (a plain-language portrait), evidence (the existing charts, now with district/citywide context lines), caveats (existing alerts), where next (district, city, methodology). |
| **POI & Offering Advantage map** | `/poi-map` | **3** | Citywide/per-area POI density and OA (location quotient) map — the commercial-cycle half of the double invasion-succession model, made explorable directly rather than only as an internal index input. | Sideways to `methodology` (§2 OA definition), forward to `poi-price-overview` (citywide POI/price aggregate). |
| **Citywide POI & price/rent overview** | `/poi-price-overview` | **3** | Citywide aggregates: POI growth over time, land value and rent trends — explicitly "contextual," not index inputs, with the OSM early-year completeness-bias caveat repeated. | Forward to `area-detail` for the single-neighbourhood breakdown. *Planned consolidation (I3): merges into the POI page — the "citywide POI + price/rent context" role stays; the standalone route goes away.* |

### Chapter 4 — What it means for you

| Page | Route | Chapter | What it currently does | Where it points next |
|---|---|---|---|---|
| **Home — "Pick your path"** | `/` | **4** (launch pad) | Three audience cards today: methodology (researchers/urbanists), how-its-built (data pipeline builders), how-its-organised (AI systems designers). Per review finding 1, this misses policy/initiatives and open-data readers entirely. | I3/I5/I6 add a fourth and fifth card once `takeaways` and `open-data` exist — see §5 below for the target five-card router. |
| **Timeline** *(built, I4/#221)* | `/timeline` | **1→2 bridge**, read as part of Chapter 4's "orientation" role | A dated, curated (not git-derived) visual narrative — 2018 thesis + golden outputs → 2026-06-17 inception → Epic B revival verdict → the methodology remediation wave → website soft-launch → whitepaper → Hamburg staging (each entry source-cited). | Placed in the arc as the page that literally *is* Chapters 1 and 2 laid end to end — it's the connective tissue a reader lands on when they want "the whole story, chronologically" rather than "the current state" (which is what home gives). Points back to `about` (origin), forward to `how-its-organised` (the process it dates) and the whitepaper. Serves the tech & AI audience primarily (per the review's goals→audiences table: "timeline" is a named surface for that audience). |
| **Takeaways** *(planned, I5)* | `/takeaways` | **4** | Not yet built. Per I5's SPEC: ~5 plain-language, signed-off-only takeaways for policy/initiative readers, each with a "what the data shows" link, plus an explicit "what this can NOT tell you" block. | Entry point for the policy/initiatives audience (see §5); points to `thesis-recheck`/`methodology` (evidence behind each takeaway) and forward to `area/[code]` profiles (once I14 lands) as the concrete, area-level version of a takeaway. |
| **Open-data experience** *(planned, I6)* | `/open-data` | **4** | Not yet built. Per I6's SPEC: what open data enabled here, concrete per-source friction, and standardization recommendations — framed as an experience report, not advocacy (O3 stance). | Entry point for the open-data/civic-tech audience and the data-publisher sub-audience (see §5); points back to `how-its-built` (the pipeline this reports on) and to `methodology` (the sources table) and `DATA_LICENSE.md`. |

---

## 3. Tone guide

**The binding stance (O3/O4, `docs/PROJECT_PLAN.md`).** O3 is explicit: adopt "an explicit
**non-advocacy / transparency** editorial stance — an analytical tool that lets the data speak."
O4 calls for "accurate, shareable milestone summaries." The review restates it for Epic I:
*"factual, transparent, non-promotional, non-advocacy; for non-research audiences, actionable
simplicity beats MECE precision — but nothing may be untrue; honest caveats stay; displacement is
inferred, never measured, and only risk/pressure framing is allowed."* That sentence is the tone
rule for every page on this site, full stop — the rest of this section is how it plays out in
practice.

### The rules, concretely

1. **Plain, not dumbed-down.** Explain jargon in the sentence that uses it, don't cut the idea.
   `/methodology` does this constantly:

   > "It reports a **stage** in an observed process (pre-gentrification, pioneer-signal,
   > active-gentrification, consolidation-pressure, stable-established, or the named ambiguous
   > case 'improving-vulnerable' — see §3) and a **displacement-*pressure* signal**, never a claim
   > that displacement has occurred."

   That sentence names five technical stages *and* states the guardrail around them in one breath.
   Use this pattern: name the thing, then immediately say what it does and doesn't claim.

2. **Non-promotional — describe, don't sell.** Compare the home page's actual register:

   > "Does the 2018 thesis's result still hold in 2025? Partly — and that's the interesting part."

   That is the house voice: state the finding as a genuine, open question with a real (not
   triumphant) answer. It is *not*: "Gentriduck proves the thesis was right" or "our cutting-edge
   AI pipeline delivers unprecedented insight." No page should claim the project is impressive;
   let the reader conclude that from what's shown. The O4 milestone doc's title-page choices are
   the model for this: it opens with "What we built," not "what we achieved," and its findings
   section is structured strength-by-weakness ("strong agreement" / "direction right, effect too
   small" / "H2 survives weakly; H3b collapses") rather than leading with the best number.

3. **Caveats stay — reframe for readability, never drop.** The site's existing caveat language is
   already close to right; don't strip it in the name of "simplicity," restructure it so a
   non-specialist can act on it. Compare two caveat registers already live on the site:

   *Research register* (`/methodology` §6, for readers who want the mechanism):
   > "OSM is crowd-mapped, and its coverage of any neighbourhood has grown substantially since
   > 2008, independent of whether the neighbourhood itself changed. Gentriduck corrects for this
   > by working with each area's **share** of the city's total point-of-interest count in a given
   > year rather than its raw count..."

   *Plain register, same fact* (`/poi-price-overview`, for a citywide chart caption):
   > "It's also worth reading the early years cautiously: since these are OpenStreetMap-derived
   > counts, growing map-contributor coverage over time inflates early-year counts on its own,
   > independent of real-world change."

   Both say the same true thing. The plain version drops the mechanism (the share-based
   correction) but keeps the consequence (don't over-read early years) and links to the full
   version. That is "actionable simplicity over MECE precision": the reader gets the one thing
   they need to not be misled, and a door to the rest if they want it.

4. **"Improving" is not automatically good news — say so every time it's relevant.** This is the
   single most repeated caveat on the site, and it should stay repeated verbatim in spirit, not
   trimmed as "redundant." Live example (`/time-series`, `/area-detail`, `/area/[code]` all carry
   a version of this):

   > "'Rose' is not automatically good news for existing residents — rising status is also the
   > signature of gentrification, and can reflect displacement as easily as incumbent social
   > mobility."

5. **Displacement: risk/pressure language only, never a completed-event claim.** Never write "this
   area is being gentrified" or "residents were displaced." Always "gentrification pressure,"
   "displacement risk," "consistent with." `/methodology` §6 states the underlying rule:

   > "Open data can observe socio-economic upgrading and demographic recomposition; it cannot
   > observe that a specific household was involuntarily displaced. The site therefore uses
   > risk/signal language throughout ('pressure', 'signal') and deliberately avoids any stage name
   > that would assert displacement as a completed fact."

6. **The maintainer/agents are named plainly, sparingly, never dramatized.** `/about` names the
   agent roles and the human maintainer's actual function (approves tools, escalation point,
   merges the weekly PR) without ever using words like "revolutionary," "cutting-edge," or "AI
   breakthrough." Follow that register on `how-its-organised`, `timeline`, and anywhere the agent
   workflow is described: state what each role actually does, in one clause, no adjectives beyond
   what's true.

7. **Numbers get a decoder next to them, not just a footnote.** Every page that shows status/
   dynamism/stage values restates, inline, which direction is "worse" — this is not optional
   boilerplate, it is the single most common misreading risk on the site (a naive reader assumes
   "high status number = good," which is backwards). Keep this inline on every page that shows the
   numbers, even if it feels repetitive across pages — a reader who lands on `/area/[code]`
   directly (from a map click, a search engine, or a shared link) has not read `/methodology`
   first and may never read `/time-series`'s copy of the same note.

8. **For non-research pages (takeaways, open-data, timeline): one plain sentence, then the
   evidence, then the caveat — in that order, every time.** I5's own SPEC states the target
   register directly: "Each takeaway is one plain sentence + a short 'what the data shows' + a
   link to the page/methodology behind it." That three-beat structure (claim → evidence → link
   to depth) is the tone pattern for all Chapter 4 pages — it is what "actionable simplicity"
   looks like as a sentence template, not just a principle.

### Register by chapter (summary)

| Chapter | Register | Model page |
|---|---|---|
| 1 — The Question | Narrative, historical, slightly reflective | `/about` |
| 2 — The Revival | Descriptive, procedural, matter-of-fact about the agents | `/how-its-organised` |
| 3 — The Evidence | Precise, caveated, decoder-heavy, ordinal-data-honest | `/methodology`, `/thesis-recheck` |
| 4 — What it means | Plain, three-beat (claim → evidence → link), never advocacy | I5's own SPEC register; O4 milestone doc's "What it means" section |

---

## 4. Page template

Every page (existing, revised under I3, or newly built under I4/I5/I6/I14) follows five sections,
in this order. Not every section needs to be a visually distinct component on every page (a short
Chapter-4 page may fold "story" and "hero" together), but the *order and purpose* hold everywhere.

### 1. Hero
**Purpose:** orient the reader in one glance — what page is this, which audience/chapter is it
for, one sentence of stakes. Should be buildable from the shared `web/components/` hero (the
`.hero`/`.hero-compact` treatment already on home and `thesis-recheck`).
**Example (already live, home page):**
> *Eyebrow:* "A 2018 Berlin master's thesis, revived — built by a supervised team of AI agents"
> *H1:* "Gentriduck"
> *Lede:* "A live, public statistics project tracking gentrification pressure across Berlin's
> neighbourhoods, on a free, open, local-first data stack..."

### 2. Story — what you're looking at, why it matters
**Purpose:** two or three paragraphs of plain prose before any chart: what question this page
answers, why a reader should care, and where it sits in the arc (explicit chapter framing, not
implicit). This is the section most pages currently skip or under-write — dashboards jump straight
to evidence.
**Example (already live, home page "The finding"):**
> "The original thesis asked whether the churn of shops, cafés and restaurants in a Berlin
> neighbourhood tracks its social change. Rebuilt on the *same* welfare-register data the thesis
> used, the core result replicates cleanly... Swap in Berlin's more robust *official* social
> monitor, though, and the signal weakens."

For a Chapter-4 page (takeaways), "story" collapses to the one-sentence claim I5's SPEC specifies
— e.g. (illustrative, not a pre-committed takeaway): *"Small-area monitoring catches things a
district-level average would hide."*

### 3. Evidence — charts / tables
**Purpose:** the actual data, built from the governed marts, with inline decoders (tone rule 7).
This is where the shared Evidence components (BigValue, DataTable, LineChart, BarChart, AreaMap)
already do the heavy lifting; I1's job is not to change these but to make sure every evidence block
sits *after* a story section that explains why it's there, and *before* a caveats section.
**Example (already live, home page):** the `stage_distribution` bar chart, immediately followed by
a "What to notice" paragraph — that pairing (chart, then one paragraph naming what to look at) is
the pattern to standardize, not just for home.

### 4. Honest caveats
**Purpose:** state, in the page's own register (tone rule 3), what this specific page's numbers
do and don't support. Not a generic disclaimer block copy-pasted everywhere — the caveat should be
specific to what's on *this* page (e.g. `/poi-price-overview`'s early-year OSM caution vs.
`/methodology-comparison`'s "these two numbers are not a fair head-to-head").
**Example (already live, `/methodology-comparison` "Honest caveats"):**
> "Neither correlation confirms the thesis's original H1 prior... The comparison above is
> **structural, not a controlled experiment**: the two numbers differ in outcome measure, time
> period, and area boundaries simultaneously."

### 5. Where next — cross-links along the arc
**Purpose:** every page ends by pointing forward (deeper in this chapter), sideways (the adjacent
page in the same chapter), and/or back toward home or `/about`. This is the mechanism that turns
15 independent pages into one arc — currently inconsistent (some pages have a rich "further
reading" list, some only the generic footer `<sub>` nav).
**Example (already live, `/methodology-comparison` "Further reading"):** five links, explicitly
labelled by role (the faithful revival, the full statistical detail, the curation-rule ADR, the
plain-language decoder, the current live picture) rather than a bare list of URLs — that labelling
pattern (say *why* each link matters, not just its title) should be the standard for every page's
"where next" section, replacing pages that currently rely only on the generic footer nav.

---

## 5. Public audiences — entry and exit

Five audiences (from the review's goals→audiences table), and how each is meant to move through
the arc. This table is what I3's extended home audience router and I5/I6's new pages should match.

### 1. Policy makers, city administrations, local initiatives
- **Goal served:** easy-but-true insight into gentrification dynamics.
- **Likely entry:** the home page (via search/share, general interest) or directly a shared
  `/area/[code]` link (a specific neighbourhood someone is asking about) — currently the weakest
  landing experience for this audience per review finding 7/8, which is why I14 targets it.
- **Primary surfaces (review table):** `takeaways` (I5, planned), PLR profiles (`area/[code]`,
  Kurzprofil-style once I14 lands), `maps`.
- **Route through the arc:** Chapter 4 (`takeaways`, once built) → Chapter 3 evidence
  (`maps` → `area/[code]` profile for their neighbourhood) → optionally back to Chapter 1
  (`about`) if they want to know who built this and whether to trust it.
- **Exit / what they leave with:** a plain-language, honestly caveated read on whether their area
  (or a comparable one) shows gentrification pressure signals, with an explicit "what this can NOT
  tell you" boundary (I5's own acceptance criterion) so the takeaway is not mistaken for a
  displacement measurement or a prediction.
- **Home router card (planned, I3/I5):** a fourth card, "You work in housing policy or a local
  initiative" → `takeaways`.

### 2. Urban researchers
- **Goal served:** quantified methodology in a qualitative research field.
- **Likely entry:** `/methodology` (search, citation, or the existing home audience card "You
  study cities & gentrification") or directly the whitepaper (O2, external).
- **Primary surfaces (review table):** `methodology` pages (incl. `methodology-comparison`), the
  whitepaper, `thesis-recheck`.
- **Route through the arc:** Chapter 3 in depth — `methodology` (the rulebook) →
  `thesis-recheck` (hypothesis-by-hypothesis) → `methodology-comparison` (the OA curation
  follow-up) → the granular pages (`maps`, `time-series`, `area/[code]`) as supporting evidence.
- **Exit / what they leave with:** the governed index definition, the honest agreement/divergence
  read against the 2018 thesis, and — via the "Further reading" links already on `methodology`
  and `methodology-comparison` — direct paths into the ADRs and signed-off findings documents in
  the repository for full statistical detail.
- **Home router card (existing, unchanged in spirit):** "You study cities & gentrification" →
  `methodology`.

### 3. Tech & AI community
- **Goal served:** seeing a working supervised-agent development setup.
- **Likely entry:** `how-its-organised` (existing home audience card "You design AI systems") or
  the planned `timeline` (I4) if they land there first via a "Show HN"-style post (I11, later).
- **Primary surfaces (review table):** `how-its-organised`, `timeline` (I4, planned),
  `docs/process/` (repository, external to the site).
- **Route through the arc:** Chapter 2 (`how-its-organised` → sideways `how-its-built`) →
  Chapter 1/2 bridge (`timeline`, once built, for the dated version of the same story) →
  optionally Chapter 1 (`about`) for the origin framing, then out to the repository
  (`docs/adr/`, `.claude/agents/`) for the full mechanism.
- **Exit / what they leave with:** a concrete look at the coder↔reviewer↔dual-gate↔human-merge
  pipeline, backed by real, dated evidence (the methodology-remediation wave `timeline` is
  supposed to surface per I4's SPEC — "the gates caught things" is explicitly called out as "an
  honest, distinctive beat").
- **Home router card (existing):** "You design AI systems" → `how-its-organised`.

### 4. Data / data-engineering community
- **Goal served:** a modern free-and-open data stack, demonstrated end to end.
- **Likely entry:** `how-its-built` (existing home audience card "You build data pipelines") or
  the GitHub repository directly.
- **Primary surfaces (review table):** `how-its-built`, the repository, LinkedIn/Bluesky posts
  (later, I11).
- **Route through the arc:** Chapter 2 (`how-its-built` → sideways `how-its-organised` for the
  process context) → out to the repository for the dbt models/seeds/tests referenced inline.
- **Exit / what they leave with:** the stack (dbt + DuckDB + Python/uv + Evidence.dev), the
  specific completeness-bias correction as a worked example of handling a crowd-sourced data
  quirk, and a pointer to the ADR discipline behind every tool choice.
- **Home router card (existing):** "You build data pipelines" → `how-its-built`.

### 5. Open-data / civic-tech community (+ data-publisher sub-audience)
- **Goal served:** the value of open data (amid the live Informationsfreiheitsgesetz debate), and
  concrete standardization asks for data publishers/portals.
- **Likely entry:** the planned `open-data` page (I6) directly, via an open-data-community post
  (later, I11) or search.
- **Primary surfaces (review table):** `open-data` (I6, planned) for both the civic-tech goal and
  the data-publisher goal (the same page carries both per I6's SPEC — "what open data enabled" for
  the first, "what would make it easy" / standardization wishlist for the second).
- **Route through the arc:** Chapter 4 (`open-data`) → backward into Chapter 2 (`how-its-built`,
  the pipeline the friction report is about) → sideways into Chapter 3 (`methodology`'s source
  table) → out to `DATA_LICENSE.md` and the ingestion ADRs (ADR-0002/0003/0006/0007/0014/0016) for
  the concrete, citable friction claims I6's acceptance criteria require.
- **Exit / what they leave with:** a factual experience report — not advocacy (O3 stance,
  restated explicitly in I6's SPEC as "one restrained paragraph... state what the project
  demonstrates, let readers draw conclusions") — plus specific, actionable recommendations a data
  publisher could actually implement.
- **Home router card (planned, I3/I6):** a fifth card, "You care about open data" → `open-data`.

### The extended home router (target shape, for I3)

Today's `<div class="audience-cards">` on `/` has three cards (methodology / how-its-built /
how-its-organised). Per review finding 1 and this section, I3 should extend it to five, in this
order (Chapter-4 order, roughly matching how directly each audience needs "so what" vs. "how"):

1. **Policy/initiatives** → `takeaways` (new, I5)
2. **Researchers** → `methodology` (existing)
3. **Open-data community** → `open-data` (new, I6)
4. **Data engineers** → `how-its-built` (existing)
5. **Tech & AI** → `how-its-organised` (existing)

Each card keeps the existing pattern (icon, one-sentence audience self-identification, a short
description with inline forward links, a bold CTA) — I1 does not change the card component, only
the target set and count for I3 to implement.

---

## 6. Summary — what changes because of this guide

- Every page revision from here (I3, I4, I5, I6, I14) is written against §2's chapter assignment
  and §4's five-section template, not invented per page.
- Tone is governed by §3's eight concrete rules, all derived from language already live on the
  site (`/methodology`, `/methodology-comparison`, home) plus the O3/O4 stance and the O4 milestone
  doc's register — nothing here is a new voice, it is naming the voice that already exists in the
  best pages and asking every page to match it.
- §5 gives the web-engineer and the home-page router work in I3 a concrete five-card target instead
  of "add more audiences" as an open-ended brief.
- The forward-compatibility note in §2 means this guide does not need to be rewritten when I2/I3
  change routes — only the "Route" column values change, not the chapter or "where next" logic.
