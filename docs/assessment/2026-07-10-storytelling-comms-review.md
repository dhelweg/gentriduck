# Storytelling & outside-communication review — 2026-07-10

**Reviewer:** PM session with the maintainer (interactive), building on the site inventory of all
15 published pages, `docs/PROJECT_PLAN.md`, the O1–O4 outputs workstream, and the maintainer's
direction for the next round of work.
**Scope:** the public Evidence.dev site (`web/pages/**`), the README story, and the project's
(currently absent) outward-communication machinery.
**Outcome:** this review triggers **Epic I — Public communication & storytelling** (SPECs in
`docs/epic-i/tickets/`, backlog in `docs/PROJECT_PLAN.md`).

---

## 1. What was reviewed

All 15 site pages (home, thesis-recheck, time-series, maps, area-detail, poi-map, area index +
templated `/area/[code]`, poi-price-overview, methodology, methodology-comparison, how-its-built,
how-its-organised, about), the navigation/sidebar structure, the shared visual system, the README,
and the existing dissemination substrate (O1–O4, the Q2 milestone doc, the whitepaper).

## 2. Verdict

The pages are **individually solid** — finished, honestly caveated, no stubs, no broken pages.
But taken together, **the site is a collection of dashboards and reports, not one story.** For a
project whose goals are as much about *communication* (policy insight, methodology transparency,
the agentic operating model, the open-data case) as about the data itself, that is the gap that
matters. "More pages" is not the fix; a spine, a shared feel, and fewer-but-stronger pages are.

## 3. Findings

1. **No narrative spine.** Each page stands alone. There is no arc — *a 2018 thesis asked X → we
   rebuilt it in the open → here is what holds, what changed, and what it means for you* —
   threading the pages. The home audience router covers three audiences (data, method, AI) and
   misses policy/initiatives and open-data readers entirely.
2. **Flat navigation, no city structure.** Eight Berlin data pages sit at top level; Hamburg
   (staged, Epic H) has nowhere to live. City deep-dives need folder navigation: `/berlin/…`
   (city landing page + maps, areas, time-series, POI pages), `/hamburg/…` once published, with
   the story/method/about pages above them.
3. **Page inflation candidates.** `poi-price-overview` overlaps `poi-map`; `methodology-comparison`
   could be a section of `methodology`; `area-detail` and `area/index` overlap as entry points.
   Merging beats adding.
4. **Shared UX is partial.** The footer nav is consistent, but hero styles and CSS are duplicated
   inline per page (`.agent-pipeline` appears twice), and `poi-map.md` and `area/index.md` collide
   on `sidebar_position: 14`.
5. **About tells the origin story but is not woven in.** Other pages neither build toward nor from
   it. It needs updating to carry the revised story. Constraint: the `/about` **route is externally
   linked and must never change or be deleted** — edit in place only.
6. **Missing story pages:** a project **timeline** (2018 thesis → 2026 agentic revival; must be
   curated from ADR dates, `docs/handoff/`, `CITATION.cff` and `docs/process/retrospective.md` —
   the git history is squashed and its dates are unusable), plain-language **takeaways** for
   policy and other-city initiatives, and an **open-data experience report**.
7. **The PLR detail pages are data-rich but narrative-poor** (maintainer input). `/area/[code]` is
   the richest data view (status line, trajectory, POI mix, OA radar, land value/rent) but explains
   none of it for a lay reader: no descriptive area *profile* built from the OA mix and the other
   data, no district context, an OA radar that is cryptic without the methodology page open in a
   second tab, and an unordered POI-mix stacked bar (should be sorted by type count). On the maps —
   a core asset — the color scale needs improvement and labels show PLR IDs instead of area names;
   OA values surface as coarse 0/1/2-style numbers instead of a readable percentage vs the
   citywide baseline.
8. **The OA calculation looks wrong on the detail page** (maintainer report): on `/area/04200311/`,
   all OA values for a type with subtypes are identical. Before the Offering Advantage is used as a
   headline finding in pages or posts, that symptom must be root-caused and the calculation
   (ADR-0017/0018; formula, denominators, causal-tier selection, value scale) re-reviewed against
   the thesis definition.
9. **No communication substrate.** No channel strategy, no audience personas, no post drafts, and
   no sign-off process for outward copy. The O4 milestone artifacts are the only shareable outputs.
10. **Noindex gate.** The site ships `noindex` + `robots.txt Disallow: /` (soft-launch, #144).
    Maintainer's rule for lifting it: **content revised and links/routes stable** — the epic
    sequences toward exactly that.

## 4. Goals → audiences → channels

The project's public goals, and who each one speaks to:

| Goal | Audience | Primary surfaces |
|---|---|---|
| Easy-but-true insight into gentrification dynamics | policy makers, city administrations, local initiatives | takeaways page, PLR profiles (Kurzprofil-style), maps, LinkedIn |
| Quantified methodology in a qualitative research field | urban researchers | methodology pages, whitepaper, thesis-recheck, Bluesky/Mastodon |
| A working supervised-agent development setup | tech & AI community | how-its-organised, timeline, `docs/process/`, Bluesky/Mastodon + a launch "Show HN"-style post |
| A modern free-and-open data stack | data community | how-its-built, repo, LinkedIn + Bluesky/Mastodon |
| The value of open data (while the Informationsfreiheitsgesetz is under debate) | open-data / civic-tech community | open-data experience page, open-data posts |
| Better open-data standardization | data publishers, portals | open-data experience page (concrete friction + recommendations) |

Editorial register (inherited from O3/O4 and binding for all outward copy): factual, transparent,
non-promotional, non-advocacy; **for non-research audiences, actionable simplicity beats MECE
precision — but nothing may be untrue**; honest caveats stay; displacement is inferred, never
measured, and only risk/pressure framing is allowed. No third-party personal data is ever
committed; the maintainer is named sparingly where suitable (the About page already does this).

## 5. Resulting wave

**Epic I — Public communication & storytelling** (`epic-i` label, SPECs in `docs/epic-i/tickets/`):

- Site revision: I1 story spine & shared UX system → I2 city-folder navigation → I3 full page
  revision incl. About (+ consolidation) · I14 PLR deep-dive profiles · I16 map UX · I4 timeline ·
  I5 takeaways · I6 open-data experience · I7 README realignment.
- Methodology: I15 OA calculation review + subtype bug (dual gate; holds OA-based content).
- Communication machinery: I8 comms ADR → I10 comms-strategist agent + skill → I9 personas &
  channel map · I11 first post series · I12 reach measurement · I13 launch playbook (noindex
  removal criteria: I1–I6 landed, routes frozen).
- Parked: META-1 meta-project scoping (operating-model playbook extraction).

The methodology gate (CLAUDE.md R-C1) binds unchanged: I15 is methodology-bearing outright, and
any revision that changes how findings are framed (I3, I5, I14) carries a domain-expert (and where
statistical claims change, geo-data-scientist) sign-off before integration into `develop`.
