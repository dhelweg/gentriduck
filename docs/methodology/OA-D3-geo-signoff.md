# OA-D3 (#240, ADR-0024) — geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
- **Artifact under review:** `int_poi_offering_advantage_methods.sql` +
  `mart_poi_oa_methods.sql` + `seed_oa_calculation_methods.csv` — the CORE slice of
  the D3 calculation-method columns (`nested_lq` pass-through, `global_lq`,
  `log_lq`, `share_diff`, `shrunk_lq`, `raw_share`, at domain/category/type
  taxonomy levels), reviewed as a **conformance check against the
  already-PASSed OA-D0 gate** (`OA-D0-geo-signoff.md`), not a new methodology
  decision.
- **Date:** 2026-07-17
- **Grounding (R-C2):** `OA-D0-geo-signoff.md` C1, C2, C4, C7; `spatial-methods.md`
  §11.1; ADR-0024; `int_poi_offering_advantage.sql`; Isard (1960); Miller, Gibson
  & Wright (1991); Efron & Morris (1975), *Data Analysis Using Stein's Estimator
  and its Generalizations*, JASA; Agresti (2013), *Categorical Data Analysis*
  3rd ed. §3.3.

---

## Verdict: PASS

## Scope discipline — the split from the "everything" D3 set is correct

D0's confirmed knob 1 ("method set = everything") named ten methods: the six
built here (nested/global/log/share-diff/shrunk/raw-share) plus four
**promoted** modes (z-score/binomial-SLQ, Getis-Ord, density, per-capita). This
submission builds only the first six — the ones that are **pure functions of
int_poi_offering_advantage's already-computed, already-tested stock pair**
(no new join, no new tool, no new data source). The four deferred modes each
require something this slice deliberately does not introduce: per-capita needs
the EWR population join (C10), density needs `ST_Area` geometry (C5/C8),
Getis-Ord needs a Queen-contiguity spatial-weights matrix and, per **C9,
explicitly needs a system-architect ruling** on whether promoting `esda`/W into
a published mart strains the "no new tool" claim, and z-score/binomial-SLQ
needs the same population/geometry inputs as the other three. Building the
tool-free six now and gating the tool-touching four behind the C9 architect
question (OA-D3b) is the responsible order of operations — it does not
under-deliver D3's core, and does not let an unresolved tooling-boundary
question block work that does not depend on it.

## Verification against the six conditions this slice actually touches

- **C1 (LQ-last) / C2 (stock-first, broadcast-once):** inherited unchanged —
  every new method is a function of `int_poi_offering_advantage`'s own
  `*_stock_local` / `*_stock_city` pair (formed via the model's own window-SUM
  LQ-last pipeline). No new stock is derived here; C1/C2 are satisfied by
  construction, not re-proven, exactly as the model header states.
- **C4 (`min_parent_base` = 10 for the LQ family):** the shrunk-LQ's prior
  weight `k` reuses `oa_min_poi_base_n` (default 10) rather than inventing a
  new number — the correct reuse of the already-justified threshold **as a
  smoothing prior instead of a suppression cutoff**, which is the textbook
  Laplace/additive-smoothing move (Agresti 2013 §3.3) and is exactly what an
  empirical-Bayes shrinkage estimator needs (Efron & Morris 1975): shrink
  toward the city rate proportionally to how thin the local base is, converge
  to the raw nested-LQ as the base grows. Verified empirically against the
  live warehouse: at `all_domains_stock_local < 5`, `oa_domain_shrunk_lq` caps
  around 20 while `oa_domain_nested_lq` reaches 80-125 for the same rows — the
  shrinkage measurably damps exactly the small-denominator instability D-3
  only flags/annotates. This is the correct qualitative signature of the
  estimator; I did not re-derive the exact numeric target (no ground truth for
  "the right" shrunk value exists — the domain sign-off's #274 discharge
  already established that suppression/flagging, not correction, is the
  accepted posture for D-3, so shrunk-LQ is offered as an ADDITIONAL,
  orthogonal instrument alongside the flag, not a replacement for it).
