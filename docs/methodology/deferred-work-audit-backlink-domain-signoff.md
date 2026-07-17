# Domain sign-off — deferred-work-audit back-links & SPECs

Verdict: PASS

- **Reviewer:** gentrification-domain-expert (urban-sociology / housing-policy theory gate, R-C1)
- **Branch:** `feature/deferred-work-audit-specs` → `develop`
- **Date:** 2026-07-14
- **Gate trigger:** touches `docs/adr/**` and `docs/methodology/**` (methodology-bearing).
- **Co-gate:** geo-data-scientist signs statistical soundness separately; this note covers
  domain/framing validity only.

## Scope reviewed

Full diff vs `develop` (50 files, +513/-30):
- 15 new backlog SPEC docs under `docs/epic-*/tickets/` + index
  `docs/planning/deferred-work-audit-2026-07.md`.
- One-line `**(Follow-up now tracked: #NNN …)**` back-references appended to source ADRs
  (0008, 0018, 0019), `docs/methodology/index-definition.md`, several `*-signoff.md` files,
  the G2 public methodology page, and six intermediate model SQL comment headers + `schema.yml`.

## What I checked

1. **Annotations are non-substantive.** Every doc/ADR/methodology/sign-off edit is a *purely
   additive* ticket cross-reference. None alters a displacement/gentrification framing, ethics
   statement, caveat, sign, polarity, or verdict. The R-A1 "leaves the D5 slot, does not populate
   it" language, the ADR-0018 "descriptive predictor ≠ causal DiD" distinction, the R-A8
   "improving ≠ unambiguously positive without D5" caveat, and the `improving-vulnerable` tension
   framing all survive verbatim, with only a trailing pointer added.

2. **Code diff is comment-only + formatting.** The six SQL / `schema.yml` changes add
   `-- Follow-up now tracked: #NNN` comments; the sole non-comment change in
   `dim_area_hierarchy.sql` is a sqlfmt WHERE-clause reflow (no logic, no method change).

3. **Sensitive SPECs frame future work responsibly, assert no conclusions:**
   - **D5-wire (#258):** explicitly labels Milieuschutz a *policy marker, not a measured
     displacement outcome*; requires the caveat that `improving` cannot be read as positive
     without D5; dual-gate required before integration. Describes work to be gated, no finding.
   - **A10-P2 (#259):** goal is to move a claim "from signal toward effect" via DiD/event-study,
     with identifying assumptions documented "candidly (hard with observational open data)";
     flags causal displacement claims as ethically sensitive; dual gate. No result pre-committed.
   - **I20-school-xcheck (#270):** display-only, "not an index input", bound to I20's
     "inform, never recommend" rule. Non-advocacy.
   - **G2-audit (#262):** a trust-preserving reconciliation of carry-forward caveats against the
     published page — strengthens, does not weaken, public framing.
   - Remaining methodology-bearing SPECs (D3-brw-change, R-A8b, R-B2b, OA-ablation, QA-winsor,
     I-coarse-index, C-craft-taxonomy) each cite their source condition, mark the ⚖️ dual gate,
     and describe a decision/build to be gated later rather than asserting an outcome. I-coarse-index
     correctly treats a coarse-grain index value as an open MAUP decision (may be declined).

4. **No public-facing claim introduced.** The two sentences added to the G2 page reference the
   internal audit ticket (#262) only; they add no gentrification assertion and change no caveat.

## Conditions / notes for when these tickets are built

These are reminders for the *future* gated slices, not blockers on this traceability branch:

- **D5-wire (#258) & A10-P2 (#259)** carry the heaviest ethics load. At build time enforce:
  Milieuschutz is a designation/intervention signal (per ADR-0019 / index-definition §1.8), not a
  displacement *count*; keep it as a policy-marker overlay, never as a typology stage. Causal
  (DiD) language must stay separated from the descriptive predictor per ADR-0018.
- **G2-audit (#262)** should confirm the `improving`/`improving-vulnerable` ambiguity and the
  "Milieuschutz = policy marker" caveat actually appear on the live page once D5 lands.
- **Minor, non-blocking (route to web/geo reviewers):** the G2 public page now carries an internal
  ticket number (#262) in reader-facing prose. Consider phrasing that as a generic
  "under active review" note rather than an internal issue ID when the audit closes.

## Verdict rationale

This is a traceability-only branch: additive back-links plus well-scoped backlog SPECs that defer
all methodology decisions to their own future dual-gated slices. It introduces no indicator, sign,
weight, normalization, or framing change, and pre-commits to no finding. Domain-fidelity risk: none.

Verdict: PASS.
