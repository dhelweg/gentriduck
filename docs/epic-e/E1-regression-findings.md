# E1 Regression Findings -- Thesis H1-H3c Validation

- **Task:** H1-H3c regression and lead-lag analysis, real thesis hypotheses
- **Issue:** #65
- **Date:** 2026-06-29
- **Data (H1/H1b):** stg_thesis_2018_result_plr + int_poi_features_pivot (2018), n=436
- **Data (H2/H3):** int_mss_lead_lag + int_poi_features_pivot (2021-2025)
- **Method:** Spearman rank correlation + OLS (scipy.stats)

## Methodology

Spearman rank correlations and OLS regression test five hypotheses from the 2018 Berlin gentrification thesis (pp. 55-56, p. 91). POI category counts from `int_poi_features_pivot` are used as the primary predictor variables, joined to MSS social status indices (`status_index`). This corrects the prior implementation which regressed MSS indices against each other (no POI features).

The lead-lag hypotheses (H3a/H3b/H3c) are tested using `int_mss_lead_lag` at k=1 (2-year MSS edition gap) and k=2 (4-year gap), with POI counts from `int_poi_features_pivot` joined at the relevant snapshot years.

The primary validation criterion is directional agreement (same sign as thesis expectation), consistent with the Epic B directional revival framing.

## Hypothesis Citations

- **H1**: Thesis p.55: POI supply positively correlates with social status; because status_index is inverse-numeric (higher=worse, index-definition.md §5 polarity table), expected Spearman(poi, status_index) is negative
- **H1b**: Thesis p.55 H1b: fast-food as contested proxy for low-status / displacement pressure (see gentrification literature); more fast-food → lower status → higher status_index (inverse-numeric, index-definition.md §5), expected direction positive
- **H2**: Thesis p.55 H2: current POI supply predicts future social-status improvement; delta_status_ordinal = tk - t (positive = worsened, index-definition.md §5 polarity), so expected direction is negative
- **H3a**: Thesis p.91 H3a: POI change leads status change — REJECTED in thesis (not confirmed); uses C5-corrected delta_dynamism_t (index-definition.md §2.4; int_mss_lead_lag.sql D3 C5 note); delta_status_ordinal inverse-numeric so expected direction is negative
- **H3b**: Thesis p.91 H3b: status change leads POI change — CONFIRMED in thesis; delta_status_ordinal inverse-numeric (index-definition.md §5 polarity), improved status = negative delta, expected Spearman(delta_status_ordinal, delta_dynamism) is negative
- **H3c**: Thesis p.91 H3c: simultaneous co-movement — thesis result unclear; status_index inverse-numeric (index-definition.md §5), expected direction negative

## Results

| Hyp | Test | N | Type | Value | p-value | Sig | Expected Dir | Actual Dir | Match | Description |
|---|---|---|---|---|---|---|---|---|---|---|
| H1 | Spearman | 436 | rho | -0.0463 | 0.3348 | No | negative | negative | PASS | POI stock (total_poi_count) ~ MSS social status (status_index) |
| H1 | OLS | 436 | beta | -0.0004 R2=0.0044 | 0.1670 | No | negative | negative | PASS | POI stock (total_poi_count) ~ MSS social status (status_index) |
| H1b | Spearman | 436 | rho | 0.1364 | 0.0043 | Yes | positive | positive | PASS | Fast-food POI count ~ MSS social status (status_index) |
| H2 | Spearman k=1 | 1071 | rho | -0.1155 | 0.0002 | Yes | negative | negative | PASS | Current-edition POI stock ~ future status change [k=1 MSS editions, 2021+ panel] |
| H2 | Spearman k=2 | 535 | rho | -0.1924 | 0.0000 | Yes | negative | negative | PASS | Current-edition POI stock ~ future status change [k=2 MSS editions, 2021+ panel] |
| H3a | Spearman k=1 | 535 | rho | 0.0593 | 0.1706 | No | negative | positive | FAIL | C5-corrected Δdynamism at t leads Δstatus at t+k (POI change leads status change) [k=1] |
| H3b | Spearman k=1 | 535 | rho | 0.0593 | 0.1706 | No | negative | positive | FAIL | Δstatus at t leads Δdynamism at t+k (status change leads POI change) [k=1] |
| H3c | Spearman k=1 | 1071 | rho | 0.0632 | 0.0386 | Yes | negative | positive | FAIL | Simultaneous dynamism ~ status_index co-movement (same edition) [k=1] |
| H3a | Spearman k=2 | 0 | rho | N/A | N/A | No | negative | N/A | FAIL | C5-corrected Δdynamism at t leads Δstatus at t+k (POI change leads status change) [k=2] |
| H3b | Spearman k=2 | 0 | rho | N/A | N/A | No | negative | N/A | FAIL | Δstatus at t leads Δdynamism at t+k (status change leads POI change) [k=2] |
| H3c | Spearman k=2 | 535 | rho | 0.0790 | 0.0680 | No | negative | positive | FAIL | Simultaneous dynamism ~ status_index co-movement (same edition) [k=2] |

