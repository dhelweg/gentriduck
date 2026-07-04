# Geo-Data-Scientist Sign-off: B7 (#117) — lor_pre2021 MSS 2015/2017/2019 Panel Extension

- **Scope:** B7 #117 / PR #121 — thesis-era (lor_pre2021) lead-lag panel:
  `int_poi_status_dynamism_pre2021`, `int_ewr_socioeco_pre2021`, the Branch B UNION in
  `int_gentrification_ts`, and E1 Section 3 (`analysis/e1_regressions.py`,
  `docs/epic-e/E1-regression-findings.md`).
- **Operationalizes:** ADR-0008 (multi-dimensional model), index-definition.md §6 (LOR vintage
  discipline), §2.4 (C5 binding), §3 (D1 ordinality). Epic B directional-revival framing.
- **Reviewer:** geo-data-scientist
- **Date:** 2026-06-30
- **Branch:** PR #121 → develop
- **Prior gate:** data-engineer-reviewer PASS (no blocking findings).
- **Verdict:** PASS WITH CONDITIONS

---

## 1. Summary

B7 mirrors the established lor_2021 D3/D4 pipeline into the contemporaneous ~447-PLR boundary
system so that H2/H3 can be tested on the thesis's *own* spatial universe and era. The construction
is methodologically faithful to the R-A1 index definition: native pre-2021 z-scores (not
crosswalk-back-aggregated), C5 share-based dynamism, within-vintage lag enforcement, and a UNION
that cannot mix vintages. The four R-A1 conditions that bear on this work (C-3 PLR-count
reconciliation, C-4 pre-2021 D3 geometry choice, vintage discipline, C5-before-lead-lag) are each
respected. The new evidence is correctly framed as directional and is honestly reported as **weak
and largely non-confirmatory** on the MSS pre-2021 panel.

I verified the load-bearing claims against the source:
- `int_poi_status_dynamism_pre2021` reads `int_poi_share_base` filtered to `area_vintage =
  'lor_pre2021'`, computes `share_yoy_change` via LAG partitioned by
  `(city_code, area_code, area_vintage)`, and z-scores `total_poi_count` and `share_yoy_change`
  within `(city_code, snapshot_year)`. This is the C5-correct, within-population construction.
  Confirmed.
- `int_mss_lead_lag` enforces `base.area_vintage = lagged.area_vintage` on the self-join and never
  bridges 2019→2021. Branch A and Branch B carry disjoint `area_vintage` values; `union all` cannot
  produce a cross-vintage row. Confirmed.
- E1 Section 3 calls `load_lead_lag_data(con, vintage='lor_pre2021')`, which filters
  `int_mss_lead_lag` to the pre-2021 vintage; the POI pivot join keys on
  `ll.area_vintage = p.area_vintage`. No cross-vintage leakage in the analysis. Confirmed.

This is a PASS WITH CONDITIONS, not an unconditional PASS, because two interpretation guardrails
(H3a/H3b temporal-precedence over-claim risk, and the n=0/single-pair coverage of the MSS H3 panel)
must be held before any of this is surfaced on a public/G2 artefact.

---

## 2. The five methodology concerns

### Concern 1 — Z-score cross-vintage comparability. **Sufficient.**

The isolation is enforced at three independent layers, not asserted: (a) the two pre-2021 models
normalize within the ~447-PLR population per year; (b) `int_mss_lead_lag` constrains
`base.area_vintage = lagged.area_vintage`; (c) the UNION operands are disjoint by `area_vintage` and
the E1 loader filters by vintage. The only path by which a lor_pre2021 z-score could be compared to a
lor_2021 z-score would be an analyst computing a delta across the two Section-2/Section-3 tables by
hand — which the SQL headers, the E1 limitations block, and index-definition.md §6.2 all explicitly
prohibit. No model produces such a quantity. This discharges the R-A1 geo-2 vintage condition for the
pre-2021 branch. Acceptable.

### Concern 2 — H3a/H3b Spearman symmetry on MSS data. **Real limitation; correctly disclosed, must not be over-read.**

