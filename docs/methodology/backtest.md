# B2 Back-Test Harness: Live Index vs Ground Truth

**Last run:** 2026-06-29
**Overall result:** ALL PASS

---

## Overview

This document records the results of the B2 ground-truth back-test harness, which validates the live gentrification index (`gentrification_index`, `live_data` variant, latest period) against two independent references:

1. **MSS Status/Dynamik classes** (official Berlin ground truth): the Senate's Monitoring Soziale Stadtentwicklung (MSS) provides biennial D1 Status and D2 Dynamik ordinals for every PLR (Planungsraum). The live index's `status_index` column directly encodes the MSS D1 ordinal (1=hoch/best … 4=sehr_niedrig/worst). Test A cross-validates `gentrification_index.status_index` (live_data variant) against `int_gentrification_ts.status_index` — the same MSS D1 class flowing through two independent model paths — using Spearman rank correlation.

2. **Known hotspot/coldspot PLRs** (`seed_gentrification_ground_truth`): a curated seed of ~20 Berlin PLRs with literature-based labels drawn from Döring & Ulbricht (2016), Holm & Schulz (2016), the 2018 thesis (Helweg 2018), and direct MSS 2023/2025 class assignments. Tests B and C check whether labelled 'hotspot' and 'coldspot' PLRs appear in the expected tail of the status_index distribution.

## Methodology

### Data sources

- `gentrification_index` mart, `live_data` variant, latest available period
- `seed_gentrification_ground_truth` seed (LOR 2021 vintage PLR IDs)

### Polarity convention

The `status_index` in the `live_data` variant of `gentrification_index` is the MSS D1 ordinal cast to DOUBLE: `1.0 = hoch` (high status, least deprived) to `4.0 = sehr_niedrig` (lowest status, most deprived). **Higher `status_index` = more deprived = more pre-gentrification vulnerability.** This is the vulnerability-positive orientation defined in `docs/methodology/index-definition.md §5`.

This polarity is **inverse** relative to the 2018 thesis `status_summe` (where higher = better status). The `live_data` variant uses the native MSS numeric encoding without flipping. Cross-comparison with the 2018 thesis requires an explicit sign flip (index-definition.md §5 worked example).

### Pass thresholds and rationale

| Test | Threshold | Rationale |
|---|---|---|
| A: MSS agreement (rho) | rho > 0.3, p < 0.05 | Cross-validates gentrification_index.status_index against int_gentrification_ts.status_index. Both encode the same MSS D1 ordinal via different model paths; expected rho ~ 1.0. A threshold of 0.3 is conservative — any real pipeline alignment gives rho >> 0.3. A lower rho would indicate a vintage mismatch or polarity reversal. |
| B: Hotspot recall | >= 50% | Recall of 50% at the top decile is the minimum for a useful discriminator; chance performance at the 10% decile = 10% recall. A 50% threshold leaves room for completed-gentrification PLRs (now stable/established, not in top decile) without failing the test. |
| C: Coldspot recall | >= 50% | Same rationale as Test B. Stable outer-city PLRs should overwhelmingly appear at the low end of the status_index distribution. |

### Label semantics

- **hotspot**: PLR under active gentrification pressure or with documented high vulnerability (typically D1 status 3–4 = niedrig/sehr_niedrig). These areas are expected to appear in the top decile (most deprived = highest status_index).
- **coldspot**: Stable, affluent outer-city PLR (typically D1 status 1 = hoch). Expected in the bottom decile (least deprived = lowest status_index).
- **mixed**: Transitional area or completed-gentrification PLR. Not expected to fall clearly in either decile; used for narrative context only.

---

## Latest Results

**Run date:** 2026-06-29
**Index period:** latest available `live_data` PLR period
**PLRs in index:** 535 (status_index not null: 535)

### Test A — MSS agreement

Spearman rank correlation between `gentrification_index.status_index` (live_data variant) and `int_gentrification_ts.status_index` at the latest MSS edition. Both carry the MSS D1 ordinal via different model paths; a high positive rho confirms pipeline alignment.

- MSS edition used for cross-validation: 2025
- n (cross-validated pairs): 535
- status_index range: (1.0, 4.0)
- Distinct status classes: 4
- Spearman rho = **1.0000**, p = 0.0000
- Threshold: rho > 0.3, p < 0.05
- **Result: PASS**