- **C7 (never-blend / typed columns / `oa_method` accepted_values):** verified
  structurally — every new column is a function of exactly one method against
  one stock pair; no combined/averaged score exists anywhere in the diff.
  `mart_poi_oa_methods.oa_method` is `relationships`-tested against
  `seed_oa_calculation_methods.oa_method` (not just `accepted_values` — a
  stronger guarantee, since it fails if the seed and the unpivoted column
  vocabulary ever drift, in either direction). The `global_lq == nested_lq` at
  domain level identity (see below) is enforced by a dedicated regression test,
  not just documented prose — the right level of rigor for a claimed
  mathematical identity per C7's "hold the line" instruction.
- **The `global_lq` == `nested_lq` domain-level identity is correct and
  correctly tested.** `oa_domain_global_lq` and `oa_domain_nested_lq` are
  proven algebraically identical (a domain's own parent-relative base already
  IS the all-domains grand total — there is no third level above domain for
  "global" to diverge through) and this is enforced by
  `test_c7_oa_domain_global_lq_equals_nested_lq.sql`, which passed against the
  live warehouse (0 violation rows). This is the right regression guard: a
  future edit that broke this identity would indicate one of the two formulas
  had silently drifted from its documented definition.
- **`log_lq`/`share_diff` unit discipline:** `log_lq` is `ln(nested_lq)` — a
  monotonic re-expression of the SAME ratio (log-centred at 0 instead of 1),
  not a new construct requiring separate C1/C2 verification. `share_diff` is a
  genuinely different unit (a pp difference, not a ratio) and is correctly
  NOT compared/summed against any ratio-family column anywhere in this diff.
- **`raw_share` (C3 posture):** implemented as a bare proportion with no city
  normalization, as specified. C3's completeness-contamination Spearman gate
  itself is explicitly D5 scope (comparison study), not asserted here as a
  build-blocking test — correct, this slice's job is to compute the six
  columns, not to run the D5 study. The seed's
  `expected_temporal_safe = false` for `raw_share` records the C3 directional
  expectation for the D5 study to check later, which is the right
  hand-off artifact.

## Data sanity spot-check (live warehouse, this worktree's copy)

`mart_poi_oa_methods` produced ~2.57M rows per method (6 methods x the leaf
grain), all within plausible ranges: `nested_lq`/`global_lq` in
[0.007, ~10800] (the extreme upper tail is exactly the small-base instability
D-3 already documents and shrunk-LQ visibly tames), `log_lq` in
[-4.9, 8.4] (symmetric-ish around 0 as expected of a log-ratio), `share_diff`
in [-0.87, 1.0] (a bounded pp difference), `raw_share` in [0, 1] (a small
number of exact-1.0 boundary rows are single-child categories, not a bug).
`test_c7_oa_domain_global_lq_equals_nested_lq` and all 19 schema/seed tests
pass against the live warehouse (`uv run dbt build --select
seed_oa_calculation_methods int_poi_offering_advantage_methods
mart_poi_oa_methods test_c7_...`).

## Deferred to OA-D3b (not built here, correctly out of scope)

z-score/binomial-SLQ, Getis-Ord Gi*, density, per-capita. **OA-D3b is blocked
on a system-architect ruling** (OA-D0 geo sign-off C9: does promoting
Getis-Ord's `esda`/Queen-W dependency into a published mart strain
ADR-0024's "no new tool, pure DuckDB" claim, or is an analysis-layer
precompute → mart-join handoff the right shape). Route that question to the
system-architect before starting D3b; density/per-capita/z-score do not
individually need the architect but are naturally grouped with D3b since they
share D3's remaining scope and each needs its own join (EWR population,
`ST_Area` geometry) that this slice's "no new join" boundary deliberately
excluded.

## Untrusted input (SEC-3)

This review consumed only in-repo code, the OA-D0 sign-off, ADR-0024, and the
live warehouse's own computed values — no web-fetched or non-maintainer issue
text was treated as instructions.

---

**Verdict: PASS.** The six core method columns are correctly derived
(LQ-last/stock-first inherited, C4's threshold correctly reused as a
shrinkage prior, C7's never-blend rule structurally and test-enforced,
`global_lq`/`nested_lq` domain identity proven and regression-guarded), no
new methodology decision beyond the already-approved OA-D0 vocabulary was
made, and the deferred four-mode remainder is correctly routed to a
system-architect-gated OA-D3b rather than either being force-built without
that ruling or silently dropped. The domain-expert half of the R-C1 gate
(signal-domain framing / interpretation guardrails for the new methods)
remains required before integration into `develop`.
