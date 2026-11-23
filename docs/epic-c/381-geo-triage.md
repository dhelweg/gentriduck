# #381 triage: area-weighted crosswalk of EWR shares and means (geo-DS, read-only)

- **Date:** 2026-11-23.
- **Method:**
  1. I copied the warehouse to the scratchpad (`…/scratchpad/t381/db/gentriduck.duckdb`) and
     replaced `int_berlin_ewr_plr2021` there with the C3-approved formula:
     - shares and means: `Σ v·w·P_old / Σ w·P_old`;
     - counts unchanged: `Σ v·w`;
     - `unit` taken from `seed_ewr_indicator_meta`.
  2. I rebuilt `int_ewr_socioeco`, `int_ewr_lead_lag`, `int_berlin_turnover_proxy` and
     `int_berlin_displacement_subindex` on the copy with dbt (scratch profile and target path).
  3. I re-ran the #354 Berlin suite and `e1_regressions.py`, with outputs to the scratchpad.

  No repo file or the live warehouse was changed.
- **Patch sanity check:**
  - male + female = 1 to 4e-16 (was 0.176 at Pankower Tor);
  - pre-2021 PLR mean age is 30–56 years, city mean 43.4–43.6 (2018/2020), consistent with
    native 2024 (43.5);
  - counts are identical to the published model (max |Δ| 2e-12).

## 1. #354 Berlin hypothesis suite (`/thesis-recheck`): no verdict changes

- **Where D4 enters.** The D4 control (`ewr_composite`) enters **no primary**. It is used only in
  the "H3a/H3b primary controls + D4" sensitivity rows.
- **Which panel.** Only the modern panel reads the crosswalked model (`int_ewr_socioeco`,
  2020 composite at pivot 2021). The thesis-era panel reads `int_ewr_socioeco_pre2021`, which is
  not crosswalked and is unaffected.
- **Full re-run** (116 Berlin rows, against the committed CSV). Exactly two rows change, and both
  verdicts are unchanged:
  - modern H3a + D4: −0.038 → −0.044, NOT SIGNIFICANT;
  - modern H3b + D4: −0.050 → −0.050, NOT SIGNIFICANT.

  Every other row is identical.
- **Severity: low.** Regenerate with the fix; no page text changes.

## 2. Other consumers

- **E1 regressions, §4 "EWR resident-register composite 2014–2020" (`int_ewr_lead_lag`): materially
  wrong.**
  - Correlations shrink by a factor of 3–5 (e.g. H2 Spearman k = 2: −0.313 → −0.064; H3c k = 1:
    −0.416 → −0.129).
  - **6 of the 13 §4 verdicts flip SUPPORTED → NOT SIGNIFICANT:**
    - H2 OLS at k = 1, 2 and 4;
    - H3a cross-lagged k = 1 (−0.074 → −0.028, p 0.14);
    - H3b cross-lagged k = 1 (−0.073 → −0.005);
    - H3b k = 2 (−0.104 → +0.016).
  - The surviving H2/H3c Spearman rows use analytic p on pooled non-independent rows (the doc's own
    caveat), so they are weak too.
  - **The published "EWR same-era panel supports H2/H3" pattern does not hold under the correct
    formula.** The scaling factor (per-target Σw = 0.033–2.031) is fixed by geometry, so it imposes
    a spatial pattern on every share. That is why the cross-section is so strongly distorted.
  - The other E1 sections (MSS panels, BZR/Bezirk) keep identical estimates and p. Some bootstrap CI
    bounds move in the 3rd decimal even where estimates are identical. That looks like an unseeded
    or non-deterministic bootstrap in `e1_regressions.py` (aside, see #363 family).
- **E1b (#354 Berlin suite findings):** the same as §1. Two D4 sensitivity rows change, with no
  verdict change.
- **`int_berlin_turnover_proxy` / `int_berlin_displacement_subindex`:** affected.
  - Pre-2021 `residence_duration_5y_share` is scaled, so turnover deltas within 2014–2020 are
    scaled by Σw. The 2020 → 2021 delta straddles the scaled and native values and is spurious.
  - Both are internal, with no mart or page. Fix before any B1/fifth-dimension use.
- **#371 matched panel: unaffected, confirmed.**
  - `thesis_matched_panel.py` lists `int_berlin_ewr_plr2021` and `int_ewr_socioeco*` as forbidden
    inputs (l. 395–396).
  - It uses `int_berlin_ewr_age_bands_plr2021`, which holds counts only (area-allocated, #372 issue
    only).
- **`mart_area_demographics`:** the pre-2021 rows are wrong and ship in the public serving parquet
  (`data/serving/mart_area_demographics.parquet`, read by `web/sources`). Pages render 2025 only,
  but the download is public.
- **Not affected:**
  - `gentrification_index`, `fct_gentrification_change` and the stage marts (uncrosswalked path);
  - the C1 comparison (MSS/OA only);
  - the thesis-era suite panel.

## 3. Severity call: HIGH, add correction notes now (before the fix lands)

- **E1 §4 is linked from the live site.** `/thesis-recheck` l. 446–448 says the EWR panel's
  "earlier results remain documented in the E1 regression findings, §4". Readers are sent to
  results that do not hold.
- **The demographics download** carries wrong pre-2021 shares and means.

**Interim wording.** Add to `/thesis-recheck`, after l. 448:

> "**Correction (November 2026):** the E1 §4 resident-register results were computed with an error
> in how pre-2021 population shares were carried over to the 2021 area boundaries (#381). Under the
> corrected method most of them no longer hold. They are being re-run; do not cite them until then."

Add a matching banner at the top of `docs/epic-e/E1-regression-findings.md` §4, and one line on the
methodology / downloads text:

> "Pre-2021 Berlin demographic shares and means in the download are affected by a known error (#381)
> and will be corrected."

**The fix itself** goes through the normal R-C1 dual gate. The scratch patch above is a working
reference implementation, not a reviewed model. After the fix:
- regenerate E1 (§4 verdicts) and the #354 suite (2 rows);
- rebuild `mart_area_demographics` and the serving parquet.

The domain expert should ratify the interim wording.
