# #354 geo-DS methodology sign-off — Berlin thesis hypothesis suite (phases A + B)

- **Reviewer:** geo-data-scientist (R-C1 gate, ADR-0011)
- **Date:** 2026-11-01
- **Branch:** `feat/354-berlin-modern-era` (reviewed at `run_sha` 3661079aa212, findings regenerated at b791dc9b)
- **Inputs:** `analysis/thesis_hypothesis_suite.py`, `analysis/directional_inference.py`,
  `docs/epic-e/thesis-hypothesis-suite-results.csv`, `thesis-hypothesis-suite-metadata.json`,
  `E1b-berlin-hypothesis-suite-findings.md`, `354-phase-a-data-prerequisites.md`,
  pre-registration `docs/methodology/354-355-hypothesis-suite-preregistration.md` (rev. 2 + A1, + A2 below).
- DB not opened; every number below is read from the committed CSV / findings (the
  data-engineer-reviewer reproduced all statistics exactly in round 1).

Verdict: PASS

Conditional on: (a) the domain expert independently ratifying Amendment 2, and (b) the
data-engineer-reviewer's final phase-B re-check passing. The public-wording items in §4 bind the
site/content work (#349 follow-up), not this branch.

```json
{
  "verdict": "pass",
  "rationale": "Design implements the pre-registration (rev. 2 + A1): fixed primaries, cluster bootstrap B=1999 seed 42, BH per panel family, GroupKFold-by-cluster OOF AUC with fold-local imputation/scaling, zero-filled native OA with the ADR-0017 base rule. Deviations 1-13 and 15 are either pre-results fixes or non-substantive consequences honestly disclosed; item 14 is ratified as Amendment 2 with explicit post-results disclosure. D-composite validity failure is handled as pre-registered and the class rows are reported beside the primaries.",
  "risks": [
    "Change composite D diverges from published Dynamik classes in all six editions (rho 0.67-0.71); H2 and H3 primaries rest on a construct that is not the official classification.",
    "Modern H2 published-class row is n.s. (AUC 0.525); thesis-era class row is SUPPORTED but negligible (0.560). H2 'SUPPORTED' is composite-specific.",
    "Thesis-era H3b published-class row is CONTRADICTED (rho 0.096 [0.023, 0.171], negligible, uncorrected secondary) while the primary is n.s.",
    "Every window carries shocks (pandemic, Rechtskreiswechsel 2022, Buergergeld 2023) and definition breaks; null H3 results have limited power to rule out small effects (CIs about +-0.06).",
    "Amendment 2 is post-results; its credibility rests on the reductio argument and the domain co-ratification."
  ],
  "recommendations": [
    "Public H2 wording must lead with 'explained by current status level' and state the class-row divergence; never 'OA predicts neighbourhood change'.",
    "Public H3 wording: 'no detectable ordering in either direction'; retire the MSS 2021-2025 'H3b supported' claim with a dated supersession note.",
    "Follow-up issue: Moran's I on H3 residuals (deviation 11), non-gating.",
    "Apply Amendment 2 unchanged to #355 Hamburg; do not re-open the mapping after Hamburg results."
  ]
}
```

## 1. Conformance with the pre-registration (findings §12)

Implemented design checked against §5.1–5.8 and A1.1: primaries and estimators match the §5.1
table exactly (including the H3b S_start(P) control timing, §3.5/§11); BH over the 8 primaries per
panel, Holm reported only; percentile cluster bootstrap with θ0-centred two-sided p floored at
1/(B+1); `verdict()` logic unchanged; non-directional AUC cannot yield CONTRADICTED; OA from
`int_poi_oa_native_panel` (A1.2), never E1's presence-conditioned loader.

| # | Deviation | Ruling |
|---|---|---|
| 1 | Min-base rule as thesis deviation | Accept. It is A1.1 restated; the R1 fidelity check correctly uses the unbased rows. |
| 2 | N3: AUC "small" read as "poor" | Accept. Domain-ordered before results; without it the ✓ rule is undefined for AUC. |
| 3 | N4 "nominally significant" note on H3a | Accept. Label only, verdict unchanged. |
| 4 | N1 quantile-matched "high status" strata | Accept. Domain-ordered pre-results; exploratory rows only. |
| 5 | N2 as wording | Accept. |
| 6 | N7 counted once | Accept. Affects only the exploratory tally. |
| 7 | Feature list per design frame | Accept. H1 and H2 are different snapshots, so a per-frame flag share is the only coherent reading of "per panel". It still uses flags only and was written before any fit, so there is no outcome leakage. |
| 8 | Coefficients = mean of fold fits | Accept. Strictly better than §1.2's implied full fit; it honours §5.8(4). |
| 9 | DHS 0/0 drop | Accept. g is undefined there; dropping "no commerce at either date" is the only option and is not outcome-selected. |
| 10 | New `form`/`suite_expected_dir` fields | Accept. Isolates E1's published output. |
| 11 | Moran's I not implemented | Accept as a disclosed gap (non-gating in §8). Open a follow-up issue. |
| 12 | H1c no-table-tennis = NO DATA | Accept. The rule was fixed before n was seen, and §5.3's <20-cluster rule applies. Do not relax it. |
| 13 | H1b no-kebab not testable | Accept. §5.2 made it conditional on the taxonomy. Note for the site: the anti-stigmatisation check could not be run, so the H1b wording must stay at "fast-food share" and must not drift into ethnic-economy language. |
| 14 | H2 negative ΔAUC CI | **Ratified as Amendment 2** (see §2). |
| 15 | Hamburg deferred | Accept (#355). |

None of these changes a hypothesis, primary variable, expected sign, family or primary verdict
rule. Disclosure is complete and correctly dated.

## 2. Item 14 ruling: ratified

Thesis-era H2 incremental: ΔAUC −0.018 [−0.035, −0.003] (status level 0.767 vs status level + OA
0.749). The code's label "consistent (still unclear): explained by current status level" is
**ratified**. Amendment 2 (pre-registration, dated 2026-11-01) records that this was settled after
results and gives the reasons:
- The incremental row exists to test whether OA adds information beyond status level (D5, §5.2;
  the thesis's "Scheinkorrelation", §6.3.2.1). Only a positive increment can make H2 "stronger than thesis".
- A two-sided reading would give the "stronger" label to the result that most supports the
  thesis's spurious-correlation objection. That reading is absurd and was never the intent.
- A negative out-of-fold ΔAUC is the expected variance penalty from about 30 uninformative
  standardised features in a fixed L2 logit. It means "no increment", not "inversely informative".

Modern ΔAUC −0.004 [−0.015, 0.007] already maps to the same label under the literal rule, so both
panels end up with the same H2 reading.

## 3. D composite below the 0.80 validity threshold

ρ(D, Dynamik class) is between 0.668 and 0.710 in all six editions. S passes everywhere (0.81–0.87), and
the thesis status index tracks S_2017 at 0.995. The pre-registered response is to disclose the failure and
read the class rows beside the primaries. That response is **adequate for the gate**, because:
- the threshold was applied as written and not moved;
- the findings §4 disclosure names every edition and adds context without using it as an excuse
  (three heavily tied classes cap ρ; the failure persists in the S2-free 2019/2021 editions);
- every class row is in the CSV and the findings tables.

It is **not adequate for the public page as it stands**. Where the composite and class rows
disagree, the public text must say so in the headline sentence, not in a footnote:
- **H2:** composite primary SUPPORTED (modern 0.609, thesis-era 0.617, both "poor"). Class rows:
  modern 0.525 n.s.; thesis-era 0.560 SUPPORTED but negligible. ΔAUC shows no increment over status
  level in either panel. So the H2 signal is weak, depends on how change is measured, and is fully
  explained by current status level.
- **H3:** the class rows agree with the null primaries, with one exception. The thesis-era H3b class
  row is CONTRADICTED (ρ 0.096 [0.023, 0.171], negligible, uncorrected secondary; one of many
  exploratory rows, so about 5% are expected significant by chance). Report it and do not interpret it.

## 4. Public wording guidance (binding on the site content)

**H2 (both panels):** "Neighbourhoods' business mix is weakly associated with how their social
situation changed afterwards (AUC about 0.61, 'poor'). But the mix adds nothing once we know how well-off an
area already was, and the link nearly disappears when the official Dynamik classes are used
instead of our continuous change score. This matches the 2018 thesis: still unclear, most likely a
spurious correlation through current status." Do not write "OA predicts gentrification/change".
Do not write "adding OA makes prediction worse".

**H3 (H3a/H3b/H3c, both panels):** "We find no detectable ordering in either direction: commercial
change did not precede social change, and social change did not precede commercial change
(all effects negligible, |ρ| ≤ 0.06, confidence intervals within about ±0.13). This holds for both
the thesis era and 2019–2025, for each pivot separately, and with official classes." Add the shock
and definition-break line. Also add "absence of evidence for small effects, not proof of no
effect". H3a: "consistent with the thesis (rejected)". H3b: "not reproduced". H3c: "consistent (still unclear)".

## 5. H3b: the suite supersedes the MSS 2021–2025 "supported" claim

Confirmed. The site's H3b row (from E1, `web/pages/thesis-recheck.md`, pre-registration §1.4) is
superseded by the suite (modern ρ −0.021 [−0.082, 0.041], p_BH 0.60; thesis-era 0.055 [−0.019, 0.125]).
The old result rested on design features the pre-registration identified as defects:
1. **Single 2023 pivot → two pivots pooled** (2021, 2023), with the per-pivot rows and the pivot
   difference reported (no heterogeneity: 0.051 [−0.089, 0.191]). One pivot gives one realisation
   of a shock-laden window.
2. **No level control → S_start(P)** (#339, §3.5). Status-change and commercial growth both
   regress toward level-dependent means. Without a level control, a level gradient looks like
   precedence. The alternative timing (S_pivot) and +D4 are also null.
3. **Back-cast/remapped POIs → native LOR-2021 C5 shares** (phase A), so 2019/2020 no longer rely on
   areal re-allocation across the 2021 LOR seam (MAUP).
4. **Total-POI share → commercial basket** (Gastronomy, Retail, Services, Entertainment). Public
   Space/Mobility (64% of 2025 POIs) follow mapping campaigns, where the C5 uniform-coverage
   assumption fails. The total-share continuity row is itself only nominal (modern −0.064, CI
   [−0.134, 0.006], unadjusted p 0.07), so the old signal does not survive even its own basket once
   pivots and the level control are fixed.
5. Plus cluster-bootstrap inference and BH in place of iid analytic p over repeated PLRs (#341 defect).

The site must carry a dated note: "Earlier versions of this page reported H3b as supported for
2019–2025; a pre-registered re-test with corrected design does not reproduce it."

## 6. Statistical soundness

- **Cluster bootstrap:** resamples whole BZR clusters (137/143 ≥ 20). Pooled area-windows/pivots
  share a cluster, so within-area dependence across windows is respected. Percentile CI with
  B = 1999 is adequate. The two stratified "high" rows (44–49 clusters) are within limits.
- **BH:** per-panel family of 8, applied to bootstrap p; Holm reported. No primary is significant
  under BH but not Holm, so the FDR-versus-FWER distinction does not bite here.
- **Grouped-CV AUC:** GroupKFold by cluster, deterministic; `leakage_guard_groups` asserts no
  cluster appears in both train and test, and `assert_fold_local_preprocessing` confirms the imputer
  and scaler are fit per training fold. The ΔAUC uses the same folds for base and full models with a
  paired cluster bootstrap on OOF scores. That is correct. Caveat: OOF predictions are fixed and only
  resampled, so the CI ignores refit variance. This is standard and pre-registered (§5.3), and slightly
  anti-conservative for AUC rows. It is immaterial to any verdict here: every significant AUC has
  p_BH ≤ 0.002.
- **Leakage:** feature lists come from flags only and are written before any fit. H2 uses OA at the
  window start to predict D over the window, and the review-round-1 data-year temporal guards fix
  this. No full-sample fit is made. The H3b control is S at the start of P, so no future information
  enters.
- **Remaining limits (non-blocking):** spatial autocorrelation beyond BZR clusters is untested
  (Moran's I, deviation 11). Small-area refugee accommodation is undisclosable beyond the text.
