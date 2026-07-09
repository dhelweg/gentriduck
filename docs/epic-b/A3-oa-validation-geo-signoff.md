# Geo-DS Sign-off: OA-A.3 (#167) — Direct OA validation vs the 2018 thesis

- **Scope:** OA-A.3 #167 — spatial-statistical soundness of the direct OA validation
  (`stg_thesis_2018_result_plr_oa.sql`, `seed_poi_thesis_taxonomy_crosswalk.csv`,
  `analysis/b_oa_validation.py`, `docs/epic-b/A3-oa-validation-findings.md`). Domain-fidelity
  companion is `docs/epic-b/A3-oa-validation-domain-signoff.md`.
- **Operationalizes:** direct comparison of the OA-A.2 nested location quotient
  (`int_poi_offering_advantage`) against the thesis's own 170 `oa_*`/`prev_oa_*` PLR columns
  (`reference/goldens/20180909_result_full_plr.csv`); `docs/planning/oa-revival-and-methodology-improvement.md`
  Run 1 (faithful backtest).
- **Reviewer:** geo-data-scientist
- **Date:** 2026-07-09
- **Branch:** feature/167-oa-a3-golden-validation → develop
- **Verdict:** PASS WITH CONDITIONS (conditions C-1..C-3, none blocking this ticket)

## 1. Join and grain correctness

Verified: `stg_thesis_2018_result_plr_oa` unpivots the golden's 170 named `oa_*`/`prev_oa_*`
columns into exactly 436 PLRs x 85 suffixes = 37,060 rows (checked directly against the CSV
header — 85 distinct suffixes, matching `seed_poi_thesis_taxonomy_crosswalk`'s 85 rows
one-for-one; the `relationships` test on `thesis_oa_suffix` confirms zero orphans in both
directions). The PLR join key (`LPAD(raum_id, 8, '0') = area_code`) mirrors the exact
precedent already established in `int_thesis_2018_area_index.sql` — correct reuse, not a new
join convention.

**A real fan-out bug was caught and fixed during this review pass**: the original
`load_comparison()` query joined the golden's domain/category rows to
`int_poi_offering_advantage` on a partial key (domain-only, or domain+category), which under
DuckDB's normal join semantics fans out across every sibling type/category leaf sharing that
partial key (e.g. `total_d_waren_stock` produced 3,670 rows instead of 436 — 8.4x inflation).
Because `oa_domain`/`oa_category` are constant across siblings (same window-function
partition, ADR-0017 D1), the fan-out didn't corrupt the *value* pairs, but it did silently
inflate `n` (and therefore overstated the precision of the reported p-values — a real
pseudo-replication risk, same class of caveat already flagged in `e1_regressions.py`'s EWR
lead-lag join). The fix (`GROUP BY ... MAX()` before the Spearman calculation) restores the
correct n=436 per domain/category suffix, confirmed in the final findings file. **This is
exactly the kind of arithmetic-correctness check this gate exists to catch — good catch,
now fixed, not a residual concern.**

## 2. Statistical method

Spearman rank correlation (per-suffix pooled per level, plus per-suffix breakdowns) is the
right choice for this ticket's explicitly *directional* framing (CLAUDE.md Epic B framing) —
it is robust to the OA construct's non-normal, ratio-of-shares distribution and to the
sparse/dense grain mismatch (ties from zero-inflated leaves are handled correctly by
`scipy.stats.spearmanr`'s tie-corrected implementation). Not attempting exact point-estimate
match (e.g. RMSE-only) is the correct call — that would conflate "the world changed since
2016" with "we changed the metric," which is precisely what Epic B framing warns against.

## 3. Sparse-vs-dense zero-fill reconciliation (C-1, non-blocking here, tracked for A.4/C.1)

The golden CSV zero-fills every named OA column per PLR; `int_poi_offering_advantage` omits a
row when a taxonomy leaf has zero POIs (documented, intentional sparse convention per
OA-A.2's own header). Treating a missing recomputed match as 0 is the correct reconciliation
— it makes the two representations directly comparable without inventing values — but it
means PLRs with a genuinely-absent leaf and PLRs with a leaf present-but-computed-to-0 (e.g.
a domain total of 0 POIs, mathematically undefined OA that this script silently reports as a
tie at 0 rather than NULL) are not distinguished. This is why several category/type suffixes
report `rho=n/a` (zero variance after zero-filling, e.g. `dl_c_beerdigung_stock`,
`vergnuegung_t_biergarten_stock`) rather than a spuriously perfect or degenerate correlation —
correctly guarded by the `nunique() < 2` check in `per_suffix_spearman()`. **Condition C-1
(non-blocking):** OA-A.4/C.1 should carry forward a minimum-POI-base suppression flag (already
flagged as OA-A.2's D-3, deferred) rather than silently zero-comparing near-empty leaves.

## 4. Bandwidth (C-2, non-blocking, expected follow-up)

This validation runs at `gaussian_500m` (the default weighted build already materialized in
this warehouse), not the ADR-0017 D2.3 headline recommendation of 1000 m. The `standard`
(hard point-in-polygon) variant is unaffected and is the primary read here; the `gaussian_500m`
read is reported as a secondary check and both directionally agree (domain rho differs by
~0.02-0.05 between variants, not materially). **Condition C-2 (non-blocking):** rebuild
`int_osm_poi_plr_weighted` at 1000 m and rerun this script as part of OA-C.1 (#174)'s
bandwidth sweep — already scoped there, correctly not duplicated here.

## 5. Category/type-level weaker agreement is expected, not a defect (C-3)

Domain-level rho (0.15-0.91, mostly 0.68-0.91 across periods/variants) is materially stronger
than category (0.05-0.92, median cluster 0.4-0.6) and type-level (0.001-0.5) agreement. This
is the expected statistical signature of aggregation: coarser leaves pool more POIs per PLR,
damping single-POI swing effects that OA-A.2's own D-3 note already flags as a known LQ
instability at low counts (a single sauna or water-sports facility swinging a PLR's rank
entirely explains the near-zero `sport_t_wassersport_stock`/`sport_t_sauna_stock`/
`sport_t_schwimmen_stock` rho — these are genuinely rare, low-count OSM tags). **Not a
methodology defect** — it is the correct scope decision (this ticket's stated plan) to report
domain-level as the headline and category/type as a secondary, lower-confidence read.
**Condition C-3 (non-blocking):** OA-A.4's H1-H3c regressions should primarily use
domain-level OA as predictors, falling back to category/type only where the thesis's own
hypothesis specifically operationalizes a finer leaf (e.g. H1b fast-food).

## 6. Crosswalk translation accuracy

Spot-checked ~25 of the 85 German-to-English mappings against `reference/system/71_oa.sql`
column comments and standard German vocabulary (Handwerk = craft/trade, Werkstatt = workshop,
Drogerie = drugstore, Kosmetik = cosmetics/beauty). All check out. The one flagged domain
divergence (Biergarten under Entertainment in the thesis vs Gastronomy in the current OSM
taxonomy) is correctly identified, not silently absorbed, and correctly resolved to the domain
where OA-A.2 *actually* computes the leaf (Gastronomy) so the join is non-empty and testable
rather than vacuously empty.

## Verdict

**PASS WITH CONDITIONS.** The staging model, crosswalk, and analysis script are
spatial-statistically sound after the fan-out fix; conditions C-1..C-3 are forward-looking
scope items for OA-A.4/C.1, not blockers for integrating this ticket's domain-level headline
finding into `develop`.
