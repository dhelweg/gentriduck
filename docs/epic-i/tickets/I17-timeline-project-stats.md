[I17] Timeline enrichment — repo growth stats, agent-workflow activity, maintainer steerings

## Why (problem)
`/timeline` (I4, #221) tells the project's story as curated milestone cards only. Maintainer
feedback (2026-07-11): the page misses the *quantitative* and *process* dimensions of the story —
(a) how the codebase itself grew (lines of code, models, tests, pages), (b) **when which agentic
workflow was in heavier or lighter use** over the project's life (the PM loop, the DE pair, the
web pair, the methodology gates, comms — ideally a kanban-style view), and (c) the maintainer's
own **learnings and steering interventions and their impact on the project** — the human half of
the supervised-agents story, which today is only implicit in ADR/assessment docs.

## Goal
`/timeline` grows three source-cited, deterministic sections alongside the existing milestone
cards: a repo-growth/stats block, an agent-activity-over-time view, and a curated "maintainer
steerings" thread showing what the human changed and what happened because of it.

## Scope & approach
- **Repo stats block:** a deterministic generator script (plain Python stdlib or Node — **no new
  tool**; `cloc`/`tokei` would need an ADR, don't) that counts LOC + file counts per layer
  (`transform/`, `ingestion/`, `web/`, `docs/`, `analysis/`, `ops/`, `.claude/`), dbt
  models/tests/seeds, Evidence pages/components, ADRs, sign-off files. Output committed as a small
  JSON artifact the page reads; script lives under `web/scripts/` or `ops/` — **not**
  `analysis/*.py` (that path is on the R-C1 methodology-gate list; this is site tooling, keep it
  off the gate).
- **The squashed-history constraint stands** (I4 header: dates are never derived from `git log`).
  Time-series therefore come from *dated repo artifacts*, not commit dates: the
  `docs/handoff/archive/` session states (dated, and they record what ran each session), sign-off
  file dates, ADR dates, and issue open/close dates already cited on the page. Current-state
  snapshot numbers (LOC today) are safe as-is and labelled as a snapshot. If any number is
  git-derived, it is explicitly labelled with the squash caveat or omitted.
- **Agent-workflow activity ("kanban-style"):** a swimlane/heatmap view — one lane per
  workflow (PM loop, data-engineer↔reviewer, web-engineer↔reviewer, geo-DS gate, domain-expert
  gate, comms-strategist) over calendar weeks, intensity = sessions/tasks in which that lane was
  active, derived from the handoff archive + sign-off/posts file dates + issue labels. Built as an
  Evidence/Svelte component within ADR-0012's stack (CSS/SVG, no new charting library).
- **Maintainer steerings & impact:** a curated, source-cited list (small committed JSON/CSV the
  page renders as timeline entries in a distinct visual style): each entry = date, the steering
  (quote or paraphrase of the maintainer's input), and the concrete impact (linked artifact).
  Known candidates to seed the curation: no blind 540-item PLR picker (area-detail header), the
  live-site OA bug report that became I15 (#232), map color/name-label feedback that became I16
  (#233), the soft-launch/noindex decision (#144), the storytelling review that spawned Epic I,
  H1's publication conditions, and the 2026-07-11 pages feedback that spawned I17–I20 itself.
  Curated by data-analyst; **maintainer reviews the list before publish** (it quotes him).

## Acceptance criteria
- Stats block, activity swimlanes, and steerings thread render on `/timeline` in light + dark,
  every number/date traceable to a committed artifact; no `git log`-dated series without an
  explicit caveat label.
- Generator script is deterministic (two runs, identical JSON), committed output, documented
  regeneration command; clean `npm run build` with no new dependency.
- Steerings list reviewed by the maintainer (comment on the PR or issue suffices).

## Gate / sign-off
Not methodology-bearing (site content about the project; touches none of the R-C1 paths).
web-engineer-reviewer for build/render; data-analyst curates; maintainer review of the steerings
content as above.

## Dependencies / relations
After I4 (#221, done) and I1 template. Feeds the I13 launch milestone and I11 post 6 (timeline
post). Sibling of I18–I20 (same 2026-07-11 maintainer feedback wave).

## References
- Maintainer feedback 2026-07-11 (this ticket wave)
- `web/pages/timeline.md` header (git-log prohibition rationale) · `docs/epic-i/tickets/I4-timeline-page.md`
- `docs/handoff/archive/` (per-session activity source) · `docs/process/retrospective.md`
- ADR-0012 (site stack: no new libraries)
