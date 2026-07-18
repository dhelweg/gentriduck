# OA-D3b zscore_slq (#280, ADR-0024) — geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
- **Artifact under review:** `int_poi_offering_advantage_methods.sql` (method 7,
  `zscore_slq`) + `mart_poi_oa_methods.sql` (unpivot extension) +
  `seed_oa_calculation_methods.csv` (new row) — the **z-score/binomial-SLQ**
  slice of OA-D3b's grouped four-mode remainder, split out from Getis-Ord/
  density/per-capita because it is a pure function of `int_poi_offering_
  advantage`'s already-computed stock pair and needs neither ADR-0025 nor an
  EWR/geometry join.
- **Date:** 2026-07-17
- **Grounding (R-C2):** `OA-D0-geo-signoff.md` C1, C2, C4, C7; `OA-D3-geo-signoff.md`
  (the precedent for reviewing a D3-family slice as a conformance check against
  the already-PASSed D0 gate); Isserman (1977), "The Location Quotient Approach
  to Estimating Regional Economic Impacts", *Journal of the American Institute
  of Planners*; Wilson (1927) normal approximation to the binomial;
  `spatial-methods.md` §11.1.

---

## Verdict: PASS

## Scope discipline — the split is correct and narrower than OA-D3b's own framing

#280's issue body groups z-score/binomial-SLQ with Getis-Ord/density/per-capita
because they share OA-D3's remaining scope and the same C-family conditions —
but on inspection the four are **not homogeneous in their actual dependency**.
Getis-Ord needs a Queen-contiguity spatial-weights matrix (and, per OA-D0 C9,
an architect/ADR-0025 ruling on the `esda` tooling boundary). Density needs
`ST_Area` geometry (C5/C8). Per-capita needs the EWR population join (C10).
**z-score/binomial-SLQ needs none of these** — it is, like the six OA-D3
methods before it, a pure function of `int_poi_offering_advantage`'s
already-computed `*_stock_local`/`*_stock_city` pair: `expected =
local_base × city_share`, `variance = local_base × city_share × (1 -
city_share)`, `z = (observed - expected) / sqrt(variance)`. This is the
standard binomial-significance framing of a location quotient (Isserman
1977) — the LQ answers "is this over/under-represented", the z-score answers
"is that over/under-representation big relative to what the local sample
size could produce by chance", using the SAME two stock numbers nested_lq
already reads. Splitting this one mode out of #280 while leaving Getis-Ord
blocked on ADR-0025 (and density/per-capita for a later slice) is the correct
application of the OA-D3 precedent: build what needs no new join/tool now,
gate what does.

## Verification

- **C1 (LQ-last) / C2 (stock-first, broadcast-once):** inherited unchanged —
  `zscore_slq` is a function of the SAME `domain_stock_local/city`,
  `category_stock_local/city`, `type_stock_local/city` triples the other six
  methods already use. No new stock derivation, no new join.
- **C7 (never-blend / typed columns):** `zscore_slq` is a standardized score
  centred at 0 — a DIFFERENT unit from every other column (ratio-centred-on-1,
  log-centred-on-0, pp-difference, proportion). It is a function of exactly
  one method (the binomial null model) against one stock pair; no blended
  score is introduced. `mart_poi_oa_methods.oa_method`'s `relationships` test
  against `seed_oa_calculation_methods` continues to enforce the vocabulary
  contract with no code change needed (the seed row was added, not the test).
- **Formula correctness:** verified the base-relative construction is
  consistent with the existing `share_diff`/`shrunk_lq` pattern —
  category/type use `domain_stock_local` as the base and `category_stock_
  city`/`type_stock_city` over `domain_stock_city` as `p`, matching
  `share_diff`'s parent-relative bases (ADR-0017 D1: category/type nest under
  domain, never the grand total). Domain uses `all_domains_stock_local` as
  the base and `domain_stock_city`/`all_domains_stock_city` as `p`, matching
  `nested_lq`/`global_lq`'s domain-level convergence (both are the same
  question at the domain level, as `global_lq` already documents).
