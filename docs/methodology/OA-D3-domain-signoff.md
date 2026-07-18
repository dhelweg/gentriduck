# OA-D3 (#240, ADR-0024) — gentrification-domain-expert sign-off

**Verdict: PASS**

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with `OA-D3-geo-signoff.md`).
- **Artifact under review:** `int_poi_offering_advantage_methods.sql` + `mart_poi_oa_methods.sql`
  + `seed_oa_calculation_methods.csv` — the CORE six calculation-method columns
  (`nested_lq`, `global_lq`, `log_lq`, `share_diff`, `shrunk_lq`, `raw_share`) applied to the
  EXISTING faithful nested-LQ's domain/category/type stock, reviewed against the binding
  conditions this exact scope already carries from `OA-D0-domain-signoff.md`.
- **Reviewer:** gentrification-domain-expert.
- **Date:** 2026-07-17.

---

## Summary judgement

This slice is **low domain-risk relative to the rest of the D-spine**: it re-expresses the SAME
already-approved construct (the offering-advantage location quotient) six different mathematical
ways, all still at the domain/category/type taxonomy grain OA already carries. It does **not** touch
the within-group dominance model (D4 — the ticket that actually introduces cuisine/nationality-coded
type concentration and the ethnic-stigma hazard my OA-D0 Condition B.3 is about), does **not** add
density or per-capita (Condition C — deferred here to D3b), and does **not** publish anything on a
site page (D6/D7 — no page exists yet to misrepresent a new method as "the 2018 result"). The
Condition-E guardrail ("only nested-LQ is the 2018 construct, the others are new instruments") is
therefore the operative condition for this slice, and it is satisfied.

## Verification against OA-D0 Condition E (the operative condition for this slice)

- **`nested_lq` remains the sole golden-anchored, thesis-fidelity column.** The model header states
  this explicitly ("the sole golden-anchored method... Epic B directional anchor") and the seed's
  `golden_anchored` column records `true` only for `nested_lq`, `false` for all five new methods —
  machine-readable, not just prose, which is the right level of enforcement for a claim this load-
  bearing.
- **The five new methods are correctly framed as new instruments, not redefinitions.** Each seed row
  carries its own `formula_summary`, `unit`, and `reference_point`, and the model's inline comments
  state each method's interpretive question (over/under-representation vs. city-relative
  over/under-representation vs. log-symmetric magnitude vs. pp-difference vs. small-sample-corrected
  ratio vs. raw composition share) — satisfying my OA-D0 Condition C.4 "every figure labelled with the
  question it answers, nothing blended" one level early (D3, not just D7), which is the right
  direction to front-load this discipline.
- **`global_lq` at domain level is documented as identical to `nested_lq`, not silently duplicated.**
  A reader encountering two numerically-identical columns without explanation could reasonably
  suspect a bug or a hidden blend; the model header, schema description, and a dedicated regression
  test all state this is a proven mathematical identity (domain has no third level above it for
  "city-relative" to diverge through), which pre-empts exactly that misreading.

## Verification against the deferred scope (correctly out of this slice)

- **No dominance construct is introduced here.** D4 (HHI/top-share/entropy/evenness) is where my
  OA-D0 Conditions A (signal-domain allow-list) and B (dominance ethics, incl. the cuisine-typed
  anti-stigma clause B.3) actually bind — this slice's six methods are all still the OA
  location-quotient family (a ratio, log-ratio, pp-difference, or shrunk ratio of the SAME
  local-vs-city share), not a within-group concentration index, so B.3's cuisine-stigma hazard does
  not apply to what was built here. I will re-review B/D4 conditions when D4 itself is submitted.
- **No density or per-capita.** My OA-D0 Condition C (denominator-endogeneity for per-capita,
  MAUP/centrality-confound for density, never-share-an-axis-with-the-LQ-family) is correctly deferred
  to OA-D3b, which the geo sign-off notes is additionally gated on a system-architect ruling for
  Getis-Ord's tooling boundary. I have no domain objection to that split; if anything, deferring
  density/per-capita until their specific caveats can be attached is the more disciplined ordering
  than shipping all ten methods in one undifferentiated batch.
- **`shrunk_lq`'s small-sample correction is domain-appropriate and reinforces, not
  replaces, the existing D-3 anti-erasure posture.** #274 already established that a thin PLR-year's
  min-base flag must ANNOTATE, never suppress/delete, because low OSM coverage correlates with
  peripheral/lower-income areas (Haklay 2010) — a blanked cell risks stigmatizing exactly the
  under-mapped Kieze this project protects. `shrunk_lq` does not change that posture: it is offered
  as an ADDITIONAL orthogonal instrument (a de-noised reading for a caller who wants a stabilized
  ratio instead of a flagged raw one) and the raw `nested_lq` + the min-base flag remain fully
  intact and unmodified. No suppression, deletion, or reinterpretation of the anti-erasure guardrail
  occurred.
- **`raw_share`'s correct temporal-unsafe framing.** The seed's
  `expected_temporal_safe = false` for `raw_share` (the C3 directional expectation, D5's job to
  formally test) is domain-consistent with why: a bare composition share moves with OSM completeness
  growth over time, and reading that as "gentrification progressing" without the coverage caveat
  would repeat exactly the completeness-conflation error #274/the D-3 discussion already guards
  against elsewhere in this model family. Correctly flagged as an expectation for D5 to confirm, not
  asserted as already proven here.

## Epic B framing (re-confirmed)

Consistent with OA-D0 Condition E and CLAUDE.md's Epic B framing (directional revival, not
number-for-number reproduction): this slice adds analytical breadth around the existing directional
anchor without altering or re-deriving it. `nested_lq`'s values are an unmodified pass-through of
`int_poi_offering_advantage.oa_domain/oa_category/oa_type` — verified by the geo sign-off's
mass-conservation/identity checks and by this review's read of the model SQL.

## Untrusted input (SEC-3)

This review consumed only in-repo code, the OA-D0 domain sign-off, ADR-0024, and the model/schema
diffs — no web-fetched or non-maintainer issue text was treated as instructions.

---

**Verdict: PASS.** The six core calculation-method columns correctly extend the already-approved OA
construct without touching the higher-risk dominance/density/per-capita/Gi* scope where my OA-D0
conditions (A, B, C) actually bind, correctly preserve `nested_lq` as the sole 2018-golden anchor
(Condition E), and correctly defer the harder-caveat modes to OA-D3b. No new domain condition is
attached to this slice; OA-D0's Conditions A/B/C/D remain binding on D3b/D4/D6/D7 as originally
scoped.
