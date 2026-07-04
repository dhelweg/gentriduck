# Geo-Data-Scientist Sign-off: B9b (#119) — EWR Pre-2014 Panel Extension

- **Scope:** B9 #119 — `int_ewr_socioeco` partial composite + `int_ewr_lead_lag` backward
  extension to 2008 using 3-indicator reduced composite for pre-2014 years.
- **Operationalizes:** Thesis §4.2 (EWR composite), ADR-0008 (multi-dimensional model),
  index-definition.md §3 (metric composite discipline). B9b framed as a backward-extension
  for exploratory analysis, not a replacement for the full composite.
- **Reviewer:** geo-data-scientist
- **Date:** 2026-06-30
- **Branch:** b119-ewr-pre2014-ingestion → develop
- **Prior gate:** data-engineer-reviewer (inline, PM cycle)
- **Verdict:** PASS WITH CONDITIONS

---

## 1. Summary

B9b adds a 3-indicator partial composite (`ewr_composite_partial`) to `int_ewr_socioeco` for
years 2008-2013 where EWR source data lacks `foreigners_share` (E_A column, 12A series starts
2014) and `migration_background_share` (MH_E column, EWRMIGRA series starts 2014). The
implementation is disciplined:

- The full 5-indicator `ewr_composite` remains NULL pre-2014 (correct — not silently filled).
- The partial composite is clearly labelled via `is_partial_composite` (TRUE pre-2014).
- `int_ewr_lead_lag` uses `COALESCE(ewr_composite, ewr_composite_partial)` as effective
  composite and propagates the partial flag (`any_endpoint_partial`) so regressions can filter
  to full-composite pairs only.
- dbt build: 478 PASS, 2 WARN (expected), 0 ERROR.

The construct validity evidence is solid: correlation between partial and full composite in the
2014-2020 overlap period is r = 0.92 (N=542 PLR × 7 years), indicating the 3-indicator
sub-composite captures much of the same vulnerability signal as the full 5-indicator composite.
This is not surprising — age_under18, mean_age, and residence_duration_5y are all strongly
correlated with the missing indicators at the PLR grain.

---

## 2. Methodological assessment

### Z-score computation — reference population

Z-scores are computed cross-sectionally within each year across all PLRs. This is consistent
with the existing full composite approach. For the partial composite, the reference population
(N=542 lor_2021-mapped PLRs) is identical to the full composite. The partial composite has
higher cross-sectional variance (std ~0.93 vs ~0.84 for the full composite), which is expected:
averaging fewer z-scores reduces central-limit compression. This is not a defect — each annual
distribution is mean-zero by construction — but analysts should be aware that the pre-2014
partial composite scale is slightly inflated relative to the post-2014 full composite.

**Condition C-1:** Any analysis comparing levels of ewr_composite_effective across the pre/post
2014 boundary must acknowledge the scale difference (~10% higher std in partial years).
Time-series plots should clearly mark the 2014 composite-type boundary.

### COALESCE boundary at 2013/2014

The `any_endpoint_partial` flag correctly handles the boundary: a pair with year_t=2013, k=1
(base=partial, outcome=full) is flagged `any_endpoint_partial=TRUE` and excluded from H2/H3
regressions. This is the right call — mixing partial and full composite in a single OLS/Spearman
regression would conflate indicator-set change with genuine trend. The year_t=2014, k=1 pair
(base=full, outcome=full) is clean. The boundary is sharp and correctly implemented.

### Missing foreigners_share (E_A) pre-2014

E_A is absent from all known EWR publication series before 2014 (the Ausländer 12A Matrix starts
2014). The partial composite correctly omits it. The thesis (p. 55) identifies foreigners_share
as the strongest individual predictor in the cross-sectional index (k11 = E_A / E_E). This
omission is not optional — the data does not exist — but it means the pre-2014 partial composite
is a weaker discriminator of gentrification vulnerability than the full composite.

**Condition C-2:** E1 analysis using the pre-2014 extension must clearly state that
`foreigners_share` — the thesis's strongest predictor — is absent from the partial composite.
Coefficients from partial-composite pairs (if used for exploratory analysis) must not be
compared to full-composite coefficients without this caveat.

### migration_background_share methodological break

Migration background (MH_E, EWRMIGRA series) also starts 2014 and has a further methodological
break at 2017 (Mikrozensus reform). The partial composite is therefore not just missing two
indicators — the 2014 introduction year coincides with a known methodology change. This
reinforces the decision to keep the partial composite strictly exploratory (any_endpoint_partial
rows excluded from H2/H3 main analysis).

### Spatial autocorrelation

Z-score computation is cross-sectional and non-spatial (consistent with existing model design).
No spatial weighting applied. No regression carried out in this PR. This is acceptable for the
extension model; spatial methods remain in scope for Epic C/D.

### Data sourcing

VINTAGE_URLS in `ingest_ewr.py` already contained the 2008-2013 CSV URLs. The 2008.parquet
through 2013.parquet files exist on disk and are correctly assigned `area_vintage='lor_pre2021'`
and crosswalked to lor_2021 via `int_berlin_ewr_plr2021`. No new data source was introduced;
this is an extension of the existing CC BY 3.0 DE EWR series.

---

## 3. Conditions

**C-1 (scale caveat in any time-series plot):** Mark the 2014 partial→full composite transition
in all plots of ewr_composite_effective over time. Label pre-2014 years "3-indicator composite
(no foreigners/migration data)" in any public-facing chart.

**C-2 (E1 caveat if exploratory results reported):** If E1 regressions include any
partial-composite exploratory results (with `any_endpoint_partial` flag retained as a sensitivity
check), clearly state foreigners_share is absent pre-2014. Do not pool with H2/H3 main analysis.
Main H2/H3 analysis continues to use `any_endpoint_partial = FALSE` filter only.

**C-3 (B9-domain-signoff required):** The domain expert sign-off must confirm that the partial
composite omitting foreigners_share and migration_background_share is theoretically acceptable
for exploratory use in the Berlin gentrification context, and that the E_A data absence pre-2014
is accurately described to readers.

---

## 4. Verdict

**Verdict: PASS WITH CONDITIONS**

The B9b implementation is methodologically sound. The partial composite is correctly labelled,
the exclusion logic for H2/H3 regressions is clean, and the 2014 boundary is handled without
cross-contamination. Conditions C-1 through C-3 must be addressed before the pre-2014 extension
is used in any public-facing output. Integration into `develop` is cleared subject to the
domain-expert sign-off (C-3).
