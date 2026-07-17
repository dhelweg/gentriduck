# R-A8b — Unified 7-edition MSS trajectory panel across the 2021 LOR reform

Geo-DS methodology sign-off for `int_gentrification_ts_unified_2021.sql`
(branch `feature/260-r-a8b-trajectory`, issue #260).

Reviewer: geo-data-scientist
Date: 2026-07-16
Gate: R-C1 (methodology-bearing; touches an intermediate feeding the gentrification
trajectory classification).

## Scope reviewed
- `transform/models/intermediate/int_gentrification_ts_unified_2021.sql` (full)
- `transform/models/intermediate/int_berlin_lor_crosswalk_dominant_2021.sql` (dependency)
- `transform/models/intermediate/int_gentrification_ts.sql` (grounding source)
- `transform/seeds/seed_lor_crosswalk_2006_to_2021.csv` (crosswalk weights)

## Verdict

**Verdict: PASS WITH CONCERNS**

The central methodological premise is sound and correctly grounded: `status_index`,
`dynamik_index`, and `typology_stage` are ordinal whole-PLR classifications, so
area-weighted averaging is invalid (it silently assumes interval-scale properties the
MSS ordinals do not have). Choosing a single representative pre-2021 PLR ("dominant /
majority areal reassignment") is the standard categorical-variable analogue to areal
apportionment and is defensibly cited (Goodchild & Lam 1980; index-definition.md). Reuse
of the already-gated `int_berlin_lor_crosswalk_dominant_2021` rather than minting a new
crosswalk is the right call. The model is also a DRAFT input panel that does **not**
modify `fct_gentrification_trajectory`, so nothing published consumes it yet.

However, four issues must be resolved before any downstream model consumes this in place
of, or alongside, the current two-vintage design. Because the model is correctly labelled
draft/pending and is not yet wired into a published artefact, I sign off as PASS WITH
CONCERNS rather than FAIL — but concerns C1 and C2 are **blocking for downstream
consumption**.

## Concerns

### C1 (HIGH, blocking) — Wrong weight *direction* for a remap ONTO the 2021 scheme
`int_berlin_lor_crosswalk_dominant_2021` ranks by `weight DESC`, where the seed defines
`weight = intersection_area / pre2021_plr_area` (the *forward* share — how much of the
**pre-2021** PLR falls inside the 2021 PLR). For assigning a representative value **to**
a 2021 PLR, the correct areal-majority criterion is the pre-2021 PLR that occupies the
largest share **of the target 2021 PLR**, i.e. `reverse_weight = intersection_area /
lor2021_plr_area` (already present in the seed). Ranking by forward weight can select a
small pre-2021 PLR that is mostly *contained in* the 2021 PLR yet covers only a sliver of
it, over a large pre-2021 PLR that actually dominates the 2021 PLR's area. This was
tolerable for the QA-7b predictor bridge but is a genuine mis-selection for an outcome
remap. **Recommend re-ranking by `reverse_weight DESC`** (or documenting explicitly why
forward share is intended here — I do not think it is).

### C2 (HIGH, blocking) — Outcome panel is contaminated by predictor (POI) coverage
The model sources outcomes from `int_gentrification_ts`, whose Branch B **inner-joins**
MSS to `int_poi_status_dynamism_pre2021`. Consequences:
- The 2013 MSS edition is silently dropped (no POI join year), so the realized Berlin
  panel is **six** editions (2015, 2017, 2019, 2021, 2023, 2025), not the seven the SQL
  header claims ("all 7 available MSS editions (2013, 2015, 2017, 2019, ...)"). See C3.
- Any PLR/year lacking POI coverage is dropped from what is meant to be a pure **outcome**
  trajectory panel. Filtering an outcome series by predictor availability biases which
  PLRs receive a trajectory and is methodologically incorrect for a classification.
**Recommend sourcing the outcome columns directly from `stg_berlin_mss`** (the full MSS
outcome panel, incl. uninhabited flag) rather than from the POI-inner-joined
`int_gentrification_ts`.

### C3 (MEDIUM, R-C2 accuracy) — "7 editions" overclaim in the header
Given C2, the header's "one continuous ... panel spanning all 7 available MSS editions
(2013, ...)" is inaccurate — 2013 is not present. Because these headers feed the public
methodology page (Epic G2), correct the claim (either restore 2013 via C2's fix, or state
plainly the panel covers 2015–2025 / six editions and why 2013 is excluded).

### C4 (MEDIUM, reproducibility) — Non-deterministic tie-break in the crosswalk
`row_number() ... order by weight desc` has no explicit tie-break column; the crosswalk
header concedes rn=1 falls back to "DuckDB's default row order." Acceptable for a
directional regression; **not** acceptable for a *published, verbatim* outcome
classification, where the assigned class must be reproducible across engines/rebuilds.
**Recommend a deterministic secondary sort** (e.g. `order by weight desc, plr_id_pre2021`).

## Answers to the four flagged open questions

**Q1 — Is dominant-PLR the right rule for ordinal status/dynamik, or population-weighted
mode?** Dominant-PLR is *defensible and correctly reasoned* for ordinals (no interval
averaging). BUT for a **socio-economic** classification, a **population-weighted mode**
(the modal pre-2021 class across contributing PLRs, weighted by overlap population) is
methodologically **preferable**, because MSS scores areas by their resident population,
not their land area — the pre-2021 PLR contributing the most *people* to a 2021 PLR is a
better representative of its social status than the one contributing the most *hectares*.
The seed's `mapping_type = areal_pop_weighted` suggests population weighting is already
available. Dominant-area is acceptable as a *documented simplification* for a draft, but
if this feeds a published classification I recommend evaluating population-weighted mode
and reporting the disagreement rate between the two rules. At minimum, fix the
weight-direction (C1) first.

**Q2 — Is the pseudo-replication tolerance still acceptable on the outcome/published
side?** No, not at the same tolerance. On the predictor/directional side, shared bridged
values only inflated effective N (handled by reporting directional evidence). On a
**published outcome classification**, a `status_index` repeating verbatim across up to 6
neighbouring 2021 PLRs (~35% of PLRs sharing a value) manufactures artificial spatial
autocorrelation and would render, on a public map, clusters of identical trajectories
that are crosswalk artefacts rather than measured signal. This is a validity and
interpretability problem, not just an N problem. Required mitigations before publication:
(a) surface a provenance flag downstream (e.g. `is_bridged`, `n_lor2021_sharing_source`)
so consumers can see which trajectories are copies; (b) disclose the caveat prominently in
the methodology page; (c) prefer population-weighted mode (Q1) to reduce the incidence of
identical copies. The model already carries `remap_method`/`remap_weight` (good) but not a
shared-source count — add it.

**Q3 — Replace `fct_gentrification_trajectory` or run alongside?** Recommendation (not
binding on this ticket): **run alongside as a caveated supplementary/experimental view; do
NOT replace the two-vintage design.** The honest two-panel split avoids exactly the
bridging artefacts (pseudo-replication, boundary mismatch) this unified panel introduces.
The published default trajectory should remain the two-vintage panel; the unified series
is a value-add for continuous visualisation, clearly labelled as boundary-bridged. This is
correctly left undecided here.

**Q4 — Is trajectory clustering (k-means/DTW) correctly out of scope?** Yes, agreed. This
model only builds the input panel; the clustering/distance-measure choice is a separate
methodology-design question (it carries its own decisions — standardisation, ordinal
distance metric, alignment) and must not be smuggled in here. Correctly scoped out.

## Grounding / R-C2 check
Citations are adequate: Goodchild & Lam (1980) for areal reassignment; index-definition.md
and the model's own ordinal-scale argument for why averaging is invalid; QA-7b (#205) for
crosswalk reuse. One accuracy defect (C3, the 7-edition claim) must be corrected.

## Conditions for clearing to PASS / downstream consumption
1. C1 — re-rank the crosswalk selection by `reverse_weight` (or justify forward share).
2. C2 — source outcomes from the full MSS panel (`stg_berlin_mss`), not the POI-joined
   `int_gentrification_ts`.
3. C3 — correct the edition-count claim in the header.
4. C4 — add a deterministic tie-break.
5. Before any *published* consumption: add a bridged-provenance flag (Q2) and evaluate
   population-weighted mode (Q1).

Verdict: PASS WITH CONCERNS

---

# R-A8b — Geo-DS re-review, ITERATION 2

Reviewer: geo-data-scientist
Date: 2026-07-16
Gate: R-C1 (methodology-bearing)
Scope this iteration: `int_gentrification_ts_unified_2021.sql` (v2) and the new dependency
`int_berlin_lor_crosswalk_dominant_pop_2021.sql`, verified against the built DuckDB tables.

## Verification of the four blocking/prior concerns

**C1 (wrong crosswalk weight direction) — RESOLVED, and improved beyond the ask.**
Rather than simply flipping to `reverse_weight`, the data-engineer built a population-weighted
selection: `estimated_population_contribution = residents_total(pre2021, 2019) * weight`, where
`weight = intersection_area / pre2021_plr_area` (forward share). Under the documented
uniform-density-within-PLR assumption this product is the *actual estimated headcount* of a
pre-2021 PLR's residents falling inside a given 2021-PLR fragment — the correct extensive measure.
Ranking these across contributing sources selects the pre-2021 PLR that supplies the most PEOPLE
to the target 2021 PLR. This is methodologically preferable to my C1 reverse-area fix AND satisfies
my Q1 preference (population-weighted over area-based) and the domain expert's finding that MSS
indices are population-derived. Note: forward-weight is the *right* factor here precisely because
it is being multiplied by the source population; the reverse-weight critique applied only to a
pure-area majority pick, and the header correctly explains this distinction. The
`population_dominance_frac` denominator (`target_totals`, summed over all fragments of the 2021 PLR)
is the correct normalizer. Confirmed sound.

**C2 (outcome panel contaminated by POI join) — RESOLVED.** v2 sources
status_index/dynamik_index/gesamtindex directly from `stg_berlin_mss` (both `lor_pre2021` and
`lor_2021` vintages); `typology_stage` is recomputed via the shared `typology_stage` macro. No
POI/predictor dependency remains. Confirmed against built data: the panel is a pure outcome panel.

**C3 (7-edition overclaim) — RESOLVED and empirically confirmed.** Built table carries all seven
editions: 2013 (541), 2015 (541), 2017 (541), 2019 (541), 2021 (542), 2023 (542), 2025 (542). 2013
is now present. The header claim is accurate.

**C4 (non-deterministic tie-break) — RESOLVED.** Crosswalk uses
`ORDER BY estimated_population_contribution DESC, plr_id_pre2021`. Deterministic and reproducible.

## Verification of the Q2 provenance/disclosure columns
- `is_bridged`: correct — false for the 542-PLR lor_2021 passthrough (1626 rows = 542×3 editions),
  true for the remapped pre-2021 rows (2164 = 541×4 editions).
- `n_lor2021_plrs_sharing_this_source`: correct, max = 6 (matches the domain-measured rate);
  null on passthrough rows, which is right.
- `population_dominance_frac`: computed correctly (dominant contribution / total apportioned
  population to the 2021 PLR, capped at 1.0). Observed range 0.59–1.00 (mean 0.99). It is a genuine
  continuous diagnostic and would let a consumer threshold low-confidence bridged values; no zero-
  population dominant selections exist. This mirrors the `overlap_frac` "expose-raw-fraction,
  defer-cutoff" precedent as intended.

## Residual (non-blocking, draft-acceptable) notes
1. **Single 2019 population baseline for all remap years.** Acceptable as a documented
   simplification: the ranking depends on *within-PLR distribution* stability, not population level,
   which is reasonable over 2013–2019. Confirmed acceptable for a draft; should be revisited (or a
   sensitivity check run) only if this panel is ever wired into a *published* classification.
2. **One 2021 PLR (09401433) has no bridged history**, because its dominant pre-2021 source
   (09041403, dominance_frac 0.9998) is absent from `stg_berlin_mss` (an unscored/uninhabited
   pre-2021 PLR). This is a legitimate upstream data gap, not a bug — the LEFT/INNER joins drop it
   cleanly. Worth a one-line header note in a future revision, but not blocking.
3. **Ecological-inference / MAUP framing** in the header is accurate and well-cited (Openshaw 1984;
   Robinson 1950; Goodchild & Lam 1980). The model honestly scopes itself as an unconsumed DRAFT and
   correctly defers domain C-1 (seam-aware trajectory handling) and clustering to a future ticket.

## Scope confirmation
The model remains an unconsumed DRAFT, not wired into `fct_gentrification_trajectory`. What is gated
here is integration to `develop` as an internal draft artifact — appropriate. Public/downstream
consumption still requires the future seam-aware-trajectory sign-off, which the header correctly
states is out of scope. All prior blocking concerns are cleared.

Verdict: PASS
