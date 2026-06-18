# C4 Geo-Data-Scientist Sign-Off

- **Task:** C4 time-series gentrification index (`int_gentrification_ts`) combining POI status/dynamism + EWR socio-economic composite, 2008–2024
- **Issue / PR:** #24 / PR #61 (dhelweg/gentriduck)
- **Date:** 2026-06-19
- **Verdict: PASS WITH CONDITIONS**

The five decisions you listed are individually defensible for a directional revival (Epic B framing) and the model's NULL discipline is correct. However, I found two issues that are *not* in your five-question list and that must be fixed or formally tracked before this index is consumed by Epic D/E/F: (a) a comment/code mismatch in the EWR composite sign convention, and (b) the unresolved directional **semantics** of the composite versus the POI scores. Details below.

---

## Assessment of the five decisions under review

### 1. Equal 1/3 weighting (status + dynamism + ewr_composite) / 3

**Defensible as a documented default; not blocking.** Equal weighting is the standard, transparent baseline for a composite index when there is no empirical basis to prefer one weighting (OECD/JRC *Handbook on Constructing Composite Indicators*, 2008). It is reproducible and matches ADR-0004's "transparent over black-box" principle. The 2018 thesis did **not** combine its domains as a simple 1/3 mean — it built a status index, a dynamism index, and an `own_idx`/socio-economic side separately and related them via regression (`reference/system/71_oa.sql` shows share-weighted category stocks, not an equal-weight grand mean). So this is a *new* aggregation choice, not a reproduction of the paper, and should be labelled as such on the methodology page (G2).

