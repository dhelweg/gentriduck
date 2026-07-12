# I9 — Audience personas & channel map

**Ticket:** I9 (#226). **Author:** PM (drafted earlier than `comms-strategist`, per the I9 SPEC's
"PM/data-analyst may draft earlier if sequencing demands" — I10, which builds that agent, is not
yet landed). **Status:** draft, pending `gentrification-domain-expert` framing/misuse sign-off
(`I9-audience-domain-signoff.md`) before I11 (post drafts) or I12 (reach measurement) reference it.

**Patch note (2026-07-11).** This revision addresses the two conditions in
`I9-audience-domain-signoff.md`'s independent **PASS WITH CONDITIONS** verdict: P1's area-level
lead-lag example now requires **both** per-post sign-offs — the `gentrification-domain-expert`
framing/ethics gate (ADR-0021 §3) *first*, then geo-DS — instead of geo-DS alone, and §4 carries an
explicit dual-use acknowledgment (C1); P2 now names the political-mobilization context of Berlin
*Mieterinitiativen* and the project's non-advocacy tension explicitly rather than treating this
persona as an apolitical reader (C2). I11 area-level drafts remain gated on this patch being treated
as authoritative for P1/P2 format guidance; re-request the domain sign-off on this version before any
such draft ships.

**Grounding.** The six personas and the goal→audience mapping below are lifted directly from
`docs/assessment/2026-07-10-storytelling-comms-review.md` §4 ("Goals → audiences → channels") —
no new audience is invented here, this ticket only fleshes each one out into a persona with
channel fit and format guidance. The channel set (LinkedIn, Bluesky/Mastodon, owned surfaces) and
the publishing model (draft-and-screen, maintainer posts manually, no owned profiles yet) are
fixed by ADR-0021 (I8) and are not re-litigated here. Cadence heuristics below are marked
**[public best-practice, not repo-specific]** and are intentionally generic/conservative rather
than citing any single platform's growth-hacking advice, consistent with O3/O4's non-promotional
register.

**Personas are archetypes only.** Nothing below names a real individual, a real organization as an
outreach target, or any contact information. Each persona is a role-based composite built from the
review's audience list, not a profile of anyone specific.

---

## 1. How to use this map

