# #363 determinism and C-1 tolerance: geo-DS sign-off (R-C1)

- **Date:** 2026-11-23.
- **Scope:** `feat/363-determinism-tests`, `git diff a36a23fc0..2b674f657`, plus the ADR-0017 D5 C-1
  amendment.
- **Checked against:** `docs/epic-c/363-geo-tolerance-note.md`.
- **Evidence:** DE mutation run, C1 runs on two builds and the scratchpad logs.

## Implementation against the note: correct

- **C-1 test.** The rewritten `test_c1_oa_weighted_mass_conservation_invariance` implements note
  §5 exactly:
  - canonicalised code;
  - full-outer coverage plus a check for a gaussian key without a standard counterpart;
  - one-sided and whole-number checks per cell, at all three levels;
  - per city-year bound `greatest(0.001 * H, 3)`.
- **Root cause fixed.** The kernel macro now emits `'BER'`, and a relationships test to `dim_city`
  was added.
- **Mutation evidence.** The real data passes. Every simulated bug fails, each for the intended
  reason:

  | Mutation | Fails on |
  |---|---|
  | M1: 1 % mass loss | negative excess at every level |
  | M2: a PLR dropped from the gaussian variant | negative excess |
  | M3: a PLR dropped from the hard variant | city-year bound |
  | M4: a PLR counted twice in the gaussian variant | city-year bound |
  | M5: one half-counted POI | non-integer excess at all three levels |
  | M6: an unmatched gaussian city | coverage |

  The test blocks again.
- **ADR-0017 amendment.** It contains the note §4 invariant sentence verbatim. The BLOCKING list
  and the city-agnostic clause are correct.
- **Disclosure.** The methodology page says gaussian city totals "can exceed the hard counts by up
  to 0.1 %". That is accurate. The ratio is ≤ 0.078 % for years with ≥ 5,000 POIs; 2008 sits at
  0.103 % but is covered by the 3-POI floor.
- **O6.** The complement is computed as a difference of stocks, with a relative ε of 1e-9, as
  specified.

## DE flags: decisions

**1. Rounding precision: keep 9 decimals.** Moving to 12 decimals would trade a merge risk that
doesn't matter for a reproducibility risk that does:
- **Straddle risk.** The probability that build noise (≤ 2.7e-15) moves a value across a rounding
  boundary is about 2·noise/step per value. At 1e-12 that is about 5e-3, i.e. around 30 of 5,566
  values could flip between builds, which brings the drift back. At 1e-9 it is about 5e-6, an
  expected 0.03 values.
- **Merge risk.** At 1e-9 the worst case is that two z-scores differing by less than 1e-9 become
  tied. That is substantively a tie on a z-scale: it moves a Spearman rank by at most half a
  position for that pair.
- **Margin.** The smallest genuine gap of 5.7e-10 sits under the step, but nothing is merged. Even a
  merge would be methodologically immaterial.
- **Correction to my note.** The 6.1e-7 figure in my note was the pooled gap; the within-year
  figure is the one that applies.

**2. Rounding in `int_poi_status_dynamism_improved_pre2021`: accept.** It is the same construct on
the same z-scale and feeds C1 Run B. Consistency across the two lineages is required.

**3. `dynamism_score_improved` drift: follow-up, not now.** No analysis or page ranks it (no hits in
`analysis/` or `web/`), and its classes are stable. File a follow-up to apply the same `round(…, 9)`
when it is next touched, or before any rank-based use.

**4. O7 tie-break: accept.** Ordering by `round(child_share, 9) desc, child_label, child_level` is
deterministic and content-neutral, and the alphabetical-first label is a documented convention.
- **Condition:** the 5,299 relabelled tie groups are genuine ties.
- **Disclosure:** the dominance mart schema should state "ties broken alphabetically" so that a
  `top_child` label is never read as a unique winner. Put this in `marts/schema.yml` if it isn't
  there already. It is not blocking.

