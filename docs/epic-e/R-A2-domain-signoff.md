# Domain-Expert Sign-off: R-A2 (#65) E1/E2 thesis validation rewrite

**Issue:** #65
**Branch:** feat/65-e1e2-rerun
**Reviewer:** gentrification-domain-expert
**Date:** 2026-06-29

## Verdict: FAIL

## Summary

The rewrite is a genuine improvement in *framing* — it correctly restores POI features as
predictors and MSS social status as the outcome, cites the thesis, and adds honest
divergence/limitation sections. However, it is **not yet defensible on theory fidelity**: the
sign convention of `status_index` is inverted relative to what the scripts assume, so the
headline "directional agreement" verdicts (H1, H1b, H2, H3b) are scored against the wrong
expected direction; the H3 lead-lag uses a POI *level* and a raw, **non-C5-corrected** count
delta as predictors, which both contradicts the lead-lag model the engineers built and
re-introduces the exact bias that model was designed to prevent; and `delta_status_ordinal` is
correlated as if metric, violating the binding ordinal rule. These are blocking because the
"replicates vs. diverges" narrative they produce would mislead the public methodology page (#38).

## Findings

### BLOCKING

**D1 — `status_index` polarity is inverted; H1/H1b/H2/H3b directions are scored backwards.**
Both `status_index` scales in play encode *higher numeric = more deprived = lower social status*:
- 2018 golden (`stg_thesis_2018_result_plr`, from `reference/system/50_lor_mss_idx_bzr_idx.sql`
  lines 14–20): `status_index < -1 → "hoch"` (high status), `status_index > 1.5 → "sehr niedrig"`
  (low status). Higher z-score = worse status.
- Live MSS panel (`int_mss_lead_lag`): ordinal `1=hoch … 4=sehr_niedrig` (header lines 19–23;
  `index-definition.md` §5 line 127: "Lower numeric = higher status").

The scripts assume "POI supply positively correlates with status" means rho > 0 against
`status_index`. Given the inverted scale, the theory-consistent sign is **negative**. So H1's
observed rho = −0.0463 (E1) is in the *correct* direction but is reported as "FAIL / diverges
from thesis." Same inversion mis-scores H1b (fast-food, expected_dir wrong), H2 (negative rho
reported as divergence when it is the expected direction), and H3b. The `index-definition.md` §5
table (line 418) flags this explicitly: D1 is "INVERSE numeric vs 2018 thesis ... Must flip when
comparing to 2018 baseline." The scripts do not flip. Until expected directions are reconciled to
the documented polarity, the directional-agreement column and every "replicates/diverges" verdict
in both findings docs are unreliable and must not reach #38. (R-C2 grounding: the sign convention
must cite `index-definition.md` §5 / `50_lor_mss_idx_bzr_idx.sql`.)

**D2 — H3 lead-lag predictors contradict the model design and re-introduce the C5 bias.**
`int_mss_lead_lag` was built (header lines 7–15, 25–29) so that H3a uses Δamenity_t
(`delta_dynamism_t`, the C5-corrected `dynamism_score` change) → Δstatus_{t+k}, and H3b uses
Δstatus_t → Δamenity_{t+k}. The E1 script instead:
- H3a: uses `dynamism_score_t` (a *level*, not Δamenity_t) — this is not the lead variable the
  hypothesis names.
- H3b: uses raw `delta_poi = poi_count_tk − poi_count_t` (uncorrected OSM count delta) as the
  outcome. The model header is explicit: "Feeding uncorrected coverage growth into H3b would bias
  the test toward false confirmation." The 98–99% positive `delta_poi > 0` rate in E2 is precisely
  this artefact — OSM coverage grew almost everywhere, so the "POI grew" outcome is near-constant
  and carries little signal about commercial succession. The C5-corrected `delta_dynamism`
  (z-score of share_yoy_change) is the field built to remove this. Using raw counts is a
  methodology regression, not a faithful test of Dangschat's commercial-succession cycle.

**D3 — `delta_status_ordinal` correlated/regressed as if metric (ordinal violation, R-A3 C2).**
`index-definition.md` §3 (lines 290–303) is binding: the Status class is ordinal with non-uniform
cut-points; "Pearson correlation on raw codes, OLS with the class code as a metric response" and
metric differencing are forbidden. §3.1 (line 241) and §3.3 (lines 307–309) mandate expressing
Δstatus as a **signed ordinal transition** (improved/stable/worsened) — which the model already
provides as `status_transition` — or as the binary `high-status-loss`. The scripts instead take
the numeric subtraction `delta_status_ordinal` and feed it to Spearman (H3a/H3c) and as a metric
classifier feature (E2 H3b: `delta_status_ordinal` as an X column). Spearman on a 4-level code
with heavy ties is weak but arguably tolerable; using the numeric difference as a continuous
regression/classifier feature is the violation. Use `status_transition` (ordinal) or the §3.3
binary outcome.

### NON-BLOCKING (fix opportunistically; do not gate on these)

**D4 — H1b fast-food framing is too strong for the literature.** The doc asserts fast-food is a
"displacement/low-status indicator — negative predictor." In gentrification theory fast-food
density is an ambiguous proxy: it co-occurs with both low-income retail landscapes *and* high-
footfall gentrifying commercial strips. The thesis may report a negative cross-sectional sign, but
the public framing should present fast-food as a *contested* proxy, not a settled displacement
marker (Lees/Slater/Wyly caution against single-amenity displacement reads). Soften the citation
text.

**D5 — H3c labelled "simultaneous co-movement" but operationalized as level-vs-level.** E1 H3c
correlates `dynamism_score_t` against `status_index_t` (two contemporaneous *levels*), while the
hypothesis name and `index-definition.md` framing concern co-*movement* (Δ vs Δ in the same
window). A level-level correlation is a different claim (cross-sectional association, ≈ H1 on the
live panel) and should be relabelled accordingly so #38 readers are not told this tests
simultaneity.

**D6 — Class-imbalance caveat is good but treats a symptom.** The H3b imbalance warning (E2,
98–99% positive) is well written and transparent — credit where due. But the imbalance is a direct
consequence of D2 (raw OSM count growth). Fixing D2 (use C5-corrected `delta_dynamism`, and/or a
relative-growth or above-median-growth target) largely dissolves the degeneracy; the caveat should
not be the resolution. Keep the caveat as a backstop after the predictor fix.

**D7 — Positive: invasion-succession interpretation is otherwise sound.** The core lead-lag
hypothesis framing (H3b status→POI confirmed, H3a POI→status rejected, social cycle leads
commercial cycle per Dangschat 1988) is correctly attributed and matches the lead-lag model header.
Once D1–D3 are fixed, the conceptual scaffold is faithful and suitable for #38. The honest
"replicates/diverges," vintage-mismatch, and k=3-deferred sections are exactly the right register
for the public methodology page.

## Recommended path to PASS

1. Reconcile every `expected_dir` to the documented `status_index` polarity (flip H1, H1b, H2, H3b
   expectations), citing `index-definition.md` §5 and `50_lor_mss_idx_bzr_idx.sql` in the script.
2. Re-point H3a to `delta_dynamism_t` (C5-corrected Δamenity) and H3b's outcome to the
   C5-corrected dynamism change rather than raw `delta_poi`.
3. Replace metric use of `delta_status_ordinal` with `status_transition` (ordinal) or the §3.3
   `high-status-loss` binary.
4. Re-run; regenerate both findings docs; relabel H3c; soften the H1b fast-food claim.

These are mechanical, well within the ~3-iteration cap. Coordinate the polarity and C5 fixes with
the geo-data-scientist, as they bear on statistical soundness too.
