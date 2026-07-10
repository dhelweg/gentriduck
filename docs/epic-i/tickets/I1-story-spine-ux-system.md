[I1] Story spine & shared UX system for the public site

## Why (problem)
The 2026-07-10 storytelling review found the site is a collection of individually solid dashboards
and reports with no narrative arc connecting them, a home audience router that misses two of the
project's public audiences, and page styling (heroes, `.agent-pipeline` CSS) duplicated inline per
page instead of shared. Every page revision in Epic I needs a spine and a design system to revise
*toward* — otherwise the wave produces fifteen local rewrites, not one story.

## Goal
A committed storytelling guide (the narrative arc, tone rules, page template) plus a shared
Evidence component library, so that every page — regardless of audience — reads and feels like one
site telling one story.

## Scope & approach
- **Narrative arc:** define the single story that threads all pages: *a 2018 thesis asked whether
  gentrification can be measured from open data → we rebuilt it in the open, supervised AI agents
  doing the work → here is what holds, what changed, and what it means for you (per audience).*
  Map every existing + planned page onto the arc (which chapter it is, where it points next).
- **Tone guide:** plain, honest, non-promotional (O3/O4 stance). For non-research pages:
  actionable simplicity over MECE precision — but never untrue; caveats stay, framed readably.
  Register examples drawn from the existing `/methodology` and `docs/epic-g/O4-milestone-B-narrative.md`.
- **Page template:** hero → story (what you're looking at, why it matters) → evidence (charts/
  tables) → honest caveats → where next (cross-links along the arc).
- **Shared components:** extract the duplicated hero, `.agent-pipeline` diagram, and footer nav
  into `web/components/` (Evidence supports project components); pages consume them instead of
  inline CSS. Audience-agnostic look & feel: one palette, one typographic rhythm, one caveat style.
- Deliverables: `docs/epic-i/storytelling-guide.md` + the component library + one exemplar page
  converted (the home page) proving the template.

## Acceptance criteria
- `docs/epic-i/storytelling-guide.md` committed: arc, per-page chapter mapping, tone rules, page template.
- `web/components/` contains the shared hero / agent-pipeline / footer components; home page uses
  them; `evidence build` passes; no visual regression on unconverted pages.
- The guide names all public audiences (policy/initiatives, researchers, tech & AI, data community,
  open-data community) and how each enters and exits the arc.

## Gate / sign-off
domain-expert reviews the arc + tone guide for framing/ethics (`I1-*-domain-signoff.md`,
Verdict: PASS required before I3/I5/I14 build on it). web-engineer-reviewer verifies the components.

## Dependencies / relations
Feeds I2–I7, I14, I16. References the review that triggered the wave.

## References
- `docs/assessment/2026-07-10-storytelling-comms-review.md` (findings 1, 4)
- `docs/epic-g/O4-milestone-B-narrative.md` (tone template) · O3 stance (`docs/PROJECT_PLAN.md`)
- ADR-0012 (Evidence stack — components stay within it)