The reviewer is correct that `Spearman(Δstatus, Δdyn) ≡ Spearman(Δdyn, Δstatus)`, so MSS H3a and H3b
return identical rho by construction. This is **not** a valid operationalization of the *lead-lag*
(temporal-precedence) hypothesis: H3a and H3b in the thesis are directional claims (which cycle
*leads*), and a symmetric co-movement statistic cannot distinguish them. The deeper cause is
structural: in the MSS panel both `delta_status_ordinal` (t→t+k) and `delta_dynamism_t` (t vs t−1)
collapse onto effectively the same `[t, t+k]` window at the available cadence, so there is no genuine
lead offset to exploit. Spearman alone therefore **cannot** test MSS H3a/H3b temporal precedence.

What rescues this for sign-off: (a) the divergence note in E1 (the bullet added in PR #121) and the
`test_h3` docstring state this explicitly and downgrade the MSS H3a/H3b to a co-movement reading; (b)
the genuine directional test does exist in the codebase — the **EWR same-era lead-lag** (Section 4,
annual k≥1 offset, metric delta) preserves a real predictor/outcome time separation and is where the
H3b "status leads commerce" claim should be adjudicated; (c) H3c (contemporaneous) remains the
defensible MSS test. So the MSS H3a/H3b numbers are admissible as *reported co-movement*, not as
lead-lag confirmations. Condition C-1 binds this.

### Concern 3 — H3b n=0 at k=2 (missing 2013 MSS). **Acceptable with documented caveat; not blocking.**

`delta_dynamism_t` needs the prior MSS edition; for edition_t=2015 the 2013 edition is not yet
ingested, so the 2015→2019 (k=2) pair yields no H3a/H3b predictor and only the 2017→2019 pair feeds
H3a/H3b at k=1 (n=435, vs n=871 for H3c which uses levels). This is honest missingness, not a silent
defect: the `run_spearman` n<10 guard returns a clean N/A row rather than a spurious statistic, and
the limitation is documented and routed to B8 (#118). For a directional revival this is an acceptable
known gap — the pre-2021 H3 lead-lag is simply *underpowered until B8*, which is the correct thing to
say rather than to manufacture a result. Condition C-2 requires this caveat to travel with the numbers.

### Concern 4 — ewr_composite scale asymmetry (std ~0.34 pre-2021 vs ~0.84 lor_2021). **Concern for `legacy_gentrification_score` only; does not affect the B7 headline analysis.**

The high inter-indicator correlation (foreigners ↔ migration_background r≈0.93) shrinks the variance
of the 5-indicator mean in the pre-2021 population, so `ewr_composite` is on a different effective
scale across vintages. Consequences:
- `legacy_gentrification_score = (status_score + dynamism_score − ewr_composite)/3` inherits this and
  is therefore **not cross-vintage comparable**, compounding the additive-z aggregation concern
  already flagged at R-A1/ADR-0008 (the formula has no theoretical grounding and is retained only as a
  legacy diagnostic). This must be labelled non-comparable, and ideally the column should carry a
  deprecation note.
- Critically, **none of the B7 E1 Section-3 tests consume `ewr_composite` or
  `legacy_gentrification_score`**: H2 uses `poi_count_t` vs `delta_status_ordinal`; H3a/H3b use
  `delta_dynamism_t` vs `delta_status_ordinal`; H3c uses `dynamism_score_t` vs `status_index_t`. EWR
  enters the lead-lag only as a baseline *level* per index-definition.md §4.3, and the B7 regression
  sections do not even pull it. So the scale asymmetry has **no impact on the reported findings**.
- The r≈0.93 collinearity is itself a substantive D4 observation: foreigners_share and
  migration_background_share are near-redundant in this population. A mean-of-5 with two collinear
  members effectively over-weights that demographic axis. This is a pre-existing index-definition
  question (not introduced by B7) but should be recorded for the D4 indicator-set review. Condition C-3.

### Concern 5 — C5 coverage bias in the pre-2021 (2015–2019) era. **Adequately controlled by share-normalization; residual bias is larger but correctly bounded by the C5 sign-off's own caveat.**

The C5 mechanism (PLR share of city-wide POIs; uniform-coverage-growth cancels in the ratio) is
applied identically here, and the city-wide total is correctly recomputed within the lor_pre2021
population. The C5-geo-signoff already anticipated exactly this era: it states the *bulk* of OSM
coverage growth predates 2015 and that the uniform-coverage assumption is "less problematic"
post-2015 — but it also flags that **non-uniform** early mapping (inner-city PLRs mapped first) can
produce spurious share dynamics, and that risk is mechanically larger when absolute coverage is ~40%
or lower because each newly-mapped cluster moves a PLR's share more. Share-normalization removes the
first-order city-wide-growth artefact but does **not** remove non-uniform spatial coverage drift;
attenuation toward null (regression dilution from predictor measurement error) is the expected
direction of the residual bias. That is consistent with the near-zero pre-2021 dynamism correlations
observed — i.e. the weak results may partly reflect predictor noise, not only a true weak effect.
This is acceptable for a directional revival provided it is stated and not used to assert a null.
Condition C-4. The rigorous fix (ohsome edit-density, Option B) remains correctly deferred.

---

## 3. Conditions

All conditions are **interpretation/labelling guardrails**, satisfiable in docs; none requires a
model rebuild and none blocks integration into `develop`. They bind before any B7 result is published
to G2.

- **C-1 [Required before any published H3 claim].** MSS H3a/H3b (Section 2 and Section 3) must be
  reported as **co-movement, not temporal precedence** — the Spearman-symmetry collapse means they
  cannot adjudicate lead-lag. Any "status leads commerce" / "commerce leads status" statement must be
  sourced from the EWR same-era lead-lag (Section 4) or an explicit ordered/offset model, never from
  the MSS H3a/H3b rho. The divergence bullet added in PR #121 satisfies this in the findings doc;
  carry it verbatim to G2.

- **C-2 [Required].** The pre-2021 H3a/H3b coverage caveat (k=1 = 2017→2019 pair only; k=2 n=0 pending
  2013 MSS ingestion in B8 #118) must travel with the Section-3 table wherever it is reproduced. Do
  not present the pre-2021 H3 lead-lag as a full panel until B8 lands.

- **C-3 [Required, labelling].** `legacy_gentrification_score` and `ewr_composite` must be flagged
  **not cross-vintage comparable** (pre-2021 std ~0.34 vs lor_2021 ~0.84). Add the note to the
  Branch-B select comment in `int_gentrification_ts.sql` and to the E1 limitations block. Record the
  foreigners↔migration_background r≈0.93 collinearity for the D4 indicator-set review (it predates B7).

- **C-4 [Required, labelling].** State, alongside the pre-2021 results, that C5 share-normalization
  removes city-wide coverage growth but **not** non-uniform early-era spatial mapping drift, and that
  the expected residual effect is attenuation toward null — so the weak/near-zero pre-2021 dynamism
  correlations must not be read as evidence of a true null. This extends the existing C5 limitation to
  the 2015–2019 window.

- **C-5 [Advisory].** Confirm the §7.1 uninhabited-PLR exclusion and the R-A1 C-3 "447 analysed = 448
  source − N excluded" reconciliation hold in the pre-2021 branch (the `is_uninhabited` filter in
  `int_mss_lead_lag` should already enforce this); report N excluded per pre-2021 edition when the
  Epic B headline is written.

---

## 4. Risks

1. A reader treats the MSS H3a/H3b rho as a lead-lag confirmation despite the symmetry collapse
   (mitigated by C-1).
2. The pre-2021 H3 panel is mistaken for complete before B8 closes the 2013 gap (mitigated by C-2).
3. `legacy_gentrification_score` is compared across vintages despite incomparable EWR scale
   (mitigated by C-3); the additive-z formula remains theoretically ungrounded (legacy diagnostic
   only, per ADR-0008/R-A1).
4. Non-uniform pre-2015 OSM coverage attenuates pre-2021 dynamism signals; weak results partly reflect
   predictor noise, not a clean null (mitigated by C-4).
5. Spatial-robust SEs (R-A9) are still owed before any pre-2021 significance/dominance claim ships —
   the lone significant pre-2021 cell (H3c k=2, rho=+0.104, p=0.031, **wrong sign**) is in any case
   non-confirmatory and must not be cited as support for the thesis.

---

## 5. Certification

The B7 statistical and spatial methodology is sound, reproducible, and adequately grounded
(R-C2 citations present in all three models and in the E1 hypothesis table). The pre-2021 mirror is
constructed correctly (native within-population z-scores, C5 share-dynamism, within-vintage lag), the
cross-vintage isolation is enforced rather than assumed, and the new evidence is honestly framed as
weak directional MSS-panel support that does **not** independently confirm the thesis lead-lag — the
confirmatory weight continues to rest on the EWR same-era panel (Section 4, 15/15). The conditions are
documentation guardrails only.

**The PM MAY integrate PR #121 into `develop`** (pending the independent `gentrification-domain-expert`
PASS required by the R-C1 dual gate), subject to C-1 through C-4 being reflected in the findings/G2
write-up.

```json
{
  "verdict": "concerns",
  "rationale": "B7 faithfully mirrors the lor_2021 D3/D4 pipeline into the contemporaneous ~447-PLR system using native within-population z-scores, C5 share-based dynamism, and within-vintage lag enforcement; cross-vintage isolation is enforced at three independent layers (model normalization, int_mss_lead_lag vintage guard, disjoint UNION + vintage-filtered E1 loader), not merely asserted. The new evidence is correctly framed as weak, directional, and non-confirmatory on the MSS pre-2021 panel. PASS WITH CONDITIONS rather than unconditional PASS because two interpretation guardrails must hold before publication: MSS H3a/H3b are symmetric co-movement statistics that cannot test temporal precedence, and the pre-2021 H3 lead-lag is single-pair/underpowered until B8 ingests the 2013 MSS. The ewr_composite scale asymmetry affects only the ungrounded legacy_gentrification_score, which no B7 test consumes. C5 share-normalization controls city-wide coverage growth but not non-uniform pre-2015 spatial mapping drift, so weak pre-2021 dynamism results must not be read as a true null. All conditions are documentation/labelling guardrails; none blocks integration into develop.",
  "risks": [
    "MSS H3a/H3b Spearman symmetry: identical rho by construction; cannot adjudicate lead-lag temporal precedence — must be reported as co-movement only",
    "Pre-2021 H3 panel is single-pair (2017->2019) at k=1 and n=0 at k=2 until B8 (#118) ingests the 2013 MSS edition",
    "ewr_composite / legacy_gentrification_score not cross-vintage comparable (pre-2021 std ~0.34 vs lor_2021 ~0.84; foreigners<->migration r~0.93); legacy_gentrification_score additive-z formula remains theoretically ungrounded",
    "Non-uniform pre-2015 OSM coverage drift not removed by C5 share-normalization; expected residual is attenuation toward null, so weak pre-2021 dynamism correlations are not evidence of a true null",
    "Spatial-robust SEs (R-A9) still owed before any pre-2021 significance claim; the one significant pre-2021 cell (H3c k=2) is wrong-signed and non-confirmatory"
  ],
  "recommendations": [
    "C-1: report MSS H3a/H3b as co-movement, not lead-lag; source any precedence claim from the EWR same-era panel (Section 4)",
    "C-2: keep the single-pair / k=2 n=0 caveat attached to the Section-3 table; do not present the pre-2021 H3 panel as complete until B8",
    "C-3: label ewr_composite and legacy_gentrification_score not cross-vintage comparable in int_gentrification_ts.sql and E1 limitations; log the r~0.93 D4 collinearity for indicator-set review",
    "C-4: state that C5 removes city-wide growth but not non-uniform early-era spatial coverage drift (attenuation toward null) for the 2015-2019 window",
    "C-5: confirm the 447=448-N uninhabited reconciliation and report N excluded per pre-2021 edition for the Epic B headline"
  ]
}
```

---

## Final Verdict

Verdict: PASS WITH CONDITIONS
