[I4] Timeline page — the project's evolution, 2018 → today

## Why (problem)
The project's own story — a 2018 thesis revived eight years later by a supervised team of AI
agents on a free-and-open stack — is one of its strongest assets for every audience, and no page
tells it. The temporal story of the *data* exists (`time-series`), the temporal story of the
*project* does not.

## Goal
A `/timeline` page: the evolution of the project as a visual, dated narrative — thesis origins,
revival inception, the epics, the gates that caught things, soft-launch, multi-city — in the I1
design system.

## Scope & approach
- **Stay inside the ADR-0012 stack — no new library.** A CSS vertical timeline (Evidence markdown
  + shared components); ECharts (already available via Evidence) only if interaction genuinely
  earns its keep.
- **Milestone data is curated, not derived from git:** the git history is squashed and its dates
  are wrong for this purpose. Sources: ADR dates (`docs/adr/`), handoff digests (`docs/handoff/`),
  `CITATION.cff` (`date-released`), `docs/process/retrospective.md`, and the 2018 golden-output
  dates in `reference/`. Keep milestones in a small committed data file (e.g. a seed or page-local
  table) so the page regenerates deterministically.
- Milestones include (at least): 2018 thesis + golden outputs · 2026-06-17 inception (repo, board,
  agent team) · Epic B revival verdict · methodology remediation wave (what the gates caught — an
  honest, distinctive beat) · website soft-launch · whitepaper · Hamburg staging · going public
  (added by I13 when it happens).
- Each entry: date, one-sentence what, one-sentence why-it-mattered, link into the repo/ADR/page.

## Acceptance criteria
- `/timeline` renders in light + dark, mobile-friendly, using shared I1 components; no new
  dependency added.
- Every milestone dated from a citable repo source (ADR/handoff/CITATION), none from git log.
- Linked from the home page and footer nav.

## Gate / sign-off
web-engineer-reviewer. data-analyst checks milestone selection/wording. Not methodology-bearing
(no findings framing) — but the Epic B verdict wording must quote the signed-off narrative.

## Dependencies / relations
After I1 (template); lives top-level per I2. I13 adds the "public launch" milestone later.

## References
- `docs/assessment/2026-07-10-storytelling-comms-review.md` (finding 6)
- `docs/process/retrospective.md` · `docs/handoff/` · `docs/adr/README.md` · `CITATION.cff`
- ADR-0012 (stack constraint)
