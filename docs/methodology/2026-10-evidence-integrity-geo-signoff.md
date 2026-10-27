# Geo-DS sign-off — methodology evidence integrity (2026-10)

- **Branch:** `fix/methodology-evidence-integrity` (stacked on `infra/osm-cuisine-backfill`), head `5d36b5ae`
- **Reviewer:** geo-data-scientist (R-C1, geo half of the dual gate)
- **Date:** 2026-10-27
- **Checks run (read-only):** `git log/show develop..HEAD`; `uv run pytest tests/ -q` (92 passed, 2 skipped);
  read-only DuckDB query re-deriving `test_c5_poi_share_spike` on the final warehouse; cross-check of
  public-page numbers against the regenerated findings files.

## 1. OSM extractor fixes (`13fb28ef`) — PASS with conditions

- **Deletion fix (a): correct and necessary.** A deleted OSM version has no location; returning on
  `InvalidLocationError` before the `visible=false` branch kept every hard-deleted node alive. The
  evidence is internally consistent: the fix only removes (0 additions in every year, both cities),
  June-only POIs in 2012 equal the 2012 removals exactly, and the ghost share grows with time
  (~3% → ~21% Berlin, ~17% Hamburg) — i.e. the old data carried a time-trending, spatially uneven
  growth artefact into D3, OA and every lead-lag test. The independent confirmation is the strongest
  argument: the thesis's 2018 snapshot cannot have contained deleted nodes, and A3 agreement with the
  thesis goldens improves at every level (domain 0.764→0.835, category 0.732→0.779, type 0.497→0.536).
- **First-match restore (b): correct.** 100.00% `poi_type` agreement with the June first-match run on
  all shared POIs (2012, 2013); the key-ordering evidence (332/338 moved to an alphabetically later key)
  identifies the #252 cause.
- **Node→way caveat.** Accepted. The fixed data has one consistent definition — *POI nodes alive at
  date t* — whereas the old data mixed live nodes with ghosts of both closures and conversions, so it
  was strictly worse. But the node-only scope is now a *visible* measurement property: a node→way
  redraw is indistinguishable from a closure, and such redraws plausibly concentrate in later,
  better-mapped years and in dense inner-city areas (building-level mapping campaigns). That is a
  mapping-practice effect of exactly the kind C5 exists to correct, but C5 §2.4 normalises by
  *city-wide* coverage growth and will not absorb an area-specific node→way migration. It biases
  dynamism toward "decline" in heavily remapped areas. Not a blocker for this integration (it was
  never accounted for before either, just masked), but it must be disclosed and scheduled — see
  conditions 1–2.
- **Spike test 115 vs 92.** Re-derived on the final warehouse: BER 56 + HH 59 = 115 PLR-years.
  Berlin's excess is concentrated in 2010–2011 (6 + 17), Hamburg's in 2011/2014/2016 — the early,
  sparse years where removing ghosts lowers the accumulated baseline and the 5-year rolling mean, so
  genuine mapping bursts now exceed 2× the rolling share more often. This is the expected direction
  of the fix (ghosts smoothed shares) and not a sign of a new defect. The documented baseline must be
  updated (condition 3).

## 2. H3a/H3b cross-lagged redesign — PASS with conditions

