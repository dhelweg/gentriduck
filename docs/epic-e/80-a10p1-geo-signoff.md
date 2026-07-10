---
task: A10-P1 / #80 — early-warning displacement-risk indicator (out-of-time validated); Part 1 only
author: geo-data-scientist
date: 2026-07-10
branch: feature/80-a10p1-early-warning-indicator
---

# Geo-DS methodology sign-off — A10-P1 early-warning indicator (#80, Part 1)

- **Branch:** `feature/80-a10p1-early-warning-indicator`
- **Issue / task:** #80 [A10-P1] — predictive, out-of-time-validated early-warning score for an
  elevated displacement-pressure signal at t+k. Part 2 (DiD/event-study on Milieuschutz, #70) is
  explicitly parked and out of scope.
- **Reviewer:** geo-data-scientist (methodology gate, R-C1). Runs in parallel with the
  `gentrification-domain-expert` sign-off; both must PASS before PM integrates into `develop`.
- **Artefacts reviewed:**
  - `analysis/e4_early_warning.py` (read in full)
  - `docs/epic-e/E4-early-warning-findings.md` (generated output)
  - `pyproject.toml` (poe wiring)
  - Cross-reference: `docs/methodology/index-definition.md` §1.2/1.3/1.5/2.4/4.3,
    `analysis/a9_spatial_dynamic.py` (`build_queen_weights`), ADR-0008, ADR-0017,
    `docs/assessment/2018-thesis-critical-assessment.md` (W2, W3).

This is methodology-bearing under R-C1 (an `analysis/*.py` script that defines a new target
construct, a feature block, and a validation design). It adds no dbt model — it reads existing,
already-gated intermediates as-is.

## 1. Is the out-of-time validation sound (no leakage)?

**Yes.** Train instances are `(features@2015 → label@2017)`; test instances are
`(features@2017 → label@2019)`. The two folds are disjoint in **both** feature-year and label-year —
no observation appears in both, and the model never sees 2017 features or 2019 labels during fit.
`assert_temporal_order` hard-fails if the split ever degenerates to non-forward. The `StandardScaler`
is fit inside the `Pipeline` on the training fold only (no test-set standardization leakage), and the
permutation null shuffles test labels against fixed test predictions (correct construction). Seeds are
pinned and row order is explicitly sorted before the positional shuffle, so the reported numbers are
reproducible. This genuinely upgrades the thesis's in-sample discipline (W2) to a forward-validated
one. No leakage.

## 2. Is the target construct defensible?

**Yes, as documented.** Deriving the target from `int_gentrification_ts.typology_stage`
(ADR-0008's governed D1×D2 matrix) rather than inventing a new construct is the right call, and
respects the G-1 guardrail (§1.2) — every output is framed as *signal / elevated risk*, never
"displacement occurred". The `consolidation-pressure ∪ active-gentrification` union is a reasonable
interpretive choice: `active-gentrification` (§1.5, "the heart of the upgrading process") is the
Dangschat double-cycle stage immediately upstream of `consolidation-pressure`, so it is the sensible
lead-side label. That `consolidation-pressure` has 0 rows in the 2019 test target — making the union
empirically near-identical to `active-gentrification` alone on this panel — is **not disqualifying**
for a Part-1 exploratory score, but it does mean the headline "displacement-risk" target here is de
facto "actively-gentrifying-at-t+2". That is a **framing constraint** (see conditions), not a
methodological error, because it is disclosed transparently in both the script and the findings doc.

## 3. Spatial-autocorrelation caveat — blocking?

**No, acceptable as a documented limitation here.** Uncorrected spatial dependence inflates the risk
of a **false positive** (overstated significance). This result is null / below-chance with p=0.781, so
the direction of the omitted correction cannot be rescuing a real signal into apparent noise — if
anything, honest spatial-cluster-robust inference would only widen the null. For a negative finding,
flagging the Tobler/Anselin caveat (correctly cited) rather than implementing spatial-HAC on a
classifier AUC is proportionate. **Condition:** if a *future* re-run produces an above-chance AUC that
anyone wants to publish or act on, spatial dependence in the evaluation must be addressed before that
claim stands.

## 4. `lor_pre2021` vs `lor_2021` panel choice — sound?

**Yes.** `lor_2021` has only 3 post-reform editions (2021/2023/2025), and `delta_dynamism_t` is null at
the first edition, leaving no forward-validatable two-wave split with the acceleration features
populated. Choosing the older vintage to obtain a genuine held-out future wave is the correct
methodological trade-off. The cost — results describe 2015–2019, not current Berlin — is disclosed.
The exclusion of rent/price acceleration (`est_rent_mid` only populated 2023+; a temporal-availability
mismatch with a 2015/2017 predictor wave, not a fabricated proxy) is the honest choice; substituting a
weaker proxy would have been worse, and expanding ingestion is correctly recognized as out-of-scope
(needs an architect/ADR decision).

## 5. Grounding (R-C2) spot-check

Accurate, not just decorative. Verified against `index-definition.md`: §1.3 line 113 is the exact
"Elevated displacement-pressure signal, NOT confirmed displacement (G-1)" cell; §1.5 matrix
(lines 150–151) supports the active→consolidation adjacency; §4.3 (line 402/466) is the binding
levels-only D4 rule, correctly honored by using `ewr_composite_t` as a level (no D4 delta); §2.4 is the
C5 correction that `delta_dynamism_t` already carries. Dangschat (1988) double-cycle framing is applied
consistently for the spatial-diffusion features; Anselin/Moran cited for the reused Queen-weights method
(`build_queen_weights`, shared with a9 rather than re-derived — good); ADR-0017 OA is a genuinely
independent second amenity signal; W3 is correctly invoked as the "suggestive-not-identified" motivation
with an explicit NOT-A-CAUSAL-EFFECT disclaimer. Citations are load-bearing and correctly applied.

## 6. Is a below-chance, null result an acceptable outcome for the acceptance criteria?

**Yes.** The ticket's Part-1 criterion is "an early-warning score with out-of-time validation... with
limitations documented" — not "a score that works". A forward-validated AUC of 0.4445 with permutation
p=0.781, reported honestly (not tuned away), with the overfitting gap (0.78 in-sample vs 0.44
out-of-time) surfaced as exactly the failure mode out-of-time validation exists to catch, **satisfies**
the criterion and is publishable as a negative finding. This is scientifically the correct behavior and
directly consistent with Epic B's directional-revival framing. Forcing a methodology revision to chase a
positive AUC would be the methodological error here.

## Risks / conditions (non-blocking, bind on future G2/#38 site framing)

1. **Do not present this as a working early-warning tool.** Any G2/methodology-page or site content
   must describe it as a *negative/inconclusive* out-of-time result on a short (single train→test wave,
   rare positive class) panel — not as a deployable displacement predictor.
2. **Target-label honesty.** Because `consolidation-pressure` is empty in the test fold, public framing
   must not imply the score predicts *displacement pressure specifically*; on this panel it predicts
   *active-gentrification at t+2*. State this.
3. **Single draw, wide variance.** Report the AUC as one replication, not a stable estimate; do not
   attach a spurious confidence interval.
4. **Spatial correction owed on any future positive result** (see §3).
5. **Re-run trigger.** Once a 2027 `lor_2021` edition (or additional waves) lands, re-run to obtain a
   distribution of out-of-time AUCs and to give `consolidation-pressure` a non-zero test count; that
   re-run is itself methodology-bearing and re-enters this gate.

These are conditions on *framing and future work*, not defects in the current deliverable.

**Verdict: PASS**
