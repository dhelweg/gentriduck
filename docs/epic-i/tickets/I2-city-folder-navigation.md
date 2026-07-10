[I2] Navigation restructure: city deep-dive folders

## Why (problem)
Eight Berlin data pages sit flat at the top level of the sidebar; Hamburg (Epic H, staged) has
nowhere to live; two pages collide on `sidebar_position: 14`. The site needs a navigation shape
that scales to multiple cities and gives each city a real deep-dive entry — and routes must be
frozen *before* the noindex soft-launch protection is removed (maintainer rule: content revised +
links stable → go public).

## Goal
Folder-structured navigation: story/method/about pages top-level; per-city folders (`/berlin/…`,
later `/hamburg/…`) containing a city landing page and that city's data deep-dives. Routes frozen
afterwards.

## Scope & approach
- Move the Berlin data pages under `web/pages/berlin/` (Evidence folder routing + sidebar
  sections): maps, poi-map, time-series, area-detail, area index, `/berlin/area/[code]`.
- New `/berlin/` **city landing page** — the deep-dive entry: what Berlin's data shows at a
  glance, links into maps/areas/time-series (template per I1).
- Scaffold `web/pages/hamburg/` structure but publish only when Epic H clears its methodology
  gate (pages stay honest about staged status, as today).
- Top-level keeps: home, thesis-recheck, methodology, how-its-built, how-its-organised, about,
  plus the new timeline/takeaways/open-data pages (I4–I6).
- **`/about` must not move — the route is externally linked.** Everything else may move exactly
  once, in this ticket, while the site is still noindex.
- Fix the `sidebar_position` collision; re-number sidebar positions coherently for the new tree.
- Update all internal links + the shared footer nav (I1 component); check the static build's
  crawled routes still generate every `/berlin/area/[code]` page.

## Acceptance criteria
- Berlin data pages live under `/berlin/…` with a city landing page; sidebar shows the folder
  structure; no `sidebar_position` collisions.
- `/about` unchanged; all internal links valid (no 404s in `evidence build` output / link check).
- Hamburg folder scaffolded but unpublished; route map documented in the SPEC's PR so I13 can
  declare routes frozen.

## Gate / sign-off
web-engineer-reviewer (build renders, links valid, per-area pages all generated). Not
methodology-bearing (structure only, no findings framing changes).

## Dependencies / relations
After I1 (template + footer component). Gates I3/I14 (pages revised in their final location) and
I13 (routes frozen is a launch criterion). Relates to Epic H publication.

## References
- `docs/assessment/2026-07-10-storytelling-comms-review.md` (findings 2, 4, 10)
- ADR-0012 (Evidence static export, GitHub Pages basePath)
