# #363: geo-DS tolerance note (O1 C-1 invariant, O6 epsilon, improved-lineage drift)

- **Date:** 2026-11-07.
- **Evidence:** `data/gentriduck.duckdb`, opened read-only.
- **Decisions this note implements:** maintainer decision B (2026-11-02). Kernel mass from POIs
  that lie outside every polygon but within the bandwidth is intended.
- **Scope:** I did not edit any code or ADR text.

## 1. Observed (canonicalised: standard `BER` ↔ `gaussian_500m` `berlin`)

**Variants in `int_poi_offering_advantage`:**
- standard BER: `lor_pre2021` 2008–2020, `lor_2021` 2021–2026;
- gaussian_500m `berlin`: the same years and vintages;
- standard HH (`current`) 2008–2026;
- **no gaussian variant for Hamburg.**

**Domain cells (236; 111 exceed |Δ| > 0.01, as reported in the phase-A review).**

| Domain | Cells | median (G − H)/H | max (G − H)/H | H range |
|---|---:|---:|---:|---|
| Retail | 19 | +0.115 % | +0.140 % | 17–10,956 |
| Tourism | 19 | +0.062 % | +0.111 % | 62–14,905 |
| Mobility | 19 | +0.057 % | +0.329 % | 304–39,203 |
| Public Space | 19 | +0.050 % | +0.215 % | 144–56,435 |
| Gastronomy | 19 | +0.044 % | +0.062 % | 129–9,755 |
| Services | 18 | +0.031 % | +0.061 % | 21–3,882 |
| Public Service | 19 | +0.024 % | +0.049 % | 161–7,611 |
| Vacancy | 15 | 0 | +0.251 % | 5–1,355 |
| Sports and Recreation | 19 | 0 | +0.039 % | 21–3,790 |
| Entertainment, Office, Other, Religion | 70 | 0 | 0 | 6–2,842 |

**Structural finding: the excess is a whole number of POIs.**
- At every level, G − H is an integer to within 1.2e-10:
  - domain: 236 cells, min −5e-12, max +43;
  - category: 876 cells, max +21;
  - type: 2,091 cells, max +21.
- Each outside-polygon POI within the bandwidth carries a normalised kernel weight of exactly 1.
  So the excess counts those POIs; it is not a fractional leak.
- G − H is never negative beyond float noise (min −5.5e-12).
- The leaf sets are identical in both variants (0 unmatched leaves at any level).

**City-year totals (all domains), Berlin:**

| | Years | (G − H)/H | Detail |
|---|---|---|---|
| `lor_pre2021` | 2008 | +0.103 % | H = 968, G − H = 1 POI |
| `lor_pre2021` | 2009–2020 | +0.025 % to +0.058 % | |
| `lor_2021` | 2021–2026 | +0.059 % to +0.078 % | max 2022; 2026: 150,651 → 150,753 |

Per-cell relative excess is large only in small cells, e.g. +1.1 % (one POI on H = 90, Recycling
2009). That is why a per-cell relative tolerance is the wrong form.

## 2. Tolerance: form and level

- **Direction: one-sided.** Gaussian ≥ hard. The intended effect can only add mass (outside POIs);
  any loss is a bug, such as the old leakage drop or a dropped polygon in the gaussian branch.
- **Level:**
  - the **relative bound** applies per city × year × vintage total over all domains;
  - **per cell**, only the structural checks apply: one-sided, integer excess, leaf-set equality.
    No relative bound per cell, because small cells would need a floor that makes the bound
    meaningless.
- **Value:** 0.1 % of H, with an **absolute floor of 3 POIs** for tiny years (2008: H = 968,
  1 POI). The observed maximum is 0.078 % for H ≥ 5,000. The floor covers 2008 (1 POI).
- **Integer excess:** |Δ − round(Δ)| ≤ 1e-6 at every level. This catches any normalisation bug
  (weights not summing to 1, half-counted POIs) regardless of size.

**It blocks real bugs.** I simulated each on the warehouse totals:

| Simulated bug | Result |
|---|---|
| Observed data | 0 of 19 city-years fail |
| 1 % mass loss | 19 / 19 fail (one-sided) |
| A median PLR's POIs counted twice in G (2026 median 225 POIs, 0.15 % > remaining headroom) | 19 / 19 fail |
| A median PLR dropped from the hard variant | 19 / 19 fail |
| Doubling of any single PLR (share of PLRs whose doubling is caught) | 86 % in 2015, 94 % in 2026 |
| Kernel weights not normalised (any size) | fails on integrality |

The PLRs not caught by the doubling test are the smallest ones, below about 0.03 % of the city.

## 3. Hamburg (ADR-0005)

