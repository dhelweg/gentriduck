# B10 Domain-Expert Sign-Off
- **Task:** B10 #120 — BZR/Bezirk spatial aggregation (E1/E2)
- **Date:** 2026-06-30
- **Verdict:** **Verdict: PASS**
- **Final review (2026-06-30):** All five conditions satisfied. C-1 (R-C2 grounding) and C-4
  (typology_stage label) — the two items held open at the prior re-review — are now corrected in the
  files. C-2, C-3, C-5 remain resolved. Verdict upgraded from PASS WITH CONDITIONS to **PASS**. See
  "Conditions resolved (final review)" below. The original analysis (Q1–Q4, theory risks,
  recommendations) is retained unchanged for the record.

---

## Conditions resolved (final review, 2026-06-30)

Re-verified against the current working-tree file state (not a description of pending work), per
CLAUDE.md §Methodology gate — I sign off on what is in the files.

- **C-1 (grounding citation, R-C2) — RESOLVED.** `int_mss_bzr_aggregate.sql` no longer asserts a
  Senate "mode/majority-rule" match. The AGGREGATION STRATEGY header (lines ~22–32) now states the
  rollup is a "population-weighted mean-of-PLR-ordinals approximation that DIFFERS from the
  Senate/thesis method," and cites the correct authority — `reference/system/50_lor_mss_idx_bzr_z.sql`
  and `50_lor_mss_idx_bzr_idx.sql` — noting the Senate re-z-scores aggregated raw indicators (s1–s4)
  within the BZR population then re-classifies. The `bzr_agg` CTE comment (lines ~102–106) carries the
  same honest divergence note. The words "mode" and "majority-rule" are removed. The matching
  divergence bullet is now present in the E1 "Divergences from 2018 Thesis" list
  (`E1-regression-findings.md` line ~158), correctly describing the s1–s4/d1–d4 re-z-score divergence.
  The R-C2 grounding fault is cleared.

- **C-2 (inline MAUP + low-power caveat) — RESOLVED** (carried from re-review). E1 §5/§6 carry the
  MAUP-smoothing and n=12 low-power caveats adjacent to the coarse-scale coefficients.

- **C-3 (Bezirk = MAUP diagnostic only in public framing) — RESOLVED** (carried from re-review).
  Bezirk is framed as "indicative only … very low statistical power," retained as a MAUP gradient,
  never a per-district verdict. Carry into G2/O2.

- **C-4 (typology_stage at coarse scales labelled approximate, out of mart) — RESOLVED.** The
  `int_mss_bzr_aggregate.sql` TYPOLOGY block (lines ~48–51) now reads "Indicative coarsening
  approximation only (NOT the official Senate BZR typology); for MAUP diagnostic use only." The
  `schema.yml` `typology_stage` column entry for `int_mss_bzr_aggregate` (lines ~1772–1776) mirrors
  this: "Indicative coarsened typology … NOT the official Senate BZR typology. For MAUP diagnostic
  use only; must not be fed into gentrification_index mart or published as per-area verdicts." The
  ecological-fallacy / displacement-misuse hazard (theory risk R3) is bounded: the coarsened typology
  cannot silently flow into the published mart.

- **C-5 (geo co-gate, ADR-0011) — RESOLVED** (carried from re-review). `docs/epic-e/B10-geo-signoff.md`
  records `Verdict: PASS`. The dual methodology gate is complete: domain PASS (this note) + geo PASS.

**Net:** 5 of 5 conditions satisfied. No open blocking items. The aggregation remains a
mean-of-ordinals **approximation** fit for the directional MAUP probe (rank order preserved; the
sign of the POI↔status association is not affected), now correctly labelled as such and walled off
from the live `gentrification_index` mart. **Cleared for PM integration into `develop`.**

