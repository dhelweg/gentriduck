# E4 Early-Warning Displacement-Risk Findings (A10-P1, #80)

- **Task:** out-of-time-validated early-warning indicator: precursors now -> elevated displacement-pressure signal at t+k
- **Issue:** #80 (A10-P1 ONLY -- DiD/event-study Part 2 parked on #70)
- **Method:** LogisticRegression (L2, StandardScaler), OUT-OF-TIME split (train edition_t=2015 -> test edition_t=2017, strictly later in calendar time -- not a random/k-fold split)

## NOT A CAUSAL EFFECT

Every number below is a **predictive association** from an out-of-time classifier. This is the R-A10-P1 response to thesis finding **W3** ("causal/temporal inference is suggestive, not identified", docs/assessment/2018-thesis-critical-assessment.md): it upgrades the *validation discipline* (strictly-later held-out wave, not in-sample fit) but does **not** claim a causally identified displacement-causing effect. Part 2 of #80 (difference-in-differences / event-study on Milieuschutz designation, #70) is explicitly out of scope here and remains parked. **(Follow-up now tracked: #259 (A10-P2) — see `docs/planning/deferred-work-audit-2026-07.md`.)**

## Target definition

`y_elevated_risk = 1` if `typology_stage_tk` (from `int_gentrification_ts`, ADR-0008 D1xD2 matrix) is in `('consolidation-pressure', 'active-gentrification')`, else 0. `consolidation-pressure` is index-definition.md's own explicit "Elevated displacement-pressure signal, NOT confirmed displacement (G-1)" cell (Sec 1.3); `active-gentrification` is the immediately-upstream Dangschat (1988) double-cycle stage. G-1 guardrail preserved: this is a *signal*, never a claim that displacement occurred.

## Panel + features

Berlin `lor_pre2021` vintage, lag_k=1 (`int_mss_lead_lag`). Train predictor wave: edition_t=2015 (-> outcome at edition_tk=2017). Test predictor wave: edition_t=2017 (-> outcome at edition_tk=2019), strictly LATER than the train wave (out-of-time, R-C3-style temporal-order assertion in code).

Features (see module docstring for full R-C2 citations):

| Feature | Precursor category | Grounding |
|---|---|---|
| `status_index_t` | baseline control | own current D1 status level |
| `dynamism_score_t` | amenity acceleration (level) | C5-corrected D3, index-definition.md Sec 2.4 |
| `delta_dynamism_t` | amenity acceleration | C5-corrected D3 change, index-definition.md Sec 2.4 |
| `ewr_composite_t` | social / demographic baseline | D4 LEVEL only (index-definition.md Sec 4.3, binding -- no D4 deltas) |
| `delta_oa_mean_annual_t` | amenity/OA acceleration | ADR-0017 OA location-quotient, annual 2nd source independent of C5 |
| `w_lag_status_t`, `w_lag_dynamism_t` | neighbour/spatial diffusion | Dangschat (1988) contagion, Queen weights (a9_spatial_dynamic.py method) |

## Out-of-time result

| | Train (edition_t=2015) | Test (edition_t=2017, held out, later) |
|---|---|---|
| n | 426 | 432 |
| positive (`y_elevated_risk=1`) | 31 (7.3%) | 14 (3.2%) |
| AUC | 0.7832 (in-sample, NOT the headline result) | **0.4445** (out-of-time, headline) |
| Brier score (test only) | -- | 0.0381 |
| Permutation p-value (test AUC vs label-shuffled null, 999 perms, seed=42) | -- | 0.7810 |

**Verdict:** Out-of-time AUC is BELOW chance -- the model performs worse than random on the held-out wave. This is reported as observed, not tuned away; see Limitations for candidate explanations (rare positive class, single-wave train, only 2 editions of history).

**Overfitting note:** in-sample AUC (0.7832) exceeds out-of-time AUC (0.4445) by more than 0.15 -- the in-sample fit substantially overstates genuine predictive power, exactly the failure mode out-of-time validation exists to catch (cf. thesis W2, overfitting; docs/assessment/2018-thesis-critical-assessment.md).

### Calibration (test fold, tercile bins)

| Bin | Mean predicted P(elevated risk) | Observed rate |
|---|---|---|
| 1 | 0.0247 | 0.0347 |
| 2 | 0.0514 | 0.0417 |
| 3 | 0.1392 | 0.0208 |

### Standardized logistic coefficients (direction/magnitude, NOT causal)

| Feature | Coefficient |
|---|---|
| `status_index_t` | +0.5462 |
| `dynamism_score_t` | +0.3533 |
| `delta_dynamism_t` | -0.0256 |
| `ewr_composite_t` | -0.8471 |
| `delta_oa_mean_annual_t` | -0.2115 |
| `w_lag_status_t` | -0.0021 |
| `w_lag_dynamism_t` | -0.1796 |

