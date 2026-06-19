[A1] Re-ground the gentrification index: separate POI predictors from the social status/dynamik outcome; restore lead-lag; justify weights

## Why (problem)
The live index conflates two different constructs that happen to share names with the 2018 thesis.

- Live: `gentrification_score = (status_score + dynamism_score - ewr_composite) / 3.0`
  (`transform/models/intermediate/int_gentrification_ts.sql:82`), where `status_score` = z-score of POI
  **count** and `dynamism_score` = z-score of POI **share change** (`int_poi_status_dynamism.sql:94-100`).
- Thesis: "Status" and "Dynamik" are Berlin's official **social** MSS indices (welfare-recipient share and
  its change vs. the city average — thesis p.97); **POIs are the predictors**, and the headline result is a
  **lead-lag**: social-status change *precedes* amenity/POI change (H3b confirmed, H3a rejected — thesis p.91).

So the revival rebuilt "status/dynamism" out of POIs, dropped income/unemployment, and collapsed the
lead-lag into a contemporaneous equal-weighted mean. See `docs/assessment/2026-06-19-pm-architect-review.md` §2.

## Goal
A single governed index definition (per ADR-0004) that is faithful to the thesis's construct and defensible
under current literature: POI metrics are **features/predictors**; the **outcome** is a social-status index;
the **temporal (lead-lag) relationship** is first-class; weights are justified, not asserted. This is the
first implementation of the multi-dimensional model in **ADR-0008 (R-A7 #77)** — a typology over dimensions,
not a single 1/3 z-score blend.

## Scope & approach
This is a **spec-first** task. The geo-data-scientist + gentrification-domain expert (see C0) author the
corrected index definition; the data-engineer then implements it. Do NOT start coding before sign-off.

1. Write `docs/methodology/index-definition.md` (governed definition) that specifies:
   - **Outcome**: social-status index. Prefer the official MSS Status/Dynamik (A3) and/or a transfer-recipient/
     unemployment SES composite (A4) as the outcome — NOT demographic composition.
   - **Predictors**: POI status (density) and POI dynamism (churn/share-change) as *features*.
   - **Relationship model**: a lead-lag formulation (does Δsocial-status at t−k predict Δamenity at t, and vice
     versa?), reproducing the thesis's H2/H3a/H3b/H3c structure on the live time series.
   - **Weights**: either derive from data (e.g., fitted coefficients / PCA / documented expert weights) or keep
     equal weights but justify in writing with a sensitivity analysis. Remove the silent 1/3 assumption flagged
     at `int_gentrification_ts.sql:7-12`.
   - **Sign conventions** for every component, with a worked example for one known PLR.
2. Refactor the dbt models accordingly: keep `int_poi_status_dynamism` as POI *features*; introduce a social
   outcome model fed by A3/A4; express the index/lead-lag in a new or revised `int_gentrification_ts` and the
   `gentrification_index` mart (respect the ADR-0004 contract; extend `variant`/columns as needed).
3. Keep the 2018 `standard`/`distance_weighted` golden variants intact for comparison.

## Acceptance criteria
- Governed `docs/methodology/index-definition.md` exists and is signed off by geo-DS **and** the domain expert.
- POI metrics are clearly features; the published index's outcome is a social-status measure (A3 and/or A4).
- The lead-lag relationship is computed and exposed in a mart, not lost.
- Weighting is justified in writing, with a **sensitivity analysis over weights and category groupings**; no undocumented constants.
- `uv run poe build` green; mart contract still satisfied; docs/lineage updated.

## Gate / sign-off
Methodology-bearing → requires geo-DS `pass` AND domain-expert `pass` before merge (see C1). Cite the thesis
sections and literature the definition operationalizes (see C2).

## Dependencies / relations
Keystone. Blocks/should precede #26 (C6 temporal validation), #29 (D3 price into index), #38 (G2 methodology
page). Consumes A3 (MSS), A4 (SES). Governed by **ADR-0008 (R-A7 #77)**; feeds R-A8 (#78) trajectories. Interacts
with A6 (spatial method) and A2 (validation).

## References
- `docs/assessment/2026-06-19-pm-architect-review.md` §2.1-2.5
- `reference/system/60_lor_own_idx.sql` (Döring-Ulbricht), `reference/system/50_lor_mss_idx_bzr_z.sql` (MSS z)
- Thesis pp. 55-56 (hypotheses), p.91 (results), p.97 (Dynamik = change in benefit-recipient share)
