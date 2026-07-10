[I12] Reach measurement loop

## Why (problem)
"Optimize postings for maximum reach within the target audience" needs a feedback signal, or every
posting decision stays a guess. The project already has privacy-friendly analytics (GoatCounter,
ADR-0012 Amendment B) but no way to attribute site visits to a post, channel, or audience.

## Goal
A lightweight, free, privacy-respecting measurement loop: per-post campaign-tagged links, a simple
reading of what moved, and a cadence for feeding that back into the audience/channel map.

## Scope & approach
- **Free tools only; no new trackers.** GoatCounter referrer + path data plus simple campaign
  query parameters (e.g. `?ref=li-recheck`) on links in posts — convention documented so every
  I11 draft uses it.
- Define what "reach within the target audience" means per persona, observably: e.g. researchers →
  whitepaper/methodology page visits and citations; data community → repo stars/forks/clones and
  how-its-built visits; policy/initiatives → takeaways/PLR-profile visits; open-data → open-data
  page visits + discussions. Platform-native metrics (impressions/reactions) are read manually by
  the maintainer — no API integration, no credentials (I8 model).
- A tiny review template (`docs/epic-i/reach-log.md`): after each posted milestone, one table row —
  post, channel, campaign tag, what GoatCounter showed, one lesson → I9 map updated if warranted.
- Explicitly out of scope: follower-count goals, engagement-bait tactics, any paid promotion.

## Acceptance criteria
- Campaign-link convention documented and used by I11 drafts; GoatCounter confirmed to surface the
  tagged paths/referrers.
- Per-persona reach definitions written into the I9 map; `reach-log.md` template committed with
  one worked example row after the first real post.

## Gate / sign-off
architect (tooling stays within ADR-0012 Amendment B; nothing new adopted); PM owns the cadence.

## Dependencies / relations
After I8, I9; first real data arrives only after I13/first posts.

## References
- ADR-0012 Amendment B (GoatCounter, #194) · I8 ADR · I9 map
