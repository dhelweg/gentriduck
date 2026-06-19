# ADR-0008: Multi-dimensional gentrification model (conceptual architecture)

- **Status:** Proposed (requires geo-data-scientist AND gentrification-domain-expert `pass`
  before it may be set to Accepted — methodology gate R-C1)
- **Date:** 2026-06-19

## Context

Gentriduck's gentrification index *is the product* (ADR-0004). The current live index reduces a
multi-dimensional, longitudinal phenomenon to a single contemporaneous z-score blend:

```
-- transform/models/intermediate/int_gentrification_ts.sql
gentrification_score = (status_score + dynamism_score - ewr_composite) / 3.0
```

where `status_score` / `dynamism_score` are z-scores of **POI count** and **POI share-change**
(`int_poi_status_dynamism.sql`), and `ewr_composite` is the mean of five z-scored EWR
**demographic** indicators (`int_ewr_socioeco.sql`). The PM+architect deep review
(`docs/assessment/2026-06-19-pm-architect-review.md` §2) established three structural defects:

1. **Inputs are conflated with outputs.** The thesis used POIs as *predictors* of a *social* outcome
   (Berlin's official MSS Status/Dynamik, built on welfare-recipient / unemployment / child-poverty
   shares). The revival rebuilt "Status" and "Dynamism" *out of POIs* — a different construct that
   merely shares the names (§2.3 #1).
2. **The thesis's actual finding — a lead-lag — is gone.** The headline result (thesis p. 91) is
   that **social-status change precedes amenity/POI change** (H3a rejected, H3b confirmed). A
   contemporaneous equal-weighted mean cannot express temporal order (§2.3 #2).
3. **Weights are asserted, not derived.** The `1/3` weighting is flagged `PENDING` in the model
   header itself; there is no sensitivity analysis (§2.3 #5).

Two new governed inputs now exist or are scoped that make a multi-dimensional model possible:

- **MSS Status/Dynamik** (`stg_berlin_mss`, ADR-0006, R-A3 #66) — the Senate's official, citable
  small-area social classification. This is the **outcome** the thesis used as ground truth.
- A **displacement / affordability** dimension (R-B1 #70, deferred to Epic D) — Milieuschutz,
  rent-burden, turnover.

R-A7 (#77) is the **conceptual keystone**: before the DE pair implements the re-grounded index
(R-A1 #64), the architect, geo-data-scientist and domain-expert must agree on *what the model's
structure should be*. This ADR governs that **conceptual architecture**. It is deliberately **not**
an implementation ADR and **not** the index definition: exact weights, the regression/lead-lag
specification, normalization details, the typology cut-points and the worked sign example belong in
`docs/methodology/index-definition.md`, which the geo-DS and domain-expert author as part of R-A1.

This ADR extends ADR-0004 (one governed index definition) and ADR-0005 (city-agnostic core); it
supersedes neither. The single-z-score formula in ADR-0004's lineage is reframed here as one
(backwards-compatible) *output* of a multi-dimensional model, not the model itself.

### Constraints this ADR must respect (CLAUDE.md, ADR-0001, ADR-0005)

- **Free + open only** — every dimension's source is open data; no paid/proprietary input, ever.
- **Cross-platform** — pure-Python / DuckDB-spatial; no OS-specific tooling implied by the model.
- **City-agnostic seam (ADR-0005)** — the model is defined over `dim_city` / `dim_area` with
  per-city parameters. A dimension that only some cities can populate (e.g. MSS, Milieuschutz) must
  be **optional and parameterized**, never a *required* shape baked into the shared core.

## Decision

Adopt a **four-dimensional conceptual model** of gentrification, combined via a **hybrid
architecture** (separate dimension sub-scores → derived typology for the public site, plus a
retained backwards-compatible single composite), with an **explicit lead-lag structure** between
the predictor and outcome dimensions and a **mandatory weight-sensitivity analysis**. The model is
an **analytical, non-advocacy instrument** that surfaces uncertainty.

### 1. The four dimensions

Each dimension is a distinct construct with its own role (predictor vs. outcome), source, and
polarity. R-A1 must keep them **separately computed and separately exposed** — they may only be
fused at the composite/typology layer, never silently averaged into one input.

| # | Dimension | Role | Berlin source (current) | Grain | Polarity (high = …) |
|---|---|---|---|---|---|
| **D1** | **Social status** | Outcome (state) | MSS **Status-Index** class, `stg_berlin_mss` | (edition, PLR) | high status class = **less** socially deprived |
| **D2** | **Social change** | Outcome (direction) | MSS **Dynamik-Index** class, `stg_berlin_mss` | (edition, PLR) | direction of change over the edition's 2-yr window (positiv / stabil / negativ) |
| **D3** | **Commercial / amenity** | Predictor (feature) | POI status + dynamism, `int_poi_status_dynamism` | (PLR, year) | richer / faster-churning commercial landscape |
| **D4** | **Socio-demographic vulnerability** | Predictor (feature) | EWR composite, `int_ewr_socioeco.ewr_composite` | (PLR, year) | more pre-gentrification / vulnerable population |
| (D5) | **Displacement / affordability** | Predictor (feature) — **deferred** | Milieuschutz + rent-burden + turnover (R-B1 #70) | (PLR, year) | higher displacement pressure |

Concrete bindings the DE pair must honour:

- **D1 (Social status) — the primary outcome.** Ground on the **4-class MSS Status-Index** as the
  primary social-status outcome; keep the 12-group Gesamtindex and the Dynamik class available as
  secondary signals (per R-A3 geo-signoff R4; closes ADR-0006 open question #4 at the conceptual
  level). The class is **ordinal** — R-A1 must treat it with ordinal-appropriate methods and must
  **not** average the class codes as if metric (R-A3 geo-signoff C2). Uninhabited PLRs (null
  indices) are excluded from any fit/calibration (R-A3 geo-signoff C3).
- **D2 (Social change) — the outcome's *direction*.** MSS Dynamik already encodes a 2-year change
  window per edition; it is the like-for-like reading of the thesis's "Dynamik = change in
  benefit-recipient share vs. the city average" (thesis p. 97). D1 and D2 are **orthogonal axes by
  construction** (the Senate's 4×3 = 12-cell typology); a weak D1↔D2 correlation is the official
  model working as intended, **not** a contradiction (review §2.4).
- **D3 (Commercial / amenity) — the predictor.** Reuse `int_poi_status_dynamism` **unchanged in
  role**: POI status (density) and POI dynamism (churn / share-change). These are *features*, never
  relabelled as "Status"/"Dynamism" outcomes. The C5 completeness-bias correction stays in force.
- **D4 (Socio-demographic vulnerability) — the secondary predictor.** Use
  `int_ewr_socioeco.ewr_composite` as audited in R-A5: all five inputs are **vulnerability-positive**
  after PR #89 (`docs/methodology/indicator-semantics.md` §9 — Verdict PASS). D4 is *demographic
  composition*, **not** a socio-economic-status (income / unemployment / transfer-recipient) measure;
  R-A4 (#67, SES indicators) may later add a true SES feature or fold it into D4. R-A1 must document
  D4's known sign caveats (several demographic variables are themselves correlated with gentrification
  in Berlin — review §2.3 #3) and the levels-vs-changes divergence from the thesis
  (`indicator-semantics.md` §8 condition 3).
- **D5 (Displacement / affordability) — deferred.** Defined here as a *reserved fifth dimension* so
  the model architecture accommodates it without a future redefinition. Its source ADR and staging
  land with R-B1 (#70) in Epic D. R-A1 must leave a clean seam (a nullable / absent dimension slot)
  so D5 can be added later **without** restructuring the index or breaking the ADR-0004 mart
  contract.

The **outcome dimensions (D1, D2) are Berlin-specific in their *source* (MSS), not in their *role*.**
The city-agnostic core (ADR-0005) requires that the model accept a generic "social-status outcome"
slot fed per city; Berlin fills it with MSS. The index must **not** *require* an MSS-shaped input
(ADR-0006 Consequences): a city without an official social monitor would supply its own equivalent,
an SES composite (R-A4), or run predictor-only. This is an explicit conceptual constraint on R-A1.

### 2. Lead-lag structure (mandatory)

The thesis's core, confirmed finding is a **temporal order**: social-status change *leads*
amenity/commercial change (H3b confirmed; H3a — POI leads status — rejected; thesis p. 91; review
§2.1). R-A1 **must** make this lead-lag a first-class, exposed feature of the model — it may not
collapse the dimensions into a contemporaneous blend.

Concretely, the model definition (R-A1) **must**:

- **Test predictor↔outcome at a temporal offset, not contemporaneously.** D3 (and, when present, D5)
  features at time `T` must be evaluated against D1/D2 social-status outcome at `T+1` … `T+k`
  (literature and thesis support `k = 1…3` years), **and** the reverse direction (D1/D2 change at
  `T` against D3 change at `T+1…T+k`) to reproduce the thesis's H3a/H3b/H3c contrast. The headline
  is that the **status→amenity** direction should dominate.
- **Expose the lead-lag in a mart**, not lose it in an intermediate. The relationship (e.g. the
  fitted lead-lag coefficients / cross-correlation by offset) must be queryable, so R-A2 (#65,
  E1/E2 re-run), R-A8 (#78, trajectories) and the G2 methodology page can consume it.
- **Respect the LOR vintage break.** Lead-lag deltas must not cross the 2019→2021 LOR boundary
  without the crosswalk; restrict within-vintage or route through the crosswalk (R-A3 geo-signoff
  C4; ADR-0006 Consequences). Epic B's directional revival uses the pre-2021 447-PLR editions as
  the reference comparison.

A model that reports only a contemporaneous score does **not** satisfy this ADR.

### 3. Index architecture — **hybrid** (chosen)

We evaluated three architectures and adopt the **hybrid (B + C with an A-compatible output)**:

- **Option A — single composite that fuses all dimensions** (the status quo). *Rejected as the model,
  retained as one output.* A single number conflates predictor and outcome, hides which dimension
  drives a score, and cannot express the lead-lag. It is, however, what the existing
  `gentrification_index` mart contract and the R-A2 / E1 / E2 re-runs expect.
- **Option B — separate sub-scores per dimension.** Honest and transparent: each dimension is
  reported on its own scale and only combined (if at all) at the presentation layer. This is the
  correct *internal* representation but is not, by itself, a publishable "what stage is this
  neighbourhood in" answer.
- **Option C — a typology.** Classify each `(area, period)` into a named gentrification stage
  (e.g. *stable / pre-gentrification / early-signal / actively-gentrifying / advanced /
  post-displacement*), extending Berlin's MSS Status×Dynamik matrix to the added dimensions — the
  invasion-succession framing the thesis and Dangschat (1988) use, and the natural public-site
  output. This is the most interpretable result but loses the underlying continuous signal.

**Decision — adopt the hybrid:**

1. **Compute and expose each dimension's sub-score separately** (Option B) — this is the model's
   authoritative internal representation. D1/D2/D3/D4 (and later D5) each retain their own scale and
   documented polarity; they are never silently merged into a single input.
2. **Derive a typology from the dimension sub-scores** (Option C) for the public website — a named
   stage per `(area, period)`, extending the MSS Status×Dynamik cells with the predictor and
   (future) displacement dimensions. The exact cut-points / cluster method and the stage names are a
   **methodology decision** for R-A1/R-A8, not this ADR; this ADR only mandates that the typology be
   *derived from the separated sub-scores*, be ordinal/categorical, and be reconcilable with MSS
   Dynamik and the R-B2 back-test hotspots.
3. **Maintain a backwards-compatible single composite** (Option A) as one explicit, clearly-labelled
   *output variant* of the model, so the ADR-0004 `gentrification_index` mart contract, the 2018
   `standard` / `distance_weighted` golden comparisons, and R-A2 / E1 / E2 re-runs keep working. This
   composite is a **derived convenience, not the definition** — its header must say so and link to
   the dimension sub-scores it summarizes. It must not reintroduce the predictor↔outcome conflation:
   the composite combines the *outcome* dimensions as the published "gentrification state" and keeps
   the *predictor* dimensions as features/early-warning, rather than averaging predictors and
   outcomes into one number as the current model does.

Rationale: the hybrid is the simplest architecture that fixes all three defects at once — separation
(B) removes the input/output conflation, the typology (C) gives an interpretable public product and
operationalizes the process framing, and the retained composite (A) preserves backwards compatibility
so the rest of the backlog (#65/#26/#29/#38) is not blocked on a contract rewrite. It defers no
hard decision to a second, divergent definition (ADR-0004): there remains **one** governed
definition; the composite, the sub-scores and the typology are all views derived from it.

### 4. Sensitivity analysis (mandatory)

R-A1 **must** produce a weight/specification **sensitivity analysis** as part of the governed
definition (not deferred). At minimum it must report:

- how the index/typology changes as the **weight on each dimension** is varied (e.g. POI/D3 weight
  up/down; the implicit `1/3` removed);
- the effect of **dropping a dimension** (e.g. index without D4; outcome-only vs. predictor-inclusive);
- sensitivity to the **lead-lag offset** `k` and to **category groupings / cut-points** in the
  typology;
- sensitivity to **equal vs. derived weights** — equal weights are an acceptable transparent baseline
  (OECD/JRC 2008) **only if** justified in writing against this analysis, never asserted silently.

This ADR mandates *that* the analysis exists and *what it must cover*; the exact method and results
live in `docs/methodology/index-definition.md`. This closes the review's "ad-hoc weights/categories"
finding (§2.3 #5).

### 5. Non-advocacy / transparency stance (O3)

The model is an **analytical instrument that lets the data speak**, not an advocacy or
market/speculation tool. R-A1 and all downstream consumers (G2 #38 methodology page, G3 #39) must:

- **Avoid certainty framing.** The index flags *displacement-risk signals* and *gentrification
  stages*, it does not assert that an area "is gentrified" as fact. Use hedged, evidential language.
- **Show uncertainty.** Surface the ordinal nature of the MSS outcome, the OSM POI completeness bias
  (~40% fill, review §2.1), the levels-vs-changes EWR divergence, the LOR vintage break, and the
  sensitivity-analysis spread — uncertainty is published *alongside* the score, not hidden.
- **Frame ethically.** The displacement dimension (D5) is a *proxy* for involuntary moves, which open
  data does not directly observe (R-B1). The product is a public-interest statistics tool, not a
  signal for speculation. This stance feeds G2/G3 directly.

## Alternatives considered

### A — Keep the single z-score blend (status quo) — **REJECTED**

Conflates predictor and outcome, has no lead-lag, asserts its weights. The whole point of R-A7 is to
replace it as the *model* — though it survives, relabelled, as one backwards-compatible *output*
(Decision 3.3).

### B — Pure separated sub-scores, no typology — **REJECTED as the public model**

Methodologically clean but does not give the website an interpretable "what stage is this Kiez in"
answer, and underuses the 2008–2024 longitudinal data that R-A8 exploits. Adopted as the *internal*
representation inside the hybrid.

### C — Pure typology, no retained composite — **REJECTED**

Most interpretable, but discards the continuous signal needed for validation/sensitivity work and
**breaks** the ADR-0004 mart contract and the R-A2 / E1 / E2 re-runs, blocking the rest of the
backlog. Adopted as the *public output* inside the hybrid.

### D — Require MSS as a mandatory model input — **REJECTED (violates ADR-0005)**

Would bake Berlin into the city-agnostic core. The outcome dimension is a *parameterized slot* filled
per city; Berlin fills it with MSS (ADR-0006 Consequences).

### X — Any paid / proprietary dimension or weighting service — **REJECTED**

Out of scope by golden rule #1. Every dimension is open data; weights are derived/justified in-repo.

## Consequences

- **R-A1 is now gated and specified.** The DE pair implements R-A1 against this ADR: four separated
  dimensions, an exposed lead-lag, a derived typology, a retained backwards-compatible composite, and
  a sensitivity analysis. R-A1 may not start coding before the geo-DS + domain-expert sign-off on
  `docs/methodology/index-definition.md` (the gate, R-C1). The exact weights, regression/lead-lag
  spec, normalization, cut-points and the worked sign example are **not** in this ADR — they are
  R-A1's methodology note.
- **One governed definition is preserved (ADR-0004).** Sub-scores, typology and composite are all
  views of a single definition; no second divergent definition is permitted. The mart contract is
  *extended* (new dimension/typology columns, a `variant` for the composite), not forked.
- **City-agnostic seam upheld (ADR-0005).** D1/D2/D5 are optional, parameterized slots; the model
  runs predictor-only for a city without an official social monitor. No Berlin specifics enter shared
  models; MSS/Milieuschutz localisation stays in `ingestion/berlin/…` and `stg_berlin_*`.
- **Downstream unblocked in the right order.** R-A8 (#78, trajectories/stages) builds on the typology
  and the per-dimension time series; R-A2 (#65) re-runs E1/E2 against the restored lead-lag; Epic D
  (#29) and R-B1 (#70, D5) plug into the reserved displacement slot; G2 (#38) renders the dimensions,
  typology, sensitivity and uncertainty. #29 / #38 / #26 remain held until R-A1 lands.
- **Slightly more upfront modelling cost**, accepted because the index *is* the product (ADR-0004)
  and the current construct is wrong (review §2). The hybrid keeps backwards compatibility so the
  cost is additive, not a rewrite.
- **The published story is corrected before G2 ships.** The methodology page will describe a
  multi-dimensional, lead-lag, process model with explicit uncertainty — not a single conflated
  number nor the misframed "thesis failed" E1/E2 conclusion (review §2.4).

## Open questions (resolved in R-A1's methodology note, not here)

1. **Exact typology cut-points / clustering method and stage names** — R-A1 / R-A8 (geo-DS +
   domain-expert), validated against MSS Dynamik and R-B2 hotspots.
2. **Weighting scheme** (derived coefficients vs. PCA vs. justified equal weights) — R-A1, decided
   against the mandatory sensitivity analysis (Decision 4).
3. **Whether D4 absorbs a true SES feature** (R-A4 #67) or SES becomes a fifth predictor — decided
   when R-A4 lands.
4. **Lead-lag estimation method** (cross-correlation, ordered-logit with lagged regressors, panel
   model with spatial-autocorrelation-robust inference per review §2.6 / R-A9 #79) — R-A1, geo-DS.
5. **Confirmation of the MSS {1,3,5} Dynamik ordering** against the published class distribution
   (R-A3 geo-signoff C1) — a consumption guardrail R-A1 must satisfy.

## References

- `docs/assessment/2026-06-19-pm-architect-review.md` §2.1–2.6, §4, §5 (the conflation, the missing
  lead-lag, the asserted weights, the dimension white-spots).
- `docs/assessment/tickets/A7-conceptual-model-adr.md` (this ticket), `A1-reground-index.md`,
  `A8-longitudinal-trajectories.md`, `B1-displacement-affordability.md`.
- `docs/methodology/indicator-semantics.md` (R-A5 EWR sign audit — Verdict PASS; D4 polarity).
- `docs/methodology/R-A3-geo-signoff.md` (MSS outcome conditions C1–C4, R4 — D1/D2 polarity & grain).
- ADR-0004 (governed index definition), ADR-0005 (city-agnostic core), ADR-0006 (MSS source).
- Thesis (Helweg 2018) pp. 55–56 (hypotheses), p. 91 (H3b confirmed — status leads amenity), p. 97
  (Dynamik = change in benefit-recipient share); §3.2 (Gentrifizierung als Prozess).
- Dangschat (1988) — double invasion-succession cycle (process / typology framing).
- Döring & Ulbricht (2016) — Gentrification-Hotspots und Verdrängungsprozesse in Berlin.
- OECD/JRC, *Handbook on Constructing Composite Indicators* (2008) — common-polarity, equal-weight
  baseline as a transparent default to be justified, not asserted.