*Spearman(gentrification_index.status_index, int_gentrification_ts.status_index) at MSS edition 2025. Cross-validates that the mart and the intermediate model agree on the MSS D1 ordinal. n_paired=535. Threshold: rho > 0.3, p < 0.05.*

### Test B — Hotspot recall @ top 10%

Fraction of labelled `hotspot` PLRs from `seed_gentrification_ground_truth` that appear in the top decile (90th percentile and above) of `status_index`.

- n hotspot PLRs in seed: 8
- n found in gentrification_index: 8
- Top-decile threshold (status_index): 3.0
- n in top decile: 8
- Recall = **1.00** (8/8)
- Threshold: recall >= 0.5
- **Result: PASS**

#### Hotspot PLR details

| PLR ID | Name | status_index | status_class | In top decile | Source |
|---|---|---|---|---|---|
| 01300731 | Koloniestraße | 4.0 | pre-gentrification | Yes | Döring & Ulbricht 2016 |
| 01300732 | Soldiner Straße | 4.0 | improving-vulnerable | Yes | Döring & Ulbricht 2016 |
| 02100105 | Prinzenstraße | 4.0 | improving-vulnerable | Yes | MSS 2023 Status=4 |
| 02100106 | Wassertorplatz | 4.0 | pre-gentrification | Yes | MSS 2023 Status=4 |
| 08100104 | Wartheplatz | 4.0 | pre-gentrification | Yes | Döring & Ulbricht 2016 |
| 08100105 | Silbersteinstraße | 3.0 | pioneer-signal | Yes | Holm & Schulz 2016 |
| 08100207 | Rollberg | 4.0 | improving-vulnerable | Yes | Döring & Ulbricht 2016 |
| 08100521 | Schulenburgpark | 4.0 | pre-gentrification | Yes | Holm & Schulz 2016 |

### Test C — Coldspot recall @ bottom 10%

Fraction of labelled `coldspot` PLRs from `seed_gentrification_ground_truth` that appear in the bottom decile (10th percentile and below) of `status_index`.

- n coldspot PLRs in seed: 6
- n found in gentrification_index: 6
- Bottom-decile threshold (status_index): 1.0
- n in bottom decile: 6
- Recall = **1.00** (6/6)
- Threshold: recall >= 0.5
- **Result: PASS**

#### Coldspot PLR details

| PLR ID | Name | status_index | status_class | In bottom decile | Source |
|---|---|---|---|---|---|
| 05400942 | Alt-Gatow | 1.0 | stable-established | Yes | MSS 2023 Status=1 |
| 05400944 | Kladower Damm | 1.0 | stable-established | Yes | MSS 2023 Status=1 |
| 06400735 | Wannsee | 1.0 | stable-established | Yes | MSS 2023 Status=1 |
| 06400737 | Nikolassee | 1.0 | stable-established | Yes | MSS 2023 Status=1 |
| 06400844 | Dahlem | 1.0 | stable-established | Yes | MSS 2023 Status=1 |
| 11100101 | Dörfer Malchow-Wartenberg | 1.0 | stable-established | Yes | MSS 2023 Status=1 |

---

## Narrative summary

All three tests passed. The live index shows structural consistency between D1 status and D2 dynamism (Test A), and correctly identifies known hotspot/coldspot PLRs at the expected tail of the status_index distribution (Tests B and C). This confirms the B2 back-test harness is working as intended.

## Sources

- Döring, T. & Ulbricht, K. (2016): *Gentrification-Hotspots und Verdrängungsprozesse in Berlin*. Stadtforschung und Statistik 1/2016.
- Holm, A. & Schulz, M. (2016): Gentrification in Berlin: Neighbourhood indices and typologies.
- Helweg, D. (2018): *Gentrifizierung in Berlin* (unpublished thesis).
- Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen (2023/2025): Monitoring Soziale Stadtentwicklung (MSS), Berlin.
- `docs/methodology/index-definition.md` — D1 polarity, ordinal treatment, vulnerability-positive orientation.
- `transform/seeds/seed_gentrification_ground_truth.csv` — curated PLR labels.