- **Diagnosis is right.** The old H3b on MSS panels was H3a with arguments swapped (Spearman is
  symmetric), and the EWR/Hamburg "directional" tests were same-window co-movement. None of them
  identified order. The new design (ordered, non-overlapping P=[e0,e1], F=[e1,e2], each direction
  controlling for the outcome's own prior change) is the standard cross-lagged panel / Granger-style
  construction and is what the hypotheses actually claim.
- **Partial Spearman by linear residualisation of ranks:** acceptable under index-definition.md §3.2.
  Ranking all variables and partialling the ranks by least squares is the conventional
  rank-partial-correlation estimator (Conover 1999; equivalent to the recursive partial-Spearman
  formula for one control). It uses only order information of the ordinal MSS deltas; no metric
  claim about class distances is made. The analytic p-value is approximate with heavy ties
  (MSS deltas take few values); the verdict uses the bootstrap CI, which is the right choice.
- **Own-lag control:** correct, and it is what guards against regression to the mean. Because
  d_status_P and d_status_F share status at e1 (and its measurement/classification noise) they are
  mechanically negatively correlated; without the own-lag control H3a would pick that up whenever
  d_POI_P correlates with d_status_P. Residual RTM risk remains where the *level* at e1 is not
  controlled: in the MSS 2021–2025 panel D4 is unavailable at the 2023 pivot, so H3a/H3b there run
  with own-lag only. d_status_P is correlated with the status level at e1, and POI growth plausibly
  differs by status level, so the H3b SUPPORTED result there is not protected against a level
  confound. The MSS status class at e1 is always available and would be a natural fallback control
  — recommendation, plus disclosure as condition 5.
- **Cluster unit:** Bezirksregion for PLR panels and Stadtteil for Hamburg are defensible (nested
  administrative units, enough clusters: 143 BZR; 95 Stadtteile). The 24-row Bezirk-level panel has a
  CI that is essentially uninformative, and it is correctly NOT SIGNIFICANT. Cluster resampling also
  absorbs the repeated-area structure of the multi-pivot EWR/Hamburg panels.
- **One pivot per MSS panel:** disclosed for 2021–2025 ("Three editions -> one cross-lagged pivot
  (2023)"). **Inconsistency:** the pre-2021 section header says "One cross-lagged pivot (2017)" while
  its rows say `pivot edition(s) [2015, 2017]` with n=869 ≈ 2×447 (MSS 2013 was restored to the
  manifest). One of the two is wrong — condition 4.
- **Fragile result:** MSS 2021–2025 H3a raw-count is CONTRADICTED on a CI of [0.001, 0.152] while the
  analytic p is 0.065. That verdict sits on the CI boundary; it must be described as borderline
  wherever it is cited (condition 5).

## 3. Verdict scoring — PASS

Requiring significance (CI excluding 0 for cross-lagged rows, else p<0.05) and adding CONTRADICTED
fixes the "sign-only PASS" error. No multiple-comparison correction across the ~40 rows is
acceptable for a directional revival *because it is disclosed* and verdicts are reported per row,
not pooled into a single claim. Recommendation (non-binding): add a one-line note that, at α=0.05,
about 2 of ~40 rows would be significant by chance, and avoid treating isolated single-row results
as findings.

## 4. Back-test reframing + Test F — PASS with conditions

- Relabelling Tests A–D as pipeline-integrity / label-consistency is correct: `status_index` *is* the
  MSS D1 class, so Tests A/D are ρ=1 by construction and the hotspot/coldspot labels are partly MSS
  class assignments. The label-provenance section is the right disclosure.
- **Test F** (upgrading stages vs Milieuschutz, OR 1.84, cluster-bootstrap CI [1.02, 3.41],
  Fisher p 0.0525) is a sensible, genuinely external check, honestly caveated (partial overlap of
  designation indicators with MSS inputs; district-policy confounding; time-invariant overlay).
  **Keep it non-gating.** However the backtest header labels it **"SUPPORTED"** while the body calls
  it borderline/weak and Fisher does not reach 0.05. Under the new scoring rule it should read as
  borderline — condition 6.

## 5. BRW fix (`9a92a4bc`) — PASS

Collapsing stacked records on one polygon to their mean before area-weighting removes the
double-weighting and the coverage_frac=2.0 artefact; computing coverage from `ST_Union_Agg` of the
intersection pieces is correct for any overlap. The 2022 structural break (stacking ~9→~26 polygons)
was a real trend artefact, so this matters. Residual: the 15 IoU>0.95 near-duplicate pairs in 2022
still each enter the value average (coverage is already right). With values a median €410/m² apart
across 15 pairs out of ~1,581 polygons, the effect on PLR means is small and bounded; the mean of two
differentiated valuations is a neutral choice. Acceptable; recommend (non-binding) a test asserting
coverage_frac ≤ 1 + ε.

## 6. Regenerated findings and public claims — PASS with conditions

Numbers on `web/pages/thesis-recheck.md` match `docs/epic-e/E1-regression-findings.md` (H1 ρ −0.05 /
OA +0.15 n=433; H1b 0.13 / 0.35 n=341; H2 MSS −0.10 to −0.19; H3b MSS 2021–2025 −0.13 / −0.16;
H3c EWR −0.42), and E5 Hamburg is all NOT SIGNIFICANT as stated. The hypothesis-level framing
("panel-dependent", "holds on the recent official monitor only", EWR "both directions") is supported
by the statistics. The new index.md headline is accurate.

**But the back-test section of `web/pages/index.md` (≈ lines 220–245) was not rewritten** and still
states the exact claim the backtest reframing withdrew: "both kinds of independently sourced ground
truth", "A third, **independent** cross-check … (Spearman rho = 1.00)", "exactly where those
independent sources say they belong … the credibility check behind the headline numbers". The ρ=1.00
check is by construction, and the hotspot recall is scored on the MSS class from which labels are
partly drawn ("official MSS 2023 status classes" is listed as a label source on the same page).
`web/pages/takeaways.md` ≈ line 80 repeats "passes its own back-test against independent,
literature-documented ground truth". These are public overclaims — condition 7.

## Binding conditions

1. Disclose the node-only scope on the methodology page and in the evidence doc's downstream note:
   OSM counts are "POIs mapped as nodes at date t"; node→way redraws register as closures and may
   bias dynamism downward in heavily remapped areas.
2. Open a backlog item for C5 (index-definition.md §2.4) to quantify node→way migration from way
   history (or a node+way-centroid extraction) and decide whether C5 needs an area-level correction;
   reference it from §2.4.
3. Update the documented `test_c5_poi_share_spike` baseline from 92 (BER 47 + HH 45) to 115
   (BER 56 + HH 59), citing the deletion fix as the cause.
4. Fix the pre-2021 MSS panel pivot description in E1 findings (header "one pivot (2017)" vs rows
   "[2015, 2017]", n=869) so the text matches the data actually used.
5. Wherever MSS 2021–2025 H3a "contradicted" or H3b "supported" is cited (E1 findings,
   thesis-recheck, whitepaper/O4 narrative if present), state that this panel has a single pivot
   (2023) and no level (D4) control, and that the raw-count H3a CONTRADICTED is borderline
   (CI lower bound 0.001, analytic p 0.065).
6. In `docs/methodology/backtest.md`, change the Test F headline from "SUPPORTED" to a borderline /
   weak-support label consistent with its own body text (Fisher p 0.0525); Test F stays non-gating.
7. Rewrite the back-test passage in `web/pages/index.md` (≈220–245) and the back-test sentence in
   `web/pages/takeaways.md` (≈80) to match backtest.md: Tests A–D are pipeline-integrity /
   label-consistency checks, not independent validation; the ρ=1.00 check is by construction; cite
   Test F as the only external check and as weak support.

Conditions 4–7 are text-only and must be met before the `develop → main` PR is opened; conditions
1–3 must be met before integration into `develop` or tracked as open issues linked from this file.

## Recommendations (non-binding)

- Use the MSS status class at the pivot as a fallback level control when D4 is unavailable, and
  report H3a/H3b with and without it.
- Add a multiple-testing note to E1/E5 scoring sections.
- Add a dbt test `coverage_frac <= 1 + 1e-6` on `int_berlin_brw_plr`.

## Conditions closure (project-manager, 2026-10-27)

1. Node-only scope disclosed: methodology page §6 ("Only points are counted"), index-definition.md
   §2.4, evidence doc §3 (`4576403a` and the web/claims commit).
2. Backlog item opened: #337 (quantify node→way migration; decide on an area-level C5 term),
   referenced from index-definition.md §2.4 and the methodology page.
3. `test_c5_poi_share_spike` baseline documented as 115 (BER 56 + HH 59) with the deletion fix as
   cause (`97e8161c`).
4. E1 pre-2021 header now says editions 2013–2019, two pivots (2015, 2017) (`75b8e61e`).
5. Single pivot (2023) + no D4 control stated in E1, thesis-recheck (table and modern-era bullet) and
   the whitepaper; the MSS 2021–2025 H3a result is labelled "(borderline)" in E1 and described as
   borderline on the page (it is on the C5-corrected dynamism measure, not raw counts).
6. backtest.md header: "SUPPORTED (borderline -- weak support; partially independent; Fisher p)".
7. index.md back-test passage and takeaways §2/§4 rewritten to match backtest.md (integrity /
   label-consistency checks, rho = 1 by construction, Test F the only external check, weak support).
Recommendations taken: BRW coverage test tightened to <= 1.0001 (PASS); multiple-testing note on
thesis-recheck. MSS-class fallback level control filed as a backlog issue.

Verdict: PASS with conditions
