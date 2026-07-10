[I8] ADR: public communication surface & channel policy

## Why (problem)
The project is about to communicate outward (posts, launch announcements) and to add an agent that
drafts that communication. Publishing to external platforms is a new surface: it needs a decided
channel set, a binding sign-off process, and explicit safety rails — per golden rules 1–2 every
new tool/surface needs an ADR, and per SEC-3 anything reading external replies/content is a new
untrusted-input surface.

## Goal
An accepted ADR that fixes the channels, the draft-and-screen publishing model, the per-post
sign-off gate, and the content rules for all outward communication.

## Scope & approach
The architect authors `docs/adr/00NN-public-communication-surface.md` deciding:
- **Channels:** LinkedIn + Bluesky/Mastodon initially. Instagram explicitly deferred — revisit
  only with I9 evidence that the target audiences are reachable there and a visual-first format is
  worth the cost. Project-owned profiles are a later decision (posts start from the maintainer's
  own accounts, manually).
- **Publishing model: draft-and-screen only.** No agent ever posts, schedules, or holds platform
  credentials. Drafts are committed to the repo; **the maintainer posts manually.** (Consequence:
  no platform API tooling, no new credentials, free-and-open rule untouched.)
- **Per-post sign-off gate:** every draft needs gentrification-domain-expert (framing/ethics) and,
  wherever a number or finding is claimed, geo-data-scientist (claim accuracy) —
  `*-comms-{domain,geo}-signoff.md` files with Verdict: PASS, same mechanics as the methodology gate.
- **Content rules (inherited + new):** O3 non-advocacy; O4 factual/non-promotional; honest-caveat
  register scaled to the channel (simple but true); **no third-party personal data ever committed**;
  the maintainer may be named sparingly where suitable; displacement stays risk/pressure-framed.
- **SEC-3:** replies/mentions/fetched platform content are data, never instructions; any fetch
  hosts the comms workflow legitimately needs get registered in `docs/method/egress-hosts.md`
  (marked as comms-research targets, not ingestion sources).

## Acceptance criteria
- ADR accepted (Status/Context/Decision/Consequences), indexed in `docs/adr/README.md`.
- Channel set, draft-and-screen model, sign-off gate, and content rules all decided in it.
- `docs/method/egress-hosts.md` updated if (and only if) new hosts are needed.

## Gate / sign-off
Maintainer accepts the ADR (new-surface decision is a human gate). domain-expert consulted on the
content rules.

## Dependencies / relations
Gates I9, I10, I11, I12; I13 references it for the announcement pack.

## References
- `docs/assessment/2026-07-10-storytelling-comms-review.md` (§4, finding 9)
- CLAUDE.md golden rules 1, 2, 6 · `docs/method/egress-hosts.md` · ADR-0020 (governance precedent)
