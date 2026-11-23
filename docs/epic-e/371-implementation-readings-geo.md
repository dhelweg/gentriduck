# #371 matched panel: geo-DS rulings on the DE's implementation readings

- **Date:** 2026-11-05. Post-results-generation, **pre-interpretation**. No output file was opened to make these
  rulings. Reading 3 was raised by the DE from an observed row pattern (BER H2, as seen in a B = 29 debug run; see Amendment 5 correction note),
  and the PM had seen a verdict summary; the geo-DS saw only the DE's description of that pattern.
- **This is not the results sign-off.**
- **PR** = `docs/methodology/371-matched-comparison-preregistration.md`. Changes that need PR text
  are in its **Amendment 5** (A5.1, A5.2).

| # | Reading | Ruling | Change |
|---|---|---|---|
| 1 | Berlin N1 NO DATA (19 of 24 blocks < 20) | **Accept** | Floor stays (PR §6.2: "G ≥ 20 keeps the P354 `min_clusters = 20` rule"). Lowering it after seeing NO DATA would be a forking path. |
| 2 | Sensitivities uncorrected | **Accept, one exception** | The ≥ 5,000 statement-rule condition uses BH within that panel's X8 (A5.2). |
| 3 | Flip flag compares BH primary with uncorrected sensitivity | **Change** | Flip = sign change or a difference in unadjusted significance, compared on the same scale (A5.1); the diagnostic and MAUP flags stay sign-only. |
| 4 | Coarse-cluster sensitivities, floor 5 | **Accept** | Label only. |
| 5 | R19-pub pp change; M3 2020-only swaps weights only | **Accept** | Label only. |
| 6 | Smaller readings | **Accept all, with notes** | See below. |
| 7 | Balanced Berlin PLRs = 535, not 541 | **Accept** | Reconcile the 6. |
| 8 | X8 `n`/`n_clusters` summed; outcome suffixes | **Accept with change** | Per-city n in `notes`. |
| 9 | Low-B debug runs before the binding run | **Accept with disclosure** | Disclose in metadata. |

## Details

**1. Berlin N1 NO DATA**
- The floor counts occupied blocks in the analysed subset. That reading is right.
- Berlin N-family: NO DATA is not a test, so BH runs over N2 alone (m = 1, adjusted = raw). The
  findings must say so.
- The N1 city-difference row is exploratory (PR §7.5) and **not** part of the X8 BH family.
  Check that it is excluded from the X8 BH count.
- HH fine-grain H1a/H1b NO DATA (18 blocks): accept. PR §6.5 already expects the fine-grain HH H1/H2
  rows to be "not comparable".

**2. Sensitivity verdicts uncorrected**
- PR §0 and §7.5 say "every sensitivity [is] uncorrected and exploratory".
- Label such rows "unadjusted", never as a verdict on a par with the primary.
- **Exception (A5.2):** the ≥ 5,000 condition of the robust-DIFFERS rule requires DIFFERS after BH
  over the 8 X8 rows within the ≥ 5,000 panel.
- Required change: recompute the statement-rule column under A5.2.

**3. Flip flags (change)**
- Recompute every flip flag per A5.1: (a) the sign changes, or (b) unadjusted p < 0.05 differs
  between primary and sensitivity.
- A primary that is n.s. only because of BH, and whose sensitivity is also unadjusted-significant
  with the same sign, gets **no** flag. Correction (2026-11-05): the BER H2 description that prompted this came from a B = 29 debug
  run. In the binding run, both BER H2 flags remain under A5.1 as written (Amendment 5 correction
  note). The rule is unchanged.
- Add a `primary_p_unadj` column, or put it in `notes`, so the comparison can be reproduced.

**4. Coarse-cluster sensitivities**
- Floor 5 is the P354 `min_clusters` default (354 PR, `cluster_bootstrap_ci`).
- PR §6.2 already says these runs "cannot change a verdict" and must be flagged "too few clusters for
  reliable coverage" (Bezirk). Make sure G = 16 rows also state their floor.

**5. R19-pub and M3 2020-only**
- **R19-pub in pp:** R19-pub exists to show the as-published contrast (A4 rev. 1, E1). The z-change
  view is already the general §4.3 sensitivity.
- **M3 2020-only, weights only:** this follows the M3 wording ("weights from 2020 only"). Note in the
  row that bands and P^(U)/P stay at the interpolated 2022 values. It is deliberately narrower than
  W24 (A4.1, E6).

**6. Smaller readings**
- **Diagnostics, top decile over the full span: accept.** One deterministic exclusion set avoids a
  per-window forking path. Not re-standardising keeps K identical to the primary. Write the dropped
  unit IDs to the metadata.
- **N1 median per pivot edition: accept.** K is z-scored per edition (PR §3.4), so the per-pivot
  median is the natural reading of "the city's median".
- **N3 lag over the full matched panel: accept.** Neighbourhood structure must not depend on the
  analysed subset, and this holds in the ≥ 5,000 panel too.
- **≥ 5,000 on the balanced-child population: accept.** Pin the date: 31.12.2024 (A4.1) for Berlin,
  and edition 2025 `population` for Hamburg. State it in the metadata. If the DE used another date,
  change it.
- **HH low-power rule not applied: accept.** The P354 rule addressed rare published Dynamik classes
  (4–10 % positives). The matched H2 target is dK > 0 (PR §3.5), which is near-balanced.
- **D4 rows dropped per the §8.1 allow-list: accept** (PR §3.1, D4).
- **f as exact fractions: accept.** The PR values 0.292 / 0.375 / 0.458 / 0.500 are roundings of
  months/24.

**7. 535 Berlin PLRs**
- §2.3's binding rule is the definition ("inhabited in all four editions and with an MSS value in
  2021/2023/2025"); "541" was a parenthetical from the #354 frame.
- List the 6 PLRs by ID with their reason in `371-data-checks.md` or in the metadata.

**8. X8 bookkeeping**
- A summed n invites misreading power. Keep the schema, but add `n_BER=…;n_HH=…;clusters_BER=…;clusters_HH=…`
  to `notes`.
- Document the outcome suffixes in the metadata.

**9. Low-B debug runs**
- Acceptable, because point estimates do not depend on B and no specification was changed after them
  except the two noted fixes.
- Disclose both in the metadata:
  - the B values and dates of the debug runs;
  - the two later fixes, with evidence that no estimate changed (for example, identical result CSV
    columns `estimate`/`n` before and after).

## Gate

- **Amendment 5** is methodology-bearing, so the domain expert must ratify A5.1/A5.2. Check that:
  - the flip definition is neutral;
  - BH in the ≥ 5,000 panel matches what the Revision 3 statement rule intended.
- The results sign-off follows after:
  - items 2, 3, 7, 8 and 9 are implemented;
  - the DE code review passes.
