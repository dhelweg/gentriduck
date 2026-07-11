# I11 post 3 ("The Offering-Advantage surprise" — fast-food signal) — geo-data-scientist comms sign-off

**Drafts covered:** `i11-oa-fastfood-linkedin.md`, `i11-oa-fastfood-bluesky.md`
**Source findings:** `docs/epic-e/E1-regression-findings.md` (H1b rows), `analysis/e1_regressions.py`,
`docs/epic-i/I15-oa-review-{geo,domain}-signoff.md` (#232, both PASS)
**Gate:** ADR-0021 §3 per-post sign-off — geo half, second in sign-off order (domain-expert PASS
already recorded in `i11-oa-fastfood-comms-domain-signoff.md`).
**Reviewer:** geo-data-scientist
**Date:** 2026-07-11

## Verdict: PASS

## What I verified independently

1. **Numbers match the source exactly.** `E1-regression-findings.md` line 41: raw-count H1b
   Spearman rho=0.1364, n=436, p=0.0043, PASS; line 44: OA-quotient H1b Spearman rho=0.3698,
   n=359, p<0.0001, PASS. Both drafts copy these figures verbatim (LinkedIn rounds to "more than
   twice as strong" — a conservative understatement of the true 2.71x ratio; Bluesky states
   "rho=0.14 → rho=0.37" directly). No inflation.
2. **The OA quotient is genuinely well-specified for this test, per prior sign-off.** OA-A.4's own
   geo condition C-3 (cited inline in `analysis/e1_regressions.py` line ~811, sourced from
   `docs/epic-b/A3-oa-validation-geo-signoff.md` §5) already authorizes the category-level
   exception used here specifically for H1b's fast-food test — this is not a new or ad hoc
   analytical choice invented for this post, it is a previously-signed-off design decision.
3. **The n=436→n=359 drop is correctly characterized — I checked the underlying null-handling
   myself.** Read `int_poi_offering_advantage.sql` (lines 316–332): `oa_category` uses
   `nullif(domain_stock_local, 0)` and `nullif(category_stock_city/domain_stock_city, 0)` in its
   denominators, so a PLR with **zero fast-food establishments** in a given period yields a NULL
   `oa_fast_food`, not a zero. `run_spearman()` in `analysis/e1_regressions.py` (lines 652–659)
   masks out NaNs before computing rho, which is exactly where the 77-row drop (436→359) comes
   from. This is accurately described in the Bluesky draft as "OA's own minimum-data requirement,"
   not a cherry-picked subsample — both figures are the full available panel for their respective
   predictor, confirmed by reading the code path, not just trusting the drafts' framing.
4. **Selection-effect risk, flagged as non-blocking.** The OA-quotient test is computed only over
   PLRs that *have* at least one fast-food establishment (the 359), while the raw-count test
   includes all 436 (including areas with zero fast-food POIs, which are a valid `poi_fast_food=0`
   observation, not NULL, for that test). This means the two rho values are not a perfectly
   apples-to-apples like-for-like comparison — the OA test's subsample is, by construction,
   restricted to areas where fast food is present at all. This is an inherent property of a
   location-quotient design (undefined where the local base is zero), already covered by the
   project's standing D-3 low-POI-base caveat (deferred per ADR-0017 D5), and is not something
   either draft claims to have controlled for — nor do the drafts overclaim a controlled
   comparison; both simply state the two results side by side with the sample-size difference
   disclosed (Bluesky explicitly, LinkedIn implicitly via the underlying page it links to). I do
   not consider this blocking: the direction and significance both replicate on the subsample, and
   the "gets stronger, not weaker" framing is honestly hedged by neither draft claiming causal
   proof or a controlled ablation — but flagging it so a future OA-vs-raw-count comparison post
   states this selection-effect caveat explicitly rather than only implying it via a bare n figure.
5. **No new statistical claim beyond what's already signed off.** This post asserts nothing that
   `E1-regression-findings.md`, `web/pages/thesis-recheck.md`, or the I15 sign-offs don't already
   establish — it is a comms restatement, not a new analysis. Consistent with the
   `comms-draft` skill's step-1 requirement ("the draft's claims may not exceed what the sign-off
   actually supports").
6. **Multiple-comparisons caveat, already covered.** H1b is one of several hypotheses tested in
   the same regression battery (`E1-E2-geo-signoff.md`'s standing non-blocking caveat: no
   multiple-comparison correction, "significance is descriptive, not confirmatory"). Neither draft
   claims confirmatory proof; both use "signal"/"correlate"/"association" language consistent with
   a descriptive, not confirmatory, read.
7. **I15 provenance claim is accurate.** The Bluesky draft's "this OA number only ships now
   because the OA calculation itself just cleared its own independent methodology review (#232)"
   is factually correct — `I15-oa-review-geo-signoff.md` independently hand-reconciled
   `oa_domain`/`oa_category` to floating-point exactness against raw counts before this post's OA
   figure could be quoted publicly. This is a provenance/honesty statement, not a claim that any
   number changed as a result of that review (it did not — I15 found no formula defect).

## Risks / notes (non-blocking)

- The OA-vs-raw-count subsample mismatch (point 4 above) — recommend a future revision or a
  reader-facing FAQ note make this explicit if this comparison is reused or extended.
- Same pre-existing OA risks already on record and unaffected by this post: `gaussian_500m` vs
  ADR-0017 D2.3's 1000m headline recommendation (OA-C.1 #174); D-3 low-POI-base instability
  (deferred, ADR-0017 D5) — neither is newly introduced or newly relevant here since this post
  uses `weight_variant='standard'`/domain-category OA, not the gaussian-weighted headline metric.

## Recommendations

- Both drafts are ready to hand off to the maintainer once this sign-off and the domain sign-off
  are both recorded PASS (domain-expert's is already PASS, above).
- If a future post directly juxtaposes the raw-count and OA-quotient H1b numbers with more
  emphasis on their ratio (rather than each on its own, as here), that revision should carry the
  selection-effect caveat from point 4 explicitly in-body, not just via a linked table.
