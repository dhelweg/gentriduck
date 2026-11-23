# Pre-registration #371, Amendment 4: Geo-DS Sign-off (R-C1, statistical/spatial half)

- **Date:** 2026-11-05 (pre-results; no matched-panel statistic existed)
- **Scope:** `371-matched-comparison-preregistration.md` Amendment 4 (A4.1–A4.4) and
  "Amendment 4, revision 1" (domain review E1–E9, O1; `371-amendment4-domain-review.md` §8)
- **Evidence:** `docs/epic-e/371-data-checks.md` §4.3–§4.4; warehouse checked read-only (per-PLR
  populations of BZR 034008 and 062004); coordinator's read-only Hamburg S3 D-vs-level check

## Decisions

- **A4.1 Areal LOR crosswalk:** the BZR primary is unchanged. The artefact is disclosed with the
  E5 wording. Sensitivity W24 uses 2024 P and age bands with each edition's own f (E6), at both
  grains, and replaces M3 "2024 only". Its flag is "weight-sensitive (2024 population weights)".
  There is no BZR drop rule, no O4, and no dasymetric model: PLR rows use population only via
  P^(U)/P, thresholds and the R5 diagnostic (E7).
- **A4.2 One Berlin P:** `int_berlin_ewr_age_bands_plr2021.residents_total` is used for both §3.4
  and §3.7. Renormalisation per old PLR is accepted (Tobler 1979).
- **A4.3:** levels are population-weighted and never ranked across cities (E8, §10). The panel has
  849 Gebiete. S4 SD rounding is disclosed. 39005/67012 are kept (O1 wording). The S7 NULL rule is
  accepted. Missing HH 2022 age shares have no effect.
- **A4.4 / E1–E3, E9:** the primary is the HH S3 2019 level re-based by the publisher
  (s3_2022 − D3_2022); R19-pub is the sensitivity. The full recompute list is E2. Disclosure is by
  revision, not by site. The accommodation-channel page wording is E9.
- **§8.2 guard:** the exemption covers only `sensitivity = 'W24'` and s3_2019_rev. The guard stays
  active for the primary.

## Condition

E4: the A4.4 evidence goes into `docs/epic-e/371-data-checks.md`:
- per-edition ρ;
- counts and sign split of |Δ| > 0.5 pp;
- level quantiles;
- the Bericht 2021 PDF p. 8 quote;
- `test_371_hh_annex_d_vs_s_consistency`.

Until that evidence exists, A4.4 is uncited (R-C2) and must not be integrated.

Verdict: PASS
