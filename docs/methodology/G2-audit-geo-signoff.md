---
task: G2-audit / #262 — public methodology page carry-forward caveat reconciliation
author: geo-data-scientist
date: 2026-07-16
branch: feature/262-g2-audit
---

# Geo-DS methodology sign-off — G2 audit (`docs/epic-g/G2-audit-checklist.md`)

- **Branch:** `feature/262-g2-audit`
- **Issue / task:** #262 [G2-audit] — reconcile the public methodology page(s) against every
  accumulated "carry-to-G2" condition and close any gaps.
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Artefacts reviewed:**
  - `docs/epic-g/G2-audit-checklist.md` (the audit itself)
  - `web/pages/methodology.md` (diff — 4 additions)
  - `web/pages/berlin/poi-map.md` (diff — 1 addition)
  - `docs/epic-g/tickets/G2-oa-publish-gates.md` (new follow-up ticket)
  - Cross-reference: every source cited in the checklist's table (R-A1/A3/A4/A5/A7/A9 geo-signoffs,
    C4/C5-geo-signoffs, B9-geo-signoff, ADR-0010, ADR-0017, `spatial-methods.md`)

This is methodology-bearing under R-C1 (touches the governed public methodology framing), but it is
a **verification-and-disclosure** pass, not a new statistical/spatial method — no new indicator,
weight, normalization, or spatial operation is introduced. My review is therefore focused on whether
the audit's claims about what is/isn't already on the page are actually correct (I independently
re-checked each), and whether the two "not yet run" analytical gaps it surfaces are honestly framed
rather than either overstated or hidden.

## a. Are the 13 checklist rows independently verifiable, and did I find the same result as the audit for each?

**Yes, I re-derived each row independently** (grep against `web/pages/methodology.md` and
`web/pages/berlin/poi-map.md` for the relevant terms, then read the surrounding context) rather than
trusting the audit's table at face value:

- Rows 1, 3, 4, 6, 7, 8, 11, 13 ("Present"): confirmed present with the cited language.
- Rows 2, 5 ("Missing", now fixed): confirmed these were genuinely absent before this branch (I
  checked the pre-branch `develop` version of both files) and that the added text correctly restates
  the sign-off language (§2's Mikrozensus caveat matches R-A5 §9 condition 3 verbatim in substance;
  §5's 3→4 drift caveat matches R-A3-domain-signoff §d's stated framing "comparable in interpretation
  but not computed from an identical input set" almost word-for-word — an appropriately conservative
  restatement, not a new interpretation).
- Row 9/10 (isotropic-catchment + bandwidth gate): I confirmed independently that neither term
  appeared anywhere in `web/pages/**/*.md` before this branch (`grep -rln "isotropic|bandwidth"` was
  empty), and confirmed via `analysis/a6_maup.py` and the absence of any OA-specific 500/1000/1500m
  sweep script that the actual bandwidth-fragility test (ADR-0017 C-4) genuinely has never been run
  — this is not an audit overstatement.
- Row 12 (LISA/Gi*): I confirmed independently that no `web/pages/**` file surfaces Moran's
  I/LISA/Gi* results (`grep -rln` across `web/pages` returned nothing), so R-A9 condition 3's
  "when these are surfaced on G2" trigger is correctly judged not yet active. I concur this is not a
  current gap — but flag (as the audit already does) that whoever eventually builds a public
  hotspot/diffusion feature must re-check this condition at that time, not assume it's been
  discharged by this audit.

## b. Is the D-3 minimum-POI-base gap (found while investigating row 10) real, and is the disclosure honest rather than either overclaiming or downplaying?

