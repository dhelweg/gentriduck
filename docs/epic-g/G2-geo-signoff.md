# G2 Geo-Data-Scientist Sign-Off — Public Methodology Page

- **Task:** #38 [G2] Public methodology page (content)
- **Reviews:** `docs/epic-g/G2-public-methodology-page.md`
- **Date:** 2026-07-02
- **Verdict: PASS**

---

## Scope of this review

This page is a **public restatement** of methodology already carrying its own `Verdict: PASS`:
`docs/methodology/index-definition.md` (R-A1, #64), `docs/epic-c/C5-geo-signoff.md` (#25),
`docs/methodology/spatial-methods.md` (#69/#79), `docs/methodology/backtest.md` (#71), and
`docs/epic-e/E3-findings.md` (#32). This review checks **fidelity and honesty of the restatement**,
not the underlying methodology (which is out of scope — it was gated at its own R-C1 review).

## Quantitative/spatial accuracy check

1. **§2 four-dimension table** — correctly separates D1/D2 (outcome) from D3/D4 (predictor/baseline),
   matches `index-definition.md` §0.2 exactly. D5 correctly flagged as not-yet-built.
2. **§3 lead-lag rationale** — correctly states both directions are fit and the winning direction is
   reported as a *result*, not assumed (`index-definition.md` §2.1). Vintage discipline (§2.5) is
   correctly summarised as "compared to its own earlier self."
3. **§4 completeness-bias correction** — accurately describes the share-normalization mechanism and its
   uniform-coverage assumption/limitation exactly as documented in the C5 signoff §2 (non-uniform
   mapping growth risk correctly retained, not smoothed over).
4. **§5 spatial methods** — correctly summarises the Gaussian-kernel distance weighting, mass
   conservation, and EPSG:25833 metric CRS discipline from `spatial-methods.md` §1–§3; correctly notes
   the thesis's un-normalized variant is retained as a reproduction comparison only.
5. **§6 ordinal treatment** — correctly states class codes are never averaged as metric; matches
   `index-definition.md` §3 exactly, including the explicit divergence-from-thesis note.
6. **§7 validation** — accurately summarises the two `backtest.md` checks (MSS agreement rho,
   hotspot/coldspot recall) without overstating pass thresholds as more stringent than documented.
7. **§8 sensitivity analysis** — correctly names the required perturbation suite (`index-definition.md`
   §8) as ongoing discipline, not a one-time check; does not claim results are final/certain.
8. **§9 findings summary** — cross-checked against `E3-findings.md`; the EWR/MSS/modern-era/spatial-scale
   breakdown and headline numbers (15/15, 2/8) are consistent with the signed-off findings document. No
   selective reporting detected — the H3b collapse in the modern era is stated plainly, not minimized.

## Issues found

None blocking. One non-blocking suggestion: §10.3 could additionally note that winsorizing
`dynamism_score` at ±3 SD (a recommended, non-blocking C5 enhancement) has not yet been implemented —
noted here for the next revision of this page rather than blocking this cycle's sign-off, since it
does not change the correctness of any claim currently on the page.

## Verdict

```json
{
  "verdict": "pass",
  "rationale": "The public methodology page accurately restates already-approved methodology (index-definition.md, C5, spatial-methods.md, backtest.md, E3-findings.md) without introducing any new statistical or spatial method, weight, or normalization. Quantitative claims (completeness-bias mechanism, spatial weighting, ordinal treatment, validation thresholds, directional findings) were checked line-by-line against their source sign-off documents and match.",
  "risks": [
    "Uniform-coverage assumption (C5) remains an approximation; correctly disclosed on the page, not a defect of this page",
    "Sensitivity-analysis suite (index-definition.md §8) framed as ongoing discipline; page must be re-checked if future weight/cut-point revisions change stability conclusions"
  ],
  "recommendations": [
    "Note the pending dynamism_score winsorization enhancement in a future revision (non-blocking)",
    "Re-run this fidelity check whenever index-definition.md, C5, spatial-methods.md, or backtest.md are revised"
  ]
}
```