```json
{
  "verdict": "pass",
  "domain_rationale": "Final review 2026-06-30: all 5 conditions satisfied. C-1 (R-C2 grounding) resolved — int_mss_bzr_aggregate.sql no longer claims a Senate 'mode/majority-rule' match; the header, bzr_agg CTE comment, and TYPOLOGY block now state the rollup is a population-weighted mean-of-PLR-ordinals approximation that DIFFERS FROM the Senate re-z-score-of-raw-indicators method (50_lor_mss_idx_bzr_z.sql/_idx.sql), and the divergence is recorded in the E1 Divergences list. C-4 resolved — the BZR/Bezirk typology_stage is labelled 'indicative coarsened typology, MAUP diagnostic use only, must not be fed into the gentrification_index mart' in both the model comment and schema.yml. C-2/C-3/C-5 remain resolved (inline MAUP+low-power caveats; Bezirk-as-MAUP-diagnostic framing; geo co-gate PASS). The aggregation is a mean-of-ordinals approximation that preserves rank order, so the directional MAUP finding stands; it is now correctly grounded and kept out of the published mart. Upgraded from PASS WITH CONDITIONS to PASS; cleared for integration into develop.",
  "theory_risks": [
    "Mean-of-ordinals distorts non-uniform MSS class spacing (index-definition.md §3.3) — tolerable for a directional MAUP probe, not for official-status reproduction; bounded by C-4 (kept out of mart, labelled approximate)",
    "Bezirk (n=12) ecological-fallacy / displacement-misuse hazard if read as a per-district verdict — bounded by C-2/C-3 (inline caveat + MAUP-diagnostic-only public framing)",
    "Over-reading n=12 Bezirk significance (e.g. rho=-0.52, p<0.01) as added evidence rather than a smoothing artefact — bounded by C-2"
  ],
  "recommendations": [
    "Keep MAUP + low-power caveats inline adjacent to every coarse-scale coefficient on the future G2 page and O2 whitepaper",
    "Keep Bezirk restricted to a MAUP illustration in all public framing; never publish per-district gentrification verdicts",
    "Follow-up (non-blocking): for a hardened multi-scale release, re-implement BZR/Bezirk MSS status the Senate way (aggregate raw s1-s4/d1-d4, re-z-score within the coarser population, re-classify) so published coarse-scale status matches official figures and typology is exact",
    "When O2/whitepaper frames the multi-scale result, lead with sign-stability across scales as the finding and present magnitude growth explicitly as MAUP (Openshaw 1984; thesis §3.2)"
  ]
}
```

---

## Scope

This sign-off covers the **domain validity** of B10's three-scale (PLR / BZR / Bezirk) MAUP
sensitivity extension to E1/E2: theory fidelity to the 2018 thesis, the sociological meaning of the
roll-up indicators, and the framing of the coarser-scale results. It does **not** cover statistical
soundness (the co-gate held by the geo-data-scientist — see Condition 5).

---

## Q1 — Three-scale approach alignment with the thesis

**Faithful in intent, partially divergent in operationalization.**

