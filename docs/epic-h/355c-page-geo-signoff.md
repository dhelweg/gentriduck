# #355 page geo-DS public-wording sign-off: /hamburg/thesis-recheck

- **Reviewer:** geo-data-scientist (R-C1 gate, ADR-0011)
- **Date:** 2026-11-02
- **Reviewed:** branch `feat/355c-hamburg-recheck-page`, commit 8f6142e6 (`web/` only). Values were
  checked against the results CSV and metadata JSON as committed in 8f6142e6 (HH run 1ed46268d3ed,
  BER run a86fdd34b10e). The DB was not opened and I did not switch branches.

Verdict: CONCERNS

One wording fix is required: the same sentence appears twice, and the wording is mine from
`355-geo-signoff.md` §7, but it overstates what was computed. Everything else passes. When the fix
is applied verbatim, or with the same meaning, the verdict becomes **PASS** without another round.

## Required change

**C1: "every held-out district" is not what was computed.**
The diagnostic covers 5 GroupKFold folds, each holding out about 20 Stadtteile (fold n_test
680–683), plus 4 time windows (`h2_oof_diagnostics`: within-fold AUC 0.479 / 0.470 / 0.434 / 0.383 /
0.476; per-window 0.439 / 0.467 / 0.461 / 0.402). No per-Stadtteil AUC exists. "Every held-out
district" therefore claims 99 separate results where there are 5.

- `web/pages/hamburg/thesis-recheck.md:143` (SQL literal)
  - Current: `' Prediction was worse than chance in every held-out district. We read this as no usable signal, not as an opposite effect.'`
  - Proposed: `' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'`
- `web/pages/hamburg/thesis-recheck.md:295-297` (H2 Details block)
  - Current: "Over the full chain, prediction was worse than chance in every held-out district. We read this as no usable signal, not as an opposite effect."
  - Proposed: "Over the full chain, prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect."

## Verified (pass)

| Claim | CSV / metadata | OK |
|---|---|---|
| HH H1b "Holds (ρ 0.42)" | 0.416235, holds | yes |
| BER H1 "Holds (AUC 0.74)", BER H1b "Holds (ρ 0.44)" | 0.740604, 0.444289 | yes |
| H2 below-chance sub-line only for full chain with AUC < 0.5 | full 0.440 (shown), modern 0.549 (hidden) | yes; the condition is correct |
| H2 "no transferable prediction" (both panels) | full n.s. below 0.5; modern 0.549, p_BH 0.117 | yes |
| H1 "found no clear link" | AUC 0.559, p_BH 0.070 / 0.088 (nominal only) | yes |
| H1a "significant under FDR, not family-wise" | p_BH 0.024 / 0.032; p_holm 0.060 / 0.072 | yes |
| H1a/H1b "roughly one in eight areas" | n = 100 of 857 = 11.7% | yes |
| H1a "cafés per resident shows no clear link" | per-1k ρ −0.054 [−0.144, 0.045] | yes |
| H1a "Berlin found no café link" | BER modern H1a n.s. (p_BH 0.435) | yes |
| H1c "opposite direction, small" | ρ 0.135, CONTRADICTED, small | yes |
| H3 "no detectable ordering, either direction, 2013–2025 or since 2022" | H3a–c n.s. in both panels, ρ −0.044 to 0.033 | yes |
| "Same test" for the H1 family, shown only while both panel labels agree | H1–H1c estimates identical in both panels; only p_BH differs, `holds` is identical | yes; the guard is correct and "counts once" is stated |
| "Not comparable" for H1/H2, the CSV label overridden, sub-line gated on `holds` | matches `355-geo-signoff.md` §3/§7 | yes |
| H2 sub-line names transport and public facilities only | H2 feature list contains Mobility and Public Space, no Tourism | yes |
| BH caveat; full chain primary, 2019–2025 a comparison | pre-registration §5.5, §10.3 | yes |
| No "not reproduced"/"business mix" wording for HH H1/H2 and no thesis AUCs | page text | yes |

## Re-check (applied edit), 2026-11-02

Commit 34745816 applies C1 verbatim in both places, the SQL literal and the H2 Details block ("each of the five held-out groups of districts and in every time window"). This matches `h2_oof_diagnostics`: 5 folds and 4 windows, all below 0.5. The incidental edits (§4.5 qualifiers, the H2 feature note, gating the per-row text on the signed-off run_sha, Berlin H1 "businesses", permitted by the BER commercial-only H1 row: AUC 0.689, SUPPORTED) are accurate.

Verdict: PASS
