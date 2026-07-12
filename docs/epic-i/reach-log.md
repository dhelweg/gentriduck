# I12 reach log

**Ticket:** I12 (#229). **Purpose:** one row per posted milestone, read manually from GoatCounter's
tagged-path/referrer view (no API integration, no credentials) plus platform-native metrics read
manually by the maintainer directly on each platform. See
`docs/epic-i/audience-channel-map.md` §6 for the campaign-link convention and per-persona reach
definitions this log reads against.

**How to use this log:** after the maintainer actually shares a post (this project's agents never
post — ADR-0021 §2), add one row below for each channel variant, reading GoatCounter's dashboard for
the `?ref=` tag used and noting one lesson. If a persona's reach proxy consistently under- or
over-performs relative to what the post targeted, feed that observation back into the audience map's
channel-fit guidance (§2/§3) — this log is the evidence trail for such an update, not a required
weekly ritual.

**Status as of this writing:** no post has been shared yet (all six I11 drafts are sign-off-complete
and awaiting the maintainer's manual posting decision, per ADR-0021 §2), and the GoatCounter
account/`GOATCOUNTER_CODE` deploy env var is a maintainer action still pending per ADR-0012 Amendment
B's own "Open follow-up" note. This template is committed now (per the I12 acceptance criteria) with
no worked row yet — the first real row is added after the first real post, once both the account and
the sharing decision exist.

## Log

| Date | Post | Channel | Campaign tag | Target persona | GoatCounter reading | One lesson |
|---|---|---|---|---|---|---|
| _(pending first real post)_ | | | | | | |

## Column guide

- **Post** — the short slug used in the campaign tag (e.g. `recheck`, `oa-fastfood`, `opmodel`,
  `opendata`, `timeline`), matching `docs/epic-i/posts/i11-<slug>-<channel>.md`.
- **Channel** — `LinkedIn` or `Bluesky/Mastodon`.
- **Campaign tag** — the exact `?ref=` value used in the post's link (e.g. `li-recheck`).
- **Target persona** — the primary persona the post's Step 2 named, per
  `docs/epic-i/audience-channel-map.md` §2.
- **GoatCounter reading** — what the tagged path/referrer view showed for that tag's window (a
  pageview count and, where visible, referrer breakdown) — read manually, no API pull, no
  credential stored anywhere in this repo.
- **One lesson** — one sentence: did the reach proxy for the target persona (§6's table) show up as
  expected, over-perform, or under-perform, and does it warrant revisiting the map's channel-fit
  guidance for that persona.

## Out of scope (per the I12 SPEC)

- Follower-count goals.
- Engagement-bait tactics.
- Any paid promotion.
- Any API integration or credential storage for platform-native metrics — those are read manually,
  directly on each platform, by the maintainer.
