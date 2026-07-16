# G2-OA bandwidth-sweep findings (#274, ADR-0017 D5 C-4 discharge)

**Status:** implementation finding, pending geo-DS + domain-expert R-C1 sign-off (methodology-bearing,
CLAUDE.md Methodology gate).

**Source:** `analysis/oa_bandwidth_sweep.py`; raw output `data/analysis/oa_bandwidth_sweep.csv`
(gitignored, regenerate with `uv run python analysis/oa_bandwidth_sweep.py`).

**Grounding (R-C2):** `docs/adr/0017-poi-offering-advantage-revival.md` D5 condition C-4 ("Report the
cross-bandwidth OA rank correlation; if OA rankings are bandwidth-fragile the G2 page must flag OA
as bandwidth-sensitive. Treat fragility as a substantive finding about the spatial grain of
succession, not merely a caveat."); `docs/methodology/spatial-methods.md` §7 (r > 0.7 MAUP publish-gate
threshold, mirrored here) and §11.2 (the OA-specific {500, 1000, 1500} m sweep spec, 1000 m headline).

---

## What was run

`oa_domain` (the Offering Advantage level actually displayed on
[`/berlin/poi-map`](../../web/pages/berlin/poi-map.md)) was recomputed at each of the three sweep
bandwidths (`gaussian_500m`, `gaussian_1000m`, `gaussian_1500m` — `int_osm_poi_plr_weighted` rebuilt
per bandwidth via the `poi_kernel_bandwidth_m` dbt var, then `int_poi_offering_advantage` rebuilt on
top of each), for Berlin, `methodology_variant='faithful'`, every ingested year (2008–2026). For each
pair of bandwidths, the Spearman rank correlation of `oa_domain` was computed across all
(area_code, snapshot_year, poi_domain_h) triples — both **pooled** across all years (the single
headline figure) and **per year** (robustness detail).

## Result

| Bandwidth pair | Pooled Spearman r (all years, n) | Per-year range | Verdict (r > 0.7) |
|---|---|---|---|
| 500 m vs 1000 m | **0.813** (n=3,441,672) | 0.778 – 0.828 | **Stable** |
| 1000 m vs 1500 m | **0.868** (n=6,243,366) | 0.847 – 0.881 | **Stable** |
| 500 m vs 1500 m | **0.691** (n=4,030,423) | 0.651 – 0.717 | **Fragile** (below 0.7 in 13 of 18 years, and pooled) |

**Finding: OA is bandwidth-sensitive at the extremes of its sweep, but stable around its 1000 m
headline.** Both bandwidths adjacent to the 1000 m headline (500↔1000 and 1000↔1500) clear the 0.7
threshold comfortably and consistently across the full 2008–2026 history. The full-sweep endpoint
comparison (500 m vs 1500 m — a 3x widening of the catchment) falls below 0.7 in the pooled figure and
in 13 of 18 individual years (the remaining 5 years cluster just above 0.7: 0.700–0.707). Per C-4, this
is treated as a substantive methodological finding, not a mere caveat: **widening the OA catchment
from the pedestrian/block scale (500 m) to a 1.5 km retail-catchment scale measurably re-ranks which
PLRs read as commercially over/under-represented**, consistent with the retail-gravitation literature's
own framing (Reilly 1931; Huff 1964; Berry 1967, cited in `spatial-methods.md` §11.2) that catchment
scale is not a neutral implementation detail for a compositional retail-mix construct — it changes
*which* neighbourhood-scale "offering mix" is being measured. The 1000 m headline (ADR-0017 D2.3)
sits at the stable centre of the sweep; the fragility is concentrated at the sweep's own outer bound,
which is itself only ever a sensitivity-check bandwidth, never a candidate headline (spatial-methods.md
§11.2: "500 m is too narrow ... 1500 m is acceptable only as the sweep's upper bound").

## Publish-gate disposition (C-4)

Per ADR-0017 D5 C-4 ("if OA rankings are bandwidth-fragile the G2 page must flag OA as
bandwidth-sensitive"): **OA is flagged as bandwidth-sensitive** on `web/pages/methodology.md` §7 and
`web/pages/berlin/poi-map.md` — the full {500,1000,1500} m sweep contains a below-threshold comparison,
so the honest disclosure is "OA is stable close to its 1000 m headline, but re-ranks meaningfully
toward the edges of the sweep — read the exact bandwidth choice as a real methodological lever, not an
arbitrary implementation detail," replacing the prior #262 interim "not yet tested" disclosure.

## Reproducing this result

```bash
uv run poe build   # ensure the warehouse is built at the project default bandwidth first
uv run python analysis/oa_bandwidth_sweep.py
```

The script rebuilds `int_osm_poi_plr_weighted` + `int_poi_offering_advantage` at each sweep bandwidth
in turn (fast: ~10–12s per bandwidth on the full Berlin 2008–2026 history), reads the resulting
`oa_domain` rows, and **restores the warehouse to its default-bandwidth build** (plus the two
downstream OA marts) before exiting — see the script's module docstring for why it invokes `dbt run`
directly (a narrowly-scoped, documented exception to the analysis-scripts-only-read convention) rather
than reimplementing the kernel math in Python.

## Caveats

- This sweep compares `oa_domain` only (the level the public map displays), not `oa_category`/`oa_type`
  — the finer taxonomy levels were not swept (out of scope for this ticket; a future follow-up could
  extend the sweep to those levels if a finer-grained fragility read is wanted).
- The comparison is Berlin-only (`int_osm_poi_plr_weighted` is Berlin-only; Hamburg's index isn't
  signed off yet, #125).
- This is a **rank** (Spearman) comparison, matching the §7 MAUP publish-gate convention — it says
  nothing about the magnitude of OA value changes across bandwidths, only about re-ranking.
