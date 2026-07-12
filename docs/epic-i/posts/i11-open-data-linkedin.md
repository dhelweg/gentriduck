# I11 post 5 — "The open-data story" (P5 crossover), LinkedIn

## Step 1 — grounding

**Source finding:** `web/pages/open-data.md` (already-published, single-gate domain-signed-off
page, `docs/epic-i/I6-open-data-domain-signoff.md`, Verdict: PASS 2026-07-10) — specifically the
"What only worked *because* the data is open" section (the whole pipeline is rebuildable from
scratch with no paid account) and one item from "What was hard, concretely" (the CSV format-drift
incident, #50/#57/#58, and the CKAN 404s, #197), plus the closing "What this means for the
open-data debate" paragraph and its explicit non-legislative-conclusion disclaimer.

The I6 domain sign-off's own non-blocking recommendation is binding here: *"If this paragraph is
ever shortened for a social post (I11), the 'it draws no further conclusion about legislation or
policy' clause is the one that must survive intact... without it, a shortened version could read
as taking a side in the IFG debate."* This draft keeps that clause, in substance, in both variants
(Step 4).

No number in this draft is a gentrification-index statistic, value, or trend — it restates a data-
sourcing/engineering-friction fact and cites public GitHub issue numbers (not analysis output), so
per ADR-0021 §3 the geo-data-scientist sign-off is not triggered.

## Step 2 — audience/channel

Primary persona for this variant: **P5 — data engineers/analysts** (per
`docs/epic-i/audience-channel-map.md` §2), sharing LinkedIn with P1 per the map's channel table.
P5's "what convinces them" (concrete detail, cost/scale honesty, no vague stack-list claims) fits a
short account of "here's the actual friction of building on 100% free public data, plus what would
fix it." Secondary overlap with **P6** (open-data & civic-tech community), whose primary channel is
Bluesky — see the companion `i11-open-data-bluesky.md` for the more civic-tech-facing variant. No
area-level lead-lag claim; domain-expert-only sign-off per Step 1.

## Step 3 — draft (LinkedIn variant, plain-language)

> Every statistic on this site is built entirely from free, openly licensed data — no paid tool,
> no proprietary dataset, ever. That's not a caveat, it's the point: the whole pipeline reruns from
> a fresh checkout with no account and no API key.
>
> It also wasn't frictionless. One concrete example: a public population-register export changed
> its column layout across editions with no announced schema version — twice — breaking our parser
> outright each time, on top of three earlier bugs from the same source's undocumented decimal and
> missing-value conventions. The data was always free. Finding out it had changed shape wasn't.
>
> One fix a publisher could ship tomorrow: a one-line "columns changed in this edition" changelog
> note. That alone would have turned three separate bug-hunts into a single documented migration.
> Full friction log and the rest of the wishlist: [link to /open-data?ref=li-opendata]

(133 words in the visible post body.)

## Step 4 — self-check (ADR-0021 §4)

- **O3 non-advocacy:** describes this project's own engineering experience and one concrete,
  actionable publisher recommendation; no claim about legislation, IFG scope, or "what the law
  should say" — the I6 page's own non-legislative-conclusion boundary is respected by omission (this
  short variant does not include the IFG-adjacent paragraph at all, the cleanest way to preserve the
  boundary in a 133-word post — see Step 1).
- **O4 factual/non-promotional:** the format-drift incident and issue numbers (#50/#57/#58) are
  copied from the signed-off page; no superlative about the project ("groundbreaking",
  "best-in-class") appears; the only claim of value is "free, openly licensed data enables a
  rebuildable pipeline," which the page itself demonstrates and the domain sign-off already cleared.
- **No third-party personal data:** describes a public dataset's format history and public issue
  numbers; no individual or household identified.
- **Maintainer:** not named in this variant (not needed for this finding).
- **Displacement framing:** not applicable — no gentrification/displacement claim anywhere in this
  draft, consistent with the source page's own confirmed scope (I6 sign-off point 5).
- **One honest caveat kept in-body, not softened:** "it also wasn't frictionless" — stated plainly
  rather than buried, matching the source page's own "open does not mean easy" framing; the
  recommendation is scoped to publishing *practice*, not access or licensing, mirroring the source
  page's "Hard means engineering friction, not that the licences were wrong" caveat.

Self-check: **passes** all ADR-0021 §4 rules as drafted, and the I6 sign-off's specific
recommendation for I11 shortening (Step 1) is satisfied by omitting the IFG-adjacent paragraph
entirely rather than risking a partial restatement.

## Step 5 — commit

This file, committed under `docs/epic-i/posts/`. Campaign tag `?ref=li-opendata` follows the same
convention used by posts 1–4.

## Step 6 — sign-off request

Requesting **`gentrification-domain-expert`** only — record `Verdict: PASS` in
`i11-open-data-comms-domain-signoff.md` (covers both this and the companion Bluesky variant). No
geo-data-scientist sign-off requested per Step 1's reasoning; the domain-expert is specifically
asked to confirm (a) this triage call and (b) that omitting the IFG-adjacent paragraph in this
variant fully satisfies the I6 sign-off's shortening condition rather than creating a new risk.

## Step 7 — hand-off

Domain-expert sign-off recorded `Verdict: PASS` in `i11-open-data-comms-domain-signoff.md` (no geo-data-scientist sign-off required — confirmed by the domain-expert as correctly triaged, per Step 6). This draft is ready for the maintainer to review and post manually from their own account (ADR-0021 §2) on their own cadence.