Six personas, one per public goal-audience from the review's §4 table. For each: who they are,
what they want from the project, what convinces them, what alienates them, which pages already
serve them (per `docs/epic-i/storytelling-guide.md` §2's chapter mapping), channel fit, and
per-channel format guidance. I11's draft-and-screen skill checks every post against the persona it
targets before drafting; I12's reach loop measures against these same six segments.

**Channels available (ADR-0021):** LinkedIn, Bluesky/Mastodon (from the maintainer's personal
accounts, posted manually — no project-owned profiles, no automated posting), plus the project's
**owned surfaces**: the site (`web/pages/**`), the repo (README, ADRs, issues/Discussions), and the
whitepaper (O2). Instagram is explicitly out of scope (ADR-0021 §1) unless a future ticket produces
evidence a persona below is actually reachable there.

---

## 2. The six personas

### P1 — Policy makers / city administration

- **Role.** Municipal planning/housing-policy staff, district (Bezirk) administration, researchers
  inside a city government's statistics office — people who might cite or act on a neighbourhood
  reading, not academics publishing about method.
- **What they want to know.** Which areas show gentrification pressure *now*, in language that
  doesn't require a stats background; how confident the project is; what "risk" actually means
  (never a prediction of displacement, always inferred pressure — the site's existing register).
- **What convinces them.** A plain-language takeaway tied to a specific, checkable place (a PLR
  profile, not an abstract index); official-source lineage (MSS, EWR — sources they already know
  and trust); explicit caveats stated up front, not buried.
- **What alienates them.** Jargon (z-scores, dynamism indices without a decoder); any hint of
  advocacy or "gentrification is bad and here's who's responsible" framing (O3 non-advocacy is
  binding); a number presented as more certain than the pipeline actually supports.
- **Pages that already serve them.** `takeaways` (I5), `/area/[code]` PLR profiles (I14),
  `time-series`, `maps` — per `storytelling-guide.md` Chapter 4.
- **Channel fit.** **LinkedIn primary** (professional network, policy/public-sector audience
  overlap per ADR-0021 §1). Owned surfaces (site) as the destination every post links back to.
- **Format guidance (LinkedIn).** Short (120–200 words), one concrete finding per post.
  **Area-level lead-lag claims require extra care and extra gating**: an example such as "in
  [area], commercial turnover picked up two years before the social-status shift" is the thesis's
  core rent-gap timing signal (Smith 1979/1987) — the same lead-lag finding that lets a planner
  protect an area also lets a landlord or speculator time entry into it, and LinkedIn is the
  channel with the highest professional overlap with real-estate/development audiences (ADR-0021
  §1), i.e. the highest-exposure channel for this specific dual-use risk (Chapple & Zuk,
  "Forewarned," *Cityscape* 2016 — see §4's dual-use note). Any such claim must clear **both**
  per-post sign-offs before drafting — the `gentrification-domain-expert` framing/ethics gate
  (ADR-0021 §3) *first*, then the geo-DS statistical-soundness gate — not geo-DS alone, and the
  default posture is to prefer an aggregated or retrospective framing (citywide pattern, past-tense
  "we found," no single named area presented as currently heating up) over a real-time, area-named
  "this is happening now" claim; see §4. Beyond that: a link to the relevant takeaway or area
  profile, no more than one caveat sentence stated plainly rather than hedged into vagueness.
  **[public best-practice, not repo-specific]**: LinkedIn favours native text + a single image/chart
  over a bare link; a short native caption plus the link performs better than a link-only post.

### P2 — Neighbourhood initiatives (Mieterinitiativen, local civic groups)

- **Role.** Volunteer-run tenant/neighbourhood groups tracking change in their own area — not
  professionals, not necessarily data-literate, but highly motivated by their specific street/PLR.
- **Political context (non-advocacy tension).** In Berlin, *Mieterinitiativen* are frequently
  *politically mobilized anti-displacement actors* — the milieu of groups like Kotti & Co, Bizim
  Kiez, and the *Deutsche Wohnen & Co enteignen* campaign, not a neutral "curious resident"
  readership (Holm 2010 on Berlin *Aufwertung* and organized tenant resistance). That is not a
  reason to exclude or deprioritize this persona — they are a legitimate, arguably primary,
  audience for area-level findings — but the project is O3 non-advocacy, and this audience's *use*
  of a finding is inherently political. **The project cannot control downstream reframing of its
  findings into campaign material**, and does not attempt to; publishing to this persona means
  accepting that a risk/pressure finding may be cited in an advocacy context the project itself
  does not take a position in. This is an accepted, legitimate use, not a framing failure — but the
  map names it rather than treating P2 as an apolitical reader.
- **What they want to know.** "What's happening in *my* neighbourhood," in a format they can share
  with neighbours or cite to a local council member without needing to explain the methodology
  themselves.
- **What convinces them.** Groundedness in their actual area (the PLR profile, not a citywide
  average); risk/pressure framing that matches their lived experience without overclaiming
  certainty; a source they can point to that isn't "some website."
- **What alienates them.** Anything that reads as data-for-data's-sake; a tool that looks built for
  researchers, not residents; overclaiming ("gentrification detector") when the honest framing is
  "risk/pressure signal, not a measurement of displacement."
- **Pages that already serve them.** `takeaways` (I5), `/area/[code]` (I14) — same door as P1, but
  the entry point is usually a specific address/PLR search, not a citywide overview.
- **Channel fit.** **LinkedIn secondary, Bluesky/Mastodon secondary** — neither is this persona's
  home turf as strongly as P1/P4; the **owned site** (shareable, bookmarkable area-profile URL) is
  the actual product for this persona. Posts mainly serve as a discovery path *to* the site.
- **Format guidance.** Plain-language post (no jargon at all), the area-profile link as the whole
  point of the post, one sentence on what the number does and does not mean (risk signal, not a
  prediction), explicit invitation to read the caveats rather than skip them. Any post drafted for
  P2 that includes an area-level lead-lag claim (not just a static risk/pressure reading) is subject
  to the same dual-use gating as P1 above — both per-post sign-offs, domain/ethics first — because
  the same area-level specificity that helps this persona protect their neighbourhood is equally
  legible to an adversarial reader (§4).

### P3 — Urban researchers

- **Role.** Academic or applied researchers in urban sociology, housing economics, geography —
  people evaluating the project's *method*, not just its findings.
- **What they want to know.** Whether the operationalization is theoretically sound (rent-gap,
  invasion-succession, MSS fidelity — the domain-expert's own frameworks), whether the 2018
  thesis's findings replicate, what changed under a more robust social-status measure, and whether
  the code/data are reproducible enough to build on.
- **What convinces them.** Citable rigor: the whitepaper (O2), the methodology page, the
  thesis-recheck page's honest "replicates cleanly on the original measure, weakens on the more
  robust one" framing (exactly the kind of finding researchers trust *because* it isn't a clean
  "confirmed"), full grounding citations (R-C2), reproducible open data + open pipeline.
- **What alienates them.** Any claim that oversells the finding's strength; missing citations;
  marketing language where a hedge/limitation belongs; closed data or an unreproducible pipeline.
- **Pages that already serve them.** `methodology`, `methodology-comparison`, `thesis-recheck` — per
  `storytelling-guide.md` Chapter 3.
- **Channel fit.** **Bluesky/Mastodon primary** (academic/open-science communities are
  disproportionately active there per ADR-0021 §1's stated overlap), **owned surfaces** (whitepaper,
  repo) as the actual citable artifact.
- **Format guidance (Bluesky/Mastodon).** Can run longer and more technical than LinkedIn (thread
  format is native to both platforms); lead with the finding's honest tension ("replicates on X,
  weakens on Y") rather than a flattened headline; link to the whitepaper/methodology page, not just
  the homepage; hashtags/mentions follow each platform's academic-community conventions (e.g.
  discipline-specific hashtags on Bluesky's custom feeds) — **[public best-practice, not
  repo-specific]**, verify current convention at draft time rather than assuming it's static.

### P4 — Tech & AI practitioners

- **Role.** Software engineers, ML/AI practitioners, and people interested in multi-agent systems
  and AI-assisted engineering practice — drawn by the *process* (supervised agent team, gated
  pipeline), not primarily by gentrification as a topic.
- **What they want to know.** How the agent team actually works end to end: the coder↔reviewer
  loop, the methodology sign-off gate, the branch model (ADR-0011), what failed and how it was
  caught — the retrospective (O1), not a sanitized success story.
- **What convinces them.** Concrete process detail (an actual example of a caught error, a real
  gate rejection, not just "we use agents"); the fact that the gates are *enforced* code/process
  (R-C1), not aspirational; the project being genuinely open (repo, ADRs, agent definitions all
  public).
- **What alienates them.** Hype language ("cutting-edge AI pipeline"); vague claims about
  "AI-powered insights" without the supervision/gate detail that makes this project's approach
  distinctive; anything that reads as a product pitch rather than an engineering account.
- **Pages that already serve them.** `how-its-organised`, `how-its-built`, planned `timeline` (I4) —
  per `storytelling-guide.md` Chapter 2.
- **Channel fit.** **Bluesky/Mastodon primary** (tech-practitioner audience overlap per ADR-0021
  §1), plus a one-off **"Show HN"-style launch post** (I13) once the site is stable. Owned surfaces
  (repo, `docs/process/retrospective.md`) are the actual substance.
- **Format guidance.** Technical specificity over breadth — one real mechanism per post (e.g. "how
  the methodology gate blocked a merge" is a stronger post than "we use AI agents"); link to the
  agent definitions or an ADR, not just the homepage; no framework/product-comparison claims (stays
  in O4's non-promotional register — this is an account of *this* project's practice, not a pitch
  that it's better than alternatives).

### P5 — Data engineers / analysts

- **Role.** People evaluating or reusing the open-source stack itself (dbt + DuckDB + Evidence.dev,
  local-first, free-tier hosting) — closer to P4 than P3, but focused on the data stack rather than
  the agent process.
- **What they want to know.** Whether the stack choices are sound and reusable for their own
  projects: why DuckDB/dbt/local-first (ADR-0001), how the city-agnostic model works (ADR-0005),
  what free-tier hosting actually costs at this scale (ADR-0012).
- **What convinces them.** Concrete architecture detail with citations to the ADRs that made each
  call, not just a stack-name list; the fact the whole pipeline runs on free/open tooling with no
  paid tier (golden rule 1) and is documented enough to replicate.
- **What alienates them.** A stack list with no rationale; claims of scalability/performance that
  aren't backed by the actual (modest, local-first) scale this project runs at.
- **Pages that already serve them.** `how-its-built` — per `storytelling-guide.md` Chapter 2.
- **Channel fit.** **LinkedIn + Bluesky/Mastodon**, roughly even split (per ADR-0021 §1's "data
  community" split across both). Owned surfaces (repo, ADRs) are the actual reference material.
- **Format guidance.** Architecture-diagram-adjacent (even without an image, describe the pipeline
  shape in one or two sentences); one ADR link per post rather than summarizing several at once;
  cost/scale honesty (state it's a modest local-first setup, not a claim of production scale it
  doesn't have).

### P6 — Open-data & civic-tech community (incl. data publishers)

- **Role.** Two overlapping groups per the review's §4 table: people who advocate for/use open
  government data, and the public bodies/portals that publish it (a secondary "data publisher"
  reader inside this same persona, per the `open-data` page's own dual audience).
  **[Also the group golden rule 6/SEC-3 most directly touches — see note below.]**
- **What they want to know.** Concrete proof that open data enables real analysis (this project
  *is* that proof — built entirely from freely licensed sources); specific, actionable friction
  points in how German public bodies currently publish data, worth fixing.
- **What convinces them.** The `open-data` page's (I6) own register: an experience report with
  every claim traceable to a repo artifact, not a grievance piece; concrete, specific
  recommendations (versioned schemas, no login gate on bulk extracts, etc.) rather than a vague
  call for "more openness."
- **What alienates them.** Any drift toward the IFG legislative debate itself (I6's domain-expert
  sign-off specifically flagged this boundary as load-bearing — see
  `I6-open-data-domain-signoff.md` §3) — a post must stay in "this project observed X" register,
  never "the law should say Y."
- **Pages that already serve them.** `open-data` (I6) — per `storytelling-guide.md` Chapter 4.
- **Channel fit.** **Bluesky/Mastodon primary** (civic-tech/open-data communities skew there per
  ADR-0021 §1), owned surfaces (the `open-data` page itself, the standardization wishlist) as the
  actual content.
- **Format guidance.** Lead with a concrete friction incident (e.g. "an upstream CSV format changed
  three times across five years — here's what that cost us"), close with a specific, actionable
  recommendation, never editorialize toward the IFG debate — if in doubt, reuse the open-data page's
  own closing-paragraph discipline verbatim rather than paraphrasing loosely.

---

## 3. Cross-cutting channel/format summary

| Channel | Best-fit personas | Register | Length | Notes |
|---|---|---|---|---|
| **LinkedIn** | P1 (policy), P5 (data eng, shared with Bluesky), P2 (secondary) | Professional, plain-language over jargon | 120–200 words | Native text + one chart/image outperforms link-only. **[public best-practice]** Highest-exposure channel for the dual-use risk in §4 — apply the area-level lead-lag gating there before drafting. |
| **Bluesky/Mastodon** | P3 (researchers), P4 (tech/AI), P6 (open-data), P5 (shared with LinkedIn) | Can run longer/technical; thread-native | Thread-friendly, no hard cap | Hashtag/mention conventions are platform- and community-specific; check at draft time, don't assume static. **[public best-practice]** |
| **Owned site** | All six | Whatever the target page's existing register is (per `storytelling-guide.md`) | N/A | The actual destination every post links to — posts are a discovery path, the site is the product. |
| **Repo / ADRs** | P3, P4, P5 | Technical, as-is | N/A | Cited directly, not reformatted. |
| **Whitepaper (O2)** | P3 primarily | Academic register | N/A | The citable artifact for P3; linked, not summarized loosely. |

**Cadence heuristics [public best-practice, not repo-specific]:** post when there is a genuinely
new, signed-off finding or artifact to share — not on a fixed schedule for its own sake. This
project has no promotional cadence target; O3/O4's "useful and citable beats promotional" register
means *silence is fine* between real findings. If I12's reach-measurement loop later shows a
specific cadence pattern correlates with reach among these six personas, that becomes an input to
this map's next revision, not an assumption made here.

---

## 4. Reach tactics (register check)

**Dual-use / misuse note (binding for P1/P2 area-level lead-lag content).** The thesis's lead-lag
hypothesis — POI/commercial-turnover dynamism leading a social-status shift — is a rent-gap timing
signal (Smith 1979/1987: capital targets areas where the gap between actual and potential ground
rent is widening). Publishing that signal at area-level specificity to an outward channel is a
documented dual-use vector for gentrification early-warning outputs: the same finding that helps a
planner or tenant initiative protect a neighbourhood also helps a developer, landlord, or speculator
time entry into it (Chapple & Zuk, "Forewarned," *Cityscape* 2016). **LinkedIn is the channel where
this exposure is highest** (heaviest overlap with real-estate/development professionals, per
ADR-0021 §1). Standing rule: prefer aggregated or retrospective framing ("across the areas we
tracked, X pattern held," "we found this two years after the fact") over real-time, single-area
"area X is heating up now" phrasing in outward posts, and route any area-named lead-lag claim
through **both** per-post sign-offs — `gentrification-domain-expert` (framing/ethics, ADR-0021 §3)
*first*, then geo-DS (statistical soundness) — never geo-DS alone. This map does not claim it
"cannot surface" at-risk areas outward; it can, via P1/P2's area-level format guidance above, and
that is precisely why the dual-use gating here is binding rather than aspirational. This intersects
with P2 (§2): the same area-level specificity that serves a tenant initiative's protective use is
equally legible to an adversarial reader — the gating above applies regardless of which persona a
post is nominally targeting.

Per O3/O4 and ADR-0021 §4, every reach tactic below stays inside "genuinely useful and citable
beats promotional":

- **Cross-link the whitepaper/dataset for researchers (P3).** A citable artifact is itself a reach
  tactic — every P3-facing post links to something a researcher could actually cite, not just a
  landing page.
- **Reproducibility as the hook for the data audience (P4/P5).** "Here's exactly how to reproduce
  this" is a stronger, more honest hook than "look what we built" for these two personas.
- **Concrete area-level specificity for P1/P2, subject to the dual-use note above.** A citable PLR
  profile beats a citywide claim — specificity is what makes a policy/neighbourhood reader trust a
  number enough to act on it — but for area-level *lead-lag* claims specifically, this specificity
  is also what makes the finding actionable for a predatory reader; the dual-use note's gating and
  aggregated/retrospective-framing preference govern that subset, not this bullet's general case
  (a static risk/pressure reading with no timing claim is not subject to the extra gating).
- **The open-data page's own friction-to-recommendation shape, reused for P6.** Concrete incident →
  concrete recommendation, never incident → editorial conclusion about legislation.
- **No engagement-bait.** No questions posed purely to drive replies, no manufactured urgency, no
  "you won't believe" framing — none of these fit any of the six personas' stated "what convinces
  them," and several personas (P1, P3) explicitly listed such framing under "what alienates them."

---

## 5. What I11/I12 do with this map

- **I11** (first post series) picks one persona per draft, uses that persona's channel + format
  guidance above, and self-checks against ADR-0021 §4's content rules before requesting sign-off.
  For any P1/P2 draft containing an area-level lead-lag claim, I11 requests the
  `gentrification-domain-expert` framing/ethics sign-off (ADR-0021 §3) *before* the geo-DS
  statistical sign-off, per §4's dual-use note — not geo-DS alone.
- **I12** (reach measurement) measures reach *per persona/channel pair* defined here, not as a
  single aggregate number — a post reaching many P4 readers is a different outcome than reaching
  few P1 readers, and the loop should report both, not net them into a single "engagement" figure.

## 6. Reach measurement (I12): campaign-link convention and per-persona definitions

**Campaign-link convention.** Every link a draft post makes back to the site carries a
`?ref=<channel>-<post>` query parameter — e.g. `?ref=li-recheck` (LinkedIn, thesis re-check post),
`?ref=bs-timeline` (Bluesky, timeline post). Channel prefixes: `li` (LinkedIn), `bs` (Bluesky/
Mastodon). Post slugs are short and stable across a post's own LinkedIn/Bluesky variants (e.g.
`recheck`, `oa-fastfood`, `opmodel`, `opendata`, `timeline`) so the two channel variants of the same
finding are distinguishable in GoatCounter's referrer/path view without being conflated. This
convention has been used consistently by all six I11 drafts (see `docs/epic-i/posts/`); no change to
the convention is needed, this section is its single documented source of truth (the SPEC's own
acceptance criterion for "documented").

**GoatCounter confirms tagged paths/referrers, in principle — status as of this writing.**
GoatCounter (ADR-0012 Amendment B) surfaces both the landing path and the query string in its
referrer/path views by design (query parameters are part of the URL it logs) — no additional
integration is required beyond what Amendment B already ships (the beacon script + the `?ref=`
convention above). **However**, Amendment B's own "Open follow-up" note records that the GoatCounter
account/site and the `GOATCOUNTER_CODE` deploy env var are a **maintainer action, not code** — the
PM cannot create third-party accounts on the maintainer's behalf. Until that account exists and a
post has actually been shared (I13/first real post), there is no live traffic to confirm against;
this section documents the mechanism, not yet a confirmed observation. Re-confirm this line once
the account is live and traffic exists.

**Per-persona reach definitions** (observable proxies per the six personas in §2 — read manually,
no API integration, no credentials, per I8's publishing model):

| Persona | Reach proxy (what "reached" means, observably) |
|---|---|
| **P1** — Policy makers / city administration | `takeaways` and `/area/[code]` PLR-profile page visits via a `li-`/`bs-` tagged referrer; LinkedIn is the primary channel to watch (per §3's channel table). |
| **P2** — Neighbourhood initiatives | Same PLR-profile pages as P1, but arriving via a post explicitly targeting P2's framing (per §2's P2 format guidance); watch for direct/bookmarked repeat visits to a specific area page (the "home turf" pattern §2 names) as a stronger signal than a single pageview. |
| **P3** — Urban researchers | `thesis-recheck`, `methodology`, and whitepaper visits/downloads; a citation of the whitepaper or dataset (manually noticed, e.g. a repo mention or an academic reference) counts as the strongest possible signal, though it is not something GoatCounter surfaces directly. |
| **P4** — Tech & AI practitioners | `how-its-organised`, `how-its-built`, and `timeline` page visits via a `bs-` tagged referrer (P4's primary channel); repo traffic (stars/forks/clones, read manually from GitHub's own free Insights tab, no API) as a secondary signal. |
| **P5** — Data engineers / analysts | `how-its-built` visits split roughly evenly across `li-`/`bs-` tagged referrers (per §3's even-split channel fit); repo clone/fork counts as a secondary signal, same source as P4. |
| **P6** — Open-data & civic-tech community | `open-data` page visits via a `bs-` tagged referrer (P6's primary channel); any GitHub Discussion or issue opened by an external reader referencing the open-data page counts as the strongest signal, read manually. |

Platform-native metrics (LinkedIn/Bluesky impressions, reactions, reposts) are read manually by the
maintainer directly on each platform — no API integration, no credentials, consistent with I8's
publishing model and this ticket's explicit "no API integration, no credentials" scope boundary.

**Cadence.** After each post is actually shared by the maintainer, one `reach-log.md` row is added
(see `docs/epic-i/reach-log.md`) reading GoatCounter's tagged-path/referrer view for that post's
window; if a persona's reach proxy consistently under- or over-performs relative to what the post
targeted, that observation feeds back into this map's channel-fit guidance (§2/§3) at the PM's
cadence, not automatically.

**Report both, not netted.** Per §5's existing I12 note: reach is reported *per persona/channel
pair*, never as a single aggregate "engagement" figure across all six personas — reaching many P4
readers and reaching few P1 readers are different outcomes for different goals, and netting them
would erase the distinction the whole loop exists to preserve.

---

## References

- `docs/assessment/2026-07-10-storytelling-comms-review.md` §4 (the goal→audience→channel table
  this persona set operationalizes)
- ADR-0021 (I8 — channel decisions, publishing model, per-post sign-off gate, content rules)
- `docs/epic-i/storytelling-guide.md` (chapter mapping, per-page audience doors)
- `docs/epic-i/I6-open-data-domain-signoff.md` (precedent for the IFG-adjacency framing boundary
  reused here for P6)
- `docs/epic-i/I9-audience-domain-signoff.md` (independent domain-expert **PASS WITH CONDITIONS**
  verdict; this revision patches the map to address conditions C1 and C2 recorded there)
- `docs/epic-i/tickets/I9-audience-personas-channel-map.md` (source SPEC, full acceptance criteria)
- Smith, N. (1979/1987) — rent-gap theory, cited for the P1/§4 dual-use note
- Chapple, K. & Zuk, M. (2016). "Forewarned: The Use of Neighborhood Early Warning Systems for
  Gentrification and Displacement." *Cityscape*, 18(3) — cited for the P1/§4 dual-use note
- Holm, A. (2010) — Berlin *Aufwertung* and organized tenant resistance, cited for P2's political
  context
