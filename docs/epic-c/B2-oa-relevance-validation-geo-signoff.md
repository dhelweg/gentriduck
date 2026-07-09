# Geo-Data-Scientist Sign-off: OA-B.2 (#171) — data-driven offering-relevance validation

- **Scope:** OA-B.2 #171 — `analysis/c_offering_relevance_validation.py`, the data-driven confirmation
  pass over `seed_poi_offering_relevance.csv` (OA-B.1 #170), and the resulting `data_corr` fill in
  `transform/seeds/seed_poi_offering_relevance.csv`. Verifies the correlation construct itself (which
  OA, which outcome, which join, which statistical test, sample-size floor) is sound and that the
  causality-first-with-data-confirmation 2×2 (ADR-0017 D3) is implemented as a **diagnostic**, not a
  tier-rewriting mechanism — the domain-expert sign-off covers whether the *interpretation* of individual
  findings (e.g. the direction-mismatch flags) is sociologically defensible.
- **Operationalizes:** ADR-0017 D1–D2 (OA construct, parent-relative LQ, weight-first/LQ-last,
  same-variant denominator), D3 (2×2 non-circularity rule), D4 (`methodology_variant`/`weight_variant`
  orthogonality); `analysis/e1_regressions.py` H1 (POI stock ~ MSS status_index prior, thesis p.55);
  `docs/methodology/spatial-methods.md` §11.3 (`standard` = bandwidth-free hard floor).
- **Reviewer:** geo-data-scientist
- **Date:** 2026-07-09
- **Branch:** feature/171-oa-b2-data-driven-validation → develop
- **Deliverables reviewed:** `analysis/c_offering_relevance_validation.py`,
  `transform/seeds/seed_poi_offering_relevance.csv` (`data_corr` column filled),
  `transform/seeds/schema.yml` (`data_corr` description updated),
  `docs/epic-c/B2-offering-relevance-validation-findings.md`.
- **Verdict:** PASS

---

## 1. Summary

1. **Correlation construct is methodologically sound and correctly scoped.** Per-node Offering
   Advantage is pulled from `int_poi_offering_advantage` (OA-A.2 #166) at
   `methodology_variant='faithful'` (never touching the not-yet-built improved variant — correctly
   avoids a circular self-validation), `weight_variant='standard'` (the bandwidth-free hard floor per
   ADR-0017 D2.3 — the right choice for a confirmation pass that should not be confounded by an
   arbitrary kernel-bandwidth choice), `snapshot_year=2016`/`area_vintage='lor_pre2021'` (matches the
   golden's own `zeit=201612`, the exact precedent set by OA-A.3 #167's `b_oa_validation.py`). The
   outcome, `status_index` from `int_thesis_2018_area_index` (`variant='standard'`,
   `area_level='plr'`, `period_yyyymm=201612`), is the thesis's own cross-sectional MSS social-status
   construct, matching the H1 test already established in `e1_regressions.py` — reusing an
   already-R-C1-reviewed outcome variable rather than inventing a new one.
2. **The fan-out guard is correctly ported from OA-A.3 precedent.** `load_node_oa` `GROUP BY area_code`
   + `MAX(oa_col)` before joining to the outcome — I confirmed this is necessary and correct:
   `oa_domain`/`oa_category` are identical across every sibling leaf row sharing the same
   window-function partition in `int_poi_offering_advantage`, so a raw join without the
   group-by-and-collapse would silently balloon `n` for domain/category-level nodes, exactly the bug
   `b_oa_validation.py`'s own header documents catching in OA-A.3. This script avoids repeating it.
3. **Non-circularity is preserved as a structural, not merely a documented, property.** I read the full
   script: `offering_tier`/`offering_weight` are never referenced in `write_seed_with_data_corr` (only
   `data_corr` is rewritten), and `classify()` never mutates `row["offering_tier"]`. The
   "tier >= 1 and correlated is False" (not-confirmed, kept) branch is the load-bearing non-circularity
   check — I verified after fixing the numpy-bool bug below that it correctly reports 45 causally-
   plausible nodes with no significant correlation this pass, all correctly left at their theory tier
   (no silent demotion).
4. **A real bug was caught and correctly fixed during this review.** `res["correlated"] is False`
   originally always evaluated `False` because `scipy.stats.spearmanr`'s significance comparison
   (`p < ALPHA`) yields a **numpy** bool (`np.False_`), and Python's `is` operator does not treat
   `np.False_ is False` as true (they are different singleton objects) — the first run silently reported
   `0` "not confirmed" nodes (masking 45 real findings) while the crosstab table (built with `==`, not
   `is`) was already correct, a good illustration of why the two summary sections must agree with each
   other and did not, on first run. The fix (`correlated = bool(p < ALPHA)`) casts to a genuine Python
   bool before any `is` comparison; I re-ran the script post-fix and confirmed the "not confirmed" count
   (45) now reconciles with the crosstab (23+19+3 = 45 for tiers 1/2/3). This is exactly the kind of
   defect the R-C1 gate exists to catch before integration — flagging it here rather than treating it as
   a private implementation detail, since a wrong "0 not-confirmed" count would have been a materially
   misleading finding in the shipped report.
5. **The direction-mismatch diagnostic is correctly non-actionable.** Six tier ≥ 1 nodes (Entertainment,
   Fast Food ×2, Bank Branch, Pet Shop, Sports and Recreation) show *significant* correlation with
   `status_index` in the sign **opposite** the H1 amenity prior. The script documents these as a finding
   for domain-expert review and explicitly does not act on them (does not drop or re-tier) — correct,
   since ADR-0017 D3 reserves tier-setting to theory alone and data can only confirm/calibrate within a
   tier, never override it based on an unexpected sign.
6. **Verified against a live, green `dbt build`.** `uv run poe build`: 642 pass / 6 pre-existing unrelated
   warnings (none touching this seed or `int_poi_offering_advantage`) / 0 errors. `poe lint` clean.
   `data_corr` remains correctly untested by `not_null` (blank for 114/231 rows, all documented as
   insufficient-n, e.g. `Vacancy` itself has near-zero OSM stock in this snapshot and is correctly left
   blank rather than a fabricated value).

Verdict: **PASS.**

---

## 2. Methodological assessment

### 2.1 Sample-size floor (`MIN_N = 10`) is a defensible, conservative choice

A Spearman correlation on fewer than 10 PLR pairs is unstable; the script correctly refuses to report a
number rather than emitting a spuriously precise rho on n=3. This is conservative in the right direction
— 114/231 nodes are left `n/a`, mostly rare leaf types (a legitimate reflection of current OSM
completeness at the type-level granularity, not a script defect).

### 2.2 `ALPHA = 0.05` with no multiple-comparison correction — flagged as an advisory, not blocking

231 independent significance tests at α=0.05 will produce ~11-12 false positives by chance alone under a
global null. The script does not apply a Bonferroni/BH correction. I do **not** block on this because
(a) the pass is explicitly diagnostic/confirmatory, not a formal hypothesis-test suite whose p-values
gate a downstream decision (tier is never rewritten by this script), and (b) the 2×2's actual load-bearing
consequence — dropping non-causal correlates — is already handled by theory (tier-0 nodes are dropped
regardless of `data_corr`), so a false-positive "correlated" flag on a tier-0 node changes nothing
(the drop was already decided by theory). It **would** matter if a future ticket used raw `data_corr`
significance to make a binary decision; I recommend OA-B.3 (#172) treat `data_corr` as a continuous
calibration signal (e.g. shrink weight toward 0 within a tier band) rather than thresholding on p < 0.05
directly, and note the multiple-comparisons caveat explicitly if it ever does threshold.

### 2.3 Vacancy's opposite-pole sign convention (`expected_sign`) is correctly isolated to one domain

`OPPOSITE_POLE_DOMAINS = {"Vacancy"}` is the only sign flip, matching ADR-0017 D-2 exactly (the sole
domain flagged in the OA-B.1 seed and the OA-A.2 model header as the disinvestment/rent-gap opposite
pole). I checked no other domain's rationale text implies a similar reversal that the script's
single-domain set would miss.

### 2.4 `weight_variant='standard'` choice avoids a bandwidth confound but is itself a scope decision

Choosing the bandwidth-free hard floor sidesteps the {500,1000,1500} m sweep question entirely for this
pass — a reasonable simplification, since this ticket confirms taxonomy relevance, not bandwidth
sensitivity (that is OA-C.1 #174's scope per ADR-0017 C-4). I flag as an **advisory, not blocking**
follow-up: OA-C.1 #174 should consider re-running this same confirmation pass on `gaussian_1000m` to
check whether any direction-mismatch or spurious-correlation finding here is bandwidth-sensitive, since a
finding that only appears on the hard variant is weaker evidence than one that replicates on the
kernel-smoothed variant too.

---

## 3. Conditions

None blocking. Two advisory, carried forward:

- **Advisory (OA-B.3 #172):** treat `data_corr` as a continuous calibration signal, not a
  p<0.05 threshold gate, given the lack of multiple-comparison correction across 231 tests (§2.2).
- **Advisory (OA-C.1 #174):** re-run this confirmation pass on `gaussian_1000m` (the OA headline
  bandwidth) to check whether the direction-mismatch/spurious findings replicate off the hard-count
  floor (§2.4).

---

## 4. Risks

1. No multiple-comparison correction across 231 significance tests (§2.2) — mitigated by the diagnostic
   (non-tier-rewriting) use of the result, but would need addressing if any future ticket thresholds on
   `data_corr` directly.
2. `MIN_N=10` leaves 114/231 nodes (mostly rare leaf types) without a data-driven read at all — expected
   given current OSM completeness, not a script defect, but means the improved variant's calibration
   remains theory-only for roughly half the taxonomy.
3. Confirmation is run only on the bandwidth-free `standard` variant (§2.4) — a finding here is not yet
   verified to be bandwidth-robust.

---

## 5. Certification

The correlation construct is methodologically sound (correct OA variant/vintage/year selection matching
established precedent, correct fan-out-safe join, appropriate outcome variable reuse from the
already-reviewed H1 construct), the non-circularity rule is structurally enforced (verified by direct
code inspection — `offering_tier`/`offering_weight` are never rewritten), and a real implementation bug
(numpy-bool `is`-comparison) was caught and correctly fixed during this review before integration.
Verified on a live, green `dbt build`.

**The PM MAY integrate this into `develop`**, pending the independent `gentrification-domain-expert`
PASS also required by the R-C1 dual gate.

```json
{
  "verdict": "pass",
  "rationale": "analysis/c_offering_relevance_validation.py implements a methodologically sound data-driven confirmation pass: OA pulled from int_poi_offering_advantage at methodology_variant='faithful' (avoiding circularity with the not-yet-built improved variant), weight_variant='standard' (bandwidth-free floor, avoiding a kernel-bandwidth confound), snapshot_year=2016/area_vintage='lor_pre2021' matching the golden's zeit=201612 per OA-A.3 precedent; outcome is the already-reviewed H1 status_index construct. The fan-out-safe GROUP BY + MAX() join correctly ports the OA-A.3 bug-fix precedent. Non-circularity is structurally enforced -- offering_tier/offering_weight are never rewritten by this script, only data_corr; verified by direct code inspection. A real defect (numpy-bool 'is'-comparison silently reporting 0 not-confirmed nodes instead of the correct 45) was caught and fixed during this review -- the two summary sections now reconcile (23+19+3=45). The direction-mismatch diagnostic (6 tier>=1 nodes correlating opposite the H1 prior) is correctly left non-actionable per ADR-0017 D3. Verified on a live dbt build: 642 pass / 0 errors / 6 pre-existing unrelated warnings; poe lint clean.",
  "risks": [
    "No multiple-comparison correction across 231 significance tests -- acceptable given the script's diagnostic (non-tier-rewriting) use, but must be addressed if data_corr is ever thresholded directly by a downstream ticket",
    "114/231 nodes (mostly rare leaf types) have insufficient data (n<10) for a data-driven read this pass, leaving those types theory-only pending future OSM completeness",
    "Confirmation is run only on the bandwidth-free 'standard' variant -- not yet verified to replicate on the gaussian_1000m headline bandwidth"
  ],
  "recommendations": [
    "OA-B.3 (#172): treat data_corr as a continuous calibration signal (e.g. shrink weight within a tier band), not a p<0.05 threshold gate, given the lack of multiple-comparison correction",
    "OA-C.1 (#174): re-run this confirmation pass on gaussian_1000m to check whether the direction-mismatch/spurious findings are bandwidth-robust"
  ]
}
```

---

## Final Verdict

Verdict: PASS
