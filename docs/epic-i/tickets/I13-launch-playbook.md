[I13] Launch playbook — going fully public

## Why (problem)
The site is deliberately soft-launched: `noindex` on every page and `robots.txt Disallow: /`
(#144). The maintainer's criteria for lifting that are now explicit — **content revised and
links/routes stable** — but nobody has written down the sequence, so "go public" would otherwise
happen ad hoc, and the one moment of maximum attention would be unprepared.

## Goal
A maintainer-gated, step-by-step launch playbook, executed once the criteria are met: the site
becomes indexable and the announcement pack goes out coherently across surfaces.

## Scope & approach
- **Launch criteria (checklist, all verifiable in-repo):** I1–I3 revision wave integrated; I2
  route map frozen; I4/I5/I6 pages live; I15 resolved (no known-wrong number on the site); I16
  map fixes in.
- **Technical flip:** remove the `postbuild-noindex.mjs` step + restore `robots.txt`; verify on
  the deployed site; coordinate with the #144/#146 hosting decision (GitHub Pages vs Cloudflare) —
  this ticket references, not duplicates, those.
- **Citability:** mint a DOI via Zenodo (free) for the dataset + whitepaper release; update
  `CITATION.cff`.
- **Announcement pack** (via `comms-draft`, per-item sign-offs): LinkedIn + Bluesky/Mastodon launch
  posts (I11 post 6), a "Show HN"-style text draft for the tech audience, a pinned repo
  Discussion, a cross-link from the 2018 thesis repo's README.
- **Timeline milestone:** add the "went public" entry to `/timeline`.
- Every outward step in the playbook is executed by the maintainer manually; agents prepare.

## Acceptance criteria
- Playbook committed (`docs/epic-i/launch-playbook.md`) with the criteria checklist mapped to
  verifiable artifacts; announcement pack drafted + signed off; DOI steps documented.
- Not executed until the maintainer says go — the flip itself is a human action.

## Gate / sign-off
**Maintainer-gated end to end.** Announcement content passes the I8 per-post gate; the noindex
removal itself lands via the normal weekly `develop → main` PR.

## Dependencies / relations
Last in the wave: after I1–I6, I14–I16 (content + routes), I8/I10/I11 (pack), I12 (tags ready).
References #144 (soft-launch), #146 (hosting re-assessment), O4 (#83, dataset release).

## References
- `web/scripts/postbuild-noindex.mjs` · `web/static/robots.txt` · ADR-0012 (+ Amendments) ·
  `CITATION.cff` · `docs/assessment/2026-07-10-storytelling-comms-review.md` (finding 10)
