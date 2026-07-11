# I11 post 2 — "The back-test" (P1), LinkedIn

## Step 1 — grounding

**Source finding:** `docs/methodology/backtest.md` (B2 ground-truth back-test harness, latest run
2026-06-29, "Overall result: ALL PASS"). Every number below is copied verbatim from that document's
Test B and Test C results. Test A (Spearman rho=1.0 between `gentrification_index.status_index`
and `int_gentrification_ts.status_index`) is a **pipeline-consistency check** — both columns encode
the same MSS D1 ordinal via two independent model paths, not two different measurements — and is
deliberately **not** presented in this draft as evidence of predictive accuracy; the domain/geo
sign-off should confirm this framing choice is correct, since misreading Test A as "the index
predicts reality with rho=1.0" would be a false-precision overclaim the backtest document itself
does not make.

## Step 2 — audience/channel

Primary persona: **P1 — policy makers/city administration** (per
`docs/epic-i/audience-channel-map.md` §2) — "which areas show gentrification pressure now, in
language that doesn't require a stats background" is exactly what Tests B/C answer. No area-level
lead-lag claim (hotspot/coldspot recall is a **validation** check against known areas, not a
timing/prediction claim about when an area will change), so the standard sign-off order applies:
domain-expert first, then geo-DS (numeric claims are made).

## Step 3 — draft (LinkedIn variant, plain-language)

> Before trusting any index, check it against what's already known. We tested Gentriduck's live
> gentrification index against ~20 Berlin planning areas independently documented in academic
> literature and Berlin's own official social monitor as either under gentrification pressure or
> long-term stable.
>
> Result: **8 of 8** documented pressure areas landed in the index's most-vulnerable decile. **6 of
> 6** documented stable areas landed in its least-vulnerable decile. Neither is a coincidence at
> that sample size, and both are stronger than the minimum bar we set before running the test.
>
> This isn't a claim the index predicts the future — it's a check that it correctly reads areas
> whose status is already independently known, before we trust it to say anything about areas that
> aren't. Full methodology and every area named: [link to /methodology?ref=li-backtest]

(133 words in the visible post body.)

## Step 4 — self-check (ADR-0021 §4)

- **O3 non-advocacy:** no "the city should act on area X" language; describes a validation
  exercise, not a call to action.
- **O4 factual/non-promotional:** 8/8 and 6/6 are copied exactly from Tests B/C; "stronger than the
  minimum bar we set" restates the backtest doc's own >=50% threshold vs 100% achieved — not an
  invented superlative. Test A's rho=1.0 is deliberately **omitted** from this variant to avoid a
  false-precision read (see Step 1) — the pipeline-consistency finding is not itself a policy-
  relevant claim for this persona.
- **No third-party personal data:** the 14 named PLRs in the backtest doc are places, not people;
  no individual/household identified.
- **Maintainer:** not named (not needed for this finding).
- **Displacement framing:** "most-vulnerable" language mirrors the backtest doc's own
  vulnerability-positive orientation (`docs/methodology/index-definition.md` §5); no claim any
  specific resident will be displaced.
- **One honest caveat kept in-body:** "this isn't a claim the index predicts the future" —
  explicitly distinguishes retrospective validation from forecasting, the single most important
  caveat for this claim.

Self-check: **passes** all ADR-0021 §4 rules as drafted.

## Step 5 — commit

This file, committed under `docs/epic-i/posts/`. Campaign tag `?ref=li-backtest` follows the same
I12 worked-example convention.

## Step 6 — sign-off request

Requesting **`gentrification-domain-expert`** (first) and **`geo-data-scientist`** (second) —
record `Verdict: PASS` in `i11-backtest-comms-domain-signoff.md` and
`i11-backtest-comms-geo-signoff.md`. Geo-DS should specifically confirm the decision to omit Test A
from this public-facing draft (Step 1) is the statistically correct framing choice, not merely a
convenient one.

## Step 7 — hand-off

Both required sign-offs recorded `Verdict: PASS` — `i11-backtest-comms-domain-signoff.md` and `i11-backtest-comms-geo-signoff.md`. This draft is ready for the maintainer to review and post manually from their own account (ADR-0021 §2) on their own cadence.