## Judgment calls flagged for geo-DS / domain-expert review

1. **Target union** (`consolidation-pressure` OR `active-gentrification`): an interpretive combination, not dictated verbatim by any existing doc. `consolidation-pressure` alone has 0 rows in the 2019 test-edition target on this panel (too rare to test standalone), so the union is empirically nearly identical here to `active-gentrification` alone (differs by only the 2 consolidation-pressure PLRs in the 2017 training-edition target). Scrutinize whether this union is the right displacement-risk operationalization, or whether `consolidation-pressure` alone should be revisited once a longer panel (more editions) gives it a non-zero test-fold count.
2. **Panel choice** (`lor_pre2021`, not the current `lor_2021` panel): chosen because `lor_2021` only has 3 editions since the 2021 LOR reform, so `delta_dynamism_t` (needs a PRIOR edition) is null at its very first edition (2021) -- no way to get two out-of-time waves with that feature populated yet. This will become possible once a 2027 `lor_2021` edition lands. Using the thesis-era panel instead means results describe 2015-2019 Berlin, not the current 2021-2025 state -- scrutinize whether this generalizes.
3. **Rent/price acceleration was NOT included** (issue #80 names it as a precursor category). `mart_price_rent_dimension`/`_pre2021`'s `est_rent_mid` (the only Wohnlage/Mietspiegel-modelled rent estimate in this pipeline) IS populated for `snapshot_year` in (2023, 2024, 2026) in BOTH vintages (NULL for 2017-2022) -- verified against the live warehouse -- so 2023->2024 ARE two consecutive non-null years, and a first-difference rent feature is computable in principle on that later window. The actual blocker is a TEMPORAL-AVAILABILITY MISMATCH with this script's panel, not a lack of any two consecutive years: this script's predictor wave is edition_t=2015 (outcome at edition_tk=2017/2019), but `est_rent_mid` has no data before 2023 -- rent data from 2023 onward cannot retroactively serve as a 'time t' predictor for a 2015/2017-edition panel. `brw_weighted_avg_eur_m2` (land value, populated annually 2017-2024 in both vintages) WAS considered as a substitute, but it only has enough lead time (3 consecutive years before an MSS edition) for the `lor_2021` panel's 2021/2023 editions, which conflicts with judgment call #2 above (the amenity/OA-acceleration features are only available on `lor_pre2021`). This is a genuine, pre-existing data-density/temporal-coverage gap (Wohnlage/Mietspiegel ingestion vintage coverage, ADR-0003 P-B) -- not something this ticket's scope authorizes fixing (would need new ingestion, a new-data-source decision requiring architect sign-off per CLAUDE.md). Flagging rather than substituting a weaker, unrelated proxy.
4. **`ewr_composite_t` as "social in-movement"**: per index-definition.md Sec 4.3 (binding), D4 enters ONLY as a baseline LEVEL, never a delta -- so this feature captures the CURRENT socio-economic vulnerability composition, not literally "in-movement" (a rate). Consistent with the existing binding rule, but worth double-checking it satisfies the issue's "social in-movement" intent as well as a genuine (currently unavailable) migration-turnover rate would.
5. **Spatial autocorrelation in the AUC estimate**: PLR observations are not independent (Tobler's first law; spatial-methods.md Sec 8) -- the reported test-fold AUC/permutation p-value do not correct for spatial clustering of errors among neighbouring PLRs, unlike a9_spatial_dynamic.py's spatial-HAC regression diagnostics (out of scope for a classifier AUC; flagging as a known limitation, not a correction attempted here).

## Limitations

- **Single train/test wave pair**: only ONE out-of-time train->test comparison is possible with the current 4-edition `lor_pre2021` panel (2013, 2015, 2017, 2019) once the first edition (2013, missing full `ewr_composite`/`delta_dynamism_t`) is excluded -- see module docstring. This is a single replication, not a distribution of out-of-time AUCs; treat the reported AUC as one draw, not a stable estimate with a tight confidence interval.
- **Rare positive class**: the test fold has a small number of positive rows (see table above) -- AUC estimates with this few positives have wide sampling variance; the permutation test above is the honest way to read whether the point estimate is distinguishable from chance, not the point estimate alone.
- **k=1 only**: this script does not test k=2 (2015->2019 in this vintage) or the `lor_2021` panel's own transitions; a future re-run once more editions accumulate could extend this.
- **Epic B framing**: directional/exploratory revival work (CLAUDE.md); exact AUC reproduction against any prior number is not the bar -- honest reporting of the observed out-of-time AUC (including a below-chance result, if that is what is observed) is.
