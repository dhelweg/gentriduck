# Geo-DS Sign-off: E3 Analytical Narratives (#32)

**Reviewer:** geo-data-scientist
**Branch:** feat/32-e3-narratives
**Commit:** dad6c25
**Date:** 2026-06-29

## Verdict
Verdict: PASS WITH CONDITIONS

## Summary
The trajectory rankings, stage distribution, per-year typology summaries, choropleth
construction (CRS handling, attribution, ordinal/diverging palettes) and the limitations
section are methodologically sound, well-grounded, and honestly caveated. The D1
status_delta polarity is correct and consistently labelled. However, the `mss_lead_lag_summary()`
function as written does **not** implement a lead-lag test: it orders the quartiles by
`dynamism_score_tk` — the D3 amenity *level* at the **outcome** edition (t+k), not the
predictor at time t — so the "Q4 dynamism precedes worsening" claim is effectively
contemporaneous and built on a level rather than a delta. The narrative's "H3c" framing and
the headline table in E3-findings §5 must be corrected or re-cut before this is presented as
a temporal-precedence result. Everything else passes.

## Findings

1. **(PASS)** D1 `status_delta` is computed as `last − first` (fct_gentrification_trajectory
   L118–121); negative = numeric decrease = social upgrading, consistent with D1 polarity
   (1=hoch/best). The narrative comments (e3_narratives.py L42–47, L240) and E3-findings §2/§3
   correctly state the sign. Top-10 sort `ascending=[True,...]` on status_delta correctly
   surfaces the largest upgrades. Correct.

2. **(condition — blocking) Lead-lag is mis-specified and mislabelled.**
   `mss_lead_lag_summary()` ranks PLRs by `NTILE(4) ... ORDER BY dynamism_score_tk`.
   `dynamism_score_tk` is `lagged.dynamism_score`, i.e. D3 commercial dynamism at the
   **outcome edition t+k**, not at predictor time t. Correlating amenity-at-(t+k) with the
   status transition that *ends* at t+k is a contemporaneous association, not a lead. The
   governed lead-lag spec (index-definition.md §2.1–§2.2, binding geo condition 1) requires
   the predictor to be a **delta at time t** (`delta_dynamism_t`, already present in the
   table), and the H3-direction the model implements is H3a/H3b (status↔amenity), not the
   "H3c" label used here. Before presentation: either (a) re-point the NTILE to
   `delta_dynamism_t` (predictor-side change at t) and relabel as the H3a direction
   (amenity-change-at-t → status-change-to-t+k), or (b) explicitly downgrade §5 to a
   *contemporaneous cross-sectional association* and drop the "precedes"/"lead-lag" language.
   The current §5 table and the "directionally consistent with H3c lead-lag" sentence
   overstate what the query computes.

3. **(non-blocking)** NTILE(4) at n≈535 per lag (≈134/quartile) is statistically reasonable
   as a *descriptive* worsened-rate-by-quartile cross-tab; it carries no inferential claim
   (no SE, no test), and the script correctly avoids one. With only one lag-1 and one lag-2
   pair the power caveat in e3_narratives.py L294–296 and E3-findings §5 is accurate. Keep it
   descriptive; do not attach significance. Note the spatial-autocorrelation-robust-inference
   requirement (index-definition §2.3) only binds if/when a coefficient or significance claim
   is made — it is not triggered by this descriptive table.

4. **(PASS)** Vintage filter is correct: the SQL filters `NOT is_pre2021_vintage` and the
   alignment check filters `lag_k == 1` for the primary read. Within-vintage discipline
   (index-definition §6.2) is respected; the lor_2021 series is kept separate from the
   pre-2021 thesis universe.

5. **(PASS)** Limitations in E3-findings §7 are accurate and sufficient: ordinal-misuse risk
   (§7, R-A3 C2), 3-edition window, NULL EWR composite covariate, ecological-inference
   guard (G-2), and the rent/price-mechanism gap are all stated. One refinement (non-blocking):
   §7 "ordinal mean ... directional only" is correct, but the per-year `mean_status_index`
   /`std_status_index` in `per_year_stats()` still compute a STDDEV of an ordinal code — keep
   it flagged as a display aid only (it already is), and prefer the class-frequency table
   (which is present) as the primary read.

6. **(PASS, with one mislabel — see #2)** R-C2 grounding: e3_narratives.py cites Thesis §2.3,
   §4.3 and the docstrings reference the R-A8 model and index-definition; e3_maps.py carries
   source attributions and CRS provenance. The §4.3 citation is attached to the lead-lag
   function but, per #2, the function does not implement the §2/§4.3 lead-lag design — fix the
   citation alongside the re-specification so the comment matches the computation.

7. **(non-blocking) OSM/survivorship.** The D3 input is the C5-corrected `dynamism_score`
   (share-based, not raw counts), so the headline OSM coverage-growth pitfall is already
   mitigated upstream (C5 sign-off PASS). One residual to flag on the G2 page: the index-map
   and trajectory-map narratives do not restate that D3 dynamism is coverage-corrected;
   readers could still misread an "active" amenity area as raw-count growth. Add a one-line
   coverage-correction note where maps/§5 are presented. No survivorship issue in the D1/MSS
   trajectory itself (MSS is an administrative product, not OSM-derived).

8. **(PASS)** Palette: STATUS_COLOURS is a sequential 4-step blue→red ordinal ramp (correct
   for an ordered 1–4 status). STAGE_COLOURS is a categorical/diverging scheme where
   blue=stable-established and reds=active/consolidation — reasonable and broadly
   colourblind-safe (RdYlBu-family hexes). Minor (non-blocking): `pre-gentrification` (#fee090,
   amber) and `improving-vulnerable` (#74add1, light blue) sit close to the status ramp's
   mid-tones; acceptable for a categorical legend but worth a legend-contrast check at G2.

## Conditions

- **C1 (blocking):** Resolve finding #2 before E3 §5 is presented as a temporal/lead-lag
  result — either re-point the NTILE to the predictor-side delta at time t
  (`delta_dynamism_t`) and relabel to the correct H3a/H3b direction, or re-cut §5 as an
  explicitly contemporaneous cross-sectional association and remove "precedes"/"lead-lag"/"H3c"
  language. Update the §4.3 citation to match whichever computation is kept (finding #6).
- **C2 (non-blocking, before G2):** Add a one-line C5 coverage-correction note wherever D3
  dynamism is shown in maps/narratives (finding #7).
