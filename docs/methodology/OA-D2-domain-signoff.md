# OA-D2 (#240, ADR-0024) — gentrification-domain-expert R-C1 sign-off

- **Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory gate)
- **Artifact under review:** `int_poi_offering_advantage_arealevel.sql` — area-hierarchy roll-up of
  the faithful nested-LQ OA construct to `bzr`/`pgr`/`bezirk`.
- **Date:** 2026-07-17
- **Grounding (R-C2):** `docs/methodology/OA-D0-domain-signoff.md` Condition D (ecological-fallacy /
  coarse-grain public-labelling caveat) and Guardrail E (Epic-B nested-LQ-only framing).

---

## Verdict: PASS

D2 does not introduce a new theoretical claim: it is the same OA construct (Isard 1960 location
quotient, applied per ADR-0017 D1's parent-relative nesting), computed over a coarser spatial support.
The interpretation of OA-as-descriptive-early-gentrification-signal (D-1/D-2 from ADR-0017's original
sign-off) is unchanged and correctly not re-litigated here.

## What I checked

1. **No new construct, no new claim.** `oa_domain`/`oa_category`/`oa_type` at `bzr`/`pgr`/`bezirk`
   grain are the identical formula, the identical sign convention (Vacancy-domain OA still reads as
   disinvestment, not amenity), and the identical multi-signed-bundle caveat (D-2, "never sum raw
   oa_* across types") as the PLR-grain model. Nothing in this ticket changes what OA *means* — only
   at what spatial resolution it is *observed*.
2. **Condition D (ecological-fallacy caveat) — correctly deferred, not silently dropped.** The model
   itself carries no labelling/framing layer (it is an intermediate model, not a public surface), and
   its header/schema.yml explicitly states: *"Any consumer publishing a coarse-level (pgr/bezirk)
   figure MUST carry the domain sign-off's binding Condition D ecological-fallacy... framing — not
   enforced by this model itself."* This is the correct place to draw the line — D2 is plumbing, D7
   (the methodology page) is where the "BZR is the recommended public headline scale, Bezirk is
   context-only, PLR is the Kiez succession front but D-3-unstable" framing must actually appear before
   any figure at this grain reaches a reader. I re-affirm that Condition D remains **binding on D7 and
   any earlier consumer** (e.g., a D6 choropleth mart) — this sign-off does **not** discharge it, it
   only confirms D2 itself does not need to.
3. **Guardrail E (Epic-B nested-LQ-only) — unaffected.** D2 only extends the nested-LQ (the sole
   2018-golden-anchored construct); it does not touch or promote any of the D3 "everything" methods.
   The Epic-B directional-anchor framing is preserved.
4. **Small-N risk at Bezirk is a real, cautionary observation, not a defect.** 12 Bezirke is a small
   population for any downstream inferential use (e.g., a future regression treating Bezirk as the
   unit of analysis) — flagging this now so it is not forgotten by the time D6/D7 build a public
   Bezirk view: Bezirk-level figures are for *context*, and should never be the basis for a claim about
   within-Bezirk (Kiez-level) succession dynamics, which is exactly what Condition D already says.
   No action needed in this model; restating for the record since D2 is where the row count first
   becomes visible in the warehouse.

## Untrusted input (SEC-3)

This review consumed only in-repo code and the OA-D0 sign-off docs — no external/untrusted content.

**Verdict: PASS**
