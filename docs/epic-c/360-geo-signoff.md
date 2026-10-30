# #360 geo-data-scientist sign-off: Berlin MSS index-indicator mapping

- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Date:** 2026-10-30
- **Branch:** `fix/360-mss-indicator-labels` (312ad48a, a7a8dfea, 7b623022, ae85827c, 8765a9d7 vs `develop`)
- **Evidence reviewed:** issue #360; `docs/epic-c/360-mss-indicator-mapping-evidence.md`; diff of
  `stg_berlin_mss_indicators.sql`, `seed_mss_indicator_vocab.csv`, `int_berlin_rent_pressure_proxy.sql`,
  tests; read-only queries against `data/gentriduck.duckdb`.

**Verdict: PASS**

## Independent checks

1. **Warehouse state (read-only).** Staged `stg_berlin_mss_indicators` per edition matches evidence §3.1
   exactly: S1/S3/S4 populated in all six editions (435–536 PLRs), S2 = `langzeitarbeitslose_anteil`
   2015/2017 (mean 2.4 / 2.0 %), absent 2019/2021, `alleinerziehende_anteil` 2023/2025 (mean 26 / 24 %).
   Ordering S1 < S3 < S4 holds in every edition, as the official definitions require.
2. **Spearman ρ(S1, S3)** per edition: 0.948, 0.960, 0.966, 0.958, 0.955, 0.954 (2015–2025).
3. **Internal identification is strong without the PDFs.** `s2_x ≤ s1` in all 871 PLR-editions
   (subset-by-construction), D3 tracks Δs3 at r = 1.000 in 2019/2023/2025, and S2 is all-null exactly in
   the editions the WFS Abstract describes as three-indicator. Any other slot assignment would violate
   at least one of these.
4. **Source spot-check (MSS 2019 Indikatorenheft S. 9; MSS 2023 S2 page S. 23): not completed.**
   `www.berlin.de` returned HTTP 429 to both curl and WebFetch on repeated attempts (2026-10-30). I did
   not circumvent the rate limit. I do not consider this blocking. The 2019 "Wegfall von S2" claim is
   corroborated independently by the WFS `mss_2019` Abstract ("drei Index-Indikatoren Arbeitslosigkeit,
   Transferbezug und Kinderarmut") and by the all-null `s2_x`. The 2023 S2 construct is corroborated by
   the WFS `mss_2025` Abstract and the S2 level (6–50 %, ρ ≈ 0.6 with benefit indicators), which no
   benefit share could produce. Recommendation R1 covers the follow-up.
5. **Mapping mechanics.** Mapping by `(edition, raw_attr)` through a seeded vocabulary with page
   citations is the right design: transparent, R-C2-compliant, and independent of legacy parquet
   labels. The guard tests (b, d–g, and raw-attr completeness) would catch the original shift and the
   plausible swaps. I accept the mutation evidence.

## Decisions on the open points (evidence §7)

1. **New 2019/2021 coverage: accepted.** The earlier NULLs were an artefact of the mis-mapping, not a
   data gap. Imputation is not involved: the proxy is still NULL when either term is NULL. Condition:
   the 2021 D5 rows stay flagged `displacement_subindex_is_partial` (rent-pressure-only). They must not
   be pooled with 2009–2020 turnover-only rows as if they were one series. That separation exists
   already and must be preserved.
2. **S3 alone stays the "transfer stress" input. Do not use S1 + S3.** Reasons: (a) ρ(S1, S3) ≈ 0.95–0.97
   in every edition, so S1 adds almost no cross-sectional information to a within-year z-score.
   (b) S1 carries the largest definition break in the series (SGB III removed from MSS 2019, so a level
   drop from 6.2 to 3.9 %). S3 is the more stable construct. (c) Conceptually, S3 (non-unemployed
   SGB II/XII recipients: children, pensioners, people unable to work, Aufstocker) is closer to
   long-run low ability to pay than cyclical registered unemployment. That is the affordability-stress
   meaning D5 intends. The exclusion of the registered unemployed must be stated wherever the input is
   described. The model comment now does this. The domain expert has the final word on the construct
   wording.
3. **Definition breaks inside S3: acceptable for D5 as built.** `z_transfer_stress` is standardised
   within each (edition, vintage). Level shifts from the 2016 SGB II statistics revision and the 2021
   Regelaltersgrenze change therefore cancel. The residual risk is a *rank* effect: the 65→67
   denominator change shifts slightly more weight to PLRs with older populations. Because ρ(S3, S4)
   stays at 0.97 across the break, I judge the effect to be second-order. Required usage rule: raw
   `transferbezug_anteil` levels, and `transferbezug_dynamik` across 2015→2017 and 2019→2021, must not
   be read as social change without a break caveat. This applies to the #354 suite.

## Risks

- D5 for 2023/2025/2026 changes materially (ρ 0.46–0.56 vs old; 316–347 PLRs change quintile). Any
  internal analysis, draft text or notebook that used the old D5 is invalid and must be re-run. No
  published mart or site output is affected (verified by the DE and consistent with the export path).
- 2019 rent pressure is on `lor_pre2021` and 2021+ on `lor_2021`. Cross-year comparisons of the
  proxy need the existing vintage crosswalk rules (MAUP). This is unchanged by #360 but now relevant
  to more years.
- Raw parquets keep the legacy `indicator` labels until the next re-ingest (evidence §7.4). They are
  harmless to dbt but misleading for anyone reading the parquet directly.

## Recommendations (non-blocking)

- R1: When berlin.de is reachable, a maintainer or agent quotes MSS 2019 S. 9 and MSS 2023 S. 23
  verbatim into the evidence doc §2 to close the citation loop.
- R2: Re-ingest MSS soon after integration so raw labels match the seed. The vocab test then also
  covers the raw labels.
- R3: #354 should build S composites from the stable core S1 + S3 + S4 only and treat S2 as
  edition-specific. Dynamik across the documented breaks needs a break flag.