- **There is no gaussian Hamburg variant**, so C-1 is currently vacuous for HH. That matches the
  ADR-0017 scope, since the gaussian OA is Berlin-only so far. The test must not silently pass if
  one is added.
- **City codes.** The gaussian branch writes `city_code = 'berlin'`, but the standard branch and
  `dim_city` use `'BER'`. This is the root cause of the vacuous join and an ADR-0005 inconsistency.
  The gaussian model should emit `'BER'`. Until then, the test must canonicalise the city code.
- **Coverage assertion.** The test must also assert that every gaussian (city, year, vintage) has
  a standard counterpart. An unmatched gaussian city is a failure, not a skip.
- The rule itself is city-agnostic and applies unchanged to HH once a gaussian variant exists.

## 4. Exact invariant sentence (for the ADR-0017 D5 C-1 amendment)

> "C-1 (restated, #363, maintainer decision B 2026-11-02): for every city, snapshot year and area
> vintage, and at every taxonomy level, the gaussian variant's city-wide stock equals the hard
> (point-in-polygon) stock plus a non-negative whole number of POIs: the POIs outside every area
> polygon whose kernel reaches an area within the bandwidth (each contributes total weight 1). The
> excess is bounded per city-year total over all domains by max(0.1 % of the hard total, 3 POIs).
> Any negative or non-integer excess, a missing taxonomy leaf in either variant, or a gaussian
> city-year without a hard counterpart is a violation (BLOCKING)."

## 5. Test spec (`test_c1_oa_weighted_mass_conservation_invariance.sql`, error severity)

1. **Canonicalise** `city_code` on both sides: map `'berlin'` to `'BER'`, or better, fix the model.
2. **Coverage.** Use a full outer join of weighted and standard on (city, year, vintage, leaf) per
   level. Any row with a NULL on either side is returned. Also return any gaussian (city, year,
   vintage) with no standard rows.
3. **Per cell, every level (domain / category / type):**
   - return rows where `weighted − standard < -1e-6`;
   - return rows where `abs((weighted − standard) − round(weighted − standard)) > 1e-6`.
4. **Per city × year × vintage** (sum of domain cells): return rows where
   `weighted_total − standard_total > greatest(0.001 * standard_total, 3)`.
5. Remove the old two-sided `abs(...) > 0.01` checks.
6. Update the header of `int_osm_poi_plr_weighted.sql` (l. 54, "Σ … = hard city total hold
   exactly") to the restated invariant.

## 6. O6: `zscore_slq` guard

- **Problem.** A category whose city share is 1 within a few ulp flips between NULL and a
  meaningless z between builds. There are 17 such cells with |1 − p| < 1e-9 and p ≠ 1; 91 are
  exactly 1. The smallest genuine complement is 1 − p = 0.0053, so a 1e-9 cutoff separates noise
  from real values by more than six orders of magnitude.
- **Fix:**
  - compute the complement as a difference of stocks, `q = (parent_city − child_city) /
    parent_city`, not `1 − p`;
  - set z to NULL when `p <= 1e-9 or q <= 1e-9 or local_base = 0`. This is a **relative epsilon of
    1e-9 on the share**.
  - apply it to all three levels (domain, category, type).

## 7. Improved-lineage float drift (`status_score_improved`)

- **Observed:**
  - 3,411 non-null values, 2,375 distinct;
  - 124 consecutive distinct-value gaps are < 1e-12. These are ties split by noise, with up to
    2.7e-15 drift between builds;
  - the next-smallest genuine gap is 6.1e-7.
- **What rounding does:**
  - **9 decimals** gives 2,251 distinct values = 2,375 − 124. It merges exactly the noise-split
    ties and nothing else;
  - 6 decimals would also merge one genuine pair, so it is too coarse.
- **Recommendation: round, in the model.** Set `status_score_improved =
  round(<expression>, 9)` in `int_poi_status_dynamism_improved` (z-scale, so this is absolute
  1e-9).
- **Why rounding and not a deterministic summation order:**
  - Rounding restores the mathematically equal values as exact ties. Spearman in
    `c_three_way_comparison.py` (`scipy.stats.spearmanr`, average ranks) then treats them as the
    ties they are. That is the methodologically correct handling.
  - A deterministic summation order makes reruns reproducible, but still leaves equal-in-exact-
    arithmetic values split. Inputs summed in different orders in different groups land on
    different last bits, so the ranks would be stable but wrong for ties.
  - Rounding in the model rather than in the analysis keeps every consumer consistent.
- **After the fix:** regenerate C1 (`C1-three-way-comparison-findings.md`, currently stale,
  n = 435 vs 433).

## Gate

This is methodology-bearing (ADR-0017 invariant, gated models). The domain expert should ratify the
invariant sentence and the edge-effect disclosure text.
