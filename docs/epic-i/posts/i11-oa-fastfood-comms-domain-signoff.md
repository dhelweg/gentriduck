# I11 post 3 ("The Offering-Advantage surprise" — fast-food signal) — gentrification-domain-expert comms sign-off

**Drafts covered:** `i11-oa-fastfood-linkedin.md`, `i11-oa-fastfood-bluesky.md`
**Source findings:** `docs/epic-e/E1-regression-findings.md` (H1b rows), `web/pages/thesis-recheck.md`,
`docs/epic-i/I15-oa-review-findings.md` + `I15-oa-review-{domain,geo}-signoff.md` (#232)
**Gate:** ADR-0021 §3 per-post sign-off — domain half, first in sign-off order (also carries I15's
four binding wording conditions on this specific post, per `I15-oa-review-domain-signoff.md`
recommendations).
**Reviewer:** gentrification-domain-expert
**Date:** 2026-07-11

## Verdict: PASS

## What I checked

1. **Claims trace to the source docs exactly.** rho=0.1364 (n=436, raw count) and rho=0.3698
   (n=359, OA quotient) are copied verbatim from `E1-regression-findings.md` lines 41/44. The
   "more than twice as strong" (LinkedIn) and "rho=0.14 → rho=0.37" (Bluesky) framings both
   conservatively restate the actual 2.71x ratio without inflating it into a round "3x" or a vaguer
   superlative. No number is rounded favorably.
2. **H1b's "contested proxy" framing is theoretically accurate and correctly attributed.** The
   thesis itself (p.55) frames fast-food density as a *contested* signal in the gentrification
   literature — not a settled one — because fast-food chains occupy an ambiguous position: they can
   read as a low-status/disinvestment marker (cheap, high-turnover retail filling vacated space) or,
   in some readings, as an early-stage commercial intensification signal. The Bluesky draft's
   explicit "not a settled claim" (tweet 2) correctly preserves this contestation rather than
   flattening H1b into an uncontroversial fact — this is domain-sound and a meaningfully more
   careful framing than most public retellings of "retail signals gentrification" would bother with.
3. **D-1 descriptive-not-causal, explicitly kept.** Both drafts state the finding is "a descriptive
   signal, not a cause" (LinkedIn) / "a status/pressure correlate, not a mechanism" (Bluesky). This
   is the load-bearing caveat for a finding this easy to over-read as causal ("fast food *causes*
   decline") when the actual claim is a correlational commercial/social co-occurrence.
4. **D-2 multi-sign explicitly respected — I15 condition (c).** Both drafts state this is "one
   indicator among many, not a stand-alone gentrification score" (LinkedIn) / explicitly name that
   Offering-Advantage is a multi-signed bundle where vacancy-OA reads oppositely (Bluesky tweet 5).
   Neither draft sums OA domains or presents the fast-food reading as OA's single headline meaning —
   satisfies the binding condition from `I15-oa-review-domain-signoff.md`.
5. **I15 condition (a) — no "data correction" mislabeling.** I specifically checked whether either
   draft references the `/area/[code]` radar de-duplication bug I15 diagnosed (a page-display
   defect, not a data defect). Neither draft mentions the radar or any prior "bug" at all — the
   claim is drawn entirely from the separate `analysis/e1_regressions.py` citywide regression path,
   which was never affected by the display bug. There is no data-fix language to mis-describe, so
   this condition is satisfied by non-applicability, correctly reasoned rather than glossed over.
   The Bluesky draft does reference "the OA calculation itself just cleared its own independent
   methodology review (#232)" — this is accurate (the OA formula was independently confirmed
   correct, per I15) and is not a claim that any *number* was corrected; it is a provenance/honesty
   note about why this post could only ship now, which is itself good practice, not a violation.
6. **O3 non-advocacy / O4 factual.** Neither draft recommends action toward any area, business
   category, or policy; no promotional superlative about the project appears (the only "strength"
   language describes the statistical finding, sourced directly from the signed-off table).
7. **No third-party personal data.** Citywide aggregate statistics across 359–436 anonymous planning
   areas; no individual, household, or named business is identified — materially different from
   naming a specific PLR or business, and not attempted here.
8. **Displacement framing.** "Lower social status / displacement pressure" restates the thesis's own
   H1b hypothesis wording and `index-definition.md` §5's polarity convention; both drafts keep this
   explicitly descriptive rather than predictive of any specific outcome for any specific place or
   person.
9. **No area-level lead-lag claim.** This is a citywide cross-sectional correlation (H1b), not a
   timing/lead-lag claim (that would be H3a/H3b territory) and no single PLR is named — the §4
   dual-use note (which specifically concerns area-named lead-lag timing signals) does not apply;
   standard sign-off order (domain first, then geo-DS) is confirmed correct.

## Risks (non-blocking)

- "Fast food" as a category label could be read by some audiences as implicitly disparaging a type
  of business or its owners/patrons rather than describing a retail-composition pattern. Both drafts
  stay in descriptive register ("fast-food outlets," "the fast-food association") rather than
  editorializing about the businesses themselves, which is the correct register — flagging only as
  a reason future variants of this post should keep the same discipline, not a defect in this draft.
- The Bluesky thread's tweet 4 provenance note ("this OA number only ships now because...") is a
  fine honesty addition but should not become a template for implying every future OA-based post
  needs its own "just cleared review" caveat once I15's PASS is generally on record — this is
  reasonable for the *first* OA-quotient claim to ship post-I15, not a permanent requirement.

## Recommendations

- Proceed to geo-data-scientist sign-off, with a specific ask to confirm the n=436→n=359 sample-size
  explanation (OA's zero-denominator row omission) is accurately characterized, and that the rho
  comparison (raw count vs. OA quotient) is a fair like-for-like statistical comparison rather than
  an artifact of the differing samples.