**Directional agreement: 5/11 tests match the expected direction.**

**Statistical significance: 4/11 results significant at p<0.05.**

## Interpretation by Hypothesis

### H1 — POI stock vs MSS social status (thesis p.55, confirmed AUC 0.87)

**Spearman**: rho/beta = -0.0463, p = 0.3348, n=436. Direction (negative) matches thesis expectation (negative). Not significant at p<0.05.

**OLS**: rho/beta = -0.0004, p = 0.1670, n=436. Direction (negative) matches thesis expectation (negative). Not significant at p<0.05.

### H1b — Fast-food as contested proxy for low-status / displacement (thesis p.55)

Note: fast-food as a 'displacement indicator' is a contested proxy in the gentrification literature; the thesis (p.55) treats it as a low-status marker. D1 polarity correction: expected Spearman(poi_fast_food, status_index) = positive (more fast-food → lower status → higher status_index; index-definition.md §5).

**Spearman**: rho = 0.1364, p = 0.0043, n=436. confirmed — fast-food positively correlates with status_index (low-status proxy).

### H2 — Current-edition POI stock predicts future status change (thesis p.55)

Note: H2 is tested on the 2021+ live MSS panel (lor_2021 vintage), not the 2018 cross-section. This operationalizes the general 'current POI stock predicts future status change' hypothesis. n=1071 (panel rows), not n=436 (2018 cross-section).

**k=1**: rho = -0.1155, p = 0.0002, n=1071 — directional agreement.

**k=2**: rho = -0.1924, p = 0.0000, n=535 — directional agreement.

### H3a — POI change leads status change (thesis p.91, REJECTED)

Thesis rejected this hypothesis; we expect no significant positive rho. k=1: rho = 0.0593, p = 0.1706, n=535. Not significant — consistent with thesis rejection.

### H3b — Status change leads POI change (thesis p.91, CONFIRMED)

Thesis confirmed this hypothesis; we expect positive significant rho. k=1: rho = 0.0593, p = 0.1706, n=535. Not significant at p<0.05. Diverges from thesis.

### H3c — Simultaneous co-movement (thesis p.91, UNCLEAR)

k=1: rho = 0.0632, p = 0.0386, n=1071. Simultaneous dynamism-status correlation.
k=2: rho = 0.0790, p = 0.0680, n=535. Simultaneous dynamism-status correlation.

## Divergences from 2018 Thesis

- **D1 polarity correction**: `status_index` is inverse-numeric — lower value = higher social status (index-definition.md §5 polarity table; int_mss_lead_lag.sql lines 19-23). All expected_dir values have been corrected accordingly: H1 expected Spearman(poi, status_index) = negative; H1b expected = positive; H2/H3a/H3b/H3c expected direction = negative. Prior implementation had these inverted.
- **H3 predictor**: H3a and H3b use C5-corrected `delta_dynamism_t` from `int_mss_lead_lag` (not raw `delta_poi`). Raw POI count deltas embed OSM coverage growth artefact and would bias H3b toward false confirmation (index-definition.md §2.4; int_mss_lead_lag.sql D3 C5 note).
- **Ordinal treatment**: `delta_status_ordinal` is used for Spearman rank correlation only (ordinal direction proxy), never as a metric response. This is permitted per index-definition.md §3.2 ordinal-transition treatment. OLS regression against delta_status_ordinal is not applied (§3.3 prohibits metric differencing on non-uniform ordinal cut-points).
- The H1/H1b tests use 2018 POI category counts from `int_poi_features_pivot` joined to the 2018 golden thesis data — correct POI-as-predictor formulation.
- H2 is tested on the 2021+ live panel rather than the 2018 cross-section; n=1071 (panel rows) vs n=436 (2018 PLRs). The hypothesis is reframed as 'current-edition POI stock predicts future status change' (general form).
- The H3 lead-lag tests use the live MSS panel (2021-2025 editions); the thesis used 2012-2018. Both predictor and outcome share the [t, t+k] window — this is a co-movement test across the lag window, not a strict temporal-precedence test.
- No multiple-comparison correction was applied across the five hypotheses. Results are PLR-only (Berlin, lor_2021 vintage) and may have MAUP sensitivity.
- Epic B framing: directional revival — exact number reproduction not required. See CLAUDE.md §Epic B framing.

## Limitations

- **k=3 lead-lag not tested**: Only 3 MSS editions are currently available (2021, 2023, 2025). A k=3 test (6-year lag) would require a 2027 edition. k=3 results will be added once the 2027 MSS edition is ingested.
