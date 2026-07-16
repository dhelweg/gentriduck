# Geo-Data-Scientist Decision: I-coarse-index (#267) — coarse-grain gentrification index at BZR/PGR/Bezirk (MAUP)

- **Scope:** #267 `I-coarse-index` — branch `feature/267-coarse-index` (no code yet; decision-first ticket).
- **Type:** Methodology **decision** (pre-implementation), R-C1 methodology-bearing.
- **Author:** geo-data-scientist (statistical / spatial-aggregation validity lane).
- **Companion:** `gentrification-domain-expert` decides the theory-fidelity / ecological-overclaim lane in parallel.
- **Date:** 2026-07-17
- **Verdict:** **CONCERNS → DECLINE the single headline value; ship distribution-only (option c).**

---

## 1. Question

I18 (#242) built Bezirk/PGR/BZR profile pages showing sums + child-stage **distributions** but
deliberately **no re-scored index value**, flagging the point value as a MAUP methodology decision.
#267 asks: is a single coarse-grain gentrification-index *value* defensible, and if so via
(a) re-score from coarse-grain raw inputs, (b) population-weighted aggregate of PLR scores, or
(c) distributional summary only (decline the point value)?

## 2. What already exists (material to the decision)

- `int_mss_bzr_aggregate.sql` (B10 #120) already computes a BZR/Bezirk rollup by
  **population-weighted mean of PLR ordinal status/dynamik codes, rounded and clamped** — i.e.
  option (b). Its own header states this **"DIFFERS from the Senate/thesis method"** (which
  re-z-scores aggregated raw s1–s4 indicators within the coarser population then re-classifies),
  and is **"fit for the directional MAUP probe but may mis-stage boundary BZRs/Bezirke."** It is an
  internal diagnostic, deliberately **not** published on the I18 pages.
- I18 pages already publish the honest coarse-grain answer: sum-then-recompute counts/shares and the
  **distribution of child PLRs over the six typology stages** (option c), geo-signed off.

## 3. MAUP / statistical analysis

**Ordinal constraint (binding).** D1 (1–4) and D2 (1–3) are **ordinal categorical** constructs
(ADR-0008 §1; R-A3 geo-signoff C2: "must **not** average the class codes as if metric"). Option (b)
— population-weighted mean of the *codes* — treats ordinals as interval/ratio data. This is the exact
statistical error ADR-0008 forbids, and the existing `int_mss_bzr_aggregate` rounding-of-a-mean is
already flagged as a diagnostic-only approximation. **Option (b) is rejected for any published value.**

**Re-scoring from raw inputs (option a) is the *only* per-value-defensible route, but not sound to
ship now.** The Senate's real coarse method (`reference/system/50_lor_mss_idx_bzr_z.sql`) re-z-scores
aggregated raw indicators within the coarser population then re-classifies — which respects the
ordinal rule because the class is re-derived from metric inputs, not averaged. But porting it here has
three unresolved problems:
1. **Predictor re-scoring is reference-distribution-dependent.** D3 (POI) and D4 (EWR composite)
   sub-scores are z-scores against the **PLR** distribution. Re-z-scoring at BZR (~143) / PGR (~58) /
   Bezirk (12) changes the reference set; a Bezirk-grain z-score over n=12 units is a different,
   low-n construct, not "the same index, coarser." This is textbook MAUP zonation sensitivity.
2. **The index is a hybrid typology, not a single scalar** (ADR-0008 §1, hybrid architecture). There
   is no governed scalar to re-derive cleanly at coarse grain; re-scoring would require re-deciding
   cut-points at each scale — a new methodology artifact, not a rollup.
3. **Cost/benefit.** A full raw-input re-score across three new grains × two LOR vintages is a
   large methodology-bearing build to produce a number whose headline honesty is still poor (see
   below). Not warranted for a "how gentrified is this Bezirk?" convenience label.

**Heterogeneity → false precision (the decisive point).** A Bezirk routinely contains simultaneously
gentrifying and declining PLRs. Collapsing that to one "the Bezirk's index is X" headline manufactures
misleading precision and invites the **ecological / aggregation reading** the mart contract explicitly
guards against ("PLR-level aggregate; inferring from a coarser stage is an ecological fallacy",
`gentrification_index.sql`; G-2 guardrail). A **distributional summary** (child-stage histogram +
median/modal stage + spread/IQR) is strictly more informative and more honest than a point estimate,
and is consistent with how this project has handled adjacent MAUP calls (I18 stage-distribution
framing; Ortsteil deferral #269).

## 4. Decision

**Decline the single coarse-grain headline index value.** Publish, as the coarse-grain answer, a
**distributional summary of child-PLR typology stages** — matching what I18 already ships — optionally
enriched with a **modal/median stage + a dispersion indicator** (share of child PLRs in the two most
gentrification-advanced stages, and an explicit "mixed/heterogeneous" flag when no stage holds a
majority). This is option (c), and it is the methodologically sound choice.

- **Reject option (b)** for any published value: averaging ordinal codes violates ADR-0008 / R-A3-C2.
  `int_mss_bzr_aggregate` stays an **internal MAUP diagnostic only**, keeps its "not the Senate
  method / may mis-stage" caveat, and must **not** be surfaced as a headline value.
- **Do not build option (a) now.** If a coarse point value is ever genuinely required, the *only*
  admissible route is a Senate-style **raw-indicator re-aggregation + re-classification at each
  grain** (never a mean of PLR ordinals), scoped as its own methodology-bearing ADR with a MAUP
  zonation sensitivity analysis across BZR/PGR/Bezirk. Record that as the reserved path, not this
  ticket's deliverable.

**MAUP sensitivity note (for the methodology page):** any coarse-grain statement is scale- and
zonation-dependent; the same PLRs re-zoned give different summaries. The site therefore reports the
**child-stage distribution** at coarse grain and reserves single index *values* to the PLR grain at
which the index is defined and calibrated.

## 5. Consequence for #267

#267 proceeds as a **documented no-go on the point value**, with a *small* positive deliverable:
formalize the distribution-only rule + this MAUP note on the methodology page (Epic G2) so the gap
stops being an implicit TODO, and (optional, DE + web) surface a modal-stage + heterogeneity flag on
I18 coarse pages, clearly labelled as a distribution summary, not an index value. No change to
`gentrification_index.sql` or ADR-0004. Domain-expert gate must also record its verdict before
integration.

## 6. Untrusted-input note (SEC-3)

This decision relied only on maintainer-authored SPEC/tickets, repo code, ADRs and sign-offs. No
web-fetched or non-maintainer content informed it.

---

## Verdict

```json
{
  "verdict": "concerns",
  "scope": "#267 I-coarse-index — coarse-grain (BZR/PGR/Bezirk) gentrification-index value, branch feature/267-coarse-index (decision-first, no code)",
  "rationale": "A single coarse-grain index VALUE is not methodologically defensible to publish. Option (b) population-weighted mean of PLR ordinal D1/D2 codes violates ADR-0008 / R-A3 geo-signoff C2 (never average ordinal class codes as metric) — the existing int_mss_bzr_aggregate already flags itself as a diagnostic-only, non-Senate approximation. Option (a) raw-input re-scoring is the only per-value-admissible route but re-z-scores POI/EWR predictors against a different, low-n reference distribution (MAUP zonation sensitivity; n=12 at Bezirk), requires re-deciding cut-points per scale, and is a large build for a headline that is still dishonest given intra-Bezirk heterogeneity. A distributional summary (option c) is strictly more informative and honest and matches the project's prior MAUP-adjacent decisions (I18, #269). Decision: DECLINE the point value; ship distribution-only + a MAUP note.",
  "risks": [
    "If a coarse point value is later demanded, teams may reach for the existing int_mss_bzr_aggregate mean-of-ordinals as a shortcut — it must stay an internal diagnostic and never become a published headline.",
    "A published modal/median stage could itself be over-read as 'the Bezirk's stage'; it must carry an explicit heterogeneity flag and ecological-fallacy caveat.",
    "Option (a), if ever built, has genuine low-n instability at Bezirk grain (n=12) that a naive re-z-score would hide."
  ],
  "recommendations": [
    "Publish coarse-grain gentrification as a child-PLR typology-stage distribution (histogram + modal/median stage + a 'mixed/heterogeneous' flag), not a single index value.",
    "Keep int_mss_bzr_aggregate internal MAUP-diagnostic-only with its existing not-the-Senate-method caveat intact.",
    "Reserve the single-value path to a future dedicated ADR that re-aggregates raw MSS s1-s4 indicators + re-classifies at each grain (never a mean of PLR ordinals), with a BZR/PGR/Bezirk MAUP zonation sensitivity analysis.",
    "Record the distribution-only rationale + MAUP note on the G2 methodology page so #267 closes the implicit TODO rather than re-litigating it.",
    "Confirm the gentrification-domain-expert verdict (ecological-fallacy / overclaim lane) before PM integrates #267."
  ]
}
```

**Verdict: CONCERNS (decline the single headline value; ship distribution-only, option c).** #267
proceeds as a documented no-go on the point value with a distribution-only formalization; it does not
proceed to build a coarse index value. Domain-expert gate pending.