The thesis (§3.2, pp. 55–56) ran H1–H3c at PLR, BZR (Bezirksregion), and Bezirk, and B10 correctly
revives that three-scale design. The code-hierarchy derivation (BZR = `SUBSTR(plr_code,1,6)`,
Bezirk = `SUBSTR(plr_code,1,2)`) is sound and the model comment documents that all 137 thesis BZR
raum_ids are recovered for `lor_pre2021` (verified 2026-06-30). On the **EWR** side the aggregation
is faithful: B10's population-weighted share (`Σ(share·residents)/Σresidents`) is algebraically
identical to the thesis's `Σcount/Σresidents` construction in
`reference/system/51_lor_ewr_einwohnergewichtet_bzr.sql` (the Senate's *einwohnergewichtet* method).
EWR counts are extensive and summed; shares/mean_age are intensive and population-weighted. Correct.

The divergence is on the **MSS status/dynamik** side — see Q4. It does not break the thesis intent
(a like-for-like MAUP check) but the model's grounding comment overstates the match, which I require
fixed (Condition 1).

## Q2 — MAUP interpretation

**Appropriate, and correctly framed.** The findings docs already carry the right caveat in every
coarse-scale section: the Bezirk H2 result (n=12, k=2, ρ=−0.516, p=0.0098) and BZR results are
labelled as the **expected MAUP signature** — spatial smoothing cancels within-unit variance and
inflates monotonic association at coarser grain — **not** independent confirmation
(E1 §5/§6, E2 §2, index-definition.md §8). This is the textbook reading: aggregating ~4–6 PLRs per
BZR and ~36 per Bezirk is a known correlation-amplifier under positive spatial autocorrelation
(Openshaw 1984; and the thesis's own §3.2 multi-scale motivation). Reporting the *same sign at all
scales* as the substantive finding, and the *strengthening with coarseness* as a MAUP artefact, is
the correct domain framing. The directionally-consistent H2 (POI stock at t → future status
improvement, negative under the inverse-numeric polarity) holding across all three scales is the
genuinely informative result; I endorse that reading.

One thing to **add** (Condition 2): the n=12 Bezirk "significant" p-values must never be reported
without the MAUP-and-low-power double caveat *adjacent to the number*, because a casual reader sees
"ρ=−0.52, p<0.01" and over-reads it. The findings docs do this in the section header; keep it
inline in any public (G2/whitepaper) surfacing.

## Q3 — Bezirk as a gentrification unit

**Acceptable only as a sensitivity check, not as a reporting unit for displacement claims.**

Twelve Bezirke is far coarser than the neighbourhood scale at which gentrification and
invasion-succession actually operate (Dangschat 1988/2000; Holm 2010). A Bezirk like
Friedrichshain-Kreuzberg or Neukölln contains both highly-gentrified and stable-deprived PLRs;
the population-weighted roll-up *averages these out*, producing an ecological-fallacy hazard if a
Bezirk-level coefficient is read as a statement about neighbourhoods. The domain risk is real:
Bezirk numbers could be mis-cited to claim "district X is/ isn't gentrifying," which erases exactly
the sub-district displacement the project exists to surface, and could be misused (the ethics
concern in my standing mandate). B10 mitigates this correctly by (a) restricting Bezirk to a MAUP
diagnostic, (b) stamping "n=12 … indicative only … very low statistical power" on the section. That
is sufficient **for an internal methodology artefact**. Condition 3 binds its public use: Bezirk
results may appear on G2 only as a MAUP illustration, never as a per-district gentrification verdict.

## Q4 — Status aggregation validity (the load-bearing concern)

**This is where B10's grounding comment was inaccurate and is now corrected (C-1, resolved above).**

B10 derives BZR/Bezirk `status_index` as `round( Σ(status_index · residents) / Σresidents )`,
clamped to [1,4] — i.e. a **population-weighted arithmetic mean of the PLR ordinal status codes,
floored to an integer**. The model comment previously claimed this "matches the thesis approach: Senat
publishes BZR/Bezirk status as a mode/majority of constituent PLR statuses
(reference/system/50_lor_mss_idx_bzr_idx.sql)."

The reference SQL says otherwise. `50_lor_mss_idx_bzr_z.sql` →
`50_lor_mss_idx_bzr_idx.sql` show the Senate/thesis does **not** aggregate the already-classified PLR
status indices at all. It (i) aggregates the **raw indicator counts** (s1–s4, d1–d4) to BZR level,
(ii) **re-z-scores those sums within the BZR population** for that `zeit`, (iii) sums the four
z-scores into `status_summe`, and (iv) re-applies the class cut-points (`hoch / mittel / niedrig /
sehr niedrig`). In other words BZR status is a **freshly computed index over BZR-level inputs**, not
a mode, mean, or majority of PLR statuses. B10's method is therefore a *coarsening approximation*,
which is a legitimate engineering choice for a MAUP probe — but it is **not** the thesis/Senate
method, and it is **neither a "mode" nor a "majority rule"** as the comment asserted.

Two distinct problems:

1. **Citation accuracy (R-C2 grounding rule).** The comment cited `50_lor_mss_idx_bzr_idx.sql` as
   authority for "majority rule." That file refutes the claim. An inaccurate grounding citation on a
   methodology-bearing model is exactly what R-C2 forbids. This has now been reworded to state honestly
   that B10 uses a **population-weighted mean-of-ordinals approximation** that *differs from* the
   Senate's re-z-score-from-raw-indicators method, with the divergence documented (Condition 1, RESOLVED).

2. **Sociological meaning of mean-of-ordinals.** The MSS status classes are an **ordinal** ranking
   (index-definition.md §3.3 prohibits metric arithmetic on the non-uniform MSS ordinal codes).
   Averaging codes 1–4 and flooring treats the gap between "hoch" and "mittel" as equal to
   "niedrig"→"sehr niedrig," which is not guaranteed. For a *directional MAUP check* this distortion
   is tolerable — the rank ordering of BZRs by weighted-mean status is highly correlated with the
   true re-z-scored ordering, so the sign of the POI↔status correlation is preserved, which is all
   B10 claims. But it is an approximation that (a) can mis-assign the *typology_stage* of a BZR/Bezirk
   sitting on a class boundary, and (b) must not be presented as the official Senate BZR status
   (Condition 4, RESOLVED).

**Net domain judgement on Q4:** the aggregation is *fit for the MAUP sensitivity purpose* and
preserves enough rank information for the directional finding, so it does not invalidate B10's
results. The "matches the Senat … majority-rule" framing was wrong and is now corrected, and the
ordinal-mean approximation is labelled as such. With C-1 and C-4 resolved, Q4 clears to PASS.

---

## Conditions status (re-review, 2026-06-30)

Re-reviewed after the data-engineer reported addressing the conditions. Verified against the
**current** file state (git working tree at this commit), not the engineer's description of work
"in progress." Per CLAUDE.md §Methodology gate the gate is enforced, not advisory: I sign off on
what is in the files, not on an expectation of a pending edit.

> **Superseded by "Conditions resolved (final review)" at the top of this document.** The notes below
> record the intermediate re-review state, when C-1 and C-4 were still open. All five conditions are
> now satisfied; see the final-review section.

- **C-1 (blocking, R-C2) — [intermediate: NOT YET MET; now RESOLVED].** `int_mss_bzr_aggregate.sql`
  was **unmodified** at the intermediate re-review (no diff against HEAD). The inaccurate Senate
  attribution my Q4 flagged was still present verbatim:
  - line 24: `-- Use rounded population-weighted mean (mode proxy)`
  - lines 26–27: `-- This approximates the thesis approach: Senat publishes BZR/Bezirk status as a mode/majority`
  - lines 103–104: `-- This is consistent with how Berlin Senat aggregates PLR statuses to BZR level (...: weighted majority rule).`
  - lines 114–115: `-- Thesis §3.2: BZR status = population-weighted majority of constituent PLRs.`
  My condition required the words **"mode" and "majority-rule" dropped**, and the comment reworded
  to state the method is a **population-weighted mean-of-PLR-ordinals approximation that DIFFERS
  FROM** the Senate's re-z-score-of-raw-indicators method (`50_lor_mss_idx_bzr_z.sql` / `_idx.sql`).
  This is not the same as the geo-DS C-3 ("mode proxy" operator wording) — the geo gate accepted
  the *arithmetic* description; my gate concerns the *false Senate-method attribution*, a
  domain-fidelity / R-C2 grounding fault. **Now resolved** (see final-review section). The BZR/Bezirk
  aggregation entry in the E1 "Divergences from 2018 Thesis" list is also now present (E1 line ~158).
- **C-2 (inline MAUP + low-power caveat) — RESOLVED.** E1 §5 (BZR) carries the MAUP-smoothing note;
  E1 §6 (Bezirk) carries the explicit "|rho|≈0.58 needed for p<0.05" at n=12 caveat directly above
  the two "significant" H2 cells. Adjacent-to-the-number requirement met.
- **C-3 (Bezirk = MAUP diagnostic only in public framing) — RESOLVED.** E1 §6 frames Bezirk as
  "indicative only … very low statistical power"; the geo-signoff confirms Bezirk is retained as a
  MAUP gradient, not a per-district verdict. (Numbered C-3 in the original Conditions block below.)
- **C-4 (typology_stage at coarse scales labelled approximate, out of mart) — [intermediate: NOT YET
  MET; now RESOLVED].** At the intermediate re-review the `int_mss_bzr_aggregate.sql` typology block
  still read "district typology reflects the majority PLR typology" with **no** approximate /
  MAUP-diagnostic / out-of-mart label, and the `schema.yml` `typology_stage` entry for the BZR/Bezirk
  model was absent. Both are **now corrected** (see final-review section): the model TYPOLOGY block
  reads "Indicative coarsening approximation only (NOT the official Senate BZR typology); for MAUP
  diagnostic use only," and the `schema.yml` `int_mss_bzr_aggregate.typology_stage` column entry
  carries the matching "must not be fed into gentrification_index mart or published as per-area
  verdicts" caveat.
- **C-5 (geo co-gate, ADR-0011) — RESOLVED.** `docs/epic-e/B10-geo-signoff.md` now records
  `Verdict: PASS` (geo conditions C-1/C-2/C-3 resolved). Co-gate satisfied.

**Net (final):** 5 of 5 conditions resolved. Verdict upgraded to **PASS**; cleared for PM integration
into `develop`.

---

## Conditions (all must be met before PM integrates into `develop`)

1. **Fix the grounding citation (R-C2, blocking).** Reword the `int_mss_bzr_aggregate.sql` header
   (lines ~22–28 and ~119–123) to state that BZR/Bezirk status is a **population-weighted
   mean-of-PLR-ordinals approximation, floored**, and that this **differs from** the Senate/thesis
   method (`50_lor_mss_idx_bzr_z.sql` / `_idx.sql`: re-z-score of aggregated raw indicators s1–s4
   within the BZR population, then re-classify). Drop the words "mode" and "majority-rule" unless
   the model is changed to actually implement them. Add this divergence to the "Divergences from
   2018 Thesis" list in E1-regression-findings.md. **[RESOLVED]**

2. **Inline MAUP + low-power caveat (Q2/Q3).** Wherever a coarse-scale coefficient (especially any
   n=12 Bezirk ρ/p) is surfaced beyond the section header — including on the future G2 page and the
   O2 whitepaper — the MAUP-amplification and low-power caveats must sit *adjacent to the number*,
   not only in a section preamble. **[RESOLVED for the findings docs; carry into G2/O2.]**

3. **Restrict Bezirk to a MAUP diagnostic in public framing (Q3).** Bezirk-scale results may be
   published only as a MAUP illustration, never as a per-district "is/ isn't gentrifying" verdict,
   to avoid the ecological-fallacy and displacement-misuse hazard. Carry this into G2/O2. **[RESOLVED]**

4. **Flag typology_stage at coarse scales as approximate.** The B10 `typology_stage` derived from
   floored mean-ordinals can mis-stage boundary BZRs/Bezirke. Label it "indicative coarsened
   typology," and do not feed B10's BZR/Bezirk typology into any displacement-risk surface or the
   live `gentrification_index` mart. **[RESOLVED]**

5. **Co-gate completeness (ADR-0011, blocking).** Per the dual methodology gate, the
   geo-data-scientist must record `Verdict: PASS` on B10's statistical soundness (small-n inference
   at Bezirk, ordinal-mean aggregation, MAUP claim) **before** the PM integrates. My domain PASS is
   necessary but not sufficient on its own. **[RESOLVED — B10-geo-signoff.md records Verdict: PASS.]**

---

## Theory risks (for the record)

- **R1 (grounding):** Inaccurate "Senate majority-rule" citation on a methodology-bearing model
  (resolved by Condition 1).
- **R2 (ordinal-mean):** Mean-of-ordinals distorts non-uniform MSS class spacing (index-definition.md
  §3.3); tolerable for a directional MAUP probe, not for official-status reproduction.
- **R3 (ecological fallacy / misuse):** Bezirk-level numbers can erase sub-district displacement and
  be mis-cited; bounded by Conditions 2–3 (and C-4 keeps the coarsened typology out of the mart).
- **R4 (over-reading n=12 significance):** ρ=−0.52 p<0.01 at Bezirk is a smoothing artefact, not
  added evidence; bounded by Condition 2.

## Recommendations (non-blocking)

- For a future hardened multi-scale release, consider re-implementing BZR/Bezirk MSS status the
  Senate way (aggregate raw s1–s4/d1–d4, re-z-score within the coarser population, re-classify) so
  the published coarse-scale status matches official figures and the typology is exact rather than
  approximated. Track as a follow-up to B10.
- When O2/whitepaper frames the multi-scale result, lead with the *sign-stability across scales* as
  the finding and present the *magnitude growth* explicitly as MAUP, citing Openshaw (1984) and
  thesis §3.2.