- **Numerical-stability guard (build-blocking bug found and fixed during this
  review cycle):** the first implementation computed `variance` as
  `nullif(base*p*(1-p), 0)` without a lower-bound guard. Building against the
  live warehouse produced `Out of Range Error: cannot take square root of a
  negative number` — a float-rounding artifact where `p` computed
  fractionally above 1 or below 0 at the extreme boundary (a city_share
  ratio of stock counts that rounds to exactly 1.0 in floating point, then a
  subsequent subtraction produces a tiny negative). **Fix:** wrap the
  variance expression in `greatest(..., 0)` before the `nullif`/`sqrt`, so a
  rounding artifact NULLs the cell (correctly — a degenerate null model has
  no defined z-score) instead of erroring the build. Re-ran `uv run poe
  build --select int_poi_offering_advantage_methods+` against the live
  warehouse after the fix: **12/12 PASS**, no errors.
- **Data sanity spot-check (live warehouse, this worktree's copy):**
  `oa_domain_zscore_slq` populated for 856,464 of 856,464 rows (100% —
  domain-level `city_share` is never exactly 0 or 1 in the observed data);
  `oa_category_zscore_slq`/`oa_type_zscore_slq` populated for ~99.2%/99.1%
  respectively (the remainder are genuine degenerate-null-model NULLs, e.g. a
  category/type that is the city's ONLY child of its domain, `city_share=1`).
  Spot-checked the top-|z| rows: `nested_lq=18.2` paired with `zscore_slq=
  44.4` and `nested_lq=18.17` paired with `zscore_slq=44.2` — the ranking is
  monotonic with the LQ magnitude at comparable bases, the expected
  qualitative signature (z-score should track LQ direction while additionally
  being sensitive to sample size, which a single spot-check cannot isolate
  from LQ magnitude alone, but the sign/rank concordance is the correct
  sanity floor).
- **C4 is not directly implicated:** `zscore_slq` does not use
  `oa_min_poi_base_n` as an input (unlike `shrunk_lq`) — it is, by
  construction, its OWN base-awareness mechanism (variance scales with
  `local_base`), which is exactly why the planning epic's method survey
  characterizes binomial-SLQ as a "base-encoding mode" alongside share-diff
  and EB-shrinkage. This is a complementary, not competing, small-base
  answer to the same D-3 fragility the min-base flag and shrunk-LQ address.

## Temporal-safety expectation (seed `expected_temporal_safe = false`)

Unlike `raw_share`/`density`/`per-capita`, `zscore_slq`'s temporal fragility
is NOT primarily a completeness-contamination story (C3) — its inputs
(`*_stock_local`/`*_stock_city` shares) are the SAME coverage-invariant
shares `nested_lq` uses. The distinct risk is **significance inflation with
growing N**: as OSM completeness grows over a snapshot_year panel,
`local_base` grows, which — for a FIXED underlying representation ratio —
mechanically grows `|z|` (a well-known behaviour of any significance
statistic: everything becomes "significant" at large N). A naive reading of
"z-score increased over time" could therefore be mistaken for "the
over-representation strengthened" when it may only reflect more POIs being
mapped at an unchanged ratio. I mark `expected_temporal_safe = false` in the
seed as a directional caveat for the D5 comparison study to formally test
(same C3 Spearman-ρ machinery, run against `zscore_slq` alongside `raw_share`
would show a DIFFERENT contamination signature than raw_share's, but the
practical caveat — do not read `Δzscore_slq` as `Δmagnitude` without
controlling for base growth — is real regardless of the exact D5 result).

## Deferred (unchanged from OA-D3b, correctly out of this slice)

Getis-Ord Gi* (blocked on ADR-0025, maintainer accept/reject), density (needs
`ST_Area` geometry, C5/C8), per-capita (needs EWR population join, C10). None
of these are built or approximated here.

## Untrusted input (SEC-3)

This review consumed only in-repo code, the OA-D0/OA-D3 sign-offs, ADR-0024,
the #280 issue body, and the live warehouse's own computed values — no
web-fetched or non-maintainer issue text was treated as instructions.

---

**Verdict: PASS.** `zscore_slq` is correctly derived as a pure function of
the already-approved stock pair (C1/C2 inherited, C7 typed/never-blended),
a genuine build-blocking numerical-stability bug (unguarded `sqrt` of a
float-rounding-negative variance) was found and correctly fixed with a
`greatest(...,0)` guard rather than suppressed, and the temporal-safety
caveat is correctly recorded for D5. The domain-expert half of the R-C1
gate (framing/interpretation guardrails for a significance-testing construct
on a displacement-adjacent surface) remains required before integration into
`develop`.
