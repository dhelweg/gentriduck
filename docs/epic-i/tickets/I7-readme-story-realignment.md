[I7] README & story realignment

## Why (problem)
The README pitches the project as "a public website of gentrification & social-development
statistics" — one of its four public stories. The methodology contribution, the supervised-agent
operating model, and the open-data case study are buried or absent; the roadmap stops at Epic H;
the ADR range cited ("ADR-0001 … ADR-0016") is stale. The README is the repo's front door and
should tell the same story as the revised site.

## Goal
A README whose opening tells the full multi-audience story and whose status/roadmap reflect
Epic I, without losing the excellent setup/rebuild documentation.

## Scope & approach
- Rework the title pitch: the project is a public statistics site **and** a quantified-methodology
  revival **and** a documented supervised-agent operating model **and** an open-data case study —
  two or three tight sentences, not a wall of claims. Keep the register factual and
  non-promotional (O3/O4).
- Add Epic I to the Roadmap line and Status paragraph; fix the stale ADR range (link "the ADR
  index" instead of hard-coding numbers, so it can't go stale again).
- Link the new pages (timeline, takeaways, open-data) and the whitepaper/`docs/process/` per
  audience — a compact "start here depending on who you are" pointer mirroring the site's router.
- Leave setup, rebuild, contributing, licence sections intact except link fixes.

## Acceptance criteria
- README opening covers all four public stories in ≤ 5 sentences; roadmap/status include Epic I;
  no hard-coded ADR range; new pages linked once live.
- Register check: factual, non-promotional, no personal positioning.

## Gate / sign-off
PM + data-analyst; domain-expert framing glance (lightweight — README restates, it does not
create findings). Not methodology-bearing.

## Dependencies / relations
After I1 (spine wording); page links land as I4/I5/I6 ship (may merge in two steps: pitch first,
links later).

## References
- `docs/assessment/2026-07-10-storytelling-comms-review.md` (§4) · `README.md` ·
  `docs/epic-i/storytelling-guide.md` (I1)
