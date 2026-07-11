# I11 post 3 — "The Offering-Advantage surprise" (fast-food signal story), LinkedIn

## Step 1 — grounding

**Source findings (all already signed off, no new claim made in this draft):**
- `docs/epic-e/E1-regression-findings.md` H1b rows: thesis hypothesis "more fast-food outlets →
  lower status / displacement pressure" (p.55). Raw-count Spearman rho=0.1364 (n=436, p=0.0043,
  PASS); OA-quotient Spearman rho=0.3698 (n=359, p<0.0001, PASS) — the OA-quotient reading is
  markedly stronger than the raw-count reading, both in the thesis's expected direction.
- `web/pages/thesis-recheck.md` ("What still matters for social science today" — "Fast food as a
  durable down-signal, strengthened by the thesis's own predictor (H1b)") — already-published,
  signed-off page copy this draft restates, not extends. The page's own H1b table row ("Robust,
  strengthens under the thesis's own predictor") is quoted for direction/strength language.
- `docs/epic-i/I15-oa-review-findings.md` + `I15-oa-review-{domain,geo}-signoff.md` (#232, both
  PASS): confirms the OA location-quotient calculation itself (the predictor this post's headline
  number depends on) is correctly implemented and independently hand-reconciled to floating-point
  exactness. This post was held per the I11 ticket's own scope note ("held until I15 passes") for
  exactly this reason — the OA number could not be quoted publicly before its own calculation was
  cleared.
- **I15's binding wording conditions on this post**, applied below: (a) I15 diagnosed a **display**
  bug (an `/area/[code]` radar chart rendering duplicate points for a leaf-grain domain, `docs/
  epic-i/I15-oa-review-findings.md` §1), not a data bug — this post does not reference that radar
  investigation at all (it draws only on the citywide H1b regression, a separate analysis path
  from `analysis/e1_regressions.py`, not the `/area` page), so there is no "data correction" to
  mis-describe; (b) D-1 descriptive-not-causal — kept explicit below; (c) D-2 multi-sign — this
  post cites one specific category-level indicator (fast-food OA), not a summed or domain-level
  "gentrification score," and does not present it as OA's only or headline read; (d) low-POI-base
  caution — not applicable here (the numbers are citywide Spearman correlations across
  n=359–436 PLRs, not a single sparse-PLR percentage).

No number in this draft exceeds what the cited sign-offs support; the OA-quotient rho=0.3698
figure is copied verbatim from `E1-regression-findings.md` line 44.

## Step 2 — audience/channel

Primary persona: **P1 — policy makers/city administration** (per
`docs/epic-i/audience-channel-map.md` §2) — a plain-language, checkable, non-jargon finding tied to
an official-source-grounded methodology, exactly what convinces this persona. Secondary overlap
with **P3** (urban researchers), whose primary channel is Bluesky — see the companion
`i11-oa-fastfood-bluesky.md` draft for the more technical variant. No area-level lead-lag claim and
no single named PLR — this is a citywide, aggregate directional finding — so the standard
(non-P1/P2-dual-use) sign-off order applies: domain-expert first, then geo-DS, both required
because a number/trend is claimed.

## Step 3 — draft (LinkedIn variant, plain-language)

> The obvious gentrification story is the artisan coffee shop replacing the corner bakery. Our
> re-test of a 2018 Berlin thesis found something less flattering to that narrative: across 436
> planning areas, it's a rise in **fast-food outlets** — not cafés — that tracks most consistently
> with lower social status and displacement pressure.
>
> And the signal doesn't fade under closer scrutiny — it sharpens. Measured as a raw shop count,
> the correlation is real but modest. Measured the way the original thesis actually intended (a
> location-quotient share of the local retail mix, not a headcount), it gets **more than twice as
> strong**, and holds on Berlin's own official social-monitoring data years after the original
> study.
>
> This is a descriptive signal, not a cause — it says where pressure already shows up in the
> commercial mix, not why, and it's one indicator among many, not a stand-alone "gentrification
> score." Full numbers and method: [link to /thesis-recheck?ref=li-oa-fastfood]

(143 words in the visible post body.)

## Step 4 — self-check (ADR-0021 §4)

- **O3 non-advocacy:** no "the city should act on this" language; states a descriptive finding and
  its evidentiary strength, nothing more.
- **O4 factual/non-promotional:** "more than twice as strong" restates rho 0.1364 → 0.3698 (a
  2.7x increase) conservatively rounded down, not inflated; no superlative about the project itself
  ("groundbreaking", "powerful") appears — the only claim of strength is about the *finding*,
  sourced directly from the signed-off page/table.
- **No third-party personal data:** citywide aggregate statistic across 436 anonymous planning
  areas; no individual, household, or named business.
- **Maintainer:** not named in this variant (not needed for this finding).
- **Displacement framing:** "lower social status / displacement pressure" restates the thesis's own
  H1b hypothesis wording and the source page's polarity convention; explicitly framed as
  descriptive ("says where pressure already shows up... not why"), matching D-1 (descriptive-not-
  causal) from the I15 sign-off's binding conditions.
- **D-2 multi-sign respected:** the post is explicit that this is "one indicator among many, not a
  stand-alone gentrification score" — directly satisfies I15's condition (c).
- **One honest caveat kept in-body, not softened:** "This is a descriptive signal, not a cause" —
  the single most important caveat for a finding this easy to over-read as causal or as "the"
  gentrification metric.

Self-check: **passes** all ADR-0021 §4 rules and all four I15 binding wording conditions as
drafted.

## Step 5 — commit

This file, committed under `docs/epic-i/posts/`. Campaign tag `?ref=li-oa-fastfood`, following the
`?ref=li-recheck`/`?ref=bs-backtest` convention already used by posts 1–2 (formal documentation of
the tagging scheme is I12's own scope, not duplicated here).

## Step 6 — sign-off request

Requesting **`gentrification-domain-expert`** (framing/ethics, first) and **`geo-data-scientist`**
(statistical accuracy of the restated findings, second) — record `Verdict: PASS` (or
conditions/FAIL) in `i11-oa-fastfood-comms-domain-signoff.md` and
`i11-oa-fastfood-comms-geo-signoff.md` respectively, applying the I15 sign-off's four binding
wording conditions on top of the standard ADR-0021 §4/§3 checks.

## Step 7 — hand-off

Both required sign-offs recorded `Verdict: PASS` — `i11-oa-fastfood-comms-domain-signoff.md` and
`i11-oa-fastfood-comms-geo-signoff.md`. This draft is ready for the maintainer to review and post
manually from their own account (ADR-0021 §2) on their own cadence — no agent posts, schedules, or
holds any platform credential.