**Real, and honestly framed.** I independently confirmed `int_poi_offering_advantage.sql`'s own
header defers the flag "to a later ticket" and that no suppression/flag column exists anywhere
downstream (`mart_poi_offering_advantage`, the poi-map page). The added disclosure text ("planned but
not yet applied... read a PLR's OA cautiously if its raw POI count... is low") is calibrated
correctly: it neither claims the map already handles this (it doesn't) nor omits it, and it gives the
reader an actionable workaround (check the tooltip's raw POI count) rather than a bare "trust us"
caveat. This is the right honest-disclosure posture given the gap cannot be closed within this
ticket's scope.

## c. Is scoping the actual bandwidth sweep + min-POI-base implementation to a new follow-up ticket (rather than doing it here) the right call?

**Yes.** Both are genuine new analytical/engineering work (a 500/1000/1500m OA re-computation and
cross-bandwidth rank-correlation test; a suppression-threshold design decision for the min-POI-base
flag), not a mechanical documentation fix — conflating them into this audit ticket would blur a
verification-and-disclosure pass with new methodology work that itself would need its own scrutiny
(e.g., what suppression threshold is defensible, whether the bandwidth sweep should use the same
{500,1000,1500}m grid as A6-MAUP or a different one for OA specifically). Filing
`G2-oa-publish-gates.md` as a separate, explicitly-scoped, methodology-bearing follow-up is the
correct sequencing — it also does not let the two genuinely-still-open ADR-0017 obligations get lost
again the way they did before this audit.

## d. Any spatial-method (CRS/MAUP) concern?

None. No geometry, spatial join, or CRS handling is touched by this ticket — it is a documentation
reconciliation pass over existing, already-audited page content.

---

## Verdict

```
Verdict: PASS
```

**Rationale.** I independently re-verified all 13 checklist rows and reached the same conclusions as
the audit for each; the two genuinely missing caveats (rows 2, 5) are correctly and conservatively
restated from their source sign-offs; the two upstream-obligation gaps surfaced while resolving row
10 (bandwidth-fragility test, min-POI-base flag) are honestly disclosed rather than hidden or
overstated, and correctly scoped to a new follow-up ticket rather than folded into new analytical
work here. No defect found.

### Conditions (must be satisfied before this reconciliation is considered complete)

- **C1 — The interim "not yet tested/applied" disclosures added by this ticket must be updated (not
  left standing indefinitely) once `G2-oa-publish-gates` actually runs the bandwidth sweep or
  implements the min-POI-base flag** — an honest interim disclosure is not a substitute for closing
  the underlying gap; carry this obligation forward explicitly (already stated in that ticket's own
  acceptance criteria).
- **C2 — If a future feature surfaces LISA/Gi*/diffusion results publicly**, the FDR/multiple-testing
  disclosure (R-A9 condition 3) must be added to that feature's page at that time — this audit
  correctly found it not-yet-required, not permanently exempt.

### Recommendations (non-blocking)

- **R1 — Consider a recurring (e.g., quarterly) re-run of this audit pattern** rather than a one-off:
  the fact that two genuine gaps (rows 2, 5) and two forgotten publish-gate obligations accumulated
  silently is itself evidence that carry-forward conditions need periodic re-verification, not just a
  one-time sweep.

---

*Methodology gate (R-C1): this is the geo-data-scientist sign-off. A `gentrification-domain-expert`
domain sign-off is also required before the PM may integrate into `develop`.*

## Sources

- `docs/epic-g/G2-audit-checklist.md` (the audit under review)
- `docs/methodology/R-A1-geo-signoff.md`, `R-A3-domain-signoff.md`, `R-A4-geo-signoff.md`,
  `R-A5-domain-signoff.md`, `R-A7-geo-signoff.md`, `R-A9-geo-signoff.md` (carry-forward condition
  sources)
- `docs/epic-b/B9-geo-signoff.md`, `docs/epic-c/C4-geo-signoff.md`, `docs/epic-c/C5-geo-signoff.md`
- `docs/adr/0010-spatial-distance-weighting.md`, `docs/adr/0017-poi-offering-advantage-revival.md`
- `docs/methodology/spatial-methods.md` §7 (bandwidth sweep specification)
- `docs/epic-e/C1-three-way-comparison-findings.md` ("remain open obligations" framing)
- `transform/models/intermediate/int_poi_offering_advantage.sql` header (D-3 deferral)