**5. `int_poi_offering_advantage_arealevel` filtering `weight_variant = 'standard'`: accept.** It
makes the previous accidental exclusion explicit, `accepted_values` pins it, and the output stays
row-for-row identical.

**6. C1 deltas: attribution plausible, but one check is required.**
- Both rounded builds (build1 and build2) give identical C1 numbers: Run 1 p 0.0020, n 433; Run 2
  p 0.0610; Run B p 0.7428. So the result is now reproducible.
- **Run B.** The pre-change drift on the current warehouse (#363 comment: 0.7444 / 0.7423 / 0.7419)
  brackets 0.7428. So rounding moves Run B by about 0.002 at most, and the change from July
  (0.8785) is due to the warehouse (the October deletion fix, the n change).
- **Run 2** (p 0.2375 → 0.0610, ρ 0.029 → 0.047) has **no unrounded current-warehouse reference**
  in the evidence.
- **Required (R1):** run `c_three_way_comparison.py` once on the current warehouse with the
  rounding disabled (scratch only) and record Run 2 ρ and p in the C1 doc's change note. I expect
  |Δp| ≤ ~0.005, because rounding only re-merges noise-split ties.
- **Interpretation is unchanged.** Every run keeps its reading (Run 1 significant and wrong-signed;
  Run 2 and Run B not significant). But Run 2 at p = 0.061 is close to α, so the C1 text must not
  describe it as "clearly" null.

**Stale citations: the public page needs updating (R2).**
- `web/pages/methodology.md` l. 468–471 still cites the July improved-vs-golden result "(rho ≈
  0.007, n=436, …)" and the "run in July 2026" note.
- The C2 geo sign-off and the `methodology-comparison` page cite an older basket (n = 92,
  p 0.2449). Those predate the #200 fix and are historical, not C1-current. Leave them, but the PM
  should note them in the C2 follow-up.

## Required changes

**R1.** Add to the change note of `docs/epic-e/C1-three-way-comparison-findings.md`: "Unrounded
current-warehouse reference for Run 2: ρ = <x>, p = <y> (rounding effect ≤ <Δ>)". Use the scratch
run described in flag 6.

**R2.** In `web/pages/methodology.md` l. 462–471:
- replace "This comparison was run in July 2026, before the October 2026 OpenStreetMap deletion
  fix; the re-run on corrected data gives the same wrong-signed result (rho +0.15, n=433 — see …)"
  with "Re-run in November 2026 on the corrected data: the same wrong-signed result (rho +0.15,
  n=433)";
- replace "(rho ≈ 0.007, n=436, not statistically significant)" with "(rho ≈ 0.02, n=436, not
  statistically significant)".

After R1 and R2, a re-check of the two texts is enough.

Verdict (first round): CONCERNS (superseded below)

**Re-check (854eaa0cb, 76918b1fd; 2026-11-23).**

- **R1: met.** The C1 change note records the unrounded current-warehouse reference. Rounding moves Run 2 by |Δp| ≤ 0.0001 (p 0.0609 vs 0.0610) and Run B by |Δp| ≤ 0.0005, so the July → November shifts are due to the warehouse. The note also carries the "not a clear null" caution for Run 2 (p = 0.061).
- **R2: met.** `methodology.md` §7 reads "re-run in November 2026", n = 433, rho +0.15 (faithful), and "rho ≈ 0.02, n=436, not statistically significant" (improved). This is consistent with C1.

Verdict (R1/R2 re-check): PASS (superseded below)

**Re-check (e5b1ec414, ADR-0017 Trigger sentence):** Accurate. `45_osm_poi_features_domain_piv_distcalc.sql` spreads `sum(anz * dist_weighted)` over the centroid-to-centroid matrix with no per-POI normalisation, so total mass is not conserved, as stated in ADR-0010-geo-signoff §1. The current gaussian variant normalises each POI's weights to 1.

Verdict: PASS
