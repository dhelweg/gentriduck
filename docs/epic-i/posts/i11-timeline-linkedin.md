# I11 post 6 — "The timeline" (P4 crossover), LinkedIn

## Step 1 — grounding

**Source finding:** `web/pages/timeline.md` (already-published, signed-off site page, I4 #221,
merged into `develop`/`main` — the page's own header note documents that every milestone date is
curated from a citable repo artifact: an ADR acceptance date, an issue close date, a sign-off
document's date, or the 2018 thesis's golden-output file dates — never derived from `git log`,
which is squashed). This draft restates a subset of the page's own milestone entries verbatim: the
2018 thesis origin, the 2026-06-17 revival inception (ADR-0001), the 2026-06-19 "what the gates
caught" methodology-remediation entry (already independently restated and domain-signed-off in
`i11-operating-model-linkedin.md`; this draft does not duplicate that finding's detail, only names
the arc it belongs to), ADR-0011's autonomous `develop`-integration model, and the 2026-07-09
Hamburg second-city milestone. No new claim beyond what the timeline page itself records.

No number in this draft is a gentrification-index statistic, indicator value, or trend direction —
every fact restated is a project-milestone date or a governance-process fact (an ADR's existence,
an issue's close date), so per ADR-0021 §3 the geo-data-scientist sign-off is not triggered;
domain-expert sign-off is requested for O3/O4 framing and the non-advocacy/non-promotional register.

**I13 linkage (per the I11 SPEC's own framing, "pairs with I13's launch"):** this draft is the
milestone/story post, not the "Show HN"-style launch-announcement post — the audience-channel map's
own P4 entry lists those as two separate items ("planned timeline (I4)" as an already-served page,
vs. "a one-off 'Show HN'-style launch post (I13) once the site is stable" as a distinct future
artifact). I13 itself (#230) is currently `blocked` and out of scope for this cycle; drafting this
post does not require I13 to exist or resolve — it is grounded entirely in the already-signed-off,
already-merged `/timeline` page, and simply notes (Step 4) that the page itself already carries an
honest "one more entry pending" caveat about the eventual public-launch milestone. The I13 launch
announcement itself, when that ticket unblocks, is separate future work — not a gap in this post.

## Step 2 — audience/channel

Primary persona for this variant: **P4 — tech & AI practitioners** (per
`docs/epic-i/audience-channel-map.md` §2 — the map explicitly lists "planned timeline (I4)" as a
page that already serves this persona), shared with LinkedIn as a crossover per the map's channel
table (P4's primary channel is Bluesky/Mastodon — see the companion `i11-timeline-bluesky.md` for
the thread-native primary variant). No area-level lead-lag claim, no PLR named — standard
(non-P1/P2-dual-use) sign-off order applies: domain-expert only, per Step 1's reasoning.

## Step 3 — draft (LinkedIn variant, plain-language)

> A 2018 master's thesis on Berlin gentrification sat still for eight years. In mid-2026 a
> supervised team of AI agents revived it from scratch on a modern, free, local-first stack — and
> then grew it into something the original thesis never was: multi-city, and rebuildable by anyone.
>
> The short version of that arc: rebuild and re-check the original methodology; catch and fix a
> real construct-validity drift the hard way (a later review found the index had started measuring
> the wrong thing, which is exactly the kind of error a mechanical sign-off gate exists to catch);
> publish a versioned, citable methodology whitepaper; and prove the "any city" design promise for
> real, with a second city's data staged end to end on the same shared model.
>
> Every date in that arc is cited to a repo artifact — an ADR, a sign-off document, an issue close
> date — not to commit history, which doesn't preserve this project's actual decision timeline.
> Full timeline: [link to /timeline?ref=li-timeline]

(132 words in the visible post body.)

## Step 4 — self-check (ADR-0021 §4)

- **O3 non-advocacy:** describes this project's own history and process; no claim about how other
  projects or AI-assisted engineering "should" be run generally.
- **O4 factual/non-promotional:** every milestone (thesis date, revival inception, the
  methodology-remediation review, the whitepaper, the Hamburg staging) is copied from the
  already-signed-off `/timeline` page; "grew it into something the original thesis never was" is a
  plain factual comparison (multi-city vs. single-city, rebuildable vs. not), not a superlative
  about quality ("groundbreaking", "best-in-class" do not appear).
- **No third-party personal data:** the maintainer's authorship of the 2018 thesis is already public
  (the thesis itself, `CITATION.cff`); no other individual named.
- **Maintainer:** referenced only via the already-public thesis-authorship fact, consistent with
  how the source `/timeline` page itself attributes it.
- **Displacement framing:** not applicable — no gentrification/displacement finding or number is
  stated anywhere in this draft, only project-history milestones.
- **One honest caveat kept in-body, not softened:** "prove the... design promise... with a second
  city's data staged end to end" is stated as *staged*, not launched — matching the source page's
  own explicit framing of Hamburg as "staged, unpublished, proving the adapter pattern before any
  second-city launch decision" rather than overstating it as an already-public second city.

Self-check: **passes** all ADR-0021 §4 rules as drafted.

## Step 5 — commit

This file, committed under `docs/epic-i/posts/`. Campaign tag `?ref=li-timeline` follows the same
`?ref=li-recheck`/`?ref=li-oa-fastfood`/`?ref=li-opmodel`/`?ref=li-opendata` convention used by
posts 1–5.

## Step 6 — sign-off request

Requesting **`gentrification-domain-expert`** only — record `Verdict: PASS` in
`i11-timeline-comms-domain-signoff.md` (covers both this and the companion Bluesky variant, per the
same-findings convention posts 1–5 used). Per Step 1, no geo-data-scientist sign-off is requested:
this draft makes no gentrification-index statistic, value, or trend claim, so ADR-0021 §3's
geo-trigger does not apply here. The domain-expert is specifically asked to confirm this triage call
is correct, and that the "staged, not launched" framing of the Hamburg milestone is not overstated.

## Step 7 — hand-off

Domain-expert sign-off recorded `Verdict: PASS` in `i11-timeline-comms-domain-signoff.md` (no
geo-data-scientist sign-off required — confirmed by the domain-expert as correctly triaged, per Step
6). This draft is ready for the maintainer to review and post manually from their own account
(ADR-0021 §2) on their own cadence.
