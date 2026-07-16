# G2-audit Domain Sign-off — public methodology page carry-forward caveat reconciliation (#262)

- **Author:** gentrification-domain-expert
- **Date:** 2026-07-16
- **Scope:** theory-fidelity and public-framing validity of `docs/epic-g/G2-audit-checklist.md` and
  the two live-page edits it produced (`web/pages/methodology.md`, `web/pages/berlin/poi-map.md`) —
  a reconciliation of every accumulated "carry this to the public methodology page" condition against
  what is actually published.
- **Artefacts reviewed:** `docs/epic-g/G2-audit-checklist.md`, the diffs to both web pages,
  `docs/epic-g/tickets/G2-oa-publish-gates.md` (new follow-up), and the companion
  `docs/methodology/G2-audit-geo-signoff.md`.
- **Companion gate:** geo-data-scientist statistical/spatial sign-off — `PASS` (see above), required
  before the PM may integrate.

## Assessment

### a. Is a trust-focused audit of "did a mandatory public caveat actually land" the right kind of gate for this project?

**Yes, and overdue in exactly the way the ticket frames it.** A public statistics product that
claims a caveat is binding at the sign-off stage but never re-verifies it reached the actual
publication is a real trust failure mode, not a hypothetical one — this audit's own findings prove
the risk was live: two genuinely mandatory caveats (the Mikrozensus ≥2017 restriction and the 2023
MSS indicator-set change) had silently not made it onto the page despite being explicitly flagged as
required in three separate sign-offs each. This is exactly the failure the R-C1 gate exists to
prevent, and a periodic reconciliation pass (as the geo sign-off's Recommendation R1 suggests) is a
sound institutional response.

### b. Are the two added caveats (Mikrozensus break, 3→4 MSS indicator drift) framed correctly for a lay public audience?

**Yes.** Both additions preserve the "document divergences, don't smooth over" discipline already
established throughout this page. The Mikrozensus addition correctly states the restriction as a
plain fact ("restricts any comparison... to 2017 onward") without over-explaining the German census
methodology reform to a lay reader — appropriately scoped detail for this page's stated register
(§8 already links out to the full technical version for anyone wanting more). The 3→4 MSS drift
addition is particularly well-calibrated: it states the Senate's own continuity-in-spirit position
("class continuity in spirit... remain comparable in interpretation") while still giving the reader
the concrete, actionable caution ("a small movement... around 2023 should not be over-read as a
sudden real change") — this correctly avoids two failure modes I would otherwise flag: overstating
the break as invalidating the whole series, or understating it as a non-issue.

### c. Are the OA isotropic-catchment and bandwidth-fragility/min-POI-base disclosures appropriately humble, and is scoping their actual resolution to a new ticket the right call from a public-trust standpoint?

**Yes.** This is the more consequential finding of the two upstream gaps (rows 9/10, plus the
adjacent D-3 discovery), and the domain-appropriate response is exactly what was done: disclose the
limitation honestly *now*, on the live page, rather than wait for the "proper" analysis to be run
before saying anything — silence here would have been the worse trust failure, since the OA
correlation and per-PLR map are *already* live and being read by visitors today. The added language
("has not yet been tested," "planned but not yet applied") is calibrated correctly — it does not
claim false precision about an untested property (e.g., it does not guess whether OA actually is or
isn't bandwidth-fragile), and it gives the reader a concrete mitigation (check the raw POI count in
the tooltip) rather than an abstract disclaimer. Filing the actual resolution as its own
methodology-bearing ticket (`G2-oa-publish-gates`) rather than rushing a same-ticket bandwidth sweep
or suppression-threshold decision is the right sequencing: a suppression threshold is itself a real
domain judgment call (what counts as "too thin a POI base" is not a mechanical fact) that deserves
its own dedicated review, not a rider on an audit ticket.

### d. Ecological-fallacy / individual-inference guardrail

Not newly implicated by this ticket — no new individual-level claim is introduced. The audit
correctly leaves the existing PLR-aggregate framing (row 13, Milieuschutz; the pre-existing §6
ecological-fallacy bullet) untouched, which is the right call: this ticket's job is reconciliation of
existing commitments, not a re-litigation of already-settled framing.

### e. Row 12 (LISA/Gi*/FDR) — is "not currently a gap because not currently surfaced" the correct reading, or does this let a future feature accidentally skip the caveat?

**Correct reading, with the caveat correctly flagged as time-bound, not permanently discharged.**
R-A9's own condition explicitly ties the requirement to the moment these statistics are "surfaced on
G2" — since no public page currently shows a hotspot/diffusion map, there is genuinely nothing to
caveat yet. I concur with the geo sign-off's Condition C2 that this must be re-checked, not assumed
resolved, whenever such a feature is eventually built. Recording that expectation explicitly in this
audit (rather than silently closing the row as "done") is the correct way to prevent this specific
condition from being lost the same way rows 2/5 were.

---

## Verdict

```
Verdict: PASS
```

**Rationale.** The audit correctly identifies genuine gaps against the accumulated sign-off record,
restates the fixed caveats in appropriately plain, non-overclaiming language for a lay audience, and
handles the two harder upstream gaps (OA bandwidth-fragility, min-POI-base) with the right
professional posture: honest disclosure now, properly scoped follow-up work later, rather than either
silence or a rushed same-ticket fix. The time-bound framing of the LISA/Gi* row is correctly reasoned
and does not create a future loophole. No defect requiring rework.

### Conditions (must be satisfied before this reconciliation is considered complete)

- **D1 — The interim OA disclosures are a stopgap, not a resolution.** `G2-oa-publish-gates` must
  actually run the bandwidth sweep and implement the min-POI-base flag in a timely follow-up, and the
  page text must be updated to the resolved state at that time (mirrors geo sign-off Condition C1).
- **D2 — If OA rankings are found to be bandwidth-fragile** when that follow-up runs, the resulting
  public framing must not merely note fragility abstractly but state concretely what that means for
  how much to trust the OA-based findings already published in §7 (e.g., whether the
  directional-disagreement-with-theory finding in §7 itself would be sensitive to bandwidth choice).
- **D3 — Re-check the LISA/Gi*/FDR caveat requirement** the first time any spatial-hotspot or
  diffusion-model result is surfaced publicly (mirrors geo sign-off Condition C2).

### Recommendations (non-blocking)

- **D4 — Consider surfacing this checklist itself (or a summary) as a linked artifact from §8
  "Further reading"** on the methodology page, so a technically-inclined reader can see the full
  reconciliation process, not just its outputs — mirrors the existing pattern of linking sign-off
  documents from §7/§8.

---

*Methodology gate (R-C1): this is the gentrification-domain-expert sign-off, required alongside
the geo-data-scientist `PASS` above before the PM may integrate into `develop`.*

## Sources

- `docs/epic-g/G2-audit-checklist.md` (the audit under review)
- `docs/methodology/G2-audit-geo-signoff.md` — companion statistical/spatial sign-off
- `docs/methodology/index-definition.md` §1.2 — ecological-fallacy guardrail (G-2), unchanged by
  this ticket
- `docs/adr/0017-poi-offering-advantage-revival.md` conditions C-4, D-1, D-3
