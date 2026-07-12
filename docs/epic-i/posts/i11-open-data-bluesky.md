# I11 post 5 — "The open-data story" (P6 primary), Bluesky/Mastodon

## Step 1 — grounding

Same source as the LinkedIn variant: `web/pages/open-data.md` (see
`i11-open-data-linkedin.md` Step 1 for the full citation chain and the I6 sign-off's binding
recommendation on preserving the "draws no further conclusion about legislation or policy" clause
if the closing paragraph is referenced in a shortened I11 post). Unlike the LinkedIn variant, this
thread *does* reference that closing paragraph (P6's persona explicitly cares about the open-data
debate context), so the disclaimer clause is carried over in substance, not summarized away — see
Step 4.

## Step 2 — audience/channel

Primary persona: **P6 — open-data & civic-tech community** (per
`docs/epic-i/audience-channel-map.md` §2), including the "data publisher" secondary reader the map
names for this persona. Channel fit: Bluesky/Mastodon primary per the map's channel table. Format
guidance followed directly: lead with one concrete friction incident, close with a specific,
actionable recommendation, never editorialize toward the IFG debate — reusing the source page's own
closing-paragraph discipline verbatim rather than paraphrasing loosely, exactly as the map instructs
for this persona. No area-level lead-lag claim; domain-expert-only sign-off per Step 1 (no
gentrification-index number is claimed anywhere in this thread).

## Step 3 — draft (Bluesky/Mastodon variant, thread)

> 1/ Every result on this project's site — including an independent re-check of an eight-year-old
> academic thesis — was built entirely from data German public bodies already publish under free
> licences, at zero cost, with no special access request. That's not incidental; it's the whole
> reason this project could exist as a from-scratch rebuild.
>
> 2/ Open didn't mean easy, though. Concrete incident: OpenStreetMap's own public download server
> doesn't publish full-history extracts — only a mirror does, and only to a logged-in contributor
> account. The *data* is ODbL-open; getting a full-history pull still needed a personal login and a
> manual, unrepeatable step a fresh checkout can't reproduce unattended.
>
> 3/ Same pattern elsewhere: a population-register export changed column layout across editions
> with zero announced schema version, twice, breaking our parser each time; a dataset catalogue
> entry 404'd after its slug moved with no redirect; an official boundary reform shipped with no
> old→new area crosswalk, so we built one ourselves.
>
> 4/ None of this is a complaint that the licences are wrong — every source above is genuinely free
> and open. The friction is entirely about format, discoverability, and documentation practice, not
> access being restricted.
>
> 5/ What would fix it, concretely: versioned/changelogged schemas, redirects instead of dead
> catalogue slugs, boundary crosswalks published alongside boundary reforms, documented categorical
> and suppressed-value semantics, no login gate on bulk historical extracts of already-open data,
> and machine-readable formats over PDF for anything that's fundamentally a table.
>
> 6/ This project is one small, concrete data point in the open-government-data debate: it proves
> real analysis is possible on free public data alone. We state that observation and stop there —
> this thread draws no further conclusion about legislation or policy, and neither does the page it
> comes from. Full friction log and licence table: [link to /open-data?ref=bs-opendata]

(~300 words across the thread.)

## Step 4 — self-check (ADR-0021 §4)

- **O3 non-advocacy:** tweet 6 states the project's own observation and explicitly disclaims any
  legislative/policy conclusion, reusing the source page's own boundary language rather than a
  paraphrase — directly satisfies the I6 sign-off's binding recommendation for any I11 shortening
  of this paragraph.
- **O4 factual/non-promotional:** every incident (OSM login gate, EWR format drift, CKAN 404,
  boundary-reform crosswalk gap) is copied from the signed-off page; no superlative about the
  project's own quality; the wishlist items are the page's own six recommendations, not invented
  or exaggerated.
- **No third-party personal data:** public datasets, public issue history, no individual named.
- **Maintainer:** not named in this variant (not needed for this finding).
- **Displacement framing:** not applicable — no gentrification/displacement claim anywhere in this
  draft, consistent with the source page's confirmed scope (I6 sign-off point 5).
- **One honest caveat kept in-body, not softened:** tweet 4's explicit "none of this is a complaint
  that the licences are wrong... the friction is entirely about format, discoverability, and
  documentation practice" — carried over verbatim in substance from the source page's own "Honest
  caveats" section, pre-empting the most likely misreading (that this is a grievance piece about
  restricted access) for exactly the audience (P6, including data publishers) most likely to read
  it that way if the caveat were dropped.

Self-check: **passes** all ADR-0021 §4 rules as drafted, and the I6 sign-off's binding
recommendation on the IFG-adjacent clause is satisfied by carrying the disclaimer over in substance
rather than paraphrasing it loosely or dropping it.

## Step 5 — commit

This file, committed under `docs/epic-i/posts/`. Campaign tag `?ref=bs-opendata`.

## Step 6 — sign-off request

Requesting **`gentrification-domain-expert`** only — record `Verdict: PASS` in
`i11-open-data-comms-domain-signoff.md` (the same file covers both this and the LinkedIn variant).
No geo-data-scientist sign-off requested; the domain-expert is specifically asked to confirm (a)
this triage call and (b) that tweet 6's carried-over disclaimer clause fully satisfies the I6
sign-off's binding recommendation, since this is the one variant that references the IFG-adjacent
paragraph at all.

## Step 7 — hand-off

Domain-expert sign-off recorded `Verdict: PASS` in `i11-open-data-comms-domain-signoff.md` (no geo-data-scientist sign-off required — confirmed by the domain-expert as correctly triaged, per Step 6). This draft is ready for the maintainer to review and post manually from their own account (ADR-0021 §2) on their own cadence.
