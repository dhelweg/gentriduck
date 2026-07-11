# I11 post 4 — "The operating model" (P4 primary), Bluesky/Mastodon

## Step 1 — grounding

Same source as the LinkedIn variant: `docs/process/retrospective.md` "Methodology gate enforcement
(R-C1)", `web/pages/how-its-organised.md`, and `docs/process/operating-model.md` "The coder ↔
reviewer ↔ gate loop" — see `i11-operating-model-linkedin.md` Step 1 for the full citation chain and
the reasoning for why no geo-data-scientist sign-off is triggered (no gentrification-index
statistic, value, or trend is claimed anywhere in this draft).

## Step 2 — audience/channel

Primary persona: **P4 — tech & AI practitioners** (per `docs/epic-i/audience-channel-map.md` §2).
Channel fit: Bluesky/Mastodon primary, thread-native, technical specificity over breadth per the
map's own P4 format guidance ("one real mechanism per post... 'how the methodology gate blocked a
merge' is a stronger post than 'we use AI agents'"). This thread follows that guidance directly:
one concrete mechanism (the R-C1 gate's mechanization after catching a real construct-validity
drift), not a general pitch for the agent-team approach. No area-level lead-lag claim, no PLR named;
domain-expert-only sign-off per Step 1.

## Step 3 — draft (Bluesky/Mastodon variant, thread)

> 1/ This project's data pipeline is built by a team of specialised AI agents — a coder, an
> independent reviewer, and (for anything touching the actual index) two domain-authority agents
> who must both sign off before anything merges. Here's a real case of that gate catching something,
> not just existing on paper.
>
> 2/ Early on the gate was advisory: a reviewer could record "concerns" and the work still shipped.
> A later deep review found this had let real drift accumulate — the live gentrification index was
> treating raw commercial-POI counts *as* the social-status measure, when the thesis this project
> revives used POIs only as *predictors* of a separately measured social outcome (Berlin's own
> welfare-register data). Committed "validation" scripts were even testing hypotheses the thesis
> never made, and calling the result a validation.
>
> 3/ Nobody caught this earlier through more careful review — a reviewer sharing the coder's framing
> tends to check *within* that framing, not challenge it. What caught it was a fresh-context review
> explicitly looking for construct drift, not correctness bugs.
>
> 4/ The actual fix wasn't "review harder" — it was making the gate mechanical. A documented
> sign-off file with a recorded `Verdict: PASS` is now a hard prerequisite the process checks before
> any merge; missing or qualified blocks integration outright, no reasoning-past-it allowed. The
> project's own retrospective states the lesson plainly: "advisory gates are not gates."
>
> 5/ This isn't presented as a solved problem forever — the same "enforced, not infallible"
> discipline caught and disclosed a separate, unrelated data-join error *after* it was already live
> on the public site (documented on the site itself, not scrubbed from the record).
>
> 6/ Full agent roster, the exact gate mechanics, and every sign-off file this project has produced
> — public, not summarized-away: [link to /how-its-organised?ref=bs-opmodel]

(~290 words across the thread.)

## Step 4 — self-check (ADR-0021 §4)

- **O3 non-advocacy:** an account of this project's own engineering practice; no claim about how AI
  agent teams generally should be run, no pitch for adopting this exact model.
- **O4 factual/non-promotional:** every specific claim (the advisory-gate failure mode, the
  POI-as-index-vs-predictor drift, the mechanized sign-off requirement, the later post-publication
  catch) is copied from `docs/process/retrospective.md` and the already-published
  `how-its-organised.md` page; no hype language ("cutting-edge", "powerful AI pipeline") anywhere —
  matches P4's own stated "what alienates them."
- **No third-party personal data:** describes agent roles, a process incident, and a public issue
  number; no individual named beyond the maintainer (not named in this variant).
- **Maintainer:** not named in this variant (not needed for this finding).
- **Displacement framing:** not applicable — no gentrification/displacement claim anywhere in this
  draft.
- **One honest caveat kept in-body, not softened:** tweet 5 explicitly states the gate discipline is
  not a solved-forever guarantee, citing the later post-publication catch rather than presenting the
  R-C1 fix as having eliminated all future error — the single most important caveat for a thread
  whose whole point is "the gate works," since overclaiming that would itself be the kind of
  overclaim P4 explicitly distrusts.

Self-check: **passes** all ADR-0021 §4 rules as drafted.

## Step 5 — commit

This file, committed under `docs/epic-i/posts/`. Campaign tag `?ref=bs-opmodel`.

## Step 6 — sign-off request

Requesting **`gentrification-domain-expert`** only — record `Verdict: PASS` in
`i11-operating-model-comms-domain-signoff.md` (the same file covers both this and the LinkedIn
variant, since both restate the same underlying findings with the same claims — no per-channel
duplication of the sign-off artifact). No geo-data-scientist sign-off requested; see Step 1 and the
LinkedIn variant's Step 6 for the reasoning, which the domain-expert is specifically asked to
confirm as correct triage, not just to review O3/O4 framing.

## Step 7 — hand-off

Domain-expert sign-off recorded `Verdict: PASS` in `i11-operating-model-comms-domain-signoff.md` (no geo-data-scientist sign-off required — confirmed by the domain-expert as correctly triaged, per Step 6). This draft is ready for the maintainer to review and post manually from their own account (ADR-0021 §2) on their own cadence.
