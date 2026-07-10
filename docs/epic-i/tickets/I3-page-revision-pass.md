[I3] Full page revision pass — every page onto the story spine (incl. About), consolidate

## Why (problem)
The pages are individually solid but don't tell one story (2026-07-10 review, finding 1), several
overlap (finding 3), and the About page — the canonical origin story — is not woven into the rest
of the site (finding 5). More pages is not the fix; fewer, stronger, connected pages are.

## Goal
Every public page rewritten onto the I1 spine and template, overlapping pages merged, and the
About page updated in place to carry the revised story — so the whole site is something the
project is proud to share.

## Scope & approach
- Revise each remaining page to the I1 template (hero → story → evidence → caveats → where next),
  using the shared components; thread the arc cross-links through all pages.
- **About:** update content to fit the revised storytelling. Hard constraints: **never delete or
  rename `web/pages/about.md`; the `/about` route must not change** (externally linked). Edits in
  place only; keep the "who made this and can I trust it" purpose.
- **Consolidate:** merge `poi-price-overview` into the POI page; fold `methodology-comparison`
  into `/methodology` as a section; rationalize `area-detail` vs `area/index` into one clear
  browse entry under `/berlin/`. Removed routes get a short meta-refresh stub or are removed while
  still noindex (decide per page; document in the PR).
- **Home audience router:** extend from three cards to all public audiences (adds policy/
  initiatives → takeaways, open-data → open-data page) once I5/I6 exist; wire the timeline in.
- Keep every existing caveat (ecological inference, OSM bias, ordinal data, no-displacement-claim)
  — reframe for readability, never drop.

## Acceptance criteria
- All pages follow the I1 template and shared components; duplicated inline CSS gone.
- Page count reduced by the three consolidations (or a documented reason why a merge was rejected).
- `/about` route unchanged, content updated, still self-contained (no live queries).
- Audience router covers all public audiences; `evidence build` green; links valid.

## Gate / sign-off
web-engineer-reviewer (build + render). Where the *framing of findings* changes (thesis-recheck,
methodology merge, home "the finding" section): domain-expert sign-off; statistical claims
changing: geo-data-scientist too (`I3-*-{domain,geo}-signoff.md`, Verdict: PASS before integration).

## Dependencies / relations
After I1 (spine) and I2 (final locations). Router completion depends on I4/I5/I6 pages existing.
Gates I13 (content revised is a launch criterion).

## References
- `docs/assessment/2026-07-10-storytelling-comms-review.md` (findings 1, 3, 4, 5)
- `docs/epic-i/storytelling-guide.md` (I1) · CLAUDE.md §Methodology gate (R-C1)