Two sub-conditions:
- **Scale parity is broken (see #2).** `ewr_composite` is a *sum* of 5 z-scores while `status_score` and `dynamism_score` are *single* z-scores. So the "equal 1/3 weight" is not actually equal — EWR dominates the mean by roughly a factor of √5 in variance terms. This must be fixed before the weights mean what the comment claims.
- Record the weight vector `(1/3, 1/3, 1/3)` as an explicit, parameterised constant feeding ADR-0004's governed definition, so a future sensitivity analysis can vary it.

### 2. Z-score normalisation and equalisation of scale

**Partially incorrect as implemented — this is a CONDITION.** Each upstream component is z-scored per city-year, which is the right cross-sectional normalisation and correctly removes year-to-year level drift (important given OSM completeness growth — a z-score within a year is far more robust to mapping-completeness inflation than a raw count). **But** `ewr_composite` is the *sum* of 5 z-scores (`int_ewr_socioeco.sql` lines 144–150), giving it an expected variance of ~5 (≈ √5 larger SD) versus the unit-variance `status_score`/`dynamism_score`. Averaging a unit-variance term with a √5-variance term is **not** an equal contribution. To make the 1/3 mean honest, either:
- divide `ewr_composite` by 5 (mean of z-scores), or
- re-z-score `ewr_composite` across PLRs per year before it enters the grand mean (preferred — guarantees unit variance regardless of how many sub-indicators are present and is robust to indicators dropping in/out across years).

### 3. Cross-vintage NULL dynamism at the 2021 LOR break

**Correct — approved.** Computing YoY deltas only within `area_vintage` is the methodologically clean choice; a 2020→2021 delta would be comparing different spatial units (≈20% of PLR boundaries changed) and would inject MAUP artefacts straight into dynamism. Emitting NULL `dynamism_score` for 2021 (and 2008) is the honest result. Cross-vintage interpolation (issue #51) should **not** block C4 — and frankly should be done via an area-weighted 2019↔2021 crosswalk (as I recommended in C3), not naive interpolation. Do not let #51 ship as time interpolation across the break.

### 4. Pre-2015 EWR sparsity → NULL composite → NULL score (no imputation)

**Correct — approved.** Propagating NULL rather than substituting 0 is right: a 0 z-score is "exactly average," which is a fabricated, biasing claim. NULL = "unknown," which is true. The only consequence is that the index time series effectively starts 2015 for any analysis requiring all three components; document that the *POI-only* sub-series (status+dynamism) extends back to 2009.

### 5. Suppressed-cell PLRs → NULL composite → NULL score (no imputation)

**Correct — approved.** Statistical-disclosure suppression is informative-missing-at-best and must not be imputed silently. NULL propagation is the defensible default. One recommendation: surface a `score_completeness` flag / component-presence count on the row so downstream consumers can distinguish "NULL because suppressed" from "NULL because pre-coverage," rather than collapsing both to a bare NULL.

---

## Issues found outside the five questions (blocking-ish)

### A. EWR composite sign convention: comment contradicts code (CHANGE REQUIRED)

`int_ewr_socioeco.sql` lines 116–123: the comment says `mean_age_years` is *"inverted: higher mean age -> lower vulnerability,"* but the SQL computes a plain z-score with **no negation**. So either the code or the comment is wrong. More fundamentally, the composite mixes indicators whose directional relationship to *gentrification* is not consistent or even agreed:
- `foreigners_share`, `migration_background_share`, `age_under18_share`, low `mean_age_years`, low `residence_duration_5y_share` are classically markers of an *un-gentrified / pre-gentrification* population (the thesis treated these as the baseline that gentrification erodes).
- The header of `int_gentrification_ts` and `int_ewr_socioeco` describes the composite as "more socio-economically vulnerable populations," yet adds it with a **positive** sign to status/dynamism in `gentrification_score`. A higher gentrification score should mean *more gentrified*, but a higher "vulnerability" composite means *less* gentrified. As written, the EWR term likely enters the gentrification score with the **wrong sign** for several indicators.

This is the core meaning-correctness issue. Before merge, the data-engineer + analyst must (1) write down the intended sign of each of the 5 indicators with respect to gentrification, (2) make the SQL match (explicit negation where needed), and (3) make the comments match the SQL. Until then, `gentrification_score` direction is not interpretable. I am allowing this as a **condition** rather than hard CHANGES-REQUIRED only because Epic B is explicitly *directional* and C4 is an intermediate (not a published mart) — but it **must** be resolved before any B4/D3/E2 consumer or the G2 methodology page.

### B. Mapping-completeness bias (Epic C5) is still upstream of this index

Per the C3 sign-off, `total_poi_count` is a raw count reflecting both real density and OSM mapper attention. Per-year z-scoring of `status_score` partially mitigates *level* inflation, but **`dynamism_score` is built on YoY raw-count deltas** and is therefore directly exposed to completeness growth — a PLR that simply got better-mapped in year *t* will post a positive dynamism z-score indistinguishable from real churn. This is exactly the survivorship/completeness pitfall C5 must correct. C4 may ship as an intermediate, but the C5 coverage normalisation is a hard prerequisite before `dynamism_score` is published or used in regression (E2).

---

## Risks

1. **Scale imbalance:** EWR composite (sum of 5 z-scores) silently dominates the 1/3 mean (~√5 over-weight) — the index is not actually equal-weighted.
2. **Sign error:** EWR composite likely enters `gentrification_score` with the wrong directional sign for several indicators; comment/code mismatch on `mean_age_years` confirms the convention was never nailed down.
3. **Completeness bias in dynamism:** YoY raw-count deltas inherit OSM mapper-attention growth; uncorrected until C5.
4. **Two-distinct-NULL meanings** (pre-coverage vs suppression) collapsed to a single NULL, hindering downstream diagnostics.
5. **Migration indicator break (~2017):** `migration_background_share` is only comparable from 2017 (Mikrozensus reform, noted in-model); cross-year composite comparisons before/after 2017 are not strictly valid.

## Recommendations (non-blocking)

1. Parameterise the weight vector as an explicit constant tied to ADR-0004; run a one-off weight-sensitivity check once data lands.
2. Add a `n_components_present` (0–3) and component-NULL-reason flag to each row.
3. On G2, state plainly that the 1/3-mean grand index is a **new** C4 construction, not a reproduction of the 2018 thesis aggregation.
4. Validate the directional revival (Epic B): the rank correlation of the C4 status index against the thesis status index on overlapping years should be strongly positive — add this as a documented spot-check.
5. Consider winsorising z-scores (e.g. ±3 SD) before summing, so a single extreme PLR-year does not swing the composite.

## Conditions to clear before Epic D/E/F (not before this intermediate merges)

- [ ] **C2-fix:** re-normalise `ewr_composite` to unit variance (mean of z-scores or re-z-score) so 1/3 weighting is honest.
- [ ] **C2-fix:** fix EWR composite sign convention; make code, comments, and the intended gentrification direction agree (resolve the `mean_age_years` comment/code mismatch).
- [ ] **C5:** ship mapping-completeness normalisation before `dynamism_score` / `gentrification_score` is published or fed to E2 regression.
- [ ] Add component-presence / NULL-reason flag.

---

## Sign-Off

```json
{
  "verdict": "concerns",
  "rationale": "Per-city-year z-scoring, within-vintage YoY deltas across the 2021 LOR break, and NULL-propagation for pre-2015 and suppressed EWR cells are all methodologically correct, and equal 1/3 weighting is a defensible transparent default for a directional revival. However the index is not actually equal-weighted (ewr_composite is a SUM of 5 z-scores, ~sqrt(5) over-weighted vs the single-z status/dynamism terms), and the EWR composite's directional sign is unresolved (mean_age_years comment says inverted but code is not, and a 'vulnerability' composite is added with a positive sign to a gentrification score). C4 may merge as an intermediate, but these must be fixed before any published mart, the G2 methodology page, or E2 regression.",
  "risks": [
    "ewr_composite (sum of 5 z-scores) silently dominates the 1/3 mean — index is not equal-weighted as documented",
    "EWR composite likely enters gentrification_score with the wrong directional sign for several indicators; mean_age_years comment/code mismatch",
    "dynamism_score is built on raw YoY count deltas and inherits OSM mapping-completeness growth until C5 normalisation lands",
    "pre-coverage NULL and suppression NULL are collapsed to a single indistinguishable NULL",
    "migration_background_share only comparable from 2017 (Mikrozensus reform) — pre/post composite comparisons not strictly valid"
  ],
  "recommendations": [
    "Re-normalise ewr_composite to unit variance (mean of z-scores, or re-z-score) so 1/3 weighting is honest",
    "Define and enforce the directional sign of each of the 5 EWR indicators wrt gentrification; reconcile code/comments",
    "Ship C5 mapping-completeness normalisation before publishing or regressing dynamism_score",
    "Add n_components_present + NULL-reason flag to distinguish pre-coverage vs suppression",
    "On G2, document the 1/3-mean grand index as a NEW C4 construction, not a reproduction of the 2018 thesis aggregation",
    "Add a rank-correlation spot-check of the C4 status index vs the 2018 thesis status index on overlapping years"
  ]
}
```
