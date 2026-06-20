# Geo-Data-Scientist Sign-off: R-A1 (#64) Index Definition

- **Scope:** R-A1 #64 — governed index definition (`docs/methodology/index-definition.md`)
- **Operationalizes:** ADR-0008 (multi-dimensional gentrification model, #77)
- **Reviewer:** geo-data-scientist
- **Date:** 2026-06-20
- **Branch:** feat/64-ra1-index-reground
- **Verdict:** PASS WITH CONDITIONS

---

## 1. Summary

`index-definition.md` is a rigorous, well-grounded operationalization of ADR-0008. It discharges all
five of my R-A7 geo conditions and addresses all eight session-3 sign-off requirements. The four points
I was asked to scrutinize hardest — (a) C5-before-lead-lag binding, (b) vintage-break completeness,
(c) sensitivity sufficiency for ADR-0008 Decision 4, (d) D1 ordinal enforcement — are each handled
correctly. The remaining conditions are **actionable by the DE pair during implementation** and do not
warrant blocking; hence PASS WITH CONDITIONS rather than an unconditional PASS.

I verified the load-bearing factual claims against the repository:
- The C5 correction is real and matches §2.4: `int_poi_status_dynamism.dynamism_score` is the z-score
  of `share_yoy_change` (PLR-share normalization), **not** of raw count deltas, and `share_yoy_change`
  is computed within `(area_code, area_vintage)` so it does not cross the 2021 boundary. The model
  header cites `docs/epic-c/C5-geo-signoff.md`. Confirmed.
- `seed_lor_crosswalk_2006_to_2021.csv` exists, is in EPSG:25833, areal-population weighted, with
  `weight = intersection_area / pre2021_plr_area`. **448 distinct pre-2021 PLRs → 542 distinct 2021
  PLRs**, 426 dominant (weight > 0.5) mappings across 3055 weighted rows. Confirmed.

---

## 2. Prior R-A7 geo conditions — discharge status

| Cond | Statement | Status | Where |
|---|---|---|---|
| geo 1 | Deltas both sides + spatial-robust inference; dominance is a reported outcome | **DISCHARGED** | §2.1, §2.2, §2.3 |
| geo 2 | Vintage discipline on every delta including D3 | **DISCHARGED** | §2.5, §6.3 |
| geo 3 | Confirm Dynamik {1,3,5} ordering before consuming | **DISCHARGED** | §1.4, §3.4 |
| geo 4 | Typology stability + anti-conflation (drop-a-dimension) | **DISCHARGED** | §8.1, §8.4, §8.5 |
| geo 5 | C5 before lead-lag; MAUP labelling; ordinal within-vintage metrics | **DISCHARGED** | §2.4, §0.3, §3.3 |

Detail on the four scrutiny points:

**(a) C5-before-lead-lag is unambiguously binding.** §2.4 is explicit and marked `[binding]`: "The
lead-lag must consume the C5-corrected `dynamism_score` / share-based deltas, **never raw counts**,"
with the correct failure-mode rationale (uncorrected coverage growth biases the H3b test toward false
confirmation). §1.6 independently enforces it on the typology side (D3 enters as a secondary axis
"only after the C5 completeness correction"). §5's D3 row and Exclusion-rule §7.4 (drop zero-POI PLRs)
reinforce it. This is enforced in three independent places — sufficiently binding.

**(b) Vintage-break handling is complete and correct.** §6 distinguishes the 448→542 PLR universe,
mandates within-vintage deltas as default (§6.2), tables which side of the break each delta lives on
(§6.3), and states the non-negotiable invariant that predictor and outcome must share PLR geometry
within a single fit. The ordinal-vs-areal distinction in §6.4 is methodologically correct: areal
weights are valid for D3/D4 counts/shares but **not** for averaging an ordinal MSS class — the doc
correctly restricts the crosswalk to dominant-weight assignment for D1/D2 and flags it approximate.
This is exactly right.

**(c) Sensitivity analysis is sufficient for ADR-0008 Decision 4.** §8 covers weight perturbation
(±20%, reporting typology-flip distribution), lag-offset robustness (k=1..3 sign stability),
vintage-break sensitivity (within-vintage vs crosswalk), the drop-a-dimension anti-conflation guard
(§8.4, the numerical proof that Decision 3.3 separation holds), cut-point perturbation (§8.5), and the
equal-vs-derived-weights justification citing OECD/JRC 2008 (§8.6, closing the asserted-weights
defect). This is the complete minimum set and exceeds what Decision 4 requires.

**(d) D1 ordinal treatment is enforced everywhere it must be.** §3 forbids metric averaging, Pearson
on raw codes, and OLS-on-class-code; permits ordered logit, rank correlation, ordinal transition, and
contingency tables. The discipline is then re-asserted at every consumption site: §2.2 (`Δstatus` as a
signed ordinal transition, not a raw code subtraction), §1.4/§5 (flip is "for orientation reasoning
only; never metric-average codes"), §3.3 (binary collapse for the AUC/F headline computed within a
single vintage), and §6.4 (no areal averaging of the ordinal class). Enforcement is consistent and
complete.

---

## 3. Eight session-3 requirements — verification

| # | Requirement | Status | Where |
|---|---|---|---|
| 1 | Typology stages + cut-points, invasion-succession, D1 numeric inversion | **MET** | §1.3–§1.5, §1.7, §1.9, §9 |
| 2 | Lead-lag: panel, spatial-robust, k=1..3, change→change, C5 precedes POI | **MET** | §2.1–§2.5 |
| 3 | D1 ordinal: ordered logit / rank only; never metric-average codes | **MET** | §3.1–§3.3 |
| 4 | D4 EWR baseline: cross-sectional level only, not contemporaneous predictor | **MET** | §4.1–§4.6 |
| 5 | Polarity table + worked D1 sign example; D1 polarity vs 2018 thesis | **MET** | §5 |
| 6 | LOR vintage-break: within-vintage OR crosswalk; 447/448 vs 542 PLR | **MET (with nit, §4 C-3)** | §6 |
| 7 | Exclusions: uninhabited (NULL→exclude), transferbezug NULL→MISSING not zero | **MET** | §7 |
| 8 | Sensitivity: weight perturbation, lag robustness, vintage-break at minimum | **MET (exceeds)** | §8 |

Requirement 5's worked example correctly traces `status_index=4` (sehr_niedrig, most vulnerable) ↔
2018 high `status_summe`, scales inverted / meaning identical, and mandates the flip note as a SQL
comment in every D1-touching model. Requirement 7 correctly separates structural missingness
(uninhabited PLR → exclude from all fits, report count per edition) from suspended-indicator
missingness (`transferbezug` 2019/2021 → MISSING, never zero, never in a denominator).

---

## 4. Remaining conditions (actionable by the DE pair during implementation)

These are implementation-time guardrails, not definition defects. None blocks DE start.

**C-1 [Required, gating the lead-lag PR, not R-A1].** §2.3 correctly routes the *formal* spatial
specification and Moran's-I diagnostics to R-A9 (#79) and states R-A1 "must not publish a lead-lag
significance claim on naive SEs alone." Binding interpretation for the DE pair: the lead-lag mart may
be **built** under R-A1, but **no significance/dominance claim may be published** on the G2 page or in
any analysis artefact until R-A9 delivers the spatial-robust SEs (Conley/spatial-HAC or an explicit
spatial-lag/error term on EPSG:25833 PLR-centroid weights). Naive and spatial-robust inference must be
reported side by side. The DE pair must surface a guard (test or documented gate) that prevents a
naive-SE significance claim from shipping ahead of R-A9.

**C-2 [Required, cheap, run first].** The §3.4 Dynamik-ordering reconciliation is a **hard
prerequisite**, not a post-hoc check: a reversed/permuted {1,3,5}→{1,2,3} code silently inverts the
entire lead-lag sign and the typology. The DE pair must (i) add the internal consistency dbt test
(`floor(gesamtindex/10)=status_index` and `gesamtindex mod 10 ∈ {1,3,5}` consistent with
`dynamik_index`) **and** (ii) reconcile per-class PLR counts against the published MSS report for at
least one firm edition (2023 or 2025), **before** any Δstatus/Δdynamik is consumed downstream. Treat a
failed reconciliation as a build-blocking error, not a warning.

**C-3 [Required, documentation nit to reconcile].** The pre-2021 universe is referred to as "447 PLR"
throughout §1, §2.5, §3.3, §6.1, while the crosswalk carries **448** distinct `plr_id_pre2021`
entries (verified). This is almost certainly the expected gap (≥1 uninhabited/excluded PLR per §7.1,
or a depopulated/merged unit), but the discrepancy is currently undocumented. Before the Epic B
headline is published, the DE pair must state the exact reconciliation (447 analysed = 448 crosswalk
source − N excluded) and report N per edition, per §7.1's "report the excluded count" requirement.
Similarly, §6.4's phrase "448 rows" should read "448 distinct source PLRs across 3055 weighted rows"
to avoid implying a 1:1 crosswalk. Pure labelling; no method impact.

**C-4 [Required at fit time].** §6.3 leaves a real choice for the **pre-2021 D3 predictor geometry**:
either aggregate the 2021-remapped D3 back to the 447/448 universe via the crosswalk, or use a
matching pre-2021 D3 series. The DE pair must (i) pick one **per fitted model**, (ii) record the
choice in the model header, and (iii) guarantee predictor↔outcome geometry are coterminous within each
fit (the §6.3 non-negotiable). If the crosswalk-back-aggregation path is taken for D3, that introduces
crosswalk error into the predictor and must therefore be reported under the §8.3 vintage-break
robustness run, not the headline.

**C-5 [Advisory, carry to G2].** Keep the MAUP / PLR-scale labelling (§0.3, §8) and the EWR
levels-vs-changes + `migration_background_share` ≥2017 caveats (§4.4, §4.6) on the public G2 page.
Already specified in the doc; flagging so it is not lost in the methodology-page write-up (Epic G2).

---

## 5. Certification

The statistical and spatial methodology in `docs/methodology/index-definition.md` is sound, reproducible,
and adequately grounded (R-C2 citations present throughout). All five R-A7 geo conditions are
discharged and all eight session-3 requirements are met. The four high-risk interactions
(C5-before-lead-lag, vintage-break, sensitivity coverage, D1 ordinality) are correctly handled.

**The DE pair MAY proceed with R-A1 implementation**, subject to conditions C-1 through C-4 being
satisfied during implementation (C-2 and C-4 are fit-time prerequisites; C-1 gates only the *published
significance claim* and defers to R-A9; C-3 is a documentation reconciliation). Domain-expert PASS is
still required independently before the PM merges (R-C1 dual gate).

---

## Final Verdict

Verdict: PASS WITH CONDITIONS
